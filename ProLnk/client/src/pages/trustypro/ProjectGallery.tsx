import React from 'react';
import { useState } from "react";
import { useLocation } from "wouter";
import {
  Plus, Star, CheckCircle, Filter, X, Wrench, Zap, Droplets,
  Wind, Home, Shield, ChevronRight, Award, BarChart3, Eye,
  Calendar, Camera, Bookmark, BookmarkCheck,
} from "lucide-react";

const PURPLE = "#8B5CF6";
const GREEN = "#10B981";
const BG = "#0A1628";
const CARD = "#0F1F3D";
const BORDER = "#1E3A5F";

const TRADES = ["All", "HVAC", "Plumbing", "Electrical", "Roofing", "General"];

const TRADE_ICONS: Record<string, React.ElementType> = {
  HVAC: Wind, Plumbing: Droplets, Electrical: Zap, Roofing: Home, General: Wrench,
};

const TRADE_COLORS: Record<string, string> = {
  HVAC: "#06B6D4", Plumbing: "#3B82F6", Electrical: "#F59E0B",
  Roofing: "#10B981", General: "#8B5CF6",
};

const GRADIENTS: [string, string][] = [
  ["#1e1b4b", "#312e81"], ["#0c4a6e", "#075985"], ["#064e3b", "#065f46"],
  ["#1c1917", "#292524"], ["#1e3a5f", "#0c2444"], ["#4c1d95", "#5b21b6"],
  ["#7c2d12", "#9a3412"], ["#134e4a", "#0f766e"],
];

const INITIAL_PROJECTS = [
  {
    id: 1, title: "Complete HVAC System Replacement", trade: "HVAC", projectType: "Full Replacement",
    completionDate: "2026-04-12", rating: 5, featured: true, views: 312,
    description: "Replaced 18-year-old Carrier unit with Trane XV20i. Full duct inspection, sealing, refrigerant upgrade. Homeowner reported 40% reduction in energy bills.",
    verified: true, gradient: GRADIENTS[0],
  },
  {
    id: 2, title: "Main Sewer Line Repair", trade: "Plumbing", projectType: "Pipe Repair",
    completionDate: "2026-03-28", rating: 5, featured: true, views: 198,
    description: "Trenchless pipe bursting on 60-foot collapsed cast iron sewer line. No landscaping damage. Camera inspection confirmed full flow restoration.",
    verified: true, gradient: GRADIENTS[1],
  },
  {
    id: 3, title: "200-Amp Panel Upgrade", trade: "Electrical", projectType: "Panel Upgrade",
    completionDate: "2026-03-14", rating: 5, featured: false, views: 145,
    description: "Upgraded 100-amp Federal Pacific panel to 200-amp Siemens. Added EV charger circuit and dedicated home office circuits. City inspection passed.",
    verified: true, gradient: GRADIENTS[2],
  },
  {
    id: 4, title: "Storm Damage Roof Replacement", trade: "Roofing", projectType: "Full Replacement",
    completionDate: "2026-02-20", rating: 4, featured: false, views: 221,
    description: "Insurance-approved full roof replacement after hail. 40-year GAF Timberline HDZ shingles, new ice/water shield, ridge vent. 2-day completion with full cleanup.",
    verified: true, gradient: GRADIENTS[3],
  },
  {
    id: 5, title: "Whole-Home Rewire", trade: "Electrical", projectType: "Rewire",
    completionDate: "2026-02-05", rating: 5, featured: true, views: 487,
    description: "Complete rewire of 1960s home with knob-and-tube wiring. 3,200 sq ft, 42 circuits, AFCI/GFCI throughout. Minimized wall openings. Current NEC code.",
    verified: false, gradient: GRADIENTS[4],
  },
  {
    id: 6, title: "Bathroom Rough-in & Fixture Install", trade: "Plumbing", projectType: "New Construction",
    completionDate: "2026-01-30", rating: 5, featured: false, views: 88,
    description: "Primary bath remodel: PEX-A manifold, dual-flush Toto toilets, freestanding tub rough-in, custom shower valve. Zero callbacks.",
    verified: true, gradient: GRADIENTS[5],
  },
  {
    id: 7, title: "Furnace & AC Seasonal Tune-Up", trade: "HVAC", projectType: "Maintenance",
    completionDate: "2026-01-15", rating: 4, featured: false, views: 56,
    description: "Annual tune-up for 4-zone forced air system. Cleaned heat exchanger, replaced filters, calibrated thermostats, checked refrigerant and safety controls.",
    verified: true, gradient: GRADIENTS[6],
  },
  {
    id: 8, title: "Deck & Patio General Repair", trade: "General", projectType: "Repair",
    completionDate: "2025-12-10", rating: 5, featured: false, views: 73,
    description: "Replaced 22 rotted deck boards, resealed joists, rebuilt stair stringers, added composite railing system. Structural inspection completed prior to start.",
    verified: false, gradient: GRADIENTS[7],
  },
];

function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <Star
          key={s}
          style={{ width: size, height: size }}
          className={s <= rating ? "fill-yellow-400 text-yellow-400" : "text-slate-600"}
        />
      ))}
    </div>
  );
}

function AddModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ trade: "HVAC", projectType: "", description: "", completionDate: "" });
  const [uploaded, setUploaded] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.8)" }}>
      <div className="w-full max-w-lg rounded-2xl border p-6 max-h-[90vh] overflow-y-auto" style={{ backgroundColor: CARD, borderColor: BORDER }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-black text-white">Add New Project</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Trade</label>
            <select
              value={form.trade}
              onChange={(e) => setForm((f) => ({ ...f, trade: e.target.value }))}
              className="w-full rounded-xl px-3 py-2.5 text-sm text-white border focus:outline-none focus:ring-2 focus:ring-violet-500"
              style={{ backgroundColor: "#1E3A5F", borderColor: BORDER }}
            >
              {TRADES.filter((t) => t !== "All").map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Project Type</label>
            <input
              type="text"
              placeholder="e.g. Full Replacement, Repair, Maintenance"
              value={form.projectType}
              onChange={(e) => setForm((f) => ({ ...f, projectType: e.target.value }))}
              className="w-full rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 border focus:outline-none focus:ring-2 focus:ring-violet-500"
              style={{ backgroundColor: "#1E3A5F", borderColor: BORDER }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Completion Date</label>
            <input
              type="date"
              value={form.completionDate}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => setForm((f) => ({ ...f, completionDate: e.target.value }))}
              className="w-full rounded-xl px-3 py-2.5 text-sm text-white border focus:outline-none focus:ring-2 focus:ring-violet-500"
              style={{ backgroundColor: "#1E3A5F", borderColor: BORDER }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Description</label>
            <textarea
              rows={3}
              placeholder="Scope, techniques, and outcome..."
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="w-full rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 border focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
              style={{ backgroundColor: "#1E3A5F", borderColor: BORDER }}
            />
          </div>

          <div
            onClick={() => setUploaded(!uploaded)}
            className="rounded-xl border-2 border-dashed p-5 flex flex-col items-center gap-2 cursor-pointer transition-colors"
            style={{ borderColor: uploaded ? PURPLE : BORDER, backgroundColor: uploaded ? `${PURPLE}10` : "transparent" }}
          >
            {uploaded ? (
              <><CheckCircle className="w-6 h-6" style={{ color: PURPLE }} /><p className="text-sm font-semibold" style={{ color: PURPLE }}>Photos uploaded</p></>
            ) : (
              <><Camera className="w-6 h-6 text-slate-500" /><p className="text-sm text-slate-400">Upload before &amp; after photos</p><p className="text-xs text-slate-600">PNG, JPG up to 10 MB each</p></>
            )}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-slate-400 border hover:text-white transition-colors"
            style={{ borderColor: BORDER }}
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: PURPLE }}
          >
            Save Project
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProjectGallery() {
  const [, navigate] = useLocation();
  const [activeTrade, setActiveTrade] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);

  const filtered = activeTrade === "All" ? projects : projects.filter((p) => p.trade === activeTrade);

  const totalProjects = projects.length;
  const avgRating = (projects.reduce((s, p) => s + p.rating, 0) / projects.length).toFixed(1);
  const featuredCount = projects.filter((p) => p.featured).length;
  const totalViews = projects.reduce((s, p) => s + p.views, 0);

  const toggleFeatured = (id: number) => {
    setProjects((prev) => prev.map((p) => p.id === id ? { ...p, featured: !p.featured } : p));
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: BG, fontFamily: "'Inter', sans-serif" }}>
      {showModal && <AddModal onClose={() => setShowModal(false)} />}

      <nav
        className="sticky top-0 z-40 border-b backdrop-blur-sm"
        style={{ backgroundColor: "rgba(10,22,40,0.95)", borderColor: BORDER }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/trustypro/partner-dashboard")} className="text-slate-400 hover:text-white transition-colors">
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: PURPLE }}>TrustyPro™</p>
              <p className="text-sm font-black text-white leading-tight">Project Gallery</p>
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: PURPLE }}
          >
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: BarChart3, label: "Total Projects", value: totalProjects, color: PURPLE },
            { icon: Star, label: "Avg Rating", value: avgRating, color: "#F59E0B" },
            { icon: Bookmark, label: "Featured Jobs", value: featuredCount, color: "#06B6D4" },
            { icon: Eye, label: "Profile Views", value: totalViews.toLocaleString(), color: GREEN },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border p-4 flex items-center gap-3" style={{ backgroundColor: CARD, borderColor: BORDER }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${stat.color}20` }}>
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div>
                <p className="text-xl font-black text-white">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-slate-500 flex-shrink-0" />
          {TRADES.map((trade) => {
            const active = activeTrade === trade;
            const Icon = TRADE_ICONS[trade];
            const color = TRADE_COLORS[trade] || PURPLE;
            return (
              <button
                key={trade}
                onClick={() => setActiveTrade(trade)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{
                  backgroundColor: active ? PURPLE : "#1E3A5F",
                  color: active ? "#fff" : "#94A3B8",
                  border: `1px solid ${active ? PURPLE : BORDER}`,
                }}
              >
                {Icon && <Icon className="w-3.5 h-3.5" style={{ color: active ? "#fff" : color }} />}
                {trade}
              </button>
            );
          })}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {filtered.map((project) => {
            const Icon = TRADE_ICONS[project.trade] || Wrench;
            const tradeColor = TRADE_COLORS[project.trade] || PURPLE;
            const isLong = project.description.length > 120;
            return (
              <div
                key={project.id}
                className="break-inside-avoid rounded-2xl border overflow-hidden hover:border-violet-500/40 transition-colors cursor-pointer group"
                style={{ backgroundColor: CARD, borderColor: BORDER }}
              >
                <div
                  className={`relative ${isLong ? "h-48" : "h-36"}`}
                  style={{ background: `linear-gradient(135deg, ${project.gradient[0]} 0%, ${project.gradient[1]} 100%)` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <Icon className="w-24 h-24 text-white" />
                  </div>

                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ backgroundColor: `${tradeColor}25`, border: `1px solid ${tradeColor}40` }}>
                    <Icon className="w-3 h-3" style={{ color: tradeColor }} />
                    <span className="text-xs font-bold" style={{ color: tradeColor }}>{project.trade}</span>
                  </div>

                  {project.verified && (
                    <div className="absolute top-3 right-12 flex items-center gap-1 px-2 py-1 rounded-full" style={{ backgroundColor: `${GREEN}20`, border: `1px solid ${GREEN}40` }}>
                      <Shield className="w-3 h-3" style={{ color: GREEN }} />
                      <span className="text-xs font-bold" style={{ color: GREEN }}>Verified</span>
                    </div>
                  )}

                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFeatured(project.id); }}
                    className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                    style={{ backgroundColor: project.featured ? `${PURPLE}40` : "rgba(0,0,0,0.4)" }}
                    title={project.featured ? "Unfeature this job" : "Feature this job"}
                  >
                    {project.featured ? (
                      <BookmarkCheck className="w-3.5 h-3.5" style={{ color: PURPLE }} />
                    ) : (
                      <Bookmark className="w-3.5 h-3.5 text-white/60" />
                    )}
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                    <div className="h-px flex-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white/30 rounded-full" style={{ width: "40%" }} />
                    </div>
                    <span className="text-white/40 text-xs">Before</span>
                    <div className="w-px h-3 bg-white/20" />
                    <span className="text-white/40 text-xs">After</span>
                    <div className="h-px flex-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: "90%", backgroundColor: GREEN + "70" }} />
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-sm font-black text-white leading-snug group-hover:text-violet-300 transition-colors">{project.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{project.projectType}</p>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{project.description}</p>

                  <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: BORDER }}>
                    <div className="flex items-center gap-2">
                      <Stars rating={project.rating} size={12} />
                      <span className="text-xs font-bold text-white">{project.rating}.0</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-slate-500">
                        <Eye className="w-3 h-3" />
                        <span className="text-xs">{project.views}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500">
                        <Calendar className="w-3 h-3" />
                        <span className="text-xs">{new Date(project.completionDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#1E3A5F" }}>
              <Wrench className="w-8 h-8 text-slate-500" />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-slate-300">No {activeTrade} projects yet</p>
              <p className="text-xs text-slate-500 mt-1">Add your first {activeTrade} project to build your portfolio.</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white"
              style={{ backgroundColor: PURPLE }}
            >
              <Plus className="w-4 h-4" /> Add Project
            </button>
          </div>
        )}

        <div className="rounded-2xl border p-5 flex items-center gap-4" style={{ backgroundColor: CARD, borderColor: BORDER }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${PURPLE}20` }}>
            <Award className="w-6 h-6" style={{ color: PURPLE }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-black text-white">Boost your Trust Score</p>
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
              Adding verified projects with before/after photos increases your match rate by up to 3x and unlocks priority lead routing.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 flex-shrink-0"
            style={{ backgroundColor: PURPLE }}
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
