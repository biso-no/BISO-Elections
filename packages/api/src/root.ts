import { adminRouter } from "./router/admin";
import { authRouter } from "./router/auth";
import { electionsRouter } from "./router/election";
import { expenseRouter } from "./router/expense";
import { learningRouter } from "./router/learning";
import { notificationRouter } from "./router/notification";
import { postRouter } from "./router/post";
import { profileRouter } from "./router/profile";
import { shopRouter } from "./router/shop";
import { votersRouter } from "./router/voter";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  elections: electionsRouter,
  expense: expenseRouter,
  voter: votersRouter,
  profile: profileRouter,
  learning: learningRouter,
  notification: notificationRouter,
  admin: adminRouter,
  shop: shopRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
