import { publicProcedure, router } from "../index";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  getUser: publicProcedure.query(async () => {
    return { id: "user_123", name: "John Doe" };
  }),
});
export type AppRouter = typeof appRouter;
