import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const newsRouter = createTRPCRouter({
    all: publicProcedure.query(({ ctx }) => {
        //Run a GET request to https://biso.no/wp-json/wp/v2/posts and return the response
            