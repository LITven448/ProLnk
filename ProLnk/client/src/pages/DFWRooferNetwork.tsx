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
  alertBadge: { display: "inline-block", background: "#EF4444", color: "#FFFFFF", borderRadius: 6, padding: "4px 10px", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 8 },
};

const benefits = [
  { icon: "⛈️", title: "Storm AI Dispatch (15-Min Alert)", text: "ProLnk's Storm Intelligence monitors NOAA radar and hail reports in real-time. Within 15 minutes of a confirmed hail event in your territory, you receive a dispatch with affected zip codes and lead count — before homeowners call anyone." },
  { icon: "📷", title: "Hail Damage Photo Detection", text: "Upload roof photos after any job and our AI flags granule loss, dent patterns, and flashing damage consistent with recent hail impacts. These AI-verified findings are exportable directly into insurance claim documentation." },
  { icon: "📋", title: "Insurance Claim Documentation Flow", text: "ProLnk generates a structured photo report with GPS coordinates, timestamps, and AI damage assessment — formatted for Xactimate. Reduces supplemental disputes and speeds up adjuster approvals." },
  { icon: "💰", title: "Post-Storm Surge Income", text: "After a major hail event, DFW roofers on ProLnk report 8–12 jobs in the following 2 weeks. With a $1,200 average commission per replacement, a single storm event can generate $10,000+ in network-attributed income." },
];

const faqs = [
  { q: "Do I need a Texas roofing contractor license?", a: "Texas does not require a statewide roofing license, but many DFW municipalities (Dallas, Fort Worth, Plano) require a local contractor registration. We verify your liability insurance, business registration, and any required local permits before activation." },
  { q: "How fast are storm leads dispatched?", a: "ProLnk's Storm Intelligence monitors NOAA's MRMS hail detection network. When hail of 0.75 inches or larger is confirmed in a DFW zip code, leads are dispatched to available roofers in that territory within 15 minutes. The acceptance window is 3 minutes — leads route to the next roofer if not accepted." },
  { q: "Can I use the AI damage report for my insurance claims?", a: "Yes. ProLnk generates a timestamped, GPS-tagged photo report with AI damage classifications. This report is accepted by most major carriers as supporting documentation. It does not replace an adjuster inspection, but it significantly speeds up claim approval and reduces supplement disputes." },
  { q: "What happens if a homeowner's insurance doesn't cover the damage?", a: "If the claim is denied, the lead still counts as a completed consultation — you receive a $25 consultation fee. If you convert the homeowner to an out-of-pocket repair, the standard 10% platform fee applies to the job value." },
];

export default function DFWRooferNetwork() {
  const [jobValue, setJobValue] = useState(12000);
  const [networkPros, setNetworkPros] = useState(5);
  const [networkAvgJob, setNetworkAvgJob] = useState(10000);

  const platformFee = jobValue * 0.10;
  const yourCommission = platformFee * 0.72;
  const networkOverride = networkPros * (networkAvgJob * 0.10 * 0.72) * 0.07;
  const total = yourCommission + networkOverride;

  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <p style={styles.heroEyebrow}>ProLnk · DFW Roofing Partner Network</p>
        <h1 style={styles.h1}>DFW Roofers: Get Paid Before You Even Submit the Insurance Claim</h1>
        <p style={styles.heroSub}>89 roofing partners dispatched within 15 minutes of hail events. Storm Intelligence sends you leads before homeowners know they have damage.</p>
        <div style={styles.statBar}>
          <div style={styles.stat}><span style={styles.statNum}>89</span><span style={styles.statLabel}>Active DFW Roofers</span></div>
          <div style={styles.stat}><span style={styles.statNum}>$3,200</span><span style={styles.statLabel}>Avg Monthly Earnings</span></div>
          <div style={styles.stat}><span style={styles.statNum}>15 min</span><span style={styles.statLabel}>Storm Dispatch Time</span></div>
          <div style={styles.stat}><span style={styles.statNum}>3–5</span><span style={styles.statLabel}>Hail Events/Year (DFW)</span></div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Real Income Example</h2>
        <p style={styles.sectionSub}>A typical post-storm roof replacement through ProLnk.</p>
        <div style={styles.incomeBox}>
          <div style={styles.incomeTitle}>$12,000 Full Roof Replacement (Post-Hail)</div>
          <div style={styles.incomeLine}><span>Job Value</span><span>$12,000</span></div>
          <div style={styles.incomeLine}><span>ProLnk Platform Fee (10%)</span><span>$1,200</span></div>
          <div style={styles.incomeLine}><span>Your Share (72% of fee)</span><span style={{ color: YELLOW }}>$864</span></div>
          <div style={styles.incomeLine}><span>+ Network Override (5 recruited roofers × avg job)</span><span style={{ color: YELLOW }}>+$252</span></div>
          <div style={styles.incomeTotal}><span>Total You Keep</span><span>$1,116</span></div>
        </div>
        <div style={styles.dfw}>
          <p style={styles.dfwText}><strong>DFW is the #1 hail market in the US:</strong> DFW averages 3–5 significant hail events per year, with some years seeing 8+ events across different metro zones. Our Storm Intelligence detects events in real-time using NOAA's MRMS radar network and dispatches you before homeowners even know they have damage — giving ProLnk roofers a first-mover advantage on every storm event.</p>
        </div>

        <h2 style={styles.sectionTitle}>Why DFW Roofers Choose ProLnk</h2>
        <p style={styles.sectionSub}>Built around the post-storm income cycle that defines DFW roofing.</p>
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
          <p style={styles.sectionSub}>From hail event to signed contract in hours, not days.</p>
          <div style={styles.steps}>
            <div style={styles.step}>
              <div style={styles.stepNum}>1</div>
              <div>
                <div style={styles.stepTitle}>Storm Intelligence detects the event</div>
                <div style={styles.stepText}>NOAA hail data triggers ProLnk's alert system within minutes of impact. You receive a dispatch with affected streets, home count, and hail size.</div>
              </div>
            </div>
            <div style={styles.step}>
              <div style={styles.stepNum}>2</div>
              <div>
                <div style={styles.stepTitle}>Accept leads and document damage</div>
                <div style={styles.stepText}>Accept storm leads from your phone, photograph damage with the ProLnk app, and generate an AI-verified insurance report on the spot.</div>
              </div>
            </div>
            <div style={styles.step}>
              <div style={styles.stepNum}>3</div>
              <div>
                <div style={styles.stepTitle}>Complete jobs and earn network income</div>
                <div style={styles.stepText}>Close the job, collect your 72% commission. Recruit other roofers to your ProLnk network and earn 7% of every commission they earn — storm season and off-season.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Earnings Calculator</h2>
        <p style={styles.sectionSub}>Estimate your monthly ProLnk income from direct jobs and your roofing network.</p>
        <div style={styles.calcBox}>
          <div style={styles.calcRow}>
            <span style={styles.calcLabel}>Avg Job Value ($)</span>
            <input style={styles.calcInput} type="number" value={jobValue} onChange={e => setJobValue(Number(e.target.value))} min={1000} max={80000} step={1000} />
          </div>
          <div style={styles.calcRow}>
            <span style={styles.calcLabel}>Roofers You've Recruited</span>
            <input style={styles.calcInput} type="number" value={networkPros} onChange={e => setNetworkPros(Number(e.target.value))} min={0} max={50} />
          </div>
          <div style={styles.calcRow}>
            <span style={styles.calcLabel}>Their Avg Job Value ($)</span>
            <input style={styles.calcInput} type="number" value={networkAvgJob} onChange={e => setNetworkAvgJob(Number(e.target.value))} min={1000} max={50000} step={1000} />
          </div>
          <div style={styles.calcResult}>
            <div style={styles.calcResultRow}><span>Your direct commission (72% of 10%)</span><span>${yourCommission.toFixed(0)}</span></div>
            <div style={styles.calcResultRow}><span>Network override ({networkPros} roofers × 7%)</span><span>${networkOverride.toFixed(0)}</span></div>
            <div style={styles.calcResultTotal}><span>Estimated Monthly</span><span>${total.toFixed(0)}</span></div>
          </div>
        </div>
      </div>

      <div style={{ ...styles.section, paddingTop: 0 }}>
        <div style={styles.cta}>
          <div style={styles.ctaTitle}>Join ProLnk as a DFW Roofer</div>
          <p style={styles.ctaSub}>Founding roofing partners receive priority storm dispatch and locked-in Charter pricing. 89 spots remain in the DFW market.</p>
          <a href="/apply" style={styles.ctaBtn}>Apply Now — DFW Roofing Partner Network</a>
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
