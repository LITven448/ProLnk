import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import {
  Home, MapPin, Building2, Wrench, Star, Camera, Shield, CheckCircle,
  ArrowRight, ArrowLeft, User, Phone, Info, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// --- Step definitions ----------------------------------------------------------
const STEPS = [
  { id: 1, label: "Your Address",      icon: MapPin,     description: "Where is your property?" },
  { id: 2, label: "Property Details",  icon: Building2,  description: "Tell us about your home" },
  { id: 3, label: "Past Improvements", icon: Wrench,     description: "What has been done recently?" },
  { id: 4, label: "Project Wishes",    icon: Star,       description: "What would you like done?" },
  { id: 5, label: "Property Photos",   icon: Camera,     description: "Help pros see your home" },
  { id: 6, label: "Your Contact",      icon: User,       description: "How should pros reach you?" },
  { id: 7, label: "Consent & Finish",  icon: Shield,     description: "Review and agree to terms" },
];

// --- Improvement categories ----------------------------------------------------
const IMPROVEMENT_CATEGORIES = [
  "Roof", "HVAC System", "Water Heater", "Electrical Panel",
  "Plumbing (major)", "Windows / Doors", "Kitchen Remodel",
  "Bathroom Remodel", "Flooring", "Exterior Paint", "Interior Paint",
  "Fence / Gate", "Deck / Patio", "Pool / Spa", "Landscaping",
  "Pest Control (ongoing)", "Gutter System", "Insulation",
  "Foundation Work", "Garage Door", "Driveway / Concrete",
  "Security System", "Solar Panels", "Siding",
];

// --- Wish categories -----------------------------------------------------------
const WISH_CATEGORIES = [
  "Lawn Care / Maintenance", "Pet Waste Removal", "Pest Control",
  "HVAC Service / Replacement", "Plumbing Repair", "Electrical Work",
  "Roof Repair / Replacement", "Gutter Cleaning / Repair",
  "Pressure Washing", "Window Cleaning", "House Cleaning",
  "Painting (Interior)", "Painting (Exterior)", "Flooring",
  "Kitchen Renovation", "Bathroom Renovation", "Fence Repair / Install",
  "Deck / Patio Build", "Landscaping / Design", "Tree Trimming / Removal",
  "Pool Service / Repair", "Concrete / Driveway", "Garage Door",
  "Smart Home / Security", "Solar Installation",
];

const BUDGET_OPTIONS = [
  { value: "under_1k",  label: "Under $1,000" },
  { value: "1k_5k",    label: "$1,000 - $5,000" },
  { value: "5k_15k",   label: "$5,000 - $15,000" },
  { value: "15k_50k",  label: "$15,000 - $50,000" },
  { value: "over_50k", label: "Over $50,000" },
  { value: "not_sure", label: "Not sure yet" },
];

const URGENCY_OPTIONS = [
  { value: "within_30_days",    label: "Within 30 days" },
  { value: "1_to_3_months",    label: "1 - 3 months" },
  { value: "3_to_6_months",    label: "3 - 6 months" },
  { value: "6_to_12_months",   label: "6 - 12 months" },
  { value: "just_researching", label: "Just researching" },
];

// --- Photo prompt descriptions -------------------------------------------------
const PHOTO_PROMPTS = [
  { key: "exterior_front",  label: "Front Exterior",   hint: "Stand at the street, capture the full front of the home including roof line and driveway." },
  { key: "exterior_back",   label: "Back Exterior",    hint: "Capture the full back of the home including any deck, patio, fence, or yard features." },
  { key: "concern_area",    label: "Area of Concern",  hint: "Photograph any visible damage, wear, or issue you want a pro to look at." },
  { key: "room_to_improve", label: "Room to Improve",  hint: "Show the room or space you most want to update or renovate." },
  { key: "kitchen",         label: "Kitchen",          hint: "Capture the full kitchen including counters, cabinets, and appliances." },
  { key: "primary_bath",    label: "Primary Bathroom", hint: "Show the full bathroom including vanity, shower/tub, and flooring." },
];

// --- Component -----------------------------------------------------------------
export default function HomeownerSetup() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState(1);

  // Step 1-2: property
  const [property, setProperty] = useState({
    address: "", city: "", state: "TX", zip: "",
    propertyType: "single_family",
    yearBuilt: "", sqft: "", bedrooms: "", bathrooms: "",
    hasPool: false, hasGarage: false, hasFence: false,
    isRental: false, ownershipYears: "3_to_7",
  });

  // Step 3: improvements
  const [improvements, setImprovements] = useState<Record<string, { checked: boolean; year: string }>>({});

  // Step 4: wishes
  const [wishes, setWishes] = useState<Record<string, { checked: boolean; budget: string; urgency: string; notes: string }>>({});

  // Step 5: photos (URLs after upload)
  const [photoUrls, setPhotoUrls] = useState<Record<string, string>>({});
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  // Step 6: contact
  const [contact, setContact] = useState({
    displayName: "", phone: "", contactPreference: "email",
    openToRecommendations: true,
  });

  // Step 7: consent
  const [consent, setConsent] = useState({
    terms: false, photos: false, partnerContact: false, aiData: false,
  });

  // Style preferences (optional -- used for AI mockup generation)
  const [stylePrefs, setStylePrefs] = useState({
    homeStyle: "",
    exteriorColor: "",
    interiorPalette: "",
    designAesthetic: "",
    styleNotes: "",
  });

  // Inspiration photos (optional -- uploaded in Step 5)
  const [inspirationPhotos, setInspirationPhotos] = useState<string[]>([]);
  const [uploadingInspo, setUploadingInspo] = useState(false);

  // tRPC mutations
  const saveProperty = trpc.homeowner.saveProperty.useMutation();
  const saveImprovements = trpc.homeowner.saveImprovements.useMutation();
  const saveWishes = trpc.homeowner.saveWishes.useMutation();
  const saveProfile = trpc.homeowner.saveProfile.useMutation();

  // -- Helpers ----------------------------------------------------------------
  const toggleImprovement = (cat: string) => {
    setImprovements(prev => ({
      ...prev,
      [cat]: prev[cat] ? { ...prev[cat], checked: !prev[cat].checked } : { checked: true, year: "" },
    }));
  };

  const toggleWish = (cat: string) => {
    setWishes(prev => ({
      ...prev,
      [cat]: prev[cat] ? { ...prev[cat], checked: !prev[cat].checked } : { checked: true, budget: "not_sure", urgency: "just_researching", notes: "" },
    }));
  };

  const canNext = () => {
    if (step === 1) return property.address.trim() && property.city.trim() && property.zip.trim();
    if (step === 6) return contact.displayName.trim().length > 0 && contact.phone.trim().length > 0;
    if (step === 7) return consent.terms;
    return true;
  };

  // -- Upload photo -----------------------------------------------------------
  const handlePhotoUpload = async (key: string, file: File) => {
    if (file.size > 16 * 1024 * 1024) { toast.error("Photo must be under 16 MB"); return; }
    setUploadingKey(key);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload/property-photo", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();
      setPhotoUrls(prev => ({ ...prev, [key]: url }));
      toast.success("Photo uploaded");
    } catch {
      toast.error("Photo upload failed -- you can add photos later from your dashboard");
    } finally {
      setUploadingKey(null);
    }
  };

  // -- Final submit -----------------------------------------------------------
  const handleFinish = async () => {
    try {
      // 1. Save property
      const propResult = await saveProperty.mutateAsync({
        address: property.address,
        city: property.city,
        state: property.state,
        zip: property.zip,
        propertyType: property.propertyType as any,
        yearBuilt: property.yearBuilt ? parseInt(property.yearBuilt) : undefined,
        sqft: property.sqft ? parseInt(property.sqft) : undefined,
        bedrooms: property.bedrooms ? parseInt(property.bedrooms) : undefined,
        bathrooms: property.bathrooms ? parseFloat(property.bathrooms) : undefined,
        hasPool: property.hasPool,
        hasGarage: property.hasGarage,
        hasFence: property.hasFence,
        isRental: property.isRental,
        ownershipYears: property.ownershipYears as any,
        isPrimary: true,
        setupComplete: true,
        stylePreferences: (stylePrefs.homeStyle || stylePrefs.exteriorColor || stylePrefs.interiorPalette || stylePrefs.designAesthetic || stylePrefs.styleNotes)
          ? {
              homeStyle: stylePrefs.homeStyle || undefined,
              exteriorColor: stylePrefs.exteriorColor || undefined,
              interiorPalette: stylePrefs.interiorPalette || undefined,
              designAesthetic: stylePrefs.designAesthetic || undefined,
              styleNotes: stylePrefs.styleNotes || undefined,
            }
          : undefined,
        inspirationPhotoUrls: inspirationPhotos.length > 0 ? inspirationPhotos : undefined,
      });

      const propertyId = propResult.id;

      // 2. Save improvements
      const checkedImprovements = Object.entries(improvements)
        .filter(([, v]) => v.checked)
        .map(([cat, v]) => ({ category: cat, completedYear: v.year ? parseInt(v.year) : undefined }));
      if (checkedImprovements.length > 0) {
        await saveImprovements.mutateAsync({ propertyId, improvements: checkedImprovements });
      }

      // 3. Save wishes
      const checkedWishes = Object.entries(wishes)
        .filter(([, v]) => v.checked)
        .map(([cat, v]) => ({ category: cat, budgetRange: v.budget as any, urgency: v.urgency as any, notes: v.notes || undefined }));
      if (checkedWishes.length > 0) {
        await saveWishes.mutateAsync({ propertyId, wishes: checkedWishes });
      }

      // 4. Save profile + consent
      await saveProfile.mutateAsync({
        displayName: contact.displayName,
        phone: contact.phone,
        contactPreference: contact.contactPreference as any,
        openToRecommendations: contact.openToRecommendations,
        consentTerms: consent.terms,
        consentPhotos: consent.photos,
        consentPartnerContact: consent.partnerContact,
        consentAiData: consent.aiData,
        setupComplete: true,
      });

      toast.success("Welcome to TrustyPro! Your property profile is ready.");
      navigate("/my-home");
    } catch (e: any) {
      toast.error(e?.message || "Setup failed -- please try again");
    }
  };

  const isSubmitting = saveProperty.isPending || saveProfile.isPending;

  // --- Render -----------------------------------------------------------------
  return (
    <HomeownerLayout>
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg, #050d1a 0%, #0a1628 60%, #0d1f3c 100%)" }}>
      {/* Header */}
      <div className="border-b px-6 py-4 flex items-center gap-3" style={{ borderColor: "#1E3A5F" }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#00B5B820" }}>
          <Home className="w-4 h-4" style={{ color: "#00B5B8" }} />
        </div>
        <div>
          <div className="font-bold text-white text-sm">TrustyPro Setup</div>
          <div className="text-xs" style={{ color: "#4A6FA5" }}>Step {step} of {STEPS.length} -- {STEPS[step - 1].label}</div>
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center p-4 md:p-8">
        <div className="w-full max-w-2xl">

          {/* Progress bar */}
          <div className="flex items-center gap-1 mb-8">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center gap-1 flex-1">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all"
                  style={{
                    backgroundColor: step > s.id ? "#00B5B8" : step === s.id ? "#00B5B820" : "#0F1F35",
                    border: `2px solid ${step >= s.id ? "#00B5B8" : "#1E3A5F"}`,
                    color: step > s.id ? "white" : step === s.id ? "#00B5B8" : "#4A6FA5",
                  }}
                >
                  {step > s.id ? <CheckCircle className="w-3.5 h-3.5" /> : s.id}
                </div>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 h-0.5 rounded" style={{ backgroundColor: step > s.id ? "#00B5B8" : "#1E3A5F" }} />
                )}
              </div>
            ))}
          </div>

          {/* Card */}
          <div className="rounded-2xl border p-6 md:p-8" style={{ backgroundColor: "#0F1F35", borderColor: "#1E3A5F" }}>
            <div className="mb-6">
              <h2 className="font-bold text-white text-2xl mb-1">{STEPS[step - 1].label}</h2>
              <p className="text-sm" style={{ color: "#4A6FA5" }}>{STEPS[step - 1].description}</p>
            </div>

            {/* -- Step 1: Address ------------------------------------------- */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs mb-1.5 block font-medium" style={{ color: "#A0B4C8" }}>Street Address *</label>
                  <Input
                    placeholder="123 Main Street"
                    value={property.address}
                    onChange={e => setProperty(p => ({ ...p, address: e.target.value }))}
                    className="border-0 text-white placeholder:text-slate-600 h-11"
                    style={{ backgroundColor: "#0A1628" }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs mb-1.5 block font-medium" style={{ color: "#A0B4C8" }}>City *</label>
                    <Input
                      placeholder="Dallas"
                      value={property.city}
                      onChange={e => setProperty(p => ({ ...p, city: e.target.value }))}
                      className="border-0 text-white placeholder:text-slate-600 h-11"
                      style={{ backgroundColor: "#0A1628" }}
                    />
                  </div>
                  <div>
                    <label className="text-xs mb-1.5 block font-medium" style={{ color: "#A0B4C8" }}>ZIP Code *</label>
                    <Input
                      placeholder="75201"
                      value={property.zip}
                      onChange={e => setProperty(p => ({ ...p, zip: e.target.value }))}
                      className="border-0 text-white placeholder:text-slate-600 h-11"
                      style={{ backgroundColor: "#0A1628" }}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs mb-1.5 block font-medium" style={{ color: "#A0B4C8" }}>State</label>
                  <Input
                    placeholder="TX"
                    value={property.state}
                    onChange={e => setProperty(p => ({ ...p, state: e.target.value }))}
                    className="border-0 text-white placeholder:text-slate-600 h-11"
                    style={{ backgroundColor: "#0A1628" }}
                  />
                </div>
                <div className="rounded-xl p-3 flex items-start gap-2" style={{ backgroundColor: "#00B5B810", border: "1px solid #00B5B830" }}>
                  <Info className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#00B5B8" }} />
                  <p className="text-xs" style={{ color: "#4A6FA5" }}>
                    Your address is used to match you with local service professionals. It is never shared publicly.
                  </p>
                </div>
              </div>
            )}

            {/* -- Step 2: Property Details ----------------------------------- */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs mb-2 block font-medium" style={{ color: "#A0B4C8" }}>Property Type *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: "single_family", label: "Single Family" },
                      { value: "condo",         label: "Condo / Apt" },
                      { value: "townhouse",     label: "Townhouse" },
                      { value: "multi_family",  label: "Multi-Family" },
                      { value: "other",         label: "Other" },
                    ].map(pt => (
                      <button
                        key={pt.value}
                        onClick={() => setProperty(p => ({ ...p, propertyType: pt.value }))}
                        className="flex items-center gap-2 p-3 rounded-xl text-left transition-all"
                        style={{
                          backgroundColor: property.propertyType === pt.value ? "#00B5B815" : "#0A1628",
                          border: `1px solid ${property.propertyType === pt.value ? "#00B5B840" : "#1E3A5F"}`,
                        }}
                      >
                        <div className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                          style={{ borderColor: property.propertyType === pt.value ? "#00B5B8" : "#4A6FA5" }}>
                          {property.propertyType === pt.value && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#00B5B8" }} />}
                        </div>
                        <span className="text-sm text-white">{pt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs mb-1.5 block font-medium" style={{ color: "#A0B4C8" }}>Year Built</label>
                    <Input type="number" placeholder="2005" value={property.yearBuilt}
                      onChange={e => setProperty(p => ({ ...p, yearBuilt: e.target.value }))}
                      className="border-0 text-white placeholder:text-slate-600 h-11" style={{ backgroundColor: "#0A1628" }} />
                  </div>
                  <div>
                    <label className="text-xs mb-1.5 block font-medium" style={{ color: "#A0B4C8" }}>Square Footage</label>
                    <Input type="number" placeholder="2,400" value={property.sqft}
                      onChange={e => setProperty(p => ({ ...p, sqft: e.target.value }))}
                      className="border-0 text-white placeholder:text-slate-600 h-11" style={{ backgroundColor: "#0A1628" }} />
                  </div>
                  <div>
                    <label className="text-xs mb-1.5 block font-medium" style={{ color: "#A0B4C8" }}>Bedrooms</label>
                    <Input type="number" placeholder="4" value={property.bedrooms}
                      onChange={e => setProperty(p => ({ ...p, bedrooms: e.target.value }))}
                      className="border-0 text-white placeholder:text-slate-600 h-11" style={{ backgroundColor: "#0A1628" }} />
                  </div>
                  <div>
                    <label className="text-xs mb-1.5 block font-medium" style={{ color: "#A0B4C8" }}>Bathrooms</label>
                    <Input type="number" placeholder="2.5" step="0.5" value={property.bathrooms}
                      onChange={e => setProperty(p => ({ ...p, bathrooms: e.target.value }))}
                      className="border-0 text-white placeholder:text-slate-600 h-11" style={{ backgroundColor: "#0A1628" }} />
                  </div>
                </div>
                <div>
                  <label className="text-xs mb-2 block font-medium" style={{ color: "#A0B4C8" }}>How long have you owned this property?</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: "under_1",  label: "Less than 1 year" },
                      { value: "1_to_3",   label: "1 - 3 years" },
                      { value: "3_to_7",   label: "3 - 7 years" },
                      { value: "7_to_15",  label: "7 - 15 years" },
                      { value: "over_15",  label: "15+ years" },
                    ].map(opt => (
                      <button key={opt.value}
                        onClick={() => setProperty(p => ({ ...p, ownershipYears: opt.value }))}
                        className="flex items-center gap-2 p-3 rounded-xl text-left transition-all"
                        style={{
                          backgroundColor: property.ownershipYears === opt.value ? "#00B5B815" : "#0A1628",
                          border: `1px solid ${property.ownershipYears === opt.value ? "#00B5B840" : "#1E3A5F"}`,
                        }}
                      >
                        <div className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                          style={{ borderColor: property.ownershipYears === opt.value ? "#00B5B8" : "#4A6FA5" }}>
                          {property.ownershipYears === opt.value && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#00B5B8" }} />}
                        </div>
                        <span className="text-sm text-white">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs mb-2 block font-medium" style={{ color: "#A0B4C8" }}>Property features (check all that apply)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: "hasPool",   label: "Pool / Spa" },
                      { key: "hasGarage", label: "Garage" },
                      { key: "hasFence",  label: "Fence / Gate" },
                      { key: "isRental",  label: "Rental Property" },
                    ].map(f => (
                      <button key={f.key}
                        onClick={() => setProperty(p => ({ ...p, [f.key]: !p[f.key as keyof typeof p] }))}
                        className="flex items-center gap-2 p-3 rounded-xl text-left transition-all"
                        style={{
                          backgroundColor: (property as any)[f.key] ? "#00B5B815" : "#0A1628",
                          border: `1px solid ${(property as any)[f.key] ? "#00B5B840" : "#1E3A5F"}`,
                        }}
                      >
                        <div className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center"
                          style={{ backgroundColor: (property as any)[f.key] ? "#00B5B8" : "transparent", border: `2px solid ${(property as any)[f.key] ? "#00B5B8" : "#4A6FA5"}` }}>
                          {(property as any)[f.key] && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                        <span className="text-sm text-white">{f.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* -- Style Preferences (optional) -- */}
                <div className="rounded-xl p-4 space-y-4" style={{ backgroundColor: "#00B5B808", border: "1px solid #00B5B820" }}>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" style={{ color: "#00B5B8" }} />
                    <span className="text-sm font-semibold" style={{ color: "#00B5B8" }}>Style Preferences</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "#00B5B815", color: "#4A6FA5" }}>Optional</span>
                  </div>
                  <p className="text-xs" style={{ color: "#4A6FA5" }}>
                    These help us generate better AI mockups and renovation suggestions tailored to your taste.
                  </p>
                  <div>
                    <label className="text-xs mb-2 block font-medium" style={{ color: "#A0B4C8" }}>Home Style Preference</label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Modern / Contemporary","Traditional / Classic","Farmhouse / Rustic","Spanish / Mediterranean","Craftsman","Minimalist"].map(style => (
                        <button key={style}
                          onClick={() => setStylePrefs(p => ({ ...p, homeStyle: p.homeStyle === style ? "" : style }))}
                          className="flex items-center gap-2 p-2.5 rounded-xl text-left transition-all"
                          style={{
                            backgroundColor: stylePrefs.homeStyle === style ? "#00B5B815" : "#0A1628",
                            border: `1px solid ${stylePrefs.homeStyle === style ? "#00B5B840" : "#1E3A5F"}`,
                          }}
                        >
                          <div className="w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                            style={{ borderColor: stylePrefs.homeStyle === style ? "#00B5B8" : "#4A6FA5" }}>
                            {stylePrefs.homeStyle === style && <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#00B5B8" }} />}
                          </div>
                          <span className="text-xs text-white">{style}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs mb-1.5 block font-medium" style={{ color: "#A0B4C8" }}>Exterior Color Preference</label>
                      <Input placeholder="e.g. White, Greige, Navy" value={stylePrefs.exteriorColor}
                        onChange={e => setStylePrefs(p => ({ ...p, exteriorColor: e.target.value }))}
                        className="border-0 text-white placeholder:text-slate-600 h-10 text-sm" style={{ backgroundColor: "#0A1628" }} />
                    </div>
                    <div>
                      <label className="text-xs mb-1.5 block font-medium" style={{ color: "#A0B4C8" }}>Interior Color Palette</label>
                      <Input placeholder="e.g. Warm neutrals, Bold accents" value={stylePrefs.interiorPalette}
                        onChange={e => setStylePrefs(p => ({ ...p, interiorPalette: e.target.value }))}
                        className="border-0 text-white placeholder:text-slate-600 h-10 text-sm" style={{ backgroundColor: "#0A1628" }} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs mb-1.5 block font-medium" style={{ color: "#A0B4C8" }}>Design Aesthetic / Vibe</label>
                    <Input placeholder="e.g. Clean & minimal, Cozy & warm, Bold & dramatic" value={stylePrefs.designAesthetic}
                      onChange={e => setStylePrefs(p => ({ ...p, designAesthetic: e.target.value }))}
                      className="border-0 text-white placeholder:text-slate-600 h-10 text-sm" style={{ backgroundColor: "#0A1628" }} />
                  </div>
                  <div>
                    <label className="text-xs mb-1.5 block font-medium" style={{ color: "#A0B4C8" }}>Additional Style Notes</label>
                    <Textarea placeholder="Anything else you'd like pros to know about your style preferences..." value={stylePrefs.styleNotes}
                      onChange={e => setStylePrefs(p => ({ ...p, styleNotes: e.target.value }))}
                      rows={2}
                      className="border-0 text-white placeholder:text-slate-600 text-sm resize-none" style={{ backgroundColor: "#0A1628" }} />
                  </div>
                </div>
              </div>
            )}

            {/* -- Step 3: Past Improvements ---------------------------------- */}
            {step === 3 && (
              <div className="space-y-3">
                <p className="text-sm" style={{ color: "#A0B4C8" }}>
                  Check anything that has been done in the last 10 years. This helps pros understand what's been maintained and what may be aging out.
                </p>
                <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto pr-1">
                  {IMPROVEMENT_CATEGORIES.map(cat => {
                    const imp = improvements[cat];
                    return (
                      <div key={cat} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${imp?.checked ? "#00B5B840" : "#1E3A5F"}` }}>
                        <button
                          onClick={() => toggleImprovement(cat)}
                          className="w-full flex items-center gap-3 p-3 text-left transition-all"
                          style={{ backgroundColor: imp?.checked ? "#00B5B815" : "#0A1628" }}
                        >
                          <div className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center"
                            style={{ backgroundColor: imp?.checked ? "#00B5B8" : "transparent", border: `2px solid ${imp?.checked ? "#00B5B8" : "#4A6FA5"}` }}>
                            {imp?.checked && <CheckCircle className="w-3 h-3 text-white" />}
                          </div>
                          <span className="text-sm text-white">{cat}</span>
                        </button>
                        {imp?.checked && (
                          <div className="px-3 pb-3 pt-1" style={{ backgroundColor: "#00B5B808" }}>
                            <label className="text-xs mb-1 block" style={{ color: "#4A6FA5" }}>Approximate year completed (optional)</label>
                            <Input
                              type="number"
                              placeholder="2021"
                              value={imp.year}
                              onChange={e => setImprovements(prev => ({ ...prev, [cat]: { ...prev[cat], year: e.target.value } }))}
                              className="border-0 text-white placeholder:text-slate-600 h-9 text-sm"
                              style={{ backgroundColor: "#0A1628" }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs" style={{ color: "#4A6FA5" }}>
                  Don't worry if you're not sure -- you can always update this from your property dashboard.
                </p>
              </div>
            )}

            {/* -- Step 4: Project Wishes ------------------------------------- */}
            {step === 4 && (
              <div className="space-y-3">
                <p className="text-sm" style={{ color: "#A0B4C8" }}>
                  Select anything you're thinking about getting done. This is how we match you with the right pros.
                </p>
                <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto pr-1">
                  {WISH_CATEGORIES.map(cat => {
                    const wish = wishes[cat];
                    return (
                      <div key={cat} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${wish?.checked ? "#00B5B840" : "#1E3A5F"}` }}>
                        <button
                          onClick={() => toggleWish(cat)}
                          className="w-full flex items-center gap-3 p-3 text-left transition-all"
                          style={{ backgroundColor: wish?.checked ? "#00B5B815" : "#0A1628" }}
                        >
                          <div className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center"
                            style={{ backgroundColor: wish?.checked ? "#00B5B8" : "transparent", border: `2px solid ${wish?.checked ? "#00B5B8" : "#4A6FA5"}` }}>
                            {wish?.checked && <CheckCircle className="w-3 h-3 text-white" />}
                          </div>
                          <span className="text-sm text-white">{cat}</span>
                        </button>
                        {wish?.checked && (
                          <div className="px-3 pb-3 pt-1 space-y-2" style={{ backgroundColor: "#00B5B808" }}>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-xs mb-1 block" style={{ color: "#4A6FA5" }}>Budget range</label>
                                <select
                                  value={wish.budget}
                                  onChange={e => setWishes(prev => ({ ...prev, [cat]: { ...prev[cat], budget: e.target.value } }))}
                                  className="w-full rounded-lg px-2 py-1.5 text-xs text-white border-0"
                                  style={{ backgroundColor: "#0A1628" }}
                                >
                                  {BUDGET_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                </select>
                              </div>
                              <div>
                                <label className="text-xs mb-1 block" style={{ color: "#4A6FA5" }}>Timing</label>
                                <select
                                  value={wish.urgency}
                                  onChange={e => setWishes(prev => ({ ...prev, [cat]: { ...prev[cat], urgency: e.target.value } }))}
                                  className="w-full rounded-lg px-2 py-1.5 text-xs text-white border-0"
                                  style={{ backgroundColor: "#0A1628" }}
                                >
                                  {URGENCY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                </select>
                              </div>
                            </div>
                            <Input
                              placeholder="Any notes? (optional)"
                              value={wish.notes}
                              onChange={e => setWishes(prev => ({ ...prev, [cat]: { ...prev[cat], notes: e.target.value } }))}
                              className="border-0 text-white placeholder:text-slate-600 h-8 text-xs"
                              style={{ backgroundColor: "#0A1628" }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* -- Step 5: Photos --------------------------------------------- */}
            {step === 5 && (
              <div className="space-y-4">
                <div className="rounded-xl p-3 flex items-start gap-2" style={{ backgroundColor: "#00B5B810", border: "1px solid #00B5B830" }}>
                  <Info className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#00B5B8" }} />
                  <div className="text-xs" style={{ color: "#4A6FA5" }}>
                    <strong className="text-white">Photo tips:</strong> Take photos in good natural light. Capture the full space -- not just a corner. Avoid photos of pets, people, or personal items. All 6 prompts are optional; add what you can.
                  </div>
                </div>
                <div className="space-y-3">
                  {PHOTO_PROMPTS.map(prompt => (
                    <div key={prompt.key} className="rounded-xl border p-4" style={{ borderColor: photoUrls[prompt.key] ? "#00B5B840" : "#1E3A5F", backgroundColor: "#0A1628" }}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{prompt.label}</p>
                          <p className="text-xs mt-0.5" style={{ color: "#4A6FA5" }}>{prompt.hint}</p>
                        </div>
                        {photoUrls[prompt.key] ? (
                          <div className="flex items-center gap-2">
                            <img src={photoUrls[prompt.key]} alt={prompt.label} className="w-16 h-12 object-cover rounded-lg" />
                            <button onClick={() => setPhotoUrls(p => { const n = { ...p }; delete n[prompt.key]; return n; })}
                              className="text-xs px-2 py-1 rounded" style={{ color: "#EF4444", backgroundColor: "#EF444410" }}>
                              Remove
                            </button>
                          </div>
                        ) : uploadingKey === prompt.key ? (
                          <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium"
                            style={{ backgroundColor: "#00B5B820", color: "#00B5B8" }}>Uploading...</div>
                        ) : (
                          <div className="flex gap-2">
                            <label className="cursor-pointer">
                              <input type="file" accept="image/*" capture="environment" className="hidden"
                                onChange={e => { const f = e.target.files?.[0]; if (f) handlePhotoUpload(prompt.key, f); }} />
                              <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all"
                                style={{ backgroundColor: "#00B5B8", color: "white" }}>
                                <Camera className="w-3.5 h-3.5" /> Take Photo
                              </div>
                            </label>
                            <label className="cursor-pointer">
                              <input type="file" accept="image/*" className="hidden"
                                onChange={e => { const f = e.target.files?.[0]; if (f) handlePhotoUpload(prompt.key, f); }} />
                              <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all"
                                style={{ backgroundColor: "#00B5B820", color: "#00B5B8", border: "1px solid #00B5B840" }}>
                                Library
                              </div>
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs" style={{ color: "#4A6FA5" }}>
                  Photos can be added or updated at any time from your property dashboard. This step is entirely optional.
                </p>

                {/* -- Inspiration Photos -- */}
                <div className="rounded-xl p-4 space-y-3" style={{ backgroundColor: "#00B5B808", border: "1px solid #00B5B820" }}>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" style={{ color: "#00B5B8" }} />
                    <span className="text-sm font-semibold" style={{ color: "#00B5B8" }}>Style Inspiration Photos</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "#00B5B815", color: "#4A6FA5" }}>Optional</span>
                  </div>
                  <p className="text-xs" style={{ color: "#4A6FA5" }}>
                    Upload 1-3 photos of styles you love -- from Pinterest, Houzz, or anywhere. These help pros and our AI generate mockups that match your taste.
                  </p>
                  {inspirationPhotos.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {inspirationPhotos.map((url, i) => (
                        <div key={i} className="relative">
                          <img src={url} alt={`Inspiration ${i + 1}`} className="w-20 h-16 object-cover rounded-lg" />
                          <button
                            onClick={() => setInspirationPhotos(p => p.filter((_, j) => j !== i))}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                            style={{ backgroundColor: "#EF4444", color: "white" }}
                          ></button>
                        </div>
                      ))}
                    </div>
                  )}
                  {inspirationPhotos.length < 3 && (
                    <label className="cursor-pointer inline-block">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async e => {
                          const f = e.target.files?.[0];
                          if (!f) return;
                          setUploadingInspo(true);
                          try {
                            const formData = new FormData();
                            formData.append("file", f);
                            const res = await fetch("/api/upload", { method: "POST", body: formData });
                            const data = await res.json();
                            if (data.url) setInspirationPhotos(p => [...p, data.url]);
                          } catch {
                            toast.error("Upload failed -- try again");
                          } finally {
                            setUploadingInspo(false);
                          }
                        }}
                      />
                      <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium"
                        style={{ backgroundColor: "#00B5B820", color: "#00B5B8", border: "1px solid #00B5B840" }}>
                        {uploadingInspo ? "Uploading..." : <><Camera className="w-3.5 h-3.5" /> Add Inspiration Photo</>}
                      </div>
                    </label>
                  )}
                </div>
              </div>
            )}

            {/* -- Step 6: Contact -------------------------------------------- */}
            {step === 6 && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs mb-1.5 block font-medium" style={{ color: "#A0B4C8" }}>Your Name *</label>
                  <Input
                    placeholder="First name or full name"
                    value={contact.displayName}
                    onChange={e => setContact(c => ({ ...c, displayName: e.target.value }))}
                    className="border-0 text-white placeholder:text-slate-600 h-11"
                    style={{ backgroundColor: "#0A1628" }}
                  />
                </div>
                <div>
                  <label className="text-xs mb-1.5 block font-medium" style={{ color: "#A0B4C8" }}>Phone Number <span style={{ color: "#FF6B6B" }}>*</span></label>
                  <Input
                    type="tel"
                    placeholder="(214) 555-0100"
                    value={contact.phone}
                    onChange={e => setContact(c => ({ ...c, phone: e.target.value }))}
                    className="border-0 text-white placeholder:text-slate-600 h-11"
                    style={{ backgroundColor: "#0A1628" }}
                    required
                  />
                  <p className="text-xs mt-1" style={{ color: "#4A6FA5" }}>Required so verified pros can reach you directly.</p>
                </div>
                <div>
                  <label className="text-xs mb-2 block font-medium" style={{ color: "#A0B4C8" }}>Preferred contact method</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: "email",   label: "Email" },
                      { value: "text",    label: "Text / SMS" },
                      { value: "phone",   label: "Phone Call" },
                      { value: "in_app",  label: "In-App Only" },
                    ].map(opt => (
                      <button key={opt.value}
                        onClick={() => setContact(c => ({ ...c, contactPreference: opt.value }))}
                        className="flex items-center gap-2 p-3 rounded-xl text-left transition-all"
                        style={{
                          backgroundColor: contact.contactPreference === opt.value ? "#00B5B815" : "#0A1628",
                          border: `1px solid ${contact.contactPreference === opt.value ? "#00B5B840" : "#1E3A5F"}`,
                        }}
                      >
                        <div className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                          style={{ borderColor: contact.contactPreference === opt.value ? "#00B5B8" : "#4A6FA5" }}>
                          {contact.contactPreference === opt.value && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#00B5B8" }} />}
                        </div>
                        <span className="text-sm text-white">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: "#0A1628", border: "1px solid #1E3A5F" }}>
                  <button
                    onClick={() => setContact(c => ({ ...c, openToRecommendations: !c.openToRecommendations }))}
                    className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center transition-all"
                    style={{ backgroundColor: contact.openToRecommendations ? "#00B5B8" : "transparent", border: `2px solid ${contact.openToRecommendations ? "#00B5B8" : "#4A6FA5"}` }}
                  >
                    {contact.openToRecommendations && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                  </button>
                  <div>
                    <p className="text-sm text-white">Open to pro recommendations</p>
                    <p className="text-xs" style={{ color: "#4A6FA5" }}>Allow trusted pros in the network to reach out with relevant offers</p>
                  </div>
                </div>
              </div>
            )}

            {/* -- Step 7: Consent -------------------------------------------- */}
            {step === 7 && (
              <div className="space-y-4">
                <div className="rounded-xl p-4" style={{ backgroundColor: "#0A1628", border: "1px solid #1E3A5F" }}>
                  <p className="text-sm font-medium text-white mb-2">Almost done!</p>
                  <p className="text-xs" style={{ color: "#4A6FA5" }}>
                    Review and agree to the following to complete your TrustyPro profile. You can update your preferences at any time from your account settings.
                  </p>
                </div>
                {[
                  { key: "terms",          label: "I agree to the Terms of Service and Privacy Policy", required: true,  description: "Required to use TrustyPro." },
                  { key: "photos",         label: "I consent to my property photos being used for AI analysis", required: false, description: "Helps us identify maintenance needs and match you with the right pros." },
                  { key: "partnerContact", label: "I consent to be contacted by verified service professionals", required: false, description: "Only pros in the verified network can reach out, based on your preferences." },
                  { key: "aiData",         label: "I consent to my property data being used to improve recommendations", required: false, description: "Anonymized data helps improve matching quality for all homeowners." },
                ].map(item => (
                  <div key={item.key}
                    className="flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all"
                    style={{
                      backgroundColor: (consent as any)[item.key] ? "#00B5B815" : "#0A1628",
                      border: `1px solid ${(consent as any)[item.key] ? "#00B5B840" : "#1E3A5F"}`,
                    }}
                    onClick={() => setConsent(c => ({ ...c, [item.key]: !(c as any)[item.key] }))}
                  >
                    <div className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center mt-0.5 transition-all"
                      style={{ backgroundColor: (consent as any)[item.key] ? "#00B5B8" : "transparent", border: `2px solid ${(consent as any)[item.key] ? "#00B5B8" : "#4A6FA5"}` }}>
                      {(consent as any)[item.key] && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <div>
                      <p className="text-sm text-white">
                        {item.label}
                        {item.required && <span className="ml-1 text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: "#00B5B820", color: "#00B5B8" }}>Required</span>}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "#4A6FA5" }}>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t" style={{ borderColor: "#1E3A5F" }}>
              {step > 1 ? (
                <Button variant="outline" onClick={() => setStep(s => s - 1)} className="gap-2 border-slate-600 text-slate-300 hover:bg-white/5">
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
              ) : <div />}

              {step < STEPS.length ? (
                <Button
                  onClick={() => setStep(s => s + 1)}
                  disabled={!canNext()}
                  className="gap-2 font-bold text-white"
                  style={{ backgroundColor: "#00B5B8" }}
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleFinish}
                  disabled={!canNext() || isSubmitting}
                  className="gap-2 font-bold text-white"
                  style={{ backgroundColor: "#00B5B8" }}
                >
                  {isSubmitting ? "Saving..." : <><CheckCircle className="w-4 h-4" /> Complete Setup</>}
                </Button>
              )}
            </div>
          </div>

          {/* Skip link */}
          <div className="text-center mt-4">
            <button onClick={() => navigate("/my-home")} className="text-xs hover:underline" style={{ color: "#4A6FA5" }}>
              Skip for now -- I'll complete this later
            </button>
          </div>
        </div>
      </div>
    </div>
    </HomeownerLayout>
  );
}
