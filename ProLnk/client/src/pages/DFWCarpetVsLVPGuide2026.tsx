import { useState } from 'react';

type Room = { label: string; icon: string };
type Lifestyle = { label: string; icon: string };

const rooms: Room[] = [
  { label: 'Living Room', icon: '🛋️' },
  { label: 'Master Bedroom', icon: '🛏️' },
  { label: 'Kids Bedroom', icon: '👶' },
  { label: 'Kitchen', icon: '🍳' },
  { label: 'Bathroom', icon: '🚿' },
  { label: 'Home Office', icon: '💻' },
];

const lifestyles: Lifestyle[] = [
  { label: 'Pets', icon: '🐕' },
  { label: 'Young Kids', icon: '🧒' },
  { label: 'Clean Aesthetic', icon: '✨' },
  { label: 'High Traffic', icon: '👟' },
  { label: 'Allergies', icon: '🤧' },
  { label: 'Budget-Focused', icon: '💰' },
];

const getRecommendation = (room: string, lifestyle: string): string => {
  if (room === 'Bathroom' || room === 'Kitchen') return 'LVP is the only sensible choice — waterproof, easy to clean DFW clay/dust, handles DFW temperature swings. Carpet in bathrooms is a mold risk in DFW humidity. Cost: -5/sq ft installed.';
  if (lifestyle === 'Pets' || lifestyle === 'High Traffic') return 'LVP wins decisively. Pet claws, DFW red clay tracked in, and water bowls destroy carpet quickly. LVP with 12-mil wear layer handles all of it. Carpet retreats to low-traffic bedrooms only in pet homes.';
  if (lifestyle === 'Allergies') return 'LVP strongly recommended. DFW pollen season is brutal — carpet traps allergens, dust mites, and DFW red clay dust. LVP wipes clean. If you want carpet feel, use LVP with high-quality rug on top (easier to wash than wall-to-wall carpet).';
  if (room === 'Master Bedroom' && (lifestyle === 'Clean Aesthetic' || lifestyle === 'Budget-Focused')) return 'Carpet is still reasonable in master bedrooms — low traffic, no food, comfort underfoot. Shaw or Mohawk SmartStrand (.50-3/sq ft) with good pad. DFW caveat: professional steam cleaning annually recommended for DFW dust and allergens.';
  if (room === 'Kids Bedroom' && lifestyle === 'Young Kids') return 'Tough call. Kids spill — LVP is forgiving. But kids also play on floors — carpet is softer. Consider LVP with a large area rug in the play zone. LVP under 12-mil wear layer handles crayon, markers, and spills in a DFW kid\’s room.';
  if (room === 'Home Office') return 'LVP with low-pile area rug under desk chair. Pure carpet with chair mats causes uneven wear. LVP handles rolling chairs, DFW static electricity better in dry winter months, and is easier to clean. Adds resale value over carpet.';
  if (lifestyle === 'Budget-Focused') return 'Budget LVP (.50-2.50/sq ft) outperforms budget carpet in DFW long-term. Carpet requires cleaning every 12-18 months in DFW dust environment (-300/visit). LVP is mop-and-done. 5-year TCO favors LVP even at same upfront cost.';
  return 'LVP is the dominant DFW choice in 2026 — 68% of new installs. Waterproof, durable, pet/kid-friendly, easy to clean DFW dust and pollen. Carpet still works in dry bedrooms for comfort and budget. Consult a DFW flooring pro for your specific situation.';
};

export default function DFWCarpetVsLVPGuide2026() {
  const [room, setRoom] = useState<string | null>(null);
  const [lifestyle, setLifestyle] = useState<string | null>(null);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏆</div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#F5E642', marginBottom: '8px' }}>DFW Carpet vs LVP Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '15px', maxWidth: '560px', margin: '0 auto' }}>LVP has taken over DFW — but carpet still has a place. Select your room and lifestyle for a recommendation.</p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>1. Select Room</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {rooms.map((r, i) => (
              <button key={i} onClick={() => setRoom(r.label)}
                style={{ backgroundColor: room === r.label ? '#F5E642' : '#0f2040', color: room === r.label ? '#0A1628' : '#ffffff', border: '1px solid', borderColor: room === r.label ? '#F5E642' : '#1e3a5f', borderRadius: '10px', padding: '14px 10px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s' }}>
                <div style={{ fontSize: '22px', marginBottom: '4px' }}>{r.icon}</div>
                <div style={{ fontWeight: '600', fontSize: '12px' }}>{r.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>2. Select Lifestyle Factor</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {lifestyles.map((l, i) => (
              <button key={i} onClick={() => setLifestyle(l.label)}
                style={{ backgroundColor: lifestyle === l.label ? '#F5E642' : '#0f2040', color: lifestyle === l.label ? '#0A1628' : '#ffffff', border: '1px solid', borderColor: lifestyle === l.label ? '#F5E642' : '#1e3a5f', borderRadius: '10px', padding: '14px 10px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s' }}>
                <div style={{ fontSize: '22px', marginBottom: '4px' }}>{l.icon}</div>
                <div style={{ fontWeight: '600', fontSize: '12px' }}>{l.label}</div>
              </button>
            ))}
          </div>
        </div>

        {room && lifestyle && (
          <div style={{ backgroundColor: '#0f2040', border: '2px solid #F5E642', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
            <div style={{ color: '#F5E642', fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>DFW RECOMMENDATION — {room} + {lifestyle}</div>
            <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '15px' }}>{getRecommendation(room, lifestyle)}</p>
          </div>
        )}

        <div style={{ backgroundColor: '#0f2040', borderRadius: '12px', padding: '20px', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>📊 DFW Flooring by the Numbers 2026</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[['LVP Installs','68% of all new DFW flooring projects'],['Carpet Retreating','Bedrooms only in 78% of DFW renovations'],['LVP Cost','-5/sq ft installed vs carpet .50-4/sq ft'],['Resale Impact','LVP adds 2-4% more resale value than carpet in DFW market']].map(([k,v],i) => (
              <div key={i} style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '12px' }}>
                <div style={{ color: '#F5E642', fontWeight: '600', fontSize: '13px', marginBottom: '4px' }}>{k}</div>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px', padding: '20px', backgroundColor: '#0f2040', borderRadius: '12px', border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '12px' }}>Need a flooring contractor in DFW?</p>
          <button style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '12px 28px', fontWeight: '700', cursor: 'pointer', fontSize: '15px' }}>Get Free Quotes via ProLnk 🔗</button>
        </div>
      </div>
    </div>
  );
}