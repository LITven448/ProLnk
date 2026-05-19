import { useState } from 'react';

const TRADES = ['Roofing', 'HVAC', 'Plumbing', 'Electrical', 'Foundation', 'General Contractor'];

type Bid = {
  contractor: string;
  price: string;
  scopeComplete: boolean;
  licenseVerified: boolean;
  insured: boolean;
  warrantyOffered: boolean;
  localReferences: boolean;
  permitPulling: boolean;
};

const emptyBid = (): Bid => ({
  contractor: '',
  price: '',
  scopeComplete: false,
  licenseVerified: false,
  insured: false,
  warrantyOffered: false,
  localReferences: false,
  permitPulling: false,
});

function scoreBid(bid: Bid): number {
  let s = 0;
  if (bid.licenseVerified) s += 25;
  if (bid.insured) s += 20;
  if (bid.scopeComplete) s += 15;
  if (bid.permitPulling) s += 15;
  if (bid.warrantyOffered) s += 15;
  if (bid.localReferences) s += 10;
  return s;
}

function getReason(bid: Bid): string[] {
  const issues: string[] = [];
  if (!bid.licenseVerified) issues.push('License not verified — high risk in Texas');
  if (!bid.insured) issues.push('No confirmed insurance — liability exposure');
  if (!bid.scopeComplete) issues.push('Incomplete scope — expect change orders');
  if (!bid.permitPulling) issues.push('No permit pulling — code violation risk');
  if (!bid.warrantyOffered) issues.push('No warranty offered');
  if (!bid.localReferences) issues.push('No local DFW references provided');
  return issues;
}

export default function DFWContractorBidEvaluator() {
  const [bids, setBids] = useState<Bid[]>([emptyBid(), emptyBid(), emptyBid()]);
  const [trade, setTrade] = useState('Roofing');
  const [evaluated, setEvaluated] = useState(false);

  const update = (i: number, field: keyof Bid, val: string | boolean) => {
    setBids(prev => prev.map((b, idx) => idx === i ? { ...b, [field]: val } : b));
  };

  const scores = bids.map(scoreBid);
  const ranked = [...bids.map((b, i) => ({ b, i, score: scores[i] }))]
    .filter(x => x.b.contractor)
    .sort((a, b) => b.score - a.score);

  const CHECK = ['scopeComplete', 'licenseVerified', 'insured', 'warrantyOffered', 'localReferences', 'permitPulling'] as (keyof Bid)[];
  const LABELS: Record<string, string> = {
    scopeComplete: '📋 Scope Complete', licenseVerified: '✅ License Verified',
    insured: '🛡️ Insured', warrantyOffered: '🔒 Warranty', localReferences: '📍 Local Refs', permitPulling: '📝 Permit Pulling'
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 36 }}>🏗️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>DFW Contractor Bid Evaluator</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Compare up to 3 bids and get a ranked recommendation</p>
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ color: '#94a3b8', fontSize: 13 }}>Trade Type</label>
          <select value={trade} onChange={e => setTrade(e.target.value)}
            style={{ display: 'block', marginTop: 6, background: '#1e2d4a', border: '1px solid #2d4166', color: '#fff', padding: '8px 12px', borderRadius: 8, width: 200 }}>
            {TRADES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16, marginBottom: 24 }}>
          {bids.map((bid, i) => (
            <div key={i} style={{ background: '#111f38', border: '1px solid #2d4166', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>Bid #{i + 1}</div>
              <input placeholder="Contractor name" value={bid.contractor} onChange={e => update(i, 'contractor', e.target.value)}
                style={{ width: '100%', background: '#1e2d4a', border: '1px solid #2d4166', color: '#fff', padding: '8px 10px', borderRadius: 6, marginBottom: 8, boxSizing: 'border-box' }} />
              <input placeholder="Price (e.g. 12500)" value={bid.price} onChange={e => update(i, 'price', e.target.value)}
                style={{ width: '100%', background: '#1e2d4a', border: '1px solid #2d4166', color: '#fff', padding: '8px 10px', borderRadius: 6, marginBottom: 12, boxSizing: 'border-box' }} />
              {CHECK.map(f => (
                <label key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer', fontSize: 13 }}>
                  <input type="checkbox" checked={!!bid[f]} onChange={e => update(i, f, e.target.checked)} />
                  <span style={{ color: bid[f] ? '#F5E642′ : '#64748b' }}>{LABELS[f]}</span>
                </label>
              ))}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <button onClick={() => setEvaluated(true)}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, padding: '12px 36px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
            📊 Evaluate Bids
          </button>
        </div>
        {evaluated && ranked.length > 0 && (
          <div style={{ background: '#111f38', border: '1px solid #2d4166', borderRadius: 12, padding: 24 }}>
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>🏆 Bid Rankings</h2>
            {ranked.map(({ b, i, score }, rank) => (
              <div key={i} style={{ marginBottom: 20, padding: 16, background: rank === 0 ? '#1a2f50′ : '#0f1c33', borderRadius: 8, border: rank === 0 ? '1px solid #F5E642' : '1px solid #1e3a5f' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 16 }}>{rank + 1}. {b.contractor || `Bid #${i + 1}`}</span>
                  <span style={{ color: '#F5E642', fontWeight: 700 }}>Score: {score}/100 {b.price ? `• $${parseInt(b.price).toLocaleString()}` : ''}</span>
                </div>
                {rank === 0 && <div style={{ color: '#4ade80', fontSize: 13, marginBottom: 6 }}>✅ Recommended Bid</div>}
                {getReason(b).map(r => <div key={r} style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>⚠️ {r}</div>)}
                {getReason(b).length === 0 && <div style={{ color: '#4ade80', fontSize: 12 }}>All quality signals met — strong bid</div>}
              </div>
            ))}
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: 32, padding: 20, background: '#111f38', borderRadius: 12, border: '1px solid #2d4166′ }}>
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Want pre-vetted DFW {trade} contractors? ProLnk delivers 3 quotes from verified pros.</div>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '10px 28px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
            🔗 Get ProLnk Quotes
          </button>
        </div>
      </div>
    </div>
  );
}
