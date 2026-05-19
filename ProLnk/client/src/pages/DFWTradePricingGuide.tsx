import { useState } from 'react';

const tradeRates = {
  hvac: { label: 'HVAC Tech', serviceCall: 125, hourlyLabor: 150, install: 5500, overhead: 4200, margin: 38 },
  plumber: { label: 'Plumber', serviceCall: 150, hourlyLabor: 135, install: 3200, overhead: 3600, margin: 35 },
  electrician: { label: 'Electrician', serviceCall: 115, hourlyLabor: 125, install: 4800, overhead: 3200, margin: 36 },
  roofer: { label: 'Roofer', serviceCall: 0, hourlyLabor: 110, install: 14000, overhead: 6800, margin: 30 }
};

const experience = {
  new: { label: 'New (0-2 yrs)', rateAdj: 0.85, note: 'Start at market-10%. Offer fast scheduling, not lower price.' },
  mid: { label: 'Mid (3-7 yrs)', rateAdj: 1.0, note: 'You are the DFW market. Price at going rate, compete on service.' },
  senior: { label: 'Senior (8+ yrs)', rateAdj: 1.2, note: 'Premium pricing is earned. Lead with warranties and reputation.' }
};

const presentationTips = [
  'Always present three options: Basic, Standard, Premium. Most DFW homeowners choose Standard.',
  'Never present price without presenting value first. State the problem, state your solution, then state the price.',
  'DFW homeowners equate low price with low quality. If you come in lowest, explain why without apologizing.',
  'Itemize your quote. DFW homeowners trust itemized quotes more than flat rates.',
  'Include a warranty statement in every quote. It signals confidence and reduces hesitation.',
  'Mention your ProLnk verification badge. It is social proof DFW homeowners recognize.'
];

export default function DFWTradePricingGuide() {
  const [trade, setTrade] = useState('');
  const [exp, setExp] = useState('');
  const [overhead, setOverhead] = useState('');

  const t = trade ? tradeRates[trade as keyof typeof tradeRates] : null;
  const e = exp ? experience[exp as keyof typeof experience] : null;
  const overheadNum = parseInt(overhead) || 0;

  const adj = (base: number) => t && e ? Math.round(base * e.rateAdj / 5) * 5 : null;
  const effectiveOverhead = overheadNum > 0 ? overheadNum : (t?.overhead || 0);
  const breakEven = t ? Math.ceil(effectiveOverhead / (t.serviceCall * 0.72 || t.hourlyLabor * 4 * 0.72)) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2 }}>PROLNK DFW PRO RESOURCE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>DFW Trade Pricing Guide</h1>
        <p style={{ color: '#94a3b8', margin: '0 0 32px', lineHeight: 1.6 }}>DFW homeowners expect quality and will pay for it. Underpricing signals inexperience, not value. Price your work to sustain a real business.</p>

        <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 18 }}>Calculate Your DFW Pricing</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
            {Object.entries(tradeRates).map(([k, v]) => (
              <button key={k} onClick={() => setTrade(k)} style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', borderColor: trade === k ? '#F5E642′ : '#1e3a5f', background: trade === k ? '#F5E642' : ’transparent', color: trade === k ? '#0A1628′ : '#fff', fontWeight: 700, cursor: ’pointer' }}>{v.label}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
            {Object.entries(experience).map(([k, v]) => (
              <button key={k} onClick={() => setExp(k)} style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', borderColor: exp === k ? '#F5E642′ : '#1e3a5f', background: exp === k ? '#F5E642' : ’transparent', color: exp === k ? '#0A1628′ : '#fff', fontWeight: 700, cursor: ’pointer' }}>{v.label}</button>
            ))}
          </div>
          <div>
            <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Monthly Overhead ($) - leave blank to use DFW average</label>
            <input value={overhead} onChange={ev => setOverhead(ev.target.value)} placeholder={t ? 'DFW avg: $' + t.overhead.toLocaleString() : 'Select trade first'} style={{ background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14, width: '100%', boxSizing: 'border-box' }} />
          </div>
        </div>

        {t && (
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {t.serviceCall > 0 && (
                <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 20 }}>
                  <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>SERVICE CALL RATE</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>${adj(t.serviceCall) || t.serviceCall}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>per visit</div>
                </div>
              )}
              <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>HOURLY LABOR</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>${adj(t.hourlyLabor) || t.hourlyLabor}</div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>per hour</div>
              </div>
              <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>AVG INSTALL JOB</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>${(adj(t.install) || t.install).toLocaleString()}</div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>typical DFW value</div>
              </div>
              <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>TARGET MARGIN</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>{t.margin}%</div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>net profit target</div>
              </div>
            </div>

            {e && <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 20, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>Pricing Strategy for Your Level</div>
              <p style={{ color: '#cbd5e1', margin: 0, fontSize: 14 }}>{e.note}</p>
            </div>}

            {breakEven !== null && (
              <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>BREAK-EVEN JOBS/MONTH</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#F5E642′ }}>{breakEven} jobs</div>
                <p style={{ color: '#94a3b8', margin: '8px 0 0', fontSize: 13 }}>Based on ${effectiveOverhead.toLocaleString()}/mo overhead</p>
              </div>
            )}

            <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>How to Present Prices to DFW Homeowners</div>
              {presentationTips.map((tip, i) => (
                <div key={i} style={{ padding: '10px 0', borderBottom: i < presentationTips.length - 1 ? '1px solid #1e3a5f' : 'none', fontSize: 14, color: '#cbd5e1', lineHeight: 1.5 }}>- {tip}</div>
              ))}
            </div>

            <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>ProLnk Match Fees in Your Pricing</div>
              <p style={{ color: '#cbd5e1', margin: 0, fontSize: 14, lineHeight: 1.6 }}>ProLnk match fees run 8-12% of job value for most DFW trades. Build this into your overhead, not your per-job cost. A well-priced job absorbs match fees at your target margin. ProLnk jobs are pre-qualified leads worth the premium.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
