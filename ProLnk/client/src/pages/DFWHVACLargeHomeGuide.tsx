import { useState } from 'react';

const homeConfigs = [
  {
    size: '3,000–4,000 sq ft',
    icon: '🏠',
    stories: 'Typically 2-story',
    systems: '2 systems recommended',
    description: 'The sweet spot where one system struggles but two systems give you proper zone control. DFW homes in this range in Frisco, Allen, and McKinney almost universally benefit from dual systems.',
    singleSystem: {
      pros: ['Lower upfront cost ($7,500–10,000)', 'Simpler maintenance (one filter, one service call)', 'Adequate for single-story or well-insulated two-story'],
      cons: ['Upstairs/downstairs temperature conflict in two-story', 'Single-stage unit short-cycles in shoulder seasons', 'One failure takes out entire home cooling'],
    },
    dualSystem: {
      pros: ['Independent control of each floor', 'Right-sized equipment for each zone', 'Redundancy — one failure still leaves half the home conditioned'],
      cons: ['$14,000–18,000 installed', 'Two maintenance visits annually', 'Two filters, two thermostats to manage'],
    },
    recommendation: 'Two-story homes: always two systems. Single-story in this range: one well-sized variable-speed system with zoning.',
    staging: '2-stage compressors recommended — DFW has long shoulder seasons where modulation prevents short-cycling',
    accent: '#22c55e',
  },
  {
    size: '4,000–5,500 sq ft',
    icon: '🏡',
    stories: 'Typically 2-story with bonus room',
    systems: '2–3 systems typical',
    description: 'Two systems are minimum for homes in this range. The question is whether the bonus room, media room, or master suite needs its own system or mini-split for load management.',
    singleSystem: {
      pros: ['Theoretically possible with 5-ton unit', 'One service point'],
      cons: ['5-ton unit is massively oversized for most loads — extreme short-cycling', 'Cannot maintain upstairs/downstairs temp balance in DFW summer', 'Humidity control suffers with short cycles'],
    },
    dualSystem: {
      pros: ['2.5-ton upstairs + 3-ton downstairs properly sized', 'Floor-level zone independence', '$16,000–22,000 installed range'],
      cons: ['Bonus room still a problem zone — may need mini-split', 'Media room heat load often requires dedicated supplemental cooling'],
    },
    recommendation: 'Two systems as base, plus dedicated mini-split ($2,500–4,000) for any room with unusual heat load (media room, bonus room, wine cellar).',
    staging: 'Variable-speed (inverter) recommended at this size — pays back in 4–6 years at DFW electricity rates',
    accent: '#f59e0b',
  },
  {
    size: '5,500–7,500 sq ft',
    icon: '🏘️',
    stories: '2–3 story estate',
    systems: '3 systems standard',
    description: 'Three-system configurations are the DFW standard for homes in this range. Typical split: master wing, main living + kitchen, upstairs bedroom wing.',
    singleSystem: {
      pros: ['None — do not do this'],
      cons: ['Physically impossible to properly condition this footprint with one system', 'Equipment would be catastrophically oversized', 'Humidity and comfort failures guaranteed'],
    },
    dualSystem: {
      pros: ['Minimum viable for some single-story ranch-style homes in this range'],
      cons: ['Still forces compromise on zone boundaries', 'West-facing rooms create hot spots in afternoon DFW sun', 'Guest wing typically under-conditioned'],
    },
    recommendation: 'Three 2.5–3.5 ton systems: master suite (2 ton), main living (3–3.5 ton), bedroom wing (2.5 ton). Add mini-splits for wine cellar, theater, or gym.',
    staging: 'All three systems variable-speed; consider building automation system (BAS) for coordinated scheduling',
    accent: '#3b82f6',
  },
  {
    size: 'Over 7,500 sq ft',
    icon: '🏰',
    stories: '2–3 story estate or compound',
    systems: '4+ systems required',
    description: 'Estate-level homes require an HVAC engineering study, not just a contractor estimate. Load calculations must account for glass-to-wall ratio, ceiling heights, orientation, and internal gains.',
    singleSystem: {
      pros: ['Not applicable'],
      cons: ['Not applicable — single system is not a consideration at this scale'],
    },
    dualSystem: {
      pros: ['Not applicable'],
      cons: ['Woefully inadequate — would require 8–10 ton units that simply do not exist residentially'],
    },
    recommendation: 'Commission a Manual J and duct design from a licensed mechanical engineer. Typical result: 4–6 residential systems, or hybrid residential + light commercial equipment for large open spaces.',
    staging: 'Full building automation, demand response ready, whole-home dehumidification, air quality monitoring integration',
    accent: '#a855f7',
  },
];

export default function DFWHVACLargeHomeGuide() {
  const [selected, setSelected] = useState(homeConfigs[0]);
  const [view, setView] = useState('comparison');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏰</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>Large DFW Home HVAC Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 620, margin: '0 auto' }}>
            Homes over 3,000 sq ft in DFW require multi-system HVAC planning. Select your home size for system configuration recommendations.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
          {homeConfigs.map(c => (
            <button
              key={c.size}
              onClick={() => setSelected(c)}
              style={{
                padding: '10px 16px', borderRadius: 8, border: `2px solid ${selected.size === c.size ? '#F5E642' : '#1e3a5f'}`,
                background: selected.size === c.size ? '#F5E642' : '#0d2137',
                color: selected.size === c.size ? '#0A1628' : '#94a3b8',
                fontWeight: 600, cursor: 'pointer', fontSize: 13,
              }}
            >
              {c.icon} {c.size}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 28 }}>
          {['comparison', 'recommendation'].map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: '8px 20px', borderRadius: 6, border: `1px solid ${view === v ? '#F5E642' : '#1e3a5f'}`,
                background: view === v ? '#F5E642' : 'transparent',
                color: view === v ? '#0A1628' : '#94a3b8',
                fontWeight: 600, cursor: 'pointer', fontSize: 13, textTransform: 'capitalize',
              }}
            >
              {v === 'comparison' ? 'System Comparison' : 'Recommendation'}
            </button>
          ))}
        </div>

        <div style={{ background: '#0d2137', borderRadius: 12, padding: 28, border: `2px solid ${selected.accent}`, marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{selected.icon} {selected.size}</h2>
              <p style={{ color: '#94a3b8', fontSize: 14 }}>{selected.stories} · Typically needs {selected.systems}</p>
            </div>
          </div>
          <p style={{ color: '#cbd5e1', lineHeight: 1.6, marginBottom: 20 }}>{selected.description}</p>

          {view === 'comparison' ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
              {[
                { label: 'Single System', data: selected.singleSystem, color: '#ef4444' },
                { label: 'Dual Systems', data: selected.dualSystem, color: '#f59e0b' },
              ].map(({ label, data, color }) => (
                <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 14, gridColumn: label === 'Single System' ? '1' : '2 / span 2' }}>
                  <p style={{ color, fontWeight: 700, marginBottom: 10, fontSize: 14 }}>{label}</p>
                  <p style={{ color: '#22c55e', fontWeight: 600, fontSize: 12, marginBottom: 4 }}>Pros</p>
                  {data.pros.map((p, i) => <p key={i} style={{ color: '#94a3b8', fontSize: 12, marginBottom: 3 }}>+ {p}</p>)}
                  <p style={{ color: '#ef4444', fontWeight: 600, fontSize: 12, marginBottom: 4, marginTop: 8 }}>Cons</p>
                  {data.cons.map((c, i) => <p key={i} style={{ color: '#94a3b8', fontSize: 12, marginBottom: 3 }}>− {c}</p>)}
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, marginBottom: 16, borderLeft: `4px solid #F5E642` }}>
                <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8, fontSize: 14 }}>Recommended Configuration</p>
                <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6 }}>{selected.recommendation}</p>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8, fontSize: 14 }}>Equipment Staging</p>
                <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{selected.staging}</p>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', padding: '20px', background: '#0d2137', borderRadius: 12, border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>Get a multi-system HVAC design consultation for your large DFW home</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Get System Design Consultation
          </button>
        </div>
      </div>
    </div>
  );
}