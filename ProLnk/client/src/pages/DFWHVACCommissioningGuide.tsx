import { useState } from 'react';

const stages: Record<string, { title: string; items: { check: string; spec: string; dfwNote: string }[] }> = {
  preStart: {
    title: 'Before First Start-Up',
    items: [
      { check: 'Verify refrigerant line insulation', spec: 'All line sets fully insulated, no gaps', dfwNote: 'DFW attic temps hit 140°F — exposed suction lines cause massive efficiency loss' },
      { check: 'Confirm unit sizing matches Manual J load calc', spec: 'Within 15% of calculated load', dfwNote: 'Oversizing is the #1 DFW HVAC mistake — causes short-cycling and humidity problems' },
      { check: 'Check all duct connections sealed', spec: 'No visible gaps at takeoffs or boots', dfwNote: 'DFW attic duct leakage can waste 20-30% of conditioned air before it reaches rooms' },
      { check: 'Verify thermostat wiring and staging', spec: 'All stages functional, O/B wire correct for heat pump', dfwNote: 'Critical for DFW heat pumps — O/B reversal causes heating in cooling mode' },
    ],
  },
  airflow: {
    title: 'Airflow Measurement & Balancing',
    items: [
      { check: 'Total External Static Pressure (TESP)', spec: '≤ 0.5" WC for most residential systems', dfwNote: 'DFW systems routinely run at 0.7–1.0" WC due to restrictive filters and duct design — kills equipment life' },
      { check: 'Measure airflow at each supply register', spec: 'Within 10% of design CFM per register', dfwNote: 'Use a flow hood — visual checks miss significant imbalances in DFW multi-story homes' },
      { check: 'Return air adequacy', spec: '≥ 400 CFM per ton at design static', dfwNote: 'Undersized returns are epidemic in DFW homes — causes pressure imbalances and comfort complaints' },
      { check: 'Verify system total CFM', spec: '350–450 CFM per ton (400 CFM/ton target)', dfwNote: 'Low airflow in DFW summer causes coil freeze-up despite 95°F+ outdoor temps' },
    ],
  },
  refrigerant: {
    title: 'Refrigerant Charge Verification',
    items: [
      { check: 'Delta T (supply-to-return temperature split)', spec: '15–21°F split at design conditions', dfwNote: 'Check Delta T on a day above 85°F for accurate DFW reading — cold days give false high Delta T' },
      { check: 'Suction pressure / superheat', spec: 'Per manufacturer spec — typically 8–15°F superheat (TXV) or 10–20°F (fixed orifice)', dfwNote: 'DFW high outdoor temps affect subcooling readings — always verify at outdoor design conditions' },
      { check: 'Subcooling', spec: '10–15°F subcooling for TXV systems', dfwNote: 'Undercharge is common after DFW refrigerant regulations changes — verify with electronic gauge set' },
      { check: 'Record all refrigerant data on commissioning sheet', spec: 'Documented before customer signoff', dfwNote: 'Keep a copy — required for warranty claims and useful for diagnosing future DFW service calls' },
    ],
  },
  final: {
    title: 'Final Inspection & Documentation',
    items: [
      { check: 'Verify all electrical connections torqued', spec: 'Per manufacturer specs, no loose lugs', dfwNote: 'DFW heat causes thermal expansion — loose connections are a fire risk and common callback cause' },
      { check: 'Condensate drain test', spec: 'Water flows freely, no backup, float switch tested', dfwNote: 'DFW summers produce massive condensate — blocked drains cause ceiling damage monthly' },
      { check: 'System cycling under load', spec: 'Minimum 10-minute runtime at design conditions', dfwNote: 'Short cycling in DFW summer means undersized or improperly charged system — don\’t sign off' },
      { check: 'Homeowner walkthrough complete', spec: 'Filter location, thermostat operation, drain pan location explained', dfwNote: 'DFW homeowners need to know condensate drain access — show them before you leave' },
    ],
  },
};

export default function DFWHVACCommissioningGuide() {
  const [activeStage, setActiveStage] = useState<string | null>(null);

  const stageKeys = Object.keys(stages);
  const stageLabels: Record<string, string> = {
    preStart: '🔧 Pre Start-Up',
    airflow: '💨 Airflow',
    refrigerant: '❄️ Refrigerant',
    final: '✅ Final',
  };

  const activeData = activeStage ? stages[activeStage] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642' }}>🔧 DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          HVAC Commissioning Guide for DFW
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.7 }}>
          Proper commissioning is the difference between an HVAC system that performs for 20 years and one that
          fails in 5. For DFW's extreme summer loads, these checks are non-negotiable before you write the final check.
        </p>

        <div style={{ background: '#1a2f55', borderRadius: '10px', padding: '1rem', marginBottom: '2rem', border: '1px solid #2a4080' }}>
          <div style={{ fontWeight: 700, marginBottom: '0.4rem', color: '#F5E642' }}>📋 4 Commissioning Stages</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Select an installation stage below to see the full DFW-specific commissioning checklist and specifications
            for each verification step. Don't release final payment until all items are confirmed.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
          {stageKeys.map(key => (
            <button key={key} onClick={() => setActiveStage(activeStage === key ? null : key)}
              style={{ background: activeStage === key ? '#F5E642' : '#0f1f3d', color: activeStage === key ? '#0A1628' : '#fff',
                padding: '1rem', borderRadius: '10px', border: '1px solid #2a4080', cursor: 'pointer',
                fontWeight: activeStage === key ? 700 : 600, textAlign: 'left', fontSize: '0.95rem' }}>
              {stageLabels[key]}<br />
              <span style={{ fontWeight: 400, fontSize: '0.8rem', opacity: 0.8 }}>{stages[key].items.length} checks</span>
            </button>
          ))}
        </div>

        {activeData && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.2rem' }}>
              {stageLabels[activeStage!]}: {activeData.title}
            </h2>
            {activeData.items.map((item, i) => (
              <div key={i} style={{ background: '#0f1f3d', borderRadius: '10px', padding: '1.2rem', marginBottom: '0.75rem', borderLeft: '3px solid #F5E642' }}>
                <div style={{ fontWeight: 700, marginBottom: '0.4rem' }}>☐ {item.check}</div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                  <span style={{ background: '#1a2f55', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', color: '#F5E642', whiteSpace: 'nowrap' }}>SPEC</span>
                  <span style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>{item.spec}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <span style={{ background: '#1a2f55', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>DFW</span>
                  <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{item.dfwNote}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>💰 Before You Sign Off in DFW</h2>
        {[
          { icon: '📄', tip: 'Request written commissioning report with actual measured values — not just "checked OK"' },
          { icon: '🌡️', tip: 'TESP reading must be documented — if contractor refuses, that\’s a red flag' },
          { icon: '❄️', tip: 'Delta T and refrigerant charge must be measured at outdoor temps above 85°F for DFW accuracy' },
          { icon: '💧', tip: 'Test condensate drain with water before contractor leaves — not optional in DFW summer' },
          { icon: '🔁', tip: 'Watch system cycle at least once — minimum 10 minutes runtime confirms sizing is correct' },
        ].map(item => (
          <div key={item.tip} style={{ background: '#0f1f3d', borderRadius: '10px', padding: '1rem', marginBottom: '0.6rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
            <span style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.tip}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
