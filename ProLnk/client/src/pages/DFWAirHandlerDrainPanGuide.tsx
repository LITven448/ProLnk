import { useState } from 'react';

const LOCATIONS = ['Attic', 'Closet', 'Garage', 'Basement'];
const PAN_CONDITIONS = [
  { key: 'good', label: '✅ Clean — no rust' },
  { key: 'minor', label: '🟡 Minor surface rust' },
  { key: 'major', label: '🔴 Heavy rust / holes' },
  { key: 'unknown', label: '❓ Never checked' },
];

const getUrgency = (loc: string, cond: string) => {
  if (cond === 'major') return { level: '🚨 Replace Immediately', color: '#EF4444', detail: 'A rusted-through pan will fail and dump water into your structure. This is an emergency repair.' };
  if (cond === 'minor' && loc === 'Attic') return { level: '⚠️ Replace This Season', color: '#F59E0B', detail: 'Attic units with rusting pans are one crack away from a $5K–$15K ceiling disaster. Schedule now.' };
  if (cond === 'minor') return { level: '🟡 Monitor & Treat', color: '#F59E0B', detail: 'Use rust-inhibiting pan tablets. Inspect each season and replace if rust spreads.' };
  if (cond === 'unknown') return { level: '📋 Inspect ASAP', color: '#94A3B8', detail: 'You need to see what you have. Attic pans are commonly neglected and already failing.' };
  return { level: '✅ Good Shape — Maintain', color: '#10B981', detail: 'Add pan tablets quarterly and inspect during each HVAC service visit.' };
};

export default function DFWAirHandlerDrainPanGuide() {
  const [location, setLocation] = useState('');
  const [panCond, setPanCond] = useState('');
  const [showResult, setShowResult] = useState(false);

  const urgency = location && panCond ? getUrgency(location, panCond) : null;
  const isAttic = location === 'Attic';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EEF7', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 1 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Air Handler Drain Pan Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 28, fontSize: 15 }}>
          Your air handler sits above a drain pan — a shallow tray that catches condensate if the drain line backs up. In DFW's humidity, that pan works hard. Rust, algae, and failed pans are among the most common causes of preventable water damage in North Texas homes.
        </p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>⚠️ Why DFW Drain Pans Fail Faster</div>
          {[
            ['💧','Constant moisture','DFW summers keep pans wet for 5–6 months straight, accelerating rust'],
            ['🦠','Algae blooms','Warm, humid pans grow algae fast — clogs drain, raises water level'],
            ['🏗️','Secondary pan required','DFW building code requires a secondary pan under attic air handlers'],
            ['🔩','Neglect cycle','Most homeowners never see their attic pan — damage is invisible until it floods'],
          ].map(([icon, title, desc]) => (
            <div key={title} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              <div><div style={{ fontWeight: 600, fontSize: 14 }}>{title}</div><div style={{ color: '#94A3B8', fontSize: 13 }}>{desc}</div></div>
            </div>
          ))}
        </div>

        {isAttic && (
          <div style={{ background: '#2D1515', border: '1.5px solid #EF4444', borderRadius: 12, padding: 16, marginBottom: 20 }}>
            <div style={{ fontWeight: 700, color: '#EF4444', marginBottom: 6 }}>🏗️ DFW Code: Attic AHU Secondary Pan</div>
            <p style={{ color: '#94A3B8', fontSize: 13, margin: 0 }}>
              Texas requires a secondary drain pan under attic air handlers. It must have its own drain line (typically routed to a visible exterior location like over a window) so you notice overflow before it enters the ceiling. If yours lacks this, it may not be code-compliant.
            </p>
          </div>
        )}

        <div style={{ background: '#111E35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>📍 Your Setup</div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 8 }}>Air Handler Location</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {LOCATIONS.map(l => (
                <button key={l} onClick={() => { setLocation(l); setShowResult(false); }} style={{ padding: '8px 16px', borderRadius: 8, border: '1.5px solid', borderColor: location === l ? '#F5E642′ : '#1E3A5F', background: location === l ? '#F5E64220' : ’transparent', color: location === l ? '#F5E642′ : '#94A3B8', cursor: ’pointer', fontSize: 13, fontWeight: 600 }}>{l}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 8 }}>Primary Drain Pan Condition</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {PAN_CONDITIONS.map(({ key, label }) => (
                <button key={key} onClick={() => { setPanCond(key); setShowResult(false); }} style={{ padding: '8px 16px', borderRadius: 8, border: '1.5px solid', borderColor: panCond === key ? '#F5E642′ : '#1E3A5F', background: panCond === key ? '#F5E64220' : ’transparent', color: panCond === key ? '#F5E642′ : '#94A3B8', cursor: ’pointer', fontSize: 13, fontWeight: 600 }}>{label}</button>
              ))}
            </div>
          </div>
          <button onClick={() => setShowResult(true)} disabled={!location || !panCond} style={{ background: location && panCond ? '#F5E642′ : '#1E3A5F', color: location && panCond ? '#0A1628' : '#4A6080', border: ’none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 14, cursor: location && panCond ? 'pointer' : 'not-allowed', width: '100%' }}>
            Get My Pan Assessment
          </button>
        </div>

        {showResult && urgency && (
          <div style={{ background: '#0D2240', border: `1.5px solid ${urgency.color}`, borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: urgency.color, marginBottom: 8 }}>{urgency.level}</div>
            <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 12 }}>{urgency.detail}</p>
            <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Recommended Actions:</div>
            {['Inspect the primary drain pan — look for rust, standing water, or cracks.', isAttic ? 'Confirm secondary pan and secondary drain line are present and unobstructed.' : 'Check drain line is clear and flowing.', 'Drop 2 pan tablets in the pan to prevent algae.', 'Install or verify float switch is wired to cut system power on overflow.', 'Schedule biannual HVAC service to include pan inspection.'].map((s, i) => (
              <div key={i} style={{ fontSize: 13, color: '#94A3B8', marginBottom: 6, display: 'flex', gap: 8 }}><span style={{ color: '#F5E642′ }}>{i + 1}.</span>{s}</div>
            ))}
          </div>
        )}

        <div style={{ background: '#111E35', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>💊 Pan Tablets: How They Work</div>
          <p style={{ color: '#94A3B8', fontSize: 13 }}>Pan tablets (also called condensate pan treatment tablets) dissolve slowly in standing water and prevent algae and bacterial growth. Drop 2 tablets per season — they last about 90 days. Available at any HVAC supply house or online for ~$10/pack. Not a substitute for regular drain flushing.</p>
        </div>
      </div>
    </div>
  );
}
