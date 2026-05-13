import type React from "react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle, Shield, Star, Zap, ChevronDown,
  Clock, Users, ArrowRight, Lock,
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
  { icon: <Users className="w-5 h-5 text-indigo-400" />, label: "10,000+ homeowners served" },
  { icon: <Star className="w-5 h-5 text-amber-400" />, label: "4.9/5 average rating" },
  { icon: <Shield className="w-5 h-5 text-emerald-400" />, label: "Licensed & insured pros only" },
];

const STEPS = [
  {
    icon: <Zap className="w-5 h-5 text-white" />,
    color: "bg-indigo-500",
    title: "Submit your request",
    desc: "Tell us the service type and a quick description. Takes 60 seconds.",
  },
  {
    icon: <Users className="w-5 h-5 text-white" />,
    color: "bg-blue-500",
    title: "Match with pros",
    desc: "Our AI matches you with up to 3 vetted pros in your area who specialize in your exact job.",
  },
  {
    icon: <CheckCircle className="w-5 h-5 text-white" />,
    color: "bg-emerald-500",
    title: "Receive free quotes",
    desc: "Get competitive quotes within 24 hours. Compare, pick the best fit, and get the job done.",
  },
];

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
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-black text-white mb-3">Request submitted!</h1>
          <p className="text-white/60 text-lg mb-2">
            We're matching you with vetted pros for{" "}
            <span className="text-indigo-300 font-medium">{serviceType}</span> in ZIP{" "}
            <span className="text-indigo-300 font-medium">{zipCode}</span>.
          </p>
          <p className="text-white/40 text-sm mb-8">
            We'll email <span className="text-white/60">{email}</span> within 24 hours with your quotes.
          </p>

          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { icon: <Clock className="w-5 h-5 text-indigo-400" />, label: "24hr quotes" },
              { icon: <Shield className="w-5 h-5 text-indigo-400" />, label: "Vetted pros" },
              { icon: <Star className="w-5 h-5 text-indigo-400" />, label: "4.9/5 rating" },
            ].map((item) => (
              <div key={item.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <div className="flex justify-center mb-1">{item.icon}</div>
                <p className="text-xs text-white/60">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="/home-waitlist"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors"
            >
              Get full access — add your home <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/" className="text-white/40 hover:text-white/60 text-sm underline transition-colors">
              Back to home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-900">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-medium mb-5">
            <Zap className="w-3.5 h-3.5" /> Fast &amp; Free
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            Get 3 Free Quotes<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              in 24 Hours
            </span>
          </h1>
          <p className="text-white/60 text-xl max-w-lg mx-auto">
            Tell us what you need. We'll match you with vetted local pros and deliver competing quotes — fast.
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
          {TRUST_BADGES.map((b) => (
            <div key={b.label} className="flex items-center gap-2">
              {b.icon}
              <span className="text-white/70 text-sm font-medium">{b.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
              <h2 className="text-lg font-bold text-white mb-5">Tell us about your job</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Service Type */}
                <div>
                  <label className="block text-white/70 text-sm mb-1.5">Service Type *</label>
                  <div className="relative">
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      required
                      className="w-full h-12 px-4 pr-10 rounded-xl bg-white/5 border border-white/20 text-white text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="" className="bg-slate-900 text-white/50">
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
                  <label className="block text-white/70 text-sm mb-1.5">ZIP Code *</label>
                  <Input
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="75034"
                    maxLength={10}
                    required
                    className="h-12 bg-white/5 border-white/20 text-white placeholder:text-white/30 text-sm"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-white/70 text-sm mb-1.5">Describe the job *</label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. My HVAC is making a loud noise and isn't cooling well. It's a 2-ton Carrier unit installed in 2015..."
                    rows={4}
                    required
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/30 text-sm resize-none"
                  />
                  <p className="text-white/30 text-xs mt-1">More detail = better matches</p>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white/70 text-sm mb-1.5">Your Email *</label>
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
                <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl bg-indigo-900/30 border border-indigo-500/20">
                  <Lock className="w-3.5 h-3.5 text-indigo-400 mt-0.5 flex-shrink-0" />
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
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </div>
          </div>

          {/* How it works */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-white font-bold text-base">What happens next</h3>
            {STEPS.map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className={`w-9 h-9 rounded-xl ${step.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  {step.icon}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{step.title}</p>
                  <p className="text-white/50 text-xs leading-relaxed mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}

            {/* Star rating display */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mt-6">
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} className={`w-4 h-4 ${n <= 4 ? "text-amber-400 fill-amber-400" : "text-amber-400 fill-amber-400"}`} />
                ))}
                <span className="text-white font-bold text-sm ml-1">4.9</span>
              </div>
              <p className="text-white/60 text-xs leading-relaxed italic">
                "Got 3 quotes within 18 hours. Hired the second one — saved $800 vs the first quote. Incredible service."
              </p>
              <p className="text-white/30 text-xs mt-2">— Sarah M., Frisco TX</p>
            </div>

            <a
              href="/home-waitlist"
              className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
            >
              Want full homeowner features? Join the waitlist
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
