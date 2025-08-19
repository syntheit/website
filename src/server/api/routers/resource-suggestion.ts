import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const MAX_TITLE_LENGTH = 200;
const MAX_DESCRIPTION_LENGTH = 500;
const MAX_NOTES_LENGTH = 300;
const RATE_LIMIT_DELAY = 5000;

const SPAM_PATTERNS = [
  /\b(viagra|casino|loan|credit|debt|weight loss|diet pill)\b/i,
  /[A-Z]{10,}/,
  /[!@#$%^&*()]{5,}/,
  /(.)\1{5,}/,
];

const resourceSuggestionSchema = z.object({
  title: z
    .string()
    .min(1, "Please enter a title for the resource.")
    .max(MAX_TITLE_LENGTH, `Title is too long. Maximum ${MAX_TITLE_LENGTH} characters allowed.`),
  description: z
    .string()
    .min(1, "Please enter a description for the resource.")
    .max(MAX_DESCRIPTION_LENGTH, `Description is too long. Maximum ${MAX_DESCRIPTION_LENGTH} characters allowed.`),
  url: z
    .string()
    .min(1, "Please enter a URL for the resource.")
    .url("Please enter a valid URL."),
  category: z
    .string()
    .min(1, "Please select a category.")
    .refine((val) => [
      "coding",
      "languages", 
      "wikipedia",
      "google-maps-lists",
      "games",
      "articles",
      "health",
      "travel",
      "history",
      "business",
      "geography",
      "technology",
      "random"
    ].includes(val), "Please select a valid category."),
  notes: z
    .string()
    .max(MAX_NOTES_LENGTH, `Notes are too long. Maximum ${MAX_NOTES_LENGTH} characters allowed.`)
    .optional(),
});

export const resourceSuggestionRouter = createTRPCRouter({
  submit: publicProcedure
    .input(resourceSuggestionSchema)
    .mutation(async ({ ctx, input }) => {
      const headersList = ctx.headers;
      const ipAddress = headersList.get("x-forwarded-for") ?? 
                       headersList.get("x-real-ip") ?? 
                       "unknown";
      const userAgent = headersList.get("user-agent") ?? "unknown";

      const recentSubmission = await ctx.db.resourceSuggestion.findFirst({
        where: {
          ipAddress,
          createdAt: {
            gte: new Date(Date.now() - RATE_LIMIT_DELAY),
          },
        },
      });

      if (recentSubmission) {
        throw new Error("Please wait a moment before submitting another suggestion.");
      }

      const isSpam = SPAM_PATTERNS.some(pattern => 
        pattern.test(input.title) || 
        pattern.test(input.description) || 
        (input.notes && pattern.test(input.notes))
      );

      const resourceSuggestion = await ctx.db.resourceSuggestion.create({
        data: {
          title: input.title,
          description: input.description,
          url: input.url,
          category: input.category,
          notes: input.notes,
          ipAddress,
          userAgent,
          isSpam,
        },
      });

      return {
        success: true,
        id: resourceSuggestion.id,
        isSpam,
      };
    }),

  getAll: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.db.resourceSuggestion.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          description: true,
          url: true,
          category: true,
          notes: true,
          ipAddress: true,
          isSpam: true,
          isApproved: true,
          createdAt: true,
        },
      });
    }),

  getValidSuggestions: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.db.resourceSuggestion.findMany({
        where: { isSpam: false },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          description: true,
          url: true,
          category: true,
          notes: true,
          ipAddress: true,
          isApproved: true,
          createdAt: true,
        },
      });
    }),

  approve: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const suggestion = await ctx.db.resourceSuggestion.update({
        where: { id: input.id },
        data: { isApproved: true },
      });

      return { success: true, suggestion };
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.resourceSuggestion.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),
});
