import { useState } from 'react';

type WorkType = 'Water Heater' | 'Sewer Line' | 'Rough-In' | 'Gas Line';

const cityData: Record<string, Record<WorkType, { required: boolean; cost: string; checks: string[]; note: string }>> = {
  Dallas: {
    'Water Heater': { required: true, cost: '$75-150', checks: ['TPRV installed and vented properly', 'Seismic straps (if applicable)', 'Drain pan and line to approved location', 'Expansion tank required on closed systems'], note: 'Dallas requires permit for every water heater replacement, no exceptions.' },
    'Sewer Line': { required: true, cost: '$200-400', checks: ['Camera inspection required pre-close', 'Slope verified at 1/4 in per foot', 'No back-pitch sections', 'Cleanout access installed'], note: 'Dallas requires open trench inspection before backfill on sewer jobs.' },
    'Rough-In': { required: true, cost: '$125-250', checks: ['All supply and drain lines roughed in', 'Pressure test on supply lines', 'Stub-outs capped and labeled', 'DWV lines sloped correctly'], note: 'Rough-in inspection required before any walls closed.' },
    'Gas Line': { required: true, cost: '$100-200', checks: ['Pressure test at 1.5x working pressure', 'No flex connectors inside walls', 'Shutoffs at each appliance', 'Bonding wire on gas piping'], note: 'Dallas Gas Inspectors schedule within 24 hours for residential.' },
  },
  Plano: {
    'Water Heater': { required: true, cost: '$75-125', checks: ['TPRV discharge pipe to floor or exterior', 'Expansion tank on all Plano water heaters', 'Venting clearances for gas units', 'Permit card on-site during install'], note: 'Plano inspection scheduling available online — same week usually.' },
    'Sewer Line': { required: true, cost: '$150-300', checks: ['Video inspection submitted with permit', 'All joints properly sealed', 'Proper cleanout spacing', 'Final backfill with approved material'], note: 'Plano requires video inspection file submitted for sewer permits.' },
    'Rough-In': { required: true, cost: '$100-200', checks: ['Supply lines pressure tested at 80 psi', 'Drain slopes verified', 'Vent stacks to approved termination', 'All penetrations fire-blocked'], note: 'Plano rough-in inspections available next business day.' },
    'Gas Line': { required: true, cost: '$100-175', checks: ['Leak test with approved gauge', 'Piping sized per BTU load', 'CSST bonding required', 'Shutoff labeled at meter'], note: 'Plano requires CSST bonding on all corrugated stainless gas lines.' },
  },
  Frisco: {
    'Water Heater': { required: true, cost: '$100-175', checks: ['Expansion tank mandatory', 'Earthquake straps if in garage', 'TPRV pipe metal (not PVC)', 'Combustion air adequate for gas units'], note: 'Frisco has fast online permit portal — water heater permits same-day.' },
    'Sewer Line': { required: true, cost: '$200-350', checks: ['Open inspection before backfill', 'Slope minimum 1/4 in per foot', 'New cleanout within 100 ft of structure', 'Approved backfill compaction'], note: 'Frisco inspector must observe open trench — no backfill before sign-off.' },
    'Rough-In': { required: true, cost: '$125-225', checks: ['All rough-in complete before inspection', 'No leaks at 80 psi test', 'DWV air test passed', 'Inspector must sign permit card'], note: 'Frisco rough-in inspections scheduled via online portal.' },
    'Gas Line': { required: true, cost: '$125-200', checks: ['All CSST bonded', '10 psi pressure test minimum', 'Excess flow valves on branch lines', 'Meter tag matches address'], note: 'Frisco requires excess flow valves on branch gas lines per current code.' },
  },
};

const workTypes: WorkType[] = ['Water Heater', 'Sewer Line', 'Rough-In', 'Gas Line'];

export default function DFWPlumbingPermitInspection2026() {
  const [city, setCity] = useState('Dallas');
  const [work, setWork] = useState<WorkType>('Water Heater');
  const info = cityData[city]?.[work];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🔧</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>
            DFW Plumbing Permit & Inspection Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Select your city and work type to see permit requirements</p>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ color: '#94a3b8', fontSize: 12, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>City</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {Object.keys(cityData).map(c => (
              <button key={c} onClick={() => setCity(c)}
                style={{ padding: '9px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13,
                  background: city === c ? '#F5E642' : '#1e2d45', color: city === c ? '#0A1628' : '#94a3b8' }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#94a3b8', fontSize: 12, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Work Type</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {workTypes.map(w => (
              <button key={w} onClick={() => setWork(w)}
                style={{ padding: '9px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13,
                  background: work === w ? '#F5E642' : '#1e2d45', color: work === w ? '#0A1628' : '#94a3b8' }}>
                {w}
              </button>
            ))}
          </div>
        </div>

        {info && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ background: '#1e2d45', borderRadius: 12, padding: '16px 20px', borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 800 }}>✅ Permit Required — Typical Cost: {info.cost}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 6 }}>{info.note}</div>
            </div>
            <div style={{ background: '#1e2d45', borderRadius: 12, padding: '16px 20px' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🔍 What Inspector Checks</div>
              {info.checks.map((c, i) => (
                <div key={i} style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8, paddingLeft: 12, borderLeft: '2px solid #F5E642' }}>✓ {c}</div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 24, background: '#1e2d45', borderRadius: 12, padding: 18, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700 }}>🏠 Save Passed Inspection to ProLnk Vault</div>
          <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 6 }}>Plumbing permits on file protect you at resale and validate insurance claims after water damage.</div>
        </div>
      </div>
    </div>
  );
}
