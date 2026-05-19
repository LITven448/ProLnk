import { useState } from 'react';

const elements = [
  { type: 'condo', budget: 'low', label: 'Condo / Low Budget', items: ['Potted fig trees in corners 🌳','Bamboo accent wall panel 🎋','Stone-look vinyl tile for natural material feel 🪨','Desktop water fountain 💧'] },
  { type: 'condo', budget: 'mid', label: 'Condo / Mid Budget', items: ['Modular living wall kit (Florafelt) 🌿','Reclaimed wood floating shelf 🪵','Indoor fountain feature 💦','Natural linen curtains + woven jute rug 🧺'] },
  { type: 'house', budget: 'low', label: 'House / Low Budget', items: ['Climbing plants on interior trellis 🌿','Large river rock accent near entry 🪨','Harvest table centerpiece with stems 🌾','Sheer curtains — blur indoor/outdoor line ☀️'] },
  { type: 'house', budget: 'mid', label: 'House / Mid Budget', items: ['Courtyard garden with DFW-native plants 🌵','Sliding glass doors for indoor-outdoor flow 🚪','Wood ceiling beams (faux or real) 🏡','Recirculating water wall feature 💧'] },
  { type: 'house', budget: 'high', label: 'House / High Budget', items: ['Full living wall with irrigation system 🌿','Natural stone flooring throughout 🪨','Custom courtyard with pergola + fans ☂️','Architectural water feature — koi pond or rill 💦'] },
  { type: 'townhome', budget: 'mid', label: 'Townhome / Mid Budget', items: ['Rooftop terrace garden 🌺','Vertical moss wall in stairwell 🌱','Cork accent wall for texture 🍂','Clustered plant vignettes by stair landing 🌿'] },
];

export default function DFWBiophilicDesignGuide2026() {
  const [type, setType] = useState('');
  const [budget, setBudget] = useState('');
  const filtered = elements.filter(e =>
    (!type || e.type === type) && (!budget || e.budget === budget)
  );

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK GUIDE · DFW 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>🌿 DFW Biophilic Design Guide 2026</h1>
        <p style={{ color: '#9BA3B2', fontSize: 15, marginBottom: 32 }}>
          Biophilic design reduces cortisol 15%, improves focus 6%, and lowers blood pressure. DFW's extreme climate makes intentional nature integration essential — the heat pushes us indoors, but we can bring nature in.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 28 }}>
          {[{ e: '🌿', l: 'Living Walls' },{ e: '🪵', l: 'Natural Materials' },{ e: '💧', l: 'Water Features' },{ e: '🏡', l: 'Courtyards' },{ e: '🌅', l: 'Indoor-Outdoor Flow' },{ e: '🪨', l: 'Stone & Earth' }].map(i => (
            <div key={i.l} style={{ background: '#111E33', borderRadius: 10, padding: '14px 12px', textAlign: 'center', border: '1px solid #1C2D4A' }}>
              <div style={{ fontSize: 24 }}>{i.e}</div>
              <div style={{ fontSize: 12, color: '#9BA3B2', marginTop: 4 }}>{i.l}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#111E33', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🔍 Get Your Biophilic Plan</h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 12, color: '#9BA3B2', marginBottom: 6 }}>HOME TYPE</div>
              {['condo','townhome','house'].map(t => (
                <button key={t} onClick={() => setType(type === t ? '' : t)}
                  style={{ marginRight: 8, padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
                    background: type === t ? '#F5E642′ : '#1C2D4A', color: type === t ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 13 }}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#9BA3B2', marginBottom: 6 }}>BUDGET</div>
              {['low','mid','high'].map(b => (
                <button key={b} onClick={() => setBudget(budget === b ? '' : b)}
                  style={{ marginRight: 8, padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
                    background: budget === b ? '#F5E642′ : '#1C2D4A', color: budget === b ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 13 }}>
                  {b.charAt(0).toUpperCase() + b.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
          {(filtered.length ? filtered : elements.slice(0,2)).map(e => (
            <div key={e.label} style={{ background: '#111E33', borderRadius: 12, padding: 20, border: '1px solid #1C2D4A' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🌿 {e.label}</div>
              {e.items.map(item => (
                <div key={item} style={{ color: '#9BA3B2', fontSize: 14, marginBottom: 6 }}>• {item}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 4 }}>Connect with DFW Biophilic Design Pros</div>
          <div style={{ color: '#0A1628', fontSize: 13 }}>ProLnk matches DFW homeowners with landscapers, interior contractors, and water feature specialists.</div>
        </div>
      </div>
    </div>
  );
}