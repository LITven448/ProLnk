import { useState } from 'react';

const SITUATIONS = [
  {
    id: 'over65-tax',
    label: 'Age 65+ Property Tax',
    priority: 'CRITICAL',
    color: '#C0392B',
    summary: 'The over-65 homestead exemption freezes your school district tax and adds $10,000 exemption — this is the single most valuable financial move for retired DFW homeowners.',
    steps: ['File over-65 exemption with your county appraisal district (one-time)', 'School district taxes freeze at current year level', 'Still applies even if home value rises', 'Surviving spouse (55+) can keep the freeze'],
    action: 'File at your county appraisal district office or online. Deadline: April 30.',
  },
  {
    id: 'aging-in-place',
    label: 'Aging-in-Place Modifications',
    priority: 'HIGH',
    color: '#E67E22',
    summary: 'DFW single-story homes are ideal for aging-in-place. Key modifications add safety and preserve independence without major structural cost.',
    steps: ['Walk-in shower (no step-over lip) — $3,000-6,000', 'Grab bars and non-slip flooring — $500-1,500', 'Wider doorways if wheelchair needed — $400-800/door', 'Smart home lighting and door locks for safety'],
    action: 'Get ProLnk-matched aging-in-place contractor for free assessment.',
  },
  {
    id: 'downsizing',
    label: 'Downsizing Considerations',
    priority: 'MEDIUM',
    color: '#2A7A4B',
    summary: 'DFW 55+ communities in Frisco, Prosper, and Flower Mound offer low-maintenance living. Timing your DFW home sale to market conditions matters more than the calendar.',
    steps: ['DFW market strongest spring (March-May)', 'Capital gains exclusion: $250K single / $500K married on primary home', 'Consider 55+ communities: Frisco Lakes, The Village at Allen', 'Factor in HOA fees — many 55+ communities run $300-600/mo'],
    action: 'Consult a DFW estate-specialist realtor 6-12 months before planned move.',
  },
  {
    id: 'reverse-mortgage',
    label: 'Reverse Mortgage',
    priority: 'MEDIUM',
    color: '#8E44AD',
    summary: 'HECMs (reverse mortgages) can supplement retirement income using DFW home equity. Must be 62+, home must be primary residence, and no other mortgage.',
    steps: ['Must complete HUD-approved counseling first', 'No monthly mortgage payment required while you live there', 'Loan repaid when you sell, move, or pass away', 'DFW home values make equity potential high in 2025'],
    action: 'Contact a HUD-approved reverse mortgage counselor before any lender.',
  },
  {
    id: 'estate-planning',
    label: 'Estate Planning for Home',
    priority: 'HIGH',
    color: '#1A6B8A',
    summary: 'Texas has no state estate tax, but federal exemptions apply above $13M. A DFW home in a trust or with a transfer-on-death deed can avoid probate entirely.',
    steps: ['Texas Transfer-on-Death Deed: file with county clerk, no attorney required', 'Living trust avoids probate and keeps home in family', 'Step-up in basis: heirs inherit at current market value (reduces capital gains)', 'Joint tenancy with right of survivorship for spouses'],
    action: 'File Transfer-on-Death Deed at your county clerk office for under $100.',
  },
  {
    id: 'healthcare',
    label: 'Healthcare Proximity Planning',
    priority: 'HIGH',
    color: '#16A085',
    summary: 'DFW has world-class healthcare. Proximity to major hospitals is increasingly a home selection factor for retired buyers and sellers.',
    steps: ['DFW Medical District (Dallas): UT Southwestern, Parkland, Baylor Scott & White', 'Frisco area: Medical City Frisco, Texas Health Presbyterian', 'Fort Worth: Cook Childrens, JPS, Baylor Scott & White All Saints', 'Medicare Advantage plans vary by DFW zip code — check coverage map'],
    action: 'Map your current home to nearest Level 1 trauma center when evaluating downsizing.',
  },
];

export default function DFWRetiredOwnerGuide() {
  const [situationId, setSituationId] = useState('over65-tax');
  const sel = SITUATIONS.find(s => s.id === situationId) || SITUATIONS[0];

  return (
    <div style={{ background: '#F8F9FA', minHeight: '100vh', color: '#1A2332', fontFamily: 'system-ui', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#0A1628', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW RETIRED HOMEOWNER</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', color: '#0A1628′ }}>Retired Owner Guide</h1>
        <p style={{ color: '#5A6A7E', fontSize: 15, margin: '0 0 32px' }}>Financial and practical priorities for retired DFW homeowners — from tax freezes to estate planning.</p>

        <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 20, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ fontWeight: 700, marginBottom: 12, color: '#0A1628′ }}>Your Situation</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {SITUATIONS.map(s => (
              <button key={s.id} onClick={() => setSituationId(s.id)}
                style={{ background: s.id === situationId ? '#0A1628′ : '#F0F4F8', color: s.id === situationId ? '#F5E642' : '#1A2332',
                  border: 'none', borderRadius: 8, padding: '10px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13, textAlign: 'left' }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 24, marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderTop: `4px solid ${sel.color}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <span style={{ background: sel.color, color: '#fff', borderRadius: 6, padding: '3px 10px', fontSize: 11, fontWeight: 800 }}>{sel.priority}</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#0A1628′ }}>{sel.label}</span>
          </div>
          <p style={{ color: '#3A4A5E', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>{sel.summary}</p>
          <div style={{ background: '#F0F4F8', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 13, color: '#0A1628′ }}>Key Steps</div>
            {sel.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, fontSize: 13, color: '#3A4A5E' }}>
                <span style={{ color: sel.color, fontWeight: 800, flexShrink: 0 }}>+</span> {step}
              </div>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: 14 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 12, marginBottom: 4 }}>RECOMMENDED ACTION</div>
            <div style={{ color: '#E8EDF5', fontSize: 13 }}>{sel.action}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
