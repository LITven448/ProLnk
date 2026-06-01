import { useState } from 'react';

const roseData: Record<string, { varieties: string[]; schedule: string; diseasePrevention: string }> = {
  'knockout-sunny': {
    varieties: ['🌹 Knock Out® Red (virtually indestructible in DFW)', '🌸 Double Knock Out® Pink (reblooms all summer)', '🌺 Rainbow Knock Out® (multi-color, deer resistant)', '🌷 Sunny Knock Out® (yellow, heat tolerant)'],
    schedule: 'Feb 14 (Valentine’s Day): prune to 18 inches. Mar–Nov: fertilize every 6 weeks. Deadhead optional on Knock Out. Water 2x/week in summer.',
    diseasePrevention: 'Knock Out® roses bred for blackspot resistance — minimal spray needed. Monitor for Rose Rosette Disease (RRD) — spread by mites. Remove and destroy infected plants immediately.',
  },
  'knockout-partial': {
    varieties: ['🌹 Knock Out® Blushing (best in partial shade)', '🌸 Carefree Wonder (shade tolerant)', '🌺 Nearly Wild Rose (spreading, low maintenance)', '🌷 Meidiland varieties (groundcover type)'],
    schedule: 'Partial shade slows rebloom cycles. Prune Feb 14. Fertilize Apr, June, Aug. Water 3x/week — less evaporation than full sun but still needs consistency.',
    diseasePrevention: 'More shade = more fungal risk. Improve air circulation by not overcrowding. Avoid evening watering. Copper fungicide spray monthly May–Oct as preventive.',
  },
  'hybrid-sunny': {
    varieties: ['🌹 Mr. Lincoln (classic red, DFW proven)', '🌸 Double Delight (red/white bicolor, fragrant)', '🌺 Peace Rose (iconic yellow-pink blend)', '🌷 Mister President (coral-red, heat tolerant)'],
    schedule: 'Feb 14: prune hybrid teas to knee height. Fertilize every 4 weeks Mar–Oct. Spray fungicide every 7-14 days. Deep water 3x/week. Deadhead every bloom cycle.',
    diseasePrevention: 'Hybrid teas are blackspot magnets in DFW humidity. Weekly fungicide spray non-negotiable (Daconil or Banner Maxx). Remove fallen leaves immediately. Plant 4 ft apart minimum for airflow.',
  },
  'hybrid-partial': {
    varieties: ['🌹 Queen Elizabeth (climber, more shade tolerant)', '🌸 Camelot (David Austin — partial ok)', '🌺 Falstaff (English rose — tolerates shade)', '🌷 The Prince (deep crimson, some shade ok)'],
    schedule: 'English/Austin roses need more water in DFW heat. Deep water every other day in summer. Fertilize monthly Mar–Sept. Mulch 4 inches around base. Prune lightly in Feb.',
    diseasePrevention: 'English roses: susceptibility varies by variety. Deadhead diligently to reduce fungal spore sites. Neem oil spray monthly as organic option. Avoid wetting foliage when watering.',
  },
};

const typeOptions = ['knockout-sunny', 'knockout-partial', 'hybrid-sunny', 'hybrid-partial'];
const typeLabels: Record<string, string> = {
  'knockout-sunny': 'Knock Out® Roses — Full Sun',
  'knockout-partial': 'Knock Out® Roses — Partial Shade',
  'hybrid-sunny': 'Hybrid Tea Roses — Full Sun',
  'hybrid-partial': 'English/Austin Roses — Partial Shade',
};

export default function DFWRoseBushGuide() {
  const [roseType, setRoseType] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const result = submitted && roseType ? roseData[roseType] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌹</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Rose Bush Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>DFW is rose country. With the right variety and care calendar, you can have blooms March through December.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 17, color: '#F5E642', marginBottom: 16 }}>🌹 DFW Rose Growing Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '🏆', label: 'Top Choice', val: 'Knock Out® roses — bred for Southern heat and humidity' },
              { icon: '📅', label: 'Prune Date', val: 'Feb 14 (Valentine’s Day) — DFW rule of thumb' },
              { icon: '🦠', label: 'Main Threat', val: 'Blackspot fungus — worse in DFW humidity' },
              { icon: '⚠️', label: 'New Threat', val: 'Rose Rosette Disease — remove infected plants fast' },
            ].map((f) => (
              <div key={f.label} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 22 }}>{f.icon}</div>
                <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 600 }}>{f.label}</div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>{f.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 17, color: '#F5E642', marginBottom: 16 }}>🔍 Find Your Rose Match</h2>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#94a3b8' }}>Select rose type and yard conditions:</label>
          <select value={roseType} onChange={(e) => { setRoseType(e.target.value); setSubmitted(false); }} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 14, marginBottom: 16 }}>
            <option value="">-- Choose your rose situation --</option>
            {typeOptions.map((o) => <option key={o} value={o}>{typeLabels[o]}</option>)}
          </select>
          <button onClick={() => setSubmitted(true)} disabled={!roseType} style={{ width: '100%', padding: '12px', background: roseType ? '#F5E642' : '#1e3a5f', color: roseType ? '#0A1628' : '#4a6080', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 15, cursor: roseType ? 'pointer' : 'not-allowed' }}>
            Show My Rose Care Plan 🌹
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontSize: 17, color: '#F5E642', marginBottom: 16 }}>✅ Best Roses for Your DFW Yard</h2>
            <div style={{ marginBottom: 16 }}>
              {result.varieties.map((v) => <div key={v} style={{ background: '#0A1628', borderRadius: 8, padding: 10, marginBottom: 8, fontSize: 14 }}>{v}</div>)}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 12 }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>📅 DFW Care Schedule</div>
              <div style={{ fontSize: 13, color: '#94a3b8' }}>{result.schedule}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>🛡️ Disease Prevention</div>
              <div style={{ fontSize: 13, color: '#94a3b8' }}>{result.diseasePrevention}</div>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', color: '#4a6080', fontSize: 12 }}>
          ProLnk — DFW Home & Garden Intelligence
        </div>
      </div>
    </div>
  );
}
