import { useState, useEffect } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  Shield, Database, Eye, Brain, Phone, Save, Loader2,
  CheckCircle2, Info, Lock, ExternalLink, AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ConsentToggleProps {
  label: string;
  description: string;
  icon: React.ReactNode;
  value: boolean;
  onChange: (v: boolean) => void;
  badgeText?: string;
  badgeColor?: string;
}

function ConsentToggle({ label, description, icon, value, onChange, badgeText, badgeColor = "blue" }: ConsentToggleProps) {
  const bgActive: Record<string, string> = {
    blue: "bg-blue-600",
    teal: "bg-teal-600",
    purple: "bg-purple-600",
    amber: "bg-amber-500",
    green: "bg-green-600",
  };
  const borderActive: Record<string, string> = {
    blue: "border-blue-200 bg-blue-50/40",
    teal: "border-teal-200 bg-teal-50/40",
    purple: "border-purple-200 bg-purple-50/40",
    amber: "border-amber-200 bg-amber-50/40",
    green: "border-green-200 bg-green-50/40",
  };
  const badgeBg: Record<string, string> = {
    blue: "bg-blue-100 text-blue-700",
    teal: "bg-teal-100 text-teal-700",
    purple: "bg-purple-100 text-purple-700",
    amber: "bg-amber-100 text-amber-700",
    green: "bg-green-100 text-green-700",
  };
  return (
    <div className={`flex items-start justify-between gap-4 p-4 rounded-xl border transition-all ${value ? borderActive[badgeColor] : "border-gray-100 bg-white"}`}>
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${value ? bgActive[badgeColor] : "bg-gray-100"}`}>
          <span className={value ? "text-white" : "text-gray-400"}>{icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-semibold text-gray-800">{label}</p>
            {badgeText && (
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeBg[badgeColor]}`}>{badgeText}</span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">{description}</p>
        </div>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${value ? bgActive[badgeColor] : "bg-gray-200"}`}
        role="switch"
        aria-checked={value}
        title={value ? "Click to disable" : "Click to enable"}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${value ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
}

export default function HomeownerPrivacy() {
  const { user } = useAuth();
  const { data: profile, isLoading } = trpc.homeowner.getProfile.useQuery();
  const saveProfile = trpc.homeowner.saveProfile.useMutation({
    onSuccess: () => toast.success("Privacy preferences saved"),
    onError: () => toast.error("Failed to save preferences"),
  });

  const [consent, setConsent] = useState({
    consentPhotos: false,
    consentPartnerContact: false,
    consentAiData: false,
  });

  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (profile) {
      setConsent({
        consentPhotos: profile.consentPhotos ?? false,
        consentPartnerContact: profile.consentPartnerContact ?? false,
        consentAiData: profile.consentAiData ?? false,
      });
    }
  }, [profile]);

  const handleChange = (key: keyof typeof consent, value: boolean) => {
    setConsent(prev => ({ ...prev, [key]: value }));
    setDirty(true);
  };

  const handleSave = () => {
    saveProfile.mutate({
      consentPhotos: consent.consentPhotos,
      consentPartnerContact: consent.consentPartnerContact,
      consentAiData: consent.consentAiData,
    });
    setDirty(false);
  };

  const displayName = profile?.displayName ?? user?.name ?? "Homeowner";
  const activeCount = Object.values(consent).filter(Boolean).length;

  if (isLoading) {
    return (
      <HomeownerLayout homeownerName={displayName} homeownerAddress="">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      </HomeownerLayout>
    );
  }

  return (
    <HomeownerLayout homeownerName={displayName} homeownerAddress="">
      <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            Data & Privacy
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            You are always in control of how your home data is used. These settings take effect immediately.
          </p>
        </div>

        {/* Status Summary */}
        <div className={`rounded-xl border p-4 flex items-center gap-4 ${activeCount === 3 ? "bg-green-50 border-green-200" : activeCount === 0 ? "bg-gray-50 border-gray-200" : "bg-blue-50 border-blue-200"}`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${activeCount === 3 ? "bg-green-600" : activeCount === 0 ? "bg-gray-300" : "bg-blue-600"}`}>
            {activeCount === 0
              ? <Lock className="w-5 h-5 text-white" />
              : <CheckCircle2 className="w-5 h-5 text-white" />
            }
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">
              {activeCount === 0 && "All data sharing is currently off"}
              {activeCount === 1 && "1 of 3 data permissions enabled"}
              {activeCount === 2 && "2 of 3 data permissions enabled"}
              {activeCount === 3 && "All permissions enabled -- full AI experience active"}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {activeCount === 0
                ? "Your home data is fully private. Some AI features may be limited."
                : "You can change these settings at any time."}
            </p>
          </div>
        </div>

        {/* Consent Toggles */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 px-1">Your Consent Settings</h2>

          <ConsentToggle
            label="Photo Analysis for AI Insights"
            description="Photos taken by service pros at your property are analyzed by AI to identify maintenance needs, flag aging systems, and generate proactive alerts. Disabling this stops AI processing of your home photos."
            icon={<Eye className="w-5 h-5" />}
            value={consent.consentPhotos}
            onChange={v => handleChange("consentPhotos", v)}
            badgeText="Core Feature"
            badgeColor="blue"
          />

          <ConsentToggle
            label="Allow Trusted Pros to Contact Me"
            description="Vetted ProLnk partners may reach out with relevant offers based on your home profile. You will never receive cold calls -- only pros matched to your specific property needs by the AI engine."
            icon={<Phone className="w-5 h-5" />}
            value={consent.consentPartnerContact}
            onChange={v => handleChange("consentPartnerContact", v)}
            badgeText="Recommended"
            badgeColor="teal"
          />

          <ConsentToggle
            label="Contribute to Neighborhood AI Model"
            description="Your anonymized home data (no PII, no address, no photos) helps improve predictive maintenance models for your neighborhood. This makes AI recommendations more accurate for everyone in your area and helps the network detect storm damage, aging systems, and safety recalls faster."
            icon={<Brain className="w-5 h-5" />}
            value={consent.consentAiData}
            onChange={v => handleChange("consentAiData", v)}
            badgeText="Community Benefit"
            badgeColor="purple"
          />
        </div>

        {/* What We Never Do */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-3">
          <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Lock className="w-4 h-4 text-gray-400" /> What We Never Do
          </h2>
          <ul className="space-y-2">
            {[
              "Sell your personal data to third parties",
              "Share your name, address, or contact info without consent",
              "Use your photos for advertising or marketing",
              "Allow partners to access your data without a matched service need",
              "Store raw photos beyond the AI analysis window",
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-xs text-gray-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Info Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-amber-800">Disabling photo analysis limits AI features</p>
            <p className="text-xs text-amber-700 mt-0.5">
              If you turn off photo analysis, the AI cannot generate proactive maintenance alerts or predictive lead matching for your home.
              You can re-enable it at any time.
            </p>
          </div>
        </div>

        {/* Save + Legal */}
        <div className="flex items-center justify-between gap-4">
          <a href="/privacy" className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 underline">
            <ExternalLink className="w-3 h-3" />
            Full Privacy Policy
          </a>
          <Button
            onClick={handleSave}
            disabled={saveProfile.isPending || !dirty}
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {saveProfile.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Preferences
          </Button>
        </div>
      </div>
    </HomeownerLayout>
  );
}
