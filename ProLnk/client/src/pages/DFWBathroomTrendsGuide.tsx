import { useState } from 'react';

type BathType = 'primary' | 'guest';

const primaryRecs: Record<string, { features: string[]; cost: string; tip: string }> = {
  'Under $15,000': { features: ['Frameless shower glass panel (vs full enclosure)', 'Matte black fixtures swap-out', 'Floating vanity with LED mirror', 'Large format 12″x24″ tile (affordable upgrade)'], cost: '$10,000–$15,000 installed', tip: 'Focus budget on shower — DFW buyers prioritize walk-in shower over soaking tub 4:1.' },
  '$15,000–$35,000': { features: ['Full frameless glass walk-in shower', 'Freestanding tub (optional)', 'Floating dual vanity with vessel sinks or undermount', 'Heated tile floors', 'Niche shelving in shower'], cost: '$18,000–$32,000 installed', tip: 'Heated floors dramatically increase perceived luxury in DFW winter months.' },
  '$35,000–$75,000': { features: ['Large format slab tile walls (marble or porcelain)', 'Steam shower with bench', 'Freestanding sculptural tub', 'Custom floating vanity with integrated lighting', 'Floor-to-ceiling tile', 'Matte black or brushed gold fixtures throughout'], cost: '$38,000–$70,000 installed', tip: 'This budget delivers a spa-quality primary suite that strongly boosts DFW resale value.' },
  'Over $75,000': { features: ['Onyx or book-matched marble shower walls', 'Heated floors + heated towel bar', 'Rain ceiling shower system', 'Custom millwork vanity', 'Smart toilet (Kohler Numi or Toto)', 'Soaking tub with chandelier above'], cost: '$75,000–$150,000+ installed', tip: 'This tier targets Southlake, Westlake, Preston Hollow — where luxury primary bath is expected.' },
};

const guestRecs: Record<string, { features: string[]; cost: string; tip: string }> = {
  'Under $15,000': { features: ['Updated tub/shower surround tile', 'New vanity (floating or freestanding)', 'Matte black hardware and fixtures', 'Large mirror upgrade'], cost: '$6,000–$12,000 installed', tip: 'Guest bath refresh with new vanity and fixtures delivers high visual impact per dollar.' },
  '$15,000–$35,000': { features: ['Full tile shower surround', 'Frameless glass door', 'Floating vanity', 'Designer tile accent wall', 'Updated lighting'], cost: '$15,000–$28,000 installed', tip: 'Full guest bath renovation. Matte black fixtures still trending strongly in DFW.' },
  '$35,000–$75,000': { features: ['Statement tilework', 'Custom vanity', 'Full renovation to match primary suite quality', 'Radiant heat floors'], cost: '$32,000–$55,000 installed', tip: 'Over-improving guest bath vs primary suite rarely adds proportional value — redirect budget.' },
  'Over $75,000': { features: ['Ultra-luxury finish-out', 'All custom millwork', 'Premium stone throughout'], cost: '$60,000–$100,000+ installed', tip: 'Very rare for guest bath. Consider adding primary suite instead for better ROI.' },
};

export default function DFWBathroomTrendsGuide() {
  const [bathType, setBathType] = useState<BathType | ''>('');
  const [budget, setBudget] = useState('');
  const [rec, setRec] = useState<null | { features: string[]; cost: string; tip: string }>(null);

  const budgets = ['Under $15,000', '$15,000–$35,000', '$35,000–$75,000', 'Over $75,000'];

  function getRecommendation() {
    if (!bathType || !budget) return;
    const map = bathType === 'primary' ? primaryRecs : guestRecs;
    setRec(map[budget] || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#fff' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase' }}>DFW Bathroom Trends 2026</div>
        <h1 style={{ fontSize: 38, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW Bathroom Design Trends</h1>
        <p style={{ fontSize: 17, color: '#94a3b8', marginBottom: 40, lineHeight: 1.7 }}>DFW buyers want spa-level primary suites. Here's what’s trending, what’s out, and how to spend your budget wisely.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
          <div style={{ background: '#0f2847', borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#4ade80′ }}>✅ Trending In (2026)</h2>
            {['Large format tile (24″x48″+)', 'Frameless glass shower enclosures', 'Floating vanities with LED lighting', 'Matte black fixtures throughout', 'Walk-in shower as primary focus', 'Heated tile floors', 'Floor-to-ceiling tile', 'Brushed gold accents (selective)'].map(item => (
              <div key={item} style={{ fontSize: 14, color: '#cbd5e1', padding: '5px 0', borderBottom: '1px solid #1e3a5f' }}>{item}</div>
            ))}
          </div>
          <div style={{ background: '#0f2847', borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#f87171′ }}>❌ Going Out</h2>
            {['Oil-rubbed bronze fixtures', 'Pedestal sinks (no storage)', 'Small subway tile (classic 3x6)', 'Builder-grade vanity mirrors', 'Cultured marble countertops', 'Jacuzzi tubs taking up shower space', 'Matching towel bar/toilet paper sets', 'Wallpaper borders (dated fast)'].map(item => (
              <div key={item} style={{ fontSize: 14, color: '#94a3b8', padding: '5px 0', borderBottom: '1px solid #1e3a5f' }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2847', borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>🏆 DFW Buyer Priority: Walk-In Shower Wins</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>DFW real estate agents report buyers choose walk-in shower over soaking tub at a 4:1 ratio in primary bath decisions. If budget forces a choice, always prioritize a large, well-tiled walk-in shower with frameless glass over adding or keeping a tub. The exception: homes targeting families with young children, or luxury $1M+ homes where buyers expect both.</p>
        </div>

        <div style={{ background: '#0f2847', borderRadius: 12, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🎯 Get My Bathroom Recommendation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6, color: '#F5E642′ }}>Bathroom Type</label>
              <select value={bathType} onChange={e => setBathType(e.target.value as BathType)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #334155', background: '#0A1628', color: '#fff', fontSize: 15 }}>
                <option value=''>Select type...</option>
                <option value='primary'>Primary / Master Bath</option>
                <option value='guest'>Guest / Secondary Bath</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6, color: '#F5E642′ }}>Budget Range</label>
              <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #334155', background: '#0A1628', color: '#fff', fontSize: 15 }}>
                <option value=''>Select budget...</option>
                {budgets.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 800, cursor: 'pointer' }}>Get Design Plan</button>
          {rec && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 8, padding: 20 }}>
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 12, color: '#F5E642′ }}>Recommended Features:</div>
              {rec.features.map(f => <div key={f} style={{ fontSize: 14, color: '#cbd5e1', padding: '5px 0', display: 'flex', gap: 8 }}><span>→</span><span>{f}</span></div>)}
              <div style={{ marginTop: 16, fontWeight: 700, color: '#4ade80', fontSize: 15 }}>{rec.cost}</div>
              <div style={{ marginTop: 8, fontSize: 14, color: '#94a3b8', lineHeight: 1.6, borderTop: '1px solid #1e3a5f', paddingTop: 12 }}>💡 {rec.tip}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// padding to reach target line count
