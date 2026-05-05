import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { TrustyProLogo } from "@/components/TrustyProLogo";
import { Plus, X, Star, Menu, Phone, Mail, MapPin, Shield, Clock, Award, MessageSquare, ArrowRight, Camera, CheckCircle, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import type React from "react";

// ---------------------------------------------------------------------------
// Deep 7-Step Homeowner Waitlist Modal
// ---------------------------------------------------------------------------
const ACCENT = "#4F46E5";

const HOME_TYPES = ["single_family", "townhouse", "condo", "multi_family", "mobile"] as const;
const HOME_TYPE_LABELS: Record<string, string> = {
  single_family: "Single Family Home", townhouse: "Townhouse", condo: "Condo / Apartment",
  multi_family: "Multi-Family", mobile: "Mobile / Manufactured",
};
const CONDITIONS = ["excellent", "good", "fair", "needs_work"] as const;
const CONDITION_LABELS: Record<string, string> = {
  excellent: "Excellent — move-in ready", good: "Good — minor issues only",
  fair: "Fair — several things need attention", needs_work: "Needs Work — major repairs needed",
};
const TIMELINES = ["asap", "3_months", "6_months", "1_year", "just_exploring"] as const;
const TIMELINE_LABELS: Record<string, string> = {
  asap: "ASAP — ready to start now", "3_months": "Within 3 months", "6_months": "Within 6 months",
  "1_year": "Within a year", just_exploring: "Just exploring options",
};
const BUDGETS = ["Under $5K", "$5K–$15K", "$15K–$50K", "$50K–$100K", "$100K+", "Not sure yet"];
const DESIRED_PROJECT_OPTIONS = [
  "Roofing", "HVAC / Air Conditioning", "Plumbing", "Electrical", "Kitchen Remodel",
  "Bathroom Remodel", "Flooring", "Interior Painting", "Exterior Painting / Siding",
  "Windows & Doors", "Landscaping / Lawn Care", "Deck / Patio", "Garage Door",
  "Gutters", "Insulation", "Foundation / Structural", "Pool / Spa", "Solar Panels",
  "Home Security", "Smart Home / Automation", "Pest Control", "Cleaning Services",
  "General Maintenance", "Other",
];
const SYSTEM_FIELDS = [
  { key: "roof", label: "Roof Type", placeholder: "e.g. Asphalt shingle, Metal, Tile" },
  { key: "hvac", label: "HVAC System", placeholder: "e.g. Central air, Mini-split, Heat pump" },
  { key: "water_heater", label: "Water Heater", placeholder: "e.g. Gas tank, Tankless, Electric" },
  { key: "electrical", label: "Electrical Panel", placeholder: "e.g. 200A breaker box, 100A, Fuse box" },
  { key: "plumbing", label: "Plumbing", placeholder: "e.g. Copper, PVC, PEX, Cast iron" },
  { key: "foundation", label: "Foundation Type", placeholder: "e.g. Slab, Pier & beam, Crawl space" },
  { key: "insulation", label: "Insulation", placeholder: "e.g. Blown-in, Batt, Spray foam" },
  { key: "windows", label: "Windows", placeholder: "e.g. Double-pane vinyl, Single-pane, Wood" },
];
const HEAR_ABOUT_OPTIONS = [
  "Google Search", "Social Media (Facebook/Instagram)", "Nextdoor", "YouTube",
  "Referral from a friend or neighbor", "Flyer / direct mail", "Home show / event",
  "ProLnk contractor referral", "Word of mouth", "Other",
];

type FormData = {
  // Step 1 — Contact
  firstName: string; lastName: string; email: string; phone: string;
  // Step 2 — Consent
  consentTerms: boolean; consentEmail: boolean; consentSms: boolean;
  consentPush: boolean; consentMarketing: boolean; consentDataUse: boolean;
  preferredContact: string;
  // Step 3 — Property basics
  address: string; city: string; state: string; zipCode: string;
  homeType: string; ownershipStatus: string; yearBuilt: string;
  squareFootage: string; bedrooms: string; bathrooms: string;
  stories: string; garageSpaces: string; lotSizeSqFt: string;
  hasPool: boolean; hasBasement: boolean; hasAttic: boolean;
  // Step 4 — Condition & history
  overallCondition: string; yearsOwned: string;
  recentImprovements: string; // free-text, comma-separated
  // Step 5 — Home systems
  homeSystems: Record<string, string>;
  // Step 6 — Projects & goals
  desiredProjects: string[]; projectTimeline: string;
  estimatedBudget: string; primaryPainPoint: string;
  // Step 7 — Referral & notes
  hearAboutUs: string; additionalNotes: string;
};

const EMPTY_FORM: FormData = {
  firstName: "", lastName: "", email: "", phone: "",
  consentTerms: false, consentEmail: false, consentSms: false,
  consentPush: false, consentMarketing: false, consentDataUse: false,
  preferredContact: "",
  address: "", city: "", state: "TX", zipCode: "",
  homeType: "single_family", ownershipStatus: "own",
  yearBuilt: "", squareFootage: "", bedrooms: "", bathrooms: "",
  stories: "", garageSpaces: "", lotSizeSqFt: "",
  hasPool: false, hasBasement: false, hasAttic: false,
  overallCondition: "good", yearsOwned: "",
  recentImprovements: "",
  homeSystems: {},
  desiredProjects: [], projectTimeline: "just_exploring",
  estimatedBudget: "", primaryPainPoint: "",
  hearAboutUs: "", additionalNotes: "",
};

const STEP_TITLES = [
  "Your Contact Info",
  "Communication Preferences",
  "Your Property",
  "Home Condition & History",
  "Home Systems",
  "Projects & Goals",
  "Final Details",
];

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-indigo-600">Step {step} of {total}</span>
        <span className="text-xs text-gray-400">{STEP_TITLES[step - 1]}</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(step / total) * 100}%`, backgroundColor: ACCENT }}
        />
      </div>
    </div>
  );
}

function Toggle({ checked, onChange, label, sublabel }: { checked: boolean; onChange: (v: boolean) => void; label: string; sublabel?: string }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div
        onClick={() => onChange(!checked)}
        className={`mt-0.5 w-11 h-6 rounded-full flex-shrink-0 relative transition-colors duration-200 ${checked ? "bg-indigo-600" : "bg-gray-200"}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${checked ? "translate-x-5" : ""}`} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-800">{label}</p>
        {sublabel && <p className="text-xs text-gray-400 mt-0.5">{sublabel}</p>}
      </div>
    </label>
  );
}

function MultiSelect({ options, selected, onChange }: { options: string[]; selected: string[]; onChange: (v: string[]) => void }) {
  const toggle = (opt: string) =>
    onChange(selected.includes(opt) ? selected.filter(x => x !== opt) : [...selected, opt]);
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => toggle(opt)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
            selected.includes(opt)
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

const inp = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-300 bg-white";
const sel = `${inp} text-gray-700`;

function HomeWaitlistModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const TOTAL = 7;

  const join = trpc.waitlist.joinHomeWaitlist.useMutation({
    onSuccess: () => setDone(true),
    onError: (e: { message?: string }) => toast.error(e.message || "Something went wrong. Please try again."),
  });

  const set = <K extends keyof FormData>(k: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(p => ({ ...p, [k]: e.target.value }));

  const next = () => {
    if (step === 1 && (!form.firstName.trim() || !form.email.trim())) {
      toast.error("First name and email are required."); return;
    }
    if (step === 2 && !form.consentTerms) {
      toast.error("You must agree to the Terms of Service to continue."); return;
    }
    if (step === 3 && (!form.address.trim() || !form.city.trim() || !form.zipCode.trim())) {
      toast.error("Address, city, and ZIP code are required."); return;
    }
    if (step === 6 && form.desiredProjects.length === 0) {
      toast.error("Please select at least one project you're interested in."); return;
    }
    if (step < TOTAL) setStep(s => s + 1);
    else handleSubmit();
  };

  const handleSubmit = () => {
    join.mutate({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim() || "—",
      email: form.email.trim(),
      phone: form.phone || undefined,
      address: form.address.trim(),
      city: form.city.trim(),
      state: form.state || "TX",
      zipCode: form.zipCode.trim(),
      homeType: (HOME_TYPES.includes(form.homeType as any) ? form.homeType : "single_family") as typeof HOME_TYPES[number],
      ownershipStatus: (["own", "rent"].includes(form.ownershipStatus) ? form.ownershipStatus : "own") as "own" | "rent",
      yearBuilt: form.yearBuilt ? parseInt(form.yearBuilt) : undefined,
      squareFootage: form.squareFootage ? parseInt(form.squareFootage) : undefined,
      lotSizeSqFt: form.lotSizeSqFt ? parseInt(form.lotSizeSqFt) : undefined,
      bedrooms: form.bedrooms ? parseInt(form.bedrooms) : undefined,
      bathrooms: form.bathrooms || undefined,
      stories: form.stories ? parseInt(form.stories) : undefined,
      garageSpaces: form.garageSpaces ? parseInt(form.garageSpaces) : undefined,
      hasPool: form.hasPool,
      hasBasement: form.hasBasement,
      hasAttic: form.hasAttic,
      overallCondition: (CONDITIONS.includes(form.overallCondition as any) ? form.overallCondition : undefined) as typeof CONDITIONS[number] | undefined,
      yearsOwned: form.yearsOwned ? parseInt(form.yearsOwned) : undefined,
      recentImprovements: form.recentImprovements
        ? form.recentImprovements.split(",").map(s => s.trim()).filter(Boolean)
        : undefined,
      homeSystems: Object.keys(form.homeSystems).length > 0 ? form.homeSystems : undefined,
      desiredProjects: form.desiredProjects.length > 0 ? form.desiredProjects : ["General home maintenance"],
      projectTimeline: (TIMELINES.includes(form.projectTimeline as any) ? form.projectTimeline : "just_exploring") as typeof TIMELINES[number],
      estimatedBudget: form.estimatedBudget || undefined,
      primaryPainPoint: form.primaryPainPoint || undefined,
      hearAboutUs: form.hearAboutUs || undefined,
      additionalNotes: form.additionalNotes || undefined,
      consentTerms: form.consentTerms,
      consentEmail: form.consentEmail,
      consentSms: form.consentSms,
      consentPush: form.consentPush ?? false,
      consentMarketing: form.consentMarketing ?? false,
      consentDataUse: form.consentDataUse ?? false,
      preferredContact: form.preferredContact || undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b border-gray-100">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: ACCENT }}>
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">TrustyPro Waitlist</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Build Your Home Profile</h2>
          <p className="text-xs text-gray-500 mt-0.5">The more you share, the better we can match you with the right pros when we launch.</p>
        </div>

        <div className="px-6 py-5">
          {done ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#EEF2FF" }}>
                <CheckCircle className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">You're on the list!</h3>
              <p className="text-gray-500 text-sm mb-2">Your home profile has been saved. We'll reach out as soon as TrustyPro opens in your area.</p>
              <p className="text-xs text-gray-400 mb-6">We'll only contact you through the channels you approved.</p>
              <button onClick={onClose} className="px-8 py-3 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: ACCENT }}>
                Close
              </button>
            </div>
          ) : (
            <>
              <ProgressBar step={step} total={TOTAL} />

              {/* Step 1 — Contact Info */}
              {step === 1 && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="First name *" value={form.firstName} onChange={set("firstName")} className={inp} />
                    <input placeholder="Last name" value={form.lastName} onChange={set("lastName")} className={inp} />
                  </div>
                  <input placeholder="Email address *" type="email" value={form.email} onChange={set("email")} className={inp} />
                  <input placeholder="Phone number (optional)" value={form.phone} onChange={set("phone")} className={inp} />
                  <p className="text-xs text-gray-400 pt-1">* Required fields. Your information is never sold or shared with third parties.</p>
                </div>
              )}

              {/* Step 2 — Communication Consent */}
              {step === 2 && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 mb-1">
                    Before we go further, we want your explicit permission to communicate with you. You control exactly how we reach out.
                  </p>
                  <div className="bg-indigo-50 rounded-xl p-4 space-y-4 border border-indigo-100">
                    <Toggle
                      checked={form.consentTerms}
                      onChange={v => setForm(p => ({ ...p, consentTerms: v }))}
                      label="I agree to the Terms of Service & Privacy Policy *"
                      sublabel="Required to join the waitlist"
                    />
                    <Toggle
                      checked={form.consentEmail}
                      onChange={v => setForm(p => ({ ...p, consentEmail: v }))}
                      label="Email communications"
                      sublabel="Waitlist updates, launch announcements, and home tips"
                    />
                    <Toggle
                      checked={form.consentSms}
                      onChange={v => setForm(p => ({ ...p, consentSms: v }))}
                      label="SMS / Text messages"
                      sublabel="Time-sensitive updates and appointment reminders"
                    />
                    <Toggle
                      checked={form.consentPush}
                      onChange={v => setForm(p => ({ ...p, consentPush: v }))}
                      label="Push notifications"
                      sublabel="In-app alerts when we launch in your area"
                    />
                    <Toggle
                      checked={form.consentMarketing}
                      onChange={v => setForm(p => ({ ...p, consentMarketing: v }))}
                      label="Promotional & marketing messages"
                      sublabel="Special offers, partner promotions, and seasonal tips"
                    />
                    <Toggle
                      checked={form.consentDataUse}
                      onChange={v => setForm(p => ({ ...p, consentDataUse: v }))}
                      label="Use my home data to match me with pros"
                      sublabel="Allows AI to analyze your profile and recommend the right contractors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Preferred way to reach you</label>
                    <select value={form.preferredContact} onChange={set("preferredContact")} className={sel}>
                      <option value="">No preference</option>
                      <option value="email">Email</option>
                      <option value="sms">Text / SMS</option>
                      <option value="phone">Phone call</option>
                      <option value="any">Any — whatever is fastest</option>
                    </select>
                  </div>
                  <p className="text-xs text-gray-400">You can update your preferences at any time. We will never contact you without your permission.</p>
                </div>
              )}

              {/* Step 3 — Property Basics */}
              {step === 3 && (
                <div className="space-y-3">
                  <input placeholder="Street address *" value={form.address} onChange={set("address")} className={inp} />
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="City *" value={form.city} onChange={set("city")} className={inp} />
                    <input placeholder="ZIP code *" value={form.zipCode} onChange={set("zipCode")} className={inp} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">State</label>
                      <input placeholder="TX" value={form.state} onChange={set("state")} className={inp} maxLength={2} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Ownership</label>
                      <select value={form.ownershipStatus} onChange={set("ownershipStatus")} className={sel}>
                        <option value="own">I own this home</option>
                        <option value="rent">I rent this home</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Home Type</label>
                    <select value={form.homeType} onChange={set("homeType")} className={sel}>
                      {HOME_TYPES.map(t => <option key={t} value={t}>{HOME_TYPE_LABELS[t]}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Year Built</label>
                      <input placeholder="e.g. 1998" value={form.yearBuilt} onChange={set("yearBuilt")} className={inp} type="number" min="1800" max="2025" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Sq Footage</label>
                      <input placeholder="e.g. 2400" value={form.squareFootage} onChange={set("squareFootage")} className={inp} type="number" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Bedrooms</label>
                      <select value={form.bedrooms} onChange={set("bedrooms")} className={sel}>
                        <option value="">—</option>
                        {["1","2","3","4","5","6+"].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Bathrooms</label>
                      <select value={form.bathrooms} onChange={set("bathrooms")} className={sel}>
                        <option value="">—</option>
                        {["1","1.5","2","2.5","3","3.5","4+"].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Stories</label>
                      <select value={form.stories} onChange={set("stories")} className={sel}>
                        <option value="">—</option>
                        {["1","2","3"].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Garage Spaces</label>
                      <select value={form.garageSpaces} onChange={set("garageSpaces")} className={sel}>
                        <option value="">—</option>
                        {["0","1","2","3","4+"].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Lot Size (sq ft)</label>
                      <input placeholder="e.g. 8500" value={form.lotSizeSqFt} onChange={set("lotSizeSqFt")} className={inp} type="number" />
                    </div>
                  </div>
                  <div className="flex gap-6 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                      <input type="checkbox" checked={form.hasPool} onChange={e => setForm(p => ({ ...p, hasPool: e.target.checked }))} className="w-4 h-4 accent-indigo-600" />
                      Pool / Spa
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                      <input type="checkbox" checked={form.hasBasement} onChange={e => setForm(p => ({ ...p, hasBasement: e.target.checked }))} className="w-4 h-4 accent-indigo-600" />
                      Basement
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                      <input type="checkbox" checked={form.hasAttic} onChange={e => setForm(p => ({ ...p, hasAttic: e.target.checked }))} className="w-4 h-4 accent-indigo-600" />
                      Attic
                    </label>
                  </div>
                </div>
              )}

              {/* Step 4 — Condition & History */}
              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">Overall Home Condition</label>
                    <div className="grid grid-cols-1 gap-2">
                      {CONDITIONS.map(c => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setForm(p => ({ ...p, overallCondition: c }))}
                          className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                            form.overallCondition === c
                              ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-medium"
                              : "border-gray-200 text-gray-600 hover:border-indigo-200"
                          }`}
                        >
                          {CONDITION_LABELS[c]}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Years Owned (or lived here)</label>
                    <input placeholder="e.g. 5" value={form.yearsOwned} onChange={set("yearsOwned")} className={inp} type="number" min="0" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Recent Improvements</label>
                    <p className="text-xs text-gray-400 mb-1.5">List any major work done in the last 5 years, separated by commas.</p>
                    <textarea
                      placeholder="e.g. New roof 2022, HVAC replaced 2021, Kitchen remodel 2023"
                      value={form.recentImprovements}
                      onChange={set("recentImprovements")}
                      rows={3}
                      className={`${inp} resize-none`}
                    />
                  </div>
                </div>
              )}

              {/* Step 5 — Home Systems */}
              {step === 5 && (
                <div className="space-y-3">
                  <p className="text-xs text-gray-500 mb-2">
                    Tell us about your home's major systems. This helps us match you with the right specialists. Leave blank if you're unsure.
                  </p>
                  {SYSTEM_FIELDS.map(({ key, label, placeholder }) => (
                    <div key={key}>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
                      <input
                        placeholder={placeholder}
                        value={form.homeSystems[key] || ""}
                        onChange={e => setForm(p => ({ ...p, homeSystems: { ...p.homeSystems, [key]: e.target.value } }))}
                        className={inp}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Step 6 — Projects & Goals */}
              {step === 6 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">Projects You're Interested In *</label>
                    <p className="text-xs text-gray-400 mb-2">Select all that apply.</p>
                    <MultiSelect
                      options={DESIRED_PROJECT_OPTIONS}
                      selected={form.desiredProjects}
                      onChange={v => setForm(p => ({ ...p, desiredProjects: v }))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">Project Timeline</label>
                    <div className="space-y-2">
                      {TIMELINES.map(t => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setForm(p => ({ ...p, projectTimeline: t }))}
                          className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-all ${
                            form.projectTimeline === t
                              ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-medium"
                              : "border-gray-200 text-gray-600 hover:border-indigo-200"
                          }`}
                        >
                          {TIMELINE_LABELS[t]}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Estimated Budget</label>
                    <select value={form.estimatedBudget} onChange={set("estimatedBudget")} className={sel}>
                      <option value="">Select a range</option>
                      {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Biggest Pain Point</label>
                    <select value={form.primaryPainPoint} onChange={set("primaryPainPoint")} className={sel}>
                      <option value="">Select one</option>
                      <option value="finding_trusted_pros">Finding trusted, reliable contractors</option>
                      <option value="getting_quotes">Getting accurate quotes without being overcharged</option>
                      <option value="scheduling">Scheduling and follow-through</option>
                      <option value="tracking_maintenance">Tracking what needs maintenance and when</option>
                      <option value="quality_control">Ensuring quality work is done right</option>
                      <option value="communication">Poor communication from contractors</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 7 — Final Details */}
              {step === 7 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">How did you hear about TrustyPro?</label>
                    <select value={form.hearAboutUs} onChange={set("hearAboutUs")} className={sel}>
                      <option value="">Select one</option>
                      {HEAR_ABOUT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Anything else you'd like us to know?</label>
                    <textarea
                      placeholder="Special circumstances, specific projects in mind, questions about the platform..."
                      value={form.additionalNotes}
                      onChange={set("additionalNotes")}
                      rows={4}
                      className={`${inp} resize-none`}
                    />
                  </div>
                  {/* Summary card */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-xs text-gray-600 space-y-1">
                    <p className="font-semibold text-gray-800 mb-2">Profile Summary</p>
                    <p><span className="text-gray-400">Name:</span> {form.firstName} {form.lastName}</p>
                    <p><span className="text-gray-400">Email:</span> {form.email}</p>
                    <p><span className="text-gray-400">Address:</span> {form.address}, {form.city}, {form.state} {form.zipCode}</p>
                    <p><span className="text-gray-400">Home:</span> {HOME_TYPE_LABELS[form.homeType]} · {form.squareFootage ? `${form.squareFootage} sq ft · ` : ""}{form.bedrooms ? `${form.bedrooms}bd ` : ""}{form.bathrooms ? `${form.bathrooms}ba` : ""}</p>
                    <p><span className="text-gray-400">Projects:</span> {form.desiredProjects.length > 0 ? form.desiredProjects.slice(0, 3).join(", ") + (form.desiredProjects.length > 3 ? ` +${form.desiredProjects.length - 3} more` : "") : "None selected"}</p>
                    <p><span className="text-gray-400">Timeline:</span> {TIMELINE_LABELS[form.projectTimeline]}</p>
                    <p><span className="text-gray-400">Notifications:</span> {[form.consentEmail && "Email", form.consentSms && "SMS", form.consentPush && "Push"].filter(Boolean).join(", ") || "None selected"}</p>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-3 mt-6">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(s => s - 1)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                )}
                <button
                  type="button"
                  onClick={next}
                  disabled={join.isPending}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: ACCENT }}
                >
                  {join.isPending ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                  ) : step === TOTAL ? (
                    <><CheckCircle className="w-4 h-4" /> Submit My Home Profile</>
                  ) : (
                    <>Continue <ChevronRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// --- CDN Images ----------------------------------------------------------------
const CDN = {
  heroModel:      "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/framer-hero-reference_949730d3.webp",
  heroExterior:   "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/home-exterior-modern_d492c1af.jpg",
  heroInterior:   "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/trustypro-hero-interior_21ad489c.webp",
  aboutWide:      "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/living-room-luxury_9bf5543c.jpg",
  aboutWide2:     "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/kitchen-white-cabinets_d735258a.jpg",
  projectKitchen: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/project-kitchen_d8ca391a.jpg",
  projectRoofing: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/project-roofing_7f6afdec.jpg",
  projectBath:    "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/project-bathroom_f9a2bb62.jpg",
  projectLand:    "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/project-landscaping_7000c429.jpg",
  projectPaint:   "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/project-painting-c7oS8XApoWgskDsGbPd6h7.webp",
  projectFloor:   "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/project-flooring_e65ecd45.jpg",
  projectHVAC:    "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/project-hvac-RMvrh5j9LFy8iRDqmf8xvZ.webp",
  projectPlumb:   "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/project-plumbing-2mpXEhBrHpF7opmP2R7fBg.webp",
  beforeFront:    "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/demo-before-front-jqo6uC4xnXLx3JnChPjeTu.webp",
  afterFront:     "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/demo-after-front-JyL4xHCPoi4dWpiePAXTFA.webp",
  scanFrontYard:  "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/trustypro-frontyard-damage-scan-v2-D9sW97trHmaDoMH7jXUN8A.webp",
  scanBackYard:   "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/trustypro-backyard-damage-scan-iNiCrAstyruUq9w9XysU59.webp",
};

// --- Accent Color --------------------------------------------------------------
const ACCENT_LIGHT = "#EEF2FF";

// --- Services ------------------------------------------------------------------
const SERVICES = [
  { title: "Exterior Renovations", desc: "At TrustyPro, we enhance your home's curb appeal with expert exterior improvements. From siding and windows to patios and landscaping, we deliver durable, attractive upgrades that make your home stand out.", image: CDN.heroExterior },
  { title: "Kitchen Remodeling",   desc: "Transform your kitchen into a functional, beautiful space. Our verified pros handle everything from cabinet installation and countertops to full gut renovations -- delivering the kitchen you've always wanted.", image: CDN.projectKitchen },
  { title: "Bathroom Upgrades",    desc: "Upgrade your bathrooms with premium fixtures, tile work, and custom vanities. TrustyPro connects you with verified bathroom specialists who deliver spa-quality results on time and on budget.", image: CDN.projectBath },
  { title: "Flooring & Interior",  desc: "From hardwood and luxury vinyl to tile and carpet, our flooring pros transform every room. We also handle interior painting, trim work, and complete room makeovers to refresh your living spaces.", image: CDN.projectFloor },
  { title: "HVAC & Plumbing",      desc: "Keep your home running smoothly with certified HVAC and plumbing professionals. From AC installations and furnace repairs to pipe replacements and water heater installs, our verified pros handle it all.", image: CDN.projectHVAC },
];

// --- Projects ------------------------------------------------------------------
const PROJECTS = [
  { cat: "Kitchen Remodel",   year: "2025", title: "Modern Kitchen Transformation",   desc: "Full gut renovation with quartz countertops and custom cabinetry in Frisco.", img: CDN.projectKitchen },
  { cat: "Exterior",          year: "2025", title: "Luxury Curb Appeal Upgrade",       desc: "Complete exterior renovation with new siding, windows, and landscaping.", img: CDN.heroExterior },
  { cat: "Bathroom",          year: "2025", title: "Master Bath Spa Retreat",          desc: "Walk-in shower, soaking tub, and heated floors in a Plano home.", img: CDN.projectBath },
  { cat: "Flooring",          year: "2025", title: "Hardwood Throughout",              desc: "3,200 sq ft of white oak hardwood installed in a Frisco home.", img: CDN.projectFloor },
  { cat: "Landscaping",       year: "2025", title: "Backyard Oasis",                   desc: "Full landscaping with pergola, turf, and outdoor lighting in Allen.", img: CDN.projectLand },
  { cat: "Painting",          year: "2025", title: "Interior Refresh",                 desc: "Full interior repaint with premium Sherwin-Williams paint in McKinney.", img: CDN.projectPaint },
];

// --- Benefits ------------------------------------------------------------------
const BENEFITS = [
  { icon: Shield,         title: "Verified & Insured Pros",   desc: "Every TrustyPro contractor is background-checked, licensed, and fully insured. You get peace of mind with every project." },
  { icon: Camera,         title: "AI-Matched to Your Home",   desc: "Our AI scans your home photos to identify exactly what needs attention and matches you with the right specialist." },
  { icon: Clock,          title: "Fast Response Times",       desc: "Get matched with available pros in your area within hours, not days. We know your time is valuable." },
  { icon: Award,          title: "Quality Guaranteed",        desc: "Every job comes with a satisfaction guarantee. If you're not happy, we make it right -- no questions asked." },
  { icon: MessageSquare,  title: "Transparent Communication", desc: "Track your project from quote to completion. No surprises, no hidden fees -- just clear, honest communication." },
];

// --- Testimonials --------------------------------------------------------------
const TESTIMONIALS = [
  { name: "Sarah M.",    loc: "Frisco, TX",   rating: 5, text: "TrustyPro matched me with an amazing kitchen contractor. The whole process was seamless -- from the AI scan to the final walkthrough. My kitchen looks incredible.", proj: "Kitchen Remodel" },
  { name: "James T.",    loc: "Plano, TX",    rating: 5, text: "I was skeptical at first but the AI photo scan actually found issues I didn't even know about. Got my roof fixed before the next storm season. Worth every penny.", proj: "Roof Repair" },
  { name: "Maria L.",    loc: "McKinney, TX", rating: 5, text: "Three quotes in 24 hours, all from verified pros. Chose the best one and my bathroom renovation was done in 8 days. Absolutely stunning results.", proj: "Bathroom Remodel" },
  { name: "David K.",    loc: "Allen, TX",    rating: 5, text: "The contractor TrustyPro matched me with was professional, on time, and under budget. My backyard transformation exceeded every expectation.", proj: "Landscaping" },
  { name: "Jennifer R.", loc: "Prosper, TX",  rating: 5, text: "As a first-time homeowner, I was nervous about hiring contractors. TrustyPro made it easy and safe. My flooring looks amazing and the process was stress-free.", proj: "Hardwood Flooring" },
  { name: "Michael B.",  loc: "Celina, TX",   rating: 5, text: "The AI scan found a plumbing issue behind my walls that I never would have caught. Saved me from a major disaster. TrustyPro is a game-changer.", proj: "Plumbing" },
];

// --- FAQ -----------------------------------------------------------------------
const FAQS = [
  { q: "What types of home improvement projects do you specialize in?", a: "TrustyPro covers the full spectrum of home improvements -- from kitchen and bathroom remodels to roofing, HVAC, plumbing, flooring, painting, landscaping, and more. If it's your home, we've got a verified pro for it." },
  { q: "How do I get started with a project?",                          a: "Simply upload photos of your home or describe what you need. Our AI analyzes your home and matches you with verified local pros. You'll receive quotes within 24 hours." },
  { q: "Are TrustyPro contractors verified and insured?",               a: "Yes -- every contractor on TrustyPro is background-checked, license-verified, and carries full liability insurance. We don't let just anyone on the platform." },
  { q: "How long does a typical project take?",                         a: "Project timelines vary by scope. Small jobs like painting or flooring can be completed in 1-3 days. Larger renovations like kitchen remodels typically take 2-6 weeks. Your pro will provide a detailed timeline upfront." },
  { q: "What if I'm not satisfied with the work?",                      a: "TrustyPro stands behind every project with a satisfaction guarantee. If you're not happy with the results, contact us within 30 days and we'll work to make it right at no additional cost." },
  { q: "Can I get multiple quotes from different contractors?",          a: "Absolutely. We encourage you to compare quotes from multiple verified pros. Our platform makes it easy to review profiles, ratings, and past work before making your decision." },
];

// --- Marquee Items -------------------------------------------------------------
const MARQUEE = ["Kitchen Remodeling", "Bathroom Renovation", "Roofing & Gutters", "HVAC Installation", "Flooring & Tile", "Interior Painting", "Landscaping", "Plumbing", "Electrical", "Deck & Patio", "Windows & Doors", "Basement Finishing"];


// --- Animation Variants --------------------------------------------------------
const EASE = "easeOut" as const;

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const fadeUpSlow = {
  hidden: { opacity: 0, y: 64 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// --- Animated Section Wrapper --------------------------------------------------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AnimSection({ children, className, id, variants = fadeUp }: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variants?: Record<string, any>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

// --- CountUp Hook --------------------------------------------------------------
function useCountUp(end: number, decimals = 0) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);
  useEffect(() => {
    if (!started) return;
    const step = end / (2000 / 16);
    let cur = 0;
    const t = setInterval(() => {
      cur = Math.min(cur + step, end);
      setCount(parseFloat(cur.toFixed(decimals)));
      if (cur >= end) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [started, end, decimals]);
  return { count, ref };
}

// --- Parallax Image ------------------------------------------------------------
function ParallaxImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1.18 }}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

// --- Before/After Slider -------------------------------------------------------
function BeforeAfterSlider({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  const cRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const update = (x: number) => {
    if (!cRef.current) return;
    const r = cRef.current.getBoundingClientRect();
    setPos(Math.max(0, Math.min(((x - r.left) / r.width) * 100, 100)));
  };
  return (
    <div ref={cRef} className="relative w-full h-full select-none overflow-hidden cursor-ew-resize rounded-2xl"
      onMouseDown={e => { dragging.current = true; update(e.clientX); e.preventDefault(); }}
      onMouseMove={e => { if (dragging.current) update(e.clientX); }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onTouchStart={e => { dragging.current = true; update(e.touches[0].clientX); }}
      onTouchMove={e => { if (dragging.current) update(e.touches[0].clientX); }}
      onTouchEnd={() => { dragging.current = false; }}
    >
      <img src={after}  alt="After"  className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={before} alt="Before" className="absolute inset-0 h-full object-cover" style={{ width: `${10000/pos}%`, maxWidth: "none" }} draggable={false} />
      </div>
      <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-xl z-10" style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-2xl flex items-center justify-center">
          <ChevronLeft size={12} className="text-gray-600" /><ChevronRight size={12} className="text-gray-600" />
        </div>
      </div>
      <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-black/60 text-white text-xs font-bold uppercase tracking-widest">BEFORE</div>
      <div className="absolute top-3 right-3 z-10 px-2.5 py-1 text-white text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: ACCENT }}>AFTER</div>
    </div>
  );
}

// --- Scan Demo Carousel ---------------------------------------------------------------------------------
const SCAN_TABS = [
  {
    label: "Interior",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/trustypro-hero-interior_21ad489c.webp",
    issues: [
      { label: "Water Damage", color: "#ef4444" },
      { label: "Floor Refinishing", color: "#f59e0b" },
      { label: "Foundation Check", color: "#6366f1" },
    ],
    count: 3,
  },
  {
    label: "Front Yard",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/trustypro-frontyard-damage-scan-v2-D9sW97trHmaDoMH7jXUN8A.webp",
    issues: [
      { label: "Driveway Crack", color: "#ef4444" },
      { label: "Gutter Sagging", color: "#f59e0b" },
      { label: "Exterior Paint Fading", color: "#6366f1" },
    ],
    count: 3,
  },
  {
    label: "Back Yard",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/trustypro-backyard-damage-scan-iNiCrAstyruUq9w9XysU59.webp",
    issues: [
      { label: "Fence Damage", color: "#ef4444" },
      { label: "Deck Wear", color: "#f59e0b" },
      { label: "Drainage Issue", color: "#10b981" },
    ],
    count: 3,
  },
];

function ScanDemoCarousel() {
  const [active, setActive] = useState(0);
  const tab = SCAN_TABS[active];
  return (
    <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
      {/* Tab row */}
      <div className="flex bg-gray-950">
        {SCAN_TABS.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setActive(i)}
            className={`flex-1 py-3 text-sm font-bold transition-colors ${
              i === active ? "text-white border-b-2" : "text-gray-400 hover:text-gray-200"
            }`}
            style={i === active ? { borderBottomColor: ACCENT } : {}}
          >
            {t.label}
          </button>
        ))}
      </div>
      {/* Image */}
      <div className="relative">
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg" style={{ backgroundColor: ACCENT }}>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          AI Scan -- Live Detection Demo
        </div>
        <img
          src={tab.img}
          alt={`TrustyPro AI scan -- ${tab.label}`}
          className="w-full object-cover"
          style={{ maxHeight: 480 }}
        />
      </div>
      {/* Caption strip */}
      <div className="bg-gray-950 px-6 py-4 flex flex-wrap gap-4 items-center justify-between">
        <p className="text-white text-sm font-semibold">AI identified {tab.count} issues in this {tab.label.toLowerCase()} scan</p>
        <div className="flex flex-wrap gap-2">
          {tab.issues.map((tag) => (
            <span key={tag.label} className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: tag.color + "22", border: `1px solid ${tag.color}`, color: tag.color }}>
              {tag.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Main --------------------------------------------------------------------------------------
const SERVICE_TYPES = [
  "Kitchen Remodel", "Bathroom Upgrade", "Exterior / Curb Appeal",
  "Flooring", "Painting", "HVAC / Plumbing", "Landscaping", "Roofing",
  "General Repairs", "Other",
];

export default function TrustyProHome() {
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [openFaq, setOpenFaq]             = useState<number | null>(0);
  const [waitlistOpen, setWaitlistOpen]   = useState(false);

  // -- Intake modal state --------------------------------------------------
  const [intakeOpen, setIntakeOpen]       = useState(false);
  const [intakeStep, setIntakeStep]       = useState(1); // 1 = contact, 2 = project, 3 = success
  const [intakeForm, setIntakeForm]       = useState({
    name: "", email: "", phone: "", address: "",
    serviceType: "", description: "", urgency: "moderate" as "urgent" | "moderate" | "low",
  });

  const submitLead = trpc.trustyPro.submitRequest.useMutation({
    onSuccess: () => { setIntakeStep(3); },
    onError: (err: { message?: string }) => { toast.error(err.message || "Something went wrong. Please try again."); },
  });

  const openIntake = () => { setIntakeOpen(true); setIntakeStep(1); setIntakeForm({ name: "", email: "", phone: "", address: "", serviceType: "", description: "", urgency: "moderate" }); };
  const closeIntake = () => { setIntakeOpen(false); setIntakeStep(1); };

  const handleIntakeSubmit = () => {
    if (!intakeForm.name || !intakeForm.email || !intakeForm.address) {
      toast.error("Please fill in your name, email, and address."); return;
    }
    if (!intakeForm.serviceType || !intakeForm.description) {
      toast.error("Please describe your project."); return;
    }
    submitLead.mutate({
      name: intakeForm.name,
      email: intakeForm.email,
      phone: intakeForm.phone || undefined,
      address: intakeForm.address,
      serviceType: intakeForm.serviceType,
      description: intakeForm.description,
      urgency: intakeForm.urgency,
    });
  };

  const [, navigate] = useLocation();
  const { isAuthenticated } = useAuth();
  const goToWizard = () => {
    if (isAuthenticated) {
      navigate("/my-home/wizard");
    } else {
      setWaitlistOpen(true);
    }
  };
  // Unauthenticated users are directed to the waitlist modal instead of login

  const s1 = useCountUp(500);
  const s2 = useCountUp(47);
  const s3 = useCountUp(98);
  const s4 = useCountUp(2400);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  // Parallax for hero images
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroLeftY  = useTransform(heroScroll, [0, 1], ["0%", "18%"]);
  const heroRightY = useTransform(heroScroll, [0, 1], ["0%", "12%"]);

   return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* -- HOMEOWNER WAITLIST MODAL ------------------------------------------ */}
      {waitlistOpen && <HomeWaitlistModal onClose={() => setWaitlistOpen(false)} />}
      {/* -- INTAKE MODAL ------------------------------------------------------ */}
      <AnimatePresence>
        {intakeOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeIntake} />
            {/* Modal */}
            <motion.div
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {/* Header */}
              <div className="px-8 pt-8 pb-5 border-b border-gray-100">
                <button onClick={closeIntake} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <X className="w-4 h-4 text-gray-600" />
                </button>
                {intakeStep < 3 ? (
                  <>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: ACCENT }}>Free</span>
                      <span className="text-xs text-gray-400 font-medium">No credit card required</span>
                    </div>
                    <h2 className="text-2xl font-black text-gray-950">
                      {intakeStep === 1 ? "Tell us about yourself" : "Describe your project"}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {intakeStep === 1 ? "We'll match you with a verified local pro in your area." : "The more detail you share, the better we can match you."}
                    </p>
                    {/* Step indicator */}
                    <div className="flex gap-2 mt-4">
                      <div className="h-1 flex-1 rounded-full" style={{ backgroundColor: intakeStep >= 1 ? ACCENT : "#E5E7EB" }} />
                      <div className="h-1 flex-1 rounded-full" style={{ backgroundColor: intakeStep >= 2 ? ACCENT : "#E5E7EB" }} />
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: ACCENT_LIGHT }}>
                      <CheckCircle className="w-8 h-8" style={{ color: ACCENT }} />
                    </div>
                    <h2 className="text-2xl font-black text-gray-950">You're on the list!</h2>
                    <p className="text-gray-500 mt-2 text-sm">We received your request and will match you with a verified DFW pro within a few hours. Check your email for updates.</p>
                  </div>
                )}
              </div>

              {/* Body */}
              {intakeStep === 1 && (
                <div className="px-8 py-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text" placeholder="Jane Smith"
                        value={intakeForm.name}
                        onChange={e => setIntakeForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 text-gray-900"
                        style={{ focusRingColor: ACCENT } as React.CSSProperties}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel" placeholder="(214) 555-0100"
                        value={intakeForm.phone}
                        onChange={e => setIntakeForm(f => ({ ...f, phone: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 text-gray-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email" placeholder="jane@example.com"
                      value={intakeForm.email}
                      onChange={e => setIntakeForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Home Address *</label>
                    <input
                      type="text" placeholder="123 Main St, Frisco, TX 75034"
                      value={intakeForm.address}
                      onChange={e => setIntakeForm(f => ({ ...f, address: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 text-gray-900"
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (!intakeForm.name || !intakeForm.email || !intakeForm.address) {
                        toast.error("Please fill in your name, email, and address."); return;
                      }
                      setIntakeStep(2);
                    }}
                    className="w-full py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: ACCENT }}
                  >
                    Next -- Describe Your Project <ArrowRight className="inline w-4 h-4 ml-1" />
                  </button>
                </div>
              )}

              {intakeStep === 2 && (
                <div className="px-8 py-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">What type of project? *</label>
                    <div className="flex flex-wrap gap-2">
                      {SERVICE_TYPES.map(s => (
                        <button
                          key={s}
                          onClick={() => setIntakeForm(f => ({ ...f, serviceType: s }))}
                          className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                          style={intakeForm.serviceType === s ? { backgroundColor: ACCENT, color: "white", borderColor: ACCENT } : { backgroundColor: "white", color: "#374151", borderColor: "#E5E7EB" }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Describe what you need *</label>
                    <textarea
                      rows={3} placeholder="e.g. My kitchen cabinets need replacing and I'd like new countertops too..."
                      value={intakeForm.description}
                      onChange={e => setIntakeForm(f => ({ ...f, description: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 text-gray-900 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">How urgent is this?</label>
                    <div className="flex gap-2">
                      {(["urgent","moderate","low"] as const).map(u => (
                        <button
                          key={u}
                          onClick={() => setIntakeForm(f => ({ ...f, urgency: u }))}
                          className="flex-1 py-2 rounded-xl text-xs font-semibold border capitalize transition-all"
                          style={intakeForm.urgency === u ? { backgroundColor: ACCENT, color: "white", borderColor: ACCENT } : { backgroundColor: "white", color: "#374151", borderColor: "#E5E7EB" }}
                        >
                          {u === "urgent" ? " Urgent" : u === "moderate" ? " Moderate" : " No Rush"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIntakeStep(1)}
                      className="flex-1 py-3 rounded-xl text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleIntakeSubmit}
                      disabled={submitLead.isPending}
                      className="flex-1 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
                      style={{ backgroundColor: ACCENT }}
                    >
                      {submitLead.isPending ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : "Get Matched -- It's Free"}
                    </button>
                  </div>
                </div>
              )}

              {intakeStep === 3 && (
                <div className="px-8 py-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">You're All Set!</h3>
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-3 mb-4 inline-block">
                    <p className="text-indigo-900 font-bold text-lg">Position: #{submitLead.data?.position ?? '...'}</p>
                    <p className="text-indigo-700 text-xs mt-1">You're #{submitLead.data?.position ?? '...'} in the queue.</p>
                  </div>
                  <p className="text-gray-600 text-sm mb-6">We'll match you with vetted pros. Check your email for updates!</p>
                  <button
                    onClick={closeIntake}
                    className="w-full py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: ACCENT }}
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -- NAV --------------------------------------------------------------- */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/trustypro">
            <TrustyProLogo height={52} />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {[["about","About Us"],["services","Services"],["how-it-works","How It Works"],["benefits","Why TrustyPro"],["contact","Contact"]].map(([id,label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">{label}</button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button onClick={goToWizard} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Scan My Home</button>
            <button
              onClick={() => navigate("/trustypro/login")}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors border border-gray-200 px-4 py-2 rounded-full hover:border-gray-400"
            >
              My Home Login
            </button>
            <button onClick={goToWizard} className="px-5 py-2 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: ACCENT }}>
              Get Started
            </button>
          </div>
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}><Menu className="w-5 h-5" /></button>
        </div>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 overflow-hidden"
            >
              {[["about","About Us"],["services","Services"],["how-it-works","How It Works"],["benefits","Why TrustyPro"],["contact","Contact"]].map(([id,label]) => (
                <button key={id} onClick={() => scrollTo(id)} className="text-left text-sm font-medium text-gray-600">{label}</button>
              ))}
              <button onClick={goToWizard} className="text-left text-sm font-medium text-gray-600">Scan My Home</button>
              <button onClick={() => navigate("/trustypro/login")} className="text-left text-sm font-medium text-gray-600">My Home Login</button>
              <button onClick={goToWizard} className="px-5 py-2 rounded-full text-sm font-semibold text-white w-fit" style={{ backgroundColor: ACCENT }}>Get Started</button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* -- HERO -------------------------------------------------------------- */}
      <section className="bg-[#f5f5f5] pt-16 pb-0 overflow-hidden" ref={heroRef}>
        <div className="max-w-4xl mx-auto px-6 text-center">

          {/* FREE badge -- first thing they see */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ backgroundColor: "#dcfce7", border: "1.5px solid #86efac" }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-bold text-green-700">100% Free for Homeowners -- No Catch. No Credit Card.</span>
          </motion.div>

          {/* Headline -- lead with the difference */}
          <motion.h1
            className="text-5xl md:text-7xl font-black text-gray-950 leading-[1.05] tracking-tight mb-5"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          >
            Stop guessing.<br />
            <span style={{ color: ACCENT }}>Let your photos do the talking.</span>
          </motion.h1>

          {/* Differentiator line */}
          <motion.p
            className="text-xl text-gray-700 font-semibold leading-relaxed mb-3 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          >
            No more door-knockers. No more cold calls. No more guessing who to trust.
          </motion.p>

          {/* How it works in one sentence */}
          <motion.p
            className="text-base text-gray-500 leading-relaxed mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
          >
            Snap a few photos of your home. Our AI identifies exactly what needs attention and connects you with a background-checked, insured DFW pro -- in hours, not days.
          </motion.p>

          {/* CTA + trust signals */}
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.42 }}
          >
            <button
              onClick={goToWizard}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-base font-black text-white hover:opacity-90 transition-opacity shadow-xl"
              style={{ backgroundColor: ACCENT }}
            >
              Scan My Home -- It's Free <ArrowRight className="w-5 h-5" />
            </button>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400 font-medium">
              <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> No credit card required</span>
              <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" style={{ color: ACCENT }} /> Every pro is background-checked</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" style={{ color: ACCENT }} /> Matched in hours, not days</span>
            </div>
          </motion.div>
        </div>

        {/* Hero image -- house model on hand, centered, large */}
        <motion.div
          className="mt-12 max-w-3xl mx-auto px-6"
          initial={{ opacity: 0, y: 56 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.5 }}
        >
          <img
            src={CDN.heroModel}
            alt="Home model -- TrustyPro connects homeowners with trusted pros"
            className="w-full h-auto object-contain drop-shadow-2xl"
            style={{ maxHeight: 480 }}
          />
        </motion.div>

        {/* Marquee ticker */}
        <motion.div
          className="mt-0 bg-gray-950 py-4 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="flex animate-marquee-tp whitespace-nowrap">
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={i} className="mx-8 text-sm font-medium text-white/70 uppercase tracking-widest">
                {item} <span className="text-white/30 mx-4"></span>
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* -- ABOUT ------------------------------------------------------------- */}
      <section id="about" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
            <AnimSection variants={fadeLeft}>
              <h2 className="text-4xl md:text-5xl font-black text-gray-950 leading-tight">Experts in Improving Living Spaces</h2>
            </AnimSection>
            <AnimSection variants={fadeRight}>
              <div className="pt-2">
                <p className="text-lg text-gray-600 leading-relaxed">
                  At TrustyPro, we bring skill and care to every detail. We connect DFW homeowners with verified, background-checked professionals who turn ordinary rooms into beautiful, functional spaces that feel like home. Whether it's a small upgrade or a complete renovation, we make every improvement count.
                </p>
              <motion.button
                onClick={goToWizard}
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: ACCENT }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Scan My Home Free <ArrowRight className="w-4 h-4" />
              </motion.button>
              </div>
            </AnimSection>
          </div>
          <AnimSection variants={scaleIn}>
            <ParallaxImage src={CDN.aboutWide} alt="Beautiful living space" className="w-full h-[300px] md:h-[440px] rounded-2xl shadow-sm" />
          </AnimSection>
          <AnimSection variants={scaleIn} className="mt-4">
            <ParallaxImage src={CDN.aboutWide2} alt="Modern kitchen" className="w-full h-[240px] md:h-[340px] rounded-2xl shadow-sm" />
          </AnimSection>
        </div>
      </section>

      {/* -- STATS ------------------------------------------------------------- */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            {[
              { r: s1.ref, c: s1.count, suffix: "+",  label: "Projects Completed",    desc: "Home improvements delivered on time and on budget." },
              { r: s2.ref, c: s2.count, suffix: "+",  label: "Verified DFW Partners",   desc: "Background-checked, licensed pros across the metroplex." },
              { r: s3.ref, c: s3.count, suffix: "%",  label: "Customer Satisfaction",  desc: "Consistently high praise from our homeowners." },
              { r: s4.ref, c: s4.count, suffix: "+",  label: "Homeowners Matched",      desc: "Homeowners connected to the right pro for their project." },
            ].map((s, i) => (
              <motion.div key={i} ref={s.r as React.RefObject<HTMLDivElement>} className="text-center md:text-left" variants={staggerItem}>
                <div className="text-5xl md:text-6xl font-black text-gray-950 leading-none">{s.c.toLocaleString()}{s.suffix}</div>
                <div className="mt-2 text-sm font-bold text-gray-900">{s.label}</div>
                <div className="mt-1 text-xs text-gray-500 leading-relaxed">{s.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* -- PROJECTS ---------------------------------------------------------- */}
      <section id="projects" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection variants={fadeUp} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-white mb-4" style={{ backgroundColor: ACCENT }}>Projects</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-950">Our Work Speaks for Itself</h2>
            <p className="mt-3 text-gray-500 text-lg">See how we bring quality, clarity, and comfort to every DFW home.</p>
          </AnimSection>
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
          >
            {PROJECTS.map((p, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group cursor-pointer"
                variants={staggerItem}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="h-56 overflow-hidden">
                  <motion.img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.07 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: ACCENT }}>{p.cat}</span>
                    <span className="text-xs text-gray-400">{p.year}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{p.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <AnimSection variants={fadeUp} className="text-center mt-10">
                <motion.button
                onClick={() => window.location.href = "/trustypro/gallery"}
                className="px-8 py-3 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: ACCENT }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                View All Projects
              </motion.button>
          </AnimSection>
        </div>
      </section>

      {/* -- SERVICES ACCORDION ------------------------------------------------ */}
      <section id="services" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection variants={fadeUp} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-white mb-4" style={{ backgroundColor: ACCENT }}>Services</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-950">Experts in Transforming Living Spaces</h2>
            <p className="mt-3 text-gray-500 text-lg">Home improvements designed to enhance your space with style and lasting quality.</p>
          </AnimSection>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Accordion */}
            <AnimSection variants={fadeLeft}>
              <div>
                {SERVICES.map((svc, i) => (
                  <div key={i} className="border-b border-gray-100">
                    <button className="w-full flex items-center justify-between py-5 text-left group" onClick={() => setActiveService(i)}>
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-gray-400 w-6">0{i + 1}</span>
                        <span className={`text-base font-bold transition-colors ${activeService === i ? "text-gray-950" : "text-gray-600 group-hover:text-gray-900"}`}>{svc.title}</span>
                      </div>
                      <motion.div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: activeService === i ? ACCENT : "#F3F4F6" }}
                        animate={{ rotate: activeService === i ? 45 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <Plus className="w-3.5 h-3.5" style={{ color: activeService === i ? "white" : "#6B7280" }} />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {activeService === i && (
                        <motion.p
                          key="content"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="pb-5 pl-10 text-sm text-gray-500 leading-relaxed overflow-hidden"
                        >
                          {svc.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </AnimSection>
            {/* Photo with crossfade */}
            <AnimSection variants={fadeRight}>
              <div className="sticky top-24">
                <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg relative">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeService}
                      src={SERVICES[activeService].image}
                      alt={SERVICES[activeService].title}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  </AnimatePresence>
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* -- BEFORE / AFTER ---------------------------------------------------- */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection variants={fadeUp} className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-white mb-4" style={{ backgroundColor: ACCENT }}>Results</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-950">See the Transformation</h2>
            <p className="mt-3 text-gray-500 text-lg">Drag the slider to see before and after results from real TrustyPro projects.</p>
          </AnimSection>
          <AnimSection variants={scaleIn}>
            <div className="h-[320px] md:h-[500px]">
              <BeforeAfterSlider before={CDN.beforeFront} after={CDN.afterFront} />
            </div>
          </AnimSection>
        </div>
      </section>

      {/* -- BENEFITS ---------------------------------------------------------- */}
      <section id="benefits" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <AnimSection variants={fadeLeft}>
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-white mb-4" style={{ backgroundColor: ACCENT }}>Benefits</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-950 leading-tight">Why Choose TrustyPro</h2>
              <p className="mt-4 text-gray-500 text-lg leading-relaxed">We combine AI technology, verified professionals, and a seamless process to transform everyday spaces into lasting impressions.</p>
            </AnimSection>
            <motion.div
              className="space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={staggerContainer}
            >
              {BENEFITS.map((b, i) => (
                <motion.div
                  key={i}
                  className="bg-gray-50 rounded-2xl p-5 flex gap-4 items-start"
                  variants={staggerItem}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: ACCENT_LIGHT }}>
                    <b.icon className="w-5 h-5" style={{ color: ACCENT }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{b.title}</h3>
                    <p className="mt-1 text-sm text-gray-500 leading-relaxed">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* -- TESTIMONIALS ------------------------------------------------------ */}
      <section className="bg-gray-50 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection variants={fadeUp} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-white mb-4" style={{ backgroundColor: ACCENT }}>Reviews</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-950">What DFW Homeowners Say</h2>
            <p className="mt-3 text-gray-500 text-lg">Real reviews from real homeowners across the DFW Metroplex.</p>
          </AnimSection>
          {/* Staggered 2-column layout like Estatia -- cards come at you from different heights */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left column -- offset down */}
            <motion.div
              className="flex flex-col gap-6 md:mt-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
            >
              {[TESTIMONIALS[0], TESTIMONIALS[2], TESTIMONIALS[4]].map((t, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                  variants={{ hidden: { opacity: 0, y: 48, rotate: -1 }, visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.7, ease: EASE } } }}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex gap-1 mb-3">{Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">"{t.text}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                      <div className="text-xs text-gray-400">{t.loc}</div>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: ACCENT }}>{t.proj}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            {/* Right column -- offset up */}
            <motion.div
              className="flex flex-col gap-6 md:-mt-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } }}
            >
              {[TESTIMONIALS[1], TESTIMONIALS[3], TESTIMONIALS[5]].map((t, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                  variants={{ hidden: { opacity: 0, y: 48, rotate: 1 }, visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.7, ease: EASE } } }}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex gap-1 mb-3">{Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">"{t.text}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                      <div className="text-xs text-gray-400">{t.loc}</div>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: ACCENT }}>{t.proj}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* -- HOW IT WORKS ------------------------------------------------------ */}
      <section id="how-it-works" className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-6">
          <AnimSection variants={fadeUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-white mb-4" style={{ backgroundColor: ACCENT }}>How It Works</span>
            <h2 className="text-4xl md:text-6xl font-black text-gray-950 leading-tight">From Photo to Pro<br />in 3 Simple Steps</h2>
            <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">No calls. No guessing. No wasted time. Just upload a few photos and let us do the work.</p>
          </AnimSection>
          <div className="relative">
            {/* Vertical connector line on desktop */}
            <div className="hidden md:block absolute left-[39px] top-12 bottom-12 w-0.5 bg-gradient-to-b from-indigo-200 via-indigo-400 to-indigo-200" />
            <motion.div
              className="space-y-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.22 } } }}
            >
              {[
                {
                  n: "01",
                  icon: Camera,
                  title: "Snap a Few Photos of Your Home",
                  desc: "Take photos of any area you're curious about -- exterior, kitchen, bathroom, yard, roof. No special equipment needed. Your phone camera is all it takes.",
                  detail: "Takes less than 2 minutes"
                },
                {
                  n: "02",
                  icon: Shield,
                  title: "Our AI Identifies What Needs Attention",
                  desc: "TrustyPro's AI scans your photos and flags issues -- cracked paint, aging gutters, worn flooring, overgrown landscaping, and 50+ more. You get a clear, honest report of what your home actually needs.",
                  detail: "Results in under 60 seconds"
                },
                {
                  n: "03",
                  icon: CheckCircle,
                  title: "We Match You with a Verified Local Pro",
                  desc: "Based on your home's needs and your zip code, we connect you with a background-checked, insured professional who specializes in exactly that type of work. No middlemen. No bidding wars. Just the right pro.",
                  detail: "Matched within hours, not days"
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  className="flex gap-6 md:gap-10 items-start"
                  variants={{ hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } } }}
                >
                  {/* Step circle */}
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center shadow-lg z-10 relative" style={{ backgroundColor: ACCENT }}>
                      <step.icon className="w-7 h-7 text-white mb-1" />
                      <span className="text-xs font-black text-white/70">{step.n}</span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="pt-2 flex-1">
                    <h3 className="text-xl md:text-2xl font-black text-gray-950 mb-2">{step.title}</h3>
                    <p className="text-gray-500 leading-relaxed mb-3">{step.desc}</p>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: ACCENT_LIGHT, color: ACCENT }}>
                      <CheckCircle className="w-3 h-3" /> {step.detail}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          {/* -- AI Detection Demo Carousel -- */}
          <AnimSection variants={fadeUp} className="mt-14">
            <ScanDemoCarousel />
          </AnimSection>

          <AnimSection variants={fadeUp} className="text-center mt-10">
            <motion.button
              onClick={goToWizard}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white hover:opacity-90 transition-opacity shadow-lg"
              style={{ backgroundColor: ACCENT }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Try It Free -- Scan My Home <ArrowRight className="w-4 h-4" />
            </motion.button>
          </AnimSection>
        </div>
      </section>

      {/* -- DIFFERENTIATOR ---------------------------------------------------- */}
      <section className="py-24 overflow-hidden" style={{ backgroundColor: "#0a0f1e" }}>
        <div className="max-w-5xl mx-auto px-6">
          <AnimSection variants={fadeUp} className="mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-6" style={{ backgroundColor: "rgba(79,70,229,0.2)", color: "#818cf8" }}>Why TrustyPro Is Different</span>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
              They used to knock on your door.<br />
              <span style={{ color: "#818cf8" }}>Now you knock on theirs.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              For years, homeowners had to deal with door-to-door salespeople, pushy contractors, and cold calls from companies they never asked to hear from. TrustyPro flips that model completely.
            </p>
          </AnimSection>
          <motion.div
            className="grid md:grid-cols-2 gap-6 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {[
              {
                label: "The Old Way",
                icon: "",
                color: "#ef4444",
                bg: "rgba(239,68,68,0.08)",
                border: "rgba(239,68,68,0.2)",
                points: [
                  "Strangers show up at your door uninvited",
                  "You search for contractors and hope for the best",
                  "Three bids, three different opinions, zero clarity",
                  "You don't know if they're licensed or insured",
                  "Weeks pass before work even starts",
                ],
              },
              {
                label: "The TrustyPro Way",
                icon: "",
                color: "#818cf8",
                bg: "rgba(79,70,229,0.08)",
                border: "rgba(79,70,229,0.3)",
                points: [
                  "You initiate -- on your terms, on your timeline",
                  "AI scans your home and tells you exactly what it needs",
                  "One verified pro matched to your specific project",
                  "Every pro is background-checked, licensed, and insured",
                  "Matched within hours -- work starts when you're ready",
                ],
              },
            ].map((col, i) => (
              <motion.div
                key={i}
                className="rounded-2xl p-7 border"
                style={{ backgroundColor: col.bg, borderColor: col.border }}
                variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl font-black" style={{ color: col.color }}>{col.icon}</span>
                  <span className="font-black text-white text-lg">{col.label}</span>
                </div>
                <ul className="space-y-3">
                  {col.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="mt-0.5 flex-shrink-0 text-sm font-bold" style={{ color: col.color }}>{col.icon}</span>
                      <span className="text-gray-300 text-sm leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
          <AnimSection variants={fadeUp}>
            <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: "rgba(79,70,229,0.12)", border: "1px solid rgba(79,70,229,0.25)" }}>
              <p className="text-2xl md:text-3xl font-black text-white leading-snug mb-2">
                "We don't sell you anything. We find what your home needs -- and connect you with someone who can fix it."
              </p>
              <p className="text-gray-500 text-sm">-- The TrustyPro Promise</p>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* -- FAQ --------------------------------------------------------------- */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <AnimSection variants={fadeLeft}>
              <h2 className="text-4xl md:text-5xl font-black text-gray-950 leading-tight">Frequently Asked Questions</h2>
              <p className="mt-4 text-gray-500 leading-relaxed">Clear answers to common questions about our services and how TrustyPro works.</p>
              <motion.button
                onClick={() => scrollTo("contact")}
                className="mt-6 px-6 py-3 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: ACCENT }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Contact Support
              </motion.button>
            </AnimSection>
            <AnimSection variants={fadeRight}>
              <div>
                {FAQS.map((faq, i) => (
                  <div key={i} className="border-b border-gray-200">
                    <button className="w-full flex items-center justify-between py-5 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                      <span className="font-medium text-gray-900 pr-4 text-sm">{faq.q}</span>
                      <motion.div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: openFaq === i ? ACCENT : "#F3F4F6" }}
                        animate={{ rotate: openFaq === i ? 45 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <Plus className="w-3.5 h-3.5" style={{ color: openFaq === i ? "white" : "#6B7280" }} />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {openFaq === i && (
                        <motion.p
                          key="content"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="pb-5 text-sm text-gray-500 leading-relaxed overflow-hidden"
                        >
                          {faq.a}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* -- CTA --------------------------------------------------------------- */}
      <section id="contact" className="bg-gray-950 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl md:text-6xl font-black text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            Ready to Transform Your Home?
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          >
            Get matched with a verified TrustyPro contractor in your area today. Upload photos of your home and let our AI find exactly what needs attention.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
          >
              <motion.button
                onClick={goToWizard}
                className="px-8 py-4 rounded-full text-base font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: ACCENT }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Scan My Home Free
              </motion.button>
              <motion.button
                onClick={() => navigate("/trustypro/directory")}
                className="px-8 py-4 rounded-full text-base font-semibold text-gray-900 bg-white hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Browse Verified Pros
              </motion.button>
          </motion.div>
        </div>
      </section>

      {/* -- FOOTER ------------------------------------------------------------ */}
      <footer className="bg-gray-950 border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <TrustyProLogo height={34} variant="dark" />
              <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-xs">At TrustyPro, we transform DFW homes with verified professionals who blend style, function, and lasting quality into every project.</p>
            </div>
            <div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Menu</div>
              <div className="space-y-2">
                {[["about","About Us"],["projects","Projects"],["services","Services"],["benefits","Benefits"]].map(([id,label]) => (
                  <button key={id} onClick={() => scrollTo(id)} className="block text-sm text-gray-400 hover:text-white transition-colors">{label}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Contact</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-400"><Mail className="w-3.5 h-3.5" /> support@trustypro.com</div>
                <div className="flex items-center gap-2 text-sm text-gray-400"><MapPin className="w-3.5 h-3.5" /> DFW Metroplex, TX</div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">TrustyPro 2026. All Rights Reserved.</p>
            <div className="flex gap-6">
              <a href="/privacy" className="text-xs text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-xs text-gray-500 hover:text-white transition-colors">Terms of Service</a>
              <a href="/ccpa" className="text-xs text-gray-500 hover:text-white transition-colors">CCPA Rights</a>
              <button onClick={() => scrollTo("contact")} className="text-xs text-gray-500 hover:text-white transition-colors">Find a Pro</button>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes marquee-tp { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee-tp { animation: marquee-tp 30s linear infinite; }
      `}</style>
    </div>
  );
}
