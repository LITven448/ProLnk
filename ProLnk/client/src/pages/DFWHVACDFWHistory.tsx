import { useState } from 'react';

const vintages = [
  { range: 'Pre-1950', era: 'Window Fan Era', hvac: 'No central system — attic fans, window fans, sleeping porches', note: 'Homes built before AC was affordable typically need full duct system installation.' },
  { range: '1950–1969', era: 'Window Unit Era', hvac: 'Window AC units, floor furnaces, wall heaters', note: 'Window units cooled one room at a time. Expect aging electrical panels that may need upgrades.' },
  { range: '1970–1984', era: 'Central AC Adoption', hvac: 'First-gen central AC, gas furnaces became standard', note: 'DFW’s 70s building boom drove central AC adoption. R-22 refrigerant systems — now obsolete.' },
  { range: '1985–1999', era: 'Efficiency Standards Begin', hvac: 'Higher SEER requirements, digital thermostats emerge', note: 'First efficiency standards pushed better equipment. Ductwork in these homes often needs sealing.' },
  { range: '2000–2014', era: 'Smart Controls + High SEER', hvac: 'Variable-speed systems, smart thermostats, 13+ SEER minimum', note: 'Programmable thermostats became standard. Systems are aging into replacement zone now.' },
  { range: '2015–2026', era: 'Heat Pump + AI Era', hvac: 'Cold-climate heat pumps, AI diagnostics, all-electric options', note: 'Modern DFW builds increasingly use heat pumps. Smart sensors monitor performance in real time.' },
];

export default function DFWHVACDFWHistory() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = vintages.find(v => v.range === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, marginBottom: '0.5rem' }}>🏠 DFW HVAC HISTORY</div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>How HVAC Evolved in DFW</h1>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', marginBottom: '2.5rem' }}>From sleeping porches to AI-powered heat pumps — DFW's growth shaped every era of home cooling and heating technology.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>📅 Select Your Home's Vintage</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {vintages.map(v => (
              <button key={v.range} onClick={() => setSelected(v.range)} style={{ background: selected === v.range ? '#F5E642' : '#1a3a5c', color: selected === v.range ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>{v.range}</button>
            ))}
          </div>
          {match && (
            <div style={{ marginTop: '1.5rem', background: '#0A1628', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.4rem' }}>⚡ {match.era}</div>
              <div style={{ color: '#e2e8f0', marginBottom: '0.75rem' }}>{match.hvac}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>💡 {match.note}</div>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {vintages.map(v => (
            <div key={v.range} style={{ background: '#0F2040', borderRadius: 10, padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '0.25rem 0.75rem', fontWeight: 700, fontSize: '0.8rem', whiteSpace: 'nowrap', marginTop: 2 }}>{v.range}</div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{v.era}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{v.hvac}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem', background: '#0F2040', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>🔧 Need HVAC Service for Your DFW Home?</div>
          <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.95rem' }}>ProLnk matches you with licensed DFW HVAC pros who know your home's era and equipment.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}
