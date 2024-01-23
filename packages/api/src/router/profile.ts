import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { desc, eq, schema } from "@acme/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
  // Get profile
  get: protectedProcedure.query(({ ctx }) => {
    const profile = ctx.db.query.profile.findFirst({
      where: eq(schema.profile.id, ctx.user.id),
      columns: {
        address: true,
        email: true,
        name: true,
        bankAccount: true,
        city: true,
        image: true,
        phone: true,
        zip: true,
      },
    });
    if (!profile) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Profile not found",
      });
    }
    return profile;
  }),
  update: protectedProcedure
    .input(
      z.object({
        address: z.string().optional(),
        email: z.string().optional(),
        name: z.string().optional(),
        bankAccount: z.string().optional(),
        city: z.string().optional(),
        image: z.string().optional(),
        phone: z.string().optional(),
        zip: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Create the election
      return ctx.db
        .update(schema.profile)
        .set(input)
        .where(eq(schema.profile.id, ctx.user.id))
        .returning();
    }),
  create: protectedProcedure
    .input(
      z.object({
        address: z.string().min(1),
        email: z.string().min(1),
        name: z.string().min(1),
        bankAccount: z.string().min(1),
        city: z.string().min(1),
        image: z.string().min(1),
        phone: z.string().min(1),
        zip: z.string().min(1),
        userRole: z
          .enum([
            "user",
            "admin",
            "election_administrator",
            "election_participant",
            "non_participant",
          ])
          .default("user"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Create the election
      const inputWithId = {
        id: ctx.user.id,
        ...input,
      };
      return ctx.db.insert(schema.profile).values(inputWithId).returning();
    }),
});
