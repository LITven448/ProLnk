import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar, CheckCircle, Clock, AlertTriangle, Zap, Wrench,
  DollarSign, ChevronRight, Leaf, Snowflake, CalendarDays,
} from "lucide-react";
import { Link } from "wouter";

type Priority = "critical" | "recommended" | "optional";
type Season = "spring" | "summer" | "fall" | "winter";

interface Task {
  task: string;
  detail: string;
  priority: Priority;
  trade: string;
  freq: string;
  estimatedCost: string;
  diy: boolean;
}

const SEASON_TASKS: Record<Season, Task[]> = {
  spring: [
    { task: "HVAC tune-up", detail: "Have system checked before cooling season — coils cleaned, refrigerant verified", priority: "critical", trade: "HVAC", freq: "Annual", estimatedCost: "$89–150", diy: false },
    { task: "Roof inspection", detail: "Check for hail/wind damage from winter storms, loose shingles, flashing gaps", priority: "critical", trade: "Roofing", freq: "Annual", estimatedCost: "$150–350", diy: false },
    { task: "Gutter cleaning", detail: "Clear winter debris, ensure proper drainage away from foundation", priority: "recommended", trade: "Gutters", freq: "Quarterly", estimatedCost: "$150–300", diy: true },
    { task: "Irrigation startup", detail: "Check heads, test all zones, adjust for summer watering schedule", priority: "recommended", trade: "Irrigation", freq: "Annual", estimatedCost: "$75–150", diy: false },
    { task: "Foundation perimeter watering", detail: "Start consistent schedule to prevent DFW clay shrinkage", priority: "recommended", trade: "Landscaping", freq: "Ongoing", estimatedCost: "$0 (DIY)", diy: true },
    { task: "Window & door seals", detail: "Check weatherstripping, caulk gaps for summer cooling efficiency", priority: "optional", trade: "Handyman", freq: "Annual", estimatedCost: "$50–200", diy: true },
  ],
  summer: [
    { task: "HVAC filter replacement", detail: "Change monthly July–August during peak cooling — critical for DFW heat", priority: "critical", trade: "HVAC", freq: "Monthly", estimatedCost: "$15–30", diy: true },
    { task: "Foundation watering", detail: "DFW clay soil shrinks severely — consistent watering prevents foundation damage", priority: "critical", trade: "Landscaping", freq: "Ongoing", estimatedCost: "$0 (DIY)", diy: true },
    { task: "Outdoor HVAC clearance", detail: "Ensure 2-foot clearance around condenser unit, remove debris", priority: "recommended", trade: "HVAC", freq: "Seasonal", estimatedCost: "$0 (DIY)", diy: true },
    { task: "Pest control treatment", detail: "Ants, mosquitoes, and roaches peak in Texas summer heat", priority: "recommended", trade: "Pest Control", freq: "Quarterly", estimatedCost: "$100–200", diy: false },
    { task: "Attic ventilation check", detail: "Poor attic ventilation dramatically increases cooling costs", priority: "optional", trade: "HVAC", freq: "Annual", estimatedCost: "$0 (check)", diy: true },
  ],
  fall: [
    { task: "Heating system inspection", detail: "Service furnace before first cold snap — DFW cold fronts arrive fast", priority: "critical", trade: "HVAC", freq: "Annual", estimatedCost: "$89–150", diy: false },
    { task: "Gutter cleaning", detail: "Heavy leaf fall Oct–Nov; clear before winter rains", priority: "critical", trade: "Gutters", freq: "Quarterly", estimatedCost: "$150–300", diy: true },
    { task: "Pipe insulation", detail: "Wrap exposed pipes in garage and crawl space — Texas ice storm prep", priority: "recommended", trade: "Plumbing", freq: "Annual", estimatedCost: "$50–200", diy: true },
    { task: "Weatherstripping", detail: "Check all doors and windows before heating season", priority: "recommended", trade: "Handyman", freq: "Annual", estimatedCost: "$50–200", diy: true },
    { task: "Rodent exclusion", detail: "Mice seek warmth as temps drop — seal entry points now", priority: "recommended", trade: "Pest Control", freq: "Annual", estimatedCost: "$200–600", diy: false },
    { task: "Irrigation winterization", detail: "Drain and blow out lines before first freeze", priority: "optional", trade: "Irrigation", freq: "Annual", estimatedCost: "$75–150", diy: false },
  ],
  winter: [
    { task: "Know your water shutoff", detail: "Texas ice storms cause widespread pipe bursts — locate and tag your main shutoff", priority: "critical", trade: "Plumbing", freq: "One-time", estimatedCost: "$0 (DIY)", diy: true },
    { task: "HVAC filter replacement", detail: "Heating season requires monthly filter changes", priority: "recommended", trade: "HVAC", freq: "Monthly", estimatedCost: "$15–30", diy: true },
    { task: "Exterior faucet covers", detail: "Insulate outdoor hose bibs before freeze events", priority: "recommended", trade: "Plumbing", freq: "Annual", estimatedCost: "$10–30 (DIY)", diy: true },
    { task: "Garage door weatherstripping", detail: "Prevent cold air and moisture infiltration", priority: "optional", trade: "Handyman", freq: "Annual", estimatedCost: "$20–80", diy: true },
    { task: "Fireplace inspection", detail: "Annual chimney inspection if you have a wood-burning fireplace", priority: "optional", trade: "Chimney", freq: "Annual", estimatedCost: "$150–300", diy: false },
  ],
};

const RECURRING_MONTHLY: Task[] = [
  { task: "HVAC filter check", detail: "Replace if dirty — 1\" filters monthly, 4\" filters every 3 months", priority: "recommended", trade: "HVAC", freq: "Monthly", estimatedCost: "$15–30", diy: true },
  { task: "Test smoke & CO detectors", detail: "Press test button on all units; replace batteries annually", priority: "recommended", trade: "Safety", freq: "Monthly", estimatedCost: "$0", diy: true },
];

const PRIORITY_CONFIG: Record<Priority, { color: string; label: string }> = {
  critical: { color: "bg-red-100 text-red-700 border-red-200", label: "Critical" },
  recommended: { color: "bg-yellow-100 text-yellow-700 border-yellow-200", label: "Recommended" },
  optional: { color: "bg-green-100 text-green-700 border-green-200", label: "Optional" },
};

const SEASON_ICONS: Record<Season, React.ReactNode> = {
  spring: <Leaf className="w-4 h-4 text-green-500" />,
  summer: <Zap className="w-4 h-4 text-yellow-500" />,
  fall: <Leaf className="w-4 h-4 text-orange-500" />,
  winter: <Snowflake className="w-4 h-4 text-blue-400" />,
};

function getCurrentSeason(): Season {
  const m = new Date().getMonth();
  if (m >= 2 && m <= 4) return "spring";
  if (m >= 5 && m <= 8) return "summer";
  if (m >= 9 && m <= 10) return "fall";
  return "winter";
}

export default function MaintenanceSchedule() {
  const [activeSeason, setActiveSeason] = useState<Season>(getCurrentSeason());
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [tab, setTab] = useState<"seasonal" | "monthly">("seasonal");

  const tasks = tab === "seasonal" ? SEASON_TASKS[activeSeason] : RECURRING_MONTHLY;
  const criticalCount = tasks.filter(t => t.priority === "critical").length;
  const checkedCount = tasks.filter(t => checked.has(`${tab}-${activeSeason}-${t.task}`)).length;

  function toggle(task: string) {
    const key = `${tab}-${activeSeason}-${task}`;
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  }

  function isChecked(task: string) {
    return checked.has(`${tab}-${activeSeason}-${task}`);
  }

  return (
    <HomeownerLayout>
      <div className="max-w-2xl mx-auto space-y-6 p-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="w-6 h-6 text-indigo-600" />
            Maintenance Schedule
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            DFW-specific home maintenance — tailored for Texas climate
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant={tab === "seasonal" ? "default" : "outline"}
            onClick={() => setTab("seasonal")}
            className="flex items-center gap-1.5"
          >
            <CalendarDays className="w-3.5 h-3.5" />Seasonal
          </Button>
          <Button
            size="sm"
            variant={tab === "monthly" ? "default" : "outline"}
            onClick={() => setTab("monthly")}
            className="flex items-center gap-1.5"
          >
            <Clock className="w-3.5 h-3.5" />Monthly
          </Button>
        </div>

        {tab === "seasonal" && (
          <div className="grid grid-cols-4 gap-2">
            {(["spring", "summer", "fall", "winter"] as Season[]).map(s => (
              <button
                key={s}
                onClick={() => setActiveSeason(s)}
                className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border transition-all text-sm font-medium capitalize ${
                  activeSeason === s
                    ? "bg-indigo-600 border-indigo-600 text-white"
                    : "bg-white border-gray-200 text-gray-600 hover:border-indigo-300"
                }`}
              >
                {SEASON_ICONS[s]}
                {s}
              </button>
            ))}
          </div>
        )}

        <Card className="border-gray-100 shadow-sm">
          <CardContent className="pt-4 pb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm capitalize">
                {tab === "seasonal" ? `${activeSeason} Checklist` : "Monthly Tasks"}
              </span>
              <span className="text-xs text-muted-foreground">{checkedCount}/{tasks.length} done</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all"
                style={{ width: tasks.length ? `${(checkedCount / tasks.length) * 100}%` : "0%" }}
              />
            </div>
            {criticalCount > 0 && checkedCount < tasks.length && (
              <p className="text-xs text-red-500 font-medium mt-2 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                {criticalCount} critical item{criticalCount !== 1 ? "s" : ""} this period
              </p>
            )}
          </CardContent>
        </Card>

        <div className="space-y-2">
          {tasks.map((item, i) => {
            const done = isChecked(item.task);
            const pc = PRIORITY_CONFIG[item.priority];
            return (
              <div
                key={i}
                className={`bg-white rounded-xl p-4 border cursor-pointer transition-all hover:border-indigo-200 shadow-sm ${
                  done ? "opacity-60 border-green-200" : "border-gray-100"
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggle(item.task)}
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      done ? "bg-green-500 border-green-500" : "border-gray-300 hover:border-indigo-400"
                    }`}
                  >
                    {done && <CheckCircle className="w-3 h-3 text-white" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium leading-snug ${done ? "line-through text-gray-400" : "text-gray-900"}`}>
                      {item.task}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.detail}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <Badge className={`text-xs border font-medium ${pc.color}`}>{pc.label}</Badge>
                      <span className="text-gray-400 text-xs flex items-center gap-1">
                        <Wrench className="w-3 h-3" />{item.trade}
                      </span>
                      <span className="text-gray-400 text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />{item.freq}
                      </span>
                      <span className="text-gray-400 text-xs flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />{item.estimatedCost}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    {!item.diy && (
                      <Link href="/trustypro/book">
                        <Button size="sm" variant="outline" className="text-xs h-7 px-2">
                          Get a Pro
                        </Button>
                      </Link>
                    )}
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-gray-400 text-xs pb-2">
          Tailored for DFW climate · Based on typical Texas home systems
        </p>
      </div>
    </HomeownerLayout>
  );
}
