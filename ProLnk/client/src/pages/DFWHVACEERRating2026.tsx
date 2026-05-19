import { useState } from 'react';

const concerns = [
  { id: 'cost', label: '💸 High electric bills during DFW summer', rating: 'EER', why: 'EER measures efficiency at peak load conditions — exactly what your DFW system runs at during 105°F July afternoons. A high EER directly reduces your peak-hour electricity cost. Look for EER 12+ for DFW.', seer2note: 'SEER2 averages across all operating conditions including milder temps — less predictive of your actual DFW summer bill.' },
  { id: 'newunit', label: '🔧 Shopping for a new AC unit', rating: 'Both', why: 'Get both numbers. SEER2 is the federal minimum compliance metric. EER tells you how the unit actually performs at DFW summer peak. Compare EER between models at the same SEER2 rating — higher EER wins for DFW.', seer2note: 'Federal minimum is now SEER2 15 for DFW (South region). Units below this cannot be installed new in Texas.' },
  { id: 'comfort', label: '🌡️ House doesn\’t cool below 80°F on 105°F days', rating: 'EER', why: 'This is a peak-load problem. EER measures exactly this scenario. If your unit has low EER (under 11), it\’s losing efficiency precisely when you need it most. Size and duct condition also matter — but EER is where to start.', seer2note: 'A high SEER2 unit with low EER may look good on paper but underperform on DFW\’s hottest days.' },
  { id: 'compare', label: '📊 Comparing rebate-eligible units', rating: 'SEER2', why: 'Oncor and other DFW utilities base rebates on SEER2 ratings. Most residential rebate programs require SEER2 16+ or 17+. Confirm current Oncor rebate requirements before purchasing.', seer2note: 'SEER2 replaced SEER in 2023 with stricter test conditions — SEER2 14.3 roughly equals old SEER 15.' },
];

const explainers = [
  { icon: '📐', title: 'SEER2 — Seasonal Energy Efficiency Ratio', body: 'Measures average efficiency across an entire cooling season, including startup/shutdown cycles and mild weather. Updated 2023 test protocol (M1 blower setup) is more realistic than original SEER. Used for federal minimums and utility rebates.' },
  { icon: '🔥', title: 'EER — Energy Efficiency Ratio', body: 'Measures efficiency at a single peak condition: 95°F outdoor, 80°F indoor, 50% humidity. This specific scenario closely matches a typical DFW summer afternoon. EER does not average — it captures worst-case performance. Higher EER = better DFW summer performance.' },
  { icon: '🌡️', title: 'Why DFW Differs from National Averages', body: 'National SEER2 calculations assume milder summer averages. DFW runs AC at or near peak conditions for 90+ days annually. A unit optimized for mild climates (high SEER2, moderate EER) may underperform a unit optimized for heat (moderate SEER2, high EER) in actual DFW conditions.' },
];

export default function DFWHVACEERRating2026() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'system-ui, sans-serif', color: '#E8EEF7' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>⚡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>DFW HVAC EER vs SEER2 Guide 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>Understanding which efficiency rating actually matters for North Texas cooling</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          <div style={{ background: '#0F2137', border: '2px solid #F5E642', borderRadius: 10, padding: 16, textAlign: 'center' }}>
            <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 20 }}>EER</div>
            <div style={{ color: '#94A3B8', fontSize: 12, marginTop: 4 }}>Peak-day performance</div>
            <div style={{ color: '#F5E642', fontSize: 11, marginTop: 8, fontWeight: 700 }}>⭐ More relevant for DFW</div>
          </div>
          <div style={{ background: '#0F2137', border: '1px solid #1E3A5F', borderRadius: 10, padding: 16, textAlign: 'center' }}>
            <div style={{ color: '#CBD5E1', fontWeight: 800, fontSize: 20 }}>SEER2</div>
            <div style={{ color: '#94A3B8', fontSize: 12, marginTop: 4 }}>Seasonal average efficiency</div>
            <div style={{ color: '#94A3B8', fontSize: 11, marginTop: 8 }}>Required for rebates/code</div>
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>🎯 What's Your DFW Cooling Concern?</h2>
          {concerns.map(c => (
            <div key={c.id} style={{ marginBottom: 12 }}>
              <button onClick={() => setActive(active === c.id ? null : c.id)}
                style={{ width: '100%', background: active === c.id ? '#1E3A5F' : '#0F2137', border: `1px solid ${active === c.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '14px 18px', color: '#E8EEF7', cursor: 'pointer', textAlign: 'left', fontSize: 14, fontWeight: 600 }}>
                {c.label}
              </button>
              {active === c.id && (
                <div style={{ background: '#0F2137', border: '1px solid #1E3A5F', borderTop: 'none', borderRadius: '0 0 10px 10px', padding: '16px 18px' }}>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 13, marginBottom: 8 }}>Focus on: {c.rating}</div>
                  <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6, marginBottom: 10 }}>{c.why}</p>
                  <div style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px' }}>
                    <span style={{ color: '#94A3B8', fontSize: 13 }}>Re: SEER2 — {c.seer2note}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 24 }}>
          {explainers.map((e, i) => (
            <div key={i} style={{ background: '#0F2137', border: '1px solid #1E3A5F', borderRadius: 10, padding: '16px 18px', marginBottom: 12 }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{e.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{e.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.6 }}>{e.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2137', border: '1px solid #F5E642', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 15, marginBottom: 6 }}>🏠 ProLnk — DFW HVAC Equipment Experts</div>
          <div style={{ color: '#94A3B8', fontSize: 13 }}>Get quotes from DFW HVAC pros who understand EER vs SEER2 — and can recommend the right unit for North Texas heat.</div>
        </div>
      </div>
    </div>
  );
}