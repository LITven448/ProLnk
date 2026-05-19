import { useState } from 'react';

const scenarios = [
  { id: 'leaks', label: '💧 Flat roof leaks repeatedly despite repairs', feasibility: 'High Feasibility', cost: '$18,000 – $35,000+', detail: 'Recurring leaks on a flat roof often indicate the membrane has reached end-of-life or the underlying decking has sustained repeated water damage. Adding slope solves the drainage problem permanently. Structural assessment required first — most DFW residential framing can support added slope framing. ROI is strong when compared to repeated membrane replacement cycles.', proceed: true },
  { id: 'drainage', label: '🌧️ Water pools on flat roof after DFW rain', feasibility: 'Good Candidate', cost: '$15,000 – $28,000', detail: 'Ponding water on flat roofs is a classic DFW problem — heavy rainfall plus minimal slope equals puddles that stress the membrane and cause premature failure. Before full conversion, assess whether tapered insulation ($3–8K) might solve drainage without structural changes. If the deck is solid and leaks haven\’t started, tapered insulation is often the better first step.', proceed: true },
  { id: 'insurance', label: '🏦 Insurance company is questioning flat roof coverage', feasibility: 'Moderate — Worth Analyzing', cost: '$15,000 – $30,000', detail: 'Some DFW insurers have become reluctant to renew flat roof coverage after storm claims. Converting to slope can restore full coverage eligibility and potentially reduce premiums. Get insurance requirements in writing before starting conversion — confirm the minimum slope required for standard coverage (typically 2:12 pitch minimum).', proceed: true },
  { id: 'newmembrane', label: '✅ Flat roof is new or recently replaced (under 5 years)', feasibility: 'Low Feasibility — Maintain Flat System', cost: 'N/A', detail: 'A new flat roof membrane (TPO, EPDM, or modified bitumen) has significant remaining life. Converting now would waste that investment. Maintain the current flat system, ensure drains are clear, inspect annually, and address any ponding with minor slope correction. Revisit conversion when the current membrane reaches 15–20 years of age.', proceed: false },
  { id: 'aesthetic', label: '🏠 Want to change the look of the house', feasibility: 'Proceed Cautiously', cost: '$20,000 – $45,000+', detail: 'Aesthetic conversion from flat to slope is the most expensive scenario — you\’re adding structural framing, sheathing, roofing material, and potentially changing the ceiling profile. In DFW, you also need to account for attic ventilation in the new slope space. Get structural engineering approval and a detailed quote before committing. The cost-per-aesthetic-benefit ratio is high.', proceed: false },
];

const requirements = [
  { icon: '🏗️', title: 'Structural Load Assessment', body: 'Adding slope framing over an existing flat roof adds 8–15 lbs per square foot of dead load. A structural engineer must verify existing walls and foundation can support this. In DFW, most residential wood framing handles this adequately — but it must be verified, not assumed.' },
  { icon: '📐', title: 'Minimum Slope Recommendation for DFW', body: 'For shingle application: minimum 4:12 pitch. For metal roofing: minimum 1:12. Anything under 4:12 with shingles requires special underlayment in DFW\’s rain-heavy environment. Target 4:12 to 6:12 for optimal DFW performance and drainage.' },
  { icon: '💨', title: 'Attic Ventilation Requirements', body: 'New slope space requires proper ridge and soffit ventilation. Texas Energy Code requires 1:150 net free ventilation area. DFW attic temperatures reach 160°F without ventilation — underventilated attics cause shingle premature failure and extreme AC load.' },
];

export default function DFWRoofingFlatToSlope2026() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'system-ui, sans-serif', color: '#E8EEF7′ }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏗️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>DFW Converting Flat Roof to Sloped Guide 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>When flat-to-slope conversion makes sense — and when to maintain your existing system</p>
        </div>

        <div style={{ background: '#0F2137', border: '1px solid #1E3A5F', borderRadius: 10, padding: 20, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 15, marginBottom: 10 }}>Flat Roofs in DFW Context</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            Many DFW homes — particularly 1950s–1970s ranch and mid-century modern designs — feature flat or near-flat roofs. These systems work well when properly maintained but face challenges from DFW's intense rain events, 100°F+ summer heat degrading membranes, and hail damage. Conversion to sloped roofing is sometimes the right answer — but cost, structural requirements, and remaining membrane life determine when.
          </p>
        </div>

        <div style={{ marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>🔍 Describe Your Flat Roof Situation</h2>
          {scenarios.map(s => (
            <div key={s.id} style={{ marginBottom: 12 }}>
              <button onClick={() => setActive(active === s.id ? null : s.id)}
                style={{ width: '100%', background: active === s.id ? '#1E3A5F' : '#0F2137', border: `1px solid ${active === s.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '14px 18px', color: '#E8EEF7', cursor: 'pointer', textAlign: 'left', fontSize: 14, fontWeight: 600 }}>
                {s.label}
              </button>
              {active === s.id && (
                <div style={{ background: '#0F2137', border: '1px solid #1E3A5F', borderTop: 'none', borderRadius: '0 0 10px 10px', padding: '16px 18px' }}>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 14 }}>{s.feasibility}</span>
                    <span style={{ background: s.proceed ? '#064E3B' : '#450A0A', color: '#F5E642', borderRadius: 6, padding: '2px 10px', fontSize: 12, fontWeight: 700 }}>Typical Cost: {s.cost}</span>
                  </div>
                  <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{s.detail}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>📋 Conversion Requirements</h2>
          {requirements.map((r, i) => (
            <div key={i} style={{ background: '#0F2137', border: '1px solid #1E3A5F', borderRadius: 10, padding: '16px 18px', marginBottom: 12 }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{r.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{r.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.6 }}>{r.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2137', border: '1px solid #F5E642', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 15, marginBottom: 6 }}>🏠 ProLnk — DFW Roofing Specialists</div>
          <div style={{ color: '#94A3B8', fontSize: 13 }}>Connect with DFW roofers experienced in flat-to-slope conversion. Get structural assessments and accurate project quotes.</div>
        </div>
      </div>
    </div>
  );
}