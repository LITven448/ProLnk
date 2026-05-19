import { Link } from "wouter";
import { trpc } from "../utils/trpc";

const comparison = [
  { feature: "Monthly price", charter: "$149 locked forever", founding: "$149 locked", l3: "$149″, l4: "$149" },
  { feature: "Cascade depth", charter: "4 levels", founding: "4 levels", l3: "4 levels", l4: "4 levels" },
  { feature: "Origination rights", charter: "1.5%", founding: "1.0%", l3: "0%", l4: "0%" },
  { feature: "Priority dispatch", charter: "Highest", founding: "High", l3: "Normal", l4: "Normal" },
  { feature: "Charter badge", charter: "✓", founding: "✗", l3: "✗", l4: "✗" },
];

function calcIncome(jobs: number, recruits: number, homes: number) {
  const directCommission = jobs * 14000 * 0.10 * 0.72;
  const networkOverride = recruits * (jobs * 14000 * 0.10) * 0.07;
  const origination = homes * 2 * 800 * 0.015;
  return Math.round(directCommission + networkOverride + origination);
}

export default function CharterNetworkGuide() {
  const countsQuery = trpc.waitlist?.getPublicCounts?.useQuery?.();
  const spotsLeft = countsQuery?.data?.charterSpotsRemaining ?? 25;
  const spotsUsed = 25 - spotsLeft;

  const monthlyIncome = calcIncome(25, 25, 100);

  return (
    <div style={{ background: "#FAFAF9″, minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Hero */}
      <div style={{ background: "#0F2D52″, padding: "64px 24px 56px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#F5C842″, color: "#0F2D52", fontWeight: 700, fontSize: 12, letterSpacing: 2, padding: "4px 14px", borderRadius: 20, marginBottom: 20, textTransform: "uppercase" }}>
          Founding Network
        </div>
        <h1 style={{ color: "#fff", fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, margin: "0 auto 20px", maxWidth: 720, lineHeight: 1.2 }}>
          Charter Membership: The 25 Spots That Define the Network
        </h1>
        <p style={{ color: "#CBD5E1″, fontSize: 18, maxWidth: 600, margin: "0 auto 32px" }}>
          The first 25 approved partners set the standard for everything that follows.
          Charter membership is permanent — and <strong style={{ color: "#F5C842″ }}>never offered again.</strong>
        </p>
        {/* Spot counter */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 16, background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "16px 28px" }}>
          <div>
            <div style={{ fontSize: 36, fontWeight: 900, color: "#F5C842″, lineHeight: 1 }}>{spotsLeft}</div>
            <div style={{ color: "#94A3B8″, fontSize: 13, marginTop: 4 }}>Charter spots remaining</div>
          </div>
          <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.2)" }} />
          <div>
            <div style={{ fontSize: 36, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{spotsUsed}</div>
            <div style={{ color: "#94A3B8″, fontSize: 13, marginTop: 4 }}>already claimed</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "56px 24px" }}>

        {/* What Charter Means */}
        <h2 style={{ color: "#0F2D52″, fontSize: 26, fontWeight: 700, marginBottom: 20 }}>What Charter Means</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 48 }}>
          {[
            { icon: "🏅", title: "First 25″, desc: "First 25 approved partners in the ProLnk network. Reviewed individually." },
            { icon: "🔒", title: "$149 Forever", desc: "Monthly rate locked permanently. Price increases never apply to Charter members." },
            { icon: "🌊", title: "Full 4-Level Cascade", desc: "Earn override income 4 levels deep through your recruited network." },
            { icon: "🏠", title: "1.5% Origination", desc: "Highest origination rate available. Earn forever from every home you add to the vault." },
            { icon: "⚡", title: "Priority Dispatch", desc: "Highest-priority lead routing. Charter members receive storm and high-value leads first." },
            { icon: "🎖", title: "Charter Badge", desc: "Permanent Charter badge on your partner profile. Visible to all homeowners and pros." },
          ].map((item) => (
            <div key={item.title} style={{ background: "#fff", border: "1.5px solid #E2E8F0″, borderRadius: 12, padding: "24px 20px" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: "#0F2D52″, fontSize: 15, marginBottom: 6 }}>{item.title}</div>
              <div style={{ color: "#64748B", fontSize: 13, lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <h2 style={{ color: "#0F2D52″, fontSize: 26, fontWeight: 700, marginBottom: 20 }}>Charter vs. Later Tiers</h2>
        <div style={{ overflowX: "auto", marginBottom: 48 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 12, overflow: "hidden", border: "1.5px solid #E2E8F0″ }}>
            <thead>
              <tr style={{ background: "#0F2D52″ }}>
                <th style={{ padding: "14px 18px", textAlign: "left", color: "#94A3B8″, fontWeight: 600, fontSize: 13 }}>Feature</th>
                {["Charter", "Founding", "L3″, "L4"].map((h, i) => (
                  <th key={h} style={{ padding: "14px 18px", textAlign: "center", color: i === 0 ? "#F5C842″ : "#CBD5E1", fontWeight: i === 0 ? 800 : 600, fontSize: 13 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, ri) => (
                <tr key={row.feature} style={{ background: ri % 2 === 0 ? "#fff" : "#F8FAFC", borderBottom: "1px solid #E2E8F0″ }}>
                  <td style={{ padding: "13px 18px", color: "#475569″, fontSize: 14, fontWeight: 600 }}>{row.feature}</td>
                  {[row.charter, row.founding, row.l3, row.l4].map((val, ci) => (
                    <td key={ci} style={{ padding: "13px 18px", textAlign: "center", fontSize: 14, fontWeight: ci === 0 ? 700 : 400, color: ci === 0 ? "#0F2D52″ : val === "✗" || val === "0%" || val === "Normal" ? "#94A3B8" : "#0F2D52" }}>
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Income Calculator */}
        <div style={{ background: "#0F2D52″, borderRadius: 16, padding: "36px", marginBottom: 48, color: "#fff" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, color: "#F5C842″, textTransform: "uppercase", marginBottom: 12 }}>
            Charter Income Potential
          </div>
          <div style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 800, marginBottom: 4 }}>
            25 jobs/mo · 25 recruits · 100 homes originated
          </div>
          <div style={{ color: "#94A3B8″, fontSize: 14, marginBottom: 28 }}>Illustrative example at full network buildout</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
            {[
              ["$25,200″, "Direct commissions/mo", "25 jobs × $14K × 10% × 72%"],
              ["$2,450″, "Network overrides/mo", "25 recruits × jobs × 7%"],
              ["$2,400″, "Origination income/yr", "100 homes × 2 jobs × $800 × 1.5%"],
              [`$${monthlyIncome.toLocaleString()}+`, "Total monthly est.", "Direct + network streams"],
            ].map(([val, label, note], i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.09)", borderRadius: 10, padding: "18px" }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: i === 3 ? "#F5C842″ : "#fff" }}>{val}</div>
                <div style={{ fontSize: 13, color: "#CBD5E1″, marginTop: 4, fontWeight: 600 }}>{label}</div>
                <div style={{ fontSize: 11, color: "#64748B", marginTop: 4 }}>{note}</div>
              </div>
            ))}
          </div>
          <p style={{ color: "#475569″, fontSize: 12, marginTop: 20 }}>
            Illustrative only. Income depends on activity, market conditions, and network growth. Not a guarantee.
          </p>
        </div>

        {/* Why 25 */}
        <div style={{ background: "#fff", border: "1.5px solid #E2E8F0″, borderRadius: 14, padding: "32px 28px", marginBottom: 48 }}>
          <h2 style={{ color: "#0F2D52″, fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Why Only 25?</h2>
          <p style={{ color: "#475569″, fontSize: 16, lineHeight: 1.75, margin: 0 }}>
            The founding network starts with 25 Charter members who set the standard for professional conduct,
            quality of work, and homeowner trust. Every Charter member is personally reviewed before approval.
            This isn't a marketing number — it’s a structural limit. The 25 Charter members will be the most
            referenced, highest-earning, and most visible members in the ProLnk network.
          </p>
        </div>

        {/* Scarcity */}
        <div style={{ background: "#FFF7ED", border: "2px solid #FED7AA", borderRadius: 14, padding: "24px 28px", marginBottom: 48 }}>
          <div style={{ fontWeight: 700, color: "#C2410C", fontSize: 14, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
            ⚠ {spotsLeft} of 25 Charter spots remaining
          </div>
          <p style={{ color: "#7C2D12″, fontSize: 15, lineHeight: 1.7, margin: 0 }}>
            When all 25 Charter spots are filled, Charter membership closes permanently. There is no waitlist for Charter.
            Founding tier (100 spots) opens next.
          </p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <h2 style={{ color: "#0F2D52″, fontSize: 28, fontWeight: 800, marginBottom: 16 }}>
            Apply for Charter Membership
          </h2>
          <p style={{ color: "#64748B", fontSize: 16, maxWidth: 480, margin: "0 auto 28px" }}>
            Applications are reviewed personally. If you're approved, your $149/mo rate is locked forever and your Charter badge is permanent.
          </p>
          <Link
            to="/apply"
            style={{
              display: "inline-block", background: "#F5C842″, color: "#0F2D52",
              fontWeight: 800, fontSize: 17, padding: "16px 40px", borderRadius: 10,
              textDecoration: "none",
            }}
          >
            Apply for Charter Membership →
          </Link>
        </div>

      </div>
    </div>
  );
}
