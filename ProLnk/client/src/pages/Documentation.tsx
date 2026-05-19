import { Helmet } from "react-helmet-async";
import { BookOpen, ArrowRight, DollarSign, Camera, Users, Home, Zap, Shield } from "lucide-react";
import { Link } from "wouter";

const SECTIONS = [
  {
    icon: <DollarSign className="w-5 h-5 text-amber-400″ />,
    title: "Commission System",
    desc: "How the 5-stream income system works, cascade rates, and origination rights.",
    href: "/resources/faq",
  },
  {
    icon: <Camera className="w-5 h-5 text-teal-400″ />,
    title: "Photo Intelligence",
    desc: "How AI analyzes your job photos across 65 categories to generate cross-trade leads.",
    href: "/how-ai-works",
  },
  {
    icon: <Users className="w-5 h-5 text-blue-400″ />,
    title: "Network Recruiting",
    desc: "How to build your 4-level network and earn subscription overrides.",
    href: "/resources",
  },
  {
    icon: <Home className="w-5 h-5 text-green-400″ />,
    title: "Home Origination Rights",
    desc: "How to document homes, claim origination rights, and earn forever.",
    href: "/home-documentation",
  },
  {
    icon: <Zap className="w-5 h-5 text-purple-400″ />,
    title: "Lead System",
    desc: "How leads are detected, routed, and assigned to network partners.",
    href: "/resources/faq",
  },
  {
    icon: <Shield className="w-5 h-5 text-red-400″ />,
    title: "Compliance & Verification",
    desc: "License verification, background checks, and TrustyPro Certified status.",
    href: "/resources/faq",
  },
];

export default function Documentation() {
  return (
    <>
      <Helmet>
        <title>ProLnk Documentation</title>
        <meta name="description" content="ProLnk platform documentation — commission system, photo intelligence, network recruiting, home origination rights, and lead system." />
      </Helmet>
      <div className="min-h-screen bg-[#0A1628] text-white">
        <div className="border-b border-white/10 px-6 py-4 max-w-5xl mx-auto flex items-center gap-2″>
          <BookOpen className="w-5 h-5 text-teal-400″ />
          <span className="font-bold text-lg">ProLnk Documentation</span>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-10 space-y-8″>
          <div>
            <h1 className="text-3xl font-bold mb-3″>Platform Documentation</h1>
            <p className="text-slate-400 max-w-2xl">
              Everything you need to understand how ProLnk works — from commission math to photo analysis to recruiting your network.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4″>
            {SECTIONS.map((s, i) => (
              <Link key={i} href={s.href}>
                <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-teal-500/30 hover:bg-white/[0.05] transition-all cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4″>
                    {s.icon}
                  </div>
                  <h3 className="font-bold mb-1.5″>{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-3″>{s.desc}</p>
                  <div className="flex items-center gap-1 text-teal-400 text-xs font-semibold group-hover:gap-2 transition-all">
                    Read more <ArrowRight className="w-3.5 h-3.5″ />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-teal-500/10 border border-teal-500/30 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold mb-2″>Have a specific question?</h2>
            <p className="text-slate-400 text-sm mb-4″>The Partner FAQ has answers to 80+ common questions.</p>
            <Link href="/resources/faq">
              <button className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white px-6 py-3 rounded-xl font-bold transition-colors">
                Browse FAQ <ArrowRight className="w-4 h-4″ />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
