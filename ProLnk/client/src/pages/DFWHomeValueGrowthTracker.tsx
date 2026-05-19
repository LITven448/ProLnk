import { useState } from 'react';

const DFW_ANNUAL_APPRECIATION: Record<string, number> = {
  'Dallas Core': 6.2,
  'Fort Worth': 5.8,
  'Frisco/McKinney': 7.1,
  'Plano/Allen': 5.9,
  'Arlington/Mansfield': 4.8,
  'Southlake/Keller': 5.5,
  'Denton/Lewisville': 6.0,
  'Grand Prairie/Irving': 5.2,
};

const IMPROVEMENT_RETURNS: Record<string, { label: string; roi: number }> = {
  kitchen: { label: 'Kitchen Remodel', roi: 0.72 },
  bath: { label: 'Bathroom Update', roi: 0.68 },
  hvac: { label: 'HVAC Replacement', roi: 0.85 },
  landscaping: { label: 'Landscaping', roi: 0.60 },
  roof: { label: 'New Roof', roi: 0.90 },
  addition: { label: 'Room Addition', roi: 0.55 },
};

export default function DFWHomeValueGrowthTracker() {
  const [purchasePrice, setPurchasePrice] = useState('');
  const [purchaseYear, setPurchaseYear] = useState('2020');
  const [submarket, setSubmarket] = useState('Dallas Core');
  const [improvements, setImprovements] = useState<Record<string, string>>({});
  const [calculated, setCalculated] = useState(false);

  const currentYear = 2026;
  const years = currentYear - parseInt(purchaseYear);
  const annualRate = DFW_ANNUAL_APPRECIATION[submarket] / 100;
  const base = parseFloat(purchasePrice) || 0;

  const marketValue = base * Math.pow(1 + annualRate, years);
  const totalImprovementCost = Object.values(improvements).reduce((s, v) => s + (parseFloat(v) || 0), 0);
  const improvementAddedValue = Object.entries(improvements).reduce((s, [k, v]) => {
    return s + (parseFloat(v) || 0) * (IMPROVEMENT_RETURNS[k]?.roi || 0);
  }, 0);
  const estimatedValue = marketValue + improvementAddedValue;
  const totalAppreciation = base > 0 ? estimatedValue - base : 0;
  const pctGain = base > 0 ? ((totalAppreciation / base) * 100).toFixed(1) : '0';
  const dfwAvgGain = base > 0 ? (base * Math.pow(1 + 0.059, years) - base) : 0;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>📈</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Home Value Growth Tracker</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>Track appreciation vs DFW averages + improvement impact</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#F5E642', fontWeight: 600, display: 'block', marginBottom: 6, fontSize: 14 }}>Purchase Price</label>
              <input
                type="number"
                placeholder="$350,000"
                value={purchasePrice}
                onChange={e => setPurchasePrice(e.target.value)}
                style={{ background: '#1a2f4e', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', width: '100%', fontSize: 15, boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ color: '#F5E642', fontWeight: 600, display: 'block', marginBottom: 6, fontSize: 14 }}>Purchase Year</label>
              <select
                value={purchaseYear}
                onChange={e => setPurchaseYear(e.target.value)}
                style={{ background: '#1a2f4e', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', width: '100%', fontSize: 15 }}
              >
                {Array.from({ length: 20 }, (_, i) => 2006 + i).map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#F5E642', fontWeight: 600, display: 'block', marginBottom: 6, fontSize: 14 }}>DFW Submarket</label>
            <select
              value={submarket}
              onChange={e => setSubmarket(e.target.value)}
              style={{ background: '#1a2f4e', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', width: '100%', fontSize: 15 }}
            >
              {Object.keys(DFW_ANNUAL_APPRECIATION).map(k => (
                <option key={k} value={k}>{k} ({DFW_ANNUAL_APPRECIATION[k]}%/yr avg)</option>
              ))}
            </select>
          </div>

          <div>
            <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 10, fontSize: 14 }}>Improvements Made ($)</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {Object.entries(IMPROVEMENT_RETURNS).map(([key, meta]) => (
                <div key={key}>
                  <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>{meta.label} <span style={{ color: '#F5E642' }}>({Math.round(meta.roi * 100)}% return)</span></div>
                  <input
                    type="number"
                    placeholder="$0"
                    value={improvements[key] || ''}
                    onChange={e => setImprovements(prev => ({ ...prev, [key]: e.target.value }))}
                    style={{ background: '#1a2f4e', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, padding: '8px 10px', width: '100%', fontSize: 14, boxSizing: 'border-box' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setCalculated(true)}
          disabled={!purchasePrice}
          style={{ background: purchasePrice ? '#F5E642' : '#1e3a5f', color: '#0A1628', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 10, padding: '14px 32px', width: '100%', cursor: purchasePrice ? 'pointer' : 'not-allowed', marginBottom: 24 }}
        >
          Estimate Current Value
        </button>

        {calculated && base > 0 && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 20px' }}>🏡 Your {submarket} Home</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div style={{ background: '#1a2f4e', borderRadius: 8, padding: 16 }}>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>Estimated Value Today</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#F5E642' }}>${Math.round(estimatedValue).toLocaleString()}</div>
              </div>
              <div style={{ background: '#1a2f4e', borderRadius: 8, padding: 16 }}>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>Total Appreciation</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#34d399' }}>+{pctGain}%</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              <div style={{ background: '#1a2f4e', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>Market Gain</div>
                <div style={{ fontWeight: 700, color: '#fff' }}>${Math.round(marketValue - base).toLocaleString()}</div>
              </div>
              <div style={{ background: '#1a2f4e', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>Improvement Value Added</div>
                <div style={{ fontWeight: 700, color: '#34d399' }}>${Math.round(improvementAddedValue).toLocaleString()}</div>
              </div>
              <div style={{ background: '#1a2f4e', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>vs DFW Avg Gain</div>
                <div style={{ fontWeight: 700, color: totalAppreciation >= dfwAvgGain ? '#34d399' : '#f87171' }}>
                  {totalAppreciation >= dfwAvgGain ? '▲' : '▼'} ${Math.abs(Math.round(totalAppreciation - dfwAvgGain)).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
