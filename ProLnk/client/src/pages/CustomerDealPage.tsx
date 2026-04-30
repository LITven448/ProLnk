/**
 * Customer Deal Page -- /deal/:token
 *
 * The homeowner-facing page. No auth required.
 * Mobile-first design -- most homeowners will open this on their phone.
 *
 * Flow:
 * 1. Load deal by token  show photo + AI finding + partner info
 * 2. Homeowner reviews the finding and partner profile
 * 3. CTA: "Get My Free Estimate"  contact form  confirmation
 * 4. Or: "No Thanks"  decline flow
 * 5. After job closes: review prompt
 */

import { useState, useEffect, useRef } from "react";
import { useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { SurgicalFixPanel } from "@/components/SurgicalFixPanel";
import { HomeownerCardOnFileModalPublic } from "@/components/HomeownerCardOnFileModalPublic";
import {
  Star, Shield, Clock, CheckCircle2, XCircle, Phone, Globe,
  MapPin, Camera, Wrench, AlertTriangle, ChevronDown, ChevronUp,
  Award, ThumbsUp, Calendar, ArrowRight, Loader2, ChevronLeft, ChevronRight as ChevronRightIcon,
  PenLine, RotateCcw
} from "lucide-react";

// --- Status badge colors ------------------------------------------------------
const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  draft:        { label: "Preview",    color: "bg-gray-100 text-gray-700" },
  sent:         { label: "New Offer",  color: "bg-blue-100 text-blue-700" },
  viewed:       { label: "Viewed",     color: "bg-purple-100 text-purple-700" },
  scheduled:    { label: "Scheduled",  color: "bg-green-100 text-green-700" },
  estimate_done:{ label: "Quoted",     color: "bg-yellow-100 text-yellow-700" },
  accepted:     { label: "Accepted",   color: "bg-emerald-100 text-emerald-700" },
  job_closed:   { label: "Complete",   color: "bg-[#0A1628]/10 text-[#0A1628]" },
  declined:     { label: "Declined",   color: "bg-red-100 text-red-700" },
  expired:      { label: "Expired",    color: "bg-gray-100 text-gray-500" },
};

// --- Star rating display ------------------------------------------------------
function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

// --- Photo Carousel -----------------------------------------------------------
function PhotoCarousel({ photoUrl, photoUrls, aiConfidence }: {
  photoUrl?: string | null;
  photoUrls?: string[] | null;
  aiConfidence?: number | null;
}) {
  const photos: string[] = (photoUrls && photoUrls.length > 0)
    ? photoUrls
    : photoUrl ? [photoUrl] : [];
  const [idx, setIdx] = useState(0);
  const labels = ["Before", "After", "Detail", "Overview"];

  if (photos.length === 0) {
    return (
      <div className="h-40 bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center">
        <Wrench size={40} className="text-[#0A1628]/60" />
      </div>
    );
  }

  return (
    <div className="relative">
      <img
        key={idx}
        src={photos[idx]}
        alt={`Property photo ${idx + 1}`}
        className="w-full object-cover max-h-72"
      />
      {photos.length > 1 && (
        <>
          <button
            onClick={() => setIdx(i => (i - 1 + photos.length) % photos.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => setIdx(i => (i + 1) % photos.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <ChevronRightIcon size={18} />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === idx ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
      <div className="absolute top-3 left-3">
        <div className="bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
          <Camera size={11} />
          {photos.length > 1 ? `${labels[idx] ?? `Photo ${idx + 1}`}  ${idx + 1}/${photos.length}` : "AI Analyzed"}
        </div>
      </div>
      {aiConfidence && (
        <div className="absolute top-3 right-3">
          <div className="bg-[#0A1628]/90 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-semibold">
            {aiConfidence}% Confidence
          </div>
        </div>
      )}
    </div>
  );
}

// --- Countdown timer ----------------------------------------------------------
function CountdownTimer({ expiresAt }: { expiresAt: string }) {
  const [diff, setDiff] = useState(0);

  useEffect(() => {
    const update = () => setDiff(Math.max(0, new Date(expiresAt).getTime() - Date.now()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [expiresAt]);

  const totalMs = 48 * 3600000;
  const pct = Math.max(0, Math.min(100, (diff / totalMs) * 100));
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const urgent = h < 6;
  const expired = diff === 0;

  return (
    <div className={`rounded-xl px-4 py-3 border ${
      expired ? "bg-gray-50 border-gray-200" :
      urgent ? "bg-red-50 border-red-200" : "bg-amber-50 border-amber-200"
    }`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Clock size={14} className={expired ? "text-gray-400" : urgent ? "text-red-600" : "text-amber-600"} />
          <span className={`text-sm font-semibold ${
            expired ? "text-gray-500" : urgent ? "text-red-700" : "text-amber-800"
          }`}>
            {expired ? "Offer Expired" : "Offer expires in"}
          </span>
        </div>
        {!expired && (
          <span className={`text-lg font-bold tabular-nums ${
            urgent ? "text-red-700" : "text-amber-800"
          }`}>
            {String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
          </span>
        )}
      </div>
      {!expired && (
        <div className="w-full bg-white/60 rounded-full h-1.5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              urgent ? "bg-red-500" : pct > 50 ? "bg-amber-400" : "bg-yellow-500"
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
      )}
    </div>
  );
}

// --- Review card --------------------------------------------------------------
function ReviewCard({ review }: { review: any }) {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <p className="font-medium text-gray-900 text-sm">
            {review.homeownerName || "Verified Customer"}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(review.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
          </p>
        </div>
        <StarRating rating={review.rating} size={14} />
      </div>
      {review.reviewText && (
        <p className="text-sm text-gray-700 leading-relaxed">{review.reviewText}</p>
      )}
    </div>
  );
}

// --- Contact form -------------------------------------------------------------
function ContactForm({
  token,
  onSuccess,
}: {
  token: string;
  onSuccess: (name?: string, email?: string) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const submitContact = trpc.deals.submitContact.useMutation({
    onSuccess: (data) => {
      if (data.success) onSuccess(name, email);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitContact.mutate({ token, homeownerName: name, homeownerEmail: email, homeownerPhone: phone });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name" className="text-sm font-medium text-gray-700">Your Name</Label>
        <Input
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Jane Smith"
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="jane@example.com"
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
          Phone <span className="text-gray-400 font-normal">(optional)</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="(214) 555-0100"
          className="mt-1"
        />
      </div>
      <Button
        type="submit"
        disabled={submitContact.isPending || !name || !email}
        className="w-full bg-[#0A1628] hover:bg-teal-700 text-white font-semibold py-3 rounded-xl"
      >
        {submitContact.isPending ? (
          <><Loader2 size={16} className="animate-spin mr-2" /> Confirming...</>
        ) : (
          <><Calendar size={16} className="mr-2" /> Confirm Free Estimate Request</>
        )}
      </Button>
      {submitContact.isError && (
        <p className="text-sm text-red-600 text-center">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}

// --- Review form --------------------------------------------------------------
function ReviewForm({ token, onSuccess }: { token: string; onSuccess: () => void }) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitReview = trpc.deals.submitReview.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        setSubmitted(true);
        onSuccess();
      }
    },
  });

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle2 size={48} className="text-[#0A1628] mx-auto mb-3" />
        <h3 className="font-semibold text-gray-900 mb-1">Thank you for your review!</h3>
        <p className="text-sm text-gray-600">Your feedback helps other homeowners in the network.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">How was your experience?</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(i => (
            <button
              key={i}
              type="button"
              onClick={() => setRating(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(0)}
              className="p-1"
            >
              <Star
                size={32}
                className={i <= (hovered || rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-gray-300"}
              />
            </button>
          ))}
        </div>
      </div>
      <div>
        <Label htmlFor="review" className="text-sm font-medium text-gray-700">
          Share your experience <span className="text-gray-400 font-normal">(optional)</span>
        </Label>
        <Textarea
          id="review"
          value={reviewText}
          onChange={e => setReviewText(e.target.value)}
          placeholder="The team was professional and the work looks great..."
          className="mt-1 resize-none"
          rows={3}
        />
      </div>
      <Button
        onClick={() => submitReview.mutate({ token, rating, reviewText })}
        disabled={rating === 0 || submitReview.isPending}
        className="w-full bg-[#0A1628] hover:bg-teal-700 text-white font-semibold py-3 rounded-xl"
      >
        {submitReview.isPending ? (
          <><Loader2 size={16} className="animate-spin mr-2" /> Submitting...</>
        ) : (
          <><ThumbsUp size={16} className="mr-2" /> Submit Review</>
        )}
      </Button>
    </div>
  );
}

// --- Main page ----------------------------------------------------------------
export default function CustomerDealPage() {
  const { token } = useParams<{ token: string }>();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [showReviews, setShowReviews] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showDeclineConfirm, setShowDeclineConfirm] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showConfirmJobDone, setShowConfirmJobDone] = useState(false);
  const [confirmJobRating, setConfirmJobRating] = useState(0);
  const [confirmJobNote, setConfirmJobNote] = useState("");
  const [jobConfirmed, setJobConfirmed] = useState(false);
  const confirmJobMut = trpc.deals.confirmJobDone.useMutation({
    onSuccess: () => { setJobConfirmed(true); setShowConfirmJobDone(false); },
  });
  const [showCardModal, setShowCardModal] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [signatureDone, setSignatureDone] = useState(false);
  const [signerName, setSignerName] = useState("");
  // Track live fix URL so the panel updates immediately after generation
  const [liveFixUrl, setLiveFixUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  const getCanvasPos = (e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: ((e as MouseEvent).clientX - rect.left) * scaleX,
      y: ((e as MouseEvent).clientY - rect.top) * scaleY,
    };
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveSignatureMutation = trpc.deals.saveSignature.useMutation({
    onSuccess: () => setSignatureDone(true),
  });

  const handleSignatureSubmit = () => {
    const canvas = canvasRef.current;
    if (!canvas || !signerName.trim()) return;
    const dataUrl = canvas.toDataURL('image/png');
    saveSignatureMutation.mutate({ token: token || '', signerName: signerName.trim(), signatureData: dataUrl });
  };

  const { data: deal, isLoading, error } = trpc.deals.getByToken.useQuery(
    { token: token || "" },
    { enabled: !!token }
  );

  const trackView = trpc.deals.trackView.useMutation();
  const decline = trpc.deals.decline.useMutation();

  // Track view on load
  useEffect(() => {
    if (token && deal && !isLoading) {
      trackView.mutate({ token });
    }
  }, [token, !!deal]);

  // -- Loading state ------------------------------------------------------------
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={32} className="animate-spin text-[#0A1628] mx-auto mb-3" />
          <p className="text-gray-600">Loading your offer...</p>
        </div>
      </div>
    );
  }

  // -- Not found ----------------------------------------------------------------
  if (!deal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <AlertTriangle size={48} className="text-amber-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">Offer Not Found</h1>
          <p className="text-gray-600">
            This offer link may have expired or is no longer valid.
            If you believe this is an error, please contact the company that sent this to you.
          </p>
        </div>
      </div>
    );
  }

  const statusConfig = STATUS_CONFIG[deal.status] || STATUS_CONFIG.sent;
  const isActive = !["declined", "expired", "job_closed"].includes(deal.status);
  const isComplete = deal.status === "job_closed";
  const isScheduled = ["scheduled", "estimate_done", "accepted", "job_closed"].includes(deal.status);

  // -- Expired / Declined -------------------------------------------------------
  if (deal.status === "expired" || deal.status === "declined") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle size={32} className="text-gray-400" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            {deal.status === "expired" ? "This Offer Has Expired" : "Offer Declined"}
          </h1>
          <p className="text-gray-600 mb-6">
            {deal.status === "expired"
              ? "This 48-hour offer window has closed. If you're still interested in getting a quote, reach out to the partner directly."
              : "You've declined this offer. If you change your mind, feel free to reach out to the partner directly."}
          </p>
          {deal.receivingPartnerPhone && (
            <a
              href={`tel:${deal.receivingPartnerPhone}`}
              className="inline-flex items-center gap-2 bg-[#0A1628] text-white px-6 py-3 rounded-xl font-semibold"
            >
              <Phone size={16} />
              Call {deal.receivingPartnerName || "the Partner"}
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* -- Header ----------------------------------------------------------- */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0A1628] rounded-lg flex items-center justify-center">
              <Shield size={16} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 leading-none">Trusted Network</p>
              <p className="text-sm font-bold text-gray-900 leading-tight">ProLnk</p>
            </div>
          </div>
          <Badge className={`text-xs ${statusConfig.color}`}>
            {statusConfig.label}
          </Badge>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">

        {/* -- Expiry timer ----------------------------------------------------- */}
        {isActive && deal.expiresAt && !isScheduled && (
          <CountdownTimer expiresAt={deal.expiresAt} />
        )}

        {/* -- E-Signature Pad --------------------------------------------------- */}
        {contactSubmitted && !signatureDone && !isScheduled && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <PenLine size={18} className="text-[#0A1628]" />
              <h3 className="font-bold text-gray-900">Sign to Confirm Your Request</h3>
            </div>
            <p className="text-sm text-gray-500 mb-4">Your signature confirms you'd like a free estimate. No payment required.</p>
            <div className="mb-3">
              <Label className="text-xs font-semibold text-gray-700 mb-1 block">Full Name</Label>
              <Input
                value={signerName}
                onChange={e => setSignerName(e.target.value)}
                placeholder="Your full name"
                className="text-sm"
              />
            </div>
            <div className="mb-2">
              <Label className="text-xs font-semibold text-gray-700 mb-1 block">Signature</Label>
              <div className="relative border-2 border-dashed border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={160}
                  className="w-full touch-none cursor-crosshair"
                  style={{ height: '120px' }}
                  onMouseDown={e => {
                    isDrawingRef.current = true;
                    lastPosRef.current = getCanvasPos(e.nativeEvent, canvasRef.current!);
                  }}
                  onMouseMove={e => {
                    if (!isDrawingRef.current) return;
                    const canvas = canvasRef.current!;
                    const ctx = canvas.getContext('2d')!;
                    const pos = getCanvasPos(e.nativeEvent, canvas);
                    ctx.beginPath(); ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
                    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
                    ctx.lineTo(pos.x, pos.y); ctx.stroke();
                    lastPosRef.current = pos;
                  }}
                  onMouseUp={() => { isDrawingRef.current = false; }}
                  onMouseLeave={() => { isDrawingRef.current = false; }}
                  onTouchStart={e => {
                    e.preventDefault(); isDrawingRef.current = true;
                    lastPosRef.current = getCanvasPos(e.nativeEvent, canvasRef.current!);
                  }}
                  onTouchMove={e => {
                    e.preventDefault();
                    if (!isDrawingRef.current) return;
                    const canvas = canvasRef.current!;
                    const ctx = canvas.getContext('2d')!;
                    const pos = getCanvasPos(e.nativeEvent, canvas);
                    ctx.beginPath(); ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
                    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
                    ctx.lineTo(pos.x, pos.y); ctx.stroke();
                    lastPosRef.current = pos;
                  }}
                  onTouchEnd={() => { isDrawingRef.current = false; }}
                />
                <p className="absolute bottom-2 right-3 text-xs text-gray-300 pointer-events-none">Sign above</p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={clearSignature} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 px-3 py-2 border border-gray-200 rounded-lg">
                <RotateCcw size={12} /> Clear
              </button>
              <Button
                onClick={handleSignatureSubmit}
                disabled={!signerName.trim() || saveSignatureMutation.isPending}
                className="flex-1 bg-[#0A1628] hover:bg-teal-700 text-white text-sm"
              >
                {saveSignatureMutation.isPending ? <Loader2 size={14} className="animate-spin mr-1" /> : <PenLine size={14} className="mr-1" />}
                Confirm & Sign
              </Button>
            </div>
            {saveSignatureMutation.isError && (
              <p className="text-xs text-red-500 mt-2">Failed to save signature. Please try again.</p>
            )}
          </div>
        )}

        {/* -- Confirmation banner ----------------------------------------------- */}
        {(isScheduled || signatureDone) && (
          <div className="bg-[#F5E642]/10 border border-[#0A1628]/20 rounded-xl px-4 py-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 size={20} className="text-[#0A1628] mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-teal-900">{signatureDone ? 'Request Signed & Confirmed' : 'Estimate Request Confirmed'}</p>
                <p className="text-sm text-[#0A1628] mt-0.5">
                  {deal.receivingPartnerName || 'The partner'} will reach out within 24 hours to schedule your free estimate.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* -- Visual Fix Generator (Wave 11) ----------------------------------- */}
        {deal.photoUrl && (isAdmin || deal.aiFixImageUrl || liveFixUrl) && (
          <SurgicalFixPanel
            token={token || ""}
            issueType={deal.issueType || "issue"}
            issueDescription={deal.issueDescription || ""}
            photoUrl={deal.photoUrl}
            existingFixUrl={liveFixUrl || deal.aiFixImageUrl}
            isAdmin={isAdmin}
            onFixGenerated={(url) => setLiveFixUrl(url)}
          />
        )}

        {/* -- Photo Carousel + AI Finding -------------------------------------- */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <PhotoCarousel
            photoUrl={deal.photoUrl}
            photoUrls={deal.photoUrls as string[] | null}
            aiConfidence={deal.aiConfidence}
          />

          <div className="p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                <AlertTriangle size={18} className="text-amber-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-0.5">
                  {deal.issueCategory}
                </p>
                <h2 className="text-lg font-bold text-gray-900 leading-tight">
                  {deal.issueDescriptionShort || deal.issueType}
                </h2>
              </div>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              {deal.issueDescription}
            </p>

            {(deal.estimatedValueLow || deal.estimatedValueHigh) && (
              <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Estimated Repair Cost</p>
                  <p className="font-bold text-gray-900">
                    {deal.estimatedValueLow && deal.estimatedValueHigh
                      ? `$${Number(deal.estimatedValueLow).toLocaleString()} - $${Number(deal.estimatedValueHigh).toLocaleString()}`
                      : deal.estimatedValueLow
                        ? `From $${Number(deal.estimatedValueLow).toLocaleString()}`
                        : `Up to $${Number(deal.estimatedValueHigh).toLocaleString()}`
                    }
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-700 text-xs">Free Estimate</Badge>
              </div>
            )}
          </div>
        </div>

        {/* -- Homeowner message ------------------------------------------------ */}
        {deal.homeownerMessageSnippet && (
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield size={14} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-blue-600 font-semibold">From {deal.referringPartnerName || "Your Service Pro"}</p>
              </div>
            </div>
            <p className="text-sm text-blue-900 leading-relaxed italic">
              "{deal.homeownerMessageSnippet}"
            </p>
          </div>
        )}

        {/* -- Receiving Partner Card ------------------------------------------- */}
        {deal.receivingPartnerName && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-[#0A1628] rounded-2xl flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-xl">
                  {deal.receivingPartnerName.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-gray-900">{deal.receivingPartnerName}</h3>
                    <p className="text-sm text-gray-500">{deal.receivingPartnerType}</p>
                  </div>
                  {deal.receivingPartnerTier === "gold" && (
                    <Badge className="bg-amber-100 text-amber-700 text-xs shrink-0">
                      <Award size={10} className="mr-1" />
                      Gold
                    </Badge>
                  )}
                </div>

                {/* Rating */}
                {Number(deal.reviewCount) > 0 && (
                  <div className="flex items-center gap-2 mt-2">
                    <StarRating rating={Number(deal.avgRating)} size={14} />
                    <span className="text-sm font-semibold text-gray-900">{deal.avgRating}</span>
                    <span className="text-xs text-gray-500">({deal.reviewCount} reviews)</span>
                  </div>
                )}

                {/* Service area */}
                {deal.receivingPartnerServiceArea && (
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-500">
                    <MapPin size={11} />
                    <span>{deal.receivingPartnerServiceArea}</span>
                  </div>
                )}
              </div>
            </div>

            {deal.receivingPartnerDescription && (
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                {deal.receivingPartnerDescription}
              </p>
            )}

            {/* Contact links */}
            <div className="flex gap-2 mt-4">
              {deal.receivingPartnerPhone && (
                <a
                  href={`tel:${deal.receivingPartnerPhone}`}
                  className="flex items-center gap-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg font-medium transition-colors"
                >
                  <Phone size={12} />
                  Call
                </a>
              )}
              {deal.receivingPartnerWebsite && (
                <a
                  href={deal.receivingPartnerWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg font-medium transition-colors"
                >
                  <Globe size={12} />
                  Website
                </a>
              )}
            </div>

            {/* Reviews toggle */}
            {deal.reviews && deal.reviews.length > 0 && (
              <button
                onClick={() => setShowReviews(!showReviews)}
                className="flex items-center gap-1.5 text-sm text-[#0A1628] font-medium mt-3 hover:text-[#0A1628]"
              >
                {showReviews ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                {showReviews ? "Hide reviews" : `See ${deal.reviews.length} customer reviews`}
              </button>
            )}

            {showReviews && deal.reviews && (
              <div className="mt-3 space-y-3">
                {deal.reviews.map((review: any, i: number) => (
                  <ReviewCard key={i} review={review} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* -- Trust badges ----------------------------------------------------- */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Shield, label: "Verified Pro", sub: "Background checked" },
            { icon: Award, label: "Trusted Network", sub: "ProLnk certified" },
            { icon: CheckCircle2, label: "Free Estimate", sub: "No obligation" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
              <Icon size={20} className="text-[#0A1628] mx-auto mb-1.5" />
              <p className="text-xs font-semibold text-gray-900 leading-tight">{label}</p>
              <p className="text-xs text-gray-500 leading-tight mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        {/* -- Lead Source Tag Instruction (for the receiving pro -- shown after estimate confirmed) -- */}
        {(isScheduled || signatureDone) && deal.receivingPartnerId && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <Wrench size={14} className="text-amber-700" />
              </div>
              <div>
                <p className="font-semibold text-amber-900 text-sm">Action Required for {deal.receivingPartnerName || "the Pro"}</p>
                <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                  When creating this job in your FSM (Housecall Pro, Jobber, Workiz, etc.), set the{" "}
                  <strong>Lead Source</strong> field to:
                </p>
                <div className="mt-2 bg-white border border-amber-300 rounded-lg px-3 py-2 flex items-center justify-between gap-2">
                  <code className="text-sm font-mono font-bold text-amber-900">
                    ProLnk-{deal.receivingPartnerId}
                  </code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`ProLnk-${deal.receivingPartnerId}`);
                    }}
                    className="text-xs text-amber-700 hover:text-amber-900 font-medium shrink-0"
                  >
                    Copy
                  </button>
                </div>
                <p className="text-xs text-amber-700 mt-2">
                  This ensures your commission is automatically tracked and paid when the job closes.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* -- CTA Section ------------------------------------------------------ */}
        {isActive && !contactSubmitted && !isScheduled && (
          <div className="space-y-3">
            {!showContactForm ? (
              <>
                <Button
                  onClick={() => setShowContactForm(true)}
                  className="w-full bg-[#0A1628] hover:bg-teal-700 text-white font-bold py-4 rounded-2xl text-base shadow-lg shadow-teal-200"
                >
                  <Calendar size={18} className="mr-2" />
                  Get My Free Estimate
                  <ArrowRight size={16} className="ml-2" />
                </Button>
                <button
                  onClick={() => setShowDeclineConfirm(true)}
                  className="w-full text-sm text-gray-400 hover:text-gray-600 py-2 transition-colors"
                >
                  No thanks, I'll pass on this offer
                </button>
              </>
            ) : (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-1">Request Your Free Estimate</h3>
                <p className="text-sm text-gray-500 mb-4">
                  {deal.receivingPartnerName || "The partner"} will contact you within 24 hours to schedule.
                </p>
                <ContactForm
                  token={token || ""}
                  onSuccess={(name?: string, email?: string) => {
                    setContactSubmitted(true);
                    if (name) setContactName(name);
                    if (email) setContactEmail(email);
                    // Show card-on-file modal after contact form success
                    setTimeout(() => setShowCardModal(true), 800);
                  }}
                />
                <button
                  onClick={() => setShowContactForm(false)}
                  className="w-full text-sm text-gray-400 hover:text-gray-600 py-2 mt-2 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}

        {/* -- Decline confirm -------------------------------------------------- */}
        {showDeclineConfirm && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-red-100">
            <h3 className="font-bold text-gray-900 mb-2">Decline this offer?</h3>
            <p className="text-sm text-gray-600 mb-4">
              This offer will be removed. You can still contact {deal.receivingPartnerName || "the partner"} directly if you change your mind.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDeclineConfirm(false)}
                className="flex-1"
              >
                Keep Offer
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  decline.mutate({ token: token || "" });
                  setShowDeclineConfirm(false);
                }}
                className="flex-1"
              >
                Yes, Decline
              </Button>
            </div>
          </div>
        )}

        {/* -- Confirm Job Done (for scheduled/accepted deals not yet closed) --- */}
        {isScheduled && !isComplete && !jobConfirmed && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                <CheckCircle2 size={18} className="text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-emerald-900 text-sm">Did the job get done?</h3>
                <p className="text-xs text-emerald-700 mt-0.5">Confirming completion helps track your savings and ensures the pro gets credit.</p>
              </div>
            </div>
            {!showConfirmJobDone ? (
              <Button
                onClick={() => setShowConfirmJobDone(true)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl text-sm"
              >
                <CheckCircle2 size={16} className="mr-2" />
                Yes, the job is complete
              </Button>
            ) : (
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-emerald-800 mb-2">How would you rate the work? (optional)</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(n => (
                      <button
                        key={n}
                        onClick={() => setConfirmJobRating(n)}
                        className={`w-10 h-10 rounded-xl text-lg transition-all ${
                          confirmJobRating >= n
                            ? "bg-emerald-500 text-white"
                            : "bg-white border border-emerald-200 text-gray-400"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <Textarea
                  placeholder="Any comments? (optional)"
                  value={confirmJobNote}
                  onChange={e => setConfirmJobNote(e.target.value)}
                  className="text-sm resize-none"
                  rows={2}
                />
                <Button
                  onClick={() => confirmJobMut.mutate({ token: token || "", rating: confirmJobRating || undefined, note: confirmJobNote || undefined })}
                  disabled={confirmJobMut.isPending}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl text-sm"
                >
                  {confirmJobMut.isPending ? <><Loader2 size={16} className="animate-spin mr-2" /> Confirming...</> : "Confirm Job Complete"}
                </Button>
                <button onClick={() => setShowConfirmJobDone(false)} className="w-full text-xs text-emerald-600 py-1">Cancel</button>
              </div>
            )}
          </div>
        )}
        {/* -- Job confirmed banner --------------------------------------------- */}
        {jobConfirmed && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-800 text-sm">Job Complete — Thank You!</p>
              <p className="text-xs text-emerald-700 mt-0.5">Your confirmation helps keep the ProLnk network accountable and ensures fair commission tracking.</p>
            </div>
          </div>
        )}
        {/* -- Review prompt (after job closed) -------------------------------- */}
        {(isComplete || jobConfirmed) && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-1">How did it go?</h3>
            <p className="text-sm text-gray-500 mb-4">
              Your review helps other homeowners in the network find trusted pros.
            </p>
            {!showReviewForm ? (
              <Button
                onClick={() => setShowReviewForm(true)}
                className="w-full bg-[#0A1628] hover:bg-teal-700 text-white font-semibold py-3 rounded-xl"
              >
                <Star size={16} className="mr-2" />
                Leave a Review
              </Button>
            ) : (
              <ReviewForm
                token={token || ""}
                onSuccess={() => setShowReviewForm(false)}
              />
            )}
          </div>
        )}

        {/* -- Footer ----------------------------------------------------------- */}
        <div className="text-center pb-8">
          <div className="flex items-center justify-center gap-1.5 mb-2">
            <Shield size={12} className="text-gray-400" />
            <p className="text-xs text-gray-400">Powered by ProLnk Trusted Partner Network</p>
          </div>
          <p className="text-xs text-gray-300">
            This offer was generated from a photo taken during a routine service visit at your property.
            Your information is never sold or shared outside the ProLnk network.
          </p>
        </div>
      </div>

      {/* Card-on-file modal — appears after homeowner submits contact form */}
      {showCardModal && contactEmail && (
        <HomeownerCardOnFileModalPublic
          open={showCardModal}
          onClose={() => setShowCardModal(false)}
          token={token || ""}
          homeownerEmail={contactEmail}
          homeownerName={contactName}
          onSuccess={() => setShowCardModal(false)}
        />
      )}
    </div>
  );
}
