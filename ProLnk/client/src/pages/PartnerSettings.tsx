import type React from "react";
/**
 * W25 — Partner Settings Page
 * Unified settings hub: account info, notifications, payout, integrations, partner status.
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
  Star, Copy, FileCheck, FileX, AlertCircle,
  Download, Trash2,
} from "lucide-react";

type Tab = "account" | "notifications" | "payout" | "integrations" | "security" | "status";

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "status",        label: "Partner Status", icon: Star },
  { id: "account",       label: "Account",        icon: User },
  { id: "notifications", label: "Notifications",  icon: Bell },
  { id: "payout",        label: "Payout",         icon: CreditCard },
  { id: "integrations",  label: "Integrations",   icon: Link2 },
  { id: "security",      label: "Security",       icon: Shield },
];

// ─── Tier display helpers ──────────────────────────────────────────────────────
const TIER_LABELS: Record<string, string> = {
  scout: "Scout",
  pro: "Pro",
  crew: "Crew",
  company: "Company",
  enterprise: "Enterprise",
};
const TIER_COLORS: Record<string, string> = {
  scout: "#6B7280",
  pro: "#059669",
  crew: "#1D4ED8",
  company: "#0A1628",
  enterprise: "#7C3AED",
};
const COMMISSION_RATES: Record<string, number> = {
  scout: 40,
  pro: 55,
  crew: 65,
  company: 72,
  enterprise: 78,
};

// ─── Partner Status Tab ────────────────────────────────────────────────────────
function PartnerStatusTab() {
  const { user } = useAuth();
  const { data: profileData, isLoading } = trpc.partners.getMyProfile.useQuery();
  const partner = profileData?.partner as any;

  const waitlistQuery = trpc.proWaitlist.getWaitlistStatus.useQuery(
    { email: user?.email ?? "" },
    { enabled: !!user?.email }
  );
  const waitlistData = waitlistQuery.data as any;

  const tier = partner?.tier ?? "scout";
  const tierLabel = TIER_LABELS[tier] ?? tier;
  const tierColor = TIER_COLORS[tier] ?? "#6B7280";
  const commissionKeep = COMMISSION_RATES[tier] ?? 40;
  const referralCode = waitlistData?.referralCode ?? partner?.referralCode ?? null;
  const referralLink = referralCode ? `${window.location.origin}/join?ref=${referralCode}` : null;

  const subscriptionFee = Number(partner?.subscriptionFee ?? 0);
  const trialStatus = partner?.trialStatus ?? "trial";
  const subscriptionPlan = partner?.subscriptionPlan ?? null;

  const subStatus = (() => {
    if (tier === "scout" && subscriptionFee === 0) return "free";
    if (trialStatus === "trial") return "trial";
    if (subscriptionPlan) return "active";
    return "none";
  })();

  const licenseVerified = !!partner?.licenseVerifiedAt;
  const licenseUrl = partner?.licenseUrl ?? null;
  const coiVerified = !!partner?.coiVerifiedAt;
  const coiUrl = partner?.coiUrl ?? null;

  if (isLoading) return <div className="py-8 text-center text-gray-400 text-sm">Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Tier Card */}
      <div className="rounded-2xl p-5 text-white" style={{ backgroundColor: tierColor }}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-1">Your Partner Tier</p>
            <h3 className="text-3xl font-bold">{tierLabel}</h3>
            {partner?.isFoundingPartner && (
              <span className="inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-white/20 text-white">
                Founding Partner
              </span>
            )}
          </div>
          <div className="text-right">
            <p className="text-xs text-white/70">You keep</p>
            <p className="text-2xl font-bold">{commissionKeep}%</p>
            <p className="text-xs text-white/70">of every referral</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/20">
          <div className="text-center">
            <p className="text-lg font-bold">{partner?.jobsLogged ?? 0}</p>
            <p className="text-xs text-white/60">Jobs Logged</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{partner?.referralCount ?? 0}</p>
            <p className="text-xs text-white/60">Referrals</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">${Number(partner?.totalCommissionEarned ?? 0).toFixed(0)}</p>
            <p className="text-xs text-white/60">Earned</p>
          </div>
        </div>
      </div>

      {/* Commission Rates */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Commission Rates</h3>
        <div className="space-y-2">
          {[
            { label: "You keep (referral commission)", value: `${commissionKeep}%` },
            { label: "Platform fee on closed jobs", value: `${Math.round(Number(partner?.platformFeeRate ?? 0.12) * 100)}%` },
            { label: "Referral commission rate", value: `${Math.round(Number(partner?.referralCommissionRate ?? 0.048) * 100)}%` },
            { label: "Monthly earnings cap", value: partner?.monthlyCommissionCap ? `$${Number(partner.monthlyCommissionCap).toFixed(0)}` : "None" },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-sm text-gray-600">{label}</p>
              <p className="text-sm font-bold text-gray-900">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Status */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Subscription</h3>
        <div className={`p-4 rounded-xl border ${
          subStatus === "active" ? "border-emerald-200 bg-emerald-50" :
          subStatus === "trial" ? "border-blue-200 bg-blue-50" :
          subStatus === "free" ? "border-gray-200 bg-gray-50" :
          "border-amber-200 bg-amber-50"
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-semibold ${
                subStatus === "active" ? "text-emerald-700" :
                subStatus === "trial" ? "text-blue-700" :
                subStatus === "free" ? "text-gray-700" :
                "text-amber-700"
              }`}>
                {subStatus === "active" ? "Active Subscription" :
                 subStatus === "trial" ? "Trial Period" :
                 subStatus === "free" ? "Free Tier (Scout)" :
                 "No Active Subscription"}
              </p>
              <p className={`text-xs mt-0.5 ${
                subStatus === "active" ? "text-emerald-600" :
                subStatus === "trial" ? "text-blue-600" :
                subStatus === "free" ? "text-gray-500" :
                "text-amber-600"
              }`}>
                {subStatus === "active" ? `${tierLabel} — $${subscriptionFee}/mo` :
                 subStatus === "trial" ? "Trial active — subscribe to lock in your rate" :
                 subStatus === "free" ? "Scout plan is always free" :
                 "Subscribe to unlock full partner benefits"}
              </p>
            </div>
            {(subStatus === "none" || subStatus === "trial") && (
              <a
                href="/checkout"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A1628] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                Activate <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Documents */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Verification Documents</h3>
        <div className="space-y-2">
          {[
            { label: "Contractor License", verified: licenseVerified, url: licenseUrl, key: "license" },
            { label: "Certificate of Insurance (COI)", verified: coiVerified, url: coiUrl, key: "coi" },
          ].map(({ label, verified, url, key }) => (
            <div key={key} className={`flex items-center justify-between p-3 rounded-xl border ${
              verified ? "border-emerald-200 bg-emerald-50" : url ? "border-amber-200 bg-amber-50" : "border-gray-200 bg-gray-50"
            }`}>
              <div className="flex items-center gap-2.5">
                {verified ? (
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                ) : url ? (
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                ) : (
                  <FileX className="w-4 h-4 text-gray-400" />
                )}
                <div>
                  <p className={`text-sm font-medium ${verified ? "text-emerald-700" : url ? "text-amber-700" : "text-gray-600"}`}>
                    {label}
                  </p>
                  <p className={`text-xs ${verified ? "text-emerald-600" : url ? "text-amber-600" : "text-gray-400"}`}>
                    {verified ? "Verified" : url ? "Uploaded — pending review" : "Not uploaded"}
                  </p>
                </div>
              </div>
              {url && (
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-gray-800">
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Referral Link */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Your Referral Link</h3>
        {referralLink ? (
          <div className="bg-[#0A1628] rounded-xl p-4">
            <p className="text-white/70 text-xs mb-2">Share this link to earn network income when pros you refer complete jobs.</p>
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
              <span className="text-white/80 text-xs font-mono truncate flex-1">{referralLink}</span>
              <button
                onClick={() => { navigator.clipboard.writeText(referralLink); toast.success("Referral link copied!"); }}
                className="flex-shrink-0 text-[#F5E642] hover:text-white transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            {referralCode && (
              <p className="text-white/50 text-xs mt-2">Code: <span className="text-white font-mono font-bold">{referralCode}</span></p>
            )}
          </div>
        ) : (
          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 text-center">
            <p className="text-sm text-gray-500">Join the waitlist to get your referral link.</p>
            <a href="/pro-waitlist" className="text-xs text-[#0A1628] font-semibold underline mt-1 inline-block">Join Waitlist</a>
          </div>
        )}
      </div>

      {/* Waitlist Position (if applicable) */}
      {waitlistData && (
        <div className="p-4 rounded-xl border border-[#F5E642]/40 bg-[#F5E642]/10">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Waitlist Status</p>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-xl font-bold text-[#0A1628]">#{waitlistData.position}</p>
              <p className="text-xs text-gray-500">Position</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-[#0A1628]">{waitlistData.referralCount ?? 0}</p>
              <p className="text-xs text-gray-500">Referrals</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-[#0A1628]">{waitlistData.tier}</p>
              <p className="text-xs text-gray-500">Tier</p>
            </div>
          </div>
          <a
            href={`/waitlist-status?ref=${waitlistData.referralCode}`}
            className="block mt-3 text-center text-xs font-semibold text-[#0A1628] underline"
          >
            View Referral Dashboard →
          </a>
        </div>
      )}
    </div>
  );
}

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
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Payout Setup</h3>
        <a
          href="/dashboard/payout-setup"
          className="flex items-center justify-between p-3 rounded-xl border border-[#0A1628]/20 bg-[#0A1628]/5 hover:bg-[#0A1628]/10 transition-colors group mb-2"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#0A1628]">
              <CreditCard className="w-4 h-4 text-[#F5E642]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0A1628]">Bank Account Setup</p>
              <p className="text-xs text-gray-500">
                {isConnected ? "Manage your connected bank account" : "Connect your bank to receive monthly payouts"}
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#0A1628] group-hover:translate-x-0.5 transition-transform" />
        </a>
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

      <div>
        <h3 className="text-sm font-semibold text-red-600 mb-1">Danger Zone</h3>
        <p className="text-xs text-gray-400 mb-3">These actions are permanent or may affect your account.</p>
        <div className="space-y-2 rounded-xl border border-red-200 p-4 bg-red-50/40">
          <DangerZoneDownload />
          <a
            href="mailto:support@prolnk.io?subject=Account%20Closure%20Request"
            className="flex items-center justify-between p-3 rounded-xl border border-red-200 bg-white hover:bg-red-50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-100">
                <Trash2 className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-red-700">Close Account</p>
                <p className="text-xs text-red-400">Contact support to request account closure</p>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-red-400 group-hover:text-red-600 transition-colors" />
          </a>
        </div>
      </div>
    </div>
  );
}

function DangerZoneDownload() {
  const { data: profileData } = trpc.partners.getMyProfile.useQuery();
  const { user } = useAuth();
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    const partner = (profileData as any)?.partner ?? {};
    const rows = [
      ["Field", "Value"],
      ["Name", partner.contactName ?? user?.name ?? ""],
      ["Email", partner.contactEmail ?? user?.email ?? ""],
      ["Business", partner.businessName ?? ""],
      ["Phone", partner.contactPhone ?? ""],
      ["Trade", partner.trade ?? ""],
      ["Service Area", partner.serviceArea ?? ""],
      ["Tier", partner.tier ?? ""],
      ["Jobs Logged", partner.jobsLogged ?? "0"],
      ["Referrals", partner.referralCount ?? "0"],
      ["Total Earned", `$${Number(partner.totalCommissionEarned ?? 0).toFixed(2)}`],
      ["Member Since", partner.createdAt ? new Date(partner.createdAt).toLocaleDateString() : ""],
    ];
    const csv = rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prolnk-account-data.csv";
    a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => setDownloading(false), 1000);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors group text-left"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100">
          <Download className={`w-4 h-4 text-gray-500 ${downloading ? "animate-bounce" : ""}`} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">Download My Data</p>
          <p className="text-xs text-gray-500">Export your account data as CSV</p>
        </div>
      </div>
      <span className="text-xs font-semibold text-gray-400 group-hover:text-gray-700 transition-colors">
        {downloading ? "Downloading…" : "Export CSV"}
      </span>
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PartnerSettings() {
  const [activeTab, setActiveTab] = useState<Tab>("status");

  const TAB_CONTENT: Record<Tab, React.ReactNode> = {
    status:        <PartnerStatusTab />,
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
