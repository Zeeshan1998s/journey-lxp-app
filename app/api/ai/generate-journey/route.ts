import Groq from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || 'dummy_key_for_build' });

  try {
    const { prompt } = await req.json();

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: `You are a curriculum design expert. When given a learning goal, generate a structured learning journey as JSON.

Return ONLY valid JSON in this exact format, no markdown, no explanation:
{
  "title": "Journey Title (max 5 words)",
  "description": "One sentence describing what the learner will achieve",
  "nodes": [
    { "id": "1", "label": "Root Topic Name", "type": "root", "parentId": null },
    { "id": "2", "label": "Branch Topic", "type": "branch", "parentId": "1" },
    { "id": "3", "label": "Leaf Subtopic", "type": "leaf", "parentId": "2" }
  ]
}

Rules:
- Exactly 1 root node
- 4-5 branch nodes connected to root
- 3-4 leaf nodes per branch
- Total 15-20 nodes
- Labels should be concise (3-6 words max)
- Types must be exactly: "root", "branch", or "leaf"
- IDs must be sequential strings: "1", "2", "3" etc.`
        },
        {
          role: 'user',
          content: `Generate a learning journey for: "${prompt}"`
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = completion.choices[0]?.message?.content || '';
    
    // Parse and validate the JSON
    let journeyData;
    try {
      journeyData = JSON.parse(content);
    } catch {
      // Try to extract JSON from the response if it has extra text
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        journeyData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Invalid JSON response from AI');
      }
    }

    return NextResponse.json({ success: true, journey: journeyData });
  } catch (error: any) {
    console.error('Journey generation error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate journey' },
      { status: 500 }
    );
  }
}
