import { useState } from "react";
import { Link } from "wouter";
import {
  Search,
  BookOpen,
  DollarSign,
  Users,
  Scan,
  CreditCard,
  Star,
  ChevronRight,
  MessageCircle,
  Mail,
  ArrowLeft,
  Zap,
} from "lucide-react";

const CATEGORIES = [
  {
    id: "getting-started",
    icon: BookOpen,
    color: "#22d3ee",
    title: "Getting Started",
    description: "Set up your account and get your first referral",
    articles: [
      { title: "How to complete your ProLnk application", views: 4820 },
      { title: "Understanding your partner tier and benefits", views: 3910 },
      { title: "Setting your service area and trade categories", views: 3540 },
      { title: "Uploading your license and insurance documents", views: 2860 },
      { title: "How the waitlist and launch timeline work", views: 2340 },
    ],
  },
  {
    id: "commissions",
    icon: DollarSign,
    color: "#4ade80",
    title: "Commission & Payouts",
    description: "Understand your earnings, tiers, and payout schedule",
    articles: [
      { title: "5-stream income model explained", views: 5210 },
      { title: "How payout tiers work (Charter → Level 4)", views: 4670 },
      { title: "When and how commissions are paid out", views: 3990 },
      { title: "Reading your commission ledger", views: 2710 },
    ],
  },
  {
    id: "network",
    icon: Users,
    color: "#a78bfa",
    title: "Network & Referrals",
    description: "Grow your network and maximize override income",
    articles: [
      { title: "How the 4-level referral cascade works", views: 4130 },
      { title: "Generating and sharing your referral link", views: 3780 },
      { title: "Tracking your downline in the Network Tree", views: 3010 },
      { title: "Pro subscription override: earning recurring income", views: 2490 },
    ],
  },
  {
    id: "trustypro",
    icon: Scan,
    color: "#f59e0b",
    title: "TrustyPro Scanning",
    description: "Photo scanning and Home Health Vault features",
    articles: [
      { title: "What is TrustyPro and how does it work?", views: 3650 },
      { title: "How to perform a home photo scan", views: 2980 },
      { title: "Home origination rights and permanent revenue share", views: 2410 },
    ],
  },
  {
    id: "billing",
    icon: CreditCard,
    color: "#fb7185",
    title: "Account & Billing",
    description: "Subscription, invoices, and account management",
    articles: [
      { title: "What's included in the $149/month subscription", views: 3120 },
      { title: "How to update your payment method", views: 2540 },
      { title: "Requesting a billing statement or invoice", views: 1870 },
    ],
  },
];

const FEATURED = [
  { title: "5-stream income model explained", category: "Commission & Payouts", views: 5210 },
  { title: "How to complete your ProLnk application", category: "Getting Started", views: 4820 },
  { title: "How the 4-level referral cascade works", category: "Network & Referrals", views: 4130 },
  { title: "What is TrustyPro and how does it work?", category: "TrustyPro Scanning", views: 3650 },
  { title: "Setting your service area and trade categories", category: "Getting Started", views: 3540 },
];

export default function HelpCenter() {
  const [query, setQuery] = useState("");

  const filteredCategories = CATEGORIES.map((cat) => ({
    ...cat,
    articles: cat.articles.filter(
      (a) =>
        !query ||
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        cat.title.toLowerCase().includes(query.toLowerCase())
    ),
  })).filter((cat) => !query || cat.articles.length > 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#080f1e", color: "#e2e8f0" }}>
      {/* Nav */}
      <nav
        className="border-b px-6 py-4 flex items-center justify-between"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <Link href="/">
          <span
            className="text-xl font-black tracking-tight cursor-pointer"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "#22d3ee" }}
          >
            ProLnk
          </span>
        </Link>
        <Link href="/">
          <span className="inline-flex items-center gap-1 text-sm text-white/40 hover:text-white transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </span>
        </Link>
      </nav>

      {/* Hero / search */}
      <div
        className="px-6 py-16 text-center"
        style={{
          background: "linear-gradient(180deg, rgba(34,211,238,0.08) 0%, transparent 100%)",
        }}
      >
        <div className="max-w-2xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{ background: "rgba(34,211,238,0.12)", color: "#22d3ee" }}
          >
            <Zap className="w-3 h-3" />
            Help Center
          </div>
          <h1
            className="text-4xl font-black mb-3"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            How can we help you?
          </h1>
          <p className="text-white/50 mb-8">
            Search our knowledge base or browse categories below.
          </p>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "0",
              }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-24">
        {/* Featured Articles */}
        {!query && (
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-4 h-4" style={{ color: "#f59e0b" }} />
              <h2 className="text-sm font-bold uppercase tracking-widest text-white/40">
                Most Popular
              </h2>
            </div>
            <div className="grid gap-3">
              {FEATURED.map((article, i) => (
                <button
                  key={i}
                  className="flex items-center justify-between w-full text-left px-5 py-4 transition-all group"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,211,238,0.3)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(34,211,238,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  <div>
                    <p className="text-sm font-semibold text-white/90">{article.title}</p>
                    <p className="text-xs text-white/40 mt-0.5">{article.category}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <span className="text-xs text-white/30">{article.views.toLocaleString()} views</span>
                    <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-teal-400 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Categories */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6">
            {query ? `Results for "${query}"` : "Browse by Category"}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {filteredCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="p-6"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className="w-10 h-10 flex items-center justify-center shrink-0"
                      style={{ background: `${cat.color}18` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: cat.color }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{cat.title}</h3>
                      <p className="text-xs text-white/40 mt-0.5">{cat.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {cat.articles.map((article, i) => (
                      <li key={i}>
                        <button
                          className="flex items-center justify-between w-full text-left group py-1.5"
                        >
                          <span className="text-sm text-white/60 group-hover:text-white transition-colors">
                            {article.title}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-teal-400 shrink-0 ml-2 transition-colors" />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div
                    className="mt-4 pt-4"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <span className="text-xs" style={{ color: cat.color }}>
                      {cat.articles.length} articles
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact Support */}
        <section
          className="mt-16 p-8 text-center"
          style={{
            background: "rgba(34,211,238,0.05)",
            border: "1px solid rgba(34,211,238,0.15)",
          }}
        >
          <MessageCircle className="w-8 h-8 mx-auto mb-4" style={{ color: "#22d3ee" }} />
          <h3
            className="text-xl font-black mb-2"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Still need help?
          </h3>
          <p className="text-white/50 text-sm mb-6">
            Our support team typically responds within 2 business hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:support@prolnk.xyz"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#22d3ee", color: "#080f1e" }}
            >
              <Mail className="w-4 h-4" />
              Email Support
            </a>
            <span className="text-xs text-white/30 self-center hidden sm:inline">
              support@prolnk.xyz · Mon–Fri 9am–6pm EST
            </span>
          </div>
        </section>
      </div>

      {/* Live chat widget placeholder */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="flex items-center gap-2 px-4 py-3 text-sm font-bold shadow-lg transition-transform hover:scale-105"
          style={{ backgroundColor: "#22d3ee", color: "#080f1e" }}
        >
          <MessageCircle className="w-4 h-4" />
          Live Chat
        </button>
      </div>
    </div>
  );
}
