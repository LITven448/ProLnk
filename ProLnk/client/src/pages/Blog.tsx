import { Helmet } from "react-helmet-async";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, ArrowRight, Megaphone } from "lucide-react";
import { Link } from "wouter";

interface Article {
  id: number;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  featured?: boolean;
}

const articles: Article[] = [
  {
    id: 1,
    title: "Why 2,125 Home Service Pros Are Joining ProLnk Before Launch",
    category: "Founding Network",
    date: "May 8, 2026",
    readTime: "4 min",
    summary:
      "The founding network is closing at 2,125 members — and early adopters lock in their tier rate permanently. Charter members pay $149/mo forever, earn 25% direct commission, and build passive income through a 4-level referral cascade. Here's why the math makes joining now a no-brainer.",
    featured: true,
  },
  {
    id: 2,
    title: "The 5 Income Streams Every ProLnk Partner Earns",
    category: "Commission",
    date: "May 5, 2026",
    readTime: "6 min",
    summary:
      "From job commissions to home origination rights, ProLnk partners earn across five distinct streams simultaneously. We break down the exact math — what each tier pays, how the 4-level network cascade compounds, and why the top earners generate income even when they're not actively working.",
  },
  {
    id: 3,
    title: "DFW Home Services: Why We're Starting Here",
    category: "Market",
    date: "April 30, 2026",
    readTime: "3 min",
    summary:
      "The Dallas-Fort Worth market has 7 million homes, $12B in annual home services spend, and a fragmented pro ecosystem where most contractors still rely on word-of-mouth. We chose DFW as our launch market deliberately — and the data shows why it's the perfect proving ground.",
  },
  {
    id: 4,
    title: "How AI Photo Analysis Works: Turning Job Photos Into Leads",
    category: "Technology",
    date: "April 24, 2026",
    readTime: "5 min",
    summary:
      "ProLnk analyzes 65 categories of home systems from job photos — HVAC units, electrical panels, plumbing configurations, and more. Every photo a pro uploads becomes structured data in the Home Health Vault, and that data generates future leads. Here's the technical breakdown.",
  },
  {
    id: 5,
    title: "TrustyPro: The Home Health Vault Vision",
    category: "TrustyPro",
    date: "April 18, 2026",
    readTime: "7 min",
    summary:
      "We're building the most comprehensive verified database of residential interiors in America. TrustyPro's Home Health Vault captures structural data, system age, permit history, and health hazards — and it turns every pro's site visit into a permanent data asset they share in perpetuity.",
  },
  {
    id: 6,
    title: "How Home Origination Rights Work (And Why They're Valuable)",
    category: "Education",
    date: "April 12, 2026",
    readTime: "4 min",
    summary:
      "The first pro to document a home earns 1.5% of the platform fee on every future job — forever. With 7M+ homes in DFW alone, origination rights represent a recurring revenue stream that outlasts any individual job. We explain the mechanics, how rights transfer, and how to maximize your portfolio.",
  },
];

const categoryColors: Record<string, string> = {
  "Founding Network": "bg-teal-500/20 text-teal-400 border-teal-500/30",
  Commission: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Market: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Technology: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  TrustyPro: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Education: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

const featured = articles.find((a) => a.featured)!;
const grid = articles.filter((a) => !a.featured);

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>ProLnk Blog — Insights for Home Service Professionals</title>
        <meta
          name="description"
          content="The ProLnk blog covers the founding network, 5-stream commission system, DFW market strategy, AI photo analysis, and the Home Health Vault vision."
        />
      </Helmet>

      <div className="min-h-screen" style={{ backgroundColor: "#0A1628" }}>
        <div className="max-w-6xl mx-auto px-4 py-12">

          {/* Coming Soon Banner */}
          <div className="flex items-center gap-3 mb-10 px-5 py-3 rounded-xl border border-teal-500/30 bg-teal-500/10">
            <Megaphone className="h-4 w-4 text-teal-400 flex-shrink-0" />
            <p className="text-sm text-teal-300">
              <span className="font-semibold">Coming Soon</span> — Full articles available at DFW Launch. Founding network closes at 500 applications.
            </p>
          </div>

          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">ProLnk Blog</h1>
            <p className="text-slate-400 text-lg max-w-2xl">
              Strategy, education, and inside stories for home service professionals building long-term income on the ProLnk network.
            </p>
          </div>

          {/* Featured Article */}
          <Link href="/blog">
            <div
              className="relative rounded-2xl overflow-hidden mb-12 cursor-pointer group"
              style={{ minHeight: "360px" }}
            >
              {/* Dark gradient background with pattern */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, #0d2137 0%, #0a3d2e 50%, #0d2137 100%)",
                }}
              />
              {/* Grid texture overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, #14b8a6 1px, transparent 0)",
                  backgroundSize: "32px 32px",
                }}
              />
              {/* Bottom gradient fade */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,22,40,0.95) 0%, rgba(10,22,40,0.4) 60%, transparent 100%)",
                }}
              />

              <div className="relative z-10 p-8 md:p-12 flex flex-col justify-end h-full" style={{ minHeight: "360px" }}>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full border ${categoryColors[featured.category]}`}
                  >
                    {featured.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-teal-400 inline-block" />
                    FEATURED
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 max-w-3xl group-hover:text-teal-300 transition-colors leading-snug">
                  {featured.title}
                </h2>

                <p className="text-slate-300 text-base max-w-2xl mb-6 leading-relaxed">
                  {featured.summary}
                </p>

                <div className="flex items-center gap-5 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {featured.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {featured.readTime} read
                  </span>
                  <span className="flex items-center gap-1.5 text-teal-400 font-medium ml-auto group-hover:gap-2.5 transition-all">
                    Read article <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-lg font-semibold text-white">Recent Articles</h2>
            <div className="flex-1 h-px bg-slate-700/60" />
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grid.map((article) => (
              <Link key={article.id} href="/blog">
                <div className="group flex flex-col h-full rounded-xl border border-slate-700/60 bg-slate-800/40 hover:bg-slate-800/70 hover:border-teal-500/40 transition-all duration-200 cursor-pointer overflow-hidden">
                  {/* Card top accent bar */}
                  <div className="h-0.5 w-full bg-gradient-to-r from-teal-500/0 via-teal-500/60 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="p-6 flex flex-col flex-1">
                    {/* Category + Read Time */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryColors[article.category]}`}
                      >
                        {article.category}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-semibold text-white mb-3 leading-snug group-hover:text-teal-300 transition-colors">
                      {article.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-sm text-slate-400 leading-relaxed flex-1 mb-5">
                      {article.summary}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                      <span className="text-xs text-slate-500 flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        {article.date}
                      </span>
                      <span className="text-xs text-teal-500 flex items-center gap-1 font-medium group-hover:gap-1.5 transition-all">
                        Read <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center px-6 py-10 rounded-2xl border border-slate-700/50 bg-slate-800/30">
            <p className="text-slate-400 text-sm mb-1">Full articles publish at DFW launch</p>
            <h3 className="text-xl font-bold text-white mb-4">Don't miss the founding network window</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
              Waitlist closes at 500 partner applications and 5,000 homes. Charter-tier pricing locks in at $149/mo — permanently.
            </p>
            <Link href="/partner-signup">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-95" style={{ backgroundColor: "#14b8a6" }}>
                Secure Your Spot <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
