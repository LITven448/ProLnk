import { useState } from 'react';

export default function DFWGamingRoomGuide2026() {
  const [setup, setSetup] = useState('');
  const [roomSize, setRoomSize] = useState('');
  const [result, setResult] = useState('');

  const guides: Record<string, Record<string, string>> = {
    console: {
      small: '🎮 Console Gaming — Small DFW Room: Run a single CAT6 drop from your router to your gaming setup — DFW WiFi is crowded (Frisco/Allen neighborhoods especially). Netgear GS308 unmanaged switch () splits the single run to PS5 + Switch dock. 75″ OLED (LG C4) at 5-6ft viewing distance is DFW sweet spot for small rooms. Add a Dyson Hot+Cool for summer heat management — DFW gaming rooms hit 80°F+ without dedicated cooling. Acoustic foam on the wall behind your chair kills game audio echo.',
      medium: '🎮 Console Gaming — Medium DFW Room: Dedicated CAT6 home run from panel to gaming room (DFW electricians charge -350 for single room drop). Add a TP-Link TL-SG108 switch for multiple consoles. 85″ 4K display with 120Hz (Sony X95K) at 9-10ft viewing distance. Portable AC unit (8,000 BTU) for DFW summer — even with HVAC, three consoles + displays add 800-1,200 BTU of heat. Two bass trap corners + side absorption panels contain game audio inside the room.',
      large: '🎮 Console Gaming — Large DFW Room: Structured wiring closet with 16-port switch, runs to each gaming station. Ring Keystone CAT6 jacks at each position. Consider a dedicated mini-split (12,000 BTU Mitsubishi, ,200 installed) — DFW summer heat + multiple gaming stations creates a micro data center situation. Multiple display zones: 100″ projector for party gaming, 65″ OLED per station for competitive play. Full acoustic panel treatment (GIK Acoustics 244 panels) for multi-player noise containment.',
    },
    pc: {
      small: '💻 PC Gaming — Small DFW Room: 2.5GbE NIC in your gaming PC + 2.5GbE switch (, TP-Link TL-SG105-M2) — DFW ISPs now offer multi-gig. Single CAT6A run for full bandwidth. PC hardware in a small DFW room: tower generates 400-800W heat. Add a wall-mounted rack fan () to push hot air toward ceiling. Power conditioner (Furman M-8X2, ) protects from DFW ERCOT voltage fluctuations — TX grid surges are real. 32″ 4K 144Hz monitor (ASUS ROG Swift, ) is DFW competitive gamer standard.',
      medium: '💻 PC Gaming — Medium DFW Room: Dual PC setup (streaming PC + gaming PC)? Run two dedicated CAT6 jacks. Each PC on separate 20A circuit — DFW electrician cost -280/circuit. Power conditioner with surge suppression for each station (APC S15BLK, ). Cooling: exhaust fan mounted in wall or ceiling to push gaming PC heat outside the conditioned DFW room. Acoustic panels on three walls — DFW neighbor proximity at night means mic isolation matters. Elgato Wave Link for audio routing.',
      large: '💻 PC Gaming — Large DFW Room: Structured wiring approach: 10GbE switch for NAS + gaming PCs + streaming hardware. Dedicated 30A sub-panel in gaming room. Two wall-mounted exhaust fans controlled by smart thermostat — automatically activate when room hits 75°F (DFW baseline in summer gaming sessions). Rackmount UPS (CyberPower OL2200RTXL2Ua, ) conditions power and protects K+ hardware from ERCOT events. Acoustic booth corner for streaming mic work.',
    },
    mixed: {
      small: '🕹️ Mixed Console + PC — Small DFW Room: KVM switch (Level1Techs 4K60, ) shares single monitor between gaming PC and console. One CAT6 jack + unmanaged switch covers all devices. Power strip with surge protection (Tripp Lite TLP808TELTV) handles DFW power events. Small room challenge: heat from PC tower + console simultaneously = 1,000+ BTU. Position the most-used device near the single HVAC vent. Standing desk with cable management spine keeps DFW humidity from corroding exposed ports.',
      medium: '🕹️ Mixed Console + PC — Medium DFW Room: Dedicated display per platform: 32″ 4K 165Hz for PC (ASUS ProArt), 65″ OLED for console. CAT6 to each device position from a single TP-Link 8-port switch. Add an exhaust fan on a smart plug — Kasa EP25 triggers when room temp exceeds 74°F (DFW gaming season May-October). Power conditioner per zone (PC zone separate from console zone) — DFW lightning season creates voltage spikes even with whole-home surge protection.',
      large: '🕹️ Mixed Console + PC — Large DFW Room: Full AV matrix (Monoprice Blackbird 8x8 HDMI, ) routes any source to any display. Each gaming position gets dedicated CAT6 + 20A circuit. Dedicated mini-split (Mitsubishi MFZ-KJ09NA wall unit, ,800 installed) keeps DFW gaming room at 68°F regardless of outdoor temps. Full acoustic treatment (GIK Acoustics full room kit, -900) for late-night DFW gaming without neighbor complaints. Structured wiring panel with patch bay for clean cable management.',
    },
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎮</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Gaming Room Setup Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>Dedicated gaming rooms built for Dallas-Fort Worth homes and ERCOT summers</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 32 }}>
          {[
            { icon: '📶', title: 'Dedicated Ethernet', desc: 'No WiFi for competitive gaming. Single CAT6 run from router eliminates DFW neighborhood WiFi congestion entirely.' },
            { icon: '⚡', title: 'Power Conditioning', desc: 'ERCOT grid events and DFW lightning season are real. Surge suppression + power conditioning protects every rig.' },
            { icon: '❄️', title: 'Cooling First', desc: 'DFW gaming rooms in summer are mini data centers. Budget for exhaust fans or mini-splits before furniture.' },
            { icon: '🔇', title: 'Acoustic Panels', desc: 'DFW neighborhood density makes late-night gaming a neighbor issue. First-reflection panels cut sound transmission.' },
          ].map((item) => (
            <div key={item.title} style={{ background: '#1e2d45', borderRadius: 12, padding: 18, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 14, marginBottom: 4 }}>{item.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20 }}>🔍 Design My DFW Gaming Room</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94a3b8', display: 'block', marginBottom: 8 }}>Gaming Setup Type</label>
              <select value={setup} onChange={(e) => setSetup(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #334155′ }}>
                <option value=''>Select setup...</option>
                <option value='console'>Console gaming (PS5, Xbox, Switch)</option>
                <option value='pc'>PC gaming (desktop gaming rig)</option>
                <option value='mixed'>Mixed (PC + console in same room)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', display: 'block', marginBottom: 8 }}>Room Size</label>
              <select value={roomSize} onChange={(e) => setRoomSize(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #334155′ }}>
                <option value=''>Select size...</option>
                <option value='small'>Small (bedroom / under 150 sq ft)</option>
                <option value='medium'>Medium (bonus room / 150-300 sq ft)</option>
                <option value='large'>Large (dedicated room / 300+ sq ft)</option>
              </select>
            </div>
          </div>
          <button onClick={() => setResult(guides[setup]?.[roomSize] || '')} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Build My Gaming Room Guide 🎮</button>
          {result && <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, color: '#e2e8f0', lineHeight: 1.8, borderLeft: '3px solid #F5E642′ }}>{result}</div>}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🔧</div>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>ProLnk DFW Low-Voltage & Electrical Pros</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>CAT6 runs, dedicated circuits, mini-split installs — get quotes from DFW gaming room specialists</div>
        </div>
      </div>
    </div>
  );
}