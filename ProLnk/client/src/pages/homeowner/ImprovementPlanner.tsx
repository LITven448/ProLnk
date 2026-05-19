import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronDown, DollarSign, Home, Layers, PiggyBank,
  Plus, Sparkles, TrendingUp, X, Zap,
} from "lucide-react";

type Status = "want" | "planned" | "researching";

interface Project {
  id: string;
  name: string;
  category: string;
  costLow: number;
  costHigh: number;
  roi: number;
  roiNote?: string;
  status: Status;
  priorityRank?: number;
}

const STATUS_CONFIG: Record<Status, { label: string; bg: string; text: string }> = {
  want:       { label: "Want to do",     bg: "#1E3A5F", text: "#93C5FD" },
  planned:    { label: "Planned 2027″,   bg: "#14532D", text: "#86EFAC" },
  researching:{ label: "Researching",   bg: "#3B1F6B", text: "#C4B5FD" },
};

const PROJECT_TYPES = [
  "Kitchen remodel", "Bathroom remodel", "Solar installation",
  "Roof replacement", "Fence / Privacy", "Deck or patio",
  "Windows & doors", "Flooring", "Exterior paint", "Landscaping",
  "Garage door", "HVAC upgrade", "Insulation", "Basement finishing", "Other",
];

const INITIAL_PROJECTS: Project[] = [
  { id: "p1″, name: "Kitchen remodel",    category: "Interior",  costLow: 18000, costHigh: 45000, roi: 74, status: "want",        priorityRank: 3 },
  { id: "p2″, name: "Master bath refresh",category: "Interior",  costLow: 8000,  costHigh: 18000, roi: 71, status: "planned",      priorityRank: 2 },
  { id: "p3″, name: "Solar installation", category: "Energy",    costLow: 14000, costHigh: 22000, roi: 94, roiNote: "with incentives", status: "researching" },
  { id: "p4″, name: "Fence replacement",  category: "Exterior",  costLow: 3000,  costHigh: 8000,  roi: 61, status: "want",        priorityRank: 1 },
];

const PRIORITY_ORDER = [
  { rank: 1, name: "Fence replacement",   reason: "Low cost, fast ROI, quick win" },
  { rank: 2, name: "Master bath refresh", reason: "High value if selling soon" },
  { rank: 3, name: "Kitchen remodel",     reason: "Highest absolute value add" },
];

function fmt(n: number) {
  return n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`;
}

export default function ImprovementPlanner() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ type: "", budgetLow: "", budgetHigh: "", timeline: "", notes: "" });

  const totalValueAdd = 52000;
  const monthlySavings = 200;
  const targetProject = "Kitchen remodel";
  const kitchenLow = projects.find((p) => p.name === "Kitchen remodel")?.costLow ?? 18000;
  const monthsNeeded = Math.ceil(kitchenLow / monthlySavings);
  const yearsNeeded = (monthsNeeded / 12).toFixed(1);
  const savedSoFar = 3200;
  const savingsProgress = Math.round((savedSoFar / kitchenLow) * 100);

  function removeProject(id: string) {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  function submitProject() {
    if (!form.type) return;
    const newProject: Project = {
      id: `p${Date.now()}`,
      name: form.type,
      category: "Custom",
      costLow: parseInt(form.budgetLow) || 0,
      costHigh: parseInt(form.budgetHigh) || 0,
      roi: 0,
      status: "want",
    };
    setProjects((prev) => [...prev, newProject]);
    setForm({ type: "", budgetLow: "", budgetHigh: "", timeline: "", notes: "" });
    setAddOpen(false);
  }

  return (
    <HomeownerLayout>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8″>

        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-1″>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#0D9488″ }}>
              <Layers className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Improvement Planner</h1>
          </div>
          <p className="text-gray-400 mt-1 pl-1″>Plan your upgrades, track your ROI</p>
        </div>

        {/* Total Impact Banner */}
        <Card style={{ background: "#0F2A2A", border: "1px solid #0D9488″ }}>
          <CardContent className="py-4 px-5″>
            <div className="flex items-center gap-3″>
              <TrendingUp className="w-6 h-6 flex-shrink-0″ style={{ color: "#5EEAD4" }} />
              <div>
                <p className="text-white font-semibold">Your planned improvements could add <span style={{ color: "#5EEAD4″ }}>${(totalValueAdd / 1000).toFixed(0)}K</span> to your home value</p>
                <p className="text-sm text-gray-400 mt-0.5″>Based on DFW market averages and project ROI estimates</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Wishlist */}
        <section>
          <div className="flex items-center justify-between mb-4″>
            <h2 className="text-base font-semibold text-white">Project Wishlist ({projects.length})</h2>
            <Button
              size="sm"
              onClick={() => setAddOpen((v) => !v)}
              className="text-white font-medium text-sm"
              style={{ background: "#0D9488″ }}
            >
              <Plus className="w-4 h-4 mr-1″ /> Add Project
            </Button>
          </div>

          {/* Add Project Form */}
          {addOpen && (
            <Card className="mb-4″ style={{ background: "#111827", border: "1px solid #374151" }}>
              <CardContent className="py-5 px-5 space-y-3″>
                <p className="text-sm font-semibold text-white mb-1″>New Project</p>
                <select
                  value={form.type}
                  onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                  className="w-full rounded-lg px-3 py-2 text-sm text-white bg-gray-900 border border-gray-700″
                >
                  <option value="">Select project type…</option>
                  {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <div className="flex gap-2″>
                  <input
                    type="number"
                    placeholder="Budget low ($)"
                    value={form.budgetLow}
                    onChange={(e) => setForm((f) => ({ ...f, budgetLow: e.target.value }))}
                    className="flex-1 rounded-lg px-3 py-2 text-sm text-white bg-gray-900 border border-gray-700″
                  />
                  <input
                    type="number"
                    placeholder="Budget high ($)"
                    value={form.budgetHigh}
                    onChange={(e) => setForm((f) => ({ ...f, budgetHigh: e.target.value }))}
                    className="flex-1 rounded-lg px-3 py-2 text-sm text-white bg-gray-900 border border-gray-700″
                  />
                </div>
                <input
                  type="text"
                  placeholder="Timeline (e.g. Spring 2027)"
                  value={form.timeline}
                  onChange={(e) => setForm((f) => ({ ...f, timeline: e.target.value }))}
                  className="w-full rounded-lg px-3 py-2 text-sm text-white bg-gray-900 border border-gray-700″
                />
                <textarea
                  placeholder="Notes (optional)"
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  rows={2}
                  className="w-full rounded-lg px-3 py-2 text-sm text-white bg-gray-900 border border-gray-700 resize-none"
                />
                <div className="flex gap-2 pt-1″>
                  <Button size="sm" onClick={submitProject} className="text-white" style={{ background: "#0D9488″ }}>Save Project</Button>
                  <Button size="sm" variant="ghost" onClick={() => setAddOpen(false)} className="text-gray-400″>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-3″>
            {projects.map((project) => {
              const statusCfg = STATUS_CONFIG[project.status];
              return (
                <Card key={project.id} style={{ background: "#111827″, border: "1px solid #1F2937" }}>
                  <CardContent className="py-4 px-5″>
                    <div className="flex items-start justify-between gap-3″>
                      <div className="flex-1 min-w-0″>
                        <div className="flex items-center gap-2 flex-wrap mb-1.5″>
                          <p className="text-white font-semibold text-sm">{project.name}</p>
                          <Badge className="text-xs px-2 py-0.5″ style={{ background: statusCfg.bg, color: statusCfg.text, border: "none" }}>
                            {statusCfg.label}
                          </Badge>
                          {project.priorityRank && (
                            <Badge className="text-xs px-2 py-0.5″ style={{ background: "#1A2E1A", color: "#86EFAC", border: "none" }}>
                              Priority #{project.priorityRank}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3″>
                          <span className="flex items-center gap-1″>
                            <DollarSign className="w-3.5 h-3.5″ />
                            {project.costLow > 0 ? `${fmt(project.costLow)}–${fmt(project.costHigh)}` : "TBD"}
                          </span>
                          {project.roi > 0 && (
                            <span className="flex items-center gap-1″>
                              <TrendingUp className="w-3.5 h-3.5″ style={{ color: "#10B981" }} />
                              <span style={{ color: "#6EE7B7″ }}>{project.roi}% ROI</span>
                              {project.roiNote && <span className="text-gray-500 text-xs">({project.roiNote})</span>}
                            </span>
                          )}
                        </div>
                        <Button size="sm" className="text-white text-sm font-medium" style={{ background: "#0D9488″ }}>
                          Get Quotes
                        </Button>
                      </div>
                      <button
                        onClick={() => removeProject(project.id)}
                        className="text-gray-600 hover:text-gray-300 transition-colors flex-shrink-0 mt-0.5″
                      >
                        <X className="w-4 h-4″ />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* AI Priority Order */}
        <section>
          <h2 className="text-base font-semibold text-white mb-3″>AI-Recommended Priority Order</h2>
          <Card style={{ background: "#111827″, border: "1px solid #1F2937" }}>
            <CardContent className="py-2 px-5 divide-y divide-gray-800″>
              {PRIORITY_ORDER.map(({ rank, name, reason }) => (
                <div key={rank} className="flex items-center gap-4 py-3.5″>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-white" style={{ background: "#0D9488″ }}>
                    {rank}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{name}</p>
                    <p className="text-xs text-gray-500″>{reason}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Savings Tracker */}
        <section>
          <h2 className="text-base font-semibold text-white mb-3″>Savings Tracker</h2>
          <Card style={{ background: "#111827″, border: "1px solid #1F2937" }}>
            <CardContent className="py-5 px-5″>
              <div className="flex items-start gap-3 mb-4″>
                <PiggyBank className="w-5 h-5 flex-shrink-0 mt-0.5″ style={{ color: "#5EEAD4" }} />
                <div>
                  <p className="text-white text-sm font-medium">
                    Set aside <span style={{ color: "#5EEAD4″ }}>${monthlySavings}/mo</span> → {targetProject} budget in <span style={{ color: "#5EEAD4" }}>{yearsNeeded} years</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5″>${savedSoFar.toLocaleString()} saved of ${kitchenLow.toLocaleString()} goal</p>
                </div>
              </div>
              <div className="w-full rounded-full h-2.5 overflow-hidden" style={{ background: "#1F2937″ }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${savingsProgress}%`, background: "#0D9488″ }}
                />
              </div>
              <div className="flex justify-between mt-1.5″>
                <span className="text-xs text-gray-500″>{savingsProgress}% saved</span>
                <span className="text-xs text-gray-500″>${kitchenLow.toLocaleString()} target</span>
              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </HomeownerLayout>
  );
}
