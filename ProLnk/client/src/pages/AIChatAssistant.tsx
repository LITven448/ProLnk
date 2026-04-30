import { useState, useRef, useEffect } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sparkles, Send, Bot, User, RefreshCw, Lightbulb,
  TrendingUp, DollarSign, Users, MessageSquare, ChevronRight
} from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const QUICK_PROMPTS = [
  { icon: <TrendingUp className="w-3.5 h-3.5" />, text: "How can I increase my referral rate?" },
  { icon: <DollarSign className="w-3.5 h-3.5" />, text: "What's the best way to earn more commission?" },
  { icon: <Users className="w-3.5 h-3.5" />, text: "How do I move up to Gold tier?" },
  { icon: <MessageSquare className="w-3.5 h-3.5" />, text: "What should I say when referring a homeowner?" },
  { icon: <Lightbulb className="w-3.5 h-3.5" />, text: "Give me tips for spotting home repair needs" },
  { icon: <Sparkles className="w-3.5 h-3.5" />, text: "How does the TrustyPro network work?" },
];

const INITIAL_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: "Hey! I'm your ProLnk AI Assistant. I can help you maximize your earnings, understand the referral process, improve your tier standing, and answer any questions about the platform.\n\nWhat would you like to know?",
  timestamp: new Date(),
};

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isUser ? "text-white" : "text-white"}`}
        style={{ backgroundColor: isUser ? "#0A1628" : "#6366F1" }}>
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
        isUser
          ? "text-white rounded-tr-sm"
          : "bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-sm"
      }`}
        style={isUser ? { backgroundColor: "#0A1628" } : {}}>
        {msg.content.split("\n").map((line, i) => (
          <span key={i}>{line}{i < msg.content.split("\n").length - 1 && <br />}</span>
        ))}
        <p className={`text-xs mt-1.5 ${isUser ? "text-teal-100" : "text-gray-400"}`}>
          {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </div>
  );
}

export default function AIChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data: partnerStats } = trpc.partners.getMyProfile.useQuery();
  const askAI = trpc.partners.askAI.useMutation();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || isLoading) return;
    setInput("");

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const result = await askAI.mutateAsync({ question: content });
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: result.answer,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      toast.error("Failed to get a response. Please try again.");
      setMessages((prev) => prev.filter((m) => m.id !== userMsg.id));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PartnerLayout>
      <div className="flex flex-col max-w-3xl mx-auto" style={{ height: "calc(100vh - 9rem)" }}>
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: "#6366F1" }}>
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900">ProLnk AI Assistant</h1>
            <p className="text-xs text-gray-500">Ask anything about referrals, commissions, or growing your business</p>
          </div>
          <button
            className="ml-auto p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400"
            onClick={() => setMessages([INITIAL_MESSAGE])}
            title="Clear conversation"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ backgroundColor: "#F8FAFF" }}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: "#6366F1" }}>
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1.5 items-center h-5">
                  <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick prompts */}
        {messages.length <= 1 && (
          <div className="px-6 py-3 bg-white border-t border-gray-100">
            <p className="text-xs text-gray-400 mb-2 font-medium">Quick questions</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p.text}
                  onClick={() => sendMessage(p.text)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200 bg-white hover:border-indigo-300 hover:text-indigo-600 transition-all text-gray-600"
                >
                  {p.icon} {p.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="px-6 py-4 bg-white border-t border-gray-100">
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
            className="flex gap-3"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about referrals, commissions, tier progress..."
              className="flex-1 text-sm"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="text-white px-4"
              style={{ backgroundColor: "#6366F1" }}
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </PartnerLayout>
  );
}
