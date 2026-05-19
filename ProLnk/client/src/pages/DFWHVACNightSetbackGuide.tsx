import { useState } from 'react';

type HomeType = 'Well-insulated (post-2005)' | 'Average insulation (1990-2005)' | 'Older home (pre-1990)' | 'High-ceiling / large volume' | 'Tight modern build (post-2015)';
type Season = 'Summer (Jun-Sep)' | 'Fall Shoulder (Oct-Nov)' | 'Winter (Dec-Feb)' | 'Spring Shoulder (Mar-May)';

const homeTypes: HomeType[] = [
  'Well-insulated (post-2005)',
  'Average insulation (1990-2005)',
  'Older home (pre-1990)',
  'High-ceiling / large volume',
  'Tight modern build (post-2015)',
];

const seasons: Season[] = ['Summer (Jun-Sep)', 'Fall Shoulder (Oct-Nov)', 'Winter (Dec-Feb)', 'Spring Shoulder (Mar-May)'];

interface SetbackResult {
  strategy: string;
  setpoint: string;
  setback: string;
  savings: string;
  warning: string | null;
  color: string;
  explanation: string;
  tips: string[];
}

function getSetbackStrategy(homeType: HomeType, season: Season): SetbackResult {
  if (season === 'Summer (Jun-Sep)') {
    const isOld = homeType.includes('pre-1990');
    const isHighCeil = homeType.includes('High-ceiling');
    if (isOld) {
      return {
        strategy: 'Minimal Setback',
        setpoint: '72-74°F occupied / 76°F setback',
        setback: '2-4°F max',
        savings: '3-6% per degree of setback',
        warning: 'DFW summer nights average 75-80°F — your home will absorb heat overnight. Large setbacks create massive morning recovery loads.',
        color: '#f97316',
        explanation: 'Older DFW homes have poor envelope sealing. Even at midnight, outdoor heat at 78°F continues to infiltrate. Large setbacks mean your AC must work harder in the morning, often negating savings.',
        tips: [
          'Maximum setback of 4°F overnight in summer',
          'Pre-cool to 70°F at 4pm before DFW peak rates (if on TOU plan)',
          'Run ceiling fans — allows 4°F warmer setpoint at same comfort',
          'Check attic insulation — this has biggest impact on summer setback effectiveness',
        ],
      };
    }
    return {
      strategy: 'Moderate Setback',
      setpoint: '72°F occupied / 76-78°F setback',
      setback: '4-6°F overnight',
      savings: '5-8% cooling cost reduction',
      warning: 'DFW nights rarely cool below 72-75°F June-August. Setback beyond 78°F risks humidity buildup.',
      color: '#F5E642',
      explanation: 'DFW summer nights are mild but not cool — typical overnight lows are 75-80°F in July. Unlike northern climates where night cooling is free, DFW setback savings come from reduced runtime, not free cooling.',
      tips: [
        'Keep setback at or below 78°F — higher risks humidity spikes',
        'Schedule return to 72°F at 6:30am before occupants wake',
        'Use variable-speed air handler if available — better dehumidification at part load',
        'Install whole-home dehumidifier if setback causes humidity complaints',
      ],
    };
  }

  if (season === 'Fall Shoulder (Oct-Nov)') {
    return {
      strategy: 'Free Cooling Window',
      setpoint: '70-72°F / 76°F or off setback',
      setback: '6-8°F or turn off overnight',
      savings: '15-25% vs. summer cooling costs',
      warning: null,
      color: '#22c55e',
      explanation: 'October-November nights in DFW commonly drop to 55-65°F. This is DFW\’s best setback season — overnight temperatures may allow free ventilation cooling, especially in well-sealed modern homes.',
      tips: [
        'Consider whole-house fan if well-insulated — brings in 60°F night air',
        'Open windows strategically on 60°F nights to pre-cool thermal mass',
        'Set AC to come on only if indoor temp rises above 76°F overnight',
        'This shoulder season is ideal for HVAC maintenance before winter',
      ],
    };
  }

  if (season === 'Winter (Dec-Feb)') {
    const isTight = homeType.includes('post-2015');
    return {
      strategy: isTight ? 'Aggressive Setback' : 'Standard Setback',
      setpoint: '68-70°F occupied / 62-65°F setback',
      setback: '5-8°F overnight',
      savings: '8-12% heating cost reduction',
      warning: 'DFW winter design temp is 17-19°F. Heat pump auxiliary heat kicks in below ~35°F outdoor — setback during cold snaps can trigger electric resistance strips (expensive).',
      color: '#3b82f6',
      explanation: 'DFW winters are mild but unpredictable. Most homes can benefit from 5-7°F overnight setback. However, when cold fronts push temps below 35°F, heat pumps rely on electric resistance backup — avoid aggressive setbacks during these periods.',
      tips: [
        'Program 62-65°F setback on mild nights (40°F+ outdoor)',
        'Reduce setback to 65°F min when temps below 32°F forecast',
        'Check aux heat runtime — excessive aux heat signals undersized heat pump',
        'North Texas "blue northers" drop temp 30°F in hours — smart thermostat helps adapt',
      ],
    };
  }

  return {
    strategy: 'Opportunity Setback',
    setpoint: '70°F occupied / 74-76°F or off setback',
    setback: 'Variable — follow weather',
    savings: '10-20% vs. peak summer costs',
    warning: null,
    color: '#22c55e',
    explanation: 'Spring in DFW (March-May) is highly variable — 80°F days and 45°F nights are both possible. Use a smart thermostat to follow actual conditions rather than fixed schedules.',
    tips: [
      'Use smart thermostat with weather-based setback for spring variability',
      'Spring is ideal for HVAC tune-up before summer demand',
      'Check refrigerant charge in spring — catches low-charge issues before 100°F days',
      'Humidity can spike in spring — monitor indoor RH, keep below 55%',
    ],
  };
}

export default function DFWHVACNightSetbackGuide() {
  const [homeType, setHomeType] = useState<HomeType | ''>('');
  const [season, setSeason] = useState<Season | ''>('');

  const result = homeType && season ? getSetbackStrategy(homeType as HomeType, season as Season) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌙 DFW HVAC Night Setback Guide</div>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
            Night setback strategies that work in Chicago or Denver often backfire in DFW. With summer nights that rarely cool below 75°F and humidity that persists after dark, setback in North Texas requires a DFW-specific approach.
          </p>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontWeight: 'bold', color: '#F5E642', marginBottom: '0.75rem' }}>🌡️ DFW vs. Northern Climates: The Key Difference</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Northern Climates</div>
              <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>Summer nights drop to 55-65°F. Large setbacks make sense — free cooling builds up all night. 10°F setback is common and effective.</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontSize: '0.8rem', marginBottom: '0.5rem' }}>DFW Reality</div>
              <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>Summer nights stay 75-80°F with 70°F dewpoints. Setback only helps if the building holds heat. Large setbacks risk humidity spikes and morning load surges.</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 'bold', color: '#F5E642', marginBottom: '1rem' }}>🔍 Get Your Setback Strategy</div>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>Home type:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {homeTypes.map(h => (
                <button key={h} onClick={() => setHomeType(h)}
                  style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', background: homeType === h ? '#F5E642′ : '#1e3a5f', color: homeType === h ? '#0A1628' : '#e2e8f0', fontWeight: homeType === h ? ’bold' : 'normal' }}>
                  {h}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>Season:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {seasons.map(s => (
                <button key={s} onClick={() => setSeason(s)}
                  style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', background: season === s ? '#F5E642′ : '#1e3a5f', color: season === s ? '#0A1628' : '#e2e8f0', fontWeight: season === s ? ’bold' : 'normal' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {result && (
          <div style={{ background: '#0f1f3d', borderRadius: '12px', padding: '1.5rem', borderLeft: `4px solid ${result.color}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontWeight: 'bold', color: '#e2e8f0′ }}>Strategy:</span>
              <span style={{ background: result.color, color: '#0A1628', padding: '0.25rem 0.75rem', borderRadius: '999px', fontWeight: 'bold' }}>{result.strategy}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
              {[{ label: 'Setpoint Range', value: result.setpoint },
                { label: 'Max Setback', value: result.setback },
                { label: 'Est. Savings', value: result.savings }].map(card => (
                <div key={card.label} style={{ background: '#0A1628', borderRadius: '8px', padding: '0.75rem', textAlign: 'center' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.7rem', marginBottom: '0.25rem' }}>{card.label}</div>
                  <div style={{ color: result.color, fontSize: '0.9rem', fontWeight: 'bold' }}>{card.value}</div>
                </div>
              ))}
            </div>
            <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.9rem' }}>{result.explanation}</p>
            {result.warning && (
              <div style={{ background: '#1a1000', borderRadius: '8px', padding: '0.75rem', marginBottom: '1rem', borderLeft: '3px solid #f97316′ }}>
                <p style={{ color: '#fdba74', fontSize: '0.875rem' }}>⚠️ {result.warning}</p>
              </div>
            )}
            <div style={{ color: '#F5E642', fontWeight: 'bold', marginBottom: '0.5rem' }}>💡 DFW-Specific Tips:</div>
            <ul style={{ color: '#94a3b8', paddingLeft: '1.5rem' }}>
              {result.tips.map((tip, i) => <li key={i} style={{ marginBottom: '0.25rem' }}>{tip}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
