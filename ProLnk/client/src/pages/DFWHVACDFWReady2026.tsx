import { useState } from 'react';

const situations = [
  { id: 'newish', label: '✅ System under 7 years old' },
  { id: 'mid', label: '⚠️ System 7–12 years old' },
  { id: 'old', label: '🚨 System over 12 years old' },
  { id: 'notuneup', label: '❌ No tune-up in 2+ years' },
  { id: 'smart', label: '📱 Have a smart thermostat' },
  { id: 'nosmart', label: '🌡️ Old thermostat (no smart features)' },
];

const scores: Record<string, { score: number; label: string; color: string; tips: string[] }> = {
  newish: { score: 90, label: 'Summer-Ready', color: '#22C55E', tips: ['Schedule a light tune-up just to confirm all is well.', 'Register ERCOT demand-response via your utility.', 'Stock 3 months of filters now — stores sell out by June.'] },
  mid: { score: 62, label: 'Needs Attention', color: '#F59E0B', tips: ['Book a comprehensive inspection before May 31.', 'Ask the tech to check capacitors and refrigerant charge specifically.', 'Get a replacement quote now — if repair quote exceeds 50% of replacement cost, replace.'] },
  old: { score: 30, label: 'High Risk', color: '#EF4444', tips: ['Your system is statistically likely to fail during peak heat.', 'Budget $6,000–$14,000 for replacement — prices rise 20% in June.', 'ProLnk can match you with 2–3 replacement quotes this week.'] },
  notuneup: { score: 40, label: 'Overdue for Service', color: '#F97316', tips: ['Dirty coils and low refrigerant cause 60% of summer failures.', 'Schedule immediately — DFW pros book 3–4 weeks out by May.', 'A $150 tune-up can prevent a $1,200 summer repair.'] },
  smart: { score: 85, label: 'Grid-Ready', color: '#22C55E', tips: ['Enroll in ERCOT demand-response if not already enrolled.', 'Program pre-cooling: set 68°F before 3pm, allow rise to 76°F 3–7pm.', 'Check if your thermostat qualifies for additional utility rebates.'] },
  nosmart: { score: 50, label: 'Missing Out on Savings', color: '#F59E0B', tips: ['A smart thermostat costs $150–$250 installed and pays back in 1–2 summers.', 'Ecobee, Nest, and Honeywell T6 Pro all support ERCOT DR programs.', 'Ask your ProLnk pro to install one during your tune-up visit.'] },
};

export default function DFWHVACDFWReady2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const result = selected ? scores[selected] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>DFW HVAC 2026</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 16px' }}>Is Your DFW Home HVAC-Ready for 2026?</h1>
          <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 600, margin: '0 auto' }}>
            Summer 2026 is forecast to be one of DFW's hottest on record. ERCOT grid improvements help — but only if your system is ready. Select your situation.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 36 }}>
          {situations.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)} style={{ padding: '16px 20px', borderRadius: 10, border: '2px solid', textAlign: 'left', borderColor: selected === s.id ? '#F5E642′ : '#1E3A5F', backgroundColor: selected === s.id ? '#F5E642' : '#0F2340', color: selected === s.id ? '#0A1628' : '#CBD5E1', fontWeight: 600, cursor: ’pointer', fontSize: 15 }}>{s.label}</button>
          ))}
        </div>

        {result ? (
          <div style={{ backgroundColor: '#0F2340', borderRadius: 16, padding: 36, border: '1px solid #1E3A5F' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
              <div style={{ position: 'relative', width: 90, height: 90 }}>
                <svg viewBox="0 0 90 90″ style={{ width: 90, height: 90 }}>
                  <circle cx="45″ cy="45" r="38" fill="none" stroke="#1E3A5F" strokeWidth="10" />
                  <circle cx="45″ cy="45" r="38" fill="none" stroke={result.color} strokeWidth="10" strokeDasharray={`${2.38 * result.score} 238`} strokeLinecap="round" transform="rotate(-90 45 45)" />
                </svg>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontWeight: 800, fontSize: 20, color: result.color }}>{result.score}</div>
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 700, color: result.color }}>{result.label}</div>
                <div style={{ color: '#94A3B8', fontSize: 14 }}>2026 Readiness Score out of 100</div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', marginBottom: 14 }}>What to Do Now</div>
            {result.tips.map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 14 }}>
                <div style={{ minWidth: 28, height: 28, borderRadius: '50%', backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</div>
                <p style={{ color: '#CBD5E1', margin: 0, fontSize: 15, lineHeight: 1.6 }}>{tip}</p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ backgroundColor: '#0F2340', borderRadius: 16, padding: 36, textAlign: 'center', border: '1px solid #1E3A5F' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🏠</div>
            <div style={{ color: '#94A3B8', fontSize: 16 }}>Select your home situation above to see your 2026 readiness score.</div>
          </div>
        )}

        <div style={{ marginTop: 40, textAlign: 'center', backgroundColor: '#0F2340', borderRadius: 12, padding: 28, border: '1px solid #F5E642′ }}>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Get Ready Before Summer Hits</div>
          <p style={{ color: '#94A3B8', marginBottom: 20 }}>ProLnk matches you with vetted DFW HVAC pros who can get your home summer-ready.</p>
          <a href="https://prolnk.io" style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '14px 32px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}>Get My HVAC Match</a>
        </div>
      </div>
    </div>
  );
}
