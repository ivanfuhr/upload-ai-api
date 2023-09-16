import { fastifyCors } from '@fastify/cors';
import { fastify } from 'fastify';
import { env } from './lib/env';
import { createTranscriptionRoute } from './routes/create-transcription';
import { downloadYoutubeRoute } from './routes/download-youtube';
import { generateAiCompletionRoute } from './routes/generate-ai-completion';
import { getAllPromptsRoute } from './routes/get-all-prompts';
import { uploadVideoRoute } from './routes/upload-video';

const app = fastify({ logger: true })

app.register(fastifyCors, {
  origin: env.CORS_ORIGIN,  
})

app.register(getAllPromptsRoute);
app.register(uploadVideoRoute);
app.register(downloadYoutubeRoute);
app.register(createTranscriptionRoute)
app.register(generateAiCompletionRoute)

app.listen({ port: 8080, host: '0.0.0.0' })