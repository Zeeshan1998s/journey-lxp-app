import Groq from 'groq-sdk';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || 'dummy_key_for_build' });

  try {
    const { messages, journeyTitle, currentTopic } = await req.json();

    const stream = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: `You are "Journey AI", a helpful and encouraging learning assistant for the Journeybuilder platform.

Current learning context:
- Journey: ${journeyTitle || 'General Learning'}
- Current topic: ${currentTopic || 'General'}

Your role:
- Answer questions about the current topic clearly and concisely
- Give practical examples when explaining concepts
- Encourage the learner and keep energy positive
- Keep responses focused and under 150 words unless asked for more detail
- Use simple language, avoid jargon unless necessary`
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500,
      stream: true,
    });

    // Create a streaming response
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const delta = chunk.choices[0]?.delta?.content || '';
            if (delta) {
              controller.enqueue(encoder.encode(delta));
            }
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error: any) {
    console.error('Chat error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
