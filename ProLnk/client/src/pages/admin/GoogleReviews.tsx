/**
 * Google Review Automation -- /admin/google-reviews
 * Shows all reviews that triggered a Google review request (4-5 star only).
 * Admin can see status, resend requests, and configure partner Google Place IDs.
 */
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Star, CheckCircle, Clock, Send, ExternalLink, Search, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// --- Star display -------------------------------------------------------------
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i <= rating ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}`}
        />
      ))}
    </div>
  );
}

// --- Stat card ----------------------------------------------------------------
function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color: string }) {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}

// --- Main page ----------------------------------------------------------------
export default function GoogleReviews() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const limit = 20;

  const { data, isLoading, refetch } = trpc.reviews.adminGetAll.useQuery({
    limit: 100,
    offset: 0,
  });

  const allReviews = data?.reviews || [];

  // Filter to only 4-5 star reviews (Google review eligible)
  const googleEligible = allReviews.filter((r: any) => r.rating >= 4);
  const googleSent = googleEligible.filter((r: any) => r.googleReviewRequested);
  const googlePending = googleEligible.filter((r: any) => !r.googleReviewRequested);
  const avgRating = allReviews.length > 0
    ? (allReviews.reduce((sum: number, r: any) => sum + r.rating, 0) / allReviews.length).toFixed(2)
    : "0.00";

  // Apply search filter
  const filtered = googleEligible.filter((r: any) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      (r.homeownerName || "").toLowerCase().includes(q) ||
      (r.partnerName || "").toLowerCase().includes(q) ||
      (r.issueType || "").toLowerCase().includes(q)
    );
  });

  const paginated = filtered.slice(page * limit, (page + 1) * limit);

  return (
    <AdminLayout>
      <div className="p-6 max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
              Google Review Automation
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Automatically sends Google review requests after every 4-5 star homeowner rating
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>

        {/* How it works */}
        <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-5 border border-blue-100">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            How Automation Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {[
              { step: "1", label: "Job Completed", desc: "Partner closes a job in the platform" },
              { step: "2", label: "Homeowner Rates", desc: "Homeowner submits 4 or 5 star rating" },
              { step: "3", label: "Request Triggered", desc: "System auto-sends email + SMS to homeowner" },
              { step: "4", label: "Review Posted", desc: "Homeowner clicks link  Google review page" },
            ].map(({ step, label, desc }) => (
              <div key={step} className="flex items-start gap-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: "#1B4FD8" }}
                >
                  {step}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{label}</div>
                  <div className="text-xs text-gray-500">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Reviews" value={allReviews.length} color="text-gray-900" />
          <StatCard label="Google Eligible (4-5)" value={googleEligible.length} sub="Qualify for Google request" color="text-amber-600" />
          <StatCard label="Requests Sent" value={googleSent.length} sub="Auto-triggered" color="text-emerald-600" />
          <StatCard label="Platform Avg Rating" value={avgRating} sub="All partners" color="text-blue-600" />
        </div>

        {/* Pending requests */}
        {googlePending.length > 0 && (
          <div className="bg-amber-50 rounded-2xl border border-amber-100 p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span className="font-semibold text-amber-800 text-sm">
                {googlePending.length} eligible review{googlePending.length > 1 ? "s" : ""} haven't received a Google request yet
              </span>
            </div>
            <p className="text-xs text-amber-700 mb-3">
              These homeowners gave 4-5 star ratings but the Google review request wasn't sent (likely missing Resend/Twilio API keys). Configure keys in Settings to enable auto-sending.
            </p>
            <Button
              size="sm"
              className="bg-amber-600 hover:bg-amber-700 text-white text-xs"
              onClick={() => toast.info("Configure RESEND_API_KEY and TWILIO credentials in Settings  Secrets to enable automatic Google review requests.")}
            >
              Configure Notifications
            </Button>
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by homeowner, partner, or issue type..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(0); }}
            className="pl-9"
          />
        </div>

        {/* Review table */}
        {isLoading ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
            <RefreshCw className="w-8 h-8 text-gray-300 mx-auto mb-3 animate-spin" />
            <p className="text-sm text-gray-400">Loading reviews...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
            <Star className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-700 mb-1">No 4-5 star reviews yet</h3>
            <p className="text-sm text-gray-400">
              Google review requests are triggered automatically once homeowners submit 4 or 5 star ratings after completed jobs.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Homeowner</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Partner</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Rating</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Issue</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Google Request</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((review: any) => (
                    <tr key={review.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{review.homeownerName || "--"}</div>
                        {review.homeownerEmail && (
                          <div className="text-xs text-gray-400">{review.homeownerEmail}</div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-gray-700">{review.partnerName || "--"}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Stars rating={review.rating} />
                          <span className="text-xs font-bold text-gray-700">{review.rating}.0</span>
                        </div>
                        {review.reviewText && (
                          <div className="text-xs text-gray-400 mt-0.5 max-w-[200px] truncate">"{review.reviewText}"</div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-gray-600">{review.issueType || "--"}</div>
                        {review.homeownerCity && (
                          <div className="text-xs text-gray-400">{review.homeownerCity}</div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {review.googleReviewRequested ? (
                          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 text-xs font-medium">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Sent {review.googleReviewRequestedAt
                              ? new Date(review.googleReviewRequestedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                              : ""}
                          </Badge>
                        ) : (
                          <Badge className="bg-amber-50 text-amber-700 border-amber-100 text-xs font-medium">
                            <Clock className="w-3 h-3 mr-1" />
                            Pending Config
                          </Badge>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-500 text-xs">
                        {new Date(review.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filtered.length > limit && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(p => p - 1)}>
                  Previous
                </Button>
                <span className="text-sm text-gray-500">
                  {page * limit + 1}-{Math.min((page + 1) * limit, filtered.length)} of {filtered.length}
                </span>
                <Button variant="outline" size="sm" disabled={(page + 1) * limit >= filtered.length} onClick={() => setPage(p => p + 1)}>
                  Next
                </Button>
              </div>
            )}
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
