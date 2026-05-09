import { useEffect } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { TrendingUp, Users, Home, Camera, Copy, CheckCircle, Star } from "lucide-react";
import { useState } from "react";
import CommissionPreview from "@/components/CommissionPreview";
import OnboardingChecklist from "@/components/OnboardingChecklist";

export default function PartnerHome() {
  const { user } = useAuth({ redirectOnUnauthenticated: true });
  const [copied, setCopied] = useState(false);

  const { data: status } = trpc.proWaitlist.getWaitlistStatus.useQuery(
    { email: user?.email ?? "" },
    { enabled: !!user?.email }
  );
  const { data: leaderboard } = trpc.proWaitlist.getLeaderboard.useQuery();

  const referralLink = status?.referralCode
    ? `${typeof window !== "undefined" ? window.location.origin : "https://prolnk.io"}/apply?ref=${status.referralCode}`
    : "";

  function copyLink() {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const NAVY = "#0A1628";
  const GOLD = "#F5E642";

  return (
    <div style={{ minHeight: "100vh", background: "#F0F2F5", fontFamily: "'Inter', system-ui" }}>
      {/* Top bar */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E9ECEF", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: NAVY, margin: 0 }}>
            Welcome back, {user?.name?.split(" ")[0] || "Partner"} 👋
          </h1>
          {status && (
            <p style={{ fontSize: 13, color: "#7B809A", margin: "4px 0 0" }}>
              Position #{status.position} · {status.tierLabel} · {status.referralCount} referrals
            </p>
          )}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <Link href="/photo-upload">
            <button style={{ display: "flex", alignItems: "center", gap: 8, background: NAVY, color: "#fff", border: "none", borderRadius: 12, padding: "10px 20px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
              <Camera style={{ width: 16, height: 16 }} /> Upload Photos
            </button>
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>

        {/* Stat cards */}
        {[
          { label: "Waitlist Position", value: status ? `#${status.position}` : "—", sub: status?.tierLabel || "Loading...", icon: Star, color: "#E8A020" },
          { label: "My Referrals", value: status?.referralCount ?? 0, sub: `${status?.spotsRemaining?.charter || 0} Charter spots left`, icon: Users, color: "#3B82F6" },
          { label: "Total Network", value: leaderboard?.totalSignups || 0, sub: "Founding Network signups", icon: TrendingUp, color: "#10B981" },
        ].map(stat => (
          <div key={stat.label} style={{ background: "#fff", borderRadius: 16, border: "1px solid #E9ECEF", padding: "24px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: "#7B809A" }}>{stat.label}</span>
              <stat.icon style={{ width: 18, height: 18, color: stat.color }} />
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: NAVY }}>{typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}</div>
            <div style={{ fontSize: 12, color: "#7B809A", marginTop: 4 }}>{stat.sub}</div>
          </div>
        ))}

        {/* Referral link */}
        <div style={{ gridColumn: "1 / -1", background: NAVY, borderRadius: 16, padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ color: GOLD, fontWeight: 700, fontSize: 14, marginBottom: 8 }}>Your Referral Link</p>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginBottom: 12 }}>
              Share this link to recruit other pros. Every person who joins through your link builds your network income.
            </p>
            <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 16px", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontFamily: "monospace", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {referralLink || "Loading your referral link..."}
              </span>
              <button onClick={copyLink} style={{ background: copied ? "#10B981" : GOLD, color: NAVY, border: "none", borderRadius: 8, padding: "6px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", gap: 6 }}>
                {copied ? <><CheckCircle style={{ width: 14, height: 14 }} /> Copied!</> : <><Copy style={{ width: 14, height: 14 }} /> Copy</>}
              </button>
            </div>
          </div>
          <Link href="/waitlist-status">
            <button style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12, padding: "12px 20px", fontWeight: 600, fontSize: 14, cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap" }}>
              Full Dashboard →
            </button>
          </Link>
        </div>

        {/* Commission preview */}
        <div style={{ gridColumn: "1 / 2" }}>
          <CommissionPreview partnerEmail={user?.email} />
        </div>

        {/* Onboarding checklist */}
        <div style={{ gridColumn: "2 / -1" }}>
          <OnboardingChecklist
            homeCount={0}
            referralCount={status?.referralCount || 0}
            completedSteps={[]}
          />
        </div>

        {/* Leaderboard */}
        {leaderboard?.leaders && leaderboard.leaders.length > 0 && (
          <div style={{ gridColumn: "1 / -1", background: "#fff", borderRadius: 16, border: "1px solid #E9ECEF", padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: NAVY, marginBottom: 16 }}>Top Referrers</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {leaderboard.leaders.slice(0, 5).map((leader, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", background: i === 0 ? "#FFF9E6" : "#F9FAFB", borderRadius: 10, border: `1px solid ${i === 0 ? "#FBD34D" : "#E5E7EB"}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: i === 0 ? "#B45309" : "#6B7280", width: 24 }}>#{i + 1}</span>
                    <div>
                      <span style={{ fontSize: 14, fontWeight: 600, color: NAVY }}>{leader.name}</span>
                      <span style={{ fontSize: 12, color: "#7B809A", marginLeft: 8 }}>{leader.trade} · {leader.city}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#10B981" }}>{leader.referralCount} referrals</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
