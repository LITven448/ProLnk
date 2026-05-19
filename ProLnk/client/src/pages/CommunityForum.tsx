import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, ThumbsUp, Pin, Search, Plus, TrendingUp, Clock, Award, Loader2, Flame, Sparkles, BarChart3, ChevronRight, Eye, HelpCircle, Trophy, Star, Zap, X } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import { Link } from "wouter";

const CATEGORIES = [
  { id: "leads", label: "Leads & Referrals", icon: "🤝", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
  { id: "tools", label: "Tools & Software", icon: "🔧", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { id: "wins", label: "Success Stories", icon: "🏆", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  { id: "help", label: "Help & Support", icon: "🙋", color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
];

const SORT_OPTIONS = [
  { id: "hot", label: "Hot", icon: Flame },
  { id: "new", label: "New", icon: Sparkles },
  { id: "top", label: "Top", icon: BarChart3 },
];

const MOCK_THREADS = [
  {
    id: 1,
    title: "How I earned $8K in network overrides last month",
    category: "wins",
    author: "Marcus R. — Plumbing Pro",
    tier: "Gold",
    replies: 47,
    views: 1204,
    likes: 138,
    lastActivity: "2h ago",
    pinned: true,
    featured: true,
    excerpt: "Started building my downline back in January. Here's exactly what I did to hit $8K in Stream 2 overrides without any extra leads...",
  },
  {
    id: 2,
    title: "Best CRM for tracking your referral pipeline?",
    category: "tools",
    author: "Sandra T. — HVAC Specialist",
    tier: "Silver",
    replies: 23,
    views: 678,
    likes: 42,
    lastActivity: "4h ago",
    pinned: false,
    featured: false,
    excerpt: "I've tried HubSpot, Pipedrive, and a few others. Here's my breakdown of what actually works for contractors...",
  },
  {
    id: 3,
    title: "Tips for converting homeowner leads on the first call",
    category: "leads",
    author: "James K. — Electrician",
    tier: "Platinum",
    replies: 31,
    views: 892,
    likes: 74,
    lastActivity: "6h ago",
    pinned: false,
    featured: false,
    excerpt: "After 200+ leads through ProLnk I've found a pattern. The first 60 seconds make or break it. Here's my script...",
  },
  {
    id: 4,
    title: "How do I cancel a lead that's a bad address?",
    category: "help",
    author: "Terrence A. — Roofer",
    tier: "Starter",
    replies: 8,
    views: 214,
    likes: 12,
    lastActivity: "12h ago",
    pinned: false,
    featured: false,
    excerpt: "Got a lead yesterday but the address doesn't exist. I've been trying to find where to report it in the dashboard...",
  },
  {
    id: 5,
    title: "Charter member waitlist closed faster than I expected — anyone else cut it close?",
    category: "wins",
    author: "Daniella M. — General Contractor",
    tier: "Gold",
    replies: 15,
    views: 445,
    likes: 29,
    lastActivity: "1d ago",
    pinned: false,
    featured: false,
    excerpt: "Signed up with 3 spots left. Genuinely feel like I got in just in time. Here's my story...",
  },
  {
    id: 6,
    title: "Using Notion to manage all your ProLnk home records",
    category: "tools",
    author: "Alex P. — Home Inspector",
    tier: "Silver",
    replies: 19,
    views: 503,
    likes: 55,
    lastActivity: "1d ago",
    pinned: false,
    featured: false,
    excerpt: "Built a Notion template for tracking every home I've added to the Vault. Sharing the template here...",
  },
];

const TIER_COLORS: Record<string, string> = {
  Starter: "bg-slate-500/20 text-slate-400",
  Silver: "bg-slate-400/20 text-slate-300",
  Gold: "bg-amber-500/20 text-amber-400",
  Platinum: "bg-violet-500/20 text-violet-400",
};

const EXPERT_QAS = [
  {
    id: 1,
    question: "How do I build a downline when I'm brand new to the network?",
    askedBy: "Kevin D. — HVAC Tech",
    askedByTier: "Starter",
    answer: "Start with the five people who already trust you — previous clients, subcontractors, supplier reps. Don't pitch the system; show them the math. A $149/mo investment that pays back through overrides inside 60 days sells itself. I recruited my first three in a week.",
    answeredBy: "Marcus R. — Plumbing Pro",
    answeredByTier: "Gold",
    votes: 84,
  },
  {
    id: 2,
    question: "Do Home Origination Rights transfer if I sell my business?",
    askedBy: "Priya S. — Flooring Specialist",
    askedByTier: "Silver",
    answer: "Yes — origination rights are tied to your partner ID, not the company entity. You can transfer them to a new entity you own or sell them as part of a business sale. ProLnk support handles the paperwork. I transferred mine when I rebranded and it took about 3 business days.",
    answeredBy: "Daniella M. — General Contractor",
    answeredByTier: "Gold",
    votes: 61,
  },
  {
    id: 3,
    question: "What's the fastest way to improve my Briefcase Score?",
    askedBy: "Terrence A. — Roofer",
    askedByTier: "Starter",
    answer: "Upload General Liability and your Contractor License first — they're worth 45 points combined. Then W-9 and Workers Comp get you into Active territory. The optional docs (LLC registration, bonding) add single-digit points but admin reviews them slower. Hit 60+ first, then fill the rest.",
    answeredBy: "James K. — Electrician",
    answeredByTier: "Platinum",
    votes: 112,
  },
];

export default function CommunityForum() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSort, setActiveSort] = useState("hot");
  const [search, setSearch] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newCategory, setNewCategory] = useState("leads");
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [showWinModal, setShowWinModal] = useState(false);
  const [winTitle, setWinTitle] = useState("");
  const [winStory, setWinStory] = useState("");
  const [winSubmitted, setWinSubmitted] = useState(false);

  const utils = trpc.useUtils();
  const { data: posts = [], isLoading } = trpc.forum.getPosts.useQuery(
    { category: activeCategory ?? undefined },
    { refetchInterval: 30000 }
  );

  const createPostMutation = trpc.forum.createPost.useMutation({
    onSuccess: () => {
      toast.success("Post published!");
      utils.forum.getPosts.invalidate();
      setShowNewPost(false);
      setNewTitle("");
      setNewBody("");
    },
    onError: (err) => toast.error(err.message),
  });

  const likeMutation = trpc.forum.likePost.useMutation({
    onSuccess: () => utils.forum.getPosts.invalidate(),
    onError: () => toast.error("Could not like post"),
  });

  const filtered = posts.filter(p => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.body.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleLike = (id: number) => {
    if (!user) { toast.error("Sign in to like posts"); return; }
    if (likedPosts.has(id)) return;
    setLikedPosts(prev => new Set(Array.from(prev).concat(id)));
    likeMutation.mutate({ postId: id });
  };

  const handlePost = () => {
    if (!newTitle.trim() || !newBody.trim()) { toast.error("Title and body are required"); return; }
    createPostMutation.mutate({ category: newCategory, title: newTitle.trim(), body: newBody.trim() });
  };

  const handleWinSubmit = () => {
    if (!winTitle.trim() || !winStory.trim()) { toast.error("Title and story are required"); return; }
    setWinSubmitted(true);
    setTimeout(() => {
      toast.success("Your win has been shared with the community!");
      setShowWinModal(false);
      setWinTitle("");
      setWinStory("");
      setWinSubmitted(false);
    }, 800);
  };

  const featuredThread = MOCK_THREADS.find(t => t.featured);
  const displayThreads = MOCK_THREADS.filter(t => {
    if (activeCategory && t.category !== activeCategory) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const sortedThreads = [...displayThreads].sort((a, b) => {
    if (activeSort === "top") return b.likes - a.likes;
    if (activeSort === "new") return a.id - b.id;
    return b.replies - a.replies;
  });

  return (
    <PartnerLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <Link href="/dashboard" className="text-slate-400 hover:text-white text-sm inline-flex items-center gap-1">← Dashboard</Link>
              <h1 className="text-3xl font-bold text-white mt-2">Partner Community</h1>
              <p className="text-slate-400 text-sm mt-1">Share wins, get help, and learn from 500+ contractors in the network</p>
            </div>
            <Button onClick={() => setShowNewPost(true)} className="bg-violet-600 hover:bg-violet-500 text-white">
              <Plus className="w-4 h-4 mr-2" /> Start a Thread
            </Button>
          </div>

          {/* Featured Post */}
          {featuredThread && !activeCategory && !search && (
            <Card className="border-amber-500/40 bg-gradient-to-r from-amber-950/40 to-slate-800/60 mb-6 cursor-pointer hover:border-amber-400/60 transition-all">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-2">
                  <Pin className="w-3.5 h-3.5" /> Featured Post
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg mb-1">{featuredThread.title}</h3>
                    <p className="text-slate-300 text-sm mb-3 leading-relaxed">{featuredThread.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="font-medium text-slate-300">{featuredThread.author}</span>
                      <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{featuredThread.replies} replies</span>
                      <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" />{featuredThread.likes} likes</span>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{featuredThread.views.toLocaleString()} views</span>
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center text-amber-400 text-sm font-medium">
                    Read <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Weekly Challenge Banner */}
          <div className="flex items-center gap-3 mb-6 px-5 py-3.5 rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-950/50 to-amber-900/20">
            <Zap className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="text-amber-400 font-semibold text-sm">This Week's Challenge: </span>
              <span className="text-slate-200 text-sm">Log 5 jobs this week = earn <span className="text-amber-300 font-bold">500 bonus points</span> toward your Gold tier</span>
            </div>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs shrink-0">5 days left</Badge>
          </div>

          {/* Ask an Expert */}
          {!activeCategory && !search && (
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="w-5 h-5 text-violet-400" />
                <h2 className="text-lg font-bold text-white">Ask an Expert</h2>
                <div className="flex-1 h-px bg-slate-700/60" />
                <span className="text-xs text-slate-500">Answered by top partners</span>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {EXPERT_QAS.map(qa => (
                  <Card key={qa.id} className="bg-slate-800/50 border-slate-700 hover:border-violet-500/30 transition-all">
                    <CardContent className="pt-4 pb-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-7 h-7 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center shrink-0 mt-0.5">
                          <HelpCircle className="w-3.5 h-3.5 text-violet-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm leading-snug mb-1">{qa.question}</p>
                          <span className="text-xs text-slate-500">{qa.askedBy} · <Badge className={`text-xs inline-flex ${TIER_COLORS[qa.askedByTier] || ""}`}>{qa.askedByTier}</Badge></span>
                        </div>
                      </div>
                      <div className="ml-10 pl-3 border-l-2 border-teal-500/30">
                        <p className="text-slate-300 text-sm leading-relaxed mb-2">{qa.answer}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-teal-400 font-medium">{qa.answeredBy} · <Badge className={`text-xs inline-flex ${TIER_COLORS[qa.answeredByTier] || ""}`}>{qa.answeredByTier}</Badge></span>
                          <span className="flex items-center gap-1 text-xs text-slate-500">
                            <ThumbsUp className="w-3 h-3" />{qa.votes} helpful
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Share Your Win button */}
          {!search && (
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-white">Success Stories</h2>
              <div className="flex-1 h-px bg-slate-700/60" />
              <Button
                onClick={() => setShowWinModal(true)}
                className="bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 text-sm"
                variant="outline"
              >
                <Star className="w-4 h-4 mr-2" /> Share Your Win
              </Button>
            </div>
          )}

          {/* Share Your Win Modal */}
          {showWinModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
              <Card className="bg-slate-800 border-amber-500/40 w-full max-w-lg shadow-2xl">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-amber-400" /> Share Your Win
                    </CardTitle>
                    <button onClick={() => setShowWinModal(false)} className="text-slate-400 hover:text-white transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-slate-400 text-sm mt-1">Inspire the community with your success story</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-slate-400 mb-1.5 block uppercase tracking-wider">Win Title</label>
                    <Input
                      placeholder="e.g. Hit $3K in overrides this month..."
                      value={winTitle}
                      onChange={e => setWinTitle(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-400 mb-1.5 block uppercase tracking-wider">Your Story</label>
                    <Textarea
                      placeholder="What happened? How did you do it? What would you tell someone just starting out?"
                      value={winStory}
                      onChange={e => setWinStory(e.target.value)}
                      rows={5}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 resize-none"
                    />
                  </div>
                  <div className="flex gap-2 pt-1">
                    <Button
                      onClick={handleWinSubmit}
                      disabled={winSubmitted}
                      className="bg-amber-500 hover:bg-amber-400 text-white font-semibold flex-1"
                    >
                      {winSubmitted ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Trophy className="w-4 h-4 mr-2" />}
                      {winSubmitted ? "Posting..." : "Post My Win"}
                    </Button>
                    <Button variant="ghost" onClick={() => setShowWinModal(false)} className="text-slate-400 hover:text-white">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* New Post Form */}
          {showNewPost && (
            <Card className="bg-slate-800/80 border-violet-500/50 mb-6">
              <CardHeader><CardTitle className="text-white">Start a Thread</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 flex-wrap">
                  {CATEGORIES.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setNewCategory(c.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        newCategory === c.id ? "bg-violet-600 text-white border-violet-500" : "bg-slate-700 text-slate-300 border-slate-600 hover:border-slate-500"
                      }`}
                    >
                      {c.icon} {c.label}
                    </button>
                  ))}
                </div>
                <Input
                  placeholder="Thread title..."
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                />
                <Textarea
                  placeholder="Share your experience, tip, or question..."
                  value={newBody}
                  onChange={e => setNewBody(e.target.value)}
                  rows={4}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 resize-none"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handlePost}
                    disabled={createPostMutation.isPending}
                    className="bg-violet-600 hover:bg-violet-500 text-white"
                  >
                    {createPostMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Post Thread
                  </Button>
                  <Button variant="ghost" onClick={() => setShowNewPost(false)} className="text-slate-400 hover:text-white">Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search threads..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-9 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>

              {/* Categories */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="pt-4 pb-3 space-y-1">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">Categories</p>
                  <button
                    onClick={() => setActiveCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      !activeCategory ? "bg-violet-600/20 text-violet-300" : "text-slate-400 hover:text-white hover:bg-slate-700"
                    }`}
                  >
                    All Threads
                  </button>
                  {CATEGORIES.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setActiveCategory(c.id === activeCategory ? null : c.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                        activeCategory === c.id ? "bg-violet-600/20 text-violet-300" : "text-slate-400 hover:text-white hover:bg-slate-700"
                      }`}
                    >
                      <span>{c.icon}</span> {c.label}
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* Stats */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="pt-4 pb-3 space-y-3">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Community Stats</p>
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <MessageSquare className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>{MOCK_THREADS.length} active threads</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-400 shrink-0" />
                    <span>{MOCK_THREADS.reduce((s, t) => s + t.replies, 0)} total replies</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <Award className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{MOCK_THREADS.reduce((s, t) => s + t.likes, 0)} total likes</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <Eye className="w-4 h-4 text-violet-400 shrink-0" />
                    <span>{MOCK_THREADS.reduce((s, t) => s + t.views, 0).toLocaleString()} total views</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Thread List */}
            <div className="lg:col-span-3 space-y-4">
              {/* Sort Controls */}
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-xs uppercase tracking-wider font-medium mr-1">Sort:</span>
                {SORT_OPTIONS.map(s => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActiveSort(s.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        activeSort === s.id ? "bg-violet-600/20 text-violet-300 border border-violet-500/30" : "text-slate-400 hover:text-white hover:bg-slate-700 border border-transparent"
                      }`}
                    >
                      <Icon className="w-3 h-3" /> {s.label}
                    </button>
                  );
                })}
              </div>

              {/* Live Threads from DB */}
              {isLoading && (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-7 h-7 animate-spin text-violet-400" />
                </div>
              )}

              {!isLoading && filtered.map(post => (
                <Card key={`db-${post.id}`} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all cursor-pointer">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          {post.pinned && <Pin className="w-3 h-3 text-amber-400 shrink-0" />}
                          <Badge className={`text-xs bg-transparent border-current ${CATEGORIES.find(c => c.id === post.category)?.color || ""}`}>
                            {CATEGORIES.find(c => c.id === post.category)?.icon} {CATEGORIES.find(c => c.id === post.category)?.label}
                          </Badge>
                          {post.authorTier && (
                            <Badge className={`text-xs ${TIER_COLORS[post.authorTier] || ""}`}>{post.authorTier}</Badge>
                          )}
                        </div>
                        <h3 className="text-white font-semibold text-base leading-snug mb-2">{post.title}</h3>
                        <p className="text-slate-400 text-sm line-clamp-2">{post.body}</p>
                        <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                          <span className="font-medium text-slate-400">{post.authorBusiness || "Partner"}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(post.createdAt).toLocaleDateString()}</span>
                          <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{Number(post.replyCount || 0)} replies</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all shrink-0 ${
                          likedPosts.has(post.id) ? "text-violet-400 bg-violet-500/10" : "text-slate-500 hover:text-white hover:bg-slate-700"
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-xs">{Number(post.likes || 0)}</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Mock Threads */}
              {sortedThreads.map(thread => (
                <Card key={`mock-${thread.id}`} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all cursor-pointer">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          {thread.pinned && <Pin className="w-3 h-3 text-amber-400 shrink-0" />}
                          <Badge className={`text-xs bg-transparent border-current ${CATEGORIES.find(c => c.id === thread.category)?.color || ""}`}>
                            {CATEGORIES.find(c => c.id === thread.category)?.icon} {CATEGORIES.find(c => c.id === thread.category)?.label}
                          </Badge>
                          <Badge className={`text-xs ${TIER_COLORS[thread.tier] || ""}`}>{thread.tier}</Badge>
                        </div>
                        <h3 className="text-white font-semibold text-base leading-snug mb-2">{thread.title}</h3>
                        <p className="text-slate-400 text-sm line-clamp-2">{thread.excerpt}</p>
                        <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                          <span className="font-medium text-slate-400">{thread.author}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{thread.lastActivity}</span>
                          <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{thread.replies} replies</span>
                          <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{thread.views.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-1 p-2 rounded-lg text-slate-500 shrink-0">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-xs">{thread.likes}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {!isLoading && filtered.length === 0 && sortedThreads.length === 0 && (
                <div className="text-center py-16 text-slate-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="mb-4">No threads found. Be the first to post!</p>
                  <Button onClick={() => setShowNewPost(true)} className="bg-violet-600 hover:bg-violet-500 text-white">
                    <Plus className="w-4 h-4 mr-2" /> Start a Thread
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PartnerLayout>
  );
}
