import { useState } from 'react';

export default function DFWContractorPaymentMethodsGuide2026() {
  const [scenario, setScenario] = useState('');
  const [rec, setRec] = useState<{ verdict: string; reason: string; icon: string; color: string } | null>(null);

  const scenarios: Record<string, { verdict: string; reason: string; icon: string; color: string }> = {
    check: {
      verdict: 'Preferred Method',
      reason: 'Paper trail, cancelled check = proof of payment. Write check to business name (not personal). Ideal for all contractor payments.',
      icon: '✅', color: '#22cc66',
    },
    credit: {
      verdict: 'Good — Use for Protection',
      reason: 'Credit card gives chargeback rights if work is incomplete/defective. Best for deposits or when contractor accepts cards. Expect 3% surcharge.',
      icon: '💳', color: '#22cc66',
    },
    zelle: {
      verdict: 'Caution — Know the Risk',
      reason: 'Fast and convenient but NO chargeback protection. Only use Zelle with verified, established contractors you trust. Never for deposits with unknowns.',
      icon: '⚠️', color: '#ff8800',
    },
    cash: {
      verdict: 'Red Flag',
      reason: 'Cash = no paper trail. Legitimate licensed contractors rarely require cash-only. Cash-only demand may indicate unlicensed work or tax evasion. Walk away.',
      icon: '🚩', color: '#ff4444',
    },
    wire: {
      verdict: 'Never Wire Transfer',
      reason: 'Wire transfers are irreversible and a top scam vector. No legitimate DFW contractor should ever request a wire transfer. This is always a scam.',
      icon: '🛑', color: '#ff0000',
    },
    prolnk: {
      verdict: 'Safest Option',
      reason: 'ProLnk platform payments are held in escrow, released on job completion confirmation. Built-in dispute resolution. Zero risk to homeowner.',
      icon: '🔒', color: '#F5E642',
    },
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Contractor Payment Methods Guide 2026</h1>
        <p style={{ color: '#8899aa', marginBottom: 32 }}>How to pay DFW contractors safely — protect yourself with every transaction.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 32 }}>
          {[
            { icon: '✅', label: 'Check', risk: 'Safe', color: '#22cc66' },
            { icon: '💳', label: 'Credit Card', risk: 'Safe', color: '#22cc66' },
            { icon: '⚠️', label: 'Zelle', risk: 'Caution', color: '#ff8800' },
            { icon: '🚩', label: 'Cash', risk: 'Red Flag', color: '#ff4444' },
            { icon: '🛑', label: 'Wire', risk: 'Never', color: '#ff0000' },
            { icon: '🔒', label: 'ProLnk', risk: 'Safest', color: '#F5E642' },
          ].map((m) => (
            <div key={m.label} style={{ background: '#132240', borderRadius: 10, padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{m.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{m.label}</div>
              <div style={{ color: m.color, fontSize: 12, fontWeight: 700, marginTop: 4 }}>{m.risk}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132240', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Payment Scenario Advisor</div>
          <select value={scenario} onChange={(e) => { setScenario(e.target.value); setRec(scenarios[e.target.value] || null); }}
            style={{ width: '100%', padding: '12px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #F5E642', marginBottom: 12, fontSize: 15 }}>
            <option value="">Select payment method scenario...</option>
            <option value="check">Paying by check</option>
            <option value="credit">Paying by credit card</option>
            <option value="zelle">Contractor requests Zelle</option>
            <option value="cash">Contractor requests cash only</option>
            <option value="wire">Contractor requests wire transfer</option>
            <option value="prolnk">Paying through ProLnk platform</option>
          </select>
          {rec && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '16px', borderLeft: `4px solid ${rec.color}` }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{rec.icon}</div>
              <div style={{ fontWeight: 700, color: rec.color, marginBottom: 8 }}>{rec.verdict}</div>
              <div style={{ color: '#cdd9e5', fontSize: 14 }}>{rec.reason}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#132240', borderRadius: 12, padding: '20px', marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Universal Payment Rules for DFW</div>
          {['Always get a written contract before paying any deposit', 'Never pay more than 10-30% upfront for any project', 'Pay remaining balance only after work passes your inspection', 'Retain 5-10% until 30-day warranty period clears'].map((tip) => (
            <div key={tip} style={{ display: 'flex', gap: 10, marginBottom: 8, color: '#cdd9e5', fontSize: 14 }}>
              <span style={{ color: '#F5E642' }}>▸</span>{tip}
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: '20px', textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 6 }}>Pay Safely Through ProLnk</div>
          <div style={{ fontSize: 14 }}>Escrow-protected payments, dispute resolution, and verified contractors. Maximum protection on every job.</div>
        </div>
      </div>
    </div>
  );
}