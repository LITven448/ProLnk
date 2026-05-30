import { useState } from 'react';

const trades = ["HVAC", "Plumbing", "Electrical", "Roofing", "Foundation", "General Contractor"];
const years = [1, 2, 3, 5];

type YearData = { direct: string; network: string; total: string; note: string };
type TradeProjections = Record<number, YearData>;
type AllProjections = Record<string, TradeProjections>;

const projections: AllProjections = {
  HVAC: {
    1: { direct: "$18,000–$32,000", network: "$0–$2,400", total: "$18,000–$34,400", note: "Year 1 is about building your job volume. Network income begins when you recruit 2–3 pros." },
    2: { direct: "$28,000–$48,000", network: "$4,800–$12,000", total: "$32,800–$60,000", note: "Tier 2 unlocks at 10 matches. Your recruited pros start generating override income." },
    3: { direct: "$38,000–$65,000", network: "$12,000–$28,000", total: "$50,000–$93,000", note: "Tier 3 at 50 matches. Network compounding becomes meaningful. Some pros exceed $100K total." },
    5: { direct: "$52,000–$90,000", network: "$28,000–$72,000", total: "$80,000–$162,000", note: "Tier 4/5 range. A 20-pro network at this stage generates $3,000–$6,000/mo in passive override income." }
  },
  Plumbing: {
    1: { direct: "$22,000–$38,000", network: "$0–$2,400", total: "$22,000–$40,400", note: "Plumbers command higher per-job value in DFW. Faster path to Tier 2." },
    2: { direct: "$34,000–$56,000", network: "$4,800–$14,400", total: "$38,800–$70,400", note: "Emergency call volume accelerates match count. Network income begins meaningfully." },
    3: { direct: "$46,000–$75,000", network: "$14,400–$30,000", total: "$60,400–$105,000", note: "Plumbers often hit Tier 3 faster due to repeat homeowner relationships via Vault." },
    5: { direct: "$60,000–$100,000", network: "$30,000–$80,000", total: "$90,000–$180,000", note: "Top plumbers in the network at 5 years routinely exceed $150K combined income." }
  },
  Electrical: {
    1: { direct: "$20,000–$35,000", network: "$0–$2,400", total: "$20,000–$37,400", note: "Panel upgrades and EV chargers drive higher per-job commissions in DFW 2026." },
    2: { direct: "$30,000–$52,000", network: "$4,800–$13,200", total: "$34,800–$65,200", note: "Commercial/residential hybrid pros advance fastest. Network income begins." },
    3: { direct: "$42,000–$70,000", network: "$13,200–$28,000", total: "$55,200–$98,000", note: "EV charger demand in DFW suburbs makes electricians highest-demand trade 2024–2028." },
    5: { direct: "$56,000–$92,000", network: "$28,000–$75,000", total: "$84,000–$167,000", note: "5-year electricians in the network consistently earn in the $120K–$160K range total." }
  },
  Roofing: {
    1: { direct: "$25,000–$45,000", network: "$0–$2,400", total: "$25,000–$47,400", note: "DFW hail season creates massive volume spikes. Year 1 can be exceptionally strong post-storm." },
    2: { direct: "$35,000–$60,000", network: "$4,800–$15,000", total: "$39,800–$75,000", note: "Roofers who build networks during storm season grow income fast in Year 2." },
    3: { direct: "$45,000–$80,000", network: "$15,000–$32,000", total: "$60,000–$112,000", note: "Consistent roofers at Tier 3 with a 10-pro network are common by year 3." },
    5: { direct: "$55,000–$95,000", network: "$32,000–$85,000", total: "$87,000–$180,000", note: "Roofing has the highest variance — storm cycles matter. Top earners exceed $200K." }
  },
  Foundation: {
    1: { direct: "$20,000–$36,000", network: "$0–$2,400", total: "$20,000–$38,400", note: "Foundation jobs are high-value but lower volume. Year 1 income is solid and predictable." },
    2: { direct: "$30,000–$52,000", network: "$4,800–$12,000", total: "$34,800–$64,000", note: "Referral relationships with HVAC and plumbing pros in the network accelerate match volume." },
    3: { direct: "$40,000–$68,000", network: "$12,000–$26,000", total: "$52,000–$94,000", note: "Foundation pros often recruit from adjacent trades — strong network builders." },
    5: { direct: "$52,000–$88,000", network: "$26,000–$70,000", total: "$78,000–$158,000", note: "Foundation pros at 5 years with active networks earn $120K–$150K total consistently." }
  },
  "General Contractor": {
    1: { direct: "$22,000–$40,000", network: "$0–$3,600", total: "$22,000–$43,600", note: "GCs have access to all trade categories — highest opportunity for match volume from day one." },
    2: { direct: "$36,000–$62,000", network: "$7,200–$18,000", total: "$43,200–$80,000", note: "GCs recruit from multiple trades. Fastest network income growth of any trade." },
    3: { direct: "$50,000–$82,000", network: "$18,000–$40,000", total: "$68,000–$122,000", note: "Multi-trade network compound effect. GC pros consistently lead income rankings at year 3." },
    5: { direct: "$65,000–$105,000", network: "$40,000–$95,000", total: "$105,000–$200,000", note: "Top GC pros in the network at year 5 are the highest earners on the platform. $200K+ is achievable." }
  }
};

export default function DFWProLnkCharterIncome2026() {
  const [trade, setTrade] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const projection = trade && year ? projections[trade]?.[year] : null;

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>💼</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642", marginBottom: 8 }}>Charter Tier Income Projection Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>What DFW Charter pros realistically earn — by trade and year</p>
          <div style={{ background: "#1a2744", borderRadius: 8, padding: 12, marginTop: 16, display: "inline-block" }}>
            <span style={{ color: "#F5E642", fontSize: 13 }}>🔒 Charter Tier: $149/mo locked forever · 60% commission kept · 5-stream income</span>
          </div>
        </div>
        <div style={{ marginBottom: 28 }}>
          <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 10 }}>SELECT YOUR TRADE</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {trades.map(t => (
              <button key={t} onClick={() => setTrade(trade === t ? null : t)}
                style={{ background: trade === t ? "#F5E642" : "#0f1f3d", color: trade === t ? "#0A1628" : "#fff", border: `2px solid ${trade === t ? "#F5E642" : "#1e3a5f"}`, borderRadius: 8, padding: "10px 18px", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
                {t}
              </button>
            ))}
          </div>
        </div>
        {trade && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 10 }}>SELECT YEAR</div>
            <div style={{ display: "flex", gap: 10 }}>
              {years.map(y => (
                <button key={y} onClick={() => setYear(year === y ? null : y)}
                  style={{ background: year === y ? "#F5E642" : "#0f1f3d", color: year === y ? "#0A1628" : "#fff", border: `2px solid ${year === y ? "#F5E642" : "#1e3a5f"}`, borderRadius: 8, padding: "10px 22px", cursor: "pointer", fontWeight: 700, fontSize: 16 }}>
                  Year {y}
                </button>
              ))}
            </div>
          </div>
        )}
        {projection && trade && year && (
          <div style={{ background: "#1a2744", border: "2px solid #F5E642", borderRadius: 16, padding: 28 }}>
            <h2 style={{ color: "#F5E642", fontSize: 20, marginBottom: 20 }}>{trade} · Year {year} Projection</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div style={{ background: "#0A1628", borderRadius: 8, padding: 16, textAlign: "center" }}>
                <div style={{ color: "#94a3b8", fontSize: 12, marginBottom: 6 }}>DIRECT COMMISSIONS</div>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>{projection.direct}</div>
              </div>
              <div style={{ background: "#0A1628", borderRadius: 8, padding: 16, textAlign: "center" }}>
                <div style={{ color: "#94a3b8", fontSize: 12, marginBottom: 6 }}>NETWORK INCOME</div>
                <div style={{ color: "#F5E642", fontWeight: 800, fontSize: 16 }}>{projection.network}</div>
              </div>
              <div style={{ background: "#0A1628", borderRadius: 8, padding: 16, textAlign: "center" }}>
                <div style={{ color: "#94a3b8", fontSize: 12, marginBottom: 6 }}>TOTAL COMBINED</div>
                <div style={{ color: "#4ade80", fontWeight: 800, fontSize: 16 }}>{projection.total}</div>
              </div>
            </div>
            <p style={{ color: "#94a3b8", fontStyle: "italic", lineHeight: 1.7 }}>{projection.note}</p>
            <div style={{ marginTop: 20, textAlign: "center" }}>
              <a href="https://prolnk.io" style={{ background: "#F5E642", color: "#0A1628", fontWeight: 800, padding: "12px 28px", borderRadius: 8, textDecoration: "none", fontSize: 15 }}>Join Charter — prolnk.io</a>
            </div>
          </div>
        )}
        {!trade && <div style={{ textAlign: "center", color: "#64748b", marginTop: 24 }}>Select your trade above to see your income projection</div>}
        <div style={{ textAlign: "center", marginTop: 40, color: "#475569", fontSize: 13 }}>ProLnk.io · Charter Tier Income Guide 2026 · DFW Home Services · Projections are estimates based on platform averages</div>
      </div>
    </div>
  );
}
