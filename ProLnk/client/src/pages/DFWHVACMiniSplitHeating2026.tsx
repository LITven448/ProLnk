import { useState } from 'react';

export default function DFWHVACMiniSplitHeating2026() {
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState('');

  const getGuide = () => {
    if (!situation) { setResult('Please select your heating situation.'); return; }
    const guides: Record<string, string> = {
      primary: '🟢 GREAT FIT FOR DFW: Mini-splits as primary heat work well in DFW. Our winters average 40°F lows — well within mini-split efficiency range (above 35°F). Standard mini-splits (HSPF 9+) run at peak efficiency. You\’ll see 2-3x efficiency vs. electric resistance heat. Keep existing gas backup for rare sub-35°F nights.',
      supplement: '✅ IDEAL USE CASE: Mini-splits as supplemental heat for specific zones (sunroom, garage, addition) is one of the best DFW applications. Heat only the rooms you use without running whole-home systems. Very cost-effective for DFW\’s mild winter heating needs.',
      extreme: '🌨️ COLD CLIMATE UNITS RECOMMENDED: For DFW\’s rare extreme cold events (December 2022-style), a cold-climate mini-split like Mitsubishi H2i operates to -13°F. Standard units may lock out below 30-32°F. If your home is all-electric and you want resilience, spec a cold-climate unit. The premium is worth it for peace of mind.',
      replace: '🔄 EVALUATE CAREFULLY: Full gas furnace replacement with mini-splits in DFW requires careful load calculation. Gas is typically cheaper per BTU in DFW. Mini-splits make sense for homes without existing ductwork, or if you\’re adding zones. Get a Manual J load calculation from a licensed DFW HVAC tech before committing.'
    };
    setResult(guides[situation] || '');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>❄️ Mini-Split Heating Mode Guide for DFW Winters</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>DFW winters are mild enough that mini-splits are highly efficient — most of the time. Here's how to use heat pump mode effectively and when you need backup heat.</p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🌡️ DFW Winter + Mini-Split Performance</h2>
          {[['Above 35°F','Mini-splits heat efficiently — DFW averages 40°F lows in Jan, so this covers most nights'],['25–35°F','Efficiency drops but unit still heats — COP around 1.5-2.0 vs. 3.0+ at milder temps'],['Below 25°F','Standard units may lock out — cold climate models (Mitsubishi H2i) handle to -13°F'],['DFW Average Winter','Jan avg low: 37°F | Record low: -2°F (rare) | Perfect climate for mini-split heating']].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1e3a5f' }}>
              <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{label}</span>
              <span style={{ color: '#94a3b8', fontSize: 13, maxWidth: '60%', textAlign: 'right' }}>{val}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔌 Cold Climate vs. Standard Mini-Splits</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['Standard Mini-Split','Works to ~30°F | Lower cost | Covers 95% of DFW winter nights'],['Cold Climate (H2i)','Works to -13°F | 20-30% cost premium | Worth it for all-electric homes'],['Backup Heat Strips','Built-in electric resistance backup activates below lockout temp | Inefficient but available'],['DFW Recommendation','Standard units work well; cold climate for all-electric or winter-resilience focus']].map(([title, desc]) => (
              <div key={title} style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4, fontSize: 14 }}>{title}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🧮 What's Your DFW Heating Situation?</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Select your situation</label>
            <select value={situation} onChange={e => setSituation(e.target.value)} style={{ background: '#1a2f50', border: '1px solid #2d4a7a', borderRadius: 8, padding: '10px 14px', color: '#fff', width: '100%', fontSize: 14 }}>
              <option value=''>Select situation...</option>
              <option value='primary'>Want mini-split as my primary heat source</option>
              <option value='supplement'>Adding mini-split to supplement existing heat</option>
              <option value='extreme'>Concerned about rare DFW extreme cold events</option>
              <option value='replace'>Considering replacing gas furnace entirely</option>
            </select>
          </div>
          <button onClick={getGuide} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, cursor: 'pointer', width: '100%' }}>Get Heating Guide →</button>
          {result && <div style={{ marginTop: 16, background: '#1a2f50', borderRadius: 8, padding: 14, fontSize: 14, lineHeight: 1.7 }}>{result}</div>}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🏠 Find a DFW Mini-Split Specialist via ProLnk</div>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>ProLnk HVAC contractors are experienced with mini-split installation and DFW-specific sizing requirements. Background-checked and licensed.</p>
        </div>
      </div>
    </div>
  );
}