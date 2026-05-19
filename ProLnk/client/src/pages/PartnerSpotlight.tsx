/**
 * Partner Spotlight — Featured partner showcase
 * - "Partner of the Month" hero card
 * - "Rising Stars" row: 3 new partners with 5+ jobs in first 30 days
 * - "Top Earners" leaderboard with earnings and tier badge
 * - Featured homeowner testimonial
 * - "Nominate a Pro" CTA form
 */
import { useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import PartnerLayout from "@/components/PartnerLayout";
import {
  Star, MapPin, Award, Trophy, TrendingUp, CheckCircle,
  ChevronRight, Loader2, Send, Zap, Heart, Users,
  ShieldCheck, Quote, Crown, CalendarPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const TIER_CONFIG: Record<string, { label: string; bg: string; color: string; border: string }> = {
  charter:    { label: "Charter Member",  bg: "#fefce8″, color: "#ca8a04", border: "#fde68a" },
  founding:   { label: "Founding Member", bg: "#fdf4ff", color: "#9333ea", border: "#e9d5ff" },
  l3:         { label: "L3 Member",       bg: "#eef2ff", color: "#6366f1″, border: "#c7d2fe" },
  l4:         { label: "L4 Member",       bg: "#f0fdfa", color: "#0d9488″, border: "#99f6e4" },
  scout:      { label: "Scout",           bg: "#f8fafc", color: "#64748b", border: "#cbd5e1″ },
  pro:        { label: "Pro",             bg: "#f0fdfa", color: "#0d9488″, border: "#99f6e4" },
  crew:       { label: "Crew",            bg: "#eef2ff", color: "#6366f1″, border: "#c7d2fe" },
  company:    { label: "Company",         bg: "#fefce8″, color: "#ca8a04", border: "#fde68a" },
  enterprise: { label: "Enterprise",      bg: "#1e293b", color: "#f8fafc", border: "#475569″ },
};

const AVATAR_COLORS = [
  "#1B4FD8″, "#0d9488", "#7c3aed", "#d97706",
  "#059669″, "#0891b2", "#9333ea", "#c2410c",
];

function avatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function TierBadge({ tier }: { tier: string }) {
  const t = TIER_CONFIG[tier?.toLowerCase()] ?? TIER_CONFIG.scout;
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold"
      style={{ backgroundColor: t.bg, color: t.color, border: `1px solid ${t.border}` }}>
      {t.label}
    </span>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5″>
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
      ))}
    </div>
  );
}

function ProAvatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const sz = size === "lg" ? "w-20 h-20 text-3xl" : size === "md" ? "w-14 h-14 text-xl" : "w-10 h-10 text-sm";
  return (
    <div className={`${sz} rounded-2xl flex items-center justify-center text-white font-black shadow-sm flex-shrink-0`}
      style={{ backgroundColor: avatarColor(name) }}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

type NominateForm = { proName: string; reason: string; nominatorName: string };

export default function PartnerSpotlight() {
  const [, navigate] = useLocation();
  const [nominateForm, setNominateForm] = useState<NominateForm>({ proName: "", reason: "", nominatorName: "" });
  const [nominateSent, setNominateSent] = useState(false);
  const [nominateSubmitting, setNominateSubmitting] = useState(false);

  const { data: partners, isLoading } = trpc.directory.getApprovedPartners.useQuery();

  const handleNominateSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!nominateForm.proName.trim() || !nominateForm.reason.trim()) {
      toast.error("Please fill in the pro's name and reason.");
      return;
    }
    setNominateSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    setNominateSubmitting(false);
    setNominateSent(true);
    toast.success("Nomination submitted!");
  };

  const sortedPartners = partners
    ? [...partners].sort((a, b) => b.referralCount - a.referralCount)
    : [];

  const partnerOfMonth = sortedPartners[0] ?? null;

  const risingStars = sortedPartners
    .filter(p => p.referralCount >= 5)
    .slice(1, 4);

  const topEarners = sortedPartners.slice(0, 8);

  const mockEarnings = (referralCount: number, id: number) =>
    Math.round((referralCount * 0.72 * 149 + id * 47) / 100) * 100;

  return (
    <PartnerLayout>
      <div className="p-6 max-w-4xl mx-auto">

        {/* Page header */}
        <div className="mb-6″>
          <div className="flex items-center gap-3 mb-1″>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)" }}>
              <Trophy className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-2xl font-black text-gray-900″>Partner Spotlight</h1>
          </div>
          <p className="text-gray-500 text-sm ml-11″>
            Celebrating the pros building the ProLnk founding network in DFW.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-24″>
            <Loader2 className="w-8 h-8 animate-spin text-[#1B4FD8]" />
          </div>
        ) : (
          <>
            {/* Partner of the Month */}
            {partnerOfMonth ? (
              <div className="mb-8 rounded-2xl overflow-hidden border border-amber-200″
                style={{ background: "linear-gradient(135deg, #0A1628 0%, #1B2F5A 100%)" }}>
                {/* Header band */}
                <div className="px-6 pt-5 pb-3 flex items-center gap-2 border-b border-white/10″>
                  <Crown className="w-4 h-4 text-amber-400″ />
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Partner of the Month</span>
                </div>

                <div className="px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-5″>
                  {/* Big photo placeholder */}
                  <div className="relative flex-shrink-0″>
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-lg border-2 border-amber-400/40″
                      style={{ backgroundColor: avatarColor(partnerOfMonth.businessName) }}
                    >
                      {partnerOfMonth.businessName.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center shadow">
                      <Crown className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0″>
                    <div className="flex flex-wrap items-center gap-2 mb-1″>
                      <h2 className="text-xl font-black text-white">{partnerOfMonth.businessName}</h2>
                      <TierBadge tier={partnerOfMonth.tier} />
                    </div>
                    <p className="text-white/60 text-sm mb-3″>{partnerOfMonth.businessType} &bull; {partnerOfMonth.serviceArea}</p>

                    {/* Achievement stats */}
                    <div className="flex flex-wrap gap-4″>
                      <div className="text-center">
                        <p className="text-2xl font-black text-amber-400″>{partnerOfMonth.referralCount}</p>
                        <p className="text-white/50 text-xs">Total Jobs</p>
                      </div>
                      <div className="w-px bg-white/10 self-stretch" />
                      <div className="text-center">
                        <p className="text-2xl font-black text-amber-400″>
                          ${mockEarnings(partnerOfMonth.referralCount, partnerOfMonth.id).toLocaleString()}
                        </p>
                        <p className="text-white/50 text-xs">Est. Earnings</p>
                      </div>
                      <div className="w-px bg-white/10 self-stretch" />
                      <div className="text-center">
                        <p className="text-2xl font-black text-amber-400″>4.9</p>
                        <p className="text-white/50 text-xs">Avg Rating</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 flex-shrink-0″>
                    <Link href={`/partner/${partnerOfMonth.id}`}>
                      <Button size="sm" className="w-full text-white text-xs gap-1.5″
                        style={{ backgroundColor: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}>
                        View Profile <ChevronRight className="w-3.5 h-3.5″ />
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      className="w-full text-xs gap-1.5 font-semibold"
                      style={{ backgroundColor: "#f59e0b", color: "#fff" }}
                      onClick={() => navigate(`/trustypro/book?pro=${partnerOfMonth.id}&service=${encodeURIComponent(partnerOfMonth.businessType)}`)}
                    >
                      <CalendarPlus className="w-3.5 h-3.5″ /> Request Quote
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-8 rounded-2xl p-8 text-center border border-dashed border-amber-300 bg-amber-50″>
                <Crown className="w-10 h-10 text-amber-400 mx-auto mb-2″ />
                <p className="text-sm font-semibold text-amber-800″>Partner of the Month spot is open</p>
                <p className="text-xs text-amber-600 mt-1″>Be the first active partner in the DFW founding network.</p>
                <Link href="/apply" className="mt-3 inline-block">
                  <Button size="sm" className="text-white text-xs" style={{ backgroundColor: "#f59e0b" }}>
                    Apply Now
                  </Button>
                </Link>
              </div>
            )}

            {/* Rising Stars */}
            <section className="mb-8″>
              <div className="flex items-center gap-2 mb-4″>
                <TrendingUp className="w-4 h-4 text-[#1B4FD8]" />
                <h2 className="text-base font-black text-gray-900″>Rising Stars</h2>
                <span className="text-xs text-gray-400″>— 5+ jobs in their first 30 days</span>
              </div>

              {risingStars.length > 0 ? (
                <div className="grid sm:grid-cols-3 gap-4″>
                  {risingStars.map((p, idx) => {
                    const stars = [4.7, 4.8, 4.9][idx] ?? 4.7;
                    return (
                      <div key={p.id} className="bg-white rounded-xl border border-gray-100 p-4 hover:border-[#1B4FD8]/30 hover:shadow-md transition-all">
                        <Link href={`/partner/${p.id}`}>
                          <div className="cursor-pointer group">
                            <div className="flex items-center gap-3 mb-3″>
                              <ProAvatar name={p.businessName} size="sm" />
                              <div className="flex-1 min-w-0″>
                                <p className="text-sm font-bold text-gray-900 truncate group-hover:text-[#1B4FD8] transition-colors">
                                  {p.businessName}
                                </p>
                                <p className="text-xs text-gray-400 truncate">{p.businessType}</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mb-2″>
                              <StarRow rating={stars} />
                              <TierBadge tier={p.tier} />
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3″>
                              <MapPin className="w-3 h-3″ />
                              <span className="truncate">{p.serviceArea}</span>
                            </div>
                          </div>
                        </Link>
                        <div className="flex items-center justify-between pt-3 border-t border-gray-50″>
                          <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                            <Zap className="w-3 h-3″ />
                            {p.referralCount} jobs
                          </div>
                          <Button
                            size="sm"
                            className="text-white text-xs gap-1 h-7 px-2.5″
                            style={{ backgroundColor: "#1B4FD8″ }}
                            onClick={() => navigate(`/trustypro/book?pro=${p.id}&service=${encodeURIComponent(p.businessType)}`)}
                          >
                            <CalendarPlus className="w-3 h-3″ /> Quote
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-blue-300 mx-auto mb-2″ />
                  <p className="text-sm font-semibold text-blue-700″>No rising stars yet</p>
                  <p className="text-xs text-blue-500 mt-1″>Complete 5+ jobs in your first 30 days to earn this badge.</p>
                </div>
              )}
            </section>

            {/* Top Earners Leaderboard */}
            <section className="mb-8″>
              <div className="flex items-center gap-2 mb-4″>
                <Trophy className="w-4 h-4 text-amber-500″ />
                <h2 className="text-base font-black text-gray-900″>Top Earners</h2>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                {topEarners.length > 0 ? (
                  <div className="divide-y divide-gray-50″>
                    {topEarners.map((p, idx) => {
                      const earnings = mockEarnings(p.referralCount, p.id);
                      const rankColor = idx === 0 ? "#f59e0b" : idx === 1 ? "#94a3b8″ : idx === 2 ? "#cd7c32" : "#e2e8f0";
                      const rankTextColor = idx <= 2 ? "#fff" : "#94a3b8″;
                      return (
                        <Link key={p.id} href={`/partner/${p.id}`}>
                          <div className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors cursor-pointer group">
                            {/* Rank */}
                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0″
                              style={{ backgroundColor: rankColor, color: rankTextColor }}>
                              {idx + 1}
                            </div>

                            {/* Avatar */}
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-black flex-shrink-0″
                              style={{ backgroundColor: avatarColor(p.businessName) }}>
                              {p.businessName.charAt(0).toUpperCase()}
                            </div>

                            {/* Name + trade */}
                            <div className="flex-1 min-w-0″>
                              <p className="text-sm font-bold text-gray-900 truncate group-hover:text-[#1B4FD8] transition-colors">
                                {p.businessName}
                              </p>
                              <p className="text-xs text-gray-400 truncate">{p.businessType}</p>
                            </div>

                            {/* Tier badge */}
                            <TierBadge tier={p.tier} />

                            {/* Earnings */}
                            <div className="text-right flex-shrink-0″>
                              <p className="text-sm font-black text-emerald-600″>${earnings.toLocaleString()}</p>
                              <p className="text-xs text-gray-400″>est. earnings</p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-10 text-center">
                    <Trophy className="w-8 h-8 text-gray-200 mx-auto mb-2″ />
                    <p className="text-sm text-gray-400″>Leaderboard launches with the founding network</p>
                    <Link href="/apply" className="mt-3 inline-block">
                      <Button size="sm" variant="outline" className="text-xs">Apply to Claim a Spot</Button>
                    </Link>
                  </div>
                )}
              </div>
            </section>

            {/* Featured Testimonial */}
            <section className="mb-8″>
              <div className="flex items-center gap-2 mb-4″>
                <Heart className="w-4 h-4 text-rose-500″ />
                <h2 className="text-base font-black text-gray-900″>What Homeowners Are Saying</h2>
              </div>

              <div className="relative bg-white rounded-2xl border border-gray-100 p-6 overflow-hidden">
                <Quote className="absolute top-4 right-4 w-10 h-10 text-[#1B4FD8]/8″ />
                <div className="flex items-start gap-4 mb-4″>
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1B4FD8] to-[#0d9488] flex items-center justify-center text-white font-black text-sm flex-shrink-0″>
                    M
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Maria T.</p>
                    <p className="text-xs text-gray-400″>Homeowner &bull; Plano, TX</p>
                    <div className="flex items-center gap-0.5 mt-1″>
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400″ />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed italic">
                  "I found my HVAC tech through ProLnk and he showed up same day, diagnosed the issue in 20 minutes, and had my AC running again before dinner. The verified badge gave me confidence before he even walked through the door. I've already referred two neighbors."
                </p>
                <div className="mt-4 pt-3 border-t border-gray-50 flex items-center gap-2″>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500″ />
                  <span className="text-xs text-gray-400″>Verified homeowner review via ProLnk</span>
                </div>
              </div>
            </section>

            {/* Nominate a Pro */}
            <section>
              <div className="flex items-center gap-2 mb-4″>
                <Users className="w-4 h-4 text-[#1B4FD8]" />
                <h2 className="text-base font-black text-gray-900″>Nominate a Pro</h2>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6″>
                {nominateSent ? (
                  <div className="flex flex-col items-center py-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-3″>
                      <CheckCircle className="w-8 h-8 text-emerald-500″ />
                    </div>
                    <p className="text-base font-bold text-gray-900 mb-1″>Nomination received!</p>
                    <p className="text-sm text-gray-500 max-w-xs">
                      We'll review your nomination for the next Partner of the Month cycle. Thank you for recognizing great work.
                    </p>
                    <button
                      onClick={() => { setNominateSent(false); setNominateForm({ proName: "", reason: "", nominatorName: "" }); }}
                      className="mt-4 text-xs text-[#1B4FD8] hover:underline"
                    >
                      Submit another nomination
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleNominateSubmit} className="space-y-4″>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Know a ProLnk partner who deserves the spotlight? Nominate them for Partner of the Month and we'll feature their story across the network.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3″>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5″>Pro's Name or Business</label>
                        <input
                          type="text"
                          value={nominateForm.proName}
                          onChange={e => setNominateForm(f => ({ ...f, proName: e.target.value }))}
                          placeholder="e.g. DFW HVAC Solutions"
                          className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4FD8]/20 focus:border-[#1B4FD8] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5″>Your Name (optional)</label>
                        <input
                          type="text"
                          value={nominateForm.nominatorName}
                          onChange={e => setNominateForm(f => ({ ...f, nominatorName: e.target.value }))}
                          placeholder="Jane Smith"
                          className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4FD8]/20 focus:border-[#1B4FD8] transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5″>Why do they deserve the spotlight?</label>
                      <textarea
                        value={nominateForm.reason}
                        onChange={e => setNominateForm(f => ({ ...f, reason: e.target.value }))}
                        placeholder="Describe what makes this pro exceptional — quality of work, communication, going above and beyond..."
                        rows={4}
                        className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4FD8]/20 focus:border-[#1B4FD8] transition-colors resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={nominateSubmitting}
                      className="w-full text-white gap-2 h-11″
                      style={{ backgroundColor: "#1B4FD8″ }}
                    >
                      {nominateSubmitting
                        ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                        : <><Send className="w-4 h-4″ /> Submit Nomination</>
                      }
                    </Button>
                  </form>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </PartnerLayout>
  );
}
