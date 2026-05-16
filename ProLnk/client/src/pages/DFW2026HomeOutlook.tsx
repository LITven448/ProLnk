import { useState } from 'react';

const submarkets = ['North Dallas', 'Plano/Frisco', 'Fort Worth', 'Arlington', 'McKinney/Allen', 'Garland/Mesquite', 'Irving/Las Colinas', 'Southlake/Keller'];
const homeTypes = ['Single Family', 'Townhome', 'Condo', 'Acreage/Rural'];

const outlookData: Record<string, string[]> = {
  'Single Family': ['Foundation watering critical — La Niña pattern expected through summer', 'HVAC replacement costs up 12% YoY — book early Q1', 'New IRC 2024 adopted statewide: arc-fault breakers now required on remodels'],
  'Townhome': ['HOA-driven exterior maintenance may offset your costs', 'Window replacement trending: dual-pane Low-E rebates available from Oncor', 'Plumbing inspections critical — shared wall units aging in Collin County'],
  'Condo': ['Reserve fund contributions rising — budget 15% more than 2025', 'EV charger retrofits approved in most DFW HOAs now', 'HVAC service contracts worth it: condensers failing at high rates in older units'],
  'Acreage/Rural': ['Well pump inspections critical — drought stress on aquifers', 'Propane price volatility: lock in contracts by February', 'Septic system inspections required before many 2026 refinances'],
};

const submarketOutlook: Record<string, string> = {
  'North Dallas': 'Strong appreciation expected: 6–8%. Contractor demand high — book 60+ days out.',
  'Plano/Frisco': 'New construction competition keeps resale flat. Focus on systems over cosmetics.',
  'Fort Worth': 'Fastest growing submarket. Trades shortage: prices up 18% for skilled labor.',
  'Arlington': 'Steady 4–5% appreciation. Good value for proactive maintenance investment.',
  'McKinney/Allen': 'Premium market. Buyers expect move-in ready. Deferred maintenance penalized at sale.',
  'Garland/Mesquite': 'Value market with upside. Infrastructure improvements driving appreciation.',
  'Irving/Las Colinas': 'Corporate relocation demand. Modern upgrades (smart home, EV) command premiums.',
  'Southlake/Keller': 'Luxury tier: 7–9% appreciation. High contractor standards expected.',
};

export default function DFW2026HomeOutlook() {
  const [homeType, setHomeType] = useState('');
  const [submarket, setSubmarket] = useState('');

  const priorities = homeType ? outlookData[homeType] : [];
  const outlook = submarket ? submarketOutlook[submarket] : '';

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🏠</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW 2026 Home Market Outlook</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>What DFW homeowners should expect in 2026 — contractor pricing trends, code changes, energy costs, and submarket forecasts.</p>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>⚡ 2026 Key Trends</h2>
          {[
            ['📈', 'Contractor Labor', 'Skilled trades up 15–20% YoY. Book HVAC and roofing by March.'],
            ['🔌', 'Energy Costs', 'TXU/Oncor rate increases of 8–11% expected. Efficiency upgrades have faster payback.'],
            ['🧱', 'Materials', 'Lumber stabilized. Copper up 22%. PEX preferred over copper for replumbing.'],
            ['📋', 'Code Changes', 'IRC 2024 adopted statewide. Arc-fault, AFCI, and egress window updates required.'],
          ].map(([icon, label, desc]) => (
            <div key={label} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              <div><div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 2 }}>{label}</div><div style={{ color: '#94a3b8', fontSize: 14 }}>{desc}</div></div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔍 Your 2026 Priorities</h2>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ backgroundColor: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '8px 12px', flex: 1 }}>
              <option value="">Select home type...</option>
              {homeTypes.map(t => <option key={t}>{t}</option>)}
            </select>
            <select value={submarket} onChange={e => setSubmarket(e.target.value)} style={{ backgroundColor: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '8px 12px', flex: 1 }}>
              <option value="">Select submarket...</option>
              {submarkets.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          {priorities.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>YOUR HOME TYPE PRIORITIES:</div>
              {priorities.map((p, i) => <div key={i} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 12, marginBottom: 8, color: '#e2e8f0', fontSize: 14 }}>✅ {p}</div>)}
            </div>
          )}
          {outlook && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>SUBMARKET OUTLOOK:</div>
              <div style={{ color: '#F5E642', fontWeight: 600 }}>{submarket}</div>
              <div style={{ color: '#e2e8f0', fontSize: 14, marginTop: 6 }}>{outlook}</div>
            </div>
          )}
          {!homeType && !submarket && <div style={{ color: '#64748b', fontSize: 14 }}>Select your home type and submarket to see personalized 2026 outlook.</div>}
        </div>

        <div style={{ textAlign: 'center', backgroundColor: '#F5E642', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16 }}>Get matched with vetted DFW contractors</div>
          <div style={{ color: '#0A1628', fontSize: 13, marginTop: 4 }}>ProLnk connects you with pre-screened local pros</div>
        </div>
      </div>
    </div>
  );
}
