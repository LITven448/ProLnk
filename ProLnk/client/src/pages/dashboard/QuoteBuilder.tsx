import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText, Plus, Trash2, Send, Copy, Eye, CheckCircle,
  Clock, XCircle, TrendingUp, Lightbulb, DollarSign, ChevronDown,
} from "lucide-react";

const SERVICE_TYPES = [
  "HVAC Repair / Replacement",
  "Plumbing – Repair",
  "Plumbing – Installation",
  "Electrical – Panel / Wiring",
  "Roofing – Repair",
  "Roofing – Replacement",
  "Flooring Installation",
  "General Contracting",
];

const VALIDITY_OPTIONS = [
  { label: "7 days", value: 7 },
  { label: "14 days", value: 14 },
  { label: "30 days", value: 30 },
];

const RECENT_QUOTES = [
  { homeowner: "Sarah M.", address: "4521 Oak Hollow Dr, Frisco TX", service: "HVAC Replacement", amount: 6850, date: "May 12, 2026″, status: "accepted" },
  { homeowner: "Marcus L.", address: "2201 Ridgeline Blvd, Plano TX", service: "Plumbing – Repair", amount: 1240, date: "May 10, 2026″, status: "pending" },
  { homeowner: "Jennifer K.", address: "887 Sunstone Ct, Allen TX", service: "Electrical – Panel", amount: 3400, date: "May 8, 2026″, status: "declined" },
];

type LineItem = { description: string; unit: string; qty: number; price: number };

const STATUS_CONFIG: Record<string, { icon: typeof CheckCircle; color: string; label: string }> = {
  accepted: { icon: CheckCircle, color: "text-green-400″, label: "Accepted" },
  pending: { icon: Clock, color: "text-yellow-400″, label: "Pending" },
  declined: { icon: XCircle, color: "text-red-400″, label: "Declined" },
};

const TX_TAX = 0.0825;

export default function QuoteBuilder() {
  const [homeowner, setHomeowner] = useState("");
  const [address, setAddress] = useState("");
  const [serviceType, setServiceType] = useState(SERVICE_TYPES[0]);
  const [lines, setLines] = useState<LineItem[]>([
    { description: "", unit: "ea", qty: 1, price: 0 },
  ]);
  const [laborHours, setLaborHours] = useState(0);
  const [laborRate, setLaborRate] = useState(95);
  const [notes, setNotes] = useState("");
  const [validity, setValidity] = useState(14);
  const [sent, setSent] = useState(false);

  const materialsSubtotal = lines.reduce((acc, l) => acc + l.qty * l.price, 0);
  const laborSubtotal = laborHours * laborRate;
  const subtotal = materialsSubtotal + laborSubtotal;
  const tax = subtotal * TX_TAX;
  const total = subtotal + tax;

  function updateLine(i: number, field: keyof LineItem, value: string | number) {
    setLines(prev => prev.map((l, idx) => idx === i ? { ...l, [field]: value } : l));
  }

  function addLine() {
    setLines(prev => [...prev, { description: "", unit: "ea", qty: 1, price: 0 }]);
  }

  function removeLine(i: number) {
    setLines(prev => prev.filter((_, idx) => idx !== i));
  }

  function handleSend() {
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  const inputCls = "w-full bg-[#0F1E35] border border-[#1E3A5F] text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500 placeholder-slate-500″;
  const labelCls = "block text-slate-400 text-xs mb-1″;

  return (
    <div className="min-h-screen bg-[#0A1628] text-white px-4 py-8 max-w-5xl mx-auto space-y-8″>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1″>
          <FileText className="w-6 h-6 text-teal-400″ />
          <h1 className="text-2xl font-bold text-white">Quote Builder</h1>
        </div>
        <p className="text-slate-400 text-sm">Win more jobs with professional proposals</p>
      </div>

      {/* Stats banner */}
      <div className="flex flex-wrap gap-4″>
        <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg px-4 py-3 flex items-center gap-2″>
          <TrendingUp className="w-4 h-4 text-teal-400″ />
          <span className="text-sm text-teal-300 font-medium">Your quotes win <strong>68%</strong> of the time — 14% above average</span>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-4 py-3 flex items-center gap-2″>
          <Lightbulb className="w-4 h-4 text-yellow-400″ />
          <span className="text-sm text-yellow-300″>Quotes sent within 2 hrs win <strong>2.4x</strong> more</span>
        </div>
      </div>

      {/* Recent Quotes */}
      <div>
        <h2 className="text-white font-semibold mb-3″>Recent Quotes</h2>
        <div className="grid sm:grid-cols-3 gap-4″>
          {RECENT_QUOTES.map((q, i) => {
            const cfg = STATUS_CONFIG[q.status];
            const Icon = cfg.icon;
            return (
              <Card key={i} className="bg-[#0F1E35] border-[#1E3A5F]">
                <CardContent className="p-4″>
                  <div className="flex items-start justify-between mb-2″>
                    <div>
                      <p className="text-white font-medium text-sm">{q.homeowner}</p>
                      <p className="text-slate-500 text-xs">{q.address}</p>
                    </div>
                    <span className={`flex items-center gap-1 text-xs font-medium ${cfg.color}`}>
                      <Icon className="w-3.5 h-3.5″ />
                      {cfg.label}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs mb-1″>{q.service}</p>
                  <p className="text-teal-400 font-bold">${q.amount.toLocaleString()}</p>
                  <p className="text-slate-500 text-xs mt-1″>{q.date}</p>
                  <div className="flex gap-2 mt-3″>
                    <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-white border border-[#1E3A5F] hover:border-slate-500 rounded px-2 py-1 transition-colors">
                      <Eye className="w-3 h-3″ /> View
                    </button>
                    <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-white border border-[#1E3A5F] hover:border-slate-500 rounded px-2 py-1 transition-colors">
                      <Copy className="w-3 h-3″ /> Copy
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Build New Quote */}
      <div>
        <h2 className="text-white font-semibold mb-4″>Build a New Quote</h2>
        <Card className="bg-[#0F1E35] border-[#1E3A5F]">
          <CardContent className="p-6 space-y-6″>

            {/* Homeowner info */}
            <div className="grid sm:grid-cols-2 gap-4″>
              <div>
                <label className={labelCls}>Homeowner Name</label>
                <input className={inputCls} placeholder="e.g. John Smith" value={homeowner} onChange={e => setHomeowner(e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Property Address</label>
                <input className={inputCls} placeholder="123 Main St, Frisco TX" value={address} onChange={e => setAddress(e.target.value)} />
              </div>
            </div>

            {/* Service type */}
            <div>
              <label className={labelCls}>Service Type</label>
              <div className="relative">
                <select
                  className={`${inputCls} appearance-none pr-8`}
                  value={serviceType}
                  onChange={e => setServiceType(e.target.value)}
                >
                  {SERVICE_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-2.5 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Line Items */}
            <div>
              <label className={labelCls}>Line Items</label>
              <div className="space-y-2 mb-2″>
                <div className="hidden sm:grid grid-cols-[3fr_1fr_1fr_1fr_auto] gap-2 text-xs text-slate-500 px-1″>
                  <span>Description</span><span>Unit</span><span>Qty</span><span>Price ($)</span><span></span>
                </div>
                {lines.map((line, i) => (
                  <div key={i} className="grid grid-cols-[3fr_1fr_1fr_1fr_auto] gap-2 items-center">
                    <input className={inputCls} placeholder="Description" value={line.description} onChange={e => updateLine(i, "description", e.target.value)} />
                    <input className={inputCls} placeholder="ea" value={line.unit} onChange={e => updateLine(i, "unit", e.target.value)} />
                    <input type="number" className={inputCls} min={0} value={line.qty} onChange={e => updateLine(i, "qty", Number(e.target.value))} />
                    <input type="number" className={inputCls} min={0} placeholder="0″ value={line.price || ""} onChange={e => updateLine(i, "price", Number(e.target.value))} />
                    <button onClick={() => removeLine(i)} className="text-slate-500 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4″ />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={addLine} className="flex items-center gap-1.5 text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors">
                <Plus className="w-4 h-4″ /> Add Line
              </button>
            </div>

            {/* Labor */}
            <div className="grid sm:grid-cols-2 gap-4″>
              <div>
                <label className={labelCls}>Labor Hours</label>
                <input type="number" className={inputCls} min={0} step={0.5} value={laborHours} onChange={e => setLaborHours(Number(e.target.value))} />
              </div>
              <div>
                <label className={labelCls}>Labor Rate ($/hr)</label>
                <input type="number" className={inputCls} min={0} value={laborRate} onChange={e => setLaborRate(Number(e.target.value))} />
              </div>
            </div>

            {/* Totals */}
            <div className="bg-[#0A1628] rounded-lg p-4 space-y-2 border border-[#1E3A5F]">
              <div className="flex justify-between text-sm text-slate-400″>
                <span>Materials Subtotal</span>
                <span>${materialsSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-400″>
                <span>Labor ({laborHours} hrs × ${laborRate}/hr)</span>
                <span>${laborSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-400 border-t border-[#1E3A5F] pt-2″>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-400″>
                <span>TX Sales Tax (8.25%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center border-t border-[#1E3A5F] pt-2″>
                <span className="text-white font-semibold">Total</span>
                <span className="text-teal-400 font-bold text-2xl">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Notes & Validity */}
            <div className="grid sm:grid-cols-2 gap-4″>
              <div>
                <label className={labelCls}>Notes / Terms</label>
                <textarea
                  className={`${inputCls} h-24 resize-none`}
                  placeholder="Payment terms, warranty, scope notes..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Quote Valid For</label>
                <div className="flex gap-2″>
                  {VALIDITY_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setValidity(opt.value)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${validity === opt.value ? "bg-teal-500 border-teal-500 text-white" : "bg-[#0A1628] border-[#1E3A5F] text-slate-400 hover:border-slate-500"}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Send CTA */}
            {sent ? (
              <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-lg p-4″>
                <CheckCircle className="w-5 h-5 text-green-400″ />
                <div>
                  <p className="text-green-400 font-semibold text-sm">Quote sent via SMS + Email</p>
                  <p className="text-slate-400 text-xs">Homeowner will receive a link to review and accept</p>
                </div>
              </div>
            ) : (
              <Button
                onClick={handleSend}
                className="w-full bg-teal-500 hover:bg-teal-400 text-white font-semibold py-3 text-base"
              >
                <Send className="w-4 h-4 mr-2″ />
                Send Quote
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
