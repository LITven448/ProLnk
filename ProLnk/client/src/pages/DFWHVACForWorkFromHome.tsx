import { useState } from 'react';

const wfhPlans: Record<string, Record<string, string[]>> = {
  light: {
    small: [
      '🏠 Light WFH, small office: Your AC runtime increases ~15% — expect $30–60/mo more on DFW electricity',
      '🌡️ Set office zone to 70–72°F; use ceiling fan to reduce AC load by 4–8%',
      '💡 Close blinds in office during peak sun hours (2–5pm DFW) — reduces heat load 20%',
      '📅 Add one extra filter check per year — WFH adds light additional demand',
      '🔇 Check that office HVAC vents aren\’t blocked by desk equipment — reduces efficiency',
    ],
    medium: [
      '🏠 Light WFH, medium home: Zoning matters more — cool office, allow others to drift',
      '🌡️ Smart thermostat with schedule: 70°F 8am–5pm, 74°F evenings — saves 10–15% vs constant cool',
      '💡 DFW summer: office window film reduces solar gain 40% and cuts AC cost',
      '📅 Bi-annual filter change minimum; office area may need more frequent changes',
      '🔇 Ensure return air path from office — door gaps or undercut doors help circulation',
    ],
    large: [
      '🏠 Light WFH, large home: Use zoning or close vents in unused rooms during work hours',
      '🌡️ Smart thermostat is ROI-positive within 18 months in DFW — install if not present',
      '💡 Large home with WFH: identify hot spots and address with mini-split if needed',
      '📅 Standard maintenance schedule with one additional spring tune-up before DFW summer',
    ],
  },
  full: {
    small: [
      '💼 Full-time WFH, small office: AC runs 40–60% more than non-WFH baseline in DFW summer',
      '🌡️ 70°F target; every 2°F warmer saves ~4% on DFW electricity — find your productivity sweet spot',
      '💡 Portable unit for office only if main system struggles — mini-split is better long-term',
      '📅 Filter change every 45 days — full-day occupancy drives faster filter loading',
      '⚡ Expect $80–150/mo more on DFW electricity bill from full-time WFH in summer',
      '🔧 Schedule pre-summer tune-up in March/April before DFW peak demand',
    ],
    medium: [
      '💼 Full-time WFH, medium home: Primary comfort zone investment is worthwhile',
      '🌡️ Smart thermostat with occupancy sensing — ROI under 12 months with DFW electricity rates',
      '💡 Office zone addition or mini-split: full-time WFH justifies the investment ($800–2,500)',
      '📅 Filter change every 30–45 days; annual duct inspection for full-time occupancy homes',
      '⚡ Consider time-of-use electricity plan — shift non-essential AC loads to off-peak hours',
      '🔧 Annual coil cleaning — full-time occupancy creates higher indoor particle load',
    ],
    large: [
      '💼 Full-time WFH, large home: Zoning system is now cost-effective',
      '🌡️ Dual-zone or multi-zone system: heat office + living, let bedrooms and guest rooms drift',
      '💡 Large DFW home with full WFH: proper zoning saves $150–300/mo in peak summer',
      '📅 Semi-annual HVAC service; quarterly filter inspection for occupied zones',
      '⚡ Solar + battery storage ROI improves dramatically with WFH electricity load in DFW',
      '🔧 Smart vent system to direct cooling precisely — eliminates wasteful whole-home cooling',
    ],
  },
  hybrid: {
    small: [
      '🔄 Hybrid WFH, small office: Program thermostat for WFH days vs office days',
      '🌡️ Schedule-based cooling: avoid cooling empty home on office days — saves 15–25%',
      '💡 Smart thermostat learns your pattern automatically within 1–2 weeks',
      '📅 Filter change every 60 days — hybrid occupancy is easier on system than full WFH',
    ],
    medium: [
      '🔄 Hybrid WFH, medium home: Smart thermostat with geofencing is ideal',
      '🌡️ Geofence cooling: AC pre-cools 30 min before you arrive home from office days',
      '💡 Avoid manual override on schedule — defeats efficiency gains',
      '📅 Filter change every 45–60 days; annual maintenance with spring tune-up',
    ],
    large: [
      '🔄 Hybrid WFH, large home: Zone-based scheduling saves most in DFW',
      '🌡️ Zone active areas on WFH days; reduce cooling in unused wings',
      '💡 Geofencing + zoning combination: maximum savings in large DFW homes',
      '📅 Semi-annual filter change; annual professional service',
      '🔧 Consider occupancy sensors in each zone for automatic adjustment',
    ],
  },
};

export default function DFWHVACForWorkFromHome() {
  const [wfhType, setWfhType] = useState('');
  const [officeSize, setOfficeSize] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (wfhType && officeSize) setSubmitted(true);
  };

  const plan = submitted && wfhType && officeSize && wfhPlans[wfhType]?.[officeSize];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide</span>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '12px 0 8px', lineHeight: 1.2 }}>HVAC for DFW Work-From-Home 💼</h1>
          <p style={{ color: '#94a3b8', fontSize: 17, lineHeight: 1.7 }}>
            Full-time WFH in DFW adds $80–200/month to your electricity bill in summer. The right HVAC strategy pays for itself in under 2 years — and keeps you productive when it's 107°F outside.
          </p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: '24px', marginBottom: 24, borderLeft: '4px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 12px' }}>📊 The WFH HVAC Math for DFW</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
            Pre-WFH, your home was empty 40–50 hours/week. Now it's occupied. DFW electricity averages <strong style={{ color: '#F5E642' }}>$0.14/kWh</strong>, and a typical AC system draws 3–5 kW. That’s $150–250/month extra in summer for a medium home. Smart HVAC optimization cuts that by 30–45%.
          </p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>🧠 WFH Productivity + Temperature</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { icon: '🌡️', label: '70–72°F = Peak Productivity', desc: 'Research shows cognitive performance peaks at 70–72°F — DFW home offices often run 76–80°F in summer' },
              { icon: '💨', label: 'Office Air Circulation', desc: 'Stagnant air in home offices increases CO2 — ensure return air path from office to maintain fresh air' },
              { icon: '☀️', label: 'Solar Gain in DFW Offices', desc: 'West-facing home offices can gain 400+ BTU/hr through windows — blinds or window film is ROI-positive' },
              { icon: '⚡', label: 'Time-of-Use Rates', desc: 'DFW utilities offer off-peak discounts — pre-cool your home before 2pm to avoid peak pricing' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 2 }}>{item.label}</div>
                  <div style={{ color: '#94a3b8', fontSize: 14 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>💼 Get Your WFH HVAC Optimization Plan</h2>
          <div style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>WFH INTENSITY</label>
              <select value={wfhType} onChange={e => { setWfhType(e.target.value); setSubmitted(false); }}
                style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}>
                <option value="">Select your WFH situation...</option>
                <option value="light">Light (1–2 days/week from home)</option>
                <option value="hybrid">Hybrid (3 days home / 2 in office)</option>
                <option value="full">Full-time remote (5 days/week from home)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW HOME SIZE</label>
              <select value={officeSize} onChange={e => { setOfficeSize(e.target.value); setSubmitted(false); }}
                style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}>
                <option value="">Select home size...</option>
                <option value="small">Small (under 1,500 sq ft)</option>
                <option value="medium">Medium (1,500–2,500 sq ft)</option>
                <option value="large">Large (2,500+ sq ft)</option>
              </select>
            </div>
          </div>
          <button onClick={handleSubmit} style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 24px', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Generate My WFH HVAC Plan →
          </button>
        </div>

        {plan && Array.isArray(plan) && (
          <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>Your WFH HVAC Optimization Plan</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
              {plan.map((item: string, i: number) => (
                <li key={i} style={{ color: '#cbd5e1', fontSize: 15, lineHeight: 1.5 }}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: '24px', textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>Get a WFH HVAC efficiency audit from a certified DFW pro</p>
          <button style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '14px 32px', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            Get Free WFH HVAC Quote — DFW
          </button>
        </div>
      </div>
    </div>
  );
}
