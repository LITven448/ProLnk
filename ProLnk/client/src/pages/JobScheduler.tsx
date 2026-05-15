import { useState, useMemo } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Button } from "@/components/ui/button";
import {
  Sparkles, MapPin, Clock, RefreshCw, CheckCircle,
  ChevronDown, ChevronUp, ArrowRight, Navigation, AlertCircle,
  Shuffle, Route,
} from "lucide-react";
import { toast } from "sonner";

interface ScheduledJob {
  id: string;
  serviceType: string;
  address: string;
  duration: number;
  scheduledHour: number;
  city: string;
  value: string;
  status: "confirmed" | "pending";
}

interface OptimizedStop {
  order: number;
  job: ScheduledJob;
  arrivalTime: string;
  driveMinutes: number;
  driveFrom: string;
}

const DEMO_JOBS: ScheduledJob[] = [
  { id: "j1", serviceType: "HVAC Repair", address: "2847 Oak Street", city: "Austin, TX 78701", duration: 2, scheduledHour: 9, value: "$320", status: "confirmed" },
  { id: "j2", serviceType: "Plumbing Inspection", address: "510 Lavaca Ave", city: "Austin, TX 78701", duration: 1, scheduledHour: 11, value: "$95", status: "confirmed" },
  { id: "j3", serviceType: "Electrical Panel", address: "1204 Congress Ave", city: "Austin, TX 78701", duration: 3, scheduledHour: 14, value: "$580", status: "pending" },
  { id: "j4", serviceType: "HVAC Install", address: "3301 Bee Cave Rd", city: "Austin, TX 78746", duration: 4, scheduledHour: 8, value: "$1,200", status: "confirmed" },
  { id: "j5", serviceType: "Plumbing Repair", address: "900 S Lamar Blvd", city: "Austin, TX 78704", duration: 1, scheduledHour: 10, value: "$180", status: "pending" },
];

function addMinutesToTime(timeStr: string, minutes: number): string {
  const [hStr, rest] = timeStr.split(":");
  const [mStr, ampm] = rest.split(" ");
  let h = parseInt(hStr);
  let m = parseInt(mStr);
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  const totalMins = h * 60 + m + minutes;
  const newH = Math.floor(totalMins / 60) % 24;
  const newM = totalMins % 60;
  const period = newH >= 12 ? "PM" : "AM";
  const displayH = newH > 12 ? newH - 12 : newH === 0 ? 12 : newH;
  return `${displayH}:${newM.toString().padStart(2, "0")} ${period}`;
}

function formatHour(h: number): string {
  const period = h >= 12 ? "PM" : "AM";
  const display = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${display}:00 ${period}`;
}

function simulateDriveTime(from: string, to: string): number {
  if (from === to) return 5;
  const hash = (from + to).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return 10 + (hash % 25);
}

function buildOptimizedRoute(jobs: ScheduledJob[], startTime: string, homeBase: string): OptimizedStop[] {
  const sorted = [...jobs].sort((a, b) => a.scheduledHour - b.scheduledHour);
  const stops: OptimizedStop[] = [];
  let currentTime = startTime;
  let currentLocation = homeBase;

  for (const job of sorted) {
    const drive = simulateDriveTime(currentLocation, job.city);
    const arrival = addMinutesToTime(currentTime, drive);
    stops.push({
      order: stops.length + 1,
      job,
      arrivalTime: arrival,
      driveMinutes: drive,
      driveFrom: currentLocation === homeBase ? "Home Base" : currentLocation.split(",")[0] || currentLocation,
    });
    currentTime = addMinutesToTime(arrival, job.duration * 60);
    currentLocation = job.city;
  }
  return stops;
}

function buildShuffledRoute(jobs: ScheduledJob[], startTime: string, homeBase: string): OptimizedStop[] {
  const shuffled = [...jobs].sort(() => Math.random() - 0.5);
  const stops: OptimizedStop[] = [];
  let currentTime = startTime;
  let currentLocation = homeBase;

  for (const job of shuffled) {
    const drive = simulateDriveTime(currentLocation, job.city);
    const arrival = addMinutesToTime(currentTime, drive);
    stops.push({
      order: stops.length + 1,
      job,
      arrivalTime: arrival,
      driveMinutes: drive,
      driveFrom: currentLocation === homeBase ? "Home Base" : currentLocation.split(",")[0] || currentLocation,
    });
    currentTime = addMinutesToTime(arrival, job.duration * 60);
    currentLocation = job.city;
  }
  return stops;
}

export default function JobScheduler() {
  const [homeBase, setHomeBase] = useState("Austin, TX 78705");
  const [startTime, setStartTime] = useState("8:00 AM");
  const [jobs, setJobs] = useState<ScheduledJob[]>(DEMO_JOBS);
  const [optimizedRoute, setOptimizedRoute] = useState<OptimizedStop[] | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [expandedStop, setExpandedStop] = useState<string | null>(null);
  const [editingHomeBase, setEditingHomeBase] = useState(false);
  const [tempHomeBase, setTempHomeBase] = useState(homeBase);

  const totalDriveTime = useMemo(() => {
    if (!optimizedRoute) return 0;
    return optimizedRoute.reduce((sum, s) => sum + s.driveMinutes, 0);
  }, [optimizedRoute]);

  const totalValue = useMemo(() => {
    return jobs.reduce((sum, j) => {
      const n = parseFloat(j.value.replace(/[$,]/g, ""));
      return sum + (isNaN(n) ? 0 : n);
    }, 0);
  }, [jobs]);

  const totalJobTime = useMemo(() => jobs.reduce((sum, j) => sum + j.duration, 0), [jobs]);

  const handleOptimize = () => {
    setOptimizing(true);
    setAccepted(false);
    setTimeout(() => {
      const route = buildOptimizedRoute(jobs, startTime, homeBase);
      setOptimizedRoute(route);
      setOptimizing(false);
      toast.success("AI optimized your route — minimal drive time!");
    }, 1400);
  };

  const handleShuffle = () => {
    if (!optimizedRoute) return;
    const route = buildShuffledRoute(jobs, startTime, homeBase);
    setOptimizedRoute(route);
    toast.info("Route reshuffled.");
  };

  const handleAccept = () => {
    setAccepted(true);
    toast.success("Optimized schedule accepted!");
  };

  const handleSaveHomeBase = () => {
    setHomeBase(tempHomeBase);
    setEditingHomeBase(false);
    setOptimizedRoute(null);
    setAccepted(false);
  };

  const toggleJob = (id: string) => {
    setJobs(prev =>
      prev.map(j => j.id === id ? { ...j, status: j.status === "confirmed" ? "pending" : "confirmed" } : j)
    );
    setOptimizedRoute(null);
    setAccepted(false);
  };

  const confirmedJobs = jobs.filter(j => j.status === "confirmed");

  return (
    <PartnerLayout>
      <div className="min-h-screen bg-[#0A1628] p-4 md:p-6">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-teal-400" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">AI Job Scheduler</h1>
                <p className="text-slate-400 text-sm">Minimize drive time with AI-optimized route planning</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            {/* Left: Inputs */}
            <div className="lg:col-span-2 space-y-4">

              {/* Home base */}
              <div className="bg-[#0F1E35] rounded-xl border border-slate-700/50 p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-white flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-teal-400" />
                    Home Base
                  </p>
                  {!editingHomeBase && (
                    <button onClick={() => { setEditingHomeBase(true); setTempHomeBase(homeBase); }}
                      className="text-xs text-teal-400 hover:text-teal-300">Edit</button>
                  )}
                </div>
                {editingHomeBase ? (
                  <div className="flex gap-2">
                    <input
                      value={tempHomeBase}
                      onChange={e => setTempHomeBase(e.target.value)}
                      className="flex-1 bg-[#0A1628] border border-slate-700/50 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                      placeholder="City, State ZIP"
                    />
                    <Button size="sm" onClick={handleSaveHomeBase} className="bg-teal-500 hover:bg-teal-400 text-slate-900 text-xs">Save</Button>
                  </div>
                ) : (
                  <p className="text-sm text-slate-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                    {homeBase}
                  </p>
                )}
              </div>

              {/* Start time */}
              <div className="bg-[#0F1E35] rounded-xl border border-slate-700/50 p-4">
                <p className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-400" />
                  Day Start Time
                </p>
                <div className="grid grid-cols-4 gap-1.5">
                  {["7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM"].map(t => (
                    <button
                      key={t}
                      onClick={() => { setStartTime(t); setOptimizedRoute(null); setAccepted(false); }}
                      className={[
                        "py-1.5 rounded-lg border text-xs font-medium transition-all",
                        startTime === t
                          ? "bg-teal-500 border-teal-400 text-slate-900 font-bold"
                          : "bg-transparent border-slate-700/50 text-slate-400 hover:border-teal-600/40 hover:text-teal-300",
                      ].join(" ")}
                    >
                      {t.replace(":00", "")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Today's jobs */}
              <div className="bg-[#0F1E35] rounded-xl border border-slate-700/50 overflow-hidden">
                <div className="p-4 border-b border-slate-700/50">
                  <p className="text-sm font-semibold text-white">Today's Jobs</p>
                  <p className="text-xs text-slate-500 mt-0.5">Toggle off jobs to exclude from route</p>
                </div>
                <div className="divide-y divide-slate-700/30">
                  {jobs.map(job => (
                    <div key={job.id} className="p-3 flex items-start gap-3">
                      <button
                        onClick={() => toggleJob(job.id)}
                        className={[
                          "mt-0.5 w-4 h-4 rounded flex-shrink-0 border-2 flex items-center justify-center transition-all",
                          job.status === "confirmed"
                            ? "bg-teal-500 border-teal-400"
                            : "bg-transparent border-slate-600",
                        ].join(" ")}
                      >
                        {job.status === "confirmed" && <CheckCircle className="w-3 h-3 text-slate-900" />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${job.status === "confirmed" ? "text-white" : "text-slate-500 line-through"}`}>
                          {job.serviceType}
                        </p>
                        <p className="text-xs text-slate-500 truncate">{job.address}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-slate-600">{formatHour(job.scheduledHour)}</span>
                          <span className="text-xs text-slate-600">·</span>
                          <span className="text-xs text-slate-600">{job.duration}h</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-teal-400 whitespace-nowrap">{job.value}</span>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="p-3 border-t border-slate-700/50 bg-[#0A1628]/50">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>{confirmedJobs.length} jobs confirmed</span>
                    <span>{totalJobTime}h work · <span className="text-teal-400 font-semibold">${totalValue.toLocaleString()}</span></span>
                  </div>
                </div>
              </div>

              {/* Optimize button */}
              <Button
                onClick={handleOptimize}
                disabled={optimizing || confirmedJobs.length === 0}
                className="w-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold py-3"
              >
                {optimizing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Optimizing Route...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Optimize with AI
                  </>
                )}
              </Button>
              {confirmedJobs.length === 0 && (
                <p className="text-xs text-center text-amber-400 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Enable at least one job to optimize
                </p>
              )}
            </div>

            {/* Right: Route */}
            <div className="lg:col-span-3">
              {!optimizedRoute ? (
                <div className="bg-[#0F1E35] rounded-2xl border border-slate-700/50 h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-4">
                    <Route className="w-8 h-8 text-teal-500/60" />
                  </div>
                  <p className="text-white font-semibold mb-2">No Route Yet</p>
                  <p className="text-slate-400 text-sm max-w-64">
                    Add your jobs on the left, set your home base, then click "Optimize with AI" to get a travel-minimized schedule.
                  </p>
                </div>
              ) : (
                <div className="bg-[#0F1E35] rounded-2xl border border-slate-700/50 overflow-hidden">
                  {/* Route header */}
                  <div className="p-4 border-b border-slate-700/50 flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <h2 className="text-white font-semibold flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-teal-400" />
                        Optimized Route
                      </h2>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {optimizedRoute.length} stops · {totalDriveTime} min total drive time
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleShuffle}
                        className="border-slate-600 text-slate-400 hover:bg-slate-700/50 bg-transparent text-xs"
                      >
                        <Shuffle className="w-3.5 h-3.5 mr-1.5" />
                        Shuffle
                      </Button>
                      {!accepted ? (
                        <Button
                          size="sm"
                          onClick={handleAccept}
                          className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold text-xs"
                        >
                          <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                          Accept Schedule
                        </Button>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs text-teal-400 font-medium">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Accepted
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Route metrics */}
                  <div className="grid grid-cols-3 divide-x divide-slate-700/50 border-b border-slate-700/50">
                    {[
                      { label: "Drive Time", value: `${totalDriveTime} min`, icon: <Clock className="w-3.5 h-3.5 text-teal-400" /> },
                      { label: "Job Time", value: `${totalJobTime}h`, icon: <CheckCircle className="w-3.5 h-3.5 text-blue-400" /> },
                      { label: "Total Value", value: `$${totalValue.toLocaleString()}`, icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" /> },
                    ].map(m => (
                      <div key={m.label} className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">{m.icon}</div>
                        <p className="text-white font-bold text-sm">{m.value}</p>
                        <p className="text-[10px] text-slate-500">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Home base start */}
                  <div className="px-4 pt-4 pb-2 flex items-center gap-2 text-xs text-slate-400">
                    <div className="w-6 h-6 rounded-full bg-slate-700/60 border border-slate-600 flex items-center justify-center flex-shrink-0">
                      <Navigation className="w-3 h-3 text-teal-400" />
                    </div>
                    <div>
                      <span className="text-slate-300 font-medium">Home Base</span>
                      <span className="ml-1.5 text-slate-500">{homeBase}</span>
                    </div>
                    <div className="ml-auto text-slate-500">{startTime}</div>
                  </div>

                  {/* Stops */}
                  <div className="divide-y divide-slate-700/20">
                    {optimizedRoute.map((stop, idx) => {
                      const isExpanded = expandedStop === stop.job.id;
                      const isLast = idx === optimizedRoute.length - 1;
                      return (
                        <div key={stop.job.id}>
                          {/* Drive connector */}
                          <div className="flex items-center gap-3 px-4 py-1.5">
                            <div className="w-6 flex justify-center">
                              <div className="w-0.5 h-6 bg-teal-900/60 border-l border-dashed border-teal-700/40" />
                            </div>
                            <span className="text-[10px] text-slate-600 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {stop.driveMinutes} min drive from {stop.driveFrom}
                            </span>
                          </div>

                          {/* Stop card */}
                          <button
                            onClick={() => setExpandedStop(isExpanded ? null : stop.job.id)}
                            className="w-full text-left px-4 py-3 hover:bg-slate-700/20 transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                                accepted ? "bg-teal-500 text-slate-900" : "bg-slate-600 text-slate-200"
                              }`}>
                                {stop.order}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <p className="text-white font-semibold text-sm">{stop.job.serviceType}</p>
                                  <span className="text-[10px] text-teal-400 font-medium">{stop.job.value}</span>
                                </div>
                                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                                  <MapPin className="w-3 h-3 flex-shrink-0" />
                                  {stop.job.address}, {stop.job.city}
                                </p>
                                <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    Arrive {stop.arrivalTime}
                                  </span>
                                  <ArrowRight className="w-3 h-3" />
                                  <span>{stop.job.duration}h job</span>
                                </div>
                              </div>
                              <div className="flex-shrink-0">
                                {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                              </div>
                            </div>
                          </button>

                          {/* Expanded detail */}
                          {isExpanded && (
                            <div className="px-4 pb-3 ml-9 space-y-2">
                              <div className="bg-[#0A1628]/60 rounded-xl border border-slate-700/40 p-3 text-xs space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-slate-500">Arrive</span>
                                  <span className="text-white font-medium">{stop.arrivalTime}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-500">Duration</span>
                                  <span className="text-white font-medium">{stop.job.duration}h</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-500">Drive from prev</span>
                                  <span className="text-white font-medium">{stop.driveMinutes} min</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-500">Job value</span>
                                  <span className="text-teal-400 font-bold">{stop.job.value}</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {isLast && (
                            <div className="flex items-center gap-3 px-4 py-3">
                              <div className="w-6 flex justify-center">
                                <div className="w-0.5 h-4 bg-teal-900/60 border-l border-dashed border-teal-700/40" />
                              </div>
                              <span className="text-xs text-slate-500 flex items-center gap-1">
                                <Navigation className="w-3 h-3 text-teal-700" />
                                Return to home base
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {accepted && (
                    <div className="p-4 border-t border-teal-700/30 bg-teal-900/10 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0" />
                      <p className="text-sm text-teal-300">
                        Schedule accepted — {optimizedRoute.length} stops, {totalDriveTime} min total drive.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PartnerLayout>
  );
}
