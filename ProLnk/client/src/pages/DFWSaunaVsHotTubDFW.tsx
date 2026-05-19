import { useState } from 'react';

const comparison = [
  { category: 'Upfront Cost', sauna: '$3,000–15,000', hotTub: '$4,000–18,000' },
  { category: 'Monthly Operating', sauna: '$15–40 (electric)', hotTub: '$50–100 (electric + chemicals)' },
  { category: 'DFW Best Months', sauna: 'Year-round (contrast therapy)', hotTub: 'October – March peak' },
  { category: 'Maintenance', sauna: 'Very low (wipe down only)', hotTub: 'Weekly chemical balancing' },
  { category: 'Installation', sauna: '1–3 days, no water line', hotTub: '1 day + electrical + pad' },
  { category: 'Longevity', sauna: '20–30 years', hotTub: '10–15 years' },
  { category: 'DFW Summer Use', sauna: '⭐⭐⭐⭐⭐ (contrast therapy after pool)', hotTub: '⭐⭐ (set to 95°F only)' },
  { category: 'Resale Value Add', sauna: 'Growing fast in DFW market', hotTub: 'Established premium in DFW' },
];

const results: Record<string, Record<string, string>> = {
  active: {
    under15k: 'Barrel Sauna (outdoor, 2-person, $4,000–8,000 installed). Contrast therapy pairs perfectly with DFW pool or cold plunge. Zero maintenance. Year-round use.',
    under30k: 'Full-spectrum infrared sauna (4-person, $8,000–15,000) + small cold plunge ($2,000). The ultimate DFW contrast therapy setup.',
    over30k: 'Luxury steam sauna room (custom built-in) + cold plunge + hot tub combo. Full DFW wellness compound.',
  },
  social: {
    under15k: '6-person hot tub ($7,000–12,000 installed). DFW December–February use is exceptional. Add a saltwater system to reduce chemical maintenance.',
    under30k: '7-person hot tub with waterfall ($12,000–18,000) + pergola overhead ($5,000). DFW mosquito season demands the cover.',
    over30k: 'Swim spa combo (hot tub + lap pool hybrid, $20,000–35,000). Year-round DFW fitness and entertaining centerpiece.',
  },
  recovery: {
    under15k: 'Infrared sauna (1–2 person, $2,500–5,000) + cold plunge tub ($1,500). Far infrared penetrates deeper for muscle recovery. DFW heat makes cold plunge dramatic and effective.',
    under30k: 'Full-spectrum sauna (4-person, $8,000) + cold plunge ($3,000) + hot tub (6-person, $10,000). Full DFW recovery circuit.',
    over30k: 'Custom built-in cedar sauna + commercial cold plunge + luxury hot tub. The DFW athlete compound.',
  },
};

export default function DFWSaunaVsHotTubDFW() {
  const [lifestyle, setLifestyle] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState('');

  function getRecommendation() {
    if (!lifestyle || !budget) return;
    const rec = results[lifestyle]?.[budget];
    setResult(rec || 'Select both options to get your DFW recommendation.');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🧖 DFW WELLNESS GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Sauna vs Hot Tub for DFW Homeowners</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          Both are popular in DFW, but for different reasons. Saunas excel in DFW for contrast therapy —
          going from 190°F sauna to cool air or cold plunge in summer is a unique DFW experience.
          Hot tubs shine December through February when DFW evenings drop to 35–50°F.
        </p>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 8 }}>🌡️ The DFW Contrast Therapy Advantage</h2>
        <div style={{ background: '#1e2d45', borderRadius: 8, padding: 16, marginBottom: 24 }}>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: 14 }}>
            DFW's extreme heat creates a unique sauna experience: step from a 185°F sauna directly into
            <strong style={{ color: '#fff' }}> 105°F ambient air</strong> — the contrast is profound.
            Add a cold plunge or pool jump between rounds for full Nordic-style therapy without flying to Finland.
            This is why saunas are growing faster than hot tubs in DFW backyard installs (2023–2025 data).
          </p>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📊 Head-to-Head Comparison</h2>
        <div style={{ overflowX: 'auto', marginBottom: 28 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#1e2d45' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8', fontWeight: 600 }}>Category</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#F5E642', fontWeight: 600 }}>🔥 Sauna</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#60a5fa', fontWeight: 600 }}>🛁 Hot Tub</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr key={row.category} style={{ background: i % 2 === 0 ? '#111c2d' : '#0A1628' }}>
                  <td style={{ padding: '10px 14px', color: '#94a3b8' }}>{row.category}</td>
                  <td style={{ padding: '10px 14px', color: '#cbd5e1' }}>{row.sauna}</td>
                  <td style={{ padding: '10px 14px', color: '#cbd5e1' }}>{row.hotTub}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔧 Get Your DFW Recommendation</h2>
        <div style={{ background: '#1e2d45', borderRadius: 8, padding: 20, marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW Lifestyle Goal</label>
              <select value={lifestyle} onChange={e => setLifestyle(e.target.value)}
                style={{ width: '100%', padding: 10, background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 6 }}>
                <option value=''>Select lifestyle</option>
                <option value='active'>Active / Contrast Therapy</option>
                <option value='social'>Social / Entertaining</option>
                <option value='recovery'>Recovery / Health Focus</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Budget</label>
              <select value={budget} onChange={e => setBudget(e.target.value)}
                style={{ width: '100%', padding: 10, background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 6 }}>
                <option value=''>Select budget</option>
                <option value='under15k'>Under $15,000</option>
                <option value='under30k'>$15,000 – $30,000</option>
                <option value='over30k'>$30,000+</option>
              </select>
            </div>
          </div>
          <button onClick={getRecommendation}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>
            Get My DFW Recommendation
          </button>
          {result && (
            <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 6, padding: 14 }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>✅ Best for Your DFW Situation</div>
              <p style={{ color: '#cbd5e1', margin: 0 }}>{result}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 8, padding: 16, borderLeft: '3px solid #F5E642' }}>
          <strong style={{ color: '#F5E642' }}>💡 Can't Decide? Do Both</strong>
          <p style={{ color: '#94a3b8', margin: '8px 0 0', fontSize: 14 }}>
            A 4-person infrared sauna ($5,000) + 4-person plug-and-play hot tub ($4,000) runs $9,000 total —
            less than one luxury hot tub — and covers every DFW season, health goal, and use case.
            This combo is the fastest-growing backyard wellness trend in DFW suburbs (2024–2025).
          </p>
        </div>
      </div>
    </div>
  );
}
