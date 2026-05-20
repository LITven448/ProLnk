import { useState, useEffect, useRef, type ChangeEvent, type ReactNode } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { TrustyProLogo } from "@/components/TrustyProLogo";
import { AddressAutofill } from "@/components/AddressAutofill";
import {
  Home, Search, CheckCircle, ArrowRight, X, Mail, Phone, MapPin,
  Calendar, DollarSign, Sparkles, Shield, Award, Clock, Building2,
  Wrench, Zap, Droplets, Hammer, Paintbrush, Trees, Lock, Star,
  Flame, Wind, Loader2, ChevronRight,
} from "lucide-react";

const ACCENT = "#4F46E5";
const ACCENT_LIGHT = "#EEF2FF";

const DESIRED_PROJECT_OPTIONS = [
  "Roofing", "HVAC / Air Conditioning", "Plumbing", "Electrical", "Kitchen Remodel",
  "Bathroom Remodel", "Flooring", "Interior Painting", "Exterior Painting / Siding",
  "Windows & Doors", "Landscaping / Lawn Care", "Deck / Patio", "Garage Door",
  "Gutters", "Insulation", "Foundation / Structural", "Pool / Spa", "Solar Panels",
  "Home Security", "Smart Home / Automation", "Pest Control", "Cleaning Services",
  "General Maintenance", "Other",
];

const TIMELINE_OPTIONS = [
  { value: "asap", label: "ASAP — ready to start now" },
  { value: "3_months", label: "Within 3 months" },
  { value: "6_months", label: "Within 6 months" },
  { value: "just_exploring", label: "Just exploring options" },
];

const BUDGETS = ["Under $5K", "$5K–$15K", "$15K–$50K", "$50K–$100K", "$100K+", "Not sure yet"];

const TRADES = [
  { icon: Home, label: "Roofing" },
  { icon: Wind, label: "HVAC" },
  { icon: Droplets, label: "Plumbing" },
  { icon: Zap, label: "Electrical" },
  { icon: Hammer, label: "Remodeling" },
  { icon: Paintbrush, label: "Painting" },
  { icon: Trees, label: "Landscaping" },
  { icon: Building2, label: "Foundation" },
  { icon: Lock, label: "Security" },
  { icon: Flame, label: "Pool & Spa" },
  { icon: Wrench, label: "General Maint." },
  { icon: Sparkles, label: "Cleaning" },
];

const FAQS = [
  {
    q: "What is TrustyPro?",
    a: "TrustyPro is a homeowner platform launching soon in DFW. We help you build a complete profile of your home and connect you with verified, certified pros. Free to join the waitlist — paid pros pay us when they close a job.",
  },
  {
    q: "When does TrustyPro launch?",
    a: "We're onboarding our founding contractor network now. Homeowner access opens in waves as we verify enough TrustyPro Certified pros in each ZIP code. Join the waitlist to be notified the moment your area is live.",
  },
  {
    q: "What happens after I join the waitlist?",
    a: "You'll get a confirmation email and a private home profile we build together. As we onboard pros in your area, we'll match your home with the right professionals for the projects you're planning — no spam, no calls from random contractors.",
  },
  {
    q: "How are TrustyPro contractors verified?",
    a: "Every TrustyPro Certified pro is background-checked, license-verified, insured, and reviewed by our network. They earn the badge only after passing onboarding.",
  },
  {
    q: "Is TrustyPro free for homeowners?",
    a: "Yes — using TrustyPro to plan, document, and find pros is completely free. The platform is funded by a small platform fee paid by the pro when a job closes — never by you.",
  },
  {
    q: "Will my home data be private?",
    a: "Yes. Your home profile is yours. We only share your information with pros you explicitly request quotes from.",
  },
];

type PropertyAuto = {
  squareFeet: number | null;
  yearBuilt: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  propertyType: string | null;
};

type FormData = {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  property: PropertyAuto;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consentTerms: boolean;
  consentEmail: boolean;
  consentSms: boolean;
  desiredProjects: string[];
  projectTimeline: string;
  estimatedBudget: string;
  additionalNotes: string;
  betaOptIn: boolean;
};

const EMPTY: FormData = {
  address: "", city: "", state: "TX", zipCode: "",
  property: { squareFeet: null, yearBuilt: null, bedrooms: null, bathrooms: null, propertyType: null },
  firstName: "", lastName: "", email: "", phone: "",
  consentTerms: false, consentEmail: true, consentSms: false,
  desiredProjects: [], projectTimeline: "just_exploring", estimatedBudget: "",
  additionalNotes: "", betaOptIn: false,
};

const inp = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-300 bg-white";

// ─────────────────────────────────────────────────────────────────────────────
// Reusable bits
// ─────────────────────────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function PrimaryButton({ children, onClick, className = "", type = "button" }: {
  children: ReactNode; onClick?: () => void; className?: string; type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white shadow-sm hover:shadow-md transition-all ${className}`}
      style={{ backgroundColor: ACCENT }}
    >
      {children}
    </button>
  );
}

function MultiChip({ options, selected, onChange }: {
  options: string[]; selected: string[]; onChange: (v: string[]) => void;
}) {
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

// ─────────────────────────────────────────────────────────────────────────────
// 4-Step Modal
// ─────────────────────────────────────────────────────────────────────────────

function WaitlistModal({ onClose, initialAddress }: { onClose: () => void; initialAddress?: string }) {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [referralCode, setReferralCode] = useState<string | undefined>(undefined);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const ref = p.get("ref") || localStorage.getItem("trustypro_referral_code") || undefined;
    if (ref) {
      setReferralCode(ref);
      localStorage.setItem("trustypro_referral_code", ref);
    }
  }, []);

  const join = trpc.waitlist.joinHomeWaitlist.useMutation({
    onSuccess: (res: any) => {
      setSubmittedId(res?.referralCode || res?.id || null);
      setDone(true);
    },
    onError: (e: { message?: string }) => toast.error(e.message || "Something went wrong. Please try again."),
  });

  const setField = <K extends keyof FormData>(k: K) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(p => ({ ...p, [k]: e.target.value as FormData[K] }));

  const next = () => {
    if (step === 1 && !form.address.trim()) {
      toast.error("Please enter your home address to continue."); return;
    }
    if (step === 2) {
      if (!form.firstName.trim() || !form.email.trim()) {
        toast.error("First name and email are required."); return;
      }
      if (!form.consentTerms) {
        toast.error("You must agree to the Terms of Service to continue."); return;
      }
    }
    if (step === 3 && form.desiredProjects.length === 0) {
      toast.error("Pick at least one project area we should match you with."); return;
    }
    if (step < 4) setStep(s => s + 1);
    else submit();
  };

  const submit = () => {
    const projects = form.desiredProjects.length > 0 ? form.desiredProjects.join(", ") : "General home maintenance";
    const extras: string[] = [];
    if (form.projectTimeline) extras.push("Timeline: " + form.projectTimeline);
    if (form.estimatedBudget) extras.push("Budget: " + form.estimatedBudget);
    if (form.additionalNotes.trim()) extras.push("Notes: " + form.additionalNotes.trim());
    if (form.betaOptIn) extras.push("BETA: yes");
    if (form.property.yearBuilt) extras.push("YearBuilt: " + form.property.yearBuilt);
    if (form.property.squareFeet) extras.push("Sqft: " + form.property.squareFeet);
    if (form.property.bedrooms) extras.push("Beds: " + form.property.bedrooms);
    if (form.property.bathrooms) extras.push("Baths: " + form.property.bathrooms);
    const serviceNeeded = projects + (extras.length > 0 ? " | " + extras.join(" | ") : "");

    join.mutate({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim() || "—",
      email: form.email.trim().toLowerCase(),
      phone: form.phone || undefined,
      address: form.address.trim(),
      city: form.city.trim() || "DFW",
      state: (form.state || "TX").toUpperCase().slice(0, 2),
      zipCode: form.zipCode.trim() || "00000",
      serviceNeeded,
      referredBy: referralCode,
    });
  };

  const shareUrl = (() => {
    if (typeof window === "undefined") return "";
    const base = window.location.origin + "/waitlist/homeowner";
    return submittedId ? `${base}?ref=${submittedId}` : base;
  })();

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative"
      >
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
          <h2 className="text-xl font-bold text-gray-900">Join the Waitlist</h2>
          <p className="text-xs text-gray-500 mt-0.5">Takes about 90 seconds. We'll pre-fill what we can.</p>

          {!done && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-semibold text-indigo-600">Step {step} of 4</span>
                <span className="text-xs text-gray-400">
                  {step === 1 ? "Your home" : step === 2 ? "Contact" : step === 3 ? "Your plans" : "Almost done"}
                </span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${(step / 4) * 100}%`, backgroundColor: ACCENT }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-5">
          {done ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: ACCENT_LIGHT }}>
                <CheckCircle className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">You're on the list!</h3>
              <p className="text-gray-500 text-sm mb-4">
                Check your email for confirmation. We'll reach out as soon as TrustyPro opens in your area.
              </p>
              {submittedId && (
                <div className="bg-indigo-50 rounded-xl p-4 mb-4 text-left">
                  <p className="text-xs font-semibold text-indigo-700 mb-1">Share your referral link</p>
                  <p className="text-xs text-gray-600 mb-2">Friends who join through your link help you move up the list.</p>
                  <div className="flex items-center gap-2">
                    <input readOnly value={shareUrl} className={inp + " text-xs"} />
                    <button
                      onClick={() => { navigator.clipboard.writeText(shareUrl); toast.success("Copied!"); }}
                      className="px-3 py-2 rounded-lg text-xs font-semibold text-white whitespace-nowrap"
                      style={{ backgroundColor: ACCENT }}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              )}
              <button onClick={onClose} className="px-8 py-3 rounded-full text-sm font-semibold text-gray-700 border border-gray-200 hover:bg-gray-50">
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Step 1 — Address */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Home address</label>
                    <AddressAutofill
                      value={initialAddress || form.address}
                      onAddressSelect={(a: any) => {
                        setForm(p => ({
                          ...p,
                          address: a.street,
                          city: a.city,
                          state: a.state || "TX",
                          zipCode: a.zip,
                          property: {
                            squareFeet: a.propertyData?.squareFeet ?? null,
                            yearBuilt: a.propertyData?.yearBuilt ?? null,
                            bedrooms: a.propertyData?.bedrooms ?? null,
                            bathrooms: a.propertyData?.bathrooms ?? null,
                            propertyType: a.propertyData?.propertyType ?? null,
                          },
                        }));
                      }}
                    />
                    <p className="text-xs text-gray-400 mt-1.5">We'll pre-fill your home's records so you only enter what's missing.</p>
                  </div>

                  {form.address && (
                    <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        <p className="text-xs font-semibold text-indigo-700">Auto-detected property details</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Bedrooms</p>
                          <input
                            type="number"
                            value={form.property.bedrooms ?? ""}
                            onChange={e => setForm(p => ({ ...p, property: { ...p.property, bedrooms: e.target.value ? +e.target.value : null } }))}
                            className={inp}
                            placeholder="—"
                          />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Bathrooms</p>
                          <input
                            type="number"
                            value={form.property.bathrooms ?? ""}
                            onChange={e => setForm(p => ({ ...p, property: { ...p.property, bathrooms: e.target.value ? +e.target.value : null } }))}
                            className={inp}
                            placeholder="—"
                          />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Square feet</p>
                          <input
                            type="number"
                            value={form.property.squareFeet ?? ""}
                            onChange={e => setForm(p => ({ ...p, property: { ...p.property, squareFeet: e.target.value ? +e.target.value : null } }))}
                            className={inp}
                            placeholder="—"
                          />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Year built</p>
                          <input
                            type="number"
                            value={form.property.yearBuilt ?? ""}
                            onChange={e => setForm(p => ({ ...p, property: { ...p.property, yearBuilt: e.target.value ? +e.target.value : null } }))}
                            className={inp}
                            placeholder="—"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2 — Contact */}
              {step === 2 && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="First name *" value={form.firstName} onChange={setField("firstName")} className={inp} />
                    <input placeholder="Last name" value={form.lastName} onChange={setField("lastName")} className={inp} />
                  </div>
                  <input placeholder="Email address *" type="email" value={form.email} onChange={setField("email")} className={inp} />
                  <input placeholder="Phone (optional)" value={form.phone} onChange={setField("phone")} className={inp} />

                  <div className="bg-gray-50 rounded-xl p-4 mt-3 space-y-3 border border-gray-100">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.consentEmail}
                        onChange={e => setForm(p => ({ ...p, consentEmail: e.target.checked }))}
                        className="mt-1"
                      />
                      <span className="text-sm text-gray-700">Email me waitlist updates and launch news</span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.consentSms}
                        onChange={e => setForm(p => ({ ...p, consentSms: e.target.checked }))}
                        className="mt-1"
                      />
                      <span className="text-sm text-gray-700">Text me time-sensitive updates (optional)</span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.consentTerms}
                        onChange={e => setForm(p => ({ ...p, consentTerms: e.target.checked }))}
                        className="mt-1"
                      />
                      <span className="text-sm text-gray-700">
                        I agree to the <Link href="/terms" className="text-indigo-600 underline">Terms</Link> and <Link href="/privacy" className="text-indigo-600 underline">Privacy Policy</Link> *
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 3 — Plans */}
              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-2">What home services are you thinking about?</p>
                    <MultiChip
                      options={DESIRED_PROJECT_OPTIONS}
                      selected={form.desiredProjects}
                      onChange={v => setForm(p => ({ ...p, desiredProjects: v }))}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-2">Timeline</p>
                    <div className="grid grid-cols-2 gap-2">
                      {TIMELINE_OPTIONS.map(opt => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setForm(p => ({ ...p, projectTimeline: opt.value }))}
                          className={`px-3 py-2.5 rounded-lg text-xs font-medium border text-left transition-all ${
                            form.projectTimeline === opt.value
                              ? "bg-indigo-600 text-white border-indigo-600"
                              : "bg-white text-gray-700 border-gray-200 hover:border-indigo-300"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-2">Budget range (optional)</p>
                    <select value={form.estimatedBudget} onChange={setField("estimatedBudget")} className={inp + " text-gray-700"}>
                      <option value="">Select a budget</option>
                      {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {/* Step 4 — Almost done */}
              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Anything else we should know?</label>
                    <textarea
                      rows={4}
                      value={form.additionalNotes}
                      onChange={setField("additionalNotes")}
                      className={inp}
                      placeholder="Specific problems, preferences, or questions for us..."
                    />
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                    <input
                      type="checkbox"
                      checked={form.betaOptIn}
                      onChange={e => setForm(p => ({ ...p, betaOptIn: e.target.checked }))}
                      className="mt-1"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Join the Beta Program</p>
                      <p className="text-xs text-gray-600 mt-0.5">First 1,000 spots — test new features early and shape the product.</p>
                    </div>
                  </label>
                  {referralCode && (
                    <div className="text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                      Referral credit will go to: <span className="font-mono font-semibold text-gray-800">{referralCode}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={() => step > 1 ? setStep(s => s - 1) : onClose()}
                  className="text-sm text-gray-500 hover:text-gray-800 px-3 py-2"
                >
                  {step > 1 ? "Back" : "Cancel"}
                </button>
                <button
                  onClick={next}
                  disabled={join.isPending}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white shadow-sm hover:shadow-md disabled:opacity-60 transition-all"
                  style={{ backgroundColor: ACCENT }}
                >
                  {join.isPending ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                  ) : step === 4 ? (
                    <>Join the Waitlist <ArrowRight className="w-4 h-4" /></>
                  ) : (
                    <>Continue <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function TrustyProWaitlistV2() {
  const [open, setOpen] = useState(false);
  const [heroAddress, setHeroAddress] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const ref = p.get("ref");
    if (ref) localStorage.setItem("trustypro_referral_code", ref);
  }, []);

  const launchModal = (addr?: string) => {
    if (addr) setHeroAddress(addr);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-950">
      <Helmet>
        <title>Join the TrustyPro Waitlist — Trusted Home Pros, Verified</title>
        <meta name="description" content="TrustyPro Certified pros, verified, insured, ready to work. Join the waitlist for DFW homeowners — be matched with the right pro the moment we launch in your area." />
        <meta property="og:title" content="Join the TrustyPro Waitlist" />
        <meta property="og:description" content="The home services platform built around trust." />
      </Helmet>

      {/* NAV */}
      <nav className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <TrustyProLogo className="h-8" />
          </Link>
          <PrimaryButton onClick={() => setOpen(true)} className="!py-2.5 !px-5">
            Join the Waitlist
          </PrimaryButton>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{
          background: "radial-gradient(1200px 600px at 80% -10%, #EEF2FF 0%, transparent 60%), radial-gradient(900px 500px at 10% 110%, #F5F3FF 0%, transparent 60%)",
        }} />
        <div className="max-w-6xl mx-auto px-5 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 mb-6">
              <Sparkles className="w-3.5 h-3.5" /> Coming to DFW · 2026
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-950 max-w-4xl leading-[1.05]">
              The home services platform built around <span style={{ color: ACCENT }}>trust</span>.
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
              TrustyPro Certified pros — verified, insured, ready to work. Join the waitlist and we'll match you with the right pro the moment we launch in your area.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 max-w-xl">
              <input
                type="text"
                value={heroAddress}
                onChange={e => setHeroAddress(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") launchModal(heroAddress); }}
                placeholder="Enter your home address"
                className="flex-1 border border-gray-200 rounded-full px-5 py-3.5 text-sm bg-white outline-none focus:ring-2 focus:ring-indigo-300 shadow-sm"
              />
              <PrimaryButton onClick={() => launchModal(heroAddress)}>
                Join the Waitlist <ArrowRight className="w-4 h-4" />
              </PrimaryButton>
            </div>
            <p className="mt-3 text-xs text-gray-500">We'll pre-fill your home's records so you only enter what's missing.</p>
          </FadeIn>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 lg:py-28 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-black text-gray-950 mb-3">How it works</h2>
            <p className="text-gray-600 text-lg max-w-xl mb-12">Three steps from "thinking about a project" to "scheduled with a TrustyPro Certified pro."</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { n: "01", title: "Tell us about your home", body: "We start with your address and pre-fill what we can — square footage, year built, systems. You confirm and add what we missed.", icon: Home },
              { n: "02", title: "We match you with certified pros", body: "Our AI matches your project, location, and home profile to the right TrustyPro Certified contractors in your area.", icon: Search },
              { n: "03", title: "Get quotes, hire with confidence", body: "Compare quotes from background-checked, insured pros. Pick the one that fits — and we handle the rest.", icon: CheckCircle },
            ].map((s, i) => (
              <FadeIn key={s.n} delay={i * 0.08}>
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-mono font-semibold text-indigo-600">{s.n}</span>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: ACCENT_LIGHT }}>
                      <s.icon className="w-5 h-5 text-indigo-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-950 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TRADES */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-black text-gray-950 mb-3">Every trade. One trusted network.</h2>
            <p className="text-gray-600 text-lg max-w-xl mb-12">From a leaky faucet to a full remodel — TrustyPro covers every service your home needs.</p>
          </FadeIn>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {TRADES.map((t, i) => (
              <FadeIn key={t.label} delay={i * 0.03}>
                <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-center text-center hover:border-indigo-300 hover:shadow-sm transition-all">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: ACCENT_LIGHT }}>
                    <t.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{t.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* WHY TRUSTYPRO */}
      <section className="py-20 lg:py-28 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-black text-gray-950 mb-3">Why TrustyPro</h2>
            <p className="text-gray-600 text-lg max-w-xl mb-12">Four reasons this isn't another lead-gen site.</p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: Shield, title: "Verified & insured", body: "Every pro is background-checked, license-verified, and carries active insurance. No exceptions." },
              { icon: Sparkles, title: "Real-time matching", body: "Our AI matches your home's specifics to the right pros — not a list of everyone in the ZIP code." },
              { icon: DollarSign, title: "Transparent pricing", body: "See quotes upfront. No surprise fees. No bidding wars. Just real numbers from real pros." },
              { icon: Award, title: "Free for homeowners", body: "We earn from pros when they close a job — never from you. Forever." },
            ].map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.06}>
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-full flex gap-4">
                  <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: ACCENT_LIGHT }}>
                    <v.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-950 mb-1.5">{v.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{v.body}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <FadeIn>
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-3xl p-10 lg:p-14 text-white">
              <h2 className="text-3xl md:text-5xl font-black mb-3">What you get from joining now</h2>
              <p className="text-indigo-100 text-lg max-w-xl mb-10">Founding members get the best of TrustyPro — for free, forever.</p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: Clock, title: "Early access in your area", body: "Be among the first homeowners matched when pros activate in your ZIP." },
                  { icon: Star, title: "Beta program eligibility", body: "First 1,000 homeowners get early access to features before they ship." },
                  { icon: Award, title: "Free Home Health Report", body: "Your home's complete health profile when we launch — yours to keep." },
                  { icon: Shield, title: "No commitment, no spam", body: "We only contact you about your area. Unsubscribe anytime." },
                ].map(perk => (
                  <div key={perk.title} className="flex gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-5">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex-shrink-0 flex items-center justify-center">
                      <perk.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold mb-1">{perk.title}</h3>
                      <p className="text-sm text-indigo-100 leading-relaxed">{perk.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQS */}
      <section className="py-20 lg:py-28 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-black text-gray-950 mb-3">Waitlist questions</h2>
            <p className="text-gray-600 text-lg mb-12">Everything you need to know before joining.</p>
          </FadeIn>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <FadeIn key={f.q} delay={i * 0.04}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left bg-white rounded-2xl border border-gray-200 shadow-sm p-5 hover:border-indigo-300 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-base md:text-lg font-bold text-gray-950">{f.q}</h3>
                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 mt-1 ${openFaq === i ? "rotate-90" : ""}`} />
                  </div>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-gray-600 leading-relaxed pt-3">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <div className="bg-gray-950 rounded-3xl p-10 lg:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 -z-0 opacity-30" style={{
              background: "radial-gradient(600px 300px at 50% 0%, #4F46E5 0%, transparent 60%)",
            }} />
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-black mb-3 relative z-10">Ready when you are.</h2>
              <p className="text-gray-300 text-lg max-w-xl mx-auto mb-9 relative z-10">
                Join the TrustyPro waitlist — and be ready the moment we launch in your area.
              </p>
              <div className="relative z-10 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                <input
                  type="text"
                  value={heroAddress}
                  onChange={e => setHeroAddress(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") launchModal(heroAddress); }}
                  placeholder="Enter your home address"
                  className="flex-1 border border-white/15 bg-white/10 backdrop-blur-sm rounded-full px-5 py-3.5 text-sm text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <PrimaryButton onClick={() => launchModal(heroAddress)} className="!bg-white !text-gray-950">
                  Join the Waitlist <ArrowRight className="w-4 h-4" />
                </PrimaryButton>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-5 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <TrustyProLogo className="h-7" />
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-gray-900">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-900">Terms</Link>
            <span className="text-gray-400">© {new Date().getFullYear()} TrustyPro</span>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {open && <WaitlistModal onClose={() => setOpen(false)} initialAddress={heroAddress} />}
      </AnimatePresence>
    </div>
  );
}
