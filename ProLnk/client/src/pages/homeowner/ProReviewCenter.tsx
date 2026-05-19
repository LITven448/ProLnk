import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Star, Trophy, Edit3, CheckCircle, Users, Sparkles } from "lucide-react";

interface PendingReview {
  id: number;
  pro: string;
  trade: string;
  date: string;
  job: string;
}

interface SubmittedReview {
  id: number;
  pro: string;
  stars: number;
  date: string;
  comment: string;
}

const PENDING: PendingReview[] = [
  { id: 1, pro: "Mike R.", trade: "Plumbing", date: "May 8, 2025″, job: "Water heater replacement — garage" },
  { id: 2, pro: "Carlos V.", trade: "HVAC", date: "Apr 22, 2025″, job: "Spring tune-up and filter change" },
  { id: 3, pro: "Tom K.", trade: "Electrical", date: "Apr 5, 2025″, job: "Panel upgrade 100A → 200A" },
];

const SUBMITTED: SubmittedReview[] = [
  { id: 1, pro: "James L.", stars: 5, date: "Mar 14, 2025″, comment: "James was on time, professional, explained everything clearly. Would hire again without hesitation." },
  { id: 2, pro: "Ana B.", stars: 5, date: "Feb 27, 2025″, comment: "Incredible attention to detail. Took photos, showed me what she found, gave me options." },
  { id: 3, pro: "Derek S.", stars: 4, date: "Jan 10, 2025″, comment: "Good work, finished faster than expected. Minor communication hiccup but resolved quickly." },
  { id: 4, pro: "Priya M.", stars: 5, date: "Dec 3, 2024″, comment: "Best contractor experience I have ever had. Will recommend to neighbors." },
];

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1″>
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(n)}
        >
          <Star
            size={24}
            fill={(hovered || value) >= n ? "#F59E0B" : "none"}
            color={(hovered || value) >= n ? "#F59E0B" : "rgba(255,255,255,0.20)"}
          />
        </button>
      ))}
    </div>
  );
}

function StarDisplay({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5″>
      {[1, 2, 3, 4, 5].map(n => (
        <Star
          key={n}
          size={14}
          fill={value >= n ? "#F59E0B" : "none"}
          color={value >= n ? "#F59E0B" : "rgba(255,255,255,0.15)"}
        />
      ))}
    </div>
  );
}

export default function ProReviewCenter() {
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [comments, setComments] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  const [points, setPoints] = useState(200);

  const completedCount = Object.keys(submitted).length + SUBMITTED.length;
  const totalJobs = PENDING.length + SUBMITTED.length;

  function submitReview(id: number) {
    if (!ratings[id]) return;
    setSubmitted(p => ({ ...p, [id]: true }));
    setPoints(p => p + 50);
  }

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white">
        <div className="max-w-2xl mx-auto px-4 py-6 pb-20″>

          {/* Header */}
          <div className="mb-6″>
            <h1 className="text-2xl font-black">My Reviews</h1>
            <p className="text-sm mt-1″ style={{ color: "rgba(255,255,255,0.5)" }}>
              Rate your experiences and help your neighbors find great pros
            </p>
          </div>

          {/* Summary Banner */}
          <div
            className="rounded-2xl p-4 flex items-center justify-between mb-6″
            style={{ background: "rgba(13,148,136,0.10)", border: "1px solid rgba(13,148,136,0.25)" }}
          >
            <div>
              <p className="text-sm font-bold">
                You've reviewed{" "}
                <span style={{ color: "#0D9488″ }}>{completedCount} of {totalJobs}</span>{" "}
                completed jobs.
              </p>
              <p className="text-xs mt-0.5″ style={{ color: "rgba(255,255,255,0.5)" }}>
                Reviews earn you <span style={{ color: "#F59E0B" }}>50 ProLnk points</span> each.
              </p>
            </div>
            <div
              className="rounded-2xl px-3 py-2 flex flex-col items-center"
              style={{ background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.20)" }}
            >
              <span className="text-lg font-black" style={{ color: "#F59E0B" }}>{points}</span>
              <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.45)" }}>pts</span>
            </div>
          </div>

          {/* Pending Reviews */}
          {PENDING.some(p => !submitted[p.id]) && (
            <div className="mb-6″>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-3″ style={{ color: "rgba(255,255,255,0.45)" }}>
                Awaiting Review
              </h2>
              <div className="flex flex-col gap-3″>
                {PENDING.map(p => (
                  !submitted[p.id] ? (
                    <div
                      key={p.id}
                      className="rounded-2xl p-4 flex flex-col gap-3″
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-bold">{p.pro}</p>
                          <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                            {p.trade} · {p.date}
                          </p>
                          <p className="text-xs mt-1″ style={{ color: "rgba(255,255,255,0.6)" }}>{p.job}</p>
                        </div>
                      </div>
                      <StarPicker
                        value={ratings[p.id] ?? 0}
                        onChange={n => setRatings(prev => ({ ...prev, [p.id]: n }))}
                      />
                      <textarea
                        value={comments[p.id] ?? ""}
                        onChange={e => setComments(prev => ({ ...prev, [p.id]: e.target.value }))}
                        placeholder="Share your experience (optional)…"
                        rows={2}
                        className="w-full rounded-xl p-3 text-sm resize-none outline-none"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.10)",
                          color: "#fff",
                          caretColor: "#0D9488″,
                        }}
                      />
                      <button
                        onClick={() => submitReview(p.id)}
                        disabled={!ratings[p.id]}
                        className="w-full py-3 rounded-xl text-sm font-bold transition-opacity"
                        style={{
                          background: ratings[p.id] ? "#0D9488″ : "rgba(255,255,255,0.06)",
                          color: ratings[p.id] ? "#fff" : "rgba(255,255,255,0.30)",
                          cursor: ratings[p.id] ? "pointer" : "not-allowed",
                        }}
                      >
                        Submit Review
                      </button>
                    </div>
                  ) : (
                    <div
                      key={p.id}
                      className="rounded-2xl p-4 flex items-center gap-3″
                      style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.20)" }}
                    >
                      <CheckCircle size={20} color="#10B981″ />
                      <div>
                        <p className="text-sm font-bold text-white">Review submitted!</p>
                        <p className="text-xs" style={{ color: "#10B981″ }}>+50 points earned 🎉</p>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Review Impact */}
          <div
            className="rounded-2xl p-4 flex items-center gap-4 mb-6″
            style={{ background: "rgba(13,148,136,0.08)", border: "1px solid rgba(13,148,136,0.20)" }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0″
              style={{ background: "rgba(13,148,136,0.15)" }}
            >
              <Users size={22} color="#0D9488″ />
            </div>
            <div>
              <p className="text-sm font-bold">Your 4 reviews have helped</p>
              <p className="text-2xl font-black" style={{ color: "#0D9488″ }}>127 homeowners</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>choose the right pro in your area</p>
            </div>
          </div>

          {/* Leaderboard Teaser */}
          <div
            className="rounded-2xl p-4 flex items-center gap-3 mb-6″
            style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.20)" }}
          >
            <Trophy size={18} color="#F59E0B" className="shrink-0″ />
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>
              <span className="font-bold text-white">Top 10 reviewers</span> get 3 months free subscription —{" "}
              you're currently <span style={{ color: "#F59E0B" }}>#47</span>
            </p>
          </div>

          {/* Past Reviews */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3″ style={{ color: "rgba(255,255,255,0.45)" }}>
              Your Past Reviews
            </h2>
            <div className="flex flex-col gap-3″>
              {SUBMITTED.map(r => (
                <div
                  key={r.id}
                  className="rounded-2xl p-4″
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="flex items-start justify-between mb-2″>
                    <div>
                      <p className="text-sm font-bold">{r.pro}</p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.40)" }}>{r.date}</p>
                    </div>
                    <button className="flex items-center gap-1 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                      <Edit3 size={12} />
                      Edit
                    </button>
                  </div>
                  <StarDisplay value={r.stars} />
                  <p className="text-xs mt-2 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {r.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </HomeownerLayout>
  );
}
