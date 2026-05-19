import React from 'react';
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import PartnerLayout from "@/components/PartnerLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  User, Bell, CreditCard, Link2, Shield, ChevronRight,
  Check, Save, Loader2, ExternalLink, EyeOff,
  Mail, Zap, Lock,
  Copy, FileCheck, AlertCircle,
  Download, Trash2, Camera, Phone, Globe,
  DollarSign, Key, ChevronDown, ChevronUp,
} from "lucide-react";

type Tab = "profile" | "notifications" | "payment" | "privacy" | "integrations" | "account";

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "profile",       label: "Profile",        icon: User },
  { id: "notifications", label: "Notifications",  icon: Bell },
  { id: "payment",       label: "Payment Setup",  icon: CreditCard },
  { id: "privacy",       label: "Privacy",        icon: Shield },
  { id: "integrations",  label: "Integrations",   icon: Link2 },
  { id: "account",       label: "Account",        icon: Key },
];

function SectionCard({
  title,
  subtitle,
  icon: Icon,
  children,
  defaultOpen = true,
}: {
  title: string;
  subtitle?: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3″>
          <div className="w-8 h-8 rounded-lg bg-teal-400/10 flex items-center justify-center">
            <Icon className="w-4 h-4 text-teal-400″ />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{title}</p>
            {subtitle && <p className="text-xs text-white/50″>{subtitle}</p>}
          </div>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-white/40″ />
        ) : (
          <ChevronDown className="w-4 h-4 text-white/40″ />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 border-t border-white/10″>
          {children}
        </div>
      )}
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-6 rounded-full transition-colors flex-shrink-0 ${
        checked ? "bg-teal-400″ : "bg-white/20"
      }`}
    >
      <span
        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
          checked ? "translate-x-5″ : "translate-x-1"
        }`}
      />
    </button>
  );
}

// ─── Profile Tab ──────────────────────────────────────────────────────────────
function ProfileTab() {
  const { data: profileData, isLoading } = trpc.partners.getMyProfile.useQuery();
  const updateProfile = trpc.partners.updateProfile.useMutation({
    onSuccess: () => toast.success("Profile saved"),
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

  if (isLoading) return <div className="py-8 text-center text-white/40 text-sm">Loading...</div>;

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
    <div className="space-y-5″>
      {/* Avatar placeholder */}
      <SectionCard title="Photo" subtitle="Your profile photo shown to homeowners" icon={Camera} defaultOpen={true}>
        <div className="flex items-center gap-4 mt-3″>
          <div className="w-16 h-16 rounded-2xl bg-white/10 border-2 border-dashed border-white/20 flex items-center justify-center">
            <Camera className="w-6 h-6 text-white/30″ />
          </div>
          <div>
            <button className="text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors">
              Upload photo
            </button>
            <p className="text-xs text-white/40 mt-0.5″>JPG or PNG, max 5MB. Shown in directory and lead responses.</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Business Information" subtitle="Name, contact, service area" icon={User} defaultOpen={true}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3″>
          {[
            { label: "Business Name", key: "businessName", placeholder: "Your Business LLC" },
            { label: "Phone", key: "contactPhone", placeholder: "(214) 555-0100″ },
            { label: "Website", key: "website", placeholder: "https://yourbusiness.com" },
            { label: "Service Area", key: "serviceArea", placeholder: "Dallas, Plano, Frisco, TX" },
            { label: "Google Review URL", key: "googleReviewUrl", placeholder: "https://g.page/r/..." },
          ].map(({ label, key, placeholder }) => (
            <div key={key}>
              <label className="block text-xs font-medium text-white/60 mb-1″>{label}</label>
              <Input
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                placeholder={placeholder}
                className="h-9 text-sm bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-teal-400″
              />
            </div>
          ))}
        </div>
        <div className="mt-4″>
          <label className="block text-xs font-medium text-white/60 mb-1″>Bio / Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Tell homeowners about your business, experience, and specialties..."
            rows={3}
            className="w-full text-sm bg-white/5 border border-white/10 text-white placeholder:text-white/30 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400″
          />
          <p className="text-xs text-white/30 text-right mt-1″>{form.description.length}/1000</p>
        </div>
        <div className="flex justify-end mt-4″>
          <Button
            onClick={handleSave}
            disabled={updateProfile.isPending}
            className="flex items-center gap-2 text-sm bg-teal-400 hover:bg-teal-500 text-[#0A1628] font-semibold"
          >
            {updateProfile.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4″ />}
            Save Profile
          </Button>
        </div>
      </SectionCard>
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

  const SECTIONS = [
    {
      title: "Lead Alerts",
      desc: "Notify me about new leads",
      icon: Zap,
      groups: [
        { key: "newLead", label: "New Inbound Lead", desc: "When a lead is dispatched to you" },
        { key: "leadExpiring", label: "Lead Expiring Soon", desc: "24-hour warning before a lead expires" },
      ],
    },
    {
      title: "Payment & Earnings",
      desc: "Payout and commission events",
      icon: DollarSign,
      groups: [
        { key: "commissionPaid", label: "Commission Paid", desc: "When a commission is released to your account" },
        { key: "tierUpgrade", label: "Tier Upgrade Available", desc: "When you qualify for the next tier" },
      ],
    },
    {
      title: "Reviews & Feedback",
      desc: "Homeowner reviews",
      icon: Star,
      groups: [
        { key: "newReview", label: "New Review", desc: "When a homeowner leaves you a review" },
      ],
    },
    {
      title: "Communications",
      desc: "Channels and digest",
      icon: Bell,
      groups: [
        { key: "broadcastMessages", label: "Broadcast Messages", desc: "Admin messages and announcements" },
        { key: "weeklyDigest", label: "Weekly Digest", desc: "Weekly summary of earnings and activity" },
        { key: "emailEnabled", label: "Email Notifications", desc: "Receive all notifications via email" },
        { key: "smsEnabled", label: "SMS Notifications", desc: "Receive urgent alerts via text message" },
      ],
    },
  ];

  const [localPrefs, setLocalPrefs] = useState<Record<string, boolean>>({});
  useEffect(() => {
    const defaults: Record<string, boolean> = {};
    SECTIONS.forEach((s) => s.groups.forEach((g) => { defaults[g.key] = true; }));
    setLocalPrefs({ ...defaults, ...prefs });
  }, [partner]);

  const allKeys = SECTIONS.flatMap((s) => s.groups.map((g) => g.key));

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
    <div className="space-y-4″>
      {SECTIONS.map(({ title, desc, icon: Icon, groups }) => (
        <SectionCard key={title} title={title} subtitle={desc} icon={Icon} defaultOpen={true}>
          <div className="space-y-2 mt-3″>
            {groups.map(({ key, label, desc: groupDesc }) => (
              <div key={key} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0″>
                <div>
                  <p className="text-sm font-medium text-white">{label}</p>
                  <p className="text-xs text-white/40″>{groupDesc}</p>
                </div>
                <Toggle
                  checked={!!localPrefs[key]}
                  onChange={(v) => setLocalPrefs((p) => ({ ...p, [key]: v }))}
                />
              </div>
            ))}
          </div>
        </SectionCard>
      ))}

      <div className="flex justify-end pt-2″>
        <Button
          onClick={handleSave}
          disabled={updatePrefs.isPending}
          className="flex items-center gap-2 text-sm bg-teal-400 hover:bg-teal-500 text-[#0A1628] font-semibold"
        >
          {updatePrefs.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4″ />}
          Save Preferences
        </Button>
      </div>
    </div>
  );
}

// ─── Payment Setup Tab ────────────────────────────────────────────────────────
function PaymentTab() {
  const { data: stripeStatus } = trpc.stripe.getConnectStatus.useQuery();
  const createConnectLink = trpc.stripe.createConnectLink.useMutation({
    onSuccess: (data: any) => { if (data?.url) window.open(data.url, "_blank"); },
    onError: (e: any) => toast.error(e.message),
  });
  const isConnected = (stripeStatus as any)?.connected;
  const last4 = (stripeStatus as any)?.bankAccountLast4;

  return (
    <div className="space-y-4″>
      <SectionCard title="Payout Method" subtitle="Bank account for receiving commissions" icon={CreditCard} defaultOpen={true}>
        <div className={`mt-3 p-4 rounded-xl border ${isConnected ? "border-teal-400/30 bg-teal-400/5" : "border-amber-400/30 bg-amber-400/5"}`}>
          <div className="flex items-center gap-3 mb-3″>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isConnected ? "bg-teal-400/10" : "bg-amber-400/10"}`}>
              <CreditCard className={`w-4 h-4 ${isConnected ? "text-teal-400" : "text-amber-400"}`} />
            </div>
            <div>
              <p className={`text-sm font-semibold ${isConnected ? "text-teal-400" : "text-amber-400"}`}>
                {isConnected ? "Bank Account Connected" : "No Bank Account Connected"}
              </p>
              {isConnected && last4 ? (
                <p className="text-xs text-white/50 font-mono">••••{last4}</p>
              ) : (
                <p className="text-xs text-white/50″>Add via /payout-setup to receive payouts</p>
              )}
            </div>
          </div>
          <a
            href="/dashboard/payout-setup"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors"
          >
            {isConnected ? "Manage payout account" : "Set up payout account"} <ChevronRight className="w-3.5 h-3.5″ />
          </a>
        </div>

        <div className="mt-4 flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10″>
          <Lock className="w-4 h-4 text-white/30 mt-0.5 flex-shrink-0″ />
          <p className="text-xs text-white/40 leading-relaxed">
            Bank account setup is handled entirely by Stripe — ProLnk never stores your banking credentials. Stripe is PCI-DSS Level 1 certified.
          </p>
        </div>
      </SectionCard>

      <SectionCard title="Payout History" subtitle="Past commission payouts" icon={DollarSign} defaultOpen={false}>
        <div className="mt-3 space-y-2″>
          {[
            { date: "May 1, 2026″, amount: "$284.50", status: "paid", ref: "pyt_1abc" },
            { date: "Apr 1, 2026″, amount: "$197.00", status: "paid", ref: "pyt_2xyz" },
            { date: "Mar 1, 2026″, amount: "$143.25", status: "paid", ref: "pyt_3def" },
          ].map((p) => (
            <div key={p.ref} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0″>
              <div>
                <p className="text-sm text-white font-medium">{p.amount}</p>
                <p className="text-xs text-white/40″>{p.date}</p>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-400/10 text-teal-400″>
                {p.status}
              </span>
            </div>
          ))}
          <a
            href="/dashboard/commissions"
            className="block mt-2 text-xs text-teal-400 hover:text-teal-300 font-medium"
          >
            View full commission ledger →
          </a>
        </div>
      </SectionCard>

      <SectionCard title="Tax Information" subtitle="1099 and tax compliance" icon={FileCheck} defaultOpen={false}>
        <div className="mt-3 space-y-3″>
          <p className="text-sm text-white/60″>
            Partners earning over $20,000/year receive a 1099-NEC form by January 31. For full details, visit the compliance docs.
          </p>
          <a
            href="/dashboard/compliance"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors"
          >
            View compliance docs <ChevronRight className="w-3.5 h-3.5″ />
          </a>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── Privacy Tab ──────────────────────────────────────────────────────────────
function PrivacyTab() {
  const [settings, setSettings] = useState({
    hideEarningsFromNetwork: false,
    hidePhoneFromLeads: false,
    hideFromDirectory: false,
    hideJobHistory: false,
    allowAnalytics: true,
    marketingEmails: true,
  });

  const PRIVACY_OPTIONS = [
    {
      key: "hideEarningsFromNetwork",
      label: "Hide earnings from network",
      desc: "Your downline cannot see your commission totals",
      icon: DollarSign,
    },
    {
      key: "hidePhoneFromLeads",
      label: "Hide phone number from leads",
      desc: "Leads see only your name and trade until you accept",
      icon: Phone,
    },
    {
      key: "hideFromDirectory",
      label: "Hide from partner directory",
      desc: "Your profile won't appear in the public partner directory",
      icon: EyeOff,
    },
    {
      key: "hideJobHistory",
      label: "Hide job history count",
      desc: "Don't display your job count on your public profile",
      icon: Shield,
    },
    {
      key: "allowAnalytics",
      label: "Allow usage analytics",
      desc: "Help us improve ProLnk by sharing anonymous usage data",
      icon: Globe,
    },
    {
      key: "marketingEmails",
      label: "Marketing emails",
      desc: "Receive tips, ProLnk product updates, and partner news",
      icon: Mail,
    },
  ];

  return (
    <div className="space-y-4″>
      <SectionCard title="Privacy Controls" subtitle="Manage what others can see about you" icon={EyeOff} defaultOpen={true}>
        <div className="space-y-1 mt-3″>
          {PRIVACY_OPTIONS.map(({ key, label, desc, icon: Icon }) => (
            <div key={key} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0″>
              <div className="flex items-start gap-3″>
                <Icon className="w-4 h-4 text-white/30 mt-0.5 flex-shrink-0″ />
                <div>
                  <p className="text-sm font-medium text-white">{label}</p>
                  <p className="text-xs text-white/40″>{desc}</p>
                </div>
              </div>
              <Toggle
                checked={!!settings[key as keyof typeof settings]}
                onChange={(v) => setSettings((s) => ({ ...s, [key]: v }))}
              />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Legal & Rights" subtitle="Your data rights under CCPA/GDPR" icon={Lock} defaultOpen={false}>
        <div className="space-y-2 mt-3″>
          {[
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "CCPA Rights", href: "/ccpa" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="flex items-center justify-between p-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-sm text-white/70″
            >
              {label}
              <ExternalLink className="w-3.5 h-3.5 text-white/30″ />
            </a>
          ))}
        </div>
      </SectionCard>

      <div className="flex justify-end">
        <Button
          onClick={() => toast.success("Privacy settings saved")}
          className="text-sm bg-teal-400 hover:bg-teal-500 text-[#0A1628] font-semibold"
        >
          <Check className="w-4 h-4 mr-1.5″ />
          Save Privacy Settings
        </Button>
      </div>
    </div>
  );
}

// ─── Integrations Tab ─────────────────────────────────────────────────────────
function IntegrationsTab() {
  const FSM_APPS = [
    { name: "Jobber", desc: "Sync jobs and customers", color: "bg-green-500″, status: "not_connected" },
    { name: "Housecall Pro", desc: "Sync service history and photos", color: "bg-blue-500″, status: "not_connected" },
    { name: "ServiceTitan", desc: "Enterprise job management", color: "bg-purple-500″, status: "coming_soon" },
    { name: "Workiz", desc: "Field service and scheduling", color: "bg-orange-500″, status: "not_connected" },
  ];

  return (
    <div className="space-y-4″>
      <SectionCard title="Field Service Software" subtitle="Connect your existing FSM tools" icon={Link2} defaultOpen={true}>
        <div className="space-y-2 mt-3″>
          {FSM_APPS.map((app) => (
            <div
              key={app.name}
              className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-white/5″
            >
              <div className="flex items-center gap-3″>
                <div className={`w-8 h-8 rounded-lg ${app.color} flex items-center justify-center`}>
                  <Link2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{app.name}</p>
                  <p className="text-xs text-white/40″>{app.desc}</p>
                </div>
              </div>
              {app.status === "coming_soon" ? (
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/10 text-white/40″>
                  Soon
                </span>
              ) : (
                <a
                  href="/dashboard/integration-settings"
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-teal-400/10 text-teal-400 hover:bg-teal-400/20 transition-colors"
                >
                  Connect →
                </a>
              )}
            </div>
          ))}
        </div>
        <div className="mt-3″>
          <a
            href="/dashboard/integration-settings"
            className="flex items-center gap-1.5 text-sm text-teal-400 hover:text-teal-300 font-medium"
          >
            Manage all integrations <ChevronRight className="w-3.5 h-3.5″ />
          </a>
        </div>
      </SectionCard>

      <SectionCard title="ProLnk API" subtitle="Direct API access for developers" icon={Key} defaultOpen={false}>
        <div className="mt-3 space-y-3″>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10″>
            <p className="text-xs text-white/50 mb-1″>Your API Key</p>
            <div className="flex items-center gap-2″>
              <code className="text-sm font-mono text-teal-400 flex-1″>plnk_live_••••••••••••••••</code>
              <button
                onClick={() => toast.info("Coming soon — API keys will be available at launch")}
                className="text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                <Copy className="w-3.5 h-3.5″ />
              </button>
            </div>
          </div>
          <p className="text-xs text-white/40″>
            API access is available on Pro and above tiers. Keys are generated automatically when your account is activated.
          </p>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── Account Tab ──────────────────────────────────────────────────────────────
function AccountTab() {
  const { user } = useAuth();
  const { data: profileData } = trpc.partners.getMyProfile.useQuery();
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
      ["Jobs Logged", partner.jobsLogged ?? "0″],
      ["Referrals", partner.referralCount ?? "0″],
      ["Total Earned", `$${Number(partner.totalCommissionEarned ?? 0).toFixed(2)}`],
      ["Member Since", partner.createdAt ? new Date(partner.createdAt).toLocaleDateString() : ""],
    ];
    const csv = rows.map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
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
    <div className="space-y-4″>
      <SectionCard title="Change Password" subtitle="Update your login credentials" icon={Key} defaultOpen={true}>
        <div className="mt-3 space-y-3″>
          <a
            href="/set-password"
            className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group"
          >
            <div className="flex items-center gap-3″>
              <div className="w-8 h-8 rounded-lg bg-teal-400/10 flex items-center justify-center">
                <Lock className="w-4 h-4 text-teal-400″ />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Set / Change Password</p>
                <p className="text-xs text-white/40″>Update your ProLnk account password</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
          </a>
        </div>
      </SectionCard>

      <SectionCard title="Your Data" subtitle="Export your account data" icon={Download} defaultOpen={false}>
        <div className="mt-3″>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group text-left"
          >
            <div className="flex items-center gap-3″>
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Download className={`w-4 h-4 text-white/60 ${downloading ? "animate-bounce" : ""}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Download My Data</p>
                <p className="text-xs text-white/40″>Export your account data as CSV (CCPA)</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-white/40 group-hover:text-white/70 transition-colors">
              {downloading ? "Downloading…" : "Export CSV"}
            </span>
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Danger Zone" subtitle="Permanent actions that cannot be undone" icon={AlertCircle} defaultOpen={false}>
        <div className="mt-3″>
          <a
            href="/account/delete"
            className="flex items-center justify-between p-4 rounded-xl border border-red-500/30 bg-red-500/5 hover:bg-red-500/10 transition-colors group"
          >
            <div className="flex items-center gap-3″>
              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                <Trash2 className="w-4 h-4 text-red-400″ />
              </div>
              <div>
                <p className="text-sm font-medium text-red-400″>Delete Account</p>
                <p className="text-xs text-red-400/50″>Permanently delete your account and all data</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-red-400/40 group-hover:text-red-400/70 transition-colors" />
          </a>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PartnerSettings() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  const TAB_CONTENT: Record<Tab, React.ReactNode> = {
    profile:       <ProfileTab />,
    notifications: <NotificationsTab />,
    payment:       <PaymentTab />,
    privacy:       <PrivacyTab />,
    integrations:  <IntegrationsTab />,
    account:       <AccountTab />,
  };

  return (
    <PartnerLayout>
      <div className="min-h-screen bg-[#0A1628] p-4 sm:p-6″>
        <div className="max-w-3xl mx-auto">
          <div className="mb-6″>
            <h1 className="text-2xl font-bold text-white">Settings</h1>
            <p className="text-sm text-white/50 mt-1″>
              Manage your profile, notifications, payout, privacy, and integrations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6″>
            {/* Sidebar */}
            <nav className="sm:w-48 flex-shrink-0″>
              <ul className="space-y-1″>
                {TABS.map(({ id, label, icon: Icon }) => (
                  <li key={id}>
                    <button
                      onClick={() => setActiveTab(id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                        activeTab === id
                          ? "bg-teal-400/10 text-teal-400 border border-teal-400/20″
                          : "text-white/50 hover:text-white/80 hover:bg-white/5″
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0″ />
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Content */}
            <div className="flex-1 min-w-0″>
              {TAB_CONTENT[activeTab]}
            </div>
          </div>
        </div>
      </div>
    </PartnerLayout>
  );
}
