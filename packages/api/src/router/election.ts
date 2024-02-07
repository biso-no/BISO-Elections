import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { desc, eq, schema } from "@acme/db";
import { inviteVoter } from "@acme/supa";

import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

export const electionsRouter = createTRPCRouter({
  // List all elections
  all: adminProcedure.query(({ ctx }) => {
    return ctx.db.query.election.findMany({
      orderBy: desc(schema.election.id),
      limit: 10,
    });
  }),
  mine: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.election.findMany({
      where: eq(schema.election.createdBy, ctx.user.id),
    });
  }),
  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.election.findFirst({
        where: eq(schema.election.id, input.id),
      });
    }),
  create: adminProcedure
    .input(
      z.object({
        name: z.string().min(1),
        campus: z.string().min(1),
        date: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Create the election
      return ctx.db
        .insert(schema.election)
        .values({
          name: input.name,
          campus: input.campus as
            | "Bergen"
            | "Oslo"
            | "Stavanger"
            | "Trondheim"
            | "National",
          date: new Date(input.date),
          createdBy: ctx.user.id,
        })
        .returning();
    }),
  // Update an election
  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        date: z.string().min(1).optional(),
        campus: z.string().min(1).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .update(schema.election)
        .set({
          campus: input.campus as
            | "Bergen"
            | "Oslo"
            | "Stavanger"
            | "Trondheim"
            | "National",
          name: input.name,
          date: input.date ? new Date(input.date) : undefined,
        })
        .where(eq(schema.election.id, input.id));
    }),

  // Delete an election
  delete: adminProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return ctx.db.delete(schema.election).where(eq(schema.election.id, input));
  }),
  createPosition: protectedProcedure
    .input(
      z.object({
        sessionId: z.string().min(1),
        name: z.string().min(1),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if the user is an admin of the election
      return ctx.db
        .insert(schema.electionPosition)
        .values({
          name: input.name,
          sessionId: input.sessionId,
          description: input.description,
        })
        .returning();
    }),
  sessions: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.db.query.electionSession.findMany({
        with: {
          positions: {
            with: {
              candidates: {
                columns: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          statuteChanges: true,
        },
        where: eq(schema.electionSession.electionId, input),
      });
    }),
  createSession: protectedProcedure
    .input(
      z.object({
        electionId: z.string(),
        name: z.string().min(1),
        description: z.string().min(1),
        type: z.enum(["statute_change", "position"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if the user is an admin of the election
      return ctx.db
        .insert(schema.electionSession)
        .values({
          name: input.name,
          electionId: input.electionId,
          description: input.description,
          type: input.type,
          status: "not_started",
        })
        .returning();
    }),
  updateSession: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        type: z.enum(["statute_change", "position"]).optional(),
        status: z.enum(["not_started", "in_progress", "completed"]).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if the user is an admin of the election
      return ctx.db
        .update(schema.electionSession)
        .set({
          name: input.name,
          description: input.description,
          type: input.type,
          status: input.status,
        })
        .where(eq(schema.electionSession.id, input.id));
    }),
  positions: adminProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.query.electionPosition.findMany({
      where: eq(schema.electionPosition.sessionId, input),
      with: {
        candidates: {
          with: {
            votes: {
              columns: {
                id: true,
                electionCandidateId: true,
              },
            },
          },
          columns: {
            id: true,
            name: true,
          },
        },
      },
    });
  }),
  createCandidate: adminProcedure
    .input(
      z.object({
        electionPositionId: z.string(),
        name: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if the user is an admin of the election
      return ctx.db
        .insert(schema.electionCandidate)
        .values({
          electionPositionId: input.electionPositionId,
          name: input.name,
        })
        .returning();
    }),
  updateCandidate: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        electionPositionId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .update(schema.electionCandidate)
        .set({
          name: input.name,
          electionPositionId: input.electionPositionId,
        })
        .where(eq(schema.electionCandidate.id, input.id));
    }),
  voters: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.query.electionVoter.findMany({
      where: eq(schema.electionVoter.electionId, input),
      columns: {
        id: true,
        vote_weight: true,
        electionId: true,
        profileId: true,
      },
      with: {
        profile: {
          columns: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }),
  createVoter: protectedProcedure
    .input(
      z.object({
        electionId: z.string(),
        profileId: z.string(),
        vote_weight: z.number(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const profile = await ctx.db.query.profile.findFirst({
        where: eq(schema.profile.id, input.profileId),
      });

      if (!profile) {
        //Create a new profile
        await ctx.db
          .insert(schema.profile)
          .values({
            name: input.name,
            email: "no-email",
            userRole: "election_participant",
          })
          .returning();
      }
      return ctx.db
        .insert(schema.electionVoter)
        .values({
          profileId: input.profileId,
          electionId: input.electionId,
          vote_weight: input.vote_weight,
        })
        .returning();
    }),
  createMultipleVoters: protectedProcedure
    .input(
      z.object({
        electionId: z.string(),
        voters: z.array(
          z.object({
            name: z.string(),
            email: z.string(),
            vote_weight: z.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      //For each voter, check if their profile exists, if not, create it. Then create the voter
      const voters = input.voters.map(async (voter) => {
        const data = await inviteVoter(voter.email);

        if (!data?.data.user) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: data?.error?.message,
          });
        }

        return ctx.db
          .insert(schema.electionVoter)
          .values({
            profileId: data.data.user.id,
            electionId: input.electionId,
            vote_weight: voter.vote_weight,
          })
          .returning();
      });
      return Promise.all(voters);
    }),
  session: adminProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.query.electionSession.findFirst({
      where: eq(schema.electionSession.id, input),
      with: {
        positions: {
          with: {
            candidates: {
              columns: {
                id: true,
                name: true,
              },
            },
          },
        },
        statuteChanges: true,
      },
    });
  }),
  votes: adminProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.query.electionVote.findMany({
      where: eq(schema.electionVote.electionId, input),
    });
  }),
  votesByCandidateId: adminProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.db.query.electionVote.findMany({
        where: eq(schema.electionVote.electionCandidateId, input),
        columns: {
          electionCandidateId: true,
        },
        with: {
          candidate: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      });
    }),
  admins: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.query.electionAdmin.findMany({
      where: eq(schema.electionAdmin.electionId, input),
    });
  }),
  createAdmin: protectedProcedure
    .input(
      z.object({
        electionId: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if the user is an admin of the election
      return ctx.db
        .insert(schema.electionAdmin)
        .values({
          electionId: input.electionId,
          userId: input.userId,
        })
        .returning();
    }),
  deleteSession: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      // Check if the user is an admin of the election
      return ctx.db
        .delete(schema.electionSession)
        .where(eq(schema.electionSession.id, input));
    }),
  deleteCandidate: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      // Check if the user is an admin of the election
      return ctx.db
        .delete(schema.electionCandidate)
        .where(eq(schema.electionCandidate.id, input));
    }),
});
