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
  h1: { fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 800, lineHeight: 1.1, maxWidth: 760, margin: "0 auto 24px" },
  heroSub: { fontSize: 18, color: "#B8C4D4", maxWidth: 580, margin: "0 auto 36px" },
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
  stepContent: {},
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
  { icon: "💧", title: "Water Heater AI Detection", text: "DFW's hard water (300–500 PPM) destroys water heaters in 7–8 years instead of 12. Our AI flags aging units from job photos before they fail — giving you the first call." },
  { icon: "🏗️", title: "Foundation Drainage Leads", text: "Expansive clay soil causes drainage failures throughout DFW. Every exterior plumbing job photo is scanned for foundation drainage issues that generate add-on quotes." },
  { icon: "❄️", title: "Emergency Freeze Damage", text: "Since Winter Storm Uri, DFW homeowners know freeze risk is real. ProLnk routes burst pipe and freeze-damage leads directly to licensed plumbers within your territory." },
  { icon: "🤝", title: "Network Income Stream", text: "Recruit one other plumber to ProLnk and earn 7% of their job commissions permanently. Four levels deep — your referral network generates income while you sleep." },
];

const faqs = [
  { q: "Do I need a Texas Master Plumber license to join?", a: "A Texas State Board of Plumbing Examiners license (Journeyman or Master) is required. We verify credentials before activating your account. Licensed apprentices working under a Master Plumber may be eligible — contact us to discuss your situation." },
  { q: "How does my photo generate a lead for another homeowner?", a: "When you upload a job photo through the ProLnk app, our Vision AI scans it for indicators like water heater age labels, mineral buildup on pipes, corroded fittings, and drainage configuration. When it spots a high-probability issue at a neighboring property, it generates a lead alert — with your contact info attached as the referring plumber." },
  { q: "When do I get paid?", a: "Commissions are calculated when a job is marked complete by both the homeowner and pro. Payouts process every Friday via ACH direct deposit. Typical clearing time is 2–3 business days. There's no minimum payout threshold." },
  { q: "What's the difference between a commission and a network override?", a: "Your commission is 72% of the ProLnk platform fee on jobs you complete directly (10% of job value). A network override is 7% of commissions earned by plumbers you recruited — passive income that stacks on top of your direct earnings." },
];

export default function DFWPlumberNetwork() {
  const [jobValue, setJobValue] = useState(8000);
  const [networkPros, setNetworkPros] = useState(3);
  const [networkAvgJob, setNetworkAvgJob] = useState(5000);

  const platformFee = jobValue * 0.10;
  const yourCommission = platformFee * 0.72;
  const networkOverride = networkPros * (networkAvgJob * 0.10 * 0.72) * 0.07;
  const total = yourCommission + networkOverride;

  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <p style={styles.heroEyebrow}>ProLnk · DFW Plumber Network</p>
        <h1 style={styles.h1}>DFW Plumbers: Turn Every Job Photo Into a Referral Commission</h1>
        <p style={styles.heroSub}>Join 47 licensed plumbers already earning passive income from AI-detected leads across the Dallas–Fort Worth metro.</p>
        <div style={styles.statBar}>
          <div style={styles.stat}><span style={styles.statNum}>47</span><span style={styles.statLabel}>Active DFW Plumbers</span></div>
          <div style={styles.stat}><span style={styles.statNum}>$1,840</span><span style={styles.statLabel}>Avg Monthly Earnings</span></div>
          <div style={styles.stat}><span style={styles.statNum}>89%</span><span style={styles.statLabel}>Lead Acceptance Rate</span></div>
          <div style={styles.stat}><span style={styles.statNum}>3</span><span style={styles.statLabel}>Water Heater Leads/Mo Avg</span></div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Real Income Example</h2>
        <p style={styles.sectionSub}>A typical DFW water heater + repiping job through ProLnk.</p>
        <div style={styles.incomeBox}>
          <div style={styles.incomeTitle}>$8,000 Water Heater + Repiping Job</div>
          <div style={styles.incomeLine}><span>Job Value</span><span>$8,000</span></div>
          <div style={styles.incomeLine}><span>ProLnk Platform Fee (10%)</span><span>$800</span></div>
          <div style={styles.incomeLine}><span>Your Share (72% of fee)</span><span style={{ color: YELLOW }}>$576</span></div>
          <div style={styles.incomeLine}><span>+ Network Override (3 recruited plumbers × avg job)</span><span style={{ color: YELLOW }}>+$241</span></div>
          <div style={styles.incomeTotal}><span>Total You Keep</span><span>$817</span></div>
        </div>
        <div style={styles.dfw}>
          <p style={styles.dfwText}><strong>Why DFW plumbers win with ProLnk:</strong> DFW's hard water (300–500 PPM) destroys water heaters in 7–8 years instead of the national average of 12. Our plumbers average 3 water heater leads per month generated purely from AI photo detection at other job sites — without any extra marketing spend.</p>
        </div>

        <h2 style={styles.sectionTitle}>Why DFW Plumbers Choose ProLnk</h2>
        <p style={styles.sectionSub}>Built for the specific demand patterns of the Dallas–Fort Worth market.</p>
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
          <p style={styles.sectionSub}>Three steps from job site to passive income.</p>
          <div style={styles.steps}>
            <div style={styles.step}>
              <div style={styles.stepNum}>1</div>
              <div style={styles.stepContent}>
                <div style={styles.stepTitle}>Photograph every job</div>
                <div style={styles.stepText}>Snap before/after photos through the ProLnk app at every service call. Takes 30 seconds. AI does the rest.</div>
              </div>
            </div>
            <div style={styles.step}>
              <div style={styles.stepNum}>2</div>
              <div style={styles.stepContent}>
                <div style={styles.stepTitle}>AI detects nearby opportunities</div>
                <div style={styles.stepText}>Our Vision AI cross-references your photos with property data — flagging aging water heaters, drainage issues, and freeze risk in neighboring homes.</div>
              </div>
            </div>
            <div style={styles.step}>
              <div style={styles.stepNum}>3</div>
              <div style={styles.stepContent}>
                <div style={styles.stepTitle}>Earn commissions and overrides</div>
                <div style={styles.stepText}>Accept the lead, complete the job, collect your 72% commission. Recruit other plumbers and earn 7% of their commissions indefinitely.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Earnings Calculator</h2>
        <p style={styles.sectionSub}>Adjust the sliders to estimate your monthly ProLnk income.</p>
        <div style={styles.calcBox}>
          <div style={styles.calcRow}>
            <span style={styles.calcLabel}>Avg Job Value ($)</span>
            <input style={styles.calcInput} type="number" value={jobValue} onChange={e => setJobValue(Number(e.target.value))} min={500} max={50000} step={500} />
          </div>
          <div style={styles.calcRow}>
            <span style={styles.calcLabel}>Plumbers You've Recruited</span>
            <input style={styles.calcInput} type="number" value={networkPros} onChange={e => setNetworkPros(Number(e.target.value))} min={0} max={50} />
          </div>
          <div style={styles.calcRow}>
            <span style={styles.calcLabel}>Their Avg Job Value ($)</span>
            <input style={styles.calcInput} type="number" value={networkAvgJob} onChange={e => setNetworkAvgJob(Number(e.target.value))} min={500} max={30000} step={500} />
          </div>
          <div style={styles.calcResult}>
            <div style={styles.calcResultRow}><span>Your direct commission (72% of 10%)</span><span>${yourCommission.toFixed(0)}</span></div>
            <div style={styles.calcResultRow}><span>Network override ({networkPros} pros × 7%)</span><span>${networkOverride.toFixed(0)}</span></div>
            <div style={styles.calcResultTotal}><span>Estimated Monthly</span><span>${total.toFixed(0)}</span></div>
          </div>
        </div>
      </div>

      <div style={{ ...styles.section, paddingTop: 0 }}>
        <div style={styles.cta}>
          <div style={styles.ctaTitle}>Join ProLnk as a DFW Plumber</div>
          <p style={styles.ctaSub}>Applications are limited to 100 founding plumbers in the DFW market. Charter members lock in the lowest subscription rate forever.</p>
          <a href="/apply" style={styles.ctaBtn}>Apply Now — DFW Plumber Network</a>
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
