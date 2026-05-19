import { useState, useRef, useEffect } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Sparkles, Home, ArrowRight } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

const SYSTEM_PROMPT = `You are a friendly, expert home maintenance assistant for TrustyPro. You help homeowners with:
- Diagnosing home maintenance issues
- Seasonal maintenance advice
- Cost estimates for common repairs
- When to DIY vs. hire a professional
- How to find and vet contractors
- Storm damage assessment and next steps
- Energy savings and efficiency improvements

Keep responses concise (2-4 paragraphs max), practical, and actionable. When relevant, suggest the homeowner get a quote from a vetted TrustyPro partner. Always be honest about uncertainty.`;

const SUGGESTED_QUESTIONS = [
  "My AC isn't cooling properly. What should I check first?",
  "How often should I clean my gutters?",
  "What's the best time of year to paint my house exterior?",
  "My water heater is making a popping sound. Is that normal?",
  "How do I know if I need a new roof?",
  "What home improvements add the most value before selling?",
  "How can I lower my energy bill this summer?",
  "Is it safe to DIY electrical outlet replacements?",
];

const QUICK_TOPICS = [
  { label: "🔧 Maintenance", question: "What seasonal home maintenance tasks should I do right now?" },
  { label: "🌩️ Storm Damage", question: "What should I check after a severe storm?" },
  { label: "💰 Cost Estimates", question: "What are typical costs for common home repairs in DFW?" },
  { label: "🏠 Energy Savings", question: "What are the best ways to reduce energy costs in a Texas home?" },
];

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
};

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

  const lastAssistantMsg = [...messages].reverse().find(m => m.role === "assistant");
  const showProAction = lastAssistantMsg && lastAssistantMsg.content.length > 100 && messages.length > 1;

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] flex flex-col">

        {/* Header */}
        <div className="bg-slate-900 border-b border-slate-700 px-6 py-4 flex items-center gap-3">
          <Link href="/my-home" className="text-slate-500 hover:text-slate-300 transition-colors">
            <Home className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-slate-900" />
            </div>
            <div>
              <div className="font-semibold text-white text-sm">TrustyPro Home Assistant</div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-teal-400 rounded-full" />
                <span className="text-xs text-slate-400">Online</span>
              </div>
            </div>
          </div>
          <Badge className="ml-auto bg-teal-400/10 text-teal-400 border border-teal-400/30 text-xs">
            <Sparkles className="w-3 h-3 mr-1" /> AI-Powered
          </Badge>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-3xl mx-auto w-full">

          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === "assistant" ? "bg-teal-500" : "bg-violet-600"
              }`}>
                {msg.role === "assistant"
                  ? <Bot className="w-4 h-4 text-slate-900" />
                  : <User className="w-4 h-4 text-white" />}
              </div>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === "assistant"
                  ? "bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-sm"
                  : "bg-teal-600 text-white rounded-tr-sm"
              }`}>
                {msg.content}
              </div>
            </div>
          ))}

          {/* Pro Action card — after a substantive assistant reply */}
          {showProAction && !isLoading && (
            <div className="ml-11">
              <div className="bg-slate-800/60 border border-teal-400/20 rounded-xl p-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-teal-400 text-xs font-semibold mb-0.5">Need a Pro?</div>
                  <div className="text-slate-400 text-xs">Get a free quote from vetted TrustyPro partners in DFW.</div>
                </div>
                <Link href="/trustypro/book">
                  <Button size="sm" className="bg-teal-500 hover:bg-teal-400 text-slate-900 text-xs font-semibold flex-shrink-0">
                    Book <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Typing indicator */}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-slate-900" />
              </div>
              <div className="bg-slate-800 border border-slate-700 p-3 rounded-2xl rounded-tl-sm">
                <div className="flex gap-1 items-center">
                  <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          {/* Suggested questions (only at start) */}
          {messages.length === 1 && (
            <div className="space-y-2">
              <p className="text-xs text-slate-500 text-center">Try asking:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SUGGESTED_QUESTIONS.map(q => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-left p-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-300 hover:border-teal-400/60 hover:text-teal-300 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="bg-slate-900 border-t border-slate-700 p-4">
          {/* Quick Topics */}
          <div className="max-w-3xl mx-auto mb-3 flex flex-wrap gap-2">
            {QUICK_TOPICS.map(topic => (
              <button
                key={topic.label}
                onClick={() => sendMessage(topic.question)}
                disabled={isLoading}
                className="text-xs px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:border-teal-400/60 hover:text-teal-300 transition-colors disabled:opacity-40"
              >
                {topic.label}
              </button>
            ))}
          </div>

          <div className="max-w-3xl mx-auto flex gap-2">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Ask about your home..."
              className="flex-1 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-teal-400"
              disabled={isLoading}
            />
            <Button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-slate-600 text-center mt-2">
            AI advice is general guidance. Always consult a licensed professional for safety-critical issues.
          </p>
        </div>
      </div>
    </HomeownerLayout>
  );
}
