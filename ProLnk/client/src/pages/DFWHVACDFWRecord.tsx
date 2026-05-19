import { useState } from 'react';

const events = ['Hottest Day Ever','Coldest Snap','42-Day Heat Siege','Worst Ice Storm','Tornado Outbreak'];

const impacts: Record<string, { record: string; year: string; hvacEffect: string; action: string }> = {
  'Hottest Day Ever': {
    record: '113°F recorded in Dallas (Aug 1980)',
    year: '1980',
    hvacEffect: 'At 113°F, most residential AC units rated to 115°F outdoor coil temp are at failure threshold. Refrigerant pressure spikes, compressor overheats. Units sized for 95°F design temp run 30%+ over capacity.',
    action: '🛠️ Shade your outdoor unit with a pergola or shade sail. Pre-cool to 74°F before 2pm. Schedule a refrigerant pressure check now — ProLnk pros do this same-day.',
  },
  'Coldest Snap': {
    record: '-2°F in Dallas (Feb 2021, Winter Storm Uri)',
    year: '2021',
    hvacEffect: 'Heat pumps lose efficiency below 35°F and require auxiliary heat below 25°F. At -2°F, heat pumps in DFW ran on emergency resistance heat for 4+ days — spiking electric bills to $2,000+.',
    action: '🔥 Know your backup heat source. Ensure furnace gas valve, igniter, and heat exchanger are inspected every fall. ProLnk HVAC pros can audit cold-weather readiness.',
  },
  '42-Day Heat Siege': {
    record: '42 consecutive days at 100°F+ (summer 2011)',
    year: '2011',
    hvacEffect: 'Extended runtime at peak load caused compressor burnout across DFW. Refrigerant leaks from heat stress on coil joints. Capacitor failures spiked 3x during this period.',
    action: '⚡ Replace capacitors every 5 years proactively. Keep refrigerant levels verified. During multi-week heat events, run ceiling fans to reduce compressor duty cycle.',
  },
  'Worst Ice Storm': {
    record: 'Feb 2021 — 246 consecutive hours of below-freezing temps',
    year: '2021',
    hvacEffect: 'Heat pump outdoor coils ice over below 28°F — defrost cycles run constantly, draining efficiency. Pipes in air handler closets froze and burst, flooding air handlers.',
    action: '🧊 Insulate air handler closets. Verify defrost board is functional every fall. Keep thermostat at 68°F minimum during freezes to maintain pipe heat.',
  },
  'Tornado Outbreak': {
    record: 'Oct 2019 — 8 tornadoes in one night across DFW',
    year: '2019',
    hvacEffect: 'Debris impact damaged condenser coils and refrigerant lines. Power surges during storms killed control boards. Rooftop units on commercial buildings sustained direct strike damage.',
    action: '🌪️ Install surge protectors on HVAC electrical panels. Keep shrubs trimmed 18 inches from condenser. ProLnk can assess storm damage — many repairs covered by homeowner insurance.',
  },
};

export default function DFWHVACDFWRecord() {
  const [selected, setSelected] = useState('Hottest Day Ever');
  const data = impacts[selected];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Weather Records & Your HVAC</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>North Texas has some of the most extreme weather records in the US. Here is what each extreme means for your HVAC system.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 28 }}>
          {[
            { label: 'Hottest', value: '113°F', sub: 'Aug 1980′ },
            { label: 'Coldest', value: '-2°F', sub: 'Feb 2021′ },
            { label: '100°F+ Streak', value: '42 days', sub: 'Summer 2011′ },
          ].map(s => (
            <div key={s.label} style={{ background: '#0f2040', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700 }}>{s.label}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#F5E642′ }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>⚡ Select a DFW Extreme Weather Event</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {events.map(e => (
              <button key={e} onClick={() => setSelected(e)}
                style={{ padding: '8px 14px', borderRadius: 6, border: 'none', cursor: 'pointer',
                  background: selected === e ? '#F5E642′ : '#162035', color: selected === e ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 13 }}>
                {e}
              </button>
            ))}
          </div>

          <div style={{ background: '#162035', borderRadius: 10, padding: 20, marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>OFFICIAL RECORD</div>
            <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 16 }}>{data.record}</div>
          </div>

          <div style={{ background: '#162035', borderRadius: 10, padding: 20, marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8 }}>HVAC IMPACT</div>
            <div style={{ color: '#e2e8f0', lineHeight: 1.7 }}>{data.hvacEffect}</div>
          </div>

          <div style={{ background: '#1a2a4a', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
            <div style={{ fontSize: 12, color: '#F5E642', marginBottom: 8, fontWeight: 700 }}>WHAT TO DO</div>
            <div style={{ color: '#e2e8f0', lineHeight: 1.7 }}>{data.action}</div>
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 18 }}>Extreme Weather Ready? Get a Pro Assessment.</div>
          <div style={{ color: '#162035', marginTop: 4, fontSize: 14 }}>ProLnk matches you with DFW HVAC pros who know local extremes.</div>
          <button style={{ marginTop: 12, background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>
            Get Free Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
