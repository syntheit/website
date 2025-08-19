import { contactRouter } from "@/server/api/routers/contact";
import { resourceSuggestionRouter } from "@/server/api/routers/resource-suggestion";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";


export const appRouter = createTRPCRouter({
  contact: contactRouter,
  resourceSuggestion: resourceSuggestionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;


export const createCaller = createCallerFactory(appRouter);
