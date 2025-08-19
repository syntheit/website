import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const MAX_MESSAGE_LENGTH = 500;
const RATE_LIMIT_DELAY = 3000;

const SPAM_PATTERNS = [
  /(http|www\.)/i,
  /[A-Z]{10,}/,
  /[!@#$%^&*()]{5,}/,
  /(.)\1{5,}/,
];

const contactMessageSchema = z.object({
  message: z
    .string()
    .min(1, "Please enter a message.")
    .max(MAX_MESSAGE_LENGTH, `Message is too long. Maximum ${MAX_MESSAGE_LENGTH} characters allowed.`),
});

export const contactRouter = createTRPCRouter({
  submit: publicProcedure
    .input(contactMessageSchema)
    .mutation(async ({ ctx, input }) => {
      const headersList = ctx.headers;
      const ipAddress = headersList.get("x-forwarded-for") ?? 
                       headersList.get("x-real-ip") ?? 
                       "unknown";
      const userAgent = headersList.get("user-agent") ?? "unknown";

      const recentSubmission = await ctx.db.contactMessage.findFirst({
        where: {
          ipAddress,
          createdAt: {
            gte: new Date(Date.now() - RATE_LIMIT_DELAY),
          },
        },
      });

      if (recentSubmission) {
        throw new Error("Please wait a moment before sending another message.");
      }

      const isSpam = SPAM_PATTERNS.some(pattern => pattern.test(input.message));

      const contactMessage = await ctx.db.contactMessage.create({
        data: {
          message: input.message,
          ipAddress,
          userAgent,
          isSpam,
        },
      });

      return {
        success: true,
        id: contactMessage.id,
        isSpam,
      };
    }),

  getAll: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.db.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          message: true,
          ipAddress: true,
          isSpam: true,
          createdAt: true,
        },
      });
    }),

  getValidMessages: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.db.contactMessage.findMany({
        where: { isSpam: false },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          message: true,
          ipAddress: true,
          createdAt: true,
        },
      });
    }),
});
