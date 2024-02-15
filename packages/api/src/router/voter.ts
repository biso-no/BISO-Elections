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
    .input(z.object({ id: z.string().optional() }))
    .query(({ ctx, input }) => {
      if (!input.id) {
        return null;
      }

      return ctx.db.query.electionSession.findFirst({
        where: eq(schema.electionSession.id, input.id),
        with: {
          statuteChanges: {
            columns: {
              name: true,
              sessionId: true,
              id: true,
            },
            with: {
              options: {
                columns: {
                  id: true,
                  name: true,
                },
              },
            },
          },
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
  activeSession: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.electionSession.findFirst({
      where: eq(schema.electionSession.status, "in_progress"),
      with: {
        statuteChanges: {
          columns: {
            name: true,
            sessionId: true,
            id: true,
          },
          with: {
            options: {
              columns: {
                id: true,
                name: true,
              },
            },
          },
        },
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
  vote: protectedProcedure
    .input(
      z.object({
        votes: z.array(
          z.object({
            electionCandidateId: z.string().optional(),
            electionStatuteChangeOptionId: z.string().optional(),
          }),
        ),
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
      const votes = [];

      for (const voteOption of input.votes) {
        for (let i = 0; i < vote_weight; i++) {
          votes.push(
            ctx.db
              .insert(schema.electionVote)
              .values({
                candidateId: voteOption.electionCandidateId,
                statuteChangeOptionId: voteOption.electionStatuteChangeOptionId,
                profileId: ctx.user.id,
                sessionId: input.sessionId,
              })
              .returning(),
          );
        }
      }

      // Wait for all votes to be inserted
      const insertedVotes = await Promise.all(votes);

      // Return inserted votes
      return insertedVotes;
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
