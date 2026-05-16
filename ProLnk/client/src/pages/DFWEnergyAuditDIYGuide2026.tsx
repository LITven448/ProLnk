import { useState } from 'react';

export default function DFWEnergyAuditDIYGuide2026() {
  const [selectedFeature, setSelectedFeature] = useState('hvac');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const auditAreas = {
    hvac: {
      label: '🌬️ HVAC System',
      items: [
        { id: 'filter', task: 'Check air filter', detail: 'Hold filter to light — should see through it. Replace if gray/black. DFW: replace every 30-60 days in summer.' },
        { id: 'coils', task: 'Inspect outdoor coil', detail: 'Fins should be straight and clean. Bent fins reduce efficiency 15%. Dirty coils add 10-30% to bill.' },
        { id: 'thermostat', task: 'Test thermostat calibration', detail: 'Place thermometer next to thermostat. Should read within 2°F of setpoint at steady state.' },
        { id: 'vents', task: 'Check supply/return vents', detail: 'Hold tissue near registers — weak flow = duct leak or dirty filter. All vents should be open and unblocked.' },
        { id: 'age', task: 'Note HVAC age (check nameplate)', detail: 'Unit over 12 years in DFW = declining efficiency. 15+ years = replacement territory. Note R-22 vs R-410A refrigerant.' },
      ]
    },
    envelope: {
      label: '🏠 Building Envelope',
      items: [
        { id: 'doors', task: 'Check exterior door weatherstripping', detail: 'Close door on paper — should feel resistance when pulled. Gaps = $5-15 in weatherstrip strips to fix.' },
        { id: 'windows', task: 'Feel windows in summer heat', detail: 'Double-pane should feel neutral. If warm to touch, seal has failed — argon gas gone, efficiency down 30%.' },
        { id: 'attic_hatch', task: 'Inspect attic hatch insulation', detail: 'Pull-down stairs are major air leaks. Should have insulated cover. Add foam board + weatherstrip = $50, saves $150+/yr.' },
        { id: 'perimeter', task: 'Walk perimeter feeling for drafts', detail: 'On windy day, feel around outlets, switches, pipe penetrations. Foam gaskets and caulk fix most issues under $20.' },
      ]
    },
    attic: {
      label: '🏚️ Attic Insulation',
      items: [
        { id: 'depth', task: 'Measure insulation depth', detail: 'DFW requires R-38 minimum = ~12 inches fiberglass or 10 inches blown cellulose. Less = adding insulation pays off fast.' },
        { id: 'bypasses', task: 'Look for attic bypasses', detail: 'Holes around wires, pipes, top plates let conditioned air escape. Seal with foam before adding insulation.' },
        { id: 'radiant', task: 'Check for radiant barrier', detail: 'Foil under rafters blocks radiant heat — DFW attics hit 150°F. If absent, DIY install saves 10-15% on cooling.' },
        { id: 'vents_attic', task: 'Verify attic ventilation', detail: 'Ridge vent + soffit vents = balanced. Blocked soffits trap heat. Clear debris and ensure 1 sq ft vent per 300 sq ft attic.' },
      ]
    },
    safety: {
      label: '🔒 Safety Systems',
      items: [
        { id: 'smoke', task: 'Test smoke detectors', detail: 'Press test button — should beep. Replace batteries annually (daylight saving time). Units over 10 years old — replace unit.' },
        { id: 'co', task: 'Test CO detectors', detail: 'Required within 10 feet of sleeping areas in TX. Test monthly, replace every 5-7 years. Low CO alarm = HVAC issue.' },
        { id: 'gfci', task: 'Test GFCI outlets', detail: 'Press Test button — outlet should go dead. Press Reset to restore. Required in bathrooms, kitchen, garage, exterior.' },
        { id: 'water_heater', task: 'Check water heater', detail: 'Look for rust, corrosion, or moisture at base. Pressure relief valve should not drip. Tank over 10 years = plan replacement.' },
      ]
    },
  };

  type AreaKey = keyof typeof auditAreas;
  const currentArea = auditAreas[selectedFeature as AreaKey];
  const allItems = Object.values(auditAreas).flatMap(a => a.items);
  const checkedCount = allItems.filter(i => checkedItems[i.id]).length;
  const totalCount = allItems.length;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🔍</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0' }}>DFW DIY Energy Audit Guide 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: '1.1rem' }}>Audit your DFW home yourself — 4 areas, 17 checks, takes 90 minutes</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[['90 min', 'Time to Complete'], ['$0-50', 'Cost of Audit'], ['$200-800/yr', 'Typical Savings Found']].map(([val, label]) => (
            <div key={label} style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: '1.5rem', textAlign: 'center', border: '1px solid #2A3F5F' }}>
              <div style={{ color: '#F5E642', fontSize: '1.5rem', fontWeight: 700 }}>{val}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem', border: '1px solid #2A3F5F' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ color: '#F5E642', margin: 0 }}>📋 Audit Checklist</h2>
            <div style={{ color: '#94A3B8', fontSize: '0.9rem' }}>{checkedCount}/{totalCount} complete</div>
          </div>

          <div style={{ width: '100%', backgroundColor: '#0A1628', borderRadius: 4, height: 8, marginBottom: '1.5rem' }}>
            <div style={{ width: `${(checkedCount / totalCount) * 100}%`, backgroundColor: '#F5E642', height: 8, borderRadius: 4, transition: 'width 0.3s' }} />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {Object.entries(auditAreas).map(([key, area]) => (
              <button key={key} onClick={() => setSelectedFeature(key)}
                style={{ padding: '0.5rem 1rem', borderRadius: 8, border: 'none', cursor: 'pointer', backgroundColor: selectedFeature === key ? '#F5E642' : '#0A1628', color: selectedFeature === key ? '#0A1628' : '#E8EDF5', fontWeight: selectedFeature === key ? 700 : 400, fontSize: '0.9rem' }}>
                {area.label}
              </button>
            ))}
          </div>

          {currentArea.items.map(({ id, task, detail }) => (
            <div key={id} onClick={() => toggleItem(id)}
              style={{ display: 'flex', gap: '1rem', padding: '1rem', backgroundColor: '#0A1628', borderRadius: 8, marginBottom: '0.75rem', cursor: 'pointer', borderLeft: `3px solid ${checkedItems[id] ? '#00CC66' : '#2A3F5F'}` }}>
              <div style={{ fontSize: '1.2rem', flexShrink: 0 }}>{checkedItems[id] ? '✅' : '⬜'}</div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 4, textDecoration: checkedItems[id] ? 'line-through' : 'none', color: checkedItems[id] ? '#94A3B8' : '#E8EDF5' }}>{task}</div>
                <div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>{detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem', border: '1px solid #2A3F5F' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>📊 Review 12-Month Electric Bills</h2>
          {[['Look for anomalies', 'A spike in a non-summer month often indicates a failing HVAC component or water heater issue.'],
            ['Compare year-over-year', 'Same month last year vs this year — increase without new appliances = efficiency decline.'],
            ['Calculate cost per sq ft', 'Divide total annual electric by sq footage. DFW avg: $1.30-1.80/sq ft/yr. Over $2.00 = investigate.'],
          ].map(([step, detail]) => (
            <div key={step} style={{ padding: '0.75rem 0', borderBottom: '1px solid #2A3F5F' }}>
              <div style={{ fontWeight: 600, marginBottom: 2 }}>📈 {step}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>{detail}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: '#1E2D45', borderRadius: 12, border: '1px solid #F5E642' }}>
          <div style={{ fontSize: '1.5rem' }}>🔧</div>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>Found Issues? Get Pro Quotes</div>
          <div style={{ color: '#94A3B8', fontSize: '0.9rem' }}>ProLnk connects DFW homeowners with verified contractors for any home service — free estimates</div>
        </div>
      </div>
    </div>
  );
}
