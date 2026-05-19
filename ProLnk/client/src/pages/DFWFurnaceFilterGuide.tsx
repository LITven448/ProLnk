import { useState } from 'react';

const FILTER_TYPES = [
  { label: 'Basic Fiberglass (MERV 1-4)', value: 'basic', cost: '$1-5′ },
  { label: 'Pleated (MERV 8-11)', value: 'pleated', cost: '$8-20′ },
  { label: 'High-Efficiency (MERV 13-16)', value: 'high', cost: '$20-50′ },
];

const SEASONS = [
  { label: 'DFW Summer (Jun–Sep)', value: 'summer' },
  { label: 'DFW Spring/Fall (Oct–May)', value: 'mild' },
  { label: 'DFW Winter (Dec–Feb)', value: 'winter' },
];

const RECS: Record<string, Record<string, string>> = {
  basic: {
    summer: 'Replace every 30 days. DFW AC runs almost 24/7 in summer — basic filters clog fast and spike energy bills.',
    mild: 'Replace every 60 days. Moderate use, but pollen season (spring) can shorten life to 45 days.',
    winter: 'Replace every 90 days. DFW furnaces rarely run long enough to clog basic filters — check monthly anyway.',
  },
  pleated: {
    summer: 'Replace every 45 days. Pleated filters handle DFW dust and humidity better, but still need frequent summer swaps.',
    mild: 'Replace every 90 days. Good balance for DFW shoulder seasons. Change before summer AC season starts.',
    winter: 'Replace every 4–6 months. Furnace-only use is minimal in DFW — inspect and replace before switching back to AC.',
  },
  high: {
    summer: 'Replace every 60 days. MERV 13+ captures fine particles but restricts airflow — critical to not exceed 60 days in DFW summer.',
    mild: 'Replace every 90–120 days. High-efficiency filters work well in DFW spring/fall shoulder seasons.',
    winter: 'Replace every 6 months. Furnace use so low in DFW that these filters rarely clog from heating alone.',
  },
};

export default function DFWFurnaceFilterGuide() {
  const [filterType, setFilterType] = useState('');
  const [season, setSeason] = useState('');

  const rec = filterType && season ? RECS[filterType][season] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F0FE', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🔥</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          DFW Furnace & AC Filter Guide
        </h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, lineHeight: 1.6 }}>
          In DFW, your furnace and AC share the same filter — one combined system. Because DFW winters are short and mild,
          furnace use is minimal and filters last longer in heating mode. But neglecting a swap before summer is a costly mistake.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚙️ Why DFW Is Different</h2>
          <ul style={{ color: '#94A3B8', lineHeight: 2, paddingLeft: 20 }}>
            <li>DFW averages only 30–40 heating days per year — filter wear from furnace use is minimal</li>
            <li>AC runs 5–6 months of high-intensity use, burning through filters fast</li>
            <li>DFW dust, pollen, and humidity shorten filter life versus dry climates</li>
            <li>A clogged filter entering summer strains the compressor and raises energy bills 15–20%</li>
          </ul>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>📅 Get Your Replacement Schedule</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94A3B8', display: 'block', marginBottom: 8 }}>Filter Type</label>
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              style={{ width: '100%', background: '#0A1628', color: '#E8F0FE', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}
            >
              <option value="">Select filter type…</option>
              {FILTER_TYPES.map(f => (
                <option key={f.value} value={f.value}>{f.label} — {f.cost}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94A3B8', display: 'block', marginBottom: 8 }}>Current DFW Season</label>
            <select
              value={season}
              onChange={e => setSeason(e.target.value)}
              style={{ width: '100%', background: '#0A1628', color: '#E8F0FE', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}
            >
              <option value="">Select season…</option>
              {SEASONS.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
          {rec && (
            <div style={{ background: '#F5E642', borderRadius: 8, padding: 16, marginTop: 8 }}>
              <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, marginBottom: 4 }}>📋 Recommendation</div>
              <div style={{ color: '#0A1628', lineHeight: 1.6 }}>{rec}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>✅ Pro Tips for DFW Homeowners</h2>
          <ul style={{ color: '#94A3B8', lineHeight: 2, paddingLeft: 20 }}>
            <li>Change your filter in <strong style={{ color: '#E8F0FE' }}>late May</strong> before heavy AC season every year</li>
            <li>Write the install date on the filter edge with a marker</li>
            <li>MERV 8–11 pleated is the best value for most DFW homes</li>
            <li>Never run the system without a filter — DFW dust will coat the coil in days</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
