import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  HeartPulse, Plus, ChevronDown, ChevronUp, Wrench, AlertTriangle,
  CheckCircle, Clock, DollarSign, FileText, Camera, Shield, Home,
  Zap, Droplets, Flame, Wind, Layers, TreePine, ArrowRight,
  CalendarDays, Star, Download, Share2, X, Edit3, Trash2,
  Sparkles, Loader2 as SpinLoader
} from "lucide-react";

// ─── System type configuration ────────────────────────────────────────────────
const SYSTEM_CONFIG: Record<string, {
  label: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  defaultLifespan: number;
  maintenanceIntervalMonths: number;
  replacementCostLow: number;
  replacementCostHigh: number;
  description: string;
}> = {
  roof:              { label: "Roof",              icon: Home,        color: "#1B4FD8", bg: "#EFF6FF", defaultLifespan: 25, maintenanceIntervalMonths: 12, replacementCostLow: 8000,  replacementCostHigh: 20000, description: "Shingles, flashing, gutters, and drainage" },
  hvac:              { label: "HVAC",              icon: Wind,        color: "#7C3AED", bg: "#F5F3FF", defaultLifespan: 15, maintenanceIntervalMonths: 6,  replacementCostLow: 5000,  replacementCostHigh: 12000, description: "Heating, ventilation, and air conditioning" },
  water_heater:      { label: "Water Heater",      icon: Flame,       color: "#DC2626", bg: "#FEF2F2", defaultLifespan: 12, maintenanceIntervalMonths: 12, replacementCostLow: 800,   replacementCostHigh: 2500,  description: "Tank or tankless water heating system" },
  electrical_panel:  { label: "Electrical Panel",  icon: Zap,         color: "#D97706", bg: "#FFFBEB", defaultLifespan: 30, maintenanceIntervalMonths: 24, replacementCostLow: 1500,  replacementCostHigh: 4000,  description: "Main breaker panel and circuit breakers" },
  plumbing:          { label: "Plumbing",          icon: Droplets,    color: "#0891B2", bg: "#ECFEFF", defaultLifespan: 50, maintenanceIntervalMonths: 24, replacementCostLow: 500,   replacementCostHigh: 5000,  description: "Pipes, fixtures, and water supply lines" },
  air_filter:        { label: "Air Filters",       icon: Wind,        color: "#059669", bg: "#ECFDF5", defaultLifespan: 1,  maintenanceIntervalMonths: 3,  replacementCostLow: 20,    replacementCostHigh: 100,   description: "HVAC air filters — replace every 1-3 months" },
  siding:            { label: "Siding",            icon: Layers,      color: "#6B7280", bg: "#F9FAFB", defaultLifespan: 30, maintenanceIntervalMonths: 24, replacementCostLow: 5000,  replacementCostHigh: 15000, description: "Exterior wall cladding and insulation" },
  windows:           { label: "Windows",           icon: Home,        color: "#0284C7", bg: "#F0F9FF", defaultLifespan: 25, maintenanceIntervalMonths: 24, replacementCostLow: 300,   replacementCostHigh: 1200,  description: "Window frames, seals, and glazing" },
  fence:             { label: "Fence",             icon: TreePine,    color: "#92400E", bg: "#FEF3C7", defaultLifespan: 20, maintenanceIntervalMonths: 12, replacementCostLow: 1500,  replacementCostHigh: 8000,  description: "Wood, vinyl, or metal perimeter fencing" },
  driveway:          { label: "Driveway",          icon: Home,        color: "#374151", bg: "#F3F4F6", defaultLifespan: 25, maintenanceIntervalMonths: 24, replacementCostLow: 2000,  replacementCostHigh: 8000,  description: "Concrete, asphalt, or paver driveway" },
  pool:              { label: "Pool",              icon: Droplets,    color: "#0EA5E9", bg: "#F0F9FF", defaultLifespan: 30, maintenanceIntervalMonths: 1,  replacementCostLow: 500,   replacementCostHigh: 3000,  description: "Pool equipment, liner, and chemical systems" },
  gutters:           { label: "Gutters",           icon: Home,        color: "#6B7280", bg: "#F9FAFB", defaultLifespan: 20, maintenanceIntervalMonths: 6,  replacementCostLow: 800,   replacementCostHigh: 3000,  description: "Rain gutters and downspout drainage" },
  deck:              { label: "Deck / Patio",      icon: TreePine,    color: "#92400E", bg: "#FEF3C7", defaultLifespan: 20, maintenanceIntervalMonths: 12, replacementCostLow: 3000,  replacementCostHigh: 15000, description: "Wood or composite deck and patio structures" },
  garage_door:       { label: "Garage Door",       icon: Home,        color: "#374151", bg: "#F3F4F6", defaultLifespan: 20, maintenanceIntervalMonths: 12, replacementCostLow: 700,   replacementCostHigh: 2500,  description: "Garage door panels, opener, and hardware" },
  foundation:        { label: "Foundation",        icon: Home,        color: "#1F2937", bg: "#F3F4F6", defaultLifespan: 100,maintenanceIntervalMonths: 60, replacementCostLow: 5000,  replacementCostHigh: 50000, description: "Concrete slab, crawl space, or basement foundation" },
  insulation:        { label: "Insulation",        icon: Layers,      color: "#D97706", bg: "#FFFBEB", defaultLifespan: 40, maintenanceIntervalMonths: 60, replacementCostLow: 1500,  replacementCostHigh: 6000,  description: "Attic, wall, and crawl space insulation" },
  solar_panels:      { label: "Solar Panels",      icon: Zap,         color: "#F59E0B", bg: "#FFFBEB", defaultLifespan: 25, maintenanceIntervalMonths: 12, replacementCostLow: 10000, replacementCostHigh: 30000, description: "Photovoltaic panels, inverter, and battery storage" },
  appliances:        { label: "Major Appliances",  icon: Home,        color: "#6B7280", bg: "#F9FAFB", defaultLifespan: 12, maintenanceIntervalMonths: 12, replacementCostLow: 500,   replacementCostHigh: 3000,  description: "Refrigerator, dishwasher, washer, dryer" },
  other:             { label: "Other System",      icon: Wrench,      color: "#6B7280", bg: "#F9FAFB", defaultLifespan: 15, maintenanceIntervalMonths: 12, replacementCostLow: 500,   replacementCostHigh: 5000,  description: "Custom or specialty home system" },
};

const CONDITION_CONFIG = {
  excellent: { label: "Excellent", color: "#059669", bg: "#ECFDF5", score: 95 },
  good:      { label: "Good",      color: "#16A34A", bg: "#F0FDF4", score: 75 },
  fair:      { label: "Fair",      color: "#D97706", bg: "#FFFBEB", score: 50 },
  poor:      { label: "Poor",      color: "#DC2626", bg: "#FEF2F2", score: 25 },
  critical:  { label: "Critical",  color: "#991B1B", bg: "#FEF2F2", score: 10 },
  unknown:   { label: "Unknown",   color: "#6B7280", bg: "#F9FAFB", score: 60 },
};

const SERVICE_TYPE_LABELS: Record<string, string> = {
  inspection: "Inspection", repair: "Repair", replacement: "Replacement",
  maintenance: "Maintenance", installation: "Installation", cleaning: "Cleaning",
  filter_change: "Filter Change", tune_up: "Tune-Up", warranty_claim: "Warranty Claim",
  emergency: "Emergency Service", other: "Other",
};

// ─── Health Score Ring ─────────────────────────────────────────────────────────
function HealthRing({ score, size = 64 }: { score: number; size?: number }) {
  const r = (size / 2) - 6;
  const circ = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, score));
  const offset = circ - (pct / 100) * circ;
  const color = pct >= 70 ? "#059669" : pct >= 40 ? "#D97706" : "#DC2626";
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E5E7EB" strokeWidth="5" />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.8s ease" }} />
      <text x={size/2} y={size/2} textAnchor="middle" dominantBaseline="central"
        style={{ transform: "rotate(90deg)", transformOrigin: `${size/2}px ${size/2}px`, fontSize: size < 50 ? 11 : 14, fontWeight: 700, fill: color }}>
        {pct}
      </text>
    </svg>
  );
}

// ─── Add System Modal ──────────────────────────────────────────────────────────
function AddSystemModal({ propertyId, onClose, onSaved }: { propertyId: number; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    systemType: "hvac" as string,
    systemLabel: "",
    installYear: new Date().getFullYear() - 5,
    manufacturer: "",
    modelNumber: "",
    warrantyExpiresYear: undefined as number | undefined,
    condition: "good" as string,
    notes: "",
  });

  const saveSystem = trpc.homeowner.saveSystemHealth.useMutation({
    onSuccess: () => { toast.success("System added to your vault"); onSaved(); onClose(); },
    onError: (e) => toast.error(e.message ?? "Failed to save system"),
  });

  const cfg = SYSTEM_CONFIG[form.systemType] ?? SYSTEM_CONFIG.other;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Add Home System</h2>
            <p className="text-sm text-gray-500 mt-0.5">Track this system's health and maintenance history</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100"><X className="w-5 h-5 text-gray-500" /></button>
        </div>
        <div className="p-6 space-y-5">
          {/* System Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">System Type</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(SYSTEM_CONFIG).map(([key, c]) => {
                const Icon = c.icon;
                return (
                  <button key={key} onClick={() => setForm(f => ({ ...f, systemType: key }))}
                    className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border-2 text-xs font-medium transition-all ${
                      form.systemType === key ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}>
                    <Icon className="w-4 h-4" />
                    <span className="text-center leading-tight">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Label */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Custom Label (optional)</label>
            <input value={form.systemLabel} onChange={e => setForm(f => ({ ...f, systemLabel: e.target.value }))}
              placeholder={`e.g. "Main ${cfg.label}", "Upstairs Unit"`}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Install Year + Condition */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Install Year</label>
              <input type="number" value={form.installYear} onChange={e => setForm(f => ({ ...f, installYear: parseInt(e.target.value) || new Date().getFullYear() }))}
                min={1950} max={new Date().getFullYear()}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Current Condition</label>
              <select value={form.condition} onChange={e => setForm(f => ({ ...f, condition: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {Object.entries(CONDITION_CONFIG).filter(([k]) => k !== 'unknown').map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Manufacturer + Model */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Manufacturer</label>
              <input value={form.manufacturer} onChange={e => setForm(f => ({ ...f, manufacturer: e.target.value }))}
                placeholder="e.g. Carrier, Rheem"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Model Number</label>
              <input value={form.modelNumber} onChange={e => setForm(f => ({ ...f, modelNumber: e.target.value }))}
                placeholder="Optional"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          {/* Warranty */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Warranty Expires (Year)</label>
            <input type="number" value={form.warrantyExpiresYear ?? ""} onChange={e => setForm(f => ({ ...f, warrantyExpiresYear: e.target.value ? parseInt(e.target.value) : undefined }))}
              placeholder="e.g. 2028"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Notes</label>
            <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              rows={2} placeholder="Any additional details about this system..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>

          {/* Life Expectancy Preview */}
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-xs font-semibold text-blue-700 mb-1">Estimated End of Life</p>
            <p className="text-sm text-blue-900">
              {form.installYear + cfg.defaultLifespan} — based on {cfg.defaultLifespan}-year average lifespan for {cfg.label.toLowerCase()}
            </p>
            <p className="text-xs text-blue-600 mt-1">Replacement cost estimate: ${cfg.replacementCostLow.toLocaleString()} – ${cfg.replacementCostHigh.toLocaleString()}</p>
          </div>
        </div>
        <div className="p-6 pt-0 flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
          <Button onClick={() => saveSystem.mutate({
            propertyId,
            systemType: form.systemType as any,
            systemLabel: form.systemLabel || undefined,
            installYear: form.installYear,
            manufacturer: form.manufacturer || undefined,
            modelNumber: form.modelNumber || undefined,
            warrantyExpiresYear: form.warrantyExpiresYear,
            condition: form.condition as any,
            notes: form.notes || undefined,
            expectedLifespanYears: cfg.defaultLifespan,
            estimatedEndOfLifeYear: form.installYear + cfg.defaultLifespan,
            maintenanceIntervalMonths: cfg.maintenanceIntervalMonths,
            estimatedReplacementCostLow: cfg.replacementCostLow,
            estimatedReplacementCostHigh: cfg.replacementCostHigh,
          })} disabled={saveSystem.isPending} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
            {saveSystem.isPending ? "Saving..." : "Add to Vault"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Add Maintenance Log Modal ─────────────────────────────────────────────────
function AddLogModal({ propertyId, systemHealthId, systemType, onClose, onSaved }: {
  propertyId: number; systemHealthId: number; systemType: string; onClose: () => void; onSaved: () => void;
}) {
  const [form, setForm] = useState({
    serviceType: "maintenance" as string,
    serviceDescription: "",
    servicedBy: "",
    cost: "" as string,
    servicedAt: new Date().toISOString().split("T")[0],
    conditionAfter: "good" as string,
    notes: "",
    serviceWarrantyMonths: "" as string,
  });

  const addLog = trpc.homeowner.addMaintenanceLog.useMutation({
    onSuccess: () => { toast.success("Service logged successfully"); onSaved(); onClose(); },
    onError: (e) => toast.error(e.message ?? "Failed to log service"),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Log Service Event</h2>
            <p className="text-sm text-gray-500 mt-0.5">{SYSTEM_CONFIG[systemType]?.label ?? systemType}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100"><X className="w-5 h-5 text-gray-500" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Service Type</label>
            <select value={form.serviceType} onChange={e => setForm(f => ({ ...f, serviceType: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {Object.entries(SERVICE_TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description *</label>
            <textarea value={form.serviceDescription} onChange={e => setForm(f => ({ ...f, serviceDescription: e.target.value }))}
              rows={3} placeholder="What was done? e.g. Replaced 16x25x1 MERV-8 air filter"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Service Date</label>
              <input type="date" value={form.servicedAt} onChange={e => setForm(f => ({ ...f, servicedAt: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Cost ($)</label>
              <input type="number" value={form.cost} onChange={e => setForm(f => ({ ...f, cost: e.target.value }))}
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Serviced By</label>
            <input value={form.servicedBy} onChange={e => setForm(f => ({ ...f, servicedBy: e.target.value }))}
              placeholder="Company or person name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Condition After</label>
              <select value={form.conditionAfter} onChange={e => setForm(f => ({ ...f, conditionAfter: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {Object.entries(CONDITION_CONFIG).filter(([k]) => k !== 'unknown').map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Warranty (months)</label>
              <input type="number" value={form.serviceWarrantyMonths} onChange={e => setForm(f => ({ ...f, serviceWarrantyMonths: e.target.value }))}
                placeholder="e.g. 12"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Notes</label>
            <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              rows={2} placeholder="Any additional notes..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>
        </div>
        <div className="p-6 pt-0 flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
          <Button onClick={() => addLog.mutate({
            propertyId,
            systemHealthId,
            systemType,
            serviceType: form.serviceType as any,
            serviceDescription: form.serviceDescription,
            servicedBy: form.servicedBy || undefined,
            cost: form.cost ? parseFloat(form.cost) : undefined,
            servicedAt: new Date(form.servicedAt).getTime(),
            conditionAfter: form.conditionAfter as any,
            notes: form.notes || undefined,
            serviceWarrantyMonths: form.serviceWarrantyMonths ? parseInt(form.serviceWarrantyMonths) : undefined,
          })} disabled={addLog.isPending || !form.serviceDescription}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
            {addLog.isPending ? "Saving..." : "Log Service"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Home Sale / Passport Transfer Modal ──────────────────────────────────────
function SellHomeModal({ propertyId, propertyAddress, onClose }: { propertyId: number; propertyAddress: string; onClose: () => void }) {
  const [step, setStep] = useState<"confirm" | "details" | "done">("confirm");
  const [newOwnerEmail, setNewOwnerEmail] = useState("");
  const [newOwnerName, setNewOwnerName] = useState("");
  const [salePrice, setSalePrice] = useState("");

  const initTransfer = trpc.homeowner.initiatePassportTransfer.useMutation({
    onSuccess: () => { setStep("done"); },
    onError: (e) => toast.error(e.message ?? "Transfer failed"),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {step === "confirm" && (
          <>
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-amber-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Transfer Home Passport</h2>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">{propertyAddress}</span>
              </p>
              <p className="text-sm text-gray-500 mt-3">
                When you sell your home, the new owner receives your complete Home Health Vault — every system record, maintenance log, warranty, and service history. Every repair, upgrade, and inspection. Documented. Verified. Transferable.
              </p>
            </div>
            <div className="p-6 pt-0 flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
              <Button onClick={() => setStep("details")} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white">
                Transfer Passport
              </Button>
            </div>
          </>
        )}
        {step === "details" && (
          <>
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">New Owner Details</h2>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100"><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">New Owner's Email *</label>
                <input value={newOwnerEmail} onChange={e => setNewOwnerEmail(e.target.value)}
                  type="email" placeholder="buyer@email.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">New Owner's Name</label>
                <input value={newOwnerName} onChange={e => setNewOwnerName(e.target.value)}
                  placeholder="Optional"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Sale Price ($)</label>
                <input value={salePrice} onChange={e => setSalePrice(e.target.value)}
                  type="number" placeholder="Optional"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-sm text-blue-800">
                <p className="font-semibold mb-1">What the new owner receives:</p>
                <ul className="space-y-0.5 text-xs text-blue-700">
                  <li>• Complete system health records and life expectancy</li>
                  <li>• Full maintenance log with dates, costs, and service providers</li>
                  <li>• All warranty information and expiry dates</li>
                  <li>• AI-generated property condition assessments</li>
                  <li>• Photo documentation of all work performed</li>
                </ul>
              </div>
            </div>
            <div className="p-6 pt-0 flex gap-3">
              <Button variant="outline" onClick={() => setStep("confirm")} className="flex-1">Back</Button>
              <Button onClick={() => initTransfer.mutate({
                propertyId,
                newOwnerEmail,
                newOwnerName: newOwnerName || undefined,
                salePrice: salePrice ? parseFloat(salePrice) : undefined,
              })} disabled={initTransfer.isPending || !newOwnerEmail}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                {initTransfer.isPending ? "Sending..." : "Send Passport"}
              </Button>
            </div>
          </>
        )}
        {step === "done" && (
          <>
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Passport Sent!</h2>
              <p className="text-sm text-gray-600">
                We've sent a secure link to <span className="font-medium">{newOwnerEmail}</span>. They have 30 days to claim their Home Health Vault.
              </p>
            </div>
            <div className="p-6 pt-0">
              <Button onClick={onClose} className="w-full bg-green-600 hover:bg-green-700 text-white">Done</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── System Card ───────────────────────────────────────────────────────────────
function SystemCard({ system, propertyId, onRefresh }: { system: any; propertyId: number; onRefresh: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const { data: logs = [], refetch: refetchLogs } = trpc.homeowner.getMaintenanceLogs.useQuery(
    { systemHealthId: system.id }, { enabled: expanded }
  );
  const cfg = SYSTEM_CONFIG[system.systemType] ?? SYSTEM_CONFIG.other;
  const condCfg = CONDITION_CONFIG[system.condition as keyof typeof CONDITION_CONFIG] ?? CONDITION_CONFIG.unknown;
  const Icon = cfg.icon;
  const currentYear = new Date().getFullYear();
  const age = system.installYear ? currentYear - system.installYear : null;
  const yearsLeft = system.estimatedEndOfLifeYear ? system.estimatedEndOfLifeYear - currentYear : null;
  const pctLife = system.installYear && system.estimatedEndOfLifeYear
    ? Math.max(0, Math.min(100, Math.round(((system.estimatedEndOfLifeYear - currentYear) / (system.estimatedEndOfLifeYear - system.installYear)) * 100)))
    : system.healthScore;
  const isWarrantyActive = system.warrantyExpiresYear && system.warrantyExpiresYear >= currentYear;
  const isUrgent = yearsLeft !== null && yearsLeft <= 3;
  const totalCost = (logs as any[]).reduce((s: number, l: any) => s + (parseFloat(l.cost ?? 0) || 0), 0);

  return (
    <>
      <div className={`bg-white rounded-2xl border-2 transition-all ${isUrgent ? "border-red-200" : "border-gray-100"} shadow-sm hover:shadow-md`}>
        {/* Header */}
        <div className="p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: cfg.bg }}>
            <Icon className="w-6 h-6" style={{ color: cfg.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-gray-900 text-sm">{system.systemLabel || cfg.label}</h3>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: condCfg.bg, color: condCfg.color }}>
                {condCfg.label}
              </span>
              {isWarrantyActive && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-medium flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Warranty Active
                </span>
              )}
              {isUrgent && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-700 font-medium flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Replacement Soon
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 flex-wrap">
              {age !== null && <span>Age: {age} yr{age !== 1 ? "s" : ""}</span>}
              {yearsLeft !== null && (
                <span className={yearsLeft <= 3 ? "text-red-600 font-semibold" : yearsLeft <= 7 ? "text-amber-600" : "text-green-600"}>
                  {yearsLeft > 0 ? `~${yearsLeft} yrs left` : "End of life"}
                </span>
              )}
              {system.manufacturer && <span>{system.manufacturer}</span>}
              {(logs as any[]).length > 0 && <span>{(logs as any[]).length} service record{(logs as any[]).length !== 1 ? "s" : ""}</span>}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <HealthRing score={pctLife} size={52} />
            <button onClick={() => setExpanded(e => !e)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400">
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Life Bar */}
        {system.installYear && system.estimatedEndOfLifeYear && (
          <div className="px-4 pb-3">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Installed {system.installYear}</span>
              <span>Est. end of life {system.estimatedEndOfLifeYear}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{
                width: `${pctLife}%`,
                background: pctLife >= 60 ? "#059669" : pctLife >= 30 ? "#D97706" : "#DC2626"
              }} />
            </div>
          </div>
        )}

        {/* Expanded Details */}
        {expanded && (
          <div className="border-t border-gray-100 p-4 space-y-4">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-gray-900">{(logs as any[]).length}</p>
                <p className="text-xs text-gray-500">Service Records</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-gray-900">${totalCost.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Total Spent</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-gray-900">
                  {system.estimatedReplacementCostLow ? `$${(system.estimatedReplacementCostLow / 1000).toFixed(0)}k` : "—"}
                </p>
                <p className="text-xs text-gray-500">Est. Replacement</p>
              </div>
            </div>

            {/* System details */}
            {(system.modelNumber || system.serialNumber || system.warrantyExpiresYear) && (
              <div className="bg-gray-50 rounded-xl p-3 space-y-1.5">
                {system.modelNumber && <div className="flex justify-between text-xs"><span className="text-gray-500">Model</span><span className="font-medium text-gray-800">{system.modelNumber}</span></div>}
                {system.serialNumber && <div className="flex justify-between text-xs"><span className="text-gray-500">Serial</span><span className="font-medium text-gray-800">{system.serialNumber}</span></div>}
                {system.warrantyExpiresYear && <div className="flex justify-between text-xs"><span className="text-gray-500">Warranty</span><span className={`font-medium ${isWarrantyActive ? "text-green-700" : "text-red-600"}`}>{isWarrantyActive ? `Active until ${system.warrantyExpiresYear}` : `Expired ${system.warrantyExpiresYear}`}</span></div>}
              </div>
            )}

            {/* Maintenance log */}
            {(logs as any[]).length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Service History</h4>
                <div className="space-y-2">
                  {(logs as any[]).map((log: any) => (
                    <div key={log.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
                        <Wrench className="w-4 h-4 text-gray-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-gray-800">{SERVICE_TYPE_LABELS[log.serviceType] ?? log.serviceType}</span>
                          <span className="text-xs text-gray-500 flex-shrink-0">{new Date(log.servicedAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">{log.serviceDescription}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                          {log.servicedBy && <span>{log.servicedBy}</span>}
                          {log.cost && <span className="text-green-700 font-medium">${parseFloat(log.cost).toLocaleString()}</span>}
                          {log.serviceWarrantyMonths && <span className="text-blue-600">Warranty: {log.serviceWarrantyMonths}mo</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {system.notes && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                <p className="text-xs text-amber-800">{system.notes}</p>
              </div>
            )}

            <Button onClick={() => setShowLogModal(true)} variant="outline" className="w-full text-sm border-blue-200 text-blue-700 hover:bg-blue-50">
              <Plus className="w-4 h-4 mr-2" /> Log Service Event
            </Button>
          </div>
        )}
      </div>

      {showLogModal && (
        <AddLogModal
          propertyId={propertyId}
          systemHealthId={system.id}
          systemType={system.systemType}
          onClose={() => setShowLogModal(false)}
          onSaved={() => { refetchLogs(); onRefresh(); }}
        />
      )}
    </>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function HomeHealthVault() {
  const { data: profile } = trpc.homeowner.getProfile.useQuery();
  const { data: properties = [] } = trpc.homeowner.getMyProperties.useQuery();
  const primaryProperty = (properties as any[])[0];
  const propertyId = primaryProperty?.id;

  const { data: systems = [], refetch: refetchSystems, isLoading } = trpc.homeowner.getSystemHealth.useQuery(
    { propertyId: propertyId! }, { enabled: !!propertyId }
  );

  // ── FSM Consent Bridge ──────────────────────────────────────────────────────
  const [showFsmBanner, setShowFsmBanner] = useState(true);
  const [fsmSelected, setFsmSelected] = useState<Set<number>>(new Set());
  const { data: fsmData, refetch: refetchFsm } = trpc.fsmVault.getPendingForMyHome.useQuery(
    undefined, { enabled: !!propertyId }
  );
  const fsmRecords = (fsmData?.records ?? []) as any[];
  const respondFsm = trpc.fsmVault.respondToRecords.useMutation({
    onSuccess: (res) => {
      toast.success(`${res.accepted} verified record${res.accepted !== 1 ? 's' : ''} added to your vault!`);
      refetchFsm();
      refetchSystems();
      setFsmSelected(new Set());
    },
    onError: (err) => toast.error(err.message || 'Could not import records'),
  });
  const toggleFsmRecord = (id: number) => {
    setFsmSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };
  const handleFsmAcceptSelected = () => {
    const decisions = Array.from(fsmSelected).map(id => ({ recordId: id, decision: 'accepted' as const }));
    respondFsm.mutate({ decisions });
  };
  const handleFsmDeclineAll = () => {
    const decisions = fsmRecords.map((r: any) => ({ recordId: r.id, decision: 'declined' as const }));
    respondFsm.mutate({ decisions });
    setShowFsmBanner(false);
  };
  // ────────────────────────────────────────────────────────────────────────────

  const [showAddSystem, setShowAddSystem] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [aiSummary, setAiSummary] = useState<{
    assessment: string;
    priorities: { action: string; urgency: string; estimatedCost: string }[];
    highlight: string;
    annualBudget: string;
    overallScore: number;
    generatedAt: string;
  } | null>(null);
  const [showAiSummary, setShowAiSummary] = useState(false);

  const generateSummaryMutation = trpc.homeowner.generateAIHealthSummary.useMutation({
    onSuccess: (data) => {
      setAiSummary(data as any);
      setShowAiSummary(true);
      toast.success("AI health summary generated!");
    },
    onError: (err) => toast.error(err.message || "Could not generate summary"),
  });

  const { user } = useAuth();
  const displayName = (profile as any)?.displayName ?? user?.name ?? "Homeowner";
  const displayAddress = primaryProperty?.address ?? "";

  // Overall home health score = average of all system health scores
  const overallScore = (systems as any[]).length > 0
    ? Math.round((systems as any[]).reduce((s: number, sys: any) => s + (sys.healthScore ?? 60), 0) / (systems as any[]).length)
    : 0;

  // Systems needing attention
  const urgentSystems = (systems as any[]).filter((s: any) => {
    const yearsLeft = s.estimatedEndOfLifeYear ? s.estimatedEndOfLifeYear - new Date().getFullYear() : null;
    return (yearsLeft !== null && yearsLeft <= 3) || s.condition === "poor" || s.condition === "critical";
  });

  // Total estimated replacement value of all systems
  const totalReplacementValue = (systems as any[]).reduce((s: number, sys: any) =>
    s + (parseFloat(sys.estimatedReplacementCostHigh ?? 0) || 0), 0);

  if (!propertyId && !isLoading) {
    return (
      <HomeownerLayout homeownerName={displayName} homeownerAddress={displayAddress}>
        <div className="p-4 md:p-8 max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartPulse className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Set Up Your Home First</h2>
            <p className="text-sm text-gray-600 mb-6">Complete your home profile to start tracking system health and maintenance history.</p>
            <Button onClick={() => window.location.href = "/my-home/wizard"} className="bg-blue-600 hover:bg-blue-700 text-white">
              Complete Home Profile <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </HomeownerLayout>
    );
  }

  return (
    <HomeownerLayout homeownerName={displayName} homeownerAddress={displayAddress}>
      <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">

        {/* ── FSM Verified Records Banner ── */}
        {showFsmBanner && fsmRecords.length > 0 && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-900">Verified Service Records Found at Your Address</h3>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    We found {fsmRecords.length} verified service record{fsmRecords.length !== 1 ? 's' : ''} from trusted pros who have worked at your home.
                    Add them to your Home Health Vault to build your complete maintenance history.
                  </p>
                </div>
              </div>
              <button onClick={() => setShowFsmBanner(false)} className="p-1 rounded-lg hover:bg-emerald-100 flex-shrink-0">
                <X className="w-4 h-4 text-emerald-600" />
              </button>
            </div>
            <div className="space-y-2 mb-4">
              {fsmRecords.map((rec: any) => (
                <label key={rec.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    fsmSelected.has(rec.id)
                      ? 'border-emerald-400 bg-emerald-50'
                      : 'border-gray-200 bg-white hover:border-emerald-200'
                  }`}>
                  <input type="checkbox" checked={fsmSelected.has(rec.id)}
                    onChange={() => toggleFsmRecord(rec.id)}
                    className="w-4 h-4 accent-emerald-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-gray-900 truncate">
                        {rec.jobTitle ?? rec.tradeCategory ?? 'Service Record'}
                      </span>
                      {rec.source && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full capitalize">
                          via {rec.source.replace(/_/g, ' ')}
                        </span>
                      )}
                      {rec.photoCount > 0 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Camera className="w-3 h-3" /> {rec.photoCount} photo{rec.photoCount !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                    {rec.completedAt && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        Completed {new Date(rec.completedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </label>
              ))}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                onClick={() => {
                  setFsmSelected(new Set(fsmRecords.map((r: any) => r.id)));
                }}
                variant="outline"
                className="text-xs border-emerald-300 text-emerald-700 hover:bg-emerald-50 h-8 px-3">
                Select All
              </Button>
              <Button
                onClick={handleFsmAcceptSelected}
                disabled={fsmSelected.size === 0 || respondFsm.isPending}
                className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white h-8 px-4">
                {respondFsm.isPending ? 'Adding...' : `Add ${fsmSelected.size > 0 ? fsmSelected.size + ' ' : ''}Selected to Vault`}
              </Button>
              <button onClick={handleFsmDeclineAll}
                className="text-xs text-gray-400 hover:text-gray-600 underline ml-auto">
                No thanks, dismiss
              </button>
            </div>
          </div>
        )}

        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <HeartPulse className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Home Health Vault</h1>
            </div>
            <p className="text-sm text-gray-500">
              {primaryProperty?.address ? `${primaryProperty.address}${primaryProperty.city ? ", " + primaryProperty.city : ""}` : "Your property's complete maintenance record"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setShowSellModal(true)} className="text-sm border-amber-200 text-amber-700 hover:bg-amber-50">
              <Share2 className="w-4 h-4 mr-2" /> Transfer Passport
            </Button>
            {(systems as any[]).length > 0 && (
              <Button variant="outline"
                onClick={() => generateSummaryMutation.mutate()}
                disabled={generateSummaryMutation.isPending}
                className="text-sm border-purple-200 text-purple-700 hover:bg-purple-50">
                {generateSummaryMutation.isPending
                  ? <><SpinLoader className="w-4 h-4 mr-2 animate-spin" /> Analyzing...</>
                  : <><Sparkles className="w-4 h-4 mr-2" /> AI Summary</>}
              </Button>
            )}
            <Button onClick={() => setShowAddSystem(true)} className="text-sm bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" /> Add System
            </Button>
          </div>
        </div>

        {/* ── Overall Health Score ── */}
        {(systems as any[]).length > 0 && (
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-6">
              <div className="flex-shrink-0">
                <svg width={100} height={100} style={{ transform: "rotate(-90deg)" }}>
                  <circle cx={50} cy={50} r={42} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
                  <circle cx={50} cy={50} r={42} fill="none" stroke="white" strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 42}
                    strokeDashoffset={2 * Math.PI * 42 * (1 - overallScore / 100)}
                    strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s ease" }} />
                  <text x={50} y={50} textAnchor="middle" dominantBaseline="central"
                    style={{ transform: "rotate(90deg)", transformOrigin: "50px 50px", fontSize: 22, fontWeight: 800, fill: "white" }}>
                    {overallScore}
                  </text>
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">Home Health Score</h2>
                <p className="text-blue-100 text-sm mb-3">
                  {overallScore >= 80 ? "Your home is in great shape. Keep up the maintenance!" :
                   overallScore >= 60 ? "Good overall health. A few systems may need attention soon." :
                   overallScore >= 40 ? "Some systems are aging. Plan for repairs or replacements." :
                   "Several systems need immediate attention."}
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-2xl font-bold">{(systems as any[]).length}</p>
                    <p className="text-xs text-blue-200">Systems Tracked</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-amber-300">{urgentSystems.length}</p>
                    <p className="text-xs text-blue-200">Need Attention</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">${(totalReplacementValue / 1000).toFixed(0)}k</p>
                    <p className="text-xs text-blue-200">Total Asset Value</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── AI Health Summary Card ── */}
        {showAiSummary && aiSummary && (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">AI Home Health Summary</h3>
                  <p className="text-xs text-gray-400">Generated {new Date(aiSummary.generatedAt).toLocaleDateString()}</p>
                </div>
              </div>
              <button onClick={() => setShowAiSummary(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-700 mb-4 leading-relaxed">{aiSummary.assessment}</p>
            {aiSummary.highlight && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4 flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-green-800">{aiSummary.highlight}</p>
              </div>
            )}
            {aiSummary.priorities && aiSummary.priorities.length > 0 && (
              <div className="space-y-2 mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Priority Actions</p>
                {aiSummary.priorities.map((p, i) => (
                  <div key={i} className="bg-white rounded-xl p-3 border border-purple-100 flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      p.urgency === 'immediate' ? 'bg-red-100 text-red-700' :
                      p.urgency === 'within_6_months' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>{i + 1}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800">{p.action}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{p.estimatedCost} · {p.urgency.replace(/_/g, ' ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between bg-white rounded-xl p-3 border border-purple-100">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-semibold text-gray-700">Recommended Annual Budget</span>
              </div>
              <span className="text-sm font-bold text-purple-700">{aiSummary.annualBudget}</span>
            </div>
          </div>
        )}

        {/* ── Urgent Alerts ── */}
        {urgentSystems.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h3 className="font-bold text-red-800">Systems Needing Attention</h3>
            </div>
            <div className="space-y-2">
              {urgentSystems.map((sys: any) => {
                const c = SYSTEM_CONFIG[sys.systemType] ?? SYSTEM_CONFIG.other;
                const yearsLeft = sys.estimatedEndOfLifeYear ? sys.estimatedEndOfLifeYear - new Date().getFullYear() : null;
                return (
                  <div key={sys.id} className="flex items-center justify-between bg-white rounded-xl p-3 border border-red-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: c.bg }}>
                        <c.icon className="w-4 h-4" style={{ color: c.color }} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{sys.systemLabel || c.label}</p>
                        <p className="text-xs text-red-600">
                          {sys.condition === "critical" ? "Critical condition — immediate attention needed" :
                           sys.condition === "poor" ? "Poor condition — schedule service soon" :
                           yearsLeft !== null && yearsLeft <= 0 ? "Past estimated end of life" :
                           `~${yearsLeft} year${yearsLeft !== 1 ? "s" : ""} until end of life`}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-red-700 bg-red-100 px-2 py-1 rounded-lg">
                      {sys.estimatedReplacementCostLow ? `$${(sys.estimatedReplacementCostLow / 1000).toFixed(0)}k–$${(sys.estimatedReplacementCostHigh / 1000).toFixed(0)}k` : "Get estimate"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── System Cards ── */}
        {isLoading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => <div key={i} className="h-24 bg-white rounded-2xl border border-gray-100 animate-pulse" />)}
          </div>
        ) : (systems as any[]).length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartPulse className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Start Your Home Health Vault</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
              Track every home system — roof, HVAC, water heater, and more. Know exactly when to service, when to replace, and what it will cost.
            </p>
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {["Roof", "HVAC", "Water Heater", "Electrical Panel", "Air Filters"].map(s => (
                <span key={s} className="text-xs px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full font-medium">{s}</span>
              ))}
            </div>
            <Button onClick={() => setShowAddSystem(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" /> Add Your First System
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">{(systems as any[]).length} System{(systems as any[]).length !== 1 ? "s" : ""} Tracked</h2>
              <span className="text-xs text-gray-500">Tap any card to expand</span>
            </div>
            {(systems as any[]).map((system: any) => (
              <SystemCard key={system.id} system={system} propertyId={propertyId} onRefresh={refetchSystems} />
            ))}
          </div>
        )}

        {/* ── Home Passport CTA ── */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">Home Passport — Your Home's Complete Record, Built to Transfer</h3>
              <p className="text-sm text-gray-600 mb-3">
                When you sell, your complete maintenance history travels with the home. Buyers pay more for homes with documented care. Studies show verified maintenance history adds 3–5% to sale price.
              </p>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" className="text-sm border-amber-300 text-amber-800 hover:bg-amber-100" onClick={() => setShowSellModal(true)}>
                  <Share2 className="w-4 h-4 mr-2" /> Transfer to New Owner
                </Button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {showAddSystem && propertyId && (
        <AddSystemModal
          propertyId={propertyId}
          onClose={() => setShowAddSystem(false)}
          onSaved={refetchSystems}
        />
      )}

      {showSellModal && propertyId && (
        <SellHomeModal
          propertyId={propertyId}
          propertyAddress={primaryProperty?.address ?? "Your Home"}
          onClose={() => setShowSellModal(false)}
        />
      )}
    </HomeownerLayout>
  );
}
