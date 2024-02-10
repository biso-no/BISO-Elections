import { z } from "zod";

import { isAdmin } from "@acme/supa";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  me: publicProcedure.query(({ ctx }) => {
    if (!ctx.user) {
      return null;
    }

    return ctx.user;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can see this secret message!";
  }),
});
