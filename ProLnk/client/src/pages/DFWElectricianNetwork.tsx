import React from 'react';
import { useState } from "react";

const NAVY = "#0A1628";
const YELLOW = "#F5E642";
const BG = "#FAFAF9";
const CARD_BG = "#FFFFFF";

const styles: Record<string, React.CSSProperties> = {
  page: { background: BG, color: NAVY, fontFamily: "'Inter', 'Helvetica Neue', sans-serif", minHeight: "100vh" },
  hero: { background: NAVY, color: "#FFFFFF", padding: "80px 24px 60px", textAlign: "center" },
  heroEyebrow: { fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: YELLOW, marginBottom: 16, fontWeight: 600 },
  h1: { fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 800, lineHeight: 1.1, maxWidth: 800, margin: "0 auto 24px" },
  heroSub: { fontSize: 18, color: "#B8C4D4", maxWidth: 600, margin: "0 auto 36px" },
  statBar: { display: "flex", flexWrap: "wrap" as const, justifyContent: "center", gap: "32px", borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 32, marginTop: 8 },
  stat: { textAlign: "center" as const },
  statNum: { fontSize: 28, fontWeight: 800, color: YELLOW, display: "block" },
  statLabel: { fontSize: 12, color: "#8899AA", letterSpacing: "0.08em", textTransform: "uppercase" as const },
  section: { maxWidth: 1080, margin: "0 auto", padding: "72px 24px" },
  sectionTitle: { fontSize: 32, fontWeight: 800, marginBottom: 12, color: NAVY },
  sectionSub: { fontSize: 16, color: "#4A5568", marginBottom: 48, maxWidth: 640 },
  cards: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 },
  card: { background: CARD_BG, border: "1px solid #E8EDF2", borderRadius: 16, padding: 28, boxShadow: "0 2px 8px rgba(10,22,40,0.06)" },
  cardIcon: { fontSize: 32, marginBottom: 16 },
  cardTitle: { fontSize: 18, fontWeight: 700, marginBottom: 8, color: NAVY },
  cardText: { fontSize: 14, color: "#4A5568", lineHeight: 1.6 },
  incomeBox: { background: NAVY, color: "#FFFFFF", borderRadius: 20, padding: "48px 40px", marginBottom: 24 },
  incomeTitle: { fontSize: 24, fontWeight: 800, marginBottom: 24, color: YELLOW },
  incomeLine: { display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.08)", fontSize: 15 },
  incomeTotal: { display: "flex", justifyContent: "space-between", padding: "16px 0 0", fontSize: 20, fontWeight: 800, color: YELLOW },
  steps: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 },
  step: { display: "flex", gap: 16, alignItems: "flex-start" },
  stepNum: { background: YELLOW, color: NAVY, borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, flexShrink: 0 },
  stepTitle: { fontSize: 17, fontWeight: 700, marginBottom: 6, color: NAVY },
  stepText: { fontSize: 14, color: "#4A5568", lineHeight: 1.6 },
  calcBox: { background: "#F0F4F8", borderRadius: 20, padding: "40px 36px" },
  calcRow: { display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" as const, marginBottom: 24 },
  calcLabel: { fontSize: 14, fontWeight: 600, color: NAVY, minWidth: 180 },
  calcInput: { border: "2px solid #CBD5E0", borderRadius: 8, padding: "10px 14px", fontSize: 16, fontWeight: 600, width: 140, background: "#FFFFFF", color: NAVY },
  calcResult: { background: NAVY, color: "#FFFFFF", borderRadius: 14, padding: "24px 28px", marginTop: 8 },
  calcResultRow: { display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 15, borderBottom: "1px solid rgba(255,255,255,0.1)" },
  calcResultTotal: { display: "flex", justifyContent: "space-between", padding: "12px 0 0", fontSize: 22, fontWeight: 800, color: YELLOW },
  cta: { background: YELLOW, borderRadius: 20, padding: "64px 32px", textAlign: "center" as const },
  ctaTitle: { fontSize: 34, fontWeight: 800, color: NAVY, marginBottom: 12 },
  ctaSub: { fontSize: 16, color: "#2D3748", marginBottom: 32, maxWidth: 520, margin: "0 auto 32px" },
  ctaBtn: { display: "inline-block", background: NAVY, color: "#FFFFFF", padding: "18px 48px", borderRadius: 12, fontWeight: 700, fontSize: 17, textDecoration: "none", letterSpacing: "0.02em" },
  faq: { maxWidth: 720, margin: "0 auto" },
  faqItem: { borderBottom: "1px solid #E8EDF2", padding: "24px 0" },
  faqQ: { fontSize: 17, fontWeight: 700, color: NAVY, marginBottom: 10 },
  faqA: { fontSize: 15, color: "#4A5568", lineHeight: 1.7 },
  dfw: { background: "#EBF4FF", borderLeft: "4px solid #0A1628", borderRadius: "0 12px 12px 0", padding: "24px 28px", margin: "0 0 48px" },
  dfwText: { fontSize: 15, color: "#2D3748", lineHeight: 1.7 },
};

const benefits = [
  { icon: "⚡", title: "EV Charger Lead Gen", text: "DFW's EV adoption is up 180% in 2025. ProLnk matches Level 2 charger installation requests to licensed electricians in your service area — typically $800–$2,400 per install with zero marketing spend." },
  { icon: "📷", title: "Panel Age Detection from Photos", text: "Our Vision AI reads breaker panel labels, wire gauge, and fuse types from job photos. Panels 25+ years old (common in DFW's 1990s–2000s builds) trigger automatic upgrade lead generation to nearby homeowners." },
  { icon: "🏠", title: "Smart Home Upgrade Leads", text: "DFW's high-income suburbs (Southlake, Frisco, Prosper) have strong demand for smart lighting, whole-home automation, and whole-house surge protection. ProLnk routes these high-value upgrade leads directly to you." },
  { icon: "☀️", title: "Solar Hookup Referrals", text: "As solar installations accelerate across DFW, electricians are needed for utility interconnection, sub-panel work, and battery backup. ProLnk cross-references solar permit filings and routes hookup referrals to your territory." },
];

const faqs = [
  { q: "What Texas electrical license is required?", a: "A Texas Department of Licensing and Regulation (TDLR) Journeyman Electrician or Master Electrician license is required. Electrical Apprentices working under a licensed Master Electrician are not eligible for independent lead acceptance." },
  { q: "How does the panel age AI detection work?", a: "When you upload photos at any job site, our Vision AI identifies manufacturer labels, breaker styles, and wire types associated with panels installed before 2000. For panels flagged as high-risk (Federal Pacific, Zinsco, older Cutler-Hammer), the system generates an immediate upgrade alert and routes it to you as the originating electrician — putting you first in line for the upgrade job." },
  { q: "Are EV charger leads residential or commercial?", a: "Both. The majority of EV charger leads (about 70%) are residential Level 2 installations. The remaining 30% are commercial fleet charging or multi-unit residential (MDU) properties. You can filter lead types in your dashboard to accept only the jobs that match your specialization." },
  { q: "How does the solar hookup referral work financially?", a: "Solar hookup referrals work the same as all ProLnk leads — you earn 60% of the 10% platform fee on the job value. A typical DFW solar hookup (sub-panel upgrade + interconnection) runs $2,000–$5,000, generating $144–$360 per job. You also originate the referral, earning origination rights of 1.5% of that home's future ProLnk revenue." },
];

export default function DFWElectricianNetwork() {
  const [jobValue, setJobValue] = useState(4200);
  const [networkPros, setNetworkPros] = useState(3);
  const [networkAvgJob, setNetworkAvgJob] = useState(3000);

  const platformFee = jobValue * 0.10;
  const yourCommission = platformFee * 0.60;
  const networkOverride = networkPros * (networkAvgJob * 0.10 * 0.60) * 0.07;
  const total = yourCommission + networkOverride;

  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <p style={styles.heroEyebrow}>ProLnk · DFW Electrician Network</p>
        <h1 style={styles.h1}>DFW Electricians: Every Panel You Touch Could Generate 3 More Leads</h1>
        <p style={styles.heroSub}>31 licensed electricians earning passive commissions from AI-detected panel and EV charger opportunities across the Dallas–Fort Worth metro.</p>
        <div style={styles.statBar}>
          <div style={styles.stat}><span style={styles.statNum}>31</span><span style={styles.statLabel}>Active DFW Electricians</span></div>
          <div style={styles.stat}><span style={styles.statNum}>$1,680</span><span style={styles.statLabel}>Avg Monthly Earnings</span></div>
          <div style={styles.stat}><span style={styles.statNum}>+180%</span><span style={styles.statLabel}>EV Charger Installs (2025)</span></div>
          <div style={styles.stat}><span style={styles.statNum}>+47%</span><span style={styles.statLabel}>Panel Upgrade Demand</span></div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Real Income Example</h2>
        <p style={styles.sectionSub}>A typical DFW panel upgrade through ProLnk.</p>
        <div style={styles.incomeBox}>
          <div style={styles.incomeTitle}>$4,200 Electrical Panel Upgrade (200A)</div>
          <div style={styles.incomeLine}><span>Job Value</span><span>$4,200</span></div>
          <div style={styles.incomeLine}><span>ProLnk Platform Fee (10%)</span><span>$420</span></div>
          <div style={styles.incomeLine}><span>Your Share (60% of fee)</span><span style={{ color: YELLOW }}>$302</span></div>
          <div style={styles.incomeLine}><span>+ Network Override (3 recruited electricians × avg job)</span><span style={{ color: YELLOW }}>+$45</span></div>
          <div style={styles.incomeTotal}><span>Total You Keep</span><span>$347</span></div>
        </div>
        <div style={styles.dfw}>
          <p style={styles.dfwText}><strong>DFW's electrical demand is accelerating:</strong> EV adoption in the DFW metro is up 180% in 2025, and Level 2 charger installations are now one of the fastest-growing residential electrical jobs. Our Photo AI reads electrical panel age and flags upgrade opportunities at every job — giving DFW electricians on ProLnk a steady pipeline of panel upgrades, EV installs, and smart home projects without any marketing budget.</p>
        </div>

        <h2 style={styles.sectionTitle}>Why DFW Electricians Choose ProLnk</h2>
        <p style={styles.sectionSub}>Designed around the fastest-growing electrical demand categories in DFW.</p>
        <div style={styles.cards}>
          {benefits.map(b => (
            <div key={b.title} style={styles.card}>
              <div style={styles.cardIcon}>{b.icon}</div>
              <div style={styles.cardTitle}>{b.title}</div>
              <div style={styles.cardText}>{b.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "#F7F9FC", padding: "0 0 72px" }}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>How It Works</h2>
          <p style={styles.sectionSub}>From panel photo to passive income in three steps.</p>
          <div style={styles.steps}>
            <div style={styles.step}>
              <div style={styles.stepNum}>1</div>
              <div>
                <div style={styles.stepTitle}>Photograph every panel and job</div>
                <div style={styles.stepText}>Snap the panel, meter, and any notable wiring at each job site. AI reads manufacturer, age, load, and upgrade potential in seconds.</div>
              </div>
            </div>
            <div style={styles.step}>
              <div style={styles.stepNum}>2</div>
              <div>
                <div style={styles.stepTitle}>AI surfaces nearby upgrade leads</div>
                <div style={styles.stepText}>Neighboring homes with aging panels, insufficient amperage for EV chargers, or solar hookup needs are flagged and dispatched to you as the originating electrician.</div>
              </div>
            </div>
            <div style={styles.step}>
              <div style={styles.stepNum}>3</div>
              <div>
                <div style={styles.stepTitle}>Earn commissions + origination rights</div>
                <div style={styles.stepText}>Complete the job, collect your 60% commission. Homes you originate generate 1.5% origination income from all future ProLnk platform fees — permanently.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Earnings Calculator</h2>
        <p style={styles.sectionSub}>Estimate your monthly ProLnk income from direct jobs and your electrician network.</p>
        <div style={styles.calcBox}>
          <div style={styles.calcRow}>
            <span style={styles.calcLabel}>Avg Job Value ($)</span>
            <input style={styles.calcInput} type="number" value={jobValue} onChange={e => setJobValue(Number(e.target.value))} min={200} max={20000} step={200} />
          </div>
          <div style={styles.calcRow}>
            <span style={styles.calcLabel}>Electricians You've Recruited</span>
            <input style={styles.calcInput} type="number" value={networkPros} onChange={e => setNetworkPros(Number(e.target.value))} min={0} max={50} />
          </div>
          <div style={styles.calcRow}>
            <span style={styles.calcLabel}>Their Avg Job Value ($)</span>
            <input style={styles.calcInput} type="number" value={networkAvgJob} onChange={e => setNetworkAvgJob(Number(e.target.value))} min={200} max={15000} step={200} />
          </div>
          <div style={styles.calcResult}>
            <div style={styles.calcResultRow}><span>Your direct commission (60% of 10%)</span><span>${yourCommission.toFixed(0)}</span></div>
            <div style={styles.calcResultRow}><span>Network override ({networkPros} electricians × 7%)</span><span>${networkOverride.toFixed(0)}</span></div>
            <div style={styles.calcResultTotal}><span>Estimated Monthly</span><span>${total.toFixed(0)}</span></div>
          </div>
        </div>
      </div>

      <div style={{ ...styles.section, paddingTop: 0 }}>
        <div style={styles.cta}>
          <div style={styles.ctaTitle}>Join ProLnk as a DFW Electrician</div>
          <p style={styles.ctaSub}>Founding electrician partners receive priority EV charger lead routing and Charter pricing locked forever. Only 31 spots remain in the DFW market.</p>
          <a href="/apply" style={styles.ctaBtn}>Apply Now — DFW Electrician Network</a>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
        <div style={styles.faq}>
          {faqs.map(f => (
            <div key={f.q} style={styles.faqItem}>
              <div style={styles.faqQ}>{f.q}</div>
              <div style={styles.faqA}>{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
