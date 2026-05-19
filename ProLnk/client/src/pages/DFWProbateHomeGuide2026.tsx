import { useState } from 'react';

const situations = [
  { id: 'independent', label: 'Independent Administration (most TX estates)' },
  { id: 'dependent', label: 'Dependent Administration (court-supervised)' },
  { id: 'muniment', label: 'Muniment of Title (no debts, clear will)' },
  { id: 'intestate', label: 'No will — intestate succession' },
];

const guides: Record<string, { timeline: string; steps: string[]; tip: string }> = {
  independent: {
    timeline: '⏱️ Typical Timeline: 3-5 months',
    steps: [
      '📋 File application for probate in TX county court within 4 years of death',
      '⚖️ Court appoints independent executor — no further approval needed for sale',
      '📄 Executor files inventory of assets within 90 days of qualification',
      '🏠 List and sell property at executor discretion — no court approval required',
      '🔧 ProLnk handles maintenance and repairs during the 3-5 month probate window',
    ],
    tip: '~75% of TX estates qualify for Independent Administration — it is the fastest path.',
  },
  dependent: {
    timeline: '⏱️ Typical Timeline: 6-12 months',
    steps: [
      '⚖️ Court must approve every major transaction including the home sale',
      '📋 File motion for authorization to sell real property — include appraisal',
      '🏠 Court-approved price must be at or above appraised value',
      '📅 Hearing date adds 4-8 weeks to any sale — budget this into your timeline',
      '🔧 Keep home maintained during process — ProLnk for urgent repairs without delay',
    ],
    tip: 'Dependent Administration is rare in TX but required when heirs contest or will is unclear.',
  },
  muniment: {
    timeline: '⏱️ Typical Timeline: 30-60 days',
    steps: [
      '📋 No debts against estate + clear will = Muniment of Title qualifies',
      '⚖️ File in TX probate court — judge signs order, no executor appointed',
      '📄 Recorded order serves as chain-of-title proof for the property',
      '🏠 Title transfers directly to heirs — can list home immediately after order',
      '🔧 Fastest TX option — ProLnk repairs can begin as soon as court order is signed',
    ],
    tip: 'Muniment of Title is 10x faster than full probate — ask your TX attorney if you qualify.',
  },
  intestate: {
    timeline: '⏱️ Typical Timeline: 6-18 months',
    steps: [
      '⚖️ TX intestacy laws determine heirs — community property rules apply',
      '📋 Determination of Heirship proceeding required in probate court',
      '📄 Attorney ad litem appointed to protect unknown heirs — adds cost and time',
      '🏠 All heirs must agree to sell — any heir can block or demand partition',
      '🔧 ProLnk preserves home value during extended probate proceedings',
    ],
    tip: 'Without a will, TX blended families face the most complex heirship disputes — get an attorney immediately.',
  },
};

export default function DFWProbateHomeGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>⚖️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, marginBottom: 8 }}>DFW Probate Home Sale Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          TX probate process for home sales — Independent Administration, Muniment of Title, court approval, and maintenance during probate.
        </p>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📌 TX Probate Key Facts</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 1.9, paddingLeft: 20 }}>
            <li>TX probate is among the most executor-friendly states in the US</li>
            <li>Independent Administration: ~75% of TX estates — no court oversight needed</li>
            <li>Muniment of Title: 30-60 days when no debts exist and will is clear</li>
            <li>4-year window to file for probate in TX — do not let it lapse to intestacy</li>
          </ul>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>⚖️ Select Your Probate Situation</h2>
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
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 16 }}>{guides[selected].timeline}</div>
            <h3 style={{ color: '#F5E642', marginBottom: 12 }}>📋 Action Guide</h3>
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
          <p style={{ color: '#0A1628', fontWeight: 700, marginBottom: 8 }}>Need to maintain a DFW home during probate?</p>
          <p style={{ color: '#1e3a5f', fontSize: 14 }}>ProLnk handles repairs and upkeep while your estate works through the TX process.</p>
        </div>
      </div>
    </div>
  );
}
