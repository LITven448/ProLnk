/**
 * ProLnk Exchange Commercial Waitlist
 * 
 * Separate from the residential side — collects business type, portfolio size,
 * and service area for commercial contractors.
 * Replaces the "coming soon" toast on the ProLnk Exchange commercial section.
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Building2, CheckCircle, Users, DollarSign, MapPin,
  Briefcase, TrendingUp, ArrowRight, Shield
} from "lucide-react";

const BUSINESS_TYPES = [
  "General Contractor",
  "Roofing (Commercial)",
  "HVAC (Commercial)",
  "Electrical (Commercial)",
  "Plumbing (Commercial)",
  "Flooring (Commercial)",
  "Painting (Commercial)",
  "Landscaping (Commercial)",
  "Concrete / Masonry",
  "Steel / Metal Work",
  "Fire Protection",
  "Janitorial / Facilities",
  "Other",
];

const PORTFOLIO_RANGES = [
  "Under $500K/year",
  "$500K – $2M/year",
  "$2M – $10M/year",
  "$10M – $50M/year",
  "Over $50M/year",
];

const BENEFITS = [
  {
    icon: <Building2 className="w-5 h-5 text-blue-400" />,
    title: "Commercial-Grade Network",
    desc: "Connect with GCs, property managers, and facility directors — not homeowners",
  },
  {
    icon: <DollarSign className="w-5 h-5 text-emerald-400" />,
    title: "Higher Job Values",
    desc: "Commercial jobs average $50K–$500K. Commission rates scale with job size.",
  },
  {
    icon: <Shield className="w-5 h-5 text-purple-400" />,
    title: "Verified Commercial Roster",
    desc: "Every contractor is vetted for commercial licensing, bonding, and insurance",
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-amber-400" />,
    title: "Pipeline Intelligence",
    desc: "AI-driven project pipeline alerts — know about commercial jobs before they're bid",
  },
];

export default function ProLnkExchangeCommercial() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    businessName: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    businessType: "",
    portfolioSize: "",
    serviceArea: "",
    yearsInBusiness: "",
    currentSoftware: "",
    establishedJobsPerMonth: "",
    notes: "",
  });

  const submitWaitlist = trpc.waitlist.submitCommercialWaitlist.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("You're on the list! We'll be in touch soon.");
    },
    onError: (err) => {
      toast.error(err.message || "Submission failed. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.businessName || !form.contactEmail || !form.businessType || !form.portfolioSize) {
      toast.error("Please fill in all required fields.");
      return;
    }
    submitWaitlist.mutate(form);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">You're on the List</h2>
          <p className="text-gray-400">
            We're building the ProLnk Exchange commercial network carefully — vetting every contractor
            before launch. We'll contact you at <strong className="text-white">{form.contactEmail}</strong> when
            your spot is ready.
          </p>
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 text-left space-y-2">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">What happens next</p>
            {[
              "We review your application and verify your commercial credentials",
              "You receive an invite link with your contractor profile setup",
              "You're matched with commercial jobs in your service area",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="w-5 h-5 rounded-full bg-emerald-900/50 text-emerald-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">{i + 1}</span>
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-950 via-gray-950 to-gray-950 px-4 py-16 text-center">
        <Badge className="bg-blue-900/50 text-blue-300 border-blue-700 mb-4">Commercial — Separate from Residential</Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          ProLnk Exchange<br />
          <span className="text-blue-400">Commercial Network</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          The referral network for commercial contractors — GCs, property managers, and facility directors
          connecting on high-value commercial projects.
        </p>
        <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
          <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Commercial Only</span>
          <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> $50K+ avg job</span>
          <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> Vetted Contractors</span>
        </div>
      </div>

      {/* Benefits */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {BENEFITS.map((b, i) => (
            <div key={i} className="bg-gray-900 border border-gray-700 rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                {b.icon}
              </div>
              <div>
                <p className="font-semibold text-white text-sm mb-1">{b.title}</p>
                <p className="text-xs text-gray-400">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Waitlist Form */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Join the Commercial Waitlist</h2>
            <p className="text-gray-400 text-sm">
              We're accepting applications now. Spots are limited — commercial network launches Q3 2026.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-700 rounded-2xl p-6 space-y-5">
            {/* Business Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">Business Name *</Label>
                <Input
                  value={form.businessName}
                  onChange={(e) => setForm(f => ({ ...f, businessName: e.target.value }))}
                  placeholder="Acme Commercial Contractors"
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">Contact Name *</Label>
                <Input
                  value={form.contactName}
                  onChange={(e) => setForm(f => ({ ...f, contactName: e.target.value }))}
                  placeholder="John Smith"
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">Business Email *</Label>
                <Input
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) => setForm(f => ({ ...f, contactEmail: e.target.value }))}
                  placeholder="john@acmecontractors.com"
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">Phone</Label>
                <Input
                  type="tel"
                  value={form.contactPhone}
                  onChange={(e) => setForm(f => ({ ...f, contactPhone: e.target.value }))}
                  placeholder="(214) 555-0100"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            {/* Business Type */}
            <div className="space-y-1.5">
              <Label className="text-gray-300 text-sm">Primary Trade / Business Type *</Label>
              <div className="flex flex-wrap gap-2">
                {BUSINESS_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, businessType: type }))}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                      form.businessType === type
                        ? "bg-blue-600 text-white border-blue-500"
                        : "bg-gray-800 text-gray-400 border-gray-700 hover:border-blue-500"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Portfolio Size */}
            <div className="space-y-1.5">
              <Label className="text-gray-300 text-sm">Annual Revenue / Portfolio Size *</Label>
              <div className="flex flex-wrap gap-2">
                {PORTFOLIO_RANGES.map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, portfolioSize: range }))}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                      form.portfolioSize === range
                        ? "bg-emerald-600 text-white border-emerald-500"
                        : "bg-gray-800 text-gray-400 border-gray-700 hover:border-emerald-500"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Service Area & Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">Service Area (Cities / Metro)</Label>
                <Input
                  value={form.serviceArea}
                  onChange={(e) => setForm(f => ({ ...f, serviceArea: e.target.value }))}
                  placeholder="DFW Metro, Houston, Austin"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">Years in Business</Label>
                <Input
                  value={form.yearsInBusiness}
                  onChange={(e) => setForm(f => ({ ...f, yearsInBusiness: e.target.value }))}
                  placeholder="e.g. 12"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">Current Software Used</Label>
                <Input
                  value={form.currentSoftware}
                  onChange={(e) => setForm(f => ({ ...f, currentSoftware: e.target.value }))}
                  placeholder="Procore, Buildertrend, etc."
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">Established Jobs / Month</Label>
                <Input
                  value={form.establishedJobsPerMonth}
                  onChange={(e) => setForm(f => ({ ...f, establishedJobsPerMonth: e.target.value }))}
                  placeholder="e.g. 8"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-gray-300 text-sm">Anything else we should know?</Label>
              <Textarea
                value={form.notes}
                onChange={(e) => setForm(f => ({ ...f, notes: e.target.value }))}
                placeholder="Specialties, certifications, notable projects, or questions..."
                className="bg-gray-800 border-gray-700 text-white resize-none"
                rows={3}
              />
            </div>

            <Button
              type="submit"
              disabled={submitWaitlist.isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 flex items-center justify-center gap-2"
            >
              {submitWaitlist.isPending ? "Submitting..." : (
                <>Join Commercial Waitlist <ArrowRight className="w-4 h-4" /></>
              )}
            </Button>

            <p className="text-xs text-gray-600 text-center">
              By submitting, you agree to be contacted by ProLnk regarding the commercial network launch.
              No spam — we only reach out when your spot is ready.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
