import React from 'react';
import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import ProLnkLogo from "@/components/ProLnkLogo";
import SEO from "@/components/SEO";
import {
  Droplets, Wind, Home, Zap, Leaf, Paintbrush, Hammer, Bug,
  ArrowRight, Search, DollarSign, Users,
} from "lucide-react";

type TradeCard = {
  slug: string;
  label: string;
  avgJob: number;
  partners: number;
  icon: React.ReactNode;
  color: string;
  desc: string;
};

const TRADE_CARDS: TradeCard[] = [
  {
    slug: "plumber",
    label: "Plumber",
    avgJob: 600,
    partners: 38,
    icon: <Droplets className="w-7 h-7″ />,
    color: "#3b82f6″,
    desc: "Leak repair, water heaters, remodel plumbing",
  },
  {
    slug: "hvac",
    label: "HVAC",
    avgJob: 850,
    partners: 52,
    icon: <Wind className="w-7 h-7″ />,
    color: "#06b6d4″,
    desc: "Installs, tune-ups, emergency calls, ductwork",
  },
  {
    slug: "roofer",
    label: "Roofer",
    avgJob: 8500,
    partners: 29,
    icon: <Home className="w-7 h-7″ />,
    color: "#f97316″,
    desc: "Full replacements, storm repairs, gutters",
  },
  {
    slug: "electrician",
    label: "Electrician",
    avgJob: 750,
    partners: 44,
    icon: <Zap className="w-7 h-7″ />,
    color: "#eab308″,
    desc: "Panels, EV chargers, rewires, inspections",
  },
  {
    slug: "landscaper",
    label: "Landscaper",
    avgJob: 1200,
    partners: 31,
    icon: <Leaf className="w-7 h-7″ />,
    color: "#22c55e",
    desc: "Design, installs, maintenance, irrigation",
  },
  {
    slug: "painter",
    label: "Painter",
    avgJob: 3200,
    partners: 27,
    icon: <Paintbrush className="w-7 h-7″ />,
    color: "#a855f7″,
    desc: "Interior, exterior, cabinet, commercial",
  },
  {
    slug: "general-contractor",
    label: "General Contractor",
    avgJob: 25000,
    partners: 19,
    icon: <Hammer className="w-7 h-7″ />,
    color: "#ef4444″,
    desc: "Additions, remodels, ADUs, full renovations",
  },
  {
    slug: "pest-control",
    label: "Pest Control",
    avgJob: 350,
    partners: 23,
    icon: <Bug className="w-7 h-7″ />,
    color: "#84cc16″,
    desc: "Quarterly contracts, termite, rodent, mosquito",
  },
];

function fmtCurrency(n: number) {
  return n >= 1000 ? `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K` : `$${n}`;
}

export default function TradeLandingList() {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState("");

  const filtered = TRADE_CARDS.filter(
    (t) =>
      query === "" ||
      t.label.toLowerCase().includes(query.toLowerCase()) ||
      t.desc.toLowerCase().includes(query.toLowerCase()),
  );

  const totalPartners = TRADE_CARDS.reduce((sum, t) => sum + t.partners, 0);

  return (
    <div className="min-h-screen" style={{ background: "#050d1a" }}>
      <SEO
        title="Trades on ProLnk — DFW Home Service Professionals"
        description={`${totalPartners} DFW home service professionals across 8 trades. Join the ProLnk Founding Network — inbound leads, 5 income streams, $149/mo locked rate.`}
        path="/trades"
      />

      {/* Nav */}
      <nav className="px-6 py-5 flex items-center justify-between max-w-6xl mx-auto">
        <button onClick={() => navigate("/")} className="focus:outline-none">
          <ProLnkLogo height={32} />
        </button>
        <Button
          onClick={() => navigate("/founding-partner")}
          className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-sm px-5″
        >
          Join Founding Network
        </Button>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-14 pb-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-semibold mb-5″>
          <Users className="w-3.5 h-3.5″ />
          {totalPartners} DFW partners across 8 trades
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-4″>
          Find Your Trade on <span className="text-yellow-400″>ProLnk</span>
        </h1>
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          ProLnk routes inbound leads to licensed DFW contractors. Founding Network members lock
          their rate at $149/mo with 5 income streams.
        </p>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-4″>
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500″ />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search trades…"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400/50 transition-colors"
          />
        </div>
      </section>

      {/* Trade Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-16″>
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500″>
            No trades match "{query}"
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5″>
            {filtered.map((t) => (
              <div
                key={t.slug}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-4 hover:border-gray-600 transition-colors group cursor-pointer"
                onClick={() => navigate(`/trades/${t.slug}`)}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${t.color}18`, color: t.color }}
                >
                  {t.icon}
                </div>

                {/* Info */}
                <div className="flex-1″>
                  <h3 className="text-white font-bold text-lg leading-tight mb-1″>{t.label}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{t.desc}</p>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between border-t border-gray-800 pt-4″>
                  <div>
                    <div className="flex items-center gap-1 text-yellow-400 font-black text-lg">
                      <DollarSign className="w-4 h-4″ />
                      {fmtCurrency(t.avgJob)}
                    </div>
                    <div className="text-gray-500 text-xs">avg job</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-lg">{t.partners}</div>
                    <div className="text-gray-500 text-xs">DFW partners</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex gap-2″>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/trades/${t.slug}`);
                    }}
                    className="flex-1 text-xs text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg py-2 px-3 transition-colors flex items-center justify-center gap-1.5″
                  >
                    Learn more <ArrowRight className="w-3.5 h-3.5″ />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/founding-partner");
                    }}
                    className="flex-1 text-xs font-semibold text-gray-900 bg-yellow-400 hover:bg-yellow-300 rounded-lg py-2 px-3 transition-colors flex items-center justify-center gap-1.5″
                  >
                    Join as {t.label.split(" ")[0]}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Bottom CTA bar */}
      <section className="border-t border-gray-800 bg-gray-900/50 py-12 px-6″>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-black text-white mb-2″>
            Your trade isn't listed?
          </h2>
          <p className="text-gray-400 text-sm mb-6″>
            ProLnk is expanding to more trades across DFW. Apply now and you'll be first in line
            when your category opens.
          </p>
          <Button
            onClick={() => navigate("/founding-partner")}
            size="lg"
            className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black px-8″
          >
            Apply to the Founding Network <ArrowRight className="ml-2 w-4 h-4″ />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-6″>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4″>
          <ProLnkLogo height={24} />
          <div className="flex gap-6 text-xs text-gray-500″>
            <button onClick={() => navigate("/privacy")} className="hover:text-gray-300 transition-colors">Privacy</button>
            <button onClick={() => navigate("/terms")} className="hover:text-gray-300 transition-colors">Terms</button>
            <button onClick={() => navigate("/")} className="hover:text-gray-300 transition-colors">Home</button>
          </div>
          <p className="text-gray-600 text-xs">© 2026 ProLnk. Dallas–Fort Worth, TX.</p>
        </div>
      </footer>
    </div>
  );
}
