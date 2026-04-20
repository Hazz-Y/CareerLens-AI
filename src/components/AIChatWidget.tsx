"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: number;
  sender: "user" | "ai";
  text: string;
  time: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    sender: "ai",
    text: "Hi Arjun! 👋 I'm your CareerLens AI assistant powered by real-time AI. I can help you understand your placement readiness, suggest improvements, and answer career questions. What would you like to know?",
    time: "Just now",
  },
];

const quickActions = [
  "Why is my risk score 24?",
  "How can I improve my resume?",
  "What skills should I learn?",
  "Show my placement chances",
  "Analyze my loan repayment risk",
];

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      sender: "user",
      text: msg,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.slice(-10).map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      if (!response.ok) throw new Error("API error");

      const data = await response.json();

      const aiMsg: Message = {
        id: Date.now() + 1,
        sender: "ai",
        text: data.text || data.error || "Sorry, I couldn't process that.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errorMsg: Message = {
        id: Date.now() + 1,
        sender: "ai",
        text: "I'm having trouble connecting right now. Please try again in a moment.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-50 w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95"
        style={{
          background: "var(--gradient-primary)",
          boxShadow: "0 4px 20px rgba(99, 102, 241, 0.4)",
        }}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 lg:bottom-26 lg:right-8 z-50 w-[380px] max-w-[calc(100vw-48px)] rounded-2xl overflow-hidden animate-scale-in flex flex-col"
          style={{
            background: "white",
            border: "1px solid var(--card-border)",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
            height: "520px",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
            style={{ background: "var(--gradient-hero)" }}
          >
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">AI Career Assistant</p>
              <p className="text-[10px] text-indigo-200">Powered by Groq AI</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-indigo-200">Live</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background:
                      msg.sender === "ai"
                        ? "var(--indigo-50)"
                        : "var(--gradient-primary)",
                  }}
                >
                  {msg.sender === "ai" ? (
                    <Bot size={14} style={{ color: "var(--indigo-600)" }} />
                  ) : (
                    <User size={14} className="text-white" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-xl text-[13px] leading-relaxed ${
                    msg.sender === "user" ? "rounded-tr-md" : "rounded-tl-md"
                  }`}
                  style={{
                    background:
                      msg.sender === "user"
                        ? "var(--indigo-600)"
                        : "var(--indigo-50)",
                    color: msg.sender === "user" ? "white" : "var(--text-primary)",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--indigo-50)" }}
                >
                  <Bot size={14} style={{ color: "var(--indigo-600)" }} />
                </div>
                <div
                  className="px-4 py-3 rounded-xl rounded-tl-md"
                  style={{ background: "var(--indigo-50)" }}
                >
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex-shrink-0">
              <div className="flex flex-wrap gap-1.5">
                {quickActions.map((action) => (
                  <button
                    key={action}
                    onClick={() => handleSend(action)}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors hover:bg-indigo-100"
                    style={{
                      background: "var(--indigo-50)",
                      color: "var(--indigo-600)",
                      border: "1px solid var(--indigo-100)",
                    }}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div
            className="flex items-center gap-2 px-4 py-3 border-t flex-shrink-0"
            style={{ borderColor: "var(--card-border)" }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isTyping && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 text-sm bg-transparent outline-none"
              style={{ color: "var(--text-primary)" }}
              disabled={isTyping}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all disabled:opacity-30"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Send size={14} className="text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
