import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  Trophy, Download, RotateCcw, Settings, Star,
  CheckCircle, AlertTriangle, Edit3, Users,
} from "lucide-react";

type WeightKey = "jobs" | "commission" | "response" | "rating";

const WEIGHTS_INIT: Record<WeightKey, number> = {
  jobs: 30,
  commission: 40,
  response: 20,
  rating: 10,
};

const TOP_10 = [
  { rank: 1, name: "Marcus Webb", score: 9420, jobs: 48, commission: "$12,840″, response: "98%", rating: "4.9" },
  { rank: 2, name: "Dani Torres", score: 8810, jobs: 41, commission: "$10,200″, response: "95%", rating: "4.8" },
  { rank: 3, name: "James Okello", score: 8650, jobs: 39, commission: "$9,860″, response: "97%", rating: "5.0" },
  { rank: 4, name: "Sarah Kim", score: 8340, jobs: 36, commission: "$9,100″, response: "94%", rating: "4.9" },
  { rank: 5, name: "Liam Patel", score: 8120, jobs: 34, commission: "$8,750″, response: "96%", rating: "4.7" },
  { rank: 6, name: "Aisha Brown", score: 7980, jobs: 33, commission: "$8,400″, response: "93%", rating: "4.8" },
  { rank: 7, name: "Carlos Rivera", score: 7820, jobs: 31, commission: "$8,100″, response: "91%", rating: "4.6" },
  { rank: 8, name: "Nina Johnson", score: 7650, jobs: 30, commission: "$7,800″, response: "92%", rating: "4.7" },
  { rank: 9, name: "Derek Mills", score: 7410, jobs: 28, commission: "$7,400″, response: "90%", rating: "4.5" },
  { rank: 10, name: "Priya Shah", score: 7200, jobs: 27, commission: "$6,900″, response: "89%", rating: "4.6" },
];

const HISTORICAL = [
  { month: "April 2026″, winner: "Marcus Webb", score: 9100, jobs: 45, commission: "$11,800" },
  { month: "March 2026″, winner: "Dani Torres", score: 8700, jobs: 40, commission: "$10,500" },
  { month: "February 2026″, winner: "James Okello", score: 8200, jobs: 37, commission: "$9,400" },
];

const PRIZES = [
  { tier: "Top 10″, reward: "6 months free", color: "#F59E0B" },
  { tier: "Top 25″, reward: "3 months free", color: "#94A3B8" },
  { tier: "Top 50″, reward: "1 month free", color: "#CD7C2F" },
];

const PERIODS = ["Weekly", "Monthly", "Quarterly"] as const;
type Period = typeof PERIODS[number];

const RANK_MEDALS = ["🥇", "🥈", "🥉"];

export default function LeaderboardAdmin() {
  const [weights, setWeights] = useState<Record<WeightKey, number>>({ ...WEIGHTS_INIT });
  const [period, setPeriod] = useState<Period>("Monthly");
  const [prizes, setPrizes] = useState(PRIZES.map(p => ({ ...p })));
  const [autoPublish, setAutoPublish] = useState(true);
  const [requireMin, setRequireMin] = useState(true);
  const [showResetModal, setShowResetModal] = useState(false);

  const total = Object.values(weights).reduce((a, b) => a + b, 0);

  function adjustWeight(key: WeightKey, val: number) {
    setWeights(prev => ({ ...prev, [key]: val }));
  }

  function handleExport() {
    const csv = [
      "Rank,Name,Score,Jobs,Commission,Response Rate,Rating",
      ...TOP_10.map(r =>
        `${r.rank},"${r.name}",${r.score},${r.jobs},"${r.commission}","${r.response}","${r.rating}"`
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leaderboard-rankings.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const weightEntries: { key: WeightKey; label: string; color: string }[] = [
    { key: "jobs", label: "Jobs Completed", color: "#14B8A6″ },
    { key: "commission", label: "Commission Earned", color: "#22C55E" },
    { key: "response", label: "Response Rate", color: "#3B82F6″ },
    { key: "rating", label: "Customer Rating", color: "#F59E0B" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6″>
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4″>
          <div className="flex items-center gap-3″>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #F59E0B22, #F59E0B44)", border: "1px solid #F59E0B30″ }}
            >
              <Trophy className="w-5 h-5 text-amber-400″ />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Leaderboard Admin</h1>
              <p className="text-sm" style={{ color: "#8B91A8″ }}>Configure rankings and rewards</p>
            </div>
          </div>
          <div className="flex gap-3″>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90″
              style={{ background: "#1A1E2A", color: "#8B91A8″, border: "1px solid #252A3A" }}
            >
              <Download className="w-4 h-4″ />
              Export Rankings
            </button>
            <button
              onClick={() => setShowResetModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90″
              style={{ background: "#EF444415″, color: "#EF4444", border: "1px solid #EF444430" }}
            >
              <RotateCcw className="w-4 h-4″ />
              Reset Leaderboard
            </button>
          </div>
        </div>

        {/* Status bar */}
        <div
          className="rounded-2xl p-4 flex flex-wrap items-center gap-6″
          style={{ background: "#13161E", border: "1px solid #252A3A" }}
        >
          <div className="flex items-center gap-2″>
            <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-semibold text-green-400″>Live</span>
          </div>
          <div className="text-sm text-white"><span style={{ color: "#8B91A8″ }}>Partners ranked:</span> <strong>112</strong></div>
          <div className="text-sm text-white"><span style={{ color: "#8B91A8″ }}>Resets:</span> <strong>June 1, 2026</strong></div>
          <div className="text-sm text-white"><span style={{ color: "#8B91A8″ }}>Period:</span> <strong>{period}</strong></div>
        </div>

        {/* Config grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6″>
          {/* Category weights */}
          <div
            className="rounded-2xl p-6″
            style={{ background: "#13161E", border: "1px solid #252A3A" }}
          >
            <div className="flex items-center gap-2 mb-5″>
              <Settings className="w-4 h-4 text-purple-400″ />
              <h2 className="text-base font-bold text-white">Category Weights</h2>
              <span
                className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{
                  background: total === 100 ? "#22C55E20″ : "#EF444420",
                  color: total === 100 ? "#22C55E" : "#EF4444″,
                }}
              >
                Total: {total}%
              </span>
            </div>
            <div className="space-y-4″>
              {weightEntries.map(({ key, label, color }) => (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1″>
                    <span className="text-white font-medium">{label}</span>
                    <span className="font-bold" style={{ color }}>{weights[key]}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={weights[key]}
                    onChange={e => adjustWeight(key, Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: color }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Toggles + Period */}
          <div className="space-y-5″>
            {/* Reset period */}
            <div
              className="rounded-2xl p-5″
              style={{ background: "#13161E", border: "1px solid #252A3A" }}
            >
              <h2 className="text-base font-bold text-white mb-4″>Reset Period</h2>
              <div className="flex gap-2″>
                {PERIODS.map(p => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      background: period === p ? "#A855F7″ : "#1A1E2A",
                      color: period === p ? "#fff" : "#8B91A8″,
                      border: `1px solid ${period === p ? "#A855F7" : "#252A3A"}`,
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div
              className="rounded-2xl p-5 space-y-4″
              style={{ background: "#13161E", border: "1px solid #252A3A" }}
            >
              {[
                { label: "Auto-publish results", sub: "Automatically post rankings when period ends", val: autoPublish, set: setAutoPublish },
                { label: "Require minimum 3 jobs", sub: "Partners with fewer than 3 jobs are excluded", val: requireMin, set: setRequireMin },
              ].map(({ label, sub, val, set }) => (
                <div key={label} className="flex items-center justify-between gap-4″>
                  <div>
                    <p className="text-sm font-semibold text-white">{label}</p>
                    <p className="text-xs mt-0.5″ style={{ color: "#8B91A8" }}>{sub}</p>
                  </div>
                  <button
                    onClick={() => set(!val)}
                    className="relative w-11 h-6 rounded-full transition-all flex-shrink-0″
                    style={{ background: val ? "#A855F7″ : "#252A3A" }}
                  >
                    <div
                      className="absolute top-1 w-4 h-4 bg-white rounded-full transition-all"
                      style={{ left: val ? "calc(100% - 20px)" : "4px" }}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Prize tiers */}
        <div
          className="rounded-2xl p-6″
          style={{ background: "#13161E", border: "1px solid #252A3A" }}
        >
          <div className="flex items-center gap-2 mb-5″>
            <Star className="w-4 h-4 text-amber-400″ />
            <h2 className="text-base font-bold text-white">Prize Configuration</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4″>
            {prizes.map((prize, i) => (
              <div
                key={i}
                className="rounded-xl p-4″
                style={{ background: "#1A1E2A", border: `1px solid ${prize.color}30` }}
              >
                <div className="flex items-center gap-2 mb-3″>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: prize.color + "30″, color: prize.color }}
                  >
                    {i + 1}
                  </div>
                  <span className="text-sm font-bold text-white">{prize.tier}</span>
                </div>
                <input
                  type="text"
                  value={prize.reward}
                  onChange={e => {
                    const updated = [...prizes];
                    updated[i] = { ...updated[i], reward: e.target.value };
                    setPrizes(updated);
                  }}
                  className="w-full text-sm rounded-lg px-3 py-2 font-medium"
                  style={{ background: "#0A1628″, color: prize.color, border: `1px solid ${prize.color}40` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Top 10 table */}
        <div
          className="rounded-2xl p-6″
          style={{ background: "#13161E", border: "1px solid #252A3A" }}
        >
          <div className="flex items-center gap-2 mb-5″>
            <Users className="w-4 h-4 text-cyan-400″ />
            <h2 className="text-base font-bold text-white">Current Top 10</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid #252A3A" }}>
                  {["Rank", "Partner", "Score", "Jobs", "Commission", "Response", "Rating"].map(h => (
                    <th key={h} className="text-left pb-3 pr-4 text-xs font-semibold uppercase" style={{ color: "#8B91A8″ }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TOP_10.map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #1A1E2A" }}>
                    <td className="py-3 pr-4 font-bold text-white">
                      {i < 3 ? RANK_MEDALS[i] : `#${row.rank}`}
                    </td>
                    <td className="py-3 pr-4 font-semibold text-white">{row.name}</td>
                    <td className="py-3 pr-4 font-bold text-amber-400″>{row.score.toLocaleString()}</td>
                    <td className="py-3 pr-4 text-white">{row.jobs}</td>
                    <td className="py-3 pr-4 text-green-400 font-semibold">{row.commission}</td>
                    <td className="py-3 pr-4 text-blue-400″>{row.response}</td>
                    <td className="py-3 pr-4 text-white">{row.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Historical winners */}
        <div
          className="rounded-2xl p-6″
          style={{ background: "#13161E", border: "1px solid #252A3A" }}
        >
          <div className="flex items-center gap-2 mb-5″>
            <Trophy className="w-4 h-4 text-amber-400″ />
            <h2 className="text-base font-bold text-white">Historical Winners</h2>
          </div>
          <div className="space-y-3″>
            {HISTORICAL.map((h, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center justify-between gap-4 rounded-xl p-4″
                style={{ background: "#1A1E2A", border: "1px solid #252A3A" }}
              >
                <div className="flex items-center gap-3″>
                  <span className="text-2xl">🥇</span>
                  <div>
                    <p className="text-sm font-bold text-white">{h.winner}</p>
                    <p className="text-xs" style={{ color: "#8B91A8″ }}>{h.month}</p>
                  </div>
                </div>
                <div className="flex gap-6 text-sm flex-wrap">
                  <div><span style={{ color: "#8B91A8″ }}>Score</span> <strong className="text-white">{h.score.toLocaleString()}</strong></div>
                  <div><span style={{ color: "#8B91A8″ }}>Jobs</span> <strong className="text-white">{h.jobs}</strong></div>
                  <div><span style={{ color: "#8B91A8″ }}>Commission</span> <strong className="text-green-400">{h.commission}</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reset modal */}
      {showResetModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4″
          style={{ background: "rgba(0,0,0,0.7)" }}
        >
          <div
            className="rounded-2xl p-6 max-w-md w-full"
            style={{ background: "#13161E", border: "1px solid #EF444430″ }}
          >
            <div className="flex items-center gap-3 mb-4″>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#EF444420″ }}>
                <AlertTriangle className="w-5 h-5 text-red-400″ />
              </div>
              <h2 className="text-lg font-bold text-white">Reset Leaderboard?</h2>
            </div>
            <p className="text-sm mb-6″ style={{ color: "#8B91A8" }}>
              This will archive current rankings and start fresh. <strong className="text-white">112 partners</strong> will be affected and their scores will be reset to zero.
            </p>
            <div className="flex gap-3″>
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: "#1A1E2A", color: "#8B91A8″, border: "1px solid #252A3A" }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: "#EF4444″, color: "#fff" }}
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
