import React from 'react';
import { useState } from "react";
import { Link } from "wouter";
import { TrustyProLogo } from "@/components/TrustyProLogo";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import {
  CheckCircle, Shield, Star, Home, Zap, ArrowRight,
  Users, ChevronRight, MapPin, Phone, Wrench, Camera, Lock, Menu, X, Share2,
} from "lucide-react";

const BENEFITS = [
  { icon: <Shield className="w-5 h-5 text-cyan-400" />, title: "Vetted Pros Only", desc: "Every professional is license-verified, insured, and background-checked before they ever step foot in your home." },
  { icon: <Zap className="w-5 h-5 text-cyan-400" />, title: "AI-Powered Matching", desc: "Upload photos of your home and our AI identifies exactly which pros you need — no guessing, no random bids." },
  { icon: <Camera className="w-5 h-5 text-cyan-400" />, title: "Home Health Vault", desc: "Every repair, upgrade, and inspection permanently documented. Proves real value when you sell." },
  { icon: <Star className="w-5 h-5 text-cyan-400" />, title: "Verified Reviews Only", desc: "Ratings from verified homeowners in your neighborhood. No fake reviews, no paid placements." },
  { icon: <Lock className="w-5 h-5 text-cyan-400" />, title: "Privacy First", desc: "Your home data is yours. We never sell it. Photos processed securely and never shared." },
  { icon: <Home className="w-5 h-5 text-cyan-400" />, title: "100% Free for Homeowners", desc: "TrustyPro is completely free for homeowners. Pros pay a small platform fee — never you." },
];

const SERVICE_OPTIONS = [
  "HVAC / Air Conditioning",
  "Plumbing",
  "Electrical",
  "Roofing",
  "General Contractor",
  "Kitchen / Bathroom Remodel",
  "Flooring",
  "Landscaping / Lawn Care",
  "Pest Control",
  "Pool Service",
  "Foundation / Structural",
  "Windows / Doors",
  "Painting (Interior/Exterior)",
  "Garage / Driveway",
  "Other / Not sure yet",
];

export default function TrustyProWaitlist() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("TX");
  const [zipCode, setZipCode] = useState("");
  const [serviceNeeded, setServiceNeeded] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [waitlistPosition, setWaitlistPosition] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const joinWaitlist = trpc.waitlist.joinHomeWaitlist.useMutation({
    onSuccess: (data) => {
      setSubmitted(true);
      setWaitlistPosition(data.position ?? null);
      toast.success("You're on the list! We'll reach out soon.");
    },
    onError: (e) => {
      if (e.message?.includes("already registered")) {
        toast.error("This email is already on the TrustyPro waitlist.");
      } else {
        toast.error(e.message ?? "Something went wrong. Please try again.");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) { toast.error("First name is required."); return; }
    if (!email.trim()) { toast.error("Email is required."); return; }
    if (!address.trim()) { toast.error("Home address is required."); return; }
    if (!city.trim()) { toast.error("City is required."); return; }
    if (!zipCode.trim() || !/^\d{5}/.test(zipCode.trim())) { toast.error("Valid ZIP code is required."); return; }
    if (!serviceNeeded) { toast.error("Please select a service."); return; }

    if (!lastName.trim()) { toast.error("Last name is required."); return; }
    const stateNorm = (state || "TX").trim().toUpperCase().slice(0, 2);
    if (stateNorm.length !== 2 || !/^[A-Z]{2}$/.test(stateNorm)) { toast.error("Please enter a valid 2-letter state (e.g. TX)."); return; }
    joinWaitlist.mutate({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim() || undefined,
      address: address.trim(),
      city: city.trim(),
      state: stateNorm,
      zipCode: zipCode.trim().slice(0, 5),
      serviceNeeded,
    });
  };

  return (
    <>
      <Helmet>
        <title>TrustyPro — Get Early Access | DFW Home Services</title>
        <meta name="description" content="Join the TrustyPro waitlist. AI-matched, background-checked home service pros in DFW. Free for homeowners. Get early access today." />
        <meta property="og:title" content="TrustyPro — Vetted Home Service Pros, AI-Matched" />
        <meta property="og:description" content="Join the TrustyPro waitlist. DFW's smartest home services platform. Free for homeowners." />
        <meta property="og:image" content="https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/trustypro-hero-interior_21ad489c.webp" />
      </Helmet>

      <div className="min-h-screen" style={{ background: "#f8fafc", fontFamily: "'Inter', system-ui, sans-serif" }}>
        {/* ── Nav ───────────────────────────────────────────────────────────── */}
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/trustypro">
              <div className="cursor-pointer"><TrustyProLogo height={32} /></div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
              <Link href="/trustypro#how-it-works"><span className="hover:text-gray-900 cursor-pointer transition-colors">How It Works</span></Link>
              <Link href="/trustypro#services"><span className="hover:text-gray-900 cursor-pointer transition-colors">Services</span></Link>
              <Link href="/trustypro#about"><span className="hover:text-gray-900 cursor-pointer transition-colors">About</span></Link>
              <Link href="/"><span className="text-[#1e3a5f] font-semibold hover:opacity-80 cursor-pointer transition-colors">ProLnk for Pros →</span></Link>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link href="/trustypro/login">
                <Button variant="ghost" size="sm" className="text-gray-600">Sign In</Button>
              </Link>
              <Button
                size="sm"
                className="text-white font-bold"
                style={{ background: "linear-gradient(90deg, #0891b2, #1e3a5f)" }}
                onClick={() => document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get Early Access
              </Button>
            </div>

            {/* Mobile menu */}
            <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          {mobileOpen && (
            <div className="md:hidden border-t border-gray-100 px-4 py-4 space-y-3 bg-white">
              <Link href="/trustypro"><div className="text-sm text-gray-700 py-1 cursor-pointer" onClick={() => setMobileOpen(false)}>Home</div></Link>
              <Link href="/trustypro/login"><div className="text-sm text-gray-700 py-1 cursor-pointer" onClick={() => setMobileOpen(false)}>Sign In</div></Link>
              <Link href="/"><div className="text-sm text-[#1e3a5f] font-semibold py-1 cursor-pointer" onClick={() => setMobileOpen(false)}>ProLnk for Pros →</div></Link>
            </div>
          )}
        </nav>

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section style={{ background: "linear-gradient(135deg, #0F172A 0%, #1e3a5f 60%, #0c2444 100%)" }} className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-sm font-semibold mb-6">
              <Users className="w-4 h-4" /> DFW Early Access — Limited Spots
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
              Find Home Pros You Can<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #38BDF8, #0891b2)" }}>
                Actually Trust
              </span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
              AI matches you with pre-vetted, licensed pros in DFW. Free for homeowners, forever.
              Be first in line when we launch in your neighborhood.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/50 mb-10">
              {["100% free for homeowners", "Background-checked pros", "AI photo analysis", "DFW beta launching now"].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                  {t}
                </div>
              ))}
            </div>
            <Button
              className="text-white font-bold px-8 py-4 h-auto text-base gap-2"
              style={{ background: "linear-gradient(90deg, #0891b2, #0e7490)" }}
              onClick={() => document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              Secure My Spot — It's Free <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </section>

        {/* ── Benefits grid ─────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">Why TrustyPro?</h2>
            <p className="text-gray-500 text-center mb-10 max-w-xl mx-auto">The smarter way to hire home service professionals in DFW</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {BENEFITS.map((b, i) => (
                <div key={i} className="p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:border-cyan-200 hover:bg-cyan-50/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[#1e3a5f]/10 flex items-center justify-center mb-3">{b.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-1">{b.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Waitlist Form ─────────────────────────────────────────────────── */}
        <section id="waitlist-form" className="py-16 px-4" style={{ background: "#f1f5f9" }}>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Join the Waitlist</h2>
              <p className="text-gray-500">DFW area only during beta. We'll notify you when we're ready in your neighborhood.</p>
            </div>

            {submitted ? (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "linear-gradient(135deg, #0891b2, #1e3a5f)" }}>
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>

                {waitlistPosition !== null && (
                  <div className="mb-4">
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#0891b2" }}>Waitlist Position</p>
                    <p className="text-6xl font-black text-gray-900 leading-none mt-1">#{waitlistPosition}</p>
                  </div>
                )}

                <h2 className="text-2xl font-bold text-gray-900 mb-2">You're on the list!</h2>
                <p className="text-gray-500 mb-1">We'll reach out when TrustyPro is ready in your neighborhood.</p>

                {address && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm font-medium mt-3 mb-4">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="truncate max-w-xs">{address}{city ? `, ${city}` : ""}{state ? `, ${state}` : ""} {zipCode}</span>
                  </div>
                )}

                <p className="text-gray-400 text-sm mb-8">Expect your invite within a few weeks. DFW area first.</p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                  <Button
                    variant="outline"
                    className="border-gray-200 gap-2"
                    onClick={() => {
                      const shareText = `I just joined the TrustyPro waitlist — AI-matched home service pros in DFW. Free for homeowners! Join me: https://trustypro.io/waitlist`;
                      if (navigator.share) {
                        navigator.share({ title: "TrustyPro", text: shareText, url: "https://trustypro.io/waitlist" }).catch(() => {});
                      } else {
                        navigator.clipboard.writeText(shareText).then(() => toast.success("Link copied! Share with a neighbor.")).catch(() => {});
                      }
                    }}
                  >
                    <Share2 className="w-4 h-4" /> Share with a Neighbor
                  </Button>
                  <Link href="/">
                    <Button className="bg-[#0A1628] text-white hover:bg-[#1a2a40]">
                      I'm a Pro — Join ProLnk <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>

                <Link href="/trustypro">
                  <span className="text-sm font-semibold cursor-pointer hover:opacity-80 transition-opacity" style={{ color: "#0891b2" }}>
                    Explore TrustyPro features <ChevronRight className="w-3.5 h-3.5 inline" />
                  </span>
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
                        First Name <span className="text-red-400">*</span>
                      </label>
                      <Input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Jane" className="bg-gray-50 border-gray-200" required />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Last Name</label>
                      <Input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Smith" className="bg-gray-50 border-gray-200" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@example.com" className="bg-gray-50 border-gray-200" required />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
                      <span className="inline-flex items-center gap-1"><Phone className="w-3 h-3" /> Phone (optional)</span>
                    </label>
                    <Input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="(214) 555-0100" className="bg-gray-50 border-gray-200" />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
                      <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" /> Street Address <span className="text-red-400">*</span></span>
                    </label>
                    <Input value={address} onChange={e => setAddress(e.target.value)} placeholder="123 Main St" className="bg-gray-50 border-gray-200" required />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">City <span className="text-red-400">*</span></label>
                      <Input value={city} onChange={e => setCity(e.target.value)} placeholder="Frisco" className="bg-gray-50 border-gray-200" required />
                    </div>
                    <div className="col-span-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">State</label>
                      <select value={state} onChange={e => setState(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-400 text-gray-700">
                        {["TX", "OK", "LA", "NM", "AR"].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="col-span-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">ZIP <span className="text-red-400">*</span></label>
                      <Input value={zipCode} onChange={e => setZipCode(e.target.value)} placeholder="75034" maxLength={5} className="bg-gray-50 border-gray-200" required />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
                      <span className="inline-flex items-center gap-1"><Wrench className="w-3 h-3" /> Service You Need Most <span className="text-red-400">*</span></span>
                    </label>
                    <select
                      value={serviceNeeded}
                      onChange={e => setServiceNeeded(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-md px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-400"
                      required
                    >
                      <option value="">Select a service...</option>
                      {SERVICE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>

                  <Button
                    type="submit"
                    className="w-full text-white font-bold gap-2 h-12 text-base"
                    style={{ background: "linear-gradient(90deg, #0891b2, #1e3a5f)" }}
                    disabled={joinWaitlist.isPending}
                  >
                    {joinWaitlist.isPending ? "Joining..." : "Get Early Access — It's Free"}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>

                <p className="text-xs text-gray-400 text-center mt-4">
                  No spam. Unsubscribe anytime. DFW area only during beta.
                </p>

                <div className="mt-5 pt-4 border-t border-gray-100 text-center">
                  <Link href="/trustypro/login">
                    <span className="text-sm text-cyan-600 hover:text-cyan-700 cursor-pointer transition-colors font-medium">
                      Already have access? Sign in <ChevronRight className="w-3.5 h-3.5 inline" />
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── Footer ────────────────────────────────────────────────────────── */}
        <footer className="bg-[#0F172A] py-10 px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <TrustyProLogo height={28} />
            <div className="flex gap-6 text-sm text-white/40">
              <Link href="/privacy"><span className="hover:text-white/70 cursor-pointer transition-colors">Privacy</span></Link>
              <Link href="/terms"><span className="hover:text-white/70 cursor-pointer transition-colors">Terms</span></Link>
              <Link href="/"><span className="hover:text-white/70 cursor-pointer transition-colors">ProLnk for Pros</span></Link>
            </div>
            <p className="text-xs text-white/30">© 2026 TrustyPro · DFW, Texas</p>
          </div>
        </footer>
      </div>
    </>
  );
}
