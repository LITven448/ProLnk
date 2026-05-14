import { useState, useEffect, useRef } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Button } from "@/components/ui/button";
import {
  CheckCircle, ChevronLeft, ChevronRight, Loader2, Palmtree,
  RefreshCw, MapPin, ToggleLeft, ToggleRight, Save,
} from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAY_INDICES = [1, 2, 3, 4, 5, 6, 0]; // Mon=1...Sun=0 (getDay())
const HOURS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const HOUR_LABELS: Record<number, string> = {
  7: "7 AM", 8: "8 AM", 9: "9 AM", 10: "10 AM", 11: "11 AM", 12: "12 PM",
  13: "1 PM", 14: "2 PM", 15: "3 PM", 16: "4 PM", 17: "5 PM", 18: "6 PM",
};

type SlotKey = string;

const RADIUS_OPTIONS = [5, 10, 15, 25, 50, 75, 100];

const RECURRING_PRESETS = [
  { label: "Weekdays 8am–5pm", days: [1, 2, 3, 4, 5], hours: [8, 9, 10, 11, 12, 13, 14, 15, 16] },
  { label: "Mon/Wed/Fri 9am–5pm", days: [1, 3, 5], hours: [9, 10, 11, 12, 13, 14, 15, 16] },
  { label: "Saturdays 9am–1pm", days: [6], hours: [9, 10, 11, 12] },
  { label: "All Week 8am–6pm", days: [0, 1, 2, 3, 4, 5, 6], hours: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17] },
];

export default function AvailabilityCalendar() {
  const [slots, setSlots] = useState<Map<SlotKey, boolean>>(new Map());
  const [dirty, setDirty] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);
  const [dragMode, setDragMode] = useState<"available" | "unavailable">("available");
  const [isDragging, setIsDragging] = useState(false);
  const [showVacation, setShowVacation] = useState(false);
  const [vacationStart, setVacationStart] = useState("");
  const [vacationEnd, setVacationEnd] = useState("");
  const [showRecurring, setShowRecurring] = useState(false);
  const [recurringEnabled, setRecurringEnabled] = useState(false);
  const [serviceRadius, setServiceRadius] = useState(25);
  const dragRef = useRef<boolean>(false);

  const { data: savedSlots, isLoading } = trpc.partnerTools.availability.get.useQuery();
  const saveMutation = trpc.partnerTools.availability.save.useMutation({
    onSuccess: () => { toast.success("Schedule saved!"); setDirty(false); },
    onError: (err) => toast.error(`Save failed: ${err.message}`),
  });

  useEffect(() => {
    if (savedSlots) {
      const map = new Map<SlotKey, boolean>();
      for (const s of savedSlots) map.set(`${s.dayOfWeek}-${s.startHour}`, s.isAvailable);
      setSlots(map);
    }
  }, [savedSlots]);

  const getSlotStatus = (dayOfWeek: number, hour: number): "available" | "unavailable" | "empty" => {
    const val = slots.get(`${dayOfWeek}-${hour}`);
    if (val === undefined) return "empty";
    return val ? "available" : "unavailable";
  };

  const setSlot = (dayOfWeek: number, hour: number, available: boolean) => {
    setSlots(prev => {
      const next = new Map(prev);
      next.set(`${dayOfWeek}-${hour}`, available);
      return next;
    });
    setDirty(true);
  };

  const handleMouseDown = (dayOfWeek: number, hour: number) => {
    dragRef.current = true;
    setIsDragging(true);
    const current = getSlotStatus(dayOfWeek, hour);
    const newMode = current === "available" ? "unavailable" : "available";
    setDragMode(newMode);
    setSlot(dayOfWeek, hour, newMode === "available");
  };

  const handleMouseEnter = (dayOfWeek: number, hour: number) => {
    if (!dragRef.current) return;
    setSlot(dayOfWeek, hour, dragMode === "available");
  };

  const handleMouseUp = () => {
    dragRef.current = false;
    setIsDragging(false);
  };

  const applyRecurringPreset = (preset: typeof RECURRING_PRESETS[0]) => {
    const next = new Map(slots);
    for (const day of preset.days) {
      for (const hour of preset.hours) {
        next.set(`${day}-${hour}`, true);
      }
    }
    setSlots(next);
    setDirty(true);
    setRecurringEnabled(true);
    setShowRecurring(false);
    toast.success(`Applied: ${preset.label}`);
  };

  const blockVacation = () => {
    if (!vacationStart || !vacationEnd) { toast.error("Select start and end dates."); return; }
    const start = new Date(vacationStart);
    const end = new Date(vacationEnd);
    if (end < start) { toast.error("End date must be after start date."); return; }
    const next = new Map(slots);
    const cursor = new Date(start);
    while (cursor <= end) {
      const dow = cursor.getDay();
      for (const hour of HOURS) next.set(`${dow}-${hour}`, false);
      cursor.setDate(cursor.getDate() + 1);
    }
    setSlots(next);
    setDirty(true);
    setShowVacation(false);
    setVacationStart("");
    setVacationEnd("");
    const nights = Math.round((end.getTime() - start.getTime()) / 86400000) + 1;
    toast.success(`Blocked ${nights} day${nights !== 1 ? "s" : ""} as blackout.`);
  };

  const clearAll = () => { setSlots(new Map()); setDirty(true); toast.info("Cleared. Save to apply."); };

  const handleSave = () => {
    const payload = Array.from(slots.entries()).map(([key, isAvailable]) => {
      const [day, hour] = key.split("-").map(Number);
      return { dayOfWeek: day, startHour: hour, endHour: hour + 1, isAvailable };
    });
    saveMutation.mutate(payload);
  };

  const now = new Date();
  const weekStart = new Date(now);
  const dayOfWeek = now.getDay();
  const mondayOffset = (dayOfWeek === 0 ? -6 : 1 - dayOfWeek) + weekOffset * 7;
  weekStart.setDate(now.getDate() + mondayOffset);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  const weekLabel = `${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${weekEnd.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;

  const availableCount = Array.from(slots.values()).filter(v => v).length;

  return (
    <PartnerLayout>
      <div
        className="min-h-screen bg-[#0A1628] p-4 md:p-6 select-none"
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Availability Calendar</h1>
              <p className="text-slate-400 mt-1 text-sm">Click or drag to set your available time blocks</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowRecurring(v => !v)}
                className={`border-teal-600 text-teal-400 hover:bg-teal-900/30 bg-transparent text-xs ${recurringEnabled ? "bg-teal-900/20" : ""}`}
              >
                {recurringEnabled ? <ToggleRight className="w-4 h-4 mr-1.5" /> : <ToggleLeft className="w-4 h-4 mr-1.5" />}
                Recurring Schedule
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowVacation(v => !v)}
                className="border-amber-600 text-amber-400 hover:bg-amber-900/30 bg-transparent text-xs"
              >
                <Palmtree className="w-4 h-4 mr-1.5" />
                Blackout Dates
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={clearAll}
                className="border-slate-600 text-slate-400 hover:bg-slate-700/50 bg-transparent text-xs"
              >
                <RefreshCw className="w-4 h-4 mr-1.5" />
                Clear All
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={!dirty || saveMutation.isPending}
                className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold text-xs"
              >
                {saveMutation.isPending
                  ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                  : <Save className="w-4 h-4 mr-1.5" />}
                Save Schedule
              </Button>
            </div>
          </div>

          {/* Recurring preset panel */}
          {showRecurring && (
            <div className="mb-4 p-4 bg-[#0F1E35] border border-teal-700/40 rounded-xl">
              <p className="text-sm font-semibold text-teal-300 mb-3">Apply a Recurring Schedule</p>
              <div className="flex flex-wrap gap-2">
                {RECURRING_PRESETS.map(preset => (
                  <button
                    key={preset.label}
                    onClick={() => applyRecurringPreset(preset)}
                    className="px-3 py-1.5 rounded-lg bg-teal-900/40 border border-teal-700/60 text-teal-300 text-xs font-medium hover:bg-teal-800/50 transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-3">Applying a preset adds to your current schedule. You can still override individual slots.</p>
            </div>
          )}

          {/* Vacation/blackout panel */}
          {showVacation && (
            <div className="mb-4 p-4 bg-[#0F1E35] border border-amber-700/40 rounded-xl flex flex-wrap items-end gap-3">
              <div>
                <label className="block text-xs text-amber-400 font-medium mb-1">Start date</label>
                <input type="date" value={vacationStart} onChange={e => setVacationStart(e.target.value)}
                  className="border border-amber-700/40 rounded-lg px-3 py-1.5 text-sm bg-[#0A1628] text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50" />
              </div>
              <div>
                <label className="block text-xs text-amber-400 font-medium mb-1">End date</label>
                <input type="date" value={vacationEnd} onChange={e => setVacationEnd(e.target.value)}
                  className="border border-amber-700/40 rounded-lg px-3 py-1.5 text-sm bg-[#0A1628] text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50" />
              </div>
              <Button onClick={blockVacation} size="sm" className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold text-xs">
                Block Dates
              </Button>
              <button onClick={() => setShowVacation(false)} className="text-xs text-slate-500 hover:text-slate-300">Cancel</button>
            </div>
          )}

          {/* Week nav + stats */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setWeekOffset(w => w - 1)}
                className="p-1.5 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-700/50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium text-slate-300 px-2">{weekLabel}</span>
              <button
                onClick={() => setWeekOffset(w => w + 1)}
                className="p-1.5 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-700/50 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              {weekOffset !== 0 && (
                <button
                  onClick={() => setWeekOffset(0)}
                  className="ml-1 px-2 py-1 text-xs text-teal-400 border border-teal-700/50 rounded-lg hover:bg-teal-900/30"
                >
                  Today
                </button>
              )}
            </div>
            <div className="sm:ml-auto flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-teal-500 inline-block" /> Available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-700 inline-block" /> Unavailable
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#0F1E35] border border-slate-700 inline-block" /> Unset
              </span>
              {availableCount > 0 && (
                <span className="text-teal-400 font-medium">{availableCount} slots open</span>
              )}
            </div>
          </div>

          {/* Calendar grid */}
          <div className="bg-[#0F1E35] rounded-2xl border border-slate-700/50 overflow-hidden">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-6 h-6 animate-spin text-teal-500" />
                <span className="ml-2 text-slate-400 text-sm">Loading your schedule...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-slate-700/50">
                      <th className="w-16 text-left text-slate-500 font-normal text-xs py-3 pl-4">Time</th>
                      {DAYS.map((d, i) => {
                        const colDate = new Date(weekStart);
                        colDate.setDate(weekStart.getDate() + i);
                        const isToday = colDate.toDateString() === now.toDateString();
                        return (
                          <th key={i} className="text-center py-3 px-1 min-w-[72px]">
                            <div className={`text-xs font-semibold ${isToday ? "text-teal-400" : "text-slate-400"}`}>{d}</div>
                            <div className={`text-sm font-bold mt-0.5 ${isToday ? "text-teal-300" : "text-slate-300"}`}>
                              {colDate.getDate()}
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {HOURS.map((hour, rowIdx) => (
                      <tr key={hour} className={rowIdx % 2 === 0 ? "" : "bg-white/[0.02]"}>
                        <td className="text-slate-500 text-[11px] pl-4 py-1 whitespace-nowrap w-16">
                          {HOUR_LABELS[hour]}
                        </td>
                        {DAY_INDICES.map((dayOfWeekIdx) => {
                          const status = getSlotStatus(dayOfWeekIdx, hour);
                          return (
                            <td key={dayOfWeekIdx} className="px-1 py-0.5">
                              <div
                                onMouseDown={() => handleMouseDown(dayOfWeekIdx, hour)}
                                onMouseEnter={() => handleMouseEnter(dayOfWeekIdx, hour)}
                                className={[
                                  "w-full h-9 rounded-md cursor-pointer transition-colors select-none flex items-center justify-center text-[11px] font-medium",
                                  isDragging ? "cursor-crosshair" : "cursor-pointer",
                                  status === "available"
                                    ? "bg-teal-500/30 border border-teal-500/60 text-teal-300 hover:bg-teal-500/40"
                                    : status === "unavailable"
                                      ? "bg-slate-700/60 border border-slate-600/40 text-slate-500 hover:bg-slate-600/60"
                                      : "bg-transparent border border-slate-700/30 text-slate-700 hover:border-teal-600/40 hover:bg-teal-900/10",
                                ].join(" ")}
                              >
                                {status === "available" ? "✓" : status === "unavailable" ? "–" : ""}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Service Radius + tip */}
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 bg-[#0F1E35] rounded-xl border border-slate-700/50 p-4">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-teal-400" />
                <p className="text-sm font-semibold text-white">Service Radius</p>
              </div>
              <p className="text-xs text-slate-400 mb-3">Max distance from your home base you'll travel for jobs.</p>
              <div className="flex flex-wrap gap-2">
                {RADIUS_OPTIONS.map(r => (
                  <button
                    key={r}
                    onClick={() => { setServiceRadius(r); setDirty(true); }}
                    className={[
                      "px-3 py-1.5 rounded-lg border text-xs font-medium transition-all",
                      serviceRadius === r
                        ? "bg-teal-500 border-teal-400 text-slate-900 font-bold"
                        : "bg-transparent border-slate-600 text-slate-400 hover:border-teal-600/50 hover:text-teal-300",
                    ].join(" ")}
                  >
                    {r} mi
                  </button>
                ))}
              </div>
            </div>

            <div className="sm:w-64 bg-[#0F1E35] rounded-xl border border-slate-700/50 p-4 flex flex-col justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium mb-2 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-teal-400" />
                  Drag tip
                </p>
                <p className="text-xs text-slate-400">Click a cell to toggle it. Click and drag across multiple cells to set them all at once.</p>
              </div>
              {dirty && (
                <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse inline-block" />
                  Unsaved changes
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </PartnerLayout>
  );
}
