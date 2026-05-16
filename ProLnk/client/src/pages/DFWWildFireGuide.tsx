import { useState } from 'react';

const locations = ['Parker County', 'Palo Pinto County', 'Johnson County', 'Erath/Hood County', 'Suburban Tarrant/Denton'];
const vegTypes = ['Open grassland', 'Mixed grass/cedar brush', 'Dense cedar/juniper', 'Suburban landscaping'];
const homeFeatures = ['Wood siding', 'Brick/stucco exterior', 'Composite/fiber cement siding', 'Metal exterior'];

function getRiskScore(loc: string, veg: string, home: string): { score: number; label: string; color: string } {
  let score = 0;
  if (loc === 'Parker County' || loc === 'Palo Pinto County' || loc === 'Erath/Hood County') score += 40;
  else if (loc === 'Johnson County') score += 25;
  else score += 5;
  if (veg === 'Dense cedar/juniper') score += 35;
  else if (veg === 'Mixed grass/cedar brush') score += 25;
  else if (veg === 'Open grassland') score += 15;
  else score += 5;
  if (home === 'Wood siding') score += 25;
  else if (home === 'Composite/fiber cement siding') score += 10;
  else if (home === 'Brick/stucco exterior') score += 5;
  else score += 2;
  const label = score >= 80 ? 'EXTREME' : score >= 60 ? 'HIGH' : score >= 35 ? 'MODERATE' : 'LOW';
  const color = score >= 80 ? '#DC2626' : score >= 60 ? '#EF4444' : score >= 35 ? '#F97316' : '#22C55E';
  return { score: Math.min(score, 100), label, color };
}

const defensibleSpace: Record<string, string[]> = {
  'Open grassland': ['Zone 1 (0-30ft): Remove all dry grass and maintain green lawn', 'Zone 2 (30-100ft): Mow grass below 4 inches, remove dead vegetation', 'Create fuel breaks every 50ft in pasture areas'],
  'Mixed grass/cedar brush': ['Zone 1 (0-30ft): Remove all cedar, grass, and shrubs within 30ft', 'Zone 2 (30-100ft): Space shrubs 10ft apart, remove ladder fuels', 'Cut cedar to ground — roots will not resprout after full removal'],
  'Dense cedar/juniper': ['Immediate professional cedar removal required — extreme fire risk', 'Zone 1 must be 100% cleared of cedar and juniper', 'Zone 2 cedar removal minimum 50%, 10ft spacing on remainder', 'Annual maintenance contract required — cedar regrows quickly'],
  'Suburban landscaping': ['Remove mulch within 5ft of structure — use gravel or stone', 'Replace wood fencing adjacent to home with metal or masonry', 'Space ornamental shrubs 3ft from structure walls', 'Hardscape patio areas within 10ft of entry points'],
};

const homePriorities: Record<string, string[]> = {
  'Wood siding': ['Replace wood siding with fiber cement — highest ROI for wildfire', 'Install ember-resistant vents on all soffits and gable vents', 'Box-in all eaves — open eaves collect embers', 'Metal or tile roof — replace wood shake immediately'],
  'Brick/stucco exterior': ['Install ember-resistant vent covers on all attic vents', 'Seal all gaps at roof-wall junction', 'Double-pane windows with tempered glass on fire-side exposures', 'Metal deck railings — wood deck rails ignite easily'],
  'Composite/fiber cement siding': ['Install ember-resistant vents — siding is good but vents are vulnerable', 'Seal all utility penetrations with fire-rated caulk', 'Check soffit material — fiber cement body with wood soffit is still vulnerable'],
  'Metal exterior': ['Metal exterior is excellent — focus on vents and windows', 'Ember-resistant vent screens on all attic and crawl space vents', 'Tempered glass windows — standard glass can shatter from heat', 'Check roof-wall connections for gaps'],
};

export default function DFWWildFireGuide() {
  const [location, setLocation] = useState('');
  const [veg, setVeg] = useState('');
  const [home, setHome] = useState('');
  const risk = location && veg && home ? getRiskScore(location, veg, home) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔥 DFW Wildfire Guide</div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>Wildfire Risk & Home Hardening for DFW</h1>
          <p style={{ color: '#94A3B8', marginTop: '0.75rem', lineHeight: 1.6 }}>DFW's outer counties — Parker, Palo Pinto, Johnson, Erath, and Hood — carry significant wildfire risk especially during drought years. The combination of invasive cedar, dry grasslands, and expanding suburban development creates conditions where a single spark can threaten entire neighborhoods.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[{ emoji: '🌵', title: 'Cedar = Fire Accelerant', desc: 'Invasive Eastern Red Cedar has replaced native grasslands across DFW western counties. Cedar burns explosively, produces intense radiant heat, and spreads fire 5x faster than grass.' }, { emoji: '💨', title: 'DFW Wind Patterns', desc: 'Southerly winds push fire north into expanding suburbs. North winds during cold fronts are most dangerous — fires can spread 2+ miles per hour under frontal passage.' }, { emoji: '🏚️', title: 'Ember Cast', desc: 'Homes rarely burn from direct flame contact. Embers travel 1-2 miles ahead of the fire front and ignite through attic vents, open eaves, and wood decks.' }, { emoji: '📅', title: 'Peak Risk Season', desc: "Late winter through spring (Feb-May) when grasses are dead and cedar is dry. September-October during late-season droughts. DFW's 2023 drought extended peak season year-round." }].map(c => (
            <div key={c.title} style={{ background: '#132038', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{c.emoji}</div>
              <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.25rem' }}>{c.title}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.5 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132038', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, marginBottom: '1rem' }}>🔍 Your Wildfire Risk Assessment</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            {[{ label: 'DFW Location', value: location, setter: setLocation, options: locations }, { label: 'Vegetation Type', value: veg, setter: setVeg, options: vegTypes }, { label: 'Home Exterior', value: home, setter: setHome, options: homeFeatures }].map(f => (
              <div key={f.label}>
                <label style={{ display: 'block', color: '#94A3B8', marginBottom: '0.5rem', fontSize: '0.875rem' }}>{f.label}</label>
                <select value={f.value} onChange={e => f.setter(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E2E8F0', border: '1px solid #1E3A5F', borderRadius: '6px', padding: '0.75rem', fontSize: '0.9rem' }}>
                  <option value="">Select...</option>
                  {f.options.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            ))}
          </div>
          {risk && (
            <div>
              <div style={{ background: risk.color + '22', border: `2px solid ${risk.color}`, borderRadius: '8px', padding: '1rem', marginBottom: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.875rem', color: '#94A3B8' }}>Wildfire Risk Score</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: risk.color }}>{risk.score}/100</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 600, color: risk.color }}>{risk.label} RISK</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                  <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.75rem', fontSize: '0.875rem' }}>🌿 Defensible Space Requirements</div>
                  {(defensibleSpace[veg] ?? []).map((item, i) => <div key={i} style={{ color: '#94A3B8', fontSize: '0.8rem', marginBottom: '0.4rem', lineHeight: 1.4 }}>{item}</div>)}
                </div>
                <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                  <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.75rem', fontSize: '0.875rem' }}>🏠 Home Hardening Priorities</div>
                  {(homePriorities[home] ?? []).map((item, i) => <div key={i} style={{ color: '#94A3B8', fontSize: '0.8rem', marginBottom: '0.4rem', lineHeight: 1.4 }}>{item}</div>)}
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#1a0800', border: '1px solid #9A3412', borderRadius: '8px', padding: '1rem' }}>
          <div style={{ fontWeight: 600, color: '#FED7AA', marginBottom: '0.5rem' }}>🚨 Evacuation Planning</div>
          <div style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.6 }}>Have a go-bag ready with 72 hours of supplies. Know two evacuation routes in every direction. Sign up for county emergency alerts. Do not wait for mandatory evacuation orders in high-risk areas — leave early when conditions deteriorate.</div>
        </div>
      </div>
    </div>
  );
}
