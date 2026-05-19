import { useState } from 'react';

const systemTypes = [
  { id: 'split', label: '🏠 Central Split System' },
  { id: 'packaged', label: '📦 Packaged Unit' },
  { id: 'minisplit', label: '🔀 Mini-Split / Ductless' },
  { id: 'geo', label: '🌍 Geothermal' },
];

const usageLevels = [
  { id: 'light', label: '💨 Light (< 5 months cooling/yr)' },
  { id: 'moderate', label: '🌡️ Moderate (5–7 months cooling/yr)' },
  { id: 'heavy', label: '🔥 Heavy (7+ months — typical DFW)' },
];

const ages = [
  { id: 'new', label: '0–3 Years Old' },
  { id: 'mid', label: '4–8 Years Old' },
  { id: 'old', label: '9–12 Years Old' },
  { id: 'aging', label: '13+ Years Old' },
];

type SystemKey = 'split' | 'packaged' | 'minisplit' | 'geo';
type UsageKey = 'light' | 'moderate' | 'heavy';
type AgeKey = 'new' | 'mid' | 'old' | 'aging';

interface LifeResult { national: string; dfwExpected: string; remaining: string; action: string; urgency: 'low' | 'medium' | 'high' }

const lifeData: Record<SystemKey, Record<UsageKey, Record<AgeKey, LifeResult>>> = {
  split: {
    light: { new: { national: '15–20 yrs', dfwExpected: '15–18 yrs', remaining: '12–15 yrs remaining', action: 'Schedule next tune-up in 12 months', urgency: 'low' }, mid: { national: '15–20 yrs', dfwExpected: '15–18 yrs', remaining: '7–11 yrs remaining', action: 'Tune-up + coil cleaning now — protect mid-life system', urgency: 'low' }, old: { national: '15–20 yrs', dfwExpected: '15–18 yrs', remaining: '3–6 yrs remaining', action: 'Budget for replacement. Get quotes now before emergency.', urgency: 'medium' }, aging: { national: '15–20 yrs', dfwExpected: '15–18 yrs', remaining: '0–2 yrs remaining', action: 'Replace now. Every year past 13 is borrowed time in DFW.', urgency: 'high' } },
    moderate: { new: { national: '15–20 yrs', dfwExpected: '14–16 yrs', remaining: '11–13 yrs remaining', action: 'Annual tune-up keeps this system healthy', urgency: 'low' }, mid: { national: '15–20 yrs', dfwExpected: '14–16 yrs', remaining: '6–9 yrs remaining', action: 'Increase maintenance frequency to twice yearly', urgency: 'low' }, old: { national: '15–20 yrs', dfwExpected: '14–16 yrs', remaining: '2–4 yrs remaining', action: 'Plan replacement within 2–3 years. Don\’t spend >$1,500 on repairs.', urgency: 'medium' }, aging: { national: '15–20 yrs', dfwExpected: '14–16 yrs', remaining: 'At/past end of life', action: 'Replace immediately — risk of peak-summer failure is high', urgency: 'high' } },
    heavy: { new: { national: '15–20 yrs', dfwExpected: '12–14 yrs', remaining: '9–11 yrs remaining', action: 'Twice-yearly maintenance is critical for DFW heavy use', urgency: 'low' }, mid: { national: '15–20 yrs', dfwExpected: '12–14 yrs', remaining: '4–7 yrs remaining', action: 'Inspect refrigerant, coils, and capacitor annually — DFW heavy use accelerates wear', urgency: 'medium' }, old: { national: '15–20 yrs', dfwExpected: '12–14 yrs', remaining: '0–2 yrs remaining', action: 'Plan replacement NOW. High failure risk during next DFW summer peak.', urgency: 'high' }, aging: { national: '15–20 yrs', dfwExpected: '12–14 yrs', remaining: 'Past expected life', action: 'REPLACE IMMEDIATELY. This system is a breakdown risk this summer.', urgency: 'high' } },
  },
  packaged: {
    light: { new: { national: '12–17 yrs', dfwExpected: '13–16 yrs', remaining: '10–13 yrs remaining', action: 'Annual service — outdoor exposure requires attention', urgency: 'low' }, mid: { national: '12–17 yrs', dfwExpected: '13–16 yrs', remaining: '5–9 yrs remaining', action: 'Inspect cabinet seal and refrigerant lines yearly', urgency: 'low' }, old: { national: '12–17 yrs', dfwExpected: '13–16 yrs', remaining: '1–4 yrs remaining', action: 'Get replacement quotes. Budget now to avoid emergency spend.', urgency: 'medium' }, aging: { national: '12–17 yrs', dfwExpected: '13–16 yrs', remaining: 'At end of life', action: 'Replace now — outdoor DFW exposure accelerates degradation past 13 years', urgency: 'high' } },
    moderate: { new: { national: '12–17 yrs', dfwExpected: '12–15 yrs', remaining: '9–12 yrs remaining', action: 'Good shape — annual tune-up sufficient', urgency: 'low' }, mid: { national: '12–17 yrs', dfwExpected: '12–15 yrs', remaining: '4–8 yrs remaining', action: 'Inspect coil fins and cabinet integrity — DFW heat warps outdoor units', urgency: 'low' }, old: { national: '12–17 yrs', dfwExpected: '12–15 yrs', remaining: '0–3 yrs remaining', action: 'Start replacement planning. Don\’t invest >$1,000 in repairs now.', urgency: 'medium' }, aging: { national: '12–17 yrs', dfwExpected: '12–15 yrs', remaining: 'At/past end of life', action: 'Replace immediately — outdoor DFW packaged units fail fast past 13 years', urgency: 'high' } },
    heavy: { new: { national: '12–17 yrs', dfwExpected: '11–13 yrs', remaining: '8–10 yrs remaining', action: 'Semi-annual maintenance required for DFW heavy-use packaged units', urgency: 'low' }, mid: { national: '12–17 yrs', dfwExpected: '11–13 yrs', remaining: '3–6 yrs remaining', action: 'Watch capacitors, contactors — high-wear parts in DFW heat', urgency: 'medium' }, old: { national: '12–17 yrs', dfwExpected: '11–13 yrs', remaining: '0–1 yr remaining', action: 'Replace before next summer. Heavy DFW use exhausts packaged units by year 11.', urgency: 'high' }, aging: { national: '12–17 yrs', dfwExpected: '11–13 yrs', remaining: 'Past expected life', action: 'REPLACE NOW — significant risk of failure during DFW peak cooling season', urgency: 'high' } },
  },
  minisplit: {
    light: { new: { national: '15–20 yrs', dfwExpected: '17–22 yrs', remaining: '14–19 yrs remaining', action: 'Excellent investment — clean filters quarterly', urgency: 'low' }, mid: { national: '15–20 yrs', dfwExpected: '17–22 yrs', remaining: '9–15 yrs remaining', action: 'Annual refrigerant check and filter cleaning', urgency: 'low' }, old: { national: '15–20 yrs', dfwExpected: '17–22 yrs', remaining: '5–10 yrs remaining', action: 'Still in good shape — monitor for refrigerant loss', urgency: 'low' }, aging: { national: '15–20 yrs', dfwExpected: '17–22 yrs', remaining: '2–7 yrs remaining', action: 'Consider proactive replacement planning — electronics age even if mechanism holds', urgency: 'medium' } },
    moderate: { new: { national: '15–20 yrs', dfwExpected: '16–20 yrs', remaining: '13–17 yrs remaining', action: 'Excellent DFW choice — no duct losses, long life', urgency: 'low' }, mid: { national: '15–20 yrs', dfwExpected: '16–20 yrs', remaining: '8–13 yrs remaining', action: 'Clean indoor heads and check outdoor unit clearance annually', urgency: 'low' }, old: { national: '15–20 yrs', dfwExpected: '16–20 yrs', remaining: '4–8 yrs remaining', action: 'Good remaining life — verify board health on annual service', urgency: 'low' }, aging: { national: '15–20 yrs', dfwExpected: '16–20 yrs', remaining: '1–5 yrs remaining', action: 'Watch for control board issues — most common late-life mini-split failure', urgency: 'medium' } },
    heavy: { new: { national: '15–20 yrs', dfwExpected: '14–18 yrs', remaining: '11–15 yrs remaining', action: 'DFW heavy use still better than ducted systems — no attic heat losses', urgency: 'low' }, mid: { national: '15–20 yrs', dfwExpected: '14–18 yrs', remaining: '6–11 yrs remaining', action: 'Semi-annual filter cleaning essential for heavy DFW use', urgency: 'low' }, old: { national: '15–20 yrs', dfwExpected: '14–18 yrs', remaining: '2–6 yrs remaining', action: 'Inspect compressor and refrigerant annually — DFW heavy use adds years of wear', urgency: 'medium' }, aging: { national: '15–20 yrs', dfwExpected: '14–18 yrs', remaining: '0–2 yrs remaining', action: 'Plan replacement. Heavy DFW use at 13+ years puts mini-splits at end of expected life.', urgency: 'high' } },
  },
  geo: {
    light: { new: { national: '20–25 yrs', dfwExpected: '25–30 yrs', remaining: '22–27 yrs remaining', action: 'Excellent — annual system check only needed', urgency: 'low' }, mid: { national: '20–25 yrs', dfwExpected: '25–30 yrs', remaining: '17–23 yrs remaining', action: 'Ground loop integrity check every 5 years', urgency: 'low' }, old: { national: '20–25 yrs', dfwExpected: '25–30 yrs', remaining: '13–19 yrs remaining', action: 'Still mid-life for geothermal — check fluid levels and pump health', urgency: 'low' }, aging: { national: '20–25 yrs', dfwExpected: '25–30 yrs', remaining: '8–15 yrs remaining', action: 'Monitor heat exchanger and pump — indoor unit may need replacing before ground loop', urgency: 'low' } },
    moderate: { new: { national: '20–25 yrs', dfwExpected: '24–28 yrs', remaining: '21–25 yrs remaining', action: 'Outstanding investment for DFW — ground stays 65°F year-round', urgency: 'low' }, mid: { national: '20–25 yrs', dfwExpected: '24–28 yrs', remaining: '16–21 yrs remaining', action: 'Annual system service — check antifreeze concentration in ground loop', urgency: 'low' }, old: { national: '20–25 yrs', dfwExpected: '24–28 yrs', remaining: '12–16 yrs remaining', action: 'Well into productive life — check blower and heat exchanger condition', urgency: 'low' }, aging: { national: '20–25 yrs', dfwExpected: '24–28 yrs', remaining: '7–12 yrs remaining', action: 'Budget for future indoor unit replacement — ground loop will outlast it', urgency: 'low' } },
    heavy: { new: { national: '20–25 yrs', dfwExpected: '22–26 yrs', remaining: '19–23 yrs remaining', action: 'Best DFW choice for heavy use — ground loop unaffected by 100°F+ above', urgency: 'low' }, mid: { national: '20–25 yrs', dfwExpected: '22–26 yrs', remaining: '14–19 yrs remaining', action: 'Annual service on indoor components — ground loop is maintenance-free', urgency: 'low' }, old: { national: '20–25 yrs', dfwExpected: '22–26 yrs', remaining: '10–14 yrs remaining', action: 'Check compressor health — most common heavy-use geothermal wear point', urgency: 'low' }, aging: { national: '20–25 yrs', dfwExpected: '22–26 yrs', remaining: '5–10 yrs remaining', action: 'Indoor unit may need refresh — ground loop still good for decades', urgency: 'medium' } },
  },
};

const urgencyColors = { low: '#4ade80', medium: '#facc15', high: '#f87171′ };

export default function DFWHVACSystemLifeExpectancy() {
  const [system, setSystem] = useState<SystemKey | null>(null);
  const [usage, setUsage] = useState<UsageKey | null>(null);
  const [age, setAge] = useState<AgeKey | null>(null);
  const result = system && usage && age ? lifeData[system]?.[usage]?.[age] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>📅</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>DFW HVAC System Life Expectancy</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>How DFW's 7-month cooling season reduces equipment life vs national averages — know when to plan replacement</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}>
          {[{ label: '🌡️ DFW Cooling Season', value: '7 Months', sub: 'vs 3–4 months nationally' }, { label: '📉 Life Reduction vs National', value: '15–25%', sub: 'due to DFW extreme heat' }, { label: '⚠️ Avg Replacement Age (DFW)', value: '12–14 Yrs', sub: 'vs 15–17 yrs nationally' }].map(s => (
            <div key={s.label} style={{ background: '#111f3a', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 11 }}>{s.label}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#F5E642', margin: '6px 0 2px' }}>{s.value}</div>
              <div style={{ color: '#475569', fontSize: 11 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 18 }}>🔍 Your System → Remaining Life Estimate</h2>
          {[{ label: 'System Type:', options: systemTypes, state: system, setter: (v: string) => setSystem(v as SystemKey) }, { label: 'DFW Use Level:', options: usageLevels, state: usage, setter: (v: string) => setUsage(v as UsageKey) }, { label: 'System Age:', options: ages, state: age, setter: (v: string) => setAge(v as AgeKey) }].map(row => (
            <div key={row.label} style={{ marginBottom: 16 }}>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>{row.label}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {row.options.map((o: { id: string; label: string }) => (
                  <button key={o.id} onClick={() => row.setter(o.id)} style={{ background: row.state === o.id ? '#F5E642′ : '#1e3a5f', color: row.state === o.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '9px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 12 }}>{o.label}</button>
                ))}
              </div>
            </div>
          ))}
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: `4px solid ${urgencyColors[result.urgency]}` }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 14 }}>
                <div><div style={{ fontSize: 15, fontWeight: 700, color: '#F5E642′ }}>{result.dfwExpected}</div><div style={{ fontSize: 11, color: '#64748b' }}>DFW Expected Lifespan</div></div>
                <div><div style={{ fontSize: 15, fontWeight: 700, color: urgencyColors[result.urgency] }}>{result.remaining}</div><div style={{ fontSize: 11, color: '#64748b' }}>Est. Remaining Life</div></div>
              </div>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: 14, lineHeight: 1.6 }}>🔧 {result.action}</p>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, color: '#475569', fontSize: 12 }}>ProLnk — Connect with Verified DFW HVAC Pros</div>
      </div>
    </div>
  );
}
