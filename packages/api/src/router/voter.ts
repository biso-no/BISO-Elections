import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { desc, eq, schema } from "@acme/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const votersRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.electionVoter.findMany({
      where: eq(schema.electionVoter.profileId, ctx.user.id),
      with: {
        election: {
          columns: {
            name: true,
            campus: true,
            id: true,
          },
        },
      },
    });
  }),
  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.electionVoter.findFirst({
        where: eq(schema.electionVoter.id, input.id),
        with: {
          election: {
            columns: {
              name: true,
              id: true,
            },
            with: {
              sessions: {
                columns: {
                  id: true,
                  name: true,
                  status: true,
                },
                with: {
                  positions: {
                    columns: {
                      id: true,
                      name: true,
                    },
                    with: {
                      candidates: {
                        columns: {
                          id: true,
                          name: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
    }),
  sessionById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.electionSession.findFirst({
        where: eq(schema.electionSession.id, input.id),
        with: {
          positions: {
            columns: {
              id: true,
              name: true,
            },
            with: {
              candidates: {
                columns: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });
    }),
  activeSessionId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx }) => {
      return ctx.db.query.electionSession.findFirst({
        where: eq(schema.electionSession.status, "in_progress"),
        columns: {
          id: true,
        },
      });
    }),
  //There can only be one active session at a time. This query will return the active session for the election. The active session has status in_progress in database.
  activeSession: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.election.findFirst({
        where: eq(schema.election.id, input.id),
        with: {
          sessions: {
            where: eq(schema.electionSession.status, "in_progress"),
            columns: {
              id: true,
            },
            with: {
              positions: {
                columns: {
                  id: true,
                  name: true,
                },
                with: {
                  candidates: {
                    columns: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
    }),
  vote: protectedProcedure
    .input(
      z.object({ sessionId: z.string(), candidateIds: z.array(z.string()) }),
    )
    .mutation(async ({ ctx, input }) => {
      const voter = await ctx.db.query.electionVoter.findFirst({
        where: eq(schema.electionVoter.profileId, ctx.user.id),
      });

      if (!voter) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Voter not found" });
      }

      const session = await ctx.db.query.electionSession.findFirst({
        where: eq(schema.electionSession.id, input.sessionId),
        with: {
          positions: {
            columns: {
              id: true,
              name: true,
            },
            with: {
              candidates: {
                with: {
                  position: {
                    with: {
                      session: {
                        columns: {
                          id: true,
                          status: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!session) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Session not found",
        });
      }

      if (session.status !== "in_progress") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Session is not in progress",
        });
      }

      //Determine which position the candidate is running for, and include the position id in the vote.
      //Also vote for each candidate in the session.
      //Insert the votes into the database.
      const votes = input.candidateIds.map((candidateId) => {
        const candidate = session.positions
          .flatMap((position) => position.candidates)
          .find((c) => c.id === candidateId);

        if (!candidate) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Candidate not found",
          });
        }

        return {
          profileId: voter.profileId,
          electionId: session.electionId,
          sessionId: session.id,
          positionId: candidate.electionPositionId,
          electionCandidateId: candidate.id,
          id: voter.id,
        };
      });

      return ctx.db.insert(schema.electionVote).values(votes).returning();
    }),
});
