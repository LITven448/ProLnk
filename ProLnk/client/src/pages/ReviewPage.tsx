import ProLnkLogo from "@/components/ProLnkLogo";
import { useState } from "react";
import { useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Star, CheckCircle, AlertCircle, Loader2, Building2, MapPin,
  Camera, ThumbsUp, ThumbsDown, Minus, Share2, ChevronRight,
  Eye,
} from "lucide-react";
import { toast } from "sonner";

type Recommend = "yes" | "no" | "maybe";

const RATING_LABELS: Record<number, string> = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Great",
  5: "Excellent!",
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  Quality: "How was the quality of the work?",
  Timeliness: "Did they arrive and finish on time?",
  Value: "Was it worth what you paid?",
  Communication: "How well did they communicate?",
};

function AnimatedStarRating({
  value,
  onChange,
  size = "lg",
}: {
  value: number;
  onChange: (v: number) => void;
  size?: "sm" | "lg";
}) {
  const [hovered, setHovered] = useState(0);
  const starSizeClass = size === "lg" ? "w-10 h-10" : "w-6 h-6";

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star => {
        const active = star <= (hovered || value);
        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className={`transition-all duration-150 ${active ? "scale-110" : "scale-100"} hover:scale-125 focus:outline-none`}
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          >
            <Star
              className={`${starSizeClass} transition-colors duration-150 ${
                active ? "fill-amber-400 text-amber-400" : "text-gray-300 fill-transparent"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

function CategoryRating({
  category,
  value,
  onChange,
}: {
  category: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      <div>
        <div className="text-sm font-medium text-gray-200">{category}</div>
        <div className="text-xs text-gray-500">{CATEGORY_DESCRIPTIONS[category]}</div>
      </div>
      <div className="flex items-center gap-3">
        <AnimatedStarRating value={value} onChange={onChange} size="sm" />
        {value > 0 && (
          <span className="text-xs font-medium text-amber-400">{RATING_LABELS[value]}</span>
        )}
      </div>
    </div>
  );
}

function RecommendButton({
  type,
  selected,
  onClick,
}: {
  type: Recommend;
  selected: boolean;
  onClick: () => void;
}) {
  const config = {
    yes: { icon: <ThumbsUp className="w-4 h-4" />, label: "Yes", color: selected ? "bg-teal-600 border-teal-500 text-white" : "border-gray-600 text-gray-400 hover:border-teal-500 hover:text-teal-400" },
    no: { icon: <ThumbsDown className="w-4 h-4" />, label: "No", color: selected ? "bg-red-600 border-red-500 text-white" : "border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-400" },
    maybe: { icon: <Minus className="w-4 h-4" />, label: "Maybe", color: selected ? "bg-amber-600 border-amber-500 text-white" : "border-gray-600 text-gray-400 hover:border-amber-500 hover:text-amber-400" },
  }[type];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-150 text-sm font-medium ${config.color}`}
    >
      {config.icon}
      {config.label}
    </button>
  );
}

export default function ReviewPage() {
  const { token } = useParams<{ token: string }>();
  const [submitted, setSubmitted] = useState(false);
  const [previewing, setPreviewing] = useState(false);

  const [rating, setRating] = useState(0);
  const [ratingQuality, setRatingQuality] = useState(0);
  const [ratingTimeliness, setRatingTimeliness] = useState(0);
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingCommunication, setRatingCommunication] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [homeownerName, setHomeownerName] = useState("");
  const [recommend, setRecommend] = useState<Recommend | null>(null);

  const { data: request, isLoading, error } = trpc.reviews.getReviewRequest.useQuery(
    { token: token || "" },
    { enabled: !!token }
  );

  const submitMutation = trpc.reviews.submitViaReviewRequest.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        setSubmitted(true);
      } else {
        toast.error(("error" in data && data.error) || "Failed to submit review");
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
      ratingPunctuality: ratingTimeliness || undefined,
      ratingQuality: ratingQuality || undefined,
      ratingCommunication: ratingCommunication || undefined,
      ratingValue: ratingValue || undefined,
      homeownerName: homeownerName.trim() || undefined,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-teal-400" />
          <p className="text-gray-400 text-sm">Loading review form...</p>
        </div>
      </div>
    );
  }

  if (!request || error) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center bg-[#0d1f3c] border border-gray-700 rounded-2xl p-10 space-y-4">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">Review Link Not Found</h2>
          <p className="text-gray-400 text-sm">
            This review link may have expired or already been used. Contact the service provider for a new link.
          </p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center bg-[#0d1f3c] border border-gray-700 rounded-2xl p-10 space-y-5">
          <div className="w-16 h-16 rounded-full bg-teal-500/20 flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-teal-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Thank You!</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your review for <strong className="text-white">{request.businessName}</strong> has been submitted.
            It helps other homeowners find great service providers.
          </p>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map(s => (
              <Star key={s} className={`w-7 h-7 transition-all ${s <= rating ? "fill-amber-400 text-amber-400" : "text-gray-700 fill-gray-700"}`} />
            ))}
          </div>
          {rating >= 4 && (
            <div className="bg-[#0d2b1f] border border-teal-500/30 rounded-xl p-4 text-sm text-gray-300 text-left">
              <div className="font-semibold text-teal-300 mb-1">Love the service? Share it!</div>
              <p className="text-gray-400 text-xs">Consider leaving a Google review to help {request.businessName} reach more homeowners.</p>
            </div>
          )}
          <Button
            className="w-full bg-[#1e3a5f] text-gray-300 hover:text-white hover:bg-[#243f6a] border border-gray-600"
            variant="outline"
            onClick={() => {
              const text = `I just left a review for ${request.businessName} on ProLnk! Great service. ⭐`.repeat(1);
              navigator.clipboard.writeText(text);
              toast.success("Review text copied — share it!");
            }}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Your Review
          </Button>
        </div>
      </div>
    );
  }

  if (previewing) {
    return (
      <div className="min-h-screen bg-[#0A1628] py-10 px-4">
        <div className="max-w-lg mx-auto space-y-5">
          <div className="text-center space-y-2">
            <ProLnkLogo height={32} variant="light" className="mx-auto" />
          </div>

          <div className="bg-[#0d1f3c] border border-teal-500/40 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-teal-400 text-sm font-semibold">
              <Eye className="w-4 h-4" />
              Preview Your Review
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-white">{request.businessName}</div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} className={`w-4 h-4 ${s <= rating ? "fill-amber-400 text-amber-400" : "text-gray-600"}`} />
                ))}
              </div>
            </div>

            {homeownerName && <div className="text-xs text-gray-400">By {homeownerName}</div>}

            {reviewText && (
              <p className="text-sm text-gray-300 border-l-2 border-teal-500/40 pl-3 italic">"{reviewText}"</p>
            )}

            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Quality", value: ratingQuality },
                { label: "Timeliness", value: ratingTimeliness },
                { label: "Value", value: ratingValue },
                { label: "Communication", value: ratingCommunication },
              ].filter(c => c.value > 0).map(({ label, value }) => (
                <div key={label} className="bg-[#0a1628] rounded-lg p-2">
                  <div className="text-xs text-gray-500">{label}</div>
                  <div className="flex gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} className={`w-3 h-3 ${s <= value ? "fill-amber-400 text-amber-400" : "text-gray-700"}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {recommend && (
              <div className="text-xs text-gray-400">
                Would recommend: <span className={`font-medium ${recommend === "yes" ? "text-teal-400" : recommend === "no" ? "text-red-400" : "text-amber-400"}`}>{recommend.charAt(0).toUpperCase() + recommend.slice(1)}</span>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-gray-600 text-gray-400 hover:text-white bg-transparent"
              onClick={() => setPreviewing(false)}
            >
              Edit Review
            </Button>
            <Button
              className="flex-1 bg-teal-600 hover:bg-teal-500 text-white"
              onClick={handleSubmit}
              disabled={submitMutation.isPending}
            >
              {submitMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Confirm & Submit
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1628] py-10 px-4">
      <div className="max-w-lg mx-auto space-y-5">

        {/* Header */}
        <div className="text-center space-y-2">
          <ProLnkLogo height={32} variant="light" className="shrink-0 mx-auto" />
          <p className="text-xs text-gray-500">Powered by ProLnk Partner Network</p>
        </div>

        {/* Partner card */}
        <div className="bg-[#0d1f3c] rounded-2xl border border-gray-700 p-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{request.businessName}</h2>
              <p className="text-sm text-gray-400">{request.businessType}</p>
              {request.serviceArea && (
                <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                  <MapPin className="w-3 h-3" />
                  <span>{request.serviceArea}</span>
                </div>
              )}
              {request.serviceAddress && (
                <p className="text-xs text-gray-500 mt-0.5">Job: {request.serviceAddress}</p>
              )}
            </div>
          </div>
        </div>

        {/* Review form */}
        <div className="bg-[#0d1f3c] rounded-2xl border border-gray-700 p-5 space-y-6">

          {/* Overall rating */}
          <div className="space-y-3">
            <div className="text-sm font-semibold text-white">
              Overall Rating <span className="text-red-400">*</span>
            </div>
            <AnimatedStarRating value={rating} onChange={setRating} size="lg" />
            {rating > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-amber-400">{RATING_LABELS[rating]}</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className={`w-3 h-3 ${s <= rating ? "fill-amber-400 text-amber-400" : "text-gray-700"}`} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Category ratings */}
          <div className="space-y-4 pt-1 border-t border-gray-700">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Category Ratings (optional)</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <CategoryRating category="Quality" value={ratingQuality} onChange={setRatingQuality} />
              <CategoryRating category="Timeliness" value={ratingTimeliness} onChange={setRatingTimeliness} />
              <CategoryRating category="Value" value={ratingValue} onChange={setRatingValue} />
              <CategoryRating category="Communication" value={ratingCommunication} onChange={setRatingCommunication} />
            </div>
          </div>

          {/* Review text */}
          <div className="space-y-1.5 pt-1 border-t border-gray-700">
            <label className="text-sm font-medium text-white">Write a Review <span className="text-gray-500 font-normal">(optional)</span></label>
            <Textarea
              placeholder="Tell others about your experience — what went well, what stood out..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="bg-[#0a1628] border-gray-600 text-white placeholder:text-gray-600 resize-none"
              rows={4}
              maxLength={1000}
            />
            <p className="text-xs text-gray-600 text-right">{reviewText.length}/1000</p>
          </div>

          {/* Recommend */}
          <div className="space-y-2 pt-1 border-t border-gray-700">
            <label className="text-sm font-medium text-white">Would you recommend this pro? <span className="text-gray-500 font-normal">(optional)</span></label>
            <div className="flex gap-2">
              {(["yes", "no", "maybe"] as Recommend[]).map(r => (
                <RecommendButton
                  key={r}
                  type={r}
                  selected={recommend === r}
                  onClick={() => setRecommend(recommend === r ? null : r)}
                />
              ))}
            </div>
          </div>

          {/* Photo upload placeholder */}
          <div className="space-y-1.5 pt-1 border-t border-gray-700">
            <label className="text-sm font-medium text-white">Add Photos <span className="text-gray-500 font-normal">(optional)</span></label>
            <button
              type="button"
              onClick={() => toast.info("Photo upload coming soon!")}
              className="w-full border-2 border-dashed border-gray-700 rounded-xl p-5 text-center hover:border-teal-500/50 hover:bg-teal-500/5 transition-all group"
            >
              <Camera className="w-8 h-8 text-gray-600 group-hover:text-teal-500 mx-auto mb-2 transition-colors" />
              <div className="text-sm text-gray-500 group-hover:text-gray-400">Tap to add photos of the work</div>
              <div className="text-xs text-gray-600 mt-0.5">Supports JPG, PNG up to 5MB each</div>
            </button>
          </div>

          {/* Name */}
          <div className="space-y-1.5 pt-1 border-t border-gray-700">
            <label className="text-sm font-medium text-white">Your Name <span className="text-gray-500 font-normal">(optional)</span></label>
            <Input
              placeholder="e.g. Sarah M."
              value={homeownerName}
              onChange={(e) => setHomeownerName(e.target.value)}
              maxLength={100}
              className="bg-[#0a1628] border-gray-600 text-white placeholder:text-gray-600"
            />
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-1">
            <Button
              variant="outline"
              className="flex-1 border-gray-600 text-gray-400 hover:text-white bg-transparent"
              onClick={() => {
                if (rating === 0) { toast.error("Select an overall rating first"); return; }
                setPreviewing(true);
              }}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button
              className="flex-1 bg-teal-600 hover:bg-teal-500 text-white"
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
                <>
                  Submit Review
                  <ChevronRight className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          </div>

          <p className="text-xs text-center text-gray-600">
            Your review will be visible on the partner's public profile. Thank you for your feedback!
          </p>
        </div>
      </div>
    </div>
  );
}
