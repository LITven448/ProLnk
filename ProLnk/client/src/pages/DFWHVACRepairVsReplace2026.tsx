import { useState } from 'react';

export default function DFWHVACRepairVsReplace2026() {
  const [age, setAge] = useState<string | null>(null);
  const [repairQuote, setRepairQuote] = useState<string>('');
  const [refrigerant, setRefrigerant] = useState<string | null>(null);

  const getRecommendation = () => {
    if (!age || !repairQuote) return null;
    const quote = parseFloat(repairQuote);
    if (isNaN(quote) || quote <= 0) return null;
    const replaceThreshold = age === 'old' ? 3500 : age === 'mid' ? 5000 : 7000;
    const isRefrigerantBad = refrigerant === 'r22';
    if (isRefrigerantBad) return { action: 'Replace', emoji: '🔄', reason: 'R-22 refrigerant is no longer produced and costs $80-100/lb. Any R-22 system should be replaced now.', math: '' };
    if (quote >= replaceThreshold * 0.5) return { action: 'Replace', emoji: '🔄', reason: 'Your repair cost exceeds the 50% rule — money better spent toward a new system.', math: `Repair: $${quote.toLocaleString()} vs 50% threshold: $${(replaceThreshold * 0.5).toLocaleString()}` };
    return { action: 'Repair', emoji: '🔧', reason: 'Repair makes financial sense. The system has life left and the repair is well below the replacement threshold.', math: `Repair: $${quote.toLocaleString()} is below the $${(replaceThreshold * 0.5).toLocaleString()} 50% threshold.` };
  };

  const rec = getRecommendation();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>PROLNK HVAC GUIDE · DFW · 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🔧 Repair vs Replace Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Use the 50% rule and these DFW-specific factors to make the right call.</p>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>📐 The 50% Rule</div>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>If your repair cost exceeds <strong style={{ color: '#fff' }}>50% of what a new system costs</strong>, replace it. A new 3-ton system in DFW runs $5,000–8,000, so the threshold is roughly <strong style={{ color: '#F5E642' }}>$2,500–4,000</strong>.</p>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🧊 R-410A Phase-Out Warning</div>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>R-410A is being phased out in 2025-2026. If your system uses R-22 (older) or has had multiple refrigerant leaks, replacement is strongly recommended before costs spike further.</p>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>🧮 Run the Numbers on Your System</div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>System age:</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {[{ v: 'new', l: 'Under 8 yrs' }, { v: 'mid', l: '8–14 yrs' }, { v: 'old', l: '15+ yrs' }].map(a => (
                <button key={a.v} onClick={() => setAge(a.v)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, background: age === a.v ? '#F5E642' : '#1e3a5f', color: age === a.v ? '#0A1628' : '#fff' }}>{a.l}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Refrigerant type:</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {[{ v: 'r22', l: 'R-22 (old)' }, { v: 'r410', l: 'R-410A' }, { v: 'r454', l: 'R-454B (new)' }].map(r => (
                <button key={r.v} onClick={() => setRefrigerant(r.v)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, background: refrigerant === r.v ? '#F5E642' : '#1e3a5f', color: refrigerant === r.v ? '#0A1628' : '#fff' }}>{r.l}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Repair quote ($):</div>
            <input type="number" placeholder="e.g. 1800" value={repairQuote} onChange={e => setRepairQuote(e.target.value)} style={{ background: '#1e3a5f', border: 'none', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 16, width: '100%', boxSizing: 'border-box' }} />
          </div>
          {rec && (
            <div style={{ background: '#0d2240', borderRadius: 8, padding: 16, borderLeft: `4px solid ${rec.action === 'Replace' ? '#f87171' : '#34d399'}` }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{rec.emoji} {rec.action} your system</div>
              <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 6 }}>{rec.reason}</p>
              {rec.math && <div style={{ color: '#F5E642', fontSize: 12 }}>{rec.math}</div>}
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 6 }}>Get a second opinion from a licensed DFW tech</div>
          <div style={{ color: '#1a2f4e', fontSize: 13 }}>ProLnk sends a vetted contractor to assess your system — no pressure, no upsell.</div>
        </div>
      </div>
    </div>
  );
}
