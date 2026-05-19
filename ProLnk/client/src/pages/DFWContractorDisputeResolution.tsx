import { useState } from 'react';

const disputeTypes = [
  { id: 'substandard', label: 'Substandard Work', maxSmallClaims: true },
  { id: 'incomplete', label: 'Incomplete Work', maxSmallClaims: true },
  { id: 'damage', label: 'Property Damage', maxSmallClaims: true },
  { id: 'overcharge', label: 'Overcharge / Billing Dispute', maxSmallClaims: true },
];

const paths: Record<string, { steps: string[]; timeline: string; cost: string }> = {
  low: {
    steps: ['Send certified demand letter', 'File BBB complaint', 'Mediation through contractor association', 'Small claims court (under $20K)'],
    timeline: '30–90 days',
    cost: '$50–$300',
  },
  mid: {
    steps: ['Send RCLA 60-day notice (required by Texas law)', 'Allow contractor right to inspect and repair', 'Mediation if repair refused', 'File suit in district court'],
    timeline: '60–180 days',
    cost: '$500–$3,000',
  },
  high: {
    steps: ['Hire construction defect attorney', 'Send RCLA 60-day notice', 'Expert inspection report', 'Litigation or binding arbitration'],
    timeline: '6–24 months',
    cost: '$3,000–$15,000+',
  },
};

export default function DFWContractorDisputeResolution() {
  const [disputeType, setDisputeType] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState<null | { steps: string[]; timeline: string; cost: string }>(null);

  const handleSubmit = () => {
    const amt = parseFloat(amount.replace(/[^0-9.]/g, ''));
    if (!disputeType || isNaN(amt)) return;
    if (amt < 2000) setResult(paths.low);
    else if (amt <= 10000) setResult(paths.mid);
    else setResult(paths.high);
  };

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '40px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>⚖️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: 0 }}>DFW Contractor Dispute Resolution</h1>
          <p style={{ color: '#CBD5E1', marginTop: 8 }}>Know your rights under the Texas Residential Construction Liability Act</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📋 Your Legal Framework</h2>
          {[
            ['Texas RCLA (Ch. 27)', 'Requires 60-day written notice before suing a contractor — skipping this voids your claim.'],
            ['Demand Letter First', 'Always send certified mail demand before escalating. Courts expect it.'],
            ['Small Claims Limit', 'Texas Justice Court handles claims up to $20,000 — no attorney required.'],
            ['BBB + Texas AG', 'File parallel complaints for leverage, especially with licensed trades.'],
          ].map(([title, desc]) => (
            <div key={title} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <span style={{ color: '#F5E642', fontSize: 20, flexShrink: 0 }}>✔</span>
              <div><strong style={{ color: '#0A1628′ }}>{title}:</strong> <span style={{ color: '#475569' }}>{desc}</span></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🔍 Find Your Resolution Path</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#0A1628', fontWeight: 600, display: 'block', marginBottom: 8 }}>Dispute Type</label>
            <select value={disputeType} onChange={e => setDisputeType(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 15, color: '#0A1628′ }}>
              <option value="">Select dispute type...</option>
              {disputeTypes.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#0A1628', fontWeight: 600, display: 'block', marginBottom: 8 }}>Disputed Amount ($)</label>
            <input type="text" value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g. 5000″ style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 15, color: '#0A1628', boxSizing: 'border-box' }} />
          </div>
          <button onClick={handleSubmit} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Get Resolution Path →</button>
        </div>

        {result && (
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 28 }}>
            <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📍 Recommended Path</h2>
            <div style={{ display: 'flex', gap: 24, marginBottom: 20 }}>
              <div style={{ background: '#1E293B', borderRadius: 8, padding: '12px 20px' }}><div style={{ color: '#94A3B8', fontSize: 12 }}>TIMELINE</div><div style={{ color: '#fff', fontWeight: 700 }}>{result.timeline}</div></div>
              <div style={{ background: '#1E293B', borderRadius: 8, padding: '12px 20px' }}><div style={{ color: '#94A3B8', fontSize: 12 }}>EST. COST</div><div style={{ color: '#fff', fontWeight: 700 }}>{result.cost}</div></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {result.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ color: '#E2E8F0′ }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
