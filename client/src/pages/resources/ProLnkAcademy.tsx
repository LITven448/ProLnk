import React from 'react';
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  BookOpen, Users, Zap, Award, TrendingUp, ChevronRight,
  CheckCircle, Lock, Play, Clock, Star, ArrowRight,
} from "lucide-react";
import { Link } from "wouter";

interface Lesson {
  title: string;
  duration: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessonCount: number;
  color: string;
  accent: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  lessons: Lesson[];
  badge: string;
}

const MODULES: Module[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Set up your profile for maximum match volume. Learn the fundamentals of how ProLnk's matching algorithm works and how to position yourself for early wins.",
    duration: "45 min",
    lessonCount: 6,
    color: "#22c55e",
    accent: "rgba(34,197,94,0.1)",
    icon: Play,
    badge: "Foundation",
    lessons: [
      { title: "How ProLnk Works: The Match System Explained", duration: "8 min" },
      { title: "Profile Setup for Maximum Visibility", duration: "7 min" },
      { title: "Setting Your Service Area and Trade Categories", duration: "6 min" },
      { title: "Uploading Work Photos (Before/After Strategy)", duration: "8 min" },
      { title: "Responding to Leads: The 15-Minute Rule", duration: "9 min" },
      { title: "Logging Your First Job and Starting Your Vault", duration: "7 min" },
    ],
  },
  {
    id: "building-network",
    title: "Building Your Network",
    description: "Understand the 4-level override system and learn proven strategies for recruiting trade colleagues, former coworkers, and supply house contacts.",
    duration: "55 min",
    lessonCount: 7,
    color: "#3b82f6",
    accent: "rgba(59,130,246,0.1)",
    icon: Users,
    badge: "Network Growth",
    lessons: [
      { title: "The 5-Stream Income System — Full Walkthrough", duration: "10 min" },
      { title: "How the 4-Level Override Cascade Works", duration: "8 min" },
      { title: "The Recruiting Script That Converts (verbatim)", duration: "7 min" },
      { title: "Where to Find Recruits: Supply Houses, FB Groups, Trade Shows", duration: "9 min" },
      { title: "Coaching Your L1 Network to Recruit Their Own L1s", duration: "8 min" },
      { title: "Tracking Your Network with the Network Tree", duration: "7 min" },
      { title: "Reaching Charter Tier: The 25-Recruit Sprint", duration: "6 min" },
    ],
  },
  {
    id: "maximizing-jobs",
    title: "Maximizing Job Volume",
    description: "Techniques to increase your lead acceptance rate, conversion rate, and average job value — the three levers that directly multiply your direct commissions.",
    duration: "50 min",
    lessonCount: 6,
    color: "#f59e0b",
    accent: "rgba(245,158,11,0.1)",
    icon: TrendingUp,
    badge: "Revenue Growth",
    lessons: [
      { title: "Reading Incoming Leads: What the AI Score Means", duration: "8 min" },
      { title: "The 3-Tier Quote Framework (Good/Better/Best)", duration: "9 min" },
      { title: "Upselling Maintenance Agreements on Every Job", duration: "8 min" },
      { title: "Review Collection System That Gets 5 Stars", duration: "7 min" },
      { title: "Expanding Your Service Area Strategically", duration: "9 min" },
      { title: "Advancing Tiers: Commission Rate Math That Matters", duration: "9 min" },
    ],
  },
  {
    id: "trustypro",
    title: "TrustyPro for Pros",
    description: "TrustyPro is your second income channel — a direct-to-homeowner platform where your verified profile and work history generate inbound requests independently.",
    duration: "35 min",
    lessonCount: 5,
    color: "#a855f7",
    accent: "rgba(168,85,247,0.1)",
    icon: Star,
    badge: "Platform Mastery",
    lessons: [
      { title: "What TrustyPro Is and How It Differs from ProLnk", duration: "7 min" },
      { title: "Building Your TrustyPro Profile from Scratch", duration: "8 min" },
      { title: "Home Health Vault: Documenting Homes for Origination Rights", duration: "7 min" },
      { title: "Before/After Photo Strategy for TrustyPro Visibility", duration: "7 min" },
      { title: "The Project Gallery: Your Living Portfolio", duration: "6 min" },
    ],
  },
  {
    id: "advanced-network",
    title: "Advanced Network Strategies",
    description: "Advanced techniques for high-volume network operators. Covers building a regional team, managing L2 and L3 networks, and projecting passive income milestones.",
    duration: "60 min",
    lessonCount: 7,
    color: "#ec4899",
    accent: "rgba(236,72,153,0.1)",
    icon: Zap,
    badge: "Advanced",
    lessons: [
      { title: "Passive Income Math: Modeling Your 12-Month Projection", duration: "10 min" },
      { title: "Building a Regional Pro Group Around Your L1 Network", duration: "9 min" },
      { title: "The Monthly Network Call Playbook", duration: "8 min" },
      { title: "Identifying and Activating Inactive Recruits", duration: "8 min" },
      { title: "Reaching Founding Tier: The 100-Recruit System", duration: "9 min" },
      { title: "Home Origination at Scale: Vault Strategy for 100+ Homes", duration: "8 min" },
      { title: "Year 2 and Beyond: Maintaining and Growing Passive Income", duration: "8 min" },
    ],
  },
];

const FEATURED_ARTICLE = {
  title: "How to Earn $2,000/mo in Passive Override Income",
  readTime: "8 min read",
  preview: "The math is simple once you see it. 100 active L1 recruits completing 4 jobs per month at an average of $500 per job. That's $200,000 in platform volume flowing through your L1 network. At 1% override rate, that's $2,000 per month — automatically, while you're on job sites or asleep.",
  stats: [
    { label: "Required L1 recruits", value: "100" },
    { label: "Avg jobs/mo each", value: "4" },
    { label: "Monthly network volume", value: "$200K" },
    { label: "Your 1% override", value: "$2,000/mo" },
  ],
  steps: [
    "Recruit 10 colleagues in Month 1 (use the script in Module 2)",
    "Coach each to recruit 2 of their own in Month 2",
    "By Month 4: 30–40 active L1 recruits, ~$600/mo passive",
    "Continue compounding: each L1 recruit who recruits multiplies your base",
    "At 100 L1 recruits: Founding tier activates, override rate doubles to 4%",
    "At Founding tier + 100 L1 recruits: $8,000+/mo in L1 overrides alone",
  ],
};

const STORAGE_KEY = "prolnk_academy_progress";

function getProgress(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function setProgress(progress: Record<string, boolean>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function ModuleCard({ mod, onToggleComplete }: { mod: Module; onToggleComplete: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [progress, setProgressState] = useState(() => getProgress());
  const completed = !!progress[mod.id];

  const Icon = mod.icon;

  function handleComplete() {
    const updated = { ...progress, [mod.id]: !completed };
    setProgressState(updated);
    setProgress(updated);
    onToggleComplete(mod.id);
  }

  return (
    <div style={{
      background: "#1a1d27",
      border: `1px solid ${completed ? mod.color + "50" : "#1e2330"}`,
      borderRadius: 16,
      overflow: "hidden",
      transition: "border-color 0.2s",
    }}>
      <div style={{ padding: "22px 24px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
            background: completed ? mod.color : mod.accent,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {completed
              ? <CheckCircle size={22} color="#fff" />
              : <Icon size={22} color={mod.color} />
            }
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, color: mod.color,
                    background: mod.accent, borderRadius: 6,
                    padding: "2px 8px", letterSpacing: "0.04em",
                  }}>
                    {mod.badge}
                  </span>
                  {completed && (
                    <span style={{ fontSize: 10, fontWeight: 600, color: "#22c55e", background: "rgba(34,197,94,0.1)", borderRadius: 6, padding: "2px 8px" }}>
                      Completed
                    </span>
                  )}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#fff", margin: 0 }}>{mod.title}</h3>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
                <span style={{ color: "#6b7280", fontSize: 12 }}>{mod.lessonCount} lessons · {mod.duration}</span>
              </div>
            </div>

            <p style={{ color: "#9ca3af", fontSize: 13, margin: "8px 0 14px", lineHeight: 1.6 }}>
              {mod.description}
            </p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                onClick={handleComplete}
                style={{
                  padding: "9px 18px", borderRadius: 9,
                  background: completed ? "rgba(34,197,94,0.1)" : mod.color,
                  color: completed ? "#22c55e" : "#fff",
                  border: completed ? "1px solid rgba(34,197,94,0.3)" : "none",
                  fontWeight: 700, fontSize: 13, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 6,
                }}
              >
                {completed ? <><CheckCircle size={14} /> Completed</> : <><Play size={14} /> Start Module</>}
              </button>
              <button
                onClick={() => setExpanded(e => !e)}
                style={{
                  padding: "9px 18px", borderRadius: 9,
                  background: "transparent", color: "#6b7280",
                  border: "1px solid #1e2330", fontWeight: 600,
                  fontSize: 13, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 6,
                }}
              >
                {expanded ? "Hide lessons" : "View lessons"}
                <ChevronRight size={14} style={{ transform: expanded ? "rotate(90deg)" : "none", transition: "transform 0.15s" }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {expanded && (
        <div style={{ borderTop: "1px solid #1e2330", padding: "16px 24px 20px" }}>
          {mod.lessons.map((lesson, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "10px 0",
              borderBottom: i < mod.lessons.length - 1 ? "1px solid #1e2330" : "none",
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: "rgba(255,255,255,0.04)", border: "1px solid #1e2330",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, fontSize: 11, color: "#4b5563", fontWeight: 600,
              }}>
                {i + 1}
              </div>
              <span style={{ flex: 1, fontSize: 13, color: "#d1d5db" }}>{lesson.title}</span>
              <span style={{ fontSize: 11, color: "#4b5563", flexShrink: 0, display: "flex", alignItems: "center", gap: 4 }}>
                <Clock size={11} /> {lesson.duration}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProLnkAcademy() {
  const [progress, setProgressState] = useState(() => getProgress());

  const completedCount = MODULES.filter(m => !!progress[m.id]).length;
  const allComplete = completedCount === MODULES.length;
  const progressPct = Math.round((completedCount / MODULES.length) * 100);

  function handleToggle() {
    setProgressState(getProgress());
  }

  const totalDuration = "3 hrs 45 min";
  const totalLessons = MODULES.reduce((sum, m) => sum + m.lessonCount, 0);

  return (
    <>
      <Helmet>
        <title>ProLnk Academy | Partner Training Hub</title>
        <meta name="description" content="The complete ProLnk partner training hub. Master the matching system, build your network, and unlock all 5 income streams with structured modules and certifications." />
      </Helmet>

      <div style={{ minHeight: "100vh", background: "#0f1117", color: "#e5e7eb", fontFamily: "sans-serif" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 20px 64px" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Link href="/resources" style={{ color: "#6b7280", fontSize: 13, textDecoration: "none" }}>Resources</Link>
            <span style={{ color: "#374151" }}>›</span>
            <span style={{ color: "#e5e7eb", fontSize: 13 }}>Academy</span>
          </div>

          {/* Hero */}
          <div style={{ marginBottom: 36 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)",
              borderRadius: 20, padding: "5px 14px", fontSize: 12, color: "#22c55e",
              fontWeight: 600, marginBottom: 16,
            }}>
              <BookOpen size={12} /> ProLnk Academy
            </div>
            <h1 style={{ fontSize: 34, fontWeight: 800, color: "#fff", margin: "0 0 12px", lineHeight: 1.2 }}>
              Everything You Need to<br />Master ProLnk
            </h1>
            <p style={{ color: "#9ca3af", fontSize: 15, margin: "0 0 20px", maxWidth: 560, lineHeight: 1.65 }}>
              {totalLessons} lessons · {totalDuration} · Self-paced · Earn your Partner Certification when you complete all modules
            </p>

            {/* Progress bar */}
            <div style={{ background: "#1a1d27", borderRadius: 12, border: "1px solid #1e2330", padding: "16px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ color: "#d1d5db", fontSize: 13, fontWeight: 600 }}>
                  {allComplete ? "All modules complete — you're certified!" : `${completedCount} of ${MODULES.length} modules completed`}
                </span>
                <span style={{ color: "#22c55e", fontSize: 13, fontWeight: 700 }}>{progressPct}%</span>
              </div>
              <div style={{ height: 8, background: "#1e2330", borderRadius: 4, overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: 4,
                  width: `${progressPct}%`,
                  background: allComplete
                    ? "linear-gradient(90deg,#22c55e,#3b82f6)"
                    : "#22c55e",
                  transition: "width 0.4s",
                }} />
              </div>
              {allComplete && (
                <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
                  <Award size={20} color="#f59e0b" />
                  <span style={{ color: "#f59e0b", fontWeight: 700, fontSize: 14 }}>
                    ProLnk Partner Certification Unlocked
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Modules */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 48 }}>
            {MODULES.map(mod => (
              <ModuleCard key={mod.id} mod={mod} onToggleComplete={handleToggle} />
            ))}
          </div>

          {/* Certification Badge */}
          {allComplete && (
            <div style={{
              background: "linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(234,179,8,0.08) 100%)",
              border: "1px solid rgba(245,158,11,0.4)",
              borderRadius: 18, padding: 36, textAlign: "center", marginBottom: 40,
            }}>
              <Award size={48} color="#f59e0b" style={{ marginBottom: 12 }} />
              <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>
                ProLnk Partner Certification
              </h2>
              <p style={{ color: "#9ca3af", fontSize: 14, margin: "0 0 20px" }}>
                You've completed all 5 academy modules. Your partner profile now displays the Certified badge, increasing homeowner trust and match priority.
              </p>
              <button style={{
                background: "#f59e0b", color: "#0f1117",
                border: "none", borderRadius: 10, padding: "13px 28px",
                fontSize: 14, fontWeight: 700, cursor: "pointer",
              }}>
                Download Your Certificate
              </button>
            </div>
          )}

          {/* Featured Article */}
          <section style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <Star size={16} color="#f59e0b" fill="#f59e0b" />
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: 0 }}>Featured Article</h2>
            </div>

            <div style={{ background: "#1a1d27", border: "1px solid #1e2330", borderRadius: 16, overflow: "hidden" }}>
              <div style={{
                background: "linear-gradient(135deg, rgba(34,197,94,0.15) 0%, rgba(59,130,246,0.08) 100%)",
                padding: "24px 28px",
                borderBottom: "1px solid #1e2330",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                  <Clock size={13} color="#6b7280" />
                  <span style={{ color: "#6b7280", fontSize: 12 }}>{FEATURED_ARTICLE.readTime}</span>
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: "0 0 12px" }}>
                  {FEATURED_ARTICLE.title}
                </h3>
                <p style={{ color: "#9ca3af", fontSize: 14, margin: 0, lineHeight: 1.65 }}>
                  {FEATURED_ARTICLE.preview}
                </p>
              </div>

              <div style={{ padding: "24px 28px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))", gap: 12, marginBottom: 24 }}>
                  {FEATURED_ARTICLE.stats.map((s, i) => (
                    <div key={i} style={{ background: "#141720", borderRadius: 10, border: "1px solid #1e2330", padding: "12px 16px" }}>
                      <div style={{ color: "#6b7280", fontSize: 11, marginBottom: 4 }}>{s.label}</div>
                      <div style={{ fontSize: 20, fontWeight: 800, color: "#22c55e" }}>{s.value}</div>
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ color: "#6b7280", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
                    How to Get There in 12 Months
                  </div>
                  {FEATURED_ARTICLE.steps.map((step, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                      <CheckCircle size={16} color="#22c55e" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ color: "#d1d5db", fontSize: 13, lineHeight: 1.55 }}>{step}</span>
                    </div>
                  ))}
                </div>

                <Link href="/resources/maximize-earnings">
                  <button style={{
                    background: "transparent", color: "#22c55e",
                    border: "1px solid rgba(34,197,94,0.3)", borderRadius: 10,
                    padding: "10px 20px", fontSize: 13, fontWeight: 600,
                    cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                  }}>
                    Read the Full Earnings Playbook <ArrowRight size={14} />
                  </button>
                </Link>
              </div>
            </div>
          </section>

          {/* Quick Links */}
          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Continue Learning</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 12 }}>
              {[
                { label: "Earnings Playbook", href: "/resources/maximize-earnings", desc: "Week 1 to Year 1 milestones", color: "#22c55e" },
                { label: "Success Stories", href: "/resources/success-stories", desc: "How top partners built their income", color: "#3b82f6" },
                { label: "Competitive Advantage", href: "/resources/competitive", desc: "Why ProLnk beats Angi and HomeAdvisor", color: "#a855f7" },
                { label: "Partner FAQ", href: "/resources/faq", desc: "Answers to the most common questions", color: "#f59e0b" },
              ].map((link, i) => (
                <Link key={i} href={link.href}>
                  <div style={{
                    background: "#1a1d27", borderRadius: 12, border: "1px solid #1e2330",
                    padding: 18, cursor: "pointer", transition: "border-color 0.15s",
                    display: "flex", alignItems: "center", gap: 14,
                  }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: link.color, flexShrink: 0,
                    }} />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{link.label}</div>
                      <div style={{ fontSize: 12, color: "#6b7280" }}>{link.desc}</div>
                    </div>
                    <ChevronRight size={14} color="#374151" style={{ marginLeft: "auto", flexShrink: 0 }} />
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
