import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { smoothStream, streamText } from 'ai';
import { google } from '@ai-sdk/google';
export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        prompt: z.string(),
      }),
    )
    .query(({input}) => {
       const result = streamText({
            model: google("gemini-2.0-flash"),
            prompt: input.prompt,
            experimental_transform: smoothStream({
            delayInMs: 10,
            chunking: "word"
            })
        });

     return result.toDataStreamResponse();

    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;