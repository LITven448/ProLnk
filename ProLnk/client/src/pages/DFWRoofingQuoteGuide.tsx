import { useState } from 'react';

const roofSizes = [
  { label: 'Under 1,800 sq ft (18 squares)', squares: '18', estReplace: '$9,000–$16,000', estRepair: '$500–$2,500' },
  { label: '1,800–2,500 sq ft (25 squares)', squares: '25', estReplace: '$13,000–$22,000', estRepair: '$800–$4,000' },
  { label: '2,500–3,500 sq ft (35 squares)', squares: '35', estReplace: '$18,000–$30,000', estRepair: '$1,200–$6,000' },
  { label: 'Over 3,500 sq ft (35+ squares)', squares: '35+', estReplace: '$25,000–$45,000+', estRepair: '$1,500–$8,000' },
];

const replacementTypes = [
  {
    type: 'Full Replacement (standard)',
    checklist: ['Shingle manufacturer + model + warranty class (Class 4 hail-resistant)', 'Underlayment spec: synthetic vs 30lb felt', 'Drip edge included (required by DFW code)', 'Valley method: open or closed cut — specify', 'Ventilation plan: ridge vent + soffit vent ratio', 'Decking inspection — replacement cost per sheet if damaged', 'Permit + city inspection (required in all DFW municipalities)', 'Tear-off layers included (most DFW cities allow max 2 layers)', 'Dumpster placement + haul-away included'],
    redFlags: ['No shingle model — just "30-year shingle"', 'No drip edge line item', 'No mention of ventilation', 'Homeowner pulls permit'],
  },
  {
    type: 'Insurance Claim Replacement',
    checklist: ['Adjuster scope vs contractor scope reconciliation — ask for both', 'Supplement process: who handles code upgrades not in adjuster scope?', 'Depreciation recovery: contractor recovers recoverable depreciation?', 'Shingle match to existing if partial — document in writing', 'ACV vs RCV policy: contractor understands your policy type?', 'All above items from Full Replacement'],
    redFlags: ['Contractor won\’t show you the adjuster scope', 'No supplement experience', 'Storm chaser from out of state', 'Demanding signature before adjuster visits'],
  },
];

export default function DFWRoofingQuoteGuide() {
  const [roofSize, setRoofSize] = useState('');
  const [replType, setReplType] = useState('');

  const selectedSize = roofSizes.find(r => r.label === roofSize);
  const selectedType = replacementTypes.find(r => r.type === replType);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8ECF0', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 1 }}>
          🏠 DFW ROOFING GUIDE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>
          Roofing Quote Comparison Guide for DFW
        </h1>
        <p style={{ color: '#9BA8B8', fontSize: 16, marginBottom: 36 }}>
          DFW has the highest hail activity in Texas. Know exactly what your roofing quote must include before signing anything.
        </p>

        <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🔑 What Every DFW Roofing Quote Must Specify</h2>
        <ul style={{ color: '#9BA8B8', fontSize: 15, lineHeight: 1.8, marginBottom: 32, paddingLeft: 20 }}>
          <li><strong style={{ color: '#E8ECF0' }}>Shingle manufacturer + model + class</strong> — "Class 4 impact-resistant" reduces DFW insurance premiums. Demand the exact model.</li>
          <li><strong style={{ color: '#E8ECF0' }}>Underlayment specification</strong> — synthetic vs. 30lb felt. Synthetic is standard for DFW. Cost difference is minimal; quality difference is major.</li>
          <li><strong style={{ color: '#E8ECF0' }}>Drip edge</strong> — required by IRC code and all DFW city inspections. If not listed, they're cutting corners.</li>
          <li><strong style={{ color: '#E8ECF0' }}>Ventilation plan</strong> — DFW summers destroy roofs without proper ridge + soffit ventilation ratio. Should be in every quote.</li>
          <li><strong style={{ color: '#E8ECF0' }}>Permit pulled by contractor</strong> — all DFW cities require a permit. Homeowner permits create future title and insurance issues.</li>
          <li><strong style={{ color: '#E8ECF0' }}>Decking replacement cost</strong> — listed as a per-sheet line item, not buried or absent.</li>
        </ul>

        <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🚩 Storm Chaser Red Flags (DFW-Specific)</h2>
        <ul style={{ color: '#9BA8B8', fontSize: 15, lineHeight: 1.8, marginBottom: 32, paddingLeft: 20 }}>
          <li>Shows up the day after hail — unsolicited, door-to-door</li>
          <li>Asks you to sign before your adjuster visits</li>
          <li>Offers to waive your deductible — illegal in Texas</li>
          <li>Out-of-state plates or no local business address</li>
          <li>No Texas roofing contractor license verification available</li>
          <li>Quote expires in 24 hours ("prices going up tomorrow")</li>
        </ul>

        <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Interactive: Roof Size + Replacement Type</h2>
        <div style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <label style={{ fontSize: 12, color: '#9BA8B8', display: 'block', marginBottom: 6 }}>ROOF SIZE</label>
              <select value={roofSize} onChange={e => setRoofSize(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8ECF0', padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select size...</option>
                {roofSizes.map(r => <option key={r.label} value={r.label}>{r.label}</option>)}
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <label style={{ fontSize: 12, color: '#9BA8B8', display: 'block', marginBottom: 6 }}>REPLACEMENT TYPE</label>
              <select value={replType} onChange={e => setReplType(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8ECF0', padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select type...</option>
                {replacementTypes.map(r => <option key={r.type} value={r.type}>{r.type}</option>)}
              </select>
            </div>
          </div>
          {selectedSize && (
            <div style={{ marginBottom: 14, padding: 14, background: '#0A1628', borderRadius: 8, borderLeft: '3px solid #F5E642' }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{selectedSize.squares} squares (~{selectedSize.label})</div>
              <div style={{ fontSize: 13, color: '#4CAF50' }}>Full replacement DFW range: {selectedSize.estReplace}</div>
              <div style={{ fontSize: 13, color: '#9BA8B8', marginTop: 2 }}>Repair-only range: {selectedSize.estRepair}</div>
            </div>
          )}
          {selectedType && (
            <>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>QUOTE CHECKLIST — {selectedType.type.toUpperCase()}</div>
                {selectedType.checklist.map(item => (
                  <div key={item} style={{ fontSize: 13, color: '#9BA8B8', marginBottom: 4 }}>✓ {item}</div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 13, color: '#FF6B6B', fontWeight: 700, marginBottom: 8 }}>RED FLAGS FOR THIS TYPE</div>
                {selectedType.redFlags.map(flag => (
                  <div key={flag} style={{ fontSize: 13, color: '#FF8080', marginBottom: 4 }}>⚠ {flag}</div>
                ))}
              </div>
            </>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, color: '#0A1628' }}>
          <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>💡 ProLnk Tip</div>
          <div style={{ fontSize: 14 }}>ProLnk only works with licensed, insured, locally-rooted DFW roofers — no storm chasers. Class 4 shingle specialists available.</div>
        </div>
      </div>
    </div>
  );
}
