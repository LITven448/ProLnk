import { useState } from 'react';

const stakeholders = [
  { id: 'investor', label: 'Investor', icon: '💼' },
  { id: 'pro', label: 'Service Pro', icon: '🔧' },
  { id: 'homeowner', label: 'Homeowner', icon: '🏡' },
  { id: 'partner', label: 'Strategic Partner', icon: '🤝' },
];

const guides: Record<string, { title: string; items: { icon: string; point: string; detail: string; stat: string }[] }> = {
  'investor': {
    title: 'Data Asset Investment Thesis',
    items: [
      { icon: '🗂️', point: 'Home Health Vault Scale', detail: '2.3 million DFW homes × structured service history = proprietary data moat no competitor can replicate', stat: 'Every job adds a permanent data point to the Vault' },
      { icon: '📈', point: 'Compounding Data Value', detail: 'First 50K homes: baseline. At 500K: predictive patterns. At 2M+: dominant market intelligence platform', stat: 'Data value compounds non-linearly with scale' },
      { icon: '💰', point: 'B2B Licensing Revenue', detail: 'Home Health Vault data licensed to insurers, lenders, inspectors, and real estate platforms', stat: '$50–$500 per home per year licensing at scale = $100M+ ARR potential' },
    ],
  },
  'pro': {
    title: 'Why Your Jobs Build Platform Value',
    items: [
      { icon: '📋', point: 'Your Work Goes Into the Vault', detail: 'Every completed ProLnk job is catalogued in the Home Health Vault with date, scope, and outcome', stat: 'Your history on the platform builds your reputation score automatically' },
      { icon: '🔄', point: 'AI Matches You Better Over Time', detail: 'The more jobs you complete, the better the AI understands your specialty and win rate', stat: 'Pros with 50+ jobs get 3x more relevant leads than new pros' },
      { icon: '⭐', point: 'Vault Reputation = Higher Tier Faster', detail: 'Home Vault data feeds your Pro tier progression — Charter → Founding → L3 → L4', stat: 'Higher tiers unlock higher commission splits and override income' },
    ],
  },
  'homeowner': {
    title: 'Your Home Gets a Health Record',
    items: [
      { icon: '📁', point: 'Permanent Service History', detail: 'Every ProLnk job on your home is recorded — HVAC service, foundation work, roof replacement', stat: 'Access your home health record any time at no charge' },
      { icon: '📊', point: 'Resale Value Documentation', detail: 'Documented maintenance history adds $8K–$22K to DFW home resale value per studies', stat: 'Buyers pay more for homes with verified, documented care' },
      { icon: '🤖', point: 'AI Predicts Your Needs', detail: 'ProLnk AI analyzes your home age, systems, and DFW climate to predict upcoming needs', stat: 'Prevent emergency repairs — proactive alerts save DFW homeowners average $3,400/yr' },
    ],
  },
  'partner': {
    title: 'Platform Data Partnership',
    items: [
      { icon: '🏦', point: 'Lender Integration', detail: 'Home Health Vault data improves collateral valuation accuracy for DFW mortgage origination', stat: 'More accurate home condition data = better underwriting risk models' },
      { icon: '🛡️', point: 'Insurance Partner Data', detail: 'Verified service records reduce insurance risk and claims — data partnership creates shared savings', stat: 'ProLnk Vault = first verified maintenance record in DFW insurance market' },
      { icon: '🔗', point: 'API Access Available', detail: 'Structured API access to aggregated (anonymized) DFW home service data for B2B partners', stat: 'Contact ProLnk partnerships team to discuss data licensing terms' },
    ],
  },
};

export default function DFWProLnkDFWData2026() {
  const [stakeholder, setStakeholder] = useState<string | null>(null);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🗄️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>ProLnk DFW Data Platform Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>How ProLnk builds the DFW home data asset — every job makes the platform smarter</p>
          <div style={{ display: 'inline-block', backgroundColor: '#F5E64220', border: '1px solid #F5E642', borderRadius: 8, padding: '8px 20px', marginTop: 12, fontSize: 14, color: '#F5E642', fontWeight: 700 }}>
            2.3M DFW Homes · Home Health Vault · AI-Powered
          </div>
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 32 }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12, fontSize: 14 }}>👤 WHO ARE YOU?</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {stakeholders.map(s => (
              <button key={s.id} onClick={() => setStakeholder(s.id)} style={{ padding: '12px', borderRadius: 8, border: '2px solid', borderColor: stakeholder === s.id ? '#F5E642' : '#334155', backgroundColor: stakeholder === s.id ? '#F5E64220' : '#0f2744', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        </div>

        {stakeholder && (
          <div>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📊 {guides[stakeholder].title}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {guides[stakeholder].items.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#1e3a5f', borderRadius: 10, padding: 18, borderLeft: '4px solid #F5E642' }}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{item.icon}</div>
                  <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{item.point}</div>
                  <div style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 6 }}>{item.detail}</div>
                  <div style={{ backgroundColor: '#0A1628', borderRadius: 6, padding: '8px 12px', fontSize: 13, color: '#4ade80' }}>✅ {item.stat}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, backgroundColor: '#1e3a5f', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <a href="https://prolnk.io" style={{ color: '#F5E642', fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>🔗 Learn more at ProLnk.io →</a>
            </div>
          </div>
        )}

        {!stakeholder && (
          <div style={{ textAlign: 'center', color: '#475569', fontSize: 14, marginTop: 40 }}>
            ☝️ Select your stakeholder type above to see how the ProLnk data platform benefits you
          </div>
        )}

        <div style={{ marginTop: 40, textAlign: 'center', borderTop: '1px solid #1e3a5f', paddingTop: 20 }}>
          <p style={{ color: '#475569', fontSize: 12 }}>ProLnk · Home Health Vault · prolnk.io · 2.3M DFW Homes · May 2026</p>
        </div>
      </div>
    </div>
  );
}