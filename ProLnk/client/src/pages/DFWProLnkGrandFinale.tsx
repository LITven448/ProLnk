import { useState } from 'react';

const stats = [
  { icon: "📄", number: "3,000+", label: "Pages of DFW Home Services Knowledge" },
  { icon: "🏠", number: "2.4M", label: "DFW Homes We Are Here to Serve" },
  { icon: "🔧", number: "47″, label: "AI Agents Working Behind Every Match" },
  { icon: "⚡", number: "15 min", label: "Target Match Time for Emergency Jobs" },
  { icon: "💰", number: "5″, label: "Income Streams for Every Pro in the Network" },
  { icon: "🔒", number: "500″, label: "Waitlist Spots Remaining Before Close" },
];

const stakeholders: Record<string, { headline: string; message: string; cta: string }> = {
  "DFW Homeowner": {
    headline: "Your home deserves better than a random Google search.",
    message: "ProLnk was built for one reason: so that the next time your AC dies at 10pm in July, you do not have to guess who to call. Every contractor in our network is rated, verified, and matched to your specific job — not just whoever paid the most for a Google ad. 3,000 pages of DFW home services knowledge. One platform that puts it to work for you. The waitlist is closing at 500 homes. Your spot is waiting.",
    cta: "Join the Homeowner Waitlist",
  },
  "HVAC Contractor": {
    headline: "Stop buying leads that do not convert. Start earning matches that do.",
    message: "Every lead in ProLnk comes from a homeowner who specifically needs what you offer — in your service area, for your trade, at a price point you can win. No more competing with 30 other contractors on Angi. No more cold homeowners who clicked an ad by mistake. Your rating grows with every job. Your income grows with every pro you bring into the network. DFW home services are about to get a lot more professional. Be in the network when it launches.",
    cta: "Join the Pro Waitlist",
  },
  "Real Estate Agent": {
    headline: "The Home Health Vault is the most valuable data asset in DFW real estate.",
    message: "Every home in ProLnk has a permanent record: what was fixed, when, by whom, and what condition it is in now. Buyers love it. Sellers who have it close faster and at higher prices. When you refer a homeowner to ProLnk, you earn a permanent origination override on every service job that home generates — forever. This is not a referral bonus. This is a recurring income stream attached to your book of business.",
    cta: "Learn About Origination Rights",
  },
  "Investor": {
    headline: "85% net margins. 500 Pros = break even. 10,000 Pros = $3.79M/month.",
    message: "ProLnk is not another lead marketplace. It is a network-economic platform where every participant makes every other participant more valuable. Pros refer Pros. Homeowners refer Homeowners. AI agents handle 80% of operations with zero marginal cost scaling. The Home Health Vault creates a data moat that compounds with every home added. We are raising our seed round with 500 waitlisted Pros and 5,000 homes as proof of demand. The numbers are in the deck. The platform is live.",
    cta: "Request the Investor Deck",
  },
  "Field Scout": {
    headline: "Your territory. Your income. Your network — forever.",
    message: "Field Scouts are the human layer of ProLnk. You go door to door, talk to homeowners, meet contractors, and build your territory. Every home you add to the Vault earns you an origination right — a permanent share of every service job that home generates. Every Pro you bring into the network earns you a 4-level commission cascade. We built 3,000 pages of knowledge so you would have something real to talk about. Now go build your territory.",
    cta: "Become a Field Scout",
  },
};

export default function DFWProLnkGrandFinale() {
  const [stakeholder, setStakeholder] = useState("");
  const [result, setResult] = useState<null | { headline: string; message: string; cta: string }>(null);

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh", color: "#0A1628″, fontFamily: "system-ui, sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ display: "inline-block", background: "#0A1628″, color: "#F5E642", borderRadius: 30, padding: "6px 20px", fontSize: 13, fontWeight: 700, marginBottom: 20 }}>
            🏁 THE GRAND FINALE
          </div>
          <h1 style={{ fontSize: 44, fontWeight: 900, marginBottom: 16, lineHeight: 1.1 }}>
            3,000+ Pages.<br />1 Platform.<br /><span style={{ color: "#F5E642″, textShadow: "0 0 0 2px #0A1628", WebkitTextStroke: "2px #0A1628" }}>DFW Is Ready.</span>
          </h1>
          <p style={{ color: "#475569″, fontSize: 18, maxWidth: 600, margin: "0 auto" }}>
            We built everything a DFW homeowner, contractor, agent, investor, or scout could ever need to know about home services. Now we built the platform to put it to work.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 60 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ background: "#fff", borderRadius: 12, padding: "20px 16px", textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", border: "1px solid #E2E8F0″ }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#0A1628″, marginBottom: 4 }}>{s.number}</div>
              <div style={{ color: "#64748B", fontSize: 12 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0A1628″, borderRadius: 16, padding: "32px 32px 40px", marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#F5E642″, marginBottom: 8 }}>🎯 Your Personal Grand Finale</h2>
          <p style={{ color: "#94A3B8″, fontSize: 15, marginBottom: 20 }}>Tell us who you are and we will tell you exactly what ProLnk means for you.</p>
          <select value={stakeholder} onChange={(e) => { setStakeholder(e.target.value); setResult(stakeholders[e.target.value] || null); }}
            style={{ width: "100%", background: "#0F1E35″, border: "1px solid #1E3A5F", borderRadius: 8, padding: "12px 14px", color: "#fff", fontSize: 15, marginBottom: 20 }}>
            <option value="">I am a...</option>
            {Object.keys(stakeholders).map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {result && (
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 16, lineHeight: 1.3 }}>{result.headline}</div>
              <div style={{ color: "#CBD5E1″, fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>{result.message}</div>
              <button style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 10, padding: "14px 32px", fontWeight: 800, fontSize: 16, cursor: "pointer" }}>
                {result.cta} →
              </button>
            </div>
          )}
        </div>

        <div style={{ textAlign: "center", padding: "20px 0 40px" }}>
          <div style={{ fontSize: 13, color: "#94A3B8″, marginBottom: 8 }}>The waitlist closes at 500 applications + 5,000 homes.</div>
          <div style={{ fontSize: 13, color: "#94A3B8″ }}>After that, ProLnk goes invite-only. DFW home services will never be the same.</div>
          <div style={{ marginTop: 20, fontSize: 22, fontWeight: 900, color: "#0A1628″ }}>ProLnk. The Home Services Network DFW Deserves.</div>
        </div>
      </div>
    </div>
  );
}
