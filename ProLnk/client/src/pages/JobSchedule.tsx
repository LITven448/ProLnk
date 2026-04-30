/**
 * Job Schedule — /dashboard/schedule
 * Calendar view of upcoming jobs, estimates, and follow-ups.
 * Uses real jobs data from DB, grouped by date.
 */
import { useState, useMemo } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar, ChevronLeft, ChevronRight, Clock, MapPin,
  DollarSign, CheckCircle2, AlertCircle, Plus, Wrench
} from "lucide-react";
import { Link } from "wouter";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function formatDate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  logged:             { label: "Logged",     color: "#3B82F6", bg: "#EFF6FF" },
  analyzed:           { label: "Analyzed",   color: "#8B5CF6", bg: "#EDE9FE" },
  opportunities_sent: { label: "Leads Sent", color: "#10B981", bg: "#D1FAE5" },
};

export default function JobSchedule() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [view, setView] = useState<"month" | "week" | "list">("month");

  const { data: jobs, isLoading } = trpc.partners.getMyJobs.useQuery();

  // Build calendar grid
  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (Date | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));
    return days;
  }, [viewDate]);

  // Map jobs to dates
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jobsByDate = useMemo(() => {
    const map: Record<string, any[]> = {};
    (jobs ?? []).forEach(job => {
      const d = new Date(job.createdAt);
      const key = formatDate(d);
      if (!map[key]) map[key] = [];
      map[key]!.push(job);
    });
    return map;
  }, [jobs]);

  const selectedJobs = useMemo(() => {
    return (jobs ?? []).filter(job => isSameDay(new Date(job.createdAt), selectedDate));
  }, [jobs, selectedDate]);

  // Recent jobs
  const upcomingJobs = useMemo(() => {
    return (jobs ?? [])
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10);
  }, [jobs]);

  const prevMonth = () => setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const nextMonth = () => setViewDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  return (
    <PartnerLayout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-blue-600" />
              Job Schedule
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">View and manage your upcoming jobs and estimates</p>
          </div>
          <div className="flex gap-2">
            <div className="flex rounded-lg border border-gray-200 overflow-hidden">
              {(["month", "week", "list"] as const).map(v => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                    view === v ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
            <Link href="/job/new">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
                <Plus className="w-3 h-3 mr-1" />
                Log Job
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            {view === "list" ? (
              /* List view */
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-900">Upcoming Jobs (Next 30 Days)</h2>
                </div>
                {isLoading ? (
                  <div className="p-8 text-center text-gray-400">Loading...</div>
                ) : upcomingJobs.length === 0 ? (
                  <div className="p-12 text-center">
                    <Calendar className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">No upcoming jobs scheduled</p>
                    <p className="text-sm text-gray-400 mt-1">Log a job to see it here</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {upcomingJobs.map(job => {
                    const d = new Date(job.createdAt);
                    const cfg = STATUS_CONFIG[job.status ?? "logged"] ?? STATUS_CONFIG.logged;
                    return (
                        <div key={job.id} className="p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start gap-3">
                            <div className="text-center min-w-[48px]">
                              <p className="text-xs text-gray-400 uppercase">{DAYS[d.getDay()]}</p>
                              <p className="text-xl font-bold text-gray-900">{d.getDate()}</p>
                              <p className="text-xs text-gray-400">{MONTHS[d.getMonth()].slice(0, 3)}</p>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold text-gray-900 text-sm truncate">{job.serviceType}</p>
                                <Badge style={{ backgroundColor: cfg.bg, color: cfg.color }} className="text-xs border-0">
                                  {cfg.label}
                                </Badge>
                              </div>
                              {job.serviceAddress && (
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {job.serviceAddress}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              /* Month/Week calendar grid */
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Month nav */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                  </button>
                  <h2 className="font-semibold text-gray-900">
                    {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
                  </h2>
                  <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 border-b border-gray-100">
                  {DAYS.map(d => (
                    <div key={d} className="py-2 text-center text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7">
                  {calendarDays.map((day, idx) => {
                    if (!day) return <div key={`empty-${idx}`} className="h-20 border-b border-r border-gray-50" />;
                    const key = formatDate(day);
                    const dayJobs = jobsByDate[key] ?? [];
                    const isToday = isSameDay(day, today);
                    const isSelected = isSameDay(day, selectedDate);
                    return (
                      <div
                        key={key}
                        onClick={() => setSelectedDate(day)}
                        className={`h-20 border-b border-r border-gray-50 p-1 cursor-pointer transition-colors hover:bg-blue-50 ${
                          isSelected ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold mb-1 ${
                          isToday ? "bg-blue-600 text-white" : isSelected ? "bg-blue-100 text-blue-700" : "text-gray-700"
                        }`}>
                          {day.getDate()}
                        </div>
                        <div className="space-y-0.5">
                          {dayJobs.slice(0, 2).map(job => {
                            const cfg = STATUS_CONFIG[job.status ?? "logged"] ?? STATUS_CONFIG.logged;
                            return (
                              <div
                                key={job.id}
                                className="text-[9px] font-medium px-1 py-0.5 rounded truncate"
                                style={{ backgroundColor: cfg.bg, color: cfg.color }}
                              >
                                {job.serviceType}
                              </div>
                            );
                          })}
                          {dayJobs.length > 2 && (
                            <div className="text-[9px] text-gray-400 px-1">+{dayJobs.length - 2} more</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Selected day detail */}
          <div className="space-y-4">
            {/* Selected date jobs */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                </h3>
              </div>
              {isLoading ? (
                <div className="p-6 text-center text-gray-400 text-sm">Loading...</div>
              ) : selectedJobs.length === 0 ? (
                <div className="p-6 text-center">
                  <Wrench className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">No jobs on this day</p>
                  <Link href="/job/new">
                    <Button variant="outline" size="sm" className="mt-3 text-xs">
                      <Plus className="w-3 h-3 mr-1" />
                      Log a Job
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {selectedJobs.map(job => {
                    const cfg = STATUS_CONFIG[job.status ?? "logged"] ?? STATUS_CONFIG.logged;
                    return (
                      <div key={job.id} className="p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge style={{ backgroundColor: cfg.bg, color: cfg.color }} className="text-xs border-0">
                            {cfg.label}
                          </Badge>
                        </div>
                        <p className="font-semibold text-gray-900 text-sm">{job.serviceType}</p>
                        {job.serviceAddress && (
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3" />
                            {job.serviceAddress}
                          </p>
                        )}
                        <p className="text-xs text-blue-600 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          {new Date(job.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick stats */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <h3 className="font-semibold text-gray-900 text-sm mb-3">This Month</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    Leads Sent
                  </span>
                  <span className="font-semibold text-gray-900">
                    {(jobs ?? []).filter(j => j.status === "opportunities_sent").length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    Logged
                  </span>
                  <span className="font-semibold text-gray-900">
                    {(jobs ?? []).filter(j => j.status === "logged").length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                    Analyzed
                  </span>
                  <span className="font-semibold text-gray-900">
                    {(jobs ?? []).filter(j => j.status === "analyzed").length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-green-500" />
                    Total Jobs
                  </span>
                  <span className="font-semibold text-green-600">
                    {(jobs ?? []).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PartnerLayout>
  );
}
