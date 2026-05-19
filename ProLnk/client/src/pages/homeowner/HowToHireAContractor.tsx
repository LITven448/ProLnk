import React from 'react';
import HomeownerLayout from "@/components/HomeownerLayout";
import { D } from "@/components/DashboardShared";
import {
  Shield, DollarSign, AlertTriangle, FileText, Star,
  CheckCircle, XCircle, ChevronRight, Search, MessageSquare,
  Award, Home, Phone, MapPin, CreditCard, Clock,
} from "lucide-react";

const NAV_LINKS = [
  { id: "credentials", label: "Verify Credentials" },
  { id: "quotes", label: "Get Multiple Quotes" },
  { id: "red-flags", label: "Red Flags" },
  { id: "payment", label: "Payment Terms" },
  { id: "contracts", label: "Written Contracts" },
  { id: "reviews", label: "Reviews" },
];

const CREDENTIAL_CHECKS = [
  { label: "License number (verify via TX contractor lookup)" },
  { label: "Certificate of insurance (general liability + workers comp)" },
  { label: "Background check on file" },
  { label: "Physical business address" },
  { label: "Better Business Bureau rating" },
  { label: "Professional trade association membership" },
];

const QUOTE_TIPS = [
  {
    title: "Always get 3+ quotes",
    desc: "A single quote gives you no frame of reference. Three or more reveals the market rate and helps you spot outliers.",
  },
  {
    title: "Compare scope, not just price",
    desc: "Two $4,000 bids can be completely different jobs. Ensure each quote covers the identical scope of work before comparing.",
  },
  {
    title: "Lowest bid isn\'t always best",
    desc: "An unusually low bid often signals cut corners, cheaper materials, or hidden costs that surface mid-project.",
  },
  {
    title: "Ask what\'s excluded",
    desc: "Permits, haul-away, cleanup, and materials are commonly excluded. Understand exactly what you\'re paying for.",
  },
];

const RED_FLAGS = [
  { icon: DollarSign, label: "Demands full payment upfront", color: D.red },
  { icon: FileText, label: "No written contract offered", color: D.red },
  { icon: MapPin, label: "No verifiable physical address", color: D.red },
  { icon: CreditCard, label: "Only accepts cash payments", color: D.amber },
  { icon: AlertTriangle, label: "Extremely low bid vs. market", color: D.amber },
  { icon: Phone, label: "High-pressure or rushed sales tactics", color: D.amber },
];

const PAYMENT_TERMS = [
  { label: "25% deposit maximum", desc: "A reasonable deposit to secure the job and purchase materials. Never pay more than 25% before work begins.", color: D.cyan },
  { label: "Progress payments tied to milestones", desc: "Structure payments around verifiable milestones — foundation complete, framing done, inspection passed.", color: D.purple },
  { label: "Hold final 10% until completion", desc: "The punch list holdback is your leverage. Release final payment only after all work is complete and punch items resolved.", color: D.green },
];

const CONTRACT_ITEMS = [
  "Detailed scope of work (every task listed)",
  "Project start and completion dates",
  "Full payment schedule with milestone triggers",
  "Materials specified by brand, model, and grade",
  "Warranty terms (both labor and materials)",
  "Change order process (written, signed, priced)",
  "Permit responsibility (who pulls, who pays)",
  "Cleanup and haul-away responsibilities",
  "Dispute resolution process",
  "Contractor license number on document",
];

const REVIEW_TIPS = [
  { label: "Check Google, Yelp, and BBB", desc: "Look at review volume, recency, and response to negative reviews." },
  { label: "Ask for 3 references", desc: "Call them. Ask about timeline, cleanup, cost accuracy, and re-hire likelihood." },
  { label: "Look for before/after photos", desc: "Skilled tradespeople take pride in their work and show it." },
  { label: "Check for repeat customers", desc: ""I\'ve used them 4 times" is the strongest endorsement possible." },
];

function SectionCard({ id, title, icon: Icon, color, children }: {
  id: string;
  title: string;
  icon: typeof Shield;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="rounded-2xl p-6 space-y-5" style={{ background: D.card, border: `1px solid ${D.border}` }}>
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}20`, border: `1px solid ${color}30` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <h2 className="text-lg font-bold" style={{ color: D.text }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default function HowToHireAContractor() {
  return (
    <HomeownerLayout>
      <div className="min-h-screen p-6 max-w-3xl mx-auto space-y-8" style={{ background: D.bg, fontFamily: "'Inter', sans-serif" }}>

        {/* Header */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: D.cyan }}>
            <Home className="w-3.5 h-3.5" />
            Homeowner Guide
          </div>
          <h1 className="text-3xl font-black tracking-tight" style={{ color: D.text }}>How to Hire a Contractor</h1>
          <p className="text-base" style={{ color: D.muted }}>What to know before you book</p>
        </div>

        {/* Quick nav */}
        <div
          className="rounded-2xl p-4"
          style={{ background: D.card, border: `1px solid ${D.border}` }}
        >
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: D.muted }}>Jump to section</p>
          <div className="flex flex-wrap gap-2">
            {NAV_LINKS.map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                style={{ background: D.surface, color: D.text, border: `1px solid ${D.border}` }}
              >
                {link.label}
                <ChevronRight className="w-3 h-3" style={{ color: D.muted }} />
              </a>
            ))}
          </div>
        </div>

        {/* Section 1 — Verify Credentials */}
        <SectionCard id="credentials" title="1. Verify Credentials" icon={Shield} color={D.cyan}>
          <p className="text-sm" style={{ color: D.muted }}>
            Verification is non-negotiable. A licensed, insured contractor protects you from liability if a worker is injured on your property or if work doesn&apos;t meet code.
          </p>
          <div className="space-y-2.5">
            {CREDENTIAL_CHECKS.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: D.surface }}>
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: D.cyan }} />
                <span className="text-sm" style={{ color: D.text }}>{item.label}</span>
              </div>
            ))}
          </div>
          <div className="text-xs p-3 rounded-xl" style={{ background: `${D.cyan}10`, color: D.cyan, border: `1px solid ${D.cyan}20` }}>
            Texas: Verify contractor license at <span className="font-semibold underline cursor-pointer">tdlr.texas.gov</span>
          </div>
        </SectionCard>

        {/* Section 2 — Multiple Quotes */}
        <SectionCard id="quotes" title="2. Get Multiple Quotes" icon={Search} color={D.purple}>
          <p className="text-sm" style={{ color: D.muted }}>
            Never hire the first contractor you talk to without comparing. Getting multiple quotes is the single best way to ensure fair pricing.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {QUOTE_TIPS.map((tip, i) => (
              <div key={i} className="p-4 rounded-xl space-y-1" style={{ background: D.surface, border: `1px solid ${D.border}` }}>
                <p className="text-sm font-bold" style={{ color: D.text }}>{tip.title}</p>
                <p className="text-xs" style={{ color: D.muted }}>{tip.desc}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Section 3 — Red Flags */}
        <SectionCard id="red-flags" title="3. Red Flags to Watch For" icon={AlertTriangle} color={D.red}>
          <p className="text-sm" style={{ color: D.muted }}>
            Walk away immediately from contractors who exhibit any of these warning signs. They are predictors of scams, shoddy work, or disputes.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {RED_FLAGS.map((flag, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl"
                style={{ background: `${flag.color}10`, border: `1px solid ${flag.color}30` }}
              >
                <XCircle className="w-4 h-4 flex-shrink-0" style={{ color: flag.color }} />
                <span className="text-sm font-medium" style={{ color: D.text }}>{flag.label}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Section 4 — Payment Terms */}
        <SectionCard id="payment" title="4. Payment Terms Best Practices" icon={DollarSign} color={D.green}>
          <p className="text-sm" style={{ color: D.muted }}>
            How you structure payments determines your leverage throughout the project. Never pay in full until the job is done to your satisfaction.
          </p>
          <div className="space-y-3">
            {PAYMENT_TERMS.map((term, i) => (
              <div
                key={i}
                className="p-4 rounded-xl flex items-start gap-4"
                style={{ background: D.surface, border: `1px solid ${term.color}30` }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-black"
                  style={{ background: `${term.color}20`, color: term.color }}
                >
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-bold mb-1" style={{ color: term.color }}>{term.label}</p>
                  <p className="text-xs" style={{ color: D.muted }}>{term.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Section 5 — Written Contracts */}
        <SectionCard id="contracts" title="5. Written Contracts — Must Includes" icon={FileText} color={D.amber}>
          <p className="text-sm" style={{ color: D.muted }}>
            A handshake is not a contract. Every job, no matter how small, should have a written agreement signed before any work or money changes hands.
          </p>
          <div className="space-y-2">
            {CONTRACT_ITEMS.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg" style={{ background: i % 2 === 0 ? D.surface : "transparent" }}>
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: D.amber }} />
                <span className="text-sm" style={{ color: D.text }}>{item}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Section 6 — Reviews */}
        <SectionCard id="reviews" title="6. Reviews and References" icon={Star} color={D.orange}>
          <p className="text-sm" style={{ color: D.muted }}>
            Online reviews give you signal, but direct references give you certainty. Always ask for and actually call references before hiring.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {REVIEW_TIPS.map((tip, i) => (
              <div key={i} className="p-4 rounded-xl space-y-1" style={{ background: D.surface, border: `1px solid ${D.border}` }}>
                <p className="text-sm font-bold" style={{ color: D.text }}>{tip.label}</p>
                <p className="text-xs" style={{ color: D.muted }}>{tip.desc}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* TrustyPro advantage CTA */}
        <div
          className="rounded-2xl p-6 space-y-4"
          style={{
            background: `linear-gradient(135deg, ${D.cyan}12, ${D.purple}12)`,
            border: `1px solid ${D.cyan}30`,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${D.cyan}20` }}
            >
              <Award className="w-5 h-5" style={{ color: D.cyan }} />
            </div>
            <div>
              <p className="font-bold text-base" style={{ color: D.text }}>Skip the verification work</p>
              <p className="text-xs" style={{ color: D.muted }}>ProLnk and TrustyPro handle it for you</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: D.text }}>
            All ProLnk and TrustyPro professionals are{" "}
            <span style={{ color: D.cyan }}>pre-vetted, background checked, licensed, and insured</span>
            {" "}before they ever appear in your results. We handle verification so you don&apos;t have to worry about who shows up at your door.
          </p>
          <div className="flex items-center gap-3">
            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
              style={{ background: `linear-gradient(135deg, ${D.cyan}cc, ${D.purple}cc)`, color: "#fff" }}
            >
              Find a Verified Pro
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              className="px-5 py-2.5 rounded-xl text-sm font-semibold"
              style={{ background: D.surface, color: D.text, border: `1px solid ${D.border}` }}
            >
              Get a Free Quote
            </button>
          </div>
        </div>

      </div>
    </HomeownerLayout>
  );
}
