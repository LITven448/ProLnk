import React from 'react';
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp, TrendingDown, Search, Globe, BarChart3, Link2,
  ArrowUpRight, ArrowDownRight, Minus, Plus, Eye, MousePointerClick,
  Target, ExternalLink,
} from "lucide-react";

interface Keyword {
  keyword: string;
  volume: number;
  position: number;
  clicks: number;
  impressions: number;
  change: number;
}

interface LandingPage {
  path: string;
  visits: number;
  bounce: string;
  avgTime: string;
}

interface Opportunity {
  keyword: string;
  volume: number;
  difficulty: "Low" | "Medium";
  intent: string;
}

const TOP_KEYWORDS: Keyword[] = [
  { keyword: "trustypro.io", volume: 1200, position: 1, clicks: 890, impressions: 1100, change: 0 },
  { keyword: "prolnk review", volume: 880, position: 3, clicks: 340, impressions: 820, change: 2 },
  { keyword: "home services DFW", volume: 3400, position: 7, clicks: 210, impressions: 2900, change: 4 },
  { keyword: "prolnk.io", volume: 950, position: 2, clicks: 780, impressions: 940, change: 1 },
  { keyword: "HouseCall Pro alternative", volume: 2200, position: 12, clicks: 95, impressions: 1800, change: -2 },
  { keyword: "licensed HVAC Frisco TX", volume: 1100, position: 14, clicks: 62, impressions: 940, change: 3 },
  { keyword: "home repair Dallas", volume: 5400, position: 18, clicks: 41, impressions: 4200, change: -1 },
  { keyword: "find plumber near me DFW", volume: 2800, position: 22, clicks: 29, impressions: 2100, change: 5 },
  { keyword: "home service network income", volume: 440, position: 5, clicks: 180, impressions: 390, change: 7 },
  { keyword: "pro referral platform Texas", volume: 680, position: 9, clicks: 88, impressions: 620, change: 2 },
];

const LANDING_PAGES: LandingPage[] = [
  { path: "/", visits: 2840, bounce: "38%", avgTime: "2:14″ },
  { path: "/founding-partner", visits: 1620, bounce: "29%", avgTime: "3:42″ },
  { path: "/for-pros", visits: 1180, bounce: "44%", avgTime: "1:58″ },
  { path: "/trustypro", visits: 890, bounce: "33%", avgTime: "2:31″ },
  { path: "/homeowner", visits: 720, bounce: "51%", avgTime: "1:22″ },
];

const OPPORTUNITIES: Opportunity[] = [
  { keyword: "home repair Frisco TX", volume: 1900, difficulty: "Low", intent: "Transactional" },
  { keyword: "licensed HVAC DFW", volume: 1400, difficulty: "Low", intent: "Transactional" },
  { keyword: "ServiceTitan alternative 2025″, volume: 960, difficulty: "Medium", intent: "Commercial" },
  { keyword: "home service referral program", volume: 720, difficulty: "Low", intent: "Informational" },
  { keyword: "find electrician Allen TX", volume: 880, difficulty: "Low", intent: "Transactional" },
];

function ChangeChip({ change }: { change: number }) {
  if (change > 0)
    return (
      <span className="flex items-center gap-0.5 text-green-400 text-xs font-medium">
        <ArrowUpRight className="w-3 h-3″ />+{change}
      </span>
    );
  if (change < 0)
    return (
      <span className="flex items-center gap-0.5 text-red-400 text-xs font-medium">
        <ArrowDownRight className="w-3 h-3″ />{change}
      </span>
    );
  return <Minus className="w-3 h-3 text-slate-500″ />;
}

function StatCard({
  label,
  value,
  sub,
  icon,
  color = "text-teal-400″,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ReactNode;
  color?: string;
}) {
  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700″>
      <div className="flex items-center justify-between mb-3″>
        <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">{label}</span>
        <div className={`w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
      <p className={`text-3xl font-black ${color}`}>{value}</p>
      {sub && <p className="text-xs text-slate-500 mt-1″>{sub}</p>}
    </div>
  );
}

export default function SEODashboard() {
  const [activeTab, setActiveTab] = useState<"keywords" | "pages" | "opportunities">("keywords");

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8″>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-white">SEO Dashboard</h1>
            <p className="text-slate-400 mt-1″>Organic growth engine</p>
          </div>
          <div className="flex items-center gap-2″>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-sm">Live data</span>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4″>
          <StatCard
            label="Monthly Organic"
            value="8,400″
            sub="+12% vs last month"
            icon={<Globe className="w-4 h-4″ />}
            color="text-teal-400″
          />
          <StatCard
            label="Top 10 Keywords"
            value="47″
            sub="3 new this week"
            icon={<Search className="w-4 h-4″ />}
            color="text-blue-400″
          />
          <StatCard
            label="Avg Position"
            value="18.4″
            sub="↑ from 21.2 last month"
            icon={<BarChart3 className="w-4 h-4″ />}
            color="text-purple-400″
          />
          <StatCard
            label="Click-Through Rate"
            value="3.2%"
            sub="Industry avg: 2.1%"
            icon={<MousePointerClick className="w-4 h-4″ />}
            color="text-amber-400″
          />
        </div>

        {/* Backlink Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4″>
          {[
            { label: "Total Backlinks", value: "847″, icon: <Link2 className="w-4 h-4" />, color: "text-teal-400" },
            { label: "Referring Domains", value: "34″, icon: <Globe className="w-4 h-4" />, color: "text-blue-400" },
            { label: "Domain Authority", value: "DA 24″, icon: <TrendingUp className="w-4 h-4" />, color: "text-green-400" },
          ].map((s) => (
            <Card key={s.label} className="bg-slate-800 border-slate-700″>
              <CardContent className="p-4 flex items-center gap-4″>
                <div className={`w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center ${s.color}`}>
                  {s.icon}
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">{s.label}</p>
                  <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Competitor Gap Alert */}
        <Card className="bg-amber-950/30 border-amber-600/40″>
          <CardContent className="p-5″>
            <div className="flex items-start gap-3″>
              <Target className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0″ />
              <div className="flex-1″>
                <h3 className="text-white font-bold mb-1″>Competitor Gap Analysis</h3>
                <p className="text-slate-300 text-sm">
                  HomeAdvisor ranks for <span className="text-amber-300 font-bold">2,400 more keywords</span> than ProLnk.
                  Priority targets: &ldquo;HVAC contractor Dallas&rdquo;, &ldquo;electrician Allen TX&rdquo;,
                  &ldquo;plumber Frisco TX&rdquo;, &ldquo;home remodel quotes DFW&rdquo;,
                  &ldquo;roof repair Plano&rdquo;.
                </p>
              </div>
              <Button size="sm" variant="outline" className="border-amber-600/50 text-amber-400 hover:bg-amber-950/50 whitespace-nowrap">
                View All 10
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <div className="flex gap-1 bg-slate-800 rounded-xl p-1 w-fit border border-slate-700″>
          {(["keywords", "pages", "opportunities"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                activeTab === tab
                  ? "bg-teal-500 text-black"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Keywords Tab */}
        {activeTab === "keywords" && (
          <Card className="bg-slate-800 border-slate-700″>
            <CardContent className="p-0″>
              <div className="p-5 border-b border-slate-700″>
                <h2 className="text-white font-bold">Top Performing Keywords</h2>
                <p className="text-slate-400 text-sm mt-0.5″>Top 10 by organic clicks — last 28 days</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-400 border-b border-slate-700 text-xs uppercase tracking-wide">
                      <th className="px-5 py-3 font-medium">Keyword</th>
                      <th className="px-5 py-3 font-medium text-right">Volume</th>
                      <th className="px-5 py-3 font-medium text-right">Position</th>
                      <th className="px-5 py-3 font-medium text-right">Clicks</th>
                      <th className="px-5 py-3 font-medium text-right">Impressions</th>
                      <th className="px-5 py-3 font-medium text-center">Change</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50″>
                    {TOP_KEYWORDS.map((kw) => (
                      <tr key={kw.keyword} className="hover:bg-slate-700/30 transition-colors">
                        <td className="px-5 py-3 text-white font-medium">{kw.keyword}</td>
                        <td className="px-5 py-3 text-slate-400 text-right">{kw.volume.toLocaleString()}</td>
                        <td className="px-5 py-3 text-right">
                          <span
                            className={`font-mono font-bold ${
                              kw.position <= 3
                                ? "text-green-400″
                                : kw.position <= 10
                                ? "text-teal-400″
                                : kw.position <= 20
                                ? "text-amber-400″
                                : "text-slate-400″
                            }`}
                          >
                            #{kw.position}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-slate-300 text-right">{kw.clicks.toLocaleString()}</td>
                        <td className="px-5 py-3 text-slate-400 text-right">{kw.impressions.toLocaleString()}</td>
                        <td className="px-5 py-3 text-center">
                          <div className="flex justify-center">
                            <ChangeChip change={kw.change} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pages Tab */}
        {activeTab === "pages" && (
          <Card className="bg-slate-800 border-slate-700″>
            <CardContent className="p-0″>
              <div className="p-5 border-b border-slate-700″>
                <h2 className="text-white font-bold">Top Landing Pages by Traffic</h2>
                <p className="text-slate-400 text-sm mt-0.5″>Organic sessions — last 28 days</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-400 border-b border-slate-700 text-xs uppercase tracking-wide">
                      <th className="px-5 py-3 font-medium">Page</th>
                      <th className="px-5 py-3 font-medium text-right">Visits</th>
                      <th className="px-5 py-3 font-medium text-right">Bounce Rate</th>
                      <th className="px-5 py-3 font-medium text-right">Avg Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50″>
                    {LANDING_PAGES.map((pg) => (
                      <tr key={pg.path} className="hover:bg-slate-700/30 transition-colors">
                        <td className="px-5 py-3 text-teal-400 font-mono flex items-center gap-2″>
                          {pg.path}
                          <ExternalLink className="w-3 h-3 text-slate-500″ />
                        </td>
                        <td className="px-5 py-3 text-white text-right font-bold">{pg.visits.toLocaleString()}</td>
                        <td className="px-5 py-3 text-right">
                          <span className={parseFloat(pg.bounce) > 45 ? "text-red-400″ : "text-green-400"}>
                            {pg.bounce}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-slate-300 text-right">{pg.avgTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Opportunities Tab */}
        {activeTab === "opportunities" && (
          <Card className="bg-slate-800 border-slate-700″>
            <CardContent className="p-0″>
              <div className="p-5 border-b border-slate-700″>
                <h2 className="text-white font-bold">Keyword Opportunities</h2>
                <p className="text-slate-400 text-sm mt-0.5″>High volume, low competition — we don't rank yet</p>
              </div>
              <div className="divide-y divide-slate-700/50″>
                {OPPORTUNITIES.map((opp) => (
                  <div key={opp.keyword} className="px-5 py-4 flex items-center gap-4 hover:bg-slate-700/20 transition-colors">
                    <div className="flex-1″>
                      <p className="text-white font-medium">{opp.keyword}</p>
                      <div className="flex items-center gap-3 mt-1″>
                        <span className="text-xs text-slate-400″>
                          <Eye className="w-3 h-3 inline mr-1″ />
                          {opp.volume.toLocaleString()}/mo
                        </span>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            opp.difficulty === "Low"
                              ? "border-green-500/40 text-green-400″
                              : "border-amber-500/40 text-amber-400″
                          }`}
                        >
                          {opp.difficulty} competition
                        </Badge>
                        <Badge variant="outline" className="text-xs border-blue-500/40 text-blue-400″>
                          {opp.intent}
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm" className="bg-teal-500/20 text-teal-400 border border-teal-500/40 hover:bg-teal-500/30 flex items-center gap-1.5″>
                      <Plus className="w-3 h-3″ />
                      Create content
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
