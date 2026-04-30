import { useState, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { MessageCircle, X, Send, Loader2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type ChatMode = "advertiser" | "homeowner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface SupportChatWidgetProps {
  mode: ChatMode;
  accentColor?: string;
  title?: string;
  subtitle?: string;
  suggestedQuestions?: string[];
}

const DEFAULT_QUESTIONS: Record<ChatMode, string[]> = {
  advertiser: [
    "How does featured advertising work?",
    "What's the difference between tiers?",
    "How do I track my ad performance?",
    "Can I target specific zip codes?",
  ],
  homeowner: [
    "How does the photo analysis work?",
    "Are the professionals vetted?",
    "Is TrustyPro free to use?",
    "How do I find pros near me?",
  ],
};

export default function SupportChatWidget({
  mode,
  accentColor = "#0A1628",
  title = "Ask Us Anything",
  subtitle = "We typically reply instantly",
  suggestedQuestions,
}: SupportChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [hasUnread, setHasUnread] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const questions = suggestedQuestions ?? DEFAULT_QUESTIONS[mode];

  const advertiserMutation = trpc.supportChat.advertiserChat.useMutation({
    onSuccess: (data) => {
      setMessages(prev => [...prev, { role: "assistant", content: data.answer }]);
      if (!isOpen || isMinimized) setHasUnread(true);
    },
    onError: () => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I'm having trouble responding right now. Please try again in a moment.",
      }]);
    },
  });

  const homeownerMutation = trpc.supportChat.homeownerChat.useMutation({
    onSuccess: (data) => {
      setMessages(prev => [...prev, { role: "assistant", content: data.answer }]);
      if (!isOpen || isMinimized) setHasUnread(true);
    },
    onError: () => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I'm having trouble responding right now. Please try again in a moment.",
      }]);
    },
  });

  const mutation = mode === "advertiser" ? advertiserMutation : homeownerMutation;
  const isLoading = mutation.isPending;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setHasUnread(false);
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const sendMessage = (content: string) => {
    if (!content.trim() || isLoading) return;
    const userMsg: Message = { role: "user", content: content.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");

    const payload = updatedMessages.map(m => ({ role: m.role, content: m.content }));
    if (mode === "advertiser") {
      advertiserMutation.mutate({ messages: payload });
    } else {
      homeownerMutation.mutate({ messages: payload });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      {isOpen && (
        <div
          className={cn(
            "w-[360px] rounded-2xl shadow-2xl border border-gray-200 bg-white overflow-hidden flex flex-col transition-all duration-300",
            isMinimized ? "h-14" : "h-[480px]"
          )}
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.18)" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
            style={{ background: accentColor }}
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <div>
                <p className="text-white text-sm font-semibold leading-tight">{title}</p>
                {!isMinimized && (
                  <p className="text-white/70 text-xs">{subtitle}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                className="text-white/70 hover:text-white p-1 rounded transition-colors"
                onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
              >
                <ChevronDown className={cn("h-4 w-4 transition-transform", isMinimized ? "rotate-180" : "")} />
              </button>
              <button
                className="text-white/70 hover:text-white p-1 rounded transition-colors"
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.length === 0 ? (
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ background: accentColor }}
                      >
                        AI
                      </div>
                      <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 text-sm text-gray-700 shadow-sm border border-gray-100 max-w-[260px]">
                        Hi! I'm here to help. What questions do you have?
                      </div>
                    </div>
                    <div className="pl-9 flex flex-wrap gap-2">
                      {questions.map((q) => (
                        <button
                          key={q}
                          onClick={() => sendMessage(q)}
                          className="text-xs px-3 py-1.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors text-left"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  messages.map((msg, i) => (
                    <div
                      key={i}
                      className={cn("flex items-start gap-2", msg.role === "user" ? "flex-row-reverse" : "")}
                    >
                      {msg.role === "assistant" && (
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                          style={{ background: accentColor }}
                        >
                          AI
                        </div>
                      )}
                      <div
                        className={cn(
                          "rounded-2xl px-3 py-2 text-sm max-w-[260px] shadow-sm",
                          msg.role === "user"
                            ? "text-white rounded-tr-sm"
                            : "bg-white text-gray-700 rounded-tl-sm border border-gray-100"
                        )}
                        style={msg.role === "user" ? { background: accentColor } : {}}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex items-start gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                      style={{ background: accentColor }}
                    >
                      AI
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm border border-gray-100">
                      <div className="flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-3 border-t border-gray-100 bg-white">
                <div className="flex gap-2 items-end">
                  <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="resize-none text-sm min-h-[40px] max-h-[100px] rounded-xl border-gray-200"
                    rows={1}
                    disabled={isLoading}
                  />
                  <Button
                    size="icon"
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || isLoading}
                    className="h-10 w-10 rounded-xl shrink-0"
                    style={{ background: accentColor }}
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-gray-400 mt-1.5 text-center">AI-powered · Responses may vary</p>
              </div>
            </>
          )}
        </div>
      )}

      {/* FAB button */}
      <button
        onClick={() => { setIsOpen(!isOpen); setHasUnread(false); }}
        className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 relative"
        style={{ background: accentColor }}
        aria-label="Open support chat"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {hasUnread && !isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
        )}
      </button>
    </div>
  );
}
