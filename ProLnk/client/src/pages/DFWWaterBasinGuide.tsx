import { useState } from 'react';

const cities: Record<string, { source: string[]; hardness: string; treatment: string; droughtRisk: string; note: string }> = {
  'Dallas': { source: ['Lake Grapevine', 'Lake Lewisville', 'Lake Ray Hubbard', 'Lake Fork'], hardness: 'Moderately Hard (150-250 mg/L)', treatment: 'Conventional filtration, chloramines, fluoridation', droughtRisk: 'Moderate — multiple reservoir sources buffer drought impact', note: 'Dallas Water Utilities draws from 5 reservoirs across the TRWD and DWU systems.' },
  'Fort Worth': { source: ['Eagle Mountain Lake', 'Benbrook Lake', 'Lake Worth', 'Cedar Creek Reservoir'], hardness: 'Hard (200-300 mg/L)', treatment: 'Lime softening, chloramination, ozone treatment at some plants', droughtRisk: 'Moderate-High — Eagle Mountain has dropped significantly in severe droughts', note: 'Fort Worth uses Tarrant Regional Water District (TRWD) sources. Water can be very hard in some zones.' },
  'Plano': { source: ['Lake Lavon', 'Lake Texoma (via pipeline)'], hardness: 'Moderately Hard (130-220 mg/L)', treatment: 'Conventional filtration, chlorination, fluoride', droughtRisk: 'Low-Moderate — Lavon is a large reservoir with significant capacity', note: 'Plano draws primarily from Lake Lavon via NTMWD. Water quality is consistently rated excellent.' },
  'Arlington': { source: ['Lake Benbrook', 'Eagle Mountain Lake', 'Cedar Creek Reservoir'], hardness: 'Hard (180-280 mg/L)', treatment: 'Lime softening, chloramination, pH adjustment', droughtRisk: 'Moderate — TRWD manages multiple reservoirs for redundancy', note: 'Arlington blends water from multiple TRWD sources. Hardness is notable — water softeners are common.' },
  'Frisco': { source: ['Lake Lavon', 'Lake Texoma (via pipeline)'], hardness: 'Moderate (120-200 mg/L)', treatment: 'NTMWD advanced treatment, UV disinfection at some plants', droughtRisk: 'Low-Moderate — NTMWD system well-capitalized with multiple sources', note: 'Frisco is served by North Texas Municipal Water District (NTMWD), one of the best-managed systems in Texas.' },
  'McKinney': { source: ['Lake Lavon', 'Lake Texoma'], hardness: 'Moderate (130-210 mg/L)', treatment: 'Conventional + advanced filtration via NTMWD', droughtRisk: 'Low-Moderate', note: 'McKinney is part of NTMWD system. Rapid growth has required major infrastructure investment.' },
  'Irving': { source: ['Lake Grapevine', 'Lake Lewisville'], hardness: 'Moderately Hard (140-240 mg/L)', treatment: 'City of Irving Water Utility — conventional filtration, chloramines', droughtRisk: 'Moderate — same reservoir system as Dallas', note: 'Irving draws from DFW-area lakes. The airport district has distinct water zones.' },
  'Garland': { source: ['Lake Ray Hubbard', 'Lake Fork'], hardness: 'Moderate (120-200 mg/L)', treatment: 'Conventional filtration, chloramination', droughtRisk: 'Low-Moderate — Ray Hubbard is large and relatively stable', note: 'Garland Water Utilities operates its own treatment plant on Lake Ray Hubbard.' },
};

export default function DFWWaterBasinGuide() {
  const [city, setCity] = useState('Dallas');
  const [result, setResult] = useState<null | typeof cities[string]>(null);

  const lookup = () => setResult(cities[city] || null);
  const data = cities[city];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>💧 DFW HOME GUIDE</div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>DFW Water Source Guide</h1>
        <p style={{ color: '#9BA3B8', marginBottom: '2rem' }}>DFW's 7.5 million residents depend on a network of lakes, rivers, and regional water districts. Drought, growth, and aging infrastructure all affect your water. Know your source.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🏞 DFW's Major Reservoirs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {[['Lake Grapevine', '73,600 acre-ft capacity — Dallas & Irving'], ['Lake Lewisville', '462,000 acre-ft — Dallas region primary'], ['Lake Lavon', '363,000 acre-ft — Collin County primary'], ['Lake Ray Hubbard', '152,000 acre-ft — Garland & East Dallas'], ['Eagle Mountain Lake', '186,000 acre-ft — Fort Worth/Tarrant'], ['Lake Texoma', '5.4M acre-ft — largest, serves via pipeline']].map(([name, desc]) => (
              <div key={name} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 600 }}>🏊 {name}</div>
                <div style={{ color: '#9BA3B8', fontSize: '0.8rem', marginTop: '0.25rem' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Water Lookup by City</h2>
          <label style={{ display: 'block', color: '#9BA3B8', marginBottom: '0.4rem', fontSize: '0.85rem' }}>Select your DFW city</label>
          <select value={city} onChange={e => { setCity(e.target.value); setResult(null); }} style={{ width: '100%', padding: '0.7rem', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8, marginBottom: '1rem' }}>
            {Object.keys(cities).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={lookup} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>Look Up Water Profile</button>
          {result && (
            <div style={{ marginTop: '1.5rem', background: '#0A1628', borderRadius: 8, padding: '1.5rem' }}>
              <div style={{ marginBottom: '1rem', color: '#9BA3B8', fontSize: '0.9rem', fontStyle: 'italic' }}>{result.note}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                {[['💧 Water Hardness', result.hardness], ['⚠️ Drought Risk', result.droughtRisk]].map(([label, val]) => (
                  <div key={label} style={{ background: '#0F2040', borderRadius: 8, padding: '0.75rem' }}>
                    <div style={{ color: '#F5E642', fontSize: '0.8rem', marginBottom: '0.25rem' }}>{label}</div>
                    <div style={{ fontSize: '0.9rem' }}>{val}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#0F2040', borderRadius: 8, padding: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontSize: '0.8rem', marginBottom: '0.4rem' }}>🏞 Water Sources</div>
                {result.source.map(s => <div key={s} style={{ fontSize: '0.85rem', color: '#9BA3B8', padding: '0.2rem 0' }}>• {s}</div>)}
              </div>
              <div style={{ background: '#0F2040', borderRadius: 8, padding: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontSize: '0.8rem', marginBottom: '0.4rem' }}>⚗️ Treatment Methods</div>
                <div style={{ fontSize: '0.85rem', color: '#9BA3B8' }}>{result.treatment}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🌵 Drought & Conservation</h2>
          {[['📊 Check Levels', 'TWDB.texas.gov shows current reservoir levels across Texas — updated weekly'], ['🚿 Stage Restrictions', 'DFW utilities issue watering stage restrictions in drought — check your city utility’s site'], ['💧 Hard Water', 'High hardness requires water softeners for appliances — reduces scale buildup by 70%'], ['📋 Annual Report', 'Your utility publishes a free Consumer Confidence Report (CCR) each July — request it']].map(([icon, desc]) => (
            <div key={icon} style={{ display: 'flex', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid #1E3A5F' }}>
              <span>{icon}</span>
              <span style={{ color: '#9BA3B8', fontSize: '0.9rem' }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
