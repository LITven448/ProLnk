import { useState } from 'react';

type SystemType = 'string-inverter' | 'microinverter' | 'hybrid' | '';

const systemInfo: Record<Exclude<SystemType, ''>, {
  components: Array<{ name: string; icon: string; desc: string }>;
  oncorSteps: string[];
  timeline: string;
  notes: string;
}> = {
  'string-inverter': {
    components: [
      { name: 'Solar Panels (String)', icon: '☀️', desc: 'Panels wired in series strings; DC power flows to a central inverter. Common in DFW due to lower cost.' },
      { name: 'String Inverter', icon: '🔲', desc: 'Converts DC from the string to 240V AC. Single point of conversion — shade on one panel affects the whole string.' },
      { name: 'Combiner Box', icon: '📦', desc: 'Combines multiple string conductors before reaching the inverter; includes fusing and disconnect.' },
      { name: 'AC Disconnect (Utility Side)', icon: '🔌', desc: 'Required by Oncor — allows utility workers to disconnect the system without entering your home.' },
      { name: 'Net Meter', icon: '📊', desc: 'Oncor installs a bidirectional meter that tracks power you export and import, credited at retail rate.' },
      { name: 'Main Panel Connection', icon: '⚡', desc: 'Solar AC output connects at a dedicated breaker in your main panel; breaker + busbar must not exceed 120% of panel rating.' },
    ],
    oncorSteps: ['Submit interconnection application to Oncor (submit before installation).', 'Receive Oncor approval (typically 10–20 business days).', 'City of Dallas / local jurisdiction permit pulled by installer.', 'Installation completed.', 'City inspection scheduled and passed.', 'Oncor final inspection and net meter swap (2–4 weeks after city pass).', 'Permission to Operate (PTO) granted — system goes live.'],
    timeline: '6–12 weeks total from contract to PTO in DFW.',
    notes: 'String inverter systems are lowest cost in DFW. Weakness: hail damage to one panel or shade from a new tree reduces whole-string output.',
  },
  'microinverter': {
    components: [
      { name: 'Solar Panels (Individual)', icon: '☀️', desc: 'Each panel operates independently — shade or hail on one panel does not affect others.' },
      { name: 'Microinverter (per panel)', icon: '🔲', desc: 'Mounted under each panel; converts DC to AC at the panel level. Enphase IQ8 series is dominant in DFW.' },
      { name: 'Trunk Cable / AC Branch Circuits', icon: '🔗', desc: 'Microinverters wire in parallel on AC branch circuits that run to the combiner/trunk.' },
      { name: 'IQ Combiner / Envoy Gateway', icon: '📦', desc: 'Aggregates AC from all microinverters; communicates panel-level monitoring data to the cloud.' },
      { name: 'AC Disconnect (Utility Side)', icon: '🔌', desc: 'Required by Oncor — rapid shutdown compliant; microinverters automatically de-energize on AC loss.' },
      { name: 'Net Meter', icon: '📊', desc: 'Oncor net meter same as string systems; bidirectional metering credits export at retail rate.' },
    ],
    oncorSteps: ['Submit Oncor interconnection application.', 'Receive Oncor approval.', 'Local permit from city/municipality.', 'Installation — microinverters provide panel-level rapid shutdown compliance automatically.', 'City inspection.', 'Oncor inspection and net meter swap.', 'PTO granted.'],
    timeline: '7–13 weeks in DFW due to Oncor queue; microinverter installs take slightly longer on roof.',
    notes: 'Best for DFW homes with roof obstructions (chimneys, dormers, AC units). Higher upfront cost but individual panel monitoring is valuable for hail damage assessment after DFW storms.',
  },
  'hybrid': {
    components: [
      { name: 'Solar Panels', icon: '☀️', desc: 'Can be string or micro; DC or AC feeds into the hybrid inverter system.' },
      { name: 'Hybrid Inverter', icon: '🔲', desc: 'Manages solar input, battery charge/discharge, and grid connection simultaneously. Brands: SolarEdge, Enphase IQ, SunPower.' },
      { name: 'Battery System (Powerwall / IQ Battery)', icon: '🔋', desc: 'Stores solar energy for use during Oncor peak pricing hours (3–7 PM) or grid outages — critical after Winter Storm Uri.' },
      { name: 'Battery Connection Point / EMS', icon: '🔗', desc: 'Energy management system controls when to charge, discharge, and export based on time-of-use rates.' },
      { name: 'Critical Load Panel', icon: '📦', desc: 'Separate sub-panel for essential loads (fridge, lights, outlets) that stay on during grid outages.' },
      { name: 'Net Meter', icon: '📊', desc: 'Oncor net meter; battery systems require additional Oncor review to verify no unintentional islanding.' },
    ],
    oncorSteps: ['Submit Oncor interconnection application — include battery specs.', 'Oncor reviews battery system for anti-islanding compliance (adds 2–4 weeks).', 'Local permit — battery installations require separate electrical permit.', 'Installation — battery adds 1–2 days to install time.', 'City inspection includes battery wiring.', 'Oncor inspection and net meter swap.', 'PTO granted — battery backup active.'],
    timeline: '10–16 weeks in DFW; battery systems take longer due to Oncor battery-specific review.',
    notes: 'High priority for DFW after ERCOT grid instability events. A 10 kWh battery covers ~8–12 hours of essential loads. Qualifies for 30% federal ITC including battery cost.',
  },
};

export default function DFWSolarElectricalGuide() {
  const [systemType, setSystemType] = useState<SystemType>('');

  const info = systemType ? systemInfo[systemType] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F0FE', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 740, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>☀️ DFW SOLAR ELECTRICAL GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: '#fff' }}>Solar Electrical System Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, lineHeight: 1.6 }}>
          Understanding your solar system's electrical components and how Oncor interconnection works in the DFW area.
          Select your system type to see every component, the interconnection steps, and realistic timelines.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
          {(['string-inverter', 'microinverter', 'hybrid'] as const).map(type => (
            <button key={type} onClick={() => setSystemType(type)}
              style={{ padding: '14px 12px', background: systemType === type ? '#F5E642' : '#0F1F3D', color: systemType === type ? '#0A1628' : '#E8F0FE', border: '1px solid', borderColor: systemType === type ? '#F5E642' : '#2D3F5E', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
              {type === 'string-inverter' ? '🔲 String Inverter' : type === 'microinverter' ? '☀️ Microinverter' : '🔋 Hybrid + Battery'}
            </button>
          ))}
        </div>

        {info && (
          <>
            <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24, marginBottom: 20 }}>
              <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔌 System Components</h2>
              {info.components.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 14, padding: '12px', background: '#162035', borderRadius: 8 }}>
                  <span style={{ fontSize: 24 }}>{c.icon}</span>
                  <div>
                    <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{c.name}</div>
                    <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.5 }}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24, marginBottom: 20 }}>
              <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📋 Oncor Interconnection Process</h2>
              {info.oncorSteps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
                  <div style={{ minWidth: 28, height: 28, background: '#F5E642', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0A1628', fontWeight: 800, fontSize: 13 }}>{i + 1}</div>
                  <p style={{ color: '#CBD5E1', lineHeight: 1.5, margin: 0, paddingTop: 4 }}>{step}</p>
                </div>
              ))}
              <div style={{ marginTop: 16, padding: '12px 16px', background: '#162035', borderRadius: 8, borderLeft: '3px solid #F5E642' }}>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>⏱ Timeline: </span>
                <span style={{ color: '#CBD5E1' }}>{info.timeline}</span>
              </div>
            </div>

            <div style={{ background: '#162035', borderRadius: 12, padding: 20, marginBottom: 24, borderLeft: '3px solid #94A3B8' }}>
              <div style={{ color: '#E8F0FE', fontWeight: 700, marginBottom: 6 }}>💡 DFW Notes</div>
              <p style={{ color: '#94A3B8', lineHeight: 1.6, margin: 0 }}>{info.notes}</p>
            </div>
          </>
        )}

        <div style={{ textAlign: 'center', padding: '20px', background: '#0F1F3D', borderRadius: 12 }}>
          <p style={{ color: '#94A3B8', marginBottom: 12 }}>Need a licensed DFW solar electrical contractor for your Oncor interconnection?</p>
          <a href="/get-quote" style={{ background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>Get a Free DFW Solar Electrical Quote</a>
        </div>
      </div>
    </div>
  );
}
