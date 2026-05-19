import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  Users, DollarSign, TrendingUp, UserPlus, Link2, Copy, Share2,
  CheckCircle, Clock,
} from "lucide-react";
import { toast } from "sonner";

const CHART_DATA = [
  { month: "Dec", direct: 2, total: 4 },
  { month: "Jan", direct: 4, total: 8 },
  { month: "Feb", direct: 5, total: 11 },
  { month: "Mar", direct: 6, total: 15 },
  { month: "Apr", direct: 7, total: 21 },
  { month: "May", direct: 8, total: 23 },
];

interface Recruit {
  id: number;
  name: string;
  trade: string;
  joinDate: string;
  status: "Active" | "Inactive";
  jobsThisMonth: number;
}

const RECRUITS: Recruit[] = [
  { id: 1, name: "Marcus D.", trade: "HVAC", joinDate: "Dec 14, 2025", status: "Active", jobsThisMonth: 6 },
  { id: 2, name: "Tonya S.", trade: "Plumbing", joinDate: "Jan 3, 2026", status: "Active", jobsThisMonth: 4 },
  { id: 3, name: "Brett K.", trade: "Electrical", joinDate: "Jan 19, 2026", status: "Inactive", jobsThisMonth: 0 },
  { id: 4, name: "Alicia H.", trade: "Roofing", joinDate: "Feb 7, 2026", status: "Active", jobsThisMonth: 8 },
  { id: 5, name: "Dante W.", trade: "Flooring", joinDate: "Feb 22, 2026", status: "Active", jobsThisMonth: 3 },
  { id: 6, name: "Carmen R.", trade: "Landscaping", joinDate: "Mar 10, 2026", status: "Active", jobsThisMonth: 5 },
  { id: 7, name: "Phil N.", trade: "Painting", joinDate: "Mar 28, 2026", status: "Active", jobsThisMonth: 2 },
  { id: 8, name: "Yolanda T.", trade: "Pest Control", joinDate: "May 2, 2026", status: "Active", jobsThisMonth: 1 },
];

interface TreeNode {
  name: string;
  trade: string;
  subs?: { name: string; trade: string }[];
}

const TREE_NODES: TreeNode[] = [
  { name: "Marcus D.", trade: "HVAC", subs: [{ name: "Leo V.", trade: "Plumbing" }, { name: "Nina P.", trade: "Electrical" }] },
  { name: "Tonya S.", trade: "Plumbing", subs: [{ name: "Sam O.", trade: "HVAC" }] },
  { name: "Alicia H.", trade: "Roofing", subs: [{ name: "Kim J.", trade: "Roofing" }, { name: "Rex C.", trade: "Siding" }] },
];

const REFERRAL_LINK = "https://prolnk.io/join?ref=PARTNER123";

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="w-full bg-slate-800 rounded-full h-2">
      <div className="h-2 rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

export default function NetworkGrowthTracker() {
  const [copied, setCopied] = useState(false);

  function copyLink() {
    navigator.clipboard.writeText(REFERRAL_LINK).catch(() => {});
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-[#0A1628] text-white pb-16">
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-blue-400 mb-3">
            <TrendingUp className="w-4 h-4" />
            <span>Partner Dashboard</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Network Growth</h1>
          <p className="text-slate-400 mt-1">Your passive income engine</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Network", value: "23", icon: Users, color: "#3b82f6" },
            { label: "Direct Recruits", value: "8", icon: UserPlus, color: "#F5E642" },
            { label: "Added This Month", value: "1", icon: TrendingUp, color: "#22c55e" },
            { label: "Network Earnings", value: "$247", icon: DollarSign, color: "#a855f7" },
          ].map((s) => (
            <Card key={s.label} className="bg-[#111C2E] border border-slate-700/50">
              <CardContent className="p-5">
                <s.icon className="w-5 h-5 mb-3" style={{ color: s.color }} />
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-slate-400 mt-1">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Growth Chart */}
        <Card className="bg-[#111C2E] border border-slate-700/50 mb-10">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-white mb-5">Network Growth (6 Months)</h2>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={CHART_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gDirect" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F5E642" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#F5E642" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ background: "#111C2E", border: "1px solid #1e3a5f", borderRadius: 8 }}
                  labelStyle={{ color: "#94a3b8" }}
                />
                <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
                <Area type="monotone" dataKey="total" name="Total Network" stroke="#3b82f6" fill="url(#gTotal)" strokeWidth={2} />
                <Area type="monotone" dataKey="direct" name="Direct Recruits" stroke="#F5E642" fill="url(#gDirect)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recruit Timeline */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-5">Recruit Timeline</h2>
          <div className="relative pl-6 space-y-0">
            <div className="absolute left-2 top-2 bottom-2 w-px bg-slate-700" />
            {RECRUITS.map((r) => (
              <div key={r.id} className="relative flex items-start gap-4 pb-5">
                <div className="absolute left-[-17px] top-1 w-3 h-3 rounded-full border-2 border-blue-500 bg-[#0A1628]" />
                <div className="flex-1 bg-[#111C2E] border border-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <span className="font-semibold text-white">{r.name}</span>
                      <span className="text-xs text-slate-400 ml-2">{r.trade}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={r.status === "Active"
                        ? "bg-green-900/40 text-green-300 border-0 text-xs"
                        : "bg-slate-700 text-slate-400 border-0 text-xs"}>
                        {r.status === "Active" ? <CheckCircle className="w-3 h-3 mr-1 inline" /> : <Clock className="w-3 h-3 mr-1 inline" />}
                        {r.status}
                      </Badge>
                      <span className="text-xs text-slate-500">{r.joinDate}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {r.jobsThisMonth > 0 ? `${r.jobsThisMonth} jobs this month` : "No jobs this month"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Network Tree */}
        <Card className="bg-[#111C2E] border border-slate-700/50 mb-10">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-white mb-5">Network Tree</h2>
            <div className="overflow-x-auto">
              <div className="flex flex-col items-center min-w-[480px]">
                {/* You */}
                <div className="bg-blue-600 text-white rounded-lg px-5 py-2 text-sm font-bold mb-4">
                  You
                </div>
                {/* Connector */}
                <div className="w-px h-4 bg-slate-600" />
                {/* Level 1 */}
                <div className="flex gap-6 mb-4">
                  {TREE_NODES.map((node) => (
                    <div key={node.name} className="flex flex-col items-center">
                      <div className="bg-[#1e2d4a] border border-blue-700/40 rounded-lg px-4 py-2 text-xs text-center mb-1">
                        <p className="font-semibold text-white">{node.name}</p>
                        <p className="text-slate-400">{node.trade}</p>
                      </div>
                      <div className="w-px h-3 bg-slate-600" />
                      {/* Level 2 */}
                      {node.subs && (
                        <div className="flex gap-3">
                          {node.subs.map((sub) => (
                            <div key={sub.name} className="bg-slate-800/60 border border-slate-600/40 rounded-lg px-3 py-1.5 text-xs text-center">
                              <p className="font-medium text-slate-200">{sub.name}</p>
                              <p className="text-slate-500">{sub.trade}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Growth Goals */}
        <Card className="bg-[#111C2E] border border-slate-700/50 mb-10">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-white mb-5">Growth Goals</h2>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-200">Reach 10 direct recruits</span>
                  <span className="text-yellow-400 font-semibold">8 / 10 (80%)</span>
                </div>
                <ProgressBar value={8} max={10} color="#F5E642" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-200">Reach 50 total network</span>
                  <span className="text-blue-400 font-semibold">23 / 50 (46%)</span>
                </div>
                <ProgressBar value={23} max={50} color="#3b82f6" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recruitment Activity */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Recruitment Activity — This Month</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Card className="bg-[#111C2E] border border-slate-700/50">
              <CardContent className="p-5 text-center">
                <p className="text-3xl font-bold text-white mb-1">2</p>
                <p className="text-xs text-slate-400">Link shares sent</p>
              </CardContent>
            </Card>
            <Card className="bg-[#111C2E] border border-slate-700/50">
              <CardContent className="p-5 text-center">
                <p className="text-3xl font-bold text-green-400 mb-1">1</p>
                <p className="text-xs text-slate-400">Converted</p>
              </CardContent>
            </Card>
            <Card className="bg-[#111C2E] border border-slate-700/50">
              <CardContent className="p-5 text-center">
                <p className="text-3xl font-bold text-yellow-400 mb-1">50%</p>
                <p className="text-xs text-slate-400">Conversion rate</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recruit Actions */}
        <Card className="bg-gradient-to-r from-blue-900/30 to-slate-800/30 border border-blue-700/30">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-white mb-2">Grow Your Network</h2>
            <p className="text-sm text-slate-400 mb-5">
              You're 2 recruits from Tier 3. Every new pro in your network compounds your passive income.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={copyLink}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {copied ? <CheckCircle className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied ? "Copied!" : "Copy Referral Link"}
              </Button>
              <Button
                onClick={() => toast.success("Invitation text copied to clipboard")}
                className="bg-slate-700 hover:bg-slate-600 text-slate-200"
              >
                <Link2 className="w-4 h-4 mr-2" /> Copy Invite Text
              </Button>
              <Button className="bg-slate-700 hover:bg-slate-600 text-slate-200">
                <Share2 className="w-4 h-4 mr-2" /> View Social Kit
              </Button>
            </div>
            <div className="mt-4 p-3 bg-slate-800/60 rounded-lg text-xs text-slate-400 font-mono break-all">
              {REFERRAL_LINK}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
