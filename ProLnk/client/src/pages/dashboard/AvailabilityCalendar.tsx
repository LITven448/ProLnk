import { useState } from "react";
import {
  ChevronLeft, ChevronRight, CalendarDays, Zap, Clock,
  Briefcase, ToggleLeft, ToggleRight, MapPin, AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type DayStatus = "available" | "booked" | "unavailable" | "unset";

interface DayDetail {
  status: DayStatus;
  notes: string;
}

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const UPCOMING_JOBS = [
  { id: 1, address: "4812 Oak Ridge Dr", service: "HVAC Inspection", time: "9:00 AM – 11:00 AM", date: "May 16″ },
  { id: 2, address: "2201 Maple Ave", service: "Plumbing Repair", time: "1:00 PM – 3:00 PM", date: "May 17″ },
  { id: 3, address: "779 Elmwood Ct", service: "Electrical Panel", time: "10:00 AM – 12:00 PM", date: "May 20″ },
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const STATUS_COLORS: Record<DayStatus, string> = {
  available: "bg-teal-500/30 border-teal-500/60 text-teal-300″,
  booked: "bg-blue-500/30 border-blue-500/60 text-blue-300″,
  unavailable: "bg-slate-700/60 border-slate-600/40 text-slate-500″,
  unset: "bg-transparent border-slate-700/30 text-slate-600″,
};

const STATUS_LABELS: Record<DayStatus, string> = {
  available: "Available",
  booked: "Booked",
  unavailable: "Unavailable",
  unset: "Unset",
};

export default function AvailabilityCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [dayData, setDayData] = useState<Record<string, DayDetail>>({});
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [autoAccept, setAutoAccept] = useState(false);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const dayKey = (d: number) => `${year}-${month}-${d}`;
  const getDay = (d: number): DayDetail => dayData[dayKey(d)] ?? { status: "unset", notes: "" };
  const setDay = (d: number, update: Partial<DayDetail>) => {
    setDayData(prev => ({ ...prev, [dayKey(d)]: { ...getDay(d), ...update } }));
  };

  const isToday = (d: number) =>
    d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1);
    setSelectedDay(null);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1);
    setSelectedDay(null);
  };

  const setAllWeekdays = () => {
    const updates: Record<string, DayDetail> = {};
    for (let d = 1; d <= daysInMonth; d++) {
      const dow = new Date(year, month, d).getDay();
      if (dow >= 1 && dow <= 5) updates[dayKey(d)] = { status: "available", notes: "" };
    }
    setDayData(prev => ({ ...prev, ...updates }));
    toast.success("All weekdays set to available");
  };

  const blockNextWeek = () => {
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + (8 - today.getDay()) % 7 || 7);
    const updates: Record<string, DayDetail> = {};
    for (let i = 0; i < 7; i++) {
      const d = new Date(nextMonday);
      d.setDate(nextMonday.getDate() + i);
      if (d.getMonth() === month && d.getFullYear() === year) {
        updates[dayKey(d.getDate())] = { status: "unavailable", notes: "Blocked" };
      }
    }
    setDayData(prev => ({ ...prev, ...updates }));
    toast.success("Next week blocked");
  };

  const copyLastWeek = () => {
    const updates: Record<string, DayDetail> = {};
    for (let i = 0; i < 7; i++) {
      const thisWeekDay = new Date(today);
      thisWeekDay.setDate(today.getDate() - today.getDay() + i);
      const lastWeekDay = new Date(thisWeekDay);
      lastWeekDay.setDate(thisWeekDay.getDate() - 7);
      if (thisWeekDay.getMonth() === month && thisWeekDay.getFullYear() === year) {
        const lastKey = `${lastWeekDay.getFullYear()}-${lastWeekDay.getMonth()}-${lastWeekDay.getDate()}`;
        const existing = dayData[lastKey];
        if (existing) updates[dayKey(thisWeekDay.getDate())] = { ...existing };
      }
    }
    setDayData(prev => ({ ...prev, ...updates }));
    toast.success("Last week's schedule copied");
  };

  const daysAvailable = Object.values(
    Object.fromEntries(Object.entries(dayData).filter(([k]) => k.startsWith(`${year}-${month}-`)))
  ).filter(v => v.status === "available").length;

  const jobsBooked = Object.values(
    Object.fromEntries(Object.entries(dayData).filter(([k]) => k.startsWith(`${year}-${month}-`)))
  ).filter(v => v.status === "booked").length;

  const selectedDayData = selectedDay ? getDay(selectedDay) : null;
  const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="min-h-screen bg-[#0A1628] p-4 md:p-6″>
      <div className="max-w-5xl mx-auto">

        <div className="mb-6″>
          <h1 className="text-2xl md:text-3xl font-bold text-white">My Availability</h1>
          <p className="text-slate-400 mt-1 text-sm">Set when you're open for jobs</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6″>
          {[
            { label: "Days Available", value: daysAvailable, icon: <CalendarDays className="w-4 h-4″ />, color: "text-teal-400" },
            { label: "Jobs Booked", value: jobsBooked, icon: <Briefcase className="w-4 h-4″ />, color: "text-blue-400" },
            { label: "Hours Blocked", value: 0, icon: <Clock className="w-4 h-4″ />, color: "text-slate-400" },
          ].map(chip => (
            <div key={chip.label} className="bg-[#0F1E35] rounded-xl border border-slate-700/50 p-3 flex items-center gap-3″>
              <div className={`${chip.color}`}>{chip.icon}</div>
              <div>
                <div className={`text-xl font-bold ${chip.color}`}>{chip.value}</div>
                <div className="text-xs text-slate-500″>{chip.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <div className="flex items-center gap-1″>
            <button onClick={prevMonth} className="p-1.5 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-700/50″>
              <ChevronLeft className="w-4 h-4″ />
            </button>
            <span className="text-sm font-semibold text-white px-3″>{MONTH_NAMES[month]} {year}</span>
            <button onClick={nextMonth} className="p-1.5 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-700/50″>
              <ChevronRight className="w-4 h-4″ />
            </button>
          </div>
          <div className="flex flex-wrap gap-2″>
            <button onClick={setAllWeekdays} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-teal-900/30 border border-teal-700/50 text-teal-300 hover:bg-teal-800/40″>
              Set all weekdays available
            </button>
            <button onClick={blockNextWeek} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700/70″>
              Block next week
            </button>
            <button onClick={copyLastWeek} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700/70″>
              Copy last week's schedule
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_280px] gap-4″>
          <div className="bg-[#0F1E35] rounded-2xl border border-slate-700/50 p-4″>
            <div className="grid grid-cols-7 mb-2″>
              {DAYS_OF_WEEK.map(d => (
                <div key={d} className="text-center text-xs font-medium text-slate-500 py-1″>{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1″>
              {cells.map((d, i) => {
                if (!d) return <div key={i} />;
                const detail = getDay(d);
                const todayRing = isToday(d) ? "ring-2 ring-purple-500″ : "";
                const selected = selectedDay === d ? "ring-2 ring-white" : "";
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDay(d === selectedDay ? null : d)}
                    className={[
                      "relative aspect-square rounded-lg border text-xs font-medium transition-all flex flex-col items-center justify-center gap-0.5″,
                      STATUS_COLORS[detail.status],
                      todayRing,
                      selected,
                    ].join(" ")}
                  >
                    <span className="font-bold">{d}</span>
                    {detail.status !== "unset" && (
                      <span className="text-[9px] opacity-70 leading-none">{STATUS_LABELS[detail.status].slice(0, 4)}</span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-slate-700/50″>
              {(Object.keys(STATUS_COLORS) as DayStatus[]).filter(s => s !== "unset").map(s => (
                <span key={s} className="flex items-center gap-1.5 text-xs text-slate-400″>
                  <span className={`w-2.5 h-2.5 rounded-sm border ${STATUS_COLORS[s]}`} />
                  {STATUS_LABELS[s]}
                </span>
              ))}
              <span className="flex items-center gap-1.5 text-xs text-slate-400″>
                <span className="w-2.5 h-2.5 rounded-sm ring-2 ring-purple-500 bg-transparent inline-block" />
                Today
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4″>
            {selectedDay && selectedDayData ? (
              <div className="bg-[#0F1E35] rounded-2xl border border-slate-700/50 p-4″>
                <p className="text-sm font-semibold text-white mb-3″>
                  {MONTH_NAMES[month]} {selectedDay}
                </p>
                <div className="flex flex-col gap-1.5 mb-4″>
                  {(["available", "booked", "unavailable"] as DayStatus[]).map(s => (
                    <button
                      key={s}
                      onClick={() => setDay(selectedDay, { status: s })}
                      className={[
                        "px-3 py-2 rounded-lg border text-xs font-medium text-left transition-all",
                        selectedDayData.status === s
                          ? STATUS_COLORS[s] + " ring-1 ring-white/20″
                          : "bg-transparent border-slate-700/40 text-slate-400 hover:bg-slate-700/30″,
                      ].join(" ")}
                    >
                      {STATUS_LABELS[s]}
                    </button>
                  ))}
                </div>
                <textarea
                  value={selectedDayData.notes}
                  onChange={e => setDay(selectedDay, { notes: e.target.value })}
                  placeholder="Notes (optional)..."
                  rows={2}
                  className="w-full bg-[#0A1628] border border-slate-700/50 rounded-lg px-3 py-2 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/40 resize-none"
                />
                <Button
                  size="sm"
                  className="w-full mt-3 bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold text-xs"
                  onClick={() => { toast.success("Day updated"); setSelectedDay(null); }}
                >
                  Save Day
                </Button>
              </div>
            ) : (
              <div className="bg-[#0F1E35] rounded-2xl border border-slate-700/50 p-4 flex items-center gap-2 text-slate-500 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0″ />
                Click a day to set availability
              </div>
            )}

            <div className="bg-[#0F1E35] rounded-2xl border border-slate-700/50 p-4″>
              <div className="flex items-center justify-between mb-1″>
                <span className="text-sm font-semibold text-white flex items-center gap-1.5″>
                  <Zap className="w-4 h-4 text-amber-400″ /> Auto-availability
                </span>
                <button onClick={() => { setAutoAccept(v => !v); toast.success(autoAccept ? "Manual mode on" : "Auto-accept enabled"); }}>
                  {autoAccept
                    ? <ToggleRight className="w-6 h-6 text-teal-400″ />
                    : <ToggleLeft className="w-6 h-6 text-slate-500″ />}
                </button>
              </div>
              <p className="text-xs text-slate-500″>Accept leads anytime — overrides manual calendar</p>
              {autoAccept && <div className="mt-2 text-xs text-teal-400 font-medium">Active — all incoming leads accepted</div>}
            </div>
          </div>
        </div>

        <div className="mt-6″>
          <h2 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-1.5″>
            <MapPin className="w-4 h-4 text-blue-400″ /> Upcoming Jobs
          </h2>
          <div className="grid sm:grid-cols-3 gap-3″>
            {UPCOMING_JOBS.map(job => (
              <div key={job.id} className="bg-[#0F1E35] rounded-xl border border-blue-500/20 p-3″>
                <div className="flex items-start justify-between gap-2 mb-1″>
                  <span className="text-xs font-semibold text-white leading-tight">{job.address}</span>
                  <span className="text-[10px] font-medium text-blue-300 bg-blue-500/20 px-1.5 py-0.5 rounded-full whitespace-nowrap">{job.date}</span>
                </div>
                <p className="text-xs text-teal-400 font-medium mb-0.5″>{job.service}</p>
                <p className="text-[11px] text-slate-500″>{job.time}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
