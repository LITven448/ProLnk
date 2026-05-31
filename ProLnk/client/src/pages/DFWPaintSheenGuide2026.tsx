import { useState } from 'react';

export default function DFWPaintSheenGuide2026() {
  const [room, setRoom] = useState('living');

  const getSheen = () => {
    const map: Record<string, { sheen: string; why: string; brands: string }> = {
      ceiling: { sheen: 'Flat / Matte', why: 'Hides ceiling imperfections. Any sheen will highlight drywall texture and fastener pops on DFW ceilings.', brands: 'SW Ceiling Flat, Behr Premium Ceiling' },
      living: { sheen: 'Eggshell', why: 'Low sheen hides surface imperfections while allowing gentle cleaning. Standard for DFW living rooms and bedrooms.', brands: 'SW Emerald Eggshell, PPG Diamond Eggshell' },
      bedroom: { sheen: 'Eggshell', why: 'Same logic as living rooms — soft sheen, easier to touch up than satin.', brands: 'SW Emerald Eggshell, Behr Marquee Eggshell' },
      kitchen: { sheen: 'Satin', why: 'DFW kitchens need washable walls. Satin cleans without looking plasticky. Avoid eggshell behind stoves.', brands: 'SW Emerald Satin, PPG Diamond Satin' },
      bathroom: { sheen: 'Satin', why: 'DFW humidity requires satin minimum in bathrooms. Semi-gloss also works. Flat will grow mold rapidly.', brands: 'SW Emerald Bath Satin, Zinsser Perma-White' },
      trim: { sheen: 'Semi-Gloss', why: 'DFW standard for all trim, doors, and millwork. Wipes clean, reflects light, holds up to daily wear.', brands: 'SW Emerald Urethane Trim Enamel, PPG Break-Through' },
    };
    return map[room] || map.living;
  };

  const rec = getSheen();

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 14, fontWeight: 700 }}>🎨 DFW PAINTING GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Paint Sheen Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Choosing the right sheen for every room in your Dallas-Fort Worth home - flat to gloss explained.</p>

        <div style={{ backgroundColor: '#111f38', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚙️ Room Type → Sheen Recommendation</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8' }}>Select Room</label>
            <select value={room} onChange={e => setRoom(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 14 }}>
              <option value="ceiling">Ceiling</option>
              <option value="living">Living Room</option>
              <option value="bedroom">Bedroom</option>
              <option value="kitchen">Kitchen</option>
              <option value="bathroom">Bathroom</option>
              <option value="trim">Trim / Doors / Millwork</option>
            </select>
          </div>
          <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ Use {rec.sheen}</div>
            <div style={{ marginBottom: 6, fontSize: 14, color: '#94a3b8' }}>{rec.why}</div>
            <div><strong>Brands:</strong> {rec.brands}</div>
          </div>
        </div>

        {[
          { icon: '📊', title: 'DFW Sheen Spectrum', body: 'Flat → Matte → Eggshell → Satin → Semi-Gloss → Gloss. Each step increases washability and light reflection. DFW homes rarely use gloss on walls — it shows every imperfection. Semi-gloss stays on trim and cabinets only.' },
          { icon: '💦', title: 'Sheen and DFW Humidity', body: 'North Texas summer humidity affects how sheens appear. Higher sheen handles humidity better and resists mold. Bathrooms and laundry rooms must use satin or higher — flat and eggshell absorb moisture and fail within 1-2 years.' },
          { icon: '🔧', title: 'Touch-Up Reality in DFW', body: `Eggshell touch-up is easier than satin — slightly flatter sheen blends better. Satin touch-ups show if not blended carefully. If easy touch-up matters (rental properties, kids' rooms), choose eggshell over satin for walls.` },
        ].map((card, i) => (
          <div key={i} style={{ backgroundColor: '#111f38', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{card.icon} {card.title}</div>
            <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{card.body}</p>
          </div>
        ))}

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, color: '#0A1628', textAlign: 'center' }}>
          <div style={{ fontSize: 20, marginBottom: 8 }}>🖌️</div>
          <div style={{ fontWeight: 800, marginBottom: 4 }}>Need a DFW Painting Pro?</div>
          <div style={{ fontSize: 13 }}>ProLnk connects you with vetted local painters - free quotes, verified reviews.</div>
        </div>
      </div>
    </div>
  );
}

