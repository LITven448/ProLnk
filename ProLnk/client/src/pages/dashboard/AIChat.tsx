import React, { useState, useRef, useEffect, useCallback } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sparkles, Send, Bot, User, RefreshCw, Download,
  TrendingUp, DollarSign, Lightbulb,
  Network, HelpCircle, ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "prolnk_aichat_full_history";
const MAX_HISTORY = 10;

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface PromptGroup {
  label: string;
  icon: React.ReactNode;
  prompts: string[];
}

const PROMPT_GROUPS: PromptGroup[] = [
  {
    label: "Income",
    icon: <DollarSign className="w-4 h-4" />,
    prompts: [
      "Calculate my override income",
      "How much can I earn at Tier 3?",
      "When is my next payout?",
      "Explain the 60% commission keep",
      "What is home origination income?",
    ],
  },
  {
    label: "Leads",
    icon: <TrendingUp className="w-4 h-4" />,
    prompts: [
      "Show me my best leads",
      "How do I get more inbound leads?",
      "What trades generate the most leads?",
      "How does AI lead routing work?",
      "What makes a high-quality lead?",
    ],
  },
  {
    label: "Network",
    icon: <Network className="w-4 h-4" />,
    prompts: [
      "How do I increase my tier?",
      "How do I recruit new partners?",
      "What is the 4-level override cascade?",
      "How many referrals to reach Founding tier?",
      "What is the subscription override?",
    ],
  },
  {
    label: "Platform",
    icon: <HelpCircle className="w-4 h-4" />,
    prompts: [
      "How does photo scanning work?",
      "What is the Home Health Vault?",
      "How do I complete my profile?",
      "What is TrustyPro vs ProLnk?",
      "How does origination rights work?",
    ],
  },
];

function loadHistory(): Message[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: Message[] = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(-MAX_HISTORY) : [];
  } catch {
    return [];
  }
}

function saveHistory(messages: Message[]) {
  try {
    const nonWelcome = messages.filter((m) => m.id !== "welcome");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nonWelcome.slice(-MAX_HISTORY)));
  } catch {
    // quota exceeded
  }
}

function buildWelcome(name?: string): Message {
  const greeting = name ? `Hey ${name}` : "Hey";
  return {
    id: "welcome",
    role: "assistant",
    content: `${greeting}! I'm ProLnk AI — your co-pilot for maximizing income and growing your network.\n\nI can help you understand commissions, find leads, optimize your tier, and answer any platform question. Pick a category on the left or type anything below.`,
    timestamp: new Date().toISOString(),
  };
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  const lines = msg.content.split("\n");
  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white shadow-sm"
        style={{ backgroundColor: isUser ? "#0A1628" : "#6366F1" }}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      <div
        className={cn(
          "max-w-[60%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "text-white rounded-tr-sm shadow-sm"
            : "bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-sm",
        )}
        style={isUser ? { backgroundColor: "#0A1628" } : {}}
      >
        {lines.map((line, i) => (
          <span key={i}>
            {line}
            {i < lines.length - 1 && <br />}
          </span>
        ))}
        <p className={cn("text-xs mt-1.5", isUser ? "text-blue-200" : "text-gray-400")}>
          {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </div>
  );
}

export default function AIChat() {
  const { data: profile } = trpc.partners.getMyProfile.useQuery();
  const partnerName = (profile as { firstName?: string } | undefined)?.firstName;
  const tierBadge = (profile as { tier?: string } | undefined)?.tier;

  const [messages, setMessages] = useState<Message[]>(() => {
    const history = loadHistory();
    const welcome = buildWelcome(undefined);
    return history.length > 0 ? [welcome, ...history] : [welcome];
  });

  useEffect(() => {
    if (partnerName) {
      setMessages((prev) => [buildWelcome(partnerName), ...prev.slice(1)]);
    }
  }, [partnerName]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string>(PROMPT_GROUPS[0].label);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const askAI = trpc.partners.askAI.useMutation();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const clearHistory = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setMessages([buildWelcome(partnerName)]);
    inputRef.current?.focus();
  }, [partnerName]);

  const exportConversation = useCallback(() => {
    const lines = messages
      .filter((m) => m.id !== "welcome")
      .map((m) => {
        const time = new Date(m.timestamp).toLocaleString();
        const speaker = m.role === "user" ? "You" : "ProLnk AI";
        return `[${time}] ${speaker}:\n${m.content}\n`;
      });
    if (lines.length === 0) {
      toast.info("No conversation to export yet.");
      return;
    }
    const blob = new Blob(
      [`ProLnk AI Conversation Export\n${"=".repeat(40)}\n\n`, ...lines],
      { type: "text/plain" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `prolnk-ai-chat-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Conversation exported.");
  }, [messages]);

  const sendMessage = useCallback(
    async (text?: string) => {
      const content = (text ?? input).trim();
      if (!content || isLoading) return;
      setInput("");

      const userMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        content,
        timestamp: new Date().toISOString(),
      };
      const updated = [...messages, userMsg];
      setMessages(updated);
      saveHistory(updated);
      setIsLoading(true);

      try {
        const result = await askAI.mutateAsync({ question: content });
        const assistantMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: result.answer,
          timestamp: new Date().toISOString(),
        };
        const withReply = [...updated, assistantMsg];
        setMessages(withReply);
        saveHistory(withReply);
      } catch {
        toast.error("Failed to get a response. Please try again.");
        setMessages((prev) => prev.filter((m) => m.id !== userMsg.id));
      } finally {
        setIsLoading(false);
        inputRef.current?.focus();
      }
    },
    [input, isLoading, messages, askAI],
  );

  const activePrompts = PROMPT_GROUPS.find((g) => g.label === activeGroup)?.prompts ?? [];

  return (
    <PartnerLayout>
      <div className="flex" style={{ height: "calc(100vh - 9rem)" }}>
        {/* Sidebar */}
        <aside className="w-56 border-r border-gray-100 bg-white flex flex-col flex-shrink-0">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                style={{ backgroundColor: "#6366F1" }}
              >
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">ProLnk AI</p>
                {tierBadge && (
                  <p className="text-xs text-emerald-600 font-medium capitalize">{tierBadge} tier</p>
                )}
              </div>
            </div>
          </div>

          <div className="p-3 flex-1 overflow-y-auto">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">Topics</p>
            {PROMPT_GROUPS.map((group) => (
              <div key={group.label}>
                <button
                  onClick={() => setActiveGroup(group.label)}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all mb-0.5",
                    activeGroup === group.label
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-50",
                  )}
                >
                  <span className={activeGroup === group.label ? "text-indigo-500" : "text-gray-400"}>
                    {group.icon}
                  </span>
                  {group.label}
                </button>
                {activeGroup === group.label && (
                  <div className="ml-3 mb-2 space-y-0.5 border-l-2 border-indigo-100 pl-2">
                    {activePrompts.map((p) => (
                      <button
                        key={p}
                        onClick={() => sendMessage(p)}
                        className="w-full text-left text-xs text-gray-500 hover:text-indigo-600 py-1 px-2 rounded hover:bg-indigo-50 transition-colors flex items-center gap-1 group"
                      >
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        <span className="line-clamp-2">{p}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-gray-100 flex flex-col gap-1.5">
            <button
              onClick={exportConversation}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Export chat
            </button>
            <button
              onClick={clearHistory}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> New conversation
            </button>
          </div>
        </aside>

        {/* Main chat area */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Header bar */}
          <div className="px-6 py-3 border-b border-gray-100 bg-white flex items-center gap-3">
            <div>
              <h1 className="font-bold text-gray-900 text-base">
                {partnerName ? `${partnerName}'s AI Assistant` : "AI Assistant"}
              </h1>
              <p className="text-xs text-gray-500">
                Helping service professionals maximize income and network
              </p>
            </div>
            <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-600 font-medium">Beta</span>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-6 py-6 space-y-5"
            style={{ backgroundColor: "#F8FAFF" }}
          >
            {messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-sm"
                  style={{ backgroundColor: "#6366F1" }}
                >
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1.5 items-center h-5">
                    <span className="w-2 h-2 rounded-full bg-indigo-300 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-indigo-300 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-indigo-300 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Pro tip strip — only when fresh */}
          {messages.length <= 1 && (
            <div className="mx-6 mb-3 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-2 text-xs text-amber-800">
              <Lightbulb className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-amber-500" />
              <span>
                <span className="font-semibold">Pro tip:</span> Ask about your earnings, leads, or how to grow your network — I have full context on the ProLnk commission system and platform.
              </span>
            </div>
          )}

          {/* Input area */}
          <div className="px-6 py-4 bg-white border-t border-gray-100">
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
              className="flex gap-3"
            >
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about commissions, leads, network overrides..."
                className="flex-1 text-sm"
                disabled={isLoading}
                autoFocus
              />
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="text-white px-5"
                style={{ backgroundColor: "#6366F1" }}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Powered by Claude · AI answers based on platform knowledge · Last 10 messages saved locally
            </p>
          </div>
        </div>
      </div>
    </PartnerLayout>
  );
}
