import { useState } from "react";
import {
  Truck,
  Wrench,
  DollarSign,
  Shield,
  ChevronDown,
  ChevronUp,
  Plus,
  X,
  AlertTriangle,
  CheckCircle,
  Clock,
  Hammer,
} from "lucide-react";

const D = {
  bg: "#0A1628″,
  surface: "#0F1E35″,
  card: "#152035″,
  border: "#1E2E45″,
  text: "#F0F4FF",
  muted: "#7A8BA8″,
  dim: "#3A4E68″,
  cyan: "#00D4FF",
  green: "#00E676″,
  amber: "#FFB300″,
  red: "#FF4444″,
  blue: "#3B82F6″,
  purple: "#A855F7″,
};

type Condition = "Excellent" | "Good" | "Fair" | "Replace Soon";

interface EquipmentItem {
  id: string;
  name: string;
  value: number;
  purchased: string;
  condition: Condition;
  category: string;
}

interface MaintenanceRecord {
  date: string;
  mileage: number;
  service: string;
}

const CONDITION_CONFIG: Record<Condition, { color: string; bg: string }> = {
  Excellent: { color: D.green, bg: "#00E67620″ },
  Good: { color: D.cyan, bg: "#00D4FF18″ },
  Fair: { color: D.amber, bg: "#FFB30020″ },
  "Replace Soon": { color: D.red, bg: "#FF444420″ },
};

const INITIAL_EQUIPMENT: EquipmentItem[] = [
  { id: "1″, name: "HVAC Manifold Gauge", value: 420, purchased: "2024-03", condition: "Excellent", category: "HVAC" },
  { id: "2″, name: "Refrigerant Scale", value: 180, purchased: "2024-03", condition: "Good", category: "HVAC" },
  { id: "3″, name: "Torch Kit", value: 340, purchased: "2023-11", condition: "Good", category: "Tools" },
  { id: "4″, name: "Multimeter", value: 89, purchased: "2023-08", condition: "Excellent", category: "Electrical" },
  { id: "5″, name: "Shop Vac", value: 220, purchased: "2023-06", condition: "Good", category: "Cleaning" },
  { id: "6″, name: "Power Drill", value: 180, purchased: "2024-01", condition: "Excellent", category: "Tools" },
  { id: "7″, name: "Extension Cords", value: 45, purchased: "2022-09", condition: "Fair", category: "Electrical" },
  { id: "8″, name: "Safety Equipment", value: 120, purchased: "2024-05", condition: "Good", category: "Safety" },
];

const MAINTENANCE_HISTORY: MaintenanceRecord[] = [
  { date: "March 2026″, mileage: 78420, service: "Oil change + filter" },
  { date: "November 2025″, mileage: 72100, service: "Tire rotation + brake inspection" },
  { date: "June 2025″, mileage: 65800, service: "Oil change, cabin air filter" },
  { date: "January 2025″, mileage: 59200, service: "Full synthetic oil change" },
];

interface AddItemForm {
  name: string;
  value: string;
  category: string;
  purchased: string;
}

export default function EquipmentTracker() {
  const [equipment, setEquipment] = useState<EquipmentItem[]>(INITIAL_EQUIPMENT);
  const [showHistory, setShowHistory] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState<AddItemForm>({ name: "", value: "", category: "", purchased: "" });

  const totalEquipmentValue = equipment.reduce((sum, e) => sum + e.value, 0);
  const ytdDeductible = equipment.filter(e => e.purchased.startsWith("2026″)).reduce((sum, e) => sum + e.value, 0);

  function addItem() {
    if (!form.name || !form.value) return;
    const newItem: EquipmentItem = {
      id: String(Date.now()),
      name: form.name,
      value: parseFloat(form.value) || 0,
      category: form.category || "Other",
      purchased: form.purchased || "2026-05″,
      condition: "Excellent",
    };
    setEquipment(prev => [...prev, newItem]);
    setForm({ name: "", value: "", category: "", purchased: "" });
    setShowAddForm(false);
  }

  function removeItem(id: string) {
    setEquipment(prev => prev.filter(e => e.id !== id));
  }

  return (
    <div className="min-h-screen p-6″ style={{ background: D.bg }}>
      <div className="max-w-4xl mx-auto space-y-6″>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold" style={{ color: D.text }}>Equipment & Assets</h1>
          <p className="text-sm mt-1″ style={{ color: D.muted }}>Track what keeps your business running</p>
        </div>

        {/* Fleet overview cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4″>
          {[
            { icon: Truck, label: "Vehicles", value: "1″, color: D.blue },
            { icon: Wrench, label: "Tools & Equipment", value: String(equipment.length), color: D.cyan },
            { icon: DollarSign, label: "Total Asset Value", value: `$${(28400).toLocaleString()}`, color: D.green },
            { icon: Shield, label: "Insurance Coverage", value: "$50K", color: D.purple },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="rounded-2xl p-4″ style={{ background: D.card, border: `1px solid ${D.border}` }}>
              <div className="flex items-center gap-2 mb-2″>
                <Icon className="w-4 h-4″ style={{ color }} />
                <span className="text-xs" style={{ color: D.muted }}>{label}</span>
              </div>
              <p className="text-xl font-bold" style={{ color }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Vehicle section */}
        <div className="rounded-2xl p-5″ style={{ background: D.card, border: `1px solid ${D.border}` }}>
          <div className="flex items-center gap-3 mb-4″>
            <Truck className="w-5 h-5″ style={{ color: D.blue }} />
            <h2 className="text-sm font-bold" style={{ color: D.text }}>Vehicle</h2>
          </div>

          <div className="rounded-xl p-4″ style={{ background: D.surface, border: `1px solid ${D.dim}` }}>
            <div className="flex items-start justify-between mb-3″>
              <div>
                <p className="font-bold" style={{ color: D.text }}>2019 Ford F-250</p>
                <p className="text-xs mt-0.5″ style={{ color: D.muted }}>License: TX-PRO-428</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full font-bold" style={{ background: D.green + "20″, color: D.green }}>Active</span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 mb-4″>
              {[
                { label: "Mileage", value: "78,420 mi" },
                { label: "Last Service", value: "March 2026″ },
                { label: "Next Service Due", value: "80,000 mi" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs mb-1″ style={{ color: D.muted }}>{label}</p>
                  <p className="text-sm font-bold" style={{ color: D.text }}>{value}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 p-3 rounded-xl mb-3″ style={{ background: D.amber + "12", border: `1px solid ${D.amber}30` }}>
              <AlertTriangle className="w-4 h-4 flex-shrink-0″ style={{ color: D.amber }} />
              <p className="text-xs" style={{ color: D.amber }}>
                <strong>Vehicle service due in 1,580 miles</strong> — schedule at Jiffy Lube?
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs" style={{ color: D.muted }}>
              <span>Insurance: <strong style={{ color: D.text }}>State Farm</strong></span>
              <span>Expires: <strong style={{ color: D.amber }}>Aug 2026</strong></span>
            </div>

            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-1.5 mt-4 text-xs font-bold transition-opacity hover:opacity-80″
              style={{ color: D.cyan }}
            >
              {showHistory ? <ChevronUp className="w-3.5 h-3.5″ /> : <ChevronDown className="w-3.5 h-3.5" />}
              Maintenance History
            </button>

            {showHistory && (
              <div className="mt-3 space-y-2″>
                {MAINTENANCE_HISTORY.map((rec, i) => (
                  <div key={i} className="flex items-center justify-between py-2″ style={{ borderTop: `1px solid ${D.border}` }}>
                    <div className="flex items-center gap-3″>
                      <Clock className="w-3.5 h-3.5″ style={{ color: D.dim }} />
                      <div>
                        <p className="text-xs font-bold" style={{ color: D.text }}>{rec.service}</p>
                        <p className="text-xs" style={{ color: D.muted }}>{rec.date}</p>
                      </div>
                    </div>
                    <span className="text-xs" style={{ color: D.muted }}>{rec.mileage.toLocaleString()} mi</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Equipment list */}
        <div className="rounded-2xl p-5″ style={{ background: D.card, border: `1px solid ${D.border}` }}>
          <div className="flex items-center justify-between mb-4″>
            <div className="flex items-center gap-3″>
              <Hammer className="w-5 h-5″ style={{ color: D.cyan }} />
              <h2 className="text-sm font-bold" style={{ color: D.text }}>Tools & Equipment</h2>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:opacity-90″
              style={{ background: D.cyan + "20″, color: D.cyan, border: `1px solid ${D.cyan}40` }}
            >
              <Plus className="w-3.5 h-3.5″ />
              Add Item
            </button>
          </div>

          {showAddForm && (
            <div className="rounded-xl p-4 mb-4″ style={{ background: D.surface, border: `1px solid ${D.cyan}30` }}>
              <p className="text-xs font-bold mb-3″ style={{ color: D.text }}>New Item</p>
              <div className="grid grid-cols-2 gap-3″>
                <div>
                  <label className="text-xs mb-1 block" style={{ color: D.muted }}>Item Name</label>
                  <input
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                    style={{ background: D.card, border: `1px solid ${D.border}`, color: D.text }}
                    placeholder="e.g. Pipe wrench"
                  />
                </div>
                <div>
                  <label className="text-xs mb-1 block" style={{ color: D.muted }}>Value ($)</label>
                  <input
                    value={form.value}
                    onChange={e => setForm(f => ({ ...f, value: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                    style={{ background: D.card, border: `1px solid ${D.border}`, color: D.text }}
                    placeholder="0″
                    type="number"
                  />
                </div>
                <div>
                  <label className="text-xs mb-1 block" style={{ color: D.muted }}>Category</label>
                  <input
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                    style={{ background: D.card, border: `1px solid ${D.border}`, color: D.text }}
                    placeholder="e.g. HVAC, Electrical"
                  />
                </div>
                <div>
                  <label className="text-xs mb-1 block" style={{ color: D.muted }}>Purchase Date</label>
                  <input
                    value={form.purchased}
                    onChange={e => setForm(f => ({ ...f, purchased: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                    style={{ background: D.card, border: `1px solid ${D.border}`, color: D.text }}
                    placeholder="2026-05″
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-3″>
                <button
                  onClick={addItem}
                  className="flex-1 py-2 rounded-lg text-xs font-bold transition-all hover:opacity-90″
                  style={{ background: D.cyan, color: "#0A1628″ }}
                >
                  Add Item
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 rounded-lg text-xs font-bold"
                  style={{ background: D.border, color: D.muted }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="space-y-2″>
            {equipment.map(item => {
              const cond = CONDITION_CONFIG[item.condition];
              return (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl" style={{ background: D.surface, border: `1px solid ${D.border}` }}>
                  <div className="flex items-center gap-3 min-w-0″>
                    <Wrench className="w-4 h-4 flex-shrink-0″ style={{ color: D.dim }} />
                    <div className="min-w-0″>
                      <p className="text-sm font-bold truncate" style={{ color: D.text }}>{item.name}</p>
                      <p className="text-xs" style={{ color: D.muted }}>{item.category} · {item.purchased}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-2″>
                    <span className="text-xs font-bold" style={{ color: D.text }}>${item.value.toLocaleString()}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: cond.bg, color: cond.color }}>
                      {item.condition}
                    </span>
                    <button onClick={() => removeItem(item.id)} className="opacity-40 hover:opacity-80 transition-opacity">
                      <X className="w-3.5 h-3.5″ style={{ color: D.muted }} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tax deduction note */}
          <div className="flex items-center gap-3 mt-4 p-3 rounded-xl" style={{ background: D.green + "10″, border: `1px solid ${D.green}25` }}>
            <CheckCircle className="w-4 h-4 flex-shrink-0″ style={{ color: D.green }} />
            <p className="text-xs" style={{ color: D.green }}>
              <strong>Equipment total: ${ytdDeductible.toLocaleString()}</strong> in deductible tools this year
              {ytdDeductible === 0 && (
                <span style={{ color: D.muted }}> · Add 2026 purchase dates to track deductions</span>
              )}
            </p>
          </div>
        </div>

        {/* Summary footer */}
        <div className="rounded-2xl p-5″ style={{ background: D.card, border: `1px solid ${D.border}` }}>
          <h2 className="text-sm font-bold mb-3″ style={{ color: D.text }}>Asset Summary</h2>
          <div className="grid grid-cols-3 gap-4″>
            {[
              { label: "Vehicle", value: "$18,400″, note: "Approx. book value" },
              { label: "Equipment", value: `$${totalEquipmentValue.toLocaleString()}`, note: `${equipment.length} items tracked` },
              { label: "Total Portfolio", value: `$${(18400 + totalEquipmentValue).toLocaleString()}`, note: "Depreciable assets" },
            ].map(({ label, value, note }) => (
              <div key={label}>
                <p className="text-xs mb-1″ style={{ color: D.muted }}>{label}</p>
                <p className="text-lg font-bold" style={{ color: D.text }}>{value}</p>
                <p className="text-xs" style={{ color: D.dim }}>{note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
