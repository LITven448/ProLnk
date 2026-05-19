import { useState } from 'react';

const situations = [
  { id: 'nocontest', label: 'Clear will, no disputes' },
  { id: 'occupied', label: 'Heirs or tenants still in home' },
  { id: 'contested', label: 'Estate under dispute or contest' },
  { id: 'contents', label: 'Need to clear contents first' },
];

const guides: Record<string, { steps: string[]; tip: string }> = {
  nocontest: {
    steps: [
      '📋 Estate attorney files for Independent Administration — fastest TX path',
      '📄 TREC disclosure forms required: known defects must be disclosed to buyers',
      '🔧 ProLnk for pre-listing repairs — estate properties often priced for quick sale',
      '💰 Price 5-10% below market: estate sale pricing attracts faster offers',
      '📅 TX estate sales typically close 60-90 days from list with no title issues',
    ],
    tip: 'Buyer agents often target estate sales for investor clients — be prepared for low offers.',
  },
  occupied: {
    steps: [
      '⚖️ TX law: heirs/tenants have right to occupy until formal estate order',
      '📋 Document occupant status before listing — disclose to all buyers',
      '📅 Negotiate possession date at closing (30-60 day leaseback may be needed)',
      '🔧 ProLnk handles repairs even with occupants — schedule around access windows',
      '💰 Occupied estate homes sell faster: buyers see they’re livable',
    ],
    tip: 'Never list an occupied estate home without written occupant cooperation agreement.',
  },
  contested: {
    steps: [
      '⚖️ Cannot sell without all parties' agreement or court order — pause listing',
      '📋 Dependent Administration: court approves each sale step — slower but protected',
      '🏗️ Maintain home during dispute: ProLnk for emergency repairs to preserve value',
      '💰 Consider partition lawsuit if stalemate — court forces sale and distributes proceeds',
      '📄 Mediation typically resolves faster and cheaper than full probate litigation',
    ],
    tip: 'TX probate attorneys cost $3K-10K+ for contested estates — mediation at $1K-3K is usually worth it first.',
  },
  contents: {
    steps: [
      '🏠 Estate sale company: takes 35-40% commission but handles everything in DFW',
      '📋 Allow 1-2 weekends for estate sale before listing property',
      '🔧 ProLnk handles clean-out, junk removal, and pre-listing repairs in sequence',
      '💰 Donated items = charitable deduction for estate if estate has tax liability',
      '📅 Factor 3-4 weeks for contents removal in your listing timeline',
    ],
    tip: 'DFW estate sale companies book 3-4 weeks out — schedule early or items get donated.',
  },
};

export default function DFWEstatePropertyGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🏛️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, marginBottom: 8 }}>DFW Estate Property Sale Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          Selling an estate property in DFW — working with your estate attorney, TREC disclosures, and pricing strategy for estate homes.
        </p>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📌 DFW Estate Sale Facts</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 1.9, paddingLeft: 20 }}>
            <li>TX TREC disclosure: estate sales require disclosure of all known defects</li>
            <li>Independent Administration: fastest path — executor acts without court approval</li>
            <li>Estate sale timeline: 60-90 days from probate filing to listing in TX</li>
            <li>DFW estate homes typically price 5-12% below comparable retail homes</li>
          </ul>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🏠 Select Your Situation</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {situations.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)} style={{
              background: selected === s.id ? '#F5E642′ : '#1e3a5f',
              color: selected === s.id ? '#0A1628′ : '#fff',
              border: 'none', borderRadius: 10, padding: '14px 16px',
              cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left'
            }}>{s.label}</button>
          ))}
        </div>

        {selected && guides[selected] && (
          <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16 }}>📋 Action Guide</h3>
            <ul style={{ color: '#cbd5e1', lineHeight: 2, paddingLeft: 20 }}>
              {guides[selected].steps.map((step, i) => <li key={i}>{step}</li>)}
            </ul>
            <div style={{ marginTop: 20, background: '#162944', borderRadius: 8, padding: 14 }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>💡 TX Tip: </span>
              <span style={{ color: '#94a3b8′ }}>{guides[selected].tip}</span>
            </div>
          </div>
        )}

        <div style={{ marginTop: 32, background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#0A1628', fontWeight: 700, marginBottom: 8 }}>Need repairs or clean-out before listing the estate home?</p>
          <p style={{ color: '#1e3a5f', fontSize: 14 }}>ProLnk coordinates vetted DFW contractors for fast turnaround on estate properties.</p>
        </div>
      </div>
    </div>
  );
}
