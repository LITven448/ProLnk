import { useState } from 'react';

const situations = [
  { id: 'sell', label: 'Sell the inherited home' },
  { id: 'rent', label: 'Keep and rent it out' },
  { id: 'movein', label: 'Move in yourself' },
  { id: 'multiple', label: 'Multiple heirs involved' },
];

const guides: Record<string, { steps: string[]; tip: string }> = {
  sell: {
    steps: [
      '📋 Confirm clear title — obtain Letters Testamentary from TX probate court',
      '💰 Stepped-up basis = home value at date of death, not original purchase price',
      '🔧 Use ProLnk for quick pre-sale repairs to maximize sale price',
      '🏠 Price competitively — estate homes often need transparency on condition',
      '📅 TX probate: 4-6 months typical; Independent Administration speeds this up',
    ],
    tip: 'Stepped-up basis can eliminate capital gains entirely on a prompt sale.',
  },
  rent: {
    steps: [
      '🔍 Have home professionally inspected before tenant moves in',
      '🔧 ProLnk handles deferred maintenance and turnover repairs fast',
      '📋 Title must be clear before renting — complete probate first',
      '💰 Rental income taxed at your marginal rate; depreciation offsets this',
      '⚠️ Basis resets to FMV at death — affects future depreciation schedule',
    ],
    tip: 'DFW rental vacancy rate ~6% in 2026; strong demand in Frisco, McKinney, Arlington.',
  },
  movein: {
    steps: [
      '📋 Transfer title via Muniment of Title if no debts and will is clear',
      '🔧 Address deferred maintenance — ProLnk for fast contractor quotes',
      '💰 No capital gains on stepped-up basis at time of inheritance',
      '🏦 You can refi or take HELOC after title is in your name',
      '📄 Update homestead exemption with Dallas/Tarrant County ASAP',
    ],
    tip: 'Moving in within 2 years preserves future $250K/$500K capital gains exclusion.',
  },
  multiple: {
    steps: [
      '⚖️ All heirs must agree on disposition — majority can’t force a sale in TX',
      '📋 Partition lawsuit is last resort but forces sale via court',
      `💰 Buyout option: one heir purchases others' shares at appraised value`,
      '🔧 ProLnk manages repairs when heirs are remote or disagree on scope',
      '📄 Estate attorney drafts heir agreement before any work begins',
    ],
    tip: 'Get a written agreement among heirs before spending a dollar on the property.',
  },
};

export default function DFWInheritedHomeGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🏡</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, marginBottom: 8 }}>DFW Inherited Home Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          What to do with an inherited DFW home - your options, TX probate timeline, and tax-saving strategies.
        </p>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📌 Key DFW Inheritance Facts</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 1.9, paddingLeft: 20 }}>
            <li>TX probate typical timeline: 4-6 months (Independent Administration)</li>
            <li>Stepped-up cost basis eliminates most capital gains if you sell promptly</li>
            <li>Muniment of Title: fastest TX option when no debts exist</li>
            <li>DFW median home value 2026: ~$385K - estate sales often price 5-10% below</li>
          </ul>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🏠 Select Your Situation</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {situations.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)} style={{
              background: selected === s.id ? '#F5E642' : '#1e3a5f',
              color: selected === s.id ? '#0A1628' : '#fff',
              border: 'none', borderRadius: 10, padding: '14px 16px',
              cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left'
            }}>{s.label}</button>
          ))}
        </div>

        {selected && guides[selected] && (
          <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16 }}>📋 Recommended Actions</h3>
            <ul style={{ color: '#cbd5e1', lineHeight: 2, paddingLeft: 20 }}>
              {guides[selected].steps.map((step, i) => <li key={i}>{step}</li>)}
            </ul>
            <div style={{ marginTop: 20, background: '#162944', borderRadius: 8, padding: 14 }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>💡 TX Tip: </span>
              <span style={{ color: '#94a3b8' }}>{guides[selected].tip}</span>
            </div>
          </div>
        )}

        <div style={{ marginTop: 32, background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#0A1628', fontWeight: 700, marginBottom: 8 }}>Inherited a DFW home that needs repairs?</p>
          <p style={{ color: '#1e3a5f', fontSize: 14 }}>ProLnk connects you with trusted DFW contractors - fast quotes, vetted pros.</p>
        </div>
      </div>
    </div>
  );
}
