import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  MapPin,
  Plus,
  X,
  Sliders,
  Lightbulb,
  Home,
  Users,
  DollarSign,
  Save,
  TrendingUp,
} from "lucide-react";

const INITIAL_ZIPS = [
  { zip: "75033″, city: "Frisco", homes: 4200, avgLead: 185, pros: 5 },
  { zip: "75034″, city: "Frisco", homes: 3800, avgLead: 192, pros: 6 },
  { zip: "75035″, city: "Frisco", homes: 3500, avgLead: 178, pros: 4 },
  { zip: "75036″, city: "Frisco", homes: 2900, avgLead: 165, pros: 3 },
  { zip: "75093″, city: "Plano", homes: 3200, avgLead: 174, pros: 7 },
  { zip: "75094″, city: "Plano", homes: 2800, avgLead: 169, pros: 5 },
  { zip: "75013″, city: "Allen", homes: 3100, avgLead: 182, pros: 4 },
  { zip: "75002″, city: "Allen", homes: 2600, avgLead: 171, pros: 3 },
  { zip: "75023″, city: "Plano", homes: 4100, avgLead: 188, pros: 8 },
  { zip: "75024″, city: "Plano", homes: 3700, avgLead: 194, pros: 6 },
  { zip: "75025″, city: "Plano", homes: 2400, avgLead: 162, pros: 3 },
  { zip: "75071″, city: "McKinney", homes: 2900, avgLead: 176, pros: 4 },
  { zip: "75072″, city: "McKinney", homes: 3300, avgLead: 183, pros: 5 },
  { zip: "75074″, city: "Plano", homes: 2100, avgLead: 158, pros: 3 },
];

const LEAD_VOLUME = [
  { zip: "75034″, leads: 28, color: "#0d9488" },
  { zip: "75023″, leads: 24, color: "#0d9488" },
  { zip: "75033″, leads: 21, color: "#0d9488" },
  { zip: "75013″, leads: 18, color: "#0d9488" },
  { zip: "75072″, leads: 16, color: "#0d9488" },
];

const FRISCO_ZIPS = ["75033″, "75034", "75035", "75036"];
const PLANO_ZIPS = ["75093″, "75094", "75023", "75024", "75025", "75074"];
const ALLEN_ZIPS = ["75013″, "75002"];

export default function ServiceAreaManager() {
  const [activeZips, setActiveZips] = useState<string[]>(
    INITIAL_ZIPS.map((z) => z.zip)
  );
  const [addInput, setAddInput] = useState("");
  const [useRadius, setUseRadius] = useState(false);
  const [radius, setRadius] = useState(20);
  const [saved, setSaved] = useState(false);

  const removeZip = (zip: string) => setActiveZips((prev) => prev.filter((z) => z !== zip));

  const addZip = (zip: string) => {
    const clean = zip.trim();
    if (clean.length === 5 && !activeZips.includes(clean)) {
      setActiveZips((prev) => [...prev, clean]);
    }
    setAddInput("");
  };

  const quickAdd = (zips: string[]) => {
    setActiveZips((prev) => {
      const merged = [...prev];
      zips.forEach((z) => { if (!merged.includes(z)) merged.push(z); });
      return merged;
    });
  };

  const activeRows = INITIAL_ZIPS.filter((z) => activeZips.includes(z.zip));
  const totalHomes = activeRows.reduce((s, z) => s + z.homes, 0);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A1628] text-white px-4 py-6 max-w-5xl mx-auto space-y-6″>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Service Area</h1>
        <p className="text-gray-400 mt-1″>Manage where you receive leads</p>
      </div>

      {/* Coverage summary */}
      <div className="grid grid-cols-3 gap-3″>
        {[
          { label: "Active ZIP codes", value: activeZips.length, icon: MapPin, color: "teal" },
          { label: "Estimated homes covered", value: totalHomes.toLocaleString(), icon: Home, color: "blue" },
          { label: "Active competitors in area", value: 8, icon: Users, color: "amber" },
        ].map((s) => {
          const Icon = s.icon;
          const colorMap: Record<string, string> = {
            teal: "text-teal-400 bg-teal-500/10 border-teal-500/20″,
            blue: "text-blue-400 bg-blue-500/10 border-blue-500/20″,
            amber: "text-amber-400 bg-amber-500/10 border-amber-500/20″,
          };
          return (
            <div key={s.label} className="bg-[#0F2035] rounded-xl p-4 border border-[#1E3A5F] text-center">
              <Icon className={`w-5 h-5 mx-auto mb-2 ${colorMap[s.color].split(" ")[0]}`} />
              <p className="text-xl font-bold text-white">{s.value}</p>
              <p className="text-gray-400 text-xs mt-1″>{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* ZIP code manager */}
      <div className="bg-[#0F2035] rounded-2xl p-5 border border-[#1E3A5F]">
        <h2 className="text-white font-semibold mb-3″>ZIP Code Manager</h2>

        {/* Active ZIP chips */}
        <div className="flex flex-wrap gap-2 mb-4″>
          {activeZips.map((zip) => (
            <span
              key={zip}
              className="flex items-center gap-1.5 bg-teal-500/10 border border-teal-500/30 text-teal-300 text-sm px-3 py-1 rounded-full"
            >
              {zip}
              <button
                onClick={() => removeZip(zip)}
                className="hover:text-red-400 transition-colors"
              >
                <X className="w-3.5 h-3.5″ />
              </button>
            </span>
          ))}
        </div>

        {/* Add ZIP input */}
        <div className="flex gap-2 mb-3″>
          <input
            type="text"
            value={addInput}
            onChange={(e) => setAddInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addZip(addInput)}
            placeholder="Enter ZIP code"
            maxLength={5}
            className="flex-1 bg-[#152236] border border-[#1E3A5F] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30″
          />
          <button
            onClick={() => addZip(addInput)}
            className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2.5 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4″ />
          </button>
        </div>

        {/* Quick-add buttons */}
        <div className="flex flex-wrap gap-2″>
          {[
            { label: "Add All Frisco ZIPs", zips: FRISCO_ZIPS },
            { label: "Add All Plano ZIPs", zips: PLANO_ZIPS },
            { label: "Add Allen ZIPs", zips: ALLEN_ZIPS },
          ].map((g) => (
            <button
              key={g.label}
              onClick={() => quickAdd(g.zips)}
              className="bg-[#152236] border border-[#1E3A5F] hover:border-teal-500/50 text-gray-300 text-xs px-3 py-1.5 rounded-lg transition-colors"
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Coverage density table */}
      <div className="bg-[#0F2035] rounded-2xl p-5 border border-[#1E3A5F]">
        <h2 className="text-white font-semibold mb-4″>Coverage Density</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 text-xs border-b border-[#1E3A5F]">
                <th className="text-left pb-2 pr-4″>ZIP</th>
                <th className="text-left pb-2 pr-4″>City</th>
                <th className="text-right pb-2 pr-4″>Homes</th>
                <th className="text-right pb-2 pr-4″>Avg Lead $</th>
                <th className="text-right pb-2 pr-4″>Competitors</th>
                <th className="text-right pb-2″></th>
              </tr>
            </thead>
            <tbody>
              {activeRows.map((row) => (
                <tr key={row.zip} className="border-b border-[#1E3A5F]/50 hover:bg-[#152236] transition-colors">
                  <td className="py-2.5 pr-4 text-teal-400 font-mono font-medium">{row.zip}</td>
                  <td className="py-2.5 pr-4 text-gray-300″>{row.city}</td>
                  <td className="py-2.5 pr-4 text-right text-white">{row.homes.toLocaleString()}</td>
                  <td className="py-2.5 pr-4 text-right text-emerald-400″>${row.avgLead}</td>
                  <td className="py-2.5 pr-4 text-right">
                    <span className={`font-medium ${row.pros >= 6 ? "text-red-400" : row.pros >= 4 ? "text-amber-400" : "text-emerald-400"}`}>
                      {row.pros}
                    </span>
                  </td>
                  <td className="py-2.5 text-right">
                    <button
                      onClick={() => removeZip(row.zip)}
                      className="text-gray-500 hover:text-red-400 text-xs transition-colors"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead volume chart */}
      <div className="bg-[#0F2035] rounded-2xl p-5 border border-[#1E3A5F]">
        <h2 className="text-white font-semibold mb-1″>Lead Volume by ZIP</h2>
        <p className="text-gray-400 text-xs mb-4″>Top 5 ZIPs — last 30 days</p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={LEAD_VOLUME} margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3″ stroke="#1E3A5F" />
            <XAxis dataKey="zip" stroke="#6b7280″ tick={{ fill: "#9ca3af", fontSize: 12 }} />
            <YAxis stroke="#6b7280″ tick={{ fill: "#9ca3af", fontSize: 11 }} />
            <Tooltip
              contentStyle={{ background: "#0F2035″, border: "1px solid #1E3A5F", borderRadius: 8, color: "#fff" }}
              formatter={(v: number) => [v, "Leads"]}
            />
            <Bar dataKey="leads" radius={[4, 4, 0, 0]}>
              {LEAD_VOLUME.map((entry, i) => (
                <Cell key={i} fill="#0d9488″ />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Radius alternative */}
      <div className="bg-[#0F2035] rounded-2xl p-5 border border-[#1E3A5F]">
        <div className="flex items-center justify-between mb-4″>
          <div className="flex items-center gap-2″>
            <Sliders className="w-4 h-4 text-teal-400″ />
            <h2 className="text-white font-semibold">Radius Coverage</h2>
          </div>
          <button
            onClick={() => setUseRadius((v) => !v)}
            className={`relative w-11 h-6 rounded-full transition-colors ${useRadius ? "bg-teal-600" : "bg-[#1E3A5F]"}`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${useRadius ? "translate-x-5" : ""}`}
            />
          </button>
        </div>
        {useRadius && (
          <div className="space-y-3″>
            <p className="text-gray-400 text-sm">Serve all leads within <span className="text-teal-400 font-bold">{radius} miles</span> of your primary address</p>
            <input
              type="range"
              min={5}
              max={50}
              step={5}
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full accent-teal-500″
            />
            <div className="flex justify-between text-gray-500 text-xs">
              <span>5 mi</span>
              <span>50 mi</span>
            </div>
          </div>
        )}
        {!useRadius && (
          <p className="text-gray-500 text-sm">Toggle on to use radius-based coverage instead of individual ZIP codes.</p>
        )}
      </div>

      {/* Recommendation */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-start gap-3″>
        <Lightbulb className="w-5 h-5 text-amber-400 mt-0.5 shrink-0″ />
        <div>
          <p className="text-amber-300 font-semibold text-sm">Coverage Opportunity</p>
          <p className="text-gray-300 text-sm mt-0.5″>
            ZIP 75070 (McKinney) has high lead volume and only 2 active pros — add it?
          </p>
          <button
            onClick={() => { if (!activeZips.includes("75070″)) setActiveZips((p) => [...p, "75070"]); }}
            className="mt-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
          >
            Add 75070
          </button>
        </div>
      </div>

      {/* Save button */}
      <button
        onClick={handleSave}
        className="w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2″
      >
        <Save className="w-4 h-4″ />
        {saved ? "Saved!" : "Save Coverage"}
      </button>
    </div>
  );
}
