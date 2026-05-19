import { useState } from 'react';

const CONCERNS = [
  {
    type: 'Find My Property Line',
    icon: '🗺️',
    action: 'Start with your county appraisal district (CAD) GIS map — free online. Then locate the recorded subdivision plat at the county clerk. For legal certainty, hire an RPLS for a boundary survey.',
    documents: ['Recorded subdivision plat (county clerk)', 'Deed with metes-and-bounds description', 'Title commitment (from your closing)', 'CAD GIS parcel map (free online)'],
    cost: 'CAD map: free | Recorded plat copy: $1–$3/page | Boundary survey: $400–$1,200'
  },
  {
    type: 'Neighbor Encroachment',
    icon: '🚨',
    action: 'Commission a boundary survey first — you need a legally defensible line before any claim. Once confirmed, send a written cease-and-desist. Texas allows adverse possession after 10 continuous years of open, hostile use.',
    documents: ['RPLS boundary survey', 'Photographs with timestamps', 'Certified demand letter', 'Any prior correspondence with neighbor'],
    cost: 'Survey: $400–$1,200 | Attorney demand letter: $300–$600 | Litigation: $5,000–$30,000+'
  },
  {
    type: 'Adverse Possession Risk',
    icon: '⏱️',
    action: 'Texas threshold: 10 years of open, notorious, hostile, and continuous use. If a neighbor has been using your land for years, consult an attorney immediately. Post No Trespassing signs and document your objection in writing.',
    documents: ['Survey establishing your boundary', 'Written objection sent certified mail', 'Photos documenting current use', 'Records of your own use of the land'],
    cost: 'Attorney consultation: $200–$400 | Quiet title action: $3,000–$15,000'
  },
  {
    type: 'Deed Restriction vs Zoning',
    icon: '📋',
    action: 'Deed restrictions are private contracts recorded with your deed — often stricter than city zoning. HOA covenants add another layer. Review your title commitment for all restrictions before any improvement.',
    documents: ['Deed with restriction language', 'Subdivision restrictions (at county clerk)', 'HOA CC&Rs if applicable', 'City zoning map (free at city planning dept)'],
    cost: 'Title search: $150–$400 | Variance application: $200–$1,500 | Attorney review: $300–$600'
  }
];

export default function DFWPropertyLineGuide() {
  const [selected, setSelected] = useState<number | null>(null);
  const concern = selected !== null ? CONCERNS[selected] : null;

  return (
    <div style={{ background: '#F7F8FA', minHeight: '100vh', color: '#1A2B3C', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: '#0A1628', padding: '48px 24px 36px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>DFW HOMEOWNER GUIDE</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', margin: '0 0 12px' }}>Property Line Reference</h1>
          <p style={{ fontSize: 15, color: '#9AA5B8', margin: 0 }}>Find your exact line, handle encroachments, and understand Texas adverse possession law.</p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 24px 0' }}>
        <div style={{ background: '#FFFBEB', border: '2px solid #F5E642', borderRadius: 10, padding: 16, marginBottom: 28 }}>
          <strong style={{ color: '#92400E' }}>📌 Texas Key Fact:</strong> <span style={{ color: '#78350F', fontSize: 14 }}>Survey costs $400–$1,200 and is the only legally defensible way to establish your property line. Everything else is reference only.</span>
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 16 }}>What is your property concern?</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 32 }}>
          {CONCERNS.map((c, i) => (
            <button key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ background: selected === i ? '#0A1628' : '#FFFFFF', border: `2px solid ${selected === i ? '#F5E642' : '#E5E7EB'}`, borderRadius: 10, padding: '16px', cursor: 'pointer', textAlign: 'left', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{c.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: selected === i ? '#F5E642' : '#1A2B3C' }}>{c.type}</div>
            </button>
          ))}
        </div>

        {concern && (
          <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 14, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0A1628', marginBottom: 16 }}>{concern.icon} {concern.type}</h2>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, marginBottom: 20, background: '#F0F4FF', padding: 16, borderRadius: 8, borderLeft: '3px solid #0A1628' }}>{concern.action}</p>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#374151', letterSpacing: 1, marginBottom: 12 }}>DOCUMENTS TO OBTAIN</h3>
            <ul style={{ paddingLeft: 20, margin: '0 0 20px' }}>
              {concern.documents.map((d, i) => <li key={i} style={{ fontSize: 14, color: '#4B5563', marginBottom: 8 }}>{d}</li>)}
            </ul>
            <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#92400E', marginBottom: 4 }}>💰 COST ESTIMATE</div>
              <p style={{ fontSize: 13, color: '#78350F', margin: 0 }}>{concern.cost}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
