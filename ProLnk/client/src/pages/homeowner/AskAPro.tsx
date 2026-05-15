import React from 'react';
import { useState, useRef } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  MessageCircleQuestion, ShieldCheck, Star, ThumbsUp, ThumbsDown,
  Paperclip, Loader2, Wind, Droplets, Zap, Home, Layers,
  Paintbrush2, Leaf, Wrench, Clock, Send,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";

type Trade =
  | "HVAC"
  | "Plumbing"
  | "Electrical"
  | "Roofing"
  | "Foundation"
  | "Painting"
  | "Landscaping"
  | "General";

const TRADE_ICONS: Record<Trade, React.ElementType> = {
  HVAC: Wind,
  Plumbing: Droplets,
  Electrical: Zap,
  Roofing: Home,
  Foundation: Layers,
  Painting: Paintbrush2,
  Landscaping: Leaf,
  General: Wrench,
};

const SAMPLE_QUESTIONS: Record<Trade, string[]> = {
  HVAC: [
    "My AC is blowing warm air but the fan is running — what's wrong?",
    "How often should I replace my HVAC filter?",
    "My heat pump is making a grinding noise — is this serious?",
  ],
  Plumbing: [
    "Water pressure dropped in my shower over the past month. DIY fix?",
    "My toilet runs for 30 seconds after flushing — what part needs replacing?",
    "I smell sulfur from my hot water tap only — what causes this?",
  ],
  Electrical: [
    "One circuit keeps tripping the breaker every few days — is this dangerous?",
    "Can I safely add a ceiling fan to an existing light circuit?",
    "My GFCI outlet keeps tripping even with nothing plugged in — why?",
  ],
  Roofing: [
    "I have a few missing shingles after the last storm — how urgent is this?",
    "What is the typical lifespan of a 30-year architectural shingle?",
    "Can I add a second layer of shingles over the existing ones?",
  ],
  Foundation: [
    "I have a small crack in my basement wall — should I be worried?",
    "What is the difference between a structural crack and a shrinkage crack?",
    "My doors are sticking and there are cracks above the frames — foundation issue?",
  ],
  Painting: [
    "How do I fix peeling paint on a bathroom ceiling?",
    "What prep work is required before painting over glossy surfaces?",
    "How many gallons of paint do I need for a 1,500 sq ft exterior?",
  ],
  Landscaping: [
    "My lawn has bare patches that won't fill in — what should I do?",
    "When is the best time to aerate and overseed in the southeast?",
    "My large oak tree has dead branches — is it a hazard?",
  ],
  General: [
    "How often should I schedule a home inspection even with no obvious issues?",
    "What are the most important items to check before buying a home?",
    "How do I know if my home needs rewiring?",
  ],
};

interface ProAnswer {
  id: number;
  proName: string;
  proTrade: Trade;
  rating: number;
  verified: boolean;
  question: string;
  answer: string;
  helpful: number;
  notHelpful: number;
  timeAgo: string;
}

const MOCK_ANSWERS: ProAnswer[] = [
  {
    id: 1,
    proName: "Marcus H.",
    proTrade: "HVAC",
    rating: 4.9,
    verified: true,
    question: "My AC is blowing warm air but the fan is running — what's wrong?",
    answer:
      "This is almost always a refrigerant issue — low freon or a small leak in the system. Less commonly it could be a failed capacitor or compressor. I'd recommend having a certified HVAC tech run a pressure test before the summer heat peaks. Don't keep running it low on refrigerant as it can damage the compressor long-term.",
    helpful: 34,
    notHelpful: 2,
    timeAgo: "2 hours ago",
  },
  {
    id: 2,
    proName: "Dena R.",
    proTrade: "Plumbing",
    rating: 4.8,
    verified: true,
    question: "Water pressure dropped in my shower over the past month — DIY fix?",
    answer:
      "Start with the showerhead — unscrew it, soak in white vinegar overnight, and rinse. Mineral buildup is the #1 culprit and this fix is free. If pressure is low at every fixture, check the main shutoff valve is fully open and test the pressure regulator near your meter. Pressure below 40 PSI typically means the regulator needs replacement.",
    helpful: 41,
    notHelpful: 1,
    timeAgo: "5 hours ago",
  },
  {
    id: 3,
    proName: "Troy M.",
    proTrade: "Electrical",
    rating: 4.7,
    verified: true,
    question: "One circuit keeps tripping every few days — is this dangerous?",
    answer:
      "Treat this as a warning sign. A breaker trips because it's protecting you — repeated trips mean the circuit is over-drawing current, there's a short somewhere, or the breaker itself is failing. Unplug high-draw appliances on that circuit first to rule out a simple overload. If it still trips without heavy load, call a licensed electrician. Faulty wiring is a leading cause of house fires.",
    helpful: 67,
    notHelpful: 0,
    timeAgo: "Yesterday",
  },
  {
    id: 4,
    proName: "Linda P.",
    proTrade: "Roofing",
    rating: 4.8,
    verified: true,
    question: "I have a few missing shingles after the last storm — how urgent?",
    answer:
      "Address it within two weeks, sooner if more rain is forecast. Missing shingles expose the underlayment to UV and water intrusion. One rain event can cause thousands in interior damage from a small gap. You can temporarily patch with roof cement from a hardware store. A roofer can match and replace individual shingles — usually a one- to two-hour job costing $150–$350.",
    helpful: 28,
    notHelpful: 3,
    timeAgo: "2 days ago",
  },
  {
    id: 5,
    proName: "James W.",
    proTrade: "Foundation",
    rating: 4.9,
    verified: true,
    question: "I have a small crack in my basement wall — should I be worried?",
    answer:
      "Hairline vertical cracks are usually normal shrinkage and low risk. Horizontal or stair-step cracks are more concerning and can indicate lateral soil pressure. If the crack is wider than 1/4 inch, actively growing, or letting in water, get a structural engineer or foundation specialist to evaluate. A $200 inspection can save you from a $20,000 surprise later.",
    helpful: 52,
    notHelpful: 1,
    timeAgo: "3 days ago",
  },
];

const TRADES: Trade[] = [
  "HVAC",
  "Plumbing",
  "Electrical",
  "Roofing",
  "Foundation",
  "Painting",
  "Landscaping",
  "General",
];

const MAX_CHARS = 500;

export default function AskAPro() {
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
  const [question, setQuestion] = useState("");
  const [publicPost, setPublicPost] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [votes, setVotes] = useState<Record<number, "helpful" | "not">>({});
  const fileRef = useRef<HTMLInputElement>(null);

  function handleSubmit() {
    if (!selectedTrade) { toast.error("Please select a trade category"); return; }
    if (question.trim().length < 10) { toast.error("Please enter a more detailed question"); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  }

  function vote(id: number, type: "helpful" | "not") {
    if (votes[id]) return;
    setVotes((v) => ({ ...v, [id]: type }));
  }

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MessageCircleQuestion className="h-6 w-6 text-teal-400" />
              <h1 className="text-2xl font-bold text-white">Ask a Pro</h1>
            </div>
            <p className="text-slate-400">Get expert answers from vetted local pros — free</p>
          </div>

          {/* Category selector */}
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-400 mb-3">Select a trade category</p>
            <div className="flex flex-wrap gap-2">
              {TRADES.map((trade) => {
                const Icon = TRADE_ICONS[trade];
                const active = selectedTrade === trade;
                return (
                  <button
                    key={trade}
                    onClick={() => { setSelectedTrade(trade); setSubmitted(false); }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                      active
                        ? "bg-teal-500/20 border-teal-400 text-teal-300"
                        : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {trade}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sample questions */}
          {selectedTrade && !submitted && (
            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-4">
              <p className="text-xs uppercase tracking-wider text-slate-500 mb-3">Common questions for {selectedTrade}</p>
              <div className="flex flex-col gap-2">
                {SAMPLE_QUESTIONS[selectedTrade].map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setQuestion(q)}
                    className="text-left text-sm text-slate-300 hover:text-teal-300 transition-colors px-2 py-1 rounded hover:bg-slate-700/50"
                  >
                    → {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question input */}
          {!submitted ? (
            <Card className="bg-slate-800/60 border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-base">Your Question</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Textarea
                    rows={4}
                    maxLength={MAX_CHARS}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Describe your issue in as much detail as possible — include the age of the system, when it started, and what you've already tried..."
                    className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 resize-none"
                  />
                  <p className="text-xs text-slate-500 mt-1 text-right">{question.length}/{MAX_CHARS}</p>
                </div>

                {/* Photo attachment */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-teal-400 transition-colors"
                  >
                    <Paperclip className="h-4 w-4" />
                    Attach a photo (optional)
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" />
                </div>

                {/* Public toggle */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => setPublicPost((p) => !p)}
                    className={`relative w-10 h-5 rounded-full transition-colors ${publicPost ? "bg-teal-500" : "bg-slate-600"}`}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${publicPost ? "translate-x-5" : "translate-x-0.5"}`}
                    />
                  </div>
                  <span className="text-sm text-slate-400">
                    Share my question with the community to get multiple answers
                  </span>
                </label>

                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-teal-600 hover:bg-teal-500 text-white"
                >
                  {loading ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending…</>
                  ) : (
                    <><Send className="h-4 w-4 mr-2" /> Ask a Pro</>
                  )}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-slate-800/60 border-teal-700/50">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-14 h-14 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="h-7 w-7 text-teal-400" />
                </div>
                <h2 className="text-white text-xl font-semibold mb-2">Answer coming soon</h2>
                <p className="text-slate-400 text-sm max-w-sm mx-auto mb-6">
                  We'll email you within 24 hours when a vetted pro responds. Your question{" "}
                  {publicPost ? "has been posted to the community" : "is private and only visible to pros"}.
                </p>
                <Button
                  variant="outline"
                  className="border-slate-700 text-slate-300 hover:text-white"
                  onClick={() => { setSubmitted(false); setQuestion(""); }}
                >
                  Ask Another Question
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Answer feed */}
          <div>
            <h2 className="text-white font-semibold text-lg mb-4">Recent Pro Answers</h2>
            <div className="space-y-4">
              {MOCK_ANSWERS.map((a) => {
                const Icon = TRADE_ICONS[a.proTrade];
                return (
                  <Card key={a.id} className="bg-slate-800/60 border-slate-700">
                    <CardContent className="pt-5 pb-5 space-y-3">
                      {/* Pro info */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-300 font-bold text-sm flex-shrink-0">
                            {a.proName[0]}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-white font-medium text-sm">{a.proName}</span>
                              {a.verified && (
                                <Badge className="bg-teal-500/20 text-teal-400 border-0 text-xs px-1.5 py-0">
                                  <ShieldCheck className="h-2.5 w-2.5 mr-0.5" />Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <Icon className="h-3 w-3" />
                              <span>{a.proTrade}</span>
                              <span className="mx-1">·</span>
                              <Star className="h-2.5 w-2.5 text-yellow-400 fill-yellow-400" />
                              <span>{a.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Clock className="h-3 w-3" />
                          {a.timeAgo}
                        </div>
                      </div>

                      {/* Question */}
                      <p className="text-slate-400 text-sm italic border-l-2 border-slate-600 pl-3">
                        {a.question}
                      </p>

                      {/* Answer */}
                      <p className="text-slate-200 text-sm leading-relaxed">{a.answer}</p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => vote(a.id, "helpful")}
                            className={`flex items-center gap-1 text-xs transition-colors ${
                              votes[a.id] === "helpful" ? "text-teal-400" : "text-slate-500 hover:text-slate-300"
                            }`}
                          >
                            <ThumbsUp className="h-3.5 w-3.5" />
                            {a.helpful + (votes[a.id] === "helpful" ? 1 : 0)}
                          </button>
                          <button
                            onClick={() => vote(a.id, "not")}
                            className={`flex items-center gap-1 text-xs transition-colors ${
                              votes[a.id] === "not" ? "text-red-400" : "text-slate-500 hover:text-slate-300"
                            }`}
                          >
                            <ThumbsDown className="h-3.5 w-3.5" />
                            {a.notHelpful + (votes[a.id] === "not" ? 1 : 0)}
                          </button>
                        </div>
                        <Link href="/trustypro/book">
                          <Button size="sm" className="h-7 text-xs bg-teal-600 hover:bg-teal-500 text-white">
                            Book This Pro
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </HomeownerLayout>
  );
}
