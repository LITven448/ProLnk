import React from 'react';
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle, Shield, Star, Zap, ChevronDown,
  Clock, Users, ArrowRight, Lock, Home, BadgeCheck,
} from "lucide-react";

const SERVICE_OPTIONS = [
  "HVAC Service / Replacement",
  "Roof Inspection / Repair",
  "Plumbing Repair",
  "Electrical Work",
  "Landscaping / Lawn Care",
  "Interior Painting",
  "Exterior Painting",
  "Flooring",
  "Kitchen Remodel",
  "Bathroom Remodel",
  "Window / Door Replacement",
  "Fence / Gate",
  "Pool Service",
  "Pest Control",
  "General Handyman",
];

const TRUST_BADGES = [
  { icon: <Users className="w-5 h-5 text-indigo-400″ />, label: "10,000+ homeowners served" },
  { icon: <Star className="w-5 h-5 text-amber-400″ />, label: "4.9/5 average rating" },
  { icon: <Shield className="w-5 h-5 text-emerald-400″ />, label: "Licensed & insured pros only" },
];

const STEPS = [
  {
    icon: <Zap className="w-5 h-5 text-white" />,
    color: "bg-indigo-500″,
    title: "Submit your request",
    desc: "Tell us the service type and a quick description. Takes 60 seconds.",
  },
  {
    icon: <Users className="w-5 h-5 text-white" />,
    color: "bg-blue-500″,
    title: "Match with pros",
    desc: "Our AI matches you with up to 3 vetted pros in your area who specialize in your exact job.",
  },
  {
    icon: <CheckCircle className="w-5 h-5 text-white" />,
    color: "bg-emerald-500″,
    title: "Receive free quotes",
    desc: "Get competitive quotes within 24 hours. Compare, pick the best fit, and get the job done.",
  },
];

function QuoteSuccessState({
  serviceType,
  zipCode,
  email,
}: {
  serviceType: string;
  zipCode: string;
  email: string;
}) {
  const [matchStep, setMatchStep] = useState(0);

  const matchingSteps = [
    "Scanning verified pros in your area…",
    "Checking availability and specializations…",
    "Matching 3 best-fit pros to your job…",
    "Pros notified — quotes incoming!",
  ];

  useEffect(() => {
    if (matchStep >= matchingSteps.length - 1) return;
    const timer = setTimeout(() => setMatchStep((s) => s + 1), 900);
    return () => clearTimeout(timer);
  }, [matchStep]);

  const trustSignals = [
    {
      icon: <BadgeCheck className="w-5 h-5 text-emerald-400″ />,
      title: "Licensed & Insured",
      desc: "Every pro is verified before they can accept jobs",
    },
    {
      icon: <Shield className="w-5 h-5 text-blue-400″ />,
      title: "Background-Checked",
      desc: "State and federal checks on every professional",
    },
    {
      icon: <Star className="w-5 h-5 text-amber-400″ />,
      title: "4.9/5 Average Rating",
      desc: "Based on 10,000+ completed jobs on ProLnk",
    },
  ];

  const isDone = matchStep >= matchingSteps.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 flex items-center justify-center px-4 py-12″>
      <div className="max-w-lg w-full">
        {/* Animated check + headline */}
        <div className="text-center mb-8″>
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 transition-all duration-700 ${
              isDone
                ? "bg-green-500/20 border-2 border-green-400/60 scale-110″
                : "bg-indigo-500/20 border-2 border-indigo-400/40 animate-pulse"
            }`}
          >
            <CheckCircle
              className={`w-10 h-10 transition-colors duration-700 ${
                isDone ? "text-green-400″ : "text-indigo-400"
              }`}
            />
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-white mb-2″>
            {isDone ? "You're all set!" : "Finding your pros…"}
          </h1>
          <p className="text-white/60 text-base">
            {isDone ? (
              <>
                We're matching you with{" "}
                <span className="text-indigo-300 font-semibold">3 verified pros</span> for{" "}
                <span className="text-white/80″>{serviceType}</span> in ZIP {zipCode}.
              </>
            ) : (
              matchingSteps[matchStep]
            )}
          </p>
        </div>

        {/* Animated matching progress */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6″>
          <div className="flex items-center justify-between mb-3″>
            <span className="text-white/70 text-sm font-medium">Matching progress</span>
            <span className="text-indigo-300 text-sm font-bold">
              {Math.round(((matchStep + 1) / matchingSteps.length) * 100)}%
            </span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-blue-400 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${((matchStep + 1) / matchingSteps.length) * 100}%` }}
            />
          </div>
          <div className="mt-4 space-y-2″>
            {matchingSteps.map((step, i) => (
              <div
                key={i}
                className={`flex items-center gap-2.5 transition-opacity duration-500 ${
                  i <= matchStep ? "opacity-100″ : "opacity-25"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full flex-shrink-0 transition-colors duration-500 ${
                    i < matchStep
                      ? "bg-green-500″
                      : i === matchStep
                      ? "bg-indigo-400 animate-pulse"
                      : "bg-white/20″
                  }`}
                />
                <span className="text-white/70 text-xs">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline callout */}
        <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-400/20 rounded-xl px-4 py-3 mb-6″>
          <Clock className="w-5 h-5 text-amber-400 flex-shrink-0″ />
          <p className="text-amber-200 text-sm">
            <span className="font-semibold">Expect quotes within 24 hours.</span> We'll notify{" "}
            <span className="text-amber-100″>{email}</span> the moment they arrive.
          </p>
        </div>

        {/* Trust signals */}
        <div className="grid grid-cols-1 gap-3 mb-6″>
          {trustSignals.map((s) => (
            <div
              key={s.title}
              className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4″
            >
              <div className="flex-shrink-0 mt-0.5″>{s.icon}</div>
              <div>
                <p className="text-white font-semibold text-sm">{s.title}</p>
                <p className="text-white/50 text-xs mt-0.5″>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* While you wait — Scan CTA */}
        <div className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border border-emerald-500/30 rounded-2xl p-5 mb-6″>
          <div className="flex items-start gap-3″>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center flex-shrink-0″>
              <Home className="w-5 h-5 text-emerald-400″ />
            </div>
            <div className="flex-1 min-w-0″>
              <p className="text-white font-bold text-sm mb-1″>While you wait — scan your home for free</p>
              <p className="text-white/60 text-xs mb-3 leading-relaxed">
                Build your Home Health Vault: a digital record of every system, appliance, and repair
                in your home. Free forever. Helps pros quote faster and more accurately.
              </p>
              <a
                href="/trustypro/scan"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
              >
                Start free scan <ArrowRight className="w-3.5 h-3.5″ />
              </a>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3″>
          <a
            href="/home-waitlist"
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors"
          >
            Get full homeowner access <ArrowRight className="w-4 h-4″ />
          </a>
          <a
            href="/"
            className="text-center text-white/40 hover:text-white/60 text-sm underline transition-colors"
          >
            Back to home
          </a>
        </div>
      </div>
    </div>
  );
}

export default function GetQuotes() {
  const [serviceType, setServiceType] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.waitlist.joinHomeWaitlist.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    onError: (e: any) => {
      if (e.message?.includes("already")) {
        toast.error("That email is already on the waitlist!");
      } else {
        toast.error(e.message ?? "Something went wrong. Please try again.");
      }
    },
  });

  const isValid =
    serviceType &&
    zipCode.trim().length >= 5 &&
    description.trim().length >= 10 &&
    email.trim().includes("@");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }
    submitMutation.mutate({
      firstName: "Quote",
      lastName: "Request",
      email: email.trim(),
      address: "TBD",
      city: "TBD",
      state: "TX",
      zipCode: zipCode.trim(),
      serviceNeeded: serviceType,
    });
  };

  if (submitted) {
    return <QuoteSuccessState serviceType={serviceType} zipCode={zipCode} email={email} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-900″>
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16″>

        {/* Header */}
        <div className="text-center mb-10″>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-medium mb-5″>
            <Zap className="w-3.5 h-3.5″ /> Fast &amp; Free
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            Get 3 Free Quotes<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400″>
              in 24 Hours
            </span>
          </h1>
          <p className="text-white/60 text-xl max-w-lg mx-auto">
            Tell us what you need. We'll match you with vetted local pros and deliver competing quotes — fast.
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12″>
          {TRUST_BADGES.map((b) => (
            <div key={b.label} className="flex items-center gap-2″>
              {b.icon}
              <span className="text-white/70 text-sm font-medium">{b.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-3″>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8″>
              <h2 className="text-lg font-bold text-white mb-5″>Tell us about your job</h2>
              <form onSubmit={handleSubmit} className="space-y-4″>
                {/* Service Type */}
                <div>
                  <label className="block text-white/70 text-sm mb-1.5″>Service Type *</label>
                  <div className="relative">
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      required
                      className="w-full h-12 px-4 pr-10 rounded-xl bg-white/5 border border-white/20 text-white text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500″
                    >
                      <option value="" className="bg-slate-900 text-white/50″>
                        What do you need done?
                      </option>
                      {SERVICE_OPTIONS.map((s) => (
                        <option key={s} value={s} className="bg-slate-900 text-white">
                          {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-white/40 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* ZIP Code */}
                <div>
                  <label className="block text-white/70 text-sm mb-1.5″>ZIP Code *</label>
                  <Input
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="75034″
                    maxLength={10}
                    required
                    className="h-12 bg-white/5 border-white/20 text-white placeholder:text-white/30 text-sm"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-white/70 text-sm mb-1.5″>Describe the job *</label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. My HVAC is making a loud noise and isn't cooling well. It's a 2-ton Carrier unit installed in 2015..."
                    rows={4}
                    required
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/30 text-sm resize-none"
                  />
                  <p className="text-white/30 text-xs mt-1″>More detail = better matches</p>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white/70 text-sm mb-1.5″>Your Email *</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    required
                    className="h-12 bg-white/5 border-white/20 text-white placeholder:text-white/30 text-sm"
                  />
                </div>

                {/* Privacy note */}
                <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl bg-indigo-900/30 border border-indigo-500/20″>
                  <Lock className="w-3.5 h-3.5 text-indigo-400 mt-0.5 flex-shrink-0″ />
                  <p className="text-xs text-indigo-200 leading-relaxed">
                    Pros receive your job description, not your email. You choose who to contact.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={!isValid || submitMutation.isPending}
                  className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base disabled:opacity-50 transition-colors"
                >
                  {submitMutation.isPending ? "Submitting..." : "Get My Free Quotes"}
                  <ArrowRight className="w-4 h-4 ml-2″ />
                </Button>
              </form>
            </div>
          </div>

          {/* How it works */}
          <div className="lg:col-span-2 space-y-4″>
            <h3 className="text-white font-bold text-base">What happens next</h3>
            {STEPS.map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className={`w-9 h-9 rounded-xl ${step.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  {step.icon}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{step.title}</p>
                  <p className="text-white/50 text-xs leading-relaxed mt-0.5″>{step.desc}</p>
                </div>
              </div>
            ))}

            {/* Star rating display */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mt-6″>
              <div className="flex items-center gap-1 mb-2″>
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} className={`w-4 h-4 ${n <= 4 ? "text-amber-400 fill-amber-400" : "text-amber-400 fill-amber-400"}`} />
                ))}
                <span className="text-white font-bold text-sm ml-1″>4.9</span>
              </div>
              <p className="text-white/60 text-xs leading-relaxed italic">
                "Got 3 quotes within 18 hours. Hired the second one — saved $800 vs the first quote. Incredible service."
              </p>
              <p className="text-white/30 text-xs mt-2″>— Sarah M., Frisco TX</p>
            </div>

            <a
              href="/home-waitlist"
              className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
            >
              Want full homeowner features? Join the waitlist
              <ArrowRight className="w-3.5 h-3.5″ />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
