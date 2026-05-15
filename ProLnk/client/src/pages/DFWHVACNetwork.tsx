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
  { icon: "🌡️", title: "Storm Heat Surge Leads", text: "When DFW hits triple digits, ProLnk detects the heat event and dispatches surge leads to HVAC techs in the affected zip codes within 5 minutes — before homeowners even call around." },
  { icon: "📷", title: "Aging System Photo AI", text: "Our Vision AI reads unit age tags, refrigerant labels, and condenser condition from your job photos. Systems 8+ years old trigger automated homeowner outreach recommending a replacement quote." },
  { icon: "⚡", title: "5-Minute Lead Routing", text: "Leads are scored, matched, and dispatched to your phone in under 5 minutes from submission. No dispatcher, no call center — direct to you with full property context." },
  { icon: "📅", title: "Seasonal Revenue Smoothing", text: "Earn from the spring surge (April–June) and heat emergencies (July–August), then earn network income from recruited techs during the slow winter months when you're not running service calls." },
];

const faqs = [
  { q: "Do I need an EPA 608 certification?", a: "Yes — EPA Section 608 certification is required for any work involving refrigerants. We verify your certification number before activation. NATE certification is encouraged but not required." },
  { q: "How does the spring surge routing work?", a: "ProLnk monitors NOAA weather data for DFW. When temperatures spike above 95°F for 3+ consecutive days, our system automatically activates surge routing — increasing lead dispatch volume to all active HVAC partners in your territory and reducing the acceptance window to 2 minutes so leads flow faster." },
  { q: "Can I set a maximum number of leads per week?", a: "Yes. In your dashboard, you can set a weekly lead cap by trade type. During surge events, you can temporarily unlock your cap with one tap if you want to take on more volume." },
  { q: "What if a customer wants a service call but not a replacement?", a: "You decide whether to accept each lead before it counts. Service calls and replacements both generate commissions — the platform fee is 10% of whatever the job value comes to. A $200 service call generates $14.40 for you. A $5,400 replacement generates $388." },
];

export default function DFWHVACNetwork() {
  const [jobValue, setJobValue] = useState(5400);
  const [networkPros, setNetworkPros] = useState(4);
  const [networkAvgJob, setNetworkAvgJob] = useState(4000);

  const platformFee = jobValue * 0.10;
  const yourCommission = platformFee * 0.72;
  const networkOverride = networkPros * (networkAvgJob * 0.10 * 0.72) * 0.07;
  const total = yourCommission + networkOverride;

  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <p style={styles.heroEyebrow}>ProLnk · DFW HVAC Partner Network</p>
        <h1 style={styles.h1}>DFW HVAC Techs: Your Photos Are Leaving Money on the Table</h1>
        <p style={styles.heroSub}>62 HVAC partners are already earning commissions from AI-detected leads. Spring surge brings +340% lead volume April–June.</p>
        <div style={styles.statBar}>
          <div style={styles.stat}><span style={styles.statNum}>62</span><span style={styles.statLabel}>Active HVAC Partners</span></div>
          <div style={styles.stat}><span style={styles.statNum}>$2,140</span><span style={styles.statLabel}>Avg Monthly Earnings</span></div>
          <div style={styles.stat}><span style={styles.statNum}>+340%</span><span style={styles.statLabel}>Spring Surge (Apr–Jun)</span></div>
          <div style={styles.stat}><span style={styles.statNum}>5 min</span><span style={styles.statLabel}>Lead Dispatch Time</span></div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Real Income Example</h2>
        <p style={styles.sectionSub}>A typical DFW whole-system replacement through ProLnk.</p>
        <div style={styles.incomeBox}>
          <div style={styles.incomeTitle}>$5,400 AC System Replacement</div>
          <div style={styles.incomeLine}><span>Job Value</span><span>$5,400</span></div>
          <div style={styles.incomeLine}><span>ProLnk Platform Fee (10%)</span><span>$540</span></div>
          <div style={styles.incomeLine}><span>Your Share (72% of fee)</span><span style={{ color: YELLOW }}>$388</span></div>
          <div style={styles.incomeLine}><span>+ Network Override (4 recruited techs × avg job)</span><span style={{ color: YELLOW }}>+$80</span></div>
          <div style={styles.incomeTotal}><span>Total You Keep</span><span>$468</span></div>
        </div>
        <div style={styles.dfw}>
          <p style={styles.dfwText}><strong>DFW's heat load is unmatched:</strong> DFW hits 100°F+ for 60+ days per year — more than Phoenix in many recent summers. Emergency AC calls peak June–August at 3x normal service rates. ProLnk dispatches storm and heat surge leads directly to available techs in real-time, with full property context (system age, sq ft, last service date) before you accept.</p>
        </div>

        <h2 style={styles.sectionTitle}>Why DFW HVAC Techs Choose ProLnk</h2>
        <p style={styles.sectionSub}>Designed around the DFW summer surge cycle and off-season income gaps.</p>
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
          <p style={styles.sectionSub}>From job site photo to commission check — three steps.</p>
          <div style={styles.steps}>
            <div style={styles.step}>
              <div style={styles.stepNum}>1</div>
              <div>
                <div style={styles.stepTitle}>Photograph every system</div>
                <div style={styles.stepText}>Upload before/after photos at every service call. AI reads the unit label, age, and condition in seconds.</div>
              </div>
            </div>
            <div style={styles.step}>
              <div style={styles.stepNum}>2</div>
              <div>
                <div style={styles.stepTitle}>AI matches you to surge leads</div>
                <div style={styles.stepText}>During heat events and spring tune-up season, ProLnk dispatches hot leads in your zip codes — no bidding, no competition, first come first served.</div>
              </div>
            </div>
            <div style={styles.step}>
              <div style={styles.stepNum}>3</div>
              <div>
                <div style={styles.stepTitle}>Collect commission + network income</div>
                <div style={styles.stepText}>Complete the job, get paid 72% of the 10% platform fee. Recruit other HVAC techs and earn 7% of their commissions indefinitely.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Earnings Calculator</h2>
        <p style={styles.sectionSub}>Estimate your monthly ProLnk income based on your job size and network.</p>
        <div style={styles.calcBox}>
          <div style={styles.calcRow}>
            <span style={styles.calcLabel}>Avg Job Value ($)</span>
            <input style={styles.calcInput} type="number" value={jobValue} onChange={e => setJobValue(Number(e.target.value))} min={200} max={30000} step={200} />
          </div>
          <div style={styles.calcRow}>
            <span style={styles.calcLabel}>HVAC Techs You've Recruited</span>
            <input style={styles.calcInput} type="number" value={networkPros} onChange={e => setNetworkPros(Number(e.target.value))} min={0} max={50} />
          </div>
          <div style={styles.calcRow}>
            <span style={styles.calcLabel}>Their Avg Job Value ($)</span>
            <input style={styles.calcInput} type="number" value={networkAvgJob} onChange={e => setNetworkAvgJob(Number(e.target.value))} min={200} max={20000} step={200} />
          </div>
          <div style={styles.calcResult}>
            <div style={styles.calcResultRow}><span>Your direct commission (72% of 10%)</span><span>${yourCommission.toFixed(0)}</span></div>
            <div style={styles.calcResultRow}><span>Network override ({networkPros} techs × 7%)</span><span>${networkOverride.toFixed(0)}</span></div>
            <div style={styles.calcResultTotal}><span>Estimated Monthly</span><span>${total.toFixed(0)}</span></div>
          </div>
        </div>
      </div>

      <div style={{ ...styles.section, paddingTop: 0 }}>
        <div style={styles.cta}>
          <div style={styles.ctaTitle}>Join ProLnk as a DFW HVAC Tech</div>
          <p style={styles.ctaSub}>Founding HVAC partners lock in the lowest subscription tier permanently. Only 62 spots remain in the DFW market.</p>
          <a href="/apply" style={styles.ctaBtn}>Apply Now — DFW HVAC Partner Network</a>
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
