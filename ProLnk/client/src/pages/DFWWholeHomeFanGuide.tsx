import { useState } from 'react';

const fanData = {
  small: { size: '1000-1500 CFM', model: '24" belt-drive', cost: '$400-600', noise: 'Low (42-48 dB)', savings: '$180-240/yr' },
  medium: { size: '2000-3000 CFM', model: '30" belt-drive', cost: '$600-900', noise: 'Moderate (50-56 dB)', savings: '$280-380/yr' },
  large: { size: '4000-5500 CFM', model: '36" direct-drive', cost: '$900-1400', noise: 'Notable (58-64 dB)', savings: '$420-560/yr' },
  xlarge: { size: '6000+ CFM', model: '42" belt-drive', cost: '$1400-2200', noise: 'Significant (64-70 dB)', savings: '$580-780/yr' },
};

const shoulderMonths = ['March', 'April', 'May', 'October', 'November'];

export default function DFWWholeHomeFanGuide() {
  const [sqft, setSqft] = useState('');
  const [monthsUsed, setMonthsUsed] = useState(3);
  const [result, setResult] = useState<null | typeof fanData.small & { grade: string }>(null);

  function calculate() {
    const s = parseInt(sqft);
    if (!s || s < 500) return;
    let tier: keyof typeof fanData;
    if (s < 1500) tier = 'small';
    else if (s < 2500) tier = 'medium';
    else if (s < 4000) tier = 'large';
    else tier = 'xlarge';
    const base = fanData[tier];
    const grade = monthsUsed >= 4 ? 'Excellent ROI' : monthsUsed === 3 ? 'Good ROI' : 'Marginal ROI';
    setResult({ ...base, grade });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🌬️</span>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: 0 }}>DFW Whole House Fan Guide</h1>
        </div>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>Whole house fans are a DFW secret weapon — pull cool night air in, push heat out, slash your AC bills.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⏰ DFW Shoulder Season Windows</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {shoulderMonths.map(m => (
              <span key={m} style={{ background: '#1E3A5F', padding: '6px 14px', borderRadius: 20, fontSize: 14, color: '#CBD5E1' }}>{m}</span>
            ))}
          </div>
          <p style={{ color: '#64748B', fontSize: 13, marginTop: 12 }}>Effective when outside temp drops below 78°F — typically after 9 PM in shoulder months. Open windows 4–6 inches, crack attic vents.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🧮 Size Your Fan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>Home Size (sq ft)</label>
              <input
                type="number"
                value={sqft}
                onChange={e => setSqft(e.target.value)}
                placeholder="e.g. 2200"
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 16, boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>Shoulder Months You'll Use It</label>
              <select
                value={monthsUsed}
                onChange={e => setMonthsUsed(Number(e.target.value))}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 16 }}
              >
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} month{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer', width: '100%' }}>
            Calculate My Fan Size →
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F3460', borderRadius: 12, padding: 24, border: '2px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>✅ Your Recommendation</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {[
                ['Airflow', result.size],
                ['Recommended Model', result.model],
                ['Installation Cost', result.cost],
                ['Noise Level', result.noise],
                ['Annual Savings', result.savings],
                ['ROI Grade', result.grade],
              ].map(([label, value]) => (
                <div key={label} style={{ background: '#112240', borderRadius: 8, padding: 14 }}>
                  <div style={{ color: '#64748B', fontSize: 12, marginBottom: 4 }}>{label}</div>
                  <div style={{ color: '#E8EDF5', fontWeight: 600 }}>{value}</div>
                </div>
              ))}
            </div>
            <p style={{ color: '#64748B', fontSize: 13, marginTop: 16 }}>Pro tip: Pair with ceiling fans set to reverse in summer. Most DFW attic installs take 3–4 hours by a licensed electrician.</p>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginTop: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>⚡ Key DFW Considerations</h2>
          {[
            ['Attic Venting', 'You need 1 sq ft of attic venting per 750 CFM of fan capacity — under-vented attics negate all savings'],
            ['Insulation Damper', 'DFW humidity in summer means you need an insulated damper to prevent moisture infiltration when fan is off'],
            ['Code', 'Most DFW municipalities require a licensed electrician — pull a permit to protect resale value'],
            ['Timing', 'Install in March before shoulder season hits — contractors book up fast in spring'],
          ].map(([title, desc]) => (
            <div key={title} style={{ borderLeft: '3px solid #F5E642', paddingLeft: 14, marginBottom: 14 }}>
              <div style={{ fontWeight: 600, color: '#E8EDF5' }}>{title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
