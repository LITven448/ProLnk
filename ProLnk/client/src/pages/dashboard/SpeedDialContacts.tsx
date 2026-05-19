import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Phone, AlertTriangle, Zap, Droplets, Headphones, Briefcase,
  Truck, CreditCard, MapPin, Clock, Plus, Edit2, Check, X,
  Building2, Wrench,
} from "lucide-react";

interface Supplier {
  id: string;
  name: string;
  phone: string;
  address: string;
  account: string;
  credit: string;
  category: string;
}

interface Contact {
  id: string;
  label: string;
  phone: string;
  note?: string;
  icon: typeof Phone;
  color: string;
}

const EMERGENCY_CONTACTS = [
  {
    label: "Gas Leak",
    name: "Atmos Energy",
    phone: "800-460-3030",
    detail: "24/7 emergency line",
    icon: AlertTriangle,
    bg: "bg-red-950/60",
    border: "border-red-500/50",
    iconColor: "text-red-400",
    textColor: "text-red-300",
  },
  {
    label: "Electrical Emergency",
    name: "Oncor",
    phone: "888-313-4747",
    detail: "Power outage & hazards",
    icon: Zap,
    bg: "bg-yellow-950/60",
    border: "border-yellow-500/50",
    iconColor: "text-yellow-400",
    textColor: "text-yellow-300",
  },
  {
    label: "Water Emergency",
    name: "City of Frisco",
    phone: "972-292-5070",
    detail: "Water main breaks & flooding",
    icon: Droplets,
    bg: "bg-blue-950/60",
    border: "border-blue-500/50",
    iconColor: "text-blue-400",
    textColor: "text-blue-300",
  },
];

const PROLNK_CONTACTS: Contact[] = [
  { id: "p1", label: "Support", phone: "(972) 555-0100", note: "Text or call • 8am–8pm CT", icon: Headphones, color: "text-teal-400" },
  { id: "p2", label: "Partner Success Team", phone: "(972) 555-0101", note: "Dedicated partner line", icon: Briefcase, color: "text-purple-400" },
  { id: "p3", label: "Emergency Dispatch", phone: "(972) 555-0102", note: "24/7 urgent leads", icon: AlertTriangle, color: "text-red-400" },
  { id: "p4", label: "Billing", phone: "(972) 555-0103", note: "Invoices & commission questions", icon: CreditCard, color: "text-amber-400" },
];

const INIT_SUPPLIERS: Supplier[] = [
  { id: "s1", name: "Ferguson HVAC Supply", phone: "(972) 221-8900", address: "1250 W Main St, Lewisville TX", account: "FRG-44821", credit: "$5,000", category: "HVAC" },
  { id: "s2", name: "Rexel Electrical Supply", phone: "(972) 416-1200", address: "700 N Belt Line Rd, Irving TX", account: "RXL-28843", credit: "$3,500", category: "Electrical" },
  { id: "s3", name: "HD Supply Plumbing", phone: "(800) 431-3000", address: "2600 Grapevine Mills Pkwy, Grapevine TX", account: "HDS-77291", credit: "$2,000", category: "Plumbing" },
  { id: "s4", name: "Sunbelt Rentals", phone: "(972) 488-0050", address: "3200 Irving Blvd, Dallas TX", account: "SBR-15509", credit: "N/A", category: "Tool Rental" },
  { id: "s5", name: "84 Lumber", phone: "(972) 219-9300", address: "975 W Frankford Rd, Carrollton TX", account: "84L-90312", credit: "$7,500", category: "Materials" },
];

const NEARBY = [
  { name: "Ferguson HVAC — Lewisville", distance: "4.2 mi", hours: "M-F 7am–5pm", phone: "(972) 221-8900" },
  { name: "Johnstone Supply — Plano", distance: "6.8 mi", hours: "M-F 7am–5:30pm", phone: "(972) 516-5575" },
  { name: "Carrier Enterprise — Carrollton", distance: "9.1 mi", hours: "M-F 7am–4:30pm", phone: "(972) 245-6100" },
];

type Tab = "emergency" | "prolnk" | "suppliers" | "customers";

export default function SpeedDialContacts() {
  const [activeTab, setActiveTab] = useState<Tab>("emergency");
  const [suppliers, setSuppliers] = useState<Supplier[]>(INIT_SUPPLIERS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSupplier, setNewSupplier] = useState<Partial<Supplier>>({});

  function saveEdit(id: string, field: keyof Supplier, value: string) {
    setSuppliers((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  }

  function addSupplier() {
    if (!newSupplier.name || !newSupplier.phone) return;
    setSuppliers((prev) => [
      ...prev,
      {
        id: `s${Date.now()}`,
        name: newSupplier.name ?? "",
        phone: newSupplier.phone ?? "",
        address: newSupplier.address ?? "",
        account: newSupplier.account ?? "",
        credit: newSupplier.credit ?? "",
        category: newSupplier.category ?? "General",
      },
    ]);
    setNewSupplier({});
    setShowAddForm(false);
  }

  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-white">Speed Dial</h1>
            <p className="text-slate-400 mt-1">Reach anyone in seconds</p>
          </div>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-teal-500 hover:bg-teal-400 text-black font-bold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Contact
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-4 gap-1 bg-slate-800 rounded-xl p-1 border border-slate-700">
          {(["emergency", "prolnk", "suppliers", "customers"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                activeTab === tab ? "bg-teal-500 text-black" : "text-slate-400 hover:text-white"
              }`}
            >
              {tab === "prolnk" ? "ProLnk" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Emergency Tab */}
        {activeTab === "emergency" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {EMERGENCY_CONTACTS.map((ec) => (
                <div key={ec.label} className={`rounded-2xl p-6 border-2 ${ec.bg} ${ec.border}`}>
                  <div className={`w-12 h-12 rounded-2xl bg-black/30 flex items-center justify-center mb-4 ${ec.iconColor}`}>
                    <ec.icon className="w-6 h-6" />
                  </div>
                  <p className="text-white font-bold text-lg">{ec.label}</p>
                  <p className={`text-sm mb-3 ${ec.textColor}`}>{ec.name}</p>
                  <a href={`tel:${ec.phone.replace(/-/g, "")}`}>
                    <Button className={`w-full bg-black/40 hover:bg-black/60 border ${ec.border} ${ec.textColor} font-mono text-lg font-bold`}>
                      {ec.phone}
                    </Button>
                  </a>
                  <p className="text-xs text-slate-400 mt-2 text-center">{ec.detail}</p>
                </div>
              ))}
            </div>

            {/* Nearby HVAC */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Wrench className="w-5 h-5 text-teal-400" />
                  <h3 className="text-white font-bold">HVAC Parts Near You</h3>
                </div>
                <div className="space-y-3">
                  {NEARBY.map((nb) => (
                    <div key={nb.name} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50">
                      <div>
                        <p className="text-white text-sm font-medium">{nb.name}</p>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-xs text-teal-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />{nb.distance}
                          </span>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />{nb.hours}
                          </span>
                        </div>
                      </div>
                      <a href={`tel:${nb.phone.replace(/[() -]/g, "")}`}>
                        <Button size="sm" variant="outline" className="border-teal-500/40 text-teal-400 hover:bg-teal-500/10">
                          <Phone className="w-3 h-3 mr-1" />
                          Call
                        </Button>
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ProLnk Tab */}
        {activeTab === "prolnk" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROLNK_CONTACTS.map((c) => (
              <Card key={c.id} className="bg-slate-800 border-slate-700">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center ${c.color}`}>
                      <c.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white font-bold">{c.label}</p>
                      {c.note && <p className="text-xs text-slate-400">{c.note}</p>}
                    </div>
                  </div>
                  <a href={`tel:${c.phone.replace(/[() -]/g, "")}`}>
                    <Button className={`w-full bg-slate-700 hover:bg-slate-600 ${c.color} font-mono font-bold`}>
                      <Phone className="w-4 h-4 mr-2" />
                      {c.phone}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Suppliers Tab */}
        {activeTab === "suppliers" && (
          <div className="space-y-4">
            {suppliers.map((s) => (
              <Card key={s.id} className="bg-slate-800 border-slate-700">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center text-teal-400">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-white font-bold">{s.name}</p>
                        <span className="text-xs text-slate-500 bg-slate-700 px-2 py-0.5 rounded-full">{s.category}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setEditingId(editingId === s.id ? null : s.id)}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {editingId === s.id ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                    </button>
                  </div>

                  {editingId === s.id ? (
                    <div className="grid grid-cols-2 gap-2">
                      {(["phone", "address", "account", "credit"] as (keyof Supplier)[]).map((field) => (
                        <div key={field}>
                          <p className="text-xs text-slate-400 mb-1 capitalize">{field}</p>
                          <Input
                            value={s[field]}
                            onChange={(e) => saveEdit(s.id, field, e.target.value)}
                            className="bg-slate-700 border-slate-600 text-white text-sm h-8"
                          />
                        </div>
                      ))}
                      <button
                        onClick={() => setEditingId(null)}
                        className="col-span-2 flex items-center justify-center gap-2 py-2 bg-teal-500/20 text-teal-400 rounded-lg text-sm font-medium hover:bg-teal-500/30 transition-colors mt-1"
                      >
                        <Check className="w-4 h-4" /> Save
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                      <div>
                        <p className="text-xs text-slate-500">Phone</p>
                        <a href={`tel:${s.phone.replace(/[() -]/g, "")}`} className="text-teal-400 font-mono hover:text-teal-300">
                          {s.phone}
                        </a>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Account #</p>
                        <p className="text-slate-200 font-mono">{s.account}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Address</p>
                        <p className="text-slate-300 text-xs">{s.address}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Credit Limit</p>
                        <p className="text-slate-200">{s.credit}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {showAddForm && (
              <Card className="bg-slate-800 border-teal-500/40 border-2">
                <CardContent className="p-5">
                  <h3 className="text-white font-bold mb-4">Add Supplier</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {([
                      ["name", "Company Name"],
                      ["phone", "Phone"],
                      ["address", "Address"],
                      ["account", "Account #"],
                      ["credit", "Credit Limit"],
                      ["category", "Category"],
                    ] as [keyof Supplier, string][]).map(([field, placeholder]) => (
                      <div key={field} className={field === "address" ? "col-span-2" : ""}>
                        <p className="text-xs text-slate-400 mb-1">{placeholder}</p>
                        <Input
                          placeholder={placeholder}
                          value={(newSupplier[field] as string) ?? ""}
                          onChange={(e) => setNewSupplier((p) => ({ ...p, [field]: e.target.value }))}
                          className="bg-slate-700 border-slate-600 text-white text-sm"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button onClick={addSupplier} className="flex-1 bg-teal-500 hover:bg-teal-400 text-black font-bold">
                      Add Supplier
                    </Button>
                    <Button onClick={() => setShowAddForm(false)} variant="outline" className="border-slate-600 text-slate-400">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === "customers" && (
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-700 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Customer Contacts Coming Soon</h3>
              <p className="text-slate-400 text-sm max-w-sm mx-auto">
                Your customer contact list will populate here once you complete your first matches through ProLnk.
              </p>
              <Button
                onClick={() => setShowAddForm(true)}
                className="mt-6 bg-teal-500 hover:bg-teal-400 text-black font-bold flex items-center gap-2 mx-auto"
              >
                <Plus className="w-4 h-4" />
                Add Contact Manually
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
