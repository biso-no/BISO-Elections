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
  mine: adminProcedure.query(({ ctx }) => {
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
  createPosition: adminProcedure
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
        priority: 1,
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
          maxSelections: 1,
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
          priority: 1,
        },
        {
          name: "Yes",
          electionPositionId: statuteChange.id,
          priority: 10,
        },
        {
          name: "No",
          electionPositionId: statuteChange.id,
          priority: 9,
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
  sessions: adminProcedure.input(z.string()).query(async ({ ctx, input }) => {
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
      where: eq(schema.electionSession.electionId, input),
    });
  }),
  statuteChanges: adminProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.db.query.electionPosition.findMany({
        where: and(
          eq(schema.electionPosition.sessionId, input),
          eq(schema.electionPosition.type, "statute_change"),
        ),
        with: {
          candidates: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
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
            .set({ status: "completed", endedAt: new Date() })
            .where(eq(schema.electionSession.id, session.id));
        }

        return ctx.db
          .update(schema.electionSession)
          .set({ status: "in_progress", startedAt: new Date() })
          .where(eq(schema.electionSession.id, input.id));
      }

      if (session.status === "in_progress") {
        return ctx.db
          .update(schema.electionSession)
          .set({ status: "completed", endedAt: new Date() })
          .where(eq(schema.electionSession.id, input.id));
      }
    }),
  createSession: adminProcedure
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
      where: and(
        eq(schema.electionPosition.sessionId, input),
        eq(schema.electionPosition.type, "position"),
      ),
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
      return ctx.db
        .insert(schema.electionCandidate)
        .values({
          electionPositionId: input.electionPositionId,
          name: input.name,
          priority: 10,
        })
        .returning();
    }),
  updateCandidate: adminProcedure
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
  voters: adminProcedure
    .input(
      z.object({
        electionId: z.string(),
        limit: z.number().optional(),
        page: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 10; // Default limit if not specified
      const page = input.page ?? 1; // Default to first page if not specified
      const offset = (page - 1) * limit; // Calculate offset

      // Fetch the page of voters
      const voters = await ctx.db.query.electionVoter.findMany({
        where: eq(schema.electionVoter.electionId, input.electionId),
        limit: limit,
        offset: offset,
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

      // Inefficient workaround to count: fetch all IDs matching the criteria
      // Note: This is not recommended for large datasets
      const allVoterIds = await ctx.db.query.electionVoter.findMany({
        where: eq(schema.electionVoter.electionId, input.electionId),
        columns: {
          id: true, // Only fetch the ID to minimize data transfer
        },
      });

      const totalCount = allVoterIds.length;

      return {
        voters,
        totalCount,
      };
    }),

  deleteVoter: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .delete(schema.electionVoter)
        .where(eq(schema.electionVoter.id, input.id));
    }),
  updateVoter: adminProcedure
    .input(
      z.object({
        id: z.string(),
        vote_weight: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .update(schema.electionVoter)
        .set({
          vote_weight: input.vote_weight,
        })
        .where(eq(schema.electionVoter.id, input.id));
    }),
  voter: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.query.electionVoter.findFirst({
        where: eq(schema.electionVoter.id, input.id),
        columns: {
          id: true,
          vote_weight: true,
        },
      });
    }),
  createVoter: adminProcedure
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
  createMultipleVoters: adminProcedure
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

          if (error ?? !data?.user) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: error?.message ?? "Failed to invite voter",
            });
          }

          const profile = await ctx.db
            .insert(schema.profile)
            .values({
              id: data.user.id,
              name: voter.name,
              email: voter.email,
              userRole: "user",
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
  admins: adminProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.query.electionAdmin.findMany({
      where: eq(schema.electionAdmin.electionId, input),
    });
  }),
  createAdmin: adminProcedure
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
  deleteSession: adminProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      // Check if the user is an admin of the election
      return ctx.db
        .delete(schema.electionSession)
        .where(eq(schema.electionSession.id, input));
    }),
  deleteCandidate: adminProcedure
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
        electionId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const voters = await ctx.db.query.electionVoter.findMany({
        where: eq(schema.electionVoter.electionId, input.electionId),
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
                        weight: true,
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
  //A procedure to calculate the average time for a vote to be cast for a given election. The average is calculated over all sessions and voters.
  averageVoteTime: adminProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const election = await ctx.db.query.election.findFirst({
        where: eq(schema.election.id, input),
        with: {
          sessions: {
            columns: {
              startedAt: true,
            },
            with: {
              votes: {
                columns: {
                  createdAt: true, // Ensure this matches your database schema
                },
              },
            },
          },
        },
      });

      if (!election) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Election not found",
        });
      }

      if (election.sessions.length === 0) {
        return 0;
      }

      let total = 0;
      let count = 0;

      for (const session of election.sessions) {
        for (const vote of session.votes) {
          if (!session.startedAt) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Session startedAt not found",
            });
          }
          //Example time: 2024-03-05 21:28:22.496
          const timeDiff =
            new Date(vote.createdAt).getTime() -
            new Date(session.startedAt).getTime();
          total += timeDiff;
          count++;
        }
      }

      if (count === 0) {
        return 0;
      }

      const averageInSeconds = (total / count / 1000).toFixed(1);

      return averageInSeconds;
    }),
  votesByElection: adminProcedure
    .input(
      z.object({
        electionId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // Fetch the election data
      const electionData = await ctx.db.query.election.findFirst({
        where: eq(schema.election.id, input.electionId),
        with: {
          sessions: {
            with: {
              votes: {
                columns: {
                  candidateId: true,
                },
                with: {
                  candidate: {
                    columns: {
                      name: true,
                      id: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!electionData?.sessions) {
        return [];
      }

      // Transform and aggregate the data
      const votesByCandidate = {};

      electionData.sessions.forEach((session) => {
        session.votes.forEach((vote) => {
          const { candidate } = vote;
          if (candidate) {
            const candidateKey = candidate.id;
            if (!votesByCandidate[candidateKey]) {
              votesByCandidate[candidateKey] = {
                candidate: candidate.name,
                votes: 0,
              };
            }
            votesByCandidate[candidateKey].votes += 1; // Assuming each vote object represents a single vote
          }
        });
      });

      // Convert the aggregated data into an array suitable for the ResponsiveBar component
      const transformedData = Object.values(votesByCandidate);

      return transformedData;
    }),
});
