import React from 'react';
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  BookOpen, Users, Zap, Award, TrendingUp, ChevronRight,
  CheckCircle, Play, Clock, Star, ArrowRight, Radio,
  Calendar, Trophy, BarChart2, Video, FileText, HelpCircle,
} from "lucide-react";
import { Link } from "wouter";

interface Lesson { title: string; duration: string; format: "video" | "article" | "quiz"; xp: number; }
interface Module {
  id: string; title: string; description: string; duration: string;
  lessonCount: number; color: string; accent: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  lessons: Lesson[]; badge: string; track: string; xpTotal: number;
}

const FORMAT_ICON = { video: Video, article: FileText, quiz: HelpCircle };
const FORMAT_COLOR = { video: "#3B82F6", article: "#22C55E", quiz: "#A855F7" };

const MODULES: Module[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Set up your profile for maximum match volume. Learn the fundamentals of how ProLnk's matching algorithm works and how to position yourself for early wins.",
    duration: "45 min", lessonCount: 6, color: "#22c55e", accent: "rgba(34,197,94,0.1)",
    icon: Play, badge: "Foundation", track: "Getting Started", xpTotal: 360,
    lessons: [
      { title: "How ProLnk Works: The Match System Explained", duration: "8 min", format: "video", xp: 60 },
      { title: "Profile Setup for Maximum Visibility", duration: "7 min", format: "video", xp: 60 },
      { title: "Setting Your Service Area and Trade Categories", duration: "6 min", format: "article", xp: 50 },
      { title: "Uploading Work Photos (Before/After Strategy)", duration: "8 min", format: "video", xp: 70 },
      { title: "Responding to Leads: The 15-Minute Rule", duration: "9 min", format: "article", xp: 60 },
      { title: "Module 1 Quiz", duration: "7 min", format: "quiz", xp: 60 },
    ],
  },
  {
    id: "building-network",
    title: "Building Your Network",
    description: "Understand the 4-level override system and learn proven strategies for recruiting trade colleagues, former coworkers, and supply house contacts.",
    duration: "55 min", lessonCount: 7, color: "#3b82f6", accent: "rgba(59,130,246,0.1)",
    icon: Users, badge: "Network Growth", track: "Network Building", xpTotal: 490,
    lessons: [
      { title: "The 5-Stream Income System — Full Walkthrough", duration: "10 min", format: "video", xp: 80 },
      { title: "How the 4-Level Override Cascade Works", duration: "8 min", format: "video", xp: 70 },
      { title: "The Recruiting Script That Converts (verbatim)", duration: "7 min", format: "article", xp: 65 },
      { title: "Where to Find Recruits: Supply Houses, FB Groups, Trade Shows", duration: "9 min", format: "video", xp: 75 },
      { title: "Coaching Your L1 Network to Recruit Their Own L1s", duration: "8 min", format: "article", xp: 65 },
      { title: "Tracking Your Network with the Network Tree", duration: "7 min", format: "video", xp: 60 },
      { title: "Network Module Quiz", duration: "6 min", format: "quiz", xp: 75 },
    ],
  },
  {
    id: "maximizing-jobs",
    title: "Maximizing Job Volume",
    description: "Techniques to increase your lead acceptance rate, conversion rate, and average job value — the three levers that directly multiply your direct commissions.",
    duration: "50 min", lessonCount: 6, color: "#f59e0b", accent: "rgba(245,158,11,0.1)",
    icon: TrendingUp, badge: "Revenue Growth", track: "Advanced Earnings", xpTotal: 410,
    lessons: [
      { title: "Reading Incoming Leads: What the AI Score Means", duration: "8 min", format: "video", xp: 70 },
      { title: "The 3-Tier Quote Framework (Good/Better/Best)", duration: "9 min", format: "article", xp: 75 },
      { title: "Upselling Maintenance Agreements on Every Job", duration: "8 min", format: "video", xp: 70 },
      { title: "Review Collection System That Gets 5 Stars", duration: "7 min", format: "article", xp: 60 },
      { title: "Expanding Your Service Area Strategically", duration: "9 min", format: "video", xp: 70 },
      { title: "Job Volume Module Quiz", duration: "9 min", format: "quiz", xp: 65 },
    ],
  },
  {
    id: "trustypro",
    title: "TrustyPro for Pros",
    description: "TrustyPro is your second income channel — a direct-to-homeowner platform where your verified profile and work history generate inbound requests independently.",
    duration: "35 min", lessonCount: 5, color: "#a855f7", accent: "rgba(168,85,247,0.1)",
    icon: Star, badge: "Platform Mastery", track: "Getting Started", xpTotal: 330,
    lessons: [
      { title: "What TrustyPro Is and How It Differs from ProLnk", duration: "7 min", format: "video", xp: 65 },
      { title: "Building Your TrustyPro Profile from Scratch", duration: "8 min", format: "article", xp: 70 },
      { title: "Home Health Vault: Documenting Homes for Origination Rights", duration: "7 min", format: "video", xp: 70 },
      { title: "Before/After Photo Strategy for TrustyPro Visibility", duration: "7 min", format: "video", xp: 65 },
      { title: "TrustyPro Module Quiz", duration: "6 min", format: "quiz", xp: 60 },
    ],
  },
  {
    id: "subscription-and-leads",
    title: "Subscription Override & Lead Fees",
    description: "Deep dive into Streams 3 and 4 — how subscription override compounds monthly and how to generate per-lead homeowner fees systematically.",
    duration: "40 min", lessonCount: 5, color: "#22c55e", accent: "rgba(34,197,94,0.1)",
    icon: BarChart2, badge: "Passive Income", track: "Advanced Earnings", xpTotal: 350,
    lessons: [
      { title: "How Subscription Override Compounds Over 12 Months", duration: "8 min", format: "video", xp: 75 },
      { title: "Sourcing Homeowners for Per-Lead Fees", duration: "7 min", format: "article", xp: 65 },
      { title: "What Makes a Homeowner 'Qualify' for Your Fee", duration: "6 min", format: "article", xp: 60 },
      { title: "Tracking Your Recurring Income Dashboard", duration: "9 min", format: "video", xp: 75 },
      { title: "Streams 3 & 4 Quiz", duration: "10 min", format: "quiz", xp: 75 },
    ],
  },
  {
    id: "home-origination",
    title: "Home Origination Rights",
    description: "Stream 5: The permanent income engine. Every home you originate pays you forever. Learn how to log homes efficiently and build a 100-home portfolio.",
    duration: "45 min", lessonCount: 6, color: "#ec4899", accent: "rgba(236,72,153,0.1)",
    icon: Zap, badge: "Permanent Income", track: "Advanced Earnings", xpTotal: 420,
    lessons: [
      { title: "What Are Origination Rights — Full Legal Explanation", duration: "8 min", format: "article", xp: 70 },
      { title: "How to Log a Home in the Vault (Step by Step)", duration: "7 min", format: "video", xp: 65 },
      { title: "Building a 100-Home Portfolio in 12 Months", duration: "9 min", format: "video", xp: 80 },
      { title: "Origination Income: The Math Behind Perpetual Rights", duration: "8 min", format: "article", xp: 75 },
      { title: "Protecting Your Origination Claims", duration: "6 min", format: "article", xp: 65 },
      { title: "Origination Module Quiz", duration: "7 min", format: "quiz", xp: 65 },
    ],
  },
  {
    id: "advanced-network",
    title: "Advanced Network Strategies",
    description: "Advanced techniques for high-volume network operators. Build a regional team, manage L2 and L3 networks, and project passive income milestones.",
    duration: "60 min", lessonCount: 7, color: "#f59e0b", accent: "rgba(245,158,11,0.1)",
    icon: Trophy, badge: "Advanced", track: "Network Building", xpTotal: 560,
    lessons: [
      { title: "Passive Income Math: Modeling Your 12-Month Projection", duration: "10 min", format: "article", xp: 90 },
      { title: "Building a Regional Pro Group Around Your L1 Network", duration: "9 min", format: "video", xp: 80 },
      { title: "The Monthly Network Call Playbook", duration: "8 min", format: "article", xp: 75 },
      { title: "Identifying and Activating Inactive Recruits", duration: "8 min", format: "video", xp: 75 },
      { title: "Reaching Founding Tier: The 100-Recruit System", duration: "9 min", format: "video", xp: 85 },
      { title: "Home Origination at Scale: Vault Strategy for 100+ Homes", duration: "8 min", format: "article", xp: 80 },
      { title: "Advanced Strategies Final Quiz", duration: "8 min", format: "quiz", xp: 75 },
    ],
  },
  {
    id: "chartering-to-founding",
    title: "Charter to Founding Tier",
    description: "The path from 25 recruits (Charter) to 100 recruits (Founding) — the milestone that doubles your override rates and unlocks origination rights at scale.",
    duration: "50 min", lessonCount: 6, color: "#3b82f6", accent: "rgba(59,130,246,0.1)",
    icon: Award, badge: "Tier Advancement", track: "Network Building", xpTotal: 430,
    lessons: [
      { title: "Understanding Tier Economics: What Changes at 100 Recruits", duration: "8 min", format: "video", xp: 75 },
      { title: "Sprint Planning: 75 More Recruits in 6 Months", duration: "9 min", format: "article", xp: 80 },
      { title: "The L1 Activation Sequence", duration: "8 min", format: "video", xp: 75 },
      { title: "Retention: Keeping Your Network Active", duration: "9 min", format: "article", xp: 75 },
      { title: "What Founding Tier Looks Like in Year 2", duration: "9 min", format: "video", xp: 80 },
      { title: "Tier Advancement Quiz", duration: "7 min", format: "quiz", xp: 45 },
    ],
  },
  {
    id: "prolnk-certified",
    title: "ProLnk Certified Partner",
    description: "The capstone certification. Demonstrates mastery across all 5 income streams, the network system, and platform mechanics. Earns the Certified badge on your profile.",
    duration: "45 min", lessonCount: 5, color: "#f59e0b", accent: "rgba(245,158,11,0.12)",
    icon: Award, badge: "Certification", track: "Getting Started", xpTotal: 500,
    lessons: [
      { title: "Certification Overview and Requirements", duration: "5 min", format: "article", xp: 40 },
      { title: "Comprehensive Platform Assessment (Part 1)", duration: "15 min", format: "quiz", xp: 150 },
      { title: "Comprehensive Platform Assessment (Part 2)", duration: "15 min", format: "quiz", xp: 150 },
      { title: "Income System Mastery Verification", duration: "5 min", format: "quiz", xp: 100 },
      { title: "Certification Submission", duration: "5 min", format: "article", xp: 60 },
    ],
  },
  {
    id: "ai-matching",
    title: "How the AI Matching System Works",
    description: "Inside the algorithm: how ProLnk's AI scores leads, routes them to the right pro, and how you can optimize your profile to be first in line.",
    duration: "30 min", lessonCount: 4, color: "#a855f7", accent: "rgba(168,85,247,0.1)",
    icon: Zap, badge: "Platform Deep Dive", track: "Getting Started", xpTotal: 260,
    lessons: [
      { title: "AI Match Score Explained: What 87 vs 42 Means", duration: "8 min", format: "video", xp: 70 },
      { title: "Profile Signals That Boost Your Match Priority", duration: "7 min", format: "article", xp: 65 },
      { title: "Response Time and Its Effect on Future Leads", duration: "8 min", format: "video", xp: 65 },
      { title: "AI Matching Quiz", duration: "7 min", format: "quiz", xp: 60 },
    ],
  },
  {
    id: "photos-and-vault",
    title: "Photos, Reviews, and the Vault",
    description: "Your visual reputation system. Before/after photos power your AI score, feed the Home Health Vault, and become the single biggest lever for lead volume.",
    duration: "35 min", lessonCount: 5, color: "#22c55e", accent: "rgba(34,197,94,0.1)",
    icon: Star, badge: "Reputation", track: "Getting Started", xpTotal: 310,
    lessons: [
      { title: "The ProLnk Photo Standard (10 Rules)", duration: "7 min", format: "article", xp: 60 },
      { title: "What AI Extracts From Your Before/After Photos", duration: "8 min", format: "video", xp: 70 },
      { title: "Building a 5-Star Review System", duration: "7 min", format: "video", xp: 65 },
      { title: "Vault Documentation: Logging Health Data Correctly", duration: "8 min", format: "article", xp: 65 },
      { title: "Photos & Vault Quiz", duration: "5 min", format: "quiz", xp: 50 },
    ],
  },
  {
    id: "compliance-and-legal",
    title: "Compliance, Licensing, and Legal",
    description: "Everything you need to stay compliant: license requirements, TCPA/CCPA rules for outreach, 1099 reporting thresholds, and how origination rights are legally protected.",
    duration: "40 min", lessonCount: 5, color: "#6b7280", accent: "rgba(107,114,128,0.1)",
    icon: FileText, badge: "Compliance", track: "Advanced Earnings", xpTotal: 330,
    lessons: [
      { title: "Licensing Requirements by Trade and State", duration: "8 min", format: "article", xp: 70 },
      { title: "TCPA Rules for Recruiting and Outreach", duration: "8 min", format: "article", xp: 70 },
      { title: "1099 Reporting: What You Owe, When You Owe It", duration: "8 min", format: "article", xp: 65 },
      { title: "How Origination Rights Are Legally Structured", duration: "9 min", format: "article", xp: 75 },
      { title: "Compliance Module Quiz", duration: "7 min", format: "quiz", xp: 50 },
    ],
  },
];

const TRACKS = [
  { name: "Getting Started", color: "#22c55e", desc: "Platform fundamentals + first income", modules: 4 },
  { name: "Network Building", color: "#3b82f6", desc: "Recruit, grow, and manage your override team", modules: 3 },
  { name: "Advanced Earnings", color: "#f59e0b", desc: "Maximize all 5 income streams", modules: 4 },
];

const WEBINARS = [
  { title: "ProLnk Orientation: Platform Walkthrough for New Partners", date: "Every Monday", time: "7 PM CST", host: "ProLnk Partner Success Team", spots: 48, attending: 31 },
  { title: "Recruiting Workshop: The 25-Recruit Sprint to Charter Tier", date: "Every Wednesday", time: "12 PM CST", host: "Charter Member Panel", spots: 30, attending: 22 },
  { title: "Income Modeling Live: Build Your 12-Month Plan", date: "Every Friday", time: "11 AM CST", host: "ProLnk Academy Lead", spots: 60, attending: 44 },
  { title: "Q&A: Home Origination Rights Deep Dive", date: "Monthly — 3rd Thursday", time: "6 PM CST", host: "ProLnk Legal & Product", spots: 100, attending: 67 },
];

const STORAGE_KEY = "prolnk_academy_progress_v2";

function getProgress(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
}
function setProgress(p: Record<string, boolean>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

function formatIcon(format: "video" | "article" | "quiz") {
  const Icon = FORMAT_ICON[format];
  return <Icon size={11} color={FORMAT_COLOR[format]} />;
}

function ModuleCard({ mod, onToggle }: { mod: Module; onToggle: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const [progress, setProgressState] = useState(() => getProgress());
  const completed = !!progress[mod.id];
  const Icon = mod.icon;

  function handleComplete() {
    const updated = { ...progress, [mod.id]: !completed };
    setProgressState(updated);
    setProgress(updated);
    onToggle();
  }

  return (
    <div style={{
      background: "#1a1d27",
      border: `1px solid ${completed ? mod.color + "50" : "#1e2330"}`,
      borderRadius: 16, overflow: "hidden", transition: "border-color 0.2s",
    }}>
      <div style={{ padding: "20px 24px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
            background: completed ? mod.color : mod.accent,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {completed ? <CheckCircle size={22} color="#fff" /> : <Icon size={22} color={mod.color} />}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: mod.color, background: mod.accent, borderRadius: 6, padding: "2px 8px", letterSpacing: "0.04em" }}>
                    {mod.badge}
                  </span>
                  <span style={{ fontSize: 10, color: "#4b5563", background: "#141720", borderRadius: 6, padding: "2px 8px" }}>
                    {mod.track}
                  </span>
                  {completed && (
                    <span style={{ fontSize: 10, fontWeight: 600, color: "#22c55e", background: "rgba(34,197,94,0.1)", borderRadius: 6, padding: "2px 8px" }}>
                      Completed
                    </span>
                  )}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", margin: 0 }}>{mod.title}</h3>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ color: "#6b7280", fontSize: 11 }}>{mod.lessonCount} lessons · {mod.duration}</div>
                <div style={{ color: "#f59e0b", fontSize: 11, fontWeight: 700 }}>+{mod.xpTotal} XP</div>
              </div>
            </div>
            <p style={{ color: "#9ca3af", fontSize: 13, margin: "8px 0 14px", lineHeight: 1.6 }}>{mod.description}</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button onClick={handleComplete} style={{
                padding: "8px 16px", borderRadius: 9,
                background: completed ? "rgba(34,197,94,0.1)" : mod.color,
                color: completed ? "#22c55e" : "#fff",
                border: completed ? "1px solid rgba(34,197,94,0.3)" : "none",
                fontWeight: 700, fontSize: 12, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6,
              }}>
                {completed ? <><CheckCircle size={13} /> Completed</> : <><Play size={13} /> Start Module</>}
              </button>
              <button onClick={() => setExpanded(e => !e)} style={{
                padding: "8px 16px", borderRadius: 9, background: "transparent",
                color: "#6b7280", border: "1px solid #1e2330", fontWeight: 600,
                fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
              }}>
                {expanded ? "Hide lessons" : "View lessons"}
                <ChevronRight size={13} style={{ transform: expanded ? "rotate(90deg)" : "none", transition: "transform 0.15s" }} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {expanded && (
        <div style={{ borderTop: "1px solid #1e2330", padding: "14px 24px 18px" }}>
          {mod.lessons.map((lesson, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "9px 0",
              borderBottom: i < mod.lessons.length - 1 ? "1px solid #1e2330" : "none",
            }}>
              <div style={{
                width: 26, height: 26, borderRadius: "50%",
                background: "rgba(255,255,255,0.04)", border: "1px solid #1e2330",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, fontSize: 10, color: "#4b5563", fontWeight: 600,
              }}>{i + 1}</div>
              <span style={{ flex: 1, fontSize: 12, color: "#d1d5db" }}>{lesson.title}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  {formatIcon(lesson.format)}
                  <span style={{ fontSize: 10, color: FORMAT_COLOR[lesson.format], fontWeight: 600 }}>{lesson.format}</span>
                </div>
                <span style={{ fontSize: 10, color: "#f59e0b" }}>+{lesson.xp} XP</span>
                <span style={{ fontSize: 10, color: "#4b5563", display: "flex", alignItems: "center", gap: 3 }}>
                  <Clock size={10} /> {lesson.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProLnkAcademy() {
  const [progress, setProgressState] = useState(() => getProgress());
  const [activeTrack, setActiveTrack] = useState<string>("All");

  const completedCount = MODULES.filter(m => !!progress[m.id]).length;
  const allComplete = completedCount === MODULES.length;
  const progressPct = Math.round((completedCount / MODULES.length) * 100);
  const totalXP = MODULES.filter(m => !!progress[m.id]).reduce((sum, m) => sum + m.xpTotal, 0);
  const totalXPPossible = MODULES.reduce((sum, m) => sum + m.xpTotal, 0);
  const totalLessons = MODULES.reduce((sum, m) => sum + m.lessonCount, 0);
  const totalDuration = "4 hrs 10 min";

  function handleToggle() { setProgressState(getProgress()); }

  const filteredModules = activeTrack === "All"
    ? MODULES
    : MODULES.filter(m => m.track === activeTrack);

  const CERT_MODULE = MODULES.find(m => m.id === "prolnk-certified")!;

  return (
    <>
      <Helmet>
        <title>ProLnk Academy | Partner Training Hub</title>
        <meta name="description" content="The complete ProLnk partner training hub. 12 modules, 4 hours, 3 learning tracks. Master all 5 income streams and earn your Certified Partner badge." />
      </Helmet>

      <div style={{ minHeight: "100vh", background: "#0f1117", color: "#e5e7eb", fontFamily: "sans-serif" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px 64px" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Link href="/resources" style={{ color: "#6b7280", fontSize: 13, textDecoration: "none" }}>Resources</Link>
            <span style={{ color: "#374151" }}>›</span>
            <span style={{ color: "#e5e7eb", fontSize: 13 }}>Academy</span>
          </div>

          {/* Hero */}
          <div style={{ marginBottom: 32 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)",
              borderRadius: 20, padding: "5px 14px", fontSize: 12, color: "#22c55e", fontWeight: 600, marginBottom: 14,
            }}>
              <BookOpen size={12} /> ProLnk Academy
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: "#fff", margin: "0 0 10px", lineHeight: 1.2 }}>
              Everything You Need to Master ProLnk
            </h1>
            <p style={{ color: "#9ca3af", fontSize: 14, margin: "0 0 16px", maxWidth: 580, lineHeight: 1.65 }}>
              {totalLessons} lessons · {totalDuration} · Self-paced · 3 tracks · Earn your Certified Partner badge
            </p>

            {/* XP + progress */}
            <div style={{ background: "#1a1d27", borderRadius: 14, border: "1px solid #1e2330", padding: "16px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                <div>
                  <span style={{ color: "#d1d5db", fontSize: 13, fontWeight: 600 }}>
                    {allComplete ? "All modules complete — you're certified!" : `${completedCount} of ${MODULES.length} modules`}
                  </span>
                  <span style={{ color: "#f59e0b", fontSize: 13, fontWeight: 700, marginLeft: 16 }}>
                    {totalXP.toLocaleString()} / {totalXPPossible.toLocaleString()} XP
                  </span>
                </div>
                <span style={{ color: "#22c55e", fontSize: 13, fontWeight: 700 }}>{progressPct}%</span>
              </div>
              <div style={{ height: 8, background: "#1e2330", borderRadius: 4, overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: 4, width: `${progressPct}%`,
                  background: allComplete ? "linear-gradient(90deg,#22c55e,#3b82f6)" : "#22c55e",
                  transition: "width 0.4s",
                }} />
              </div>
              {allComplete && (
                <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
                  <Award size={18} color="#f59e0b" />
                  <span style={{ color: "#f59e0b", fontWeight: 700, fontSize: 13 }}>ProLnk Certified Partner — Badge Active on Your Profile</span>
                </div>
              )}
            </div>
          </div>

          {/* Learning Tracks */}
          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 14 }}>Learning Tracks</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 10 }}>
              {[{ name: "All", color: "#6b7280", desc: "All 12 modules", modules: MODULES.length }, ...TRACKS].map((t, i) => (
                <button key={i} onClick={() => setActiveTrack(t.name)} style={{
                  background: activeTrack === t.name ? `${t.color}18` : "#1a1d27",
                  border: `1.5px solid ${activeTrack === t.name ? t.color : "#1e2330"}`,
                  borderRadius: 12, padding: "12px 16px", cursor: "pointer",
                  textAlign: "left", transition: "all 0.15s",
                }}>
                  <div style={{ color: t.color, fontSize: 12, fontWeight: 700, marginBottom: 3 }}>{t.name}</div>
                  <div style={{ color: "#9ca3af", fontSize: 11 }}>{"desc" in t ? t.desc : ""}</div>
                  <div style={{ color: "#4b5563", fontSize: 10, marginTop: 4 }}>{t.modules} modules</div>
                </button>
              ))}
            </div>
          </section>

          {/* Featured Course Banner */}
          <section style={{ marginBottom: 28 }}>
            <div style={{
              background: "linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(234,179,8,0.06) 100%)",
              border: "1px solid rgba(245,158,11,0.35)",
              borderRadius: 16, padding: "20px 24px",
              display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap",
            }}>
              <div style={{
                width: 50, height: 50, borderRadius: 14, background: "rgba(245,158,11,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Award size={26} color="#f59e0b" />
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ color: "#f59e0b", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>
                  Featured Certification
                </div>
                <div style={{ color: "#fff", fontSize: 16, fontWeight: 800, marginBottom: 3 }}>ProLnk Certified Partner</div>
                <div style={{ color: "#9ca3af", fontSize: 12 }}>Complete all 12 modules → pass the 3-part final assessment → earn the Certified badge on your partner profile</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ color: "#f59e0b", fontSize: 22, fontWeight: 900 }}>+{CERT_MODULE.xpTotal} XP</div>
                <div style={{ color: "#6b7280", fontSize: 11 }}>{CERT_MODULE.duration} capstone</div>
              </div>
            </div>
          </section>

          {/* Modules */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 48 }}>
            {filteredModules.map(mod => (
              <ModuleCard key={mod.id} mod={mod} onToggle={handleToggle} />
            ))}
          </div>

          {/* Cert unlock */}
          {allComplete && (
            <div style={{
              background: "linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(234,179,8,0.08) 100%)",
              border: "1px solid rgba(245,158,11,0.4)",
              borderRadius: 18, padding: 36, textAlign: "center", marginBottom: 40,
            }}>
              <Award size={48} color="#f59e0b" style={{ marginBottom: 12 }} />
              <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>ProLnk Partner Certification</h2>
              <p style={{ color: "#9ca3af", fontSize: 14, margin: "0 0 20px" }}>
                You've completed all 12 academy modules. Your partner profile now displays the Certified badge, increasing homeowner trust and match priority.
              </p>
              <button style={{
                background: "#f59e0b", color: "#0f1117", border: "none", borderRadius: 10,
                padding: "13px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer",
              }}>
                Download Your Certificate
              </button>
            </div>
          )}

          {/* Live Training */}
          <section style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
              <Radio size={16} color="#ec4899" />
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: 0 }}>Live Training</h2>
              <span style={{ background: "rgba(236,72,153,0.15)", border: "1px solid rgba(236,72,153,0.3)", borderRadius: 6, padding: "1px 8px", fontSize: 10, color: "#ec4899", fontWeight: 700 }}>
                LIVE
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {WEBINARS.map((w, i) => (
                <div key={i} style={{ background: "#1a1d27", border: "1px solid #1e2330", borderRadius: 14, padding: "18px 22px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
                    <div style={{ flex: 1, minWidth: 220 }}>
                      <h3 style={{ color: "#fff", fontSize: 14, fontWeight: 700, margin: "0 0 6px" }}>{w.title}</h3>
                      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#6b7280", fontSize: 12 }}>
                          <Calendar size={11} /> {w.date}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#6b7280", fontSize: 12 }}>
                          <Clock size={11} /> {w.time}
                        </div>
                        <span style={{ color: "#6b7280", fontSize: 12 }}>Host: {w.host}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: 12, color: "#22c55e", fontWeight: 600, marginBottom: 6 }}>{w.attending}/{w.spots} registered</div>
                      <button style={{
                        background: "#22c55e", color: "#fff", border: "none", borderRadius: 8,
                        padding: "7px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer",
                      }}>
                        Register Free
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Certificates */}
          <section style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
              <Trophy size={16} color="#f59e0b" />
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: 0 }}>Certificates Earned</h2>
            </div>
            <div style={{ background: "#1a1d27", border: "1px solid #1e2330", borderRadius: 14, padding: "24px 24px" }}>
              {completedCount === 0 ? (
                <div style={{ textAlign: "center", color: "#4b5563", padding: "16px 0" }}>
                  <Award size={32} color="#1e2330" style={{ marginBottom: 10 }} />
                  <div style={{ fontSize: 14 }}>Complete modules to earn certificates</div>
                  <div style={{ fontSize: 12, marginTop: 4 }}>Your first certificate unlocks after completing any learning track</div>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 12 }}>
                  {TRACKS.filter(t => filteredModules.filter(m => m.track === t.name && !!progress[m.id]).length >= 2).map((t, i) => (
                    <div key={i} style={{
                      background: `${t.color}12`, border: `1px solid ${t.color}30`,
                      borderRadius: 12, padding: "16px", textAlign: "center",
                    }}>
                      <Award size={28} color={t.color} style={{ marginBottom: 8 }} />
                      <div style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>{t.name}</div>
                      <div style={{ color: t.color, fontSize: 11, marginTop: 3 }}>Track Certificate</div>
                    </div>
                  ))}
                  {allComplete && (
                    <div style={{
                      background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)",
                      borderRadius: 12, padding: "16px", textAlign: "center",
                    }}>
                      <Award size={28} color="#f59e0b" style={{ marginBottom: 8 }} />
                      <div style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>ProLnk Certified Partner</div>
                      <div style={{ color: "#f59e0b", fontSize: 11, marginTop: 3 }}>Full Certification</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* Quick Links */}
          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 14 }}>Continue Learning</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 10 }}>
              {[
                { label: "Network Income System", href: "/network-income-system", desc: "All 5 streams explained visually", color: "#22c55e" },
                { label: "Success Stories", href: "/resources/success-stories", desc: "How top partners built their income", color: "#3b82f6" },
                { label: "Competitive Advantage", href: "/resources/competitive", desc: "Why ProLnk beats Angi and HomeAdvisor", color: "#a855f7" },
                { label: "Partner FAQ", href: "/resources/faq", desc: "Answers to the most common questions", color: "#f59e0b" },
              ].map((link, i) => (
                <Link key={i} href={link.href}>
                  <div style={{
                    background: "#1a1d27", borderRadius: 12, border: "1px solid #1e2330",
                    padding: 16, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 12,
                  }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: link.color, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{link.label}</div>
                      <div style={{ fontSize: 11, color: "#6b7280" }}>{link.desc}</div>
                    </div>
                    <ChevronRight size={13} color="#374151" style={{ marginLeft: "auto", flexShrink: 0 }} />
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
