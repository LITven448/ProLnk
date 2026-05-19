import { useState } from 'react';

const tips = [
  { n: 1, title: 'Replace Filter Monthly', short: 'Monthly filter changes are non-negotiable in DFW.', detail: 'DFW dust, pollen, and cedar season make monthly filter changes critical. A clogged filter forces your compressor to work 15-20% harder. Use MERV-8 minimum; MERV-11 if anyone in your home has allergies. Buy a 6-pack and set a calendar reminder.' },
  { n: 2, title: 'Flush Condensate Drain Quarterly', short: 'Algae blooms kill systems fast in Texas humidity.', detail: 'Pour 1/4 cup of distilled white vinegar into the condensate drain line quarterly. DFW summer humidity creates perfect algae-growing conditions — a blocked drain will trigger your float switch and shut down your system on the hottest day of the year.' },
  { n: 3, title: 'Set to 78°F When Away', short: 'Not above 82°F in DFW — that is the damage threshold.', detail: 'DFW attics hit 140°F+ in July. Setting your thermostat above 82°F when away allows humidity to spike inside, which damages wood, insulation, and promotes mold. 78°F when away is the right balance of efficiency and protection.' },
  { n: 4, title: 'Clear 2-Foot Zone Around Outdoor Unit', short: 'Vegetation kills airflow and shortens compressor life.', detail: 'Trim all plants, shrubs, and grass to at least 2 feet around your outdoor condenser. DFW vegetation grows fast. Restricted airflow raises head pressure, causes refrigerant overheating, and cuts 3-5 years off compressor life.' },
  { n: 5, title: 'Schedule Pre-Season Tune-Up in March', short: 'April and May bookings are 4-6 weeks out in DFW.', detail: 'DFW HVAC contractors are booked solid from April through June. Schedule your annual tune-up in February or March. A $99-150 tune-up catches failing capacitors, low refrigerant, and dirty coils before they become $2,000+ emergency calls.' },
  { n: 6, title: 'Check Refrigerant Lines Annually', short: 'Insulation on suction lines degrades in Texas UV.', detail: 'The large copper suction line running from your outdoor unit to the house should be wrapped in black foam insulation. Texas UV degrades this insulation in 3-5 years. Bare lines cause efficiency loss and potential condensation damage to the line set.' },
  { n: 7, title: 'Test Your Thermostat Battery in January', short: 'A dead thermostat battery in July is a real scenario.', detail: 'Replace thermostat batteries every January before peak season. A thermostat losing battery mid-summer can leave your system unresponsive when temps are 105°F. Takes 2 minutes. Do not skip this.' },
  { n: 8, title: 'Seal Attic Air Leaks Before Summer', short: 'Attic infiltration is the #1 efficiency drain in DFW.', detail: 'Air gaps around recessed lights, attic hatches, and ductwork penetrations allow 140°F attic air to infiltrate your conditioned space. Sealing these with spray foam pays back in 1-2 cooling seasons in DFW.' },
  { n: 9, title: 'Run Fan to Verify System Airflow', short: 'Weak airflow is a sign of a failing blower motor.', detail: 'Stand at each supply register and feel airflow with your hand. Weak or no airflow in certain rooms indicates duct disconnects or a failing blower. Catching this early prevents compressor damage from poor refrigerant return.' },
  { n: 10, title: 'Inspect Ductwork in Attic Annually', short: 'DFW attic heat destroys duct tape and flex duct over time.', detail: 'Flex duct in DFW attics can separate at connections over 10-15 years of 140°F summers. Disconnected duct dumps conditioned air directly into your attic. Have a tech or do-it-yourself inspection each year before you need the system most.' },
  { n: 11, title: 'Know Your System Age', short: 'DFW HVAC lifespan: 12-15 years with maintenance.', detail: 'Track your install date. Systems 12+ years old in DFW should have contingency budgets. Repair costs on aging systems escalate fast. If your system is 14+ years old and facing a major repair, replacement economics usually win.' },
  { n: 12, title: 'Document Every Service Visit', short: 'Records double your home value perception and protect warranties.', detail: 'Keep a file (physical or digital) of every HVAC service visit, repair, and part replacement. Warranties require documentation. When selling your home, a documented maintenance history adds real negotiating leverage and buyer confidence.' },
];

export default function DFWHVACTipsLoop() {
  const [active, setActive] = useState<number>(1);
  const tip = tips.find(t => t.n === active)!;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
          DFW HVAC QUICK TIPS
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>12 Essential DFW HVAC Tips</h1>
        <p style={{ color: '#94A3B8', fontSize: 15, marginBottom: 32 }}>Select any tip number for full DFW context and guidance.</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
          {tips.map(t => (
            <button
              key={t.n}
              onClick={() => setActive(t.n)}
              style={{
                width: 44, height: 44,
                borderRadius: '50%',
                background: active === t.n ? '#F5E642' : '#0F2040',
                color: active === t.n ? '#0A1628' : '#fff',
                border: '2px solid',
                borderColor: active === t.n ? '#F5E642' : '#1E3A5F',
                fontWeight: 800,
                fontSize: 15,
                cursor: 'pointer',
              }}
            >
              {t.n}
            </button>
          ))}
        </div>

        <div style={{ background: '#0F2040', border: '2px solid #F5E642', borderRadius: 16, padding: 32, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 13, letterSpacing: 1, marginBottom: 10 }}>TIP {tip.n} OF 12</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>{tip.title}</h2>
          <p style={{ color: '#F5E642', fontStyle: 'italic', marginBottom: 16, fontSize: 15 }}>{tip.short}</p>
          <p style={{ color: '#CBD5E1', lineHeight: 1.75, fontSize: 15 }}>{tip.detail}</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={() => setActive(a => a === 1 ? 12 : a - 1)} style={{ background: '#0F2040', color: '#F5E642', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontWeight: 700 }}>← Previous</button>
          <button onClick={() => setActive(a => a === 12 ? 1 : a + 1)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontWeight: 700 }}>Next Tip →</button>
        </div>
      </div>
    </div>
  );
}
