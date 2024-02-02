import { z } from "zod";

import { triggerTopicEvent } from "@acme/novu";

import { adminProcedure, createTRPCRouter } from "../trpc";

export const notificationRouter = createTRPCRouter({
  trigger: adminProcedure
    .input(
      z.object({
        workflowId: z.string().min(1),
        topicKey: z.string().min(1),
        payload: z.object({
          title: z.string(),
          message: z.string(),
        }),
      }),
    )
    .mutation(({ input }) => {
      return triggerTopicEvent(input.workflowId, input.topicKey, input.payload);
    }),
});
