/**
 * W25 — Partner Settings Page
 * Unified settings hub: account info, notification preferences, payout setup, integrations.
 * Route: /dashboard/settings
 */
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import PartnerLayout from "@/components/PartnerLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  User, Bell, CreditCard, Link2, Shield, ChevronRight,
  Check, Save, Loader2, ExternalLink, Eye, EyeOff,
  Smartphone, Mail, MessageSquare, Zap, Lock,
} from "lucide-react";

type Tab = "account" | "notifications" | "payout" | "integrations" | "security";

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "account",       label: "Account",       icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "payout",        label: "Payout",        icon: CreditCard },
  { id: "integrations",  label: "Integrations",  icon: Link2 },
  { id: "security",      label: "Security",      icon: Shield },
];

// ─── Account Tab ──────────────────────────────────────────────────────────────
function AccountTab() {
  const { data: profileData, isLoading } = trpc.partners.getMyProfile.useQuery();
  const updateProfile = trpc.partners.updateProfile.useMutation({
    onSuccess: () => toast.success("Profile updated"),
    onError: (e) => toast.error(e.message),
  });
  const partner = profileData?.partner as any;
  const [form, setForm] = useState({
    businessName: "",
    contactPhone: "",
    website: "",
    description: "",
    serviceArea: "",
    googleReviewUrl: "",
  });

  useEffect(() => {
    if (partner) {
      setForm({
        businessName: partner.businessName ?? "",
        contactPhone: partner.contactPhone ?? "",
        website: partner.website ?? "",
        description: partner.description ?? "",
        serviceArea: partner.serviceArea ?? "",
        googleReviewUrl: partner.googleReviewUrl ?? "",
      });
    }
  }, [partner]);

  if (isLoading) return <div className="py-8 text-center text-gray-400 text-sm">Loading...</div>;
  if (!partner) return (
    <div className="py-8 text-center">
      <User className="w-10 h-10 text-gray-300 mx-auto mb-3" />
      <p className="text-gray-500 text-sm">No partner profile found. <a href="/apply" className="text-teal-600 underline">Apply to join</a>.</p>
    </div>
  );

  const handleSave = () => {
    updateProfile.mutate({
      businessName: form.businessName || undefined,
      contactPhone: form.contactPhone || undefined,
      website: form.website || undefined,
      description: form.description || undefined,
      serviceArea: form.serviceArea || undefined,
      googleReviewUrl: form.googleReviewUrl || undefined,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Business Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Business Name", key: "businessName", placeholder: "Your Business LLC" },
            { label: "Phone", key: "contactPhone", placeholder: "(214) 555-0100" },
            { label: "Website", key: "website", placeholder: "https://yourbusiness.com" },
            { label: "Service Area", key: "serviceArea", placeholder: "Dallas, Plano, Frisco, TX" },
            { label: "Google Review URL", key: "googleReviewUrl", placeholder: "https://g.page/r/..." },
          ].map(({ label, key, placeholder }) => (
            <div key={key}>
              <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
              <Input
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))}
                placeholder={placeholder}
                className="h-9 text-sm bg-white border-gray-200"
              />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <label className="block text-xs font-medium text-gray-600 mb-1">Bio / Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
            placeholder="Tell homeowners about your business, experience, and specialties..."
            rows={3}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
          />
          <p className="text-xs text-gray-400 text-right mt-1">{form.description.length}/1000</p>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={updateProfile.isPending}
          className="flex items-center gap-2 text-sm"
          style={{ backgroundColor: "var(--teal)", color: "white" }}
        >
          {updateProfile.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </Button>
      </div>
    </div>
  );
}

// ─── Notifications Tab ────────────────────────────────────────────────────────
function NotificationsTab() {
  const { data: profileData } = trpc.partners.getMyProfile.useQuery();
  const updatePrefs = trpc.partners.updateNotificationPrefs.useMutation({
    onSuccess: () => toast.success("Notification preferences saved"),
    onError: (e) => toast.error(e.message),
  });
  const partner = profileData?.partner as any;
  const prefs = (partner?.notificationPrefs ?? {}) as Record<string, boolean>;

  const NOTIFICATION_OPTIONS = [
    { key: "newLead",       icon: Zap,           label: "New Inbound Lead",        desc: "When a lead is dispatched to you" },
    { key: "commissionPaid", icon: CreditCard,    label: "Commission Paid",         desc: "When a commission is released to your account" },
    { key: "tierUpgrade",   icon: ChevronRight,  label: "Tier Upgrade Available",  desc: "When you qualify for the next tier" },
    { key: "broadcastMessages", icon: MessageSquare, label: "Broadcast Messages", desc: "When admin sends you a broadcast or message" },
    { key: "newReview",      icon: Bell,          label: "New Review",             desc: "When a homeowner leaves you a review" },
    { key: "weeklyDigest",  icon: Mail,          label: "Weekly Digest",           desc: "Weekly summary of your earnings and activity" },
    { key: "emailEnabled",  icon: Mail,          label: "Email Notifications",    desc: "Receive notifications via email" },
    { key: "smsEnabled",    icon: Smartphone,    label: "SMS Notifications",      desc: "Receive notifications via text message" },
  ];

  const [localPrefs, setLocalPrefs] = useState<Record<string, boolean>>({});
  useEffect(() => {
    const defaults: Record<string, boolean> = {};
    NOTIFICATION_OPTIONS.forEach(o => { defaults[o.key] = true; });
    setLocalPrefs({ ...defaults, ...prefs });
  }, [partner]);

  const handleSave = () => {
    updatePrefs.mutate({
      newLead: localPrefs.newLead,
      commissionPaid: localPrefs.commissionPaid,
      tierUpgrade: localPrefs.tierUpgrade,
      broadcastMessages: localPrefs.broadcastMessages,
      newReview: localPrefs.newReview,
      weeklyDigest: localPrefs.weeklyDigest,
      emailEnabled: localPrefs.emailEnabled,
      smsEnabled: localPrefs.smsEnabled,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Notification Preferences</h3>
        <p className="text-xs text-gray-500 mb-4">Choose which events trigger in-app and push notifications.</p>
        <div className="space-y-3">
          {NOTIFICATION_OPTIONS.map(({ key, icon: Icon, label, desc }) => (
            <div key={key} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--teal-light)" }}>
                  <Icon className="w-4 h-4" style={{ color: "var(--teal)" }} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{label}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              </div>
              <button
                onClick={() => setLocalPrefs(p => ({ ...p, [key]: !p[key] }))}
                className={`relative w-10 h-6 rounded-full transition-colors flex-shrink-0 ${localPrefs[key] ? "bg-teal-500" : "bg-gray-200"}`}
                style={localPrefs[key] ? { backgroundColor: "var(--teal)" } : {}}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${localPrefs[key] ? "translate-x-5" : "translate-x-1"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={updatePrefs.isPending}
          className="flex items-center gap-2 text-sm"
          style={{ backgroundColor: "var(--teal)", color: "white" }}
        >
          {updatePrefs.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
          Save Preferences
        </Button>
      </div>
    </div>
  );
}

// ─── Payout Tab ───────────────────────────────────────────────────────────────
function PayoutTab() {
  const { data: stripeStatus } = trpc.stripe.getConnectStatus.useQuery();
  const createConnectLink = trpc.stripe.createConnectLink.useMutation({
    onSuccess: (data: any) => { if (data?.url) window.open(data.url, "_blank"); },
    onError: (e: any) => toast.error(e.message),
  });
  const isConnected = (stripeStatus as any)?.connected;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Stripe Payout Account</h3>
        <p className="text-xs text-gray-500 mb-4">Connect your bank account to receive commission payouts via Stripe Connect.</p>
        <div className={`p-4 rounded-xl border ${isConnected ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isConnected ? "bg-emerald-100" : "bg-amber-100"}`}>
              <CreditCard className={`w-4 h-4 ${isConnected ? "text-emerald-600" : "text-amber-600"}`} />
            </div>
            <div>
              <p className={`text-sm font-semibold ${isConnected ? "text-emerald-700" : "text-amber-700"}`}>
                {isConnected ? "Bank Account Connected" : "No Bank Account Connected"}
              </p>
              <p className={`text-xs ${isConnected ? "text-emerald-600" : "text-amber-600"}`}>
                {isConnected ? "Payouts are enabled for your account" : "Connect your bank to receive payouts"}
              </p>
            </div>
          </div>
          <Button
            onClick={() => createConnectLink.mutate({ origin: window.location.origin })}
            disabled={createConnectLink.isPending}
            size="sm"
            className="flex items-center gap-2 text-xs"
            style={{ backgroundColor: isConnected ? "#059669" : "#d97706", color: "white" }}
          >
            {createConnectLink.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <ExternalLink className="w-3 h-3" />}
            {isConnected ? "Manage Payout Account" : "Connect Bank Account"}
          </Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Payout History</h3>
        <a href="/dashboard/payout-history" className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-teal-300 hover:bg-teal-50/30 transition-colors group">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--teal-light)" }}>
              <CreditCard className="w-4 h-4" style={{ color: "var(--teal)" }} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">View Payout History</p>
              <p className="text-xs text-gray-500">All past payouts and commission releases</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600 transition-colors" />
        </a>
        <a href="/dashboard/commissions" className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-teal-300 hover:bg-teal-50/30 transition-colors group mt-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--teal-light)" }}>
              <Zap className="w-4 h-4" style={{ color: "var(--teal)" }} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Commission Ledger</p>
              <p className="text-xs text-gray-500">Detailed breakdown of all commissions earned</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600 transition-colors" />
        </a>
      </div>
    </div>
  );
}

// ─── Integrations Tab ─────────────────────────────────────────────────────────
function IntegrationsTab() {
  const INTEGRATIONS = [
    { name: "CompanyCam", desc: "Sync job photos automatically", href: "/dashboard/integrations", status: "connect" },
    { name: "Jobber",     desc: "Import jobs and customers",     href: "/dashboard/integrations", status: "connect" },
    { name: "Housecall Pro", desc: "Sync service history",      href: "/dashboard/integrations", status: "connect" },
    { name: "ServiceTitan", desc: "Enterprise job management",  href: "/dashboard/integrations", status: "connect" },
  ];
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Connected Apps</h3>
        <p className="text-xs text-gray-500 mb-4">Connect your field service software to automatically sync jobs and photos.</p>
        <div className="space-y-2">
          {INTEGRATIONS.map((int) => (
            <a key={int.name} href={int.href} className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-teal-300 hover:bg-teal-50/30 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100">
                  <Link2 className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{int.name}</p>
                  <p className="text-xs text-gray-500">{int.desc}</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-600 group-hover:bg-teal-100 group-hover:text-teal-700 transition-colors">
                Connect →
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Security Tab ─────────────────────────────────────────────────────────────
function SecurityTab() {
  const { user } = useAuth();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Account Security</h3>
        <p className="text-xs text-gray-500 mb-4">Your account is secured via Manus OAuth. No password is stored.</p>
        <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <Shield className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-700">Secured with OAuth</p>
              <p className="text-xs text-emerald-600">Signed in as {user?.name ?? user?.email}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Active Sessions</h3>
        <div className="p-3 rounded-xl border border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <Smartphone className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">Current Session</p>
              <p className="text-xs text-gray-500">Active now · {navigator.userAgent.includes("Mobile") ? "Mobile" : "Desktop"}</p>
            </div>
            <span className="ml-auto text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Active</span>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Privacy</h3>
        <div className="space-y-2">
          {[
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "CCPA Rights", href: "/ccpa" },
          ].map(({ label, href }) => (
            <a key={label} href={href} className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-sm text-gray-700">
              {label}
              <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PartnerSettings() {
  const [activeTab, setActiveTab] = useState<Tab>("account");

  const TAB_CONTENT: Record<Tab, React.ReactNode> = {
    account:       <AccountTab />,
    notifications: <NotificationsTab />,
    payout:        <PayoutTab />,
    integrations:  <IntegrationsTab />,
    security:      <SecurityTab />,
  };

  return (
    <PartnerLayout>
      <div className="p-6 max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your account, notifications, payout, and integrations.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          {/* Sidebar tabs */}
          <nav className="sm:w-44 flex-shrink-0">
            <ul className="space-y-1">
              {TABS.map(({ id, label, icon: Icon }) => (
                <li key={id}>
                  <button
                    onClick={() => setActiveTab(id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                      activeTab === id
                        ? "text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    style={activeTab === id ? { backgroundColor: "var(--teal)" } : {}}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content */}
          <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            {TAB_CONTENT[activeTab]}
          </div>
        </div>
      </div>
    </PartnerLayout>
  );
}
