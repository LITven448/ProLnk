import { useState } from 'react';

export default function DFWFoundationSoilTestGuide2026() {
  const [location, setLocation] = useState('');
  const [result, setResult] = useState<{ soil: string; pi: string; risk: string; tip: string } | null>(null);

  const soilData: Record<string, { soil: string; pi: string; risk: string; tip: string }> = {
    dallas: { soil: 'Ferris/Houston Clay', pi: 'PI 35-50', risk: 'Very High', tip: 'Monitor foundation quarterly. Maintain consistent soil moisture 18" from foundation year-round.' },
    fortworth: { soil: 'Black Waxy Clay (Blackland Prairie)', pi: 'PI 40-60', risk: 'Extreme', tip: 'Install soaker hose system. Fort Worth clay is among most expansive in DFW — foundation movement expected.' },
    plano: { soil: 'Silty Clay Loam', pi: 'PI 25-35', risk: 'High', tip: 'Plano transitions from clay to loam northward. Test your specific lot — PI varies significantly block to block.' },
    frisco: { soil: 'Sandy Loam / Limestone Mix', pi: 'PI 10-20', risk: 'Moderate', tip: 'Northern Frisco sits on limestone. Less expansion risk but watch for differential settlement at soil transitions.' },
    irving: { soil: 'Austin Chalk / Black Clay Mix', pi: 'PI 30-45', risk: 'High', tip: 'Irving sits on chalk-clay interface. Drainage critical — water pooling triggers rapid expansion cycles.' },
    mckinney: { soil: 'Blackland Prairie Clay', pi: 'PI 40-55', risk: 'Very High', tip: 'McKinney is classic Blackland Prairie. Seasonal shrink-swell cycle is severe — foundation maintenance is ongoing.' },
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Soil Test Guide 2026</h1>
        <p style={{ color: '#8899aa', marginBottom: 32 }}>
          Understanding DFW expansive clay soils — the #1 driver of foundation movement in North Texas.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 32 }}>
          {[
            { icon: '🟤', label: 'Plasticity Index', desc: 'Measures soil expansion potential. PI > 30 = high risk in DFW.' },
            { icon: '🌧️', label: 'Shrink-Swell Cycle', desc: 'DFW soils expand 20-30% when wet, contract when dry — every season.' },
            { icon: '🔬', label: 'Soil Testing', desc: 'Geotechnical lab test: ~$300-800. Worth it before major foundation repair.' },
          ].map((c) => (
            <div key={c.label} style={{ background: '#132240', borderRadius: 12, padding: '18px' }}>
              <div style={{ fontSize: 26, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4, fontSize: 14 }}>{c.label}</div>
              <div style={{ color: '#8899aa', fontSize: 13 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132240', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>DFW Location → Soil Profile</div>
          <select
            value={location}
            onChange={(e) => { setLocation(e.target.value); setResult(soilData[e.target.value] || null); }}
            style={{ width: '100%', padding: '12px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #F5E642', marginBottom: 12, fontSize: 15 }}
          >
            <option value="">Select your DFW city...</option>
            <option value="dallas">Dallas</option>
            <option value="fortworth">Fort Worth</option>
            <option value="plano">Plano</option>
            <option value="frisco">Frisco</option>
            <option value="irving">Irving</option>
            <option value="mckinney">McKinney</option>
          </select>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div><div style={{ color: '#8899aa', fontSize: 12 }}>SOIL TYPE</div><div style={{ fontWeight: 700, color: '#F5E642' }}>{result.soil}</div></div>
                <div><div style={{ color: '#8899aa', fontSize: 12 }}>PLASTICITY INDEX</div><div style={{ fontWeight: 700 }}>{result.pi}</div></div>
                <div><div style={{ color: '#8899aa', fontSize: 12 }}>EXPANSION RISK</div><div style={{ fontWeight: 700, color: result.risk === 'Extreme' ? '#ff4444' : result.risk === 'Very High' ? '#ff8800' : '#ffcc00' }}>{result.risk}</div></div>
              </div>
              <div style={{ color: '#cdd9e5', fontSize: 14, borderTop: '1px solid #1e3a5f', paddingTop: 12 }}>{result.tip}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#132240', borderRadius: 12, padding: '20px', marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Soil Moisture Monitoring Tips</div>
          {['Install soil moisture meter at 3 depths: 6", 12", 18" from surface', 'Target: consistent moisture year-round (not too wet, not too dry)', 'Soaker hose 18-24" from foundation perimeter during dry spells', 'Avoid planting large trees within 20 ft of foundation'].map((tip) => (
            <div key={tip} style={{ display: 'flex', gap: 10, marginBottom: 8, color: '#cdd9e5', fontSize: 14 }}>
              <span style={{ color: '#F5E642' }}>▸</span>{tip}
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: '20px', textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 6 }}>Find a DFW Foundation Pro on ProLnk</div>
          <div style={{ fontSize: 14 }}>Vetted foundation specialists across all DFW soil zones. Get a free soil assessment quote.</div>
        </div>
      </div>
    </div>
  );
}