import { useState } from 'react';

type ConcernKey = 'pet' | 'smoke' | 'cooking' | 'mildew' | 'neutral';

interface ScentPlan {
  severity: string;
  remediation: string[];
  stagingDay: string[];
  avoid: string[];
  timeline: string;
}

const scentPlans: Record<ConcernKey, ScentPlan> = {
  pet: {
    severity: '🔴 High Priority — Pet odors are the #1 deal killer in DFW',
    remediation: [
      'Deep clean all carpet with enzymatic cleaner (Nature\’s Miracle or Rocco & Roxie) — standard cleaners mask, enzymes eliminate',
      'Replace HVAC filter immediately — pet dander circulates for weeks after pet removal',
      'Wash all soft surfaces: couch covers, curtains, throw blankets, dog beds (remove dog beds from home)',
      'Steam clean upholstered furniture — rent unit from Home Depot for $40/day',
      'Ozone treatment if severe: hire pro ($150–300) or rent ozone machine ($50) — evacuate home for 4+ hours',
      'Paint walls if pet odor is embedded — paint seals odor in porous surfaces',
      'Clean baseboards and door frames where pets rub — odor concentrates here',
    ],
    stagingDay: [
      'Remove all pets AND pet equipment (beds, bowls, toys, litter box) for all showings',
      'Open windows 2 hours before showing if DFW weather allows (below 85°F)',
      'Place one or two soy candles (unscented or very light linen) in common areas',
      'Bake cookies or slice apples with cinnamon 30 minutes before — light, universally pleasing',
      'Febreze FABRIC (not air) on upholstery 2 hours before — not right before (chemical smell)',
    ],
    avoid: ['Plug-in air fresheners (overwhelm and signal cover-up)', 'Scented candles with strong fragrance', 'Air freshener spray right before showing', 'Incense of any kind'],
    timeline: 'Start remediation 2–3 weeks before listing. Ozone treatment 1 week out. Final deep clean 48 hours before photography.',
  },
  smoke: {
    severity: '🔴 Critical — Smoke odor requires professional remediation in DFW market',
    remediation: [
      'Hire professional ozone treatment company — smoke requires industrial-grade treatment ($300–600)',
      'Replace all HVAC filters and have ducts professionally cleaned ($200–400)',
      'Repaint all interior walls and ceilings with Kilz or BIN primer then paint — seals odor',
      'Replace carpet if smoke smell is embedded — buyers will notice before you do',
      'Clean all soft furnishings or remove them — smoke permeates fabric deeply',
      'Wipe down all hard surfaces including inside cabinets with TSP cleaner',
    ],
    stagingDay: [
      'Fresh baked goods aroma only — coffee brewing or cookies',
      'Open all windows morning of showing',
      'Light neutral soy candle (unscented) for visual, not scent',
      'No air fresheners — experienced DFW buyers will recognize cover-up attempts',
    ],
    avoid: ['Any artificial fragrance — it signals smoke cover-up', 'Strong candles', 'Plug-ins', 'Incense'],
    timeline: 'Professional treatment required 3–4 weeks before listing. Painting and carpet work must follow. Budget $1,500–3,000 for full remediation.',
  },
  cooking: {
    severity: '🟡 Moderate — Cooking odors are common and fixable in DFW homes',
    remediation: [
      'Deep clean range hood filter — cooking grease accumulates and re-releases odor',
      'Clean inside oven thoroughly — baked-on food odors amplify during showings',
      'Wipe kitchen cabinets inside and out with vinegar solution',
      'Replace HVAC filter — cooking particles circulate',
      'Wash kitchen curtains and rugs — absorb cooking smells over time',
    ],
    stagingDay: [
      'Bake cinnamon rolls or cookies 45 minutes before showing — best possible kitchen scent',
      'Simmer orange peels and cloves on stove 30 minutes before — remove pot before buyers arrive',
      'Leave kitchen window cracked if weather allows',
      'Fresh lemons on counter as visual decor — subtle citrus scent',
    ],
    avoid: ['Cooking spicy or aromatic food the morning of a showing', 'Fish or curry smells — linger for hours', 'Leaving dirty dishes out'],
    timeline: 'Deep clean 1 week before listing. Maintain daily kitchen cleaning through listing period.',
  },
  mildew: {
    severity: '🔴 High Priority — Mildew signals moisture issues — buyers and inspectors both react strongly',
    remediation: [
      'Identify and fix the moisture source before staging — mildew returns without fixing root cause',
      'Run dehumidifier in affected areas — DFW humidity can reach 80%+ in summer',
      'Clean affected surfaces with bleach solution (1:10) or professional mold remediator',
      'Replace any moldy caulk in bathrooms or kitchen — cheap and high impact',
      'Check under sinks and in garage — common DFW problem areas',
      'Air out home aggressively before listing — open windows on dry days',
    ],
    stagingDay: [
      'Ensure dehumidifier has run 24 hours before showing',
      'Fresh towels and bath mats replace old ones',
      'Leave bathroom fans running 1 hour before showing',
      'DRY scent only — eucalyptus or light linen, not floral',
    ],
    avoid: ['Heavy fragrances over mildew — buyers detect both and it\’s worse', 'Closing off affected rooms'],
    timeline: 'Fix moisture source 2–3 weeks before listing. Professional remediation if needed. Dehumidifier running through sale.',
  },
  neutral: {
    severity: '🟢 Excellent Starting Point — Neutral homes stage scent easily',
    remediation: [
      'No remediation needed — maintain current cleanliness',
      'Increase ventilation frequency — open windows on cooler DFW mornings',
      'Replace HVAC filter as routine maintenance — fresh filter = neutral air',
    ],
    stagingDay: [
      'Baked goods or simmered citrus is optional but adds warmth',
      'Fresh flowers in kitchen (not bedroom — some buyers allergic)',
      'Open windows for 30 minutes if temperature is comfortable',
      'Clean neutral is the goal — buyers trust homes that smell like nothing artificial',
    ],
    avoid: ['Adding scent just because — neutral is winning, don\’t change it', 'Plug-ins or heavy candles — unnecessary in a neutral home'],
    timeline: 'Maintain current cleaning regimen. No remediation timeline needed.',
  },
};

export default function DFWStagingScentsGuide() {
  const [concern, setConcern] = useState<ConcernKey | ''>('');
  const result = concern ? scentPlans[concern] : null;

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 24 }}>
          <div style={{ fontSize: 36 }}>👃</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Staging Scent Guide</h1>
          <p style={{ color: '#CBD5E1', fontSize: 15, margin: 0 }}>DFW homes are newer and well-sealed — odors concentrate more than in older, draftier homes. Pet and smoke smells are the top two deal killers in the DFW market.</p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 20, border: '1px solid #E2E8F0' }}>
          <h2 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🐾 DFW Scent Reality</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              ['DFW is one of the most pet-friendly metros in the US — pet odors affect 40%+ of listings', '🐕'],
              ['Modern DFW construction seals homes tightly — odors don\’t escape naturally', '🏠'],
              ['Buyers decide in the first 30 seconds — scent is processed before vision', '⏱️'],
              ['Clean and neutral always beats scented — artificial fragrance signals cover-up', '✅'],
            ].map(([tip, icon], i) => (
              <div key={i} style={{ backgroundColor: '#F8FAFC', borderRadius: 8, padding: 12, border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <p style={{ color: '#475569', fontSize: 13, margin: '6px 0 0' }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 20, border: '1px solid #E2E8F0' }}>
          <h2 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Get Your Scent Remediation Plan</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#374151', fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 6 }}>Current Scent Concern</label>
            <select value={concern} onChange={e => setConcern(e.target.value as ConcernKey)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 14 }}>
              <option value="">Select your situation...</option>
              <option value="pet">Pet odors (dogs, cats, etc.)</option>
              <option value="smoke">Smoke (cigarette or wildfire)</option>
              <option value="cooking">Cooking odors</option>
              <option value="mildew">Musty / mildew smell</option>
              <option value="neutral">Home smells neutral / clean</option>
            </select>
          </div>

          {result && (
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ backgroundColor: '#F8FAFC', borderRadius: 8, padding: 12, border: '1px solid #E2E8F0', fontWeight: 600, color: '#0A1628' }}>{result.severity}</div>
              <div style={{ backgroundColor: '#EFF6FF', borderRadius: 8, padding: 16 }}>
                <div style={{ color: '#1D4ED8', fontWeight: 700, marginBottom: 10 }}>🧹 Remediation Steps</div>
                {result.remediation.map((r, i) => <div key={i} style={{ color: '#374151', fontSize: 13, marginBottom: 8 }}>• {r}</div>)}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ backgroundColor: '#F0FDF4', borderRadius: 8, padding: 16 }}>
                  <div style={{ color: '#15803D', fontWeight: 700, marginBottom: 10 }}>📅 Showing Day Strategy</div>
                  {result.stagingDay.map((s, i) => <div key={i} style={{ color: '#374151', fontSize: 13, marginBottom: 6 }}>• {s}</div>)}
                </div>
                <div style={{ backgroundColor: '#FEF2F2', borderRadius: 8, padding: 16 }}>
                  <div style={{ color: '#DC2626', fontWeight: 700, marginBottom: 10 }}>🚫 Always Avoid</div>
                  {result.avoid.map((a, i) => <div key={i} style={{ color: '#374151', fontSize: 13, marginBottom: 6 }}>• {a}</div>)}
                </div>
              </div>
              <div style={{ backgroundColor: '#FEFCE8', borderRadius: 8, padding: 16, border: '1px solid #FDE047' }}>
                <div style={{ color: '#713F12', fontWeight: 700, marginBottom: 6 }}>⏰ Timeline</div>
                <div style={{ color: '#374151', fontSize: 13 }}>{result.timeline}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, margin: '0 0 4px' }}>🏆 The Gold Standard</p>
          <p style={{ color: '#CBD5E1', fontSize: 13, margin: 0 }}>The best-selling DFW homes smell like fresh air and nothing else. Clean beats scented every time. When in doubt, neutralize — don't add.</p>
        </div>
      </div>
    </div>
  );
}
