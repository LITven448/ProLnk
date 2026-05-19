import { useState } from 'react';

type RoomKey = 'living' | 'bedroom' | 'kitchen' | 'bathroom';
type LightKey = 'poor' | 'moderate' | 'good';

interface LightingPlan {
  plan: string[];
  bulbs: string[];
  cost: string;
}

const lightingPlans: Record<RoomKey, Record<LightKey, LightingPlan>> = {
  living: {
    poor: {
      plan: ['Add 2 floor lamps in dark corners', 'Replace overhead bulbs with 2700K warm white (800+ lumens)', 'Open all blinds/curtains fully — remove heavy drapes', 'Add table lamp to any surface over 3 feet wide', 'Use dimmer on overhead for photography'],
      bulbs: ['GE Soft White 60W equiv (2700K) — 6 pack ~$12', 'Floor lamp with 3-way bulb for corners', 'Smart bulbs optional but helpful for showing control'],
      cost: '$80–150 total for full living room lighting upgrade',
    },
    moderate: {
      plan: ['Replace any cool/daylight bulbs (5000K+) with warm white', 'Add one floor lamp to balance lighting', 'Clean all light fixtures and replace any dead bulbs', 'Use DFW morning sun — schedule showings 10am–2pm when possible'],
      bulbs: ['Philips Warm White LED 2700K — replace all mismatched bulbs', 'One accent lamp for reading area'],
      cost: '$40–80 for bulb replacement and one lamp',
    },
    good: {
      plan: ['Ensure all bulbs match in color temperature (2700K throughout)', 'Turn on every light for photography', 'Clean fixtures — dust diffuses light by 15–20%', 'Use DFW sunshine strategically — photograph 10am–noon'],
      bulbs: ['Check all bulbs are same brand/temp — mixed lighting photographs poorly'],
      cost: '$20–40 for any replacements needed',
    },
  },
  bedroom: {
    poor: {
      plan: ['Add bedside lamps on both nightstands', 'Replace overhead with warm white if ceiling light exists', 'Remove blackout curtains for photography (replace after)', 'Add floor lamp in corner if room is large', 'Open all window treatments'],
      bulbs: ['Matching bedside lamp set with 2700K bulbs', '40W equiv for bedside — not too bright'],
      cost: '$100–180 for two lamp sets + overhead bulbs',
    },
    moderate: {
      plan: ['Match all bulbs to same color temp', 'Add second nightstand lamp if missing', 'Pull back curtains to maximum during showings', 'Clean ceiling fan light cover if present'],
      bulbs: ['2700K LED candelabra for bedside lamps if applicable'],
      cost: '$30–60',
    },
    good: {
      plan: ['Turn on all lights including closet for photography', 'Ensure window treatments are fully open', 'Replace any flickering or dim bulbs immediately'],
      bulbs: ['Minor replacements only'],
      cost: '$15–30',
    },
  },
  kitchen: {
    poor: {
      plan: ['Under-cabinet lighting is highest ROI kitchen upgrade ($60–120)', 'Replace fluorescent tubes with warm LED tubes (2700K)', 'Add pendant lights over island if missing (buyer expectation in DFW)', 'Maximize natural light — remove window treatments over sink'],
      bulbs: ['LED strip under-cabinet lights (plug-in, no electrician needed)', 'GE LED tube replacements for fluorescent', 'Pendant bulb: Edison or G25 globe at 2700K'],
      cost: '$120–250 for under-cabinet + tube replacement',
    },
    moderate: {
      plan: ['Add under-cabinet lighting if not present', 'Replace any cool daylight bulbs', 'Clean pendant shades — grease accumulates and dims output'],
      bulbs: ['Under-cabinet LED strip set', '2700K replacements as needed'],
      cost: '$60–120',
    },
    good: {
      plan: ['Deep clean all fixtures', 'Ensure under-cabinet lights are on for photography', 'Turn on all pendant and overhead lights simultaneously'],
      bulbs: ['Match any mismatched bulbs only'],
      cost: '$20–40',
    },
  },
  bathroom: {
    poor: {
      plan: ['Vanity lighting is critical — replace Hollywood strip with modern vanity bar', 'Use 90+ CRI bulbs for flattering accurate color', 'Add LED strip behind mirror if vanity allows', 'Clean all glass fixtures — soap film kills output'],
      bulbs: ['GE Reveal 2700K (90 CRI) for vanity — makes bathroom look crisp not yellow', 'Vanity bar replacement: $60–150 at Home Depot'],
      cost: '$80–200 for vanity upgrade + bulbs',
    },
    moderate: {
      plan: ['Replace any non-CRI bulbs in vanity with 90+ CRI versions', 'Ensure exhaust fan light is working', 'Clean mirror and fixture glass thoroughly'],
      bulbs: ['GE Reveal or Sylvania Natural bulbs (2700–3000K, 90+ CRI)'],
      cost: '$30–60',
    },
    good: {
      plan: ['Turn on all lights for photography including nightlight if decorative', 'Ensure all bulbs match in color temperature'],
      bulbs: ['Minor replacements only'],
      cost: '$15–25',
    },
  },
};

export default function DFWStagingLightingGuide() {
  const [room, setRoom] = useState<RoomKey | ''>('');
  const [lighting, setLighting] = useState<LightKey | ''>('');

  const result = room && lighting ? lightingPlans[room]?.[lighting] : null;

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 24 }}>
          <div style={{ fontSize: 36 }}>💡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Staging Lighting Guide</h1>
          <p style={{ color: '#CBD5E1', fontSize: 15, margin: 0 }}>DFW sunshine is your greatest staging asset — but most homes show poorly at night or on cloudy days. Fix the lighting, sell faster.</p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 20, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>☀️ DFW Lighting Reality</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              ['DFW homes are often under-lit for showings — especially north-facing rooms', '⚠️'],
              ['2700K warm white is the standard — cool daylight bulbs make homes feel clinical', '🌡️'],
              ['Schedule showings 10am–2pm to leverage DFW\’s signature sunshine', '🌞'],
              ['Under-cabinet kitchen lighting is the highest ROI lighting upgrade in DFW listings', '🏆'],
            ].map(([tip, icon], i) => (
              <div key={i} style={{ backgroundColor: '#F8FAFC', borderRadius: 8, padding: 12, border: '1px solid #E2E8F0′ }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <p style={{ color: '#475569', fontSize: 13, margin: '6px 0 0′ }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 20, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Get Your Lighting Plan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#374151', fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 6 }}>Room Type</label>
              <select value={room} onChange={e => setRoom(e.target.value as RoomKey)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 14 }}>
                <option value="">Select room...</option>
                <option value="living">Living Room</option>
                <option value="bedroom">Bedroom</option>
                <option value="kitchen">Kitchen</option>
                <option value="bathroom">Bathroom</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#374151', fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 6 }}>Current Lighting</label>
              <select value={lighting} onChange={e => setLighting(e.target.value as LightKey)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 14 }}>
                <option value="">Select current state...</option>
                <option value="poor">Poor — dark, dim, or harsh</option>
                <option value="moderate">Moderate — some issues</option>
                <option value="good">Good — generally well lit</option>
              </select>
            </div>
          </div>

          {result && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
              <div style={{ backgroundColor: '#FEFCE8', borderRadius: 8, padding: 16, border: '1px solid #FDE047′ }}>
                <div style={{ color: '#713F12', fontWeight: 700, fontSize: 14, marginBottom: 10 }}>📋 Lighting Action Plan</div>
                {result.plan.map((item, i) => (
                  <div key={i} style={{ color: '#374151', fontSize: 13, marginBottom: 8, display: 'flex', gap: 8 }}>
                    <span style={{ color: '#F5E642', fontWeight: 700 }}>{i + 1}.</span> {item}
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ backgroundColor: '#EFF6FF', borderRadius: 8, padding: 16, border: '1px solid #BFDBFE' }}>
                  <div style={{ color: '#1D4ED8', fontWeight: 700, fontSize: 14, marginBottom: 10 }}>💡 Recommended Bulbs</div>
                  {result.bulbs.map((b, i) => <div key={i} style={{ color: '#374151', fontSize: 13, marginBottom: 6 }}>• {b}</div>)}
                </div>
                <div style={{ backgroundColor: '#F0FDF4', borderRadius: 8, padding: 16, border: '1px solid #BBF7D0′ }}>
                  <div style={{ color: '#15803D', fontWeight: 700, fontSize: 14, marginBottom: 10 }}>💰 Estimated Cost</div>
                  <div style={{ color: '#374151', fontSize: 15, fontWeight: 600 }}>{result.cost}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, margin: '0 0 4px' }}>📸 Photography Day Rule</p>
          <p style={{ color: '#CBD5E1', fontSize: 13, margin: 0 }}>Turn on every single light in the home 30 minutes before the photographer arrives. Every lamp, every overhead, every under-cabinet strip. Do not rely on auto settings.</p>
        </div>
      </div>
    </div>
  );
}
