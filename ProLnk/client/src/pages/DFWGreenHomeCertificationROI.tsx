import { useState } from 'react';

const certs = [
  {
    id: 'pearl',
    name: 'Pearl Certification',
    icon: '🦪',
    cost: '$350–$600',
    time: '1–2 weeks',
    resalePremium: '4–5%',
    dfwRecognition: 'Growing — Redfin/Zillow display Pearl badges in DFW listings',
    bestFor: 'Existing homes with verified efficiency upgrades',
    costBand: 'low',
  },
  {
    id: 'energystar',
    name: 'ENERGY STAR',
    icon: '⭐',
    cost: '$500–$1,500',
    time: '2–6 weeks',
    resalePremium: '3–5%',
    dfwRecognition: 'Strong — federal brand recognition, understood by DFW buyers',
    bestFor: 'New construction or major gut renovations',
    costBand: 'mid',
  },
  {
    id: 'leed',
    name: 'LEED Certified',
    icon: '🌿',
    cost: '$3,000–$10,000+',
    time: '3–12 months',
    resalePremium: '6–10%',
    dfwRecognition: 'Limited — luxury buyers only, less common outside Uptown/Preston Hollow',
    bestFor: 'High-end new construction targeting sustainability-focused buyers',
    costBand: 'high',
  },
];

const priceTiers: Record<string, string> = {
  under400: 'Under $400K',
  mid: '$400K–$800K',
  luxury: '$800K+',
};

export default function DFWGreenHomeCertificationROI() {
  const [scope, setScope] = useState('');
  const [tier, setTier] = useState('');
  const [result, setResult] = useState<null | typeof certs[0]>(null);

  function getRec() {
    if (!scope || !tier) return;
    let rec;
    if (tier === 'luxury' && scope === 'new') rec = certs.find(c => c.id === 'leed');
    else if (scope === 'new') rec = certs.find(c => c.id === 'energystar');
    else rec = certs.find(c => c.id === 'pearl');
    setResult(rec || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: 40 }}>🏅</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', marginBottom: 8 }}>DFW Green Home Certification ROI</h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>
            Not all green certifications pay off equally in DFW. Find the right one for your home and budget.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {certs.map(c => (
            <div key={c.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <span style={{ fontSize: 22, marginRight: 8 }}>{c.icon}</span>
                  <span style={{ fontWeight: 700, color: '#F5E642' }}>{c.name}</span>
                </div>
                <span style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 6, padding: '0.2rem 0.5rem', fontSize: '0.8rem', color: '#22c55e' }}>
                  +{c.resalePremium} premium
                </span>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: 8, flexWrap: 'wrap' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>💰 {c.cost}</span>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>⏱️ {c.time}</span>
              </div>
              <div style={{ color: '#64748b', fontSize: '0.8rem' }}>DFW: {c.dfwRecognition}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>Get a Personalized Recommendation</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: 6 }}>Improvement scope</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[{ v: 'existing', l: 'Existing Home Upgrades' }, { v: 'new', l: 'New Construction / Full Reno' }].map(o => (
                <div key={o.v} onClick={() => { setScope(o.v); setResult(null); }}
                  style={{ flex: 1, textAlign: 'center', padding: '0.65rem', borderRadius: 8, cursor: 'pointer', border: scope === o.v ? '1px solid #F5E642' : '1px solid rgba(255,255,255,0.1)', background: scope === o.v ? 'rgba(245,230,66,0.1)' : 'rgba(255,255,255,0.04)', fontSize: '0.85rem', fontWeight: scope === o.v ? 600 : 400, color: scope === o.v ? '#F5E642' : '#fff' }}>
                  {o.l}
                </div>
              ))}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: 6 }}>DFW price tier</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {Object.entries(priceTiers).map(([v, l]) => (
                <div key={v} onClick={() => { setTier(v); setResult(null); }}
                  style={{ flex: 1, minWidth: 100, textAlign: 'center', padding: '0.65rem', borderRadius: 8, cursor: 'pointer', border: tier === v ? '1px solid #F5E642' : '1px solid rgba(255,255,255,0.1)', background: tier === v ? 'rgba(245,230,66,0.1)' : 'rgba(255,255,255,0.04)', fontSize: '0.82rem', fontWeight: tier === v ? 600 : 400, color: tier === v ? '#F5E642' : '#fff' }}>
                  {l}
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={getRec}
          disabled={!scope || !tier}
          style={{ width: '100%', background: scope && tier ? '#F5E642' : '#334155', color: '#0A1628', border: 'none', borderRadius: 10, padding: '0.85rem', fontWeight: 700, fontSize: '1rem', cursor: scope && tier ? 'pointer' : 'default', marginBottom: '1.5rem' }}
        >
          Get Certification Recommendation →
        </button>

        {result && (
          <div style={{ background: 'rgba(245,230,66,0.07)', borderRadius: 12, padding: '1.5rem', border: '1px solid rgba(245,230,66,0.3)' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>Recommended: {result.icon} {result.name}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
              {[['Cost', result.cost], ['Timeline', result.time], ['Resale Premium', result.resalePremium], ['Best For', result.bestFor]].map(([k, v]) => (
                <div key={k} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: '0.65rem' }}>
                  <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{k}</div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', marginTop: 2 }}>{v}</div>
                </div>
              ))}
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>DFW buyer recognition: {result.dfwRecognition}</p>
          </div>
        )}
      </div>
    </div>
  );
}
