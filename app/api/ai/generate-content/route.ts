import Groq from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';

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
  youtube: `Generate a list of 5 relevant YouTube videos to learn about "{topic}".
Return ONLY valid JSON:
{
  "items": [
    { "id": 1, "title": "Video Title", "channel": "Channel Name", "duration": "10:00", "thumbnail": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80" }
  ]
}`,
  videos: `Generate a list of 5 journey videos for the module "{topic}".
Return ONLY valid JSON:
{
  "items": [
    { "id": 1, "title": "Video Lesson Title", "instructor": "Instructor Name", "duration": "10:00", "thumbnail": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80" }
  ]
}`,
  pdfs: `Generate a list of 4 PDF resources or worksheets to learn about "{topic}".
Return ONLY valid JSON:
{
  "items": [
    { "id": 1, "title": "PDF Title", "pages": 10, "size": "1.2 MB", "description": "Short description of the PDF content." }
  ]
}`,
  chapter: `Generate an interactive coding challenge explaining "{topic}".
Return ONLY valid JSON:
{
  "title": "Topic Name",
  "readTime": "15 min",
  "theory": [
    "Paragraph 1 explaining the concept simply.",
    "Paragraph 2 with an example or analogy."
  ],
  "instructions": [
    "1. Do this first step.",
    "2. Do this second step."
  ],
  "code_starter": "def example():\\n    # Write your code here\\n    pass",
  "code_test": "import unittest\\nfrom main import *\\n\\nclass TestMain(unittest.TestCase):\\n    def test_example(self):\\n        self.assertEqual(example(), True)"
}`
};

export async function POST(req: NextRequest) {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || 'dummy_key_for_build' });

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
