import { useState, useEffect } from "react";
import { Link } from "wouter";
import {
  CheckCircle, Circle, Inbox, Calendar, Clock,
  FileText, DollarSign, Camera, MessageSquare,
  CloudLightning, Star, Network, Flame, Sun,
} from "lucide-react";

type Task = {
  id: number;
  label: string;
  sub?: string;
  icon: typeof Inbox;
  link?: string;
};

const TASKS: Task[] = [
  { id: 1, label: "Check inbox for new leads", sub: "3 new!", icon: Inbox, link: "/inbound-leads" },
  { id: 2, label: "Review today's schedule", icon: Calendar, link: "/job-schedule" },
  { id: 3, label: "Update availability calendar", icon: Clock, link: "/availability" },
  { id: 4, label: "Follow up on pending quotes", sub: "2 pending", icon: FileText, link: "/job-log" },
  { id: 5, label: "Check earnings dashboard", icon: DollarSign, link: "/commission-ledger" },
  { id: 6, label: "Upload any pending job photos", icon: Camera, link: "/job-log" },
  { id: 7, label: "Respond to unanswered messages", icon: MessageSquare, link: "/notifications" },
  { id: 8, label: "Check storm alerts for your area", icon: CloudLightning, link: "/storm-alert" },
  { id: 9, label: "Review any new reviews", icon: Star, link: "/partner-profile-editor" },
  { id: 10, label: "Check your network activity", icon: Network, link: "/network-tree" },
];

function CompletionRing({ done, total }: { done: number; total: number }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const pct = done / total;
  const offset = circ * (1 - pct);

  return (
    <svg width="140" height="140" viewBox="0 0 140 140">
      <circle cx="70" cy="70" r={r} fill="none" stroke="#1A1E2A" strokeWidth="12" />
      <circle
        cx="70"
        cy="70"
        r={r}
        fill="none"
        stroke={done === total ? "#22C55E" : "#A855F7"}
        strokeWidth="12"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 70 70)"
        style={{ transition: "stroke-dashoffset 0.4s ease, stroke 0.4s ease" }}
      />
      <text x="70" y="66" textAnchor="middle" fill="#fff" fontSize="26" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
        {done}
      </text>
      <text x="70" y="86" textAnchor="middle" fill="#8B91A8" fontSize="13" fontFamily="Inter, system-ui, sans-serif">
        of {total}
      </text>
    </svg>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ["#A855F7", "#22C55E", "#F59E0B", "#3B82F6", "#EC4899"][i % 5],
    delay: Math.random() * 0.8,
    dur: 1.2 + Math.random() * 0.8,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map(p => (
        <div
          key={p.id}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            left: `${p.x}%`,
            top: "-8px",
            background: p.color,
            animation: `confettiFall ${p.dur}s ${p.delay}s ease-in forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          to { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function MorningChecklist() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [showConfetti, setShowConfetti] = useState(false);
  const done = checked.size;
  const total = TASKS.length;
  const allDone = done === total;

  function toggle(id: number) {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        if (next.size === total) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
      }
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-[#0A1628] px-4 py-8 md:px-8" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {showConfetti && <Confetti />}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #F59E0B22, #F59E0B44)", border: "1px solid #F59E0B30" }}
          >
            <Sun className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Morning Checklist</h1>
            <p className="text-sm" style={{ color: "#8B91A8" }}>{today}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: "#13161E", border: "1px solid #252A3A" }}>
          <Flame className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-bold text-white">7-day streak</span>
          <span className="text-lg">🔥</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: ring + stats */}
        <div className="flex flex-col gap-5">
          {/* Ring card */}
          <div
            className="rounded-2xl p-6 flex flex-col items-center"
            style={{ background: "#13161E", border: `1px solid ${allDone ? "#22C55E30" : "#A855F730"}` }}
          >
            <p className="text-sm font-semibold mb-4 text-white">Good morning, Marcus!</p>
            <CompletionRing done={done} total={total} />
            <p className="mt-4 text-sm font-medium" style={{ color: "#8B91A8" }}>
              {allDone
                ? "Day started right! +50 XP 🎉"
                : `${total - done} task${total - done === 1 ? "" : "s"} remaining`}
            </p>
            {allDone && (
              <div
                className="mt-3 w-full text-center rounded-xl py-2.5 text-sm font-bold"
                style={{ background: "#22C55E20", color: "#22C55E", border: "1px solid #22C55E30" }}
              >
                Day started right! +50 XP
              </div>
            )}
          </div>

          {/* Streak */}
          <div
            className="rounded-2xl p-5"
            style={{ background: "#13161E", border: "1px solid #252A3A" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-bold text-white">7-Day Streak</span>
            </div>
            <p className="text-xs" style={{ color: "#8B91A8" }}>
              You've completed your morning checklist <strong className="text-white">7 days in a row</strong> 🔥
            </p>
            <div className="flex gap-1 mt-3">
              {Array.from({ length: 7 }, (_, i) => (
                <div
                  key={i}
                  className="flex-1 h-2 rounded-full"
                  style={{ background: "#22C55E" }}
                />
              ))}
            </div>
          </div>

          {/* Yesterday */}
          <div
            className="rounded-2xl p-5"
            style={{ background: "#13161E", border: "1px solid #252A3A" }}
          >
            <p className="text-sm font-bold text-white mb-3">Yesterday's Quick Look</p>
            <div className="space-y-2 text-sm">
              {[
                { label: "Jobs completed", val: "2", color: "#14B8A6" },
                { label: "Earnings", val: "$624", color: "#22C55E" },
                { label: "New recruits", val: "1", color: "#A855F7" },
              ].map(({ label, val, color }) => (
                <div key={label} className="flex justify-between">
                  <span style={{ color: "#8B91A8" }}>{label}</span>
                  <span className="font-bold" style={{ color }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: task list */}
        <div className="lg:col-span-2">
          <div
            className="rounded-2xl p-6"
            style={{ background: "#13161E", border: "1px solid #252A3A" }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-white">Daily Tasks</h2>
              <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "#A855F720", color: "#A855F7" }}>
                {done}/{total} complete
              </span>
            </div>
            <div className="space-y-2">
              {TASKS.map((task) => {
                const isChecked = checked.has(task.id);
                const Icon = task.icon;
                return (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 rounded-xl p-4 cursor-pointer transition-all hover:scale-[1.01]"
                    style={{
                      background: isChecked ? "#1A2E1A" : "#1A1E2A",
                      border: `1px solid ${isChecked ? "#22C55E30" : "#252A3A"}`,
                      opacity: isChecked ? 0.85 : 1,
                    }}
                    onClick={() => toggle(task.id)}
                  >
                    {isChecked
                      ? <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-400" />
                      : <Circle className="w-5 h-5 flex-shrink-0" style={{ color: "#555B72" }} />
                    }
                    <Icon className="w-4 h-4 flex-shrink-0" style={{ color: isChecked ? "#22C55E" : "#8B91A8" }} />
                    <div className="flex-1 min-w-0">
                      <span
                        className="text-sm font-medium"
                        style={{
                          color: isChecked ? "#22C55E" : "#F0F2FF",
                          textDecoration: isChecked ? "line-through" : "none",
                        }}
                      >
                        {task.label}
                      </span>
                      {task.sub && !isChecked && (
                        <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "#3B82F620", color: "#3B82F6" }}>
                          {task.sub}
                        </span>
                      )}
                    </div>
                    {task.link && !isChecked && (
                      <Link href={task.link}>
                        <span
                          className="text-xs font-semibold px-2 py-1 rounded-lg flex-shrink-0"
                          style={{ background: "#A855F720", color: "#A855F7" }}
                          onClick={e => e.stopPropagation()}
                        >
                          Go →
                        </span>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
