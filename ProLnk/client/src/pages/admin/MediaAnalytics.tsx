import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  BarChart3, Users, TrendingUp, DollarSign, Youtube, Mic,
  FileText, Share2, Eye, Heart, RefreshCw, MapPin,
  CheckCircle, Clock, Star,
} from "lucide-react";

interface ContentRow {
  title: string;
  platform: string;
  date: string;
  views: string;
  engagement: string;
  revenue: string;
}

interface SponsorCard {
  name: string;
  deal: string;
  deliverables: string;
  due: string;
  status: "Active" | "Pending" | "Completed";
}

interface TopContent {
  title: string;
  views: string;
  platform: string;
}

const REACH_METRICS = [
  { label: "Monthly Reach", value: "48,400″, icon: Eye, color: "text-teal-400", trend: "+12% vs last month" },
  { label: "Subscribers", value: "2,847″, icon: Users, color: "text-blue-400", trend: "+94 this month" },
  { label: "Avg Engagement", value: "8.4%", icon: Heart, color: "text-rose-400″, trend: "2x industry avg" },
  { label: "Sponsored Revenue", value: "$3,400/mo", icon: DollarSign, color: "text-green-400″, trend: "+$600 vs last month" },
];

const CONTENT_ROWS: ContentRow[] = [
  { title: "How to Vet a Contractor in DFW", platform: "YouTube", date: "May 8″, views: "8,240", engagement: "11.2%", revenue: "$420" },
  { title: "ProLnk Platform Walkthrough", platform: "YouTube", date: "May 1″, views: "5,100", engagement: "9.8%", revenue: "$0" },
  { title: "Ep 24: Roofing Scams Exposed", platform: "Podcast", date: "Apr 28″, views: "3,400", engagement: "7.4%", revenue: "$800" },
  { title: "Texas Homeowner Tax Credits 2026″, platform: "Blog", date: "Apr 22", views: "6,800", engagement: "4.1%", revenue: "$210" },
  { title: "5 Signs Your HVAC is Failing", platform: "YouTube", date: "Apr 15″, views: "12,100", engagement: "13.5%", revenue: "$650" },
  { title: "Ep 23: Network Income for Pros", platform: "Podcast", date: "Apr 10″, views: "2,900", engagement: "8.8%", revenue: "$600" },
  { title: "Spring Maintenance Checklist", platform: "Social", date: "Apr 4″, views: "4,700", engagement: "6.2%", revenue: "$120" },
  { title: "DFW Real Estate Market April 2026″, platform: "Blog", date: "Apr 1", views: "3,200", engagement: "3.9%", revenue: "$150" },
];

const PLATFORM_BREAKDOWN = [
  { name: "YouTube", pct: 42, color: "#FF0000″ },
  { name: "Podcast", pct: 28, color: "#8B5CF6″ },
  { name: "Blog", pct: 18, color: "#3B82F6″ },
  { name: "Social", pct: 12, color: "#EC4899″ },
];

const AUDIENCE_STATS = [
  { label: "Avg viewer age", value: "38″, icon: Users, color: "text-cyan-400" },
  { label: "In home services", value: "67%", icon: BarChart3, color: "text-green-400″ },
  { label: "Homeowners", value: "33%", icon: FileText, color: "text-blue-400″ },
  { label: "Top city", value: "Dallas", icon: MapPin, color: "text-amber-400″ },
];

const SPONSORS: SponsorCard[] = [
  {
    name: "BuildPro Supply",
    deal: "$1,200″,
    deliverables: "2× YouTube mentions + 1 dedicated email",
    due: "May 22″,
    status: "Active",
  },
  {
    name: "Texas Home Shield",
    deal: "$900″,
    deliverables: "Podcast ad read (3 episodes)",
    due: "May 31″,
    status: "Active",
  },
  {
    name: "DFW Roofing Alliance",
    deal: "$1,300″,
    deliverables: "1× sponsored video + blog post",
    due: "Jun 10″,
    status: "Pending",
  },
];

const SUBSCRIBER_GROWTH = [
  { month: "Dec", subs: 1840 },
  { month: "Jan", subs: 2020 },
  { month: "Feb", subs: 2180 },
  { month: "Mar", subs: 2390 },
  { month: "Apr", subs: 2640 },
  { month: "May", subs: 2847 },
];

const TOP_CONTENT: TopContent[] = [
  { title: "5 Signs Your HVAC is Failing", views: "12,100″, platform: "YouTube" },
  { title: "How to Vet a Contractor in DFW", views: "8,240″, platform: "YouTube" },
  { title: "Texas Homeowner Tax Credits 2026″, views: "6,800", platform: "Blog" },
];

const PLATFORM_ICONS: Record<string, typeof Youtube> = {
  YouTube: Youtube,
  Podcast: Mic,
  Blog: FileText,
  Social: Share2,
};

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-green-900/40 text-green-400″,
  Pending: "bg-amber-900/40 text-amber-400″,
  Completed: "bg-slate-700/60 text-slate-400″,
};

export default function MediaAnalytics() {
  const [repurposed, setRepurposed] = useState<Record<number, boolean>>({});

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-8 pb-12″>

        {/* Header */}
        <div className="bg-gradient-to-r from-rose-900/40 to-purple-900/30 border border-rose-700/40 rounded-2xl p-8″>
          <div className="flex items-center gap-3 mb-2″>
            <div className="w-10 h-10 bg-rose-500/20 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-rose-400″ />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Media Analytics</h1>
              <p className="text-rose-300 text-sm">ProLnk Media performance</p>
            </div>
          </div>
          <p className="text-slate-400 text-sm mt-3″>
            Tracking reach, engagement, and monetization across YouTube, Podcast, Blog, and Social channels.
          </p>
        </div>

        {/* Reach Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4″>
          {REACH_METRICS.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.label} className="bg-[#0f1f38] border border-slate-700/50 rounded-xl p-5″>
                <div className="flex items-center justify-between mb-3″>
                  <span className="text-xs text-slate-400 uppercase tracking-wide">{m.label}</span>
                  <div className={`w-8 h-8 bg-slate-700/60 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${m.color}`} />
                  </div>
                </div>
                <div className={`text-2xl font-black ${m.color}`}>{m.value}</div>
                <div className="text-xs text-green-400 mt-1 flex items-center gap-1″>
                  <TrendingUp className="w-3 h-3″ />
                  {m.trend}
                </div>
              </div>
            );
          })}
        </div>

        {/* Content Performance Table */}
        <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6″>
          <h2 className="text-lg font-semibold text-white mb-5″>Content Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-slate-700/50″>
                  {["Title", "Platform", "Date", "Views", "Engagement", "Revenue"].map((h) => (
                    <th key={h} className="pb-3 pr-4 text-xs text-slate-400 font-medium uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30″>
                {CONTENT_ROWS.map((row) => {
                  const PIcon = PLATFORM_ICONS[row.platform] ?? FileText;
                  return (
                    <tr key={row.title} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 pr-4 text-white font-medium max-w-[220px] truncate">{row.title}</td>
                      <td className="py-3 pr-4″>
                        <div className="flex items-center gap-1.5 text-slate-300″>
                          <PIcon className="w-3.5 h-3.5″ />
                          {row.platform}
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-slate-400″>{row.date}</td>
                      <td className="py-3 pr-4 text-teal-400 font-semibold">{row.views}</td>
                      <td className="py-3 pr-4 text-green-400″>{row.engagement}</td>
                      <td className="py-3 text-amber-400 font-semibold">{row.revenue}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6″>
          {/* Platform Breakdown DonutChart */}
          <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6″>
            <h2 className="text-lg font-semibold text-white mb-5″>Platform Breakdown</h2>
            <div className="space-y-3″>
              {PLATFORM_BREAKDOWN.map((p) => {
                const PIcon = PLATFORM_ICONS[p.name] ?? FileText;
                return (
                  <div key={p.name} className="flex items-center gap-3″>
                    <div className="w-8 h-8 bg-slate-700/60 rounded-lg flex items-center justify-center flex-shrink-0″>
                      <PIcon className="w-4 h-4 text-slate-300″ />
                    </div>
                    <div className="flex-1″>
                      <div className="flex items-center justify-between mb-1″>
                        <span className="text-sm text-white">{p.name}</span>
                        <span className="text-sm font-semibold text-white">{p.pct}%</span>
                      </div>
                      <div className="w-full bg-slate-700/50 rounded-full h-2″>
                        <div
                          className="h-2 rounded-full transition-all duration-700″
                          style={{ width: `${p.pct}%`, backgroundColor: p.color }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700/40 grid grid-cols-2 gap-3″>
              {PLATFORM_BREAKDOWN.map((p) => (
                <div key={p.name} className="flex items-center gap-2″>
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0″ style={{ backgroundColor: p.color }} />
                  <span className="text-xs text-slate-400″>{p.name} — {p.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Audience Demographics */}
          <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6″>
            <h2 className="text-lg font-semibold text-white mb-5″>Audience Demographics</h2>
            <div className="grid grid-cols-2 gap-4″>
              {AUDIENCE_STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="bg-slate-800/50 rounded-xl p-4″>
                    <div className="flex items-center gap-2 mb-2″>
                      <Icon className={`w-4 h-4 ${stat.color}`} />
                      <span className="text-xs text-slate-400″>{stat.label}</span>
                    </div>
                    <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 bg-blue-900/20 border border-blue-700/40 rounded-xl p-4 text-sm text-blue-300″>
              67% of your audience works in or manages home services — high-intent audience for ProLnk platform ads.
            </div>
          </div>
        </div>

        {/* Sponsored Content */}
        <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6″>
          <div className="flex items-center justify-between mb-5″>
            <h2 className="text-lg font-semibold text-white">Sponsored Content</h2>
            <span className="text-sm text-green-400 font-semibold">$3,400 active deals</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4″>
            {SPONSORS.map((sponsor) => (
              <div key={sponsor.name} className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/40″>
                <div className="flex items-start justify-between mb-3″>
                  <div className="text-white font-semibold text-sm">{sponsor.name}</div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_STYLES[sponsor.status]}`}>
                    {sponsor.status}
                  </span>
                </div>
                <div className="text-2xl font-black text-green-400 mb-1″>{sponsor.deal}</div>
                <div className="text-xs text-slate-400 mb-3″>{sponsor.deliverables}</div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500″>
                  <Clock className="w-3 h-3″ />
                  Due {sponsor.due}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscriber Growth Chart */}
        <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6″>
          <div className="flex items-center justify-between mb-5″>
            <h2 className="text-lg font-semibold text-white">Subscriber Growth</h2>
            <span className="text-xs text-slate-400″>6-month trend</span>
          </div>
          <div className="h-52″>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={SUBSCRIBER_GROWTH} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3″ stroke="#1e2e45" />
                <XAxis dataKey="month" tick={{ fill: "#7a8ba8″, fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#7a8ba8″, fontSize: 12 }} axisLine={false} tickLine={false} width={50} />
                <Tooltip
                  contentStyle={{ background: "#0f1f38″, border: "1px solid #1e2e45", borderRadius: 8 }}
                  labelStyle={{ color: "#f0f4ff" }}
                  itemStyle={{ color: "#00d4ff" }}
                />
                <Line
                  type="monotone"
                  dataKey="subs"
                  stroke="#00d4ff"
                  strokeWidth={2.5}
                  dot={{ fill: "#00d4ff", strokeWidth: 0, r: 4 }}
                  name="Subscribers"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Performing Content */}
        <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6″>
          <div className="flex items-center gap-3 mb-5″>
            <Star className="w-5 h-5 text-amber-400″ />
            <h2 className="text-lg font-semibold text-white">Top Performing Content</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4″>
            {TOP_CONTENT.map((item, idx) => {
              const PIcon = PLATFORM_ICONS[item.platform] ?? FileText;
              return (
                <div key={item.title} className="bg-slate-800/50 rounded-xl overflow-hidden">
                  {/* Thumbnail placeholder */}
                  <div className="w-full h-32 bg-slate-700/60 flex items-center justify-center relative">
                    <PIcon className="w-8 h-8 text-slate-500″ />
                    {idx === 0 && (
                      <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                        #1
                      </div>
                    )}
                  </div>
                  <div className="p-4″>
                    <div className="text-white text-sm font-medium mb-2 leading-tight">{item.title}</div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-teal-400″>
                        <Eye className="w-3 h-3″ />
                        {item.views} views
                      </div>
                      <button
                        onClick={() => setRepurposed((prev) => ({ ...prev, [idx]: true }))}
                        className={`text-xs px-3 py-1 rounded-lg font-medium transition-colors ${
                          repurposed[idx]
                            ? "bg-green-900/40 text-green-400″
                            : "bg-teal-700/40 hover:bg-teal-700/60 text-teal-300″
                        }`}
                      >
                        {repurposed[idx] ? (
                          <span className="flex items-center gap-1″><CheckCircle className="w-3 h-3" /> Queued</span>
                        ) : (
                          <span className="flex items-center gap-1″><RefreshCw className="w-3 h-3" /> Repurpose</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
