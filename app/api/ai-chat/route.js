// app/api/ai-chat/route.js
// AI study assistant endpoint — proxies to Claude / OpenAI
// Replace ANTHROPIC_API_KEY or OPENAI_API_KEY in .env.local

import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a helpful AI study assistant for BUITEMS (Balochistan University of Information Technology, Engineering & Management Sciences) students. 
You help students with:
- Explaining academic concepts in CS, Engineering, Mathematics, Physics, Chemistry, and other subjects
- Study tips and exam preparation strategies
- Understanding assignments and project ideas
- University-related academic queries
- Career guidance for BUITEMS students

Keep responses concise, clear, and student-friendly. Use simple language. When explaining technical concepts, give examples.`;

export async function POST(request) {
  try {
    const { message } = await request.json();
    if (!message?.trim()) {
      return NextResponse.json({ reply: "Please enter a message." });
    }

    // ── Option 1: Anthropic Claude ────────────────────────────────────────
    if (process.env.ANTHROPIC_API_KEY) {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 500,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: message }],
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "I couldn't process that. Try again.";
      return NextResponse.json({ reply });
    }

    // ── Option 2: OpenAI ──────────────────────────────────────────────────
    if (process.env.OPENAI_API_KEY) {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          max_tokens: 500,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user",   content: message },
          ],
        }),
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "No response.";
      return NextResponse.json({ reply });
    }

    // ── Fallback: No AI key configured ───────────────────────────────────
    return NextResponse.json({
      reply:
        "AI assistant is not configured. Please add ANTHROPIC_API_KEY or OPENAI_API_KEY to your .env.local file to enable the AI assistant.",
    });

  } catch (error) {
    console.error("ai-chat error:", error);
    return NextResponse.json({ reply: "AI service unavailable. Please try again later." });
  }
}
