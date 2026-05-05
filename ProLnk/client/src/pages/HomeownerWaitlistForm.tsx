/**
 * TrustyPro Homeowner Waitlist Intake Form
 * Route: /home-waitlist
 * PUBLIC — no login required.
 * Collects full home profile and submits to homeWaitlist table via waitlist.submitHomeWaitlist.
 */
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TrustyProLogo } from "@/components/TrustyProLogo";
import {
  Home, MapPin, Wrench, Heart, CheckCircle,
  ChevronLeft, ChevronRight, User, Phone, Mail,
  Bed, Bath, Car, Waves, TreePine, Zap, Flame,
  Droplets, Shield, Building2, Hammer, PawPrint,
  Sun, Layers, Star,
} from "lucide-react";

// ─── Constants ───────────────────────────────────────────────────────────────

const STEPS = [
  { title: "Your Info",        desc: "Name, email, and contact details",    icon: User },
  { title: "Your Home",        desc: "Address and property basics",          icon: Home },
  { title: "Home Features",    desc: "What does your home have?",            icon: Building2 },
  { title: "Home Systems",     desc: "Age and condition of major systems",   icon: Wrench },
  { title: "Projects & Goals", desc: "What do you want to get done?",        icon: Heart },
  { title: "Finish Up",        desc: "Review and join the waitlist",         icon: CheckCircle },
];

const HOME_TYPES = [
  { value: "single_family", label: "Single Family",  icon: "🏠" },
  { value: "townhouse",     label: "Townhouse",      icon: "🏘️" },
  { value: "condo",         label: "Condo / Apt",    icon: "🏢" },
  { value: "multi_family",  label: "Multi-Family",   icon: "🏗️" },
  { value: "mobile",        label: "Other / Mobile", icon: "🏡" },
];

const DESIRED_PROJECTS = [
  "HVAC Service / Replacement", "Roof Inspection / Repair", "Plumbing Repair",
  "Electrical Work", "Landscaping / Lawn Care", "Interior Painting",
  "Exterior Painting", "Flooring", "Kitchen Remodel", "Bathroom Remodel",
  "Window / Door Replacement", "Fence / Gate", "Pool Service",
  "Pest Control", "Pressure Washing", "Gutter Cleaning",
  "Foundation Inspection", "Insulation", "Solar Panels", "Smart Home Setup",
  "General Handyman", "Deep Cleaning", "Other",
];

const PEST_FREQUENCIES = [
  { value: "monthly",   label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "annually",  label: "Annually" },
  { value: "as_needed", label: "As needed" },
  { value: "never",     label: "No plan" },
];

const HEAR_ABOUT_OPTIONS = [
  "Friend / Neighbor", "Google Search", "Facebook / Instagram",
  "Contractor Referral", "Nextdoor", "Real Estate Agent", "Other",
];

// ─── Toggle Button ────────────────────────────────────────────────────────────

function Toggle({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
        active
          ? "bg-indigo-600 border-indigo-500 text-white"
          : "bg-white/5 border-white/10 text-white/60 hover:border-white/30 hover:text-white/90"
      }`}
    >
      {children}
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HomeownerWaitlistForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);

  // Capture referral code from URL params (?ref=CODE)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      setReferralCode(ref);
      setHearAboutUs(`Referred by a friend (${ref})`);
    }
  }, []);

  // Step 1 — Contact Info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hearAboutUs, setHearAboutUs] = useState("");

  // Step 2 — Home Address
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("TX");
  const [zipCode, setZipCode] = useState("");
  const [homeType, setHomeType] = useState<"single_family" | "townhouse" | "condo" | "multi_family" | "mobile">("single_family");
  const [yearBuilt, setYearBuilt] = useState<number | undefined>();
  const [squareFootage, setSquareFootage] = useState<number | undefined>();
  const [bedrooms, setBedrooms] = useState<number | undefined>();
  const [bathrooms, setBathrooms] = useState("");
  const [ownershipStatus, setOwnershipStatus] = useState<"own" | "rent">("own");
  const [yearsOwned, setYearsOwned] = useState<number | undefined>();
  // Ownership type (new)
  const [ownershipType, setOwnershipType] = useState<"primary" | "rental" | "vacation" | "company_owned" | "other">("primary");
  const [companyName, setCompanyName] = useState("");
  const [companyEin, setCompanyEin] = useState("");
  const [propertyManagerName, setPropertyManagerName] = useState("");
  const [propertyManagerPhone, setPropertyManagerPhone] = useState("");
  const [propertyManagerEmail, setPropertyManagerEmail] = useState("");

  // Step 3 — Features
  const [garageSpaces, setGarageSpaces] = useState(0);
  const [hasPool, setHasPool] = useState(false);
  const [hasSpa, setHasSpa] = useState(false);
  const [hasDeck, setHasDeck] = useState(false);
  const [hasPatio, setHasPatio] = useState(false);
  const [hasBasement, setHasBasement] = useState(false);
  const [hasAttic, setHasAttic] = useState(false);
  const [hasFence, setHasFence] = useState(false);
  const [hasSolarPanels, setHasSolarPanels] = useState(false);
  const [hasGenerator, setHasGenerator] = useState(false);
  const [hasSmartHome, setHasSmartHome] = useState(false);
  const [hasIrrigationSystem, setHasIrrigationSystem] = useState(false);
  const [hasSecuritySystem, setHasSecuritySystem] = useState(false);
  const [hasEvCharger, setHasEvCharger] = useState(false);
  const [hasOutdoorKitchen, setHasOutdoorKitchen] = useState(false);
  // Pets
  const [hasPets, setHasPets] = useState(false);
  const [dogCount, setDogCount] = useState(0);
  const [catCount, setCatCount] = useState(0);
  const [petServiceNeeds, setPetServiceNeeds] = useState<string[]>([]);

  // Step 3 — Systems (smart replaced pattern)
  const [systemReplaced, setSystemReplaced] = useState<Record<string, boolean | null>>({
    hvac: null, roof: null, waterHeater: null, electrical: null, plumbing: null,
  });
  const [systemYear, setSystemYear] = useState<Record<string, string>>({
    hvac: "", roof: "", waterHeater: "", electrical: "", plumbing: "",
  });
  const [pestFrequency, setPestFrequency] = useState("");
  const [overallCondition, setOverallCondition] = useState<"excellent" | "good" | "fair" | "needs_work">("good");

  // Step 5 — Projects
  const [desiredProjects, setDesiredProjects] = useState<string[]>([]);
  const [projectTimeline, setProjectTimeline] = useState<"asap" | "3_months" | "6_months" | "1_year" | "just_exploring">("just_exploring");
  const [estimatedBudget, setEstimatedBudget] = useState("");
  const [primaryPainPoint, setPrimaryPainPoint] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Step 6 — Consent
  const [consentTerms, setConsentTerms] = useState(false);
  const [consentEmail, setConsentEmail] = useState(true);
  const [consentSms, setConsentSms] = useState(false);

  const submitMutation = trpc.waitlist.joinHomeWaitlist.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    onError: (e: any) => {
      if (e.message?.includes("already on the waitlist")) {
        toast.error("That email is already on the waitlist!");
      } else {
        toast.error(e.message ?? "Something went wrong. Please try again.");
      }
    },
  });

  const toggleProject = (p: string) => {
    setDesiredProjects(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  const togglePetService = (s: string) => {
    setPetServiceNeeds(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const canAdvance = () => {
    if (step === 0) return firstName.trim() && lastName.trim() && email.trim() && email.includes("@");
    if (step === 1) return address.trim() && city.trim() && zipCode.trim().length >= 5;
    if (step === 4) return desiredProjects.length > 0;
    if (step === 5) return consentTerms;
    return true;
  };

  const handleSubmit = () => {
    if (!consentTerms) { toast.error("Please accept the terms to continue."); return; }
    if (desiredProjects.length === 0) { toast.error("Please select at least one project."); return; }
    submitMutation.mutate({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      zipCode: zipCode.trim(),
      serviceNeeded: desiredProjects[0] || "General home maintenance",
    });
  };

  // ─── Success Screen ─────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "linear-gradient(135deg, #0F0C29 0%, #1B1464 50%, #24243e 100%)" }}>
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-black text-white mb-3">You're on the list!</h1>
          <p className="text-white/60 text-lg mb-2">
            Welcome, {firstName}. We'll reach out to <span className="text-indigo-300 font-medium">{email}</span> when TrustyPro launches in your area.
          </p>
          <p className="text-white/40 text-sm mb-8">
            Your home profile has been saved. We'll use it to pre-match you with vetted pros before you even ask.
          </p>
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { icon: <Shield className="w-5 h-5 text-indigo-400" />, label: "Vetted Pros" },
              { icon: <Zap className="w-5 h-5 text-indigo-400" />, label: "AI Matching" },
              { icon: <Star className="w-5 h-5 text-indigo-400" />, label: "Real Reviews" },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="flex justify-center mb-1">{item.icon}</div>
                <p className="text-xs text-white/60">{item.label}</p>
              </div>
            ))}
          </div>
          {/* Viral growth: share with neighbors */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6 text-left">
            <p className="text-white font-semibold text-sm mb-2">Know a neighbor who could use this?</p>
            <p className="text-white/50 text-xs mb-3">Share TrustyPro with your neighbors. When they sign up, you both get priority access and a $25 service credit.</p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const shareUrl = `${window.location.origin}/join`;
                  navigator.clipboard.writeText(shareUrl);
                  toast.success("Link copied! Share it with your neighbors.");
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                Copy Link
              </button>
              <button
                onClick={() => {
                  const shareUrl = `${window.location.origin}/join`;
                  const text = `I just signed up for TrustyPro \u2014 AI-powered home maintenance that finds issues before they become expensive. Free for homeowners. Check it out:`;
                  window.open(`sms:?body=${encodeURIComponent(text + ' ' + shareUrl)}`, '_blank');
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-green-600 hover:bg-green-500 text-white text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                Text a Neighbor
              </button>
            </div>
          </div>
          <a href="https://prolnk.io" className="text-indigo-400 hover:text-indigo-300 text-sm underline">
            \u2190 Back to TrustyPro
          </a>
        </div>
      </div>
    );
  }

  // ─── Progress Bar ───────────────────────────────────────────────────────────
  const StepIcon = STEPS[step].icon;

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #0F0C29 0%, #1B1464 50%, #24243e 100%)" }}>
      {/* Header */}
      <div className="px-4 py-5 flex items-center justify-between max-w-2xl mx-auto">
        <TrustyProLogo height={32} />
        <span className="text-xs text-white/40">Step {step + 1} of {STEPS.length}</span>
      </div>

      {/* Progress */}
      <div className="max-w-2xl mx-auto px-4 mb-6">
        <div className="flex gap-1">
          {STEPS.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= step ? "bg-indigo-500" : "bg-white/10"}`} />
          ))}
        </div>
      </div>

      {/* Card */}
      <div className="max-w-2xl mx-auto px-4 pb-20">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
          {/* Step Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center">
              <StepIcon className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{STEPS[step].title}</h2>
              <p className="text-sm text-white/50">{STEPS[step].desc}</p>
            </div>
          </div>

          {/* ── Step 0: Contact Info ── */}
          {step === 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-white/70 text-sm mb-1 block">First Name *</Label>
                  <Input
                    value={firstName} onChange={e => setFirstName(e.target.value)}
                    placeholder="Andrew"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/30"
                  />
                </div>
                <div>
                  <Label className="text-white/70 text-sm mb-1 block">Last Name *</Label>
                  <Input
                    value={lastName} onChange={e => setLastName(e.target.value)}
                    placeholder="Frakes"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/30"
                  />
                </div>
              </div>
              <div>
                <Label className="text-white/70 text-sm mb-1 block"><Mail className="w-3.5 h-3.5 inline mr-1" />Email Address *</Label>
                <Input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/30"
                />
              </div>
              <div>
                <Label className="text-white/70 text-sm mb-1 block"><Phone className="w-3.5 h-3.5 inline mr-1" />Phone Number</Label>
                <Input
                  type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                  placeholder="(214) 555-0100"
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/30"
                />
              </div>
              <div>
                <Label className="text-white/70 text-sm mb-1 block">How did you hear about us?</Label>
                <div className="flex flex-wrap gap-2">
                  {HEAR_ABOUT_OPTIONS.map(opt => (
                    <Toggle key={opt} active={hearAboutUs === opt} onClick={() => setHearAboutUs(opt)}>{opt}</Toggle>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Step 1: Home Address ── */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label className="text-white/70 text-sm mb-1 block"><MapPin className="w-3.5 h-3.5 inline mr-1" />Street Address *</Label>
                <Input
                  value={address} onChange={e => setAddress(e.target.value)}
                  placeholder="123 Main Street"
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/30"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <Label className="text-white/70 text-sm mb-1 block">City *</Label>
                  <Input value={city} onChange={e => setCity(e.target.value)} placeholder="Frisco"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/30" />
                </div>
                <div>
                  <Label className="text-white/70 text-sm mb-1 block">State</Label>
                  <Input value={state} onChange={e => setState(e.target.value)} placeholder="TX"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/30" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-white/70 text-sm mb-1 block">ZIP Code *</Label>
                  <Input value={zipCode} onChange={e => setZipCode(e.target.value)} placeholder="75034"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/30" />
                </div>
                <div>
                  <Label className="text-white/70 text-sm mb-1 block">Year Built</Label>
                  <Input type="number" value={yearBuilt ?? ""} onChange={e => setYearBuilt(e.target.value ? parseInt(e.target.value) : undefined)}
                    placeholder="2005" className="bg-white/5 border-white/20 text-white placeholder:text-white/30" />
                </div>
              </div>
              <div>
                <Label className="text-white/70 text-sm mb-1 block">Home Type</Label>
                <div className="flex flex-wrap gap-2">
                  {HOME_TYPES.map(t => (
                    <Toggle key={t.value} active={homeType === t.value} onClick={() => setHomeType(t.value as any)}>
                      {t.icon} {t.label}
                    </Toggle>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label className="text-white/70 text-sm mb-1 block"><Ruler className="w-3.5 h-3.5 inline mr-1" />Sq Ft</Label>
                  <Input type="number" value={squareFootage ?? ""} onChange={e => setSquareFootage(e.target.value ? parseInt(e.target.value) : undefined)}
                    placeholder="2400" className="bg-white/5 border-white/20 text-white placeholder:text-white/30" />
                </div>
                <div>
                  <Label className="text-white/70 text-sm mb-1 block"><Bed className="w-3.5 h-3.5 inline mr-1" />Beds</Label>
                  <Input type="number" value={bedrooms ?? ""} onChange={e => setBedrooms(e.target.value ? parseInt(e.target.value) : undefined)}
                    placeholder="4" className="bg-white/5 border-white/20 text-white placeholder:text-white/30" />
                </div>
                <div>
                  <Label className="text-white/70 text-sm mb-1 block"><Bath className="w-3.5 h-3.5 inline mr-1" />Baths</Label>
                  <Input value={bathrooms} onChange={e => setBathrooms(e.target.value)}
                    placeholder="2.5" className="bg-white/5 border-white/20 text-white placeholder:text-white/30" />
                </div>
              </div>
              {/* Ownership type */}
              <div>
                <Label className="text-white/70 text-sm mb-2 block">Property Use Type *</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: "primary",      label: "🏠 Primary Residence" },
                    { value: "rental",       label: "🔑 Rental Property" },
                    { value: "vacation",     label: "🌴 Vacation Home" },
                    { value: "company_owned",label: "🏢 Company-Owned" },
                    { value: "other",        label: "📋 Other" },
                  ].map(t => (
                    <Toggle key={t.value} active={ownershipType === t.value} onClick={() => setOwnershipType(t.value as any)}>
                      {t.label}
                    </Toggle>
                  ))}
                </div>
              </div>

              {/* Conditional: rental or company-owned fields */}
              {(ownershipType === "rental" || ownershipType === "company_owned") && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                  <p className="text-white/50 text-xs font-medium uppercase tracking-wide">
                    {ownershipType === "company_owned" ? "Company Information" : "Property Management Info"}
                  </p>
                  {ownershipType === "company_owned" && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-white/70 text-sm mb-1 block">Company Name</Label>
                        <Input value={companyName} onChange={e => setCompanyName(e.target.value)}
                          placeholder="Acme Properties LLC"
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/30" />
                      </div>
                      <div>
                        <Label className="text-white/70 text-sm mb-1 block">EIN (optional)</Label>
                        <Input value={companyEin} onChange={e => setCompanyEin(e.target.value)}
                          placeholder="12-3456789"
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/30" />
                      </div>
                    </div>
                  )}
                  <div>
                    <Label className="text-white/70 text-sm mb-1 block">Property Manager Name</Label>
                    <Input value={propertyManagerName} onChange={e => setPropertyManagerName(e.target.value)}
                      placeholder="Jane Smith"
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/30" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-white/70 text-sm mb-1 block">Manager Phone</Label>
                      <Input value={propertyManagerPhone} onChange={e => setPropertyManagerPhone(e.target.value)}
                        placeholder="(214) 555-0100"
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/30" />
                    </div>
                    <div>
                      <Label className="text-white/70 text-sm mb-1 block">Manager Email</Label>
                      <Input type="email" value={propertyManagerEmail} onChange={e => setPropertyManagerEmail(e.target.value)}
                        placeholder="manager@company.com"
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/30" />
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-white/70 text-sm mb-1 block">Own or Rent</Label>
                  <div className="flex gap-2">
                    <Toggle active={ownershipStatus === "own"} onClick={() => setOwnershipStatus("own")}>Own</Toggle>
                    <Toggle active={ownershipStatus === "rent"} onClick={() => setOwnershipStatus("rent")}>Rent</Toggle>
                  </div>
                </div>
                <div>
                  <Label className="text-white/70 text-sm mb-1 block">Years at this address</Label>
                  <Input type="number" value={yearsOwned ?? ""} onChange={e => setYearsOwned(e.target.value ? parseInt(e.target.value) : undefined)}
                    placeholder="5" className="bg-white/5 border-white/20 text-white placeholder:text-white/30" />
                </div>
              </div>
            </div>
          )}

          {/* ── Step 2: Features ── */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <Label className="text-white/70 text-sm mb-2 block"><Car className="w-3.5 h-3.5 inline mr-1" />Garage Spaces</Label>
                <div className="flex gap-2">
                  {[0,1,2,3,4].map(n => (
                    <Toggle key={n} active={garageSpaces === n} onClick={() => setGarageSpaces(n)}>{n === 0 ? "None" : n}</Toggle>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-white/70 text-sm mb-2 block">Outdoor Features</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Pool", state: hasPool, set: setHasPool, icon: <Waves className="w-3.5 h-3.5" /> },
                    { label: "Spa / Hot Tub", state: hasSpa, set: setHasSpa, icon: <Waves className="w-3.5 h-3.5" /> },
                    { label: "Deck", state: hasDeck, set: setHasDeck, icon: <Sun className="w-3.5 h-3.5" /> },
                    { label: "Patio", state: hasPatio, set: setHasPatio, icon: <Sun className="w-3.5 h-3.5" /> },
                    { label: "Outdoor Kitchen", state: hasOutdoorKitchen, set: setHasOutdoorKitchen, icon: <Flame className="w-3.5 h-3.5" /> },
                    { label: "Fence", state: hasFence, set: setHasFence, icon: <TreePine className="w-3.5 h-3.5" /> },
                    { label: "Irrigation System", state: hasIrrigationSystem, set: setHasIrrigationSystem, icon: <Droplets className="w-3.5 h-3.5" /> },
                  ].map(f => (
                    <Toggle key={f.label} active={f.state} onClick={() => f.set(!f.state)}>
                      {f.icon} {f.label}
                    </Toggle>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-white/70 text-sm mb-2 block">Home Systems & Tech</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Basement", state: hasBasement, set: setHasBasement },
                    { label: "Attic", state: hasAttic, set: setHasAttic },
                    { label: "Solar Panels", state: hasSolarPanels, set: setHasSolarPanels },
                    { label: "Generator", state: hasGenerator, set: setHasGenerator },
                    { label: "Smart Home", state: hasSmartHome, set: setHasSmartHome },
                    { label: "Security System", state: hasSecuritySystem, set: setHasSecuritySystem },
                    { label: "EV Charger", state: hasEvCharger, set: setHasEvCharger },
                  ].map(f => (
                    <Toggle key={f.label} active={f.state} onClick={() => f.set(!f.state)}>{f.label}</Toggle>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-white/70 text-sm mb-2 block"><PawPrint className="w-3.5 h-3.5 inline mr-1" />Pets</Label>
                <div className="flex gap-2 mb-3">
                  <Toggle active={hasPets} onClick={() => setHasPets(!hasPets)}>Yes, I have pets</Toggle>
                  <Toggle active={!hasPets} onClick={() => setHasPets(false)}>No pets</Toggle>
                </div>
                {hasPets && (
                  <div className="space-y-3 pl-1">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-white/60 text-xs mb-1 block">🐕 Dogs</Label>
                        <div className="flex gap-1">
                          {[0,1,2,3,4].map(n => (
                            <Toggle key={n} active={dogCount === n} onClick={() => setDogCount(n)}>{n}</Toggle>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label className="text-white/60 text-xs mb-1 block">🐈 Cats</Label>
                        <div className="flex gap-1">
                          {[0,1,2,3,4].map(n => (
                            <Toggle key={n} active={catCount === n} onClick={() => setCatCount(n)}>{n}</Toggle>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label className="text-white/60 text-xs mb-1 block">Pet-related services you'd want</Label>
                      <div className="flex flex-wrap gap-2">
                        {["Pet-Safe Lawn Products","Pet Waste Removal","Pet Door Installation","Fence Repair / Pet Containment","Pet-Friendly Flooring","Odor / Stain Treatment","Yard Deodorizing","Pet-Safe Pest Control"].map(s => (
                          <Toggle key={s} active={petServiceNeeds.includes(s)} onClick={() => togglePetService(s)}>{s}</Toggle>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Step 3: Home Systems ── */}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-white/50 text-sm">
                {yearBuilt
                  ? `Your home was built in ${yearBuilt} — we’ll use that as the baseline. Just tell us what’s been replaced since then.`
                  : "Just tell us what's been replaced — we'll handle the rest."}
              </p>

              {[
                { key: "hvac",        label: "HVAC / AC System",  icon: <Zap className="w-4 h-4 text-blue-400" />,     hint: "Full system, air handler, or condenser" },
                { key: "roof",        label: "Roof",              icon: <Home className="w-4 h-4 text-orange-400" />,   hint: "Full re-roof, not just repairs" },
                { key: "waterHeater", label: "Water Heater",      icon: <Droplets className="w-4 h-4 text-cyan-400" />, hint: "Tank or tankless" },
                { key: "electrical",  label: "Electrical Panel",  icon: <Zap className="w-4 h-4 text-yellow-400" />,   hint: "Main breaker panel upgrade" },
                { key: "plumbing",    label: "Plumbing",          icon: <Wrench className="w-4 h-4 text-green-400" />,  hint: "Major re-pipe or main line" },
              ].map(sys => (
                <div key={sys.key} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium flex items-center gap-1.5">{sys.icon}{sys.label}</p>
                      <p className="text-white/40 text-xs mt-0.5">{sys.hint}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Toggle active={systemReplaced[sys.key] === true}  onClick={() => setSystemReplaced(p => ({ ...p, [sys.key]: true }))}>Replaced</Toggle>
                      <Toggle active={systemReplaced[sys.key] === false} onClick={() => setSystemReplaced(p => ({ ...p, [sys.key]: false }))}>Original</Toggle>
                      <Toggle active={systemReplaced[sys.key] === null && false} onClick={() => setSystemReplaced(p => ({ ...p, [sys.key]: null }))}>Not sure</Toggle>
                    </div>
                  </div>
                  {systemReplaced[sys.key] === true && (
                    <div className="mt-3 flex items-center gap-3">
                      <Label className="text-white/50 text-xs whitespace-nowrap">Year replaced (optional)</Label>
                      <Input
                        type="number" min={1980} max={new Date().getFullYear()}
                        placeholder={`e.g. ${new Date().getFullYear() - 4}`}
                        value={systemYear[sys.key]}
                        onChange={e => setSystemYear(p => ({ ...p, [sys.key]: e.target.value }))}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/30 w-32 h-8 text-sm"
                      />
                    </div>
                  )}
                </div>
              ))}

              {/* Pest Control — frequency, not age */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-white text-sm font-medium mb-0.5">Pest Control</p>
                <p className="text-white/40 text-xs mb-3">How often do you currently have service?</p>
                <div className="flex flex-wrap gap-2">
                  {PEST_FREQUENCIES.map(f => (
                    <Toggle key={f.value} active={pestFrequency === f.value} onClick={() => setPestFrequency(f.value)}>{f.label}</Toggle>
                  ))}
                </div>
              </div>

              {/* Overall condition */}
              <div>
                <Label className="text-white/70 text-sm mb-2 block">Overall home condition</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: "excellent", label: "Excellent — move-in ready" },
                    { value: "good",      label: "Good — minor things needed" },
                    { value: "fair",      label: "Fair — several things to address" },
                    { value: "needs_work",label: "Needs work — significant repairs" },
                  ].map(c => (
                    <Toggle key={c.value} active={overallCondition === c.value} onClick={() => setOverallCondition(c.value as any)}>
                      {c.label}
                    </Toggle>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* ── Step 4: Projects ── */}
          {step === 4 && (
            <div className="space-y-5">
              <div>
                <Label className="text-white/70 text-sm mb-2 block">What projects are on your radar? * (select all that apply)</Label>
                <div className="flex flex-wrap gap-2">
                  {DESIRED_PROJECTS.map(p => (
                    <Toggle key={p} active={desiredProjects.includes(p)} onClick={() => toggleProject(p)}>{p}</Toggle>
                  ))}
                </div>
                {desiredProjects.length === 0 && (
                  <p className="text-orange-400 text-xs mt-2">Please select at least one project to continue.</p>
                )}
              </div>
              <div>
                <Label className="text-white/70 text-sm mb-2 block">Timeline</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: "asap",           label: "ASAP" },
                    { value: "3_months",       label: "Within 3 months" },
                    { value: "6_months",       label: "Within 6 months" },
                    { value: "1_year",         label: "Within a year" },
                    { value: "just_exploring", label: "Just exploring" },
                  ].map(t => (
                    <Toggle key={t.value} active={projectTimeline === t.value} onClick={() => setProjectTimeline(t.value as any)}>
                      {t.label}
                    </Toggle>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-white/70 text-sm mb-1 block">Estimated annual budget for home maintenance</Label>
                <div className="flex flex-wrap gap-2">
                  {["Under $1,000","$1,000–$3,000","$3,000–$7,500","$7,500–$15,000","$15,000+","Not sure"].map(b => (
                    <Toggle key={b} active={estimatedBudget === b} onClick={() => setEstimatedBudget(b)}>{b}</Toggle>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-white/70 text-sm mb-1 block">What's your biggest home headache right now?</Label>
                <Textarea
                  value={primaryPainPoint} onChange={e => setPrimaryPainPoint(e.target.value)}
                  placeholder="e.g. Can't find a reliable HVAC tech, roof has been leaking for months..."
                  rows={3}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/30 resize-none"
                />
              </div>
              <div>
                <Label className="text-white/70 text-sm mb-1 block">Anything else you want us to know?</Label>
                <Textarea
                  value={additionalNotes} onChange={e => setAdditionalNotes(e.target.value)}
                  placeholder="Optional notes..."
                  rows={2}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/30 resize-none"
                />
              </div>
            </div>
          )}

          {/* ── Step 5: Consent & Submit ── */}
          {step === 5 && (
            <div className="space-y-5">
              {/* Summary */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2 text-sm">
                <p className="text-white font-semibold mb-2">Review your info</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-white/60">
                  <span>Name:</span><span className="text-white">{firstName} {lastName}</span>
                  <span>Email:</span><span className="text-white">{email}</span>
                  {phone && <><span>Phone:</span><span className="text-white">{phone}</span></>}
                  <span>Address:</span><span className="text-white">{address}, {city}, {state} {zipCode}</span>
                  <span>Home Type:</span><span className="text-white">{HOME_TYPES.find(t => t.value === homeType)?.label}</span>
                  <span>Projects:</span><span className="text-white">{desiredProjects.length} selected</span>
                </div>
              </div>

              {/* Consent */}
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={consentTerms} onChange={e => setConsentTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-indigo-500" />
                  <span className="text-sm text-white/70">
                    I agree to the <a href="/terms" className="text-indigo-400 underline" target="_blank">Terms of Service</a> and <a href="/privacy" className="text-indigo-400 underline" target="_blank">Privacy Policy</a>. I consent to TrustyPro storing my home profile data. *
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={consentEmail} onChange={e => setConsentEmail(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-indigo-500" />
                  <span className="text-sm text-white/70">Send me updates about TrustyPro and matched pros via email.</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={consentSms} onChange={e => setConsentSms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-indigo-500" />
                  <span className="text-sm text-white/70">Send me SMS updates when a pro match is found for my projects.</span>
                </label>
              </div>

              <div className="bg-indigo-900/30 border border-indigo-500/20 rounded-xl p-4 text-sm text-indigo-200">
                <Shield className="w-4 h-4 inline mr-1.5 text-indigo-400" />
                Your data is encrypted and never sold to third parties. You can delete your profile at any time.
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
              className="text-white/50 hover:text-white disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </Button>

            {step < STEPS.length - 1 ? (
              <Button
                onClick={() => {
                  if (!canAdvance()) {
                    toast.error("Please fill in the required fields before continuing.");
                    return;
                  }
                  setStep(s => s + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6"
              >
                Continue <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!consentTerms || submitMutation.isPending}
                className="bg-green-600 hover:bg-green-500 text-white px-8 font-bold"
              >
                {submitMutation.isPending ? "Submitting..." : "Join the Waitlist →"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Missing import
function Ruler(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21.3 8.7 8.7 21.3c-1 1-2.5 1-3.4 0l-2.6-2.6c-1-1-1-2.5 0-3.4L15.3 2.7c1-1 2.5-1 3.4 0l2.6 2.6c1 1 1 2.5 0 3.4Z"/><path d="m7.5 10.5 2 2"/><path d="m10.5 7.5 2 2"/><path d="m13.5 4.5 2 2"/><path d="m4.5 13.5 2 2"/></svg>;
}
