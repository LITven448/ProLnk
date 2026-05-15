import React from 'react';
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import {
  Star, Award, CheckCircle, Send, Copy, Share2, MessageSquare,
  ThumbsUp, Shield, Zap, Filter, ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

type FilterType = "all" | "positive" | "neutral" | "critical";

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-600 fill-gray-600"}
        />
      ))}
    </div>
  );
}

function CategoryBar({ label, value, color }: { label: string; value: number; color: string }) {
  const pct = (value / 5) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-400 w-28 flex-shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-semibold text-gray-300 w-8 text-right">{value > 0 ? value.toFixed(1) : "—"}</span>
    </div>
  );
}

function ScoreRing({ score, label, color }: { score: number; label: string; color: string }) {
  const pct = score > 0 ? (score / 5) * 100 : 0;
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 88 88" className="w-full h-full -rotate-90">
          <circle cx="44" cy="44" r={r} fill="none" stroke="#1e293b" strokeWidth="8" />
          <circle
            cx="44" cy="44" r={r} fill="none"
            stroke={color} strokeWidth="8"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white">{score > 0 ? score.toFixed(1) : "—"}</span>
          <span className="text-xs text-gray-500">/ 5</span>
        </div>
      </div>
      <span className="text-xs font-medium text-gray-400">{label}</span>
    </div>
  );
}

function ReviewCard({ review }: { review: any }) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const utils = trpc.useUtils();

  const replyMutation = trpc.partners.replyToReview.useMutation({
    onSuccess: () => {
      toast.success("Reply posted!");
      setShowReply(false);
      setReplyText("");
      utils.reviews.getMyReviews.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  const firstName = (review.homeownerName || "Homeowner").split(" ")[0];

  const shareReview = () => {
    const text = `"${review.reviewText}" — ${firstName} rated us ${review.rating}/5 ⭐`;
    navigator.clipboard.writeText(text);
    toast.success("Review text copied — paste to share!");
  };

  const ratingColor = review.rating >= 4 ? "border-teal-500/30" : review.rating === 3 ? "border-amber-500/30" : "border-red-500/30";

  return (
    <div className={`bg-[#0d1f3c] rounded-2xl border ${ratingColor} p-5 space-y-3`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
            style={{ backgroundColor: "#0f766e" }}
          >
            {firstName[0].toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-white text-sm">{firstName}</div>
            <div className="text-xs text-gray-400 flex items-center gap-1.5 flex-wrap">
              {review.issueType && <span className="bg-[#1e3a5f] px-1.5 py-0.5 rounded text-gray-300">{review.issueType}</span>}
              {review.homeownerCity && <span>{review.homeownerCity}</span>}
              <span>{new Date(review.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <Stars rating={review.rating} size={14} />
          {review.rating >= 4 && (
            <button
              onClick={shareReview}
              className="flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 transition-colors"
            >
              <Share2 className="w-3 h-3" />
              Share
            </button>
          )}
        </div>
      </div>

      {review.reviewText && (
        <p className="text-sm text-gray-300 leading-relaxed border-l-2 border-teal-500/40 pl-3">
          "{review.reviewText}"
        </p>
      )}

      {(review.ratingPunctuality || review.ratingQuality || review.ratingCommunication || review.ratingValue) && (
        <div className="space-y-1.5 pt-1">
          {review.ratingQuality > 0 && <CategoryBar label="Quality" value={review.ratingQuality} color="#2dd4bf" />}
          {review.ratingPunctuality > 0 && <CategoryBar label="Speed / Timeliness" value={review.ratingPunctuality} color="#818cf8" />}
          {review.ratingValue > 0 && <CategoryBar label="Value / Price" value={review.ratingValue} color="#fb923c" />}
          {review.ratingCommunication > 0 && <CategoryBar label="Communication" value={review.ratingCommunication} color="#34d399" />}
        </div>
      )}

      {review.replyText && (
        <div className="bg-[#1e3a5f] rounded-xl p-3">
          <div className="text-xs font-semibold text-teal-400 mb-1">Your Reply</div>
          <p className="text-xs text-gray-300">{review.replyText}</p>
        </div>
      )}

      {!review.replyText && (
        <div>
          {!showReply ? (
            <button
              onClick={() => setShowReply(true)}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-teal-400 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Reply to this review
            </button>
          ) : (
            <div className="space-y-2">
              <Textarea
                placeholder="Write a professional, thankful reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="bg-[#1e3a5f] border-gray-600 text-white placeholder:text-gray-500 text-sm resize-none"
                rows={3}
              />
              <div className="flex gap-2 justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { setShowReply(false); setReplyText(""); }}
                  className="text-gray-400 hover:text-gray-200"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className="bg-teal-600 hover:bg-teal-500 text-white"
                  onClick={() => replyMutation.mutate({ reviewId: review.id, replyText: replyText.trim() })}
                  disabled={!replyText.trim() || replyMutation.isPending}
                >
                  <Send className="w-3.5 h-3.5 mr-1.5" />
                  {replyMutation.isPending ? "Posting..." : "Post Reply"}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function EarnedBadge({ icon, title, desc, unlocked }: { icon: React.ReactNode; title: string; desc: string; unlocked: boolean }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${unlocked ? "bg-[#0d2b1f] border-teal-500/40" : "bg-[#0d1f3c] border-gray-700 opacity-50"}`}>
      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${unlocked ? "bg-teal-500/20" : "bg-gray-700"}`}>
        {icon}
      </div>
      <div>
        <div className={`text-sm font-semibold ${unlocked ? "text-teal-300" : "text-gray-500"}`}>{title}</div>
        <div className="text-xs text-gray-500">{desc}</div>
      </div>
      {unlocked && <CheckCircle className="w-4 h-4 text-teal-400 ml-auto flex-shrink-0" />}
    </div>
  );
}

export default function PartnerReviews() {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState<FilterType>("all");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [reqName, setReqName] = useState("");
  const [reqEmail, setReqEmail] = useState("");
  const [reqPhone, setReqPhone] = useState("");
  const [reqAddress, setReqAddress] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const limit = 10;

  const { data: myProfile } = trpc.partners.getMyProfile.useQuery();
  const googleReviewUrl = (myProfile as any)?.googleReviewUrl;

  const { data, isLoading } = trpc.reviews.getMyReviews.useQuery({ limit, offset: page * limit });

  const reviews = data?.reviews || [];
  const total = data?.total || 0;
  const avgRating = data?.avgRating || 0;

  const subAvg = (key: string) => {
    const vals = reviews.filter((r: any) => r[key] > 0).map((r: any) => r[key]);
    return vals.length > 0 ? vals.reduce((a: number, b: number) => a + b, 0) / vals.length : 0;
  };

  const fiveStarCount = reviews.filter((r: any) => r.rating === 5).length;
  const fourStarCount = reviews.filter((r: any) => r.rating === 4).length;
  const googleSentCount = reviews.filter((r: any) => r.googleReviewRequested).length;

  const filteredReviews = reviews.filter((r: any) => {
    if (filter === "positive") return r.rating >= 4;
    if (filter === "neutral") return r.rating === 3;
    if (filter === "critical") return r.rating <= 2;
    return true;
  });

  const has5StarStreak = fiveStarCount >= 5;
  const hasTrustedPro = avgRating >= 4.5 && total >= 10;
  const hasQuickResponder = reviews.filter((r: any) => r.replyText).length >= 5;

  const createRequestMutation = trpc.reviews.createReviewRequest.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        const fullUrl = `${window.location.origin}${data.reviewUrl}`;
        setGeneratedLink(fullUrl);
      } else {
        toast.error("Failed to create review link");
      }
    },
    onError: () => toast.error("Failed to create review link"),
  });

  const handleCreateRequest = () => {
    createRequestMutation.mutate({
      homeownerName: reqName.trim() || undefined,
      homeownerEmail: reqEmail.trim() || undefined,
      homeownerPhone: reqPhone.trim() || undefined,
      serviceAddress: reqAddress.trim() || undefined,
    });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    toast.success("Review link copied!");
  };

  const resetModal = () => {
    setGeneratedLink("");
    setReqName(""); setReqEmail(""); setReqPhone(""); setReqAddress("");
    setShowRequestModal(false);
  };

  const filterCounts = {
    all: reviews.length,
    positive: reviews.filter((r: any) => r.rating >= 4).length,
    neutral: reviews.filter((r: any) => r.rating === 3).length,
    critical: reviews.filter((r: any) => r.rating <= 2).length,
  };

  return (
    <PartnerLayout>
      <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
              My Reviews
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Homeowner ratings from completed jobs — your Trust Score and reputation
            </p>
          </div>
          <Button
            size="sm"
            className="bg-teal-600 hover:bg-teal-500 text-white shrink-0"
            onClick={() => { setGeneratedLink(""); setShowRequestModal(true); }}
          >
            <Send className="w-3.5 h-3.5 mr-1.5" />
            Request a Review
          </Button>
        </div>

        {/* Score overview */}
        {isLoading ? (
          <div className="bg-[#0d1f3c] rounded-2xl border border-gray-700 h-40 animate-pulse" />
        ) : (
          <div className="bg-[#0d1f3c] rounded-2xl border border-gray-700 p-6">
            <div className="flex flex-wrap items-center justify-around gap-6">
              <ScoreRing score={avgRating} label="Overall" color="#fbbf24" />
              <ScoreRing score={subAvg("ratingQuality")} label="Quality" color="#2dd4bf" />
              <ScoreRing score={subAvg("ratingPunctuality")} label="Speed" color="#818cf8" />
              <ScoreRing score={subAvg("ratingCommunication")} label="Communication" color="#34d399" />
              <ScoreRing score={subAvg("ratingValue")} label="Value" color="#fb923c" />
            </div>

            <div className="mt-6 pt-5 border-t border-gray-700 space-y-2.5">
              <CategoryBar label="Quality" value={subAvg("ratingQuality")} color="#2dd4bf" />
              <CategoryBar label="Speed / Timeliness" value={subAvg("ratingPunctuality")} color="#818cf8" />
              <CategoryBar label="Value / Price" value={subAvg("ratingValue")} color="#fb923c" />
              <CategoryBar label="Communication" value={subAvg("ratingCommunication")} color="#34d399" />
            </div>

            <div className="mt-5 pt-4 border-t border-gray-700 flex flex-wrap gap-6 justify-center">
              {[
                { label: "Total Reviews", value: total, color: "text-white" },
                { label: "5-Star Reviews", value: fiveStarCount, color: "text-amber-400" },
                { label: "Google Requests", value: googleSentCount, color: "text-teal-400" },
                { label: "4-5 Star Rate", value: `${total > 0 ? Math.round(((fiveStarCount + fourStarCount) / total) * 100) : 0}%`, color: "text-green-400" },
              ].map(({ label, value, color }) => (
                <div key={label} className="text-center">
                  <div className={`text-2xl font-bold ${color}`}>{value}</div>
                  <div className="text-xs text-gray-500">{label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Badges earned */}
        <div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Reputation Badges</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <EarnedBadge
              icon={<Star className="w-4 h-4 text-amber-400 fill-amber-400" />}
              title="5★ Streak"
              desc={`${fiveStarCount} five-star reviews`}
              unlocked={has5StarStreak}
            />
            <EarnedBadge
              icon={<Shield className="w-4 h-4 text-teal-400" />}
              title="Trusted Pro"
              desc="4.5+ avg with 10+ reviews"
              unlocked={hasTrustedPro}
            />
            <EarnedBadge
              icon={<Zap className="w-4 h-4 text-purple-400" />}
              title="Quick Responder"
              desc="Replied to 5+ reviews"
              unlocked={hasQuickResponder}
            />
          </div>
        </div>

        {/* Google Review CTA */}
        {avgRating >= 4 && total >= 3 && (
          <div className="rounded-2xl p-4 flex items-center gap-4 bg-[#0d2b1f] border border-teal-500/30">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5 text-amber-400" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white text-sm">Google Review automation is active</div>
              <div className="text-xs text-gray-400 mt-0.5">
                Every 4-5 star review automatically triggers a Google review request to the homeowner
              </div>
            </div>
            <Badge className="bg-teal-600/20 text-teal-300 border-teal-500/30 text-xs flex-shrink-0">
              <CheckCircle className="w-3 h-3 mr-1" />
              Active
            </Badge>
          </div>
        )}

        {/* Filter bar */}
        {reviews.length > 0 && (
          <div className="flex gap-2 flex-wrap items-center">
            <Filter className="w-4 h-4 text-gray-500 mr-1" />
            {(["all", "positive", "neutral", "critical"] as FilterType[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  filter === f
                    ? "bg-teal-600 text-white border-teal-600"
                    : "bg-[#0d1f3c] text-gray-400 border-gray-700 hover:border-gray-500"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)} ({filterCounts[f]})
              </button>
            ))}
          </div>
        )}

        {/* Review list */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-[#0d1f3c] rounded-2xl border border-gray-700 h-32 animate-pulse" />
            ))}
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="bg-[#0d1f3c] rounded-2xl border border-gray-700 p-12 text-center">
            <Star className="w-12 h-12 text-gray-700 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-400 mb-1">
              {filter === "all" ? "No reviews yet" : `No ${filter} reviews`}
            </h3>
            {filter === "all" && (
              <p className="text-sm text-gray-500 mb-4">
                Reviews appear after homeowners rate completed jobs. Request your first review below.
              </p>
            )}
            {filter === "all" && (
              <Button
                size="sm"
                className="bg-teal-600 hover:bg-teal-500 text-white"
                onClick={() => { setGeneratedLink(""); setShowRequestModal(true); }}
              >
                <Send className="w-3.5 h-3.5 mr-1.5" />
                Request a Review
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReviews.map((review: any) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {total > limit && (
          <div className="flex items-center justify-between pt-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 0}
              onClick={() => setPage(p => p - 1)}
              className="border-gray-700 text-gray-400 hover:text-white"
            >
              Previous
            </Button>
            <span className="text-sm text-gray-500">
              Page {page + 1} of {Math.ceil(total / limit)}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={(page + 1) * limit >= total}
              onClick={() => setPage(p => p + 1)}
              className="border-gray-700 text-gray-400 hover:text-white"
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Review Request Modal */}
      <Dialog open={showRequestModal} onOpenChange={(open) => { if (!open) resetModal(); }}>
        <DialogContent className="max-w-md bg-[#0d1f3c] border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <Send className="w-4 h-4 text-teal-400" />
              Request a Review
            </DialogTitle>
          </DialogHeader>

          {!generatedLink ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-400">
                Generate a shareable link to send after completing a job. No account required for the homeowner.
              </p>
              <div className="space-y-3">
                {[
                  { label: "Homeowner Name (optional)", placeholder: "e.g. Sarah Johnson", value: reqName, setter: setReqName, type: "text" },
                  { label: "Email (optional)", placeholder: "homeowner@email.com", value: reqEmail, setter: setReqEmail, type: "email" },
                  { label: "Phone (optional)", placeholder: "(555) 000-0000", value: reqPhone, setter: setReqPhone, type: "text" },
                  { label: "Job Address (optional)", placeholder: "123 Main St, Dallas TX", value: reqAddress, setter: setReqAddress, type: "text" },
                ].map(({ label, placeholder, value, setter, type }) => (
                  <div key={label}>
                    <label className="text-xs font-medium text-gray-400">{label}</label>
                    <Input
                      type={type}
                      placeholder={placeholder}
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      className="mt-1 bg-[#0a1628] border-gray-600 text-white placeholder:text-gray-600"
                    />
                  </div>
                ))}
              </div>
              {googleReviewUrl ? (
                <div className="bg-teal-900/30 border border-teal-500/30 rounded-lg p-3 flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-teal-300">Google Review link included</p>
                    <p className="text-xs text-teal-500 mt-0.5 truncate max-w-xs">{googleReviewUrl}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-3 flex items-start gap-2">
                  <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-amber-300">Add your Google Review URL to boost conversions</p>
                    <p className="text-xs text-amber-500 mt-0.5">Go to Profile Settings to add your Google Business link.</p>
                  </div>
                </div>
              )}
              <Button
                className="w-full bg-teal-600 hover:bg-teal-500 text-white"
                onClick={handleCreateRequest}
                disabled={createRequestMutation.isPending}
              >
                {createRequestMutation.isPending ? "Generating..." : "Generate Review Link"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-teal-900/30 border border-teal-500/30 rounded-lg p-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                <p className="text-sm text-teal-200 font-medium">Review link created!</p>
              </div>
              <p className="text-sm text-gray-400">
                Share via text, email, or any messaging app. Link expires in 30 days.
              </p>
              <div className="flex gap-2">
                <Input value={generatedLink} readOnly className="text-xs font-mono bg-[#0a1628] border-gray-600 text-gray-300" />
                <Button variant="outline" size="icon" onClick={copyLink} className="border-gray-600 text-gray-400 hover:text-white">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-300 hover:text-white"
                  onClick={() => {
                    const msg = `Hi${reqName ? ` ${reqName}` : ""}! Thanks for choosing us — your feedback means a lot. Leave a quick review (30 sec): ${generatedLink}`;
                    window.open(`sms:${reqPhone.replace(/\D/g, "")}?body=${encodeURIComponent(msg)}`, "_blank");
                  }}
                >
                  Send via SMS
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-300 hover:text-white"
                  onClick={() => {
                    const subject = encodeURIComponent("We'd love your feedback!");
                    const body = encodeURIComponent(`Hi${reqName ? ` ${reqName}` : ""},\n\nThank you for choosing us!\n\nLeave a quick review here: ${generatedLink}\n\nTakes less than 30 seconds. Thank you!`);
                    window.open(`mailto:${reqEmail}?subject=${subject}&body=${body}`, "_blank");
                  }}
                >
                  Send via Email
                </Button>
              </div>
              <Button className="w-full bg-[#0a1628] text-gray-300 hover:text-white border border-gray-600" variant="outline" onClick={resetModal}>
                Done
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PartnerLayout>
  );
}
