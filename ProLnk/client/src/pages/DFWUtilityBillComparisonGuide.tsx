import { useState } from 'react';

const suburbData: Record<string, { elecRate: string; waterRate: number; mudFee: number; gasProvider: string; annualElec: number; annualWater: number; annualGas: number }> = {
  Dallas: { elecRate: 'Choice — avg $0.12/kWh', waterRate: 3.10, mudFee: 0, gasProvider: 'Atmos Energy', annualElec: 2040, annualWater: 780, annualGas: 480 },
  Frisco: { elecRate: 'Choice — avg $0.11/kWh', waterRate: 4.20, mudFee: 35, gasProvider: 'Atmos Energy', annualElec: 1920, annualWater: 980, annualGas: 450 },
  Plano: { elecRate: 'Choice — avg $0.12/kWh', waterRate: 3.65, mudFee: 0, gasProvider: 'Atmos Energy', annualElec: 2000, annualWater: 850, annualGas: 460 },
  McKinney: { elecRate: 'Choice — avg $0.11/kWh', waterRate: 3.80, mudFee: 20, gasProvider: 'Atmos Energy', annualElec: 1980, annualWater: 890, annualGas: 455 },
  Prosper: { elecRate: 'Choice — avg $0.115/kWh', waterRate: 4.50, mudFee: 45, gasProvider: 'Atmos Energy', annualElec: 2100, annualWater: 1080, annualGas: 440 },
  Celina: { elecRate: 'Choice — avg $0.115/kWh', waterRate: 4.80, mudFee: 55, gasProvider: 'Atmos Energy', annualElec: 2150, annualWater: 1150, annualGas: 435 },
  Arlington: { elecRate: 'Choice — avg $0.12/kWh', waterRate: 3.25, mudFee: 0, gasProvider: 'Atmos Energy', annualElec: 2060, annualWater: 800, annualGas: 470 },
  'Fort Worth': { elecRate: 'Choice — avg $0.12/kWh', waterRate: 3.40, mudFee: 0, gasProvider: 'Atmos Energy', annualElec: 2080, annualWater: 820, annualGas: 468 },
  Southlake: { elecRate: 'Choice — avg $0.11/kWh', waterRate: 3.90, mudFee: 15, gasProvider: 'Atmos Energy', annualElec: 2400, annualWater: 960, annualGas: 530 },
  Keller: { elecRate: 'Choice — avg $0.115/kWh', waterRate: 3.75, mudFee: 10, gasProvider: 'Atmos Energy', annualElec: 2200, annualWater: 900, annualGas: 490 },
};

const dfwAvg = { annualElec: 2050, annualWater: 880, annualGas: 468 };

export default function DFWUtilityBillComparisonGuide() {
  const [suburb, setSuburb] = useState('');
  const [result, setResult] = useState<typeof suburbData[string] & { totalAnnual: number; vsAvg: number } | null>(null);

  function lookup() {
    if (!suburb || !suburbData[suburb]) return;
    const d = suburbData[suburb];
    const totalAnnual = d.annualElec + d.annualWater + d.annualGas + d.mudFee * 12;
    const dfwTotal = dfwAvg.annualElec + dfwAvg.annualWater + dfwAvg.annualGas;
    const vsAvg = totalAnnual - dfwTotal;
    setResult({ ...d, totalAnnual, vsAvg });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F0FE', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '2rem' }}>🗺️</span>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0 0.25rem' }}>
            DFW Utility Bill Comparison by Suburb
          </h1>
          <p style={{ color: '#94A3B8', margin: 0 }}>
            Utility costs vary dramatically across DFW suburbs. Outer suburbs often have MUD fees — compare before you move or budget.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '⚡', label: 'Electricity', note: 'Deregulated — shop rates' },
            { icon: '💧', label: 'Water', note: 'Varies $3.10–$4.80/1K gal' },
            { icon: '🔥', label: 'Natural Gas', note: 'Atmos Energy statewide' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#111D35', borderRadius: 10, padding: '1rem', border: '1px solid #1E3A5F', textAlign: 'center' }}>
              <div style={{ fontSize: '1.75rem' }}>{item.icon}</div>
              <div style={{ fontWeight: 700, marginTop: 4 }}>{item.label}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.8rem', marginTop: 2 }}>{item.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: '1.5rem', border: '1px solid #1E3A5F', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginTop: 0 }}>🔍 Look Up Your Suburb</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {Object.keys(suburbData).map(s => (
              <button key={s} onClick={() => setSuburb(s)}
                style={{ padding: '0.4rem 0.9rem', borderRadius: 20, border: `1px solid ${suburb === s ? '#F5E642' : '#1E3A5F'}`, background: suburb === s ? '#F5E642' : '#0A1628', color: suburb === s ? '#0A1628' : '#E8F0FE', cursor: 'pointer', fontWeight: suburb === s ? 700 : 400, fontSize: '0.9rem' }}>
                {s}
              </button>
            ))}
          </div>
          <button onClick={lookup} disabled={!suburb}
            style={{ background: suburb ? '#F5E642' : '#1E3A5F', color: suburb ? '#0A1628' : '#94A3B8', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.7rem 1.5rem', fontSize: '1rem', cursor: suburb ? 'pointer' : 'default' }}>
            Compare Utility Costs
          </button>
        </div>

        {result && (
          <div style={{ background: '#111D35', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642' }}>
            <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginTop: 0 }}>📊 {suburb} Utility Overview</h2>
            <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {[
                { icon: '⚡', label: 'Electricity', value: result.elecRate, note: `~$${result.annualElec}/yr` },
                { icon: '💧', label: 'Water', value: `$${result.waterRate}/1,000 gal`, note: `~$${result.annualWater}/yr` },
                { icon: '🔥', label: 'Natural Gas', value: result.gasProvider, note: `~$${result.annualGas}/yr` },
                { icon: '🏘️', label: 'MUD District Fee', value: result.mudFee > 0 ? `$${result.mudFee}/mo` : 'None', note: result.mudFee > 0 ? `$${result.mudFee * 12}/yr` : '$0/yr' },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0.75rem', background: '#0A1628', borderRadius: 8 }}>
                  <span>{row.icon} {row.label}: <span style={{ color: '#E8F0FE' }}>{row.value}</span></span>
                  <span style={{ color: '#94A3B8', fontSize: '0.85rem' }}>{row.note}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ textAlign: 'center', padding: '1rem', background: '#0A1628', borderRadius: 10 }}>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#F5E642' }}>${result.totalAnnual.toLocaleString()}</div>
                <div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>Total annual utilities</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem', background: '#0A1628', borderRadius: 10 }}>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: result.vsAvg > 0 ? '#FF6B6B' : '#34D399' }}>
                  {result.vsAvg > 0 ? '+' : ''}${result.vsAvg}/yr
                </div>
                <div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>vs DFW average</div>
              </div>
            </div>
            <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#0A1628', borderRadius: 8, fontSize: '0.85rem', color: '#94A3B8' }}>
              ⚡ Shop electricity plans at <strong style={{ color: '#F5E642' }}>PowerToChoose.org</strong> — switching plans alone can save $200–$400/yr
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
