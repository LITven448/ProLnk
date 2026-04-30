import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, MessageSquare, ThumbsUp, ThumbsDown, Send, TrendingUp, Award, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const STARS = [5, 4, 3, 2, 1];

export default function ReviewManagement() {
  const [replies, setReplies] = useState<Record<number, string>>({});
  const [filter, setFilter] = useState<number | null>(null);

  const utils = trpc.useUtils();
  const { data: rawReviews = [], isLoading } = trpc.partners.getPartnerReceivedReviews.useQuery();
  const replyMutation = trpc.partners.replyToReview.useMutation({
    onSuccess: () => {
      toast.success("Reply posted!");
      utils.partners.getPartnerReceivedReviews.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  // Normalise to the shape the UI expects
  const REVIEWS = rawReviews.map(r => ({
    id: r.id,
    homeowner: r.homeownerEmail ? r.homeownerEmail.split("@")[0] : "Homeowner",
    rating: r.rating,
    date: new Date(r.createdAt).toLocaleDateString(),
    text: r.reviewText,
    job: r.serviceType || "Service",
    replied: !!r.replyText,
    reply: r.replyText ?? undefined,
  }));

  const avgRating = REVIEWS.length ? (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1) : "—";
  const fiveStarCount = REVIEWS.filter(r => r.rating === 5).length;

  const sendReply = (id: number) => {
    if (!replies[id]?.trim()) { toast.error("Write a reply first"); return; }
    replyMutation.mutate({ reviewId: id, replyText: replies[id].trim() });
    setReplies(prev => ({ ...prev, [id]: "" }));
  };

  const filtered = filter ? REVIEWS.filter(r => r.rating === filter) : REVIEWS;

  return (

    <PartnerLayout>

    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Review Management</h1>
          <p className="text-slate-500 mt-1">Respond to homeowner reviews and protect your reputation</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-4 text-center">
              <div className="text-3xl font-bold text-amber-500">{avgRating}</div>
              <div className="flex justify-center mt-1">{[1,2,3,4,5].map(i => <Star key={i} className={`w-4 h-4 ${i <= Math.round(parseFloat(avgRating)) ? "text-amber-400 fill-amber-400" : "text-slate-200"}`} />)}</div>
              <div className="text-xs text-slate-500 mt-1">Average Rating</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <div className="text-3xl font-bold text-green-600">{fiveStarCount}</div>
              <div className="text-xs text-slate-500 mt-1">5-Star Reviews</div>
              <div className="text-xs text-green-600">{Math.round((fiveStarCount / REVIEWS.length) * 100)}% of total</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <div className="text-3xl font-bold">{REVIEWS.filter(r => !r.replied).length}</div>
              <div className="text-xs text-slate-500 mt-1">Awaiting Reply</div>
              <div className="text-xs text-amber-600">Respond within 48h</div>
            </CardContent>
          </Card>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <button
            onClick={() => setFilter(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${!filter ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-200"}`}
          >
            All ({REVIEWS.length})
          </button>
          {STARS.map(s => (
            <button
              key={s}
              onClick={() => setFilter(filter === s ? null : s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${filter === s ? "bg-amber-500 text-white border-amber-500" : "bg-white text-slate-600 border-slate-200"}`}
            >
              {"★".repeat(s)} ({REVIEWS.filter(r => r.rating === s).length})
            </button>
          ))}
        </div>

        {/* Reviews */}
        <div className="space-y-4">
          {filtered.map(review => (
            <Card key={review.id} className={review.rating <= 3 ? "border-amber-200" : ""}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-semibold text-slate-900">{review.homeowner}</div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <div className="flex">{[1,2,3,4,5].map(i => <Star key={i} className={`w-3 h-3 ${i <= review.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"}`} />)}</div>
                      <span>{review.date}</span>
                      <Badge className="text-xs bg-slate-100 text-slate-500">{review.job}</Badge>
                    </div>
                  </div>
                  {!review.replied && (
                    <Badge className="text-xs bg-amber-100 text-amber-700">Needs Reply</Badge>
                  )}
                </div>

                <p className="text-sm text-slate-700 mb-3">"{review.text}"</p>

                {/* Existing Reply */}
                {review.replied && review.reply && (
                  <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 mb-3">
                    <div className="text-xs font-medium text-indigo-600 mb-1">Your Reply:</div>
                    <div className="text-sm text-indigo-800">{review.reply}</div>
                  </div>
                )}

                {/* Reply Form */}
                {!review.replied && (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Write a professional reply..."
                      value={replies[review.id] || ""}
                      onChange={e => setReplies(prev => ({ ...prev, [review.id]: e.target.value }))}
                      className="text-sm"
                    />
                    <Button size="sm" onClick={() => sendReply(review.id)} className="bg-indigo-600 hover:bg-indigo-700">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                {/* Low rating tip */}
                {review.rating <= 3 && (
                  <div className="mt-3 p-2 bg-amber-50 rounded-lg text-xs text-amber-700">
                    💡 Tip: Acknowledge the issue, apologize briefly, and offer to make it right. Don't get defensive.
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>

    </PartnerLayout>

  );
}
