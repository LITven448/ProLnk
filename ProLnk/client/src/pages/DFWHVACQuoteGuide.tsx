import { useState } from 'react';

const homeSizes = [
  { label: 'Under 1,500 sq ft', tonRange: '2–2.5 tons', seer: 'SEER 16+ minimum for DFW climate', estRange: '$4,500–$7,500′ },
  { label: '1,500–2,500 sq ft', tonRange: '3–3.5 tons', seer: 'SEER 16–18 recommended', estRange: '$6,500–$11,000′ },
  { label: '2,500–4,000 sq ft', tonRange: '4–5 tons', seer: 'SEER 18+ for efficiency in DFW summers', estRange: '$9,000–$16,000′ },
  { label: 'Over 4,000 sq ft', tonRange: 'Dual system or 5+ tons', seer: 'SEER 18+ or variable-speed recommended', estRange: '$15,000–$28,000′ },
];

const systemTypes = [
  {
    type: 'Central AC Replacement (same system type)',
    required: ['Equipment brand + exact model number', 'SEER rating (min 15.2 per 2023 federal law)', 'Manual J load calculation — not a rule-of-thumb size', 'Labor warranty (1-year minimum, separate from equipment)', 'Equipment warranty (10-year parts if registered)', 'Permit pulled by contractor — required in all DFW municipalities', 'Disposal of old refrigerant (EPA 608 required)', 'Thermostat included or itemized separately'],
    questions: ['What is the AHRI match number for the coil and condenser?', 'Did you perform a Manual J or just use the old unit size?', 'Who pulls the permit and who calls for inspection?', 'What refrigerant does this system use — R-410A or R-454B?'],
  },
  {
    type: 'Heat Pump Installation',
    required: ['Cold climate rating (HSPF2 rating)', 'Balance point temperature specified', 'Backup heat source plan for DFW freeze events', 'Ductwork assessment included or extra', 'Two-stage or variable speed compressor spec', 'Permit + electrical panel assessment'],
    questions: ['What is the HSPF2 rating for heating efficiency?', 'What is the backup heat strategy during a hard freeze?', 'Is existing ductwork assessed for leaks before install?'],
  },
];

export default function DFWHVACQuoteGuide() {
  const [homeSize, setHomeSize] = useState('');
  const [systemType, setSystemType] = useState('');

  const selectedSize = homeSizes.find(h => h.label === homeSize);
  const selectedSystem = systemTypes.find(s => s.type === systemType);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8ECF0', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 1 }}>
          ❄️ DFW HVAC GUIDE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>
          HVAC Quote Comparison Guide for DFW
        </h1>
        <p style={{ color: '#9BA8B8', fontSize: 16, marginBottom: 36 }}>
          What every DFW HVAC quote must include — and the red flags that cost homeowners thousands.
        </p>

        <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🔑 Non-Negotiable Quote Elements for DFW</h2>
        <ul style={{ color: '#9BA8B8', fontSize: 15, lineHeight: 1.8, marginBottom: 32, paddingLeft: 20 }}>
          <li><strong style={{ color: '#E8ECF0′ }}>Manual J load calculation</strong> — sizing by square footage alone is wrong. DFW homes need attic insulation, window direction, and ceiling height factored in.</li>
          <li><strong style={{ color: '#E8ECF0′ }}>Equipment brand + exact model number</strong> — "16 SEER unit" is not a spec.</li>
          <li><strong style={{ color: '#E8ECF0′ }}>SEER rating of 15.2 minimum</strong> — federal law since Jan 2023 for DFW’s climate zone.</li>
          <li><strong style={{ color: '#E8ECF0′ }}>Permit pulled by contractor</strong> — all DFW cities require it. Homeowner permits create liability.</li>
          <li><strong style={{ color: '#E8ECF0′ }}>Separate labor and equipment warranties</strong> — equipment warranty (10 years if registered) does NOT cover labor.</li>
          <li><strong style={{ color: '#E8ECF0′ }}>Refrigerant type</strong> — R-410A systems being phased out. Ask about R-454B (Puron Advance).</li>
        </ul>

        <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🚩 HVAC Red Flags in DFW Quotes</h2>
        <ul style={{ color: '#9BA8B8', fontSize: 15, lineHeight: 1.8, marginBottom: 32, paddingLeft: 20 }}>
          <li>No load calculation — they sized it by your old unit's tonnage</li>
          <li>Generic brand ("major brand AC unit") — you choose nothing</li>
          <li>SEER below 15.2 — illegal for new installs in Texas since 2023</li>
          <li>Labor warranty under 12 months — industry norm is 1-2 years</li>
          <li>No mention of permit — contractor is cutting corners on inspection</li>
          <li>Quote comes within minutes of visit — no real assessment was done</li>
        </ul>

        <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Interactive: Home Size + System Type</h2>
        <div style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <label style={{ fontSize: 12, color: '#9BA8B8', display: 'block', marginBottom: 6 }}>HOME SIZE</label>
              <select value={homeSize} onChange={e => setHomeSize(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8ECF0', padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select size...</option>
                {homeSizes.map(h => <option key={h.label} value={h.label}>{h.label}</option>)}
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <label style={{ fontSize: 12, color: '#9BA8B8', display: 'block', marginBottom: 6 }}>SYSTEM TYPE</label>
              <select value={systemType} onChange={e => setSystemType(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8ECF0', padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select type...</option>
                {systemTypes.map(s => <option key={s.type} value={s.type}>{s.type}</option>)}
              </select>
            </div>
          </div>
          {selectedSize && (
            <div style={{ marginBottom: 14, padding: 14, background: '#0A1628', borderRadius: 8, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{selectedSize.label} — Expected System Size: <span style={{ color: '#F5E642′ }}>{selectedSize.tonRange}</span></div>
              <div style={{ fontSize: 13, color: '#9BA8B8′ }}>{selectedSize.seer}</div>
              <div style={{ fontSize: 13, color: '#4CAF50', marginTop: 4 }}>DFW market range: {selectedSize.estRange}</div>
            </div>
          )}
          {selectedSystem && (
            <>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>REQUIRED QUOTE ELEMENTS</div>
                {selectedSystem.required.map(item => (
                  <div key={item} style={{ fontSize: 13, color: '#9BA8B8', marginBottom: 4 }}>✓ {item}</div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>QUESTIONS TO ASK EVERY CONTRACTOR</div>
                {selectedSystem.questions.map(q => (
                  <div key={q} style={{ fontSize: 13, color: '#9BA8B8', marginBottom: 4 }}>❓ {q}</div>
                ))}
              </div>
            </>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, color: '#0A1628′ }}>
          <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>💡 ProLnk Tip</div>
          <div style={{ fontSize: 14 }}>ProLnk matches you with licensed DFW HVAC contractors who include Manual J load calcs and pull permits. No upsells, no generic equipment.</div>
        </div>
      </div>
    </div>
  );
}
