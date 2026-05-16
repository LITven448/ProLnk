import { useState } from 'react';

export default function DFWPlayroomGuide2026() {
  const [spaceUse, setSpaceUse] = useState('playroom');
  const [childAge, setChildAge] = useState('toddler');

  const configs: Record<string, { flooring: string; safety: string[]; sound: string; extras: string }> = {
    playroom: {
      flooring: 'LVP with foam underlayment — durable, easy to clean, slip-resistant',
      safety: ['Outlet covers on all receptacles', 'Corner guards on furniture edges', 'Soft-close cabinet hardware', 'No-tip furniture anchors to walls'],
      sound: 'Basic acoustic panels reduce noise to adjacent rooms',
      extras: 'Built-in cubbies for toy storage, chalkboard wall accent',
    },
    media: {
      flooring: 'LVP base + area rug for sound absorption and comfort',
      safety: ['Cord management for AV equipment', 'Mounted TV (anti-tip)', 'Dimmer switches for lighting control'],
      sound: 'Mass loaded vinyl + acoustic panels for serious sound dampening ($800–$2K)',
      extras: 'Blackout shades, tiered seating platform, streaming setup',
    },
    flex: {
      flooring: 'LVP throughout — transitions easily between uses',
      safety: ['Outlet covers', 'Flush-mount lighting (no hanging lamps near play areas)'],
      sound: 'Door sweep + weatherstripping for basic sound control',
      extras: 'Murphy bed for guest use, built-in desk, modular shelving',
    },
  };

  const ageNotes: Record<string, string> = {
    toddler: 'Prioritize soft surfaces, corner guards, and outlet covers. Keep low-to-ground storage accessible.',
    school: 'Add desk space for homework, organized shelving, and durable LVP flooring.',
    teen: 'Focus on media room features — gaming setup, good lighting, sound dampening.',
  };

  const cfg = configs[spaceUse];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600 }}>🏠 PROLNK DFW GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Playroom / Bonus Room Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Convert your DFW bonus room into the perfect family space — playroom, media room, or flex space.</p>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🎯 Primary Space Use</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[{ id: 'playroom', label: '🧸 Playroom' }, { id: 'media', label: '🎬 Media Room' }, { id: 'flex', label: '🔄 Flex Space' }].map((opt) => (
              <button key={opt.id} onClick={() => setSpaceUse(opt.id)}
                style={{ padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                  background: spaceUse === opt.id ? '#F5E642' : '#0f172a', color: spaceUse === opt.id ? '#0A1628' : '#fff' }}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ marginBottom: 12 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>🪵 Flooring: </span>{cfg.flooring}</div>
          <div style={{ marginBottom: 12 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>🔇 Sound: </span>{cfg.sound}</div>
          <div style={{ marginBottom: 4, color: '#F5E642', fontWeight: 700 }}>🛡️ Safety Features:</div>
          {cfg.safety.map((s) => <div key={s} style={{ fontSize: 13, marginBottom: 4 }}>✅ {s}</div>)}
          <div style={{ marginTop: 12 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>✨ Extras: </span>{cfg.extras}</div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>👶 Children's Age Group</h2>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {[{ id: 'toddler', label: '👶 Toddler (0–4)' }, { id: 'school', label: '🎒 School Age (5–12)' }, { id: 'teen', label: '🎮 Teen (13+)' }].map((opt) => (
              <button key={opt.id} onClick={() => setChildAge(opt.id)}
                style={{ padding: '8px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 12,
                  background: childAge === opt.id ? '#F5E642' : '#0f172a', color: childAge === opt.id ? '#0A1628' : '#fff' }}>
                {opt.label}
              </button>
            ))}
          </div>
          <div style={{ background: '#0f172a', borderRadius: 8, padding: 14, fontSize: 13, color: '#cbd5e1' }}>💡 {ageNotes[childAge]}</div>
        </div>
      </div>
    </div>
  );
}
