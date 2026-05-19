import { useState } from 'react';

export default function DFWRoofingEarlyWarning2026() {
  const [sign, setSign] = useState('');
  const [diagnosis, setDiagnosis] = useState('');

  const diagnoses: Record<string, string> = {
    granules: 'Granules in gutters are asphalt shingle fragments — they protect shingles from UV. Heavy granule loss means shingles are nearing end of life. Measure: a handful per downspout after rain = normal; a cup or more = accelerated wear. Schedule inspection to assess remaining life and plan replacement timing before a DFW storm forces an emergency decision.',
    daylight: 'Slight daylight visible in attic corners = flashing has separated from the roof deck or wall. Flashing is the metal strip sealing roof-to-wall junctions (dormers, chimneys, skylights). Even a 1/8 inch gap is enough for water intrusion during heavy DFW rain. This is a repair — not a replacement — if caught early. Call ProLnk for a flashing re-seal.',
    sagging_attic: 'Sagging spots in attic ceiling = moisture has saturated the sheathing or insulation. This means water has been entering for multiple rain cycles. Probe the sagging area — if soft or disintegrating, the sheathing underneath has failed. Scope of damage determines repair vs. partial replacement. Call ProLnk within the week — next rain cycle worsens this geometrically.',
    dark_streaks: 'Dark streaks on shingles = Gloeocapsa magma algae. In DFW, algae indicates moisture retention in shingles — they’re staying wet longer than they should. Algae itself doesn’t destroy shingles, but sustained moisture does. Zinc or copper strip at the ridge slows growth. Soft-wash treatment removes it without high-pressure damage. Algae-resistant shingles at next replacement.',
    moss: 'Moss on shingles is more serious than algae — moss physically lifts shingle edges with root structures, allowing wind and rain infiltration underneath. DFW moss = north-facing shaded areas. Remove manually + treat with moss killer. Install copper strip at ridge for long-term prevention. Check lifted edges for cracking or brittleness.',
    sagging_ridge: 'Sagging ridge line = structural issue with the ridge board or rafter framing below, not just a shingle problem. This is a roofing and structural concern. Do not walk the roof. Call ProLnk for an attic inspection of the ridge board and rafters. Catching this early means wood repair vs. major structural reconstruction.',
  };

  function diagnose() {
    if (!sign) return;
    setDiagnosis(diagnoses[sign] || 'Select a warning sign for diagnosis.');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🏚️</div>
        <h1 style={{ color: '#F5E642', fontSize: 26, marginBottom: 4 }}>DFW Roofing Early Warning Signs 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>Catch DFW roof problems before they become $15,000+ emergency replacements</p>

        {[
          { emoji: '🪣', sign: 'Granules in gutters', window: '6-24 months before failure' },
          { emoji: '☀️', sign: 'Daylight in attic corners', window: 'Repair now — next rain = damage' },
          { emoji: '📉', sign: 'Sagging attic ceiling spots', window: 'Active moisture intrusion' },
          { emoji: '🌑', sign: 'Dark streaks on shingles', window: 'Treat now, replace at end of life' },
          { emoji: '🌿', sign: 'Moss growing on shingles', window: 'Lifts edges — repair before storm' },
          { emoji: '〰️', sign: 'Sagging ridge line', window: 'Structural — inspect immediately' },
        ].map((item) => (
          <div key={item.sign} style={{ background: '#0f2040', borderRadius: 10, padding: '12px 18px', marginBottom: 8, display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ fontSize: 20 }}>{item.emoji}</span>
              <div style={{ color: '#e2e8f0', fontSize: 15 }}>{item.sign}</div>
            </div>
            <div style={{ color: '#F5E642', fontSize: 12, textAlign: 'right', maxWidth: 160 }}>{item.window}</div>
          </div>
        ))}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 22, marginTop: 28 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>🔍 Warning Sign → Diagnosis + Action</div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13 }}>What warning sign do you see?</label>
            <select value={sign} onChange={(e) => setSign(e.target.value)}
              style={{ display: 'block', marginTop: 6, width: '100%', background: '#1e3a5f', color: '#fff', border: '1px solid #2d5a8e', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select warning sign</option>
              <option value="granules">Granules accumulating in gutters</option>
              <option value="daylight">Daylight visible in attic corners</option>
              <option value="sagging_attic">Sagging spots in attic ceiling</option>
              <option value="dark_streaks">Dark streaks on shingles</option>
              <option value="moss">Moss growing on shingles</option>
              <option value="sagging_ridge">Sagging or uneven ridge line</option>
            </select>
          </div>
          <button onClick={diagnose}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 24px', fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Diagnose This Sign
          </button>
          {diagnosis && <div style={{ marginTop: 16, background: '#162d4a', borderRadius: 8, padding: 16, color: '#e2e8f0', fontSize: 14, lineHeight: 1.6 }}>{diagnosis}</div>}
        </div>
      </div>
    </div>
  );
}