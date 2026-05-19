import { useState } from 'react';

const findings = [
  { id: 'clean', label: '✅ No light visible — attic is fully sealed', result: 'Excellent Roof Condition', detail: 'No penetrations detected in the attic envelope. Your roofing system has no nail holes, flashing gaps, or pipe boot failures allowing daylight. Continue monitoring annually — especially after major DFW hail events.', severity: 'None' },
  { id: 'pinpoints', label: '🔦 1–3 pinpoints of light (tiny dots)', result: 'Minor Penetrations Detected', detail: 'Small nail holes or hairline flashing gaps. In DFW, these are entry points for water during heavy rain events (especially tropical system remnants). A roofer can seal these with roofing caulk or spot flashing repair at low cost. Do not ignore — water damage compounds rapidly in DFW heat.', severity: 'Low' },
  { id: 'multiple', label: '⚠️ Multiple light sources (4–10 spots)', result: 'Active Leak Pathway Likely', detail: 'Multiple penetrations suggest aging roofing system or prior storm damage that was not fully addressed. Some of these may already be allowing water intrusion during heavy rain. Prioritize a professional roof inspection — identify whether it\’s nail holes, pipe boots, or flashing failures.', severity: 'Moderate' },
  { id: 'beams', label: '🔴 Light beams or large bright areas', result: 'Structural Roofing Failure', detail: 'Large light entry indicates decking gaps, missing shingles, or significant flashing failure. This is an active leak scenario. Schedule emergency roof inspection immediately. DFW summer storms will rapidly worsen any opening of this size. Document with photos for insurance purposes.', severity: 'High' },
];

const tips = [
  { icon: '🌑', title: 'How to Do the Daylight Test', body: 'On a bright DFW afternoon, turn off all attic lights. Wait 2 minutes for eyes to adjust. Scan systematically from peak to eaves. Look for pinpoints — even tiny ones are significant. Bring a helper to mark locations with tape.' },
  { icon: '🔍', title: 'What Exterior Inspection Misses', body: 'From the outside, nail holes under intact shingles are invisible. Pipe boot failures look fine from ground level. The attic daylight test finds penetrations the exterior eye can\’t see — especially around ridge caps and valley flashing.' },
  { icon: '📍', title: 'Mapping Problem Areas', body: 'When you find light, note the attic location (which rafter bay, how far from peak vs eave). This lets a roofer go directly to the problem spot on the exterior without guessing — saves time and money.' },
];

export default function DFWRoofingDaylightTest2026() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'system-ui, sans-serif', color: '#E8EEF7' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🔦</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>DFW Attic Daylight Test for Roofing 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>Find roof penetrations from inside your attic — what exterior inspection misses</p>
        </div>

        <div style={{ background: '#0F2137', border: '1px solid #1E3A5F', borderRadius: 10, padding: 20, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 15, marginBottom: 10 }}>Why This Test Matters in DFW</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            DFW receives 40+ inches of rain annually, often in intense bursts during spring and fall storm season. Tropical system remnants can drop 6–10 inches in 24 hours. Any roofing penetration — even a nail hole — becomes a water pathway under these conditions. The attic daylight test is the most reliable DIY diagnostic available to DFW homeowners.
          </p>
        </div>

        <div style={{ marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>🔦 What Did Your Attic Inspection Find?</h2>
          {findings.map(f => (
            <div key={f.id} style={{ marginBottom: 12 }}>
              <button onClick={() => setActive(active === f.id ? null : f.id)}
                style={{ width: '100%', background: active === f.id ? '#1E3A5F' : '#0F2137', border: `1px solid ${active === f.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '14px 18px', color: '#E8EEF7', cursor: 'pointer', textAlign: 'left', fontSize: 14, fontWeight: 600 }}>
                {f.label}
              </button>
              {active === f.id && (
                <div style={{ background: '#0F2137', border: '1px solid #1E3A5F', borderTop: 'none', borderRadius: '0 0 10px 10px', padding: '16px 18px' }}>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 14 }}>{f.result}</span>
                    <span style={{ background: f.severity === 'None' ? '#064E3B' : f.severity === 'Low' ? '#3B1F00' : f.severity === 'Moderate' ? '#7C2D12' : '#450A0A', color: '#F5E642', borderRadius: 6, padding: '2px 8px', fontSize: 12, fontWeight: 700 }}>Severity: {f.severity}</span>
                  </div>
                  <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{f.detail}</p>
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
          <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 15, marginBottom: 6 }}>🏠 ProLnk — DFW Roofing Pros</div>
          <div style={{ color: '#94A3B8', fontSize: 13 }}>Connect with licensed DFW roofers for attic-to-exterior leak tracing. Get quotes from vetted contractors who know DFW storm patterns.</div>
        </div>
      </div>
    </div>
  );
}