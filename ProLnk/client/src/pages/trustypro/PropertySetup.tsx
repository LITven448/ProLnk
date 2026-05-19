import React from 'react';
import { useState } from "react";
import { useLocation } from "wouter";
import { TrustyProLogo } from "@/components/TrustyProLogo";
import {
  Home,
  MapPin,
  Layers,
  Wrench,
  Camera,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TEAL = "#00B5B8″;
const TEAL_LIGHT = "#E0F7F7″;
const NAVY = "#1e3a5f";
const CYAN = "#0891b2″;
const BG = "#F7FFFE";

const STEPS = [
  { id: 1, label: "Basic Info", icon: MapPin },
  { id: 2, label: "Property Type", icon: Home },
  { id: 3, label: "Systems", icon: Wrench },
  { id: 4, label: "Photo", icon: Camera },
  { id: 5, label: "Done", icon: CheckCircle },
];

const PROPERTY_TYPES = [
  { value: "single_family", label: "Single Family Home", desc: "Standalone house on its own lot" },
  { value: "condo", label: "Condo / Apartment", desc: "Unit within a larger building" },
  { value: "townhouse", label: "Townhouse", desc: "Multi-floor attached home" },
  { value: "multi_family", label: "Multi-Family", desc: "Duplex, triplex, or fourplex" },
];

const AGE_OPTIONS = [
  "Less than 5 years",
  "5–10 years",
  "10–15 years",
  "15–20 years",
  "20–25 years",
  "25+ years",
  "Unknown",
];

const PLUMBING_OPTIONS = [
  "Copper",
  "PVC / CPVC",
  "PEX",
  "Galvanized Steel",
  "Cast Iron",
  "Mixed / Unknown",
];

interface BasicInfo {
  address: string;
  city: string;
  state: string;
  zip: string;
  yearBuilt: string;
  sqft: string;
  bedrooms: string;
  bathrooms: string;
}

interface Systems {
  hvacAge: string;
  roofAge: string;
  waterHeaterAge: string;
  plumbingType: string;
}

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-1.5 mb-8″>
      {STEPS.map((step, i) => {
        const done = current > step.id;
        const active = current === step.id;
        return (
          <div key={step.id} className="flex items-center gap-1.5″>
            <div
              className="flex items-center justify-center rounded-full transition-all duration-300″
              style={{
                width: active ? 32 : 24,
                height: active ? 32 : 24,
                backgroundColor: done ? TEAL : active ? NAVY : "#E5E7EB",
              }}
            >
              {done ? (
                <CheckCircle className="w-3.5 h-3.5 text-white" />
              ) : (
                <span
                  className="text-xs font-bold"
                  style={{ color: active ? "white" : "#9CA3AF" }}
                >
                  {step.id}
                </span>
              )}
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="h-0.5 w-6 rounded-full transition-colors duration-300″
                style={{ backgroundColor: done ? TEAL : "#E5E7EB" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-sm font-semibold text-gray-700 mb-1.5″>
      {children}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 transition-shadow"
      style={{ focusRingColor: TEAL } as React.CSSProperties}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = TEAL;
        e.currentTarget.style.boxShadow = `0 0 0 3px ${TEAL}22`;
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "#E5E7EB";
        e.currentTarget.style.boxShadow = "none";
      }}
    />
  );
}

function Select({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none appearance-none cursor-pointer"
      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = TEAL;
        e.currentTarget.style.boxShadow = `0 0 0 3px ${TEAL}22`;
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "#E5E7EB";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}

export default function PropertySetup() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    address: "",
    city: "",
    state: "",
    zip: "",
    yearBuilt: "",
    sqft: "",
    bedrooms: "",
    bathrooms: "",
  });

  const [propertyType, setPropertyType] = useState("");

  const [systems, setSystems] = useState<Systems>({
    hvacAge: "",
    roofAge: "",
    waterHeaterAge: "",
    plumbingType: "",
  });

  const updateBasic = (field: keyof BasicInfo) => (v: string) =>
    setBasicInfo((prev) => ({ ...prev, [field]: v }));

  const updateSystems = (field: keyof Systems) => (v: string) =>
    setSystems((prev) => ({ ...prev, [field]: v }));

  const canProceed = () => {
    if (step === 1) {
      return basicInfo.address.trim() && basicInfo.city.trim() && basicInfo.state.trim() && basicInfo.zip.trim();
    }
    if (step === 2) return propertyType !== "";
    if (step === 3) return systems.hvacAge && systems.roofAge && systems.waterHeaterAge && systems.plumbingType;
    return true;
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleNext = async () => {
    if (step === 4) {
      setSaving(true);
      await new Promise((r) => setTimeout(r, 900));
      setSaving(false);
      setStep(5);
      return;
    }
    if (step < 5) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir * 40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -40, opacity: 0 }),
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: BG, fontFamily: "'Inter', sans-serif" }}>
      <nav
        className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm"
        style={{ borderColor: `${TEAL}20` }}
      >
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <TrustyProLogo height={38} />
          <span className="text-sm text-gray-500 font-medium">Home Setup</span>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-10″>
        <div className="text-center mb-6″>
          <p className="text-xs font-bold uppercase tracking-widest mb-1″ style={{ color: TEAL }}>
            Step {step} of {STEPS.length}
          </p>
          <h1 className="text-2xl font-black text-gray-900″>{STEPS[step - 1].label}</h1>
        </div>

        <StepIndicator current={step} />

        <div className="bg-white rounded-2xl border shadow-sm p-8″ style={{ borderColor: "#E5E7EB" }}>
          <AnimatePresence mode="wait" custom={1}>
            <motion.div
              key={step}
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22 }}
            >
              {step === 1 && (
                <div className="space-y-5″>
                  <div>
                    <FieldLabel>Street Address *</FieldLabel>
                    <Input value={basicInfo.address} onChange={updateBasic("address")} placeholder="4821 Maple Ridge Dr" />
                  </div>
                  <div className="grid grid-cols-2 gap-4″>
                    <div>
                      <FieldLabel>City *</FieldLabel>
                      <Input value={basicInfo.city} onChange={updateBasic("city")} placeholder="Frisco" />
                    </div>
                    <div>
                      <FieldLabel>State *</FieldLabel>
                      <Input value={basicInfo.state} onChange={updateBasic("state")} placeholder="TX" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4″>
                    <div>
                      <FieldLabel>ZIP Code *</FieldLabel>
                      <Input value={basicInfo.zip} onChange={updateBasic("zip")} placeholder="75034″ type="text" />
                    </div>
                    <div>
                      <FieldLabel>Year Built</FieldLabel>
                      <Input value={basicInfo.yearBuilt} onChange={updateBasic("yearBuilt")} placeholder="2004″ type="text" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4″>
                    <div>
                      <FieldLabel>Square Footage</FieldLabel>
                      <Input value={basicInfo.sqft} onChange={updateBasic("sqft")} placeholder="2,400″ type="text" />
                    </div>
                    <div>
                      <FieldLabel>Bedrooms</FieldLabel>
                      <Select value={basicInfo.bedrooms} onChange={updateBasic("bedrooms")} options={["1″, "2", "3", "4", "5", "6+"]} placeholder="Select" />
                    </div>
                  </div>
                  <div>
                    <FieldLabel>Bathrooms</FieldLabel>
                    <Select value={basicInfo.bathrooms} onChange={updateBasic("bathrooms")} options={["1″, "1.5", "2", "2.5", "3", "3.5", "4+"]} placeholder="Select" />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3″>
                  <p className="text-sm text-gray-500 mb-4″>Choose the type that best describes your home.</p>
                  {PROPERTY_TYPES.map((pt) => (
                    <button
                      key={pt.value}
                      onClick={() => setPropertyType(pt.value)}
                      className="w-full text-left rounded-xl border-2 px-5 py-4 flex items-center justify-between transition-all duration-200″
                      style={{
                        borderColor: propertyType === pt.value ? TEAL : "#E5E7EB",
                        backgroundColor: propertyType === pt.value ? TEAL_LIGHT : "white",
                      }}
                    >
                      <div>
                        <p className="text-sm font-bold text-gray-900″>{pt.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5″>{pt.desc}</p>
                      </div>
                      <div
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-4 transition-colors"
                        style={{
                          borderColor: propertyType === pt.value ? TEAL : "#D1D5DB",
                          backgroundColor: propertyType === pt.value ? TEAL : "white",
                        }}
                      >
                        {propertyType === pt.value && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5″>
                  <p className="text-sm text-gray-500 mb-2″>
                    Knowing your system ages helps us flag upcoming maintenance before it becomes expensive.
                  </p>
                  <div>
                    <FieldLabel>HVAC Age *</FieldLabel>
                    <Select value={systems.hvacAge} onChange={updateSystems("hvacAge")} options={AGE_OPTIONS} placeholder="Select age range" />
                  </div>
                  <div>
                    <FieldLabel>Roof Age *</FieldLabel>
                    <Select value={systems.roofAge} onChange={updateSystems("roofAge")} options={AGE_OPTIONS} placeholder="Select age range" />
                  </div>
                  <div>
                    <FieldLabel>Water Heater Age *</FieldLabel>
                    <Select value={systems.waterHeaterAge} onChange={updateSystems("waterHeaterAge")} options={AGE_OPTIONS} placeholder="Select age range" />
                  </div>
                  <div>
                    <FieldLabel>Plumbing Type *</FieldLabel>
                    <Select value={systems.plumbingType} onChange={updateSystems("plumbingType")} options={PLUMBING_OPTIONS} placeholder="Select type" />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="flex flex-col items-center gap-6 py-2″>
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${CYAN} 100%)` }}
                  >
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-black text-gray-900″>Upload a Home Photo</h3>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed max-w-xs mx-auto">
                      Our AI analyzes your photo to detect visible maintenance needs and generate your first health score.
                    </p>
                  </div>

                  {photoPreview ? (
                    <div className="w-full">
                      <div className="relative rounded-xl overflow-hidden aspect-video border-2″ style={{ borderColor: TEAL }}>
                        <img src={photoPreview} alt="Home photo" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-3″>
                          <div className="flex items-center gap-1.5″>
                            <CheckCircle className="w-4 h-4 text-white" />
                            <span className="text-xs font-semibold text-white">{photoFile?.name}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => { setPhotoFile(null); setPhotoPreview(null); }}
                        className="mt-2 text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        Remove photo
                      </button>
                    </div>
                  ) : (
                    <label
                      className="w-full border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-3 py-10 cursor-pointer transition-colors"
                      style={{ borderColor: `${TEAL}60` }}
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: TEAL_LIGHT }}
                      >
                        <Upload className="w-5 h-5″ style={{ color: TEAL }} />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-gray-700″>Click to upload</p>
                        <p className="text-xs text-gray-400 mt-0.5″>JPG, PNG or HEIC up to 20 MB</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoChange}
                      />
                    </label>
                  )}

                  <p className="text-xs text-gray-400 text-center">
                    You can skip this step and add photos later from the scan page.
                  </p>
                </div>
              )}

              {step === 5 && (
                <div className="flex flex-col items-center gap-6 py-4 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.1 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#10B981″ }}
                  >
                    <ShieldCheck className="w-10 h-10 text-white" />
                  </motion.div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900″>Your home is protected.</h2>
                    <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto leading-relaxed">
                      {basicInfo.address ? `${basicInfo.address}, ${basicInfo.city} ${basicInfo.state}` : "Your home"} is now in the TrustyPro network. We'll monitor maintenance needs, alert you early, and connect you to verified pros when you’re ready.
                    </p>
                  </div>

                  <div className="w-full bg-gray-50 rounded-2xl p-5 text-left space-y-3″>
                    {[
                      { label: "AI Health Score", value: "Generating…", color: TEAL },
                      { label: "Maintenance Alerts", value: "Active", color: "#10B981″ },
                      { label: "Pro Network", value: "Connected", color: "#10B981″ },
                      { label: "Home Vault", value: "Ready", color: "#10B981″ },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600″>{item.label}</span>
                        <span className="text-sm font-bold" style={{ color: item.color }}>{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <button
                      onClick={() => navigate("/trustypro/scan")}
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-bold text-white hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: TEAL }}
                    >
                      <Camera className="w-4 h-4″ /> Take First Scan
                    </button>
                    <button
                      onClick={() => navigate("/trustypro/dashboard")}
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-bold border-2 hover:bg-gray-50 transition-colors"
                      style={{ borderColor: NAVY, color: NAVY }}
                    >
                      Go to Dashboard <ChevronRight className="w-4 h-4″ />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {step < 5 && (
          <div className="flex items-center justify-between mt-6″>
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4″ /> Back
            </button>

            <button
              onClick={handleNext}
              disabled={(!canProceed() && step !== 4) || saving}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
              style={{ backgroundColor: TEAL }}
            >
              {saving ? (
                <>
                  <svg className="animate-spin w-4 h-4″ fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25″ cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75″ fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Saving…
                </>
              ) : step === 4 ? (
                <>Save & Finish <ChevronRight className="w-4 h-4″ /></>
              ) : (
                <>Continue <ChevronRight className="w-4 h-4″ /></>
              )}
            </button>
          </div>
        )}

        {step === 4 && !saving && (
          <p className="text-center text-xs text-gray-400 mt-3″>
            Photo is optional —{" "}
            <button
              onClick={handleNext}
              className="font-semibold underline hover:no-underline"
              style={{ color: TEAL }}
            >
              skip for now
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
