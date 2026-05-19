import { useState } from 'react';

const myths = [
  {
    myth: "Closing vents in unused rooms saves energy",
    reality: "False — it causes pressure buildup and damages your system",
    dfw: "DFW duct systems are sized for full airflow. Closing vents creates backpressure that strains your blower motor and can crack heat exchangers — expensive in Texas heat.",
  },
  {
    myth: "Bigger AC unit = better cooling for DFW heat",
    reality: "False — oversized units short-cycle and trap humidity",
    dfw: "DFW summers combine 100°F heat with high humidity. An oversized unit cools too fast, shuts off before removing moisture, leaving your home clammy and growing mold.",
  },
  {
    myth: "Annual tune-ups are optional",
    reality: "False — they're critical in DFW's extreme climate",
    dfw: "DFW units run 8–10 months a year. Skipping tune-ups leads to coil freeze, refrigerant loss, and emergency breakdowns during July heat waves when HVAC techs are booked out.",
  },
  {
    myth: "You only need to change filters every 3 months",
    reality: "False — DFW dust and pollen demand monthly checks",
    dfw: "DFW's construction boom and cedar/elm pollen load filters in 4–6 weeks. A clogged filter makes your system work 15% harder and spikes your Oncor bill.",
  },
  {
    myth: "If the AC is blowing cold air, it's fine",
    reality: "False — it may be failing silently",
    dfw: "Low refrigerant, dirty coils, and failing capacitors all reduce efficiency before you feel it. Your system can blow cool air and still be running at 60% capacity.",
  },
  {
    myth: "Ceiling fans cool rooms when you're not in them",
    reality: "False — fans cool people, not rooms",
    dfw: "Running fans in empty DFW rooms wastes electricity. Turn fans off when you leave — they create wind chill on skin, not actual temperature reduction.",
  },
  {
    myth: "New construction DFW homes don't need HVAC checks",
    reality: "False — new builds often have installation defects",
    dfw: "DFW's construction pace means rushed installs. Improper duct sealing, wrong refrigerant charge, and undersized returns are common in homes under 5 years old.",
  },
  {
    myth: "You can skip HVAC maintenance if the system is newer",
    reality: "False — warranty requires documented maintenance",
    dfw: "Most DFW HVAC manufacturers void warranties without annual service records. A $150 tune-up protects a $10,000 warranty claim.",
  },
  {
    myth: "Thermostat location doesn't matter",
    reality: "False — placement determines accuracy",
    dfw: "DFW afternoon sun hits west-facing walls hard. A thermostat near a west window reads 5°F high, causing your system to over-cool and spike your electricity bill.",
  },
  {
    myth: "All HVAC contractors in DFW are equally qualified",
    reality: "False — licensing and experience vary widely",
    dfw: "Texas requires HVAC contractors to hold an HVAC contractor license from TDLR. Unlicensed work voids homeowner insurance claims and leaves you liable.",
  },
];

export default function DFWHVACMythsDebunked() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔥</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
            10 DFW HVAC Myths — Debunked
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
            What DFW homeowners get wrong about their AC — and what's actually true in this climate.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {myths.map((item, i) => (
            <div
              key={i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              style={{
                background: '#111f3a',
                borderRadius: 10,
                border: openIndex === i ? '1.5px solid #F5E642′ : '1.5px solid #1e3a5f',
                cursor: 'pointer',
                padding: '1rem 1.25rem',
                transition: 'border 0.2s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.97rem' }}>
                  💬 Myth {i + 1}: "{item.myth}"
                </span>
                <span style={{ color: '#F5E642', fontSize: '1.2rem' }}>{openIndex === i ? '▲' : '▼'}</span>
              </div>
              {openIndex === i && (
                <div style={{ marginTop: '1rem' }}>
                  <div style={{ background: '#0f2a4a', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '0.75rem' }}>
                    <span style={{ color: '#F5E642', fontWeight: 700 }}>✅ Reality: </span>
                    <span style={{ color: '#e2e8f0′ }}>{item.reality}</span>
                  </div>
                  <div style={{ background: '#0d1f38', borderRadius: 8, padding: '0.75rem 1rem' }}>
                    <span style={{ color: '#60a5fa', fontWeight: 600 }}>📍 DFW Context: </span>
                    <span style={{ color: '#94a3b8', fontSize: '0.93rem' }}>{item.dfw}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem', background: '#F5E642', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>🔧</div>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: '1.05rem' }}>
            Don't guess — get a DFW-certified HVAC pro through ProLnk
          </p>
          <p style={{ color: '#1e3a5f', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            All pros are licensed, background-checked, and rated by DFW homeowners like you.
          </p>
        </div>
      </div>
    </div>
  );
}
