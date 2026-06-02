import React from 'react';
import { useState } from "react";
import AdminLayout, { T, BADGE_GRADIENTS, FONT, MONO } from "@/components/AdminLayout";
import { Lock, Crown, DollarSign, Users, Network, TrendingUp, Info } from "lucide-react";

const TIERS = [
  {
    label: "Charter",
    slots: 25,
    monthly: "$149/mo",
    locked: true,
    jobPct: 7,
    subPct: 12,
    networkCascade: [7, 4, 2, 1],
    gradient: BADGE_GRADIENTS.orange,
    accentColor: "#FBB140",
    avgEarnings: "$2,100/mo",
    topEarner: "$5,800/mo",
    tierSize: 25,
  },
  {
    label: "Founding",
    slots: 100,
    monthly: "$149/mo",
    locked: true,
    jobPct: 7,
    subPct: 12,
    networkCascade: [7, 4, 2, 1],
    gradient: BADGE_GRADIENTS.purple,
    accentColor: "#0D9488",
    avgEarnings: "$1,750/mo",
    topEarner: "$4,200/mo",
    tierSize: 100,
  },
  {
    label: "Level 3",
    slots: 400,
    monthly: "$149/mo",
    locked: false,
    jobPct: 7,
    subPct: 12,
    networkCascade: [7, 4, 2, 1],
    gradient: BADGE_GRADIENTS.blue,
    accentColor: T.blue,
    avgEarnings: "$1,200/mo",
    topEarner: "$3,100/mo",
    tierSize: 400,
  },
  {
    label: "Level 4",
    slots: 1600,
    monthly: "$149/mo",
    locked: false,
    jobPct: 7,
    subPct: 12,
    networkCascade: [7, 4, 2, 1],
    gradient: BADGE_GRADIENTS.teal,
    accentColor: T.accent,
    avgEarnings: "$840/mo",
    topEarner: "$2,400/mo",
    tierSize: 1600,
  },
];

const CASCADE_LEVELS = [
  { level: "L1 — Direct recruit",       pct: "7%",   color: T.accent,  width: "100%" },
  { level: "L2 — Their recruits",        pct: "4%",   color: T.blue,    width: "72%" },
  { level: "L3 — One more down",         pct: "2%",   color: T.purple,  width: "50%" },
  { level: "L4 — Network deep",          pct: "1%",   color: T.amber,   width: "30%" },
];

const CARD: React.CSSProperties = {
  background: T.surface,
  borderRadius: 16,
  border: `1px solid ${T.border}`,
  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
  fontFamily: FONT,
};

function fmtDollars(n: number) {
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export default function CommissionStrategy() {
  const [jobValue, setJobValue] = useState(5000);
  const [tierIdx, setTierIdx] = useState(0);
  const [depth, setDepth] = useState(0);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const tier = TIERS[tierIdx];
  const directCommission = jobValue * (tier.jobPct / 100);
  const networkBonus = depth > 0 ? jobValue * (tier.networkCascade[depth - 1] ?? 0) / 100 : 0;
  const subOverride = 149 * (tier.subPct / 100);
  const totalEstimate = directCommission + networkBonus;

  return (
    <AdminLayout>
      <div style={{ background: T.bg, minHeight: "100vh", padding: "24px 32px", fontFamily: FONT }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: BADGE_GRADIENTS.purple, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <DollarSign style={{ color: "#fff", width: 20, height: 20 }} />
            </div>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: T.text, margin: 0 }}>Commission Strategy</h1>
              <p style={{ fontSize: 13, color: T.muted, margin: 0 }}>Network rate structure · 4-tier cascade</p>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <button
              onMouseEnter={() => setTooltipVisible(true)}
              onMouseLeave={() => setTooltipVisible(false)}
              style={{
                padding: "10px 20px", borderRadius: 10, border: `1.5px solid ${T.border}`,
                background: T.bg, color: T.muted, fontSize: 13, fontWeight: 600,
                cursor: "not-allowed", display: "flex", alignItems: "center", gap: 8, fontFamily: FONT,
                opacity: 0.7,
              }}
            >
              <Lock style={{ width: 14, height: 14 }} /> Update Rates
            </button>
            {tooltipVisible && (
              <div style={{
                position: "absolute", top: "100%", right: 0, marginTop: 6, zIndex: 100,
                background: T.text, color: "#fff", fontSize: 12, padding: "8px 14px",
                borderRadius: 8, whiteSpace: "nowrap", fontFamily: FONT, fontWeight: 500,
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
              }}>
                <Info style={{ width: 12, height: 12, display: "inline", marginRight: 4 }} />
                Locked until 500 partners on platform
              </div>
            )}
          </div>
        </div>

        {/* Tier cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 28 }}>
          {TIERS.map((t, i) => (
            <div key={t.label} style={{ ...CARD, padding: 0, overflow: "hidden" }}>
              <div style={{ height: 6, background: t.gradient }} />
              <div style={{ padding: "18px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: T.text }}>{t.label}</div>
                    <div style={{ fontSize: 12, color: T.muted }}>{t.slots.toLocaleString()} slots</div>
                  </div>
                  {t.locked ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#FFF8E6", color: T.amber, padding: "3px 8px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>
                      <Lock style={{ width: 10, height: 10 }} /> Locked
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#F0FAF0", color: T.green, padding: "3px 8px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>
                      Open
                    </div>
                  )}
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: t.accentColor, marginBottom: 4 }}>{t.monthly}</div>
                <div style={{ fontSize: 11, color: T.muted, marginBottom: 14 }}>locked monthly fee</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                    <span style={{ color: T.muted }}>Job commission</span>
                    <span style={{ fontWeight: 700, color: T.text }}>{t.jobPct}%</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                    <span style={{ color: T.muted }}>Sub override</span>
                    <span style={{ fontWeight: 700, color: T.text }}>{t.subPct}%</span>
                  </div>
                  <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 6, marginTop: 2 }}>
                    <div style={{ fontSize: 11, color: T.muted, marginBottom: 4, fontWeight: 600 }}>Network cascade</div>
                    <div style={{ display: "flex", gap: 6 }}>
                      {t.networkCascade.map((pct, lvl) => (
                        <span key={lvl} style={{ background: `${t.accentColor}18`, color: t.accentColor, fontSize: 11, fontWeight: 700, padding: "2px 6px", borderRadius: 6 }}>
                          L{lvl + 1}: {pct}%
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>

          {/* Commission simulator */}
          <div style={{ ...CARD, padding: 28 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 20 }}>Commission Simulator</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Job value slider */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>Job Value</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: T.accent, fontFamily: MONO }}>{fmtDollars(jobValue)}</span>
                </div>
                <input
                  type="range" min={0} max={20000} step={250} value={jobValue}
                  onChange={e => setJobValue(Number(e.target.value))}
                  style={{ width: "100%", accentColor: T.accent, cursor: "pointer" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: T.dim }}>
                  <span>$0</span><span>$20K</span>
                </div>
              </div>

              {/* Tier slider */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>Partner Tier</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: TIERS[tierIdx].accentColor, fontFamily: MONO }}>{TIERS[tierIdx].label}</span>
                </div>
                <input
                  type="range" min={0} max={3} step={1} value={tierIdx}
                  onChange={e => setTierIdx(Number(e.target.value))}
                  style={{ width: "100%", accentColor: TIERS[tierIdx].accentColor, cursor: "pointer" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: T.dim }}>
                  {TIERS.map(t => <span key={t.label}>{t.label}</span>)}
                </div>
              </div>

              {/* Referral depth slider */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>Referral Depth</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: T.blue, fontFamily: MONO }}>Level {depth}</span>
                </div>
                <input
                  type="range" min={0} max={4} step={1} value={depth}
                  onChange={e => setDepth(Number(e.target.value))}
                  style={{ width: "100%", accentColor: T.blue, cursor: "pointer" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: T.dim }}>
                  <span>Direct</span><span>L1</span><span>L2</span><span>L3</span><span>L4</span>
                </div>
              </div>
            </div>

            {/* Calculated breakdown */}
            <div style={{ marginTop: 24, background: T.bg, borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 14 }}>Estimated Commission Breakdown</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: T.muted }}>Direct job commission ({tier.jobPct}%)</span>
                  <span style={{ fontWeight: 700, color: T.green, fontFamily: MONO }}>{fmtDollars(directCommission)}</span>
                </div>
                {depth > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                    <span style={{ color: T.muted }}>Network override (L{depth} · {tier.networkCascade[depth - 1]}%)</span>
                    <span style={{ fontWeight: 700, color: T.blue, fontFamily: MONO }}>{fmtDollars(networkBonus)}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: T.muted }}>Sub override (per referral · {tier.subPct}%)</span>
                  <span style={{ fontWeight: 700, color: T.purple, fontFamily: MONO }}>{fmtDollars(subOverride)}</span>
                </div>
                <div style={{ borderTop: `2px solid ${T.border}`, paddingTop: 10, marginTop: 4, display: "flex", justifyContent: "space-between", fontSize: 16 }}>
                  <span style={{ fontWeight: 700, color: T.text }}>Total Estimate</span>
                  <span style={{ fontWeight: 800, color: T.accent, fontFamily: MONO }}>{fmtDollars(totalEstimate + subOverride)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Network cascade tree */}
          <div style={{ ...CARD, padding: 28 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 8 }}>Network Cascade Visualization</div>
            <div style={{ fontSize: 12, color: T.muted, marginBottom: 24 }}>% of job value earned per referral depth</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {CASCADE_LEVELS.map((lvl, i) => (
                <div key={i}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: T.text }}>{lvl.level}</span>
                    <span style={{ fontSize: 13, fontWeight: 800, color: lvl.color, fontFamily: MONO }}>{lvl.pct}</span>
                  </div>
                  <div style={{ background: T.bg, borderRadius: 6, height: 24, overflow: "hidden" }}>
                    <div style={{
                      width: lvl.width, height: "100%", background: lvl.color,
                      borderRadius: 6, transition: "width 0.4s ease",
                      display: "flex", alignItems: "center", paddingLeft: 10,
                    }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>{lvl.pct}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, background: T.accentBg, borderRadius: 12, padding: 16, border: `1px solid ${T.accent}30` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.accent, marginBottom: 6 }}>Network depth example</div>
              <div style={{ fontFamily: MONO, fontSize: 11, color: T.text, lineHeight: 1.8 }}>
                You → [7%] → Partner A<br />
                Partner A → [4%] → Partner B<br />
                Partner B → [2%] → Partner C<br />
                Partner C → [1%] → Partner D
              </div>
            </div>
          </div>
        </div>

        {/* Revenue impact table */}
        <div style={{ ...CARD, padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px 12px", borderBottom: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.text }}>Revenue Impact by Tier</div>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: T.bg }}>
                {["Tier", "Avg Monthly Earnings", "Top Earner", "Tier Size", "Est. Monthly Volume"].map(h => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TIERS.map((tier, i) => {
                const avgNum = parseInt(tier.avgEarnings.replace(/[$,\/mo]/g, ""));
                const totalVol = avgNum * tier.tierSize;
                return (
                  <tr key={i} style={{ borderTop: `1px solid ${T.border}` }}>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: tier.accentColor }} />
                        <span style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{tier.label}</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: T.green }}>{tier.avgEarnings}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: tier.accentColor, fontWeight: 700 }}>{tier.topEarner}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: T.text }}>{tier.tierSize.toLocaleString()}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: T.text, fontFamily: MONO }}>{fmtDollars(totalVol)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </AdminLayout>
  );
}
