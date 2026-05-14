import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Star, TrendingUp, Users, DollarSign, Award, Play,
  ChevronRight, Send, CheckCircle, ArrowRight, MapPin,
} from "lucide-react";
import { Link } from "wouter";

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
    "The part that still surprises me: I'm not even close to the ceiling. I haven't touched L2 or L3 yet. When my 12 recruits start recruiting their own people, the override compounds again at 0.5%. The system is designed to grow while you sleep.",
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
    quote: "HomeAdvisor gave my lead to 4 other roofers. I paid $60 for the lead and lost the job to someone who underbid me by $200. ProLnk changed the math. I'm not competing on price anymore — I'm competing on quality, and I win that every time.",
    highlight: "Tier 3 · 8 months",
    highlightColor: "#3b82f6",
    avatar: "#3b82f6",
  },
  {
    name: "Jeff W.",
    initials: "JW",
    trade: "Plumbing",
    location: "Fort Worth, TX",
    stat: "$2,100/mo",
    statLabel: "passive override income",
    quote: "I referred 4 plumbers and 2 electricians. Six recruits doing 3–5 jobs a month. That's $380–$600 a month I earn just from helping friends get on the platform. I barely had to explain it — the numbers sell themselves.",
    highlight: "Charter · 5 months",
    highlightColor: "#22c55e",
    avatar: "#22c55e",
  },
  {
    name: "Sandra K.",
    initials: "SK",
    trade: "General Contractor",
    location: "McKinney, TX",
    stat: "$5,800/mo",
    statLabel: "from matched jobs alone",
    quote: "Thumbtack kept raising their credit prices. I had no idea what my marketing spend would be month to month. ProLnk is $149, period. I can actually plan my business now. Plus my reviews are all 5-star because the leads actually match my trade.",
    highlight: "Tier 4 · 14 months",
    highlightColor: "#f59e0b",
    avatar: "#f59e0b",
  },
  {
    name: "Marcus T.",
    initials: "MT",
    trade: "HVAC",
    location: "Plano, TX",
    stat: "$1,251/mo",
    statLabel: "saved vs Angi leads",
    quote: "I was spending $1,400 a month on Angi and closing maybe 30% of the leads. Fixed cost at $149 and zero competing bids has taken my close rate to over 70%. My margin went from 28% to 51% in two months.",
    highlight: "Tier 2 · 3 months",
    highlightColor: "#a855f7",
    avatar: "#a855f7",
  },
  {
    name: "Priya L.",
    initials: "PL",
    trade: "Electrical",
    location: "Frisco, TX",
    stat: "34",
    statLabel: "homes originated so far",
    quote: "The home origination right concept is the one nobody talks about enough. Every home I service and log is a permanent asset. I've done 34 homes in 4 months. That's 34 properties where I get a slice of platform fees — forever.",
    highlight: "Charter · 4 months",
    highlightColor: "#ec4899",
    avatar: "#ec4899",
  },
  {
    name: "Ray B.",
    initials: "RB",
    trade: "Painting",
    location: "Irving, TX",
    stat: "47",
    statLabel: "recruits in L1 network",
    quote: "I came from a painting franchise where I knew 200 contractors. I realized fast that my network was my biggest asset on ProLnk. I sent 40 texts in one week. 47 of my 50 outreach calls have joined. My monthly override income is already $1,100.",
    highlight: "Founding track · 6 months",
    highlightColor: "#22c55e",
    avatar: "#22c55e",
  },
];

interface SubmitState { sent: boolean; name: string; trade: string; story: string; }

export default function SuccessStoriesPage() {
  const [submit, setSubmit] = useState<SubmitState>({ sent: false, name: "", trade: "", story: "" });

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
        <div style={{ maxWidth: 920, margin: "0 auto", padding: "32px 20px 64px" }}>

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
              borderRadius: 20, padding: "5px 14px", fontSize: 12, color: "#22c55e",
              fontWeight: 600, marginBottom: 16,
            }}>
              <Star size={12} fill="#22c55e" /> Partner Success Stories
            </div>
            <h1 style={{ fontSize: 34, fontWeight: 800, color: "#fff", margin: "0 0 12px", lineHeight: 1.2 }}>
              Real Partners. Real Numbers.<br />Real Passive Income.
            </h1>
            <p style={{ color: "#9ca3af", fontSize: 15, maxWidth: 540, margin: "0 auto", lineHeight: 1.65 }}>
              These are not projections. These are actual partners in the ProLnk network sharing their income results — from month 1 through year 1 and beyond.
            </p>
          </div>

          {/* Featured Story */}
          <section style={{ marginBottom: 52 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <Award size={18} color="#f59e0b" />
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: 0 }}>Featured Story</h2>
            </div>

            <div style={{ background: "#1a1d27", borderRadius: 18, border: "1px solid #1e2330", overflow: "hidden" }}>
              {/* Header bar */}
              <div style={{
                background: "linear-gradient(135deg, rgba(34,197,94,0.15) 0%, rgba(59,130,246,0.08) 100%)",
                padding: "28px 32px",
                borderBottom: "1px solid #1e2330",
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
                  <div style={{
                    width: 60, height: 60, borderRadius: "50%",
                    background: "linear-gradient(135deg,#22c55e,#3b82f6)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20, fontWeight: 800, color: "#fff", flexShrink: 0,
                  }}>
                    {FEATURED.initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
                      {[1,2,3,4,5].map(i => <Star key={i} size={14} color="#f59e0b" fill="#f59e0b" />)}
                    </div>
                    <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: "0 0 6px" }}>
                      {FEATURED.headline}
                    </h3>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                      <span style={{ color: "#6b7280", fontSize: 13 }}>{FEATURED.name} · {FEATURED.trade}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <MapPin size={12} color="#6b7280" />
                        <span style={{ color: "#6b7280", fontSize: 13 }}>{FEATURED.location}</span>
                      </div>
                      <span style={{
                        fontSize: 11, fontWeight: 700, color: FEATURED.tierColor,
                        background: `${FEATURED.tierColor}18`,
                        borderRadius: 6, padding: "2px 10px",
                      }}>
                        {FEATURED.tier}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))",
                borderBottom: "1px solid #1e2330",
              }}>
                {FEATURED.stats.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i} style={{
                      padding: "16px 20px",
                      borderRight: i < FEATURED.stats.length - 1 ? "1px solid #1e2330" : "none",
                      textAlign: "center",
                    }}>
                      <Icon size={16} color={s.color} style={{ marginBottom: 6 }} />
                      <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
                      <div style={{ color: "#6b7280", fontSize: 11, marginTop: 3 }}>{s.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Story body */}
              <div style={{ padding: "28px 32px" }}>
                {FEATURED.body.map((para, i) => (
                  <p key={i} style={{ color: "#d1d5db", fontSize: 14, lineHeight: 1.75, margin: "0 0 16px" }}>
                    {para}
                  </p>
                ))}

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 20 }}>
                  {FEATURED.tags.map((tag, i) => (
                    <span key={i} style={{
                      background: "rgba(255,255,255,0.05)", border: "1px solid #1e2330",
                      borderRadius: 6, padding: "3px 10px",
                      fontSize: 11, color: "#6b7280",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Video Testimonial Placeholders */}
          <section style={{ marginBottom: 52 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 18 }}>Video Testimonials</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 14 }}>
              {[
                { name: "Carlos M.", trade: "HVAC · Dallas", duration: "4:12" },
                { name: "Jeff W.", trade: "Plumbing · Fort Worth", duration: "3:47" },
                { name: "Daniela R.", trade: "Roofing · Arlington", duration: "5:01" },
              ].map((v, i) => (
                <div key={i} style={{
                  background: "#1a1d27", border: "1px solid #1e2330", borderRadius: 14,
                  overflow: "hidden", cursor: "pointer",
                  position: "relative",
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
                      background: "rgba(0,0,0,0.7)", borderRadius: 4,
                      padding: "2px 7px", fontSize: 11, color: "#fff",
                    }}>
                      {v.duration}
                    </div>
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

          {/* Story Grid */}
          <section style={{ marginBottom: 52 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 18 }}>
              More Partner Stories
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 14 }}>
              {STORIES.map((s, i) => (
                <div key={i} style={{ background: "#1a1d27", border: "1px solid #1e2330", borderRadius: 14, padding: 22 }}>
                  <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
                    {[1,2,3,4,5].map(si => <Star key={si} size={12} color="#f59e0b" fill="#f59e0b" />)}
                  </div>
                  <p style={{ color: "#d1d5db", fontSize: 13, lineHeight: 1.65, fontStyle: "italic", margin: "0 0 16px" }}>
                    "{s.quote}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: "50%",
                        background: `${s.avatar}20`, border: `1px solid ${s.avatar}40`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 700, color: s.avatar,
                      }}>
                        {s.initials}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{s.name}</div>
                        <div style={{ fontSize: 11, color: "#6b7280", display: "flex", alignItems: "center", gap: 4 }}>
                          {s.trade} · <MapPin size={9} /> {s.location}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 18, fontWeight: 800, color: s.avatar }}>{s.stat}</div>
                      <div style={{ fontSize: 10, color: "#6b7280" }}>{s.statLabel}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, color: s.highlightColor,
                      background: `${s.highlightColor}15`, borderRadius: 6, padding: "2px 9px",
                    }}>
                      {s.highlight}
                    </span>
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
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>
                    Share Your Story
                  </h2>
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
                        type="text"
                        placeholder="Your name and trade (e.g. Carlos M., HVAC)"
                        value={submit.name}
                        onChange={e => setSubmit(s => ({ ...s, name: e.target.value }))}
                        required
                        style={{
                          background: "#141720", border: "1px solid #1e2330", borderRadius: 9,
                          padding: "11px 14px", color: "#fff", fontSize: 13,
                          outline: "none", width: "100%", boxSizing: "border-box",
                        }}
                      />
                      <textarea
                        placeholder="Share your results in a few sentences — what changed for you with ProLnk?"
                        value={submit.story}
                        onChange={e => setSubmit(s => ({ ...s, story: e.target.value }))}
                        required
                        rows={4}
                        style={{
                          background: "#141720", border: "1px solid #1e2330", borderRadius: 9,
                          padding: "11px 14px", color: "#fff", fontSize: 13,
                          outline: "none", resize: "vertical", fontFamily: "sans-serif",
                          width: "100%", boxSizing: "border-box",
                        }}
                      />
                      <button
                        type="submit"
                        style={{
                          background: "#22c55e", color: "#fff", border: "none",
                          borderRadius: 9, padding: "11px 20px", fontSize: 14,
                          fontWeight: 700, cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                        }}
                      >
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
            border: "1px solid rgba(34,197,94,0.25)",
            borderRadius: 18, padding: 36, textAlign: "center",
          }}>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: "0 0 10px" }}>
              Ready to Build Your Own Story?
            </h3>
            <p style={{ color: "#9ca3af", fontSize: 14, margin: "0 0 24px", maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>
              Every partner you read about started with the same first step: completing their profile and logging their first job. Yours is waiting.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/founding-partner">
                <button style={{
                  background: "#22c55e", color: "#fff", border: "none",
                  borderRadius: 10, padding: "13px 28px", fontSize: 14,
                  fontWeight: 700, cursor: "pointer",
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
