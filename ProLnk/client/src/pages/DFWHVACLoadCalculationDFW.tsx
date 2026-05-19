import { useState } from 'react';

type HomeSize = '1000-1500′ | '1500-2000' | '2000-2500' | '2500-3000' | '3000+';
type InsulationLevel = 'Poor (pre-1990)' | 'Standard (R-13/R-30)' | 'Good (R-19/R-38)' | 'Excellent (R-21+/R-49+)';
type WindowArea = 'Low (<15% floor area)' | 'Average (15-20%)' | 'High (20-30%)' | 'Very High (30%+)';

const homeSizes: HomeSize[] = ['1000-1500', '1500-2000', '2000-2500', '2500-3000', '3000+'];
const insulations: InsulationLevel[] = ['Poor (pre-1990)', 'Standard (R-13/R-30)', 'Good (R-19/R-38)', 'Excellent (R-21+/R-49+)'];
const windowAreas: WindowArea[] = ['Low (<15% floor area)', 'Average (15-20%)', 'High (20-30%)', 'Very High (30%+)'];

const baseBTU: Record<HomeSize, number> = {
  '1000-1500': 24000,
  '1500-2000': 30000,
  '2000-2500': 36000,
  '2500-3000': 42000,
  '3000+': 54000,
};

const insulationMod: Record<InsulationLevel, number> = {
  'Poor (pre-1990)': 1.3,
  'Standard (R-13/R-30)': 1.1,
  'Good (R-19/R-38)': 1.0,
  'Excellent (R-21+/R-49+)': 0.85,
};

const windowMod: Record<WindowArea, number> = {
  'Low (<15% floor area)': 0.9,
  'Average (15-20%)': 1.0,
  'High (20-30%)': 1.15,
  'Very High (30%+)': 1.3,
};

function getTons(btu: number) {
  return (btu / 12000).toFixed(1);
}

function getRuleOfThumbTons(size: HomeSize) {
  const sqft = { '1000-1500': 1250, '1500-2000': 1750, '2000-2500': 2250, '2500-3000': 2750, '3000+': 3500 };
  return (sqft[size] / 500).toFixed(1);
}

export default function DFWHVACLoadCalculationDFW() {
  const [size, setSize] = useState<HomeSize | ''>('');
  const [insulation, setInsulation] = useState<InsulationLevel | ''>('');
  const [windows, setWindows] = useState<WindowArea | ''>('');

  const result = size && insulation && windows ? (() => {
    const base = baseBTU[size as HomeSize];
    const adjusted = base * insulationMod[insulation as InsulationLevel] * windowMod[windows as WindowArea];
    const propTons = getTons(adjusted);
    const thumbTons = getRuleOfThumbTons(size as HomeSize);
    const diff = Math.abs(parseFloat(propTons) - parseFloat(thumbTons));
    return { adjusted, propTons, thumbTons, diff };
  })() : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📏 DFW HVAC Load Calculation Guide</div>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
            Manual J load calculations are the engineering foundation of every HVAC replacement in DFW. Skipping them — or using rule-of-thumb sizing — is the #1 cause of comfort failures in North Texas homes.
          </p>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontWeight: 'bold', color: '#F5E642', marginBottom: '0.75rem' }}>🌡️ DFW Design Conditions (ASHRAE)</div>
          <ul style={{ color: '#94a3b8', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.4rem' }}>Summer design temp: <strong style={{ color: '#e2e8f0′ }}>100°F DB / 74°F WB</strong> (Collin/Denton County) or 99°F (Dallas proper)</li>
            <li style={{ marginBottom: '0.4rem' }}>Winter design temp: <strong style={{ color: '#e2e8f0′ }}>19°F</strong> (1% design condition)</li>
            <li style={{ marginBottom: '0.4rem' }}>These are peak conditions that equipment must handle — not averages</li>
            <li style={{ marginBottom: '0.4rem' }}>South and west orientation add significant cooling load in DFW</li>
            <li>Every square foot of west-facing glass adds ~2× the cooling load of north-facing glass</li>
          </ul>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #ef4444′ }}>
          <div style={{ fontWeight: 'bold', color: '#ef4444', marginBottom: '0.75rem' }}>❌ Why Rule-of-Thumb Fails in DFW</div>
          <p style={{ color: '#94a3b8′ }}>
            The old "1 ton per 500 sq ft" rule was developed for mild climates. In DFW's 100°F design temp with high solar gain, two identical 2,000 sq ft homes can require anywhere from 3 to 5+ tons depending on insulation, orientation, and windows. Oversized equipment short-cycles and fails to dehumidify; undersized equipment runs constantly and never achieves setpoint during heat waves.
          </p>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 'bold', color: '#F5E642', marginBottom: '1rem' }}>🔢 Estimate Your Cooling Load</div>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1rem' }}>This is a simplified estimate only — a certified Manual J calculation considers 40+ inputs. Use this to understand why proper sizing matters.</p>

          {[{ label: 'Home size (sq ft):', items: homeSizes, state: size, set: setSize },
            { label: 'Insulation level:', items: insulations, state: insulation, set: setInsulation },
            { label: 'Window area:', items: windowAreas, state: windows, set: setWindows },
          ].map(({ label, items, state, set }) => (
            <div key={label} style={{ marginBottom: '1rem' }}>
              <div style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>{label}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {items.map(item => (
                  <button key={item} onClick={() => set(item as never)}
                    style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', background: state === item ? '#F5E642′ : '#1e3a5f', color: state === item ? '#0A1628' : '#e2e8f0', fontWeight: state === item ? ’bold' : 'normal' }}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {result && (
          <div style={{ background: '#0f1f3d', borderRadius: '12px', padding: '1.5rem', borderLeft: '4px solid #22c55e' }}>
            <div style={{ fontWeight: 'bold', color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>📊 Load Estimate Results</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Manual J Estimate</div>
                <div style={{ color: '#22c55e', fontSize: '2rem', fontWeight: 'bold' }}>{result.propTons} tons</div>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{Math.round(result.adjusted).toLocaleString()} BTU/hr</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Rule-of-Thumb</div>
                <div style={{ color: '#ef4444', fontSize: '2rem', fontWeight: 'bold' }}>{result.thumbTons} tons</div>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>1 ton per 500 sq ft</div>
              </div>
            </div>
            {result.diff >= 0.5 && (
              <div style={{ background: '#1a0a0a', borderRadius: '8px', padding: '1rem', borderLeft: '3px solid #ef4444′ }}>
                <p style={{ color: '#ef4444', fontWeight: 'bold', marginBottom: '0.25rem' }}>⚠️ {result.diff.toFixed(1)} ton difference!</p>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Rule-of-thumb sizing would result in {''}
                  {parseFloat(result.thumbTons) > parseFloat(result.propTons) ? 'an oversized system that short-cycles and fails to dehumidify' : 'an undersized system that cannot maintain setpoint on hot DFW days'}.
                  A certified Manual J from a licensed DFW contractor is required before purchasing equipment.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
