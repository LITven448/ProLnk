import { useState } from 'react';

const lifestyles = [
  { id: 'entertainer', label: '🎉 Entertainer (large groups, parties)' },
  { id: 'family', label: '👨‍👩‍👧 Family (kids, pets, backyard play)' },
  { id: 'relaxer', label: '☕ Relaxer (quiet retreat, morning coffee)' },
  { id: 'outdoor_cook', label: '🔥 Outdoor Cook (BBQ, smoker, kitchen)' },
];

const sizeTiers = [
  { id: 'small', label: 'Small Patio (< 300 sq ft)' },
  { id: 'medium', label: 'Medium Patio (300–600 sq ft)' },
  { id: 'large', label: 'Large Yard / Patio (600+ sq ft)' },
];

type DesignKey = `${string}_${string}`;

const designs: Record<string, { concept: string; materials: string[]; cost: string; shadeNote: string; roi: string }> = {
  entertainer_small: {
    concept: 'Elevated Intimate Patio: Built-in bench seating with cushions around perimeter maximizes seating without floor space. Bar-height table with 4 stools, wall-mounted outdoor TV, string lights overhead. Pergola with shade sail for mandatory DFW coverage.',
    materials: ['Concrete pavers (cool gray or tan — hide DFW dust well)', 'Steel pergola with shade sail (faster + cheaper than wood in DFW heat)', 'All-weather upholstered cushions (Sunbrella fabric for TX UV)', 'LED bistro string lights (dusk-to-dawn timer)'],
    cost: '$8,000–$18,000 complete build',
    shadeNote: 'DFW temperatures reach 105°F+ in summer — shade is not optional. Pergola with shade sail or retractable awning is minimum. Outdoor ceiling fan under any covered structure extends usable hours dramatically.',
    roi: '72% ROI on covered patio in DFW market — buyers add covered patio square footage to their perceived home size',
  },
  entertainer_medium: {
    concept: 'Full Outdoor Living Room: Covered patio with outdoor sectional and coffee table as primary zone. Secondary dining zone with table for 6–8. Built-in bar or kitchen pass-through from interior. Defined zones with different flooring materials.',
    materials: ['Stamped concrete or large-format pavers (16x16 or 24x24)', 'Wood-look composite decking for elevated sections', 'Full pergola or patio cover with ceiling fans', 'Outdoor sectional in UV-resistant fabric'],
    cost: '$18,000–$40,000 complete build',
    shadeNote: 'Two shade zones minimum for medium spaces: covered sitting area and shaded dining. DFW buyers mentally calculate how much time they can actually use the space based on shade coverage.',
    roi: '85% ROI for DFW entertainer outdoor rooms — buyers treat covered outdoor living as conditioned square footage equivalent',
  },
  entertainer_large: {
    concept: 'Full Outdoor Entertainment Complex: Distinct zones — covered living room, alfresco dining for 10+, outdoor kitchen with built-in grill and smoker, possible fire pit or pool area. This is the DFW dream configuration for entertaining families.',
    materials: ['Natural stone or premium pavers for main surface', 'Outdoor kitchen with concrete counters and built-in grill', 'Full pergola or solid patio cover with ceiling fans and lighting', 'Fire pit in separate zone (gas preferred for DFW burn restrictions)'],
    cost: '$35,000–$100,000+ depending on outdoor kitchen and pool',
    shadeNote: 'Large DFW outdoor spaces need layered shade: permanent structure over dining and living, plus shade trees or sail shades for pool/yard areas. Mature shade trees add $5,000–$15,000 value in DFW specifically.',
    roi: '90%+ ROI when includes outdoor kitchen — DFW buyers pay premium for complete outdoor kitchen setups',
  },
  family_small: {
    concept: 'Family-Function Patio: Durable outdoor dining table for 4–6 seating the family. Small splash pad or sandbox area if kids young. Simple lawn area even in small yard. Storage for outdoor toys. Easy-clean surfaces prioritized over elegance.',
    materials: ['Concrete slab or durable pavers (avoid light colors that show red TX clay)', 'Pressure-treated wood pergola with shade sail', 'Composite or teak outdoor furniture (durable vs UV damage)', 'Artificial turf patch if natural grass difficult (DFW water restrictions apply)'],
    cost: '$6,000–$15,000',
    shadeNote: 'Shade for children is critical — DFW UV is extreme and young children overheat quickly. Covered patio + shade sail over play area. Misting system under pergola extends outdoor play hours.',
    roi: '65% ROI — family-focused spaces appeal strongly to the dominant DFW buyer demographic',
  },
  family_medium: {
    concept: 'Backyard Family Hub: Covered patio with outdoor dining and casual seating. Separate lawn area for kids. Built-in sandbox or small play area if applicable. Space for trampoline if buyers have children. Easy sightlines from patio to yard.',
    materials: ['Extended concrete patio with defined edges', 'Artificial turf for maintenance-free lawn (DFW water restrictions and heat stress natural grass)', 'Wooden playset or outdoor play structure on rubber mulch', 'Durable outdoor furniture with washable cushions'],
    cost: '$12,000–$28,000',
    shadeNote: 'Sightlines from covered patio to play area are a DFW family buyer requirement — they need to watch kids from the shade. Design for visibility, not just aesthetics.',
    roi: '70% ROI — buyers with children will pay premium for functional family backyard',
  },
  family_large: {
    concept: 'Complete Family Estate Backyard: Covered outdoor living area, dining, pool or pool preparation, dedicated play zone, lawn area. Pool in DFW adds $20K–$50K to value. Separate zones for adult entertaining and child play with clear sightlines.',
    materials: ['Pool or pool-prep plumbing (DFW buyers expect pools in upper-bracket homes)', 'Artificial turf perimeter around pool for safety and maintenance', 'Full outdoor kitchen adjacent to covered patio', 'Play structure on rubber mulch in dedicated zone with shade'],
    cost: '$40,000–$120,000+ if adding pool',
    shadeNote: 'Large DFW family backyards need shade trees in addition to structures. Mature live oak trees are DFW gold — buyers mention them in purchase decisions. Plant if young, highlight if mature.',
    roi: 'Pool adds approximately $25K–$50K in DFW market value — highest ROI outdoor investment in the market',
  },
  relaxer_small: {
    concept: 'Private Retreat Patio: Two lounge chairs or small conversation set. Water feature (tabletop fountain or wall-mounted) for sound masking. Ambient string lighting. Potted plants for privacy and greenery. This is about atmosphere, not size.',
    materials: ['Stained concrete or natural stone pavers', 'Small pergola or cantilever umbrella for shade', 'Teak or powder-coated aluminum furniture (DFW UV resistance)', 'Drought-tolerant native plants in large pots (TX redbud, salvia, lantana)'],
    cost: '$4,000–$10,000',
    shadeNote: 'Small covered retreat: DFW buyers with small outdoor spaces need shade to actually use them. Even a single cantilever umbrella dramatically improves perceived usability.',
    roi: '60% ROI — retreat spaces show beautifully in listing photos and appeal to downsizers and professionals',
  },
  relaxer_medium: {
    concept: 'Sanctuary Outdoor Room: Hammock or daybed zone for lounging. Separate seating area. Water feature or small fountain. Native plant border for privacy and beauty. Soft lighting for evening use. The goal is calm — antidote to busy DFW pace.',
    materials: ['Natural travertine or limestone pavers (cooler underfoot than concrete in TX heat)', 'Pergola with climbing plants for natural shade', 'All-weather daybed with outdoor mattress', 'Low-voltage landscape lighting'],
    cost: '$10,000–$22,000',
    shadeNote: 'Natural shade from pergola with climbing Confederate jasmine or wisteria is DFW romantic — adds privacy and reduces summer heat. Takes 2–3 seasons to mature, so plant early.',
    roi: '65% ROI — buyers pay premium for thoughtfully designed retreat spaces in DFW',
  },
  relaxer_large: {
    concept: 'Estate Outdoor Sanctuary: Multiple relaxation zones — morning coffee area, afternoon reading zone, evening fire pit area. Pool or water feature optional. Native plant gardens. Full landscape lighting. Designed for extended outdoor time across all seasons.',
    materials: ['Premium natural stone throughout', 'Landscape lighting (pathway, accent, uplighting)', 'Gas fire pit or fireplace for DFW evenings', 'Mature plant material for immediate privacy and shade'],
    cost: '$20,000–$60,000',
    shadeNote: 'Large retreat spaces benefit from mature tree canopy — DFW buyers for sanctuary-type properties specifically value established trees. A mature live oak is worth $10,000–$20,000 to the right DFW buyer.',
    roi: '70% ROI for high-end sanctuary spaces in upper-bracket DFW neighborhoods',
  },
  outdoor_cook_small: {
    concept: 'Compact Outdoor Kitchen: Built-in grill on small outdoor kitchen run (8–10 ft). Mini-fridge, side burner, counter space for prep. Bar seating facing grill. Even small outdoor kitchens command premium in DFW.',
    materials: ['Concrete block or steel-frame outdoor kitchen', 'Granite or concrete countertop (outdoor rated)', 'Built-in Weber or Blaze grill', 'Compact beverage fridge'],
    cost: '$6,000–$15,000 for compact outdoor kitchen',
    shadeNote: 'Grill cook needs shade — DFW summers make unshaded grilling miserable and unsafe. Pergola over the cooking zone extends use to 9 months. Ceiling fan reduces feels-like temperature significantly.',
    roi: '80% ROI on outdoor kitchen in DFW — buyers with this lifestyle seek it specifically and pay premium',
  },
  outdoor_cook_medium: {
    concept: 'Full Outdoor Kitchen + Dining: 12–16 ft kitchen run with grill, smoker space, side burners, sink, storage, and refrigerator. Bar seating on one side, dining table adjacent. This is the DFW backyard BBQ setup that wins listing photos.',
    materials: ['Concrete block kitchen base with stucco or stone veneer finish', 'Built-in grill (DCS, Blaze, or Weber Summit)', 'Outdoor-rated sink with hot/cold water', 'Concrete or granite countertop'],
    cost: '$18,000–$40,000',
    shadeNote: 'Full outdoor kitchen under solid patio cover or pergola — cooking generates significant heat in DFW summers. Ceiling fans mandatory. Consider misting system for cooking zone.',
    roi: '85% ROI for full outdoor kitchen setups in DFW — buyers specifically search for this feature',
  },
  outdoor_cook_large: {
    concept: 'Outdoor Entertainment Kitchen Complex: Full kitchen with smoker pit, multiple grills, wood-fired oven option, full bar, outdoor dining for 12+, separate bar seating. This is the competitive DFW listing differentiator.',
    materials: ['Masonry outdoor kitchen with stone facade', 'Multiple cooking appliances (grill + smoker + burners)', 'Full outdoor bar with bar sink, ice maker, fridge', 'Extended concrete or stone counter space (20+ linear feet)'],
    cost: '$35,000–$80,000',
    shadeNote: 'Large outdoor kitchen complex needs full solid roof cover — pergola with shade sail insufficient for cooking zone. Insulated patio cover or full solid roof prevents heat radiating back down on cooks and guests.',
    roi: '90%+ ROI in upper-bracket DFW neighborhoods — outdoor kitchen complex is the ultimate Texas lifestyle differentiator',
  },
};

export default function DFWOutdoorLivingDesignGuide() {
  const [lifestyle, setLifestyle] = useState('');
  const [size, setSize] = useState('');
  const key: DesignKey = `${lifestyle}_${size}`;
  const design = lifestyle && size ? designs[key] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 840, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>🌿 DFW Home Seller Guide</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Outdoor Living Design<br />Guide for DFW</h1>
        <p style={{ color: '#8B9DC3', marginBottom: 40, fontSize: 16, lineHeight: 1.7 }}>
          DFW homeowners use outdoor spaces 9 months per year — outdoor living is not a luxury, it's a lifestyle requirement. Buyers evaluate outdoor spaces as functional square footage. Shade is mandatory, not optional.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { icon: '🌡️', title: 'Shade is Mandatory', note: '105°F DFW summers mean zero functional outdoor space without shade — this is the first investment' },
            { icon: '📅', title: '9 Months Outdoor', note: 'DFW climate allows outdoor living Oct–May easily, with shade extending Jun–Sep usability' },
            { icon: '💧', title: 'Heat-Resistant Materials', note: 'Concrete, composite, and stone outperform wood decking in DFW heat and storm cycles' },
            { icon: '🔗', title: 'Indoor-Outdoor Flow', note: 'Sliding glass doors and matching flooring materials connect interior to exterior — top DFW buyer expectation' },
          ].map(tip => (
            <div key={tip.title} style={{ background: '#0F2040', borderRadius: 10, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{tip.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6, color: '#F5E642' }}>{tip.title}</div>
              <div style={{ fontSize: 13, color: '#8B9DC3', lineHeight: 1.5 }}>{tip.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>🔍 Outdoor Design Concept Generator</h2>
          <div style={{ marginBottom: 20 }}>
            <p style={{ color: '#8B9DC3', marginBottom: 12, fontSize: 14, fontWeight: 600 }}>Step 1: Select your outdoor lifestyle:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
              {lifestyles.map(l => (
                <button key={l.id} onClick={() => setLifestyle(l.id)} style={{ background: lifestyle === l.id ? '#F5E642' : '#0A1628', color: lifestyle === l.id ? '#0A1628' : '#E8EAF0', border: '2px solid', borderColor: lifestyle === l.id ? '#F5E642' : '#1E3A5F', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: 13 }}>
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <p style={{ color: '#8B9DC3', marginBottom: 12, fontSize: 14, fontWeight: 600 }}>Step 2: Select your outdoor space size:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
              {sizeTiers.map(s => (
                <button key={s.id} onClick={() => setSize(s.id)} style={{ background: size === s.id ? '#F5E642' : '#0A1628', color: size === s.id ? '#0A1628' : '#E8EAF0', border: '2px solid', borderColor: size === s.id ? '#F5E642' : '#1E3A5F', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: 13 }}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          {design && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 24, border: '1px solid #F5E642' }}>
              <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 20, color: '#F5E642' }}>
                {lifestyles.find(l => l.id === lifestyle)?.label} — {sizeTiers.find(s => s.id === size)?.label}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, color: '#E8EAF0' }}>🎯 Design Concept</div>
                <p style={{ fontSize: 13, color: '#8B9DC3', lineHeight: 1.7 }}>{design.concept}</p>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, color: '#E8EAF0' }}>🏗️ Material Recommendations</div>
                {design.materials.map((m, i) => (
                  <div key={i} style={{ fontSize: 13, color: '#8B9DC3', marginBottom: 6, paddingLeft: 16, position: 'relative', lineHeight: 1.5 }}>
                    <span style={{ position: 'absolute', left: 0, color: '#F5E642' }}>→</span>{m}
                  </div>
                ))}
              </div>
              <div style={{ background: '#0F2040', borderRadius: 8, padding: 14, marginBottom: 14, border: '1px solid #2A4A6F' }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6, color: '#F5E642' }}>☀️ DFW Shade Strategy</div>
                <div style={{ fontSize: 13, color: '#8B9DC3', lineHeight: 1.6 }}>{design.shadeNote}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ background: '#0F2040', borderRadius: 8, padding: 14 }}>
                  <div style={{ fontSize: 11, color: '#8B9DC3', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Estimated Investment</div>
                  <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 16 }}>{design.cost}</div>
                </div>
                <div style={{ background: '#0F2040', borderRadius: 8, padding: 14 }}>
                  <div style={{ fontSize: 11, color: '#8B9DC3', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>DFW Market ROI</div>
                  <div style={{ fontSize: 13, color: '#4CAF50', fontWeight: 600, lineHeight: 1.4 }}>{design.roi}</div>
                </div>
              </div>
            </div>
          )}
          {lifestyle && size && !design && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, textAlign: 'center', color: '#8B9DC3', border: '1px solid #1E3A5F' }}>
              Select both a lifestyle and space size to get your personalized design concept.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
