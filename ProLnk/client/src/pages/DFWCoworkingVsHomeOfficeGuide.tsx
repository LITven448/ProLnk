import { useState } from 'react';

type Rec = { choice: string; reason: string; monthlyCost: string; taxNote: string };

const coworkingSpaces = [
  { name: 'Industrious (Uptown Dallas)', price: '$450/mo', type: 'Premium', perks: 'Dedicated desk, meeting rooms, mail service' },
  { name: 'Common Desk (Deep Ellum)', price: '$250/mo', type: 'Flex', perks: 'Hot desk, events, strong community' },
  { name: 'The Square (Frisco)', price: '$299/mo', type: 'Suburban', perks: 'Quiet, parking, family-friendly suburb vibe' },
  { name: 'Regus (Multiple DFW)', price: '$200–400/mo', type: 'Corporate', perks: 'Day offices, virtual address, 800+ locations' },
  { name: 'WeWork (Downtown Dallas)', price: '$400/mo', type: 'Premium', perks: 'Beer on tap, events, enterprise network' },
  { name: 'WorkSuites (North Dallas)', price: '$350/mo', type: 'Professional', perks: 'Private offices, conference rooms, receptionist' },
];

function getRecommendation(style: string, meetings: string, budget: string): Rec {
  if (budget === 'Under $200/mo') return { choice: 'Home Office', reason: 'Coworking below $200/mo in DFW is rare; a home office is the better investment at this budget.', monthlyCost: '$0 (after one-time setup)', taxNote: 'Deduct $5/sq ft up to 300 sq ft using simplified method ($1,500 max deduction).' };
  if (style === 'Deep Focus' && meetings === 'Rarely (< 2/mo)') return { choice: 'Home Office', reason: 'You rarely need a professional meeting space and do your best work alone — invest in a great home setup.', monthlyCost: '$0 ongoing after $3,000–8,000 setup', taxNote: 'Home office deduction applies if space is used regularly and exclusively for work.' };
  if (meetings === 'Frequently (2+/week)') return { choice: 'Coworking Space', reason: 'Frequent client meetings demand a professional environment. Coworking gives you meeting rooms without a lease.', monthlyCost: '$250–450/mo', taxNote: '100% deductible as business expense — no home office calculation needed.' };
  if (style === 'Social / Collaborative') return { choice: 'Coworking Space', reason: 'You thrive around people. The community and serendipitous connections at DFW coworking spaces will energize you.', monthlyCost: '$250–400/mo', taxNote: 'Fully deductible as business expense.' };
  return { choice: 'Hybrid (Home + Day Passes)', reason: 'Mix a solid home office with $30–50 day passes for client days — best of both worlds at lower cost.', monthlyCost: '$60–150/mo for day passes', taxNote: 'Day passes fully deductible. Home office deduction also applies for home days.' };
}

export default function DFWCoworkingVsHomeOfficeGuide() {
  const [style, setStyle] = useState('Deep Focus');
  const [meetings, setMeetings] = useState('Occasionally (2–4/mo)');
  const [budget, setBudget] = useState('$200–500/mo');
  const rec = getRecommendation(style, meetings, budget);

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', color: '#1E293B', fontFamily: 'Inter, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 12, fontSize: 13, color: '#2563EB', fontWeight: 600, letterSpacing: 2 }}>DFW REMOTE WORKER GUIDE</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, color: '#0F172A' }}>Coworking vs. Home Office in DFW</h1>
        <p style={{ color: '#64748B', fontSize: 16, marginBottom: 40, lineHeight: 1.7 }}>Real cost comparison, DFW's best spaces by suburb, tax implications, and a personalized recommendation.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 48 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>🏠</div>
            <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 12, color: '#0F172A' }}>Home Office</div>
            <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>One-time investment, maximum flexibility, and home office tax deductions.</div>
            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 16 }}>
              {[['Setup Cost', '$3,000–8,000 (desk, chair, monitor, lighting)'],['Monthly Cost', '$0 ongoing'],['Meeting Rooms', 'None — use coffee shops or client\’s office'],['Tax Benefit', 'Home office deduction ($1,500 simplified or actual costs)']].map(([k, v]) => (
                <div key={k as string} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600 }}>{k as string}</div>
                  <div style={{ fontSize: 14, color: '#334155' }}>{v as string}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>🏢</div>
            <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 12, color: '#0F172A' }}>Coworking Space</div>
            <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>Professional environment, networking, and built-in meeting rooms.</div>
            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 16 }}>
              {[['Setup Cost', '$0 — fully furnished'],['Monthly Cost', '$200–500/mo in DFW'],['Meeting Rooms', 'Included (some limit hours)'],['Tax Benefit', '100% deductible as business expense']].map(([k, v]) => (
                <div key={k as string} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600 }}>{k as string}</div>
                  <div style={{ fontSize: 14, color: '#334155' }}>{v as string}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', marginBottom: 20 }}>📍 Top DFW Coworking Spaces by Location</h2>
          {coworkingSpaces.map(s => (
            <div key={s.name} style={{ background: '#fff', borderRadius: 12, padding: 20, marginBottom: 12, border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#0F172A' }}>{s.name}</div>
                <div style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>{s.perks}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, color: '#2563EB', fontSize: 16 }}>{s.price}</div>
                <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{s.type}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', marginBottom: 24 }}>🧮 Get Your Recommendation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
            {[['WORK STYLE', ['Deep Focus', 'Social / Collaborative', 'Mixed'], style, setStyle],['CLIENT MEETINGS', ['Rarely (< 2/mo)', 'Occasionally (2–4/mo)', 'Frequently (2+/week)'], meetings, setMeetings],['MONTHLY BUDGET', ['Under $200/mo', '$200–500/mo', '$500+/mo'], budget, setBudget]].map(([label, opts, val, setter]) => (
              <div key={label as string}>
                <label style={{ fontSize: 12, color: '#94A3B8', display: 'block', marginBottom: 6, fontWeight: 600 }}>{label as string}</label>
                <select value={val as string} onChange={e => (setter as (v: string) => void)(e.target.value)} style={{ width: '100%', background: '#F8FAFC', color: '#1E293B', border: '1px solid #E2E8F0', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                  {(opts as string[]).map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div style={{ background: '#EFF6FF', borderRadius: 12, padding: 24, borderLeft: '4px solid #2563EB' }}>
            <div style={{ fontWeight: 800, fontSize: 20, color: '#1D4ED8', marginBottom: 8 }}>👉 {rec.choice}</div>
            <div style={{ fontSize: 14, color: '#334155', marginBottom: 16, lineHeight: 1.6 }}>{rec.reason}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ background: '#fff', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, marginBottom: 4 }}>MONTHLY COST</div>
                <div style={{ fontWeight: 700, color: '#1D4ED8' }}>{rec.monthlyCost}</div>
              </div>
              <div style={{ background: '#fff', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, marginBottom: 4 }}>TAX IMPLICATION</div>
                <div style={{ fontSize: 13, color: '#334155' }}>{rec.taxNote}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
