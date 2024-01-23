import { authRouter } from "./router/auth";
import { electionsRouter } from "./router/election";
import { expenseRouter } from "./router/expense";
import { learningRouter } from "./router/learning";
import { postRouter } from "./router/post";
import { profileRouter } from "./router/profile";
import { votersRouter } from "./router/voter";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  election: electionsRouter,
  expense: expenseRouter,
  voter: votersRouter,
  profile: profileRouter,
  learning: learningRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
