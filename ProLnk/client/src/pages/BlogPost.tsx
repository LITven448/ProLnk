import React, { useState, useEffect, useRef } from "react";
import { Clock, Calendar, Share2, Twitter, Linkedin, Link2, Check, ChevronRight, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

interface BlogPostData {
  id: number;
  title: string;
  author: string;
  authorTitle: string;
  authorAvatar: string;
  date: string;
  category: string;
  readTime: number;
  body: React.ReactNode;
}

interface RelatedArticle {
  id: number;
  title: string;
  category: string;
  readTime: number;
  date: string;
  summary: string;
}

const RELATED: RelatedArticle[] = [
  {
    id: 2,
    title: "The 5 Income Streams Every ProLnk Partner Earns",
    category: "Commission",
    readTime: 6,
    date: "May 5, 2026″,
    summary:
      "From direct job commissions to permanent home origination rights — how every tier compounds earnings across five simultaneous streams.",
  },
  {
    id: 3,
    title: "DFW Home Services: Why We're Starting Here",
    category: "Market",
    readTime: 5,
    date: "April 30, 2026″,
    summary:
      "7.5 million residents, 2.3M single-family homes, and a fragmented contractor market that's ripe for a network model. The data behind our launch market.",
  },
  {
    id: 4,
    title: "Charter vs. Founding vs. L3: Which Tier Is Right for You?",
    category: "Founding Network",
    readTime: 4,
    date: "May 2, 2026″,
    summary:
      "The 2,125-member founding network closes in four tiers. Here's the exact math on commission rates, network override depth, and lifetime cost at each level.",
  },
];

const SAMPLE_POST: BlogPostData = {
  id: 1,
  title: "Why 2,125 Home Service Pros Are Joining ProLnk Before Launch",
  author: "ProLnk Editorial",
  authorTitle: "ProLnk Team",
  authorAvatar: "PE",
  date: "May 8, 2026″,
  category: "Founding Network",
  readTime: 4,
  body: (
    <div className="space-y-5 text-slate-300 leading-relaxed">
      <p>
        The founding network closes at 2,125 members — and early adopters lock in their tier commission rate permanently.
        Charter members pay $149/month forever, earn 25% direct commission, and build passive income through a 4-level referral cascade.
        Here's why the math makes joining now the obvious move.
      </p>
      <h2 className="text-white text-xl font-semibold pt-2″>The Tier Structure</h2>
      <p>
        ProLnk's founding network is divided into four tiers based on entry sequence: Charter (first 25), Founding (next 100),
        L3 (next 400), and L4 (final 1,600). Every tier pays the same monthly fee — $149 — but the commission rates and override
        depth are locked at the time of joining. Charter members earn 25% on every job they close. L4 members earn 15%. That
        gap compounds dramatically over a full year.
      </p>
      <h2 className="text-white text-xl font-semibold pt-2″>The Network Override Math</h2>
      <p>
        Direct job commissions are only one stream. The more powerful lever is the 4-level network cascade. Every partner
        you recruit earns you a percentage override on their job commissions — and on their recruits' commissions, down four levels.
        Charter members earn 7% on Level-1 overrides. At 10 active Level-1 recruits each closing two $3,000 jobs per month,
        that's $4,200 in monthly passive income without touching a tool.
      </p>
      <h2 className="text-white text-xl font-semibold pt-2″>Why the Waitlist Closes at 2,125</h2>
      <p>
        ProLnk uses a geographic exclusivity model. When the founding network reaches critical mass in a launch market,
        the founding tier locks and new partners enter at standard rates. In DFW, that threshold is 2,125 active founding
        partners. After that, the referral network earns even more — because the pool of people generating overrides for
        founding members grows. Getting in before the close isn't just about rates. It’s about being early in a compounding
        structure.
      </p>
      <h2 className="text-white text-xl font-semibold pt-2″>What to Do Now</h2>
      <p>
        Applications are reviewed on a rolling basis. Charter and Founding tiers are nearly full. L3 and L4 spots remain.
        Once the waitlist closes, this rate structure closes with it. Apply at prolnk.io/apply — the form takes under two minutes.
      </p>
    </div>
  ),
};

export default function BlogPost() {
  const [scrollPct, setScrollPct] = useState(0);
  const [copied, setCopied] = useState(false);
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onScroll() {
      if (!articleRef.current) return;
      const el = articleRef.current;
      const top = el.getBoundingClientRect().top;
      const height = el.getBoundingClientRect().height;
      const windowH = window.innerHeight;
      const scrolled = Math.max(0, -top);
      const total = height - windowH;
      if (total <= 0) { setScrollPct(100); return; }
      setScrollPct(Math.min(100, Math.round((scrolled / total) * 100)));
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function copyUrl() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const post = SAMPLE_POST;

  return (
    <div className="min-h-screen bg-slate-950″>
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-slate-800 z-50″>
        <div
          className="h-full bg-teal-500 transition-all duration-100″
          style={{ width: `${scrollPct}%` }}
        />
      </div>

      <article ref={articleRef} className="container max-w-2xl mx-auto px-4 py-10″>

        {/* Back link */}
        <Link href="/blog">
          <a className="inline-flex items-center gap-1.5 text-slate-500 hover:text-teal-400 transition-colors text-sm mb-8″>
            <ArrowLeft className="h-3.5 w-3.5″ />
            All articles
          </a>
        </Link>

        {/* Category + meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4″>
          <span className="text-xs font-semibold uppercase tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2.5 py-0.5 rounded-full">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-slate-500 text-xs">
            <Calendar className="h-3.5 w-3.5″ />
            {post.date}
          </span>
          <span className="flex items-center gap-1 text-slate-500 text-xs">
            <Clock className="h-3.5 w-3.5″ />
            {post.readTime} min read
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white leading-tight mb-5″>{post.title}</h1>

        {/* Author row */}
        <div className="flex items-center justify-between gap-4 py-4 border-y border-slate-700/60 mb-8″>
          <div className="flex items-center gap-3″>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold text-xs shrink-0″>
              {post.authorAvatar}
            </div>
            <div>
              <p className="text-white text-sm font-medium">{post.author}</p>
              <p className="text-slate-500 text-xs">{post.authorTitle}</p>
            </div>
          </div>
          {/* Share buttons */}
          <div className="flex items-center gap-2″>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}&text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Share on Twitter"
            >
              <Twitter className="h-4 w-4″ />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Share on LinkedIn"
            >
              <Linkedin className="h-4 w-4″ />
            </a>
            <button
              onClick={copyUrl}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Copy link"
            >
              {copied ? <Check className="h-4 w-4 text-teal-400″ /> : <Link2 className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Featured image placeholder */}
        <div className="w-full aspect-[16/7] rounded-xl bg-gradient-to-br from-slate-800 via-teal-950/40 to-slate-900 border border-slate-700 flex items-center justify-center mb-8 overflow-hidden">
          <div className="text-center">
            <Share2 className="h-8 w-8 text-teal-500/30 mx-auto mb-2″ />
            <p className="text-slate-700 text-sm">Featured image</p>
          </div>
        </div>

        {/* Body */}
        <div className="prose-custom">
          {post.body}
        </div>

        {/* Bottom share bar */}
        <div className="mt-10 pt-6 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-4″>
          <p className="text-slate-400 text-sm">Found this useful? Share it.</p>
          <div className="flex items-center gap-2″>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}&text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs transition-colors"
            >
              <Twitter className="h-3.5 w-3.5″ /> Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs transition-colors"
            >
              <Linkedin className="h-3.5 w-3.5″ /> LinkedIn
            </a>
            <button
              onClick={copyUrl}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs transition-colors"
            >
              {copied ? <><Check className="h-3.5 w-3.5 text-teal-400″ /> Copied!</> : <><Link2 className="h-3.5 w-3.5" /> Copy link</>}
            </button>
          </div>
        </div>

        {/* Related articles */}
        <div className="mt-12″>
          <h2 className="text-white font-bold text-xl mb-5″>Related articles</h2>
          <div className="space-y-4″>
            {RELATED.map((article) => (
              <Link key={article.id} href={`/blog/${article.id}`}>
                <a className="block rounded-xl border border-slate-700 bg-slate-800/40 hover:bg-slate-800/70 hover:border-teal-500/30 transition-all p-4 group">
                  <div className="flex flex-wrap items-center gap-2 mb-2″>
                    <span className="text-xs font-medium text-teal-400/80 bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded-full">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-slate-600 text-xs">
                      <Clock className="h-3 w-3″ />
                      {article.readTime} min
                    </span>
                    <span className="flex items-center gap-1 text-slate-600 text-xs">
                      <Calendar className="h-3 w-3″ />
                      {article.date}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-sm group-hover:text-teal-300 transition-colors mb-1″>
                    {article.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-2″>{article.summary}</p>
                  <div className="flex items-center gap-1 text-teal-500 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read article <ChevronRight className="h-3 w-3″ />
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>

      </article>
    </div>
  );
}
