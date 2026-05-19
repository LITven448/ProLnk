import { useState } from 'react';

const seerRecs: Record<string, { rec: string; annualSavings: string; payback: string; note: string }> = {
  '10_1500': { rec: 'SEER2 16', annualSavings: '$480/yr', payback: '6-8 years', note: 'Significant upgrade from SEER 10. At 1500 sqft in DFW you run AC 7+ months. SEER2 16 hits the sweet spot.' },
  '10_2500': { rec: 'SEER2 18', annualSavings: '$820/yr', payback: '7-9 years', note: 'Large DFW home with SEER 10 is burning money. SEER2 18 pays back well given your runtime.' },
  '10_3500': { rec: 'SEER2 20', annualSavings: '$1,150/yr', payback: '8-10 years', note: 'Large home justifies premium SEER2 20. Annual savings are substantial on DFW electricity rates.' },
  '14_1500': { rec: 'SEER2 17', annualSavings: '$210/yr', payback: '8-10 years', note: 'You are near the federal minimum for DFW. Modest upgrade to SEER2 17 makes sense at next replacement.' },
  '14_2500': { rec: 'SEER2 18', annualSavings: '$380/yr', payback: '8-10 years', note: 'Mid-range efficiency gains are meaningful at this size. SEER2 18 is the recommended upgrade.' },
  '14_3500': { rec: 'SEER2 19', annualSavings: '$540/yr', payback: '9-11 years', note: 'Large home benefits from high-efficiency. SEER2 19 or 20 at next replacement.' },
  '18_1500': { rec: 'SEER2 20', annualSavings: '$95/yr', payback: '12-15 years', note: 'You already have a good system. Only upgrade at end of life. SEER2 20 is available if you want max efficiency.' },
  '18_2500': { rec: 'SEER2 20', annualSavings: '$180/yr', payback: '11-14 years', note: 'Good efficiency. Upgrade to SEER2 20 at replacement time for best long-term savings.' },
  '18_3500': { rec: 'SEER2 22', annualSavings: '$260/yr', payback: '12-15 years', note: 'Large home justifies top-tier SEER2 22 at next replacement. DFW runtime makes it worthwhile.' },
};

export default function DFWHVACEfficiencyGuide() {
  const [sqft, setSqft] = useState('');
  const [currentSeer, setCurrentSeer] = useState('');
  const [result, setResult] = useState<{ rec: string; annualSavings: string; payback: string; note: string } | null>(null);

  function calculate() {
    if (!sqft || !currentSeer) return;
    const key = `${currentSeer}_${sqft}`;
    setResult(seerRecs[key] ?? null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>HVAC Efficiency Ratings for DFW</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
          DFW runs AC for 7+ months per year. Higher SEER2 ratings deliver dramatically bigger savings here than in cooler climates.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>Understanding SEER2 Ratings</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              ['SEER2 vs SEER', 'SEER2 is the new standard as of 2023. It uses a more realistic test pressure. A SEER2 14 is roughly equivalent to the old SEER 15.'],
              ['DFW Federal Minimum', 'Texas is in the South region. Federal law requires minimum SEER2 14 for split systems installed in DFW as of Jan 2023.'],
              ['EER2 for Extreme Heat', 'EER2 measures efficiency at peak load (95F outdoor temp). Critical for DFW where you hit 100F+ for weeks.'],
              ['Higher = More Savings', 'Each SEER2 point saves roughly 5-6% on cooling costs. With DFW electricity averaging $0.13/kWh, this adds up fast.'],
            ].map(([title, desc]) => (
              <div key={title as string} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{title as string}</div>
                <div style={{ color: '#94A3B8', fontSize: 14 }}>{desc as string}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>Calculate Your Upgrade Savings</h2>
          <div style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Home size (square feet)</label>
              <select value={sqft} onChange={e => setSqft(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 15 }}>
                <option value="">Select home size</option>
                <option value="1500″>Under 2,000 sq ft</option>
                <option value="2500″>2,000 - 3,000 sq ft</option>
                <option value="3500″>Over 3,000 sq ft</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Current system SEER rating</label>
              <select value={currentSeer} onChange={e => setCurrentSeer(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 15 }}>
                <option value="">Select current SEER</option>
                <option value="10″>SEER 10-12 (older system, pre-2006)</option>
                <option value="14″>SEER 13-15 (standard efficiency)</option>
                <option value="18″>SEER 16-19 (high efficiency)</option>
              </select>
            </div>
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 15, padding: '12px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', width: '100%' }}>
            Calculate Savings
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>Your Recommendation</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 4 }}>RECOMMENDED</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642′ }}>{result.rec}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 4 }}>ANNUAL SAVINGS</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#6EE7B7′ }}>{result.annualSavings}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 4 }}>PAYBACK</div>
                <div style={{ fontSize: 16, fontWeight: 800 }}>{result.payback}</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>{result.note}</p>
          </div>
        )}

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginTop: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>DFW Efficiency Quick Reference</h2>
          <div style={{ display: 'grid', gap: 8 }}>
            {[
              ['SEER2 14', 'Federal minimum for DFW/Texas', '#64748B'],
              ['SEER2 15-16', 'Good efficiency, solid mid-range', '#94A3B8'],
              ['SEER2 17-18', 'High efficiency, sweet spot for DFW', '#F5E642'],
              ['SEER2 19-20', 'Premium efficiency, best long-term savings', '#6EE7B7'],
              ['SEER2 21+', 'Top tier, variable-speed inverter compressors', '#A78BFA'],
            ].map(([seer, desc, color]) => (
              <div key={seer as string} style={{ display: 'flex', gap: 12, alignItems: 'center', background: '#0A1628', borderRadius: 8, padding: '10px 14px' }}>
                <div style={{ fontWeight: 700, color: color as string, minWidth: 80, fontSize: 14 }}>{seer as string}</div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>{desc as string}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
