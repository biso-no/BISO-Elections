import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { wcApi } from "../wc";

export const shopRouter = createTRPCRouter({
  products: publicProcedure.query(async () => {
    const products = await wcApi.get("products", {
      per_page: 20,
    });
    return products;
  }),
});
