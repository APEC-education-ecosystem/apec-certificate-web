import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@apec-learning/api/routers/index";
import { createContext } from "@apec-learning/api/context";
import { NextRequest } from "next/server";

function handler(req: NextRequest) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req as any),
  });
}
export { handler as GET, handler as POST };
