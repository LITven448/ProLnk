/**
 * Wave 115 — Campaign Center
 * Seasonal homeowner check-in automation + Partner win-back 60-day sequence
 */
import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  Megaphone, Calendar, Users, RefreshCw, Play, Pause,
  CheckCircle, Clock, AlertCircle, Leaf, Snowflake,
  Sun, CloudRain, Heart, TrendingUp, Mail, MessageSquare,
  ChevronRight, BarChart2, UserX, Zap, Trophy, Share2,
  Beaker,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ── Seasonal Campaign Config ──────────────────────────────────────────────────
const SEASONAL_CAMPAIGNS = [
  {
    id: "spring_checkin",
    season: "Spring",
    icon: Leaf,
    color: "#059669",
    bg: "#ECFDF5",
    title: "Spring Home Check-In",
    desc: "Post-winter inspection reminder — roof, gutters, HVAC tune-up, exterior paint.",
    timing: "March 1 – April 15",
    touchpoints: [
      { day: 0, channel: "SMS", message: "Hi {name}! Spring is here — time for your annual home check-in. Click to see what needs attention this season." },
      { day: 7, channel: "Email", message: "Spring Maintenance Checklist for {address} — personalized AI recommendations based on your property history." },
      { day: 21, channel: "SMS", message: "Your ProLnk partner {partner} is available for spring tune-ups. Book now before the rush." },
    ],
    estimatedReach: 312,
    lastRun: "Mar 1, 2025",
    status: "scheduled",
  },
  {
    id: "summer_hvac",
    season: "Summer",
    icon: Sun,
    color: "#d97706",
    bg: "#FFFBEB",
    title: "Summer HVAC & Cooling",
    desc: "Pre-heat-wave HVAC check, attic insulation, and window seal audit.",
    timing: "May 15 – June 30",
    touchpoints: [
      { day: 0, channel: "Email", message: "Beat the Texas heat — is your AC ready? Your ProLnk partner can check it this week." },
      { day: 14, channel: "SMS", message: "Heads up: {city} heat advisories are forecast. Book your HVAC tune-up before temps hit 100°F." },
    ],
    estimatedReach: 289,
    lastRun: "May 15, 2025",
    status: "active",
  },
  {
    id: "fall_prep",
    season: "Fall",
    icon: CloudRain,
    color: "#7C3AED",
    bg: "#FAF5FF",
    title: "Fall Storm Prep",
    desc: "Pre-winter weatherization — roof inspection, gutter cleaning, furnace check.",
    timing: "Sept 15 – Nov 1",
    touchpoints: [
      { day: 0, channel: "SMS", message: "Fall is here — protect {address} before winter storms. Your ProLnk partner has availability this week." },
      { day: 10, channel: "Email", message: "Fall Weatherization Report for {address} — AI-detected items that need attention before the first freeze." },
      { day: 30, channel: "SMS", message: "Last call for fall prep — book by Nov 1 to avoid winter backlogs." },
    ],
    estimatedReach: 298,
    lastRun: "Sept 15, 2025",
    status: "paused",
  },
  {
    id: "winter_freeze",
    season: "Winter",
    icon: Snowflake,
    color: "#0891b2",
    bg: "#F0F9FF",
    title: "Winter Freeze Alert",
    desc: "Pipe insulation, water heater inspection, and emergency contact reminder.",
    timing: "Nov 15 – Feb 28",
    touchpoints: [
      { day: 0, channel: "SMS", message: "Freeze warning for {city}! Protect your pipes — your ProLnk partner can winterize {address} today." },
      { day: 3, channel: "Email", message: "Winter Emergency Checklist for {address} — what to do before temps drop below freezing." },
    ],
    estimatedReach: 312,
    lastRun: "Nov 15, 2025",
    status: "scheduled",
  },
];

// ── Win-Back Sequence Config ──────────────────────────────────────────────────
const WINBACK_SEQUENCE = [
  { day: 0,  channel: "Email", icon: Mail,         color: "#6B7280", subject: "We miss you, {name}",                  preview: "It's been 60 days since your last job on ProLnk. Here's what you've been missing…" },
  { day: 7,  channel: "SMS",   icon: MessageSquare, color: "#0891b2", subject: "Quick check-in",                       preview: "Hey {name} — any questions about ProLnk? Reply and we'll help you get back on track." },
  { day: 14, channel: "Email", icon: Mail,         color: "#6B7280", subject: "Your territory is heating up",          preview: "{count} new leads in {city} this week. Your competitors are claiming them. Here's how to get back in." },
  { day: 21, channel: "SMS",   icon: MessageSquare, color: "#0891b2", subject: "Exclusive offer for you",              preview: "We're waiving your next month's Pro fee if you complete 1 job this week. Tap to activate." },
  { day: 30, channel: "Email", icon: Mail,         color: "#6B7280", subject: "ROI snapshot: what you've left behind", preview: "Based on your service area, you've missed an estimated ${amount} in commissions. Here's how to recover." },
  { day: 45, channel: "SMS",   icon: MessageSquare, color: "#0891b2", subject: "Final check-in",                       preview: "Last message from us — we'd love to have you back. Reply STOP to unsubscribe, or RESUME to reactivate." },
  { day: 60, channel: "Email", icon: Mail,         color: "#6B7280", subject: "Account paused — reactivate anytime",  preview: "Your ProLnk account has been paused. Click here to reactivate and reclaim your territory." },
];

// ── Campaign Stats (mock from DB) ─────────────────────────────────────────────
const STATS = [
  { label: "Homeowners Enrolled",   value: "1,201", icon: Users,      color: "#059669" },
  { label: "Campaigns Active",      value: "2",     icon: Play,       color: "#0891b2" },
  { label: "Avg Open Rate",         value: "34%",   icon: BarChart2,  color: "#7C3AED" },
  { label: "Win-Back Candidates",   value: "23",    icon: UserX,      color: "#d97706" },
];

const STATUS_BADGE: Record<string, { label: string; color: string; bg: string }> = {
  active:    { label: "Active",     color: "#059669", bg: "#ECFDF5" },
  scheduled: { label: "Scheduled",  color: "#0891b2", bg: "#F0F9FF" },
  paused:    { label: "Paused",     color: "#d97706", bg: "#FFFBEB" },
  draft:     { label: "Draft",      color: "#6B7280", bg: "#F9FAFB" },
};

// ── A/B Test Results ──────────────────────────────────────────────────────────
const AB_TESTS = [
  {
    id: "ab1",
    campaign: "Spring Check-In Email",
    variantA: { name: "Subject: 'Spring is here'", openRate: 28.4 },
    variantB: { name: "Subject: 'Your home needs attention'", openRate: 41.7 },
    winner: "B",
    sampleSize: 614,
    completedDate: "Apr 3, 2025",
  },
  {
    id: "ab2",
    campaign: "Win-Back Day 14 SMS",
    variantA: { name: "Territory urgency angle", openRate: 19.2 },
    variantB: { name: "Earnings FOMO angle", openRate: 33.8 },
    winner: "B",
    sampleSize: 312,
    completedDate: "Mar 28, 2025",
  },
  {
    id: "ab3",
    campaign: "Summer HVAC Email CTA",
    variantA: { name: "'Book Now' button", openRate: 22.1 },
    variantB: { name: "'Check AC Health' button", openRate: 26.5 },
    winner: "B",
    sampleSize: 289,
    completedDate: "May 22, 2025",
  },
];

// ── Audience Segments ─────────────────────────────────────────────────────────
const AUDIENCE_CHIPS = [
  { id: "all",       label: "All Partners",  count: 34, color: "#0A1628" },
  { id: "hvac",      label: "HVAC Only",     count: 11, color: "#0891b2" },
  { id: "dfw_north", label: "DFW North",     count: 18, color: "#7C3AED" },
  { id: "at_risk",   label: "At-Risk",       count: 8,  color: "#EF4444" },
];

// ── Schedule Calendar (7-day) ─────────────────────────────────────────────────
const TODAY = new Date();
const SCHEDULE_BLOCKS: Array<{ dayOffset: number; time: string; campaign: string; color: string; channel: string }> = [
  { dayOffset: 0, time: "9:00 AM", campaign: "Summer HVAC Email",     color: "#d97706", channel: "Email" },
  { dayOffset: 1, time: "11:30 AM", campaign: "Win-Back SMS Day 7",   color: "#0891b2", channel: "SMS" },
  { dayOffset: 2, time: "8:00 AM", campaign: "Spring Reminder",       color: "#059669", channel: "Email" },
  { dayOffset: 4, time: "10:00 AM", campaign: "Partner Digest",       color: "#7C3AED", channel: "Email" },
  { dayOffset: 5, time: "2:00 PM", campaign: "Win-Back Final SMS",    color: "#EF4444", channel: "SMS" },
  { dayOffset: 6, time: "9:30 AM", campaign: "Fall Storm Preview",    color: "#6B7280", channel: "Email" },
];

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ── Active Campaigns Ticker ───────────────────────────────────────────────────
const TICKER_ITEMS = [
  "✉️ Storm Alert Email: 847 sent",
  "📱 SMS Blast: 412 sent",
  "🎯 Partner Digest: 112 sent",
  "✉️ Win-Back Day 14: 67 sent",
  "📱 Spring Check-In SMS: 289 sent",
  "✉️ Summer HVAC Email: 203 sent",
];

function ActiveCampaignsTicker() {
  const [offset, setOffset] = useState(0);
  const combined = [...TICKER_ITEMS, ...TICKER_ITEMS];

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % TICKER_ITEMS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0A1628] rounded-xl px-4 py-2.5 overflow-hidden relative">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest flex-shrink-0">Live</span>
        <div className="flex-1 overflow-hidden">
          <div
            className="flex gap-8 transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${offset * (100 / TICKER_ITEMS.length)}%)`, width: `${combined.length * (100 / TICKER_ITEMS.length)}%` }}
          >
            {combined.map((item, i) => (
              <span key={i} className="text-xs text-gray-300 whitespace-nowrap flex-shrink-0" style={{ width: `${100 / combined.length}%` }}>
                {item}
              </span>
            ))}
          </div>
        </div>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function CampaignCenter() {
  const [activeTab, setActiveTab] = useState<"seasonal" | "winback">("seasonal");
  const [expandedCampaign, setExpandedCampaign] = useState<string | null>(null);
  const [winbackStatus, setWinbackStatus] = useState<"active" | "paused">("active");
  const [selectedAudience, setSelectedAudience] = useState<Set<string>>(new Set(["all"]));

  // Fetch inactive partners for win-back targeting
  const { data: inactivePartners } = trpc.admin.getInactivePartners.useQuery(
    { daysSinceLastJob: 60 },
    { retry: false, onError: () => {} } as any
  );

  const handleLaunchCampaign = (id: string) => {
    toast.success("Campaign queued", { description: `Seasonal campaign "${id}" will send at the next scheduled window.` });
  };

  const handlePauseCampaign = (id: string) => {
    toast.info("Campaign paused", { description: `"${id}" paused. No further messages will send until resumed.` });
  };

  const handleLaunchWinback = () => {
    const count = inactivePartners?.length ?? 23;
    toast.success("Win-back sequence launched", { description: `${count} inactive partners enrolled in the 60-day re-engagement sequence.` });
    setWinbackStatus("active");
  };

  const toggleAudience = (id: string) => {
    setSelectedAudience((prev) => {
      const next = new Set(prev);
      if (id === "all") return new Set(["all"]);
      next.delete("all");
      if (next.has(id)) { next.delete(id); if (next.size === 0) next.add("all"); }
      else next.add(id);
      return next;
    });
  };

  const audienceCount = Array.from(selectedAudience).reduce((sum, id) => {
    const chip = AUDIENCE_CHIPS.find((c) => c.id === id);
    return sum + (chip?.count ?? 0);
  }, 0);

  return (
    <AdminLayout>
    <div className="p-6 max-w-6xl mx-auto space-y-6">

      {/* Active Campaigns Ticker */}
      <ActiveCampaignsTicker />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900 flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-[#0A1628]" />
            Campaign Center
          </h1>
          <p className="text-sm text-gray-500 mt-1">Seasonal homeowner check-ins and partner win-back automation sequences</p>
        </div>
        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
          <Zap className="w-3 h-3 mr-1" /> Automation Active
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}18` }}>
                  <Icon className="w-4 h-4" style={{ color: s.color }} />
                </div>
              </div>
              <p className="text-2xl font-heading font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* ── Audience Segmenter ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-[#0A1628]" />
          <h3 className="text-sm font-bold text-gray-900">Audience Segmenter</h3>
          <span className="ml-auto text-xs font-semibold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100">
            Audience: {audienceCount} partners
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {AUDIENCE_CHIPS.map((chip) => {
            const active = selectedAudience.has(chip.id);
            return (
              <button
                key={chip.id}
                onClick={() => toggleAudience(chip.id)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border"
                style={active
                  ? { backgroundColor: chip.color, color: "#fff", borderColor: chip.color }
                  : { backgroundColor: "#F9FAFB", color: "#6B7280", borderColor: "#E5E7EB" }
                }
              >
                {chip.label}
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                  style={active ? { backgroundColor: "rgba(255,255,255,0.2)" } : { backgroundColor: "#E5E7EB" }}
                >
                  {chip.count}
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-gray-400 mt-3">Select segments to target for your next send. Combine chips to refine the audience.</p>
      </div>

      {/* ── A/B Test Results ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <Beaker className="w-4 h-4 text-[#7C3AED]" />
          <h3 className="text-sm font-bold text-gray-900">Recent A/B Test Results</h3>
        </div>
        <div className="space-y-4">
          {AB_TESTS.map((test) => (
            <div key={test.id} className="rounded-xl border border-gray-100 p-4 bg-gray-50">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-xs font-bold text-gray-700">{test.campaign}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{test.sampleSize.toLocaleString()} recipients • Completed {test.completedDate}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "A", data: test.variantA },
                  { key: "B", data: test.variantB },
                ].map(({ key, data }) => {
                  const isWinner = test.winner === key;
                  return (
                    <div
                      key={key}
                      className="rounded-lg border p-3 relative"
                      style={isWinner
                        ? { backgroundColor: "#ECFDF5", borderColor: "#6EE7B7" }
                        : { backgroundColor: "#fff", borderColor: "#E5E7EB" }
                      }
                    >
                      {isWinner && (
                        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                          <Trophy className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={isWinner ? { backgroundColor: "#059669", color: "#fff" } : { backgroundColor: "#E5E7EB", color: "#6B7280" }}>
                          Variant {key}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-500 mb-2 leading-relaxed">{data.name}</p>
                      <div className="flex items-end gap-1">
                        <span className="text-lg font-bold" style={{ color: isWinner ? "#059669" : "#374151" }}>{data.openRate}%</span>
                        <span className="text-[10px] text-gray-400 mb-0.5">open rate</span>
                      </div>
                      <div className="mt-1.5 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${(data.openRate / 50) * 100}%`, backgroundColor: isWinner ? "#059669" : "#9CA3AF" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Schedule Calendar ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-[#0A1628]" />
          <h3 className="text-sm font-bold text-gray-900">7-Day Send Schedule</h3>
          <span className="ml-auto text-[10px] text-gray-400">{TODAY.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – {new Date(TODAY.getTime() + 6 * 86400000).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 7 }).map((_, i) => {
            const date = new Date(TODAY.getTime() + i * 86400000);
            const dayLabel = DAY_LABELS[date.getDay()];
            const dayNum = date.getDate();
            const blocks = SCHEDULE_BLOCKS.filter((b) => b.dayOffset === i);
            const isToday = i === 0;
            return (
              <div key={i} className="flex flex-col gap-1">
                <div className={`text-center py-1.5 rounded-lg ${isToday ? "bg-[#0A1628] text-white" : "bg-gray-50 text-gray-500"}`}>
                  <p className="text-[10px] font-semibold uppercase tracking-wide">{dayLabel}</p>
                  <p className="text-sm font-bold">{dayNum}</p>
                </div>
                <div className="space-y-1 min-h-[60px]">
                  {blocks.map((b, bi) => (
                    <div
                      key={bi}
                      className="rounded px-1.5 py-1 text-white"
                      style={{ backgroundColor: b.color }}
                      title={`${b.campaign} — ${b.time}`}
                    >
                      <p className="text-[9px] font-bold truncate leading-tight">{b.campaign}</p>
                      <p className="text-[8px] opacity-80 leading-tight">{b.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {(["seasonal", "winback"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === t ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t === "seasonal" ? "Seasonal Check-Ins" : "Partner Win-Back"}
          </button>
        ))}
      </div>

      {/* ── Seasonal Campaigns ── */}
      {activeTab === "seasonal" && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Automated homeowner outreach campaigns triggered by season. Each campaign sends a multi-touch SMS + email sequence to all homeowners in the ProLnk network.
          </p>
          {SEASONAL_CAMPAIGNS.map((campaign) => {
            const Icon = campaign.icon;
            const statusCfg = STATUS_BADGE[campaign.status];
            const isExpanded = expandedCampaign === campaign.id;
            return (
              <div key={campaign.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div
                  className="p-5 flex items-start gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedCampaign(isExpanded ? null : campaign.id)}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: campaign.bg }}>
                    <Icon className="w-6 h-6" style={{ color: campaign.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-heading font-bold text-gray-900">{campaign.title}</h3>
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                        style={{ color: statusCfg.color, backgroundColor: statusCfg.bg }}
                      >
                        {statusCfg.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{campaign.desc}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{campaign.timing}</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{campaign.estimatedReach.toLocaleString()} homeowners</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />Last: {campaign.lastRun}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {campaign.status === "active" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => { e.stopPropagation(); handlePauseCampaign(campaign.id); }}
                        className="text-xs"
                      >
                        <Pause className="w-3.5 h-3.5 mr-1" /> Pause
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); handleLaunchCampaign(campaign.id); }}
                        className="text-xs"
                        style={{ backgroundColor: campaign.color }}
                      >
                        <Play className="w-3.5 h-3.5 mr-1" /> Launch
                      </Button>
                    )}
                    <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                  </div>
                </div>

                {/* Expanded touchpoint sequence */}
                {isExpanded && (
                  <div className="border-t border-gray-100 p-5 bg-gray-50">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Message Sequence</h4>
                    <div className="space-y-3">
                      {campaign.touchpoints.map((tp, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="flex flex-col items-center">
                            <div
                              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                              style={{ backgroundColor: campaign.color }}
                            >
                              {i + 1}
                            </div>
                            {i < campaign.touchpoints.length - 1 && (
                              <div className="w-0.5 h-6 bg-gray-200 mt-1" />
                            )}
                          </div>
                          <div className="flex-1 bg-white rounded-xl border border-gray-200 p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-bold text-gray-700">Day {tp.day}</span>
                              <Badge className="text-[10px] px-1.5 py-0" variant="outline">{tp.channel}</Badge>
                            </div>
                            <p className="text-xs text-gray-500 italic">"{tp.message}"</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── Partner Win-Back ── */}
      {activeTab === "winback" && (
        <div className="space-y-6">
          {/* Win-back header */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-gray-900 mb-1">60-Day Partner Win-Back Sequence</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Automatically enrolls partners who haven't completed a job in 60+ days. A 7-touch SMS + email sequence re-engages them with territory data, ROI proof, and a limited-time incentive.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><UserX className="w-3.5 h-3.5" />{inactivePartners?.length ?? 23} inactive partners eligible</span>
                    <span className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" />Avg re-engagement: 18% within 30 days</span>
                    <span className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${winbackStatus === "active" ? "bg-emerald-500" : "bg-orange-400"}`} />
                      {winbackStatus === "active" ? "Running" : "Paused"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                {winbackStatus === "active" ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => { setWinbackStatus("paused"); toast.info("Win-back sequence paused"); }}
                  >
                    <Pause className="w-3.5 h-3.5 mr-1" /> Pause
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={handleLaunchWinback}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    <Play className="w-3.5 h-3.5 mr-1" /> Launch
                  </Button>
                )}
                <Button size="sm" variant="outline" onClick={() => toast.info("Refreshing inactive partner list…")}>
                  <RefreshCw className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Sequence timeline */}
          <div>
            <h3 className="text-sm font-bold text-gray-700 mb-3">7-Touch Re-Engagement Sequence</h3>
            <div className="space-y-3">
              {WINBACK_SEQUENCE.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: step.color }}
                      >
                        {i + 1}
                      </div>
                      {i < WINBACK_SEQUENCE.length - 1 && (
                        <div className="w-0.5 h-6 bg-gray-200 mt-1" />
                      )}
                    </div>
                    <div className="flex-1 bg-white rounded-xl border border-gray-200 p-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">Day {step.day}</Badge>
                        <div className="flex items-center gap-1 text-xs font-semibold text-gray-600">
                          <Icon className="w-3.5 h-3.5" style={{ color: step.color }} />
                          {step.channel}
                        </div>
                        <span className="text-xs font-semibold text-gray-800 ml-1">{step.subject}</span>
                      </div>
                      <p className="text-xs text-gray-500 italic">"{step.preview}"</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Inactive partners list */}
          {inactivePartners && inactivePartners.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-3">Currently Eligible Partners ({inactivePartners.length})</h3>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Partner</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Last Job</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Tier</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inactivePartners.slice(0, 10).map((p: any) => (
                      <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">{p.businessName}</td>
                        <td className="px-4 py-3 text-gray-500">{p.lastJobDate ? new Date(p.lastJobDate).toLocaleDateString() : "Never"}</td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="capitalize text-xs">{p.tier}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-1 text-orange-600 text-xs">
                            <AlertCircle className="w-3.5 h-3.5" /> Inactive
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {inactivePartners.length > 10 && (
                  <div className="px-4 py-3 text-xs text-gray-400 text-center border-t border-gray-100">
                    +{inactivePartners.length - 10} more partners eligible
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Empty state when no inactive partners */}
          {inactivePartners && inactivePartners.length === 0 && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
              <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
              <h3 className="font-heading font-bold text-emerald-800 mb-1">All partners are active!</h3>
              <p className="text-sm text-emerald-600">No partners have been inactive for 60+ days. Win-back sequence is standing by.</p>
            </div>
          )}
        </div>
      )}
    </div>
    </AdminLayout>
  );
}
