import { useState } from 'react';

type RoomFn = 'living' | 'kitchen' | 'bedroom' | 'office' | 'bathroom';
type Light = 'north' | 'south' | 'east' | 'west';

const roomFunctions: { id: RoomFn; label: string; icon: string }[] = [
  { id: 'living', label: 'Living Room', icon: '🛋️' },
  { id: 'kitchen', label: 'Kitchen', icon: '🍳' },
  { id: 'bedroom', label: 'Bedroom', icon: '🛏️' },
  { id: 'office', label: 'Home Office', icon: '💻' },
  { id: 'bathroom', label: 'Bathroom', icon: '🚿' },
];

const lightDirections: { id: Light; label: string }[] = [
  { id: 'north', label: 'North-Facing' },
  { id: 'south', label: 'South-Facing' },
  { id: 'east', label: 'East-Facing' },
  { id: 'west', label: 'West-Facing' },
];

type RecommendationKey = `${RoomFn}-${Light}`;

const recommendations: Record<RecommendationKey, { family: string; colors: string[]; avoid: string; tip: string }> = {
  'living-north': { family: 'Warm Whites & Creams', colors: ['SW Alabaster', 'BM White Dove', 'Sherwin Navajo White'], avoid: 'Cool grays — they read icy in north light', tip: 'Add warmth with lamps and amber-toned accessories to compensate for flat north light' },
  'living-south': { family: 'Warm Neutrals & Terracotta', colors: ['BM Revere Pewter', 'SW Accessible Beige', 'Farrow Elephant Breath'], avoid: 'Bright whites — DFW south sun will wash them out', tip: 'South-facing DFW rooms get intense afternoon glare — use warm mid-tones that absorb rather than reflect' },
  'living-east': { family: 'Soft Blues & Greens', colors: ['SW Rainwashed', 'BM Sea Salt', 'PPG Aged Gray'], avoid: 'Orange-reds — they fight with morning light', tip: 'East light is warm and golden in the morning — cooler hues balance beautifully' },
  'living-west': { family: 'Muted Terracotta & Dusty Rose', colors: ['SW Worn Terracotta', 'BM Hale Navy (accent)', 'Farrow Mole’s Breath'], avoid: 'Yellows — DFW west sun is intense and yellows go garish', tip: 'West-facing rooms get the harshest DFW afternoon sun — test your color at 4pm before committing' },
  'kitchen-north': { family: 'Warm Yellow-Whites', colors: ['BM Linen White', 'SW Creamy', 'BM Simply White'], avoid: 'Stark white — looks clinical in north light', tip: 'Warm undertones in white make north-facing kitchens feel sunny even on cloudy DFW days' },
  'kitchen-south': { family: 'Sage Green & Warm Gray', colors: ['SW Pewter Green', 'BM Newburyport Blue', 'Farrow Mizzle'], avoid: 'Bright accent colors — south sun amplifies everything', tip: 'Muted cabinet colors ground south-facing DFW kitchens; let the countertops and hardware shine' },
  'kitchen-east': { family: 'Clean Whites & Soft Blues', colors: ['BM Chantilly Lace', 'SW Reflecting Pool', 'Farrow All White'], avoid: 'Dark colors — east morning light is your friend', tip: 'East kitchens glow at breakfast — keep it light and bright to maximize the natural light gift' },
  'kitchen-west': { family: 'Deep Navy & Forest Green', colors: ['SW Naval', 'BM Newburyport Blue', 'Farrow Hague Blue'], avoid: 'Warm yellows and oranges — west sun makes them overwhelming', tip: 'Bold, cool cabinet colors balance DFW\’s intense western afternoon sun in the kitchen' },
  'bedroom-north': { family: 'Warm Blush & Peach', colors: ['SW Blushing', 'BM Peach Amber', 'Farrow Setting Plaster'], avoid: 'Cold blues — they feel depressing in low north light', tip: 'Go warmer than you think in north-facing DFW bedrooms — the light will cool it down naturally' },
  'bedroom-south': { family: 'Soft Lavender & Cool Blue-Gray', colors: ['BM Pale Smoke', 'SW Sedate Gray', 'Farrow Mizzle'], avoid: 'Warm oranges — south sun and warm bedroom = too stimulating for sleep', tip: 'Cool, calming hues counter DFW south sun energy for better sleep environment' },
  'bedroom-east': { family: 'Soft Peach & Warm Ivory', colors: ['BM Pale Oak', 'SW Antique White', 'PPG Cream Puff'], avoid: 'Saturated colors — morning sun hits hard in DFW east rooms', tip: 'Soft warm tones wake up beautifully with DFW east morning light' },
  'bedroom-west': { family: 'Deep Teal & Dusty Blue', colors: ['SW Smoky Blue', 'BM Van Deusen Blue', 'Farrow Vardo'], avoid: 'Bright warm colors — west evening sun makes them feel activating at bedtime', tip: 'Deep, cool colors help wind down in west-facing DFW bedrooms hit by evening sun' },
  'office-north': { family: 'Warm Olive & Mustard', colors: ['BM Saybrook Sage', 'SW Avocado', 'Farrow Mole’s Breath'], avoid: 'Grays — they kill focus and feel bleak in north light', tip: 'Warm, earthy hues maintain energy and focus in naturally dim north-facing DFW offices' },
  'office-south': { family: 'Soft Green & Blue-Gray', colors: ['SW Rainwashed', 'BM Newburyport Blue', 'Farrow Card Room Green'], avoid: 'High-contrast darks — south sun with dark walls creates harsh glare', tip: 'Calming, mid-value hues reduce DFW south sun screen glare in home offices' },
  'office-east': { family: 'Energizing Citrine & Warm Yellow', colors: ['SW Confident Yellow', 'BM Firefly', 'Farrow Dayroom Yellow'], avoid: 'Moody darks — waste the natural morning light gift', tip: 'East-facing DFW offices get great morning light for focus work — bright hues maximize it' },
  'office-west': { family: 'Sage Green & Warm White', colors: ['SW Rosemary', 'BM Aganthus Green', 'Farrow Mizzle'], avoid: 'Red and orange — west DFW sun makes them feel aggressive by afternoon', tip: 'Green hues reduce eye strain from DFW afternoon western sun on screens' },
  'bathroom-north': { family: 'Warm Taupe & Cream', colors: ['BM Fossil', 'SW Accessible Beige', 'Farrow String'], avoid: 'Pure white — it reads gray in north bathrooms', tip: 'Warm undertones in taupe make small north-facing DFW bathrooms feel spa-like not clinical' },
  'bathroom-south': { family: 'Crisp White & Mint', colors: ['BM Chantilly Lace', 'SW Mint Condition', 'Farrow All White'], avoid: 'Warm yellows — south sun amplifies yellow tones and looks dated', tip: 'South-facing DFW bathrooms can carry crisp whites and cool hues beautifully' },
  'bathroom-east': { family: 'Soft Seafoam & Pale Aqua', colors: ['BM Sea Salt', 'SW Tidewater', 'Farrow Borrowed Light'], avoid: 'Warm oranges — east morning light fights warm bathroom hues', tip: 'Aqua and seafoam tones are at their best in east morning light — a DFW favorite for primary baths' },
  'bathroom-west': { family: 'Deep Charcoal & Navy', colors: ['SW Peppercorn', 'BM Hale Navy', 'Farrow Railings'], avoid: 'Pale pastels — west DFW light washes them out to nothing', tip: 'Bold, dark powder bath or guest bath colors make a dramatic statement in west-facing DFW rooms' },
};

export default function DFWColorPsychologyGuide() {
  const [room, setRoom] = useState<RoomFn>('living');
  const [light, setLight] = useState<Light>('south');
  const key: RecommendationKey = `${room}-${light}`;
  const rec = recommendations[key];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <p style={{ color: '#F5E642', fontWeight: 700, letterSpacing: 2, fontSize: 12, textTransform: 'uppercase', marginBottom: 8 }}>🎨 DFW Color Science</p>
        <h1 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>Color Psychology for DFW Homes</h1>
        <p style={{ fontSize: 16, color: '#9BB0CC', lineHeight: 1.7, marginBottom: 40, maxWidth: 680 }}>
          DFW's intense sun makes warm colors look <em>even warmer</em> and amplifies every mistake. Direction matters more here than almost anywhere in the country. Always test paint samples in your actual DFW light.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 11, color: '#F5E642', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>🏠 Room Function</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {roomFunctions.map(r => (
                <button key={r.id} onClick={() => setRoom(r.id)} style={{ padding: '10px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left', background: room === r.id ? '#F5E642′ : ’rgba(255,255,255,0.08)', color: room === r.id ? '#0A1628′ : '#ccc', transition: ’all 0.2s' }}>
                  {r.icon} {r.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 11, color: '#F5E642', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>☀️ Light Exposure</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {lightDirections.map(l => (
                <button key={l.id} onClick={() => setLight(l.id)} style={{ padding: '10px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left', background: light === l.id ? '#F5E642′ : ’rgba(255,255,255,0.08)', color: light === l.id ? '#0A1628′ : '#ccc', transition: ’all 0.2s' }}>
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(245,230,66,0.06)', border: '1px solid rgba(245,230,66,0.2)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <div style={{ fontSize: 11, color: '#F5E642', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Recommended Color Family</div>
          <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 20 }}>{rec.family}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {rec.colors.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#F5E642', flexShrink: 0 }} />
                <span style={{ fontSize: 15, color: '#ddd' }}>{c}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: '14px 18px', background: 'rgba(255,80,80,0.1)', borderRadius: 10, marginBottom: 12, borderLeft: '3px solid #ff6666′ }}>
            <span style={{ fontSize: 12, color: '#ff9999', fontWeight: 700 }}>❌ AVOID: </span>
            <span style={{ fontSize: 14, color: '#ffcccc' }}>{rec.avoid}</span>
          </div>
          <div style={{ padding: '14px 18px', background: 'rgba(245,230,66,0.08)', borderRadius: 10, borderLeft: '3px solid #F5E642′ }}>
            <span style={{ fontSize: 12, color: '#F5E642', fontWeight: 700 }}>💡 DFW TIP: </span>
            <span style={{ fontSize: 14, color: '#ddd' }}>{rec.tip}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
