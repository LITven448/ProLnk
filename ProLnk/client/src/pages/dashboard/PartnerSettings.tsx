import { useState } from "react";
import {
  Camera, Save, Plus, X, ChevronRight, Check,
  Bell, CreditCard, MapPin, Lock, User,
  Droplets, Zap, Wind, Home, Hammer, Wrench,
  Sun, Wifi, Leaf, Shield, AlertTriangle,
  Minus, DollarSign, ToggleLeft, ToggleRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type Tab = "profile" | "notifications" | "payout" | "service-area" | "privacy";

const TABS: { id: Tab; label: string; icon: typeof User }[] = [
  { id: "profile",      label: "Profile",       icon: User },
  { id: "notifications",label: "Notifications", icon: Bell },
  { id: "payout",       label: "Payout",        icon: CreditCard },
  { id: "service-area", label: "Service Area",  icon: MapPin },
  { id: "privacy",      label: "Privacy",       icon: Lock },
];

const TRADE_OPTIONS = [
  { label: "Plumbing",   icon: Droplets },
  { label: "Electrical", icon: Zap },
  { label: "HVAC",       icon: Wind },
  { label: "Roofing",    icon: Home },
  { label: "General",    icon: Hammer },
  { label: "Handyman",   icon: Wrench },
  { label: "Solar",      icon: Sun },
  { label: "Smart Home", icon: Wifi },
];

const NOTIF_ROWS = [
  { id: "new_lead",       label: "New lead available",    desc: "When a new job matches your trades" },
  { id: "lead_matched",   label: "Lead matched to me",    desc: "When ProLnk assigns you a lead" },
  { id: "job_reminder",   label: "Job reminder",          desc: "24-hour reminder before scheduled jobs" },
  { id: "payment",        label: "Payment received",      desc: "When a payout is processed" },
  { id: "network",        label: "Network activity",      desc: "When someone joins your downline" },
  { id: "digest",         label: "Weekly digest",         desc: "Summary of your performance" },
  { id: "storm",          label: "Storm alerts",          desc: "Weather events in your service area" },
];

type NotifState = Record<string, { email: boolean; sms: boolean; push: boolean }>;

function buildDefaultNotifs(): NotifState {
  const s: NotifState = {};
  for (const r of NOTIF_ROWS) {
    s[r.id] = { email: true, sms: r.id === "new_lead" || r.id === "payment", push: true };
  }
  return s;
}

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`w-10 h-5 rounded-full transition-colors flex items-center px-0.5 ${on ? "bg-[#00B5B8]" : "bg-white/20"}`}
    >
      <span className={`w-4 h-4 rounded-full bg-white transition-transform ${on ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

export default function PartnerSettings() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  // Profile state
  const [displayName, setDisplayName] = useState("Marcus Williams");
  const [businessName, setBusinessName] = useState("Williams Plumbing LLC");
  const [phone, setPhone] = useState("(214) 555-0192");
  const [bio, setBio] = useState("Licensed master plumber with 8 years serving DFW.");
  const [selectedTrades, setSelectedTrades] = useState<string[]>(["Plumbing"]);

  // Notifications state
  const [notifs, setNotifs] = useState<NotifState>(buildDefaultNotifs);

  // Payout state
  const [payoutSchedule, setPayoutSchedule] = useState("weekly");
  const [minThreshold, setMinThreshold] = useState("50");
  const [stripeConnected] = useState(false);

  // Service area state
  const [zips, setZips] = useState<string[]>(["75201", "75202", "75203", "75204", "75205"]);
  const [newZip, setNewZip] = useState("");
  const [radius, setRadius] = useState(25);

  // Privacy state
  const [profilePublic, setProfilePublic] = useState(true);
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [allowReviews, setAllowReviews] = useState(true);

  function toggleTrade(trade: string) {
    setSelectedTrades((prev) =>
      prev.includes(trade) ? prev.filter((t) => t !== trade) : [...prev, trade]
    );
  }

  function toggleNotif(id: string, channel: "email" | "sms" | "push") {
    setNotifs((prev) => ({
      ...prev,
      [id]: { ...prev[id], [channel]: !prev[id][channel] },
    }));
  }

  function addZip() {
    const z = newZip.trim();
    if (z.length === 5 && /^\d+$/.test(z) && !zips.includes(z)) {
      setZips((prev) => [...prev, z]);
      setNewZip("");
    }
  }

  function save() {
    toast.success("Settings saved");
  }

  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

        {/* Tab bar */}
        <div className="flex gap-1 bg-white/5 rounded-xl p-1 mb-8 overflow-x-auto">
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === t.id
                    ? "bg-[#00B5B8] text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-[#00B5B8]/20 border-2 border-[#00B5B8] flex items-center justify-center text-2xl font-bold">
                  MW
                </div>
                <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#00B5B8] rounded-full flex items-center justify-center hover:bg-[#00a0a3] transition-colors">
                  <Camera className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
              <div>
                <p className="font-medium">Profile Photo</p>
                <p className="text-sm text-white/50">JPG or PNG, max 5MB</p>
                <Button variant="outline" size="sm" className="mt-2 border-white/20 text-white hover:bg-white/10 text-xs">
                  Upload Photo
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-white/70 text-sm">Display Name</Label>
                <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="bg-white/5 border-white/10 text-white mt-1" />
              </div>
              <div>
                <Label className="text-white/70 text-sm">Business Name</Label>
                <Input value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="bg-white/5 border-white/10 text-white mt-1" />
              </div>
              <div>
                <Label className="text-white/70 text-sm">Phone</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-white/5 border-white/10 text-white mt-1" />
              </div>
              <div>
                <Label className="text-white/70 text-sm">Email</Label>
                <Input value="marcus@williamsplumbing.com" readOnly className="bg-white/5 border-white/10 text-white/40 mt-1 cursor-not-allowed" />
              </div>
            </div>

            <div>
              <Label className="text-white/70 text-sm">Bio</Label>
              <Textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="bg-white/5 border-white/10 text-white mt-1 resize-none" />
            </div>

            <div>
              <Label className="text-white/70 text-sm mb-2 block">Specialties</Label>
              <div className="flex flex-wrap gap-2">
                {TRADE_OPTIONS.map((t) => {
                  const Icon = t.icon;
                  const active = selectedTrades.includes(t.label);
                  return (
                    <button
                      key={t.label}
                      onClick={() => toggleTrade(t.label)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors ${
                        active
                          ? "bg-[#00B5B8] text-white"
                          : "bg-white/5 text-white/60 border border-white/10 hover:border-white/30"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {t.label}
                      {active && <Check className="w-3 h-3" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-white/70 text-sm">License Number</Label>
                <div className="flex gap-2 mt-1">
                  <Input placeholder="e.g. M-12345" className="bg-white/5 border-white/10 text-white" />
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 shrink-0 text-sm">Upload</Button>
                </div>
              </div>
              <div>
                <Label className="text-white/70 text-sm">Insurance Expiry</Label>
                <Input type="date" className="bg-white/5 border-white/10 text-white mt-1" />
              </div>
            </div>

            <Button onClick={save} className="bg-[#00B5B8] hover:bg-[#00a0a3] text-white gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="space-y-2">
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 mb-2 pr-2">
              <div />
              {["Email", "SMS", "Push"].map((c) => (
                <div key={c} className="text-xs text-white/50 text-center w-12">{c}</div>
              ))}
            </div>
            {NOTIF_ROWS.map((row) => (
              <div key={row.id} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 grid grid-cols-[1fr_auto_auto_auto] items-center gap-4">
                <div>
                  <p className="text-sm font-medium">{row.label}</p>
                  <p className="text-xs text-white/50">{row.desc}</p>
                </div>
                {(["email", "sms", "push"] as const).map((ch) => (
                  <div key={ch} className="flex justify-center w-12">
                    <Toggle on={notifs[row.id][ch]} onToggle={() => toggleNotif(row.id, ch)} />
                  </div>
                ))}
              </div>
            ))}
            <div className="pt-4">
              <Button onClick={save} className="bg-[#00B5B8] hover:bg-[#00a0a3] text-white gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </div>
        )}

        {/* Payout Tab */}
        {activeTab === "payout" && (
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#00B5B8]" />
                Payout Method
              </h3>
              {stripeConnected ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#00B5B8]/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-[#00B5B8]" />
                  </div>
                  <div>
                    <p className="font-medium">Bank Account ••••4242</p>
                    <p className="text-sm text-white/50">Stripe Connect — Verified</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <AlertTriangle className="w-10 h-10 text-yellow-400 mx-auto mb-2" />
                  <p className="font-medium mb-1">No payout method connected</p>
                  <p className="text-sm text-white/50 mb-4">Connect your bank account to receive earnings</p>
                  <Button className="bg-[#00B5B8] hover:bg-[#00a0a3] text-white">Connect Bank Account</Button>
                </div>
              )}
            </div>

            <div>
              <Label className="text-white/70 text-sm mb-2 block">Payout Schedule</Label>
              <div className="flex gap-3">
                {[["weekly", "Weekly"], ["biweekly", "Biweekly"], ["monthly", "Monthly"]].map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setPayoutSchedule(val)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                      payoutSchedule === val
                        ? "bg-[#00B5B8] border-[#00B5B8] text-white"
                        : "bg-white/5 border-white/10 text-white/60 hover:border-white/30"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-white/70 text-sm mb-2 block">Minimum Payout Threshold</Label>
              <div className="flex gap-3">
                {[["25", "$25"], ["50", "$50"], ["100", "$100"]].map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setMinThreshold(val)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                      minThreshold === val
                        ? "bg-[#00B5B8] border-[#00B5B8] text-white"
                        : "bg-white/5 border-white/10 text-white/60 hover:border-white/30"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <Button onClick={save} className="bg-[#00B5B8] hover:bg-[#00a0a3] text-white gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        )}

        {/* Service Area Tab */}
        {activeTab === "service-area" && (
          <div className="space-y-6">
            <div>
              <Label className="text-white/70 text-sm mb-2 block">Service Radius</Label>
              <div className="flex items-center gap-4">
                <Minus className="w-4 h-4 text-white/40" />
                <input
                  type="range"
                  min={5}
                  max={50}
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  className="flex-1 accent-[#00B5B8]"
                />
                <Plus className="w-4 h-4 text-white/40" />
                <span className="text-[#00B5B8] font-bold w-16 text-right">{radius} mi</span>
              </div>
            </div>

            <div>
              <Label className="text-white/70 text-sm mb-2 block">ZIP Codes</Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {zips.map((z) => (
                  <div key={z} className="flex items-center gap-1 px-3 py-1 bg-[#00B5B8]/20 border border-[#00B5B8]/40 rounded-full text-sm">
                    {z}
                    <button onClick={() => setZips((p) => p.filter((x) => x !== z))}>
                      <X className="w-3 h-3 text-white/60 hover:text-white ml-1" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newZip}
                  onChange={(e) => setNewZip(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addZip()}
                  placeholder="Add ZIP code..."
                  maxLength={5}
                  className="bg-white/5 border-white/10 text-white w-36"
                />
                <Button onClick={addZip} variant="outline" className="border-white/20 text-white hover:bg-white/10 gap-1">
                  <Plus className="w-4 h-4" />
                  Add
                </Button>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="h-48 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0D1F3C 0%, #00B5B810 100%)" }}>
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-[#00B5B8] mx-auto mb-2" />
                  <p className="text-sm text-white/50">Coverage map</p>
                  <p className="text-xs text-white/30">{radius}-mile radius · {zips.length} ZIP codes</p>
                </div>
              </div>
            </div>

            <Button onClick={save} className="bg-[#00B5B8] hover:bg-[#00a0a3] text-white gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        )}

        {/* Privacy Tab */}
        {activeTab === "privacy" && (
          <div className="space-y-4">
            {[
              { label: "Public Profile", desc: "Allow homeowners to find and view your profile", val: profilePublic, set: setProfilePublic },
              { label: "Show Phone Number", desc: "Display phone on public profile", val: showPhone, set: setShowPhone },
              { label: "Show Email Address", desc: "Display email on public profile", val: showEmail, set: setShowEmail },
              { label: "Allow Reviews", desc: "Homeowners can leave reviews on your profile", val: allowReviews, set: setAllowReviews },
            ].map((row) => (
              <div key={row.label} className="bg-white/5 border border-white/10 rounded-xl px-4 py-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{row.label}</p>
                  <p className="text-xs text-white/50">{row.desc}</p>
                </div>
                <Toggle on={row.val} onToggle={() => row.set(!row.val)} />
              </div>
            ))}
            <div className="pt-2">
              <Button onClick={save} className="bg-[#00B5B8] hover:bg-[#00a0a3] text-white gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
