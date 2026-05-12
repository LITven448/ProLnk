import type React from "react";
/**
 * TrustyPro Waitlist / Coming Soon page
 * Route: /trustypro/waitlist
 * Shown to public visitors when the homeowner platform is in waitlist mode.
 * Admin can toggle the waitlist gate from the admin panel.
 */
import { useState } from "react";
import { Link } from "wouter";
import { TrustyProLogo } from "@/components/TrustyProLogo";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CheckCircle, Shield, Star, Home, Zap, ArrowRight, Users, ChevronRight, MapPin, Phone, Wrench } from "lucide-react";

const BENEFITS = [
  { icon: <Shield className="w-5 h-5 text-indigo-400" />, title: "Vetted Pros Only", desc: "Every professional is license-verified, insured, and background-checked." },
  { icon: <Zap className="w-5 h-5 text-indigo-400" />, title: "AI-Powered Matching", desc: "Upload photos of your home and our AI identifies the right pros for each job." },
  { icon: <Star className="w-5 h-5 text-indigo-400" />, title: "Real Homeowner Reviews", desc: "Ratings from verified homeowners in your neighborhood — no fake reviews." },
  { icon: <Home className="w-5 h-5 text-indigo-400" />, title: "Home Health Vault", desc: "Every repair and upgrade permanently documented. Adds real value when you sell." },
];

const SERVICE_OPTIONS = [
  "HVAC / Air Conditioning",
  "Plumbing",
  "Electrical",
  "Roofing",
  "General Contractor",
  "Kitchen / Bathroom Remodel",
  "Flooring",
  "Landscaping",
  "Pest Control",
  "Other / Not sure yet",
];

export default function TrustyProWaitlist() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [serviceNeeded, setServiceNeeded] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const joinWaitlist = trpc.trustyPro.joinWaitlist.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("You're on the list! We'll be in touch soon.");
    },
    onError: (e) => toast.error(e.message ?? "Something went wrong. Please try again."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { toast.error("Email is required."); return; }
    joinWaitlist.mutate({
      email: email.trim(),
      name: name.trim() || undefined,
    });
  };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #0F172A 0%, #1e3a5f 50%, #0c2444 100%)" }}>
      {/* Nav */}
      <nav className="px-6 py-5 flex items-center justify-between max-w-5xl mx-auto">
        <TrustyProLogo height={36} />
        <Link href="/">
          <span className="text-sm text-white/50 hover:text-white/80 cursor-pointer transition-colors">ProLnk for Pros →</span>
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left — copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-semibold mb-6">
              <Users className="w-3.5 h-3.5" /> DFW Early Access — Limited Spots
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
              Find Home Pros You Can<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #38BDF8, #0891b2)" }}>
                Actually Trust
              </span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              TrustyPro connects DFW homeowners with pre-vetted, insured, and licensed home service professionals.
              AI scans your home photos to match you with the right pros — no guessing, no random bids.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {BENEFITS.map((b, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="mt-0.5 flex-shrink-0">{b.icon}</div>
                  <div>
                    <p className="text-sm font-semibold text-white">{b.title}</p>
                    <p className="text-xs text-white/50 mt-0.5">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["A", "B", "C", "D"].map((l, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#1e3a5f] flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: ["#0891b2", "#0e7490", "#155e75", "#164e63"][i] }}>
                    {l}
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/60">
                <span className="text-white font-semibold">500+ homeowners</span> already on the waitlist
              </p>
            </div>

            {/* Trust markers */}
            <div className="mt-8 flex flex-wrap gap-4">
              {["100% free for homeowners", "No credit card needed", "All pros background-checked"].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-xs text-white/50">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            {submitted ? (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h2 className="text-2xl font-black text-white mb-2">You're on the list!</h2>
                <p className="text-white/60 text-sm mb-2">
                  We'll reach out when TrustyPro launches in your neighborhood.
                </p>
                <p className="text-white/40 text-xs mb-6">
                  Expect your invite within the next few weeks. DFW area first.
                </p>
                <Link href="/">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Learn About ProLnk for Pros
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
                <h2 className="text-xl font-black text-white mb-1">Start Free — Join the Waitlist</h2>
                <p className="text-white/50 text-sm mb-6">
                  Be first in line when TrustyPro opens in your neighborhood.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-white/60 uppercase tracking-wide block mb-1.5">
                      Full Name
                    </label>
                    <Input
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Jane Smith"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-white/60 uppercase tracking-wide block mb-1.5">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-white/60 uppercase tracking-wide block mb-1.5">
                      <span className="inline-flex items-center gap-1"><Phone className="w-3 h-3" /> Phone Number</span>
                    </label>
                    <Input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="(214) 555-0100"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-white/60 uppercase tracking-wide block mb-1.5">
                      <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" /> Home Address or City</span>
                    </label>
                    <Input
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      placeholder="Frisco, TX or 123 Main St, Plano TX"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-white/60 uppercase tracking-wide block mb-1.5">
                      <span className="inline-flex items-center gap-1"><Wrench className="w-3 h-3" /> Service You Need Most</span>
                    </label>
                    <select
                      value={serviceNeeded}
                      onChange={e => setServiceNeeded(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-400"
                    >
                      <option value="" className="bg-[#1e3a5f]">Select a service...</option>
                      {SERVICE_OPTIONS.map(opt => (
                        <option key={opt} value={opt} className="bg-[#1e3a5f]">{opt}</option>
                      ))}
                    </select>
                  </div>
                  <Button
                    type="submit"
                    className="w-full text-white font-bold gap-2 h-12 text-base"
                    style={{ background: "linear-gradient(90deg, #0891b2, #0e7490)" }}
                    disabled={joinWaitlist.isPending}
                  >
                    {joinWaitlist.isPending ? "Joining..." : "Get Early Access — Free"}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
                <p className="text-xs text-white/30 text-center mt-4">
                  No spam. Unsubscribe anytime. DFW area only during beta.
                </p>
              </div>
            )}

            {/* Already have access */}
            <div className="mt-4 text-center">
              <Link href="/trustypro/login">
                <span className="text-sm text-cyan-300 hover:text-cyan-200 cursor-pointer transition-colors">
                  Already have access? Sign in <ChevronRight className="w-3.5 h-3.5 inline" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
