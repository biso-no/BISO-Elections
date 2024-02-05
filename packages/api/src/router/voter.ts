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
    .query(({ ctx }) => {
      return ctx.db.query.electionSession.findFirst({
        where: eq(schema.electionSession.status, "in_progress"),
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
  vote: protectedProcedure
    .input(z.object({ id: z.string(), candidateId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const voter = await ctx.db.query.electionVoter.findFirst({
        where: eq(schema.electionVoter.profileId, ctx.user.id),
      });
      if (!voter) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Voter not found",
        });
      }
      if (voter.profileId !== ctx.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to vote",
        });
      }
      const candidate = await ctx.db.query.electionCandidate.findFirst({
        where: eq(schema.electionCandidate.id, input.candidateId),
      });
      if (!candidate) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Candidate not found",
        });
      }
      await ctx.db
        .insert(schema.electionVote)
        .values({
          electionId: voter.electionId,
          profileId: ctx.user.id,
          electionCandidateId: input.candidateId,
        })
        .execute();
      return true;
    }),
});
