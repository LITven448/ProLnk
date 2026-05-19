import { useState } from 'react';

const situations = [
  {
    id: 'new-system',
    label: '🏠 Replacing my AC/Heat system',
    rec: 'Heat Pump',
    reason: 'New installs get 30% ITC federal tax credit. DFW winters are mild — heat pump efficiency (COP 3-4) crushes gas furnace costs. One system cools AND heats. ROI typically under 5 years.',
    action: 'Get 3 ProLnk HVAC quotes comparing heat pump vs traditional. Ask each contractor about ITC eligibility and expected COP for your home size.'
  },
  {
    id: 'gas-heat',
    label: '🔥 I have gas heat, AC only needs replacement',
    rec: 'Traditional AC',
    reason: 'If your gas furnace is under 10 years old, replacing just the AC with a matching traditional unit is most cost-effective. Gas infrastructure already paid for.',
    action: 'Book a ProLnk HVAC assessment. Ask about 2-stage or variable speed compressors for DFW humidity control. 16+ SEER2 recommended.'
  },
  {
    id: 'freeze',
    label: '❄️ Worried about DFW freeze events',
    rec: 'Heat Pump + Emergency Heat Strips',
    reason: 'Modern heat pumps with electric heat strips handle DFW freeze events (rare but real). Strips activate below 35°F. System auto-switches. Zero risk of being cold.',
    action: 'Specify dual-fuel heat pump or heat pump with aux electric strips when getting ProLnk quotes. Code in DFW area permits both configurations.'
  },
  {
    id: 'efficiency',
    label: '💰 Maximizing efficiency and tax credits',
    rec: 'Heat Pump — Clear Winner',
    reason: '30% ITC federal credit (no cap for residential). DFW COP averages 3.2 — meaning 3.2x more heat energy than electricity used. Oncor rebates may stack on top.',
    action: 'Have ProLnk HVAC pro document installation for IRS Form 5695. Confirm system meets Energy Star requirements for full credit. File with 2026 taxes.'
  },
  {
    id: 'rental',
    label: '🏘️ Rental property, lowest upfront cost',
    rec: 'Traditional AC + Gas Heat',
    reason: 'Lower upfront cost. Tenants familiar with operation. Faster installation. Tax credit benefit limited for rental properties. Straightforward maintenance for property managers.',
    action: 'Get ProLnk quote for 14 SEER2 minimum traditional split system. Pair with 80% AFUE gas furnace. Budget $6,000–$9,000 installed in DFW.'
  }
];

export default function DFWHVACHeatPumpDFWGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = situations.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>🌡️</div>
          <h1 style={{ color: '#F5E642', fontSize: '26px', fontWeight: '800', margin: '0 0 8px' }}>
            DFW Heat Pump vs Traditional AC
          </h1>
          <p style={{ color: '#F5E642', fontSize: '13px', fontWeight: '700', margin: '0 0 8px' }}>
            FINAL GUIDE 2026 — DEFINITIVE DFW RESOURCE
          </p>
          <p style={{ color: '#94a3b8', fontSize: '15px', margin: '0′ }}>
            DFW mild winters make heat pumps uniquely effective here. COP 3–4 most days. 30% federal tax credit. One system for all seasons.
          </p>
        </div>

        <div style={{ background: '#112240', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '14px', fontWeight: '700', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Your DFW Situation →
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {situations.map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                style={{
                  background: selected === s.id ? '#F5E642′ : '#1e3a5f',
                  color: selected === s.id ? '#0A1628′ : '#e2e8f0',
                  border: 'none', borderRadius: '8px', padding: '14px 16px',
                  textAlign: 'left', cursor: 'pointer', fontSize: '14px', fontWeight: '600'
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {active && (
          <div style={{ background: '#112240', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
            <div style={{ color: '#F5E642', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>RECOMMENDATION</div>
            <div style={{ color: '#ffffff', fontSize: '22px', fontWeight: '800', marginBottom: '16px' }}>{active.rec}</div>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>{active.reason}</p>
            <div style={{ background: '#0A1628', borderRadius: '8px', padding: '16px' }}>
              <div style={{ color: '#F5E642', fontSize: '12px', fontWeight: '700', marginBottom: '8px' }}>⚡ ACTION</div>
              <p style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: '1.6', margin: '0′ }}>{active.action}</p>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', background: '#112240', borderRadius: '12px', padding: '24px' }}>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: '0 0 16px' }}>
            Get vetted DFW HVAC pros who know heat pump installations — free quotes through ProLnk
          </p>
          <a href="https://prolnk.io" style={{
            background: '#F5E642', color: '#0A1628', padding: '14px 32px',
            borderRadius: '8px', fontWeight: '800', fontSize: '15px', textDecoration: 'none', display: 'inline-block'
          }}>
            Get Free DFW HVAC Quotes → prolnk.io
          </a>
        </div>
      </div>
    </div>
  );
}
