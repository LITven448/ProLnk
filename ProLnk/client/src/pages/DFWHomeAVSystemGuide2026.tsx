import { useState } from 'react';

export default function DFWHomeAVSystemGuide2026() {
  const [roomType, setRoomType] = useState('living');
  const [budget, setBudget] = useState('mid');

  const getRec = () => {
    const recs: Record<string, Record<string, { system: string; speakers: string; display: string; audio: string; tip: string }>> = {
      living: {
        budget: { system: '2.1 Soundbar + Subwoofer', speakers: 'Sonos Arc + Sub Mini', display: '65″ 4K TV', audio: 'Dolby Atmos via soundbar', tip: 'Soundbar is best for DFW living rooms — no speaker wiring needed' },
        mid: { system: '5.1 Surround Sound', speakers: '5 in-ceiling/floor speakers + subwoofer', display: '75″ 4K QLED TV', audio: 'Dolby 5.1 via AVR', tip: 'AVR (audio-video receiver) is the hub — buy for future channels' },
        high: { system: '7.1.2 Dolby Atmos', speakers: '7 speakers + 2 ceiling + subwoofer', display: '85″ 8K Mini-LED TV', audio: 'Dolby Atmos + DTS:X', tip: 'Hire DFW AV installer for ceiling speaker placement for true Atmos' },
      },
      media: {
        budget: { system: '5.1 Dedicated Theater', speakers: 'Tower L/R + center + surround + sub', display: '100″ projector screen', audio: 'Dolby 5.1', tip: 'Projector needs blacked-out room — common in DFW media rooms' },
        mid: { system: '7.1 Immersive Theater', speakers: '7 speakers + dual subwoofers', display: '120″ ALR projector screen', audio: 'Dolby 7.1 + 4K laser projector', tip: 'Dual subs eliminate bass dead zones — worth the cost in large DFW media rooms' },
        high: { system: '7.1.4 Atmos Cinema', speakers: '7 floor + 4 ceiling Atmos + dual subs', display: '150″ CinemaScope screen + 4K laser', audio: 'Full Dolby Atmos + Auro-3D', tip: 'Hire certified THX installer for calibration in DFW' },
      },
      patio: {
        budget: { system: 'Outdoor Stereo Pair', speakers: '2 weather-resistant outdoor speakers', display: 'N/A', audio: 'Stereo via Sonos outdoor amp', tip: 'IP55 or higher rated speakers for DFW humidity and heat' },
        mid: { system: 'Outdoor 5.1 Patio System', speakers: '4 outdoor speakers + outdoor sub', display: '55″ outdoor weatherproof TV', audio: 'Sonos or Denon HEOS multi-room', tip: 'Bury sub-woofer conduit during landscaping to avoid digging later' },
        high: { system: 'Whole-Home Outdoor Audio', speakers: '8+ landscape speakers + outdoor AV', display: '65″ outdoor MicroLED TV', audio: 'Whole-home Denon HEOS or Sonos', tip: 'License outdoor speakers to HOA before install in DFW communities' },
      },
    };
    return recs[roomType]?.[budget] || recs.living.mid;
  };

  const rec = getRec();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'system-ui, sans-serif', color: '#e2e8f0′ }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎵</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: 0 }}>DFW Home AV System Guide 2026</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>Audio-visual systems for every DFW room and budget</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔊 DFW AV Options at a Glance</h2>
          {[
            { icon: '🎭', label: '5.1 vs 7.1 vs Atmos', desc: '5.1 = solid surround; 7.1 = wider stage; Atmos adds height' },
            { icon: '📽️', label: 'Projector vs TV', desc: 'Projector for dedicated media rooms; TV for living areas with ambient light' },
            { icon: '🏡', label: 'Whole-Home Audio', desc: 'Sonos (simple app) vs Denon HEOS (more power, better for DFW patios)' },
            { icon: '🌿', label: 'Outdoor Audio', desc: 'Use IP55+ rated speakers for DFW heat and humidity' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 14, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{item.label}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🎯 Get Your AV Recommendation</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Room Type</label>
              <select value={roomType} onChange={e => setRoomType(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#e2e8f0', fontSize: 14 }}>
                <option value="living">Living Room</option>
                <option value="media">Dedicated Media Room</option>
                <option value="patio">Outdoor / Patio</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Budget</label>
              <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#e2e8f0', fontSize: 14 }}>
                <option value="budget">Budget (&lt;$2K)</option>
                <option value="mid">Mid-Range ($2K–$8K)</option>
                <option value="high">Premium ($8K+)</option>
              </select>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 12 }}>{rec.system}</div>
            {[
              { label: 'Speakers', value: rec.speakers },
              { label: 'Display', value: rec.display },
              { label: 'Audio Format', value: rec.audio },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 2 ? '1px solid #1e3a5f' : 'none' }}>
                <span style={{ color: '#94a3b8', fontSize: 13, minWidth: 100 }}>{row.label}</span>
                <span style={{ color: '#e2e8f0', fontSize: 13, textAlign: 'right', maxWidth: '60%' }}>{row.value}</span>
              </div>
            ))}
            <div style={{ marginTop: 12, padding: '10px 12px', background: '#112240', borderRadius: 6, color: '#F5E642', fontSize: 13 }}>
              💡 {rec.tip}
            </div>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>Need a DFW AV installer for speakers, screens, or whole-home audio? <span style={{ color: '#F5E642′ }}>ProLnk connects you with vetted local AV pros.</span></p>
        </div>
      </div>
    </div>
  );
}
