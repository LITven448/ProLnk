import { useState } from 'react';

const LEASE_MAP: Record<string, Record<string, { tenantPays: string[]; landlordPays: string[]; tiBudget: string }>> = {
  gross: {
    small: { tenantPays: ['Interior improvements beyond base finish','Specialty lighting and signage','POS and data wiring','Interior painting and flooring upgrades'], landlordPays: ['HVAC maintenance and replacement','Roof repairs','Exterior signage structure (tenant pays sign face)','Parking lot maintenance','Common area upkeep'], tiBudget: '$15,000–$45,000 (low TI from landlord — negotiate hard)' },
    medium: { tenantPays: ['All interior build-out beyond white box','Specialty fixtures and displays','Additional electrical circuits for equipment','ADA interior path improvements'], landlordPays: ['Base building HVAC','Structural roof and walls','Exterior and parking','Common areas and utilities (included in gross rent)'], tiBudget: '$40,000–$120,000′ },
    large: { tenantPays: ['Full interior build-out','MEP upgrades beyond base','Specialty systems (audio/visual, security)','All non-structural interior elements'], landlordPays: ['Shell and core systems','Roof, structure, exterior','HVAC to building specification','Code-required common area ADA'], tiBudget: '$100,000–$350,000′ },
  },
  nnn: {
    small: { tenantPays: ['All interior AND exterior maintenance','HVAC service and repair','Roof repairs (sometimes — check lease)','Property taxes and insurance (pro-rata)','Parking lot maintenance (pro-rata)'], landlordPays: ['Capital replacements (structure, major systems)','Roof replacement when beyond repair','Façade structural repairs'], tiBudget: '$25,000–$70,000 (NNN landlords often give more TI to offset your obligations)' },
    medium: { tenantPays: ['All operating expenses (NNN)','HVAC replacement if lease says so — common in NNN','All interior renovation costs','Signage installation and permits','Landscaping and snow removal'], landlordPays: ['Structural repairs only','Major capital events per lease terms'], tiBudget: '$60,000–$180,000′ },
    large: { tenantPays: ['Full NNN operating costs','All systems maintenance','Full renovation responsibility','Permitting costs for improvements'], landlordPays: ['Building shell structure only','Land (you\’re effectively paying everything else)'], tiBudget: '$150,000–$500,000+' },
  },
};

const sizeLabel: Record<string, string> = { small: 'Under 2,000 sq ft', medium: '2,000–6,000 sq ft', large: 'Over 6,000 sq ft' };

export default function DFWRetailStorefrontGuide() {
  const [leaseType, setLeaseType] = useState('');
  const [size, setSize] = useState('');
  const [result, setResult] = useState<{ tenantPays: string[]; landlordPays: string[]; tiBudget: string } | null>(null);

  function calculate() {
    if (!leaseType || !size) return;
    setResult(LEASE_MAP[leaseType]?.[size] || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>🏪 DFW Retail Storefront Guide</div>
        <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.15, marginBottom: 12 }}>Retail Renovation & Maintenance <span style={{ color: '#F5E642′ }}>in DFW</span></h1>
        <p style={{ color: '#94A3B8', fontSize: 17, marginBottom: 36 }}>DFW retail vacancy hit 4.2% in 2025 — lowest in 15 years. Understanding your lease structure determines who pays for what before you spend a dollar on contractors.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginBottom: 40 }}>
          {[
            { icon: '🪧', title: 'Exterior Signage Permits', body: 'Every DFW city has unique sign codes. Dallas limits square footage by building frontage. Plano requires landlord approval + city permit. Most cities: 2–6 week permit turnaround. ProLnk sign contractors know each city\’s rules.' },
            { icon: '♿', title: 'ADA Entrance Requirements', body: 'Any renovation triggers ADA path of travel compliance from parking to renovated area. Door hardware (lever handles required), thresholds (1/2″ max), entrance mats all count. Violations: $75K first offense.' },
            { icon: '❄️', title: 'HVAC for High-Traffic Retail', body: 'Retail HVAC runs 3,000–4,000 hours/yr vs 2,000 for office. Size for 1.5–2x ventilation. DFW summer door traffic spikes load 30%. Variable-speed units save 20–35% on energy.' },
            { icon: '🔒', title: 'Security Systems', body: 'DFW retail security: camera system ($3,000–$12,000 installed), alarm monitoring ($30–$80/mo), panic buttons at POS. Check lease — some landlords require alarm company approval.' },
            { icon: '💡', title: 'Lighting Design', body: 'Retail lighting converts browsers to buyers. 50–100 foot-candles at feature displays vs 30 in general areas. LED retrofit: $4–$8/sq ft installed. DFW Oncor rebates: up to $0.16 per kWh saved.' },
            { icon: '🏗️', title: 'Build-Out Timeline', body: 'Small DFW retail build-out: 6–10 weeks. Medium: 10–20 weeks. Account for permit review (3–6 weeks in DFW cities), contractor lead times, and certificate of occupancy inspection.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#111E35', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: '#F5E642′ }}>{card.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 32, border: '1px solid #F5E642', marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#F5E642′ }}>📋 Lease Responsibility Analyzer</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Lease Type</label>
              <select value={leaseType} onChange={e => setLeaseType(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
                <option value="">Select lease type...</option>
                <option value="gross">Gross Lease (rent includes most expenses)</option>
                <option value="nnn">NNN / Triple Net (you pay operating expenses)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Retail Square Footage</label>
              <select value={size} onChange={e => setSize(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
                <option value="">Select size...</option>
                <option value="small">Small (under 2,000 sq ft)</option>
                <option value="medium">Medium (2,000–6,000 sq ft)</option>
                <option value="large">Large (over 6,000 sq ft)</option>
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Show Who Pays What →</button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 24, border: '1px solid #2A4A7F' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 17, marginBottom: 16 }}>{sizeLabel[size]} — {leaseType === 'gross' ? 'Gross Lease' : 'NNN Lease'}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div><span style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>TENANT PAYS</span>{result.tenantPays.map((p, i) => <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}><span style={{ color: '#F87171′ }}>•</span><span style={{ color: '#E8EDF5', fontSize: 13 }}>{p}</span></div>)}</div>
                <div><span style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>LANDLORD PAYS</span>{result.landlordPays.map((p, i) => <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}><span style={{ color: '#4ADE80′ }}>•</span><span style={{ color: '#E8EDF5', fontSize: 13 }}>{p}</span></div>)}</div>
              </div>
              <div style={{ background: '#111E35', borderRadius: 8, padding: 16 }}><span style={{ color: '#94A3B8', fontSize: 13 }}>ESTIMATED TENANT IMPROVEMENT BUDGET</span><div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginTop: 4 }}>{result.tiBudget}</div></div>
            </div>
          )}
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 28, border: '1px solid #1E3A5F', textAlign: 'center' }}>
          <div style={{ fontSize: 26, marginBottom: 12 }}>🏪</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Get Retail Build-Out Quotes</h3>
          <p style={{ color: '#94A3B8', marginBottom: 20 }}>ProLnk matches DFW retailers with licensed general contractors for signage, ADA upgrades, HVAC, and full storefront renovations.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Request Retail Renovation Quotes →</button>
        </div>
      </div>
    </div>
  );
}
