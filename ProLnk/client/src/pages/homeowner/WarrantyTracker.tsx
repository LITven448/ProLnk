import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Plus, X, ExternalLink, Search, BookOpen, AlertTriangle } from "lucide-react";
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

function getExpiryDate(purchaseDate: string, warrantyYears: number): Date | null {
  if (!purchaseDate) return null;
  const d = new Date(purchaseDate);
  d.setFullYear(d.getFullYear() + warrantyYears);
  return d;
}

function getStatus(expiry: Date | null): "active" | "expiring" | "expired" {
  if (!expiry) return "expired";
  const now = new Date();
  const msLeft = expiry.getTime() - now.getTime();
  const daysLeft = msLeft / (1000 * 60 * 60 * 24);
  if (daysLeft < 0) return "expired";
  if (daysLeft <= 365) return "expiring";
  return "active";
}

const STATUS_CONFIG = {
  active: { label: "Active", className: "bg-green-500/20 text-green-400 border-green-500/30" },
  expiring: { label: "Expiring soon", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  expired: { label: "Expired", className: "bg-red-500/20 text-red-400 border-red-500/30" },
};

const SAMPLE_APPLIANCES: Appliance[] = [
  { id: "1", type: "HVAC / Furnace", brand: "Carrier", model: "59TP6A060", serial: "1122ABCD", purchaseDate: "2022-04-10", warrantyYears: 5 },
  { id: "2", type: "Water Heater", brand: "Rheem", model: "XE40M06", serial: "WH334455", purchaseDate: "2021-09-15", warrantyYears: 6 },
  { id: "3", type: "Dishwasher", brand: "Bosch", model: "SHPM88Z75N", serial: "DW9900XZ", purchaseDate: "2019-06-01", warrantyYears: 5 },
];

export default function WarrantyTracker() {
  const [, navigate] = useLocation();
  const [appliances, setAppliances] = useState<Appliance[]>(SAMPLE_APPLIANCES);
  const [showForm, setShowForm] = useState(false);
  const [manualSearch, setManualSearch] = useState("");

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
    setAppliances((prev) => [newItem, ...prev]);
    setForm({ type: "", brand: "", model: "", serial: "", purchaseDate: "", warrantyYears: 1 });
    setShowForm(false);
  };

  const handleRemove = (id: string) => setAppliances((prev) => prev.filter((a) => a.id !== id));

  const manualSearchUrl = manualSearch
    ? `https://www.google.com/search?q=${encodeURIComponent(manualSearch + " owner manual PDF")}`
    : null;

  const counts = { active: 0, expiring: 0, expired: 0 };
  appliances.forEach((a) => {
    const expiry = getExpiryDate(a.purchaseDate, a.warrantyYears);
    counts[getStatus(expiry)]++;
  });

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Shield className="h-6 w-6 text-teal-400" />
              Warranty Tracker
            </h1>
            <p className="text-slate-400 mt-1">Track warranties for all your home appliances and systems.</p>
          </div>
          <Button
            onClick={() => setShowForm((v) => !v)}
            className="bg-teal-600 hover:bg-teal-700 text-white gap-2"
            size="sm"
          >
            <Plus className="h-4 w-4" />
            Add appliance
          </Button>
        </div>

        {/* Status summary */}
        <div className="grid grid-cols-3 gap-3">
          {(["active", "expiring", "expired"] as const).map((s) => (
            <Card key={s} className="bg-slate-800/60 border-slate-700">
              <CardContent className="pt-4 pb-3 text-center">
                <p className="text-2xl font-bold text-white">{counts[s]}</p>
                <Badge className={`mt-1 text-xs ${STATUS_CONFIG[s].className}`}>
                  {STATUS_CONFIG[s].label}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add form */}
        {showForm && (
          <Card className="bg-slate-800/60 border-teal-600/40">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-base flex items-center justify-between">
                Add appliance
                <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-slate-300 text-sm">Appliance type</Label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-600 text-white rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">Select type...</option>
                    {APPLIANCE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-slate-300 text-sm">Brand</Label>
                  <Input
                    placeholder="e.g. Carrier, Bosch, Rheem"
                    value={form.brand}
                    onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
                    className="bg-slate-900 border-slate-600 text-white placeholder:text-slate-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-slate-300 text-sm">Model number</Label>
                  <Input
                    placeholder="e.g. XE40M06ST"
                    value={form.model}
                    onChange={(e) => setForm((f) => ({ ...f, model: e.target.value }))}
                    className="bg-slate-900 border-slate-600 text-white placeholder:text-slate-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-slate-300 text-sm">Serial number</Label>
                  <Input
                    placeholder="Found on data tag"
                    value={form.serial}
                    onChange={(e) => setForm((f) => ({ ...f, serial: e.target.value }))}
                    className="bg-slate-900 border-slate-600 text-white placeholder:text-slate-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-slate-300 text-sm">Purchase date</Label>
                  <Input
                    type="date"
                    value={form.purchaseDate}
                    onChange={(e) => setForm((f) => ({ ...f, purchaseDate: e.target.value }))}
                    className="bg-slate-900 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-slate-300 text-sm">Warranty length (years)</Label>
                  <Input
                    type="number"
                    min={1}
                    max={25}
                    value={form.warrantyYears}
                    onChange={(e) => setForm((f) => ({ ...f, warrantyYears: Number(e.target.value) }))}
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

        {/* Appliance list */}
        <div className="space-y-3">
          {appliances.length === 0 && (
            <Card className="bg-slate-800/60 border-slate-700">
              <CardContent className="py-10 text-center">
                <Shield className="h-10 w-10 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400 text-sm">No appliances tracked yet. Add your first one above.</p>
              </CardContent>
            </Card>
          )}
          {appliances.map((appliance) => {
            const expiry = getExpiryDate(appliance.purchaseDate, appliance.warrantyYears);
            const status = getStatus(expiry);
            const config = STATUS_CONFIG[status];
            const daysLeft = expiry ? Math.ceil((expiry.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : null;

            return (
              <Card key={appliance.id} className={`bg-slate-800/60 border-slate-700 ${status === "expired" ? "opacity-75" : ""}`}>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-white font-medium">{appliance.brand} {appliance.type}</p>
                        <Badge className={`text-xs border ${config.className}`}>{config.label}</Badge>
                      </div>
                      {appliance.model && (
                        <p className="text-slate-400 text-xs mt-0.5">Model: {appliance.model}{appliance.serial ? ` · Serial: ${appliance.serial}` : ""}</p>
                      )}
                      <div className="flex items-center gap-4 mt-2">
                        <p className="text-slate-400 text-xs">
                          Purchased: {new Date(appliance.purchaseDate).toLocaleDateString()}
                        </p>
                        {expiry && (
                          <p className="text-slate-400 text-xs">
                            Expires: {expiry.toLocaleDateString()}
                            {daysLeft !== null && daysLeft > 0 && (
                              <span className={`ml-1 ${status === "expiring" ? "text-yellow-400" : "text-slate-500"}`}>
                                ({daysLeft} days left)
                              </span>
                            )}
                          </p>
                        )}
                      </div>
                      {status === "expired" && (
                        <button
                          onClick={() => navigate("/trustypro/book")}
                          className="mt-2 text-xs text-teal-400 hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Get a quote for warranty extension
                        </button>
                      )}
                      {status === "expiring" && (
                        <p className="mt-2 text-xs text-yellow-400 flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Expiring soon — consider renewing or replacing
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemove(appliance.id)}
                      className="text-slate-500 hover:text-red-400 flex-shrink-0 mt-0.5"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Manual search helper */}
        <Card className="bg-slate-800/60 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-base flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-teal-400" />
              Appliance manual search
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-slate-400 text-sm">Enter a brand and model number to find the owner's manual online.</p>
            <div className="flex gap-2">
              <Input
                placeholder="e.g. Carrier 59TP6 or Bosch SHPM88Z75N"
                value={manualSearch}
                onChange={(e) => setManualSearch(e.target.value)}
                className="bg-slate-900 border-slate-600 text-white placeholder:text-slate-500 flex-1"
              />
              <Button
                disabled={!manualSearch}
                onClick={() => manualSearchUrl && window.open(manualSearchUrl, "_blank")}
                className="bg-slate-700 hover:bg-slate-600 text-white gap-2 flex-shrink-0"
              >
                <Search className="h-4 w-4" />
                Find
              </Button>
            </div>
            <p className="text-xs text-slate-500">Opens a Google search for the owner manual PDF. Most manufacturers post manuals on their support sites.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
