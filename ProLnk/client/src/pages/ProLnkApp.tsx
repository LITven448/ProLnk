import React from 'react';
import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  Smartphone, Bell, Briefcase, BarChart2, CloudLightning,
  Apple, Play, ArrowRight, CheckCircle, Star, Zap,
  DollarSign, Camera, Users, ChevronRight,
} from "lucide-react";

const FEATURES = [
  {
    icon: <Bell className="w-6 h-6 text-[#0A1628]" />,
    title: "Live Lead Alerts",
    description: "Get push notifications the moment a homeowner in your area submits a job. First to respond wins the lead — speed matters.",
    color: "bg-amber-50 border-amber-100",
    iconBg: "bg-amber-100",
  },
  {
    icon: <Briefcase className="w-6 h-6 text-[#0A1628]" />,
    title: "Log Jobs Instantly",
    description: "Capture before/after photos, add job notes, and submit AI-detected referral opportunities — all in under 60 seconds.",
    color: "bg-blue-50 border-blue-100",
    iconBg: "bg-blue-100",
  },
  {
    icon: <BarChart2 className="w-6 h-6 text-[#0A1628]" />,
    title: "Network Dashboard",
    description: "Track your referral earnings, monitor your tier progress, and see your entire 4-level network income in real time.",
    color: "bg-emerald-50 border-emerald-100",
    iconBg: "bg-emerald-100",
  },
  {
    icon: <CloudLightning className="w-6 h-6 text-[#0A1628]" />,
    title: "Storm Scan AI",
    description: "After severe weather events, get instant push alerts with damage hotspots in your territory — so you can reach homeowners first.",
    color: "bg-purple-50 border-purple-100",
    iconBg: "bg-purple-100",
  },
];

const TRADES = [
  "Roofing", "HVAC", "Plumbing", "Electrical", "Landscaping",
  "Painting", "Flooring", "Windows", "General Contractor", "Other",
];

interface WaitlistForm {
  name: string;
  email: string;
  phone: string;
  trade: string;
}

export default function ProLnkApp() {
  const [, navigate] = useLocation();
  const [form, setForm] = useState<WaitlistForm>({ name: "", email: "", phone: "", trade: "" });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.waitlist.joinSimpleWaitlist.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("You're on the early access list!");
    },
    onError: () => {
      toast.error("Something went wrong. Try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Name and email are required.");
      return;
    }
    submitMutation.mutate({
      name: form.name,
      email: form.email,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0A1628] flex items-center justify-center">
              <Zap className="w-4 h-4 text-[#F5E642]" />
            </div>
            <span className="font-black text-gray-900 text-lg tracking-tight">ProLnk</span>
          </button>
          <Button size="sm" onClick={() => navigate("/pro-waitlist")} className="bg-[#0A1628] text-white hover:bg-[#1a2d4a]">
            Join Waitlist
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <Badge className="mb-6 bg-[#F5E642] text-[#0A1628] border-0 font-semibold px-4 py-1.5 text-sm">
          Coming Q3 2026
        </Badge>
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
          ProLnk Mobile —<br />
          <span className="text-[#0A1628]">Your business in your pocket.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Get live lead alerts, log jobs on-site, monitor your network earnings, and run Storm Scan AI — all from your phone. Launching iOS and Android in Q3 2026.
        </p>

        {/* App store badges */}
        <div className="flex items-center justify-center gap-4 mb-16 flex-wrap">
          <div className="flex items-center gap-2.5 px-5 py-3 bg-gray-900 rounded-xl text-white">
            <Apple className="w-5 h-5" />
            <div className="text-left">
              <div className="text-xs text-gray-400 leading-none">Coming to</div>
              <div className="font-bold text-sm leading-tight">App Store</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5 px-5 py-3 bg-gray-900 rounded-xl text-white">
            <Play className="w-5 h-5" />
            <div className="text-left">
              <div className="text-xs text-gray-400 leading-none">Coming to</div>
              <div className="font-bold text-sm leading-tight">Google Play</div>
            </div>
          </div>
        </div>

        {/* Mock phone UI */}
        <div className="inline-block relative">
          <div className="w-64 bg-[#0A1628] rounded-[2.5rem] p-3 shadow-2xl mx-auto">
            <div className="w-20 h-1.5 bg-gray-700 rounded-full mx-auto mb-3" />
            <div className="bg-gray-950 rounded-[2rem] overflow-hidden">
              {/* Phone status bar */}
              <div className="bg-[#0A1628] px-4 py-2 flex justify-between items-center text-white text-xs">
                <span className="font-semibold">9:41</span>
                <div className="flex gap-1">
                  <div className="w-3.5 h-2 border border-white rounded-sm overflow-hidden flex">
                    <div className="flex-1 bg-white opacity-60" />
                    <div className="w-0.5 bg-white rounded-r-sm" />
                  </div>
                </div>
              </div>
              {/* App header */}
              <div className="bg-[#0A1628] px-4 pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-xs font-bold">ProLnk</p>
                    <p className="text-[#F5E642] text-xs">3 new leads nearby</p>
                  </div>
                  <div className="relative">
                    <Bell className="w-5 h-5 text-white" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#F5E642] rounded-full" />
                  </div>
                </div>
              </div>
              {/* App content */}
              <div className="bg-gray-50 px-3 py-3 space-y-2">
                {/* Today stat */}
                <div className="bg-white rounded-xl p-3 flex justify-between items-center shadow-sm">
                  <div>
                    <p className="text-xs text-gray-500">Today's earnings</p>
                    <p className="text-lg font-black text-[#0A1628]">$284</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-emerald-500" />
                </div>
                {/* Lead alert */}
                <div className="bg-[#F5E642]/20 border border-[#F5E642] rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Bell className="w-3 h-3 text-[#0A1628]" />
                    <span className="text-xs font-bold text-[#0A1628]">New Lead — 2.1 mi</span>
                  </div>
                  <p className="text-xs text-gray-600">HVAC repair · Frisco, TX</p>
                  <p className="text-xs font-semibold text-[#0A1628] mt-1">Est. $950 · Claim now →</p>
                </div>
                {/* Jobs today */}
                <div className="bg-white rounded-xl p-3 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold text-gray-700">Jobs Today</p>
                    <span className="text-xs text-emerald-600 font-semibold">3/4 done</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-emerald-500 rounded-full" />
                  </div>
                </div>
              </div>
              {/* Bottom tab bar */}
              <div className="bg-white border-t border-gray-100 px-4 py-2 flex justify-around">
                {[
                  { icon: <BarChart2 className="w-4 h-4" />, label: "Home", active: true },
                  { icon: <Briefcase className="w-4 h-4" />, label: "Jobs", active: false },
                  { icon: <Camera className="w-4 h-4" />, label: "Scan", active: false },
                  { icon: <Users className="w-4 h-4" />, label: "Network", active: false },
                ].map((t) => (
                  <div key={t.label} className={`flex flex-col items-center gap-0.5 ${t.active ? "text-[#0A1628]" : "text-gray-400"}`}>
                    {t.icon}
                    <span className="text-[9px] font-medium">{t.label}</span>
                    {t.active && <span className="w-1 h-1 rounded-full bg-[#0A1628]" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Floating badge */}
          <div className="absolute -right-6 top-16 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 whitespace-nowrap">
            <Star className="w-3 h-3 fill-white" />
            $144 earned today
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Four features. One powerful app.</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Everything a ProLnk partner needs to run their field operation and grow their income — on any jobsite.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.map((f, i) => (
              <div key={i} className={`rounded-2xl p-6 border ${f.color}`}>
                <div className={`w-12 h-12 rounded-xl ${f.iconBg} flex items-center justify-center mb-4`}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { value: "500+", label: "Founding partners enrolled" },
              { value: "Q3 2026", label: "App launch target" },
              { value: "iOS + Android", label: "Both platforms at launch" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-black text-[#0A1628] mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Early access waitlist */}
      <section className="bg-[#0A1628] py-20">
        <div className="max-w-xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5E642]/20 border border-[#F5E642]/30 text-[#F5E642] text-xs font-semibold mb-6">
            <Smartphone className="w-3.5 h-3.5" />
            Beta Access — Q3 2026
          </div>
          <h2 className="text-4xl font-black text-white mb-4">Get early access to the ProLnk mobile app.</h2>
          <p className="text-gray-400 text-lg mb-10">
            Beta testers get first access, direct input on features, and a founding-rate subscription lock.
          </p>

          {submitted ? (
            <div className="bg-emerald-900/40 border border-emerald-500/30 rounded-2xl p-8">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">You're on the list!</h3>
              <p className="text-gray-400">We'll email you when beta access opens. Stay tuned.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-400 mb-1.5 block">Full Name *</label>
                  <Input
                    placeholder="Alex Martinez"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-[#F5E642]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 mb-1.5 block">Email *</label>
                  <Input
                    type="email"
                    placeholder="alex@example.com"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-[#F5E642]"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-400 mb-1.5 block">Phone</label>
                  <Input
                    type="tel"
                    placeholder="(214) 555-0100"
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-[#F5E642]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 mb-1.5 block">Trade</label>
                  <select
                    value={form.trade}
                    onChange={(e) => setForm((p) => ({ ...p, trade: e.target.value }))}
                    className="w-full h-10 px-3 rounded-md bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-[#F5E642]"
                  >
                    <option value="" className="bg-[#0A1628]">Select trade...</option>
                    {TRADES.map((t) => (
                      <option key={t} value={t} className="bg-[#0A1628]">{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <Button
                type="submit"
                disabled={submitMutation.isPending}
                className="w-full bg-[#F5E642] hover:bg-[#f0dc30] text-[#0A1628] font-black text-base py-3 h-auto rounded-xl"
              >
                {submitMutation.isPending ? "Joining..." : "Join the Beta Waitlist"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-center text-gray-600 text-xs">No spam. We'll only contact you when beta opens.</p>
            </form>
          )}
        </div>
      </section>

      {/* Footer CTA to partner portal */}
      <section className="py-12 bg-gray-50 text-center">
        <p className="text-gray-500 mb-4">Already a ProLnk partner? Access your web dashboard now.</p>
        <Button variant="outline" onClick={() => navigate("/dashboard")} className="border-[#0A1628] text-[#0A1628] hover:bg-[#0A1628] hover:text-white">
          Go to Partner Dashboard <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </section>
    </div>
  );
}
