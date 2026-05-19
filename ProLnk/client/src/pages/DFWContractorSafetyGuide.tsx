import { useState } from 'react';

const trades = ['HVAC', 'Roofing', 'Plumbing', 'Electrical', 'Landscaping', 'General Contractor', 'Concrete/Flatwork'];
const conditions = ['Indoor work, AC available', 'Outdoor work, shade available', 'Full sun exposure', 'Confined space (attic/crawl)', 'High roof work in summer'];

type SafetyRec = { checklist: string[]; heatProtocol: string[]; regulatory: string[] };

const safetyData: Record<string, Record<string, SafetyRec>> = {
  'HVAC': {
    'Full sun exposure': { checklist: ['EPA 608 certification current', 'Refrigerant recovery equipment on truck', 'Fall protection for roof units (6+ foot drop)', 'Lockout/tagout kit for electrical disconnect', 'Hydration: 1 cup water every 15 min in DFW summer'], heatProtocol: ['DFW summer (June-Aug): schedule outdoor work before 11am or after 5pm', 'Wet bulb temperature check before starting roof work', 'Mandatory shade break every 45 min when heat index >100°F', 'Buddy system — never work alone on roof in summer heat', 'Ice cooler with electrolyte drinks mandatory on truck'], regulatory: ['OSHA 29 CFR 1910.147 — Lockout/Tagout required for electrical disconnect', 'EPA Section 608 — refrigerant handling certification mandatory', 'Texas OSHA follows federal standards — same requirements', 'Fall protection required at 6 feet for residential, 4 feet for construction'] },
    'Confined space (attic/crawl)': { checklist: ['Attic ventilation assessment before entry', 'Respirator for blown insulation (N95 minimum)', 'Knee pads for crawlspace work', 'Hydration pack — no cooler access in attic', 'Buddy required for confined space entry'], heatProtocol: ['DFW attics reach 150°F+ in summer — limit time to 20 min intervals', 'Mandatory 30 min cool-down between attic entries', 'Monitor for heat exhaustion: dizziness, nausea, confusion', 'Pre-hydrate before entering — 16oz water before going up', 'Schedule attic work 6am-9am only in July/August'], regulatory: ['OSHA 29 CFR 1910.146 — Permit-required confined space for mechanical rooms', 'Attic work: ventilation assessment required per ACCA', 'Texas workers comp covers heat illness — document exposures'] },
  },
  'Roofing': {
    'Full sun exposure': { checklist: ['Fall arrest harness (full body, ANSI-rated)', 'Roof anchor points installed before work begins', '6-point ladder secured at top and bottom', 'Non-slip boots (roofing-specific)', 'SPF 50+ sunscreen applied — DFW UV index regularly 10+'], heatProtocol: ['DFW roofers: work starts at 6am, off roof by 1pm in June-August', 'Shingle surface temperatures reach 180°F+ in DFW summer', 'Mandatory water consumption: 8oz every 10 minutes on hot roof days', 'Heat index >105°F: mandatory cool-down in AC every 30 min', 'Two-week heat acclimatization for new crew members'], regulatory: ['OSHA 29 CFR 1926.502 — Fall protection required at 6 feet', 'OSHA 29 CFR 1926.503 — Fall protection training required', 'Texas Department of Insurance monitors roofing safety', 'Personal fall arrest system must be inspected before each shift'] },
    'High roof work in summer': { checklist: ['Two anchor points minimum for pitches over 6:12', 'Rope grab and rope for self-rescue', 'Hand signals established (noise on roof)', 'Emergency contact number posted at ground level', 'First aid kit with heat illness supplies at base'], heatProtocol: ['Never work alone on pitched roof above 8:12 pitch in heat', 'Weather app open: stop work if thunderstorm within 10 miles', 'Wet bulb globe temperature (WBGT) check: stop at 88°F WBGT', 'Electrolyte replacement every hour minimum', 'Designate ground spotter for high-pitch work'], regulatory: ['OSHA 1926.502(d) — Personal fall arrest systems specifications', 'Ladder safety: OSHA 1926.1053 — 3-point contact always', 'Texas Dept of Licensing monitors roofing contractor compliance'] },
  },
};

const defaultRec: SafetyRec = { checklist: ['Personal protective equipment for your trade', 'Hydration: 1 cup water every 15-20 minutes minimum', 'First aid kit on every vehicle', 'Emergency contact list posted at job site', 'Current license and insurance documentation on site'], heatProtocol: ['DFW summer heat index regularly exceeds 110°F — treat it seriously', 'Schedule outdoor work before 11am and after 5pm June-August', 'Mandatory shade breaks every 45-60 minutes', 'Buddy system for any outdoor work in high heat', 'Know heat exhaustion symptoms: heavy sweating, weakness, cold/pale/clammy skin'], regulatory: ['Texas follows federal OSHA standards', 'Texas Dept of Licensing and Regulation oversees contractor compliance', 'Workers comp required in Texas for most contractor categories', 'Heat illness OSHA guidance: 29 CFR 1910 General Duty Clause applies'] };

export default function DFWContractorSafetyGuide() {
  const [trade, setTrade] = useState('');
  const [condition, setCondition] = useState('');
  const [result, setResult] = useState<SafetyRec | null>(null);

  const handleGenerate = () => {
    const rec = safetyData[trade]?.[condition] ?? defaultRec;
    setResult(rec);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '4px 12px', borderRadius: '4px', fontSize: '0.75rem', letterSpacing: '0.1em' }}>PROLNK PRO GUIDE</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '1rem', color: '#fff' }}>🦺 DFW Contractor Job Site Safety Guide</h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem', lineHeight: 1.7 }}>DFW summers are a workplace hazard. With heat index regularly exceeding 110°F and UV index at 10+, heat illness is the #1 preventable risk for DFW contractors. Know the rules and protect your crew.</p>
        </div>

        <div style={{ background: '#3d1a0a', border: '1px solid #c05c1a', borderRadius: '8px', padding: '1.25rem', marginBottom: '2rem' }}>
          <div style={{ fontWeight: 700, color: '#ff8c42', marginBottom: '0.5rem' }}>🌡️ DFW Summer Heat Warning</div>
          <div style={{ color: '#fcd9b8', fontSize: '0.9rem', lineHeight: 1.7 }}>Dallas-Fort Worth averages 37 days above 100°F per year. Outdoor workers face up to 3x higher core body temperature than the ambient air when working on reflective surfaces like roofing or concrete. Heat stroke can occur in as little as 15 minutes without hydration in extreme conditions. The Texas heat is not optional — it is a genuine workplace hazard requiring active management.</div>
        </div>

        <div style={{ background: '#111f3a', borderRadius: '12px', padding: '1.75rem', border: '1px solid #1e3a5f', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1.25rem', fontSize: '1.1rem' }}>🛡️ Get Your Safety Checklist</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Your Trade</label>
              <select value={trade} onChange={(e) => setTrade(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: '6px', padding: '0.6rem', fontSize: '0.95rem' }}>
                <option value=''>Select trade...</option>
                {trades.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Job Site Conditions</label>
              <select value={condition} onChange={(e) => setCondition(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: '6px', padding: '0.6rem', fontSize: '0.95rem' }}>
                <option value=''>Select conditions...</option>
                {conditions.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <button onClick={handleGenerate} disabled={!trade || !condition} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: '6px', padding: '0.7rem 1.5rem', cursor: trade && condition ? 'pointer' : 'not-allowed', opacity: trade && condition ? 1 : 0.5 }}>Generate Safety Checklist →</button>
          {result && (
            <div style={{ marginTop: '1.5rem', borderTop: '1px solid #1e3a5f', paddingTop: '1.25rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>SAFETY CHECKLIST</div>
                {result.checklist.map((item) => <div key={item} style={{ color: '#e2e8f0', fontSize: '0.85rem', padding: '0.3rem 0', borderBottom: '1px solid #1e3a5f' }}>✅ {item}</div>)}
                <div style={{ marginTop: '1rem', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>REGULATORY REQUIREMENTS</div>
                {result.regulatory.map((reg) => <div key={reg} style={{ color: '#94a3b8', fontSize: '0.82rem', padding: '0.3rem 0', borderBottom: '1px solid #1e3a5f' }}>📋 {reg}</div>)}
              </div>
              <div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>DFW HEAT PROTOCOL</div>
                {result.heatProtocol.map((item) => <div key={item} style={{ color: '#fcd9b8', fontSize: '0.85rem', padding: '0.3rem 0', borderBottom: '1px solid #1e3a5f' }}>🌡️ {item}</div>)}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0d1f3c', borderRadius: '8px', padding: '1.25rem', border: '1px solid #F5E642' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>💡 ProLnk Pro Tip</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>ProLnk homeowners expect contractors who show up with professional safety practices. Mentioning your safety protocols in your profile bio and during the estimate increases close rates — it signals you run a legitimate operation that won't cut corners on their home either.</div>
        </div>
      </div>
    </div>
  );
}
