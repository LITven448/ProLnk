import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  Star, Eye, Calendar, Users, TrendingUp, Edit2, Plus,
  CheckCircle, Search, Award, ChevronRight,
  BarChart2, Zap, Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Spotlight {
  id: number;
  partnerName: string;
  trade: string;
  type: "Homepage" | "Email" | "Social" | "All Three";
  startDate: string;
  endDate: string;
  views: number;
  status: "active" | "scheduled" | "ended";
}

interface SpotlightPerf {
  id: number;
  partnerName: string;
  type: string;
  views: number;
  profileVisits: number;
  leadsBooked: number;
  roi: string;
}

const ACTIVE_SPOTLIGHTS: Spotlight[] = [
  {
    id: 1,
    partnerName: "Marcus Williams",
    trade: "Electrician",
    type: "Homepage",
    startDate: "May 1, 2026",
    endDate: "May 31, 2026",
    views: 2_840,
    status: "active",
  },
  {
    id: 2,
    partnerName: "Diana Chen",
    trade: "HVAC",
    type: "Email",
    startDate: "May 8, 2026",
    endDate: "May 22, 2026",
    views: 1_205,
    status: "active",
  },
  {
    id: 3,
    partnerName: "Roberto Morales",
    trade: "Plumber",
    type: "All Three",
    startDate: "May 15, 2026",
    endDate: "Jun 14, 2026",
    views: 412,
    status: "scheduled",
  },
];

const PERF_DATA: SpotlightPerf[] = [
  { id: 1, partnerName: "James Okafor", type: "Homepage", views: 5_120, profileVisits: 847, leadsBooked: 23, roi: "318%" },
  { id: 2, partnerName: "Sarah Nguyen", type: "All Three", views: 9_340, profileVisits: 2_103, leadsBooked: 61, roi: "512%" },
  { id: 3, partnerName: "Tom Bradley", type: "Email", views: 3_210, profileVisits: 610, leadsBooked: 18, roi: "245%" },
  { id: 4, partnerName: "Lucia Reyes", type: "Social", views: 6_750, profileVisits: 1_450, leadsBooked: 34, roi: "388%" },
  { id: 5, partnerName: "Marcus Williams", type: "Homepage", views: 2_840, profileVisits: 511, leadsBooked: 14, roi: "210%" },
];

const STATUS_STYLES = {
  active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  scheduled: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  ended: "bg-slate-500/20 text-gray-500 border-slate-500/30",
};

const STAT_OPTIONS = ["Jobs Completed", "Rating", "Response Time", "Years Experience"];
const DURATION_OPTIONS = [7, 14, 30];
const TYPE_OPTIONS: Array<"Homepage Feature" | "Email Feature" | "Social Post" | "All Three"> = [
  "Homepage Feature", "Email Feature", "Social Post", "All Three",
];

export default function SpotlightCreator() {
  const [searchInput, setSearchInput] = useState("");
  const [selectedType, setSelectedType] = useState<string>("Homepage Feature");
  const [selectedDuration, setSelectedDuration] = useState<number>(14);
  const [quote, setQuote] = useState("");
  const [selectedStats, setSelectedStats] = useState<string[]>(["Jobs Completed", "Rating"]);
  const [autoSpotlight, setAutoSpotlight] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [foundPartner, setFoundPartner] = useState<{ name: string; trade: string; rating: number; jobs: number } | null>(null);

  const handleSearch = () => {
    if (!searchInput.trim()) return;
    setFoundPartner({ name: searchInput, trade: "Electrician", rating: 5.0, jobs: 84 });
  };

  const toggleStat = (stat: string) => {
    setSelectedStats(prev =>
      prev.includes(stat) ? prev.filter(s => s !== stat) : [...prev, stat]
    );
  };

  const handlePublish = () => {
    if (!foundPartner) { toast.error("Search for a partner first"); return; }
    toast.success(`Spotlight published for ${foundPartner.name}`);
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-teal-700 text-sm font-medium mb-2">
            <Award className="w-4 h-4" />
            <span>Content Tools</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Spotlight Creator</h1>
          <p className="text-gray-500 mt-1">Feature your best partners</p>
        </div>

        {/* Auto-spotlight toggle */}
        <div className="rounded-2xl border border-gray-200 bg-[#0F1E35] p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-teal-700" />
            <div>
              <p className="font-semibold text-gray-900 text-sm">Auto-Spotlight</p>
              <p className="text-gray-500 text-xs mt-0.5">Automatically feature the top-rated partner in each trade monthly</p>
            </div>
          </div>
          <button
            onClick={() => { setAutoSpotlight(!autoSpotlight); toast.success(`Auto-spotlight ${!autoSpotlight ? "enabled" : "disabled"}`); }}
            className={`relative w-12 h-6 rounded-full transition-colors ${autoSpotlight ? "bg-teal-500" : "bg-slate-600"}`}
          >
            <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${autoSpotlight ? "translate-x-7" : "translate-x-1"}`} />
          </button>
        </div>

        {/* Active spotlights */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-teal-700" /> Active Spotlights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ACTIVE_SPOTLIGHTS.map(s => (
              <div key={s.id} className="rounded-2xl border border-gray-200 bg-[#0F1E35] p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{s.partnerName}</p>
                    <p className="text-gray-500 text-xs">{s.trade}</p>
                  </div>
                  <Badge className={`text-xs border ${STATUS_STYLES[s.status]}`}>{s.status}</Badge>
                </div>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type</span>
                    <span className="text-gray-900">{s.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Period</span>
                    <span className="text-gray-900 text-xs">{s.startDate} – {s.endDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 flex items-center gap-1"><Eye className="w-3 h-3" /> Views</span>
                    <span className="text-gray-900">{s.views.toLocaleString()}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full border-gray-300 text-gray-700 text-xs">
                  <Edit2 className="w-3 h-3 mr-1" /> Edit
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Create new spotlight */}
        <div className="rounded-2xl border border-gray-200 bg-[#0F1E35] p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 text-teal-700" /> Create New Spotlight
          </h2>

          <div className="space-y-6">
            {/* Partner search */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">Partner Search</label>
              <div className="flex gap-2">
                <Input
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  placeholder="Search by name or partner ID..."
                  className="bg-[#F8FAFC] border-gray-200 text-gray-900 placeholder-slate-500"
                  onKeyDown={e => e.key === "Enter" && handleSearch()}
                />
                <Button onClick={handleSearch} className="bg-teal-500 hover:bg-teal-400 text-gray-900 px-4">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
              {foundPartner && (
                <div className="mt-3 rounded-xl border border-teal-500/30 bg-teal-500/5 p-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center">
                    <Star className="w-4 h-4 text-teal-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{foundPartner.name}</p>
                    <p className="text-gray-500 text-xs">{foundPartner.trade} · {foundPartner.jobs} jobs · {foundPartner.rating.toFixed(1)} ⭐</p>
                  </div>
                  <CheckCircle className="w-4 h-4 text-teal-700 ml-auto" />
                </div>
              )}
            </div>

            {/* Spotlight type */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">Spotlight Type</label>
              <div className="flex flex-wrap gap-2">
                {TYPE_OPTIONS.map(t => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                      selectedType === t
                        ? "bg-teal-500 border-teal-500 text-gray-900"
                        : "bg-[#F8FAFC] border-gray-200 text-gray-700 hover:border-teal-500/50"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">Duration</label>
              <div className="flex gap-2">
                {DURATION_OPTIONS.map(d => (
                  <button
                    key={d}
                    onClick={() => setSelectedDuration(d)}
                    className={`px-5 py-2 rounded-xl border text-sm font-medium transition-all ${
                      selectedDuration === d
                        ? "bg-teal-500 border-teal-500 text-gray-900"
                        : "bg-[#F8FAFC] border-gray-200 text-gray-700 hover:border-teal-500/50"
                    }`}
                  >
                    {d} days
                  </button>
                ))}
              </div>
            </div>

            {/* Quote */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">Quote / Tagline</label>
              <Textarea
                value={quote}
                onChange={e => setQuote(e.target.value)}
                placeholder="Marcus has completed 84 jobs with a perfect 5.0 rating — the most trusted electrician in Dallas."
                className="bg-[#F8FAFC] border-gray-200 text-gray-900 placeholder-slate-500 min-h-[80px]"
              />
            </div>

            {/* Stats to highlight */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">Stats to Highlight</label>
              <div className="flex flex-wrap gap-2">
                {STAT_OPTIONS.map(stat => (
                  <button
                    key={stat}
                    onClick={() => toggleStat(stat)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm transition-all ${
                      selectedStats.includes(stat)
                        ? "bg-teal-500/10 border-teal-500/50 text-teal-700"
                        : "bg-[#F8FAFC] border-gray-200 text-gray-500 hover:border-slate-500"
                    }`}
                  >
                    {selectedStats.includes(stat) && <CheckCircle className="w-3 h-3" />}
                    {stat}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div>
              <button
                onClick={() => setPreviewVisible(!previewVisible)}
                className="text-sm text-teal-700 hover:text-teal-700 flex items-center gap-1 mb-3"
              >
                <Eye className="w-4 h-4" />
                {previewVisible ? "Hide preview" : "Show preview"}
              </button>
              {previewVisible && (
                <div className="rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-500/10 to-[#F8FAFC] p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                      <Star className="w-7 h-7 text-teal-700" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-gray-900 text-lg">{foundPartner?.name || "Partner Name"}</p>
                        <Badge className="bg-teal-500/20 text-teal-700 border-teal-500/30 text-xs">Featured Pro</Badge>
                      </div>
                      <p className="text-gray-500 text-sm mb-3">{foundPartner?.trade || "Trade"}</p>
                      <p className="text-gray-700 text-sm italic mb-4">"{quote || "Your spotlight quote will appear here..."}"</p>
                      <div className="flex flex-wrap gap-3">
                        {selectedStats.includes("Jobs Completed") && (
                          <div className="rounded-lg bg-[#F8FAFC] px-3 py-2 text-center">
                            <p className="text-xl font-bold text-teal-700">{foundPartner?.jobs || 84}</p>
                            <p className="text-gray-500 text-xs">Jobs</p>
                          </div>
                        )}
                        {selectedStats.includes("Rating") && (
                          <div className="rounded-lg bg-[#F8FAFC] px-3 py-2 text-center">
                            <p className="text-xl font-bold text-teal-700">5.0 ⭐</p>
                            <p className="text-gray-500 text-xs">Rating</p>
                          </div>
                        )}
                        {selectedStats.includes("Response Time") && (
                          <div className="rounded-lg bg-[#F8FAFC] px-3 py-2 text-center">
                            <p className="text-xl font-bold text-teal-700">&lt; 2h</p>
                            <p className="text-gray-500 text-xs">Response</p>
                          </div>
                        )}
                        {selectedStats.includes("Years Experience") && (
                          <div className="rounded-lg bg-[#F8FAFC] px-3 py-2 text-center">
                            <p className="text-xl font-bold text-teal-700">12 yrs</p>
                            <p className="text-gray-500 text-xs">Experience</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Button onClick={handlePublish} className="w-full bg-teal-500 hover:bg-teal-400 text-gray-900 py-3 text-base font-semibold">
              Publish Spotlight
            </Button>
          </div>
        </div>

        {/* Performance table */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-teal-700" /> Spotlight Performance
          </h2>
          <div className="rounded-2xl border border-gray-200 bg-[#0F1E35] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-[#F8FAFC]">
                  {["Partner", "Type", "Views", "Profile Visits", "Leads Booked", "ROI"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PERF_DATA.map((row, i) => (
                  <tr key={row.id} className={`border-b border-gray-200/50 hover:bg-white/30 transition-colors ${i === PERF_DATA.length - 1 ? "border-0" : ""}`}>
                    <td className="px-4 py-3 text-gray-900 font-medium">{row.partnerName}</td>
                    <td className="px-4 py-3 text-gray-700">{row.type}</td>
                    <td className="px-4 py-3 text-gray-900">{row.views.toLocaleString()}</td>
                    <td className="px-4 py-3 text-gray-900">{row.profileVisits.toLocaleString()}</td>
                    <td className="px-4 py-3 text-teal-700 font-medium">{row.leadsBooked}</td>
                    <td className="px-4 py-3 text-emerald-400 font-semibold">{row.roi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
