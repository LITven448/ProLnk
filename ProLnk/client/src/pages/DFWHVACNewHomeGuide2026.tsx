import { useState } from 'react';

const stages = [
  {
    id: 'pre_contract', label: 'Before Contract Signed', icon: '📝',
    tips: [
      'Ask builder for HVAC brand and model — minimum SEER2 16 for DFW climate zone 3',
      'Request duct design calculations — Manual D required by code but often skipped',
      'Negotiate HVAC upgrade at contract stage — 30-50% cheaper than post-close',
      'Ask about zoning — open floor plans often need 2-zone systems',
    ],
    upgrade: 'Best time to upgrade — builder buys equipment in bulk, upgrades cost $800-2,500 vs $4,000+ after close'
  },
  {
    id: 'framing', label: 'Framing Stage', icon: '🏗️',
    tips: [
      'Verify duct locations match design — changes cheapest now',
      'Check return air sizing — undersized returns are DFW #1 HVAC complaint',
      'Confirm outdoor unit pad location — west/southwest sun exposure kills efficiency',
      'Ask if ducts are being sealed with mastic (not just tape)',
    ],
    upgrade: 'Last chance to add radiant barrier in attic — DFW standard, reduces attic temp 20-30°F'
  },
  {
    id: 'rough_in', label: 'Rough-In Complete', icon: '🔧',
    tips: [
      'Request duct blaster test — DFW code allows 4% duct leakage, best systems are <2%',
      'Verify air handler location — attic install acceptable, garage or conditioned space better',
      'Confirm refrigerant type — new systems use R-410A or R-32, avoid R-22 legacy',
      'Check filter access — hard-to-reach filters get ignored by homeowners',
    ],
    upgrade: 'Add UV light sanitation system here ($300-600) — improves indoor air quality'
  },
  {
    id: 'pre_close', label: 'Pre-Close / Final Walk', icon: '🔑',
    tips: [
      'Run system 30+ minutes and measure supply/return temps — 18-22°F delta normal',
      'Check all vents are open and unobstructed',
      'Get equipment manuals, warranty cards, and serial numbers in writing',
      'Confirm HVAC warranty registration — builder often responsible first year',
    ],
    upgrade: 'Hire independent HVAC inspector ($200-400) — finds installation defects builder must fix'
  },
];

export default function DFWHVACNewHomeGuide2026() {
  const [stage, setStage] = useState('pre_contract');
  const current = stages.find(s => s.id === stage)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW New Construction HVAC Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>What new DFW homes get — and how to make sure yours performs in Texas heat</p>
        </div>

        <div style={{ background: '#111d33', borderRadius: 12, padding: 16, marginBottom: 24, border: '1px solid #f97316′ }}>
          <div style={{ color: '#f97316', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>⚠️ DFW Builder-Grade Reality</div>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0, lineHeight: 1.6 }}>
            Most DFW production builders install minimum-code HVAC systems (SEER2 14.3 minimum). 
            Duct systems are frequently oversized, undersized, or improperly sealed. 
            In DFW&apos;s 100°F+ summers, these shortcuts cost homeowners $400-1,200/year in excess energy bills.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {stages.map(s => (
            <button key={s.id} onClick={() => setStage(s.id)}
              style={{ background: stage===s.id?'#F5E642':'#111d33', color: stage===s.id?'#0A1628':'#fff', border:`2px solid ${stage===s.id?'#F5E642':'#1e3a5f'}`, borderRadius: 20, padding: '8px 16px', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>
              {s.icon} {s.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#111d33', borderRadius: 12, padding: 20, marginBottom: 20, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 14px' }}>{current.icon} {current.label}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {current.tips.map((tip, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, minWidth: 20 }}>{i+1}.</span>
                <span style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.5 }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2d1a', borderRadius: 12, padding: 16, border: '1px solid #4ade80′ }}>
          <div style={{ color: '#4ade80', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>💡 PRO TIP FOR THIS STAGE</div>
          <p style={{ color: '#cbd5e1', fontSize: 13, margin: 0, lineHeight: 1.6 }}>{current.upgrade}</p>
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, color: '#475569', fontSize: 12 }}>
          ProLnk DFW Homeowner Resource · Dallas-Fort Worth · 2026
        </div>
      </div>
    </div>
  );
}
