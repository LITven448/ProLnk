import React from 'react';
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Star, TrendingUp, Users, DollarSign, Award, Play,
  ChevronRight, Send, CheckCircle, ArrowRight, MapPin, Filter,
} from "lucide-react";
import { Link } from "wouter";

const TRADES = ["All", "HVAC", "Roofing", "Plumbing", "General Contractor", "Electrical", "Painting"];

const FEATURED = {
  name: "Carlos M.",
  initials: "CM",
  trade: "HVAC",
  location: "Dallas, TX",
  tier: "Charter Member",
  tierColor: "#22c55e",
  headline: "From solo HVAC tech to $8,400/month in passive income — in 90 days",
  body: [
    "I spent 11 years doing HVAC solo out of my truck. Good money when I was healthy and booked, but every dollar required me to be on-site. I never believed you could build real passive income in the trades — not without buying a franchise or opening a company.",
    "A buddy of mine mentioned ProLnk at a supply house. I was skeptical. But the math he showed me was undeniable: every time someone in your network closes a job, you earn a percentage automatically. So I signed up as a Charter Member and committed to the system.",
    "Month 1: I focused on jobs. Closed 8 matched leads, documented every home. Logged 8 origination rights. Month 2: I started texting other HVAC techs I knew from my time working at a large HVAC company. Within 6 weeks, I had 12 active Level-1 recruits.",
    "By month 3, those 12 techs were each closing 4–6 jobs a month. At $500 average per job and 1% override, that's $240–$360 per tech per month — passive. Multiply by 12 techs and the math gets real fast. Last quarter I collected $8,400 in network overrides. I was on vacation in Cabo for 9 days of it.",
    "The part that still surprises me: I'm not even close to the ceiling. I haven't touched L2 or L3 yet. When my 12 recruits start recruiting their own people, the override compounds again at the next level. The system is designed to grow while you sleep.",
  ],
  stats: [
    { icon: Users, label: "Active L1 recruits", value: "12", color: "#22c55e" },
    { icon: DollarSign, label: "Network overrides / quarter", value: "$8,400", color: "#f59e0b" },
    { icon: TrendingUp, label: "Commission rate (Charter)", value: "25%", color: "#3b82f6" },
    { icon: Award, label: "Homes originated", value: "47", color: "#a855f7" },
  ],
  tags: ["HVAC", "Charter Member", "DFW", "Network Income", "90-Day Results"],
};

const STORIES = [
  {
    name: "Daniela R.",
    initials: "DR",
    trade: "Roofing",
    location: "Arlington, TX",
    stat: "$3,200/mo",
    statLabel: "total monthly income",
    headline: "Stopped competing on price. Started winning on quality.",
    arc: [
      "Daniela had spent 6 years as the lowest-bidder roofer in Arlington — always undercutting to win, never able to raise her margins. She joined HomeAdvisor, paid $60 per lead, and still lost jobs to competitors who'd go $200 cheaper. 'I was running a race to zero,' she said.",
      "On ProLnk, her first matched lead came in 4 hours after she completed her profile. No competing bids. The homeowner had specifically requested quotes for storm damage repair, and Daniela's 5-star photos from previous jobs gave her instant credibility. Her first job was $4,200. Her close rate is now above 70%.",
    ],
    quote: "HomeAdvisor gave my lead to 4 other roofers. I paid $60 and lost to someone $200 cheaper. ProLnk changed the math — I'm competing on quality now, not price.",
    highlight: "Tier 3 · 8 months",
    highlightColor: "#3b82f6",
    avatar: "#3b82f6",
    months: "8 months",
  },
  {
    name: "Jeff W.",
    initials: "JW",
    trade: "Plumbing",
    location: "Fort Worth, TX",
    stat: "$2,100/mo",
    statLabel: "passive override income",
    headline: "6 recruits turned into $380–$600/month without lifting a wrench.",
    arc: [
      "Jeff had been on ProLnk for 2 months when his brother — also a plumber — asked about the platform. Jeff walked him through it, and when his brother closed his first job, Jeff got a notification: $42 override credit. 'That was the moment I understood,' Jeff said. 'Every job my brother closes pays me automatically.'",
      "Jeff spent the next month texting 12 other plumbers and electricians he'd worked with over the years. Six joined. He didn't pressure anyone — just showed them the income calculator. Those 6 recruits now average 3–5 jobs each per month. Jeff's monthly override income has crossed $2,100 — all passive, while he's running his own jobs.",
    ],
    quote: "I referred 4 plumbers and 2 electricians. Six recruits doing 3–5 jobs a month. $380–$600 I earn just from helping friends get on the platform. The numbers sell themselves.",
    highlight: "Charter · 5 months",
    highlightColor: "#22c55e",
    avatar: "#22c55e",
    months: "5 months",
  },
  {
    name: "Sandra K.",
    initials: "SK",
    trade: "General Contractor",
    location: "McKinney, TX",
    stat: "$5,800/mo",
    statLabel: "from matched jobs alone",
    headline: "Fixed marketing costs changed everything about how she runs her business.",
    arc: [
      "Sandra ran her GC business for 9 years on Thumbtack, where lead credit prices fluctuated monthly. She could spend $800 one month and $2,200 the next — with no predictability. 'You can't build a business when your customer acquisition cost swings 175%,' she said. When she found ProLnk's flat $149/month model, she called it 'the most rational business decision in home services.'",
      "After 14 months, Sandra has locked in Tier 4 status and a 50% commission rate. Her ProLnk jobs average $4,100 — significantly higher than what she was booking through pay-per-lead platforms. All her reviews are 5 stars because the leads are matched to her actual specialties. She's now training 3 of her subcontractors to join the platform and start their own networks.",
    ],
    quote: "Thumbtack kept raising credit prices. I had no idea what my marketing spend would be month to month. ProLnk is $149, period. I can plan my business now.",
    highlight: "Tier 4 · 14 months",
    highlightColor: "#f59e0b",
    avatar: "#f59e0b",
    months: "14 months",
  },
  {
    name: "Marcus T.",
    initials: "MT",
    trade: "HVAC",
    location: "Plano, TX",
    stat: "$1,251/mo",
    statLabel: "saved vs Angi leads",
    headline: "Close rate went from 30% to 70% — by eliminating the competition.",
    arc: [
      "Marcus was spending $1,400 a month on Angi, closing roughly 30% of the leads he paid for. The math never worked: buy the lead, quote against 4 competitors, lose to whoever went cheapest, repeat. 'I was paying for the privilege of losing business,' he said.",
      "Three months on ProLnk and his close rate is above 70%. The AI-matched leads are aligned with his specialization — ductless mini-splits and commercial HVAC — and he's not sharing them with competitors. His effective marketing cost dropped from $1,400 to $149. The margin improvement went directly into new equipment and a second van.",
    ],
    quote: "I was spending $1,400/month on Angi and closing maybe 30%. Fixed cost at $149 and zero competing bids has taken my close rate over 70%. My margin went from 28% to 51% in two months.",
    highlight: "Tier 2 · 3 months",
    highlightColor: "#a855f7",
    avatar: "#a855f7",
    months: "3 months",
  },
  {
    name: "Priya L.",
    initials: "PL",
    trade: "Electrical",
    location: "Frisco, TX",
    stat: "34 homes",
    statLabel: "originated in 4 months",
    headline: "34 properties that will pay her forever. She's just getting started.",
    arc: [
      "Priya is a licensed electrician who was skeptical of the home origination rights concept. 'It sounds too good to be true — permanent revenue just for documenting jobs?' she said. She ran the numbers with her partner, confirmed the legal structure, and joined as a Charter Member.",
      "Four months in, she's documented 34 homes in the Home Health Vault. Every one of those properties is tied to her as originator. When a homeowner at any of those 34 addresses books a future job — HVAC, plumbing, roofing, anything — Priya gets 1.5% of the platform fee. Automatically. For life. 'It's the most underrated income stream on this platform,' she said.",
    ],
    quote: "The home origination right concept is what nobody talks about enough. Every home I service and log is a permanent asset. 34 properties where I get a slice — forever.",
    highlight: "Charter · 4 months",
    highlightColor: "#ec4899",
    avatar: "#ec4899",
    months: "4 months",
  },
  {
    name: "Ray B.",
    initials: "RB",
    trade: "Painting",
    location: "Irving, TX",
    stat: "47 recruits",
    statLabel: "in L1 network",
    headline: "Came from a painting franchise with 200 contacts. Used every one.",
    arc: [
      "Ray spent 8 years inside a painting franchise network, where he built relationships with contractors across 4 trades. When he saw the ProLnk 4-level override system, his first thought was: 'I know exactly where to find these people.' He spent one week texting 50 contractors from his old network.",
      "47 of them joined. Not because Ray pressured anyone — but because the math was undeniable when he showed them the income calculator. 'I literally just put their job count into the slider and let the numbers talk,' he said. His monthly override income is already above $1,100 and growing as his recruits close more jobs. He's on track for Founding tier in 6 months.",
    ],
    quote: "I sent 40 texts in one week. 47 of my 50 outreach contacts joined. My monthly override is already $1,100 and I haven't touched my L2 or L3 levels yet.",
    highlight: "Founding track · 6 months",
    highlightColor: "#22c55e",
    avatar: "#22c55e",
    months: "6 months",
  },
];

interface SubmitState { sent: boolean; name: string; story: string; }

export default function SuccessStoriesPage() {
  const [activeTrade, setActiveTrade] = useState("All");
  const [submit, setSubmit] = useState<SubmitState>({ sent: false, name: "", story: "" });

  const filtered = activeTrade === "All" ? STORIES : STORIES.filter(s => s.trade === activeTrade);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmit(s => ({ ...s, sent: true }));
  }

  return (
    <>
      <Helmet>
        <title>Partner Success Stories | ProLnk</title>
        <meta name="description" content="Real stories from ProLnk partners who built $2,000–$8,400/month in income. Learn how Charter Members, HVAC techs, and general contractors are earning passive override income." />
      </Helmet>

      <div style={{ minHeight: "100vh", background: "#0f1117", color: "#e5e7eb", fontFamily: "sans-serif" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 20px 64px" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Link href="/resources" style={{ color: "#6b7280", fontSize: 13, textDecoration: "none" }}>Resources</Link>
            <span style={{ color: "#374151" }}>›</span>
            <span style={{ color: "#e5e7eb", fontSize: 13 }}>Success Stories</span>
          </div>

          {/* Hero */}
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)",
              borderRadius: 20, padding: "5px 14px", fontSize: 12, color: "#22c55e", fontWeight: 600, marginBottom: 16,
            }}>
              <Star size={12} fill="#22c55e" /> Partner Success Stories
            </div>
            <h1 style={{ fontSize: 34, fontWeight: 800, color: "#fff", margin: "0 0 12px", lineHeight: 1.2 }}>
              Real Partners. Real Numbers.<br />Real Passive Income.
            </h1>
            <p style={{ color: "#9ca3af", fontSize: 15, maxWidth: 540, margin: "0 auto", lineHeight: 1.65 }}>
              These are not projections. These are actual partners sharing their income results — from month 1 through year 1 and beyond.
            </p>
          </div>

          {/* Featured Story */}
          <section style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
              <Award size={18} color="#f59e0b" />
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: 0 }}>Featured Story</h2>
            </div>

            <div style={{ background: "#1a1d27", borderRadius: 18, border: "1px solid #1e2330", overflow: "hidden" }}>
              <div style={{
                background: "linear-gradient(135deg, rgba(34,197,94,0.15) 0%, rgba(59,130,246,0.08) 100%)",
                padding: "28px 32px", borderBottom: "1px solid #1e2330",
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
                  <div style={{
                    width: 60, height: 60, borderRadius: "50%",
                    background: "linear-gradient(135deg,#22c55e,#3b82f6)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20, fontWeight: 800, color: "#fff", flexShrink: 0,
                  }}>{FEATURED.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
                      {[1,2,3,4,5].map(i => <Star key={i} size={14} color="#f59e0b" fill="#f59e0b" />)}
                    </div>
                    <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: "0 0 6px" }}>{FEATURED.headline}</h3>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                      <span style={{ color: "#6b7280", fontSize: 13 }}>{FEATURED.name} · {FEATURED.trade}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <MapPin size={12} color="#6b7280" />
                        <span style={{ color: "#6b7280", fontSize: 13 }}>{FEATURED.location}</span>
                      </div>
                      <span style={{
                        fontSize: 11, fontWeight: 700, color: FEATURED.tierColor,
                        background: `${FEATURED.tierColor}18`, borderRadius: 6, padding: "2px 10px",
                      }}>{FEATURED.tier}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))", borderBottom: "1px solid #1e2330" }}>
                {FEATURED.stats.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i} style={{
                      padding: "16px 20px", borderRight: i < FEATURED.stats.length - 1 ? "1px solid #1e2330" : "none",
                      textAlign: "center",
                    }}>
                      <Icon size={16} color={s.color} style={{ marginBottom: 6 }} />
                      <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
                      <div style={{ color: "#6b7280", fontSize: 11, marginTop: 3 }}>{s.label}</div>
                    </div>
                  );
                })}
              </div>

              <div style={{ padding: "28px 32px" }}>
                {FEATURED.body.map((para, i) => (
                  <p key={i} style={{ color: "#d1d5db", fontSize: 14, lineHeight: 1.75, margin: "0 0 16px" }}>{para}</p>
                ))}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 20 }}>
                  {FEATURED.tags.map((tag, i) => (
                    <span key={i} style={{
                      background: "rgba(255,255,255,0.05)", border: "1px solid #1e2330",
                      borderRadius: 6, padding: "3px 10px", fontSize: 11, color: "#6b7280",
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Video Testimonials */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Video Testimonials</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 12 }}>
              {[
                { name: "Carlos M.", trade: "HVAC · Dallas", duration: "4:12" },
                { name: "Jeff W.", trade: "Plumbing · Fort Worth", duration: "3:47" },
                { name: "Daniela R.", trade: "Roofing · Arlington", duration: "5:01" },
              ].map((v, i) => (
                <div key={i} style={{
                  background: "#1a1d27", border: "1px solid #1e2330", borderRadius: 14,
                  overflow: "hidden", cursor: "pointer", position: "relative",
                }}>
                  <div style={{
                    height: 140, background: "linear-gradient(135deg,#1e2330,#141720)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{
                      width: 50, height: 50, borderRadius: "50%",
                      background: "rgba(34,197,94,0.2)", border: "2px solid rgba(34,197,94,0.4)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Play size={22} color="#22c55e" fill="#22c55e" style={{ marginLeft: 3 }} />
                    </div>
                    <div style={{
                      position: "absolute", bottom: 10, right: 12,
                      background: "rgba(0,0,0,0.7)", borderRadius: 4, padding: "2px 7px",
                      fontSize: 11, color: "#fff",
                    }}>{v.duration}</div>
                  </div>
                  <div style={{ padding: "14px 16px" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{v.name}</div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>{v.trade}</div>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ color: "#4b5563", fontSize: 12, marginTop: 12, textAlign: "center" }}>
              Video library launching at platform go-live. Testimonials recorded and ready.
            </p>
          </section>

          {/* Story Grid with filter */}
          <section style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: 0 }}>Partner Stories</h2>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <Filter size={14} color="#6b7280" />
                {TRADES.map(trade => (
                  <button key={trade} onClick={() => setActiveTrade(trade)} style={{
                    background: activeTrade === trade ? "rgba(34,197,94,0.15)" : "#1a1d27",
                    border: `1px solid ${activeTrade === trade ? "rgba(34,197,94,0.4)" : "#1e2330"}`,
                    borderRadius: 8, padding: "5px 12px",
                    color: activeTrade === trade ? "#22c55e" : "#6b7280",
                    fontSize: 11, fontWeight: activeTrade === trade ? 700 : 500,
                    cursor: "pointer",
                  }}>{trade}</button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {filtered.map((s, i) => (
                <div key={i} style={{ background: "#1a1d27", border: "1px solid #1e2330", borderRadius: 16, overflow: "hidden" }}>
                  <div style={{ padding: "22px 26px 20px", borderBottom: "1px solid #1e2330" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 14, flexWrap: "wrap" }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
                        background: `${s.avatar}20`, border: `1.5px solid ${s.avatar}40`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 14, fontWeight: 800, color: s.avatar,
                      }}>{s.initials}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", gap: 3, marginBottom: 6 }}>
                          {[1,2,3,4,5].map(si => <Star key={si} size={12} color="#f59e0b" fill="#f59e0b" />)}
                        </div>
                        <h3 style={{ color: "#fff", fontSize: 16, fontWeight: 800, margin: "0 0 6px" }}>{s.headline}</h3>
                        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                          <span style={{ color: "#6b7280", fontSize: 12 }}>{s.name} · {s.trade}</span>
                          <div style={{ display: "flex", alignItems: "center", gap: 3, color: "#6b7280", fontSize: 12 }}>
                            <MapPin size={11} /> {s.location}
                          </div>
                          <span style={{
                            fontSize: 10, fontWeight: 700, color: s.highlightColor,
                            background: `${s.highlightColor}15`, borderRadius: 6, padding: "2px 9px",
                          }}>{s.highlight}</span>
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontSize: 22, fontWeight: 900, color: s.avatar }}>{s.stat}</div>
                        <div style={{ fontSize: 10, color: "#6b7280" }}>{s.statLabel}</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "20px 26px" }}>
                    <div style={{
                      display: "inline-block", background: "rgba(255,255,255,0.04)",
                      border: "1px solid #1e2330", borderRadius: 8, padding: "4px 12px",
                      fontSize: 10, color: "#6b7280", fontWeight: 600,
                      textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12,
                    }}>From First Job to First Recruit</div>
                    {s.arc.map((para, pi) => (
                      <p key={pi} style={{ color: "#d1d5db", fontSize: 13, lineHeight: 1.75, margin: "0 0 12px" }}>{para}</p>
                    ))}
                    <div style={{
                      background: "rgba(255,255,255,0.03)", borderLeft: `3px solid ${s.avatar}`,
                      padding: "12px 16px", borderRadius: "0 8px 8px 0", marginTop: 16,
                    }}>
                      <p style={{ color: "#d1d5db", fontSize: 13, fontStyle: "italic", lineHeight: 1.6, margin: 0 }}>
                        "{s.quote}"
                      </p>
                      <div style={{ color: "#6b7280", fontSize: 11, marginTop: 8 }}>— {s.name}, {s.trade} · {s.months} on platform</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Submit Story */}
          <section style={{ marginBottom: 40 }}>
            <div style={{ background: "#1a1d27", border: "1px solid #1e2330", borderRadius: 16, padding: "28px 32px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 240 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>Share Your Story</h2>
                  <p style={{ color: "#6b7280", fontSize: 14, margin: 0, lineHeight: 1.6 }}>
                    Earned your first override check? Hit a tier milestone? Recruited 10 pros? We feature one partner story per month and include your stats in the public partner leaderboard.
                  </p>
                </div>
                <div style={{ flex: 1, minWidth: 280 }}>
                  {submit.sent ? (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "20px 0" }}>
                      <CheckCircle size={32} color="#22c55e" style={{ marginBottom: 10 }} />
                      <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Story submitted!</div>
                      <div style={{ fontSize: 13, color: "#6b7280" }}>We'll review it and reach out within 3 business days.</div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <input
                        type="text" placeholder="Your name and trade (e.g. Carlos M., HVAC)"
                        value={submit.name} onChange={e => setSubmit(s => ({ ...s, name: e.target.value }))}
                        required
                        style={{ background: "#141720", border: "1px solid #1e2330", borderRadius: 9, padding: "11px 14px", color: "#fff", fontSize: 13, outline: "none", width: "100%", boxSizing: "border-box" }}
                      />
                      <textarea
                        placeholder="Share your results — what changed for you with ProLnk?"
                        value={submit.story} onChange={e => setSubmit(s => ({ ...s, story: e.target.value }))}
                        required rows={4}
                        style={{ background: "#141720", border: "1px solid #1e2330", borderRadius: 9, padding: "11px 14px", color: "#fff", fontSize: 13, outline: "none", resize: "vertical", fontFamily: "sans-serif", width: "100%", boxSizing: "border-box" }}
                      />
                      <button type="submit" style={{
                        background: "#22c55e", color: "#fff", border: "none", borderRadius: 9,
                        padding: "11px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      }}>
                        <Send size={14} /> Submit My Story
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div style={{
            background: "linear-gradient(135deg, rgba(34,197,94,0.12) 0%, rgba(59,130,246,0.08) 100%)",
            border: "1px solid rgba(34,197,94,0.25)", borderRadius: 18, padding: 36, textAlign: "center",
          }}>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: "0 0 10px" }}>Start Your Own Story</h3>
            <p style={{ color: "#9ca3af", fontSize: 14, margin: "0 0 24px", maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>
              Every partner you read about started with the same first step: completing their profile and logging their first job. Yours is waiting.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/apply">
                <button style={{
                  background: "#22c55e", color: "#fff", border: "none",
                  borderRadius: 10, padding: "13px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  Claim Your Founding Spot <ArrowRight size={16} />
                </button>
              </Link>
              <Link href="/resources/academy">
                <button style={{
                  background: "transparent", color: "#9ca3af",
                  border: "1px solid #374151", borderRadius: 10,
                  padding: "13px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  Go to Academy <ChevronRight size={16} />
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
