import { useState } from "react";
import { Link } from "wouter";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  Calendar, Wind, Droplets, Home, Leaf, Download, ArrowRight,
  CheckCircle, AlertTriangle, Clock, ChevronDown, ChevronUp,
} from "lucide-react";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

type Task = {
  name: string;
  trade: string;
  type: "DIY" | "Pro";
  cost: string;
  urgency: "Critical" | "High" | "Normal" | "Low";
  color: string;
};

type MonthData = {
  urgency: "High" | "Normal" | "Light";
  pills: { label: string; color: string }[];
  tasks: Task[];
};

const CALENDAR: Record<string, MonthData> = {
  January: {
    urgency: "Light",
    pills: [
      { label: "HVAC", color: "#14B8A6″ },
      { label: "Plumbing", color: "#3B82F6″ },
    ],
    tasks: [
      { name: "Check furnace filters", trade: "HVAC", type: "DIY", cost: "$15–$30″, urgency: "Normal", color: "#14B8A6" },
      { name: "Inspect pipes for freezing", trade: "Plumbing", type: "Pro", cost: "$100–$200″, urgency: "High", color: "#3B82F6" },
      { name: "Test smoke & CO detectors", trade: "Safety", type: "DIY", cost: "$0″, urgency: "Normal", color: "#8B5CF6" },
    ],
  },
  February: {
    urgency: "Light",
    pills: [
      { label: "Roofing", color: "#F97316″ },
      { label: "HVAC", color: "#14B8A6″ },
    ],
    tasks: [
      { name: "Inspect roof for ice damage", trade: "Roofing", type: "Pro", cost: "$150–$300″, urgency: "High", color: "#F97316" },
      { name: "Clean dryer vent", trade: "HVAC", type: "DIY", cost: "$20–$50″, urgency: "Normal", color: "#14B8A6" },
      { name: "Flush water heater", trade: "Plumbing", type: "Pro", cost: "$80–$120″, urgency: "Normal", color: "#3B82F6" },
    ],
  },
  March: {
    urgency: "Normal",
    pills: [
      { label: "Landscaping", color: "#22C55E" },
      { label: "Roofing", color: "#F97316″ },
      { label: "Plumbing", color: "#3B82F6″ },
    ],
    tasks: [
      { name: "Spring lawn aeration", trade: "Landscaping", type: "Pro", cost: "$80–$200″, urgency: "Normal", color: "#22C55E" },
      { name: "Roof gutter cleaning", trade: "Roofing", type: "Pro", cost: "$100–$250″, urgency: "Normal", color: "#F97316" },
      { name: "Check outdoor faucets", trade: "Plumbing", type: "DIY", cost: "$0–$30″, urgency: "Normal", color: "#3B82F6" },
    ],
  },
  April: {
    urgency: "Normal",
    pills: [
      { label: "HVAC", color: "#14B8A6″ },
      { label: "Landscaping", color: "#22C55E" },
      { label: "Roofing", color: "#F97316″ },
    ],
    tasks: [
      { name: "A/C pre-season inspection", trade: "HVAC", type: "Pro", cost: "$80–$150″, urgency: "High", color: "#14B8A6" },
      { name: "Spring planting & bed prep", trade: "Landscaping", type: "DIY", cost: "$50–$150″, urgency: "Normal", color: "#22C55E" },
      { name: "Roof inspection after winter", trade: "Roofing", type: "Pro", cost: "$150–$350″, urgency: "Normal", color: "#F97316" },
    ],
  },
  May: {
    urgency: "High",
    pills: [
      { label: "HVAC", color: "#14B8A6″ },
      { label: "Plumbing", color: "#3B82F6″ },
      { label: "Landscaping", color: "#22C55E" },
      { label: "Roofing", color: "#F97316″ },
    ],
    tasks: [
      { name: "HVAC pre-season tune-up", trade: "HVAC", type: "Pro", cost: "$120–$250″, urgency: "Critical", color: "#14B8A6" },
      { name: "Foundation watering start", trade: "Plumbing", type: "DIY", cost: "$0–$40″, urgency: "High", color: "#3B82F6" },
      { name: "Pest control spring treatment", trade: "Pest Control", type: "Pro", cost: "$100–$200″, urgency: "Normal", color: "#22C55E" },
      { name: "Gutter inspection", trade: "Roofing", type: "Pro", cost: "$80–$180″, urgency: "Normal", color: "#F97316" },
    ],
  },
  June: {
    urgency: "High",
    pills: [
      { label: "HVAC", color: "#14B8A6″ },
      { label: "Landscaping", color: "#22C55E" },
    ],
    tasks: [
      { name: "Check A/C refrigerant", trade: "HVAC", type: "Pro", cost: "$100–$300″, urgency: "High", color: "#14B8A6" },
      { name: "Irrigation system startup", trade: "Landscaping", type: "Pro", cost: "$80–$150″, urgency: "Normal", color: "#22C55E" },
      { name: "Pressure wash driveway", trade: "General", type: "Pro", cost: "$100–$250″, urgency: "Low", color: "#8B5CF6" },
    ],
  },
  July: {
    urgency: "Normal",
    pills: [
      { label: "HVAC", color: "#14B8A6″ },
      { label: "Roofing", color: "#F97316″ },
    ],
    tasks: [
      { name: "Replace HVAC filters", trade: "HVAC", type: "DIY", cost: "$15–$40″, urgency: "Normal", color: "#14B8A6" },
      { name: "Check roof for storm damage", trade: "Roofing", type: "Pro", cost: "$100–$200″, urgency: "Normal", color: "#F97316" },
      { name: "Trim trees near home", trade: "Landscaping", type: "Pro", cost: "$200–$500″, urgency: "Normal", color: "#22C55E" },
    ],
  },
  August: {
    urgency: "Normal",
    pills: [
      { label: "Plumbing", color: "#3B82F6″ },
      { label: "Landscaping", color: "#22C55E" },
    ],
    tasks: [
      { name: "Inspect sprinkler heads", trade: "Plumbing", type: "DIY", cost: "$0–$50″, urgency: "Normal", color: "#3B82F6" },
      { name: "Lawn overseeding prep", trade: "Landscaping", type: "Pro", cost: "$150–$400″, urgency: "Normal", color: "#22C55E" },
      { name: "Window caulk inspection", trade: "General", type: "DIY", cost: "$10–$30″, urgency: "Low", color: "#8B5CF6" },
    ],
  },
  September: {
    urgency: "High",
    pills: [
      { label: "HVAC", color: "#14B8A6″ },
      { label: "Roofing", color: "#F97316″ },
      { label: "Landscaping", color: "#22C55E" },
    ],
    tasks: [
      { name: "Furnace pre-season check", trade: "HVAC", type: "Pro", cost: "$80–$160″, urgency: "High", color: "#14B8A6" },
      { name: "Gutter cleaning", trade: "Roofing", type: "Pro", cost: "$100–$250″, urgency: "Normal", color: "#F97316" },
      { name: "Lawn fertilization", trade: "Landscaping", type: "Pro", cost: "$80–$200″, urgency: "Normal", color: "#22C55E" },
    ],
  },
  October: {
    urgency: "High",
    pills: [
      { label: "HVAC", color: "#14B8A6″ },
      { label: "Plumbing", color: "#3B82F6″ },
      { label: "Roofing", color: "#F97316″ },
    ],
    tasks: [
      { name: "Winterize outdoor plumbing", trade: "Plumbing", type: "Pro", cost: "$100–$200″, urgency: "High", color: "#3B82F6" },
      { name: "Chimney inspection & sweep", trade: "General", type: "Pro", cost: "$150–$300″, urgency: "High", color: "#F97316" },
      { name: "Check weatherstripping", trade: "General", type: "DIY", cost: "$20–$60″, urgency: "Normal", color: "#8B5CF6" },
    ],
  },
  November: {
    urgency: "Normal",
    pills: [
      { label: "HVAC", color: "#14B8A6″ },
      { label: "Landscaping", color: "#22C55E" },
    ],
    tasks: [
      { name: "Final gutter clean", trade: "Roofing", type: "Pro", cost: "$80–$180″, urgency: "Normal", color: "#F97316" },
      { name: "Irrigation winterization", trade: "Landscaping", type: "Pro", cost: "$80–$150″, urgency: "High", color: "#22C55E" },
      { name: "Stock emergency supplies", trade: "Safety", type: "DIY", cost: "$50–$100″, urgency: "Normal", color: "#8B5CF6" },
    ],
  },
  December: {
    urgency: "Light",
    pills: [
      { label: "HVAC", color: "#14B8A6″ },
      { label: "Plumbing", color: "#3B82F6″ },
    ],
    tasks: [
      { name: "Insulate exposed pipes", trade: "Plumbing", type: "DIY", cost: "$20–$60″, urgency: "High", color: "#3B82F6" },
      { name: "Holiday light safety check", trade: "Electrical", type: "DIY", cost: "$0″, urgency: "Normal", color: "#F59E0B" },
      { name: "Year-end home insurance review", trade: "General", type: "DIY", cost: "$0″, urgency: "Low", color: "#8B5CF6" },
    ],
  },
};

const URGENCY_COLOR: Record<string, string> = {
  High: "#EF4444″,
  Normal: "#F59E0B",
  Light: "#22C55E",
};

function handleDownloadICS() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0″,
    "PRODID:-//ProLnk//HomeMaintenanceCalendar//EN",
    "BEGIN:VEVENT",
    "DTSTART:20260501T090000Z",
    "DTEND:20260501T100000Z",
    "SUMMARY:HVAC Pre-Season Tune-Up",
    "DESCRIPTION:Schedule your HVAC pre-season tune-up for optimal performance.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "home-maintenance-calendar.ics";
  a.click();
  URL.revokeObjectURL(url);
}

export default function HomeMaintenanceCalendar() {
  const currentMonth = "May";
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);

  const selected = CALENDAR[selectedMonth];

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] px-4 py-8 md:px-8″>
        {/* Header */}
        <div className="mb-8″>
          <div className="flex items-center gap-3 mb-1″>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #A855F722, #A855F744)", border: "1px solid #A855F730″ }}
            >
              <Calendar className="w-5 h-5 text-purple-400″ />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Maintenance Calendar</h1>
              <p className="text-sm" style={{ color: "#8B91A8″ }}>Never miss a service again</p>
            </div>
          </div>
        </div>

        {/* Annual cost banner */}
        <div
          className="rounded-2xl p-4 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4″
          style={{ background: "linear-gradient(135deg, #A855F715, #3B82F615)", border: "1px solid #A855F730″ }}
        >
          <div>
            <p className="text-sm font-medium text-purple-300″>Your 12-month maintenance plan</p>
            <p className="text-2xl font-bold text-white mt-0.5″>Estimated $1,800 – $3,400</p>
            <p className="text-xs mt-1″ style={{ color: "#8B91A8" }}>Based on 2,200 sq ft single-family home · DIY savings not included</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={handleDownloadICS}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90″
              style={{ background: "#A855F7″, color: "#fff" }}
            >
              <Download className="w-4 h-4″ />
              Add to my calendar
            </button>
            <Link href="/trustypro/book">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90″
                style={{ background: "#1A1E2A", color: "#A855F7″, border: "1px solid #A855F730" }}
              >
                Schedule All May Services
                <ArrowRight className="w-4 h-4″ />
              </button>
            </Link>
          </div>
        </div>

        {/* 12-month grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8″>
          {MONTHS.map((month, idx) => {
            const data = CALENDAR[month];
            const isCurrent = month === currentMonth;
            const isSelected = month === selectedMonth;
            return (
              <button
                key={idx}
                onClick={() => setSelectedMonth(month)}
                className="rounded-2xl p-4 text-left transition-all hover:scale-[1.02]"
                style={{
                  background: isSelected ? "#1F2435″ : "#13161E",
                  border: isCurrent
                    ? "2px solid #A855F7″
                    : isSelected
                    ? "1px solid #2E3450″
                    : "1px solid #252A3A",
                }}
              >
                <div className="flex items-center justify-between mb-2″>
                  <span className="text-sm font-semibold text-white">{month.slice(0, 3)}</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background: URGENCY_COLOR[data.urgency] + "20″,
                      color: URGENCY_COLOR[data.urgency],
                    }}
                  >
                    {data.urgency}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2″>
                  {data.pills.map((p, pi) => (
                    <span
                      key={pi}
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                      style={{ background: p.color + "25″, color: p.color }}
                    >
                      {p.label}
                    </span>
                  ))}
                </div>
                {isCurrent && (
                  <div className="mt-2 text-[10px] font-semibold text-purple-400″>Current Month</div>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected month detail */}
        {selected && (
          <div
            className="rounded-2xl p-6″
            style={{ background: "#13161E", border: "1px solid #252A3A" }}
          >
            <div className="flex items-center justify-between mb-5″>
              <div>
                <h2 className="text-lg font-bold text-white">{selectedMonth} Tasks</h2>
                <p className="text-sm" style={{ color: "#8B91A8″ }}>
                  {selected.tasks.length} maintenance items · Urgency:{" "}
                  <span style={{ color: URGENCY_COLOR[selected.urgency] }}>{selected.urgency}</span>
                </p>
              </div>
            </div>

            <div className="space-y-3″>
              {selected.tasks.map((task, ti) => (
                <div
                  key={ti}
                  className="flex items-center justify-between rounded-xl p-4 gap-4″
                  style={{ background: "#1A1E2A", border: "1px solid #252A3A" }}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0″>
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0″
                      style={{ background: task.color }}
                    />
                    <div className="min-w-0″>
                      <p className="text-sm font-semibold text-white truncate">{task.name}</p>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className="text-xs" style={{ color: "#8B91A8″ }}>{task.trade}</span>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{
                            background: task.type === "Pro" ? "#3B82F620″ : "#22C55E20",
                            color: task.type === "Pro" ? "#3B82F6″ : "#22C55E",
                          }}
                        >
                          {task.type}
                        </span>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{
                            background: task.urgency === "Critical" ? "#EF444420″ : task.urgency === "High" ? "#F9731620" : "#F59E0B20",
                            color: task.urgency === "Critical" ? "#EF4444″ : task.urgency === "High" ? "#F97316" : "#F59E0B",
                          }}
                        >
                          {task.urgency}
                        </span>
                        <span className="text-xs text-white font-medium">{task.cost}</span>
                      </div>
                    </div>
                  </div>
                  <Link href="/trustypro/book">
                    <button
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0 transition-all hover:opacity-90″
                      style={{ background: "#A855F720″, color: "#A855F7", border: "1px solid #A855F730" }}
                    >
                      Schedule
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </HomeownerLayout>
  );
}
