import { useState } from 'react';

const SPACE_TYPES = ['Kitchen Floor', 'Bathroom Floor', 'Shower Walls', 'Living Room', 'Entry/Foyer', 'Outdoor Patio'];
const DFW_CONCERNS = ['Slab Movement Cracks', 'Visual Activity/Interest', 'Concealing Dirt', 'Resale Value', 'Small Space'];

const layoutMatrix: Record<string, Record<string, { pattern: string; why: string; considerations: string }>> = {
  'Kitchen Floor': {
    'Slab Movement Cracks': { pattern: 'Offset/Brick (1/3 offset)', why: 'DFW expansive clay shifts slabs seasonally. Offset patterns distribute stress across more grout lines so no single crack runs visually across the room.', considerations: 'Use smaller tiles (12x12 or 12x24) for more grout lines to absorb movement. Larger tiles crack at the tile, not the grout.' },
    'Visual Activity/Interest': { pattern: 'Diagonal 45-degree', why: 'Diagonal layout adds dynamism to kitchens without the complexity of herringbone. Hides DFW slab movement better than straight grid.', considerations: 'Requires more cuts and waste. Budget 15% extra tile for DFW kitchens.' },
    'Concealing Dirt': { pattern: 'Running Bond (horizontal)', why: 'Horizontal lines draw the eye along the floor rather than down into grout joints. DFW clay hides better in flowing layouts.', considerations: 'Match grout color to tile for best dirt concealment.' },
    'Resale Value': { pattern: 'Classic Grid (straight stack)', why: 'Most universally appealing to DFW buyers. Timeless and expected in kitchens.', considerations: 'Use rectified tiles for tight joints. Minimizes future grout maintenance.' },
    'Small Space': { pattern: 'Large Format Diagonal', why: 'Large tiles on diagonal visually expand small DFW kitchens and reduce grout lines.', considerations: 'Requires very flat substrate. DFW slabs must be level within 1/8″ per 10ft.' },
  },
  'Bathroom Floor': {
    'Slab Movement Cracks': { pattern: 'Mosaic (1x1 or 2x2)', why: 'Tiny tiles have hundreds of grout lines -- DFW slab flex is absorbed across all of them. Almost never cracks the tile itself.', considerations: 'More grout lines means more sealing maintenance. Use epoxy grout for DFW hard water resistance.' },
    'Visual Activity/Interest': { pattern: 'Herringbone', why: 'The most visually active pattern for DFW bathrooms. Conceals floor movement and adds luxury feel.', considerations: 'Requires experienced installer. Herringbone has highest material waste -- 20% extra.' },
    'Concealing Dirt': { pattern: 'Offset 50% (brick)', why: 'Staggered joints on small bathroom tiles hide DFW red clay and hard water residue between cleanings.', considerations: 'Pair with dark grout for maximum concealment.' },
    'Resale Value': { pattern: 'Penny Round Mosaic', why: 'Trending in DFW luxury market. Adds unique texture buyers remember.', considerations: 'Sheet-mounted for speed. Grout all joints carefully -- many gaps to fill.' },
    'Small Space': { pattern: 'Large Plank Tile (12x24) Straight', why: 'Counter-intuitive but large tiles in small DFW bathrooms reduce visual clutter and make space feel bigger.', considerations: 'Must level DFW slab first. Lippage is the enemy of large format in small spaces.' },
  },
  'Shower Walls': {
    'Slab Movement Cracks': { pattern: 'Subway Tile Horizontal (3x6)', why: 'Wall installations are decoupled from slab movement. Horizontal subway is forgiving and timeless for DFW showers.', considerations: 'Use flex grout or epoxy grout. DFW hard water attacks grout joints constantly.' },
    'Visual Activity/Interest': { pattern: 'Vertical Stack Bond', why: 'Vertical orientation adds height and drama to DFW shower walls. Modern alternative to horizontal subway.', considerations: 'Requires extremely straight walls. Any bow shows immediately in vertical stack.' },
    'Concealing Dirt': { pattern: 'Large Format Slab-Look (24x48)', why: 'Fewer grout lines means less hard water buildup in DFW showers. Near-zero maintenance.', considerations: 'Heavy tiles need proper backer. Check weight limits for DFW renovation code.' },
    'Resale Value': { pattern: 'Classic Subway Horizontal', why: 'DFW buyers expect subway in showers. Clean, timeless, broadly appealing.', considerations: 'White tile with gray grout is the DFW resale standard.' },
    'Small Space': { pattern: 'Floor-to-Ceiling Vertical Large Format', why: 'Tall vertical tiles elongate small DFW showers dramatically. One grout line = one visual break.', considerations: 'Use same tile floor to ceiling for seamless effect. Adds perceived height.' },
  },
  'Living Room': {
    'Slab Movement Cracks': { pattern: 'Diagonal with Expansion Joints', why: 'DFW living rooms on slab need planned expansion joints every 20-25 feet. Diagonal layout absorbs some visual crack impact.', considerations: 'NEVER skip expansion joints in DFW living rooms. Buckling tile is common without them.' },
    'Visual Activity/Interest': { pattern: 'Large Format Herringbone', why: 'Luxury living rooms in DFW use 12x24 herringbone for dramatic visual impact with manageable install.', considerations: 'High installer skill required. Not a DIY layout in DFW expansive soil conditions.' },
    'Concealing Dirt': { pattern: 'Wood-Look Plank Offset', why: 'Wood-look porcelain in running bond hides DFW clay and dust between cleanings. Natural variation in print helps.', considerations: 'Stagger end joints at least 6 inches. Never create H-joints.' },
    'Resale Value': { pattern: '18x18 Diagonal Grid', why: 'Classic DFW living room tile. Widely appealing, timeless, expected in 2000s-era DFW homes.', considerations: 'Still commands premium over wood in DFW due to AC cost savings.' },
    'Small Space': { pattern: 'Continuous Large Format (24x24)', why: 'Unbroken large tiles in small DFW living areas eliminate visual fragmentation.', considerations: 'Level slab to within 3/16 per 10ft. Use self-leveling underlayment.' },
  },
  'Entry/Foyer': {
    'Slab Movement Cracks': { pattern: 'Mosaic Border with Field Tile', why: 'Mosaic transitions absorb DFW entry stress points -- doors, transitions, heavy foot traffic.', considerations: 'Use Ditra membrane at transitions. Entries take the most DFW clay impact.' },
    'Visual Activity/Interest': { pattern: 'Compass or Medallion Insert', why: 'DFW luxury entries use decorative inserts with field tile surround. Highest visual impact per square foot.', considerations: 'Pre-order medallion -- 4-6 week lead time. Plan layout from center out.' },
    'Concealing Dirt': { pattern: 'Dark Field Tile Offset', why: 'Entries face DFW red clay every day. Dark tile in offset pattern conceals the most between mopping.', considerations: 'Seal grout quarterly. Use mat outside door to reduce clay load.' },
    'Resale Value': { pattern: 'Travertine-Look Porcelain Diagonal', why: 'DFW buyers associate diagonal travertine entry with value. Porcelain version is durable without travertine maintenance.', considerations: 'Rectified edge required for tight joints. Fill all pits before install.' },
    'Small Space': { pattern: 'Continuous Floor Into Adjacent Room', why: 'Extending the same tile from entry into hallway or living room expands perceived DFW foyer size dramatically.', considerations: 'No threshold needed. Use transition strip only at carpet.' },
  },
  'Outdoor Patio': {
    'Slab Movement Cracks': { pattern: 'Paver-Style Grid with Wide Joints (3/8″)', why: 'DFW outdoor slabs move constantly with moisture and heat. Wide joints allow movement without cracking tile. Pavers beat monolithic slab here.', considerations: 'Use flexible polymer-modified mortar. Standard thinset cracks in DFW outdoor conditions.' },
    'Visual Activity/Interest': { pattern: 'Herringbone Paver', why: 'Interlocking herringbone pattern for DFW patios is visually striking and structurally distributes load.', considerations: 'Works best with rectangular pavers (4x8 or similar). Clay brick does real herringbone best.' },
    'Concealing Dirt': { pattern: 'Textured Dark Porcelain Grid', why: 'DFW outdoor surfaces collect pollen, red clay, and soot. Textured dark surfaces hide everything between pressure washing.', considerations: 'Use Class 4 slip-resistance or better. DFW pool/wet areas require Class 5.' },
    'Resale Value': { pattern: 'Large Format Porcelain (24x24) Straight', why: 'Modern DFW patios with large format tile command premium. Looks expensive and is easy to clean.', considerations: 'Frost rating not critical in DFW but buy Class 4 minimum for UV durability.' },
    'Small Space': { pattern: 'Diagonal Small Patio', why: 'Diagonal layout expands perception of small DFW backyard patios. Same effect outdoors as indoors.', considerations: 'Account for 20% waste on diagonal cuts at perimeter.' },
  },
};

export default function DFWTileLayoutGuide() {
  const [space, setSpace] = useState('');
  const [concern, setConcern] = useState('');
  const result = space && concern ? layoutMatrix[space]?.[concern] : null;
  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Tile Pro Guide</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>📐 DFW Tile Layout Guide</h1>
        <p style={{ color: '#8899BB', marginBottom: '2rem', lineHeight: 1.6 }}>DFW expansive clay soil causes seasonal slab movement that standard tile layouts cannot handle. The right pattern distributes stress, conceals cracks, and lasts decades. Select your space and primary concern.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}>Space Type</div>
            {SPACE_TYPES.map(s => (
              <button key={s} onClick={() => setSpace(s)} style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.6rem 1rem', background: space === s ? '#F5E642′ : '#0D1E3A', color: space === s ? '#0A1628' : '#CDD5E0', border: '1px solid', borderColor: space === s ? '#F5E642' : '#1C2E4A', borderRadius: 8, cursor: ’pointer', textAlign: 'left', fontWeight: space === s ? 700 : 400, transition: 'all 0.2s' }}>{s}</button>
            ))}
          </div>
          <div>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}>Primary DFW Concern</div>
            {DFW_CONCERNS.map(c => (
              <button key={c} onClick={() => setConcern(c)} style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.6rem 1rem', background: concern === c ? '#F5E642′ : '#0D1E3A', color: concern === c ? '#0A1628' : '#CDD5E0', border: '1px solid', borderColor: concern === c ? '#F5E642' : '#1C2E4A', borderRadius: 8, cursor: ’pointer', textAlign: 'left', fontWeight: concern === c ? 700 : 400, transition: 'all 0.2s' }}>{c}</button>
            ))}
          </div>
        </div>
        {result && (
          <div style={{ background: '#0D1E3A', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.75rem' }}>✅ Recommended Layout Pattern</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.75rem' }}>{result.pattern}</div>
            <div style={{ color: '#8899BB', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>💡 {result.why}</div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', border: '1px solid #1C2E4A' }}>
              <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.8rem', marginBottom: '0.25rem' }}>DFW INSTALLATION CONSIDERATIONS</div>
              <div style={{ color: '#CDD5E0', fontSize: '0.9rem' }}>⚠️ {result.considerations}</div>
            </div>
          </div>
        )}
        <div style={{ background: '#0D1E3A', borderRadius: 12, padding: '1.25rem', border: '1px solid #1C2E4A' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🏗️ DFW Slab Movement Rules</div>
          {['DFW clay soil expands up to 6 inches vertically in wet season -- tile must accommodate this.', 'Never install tile directly on a DFW slab without crack isolation membrane (Ditra or similar).', 'Expansion joints every 20-25 feet are not optional -- they are code in DFW tile work.', 'Diagonal layouts distribute slab stress better than straight grid -- especially on older DFW slabs.', 'If slab has existing cracks, use uncoupling membrane -- do not fill and tile over cracks.'].map((tip, i) => (
            <div key={i} style={{ color: '#8899BB', fontSize: '0.875rem', marginBottom: '0.4rem', paddingLeft: '0.5rem', borderLeft: '2px solid #F5E642′ }}>{tip}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
