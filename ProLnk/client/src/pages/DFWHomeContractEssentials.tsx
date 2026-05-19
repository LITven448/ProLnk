import { useState } from 'react';

type ContractData = {
  essentials: string[];
  redFlags: string[];
  addBefore: string[];
};

const projectTypes: Record<string, ContractData> = {
  'Roof Replacement': {
    essentials: [
      'Exact shingle manufacturer, model, and color specified',
      'Number of squares (roofing units) to be replaced',
      'Decking replacement policy — cost per sheet if needed',
      'Permit responsibility (contractor must pull permit in DFW)',
      'Drip edge, flashing, and ice/water shield included in writing',
      'Disposal of old materials included',
      'Manufacturer warranty AND contractor workmanship warranty terms',
      'Payment schedule: draw at start, draw at material delivery, final on completion',
    ],
    redFlags: [
      'Asking for more than 1/3 upfront before materials arrive',
      'No mention of permit — illegal in most DFW municipalities',
      'Vague "comparable materials" language instead of brand/model',
      'No written warranty on workmanship',
    ],
    addBefore: [
      'Lien waiver upon final payment — prevents supplier liens on your home',
      'Specific start and completion dates with penalty clause',
      'Insurance certificate naming you as additional insured',
      'Storm damage supplement clause — contractor handles any supplement with insurer',
    ],
  },
  'HVAC Replacement': {
    essentials: [
      'Exact equipment manufacturer, model number, and SEER rating',
      'Tonnage of unit specified for your square footage',
      'Refrigerant type (R-410A or R-32 — R-22 phased out)',
      'Permit pulled by contractor (required in all DFW counties)',
      'Ductwork inspection included or excluded explicitly',
      'Thermostat model included or excluded',
      'Manufacturer warranty registration handled by contractor',
      'Extended labor warranty terms written out',
    ],
    redFlags: [
      'No model number — protects contractor to substitute cheaper unit',
      'Full payment required before installation',
      'No mention of existing ductwork assessment',
      '"We\’ll pull permit if needed" — it is always needed',
    ],
    addBefore: [
      'Load calculation (Manual J) performed and provided to you',
      'Post-installation refrigerant charge verification in writing',
      'Start-up documentation provided at completion',
      'Lien waiver upon final payment',
    ],
  },
  'Foundation Repair': {
    essentials: [
      'Exact number and type of piers (steel push piers vs concrete pilings)',
      'Depth of pier installation specified',
      'Warranty duration and exactly what is covered (movement, not cosmetic)',
      'Transferability of warranty to future buyers — critical for DFW resale',
      'Drainage or plumbing work excluded clearly (separate scope)',
      'Engineering report included or excluded explicitly',
      'Before and after elevation readings documented',
    ],
    redFlags: [
      'Warranty that\’s non-transferable — kills resale value',
      'Lifetime warranty with no company guarantee or bond',
      'No mention of engineering review',
      'Vague pier count — "approximately X piers"',
    ],
    addBefore: [
      'Transferable lifetime warranty in writing',
      'Third-party engineer sign-off included',
      'Plumbing pressure test before and after repair (DFW clay soil shifts pipes)',
      'Lien waiver and completion certificate',
    ],
  },
  'Kitchen / Bath Remodel': {
    essentials: [
      'Complete material list: cabinet manufacturer/model, countertop material/color, tile, fixtures',
      'Scope of demolition — what is and isn\’t being removed',
      'Subcontractor list — who handles plumbing, electrical, tile',
      'Permit responsibility for electrical and plumbing work',
      'Draw schedule tied to specific milestones, not calendar dates',
      'Allowances clearly defined — budget set-asides with change order process',
      'Photo documentation of completed rough-in before close-up',
    ],
    redFlags: [
      'Allowances without a defined process for overages',
      'No subcontractor disclosure — unlicensed subs are common in DFW',
      'Large initial draw with no milestone attached',
      'Verbal commitments on finishes not in the contract',
    ],
    addBefore: [
      'Change order process: all changes in writing before work proceeds',
      'Lien waiver from each subcontractor upon their payment',
      'Punch list process — written final walkthrough before last payment',
      'License numbers for all trade contractors listed in contract',
    ],
  },
  'Electrical Panel or Rewire': {
    essentials: [
      'Panel brand, amperage, and breaker count specified',
      'Permit pulled by contractor (always required in DFW)',
      'City inspection included and passed before project complete',
      'Scope of rewire — which circuits, which rooms',
      'AFCI/GFCI breaker requirements per current NEC code',
      'Reconnection of existing circuits explicitly covered',
    ],
    redFlags: [
      'Any offer to skip permit to "save money" — major liability',
      'No mention of city inspection',
      'Unlicensed electrician (Texas requires TDLR license)',
      '"We\’ll take care of inspection" without written confirmation',
    ],
    addBefore: [
      'Copy of contractor\’s TDLR electrical license in contract',
      'Inspection certificate provided at completion',
      'Lien waiver upon final payment',
      'Load calculation if adding EV charger or major appliances',
    ],
  },
};

export default function DFWHomeContractEssentials() {
  const [selected, setSelected] = useState('');
  const result = projectTypes[selected];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>📝</div>
        <h1 style={{ color: '#F5E642', fontSize: '1.75rem', marginBottom: '0.5rem' }}>DFW Home Service Contract Essentials</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          A vague contract is a contractor's protection, not yours. Every DFW home service contract must lock down scope, materials, permits, payment schedule, lien waivers, and warranty before work starts. Know what to demand before signing.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 10, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔧 Select Your Project Type</h2>
          <select
            value={selected}
            onChange={e => setSelected(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: 6, background: '#1a2f50', color: '#fff', border: '1px solid #2a4070', fontSize: '1rem' }}
          >
            <option value=''>-- Select project type --</option>
            {Object.keys(projectTypes).map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        {result && (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              { label: '✅ Contract Must Include', items: result.essentials, color: '#F5E642′ },
              { label: '🚩 Red Flags — Do Not Sign', items: result.redFlags, color: '#f87171′ },
              { label: '➕ Add Before Signing', items: result.addBefore, color: '#4ade80′ },
            ].map(section => (
              <div key={section.label} style={{ background: '#0f2040', borderRadius: 10, padding: '1.5rem' }}>
                <h2 style={{ color: section.color, fontSize: '1rem', marginBottom: '0.75rem' }}>{section.label}</h2>
                {section.items.map(item => (
                  <div key={item} style={{ color: '#cbd5e1', marginBottom: '0.4rem', lineHeight: 1.5 }}>• {item}</div>
                ))}
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 10, padding: '1.5rem', marginTop: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', marginBottom: '0.75rem' }}>🔒 Universal Rules for All DFW Contracts</h2>
          <div style={{ color: '#94a3b8', lineHeight: 1.8 }}>
            <div>• Never pay more than 1/3 upfront for any job under $50,000</div>
            <div>• Always require a lien waiver before final payment is released</div>
            <div>• Permit is always the contractor's responsibility in DFW — not optional</div>
            <div>• Get insurance certificate before work starts — general liability + workers comp</div>
          </div>
        </div>
      </div>
    </div>
  );
}
