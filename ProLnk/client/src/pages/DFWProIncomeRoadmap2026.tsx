import { useState } from 'react';

export default function DFWProIncomeRoadmap2026() {
  const [trade, setTrade] = useState<string>("");

  const roadmaps: Record<string, { projections: { year: string; income: string; milestone: string }[]; tip: string }> = {
    hvac: {
      projections: [
        { year: "Year 1″, income: "$8K–$18K", milestone: "Direct commissions + hit Tier 2 at 10 matches" },
        { year: "Year 2″, income: "$22K–$45K", milestone: "Network of 10–15 trades, subscription overrides add $3K+" },
        { year: "Year 3″, income: "$55K–$90K", milestone: "50+ network, Vault originations begin compounding" },
        { year: "Year 5″, income: "$120K–$200K", milestone: "Charter income fully vested, 4-level cascade paying out" },
      ],
      tip: "HVAC pros are the anchor trade — recruit electricians and plumbers naturally through job overlaps.",
    },
    plumbing: {
      projections: [
        { year: "Year 1″, income: "$7K–$16K", milestone: "Direct commissions + recruit 3 adjacent trades" },
        { year: "Year 2″, income: "$18K–$38K", milestone: "Network of 8–12, DFW water damage work drives volume" },
        { year: "Year 3″, income: "$48K–$80K", milestone: "Foundation partnership in DFW clay zones = bonus leads" },
        { year: "Year 5″, income: "$100K–$170K", milestone: "Charter tier locked, 4-level cascade compounding" },
      ],
      tip: "DFW plumbers: partner with foundation repair crews — slab leaks and foundation go hand in hand.",
    },
    electrical: {
      projections: [
        { year: "Year 1″, income: "$6K–$14K", milestone: "Panel upgrades + EV installs = premium match value" },
        { year: "Year 2″, income: "$16K–$34K", milestone: "Recruit solar and smart-home installers as network" },
        { year: "Year 3″, income: "$42K–$72K", milestone: "Growing network with HVAC and lighting contractors" },
        { year: "Year 5″, income: "$90K–$155K", milestone: "Charter locked, subscription overrides fully vested" },
      ],
      tip: "DFW electrical pros: new construction and remodel permits are booming — premium match fees available.",
    },
    roofing: {
      projections: [
        { year: "Year 1″, income: "$10K–$22K", milestone: "Storm season drives match volume — recruit gutters, siding" },
        { year: "Year 2″, income: "$28K–$55K", milestone: "Network of 12–18, hail season creates surges" },
        { year: "Year 3″, income: "$65K–$110K", milestone: "50+ network, origination rights on DFW homes building" },
        { year: "Year 5″, income: "$140K–$240K", milestone: "Charter + storm cycle = exceptional income compound" },
      ],
      tip: "DFW roofers: hail season creates the highest match fees of any trade. Charter timing is critical.",
    },
  };

  const tiers = [
    { tier: "Tier 1″, matches: "0–9", commission: "12%" },
    { tier: "Tier 2″, matches: "10–49", commission: "20%" },
    { tier: "Tier 3″, matches: "50–99", commission: "35%" },
    { tier: "Tier 4″, matches: "100+", commission: "50%" },
  ];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>💰</div>
          <h1 style={{ color: "#F5E642″, fontSize: 28, fontWeight: 800, margin: "8px 0 4px" }}>
            DFW Pro Income Roadmap 2026
          </h1>
          <p style={{ color: "#94A3B8″, fontSize: 15 }}>How DFW service pros build real wealth through ProLnk — 5-year path.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28 }}>
          {tiers.map((t) => (
            <div key={t.tier} style={{ background: "#1E2D45″, borderRadius: 10, padding: "12px 16px" }}>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 13 }}>{t.tier}</div>
              <div style={{ color: "#94A3B8″, fontSize: 11 }}>{t.matches} matches</div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 20, marginTop: 4 }}>{t.commission}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1E2D45″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: 12 }}>🔧 Your primary trade?</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[["hvac", "❄️ HVAC"], ["plumbing", "💧 Plumbing"], ["electrical", "⚡ Electrical"], ["roofing", "🪵 Roofing"]].map(([val, label]) => (
              <button key={val} onClick={() => setTrade(val)} style={{
                padding: "10px 0″, borderRadius: 8, border: "none", cursor: "pointer",
                background: trade === val ? "#F5E642″ : "#0A1628",
                color: trade === val ? "#0A1628″ : "#94A3B8",
                fontWeight: 700, fontSize: 13,
              }}>{label}</button>
            ))}
          </div>
        </div>

        {trade && roadmaps[trade] && (
          <div style={{ background: "#132137″, borderRadius: 12, padding: 20, marginBottom: 24, border: "1px solid #F5E642" }}>
            <div style={{ color: "#F5E642″, fontWeight: 800, fontSize: 15, marginBottom: 14 }}>📅 Your 5-Year ProLnk Roadmap</div>
            {roadmaps[trade].projections.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
                <div style={{ background: "#F5E642″, color: "#0A1628", borderRadius: 6, padding: "4px 10px", fontWeight: 800, fontSize: 12, whiteSpace: "nowrap" }}>{p.year}</div>
                <div>
                  <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 14 }}>{p.income}</div>
                  <div style={{ color: "#94A3B8″, fontSize: 12 }}>{p.milestone}</div>
                </div>
              </div>
            ))}
            <div style={{ background: "#0A1628″, borderRadius: 8, padding: 12, marginTop: 8 }}>
              <div style={{ color: "#F5E642″, fontSize: 12, fontWeight: 700 }}>💡 DFW Tip</div>
              <div style={{ color: "#CBD5E1″, fontSize: 12, marginTop: 4 }}>{roadmaps[trade].tip}</div>
            </div>
          </div>
        )}

        <div style={{ background: "#F5E642″, borderRadius: 12, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 28 }}>🏆</div>
          <div style={{ color: "#0A1628″, fontWeight: 800, fontSize: 16, marginTop: 8 }}>Charter Closes at 500</div>
          <div style={{ color: "#1E2D45″, fontSize: 13, marginTop: 6 }}>Charter members lock in the best network position forever. First movers own the DFW network income for life.</div>
        </div>
      </div>
    </div>
  );
}
