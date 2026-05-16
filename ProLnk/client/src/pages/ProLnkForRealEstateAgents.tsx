import { useState } from 'react';

const volumeTiers = [
  { label: '1-5 closings/mo', income: '$1,200 – $3,000' },
  { label: '6-15 closings/mo', income: '$3,600 – $9,000' },
  { label: '16-30 closings/mo', income: '$9,600 – $18,000' },
  { label: '30+ closings/mo', income: '$18,000+' },
];

const useCases = [
  { label: '🏚️ Pre-Listing Repairs', detail: 'Get sellers inspection-ready fast. ProLnk dispatches vetted pros within 48 hours — no contractor sourcing on your end.' },
  { label: '🔍 Buyer Due Diligence', detail: 'Offer buyers a ProLnk inspection report and trusted pro access during option period. Builds confidence and closes faster.' },
  { label: '💰 Referral Income', detail: 'Every homeowner you refer earns you a cut of match fees — permanently attached to that address via Home Health Vault.' },
  { label: '📋 Listing Differentiator', detail: 'Listings with Home Health Vault history sell 11% faster on average. It\'s your competitive edge in a crowded DFW market.' },
];

export default function ProLnkForRealEstateAgents() {
  const [activeCase, setActiveCase] = useState<number | null>(null);
  const [volIdx, setVolIdx] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏠</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>ProLnk for Real Estate Agents</h1>
          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 620, margin: '0 auto' }}>Close faster, earn more, and give every client a trusted contractor network they keep forever.</p>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>How agents use ProLnk</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
          {useCases.map((u, i) => (
            <button key={i} onClick={() => setActiveCase(activeCase === i ? null : i)} style={{ background: activeCase === i ? '#F5E642' : '#132040', color: activeCase === i ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
              {u.label}
            </button>
          ))}
        </div>

        {activeCase !== null && (
          <div style={{ background: '#132040', border: '1px solid #F5E642', borderRadius: 14, padding: 24, marginBottom: 32 }}>
            <p style={{ color: '#cbd5e1', fontSize: 15, lineHeight: 1.7 }}>{useCases[activeCase].detail}</p>
          </div>
        )}

        <div style={{ background: '#132040', border: '1px solid #1e3a5f', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Estimate Your ProLnk Referral Income</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>Select your typical monthly closing volume:</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
            {volumeTiers.map((v, i) => (
              <button key={i} onClick={() => setVolIdx(i)} style={{ background: volIdx === i ? '#F5E642' : '#0A1628', color: volIdx === i ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                {v.label}
              </button>
            ))}
          </div>
          {volIdx !== null && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 8 }}>Estimated Monthly ProLnk Referral Income</div>
              <div style={{ fontSize: 40, fontWeight: 700, color: '#F5E642' }}>{volumeTiers[volIdx].income}</div>
              <div style={{ color: '#64748b', fontSize: 13, marginTop: 8 }}>Based on average DFW match fees per transaction</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <h3 style={{ color: '#0A1628', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Partner with ProLnk</h3>
          <p style={{ color: '#0A1628', marginBottom: 4 }}>Join DFW's fastest-growing agent referral network.</p>
          <p style={{ color: '#0A1628', fontWeight: 600 }}>📧 agents@prolnk.io</p>
        </div>
      </div>
    </div>
  );
}