import { useState } from 'react';

const pollutants = [
  { id: 'vocs', label: 'VOCs', icon: '🏗️', risk: 'High in new construction, fresh paint, new flooring. Off-gas over 2–5 years.' },
  { id: 'radon', label: 'Radon', icon: '☢️', risk: 'Lower risk in DFW vs North US, but basements and slabs can trap it. EPA recommends all homes test.' },
  { id: 'co', label: 'Carbon Monoxide', icon: '🔥', risk: 'Gas appliances, attached garages, HVAC failures. Silent killer — detector required by TX law.' },
  { id: 'formaldehyde', label: 'Formaldehyde', icon: '🧱', risk: 'Extremely common in DFW new builds. Pressed wood, cabinets, furniture off-gas for years.' },
  { id: 'pm25', label: 'Particulate Matter (PM2.5)', icon: '🌫️', risk: 'DFW has persistent ozone and PM2.5 issues. Infiltrates homes, worsens asthma.' },
  { id: 'mold', label: 'Mold Spores', icon: '🍄', risk: 'DFW humidity swings and flooding create prime mold conditions in HVAC ducts.' },
];

const symptoms = [
  { id: 'headache', label: '😤 Headaches' },
  { id: 'eyes', label: '👁️ Eye irritation' },
  { id: 'respiratory', label: '🫁 Respiratory' },
  { id: 'fatigue', label: '😴 Fatigue' },
  { id: 'allergy', label: '🤧 Allergy flare' },
];

const remediation = [
  { pollutant: 'VOCs', solution: 'Ventilation, low-VOC products, air purifier with activated carbon', cost: '$100–$800′ },
  { pollutant: 'Radon', solution: 'Sub-slab depressurization system', cost: '$800–$2,500′ },
  { pollutant: 'Carbon Monoxide', solution: 'Detector (required), HVAC service, vent check', cost: '$30–$300′ },
  { pollutant: 'Formaldehyde', solution: 'HEPA + carbon filter, ventilation, low-VOC sealer on cabinets', cost: '$200–$1,000′ },
  { pollutant: 'PM2.5', solution: 'MERV-13 HVAC filter, air purifier, seal penetrations', cost: '$50–$600′ },
  { pollutant: 'Mold', solution: 'HVAC cleaning, dehumidifier, remediation contractor', cost: '$500–$5,000+' },
];

export default function DFWAirQualityTestingGuide() {
  const [homeAge, setHomeAge] = useState('');
  const [renovated, setRenovated] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const getPriorities = () => {
    const list: string[] = [];
    if (homeAge === 'new' || renovated === 'yes') list.push('🔴 PRIORITY: VOC and formaldehyde testing — new construction off-gassing is a top DFW concern.');
    if (selectedSymptoms.includes('headache') || selectedSymptoms.includes('fatigue')) list.push('🔴 Carbon monoxide test immediately — symptoms match CO exposure.');
    if (selectedSymptoms.includes('respiratory') || selectedSymptoms.includes('allergy')) list.push('🟡 PM2.5 and mold spore testing recommended — DFW allergy season amplifies indoor air issues.');
    list.push('🟢 Radon test — simple $15 mail-in kit, low risk in DFW but worth ruling out.');
    if (list.length === 1) list.unshift('Your profile is lower risk. Annual CO detector check and MERV-13 filter are good baseline steps.');
    return list;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Home Health</span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0.5rem 0', lineHeight: 1.2 }}>🌬️ Indoor Air Quality Testing Guide for DFW Homes</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>DFW's allergy seasons, rapid new construction, and humidity swings make indoor air quality a real concern for North Texas homeowners.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {pollutants.map(p => (
            <div key={p.id} style={{ background: '#0f2340', borderRadius: 10, padding: '1rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>{p.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{p.label}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{p.risk}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>🛠️ Remediation Options</h2>
        <div style={{ overflowX: 'auto', marginBottom: '2.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: '#0f2340′ }}>
                {['Pollutant', 'Solution', 'Est. Cost'].map(h => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', color: '#F5E642', borderBottom: '1px solid #1e3a5f' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {remediation.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #1e3a5f' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{r.pollutant}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#94a3b8′ }}>{r.solution}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#4ade80′ }}>{r.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: '#0f2340', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#F5E642', marginBottom: '1.25rem' }}>🏠 Get Your Air Quality Priority List</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: 6 }}>HOME AGE</label>
              <select value={homeAge} onChange={e => setHomeAge(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', color: '#fff', borderRadius: 6, padding: '0.5rem' }}>
                <option value=''>Select...</option>
                <option value='new'>Built after 2015</option>
                <option value='mid'>2000 – 2015</option>
                <option value='old'>Before 2000</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: 6 }}>RECENT RENOVATION?</label>
              <select value={renovated} onChange={e => setRenovated(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', color: '#fff', borderRadius: 6, padding: '0.5rem' }}>
                <option value=''>Select...</option>
                <option value='yes'>Yes (within 3 years)</option>
                <option value='no'>No</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: 8 }}>SYMPTOMS (select all that apply)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {symptoms.map(s => (
                <button key={s.id} onClick={() => toggleSymptom(s.id)} style={{ padding: '0.4rem 0.9rem', borderRadius: 20, border: '1px solid', borderColor: selectedSymptoms.includes(s.id) ? '#F5E642′ : '#1e3a5f', background: selectedSymptoms.includes(s.id) ? '#F5E642' : ’transparent', color: selectedSymptoms.includes(s.id) ? '#0A1628′ : '#fff', cursor: ’pointer', fontSize: '0.85rem', fontWeight: 600 }}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => setShowResults(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', fontWeight: 800, fontSize: '1rem', cursor: 'pointer' }}>
            Get Priority List →
          </button>
          {showResults && (
            <div style={{ marginTop: '1.25rem', background: '#0A1628', borderRadius: 8, padding: '1rem', border: '1px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>Your IAQ Action Plan:</div>
              {getPriorities().map((r, i) => <div key={i} style={{ color: '#e2e8f0', marginBottom: 6, fontSize: '0.95rem' }}>{r}</div>)}
              <div style={{ marginTop: 12, color: '#94a3b8', fontSize: '0.85rem' }}>Testing cost estimate: $50–$500 depending on panel and whether you use a pro inspector.</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2340', borderRadius: 10, padding: '1rem 1.25rem', border: '1px solid #1e3a5f', color: '#94a3b8', fontSize: '0.875rem' }}>
          💡 DFW allergy seasons (Feb–May cedar/oak, Aug–Oct ragweed) dramatically worsen indoor air quality. Tighten HVAC filtration before each peak season.
        </div>
      </div>
    </div>
  );
}
