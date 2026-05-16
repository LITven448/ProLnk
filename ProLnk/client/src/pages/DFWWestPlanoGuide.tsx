import { useState } from 'react';

const homeEras = [
  { label: '1990-1999 (Early Legacy Corridor)', value: '90s' },
  { label: '2000-2009 (Legacy Town Center Era)', value: '2000s' },
  { label: '2010-2020 (Granite Park / Modernized)', value: '2010s' },
];
const valueTiers = [
  { label: '$400K-$700K (Mid-Range)', value: 'mid' },
  { label: '$700K-$1.2M (Premium)', value: 'premium' },
  { label: '$1.2M+ (Luxury)', value: 'luxury' },
];

const matrix: Record<string, Record<string, { priorities: string[]; expectations: string[] }>> = {
  '90s': {
    mid: { priorities: ['Foundation inspection (30+ yr clay soil movement)', 'HVAC full replacement if original', 'Original windows likely need replacement', 'Electrical panel upgrade check (may be 100A)'], expectations: ['Budget $800-1500/visit for quality contractors', 'Expect honest assessments — mid-tier pros common here'] },
    premium: { priorities: ['Whole-home repiping assessment (polybutylene risk)', 'Luxury kitchen/bath full renovation', 'Landscaping and pool equipment upgrade', 'Smart home / AV infrastructure retrofit'], expectations: ['$150-250/hr specialist labor expected', 'White-glove service standard in this corridor'] },
    luxury: { priorities: ['Architectural integrity preservation', 'Custom millwork and high-end finish refresh', 'Pool renovation and outdoor entertainment', 'Generator and whole-home automation'], expectations: ['Only vetted specialty contractors', 'Project managers expected on larger jobs'] },
  },
  '2000s': {
    mid: { priorities: ['Roof replacement if 15+ years old ($14-20K)', 'HVAC second generation replacement', 'Water heater and plumbing check', 'Driveway and exterior concrete sealing'], expectations: ['Mid-market pricing ($500-1000 typical jobs)', 'Strong contractor competition in this zone'] },
    premium: { priorities: ['Kitchen and bath premium refresh ($40-80K)', 'Energy efficiency upgrades (windows, insulation)', 'Outdoor living / pergola additions', 'EV charger and solar assessment'], expectations: ['Expect design-build firms at this level', 'Permit pulling and city coordination expected'] },
    luxury: { priorities: ['Full exterior renovation and hardscape', 'Pool and spa renovation', 'Home theater and smart integration', 'Backup power and energy storage'], expectations: ['Project budgets $100K+ common', 'Architect involvement often required'] },
  },
  '2010s': {
    mid: { priorities: ['First major HVAC service cycle', 'Roof mid-life inspection', 'Exterior repaint (15-year cycle)', 'Irrigation system audit'], expectations: ['Competitive pricing zone', 'Many newer pros serving this area'] },
    premium: { priorities: ['Appliance and fixture refresh for resale', 'Outdoor kitchen and entertainment build-out', 'Primary suite bathroom upgrade', 'EV charging and solar'], expectations: ['$1000-3000 average job ticket', 'Design consultation often included'] },
    luxury: { priorities: ['Bespoke landscape and hardscape', 'High-end appliance suite replacement', 'Home automation full integration', 'Wine cellar or specialty room build-out'], expectations: ['Curated contractor relationships', 'White-glove timeline management'] },
  },
};

export default function DFWWestPlanoGuide() {
  const [era, setEra] = useState('');
  const [tier, setTier] = useState('');

  const result = era && tier ? matrix[era]?.[tier] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>DFW Homeowner Series</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🏢 West Plano Homeowner Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 24, lineHeight: 1.7 }}>Legacy Drive, Granite Park, and the 121/DNT corridor — West Plano is DFW corporate country. Homes range from 1990s established neighborhoods to 2010s premium builds near major office campuses.</p>

        <div style={{ background: '#111D30', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🗓️ Home Era</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {homeEras.map(e => (
              <button key={e.value} onClick={() => setEra(e.value)} style={{ background: era === e.value ? '#F5E642' : '#1E2D45', color: era === e.value ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{e.label}</button>
            ))}
          </div>
        </div>

        <div style={{ background: '#111D30', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>💰 Home Value Tier</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {valueTiers.map(t => (
              <button key={t.value} onClick={() => setTier(t.value)} style={{ background: tier === t.value ? '#F5E642' : '#1E2D45', color: tier === t.value ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{t.label}</button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ background: '#111D30', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🔧 Maintenance Priorities</div>
              {result.priorities.map((p, i) => <div key={i} style={{ color: '#CBD5E1', marginBottom: 6, paddingLeft: 14, borderLeft: '3px solid #F5E642' }}>{p}</div>)}
            </div>
            <div style={{ background: '#111D30', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🤝 Service Expectations</div>
              {result.expectations.map((e, i) => <div key={i} style={{ color: '#CBD5E1', marginBottom: 6, paddingLeft: 14, borderLeft: '3px solid #22D3EE' }}>{e}</div>)}
            </div>
          </div>
        )}

        <div style={{ marginTop: 28, background: '#111D30', borderRadius: 12, padding: 18, color: '#94A3B8', fontSize: 13 }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>ProLnk Tip: </span>West Plano pros serve a high-expectation clientele. Expect permits, written scopes, and warranty paperwork as standard — not extras.
        </div>
      </div>
    </div>
  );
}
