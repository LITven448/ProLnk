import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Star, MessageSquare, Send, ThumbsUp, TrendingUp, Award, ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const TEAL = "#00B5B8″;
const GREEN = "#22C55E";
const AMBER = "#F59E0B";
const DIM = "#8B91A8″;
const BORDER = "#1E2A3A";
const CARD = "#0F1D2E";
const BG = "#0A1628″;

const ratingBreakdown = [
  { stars: 5, count: 68, pct: 81 },
  { stars: 4, count: 12, pct: 14 },
  { stars: 3, count: 3,  pct: 4 },
  { stars: 2, count: 1,  pct: 1 },
  { stars: 1, count: 0,  pct: 0 },
];

const unrespondedReviews = [
  {
    id: "r1″,
    name: "James Holloway",
    city: "Frisco, TX",
    date: "May 10, 2026″,
    stars: 5,
    text: "Best HVAC company I've used. Diagnosed our issue in 10 minutes and had us cooling again same day. Honest about pricing too.",
    suggestions: [
      "Thank you so much, James! We take pride in quick diagnosis and honest pricing — glad we could get you cool again so fast. We appreciate your trust!",
      "James, this means a lot to us! Same-day service is our goal and we're thrilled it came through for you. Look forward to serving you again.",
      "Thanks for the kind words, James! It was our pleasure. Don't hesitate to reach out if you ever need anything — we're just a call away.",
    ],
  },
  {
    id: "r2″,
    name: "Sandra Kim",
    city: "Plano, TX",
    date: "May 8, 2026″,
    stars: 4,
    text: "Very professional and knowledgeable. Would have given 5 stars but the arrival window was a bit wide.",
    suggestions: [
      "Sandra, thank you for the honest feedback! We're working hard to tighten our arrival windows. Glad the work met your standards — we'll aim for that 5th star next visit!",
      "We really appreciate you sharing this, Sandra. You're right that tighter scheduling matters and it's something we're actively improving. Hope to exceed expectations next time!",
      "Thank you, Sandra! Your feedback on the arrival window is noted — we're improving our scheduling. Glad you found us professional and we look forward to earning that 5th star.",
    ],
  },
  {
    id: "r3″,
    name: "Derek Okafor",
    city: "Allen, TX",
    date: "May 5, 2026″,
    stars: 5,
    text: "These guys are legit. Installed a new system in under 4 hours, cleaned up everything, and walked me through the new thermostat. 10/10.",
    suggestions: [
      "Derek, you made our team's day with this review! Clean installs and thorough walk-throughs are non-negotiable for us. So glad you're happy with the new system!",
      "Thank you, Derek! Under 4 hours is exactly what we aim for. We never leave until you know how everything works. Really appreciate the 10/10!",
      "This is awesome, Derek — thank you! The team works hard to get installs done right and fast without cutting corners. Your kind words go a long way.",
    ],
  },
];

const recentReviews = [
  {
    id: "rv1″, name: "Patricia Leung", stars: 5, date: "Apr 28, 2026",
    text: "Always reliable, always on time. My go-to HVAC company.",
    response: "Thank you, Patricia! We appreciate your loyalty and look forward to keeping you comfortable year-round.",
  },
  {
    id: "rv2″, name: "Carlos Rivera", stars: 5, date: "Apr 20, 2026",
    text: "Fast response on an emergency call. Fixed the leak in 45 minutes.",
    response: null,
  },
  {
    id: "rv3″, name: "Tanya Brooks", stars: 4, date: "Apr 14, 2026",
    text: "Good work on the seasonal tune-up. A little pricey but worth it.",
    response: "Thanks for the feedback, Tanya! We do premium work and appreciate you recognizing the value.",
  },
  {
    id: "rv4″, name: "Mark Stevens", stars: 5, date: "Apr 6, 2026",
    text: "Installed two new units. Crew was professional and left the house spotless.",
    response: "Mark, that's what we strive for every time! Thank you for trusting us with a two-unit install.",
  },
  {
    id: "rv5″, name: "Lisa Huang", stars: 3, date: "Mar 30, 2026",
    text: "Work was fine but communication could have been better during the project.",
    response: null,
  },
];

const trendData = [
  { month: "Dec", rating: 4.6 },
  { month: "Jan", rating: 4.7 },
  { month: "Feb", rating: 4.7 },
  { month: "Mar", rating: 4.8 },
  { month: "Apr", rating: 4.8 },
  { month: "May", rating: 4.9 },
];

const recentJobs = [
  { id: "j1″, label: "Sandra Kim — Plano, TX (May 8)" },
  { id: "j2″, label: "Derek Okafor — Allen, TX (May 5)" },
  { id: "j3″, label: "Carlos Rivera — McKinney, TX (Apr 20)" },
  { id: "j4″, label: "Tanya Brooks — Frisco, TX (Apr 14)" },
  { id: "j5″, label: "Mark Stevens — Prosper, TX (Apr 6)" },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5″>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          fill={i < count ? AMBER : "none"}
          style={{ color: i < count ? AMBER : BORDER }}
        />
      ))}
    </div>
  );
}

export default function ReviewManager() {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [selectedJob, setSelectedJob] = useState(recentJobs[0].id);
  const [smsSent, setSmsSent] = useState(false);
  const [usedSuggestion, setUsedSuggestion] = useState<Record<string, boolean>>({});

  function handleSuggestion(reviewId: string, text: string) {
    setReplyText((prev) => ({ ...prev, [reviewId]: text }));
    setUsedSuggestion((prev) => ({ ...prev, [reviewId]: true }));
  }

  return (
    <div style={{ background: BG }} className="min-h-screen p-6 space-y-6″>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Review Manager</h1>
        <p style={{ color: DIM }} className="text-sm mt-0.5″>Your reputation is your business</p>
      </div>

      {/* Rating Overview */}
      <div style={{ background: CARD, border: `1px solid ${BORDER}` }} className="rounded-xl p-5″>
        <div className="flex items-center gap-2 mb-4″>
          <Star size={16} style={{ color: AMBER }} />
          <span className="text-white font-semibold text-sm">Rating Overview</span>
          <span style={{ color: DIM }} className="text-xs ml-auto">84 total reviews</span>
        </div>
        <div className="flex items-center gap-8″>
          <div className="flex flex-col items-center">
            <span style={{ color: AMBER }} className="text-5xl font-bold">4.8</span>
            <StarRow count={5} />
            <span style={{ color: DIM }} className="text-xs mt-1″>Overall rating</span>
          </div>
          <div className="flex-1 space-y-1.5″>
            {ratingBreakdown.map(({ stars, count, pct }) => (
              <div key={stars} className="flex items-center gap-2″>
                <span style={{ color: DIM }} className="text-xs w-5 text-right">{stars}★</span>
                <div style={{ background: BORDER }} className="flex-1 rounded-full h-1.5″>
                  <div
                    style={{ width: `${pct}%`, background: pct > 50 ? GREEN : pct > 20 ? AMBER : "#EF4444″ }}
                    className="h-1.5 rounded-full transition-all"
                  />
                </div>
                <span style={{ color: DIM }} className="text-xs w-14″>{count} ({pct}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews to Respond To */}
      <div style={{ background: CARD, border: `1px solid ${BORDER}` }} className="rounded-xl p-5″>
        <div className="flex items-center gap-2 mb-4″>
          <MessageSquare size={16} style={{ color: TEAL }} />
          <span className="text-white font-semibold text-sm">Needs Response</span>
          <span style={{ background: "#EF444422″, color: "#EF4444" }} className="text-xs px-2 py-0.5 rounded-full ml-auto">3 pending</span>
        </div>
        <div className="space-y-4″>
          {unrespondedReviews.map((review) => (
            <div
              key={review.id}
              style={{ background: BG, border: `1px solid ${BORDER}` }}
              className="rounded-lg p-4 space-y-3″
            >
              <div className="flex items-start justify-between gap-2″>
                <div>
                  <p className="text-white text-sm font-medium">{review.name}</p>
                  <p style={{ color: DIM }} className="text-xs">{review.city} · {review.date}</p>
                </div>
                <StarRow count={review.stars} />
              </div>
              <p style={{ color: "#C8D0E0″ }} className="text-sm leading-relaxed">{review.text}</p>

              {replyingTo === review.id ? (
                <div className="space-y-2″>
                  <p style={{ color: DIM }} className="text-xs font-medium">AI suggested responses:</p>
                  <div className="space-y-1.5″>
                    {review.suggestions.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestion(review.id, s)}
                        style={{ background: "#0F1D2E", border: `1px solid ${BORDER}` }}
                        className="w-full text-left rounded-lg p-3 text-xs leading-relaxed hover:border-teal-500 transition-colors"
                        title="Click to use"
                      >
                        <span style={{ color: TEAL }} className="font-medium">Option {idx + 1}: </span>
                        <span style={{ color: "#C8D0E0″ }}>{s}</span>
                      </button>
                    ))}
                  </div>
                  <Textarea
                    value={replyText[review.id] || ""}
                    onChange={(e) => setReplyText((prev) => ({ ...prev, [review.id]: e.target.value }))}
                    placeholder="Write your response..."
                    className="text-sm resize-none"
                    style={{ background: "#0A1628″, borderColor: BORDER, color: "white" }}
                    rows={3}
                  />
                  <div className="flex gap-2″>
                    <Button
                      size="sm"
                      className="gap-1.5 text-xs"
                      style={{ background: TEAL, color: "#0A1628″ }}
                      onClick={() => setReplyingTo(null)}
                    >
                      <Send size={12} /> Send Reply
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      style={{ borderColor: BORDER, color: DIM }}
                      onClick={() => setReplyingTo(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs gap-1.5″
                  style={{ borderColor: TEAL, color: TEAL }}
                  onClick={() => setReplyingTo(review.id)}
                >
                  <MessageSquare size={12} /> Reply
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reviews */}
      <div style={{ background: CARD, border: `1px solid ${BORDER}` }} className="rounded-xl p-5″>
        <div className="flex items-center gap-2 mb-4″>
          <Star size={16} style={{ color: AMBER }} />
          <span className="text-white font-semibold text-sm">Recent Reviews</span>
        </div>
        <div className="space-y-4″>
          {recentReviews.map((review) => (
            <div
              key={review.id}
              style={{ borderBottom: `1px solid ${BORDER}` }}
              className="pb-4 last:border-0 last:pb-0 space-y-1.5″
            >
              <div className="flex items-center justify-between gap-2″>
                <div className="flex items-center gap-2″>
                  <p className="text-white text-sm font-medium">{review.name}</p>
                  <StarRow count={review.stars} />
                </div>
                <span style={{ color: DIM }} className="text-xs">{review.date}</span>
              </div>
              <p style={{ color: "#C8D0E0″ }} className="text-sm leading-relaxed">{review.text}</p>
              {review.response ? (
                <div style={{ background: `${TEAL}11`, borderLeft: `2px solid ${TEAL}` }} className="pl-3 py-1.5 rounded-r">
                  <p style={{ color: TEAL }} className="text-xs font-medium mb-0.5″>Your response</p>
                  <p style={{ color: "#C8D0E0″ }} className="text-xs leading-relaxed">{review.response}</p>
                </div>
              ) : (
                <button
                  style={{ color: TEAL }}
                  className="text-xs flex items-center gap-1 hover:underline"
                  onClick={() => setReplyingTo(review.id)}
                >
                  <ThumbsUp size={11} /> Send Thank You
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Rating Trend */}
      <div style={{ background: CARD, border: `1px solid ${BORDER}` }} className="rounded-xl p-5″>
        <div className="flex items-center gap-2 mb-4″>
          <TrendingUp size={16} style={{ color: TEAL }} />
          <span className="text-white font-semibold text-sm">Rating Trend — Last 6 Months</span>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3″ stroke={BORDER} />
            <XAxis dataKey="month" tick={{ fill: DIM, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis domain={[4.4, 5.0]} tick={{ fill: DIM, fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8 }}
              labelStyle={{ color: "white", fontSize: 12 }}
              itemStyle={{ color: TEAL, fontSize: 12 }}
            />
            <Line
              type="monotone" dataKey="rating" stroke={TEAL}
              strokeWidth={2.5} dot={{ fill: TEAL, r: 4 }} activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Competitor Comparison */}
      <div
        style={{ background: `${AMBER}11`, border: `1px solid ${AMBER}44` }}
        className="rounded-xl p-4 flex items-center gap-3″
      >
        <Award size={22} style={{ color: AMBER }} />
        <div>
          <p className="text-white text-sm font-semibold">Top 8% in DFW</p>
          <p style={{ color: DIM }} className="text-xs mt-0.5″>Your 4.8★ puts you in the top 8% of DFW HVAC pros — keep it up!</p>
        </div>
      </div>

      {/* Request Review Tool */}
      <div style={{ background: CARD, border: `1px solid ${BORDER}` }} className="rounded-xl p-5″>
        <div className="flex items-center gap-2 mb-4″>
          <Send size={16} style={{ color: TEAL }} />
          <span className="text-white font-semibold text-sm">Request a Review</span>
        </div>
        <p style={{ color: DIM }} className="text-xs mb-3″>Send an SMS review request to a recent customer</p>
        <div className="flex gap-2″>
          <div className="relative flex-1″>
            <select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              style={{ background: BG, border: `1px solid ${BORDER}`, color: "white" }}
              className="w-full rounded-lg px-3 py-2 text-sm appearance-none pr-8 focus:outline-none focus:border-teal-500″
            >
              {recentJobs.map((j) => (
                <option key={j.id} value={j.id}>{j.label}</option>
              ))}
            </select>
            <ChevronDown size={14} style={{ color: DIM }} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <Button
            size="sm"
            className="gap-1.5 text-xs shrink-0″
            style={{ background: TEAL, color: "#0A1628″ }}
            onClick={() => { setSmsSent(true); setTimeout(() => setSmsSent(false), 3000); }}
          >
            <Send size={12} /> {smsSent ? "Sent!" : "Send Request"}
          </Button>
        </div>
        {smsSent && (
          <p style={{ color: GREEN }} className="text-xs mt-2 flex items-center gap-1″>
            ✓ Review request sent via SMS
          </p>
        )}
      </div>

    </div>
  );
}
