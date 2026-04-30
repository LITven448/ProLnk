import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";
import { Star, PenLine } from "lucide-react";

function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <Star
          key={n}
          className={`h-5 w-5 cursor-pointer transition-colors ${n <= value ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
          onClick={() => onChange?.(n)}
        />
      ))}
    </div>
  );
}

export default function HomeownerReviews() {
  const { data: reviews, isLoading, refetch } = trpc.homeowner.getMyReviews.useQuery();
  const submitReview = trpc.homeowner.submitDirectReview.useMutation({
    onSuccess: () => { toast.success("Review submitted!"); setWriting(null); refetch(); },
    onError: (err) => toast.error(err.message),
  });
  const { data: deals } = trpc.homeowner.getMyDeals.useQuery();

  const [writing, setWriting] = useState<number | null>(null);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  const completedDeals = (deals ?? []).filter((d: any) => d.status === "completed");
  const reviewedDealIds = new Set((reviews ?? []).map((r: any) => r.dealId));
  const unreviewedDeals = completedDeals.filter((d: any) => !reviewedDealIds.has(d.id));

  return (
    <HomeownerLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">My Reviews</h1>
          <p className="text-muted-foreground">Your feedback helps other homeowners find great pros</p>
        </div>

        {unreviewedDeals.length > 0 && (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader><CardTitle className="text-blue-700 text-base">Leave a Review</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {unreviewedDeals.map((deal: any) => (
                <div key={deal.id}>
                  {writing === deal.id ? (
                    <div className="space-y-3 border rounded-lg p-4 bg-white">
                      <div className="font-medium">{deal.partnerName} — {deal.serviceType}</div>
                      <StarRating value={rating} onChange={setRating} />
                      <Textarea placeholder="Share your experience…" value={text} onChange={e => setText(e.target.value)} rows={3} />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          disabled={!text || submitReview.isPending}
                          onClick={() => submitReview.mutate({ dealId: deal.id, partnerId: deal.partnerId, rating, reviewText: text, ratingQuality: rating, ratingCommunication: rating, ratingPunctuality: rating, ratingValue: rating })}
                        >
                          {submitReview.isPending ? "Submitting…" : "Submit Review"}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setWriting(null)}>Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between border rounded-lg p-3 bg-white">
                      <div>
                        <div className="font-medium">{deal.partnerName}</div>
                        <div className="text-sm text-muted-foreground">{deal.serviceType}</div>
                      </div>
                      <Button size="sm" variant="outline" className="gap-1" onClick={() => { setWriting(deal.id); setRating(5); setText(""); }}>
                        <PenLine className="h-3 w-3" /> Write Review
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader><CardTitle>My Reviews ({(reviews ?? []).length})</CardTitle></CardHeader>
          <CardContent>
            {isLoading && <div className="py-8 text-center text-muted-foreground">Loading…</div>}
            {!isLoading && (reviews ?? []).length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                <Star className="h-12 w-12 mx-auto opacity-20 mb-3" />
                <div>No reviews yet. Complete a job to leave your first review.</div>
              </div>
            )}
            <div className="space-y-4">
              {(reviews ?? []).map((r: any) => (
                <div key={r.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-semibold">{r.partnerName ?? "Pro"}</div>
                      <div className="text-sm text-muted-foreground">{r.serviceType}</div>
                    </div>
                    <div className="text-right">
                      <StarRating value={r.rating} />
                      <div className="text-xs text-muted-foreground mt-1">{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ""}</div>
                    </div>
                  </div>
                  {r.reviewText && <p className="text-sm text-muted-foreground italic">"{r.reviewText}"</p>}
                  {r.partnerResponse && (
                    <div className="mt-3 pl-3 border-l-2 border-blue-200">
                      <div className="text-xs font-medium text-blue-700 mb-1">Pro Response:</div>
                      <p className="text-sm text-muted-foreground">{r.partnerResponse}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </HomeownerLayout>
  );
}
