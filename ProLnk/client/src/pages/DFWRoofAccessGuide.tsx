import { useState } from 'react';

const purposes = ['Post-storm inspection', 'Gutter cleaning', 'Antenna or satellite work', 'Solar panel inspection', 'Chimney or flashing check', 'General annual inspection'];
const homeTypes = ['Single-story (8-12 ft eave)', 'Two-story (18-24 ft eave)', 'Steep pitch (8:12 or greater)', 'Low-slope / flat section', 'Metal or tile roof surface'];

const guides: Record<string, string> = {
  'Post-storm inspection|Single-story (8-12 ft eave)': 'Single-story post-storm inspection is manageable with proper safety. Use a 24-ft extension ladder, extend 3 ft above eave, secure base. Best DFW timing: early morning before 9am from May through September. Look for: lifted shingles, hail divots (look at soft metals first — vents, flashing), missing ridge caps, gutter damage. Document with photos before touching anything.',
  'Post-storm inspection|Two-story (18-24 ft eave)': 'Two-story post-storm access carries real fall risk — 85% of fatal falls involve ladders over 16 ft. Strongly consider a licensed roofer for the climb. If you proceed: use a 40-ft extension ladder, have a spotter holding base, never work alone. DFW heat makes two-story roofs dangerously hot by 10am June-August — go at dawn or hire out.',
  'Post-storm inspection|Steep pitch (8:12 or greater)': 'Steep pitch roof work requires fall protection — period. OSHA standard: any roof over 4:12 pitch requires harness, anchor, and lanyard. Rent a roof bracket system ($40/day) or hire a licensed roofer. DFW storms create false urgency — a photo from the ground with a zoom lens tells you 80% of what you need to know.',
  'Gutter cleaning|Single-story (8-12 ft eave)': 'Single-story gutter cleaning is the safest DIY roof-adjacent task in DFW. Use a 24-ft extension ladder, rubber-soled shoes, and work in sections — never reach more than arm’s length from ladder. Best DFW timing: October after pecan leaf drop, March after cedar pollen. Avoid any roof access in July-August heat — gutter cleaning from the ladder without stepping on roof is acceptable.',
  'Antenna or satellite work|Single-story (8-12 ft eave)': 'Antenna and satellite work on single-story homes is manageable but requires fall protection planning. Use roof anchors or have someone hold your safety rope if walking the surface. Avoid DFW afternoons — roof surface temps reach 160F+ in summer. Check for loose flashing around any existing mast before stepping near it.',
  'Chimney or flashing check|Two-story (18-24 ft eave)': 'Chimney and flashing work on two-story homes should be done by a licensed roofing contractor or chimney sweep. The combination of height, sloped surface, and chimney obstruction creates compounding fall hazards. Get a quote — DFW roofers typically charge $150-250 for a chimney flashing inspection and re-seal.',
};

const fallback = (p: string, h: string) =>
  `For ${p.toLowerCase()} on a ${h.toLowerCase()}: DFW heat is your biggest enemy — surface temps exceed 150F from June through September. Never access roofs between 10am and 6pm in summer. Always use a 3-point ladder contact, non-slip footwear, and a spotter for any height. When in doubt, hire a licensed DFW roofing contractor for $75-150 inspection fee.`;

const checklist = ['✅ Check weather — no work if winds over 15 mph', '✅ Start before 9am June-September', '✅ Extend ladder 3 feet above eave', '✅ Wear rubber-soled shoes', '✅ Have a spotter on the ground', '✅ Bring phone for photos, not tools on first pass', '✅ Mark any damage before stepping near it'];

export default function DFWRoofAccessGuide() {
  const [purpose, setPurpose] = useState('');
  const [homeType, setHomeType] = useState('');
  const [result, setResult] = useState('');

  const analyze = () => {
    if (!purpose || !homeType) return;
    setResult(guides[`${purpose}|${homeType}`] || fallback(purpose, homeType));
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', marginBottom: '0.25rem' }}>🪜 DFW Roof Access Guide</div>
        <p style={{ color: '#9BACC8', marginBottom: '2rem' }}>Safety, timing, and what to inspect on your DFW roof</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>⚠️ DFW-Specific Roof Safety Context</div>
          <p style={{ color: '#CBD5E8', lineHeight: 1.7, margin: 0 }}>
            DFW creates unique roof access hazards. Summer surface temps hit 150-165F — dehydration and heat stroke risk is real.
            Post-storm urgency leads to hasty decisions on wet or debris-covered roofs. DFW hail storms (600+ events per decade) create the
            most common reason homeowners attempt roof access. Know your limits: two-story access and steep pitches require professional help.
            Most DFW insurance claims can be initiated with ground-level photos plus a licensed roofer report.
          </p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>📋 Before You Climb: Safety Checklist</div>
          {checklist.map(c => <div key={c} style={{ color: '#CBD5E8', padding: '0.3rem 0', borderBottom: '1px solid #1A2F4F' }}>{c}</div>)}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>🏠 Get Your Access Plan</div>
          <label style={{ color: '#9BACC8', fontSize: '0.85rem', display: 'block', marginBottom: '0.3rem' }}>Purpose of Roof Access</label>
          <select value={purpose} onChange={e => setPurpose(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#162035', color: '#E8EDF5', border: '1px solid #2A3F5F', borderRadius: 8, marginBottom: '0.75rem' }}>
            <option value="">Select purpose...</option>
            {purposes.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <label style={{ color: '#9BACC8', fontSize: '0.85rem', display: 'block', marginBottom: '0.3rem' }}>Home / Roof Type</label>
          <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#162035', color: '#E8EDF5', border: '1px solid #2A3F5F', borderRadius: 8, marginBottom: '1rem' }}>
            <option value="">Select home type...</option>
            {homeTypes.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '0.7rem 2rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Get Safety Checklist</button>
          {result && <div style={{ marginTop: '1rem', background: '#162035', borderRadius: 8, padding: '1rem', color: '#CBD5E8', lineHeight: 1.7, borderLeft: '3px solid #F5E642' }}>{result}</div>}
        </div>

        <p style={{ color: '#6B7FA3', fontSize: '0.8rem', textAlign: 'center' }}>
          DFW licensed roofers typically offer free storm inspections. Your insurance claim does not require you to access the roof yourself.
        </p>
      </div>
    </div>
  );
}
