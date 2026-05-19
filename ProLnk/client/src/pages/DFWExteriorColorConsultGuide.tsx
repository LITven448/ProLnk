import { useState } from 'react';

const homeStyles = ['Ranch', 'Colonial', 'Craftsman', 'Modern', 'Mediterranean', 'Tudor'];
const hoaStatuses = ['No HOA', 'HOA with color palette', 'HOA strict approval required'];
const currentColors = ['Beige/Tan', 'Gray', 'White', 'Brick red', 'Dark brown', 'Other'];

const trendingPalettes = [
  { name: 'Warm Greige', accent: '#C4B49A', bg: '#E8DDD0', trim: '#FFFFFF' },
  { name: 'Deep Slate', accent: '#4A5568', bg: '#718096', trim: '#F5E642' },
  { name: 'Coastal Sage', accent: '#68856C', bg: '#A8BFA9', trim: '#FFFFFF' },
  { name: 'Warm Terracotta', accent: '#C17A5A', bg: '#D4956E', trim: '#2D2D2D' },
];

const recommendations: Record<string, string> = {
  'HOA with color palette': 'Work with a certified color consultant who knows local HOA palettes — they can save you a rejection and $3,000 in repaints.',
  'HOA strict approval required': 'Professional color consultation is nearly mandatory. Many DFW HOAs require submitting paint chips before approval — a pro knows exactly which brands/codes pass.',
  'No HOA': 'You have full creative freedom. A professional consultation ($300–$600) pays for itself by avoiding costly color mistakes in DFW’s intense sunlight.',
};

export default function DFWExteriorColorConsultGuide() {
  const [homeStyle, setHomeStyle] = useState('');
  const [hoaStatus, setHoaStatus] = useState('');
  const [currentColor, setCurrentColor] = useState('');
  const [result, setResult] = useState<null | { rec: string; cost: string; palettes: typeof trendingPalettes }>(null);

  function calculate() {
    if (!homeStyle || !hoaStatus || !currentColor) return;
    const rec = recommendations[hoaStatus] || recommendations['No HOA'];
    const cost = hoaStatus === 'No HOA' ? '$300–$600 for professional consultation' : '$400–$800 including HOA submission support';
    setResult({ rec, cost, palettes: trendingPalettes.slice(0, 3) });
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#F5E642' }}>🎨 DFW Exterior Guides</div>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#FFFFFF', marginBottom: '8px' }}>Exterior Color Consultation Guide — DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: '32px', lineHeight: '1.6' }}>Colors that look perfect in a paint store can look completely different under Texas sun. Here's how to get it right.</p>

        <div style={{ backgroundColor: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '16px' }}>⚠️ The DFW Sunlight Problem</h2>
          <p style={{ color: '#CBD5E1', lineHeight: '1.7' }}>DFW receives 230+ sunny days per year. UV intensity and heat cause colors to shift dramatically compared to how they appear in store lighting or on cloudy days. Always test paint patches (at least 12"×12") on multiple walls and observe at dawn, midday, and dusk before committing. Warm tones can turn orange; cool grays can look purple. This step alone prevents most costly color mistakes.</p>
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '16px' }}>🏘️ DFW HOA Color Restrictions</h2>
          <ul style={{ color: '#CBD5E1', lineHeight: '1.9', paddingLeft: '20px' }}>
            <li>Most DFW HOAs maintain an approved color palette — often 20–60 pre-approved shades</li>
            <li>Frisco, Allen, and McKinney HOAs are among the strictest — require board approval before painting</li>
            <li>Violations can result in fines of $50–$200/day until repainted</li>
            <li>Some HOAs require specific paint brands (Sherwin-Williams most common in DFW)</li>
            <li>Trim colors often have separate approved lists from body colors</li>
          </ul>
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '16px' }}>🔮 Get Your Personalized Recommendation</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            <select value={homeStyle} onChange={e => setHomeStyle(e.target.value)} style={{ backgroundColor: '#1E3A5F', color: '#E2E8F0', border: '1px solid #2D5A8E', borderRadius: '8px', padding: '12px', fontSize: '15px' }}>
              <option value="">Select your home style...</option>
              {homeStyles.map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={hoaStatus} onChange={e => setHoaStatus(e.target.value)} style={{ backgroundColor: '#1E3A5F', color: '#E2E8F0', border: '1px solid #2D5A8E', borderRadius: '8px', padding: '12px', fontSize: '15px' }}>
              <option value="">Select HOA status...</option>
              {hoaStatuses.map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={currentColor} onChange={e => setCurrentColor(e.target.value)} style={{ backgroundColor: '#1E3A5F', color: '#E2E8F0', border: '1px solid #2D5A8E', borderRadius: '8px', padding: '12px', fontSize: '15px' }}>
              <option value="">Select current exterior color...</option>
              {currentColors.map(s => <option key={s}>{s}</option>)}
            </select>
            <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: '700', border: 'none', borderRadius: '8px', padding: '14px', fontSize: '16px', cursor: 'pointer' }}>Get Color Consultation Recommendation →</button>
          </div>
        </div>

        {result && (
          <div style={{ backgroundColor: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
            <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '12px' }}>✅ Your Recommendation</h2>
            <p style={{ color: '#CBD5E1', marginBottom: '16px', lineHeight: '1.7' }}>{result.rec}</p>
            <div style={{ backgroundColor: '#1E3A5F', borderRadius: '8px', padding: '16px', marginBottom: '20px' }}>
              <div style={{ color: '#94A3B8', fontSize: '13px', marginBottom: '4px' }}>Estimated Cost</div>
              <div style={{ color: '#F5E642', fontWeight: '700', fontSize: '18px' }}>{result.cost}</div>
            </div>
            <h3 style={{ color: '#FFFFFF', fontSize: '15px', marginBottom: '12px' }}>Trending DFW Palettes for 2026</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {result.palettes.map(p => (
                <div key={p.name} style={{ backgroundColor: '#1E3A5F', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
                  <div style={{ width: '100%', height: '40px', borderRadius: '6px', backgroundColor: p.bg, marginBottom: '8px' }} />
                  <div style={{ color: '#E2E8F0', fontSize: '13px', fontWeight: '600' }}>{p.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ backgroundColor: '#0F2040', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '12px' }}>💡 Pro Tip: DIY vs Professional</h2>
          <p style={{ color: '#CBD5E1', lineHeight: '1.7' }}>A certified color consultant costs $300–$800 but prevents a $4,000–$12,000 repaint mistake. Most DFW painting contractors do not offer color consultation — they paint what you pick. Invest in a Color Consultant (look for IACC-certified professionals) before you ever open a paint can.</p>
        </div>
      </div>
    </div>
  );
}
