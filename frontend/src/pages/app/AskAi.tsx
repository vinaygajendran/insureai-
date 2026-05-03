import { useState, useRef, useEffect } from "react";
import { useAppStore } from "../../store/useAppStore";
import { useT } from "../../i18n/strings";
import { suggestedQuestions, getAiAnswer } from "../../fixtures/mockData";
import { Send, Bot } from "lucide-react";
import type { ChatMessage } from "../../types/policy";

function renderMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
}

export default function AskAi() {
  const locale = useAppStore((s) => s.locale);
  const t = useT(locale);
  const messages = useAppStore((s) => s.chatMessages);
  const addMessage = useAppStore((s) => s.addChatMessage);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const sendMessage = (text: string) => {
    if (!text.trim() || thinking) return;
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    addMessage(userMsg);
    setInput("");
    setThinking(true);

    setTimeout(() => {
      const answer = getAiAnswer(text);
      const aiMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: answer.text,
        timestamp: new Date(),
        answerType: answer.type,
      };
      addMessage(aiMsg);
      setThinking(false);
    }, 1200 + Math.random() * 600);
  };

  const answerBadge = (type?: "yes" | "no" | "partial") => {
    if (!type) return null;
    const cfg = {
      yes: "bg-green-100 text-green-700",
      no: "bg-red-100 text-red-700",
      partial: "bg-amber-100 text-amber-700",
    }[type];
    return (
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cfg} uppercase mr-2`}>
        {t(type)}
      </span>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="bg-[#1e3a5f] px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#e87c2b]/20 flex items-center justify-center">
          <Bot size={18} className="text-[#e87c2b]" />
        </div>
        <div>
          <p className="text-white text-sm font-bold">AI Policy Assistant</p>
          <p className="text-white/50 text-[10px]">Based on your 3 uploaded policies · Powered by Claude</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-[#1e3a5f] flex items-center justify-center mr-2 shrink-0 mt-1">
                <Bot size={13} className="text-white" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-[#1e3a5f] text-white rounded-tr-sm"
                  : "bg-white border border-[#1e3a5f]/8 text-[#1e3a5f] rounded-tl-sm shadow-sm"
              }`}
            >
              {msg.role === "assistant" && msg.answerType && (
                <div className="mb-2">{answerBadge(msg.answerType)}</div>
              )}
              <p
                className="text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
              />
              <p className="text-[10px] opacity-40 mt-1.5">
                {msg.timestamp.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}

        {thinking && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#1e3a5f] flex items-center justify-center mr-2 shrink-0">
              <Bot size={13} className="text-white" />
            </div>
            <div className="bg-white border border-[#1e3a5f]/8 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1 items-center">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-[#e87c2b] pulse-dot"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
                <span className="text-xs text-gray-400 ml-2">Reading your policies…</span>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && !thinking && (
        <div className="px-4 pb-2">
          <p className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wide">Suggested questions</p>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="shrink-0 bg-white border border-[#1e3a5f]/15 text-[#1e3a5f] text-xs rounded-xl px-3 py-2 font-medium whitespace-nowrap active:scale-95 transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-4 pb-4 pt-2 safe-bottom bg-white border-t border-gray-100">
        <div className="flex items-end gap-2">
          <div className="flex-1 bg-[#fdf8f2] border border-[#1e3a5f]/15 rounded-2xl px-4 py-3">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
              placeholder={t("askPlaceholder")}
              className="w-full bg-transparent outline-none text-sm text-[#1e3a5f] resize-none"
            />
          </div>
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || thinking}
            className="w-11 h-11 rounded-2xl bg-[#e87c2b] disabled:opacity-40 flex items-center justify-center active:scale-95 transition-all shrink-0"
          >
            <Send size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
