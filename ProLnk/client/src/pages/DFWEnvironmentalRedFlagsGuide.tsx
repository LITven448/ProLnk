import { useState } from 'react';

const concerns = [
  { id: 'industrial_south_dallas', label: 'Near South Dallas / Shingle Mountain industrial corridor', weight: 4, risk: 'Very High', detail: 'Environmental contamination, air quality concerns, active EPA oversight in some areas.' },
  { id: 'former_gas_station', label: 'Within 1 block of a former gas station or dry cleaner', weight: 4, risk: 'Very High', detail: 'Underground storage tank (UST) leaks create soil and groundwater contamination. Can trigger environmental liens.' },
  { id: 'irving_airport_noise', label: 'Near DFW Airport (Irving, Grapevine, Coppell)', weight: 3, risk: 'High', detail: 'Flight path noise significantly impacts quality of life and resale. Some zones qualify for sound insulation programs.' },
  { id: 'railroad_proximity', label: 'Within 500 feet of active railroad tracks', weight: 3, risk: 'High', detail: 'Vibration damages foundations over time. Noise at all hours. Freight trains run 24/7 in DFW.' },
  { id: 'power_line_easement', label: 'High-voltage power line easement on or adjacent to lot', weight: 2, risk: 'Moderate', detail: 'Easement restricts lot use. EMF concerns debated. Harder to sell — typically a 5–10% value discount.' },
  { id: 'highway_proximity', label: 'Within 500 feet of I-30, I-35, I-635, SH-183', weight: 3, risk: 'High', detail: 'Particulate matter and noise are measurable health concerns. DART and TxDOT expansions may worsen.' },
  { id: 'floodplain', label: 'In or adjacent to FEMA 100-year floodplain (Zone AE)', weight: 4, risk: 'Very High', detail: 'Mandatory flood insurance ($1,200–$3,000+/yr). DFW flash floods are severe — Trinity River watershed is active.' },
  { id: 'cedar_hill_landfill', label: 'Near Cedar Hill / Mountain Creek area industrial sites', weight: 2, risk: 'Moderate', detail: 'Historical industrial use. Investigate environmental history via TCEQ.' },
  { id: 'former_military', label: 'Former military base or industrial site (Hensley Field area)', weight: 3, risk: 'High', detail: 'Potential PFAS and chemical contamination from historical operations. Check EPA Superfund database.' },
];

const riskLevels = [
  { min: 0, max: 3, label: 'Low Environmental Concern', color: '#16A34A', emoji: '✅', summary: 'No significant environmental red flags based on your selections. Standard due diligence applies.', research: ['Check FEMA flood map at msc.fema.gov', 'Review TCEQ environmental databases for any historical permits', 'Standard homeowners insurance quote'], valueImpact: 'Minimal to none' },
  { min: 4, max: 6, label: 'Moderate — Investigate Further', color: '#CA8A04', emoji: '⚠️', summary: 'Some environmental concerns present that warrant additional research before committing.', research: ['TCEQ Central Registry: tceq.texas.gov/agency/directory/coa', 'EPA EnviroMapper for nearby hazardous sites', 'City of Dallas or suburb environmental services', 'Phase I Environmental Site Assessment if near former industrial site ($1,500–$3,000)'], valueImpact: '3–8% below comparable properties without these concerns' },
  { min: 7, max: 100, label: 'High — Significant Due Diligence Required', color: '#DC2626', emoji: '🚨', summary: 'Multiple environmental risk factors identified. Significant research and possibly expert evaluation recommended.', research: ['Phase I Environmental Assessment ($1,500–$3,000) — potentially Phase II ($5K–$15K)', 'FEMA elevation certificate for flood zones', 'EPA Superfund site search: epa.gov/superfund', 'Consult environmental attorney before closing', 'Request seller disclosure of any known environmental issues (Texas requires disclosure)'], valueImpact: '8–20%+ discount vs. clean comparable — or walk away' },
];

export default function DFWEnvironmentalRedFlagsGuide() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const score = selected.reduce((sum, id) => {
    const c = concerns.find(x => x.id === id);
    return sum + (c?.weight ?? 0);
  }, 0);

  const result = riskLevels.find(r => score >= r.min && score <= r.max);
  const selectedConcerns = concerns.filter(c => selected.includes(c.id));

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F0FE', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏭🌿</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Environmental Red Flags Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>Industrial corridors, noise zones, flood risk, and environmental liens — DFW-specific risks homebuyers miss.</p>
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>Select concerns that apply to this property:</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 32 }}>
          {concerns.map(c => (
            <button key={c.id} onClick={() => toggle(c.id)}
              style={{ background: selected.includes(c.id) ? '#1E3A5F' : '#0F2236', border: `2px solid ${selected.includes(c.id) ? '#F5E642' : '#1E3A5F'}`, borderRadius: 8, padding: '12px 16px', color: '#E8F0FE', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: selected.includes(c.id) ? 6 : 0 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{c.label}</span>
                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 10, background: c.weight >= 4 ? '#7F1D1D' : c.weight === 3 ? '#78350F' : '#1E3A5F', color: '#FFF', marginLeft: 12, whiteSpace: 'nowrap' }}>{c.risk}</span>
              </div>
              {selected.includes(c.id) && <p style={{ fontSize: 12, color: '#94A3B8', margin: 0 }}>{c.detail}</p>}
            </button>
          ))}
        </div>

        {result && selected.length > 0 && (
          <div>
            <div style={{ background: '#0F2236', border: `3px solid ${result.color}`, borderRadius: 14, padding: 20, marginBottom: 20 }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{result.emoji}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: result.color }}>{result.label}</div>
                <p style={{ color: '#94A3B8', fontSize: 13, marginTop: 6 }}>{result.summary}</p>
              </div>
              <div style={{ background: '#1E3A5F', borderRadius: 8, padding: '10px 14px', marginBottom: 14 }}>
                <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>ESTIMATED VALUE IMPACT</div>
                <div style={{ fontSize: 15, color: '#F5E642', fontWeight: 600 }}>{result.valueImpact}</div>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>🔬 Where to Research:</div>
                {result.research.map((r, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: result.color, minWidth: 16 }}>→</span>
                    <span style={{ fontSize: 13, color: '#CBD5E1' }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selected.length === 0 && (
          <div style={{ textAlign: 'center', padding: 48, color: '#475569' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🌍</div>
            <p>Select environmental concerns you've identified to get your risk assessment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
