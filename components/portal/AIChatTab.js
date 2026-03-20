"use client";

import { useState, useEffect, useRef } from "react";
import { FaRobot } from "react-icons/fa6";

export default function AIChatTab() {
  const [msgs, setMsgs] = useState([
    {
      role: "assistant",
      text: "Hi! I'm your AI study assistant. Ask me anything about your studies, subjects, or academics..",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const isInitialLoadRef = useRef(true);

  // Only scroll to bottom when new messages are added, not on initial mount
  useEffect(() => {
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      return;
    }
    messagesContainerRef.current?.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [msgs]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMsgs((p) => [...p, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setMsgs((p) => [
        ...p,
        {
          role: "assistant",
          text: data.reply || "Sorry, I couldn't process that.",
        },
      ]);
    } catch {
      setMsgs((p) => [
        ...p,
        {
          role: "assistant",
          text: "AI service unavailable. Please try again later.",
        },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="card flex flex-col h-[500px]">
      <div className="flex items-center gap-2 pb-3 border-b mb-3">
        <span className="text-xl"><FaRobot /></span>
        <h3 className="font-semibold text-gray-800">AI Study Assistant</h3>
        <span className="ml-auto text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
          ● Online
        </span>
      </div>
      {/* Messages */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto space-y-3 pr-1"
      >
        {msgs.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                m.role === "user"
                  ? "navbar-bg text-white rounded-br-none"
                  : "bg-gray-100 text-gray-700 rounded-bl-none"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-500 px-4 py-2.5 rounded-2xl rounded-bl-none text-sm">
              <span className="animate-pulse">Thinking…</span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      {/* Input */}
      <div className="flex gap-2 mt-3 pt-3 border-t">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="Ask about Data Structures, calculus, exams…"
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          className="px-5 py-2.5 navbar-bg text-white font-medium rounded-xl hover:opacity-90 disabled:opacity-40 transition-opacity text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
}
