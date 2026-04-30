/**
 * Partner Reviews -- /dashboard/reviews
 * Uber-style bidirectional rating dashboard for partners.
 * Shows homeowner reviews received, aggregate scores, and Google review status.
 * Wave 24: Added "Request a Review" button to generate shareable token links.
 */
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Star, Award, CheckCircle, Send, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

// --- Star display -------------------------------------------------------------
function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}
        />
      ))}
    </div>
  );
}

// --- Sub-rating bar -----------------------------------------------------------
function SubRatingBar({ label, value }: { label: string; value: number | null }) {
  if (!value) return null;
  const pct = (value / 5) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-500 w-28 flex-shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: pct >= 80 ? "#10B981" : pct >= 60 ? "#F59E0B" : "#EF4444" }}
        />
      </div>
      <span className="text-xs font-semibold text-gray-700 w-6 text-right">{value.toFixed(1)}</span>
    </div>
  );
}

// --- Review card --------------------------------------------------------------
function ReviewCard({ review }: { review: any }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
            style={{ backgroundColor: "#1B4FD8" }}
          >
            {(review.homeownerName || "H")[0].toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-sm">
              {review.homeownerName || "Verified Homeowner"}
            </div>
            <div className="text-xs text-gray-400">
              {review.issueType && <span>{review.issueType}  </span>}
              {review.homeownerCity && <span>{review.homeownerCity}  </span>}
              {new Date(review.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Stars rating={review.rating} size={14} />
          {review.googleReviewRequested && (
            <Badge className="text-xs bg-emerald-50 text-emerald-700 border-emerald-100 font-medium">
              <CheckCircle className="w-3 h-3 mr-1" />
              Google Sent
            </Badge>
          )}
        </div>
      </div>

      {review.reviewText && (
        <p className="text-sm text-gray-700 leading-relaxed border-l-2 border-slate-100 pl-3">
          "{review.reviewText}"
        </p>
      )}

      {(review.ratingPunctuality || review.ratingQuality || review.ratingCommunication || review.ratingValue) && (
        <div className="space-y-1.5 pt-1">
          <SubRatingBar label="Punctuality" value={review.ratingPunctuality} />
          <SubRatingBar label="Quality" value={review.ratingQuality} />
          <SubRatingBar label="Communication" value={review.ratingCommunication} />
          <SubRatingBar label="Value" value={review.ratingValue} />
        </div>
      )}
    </div>
  );
}

// --- Score ring ---------------------------------------------------------------
function ScoreRing({ score, label, color }: { score: number; label: string; color: string }) {
  const pct = (score / 5) * 100;
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 88 88" className="w-full h-full -rotate-90">
          <circle cx="44" cy="44" r={r} fill="none" stroke="#F1F5F9" strokeWidth="8" />
          <circle
            cx="44" cy="44" r={r} fill="none"
            stroke={color} strokeWidth="8"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">{score > 0 ? score.toFixed(1) : "--"}</span>
          <span className="text-xs text-gray-400">/ 5</span>
        </div>
      </div>
      <span className="text-xs font-medium text-gray-600">{label}</span>
    </div>
  );
}

// --- Main page ----------------------------------------------------------------
export default function PartnerReviews() {
  const [page, setPage] = useState(0);
  const limit = 10;

  const { data: myProfile } = trpc.partners.getMyProfile.useQuery();
  const googleReviewUrl = (myProfile as any)?.googleReviewUrl;

  const { data, isLoading } = trpc.reviews.getMyReviews.useQuery({
    limit,
    offset: page * limit,
  });

  const reviews = data?.reviews || [];
  const total = data?.total || 0;
  const avgRating = data?.avgRating || 0;

  // Compute sub-rating averages from loaded reviews
  const subAvg = (key: string) => {
    const vals = reviews.filter((r: any) => r[key]).map((r: any) => r[key]);
    return vals.length > 0 ? vals.reduce((a: number, b: number) => a + b, 0) / vals.length : 0;
  };

  const fiveStarCount = reviews.filter((r: any) => r.rating === 5).length;
  const fourStarCount = reviews.filter((r: any) => r.rating === 4).length;
  const googleSentCount = reviews.filter((r: any) => r.googleReviewRequested).length;

  // Review Request state (Wave 24)
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [reqName, setReqName] = useState("");
  const [reqEmail, setReqEmail] = useState("");
  const [reqPhone, setReqPhone] = useState("");
  const [reqAddress, setReqAddress] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

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
    toast.success("Review link copied to clipboard!");
  };

  const resetModal = () => {
    setGeneratedLink("");
    setReqName("");
    setReqEmail("");
    setReqPhone("");
    setReqAddress("");
    setShowRequestModal(false);
  };

  return (
    <PartnerLayout>
      <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
              My Reviews
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Homeowner ratings from completed jobs -- these feed your Trust Score and Google reviews
            </p>
          </div>
          <Button
            size="sm"
            className="bg-[#0A1628] hover:bg-[#0A1628] text-white shrink-0"
            onClick={() => { setGeneratedLink(""); setShowRequestModal(true); }}
          >
            <Send className="w-3.5 h-3.5 mr-1.5" />
            Request a Review
          </Button>
        </div>

        {/* Score overview */}
        {isLoading ? (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 h-40 animate-pulse" />
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex flex-wrap items-center justify-around gap-6">
              <ScoreRing score={avgRating} label="Overall Rating" color="#F59E0B" />
              <ScoreRing score={subAvg("ratingQuality")} label="Quality" color="#1B4FD8" />
              <ScoreRing score={subAvg("ratingPunctuality")} label="Punctuality" color="#8B5CF6" />
              <ScoreRing score={subAvg("ratingCommunication")} label="Communication" color="#10B981" />
              <ScoreRing score={subAvg("ratingValue")} label="Value" color="#F97316" />
            </div>

            <div className="mt-6 pt-5 border-t border-slate-50 flex flex-wrap gap-4 justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{total}</div>
                <div className="text-xs text-gray-400">Total Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-500">{fiveStarCount}</div>
                <div className="text-xs text-gray-400">5-Star Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{googleSentCount}</div>
                <div className="text-xs text-gray-400">Google Requests Sent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {total > 0 ? Math.round(((fiveStarCount + fourStarCount) / total) * 100) : 0}%
                </div>
                <div className="text-xs text-gray-400">4-5 Star Rate</div>
              </div>
            </div>
          </div>
        )}

        {/* Google Review CTA */}
        {avgRating >= 4 && total >= 3 && (
          <div
            className="rounded-2xl p-4 flex items-center gap-4"
            style={{ background: "linear-gradient(135deg, #EFF6FF 0%, #F0FDF4 100%)", border: "1px solid #BFDBFE" }}
          >
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5 text-amber-500" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900 text-sm">Your ratings qualify for Google Review automation</div>
              <div className="text-xs text-gray-500 mt-0.5">
                Every 4-5 star review automatically triggers a Google review request to the homeowner
              </div>
            </div>
            <Button
              size="sm"
              className="text-white text-xs flex-shrink-0"
              style={{ backgroundColor: "#1B4FD8" }}
              onClick={() => toast.info("Google Review automation is active -- requests are sent automatically after 4-5 star ratings.")}
            >
              <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
              Active
            </Button>
          </div>
        )}

        {/* Review list */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 h-32 animate-pulse" />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center">
            <Star className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-700 mb-1">No reviews yet</h3>
            <p className="text-sm text-gray-400 mb-4">
              Reviews appear here after homeowners rate completed jobs. Use the "Request a Review" button to collect your first rating.
            </p>
            <Button
              size="sm"
              className="bg-[#0A1628] hover:bg-[#0A1628] text-white"
              onClick={() => { setGeneratedLink(""); setShowRequestModal(true); }}
            >
              <Send className="w-3.5 h-3.5 mr-1.5" />
              Request a Review
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review: any) => (
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
            >
              Next
            </Button>
          </div>
        )}

      </div>

      {/* Review Request Modal */}
      <Dialog open={showRequestModal} onOpenChange={(open) => { if (!open) resetModal(); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="w-4 h-4 text-[#0A1628]" />
              Request a Review
            </DialogTitle>
          </DialogHeader>

          {!generatedLink ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Generate a shareable link to send to a homeowner after completing a job. They can leave a star rating without creating an account.
              </p>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Homeowner Name (optional)</label>
                  <Input
                    placeholder="e.g. Sarah Johnson"
                    value={reqName}
                    onChange={(e) => setReqName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Email (optional)</label>
                  <Input
                    type="email"
                    placeholder="homeowner@email.com"
                    value={reqEmail}
                    onChange={(e) => setReqEmail(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Phone (optional)</label>
                  <Input
                    placeholder="(555) 000-0000"
                    value={reqPhone}
                    onChange={(e) => setReqPhone(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Job Address (optional)</label>
                  <Input
                    placeholder="123 Main St, Dallas TX"
                    value={reqAddress}
                    onChange={(e) => setReqAddress(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              {googleReviewUrl && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-blue-800">Google Review link will be included</p>
                    <p className="text-xs text-blue-600 mt-0.5 truncate max-w-xs">{googleReviewUrl}</p>
                  </div>
                </div>
              )}
              {!googleReviewUrl && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                  <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-amber-800">Add your Google Review URL to boost conversions</p>
                    <p className="text-xs text-amber-600 mt-0.5">Go to Profile Settings to add your Google Business review link.</p>
                  </div>
                </div>
              )}
              <Button
                className="w-full bg-[#0A1628] hover:bg-[#0A1628] text-white"
                onClick={handleCreateRequest}
                disabled={createRequestMutation.isPending}
              >
                {createRequestMutation.isPending ? "Generating..." : "Generate Review Link"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                <p className="text-sm text-green-800 font-medium">Review link created!</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Share this link with your homeowner via text, email, or any messaging app. It expires in 30 days.
              </p>
              <div className="flex gap-2">
                <Input value={generatedLink} readOnly className="text-xs font-mono" />
                <Button variant="outline" size="icon" onClick={copyLink}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    const msg = `Hi${reqName ? ` ${reqName}` : ""}! Thank you for choosing us. We'd love your feedback -- it only takes 30 seconds: ${generatedLink}`;
                    const encoded = encodeURIComponent(msg);
                    window.open(`sms:${reqPhone ? reqPhone.replace(/\D/g, "") : ""}?body=${encoded}`, "_blank");
                  }}
                >
                  Send via SMS
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    const subject = encodeURIComponent("We'd love your feedback!");
                    const body = encodeURIComponent(`Hi${reqName ? ` ${reqName}` : ""},\n\nThank you for choosing us! We'd love to hear about your experience.\n\nLeave a quick review here: ${generatedLink}\n\nIt only takes 30 seconds and means a lot to our team.\n\nThank you!`);
                    window.open(`mailto:${reqEmail || ""}?subject=${subject}&body=${body}`, "_blank");
                  }}
                >
                  Send via Email
                </Button>
              </div>
              <Button className="w-full" variant="outline" onClick={resetModal}>
                Done
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PartnerLayout>
  );
}
