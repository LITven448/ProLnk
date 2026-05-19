import { useState } from 'react';

const vintageOptions = ['Pre-1920', '1920s', '1930s', '1940s', '1950s+'];
const goalOptions = ['Preservation', 'Modern Comfort', 'Energy Efficiency', 'Full Renovation'];

const recommendations: Record<string, Record<string, { project: string; priority: string; cost: string }[]>> = {
  'Pre-1920': {
    'Preservation': [
      { project: 'Knob-and-tube wiring assessment + partial replacement', priority: '🔴 Urgent', cost: '$4,000–$12,000′ },
      { project: 'Lead paint testing + encapsulation', priority: '🔴 Urgent', cost: '$800–$3,500′ },
      { project: 'Cast iron drain inspection + spot repairs', priority: '🟡 High', cost: '$1,200–$4,000′ },
      { project: 'Roof inspection (original slate/wood shake)', priority: '🟡 High', cost: '$500–$1,500 inspect' },
      { project: 'Restore original hardwood floors', priority: '🟢 Standard', cost: '$3–$8/sq ft' },
    ],
    'Modern Comfort': [
      { project: 'Full electrical panel + wiring upgrade', priority: '🔴 Urgent', cost: '$8,000–$20,000′ },
      { project: 'Mini-split AC system (preserve walls)', priority: '🔴 Urgent', cost: '$6,000–$14,000′ },
      { project: 'Cast iron pipe full replacement', priority: '🟡 High', cost: '$8,000–$18,000′ },
      { project: 'Attic insulation upgrade', priority: '🟡 High', cost: '$2,500–$5,000′ },
      { project: 'Window replacement (historic-appropriate)', priority: '🟢 Standard', cost: '$400–$900/window' },
    ],
    'Energy Efficiency': [
      { project: 'Air sealing + insulation (walls + attic)', priority: '🔴 Urgent', cost: '$5,000–$12,000′ },
      { project: 'Replace knob-and-tube before insulating', priority: '🔴 Urgent', cost: '$8,000–$18,000′ },
      { project: 'Mini-split heat pump system', priority: '🟡 High', cost: '$6,000–$14,000′ },
      { project: 'Low-E window upgrades', priority: '🟡 High', cost: '$400–$900/window' },
      { project: 'Smart thermostat + energy audit', priority: '🟢 Standard', cost: '$300–$600′ },
    ],
    'Full Renovation': [
      { project: 'Electrical full replacement (100A min → 200A)', priority: '🔴 Urgent', cost: '$12,000–$25,000′ },
      { project: 'All plumbing replacement (cast iron + galvanized)', priority: '🔴 Urgent', cost: '$15,000–$35,000′ },
      { project: 'HVAC system (new ductwork in historic home)', priority: '🔴 Urgent', cost: '$10,000–$22,000′ },
      { project: 'Structural review + foundation pier repair', priority: '🟡 High', cost: '$5,000–$20,000′ },
      { project: 'Restore + refinish original hardwoods', priority: '🟢 Standard', cost: '$3–$8/sq ft' },
    ],
  },
  '1920s': {
    'Preservation': [
      { project: 'Knob-and-tube wiring assessment', priority: '🔴 Urgent', cost: '$3,500–$10,000′ },
      { project: 'Cast iron drain scoping + repair', priority: '🟡 High', cost: '$1,000–$3,500′ },
      { project: 'Foundation crack monitoring + piers if needed', priority: '🟡 High', cost: '$3,000–$15,000′ },
      { project: 'Restore original hardwood floors', priority: '🟢 Standard', cost: '$3–$8/sq ft' },
      { project: 'Chimney inspection + repointing', priority: '🟢 Standard', cost: '$800–$2,500′ },
    ],
    'Modern Comfort': [
      { project: 'Electrical panel upgrade to 200A', priority: '🔴 Urgent', cost: '$4,000–$9,000′ },
      { project: 'Central HVAC with new ductwork', priority: '🔴 Urgent', cost: '$8,000–$18,000′ },
      { project: 'Plumbing: replace galvanized supply lines', priority: '🟡 High', cost: '$4,000–$10,000′ },
      { project: 'Attic insulation (blown-in)', priority: '🟡 High', cost: '$2,000–$4,500′ },
      { project: 'Kitchen + bath modernization', priority: '🟢 Standard', cost: '$15,000–$40,000′ },
    ],
    'Energy Efficiency': [
      { project: 'Air seal attic + add insulation', priority: '🟡 High', cost: '$2,500–$5,500′ },
      { project: 'Replace single-pane windows', priority: '🟡 High', cost: '$400–$900/window' },
      { project: 'High-efficiency HVAC upgrade', priority: '🟡 High', cost: '$7,000–$16,000′ },
      { project: 'Smart thermostat + programmable controls', priority: '🟢 Standard', cost: '$300–$600′ },
      { project: 'Energy audit + blower door test', priority: '🟢 Standard', cost: '$300–$500′ },
    ],
    'Full Renovation': [
      { project: 'Full electrical rewire', priority: '🔴 Urgent', cost: '$10,000–$22,000′ },
      { project: 'Full plumbing replacement', priority: '🔴 Urgent', cost: '$12,000–$28,000′ },
      { project: 'Full HVAC with new ductwork', priority: '🔴 Urgent', cost: '$9,000–$20,000′ },
      { project: 'Foundation assessment + remediation', priority: '🟡 High', cost: '$5,000–$20,000′ },
      { project: 'Kitchen + bath gut renovation', priority: '🟢 Standard', cost: '$25,000–$75,000′ },
    ],
  },
  '1930s': {
    'Preservation': [
      { project: 'Cast iron drain inspection', priority: '🟡 High', cost: '$900–$3,000′ },
      { project: 'Foundation pier inspection', priority: '🟡 High', cost: '$3,000–$12,000′ },
      { project: 'Hardwood floor refinishing', priority: '🟢 Standard', cost: '$3–$7/sq ft' },
      { project: 'Electrical panel assessment', priority: '🟢 Standard', cost: '$300–$600′ },
      { project: 'Chimney repointing + cap', priority: '🟢 Standard', cost: '$700–$2,000′ },
    ],
    'Modern Comfort': [
      { project: 'HVAC system upgrade', priority: '🔴 Urgent', cost: '$7,000–$16,000′ },
      { project: 'Panel upgrade to 200A', priority: '🟡 High', cost: '$3,500–$8,000′ },
      { project: 'Plumbing upgrade (galvanized to copper/PEX)', priority: '🟡 High', cost: '$5,000–$12,000′ },
      { project: 'Attic insulation', priority: '🟡 High', cost: '$2,000–$4,000′ },
      { project: 'Window replacement', priority: '🟢 Standard', cost: '$400–$900/window' },
    ],
    'Energy Efficiency': [
      { project: 'Air sealing + insulation', priority: '🟡 High', cost: '$2,500–$5,500′ },
      { project: 'High-efficiency HVAC', priority: '🟡 High', cost: '$7,000–$16,000′ },
      { project: 'Low-E window replacements', priority: '🟡 High', cost: '$400–$900/window' },
      { project: 'Smart thermostat', priority: '🟢 Standard', cost: '$250–$500′ },
      { project: 'Tankless water heater', priority: '🟢 Standard', cost: '$1,800–$3,500′ },
    ],
    'Full Renovation': [
      { project: 'Full electrical rewire', priority: '🔴 Urgent', cost: '$9,000–$20,000′ },
      { project: 'Plumbing replacement', priority: '🔴 Urgent', cost: '$10,000–$25,000′ },
      { project: 'Full HVAC', priority: '🔴 Urgent', cost: '$8,000–$18,000′ },
      { project: 'Foundation work', priority: '🟡 High', cost: '$4,000–$18,000′ },
      { project: 'Kitchen + bath renovation', priority: '🟢 Standard', cost: '$20,000–$65,000′ },
    ],
  },
  '1940s': {
    'Preservation': [
      { project: 'Cast iron drain camera inspection', priority: '🟡 High', cost: '$800–$2,500′ },
      { project: 'Foundation crack assessment', priority: '🟡 High', cost: '$2,500–$10,000′ },
      { project: 'Hardwood floor refinishing', priority: '🟢 Standard', cost: '$3–$7/sq ft' },
      { project: 'Electrical safety inspection', priority: '🟢 Standard', cost: '$250–$500′ },
      { project: 'Roof inspection + spot repair', priority: '🟢 Standard', cost: '$400–$1,200′ },
    ],
    'Modern Comfort': [
      { project: 'HVAC replacement', priority: '🔴 Urgent', cost: '$6,500–$14,000′ },
      { project: 'Panel upgrade', priority: '🟡 High', cost: '$3,000–$7,500′ },
      { project: 'Plumbing modernization', priority: '🟡 High', cost: '$4,000–$10,000′ },
      { project: 'Insulation upgrade', priority: '🟡 High', cost: '$2,000–$4,000′ },
      { project: 'Bath modernization', priority: '🟢 Standard', cost: '$8,000–$25,000′ },
    ],
    'Energy Efficiency': [
      { project: 'Air sealing + blown-in insulation', priority: '🟡 High', cost: '$2,000–$5,000′ },
      { project: 'High-SEER HVAC', priority: '🟡 High', cost: '$6,500–$14,000′ },
      { project: 'Window film or replacement', priority: '🟢 Standard', cost: '$150–$900/window' },
      { project: 'LED lighting conversion', priority: '🟢 Standard', cost: '$500–$1,500′ },
      { project: 'Smart thermostat', priority: '🟢 Standard', cost: '$250–$500′ },
    ],
    'Full Renovation': [
      { project: 'Full electrical rewire', priority: '🔴 Urgent', cost: '$8,000–$18,000′ },
      { project: 'Full plumbing replacement', priority: '🔴 Urgent', cost: '$9,000–$22,000′ },
      { project: 'HVAC full replacement', priority: '🔴 Urgent', cost: '$7,000–$16,000′ },
      { project: 'Foundation + structural review', priority: '🟡 High', cost: '$3,500–$16,000′ },
      { project: 'Full kitchen + bath renovation', priority: '🟢 Standard', cost: '$20,000–$60,000′ },
    ],
  },
  '1950s+': {
    'Preservation': [
      { project: 'Roof inspection + repair', priority: '🟡 High', cost: '$400–$1,200′ },
      { project: 'Foundation check', priority: '🟡 High', cost: '$2,000–$8,000′ },
      { project: 'Electrical panel check', priority: '🟢 Standard', cost: '$200–$450′ },
      { project: 'Hardwood refinish (if original)', priority: '🟢 Standard', cost: '$2.50–$6/sq ft' },
      { project: 'Weatherstripping + caulk', priority: '🟢 Standard', cost: '$300–$800′ },
    ],
    'Modern Comfort': [
      { project: 'HVAC upgrade', priority: '🟡 High', cost: '$5,500–$12,000′ },
      { project: 'Panel upgrade if under 150A', priority: '🟡 High', cost: '$2,500–$6,500′ },
      { project: 'Insulation upgrade', priority: '🟡 High', cost: '$1,800–$4,000′ },
      { project: 'Kitchen modernization', priority: '🟢 Standard', cost: '$12,000–$35,000′ },
      { project: 'Bath remodel', priority: '🟢 Standard', cost: '$6,000–$20,000′ },
    ],
    'Energy Efficiency': [
      { project: 'High-efficiency HVAC', priority: '🟡 High', cost: '$5,500–$12,000′ },
      { project: 'Attic insulation + air seal', priority: '🟡 High', cost: '$1,800–$4,000′ },
      { project: 'Window upgrade (if original)', priority: '🟢 Standard', cost: '$350–$800/window' },
      { project: 'Smart thermostat', priority: '🟢 Standard', cost: '$250–$500′ },
      { project: 'Tankless water heater', priority: '🟢 Standard', cost: '$1,500–$3,000′ },
    ],
    'Full Renovation': [
      { project: 'HVAC full replacement', priority: '🔴 Urgent', cost: '$6,000–$13,000′ },
      { project: 'Plumbing modernization', priority: '🟡 High', cost: '$7,000–$18,000′ },
      { project: 'Electrical panel + partial rewire', priority: '🟡 High', cost: '$5,000–$12,000′ },
      { project: 'Kitchen gut renovation', priority: '🟢 Standard', cost: '$18,000–$55,000′ },
      { project: 'Full bath renovations', priority: '🟢 Standard', cost: '$10,000–$30,000′ },
    ],
  },
};

export default function DFWLakewoodGuide() {
  const [vintage, setVintage] = useState('');
  const [goal, setGoal] = useState('');

  const results = vintage && goal ? recommendations[vintage]?.[goal] ?? [] : [];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2 }}>🏘️ DALLAS NEIGHBORHOOD GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Lakewood Dallas</h1>
        <h2 style={{ fontSize: 20, fontWeight: 400, color: '#a0b0c8', marginBottom: 24 }}>Historic Neighborhood Home Guide</h2>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 28, borderLeft: '4px solid #F5E642′ }}>
          <p style={{ margin: 0, lineHeight: 1.7, color: '#c8d8e8′ }}>
            Lakewood homes sit between White Rock Lake and East Dallas, built mostly from <strong style={{ color: '#F5E642′ }}>1920–1945</strong>. They feature original hardwood floors, craftsman details, and charming bungalows — but also carry significant infrastructure risk: <strong>knob-and-tube wiring</strong>, <strong>cast iron drain pipes</strong>, <strong>no original AC systems</strong>, and decades of foundation movement. Balancing preservation with modern safety is Lakewood’s defining challenge.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 8, color: '#F5E642', fontWeight: 600, fontSize: 14 }}>📅 Home Vintage</label>
            <select value={vintage} onChange={e => setVintage(e.target.value)} style={{ width: '100%', backgroundColor: '#0f2040', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}>
              <option value="">Select era…</option>
              {vintageOptions.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 8, color: '#F5E642', fontWeight: 600, fontSize: 14 }}>🎯 Renovation Goal</label>
            <select value={goal} onChange={e => setGoal(e.target.value)} style={{ width: '100%', backgroundColor: '#0f2040', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}>
              <option value="">Select goal…</option>
              {goalOptions.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>

        {results.length > 0 && (
          <div>
            <h3 style={{ color: '#F5E642', marginBottom: 16, fontSize: 18 }}>Priority Projects for Your Home</h3>
            {results.map((r, i) => (
              <div key={i} style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: '14px 18px', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{r.project}</div>
                  <div style={{ fontSize: 13, color: '#a0b0c8′ }}>{r.priority}</div>
                </div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, whiteSpace: 'nowrap' }}>{r.cost}</div>
              </div>
            ))}
            <div style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: 16, marginTop: 8, fontSize: 13, color: '#a0b0c8′ }}>
              💡 Costs are DFW market estimates. Lakewood historic work may cost 10–20% more due to preservation requirements and older access challenges.
            </div>
          </div>
        )}

        {!vintage && !goal && (
          <div style={{ textAlign: 'center', padding: 40, color: '#4a6a8a' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🏡</div>
            <div style={{ fontSize: 16 }}>Select your home's vintage and renovation goal to get your priority project list.</div>
          </div>
        )}

        <div style={{ marginTop: 36, padding: 20, backgroundColor: '#0f2040', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Get Lakewood-Experienced Contractors</div>
          <div style={{ color: '#a0b0c8', fontSize: 14, marginBottom: 16 }}>ProLnk matches you with pros who know historic Dallas neighborhoods — no guessing, no generic quotes.</div>
          <div style={{ display: 'inline-block', backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Get My Matches →</div>
        </div>
      </div>
    </div>
  );
}
