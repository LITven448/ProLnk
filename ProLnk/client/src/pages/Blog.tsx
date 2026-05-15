import React from 'react';
import { Helmet } from "react-helmet-async";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, ArrowRight, Megaphone, User, Mail, CheckCircle } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState } from "react";

interface Article {
  id: number;
  title: string;
  category: string;
  categoryColor: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  excerpt: string;
  featured?: boolean;
}

const articles: Article[] = [
  {
    id: 1,
    title: "5 Ways AI Is Transforming Home Service Referrals",
    category: "Technology",
    categoryColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    date: "May 12, 2026",
    readTime: "5 min",
    author: "Andrew Frakes",
    authorRole: "Founder, ProLnk",
    excerpt:
      "From photo-based condition analysis to real-time contractor matching, AI is eliminating the friction that has made home services frustrating for decades. Here's how ProLnk uses six AI agents to match homeowners with the right pro in under 60 seconds — and what that means for pros who want a reliable lead pipeline.",
    featured: true,
  },
  {
    id: 2,
    title: "How Founding Members Are Earning $3,200/mo in Network Income",
    category: "Success Stories",
    categoryColor: "bg-teal-500/20 text-teal-400 border-teal-500/30",
    date: "May 8, 2026",
    readTime: "6 min",
    author: "ProLnk Team",
    authorRole: "Editorial",
    excerpt:
      "Charter members who joined in the first 30 days are already seeing network income compound across all five streams. We break down the exact numbers from two founding members — a DFW HVAC contractor and a plumber who built a 4-level referral network in his first 60 days.",
  },
  {
    id: 3,
    title: "DFW Homeowners: How to Find Verified Service Pros in 24 Hours",
    category: "Homeowner Guide",
    categoryColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    date: "May 5, 2026",
    readTime: "4 min",
    author: "Sarah K.",
    authorRole: "Homeowner Advocate, ProLnk",
    excerpt:
      "The average DFW homeowner spends 4.5 hours finding a contractor for a routine job — and 1 in 3 ends up with someone unvetted. ProLnk's network of background-checked, reviewed pros means you can submit a request and have a confirmed appointment within 24 hours, every time.",
  },
  {
    id: 4,
    title: "Why 2,125 Home Service Pros Are Joining ProLnk Before Launch",
    category: "Founding Network",
    categoryColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    date: "April 30, 2026",
    readTime: "4 min",
    author: "Andrew Frakes",
    authorRole: "Founder, ProLnk",
    excerpt:
      "The founding network closes at 2,125 members — and early adopters lock in their tier rate permanently. Charter members pay $149/mo forever, earn 25% direct commission, and build passive income through a 4-level referral cascade. Here's why the math makes joining now a no-brainer.",
  },
  {
    id: 5,
    title: "The 5 Income Streams Every ProLnk Partner Earns",
    category: "Commission",
    categoryColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    date: "April 24, 2026",
    readTime: "6 min",
    author: "ProLnk Team",
    authorRole: "Editorial",
    excerpt:
      "From job commissions to home origination rights, ProLnk partners earn across five distinct streams simultaneously. We break down the exact math — what each tier pays, how the 4-level network cascade compounds, and why the top earners generate income even when they're not actively working.",
  },
  {
    id: 6,
    title: "How Home Origination Rights Work (And Why They're Valuable)",
    category: "Education",
    categoryColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    date: "April 18, 2026",
    readTime: "4 min",
    author: "ProLnk Team",
    authorRole: "Editorial",
    excerpt:
      "The first pro to document a home earns 1.5% of the platform fee on every future job — forever. With 7M+ homes in DFW alone, origination rights represent a recurring revenue stream that outlasts any individual job. We explain the mechanics and how to maximize your portfolio.",
  },
];

const featured = articles.find((a) => a.featured)!;
const grid = articles.filter((a) => !a.featured);

function AuthorByline({ author, role }: { author: string; role: string }) {
  const initials = author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-full bg-teal-900 border border-teal-400/30 flex items-center justify-center text-xs font-bold text-teal-400">
        {initials}
      </div>
      <span className="text-xs text-slate-400">
        {author} · {role}
      </span>
    </div>
  );
}

export default function Blog() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  }

  return (
    <>
      <Helmet>
        <title>ProLnk Blog — AI, Network Income & Home Services for DFW Pros</title>
        <meta
          name="description"
          content="The ProLnk blog covers AI in home service referrals, founding member income stories, DFW homeowner guides, commission system education, and the Home Health Vault vision."
        />
      </Helmet>

      <div className="min-h-screen bg-[#0A1628] text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">

          {/* Coming Soon Banner */}
          <div className="flex items-center gap-3 mb-10 px-5 py-3 rounded-xl border border-teal-500/30 bg-teal-500/10">
            <Megaphone className="h-4 w-4 text-teal-400 flex-shrink-0" />
            <p className="text-sm text-teal-300">
              <span className="font-semibold">Full articles coming at DFW launch.</span> Founding network closes at 500 applications + 5,000 homes.
            </p>
          </div>

          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">ProLnk Resources</h1>
            <p className="text-slate-400 text-lg max-w-2xl">
              Strategy, education, and inside stories for home service professionals, real estate agents, and DFW homeowners building long-term income on the ProLnk network.
            </p>
          </div>

          {/* Featured Article Hero */}
          <div className="relative rounded-2xl overflow-hidden mb-12 group cursor-pointer" style={{ minHeight: "380px" }}>
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, #0d2137 0%, #0a3d2e 50%, #0d2137 100%)" }}
            />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, #14b8a6 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(10,22,40,0.95) 0%, rgba(10,22,40,0.4) 60%, transparent 100%)" }}
            />
            <div className="relative z-10 p-8 md:p-12 flex flex-col justify-end" style={{ minHeight: "380px" }}>
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${featured.categoryColor}`}>
                  {featured.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block" />
                  FEATURED
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 max-w-3xl group-hover:text-teal-300 transition-colors leading-snug">
                {featured.title}
              </h2>
              <p className="text-slate-300 text-base max-w-2xl mb-5 leading-relaxed">
                {featured.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {featured.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {featured.readTime} read
                </span>
                <AuthorByline author={featured.author} role={featured.authorRole} />
                <span className="flex items-center gap-1.5 text-teal-400 font-medium ml-auto group-hover:gap-2.5 transition-all">
                  Read article <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-lg font-semibold text-white">Recent Articles</h2>
            <div className="flex-1 h-px bg-slate-700/60" />
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {grid.map((article) => (
              <div
                key={article.id}
                className="group flex flex-col h-full rounded-xl border border-slate-700/60 bg-slate-800/40 hover:bg-slate-800/70 hover:border-teal-500/40 transition-all duration-200 cursor-pointer overflow-hidden"
              >
                <div className="h-0.5 w-full bg-gradient-to-r from-teal-500/0 via-teal-500/60 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${article.categoryColor}`}>
                      {article.category}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-3 leading-snug group-hover:text-teal-300 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed flex-1 mb-5 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <User className="h-3 w-3" />
                      {article.author}
                    </div>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {article.date}
                    </span>
                  </div>
                  <div className="flex items-center justify-end mt-3">
                    <span className="text-xs text-teal-500 flex items-center gap-1 font-medium group-hover:gap-1.5 transition-all">
                      Read More <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl px-6 py-10 md:px-12 text-center mb-12">
            {subscribed ? (
              <div className="flex flex-col items-center gap-3">
                <CheckCircle className="w-10 h-10 text-teal-400" />
                <h3 className="text-xl font-bold text-white">You're on the list.</h3>
                <p className="text-slate-400 text-sm max-w-md">
                  We'll send you new articles, founding network updates, and DFW launch news. No spam — unsubscribe anytime.
                </p>
              </div>
            ) : (
              <>
                <Mail className="w-8 h-8 text-teal-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Get Articles in Your Inbox</h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
                  New guides, founding network updates, and DFW launch news — delivered directly to you. No spam. Unsubscribe anytime.
                </p>
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 transition-colors"
                  />
                  <Button
                    type="submit"
                    className="bg-teal-500 hover:bg-teal-400 text-white font-semibold text-sm px-6"
                  >
                    Subscribe
                  </Button>
                </form>
              </>
            )}
          </div>

          {/* Bottom CTA */}
          <div className="text-center px-6 py-10 rounded-2xl border border-slate-700/50 bg-slate-800/30">
            <p className="text-slate-400 text-sm mb-1">Don't just read about it</p>
            <h3 className="text-xl font-bold text-white mb-4">Join the founding network before it closes</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
              Waitlist closes at 500 partner applications and 5,000 homes. Charter-tier pricing locks in at $149/mo — permanently.
            </p>
            <Button
              size="lg"
              className="bg-[#F5E642] text-[#0A1628] hover:bg-[#F5E642]/90 font-bold text-sm px-8"
              onClick={() => setLocation("/pro-waitlist")}
            >
              Secure Your Spot <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

        </div>
      </div>
    </>
  );
}
