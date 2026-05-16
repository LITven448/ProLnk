import { useState } from 'react';

const situations = [
  {
    id: 'insideSmell',
    label: 'I smell gas inside the house',
    steps: [
      '❌ Do NOT flip any light switches or outlets — sparks can ignite gas',
      '❌ Do NOT use your phone inside the house',
      '✅ Leave immediately — exit through nearest door without touching anything',
      '✅ Leave the door open as you exit' ,
      '✅ Once outside and away: call Atmos at 888-286-6700',
      '✅ Call 911 if neighbors may be affected or smell is strong',
      '✅ Do NOT re-enter until Atmos clears the structure',
    ],
  },
  {
    id: 'outsideSmell',
    label: 'I smell gas outside near meter',
    steps: [
      '✅ Move away from the area',
      '✅ Call Atmos from a safe distance: 888-286-6700',
      '✅ Keep others away from the area',
      '❌ Do NOT attempt to close the meter valve yourself',
      '✅ Atmos will dispatch emergency crew — response typically under 1 hour in DFW metro',
    ],
  },
  {
    id: 'afterRepair',
    label: 'Gas was shut off, now relit — still smells faint',
    steps: [
      '✅ Ventilate thoroughly — open all windows and doors for 30+ minutes',
      '✅ Check pilot lights on water heater, furnace, gas range',
      '✅ If smell persists after ventilation, evacuate and call Atmos again',
      '❌ Do not assume faint smell is normal — it is not',
    ],
  },
  {
    id: 'whoPaysCost',
    label: 'Who pays for the gas leak investigation?',
    steps: [
      '✅ Atmos Energy checks their lines (meter and upstream) FREE — no charge to homeowner',
      '✅ If leak is on your side of the meter (interior piping), a licensed plumber handles repairs',
      '✅ Typical interior gas line repair in DFW: $150–$600 depending on pipe access',
      '✅ Home warranty may cover interior gas line — check your policy',
    ],
  },
];

export default function DFWGasLeakResponseGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = situations.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK — DFW EMERGENCY GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🚨 DFW Gas Leak Emergency Response</h1>

        <div style={{ background: '#7c1515', border: '1px solid #ef4444', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>⚠️ Emergency: Smell Gas Inside?</div>
          <div style={{ color: '#fca5a5', fontWeight: 700, fontSize: 18, marginBottom: 4 }}>LEAVE NOW. Call from outside.</div>
          <div style={{ color: '#fca5a5', fontSize: 15 }}>Atmos 24/7 Emergency: <strong>888-286-6700</strong> &nbsp;|&nbsp; 911 for immediate danger</div>
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>📋 Situation → Response Steps</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
            {situations.map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id === selected ? null : s.id)}
                style={{
                  background: selected === s.id ? '#F5E642' : '#0A1628',
                  color: selected === s.id ? '#0A1628' : '#fff',
                  border: '1px solid #F5E642',
                  borderRadius: 8,
                  padding: '12px 16px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
          {match && (
            <div style={{ background: '#0A1628', border: '1px solid #F5E642', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>Response Steps:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {match.steps.map((step, i) => (
                  <div key={i} style={{ color: '#e2e8f0', fontSize: 14 }}>{step}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 4 }}>Need a DFW Gas Line Plumber?</div>
          <div style={{ color: '#0A1628', fontSize: 14 }}>ProLnk connects you with licensed plumbers who handle gas line repairs. Free quote.</div>
        </div>
      </div>
    </div>
  );
}
