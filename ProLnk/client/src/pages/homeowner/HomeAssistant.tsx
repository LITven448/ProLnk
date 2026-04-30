import { useState, useRef, useEffect } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Sparkles, ArrowRight, Home } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { toast } from "sonner";

const SUGGESTED_QUESTIONS = [
  "My AC isn't cooling properly. What should I check first?",
  "How often should I clean my gutters?",
  "What's the best time of year to paint my house exterior?",
  "My water heater is making a popping sound. Is that normal?",
  "How do I know if I need a new roof?",
  "What home improvements add the most value before selling?",
];

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
};

const SYSTEM_PROMPT = `You are a friendly, expert home maintenance assistant for TrustyPro. You help homeowners with:
- Diagnosing home maintenance issues
- Seasonal maintenance advice
- Cost estimates for common repairs
- When to DIY vs. hire a professional
- How to find and vet contractors

Keep responses concise (2-4 paragraphs max), practical, and actionable. When relevant, suggest the homeowner get a quote from a vetted TrustyPro partner. Always be honest about uncertainty.`;

export default function HomeAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your TrustyPro Home Assistant. I can help you diagnose issues, plan maintenance, estimate costs, and decide when to call a pro. What's going on with your home today?",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const askAssistant = trpc.ai.askHomeAssistant.useMutation({
    onSuccess: (data: { answer: string }) => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: String(data.answer),
        timestamp: Date.now(),
      }]);
      setIsLoading(false);
    },
    onError: () => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: Date.now(),
      }]);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text?: string) => {
    const msg = text || input.trim();
    if (!msg || isLoading) return;

    setMessages(prev => [...prev, { role: "user", content: msg, timestamp: Date.now() }]);
    setInput("");
    setIsLoading(true);

    askAssistant.mutate({
      message: msg,
      history: messages.slice(-6).map(m => ({ role: m.role, content: m.content })),
    });
  };

  return (
    <HomeownerLayout>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center gap-3">
        <Link href="/my-home" className="text-slate-400 hover:text-slate-700">
          <Home className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-semibold text-slate-900 text-sm">TrustyPro Home Assistant</div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-xs text-slate-400">Online</span>
            </div>
          </div>
        </div>
        <Badge className="ml-auto bg-indigo-50 text-indigo-700 text-xs">
          <Sparkles className="w-3 h-3 mr-1" /> AI-Powered
        </Badge>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-3xl mx-auto w-full">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.role === "assistant" ? "bg-indigo-600" : "bg-slate-700"
            }`}>
              {msg.role === "assistant" ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
            </div>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === "assistant"
                ? "bg-white border border-slate-200 text-slate-800 rounded-tl-sm"
                : "bg-indigo-600 text-white rounded-tr-sm"
            }`}>
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        {/* Suggested Questions (only at start) */}
        {messages.length === 1 && (
          <div className="space-y-2">
            <p className="text-xs text-slate-400 text-center">Try asking:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SUGGESTED_QUESTIONS.map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-left p-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 hover:border-indigo-300 hover:text-indigo-700 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t p-4">
        <div className="max-w-3xl mx-auto flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Ask about your home..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isLoading}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-slate-400 text-center mt-2">
          AI advice is general guidance. Always consult a licensed professional for safety-critical issues.
        </p>
      </div>
    </div>
    </HomeownerLayout>
  );
}
