import React from 'react';
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle, Shield, Zap, Star, Lock, Copy, MessageSquare,
  User, Mail, Phone, MapPin, Home, Wrench, ChevronDown,
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

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY",
];

const BENEFITS = [
  {
    icon: <Zap className="w-6 h-6 text-indigo-400" />,
    title: "Free Quotes",
    desc: "Get competing quotes from vetted pros at no cost to you — ever.",
  },
  {
    icon: <Shield className="w-6 h-6 text-indigo-400" />,
    title: "Vetted Pros Only",
    desc: "Every pro is licensed, insured, and background-checked before they can contact you.",
  },
  {
    icon: <Star className="w-6 h-6 text-indigo-400" />,
    title: "No Spam",
    desc: "You control who reaches out. No cold calls, no random salespeople.",
  },
];

export default function HomeownerWaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referralLink, setReferralLink] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("TX");
  const [zipCode, setZipCode] = useState("");
  const [serviceNeeded, setServiceNeeded] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) setReferralCode(ref);
  }, []);

  const submitMutation = trpc.waitlist.joinHomeWaitlist.useMutation({
    onSuccess: () => {
      const code = `HO${Date.now().toString(36).toUpperCase().slice(-6)}`;
      setReferralLink(`${window.location.origin}/home-waitlist?ref=${code}`);
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
    firstName.trim() &&
    lastName.trim() &&
    email.trim().includes("@") &&
    address.trim() &&
    city.trim() &&
    zipCode.trim().length >= 5 &&
    serviceNeeded;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      toast.error("Please fill in all required fields.");
      return;
    }
    submitMutation.mutate({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      zipCode: zipCode.trim(),
      serviceNeeded,
      referredBy: referralCode ?? undefined,
    });
  };

  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4 py-16"
        style={{ background: "linear-gradient(135deg, #0F0C29 0%, #1B1464 50%, #24243e 100%)" }}
      >
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-black text-white mb-3">You're on the list!</h1>
          <p className="text-white/60 text-lg mb-2">
            Welcome, {firstName}. We'll reach out to{" "}
            <span className="text-indigo-300 font-medium">{email}</span> when pros are ready in your area.
          </p>
          <p className="text-white/40 text-sm mb-8">
            We'll pre-match you with vetted pros for <strong className="text-white/60">{serviceNeeded}</strong> before you even have to ask.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 text-left">
            <p className="text-white font-semibold text-sm mb-1">Share with a neighbor</p>
            <p className="text-white/50 text-xs mb-3">
              When they join with your link, you both get priority access.
            </p>
            <div className="flex gap-2">
              <input
                readOnly
                value={referralLink}
                className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white/70 text-xs truncate"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(referralLink);
                  toast.success("Link copied!");
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors"
              >
                <Copy className="w-3.5 h-3.5" /> Copy
              </button>
            </div>
            <button
              onClick={() => {
                const text = `I just joined the TrustyPro waitlist — AI-matched home service pros, free quotes, no spam. Join here:`;
                window.open(`sms:?body=${encodeURIComponent(text + " " + referralLink)}`, "_blank");
              }}
              className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-green-600 hover:bg-green-500 text-white text-sm font-medium transition-colors"
            >
              <MessageSquare className="w-4 h-4" /> Text a Neighbor
            </button>
          </div>

          <a href="/" className="text-indigo-400 hover:text-indigo-300 text-sm underline">
            Back to home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #0F0C29 0%, #1B1464 50%, #24243e 100%)" }}
    >
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-medium mb-4">
            <Home className="w-3.5 h-3.5" /> Homeowner Waitlist
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
            Find Trusted Pros.<br />Get Free Quotes.
          </h1>
          <p className="text-white/60 text-lg max-w-lg mx-auto">
            Tell us what you need. We'll match you with vetted, local home service professionals.
          </p>
        </div>

        {/* 3-column benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center"
            >
              <div className="flex justify-center mb-3">{b.icon}</div>
              <p className="text-white font-semibold text-sm mb-1">{b.title}</p>
              <p className="text-white/50 text-xs leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-white/70 text-sm mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> First Name *
                </Label>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Jane"
                  required
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-11"
                />
              </div>
              <div>
                <Label className="text-white/70 text-sm mb-1.5 block">Last Name *</Label>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Smith"
                  required
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-11"
                />
              </div>
            </div>

            {/* Contact row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-white/70 text-sm mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Email *
                </Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@email.com"
                  required
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-11"
                />
              </div>
              <div>
                <Label className="text-white/70 text-sm mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> Phone
                </Label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(214) 555-0100"
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-11"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <Label className="text-white/70 text-sm mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Street Address *
              </Label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main Street"
                required
                className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-11"
              />
            </div>

            {/* City / State / Zip */}
            <div className="grid grid-cols-6 gap-3">
              <div className="col-span-3">
                <Label className="text-white/70 text-sm mb-1.5 block">City *</Label>
                <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Frisco"
                  required
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-11"
                />
              </div>
              <div className="col-span-1">
                <Label className="text-white/70 text-sm mb-1.5 block">State *</Label>
                <div className="relative">
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full h-11 px-3 pr-8 rounded-md bg-white/5 border border-white/20 text-white text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {US_STATES.map((s) => (
                      <option key={s} value={s} className="bg-gray-900 text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-white/40 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              <div className="col-span-2">
                <Label className="text-white/70 text-sm mb-1.5 block">ZIP Code *</Label>
                <Input
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="75034"
                  maxLength={10}
                  required
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-11"
                />
              </div>
            </div>

            {/* Service Needed */}
            <div>
              <Label className="text-white/70 text-sm mb-1.5 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" /> Service Needed *
              </Label>
              <div className="relative">
                <select
                  value={serviceNeeded}
                  onChange={(e) => setServiceNeeded(e.target.value)}
                  required
                  className="w-full h-11 px-3 pr-8 rounded-md bg-white/5 border border-white/20 text-white text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="" className="bg-gray-900 text-white/50">
                    Select a service...
                  </option>
                  {SERVICE_OPTIONS.map((s) => (
                    <option key={s} value={s} className="bg-gray-900 text-white">
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-white/40 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <Label className="text-white/70 text-sm mb-1.5 block">
                Additional Notes <span className="text-white/30">(optional)</span>
              </Label>
              <Textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Any details that would help us match you with the right pro..."
                rows={3}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/30 resize-none"
              />
            </div>

            {/* Privacy badge */}
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-indigo-900/30 border border-indigo-500/20">
              <Lock className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <p className="text-xs text-indigo-200 leading-relaxed">
                <strong className="text-indigo-300">Your info is protected.</strong> We never sell your data. Pros only see your service request — not your personal contact details — until you choose to connect.
              </p>
            </div>

            <Button
              type="submit"
              disabled={!isValid || submitMutation.isPending}
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base disabled:opacity-50 transition-colors"
            >
              {submitMutation.isPending ? "Joining..." : "Join the Waitlist — Free"}
            </Button>
          </form>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          No credit card required. No spam. Cancel anytime.
        </p>
      </div>
    </div>
  );
}
