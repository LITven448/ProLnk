import { useState } from 'react';

const homeTypes = ['Single Family', 'Townhome / Condo', 'New Construction'];
const ageRanges = ['0–5 years', '6–15 years', '16–30 years', '31–50 years', '50+ years'];

const baseBring = [
  '📱 Charged phone for photos and video',
  '📓 Notepad and pen',
  '👟 Comfortable shoes (attic + crawl space)',
  '💧 Water bottle (DFW inspections run 3–4 hours)',
  '🔦 Small flashlight for dark spaces',
  '📋 This checklist',
];

const beforeItems = [
  'Schedule 3–4 hours minimum — do not rush an inspection',
  'Attend in person — never skip this step in DFW',
  'Arrange childcare so you can focus fully',
  'Get inspector’s credentials (TREC license required in Texas)',
  'Review seller’s disclosure before the inspection',
];

const watchItems: Record<string, Record<string, string[]>> = {
  'Single Family': {
    '0–5 years': ['Check for settlement cracks in new construction slab', 'Verify all appliances are working', 'Confirm HVAC filter was installed', 'Inspect roof for improper flashing at penetrations'],
    '6–15 years': ['HVAC filter and coils — mid-life service expected', 'Check water heater anode rod', 'Inspect roof for hail damage — DFW storms are frequent', 'Look for fence posts shifting (clay soil movement)'],
    '16–30 years': ['Foundation cracks — get specialist opinion if found', 'HVAC likely near end of life (15–20 yr average)', 'Check for cast iron drain lines (older homes)', 'Inspect attic insulation depth and ventilation'],
    '31–50 years': ['Polybutylene or galvanized pipes — plan for replacement', 'Knob and tube or aluminum wiring — insurance red flag', 'HVAC almost certainly needs replacement', 'Check for asbestos in floor tiles and duct insulation'],
    '50+ years': ['Full electrical panel evaluation — may need upgrade', 'Cast iron drain lines likely failing', 'Pier and beam foundation — inspect all piers', 'Check for lead paint — pre-1978 construction risk'],
  },
  'Townhome / Condo': {
    '0–5 years': ['Verify HOA common area maintenance records', 'Check shared wall soundproofing', 'Inspect balcony railings and deck waterproofing'],
    '6–15 years': ['HVAC in shared or individual unit — confirm ownership', 'Review roof reserve fund (HOA responsibility)', 'Check windows for seal failure'],
    '16–30 years': ['Review HOA special assessments history', 'Water intrusion through shared walls', 'Elevator maintenance records if applicable'],
    '31–50 years': ['Full plumbing and electrical audit', 'Roof reserve fund adequacy — is HOA saving enough?', 'Check for mold in shared HVAC systems'],
    '50+ years': ['Full structural evaluation', 'Review condo docs for major deferred maintenance', 'Water heater and plumbing — likely full replacement needed'],
  },
  'New Construction': {
    '0–5 years': ['Builder walk-through before closing — document everything', 'Check for missing insulation in walls (thermal imaging recommended)', 'Verify all punch-list items from builder were completed', 'Inspect grading — water should drain away from foundation'],
    '6–15 years': ['N/A for new construction'],
    '16–30 years': ['N/A for new construction'],
    '31–50 years': ['N/A for new construction'],
    '50+ years': ['N/A for new construction'],
  },
};

export default function DFWInspectionPrepGuide() {
  const [homeType, setHomeType] = useState('');
  const [age, setAge] = useState('');

  const watchList = homeType && age ? (watchItems[homeType]?.[age] ?? []) : [];

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', color: '#0A1628', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>DFW INSPECTION PREP GUIDE</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: 0 }}>🔍 Prepare for Your Home Inspection</h1>
          <p style={{ color: '#94a3b8', margin: '8px 0 0' }}>Know what to bring, what to watch for, and how to show up ready.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <div style={{ fontWeight: 700, marginBottom: 12 }}>🏠 Home Type</div>
            {homeTypes.map(t => (
              <button key={t} onClick={() => setHomeType(t)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px', borderRadius: 8, border: homeType === t ? '2px solid #F5E642' : '1px solid #e2e8f0', background: homeType === t ? '#0A1628' : '#F9FAFB', color: homeType === t ? '#F5E642' : '#0A1628', fontWeight: homeType === t ? 700 : 400, cursor: 'pointer', fontSize: 14, marginBottom: 6 }}>
                {t}
              </button>
            ))}
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <div style={{ fontWeight: 700, marginBottom: 12 }}>📅 Home Age</div>
            {ageRanges.map(a => (
              <button key={a} onClick={() => setAge(a)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px', borderRadius: 8, border: age === a ? '2px solid #F5E642' : '1px solid #e2e8f0', background: age === a ? '#0A1628' : '#F9FAFB', color: age === a ? '#F5E642' : '#0A1628', fontWeight: age === a ? 700 : 400, cursor: 'pointer', fontSize: 14, marginBottom: 6 }}>
                {a}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>🎒 What to Bring</div>
          {baseBring.map(item => (
            <div key={item} style={{ fontSize: 14, padding: '8px 0', borderBottom: '1px solid #f1f5f9', color: '#334155' }}>{item}</div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>✅ Before the Inspection</div>
          {beforeItems.map(item => (
            <div key={item} style={{ fontSize: 14, padding: '8px 0', borderBottom: '1px solid #f1f5f9', color: '#334155' }}>• {item}</div>
          ))}
        </div>

        {homeType && age && (
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>
              🔎 Specifically Watch For: {homeType}, {age}
            </div>
            {watchList.map(item => (
              <div key={item} style={{ fontSize: 14, padding: '8px 0', borderBottom: '1px solid #1e3a5f', color: '#e2e8f0' }}>⚠️ {item}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
