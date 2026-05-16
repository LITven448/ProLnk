import { useState } from 'react';

type HomeSize = 'Under 1,500 sq ft' | '1,500–2,500 sq ft' | '2,500–3,500 sq ft' | '3,500+ sq ft';
type LotType = 'Standard City Lot' | 'Larger Suburban Lot (>0.25 acre)' | 'Acreage / Rural Property' | 'Townhome / Condo';

const packageMatrix: Record<HomeSize, Record<LotType, { package: string; cost: string; includes: string[]; tip: string }>> = {
  'Under 1,500 sq ft': {
    'Standard City Lot': { package: 'Standard Interior', cost: '$150–$225', includes: ['25–30 interior shots', 'Twilight exterior optional (+$75)', 'Next-day delivery'], tip: 'Add a virtual tour for condos — buyers want to tour before visiting.' },
    'Larger Suburban Lot (>0.25 acre)': { package: 'Interior + Drone', cost: '$225–$325', includes: ['25–30 interior shots', '5–8 drone aerials', 'Lot boundary shots'], tip: 'Drone shows the full lot size — critical for larger lots in suburbs.' },
    'Acreage / Rural Property': { package: 'Interior + Full Drone', cost: '$350–$500', includes: ['30 interior shots', '10–15 aerial shots', 'Property boundary coverage'], tip: 'Acreage in outer DFW (Weatherford, Granbury) must show land extent.' },
    'Townhome / Condo': { package: 'Interior + Virtual Tour', cost: '$175–$275', includes: ['20–25 interior shots', 'Matterport 3D tour', 'Floor plan optional (+$100)'], tip: 'Virtual tours are highest-ROI add-on for DFW condos.' },
  },
  '1,500–2,500 sq ft': {
    'Standard City Lot': { package: 'Standard Interior', cost: '$200–$295', includes: ['35–40 interior shots', 'Exterior front + backyard', 'Twilight optional (+$100)'], tip: 'Twilight shots are increasingly popular in Plano and Richardson listings.' },
    'Larger Suburban Lot (>0.25 acre)': { package: 'Interior + Drone + Twilight', cost: '$325–$475', includes: ['35–40 interior shots', '8 drone aerials', 'Twilight exterior'], tip: 'This combo is the DFW sweet spot — most popular package in Frisco and Prosper.' },
    'Acreage / Rural Property': { package: 'Full Package', cost: '$450–$650', includes: ['40 interior shots', '15+ aerial shots', 'Twilight session', 'Virtual tour'], tip: 'Rural DFW buyers are often from out-of-state — virtual tours close deals remotely.' },
    'Townhome / Condo': { package: 'Interior + Virtual Tour', cost: '$225–$325', includes: ['30 interior shots', 'Matterport 3D tour', 'Twilight optional'], tip: 'Great photos are even more important for condos where buyers compare side-by-side.' },
  },
  '2,500–3,500 sq ft': {
    'Standard City Lot': { package: 'Interior + Twilight', cost: '$275–$400', includes: ['40–50 interior shots', 'Twilight exterior', 'Video walkthrough optional (+$200)'], tip: 'At this price point, buyers expect premium photography. Twilight is standard.' },
    'Larger Suburban Lot (>0.25 acre)': { package: 'Premium Package', cost: '$425–$600', includes: ['45 interior shots', '10 drone aerials', 'Twilight session', 'Video walkthrough'], tip: 'Video walkthroughs are worth it for $500K+ DFW homes.' },
    'Acreage / Rural Property': { package: 'Full Luxury Package', cost: '$550–$800', includes: ['50 interior shots', '20 aerial shots', 'Twilight + video', 'Virtual tour'], tip: 'Out-of-area buyers moving to DFW exurbs expect this level of content.' },
    'Townhome / Condo': { package: 'Interior + Virtual Tour + Video', cost: '$350–$500', includes: ['35 interior shots', 'Matterport', 'Short video reel for social'], tip: 'Social media reels from this package drive traffic from Instagram buyers.' },
  },
  '3,500+ sq ft': {
    'Standard City Lot': { package: 'Luxury Interior + Video', cost: '$400–$600', includes: ['50+ interior shots', 'Twilight exterior', 'Professional video walkthrough', 'Virtual tour'], tip: 'Luxury buyers in Highland Park / Preston Hollow expect magazine-quality photos.' },
    'Larger Suburban Lot (>0.25 acre)': { package: 'Full Luxury Package', cost: '$600–$900', includes: ['60 interior shots', '15 aerials', 'Twilight', 'Full video tour', 'Virtual tour'], tip: 'This is the standard for luxury listings in Southlake, Colleyville, and Westlake.' },
    'Acreage / Rural Property': { package: 'Estate Package', cost: '$800–$1,200', includes: ['60+ interior shots', '20+ aerial shots', 'Cinematic video', 'Virtual tour', 'Drone video'], tip: 'DFW estate buyers are serious — they need to see every angle before showing up.' },
    'Townhome / Condo': { package: 'Luxury Condo Package', cost: '$450–$700', includes: ['45 interior shots', 'Twilight', 'Video reel', 'Matterport 3D'], tip: 'Luxury condos in Uptown Dallas need cinematic content to stand out.' },
  },
};

export default function DFWHomePhotoGuide() {
  const [homeSize, setHomeSize] = useState<HomeSize | ''>('');
  const [lotType, setLotType] = useState<LotType | ''>('');
  const [showResult, setShowResult] = useState(false);

  const calculate = () => {
    if (homeSize && lotType) setShowResult(true);
  };

  const result = showResult && homeSize && lotType ? packageMatrix[homeSize][lotType] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📸</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            DFW Real Estate Photography Guide
          </h1>
          <p style={{ fontSize: 18, color: '#9aa5b4', maxWidth: 620, margin: '0 auto' }}>
            Why photos win or lose offers in DFW — and exactly what photography package your home needs.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 20, marginBottom: 48 }}>
          {[
            { icon: '📱', label: '95% of Buyers', value: 'Start Online', sub: 'Photos are the first showing' },
            { icon: '⚡', label: 'Pro vs DIY', value: '3x More Views', sub: 'Professional photos get more clicks' },
            { icon: '🏙️', label: 'Drone Shots', value: '+12% Interest', sub: 'For DFW lots over 0.25 acre' },
            { icon: '🌆', label: 'Twilight Photos', value: 'Top Performer', sub: 'Most saved listing photo in DFW' },
          ].map(s => (
            <div key={s.label} style={{ backgroundColor: '#1a2a40', borderRadius: 12, padding: 24, textAlign: 'center', border: '1px solid #2a3a50' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, color: '#9aa5b4', fontSize: 13, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642', marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#9aa5b4' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1a2a40', borderRadius: 16, padding: 28, marginBottom: 48, border: '1px solid #2a3a50' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>⚠️ What Photographers Can't Fix</h2>
          <p style={{ color: '#9aa5b4', marginBottom: 16, fontSize: 14 }}>No matter how good the photographer, prep work matters. Shoot day mistakes cost deals.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              '🗂️ Clutter on counters and surfaces',
              '🧦 Personal items visible in shots',
              '🐾 Pet beds, bowls, and toys',
              '🚗 Cars in the driveway during shoot',
              '💡 Burned-out bulbs or mismatched lights',
              '🪟 Blinds closed — always open before shoot',
              '🛏️ Unmade beds and wrinkled bedding',
              '🌿 Dead plants or overgrown lawn',
            ].map(item => (
              <div key={item} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 12, fontSize: 13, color: '#ccc' }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#1a2a40', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #2a3a50' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>📦 Photography Package Finder</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#ccc', fontSize: 14 }}>Home Size</label>
              <select value={homeSize} onChange={e => { setHomeSize(e.target.value as HomeSize); setShowResult(false); }}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, backgroundColor: '#0A1628', color: '#fff', border: '1px solid #2a3a50', fontSize: 14 }}>
                <option value="">Select home size</option>
                {(['Under 1,500 sq ft', '1,500–2,500 sq ft', '2,500–3,500 sq ft', '3,500+ sq ft'] as HomeSize[]).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#ccc', fontSize: 14 }}>Lot Type</label>
              <select value={lotType} onChange={e => { setLotType(e.target.value as LotType); setShowResult(false); }}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, backgroundColor: '#0A1628', color: '#fff', border: '1px solid #2a3a50', fontSize: 14 }}>
                <option value="">Select lot type</option>
                {(['Standard City Lot', 'Larger Suburban Lot (>0.25 acre)', 'Acreage / Rural Property', 'Townhome / Condo'] as LotType[]).map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <button onClick={calculate} disabled={!homeSize || !lotType}
            style={{ padding: '12px 32px', backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: homeSize && lotType ? 'pointer' : 'not-allowed', opacity: homeSize && lotType ? 1 : 0.5 }}>
            Get My Photography Package
          </button>

          {result && (
            <div style={{ marginTop: 24, backgroundColor: '#0A1628', borderRadius: 12, padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                  <div style={{ color: '#9aa5b4', fontSize: 12, marginBottom: 4 }}>RECOMMENDED PACKAGE</div>
                  <div style={{ color: '#F5E642', fontSize: 24, fontWeight: 800 }}>{result.package}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#9aa5b4', fontSize: 12, marginBottom: 4 }}>ESTIMATED COST</div>
                  <div style={{ color: '#4ade80', fontSize: 24, fontWeight: 800 }}>{result.cost}</div>
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: '#9aa5b4', fontSize: 13, marginBottom: 8 }}>PACKAGE INCLUDES:</div>
                {result.includes.map(item => (
                  <div key={item} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'center' }}>
                    <span style={{ color: '#4ade80' }}>✓</span>
                    <span style={{ color: '#ccc', fontSize: 14 }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: 16, backgroundColor: '#1a2a40', borderRadius: 8, borderLeft: '4px solid #F5E642' }}>
                <strong style={{ color: '#F5E642' }}>💡 DFW Pro Tip: </strong>
                <span style={{ color: '#ccc', fontSize: 14 }}>{result.tip}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
