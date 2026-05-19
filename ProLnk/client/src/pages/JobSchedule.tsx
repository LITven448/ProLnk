import React from 'react';
import { useState, useMemo } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar, ChevronLeft, ChevronRight, Clock, MapPin,
  DollarSign, CheckCircle, AlertCircle, Plus, Wrench, X,
  User, Phone, FileText, LayoutList, Grid3x3, CalendarDays,
} from "lucide-react";
import { Link } from "wouter";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatDate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

const STATUS_CONFIG: Record<string, { label: string; dot: string; badge: string; text: string }> = {
  confirmed:          { label: "Confirmed",   dot: "bg-emerald-400″, badge: "bg-emerald-500/20 border-emerald-500/40", text: "text-emerald-400" },
  pending:            { label: "Pending",      dot: "bg-amber-400″,   badge: "bg-amber-500/20 border-amber-500/40",   text: "text-amber-400"   },
  completed:          { label: "Completed",    dot: "bg-blue-400″,    badge: "bg-blue-500/20 border-blue-500/40",     text: "text-blue-400"    },
  logged:             { label: "Logged",       dot: "bg-blue-400″,    badge: "bg-blue-500/20 border-blue-500/40",     text: "text-blue-400"    },
  analyzed:           { label: "Analyzed",     dot: "bg-violet-400″,  badge: "bg-violet-500/20 border-violet-500/40", text: "text-violet-400"  },
  opportunities_sent: { label: "Leads Sent",   dot: "bg-teal-400″,    badge: "bg-teal-500/20 border-teal-500/40",     text: "text-teal-400"    },
};

function getStatusConfig(status?: string | null) {
  return STATUS_CONFIG[status ?? "logged"] ?? STATUS_CONFIG.logged;
}

type ViewMode = "month" | "week" | "list";

interface AddJobModalProps {
  onClose: () => void;
  onAdd: (job: ManualJob) => void;
}

interface ManualJob {
  id: string;
  serviceType: string;
  serviceAddress: string;
  customerName: string;
  value: string;
  status: string;
  scheduledDate: string;
  scheduledHour: number;
  createdAt: string;
}

const MANUAL_STATUSES = ["confirmed", "pending", "completed"];
const SERVICE_TYPES = ["HVAC Service", "HVAC Install", "Plumbing Repair", "Plumbing Install", "Electrical", "Roofing", "Inspection", "Other"];
const HOURS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
const HOUR_LABELS: Record<number, string> = {
  7: "7:00 AM", 8: "8:00 AM", 9: "9:00 AM", 10: "10:00 AM", 11: "11:00 AM",
  12: "12:00 PM", 13: "1:00 PM", 14: "2:00 PM", 15: "3:00 PM", 16: "4:00 PM", 17: "5:00 PM",
};

function AddJobModal({ onClose, onAdd }: AddJobModalProps) {
  const [serviceType, setServiceType] = useState("");
  const [address, setAddress] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("confirmed");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledHour, setScheduledHour] = useState(9);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      id: `manual-${Date.now()}`,
      serviceType,
      serviceAddress: address,
      customerName,
      value,
      status,
      scheduledDate,
      scheduledHour,
      createdAt: scheduledDate || new Date().toISOString(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4″>
      <div className="bg-[#0F1E35] border border-slate-700/60 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-slate-700/50″>
          <h2 className="text-white font-semibold flex items-center gap-2″>
            <CalendarDays className="w-5 h-5 text-teal-400″ />
            Add Job
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5″ />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4″>
          <div className="grid grid-cols-2 gap-3″>
            <div>
              <label className="block text-xs text-slate-400 mb-1″>Service Type</label>
              <select value={serviceType} onChange={e => setServiceType(e.target.value)} required
                className="w-full bg-[#0A1628] border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50″>
                <option value="">Select…</option>
                {SERVICE_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1″>Status</label>
              <select value={status} onChange={e => setStatus(e.target.value)}
                className="w-full bg-[#0A1628] border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50″>
                {MANUAL_STATUSES.map(s => (
                  <option key={s} value={s}>{getStatusConfig(s).label}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1 flex items-center gap-1″><MapPin className="w-3 h-3" /> Address</label>
            <input type="text" value={address} onChange={e => setAddress(e.target.value)} required
              placeholder="123 Main St, City, State"
              className="w-full bg-[#0A1628] border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50″ />
          </div>
          <div className="grid grid-cols-2 gap-3″>
            <div>
              <label className="block text-xs text-slate-400 mb-1 flex items-center gap-1″><User className="w-3 h-3" /> Customer</label>
              <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)}
                placeholder="Name"
                className="w-full bg-[#0A1628] border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50″ />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1 flex items-center gap-1″><DollarSign className="w-3 h-3" /> Value</label>
              <input type="text" value={value} onChange={e => setValue(e.target.value)}
                placeholder="$0″
                className="w-full bg-[#0A1628] border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50″ />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3″>
            <div>
              <label className="block text-xs text-slate-400 mb-1″>Date</label>
              <input type="date" value={scheduledDate} onChange={e => setScheduledDate(e.target.value)} required
                className="w-full bg-[#0A1628] border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50″ />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1″>Time</label>
              <select value={scheduledHour} onChange={e => setScheduledHour(Number(e.target.value))}
                className="w-full bg-[#0A1628] border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50″>
                {HOURS.map(h => <option key={h} value={h}>{HOUR_LABELS[h]}</option>)}
              </select>
            </div>
          </div>
          <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold">
            Add Job
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function JobSchedule() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [view, setView] = useState<ViewMode>("month");
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [manualJobs, setManualJobs] = useState<ManualJob[]>([]);

  const { data: fetchedJobs, isLoading } = trpc.partners.getMyJobs.useQuery();

  const allJobs = useMemo(() => {
    const fetched = (fetchedJobs ?? []).map(j => ({ ...j, _manual: false }));
    const manual = manualJobs.map(j => ({ ...j, _manual: true, id: j.id }));
    return [...fetched, ...manual];
  }, [fetchedJobs, manualJobs]);

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

  const jobsByDate = useMemo(() => {
    const map: Record<string, typeof allJobs> = {};
    allJobs.forEach(job => {
      const d = new Date((job as ManualJob).scheduledDate || job.createdAt);
      const key = formatDate(d);
      if (!map[key]) map[key] = [];
      map[key]!.push(job);
    });
    return map;
  }, [allJobs]);

  const selectedJobs = useMemo(() => {
    return allJobs.filter(job => {
      const d = new Date((job as ManualJob).scheduledDate || job.createdAt);
      return isSameDay(d, selectedDate);
    });
  }, [allJobs, selectedDate]);

  const selectedJob = useMemo(() => {
    if (!selectedJobId) return null;
    return allJobs.find(j => j.id === selectedJobId) ?? null;
  }, [allJobs, selectedJobId]);

  const upcomingJobs = useMemo(() => {
    return [...allJobs]
      .sort((a, b) => {
        const da = new Date((a as ManualJob).scheduledDate || a.createdAt).getTime();
        const db = new Date((b as ManualJob).scheduledDate || b.createdAt).getTime();
        return db - da;
      })
      .slice(0, 20);
  }, [allJobs]);

  const prevMonth = () => setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const nextMonth = () => setViewDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  const goToday = () => {
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
  };

  const monthStats = useMemo(() => {
    const thisMonth = allJobs.filter(j => {
      const d = new Date((j as ManualJob).scheduledDate || j.createdAt);
      return d.getMonth() === viewDate.getMonth() && d.getFullYear() === viewDate.getFullYear();
    });
    return {
      confirmed: thisMonth.filter(j => j.status === "confirmed").length,
      pending: thisMonth.filter(j => j.status === "pending").length,
      completed: thisMonth.filter(j => j.status === "completed" || j.status === "opportunities_sent").length,
      total: thisMonth.length,
    };
  }, [allJobs, viewDate]);

  return (
    <PartnerLayout>
      <div className="min-h-screen bg-[#0A1628] p-4 md:p-6″>
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6″>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2″>
                <Calendar className="w-7 h-7 text-teal-400″ />
                Job Schedule
              </h1>
              <p className="text-slate-400 text-sm mt-0.5″>View and manage your booked jobs</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {/* View toggle */}
              <div className="flex rounded-lg border border-slate-700/60 overflow-hidden">
                {([
                  { v: "month" as ViewMode, icon: <Grid3x3 className="w-3.5 h-3.5″ /> },
                  { v: "week" as ViewMode, icon: <CalendarDays className="w-3.5 h-3.5″ /> },
                  { v: "list" as ViewMode, icon: <LayoutList className="w-3.5 h-3.5″ /> },
                ] as const).map(({ v, icon }) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`px-3 py-1.5 flex items-center gap-1.5 text-xs font-medium capitalize transition-colors ${
                      view === v ? "bg-teal-500 text-slate-900″ : "bg-transparent text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
                    }`}
                  >
                    {icon}
                    <span className="hidden sm:inline">{v}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={goToday}
                className="px-3 py-1.5 text-xs font-medium text-teal-400 border border-teal-700/50 rounded-lg hover:bg-teal-900/30 transition-colors"
              >
                Today
              </button>
              <Button
                size="sm"
                onClick={() => setShowAddModal(true)}
                className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold text-xs"
              >
                <Plus className="w-3.5 h-3.5 mr-1.5″ />
                Add Job
              </Button>
            </div>
          </div>

          {/* Month stats strip */}
          <div className="grid grid-cols-4 gap-3 mb-5″>
            {[
              { label: "Confirmed", value: monthStats.confirmed, color: "text-emerald-400″, dot: "bg-emerald-400" },
              { label: "Pending", value: monthStats.pending, color: "text-amber-400″, dot: "bg-amber-400" },
              { label: "Completed", value: monthStats.completed, color: "text-blue-400″, dot: "bg-blue-400" },
              { label: "Total", value: monthStats.total, color: "text-white", dot: "bg-teal-400″ },
            ].map(s => (
              <div key={s.label} className="bg-[#0F1E35] border border-slate-700/40 rounded-xl p-3″>
                <div className="flex items-center gap-1.5 mb-1″>
                  <span className={`w-2 h-2 rounded-full ${s.dot} inline-block`} />
                  <span className="text-xs text-slate-500″>{s.label}</span>
                </div>
                <span className={`text-xl font-bold ${s.color}`}>{s.value}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5″>
            {/* Main calendar */}
            <div className="lg:col-span-2″>
              {view === "list" ? (
                <div className="bg-[#0F1E35] rounded-2xl border border-slate-700/50 overflow-hidden">
                  <div className="p-4 border-b border-slate-700/50″>
                    <h2 className="font-semibold text-white text-sm">All Jobs</h2>
                  </div>
                  {isLoading ? (
                    <div className="p-8 text-center text-slate-400 text-sm">Loading...</div>
                  ) : upcomingJobs.length === 0 ? (
                    <div className="p-12 text-center">
                      <Calendar className="w-10 h-10 text-slate-600 mx-auto mb-3″ />
                      <p className="text-slate-400 font-medium text-sm">No jobs scheduled</p>
                      <button onClick={() => setShowAddModal(true)}
                        className="mt-3 text-xs text-teal-400 border border-teal-700/50 rounded-lg px-3 py-1.5 hover:bg-teal-900/30 transition-colors inline-flex items-center gap-1″>
                        <Plus className="w-3 h-3″ /> Add Job
                      </button>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-700/30″>
                      {upcomingJobs.map(job => {
                        const d = new Date((job as ManualJob).scheduledDate || job.createdAt);
                        const cfg = getStatusConfig(job.status);
                        const isActive = selectedJobId === job.id;
                        return (
                          <button
                            key={job.id}
                            onClick={() => setSelectedJobId(isActive ? null : job.id)}
                            className={`w-full text-left p-4 hover:bg-slate-700/20 transition-colors ${isActive ? "bg-slate-700/30" : ""}`}
                          >
                            <div className="flex items-start gap-3″>
                              <div className="text-center min-w-[44px]">
                                <p className="text-[10px] text-slate-500 uppercase">{DAYS[d.getDay()]}</p>
                                <p className="text-lg font-bold text-white">{d.getDate()}</p>
                                <p className="text-[10px] text-slate-500″>{MONTHS[d.getMonth()].slice(0, 3)}</p>
                              </div>
                              <div className="flex-1 min-w-0″>
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <p className="font-semibold text-white text-sm truncate">{job.serviceType}</p>
                                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${cfg.badge} ${cfg.text}`}>
                                    {cfg.label}
                                  </span>
                                </div>
                                {(job as ManualJob).serviceAddress && (
                                  <p className="text-xs text-slate-400 flex items-center gap-1″>
                                    <MapPin className="w-3 h-3 flex-shrink-0″ />
                                    {(job as ManualJob).serviceAddress}
                                  </p>
                                )}
                                {(job as ManualJob).scheduledHour !== undefined && (
                                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5″>
                                    <Clock className="w-3 h-3″ />
                                    {HOUR_LABELS[(job as ManualJob).scheduledHour] ?? ""}
                                  </p>
                                )}
                              </div>
                              {(job as ManualJob).value && (
                                <span className="text-sm font-bold text-teal-400 whitespace-nowrap">{(job as ManualJob).value}</span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-[#0F1E35] rounded-2xl border border-slate-700/50 overflow-hidden">
                  {/* Month nav */}
                  <div className="flex items-center justify-between p-4 border-b border-slate-700/50″>
                    <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-slate-700/50 text-slate-400 transition-colors">
                      <ChevronLeft className="w-4 h-4″ />
                    </button>
                    <h2 className="font-semibold text-white text-sm">
                      {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
                    </h2>
                    <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-slate-700/50 text-slate-400 transition-colors">
                      <ChevronRight className="w-4 h-4″ />
                    </button>
                  </div>

                  {/* Day headers */}
                  <div className="grid grid-cols-7 border-b border-slate-700/30″>
                    {DAYS.map(d => (
                      <div key={d} className="py-2 text-center text-[10px] font-semibold text-slate-500 uppercase tracking-wide">
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Grid */}
                  <div className="grid grid-cols-7″>
                    {calendarDays.map((day, idx) => {
                      if (!day) return <div key={`empty-${idx}`} className="h-20 border-b border-r border-slate-700/20″ />;
                      const key = formatDate(day);
                      const dayJobs = jobsByDate[key] ?? [];
                      const isToday = isSameDay(day, today);
                      const isSelected = isSameDay(day, selectedDate);
                      return (
                        <div
                          key={key}
                          onClick={() => setSelectedDate(day)}
                          className={`h-20 border-b border-r border-slate-700/20 p-1 cursor-pointer transition-colors hover:bg-slate-700/20 ${
                            isSelected ? "bg-teal-900/20″ : ""
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold mb-1 ${
                            isToday ? "bg-teal-500 text-slate-900″ : isSelected ? "bg-teal-900/60 text-teal-300" : "text-slate-400"
                          }`}>
                            {day.getDate()}
                          </div>
                          <div className="space-y-0.5″>
                            {dayJobs.slice(0, 2).map(job => {
                              const cfg = getStatusConfig(job.status);
                              return (
                                <div
                                  key={job.id}
                                  className={`text-[8px] font-medium px-1 py-0.5 rounded truncate border ${cfg.badge} ${cfg.text}`}
                                >
                                  {job.serviceType}
                                </div>
                              );
                            })}
                            {dayJobs.length > 2 && (
                              <div className="text-[8px] text-slate-500 px-1″>+{dayJobs.length - 2}</div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right panel */}
            <div className="space-y-4″>
              {/* Selected day jobs */}
              <div className="bg-[#0F1E35] rounded-2xl border border-slate-700/50 overflow-hidden">
                <div className="p-4 border-b border-slate-700/50″>
                  <h3 className="font-semibold text-white text-sm">
                    {selectedDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                  </h3>
                </div>
                {isLoading ? (
                  <div className="p-6 text-center text-slate-400 text-sm">Loading...</div>
                ) : selectedJobs.length === 0 ? (
                  <div className="p-6 text-center">
                    <Wrench className="w-8 h-8 text-slate-600 mx-auto mb-2″ />
                    <p className="text-sm text-slate-500″>No jobs this day</p>
                    <button onClick={() => setShowAddModal(true)}
                      className="mt-3 text-xs text-teal-400 border border-teal-700/50 rounded-lg px-3 py-1.5 hover:bg-teal-900/30 transition-colors inline-flex items-center gap-1″>
                      <Plus className="w-3 h-3″ /> Add Job
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-700/30″>
                    {selectedJobs.map(job => {
                      const cfg = getStatusConfig(job.status);
                      const isActive = selectedJobId === job.id;
                      return (
                        <button
                          key={job.id}
                          onClick={() => setSelectedJobId(isActive ? null : job.id)}
                          className={`w-full text-left p-3 hover:bg-slate-700/20 transition-colors ${isActive ? "bg-slate-700/30" : ""}`}
                        >
                          <div className="flex items-center gap-2 mb-1″>
                            <span className={`w-2 h-2 rounded-full ${cfg.dot} flex-shrink-0`} />
                            <p className="font-semibold text-white text-sm truncate flex-1″>{job.serviceType}</p>
                            <span className={`text-[10px] font-medium ${cfg.text}`}>{cfg.label}</span>
                          </div>
                          {(job as ManualJob).serviceAddress && (
                            <p className="text-xs text-slate-400 flex items-center gap-1 ml-4″>
                              <MapPin className="w-3 h-3 flex-shrink-0″ />
                              {(job as ManualJob).serviceAddress}
                            </p>
                          )}
                          {(job as ManualJob).scheduledHour !== undefined && (
                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 ml-4″>
                              <Clock className="w-3 h-3″ />
                              {HOUR_LABELS[(job as ManualJob).scheduledHour] ?? ""}
                            </p>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Job detail side panel */}
              {selectedJob && (
                <div className="bg-[#0F1E35] rounded-2xl border border-teal-700/40 overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-slate-700/50″>
                    <h3 className="font-semibold text-white text-sm flex items-center gap-2″>
                      <FileText className="w-4 h-4 text-teal-400″ />
                      Job Details
                    </h3>
                    <button onClick={() => setSelectedJobId(null)} className="text-slate-500 hover:text-slate-300″>
                      <X className="w-4 h-4″ />
                    </button>
                  </div>
                  <div className="p-4 space-y-3 text-sm">
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5″>Service</p>
                      <p className="text-white font-medium">{selectedJob.serviceType}</p>
                    </div>
                    {(selectedJob as ManualJob).serviceAddress && (
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5″>Address</p>
                        <p className="text-white font-medium flex items-start gap-1″>
                          <MapPin className="w-3.5 h-3.5 text-teal-400 mt-0.5 flex-shrink-0″ />
                          {(selectedJob as ManualJob).serviceAddress}
                        </p>
                      </div>
                    )}
                    {(selectedJob as ManualJob).customerName && (
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5″>Customer</p>
                        <p className="text-white font-medium flex items-center gap-1″>
                          <User className="w-3.5 h-3.5 text-teal-400″ />
                          {(selectedJob as ManualJob).customerName}
                        </p>
                      </div>
                    )}
                    {(selectedJob as ManualJob).value && (
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5″>Job Value</p>
                        <p className="text-teal-400 font-bold text-base">{(selectedJob as ManualJob).value}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5″>Status</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getStatusConfig(selectedJob.status).badge} ${getStatusConfig(selectedJob.status).text}`}>
                        {getStatusConfig(selectedJob.status).label}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Legend */}
              <div className="bg-[#0F1E35] rounded-xl border border-slate-700/40 p-3″>
                <p className="text-xs text-slate-500 font-medium mb-2″>Status Legend</p>
                <div className="space-y-1.5″>
                  {Object.entries(STATUS_CONFIG).slice(0, 4).map(([, cfg]) => (
                    <div key={cfg.label} className="flex items-center gap-2 text-xs">
                      <span className={`w-2 h-2 rounded-full ${cfg.dot} flex-shrink-0`} />
                      <span className="text-slate-400″>{cfg.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAddModal && (
        <AddJobModal
          onClose={() => setShowAddModal(false)}
          onAdd={(job) => {
            setManualJobs(prev => [job, ...prev]);
            const d = new Date(job.scheduledDate || job.createdAt);
            setSelectedDate(d);
            setViewDate(new Date(d.getFullYear(), d.getMonth(), 1));
          }}
        />
      )}
    </PartnerLayout>
  );
}
