import React from 'react';
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Settings, ToggleLeft, ToggleRight, DollarSign, Bell, Zap,
  AlertTriangle, CheckCircle, Shield, Globe, Mail, MessageSquare,
  Smartphone, ChevronDown, ChevronUp, Lock,
} from "lucide-react";
import { toast } from "sonner";

type PlatformMode = "pre-launch" | "beta" | "live";

interface FeatureFlag {
  key: string;
  label: string;
  description: string;
  enabled: boolean;
  dangerous?: boolean;
}

interface NotificationToggle {
  label: string;
  email: boolean;
  sms: boolean;
  push: boolean;
}

const INITIAL_FLAGS: FeatureFlag[] = [
  { key: "storm_dispatch", label: "Storm Dispatch", description: "Auto-route leads after NOAA severe weather events", enabled: true },
  { key: "photo_ai", label: "Photo AI Pipeline", description: "Automatic photo analysis and condition scoring", enabled: true },
  { key: "auto_approve", label: "Auto-Approve Partners", description: "Bypass manual review for verified trades", enabled: false },
  { key: "exchange", label: "Exchange Marketplace", description: "Pro-to-pro job exchange and bid board", enabled: false, dangerous: true },
  { key: "franchise", label: "Franchise Mode", description: "Territory licensing and franchise partner tiers", enabled: false, dangerous: true },
  { key: "guest_checkout", label: "Guest Checkout", description: "Allow homeowners to submit without account creation", enabled: true },
];

const PARTNER_NOTIFICATIONS: NotificationToggle[] = [
  { label: "New lead available", email: true, sms: true, push: true },
  { label: "Lead expired", email: true, sms: false, push: true },
  { label: "Commission earned", email: true, sms: false, push: true },
  { label: "Tier upgrade", email: true, sms: true, push: true },
  { label: "Referral joined", email: true, sms: false, push: false },
];

const HOMEOWNER_NOTIFICATIONS: NotificationToggle[] = [
  { label: "Pro matched", email: true, sms: true, push: true },
  { label: "Job status update", email: true, sms: false, push: true },
  { label: "Deal in area", email: false, sms: false, push: true },
  { label: "Home health reminder", email: true, sms: false, push: false },
];

const MODE_CONFIG: Record<PlatformMode, { label: string; color: string; bg: string; border: string; description: string }> = {
  "pre-launch": {
    label: "Pre-Launch",
    color: "text-amber-400",
    bg: "bg-amber-500/20",
    border: "border-amber-500/50",
    description: "Waitlist collection only. No live matching or payments.",
  },
  "beta": {
    label: "Beta",
    color: "text-blue-400",
    bg: "bg-blue-500/20",
    border: "border-blue-500/50",
    description: "Limited partners active. Manual review required for all jobs.",
  },
  "live": {
    label: "Live",
    color: "text-green-400",
    bg: "bg-green-500/20",
    border: "border-green-500/50",
    description: "Full platform operational. All features available.",
  },
};

function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <div className="w-9 h-9 rounded-xl bg-slate-700/60 flex items-center justify-center flex-shrink-0 text-teal-400">
        {icon}
      </div>
      <div>
        <h2 className="text-base font-bold text-white">{title}</h2>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

function NotificationRow({ row, onChange }: {
  row: NotificationToggle;
  onChange: (updated: NotificationToggle) => void;
}) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-slate-800 last:border-0">
      <span className="flex-1 text-xs text-slate-300">{row.label}</span>
      {(["email", "sms", "push"] as const).map(ch => (
        <button
          key={ch}
          onClick={() => onChange({ ...row, [ch]: !row[ch] })}
          className="flex flex-col items-center gap-0.5"
        >
          {row[ch]
            ? <ToggleRight className="w-5 h-5 text-teal-400" />
            : <ToggleLeft className="w-5 h-5 text-slate-600" />}
          <span className="text-[9px] text-slate-600 uppercase">{ch}</span>
        </button>
      ))}
    </div>
  );
}

export default function PlatformSettings() {
  const [flags, setFlags] = useState<FeatureFlag[]>(INITIAL_FLAGS);
  const [platformMode, setPlatformMode] = useState<PlatformMode>("pre-launch");
  const [pendingMode, setPendingMode] = useState<PlatformMode | null>(null);
  const [partnerNotifs, setPartnerNotifs] = useState(PARTNER_NOTIFICATIONS);
  const [homeownerNotifs, setHomeownerNotifs] = useState(HOMEOWNER_NOTIFICATIONS);
  const [expandedSection, setExpandedSection] = useState<string | null>("flags");

  const toggleFlag = (key: string) => {
    setFlags(prev => prev.map(f => f.key === key ? { ...f, enabled: !f.enabled } : f));
    const flag = flags.find(f => f.key === key);
    if (flag) toast.success(`${flag.label} ${flag.enabled ? "disabled" : "enabled"}`);
  };

  const confirmModeChange = () => {
    if (!pendingMode) return;
    setPlatformMode(pendingMode);
    setPendingMode(null);
    toast.success(`Platform mode set to: ${MODE_CONFIG[pendingMode].label}`);
  };

  const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => {
    const open = expandedSection === id;
    return (
      <div className="bg-[#0F1E35] rounded-2xl border border-slate-700/50 overflow-hidden mb-4">
        <button
          className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-800/30 transition-colors"
          onClick={() => setExpandedSection(open ? null : id)}
        >
          <span className="text-sm font-semibold text-white">{title}</span>
          {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>
        {open && <div className="px-5 pb-5 pt-1">{children}</div>}
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#0A1628] p-4 md:p-6">
        <div className="max-w-3xl mx-auto">

          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <Settings className="w-7 h-7 text-teal-400" /> Platform Settings
            </h1>
            <p className="text-slate-400 mt-1 text-sm">Feature flags, commission rates, routing, and notification configuration</p>
          </div>

          <div className="bg-[#0F1E35] rounded-2xl border border-slate-700/50 p-5 mb-4">
            <SectionHeader
              icon={<Globe className="w-5 h-5" />}
              title="Platform Mode"
              subtitle="Controls what features and flows are accessible to users"
            />
            <div className="grid grid-cols-3 gap-3 mb-4">
              {(["pre-launch", "beta", "live"] as PlatformMode[]).map(m => {
                const cfg = MODE_CONFIG[m];
                const active = platformMode === m;
                return (
                  <button
                    key={m}
                    onClick={() => { if (!active) setPendingMode(m); }}
                    className={[
                      "rounded-xl border px-3 py-3 text-left transition-all",
                      active ? `${cfg.bg} ${cfg.border}` : "bg-transparent border-slate-700/50 hover:border-slate-600",
                    ].join(" ")}
                  >
                    <div className={`text-sm font-bold ${active ? cfg.color : "text-slate-400"}`}>{cfg.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{cfg.description}</div>
                  </button>
                );
              })}
            </div>
            {pendingMode && (
              <div className="bg-amber-900/20 border border-amber-700/40 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <p className="text-xs text-amber-300 flex-1">
                  Switch to <strong>{MODE_CONFIG[pendingMode].label}</strong>? This affects all users immediately.
                </p>
                <div className="flex gap-2">
                  <Button size="sm" onClick={confirmModeChange} className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold text-xs">
                    Confirm
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setPendingMode(null)} className="border-slate-600 text-slate-400 bg-transparent text-xs">
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>

          <Section id="flags" title="Feature Flags">
            <div className="flex flex-col gap-0">
              {flags.map(f => (
                <div key={f.key} className="flex items-center justify-between py-3 border-b border-slate-800 last:border-0">
                  <div className="flex-1 mr-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{f.label}</span>
                      {f.dangerous && (
                        <span className="text-[9px] font-bold text-orange-400 bg-orange-500/15 px-1.5 py-0.5 rounded-full uppercase">Caution</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{f.description}</p>
                  </div>
                  <button onClick={() => toggleFlag(f.key)} className="flex items-center gap-2">
                    {f.enabled
                      ? <ToggleRight className="w-7 h-7 text-teal-400" />
                      : <ToggleLeft className="w-7 h-7 text-slate-600" />}
                    <span className={`text-xs font-semibold w-6 ${f.enabled ? "text-teal-400" : "text-slate-600"}`}>
                      {f.enabled ? "ON" : "OFF"}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </Section>

          <Section id="commission" title="Commission Settings">
            <div className="flex items-center gap-2 mb-4 p-3 bg-slate-800/50 rounded-xl border border-slate-700/40">
              <Lock className="w-4 h-4 text-slate-500 flex-shrink-0" />
              <p className="text-xs text-slate-400">These rates are locked by engineering. Contact engineering to change rates.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "Partner Keep Rate", value: "72%", color: "text-teal-400" },
                { label: "Network L1 Override", value: "7%", color: "text-blue-400" },
                { label: "Network L2 Override", value: "4%", color: "text-blue-400" },
                { label: "Network L3 Override", value: "2%", color: "text-blue-400" },
                { label: "Network L4 Override", value: "1%", color: "text-blue-400" },
                { label: "Monthly Subscription", value: "$149/mo", color: "text-amber-400" },
                { label: "Sub Override L1", value: "12%", color: "text-purple-400" },
                { label: "Sub Override L2", value: "6%", color: "text-purple-400" },
                { label: "Origination Rights", value: "1.5%", color: "text-green-400" },
                { label: "Min Payout", value: "$25", color: "text-slate-400" },
                { label: "Payout Cycle", value: "Monthly", color: "text-slate-400" },
                { label: "Waitlist Cap", value: "500 apps", color: "text-orange-400" },
              ].map(item => (
                <div key={item.label} className="bg-[#0A1628] rounded-xl border border-slate-800 p-3">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">{item.label}</p>
                  <p className={`text-base font-bold ${item.color}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="leads" title="Lead Settings">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Charter Tier Weekly Cap", value: "5 leads", edit: true },
                { label: "Founding Tier Weekly Cap", value: "10 leads", edit: true },
                { label: "L3 Tier Weekly Cap", value: "20 leads", edit: true },
                { label: "L4 Tier Weekly Cap", value: "Unlimited", edit: false },
                { label: "Lead Expiry", value: "24 hours", edit: true },
                { label: "Re-route Delay", value: "30 min", edit: true },
                { label: "Max Routing Queue", value: "10 partners", edit: true },
                { label: "Auto-close Expired", value: "Yes", edit: false },
              ].map(item => (
                <div key={item.label} className="bg-[#0A1628] rounded-xl border border-slate-800 p-3 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wide">{item.label}</p>
                    <p className="text-sm font-bold text-white mt-0.5">{item.value}</p>
                  </div>
                  {item.edit && (
                    <button className="text-[10px] text-teal-400 border border-teal-700/40 rounded px-1.5 py-0.5 hover:bg-teal-900/30">
                      Edit
                    </button>
                  )}
                </div>
              ))}
            </div>
          </Section>

          <Section id="notifications" title="Notification Settings">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-4 h-4 text-teal-400" />
                <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Partner Notifications</h3>
                <div className="ml-auto flex gap-4 text-[10px] text-slate-600 uppercase">
                  <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> Email</span>
                  <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> SMS</span>
                  <span className="flex items-center gap-1"><Smartphone className="w-3 h-3" /> Push</span>
                </div>
              </div>
              {partnerNotifs.map((row, i) => (
                <NotificationRow
                  key={i}
                  row={row}
                  onChange={updated => setPartnerNotifs(prev => prev.map((r, j) => j === i ? updated : r))}
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3 mt-5">
                <Bell className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Homeowner Notifications</h3>
                <div className="ml-auto flex gap-4 text-[10px] text-slate-600 uppercase">
                  <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> Email</span>
                  <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> SMS</span>
                  <span className="flex items-center gap-1"><Smartphone className="w-3 h-3" /> Push</span>
                </div>
              </div>
              {homeownerNotifs.map((row, i) => (
                <NotificationRow
                  key={i}
                  row={row}
                  onChange={updated => setHomeownerNotifs(prev => prev.map((r, j) => j === i ? updated : r))}
                />
              ))}
            </div>
            <Button
              className="mt-4 bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold text-xs"
              onClick={() => toast.success("Notification settings saved")}
            >
              <CheckCircle className="w-3.5 h-3.5 mr-1.5" /> Save Notification Settings
            </Button>
          </Section>

          <div className="bg-[#0F1E35] rounded-2xl border border-slate-700/50 p-5">
            <SectionHeader
              icon={<Shield className="w-5 h-5" />}
              title="Danger Zone"
              subtitle="Destructive actions — cannot be undone without engineering support"
            />
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="border-red-700/50 text-red-400 hover:bg-red-900/20 bg-transparent text-xs flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" /> Reset All Feature Flags
              </Button>
              <Button variant="outline" className="border-red-700/50 text-red-400 hover:bg-red-900/20 bg-transparent text-xs flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Force Waitlist Close
              </Button>
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}
