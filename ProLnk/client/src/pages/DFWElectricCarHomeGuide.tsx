import { useState } from 'react';

const evs = ['Tesla Model 3/Y', 'Tesla Model S/X', 'Ford F-150 Lightning', 'Chevy Silverado EV', 'Rivian R1T/R1S', 'Chevy Bolt EV/EUV', 'Hyundai Ioniq 5/6', 'Kia EV6', 'BMW i4/iX', 'Mercedes EQS'];
const panels = ['100A Panel (older home)', '150A Panel', '200A Panel (standard DFW new build)', '200A Panel + Sub-panel', '400A Panel (rare, large home)'];

const evChargerNeeds: Record<string, { amps: string; kwh: string; rangeNote: string }> = {
  'Tesla Model 3/Y': { amps: '48A circuit (50A breaker)', kwh: '7.2-11.5kW', rangeNote: 'DFW summer heat reduces range ~10% — plan for 220 miles effective range on Model Y Long Range' },
  'Tesla Model S/X': { amps: '60A circuit (60A breaker)', kwh: '11.5kW', rangeNote: 'DFW heat impact minimal on S/X — larger battery absorbs climate penalty' },
  'Ford F-150 Lightning': { amps: '80A circuit (100A breaker)', kwh: '19.2kW', rangeNote: 'Lightning towing in DFW summer heat reduces range to 150-200 miles — plan accordingly' },
  'Chevy Silverado EV': { amps: '80A circuit (100A breaker)', kwh: '19.2kW', rangeNote: 'GM trucks in DFW heat: expect 15% range reduction in July-August' },
  'Rivian R1T/R1S': { amps: '48A circuit (50A breaker)', kwh: '11.5kW', rangeNote: 'Rivian thermal management is excellent — DFW heat impact is lower than most EVs' },
  'Chevy Bolt EV/EUV': { amps: '32A circuit (40A breaker)', kwh: '7.2kW', rangeNote: 'Air-cooled battery — DFW summer heat is harder on Bolt than liquid-cooled competitors' },
};

function getAssessment(ev: string, panel: string) {
  const charger = evChargerNeeds[ev] || { amps: '48A circuit (50A breaker)', kwh: '7.2-11.5kW', rangeNote: 'DFW summer heat reduces EV range 10-15% — factor into daily driving calculations.' };
  const needsUpgrade = panel.includes('100A');
  const panelOk = panel.includes('200A') || panel.includes('400A');

  const upgrades = [];
  if (needsUpgrade) upgrades.push({ item: 'Panel Upgrade 100A → 200A', cost: '$2,500-4,500', priority: 'Required' });
  if (!needsUpgrade && !panelOk) upgrades.push({ item: 'Panel assessment recommended', cost: '$150-300 (electrician eval)', priority: 'Recommended' });
  upgrades.push({ item: `Level 2 EVSE Charger (${charger.amps})`, cost: '$500-1,200 installed', priority: 'Required for home charging' });
  upgrades.push({ item: 'Dedicated 240V circuit with conduit', cost: '$400-800 from panel to garage', priority: 'Required' });
  if (ev.includes('Lightning') || ev.includes('Silverado') || ev.includes('Rivian')) {
    upgrades.push({ item: 'Sub-panel in garage (for 80A charger)', cost: '$800-1,500', priority: 'Recommended for trucks' });
  }

  const oncorNote = 'Oncor EV TOU rates: charge midnight-6am at 7¢/kWh vs 14¢/kWh peak. Annual savings: $400-800 for most DFW drivers.';
  const totalCost = needsUpgrade ? '$3,500-6,500' : '$900-2,000';

  return { charger, upgrades, oncorNote, totalCost, panelStatus: panelOk ? 'Ready' : needsUpgrade ? 'Upgrade Required' : 'Assessment Recommended' };
}

export default function DFWElectricCarHomeGuide() {
  const [ev, setEv] = useState('');
  const [panel, setPanel] = useState('');
  const [result, setResult] = useState<ReturnType<typeof getAssessment> | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>⚡🚗</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Electric Car Home Prep Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW homeowners face specific EV infrastructure needs: most 1980s-90s DFW homes have 100A panels that need upgrading,
          Oncor TOU rates reward overnight charging, and DFW summer heat reduces EV range 10-15%.
        </p>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '12px 16px', marginBottom: 32, fontWeight: 600 }}>
          ⚡ DFW Oncor TOU Tip: Sign up for Oncor's EV rate plan — charge midnight to 6am at ~50% lower cost. Saves $400-800/year.
        </div>

        <div style={{ display: 'grid', gap: 20, marginBottom: 28 }}>
          <div>
            <label style={{ color: '#F5E642', display: 'block', marginBottom: 8, fontWeight: 600 }}>EV You're Buying or Own</label>
            <select value={ev} onChange={e => setEv(e.target.value)}
              style={{ width: '100%', padding: '12px', background: '#1E2D45', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15 }}>
              <option value=''>Select EV...</option>
              {evs.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label style={{ color: '#F5E642', display: 'block', marginBottom: 8, fontWeight: 600 }}>Current Home Electrical Panel</label>
            <select value={panel} onChange={e => setPanel(e.target.value)}
              style={{ width: '100%', padding: '12px', background: '#1E2D45', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15 }}>
              <option value=''>Select panel size...</option>
              {panels.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <button onClick={() => { if (ev && panel) setResult(getAssessment(ev, panel)); }}
          style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginBottom: 32, width: '100%' }}>
          ⚡ Get My DFW Home EV Readiness Report
        </button>

        {result && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
              <div style={{ background: result.panelStatus === 'Ready' ? '#16A34A' : '#DC2626', borderRadius: 8, padding: '8px 20px', fontWeight: 700, flex: 1, textAlign: 'center' }}>
                Panel: {result.panelStatus}
              </div>
              <div style={{ background: '#1E2D45', borderRadius: 8, padding: '8px 20px', fontWeight: 700, flex: 1, textAlign: 'center' }}>
                Est. Total: {result.totalCost}
              </div>
            </div>

            <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 16 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 16 }}>Required Upgrades</h3>
              {result.upgrades.map((u, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, paddingBottom: 12, borderBottom: i < result.upgrades.length - 1 ? '1px solid #334155' : 'none' }}>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 600 }}>{u.item}</div>
                    <div style={{ color: '#94A3B8', fontSize: 13 }}>{u.priority}</div>
                  </div>
                  <div style={{ color: '#F5E642', fontWeight: 700, whiteSpace: 'nowrap', marginLeft: 16 }}>{u.cost}</div>
                </div>
              ))}
            </div>

            <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 16 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 12 }}>🌡️ DFW Range Impact</h3>
              <p style={{ color: '#CBD5E1', lineHeight: 1.6 }}>{result.charger.rangeNote}</p>
            </div>

            <div style={{ background: '#F5E64215', border: '1px solid #F5E642', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>💰 Oncor TOU Savings</div>
              <div style={{ color: '#CBD5E1', lineHeight: 1.6 }}>{result.oncorNote}</div>
            </div>
          </div>
        )}

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 16 }}>🏠 DFW EV Home Prep Checklist</h3>
          {['Get licensed electrician to assess panel before purchasing EV — avoid surprises', 'Pull city permit for all electrical work — DFW inspectors check EV charger installs', 'Install in garage not on exterior wall — DFW summer heat degrades outdoor EVSE units', 'Use hardwired charger not plug-in — safer and faster for DFW overnight charging cycles', 'Enroll in Oncor Smart Charging program for rebates + optimized rates'].map((item, i) => (
            <div key={i} style={{ color: '#CBD5E1', marginBottom: 10, paddingLeft: 16, borderLeft: '2px solid #F5E642', lineHeight: 1.5 }}>{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
