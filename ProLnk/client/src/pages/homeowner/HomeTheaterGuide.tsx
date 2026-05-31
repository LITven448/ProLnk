import { useState } from 'react';

type RoomType = 'dedicated' | 'living' | 'bonus' | 'garage';
type BudgetTier = 'budget' | 'mid' | 'premium';
type UseCase = 'movies' | 'sports' | 'gaming' | 'mixed';

interface TheaterResult {
  displayRec: string;
  audioRec: string;
  seatingRec: string;
  keyItems: string[];
  totalLow: number;
  totalHigh: number;
  warnings: string[];
}

function getTheaterPlan(room: RoomType, budget: BudgetTier, use: UseCase): TheaterResult {
  const plans: Record<string, TheaterResult> = {
    'dedicated-budget': { displayRec: '75-85" QLED or OLED TV', audioRec: 'Quality 5.1 soundbar with subwoofer', seatingRec: 'Sectional sofa with recliners', keyItems: ['Blackout curtains ($200-400)', 'Dedicated circuit for electronics', 'Streaming devices (4K Apple TV or Roku)', 'Cable management'], totalLow: 3000, totalHigh: 6000, warnings: ['Even dedicated rooms need blackout treatment — DFW sun is intense', 'Add mini-split zone or HVAC vent — enclosed room + electronics = heat'] },
    'dedicated-mid': { displayRec: '100-120" projector + 4K screen', audioRec: '5.1 or 7.1 surround sound', seatingRec: 'Theater seating (4-6 seats)', keyItems: ['4K laser projector ($2,000-4,000)', 'Acoustic panels (reduces echo dramatically)', 'Motorized screen with lens shift', 'Dedicated Dolby Atmos processor'], totalLow: 10000, totalHigh: 20000, warnings: ['Projector rooms require full light control — zero ambient light', 'Acoustic treatment is the most overlooked mid-range upgrade'] },
    'dedicated-premium': { displayRec: '4K laser projector + custom masking screen', audioRec: 'Dolby Atmos 11.2.4 or greater', seatingRec: 'Custom theater seating with power recline', keyItems: ['Reference-grade AV processor ($3,000-8,000)', 'In-wall/in-ceiling speaker installation', 'Custom acoustic design + panels', 'Lutron lighting system'], totalLow: 25000, totalHigh: 80000, warnings: ['Requires dedicated electrical panel — 200A minimum for full system', 'AV integration runs $2,000-8,000 for professional programming'] },
    'living-budget': { displayRec: '65-77" OLED TV', audioRec: 'Soundbar with Atmos + subwoofer', seatingRec: 'Sectional with view sightlines', keyItems: ['Quality soundbar ($500-1,200)', 'Streaming device', 'Surge protector power conditioner', 'Light-blocking cellular shades'], totalLow: 2000, totalHigh: 5000, warnings: ['Living room ambient light is the biggest audio/visual compromise', 'Soundbars compromise vs. full surround — but dramatically better than TV speakers'] },
    'living-mid': { displayRec: '85-98" QLED or Mini-LED TV', audioRec: '5.1 surround sound with rear surrounds', seatingRec: 'Dedicated AV furniture arrangement', keyItems: ['Motorized blackout shades ($500-1,500)', 'Equipment rack/cabinet', 'HDMI 2.1 cables throughout', 'Smart home integration for lighting'], totalLow: 6000, totalHigh: 14000, warnings: ['Rear surround placement in living room requires cable management planning', 'Consider TV lift cabinet for dual-use living rooms'] },
    'living-premium': { displayRec: '100"+ MicroLED or 8K display', audioRec: 'Full surround with in-ceiling Atmos speakers', seatingRec: 'Custom furniture arranged for optimal viewing', keyItems: ['Whole-room AV system', 'Integrated smart home control', 'Motorized art concealing TV', 'Reference-level subwoofer'], totalLow: 20000, totalHigh: 50000, warnings: ['In-ceiling Atmos speakers require structural access — plan with contractor', 'MicroLED displays require professional calibration'] },
    'bonus-budget': { displayRec: '75-85" TV or entry projector', audioRec: '5.1 soundbar or basic surround', seatingRec: 'Bean bags + futon + floor pillows', keyItems: ['Blackout window treatments', 'Gaming-optimized display settings', 'HDMI switch for multiple sources', 'Refrigerator/mini bar'], totalLow: 2500, totalHigh: 5500, warnings: ['Bonus rooms often have HVAC dead zones — verify cooling before heavy use', 'Check floor load capacity for heavy seating'] },
    'bonus-mid': { displayRec: '100-120" projector + screen', audioRec: '5.1 surround with bookshelf speakers', seatingRec: 'Theater-style seating (2 rows)', keyItems: ['Dedicated HVAC zone (bonus rooms run hot)', 'Acoustic treatment for irregular walls', 'Bar counter + mini fridge', 'Gaming console central hub'], totalLow: 8000, totalHigh: 18000, warnings: ['Bonus rooms benefit most from acoustic treatment — irregular shapes cause echo', `Two-row seating needs 12' minimum depth for sightlines`] },
    'bonus-premium': { displayRec: 'Custom scope screen + 4K projector', audioRec: 'Dolby Atmos with in-ceiling speakers', seatingRec: 'Luxury theater seating (2 tiered rows)', keyItems: ['Raised platform for second row', 'Full acoustic design', 'Custom lighting scenes', 'Integrated bar with wine fridge'], totalLow: 20000, totalHigh: 55000, warnings: ['Raised platform requires structural engineering approval and permit', 'In-ceiling speaker installation in bonus room requires attic access'] },
    'garage-budget': { displayRec: '65-75" outdoor-rated or protected TV', audioRec: 'Weather-resistant soundbar', seatingRec: 'Durable patio furniture or bar stools', keyItems: ['Insulated garage door (required first step)', 'Mini-split AC (mandatory in DFW)', 'Epoxy floor before furniture', 'Weatherproof outlet covers'], totalLow: 4000, totalHigh: 9000, warnings: ['DFW garage theater is unlivable without climate control — $1,500-3,500 for mini-split is unavoidable', 'Standard TVs will fail in uncontrolled humidity — use commercial or outdoor-rated display'] },
    'garage-mid': { displayRec: '85-100" outdoor-rated display or projector', audioRec: '5.1 weather-resistant speakers', seatingRec: 'Durable theater-style or bar setup', keyItems: ['Full HVAC for garage space', 'Insulated walls + ceiling', 'Sound dampening on garage door', 'Dedicated electrical subpanel'], totalLow: 12000, totalHigh: 28000, warnings: ['Garage conversion requires permit for electrical work', 'Sound leaks heavily through garage door — add mass-loaded vinyl or solid door'] },
    'garage-premium': { displayRec: 'Full indoor theater setup (converted space)', audioRec: 'Dolby Atmos full build-out', seatingRec: 'Custom theater seating in converted space', keyItems: ['Full garage conversion with insulation', 'Dedicated HVAC zone', 'Fire-rated drywall on shared walls', 'Proper egress and code compliance'], totalLow: 30000, totalHigh: 80000, warnings: ['Garage-to-living-space conversion requires permit and inspection', 'HOA approval may be required — check before starting'] },
  };
  const key = `${room}-${budget}`;
  return plans[key] || plans['living-mid'];
}

export default function HomeTheaterGuide() {
  const [room, setRoom] = useState<RoomType>('living');
  const [budget, setBudget] = useState<BudgetTier>('mid');
  const [useCase, setUseCase] = useState<UseCase>('mixed');
  const plan = getTheaterPlan(room, budget, useCase);

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#a78bfa', fontWeight: 600, letterSpacing: 1 }}>
          🏠 DFW HOMEOWNER GUIDES
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16, color: '#f8fafc' }}>
          DFW Home Theater Guide
        </h1>
        <p style={{ fontSize: 18, color: '#94a3b8', marginBottom: 40, lineHeight: 1.7 }}>
          Build the Perfect Entertainment Space
        </p>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, marginBottom: 32, borderLeft: '4px solid #a78bfa' }}>
          <p style={{ fontSize: 16, color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
            🎬 <strong style={{ color: '#f1f5f9' }}>DFW home theater advantage:</strong> DFW`s long summers make indoor entertainment essential. A home theater adds $15,000-30,000 in perceived value and is a top selling feature for $500K+ DFW homes. The right system pays back in lifestyle and resale value.
          </p>
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f1f5f9`, marginBottom: 20 }}>🏠 Room Selection</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🎭', title: 'Dedicated Room', desc: 'Best option. Full light/sound/HVAC control. Bonus rooms, basements (rare in DFW), converted garages.', score: '10/10' },
            { icon: '🛋️', title: 'Living Room', desc: 'Most common. Light and sound compromise, but works well with right TV and soundbar. Versatile.', score: '7/10' },
            { icon: '🏠', title: 'Bonus Room', desc: 'Great compromise. More control than living room, less construction than dedicated room. Very popular in DFW.', score: '9/10' },
            { icon: '🚗', title: 'Converted Garage', desc: 'Challenging but possible with full conversion. Requires significant investment in climate control first.', score: '6/10' },
          ].map(item => (
            <div key={item.title} style={{ background: '#1e293b', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ fontWeight: 700, color: '#f1f5f9', fontSize: 15 }}>{item.title}</div>
                <div style={{ color: '#a78bfa', fontWeight: 700, fontSize: 13 }}>{item.score}</div>
              </div>
              <div style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: 13 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f1f5f9', marginBottom: 20 }}>📺 Equipment Tiers</h2>
        <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
          {[
            { tier: 'Budget', range: '$2,000-5,000', icon: '⭐', color: '#94a3b8', items: ['65-75" QLED or OLED TV', 'Quality soundbar with subwoofer', 'Streaming devices (Apple TV 4K, Roku)', 'Comfortable sectional seating', 'Blackout curtains'] },
            { tier: 'Mid-Range', range: '$5,000-15,000', icon: '⭐⭐', color: '#38bdf8', items: ['85-100" display or projector + screen', '5.1 or 7.1 surround sound system', 'Acoustic treatment panels', 'Equipment rack + cable management', 'Motorized shades'] },
            { tier: 'Premium', range: '$15,000-50,000+', icon: '⭐⭐⭐', color: '#a78bfa', items: ['Dedicated room with 4K laser projector', 'Dolby Atmos 7.2.4 or higher', 'Custom acoustic design', 'Theater seating (power recline)', 'Integrated smart home control'] },
          ].map(tier => (
            <div key={tier.tier} style={{ background: '#1e293b', borderRadius: 12, padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                  <span style={{ fontSize: 16, marginRight: 10 }}>{tier.icon}</span>
                  <span style={{ fontWeight: 700, color: '#f1f5f9', fontSize: 18 }}>{tier.tier}</span>
                </div>
                <div style={{ color: tier.color, fontWeight: 800, fontSize: 18 }}>{tier.range}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 8 }}>
                {tier.items.map(item => (
                  <div key={item} style={{ display: 'flex', gap: 8, color: '#94a3b8', fontSize: 14 }}>
                    <span style={{ color: tier.color }}>✓</span><span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f1f5f9', marginBottom: 20 }}>⚠️ DFW-Specific Considerations</h2>
        <div style={{ display: 'grid', gap: 16, marginBottom: 40 }}>
          {[
            { icon: '☀️', title: 'Light Control', body: 'DFW sun is intense and the #1 enemy of projector images and OLED longevity. Quality blackout curtains ($200-600) or motorized shades ($500-2,000) are essential — not optional.' },
            { icon: '❄️', title: 'HVAC Load', body: 'Large AV electronics + multiple bodies in an enclosed room creates significant heat load. Add a dedicated mini-split zone for any dedicated media room. Costs $1,500-3,500 but prevents equipment damage and discomfort.' },
            { icon: '⚡', title: 'Electrical', body: 'AV equipment needs dedicated 20A circuits. Surge protection is critical in DFW storm season — lightning strike through power lines destroys electronics without proper protection. Budget $200-600 for quality surge protection.' },
          ].map(item => (
            <div key={item.title} style={{ background: '#1e293b', borderRadius: 10, padding: 20, display: 'flex', gap: 16 }}>
              <span style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: 8 }}>{item.title}</div>
                <div style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: 15 }}>{item.body}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f1f5f9', marginBottom: 20 }}>📋 Permits & Installation Costs</h2>
        <div style={{ background: '#1e293b', borderRadius: 12, overflow: 'hidden', marginBottom: 40 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#0f172a' }}>
                {['Work Type', 'Permit Required?', 'Typical Cost'].map(h => (
                  <th key={h} style={{ padding: '14px 20px', textAlign: 'left', color: '#a78bfa', fontSize: 13, fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['TV Mounting', 'No', '$200-400'],
                ['Projector Installation', 'No', '$400-800'],
                ['Electrical (new circuits)', 'Yes — required', '$400-800 per circuit'],
                ['Custom AV Integration', 'No', '$2,000-8,000'],
                ['Structural Room Addition', 'Yes — required', 'Varies by scope'],
              ].map(([type, permit, cost], i) => (
                <tr key={type} style={{ borderTop: '1px solid #334155', background: i % 2 === 0 ? 'transparent' : '#162032' }}>
                  <td style={{ padding: '14px 20px', color: '#f1f5f9', fontWeight: 600 }}>{type}</td>
                  <td style={{ padding: '14px 20px', color: permit.includes('Yes') ? '#ef4444' : '#22c55e' }}>{permit}</td>
                  <td style={{ padding: '14px 20px', color: '#94a3b8' }}>{cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f1f5f9', marginBottom: 20 }}>🔧 System Builder</h2>
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 28 }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 14, marginBottom: 8, fontWeight: 600 }}>Room Type</label>
              <select value={room} onChange={e => setRoom(e.target.value as RoomType)} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: 8, padding: '12px 16px', color: '#f1f5f9', fontSize: 15, boxSizing: 'border-box' }}>
                <option value="living">Living Room</option>
                <option value="dedicated">Dedicated Room</option>
                <option value="bonus">Bonus Room</option>
                <option value="garage">Converted Garage</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 14, marginBottom: 8, fontWeight: 600 }}>Budget Tier</label>
              <select value={budget} onChange={e => setBudget(e.target.value as BudgetTier)} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: 8, padding: '12px 16px', color: '#f1f5f9', fontSize: 15, boxSizing: 'border-box' }}>
                <option value="budget">Budget ($2K-5K)</option>
                <option value="mid">Mid-Range ($5K-15K)</option>
                <option value="premium">Premium ($15K+)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 14, marginBottom: 8, fontWeight: 600 }}>Primary Use</label>
              <select value={useCase} onChange={e => setUseCase(e.target.value as UseCase)} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: 8, padding: '12px 16px', color: '#f1f5f9', fontSize: 15, boxSizing: 'border-box' }}>
                <option value="movies">Movies / TV</option>
                <option value="sports">Sports Watching</option>
                <option value="gaming">Gaming</option>
                <option value="mixed">Mixed Use</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
            {[
              { label: 'Display', value: plan.displayRec, icon: '📺' },
              { label: 'Audio', value: plan.audioRec, icon: '🔊' },
              { label: 'Seating', value: plan.seatingRec, icon: '🛋️' },
            ].map(item => (
              <div key={item.label} style={{ background: '#0f172a', borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 20, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ color: '#64748b', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{item.label.toUpperCase()}</div>
                <div style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.5 }}>{item.value}</div>
              </div>
            ))}
          </div>

          <div style={{ background: '#0f172a', borderRadius: 10, padding: 16, marginBottom: 20, textAlign: 'center' }}>
            <div style={{ color: '#64748b', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>TOTAL ESTIMATE</div>
            <div style={{ color: '#a78bfa', fontSize: 28, fontWeight: 800 }}>
              ${plan.totalLow.toLocaleString()} - ${plan.totalHigh.toLocaleString()}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#94a3b8', fontSize: 14, fontWeight: 700, marginBottom: 12 }}>KEY ITEMS FOR YOUR BUILD</div>
            <div style={{ display: 'grid', gap: 8 }}>
              {plan.keyItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12 }}>
                  <span style={{ color: '#a78bfa', fontWeight: 700 }}>✓</span>
                  <span style={{ color: '#cbd5e1', fontSize: 14 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {plan.warnings.length > 0 && (
            <div style={{ background: '#2d1f00', borderRadius: 10, padding: 16 }}>
              <div style={{ color: '#f59e0b', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>⚠️ WATCH OUT</div>
              {plan.warnings.map((w, i) => (
                <div key={i} style={{ color: '#fbbf24', fontSize: 14, lineHeight: 1.5, marginBottom: i < plan.warnings.length - 1 ? 6 : 0 }}>• {w}</div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: 'linear-gradient(135deg, #1e1b4b, #0f0f2d)', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🎬</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9', marginBottom: 12 }}>Find a DFW AV Installer</h3>
          <p style={{ color: '#94a3b8', marginBottom: 24, lineHeight: 1.6 }}>
            ProLnk connects you with vetted AV integrators, electricians, and HVAC contractors who specialize in DFW home theater builds.
          </p>
          <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#a78bfa', color: '#0f172a', fontWeight: 800, padding: '14px 32px', borderRadius: 10, textDecoration: 'none', fontSize: 16 }}>
            Get Free Quotes
          </a>
        </div>

      </div>
    </div>
  );
}
