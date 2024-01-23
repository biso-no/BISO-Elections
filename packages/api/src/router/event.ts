import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { desc, eq, schema } from "@acme/db";

import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
  shopManagerProcedure,
} from "../trpc";

export const eventsRouter = createTRPCRouter({
  all: adminProcedure.query(({ ctx }) => {
    return ctx.db.query.event.findMany({
      orderBy: desc(schema.event.id),
      limit: 10,
    });
  }),
  mine: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.event.findMany({
      where: eq(schema.event.createdBy, ctx.user.id),
    });
  }),
  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.event.findFirst({
        where: eq(schema.event.id, input.id),
      });
    }),
  create: shopManagerProcedure
    .input(
      z.object({
        createdBy: z.string().min(1),
        endDate: z.string().min(1),
        eventTenantId: z.string().min(1),
        name: z.string().min(1),
        refundable: z.boolean(),
        startDate: z.string().min(1),
        status: z.string().min(1),
        type: z.string().min(1),
        createdAt: z.string().min(1),
        description: z.string().min(1),
        id: z.string().min(1),
        image: z.string().min(1),
        logo: z.string().min(1),
        updatedAt: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Create the event
      return ctx.db
        .insert(schema.event)
        .values({
          createdBy: ctx.user.id,
          endDate: new Date(input.endDate),
          eventTenantId: input.eventTenantId,
          name: input.name,
          refundable: false,
          startDate: new Date(input.startDate),
          status: "draft",
          type: "event" as "public" | "private" | "members_only",
          createdAt: new Date(),
          description: "",
          id: "",
          image: "",
          logo: "",
          updatedAt: new Date(),
        })
        .returning();
    }),
});
