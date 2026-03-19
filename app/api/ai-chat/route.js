import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are a helpful AI study assistant for students. 
You help students with:
- Explaining academic concepts in CS, Engineering, Mathematics, Physics, Chemistry, and other subjects
- Study tips and exam preparation strategies
- Understanding assignments and project ideas
- University-related academic queries
- Career guidance for  students

Keep responses concise, clear, and student-friendly. Use simple language. When explaining technical concepts, give examples.`;

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message?.trim()) {
      return NextResponse.json({
        success: false,
        reply: "Please enter a message.",
      });
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({
        success: false,
        reply:
          "AI assistant is not configured. Please add GROQ_API_KEY to your .env.local file to enable the AI assistant.",
      });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "I couldn't process that. Try again.";

    return NextResponse.json({
      success: true,
      reply: reply,
    });
  } catch (error) {
    console.error("Groq API error:", error);
    return NextResponse.json({
      success: false,
      reply: "AI service unavailable. Please try again later.",
      error: error.message,
    });
  }
}
