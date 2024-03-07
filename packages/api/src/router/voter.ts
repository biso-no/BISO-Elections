import { z } from "zod";

import { and, desc, eq, schema } from "@acme/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const votersRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const allElections = await ctx.db.query.electionVoter.findMany({
      where: eq(schema.electionVoter.profileId, ctx.user.id),
      with: {
        election: {
          columns: {
            name: true,
            campus: true,
            id: true,
          },
          with: {
            sessions: {
              columns: {
                status: true,
              },
            },
          },
        },
      },
    });

    const notStartedElections = allElections.filter(
      (election) =>
        election.election.sessions.filter(
          (session) => session.status === "not_started",
        ).length > 0,
    );

    const onGoingElections = allElections.filter(
      (election) =>
        election.election.sessions.filter(
          (session) => session.status === "in_progress",
        ).length > 0,
    );

    const completedElections = allElections.filter(
      (election) =>
        election.election.sessions.filter(
          (session) => session.status === "completed",
        ).length > 0,
    );

    return {
      onGoingElections,
      completedElections,
      notStartedElections,
    };
  }),
  //Return all elections the given user has been added to as a voter
  mine: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.electionVoter.findMany({
      where: eq(schema.electionVoter.profileId, ctx.user.id),
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
    .input(z.object({ id: z.string().optional() }))
    .query(({ ctx, input }) => {
      if (!input.id) {
        return null;
      }

      return ctx.db.query.electionSession.findFirst({
        where: eq(schema.electionSession.id, input.id),
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
              maxSelections: true,
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
  activeSession: protectedProcedure.query(async ({ ctx }) => {
    const session = await ctx.db.query.electionSession.findFirst({
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
            maxSelections: true,
            type: true,
          },
          with: {
            candidates: {
              columns: {
                id: true,
                name: true,
              },
              orderBy: desc(schema.electionCandidate.priority),
            },
          },
        },
      },
    });

    return session;
  }),

  vote: protectedProcedure
    .input(
      z.object({
        candidateIds: z.array(z.string()),
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

      const voter = await ctx.db.query.electionVoter.findFirst({
        where: eq(schema.electionVoter.profileId, ctx.user.id),
      });

      const vote_weight = voter?.vote_weight ?? 1;

      //Insert a row for each selected candidateId
      for (const candidateId of input.candidateIds) {
        await ctx.db.insert(schema.electionVote).values({
          profileId: ctx.user.id,
          candidateId,
          sessionId: input.sessionId,
          weight: vote_weight,
          createdAt: new Date(),
        });
      }
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
