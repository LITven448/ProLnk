import React from 'react';
import { useState, useEffect } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  User, Phone, Bell, Save, Loader2, Home, ArrowRight, Shield,
  Database, Eye, Brain, CheckCircle, Plus, Trash2, Mail,
  MessageSquare, Smartphone, CreditCard, Star, Wrench, Droplets,
  Wind, Zap, Paintbrush, Leaf, Settings, ChevronDown,
} from "lucide-react";
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

function ConsentToggle({ label, description, icon, value, onChange, color = "teal" }: ConsentToggleProps) {
  const colorMap: Record<string, string> = {
    teal: "bg-teal-500",
    purple: "bg-purple-500",
    blue: "bg-blue-500",
    amber: "bg-amber-500",
  };
  const ringMap: Record<string, string> = {
    teal: "border-teal-400/30 bg-teal-400/10",
    purple: "border-purple-400/30 bg-purple-400/10",
    blue: "border-blue-400/30 bg-blue-400/10",
    amber: "border-amber-400/30 bg-amber-400/10",
  };
  return (
    <div className={`flex items-start justify-between gap-4 p-4 rounded-xl border transition-all ${value ? ringMap[color] : "border-white/10 bg-white/5"}`}>
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${value ? colorMap[color] : "bg-white/10"}`}>
          <span className={value ? "text-white" : "text-gray-400"}>{icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white">{label}</p>
          <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{description}</p>
        </div>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${value ? colorMap[color] : "bg-white/20"}`}
        role="switch"
        aria-checked={value}
      >
        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${value ? "translate-x-5" : "translate-x-0"}`} />
      </button>
    </div>
  );
}

interface HomeEntry {
  id: string;
  address: string;
  yearBuilt: string;
  sqft: string;
  bedrooms: string;
  bathrooms: string;
  isPrimary: boolean;
}

const TRADE_OPTIONS = [
  { key: "plumbing",    label: "Plumbing",    icon: Droplets },
  { key: "electrical",  label: "Electrical",  icon: Zap },
  { key: "hvac",        label: "HVAC / AC",   icon: Wind },
  { key: "painting",    label: "Painting",    icon: Paintbrush },
  { key: "landscaping", label: "Landscaping", icon: Leaf },
  { key: "roofing",     label: "Roofing",     icon: Home },
  { key: "general",     label: "General",     icon: Wrench },
];

const CONTACT_METHODS = [
  { key: "email",  label: "Email",       icon: Mail },
  { key: "text",   label: "Text / SMS",  icon: MessageSquare },
  { key: "phone",  label: "Phone Call",  icon: Phone },
  { key: "in_app", label: "In-App Only", icon: Smartphone },
];

const NOTIF_OPTIONS = [
  { key: "jobUpdates",       label: "Job status updates",          desc: "When a pro accepts, starts, or completes your job" },
  { key: "proOffers",        label: "New pro match offers",        desc: "When a vetted pro is matched to your project" },
  { key: "maintenanceAlerts",label: "Maintenance reminders",       desc: "Seasonal checklists and AI-detected alerts" },
  { key: "paymentReceipts",  label: "Payment receipts",            desc: "Confirmation when charges or refunds are processed" },
  { key: "promotions",       label: "Deals & promotions",          desc: "Exclusive offers from ProLnk partner pros" },
];

function HomeCard({
  home,
  onUpdate,
  onRemove,
}: {
  home: HomeEntry;
  onUpdate: (h: HomeEntry) => void;
  onRemove: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const initials = home.address ? home.address.slice(0, 2).toUpperCase() : "HM";

  return (
    <div className="border border-white/10 rounded-xl bg-white/5 overflow-hidden">
      <button
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/5 transition-colors"
        onClick={() => setExpanded(v => !v)}
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center flex-shrink-0">
          <Home className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-white truncate">{home.address || "New Home"}</p>
            {home.isPrimary && (
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/30 flex-shrink-0">Primary</span>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            {[home.yearBuilt && `Built ${home.yearBuilt}`, home.sqft && `${home.sqft} sqft`, home.bedrooms && `${home.bedrooms}bd`, home.bathrooms && `${home.bathrooms}ba`].filter(Boolean).join(" · ") || "Add details below"}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {!home.isPrimary && (
            <button
              onClick={e => { e.stopPropagation(); onRemove(home.id); }}
              className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </div>
      </button>
      {expanded && (
        <div className="px-4 pb-4 border-t border-white/10 pt-3 grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-400 mb-1">Street Address</label>
            <Input
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-teal-400"
              placeholder="123 Main St, Dallas TX 75001"
              value={home.address}
              onChange={e => onUpdate({ ...home, address: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Year Built</label>
            <Input
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-teal-400"
              placeholder="1998"
              value={home.yearBuilt}
              onChange={e => onUpdate({ ...home, yearBuilt: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Square Footage</label>
            <Input
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-teal-400"
              placeholder="2,400"
              value={home.sqft}
              onChange={e => onUpdate({ ...home, sqft: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Bedrooms</label>
            <Input
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-teal-400"
              placeholder="4"
              value={home.bedrooms}
              onChange={e => onUpdate({ ...home, bedrooms: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Bathrooms</label>
            <Input
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-teal-400"
              placeholder="2.5"
              value={home.bathrooms}
              onChange={e => onUpdate({ ...home, bathrooms: e.target.value })}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function HomeownerProfile() {
  const { user } = useAuth();
  const { data: profile, isLoading } = trpc.homeowner.getProfile.useQuery();
  const saveProfile = trpc.homeowner.saveProfile.useMutation({
    onSuccess: () => toast.success("Profile saved"),
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

  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    jobUpdates: true,
    proOffers: true,
    maintenanceAlerts: true,
    paymentReceipts: true,
    promotions: false,
  });

  const [tradePrefs, setTradePrefs] = useState<string[]>([]);

  const [homes, setHomes] = useState<HomeEntry[]>([
    { id: "primary", address: "", yearBuilt: "", sqft: "", bedrooms: "", bathrooms: "", isPrimary: true },
  ]);

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
      if ((profile as any).address) {
        setHomes([{
          id: "primary",
          address: (profile as any).address ?? "",
          yearBuilt: "",
          sqft: (profile as any).sqft?.toString() ?? "",
          bedrooms: (profile as any).bedrooms?.toString() ?? "",
          bathrooms: (profile as any).bathrooms?.toString() ?? "",
          isPrimary: true,
        }]);
      }
    }
  }, [profile, user]);

  const addHome = () => {
    if (homes.length >= 3) { toast.error("Maximum 3 homes allowed"); return; }
    setHomes(prev => [...prev, {
      id: `home-${Date.now()}`,
      address: "", yearBuilt: "", sqft: "", bedrooms: "", bathrooms: "", isPrimary: false,
    }]);
  };

  const removeHome = (id: string) => setHomes(prev => prev.filter(h => h.id !== id));
  const updateHome = (updated: HomeEntry) => setHomes(prev => prev.map(h => h.id === updated.id ? updated : h));

  const toggleTrade = (key: string) =>
    setTradePrefs(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);

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
  const initials = displayName.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const activeConsents = Object.values(consent).filter(Boolean).length;

  if (isLoading) {
    return (
      <HomeownerLayout homeownerName={displayName} homeownerAddress="">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-6 h-6 animate-spin text-teal-400" />
        </div>
      </HomeownerLayout>
    );
  }

  return (
    <HomeownerLayout homeownerName={displayName} homeownerAddress="">
      <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6">

        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <User className="w-6 h-6 text-teal-400" />
            My Profile
          </h1>
          <p className="text-gray-400 text-sm mt-1">Manage your contact details, homes, and preferences</p>
        </div>

        {/* Avatar + account info */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-xl font-bold text-white">{initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg font-bold text-white">{displayName}</p>
              <p className="text-sm text-gray-400">{user?.email ?? "--"}</p>
              <p className="text-xs text-gray-500 mt-1">Login details managed through TrustyPro account</p>
            </div>
          </div>
        </div>

        {/* Editable details */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
            <Settings className="w-4 h-4 text-gray-500" /> Your Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-400 mb-1">Display Name</label>
              <Input
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-teal-400"
                placeholder="How should pros address you?"
                value={form.displayName}
                onChange={e => setForm({ ...form, displayName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Phone Number</label>
              <Input
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-teal-400"
                placeholder="(214) 555-0100"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Preferred Contact</label>
              <div className="grid grid-cols-2 gap-1.5">
                {CONTACT_METHODS.map(m => (
                  <button
                    key={m.key}
                    onClick={() => setForm({ ...form, contactPreference: m.key as any })}
                    className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-medium border transition-all ${form.contactPreference === m.key ? "bg-teal-500/20 border-teal-500/50 text-teal-300" : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"}`}
                  >
                    <m.icon className="w-3.5 h-3.5" /> {m.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-400 mb-1">Notes for Pros</label>
              <Textarea
                rows={2}
                placeholder="e.g., Gate code is 1234, dog in backyard, prefer morning appointments..."
                value={form.bio}
                onChange={e => setForm({ ...form, bio: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-teal-400 resize-none"
              />
            </div>
          </div>
        </div>

        {/* My Homes */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
              <Home className="w-4 h-4 text-teal-400" /> My Homes
              <span className="text-xs text-gray-500 font-normal">({homes.length}/3)</span>
            </h2>
            {homes.length < 3 && (
              <button
                onClick={addHome}
                className="flex items-center gap-1.5 text-xs font-medium text-teal-400 hover:text-teal-300 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Home
              </button>
            )}
          </div>
          <div className="space-y-3">
            {homes.map(h => (
              <HomeCard key={h.id} home={h} onUpdate={updateHome} onRemove={removeHome} />
            ))}
          </div>
          <Link href="/my-home/property">
            <div className="flex items-center justify-between p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 cursor-pointer hover:bg-teal-500/20 transition-colors">
              <p className="text-xs font-medium text-teal-300">Manage full property details, improvements & wish list</p>
              <ArrowRight className="w-4 h-4 text-teal-400 flex-shrink-0" />
            </div>
          </Link>
        </div>

        {/* Service preferences */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400" /> Preferred Trade Providers
          </h2>
          <p className="text-xs text-gray-500">Select trade types you'd like to see pro recommendations for.</p>
          <div className="flex flex-wrap gap-2">
            {TRADE_OPTIONS.map(t => (
              <button
                key={t.key}
                onClick={() => toggleTrade(t.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${tradePrefs.includes(t.key) ? "bg-purple-500/20 border-purple-500/50 text-purple-300" : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"}`}
              >
                <t.icon className="w-3 h-3" /> {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notification preferences */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
            <Bell className="w-4 h-4 text-gray-400" /> Notification Preferences
          </h2>
          <div className="space-y-2">
            {NOTIF_OPTIONS.map(opt => (
              <div key={opt.key} className="flex items-center justify-between gap-4 py-2 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-sm text-white font-medium">{opt.label}</p>
                  <p className="text-xs text-gray-500">{opt.desc}</p>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, [opt.key]: !prev[opt.key] }))}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${notifications[opt.key] ? "bg-teal-500" : "bg-white/20"}`}
                  role="switch"
                  aria-checked={notifications[opt.key]}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${notifications[opt.key] ? "translate-x-4" : "translate-x-0"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Payment methods */}
        <div className="border border-white/10 rounded-xl p-5 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Payment Methods</p>
              <p className="text-xs text-gray-400 mt-0.5">Manage cards and billing preferences securely</p>
            </div>
          </div>
          <Link href="/my-home/payment">
            <Button variant="outline" size="sm" className="gap-1.5 text-purple-400 border-purple-400/30 hover:bg-purple-400/10 flex-shrink-0">
              Manage <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Data & Privacy */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
              <Shield className="w-4 h-4 text-gray-400" /> Data & Privacy
            </h2>
            {activeConsents > 0 && (
              <span className="flex items-center gap-1 text-xs font-medium text-teal-400 bg-teal-500/10 border border-teal-500/20 rounded-full px-2.5 py-0.5">
                <CheckCircle className="w-3 h-3" /> {activeConsents} active
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            You are always in control. These settings determine how your home data is used within the ProLnk network.
          </p>
          <div className="space-y-3">
            <ConsentToggle
              label="Allow Photo Analysis for AI Insights"
              description="Photos uploaded by service pros at your property are analyzed by AI to identify maintenance needs and generate proactive alerts."
              icon={<Eye className="w-4 h-4" />}
              value={consent.consentPhotos}
              onChange={v => setConsent({ ...consent, consentPhotos: v })}
              color="teal"
            />
            <ConsentToggle
              label="Allow Trusted Pros to Contact Me"
              description="Vetted ProLnk partners may reach out with relevant offers based on your home profile. Only pros matched to your specific property needs."
              icon={<Phone className="w-4 h-4" />}
              value={consent.consentPartnerContact}
              onChange={v => setConsent({ ...consent, consentPartnerContact: v })}
              color="blue"
            />
            <ConsentToggle
              label="Contribute to Neighborhood AI Model"
              description="Your anonymized home data (no PII, no address) helps improve predictive maintenance models for your neighborhood."
              icon={<Brain className="w-4 h-4" />}
              value={consent.consentAiData}
              onChange={v => setConsent({ ...consent, consentAiData: v })}
              color="purple"
            />
          </div>
          <div className="pt-2 border-t border-white/5">
            <p className="text-xs text-gray-500 flex items-start gap-1.5">
              <Database className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
              Your data is never sold to third parties.{" "}
              <a href="/privacy" className="underline hover:text-gray-400">Privacy Policy</a>
            </p>
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end pb-6">
          <Button
            onClick={handleSave}
            disabled={saveProfile.isPending}
            className="gap-2 bg-teal-500 hover:bg-teal-400 text-white px-8"
          >
            {saveProfile.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Profile
          </Button>
        </div>
      </div>
    </HomeownerLayout>
  );
}
