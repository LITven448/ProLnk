import { useState } from 'react';

export default function DFWWindowCleaningGuide() {
  const [windowCount, setWindowCount] = useState('');
  const [stories, setStories] = useState('');
  const [hardWater, setHardWater] = useState('');

  const count = parseInt(windowCount) || 0;
  const storyNum = parseInt(stories) || 1;

  const basePerWindow = 8;
  const storyMultiplier = storyNum === 1 ? 1 : storyNum === 2 ? 1.4 : 1.8;
  const hwPremium = hardWater === 'yes' ? 1.3 : 1;
  const lowEst = Math.round(count * basePerWindow * storyMultiplier * hwPremium * 0.9);
  const highEst = Math.round(count * basePerWindow * storyMultiplier * hwPremium * 1.15);

  const freqRec = () => {
    if (!count) return '';
    if (hardWater === 'yes') return 'Every 6 weeks (hard water stains fast in DFW)';
    if (storyNum >= 3) return 'Bi-monthly — high windows collect more airborne dust';
    return 'Every 2–3 months (DFW pollen and dust levels require frequent cleaning)';
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0D1F3C 0%, #0A1628 100%)', borderBottom: '2px solid #F5E642', padding: '48px 24px 36px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 36 }}>🪟</span>
            <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Home Services Guide</span>
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>
            Window Cleaning Guide for DFW
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 16, margin: 0, maxWidth: 600, lineHeight: 1.6 }}>
            DFW homeowners face a unique combination of cedar pollen (Jan–March), heavy dust from construction and wind, and hard water mineral deposits. Professional window cleaning here isn't a luxury — it's bi-monthly maintenance.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🌬️ Why DFW Windows Get Dirty Fast</h2>
          <div style={{ background: '#111E33', borderRadius: 12, padding: 24, marginBottom: 32, border: '1px solid #1E3054' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
              {[
                { icon: '🌿', title: 'Cedar Pollen', desc: 'Jan–March: DFW cedar "fever" season coats everything in yellow-green pollen that etches glass over time.' },
                { icon: '🏗️', title: 'Construction Dust', desc: 'DFW is one of the most active construction metros in the US. Silica dust from nearby sites settles on windows constantly.' },
                { icon: '💧', title: 'Hard Water', desc: 'DFW municipal water is hard (200–350 ppm). Sprinkler overspray leaves white calcium spots that require acid washing to remove.' },
                { icon: '💨', title: 'Southerly Winds', desc: 'DFW\’s prevailing southerly winds carry fine dirt and clay particles that bond to glass during humid summer conditions.' },
              ].map(item => (
                <div key={item.title} style={{ padding: 14, background: '#0A1628', borderRadius: 8, border: '1px solid #1E3054' }}>
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: '#E8EDF5', marginBottom: 6 }}>{item.title}</div>
                  <div style={{ color: '#94A3B8', fontSize: 12, lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🪜 Safety & High Window Considerations</h2>
          <div style={{ background: '#111E33', borderRadius: 12, padding: 24, marginBottom: 32, border: '1px solid #1E3054' }}>
            <p style={{ color: '#94A3B8', lineHeight: 1.7, margin: '0 0 12px' }}>
              Two-story and three-story homes require ladders, water-fed poles, or lift equipment. DIY cleaning of high windows is a leading cause of home accident falls. Professional services carry general liability and workers comp insurance — critical protection when hiring for elevated work.
            </p>
            <p style={{ color: '#94A3B8', lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: '#F5E642' }}>What's included in professional service:</strong> Interior + exterior glass, screen removal and rinse, track wipe-down, hard water pre-treatment (if needed), and sill wiping. Confirm all four are included before booking.
            </p>
          </div>

          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🔬 Hard Water Stain Removal</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 40 }}>
            {[
              { stage: 'Light Staining', treatment: 'White vinegar solution — effective for spots under 6 months old', addlCost: '$0–$2/window' },
              { stage: 'Moderate Staining', treatment: 'CLR or commercial descaler + microfiber scrub', addlCost: '$2–$5/window' },
              { stage: 'Heavy/Etched Staining', treatment: 'Professional-grade acid wash (oxalic acid)', addlCost: '$8–$20/window' },
              { stage: 'Permanently Etched', treatment: 'Glass polishing compound or glass replacement — acid wash will not restore', addlCost: '$50–$200+/pane' },
            ].map(s => (
              <div key={s.stage} style={{ display: 'flex', gap: 16, background: '#111E33', borderRadius: 8, padding: 14, border: '1px solid #1E3054', alignItems: 'center' }}>
                <div style={{ minWidth: 130 }}>
                  <span style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 11, padding: '3px 8px', borderRadius: 10 }}>{s.stage}</span>
                </div>
                <div style={{ flex: 1, color: '#94A3B8', fontSize: 13 }}>{s.treatment}</div>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>{s.addlCost}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E33', borderRadius: 14, padding: 28, border: '1px solid #F5E642', marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>🧮 Cleaning Frequency & Cost Estimator</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, margin: '0 0 20px' }}>Enter your home details for a DFW-specific cleaning estimate.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6, fontWeight: 600 }}>Number of Windows</label>
              <input type="number" placeholder="e.g. 18" value={windowCount} onChange={e => setWindowCount(e.target.value)}
                style={{ background: '#0A1628', border: '1px solid #1E3054', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 15, width: '100%', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6, fontWeight: 600 }}>Stories</label>
              <select value={stories} onChange={e => setStories(e.target.value)}
                style={{ background: '#0A1628', border: '1px solid #1E3054', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 15, width: '100%' }}>
                <option value="">Select</option>
                <option value="1">1 Story</option>
                <option value="2">2 Stories</option>
                <option value="3">3+ Stories</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 10, fontWeight: 600 }}>Visible Hard Water Stains on Glass?</label>
            <div style={{ display: 'flex', gap: 10 }}>
              {['yes', 'no', 'unsure'].map(v => (
                <button key={v} onClick={() => setHardWater(v)} style={{
                  padding: '9px 20px', borderRadius: 20, border: '2px solid',
                  borderColor: hardWater === v ? '#F5E642' : '#1E3054',
                  background: hardWater === v ? '#F5E642' : 'transparent',
                  color: hardWater === v ? '#0A1628' : '#94A3B8',
                  fontWeight: 600, fontSize: 13, cursor: 'pointer', textTransform: 'capitalize'
                }}>{v}</button>
              ))}
            </div>
          </div>

          {count > 0 && stories && hardWater && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, border: '1px solid #1E3054' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>Estimated Cost (per visit)</div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: '#F5E642' }}>${lowEst}–${highEst}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>Recommended Frequency</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#E8EDF5', lineHeight: 1.4 }}>{freqRec()}</div>
                </div>
              </div>
              {hardWater === 'yes' && <p style={{ color: '#F5E642', fontSize: 13, margin: 0, borderTop: '1px solid #1E3054', paddingTop: 12 }}>⚠️ Budget additional $8–$20 per window for professional acid washing on first visit. Confirm this is included in quote.</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
