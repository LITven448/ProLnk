import { useState } from 'react';

const arlingtonStats = [
  { label: 'Summer Days Above 100°F', value: '20+' },
  { label: 'Avg AC Runtime / Day', value: '14 hrs' },
  { label: 'HVAC Replacement Cost', value: '$6K–$14K' },
  { label: 'Energy Savings w/ Tune-Up', value: 'Up to 15%' },
];

const monthlyChecklists: Record<string, { tasks: string[]; urgency: string; urgencyColor: string }> = {
  'Jan': { urgency: 'Low', urgencyColor: '#4CAF50', tasks: ['Check heating system filter', 'Test thermostat calibration', 'Inspect heat exchanger for cracks', 'Clear vents of furniture'] },
  'Feb': { urgency: 'Low', urgencyColor: '#4CAF50', tasks: ['Schedule spring AC tune-up now (before rush)', 'Check weatherstripping on doors', 'Test carbon monoxide detectors', 'Review energy bills for anomalies'] },
  'Mar': { urgency: 'Moderate', urgencyColor: '#F5E642', tasks: ['Switch to cooling mode and test AC', 'Replace air filter (MERV 11+)', 'Clear debris from outdoor condenser unit', 'Check refrigerant level (professional only)'] },
  'Apr': { urgency: 'Moderate', urgencyColor: '#F5E642', tasks: ['Full AC tune-up if not done in March', 'Clean evaporator coil', 'Test all vents for airflow balance', 'Check condensate drain line for clogs'] },
  'May': { urgency: 'High', urgencyColor: '#FF6B35', tasks: ['Last chance for pre-summer tune-up', 'Check capacitor and contactors', 'Verify thermostat set to auto-cool', 'Inspect ductwork for leaks'] },
  'Jun': { urgency: 'Critical', urgencyColor: '#E53935', tasks: ['HVAC techs fully booked — call immediately if issues', 'Replace filter monthly during peak heat', 'Keep condenser clear of grass/weeds', 'Set thermostat no lower than 72°F to avoid freeze-up'] },
  'Jul': { urgency: 'Critical', urgencyColor: '#E53935', tasks: ['Same-day emergency service may have waitlist', 'Run ceiling fans to reduce AC load', 'Check refrigerant — low charge causes unit to ice over', 'Inspect insulation around refrigerant lines'] },
  'Aug': { urgency: 'Critical', urgencyColor: '#E53935', tasks: ['Peak demand month — units running 24/7', 'Watch for ice on refrigerant lines (sign of failure)', 'Clean or replace filter immediately if dirty', 'Check breaker panel for tripped HVAC breaker'] },
  'Sep': { urgency: 'High', urgencyColor: '#FF6B35', tasks: ['Heat continues through mid-September in Arlington', 'Schedule fall heating inspection for late month', 'Clean outdoor unit of summer debris', 'Check ductwork insulation in attic'] },
  'Oct': { urgency: 'Moderate', urgencyColor: '#F5E642', tasks: ['Switch to heating mode and test furnace', 'Replace filter before heating season', 'Check igniter and flame sensor', 'Seal attic air leaks before winter'] },
  'Nov': { urgency: 'Low', urgencyColor: '#4CAF50', tasks: ['Heating tune-up if not done in October', 'Check flue vent for blockages or corrosion', 'Program thermostat for winter schedule', 'Test heat pump auxiliary heat strips'] },
  'Dec': { urgency: 'Low', urgencyColor: '#4CAF50', tasks: ['Monitor system during first cold snaps', 'Keep records of filter changes for warranty', 'Check attic insulation levels', 'Plan spring AC service for February booking'] },
};

export default function DFWHVACArlington() {
  const [selectedMonth, setSelectedMonth] = useState('');

  const checklist = selectedMonth ? monthlyChecklists[selectedMonth] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>❄️🔥</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>
            Arlington TX HVAC
          </h1>
          <p style={{ fontSize: 20, color: '#94A3B8', margin: 0 }}>
            Mid-Cities Heat Relief — Year-Round Comfort for Arlington Homes
          </p>
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>Arlington's HVAC Reality: Extreme Demand All Year</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: '0 0 16px' }}>
            As DFW's third-largest city, Arlington's HVAC market is among the most competitive in Texas — and
            the most stressed. Summer temperatures routinely exceed 100°F for weeks at a time, pushing AC systems
            to run 14+ hours daily from June through September. A single failed capacitor in July means
            same-day emergency calls at premium rates.
          </p>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: 0 }}>
            Arlington's housing stock spans from 1960s ranch homes near downtown to 2010s developments near
            AT&T Stadium — each generation requiring different HVAC approaches. Local specialists understand
            the ductwork in older attics, the load requirements of larger new builds, and which brands hold
            up best in DFW summers.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
          {arlingtonStats.map(s => (
            <div key={s.label} style={{ backgroundColor: '#1E2D45', borderRadius: 10, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642' }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 8 }}>📅 Monthly HVAC Checklist</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 24 }}>
            Select the current month to get your season-specific prep tasks and urgency level.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, marginBottom: 24 }}>
            {Object.keys(monthlyChecklists).map(month => (
              <button
                key={month}
                onClick={() => setSelectedMonth(month)}
                style={{
                  padding: '10px 4px',
                  backgroundColor: selectedMonth === month ? '#F5E642' : '#0A1628',
                  color: selectedMonth === month ? '#0A1628' : '#CBD5E1',
                  border: '1px solid #334155',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: selectedMonth === month ? 700 : 400,
                  fontSize: 13,
                }}
              >
                {month}
              </button>
            ))}
          </div>

          {checklist && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: `4px solid ${checklist.urgencyColor}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: checklist.urgencyColor }} />
                <span style={{ color: checklist.urgencyColor, fontWeight: 700, fontSize: 18 }}>
                  {selectedMonth} Urgency: {checklist.urgency}
                </span>
              </div>
              <div style={{ display: 'grid', gap: 10 }}>
                {checklist.tasks.map((task, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: '#F5E642', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                    <span style={{ color: '#CBD5E1', fontSize: 15 }}>{task}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🏆 What Arlington HVAC Specialists Know</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { icon: '🌡️', title: 'Heat Load Calculation', desc: 'Right-sized systems for Arlington\’s heat index — oversized units short-cycle and fail early.' },
              { icon: '🏠', title: 'Attic Duct Expertise', desc: 'Arlington attics reach 160°F in summer — poorly insulated ducts waste 30% of your cooling capacity.' },
              { icon: '⚡', title: 'Emergency Response', desc: 'Peak-season availability networks so you\’re not waiting 3 days in 102°F heat.' },
              { icon: '💰', title: 'Rebate Navigation', desc: 'Oncor and AEP offer up to $1,500 in rebates for qualifying high-efficiency replacements.' },
            ].map(item => (
              <div key={item.title} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ color: '#fff', fontWeight: 600, marginBottom: 6 }}>{item.title}</div>
                <div style={{ color: '#94A3B8', fontSize: 14 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>❄️</div>
          <h2 style={{ color: '#0A1628', fontSize: 24, fontWeight: 800, margin: '0 0 8px' }}>
            Book an Arlington HVAC Specialist Today
          </h2>
          <p style={{ color: '#1E2D45', margin: '0 0 24px', fontSize: 16 }}>
            ProLnk connects Arlington homeowners with verified, licensed HVAC professionals — fast and free.
          </p>
          <button style={{ backgroundColor: '#0A1628', color: '#F5E642', fontWeight: 700, fontSize: 18, padding: '16px 40px', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
            Get HVAC Quote
          </button>
        </div>

      </div>
    </div>
  );
}
