import { useState } from 'react';

const trades = ['HVAC', 'Plumbing', 'Electrical', 'Roofing', 'Landscaping', 'Painting', 'General Contractor'];
const stages = ['Just starting out', 'Under 2 years', '2-5 years established', '5+ years, scaling'];

type BrandRec = { priorities: string[]; cost: string; impact: string[] };

const brandData: Record<string, Record<string, BrandRec>> = {
  'HVAC': {
    'Just starting out': { priorities: ['Logo on truck (magnetic wrap $200)', 'Google Business Profile (free)', 'Matching polo shirts with logo'], cost: '$400-800 total', impact: ['Truck wrap gets 30K+ impressions/day in DFW traffic', 'Google profile drives 80% of first-call decisions', 'Uniform signals professionalism at the door'] },
    '2-5 years established': { priorities: ['Full truck wrap ($800-1500)', 'Branded website with reviews', 'Facebook Business Page with before/after photos'], cost: '$2,000-4,000 total', impact: ['Wrapped trucks close 40% more unsolicited calls', 'Reviews on Google drive DFW homeowner trust', 'Facebook dominates DFW 35-55 homeowner demographic'] },
  },
  'Plumbing': {
    'Just starting out': { priorities: ['Logo + van lettering ($300)', 'Google Business Profile optimized', 'Branded invoice template'], cost: '$300-600 total', impact: ['Van lettering in DFW neighborhoods = free marketing', 'Plumbing emergency searches happen on Google first', 'Professional invoices = repeat referrals'] },
    '2-5 years established': { priorities: ['Full van wrap', 'Review generation system', 'Nextdoor Business profile'], cost: '$1,500-3,000 total', impact: ['Nextdoor dominates neighborhood recommendations in DFW', 'Plumbing is referral-driven — reviews compound', 'Wrapped van in subdivision = 5+ neighbor inquiries/month'] },
  },
};

const defaultRec: BrandRec = { priorities: ['Professional logo (99designs or Fiverr, $100-300)', 'Google Business Profile (free, do this today)', 'Branded vehicle lettering or wrap', 'Matching work shirts/uniforms', 'Business cards with QR code to your ProLnk profile'], cost: '$500-2,000 to start', impact: ['Google Business drives 80% of local service first contacts', 'Vehicle branding = 24/7 marketing in DFW neighborhoods', 'Uniform consistency = trust = higher close rate', 'ProLnk profile QR connects digital + physical branding'] };

export default function DFWContractorBrandingGuide() {
  const [trade, setTrade] = useState('');
  const [stage, setStage] = useState('');
  const [result, setResult] = useState<BrandRec | null>(null);

  const handleGenerate = () => {
    const rec = brandData[trade]?.[stage] ?? defaultRec;
    setResult(rec);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '4px 12px', borderRadius: '4px', fontSize: '0.75rem', letterSpacing: '0.1em' }}>PROLNK PRO GUIDE</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '1rem', color: '#fff' }}>🎨 DFW Contractor Branding Guide</h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem', lineHeight: 1.7 }}>In DFW's competitive home services market, your brand is your reputation made visible. Homeowners make trust decisions in seconds — before you say a word.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[{ icon: '🚛', title: 'Vehicle Branding', desc: 'Your truck is your billboard. A wrapped vehicle driving DFW highways and parking in subdivisions generates 30,000+ impressions per day. It\’s your highest ROI brand investment.' }, { icon: '👕', title: 'Uniform Consistency', desc: 'Matching shirts, hats, and safety vests signal a professional operation. DFW homeowners are inviting you into their home — first impressions are made before you knock.' }, { icon: '📱', title: 'Digital Presence', desc: 'Google Business Profile is non-negotiable. 87% of DFW homeowners research contractors online before calling. A complete profile with photos ranks higher in local search.' }, { icon: '⭐', title: 'Review Strategy', desc: 'DFW homeowners read 7+ reviews before hiring. Build a systematic ask: text customers a review link the day after job completion while the satisfaction is fresh.' }].map((item) => (
            <div key={item.title} style={{ background: '#111f3a', borderRadius: '8px', padding: '1.25rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.4rem' }}>{item.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111f3a', borderRadius: '12px', padding: '1.75rem', border: '1px solid #1e3a5f', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1.25rem', fontSize: '1.1rem' }}>🎯 Get Your Branding Priority List</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Your Trade</label>
              <select value={trade} onChange={(e) => setTrade(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: '6px', padding: '0.6rem', fontSize: '0.95rem' }}>
                <option value=''>Select trade...</option>
                {trades.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Business Stage</label>
              <select value={stage} onChange={(e) => setStage(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: '6px', padding: '0.6rem', fontSize: '0.95rem' }}>
                <option value=''>Select stage...</option>
                {stages.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <button onClick={handleGenerate} disabled={!trade || !stage} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: '6px', padding: '0.7rem 1.5rem', cursor: trade && stage ? 'pointer' : 'not-allowed', opacity: trade && stage ? 1 : 0.5 }}>Get Brand Plan →</button>
          {result && (
            <div style={{ marginTop: '1.5rem', borderTop: '1px solid #1e3a5f', paddingTop: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div><div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>PRIORITY LIST</div>{result.priorities.map((p, i) => <div key={p} style={{ color: '#e2e8f0', fontSize: '0.9rem', padding: '0.35rem 0', borderBottom: '1px solid #1e3a5f' }}><span style={{ color: '#F5E642', fontWeight: 700 }}>{i + 1}.</span> {p}</div>)}</div>
                <div>
                  <div><div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>ESTIMATED COST</div><div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.2rem', marginBottom: '1rem' }}>{result.cost}</div></div>
                  <div><div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>BIGGEST IMPACT</div>{result.impact.map((imp) => <div key={imp} style={{ color: '#e2e8f0', fontSize: '0.85rem', padding: '0.3rem 0', borderBottom: '1px solid #1e3a5f' }}>💥 {imp}</div>)}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0d1f3c', borderRadius: '8px', padding: '1.25rem', border: '1px solid #F5E642' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>💡 ProLnk Pro Tip</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>Your ProLnk profile IS your brand hub. Add your logo, service photos, certifications, and reviews. Homeowners browsing ProLnk decide in under 30 seconds. A complete profile with 5+ photos wins 2.7x more jobs than an incomplete one.</div>
        </div>
      </div>
    </div>
  );
}
