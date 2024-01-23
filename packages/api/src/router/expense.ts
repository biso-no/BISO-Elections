import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { desc, eq, schema } from "@acme/db";

import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

export const expenseRouter = createTRPCRouter({
  // List all elections
  all: adminProcedure.query(({ ctx }) => {
    return ctx.db.query.expense.findMany({
      orderBy: desc(schema.election.id),
      limit: 10,
    });
  }),
  mine: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.expense.findMany({
      orderBy: desc(schema.expense.id),
      where: eq(schema.expense.profileId, ctx.user.id),
      limit: 10,
      with: {
        attachments: {
          columns: {
            id: true,
            date: true,
            description: true,
            expenseId: true,
            value: true,
            url: true,
          },
        },
      },
    });
  }),
  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.expense.findFirst({
        where: eq(schema.post.id, input.id),
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        campus: z.string().min(1),
        date: z.string().min(1),
        createdBy: z.string().min(1),
        profileId: z.string().min(1),
        status: z.string().min(1),
        totalAmount: z.number(),
        address: z.string().min(1),
        city: z.string().min(1),
        createdAt: z.string().min(1),
        department: z.string().min(1),
        description: z.string().min(1),
        id: z.string().min(1),
        invoiceDate: z.string().min(1),
        invoiceNumber: z.string().min(1),
        organization: z.string().min(1),
        updatedAt: z.string().min(1),
        zip: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .insert(schema.expense)
        .values({
          name: input.name,
          campus: input.campus,
          profileId: ctx.user.id,
          status: "not_started",
          totalAmount: 0,
          address: "",
          city: "",
          createdAt: new Date(),
          department: "",
          description: "",
          id: "",
          invoiceDate: new Date(),
          invoiceNumber: "",
          organization: "",
          updatedAt: new Date(),
          zip: "",
        })
        .returning();
    }),
});
