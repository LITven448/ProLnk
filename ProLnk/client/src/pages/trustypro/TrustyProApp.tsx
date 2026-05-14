import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import {
  Smartphone, Home, Camera, Zap, Clock, Apple, Play,
  ArrowRight, CheckCircle, Shield, Star, ChevronRight,
  ScanLine, Cpu, CalendarCheck,
} from "lucide-react";

const KILLER_FEATURES = [
  {
    icon: <ScanLine className="w-7 h-7 text-indigo-500" />,
    title: "Point and scan any room",
    description: "Hold up your phone and let TrustyPro AI analyze your walls, ceilings, appliances, and systems in real time. No setup. No calibration.",
    badge: "AI Vision",
    badgeColor: "bg-indigo-100 text-indigo-700",
  },
  {
    icon: <Cpu className="w-7 h-7 text-indigo-500" />,
    title: "AI identifies issues in 3 seconds",
    description: "Our model is trained on 2M+ home inspection photos. It spots water damage, cracks, HVAC wear, electrical hazards, and 47 other issue types — faster than any inspector.",
    badge: "Instant Analysis",
    badgeColor: "bg-purple-100 text-purple-700",
  },
  {
    icon: <CalendarCheck className="w-7 h-7 text-indigo-500" />,
    title: "Book a verified pro with one tap",
    description: "Every match is background-checked, licensed, and insured. Review their credentials, see their reviews, and book — all without leaving the scan results screen.",
    badge: "One Tap Booking",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
];

export default function TrustyProApp() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
    if (!email) {
      toast.error("Email is required.");
      return;
    }
    submitMutation.mutate({ name: email.split("@")[0], email });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate("/trustypro")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-gray-900 text-lg tracking-tight">TrustyPro</span>
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/trustypro")}
              className="text-sm text-gray-500 hover:text-indigo-600 transition-colors hidden md:block"
            >
              TrustyPro Web
            </button>
            <Button size="sm" onClick={() => navigate("/waitlist/homeowner")} className="bg-indigo-600 text-white hover:bg-indigo-700">
              Get Early Access
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <Badge className="mb-6 bg-indigo-100 text-indigo-700 border-0 font-semibold px-4 py-1.5 text-sm">
          Coming to iOS and Android Q3 2026
        </Badge>
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
          TrustyPro Mobile —<br />
          <span className="text-indigo-600">Scan your home from your pocket.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
          Point your phone at any room and get an AI-powered home health report in seconds. Then book a verified pro without ever leaving the app.
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

        {/* Animated scan visualization */}
        <div className="inline-block relative">
          <div className="w-64 bg-indigo-900 rounded-[2.5rem] p-3 shadow-2xl mx-auto">
            <div className="w-20 h-1.5 bg-indigo-700 rounded-full mx-auto mb-3" />
            <div className="bg-gray-950 rounded-[2rem] overflow-hidden">
              {/* Status bar */}
              <div className="bg-indigo-900 px-4 py-2 flex justify-between items-center text-white text-xs">
                <span className="font-semibold">9:41</span>
                <Camera className="w-3 h-3" />
              </div>
              {/* Scan UI */}
              <div className="relative bg-gray-900 aspect-[9/14] flex flex-col items-center justify-center overflow-hidden">
                {/* Scan grid overlay */}
                <div className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: "linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                {/* Scan line animation */}
                <div
                  className="absolute left-0 right-0 h-0.5 bg-indigo-400 opacity-80"
                  style={{ animation: "scanLine 2s ease-in-out infinite", top: "40%" }}
                />
                <style>{`
                  @keyframes scanLine {
                    0% { top: 15%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 85%; opacity: 0; }
                  }
                `}</style>
                {/* Corner brackets */}
                {[
                  "top-4 left-4 border-t-2 border-l-2",
                  "top-4 right-4 border-t-2 border-r-2",
                  "bottom-16 left-4 border-b-2 border-l-2",
                  "bottom-16 right-4 border-b-2 border-r-2",
                ].map((cls) => (
                  <div key={cls} className={`absolute w-6 h-6 border-indigo-400 ${cls}`} />
                ))}
                {/* Center scanning text */}
                <div className="text-center z-10 px-6">
                  <ScanLine className="w-8 h-8 text-indigo-400 mx-auto mb-2 animate-pulse" />
                  <p className="text-indigo-300 text-xs font-semibold">AI Scanning...</p>
                  <p className="text-gray-500 text-xs mt-1">Living Room · North wall</p>
                </div>
                {/* Bottom result strip */}
                <div className="absolute bottom-0 left-0 right-0 bg-indigo-600/90 backdrop-blur px-3 py-2">
                  <p className="text-white text-xs font-bold">2 issues detected</p>
                  <p className="text-indigo-200 text-xs">Water stain + HVAC vent damage</p>
                </div>
              </div>
              {/* Bottom controls */}
              <div className="bg-gray-950 px-4 py-3 flex justify-around items-center">
                <button className="flex flex-col items-center gap-0.5 text-gray-400">
                  <Home className="w-4 h-4" />
                  <span className="text-[9px]">Home</span>
                </button>
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <button className="flex flex-col items-center gap-0.5 text-gray-400">
                  <Shield className="w-4 h-4" />
                  <span className="text-[9px]">Vault</span>
                </button>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <div className="absolute -right-8 top-12 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-lg text-left whitespace-nowrap">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-indigo-500" />
              <span className="text-xs font-bold text-gray-800">3 sec analysis</span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">AI-powered detection</p>
          </div>
          <div className="absolute -left-8 bottom-24 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-lg whitespace-nowrap">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs font-bold text-gray-800">Pro booked in 1 tap</span>
            </div>
            <div className="flex mt-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3 Killer Features */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Three features. Total home intelligence.</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">The TrustyPro app puts professional home inspection capabilities in every homeowner's pocket.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {KILLER_FEATURES.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <Badge className={`text-xs mb-3 ${f.badgeColor} border-0`}>{f.badge}</Badge>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Launch timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { icon: <Apple className="w-6 h-6 text-gray-700 mx-auto mb-2" />, value: "iOS", label: "Q3 2026 launch" },
              { icon: <Play className="w-6 h-6 text-gray-700 mx-auto mb-2" />, value: "Android", label: "Q3 2026 launch" },
              { icon: <Clock className="w-6 h-6 text-gray-700 mx-auto mb-2" />, value: "< 3 sec", label: "AI scan time" },
            ].map((stat) => (
              <div key={stat.value}>
                {stat.icon}
                <div className="text-2xl font-black text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Early access waitlist */}
      <section className="bg-indigo-600 py-20">
        <div className="max-w-xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold mb-6">
            <Smartphone className="w-3.5 h-3.5" />
            Beta Access — Q3 2026
          </div>
          <h2 className="text-4xl font-black text-white mb-4">Get early access to the TrustyPro app.</h2>
          <p className="text-indigo-200 text-lg mb-10">
            Join the waitlist and be first to scan your home when the app launches.
          </p>

          {submitted ? (
            <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
              <CheckCircle className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">You're on the list!</h3>
              <p className="text-indigo-200">We'll notify you the moment the app is available.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-semibold text-indigo-200 mb-1.5 block">Email *</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/30 text-white placeholder:text-indigo-300 focus:border-white h-11"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-indigo-200 mb-1.5 block">Phone (optional)</label>
                <Input
                  type="tel"
                  placeholder="(214) 555-0100"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-white/10 border-white/30 text-white placeholder:text-indigo-300 focus:border-white h-11"
                />
              </div>
              <Button
                type="submit"
                disabled={submitMutation.isPending}
                className="w-full bg-white hover:bg-indigo-50 text-indigo-700 font-black text-base py-3 h-auto rounded-xl"
              >
                {submitMutation.isPending ? "Joining..." : "Join the Early Access Waitlist"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-center text-indigo-300 text-xs">Free for homeowners. Always.</p>
            </form>
          )}
        </div>
      </section>

      {/* Link back to web */}
      <section className="py-12 bg-gray-50 text-center">
        <p className="text-gray-500 mb-4">Want to start now? The web version is live.</p>
        <Button
          variant="outline"
          onClick={() => navigate("/trustypro")}
          className="border-indigo-300 text-indigo-600 hover:bg-indigo-50"
        >
          Try TrustyPro on the web <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-white">TrustyPro</span>
          </div>
          <p className="text-gray-600 text-sm">© 2026 TrustyPro — DFW, Texas</p>
        </div>
      </footer>
    </div>
  );
}
