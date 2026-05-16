import { useState } from 'react';

const spaces = ['Small Patio/Deck (<300 sqft)', 'Large Patio/Pool Area (300-800 sqft)', 'Backyard Entertaining Area (800+ sqft)', 'Covered Pergola/Outdoor Room', 'Front Porch'];
const priorities = ['Background Music Only', 'Party/Entertaining Volume', 'Fill Large Open Space', 'TV/Movie Sound Outdoors'];
const sunExposures = ['Full Shade (covered patio)', 'Partial Sun (morning/evening only)', 'Full Sun (no shade)'];

function getRecommendation(space: string, priority: string, sun: string) {
  const dfwWarning = 'DFW Alert: Indoor speakers placed outside fail within 1 season from 110°F heat + rain humidity cycling.';
  if (sun === 'Full Sun (no shade)') {
    return {
      rec: 'Polk Audio Atrium Series or Klipsch AW-650',
      type: 'Wired with UV-rated housing',
      placement: 'Mount in highest sun exposure — these are rated for 120°F+ direct sun',
      cost: '$200-500/pair',
      warning: dfwWarning + ' Full-sun DFW exposure: only use IP56+ rated speakers with UV-stabilized housing.',
      note: 'Wireless outdoor speakers with batteries fail in full DFW sun — heat kills batteries and degrades Bluetooth range.',
    };
  }
  if (priority === 'Party/Entertaining Volume' || priority === 'Fill Large Open Space') {
    return {
      rec: 'Klipsch AW-650 (wired) or Sonance Patio Series',
      type: 'Wired outdoor rated',
      placement: 'Place 8-10ft high on eaves or posts, angle 15° down, aim across entertaining space not at listening spot',
      cost: '$400-900/pair + amplifier $200-400',
      warning: 'DFW: Wireless outdoor audio systems fail in summer heat — Bluetooth range drops 30%+ at 100°F. Always wire for permanent installs.',
      note: 'Volume for DFW outdoor entertaining: need 90dB+ sensitivity rating to overcome ambient AC unit noise + road noise.',
    };
  }
  if (space.includes('Front Porch')) {
    return {
      rec: 'Polk Audio Atrium 4 or OSD Audio AP640',
      type: 'Wired, compact mount',
      placement: 'Under eave, angled down toward seating — protect from DFW afternoon west sun',
      cost: '$120-280/pair',
      warning: dfwWarning,
      note: 'Front porch gets full afternoon west sun in DFW — choose UV-rated housing even if partially shaded.',
    };
  }
  return {
    rec: sun.includes('Shade') ? 'Sonos Era 300 Outdoor or Yamaha NS-AW294' : 'Polk Audio Atrium 8 SDI',
    type: priority === 'Background Music Only' ? 'Wireless (covered location only)' : 'Wired outdoor rated',
    placement: 'Mount at ear level + 4ft (7-8ft height), aim across space, keep out of direct summer sun',
    cost: priority === 'Background Music Only' ? '$150-350' : '$300-700/pair',
    warning: dfwWarning,
    note: 'Covered patios can use wireless — but avoid leaving wireless speakers in summer heat even covered.',
  };
}

export default function DFWOutdoorSpeakerGuide() {
  const [space, setSpace] = useState('');
  const [priority, setPriority] = useState('');
  const [sun, setSun] = useState('');
  const [result, setResult] = useState<{ rec: string; type: string; placement: string; cost: string; warning: string; note: string } | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🔊☀️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Outdoor Speaker Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW's combination of 110°F summer heat, intense UV, and sudden severe storms destroys the wrong outdoor speakers in one season.
          This guide helps you choose speakers that survive North Texas conditions.
        </p>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '12px 16px', marginBottom: 32, fontWeight: 600 }}>
          ☀️ DFW Rule: Never put indoor speakers outside. Never use wireless outdoor speakers in full sun. Wired = always more reliable in DFW heat.
        </div>

        <div style={{ display: 'grid', gap: 20, marginBottom: 28 }}>
          {[
            { label: 'Outdoor Space Size', value: space, setter: setSpace, options: spaces },
            { label: 'Music Priority', value: priority, setter: setPriority, options: priorities },
            { label: 'DFW Sun Exposure', value: sun, setter: setSun, options: sunExposures },
          ].map(field => (
            <div key={field.label}>
              <label style={{ color: '#F5E642', display: 'block', marginBottom: 8, fontWeight: 600 }}>{field.label}</label>
              <select value={field.value} onChange={e => field.setter(e.target.value)}
                style={{ width: '100%', padding: '12px', background: '#1E2D45', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15 }}>
                <option value=''>Select...</option>
                {field.options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>

        <button onClick={() => { if (space && priority && sun) setResult(getRecommendation(space, priority, sun)); }}
          style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginBottom: 32, width: '100%' }}>
          🔊 Get DFW Speaker Recommendation
        </button>

        {result && (
          <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 20 }}>Recommended: {result.rec}</h3>
            {[{ label: '📦 Speaker Type', value: result.type }, { label: '📍 DFW Placement', value: result.placement }, { label: '💰 Cost Range', value: result.cost }, { label: '💡 Pro Note', value: result.note }].map(item => (
              <div key={item.label} style={{ marginBottom: 16, borderLeft: '3px solid #F5E642', paddingLeft: 16 }}>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: '#CBD5E1', lineHeight: 1.5 }}>{item.value}</div>
              </div>
            ))}
            <div style={{ background: '#F5E64220', border: '1px solid #F5E642', borderRadius: 8, padding: 12, color: '#F5E642', fontSize: 14, marginTop: 8 }}>
              ⚠️ {result.warning}
            </div>
          </div>
        )}

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 16 }}>🌡️ DFW Outdoor Audio Survival Rules</h3>
          {['Wired speakers last 10+ years in DFW — wireless outdoor speakers average 2-3 years', 'IP55+ minimum rating — DFW hail can puncture basic weatherproof housings', 'UV-stabilized housing — cheap plastic speakers yellow and crack within 2 DFW summers', 'Avoid leaving wireless speakers out during DFW winter ice storms — cold snaps crack housing', 'Volume rule: outdoors needs 2x the wattage of comparable indoor setup due to open air'].map((tip, i) => (
            <div key={i} style={{ color: '#CBD5E1', marginBottom: 10, paddingLeft: 16, borderLeft: '2px solid #F5E642', lineHeight: 1.5 }}>{tip}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
