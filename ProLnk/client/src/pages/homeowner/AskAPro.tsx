import type React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  MessageCircleQuestion, ShieldCheck, ChevronRight, Search,
  Thermometer, Droplets, Zap, Home, HardHat, Clock,
  ThumbsUp, ArrowRight, Lightbulb,
} from "lucide-react";
import { toast } from "sonner";

type Category = "HVAC" | "Plumbing" | "Electrical" | "Roofing" | "General";
type Urgency = "low" | "medium" | "high";

interface QA {
  id: number;
  category: Category;
  question: string;
  answer: string;
  askedDaysAgo: number;
  helpful: number;
  isJobLikely: boolean;
}

const CATEGORY_ICONS: Record<Category, React.ElementType> = {
  HVAC: Thermometer,
  Plumbing: Droplets,
  Electrical: Zap,
  Roofing: Home,
  General: HardHat,
};

const CATEGORY_COLORS: Record<Category, string> = {
  HVAC: "bg-orange-500/20 text-orange-400",
  Plumbing: "bg-blue-500/20 text-blue-400",
  Electrical: "bg-yellow-500/20 text-yellow-400",
  Roofing: "bg-slate-500/20 text-slate-300",
  General: "bg-teal-500/20 text-teal-400",
};

const URGENCY_COLORS: Record<Urgency, string> = {
  low: "bg-emerald-500/20 text-emerald-400",
  medium: "bg-yellow-500/20 text-yellow-400",
  high: "bg-red-500/20 text-red-400",
};

const MOCK_QAS: QA[] = [
  {
    id: 1,
    category: "HVAC",
    question: "My AC unit is blowing warm air but the fan is running. What could be wrong?",
    answer: "This is almost always a refrigerant issue — low freon or a small leak in the system. Less commonly it could be a failed capacitor or compressor. I'd recommend having a certified HVAC tech run a pressure test before the summer heat peaks. Don't keep running it low on refrigerant as it can damage the compressor.",
    askedDaysAgo: 2,
    helpful: 34,
    isJobLikely: true,
  },
  {
    id: 2,
    category: "Plumbing",
    question: "Water pressure in my shower has dropped significantly over the past month. DIY fix?",
    answer: "Start with the showerhead — unscrew it, soak in white vinegar overnight, and rinse. Mineral buildup is the #1 culprit and this fix is free. If pressure is low at every fixture, the issue is further upstream: check the main shutoff valve is fully open and test the pressure regulator at your meter. Pressure below 40 PSI usually means the regulator needs replacement.",
    askedDaysAgo: 5,
    helpful: 41,
    isJobLikely: false,
  },
  {
    id: 3,
    category: "Electrical",
    question: "One circuit keeps tripping the breaker every few days. Is this dangerous?",
    answer: "Yes, treat this as a warning sign. A breaker trips because it's protecting you — repeated trips mean the circuit is drawing too much current, there's a short somewhere, or the breaker itself is failing. Do NOT tape the breaker or ignore it. Unplug high-draw appliances on that circuit first to rule out simple overload. If it trips without heavy load, call a licensed electrician. Faulty wiring is the #2 cause of house fires.",
    askedDaysAgo: 8,
    helpful: 67,
    isJobLikely: true,
  },
  {
    id: 4,
    category: "Roofing",
    question: "I see a few missing shingles after the last storm. How urgent is this?",
    answer: "Address it within 2 weeks, sooner if more rain is forecast. Missing shingles expose the underlayment to UV and water. One rain event can cause thousands in interior damage from a small gap. You can temporarily patch with roof cement from a hardware store. For a permanent fix, a roofer can match and replace individual shingles — usually a quick 1-2 hour job that costs $150–$350.",
    askedDaysAgo: 1,
    helpful: 28,
    isJobLikely: true,
  },
  {
    id: 5,
    category: "General",
    question: "How often should I be scheduling a home inspection even when nothing is obviously wrong?",
    answer: "For most homeowners: every 3–5 years for a full inspection, and annually for specific systems (HVAC service in spring, chimney in fall, roof after major storms). New homeowners in the first year should do a full walkthrough at the 90-day mark. A preventive inspection typically costs $300–$500 and often catches issues before they become $5,000 problems.",
    askedDaysAgo: 12,
    helpful: 52,
    isJobLikely: false,
  },
];

const TIPS = [
  "Be specific about when the problem started and under what conditions",
  "Include the age of the system or appliance if known",
  "Photos or videos help pros give more accurate answers",
  "If it's a safety concern (gas smell, electrical sparks), call 911 or your utility first",
];

const CATEGORIES: Category[] = ["HVAC", "Plumbing", "Electrical", "Roofing", "General"];

export default function AskAPro() {
  const [category, setCategory] = useState<Category | "">("");
  const [question, setQuestion] = useState("");
  const [urgency, setUrgency] = useState<Urgency | "">("");
  const [submitted, setSubmitted] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<Category | "All">("All");
  const [helpfulVotes, setHelpfulVotes] = useState<Record<number, boolean>>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!category || !question.trim() || !urgency) {
      toast.error("Please fill in all fields");
      return;
    }
    setSubmitted(true);
    toast.success("Your question has been submitted! A ProLnk Certified Pro will respond within 24 hours.");
  }

  function handleVote(id: number) {
    if (helpfulVotes[id]) return;
    setHelpfulVotes((prev) => ({ ...prev, [id]: true }));
    toast.success("Thanks for your feedback!");
  }

  const filteredQAs = MOCK_QAS.filter((qa) => {
    if (filterCat !== "All" && qa.category !== filterCat) return false;
    if (search && !qa.question.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <div className="container max-w-5xl mx-auto px-4 py-8 space-y-8">

        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <MessageCircleQuestion className="h-6 w-6 text-teal-400" />
            Ask a Pro
          </h1>
          <p className="text-slate-400 mt-1">Get expert answers from ProLnk Certified Professionals — free</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-4">
            {!submitted ? (
              <Card className="bg-slate-800/60 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Submit Your Question</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs text-slate-400 mb-1.5 block uppercase tracking-wider">Category</label>
                      <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
                        <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                          <SelectValue placeholder="Select a trade category" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-slate-700">
                          {CATEGORIES.map((c) => {
                            const Icon = CATEGORY_ICONS[c];
                            return (
                              <SelectItem key={c} value={c} className="text-slate-300">
                                <span className="flex items-center gap-2"><Icon className="h-3.5 w-3.5" />{c}</span>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 mb-1.5 block uppercase tracking-wider">Your Question</label>
                      <Textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Describe your issue in as much detail as possible. Include age of system, when it started, what you've tried..."
                        rows={5}
                        className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 resize-none"
                      />
                      <p className="text-xs text-slate-500 mt-1">{question.length}/500 characters</p>
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 mb-1.5 block uppercase tracking-wider">Urgency</label>
                      <div className="flex gap-2">
                        {(["low", "medium", "high"] as Urgency[]).map((u) => (
                          <button
                            key={u}
                            type="button"
                            onClick={() => setUrgency(u)}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all capitalize ${
                              urgency === u
                                ? `${URGENCY_COLORS[u]} border-current`
                                : "border-slate-700 text-slate-400 hover:border-slate-500"
                            }`}
                          >
                            {u}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-500 text-white">
                      Submit Question
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-slate-800/60 border-teal-700/50">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="w-14 h-14 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="h-7 w-7 text-teal-400" />
                  </div>
                  <h2 className="text-white text-xl font-semibold mb-2">Question Submitted!</h2>
                  <p className="text-slate-400 text-sm max-w-sm mx-auto mb-6">
                    A ProLnk Certified Pro in your area will review and respond within 24 hours. You'll get an email notification when answered.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      variant="outline"
                      className="border-slate-700 text-slate-300 hover:text-white"
                      onClick={() => { setSubmitted(false); setQuestion(""); setCategory(""); setUrgency(""); }}
                    >
                      Ask Another Question
                    </Button>
                    <Button className="bg-teal-600 hover:bg-teal-500 text-white">
                      Get a Free Quote
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-2 space-y-4">
            <Card className="bg-slate-800/40 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-base flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-400" />
                  Before You Ask
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5">
                  {TIPS.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                      <span className="w-5 h-5 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">{i + 1}</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/40 border-slate-700">
              <CardContent className="pt-4">
                <p className="text-xs text-slate-400 mb-2 uppercase tracking-wider">Response time</p>
                <div className="flex items-center gap-2 text-white">
                  <Clock className="h-4 w-4 text-teal-400" />
                  <span className="font-semibold">Avg. 4 hours</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm mt-1 ml-6">
                  Guaranteed within 24h
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <h2 className="text-white font-semibold text-lg">Recent Q&amp;A</h2>
            <div className="flex gap-2 flex-wrap">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <Input
                  placeholder="Search questions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 h-8 w-48 bg-slate-900 border-slate-700 text-sm text-white placeholder:text-slate-500"
                />
              </div>
              <div className="flex gap-1 flex-wrap">
                <button
                  onClick={() => setFilterCat("All")}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${filterCat === "All" ? "bg-teal-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"}`}
                >
                  All
                </button>
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setFilterCat(c)}
                    className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${filterCat === c ? "bg-teal-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {filteredQAs.length === 0 && (
              <div className="py-10 text-center text-slate-500">No questions match your search</div>
            )}
            {filteredQAs.map((qa) => {
              const Icon = CATEGORY_ICONS[qa.category];
              return (
                <Card key={qa.id} className="bg-slate-800/60 border-slate-700">
                  <CardContent className="pt-5 pb-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${CATEGORY_COLORS[qa.category].replace("text-", "text-").split(" ")[0]}`}>
                        <Icon className="h-4 w-4 text-slate-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <Badge className={`text-xs border-0 ${CATEGORY_COLORS[qa.category]}`}>{qa.category}</Badge>
                          <span className="text-xs text-slate-500">{qa.askedDaysAgo}d ago</span>
                          {qa.isJobLikely && (
                            <Badge className="text-xs border-0 bg-teal-500/20 text-teal-400">Job Likely</Badge>
                          )}
                        </div>
                        <p className="text-white font-medium text-sm leading-snug">{qa.question}</p>
                      </div>
                    </div>

                    <div className="ml-11 bg-slate-900/50 rounded-lg p-3 mb-3">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-teal-400" />
                        <span className="text-xs font-semibold text-teal-400">ProLnk Certified Pro</span>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">{qa.answer}</p>
                    </div>

                    <div className="ml-11 flex items-center justify-between">
                      <button
                        onClick={() => handleVote(qa.id)}
                        className={`flex items-center gap-1.5 text-xs transition-colors ${helpfulVotes[qa.id] ? "text-teal-400" : "text-slate-500 hover:text-slate-300"}`}
                      >
                        <ThumbsUp className="h-3.5 w-3.5" />
                        Helpful ({qa.helpful + (helpfulVotes[qa.id] ? 1 : 0)})
                      </button>
                      {qa.isJobLikely && (
                        <Button size="sm" className="h-7 text-xs bg-teal-600 hover:bg-teal-500 text-white">
                          Get a Free Quote
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
