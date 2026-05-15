import React from 'react';
import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MessageCircle, Users, Eye, Clock, ShieldCheck, TrendingUp,
  Plus, X, Star, Award, ChevronRight, Search,
  Thermometer, Droplets, Zap, Home, HardHat, CloudLightning,
} from "lucide-react";
import { toast } from "sonner";

type Category = "HVAC" | "Plumbing" | "Roofing" | "Foundation" | "DIY Tips" | "Storm Prep";
type TabFilter = "All" | Category;

const CATEGORY_COLORS: Record<Category, string> = {
  HVAC: "bg-orange-500/20 text-orange-300",
  Plumbing: "bg-blue-500/20 text-blue-300",
  Roofing: "bg-red-500/20 text-red-300",
  Foundation: "bg-stone-500/20 text-stone-300",
  "DIY Tips": "bg-green-500/20 text-green-300",
  "Storm Prep": "bg-purple-500/20 text-purple-300",
};

const CATEGORY_ICONS: Record<Category, React.ElementType> = {
  HVAC: Thermometer,
  Plumbing: Droplets,
  Roofing: Home,
  Foundation: HardHat,
  "DIY Tips": Zap,
  "Storm Prep": CloudLightning,
};

const TABS: TabFilter[] = ["All", "HVAC", "Plumbing", "Roofing", "Foundation", "DIY Tips", "Storm Prep"];

const TRENDING = ["HVAC tune-up", "Foundation watering", "Hail damage", "Summer prep", "Freeze protection"];

interface Question {
  id: number;
  author: string;
  city: string;
  title: string;
  category: Category;
  preview: string;
  answers: number;
  views: number;
  daysAgo: number;
  proVerified: boolean;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    author: "Jennifer",
    city: "Austin, TX",
    title: "Why does my AC blow warm air in the afternoon?",
    category: "HVAC",
    preview: "My HVAC system works fine in the morning but starts pushing warm air around 2–3pm every day. I've replaced the filter last month...",
    answers: 4,
    views: 112,
    daysAgo: 1,
    proVerified: true,
  },
  {
    id: 2,
    author: "Marcus",
    city: "Denver, CO",
    title: "Foundation crack appeared after dry summer — how urgent?",
    category: "Foundation",
    preview: "Noticed a diagonal crack about 6 inches long on the interior basement wall. The exterior has been extremely dry all season...",
    answers: 3,
    views: 87,
    daysAgo: 2,
    proVerified: true,
  },
  {
    id: 3,
    author: "Priya",
    city: "Houston, TX",
    title: "Roof is 14 years old — replace or repair after hail storm?",
    category: "Roofing",
    preview: "We had a major hail storm last week. My roof is 14 years old with 3-tab shingles. Adjuster said minor damage but I'm seeing granules...",
    answers: 6,
    views: 203,
    daysAgo: 2,
    proVerified: true,
  },
  {
    id: 4,
    author: "Derek",
    city: "Phoenix, AZ",
    title: "Best way to watering foundation in extreme heat?",
    category: "Foundation",
    preview: "I keep hearing you should water the foundation in dry climates. How close to the house and how often? My soil is caliche...",
    answers: 2,
    views: 59,
    daysAgo: 4,
    proVerified: false,
  },
  {
    id: 5,
    author: "Sofia",
    city: "Chicago, IL",
    title: "Replacing GFCI outlet in kitchen — is this a DIY job?",
    category: "DIY Tips",
    preview: "The GFCI outlet near my kitchen sink keeps tripping. I watched a few YouTube videos and feel confident I could swap it myself...",
    answers: 5,
    views: 134,
    daysAgo: 5,
    proVerified: false,
  },
  {
    id: 6,
    author: "Carlos",
    city: "Miami, FL",
    title: "Hurricane season prep checklist — what do pros recommend?",
    category: "Storm Prep",
    preview: "We're heading into hurricane season and I want to make sure my home is ready. I've done the basics — roof inspected, windows checked...",
    answers: 7,
    views: 276,
    daysAgo: 7,
    proVerified: true,
  },
];

function QuestionCard({ q }: { q: Question }) {
  const Icon = CATEGORY_ICONS[q.category];
  return (
    <Card className="bg-slate-800/70 border-slate-700 hover:border-teal-500/40 transition-colors cursor-pointer">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-teal-500/20 text-teal-300 font-black text-lg flex items-center justify-center shrink-0">
            {q.author[0]}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-slate-300 text-xs font-medium">{q.author}, <span className="text-slate-500">{q.city}</span></span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${CATEGORY_COLORS[q.category]}`}>
                <Icon className="w-3 h-3" />{q.category}
              </span>
              {q.proVerified && (
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-500/20 text-emerald-300 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Pro Verified Answer
                </span>
              )}
            </div>

            <h3 className="text-white font-semibold text-sm leading-snug mb-2 hover:text-teal-300 transition-colors">
              {q.title}
            </h3>

            <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-3">
              {q.preview.slice(0, 120)}{q.preview.length > 120 ? "…" : ""}
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> {q.answers} answers</span>
              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {q.views} views</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {q.daysAgo}d ago</span>
              <span className="ml-auto text-teal-400 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                Read more <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CommunityForum() {
  const [activeTab, setActiveTab] = useState<TabFilter>("All");
  const [showAsk, setShowAsk] = useState(false);
  const [form, setForm] = useState({ title: "", category: "" as Category | "", description: "" });
  const [search, setSearch] = useState("");

  const filtered = QUESTIONS.filter((q) => {
    const matchTab = activeTab === "All" || q.category === activeTab;
    const matchSearch = !search || q.title.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  function submitQuestion() {
    if (!form.title || !form.category || !form.description) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Question posted! You'll be notified when pros respond.");
    setShowAsk(false);
    setForm({ title: "", category: "", description: "" });
  }

  return (
    <HomeownerLayout>
      <div className="space-y-8 max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <Users className="w-8 h-8 text-teal-400" />
              Homeowner Community
            </h1>
            <p className="text-slate-400 mt-1 text-sm">Ask questions, share tips, get expert answers</p>
          </div>
          <Button
            onClick={() => setShowAsk(!showAsk)}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold flex items-center gap-2 shrink-0"
          >
            {showAsk ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {showAsk ? "Cancel" : "Ask a Question"}
          </Button>
        </div>

        {/* Ask Form (Inline) */}
        {showAsk && (
          <Card className="bg-slate-800 border-teal-500/40 border-2">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-white font-bold text-base">Ask the Community</h2>
              <Input
                placeholder="Question title — be specific (e.g. 'HVAC blowing warm air in Texas heat')"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              />
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as Category }))}
                className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Select a category…</option>
                {(["HVAC", "Plumbing", "Roofing", "Foundation", "DIY Tips", "Storm Prep"] as Category[]).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <Textarea
                placeholder="Describe your situation in detail. Include age of system, symptoms, what you've already tried…"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={4}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 resize-none"
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">📎 Photo attach coming soon</p>
                <Button onClick={submitQuestion} className="bg-teal-500 hover:bg-teal-600 text-white font-semibold">
                  Post Question
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Trending Topics */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold mr-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Trending:
          </span>
          {TRENDING.map((t) => (
            <button
              key={t}
              onClick={() => setSearch(t)}
              className="px-3 py-1 rounded-full bg-slate-700 hover:bg-teal-500/20 hover:text-teal-300 text-slate-300 text-xs font-medium transition-colors"
            >
              {t}
            </button>
          ))}
          {search && (
            <button onClick={() => setSearch("")} className="px-3 py-1 rounded-full bg-slate-600 text-slate-400 text-xs flex items-center gap-1">
              <X className="w-3 h-3" /> Clear
            </button>
          )}
        </div>

        {/* Search + Tabs */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input
              placeholder="Search questions…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
            />
          </div>
          <div className="flex gap-1 flex-wrap">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === tab ? "bg-teal-500 text-white" : "bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Question Feed */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <MessageCircle className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>No questions match your search</p>
            </div>
          ) : (
            filtered.map((q) => <QuestionCard key={q.id} q={q} />)
          )}
        </div>

        {/* Expert Spotlight + Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Expert Spotlight */}
          <Card className="bg-slate-800/70 border-slate-700">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-4 h-4 text-amber-400" />
                <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Expert Spotlight</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 text-orange-300 font-black text-xl flex items-center justify-center">
                  M
                </div>
                <div>
                  <p className="text-white font-bold">Marcus Rivera</p>
                  <p className="text-slate-400 text-xs">HVAC Pro · <span className="text-amber-400">4.9★ verified</span></p>
                  <p className="text-slate-500 text-xs mt-0.5">Answered <span className="text-teal-400 font-semibold">47 questions</span> this month</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="mt-4 w-full border border-slate-600 text-slate-300 hover:text-white text-xs">
                View Marcus's Answers
              </Button>
            </CardContent>
          </Card>

          {/* Points System */}
          <Card className="bg-slate-800/70 border-slate-700">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-4 h-4 text-purple-400" />
                <span className="text-purple-400 text-xs font-bold uppercase tracking-widest">Community Points</span>
              </div>
              <p className="text-slate-300 text-sm mb-3">
                Earn <span className="text-teal-400 font-bold">25 points</span> for each helpful answer you give to your neighbors.
              </p>
              <div className="bg-slate-700/50 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest">Your Points</p>
                  <p className="text-3xl font-black text-purple-400 mt-1">150</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Rank</p>
                  <p className="text-white font-bold mt-1">#12 in Austin</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3 text-center">Points unlock free home health scans and pro discounts</p>
            </CardContent>
          </Card>
        </div>

      </div>
    </HomeownerLayout>
  );
}
