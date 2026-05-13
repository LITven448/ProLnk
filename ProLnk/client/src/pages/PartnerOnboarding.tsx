import { useState } from "react";
import { useLocation } from "wouter";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Shield,
  Wrench,
  FileText,
  Rocket,
  AlertCircle,
} from "lucide-react";
import { trpc } from "@/lib/trpc";

const STEP_LABELS = ["Basic Info", "License & Insurance", "Services", "Review & Submit"];

const TRADE_OPTIONS = [
  "Plumbing",
  "Electrical",
  "HVAC",
  "Roofing",
  "General Contractor",
  "Landscaping",
  "Pest Control",
  "Painting",
  "Flooring",
  "Remodeling",
  "Appliance Repair",
  "Pool & Spa",
  "Other",
];

const SERVICE_CAPABILITIES = [
  "Residential Repairs",
  "Emergency / Same-Day",
  "New Construction",
  "Remodeling & Renovation",
  "Inspections",
  "Maintenance Plans",
  "Commercial Work",
  "Green / Energy Efficient",
  "Historic Restoration",
  "Custom Fabrication",
  "Smart Home / IoT",
  "Accessibility Upgrades",
];

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY",
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  trade: string;
  yearsExperience: string;
  serviceZip: string;
  primaryCity: string;
  primaryState: string;
  licenseFile: File | null;
  insuranceFile: File | null;
  licenseNumber: string;
  services: string[];
  referredBy: string;
}

const EMPTY_FORM: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  trade: "",
  yearsExperience: "",
  serviceZip: "",
  primaryCity: "",
  primaryState: "",
  licenseFile: null,
  insuranceFile: null,
  licenseNumber: "",
  services: [],
  referredBy: "",
};

function ProgressBar({ step }: { step: number }) {
  const stepIcons = [MapPin, Shield, Wrench, FileText];
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-3">
        {STEP_LABELS.map((label, i) => {
          const Icon = stepIcons[i];
          const done = i < step;
          const active = i === step;
          return (
            <div key={label} className="flex flex-col items-center gap-1.5" style={{ flex: 1 }}>
              <div
                className="w-9 h-9 rounded-2xl flex items-center justify-center transition-all duration-300"
                style={{
                  background: done || active ? "#F5E642" : "rgba(255,255,255,0.06)",
                  border: active ? "2px solid #F5E64260" : "2px solid transparent",
                }}
              >
                {done ? (
                  <Check size={15} style={{ color: "#0A1628" }} />
                ) : (
                  <Icon size={15} style={{ color: done || active ? "#0A1628" : "#4b5563" }} />
                )}
              </div>
              <span
                className="text-xs font-medium hidden sm:block text-center leading-tight"
                style={{ color: done || active ? "#F5E642" : "#4b5563", maxWidth: 64 }}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="relative h-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
        <div
          className="absolute h-full rounded-full transition-all duration-500"
          style={{ width: `${(step / (STEP_LABELS.length - 1)) * 100}%`, background: "#F5E642" }}
        />
      </div>
      <p className="text-xs mt-2 text-right" style={{ color: "#4b5563" }}>
        Step {step + 1} of {STEP_LABELS.length}
      </p>
    </div>
  );
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#9ca3af" }}>
      {children} {required && <span style={{ color: "#F5E642" }}>*</span>}
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
      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(245,230,66,0.4)")}
      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
    />
  );
}

function Step1BasicInfo({
  form,
  setForm,
}: {
  form: FormData;
  setForm: (f: FormData) => void;
}) {
  const set = (k: keyof FormData) => (v: string) => setForm({ ...form, [k]: v });

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: "rgba(245,230,66,0.12)" }}>
          <MapPin size={18} style={{ color: "#F5E642" }} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Tell us about your business</h2>
          <p className="text-xs" style={{ color: "#6b7280" }}>Basic info to match you with homeowners</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <FieldLabel required>First Name</FieldLabel>
          <Input value={form.firstName} onChange={set("firstName")} placeholder="James" />
        </div>
        <div>
          <FieldLabel required>Last Name</FieldLabel>
          <Input value={form.lastName} onChange={set("lastName")} placeholder="Wilson" />
        </div>
      </div>

      <div>
        <FieldLabel required>Email</FieldLabel>
        <Input value={form.email} onChange={set("email")} placeholder="james@wilsonplumbing.com" type="email" />
      </div>

      <div>
        <FieldLabel required>Phone</FieldLabel>
        <Input value={form.phone} onChange={set("phone")} placeholder="(214) 555-0100" type="tel" />
      </div>

      <div>
        <FieldLabel required>Primary Trade</FieldLabel>
        <select
          value={form.trade}
          onChange={(e) => set("trade")(e.target.value)}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none appearance-none transition-all"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: form.trade ? "#fff" : "#4b5563",
          }}
        >
          <option value="" disabled style={{ background: "#0A1628" }}>Select your trade</option>
          {TRADE_OPTIONS.map((t) => (
            <option key={t} value={t} style={{ background: "#0A1628" }}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <FieldLabel>Years in Business</FieldLabel>
        <select
          value={form.yearsExperience}
          onChange={(e) => set("yearsExperience")(e.target.value)}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none appearance-none transition-all"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: form.yearsExperience ? "#fff" : "#4b5563",
          }}
        >
          <option value="" disabled style={{ background: "#0A1628" }}>Select years</option>
          {["Less than 1 year", "1-2 years", "3-5 years", "6-10 years", "11-20 years", "20+ years"].map((v) => (
            <option key={v} value={v} style={{ background: "#0A1628" }}>{v}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <FieldLabel required>City</FieldLabel>
          <Input value={form.primaryCity} onChange={set("primaryCity")} placeholder="Dallas" />
        </div>
        <div>
          <FieldLabel required>State</FieldLabel>
          <select
            value={form.primaryState}
            onChange={(e) => set("primaryState")(e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none appearance-none"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: form.primaryState ? "#fff" : "#4b5563",
            }}
          >
            <option value="" disabled style={{ background: "#0A1628" }}>ST</option>
            {US_STATES.map((s) => (
              <option key={s} value={s} style={{ background: "#0A1628" }}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <FieldLabel required>Service Area ZIP Code</FieldLabel>
        <Input value={form.serviceZip} onChange={set("serviceZip")} placeholder="75201" />
        <p className="text-xs mt-1" style={{ color: "#4b5563" }}>Your primary service area zip</p>
      </div>

      <div>
        <FieldLabel>Referred by (optional)</FieldLabel>
        <Input value={form.referredBy} onChange={set("referredBy")} placeholder="Referral code" />
      </div>
    </div>
  );
}

function FileUploadRow({
  label,
  hint,
  file,
  onFile,
}: {
  label: string;
  hint: string;
  file: File | null;
  onFile: (f: File | null) => void;
}) {
  return (
    <div
      className="flex items-center gap-4 p-4 rounded-xl"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>{hint}</p>
        {file && (
          <p className="text-xs mt-1 truncate" style={{ color: "#22c55e" }}>{file.name}</p>
        )}
      </div>
      <label
        className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all hover:opacity-80"
        style={{
          background: file ? "rgba(34,197,94,0.15)" : "rgba(245,230,66,0.12)",
          color: file ? "#22c55e" : "#F5E642",
          border: `1px solid ${file ? "rgba(34,197,94,0.3)" : "rgba(245,230,66,0.25)"}`,
        }}
      >
        {file ? <><Check size={11} className="inline mr-1" />Uploaded</> : "Choose File"}
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
        />
      </label>
    </div>
  );
}

function Step2LicenseInsurance({ form, setForm }: { form: FormData; setForm: (f: FormData) => void }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: "rgba(59,130,246,0.12)" }}>
          <Shield size={18} style={{ color: "#3b82f6" }} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">License & Insurance</h2>
          <p className="text-xs" style={{ color: "#6b7280" }}>Verified pros win 2x more jobs</p>
        </div>
      </div>

      <div
        className="flex items-start gap-2 p-3 rounded-xl"
        style={{ background: "rgba(245,230,66,0.06)", border: "1px solid rgba(245,230,66,0.15)" }}
      >
        <AlertCircle size={13} className="flex-shrink-0 mt-0.5" style={{ color: "#F5E642" }} />
        <p className="text-xs" style={{ color: "#d1d5db" }}>
          Upload a PDF or photo. Files are stored securely and only reviewed by ProLnk compliance staff.
          You can skip and upload later from your dashboard.
        </p>
      </div>

      <div>
        <FieldLabel>License Number</FieldLabel>
        <input
          type="text"
          value={form.licenseNumber}
          onChange={(e) => setForm({ ...form, licenseNumber: e.target.value })}
          placeholder="e.g. TX-PLM-12345"
          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
        />
      </div>

      <FileUploadRow
        label="Contractor License"
        hint="State license, municipal license, or master trade certificate"
        file={form.licenseFile}
        onFile={(f) => setForm({ ...form, licenseFile: f })}
      />

      <FileUploadRow
        label="Certificate of Insurance"
        hint="General liability, minimum $500K coverage"
        file={form.insuranceFile}
        onFile={(f) => setForm({ ...form, insuranceFile: f })}
      />

      <div
        className="p-4 rounded-xl grid grid-cols-3 gap-3"
        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        {[
          { emoji: "🛡️", label: "Verified Badge", desc: "Shown on your profile" },
          { emoji: "📈", label: "Priority Matching", desc: "First to see new leads" },
          { emoji: "💰", label: "Higher Pay Rate", desc: "Up to 35% commission" },
        ].map(({ emoji, label, desc }) => (
          <div key={label} className="text-center">
            <p className="text-xl mb-1">{emoji}</p>
            <p className="text-xs font-bold text-white">{label}</p>
            <p className="text-xs" style={{ color: "#6b7280" }}>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Step3Services({ form, setForm }: { form: FormData; setForm: (f: FormData) => void }) {
  const toggle = (s: string) => {
    const next = form.services.includes(s)
      ? form.services.filter((x) => x !== s)
      : [...form.services, s];
    setForm({ ...form, services: next });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: "rgba(139,92,246,0.12)" }}>
          <Wrench size={18} style={{ color: "#8b5cf6" }} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Service Capabilities</h2>
          <p className="text-xs" style={{ color: "#6b7280" }}>Select all that apply — more = more leads</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {SERVICE_CAPABILITIES.map((s) => {
          const selected = form.services.includes(s);
          return (
            <button
              key={s}
              type="button"
              onClick={() => toggle(s)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-sm transition-all"
              style={{
                background: selected ? "rgba(245,230,66,0.12)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${selected ? "rgba(245,230,66,0.35)" : "rgba(255,255,255,0.08)"}`,
                color: selected ? "#F5E642" : "#9ca3af",
              }}
            >
              <div
                className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center"
                style={{
                  background: selected ? "#F5E642" : "transparent",
                  border: `1.5px solid ${selected ? "#F5E642" : "rgba(255,255,255,0.2)"}`,
                }}
              >
                {selected && <Check size={10} style={{ color: "#0A1628" }} />}
              </div>
              <span className="text-xs font-medium leading-tight">{s}</span>
            </button>
          );
        })}
      </div>

      {form.services.length > 0 && (
        <p className="text-xs text-center" style={{ color: "#6b7280" }}>
          {form.services.length} service{form.services.length !== 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <span className="text-xs" style={{ color: "#6b7280" }}>{label}</span>
      <span className="text-xs font-semibold text-white text-right">{value}</span>
    </div>
  );
}

function Step4Review({
  form,
  onSubmit,
  isSubmitting,
  error,
}: {
  form: FormData;
  onSubmit: () => void;
  isSubmitting: boolean;
  error: string | null;
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: "rgba(245,230,66,0.12)" }}>
          <FileText size={18} style={{ color: "#F5E642" }} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Review & Submit</h2>
          <p className="text-xs" style={{ color: "#6b7280" }}>Confirm your details before joining the waitlist</p>
        </div>
      </div>

      <div
        className="rounded-2xl p-5"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#6b7280" }}>
          Basic Info
        </p>
        <SummaryRow label="Name" value={`${form.firstName} ${form.lastName}`} />
        <SummaryRow label="Email" value={form.email} />
        <SummaryRow label="Phone" value={form.phone} />
        <SummaryRow label="Trade" value={form.trade} />
        <SummaryRow label="Experience" value={form.yearsExperience || "—"} />
        <SummaryRow label="Location" value={`${form.primaryCity}, ${form.primaryState} ${form.serviceZip}`} />
        {form.referredBy && <SummaryRow label="Referral Code" value={form.referredBy.toUpperCase()} />}
      </div>

      <div
        className="rounded-2xl p-5"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#6b7280" }}>
          License & Insurance
        </p>
        <SummaryRow label="License #" value={form.licenseNumber || "Not provided"} />
        <SummaryRow label="License File" value={form.licenseFile?.name ?? "Not uploaded"} />
        <SummaryRow label="Insurance File" value={form.insuranceFile?.name ?? "Not uploaded"} />
      </div>

      <div
        className="rounded-2xl p-5"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#6b7280" }}>
          Services ({form.services.length})
        </p>
        {form.services.length === 0 ? (
          <p className="text-xs" style={{ color: "#6b7280" }}>None selected</p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {form.services.map((s) => (
              <span
                key={s}
                className="text-xs px-2.5 py-1 rounded-full"
                style={{ background: "rgba(245,230,66,0.1)", color: "#F5E642", border: "1px solid rgba(245,230,66,0.2)" }}
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div
          className="flex items-start gap-2 p-3 rounded-xl"
          style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
        >
          <AlertCircle size={13} className="flex-shrink-0 mt-0.5" style={{ color: "#ef4444" }} />
          <p className="text-xs" style={{ color: "#fca5a5" }}>{error}</p>
        </div>
      )}

      <button
        onClick={onSubmit}
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold transition-all"
        style={{
          background: isSubmitting ? "rgba(245,230,66,0.4)" : "#F5E642",
          color: "#0A1628",
          cursor: isSubmitting ? "not-allowed" : "pointer",
        }}
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-[#0A1628] border-t-transparent rounded-full animate-spin" />
            Joining waitlist...
          </>
        ) : (
          <>
            <Rocket size={16} /> Join the ProLnk Waitlist
          </>
        )}
      </button>

      <p className="text-xs text-center" style={{ color: "#4b5563" }}>
        By joining you agree to our Terms of Service and Privacy Policy.
        No credit card required.
      </p>
    </div>
  );
}

function SuccessScreen({ name }: { name: string }) {
  const [, navigate] = useLocation();
  return (
    <div className="text-center py-8">
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
        style={{ background: "rgba(34,197,94,0.15)", border: "2px solid rgba(34,197,94,0.3)" }}
      >
        <Check size={36} style={{ color: "#22c55e" }} />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">You're on the list, {name}!</h2>
      <p className="text-sm mb-8 max-w-xs mx-auto" style={{ color: "#6b7280" }}>
        We'll email you as soon as your market opens. In the meantime, refer other pros to lock in a
        higher tier and earn subscription overrides from day one.
      </p>
      <div className="grid grid-cols-3 gap-3 mb-8 text-center">
        {[
          { emoji: "📧", label: "Confirmation sent", desc: "Check your inbox" },
          { emoji: "🎯", label: "Tier assigned", desc: "Based on position" },
          { emoji: "🔗", label: "Referral link ready", desc: "Share & earn" },
        ].map(({ emoji, label, desc }) => (
          <div
            key={label}
            className="rounded-xl p-3"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <p className="text-xl mb-1">{emoji}</p>
            <p className="text-xs font-bold text-white">{label}</p>
            <p className="text-xs" style={{ color: "#6b7280" }}>{desc}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate("/dashboard/partner-home")}
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
        style={{ background: "#F5E642", color: "#0A1628" }}
      >
        Go to Dashboard <ChevronRight size={16} />
      </button>
    </div>
  );
}

function isStep1Valid(form: FormData) {
  return (
    form.firstName.trim().length > 0 &&
    form.lastName.trim().length > 0 &&
    form.email.includes("@") &&
    form.phone.trim().length >= 7 &&
    form.trade.length > 0 &&
    form.primaryCity.trim().length > 0 &&
    form.primaryState.length === 2 &&
    /^\d{5}(-\d{4})?$/.test(form.serviceZip)
  );
}

export default function PartnerOnboarding() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const joinMutation = trpc.waitlist.joinProWaitlist.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: (e) => setError(e.message),
  });

  const handleSubmit = () => {
    setError(null);
    joinMutation.mutate({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      trade: form.trade,
      primaryCity: form.primaryCity.trim(),
      primaryState: form.primaryState,
      referredBy: form.referredBy.trim() || undefined,
    });
  };

  const canAdvance =
    step === 0 ? isStep1Valid(form) :
    step === 1 ? true :
    step === 2 ? true :
    false;

  return (
    <div
      className="min-h-screen flex items-start justify-center pt-8 pb-16 px-4"
      style={{ background: "#0A1628" }}
    >
      <div
        className="w-full max-w-lg rounded-3xl p-6 sm:p-8"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <span className="text-lg font-black tracking-tight" style={{ color: "#F5E642" }}>ProLnk</span>
          <span className="text-xs" style={{ color: "#4b5563" }}>Partner Signup</span>
        </div>

        {submitted ? (
          <SuccessScreen name={form.firstName} />
        ) : (
          <>
            <ProgressBar step={step} />

            {step === 0 && <Step1BasicInfo form={form} setForm={setForm} />}
            {step === 1 && <Step2LicenseInsurance form={form} setForm={setForm} />}
            {step === 2 && <Step3Services form={form} setForm={setForm} />}
            {step === 3 && (
              <Step4Review
                form={form}
                onSubmit={handleSubmit}
                isSubmitting={joinMutation.isPending}
                error={error}
              />
            )}

            {step < 3 && (
              <div className="flex items-center gap-3 mt-8">
                {step > 0 && (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="flex items-center gap-1.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      color: "#9ca3af",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <ChevronLeft size={15} /> Back
                  </button>
                )}
                <button
                  onClick={() => {
                    if (canAdvance) setStep((s) => s + 1);
                  }}
                  disabled={!canAdvance}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
                  style={{
                    background: canAdvance ? "#F5E642" : "rgba(255,255,255,0.06)",
                    color: canAdvance ? "#0A1628" : "#4b5563",
                    cursor: canAdvance ? "pointer" : "not-allowed",
                  }}
                >
                  Continue <ChevronRight size={15} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
