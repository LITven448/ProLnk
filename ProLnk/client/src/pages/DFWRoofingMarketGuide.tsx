import { useState } from 'react';

const areas = ['North Dallas', 'Plano / Allen', 'Frisco / McKinney', 'Rockwall / Rowlett', 'Fort Worth', 'Arlington / Mansfield', 'Denton / Flower Mound', 'Garland / Mesquite'];
const timings = ['Pre-Storm Season (Jan–Mar)', 'Post-Hail Event (0–30 days)', 'Post-Hail Settling (3–6 months)', 'Off-Peak (Oct–Dec)'];

const data: Record<string, { conditions: string; approach: string; insuranceTip: string; watch: string }> = {
  'Pre-Storm Season (Jan–Mar)': {
    conditions: '🟢 Best window — Local contractors hungry for work. Minimal storm chaser presence.',
    approach: 'Get 3 quotes from established local roofers. Lock in pricing now before spring hail season.',
    insuranceTip: 'File any lingering claims from prior year before March. Adjusters are available and backlogs are low.',
    watch: 'Avoid contractors offering unusually low bids — may be cutting material quality.',
  },
  'Post-Hail Event (0–30 days)': {
    conditions: '🔴 Danger zone — Storm chasers flood DFW within 48–72 hours of major hail events.',
    approach: 'Do NOT sign anything immediately. Let storm chasers self-select out. Wait 2–4 weeks for local roofers to free up.',
    insuranceTip: 'Call your adjuster within 30 days to preserve claim rights. Do not let a storm chaser contact your insurer directly.',
    watch: '⚠️ Never sign a "direction to pay" or "assignment of benefits" form with a storm chaser. This is common in DFW and causes major disputes.',
  },
  'Post-Hail Settling (3–6 months)': {
    conditions: '🟡 Moderate — Storm chasers gone. Local roofers clearing backlog. Pricing stabilizing.',
    approach: 'This is the safest post-event window. Local roofers available, prices reasonable, work quality higher.',
    insuranceTip: 'Supplemental claims can be filed if original estimate missed damage. Use an independent adjuster if needed.',
    watch: 'Verify contractor has valid RCAT or TDA license. Check BBB rating and local reviews.',
  },
  'Off-Peak (Oct–Dec)': {
    conditions: '🟢 Favorable — Quietest roofing market in DFW. Best leverage for negotiation.',
    approach: 'Great time to schedule preventive inspections and address minor repairs before next storm season.',
    insuranceTip: 'Review your policy before renewal. Many DFW homeowners are underinsured for hail.',
    watch: 'Cold temps affect shingle adhesion — avoid full replacements below 40°F.',
  },
};

const areaInsights: Record<string, string> = {
  'Rockwall / Rowlett': '⚡ Highest hail frequency in DFW. Storm chasers prioritize this corridor after events.',
  'Frisco / McKinney': '🏗️ New construction boom means roofing crews pulled between residential and commercial work.',
  'Fort Worth': '💨 West Fort Worth sees the most severe storm tracks from the west. Extra vet time needed post-storm.',
};

export default function DFWRoofingMarketGuide() {
  const [area, setArea] = useState('');
  const [timing, setTiming] = useState('');

  const timingResult = timing ? data[timing] : null;
  const areaNote = area ? areaInsights[area] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>DFW MARKET GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🏠 DFW Roofing Market</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>DFW is one of the most active hail markets in the US. After every major storm, hundreds of out-of-state storm chasers descend on neighborhoods within days. Knowing how to navigate this protects your home and your wallet.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[['🌩️', 'Storm Chaser Risk', 'DFW sees 200+ traveling roofing companies after major hail. Most leave after 90 days.'], ['📋', 'Claim Timing Matters', 'Filing too fast (storm chasers) or too slow (missed window) both hurt outcomes.'], ['🏅', 'Local = Better', 'Local roofers have TX licenses, liability insurance, and reputation to protect.']].map(([icon, title, desc]) => (
            <div key={String(title)} style={{ backgroundColor: '#112240', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Check Market Conditions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>DFW Area</label>
              <select value={area} onChange={e => setArea(e.target.value)} style={{ width: '100%', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select area...</option>
                {areas.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Timing / Situation</label>
              <select value={timing} onChange={e => setTiming(e.target.value)} style={{ width: '100%', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select timing...</option>
                {timings.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          {areaNote && <div style={{ backgroundColor: '#1a2f4e', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 14, color: '#F5E642' }}>{areaNote}</div>}
          {timingResult && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ marginBottom: 10, fontWeight: 600 }}>Market Conditions</div>
              <div style={{ marginBottom: 12, color: '#e2e8f0' }}>{timingResult.conditions}</div>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#F5E642', fontWeight: 600 }}>Recommended Approach: </span>{timingResult.approach}</div>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#F5E642', fontWeight: 600 }}>Insurance Tip: </span>{timingResult.insuranceTip}</div>
              <div style={{ backgroundColor: '#1a2f4e', borderRadius: 8, padding: 10, fontSize: 13, color: '#94a3b8', marginTop: 12 }}>⚠️ Watch out: {timingResult.watch}</div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 18, marginBottom: 6 }}>Get Matched With a Vetted DFW Roofer</div>
          <div style={{ color: '#0A1628', fontSize: 14, marginBottom: 12 }}>ProLnk only works with licensed, local roofing contractors — no storm chasers, ever.</div>
          <div style={{ backgroundColor: '#0A1628', color: '#F5E642', fontWeight: 700, padding: '10px 24px', borderRadius: 8, display: 'inline-block' }}>Join ProLnk Waitlist →</div>
        </div>
      </div>
    </div>
  );
}
