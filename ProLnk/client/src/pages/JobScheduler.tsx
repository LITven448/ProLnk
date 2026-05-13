import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CalendarDays, Clock, MapPin, User, Phone, CheckCircle, ExternalLink, Download } from "lucide-react";
import { toast } from "sonner";

const SERVICE_TYPES = [
  "HVAC Service / Repair",
  "HVAC Installation",
  "Plumbing Repair",
  "Plumbing Installation",
  "Electrical Repair",
  "Electrical Panel Work",
  "Roofing Inspection",
  "Roofing Repair",
  "General Inspection",
  "Other",
];

const DURATIONS = [
  { label: "1 hour", hours: 1 },
  { label: "2–4 hours", hours: 3 },
  { label: "Half day (4 hrs)", hours: 4 },
  { label: "Full day (8 hrs)", hours: 8 },
];

const SLOT_HOURS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
const SLOT_LABELS: Record<number, string> = {
  7: "7:00 AM", 8: "8:00 AM", 9: "9:00 AM", 10: "10:00 AM", 11: "11:00 AM",
  12: "12:00 PM", 13: "1:00 PM", 14: "2:00 PM", 15: "3:00 PM", 16: "4:00 PM", 17: "5:00 PM",
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_NAMES = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function pad2(n: number) { return n.toString().padStart(2, "0"); }

function formatDateDisplay(dateStr: string) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

function buildGoogleCalendarUrl(title: string, dateStr: string, startHour: number, durationHours: number, address: string, description: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const start = new Date(y, m - 1, d, startHour, 0, 0);
  const end = new Date(start.getTime() + durationHours * 3600000);
  const fmt = (dt: Date) => `${dt.getFullYear()}${pad2(dt.getMonth()+1)}${pad2(dt.getDate())}T${pad2(dt.getHours())}${pad2(dt.getMinutes())}00`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${fmt(start)}/${fmt(end)}`,
    location: address,
    details: description,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function buildIcsContent(title: string, dateStr: string, startHour: number, durationHours: number, address: string, description: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const start = new Date(y, m - 1, d, startHour, 0, 0);
  const end = new Date(start.getTime() + durationHours * 3600000);
  const fmt = (dt: Date) => `${dt.getFullYear()}${pad2(dt.getMonth()+1)}${pad2(dt.getDate())}T${pad2(dt.getHours())}${pad2(dt.getMinutes())}00`;
  const uid = `prolnk-${Date.now()}@prolnk.io`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ProLnk//JobScheduler//EN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${title}`,
    `LOCATION:${address}`,
    `DESCRIPTION:${description.replace(/\n/g, "\\n")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function downloadIcs(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

export default function JobScheduler() {
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [serviceType, setServiceType] = useState("");
  const [address, setAddress] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [duration, setDuration] = useState(DURATIONS[0]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);

  const prevMonth = () => { if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); } else setCalMonth(m => m - 1); };
  const nextMonth = () => { if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); } else setCalMonth(m => m + 1); };

  const selectDate = (day: number) => {
    const dt = `${calYear}-${pad2(calMonth + 1)}-${pad2(day)}`;
    const d = new Date(calYear, calMonth, day);
    if (d < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return;
    setSelectedDate(dt);
    setSelectedHour(null);
  };

  const isToday = (day: number) => calYear === today.getFullYear() && calMonth === today.getMonth() && day === today.getDate();
  const isPast = (day: number) => new Date(calYear, calMonth, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const isSelected = (day: number) => selectedDate === `${calYear}-${pad2(calMonth + 1)}-${pad2(day)}`;

  const canSubmit = selectedDate && selectedHour !== null && serviceType && address && customerName && customerPhone && !submitted;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success("Job scheduled successfully!");
    }, 900);
  };

  const jobTitle = `${serviceType || "Service"} — ${customerName || "Customer"}`;
  const jobDescription = `Customer: ${customerName}\nPhone: ${customerPhone}\nAddress: ${address}\nService: ${serviceType}\nDuration: ${duration.label}`;
  const googleUrl = selectedDate && selectedHour !== null
    ? buildGoogleCalendarUrl(jobTitle, selectedDate, selectedHour, duration.hours, address, jobDescription)
    : "";
  const appleUrl = selectedDate && selectedHour !== null
    ? `webcal://p${encodeURIComponent(buildIcsContent(jobTitle, selectedDate, selectedHour, duration.hours, address, jobDescription))}`
    : "";

  const handleIcalDownload = () => {
    if (!selectedDate || selectedHour === null) return;
    const content = buildIcsContent(jobTitle, selectedDate, selectedHour, duration.hours, address, jobDescription);
    downloadIcs("prolnk-job.ics", content);
  };

  return (
    <PartnerLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900">Schedule a Job</h1>
            <p className="text-slate-500 mt-1">Pick a date, time slot, and fill in the job details</p>
          </div>

          {submitted ? (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-8 pb-10 text-center">
                <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-slate-900 mb-1">Job Scheduled!</h2>
                <p className="text-slate-600 mb-2">{formatDateDisplay(selectedDate)} at {SLOT_LABELS[selectedHour!]}</p>
                <p className="text-slate-500 text-sm mb-6">{serviceType} · {customerName} · {address}</p>

                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  <a href={googleUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm">
                    <ExternalLink className="w-4 h-4 text-blue-500" /> Add to Google Calendar
                  </a>
                  <button onClick={handleIcalDownload}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm">
                    <Download className="w-4 h-4 text-slate-500" /> Download .ics (Apple / Outlook)
                  </button>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5 text-left max-w-md mx-auto text-sm">
                  <p className="font-semibold text-slate-700 mb-3 flex items-center gap-2"><CalendarDays className="w-4 h-4" /> Confirmation Preview</p>
                  <div className="space-y-1.5 text-slate-600">
                    <p><span className="text-slate-400 w-24 inline-block">Date</span>{formatDateDisplay(selectedDate)}</p>
                    <p><span className="text-slate-400 w-24 inline-block">Time</span>{SLOT_LABELS[selectedHour!]}</p>
                    <p><span className="text-slate-400 w-24 inline-block">Duration</span>{duration.label}</p>
                    <p><span className="text-slate-400 w-24 inline-block">Service</span>{serviceType}</p>
                    <p><span className="text-slate-400 w-24 inline-block">Customer</span>{customerName}</p>
                    <p><span className="text-slate-400 w-24 inline-block">Phone</span>{customerPhone}</p>
                    <p><span className="text-slate-400 w-24 inline-block">Address</span>{address}</p>
                  </div>
                </div>

                <Button variant="outline" className="mt-6" onClick={() => {
                  setSubmitted(false); setSelectedDate(""); setSelectedHour(null); setServiceType(""); setAddress(""); setCustomerName(""); setCustomerPhone(""); setDuration(DURATIONS[0]);
                }}>
                  Schedule Another Job
                </Button>
              </CardContent>
            </Card>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Calendar + time slots */}
              <div className="space-y-4">
                {/* Month picker */}
                <Card>
                  <CardContent className="pt-5">
                    <div className="flex items-center justify-between mb-4">
                      <Button type="button" variant="outline" size="sm" onClick={prevMonth}><ChevronLeft className="w-4 h-4" /></Button>
                      <span className="text-sm font-semibold text-slate-700">{MONTH_NAMES[calMonth]} {calYear}</span>
                      <Button type="button" variant="outline" size="sm" onClick={nextMonth}><ChevronRight className="w-4 h-4" /></Button>
                    </div>
                    <div className="grid grid-cols-7 text-center text-xs text-slate-400 mb-2">
                      {DAY_NAMES.map(d => <div key={d}>{d}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-y-1 text-center text-sm">
                      {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const past = isPast(day);
                        const sel = isSelected(day);
                        const tod = isToday(day);
                        return (
                          <button
                            key={day} type="button" disabled={past}
                            onClick={() => selectDate(day)}
                            className={[
                              "w-8 h-8 mx-auto rounded-full text-xs font-medium transition-all",
                              past ? "text-slate-300 cursor-not-allowed" :
                              sel ? "bg-indigo-600 text-white" :
                              tod ? "border-2 border-indigo-400 text-indigo-600 hover:bg-indigo-50" :
                              "text-slate-700 hover:bg-indigo-50",
                            ].join(" ")}
                          >{day}</button>
                        );
                      })}
                    </div>
                    {selectedDate && <p className="text-center text-xs text-indigo-600 font-medium mt-3">{formatDateDisplay(selectedDate)}</p>}
                  </CardContent>
                </Card>

                {/* Time slots */}
                {selectedDate && (
                  <Card>
                    <CardContent className="pt-5">
                      <p className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-indigo-500" /> Select a time slot
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {SLOT_HOURS.map(h => (
                          <button key={h} type="button"
                            onClick={() => setSelectedHour(h)}
                            className={[
                              "py-2 rounded-lg border text-xs font-medium transition-all",
                              selectedHour === h
                                ? "bg-indigo-600 text-white border-indigo-600"
                                : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50",
                            ].join(" ")}
                          >{SLOT_LABELS[h]}</button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Duration */}
                <Card>
                  <CardContent className="pt-5">
                    <p className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400" /> Duration estimate
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {DURATIONS.map(d => (
                        <button key={d.label} type="button"
                          onClick={() => setDuration(d)}
                          className={[
                            "py-2 rounded-lg border text-xs font-medium transition-all",
                            duration.label === d.label
                              ? "bg-slate-700 text-white border-slate-700"
                              : "bg-white text-slate-600 border-slate-200 hover:border-slate-400",
                          ].join(" ")}
                        >{d.label}</button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right: Job details */}
              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-5 space-y-4">
                    <p className="text-sm font-semibold text-slate-700 mb-1">Job Details</p>

                    {/* Service type */}
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Service type</label>
                      <select
                        value={serviceType} onChange={e => setServiceType(e.target.value)} required
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      >
                        <option value="">Select a service…</option>
                        {SERVICE_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-xs text-slate-500 mb-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> Job address
                      </label>
                      <input
                        type="text" value={address} onChange={e => setAddress(e.target.value)} required
                        placeholder="123 Main St, City, State"
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      />
                    </div>

                    {/* Customer name */}
                    <div>
                      <label className="block text-xs text-slate-500 mb-1 flex items-center gap-1">
                        <User className="w-3 h-3" /> Customer name
                      </label>
                      <input
                        type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} required
                        placeholder="Jane Smith"
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      />
                    </div>

                    {/* Customer phone */}
                    <div>
                      <label className="block text-xs text-slate-500 mb-1 flex items-center gap-1">
                        <Phone className="w-3 h-3" /> Customer phone
                      </label>
                      <input
                        type="tel" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} required
                        placeholder="(555) 000-0000"
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Confirmation preview */}
                {selectedDate && selectedHour !== null && serviceType && (
                  <Card className="border-indigo-100 bg-indigo-50">
                    <CardContent className="pt-5">
                      <p className="text-xs font-semibold text-indigo-700 mb-3 flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5" /> Confirmation email preview
                      </p>
                      <div className="bg-white rounded-xl border border-indigo-100 p-4 text-xs space-y-1.5 text-slate-600">
                        <p className="font-semibold text-slate-800 text-sm mb-2">Job Confirmation — ProLnk</p>
                        <p>Hi {customerName || "Customer"},</p>
                        <p className="mt-1">Your <strong>{serviceType}</strong> appointment has been scheduled for <strong>{formatDateDisplay(selectedDate)}</strong> at <strong>{SLOT_LABELS[selectedHour]}</strong>.</p>
                        <p>Estimated duration: {duration.label}.</p>
                        <p>Location: {address || "TBD"}</p>
                        <p className="text-slate-400 mt-2 text-[10px]">Questions? Reply to this email or call your pro directly.</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Add to calendar (pre-submit shortcut) */}
                {selectedDate && selectedHour !== null && serviceType && (
                  <Card>
                    <CardContent className="pt-4 pb-4">
                      <p className="text-xs font-semibold text-slate-600 mb-2">Add to calendar now</p>
                      <div className="flex flex-wrap gap-2">
                        <a href={googleUrl} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 hover:bg-slate-50">
                          <ExternalLink className="w-3.5 h-3.5 text-blue-500" /> Google Calendar
                        </a>
                        <button type="button" onClick={handleIcalDownload}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 hover:bg-slate-50">
                          <Download className="w-3.5 h-3.5 text-slate-500" /> iCal / Outlook (.ics)
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Button
                  type="submit" disabled={!canSubmit || submitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-3"
                >
                  {submitting ? "Scheduling…" : "Confirm & Schedule Job"}
                </Button>
                {!selectedDate && <p className="text-xs text-slate-400 text-center">Select a date on the calendar to continue</p>}
                {selectedDate && selectedHour === null && <p className="text-xs text-slate-400 text-center">Select a time slot to continue</p>}
              </div>
            </form>
          )}
        </div>
      </div>
    </PartnerLayout>
  );
}
