import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Shield, Plus, X, ExternalLink, Search, BookOpen,
  AlertTriangle, CheckCircle, Clock, Wrench, ChevronRight,
} from "lucide-react";
import { useLocation } from "wouter";

interface Appliance {
  id: string;
  type: string;
  brand: string;
  model: string;
  serial: string;
  purchaseDate: string;
  warrantyYears: number;
}

const APPLIANCE_TYPES = [
  "HVAC / Furnace", "Air Conditioner", "Water Heater", "Refrigerator", "Dishwasher",
  "Washer", "Dryer", "Oven / Range", "Microwave", "Garbage Disposal",
  "Roof", "Windows", "Siding", "Garage Door", "Other",
];

const TYPE_ICONS: Record<string, string> = {
  "HVAC / Furnace": "🌡️",
  "Air Conditioner": "❄️",
  "Water Heater": "🔥",
  "Refrigerator": "🧊",
  "Dishwasher": "🫧",
  "Washer": "🫧",
  "Dryer": "🌀",
  "Oven / Range": "🍳",
  "Roof": "🏠",
  "Windows": "🪟",
  "Siding": "🏡",
  "Garage Door": "🚗",
};

function getExpiryDate(purchaseDate: string, warrantyYears: number): Date | null {
  if (!purchaseDate) return null;
  const d = new Date(purchaseDate);
  d.setFullYear(d.getFullYear() + warrantyYears);
  return d;
}

function getStatus(expiry: Date | null): "active" | "expiring" | "expired" {
  if (!expiry) return "expired";
  const msLeft = expiry.getTime() - Date.now();
  const daysLeft = msLeft / (1000 * 60 * 60 * 24);
  if (daysLeft < 0) return "expired";
  if (daysLeft <= 365) return "expiring";
  return "active";
}

const STATUS_CONFIG = {
  active: {
    label: "Active",
    badgeClass: "bg-teal-500/20 text-teal-400 border-teal-500/30″,
    icon: <CheckCircle className="h-3.5 w-3.5″ />,
  },
  expiring: {
    label: "Expiring Soon",
    badgeClass: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30″,
    icon: <Clock className="h-3.5 w-3.5″ />,
  },
  expired: {
    label: "Expired",
    badgeClass: "bg-red-500/20 text-red-400 border-red-500/30″,
    icon: <AlertTriangle className="h-3.5 w-3.5″ />,
  },
};

const SAMPLE_APPLIANCES: Appliance[] = [
  { id: "1″, type: "HVAC / Furnace", brand: "Carrier", model: "59TP6A060", serial: "1122ABCD", purchaseDate: "2022-04-10", warrantyYears: 5 },
  { id: "2″, type: "Water Heater", brand: "Rheem", model: "XE40M06", serial: "WH334455", purchaseDate: "2021-09-15", warrantyYears: 6 },
  { id: "3″, type: "Dishwasher", brand: "Bosch", model: "SHPM88Z75N", serial: "DW9900XZ", purchaseDate: "2019-06-01", warrantyYears: 5 },
];

export default function WarrantyTracker() {
  const [, navigate] = useLocation();
  const [appliances, setAppliances] = useState<Appliance[]>(SAMPLE_APPLIANCES);
  const [showForm, setShowForm] = useState(false);
  const [manualSearch, setManualSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "expiring" | "expired">("all");

  const [form, setForm] = useState<Partial<Appliance>>({
    type: "", brand: "", model: "", serial: "", purchaseDate: "", warrantyYears: 1,
  });

  const handleAdd = () => {
    if (!form.type || !form.brand || !form.purchaseDate) return;
    const newItem: Appliance = {
      id: Date.now().toString(),
      type: form.type!,
      brand: form.brand!,
      model: form.model || "",
      serial: form.serial || "",
      purchaseDate: form.purchaseDate!,
      warrantyYears: Number(form.warrantyYears) || 1,
    };
    setAppliances(prev => [newItem, ...prev]);
    setForm({ type: "", brand: "", model: "", serial: "", purchaseDate: "", warrantyYears: 1 });
    setShowForm(false);
  };

  const handleRemove = (id: string) => setAppliances(prev => prev.filter(a => a.id !== id));

  const manualSearchUrl = manualSearch
    ? `https://www.google.com/search?q=${encodeURIComponent(manualSearch + " owner manual PDF")}`
    : null;

  const counts = { active: 0, expiring: 0, expired: 0 };
  appliances.forEach(a => {
    const expiry = getExpiryDate(a.purchaseDate, a.warrantyYears);
    counts[getStatus(expiry)]++;
  });

  const filteredAppliances = appliances.filter(a => {
    if (filterStatus === "all") return true;
    const expiry = getExpiryDate(a.purchaseDate, a.warrantyYears);
    return getStatus(expiry) === filterStatus;
  });

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628]">
        <div className="container max-w-3xl mx-auto px-4 py-8 space-y-6 pb-10″>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2″>
                <Shield className="h-6 w-6 text-teal-400″ />
                Warranty Tracker
              </h1>
              <p className="text-slate-400 mt-1 text-sm">Track warranties for all your home appliances and systems.</p>
            </div>
            <Button
              onClick={() => setShowForm(v => !v)}
              className="bg-teal-600 hover:bg-teal-700 text-white gap-2″
              size="sm"
            >
              <Plus className="h-4 w-4″ />
              Add appliance
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3″>
            {(["active", "expiring", "expired"] as const).map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(filterStatus === s ? "all" : s)}
                className={`rounded-xl border transition-all p-4 text-center ${
                  filterStatus === s
                    ? s === "active" ? "bg-teal-600/20 border-teal-500/60″ : s === "expiring" ? "bg-yellow-600/20 border-yellow-500/60" : "bg-red-600/20 border-red-500/60"
                    : "bg-slate-800/60 border-slate-700 hover:border-slate-600″
                }`}
              >
                <p className="text-2xl font-bold text-white">{counts[s]}</p>
                <div className="flex items-center justify-center gap-1 mt-1″>
                  <span className={STATUS_CONFIG[s].badgeClass.split(" ")[1]}>{STATUS_CONFIG[s].icon}</span>
                  <span className="text-xs text-slate-400″>{STATUS_CONFIG[s].label}</span>
                </div>
              </button>
            ))}
          </div>

          {(counts.expiring > 0 || counts.expired > 0) && (
            <Card className="bg-yellow-900/20 border-yellow-500/30″>
              <CardContent className="pt-4 pb-3″>
                <div className="flex items-start gap-2″>
                  <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 shrink-0″ />
                  <div>
                    <p className="text-yellow-300 text-sm font-semibold">Warranty attention needed</p>
                    <p className="text-slate-400 text-xs mt-0.5″>
                      {counts.expiring > 0 && `${counts.expiring} warranty${counts.expiring !== 1 ? "ies" : "y"} expiring within 12 months. `}
                      {counts.expired > 0 && `${counts.expired} warranty${counts.expired !== 1 ? "ies" : "y"} have already expired.`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {showForm && (
            <Card className="bg-slate-800/60 border-teal-600/40″>
              <CardHeader className="pb-3″>
                <CardTitle className="text-white text-base flex items-center justify-between">
                  Add appliance
                  <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white">
                    <X className="h-4 w-4″ />
                  </button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4″>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4″>
                  <div className="space-y-1.5″>
                    <Label className="text-slate-300 text-sm">Appliance type</Label>
                    <select
                      value={form.type}
                      onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                      className="w-full bg-slate-900 border border-slate-600 text-white rounded-md px-3 py-2 text-sm"
                    >
                      <option value="">Select type...</option>
                      {APPLIANCE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5″>
                    <Label className="text-slate-300 text-sm">Brand</Label>
                    <Input
                      placeholder="e.g. Carrier, Bosch, Rheem"
                      value={form.brand}
                      onChange={e => setForm(f => ({ ...f, brand: e.target.value }))}
                      className="bg-slate-900 border-slate-600 text-white placeholder:text-slate-500″
                    />
                  </div>
                  <div className="space-y-1.5″>
                    <Label className="text-slate-300 text-sm">Model number</Label>
                    <Input
                      placeholder="e.g. XE40M06ST"
                      value={form.model}
                      onChange={e => setForm(f => ({ ...f, model: e.target.value }))}
                      className="bg-slate-900 border-slate-600 text-white placeholder:text-slate-500″
                    />
                  </div>
                  <div className="space-y-1.5″>
                    <Label className="text-slate-300 text-sm">Serial number</Label>
                    <Input
                      placeholder="Found on data tag"
                      value={form.serial}
                      onChange={e => setForm(f => ({ ...f, serial: e.target.value }))}
                      className="bg-slate-900 border-slate-600 text-white placeholder:text-slate-500″
                    />
                  </div>
                  <div className="space-y-1.5″>
                    <Label className="text-slate-300 text-sm">Purchase date</Label>
                    <Input
                      type="date"
                      value={form.purchaseDate}
                      onChange={e => setForm(f => ({ ...f, purchaseDate: e.target.value }))}
                      className="bg-slate-900 border-slate-600 text-white"
                    />
                  </div>
                  <div className="space-y-1.5″>
                    <Label className="text-slate-300 text-sm">Warranty length (years)</Label>
                    <Input
                      type="number"
                      min={1}
                      max={25}
                      value={form.warrantyYears}
                      onChange={e => setForm(f => ({ ...f, warrantyYears: Number(e.target.value) }))}
                      className="bg-slate-900 border-slate-600 text-white"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleAdd}
                  disabled={!form.type || !form.brand || !form.purchaseDate}
                  className="bg-teal-600 hover:bg-teal-700 text-white w-full"
                >
                  Save appliance
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="space-y-3″>
            {filteredAppliances.length === 0 && (
              <Card className="bg-slate-800/60 border-slate-700″>
                <CardContent className="py-10 text-center">
                  <Shield className="h-10 w-10 text-slate-600 mx-auto mb-3″ />
                  <p className="text-slate-400 text-sm">
                    {filterStatus === "all"
                      ? "No appliances tracked yet. Add your first one above."
                      : `No ${filterStatus} warranties. Click the card above to clear filter.`}
                  </p>
                </CardContent>
              </Card>
            )}
            {filteredAppliances.map(appliance => {
              const expiry = getExpiryDate(appliance.purchaseDate, appliance.warrantyYears);
              const status = getStatus(expiry);
              const sc = STATUS_CONFIG[status];
              const daysLeft = expiry ? Math.ceil((expiry.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : null;
              const emoji = TYPE_ICONS[appliance.type] ?? "🔧";

              return (
                <Card
                  key={appliance.id}
                  className={`bg-slate-800/60 border-slate-700 transition-all ${
                    status === "expired" ? "opacity-70″ : "hover:border-teal-600/40"
                  } ${status === "expiring" ? "border-l-2 border-l-yellow-500″ : status === "expired" ? "border-l-2 border-l-red-500" : ""}`}
                >
                  <CardContent className="pt-4 pb-4″>
                    <div className="flex items-start justify-between gap-3″>
                      <div className="flex items-start gap-3 flex-1 min-w-0″>
                        <div className="w-10 h-10 rounded-xl bg-slate-700/60 flex items-center justify-center text-xl shrink-0″>
                          {emoji}
                        </div>
                        <div className="flex-1 min-w-0″>
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-white font-medium">{appliance.brand} {appliance.type}</p>
                            <Badge className={`text-xs border flex items-center gap-1 ${sc.badgeClass}`}>
                              {sc.icon}
                              {sc.label}
                            </Badge>
                          </div>
                          {appliance.model && (
                            <p className="text-slate-400 text-xs mt-0.5″>
                              {appliance.model}{appliance.serial ? ` · S/N: ${appliance.serial}` : ""}
                            </p>
                          )}
                          <div className="flex items-center gap-4 mt-2 flex-wrap">
                            <p className="text-slate-500 text-xs">
                              Purchased {new Date(appliance.purchaseDate).toLocaleDateString()}
                            </p>
                            {expiry && (
                              <p className="text-slate-500 text-xs">
                                Expires {expiry.toLocaleDateString()}
                                {daysLeft !== null && daysLeft > 0 && (
                                  <span className={`ml-1 ${status === "expiring" ? "text-yellow-400" : "text-slate-600"}`}>
                                    ({daysLeft} days left)
                                  </span>
                                )}
                                {daysLeft !== null && daysLeft <= 0 && (
                                  <span className="ml-1 text-red-400″>
                                    ({Math.abs(daysLeft)} days ago)
                                  </span>
                                )}
                              </p>
                            )}
                          </div>
                          {status === "expired" && (
                            <button
                              onClick={() => navigate("/trustypro/book")}
                              className="mt-2 text-xs text-teal-400 hover:underline flex items-center gap-1″
                            >
                              <Wrench className="h-3 w-3″ />
                              Get a quote for repair or replacement
                              <ChevronRight className="h-3 w-3″ />
                            </button>
                          )}
                          {status === "expiring" && (
                            <p className="mt-2 text-xs text-yellow-400 flex items-center gap-1″>
                              <AlertTriangle className="h-3 w-3″ />
                              Expiring within 12 months — review coverage now
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemove(appliance.id)}
                        className="text-slate-600 hover:text-red-400 flex-shrink-0 mt-1 transition-colors"
                      >
                        <X className="h-4 w-4″ />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="bg-slate-800/60 border-slate-700″>
            <CardHeader className="pb-3″>
              <CardTitle className="text-white text-base flex items-center gap-2″>
                <BookOpen className="h-4 w-4 text-teal-400″ />
                Find owner's manual
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3″>
              <p className="text-slate-400 text-sm">Enter a brand and model number to find the owner's manual online.</p>
              <div className="flex gap-2″>
                <Input
                  placeholder="e.g. Carrier 59TP6A or Bosch SHPM88Z75N"
                  value={manualSearch}
                  onChange={e => setManualSearch(e.target.value)}
                  className="bg-slate-900 border-slate-600 text-white placeholder:text-slate-500 flex-1″
                />
                <Button
                  disabled={!manualSearch}
                  onClick={() => manualSearchUrl && window.open(manualSearchUrl, "_blank")}
                  className="bg-slate-700 hover:bg-slate-600 text-white gap-2 flex-shrink-0″
                >
                  <Search className="h-4 w-4″ />
                  Find
                </Button>
              </div>
              <p className="text-xs text-slate-600″>Opens a Google search for the owner manual PDF. Most manufacturers post manuals on their support sites.</p>
            </CardContent>
          </Card>

          <div className="text-center pb-2″>
            <Button
              onClick={() => navigate("/trustypro/book")}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              Find a Pro for Service or Repair
              <ExternalLink className="h-3.5 w-3.5 ml-2″ />
            </Button>
            <p className="text-xs text-slate-600 mt-2″>TrustyPro connects you with vetted pros for any home system</p>
          </div>
        </div>
      </div>
    </HomeownerLayout>
  );
}
