import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { and, desc, eq, ne, schema } from "@acme/db";
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
        maxSelections: z.number().optional(),
        withAbstain: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if the user is an admin of the election
      const [position] = await ctx.db
        .insert(schema.electionPosition)
        .values({
          name: input.name,
          sessionId: input.sessionId,
          maxSelections: input.maxSelections,
          withAbstain: input.withAbstain,
          type: "position",
        })
        .returning();

      if (!position) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create position",
        });
      }

      await ctx.db.insert(schema.electionCandidate).values({
        name: "Abstain",
        electionPositionId: position.id,
        priority: 0,
      });
    }),
  updatePosition: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1),
        maxSelections: z.number().optional(),
        withAbstain: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .update(schema.electionPosition)
        .set({
          name: input.name,
          maxSelections: input.maxSelections,
          withAbstain: input.withAbstain,
        })
        .where(eq(schema.electionPosition.id, input.id));
    }),
  createStatuteChange: adminProcedure
    .input(
      z.object({
        sessionId: z.string(),
        content: z.string().min(1),
        withAbstain: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if the user is an admin of the election
      const [statuteChange] = await ctx.db
        .insert(schema.electionPosition)
        .values({
          name: input.content,
          withAbstain: input.withAbstain,
          sessionId: input.sessionId,
          type: "statute_change",
        })
        .returning();

      if (!statuteChange) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create statute change",
        });
      }

      await ctx.db.insert(schema.electionCandidate).values([
        {
          name: "Abstain",
          electionPositionId: statuteChange.id,
          priority: 0,
        },
        {
          name: "Yes",
          electionPositionId: statuteChange.id,
          priority: 1,
        },
        {
          name: "No",
          electionPositionId: statuteChange.id,
          priority: 2,
        },
      ]);
    }),
  candidates: adminProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.query.electionCandidate.findMany({
      where: eq(schema.electionCandidate.electionPositionId, input),
      columns: {
        name: true,
        id: true,
      },
    });
  }),
  sessions: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.db.query.electionSession.findMany({
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
              withAbstain: true,
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
        where: eq(schema.electionSession.electionId, input),
      });
    }),
  toggleSession: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      //This procedure updates the given session. if the progress is currently "not_started", the status should change to in_progress. In these cases, all other in progress sessions must be changed to completed.
      //If the given session is status "in_progress", they should be changed to "completed".
      const session = await ctx.db.query.electionSession.findFirst({
        where: eq(schema.electionSession.id, input.id),
      });

      if (!session) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Session not found",
        });
      }

      if (session.status === "not_started") {
        //Complete all other sessions, then change the status to in_progress
        const otherSessions = await ctx.db.query.electionSession.findMany({
          where: and(
            ne(schema.electionSession.id, input.id),
            eq(schema.electionSession.status, "in_progress"),
          ),
        });

        for (const session of otherSessions) {
          await ctx.db
            .update(schema.electionSession)
            .set({ status: "completed" })
            .where(eq(schema.electionSession.id, session.id));
        }

        return ctx.db
          .update(schema.electionSession)
          .set({ status: "in_progress" })
          .where(eq(schema.electionSession.id, input.id));
      }

      if (session.status === "in_progress") {
        return ctx.db
          .update(schema.electionSession)
          .set({ status: "completed" })
          .where(eq(schema.electionSession.id, input.id));
      }
    }),
  createSession: protectedProcedure
    .input(
      z.object({
        electionId: z.string(),
        name: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if the user is an admin of the election
      return ctx.db
        .insert(schema.electionSession)
        .values({
          name: input.name,
          electionId: input.electionId,
          status: "not_started",
        })
        .returning();
    }),
  updateSession: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        status: z.enum(["not_started", "in_progress", "completed"]).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if the user is an admin of the election
      return ctx.db
        .update(schema.electionSession)
        .set({
          name: input.name,
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
                candidateId: true,
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
          priority: 0,
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
      const voters = input.voters.map(async (voter) => {
        let profileId;

        const existingProfile = await ctx.db.query.profile.findFirst({
          where: eq(schema.profile.email, voter.email),
        });

        if (existingProfile) {
          profileId = existingProfile.id;
        } else {
          const { data, error } = await inviteVoter(voter.email);

          if (error || !data?.user) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: error?.message || "Failed to invite voter",
            });
          }

          const profile = await ctx.db
            .insert(schema.profile)
            .values({
              id: data.user.id,
              name: voter.name,
              email: voter.email,
              userRole: "election_participant",
            })
            .returning();

          if (!profile) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Failed to create profile",
            });
          }

          profileId = data.user.id;
        }

        return ctx.db
          .insert(schema.electionVoter)
          .values({
            profileId,
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
      },
    });
  }),
  votes: adminProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.query.electionVote.findMany({
      where: eq(schema.electionVote.sessionId, input),
    });
  }),
  votesByCandidateId: adminProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.db.query.electionVote.findMany({
        where: eq(schema.electionVote.candidateId, input),
        columns: {
          candidateId: true,
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
  deletePosition: adminProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      // Check if the user is an admin of the election
      return ctx.db
        .delete(schema.electionPosition)
        .where(eq(schema.electionPosition.id, input));
    }),
  //A procedure to get all voters who have not yet voted for a given session.
  votersWhoHaveNotVoted: adminProcedure
    .input(
      z.object({
        sessionId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const voters = await ctx.db.query.electionVoter.findMany({
        with: {
          profile: {
            columns: {
              name: true,
            },
          },
          votes: {
            where: eq(schema.electionVote.sessionId, input.sessionId),
          },
        },
      });
      const filteredVoters = voters.filter((voter) => voter.votes.length === 0);
      console.log("filteredVoters", filteredVoters);
      return filteredVoters;
    }),
  results: adminProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.query.election.findFirst({
      where: eq(schema.election.id, input),
      columns: {
        name: true,
        campus: true,
        date: true,
      },
      with: {
        voters: {
          columns: {
            vote_weight: true,
          },
        },
        sessions: {
          columns: {
            name: true,
          },
          with: {
            positions: {
              columns: {
                name: true,
              },
              with: {
                candidates: {
                  columns: {
                    name: true,
                  },
                  with: {
                    votes: {
                      columns: {
                        id: true,
                        candidateId: true,
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
  sessionResults: adminProcedure
    .input(
      z.object({
        sessionId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.query.electionSession.findFirst({
        where: eq(schema.electionSession.id, input.sessionId),
        columns: {
          id: true,
          name: true,
        },
        with: {
          positions: {
            with: {
              candidates: {
                with: {
                  votes: {
                    columns: {
                      id: true,
                      candidateId: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
    }),
});
