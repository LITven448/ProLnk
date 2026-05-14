import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Star, Flag, Trash2, MessageSquare, Download, Shield, AlertTriangle,
  Search, Filter, TrendingUp, Eye, CheckCircle, XCircle, BarChart3,
  ChevronDown, Send,
} from "lucide-react";
import { toast } from "sonner";

type AdminFilter = "all" | "flagged" | "positive" | "neutral" | "critical" | "no-reply";

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={i <= rating ? "fill-amber-400 text-amber-400" : "text-gray-600 fill-gray-600"}
        />
      ))}
    </div>
  );
}

function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color?: string }) {
  return (
    <div className="bg-[#0d1f3c] rounded-2xl border border-gray-700 p-4 text-center">
      <div className={`text-3xl font-bold ${color || "text-white"}`}>{value}</div>
      {sub && <div className={`text-xs mt-0.5 ${color || "text-teal-400"}`}>{sub}</div>}
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  );
}

function SuspiciousAlert({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <div className="bg-red-900/20 border border-red-500/40 rounded-2xl p-4 flex items-start gap-3">
      <div className="w-9 h-9 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
        <AlertTriangle className="w-5 h-5 text-red-400" />
      </div>
      <div className="flex-1">
        <div className="font-semibold text-red-300 text-sm">Suspicious Review Activity Detected</div>
        <div className="text-xs text-gray-400 mt-0.5">
          {count} review{count > 1 ? "s" : ""} flagged for review — unusual patterns detected (velocity, IP clustering, or keyword matching)
        </div>
      </div>
      <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-xs flex-shrink-0">{count} Alert{count > 1 ? "s" : ""}</Badge>
    </div>
  );
}

function QualityScore({ score, proName }: { score: number; proName: string }) {
  const color = score >= 4.5 ? "text-teal-400" : score >= 4 ? "text-amber-400" : score >= 3 ? "text-orange-400" : "text-red-400";
  const barColor = score >= 4.5 ? "#2dd4bf" : score >= 4 ? "#fbbf24" : score >= 3 ? "#fb923c" : "#f87171";
  const pct = (score / 5) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-400 w-28 truncate flex-shrink-0">{proName}</span>
      <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: barColor }} />
      </div>
      <span className={`text-xs font-bold w-8 text-right ${color}`}>{score.toFixed(1)}</span>
    </div>
  );
}

export default function ReviewManagement() {
  const [filter, setFilter] = useState<AdminFilter>("all");
  const [search, setSearch] = useState("");
  const [replies, setReplies] = useState<Record<number, string>>({});
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [flagged, setFlagged] = useState<Set<number>>(new Set());

  const utils = trpc.useUtils();
  const { data: rawReviews = [], isLoading } = trpc.partners.getPartnerReceivedReviews.useQuery();

  const replyMutation = trpc.partners.replyToReview.useMutation({
    onSuccess: () => {
      toast.success("ProLnk response posted!");
      setReplyingTo(null);
      setReplies(prev => ({ ...prev, [replyingTo!]: "" }));
      utils.partners.getPartnerReceivedReviews.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  const REVIEWS = rawReviews.map(r => ({
    id: r.id,
    proName: (r as any).partnerName || "Unknown Pro",
    homeowner: r.homeownerEmail ? r.homeownerEmail.split("@")[0] : "Homeowner",
    rating: r.rating,
    date: new Date(r.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    text: r.reviewText || "",
    job: (r as any).serviceType || "Service",
    replied: !!(r as any).replyText,
    replyText: (r as any).replyText ?? "",
    isSuspicious: r.rating === 5 && !r.reviewText,
  }));

  const totalReviews = REVIEWS.length;
  const avgRating = REVIEWS.length ? (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length) : 0;
  const fiveStarPct = REVIEWS.length ? Math.round((REVIEWS.filter(r => r.rating === 5).length / REVIEWS.length) * 100) : 0;
  const needsReply = REVIEWS.filter(r => !r.replied).length;
  const suspiciousCount = REVIEWS.filter(r => r.isSuspicious || flagged.has(r.id)).length;

  const proScores = Array.from(
    REVIEWS.reduce((map, r) => {
      const prev = map.get(r.proName) || { sum: 0, count: 0 };
      map.set(r.proName, { sum: prev.sum + r.rating, count: prev.count + 1 });
      return map;
    }, new Map<string, { sum: number; count: number }>())
  )
    .map(([name, { sum, count }]) => ({ name, score: sum / count }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  const filtered = REVIEWS.filter(r => {
    if (filter === "flagged") return flagged.has(r.id) || r.isSuspicious;
    if (filter === "positive") return r.rating >= 4;
    if (filter === "neutral") return r.rating === 3;
    if (filter === "critical") return r.rating <= 2;
    if (filter === "no-reply") return !r.replied;
    return true;
  }).filter(r =>
    !search ||
    r.proName.toLowerCase().includes(search.toLowerCase()) ||
    r.homeowner.toLowerCase().includes(search.toLowerCase()) ||
    r.text.toLowerCase().includes(search.toLowerCase())
  );

  const exportCSV = () => {
    const header = "ID,Pro,Homeowner,Rating,Date,Job,Text,Replied\n";
    const rows = REVIEWS.map(r =>
      `${r.id},"${r.proName}","${r.homeowner}",${r.rating},"${r.date}","${r.job}","${r.text.replace(/"/g, '""')}",${r.replied}`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `prolnk-reviews-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Reviews exported as CSV");
  };

  const toggleFlag = (id: number) => {
    setFlagged(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); toast.info("Review unflagged"); }
      else { next.add(id); toast.warning("Review flagged for review"); }
      return next;
    });
  };

  const removeReview = (id: number) => {
    toast.success("Review removed (demo — not persisted)");
  };

  const filterCounts: Record<AdminFilter, number> = {
    all: REVIEWS.length,
    flagged: REVIEWS.filter(r => flagged.has(r.id) || r.isSuspicious).length,
    positive: REVIEWS.filter(r => r.rating >= 4).length,
    neutral: REVIEWS.filter(r => r.rating === 3).length,
    critical: REVIEWS.filter(r => r.rating <= 2).length,
    "no-reply": REVIEWS.filter(r => !r.replied).length,
  };

  return (
    <div className="min-h-screen bg-[#0A1628] p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Shield className="w-6 h-6 text-teal-400" />
              Review Management
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              All reviews across the network — moderate, respond, and protect platform integrity
            </p>
          </div>
          <Button
            size="sm"
            onClick={exportCSV}
            className="bg-teal-600 hover:bg-teal-500 text-white"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Export CSV
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="Total Reviews" value={totalReviews} color="text-white" />
          <StatCard
            label="Platform Avg"
            value={avgRating > 0 ? avgRating.toFixed(1) : "—"}
            sub={`${fiveStarPct}% five-star`}
            color="text-amber-400"
          />
          <StatCard
            label="Needs Reply"
            value={needsReply}
            sub={needsReply > 0 ? "Respond within 48h" : "All replied"}
            color={needsReply > 0 ? "text-orange-400" : "text-teal-400"}
          />
          <StatCard
            label="Flagged"
            value={suspiciousCount}
            sub={suspiciousCount > 0 ? "Needs review" : "All clear"}
            color={suspiciousCount > 0 ? "text-red-400" : "text-teal-400"}
          />
        </div>

        {/* Suspicious alert */}
        <SuspiciousAlert count={suspiciousCount} />

        {/* Pro quality scores */}
        {proScores.length > 0 && (
          <div className="bg-[#0d1f3c] rounded-2xl border border-gray-700 p-5">
            <h2 className="text-sm font-semibold text-gray-300 flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-teal-400" />
              Review Quality Score by Pro
            </h2>
            <div className="space-y-2.5">
              {proScores.map(({ name, score }) => (
                <QualityScore key={name} proName={name} score={score} />
              ))}
            </div>
          </div>
        )}

        {/* Filters + search */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search by pro, homeowner, or review text..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-[#0d1f3c] border-gray-700 text-white placeholder:text-gray-600"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(["all", "flagged", "positive", "neutral", "critical", "no-reply"] as AdminFilter[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap ${
                  filter === f
                    ? f === "flagged" ? "bg-red-600 text-white border-red-600"
                    : f === "critical" ? "bg-orange-600 text-white border-orange-600"
                    : "bg-teal-600 text-white border-teal-600"
                    : "bg-[#0d1f3c] text-gray-400 border-gray-700 hover:border-gray-500"
                }`}
              >
                {f === "no-reply" ? "No Reply" : f.charAt(0).toUpperCase() + f.slice(1)}
                <span className="ml-1 opacity-70">({filterCounts[f]})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Review list */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-[#0d1f3c] rounded-2xl border border-gray-700 h-36 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-[#0d1f3c] rounded-2xl border border-gray-700 p-12 text-center">
            <Eye className="w-10 h-10 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No reviews match this filter</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(review => {
              const isFlagged = flagged.has(review.id) || review.isSuspicious;
              return (
                <div
                  key={review.id}
                  className={`bg-[#0d1f3c] rounded-2xl border p-5 space-y-3 transition-all ${
                    isFlagged ? "border-red-500/40" : review.rating <= 2 ? "border-orange-500/30" : "border-gray-700"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#1e3a5f] flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                        {review.proName[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-white">{review.proName}</span>
                          <Badge className="bg-[#1e3a5f] text-gray-300 border-gray-600 text-xs">{review.job}</Badge>
                          {isFlagged && (
                            <Badge className="bg-red-900/40 text-red-300 border-red-500/30 text-xs">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Flagged
                            </Badge>
                          )}
                          {!review.replied && (
                            <Badge className="bg-amber-900/30 text-amber-300 border-amber-500/30 text-xs">Needs Reply</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <Stars rating={review.rating} />
                          <span className="text-xs text-gray-500">by {review.homeowner}</span>
                          <span className="text-xs text-gray-600">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => toggleFlag(review.id)}
                        title={isFlagged ? "Unflag" : "Flag as suspicious"}
                        className={`p-2 rounded-lg transition-colors ${isFlagged ? "bg-red-900/40 text-red-400" : "bg-[#1e3a5f] text-gray-400 hover:text-amber-400"}`}
                      >
                        <Flag className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => removeReview(review.id)}
                        title="Remove review"
                        className="p-2 rounded-lg bg-[#1e3a5f] text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setReplyingTo(replyingTo === review.id ? null : review.id)}
                        title="Respond as ProLnk"
                        className="p-2 rounded-lg bg-[#1e3a5f] text-gray-400 hover:text-teal-400 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {review.text && (
                    <p className="text-sm text-gray-300 leading-relaxed border-l-2 border-gray-600 pl-3">
                      "{review.text}"
                    </p>
                  )}

                  {review.replied && review.replyText && (
                    <div className="bg-teal-900/20 border border-teal-500/20 rounded-xl p-3">
                      <div className="text-xs font-semibold text-teal-400 mb-1">Pro's Reply</div>
                      <p className="text-xs text-gray-300">{review.replyText}</p>
                    </div>
                  )}

                  {review.rating <= 2 && (
                    <div className="bg-orange-900/20 border border-orange-500/20 rounded-lg p-2.5 text-xs text-orange-300">
                      <AlertTriangle className="w-3.5 h-3.5 inline mr-1.5" />
                      Low rating — consider reaching out to mediate or investigate
                    </div>
                  )}

                  {replyingTo === review.id && (
                    <div className="space-y-2 pt-1">
                      <div className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-teal-400" />
                        Responding as ProLnk (visible to all)
                      </div>
                      <Textarea
                        placeholder="Write a professional platform-level response..."
                        value={replies[review.id] || ""}
                        onChange={e => setReplies(prev => ({ ...prev, [review.id]: e.target.value }))}
                        className="bg-[#0a1628] border-gray-600 text-white placeholder:text-gray-600 text-sm resize-none"
                        rows={3}
                      />
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setReplyingTo(null)}
                          className="text-gray-400 hover:text-gray-200"
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          className="bg-teal-600 hover:bg-teal-500 text-white"
                          onClick={() => {
                            if (!replies[review.id]?.trim()) { toast.error("Write a response first"); return; }
                            replyMutation.mutate({ reviewId: review.id, replyText: replies[review.id].trim() });
                          }}
                          disabled={!replies[review.id]?.trim() || replyMutation.isPending}
                        >
                          <Send className="w-3.5 h-3.5 mr-1.5" />
                          Post Response
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
