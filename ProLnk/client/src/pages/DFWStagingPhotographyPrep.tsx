import { useState } from 'react';

type RoomKey = 'living' | 'kitchen' | 'bedroom' | 'bathroom' | 'exterior' | 'office';

interface PhotoPrep {
  dayBefore: string[];
  dayOf: string[];
  commonFixes: string[];
  dfwTip: string;
}

const photoPrep: Record<RoomKey, PhotoPrep> = {
  living: {
    dayBefore: [
      'Remove all personal photos (buyers want to imagine themselves in the space)',
      'Clear all surfaces — every table, shelf, and console down to 2–3 curated items',
      'Fluff and arrange all pillows and throws in final position',
      'Remove remotes, cords, and electronics clutter',
      'Clean all glass surfaces: coffee table, TV screen, windows, mirrors',
      'Vacuum carpet or mop floors — tracks and dust show in photos',
    ],
    dayOf: [
      'Turn on every single lamp and overhead light 30 minutes before photographer',
      'Open all blinds and curtains to maximum — let DFW sun in',
      'Straighten all pillows and throw one final time',
      'Remove any pet items that crept back in overnight',
      'Fresh flowers on coffee table if you have them (white or yellow — photographs best)',
    ],
    commonFixes: [
      'Cords showing behind TV or entertainment center',
      'Misaligned area rug corners (photographers fix this but costs time)',
      'One lamp off or wrong color temperature — mismatched warmth visible in photos',
      'Curtains not fully open and even',
      'Remote controls or personal items left on surfaces',
    ],
    dfwTip: 'DFW living rooms photograph best between 10am–1pm when south-facing natural light peaks.',
  },
  kitchen: {
    dayBefore: [
      'Clear ALL countertops — every appliance, paper towel holder, knife block, and dish rack goes away',
      'Clean inside microwave — door is often left open by photographers',
      'Deep clean stovetop, range hood, and backsplash — residue shows under photo lighting',
      'Empty dish rack and put it away',
      'Remove all magnets and papers from refrigerator',
      'Clean sink until it shines — stainless steel polish for a steel sink',
    ],
    dayOf: [
      'Turn on all kitchen lights including under-cabinet strips',
      'Place 3–5 items maximum on counter: coffee maker + simple plant OR fruit bowl — not both',
      'Fresh white hand towel folded on oven handle',
      'Run garbage disposal with citrus peels morning of',
      'Turn on hood vent light if there is one (adds warm glow)',
    ],
    commonFixes: [
      'Soap dispenser and sponge left at sink (always remove these)',
      'Fingerprints on stainless appliances — wipe down with stainless cleaner right before',
      'One cabinet left slightly open',
      'Trash can visible',
      'Children\’s artwork still on refrigerator',
    ],
    dfwTip: 'DFW kitchens with east-facing windows photograph beautifully in morning. West-facing kitchens: shoot before noon to avoid harsh afternoon Texas sun through windows.',
  },
  bedroom: {
    dayBefore: [
      'Make bed with staging linens — all personal bedding stored',
      'Clear all nightstand surfaces except one lamp and one small decor item per side',
      'Remove all items from under bed (visible in wide-angle shots)',
      'Declutter and organize closet — photographers open closet doors in primary bedroom',
      'Clean all mirrors and windows',
      'Remove all personal photos and family items',
    ],
    dayOf: [
      'Re-make bed with crisp hospital corners or steam out wrinkles',
      'Turn on all lamps — including closet light if walk-in',
      'Pull window treatments fully open',
      'Fluff all pillows and lay decorative pillows with intention',
      'Fresh flowers optional: small vase on nightstand looks inviting',
    ],
    commonFixes: [
      'Pillow arrangement photographed before full fluff (always do this last)',
      'Closet door left closed when it was supposed to be featured',
      'Charging cables on nightstand',
      'Wrinkled bedding — iron or steam the duvet cover the morning of',
      'Ceiling fan blades visible and dusty in wide shot',
    ],
    dfwTip: 'Primary bedrooms sell homes. DFW buyers expect a hotel-quality primary. Invest in quality white or neutral staging bedding for photos — return it after if needed.',
  },
  bathroom: {
    dayBefore: [
      'Deep clean toilet, tub, shower, sink, and all surfaces',
      'Re-caulk any dark or cracked caulk — $8 fix that photographs 10x better',
      'Remove all personal products from shower, counter, and toilet top',
      'Clean and polish mirrors until streak-free',
      'Replace toilet paper roll with fresh, full roll',
      'Wash and replace bath mats with clean neutral ones',
    ],
    dayOf: [
      'Fold and hang 2 fresh white towels in hotel-style arrangement',
      'Place one small white orchid or simple plant on counter (optional but effective)',
      'Turn on all vanity lights — including any accent lighting',
      'Put toilet seat AND lid down',
      'One pump soap dispenser visible, nothing else on counter',
    ],
    commonFixes: [
      'Toilet lid up in photos (most common bathroom photo mistake)',
      'Used soap bar on edge of sink',
      'Dirty grout visible in tile — clean with bleach pen before photography',
      'Shower curtain bunched instead of evenly spread',
      'Bathroom scale visible on floor',
    ],
    dfwTip: 'DFW buyers expect updated bathrooms. If yours has dated fixtures, a coat of spray paint on the mirror frame and new hardware costs $50 but photographs as renovated.',
  },
  exterior: {
    dayBefore: [
      'Mow, edge, and blow — curb appeal starts the listing click',
      'Power wash driveway and front walk if stained',
      'Weed all visible planting beds',
      'Clean front door and replace door mat',
      'Remove all cars from driveway and visible street',
      'Hide hoses, trash cans, and any yard equipment',
    ],
    dayOf: [
      'Water all plants and grass morning of — green looks greener when hydrated',
      'Blow any overnight leaves off driveway',
      'Photograph exterior in morning — DFW afternoon sun creates harsh shadows and blowout',
      'Turn on all exterior lights for dusk shots if included',
      'Move vehicles and ask neighbors to move vehicles if visible from front',
    ],
    commonFixes: [
      'One car still in driveway or on street (most common exterior photo issue)',
      'Trash can not moved — visible in drone shots',
      'Dead potted plants by front door',
      'Garden hose coiled on lawn',
      'Outdoor furniture not positioned symmetrically',
    ],
    dfwTip: 'CRITICAL FOR DFW: Shoot exterior between 8am–11am. Texas afternoon sun from the south and west creates blown-out sky and harsh shadows that make homes look dated in photos.',
  },
  office: {
    dayBefore: [
      'Remove 90% of desk items — only monitor, lamp, and one small decor item remains',
      'Organize and hide all cables with cable management clips',
      'Clear all bookshelves to 30% capacity — space between books is key',
      'Remove personal plaques, kids\’ drawings, and family photos',
      'Clean monitor screen — smudges show under photo lighting',
    ],
    dayOf: [
      'Turn on desk lamp and overhead',
      'Tuck chair in cleanly under desk',
      'Open blinds if natural light is available',
      'Clear any paper from desk surface entirely',
    ],
    commonFixes: [
      'Cables visible behind desk (use black binder clips to bundle)',
      'Chair rolled at odd angle',
      'Power strip visible on floor',
      'Personal sticky notes still on monitor',
    ],
    dfwTip: 'Work-from-home office photos became high-value after 2020. A clean, minimal office adds perceived value to DFW listings — don\’t skip it.',
  },
};

export default function DFWStagingPhotographyPrep() {
  const [room, setRoom] = useState<RoomKey | ''>('');
  const result = room ? photoPrep[room] : null;

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 24 }}>
          <div style={{ fontSize: 36 }}>📸</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Photography Prep Guide</h1>
          <p style={{ color: '#CBD5E1', fontSize: 15, margin: 0 }}>95% of DFW buyers view photos before visiting. Great listing photos aren't luck — they’re a specific day-before and day-of checklist. Here’s exactly what to do.</p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 20, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📷 DFW Photography Rules</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              ['Shoot exterior 8–11am — afternoon Texas sun destroys curb appeal shots', '🌅'],
              ['Turn on every light — photographers use ambient + flash but need base lighting', '💡'],
              ['Hire a professional — $200–400 investment returns $3,000–8,000 in DFW', '🏆'],
              ['Declutter is an understatement — remove 50% more than you think is right', '📦'],
            ].map(([tip, icon], i) => (
              <div key={i} style={{ backgroundColor: '#F8FAFC', borderRadius: 8, padding: 12, border: '1px solid #E2E8F0′ }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <p style={{ color: '#475569', fontSize: 13, margin: '6px 0 0′ }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 20, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Get Your Room Checklist</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#374151', fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 6 }}>Select Room</label>
            <select value={room} onChange={e => setRoom(e.target.value as RoomKey)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 14 }}>
              <option value="">Select room...</option>
              <option value="living">Living Room</option>
              <option value="kitchen">Kitchen</option>
              <option value="bedroom">Primary Bedroom</option>
              <option value="bathroom">Bathroom</option>
              <option value="exterior">Exterior / Curb Appeal</option>
              <option value="office">Home Office</option>
            </select>
          </div>

          {result && (
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ backgroundColor: '#EFF6FF', borderRadius: 8, padding: 16 }}>
                  <div style={{ color: '#1D4ED8', fontWeight: 700, marginBottom: 10 }}>🗓️ Day Before</div>
                  {result.dayBefore.map((item, i) => <div key={i} style={{ color: '#374151', fontSize: 13, marginBottom: 6 }}>• {item}</div>)}
                </div>
                <div style={{ backgroundColor: '#F0FDF4', borderRadius: 8, padding: 16 }}>
                  <div style={{ color: '#15803D', fontWeight: 700, marginBottom: 10 }}>📸 Day Of</div>
                  {result.dayOf.map((item, i) => <div key={i} style={{ color: '#374151', fontSize: 13, marginBottom: 6 }}>• {item}</div>)}
                </div>
              </div>
              <div style={{ backgroundColor: '#FEF2F2', borderRadius: 8, padding: 16 }}>
                <div style={{ color: '#DC2626', fontWeight: 700, marginBottom: 10 }}>⚠️ What Photographers Most Commonly Ask Sellers to Fix</div>
                {result.commonFixes.map((fix, i) => <div key={i} style={{ color: '#374151', fontSize: 13, marginBottom: 6 }}>• {fix}</div>)}
              </div>
              <div style={{ backgroundColor: '#FEFCE8', borderRadius: 8, padding: 14, border: '1px solid #FDE047′ }}>
                <span style={{ color: '#713F12', fontWeight: 700 }}>🤠 DFW Tip: </span>
                <span style={{ color: '#374151', fontSize: 13 }}>{result.dfwTip}</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, margin: '0 0 4px' }}>⏱️ Time Budget</p>
          <p style={{ color: '#CBD5E1', fontSize: 13, margin: 0 }}>Allocate 4–6 hours the day before and 1 hour the morning of. Rushing photo prep is the single most common mistake in DFW listing preparation.</p>
        </div>
      </div>
    </div>
  );
}
