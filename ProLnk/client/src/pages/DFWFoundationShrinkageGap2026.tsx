import { useState } from 'react';

const gapRanges = [
  { id: 'none', label: '🟢 No visible gap — walls flush to floor', assessment: 'Normal', detail: 'Clay soil is currently well-hydrated. Good drainage and foundation watering are maintaining stable moisture levels. Monitor seasonally.', risk: 'Low' },
  { id: 'small', label: '🟡 Small gap — under 1/4 inch (pencil tip)', assessment: 'Normal Seasonal Movement', detail: 'This is the typical DFW shrinkage range during dry periods. Blackland Prairie clay contracts as it dries. This gap should close with rain or irrigation. Consider caulking with paintable latex caulk if cosmetically bothersome.', risk: 'Low–Moderate' },
  { id: 'medium', label: '🟠 Medium gap — 1/4 to 1/2 inch (pencil width)', assessment: 'Monitor Closely', detail: 'Soil moisture is significantly depleted. Start foundation watering immediately (slow drip 18 inches from foundation, 30 min/day). Gap should reduce within 2–3 weeks. If it doesn\'t close, consult a structural engineer.', risk: 'Moderate' },
  { id: 'large', label: '🔴 Large gap — over 1/2 inch (fingertip fits in)', assessment: 'Structural Evaluation Needed', detail: 'This exceeds normal seasonal movement range for DFW clay. Combined with other signs (sticking doors, diagonal cracks at corners, sloping floors), this warrants a licensed structural engineer evaluation — not just a foundation company sales visit.', risk: 'High' },
];

const tips = [
  { icon: '💧', title: 'Foundation Watering Connection', body: 'DFW gaps are almost always a soil moisture problem. A soaker hose system 18 inches from the foundation, running 30 minutes daily during drought, prevents most seasonal gap formation.' },
  { icon: '🧱', title: 'Caulking Small Gaps', body: 'For gaps under 1/4 inch: clean with a dry cloth, apply paintable latex caulk, smooth with a wet finger. Do not use rigid caulk — it will crack when soil re-expands in wet season.' },
  { icon: '🔍', title: 'What to Watch Alongside Gaps', body: 'Gaps alone aren\'t alarming. Combine gap size with: sticking doors/windows, diagonal cracks from corners, floors sloping more than 1 inch over 20 feet, or exterior brick step cracks.' },
];

export default function DFWFoundationShrinkageGap2026() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'system-ui, sans-serif', color: '#E8EEF7' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏚️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>DFW Foundation Shrinkage Gap Guide 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>Understanding the gap between walls and floors in North Texas clay soil homes</p>
        </div>

        <div style={{ background: '#0F2137', border: '1px solid #1E3A5F', borderRadius: 10, padding: 20, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 15, marginBottom: 10 }}>Why This Happens in DFW</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            Dallas-Fort Worth sits on Blackland Prairie clay — one of the most expansive soils in North America. This clay absorbs water and swells, then releases water and shrinks dramatically. As soil dries, it pulls away from foundations, which can create visible gaps where walls meet floors. This is a normal DFW phenomenon that alarms most homeowners who have moved from other regions.
          </p>
        </div>

        <div style={{ marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>📏 Describe Your Gap</h2>
          {gapRanges.map(g => (
            <div key={g.id} style={{ marginBottom: 12 }}>
              <button onClick={() => setActive(active === g.id ? null : g.id)}
                style={{ width: '100%', background: active === g.id ? '#1E3A5F' : '#0F2137', border: `1px solid ${active === g.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '14px 18px', color: '#E8EEF7', cursor: 'pointer', textAlign: 'left', fontSize: 14, fontWeight: 600 }}>
                {g.label}
              </button>
              {active === g.id && (
                <div style={{ background: '#0F2137', border: '1px solid #1E3A5F', borderTop: 'none', borderRadius: '0 0 10px 10px', padding: '16px 18px' }}>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'center' }}>
                    <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 14 }}>Assessment: {g.assessment}</span>
                    <span style={{ background: g.risk === 'Low' ? '#064E3B' : g.risk === 'Low–Moderate' ? '#3B1F00' : g.risk === 'Moderate' ? '#7C2D12' : '#450A0A', color: '#F5E642', borderRadius: 6, padding: '2px 8px', fontSize: 12, fontWeight: 700 }}>Risk: {g.risk}</span>
                  </div>
                  <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{g.detail}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 24 }}>
          {tips.map((t, i) => (
            <div key={i} style={{ background: '#0F2137', border: '1px solid #1E3A5F', borderRadius: 10, padding: '16px 18px', marginBottom: 12 }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{t.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{t.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.6 }}>{t.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2137', border: '1px solid #F5E642', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 15, marginBottom: 6 }}>🏠 ProLnk — DFW Foundation Specialists</div>
          <div style={{ color: '#94A3B8', fontSize: 13 }}>Connect with licensed DFW structural engineers and foundation contractors — not sales-first companies. Get an honest assessment.</div>
        </div>
      </div>
    </div>
  );
}