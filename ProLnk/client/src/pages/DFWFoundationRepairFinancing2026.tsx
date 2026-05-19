import { useState } from 'react';

export default function DFWFoundationRepairFinancing2026() {
  const [repairCost, setRepairCost] = useState('medium');
  const [creditScore, setCreditScore] = useState('good');

  const options: Record<string, Record<string, { best: string; rate: string; term: string; note: string }>> = {
    small: {
      poor: { best: 'Personal Loan', rate: '18–28% APR', term: '24–48 mo', note: 'Shop CreditKarma for best rate with score below 620' },
      fair: { best: 'GreenSky / Contractor Plan', rate: '9–18% APR', term: '36–60 mo', note: 'Olshan and Perma-Pier both offer direct financing' },
      good: { best: 'Company Financing', rate: '0–9% APR', term: '12–36 mo', note: 'Perma-Pier and Olshan offer promotional 0% for 12 months' },
      excellent: { best: '0% Promo / HELOC', rate: '0% promo or Prime+0.5%', term: '12–60 mo', note: 'Best rates available — HELOC if you have equity' },
    },
    medium: {
      poor: { best: 'GreenSky', rate: '15–25% APR', term: '48–84 mo', note: 'GreenSky specializes in home improvement loans for all credit levels' },
      fair: { best: 'Personal Loan + Company Plan', rate: '10–18% APR', term: '48–60 mo', note: 'Split large repairs across financing options to manage payment' },
      good: { best: 'HELOC', rate: 'Prime+0.5–1.5%', term: '10-year draw', note: 'HELOC gives flexibility — only pay interest on what you draw' },
      excellent: { best: 'HELOC or Cash-Out Refi', rate: 'Prime or better', term: '10–30 yr', note: 'Cash-out refi only if rate is better than current mortgage' },
    },
    large: {
      poor: { best: 'GreenSky + FHA 203k', rate: '12–22% APR', term: '60–120 mo', note: 'FHA 203k rolls repair into mortgage — requires lender approval' },
      fair: { best: 'HELOC if equity exists', rate: '8–15% APR', term: '10-year draw', note: 'Fair credit HELOC possible with 20%+ equity in DFW home' },
      good: { best: 'HELOC', rate: 'Prime+0.25–0.75%', term: '10-year draw', note: 'Ideal for large repairs — interest may be tax deductible' },
      excellent: { best: 'HELOC or Cash-Out Refi', rate: 'Lowest available', term: 'Flexible', note: 'You have full optionality — compare HELOC vs refi total cost' },
    },
  };

  const result = options[repairCost][creditScore];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'sans-serif', color: '#E8EAF0' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>DFW Home Cost Guide 2026</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px' }}>🏠 Foundation Repair Financing Guide</h1>
        <p style={{ color: '#8892A4', fontSize: 15, marginBottom: 32 }}>DFW soil is notorious for foundation movement. Here's how to finance the repair based on your situation.</p>

        <div style={{ background: '#111D33', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 15, margin: '0 0 16px' }}>🎛️ Find Your Best Option</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#8892A4', marginBottom: 6 }}>Estimated Repair Cost</label>
            <select value={repairCost} onChange={(e) => setRepairCost(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E2D45', borderRadius: 8, color: '#FFFFFF', fontSize: 14 }}>
              <option value="small">Small ($2,000–$6,000)</option>
              <option value="medium">Medium ($7,000–$15,000)</option>
              <option value="large">Large ($16,000–$40,000+)</option>
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#8892A4', marginBottom: 6 }}>Credit Score</label>
            <select value={creditScore} onChange={(e) => setCreditScore(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E2D45', borderRadius: 8, color: '#FFFFFF', fontSize: 14 }}>
              <option value="poor">Poor (below 580)</option>
              <option value="fair">Fair (580–669)</option>
              <option value="good">Good (670–739)</option>
              <option value="excellent">Excellent (740+)</option>
            </select>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, border: '1px solid #F5E642' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>🏆 {result.best}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div><span style={{ fontSize: 12, color: '#8892A4' }}>Rate</span><br /><span style={{ fontWeight: 700, color: '#FFFFFF' }}>{result.rate}</span></div>
              <div><span style={{ fontSize: 12, color: '#8892A4' }}>Term</span><br /><span style={{ fontWeight: 700, color: '#FFFFFF' }}>{result.term}</span></div>
            </div>
            <div style={{ fontSize: 13, color: '#C8D0DC' }}>💬 {result.note}</div>
          </div>
        </div>

        <div style={{ background: '#111D33', borderRadius: 12, padding: 20, border: '1px solid #1E2D45' }}>
          <p style={{ fontSize: 13, color: '#8892A4', margin: 0 }}>💡 <strong style={{ color: '#FFFFFF' }}>ProLnk Tip:</strong> Always get 3 foundation repair quotes. DFW pricing varies 30–50% between companies. ProLnk connects you with verified foundation specialists.</p>
        </div>
      </div>
    </div>
  );
}
