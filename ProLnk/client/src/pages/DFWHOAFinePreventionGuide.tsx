import { useState } from 'react';

const COMMUNITY_TYPES = ['Master-planned community (Frisco/Allen/McKinney)', 'Established suburb HOA (Plano/Richardson)', 'New construction tract home HOA', 'Townhome / Attached HOA', 'Golf course community', 'Entry-level community (Arlington/Mesquite/Garland)'];

const violations: Record<string, { topViolations: string[]; prevention: string[]; fineRange: string; proTip: string }> = {
  'Master-planned community (Frisco/Allen/McKinney)': {
    topViolations: ['Bermuda grass over 4″ (DFW bermuda grows 1″ per week in summer — must mow weekly June–Aug)', 'Trash cans visible from street after 8pm collection day', 'Holiday decorations up past Jan 15 or before Nov 1', 'Unapproved exterior paint colors (strict palettes in MPCs)', 'Basketball hoops in driveway (many MPCs prohibit permanently)'],
    prevention: ['Set weekly mow reminder every Monday June–August — bermuda will violate within 10 days without it', 'Move trash cans same day as pickup', 'Use HOA portal app — most large MPCs (Collin Creek, Star Trail, etc.) have violation photo alerts', 'Submit exterior modification request BEFORE any change — approval takes 2–4 weeks', 'Request the full violation history for your street — patterns emerge'],
    fineRange: '$50–$250 first offense, escalating to $1,000+ with daily fines in some Frisco MPCs',
    proTip: 'Frisco and McKinney MPCs have the most aggressive enforcement in DFW. Hire a lawn service with a guaranteed weekly schedule June–August — the risk of a $200 fine exceeds the $40/mow cost.'
  },
  'Established suburb HOA (Plano/Richardson)': {
    topViolations: ['Parking on street overnight (many Plano HOAs prohibit street parking 2am–6am)', 'Fence condition — wood fences in DFW need staining every 3–4 years or rot visibly', 'Weeds in beds (DFW spring weeds emerge fast in March)', 'Satellite dish visible from street (dish must be in approved location)', 'Work vehicles or commercial vehicles parked in driveway'],
    prevention: ['Register all vehicles — know your HOA parking rules cold', 'Power wash and restain fence every 3 years — schedule for fall when DFW heat breaks', 'Pre-emergent in February stops spring weed explosion', 'Call HOA before dish install — approved locations vary by lot orientation', 'Check CC&Rs for work vehicle definition — some allow if enclosed'],
    fineRange: '$25–$150 first offense in most established Plano/Richardson HOAs',
    proTip: 'Established suburb HOAs in Plano/Richardson tend to be notice-first — you get a 30-day cure period before fines. Respond to notices promptly in writing.'
  },
  'New construction tract home HOA': {
    topViolations: ['Construction debris left in yard (DFW wind spreads it to neighbors — immediate violation)', 'Sod not installed per builder timeline (HOA enforces landscaping completion deadlines)', 'Mailbox style deviation from community standard', 'Exterior light fixtures not matching approved styles', 'Patio furniture visible from street (some new HOAs prohibit front-visible patio items)'],
    prevention: ['Get builder\’s HOA compliance checklist at closing — they often don\’t volunteer it', 'Install landscaping within HOA timeline (usually 6–12 months from close)', 'Photograph your mailbox and compare to HOA standard document before any replacement', 'Join community Facebook group — violation notices get posted and you learn the enforcement patterns', 'Read deed restrictions — new construction HOAs in DFW are often builder-controlled for first 5 years'],
    fineRange: '$50–$200 first offense. Builder-controlled HOAs can move faster than resident-controlled ones',
    proTip: 'New construction tract HOAs in DFW are often the strictest because the builder controls the ARB for years. Document everything and submit modification requests in writing with photos.'
  },
  'Townhome / Attached HOA': {
    topViolations: ['Noise complaints (attached walls = low threshold in DFW townhome HOAs)', 'Balcony/patio storage visible from common area', 'Unapproved front door color (attached HOAs have strict exterior uniformity rules)', 'Pet waste on common areas', 'Unauthorized modifications to shared structures (roof, fence, foundation)'],
    prevention: ['Read shared maintenance agreement carefully — know what is your cost vs HOA cost', 'Balcony: store items in approved containers or interior storage only', 'Front door color: townhome HOAs rarely allow deviation — submit request in writing before painting', 'Pick up pet waste immediately — DFW heat makes this a fast neighbor complaint', 'Any roof, gutter, or foundation work: written HOA approval first'],
    fineRange: '$50–$500. Townhome HOAs can also assess special fees for shared structure repairs',
    proTip: 'Townhome HOA rules in DFW are enforced neighbor-by-neighbor — be proactive about relationships. Most violations start as neighbor complaints, not board inspections.'
  },
  'Golf course community': {
    topViolations: ['Cart path encroachment (placing items on cart path easement)', 'Exterior lighting visible from course (light ordinances protect golfer visibility)', 'Landscaping that obstructs course sightlines', 'Unapproved fence height (course views protected by most CC&Rs)', 'Guest parking in course-adjacent lots without guest pass'],
    prevention: ['Know your lot\’s easement boundaries — golf course easements in DFW can extend 10–20 feet into your yard', 'Submit all landscape plans before planting near course boundary', 'Review course sightline restrictions in CC&Rs — trees are the most common violation trigger', 'Fence permit: always check with HOA before installing — heights often restricted to 4 feet on course-side', 'Get guest parking passes in advance for parties'],
    fineRange: '$100–$500 first offense in most DFW golf communities. Course encroachment can result in mandatory removal at owner cost',
    proTip: 'Golf course community HOA meetings in DFW are often dominated by course-related disputes. Attend at least one meeting per year to understand the current enforcement priorities.'
  },
  'Entry-level community (Arlington/Mesquite/Garland)': {
    topViolations: ['Vehicle on blocks or inoperable vehicle in driveway', 'Tall grass and weeds (DFW city code overlaps with HOA rules here — double enforcement risk)', 'Outdoor storage (furniture, lumber, equipment) visible from street', 'Broken window screens or damaged facia visible from street', 'Excessive signage (political signs, multiple for-sale signs, window signs)'],
    prevention: ['Remove any inoperable vehicle within 30 days — city code + HOA can both cite simultaneously', 'Mow every 10 days minimum in DFW summer — city code triggers at 12″ in most municipalities', 'Use a storage shed for outdoor items — shed must also be HOA-approved (submit request first)', 'Repair screens and facia before spring — HOA inspection frequency often increases March–May', 'Know sign rules: DFW HOAs generally allow one political sign, one for-sale sign only'],
    fineRange: '$25–$100 first offense in most entry-level DFW HOAs. City code fines can stack on top.',
    proTip: 'Entry-level DFW communities often have city code enforcement and HOA enforcement running independently. A tall grass violation can generate two separate fines. Address issues within 7 days of notice.'
  },
};

export default function DFWHOAFinePreventionGuide() {
  const [communityType, setCommunityType] = useState('');
  const [result, setResult] = useState<null | typeof violations['Master-planned community (Frisco/Allen/McKinney)']>(null);

  function handleAnalyze() {
    if (!communityType) return;
    setResult(violations[communityType]);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#1e40af', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>🏘️ DFW HOME GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#0f172a' }}>DFW HOA Fine Prevention</h1>
        <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.6 }}>
          DFW has some of the most active HOA enforcement in Texas. Bermuda grass in Frisco can violate in 10 days without mowing.
          Know your community type — violations and enforcement patterns differ dramatically across DFW.
        </p>
        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '1rem', marginBottom: '2rem' }}>
          <span style={{ color: '#1e40af', fontWeight: 700 }}>📋 DFW Fact: </span>
          <span style={{ color: '#1e40af', fontSize: '0.9rem' }}>Collin County (Frisco, McKinney, Allen) has the highest HOA fine collections per capita in Texas. North Dallas master-planned communities issue 40,000+ violation notices annually.</span>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.75rem', fontWeight: 600 }}>🏡 SELECT YOUR DFW COMMUNITY TYPE</div>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {COMMUNITY_TYPES.map(o => (
              <button key={o} onClick={() => setCommunityType(o)}
                style={{ padding: '0.75rem 1rem', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontSize: '0.9rem', textAlign: 'left',
                  borderColor: communityType === o ? '#1e40af' : '#e2e8f0', background: communityType === o ? '#1e40af' : '#fff',
                  color: communityType === o ? '#fff' : '#334155', fontWeight: communityType === o ? 700 : 400 }}>
                {o}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleAnalyze} disabled={!communityType}
          style={{ background: communityType ? '#1e40af' : '#e2e8f0', color: communityType ? '#fff' : '#94a3b8',
            border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 800, fontSize: '1rem', cursor: communityType ? 'pointer' : 'default', marginBottom: '2rem' }}>
          Get Violation Prevention Checklist →
        </button>

        {result && (
          <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'grid', gap: '1.5rem' }}>
            <div style={{ color: '#1e40af', fontWeight: 800, fontSize: '1.1rem' }}>📋 Top Violations + Prevention Checklist</div>

            <div>
              <div style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>⚠️ MOST COMMON VIOLATIONS IN YOUR COMMUNITY TYPE</div>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                {result.topViolations.map((v, i) => (
                  <div key={i} style={{ background: '#fef2f2', borderRadius: 6, padding: '0.75rem', borderLeft: '3px solid #ef4444', fontSize: '0.9rem', color: '#7f1d1d' }}>
                    {i + 1}. {v}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ color: '#15803d', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>✅ PREVENTION CHECKLIST</div>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                {result.prevention.map((p, i) => (
                  <div key={i} style={{ background: '#f0fdf4', borderRadius: 6, padding: '0.75rem', borderLeft: '3px solid #22c55e', fontSize: '0.9rem', color: '#14532d' }}>
                    ☑ {p}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: '#f8fafc', borderRadius: 8, padding: '1rem', border: '1px solid #e2e8f0′ }}>
                <div style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '0.25rem' }}>💰 TYPICAL FINE RANGE</div>
                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem' }}>{result.fineRange}</div>
              </div>
              <div style={{ background: '#eff6ff', borderRadius: 8, padding: '1rem', border: '1px solid #bfdbfe' }}>
                <div style={{ color: '#1e40af', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>💡 DFW PRO TIP</div>
                <div style={{ fontSize: '0.85rem', color: '#1e3a8a' }}>{result.proTip}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
