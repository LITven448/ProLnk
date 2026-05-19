import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, TrendingUp, Home, DollarSign, Shield, Users, ArrowRight, Clock } from "lucide-react";

const ARTICLES = [
  {
    id: 1,
    category: "Partner Growth",
    title: "How to Earn $5,000/Month in Passive Commissions Through ProLnk",
    excerpt: "A step-by-step breakdown of how top-tier ProLnk partners are building recurring income streams by combining referral networks with TrustyPro homeowner subscriptions.",
    readTime: "7 min read",
    date: "April 2026",
    icon: DollarSign,
    color: "from-green-500 to-emerald-600",
    tags: ["Commissions", "Strategy", "Growth"],
    featured: true,
  },
  {
    id: 2,
    category: "Home Maintenance",
    title: "The DFW Homeowner's Seasonal Maintenance Checklist",
    excerpt: "Texas weather is unpredictable. This checklist walks you through every critical maintenance task by season — from HVAC prep before summer heat to roof inspection after hail season.",
    readTime: "5 min read",
    date: "April 2026",
    icon: Home,
    color: "from-cyan-500 to-blue-600",
    tags: ["Maintenance", "Seasonal", "DFW"],
    featured: true,
  },
  {
    id: 3,
    category: "Platform Updates",
    title: "ProLnk V12: Automated Payments, ACH Authorization & Milestone Billing",
    excerpt: "The biggest update to the ProLnk platform yet. Zero-self-reporting payment architecture means partners get paid automatically when homeowners confirm job completion.",
    readTime: "4 min read",
    date: "March 2026",
    icon: TrendingUp,
    color: "from-purple-500 to-violet-600",
    tags: ["Platform", "Payments", "New Feature"],
    featured: false,
  },
  {
    id: 4,
    category: "Referral Tips",
    title: "Real Estate Agents: How to Earn Perpetual Commissions from Every Home You Sell",
    excerpt: "When you refer a homeowner to TrustyPro, you earn a percentage of every ProLnk platform fee they generate — forever. Here's how to build that into your client handoff process.",
    readTime: "6 min read",
    date: "March 2026",
    icon: Users,
    color: "from-orange-500 to-amber-600",
    tags: ["Real Estate", "Referrals", "Passive Income"],
    featured: false,
  },
  {
    id: 5,
    category: "Trust & Safety",
    title: "How TrustyPro Vets Every Service Professional",
    excerpt: "Background checks, license verification, insurance validation, and a 5-point trust score. Here's exactly how TrustyPro ensures every pro in the network is someone you can trust in your home.",
    readTime: "5 min read",
    date: "February 2026",
    icon: Shield,
    color: "from-blue-500 to-indigo-600",
    tags: ["Trust", "Safety", "Vetting"],
    featured: false,
  },
  {
    id: 6,
    category: "Partner Growth",
    title: "The ProLnk Tier System Explained: Scout to Elite",
    excerpt: "What separates a Scout from an Elite partner? Commission rates, lead priority, and platform perks. This guide breaks down exactly what you need to do to move up — and why it's worth it.",
    readTime: "4 min read",
    date: "February 2026",
    icon: TrendingUp,
    color: "from-yellow-500 to-orange-600",
    tags: ["Tiers", "Growth", "Strategy"],
    featured: false,
  },
  {
    id: 7,
    category: "Home Maintenance",
    title: "When to Repair vs. Replace: A Homeowner's Decision Framework",
    excerpt: "HVAC, roof, water heater, windows — every major home system eventually needs a decision. This framework helps you calculate the true cost of repair vs. replacement so you never overpay.",
    readTime: "8 min read",
    date: "January 2026",
    icon: Home,
    color: "from-teal-500 to-cyan-600",
    tags: ["Maintenance", "Cost", "Decision Making"],
    featured: false,
  },
  {
    id: 8,
    category: "Platform Updates",
    title: "TrustyPro AI Scan: How Our Computer Vision Detects Home Issues",
    excerpt: "Upload a photo of your roof, HVAC, or foundation and our AI returns a severity score, estimated repair cost, and matched professionals — in under 10 seconds.",
    readTime: "3 min read",
    date: "January 2026",
    icon: BookOpen,
    color: "from-pink-500 to-rose-600",
    tags: ["AI", "Technology", "TrustyPro"],
    featured: false,
  },
];

const CATEGORIES = ["All", "Partner Growth", "Home Maintenance", "Platform Updates", "Referral Tips", "Trust & Safety"];

export default function ResourceCenter() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: liveResources } = trpc.partnerTools.content.list.useQuery({ contentType: "resource_link" });

  const filtered = ARTICLES.filter(a => {
    const matchesSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || a.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featured = filtered.filter(a => a.featured);
  const rest = filtered.filter(a => !a.featured);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="text-white/40 hover:text-white/70 text-sm transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <span className="text-white/60 text-sm">Resource Center</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-8 w-8 text-cyan-400" />
            <h1 className="text-4xl font-black text-white tracking-tight">Resource Center</h1>
          </div>
          <p className="text-white/60 text-lg max-w-2xl mb-8">
            Guides, platform updates, and home maintenance tips for ProLnk partners and TrustyPro homeowners.
          </p>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-cyan-500"
              placeholder="Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <Button
              key={cat}
              variant="outline"
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className={activeCategory === cat
                ? "bg-cyan-500 border-cyan-500 text-white hover:bg-cyan-600"
                : "border-white/20 text-white/60 hover:text-white hover:border-white/40 bg-transparent"
              }
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Live resources from admin */}
        {liveResources && liveResources.length > 0 && (
          <div className="mb-10">
            <h2 className="text-white font-bold text-lg mb-4">📌 Pinned Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {liveResources.map(r => (
                <Card key={r.id} className="bg-cyan-500/10 border-cyan-500/20 hover:border-cyan-400/40 transition-all">
                  <CardContent className="p-4">
                    <p className="text-white font-semibold text-sm mb-1">{r.title}</p>
                    {r.body && <p className="text-white/60 text-xs mb-2">{r.body}</p>}
                    {r.url && <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 text-xs underline">Open resource →</a>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Featured Articles */}
        {featured.length > 0 && (
          <div className="mb-12">
            <h2 className="text-white font-bold text-lg mb-4">Featured</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featured.map(article => (
                <Card key={article.id} className="bg-white/5 border-white/10 hover:border-white/20 transition-all cursor-pointer group overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${article.color}`} />
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-6 h-6 rounded bg-gradient-to-br ${article.color} flex items-center justify-center`}>
                        <article.icon className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-white/50 text-xs font-medium uppercase tracking-wide">{article.category}</span>
                      <span className="text-white/30 text-xs">·</span>
                      <span className="text-white/40 text-xs flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime}</span>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2 group-hover:text-cyan-300 transition-colors leading-snug">{article.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-4">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {article.tags.map(tag => (
                          <Badge key={tag} className="bg-white/5 text-white/40 border-white/10 text-xs">{tag}</Badge>
                        ))}
                      </div>
                      <ArrowRight className="h-4 w-4 text-white/30 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Articles */}
        {rest.length > 0 && (
          <div>
            <h2 className="text-white font-bold text-lg mb-4">{activeCategory === "All" ? "All Articles" : activeCategory}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map(article => (
                <Card key={article.id} className="bg-white/5 border-white/10 hover:border-white/20 transition-all cursor-pointer group overflow-hidden">
                  <div className={`h-1 bg-gradient-to-r ${article.color}`} />
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-white/50 text-xs font-medium uppercase tracking-wide">{article.category}</span>
                      <span className="text-white/30 text-xs">·</span>
                      <span className="text-white/40 text-xs flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime}</span>
                    </div>
                    <h3 className="text-white font-semibold text-base mb-2 group-hover:text-cyan-300 transition-colors leading-snug">{article.title}</h3>
                    <p className="text-white/50 text-xs leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/30 text-xs">{article.date}</span>
                      <ArrowRight className="h-4 w-4 text-white/30 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-white/20" />
            <p className="text-white/40 text-lg">No articles found for "{search}"</p>
            <Button variant="ghost" className="mt-4 text-white/50 hover:text-white" onClick={() => { setSearch(""); setActiveCategory("All"); }}>
              Clear filters
            </Button>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-8 text-center">
          <h3 className="text-white font-bold text-xl mb-2">Stay in the loop</h3>
          <p className="text-white/60 mb-6">Get platform updates, growth tips, and maintenance guides delivered to your inbox.</p>
          <div className="flex gap-3 max-w-sm mx-auto">
            <Input className="bg-white/5 border-white/20 text-white placeholder:text-white/30" placeholder="your@email.com" />
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold shrink-0">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
