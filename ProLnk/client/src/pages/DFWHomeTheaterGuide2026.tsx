import { useState } from 'react';

const THEATER_RECS: Record<string, Record<string, { display: string; audio: string; acoustic: string; install: string; cost: string }>> = {
  small: {
    budget: { display: '85" 4K TV (Samsung QN85B or LG C4)', audio: 'Sonos Arc + Sub Mini 2.1 system', acoustic: 'Area rug + curtains + bookshelf diffusion', install: 'TV wall mount + soundbar bracket', cost: '$3,500–$5,500' },
    mid: { display: '4K Laser Projector (BenQ HT3550i) + 100" ALR screen', audio: 'Denon AVR + Klipsch 5.1 floor + in-ceiling Atmos x4', acoustic: 'Acoustic panels + carpet + bass traps', install: 'Projector ceiling mount + speaker wiring', cost: '$8,000–$14,000' },
    premium: { display: 'Sony SXRD 4K Laser Projector + 110" AT screen', audio: 'Anthem AVM + Focal 7.2.4 Atmos system', acoustic: 'Full acoustic treatment package', install: 'Full AV integration + control system', cost: '$22,000–$40,000' },
  },
  medium: {
    budget: { display: '98" 4K TV (Samsung QN98) or 110" projector screen', audio: 'Sonos Arc + Sub + Era 300 5.1.2', acoustic: 'Rug + curtains + corner bass traps', install: 'TV mount or projector ceiling mount', cost: '$5,500–$9,000' },
    mid: { display: '4K Laser Projector (Epson LS12000) + 120" ALR screen', audio: 'Marantz Cinema 60 + KEF R series 7.1.4', acoustic: 'GIK Acoustics panel kit + carpet', install: 'Full wiring rough-in + projector mount + rack', cost: '$14,000–$22,000' },
    premium: { display: 'Sony VPL-XW7000 4K laser + 130" masking screen', audio: 'Trinnov Altitude + Focal Kanta 9.3.6 Atmos', acoustic: 'Professional acoustic design + build-out', install: 'Dedicated room build-out + automation', cost: '$45,000–$90,000' },
  },
  large: {
    budget: { display: '4K Laser Projector + 120" fixed screen', audio: 'Denon AVR + Klipsch Reference Premier 7.1 + in-ceiling Atmos', acoustic: 'Panel kit + carpet + drapes', install: 'Projector mount + speaker rough-in + rack', cost: '$9,000–$16,000' },
    mid: { display: 'Sony VPL-XW5000 4K + 130" CinemaScope screen', audio: 'Anthem MRX 1140 + Monitor Audio Silver 9.1.4 Atmos', acoustic: 'Full panel + soffit bass treatment', install: 'Dedicated circuit + full rack + control', cost: '$25,000–$45,000' },
    premium: { display: 'Barco Residential 4K laser + 150" masking scope screen', audio: 'Trinnov + Steinway Lyngdorf full Atmos', acoustic: 'Dedicated acoustic architect + room treatment', install: 'Full cinema build + automation + calibration', cost: '$100,000+' },
  },
};

export default function DFWHomeTheaterGuide2026() {
  const [roomSize, setRoomSize] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<null | { display: string; audio: string; acoustic: string; install: string; cost: string }>(null);

  function handleCheck() {
    if (roomSize && budget && THEATER_RECS[roomSize]?.[budget]) {
      setResult(THEATER_RECS[roomSize][budget]);
    }
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>🎬 DFW Home Theater 2026</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF', marginBottom: 16, lineHeight: 1.2 }}>
          Home Theater Rooms in DFW — 2026 Planning Guide
        </h1>
        <p style={{ color: '#9BA3B8', fontSize: 16, marginBottom: 40, lineHeight: 1.7 }}>
          DFW homeowners are investing heavily in dedicated home theater spaces. Large open floor plans common in DFW new construction require acoustic treatment — and Texas sunlight makes projector room light control essential. Here is what actually works in 2026.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 20, marginBottom: 48 }}>
          {[
            { icon: '☀️', title: 'DFW Sun + Projectors', desc: 'Texas sunlight kills projector contrast. Dedicated rooms need blackout shades or shutters — or choose an ALR screen to fight ambient light.' },
            { icon: '🔊', title: 'Dolby Atmos Ceiling Speakers', desc: 'DFW open floor plans require in-ceiling Atmos speakers. Proper placement (7.1.4 minimum) transforms any room into a cinema.' },
            { icon: '📐', title: 'Soundproofing Open Plans', desc: 'DFW open-concept homes need mass loaded vinyl + double drywall + resilient channel for real sound isolation from living areas.' },
            { icon: '📺', title: '4K Laser vs 8K TV', desc: '8K content is still limited — a 4K laser projector at 120"+ beats an 8K TV at 85" for true cinematic immersion in 2026.' },
          ].map((card) => (
            <div key={card.title} style={{ backgroundColor: '#111D35', border: '1px solid #1E2D4A', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: 15, marginBottom: 8 }}>{card.title}</div>
              <div style={{ color: '#9BA3B8', fontSize: 14, lineHeight: 1.6 }}>{card.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ backgroundColor: '#111D35', border: '1px solid #1E2D4A', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🎥 Home Theater Room Recommender</h2>
          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#9BA3B8', fontSize: 13, marginBottom: 10 }}>Dedicated Room Size</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[{ v: 'small', l: 'Small (under 250 sq ft)' }, { v: 'medium', l: 'Medium (250–450 sq ft)' }, { v: 'large', l: 'Large (450+ sq ft)' }].map((o) => (
                <button key={o.v} onClick={() => setRoomSize(o.v)}
                  style={{ padding: '10px 16px', borderRadius: 8, border: `2px solid ${roomSize === o.v ? '#F5E642' : '#1E2D4A'}`,
                    backgroundColor: roomSize === o.v ? '#F5E642' : 'transparent', color: roomSize === o.v ? '#0A1628' : '#9BA3B8',
                    cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                  {o.l}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <div style={{ color: '#9BA3B8', fontSize: 13, marginBottom: 10 }}>Budget Range</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[{ v: 'budget', l: 'Entry ($3K–$16K)' }, { v: 'mid', l: 'Mid ($14K–$45K)' }, { v: 'premium', l: 'Premium ($40K+)' }].map((o) => (
                <button key={o.v} onClick={() => setBudget(o.v)}
                  style={{ padding: '10px 16px', borderRadius: 8, border: `2px solid ${budget === o.v ? '#F5E642' : '#1E2D4A'}`,
                    backgroundColor: budget === o.v ? '#F5E642' : 'transparent', color: budget === o.v ? '#0A1628' : '#9BA3B8',
                    cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                  {o.l}
                </button>
              ))}
            </div>
          </div>
          <button onClick={handleCheck}
            style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Get My Theater Recommendation
          </button>
          {result && (
            <div style={{ marginTop: 24, backgroundColor: '#0A1628', borderRadius: 12, padding: 24 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🎬 Your Theater Build Plan</div>
              {[['🖥️ Display', result.display], ['🔊 Audio', result.audio], ['🎵 Acoustics', result.acoustic], ['🔧 Installation', result.install]].map(([label, val]) => (
                <div key={label} style={{ marginBottom: 12 }}>
                  <span style={{ color: '#9BA3B8', fontSize: 13 }}>{label}</span>
                  <div style={{ color: '#E8EAF0', fontSize: 14, marginTop: 4 }}>{val}</div>
                </div>
              ))}
              <div style={{ marginTop: 8 }}>
                <span style={{ color: '#9BA3B8', fontSize: 13 }}>Total Estimated Investment</span>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginTop: 4 }}>{result.cost}</div>
              </div>
            </div>
          )}
        </div>
        <div style={{ padding: 24, backgroundColor: '#0D1E3A', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ color: '#9BA3B8', fontSize: 14 }}>Ready to build your DFW home theater? Connect with a certified AV installer.</div>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginTop: 8 }}>Find a DFW home theater pro on ProLnk →</div>
        </div>
      </div>
    </div>
  );
}
