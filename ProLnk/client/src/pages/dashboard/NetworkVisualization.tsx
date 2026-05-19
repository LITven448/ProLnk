import { useState } from "react";
import { Users, DollarSign, TrendingUp, Network, Copy, Check, ArrowRight } from "lucide-react";
import { Link } from "wouter";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      }}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
      style={{
        background: copied ? "rgba(20,184,166,0.2)" : "rgba(20,184,166,0.1)",
        color: "#14b8a6″,
        border: `1px solid ${copied ? "rgba(20,184,166,0.5)" : "rgba(20,184,166,0.25)"}`,
      }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

const L1_NODES = [
  { initials: "MR", name: "Marcus R.", trade: "Plumber", monthly: 980, override: 7 },
  { initials: "SL", name: "Sandra L.", trade: "Electrician", monthly: 840, override: 7 },
  { initials: "JT", name: "James T.", trade: "HVAC", monthly: 1120, override: 7 },
];

const L2_NODES = [
  [
    { initials: "AK", name: "Alex K.", trade: "Plumber", monthly: 720 },
    { initials: "DM", name: "Diana M.", trade: "Roofer", monthly: 650 },
  ],
  [
    { initials: "RB", name: "Ryan B.", trade: "Electrician", monthly: 590 },
    { initials: "TN", name: "Tara N.", trade: "HVAC", monthly: 680 },
    { initials: "PW", name: "Pete W.", trade: "Painter", monthly: 540 },
  ],
  [
    { initials: "CJ", name: "Chris J.", trade: "Plumber", monthly: 610 },
    { initials: "LH", name: "Lena H.", trade: "Electrician", monthly: 570 },
  ],
];

const L3_NODES = [
  [{ initials: "FM", name: "Frank M.", trade: "HVAC", monthly: 490 }],
  [{ initials: "JL", name: "Joyce L.", trade: "Roofer", monthly: 380 }],
  [{ initials: "BO", name: "Ben O.", trade: "Plumber", monthly: 365 }],
];

const LEVEL_EARNINGS = [
  { level: "L1″, recruits: 8, avg: 847, pct: 7, monthly: 474 },
  { level: "L2″, recruits: 12, avg: 623, pct: 4, monthly: 299 },
  { level: "L3″, recruits: 3, avg: 412, pct: 2, monthly: 25 },
];

const REFERRAL_LINK = "prolnk.io/join?ref=partner123″;

export default function NetworkVisualization() {
  return (
    <div className="min-h-screen bg-[#0A1628] px-4 py-8″>
      <div className="max-w-5xl mx-auto space-y-8″>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">Your Network</h1>
          <p className="text-sm text-gray-400 mt-1″>See your earning cascade at a glance</p>
        </div>

        {/* Summary stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3″>
          {[
            { label: "Direct Recruits", value: "8″, icon: Users, color: "#14b8a6" },
            { label: "Total Network", value: "23″, icon: Network, color: "#8b5cf6" },
            { label: "Monthly Network Income", value: "$247″, icon: DollarSign, color: "#F5E642" },
            { label: "Network Depth", value: "3 levels", icon: TrendingUp, color: "#3b82f6″ },
          ].map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="rounded-xl p-4 flex flex-col gap-2″
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}18` }}>
                <Icon size={16} style={{ color }} />
              </div>
              <p className="text-xl font-bold text-white">{value}</p>
              <p className="text-xs text-gray-500 leading-tight">{label}</p>
            </div>
          ))}
        </div>

        {/* Tree visualization */}
        <div
          className="rounded-2xl p-6 overflow-x-auto"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <h2 className="text-sm font-semibold text-gray-300 mb-6″>Network Tree</h2>

          {/* Level 0 — You */}
          <div className="flex flex-col items-center">
            <div
              className="rounded-xl px-6 py-3 text-center"
              style={{ background: "rgba(245,230,66,0.12)", border: "2px solid rgba(245,230,66,0.4)" }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-1″
                style={{ background: "rgba(245,230,66,0.2)", color: "#F5E642″ }}
              >
                YOU
              </div>
              <p className="text-xs font-bold text-white">Your Name</p>
              <p className="text-[10px] text-gray-400″>Founding Member</p>
              <span
                className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
                style={{ background: "rgba(245,230,66,0.15)", color: "#F5E642″ }}
              >
                Founding
              </span>
            </div>

            {/* Connector down */}
            <div className="w-px h-6 bg-white/10″ />

            {/* Level 1 row */}
            <div className="flex gap-4 sm:gap-6 relative">
              {/* Horizontal line spanning L1 nodes */}
              <div
                className="absolute top-0 left-1/4 right-1/4 h-px"
                style={{ background: "rgba(255,255,255,0.1)", top: 0 }}
              />
              {L1_NODES.map((node, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-px h-6 bg-white/10″ />
                  <div
                    className="rounded-xl p-3 text-center w-36″
                    style={{ background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.3)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-1″
                      style={{ background: "rgba(20,184,166,0.2)", color: "#14b8a6″ }}
                    >
                      {node.initials}
                    </div>
                    <p className="text-xs font-semibold text-white">{node.name}</p>
                    <p className="text-[10px] text-gray-400″>{node.trade}</p>
                    <p className="text-[10px] text-teal-400 font-medium mt-0.5″>earning ${node.monthly}/mo</p>
                    <div
                      className="mt-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold inline-flex items-center gap-0.5″
                      style={{ background: "rgba(245,230,66,0.12)", color: "#F5E642″ }}
                    >
                      <ArrowRight size={8} /> {node.override}% override
                    </div>
                  </div>

                  {/* L2 children */}
                  {L2_NODES[i] && (
                    <>
                      <div className="w-px h-4 bg-white/10″ />
                      <div className="flex gap-2″>
                        {L2_NODES[i].map((l2, j) => (
                          <div key={j} className="flex flex-col items-center">
                            <div
                              className="rounded-lg p-2 text-center w-24″
                              style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)" }}
                            >
                              <div
                                className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold mx-auto mb-0.5″
                                style={{ background: "rgba(139,92,246,0.2)", color: "#8b5cf6″ }}
                              >
                                {l2.initials}
                              </div>
                              <p className="text-[10px] font-medium text-white">{l2.name}</p>
                              <p className="text-[9px] text-gray-500″>{l2.trade}</p>
                              <p className="text-[9px] text-purple-400″>${l2.monthly}/mo</p>
                              <div
                                className="mt-1 px-1 py-0.5 rounded text-[8px] font-bold"
                                style={{ background: "rgba(245,230,66,0.1)", color: "#F5E642″ }}
                              >
                                4% override
                              </div>
                            </div>

                            {/* L3 child (first L2 per L1 gets one) */}
                            {L3_NODES[i] && j === 0 && (
                              <>
                                <div className="w-px h-3 bg-white/10″ />
                                {L3_NODES[i].map((l3, k) => (
                                  <div
                                    key={k}
                                    className="rounded-lg p-1.5 text-center w-20″
                                    style={{ background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.18)" }}
                                  >
                                    <div
                                      className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold mx-auto mb-0.5″
                                      style={{ background: "rgba(59,130,246,0.18)", color: "#3b82f6″ }}
                                    >
                                      {l3.initials}
                                    </div>
                                    <p className="text-[9px] text-white">{l3.name}</p>
                                    <p className="text-[8px] text-blue-400″>${l3.monthly}/mo</p>
                                    <div
                                      className="mt-0.5 px-1 py-0.5 rounded text-[7px] font-bold"
                                      style={{ background: "rgba(245,230,66,0.1)", color: "#F5E642″ }}
                                    >
                                      2% override
                                    </div>
                                  </div>
                                ))}
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Earnings breakdown table */}
        <div
          className="rounded-2xl p-6″
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <h2 className="text-sm font-semibold text-gray-300 mb-4″>Earnings Breakdown by Level</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 uppercase tracking-wider">
                  <th className="text-left pb-3 font-medium">Level</th>
                  <th className="text-right pb-3 font-medium">Recruits</th>
                  <th className="text-right pb-3 font-medium">Avg Earnings</th>
                  <th className="text-right pb-3 font-medium">Your Override</th>
                  <th className="text-right pb-3 font-medium">Monthly Income</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5″>
                {LEVEL_EARNINGS.map(({ level, recruits, avg, pct, monthly }) => (
                  <tr key={level}>
                    <td className="py-3″>
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-bold"
                        style={{
                          background: level === "L1″ ? "rgba(20,184,166,0.12)" : level === "L2" ? "rgba(139,92,246,0.12)" : "rgba(59,130,246,0.12)",
                          color: level === "L1″ ? "#14b8a6" : level === "L2" ? "#8b5cf6" : "#3b82f6",
                        }}
                      >
                        {level}
                      </span>
                    </td>
                    <td className="py-3 text-right text-white font-semibold">{recruits}</td>
                    <td className="py-3 text-right text-gray-300″>${avg}/mo</td>
                    <td className="py-3 text-right">
                      <span className="text-yellow-400 font-bold">{pct}%</span>
                    </td>
                    <td className="py-3 text-right text-white font-bold">${monthly}/mo</td>
                  </tr>
                ))}
                <tr style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
                  <td className="pt-4 pb-2 text-white font-bold" colSpan={4}>Total Network Income</td>
                  <td className="pt-4 pb-2 text-right text-yellow-400 font-black text-base">$798/mo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recruit CTA */}
        <div
          className="rounded-2xl p-6″
          style={{ background: "linear-gradient(135deg, rgba(20,184,166,0.12), rgba(20,184,166,0.04))", border: "1px solid rgba(20,184,166,0.3)" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4″>
            <div>
              <p className="text-white font-bold text-base">Recruit More — Earn Passive Income</p>
              <p className="text-sm text-gray-400 mt-1″>
                Each direct recruit earning <span className="text-teal-400 font-semibold">$1,000/mo</span> = <span className="text-teal-400 font-semibold">$70/mo</span> passive income for you — forever.
              </p>
            </div>
            <Link href="/dashboard/founding-network">
              <span
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all hover:opacity-90″
                style={{ background: "#14b8a6″, color: "#0A1628" }}
              >
                Recruit Now <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </div>

        {/* Share link */}
        <div
          className="rounded-2xl p-5″
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">Your Referral Link</p>
          <div className="flex items-center gap-3″>
            <code
              className="flex-1 text-sm text-gray-300 bg-white/5 rounded-lg px-3 py-2 font-mono truncate"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {REFERRAL_LINK}
            </code>
            <CopyButton text={REFERRAL_LINK} />
          </div>
        </div>

      </div>
    </div>
  );
}
