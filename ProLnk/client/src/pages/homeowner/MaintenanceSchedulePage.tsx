/**
 * Homeowner Maintenance Schedule
 * Route: /my-home/maintenance
 * AI-generated seasonal maintenance checklist based on Home Health Vault data.
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar, CheckCircle, Clock, AlertTriangle, Zap, Wrench,
  DollarSign, ChevronRight, Droplets, Wind, Leaf, Snowflake,
} from "lucide-react";

const SEASON_ICONS: Record<string, React.ReactNode> = {
  spring: <Leaf className="w-5 h-5 text-green-500" />,
  summer: <Zap className="w-5 h-5 text-yellow-500" />,
  fall: <Leaf className="w-5 h-5 text-orange-500" />,
  winter: <Snowflake className="w-5 h-5 text-blue-400" />,
};

const PRIORITY_CONFIG = {
  urgent: { color: "bg-red-500/10 text-red-400 border-red-500/20", icon: <AlertTriangle className="w-3.5 h-3.5" />, label: "Urgent" },
  this_month: { color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20", icon: <Clock className="w-3.5 h-3.5" />, label: "This Month" },
  optional: { color: "bg-gray-700 text-gray-400", icon: <CheckCircle className="w-3.5 h-3.5" />, label: "Optional" },
};

// Hardcoded DFW seasonal checklists — replaced with AI-generated when Zep/agent available
const DFW_CHECKLISTS: Record<string, Array<{ task: string; priority: "urgent" | "this_month" | "optional"; trade: string; estimatedTime: string; estimatedCost?: string }>> = {
  spring: [
    { task: "HVAC tune-up before cooling season — have system checked, coils cleaned, refrigerant verified", priority: "urgent", trade: "hvac", estimatedTime: "2-3 hours", estimatedCost: "$89-150" },
    { task: "Roof inspection — check for hail/wind damage from winter storms, loose shingles, flashing", priority: "urgent", trade: "roofing", estimatedTime: "1-2 hours", estimatedCost: "$150-350" },
    { task: "Gutter cleaning — clear winter debris, check for proper drainage away from foundation", priority: "this_month", trade: "gutter_cleaning", estimatedTime: "2-3 hours", estimatedCost: "$150-300" },
    { task: "Irrigation system startup — check heads, test zones, adjust for summer schedule", priority: "this_month", trade: "irrigation", estimatedTime: "1-2 hours", estimatedCost: "$75-150" },
    { task: "Foundation perimeter watering — start consistent watering schedule to prevent dry-season shrinkage", priority: "this_month", trade: "landscaping", estimatedTime: "Ongoing", estimatedCost: "$0 (DIY)" },
    { task: "Window and door seal inspection — check weatherstripping, caulk gaps for cooling efficiency", priority: "optional", trade: "handyman", estimatedTime: "1-2 hours", estimatedCost: "$50-200" },
  ],
  summer: [
    { task: "HVAC filter replacement — change monthly during peak summer cooling (July-August)", priority: "urgent", trade: "hvac", estimatedTime: "15 minutes", estimatedCost: "$15-30" },
    { task: "Foundation watering — DFW clay soil shrinks severely in summer heat; water consistently", priority: "urgent", trade: "landscaping", estimatedTime: "Ongoing", estimatedCost: "$0 (DIY)" },
    { task: "Check outdoor HVAC unit clearance — ensure 2-foot clearance around condenser", priority: "this_month", trade: "hvac", estimatedTime: "30 minutes", estimatedCost: "$0 (DIY)" },
    { task: "Pest control treatment — ants, mosquitoes, and roaches peak in summer", priority: "this_month", trade: "pest_control", estimatedTime: "1-2 hours", estimatedCost: "$100-200" },
    { task: "Attic ventilation check — poor attic ventilation dramatically increases cooling costs", priority: "optional", trade: "hvac", estimatedTime: "1 hour", estimatedCost: "$0 (check only)" },
  ],
  fall: [
    { task: "Heating system inspection — before first cold snap, have furnace serviced and tested", priority: "urgent", trade: "hvac", estimatedTime: "2-3 hours", estimatedCost: "$89-150" },
    { task: "Gutter cleaning — heavy leaf fall in October-November, clear before winter rains", priority: "urgent", trade: "gutter_cleaning", estimatedTime: "2-3 hours", estimatedCost: "$150-300" },
    { task: "Pipe insulation — wrap exposed pipes, especially in garage and crawl space (ice storm prep)", priority: "this_month", trade: "plumbing", estimatedTime: "2-4 hours", estimatedCost: "$50-200" },
    { task: "Weatherstripping — check all doors and windows for heating season", priority: "this_month", trade: "handyman", estimatedTime: "1-2 hours", estimatedCost: "$50-200" },
    { task: "Rodent exclusion — mice seek warmth as temperatures drop; seal entry points", priority: "this_month", trade: "pest_control", estimatedTime: "2-4 hours", estimatedCost: "$200-600" },
    { task: "Irrigation winterization — drain and blow out irrigation lines before first freeze", priority: "optional", trade: "irrigation", estimatedTime: "1 hour", estimatedCost: "$75-150" },
  ],
  winter: [
    { task: "Know where your water shutoff is — Texas ice storms cause widespread pipe bursts", priority: "urgent", trade: "plumbing", estimatedTime: "10 minutes", estimatedCost: "$0 (locate + tag)" },
    { task: "HVAC filter replacement — heating season requires monthly changes", priority: "this_month", trade: "hvac", estimatedTime: "15 minutes", estimatedCost: "$15-30" },
    { task: "Exterior faucet covers — insulate outdoor hose bibs before freeze events", priority: "this_month", trade: "plumbing", estimatedTime: "30 minutes", estimatedCost: "$10-30 (DIY)" },
    { task: "Garage door weatherstripping — prevent cold air and moisture infiltration", priority: "optional", trade: "handyman", estimatedTime: "30 minutes", estimatedCost: "$20-80 (DIY)" },
    { task: "Fireplace inspection — if you have a wood fireplace, have chimney inspected annually", priority: "optional", trade: "chimney", estimatedTime: "1-2 hours", estimatedCost: "$150-300" },
  ],
};

function getCurrentSeason(): "spring" | "summer" | "fall" | "winter" {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 8) return "summer";
  if (month >= 9 && month <= 10) return "fall";
  return "winter";
}

export default function MaintenanceSchedulePage() {
  const [activeSeason, setActiveSeason] = useState<"spring" | "summer" | "fall" | "winter">(getCurrentSeason());
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const checklist = DFW_CHECKLISTS[activeSeason];
  const seasons = ["spring", "summer", "fall", "winter"] as const;

  const urgentCount = checklist.filter(i => i.priority === "urgent").length;
  const checkedCount = checklist.filter(i => checked.has(`${activeSeason}-${i.task}`)).length;

  return (
    <HomeownerLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-indigo-600" />
            Maintenance Schedule
          </h1>
          <p className="text-gray-500 text-sm mt-1">DFW-specific seasonal maintenance — your home's annual checkup guide</p>
        </div>

        {/* Season selector */}
        <div className="grid grid-cols-4 gap-2">
          {seasons.map(season => (
            <button
              key={season}
              onClick={() => setActiveSeason(season)}
              className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border transition-all ${
                activeSeason === season
                  ? "bg-indigo-600 border-indigo-600 text-white"
                  : "bg-white border-gray-100 text-gray-600 hover:border-indigo-200"
              }`}
            >
              {SEASON_ICONS[season]}
              <span className="text-xs font-semibold capitalize">{season}</span>
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-900 capitalize">{activeSeason} Checklist</span>
            <span className="text-sm text-gray-500">{checkedCount}/{checklist.length} done</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full">
            <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${(checkedCount / checklist.length) * 100}%` }} />
          </div>
          {urgentCount > 0 && (
            <div className="flex items-center gap-1.5 mt-2 text-red-500 text-xs font-medium">
              <AlertTriangle className="w-3.5 h-3.5" />
              {urgentCount} urgent item{urgentCount !== 1 ? "s" : ""} for this season
            </div>
          )}
        </div>

        {/* Checklist */}
        <div className="space-y-2">
          {checklist.map((item, i) => {
            const key = `${activeSeason}-${item.task}`;
            const isChecked = checked.has(key);
            const priorityConf = PRIORITY_CONFIG[item.priority];

            return (
              <div
                key={i}
                onClick={() => setChecked(prev => {
                  const next = new Set(prev);
                  if (next.has(key)) next.delete(key); else next.add(key);
                  return next;
                })}
                className={`bg-white rounded-xl p-4 border cursor-pointer transition-all hover:border-indigo-200 ${
                  isChecked ? "opacity-60 border-green-200" : "border-gray-100 shadow-sm"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${isChecked ? "bg-green-500 border-green-500" : "border-gray-300"}`}>
                    {isChecked && <CheckCircle className="w-3 h-3 text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium leading-relaxed ${isChecked ? "line-through text-gray-400" : "text-gray-900"}`}>
                      {item.task}
                    </p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <Badge className={`text-xs border ${priorityConf.color} gap-1`}>
                        {priorityConf.icon}
                        {priorityConf.label}
                      </Badge>
                      <span className="text-gray-400 text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />{item.estimatedTime}
                      </span>
                      {item.estimatedCost && (
                        <span className="text-gray-400 text-xs flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />{item.estimatedCost}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 mt-0.5" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Connect a Pro for Any Item
          </Button>
        </div>

        <p className="text-center text-gray-400 text-xs">
          Checklist tailored for DFW climate · Items vary based on your home's specific systems
        </p>
      </div>
    </HomeownerLayout>
  );
}
