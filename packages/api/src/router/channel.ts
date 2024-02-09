import { EventEmitter } from "events";
import { observable } from "@trpc/server/observable";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

const ee = new EventEmitter();

//This is the websocket router. Mainly used to send messages to the client.
//The messages we will send:
//Whenever a user joins or leaves a room, the admins should be notified of who joined or left.
//Whenever a vote is cast, the admins should be notified of the result, and who voted. However, the votes are anonymous, so the voter's identity should not be revealed.
//Whenever a voting session's status changes, the voters should be notified.
export const channelRouter = createTRPCRouter({
  //Join a room
  join: protectedProcedure
    .input(z.object({ room: z.string() }))
    .mutation(({ input, ctx }) => {
      //Join the room
      //Notify the admins
      ee.emit("join", ctx.user.id, input.room);
      return "Joined";
    }),
  //Leave a room
  leave: protectedProcedure
    .input(z.object({ room: z.string() }))
    .mutation(({ input, ctx }) => {
      //Leave the room
      //Notify the admins
      ee.emit("leave", ctx.user.id, input.room);
      return "Left";
    }),
  //Cast a vote
  vote: protectedProcedure
    .input(z.object({ room: z.string(), vote: z.string() }))
    .mutation(({ input, ctx }) => {
      //Notify the admins
      ee.emit("vote", ctx.user.id, input.room, input.vote);
      return "Voted";
    }),
  //Get the status of a room
  status: protectedProcedure
    .input(z.object({ room: z.string() }))
    .query(({ input, ctx }) => {
      return observable((observer) => {
        const listener = () => {
          observer.next("Status");
        };
        ee.on(input.room, listener);
        return () => {
          ee.off(input.room, listener);
        };
      });
    }),
});
