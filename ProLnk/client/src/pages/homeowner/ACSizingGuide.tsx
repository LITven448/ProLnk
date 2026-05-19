import { useState } from 'react';

export default function ACSizingGuide() {
  const [sqft, setSqft] = useState('');
  const [insulation, setInsulation] = useState('average');
  const [windowPct, setWindowPct] = useState('15');
  const [result, setResult] = useState<{ tons: number; low: number; high: number } | null>(null);

  const insModifiers: Record<string, number> = { poor: 1.15, average: 1.0, good: 0.9, excellent: 0.82 };
  const windowModifiers: Record<string, number> = { '10': 0.95, '15': 1.0, '20': 1.05, '25': 1.1, '30+': 1.18 };

  function calculate() {
    const sf = parseFloat(sqft);
    if (!sf || sf < 500) return;
    const base = sf / 450;
    const insM = insModifiers[insulation] || 1.0;
    const winM = windowModifiers[windowPct] || 1.0;
    const adjusted = base * insM * winM;
    const roundedHalf = Math.round(adjusted * 2) / 2;
    setResult({ tons: roundedHalf, low: Math.max(1.5, roundedHalf - 0.5), high: roundedHalf + 0.5 });
  }

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#f1f5f9', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>
          ❄️ HVAC Resources
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12, lineHeight: 1.2, color: '#f8fafc' }}>
          DFW AC Sizing Guide
        </h1>
        <p style={{ fontSize: 20, color: '#38bdf8', fontWeight: 600, marginBottom: 12 }}>
          Why Bigger Isn't Better — and How to Size Right
        </p>
        <p style={{ fontSize: 16, color: '#94a3b8', marginBottom: 40, lineHeight: 1.7, maxWidth: 680 }}>
          Oversized AC units in DFW are <strong style={{ color: '#f8fafc' }}>extremely common and extremely expensive</strong>. An oversized unit runs short cycles, doesn't dehumidify properly, and costs 20–30% more to operate. Here’s what you need to know before replacing your system.
        </p>

        <div style={{ backgroundColor: '#1e293b', borderRadius: 12, padding: 28, marginBottom: 32, border: '1px solid #334155′ }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#f8fafc' }}>📐 Correct Sizing for DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div style={{ backgroundColor: '#0f172a', borderRadius: 8, padding: 16, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>Rule of thumb (DFW heat factor)</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#38bdf8′ }}>400–500 sqft per ton</div>
            </div>
            <div style={{ backgroundColor: '#0f172a', borderRadius: 8, padding: 16, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>Common DFW examples</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#f8fafc', lineHeight: 1.6 }}>
                2,000 sqft → 4 ton<br />2,500 sqft → 5 ton
              </div>
            </div>
          </div>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: 14 }}>
            But square footage alone doesn't tell the whole story. A proper <strong style={{ color: '#f8fafc' }}>Manual J load calculation</strong> also accounts for: ceiling height, insulation quality, window size and solar orientation, interior shade, and occupancy levels.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
          <div style={{ backgroundColor: '#1e293b', borderRadius: 12, padding: 24, border: '1px solid #7f1d1d' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fca5a5', marginBottom: 12 }}>🔴 Signs Your AC Is Oversized</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#94a3b8', lineHeight: 2, fontSize: 14 }}>
              <li>• Short cycling (runs 5–10 min then off)</li>
              <li>• High humidity indoors even when cool</li>
              <li>• Inconsistent room temperatures</li>
              <li>• Frequent coil freezing</li>
              <li>• Higher electricity bills than expected</li>
            </ul>
          </div>
          <div style={{ backgroundColor: '#1e293b', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#93c5fd', marginBottom: 12 }}>🔵 Signs Your AC Is Undersized</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#94a3b8', lineHeight: 2, fontSize: 14 }}>
              <li>• Never reaches target temp on 100°F days</li>
              <li>• Runs continuously all day</li>
              <li>• Very high summer electric bills</li>
              <li>• Hot spots in the home</li>
              <li>• Contractor says "run it lower"</li>
            </ul>
          </div>
        </div>

        <div style={{ backgroundColor: '#1e293b', borderRadius: 12, padding: 28, marginBottom: 32, border: '1px solid #334155′ }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#f8fafc' }}>🧮 Sizing Estimator</h2>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 20 }}>
            This provides a rough estimate. A proper Manual J from a qualified contractor is always recommended.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Home Square Footage</label>
              <input
                type="number"
                value={sqft}
                onChange={e => setSqft(e.target.value)}
                placeholder="2000″
                style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: 8, color: '#f1f5f9', fontSize: 15, boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Insulation Quality</label>
              <select
                value={insulation}
                onChange={e => setInsulation(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: 8, color: '#f1f5f9', fontSize: 15, boxSizing: 'border-box' }}
              >
                <option value="poor">Poor (pre-2000)</option>
                <option value="average">Average (2000–2010)</option>
                <option value="good">Good (2010–2018)</option>
                <option value="excellent">Excellent (2018+)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Window Area (% of walls)</label>
              <select
                value={windowPct}
                onChange={e => setWindowPct(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: 8, color: '#f1f5f9', fontSize: 15, boxSizing: 'border-box' }}
              >
                <option value="10″>~10% (few windows)</option>
                <option value="15″>~15% (average)</option>
                <option value="20″>~20% (many windows)</option>
                <option value="25″>~25% (large windows)</option>
                <option value="30+">30%+ (floor-to-ceiling)</option>
              </select>
            </div>
          </div>
          <button
            onClick={calculate}
            style={{ backgroundColor: '#0ea5e9', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}
          >
            Estimate My Tonnage
          </button>
          {result && (
            <div style={{ marginTop: 20, backgroundColor: '#0c2340', borderRadius: 10, padding: 20, border: '1px solid #0ea5e9′ }}>
              <div style={{ fontSize: 13, color: '#7dd3fc', marginBottom: 4 }}>Estimated Tonnage for Your Home</div>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#38bdf8′ }}>{result.tons} tons</div>
              <div style={{ fontSize: 14, color: '#94a3b8', marginTop: 4 }}>Reasonable range: {result.low}–{result.high} tons depending on Manual J results</div>
              <div style={{ marginTop: 12, padding: '10px 14px', backgroundColor: '#1e3a5f', borderRadius: 8, fontSize: 13, color: '#7dd3fc' }}>
                ⚠️ Always require your contractor to perform a <strong>Manual J calculation</strong> before accepting a quote. Takes 30–60 min. Any contractor who skips it is guessing.
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0c2340', borderRadius: 12, padding: 28, border: '1px solid #0ea5e9', textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>🛠️</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f8fafc', marginBottom: 8 }}>Find a Qualified HVAC Contractor</h2>
          <p style={{ color: '#7dd3fc', marginBottom: 20 }}>Get matched with verified HVAC contractors who perform proper Manual J calculations — not just rule-of-thumb guesses.</p>
          <a
            href="/homeowner/get-quotes"
            style={{ backgroundColor: '#0ea5e9', color: '#fff', textDecoration: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, display: 'inline-block' }}
          >
            Get HVAC Quotes →
          </a>
        </div>

      </div>
    </div>
  );
}
