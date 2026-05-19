import { useState } from 'react';

const seasons = ['North Texas Winter (Dec-Feb)', 'Spring Transition (Mar-May)', 'DFW Summer (Jun-Sep)', 'Fall Transition (Oct-Nov)'];
const symptoms = ['Wood floors cupping or gapping', 'Static electricity everywhere', 'Condensation on windows', 'Musty smell in closets', 'Cracking drywall or trim joints', 'Allergy symptoms worse indoors'];

const advice: Record<string, string> = {
  'North Texas Winter (Dec-Feb)|Static electricity everywhere': 'Classic winter dryness. DFW drops to 20-30% RH in January. Run a whole-house or room humidifier targeting 40-45% RH. Sealed homes with forced-air heating are especially prone.',
  'North Texas Winter (Dec-Feb)|Wood floors cupping or gapping': 'DFW winter air is stripping moisture from your hardwood. Gaps between planks appear as humidity drops below 35%. Humidify to 45% and gaps will naturally close — do not fill gaps with caulk in winter.',
  'DFW Summer (Jun-Sep)|Condensation on windows': 'Indoor humidity too high against cold AC glass. Target 50% RH maximum in DFW summers. Check attic insulation and crawl space vapor barriers. Run bathroom/kitchen exhaust fans longer.',
  'DFW Summer (Jun-Sep)|Musty smell in closets': 'DFW summer humidity feeds mold in dead-air spaces. Check for plumbing leaks first. Add closet dehumidifier or moisture absorbers. Keep interior doors open for air circulation.',
  'Spring Transition (Mar-May)|Wood floors cupping or gapping': 'Spring in DFW brings rapid swings — 40% one week, 70% the next. Cupping means too much moisture absorbed. Allow natural equalization before refinishing. Stable HVAC setpoint helps most.',
  'Fall Transition (Oct-Nov)|Cracking drywall or trim joints': 'Fall dryness in DFW causes wood framing and trim to contract. Hairline cracks at ceiling corners are cosmetic and seasonal. Humidify to 40% to slow the cycle. Repaint in spring after conditions stabilize.',
  'DFW Summer (Jun-Sep)|Allergy symptoms worse indoors': 'High summer humidity in DFW promotes dust mite growth (thrives above 50% RH). Keep AC running to maintain 45-50% RH. Use MERV-13 filters and consider a whole-house dehumidifier if your AC struggles.',
};

const fallback = (s: string, sym: string) =>
  `For ${sym.toLowerCase()} during ${s}: DFW humidity swings between 20% (winter) and 80%+ (summer). Target 45-55% RH year-round. Use a calibrated hygrometer ($15-30) to measure before buying equipment. A whole-house humidifier ($300-600 installed) is the most cost-effective DFW solution.`;

export default function DFWHomeHumidityGuide() {
  const [season, setSeason] = useState('');
  const [symptom, setSymptom] = useState('');
  const [result, setResult] = useState('');

  const analyze = () => {
    if (!season || !symptom) return;
    setResult(advice[`${season}|${symptom}`] || fallback(season, symptom));
  };

  const card = (title: string, items: string[]) => (
    <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.25rem' }}>
      <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>{title}</div>
      <ul style={{ color: '#CBD5E8', paddingLeft: '1.25rem', lineHeight: 1.8, margin: 0 }}>
        {items.map(i => <li key={i}>{i}</li>)}
      </ul>
    </div>
  );

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', marginBottom: '0.25rem' }}>💧 DFW Home Humidity Guide</div>
        <p style={{ color: '#9BACC8', marginBottom: '2rem' }}>Managing humidity swings from 20% in winter to 80%+ in summer</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>DFW Humidity Reality</div>
          <p style={{ color: '#CBD5E8', lineHeight: 1.7, margin: 0 }}>
            DFW sits at the crossroads of continental dry air from the west and Gulf moisture from the south, creating extreme seasonal swings.
            January averages 40-50% outdoor RH but indoor forced-air heating drops homes to 20-25%. July outdoor RH peaks above 80% while
            your AC may overcool and create condensation problems. The sweet spot for home health and human comfort is 45-55% RH year-round.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {card('🥶 Winter: Add Moisture', ['Whole-house humidifier (best value)', 'Ultrasonic room humidifiers', 'Target 40-45% RH in January', 'Wood floors need 45%+ to prevent gaps', 'Keep interior doors open to distribute'])}
          {card('☀️ Summer: Remove Moisture', ['AC naturally dehumidifies — keep it running', 'Supplement with standalone dehumidifier', 'Target 50% RH maximum', 'Exhaust fans in bath/kitchen every use', 'Check attic and crawl space barriers'])}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>🌡️ Humidity Symptom Checker</div>
          <label style={{ color: '#9BACC8', fontSize: '0.85rem', display: 'block', marginBottom: '0.3rem' }}>Current DFW Season</label>
          <select value={season} onChange={e => setSeason(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#162035', color: '#E8EDF5', border: '1px solid #2A3F5F', borderRadius: 8, marginBottom: '0.75rem' }}>
            <option value="">Select season...</option>
            {seasons.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <label style={{ color: '#9BACC8', fontSize: '0.85rem', display: 'block', marginBottom: '0.3rem' }}>What are you experiencing?</label>
          <select value={symptom} onChange={e => setSymptom(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#162035', color: '#E8EDF5', border: '1px solid #2A3F5F', borderRadius: 8, marginBottom: '1rem' }}>
            <option value="">Select symptom...</option>
            {symptoms.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '0.7rem 2rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Get Recommendation</button>
          {result && <div style={{ marginTop: '1rem', background: '#162035', borderRadius: 8, padding: '1rem', color: '#CBD5E8', lineHeight: 1.7, borderLeft: '3px solid #F5E642′ }}>{result}</div>}
        </div>

        <p style={{ color: '#6B7FA3', fontSize: '0.8rem', textAlign: 'center' }}>
          Measure before you buy: a $20 hygrometer prevents over-humidifying or under-humidifying your DFW home.
        </p>
      </div>
    </div>
  );
}
