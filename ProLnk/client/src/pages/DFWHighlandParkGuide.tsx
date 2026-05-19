import { useState } from 'react';

const sizeOptions = ['Under 3,000 sq ft', '3,000–5,000 sq ft', '5,000–8,000 sq ft', 'Over 8,000 sq ft'];
const budgetOptions = ['$25K–$75K', '$75K–$150K', '$150K–$300K', '$300K+'];

type Rec = { service: string; multiplier: string; note: string };

const recommendations: Record<string, Record<string, Rec[]>> = {
  'Under 3,000 sq ft': {
    '$25K–$75K': [
      { service: 'HVAC replacement (premium Carrier/Trane)', multiplier: '1.4× DFW avg → $9,500–$18,000', note: 'HP specialists required in HP enclave' },
      { service: 'Kitchen appliance package upgrade', multiplier: '1.5× avg → $12,000–$25,000', note: 'Sub-Zero/Wolf expected' },
      { service: 'Bathroom tile + fixture update', multiplier: '1.6× avg → $15,000–$35,000', note: 'Porcelain/marble tile, Kohler/Toto fixtures' },
      { service: 'Exterior painting (custom trim work)', multiplier: '1.3× avg → $5,000–$12,000', note: 'Multi-color, historically appropriate' },
    ],
    '$75K–$150K': [
      { service: 'Kitchen full remodel (semi-custom cabinetry)', multiplier: '1.5× avg → $55,000–$95,000', note: 'Custom millwork, quartz or stone counters' },
      { service: 'Master bath gut renovation', multiplier: '1.6× avg → $30,000–$55,000', note: 'Heated floors, steam shower, soaking tub' },
      { service: 'Whole-home generator (Generac/Kohler)', multiplier: '1.3× avg → $18,000–$30,000', note: 'Standby auto-transfer, whole-house capacity' },
      { service: 'Landscape + irrigation design', multiplier: '1.8× avg → $20,000–$45,000', note: 'Formal garden design expected' },
    ],
    '$150K–$300K': [
      { service: 'Primary suite addition or expansion', multiplier: '1.6× avg → $120,000–$220,000', note: 'Architectural permit, matching exterior' },
      { service: 'Smart home integration (full house)', multiplier: '1.7× avg → $35,000–$65,000', note: 'Lutron, Control4, Sonos whole-home' },
      { service: 'Wine cellar + climate room', multiplier: '2.0× avg → $25,000–$55,000', note: 'Custom built-ins, precise humidity control' },
      { service: 'Pool + outdoor kitchen', multiplier: '1.5× avg → $80,000–$160,000', note: 'Gunite pool, outdoor gas appliances' },
    ],
    '$300K+': [
      { service: 'Full interior design + renovation', multiplier: '1.8× avg → $250K+', note: 'Designer-led, custom everything' },
      { service: 'Addition + structural expansion', multiplier: '1.7× avg → $200K+', note: 'Architect + structural engineer required' },
      { service: 'Exterior + landscape master plan', multiplier: '2.0× avg → $100K+', note: 'Landscape architect, hardscape, lighting' },
      { service: 'Home automation: full Control4 ecosystem', multiplier: '1.8× avg → $60K+', note: 'Dedicated AV room, whole-home audio/video' },
    ],
  },
  '3,000–5,000 sq ft': {
    '$25K–$75K': [
      { service: 'HVAC system (multi-zone)', multiplier: '1.4× → $14,000–$28,000', note: 'Zoned system required for larger footprint' },
      { service: 'Wood floor refinishing (hardwood throughout)', multiplier: '1.3× → $8,000–$18,000', note: 'Wide-plank, custom stain, hand-scraped finish' },
      { service: 'Exterior window washing + sealing contract', multiplier: '1.2× → $1,500–$3,500/visit', note: 'Annual maintenance for stucco/stone facades' },
      { service: 'Fireplace + chimney service', multiplier: '1.3× → $2,000–$5,000', note: 'Gas log set, decorative surround update' },
    ],
    '$75K–$150K': [
      { service: 'Kitchen remodel (custom cabinetry)', multiplier: '1.6× → $80,000–$130,000', note: 'Designer kitchen, high-end appliances' },
      { service: 'Whole-home interior repaint', multiplier: '1.4× → $12,000–$22,000', note: 'Fine-finish painters, custom colors' },
      { service: 'Master bath renovation', multiplier: '1.7× → $40,000–$70,000', note: 'Spa-caliber finishes' },
      { service: 'Landscape refresh (mature trees + formal beds)', multiplier: '1.8× → $25,000–$55,000', note: 'Formal HP aesthetic' },
    ],
    '$150K–$300K': [
      { service: 'Kitchen + butler’s pantry expansion', multiplier: '1.6× → $130,000–$220,000', note: 'Full structural if wall removal needed' },
      { service: 'Media room / home theater build-out', multiplier: '1.9× → $50,000–$90,000', note: 'Acoustic treatment, 4K projection, riser seating' },
      { service: 'Guest suite renovation (full bath + sitting)', multiplier: '1.5× → $45,000–$80,000', note: 'Hotel-quality finishes' },
      { service: 'Smart home full integration', multiplier: '1.7× → $45,000–$80,000', note: 'Control4, Lutron, whole-home' },
    ],
    '$300K+': [
      { service: 'Primary wing addition', multiplier: '1.7× → $300K+', note: 'Architect + permit + structural' },
      { service: 'Complete interior redesign (designer-led)', multiplier: '2.0× → $250K+', note: 'Interior architect, custom furniture' },
      { service: 'Pool + spa + outdoor entertainment', multiplier: '1.6× → $150K+', note: 'Gunite, outdoor kitchen, covered patio' },
      { service: 'Full smart home + security ecosystem', multiplier: '1.8× → $80K+', note: 'Cameras, alarm, automation, AV' },
    ],
  },
  '5,000–8,000 sq ft': {
    '$25K–$75K': [
      { service: 'HVAC zone expansion / new zone', multiplier: '1.5× → $15,000–$30,000', note: 'Multi-zone critical at this size' },
      { service: 'Whole-home water filtration + softener', multiplier: '1.3× → $5,000–$12,000', note: 'Whole-house system, under-counter RO' },
      { service: 'Roof inspection + preventive maintenance', multiplier: '1.4× → $3,000–$8,000', note: 'Slate, tile, or standing seam likely' },
      { service: 'Exterior lighting upgrade', multiplier: '1.5× → $8,000–$18,000', note: 'Landscape + architectural lighting design' },
    ],
    '$75K–$150K': [
      { service: 'Full HVAC replacement (3–4 units)', multiplier: '1.5× → $35,000–$65,000', note: 'Multiple units, zoned control required' },
      { service: 'Secondary kitchen / butler’s pantry build', multiplier: '1.6× → $40,000–$80,000', note: 'Full appliance package, custom cabinetry' },
      { service: 'Whole-home generator (whole-house standby)', multiplier: '1.4× → $25,000–$45,000', note: 'Natural gas, automatic transfer switch' },
      { service: 'Wine cellar + cigar room', multiplier: '2.0× → $35,000–$70,000', note: 'Climate-controlled, humidor system' },
    ],
    '$150K–$300K': [
      { service: 'Kitchen full renovation (chef-grade)', multiplier: '1.8× → $150,000–$250,000', note: 'Wolf/Sub-Zero/Miele, custom island' },
      { service: 'Pool renovation or new build', multiplier: '1.6× → $120,000–$200,000', note: 'Gunite, water features, automation' },
      { service: 'Home office + library build-out', multiplier: '1.9× → $40,000–$80,000', note: 'Built-in millwork, acoustic doors' },
      { service: 'Full exterior repaint + repair', multiplier: '1.5× → $18,000–$35,000', note: 'Stucco repair, fine-finish painting' },
    ],
    '$300K+': [
      { service: 'Second floor addition or significant expansion', multiplier: '1.8× → $400K+', note: 'Structural, architect, permit' },
      { service: 'Complete kitchen + primary suite renovation', multiplier: '2.0× → $300K+', note: 'Top-tier design team' },
      { service: 'Outdoor living complex (pool, pavilion, kitchen)', multiplier: '1.7× → $200K+', note: 'Full landscape architect engagement' },
      { service: 'Smart home: whole-estate automation', multiplier: '2.0× → $100K+', note: 'Crestron/Control4, custom programming' },
    ],
  },
  'Over 8,000 sq ft': {
    '$25K–$75K': [
      { service: 'Annual HVAC preventive maintenance contract', multiplier: '1.5× → $5,000–$12,000/yr', note: '4–6 units common at this scale' },
      { service: 'Roof section repair / slate/tile replacement', multiplier: '1.6× → $15,000–$40,000', note: 'Premium materials match original' },
      { service: 'Porte-cochere or entry refinishing', multiplier: '1.7× → $10,000–$25,000', note: 'First impressions matter at this tier' },
      { service: 'Whole-home water treatment system', multiplier: '1.4× → $6,000–$14,000', note: 'Commercial-grade filtration' },
    ],
    '$75K–$150K': [
      { service: 'Full HVAC zone replacement (one zone)', multiplier: '1.6× → $25,000–$50,000/zone', note: 'Per zone cost at estate scale' },
      { service: 'Staff quarters renovation', multiplier: '1.5× → $40,000–$80,000', note: 'Separate entrance, full bath, kitchenette' },
      { service: 'Whole-home generator (estate-scale)', multiplier: '1.5× → $45,000–$80,000', note: 'Kohler/Cummins 60–100kW unit' },
      { service: 'Security system upgrade', multiplier: '1.8× → $25,000–$55,000', note: 'Cameras, access control, monitoring' },
    ],
    '$150K–$300K': [
      { service: 'Primary suite renovation (spa + dressing room)', multiplier: '2.0× → $150,000–$250,000', note: 'Resort-level finishes' },
      { service: 'Ballroom / formal entertainment space refresh', multiplier: '1.8× → $80,000–$160,000', note: 'Custom plaster, lighting design, floors' },
      { service: 'Pool + spa + water feature renovation', multiplier: '1.7× → $120,000–$220,000', note: 'Gunite remodel, new equipment, automation' },
      { service: 'Full smart home reprogramming', multiplier: '2.0× → $80,000–$150,000', note: 'Crestron reprogramming + hardware update' },
    ],
    '$300K+': [
      { service: 'Estate-wide renovation (multiple rooms)', multiplier: '2.0× → $500K+', note: 'Interior designer, architect, custom contracts' },
      { service: 'Carriage house / guest house conversion', multiplier: '1.8× → $300K+', note: 'Full ADU with premium finishes' },
      { service: 'Full landscape + hardscape master plan', multiplier: '2.2× → $200K+', note: 'Landscape architect, irrigation, lighting' },
      { service: 'Home theater + wine vault complex', multiplier: '2.0× → $150K+', note: 'Custom acoustic design, climate room' },
    ],
  },
};

export default function DFWHighlandParkGuide() {
  const [size, setSize] = useState('');
  const [budget, setBudget] = useState('');

  const results = size && budget ? recommendations[size]?.[budget] ?? [] : [];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2 }}>🏰 DALLAS NEIGHBORHOOD GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Highland Park TX</h1>
        <h2 style={{ fontSize: 20, fontWeight: 400, color: '#a0b0c8', marginBottom: 24 }}>Luxury Home Maintenance Guide</h2>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 28, borderLeft: '4px solid #F5E642′ }}>
          <p style={{ margin: 0, lineHeight: 1.7, color: '#c8d8e8′ }}>
            Highland Park is one of Texas's most prestigious enclaves — homes range from 1920s estates to contemporary builds, all meticulously maintained. Contractors who work here charge a <strong style={{ color: '#F5E642' }}>30–120% premium</strong> over standard DFW rates. Expectations for finishes, discretion, and project management are uniquely high. Select your home size and budget to see what premium service looks like in HP.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 8, color: '#F5E642', fontWeight: 600, fontSize: 14 }}>📐 Home Size</label>
            <select value={size} onChange={e => setSize(e.target.value)} style={{ width: '100%', backgroundColor: '#0f2040', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}>
              <option value="">Select size…</option>
              {sizeOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 8, color: '#F5E642', fontWeight: 600, fontSize: 14 }}>💰 Renovation Budget</label>
            <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', backgroundColor: '#0f2040', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}>
              <option value="">Select budget…</option>
              {budgetOptions.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>

        {results.length > 0 && (
          <div>
            <h3 style={{ color: '#F5E642', marginBottom: 16, fontSize: 18 }}>Premium Service Recommendations</h3>
            {results.map((r, i) => (
              <div key={i} style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: '16px 18px', marginBottom: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{r.service}</div>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{r.multiplier}</div>
                <div style={{ fontSize: 13, color: '#a0b0c8′ }}>💡 {r.note}</div>
              </div>
            ))}
            <div style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: 16, marginTop: 8, fontSize: 13, color: '#a0b0c8′ }}>
              ⚠️ Highland Park contractors are often booked 2–4 months out. Plan ahead and get on preferred contractor lists early.
            </div>
          </div>
        )}

        {!size && !budget && (
          <div style={{ textAlign: 'center', padding: 40, color: '#4a6a8a' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🏛️</div>
            <div style={{ fontSize: 16 }}>Select your home size and budget to see Highland Park premium service recommendations.</div>
          </div>
        )}

        <div style={{ marginTop: 36, padding: 20, backgroundColor: '#0f2040', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Connect with Highland Park Specialists</div>
          <div style={{ color: '#a0b0c8', fontSize: 14, marginBottom: 16 }}>ProLnk vets contractors who work in HP and the Park Cities — discretion, quality, and reliability guaranteed.</div>
          <div style={{ display: 'inline-block', backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Get Vetted Contractors →</div>
        </div>
      </div>
    </div>
  );
}
