import { useState } from 'react';

const AUDIO_RECS: Record<string, Record<string, Record<string, { system: string; wiring: string; cost: string; note: string }>>> = {
  '2-3': {
    indoor: {
      budget: { system: 'Sonos Era 300 x2 + Sonos Port for existing stereo', wiring: 'Wireless — no wiring needed', cost: '$900–$1,400', note: 'Sonos is the easiest multi-room system for DFW renters and homeowners.' },
      mid: { system: 'Bluesound PowerNode + in-ceiling Polk Audio x4 (2 zones)', wiring: 'Speaker wire runs required — plan during remodel', cost: '$1,800–$3,200', note: 'In-ceiling gives cleaner look and better sound distribution in DFW open plans.' },
      premium: { system: 'Denon HEOS Link HS2 + Focal 100 ICA6 in-ceiling x6 (3 zones)', wiring: 'Cat6 + 14/2 speaker wire structured cabling', cost: '$5,000–$9,000', note: 'HEOS integrates well with Denon AVRs in dedicated theater + multi-room setups.' },
    },
    outdoor: {
      budget: { system: 'Sonos Era 100 (outdoor rated enclosure) x2', wiring: 'Wireless — weatherproof placement required', cost: '$500–$900', note: 'DFW summer heat and rain — use proper IP-rated enclosures for any outdoor speaker.' },
      mid: { system: 'Klipsch AW-650 all-weather x4 + Sonos Amp', wiring: '14/2 direct burial speaker cable', cost: '$1,600–$2,800', note: 'Klipsch outdoor speakers handle DFW heat and humidity without degrading.' },
      premium: { system: 'Polk Audio Atrium 8 SDI x6 + HEOS Drive HS2 multi-channel amp', wiring: 'Direct burial 14/2 + weather-rated conduit', cost: '$3,500–$6,500', note: 'Cover pool deck, patio, and side yard with zone-controlled audio throughout.' },
    },
  },
  '4-6': {
    indoor: {
      budget: { system: 'Sonos 4-zone system: Era 300 x4 + Sub Mini', wiring: 'Wireless throughout', cost: '$2,400–$3,800', note: 'Four-zone Sonos covers most DFW homes without any wiring.' },
      mid: { system: 'Bluesound Node x4 + in-ceiling Polk/Klipsch speakers per zone', wiring: 'Structured cabling with homerun to central closet', cost: '$5,500–$9,000', note: 'Homerun wiring from a central closet enables any amp or system upgrade later.' },
      premium: { system: 'Control4 EA-3 + Episode speakers + Triad in-ceiling amps', wiring: 'Full structured audio + Ethernet per zone', cost: '$12,000–$22,000', note: 'Control4 ties multi-room audio into full home automation for DFW smart homes.' },
    },
    outdoor: {
      budget: { system: 'Polk Atrium 4 x4 + Sonos Amp (2 outdoor zones)', wiring: 'Direct burial 14/2', cost: '$1,200–$2,200', note: 'Two outdoor zones covers typical DFW patio + pool area.' },
      mid: { system: 'Klipsch CP-6T in-ground x2 + Atrium 8 x4 + Sonos Amp', wiring: 'Direct burial runs from central closet', cost: '$3,500–$6,000', note: 'In-ground subwoofers add bass outdoors that surface speakers cannot match.' },
      premium: { system: 'James Loudspeaker outdoor system + Control4 zone control', wiring: 'Conduit + direct burial full structured run', cost: '$9,000–$18,000', note: 'James Loudspeaker is the gold standard for high-end DFW outdoor entertainment areas.' },
    },
  },
};

export default function DFWWholehomeAudioGuide() {
  const [zones, setZones] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<null | { system: string; wiring: string; cost: string; note: string }>(null);

  function handleCheck() {
    if (zones && location && budget && AUDIO_RECS[zones]?.[location]?.[budget]) {
      setResult(AUDIO_RECS[zones][location][budget]);
    }
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>🎵 DFW Whole-Home Audio</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF', marginBottom: 16, lineHeight: 1.2 }}>
          Whole-Home Audio Systems for DFW Homes
        </h1>
        <p style={{ color: '#9BA3B8', fontSize: 16, marginBottom: 40, lineHeight: 1.7 }}>
          DFW homeowners entertain year-round — outdoor audio needs to survive 110°F summers and heavy spring storms. Indoor systems benefit from DFW open floor plans. Here is how to design a system that actually fits your home.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 20, marginBottom: 48 }}>
          {[
            { icon: '🔊', title: 'Sonos vs HEOS vs Bluesound', desc: 'Sonos is easiest, Bluesound has highest audio quality, HEOS integrates best with Denon/Marantz AV receivers already in your setup.' },
            { icon: '🌧️', title: 'Outdoor Speaker Ratings', desc: 'DFW heat, rain, and humidity demand IP55+ rated speakers. Never use indoor speakers outdoors in Texas — they fail within one summer.' },
            { icon: '🏠', title: 'In-Ceiling vs Surface Mount', desc: 'In-ceiling speakers disappear into DFW open-concept designs. Surface mount is easier to install in finished homes without attic access.' },
            { icon: '📡', title: 'Wireless vs Wired', desc: 'Wireless systems are far easier in finished DFW homes. Wired in-ceiling gives better sound and zero WiFi dependency — worth it in new construction.' },
          ].map((card) => (
            <div key={card.title} style={{ backgroundColor: '#111D35', border: '1px solid #1E2D4A', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: 15, marginBottom: 8 }}>{card.title}</div>
              <div style={{ color: '#9BA3B8', fontSize: 14, lineHeight: 1.6 }}>{card.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ backgroundColor: '#111D35', border: '1px solid #1E2D4A', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🎛️ Audio System Recommender</h2>
          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#9BA3B8', fontSize: 13, marginBottom: 10 }}>Number of Zones Needed</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[{ v: '2-3', l: '2–3 Zones' }, { v: '4-6', l: '4–6 Zones' }].map((o) => (
                <button key={o.v} onClick={() => setZones(o.v)}
                  style={{ padding: '10px 16px', borderRadius: 8, border: `2px solid ${zones === o.v ? '#F5E642' : '#1E2D4A'}`,
                    backgroundColor: zones === o.v ? '#F5E642′ : ’transparent', color: zones === o.v ? '#0A1628′ : '#9BA3B8',
                    cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                  {o.l}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#9BA3B8', fontSize: 13, marginBottom: 10 }}>Primary Location</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[{ v: 'indoor', l: 'Indoor Zones' }, { v: 'outdoor', l: 'Outdoor / Patio / Pool' }].map((o) => (
                <button key={o.v} onClick={() => setLocation(o.v)}
                  style={{ padding: '10px 16px', borderRadius: 8, border: `2px solid ${location === o.v ? '#F5E642' : '#1E2D4A'}`,
                    backgroundColor: location === o.v ? '#F5E642′ : ’transparent', color: location === o.v ? '#0A1628′ : '#9BA3B8',
                    cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                  {o.l}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <div style={{ color: '#9BA3B8', fontSize: 13, marginBottom: 10 }}>Budget</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[{ v: 'budget', l: 'Entry' }, { v: 'mid', l: 'Mid-Range' }, { v: 'premium', l: 'Premium' }].map((o) => (
                <button key={o.v} onClick={() => setBudget(o.v)}
                  style={{ padding: '10px 16px', borderRadius: 8, border: `2px solid ${budget === o.v ? '#F5E642' : '#1E2D4A'}`,
                    backgroundColor: budget === o.v ? '#F5E642′ : ’transparent', color: budget === o.v ? '#0A1628′ : '#9BA3B8',
                    cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                  {o.l}
                </button>
              ))}
            </div>
          </div>
          <button onClick={handleCheck}
            style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Get My Audio System Recommendation
          </button>
          {result && (
            <div style={{ marginTop: 24, backgroundColor: '#0A1628', borderRadius: 12, padding: 24 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🎶 Your Audio System Plan</div>
              {[['🔊 System', result.system], ['🔌 Wiring', result.wiring]].map(([label, val]) => (
                <div key={label} style={{ marginBottom: 12 }}>
                  <span style={{ color: '#9BA3B8', fontSize: 13 }}>{label}</span>
                  <div style={{ color: '#E8EAF0', fontSize: 14, marginTop: 4 }}>{val}</div>
                </div>
              ))}
              <div style={{ marginBottom: 12 }}>
                <span style={{ color: '#9BA3B8', fontSize: 13 }}>Estimated Cost</span>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginTop: 4 }}>{result.cost}</div>
              </div>
              <div style={{ color: '#9BA3B8', fontSize: 14, fontStyle: 'italic' }}>{result.note}</div>
            </div>
          )}
        </div>
        <div style={{ padding: 24, backgroundColor: '#0D1E3A', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ color: '#9BA3B8', fontSize: 14 }}>Find a DFW whole-home audio installer — wired or wireless, indoor or outdoor.</div>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginTop: 8 }}>Connect with a DFW audio pro on ProLnk →</div>
        </div>
      </div>
    </div>
  );
}
