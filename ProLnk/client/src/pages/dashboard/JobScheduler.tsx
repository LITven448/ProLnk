import { useState } from "react";
import {
  Calendar, Clock, Plus, CheckCircle, AlertTriangle,
  MapPin, User, ChevronLeft, ChevronRight,
  Download, X, Wrench,
} from "lucide-react";

type JobStatus = "Confirmed" | "Pending" | "Completed";

interface Job {
  id: string;
  address: string;
  service: string;
  time: string;
  homeowner: string;
  status: JobStatus;
  day: number;
  notes?: string;
}

interface NewJobForm {
  address: string;
  service: string;
  date: string;
  time: string;
  homeowner: string;
  notes: string;
}

const TODAY_DAY = 3;

const MOCK_JOBS: Job[] = [
  { id: "j1″, address: "2847 Maple Ave", service: "HVAC Tune-up", time: "8:00 AM", homeowner: "Sarah K.", status: "Confirmed", day: 0 },
  { id: "j2″, address: "1023 Oak Dr", service: "Plumbing — Leak", time: "11:00 AM", homeowner: "David M.", status: "Completed", day: 0 },
  { id: "j3″, address: "5519 Cedar Ln", service: "Electrical Inspect.", time: "2:00 PM", homeowner: "James R.", status: "Confirmed", day: 1 },
  { id: "j4″, address: "334 Birch Blvd", service: "Roofing Estimate", time: "9:30 AM", homeowner: "Maria L.", status: "Confirmed", day: 2 },
  { id: "j5″, address: "7721 Elm St", service: "Concrete Sealing", time: "1:00 PM", homeowner: "Chris T.", status: "Pending", day: 2 },
  { id: "j6″, address: "882 Pine Rd", service: "HVAC Emergency", time: "10:00 AM", homeowner: "Lisa B.", status: "Confirmed", day: 3 },
  { id: "j7″, address: "4412 Walnut Ave", service: "Plumbing Repair", time: "2:00 PM", homeowner: "Tom W.", status: "Confirmed", day: 3 },
  { id: "j8″, address: "91 Spruce Ct", service: "Foundation Check", time: "4:00 PM", homeowner: "Nancy P.", status: "Pending", day: 3 },
  { id: "j9″, address: "2201 Aspen Dr", service: "Roof Repair", time: "8:30 AM", homeowner: "Kevin H.", status: "Confirmed", day: 4 },
  { id: "j10″, address: "667 Sycamore Ln", service: "Electrical Repair", time: "2:00 PM", homeowner: "Amy G.", status: "Confirmed", day: 4 },
  { id: "j11″, address: "3304 Poplar St", service: "HVAC Service", time: "11:00 AM", homeowner: "Paul S.", status: "Pending", day: 5 },
  { id: "j12″, address: "8810 Hickory Dr", service: "Concrete Repair", time: "3:30 PM", homeowner: "Diana F.", status: "Confirmed", day: 5 },
  { id: "j13″, address: "120 Magnolia Ave", service: "Plumbing Install", time: "10:00 AM", homeowner: "Steve V.", status: "Confirmed", day: 6 },
];

const STATUS_COLORS: Record<JobStatus, { bg: string; text: string; border: string }> = {
  Confirmed: { bg: "rgba(99, 102, 241, 0.15)", text: "#A5B4FC", border: "rgba(99, 102, 241, 0.3)" },
  Pending: { bg: "rgba(245, 158, 11, 0.15)", text: "#FCD34D", border: "rgba(245, 158, 11, 0.3)" },
  Completed: { bg: "rgba(16, 185, 129, 0.15)", text: "#6EE7B7″, border: "rgba(16, 185, 129, 0.3)" },
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DATES = ["May 11″, "May 12", "May 13", "May 14", "May 15", "May 16", "May 17"];

const BLANK_FORM: NewJobForm = {
  address: "", service: "", date: "", time: "", homeowner: "", notes: "",
};

const CONFLICT_DAYS = [4];

export default function JobScheduler() {
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<NewJobForm>(BLANK_FORM);

  const totalJobs = jobs.length;
  const estimatedEarnings = (totalJobs * 312).toLocaleString();

  const upcomingJobs = [...jobs]
    .filter(j => j.day >= TODAY_DAY && j.status !== "Completed")
    .sort((a, b) => a.day - b.day || a.time.localeCompare(b.time))
    .slice(0, 5);

  function addJob() {
    if (!form.address || !form.service || !form.homeowner) return;
    const dayIndex = form.date ? new Date(form.date).getDay() : TODAY_DAY;
    setJobs(prev => [
      ...prev,
      {
        id: `j${Date.now()}`,
        address: form.address,
        service: form.service,
        time: form.time || "9:00 AM",
        homeowner: form.homeowner,
        status: "Pending",
        day: Math.max(0, dayIndex - 1),
        notes: form.notes,
      },
    ]);
    setForm(BLANK_FORM);
    setShowModal(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, padding: "24px 20px 48px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Calendar size={22} color="#fff" />
            </div>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: "#F8FAFC", margin: 0 }}>Job Scheduler</h1>
              <p style={{ fontSize: 14, color: "#94A3B8″, margin: 0 }}>Organize your work week</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              style={{
                background: "transparent", border: "1px solid #334155″,
                borderRadius: 10, padding: "9px 16px", cursor: "pointer",
                fontSize: 13, color: "#60A5FA", display: "flex", alignItems: "center", gap: 6,
              }}
            >
              <Download size={14} />
              Export to Google Calendar
            </button>
            <button
              onClick={() => setShowModal(true)}
              style={{
                background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                border: "none", borderRadius: 10, padding: "9px 18px", cursor: "pointer",
                fontSize: 13, fontWeight: 700, color: "#fff",
                display: "flex", alignItems: "center", gap: 6,
              }}
            >
              <Plus size={14} />
              Add Job
            </button>
          </div>
        </div>

        {/* Earnings Banner */}
        <div style={{
          background: "linear-gradient(135deg, #1E1B4B, #312E81)",
          border: "1px solid #3730A3″, borderRadius: 14,
          padding: "14px 20px", marginBottom: 20,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Wrench size={16} color="#818CF8″ />
            <span style={{ fontSize: 14, color: "#C7D2FE" }}>
              This week: <strong style={{ color: "#fff" }}>{totalJobs} jobs scheduled</strong>
            </span>
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#A5B4FC" }}>
            Est. earnings: ${estimatedEarnings}
          </div>
        </div>

        {/* Conflict Warning */}
        <div style={{
          background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)",
          borderRadius: 10, padding: "10px 16px", marginBottom: 20,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <AlertTriangle size={15} color="#F87171″ />
          <span style={{ fontSize: 13, color: "#FCA5A5″ }}>
            Warning: 2 jobs overlap on Thursday 2–4pm. Consider rescheduling one to avoid conflicts.
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20, alignItems: "start" }}>

          {/* Week Grid */}
          <div>
            {/* Week nav */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <button style={{
                background: "transparent", border: "1px solid #334155″, borderRadius: 8,
                padding: "6px 12px", cursor: "pointer", color: "#94A3B8″,
                display: "flex", alignItems: "center", gap: 4, fontSize: 13,
              }}>
                <ChevronLeft size={14} /> Prev week
              </button>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#F1F5F9″ }}>May 11–17, 2026</span>
              <button style={{
                background: "transparent", border: "1px solid #334155″, borderRadius: 8,
                padding: "6px 12px", cursor: "pointer", color: "#94A3B8″,
                display: "flex", alignItems: "center", gap: 4, fontSize: 13,
              }}>
                Next week <ChevronRight size={14} />
              </button>
            </div>

            {/* Day Columns */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
              {DAYS.map((day, i) => {
                const isToday = i === TODAY_DAY;
                const hasConflict = CONFLICT_DAYS.includes(i);
                const dayJobs = jobs.filter(j => j.day === i);

                return (
                  <div
                    key={day}
                    style={{
                      background: isToday ? "rgba(99, 102, 241, 0.07)" : "#1E293B",
                      border: isToday ? "1px solid #6366F1″ : "1px solid #334155",
                      borderRadius: 12, overflow: "hidden", minHeight: 180,
                    }}
                  >
                    {/* Day Header */}
                    <div style={{
                      padding: "10px 10px 8px",
                      borderBottom: "1px solid " + (isToday ? "rgba(99,102,241,0.3)" : "#293548″),
                      background: isToday ? "rgba(99, 102, 241, 0.1)" : "transparent",
                    }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: isToday ? "#818CF8″ : "#64748B" }}>
                        {day}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: isToday ? "#A5B4FC" : "#94A3B8″ }}>
                        {DATES[i].split(" ")[1]}
                      </div>
                      {hasConflict && (
                        <div style={{ marginTop: 4 }}>
                          <AlertTriangle size={11} color="#F87171″ />
                        </div>
                      )}
                    </div>

                    {/* Jobs */}
                    <div style={{ padding: "8px 8px 6px", display: "flex", flexDirection: "column", gap: 5 }}>
                      {dayJobs.map(job => {
                        const sc = STATUS_COLORS[job.status];
                        return (
                          <div
                            key={job.id}
                            style={{
                              background: sc.bg, border: `1px solid ${sc.border}`,
                              borderRadius: 8, padding: "6px 8px",
                            }}
                          >
                            <div style={{ fontSize: 10, fontWeight: 700, color: sc.text }}>
                              {job.time}
                            </div>
                            <div style={{ fontSize: 11, color: "#E2E8F0″, lineHeight: 1.3, marginTop: 1 }}>
                              {job.service}
                            </div>
                            <div style={{ fontSize: 10, color: "#64748B", marginTop: 2 }}>
                              {job.homeowner}
                            </div>
                          </div>
                        );
                      })}

                      {dayJobs.length < 3 && (
                        <button
                          onClick={() => setShowModal(true)}
                          style={{
                            background: "transparent", border: "1px dashed #334155″,
                            borderRadius: 8, padding: "6px 0″, cursor: "pointer",
                            fontSize: 10, color: "#475569″, width: "100%",
                            display: "flex", alignItems: "center", justifyContent: "center", gap: 3,
                          }}
                        >
                          <Plus size={10} /> Add job
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{
              background: "#1E293B", border: "1px solid #334155″,
              borderRadius: 12, overflow: "hidden",
            }}>
              <div style={{
                padding: "14px 16px",
                borderBottom: "1px solid #293548″,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <Clock size={14} color="#6366F1″ />
                <span style={{ fontSize: 13, fontWeight: 700, color: "#F1F5F9″ }}>Upcoming Jobs</span>
              </div>
              <div style={{ padding: "8px 0″ }}>
                {upcomingJobs.map((job, i) => {
                  const sc = STATUS_COLORS[job.status];
                  return (
                    <div key={job.id} style={{
                      padding: "12px 16px",
                      borderBottom: i < upcomingJobs.length - 1 ? "1px solid #1A2540″ : "none",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                        <span style={{
                          fontSize: 11, fontWeight: 700, color: sc.text,
                          background: sc.bg, padding: "2px 8px", borderRadius: 20,
                        }}>
                          {job.status}
                        </span>
                        <span style={{ fontSize: 11, color: "#475569″ }}>
                          {DAYS[job.day]}, {job.time}
                        </span>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#E2E8F0″, marginBottom: 2 }}>
                        {job.service}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <MapPin size={11} color="#64748B" />
                        <span style={{ fontSize: 11, color: "#64748B" }}>{job.address}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                        <User size={11} color="#64748B" />
                        <span style={{ fontSize: 11, color: "#64748B" }}>{job.homeowner}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Status Legend */}
            <div style={{
              background: "#1E293B", border: "1px solid #334155″,
              borderRadius: 12, padding: "14px 16px",
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#64748B", marginBottom: 10 }}>Status Legend</div>
              {(["Confirmed", "Pending", "Completed"] as JobStatus[]).map(s => {
                const sc = STATUS_COLORS[s];
                return (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: 3,
                      background: sc.bg, border: `1px solid ${sc.border}`,
                    }} />
                    <span style={{ fontSize: 12, color: sc.text }}>{s}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Add Job Modal */}
        {showModal && (
          <div style={{
            position: "fixed", inset: 0, zIndex: 100,
            background: "rgba(0,0,0,0.7)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
          }}>
            <div style={{
              background: "#1E293B", border: "1px solid #334155″,
              borderRadius: 16, width: "100%", maxWidth: 440,
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}>
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "18px 20px", borderBottom: "1px solid #334155″,
              }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#F1F5F9″ }}>Add Job</div>
                <button
                  onClick={() => setShowModal(false)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#64748B" }}
                >
                  <X size={18} />
                </button>
              </div>
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { key: "address", label: "Address", placeholder: "123 Main St, Dallas TX" },
                  { key: "service", label: "Service type", placeholder: "HVAC, Plumbing, Roofing..." },
                  { key: "homeowner", label: "Homeowner name", placeholder: "John Smith" },
                  { key: "notes", label: "Notes (optional)", placeholder: "Access code, gate info..." },
                ].map(field => (
                  <div key={field.key}>
                    <label style={{ fontSize: 12, color: "#64748B", display: "block", marginBottom: 5 }}>
                      {field.label}
                    </label>
                    <input
                      value={(form as Record<string, string>)[field.key]}
                      onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                      placeholder={field.placeholder}
                      style={{
                        width: "100%", background: "#0F172A", border: "1px solid #334155″,
                        borderRadius: 8, padding: "9px 12px", color: "#E2E8F0″,
                        fontSize: 13, outline: "none", boxSizing: "border-box",
                        fontFamily: "inherit",
                      }}
                    />
                  </div>
                ))}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 12, color: "#64748B", display: "block", marginBottom: 5 }}>Date</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))}
                      style={{
                        width: "100%", background: "#0F172A", border: "1px solid #334155″,
                        borderRadius: 8, padding: "9px 12px", color: "#E2E8F0″,
                        fontSize: 13, outline: "none", boxSizing: "border-box",
                        fontFamily: "inherit",
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: "#64748B", display: "block", marginBottom: 5 }}>Time</label>
                    <input
                      type="time"
                      value={form.time}
                      onChange={e => setForm(prev => ({ ...prev, time: e.target.value }))}
                      style={{
                        width: "100%", background: "#0F172A", border: "1px solid #334155″,
                        borderRadius: 8, padding: "9px 12px", color: "#E2E8F0″,
                        fontSize: 13, outline: "none", boxSizing: "border-box",
                        fontFamily: "inherit",
                      }}
                    />
                  </div>
                </div>
                <button
                  onClick={addJob}
                  style={{
                    marginTop: 4,
                    background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                    border: "none", borderRadius: 10, padding: "12px 0″,
                    cursor: "pointer", fontSize: 14, fontWeight: 700, color: "#fff",
                  }}
                >
                  Add to Schedule
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
