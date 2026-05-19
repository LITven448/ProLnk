import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import {
  Link2, Copy, CheckCircle, TrendingUp, Users, DollarSign,
  Plus, Share2, BarChart3, Zap, Home,
} from "lucide-react";

const LINKS = [
  {
    label: "Main Referral",
    url: "prolnk.io/join?ref=marcus-hvac",
    clicks: 247,
    signups: 18,
    earned: 2682,
    color: "#0EA5E9″,
    icon: Link2,
  },
  {
    label: "Custom Campaign",
    url: "prolnk.io/join?ref=marcus-storm",
    clicks: 34,
    signups: 4,
    earned: 596,
    color: "#8B5CF6″,
    icon: Zap,
  },
  {
    label: "Homeowner Link",
    url: "trustypro.io/join?ref=marcus",
    clicks: 89,
    signups: 12,
    earned: null,
    color: "#10B981″,
    icon: Home,
    homeowners: 12,
  },
];

const CLICKS_DATA = [
  { day: "May 1″,  clicks: 8 },
  { day: "May 2″,  clicks: 14 },
  { day: "May 3″,  clicks: 7 },
  { day: "May 4″,  clicks: 21 },
  { day: "May 5″,  clicks: 18 },
  { day: "May 6″,  clicks: 31 },
  { day: "May 7″,  clicks: 25 },
  { day: "May 8″,  clicks: 12 },
  { day: "May 9″,  clicks: 9 },
  { day: "May 10″, clicks: 17 },
  { day: "May 11″, clicks: 24 },
  { day: "May 12″, clicks: 30 },
  { day: "May 13″, clicks: 22 },
  { day: "May 14″, clicks: 19 },
];

const TRAFFIC = [
  { name: "Facebook",  value: 42, color: "#1B74E4″ },
  { name: "Text/SMS",  value: 28, color: "#10B981″ },
  { name: "LinkedIn",  value: 18, color: "#0A66C2″ },
  { name: "Other",     value: 12, color: "#94A3B8″ },
];

const TOP_MESSAGES = [
  {
    platform: "Facebook",
    preview: "Just had my second water heater install this week through ProLnk. The system keeps sending me quality leads 🔥",
    signups: 9,
    clicks: 68,
  },
  {
    platform: "SMS",
    preview: "Hey — I've been using ProLnk for leads and made $2K last month passively. Here's my link if you want in:",
    signups: 6,
    clicks: 31,
  },
  {
    platform: "LinkedIn",
    preview: "Contractors: I added a 5th income stream to my HVAC business this year without doing extra work. Here's how →",
    signups: 4,
    clicks: 44,
  },
];

const SHARE_POST = `This month I earned $247 passively from my ProLnk network — 8 people working for my income!`;

export default function ReferralLinkManager() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [campaign, setCampaign] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [shareCopied, setShareCopied] = useState(false);

  function copyLink(url: string, idx: number) {
    navigator.clipboard.writeText(`https://${url}`);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1800);
    toast.success("Link copied!");
  }

  function generateLink() {
    if (!campaign.trim()) return;
    const slug = campaign.trim().toLowerCase().replace(/\s+/g, "-");
    setGeneratedUrl(`prolnk.io/join?ref=marcus-${slug}`);
    toast.success("Custom link generated!");
  }

  function copySharePost() {
    navigator.clipboard.writeText(SHARE_POST);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
    toast.success("Post copied!");
  }

  return (
    <div className="min-h-screen bg-[#0A1628] pb-16 text-white">

      {/* Header */}
      <div className="px-6 py-8 border-b border-white/10″>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-1″>
            <Link2 size={26} className="text-cyan-400″ />
            <h1 className="text-3xl font-bold">Referral Link Manager</h1>
          </div>
          <p className="text-slate-400″>Every click, every signup, every dollar</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-8 space-y-8″>

        {/* Your Links */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2″>
            <Link2 size={18} className="text-cyan-400″ /> Your Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4″>
            {LINKS.map((link, i) => {
              const Icon = link.icon;
              return (
                <div key={i}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition-colors">
                  <div className="flex items-center gap-2 mb-3″>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: `${link.color}20` }}>
                      <Icon size={18} style={{ color: link.color }} />
                    </div>
                    <span className="font-semibold text-sm">{link.label}</span>
                  </div>
                  <div className="bg-black/30 rounded-lg px-3 py-2 flex items-center justify-between gap-2 mb-4″>
                    <span className="text-xs text-slate-300 truncate flex-1″>{link.url}</span>
                    <button onClick={() => copyLink(link.url, i)}
                      className="shrink-0 text-slate-400 hover:text-white transition-colors">
                      {copiedIdx === i
                        ? <CheckCircle size={15} className="text-emerald-400″ />
                        : <Copy size={15} />}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-white/5 rounded-xl py-2″>
                      <p className="text-lg font-bold" style={{ color: link.color }}>{link.clicks}</p>
                      <p className="text-xs text-slate-500″>Clicks</p>
                    </div>
                    <div className="bg-white/5 rounded-xl py-2″>
                      <p className="text-lg font-bold text-white">{link.signups ?? link.homeowners}</p>
                      <p className="text-xs text-slate-500″>{link.homeowners ? "Homeowners" : "Signups"}</p>
                    </div>
                  </div>
                  {link.earned !== null && (
                    <div className="mt-3 text-center bg-emerald-500/10 border border-emerald-500/20 rounded-xl py-2″>
                      <p className="text-emerald-400 font-bold">${link.earned.toLocaleString()}</p>
                      <p className="text-xs text-slate-500″>Earned</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Analytics + Traffic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6″>
          <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-5″>
            <p className="font-semibold mb-4 flex items-center gap-2 text-sm">
              <BarChart3 size={16} className="text-cyan-400″ /> Clicks — Last 14 Days
            </p>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={CLICKS_DATA} margin={{ top: 0, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3″ stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="day" tick={{ fill: "#64748B", fontSize: 10 }}
                  tickFormatter={(v) => v.replace("May ", "")} />
                <YAxis tick={{ fill: "#64748B", fontSize: 10 }} />
                <Tooltip contentStyle={{ background: "#1E293B", border: "none", borderRadius: 8, color: "#fff" }} />
                <Line type="monotone" dataKey="clicks" stroke="#0EA5E9″ strokeWidth={2}
                  dot={false} activeDot={{ r: 4, fill: "#0EA5E9″ }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5″>
            <p className="font-semibold mb-4 text-sm flex items-center gap-2″>
              <TrendingUp size={16} className="text-cyan-400″ /> Traffic Sources
            </p>
            <ResponsiveContainer width="100%" height={130}>
              <PieChart>
                <Pie data={TRAFFIC} cx="50%" cy="50%" innerRadius={36} outerRadius={56}
                  dataKey="value" paddingAngle={3}>
                  {TRAFFIC.map((t, i) => <Cell key={i} fill={t.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1 mt-2″>
              {TRAFFIC.map((t) => (
                <div key={t.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5″>
                    <div className="w-2 h-2 rounded-full" style={{ background: t.color }} />
                    <span className="text-slate-400″>{t.name}</span>
                  </div>
                  <span className="font-semibold">{t.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Converting Messages */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2″>
            <Share2 size={18} className="text-cyan-400″ /> Top Converting Messages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4″>
            {TOP_MESSAGES.map((msg, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4″>
                <div className="flex items-center justify-between mb-3″>
                  <Badge className="bg-white/10 text-slate-300 border-none text-xs">{msg.platform}</Badge>
                  <div className="flex items-center gap-2 text-xs text-slate-400″>
                    <Users size={12} />
                    <span className="text-emerald-400 font-bold">{msg.signups}</span>
                    <span>signups</span>
                  </div>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed italic">"{msg.preview}"</p>
                <p className="text-xs text-slate-500 mt-2″>{msg.clicks} clicks</p>
              </div>
            ))}
          </div>
        </section>

        {/* Create Custom Link */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6″>
          <h2 className="font-semibold mb-4 flex items-center gap-2 text-sm">
            <Plus size={16} className="text-cyan-400″ /> Create Custom Link
          </h2>
          <div className="flex gap-3 items-center flex-wrap">
            <div className="flex-1 min-w-[180px]">
              <Input value={campaign} onChange={(e) => setCampaign(e.target.value)}
                placeholder="Campaign name (e.g. spring-promo)"
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 rounded-xl" />
            </div>
            <Button onClick={generateLink}
              className="bg-cyan-500 hover:bg-cyan-400 text-white rounded-xl gap-2″>
              <Zap size={15} /> Generate Link
            </Button>
          </div>
          {generatedUrl && (
            <div className="mt-4 bg-black/30 border border-cyan-500/30 rounded-xl px-4 py-3 flex items-center justify-between">
              <span className="text-cyan-300 text-sm">{generatedUrl}</span>
              <button onClick={() => { navigator.clipboard.writeText(`https://${generatedUrl}`); toast.success("Copied!"); }}
                className="text-slate-400 hover:text-white ml-3″>
                <Copy size={15} />
              </button>
            </div>
          )}
        </section>

        {/* Share This Month's Results */}
        <section className="bg-gradient-to-r from-[#1E3A5F] to-[#0A1628] border border-white/10 rounded-2xl p-6″>
          <div className="flex items-center gap-3 mb-3″>
            <DollarSign size={20} className="text-emerald-400″ />
            <h2 className="font-semibold">Share This Month's Results</h2>
          </div>
          <p className="text-slate-300 text-sm italic mb-4″>"{SHARE_POST}"</p>
          <Button onClick={copySharePost}
            variant="outline" className="border-white/20 text-white hover:bg-white/10 gap-2 rounded-xl">
            {shareCopied ? <CheckCircle size={15} className="text-emerald-400″ /> : <Copy size={15} />}
            {shareCopied ? "Copied!" : "Copy Post"}
          </Button>
        </section>

      </div>
    </div>
  );
}
