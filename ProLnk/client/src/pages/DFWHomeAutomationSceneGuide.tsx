import { useState } from 'react';

const scenes = [
  {
    name: 'Good Morning DFW Summer',
    emoji: '☀️',
    trigger: 'Weekday 6:30 AM',
    season: 'summer',
    actions: [
      'Set thermostat to 74°F (pre-cool before 9 AM rate spike)',
      'Close west and south-facing motorized blinds (block morning heat gain)',
      'Turn on ceiling fans (all rooms) — feels 4°F cooler',
      'Turn on kitchen lights to 80%',
      'Start coffee maker (smart plug)',
    ],
    devices: ['Smart thermostat', 'Motorized blinds', 'Smart fans/switches', 'Smart plug'],
    cost: '$400–$900',
    savings: '~$35/mo cooling savings',
  },
  {
    name: 'Leaving Home',
    emoji: '🚗',
    trigger: 'Presence detection / manual',
    season: 'all',
    actions: [
      'Set thermostat to 82°F (summer) or 65°F (winter)',
      'Turn off all non-essential lights',
      'Lock all smart locks',
      'Arm security system',
      'Close garage door (if open for 5+ min)',
    ],
    devices: ['Smart thermostat', 'Smart switches', 'Smart locks', 'Security system', 'Smart garage'],
    cost: '$600–$1,500',
    savings: '~$45/mo energy savings',
  },
  {
    name: 'Incoming DFW Storm',
    emoji: '⛈️',
    trigger: 'NOAA storm alert (automated)',
    season: 'spring/fall',
    actions: [
      'Close all motorized blinds and outdoor shades (hail + wind protection)',
      'Retract any motorized awnings',
      'Set thermostat to 72°F (pre-condition before power outage risk)',
      'Activate outdoor lighting (visibility during storm)',
      'Send phone notification: "Storm incoming — check outdoor furniture"',
    ],
    devices: ['Motorized blinds/shades', 'Smart thermostat', 'Smart switches', 'Phone notification (hub)'],
    cost: '$800–$2,500',
    savings: 'Prevents hail/wind damage to blinds and awnings',
  },
  {
    name: 'Movie Mode',
    emoji: '🎬',
    trigger: 'Voice or button',
    season: 'all',
    actions: [
      'Dim living room lights to 15%',
      'Close blinds (block glare)',
      'Set thermostat to 70°F',
      'Turn on LED bias lighting behind TV',
      'Silence smart doorbell notifications',
    ],
    devices: ['Smart dimmers', 'Motorized blinds', 'Smart thermostat', 'Smart plug (bias light)', 'Video doorbell'],
    cost: '$300–$700',
    savings: 'Comfort — no direct ROI',
  },
  {
    name: 'DFW Summer Night',
    emoji: '🌙',
    trigger: 'Sunset or 9 PM',
    season: 'summer',
    actions: [
      'Open east-facing windows if below 80°F outside (natural cool air)',
      'Set ceiling fans to reverse / low speed',
      'Set thermostat to 76°F overnight (savings vs 72°F = ~$18/mo)',
      'Activate outdoor security lights',
      'Dim indoor lights to 20% (wind-down signal)',
    ],
    devices: ['Smart thermostat', 'Smart fans', 'Smart switches', 'Motion outdoor lights'],
    cost: '$250–$600',
    savings: '~$18–$30/mo overnight cooling savings',
  },
];

const lifestyles = ['Early Riser', 'Work From Home', 'Family with Kids', 'Frequent Traveler', 'Night Owl'];

export default function DFWHomeAutomationSceneGuide() {
  const [lifestyle, setLifestyle] = useState('');
  const [season, setSeason] = useState('summer');
  const [result, setResult] = useState<string | null>(null);

  function getScenes() {
    const relevant = scenes.filter(s => s.season === 'all' || s.season === season || season === 'all');
    const budget = relevant.reduce((acc, s) => acc + parseInt(s.cost.replace(/[^0-9]/g, '')), 0);
    const topScenes = relevant.slice(0, 3).map(s => s.name).join(', ');
    const lifestyleNote = lifestyle === 'Work From Home' ? ' WFH tip: add "Focus Mode" scene — DND on doorbell, optimal lighting color temp, thermostat to 71°F.' : lifestyle === 'Frequent Traveler' ? ' Traveler tip: "Away" + "Vacation Lighting" scenes simulate occupancy — key for DFW neighborhoods with package theft.' : lifestyle === 'Family with Kids' ? ' Family tip: add "Homework Mode" (bright cool light) and "Bedtime" (dim warm light + thermostat setback) scenes.' : '';
    setResult(`Top scenes for ${season} / ${lifestyle || 'your home'}: ${topScenes}. Estimated setup budget: $${Math.round(budget * 0.8).toLocaleString()}–$${Math.round(budget * 1.8).toLocaleString()} for all scenes.${lifestyleNote} Start with Leaving Home and Good Morning — highest ROI, lowest cost.`);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui', padding: '32px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13 }}>🏠 DFW Smart Home Guide</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Home Automation Scene Guide for DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>
          Scenes turn your smart home into a system that reacts to DFW's extreme seasons — scorching summers, ice storms, tornado warnings, and everything in between.
        </p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 40 }}>
          {scenes.map(s => (
            <div key={s.name} style={{ background: '#0D1F35', borderRadius: 10, padding: '20px 24px', border: '1px solid #1E3A5F' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ fontWeight: 700, fontSize: 17 }}>{s.emoji} {s.name}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ background: '#F5E64215', color: '#F5E642', fontSize: 11, padding: '3px 10px', borderRadius: 99, fontWeight: 600 }}>{s.cost}</div>
                  <div style={{ background: '#16A34A20', color: '#4ADE80', fontSize: 11, padding: '3px 10px', borderRadius: 99, fontWeight: 600 }}>{s.savings}</div>
                </div>
              </div>
              <div style={{ color: '#64748B', fontSize: 12, marginBottom: 10 }}>⏱ Trigger: {s.trigger}</div>
              <div style={{ display: 'grid', gap: 4, marginBottom: 12 }}>
                {s.actions.map((a, i) => (
                  <div key={i} style={{ color: '#CBD5E1', fontSize: 13, display: 'flex', gap: 8 }}>
                    <span style={{ color: '#F5E642' }}>→</span>
                    <span>{a}</span>
                  </div>
                ))}
              </div>
              <div style={{ color: '#475569', fontSize: 12 }}>Devices needed: {s.devices.join(', ')}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D1F35', borderRadius: 12, padding: '28px', border: '1px solid #1E3A5F', marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>🔧 Get Your Scene Recommendations</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#CBD5E1', fontSize: 13, marginBottom: 8 }}>Your Lifestyle</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {lifestyles.map(l => (
                <button key={l} onClick={() => setLifestyle(l)} style={{ padding: '8px 16px', borderRadius: 8, border: `2px solid ${lifestyle === l ? '#F5E642' : '#1E3A5F'}`, background: lifestyle === l ? '#F5E64220' : 'transparent', color: lifestyle === l ? '#F5E642' : '#94A3B8', cursor: 'pointer', fontWeight: 600, fontSize: 12 }}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#CBD5E1', fontSize: 13, marginBottom: 8 }}>DFW Season Focus</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[['summer', '☀️ Summer'], ['winter', '❄️ Winter'], ['spring', '⛈️ Storm Season'], ['all', '🔄 All Year']].map(([v, l]) => (
                <button key={v} onClick={() => setSeason(v)} style={{ padding: '8px 16px', borderRadius: 8, border: `2px solid ${season === v ? '#F5E642' : '#1E3A5F'}`, background: season === v ? '#F5E64220' : 'transparent', color: season === v ? '#F5E642' : '#94A3B8', cursor: 'pointer', fontWeight: 600, fontSize: 12 }}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          <button onClick={getScenes} style={{ background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Get My DFW Scene Plan →
          </button>
          {result && (
            <div style={{ marginTop: 20, background: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 8, padding: '16px 20px', color: '#E8EDF5', fontSize: 14, lineHeight: 1.6 }}>
              {result}
            </div>
          )}
        </div>

        <div style={{ color: '#475569', fontSize: 12, textAlign: 'center' }}>ProLnk · DFW Smart Home Guides · Automation scenes built for North Texas weather and lifestyle</div>
      </div>
    </div>
  );
}
