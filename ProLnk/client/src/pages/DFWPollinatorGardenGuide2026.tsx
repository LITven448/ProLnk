import { useState } from 'react';

export default function DFWPollinatorGardenGuide2026() {
  const [gardenSize, setGardenSize] = useState('small');
  const [season, setSeason] = useState('spring');
  const [guide, setGuide] = useState('');

  const getGuide = () => {
    const map: Record<string, Record<string, string>> = {
      small: {
        spring: 'Plant a 4x8 raised bed with Bluebonnets and Penstemon for spring mason bees. Add a small water dish with pebbles. Ruby-throated hummingbirds arrive April — add one Salvia plant.',
        summer: 'Lantana and Turks Cap thrive in DFW summer heat and attract Gulf Fritillary butterflies. Add a shallow bee bath. Avoid pesticides May-August — peak native bee activity.',
        fall: 'September-October: Monarch migration peak. Plant Gregg Mistflower and fall Salvia. Leave seed heads standing — goldfinches rely on them. Small no-mow patch attracts ground-nesting bees.',
        winter: 'Leave dead plant stems until March — they are native bee nest sites. Plant pansies for early foragers. Install a bee house on a south-facing fence.',
      },
      medium: {
        spring: 'Create a 200 sqft pollinator meadow with native wildflower mix (Bluebonnet, Indian Paintbrush, Coreopsis). Add a 2-foot deep birdbath for ruby-throated hummingbirds arriving in April.',
        summer: 'Plant a butterfly garden with Black-eyed Susan, Turks Cap, and Zexmenia. Monarchs pass through DFW August-September. Avoid mowing pollinator zones — let fennel grow for Black Swallowtail caterpillars.',
        fall: 'September Monarch peak: mass planting of Gregg Mistflower recommended. Leave 6-inch no-mow buffer at fence lines for native bee nesting. Plant late-blooming salvias to feed departing hummingbirds.',
        winter: 'Plant American Beautyberry for winter bird food. Leave ornamental grasses standing — they provide overwintering habitat. Install 3-4 bee houses at varying heights facing south.',
      },
      large: {
        spring: 'Design a full pollinator habitat garden: wildflower meadow (front), shrub layer (middle), tree anchor (back). Yaupon Holly berries feed birds in spring. Add a pond with native aquatic plants for dragonflies.',
        summer: 'Large no-mow zone supports 50+ native bee species. Plant native milkweed (Antelope Horns) for Monarch breeding. Hummingbird feeder stations + Turks Cap beds throughout create a DFW wildlife corridor.',
        fall: 'Full Monarch waystation — register at journeynorth.org. Large Gregg Mistflower drifts (100+ sqft) dramatically increase Monarch sightings. Leave entire garden standing through December.',
        winter: 'Complete wildlife habitat certification (NWWA). Leave leaf litter in beds — overwintering habitat for 95% of native bees. Plant early-blooming Elms and Maples as first pollen sources for queens.',
      },
    };
    setGuide(map[gardenSize]?.[season] ?? 'Select options above.');
  };

  const pollinators = [
    { icon: '🦋', name: 'Monarch Butterfly', when: 'Sep-Oct (migration)', plant: 'Gregg Mistflower, Milkweed' },
    { icon: '🐝', name: 'Native Bees (100+ species)', when: 'Mar-Nov', plant: 'Coneflower, Salvia, Lantana' },
    { icon: '🐦', name: 'Ruby-throated Hummingbird', when: 'Apr-Oct', plant: 'Turks Cap, Red Salvia' },
    { icon: '🦋', name: 'Gulf Fritillary', when: 'May-Nov', plant: 'Passionvine (host), Lantana (nectar)' },
  ];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK RESOURCE GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Pollinator Garden Guide 2026 🦋</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW sits on the Monarch butterfly migration corridor and hosts 100+ native bee species. Turn your yard into a wildlife habitat with native plants and no-mow zones.</p>

        <div style={{ display: 'grid', gap: 14, marginBottom: 36 }}>
          {pollinators.map(p => (
            <div key={p.name} style={{ background: '#112240', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <span style={{ fontSize: 28 }}>{p.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 16 }}>{p.name}</span>
                  <span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>{p.when}</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>Best plants: {p.plant}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🔍 Seasonal Pollinator Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Garden Size</label>
              <select value={gardenSize} onChange={e => setGardenSize(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', fontSize: 14 }}>
                <option value="small">Small (&lt;100 sqft)</option>
                <option value="medium">Medium (100-500 sqft)</option>
                <option value="large">Large (500+ sqft)</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Season</label>
              <select value={season} onChange={e => setSeason(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', fontSize: 14 }}>
                <option value="spring">Spring (Mar-May)</option>
                <option value="summer">Summer (Jun-Aug)</option>
                <option value="fall">Fall (Sep-Nov)</option>
                <option value="winter">Winter (Dec-Feb)</option>
              </select>
            </div>
          </div>
          <button onClick={getGuide} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer', fontSize: 15 }}>Get Pollinator Guide</button>
          {guide && <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 8, padding: 16, color: '#F5E642', fontWeight: 600, fontSize: 15 }}>🦋 {guide}</div>}
        </div>
        <p style={{ marginTop: 32, color: '#475569', fontSize: 13, textAlign: 'center' }}>ProLnk connects you with DFW native plant landscapers and pollinator garden designers.</p>
      </div>
    </div>
  );
}