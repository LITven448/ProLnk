import { useState, useEffect } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { User, Phone, Bell, Save, Loader2, Home, ArrowRight, Shield, Database, Eye, Brain, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Link } from "wouter";

interface ConsentToggleProps {
  label: string;
  description: string;
  icon: React.ReactNode;
  value: boolean;
  onChange: (v: boolean) => void;
  color?: string;
}

function ConsentToggle({ label, description, icon, value, onChange, color = "blue" }: ConsentToggleProps) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-600",
    teal: "bg-teal-600",
    purple: "bg-purple-600",
    amber: "bg-amber-500",
  };
  return (
    <div className={`flex items-start justify-between gap-4 p-4 rounded-xl border transition-all ${value ? "border-blue-200 bg-blue-50/50" : "border-gray-100 bg-white"}`}>
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${value ? colorMap[color] : "bg-gray-100"}`}>
          <span className={value ? "text-white" : "text-gray-400"}>{icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800">{label}</p>
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{description}</p>
        </div>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${value ? colorMap[color] : "bg-gray-200"}`}
        role="switch"
        aria-checked={value}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${value ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
}

export default function HomeownerProfile() {
  const { user } = useAuth();
  const { data: profile, isLoading } = trpc.homeowner.getProfile.useQuery();
  const saveProfile = trpc.homeowner.saveProfile.useMutation({
    onSuccess: () => toast.success("Profile saved successfully"),
    onError: () => toast.error("Failed to save profile"),
  });

  const [form, setForm] = useState({
    displayName: "",
    phone: "",
    bio: "",
    contactPreference: "email" as "email" | "text" | "phone" | "in_app",
  });

  const [consent, setConsent] = useState({
    consentPhotos: false,
    consentPartnerContact: false,
    consentAiData: false,
  });

  useEffect(() => {
    if (profile) {
      setForm({
        displayName: profile.displayName ?? user?.name ?? "",
        phone: profile.phone ?? "",
        bio: profile.bio ?? "",
        contactPreference: (profile.contactPreference as any) ?? "email",
      });
      setConsent({
        consentPhotos: profile.consentPhotos ?? false,
        consentPartnerContact: profile.consentPartnerContact ?? false,
        consentAiData: profile.consentAiData ?? false,
      });
    }
  }, [profile, user]);

  const handleSave = () => {
    saveProfile.mutate({
      displayName: form.displayName || undefined,
      phone: form.phone || undefined,
      bio: form.bio || undefined,
      contactPreference: form.contactPreference,
      consentPhotos: consent.consentPhotos,
      consentPartnerContact: consent.consentPartnerContact,
      consentAiData: consent.consentAiData,
    });
  };

  const displayName = form.displayName || user?.name || "Homeowner";

  if (isLoading) {
    return (
      <HomeownerLayout homeownerName={displayName} homeownerAddress="">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      </HomeownerLayout>
    );
  }

  const activeConsents = Object.values(consent).filter(Boolean).length;

  return (
    <HomeownerLayout homeownerName={displayName} homeownerAddress="">
      <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <User className="w-6 h-6 text-blue-600" />
            My Profile
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage your contact details, communication preferences, and data privacy settings</p>
        </div>

        {/* Account Info (read-only from OAuth) */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" /> Account Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Login Name</label>
              <div className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-600">
                {user?.name ?? "--"}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
              <div className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-600">
                {user?.email ?? "--"}
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400">Login details are managed through your TrustyPro account.</p>
        </div>

        {/* Editable Profile */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" /> Your Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-500 mb-1">Display Name</label>
              <Input
                placeholder="How should pros address you?"
                value={form.displayName}
                onChange={e => setForm({ ...form, displayName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Phone Number</label>
              <Input
                placeholder="(214) 555-0100"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Preferred Contact Method</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.contactPreference}
                onChange={e => setForm({ ...form, contactPreference: e.target.value as any })}
              >
                <option value="email">Email</option>
                <option value="text">Text / SMS</option>
                <option value="phone">Phone Call</option>
                <option value="in_app">In-App Only</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-500 mb-1">Notes for Pros (optional)</label>
              <Textarea
                rows={3}
                placeholder="e.g., Gate code is 1234, dog in backyard, prefer morning appointments..."
                value={form.bio}
                onChange={e => setForm({ ...form, bio: e.target.value })}
                className="resize-none"
              />
            </div>
          </div>
        </div>

        {/* Property Details -- link to My Properties */}
        <div className="bg-blue-50 rounded-xl border border-blue-100 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Home className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Property Details</p>
              <p className="text-xs text-gray-500 mt-0.5">Manage your properties, improvements, and project wishes</p>
            </div>
          </div>
          <Link href="/my-home/property">
            <Button variant="outline" size="sm" className="gap-1.5 text-blue-600 border-blue-200 hover:bg-blue-50">
              View Properties <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* -- Data & Privacy ------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Shield className="w-4 h-4 text-gray-400" /> Data & Privacy
            </h2>
            {activeConsents > 0 && (
              <span className="flex items-center gap-1 text-xs font-medium text-teal-700 bg-teal-50 border border-teal-200 rounded-full px-2.5 py-0.5">
                <CheckCircle2 className="w-3 h-3" />
                {activeConsents} active
              </span>
            )}
          </div>

          <p className="text-xs text-gray-500 leading-relaxed">
            You are always in control. These settings determine how your home data and photos are used within the ProLnk network.
            You can change these at any time and your preferences take effect immediately.
          </p>

          <div className="space-y-3">
            <ConsentToggle
              label="Allow Photo Analysis for AI Insights"
              description="Photos uploaded by service pros at your property are analyzed by AI to identify maintenance needs and generate proactive alerts. Disabling this stops AI processing of your home photos."
              icon={<Eye className="w-4 h-4" />}
              value={consent.consentPhotos}
              onChange={v => setConsent({ ...consent, consentPhotos: v })}
              color="blue"
            />

            <ConsentToggle
              label="Allow Trusted Pros to Contact Me"
              description="Vetted ProLnk partners may reach out with relevant offers based on your home profile. You will never receive cold calls -- only pros matched to your specific property needs."
              icon={<Phone className="w-4 h-4" />}
              value={consent.consentPartnerContact}
              onChange={v => setConsent({ ...consent, consentPartnerContact: v })}
              color="teal"
            />

            <ConsentToggle
              label="Contribute to Neighborhood AI Model"
              description="Your anonymized home data (no PII, no address) helps improve predictive maintenance models for your neighborhood. This makes AI recommendations more accurate for everyone in your area."
              icon={<Brain className="w-4 h-4" />}
              value={consent.consentAiData}
              onChange={v => setConsent({ ...consent, consentAiData: v })}
              color="purple"
            />
          </div>

          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-400 flex items-start gap-1.5">
              <Database className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
              Your data is never sold to third parties. ProLnk uses aggregated, anonymized insights only within the vetted partner network.
              Read our <a href="/privacy" className="underline hover:text-gray-600">Privacy Policy</a> for full details.
            </p>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Bell className="w-4 h-4 text-gray-400" /> Notification Preferences
          </h2>
          <p className="text-xs text-gray-400">Notification settings are managed through your account preferences. Your preferred contact method above determines how pros reach you.</p>
        </div>

        {/* Save */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            disabled={saveProfile.isPending}
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {saveProfile.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Profile
          </Button>
        </div>
      </div>
    </HomeownerLayout>
  );
}
