import { useState } from 'react';

const situations: Record<string, { label: string; totalTimeline: string; phases: { phase: string; duration: string; detail: string }[] }> = {
  crack: {
    label: 'New Cracks Noticed',
    totalTimeline: '3–6 months to completed repair + 6–12 months settling',
    phases: [
      { phase: 'Foundation Assessment', duration: '3–7 days', detail: 'Structural engineer visit + written report. DFW engineers typically schedule within 1 week.' },
      { phase: 'Quote & Contractor Selection', duration: '1–2 weeks', detail: 'Get 2–3 quotes. DFW foundation companies: Baker\’s Waterproofing, Perma-Pier, HD Foundations.' },
      { phase: 'Scheduling Wait', duration: '2–6 weeks', detail: 'DFW demand is high year-round. Spring (Feb–May) has longest waits due to rain season.' },
      { phase: 'Repair Work', duration: '1–3 days', detail: 'Pier installation typically 1 day per 8–12 piers. Most DFW homes: 15–35 piers total.' },
      { phase: 'Engineer Letter', duration: '2–3 weeks', detail: 'Post-repair engineer inspection + letter required for home sale or insurance.' },
      { phase: 'Soil Settling', duration: '6–12 months', detail: 'Full settlement in DFW clay soil takes 6–12 months. Some movement expected.' },
    ],
  },
  sale: {
    label: 'Selling Home Soon',
    totalTimeline: '6–10 weeks from assessment to completion',
    phases: [
      { phase: 'Emergency Assessment', duration: '2–5 days', detail: 'Expedited engineer report for listing. Many DFW engineers offer rush service.' },
      { phase: 'Disclosure & Quotes', duration: '1 week', detail: 'Texas requires disclosure. Get quotes before listing or during option period.' },
      { phase: 'Repair', duration: '1–3 days', detail: 'Pier installation. Some buyers require transferable warranty — confirm with contractor.' },
      { phase: 'Engineer Letter', duration: '2–3 weeks', detail: 'Letter transfers to buyer and satisfies lender requirements.' },
    ],
  },
  preventive: {
    label: 'Preventive Maintenance',
    totalTimeline: '3–5 weeks total',
    phases: [
      { phase: 'Assessment', duration: '3–7 days', detail: 'Elevation survey + moisture reading. DFW clay expands/contracts with rain cycles.' },
      { phase: 'Drainage Correction', duration: '1–3 days', detail: 'French drain or regrading to redirect water away from foundation.' },
      { phase: 'Watering System', duration: '1 day', detail: 'Soaker hose system installed around perimeter to maintain consistent moisture in DFW drought conditions.' },
    ],
  },
};

export default function DFWFoundationRepairTimeline() {
  const [situation, setSituation] = useState('');
  const selected = situation ? situations[situation] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>🏗️ DFW Home Services</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8 }}>DFW Foundation Repair Timeline</h1>
        <p style={{ color: '#9BAEC8', marginBottom: 32, fontSize: 15 }}>From first crack to completed repair — every phase of DFW foundation work explained.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: '#F5E642', marginBottom: 14 }}>🏠 What's Your Situation?</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {Object.entries(situations).map(([key, val]) => (
              <button key={key} onClick={() => setSituation(key)} style={{ padding: '8px 16px', borderRadius: 8, border: `2px solid ${situation === key ? '#F5E642' : '#1E3050'}`, background: situation === key ? '#F5E642' : 'transparent', color: situation === key ? '#0A1628' : '#9BAEC8', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>{val.label}</button>
            ))}
          </div>
        </div>

        {selected && (
          <>
            <div style={{ background: '#0A1628', border: '2px solid #F5E642', borderRadius: 10, padding: '14px 20px', marginBottom: 22 }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>Total Timeline: </span>
              <span style={{ color: '#E8EDF5' }}>{selected.totalTimeline}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {selected.phases.map((p, i) => (
                <div key={i} style={{ background: '#111E35', borderRadius: 10, padding: 18, borderLeft: '3px solid #F5E642' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 6, padding: '2px 10px', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>{p.duration}</span>
                    <span style={{ fontWeight: 700, color: '#fff', fontSize: 15 }}>{p.phase}</span>
                  </div>
                  <p style={{ margin: 0, color: '#9BAEC8', fontSize: 14 }}>{p.detail}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {!selected && (
          <div style={{ background: '#111E35', borderRadius: 12, padding: 22 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 12 }}>📋 DFW Foundation Facts</h2>
            <ul style={{ margin: 0, padding: '0 0 0 18px', color: '#9BAEC8', fontSize: 14 }}>
              <li style={{ marginBottom: 8 }}>DFW black clay soil (Expansive clay) is the #1 cause of foundation movement in Texas</li>
              <li style={{ marginBottom: 8 }}>Average DFW pier-and-beam or slab repair: $5,000–$15,000</li>
              <li style={{ marginBottom: 8 }}>Transferable lifetime warranties available from most DFW contractors</li>
              <li style={{ marginBottom: 8 }}>Texas does NOT require foundation permits in most cities — check your city</li>
            </ul>
          </div>
        )}

        <div style={{ marginTop: 28, textAlign: 'center', background: '#F5E642', borderRadius: 10, padding: '16px 24px' }}>
          <span style={{ color: '#0A1628', fontWeight: 700, fontSize: 15 }}>🔗 Get matched with a vetted DFW foundation specialist — free on ProLnk</span>
        </div>
      </div>
    </div>
  );
}
