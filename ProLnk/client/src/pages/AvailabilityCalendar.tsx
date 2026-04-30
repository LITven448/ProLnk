import { useState, useEffect } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const HOUR_LABELS: Record<number, string> = {
  8: "8 AM", 9: "9 AM", 10: "10 AM", 11: "11 AM", 12: "12 PM",
  13: "1 PM", 14: "2 PM", 15: "3 PM", 16: "4 PM", 17: "5 PM", 18: "6 PM",
};
type SlotKey = string; // "dayOfWeek-startHour"
const STATUS_STYLES: Record<string, string> = {
  available: "bg-green-100 text-green-700 border-green-200 hover:bg-green-200",
  blocked: "bg-slate-100 text-slate-400 border-slate-200 hover:bg-slate-200",
  empty: "bg-white border-slate-100 hover:bg-slate-50 text-slate-300",
};

export default function AvailabilityCalendar() {
  const [mode, setMode] = useState<"available" | "blocked">("available");
  const [weekOffset, setWeekOffset] = useState(0);
  const [slots, setSlots] = useState<Map<SlotKey, boolean>>(new Map());
  const [dirty, setDirty] = useState(false);

  const { data: savedSlots, isLoading } = trpc.partnerTools.availability.get.useQuery();
  const saveMutation = trpc.partnerTools.availability.save.useMutation({
    onSuccess: () => { toast.success("Availability saved!"); setDirty(false); },
    onError: (err) => toast.error(`Save failed: ${err.message}`),
  });

  useEffect(() => {
    if (savedSlots) {
      const map = new Map<SlotKey, boolean>();
      for (const s of savedSlots) map.set(`${s.dayOfWeek}-${s.startHour}`, s.isAvailable);
      setSlots(map);
    }
  }, [savedSlots]);

  const toggleSlot = (day: number, hour: number) => {
    const key = `${day}-${hour}`;
    const current = slots.get(key);
    const next = new Map(slots);
    if (current === undefined) { next.set(key, mode === "available"); }
    else if ((mode === "available" && current) || (mode === "blocked" && !current)) { next.delete(key); }
    else { next.set(key, mode === "available"); }
    setSlots(next); setDirty(true);
  };

  const clearAll = () => { setSlots(new Map()); setDirty(true); toast.info("Cleared. Save to apply."); };

  const handleSave = () => {
    const payload = Array.from(slots.entries()).map(([key, isAvailable]) => {
      const [day, hour] = key.split("-").map(Number);
      return { dayOfWeek: day, startHour: hour, endHour: hour + 1, isAvailable };
    });
    saveMutation.mutate(payload);
  };

  const getSlotStatus = (day: number, hour: number): "available" | "blocked" | "empty" => {
    const val = slots.get(`${day}-${hour}`);
    if (val === undefined) return "empty";
    return val ? "available" : "blocked";
  };

  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay() + weekOffset * 7);
  const weekEnd = new Date(weekStart); weekEnd.setDate(weekStart.getDate() + 6);
  const weekLabel = `${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${weekEnd.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;

  return (

    <PartnerLayout>

    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Availability Calendar</h1>
            <p className="text-slate-500 mt-1">Set your open slots so homeowners can book you directly</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={clearAll} className="text-sm" disabled={saveMutation.isPending}>Clear All</Button>
            <Button onClick={handleSave} disabled={!dirty || saveMutation.isPending} className="bg-indigo-600 hover:bg-indigo-700 text-sm">
              {saveMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
              Save Availability
            </Button>
          </div>
        </div>



        {/* Controls */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" onClick={() => setWeekOffset(w => Math.max(0, w - 1))}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium text-slate-700 px-2">{weekLabel}</span>
            <Button variant="outline" size="sm" onClick={() => setWeekOffset(w => w + 1)}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-2 ml-auto">
            <button
              onClick={() => setMode("available")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${mode === "available" ? "bg-green-600 text-white border-green-600" : "bg-white text-slate-600 border-slate-200"}`}
            >
              ✓ Mark Available
            </button>
            <button
              onClick={() => setMode("blocked")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${mode === "blocked" ? "bg-slate-600 text-white border-slate-600" : "bg-white text-slate-600 border-slate-200"}`}
            >
              ✕ Mark Blocked
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <Card>
          <CardContent className="pt-4 overflow-x-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
                <span className="ml-2 text-slate-500">Loading your availability...</span>
              </div>
            ) : (
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="w-16 text-left text-slate-400 font-normal pb-2">Time</th>
                  {DAYS.map((d, i) => (
                    <th key={i} className="text-center text-slate-600 font-semibold pb-2 px-1">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HOURS.map(hour => (
                  <tr key={hour}>
                    <td className="text-slate-400 pr-2 py-1 whitespace-nowrap">{HOUR_LABELS[hour]}</td>
                    {DAYS.map((_, dayIdx) => {
                      const status = getSlotStatus(dayIdx, hour);
                      return (
                        <td key={dayIdx} className="px-1 py-1">
                          <button
                            onClick={() => toggleSlot(dayIdx, hour)}
                            className={`w-full h-8 rounded border text-xs transition-all ${STATUS_STYLES[status]}`}
                          >
                            {status === "available" ? "✓" : status === "blocked" ? "✕" : ""}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            )}
          </CardContent>
        </Card>

        {/* Legend */}
        <div className="flex gap-4 mt-3 text-xs text-slate-500 flex-wrap">
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-100 border border-green-200 rounded inline-block" /> Available</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-slate-100 border border-slate-200 rounded inline-block" /> Blocked</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-white border border-slate-100 rounded inline-block" /> Open (click to set)</span>
        </div>
      </div>
    </div>

    </PartnerLayout>

  );
}
