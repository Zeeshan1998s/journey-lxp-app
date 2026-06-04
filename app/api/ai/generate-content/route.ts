import Groq from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const CONTENT_PROMPTS: Record<string, string> = {
  articles: `Generate 3 article summaries for learning about "{topic}".
Return ONLY valid JSON:
{
  "items": [
    { "id": 1, "title": "Article Title", "author": "Author Name", "readTime": "X min", "summary": "2-sentence summary", "tags": ["tag1", "tag2"] }
  ]
}`,
  quiz: `Generate 4 multiple choice questions about "{topic}".
Return ONLY valid JSON:
{
  "questions": [
    {
      "id": 1,
      "question": "Question text?",
      "options": [
        { "id": "A", "text": "Option A", "correct": false },
        { "id": "B", "text": "Option B", "correct": true },
        { "id": "C", "text": "Option C", "correct": false },
        { "id": "D", "text": "Option D", "correct": false }
      ]
    }
  ]
}`,
  flashcards: `Generate 5 flashcards for learning "{topic}".
Return ONLY valid JSON:
{
  "cards": [
    { "id": 1, "front": "Question or term?", "back": "Answer or definition." }
  ]
}`,
  faq: `Generate 5 frequently asked questions about "{topic}".
Return ONLY valid JSON:
{
  "faqs": [
    { "id": 1, "question": "Question text?", "answer": "Detailed answer (2-3 sentences)." }
  ]
}`,
};

export async function POST(req: NextRequest) {
  try {
    const { topic, contentType } = await req.json();

    const promptTemplate = CONTENT_PROMPTS[contentType];
    if (!promptTemplate) {
      return NextResponse.json({ success: false, error: 'Invalid content type' }, { status: 400 });
    }

    const prompt = promptTemplate.replace('{topic}', topic);

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: 'You are an expert educational content creator. Return only valid JSON, no markdown or explanation.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.8,
      max_tokens: 1500,
    });

    const content = completion.choices[0]?.message?.content || '';
    
    let data;
    try {
      data = JSON.parse(content);
    } catch {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        data = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Invalid JSON from AI');
      }
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Content generation error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate content' },
      { status: 500 }
    );
  }
}
