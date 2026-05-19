import { useState } from 'react';

const trades = [
  { name: 'Plumber', icon: '🔧', checks: ['TSBPE license (verify at tsbpe.texas.gov)', 'General liability M+ COI', 'Reviews on Google, Yelp, BBB', 'Written scope + price before work', 'Never pay more than 30% upfront'] },
  { name: 'Electrician', icon: '⚡', checks: ['TDLR Master or Journeyman license', 'Workers comp + liability insurance', '3+ reviews on multiple platforms', 'Itemized written estimate', 'Pay in stages (start/mid/finish)'] },
  { name: 'HVAC Tech', icon: '❄️', checks: ['EPA 608 certification required', 'TACCA member preferred', 'Check TDLR for complaints', 'Written diagnosis before repair', 'No full payment until system runs'] },
  { name: 'Roofer', icon: '🏠', checks: ['No state license required — check local city', 'Carry minimum M liability', 'Verify physical address (no P.O. Box)', 'Lien waiver on final payment', 'Never pay 100% upfront — storm chasers scam'] },
  { name: 'General Contractor', icon: '🔨', checks: ['Check TDLR for complaints history', 'Surety bond + liability required', 'References from last 3 jobs', 'Detailed written contract + timeline', 'Payments tied to milestones only'] },
];

const points = [
  { icon: '📋', label: 'License', desc: 'Verify license on TDLR or trade board website' },
  { icon: '🛡️', label: 'Insurance', desc: 'Get Certificate of Insurance (COI) before work starts' },
  { icon: '⭐', label: 'Reviews', desc: 'Check 3+ platforms: Google, Yelp, BBB' },
  { icon: '📝', label: 'Contract', desc: 'Written contract only — verbal agreements unenforceable in TX' },
  { icon: '💳', label: 'Payment', desc: 'Never pay 100% upfront — milestone payments only' },
];

export default function DFWContractorChecklistQuickRef2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '40px', marginBottom: '8px' }}>✅</div>
          <h1 style={{ color: '#F5E642', fontSize: '24px', fontWeight: '700', margin: '0 0 8px' }}>DFW Contractor Vetting Quick Reference 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>5-point check before hiring any DFW contractor</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '8px', marginBottom: '28px' }}>
          {points.map((p, i) => (
            <div key={i} style={{ backgroundColor: '#0f2035', borderRadius: '10px', padding: '12px 8px', textAlign: 'center', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '22px', marginBottom: '4px' }}>{p.icon}</div>
              <div style={{ color: '#F5E642', fontSize: '11px', fontWeight: '700′ }}>{p.label}</div>
              <div style={{ color: '#64748b', fontSize: '10px', marginTop: '4px', lineHeight: '1.3′ }}>{p.desc}</div>
            </div>
          ))}
        </div>
        <h2 style={{ color: '#94a3b8', fontSize: '14px', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Select Trade for Checklist</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
          {trades.map((t, i) => (
            <button key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ backgroundColor: selected === i ? '#1a2f4a' : '#0f2035', border: selected === i ? '2px solid #F5E642′ : '2px solid #1e3a5f', borderRadius: '10px', padding: '16px', cursor: ’pointer', textAlign: 'left' }}>
              <div style={{ fontSize: '24px', marginBottom: '6px' }}>{t.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: '700', fontSize: '14px' }}>{t.name}</div>
            </button>
          ))}
        </div>
        {selected !== null && (
          <div style={{ backgroundColor: '#0f2035', border: '2px solid #F5E642', borderRadius: '14px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{ fontSize: '28px' }}>{trades[selected].icon}</span>
              <h2 style={{ color: '#F5E642', fontSize: '18px', margin: 0 }}>{trades[selected].name} Checklist</h2>
            </div>
            {trades[selected].checks.map((c, j) => (
              <div key={j} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'flex-start' }}>
                <span style={{ color: '#F5E642', fontSize: '16px', flexShrink: 0 }}>☐</span>
                <span style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.5′ }}>{c}</span>
              </div>
            ))}
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: '24px', color: '#475569', fontSize: '12px' }}>
          ProLnk pre-vets all pros — skip the checklist at prolnk.io
        </div>
      </div>
    </div>
  );
}