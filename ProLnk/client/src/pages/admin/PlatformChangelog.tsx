import React from 'react';
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { ChevronDown, ChevronUp, Rocket, Bug, Zap, Shield, Calendar, CheckCircle, Clock } from "lucide-react";

const releases = [
  {
    version: "v2.4",
    date: "May 15, 2026",
    type: "Feature Release",
    featured: true,
    changes: [
      "Client Portal with SMS invite flow for homeowners",
      "Platform Changelog page with version history",
      "Tile & Grout maintenance guide for homeowners",
      "AI Opportunity Engine — improved match scoring v2",
      "Admin system status panel with real-time health checks",
    ],
    newFeatures: 5,
    bugFixes: 3,
  },
  {
    version: "v2.3",
    date: "May 1, 2026",
    type: "Feature Release",
    featured: false,
    changes: [
      "Exchange bid form with applicants counter",
      "Job preview panel in exchange view",
      "Founding Partner live count on homepage",
      "EarningsHistory chart improvements",
      "HomeHealthDashboard recent scans widget",
    ],
    newFeatures: 5,
    bugFixes: 7,
  },
  {
    version: "v2.2",
    date: "April 18, 2026",
    type: "Performance",
    featured: false,
    changes: [
      "AdminDashboard CSV export for signups and trends",
      "InboundLeads trade icons and AI confidence bar",
      "Network analytics page improvements",
      "Batch database query optimization (40% faster)",
    ],
    newFeatures: 3,
    bugFixes: 12,
  },
  {
    version: "v2.1",
    date: "April 4, 2026",
    type: "Bug Fix",
    featured: false,
    changes: [
      "Fixed wouter routing issue in InboundLeads",
      "Commission ledger display fix for Tier 4/5",
      "Mobile nav overflow on small screens",
      "Job log filter state persistence bug",
    ],
    newFeatures: 1,
    bugFixes: 18,
  },
  {
    version: "v2.0",
    date: "March 15, 2026",
    type: "Feature Release",
    featured: false,
    changes: [
      "Platform launch — ProLnk and TrustyPro portals live",
      "Waitlist system with email confirmation",
      "Admin dashboard for signup management",
      "Partner onboarding flow with 5-tier commission",
      "Host-based routing for dual-brand architecture",
    ],
    newFeatures: 47,
    bugFixes: 0,
  },
];

const upcoming = [
  { title: "Mobile App (iOS & Android)", timeline: "Q3 2026", status: "In development" },
  { title: "AI Matching v2 — semantic scoring", timeline: "Q2 2026", status: "In development" },
  { title: "B2B Exchange Marketplace", timeline: "Q4 2026", status: "Planned" },
  { title: "TrustyPro Commercial", timeline: "Q1 2027", status: "Planned" },
];

const typeMeta: Record<string, { icon: React.ReactElement; color: string; bg: string }> = {
  "Feature Release": { icon: <Rocket className="w-3 h-3" />, color: "text-teal-300", bg: "bg-teal-500/20 border-teal-500/30" },
  "Bug Fix": { icon: <Bug className="w-3 h-3" />, color: "text-orange-300", bg: "bg-orange-500/20 border-orange-500/30" },
  "Performance": { icon: <Zap className="w-3 h-3" />, color: "text-yellow-300", bg: "bg-yellow-500/20 border-yellow-500/30" },
  "Security": { icon: <Shield className="w-3 h-3" />, color: "text-blue-300", bg: "bg-blue-500/20 border-blue-500/30" },
};

export default function PlatformChangelog() {
  const [open, setOpen] = useState<string | null>(null);
  const [feedback, setFeedback] = useState({ title: "", desc: "", priority: "Medium" });
  const [submitted, setSubmitted] = useState(false);

  const totalFeatures = releases.reduce((s, r) => s + r.newFeatures, 0);
  const totalFixes = releases.reduce((s, r) => s + r.bugFixes, 0);

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Platform Changelog</h1>
          <p className="text-gray-400 mt-1">What's new in ProLnk</p>
        </div>

        {/* Version stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Launch", value: "March 2026", sub: "v2.0" },
            { label: "Features Shipped", value: totalFeatures.toString(), sub: "since launch" },
            { label: "Bugs Fixed", value: totalFixes.toString(), sub: "since launch" },
          ].map((s) => (
            <div key={s.label} className="bg-[#0F1E35] border border-[#1E3A5F] rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-gray-400 text-xs mt-1">{s.label}</div>
              <div className="text-gray-500 text-xs">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Featured latest release */}
        {releases
          .filter((r) => r.featured)
          .map((r) => {
            const meta = typeMeta[r.type];
            return (
              <div
                key={r.version}
                className="bg-gradient-to-r from-teal-600/10 to-blue-600/10 border border-teal-500/30 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-white">{r.version}</span>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full border ${meta.bg} ${meta.color}`}
                  >
                    {meta.icon} {r.type}
                  </span>
                  <span className="ml-auto text-gray-400 text-sm flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> {r.date}
                  </span>
                </div>
                <ul className="space-y-2 mb-4">
                  {r.changes.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-gray-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="text-teal-400 font-medium">{r.newFeatures} new features</span>
                  <span>{r.bugFixes} bug fixes</span>
                  <a href="#" className="text-blue-400 hover:text-blue-300 ml-auto">
                    Release notes →
                  </a>
                </div>
              </div>
            );
          })}

        {/* Version history accordion */}
        <div>
          <h2 className="text-white font-semibold text-lg mb-4">Version History</h2>
          <div className="space-y-2">
            {releases
              .filter((r) => !r.featured)
              .map((r) => {
                const meta = typeMeta[r.type];
                const isOpen = open === r.version;
                return (
                  <div key={r.version} className="border border-[#1E3A5F] rounded-xl overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#1E3A5F]/20 transition-colors"
                      onClick={() => setOpen(isOpen ? null : r.version)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-white font-semibold">{r.version}</span>
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${meta.bg} ${meta.color}`}
                        >
                          {meta.icon} {r.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 text-sm">{r.date}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 bg-[#0A1628]/40">
                        <ul className="space-y-2 mb-3">
                          {r.changes.map((c) => (
                            <li key={c} className="flex items-start gap-2 text-gray-300 text-sm">
                              <CheckCircle className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                              {c}
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center gap-4 text-xs text-gray-400 pt-2 border-t border-[#1E3A5F]">
                          <span className="text-teal-400 font-medium">{r.newFeatures} new features</span>
                          <span>{r.bugFixes} bug fixes</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>

        {/* Upcoming features */}
        <div className="bg-[#0F1E35] border border-[#1E3A5F] rounded-xl p-5">
          <h2 className="text-white font-semibold text-lg mb-4">Upcoming Features</h2>
          <div className="space-y-3">
            {upcoming.map((u) => (
              <div
                key={u.title}
                className="flex items-center justify-between py-3 border-b border-[#1E3A5F] last:border-0"
              >
                <div>
                  <p className="text-white text-sm font-medium">{u.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{u.timeline}</p>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full border ${
                    u.status === "In development"
                      ? "bg-blue-500/20 border-blue-500/30 text-blue-300"
                      : "bg-gray-500/20 border-gray-500/30 text-gray-400"
                  }`}
                >
                  {u.status === "In development" ? (
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3" /> {u.status}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {u.status}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature request form */}
        <div className="bg-[#0F1E35] border border-[#1E3A5F] rounded-xl p-5">
          <h2 className="text-white font-semibold text-lg mb-1">Suggest a Feature</h2>
          <p className="text-gray-400 text-sm mb-4">Have an idea? Submit it and vote on others.</p>
          {submitted ? (
            <div className="text-center py-6">
              <CheckCircle className="w-10 h-10 text-teal-400 mx-auto mb-2" />
              <p className="text-white font-medium">Feature request submitted!</p>
              <p className="text-gray-400 text-sm mt-1">We review all submissions weekly.</p>
              <button
                className="mt-3 text-teal-400 text-sm hover:text-teal-300"
                onClick={() => { setSubmitted(false); setFeedback({ title: "", desc: "", priority: "Medium" }); }}
              >
                Submit another
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <input
                className="w-full bg-[#0A1628] border border-[#1E3A5F] rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-teal-500"
                placeholder="Feature title"
                value={feedback.title}
                onChange={(e) => setFeedback({ ...feedback, title: e.target.value })}
              />
              <textarea
                rows={3}
                className="w-full bg-[#0A1628] border border-[#1E3A5F] rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-teal-500 resize-none"
                placeholder="Describe the feature and why it matters..."
                value={feedback.desc}
                onChange={(e) => setFeedback({ ...feedback, desc: e.target.value })}
              />
              <div className="flex items-center gap-3">
                <label className="text-gray-400 text-sm">Priority</label>
                {["Low", "Medium", "High"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setFeedback({ ...feedback, priority: p })}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                      feedback.priority === p
                        ? "bg-teal-500/20 border-teal-500/50 text-teal-300"
                        : "border-[#1E3A5F] text-gray-400 hover:border-gray-500"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <button
                className="w-full bg-teal-500 hover:bg-teal-400 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-40"
                disabled={!feedback.title || !feedback.desc}
                onClick={() => setSubmitted(true)}
              >
                Submit Feature Request
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
