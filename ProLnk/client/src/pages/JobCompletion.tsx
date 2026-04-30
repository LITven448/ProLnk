/**
 * /job/:token — Homeowner Deal Page (no login required, mobile-first)
 * Core patent mechanic: job photo → AI detection → deal delivered to homeowner
 * Wired to real DB via deals.getByToken tRPC procedure
 */
import { useState, useEffect, useRef } from "react";
import { useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle, Star, Shield, Clock, ChevronDown, ChevronUp,
  ArrowRight, Sparkles, MapPin, Lock, AlertTriangle, X, ThumbsUp,
  Zap, Home, Wrench
} from "lucide-react";
import { toast } from "sonner";

// ─── Countdown Timer ──────────────────────────────────────────────────────────
function CountdownTimer({ expiresAt }: { expiresAt: string | null }) {
  const target = expiresAt ? new Date(expiresAt).getTime() : Date.now() + 48 * 3600 * 1000;
  const [remaining, setRemaining] = useState(Math.max(0, Math.floor((target - Date.now()) / 1000)));
  useEffect(() => {
    const iv = setInterval(() => setRemaining(r => Math.max(0, r - 1)), 1000);
    return () => clearInterval(iv);
  }, []);
  const h = Math.floor(remaining / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const s = remaining % 60;
  return (
    <div className="flex items-center gap-2 justify-center">
      {[{ v: h, l: "hrs" }, { v: m, l: "min" }, { v: s, l: "sec" }].map(({ v, l }) => (
        <div key={l} className="text-center">
          <div className="rounded-lg w-12 h-12 flex items-center justify-center text-xl font-bold text-white"
            style={{ backgroundColor: "#0A1628" }}>
            {String(v).padStart(2, "0")}
          </div>
          <div className="text-xs text-gray-500 mt-1">{l}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Before/After Slider ──────────────────────────────────────────────────────
function BeforeAfterSlider({ before, after, label = "AI Fix Preview" }: {
  before: string; after: string; label?: string;
}) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
        <Sparkles className="w-3.5 h-3.5 text-[#00B5B8]" />
        {label}
      </div>
      <div
        ref={containerRef}
        className="relative rounded-xl overflow-hidden select-none cursor-col-resize"
        style={{ aspectRatio: "4/3" }}
        onMouseDown={e => { dragging.current = true; update(e.clientX); }}
        onMouseMove={e => { if (dragging.current) update(e.clientX); }}
        onMouseUp={() => { dragging.current = false; }}
        onMouseLeave={() => { dragging.current = false; }}
        onTouchStart={e => { dragging.current = true; update(e.touches[0].clientX); }}
        onTouchMove={e => { if (dragging.current) update(e.touches[0].clientX); }}
        onTouchEnd={() => { dragging.current = false; }}
      >
        <img src={after} alt="After AI fix" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <img src={before} alt="Before" className="absolute inset-0 object-cover"
            style={{ width: `${10000 / Math.max(pos, 1)}%`, height: "100%", maxWidth: "none" }} />
        </div>
        <div className="absolute inset-y-0 flex items-center justify-center" style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
          <div className="w-0.5 h-full bg-white opacity-80" />
          <div className="absolute w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 text-xs font-bold">⇔</div>
        </div>
        <div className="absolute top-2 left-2">
          <span className="text-xs bg-black/60 text-white px-2 py-0.5 rounded-full">Before</span>
        </div>
        <div className="absolute top-2 right-2">
          <span className="text-xs bg-[#00B5B8]/90 text-white px-2 py-0.5 rounded-full">AI Fix</span>
        </div>
      </div>
      <p className="text-xs text-gray-400 text-center">Drag to compare · AI-generated preview of completed repair</p>
    </div>
  );
}

// ─── Star Rating Input ────────────────────────────────────────────────────────
function StarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <button key={i} type="button"
          onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(0)}
          onClick={() => onChange(i)}>
          <Star className={`w-7 h-7 transition-colors ${i <= (hover || value) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`} />
        </button>
      ))}
    </div>
  );
}

// ─── Schedule Modal ───────────────────────────────────────────────────────────
function ScheduleModal({ deal, onClose }: { deal: any; onClose: () => void }) {
  const [name, setName] = useState(deal.homeownerName || "");
  const [phone, setPhone] = useState(deal.homeownerPhone || "");
  const [email, setEmail] = useState(deal.homeownerEmail || "");
  const [submitted, setSubmitted] = useState(false);

  const scheduleMut = trpc.deals.submitContact.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: () => toast.error("Could not submit. Please try again."),
  });

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/60">
        <div className="bg-white rounded-2xl w-full max-w-md p-6 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
            <CheckCircle className="w-7 h-7 text-emerald-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">You're on the schedule!</h3>
          <p className="text-sm text-gray-500">
            {deal.receivingPartnerName || "Your ProLnk partner"} will call you within 2 hours to confirm your free estimate.
          </p>
          <Button className="w-full text-white" style={{ backgroundColor: "#00B5B8" }} onClick={onClose}>Done</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/60">
      <div className="bg-white rounded-2xl w-full max-w-md p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900">Schedule Free Estimate</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <p className="text-sm text-gray-500">No payment now — just confirm your contact info and we'll reach out within 2 hours.</p>
        <div className="space-y-3">
          <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B5B8]"
            placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
          <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B5B8]"
            placeholder="Phone number" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
          <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B5B8]"
            placeholder="Email (optional)" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <Button
          className="w-full text-white py-6 text-base font-semibold rounded-xl"
          style={{ backgroundColor: "#0A1628" }}
          disabled={scheduleMut.isPending || !name || !phone}
          onClick={() => scheduleMut.mutate({ token: deal.token, homeownerName: name, homeownerEmail: email || "noemail@prolnk.com", homeownerPhone: phone })}
        >
          {scheduleMut.isPending ? "Submitting..." : "Confirm — Schedule My Estimate"}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" /> Your info is never sold or shared
        </p>
      </div>
    </div>
  );
}

// ─── Review Form ──────────────────────────────────────────────────────────────
function ReviewForm({ deal }: { deal: any }) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitMut = trpc.deals.submitReview.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: () => toast.error("Could not submit review. Please try again."),
  });

  if (submitted) {
    return (
      <div className="text-center py-4 space-y-2">
        <ThumbsUp className="w-8 h-8 text-[#00B5B8] mx-auto" />
        <p className="text-sm font-semibold text-gray-800">Thank you for your feedback!</p>
        <p className="text-xs text-gray-400">Your review helps other homeowners find great partners.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-gray-800">Rate your experience</p>
      <StarInput value={rating} onChange={setRating} />
      <textarea
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#00B5B8]"
        rows={3} placeholder="Tell us about your experience (optional)..."
        value={text} onChange={e => setText(e.target.value)} />
      <Button
        className="w-full text-white rounded-xl"
        style={{ backgroundColor: "#00B5B8" }}
        disabled={rating === 0 || submitMut.isPending}
        onClick={() => submitMut.mutate({ token: deal.token, rating, reviewText: text })}
      >
        {submitMut.isPending ? "Submitting..." : "Submit Review"}
      </Button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function JobCompletion() {
  const [, params] = useRoute("/job/:token");
  const token = params?.token ?? "demo";

  const { data: deal, isLoading } = trpc.deals.getByToken.useQuery(
    { token },
    { enabled: !!token, retry: false }
  );

  const trackViewMut = trpc.deals.trackView.useMutation();
  const declineMut = trpc.deals.decline.useMutation({
    onSuccess: () => toast.success("Offer removed. No further contact."),
  });

  const [showSchedule, setShowSchedule] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [declined, setDeclined] = useState(false);

  useEffect(() => {
    if (token && token !== "demo") {
      trackViewMut.mutate({ token });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-full border-4 border-[#00B5B8] border-t-transparent animate-spin mx-auto" />
          <p className="text-sm text-gray-500">Loading your deal...</p>
        </div>
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-xs">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-7 h-7 text-gray-400" />
          </div>
          <h2 className="text-lg font-bold text-gray-800">Deal Not Found</h2>
          <p className="text-sm text-gray-500">This link may have expired or is no longer valid.</p>
          <a href="/" className="text-sm text-[#00B5B8] underline">Visit ProLnk.com</a>
        </div>
      </div>
    );
  }

  const isExpired = deal.status === "expired";
  const isAccepted = ["accepted", "scheduled", "job_closed"].includes(deal.status);
  const isDeclined = deal.status === "declined" || declined;
  const hasAiFix = !!(deal as any).aiFixImageUrl;
  const hasPhoto = !!(deal as any).photoUrl;
  const estLow = (deal as any).estimatedValueLow ? Number((deal as any).estimatedValueLow) : null;
  const estHigh = (deal as any).estimatedValueHigh ? Number((deal as any).estimatedValueHigh) : null;
  const savings = estHigh ? Math.round(estHigh * 0.15) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#0A1628" }}>
            <Zap className="w-4 h-4 text-[#00B5B8]" />
          </div>
          <span className="font-bold text-sm text-[#0A1628]">ProLnk</span>
        </div>
        <Badge variant="outline" className="text-xs border-[#00B5B8] text-[#00B5B8]">Partner Network</Badge>
      </div>

      <div className="max-w-md mx-auto px-4 py-5 space-y-4 pb-20">

        {isExpired && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800">This offer has expired</p>
              <p className="text-xs text-amber-600 mt-0.5">The 48-hour window has passed. Contact us to see if the offer is still available.</p>
            </div>
          </div>
        )}

        {isAccepted && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-emerald-800">Estimate Scheduled!</p>
              <p className="text-xs text-emerald-600 mt-0.5">Your partner will be in touch to confirm the appointment.</p>
            </div>
          </div>
        )}

        {/* Hero Card */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #0A1628, #00B5B8)" }} />
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(0,181,184,0.12)" }}>
                <Home className="w-4 h-4 text-[#00B5B8]" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Service completed by</p>
                <p className="text-sm font-semibold text-gray-800">{(deal as any).referringPartnerName || "Your ProLnk Partner"}</p>
              </div>
            </div>
            <div className="rounded-xl p-3 space-y-1" style={{ backgroundColor: "rgba(0,181,184,0.08)", border: "1px solid rgba(0,181,184,0.2)" }}>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#00B5B8]">
                <Sparkles className="w-3.5 h-3.5" />
                AI Detected Opportunity
                {(deal as any).aiConfidence && (
                  <span className="ml-auto bg-[#00B5B8] text-white text-xs px-2 py-0.5 rounded-full">{(deal as any).aiConfidence}% confidence</span>
                )}
              </div>
              <p className="text-sm font-bold text-gray-900">{(deal as any).issueType}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{(deal as any).issueDescription}</p>
            </div>
            {(deal as any).homeownerAddress && (
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{(deal as any).homeownerAddress}</span>
              </div>
            )}
          </div>
        </div>

        {/* Photos */}
        {hasAiFix && hasPhoto ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <BeforeAfterSlider before={(deal as any).photoUrl} after={(deal as any).aiFixImageUrl} label="AI Surgical Fix Preview" />
          </div>
        ) : hasPhoto ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Photo from your service visit</span>
              <img src={(deal as any).photoUrl} alt="Service photo" className="w-full rounded-xl object-cover" style={{ aspectRatio: "4/3" }} />
            </div>
          </div>
        ) : null}

        {/* Partner Offer Card */}
        {(deal as any).receivingPartnerName && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-4 pt-4 pb-3 border-b border-gray-50">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(30,58,95,0.1)" }}>
                  <Wrench className="w-5 h-5 text-[#1e3a5f]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{(deal as any).receivingPartnerName}</p>
                  <p className="text-xs text-gray-400">{(deal as any).receivingPartnerType || (deal as any).issueCategory}</p>
                  {Number((deal as any).avgRating) > 0 && (
                    <div className="flex items-center gap-1 mt-1">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className={`w-3 h-3 ${i <= Math.round(Number((deal as any).avgRating)) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`} />
                      ))}
                      <span className="text-xs text-gray-400 ml-0.5">{Number((deal as any).avgRating).toFixed(1)} ({(deal as any).reviewCount} reviews)</span>
                    </div>
                  )}
                </div>
                <Badge className="text-xs bg-emerald-100 text-emerald-700 border-0">Verified</Badge>
              </div>
            </div>
            <div className="px-4 py-3 space-y-2">
              {estHigh && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Market estimate</span>
                  <span className="text-xs text-gray-300 line-through">${estHigh.toLocaleString()}</span>
                </div>
              )}
              {estLow && estHigh && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">Your ProLnk price</span>
                  <span className="text-xl font-bold text-[#0A1628]">${estLow.toLocaleString()}–${estHigh.toLocaleString()}</span>
                </div>
              )}
              {savings && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Save ~${savings} — no sales or marketing markup
                </div>
              )}
              <div className="flex items-start gap-2 text-xs text-gray-400 pt-1">
                <Shield className="w-3.5 h-3.5 text-[#0A1628] flex-shrink-0 mt-0.5" />
                <span>Licensed, insured, and backed by the ProLnk 30-Day Satisfaction Guarantee</span>
              </div>
            </div>
            {!isExpired && !isAccepted && !isDeclined && (
              <div className="px-4 pb-3">
                <div className="text-center space-y-2">
                  <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-red-400" />
                    Partner-rate offer expires in
                  </p>
                  <CountdownTimer expiresAt={(deal as any).expiresAt} />
                </div>
              </div>
            )}
            {!isExpired && !isAccepted && !isDeclined && (
              <div className="px-4 pb-4 space-y-2">
                <Button
                  className="w-full text-white text-base py-6 rounded-xl font-semibold"
                  style={{ backgroundColor: "#0A1628" }}
                  onClick={() => setShowSchedule(true)}
                >
                  Schedule Free Estimate
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <p className="text-xs text-gray-400 text-center">No payment required now. We'll call within 2 hours.</p>
              </div>
            )}
          </div>
        )}

        {/* Reviews */}
        {(deal as any).reviews && (deal as any).reviews.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm space-y-3">
            <p className="text-sm font-semibold text-gray-800">What homeowners say</p>
            <div className="space-y-3">
              {(deal as any).reviews.slice(0, 3).map((r: any, i: number) => (
                <div key={i} className="border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-1 mb-1">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-3 h-3 ${s <= r.rating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`} />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">{r.homeownerName || "Homeowner"}</span>
                  </div>
                  {r.reviewText && <p className="text-xs text-gray-600 leading-relaxed">{r.reviewText}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Review Form (post-job) */}
        {isAccepted && (
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <ReviewForm deal={deal} />
          </div>
        )}

        {/* FAQ */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <button
            onClick={() => setShowFaq(!showFaq)}
            className="w-full px-4 py-3 flex items-center justify-between text-sm font-semibold text-gray-700"
          >
            How does this work?
            {showFaq ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
          </button>
          {showFaq && (
            <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-3">
              {[
                { q: "Why am I receiving this?", a: "Your service provider uses ProLnk. After completing your job, our AI analyzed the photos and spotted a potential issue at your property." },
                { q: "Is this a real company?", a: `Yes. ${(deal as any).receivingPartnerName || "Your ProLnk partner"} is a licensed and insured contractor with verified reviews.` },
                { q: "Why is the price lower?", a: "ProLnk partners save on marketing and sales costs because we connect them directly with homeowners. They pass those savings on to you." },
                { q: "What if I'm not satisfied?", a: "ProLnk backs every job with a 30-Day Satisfaction Guarantee. If you're not happy, we'll make it right." },
                { q: "Is my information safe?", a: "Your contact info is only shared with the assigned partner and is never sold or used for marketing." },
              ].map(({ q, a }) => (
                <div key={q}>
                  <p className="text-sm font-semibold text-gray-800 mb-1">{q}</p>
                  <p className="text-sm text-gray-500">{a}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Decline */}
        {!isExpired && !isAccepted && !isDeclined && (
          <div className="text-center pb-2">
            <button
              onClick={() => { declineMut.mutate({ token, reason: "homeowner_declined" }); setDeclined(true); }}
              className="text-xs text-gray-400 hover:text-gray-600 underline"
            >
              Not interested — remove this offer
            </button>
          </div>
        )}

        <div className="text-center pb-4">
          <p className="text-xs text-gray-300">Powered by ProLnk · AI-Powered Home Service Network</p>
        </div>
      </div>

      {showSchedule && <ScheduleModal deal={deal} onClose={() => setShowSchedule(false)} />}
    </div>
  );
}
