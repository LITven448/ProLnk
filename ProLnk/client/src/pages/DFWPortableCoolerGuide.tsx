import { useState } from 'react';

export default function DFWPortableCoolerGuide() {
  const [situation, setSituation] = useState('');
  const [humidity, setHumidity] = useState('');
  const [result, setResult] = useState<null | { option: string; rating: string; limitations: string; cost: string; recommendation: string }>(null);

  function calculate() {
    if (!situation || !humidity) return;
    let option: string;
    let rating: string;
    let limitations: string;
    let cost: string;
    let recommendation: string;

    const highHumidity = humidity === 'high' || humidity === 'moderate';

    if (situation === 'renovation') {
      option = 'Portable AC Unit (with window exhaust kit)';
      rating = highHumidity ? '⭐⭐⭐⭐ Excellent for DFW construction' : '⭐⭐⭐⭐ Good choice';
      limitations = 'Requires window or door exhaust opening. Generates significant heat out the exhaust — plan duct routing carefully. Consumes 900–1,500W.';
      cost = '$350–$700 for 12,000–14,000 BTU unit. Rental available at Sunbelt or United Rentals.';
      recommendation = 'Portable AC is your best bet for DFW renovation cooling. Swamp coolers are ineffective in DFW humidity. Industrial fans help but do not cool — only circulate.';
    } else if (situation === 'rental-no-window') {
      option = 'Portable AC + Ventless Exhaust Adapter or Through-Wall Vent';
      rating = '⭐⭐⭐ Good — with proper exhaust';
      limitations = 'Without exhaust, portable ACs recirculate hot condensate air and lose 30–40% efficiency. Must find an exhaust path.';
      cost = '$400–$800. Through-wall install adds $200–$500 from a handyman.';
      recommendation = 'Do not use a portable AC without exhaust in DFW heat — it will barely keep up. Install a through-wall vent or use a casement window adapter.';
    } else if (situation === 'outdoor-patio') {
      option = 'Misting Fan System';
      rating = highHumidity ? '⭐⭐ Limited in DFW humidity' : '⭐⭐⭐ Decent on lower humidity days';
      limitations = 'DFW summer relative humidity is 50–75% — evaporative cooling is marginal. Misting fans work best below 40% RH. In Dallas July/August they mostly just wet you.';
      cost = '$80–$300 for portable misting fan. $500–$2,000 for installed patio misting system.';
      recommendation = 'For outdoor DFW patios, a large industrial fan moves air and feels cooling even if it does not lower temperature. Shade is more effective than misting in high-humidity DFW summers.';
    } else {
      option = 'Swamp Cooler (Evaporative Cooler)';
      rating = '⭐ NOT Recommended for DFW';
      limitations = 'Evaporative coolers work by adding humidity to cool air. DFW summer humidity (50–80%) makes this completely ineffective — you will add moisture and feel hotter.';
      cost = '$150–$500 for portable unit — money wasted in DFW climate.';
      recommendation = 'Do not use evaporative/swamp coolers in DFW. They are designed for dry climates like Phoenix or Denver. In DFW they make conditions worse by raising indoor humidity.';
    }

    setResult({ option, rating, limitations, cost, recommendation });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', marginBottom: '0.5rem' }}>🌬️ DFW Portable Cooling Guide</div>
        <p style={{ color: '#aaa', marginBottom: '2rem' }}>Not all portable cooling works in DFW. Swamp coolers fail in our humidity. Here's what actually works — and what to avoid — in North Texas heat.</p>

        <div style={{ background: '#ff2a2a20', border: '1px solid #f87', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#f87', fontWeight: 700, marginBottom: '0.75rem' }}>🚫 DFW Swamp Cooler Warning</div>
          <p style={{ color: '#ccc', margin: 0 }}>
            Evaporative coolers (swamp coolers) are <strong>designed for dry climates</strong> like Phoenix or El Paso. In DFW, summer humidity averages 60–75%. Adding more moisture to already-humid air does not cool — it makes you feel hotter and raises indoor RH above comfort levels. Do not buy a swamp cooler for DFW use.
          </p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>✅ What Actually Works in DFW</div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              ['Portable AC Units', 'The only portable option that truly cools in DFW humidity. Requires exhaust — single-hose loses efficiency, dual-hose is better. 10,000–14,000 BTU handles a typical room.'],
              ['Industrial Fans', 'Do not lower temperature but move air effectively. Ceiling fans or box fans combined with a portable AC maximize coverage. Critical for DFW construction sites.'],
              ['Misting Systems', 'Work marginally in DFW for outdoor patios on lower-humidity days (spring/fall). In peak summer (July–Sept) effectiveness is limited by 65–80% RH.'],
              ['Spot Coolers (Rental)', 'Industrial portable ACs available from Sunbelt Rentals and United Rentals. Ideal for DFW construction, events, or temporary cooling during HVAC outages.'],
            ].map(([option, detail]) => (
              <div key={option} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 600 }}>✅ {option}</div>
                <div style={{ color: '#aaa', fontSize: '0.9rem', marginTop: 4 }}>{detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🧮 Cooling Option Recommender</div>
          <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#aaa', fontSize: '0.9rem' }}>Cooling Situation</label>
              <select value={situation} onChange={e => setSituation(e.target.value)}
                style={{ width: '100%', marginTop: 6, padding: '0.6rem', borderRadius: 6, border: '1px solid #334', background: '#0A1628', color: '#fff' }}>
                <option value="">Select your situation</option>
                <option value="renovation">Construction / Renovation site</option>
                <option value="rental-no-window">Rental room without central AC</option>
                <option value="outdoor-patio">Outdoor patio / covered area</option>
                <option value="swamp-considering">Considering a swamp / evaporative cooler</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#aaa', fontSize: '0.9rem' }}>Typical DFW Humidity Level You Experience</label>
              <select value={humidity} onChange={e => setHumidity(e.target.value)}
                style={{ width: '100%', marginTop: 6, padding: '0.6rem', borderRadius: 6, border: '1px solid #334', background: '#0A1628', color: '#fff' }}>
                <option value="">Select humidity</option>
                <option value="high">High — it feels muggy most summer days</option>
                <option value="moderate">Moderate — some humid days, some drier days</option>
                <option value="low">Lower — mostly dry (unusual for DFW)</option>
              </select>
            </div>
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Get My Cooling Recommendation
          </button>
          {result && (
            <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🎯 Your Recommendation</div>
              <div style={{ color: '#fff', fontWeight: 600, marginBottom: 4 }}>Best Option: {result.option}</div>
              <div style={{ color: '#F5E642', marginBottom: 6 }}>Effectiveness: {result.rating}</div>
              <div style={{ color: '#f87', fontSize: '0.9rem', marginBottom: 4 }}><strong>Limitations:</strong> {result.limitations}</div>
              <div style={{ color: '#4f4', fontSize: '0.9rem', marginBottom: 8 }}><strong>Cost:</strong> {result.cost}</div>
              <div style={{ color: '#aaa', fontSize: '0.9rem' }}>{result.recommendation}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
