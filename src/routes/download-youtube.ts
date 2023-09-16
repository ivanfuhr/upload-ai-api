import { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import { createWriteStream } from "node:fs";
import path from "node:path";
import ytdl from "ytdl-core";
import { z } from "zod";
import { prisma } from "../lib/prisma";

type DownloadYoutubeBody = {
  ok: boolean,
  title: string
}

export async function downloadYoutubeRoute(app: FastifyInstance) {
  app.route({
    method: 'POST',
    url: '/youtube',
    handler: async (request, reply) => {

      const bodySchema = z.object({
        url: z.string()
      })

      const { url } = bodySchema.parse(request.body)

      if (!ytdl.validateURL(url)) {
        return reply.status(400).send({
          error: "Invalid URL"
        })
      }

      const uploadDestination = path.resolve(__dirname, '../../tmp', `audio-${randomUUID()}.mp3`)

      const response = await new Promise<DownloadYoutubeBody>((resolve, reject) => {
        let responseBody: DownloadYoutubeBody = {
          ok: false,
          title: ''
        }

        ytdl(url, {
          quality: 'lowestaudio',
          filter: 'audioonly'
        })
          .on('info', (info) => {
            responseBody.title = info.videoDetails.title
          })
          .on('end', () => {
            responseBody.ok = true
            resolve(responseBody)
          })
          .on('error', () => {
            responseBody.ok = false
            reject(responseBody)
          })
          .pipe(createWriteStream(uploadDestination));
      })

      if (!response.ok) {
        return reply.status(400).send({
          error: "Error downloading video"
        })
      }

      const video = await prisma.video.create({
        data: {
          name: response.title,
          path: uploadDestination
        }
      })

      return {
        video: {
          id: video.id,
        }
      }
    }
  })
}