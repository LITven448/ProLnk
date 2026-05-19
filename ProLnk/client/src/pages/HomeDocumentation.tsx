import React from 'react';
import { useState } from "react";
import { trpc } from "@/lib/trpc";

const NAVY = "#0A1628";
const GOLD = "#F5E642";
const GOLD_DIM = "#c4b830";
const CARD = "#111d33";
const BORDER = "#1e3052";
const TEXT_MUTED = "#7a9bb5";

export default function HomeDocumentation() {
  const [addressInput, setAddressInput] = useState("");
  const [checkedAddress, setCheckedAddress] = useState("");
  const [claimSuccess, setClaimSuccess] = useState(false);
  const [claimedAddress, setClaimedAddress] = useState("");

  const checkQuery = trpc.homeDocumentation.checkAddress.useQuery(
    { address: checkedAddress },
    { enabled: checkedAddress.length >= 5 }
  );

  const myHomes = trpc.homeDocumentation.getMyHomes.useQuery();

  const claimMutation = trpc.homeDocumentation.claimAddress.useMutation({
    onSuccess: () => {
      setClaimSuccess(true);
      setClaimedAddress(checkedAddress);
      myHomes.refetch();
    },
  });

  function handleCheck() {
    setClaimSuccess(false);
    setClaimedAddress("");
    setCheckedAddress(addressInput.trim());
  }

  function handleClaim() {
    if (!checkedAddress) return;
    claimMutation.mutate({ address: checkedAddress });
  }

  const checkResult = checkQuery.data;
  const alreadyYours = checkResult && !checkResult.available && checkResult.claimedBy === "you";
  const claimedByOther = checkResult && !checkResult.available && checkResult.claimedBy === "another_pro";
  const isAvailable = checkResult && checkResult.available;

  const homes = myHomes.data ?? [];
  const totalLifetimeEarnings = homes.reduce((sum: number, h: any) => sum + parseFloat(h.lifetime_earnings ?? "0"), 0);

  return (
    <div style={{ minHeight: "100vh", background: NAVY, color: "#e8f0fe", fontFamily: "'Inter', sans-serif", padding: "0 0 80px" }}>
      {/* Header */}
      <div style={{ background: CARD, borderBottom: `1px solid ${BORDER}`, padding: "24px 32px", display: "flex", alignItems: "center", gap: "16px" }}>
        <a href="/dashboard" style={{ color: TEXT_MUTED, textDecoration: "none", fontSize: "14px" }}>← Dashboard</a>
        <div style={{ width: "1px", height: "20px", background: BORDER }} />
        <div>
          <div style={{ fontSize: "22px", fontWeight: 700, color: "#fff" }}>Home Documentation</div>
          <div style={{ fontSize: "13px", color: TEXT_MUTED, marginTop: "2px" }}>Claim origination rights on homes you've worked at</div>
        </div>
      </div>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "40px 24px", display: "flex", flexDirection: "column", gap: "40px" }}>

        {/* Section 1: Claim Origination */}
        <section>
          <SectionLabel>Claim Origination Rights</SectionLabel>
          <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: "14px", padding: "32px" }}>
            <p style={{ color: TEXT_MUTED, fontSize: "14px", marginBottom: "24px", lineHeight: "1.6" }}>
              Enter the full service address below. If you're the first pro to document this property, you'll lock in permanent origination rights — earning <strong style={{ color: GOLD }}>1.5%</strong> of all future platform fees at that address.
            </p>

            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: TEXT_MUTED, marginBottom: "8px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Enter property address to claim or check status
            </label>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <input
                type="text"
                value={addressInput}
                onChange={e => setAddressInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addressInput.trim().length >= 5 && handleCheck()}
                placeholder="e.g. 4521 Maple St, Dallas, TX 75201"
                style={{
                  flex: "1 1 280px",
                  background: "#0d1e36",
                  border: `1px solid ${BORDER}`,
                  borderRadius: "8px",
                  color: "#fff",
                  padding: "12px 16px",
                  fontSize: "14px",
                  outline: "none",
                  minWidth: "220px",
                }}
              />
              <button
                onClick={handleCheck}
                disabled={addressInput.trim().length < 5}
                style={{
                  background: "#1e3a5f",
                  border: `1px solid ${BORDER}`,
                  color: "#fff",
                  borderRadius: "8px",
                  padding: "12px 22px",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: addressInput.trim().length < 5 ? "not-allowed" : "pointer",
                  opacity: addressInput.trim().length < 5 ? 0.5 : 1,
                  whiteSpace: "nowrap",
                }}
              >
                Check This Address
              </button>
            </div>

            {checkQuery.isLoading && checkedAddress && (
              <div style={{ marginTop: "20px", color: TEXT_MUTED, fontSize: "14px" }}>Checking address…</div>
            )}

            {checkResult && !checkQuery.isLoading && (
              <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
                {isAvailable && !claimSuccess && (
                  <>
                    <StatusBadge type="available">
                      ✓ Available — you can claim origination rights on this property
                    </StatusBadge>
                    <button
                      onClick={handleClaim}
                      disabled={claimMutation.isPending}
                      style={{
                        alignSelf: "flex-start",
                        background: GOLD,
                        border: "none",
                        color: "#0A1628",
                        borderRadius: "8px",
                        padding: "12px 28px",
                        fontSize: "14px",
                        fontWeight: 700,
                        cursor: claimMutation.isPending ? "not-allowed" : "pointer",
                        opacity: claimMutation.isPending ? 0.7 : 1,
                      }}
                    >
                      {claimMutation.isPending ? "Claiming…" : "Claim Origination Rights"}
                    </button>
                    {claimMutation.error && (
                      <div style={{ color: "#f87171", fontSize: "13px" }}>{claimMutation.error.message}</div>
                    )}
                  </>
                )}

                {claimSuccess && (
                  <>
                    <StatusBadge type="success">
                      ✓ Origination rights claimed on {claimedAddress}!
                    </StatusBadge>
                    <CommissionBreakdown />
                  </>
                )}

                {alreadyYours && !claimSuccess && (
                  <StatusBadge type="yours">
                    ✅ You own origination rights to this address
                  </StatusBadge>
                )}

                {claimedByOther && (
                  <StatusBadge type="taken">
                    This address is claimed by another partner
                  </StatusBadge>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Section 2: My Properties */}
        <section>
          <SectionLabel>My Properties</SectionLabel>
          <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: "14px", overflow: "hidden" }}>
            {myHomes.isLoading ? (
              <div style={{ padding: "32px", color: TEXT_MUTED, fontSize: "14px" }}>Loading your properties…</div>
            ) : homes.length === 0 ? (
              <div style={{ padding: "40px 32px", textAlign: "center" }}>
                <div style={{ fontSize: "36px", marginBottom: "12px" }}>🏠</div>
                <div style={{ color: "#fff", fontWeight: 600, marginBottom: "6px" }}>No properties claimed yet</div>
                <div style={{ color: TEXT_MUTED, fontSize: "14px" }}>Claim your first address above to start building passive origination income.</div>
              </div>
            ) : (
              <>
                {/* Summary bar */}
                <div style={{ padding: "16px 24px", background: "#0d1e36", borderBottom: `1px solid ${BORDER}`, display: "flex", gap: "32px", flexWrap: "wrap" }}>
                  <StatChip label="Properties Claimed" value={String(homes.length)} />
                  <StatChip label="Lifetime Origination Earnings" value={`$${totalLifetimeEarnings.toFixed(2)}`} highlight />
                  <StatChip label="Est. Annual Passive (avg 4 jobs)" value={`$${(homes.length * 30).toFixed(0)}/yr`} />
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${BORDER}`, background: "#0d1e36" }}>
                      {["Address", "Date Claimed", "Lifetime Earnings", "Jobs (est.)"].map(h => (
                        <th key={h} style={{ padding: "14px 20px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: TEXT_MUTED, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {homes.map((home: any, i: number) => {
                      const earnings = parseFloat(home.lifetime_earnings ?? "0");
                      const estimatedJobs = earnings > 0 ? Math.round(earnings / 7.5) : "—";
                      return (
                        <tr key={i} style={{ borderBottom: i < homes.length - 1 ? `1px solid ${BORDER}` : "none" }}>
                          <td style={{ padding: "16px 20px", fontSize: "14px", color: "#fff" }}>{home.property_address}</td>
                          <td style={{ padding: "16px 20px", fontSize: "13px", color: TEXT_MUTED, whiteSpace: "nowrap" }}>
                            {home.created_at ? new Date(home.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                          </td>
                          <td style={{ padding: "16px 20px", fontSize: "13px", color: earnings > 0 ? GOLD : TEXT_MUTED, fontWeight: earnings > 0 ? 600 : 400 }}>
                            {earnings > 0 ? `$${earnings.toFixed(2)}` : "$0.00"}
                          </td>
                          <td style={{ padding: "16px 20px", fontSize: "13px", color: TEXT_MUTED }}>
                            {estimatedJobs}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </section>

        {/* Section 3: What is Origination? */}
        <section>
          <SectionLabel>What is Origination?</SectionLabel>
          <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: "14px", padding: "32px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <p style={{ color: "#c8d8f0", fontSize: "15px", lineHeight: "1.7", margin: 0 }}>
              When you're the <strong style={{ color: "#fff" }}>first pro to document a property</strong> on ProLnk, you earn <strong style={{ color: GOLD }}>1.5% of every platform fee</strong> on jobs completed at that address — permanently. Even if another pro does the work years later, your origination right stays locked to you.
            </p>

            <div style={{ background: "#0d1e36", border: `1px solid ${BORDER}`, borderRadius: "10px", padding: "20px 24px" }}>
              <div style={{ fontSize: "12px", fontWeight: 700, color: TEXT_MUTED, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "14px" }}>Example Calculation</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  ["Job Value", "$5,000"],
                  ["Platform Fee (10%)", "$500"],
                  ["Your Origination Cut (1.5%)", "$7.50"],
                ].map(([label, value], i, arr) => (
                  <div key={label} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: i < arr.length - 1 ? "8px" : 0,
                    borderBottom: i < arr.length - 1 ? `1px solid ${BORDER}` : "none",
                  }}>
                    <span style={{ fontSize: "13px", color: TEXT_MUTED }}>{label}</span>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: i === arr.length - 1 ? GOLD : "#fff" }}>{value}</span>
                  </div>
                ))}
              </div>
              <p style={{ color: TEXT_MUTED, fontSize: "12px", margin: "14px 0 0", lineHeight: "1.5" }}>
                That's $7.50 per job, <em>forever</em>. A home that gets 4 jobs per year generates <strong style={{ color: GOLD_DIM }}>$30/year</strong> in passive income from a single address claim.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
              {[
                { icon: "🔒", title: "First-claim wins", desc: "First pro to document the address locks rights permanently — speed matters." },
                { icon: "♾️", title: "Forever earnings", desc: "Once claimed, your origination cut applies to every future job at that property." },
                { icon: "📈", title: "Compounds over time", desc: "More homes documented = more passive income streams running in the background." },
              ].map(card => (
                <div key={card.title} style={{ background: "#0d1e36", border: `1px solid ${BORDER}`, borderRadius: "10px", padding: "18px 20px" }}>
                  <div style={{ fontSize: "24px", marginBottom: "10px" }}>{card.icon}</div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>{card.title}</div>
                  <div style={{ fontSize: "12px", color: TEXT_MUTED, lineHeight: "1.5" }}>{card.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function CommissionBreakdown() {
  return (
    <div style={{ background: "#0d1e36", border: `1px solid rgba(245,230,66,0.25)`, borderRadius: "10px", padding: "20px 24px" }}>
      <div style={{ fontSize: "12px", fontWeight: 700, color: GOLD, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "14px" }}>
        Your Origination Income — Forever
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
          <span style={{ color: TEXT_MUTED }}>Your cut of every platform fee at this address</span>
          <span style={{ color: GOLD, fontWeight: 700 }}>1.5%</span>
        </div>
        <div style={{ height: "1px", background: BORDER }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
          <span style={{ color: TEXT_MUTED }}>Example: 4 jobs/year at $500 avg platform fee</span>
          <span style={{ color: "#fff", fontWeight: 600 }}>$30/year passive</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
          <span style={{ color: TEXT_MUTED }}>Per job earned</span>
          <span style={{ color: "#fff", fontWeight: 600 }}>$7.50</span>
        </div>
      </div>
      <p style={{ color: TEXT_MUTED, fontSize: "12px", margin: "14px 0 0", lineHeight: "1.5" }}>
        This right is permanent — no renewals, no expiry. Every future job at this address credits your account automatically.
      </p>
    </div>
  );
}

function StatChip({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <div style={{ fontSize: "11px", color: TEXT_MUTED, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>{label}</div>
      <div style={{ fontSize: "18px", fontWeight: 700, color: highlight ? GOLD : "#fff" }}>{value}</div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: "11px", fontWeight: 700, color: GOLD, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "14px" }}>
      {children}
    </div>
  );
}

function StatusBadge({ type, children }: { type: "available" | "success" | "yours" | "taken"; children: React.ReactNode }) {
  const styles: Record<string, { bg: string; color: string; border: string }> = {
    available: { bg: "rgba(34,197,94,0.1)", color: "#4ade80", border: "rgba(34,197,94,0.3)" },
    success: { bg: "rgba(245,230,66,0.1)", color: GOLD, border: "rgba(245,230,66,0.3)" },
    yours: { bg: "rgba(59,130,246,0.1)", color: "#60a5fa", border: "rgba(59,130,246,0.3)" },
    taken: { bg: "rgba(239,68,68,0.1)", color: "#f87171", border: "rgba(239,68,68,0.3)" },
  };
  const s = styles[type];
  return (
    <div style={{
      background: s.bg,
      border: `1px solid ${s.border}`,
      color: s.color,
      borderRadius: "8px",
      padding: "12px 16px",
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "1.5",
    }}>
      {children}
    </div>
  );
}
