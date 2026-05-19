import { useState } from 'react';

type RoomType = 'kitchen' | 'living' | 'dining' | 'bedroom' | 'bathroom' | 'outdoor';

const roomTypes: { id: RoomType; label: string; icon: string }[] = [
  { id: 'kitchen', label: 'Kitchen', icon: '🍳' },
  { id: 'living', label: 'Living Room', icon: '🛋️' },
  { id: 'dining', label: 'Dining Room', icon: '🍽️' },
  { id: 'bedroom', label: 'Bedroom', icon: '🛏️' },
  { id: 'bathroom', label: 'Bathroom', icon: '🪞' },
  { id: 'outdoor', label: 'Outdoor Space', icon: '🌿' },
];

const lightingPlans: Record<RoomType, {
  ambient: string; task: string; accent: string;
  recommended: string[]; cost: string; dfwNote: string;
}> = {
  kitchen: {
    ambient: 'Recessed LED grid (4–6 inch, 3000K) — 1 per 25 sq ft',
    task: 'Under-cabinet LED strips (warm white) + pendant lights over island',
    accent: 'In-cabinet or toe-kick lighting for evening ambiance',
    recommended: ['6–8 recessed lights', '2–3 pendants over island', 'Under-cabinet LED strip', 'Dimmer on all circuits'],
    cost: '$1,800 – $6,500',
    dfwNote: 'DFW kitchens get intense afternoon sun — install dimmers for every circuit so you can compensate as light shifts throughout the day.',
  },
  living: {
    ambient: 'Recessed LED or semi-flush ceiling fixture + floor lamps',
    task: 'Reading lamps + directional recessed for seating areas',
    accent: 'Wall sconces + LED strip behind TV + artwork lighting',
    recommended: ['4–6 recessed with dimmers', 'Floor lamps in corners', 'Wall sconces flanking fireplace', 'Smart bulbs for scene control'],
    cost: '$1,200 – $4,500',
    dfwNote: 'DFW evenings are long and outdoor — when you come inside after outdoor entertaining, you want living room lighting to feel cozy and inviting. Layer everything on dimmers.',
  },
  dining: {
    ambient: 'Chandelier or drum pendant (centered over table)',
    task: 'Chandelier IS the task light — size it right (width = table width - 12 inches)',
    accent: 'Buffet lamps or wall sconces on dimmer for dinner ambiance',
    recommended: ['Statement chandelier (required)', 'Dimmer switch (mandatory)', 'Buffet/sideboard lamp', 'Candles for layering'],
    cost: '$800 – $5,000',
    dfwNote: 'A dining chandelier on a dimmer is the #1 DFW dinner party upgrade. DFW hosts entertain constantly — great dining lighting is essential.',
  },
  bedroom: {
    ambient: 'Ceiling fan with integrated light (essential in DFW) or flush mount',
    task: 'Bedside sconces or table lamps with 3-way bulbs',
    accent: 'LED strip behind headboard + closet lighting',
    recommended: ['Ceiling fan (mandatory for DFW summers)', 'Bedside sconces on dimmers', 'Nightlight in bathroom path', 'Smart bulbs for wake lighting'],
    cost: '$600 – $3,200',
    dfwNote: 'Ceiling fans are non-negotiable in DFW bedrooms — even with AC, they reduce perceived temperature and cut cooling costs. Choose a high-CFM fan for efficiency.',
  },
  bathroom: {
    ambient: 'Recessed LED (4 inch, 2700–3000K) or flush mount',
    task: 'Vanity lighting at eye level (not above mirror — eliminates shadows)',
    accent: 'LED strip under floating vanity + niche lighting in shower',
    recommended: ['Vanity sconces at eye level', '2–4 recessed for general light', 'Shower niche lighting', 'Nightlight on switch'],
    cost: '$700 – $3,500',
    dfwNote: 'Top-mounted vanity bars are a common DFW mistake — they cast shadows on your face. Side-mounted sconces at 60 inches AFF give flattering, shadow-free light.',
  },
  outdoor: {
    ambient: 'String lights + ceiling fan light on covered patio',
    task: 'Task lighting over outdoor kitchen + grill area',
    accent: 'Landscape uplighting on trees + pathway lights + pool lighting',
    recommended: ['Weatherproof ceiling fan + light', 'String lights on patio (mandatory)', 'Landscape uplighting (3–5 fixtures)', 'Smart timer for path lights'],
    cost: '$2,000 – $12,000',
    dfwNote: 'DFW outdoor living runs 9+ months. Outdoor lighting is not optional — it\’s an extension of your living space. The ROI on outdoor lighting in DFW rivals kitchen remodels.',
  },
};

export default function DFWLightingDesignGuide() {
  const [room, setRoom] = useState<RoomType>('kitchen');
  const [sqft, setSqft] = useState(200);
  const [ceilingHeight, setCeilingHeight] = useState(9);
  const plan = lightingPlans[room];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <p style={{ color: '#F5E642', fontWeight: 700, letterSpacing: 2, fontSize: 12, textTransform: 'uppercase', marginBottom: 8 }}>💡 DFW Lighting Guide</p>
        <h1 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>Lighting Design for DFW Homes</h1>
        <p style={{ fontSize: 16, color: '#9BB0CC', lineHeight: 1.7, marginBottom: 40, maxWidth: 680 }}>
          DFW has intense sunlight all day — and long, social evenings that demand cozy interior lighting. The secret is layering: ambient, task, and accent working together, all on dimmers.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
          {[
            { icon: '🔆', label: 'Ambient Light', sub: 'General room illumination — sets the base level' },
            { icon: '🎯', label: 'Task Light', sub: 'Focused light for specific activities' },
            { icon: '✨', label: 'Accent Light', sub: 'Mood, drama, and architectural highlight' },
          ].map(({ icon, label, sub }) => (
            <div key={label} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 18, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 12, color: '#9BB0CC' }}>{sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
          {roomTypes.map(r => (
            <button key={r.id} onClick={() => setRoom(r.id)} style={{ padding: '10px 20px', borderRadius: 100, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, background: room === r.id ? '#F5E642' : 'rgba(255,255,255,0.1)', color: room === r.id ? '#0A1628' : '#ccc', transition: 'all 0.2s' }}>
              {r.icon} {r.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          <div>
            <label style={{ fontSize: 12, color: '#9BB0CC', display: 'block', marginBottom: 6 }}>ROOM SIZE (sq ft)</label>
            <input type="number" value={sqft} min={50} max={1000} onChange={e => setSqft(Number(e.target.value))} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 16, boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: '#9BB0CC', display: 'block', marginBottom: 6 }}>CEILING HEIGHT (ft)</label>
            <input type="number" value={ceilingHeight} min={7} max={20} onChange={e => setCeilingHeight(Number(e.target.value))} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 16, boxSizing: 'border-box' }} />
          </div>
        </div>

        <div style={{ background: 'rgba(245,230,66,0.06)', border: '1px solid rgba(245,230,66,0.2)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>📋 Lighting Plan</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
            {[['🔆 Ambient', plan.ambient], ['🎯 Task', plan.task], ['✨ Accent', plan.accent]].map(([label, desc]) => (
              <div key={label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 13, minWidth: 90, paddingTop: 2 }}>{label}</div>
                <div style={{ fontSize: 14, color: '#ddd', lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Recommended Fixtures</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {plan.recommended.map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#F5E642', flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: '#ddd' }}>{r}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 11, color: '#F5E642', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Estimated Cost</div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{plan.cost}</div>
            </div>
            <div style={{ background: 'rgba(245,230,66,0.08)', borderRadius: 10, padding: 16, borderLeft: '3px solid #F5E642' }}>
              <div style={{ fontSize: 11, color: '#F5E642', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>🌞 DFW Note</div>
              <div style={{ fontSize: 13, color: '#ccc', lineHeight: 1.5 }}>{plan.dfwNote}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
