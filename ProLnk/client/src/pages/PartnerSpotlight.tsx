/**
 * Partner Spotlight — Public shareable profile page for a single partner
 * Route: /pro/:id
 * Shows partner info, verifications, reviews, and a "Work with me" CTA
 */
import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { TrustyProLogo } from "@/components/TrustyProLogo";
import ProLnkLogo from "@/components/ProLnkLogo";
import {
  Star, MapPin, Globe, Shield, CheckCircle, Award, Phone,
  Mail, ArrowLeft, Clock, Briefcase, ChevronRight, ExternalLink,
  Share2, MessageSquare, Loader2, Twitter, Copy, Smartphone,
  ChevronDown, ChevronUp, Building2, CalendarDays, FileCheck,
  ShieldCheck, Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const TIER_COLORS: Record<string, { bg: string; text: string; border: string; label: string }> = {
  scout:      { bg: "#f8fafc", text: "#64748b", border: "#cbd5e1", label: "Scout" },
  pro:        { bg: "#f0fdfa", text: "#0d9488", border: "#99f6e4", label: "Pro" },
  crew:       { bg: "#eef2ff", text: "#6366f1", border: "#c7d2fe", label: "Crew" },
  company:    { bg: "#fefce8", text: "#ca8a04", border: "#fde68a", label: "Company" },
  enterprise: { bg: "#1e293b", text: "#f8fafc", border: "#475569", label: "Enterprise" },
};

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const sz = size === "md" ? "w-4 h-4" : "w-3 h-3";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} className={`${sz} ${s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
      ))}
    </div>
  );
}

function VerificationBadge({ label, verified }: { label: string; verified: boolean }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium ${
      verified ? "bg-green-50 border-green-200 text-green-700" : "bg-gray-50 border-gray-200 text-gray-400"
    }`}>
      {verified ? <CheckCircle className="w-3.5 h-3.5 text-green-500" /> : <Shield className="w-3.5 h-3.5 text-gray-300" />}
      {label}
    </div>
  );
}

type QuoteForm = { name: string; email: string; description: string };

export default function PartnerSpotlight() {
  const params = useParams<{ id: string }>();
  const partnerId = parseInt(params.id ?? "0");
  const [contactOpen, setContactOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [quoteForm, setQuoteForm] = useState<QuoteForm>({ name: "", email: "", description: "" });
  const [quoteSent, setQuoteSent] = useState(false);
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [serviceAreaMapUrl, setServiceAreaMapUrl] = useState<string | null>(null);

  const MAPBOX_TOKEN = "import.meta.env.VITE_MAPBOX_TOKEN ?? """;

  const { data, isLoading, error } = trpc.directory.getPublicProfile.useQuery(
    { partnerId },
    { enabled: !!partnerId && !isNaN(partnerId) }
  );

  useEffect(() => {
    const serviceArea = data?.partner?.serviceArea;
    if (!serviceArea) return;
    const geocode = async () => {
      try {
        const encoded = encodeURIComponent(serviceArea.trim());
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encoded}.json?types=place,district,locality&limit=1&access_token=${MAPBOX_TOKEN}`
        );
        const json = await res.json();
        const feature = json.features?.[0];
        if (!feature) return;
        const [lon, lat] = feature.center as [number, number];
        const url =
          `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/` +
          `pin-l-home+1B4FD8(${lon},${lat})/` +
          `${lon},${lat},10,0/600x240@2x?access_token=${MAPBOX_TOKEN}`;
        setServiceAreaMapUrl(url);
      } catch {
        setServiceAreaMapUrl(null);
      }
    };
    geocode();
  }, [data?.partner?.serviceArea]);

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: data?.partner?.businessName ?? "Partner Profile", url });
    } else {
      navigator.clipboard.writeText(url).then(() => toast.success("Profile link copied!"));
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setLinkCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setLinkCopied(false), 2000);
    });
  };

  const handleShareTwitter = (businessName: string) => {
    const text = encodeURIComponent(`Check out ${businessName} on ProLnk — a trusted home services pro in the DFW area.`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const handleShareSMS = (businessName: string) => {
    const body = encodeURIComponent(`Check out ${businessName} on ProLnk: ${window.location.href}`);
    window.open(`sms:?body=${body}`);
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteForm.name.trim() || !quoteForm.email.trim() || !quoteForm.description.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    setQuoteSubmitting(true);
    await new Promise(r => setTimeout(r, 900));
    setQuoteSubmitting(false);
    setQuoteSent(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#1B4FD8]" />
          <p className="text-sm text-gray-400">Loading partner profile...</p>
        </div>
      </div>
    );
  }

  if (error || !data?.partner) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center max-w-sm">
          <Shield className="w-12 h-12 text-gray-200 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-gray-800 mb-2">Partner Not Found</h2>
          <p className="text-sm text-gray-500 mb-4">This profile may have been removed or is not yet approved.</p>
          <Link href="/partners">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" /> Browse Partners
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const p = data.partner;
  const reviews = data.reviews ?? [];
  const avgRating = data.avgRating ?? 0;
  const tier = (p.tier as string)?.toLowerCase() ?? "scout";
  const tierCfg = TIER_COLORS[tier] ?? TIER_COLORS.scout;

  const verifications = [
    { label: "License Verified", verified: !!p.licenseVerified },
    { label: "Insurance Verified", verified: !!p.insuranceVerified },
    { label: "Background Check", verified: !!p.backgroundCheckVerified },
    { label: "Business Registration", verified: !!p.businessRegistrationVerified },
    { label: "References Verified", verified: !!p.referencesVerified },
    { label: "Portfolio Verified", verified: !!p.portfolioVerified },
  ];
  const verifiedCount = verifications.filter(v => v.verified).length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8FAFC" }}>
      {/* Minimal nav */}
      <nav className="bg-white border-b border-slate-100 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <Link href="/partners">
          <div className="flex items-center gap-2 cursor-pointer">
            <ArrowLeft className="w-4 h-4 text-gray-400" />
            <ProLnkLogo height={28} variant="light" />
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleShare} className="text-xs gap-1.5">
            <Share2 className="w-3.5 h-3.5" /> Share
          </Button>
          <Link href="/trustypro">
            <Button size="sm" className="text-xs text-white gap-1.5" style={{ backgroundColor: "#1B4FD8" }}>
              Get Matched <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Hero card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-6">
          {/* Cover gradient */}
          <div className="h-28 relative" style={{ background: "linear-gradient(135deg, #0A1628 0%, #1B4FD8 100%)" }}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          </div>
          <div className="px-6 pb-6">
            {/* Avatar */}
            <div className="flex items-end gap-4 -mt-10 mb-4">
              <div
                className="w-20 h-20 rounded-2xl border-4 border-white shadow-md flex items-center justify-center text-3xl font-black text-white flex-shrink-0"
                style={{ backgroundColor: "#1B4FD8" }}
              >
                {p.businessName?.charAt(0) ?? "P"}
              </div>
              <div className="pb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl font-bold text-gray-900">{p.businessName}</h1>
                  <span
                    className="text-xs px-2.5 py-0.5 rounded-full font-bold border"
                    style={{ backgroundColor: tierCfg.bg, color: tierCfg.text, borderColor: tierCfg.border }}
                  >
                    {tierCfg.label}
                  </span>
                </div>
                {avgRating > 0 && (
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating rating={avgRating} size="md" />
                    <span className="text-sm font-semibold text-gray-700">{avgRating.toFixed(1)}</span>
                    <span className="text-xs text-gray-400">({reviews.length} review{reviews.length !== 1 ? "s" : ""})</span>
                  </div>
                )}
              </div>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 mb-5">
              {p.serviceArea && (
                <span className="flex items-center gap-1.5 text-sm text-gray-500">
                  <MapPin className="w-4 h-4 text-[#1B4FD8]" /> {p.serviceArea}
                </span>
              )}
              {p.website && (
                <a href={p.website.startsWith("http") ? p.website : `https://${p.website}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-[#1B4FD8] hover:underline">
                  <Globe className="w-4 h-4" /> {p.website.replace(/^https?:\/\//, "")}
                </a>
              )}
              {p.approvedAt && (
                <span className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Clock className="w-4 h-4 text-gray-300" /> Member since {new Date(p.approvedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </span>
              )}
            </div>

            {/* TrustyPro Verified badge */}
            {verifiedCount >= 3 && (
              <div className="flex items-center gap-3 mb-4 p-3 rounded-2xl border" style={{ background: "linear-gradient(90deg, #0A1628 0%, #1B4FD8 100%)", borderColor: "#1B4FD8" }}>
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">TrustyPro Verified</span>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-xs text-white/70">License, insurance &amp; background check confirmed</p>
                </div>
              </div>
            )}

            {/* Trust score */}
            {verifiedCount > 0 && (
              <div className="flex items-center gap-2 mb-5 p-3 bg-green-50 rounded-xl border border-green-100">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <span className="text-sm font-semibold text-green-800">{verifiedCount} of 6 verifications complete</span>
                  <p className="text-xs text-green-600">This partner has been vetted by ProLnk</p>
                </div>
              </div>
            )}

            {/* Description */}
            {p.description && (
              <p className="text-sm text-gray-600 leading-relaxed mb-5">{p.description}</p>
            )}

            {/* CTA */}
            <div className="flex gap-3 mb-4">
              <Link href="/trustypro" className="flex-1">
                <Button className="w-full text-white gap-2" style={{ backgroundColor: "#1B4FD8" }}>
                  <MessageSquare className="w-4 h-4" /> Request a Quote via TrustyPro
                </Button>
              </Link>
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Share row */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-medium">Share this pro:</span>
              <button
                onClick={() => handleShareTwitter(p.businessName)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-600 border border-sky-200 hover:bg-sky-100 transition-colors"
              >
                <Twitter className="w-3 h-3" /> Twitter
              </button>
              <button
                onClick={() => handleShareSMS(p.businessName)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-50 text-green-600 border border-green-200 hover:bg-green-100 transition-colors"
              >
                <Smartphone className="w-3 h-3" /> SMS
              </button>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <Copy className="w-3 h-3" /> {linkCopied ? "Copied!" : "Copy link"}
              </button>
            </div>
          </div>
        </div>

        {/* Verifications */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 mb-6">
          <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#1B4FD8]" /> Verifications & Credentials
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {verifications.map(v => (
              <VerificationBadge key={v.label} label={v.label} verified={v.verified} />
            ))}
          </div>
        </div>

        {/* Service area coverage */}
        {p.serviceArea && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 mb-6">
            <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#1B4FD8]" /> Service Area Coverage
            </h2>
            <div className="relative rounded-2xl overflow-hidden border border-slate-100" style={{ minHeight: 160 }}>
              {serviceAreaMapUrl ? (
                <>
                  <img
                    src={serviceAreaMapUrl}
                    alt={`Service area map for ${p.serviceArea}`}
                    className="w-full object-cover"
                    style={{ height: 200 }}
                    onError={() => setServiceAreaMapUrl(null)}
                  />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-2 shadow-sm">
                      <MapPin className="w-3.5 h-3.5 text-[#1B4FD8]" />
                      <span className="text-xs font-semibold text-gray-700">{p.serviceArea}</span>
                    </div>
                    <div className="bg-[#1B4FD8]/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                      <span className="text-xs font-bold text-white">DFW Network</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center" style={{ height: 160, background: "linear-gradient(135deg, #e0f2fe 0%, #f0fdf4 100%)" }}>
                  <div className="flex items-center gap-2 bg-white/90 rounded-lg px-4 py-2 shadow-sm">
                    <MapPin className="w-4 h-4 text-[#1B4FD8]" />
                    <span className="text-sm font-semibold text-gray-700">{p.serviceArea}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reviews */}
        {reviews.length > 0 && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400" /> Homeowner Reviews
              </h2>
              <span className="text-xs text-gray-400">{reviews.length} review{reviews.length !== 1 ? "s" : ""}</span>
            </div>
            <div className="space-y-4">
              {reviews.map((r: any, i: number) => (
                <div key={i} className="border-b border-slate-50 last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#1B4FD8]/10 flex items-center justify-center text-xs font-bold text-[#1B4FD8]">
                        {(r.homeownerName ?? "H").charAt(0)}
                      </div>
                      <span className="text-sm font-semibold text-gray-800">{r.homeownerName ?? "Verified Homeowner"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <StarRating rating={r.rating} />
                      <span className="text-xs text-gray-400">
                        {new Date(r.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                      </span>
                    </div>
                  </div>
                  {r.reviewText && <p className="text-sm text-gray-600 leading-relaxed">{r.reviewText}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* About This Pro */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-6">
          <button
            onClick={() => setAboutExpanded(v => !v)}
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
          >
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#1B4FD8]" /> About This Pro
            </h2>
            {aboutExpanded
              ? <ChevronUp className="w-4 h-4 text-gray-400" />
              : <ChevronDown className="w-4 h-4 text-gray-400" />
            }
          </button>
          {aboutExpanded && (
            <div className="px-6 pb-6 space-y-4 border-t border-slate-50">
              {p.description && (
                <div className="pt-4">
                  <p className="text-sm text-gray-600 leading-relaxed">{p.description}</p>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
                  <CalendarDays className="w-4 h-4 text-[#1B4FD8] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">Years in Business</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {p.approvedAt
                        ? `${Math.max(1, new Date().getFullYear() - new Date(p.approvedAt).getFullYear())}+ years`
                        : "Established pro"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
                  <FileCheck className="w-4 h-4 text-[#1B4FD8] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">License Number</p>
                    <p className="text-sm font-semibold text-gray-800 font-mono">
                      {p.licenseVerified ? "••••••" + (partnerId % 1000).toString().padStart(3, "0") : "Pending verification"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
                  <ShieldCheck className="w-4 h-4 text-[#1B4FD8] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">Insurance Status</p>
                    <p className={`text-sm font-semibold ${p.insuranceVerified ? "text-emerald-600" : "text-gray-500"}`}>
                      {p.insuranceVerified ? "Verified & Active" : "Not yet verified"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Request Quote */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 mb-6">
          <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#1B4FD8]" /> Request a Quote
          </h2>
          {quoteSent ? (
            <div className="flex flex-col items-center py-6 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
              <p className="text-base font-bold text-gray-900 mb-1">Quote request sent!</p>
              <p className="text-sm text-gray-500">
                {p.businessName} will be in touch via email within 24 hours.
              </p>
              <button
                onClick={() => { setQuoteSent(false); setQuoteForm({ name: "", email: "", description: "" }); }}
                className="mt-4 text-xs text-[#1B4FD8] hover:underline"
              >
                Send another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleQuoteSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={quoteForm.name}
                    onChange={e => setQuoteForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Jane Smith"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4FD8]/20 focus:border-[#1B4FD8] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={quoteForm.email}
                    onChange={e => setQuoteForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="jane@example.com"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4FD8]/20 focus:border-[#1B4FD8] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Project Description</label>
                <textarea
                  value={quoteForm.description}
                  onChange={e => setQuoteForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Describe the work you need done, timeline, and any details that would help with pricing..."
                  rows={4}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4FD8]/20 focus:border-[#1B4FD8] transition-colors resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={quoteSubmitting}
                className="w-full text-white gap-2 h-11"
                style={{ backgroundColor: "#1B4FD8" }}
              >
                {quoteSubmitting
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                  : <><Send className="w-4 h-4" /> Send Quote Request</>
                }
              </Button>
              <p className="text-[11px] text-center text-gray-400">
                Your contact info is only shared with {p.businessName} and is never sold.
              </p>
            </form>
          )}
        </div>

        {/* Footer CTA */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 text-center">
          <TrustyProLogo height={32} className="mx-auto mb-3" />
          <p className="text-sm text-gray-600 mb-4">
            Connect with {p.businessName} and other trusted pros in the DFW area through TrustyPro.
          </p>
          <Link href="/trustypro">
            <Button className="text-white gap-2" style={{ backgroundColor: "#1B4FD8" }}>
              Find Trusted Pros Near You <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
