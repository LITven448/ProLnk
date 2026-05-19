import { useState } from 'react';

export default function DFWHomeEnergyScoreGuide() {
  const [vintage, setVintage] = useState<'pre1980′ | '1980s' | '1990s' | '2000s' | '2010s' | '2020s'>('1990s');
  const [insulation, setInsulation] = useState<'poor' | 'average' | 'good'>('average');
  const [hvacAge, setHvacAge] = useState(12);
  const [windows, setWindows] = useState<'single' | 'double' | 'triple'>('double');
  const [result, setResult] = useState<null | { score: number; label: string; improvements: { name: string; impact: string; cost: string; scoreGain: number }[] }>(null);

  const s = { background: '#0F1E35', borderRadius: '12px', padding: '20px', marginBottom: '16px' };
  const tg = { display: 'inline-block', background: '#1A2F50', color: '#F5E642', borderRadius: '6px', padding: '3px 10px', fontSize: '12px', marginRight: '6px', marginBottom: '6px' };

  function calculate() {
    let score = 5;
    const vintageMap = { 'pre1980': -2, '1980s': -1, '1990s': 0, '2000s': 1, '2010s': 2, '2020s': 3 };
    const insMap = { poor: -2, average: 0, good: 2 };
    const winMap = { single: -2, double: 0, triple: 1 };
    score += vintageMap[vintage];
    score += insMap[insulation];
    score += winMap[windows];
    if (hvacAge > 15) score -= 2;
    else if (hvacAge > 10) score -= 1;
    else if (hvacAge < 5) score += 1;
    score = Math.max(1, Math.min(10, score));
    const label = score <= 3 ? 'Below Average — Major upgrades needed' : score <= 5 ? 'Average — Moderate improvements available' : score <= 7 ? 'Above Average — DFW median is 5–6′ : ’High Performer — Top 20% of DFW homes';
    const improvements: { name: string; impact: string; cost: string; scoreGain: number }[] = [];
    if (insulation === 'poor') improvements.push({ name: '🧱 Air Sealing + Insulation Upgrade', impact: 'Largest single energy impact in DFW', cost: '$2,500–$5,000', scoreGain: 2 });
    if (hvacAge > 10) improvements.push({ name: '❄️ Replace HVAC System (18+ SEER2)', impact: 'Critical in DFW — HVAC is 45–55% of bill', cost: '$5,000–$12,000', scoreGain: 2 });
    if (windows === 'single') improvements.push({ name: '🪟 Window Replacement (Low-E Double Pane)', impact: 'Reduces solar heat gain in DFW summers', cost: '$400–$800/window', scoreGain: 1 });
    if (vintage === 'pre1980′ || vintage === '1980s') improvements.push({ name: '🔌 Electrical + Duct Sealing', impact: ’Older DFW homes have significant duct leakage', cost: '$1,500–$3,000', scoreGain: 1 });
    improvements.push({ name: '💡 Smart Thermostat + Scheduling', impact: 'Easy win — 8–12% savings with proper setup', cost: '$150–$300 installed', scoreGain: 0 });
    setResult({ score, label, improvements: improvements.slice(0, 3) });
  }

  function scoreColor(s: number) {
    if (s <= 3) return '#FC8181';
    if (s <= 5) return '#FBD38D';
    if (s <= 7) return '#68D391';
    return '#F5E642';
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#FFFFFF', fontFamily: 'Inter, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '13px', marginBottom: '8px' }}>🏠 DFW ENERGY GUIDES</div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', lineHeight: 1.3 }}>DOE Home Energy Score Guide for DFW</h1>
        <p style={{ color: '#A0AEC0', fontSize: '15px', marginBottom: '28px' }}>The DOE Home Energy Score rates homes 1–10 based on energy efficiency. In DFW, the average score is 5–6. Understanding yours can unlock savings, rebates, and higher resale value.</p>

        <div style={s}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#F5E642', marginBottom: '12px' }}>📊 What the 1–10 Score Means</h2>
          <div style={{ display: 'flex', gap: '0', marginBottom: '12px', borderRadius: '8px', overflow: 'hidden' }}>
            {[
              { range: '1–3', label: 'Poor', color: '#FC8181′ },
              { range: '4–6', label: 'Average', color: '#FBD38D' },
              { range: '7–9', label: 'Good', color: '#68D391′ },
              { range: '10', label: 'Best', color: '#F5E642′ },
            ].map(b => (
              <div key={b.range} style={{ flex: 1, background: b.color, padding: '10px', textAlign: 'center' }}>
                <div style={{ color: '#0A1628', fontWeight: 700, fontSize: '16px' }}>{b.range}</div>
                <div style={{ color: '#0A1628', fontSize: '11px' }}>{b.label}</div>
              </div>
            ))}
          </div>
          <p style={{ color: '#CBD5E0', fontSize: '14px', marginBottom: '8px' }}>Each point on the scale represents ~15% difference in annual energy costs. A score-6 home costs ~30% more to operate than a score-8 equivalent in DFW.</p>
          <div style={tg}>DFW average: 5–6</div>
          <div style={tg}>US national average: 5</div>
          <div style={tg}>Score affects energy bills + resale</div>
        </div>

        <div style={s}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#F5E642', marginBottom: '12px' }}>📈 Energy Score + DFW Home Resale Value</h2>
          <p style={{ color: '#CBD5E0', fontSize: '14px', marginBottom: '10px' }}>Studies show energy-efficient homes in DFW sell for 2–7% more and spend fewer days on market. Buyers increasingly request energy disclosure — especially after 2021 winter storm.</p>
          {[
            { score: '8–10', premium: '+4–7% sale price', days: '8–12 fewer days on market' },
            { score: '6–7', premium: '+1–3% sale price', days: 'At or near market average' },
            { score: '1–5', premium: 'Baseline or discount', days: 'May require price reduction' },
          ].map(r => (
            <div key={r.score} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#1A2F50', borderRadius: '8px', marginBottom: '8px' }}>
              <span style={{ color: '#F5E642', fontWeight: 700, width: '60px' }}>Score {r.score}</span>
              <span style={{ color: '#68D391', fontSize: '13px' }}>{r.premium}</span>
              <span style={{ color: '#A0AEC0', fontSize: '13px' }}>{r.days}</span>
            </div>
          ))}
        </div>

        <div style={s}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#F5E642', marginBottom: '12px' }}>🔍 How to Get Your DFW Home Scored</h2>
          {['Find a DOE-certified assessor at HEScoreContractor.lbl.gov', 'Assessment takes 1–2 hours — assessor measures insulation, HVAC, windows, air sealing', 'Cost in DFW: $150–$250 for standalone assessment', 'Some utilities (Oncor, Atmos) offer subsidized audits — check for current programs', 'Assessment generates detailed report with upgrade recommendations + ROI'].map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '10px', alignItems: 'flex-start' }}>
              <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px', flexShrink: 0, marginTop: '1px' }}>{i + 1}</div>
              <span style={{ color: '#CBD5E0', fontSize: '14px' }}>{step}</span>
            </div>
          ))}
        </div>

        <div style={s}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#F5E642', marginBottom: '16px' }}>🧮 Estimate Your Score + Top Improvements</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
            <div>
              <div style={{ color: '#A0AEC0', fontSize: '13px', marginBottom: '4px' }}>Home Built</div>
              <select value={vintage} onChange={e => setVintage(e.target.value as typeof vintage)}
                style={{ width: '100%', background: '#1A2F50', border: '1px solid #2D4A70', borderRadius: '8px', color: '#FFF', padding: '10px', fontSize: '14px', boxSizing: 'border-box' }}>
                <option value="pre1980″>Before 1980</option>
                <option value="1980s">1980–1989</option>
                <option value="1990s">1990–1999</option>
                <option value="2000s">2000–2009</option>
                <option value="2010s">2010–2019</option>
                <option value="2020s">2020 or newer</option>
              </select>
            </div>
            <div>
              <div style={{ color: '#A0AEC0', fontSize: '13px', marginBottom: '4px' }}>Insulation Level</div>
              <select value={insulation} onChange={e => setInsulation(e.target.value as typeof insulation)}
                style={{ width: '100%', background: '#1A2F50', border: '1px solid #2D4A70', borderRadius: '8px', color: '#FFF', padding: '10px', fontSize: '14px', boxSizing: 'border-box' }}>
                <option value="poor">Poor (feels drafty / original)</option>
                <option value="average">Average (some upgrades done)</option>
                <option value="good">Good (recently upgraded/spray foam)</option>
              </select>
            </div>
            <div>
              <div style={{ color: '#A0AEC0', fontSize: '13px', marginBottom: '4px' }}>HVAC Age (years)</div>
              <input type="number" value={hvacAge} min={1} max={30} onChange={e => setHvacAge(Number(e.target.value))}
                style={{ width: '100%', background: '#1A2F50', border: '1px solid #2D4A70', borderRadius: '8px', color: '#FFF', padding: '10px', fontSize: '15px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <div style={{ color: '#A0AEC0', fontSize: '13px', marginBottom: '4px' }}>Window Type</div>
              <select value={windows} onChange={e => setWindows(e.target.value as typeof windows)}
                style={{ width: '100%', background: '#1A2F50', border: '1px solid #2D4A70', borderRadius: '8px', color: '#FFF', padding: '10px', fontSize: '14px', boxSizing: 'border-box' }}>
                <option value="single">Single Pane (older)</option>
                <option value="double">Double Pane</option>
                <option value="triple">Triple Pane / Low-E</option>
              </select>
            </div>
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: '8px', padding: '12px 28px', fontSize: '15px', cursor: 'pointer', width: '100%' }}>
            Estimate My Energy Score
          </button>

          {result && (
            <div style={{ marginTop: '20px', background: '#0A1628', borderRadius: '10px', padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: scoreColor(result.score), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: '#0A1628', fontWeight: 700, fontSize: '32px' }}>{result.score}</span>
                </div>
                <div>
                  <div style={{ color: '#FFF', fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>Estimated DOE Score: {result.score}/10</div>
                  <div style={{ color: '#A0AEC0', fontSize: '13px' }}>{result.label}</div>
                </div>
              </div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '14px', marginBottom: '12px' }}>🎯 Top 3 Improvements to Raise Your Score</div>
              {result.improvements.map(imp => (
                <div key={imp.name} style={{ background: '#0F1E35', borderRadius: '8px', padding: '12px', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ color: '#FFF', fontWeight: 700, fontSize: '14px' }}>{imp.name}</span>
                    {imp.scoreGain > 0 && <span style={{ color: '#68D391', fontSize: '12px', fontWeight: 700 }}>+{imp.scoreGain} pts</span>}
                  </div>
                  <div style={{ color: '#A0AEC0', fontSize: '12px', marginBottom: '4px' }}>{imp.impact}</div>
                  <div style={{ color: '#FBD38D', fontSize: '12px' }}>💰 {imp.cost}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
