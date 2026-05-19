import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  D, MetricCard, SectionHeader, DataTable, BarChart,
  DCard, StatusBadge,
} from "@/components/DashboardShared";
import { Star, Eye, RotateCcw, Plus, X } from "lucide-react";
import { toast } from "sonner";

interface SpotlightCard {
  id: number;
  name: string;
  trade: string;
  rating: number;
  quote: string;
  jobs: number;
  revenue: string;
  customerRating: string;
  status: "active" | "pending" | "inactive";
}

const FEATURED: SpotlightCard[] = [
  {
    id: 1,
    name: "Mike Johnson",
    trade: "Plumbing",
    rating: 4.9,
    quote: "ProLnk doubled my booked jobs in 60 days — the lead quality is unlike anything I've seen.",
    jobs: 247,
    revenue: "$84K",
    customerRating: "4.9 ★",
    status: "active",
  },
  {
    id: 2,
    name: "Sarah Chen",
    trade: "Electrical",
    rating: 4.8,
    quote: "The AI matching system sends me exactly the jobs I specialize in — no wasted time.",
    jobs: 183,
    revenue: "$61K",
    customerRating: "4.8 ★",
    status: "active",
  },
  {
    id: 3,
    name: "Carlos Rivera",
    trade: "Roofing",
    rating: 4.7,
    quote: "After the spring storm, ProLnk routed 45 homeowners my way within 24 hours.",
    jobs: 156,
    revenue: "$127K",
    customerRating: "4.7 ★",
    status: "active",
  },
  {
    id: 4,
    name: "Tanya Brooks",
    trade: "HVAC",
    rating: 4.8,
    quote: "I went from 2 trucks to 5 in under a year just by staying active on the platform.",
    jobs: 194,
    revenue: "$96K",
    customerRating: "4.8 ★",
    status: "pending",
  },
];

const QUEUE_COLS = [
  { key: "partner",  label: "Partner" },
  { key: "start",    label: "Start Date" },
  { key: "duration", label: "Duration" },
  { key: "views",    label: "Est. Views", align: "right" as const },
  { key: "status",   label: "Status",     align: "center" as const },
];

const QUEUE_ROWS = [
  { partner: "Derek Moss",   start: "May 19",  duration: "14 days", views: "3,200",  status: <StatusBadge status="pending" /> },
  { partner: "Lisa Yamada",  start: "May 22",  duration: "7 days",  views: "1,800",  status: <StatusBadge status="pending" /> },
  { partner: "Omar Khalil",  start: "Jun 1",   duration: "30 days", views: "6,400",  status: <StatusBadge status="inactive" /> },
  { partner: "Renee Dupont", start: "Jun 8",   duration: "14 days", views: "3,100",  status: <StatusBadge status="inactive" /> },
];

const UPLIFT_DATA = [
  { label: "Spotlighted",     value: 134 },
  { label: "Non-Spotlighted", value: 100 },
];

const TRADE_UPLIFT = [
  { label: "Roofing",    value: 48 },
  { label: "Plumbing",   value: 38 },
  { label: "HVAC",       value: 35 },
  { label: "Electrical", value: 31 },
  { label: "Flooring",   value: 24 },
  { label: "Painting",   value: 19 },
];

interface AddForm {
  partner: string;
  duration: string;
  type: string;
}

export default function PartnerSpotlights() {
  const [cards, setCards] = useState<SpotlightCard[]>(FEATURED);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<AddForm>({ partner: "", duration: "14", type: "Homepage" });

  const handleRemove = (id: number) => {
    setCards(prev => prev.filter(c => c.id !== id));
    toast.success("Spotlight removed");
  };

  const handleEdit = (name: string) => {
    toast.info(`Opening editor for ${name}`);
  };

  const handleAdd = () => {
    if (!form.partner) { toast.error("Select a partner"); return; }
    toast.success(`Spotlight queued: ${form.partner} · ${form.duration} days · ${form.type}`);
    setShowForm(false);
    setForm({ partner: "", duration: "14", type: "Homepage" });
  };

  return (
    <AdminLayout>
      <div className="space-y-6" style={{ background: D.bg, minHeight: "100vh" }}>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black" style={{ color: D.text }}>Partner Spotlights</h1>
            <p className="text-sm mt-1" style={{ color: D.muted }}>Featured success stories across the platform and marketing channels</p>
          </div>
          <button
            onClick={() => setShowForm(v => !v)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            style={{ background: `${D.cyan}20`, color: D.cyan, border: `1px solid ${D.cyan}40` }}
          >
            <Plus className="w-4 h-4" /> Add Spotlight
          </button>
        </div>

        {/* Inline Add Form */}
        {showForm && (
          <DCard>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold" style={{ color: D.text }}>New Spotlight</h3>
              <button onClick={() => setShowForm(false)} style={{ color: D.muted }}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs" style={{ color: D.muted }}>Partner</label>
                <select
                  value={form.partner}
                  onChange={e => setForm(f => ({ ...f, partner: e.target.value }))}
                  className="rounded-lg px-3 py-2 text-sm"
                  style={{ background: D.surface, border: `1px solid ${D.border}`, color: D.text }}
                >
                  <option value="">Select partner…</option>
                  {["Derek Moss", "Lisa Yamada", "Omar Khalil", "Renee Dupont", "Marcus Rivera"].map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs" style={{ color: D.muted }}>Duration</label>
                <select
                  value={form.duration}
                  onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
                  className="rounded-lg px-3 py-2 text-sm"
                  style={{ background: D.surface, border: `1px solid ${D.border}`, color: D.text }}
                >
                  <option value="7">7 days</option>
                  <option value="14">14 days</option>
                  <option value="30">30 days</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs" style={{ color: D.muted }}>Spotlight Type</label>
                <select
                  value={form.type}
                  onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                  className="rounded-lg px-3 py-2 text-sm"
                  style={{ background: D.surface, border: `1px solid ${D.border}`, color: D.text }}
                >
                  <option value="Homepage">Homepage</option>
                  <option value="Email">Email</option>
                  <option value="Both">Both</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleAdd}
                className="px-4 py-2 rounded-xl text-sm font-semibold"
                style={{ background: D.cyan, color: D.bg }}
              >
                Queue Spotlight
              </button>
            </div>
          </DCard>
        )}

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Active Spotlights" value="8"    sub="Across homepage + email"         color={D.amber}  icon={<Star className="w-4 h-4" />}       trend={14} />
          <MetricCard label="Avg Profile Views"  value="2,400" sub="Per spotlight per week"          color={D.cyan}   icon={<Eye className="w-4 h-4" />}        trend={9}  />
          <MetricCard label="Spotlight Boost"    value="+34%" sub="More leads vs non-spotlighted"  color={D.green}  icon={<Star className="w-4 h-4" />}       trend={4}  />
          <MetricCard label="Next Rotation"      value="3 days" sub="4 new spotlights queued"       color={D.purple} icon={<RotateCcw className="w-4 h-4" />}  />
        </div>

        {/* Featured Cards Grid */}
        <DCard>
          <SectionHeader title="Featured Partners" subtitle="Currently live on platform" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cards.map(c => (
              <div
                key={c.id}
                className="rounded-xl p-4 flex flex-col gap-3"
                style={{ background: D.surface, border: `1px solid ${D.border}` }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold" style={{ color: D.text }}>{c.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${D.amber}20`, color: D.amber }}>{c.trade}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3"
                          style={{ color: i < Math.round(c.rating) ? D.amber : D.dim }}
                          fill={i < Math.round(c.rating) ? D.amber : "transparent"}
                        />
                      ))}
                      <span className="text-xs ml-1" style={{ color: D.muted }}>{c.rating}</span>
                    </div>
                  </div>
                  <StatusBadge status={c.status} />
                </div>

                <p className="text-xs italic leading-relaxed" style={{ color: D.muted }}>
                  "{c.quote}"
                </p>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  {[
                    { label: "Jobs",     val: c.jobs.toString() },
                    { label: "Revenue",  val: c.revenue },
                    { label: "Rating",   val: c.customerRating },
                  ].map(s => (
                    <div key={s.label} className="text-center rounded-lg py-2" style={{ background: D.card }}>
                      <div className="text-sm font-black" style={{ color: D.text }}>{s.val}</div>
                      <div className="text-[10px]" style={{ color: D.dim }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => handleEdit(c.name)}
                    className="flex-1 py-1.5 rounded-lg text-xs font-semibold"
                    style={{ background: `${D.cyan}15`, color: D.cyan, border: `1px solid ${D.cyan}30` }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemove(c.id)}
                    className="flex-1 py-1.5 rounded-lg text-xs font-semibold"
                    style={{ background: `${D.red}15`, color: D.red, border: `1px solid ${D.red}30` }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </DCard>

        {/* Queue + Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DCard>
            <SectionHeader title="Spotlight Queue" subtitle="Next 4 upcoming spotlights" />
            <DataTable columns={QUEUE_COLS} rows={QUEUE_ROWS} />
          </DCard>

          <DCard>
            <SectionHeader title="Lead Uplift by Trade" subtitle="% increase vs non-spotlighted baseline" />
            <BarChart data={TRADE_UPLIFT} color={D.amber} height={160} />
          </DCard>
        </div>

      </div>
    </AdminLayout>
  );
}
