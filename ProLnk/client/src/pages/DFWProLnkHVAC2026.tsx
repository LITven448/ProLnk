import { useState } from 'react';

const needs = [
  {
    need: 'Emergency Repair (System Down)',
    emoji: '🚨',
    solution: 'Submit your request now and ProLnk matches you with available DFW HVAC pros. Describe symptoms clearly — unit not cooling, strange noises, no power — for fastest routing.',
    available: 'Available 2026',
    detail: 'Pro matching active in DFW metro. Response times vary by season — 2-4 hours in shoulder, 6-12 hours peak summer. Emergency contacts shown on match.',
    resources: ['DFW HVAC Season Guide 2026', 'DFW Weather Extremes & HVAC', 'DFW HVAC Cost Guide 2026'],
  },
  {
    need: 'Annual Tune-Up',
    emoji: '🔧',
    solution: 'Book a pre-season tune-up through ProLnk before April. Vetted DFW pros with real reviews. Transparent pricing — no surprise add-ons.',
    available: 'Available 2026',
    detail: 'Tune-up matching live in DFW. Best availability: March 1-April 14. After April 15, expect 1-3 week waits as cooling season demand peaks.',
    resources: ['DFW HVAC Cost Guide 2026', 'DFW HVAC Season Guide 2026'],
  },
  {
    need: 'New System Quote',
    emoji: '🏠',
    solution: 'Get 3 competitive quotes from vetted DFW HVAC installers. ProLnk ensures all quoting pros have valid HVAC licenses, insurance, and real customer reviews.',
    available: 'Available 2026',
    detail: 'Replacement matching active. Provide home sqft, current system details, and budget range for best matches. Manual J load calculation required from all quoting pros.',
    resources: ['DFW ASHRAE Design Conditions 2026', 'DFW HVAC Cost Guide 2026', 'DFW Utility Cost Guide 2026'],
  },
  {
    need: 'Efficiency Upgrade (Smart Thermostat, Zoning)',
    emoji: '💡',
    solution: 'ProLnk matches you with DFW pros who specialize in energy efficiency upgrades — smart thermostats, zoning systems, variable-speed equipment, attic insulation.',
    available: 'Coming Q3 2026',
    detail: 'Efficiency upgrade matching in development. Current workaround: submit as general HVAC request and specify upgrade type in description. Full efficiency category launching Q3.',
    resources: ['DFW Utility Cost Guide 2026', 'DFW ASHRAE Design Conditions 2026'],
  },
  {
    need: 'Duct Cleaning / Air Quality',
    emoji: '💨',
    solution: 'DFW duct cleaning and air quality pros are being added to the ProLnk network. Duct cleaning is often oversold — vetted pros will give honest assessments.',
    available: 'Coming Q2 2026',
    detail: 'IAQ and duct specialist category launching Q2 2026. For now, most HVAC tune-up pros on ProLnk will assess duct condition during standard service.',
    resources: ['DFW HVAC Season Guide 2026'],
  },
  {
    need: 'ProLnk Resource Library',
    emoji: '📚',
    solution: 'ProLnk has built 3,200+ DFW HVAC resource pages covering every aspect of HVAC in the DFW market — from equipment selection to utility rates to neighborhood-specific conditions.',
    available: 'Live 2026',
    detail: 'The resource library is the largest DFW-specific HVAC knowledge base available to homeowners. Use it to get educated before talking to any contractor.',
    resources: ['DFW Weather Extremes & HVAC', 'DFW ASHRAE Design Conditions 2026', 'DFW HVAC Season Guide 2026', 'DFW HVAC Cost Guide 2026', 'DFW Utility Cost Guide 2026'],
  },
];

export default function DFWProLnkHVAC2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const item = selected !== null ? needs[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>PROLNK DFW 2026</div>
        <h1 style={{ color: '#fff', fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>ProLnk HVAC Coverage in DFW 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 15, margin: '0 0 32px' }}>
          ProLnk is the DFW homeowner platform for HVAC and home services. Here is what is available now, what is coming, and how to get the most value in 2026.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 28 }}>
          {[
            { l: 'DFW HVAC Pros', v: '340+', desc: 'Vetted and active in 2026' },
            { l: 'Resource Pages', v: '3,200+', desc: 'DFW-specific HVAC guides' },
            { l: 'Coverage Area', v: '11 Counties', desc: 'Greater DFW metro' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#1e293b', borderRadius: 10, padding: 16, border: '1px solid #334155', textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontSize: 24, fontWeight: 800 }}>{s.v}</div>
              <div style={{ color: '#fff', fontSize: 12, fontWeight: 600, margin: '4px 0' }}>{s.l}</div>
              <div style={{ color: '#64748b', fontSize: 11 }}>{s.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>What is your HVAC need? Select below for ProLnk solution:</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
            {needs.map((n, i) => (
              <button key={i} onClick={() => setSelected(i === selected ? null : i)}
                style={{ background: selected === i ? '#F5E642' : '#1e293b', color: selected === i ? '#0A1628' : '#cbd5e1', border: '1px solid ' + (selected === i ? '#F5E642' : '#334155'), borderRadius: 8, padding: '12px 14px', cursor: 'pointer', textAlign: 'left', fontSize: 13, fontWeight: 600 }}>
                {n.emoji} {n.need}
              </button>
            ))}
          </div>
        </div>

        {item && (
          <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, border: '1px solid #F5E642', marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{item.emoji} {item.need}</div>
              <div style={{ background: item.available.includes('Available') ? '#14532d' : '#1e3a5f', borderRadius: 6, padding: '4px 10px', color: item.available.includes('Available') ? '#4ade80' : '#93c5fd', fontSize: 12, fontWeight: 700 }}>{item.available}</div>
            </div>
            <p style={{ color: '#cbd5e1', fontSize: 14, margin: '0 0 12px', lineHeight: 1.6 }}>{item.solution}</p>
            <div style={{ background: '#0f172a', borderRadius: 8, padding: '10px 14px', marginBottom: 12, color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{item.detail}</div>
            <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 12, marginBottom: 6 }}>Related ProLnk Resources:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {item.resources.map((r, i) => (
                <span key={i} style={{ background: '#1e3a5f', color: '#93c5fd', borderRadius: 6, padding: '4px 10px', fontSize: 12 }}>{r}</span>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, border: '1px solid #F5E642' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Start with ProLnk for Your DFW HVAC Need</div>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 12px', lineHeight: 1.6 }}>
            ProLnk is the only DFW platform built specifically for home service matching with transparent pricing, vetted pros, and a 3,200+ page resource library built for DFW conditions.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '10px 20px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Get HVAC Quotes</div>
            <div style={{ background: '#1e293b', color: '#F5E642', border: '1px solid #F5E642', borderRadius: 8, padding: '10px 20px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Browse Resources</div>
          </div>
        </div>
      </div>
    </div>
  );
}
