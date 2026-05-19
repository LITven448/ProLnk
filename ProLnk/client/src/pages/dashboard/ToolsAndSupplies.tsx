import { useState } from "react";
import { ShoppingCart, RefreshCw, MapPin, Phone, Clock, CheckCircle, Plus, Trash2, Package, DollarSign, Tag, Award } from "lucide-react";

const recentOrders = [
  { item: "MERV-11 HVAC Filter 16x25x1 (6-pack)", supplier: "Ferguson HVAC", date: "May 10″, amount: "$42.00" },
  { item: "R-410A Refrigerant 25 lb Cylinder", supplier: "Johnstone Supply", date: "May 7″, amount: "$87.50" },
  { item: "Klein Tools Multi-Bit Screwdriver Set", supplier: "Home Depot Pro", date: "May 2″, amount: "$28.99" },
];

const quickReorder = [
  { name: "HVAC Filter MERV-11 16x25x1″, supplier: "Ferguson HVAC", price: "$28.00", sku: "FER-FLT-1625" },
  { name: "Refrigerant R-410A 25 lb", supplier: "Johnstone Supply", price: "$87.50″, sku: "JOH-410A-25" },
  { name: "Electrical Wire Nuts (200-pk)", supplier: "Rexel Electric", price: "$14.99″, sku: "REX-WN-200" },
  { name: "PVC Cement (1 qt, Purple Primer)", supplier: "Ferguson Plumbing", price: "$11.25″, sku: "FER-PVC-QT" },
  { name: "3M Blue Painter's Tape 2\" (6-pk)", supplier: "Home Depot Pro", price: "$22.00″, sku: "3M-BT-6PK" },
  { name: "Safety Glasses ANSI Z87.1 (3-pk)", supplier: "Fastenal Safety", price: "$18.50″, sku: "FAS-SG-3PK" },
];

const suppliers = [
  { name: "Ferguson HVAC & Plumbing", type: "HVAC / Plumbing Supply", address: "2401 E. Lamar Blvd, Arlington TX", phone: "(817) 461-2200″, hours: "M-F 7am–5pm, Sat 7am–12pm", credit: true },
  { name: "Johnstone Supply DFW", type: "HVAC Supply", address: "1820 Marketplace Dr, Carrollton TX", phone: "(972) 380-9100″, hours: "M-F 7am–5:30pm", credit: true },
  { name: "Rexel Electric", type: "Electrical Supply", address: "4905 Alpha Rd, Dallas TX", phone: "(214) 350-7880″, hours: "M-F 7am–5pm", credit: false },
  { name: "Sunbelt Rentals", type: "Tool & Equipment Rental", address: "7820 Metropolis Dr, Austin TX", phone: "(512) 836-2190″, hours: "M-F 7am–6pm, Sat 7am–5pm", credit: false },
  { name: "Fastenal Safety Supply", type: "Safety Equipment", address: "645 E. Airport Fwy, Irving TX", phone: "(972) 721-0084″, hours: "M-F 7am–5pm", credit: true },
];

interface ListItem { id: number; name: string; supplier: string; cost: string; done: boolean }

const defaultList: ListItem[] = [
  { id: 1, name: "Capacitor 35+5 MFD dual run", supplier: "Johnstone Supply", cost: "$22″, done: false },
  { id: 2, name: "Contactor 2-pole 40A", supplier: "Rexel Electric", cost: "$18″, done: false },
  { id: 3, name: "Duct tape foil 2\" (3 rolls)", supplier: "Ferguson HVAC", cost: "$16″, done: true },
];

export default function ToolsAndSupplies() {
  const [list, setList] = useState<ListItem[]>(defaultList);
  const [newItem, setNewItem] = useState("");
  const [cartFlash, setCartFlash] = useState<string | null>(null);

  const toggleDone = (id: number) =>
    setList(prev => prev.map(i => i.id === id ? { ...i, done: !i.done } : i));

  const removeItem = (id: number) =>
    setList(prev => prev.filter(i => i.id !== id));

  const addItem = () => {
    if (!newItem.trim()) return;
    setList(prev => [...prev, { id: Date.now(), name: newItem.trim(), supplier: "—", cost: "—", done: false }]);
    setNewItem("");
  };

  const flashCart = (name: string) => {
    setCartFlash(name);
    setTimeout(() => setCartFlash(null), 1500);
  };

  const total = list.filter(i => !i.done && i.cost !== "—").reduce((a, b) => a + parseFloat(b.cost.replace("$", "") || "0″), 0);

  return (
    <div className="min-h-screen bg-[#0A1628] text-white p-6 space-y-8″>
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-2″>
          <Package className="w-7 h-7 text-sky-400″ />
          Tools & Supplies
        </h1>
        <p className="text-slate-400 mt-1″>Everything you need, sourced right</p>
      </div>

      {/* ProLnk Discount Banner */}
      <div className="bg-gradient-to-r from-sky-900/50 to-blue-900/50 border border-sky-500/30 rounded-xl p-4 flex items-center gap-3″>
        <Award className="w-6 h-6 text-yellow-400 shrink-0″ />
        <div>
          <p className="text-white font-semibold">ProLnk Partner Discount</p>
          <p className="text-slate-300 text-sm">Show your ProLnk badge at <span className="text-white font-medium">Ferguson</span> for an <span className="text-emerald-400 font-bold">8% discount</span> on all plumbing supplies. Also valid at Johnstone Supply for HVAC orders over $100.</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <h2 className="text-white font-semibold text-xl mb-3″>Recent Orders</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4″>
          {recentOrders.map(o => (
            <div key={o.item} className="bg-[#1A2942] border border-[#2A3F5F] rounded-xl p-4 space-y-2″>
              <p className="text-white text-sm font-medium leading-snug">{o.item}</p>
              <p className="text-slate-400 text-xs">{o.supplier} · {o.date}</p>
              <div className="flex items-center justify-between pt-1″>
                <span className="text-emerald-400 font-bold">{o.amount}</span>
                <button className="flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 border border-sky-500/30 hover:border-sky-400/50 px-2.5 py-1.5 rounded-lg transition-colors">
                  <RefreshCw className="w-3 h-3″ /> Reorder
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Reorder */}
      <div>
        <h2 className="text-white font-semibold text-xl mb-3″>Quick Reorder</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4″>
          {quickReorder.map(item => (
            <div key={item.sku} className="bg-[#1A2942] border border-[#2A3F5F] rounded-xl p-4 space-y-2″>
              <p className="text-white text-sm font-medium leading-snug">{item.name}</p>
              <div className="flex items-center gap-1.5 text-xs text-slate-400″>
                <Tag className="w-3 h-3″ /> {item.sku}
              </div>
              <p className="text-slate-400 text-xs">{item.supplier}</p>
              <div className="flex items-center justify-between pt-1″>
                <span className="text-white font-bold">{item.price}</span>
                <button
                  onClick={() => flashCart(item.sku)}
                  className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border transition-colors font-medium ${cartFlash === item.sku ? "bg-emerald-600 border-emerald-500 text-white" : "bg-sky-600/20 border-sky-500/40 text-sky-300 hover:bg-sky-600/30"}`}
                >
                  {cartFlash === item.sku ? <CheckCircle className="w-3 h-3″ /> : <ShoppingCart className="w-3 h-3" />}
                  {cartFlash === item.sku ? "Added" : "Add to cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Supplier Directory */}
      <div>
        <h2 className="text-white font-semibold text-xl mb-3″>Local DFW Suppliers</h2>
        <div className="space-y-3″>
          {suppliers.map(s => (
            <div key={s.name} className="bg-[#1A2942] border border-[#2A3F5F] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3″>
              <div className="flex-1 space-y-1″>
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-white font-medium">{s.name}</p>
                  {s.credit && <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30″>Credit Account</span>}
                </div>
                <p className="text-sky-400 text-xs font-medium">{s.type}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-slate-400″>
                  <span className="flex items-center gap-1″><MapPin className="w-3 h-3" />{s.address}</span>
                  <span className="flex items-center gap-1″><Phone className="w-3 h-3" />{s.phone}</span>
                  <span className="flex items-center gap-1″><Clock className="w-3 h-3" />{s.hours}</span>
                </div>
              </div>
              <button className="text-xs text-sky-400 hover:text-sky-300 font-medium border border-sky-500/30 hover:border-sky-400/50 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
                Get Directions
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Shopping List */}
      <div className="bg-[#1A2942] border border-[#2A3F5F] rounded-xl p-5″>
        <div className="flex items-center justify-between mb-4″>
          <h2 className="text-white font-semibold flex items-center gap-2″>
            <CheckCircle className="w-5 h-5 text-sky-400″ /> My Shopping List
          </h2>
          <span className="text-slate-400 text-xs">{list.filter(i => !i.done).length} items remaining</span>
        </div>
        <div className="space-y-2 mb-4″>
          {list.map(item => (
            <div key={item.id} className={`flex items-center gap-3 p-3 rounded-lg ${item.done ? "bg-[#0A1420] opacity-50" : "bg-[#0F1E35]"}`}>
              <button
                onClick={() => toggleDone(item.id)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${item.done ? "bg-emerald-500 border-emerald-500" : "border-slate-500 hover:border-sky-400"}`}
              >
                {item.done && <CheckCircle className="w-3 h-3 text-white" />}
              </button>
              <span className={`flex-1 text-sm ${item.done ? "line-through text-slate-500" : "text-white"}`}>{item.name}</span>
              <span className="text-slate-400 text-xs hidden sm:block">{item.supplier}</span>
              <span className="text-emerald-400 text-sm font-medium w-12 text-right">{item.cost}</span>
              <button onClick={() => removeItem(item.id)} className="text-slate-600 hover:text-red-400 transition-colors ml-1″>
                <Trash2 className="w-4 h-4″ />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2″>
          <input
            type="text"
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addItem()}
            placeholder="Add item..."
            className="flex-1 bg-[#0F1E35] border border-[#2A3F5F] rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500″
          />
          <button
            onClick={addItem}
            className="bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 text-sm font-medium"
          >
            <Plus className="w-4 h-4″ /> Add
          </button>
        </div>
      </div>

      {/* Cost Tracker */}
      <div className="bg-[#1A2942] border border-[#2A3F5F] rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3″>
        <div className="flex items-center gap-3″>
          <DollarSign className="w-6 h-6 text-emerald-400″ />
          <div>
            <p className="text-slate-400 text-sm">This month's supply costs</p>
            <p className="text-white text-2xl font-bold">$342</p>
          </div>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-2 text-sm text-emerald-300″>
          100% deductible as business expense — keep your receipts
        </div>
      </div>
    </div>
  );
}
