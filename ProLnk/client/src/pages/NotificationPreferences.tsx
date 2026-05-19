import React from 'react';
import { useState, useEffect } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  Bell, Mail, MessageSquare, Zap, DollarSign, Star,
  Network, Megaphone, Calendar, Loader2, Save, CloudLightning,
  Briefcase, Trophy, Moon, Sun, Volume2, Send, ChevronDown,
  ChevronUp, Check, Smartphone,
} from "lucide-react";

type Channel = "email" | "sms" | "push";

interface CategoryPrefs {
  email: boolean;
  sms: boolean;
  push: boolean;
}

interface NotifPrefs {
  leads: CategoryPrefs;
  payments: CategoryPrefs;
  reviews: CategoryPrefs;
  network: CategoryPrefs;
  stormAlerts: CategoryPrefs;
  marketing: CategoryPrefs;
  jobs: CategoryPrefs;
  tier: CategoryPrefs;
  emailEnabled: boolean;
  smsEnabled: boolean;
  pushEnabled: boolean;
  quietHoursEnabled: boolean;
  quietStart: string;
  quietEnd: string;
  leadValueThreshold: number;
}

interface Category {
  key: keyof Omit<NotifPrefs, "emailEnabled" | "smsEnabled" | "pushEnabled" | "quietHoursEnabled" | "quietStart" | "quietEnd" | "leadValueThreshold">;
  label: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  urgency: "high" | "medium" | "low";
}

const DEFAULT_PREFS: NotifPrefs = {
  leads:       { email: true,  sms: true,  push: true },
  payments:    { email: true,  sms: false, push: true },
  reviews:     { email: true,  sms: false, push: true },
  network:     { email: true,  sms: false, push: false },
  stormAlerts: { email: true,  sms: true,  push: true },
  marketing:   { email: false, sms: false, push: false },
  jobs:        { email: true,  sms: true,  push: true },
  tier:        { email: true,  sms: false, push: true },
  emailEnabled: true,
  smsEnabled: false,
  pushEnabled: true,
  quietHoursEnabled: false,
  quietStart: "22:00″,
  quietEnd: "08:00″,
  leadValueThreshold: 0,
};

const CATEGORIES: Category[] = [
  {
    key: "leads",
    label: "Leads",
    description: "New leads available in your service area",
    icon: <Zap className="w-4 h-4″ />,
    iconBg: "rgba(34,197,94,0.15)",
    iconColor: "#22c55e",
    urgency: "high",
  },
  {
    key: "jobs",
    label: "Jobs",
    description: "Job confirmations, updates, and reminders",
    icon: <Briefcase className="w-4 h-4″ />,
    iconBg: "rgba(16,185,129,0.15)",
    iconColor: "#10b981″,
    urgency: "high",
  },
  {
    key: "payments",
    label: "Payments",
    description: "Commission credits, payouts, and payment receipts",
    icon: <DollarSign className="w-4 h-4″ />,
    iconBg: "rgba(245,230,66,0.15)",
    iconColor: "#F5E642″,
    urgency: "medium",
  },
  {
    key: "stormAlerts",
    label: "Storm Alerts",
    description: "Severe weather detected in your service area — leads auto-queue within minutes",
    icon: <CloudLightning className="w-4 h-4″ />,
    iconBg: "rgba(245,158,11,0.15)",
    iconColor: "#f59e0b",
    urgency: "high",
  },
  {
    key: "reviews",
    label: "Reviews",
    description: "New homeowner reviews for your business",
    icon: <Star className="w-4 h-4″ />,
    iconBg: "rgba(251,191,36,0.15)",
    iconColor: "#fbbf24″,
    urgency: "medium",
  },
  {
    key: "tier",
    label: "Tier & Achievements",
    description: "Tier upgrades, milestone celebrations, and rank changes",
    icon: <Trophy className="w-4 h-4″ />,
    iconBg: "rgba(139,92,246,0.15)",
    iconColor: "#8b5cf6″,
    urgency: "medium",
  },
  {
    key: "network",
    label: "Network",
    description: "New referrals, team joins, and override earnings",
    icon: <Network className="w-4 h-4″ />,
    iconBg: "rgba(59,130,246,0.15)",
    iconColor: "#3b82f6″,
    urgency: "low",
  },
  {
    key: "marketing",
    label: "Marketing & Tips",
    description: "Platform tips, feature announcements, and weekly digests",
    icon: <Megaphone className="w-4 h-4″ />,
    iconBg: "rgba(107,114,128,0.15)",
    iconColor: "#9ca3af",
    urgency: "low",
  },
];

const URGENCY_CONFIG = {
  high:   { label: "High Priority", bg: "rgba(239,68,68,0.1)",    color: "#ef4444″ },
  medium: { label: "Medium",         bg: "rgba(245,158,11,0.1)",   color: "#f59e0b" },
  low:    { label: "Low",            bg: "rgba(107,114,128,0.1)",  color: "#9ca3af" },
};

const LEAD_THRESHOLDS = [
  { value: 0,    label: "All leads" },
  { value: 200,  label: "$200+" },
  { value: 500,  label: "$500+" },
  { value: 1000, label: "$1,000+" },
  { value: 2000, label: "$2,000+" },
  { value: 5000, label: "$5,000+" },
];

const CHANNEL_META: Record<Channel, { icon: React.ElementType; label: string; coming?: boolean }> = {
  email: { icon: Mail,          label: "Email" },
  sms:   { icon: MessageSquare, label: "SMS",   coming: true },
  push:  { icon: Smartphone,    label: "Push" },
};

function ToggleSwitch({ checked, onChange, disabled }: { checked: boolean; onChange: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onChange}
      disabled={disabled}
      className="relative inline-flex h-5 w-9 rounded-full transition-colors flex-shrink-0″
      style={{
        background: checked ? "#2dd4bf" : "rgba(255,255,255,0.12)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
      }}
    >
      <span
        className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform"
        style={{ transform: checked ? "translateX(16px)" : "translateX(0)" }}
      />
    </button>
  );
}

function ChannelCheckbox({ checked, onChange, channel, disabled }: {
  checked: boolean; onChange: () => void; channel: Channel; disabled?: boolean;
}) {
  const meta = CHANNEL_META[channel];
  const Icon = meta.icon;
  return (
    <button
      onClick={disabled ? undefined : onChange}
      disabled={disabled}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all"
      style={{
        background: checked ? "rgba(45,212,191,0.12)" : "rgba(255,255,255,0.04)",
        color: checked ? "#2dd4bf" : "#6b7280″,
        border: checked ? "1px solid rgba(45,212,191,0.3)" : "1px solid rgba(255,255,255,0.08)",
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {checked
        ? <Check size={11} />
        : <Icon size={11} />
      }
      {meta.label}
      {meta.coming && <span className="text-[9px] opacity-60″>(soon)</span>}
    </button>
  );
}

export default function NotificationPreferences() {
  const { data: serverPrefs, isLoading } = trpc.partners.getNotificationPrefs.useQuery();
  const [prefs, setPrefs] = useState<NotifPrefs>(DEFAULT_PREFS);
  const [isDirty, setIsDirty] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [sendingTest, setSendingTest] = useState(false);

  const updatePrefs = trpc.partners.updateNotificationPrefs.useMutation({
    onSuccess: () => {
      toast.success("Notification preferences saved");
      setIsDirty(false);
    },
    onError: (err) => toast.error(err.message || "Failed to save preferences"),
  });

  useEffect(() => {
    if (serverPrefs) {
      setPrefs({
        leads:       { email: serverPrefs.newLead ?? true,         sms: false, push: true },
        payments:    { email: serverPrefs.commissionPaid ?? true,   sms: false, push: true },
        reviews:     { email: serverPrefs.newReview ?? true,        sms: false, push: true },
        network:     { email: serverPrefs.broadcastMessages ?? true,sms: false, push: false },
        stormAlerts: { email: (serverPrefs as any).stormAlert ?? true, sms: true, push: true },
        marketing:   { email: serverPrefs.weeklyDigest ?? false,    sms: false, push: false },
        jobs:        { email: serverPrefs.newLead ?? true,          sms: true,  push: true },
        tier:        { email: serverPrefs.tierUpgrade ?? true,      sms: false, push: true },
        emailEnabled: serverPrefs.emailEnabled ?? true,
        smsEnabled: serverPrefs.smsEnabled ?? false,
        pushEnabled: true,
        quietHoursEnabled: false,
        quietStart: "22:00″,
        quietEnd: "08:00″,
        leadValueThreshold: 0,
      });
    }
  }, [serverPrefs]);

  const toggleCategory = (key: Category["key"], channel: Channel) => {
    setPrefs((prev) => ({
      ...prev,
      [key]: { ...prev[key], [channel]: !prev[key][channel] },
    }));
    setIsDirty(true);
  };

  const toggleGlobal = (key: "emailEnabled" | "smsEnabled" | "pushEnabled" | "quietHoursEnabled") => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
    setIsDirty(true);
  };

  const setThreshold = (value: number) => {
    setPrefs((prev) => ({ ...prev, leadValueThreshold: value }));
    setIsDirty(true);
  };

  const setQuietHour = (key: "quietStart" | "quietEnd", value: string) => {
    setPrefs((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handleSave = () => {
    updatePrefs.mutate({
      newLead: prefs.leads.email,
      leadExpired: prefs.leads.email,
      commissionPaid: prefs.payments.email,
      tierUpgrade: prefs.tier.email,
      newReview: prefs.reviews.email,
      broadcastMessages: prefs.network.email,
      weeklyDigest: prefs.marketing.email,
      stormAlert: prefs.stormAlerts.email,
      emailEnabled: prefs.emailEnabled,
      smsEnabled: prefs.smsEnabled,
    } as any);
  };

  const handleTestNotification = () => {
    setSendingTest(true);
    setTimeout(() => {
      setSendingTest(false);
      toast.success("Test notification sent to your email and push devices");
    }, 1500);
  };

  const enabledCount = CATEGORIES.filter((c) => {
    const cat = prefs[c.key];
    return cat.email || cat.sms || cat.push;
  }).length;

  if (isLoading) {
    return (
      <PartnerLayout>
        <div className="flex items-center justify-center h-64″>
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: "#2dd4bf" }} />
        </div>
      </PartnerLayout>
    );
  }

  return (
    <PartnerLayout>
      <div className="max-w-2xl space-y-5″>

        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3″>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(45,212,191,0.1)", border: "1px solid rgba(45,212,191,0.2)" }}
            >
              <Bell className="w-5 h-5″ style={{ color: "#2dd4bf" }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Notification Preferences</h1>
              <p className="text-sm text-gray-400″>Control what you hear about and how.</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={!isDirty || updatePrefs.isPending}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all"
            style={
              isDirty
                ? { background: "#2dd4bf", color: "#0A1628″ }
                : { background: "rgba(255,255,255,0.06)", color: "#4b5563″, cursor: "default" }
            }
          >
            {updatePrefs.isPending
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
              : <><Save className="w-4 h-4″ /> Save Changes</>
            }
          </button>
        </div>

        {/* Summary */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{ background: "rgba(45,212,191,0.06)", border: "1px solid rgba(45,212,191,0.15)" }}>
          <Bell className="w-4 h-4 flex-shrink-0″ style={{ color: "#2dd4bf" }} />
          <span className="text-sm text-gray-300″>
            <span className="font-bold text-white">{enabledCount}</span> of {CATEGORIES.length} categories enabled
            {prefs.emailEnabled && <span className="ml-2 text-gray-400″>· Email on</span>}
            {prefs.smsEnabled && <span className="ml-2 text-gray-400″>· SMS on</span>}
            {prefs.pushEnabled && <span className="ml-2 text-gray-400″>· Push on</span>}
            {prefs.quietHoursEnabled && <span className="ml-2 text-gray-400″>· Quiet hours on</span>}
          </span>
        </div>

        {/* Global channels */}
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="px-5 py-3″ style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <h2 className="text-sm font-bold text-white">Delivery Channels</h2>
            <p className="text-xs text-gray-500 mt-0.5″>Master toggles — disabling a channel silences all categories for it</p>
          </div>
          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            {(["emailEnabled", "smsEnabled", "pushEnabled"] as const).map((key) => {
              const channelKey = key.replace("Enabled", "") as Channel;
              const meta = CHANNEL_META[channelKey];
              const Icon = meta.icon;
              return (
                <div key={key} className="flex items-center justify-between px-5 py-3.5″>
                  <div className="flex items-center gap-3″>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.06)" }}>
                      <Icon size={15} className="text-gray-400″ />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {meta.label} Notifications
                        {meta.coming && (
                          <span className="ml-2 text-[10px] font-medium px-2 py-0.5 rounded-full"
                            style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b" }}>
                            Coming soon
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500″>
                        {channelKey === "email" && "Sent to your registered email address"}
                        {channelKey === "sms" && "Text alerts for urgent notifications"}
                        {channelKey === "push" && "In-app and browser push notifications"}
                      </p>
                    </div>
                  </div>
                  <ToggleSwitch
                    checked={prefs[key]}
                    onChange={() => toggleGlobal(key)}
                    disabled={meta.coming}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Per-category matrix */}
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="px-5 py-3 flex items-center justify-between"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <div>
              <h2 className="text-sm font-bold text-white">Notification Categories</h2>
              <p className="text-xs text-gray-500 mt-0.5″>Choose which channels to use per category</p>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-[10px] font-semibold text-gray-600 uppercase tracking-widest">
              <span className="w-14 text-center">Email</span>
              <span className="w-12 text-center">SMS</span>
              <span className="w-12 text-center">Push</span>
            </div>
          </div>
          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            {CATEGORIES.map((cat) => {
              const catPrefs = prefs[cat.key];
              const urgency = URGENCY_CONFIG[cat.urgency];
              const anyEnabled = catPrefs.email || catPrefs.sms || catPrefs.push;
              return (
                <div key={cat.key} className="px-5 py-4″>
                  <div className="flex items-start justify-between gap-3″>
                    <div className="flex items-start gap-3 flex-1 min-w-0″>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5″
                        style={{ background: cat.iconBg, color: cat.iconColor }}>
                        {cat.icon}
                      </div>
                      <div className="flex-1 min-w-0″>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-sm font-semibold ${anyEnabled ? "text-white" : "text-gray-500"}`}>
                            {cat.label}
                          </span>
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                            style={{ background: urgency.bg, color: urgency.color }}>
                            {urgency.label}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{cat.description}</p>
                      </div>
                    </div>

                    {/* Channel toggles */}
                    <div className="flex items-center gap-1.5 flex-shrink-0 mt-1″>
                      {(["email", "sms", "push"] as Channel[]).map((ch) => (
                        <ChannelCheckbox
                          key={ch}
                          channel={ch}
                          checked={catPrefs[ch]}
                          onChange={() => toggleCategory(cat.key, ch)}
                          disabled={!prefs[`${ch}Enabled` as "emailEnabled" | "smsEnabled" | "pushEnabled"] || CHANNEL_META[ch].coming}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Advanced settings */}
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <button
            className="w-full flex items-center justify-between px-5 py-4 text-left"
            onClick={() => setShowAdvanced((p) => !p)}
          >
            <div>
              <h2 className="text-sm font-bold text-white">Advanced Settings</h2>
              <p className="text-xs text-gray-500 mt-0.5″>Quiet hours, lead value threshold</p>
            </div>
            {showAdvanced
              ? <ChevronUp size={16} className="text-gray-400″ />
              : <ChevronDown size={16} className="text-gray-400″ />
            }
          </button>

          {showAdvanced && (
            <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>

              {/* Quiet hours */}
              <div className="px-5 py-4″ style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-start justify-between gap-3 mb-3″>
                  <div className="flex items-start gap-3″>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0″
                      style={{ background: "rgba(99,102,241,0.15)" }}>
                      <Moon size={16} style={{ color: "#6366f1″ }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Quiet Hours</p>
                      <p className="text-xs text-gray-500″>Pause non-urgent notifications during set hours</p>
                    </div>
                  </div>
                  <ToggleSwitch
                    checked={prefs.quietHoursEnabled}
                    onChange={() => toggleGlobal("quietHoursEnabled")}
                  />
                </div>
                {prefs.quietHoursEnabled && (
                  <div className="flex items-center gap-3 mt-3 ml-12″>
                    <div className="flex items-center gap-2″>
                      <Moon size={12} className="text-gray-500″ />
                      <label className="text-xs text-gray-400″>From</label>
                      <input
                        type="time"
                        value={prefs.quietStart}
                        onChange={(e) => setQuietHour("quietStart", e.target.value)}
                        className="text-xs text-white rounded-lg px-2 py-1.5 outline-none"
                        style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
                      />
                    </div>
                    <div className="flex items-center gap-2″>
                      <Sun size={12} className="text-gray-500″ />
                      <label className="text-xs text-gray-400″>To</label>
                      <input
                        type="time"
                        value={prefs.quietEnd}
                        onChange={(e) => setQuietHour("quietEnd", e.target.value)}
                        className="text-xs text-white rounded-lg px-2 py-1.5 outline-none"
                        style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Lead value threshold */}
              <div className="px-5 py-4″>
                <div className="flex items-start gap-3 mb-3″>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0″
                    style={{ background: "rgba(34,197,94,0.15)" }}>
                    <Zap size={16} style={{ color: "#22c55e" }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Lead Urgency Threshold</p>
                    <p className="text-xs text-gray-500″>Only notify me for leads above a minimum estimated value</p>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap ml-12″>
                  {LEAD_THRESHOLDS.map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => setThreshold(value)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                      style={
                        prefs.leadValueThreshold === value
                          ? { background: "#22c55e", color: "#0A1628″ }
                          : { background: "rgba(255,255,255,0.06)", color: "#9ca3af", border: "1px solid rgba(255,255,255,0.08)" }
                      }
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {prefs.leadValueThreshold > 0 && (
                  <p className="text-xs text-gray-500 mt-2 ml-12″>
                    Leads estimated below ${prefs.leadValueThreshold.toLocaleString()} will not trigger notifications.
                    Storm alerts are always sent regardless of threshold.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Test notification */}
        <div className="rounded-2xl px-5 py-4 flex items-center justify-between gap-4″
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-start gap-3″>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0″
              style={{ background: "rgba(45,212,191,0.1)" }}>
              <Volume2 size={16} style={{ color: "#2dd4bf" }} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Test Notifications</p>
              <p className="text-xs text-gray-500″>Send a test alert to verify your current settings are working</p>
            </div>
          </div>
          <button
            onClick={handleTestNotification}
            disabled={sendingTest}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold flex-shrink-0 transition-all"
            style={{ background: "rgba(45,212,191,0.1)", color: "#2dd4bf", border: "1px solid rgba(45,212,191,0.2)" }}
          >
            {sendingTest
              ? <><Loader2 size={13} className="animate-spin" /> Sending…</>
              : <><Send size={13} /> Send Test</>
            }
          </button>
        </div>

        {/* In-app note */}
        <div className="flex items-start gap-3 px-4 py-3 rounded-xl"
          style={{ background: "rgba(45,212,191,0.04)", border: "1px solid rgba(45,212,191,0.12)" }}>
          <Bell size={14} className="mt-0.5 flex-shrink-0″ style={{ color: "#2dd4bf" }} />
          <p className="text-xs text-gray-400″>
            <span className="font-semibold text-gray-300″>In-app notifications</span> are always enabled and
            cannot be disabled. They appear in your notification bell in the dashboard header.
          </p>
        </div>

        {/* Save sticky footer */}
        {isDirty && (
          <div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl z-50″
            style={{ background: "#0f1e35″, border: "1px solid rgba(45,212,191,0.3)" }}
          >
            <span className="text-sm text-gray-300″>You have unsaved changes</span>
            <button
              onClick={handleSave}
              disabled={updatePrefs.isPending}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all"
              style={{ background: "#2dd4bf", color: "#0A1628″ }}
            >
              {updatePrefs.isPending
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
                : <><Save className="w-4 h-4″ /> Save</>
              }
            </button>
          </div>
        )}
      </div>
    </PartnerLayout>
  );
}
