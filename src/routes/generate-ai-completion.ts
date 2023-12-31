import { OpenAIStream, streamToResponse } from 'ai';
import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { env } from '../lib/env';
import { openai } from "../lib/openai";
import { prisma } from "../lib/prisma";

export async function generateAiCompletionRoute(app: FastifyInstance) {
  app.post('/ai/complete', async (request, reply) => {
    const bodySchema = z.object({
      videoId: z.string().uuid(),
      prompt: z.string(),
      temperature: z.number().min(0).max(1).default(0.5)
    })

    const { videoId, prompt, temperature } = bodySchema.parse(request.body)

    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId
      }
    })

    const transcription = video.transcription

    if (!transcription) {
      return reply.status(400).send({
        error: "Video transcription was not generated yet."
      })
    }

    const promptMessage = prompt.replace("{transcription}", transcription)

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-16k',
      temperature,
      messages: [
        { role: 'user', content: promptMessage }
      ],
      stream: true,
    })

    const stream = OpenAIStream(response)
    streamToResponse(stream, reply.raw, {
      headers: {
        'Access-Control-Allow-Origin': env.CORS_ORIGIN,
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT, PATCH',
      }
    })
  })
}