import { useState } from 'react';

const proVsAmateur = [
  { category: 'Acoustics', amateur: 'Bare walls, echo on calls', pro: 'Acoustic panels + bookshelf diffusion — DFW open plans echo badly', fix: '$200-800′ },
  { category: 'Lighting', amateur: 'Overhead can lights (harsh shadows on face)', pro: '5500K ring light + diffused side fill for video', fix: '$150-400′ },
  { category: 'Temperature', amateur: 'Shared HVAC (too hot or cold during focus time)', pro: 'Mini-split for isolated temp control', fix: '$2,500-4,500 installed' },
  { category: 'Background', amateur: 'Cluttered, distracting, unprofessional', pro: 'Curated bookshelf or solid wall behind desk', fix: '$0-500′ },
  { category: 'Internet', amateur: 'WiFi from main router (drops)', pro: 'Hardwired ethernet + UPS battery backup', fix: '$200-600′ },
  { category: 'Desk Setup', amateur: 'Kitchen table height (neck strain in 2hrs)', pro: 'Adjustable standing desk at 28″ seated + monitor arm', fix: '$600-1,500′ },
];

export default function DFWHomeOfficeDesignGuide2026() {
  const [roomType, setRoomType] = useState('bedroom');
  const [workStyle, setWorkStyle] = useState('video-heavy');
  const [budget, setBudget] = useState('5000');
  const [result, setResult] = useState<null | { priorities: string[]; acousticNote: string; hvacNote: string; totalRange: string }>(null);

  function calculate() {
    const b = parseInt(budget) || 5000;
    const priorities: string[] = [];
    if (workStyle === 'video-heavy') {
      priorities.push('Acoustic treatment FIRST — panels on wall behind monitor and side walls');
      priorities.push('5500K LED ring light or softbox — position at eye level 45° angle');
      priorities.push('Solid or curated background — no windows behind you in DFW afternoon sun');
    }
    if (workStyle === 'focus') {
      priorities.push('Noise-canceling over-ear headphones (Bose or Sony)');
      priorities.push('Standing desk for posture — 2026 standard for serious WFH');
    }
    if (workStyle === 'client-facing') {
      priorities.push('Broadcast-quality microphone — XLR or USB condenser');
      priorities.push('Camera upgrade to 1080p+ webcam or DSLR capture card');
      priorities.push('Acoustic panels to eliminate room reverb — essential for DFW open floors');
    }
    priorities.push('Hardwired ethernet — never trust WiFi for calls');
    if (b >= 3000) priorities.push('Adjustable standing desk ($400-900)');
    if (b >= 5000) priorities.push('Monitor arm + 27″+ display at eye level');
    const acousticNote = roomType === 'bedroom'
      ? 'Bedroom: soft furnishings help, but add 2 panels on wall behind monitor minimum'
      : roomType === 'garage'
      ? 'Garage: worst acoustics — full acoustic treatment required, 6-8 panels minimum'
      : 'Open bonus room: high echo risk. Install acoustic ceiling tiles or cloud panel above desk';
    const hvacNote = roomType === 'garage'
      ? 'Garage office in DFW requires dedicated mini-split — temps hit 120°F in summer without it'
      : 'Shared HVAC is acceptable but consider programmable thermostat for work hours';
    setResult({ priorities, acousticNote, hvacNote, totalRange: `$${Math.round(b * 0.85).toLocaleString()} – $${Math.round(b * 1.2).toLocaleString()}` });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600 }}>🏠 DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Home Office Design Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW added 400,000+ remote workers since 2020. The gap between a professional WFH setup and an amateur one is visible on every Zoom call. Here's how to close it.</p>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '14px 20px', marginBottom: 32, fontWeight: 600 }}>
          🎯 2026 Baseline: Video calls are the new in-person meeting. Your setup IS your first impression.
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>⚡ Pro vs Amateur Setup</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 36 }}>
          {proVsAmateur.map(item => (
            <div key={item.category} style={{ background: '#1e293b', borderRadius: 10, padding: '14px 18px', border: '1px solid #334155′ }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontWeight: 700 }}>{item.category}</span>
                <span style={{ color: '#4ade80', fontSize: 13 }}>Fix: {item.fix}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 13 }}>
                <div style={{ color: '#f87171′ }}>❌ {item.amateur}</div>
                <div style={{ color: '#4ade80′ }}>✅ {item.pro}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🧮 Office Design Planner</h2>
        <div style={{ background: '#1e293b', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: '#94a3b8′ }}>Room Type</label>
              <select value={roomType} onChange={e => setRoomType(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15 }}>
                <option value="bedroom">Dedicated Bedroom</option>
                <option value="bonus">Bonus / Flex Room</option>
                <option value="garage">Garage Conversion</option>
                <option value="nook">Nook / Alcove</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: '#94a3b8′ }}>Work Style</label>
              <select value={workStyle} onChange={e => setWorkStyle(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15 }}>
                <option value="video-heavy">Video Call Heavy</option>
                <option value="focus">Deep Focus / Writing</option>
                <option value="client-facing">Client-Facing / Presenter</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: '#94a3b8′ }}>Budget: ${parseInt(budget).toLocaleString()}</label>
            <input type="range" min="1000″ max="20000" step="500" value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', accentColor: '#F5E642' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#94a3b8′ }}><span>$1K</span><span>$20K</span></div>
          </div>
          <button onClick={calculate} style={{ width: '100%', padding: '12px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            Build My Office Plan →
          </button>
        </div>

        {result && (
          <div style={{ background: '#1e293b', borderRadius: 12, padding: '24px', border: '1px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16, fontWeight: 700 }}>💼 Your 2026 DFW Home Office Plan</h3>
            <div style={{ marginBottom: 16 }}><strong>Priority Upgrades:</strong><ul style={{ marginTop: 6, paddingLeft: 20 }}>{result.priorities.map((p, i) => <li key={i} style={{ color: '#94a3b8', marginBottom: 6 }}>{p}</li>)}</ul></div>
            <div style={{ background: '#0f172a', borderRadius: 8, padding: '12px 16px', marginBottom: 10, fontSize: 13 }}><strong style={{ color: '#fbbf24′ }}>🔊 Acoustics:</strong> <span style={{ color: '#94a3b8' }}>{result.acousticNote}</span></div>
            <div style={{ background: '#0f172a', borderRadius: 8, padding: '12px 16px', marginBottom: 16, fontSize: 13 }}><strong style={{ color: '#60a5fa' }}>❄️ HVAC:</strong> <span style={{ color: '#94a3b8′ }}>{result.hvacNote}</span></div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px' }}><span style={{ color: '#F5E642', fontWeight: 700 }}>💰 Budget Range: </span>{result.totalRange}</div>
          </div>
        )}
      </div>
    </div>
  );
}
