import { useState } from "react";
import { useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle, Clock, AlertCircle, ThumbsUp, ThumbsDown, Minus } from "lucide-react";

export default function NpsSurvey() {
  const [, params] = useRoute("/survey/:token");
  const token = params?.token ?? "";

  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [followUpOk, setFollowUpOk] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState<string | null>(null);

  const { data: survey, isLoading, error } = trpc.homeowner.getNpsSurveyByToken.useQuery(
    { token },
    { enabled: !!token, retry: false }
  );

  const submitMutation = trpc.homeowner.submitNpsSurvey.useMutation({
    onSuccess: (data) => {
      setSubmitted(true);
      setCategory(data.category);
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading your survey…</p>
        </div>
      </div>
    );
  }

  if (error || !survey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="bg-slate-800 border-slate-700 max-w-md w-full text-center p-8">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Survey Not Found</h2>
          <p className="text-slate-400">This survey link is invalid or has been removed.</p>
        </Card>
      </div>
    );
  }

  if (survey.expired) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="bg-slate-800 border-slate-700 max-w-md w-full text-center p-8">
          <Clock className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Survey Expired</h2>
          <p className="text-slate-400">This survey link has expired. Thank you for your business!</p>
        </Card>
      </div>
    );
  }

  if (submitted || survey.completed) {
    const cat = category ?? survey.category;
    const isPromoter = cat === "promoter";
    const isDetractor = cat === "detractor";
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="bg-slate-800 border-slate-700 max-w-md w-full text-center p-8">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            isPromoter ? "bg-teal-500/20" : isDetractor ? "bg-red-500/20" : "bg-amber-500/20"
          }`}>
            {isPromoter ? (
              <ThumbsUp className="w-8 h-8 text-teal-400" />
            ) : isDetractor ? (
              <ThumbsDown className="w-8 h-8 text-red-400" />
            ) : (
              <Minus className="w-8 h-8 text-amber-400" />
            )}
          </div>
          <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-white mb-2">Thank You!</h2>
          <p className="text-slate-400 mb-4">
            {isPromoter
              ? "We're thrilled you had a great experience! Your feedback helps us grow."
              : isDetractor
              ? "We're sorry to hear that. Your feedback helps us improve."
              : "Thank you for your honest feedback. We'll use it to improve our service."}
          </p>
          {isPromoter && (
            <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-4 text-left">
              <p className="text-teal-300 text-sm font-medium mb-1">⭐ Leave a Google Review</p>
              <p className="text-slate-400 text-sm">Help other homeowners find trusted professionals by leaving a quick Google review for {survey.businessName}.</p>
            </div>
          )}
        </Card>
      </div>
    );
  }

  const npsColors = (score: number) => {
    if (score <= 6) return "bg-red-500 hover:bg-red-400 text-white";
    if (score <= 8) return "bg-amber-500 hover:bg-amber-400 text-white";
    return "bg-teal-500 hover:bg-teal-400 text-white";
  };

  const npsLabel = selectedScore === null ? null
    : selectedScore <= 6 ? { text: "Detractor", color: "text-red-400", icon: <ThumbsDown className="w-4 h-4" /> }
    : selectedScore <= 8 ? { text: "Passive", color: "text-amber-400", icon: <Minus className="w-4 h-4" /> }
    : { text: "Promoter", color: "text-teal-400", icon: <ThumbsUp className="w-4 h-4" /> };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-4 py-1.5 mb-4">
            <Star className="w-4 h-4 text-teal-400" />
            <span className="text-teal-300 text-sm font-medium">Service Feedback</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">How did we do?</h1>
          <p className="text-slate-400 text-sm">Your feedback helps us improve and helps other homeowners find trusted pros.</p>
        </div>

        {/* Partner card */}
        <Card className="bg-slate-800/60 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold text-lg">
                {survey.businessName?.[0] ?? "P"}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{survey.businessName}</p>
                <p className="text-slate-400 text-xs">{survey.businessType} · {survey.serviceArea}</p>
              </div>
              {survey.rating > 0 && (
                <div className="ml-auto flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-white text-sm font-medium">{Number(survey.rating).toFixed(1)}</span>
                  <span className="text-slate-500 text-xs">({survey.reviewCount})</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* NPS Score */}
        <Card className="bg-slate-800/60 border-slate-700">
          <CardContent className="p-6">
            <p className="text-white font-semibold mb-1 text-center">
              How likely are you to recommend this service to a friend or neighbor?
            </p>
            <p className="text-slate-500 text-xs text-center mb-5">0 = Not at all likely · 10 = Extremely likely</p>

            <div className="grid grid-cols-11 gap-1.5 mb-3">
              {Array.from({ length: 11 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedScore(i)}
                  className={`h-10 rounded-lg text-sm font-bold transition-all ${
                    selectedScore === i
                      ? `${npsColors(i)} ring-2 ring-white scale-110`
                      : selectedScore !== null
                      ? "bg-slate-700 text-slate-400 hover:bg-slate-600"
                      : `${npsColors(i)} opacity-70`
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>

            {npsLabel && (
              <div className={`flex items-center justify-center gap-1.5 ${npsLabel.color} text-sm font-medium`}>
                {npsLabel.icon}
                <span>{npsLabel.text}</span>
                <Badge variant="outline" className="text-xs border-current ml-1">Score: {selectedScore}</Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Comment */}
        {selectedScore !== null && (
          <Card className="bg-slate-800/60 border-slate-700">
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="text-white text-sm font-medium block mb-2">
                  {selectedScore >= 9
                    ? "What did you love most about the service?"
                    : selectedScore >= 7
                    ? "What could we improve?"
                    : "What went wrong? We want to make it right."}
                </label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience…"
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-500 resize-none"
                  rows={3}
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={followUpOk}
                  onChange={(e) => setFollowUpOk(e.target.checked)}
                  className="mt-0.5 accent-teal-500"
                />
                <span className="text-slate-400 text-sm">
                  I'm okay with being contacted for follow-up about my feedback.
                </span>
              </label>

              <Button
                onClick={() => submitMutation.mutate({ token, score: selectedScore, comment: comment || undefined, followUpOk })}
                disabled={submitMutation.isPending}
                className="w-full bg-teal-600 hover:bg-teal-500 text-white"
              >
                {submitMutation.isPending ? "Submitting…" : "Submit Feedback"}
              </Button>
            </CardContent>
          </Card>
        )}

        <p className="text-center text-slate-600 text-xs">
          Powered by ProLnk Partner Network · Your feedback is private and secure
        </p>
      </div>
    </div>
  );
}
