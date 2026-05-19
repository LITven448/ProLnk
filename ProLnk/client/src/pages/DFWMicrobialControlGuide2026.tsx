import { useState } from 'react';

export default function DFWMicrobialControlGuide2026() {
  const [hvacType, setHvacType] = useState('');
  const [concern, setConcern] = useState('');

  const guides: Record<string, Record<string, string[]>> = {
    central: {
      mold: [
        '🔬 Install UV-C germicidal light on the coil — kills mold spores before they circulate',
        '💧 Keep indoor humidity between 45–50% — use a hygrometer to monitor',
        '🌀 Run fan continuously during AC season to pull moisture through drain',
        '🧪 Drop drain pan tablets monthly — prevents algae and slime buildup',
        '🛠️ Schedule annual coil cleaning — dirty coils are prime mold real estate',
      ],
      bacteria: [
        '🔬 UV-C lights also neutralize bacteria and viruses on the coil surface',
        '🔄 Replace filter every 30–60 days — MERV-11 or higher recommended',
        '🧽 Clean supply and return vents with mild disinfectant quarterly',
        '📞 Call ProLnk to schedule a certified indoor air quality inspection',
      ],
      odor: [
        '👃 Musty odors = likely mold or algae in drain pan or on coil',
        '🧪 Flush drain line with diluted bleach (1 cup per gallon) twice yearly',
        '🔬 UV-C coil light eliminates odor-causing biofilm at the source',
        '🔄 Change filter immediately — old filters trap and re-release odors',
      ],
    },
    minisplit: {
      mold: [
        '🔬 Mini-split coils are notorious for mold — run fan-only mode after cooling',
        '💨 10-minute fan-only cooldown dries the coil and prevents mold growth',
        '🧽 Clean washable filters every 2 weeks in DFW’s humid summers',
        '🛠️ Professional coil cleaning annually — mold hides in fins',
      ],
      bacteria: [
        '🔬 Use anti-bacterial spray on coil fins — available at HVAC supply stores',
        '💨 Run fan mode daily even when not cooling to prevent stagnant moisture',
        '🔄 Clean air filters weekly during peak summer in DFW',
      ],
      odor: [
        '👃 Sour smell from mini-split = classic mold/bacteria on coil',
        '🛠️ Deep clean required — remove unit cover and clean coil with foam cleaner',
        '💨 Fan-only mode for 15 minutes after each cooling cycle prevents recurrence',
      ],
    },
  };

  const getGuide = () => {
    if (!hvacType || !concern) return null;
    return guides[hvacType]?.[concern] ?? null;
  };

  const guide = getGuide();

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', padding: '32px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🦠</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>
            DFW HVAC Microbial Control Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>
            Prevent mold, bacteria, and biofilm in DFW HVAC systems
          </p>
        </div>

        <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
          <div>
            <label style={{ color: '#F5E642', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
              YOUR HVAC TYPE
            </label>
            <div style={{ display: 'flex', gap: 12 }}>
              {[{ v: 'central', l: '🏠 Central AC/Heat' }, { v: 'minisplit', l: '❄️ Mini-Split' }].map(o => (
                <button key={o.v} onClick={() => setHvacType(o.v)}
                  style={{ flex: 1, padding: '12px', borderRadius: 8, border: '2px solid', cursor: 'pointer',
                    borderColor: hvacType === o.v ? '#F5E642′ : '#1e3a5f',
                    backgroundColor: hvacType === o.v ? '#F5E64220′ : '#0d1f3c',
                    color: '#fff', fontSize: 14 }}>
                  {o.l}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ color: '#F5E642', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
              PRIMARY CONCERN
            </label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[{ v: 'mold', l: '🍄 Mold' }, { v: 'bacteria', l: '🦠 Bacteria' }, { v: 'odor', l: '👃 Odors' }].map(o => (
                <button key={o.v} onClick={() => setConcern(o.v)}
                  style={{ padding: '10px 20px', borderRadius: 8, border: '2px solid', cursor: 'pointer',
                    borderColor: concern === o.v ? '#F5E642′ : '#1e3a5f',
                    backgroundColor: concern === o.v ? '#F5E64220′ : '#0d1f3c',
                    color: '#fff', fontSize: 14 }}>
                  {o.l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {guide && (
          <div style={{ backgroundColor: '#0d1f3c', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🛡️ Your Microbial Control Plan</h2>
            {guide.map((step, i) => (
              <div key={i} style={{ padding: '12px 0', borderBottom: i < guide.length - 1 ? '1px solid #1e3a5f' : 'none', fontSize: 15, lineHeight: 1.6 }}>
                {step}
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 32, backgroundColor: '#F5E64215', borderRadius: 12, padding: 20, textAlign: 'center', border: '1px solid #F5E64240′ }}>
          <div style={{ fontSize: 24 }}>🔗</div>
          <p style={{ color: '#F5E642', fontWeight: 600, margin: '8px 0 4px' }}>ProLnk — DFW's HVAC Microbial Specialists</p>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>Connect with certified DFW pros for UV-C installation, coil cleaning, and air quality testing.</p>
        </div>
      </div>
    </div>
  );
}
