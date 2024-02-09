import { z } from "zod";

import { and, eq, schema } from "@acme/db";

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
          name: true,
          status: true,
          description: true,
          electionId: true,
          type: true,
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
      });
    }),
  //There can only be one active session at a time. This query will return the active session for the election. The active session has status in_progress in database.
  activeSession: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.electionSession.findFirst({
      where: eq(schema.electionSession.status, "in_progress"),
      with: {
        election: {
          columns: {
            name: true,
            id: true,
          },
        },
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
  vote: protectedProcedure
    .input(
      z.object({
        electionCandidateIds: z.array(z.string().min(1)),
        sessionId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if user has already voted for the session
      const hasVoted = await ctx.db.query.electionVote.findFirst({
        where: and(
          eq(schema.electionVote.profileId, ctx.user.id),
          eq(schema.electionVote.sessionId, input.sessionId),
        ),
      });

      if (hasVoted) {
        throw new Error("You have already voted for this session");
      }

      // Insert a vote for each candidate
      const votes = input.electionCandidateIds.map((candidateId) =>
        ctx.db
          .insert(schema.electionVote)
          .values({
            electionCandidateId: candidateId,
            profileId: ctx.user.id,
            sessionId: input.sessionId,
          })
          .returning(),
      );

      return Promise.all(votes);
    }),
  hasVoted: protectedProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ ctx, input }) => {
      const hasVoted = await ctx.db.query.electionVote.findFirst({
        where: and(
          eq(schema.electionVote.profileId, ctx.user.id),
          eq(schema.electionVote.sessionId, input.sessionId),
        ),
      });

      return !!hasVoted;
    }),
});
