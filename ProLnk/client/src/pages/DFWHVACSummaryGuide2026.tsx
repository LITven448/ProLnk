import { useState } from 'react';

const situations = [
  { id: 'noAC', label: '🚨 No AC Right Now', actions: ['Call ProLnk emergency HVAC — Charter pros respond in <15 min', 'Check breaker panel first — tripped breaker is common fix', 'Verify thermostat is set to COOL, not FAN only', 'Check drain pan under air handler — overflow shutoff may have triggered', 'If refrigerant leak smell: exit home, call pro immediately' ] },
  { id: 'planning', label: '📋 Planning Ahead', actions: ['Schedule tune-up in March before 100°F days begin', 'Replace filter monthly during cooling season (May–Sept)', 'Flush condensate drain quarterly with 1 cup of bleach solution', 'Keep outdoor unit clear — 2ft clearance on all sides', 'Check attic insulation — poor insulation kills efficiency' ] },
  { id: 'replacement', label: '🔄 Considering Replacement', actions: ['Units 12+ years old: plan replacement this season, not next', 'Minimum SEER2 15 required in Texas — ask your pro to confirm', 'Get 3 bids through ProLnk — price range is $6K–$14K installed', 'Ask about rebates: Oncor offers up to $1,400 for high-efficiency units', 'Document replacement in your Home Health Vault for resale value' ] },
  { id: 'bills', label: '💸 High Energy Bills', actions: ['Dirty filter is #1 cause — replace if it’s been over 3 weeks', 'Check for duct leaks in attic — can waste 20–30% of cooling', 'Smart thermostat (ecobee/Nest) cuts bills 15–23% on average', 'Close blinds on west-facing windows 2–6pm — reduces load 12%', 'Annual tune-up restores 15% efficiency lost to wear' ] },
];

const summaryFacts = [
  { icon: '🔧', title: 'Filter: Replace Monthly', body: 'In DFW’s dusty summers, monthly is not optional. A dirty filter makes your system work 20% harder and cuts airflow.' },
  { icon: '📅', title: 'Tune-Up: Every March', body: 'Before peak cooling season. A $150 tune-up prevents a $4,000 emergency in July. Includes coil cleaning and refrigerant check.' },
  { icon: '💧', title: 'Condensate Drain: Quarterly Flush', body: 'Pour 1 cup of bleach down the condensate drain every 3 months. Algae buildup causes shutoffs and water damage.' },
  { icon: '🚨', title: 'Emergency: Call ProLnk', body: 'Charter HVAC pros respond in under 15 minutes. No AC in DFW heat = emergency. Do not wait for a callback.' },
  { icon: '⭐', title: 'Replacement: SEER2 Minimum', body: 'Texas requires SEER2 15 minimum since 2023. Higher SEER2 = lower bills. Ask for SEER2 18+ in DFW for best ROI.' },
];

export default function DFWHVACSummaryGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = situations.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>DFW HVAC Complete Summary 2026</h1>
          <p style={{ color: '#8A9BB5', fontSize: 15 }}>Everything about DFW HVAC in one page — what to do, when, and who to call</p>
        </div>

        <div style={{ marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>The 5 HVAC Rules Every DFW Homeowner Must Know</h2>
          {summaryFacts.map((item, i) => (
            <div key={i} style={{ background: '#111D35', border: '1px solid #1E3A5F', borderRadius: 12, padding: 20, marginBottom: 12, display: 'flex', gap: 16 }}>
              <span style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ color: '#E8F0FF', fontWeight: 600, marginBottom: 6 }}>{item.title}</div>
                <div style={{ color: '#8A9BB5', fontSize: 14, lineHeight: 1.6 }}>{item.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>My Situation → What To Do Now</h2>
          <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
                style={{ background: selected === s.id ? '#F5E642' : '#111D35', color: selected === s.id ? '#0A1628' : '#E8F0FF', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 18px', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {s.label}
              </button>
            ))}
          </div>
          {active && (
            <div style={{ background: '#111D35', border: '1px solid #F5E642', borderRadius: 12, padding: 24 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>{active.label} — Action Guide</div>
              {active.actions.map((action, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span style={{ color: '#E8F0FF', fontSize: 14 }}>{action}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40, padding: 24, background: '#111D35', borderRadius: 12, border: '1px solid #1E3A5F' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Need an HVAC pro today?</div>
          <div style={{ color: '#8A9BB5', fontSize: 14 }}>ProLnk Charter HVAC pros — licensed, reviewed, and responsive in under 15 minutes</div>
        </div>
      </div>
    </div>
  );
}