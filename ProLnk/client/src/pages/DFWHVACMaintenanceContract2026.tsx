import { useState } from 'react';

const contractItems = [
  { item: 'Biannual tune-ups (spring + fall)', required: true, note: 'Non-negotiable in DFW climate' },
  { item: '18-point minimum inspection', required: true, note: 'Industry standard for DFW heat load' },
  { item: 'Refrigerant top-off included', required: false, note: 'Premium contracts include; budget plans charge extra ($80-150/lb R-410A)' },
  { item: 'Filter delivery & replacement', required: false, note: 'Nice-to-have; saves $15-30/visit' },
  { item: 'Priority service during summer emergencies', required: true, note: 'Critical — DFW July/August wait times 3-5 days without priority' },
  { item: 'Parts & labor discount (15-20%)', required: false, note: 'Standard for contract customers' },
  { item: 'No overtime charges for contract holders', required: false, note: 'Ask explicitly — DFW summer emergency rates $200-400/hr' },
  { item: 'Transferable if you sell home', required: false, note: 'Adds home value; most companies allow' },
];

const priceRanges = {
  basic: { label: 'Basic (2 visits, inspection only)', range: '$149–$199/year' },
  standard: { label: 'Standard (2 visits + priority service)', range: '$249–$349/year' },
  premium: { label: 'Premium (2 visits + refrigerant + filters + priority)', range: '$399–$599/year' },
};

export default function DFWHVACMaintenanceContract2026() {
  const [contractText, setContractText] = useState('');
  const [analysis, setAnalysis] = useState<null | { score: number; missing: string[]; tier: string }>(null);

  function analyzeContract() {
    const text = contractText.toLowerCase();
    const missing: string[] = [];
    let score = 0;

    if (text.includes('biannual') || text.includes('spring') || (text.includes('fall') && text.includes('tune'))) score += 25;
    else missing.push('Biannual tune-ups (spring + fall) not mentioned');

    if (text.includes('18-point') || text.includes('18 point') || text.includes('inspection')) score += 20;
    else missing.push('18-point inspection standard not specified');

    if (text.includes('priority') || text.includes('emergency')) score += 20;
    else missing.push('No priority service guarantee for DFW summer emergencies');

    if (text.includes('refrigerant') || text.includes('freon')) score += 15;
    else missing.push('Refrigerant policy not stated — clarify if included or extra');

    if (text.includes('discount') || text.includes('%')) score += 10;
    else missing.push('No parts/labor discount mentioned');

    if (text.includes('filter')) score += 10;

    const tier = score >= 80 ? 'premium' : score >= 50 ? 'standard' : 'basic';
    setAnalysis({ score, missing, tier });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>Maintenance Contract Buyer's Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 36 }}>Know exactly what your DFW HVAC maintenance contract should include — and what's missing from the one you're being sold.</p>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📋 What Every DFW Contract Must Include</h2>
        <div style={{ marginBottom: 36 }}>
          {contractItems.map((ci, i) => (
            <div key={i} style={{ background: '#111D35', borderRadius: 10, padding: '14px 18px', marginBottom: 10, borderLeft: `4px solid ${ci.required ? '#F5E642' : '#1E3A5F'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: 15 }}>{ci.required ? '⚠️' : '✅'} {ci.item}</span>
                <span style={{ fontSize: 12, color: ci.required ? '#F5E642' : '#64748B', background: ci.required ? '#1A2A10' : '#0F1A2E', padding: '3px 10px', borderRadius: 20 }}>{ci.required ? 'REQUIRED' : 'OPTIONAL'}</span>
              </div>
              <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 6 }}>{ci.note}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>💰 Fair DFW Price Ranges 2026</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 36 }}>
          {Object.values(priceRanges).map((pr, i) => (
            <div key={i} style={{ background: '#111D35', borderRadius: 10, padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 14, color: '#CBD5E1' }}>{pr.label}</span>
              <span style={{ fontWeight: 700, color: '#F5E642', fontSize: 16 }}>{pr.range}</span>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Analyze Your Contract Offer</h2>
        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <textarea
            value={contractText}
            onChange={e => setContractText(e.target.value)}
            placeholder="Paste your contract terms or describe what the company is offering..."
            style={{ width: '100%', minHeight: 120, background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', padding: 12, fontSize: 14, resize: 'vertical', boxSizing: 'border-box' }}
          />
          <button onClick={analyzeContract} style={{ marginTop: 12, background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Analyze Contract →
          </button>
        </div>

        {analysis && (
          <div style={{ background: '#111D35', borderRadius: 12, padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 48, fontWeight: 800, color: analysis.score >= 70 ? '#22C55E' : analysis.score >= 40 ? '#F5E642' : '#EF4444' }}>{analysis.score}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 18 }}>Contract Score</div>
                <div style={{ color: '#94A3B8', fontSize: 14 }}>Equivalent to {priceRanges[analysis.tier as keyof typeof priceRanges].label}</div>
              </div>
            </div>
            {analysis.missing.length > 0 && (
              <>
                <div style={{ fontWeight: 600, marginBottom: 10, color: '#F5E642' }}>❌ What's Missing:</div>
                {analysis.missing.map((m, i) => (
                  <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px', marginBottom: 8, fontSize: 14, color: '#CBD5E1' }}>• {m}</div>
                ))}
              </>
            )}
            {analysis.missing.length === 0 && <div style={{ color: '#22C55E', fontWeight: 600 }}>✅ This contract covers all key DFW requirements!</div>}
          </div>
        )}

        <div style={{ marginTop: 40, padding: '20px 24px', background: '#0F1E38', borderRadius: 12, borderLeft: '4px solid #F5E642' }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>🌡️ DFW Climate Reality</div>
          <div style={{ fontSize: 14, color: '#94A3B8' }}>DFW averages 67 days above 100°F annually. Without a proper maintenance contract with priority service, emergency AC repairs in July average $800-2,400 with 3-5 day wait times. A $299 contract pays for itself the first emergency call.</div>
        </div>
      </div>
    </div>
  );
}
