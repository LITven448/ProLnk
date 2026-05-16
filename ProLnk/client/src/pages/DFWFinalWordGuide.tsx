import { useState } from 'react';

const stages = [
  { label: 'Under 1 year', advice: ['Focus on learning your home — document every system', 'Build your emergency fund before anything else', 'DFW tip: get a foundation inspection before your first summer', 'Connect with neighbors — they are your best contractor referral source', 'Join ProLnk now to start building your contractor network'] },
  { label: '1-3 years', advice: ['You now know your home is quirky — that is normal in DFW', 'Start planning your first major improvement project', 'DFW tip: hail-resistant roofing materials pay back in insurance discounts', 'Build your Home Health Vault profile — it protects your investment', 'Refer your first contractor to ProLnk and earn origination rights'] },
  { label: '3-7 years', advice: ['Your equity is real — protect it with proper insurance coverage', 'Consider strategic improvements with 60%+ ROI (kitchen, outdoor living)', 'DFW tip: clay soil foundation issues are predictable — address early', 'You are the neighborhood expert — share your contractor network', 'Activate full ProLnk partner status and earn from your network'] },
  { label: '7-15 years', advice: ['Your home may need major system replacements — plan for HVAC, roof', 'You have significant equity — a HELOC gives you financial flexibility', 'DFW tip: the market rewards well-maintained homes with premium prices', 'You have a story — your contractor relationships are worth sharing', 'Lead your neighborhood into the ProLnk network and earn overrides'] },
  { label: '15+ years', advice: ['You are a DFW homeownership expert — your knowledge has real value', 'Estate planning: make sure your home transfers smoothly to your heirs', 'DFW tip: your long-term neighborhood relationships are a financial asset', 'Your Home Health Vault record is a premium asset for future buyers', 'Mentor new homeowners through ProLnk — earn while you give back'] },
];

const dfwFacts = [
  '🌡️ DFW has 100°F+ days that stress every home system — preparation is everything',
  '🧱 Expansive clay soil causes 85% of DFW foundation issues — manageable with watering',
  '⛈️ DFW averages 9 hail events per year — hail-resistant roofing is a must',
  '💰 DFW property taxes average 2.1% — highest in the nation, offset by no state income tax',
  '📈 DFW home values have grown 6.8% annually for the past decade',
  '🏘️ HOAs govern 60%+ of DFW neighborhoods — know your deed restrictions',
];

export default function DFWFinalWordGuide() {
  const [stage, setStage] = useState('');
  const selected = stages.find(s => s.label === stage);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏠</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>The Final Word on DFW Homeownership</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>Everything you need to know — from a platform built for DFW homeowners</p>
        </div>
        <div style={{ background: '#111d30', borderRadius: 16, padding: 24, marginBottom: 28, border: '1px solid #1e3a5f' }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16, color: '#F5E642' }}>How long have you been a DFW homeowner?</div>
          <div style={{ display: 'grid', gap: 10 }}>
            {stages.map(s => (
              <button key={s.label} onClick={() => setStage(s.label)}
                style={{ padding: '12px 16px', background: stage === s.label ? '#F5E642' : '#0A1628', color: stage === s.label ? '#0A1628' : '#cbd5e1', border: '1.5px solid #1e3a5f', borderRadius: 10, fontWeight: 600, fontSize: 15, cursor: 'pointer', textAlign: 'left' }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
        {selected && (
          <div style={{ background: '#111d30', borderRadius: 16, padding: 24, marginBottom: 28, border: '2px solid #F5E642' }}>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16, color: '#F5E642' }}>Your Personalized Final Advice</div>
            {selected.advice.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid #1e3a5f', color: '#cbd5e1', fontSize: 15 }}>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{i + 1}.</span> {a}
              </div>
            ))}
          </div>
        )}
        <div style={{ background: '#111d30', borderRadius: 16, padding: 24, border: '1px solid #1e3a5f' }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16, color: '#F5E642' }}>📚 DFW Homeownership Facts</div>
          {dfwFacts.map((f, i) => (
            <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid #1e3a5f', color: '#94a3b8', fontSize: 14 }}>{f}</div>
          ))}
        </div>
      </div>
    </div>
  );
}