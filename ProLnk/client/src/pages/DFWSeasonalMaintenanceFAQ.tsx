import { useState } from 'react';

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const tasks: Record<string, string[]> = {
  Jan: ['Inspect roof for winter damage','Check attic insulation and ventilation','Test smoke and CO detectors','Inspect caulking around windows/doors','Schedule spring HVAC tune-up'],
  Feb: ['Pre-order mulch for spring beds','Inspect foundation for winter cracks','Clean dryer vent','Test sump pump if applicable','Prune dormant trees and shrubs'],
  Mar: ['Start lawn fertilization (first app for warm-season grass)','Service irrigation system — turn on and check heads','Schedule AC tune-up before summer','Clean gutters from winter debris','Inspect and clean AC condenser coils'],
  Apr: ['Apply pre-emergent herbicide for crabgrass','Seal driveway and walkways (ideal temp 50-90°F)','Inspect deck/fence for winter damage','Power wash exterior surfaces','Test and replace GFCI outlets if needed'],
  May: ['Final AC tune-up check before summer heat','Deep clean window screens','Inspect attic for heat buildup','Apply second lawn fertilization','Check irrigation timer settings for summer schedule'],
  Jun: ['Adjust irrigation to daily watering during heat','Start foundation watering program (soaker hose)','Clean AC drain line with bleach','Check attic temp (should not exceed 130°F)','Inspect roof for any wind damage from spring storms'],
  Jul: ['Replace HVAC filter (change monthly in summer)','Monitor foundation moisture levels daily','Check exterior paint for cracking/peeling','Inspect caulking around exterior penetrations','Clean refrigerator coils'],
  Aug: ['Schedule fall HVAC maintenance','Plan exterior painting before temps drop','Check attic ventilation performance','Treat wood decks and fences if peeling','Inspect plumbing for signs of heat expansion issues'],
  Sep: ['Apply fall lawn fertilization (winterizer prep)','Aerate and overseed lawn if needed','Begin reducing irrigation frequency as temps drop','Inspect chimney and fireplace before first use','Clean window wells and drains'],
  Oct: ['Winterize irrigation system (DFW typically Oct 15-Nov 1)','Schedule heating system tune-up','Clean gutters after early leaf fall','Seal gaps in exterior — pest exclusion before winter','Check weatherstripping on all exterior doors'],
  Nov: ['Drain and store garden hoses','Disconnect exterior hose bibs if temps forecast below 28°F','Apply last lawn fertilization (winterizer)','Inspect roof for loose shingles before winter storms','Check attic insulation before heating season'],
  Dec: ['Inspect pipes in unconditioned spaces — insulate if needed','Test backup heat sources','Check generator if you have one','Review homeowner insurance coverage annually','Deep clean dryer vent and check exhaust path'],
};

const faqs = [
  { q: 'When should I fertilize my DFW lawn?', a: 'DFW warm-season grasses (St. Augustine, Bermuda, Zoysia) need fertilizer March-May (3 apps), June-August (2 apps), and a winterizer in November. Do not fertilize cool-season grasses in summer heat.' },
  { q: 'When is the best time to seal my driveway?', a: 'April-May is ideal in DFW — temperatures between 50-90°F and lower UV intensity. Avoid sealing in summer heat (asphalt can blister) or during rainy periods. Reseal every 3-5 years.' },
  { q: 'Should I get AC serviced before or after summer?', a: 'Before — schedule in March or April before the rush. HVAC companies are booked 2-4 weeks out by May in DFW. Spring service ensures your system handles 100°F+ temperatures efficiently.' },
  { q: 'When do I winterize irrigation in DFW?', a: 'Typically October 15 - November 1 in DFW. Unlike northern climates, DFW rarely needs full blowout — shut off and drain your system. If temperatures will drop below 28°F, shut off immediately.' },
  { q: 'When should I aerate my lawn in DFW?', a: 'Warm-season grasses: aerate in late April to June when actively growing. Cool-season grasses (rare in DFW): aerate in September-October. Never aerate dormant grass.' },
  { q: 'When should I inspect my roof in DFW?', a: 'After every major storm (especially hail storms March-May and September-October). Also inspect in spring and fall as general maintenance. DFW averages more hail events than almost any U.S. metro.' },
  { q: 'When is termite swarm season in DFW?', a: 'March through May is peak swarm season in North Texas. Schedule annual termite inspections in February before swarms begin. Keep wood mulch 12+ inches from your foundation.' },
  { q: 'When should I clean my gutters in DFW?', a: 'Twice yearly: March (after winter debris) and November (after fall leaves). DFW gets significant spring storms, so clean gutters ensure proper drainage during heavy rain events.' },
  { q: 'When do I start my foundation watering program?', a: 'Begin in May and continue through September/October. Water 15-20 minutes daily with a soaker hose during dry spells. Stop when soil is consistently moist. DFW clay soil needs consistent moisture year-round.' },
  { q: 'When is the best time to paint my home exterior in DFW?', a: 'March-May or September-October. Avoid July-August heat (paint dries too fast, causing adhesion issues) and January-February (too cold for proper curing). Ideal temp: 50-85°F with low humidity.' },
  { q: 'When should I replace my water heater in DFW?', a: 'Proactively replace at 10-12 years. Schedule before winter demand peaks (October). Tank failures in winter cause cold showers when plumbers are busiest. Tankless units are popular in DFW due to mild winters.' },
  { q: 'When do I need to worry about pipe freezing in DFW?', a: 'When overnight temps drop below 28°F for 4+ hours — typically December-February. Insulate exposed pipes in November. Let faucets drip during freeze events. DFW homeowners are especially vulnerable since homes lack deep insulation.' },
  { q: 'When should I apply pre-emergent weed killer in DFW?', a: 'Apply in late February to early March when soil temps reach 55°F (usually when Bradford Pears bloom). A second application in September controls winter weeds. Timing is critical — too late and weeds are already germinated.' },
  { q: 'When is chimney cleaning season in DFW?', a: 'Schedule in September-October before first use. DFW fireplaces are used briefly (November-February) but creosote still builds up. Annual inspection is recommended regardless of use frequency.' },
  { q: 'When should I replace my HVAC filter in DFW?', a: 'Every 30-60 days for 1-inch filters during summer and winter peak seasons. Every 90 days in shoulder seasons. DFW dust, allergens, and construction particulates clog filters faster than most markets.' },
];

export default function DFWSeasonalMaintenanceFAQ() {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📅</div>
          <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>DFW Seasonal Maintenance FAQ</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>Select a month to see all maintenance tasks — or browse the FAQ below</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 32, border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 14px', fontSize: 14 }}>📆 MONTHLY TASK PLANNER</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: selectedMonth ? 16 : 0 }}>
            {months.map(m => (
              <button key={m} onClick={() => setSelectedMonth(selectedMonth === m ? null : m)}
                style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  background: selectedMonth === m ? '#F5E642' : '#1e3a5f', color: selectedMonth === m ? '#0A1628' : '#94a3b8' }}>
                {m}
              </button>
            ))}
          </div>
          {selectedMonth && tasks[selectedMonth] && (
            <div style={{ marginTop: 16 }}>
              <p style={{ color: '#e2e8f0', fontWeight: 700, margin: '0 0 10px' }}>{selectedMonth} Tasks for DFW Homeowners:</p>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {tasks[selectedMonth].map((t, i) => (
                  <li key={i} style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.8 }}>{t}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Seasonal Timing FAQ</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: 10, overflow: 'hidden', border: open === i ? '1px solid #F5E642' : '1px solid #1e3a5f' }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', textAlign: 'left', padding: '14px 18px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 600 }}>{faq.q}</span>
                <span style={{ color: '#F5E642', fontSize: 16, marginLeft: 12 }}>{open === i ? '▲' : '▼'}</span>
              </button>
              {open === i && (
                <div style={{ padding: '0 18px 14px', color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 32, padding: 20, background: '#112240', borderRadius: 10, border: '1px solid #F5E642', textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 6px' }}>🔧 Ready to book seasonal maintenance?</p>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>ProLnk connects DFW homeowners with trusted local pros for every season.</p>
        </div>
      </div>
    </div>
  );
}
