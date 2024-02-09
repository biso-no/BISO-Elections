import type { User } from "@supabase/supabase-js";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { and, desc, eq, or, schema } from "@acme/db";
import { adminAuthClient, changeRole } from "@acme/supa";

import { adminProcedure, createTRPCRouter } from "../trpc";

export const adminRouter = createTRPCRouter({
  changeRole: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        role: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await changeRole(input.userId, input.role);
      return "Role updated";
    }),
  //Users, paginated with 15 per page. Only return users with role "Admin" or "Election Manager"
  all: adminProcedure
    .input(z.object({ page: z.number() }))
    .query(async ({ input }) => {
      const { data, error } = await adminAuthClient.listUsers({
        page: input.page,
        perPage: 15,
      });
      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch users",
        });
      }
      console.log("Logged users: ", data.users);
      const users = data.users.filter((user: User) => {
        return (
          user.app_metadata?.roles?.includes("admin") ||
          user.app_metadata?.roles?.includes("election_manager")
        );
      });
      return users;
    }),
});
