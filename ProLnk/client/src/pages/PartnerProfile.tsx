import { useParams, Link } from "wouter";
import { useState } from "react";
import ProLnkLogo from "@/components/ProLnkLogo";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Star, MapPin, Shield, CheckCircle, Globe, Award, Users,
  Phone, Mail, ArrowLeft, BadgeCheck, Clock, Heart
} from "lucide-react";

const TIER_COLORS: Record<string, string> = {
  Scout: "text-gray-700 bg-gray-100 border-gray-300",
  Pro: "text-blue-700 bg-blue-100 border-blue-300",
  Crew: "text-[#0A1628] bg-[#0A1628]/10 border-[#0A1628]/30",
  Company: "text-purple-700 bg-purple-100 border-purple-300",
  Enterprise: "text-yellow-700 bg-yellow-100 border-yellow-300",
  Bronze: "text-amber-700 bg-amber-100 border-amber-300",
  Silver: "text-slate-700 bg-slate-100 border-slate-300",
  Gold: "text-yellow-700 bg-yellow-100 border-yellow-300",
  Platinum: "text-purple-700 bg-purple-100 border-purple-300",
};

const BADGE_COLORS: Record<string, string> = {
  None: "text-gray-500 bg-gray-100",
  Bronze: "text-amber-700 bg-amber-100",
  Silver: "text-slate-600 bg-slate-100",
  Gold: "text-yellow-700 bg-yellow-100",
  Platinum: "text-purple-700 bg-purple-100",
};

const VERIFICATION_LABELS: Record<string, string> = {
  licenseVerified: "Business License",
  insuranceVerified: "Liability Insurance",
  backgroundCheckVerified: "Background Check",
  businessRegistrationVerified: "Business Registration",
  referencesVerified: "References",
  portfolioVerified: "Portfolio",
  identityVerified: "Identity",
};

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sz = size === "lg" ? "w-6 h-6" : size === "md" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${sz} ${i <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`}
        />
      ))}
    </div>
  );
}

function SaveFavoriteButton({ partnerId }: { partnerId: number }) {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const addFav = trpc.homeownerExtras.saveFavorite.useMutation({
    onSuccess: () => { setSaved(true); toast.success("Saved to your Pros list!"); },
    onError: () => toast.error("Could not save — please try again"),
  });
  if (!user) return null;
  return (
    <Button
      variant="outline"
      className={`w-full mt-2 gap-2 ${ saved ? "text-rose-600 border-rose-300" : "text-gray-600" }`}
      onClick={() => !saved && addFav.mutate({ partnerId })}
      disabled={saved || addFav.isPending}
    >
      <Heart className={`w-4 h-4 ${ saved ? "fill-rose-500 text-rose-500" : "" }`} />
      {saved ? "Saved to My Pros" : "Save to My Pros"}
    </Button>
  );
}

export default function PartnerProfile() {
  const params = useParams<{ id: string }>();
  const partnerId = parseInt(params.id ?? "0", 10);

  const { data, isLoading, error } = trpc.directory.getPublicProfile.useQuery(
    { partnerId },
    { enabled: !isNaN(partnerId) && partnerId > 0 }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0A1628] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading partner profile...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">[SEARCH]</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Partner Not Found</h1>
          <p className="text-gray-500 mb-6">This partner profile doesn't exist or is not yet approved.</p>
          <Link href="/">
            <Button variant="outline"> Back to ProLnk</Button>
          </Link>
        </div>
      </div>
    );
  }

  const { partner, reviews, avgRating } = data;

  // -- Wave 19: SEO metadata --------------------------------------------------
  const siteOrigin = typeof window !== "undefined" ? window.location.origin : "https://prolnk.io";
  const canonicalUrl = `${siteOrigin}/partner/${partnerId}`;
  const siteName = "ProLnk";
  const logoUrl = `${siteOrigin}/prolnk-og.png`; // OG image for social sharing

  const pageTitle = [
    partner.businessName,
    partner.serviceCategory ?? partner.businessType ?? "Home Services",
    partner.city ? `in ${partner.city}` : "DFW Area",
    "| ProLnk Verified Pro",
  ].filter(Boolean).join(" ");

  const rawDescription = partner.description?.trim();
  const autoDescription = `${partner.businessName} is a ProLnk Verified Pro offering ${
    partner.serviceCategory ?? partner.businessType ?? "home services"
  } in the ${partner.city ?? "DFW"} area. ${
    avgRating ? `Rated ${avgRating.toFixed(1)}/5 by ${reviews.length} homeowner${reviews.length !== 1 ? "s" : ""}.` : ""
  } View certifications, reviews, and request a free quote.`;
  const pageDescription = rawDescription
    ? rawDescription.length > 155 ? rawDescription.slice(0, 152) + "\u2026" : rawDescription
    : autoDescription.slice(0, 155);

  const structuredData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: partner.businessName,
    description: pageDescription,
    url: canonicalUrl,
    ...(partner.phone ? { telephone: partner.phone } : {}),
    ...(partner.website ? { sameAs: [partner.website] } : {}),
    ...(partner.city ? { address: { "@type": "PostalAddress", addressLocality: partner.city, addressRegion: "TX", addressCountry: "US" } } : {}),
    ...(avgRating && reviews?.length ? { aggregateRating: { "@type": "AggregateRating", ratingValue: avgRating.toFixed(1), reviewCount: reviews.length, bestRating: "5", worstRating: "1" } } : {}),
    memberOf: { "@type": "Organization", name: "ProLnk Verified Pro Network", url: siteOrigin },
  };
  // -- End SEO ----------------------------------------------------------------

  const verifiedCheckpoints = Object.entries(VERIFICATION_LABELS).filter(
    ([key]) => partner[key as keyof typeof partner]
  );
  const totalCheckpoints = Object.keys(VERIFICATION_LABELS).length;
  const trustScore = partner.trustScore ?? 0;
  const badgeLevel = partner.badgeLevel ?? "None";
  const isVerified = verifiedCheckpoints.length >= 3;

  return (
    <>
      <Helmet>
        {/* Primary */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        {/* Open Graph */}
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:image" content={logoUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={logoUrl} />
        {/* Robots */}
        <meta name="robots" content="index, follow" />
        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
        <div className="container flex items-center justify-between h-14">
          <Link href="/">
            <ProLnkLogo height={30} variant="light" className="cursor-pointer" />
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-gray-500 gap-1">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
          </Link>
        </div>
      </nav>

      <div className="container max-w-4xl py-10 space-y-6">
        {/* Hero Card */}
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-br from-teal-600 to-teal-800 p-8 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-4xl font-bold text-white shrink-0">
                {partner.businessName?.charAt(0) ?? "P"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold">{partner.businessName}</h1>
                  {isVerified && (
                    <span className="flex items-center gap-1 bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                      <BadgeCheck className="w-3.5 h-3.5" /> Verified
                    </span>
                  )}
                </div>
                <p className="text-teal-100 text-sm mb-3">{partner.businessType}</p>
                <div className="flex flex-wrap gap-2">
                  {partner.tier && (
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${TIER_COLORS[partner.tier] ?? "text-gray-600 bg-gray-100"}`}>
                      {partner.tier} Partner
                    </span>
                  )}
                  {badgeLevel !== "None" && (
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${BADGE_COLORS[badgeLevel]}`}>
                       {badgeLevel} Trust Badge
                    </span>
                  )}
                </div>
              </div>
              {/* Rating summary */}
              {avgRating !== null && (
                <div className="shrink-0 text-center bg-white/10 rounded-xl px-5 py-3">
                  <div className="text-3xl font-bold">{avgRating.toFixed(1)}</div>
                  <StarRating rating={avgRating} size="sm" />
                  <div className="text-teal-200 text-xs mt-1">{reviews.length} review{reviews.length !== 1 ? "s" : ""}</div>
                </div>
              )}
            </div>
          </div>
          <CardContent className="p-6 grid sm:grid-cols-3 gap-4">
            {partner.serviceArea && (
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0A1628] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Service Area</p>
                  <p className="text-sm text-gray-700">{partner.serviceArea}</p>
                </div>
              </div>
            )}
            {partner.referralCount > 0 && (
              <div className="flex items-start gap-2">
                <Users className="w-4 h-4 text-[#0A1628] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Referrals Generated</p>
                  <p className="text-sm text-gray-700">{partner.referralCount.toLocaleString()}</p>
                </div>
              </div>
            )}
            {partner.approvedAt && (
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#0A1628] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Member Since</p>
                  <p className="text-sm text-gray-700">{new Date(partner.approvedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Verification Checkpoints */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#0A1628]" /> Trust Verification
                </h2>
                <span className="text-sm font-semibold text-[#0A1628]">{trustScore}/100</span>
              </div>
              {/* Trust score bar */}
              <div className="w-full bg-gray-100 rounded-full h-2 mb-4 overflow-hidden">
                <div
                  className="bg-[#0A1628] h-2 rounded-full transition-all duration-700"
                  style={{ width: `${trustScore}%` }}
                />
              </div>
              <div className="space-y-2">
                {Object.entries(VERIFICATION_LABELS).map(([key, label]) => {
                  const passed = !!partner[key as keyof typeof partner];
                  return (
                    <div key={key} className="flex items-center gap-2">
                      <CheckCircle className={`w-4 h-4 shrink-0 ${passed ? "text-[#0A1628]" : "text-gray-200"}`} />
                      <span className={`text-sm ${passed ? "text-gray-800" : "text-gray-400"}`}>{label}</span>
                      {passed && <span className="ml-auto text-xs text-[#0A1628] font-medium"></span>}
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-gray-400 mt-4">{verifiedCheckpoints.length} of {totalCheckpoints} checkpoints verified</p>
            </CardContent>
          </Card>

          {/* About + Contact */}
          <div className="space-y-4">
            {partner.description && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#0A1628]" /> About
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">{partner.description}</p>
                </CardContent>
              </Card>
            )}
            {partner.serviceArea && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#0A1628]" /> Service Area Map
                  </h2>
                  <div className="rounded-lg overflow-hidden border border-gray-100" style={{ height: 200 }}>
                    <iframe
                      title="Service Area Map"
                      width="100%"
                      height="200"
                      frameBorder="0"
                      style={{ border: 0 }}
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(partner.serviceArea)}&output=embed&z=11`}
                      allowFullScreen
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2 text-center">{partner.serviceArea}</p>
                </CardContent>
              </Card>
            )}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-[#0A1628]" /> Contact
                </h2>
                <div className="space-y-3">
                  {partner.website && (
                    <a
                      href={partner.website.startsWith("http") ? partner.website : `https://${partner.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-[#0A1628] hover:text-teal-800 transition-colors"
                    >
                      <Globe className="w-4 h-4" /> {partner.website}
                    </a>
                  )}
                  <Link href="/apply">
                    <Button className="w-full bg-[#0A1628] hover:bg-teal-700 text-white mt-2">
                      Request a Quote
                    </Button>
                  </Link>
                  <SaveFavoriteButton partnerId={partnerId} />
                  <p className="text-xs text-gray-400 text-center">Powered by ProLnk Partner Network</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reviews */}
        {reviews.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" /> Customer Reviews
                </h2>
                {avgRating !== null && (
                  <div className="flex items-center gap-2">
                    <StarRating rating={avgRating} size="md" />
                    <span className="font-bold text-gray-900">{avgRating.toFixed(1)}</span>
                    <span className="text-gray-400 text-sm">({reviews.length})</span>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                {reviews.map((review: any, i: number) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#0A1628]/10 flex items-center justify-center text-sm font-bold text-[#0A1628]">
                          {review.homeownerName?.charAt(0) ?? "H"}
                        </div>
                        <span className="text-sm font-medium text-gray-800">
                          {review.homeownerName ?? "Homeowner"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <StarRating rating={review.rating} size="sm" />
                        <span className="text-xs text-gray-400">
                          {new Date(review.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                        </span>
                      </div>
                    </div>
                    {review.reviewText && (
                      <p className="text-sm text-gray-600 leading-relaxed">{review.reviewText}</p>
                    )}
                    {(review.ratingQuality || review.ratingPunctuality || review.ratingCommunication || review.ratingValue) && (
                      <div className="flex flex-wrap gap-3 mt-3">
                        {[
                          { label: "Quality", val: review.ratingQuality },
                          { label: "Punctuality", val: review.ratingPunctuality },
                          { label: "Communication", val: review.ratingCommunication },
                          { label: "Value", val: review.ratingValue },
                        ].filter(s => s.val).map(s => (
                          <div key={s.label} className="flex items-center gap-1 text-xs text-gray-500">
                            <span>{s.label}:</span>
                            <StarRating rating={s.val} size="sm" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {reviews.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Star className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">No reviews yet -- be the first to work with this partner.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
    </>
  );
}
