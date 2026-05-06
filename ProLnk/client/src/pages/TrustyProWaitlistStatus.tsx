import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { TrustyProLogo } from "@/components/TrustyProLogo";
import { CheckCircle, Share2, Copy, ArrowLeft, Users, Star, Zap, Clock } from "lucide-react";
import { toast } from "sonner";

const ACCENT = "#00B5B8";
const NAVY = "#1e3a5f";

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    pending: { label: "On Waitlist", color: "#0891b2", bg: "#E0F7FA" },
    approved: { label: "Approved", color: "#059669", bg: "#D1FAE5" },
    invited: { label: "Invited to Join", color: "#7c3aed", bg: "#EDE9FE" },
    rejected: { label: "Not Eligible", color: "#dc2626", bg: "#FEE2E2" },
  };
  const s = map[status] ?? map.pending;
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{ color: s.color, backgroundColor: s.bg }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
      {s.label}
    </span>
  );
}

function PositionMeter({ position, total }: { position: number; total: number }) {
  const pct = total > 0 ? Math.max(2, Math.round(((total - position + 1) / total) * 100)) : 50;
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-500 mb-1.5">
        <span>Position #{position}</span>
        <span>{total} total</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
        <div
          className="h-3 rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${NAVY}, ${ACCENT})` }}
        />
      </div>
      <p className="text-xs text-gray-400 mt-1">You're ahead of {Math.max(0, total - position)} homeowners</p>
    </div>
  );
}

export default function TrustyProWaitlistStatus() {
  const [email, setEmail] = useState(() => {
    try { return new URLSearchParams(window.location.search).get("email") || ""; } catch { return ""; }
  });
  const [query, setQuery] = useState(email);
  const [submitted, setSubmitted] = useState(!!email);

  const { data, isLoading, error } = trpc.waitlist.getWaitlistStatus.useQuery(
    { email: query },
    { enabled: submitted && !!query, retry: false }
  );

  const referralUrl = data?.referralCode
    ? `${window.location.origin}/trustypro/waitlist?ref=${data.referralCode}`
    : "";

  const copyLink = () => {
    if (!referralUrl) return;
    navigator.clipboard.writeText(referralUrl);
    toast.success("Referral link copied to clipboard!");
  };

  const shareLink = async () => {
    if (!referralUrl) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join me on TrustyPro",
          text: `I'm on the TrustyPro waitlist — the smarter way to find trusted home pros. Join me!`,
          url: referralUrl,
        });
      } catch { /* user cancelled */ }
    } else {
      copyLink();
    }
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setQuery(email.trim());
    setSubmitted(true);
  };

  const isVIP = data && data.position <= 100;

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0fdf4 100%)" }}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link href="/trustypro">
            <TrustyProLogo className="h-7" />
          </Link>
          <Link href="/trustypro" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-600 mb-4 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-indigo-500" />
            Waitlist Status
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Check Your Spot</h1>
          <p className="text-gray-500 text-sm">Enter your email to see your position and referral link.</p>
        </div>

        {/* Lookup form */}
        {!submitted || !data ? (
          <form onSubmit={handleLookup} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300 mb-4"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: ACCENT }}
            >
              {isLoading ? "Looking up..." : "Check My Status"}
            </button>
            {submitted && !isLoading && !data && !error && (
              <p className="text-center text-xs text-gray-400 mt-3">No waitlist entry found for this email.</p>
            )}
            {error && (
              <p className="text-center text-xs text-red-500 mt-3">Something went wrong. Please try again.</p>
            )}
          </form>
        ) : null}

        {/* Status card */}
        {data && (
          <div className="space-y-4">
            {/* VIP badge */}
            {isVIP && (
              <div className="bg-gradient-to-r from-amber-400 to-yellow-500 rounded-2xl p-4 text-center shadow-sm">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Star className="w-5 h-5 text-white fill-white" />
                  <p className="text-white font-bold text-base">Founding Member #{data.position}</p>
                  <Star className="w-5 h-5 text-white fill-white" />
                </div>
                <p className="text-amber-100 text-xs">You're among the first 100 homeowners on TrustyPro. Your spot is locked.</p>
              </div>
            )}

            {/* Main status card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-lg font-bold text-gray-900">Hey, {data.firstName}!</p>
                    <p className="text-sm text-gray-500">{data.city}, {data.state} {data.zipCode}</p>
                  </div>
                  <StatusBadge status={data.status} />
                </div>
                <PositionMeter position={data.position} total={data.total} />
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 divide-x divide-gray-100">
                <div className="p-4 text-center">
                  <p className="text-2xl font-black text-indigo-600">#{data.position}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Position</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-2xl font-black text-green-600">{data.referralCount}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Referrals</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-2xl font-black text-amber-600">{data.priorityScore}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Priority Score</p>
                </div>
              </div>
            </div>

            {/* Launch market */}
            {data.launchMarket && (
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-center gap-3">
                <Zap className="w-5 h-5 text-indigo-500 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-indigo-800">Launch Market: {data.launchMarket}</p>
                  <p className="text-xs text-indigo-500 mt-0.5">We'll notify you as soon as we launch in your area.</p>
                </div>
              </div>
            )}

            {/* Referral section */}
            {referralUrl && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-green-600" />
                  <p className="font-bold text-gray-900">Refer Neighbors — Move Up the List</p>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Every neighbor you refer earns you <strong>+10 priority points</strong> and moves you closer to the front of the line. They also get +5 points for joining through your link.
                </p>

                {/* Referral code display */}
                <div className="bg-gray-50 rounded-xl p-3 mb-4">
                  <p className="text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wide">Your Referral Code</p>
                  <p className="font-mono font-bold text-lg text-indigo-600">{data.referralCode}</p>
                </div>

                {/* Referral link */}
                <div className="bg-gray-50 rounded-xl p-3 mb-4">
                  <p className="text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wide">Your Referral Link</p>
                  <p className="text-xs text-gray-600 break-all font-mono">{referralUrl}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={copyLink}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Copy className="w-4 h-4" /> Copy Link
                  </button>
                  <button
                    onClick={shareLink}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: ACCENT }}
                  >
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                </div>
              </div>
            )}

            {/* Projects */}
            {data.desiredProjects?.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <p className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Projects You're Waiting On
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.desiredProjects.map((p: string) => (
                    <span key={p} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium border border-indigo-100">{p}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Look up different email */}
            <button
              onClick={() => { setSubmitted(false); setQuery(""); setEmail(""); }}
              className="w-full py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors"
            >
              Look up a different email
            </button>
          </div>
        )}

        {/* CTA to join if not found */}
        {submitted && !isLoading && !data && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <p className="text-gray-500 text-sm mb-4">We couldn't find a waitlist entry for <strong>{query}</strong>.</p>
            <Link href="/trustypro/waitlist">
              <button className="px-6 py-3 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: ACCENT }}>
                Join the Waitlist
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
