/**
 * Wave 24: Public Homeowner Review Page
 * Accessible at /review/:token -- no login required
 * Partners share this link after completing a job
 */
import ProLnkLogo from "@/components/ProLnkLogo";
import { useState } from "react";
import { useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, CheckCircle, AlertCircle, Loader2, Building2, MapPin } from "lucide-react";
import { toast } from "sonner";

function StarRating({
  value,
  onChange,
  label,
  size = "lg",
}: {
  value: number;
  onChange: (v: number) => void;
  label?: string;
  size?: "sm" | "lg";
}) {
  const [hovered, setHovered] = useState(0);
  const starSize = size === "lg" ? "w-8 h-8" : "w-5 h-5";
  return (
    <div className="space-y-1">
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`${starSize} ${
                star <= (hovered || value)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground/30"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

const RATING_LABELS: Record<number, string> = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Great",
  5: "Excellent",
};

export default function ReviewPage() {
  const { token } = useParams<{ token: string }>();
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [ratingPunctuality, setRatingPunctuality] = useState(0);
  const [ratingQuality, setRatingQuality] = useState(0);
  const [ratingCommunication, setRatingCommunication] = useState(0);
  const [ratingValue, setRatingValue] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [homeownerName, setHomeownerName] = useState("");

  const { data: request, isLoading, error } = trpc.reviews.getReviewRequest.useQuery(
    { token: token || "" },
    { enabled: !!token }
  );

  const submitMutation = trpc.reviews.submitViaReviewRequest.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        setSubmitted(true);
      } else {
        toast.error((data as any).error || "Failed to submit review");
      }
    },
    onError: () => toast.error("Something went wrong. Please try again."),
  });

  const handleSubmit = () => {
    if (!token) return;
    if (rating === 0) {
      toast.error("Please select an overall star rating");
      return;
    }
    submitMutation.mutate({
      token,
      rating,
      reviewText: reviewText.trim() || undefined,
      ratingPunctuality: ratingPunctuality || undefined,
      ratingQuality: ratingQuality || undefined,
      ratingCommunication: ratingCommunication || undefined,
      ratingValue: ratingValue || undefined,
      homeownerName: homeownerName.trim() || undefined,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#0A1628]" />
          <p className="text-muted-foreground text-sm">Loading review form...</p>
        </div>
      </div>
    );
  }

  if (!request || error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-10 pb-8 space-y-4">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
            <h2 className="text-xl font-bold">Review Link Not Found</h2>
            <p className="text-muted-foreground text-sm">
              This review link may have expired or already been used. Please contact the service provider for a new link.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-10 pb-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold">Thank You!</h2>
            <p className="text-muted-foreground">
              Your review for <strong>{request.businessName}</strong> has been submitted. It helps other homeowners find great service providers.
            </p>
            {rating >= 4 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
                <p className="font-medium mb-1">Love the service? Share it!</p>
                <p>Consider leaving a Google review to help {request.businessName} grow their business.</p>
              </div>
            )}
            <div className="flex justify-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-6 h-6 ${s <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/20"}`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-10 px-4">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <ProLnkLogo height={32} variant="light" className="shrink-0 mx-auto" />
          <p className="text-sm text-muted-foreground">Powered by ProLnk Partner Network</p>
        </div>

        {/* Partner Card */}
        <Card>
          <CardContent className="pt-6 pb-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#0A1628]/10 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-[#0A1628]" />
              </div>
              <div>
                <h2 className="text-lg font-bold">{request.businessName}</h2>
                <p className="text-sm text-muted-foreground">{request.businessType}</p>
                {request.serviceArea && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{request.serviceArea}</span>
                  </div>
                )}
                {request.serviceAddress && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Job: {request.serviceAddress}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Review Form */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">How was your experience?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overall Rating */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Overall Rating <span className="text-red-500">*</span></p>
              <StarRating value={rating} onChange={setRating} size="lg" />
              {rating > 0 && (
                <p className="text-sm font-medium text-[#0A1628]">{RATING_LABELS[rating]}</p>
              )}
            </div>

            {/* Sub-ratings */}
            <div className="grid grid-cols-2 gap-4">
              <StarRating value={ratingPunctuality} onChange={setRatingPunctuality} label="Punctuality" size="sm" />
              <StarRating value={ratingQuality} onChange={setRatingQuality} label="Work Quality" size="sm" />
              <StarRating value={ratingCommunication} onChange={setRatingCommunication} label="Communication" size="sm" />
              <StarRating value={ratingValue} onChange={setRatingValue} label="Value for Money" size="sm" />
            </div>

            {/* Review Text */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Write a Review (optional)</label>
              <Textarea
                placeholder="Tell others about your experience..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="resize-none"
                rows={4}
                maxLength={1000}
              />
              <p className="text-xs text-muted-foreground text-right">{reviewText.length}/1000</p>
            </div>

            {/* Homeowner Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Your Name (optional)</label>
              <Input
                placeholder="e.g. John D."
                value={homeownerName}
                onChange={(e) => setHomeownerName(e.target.value)}
                maxLength={100}
              />
            </div>

            <Button
              className="w-full bg-[#0A1628] hover:bg-[#0A1628] text-white"
              size="lg"
              onClick={handleSubmit}
              disabled={submitMutation.isPending || rating === 0}
            >
              {submitMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Your review will be visible on the partner's public profile. Thank you for your feedback!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
