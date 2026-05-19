import { useState } from 'react';

const homeSizes = [
  {
    label: 'Under 1,500 sq ft',
    pierRange: '8–14 piers typical',
    estRange: '$5,500–$11,000',
    note: 'Smaller footprint but DFW clay soil still requires full perimeter coverage.',
  },
  {
    label: '1,500–2,500 sq ft',
    pierRange: '14–22 piers typical',
    estRange: '$9,000–$17,000',
    note: 'Most common DFW home size. Interior piers may be needed depending on symptoms.',
  },
  {
    label: '2,500–3,500 sq ft',
    pierRange: '20–30 piers typical',
    estRange: '$14,000–$22,000',
    note: 'Larger footprint often requires interior piers — confirm in quote.',
  },
  {
    label: 'Over 3,500 sq ft',
    pierRange: '28–40+ piers typical',
    estRange: '$18,000–$35,000+',
    note: 'Complex homes may require engineer oversight and drainage remediation.',
  },
];

const symptomSets = [
  {
    symptoms: 'Cracks in sheetrock + sticking doors',
    severity: 'Moderate',
    notes: 'Classic DFW shrink-swell clay movement. Get 3 quotes. Monitor seasonally before committing.',
    mustHave: ['Pier type + count specified (pressed concrete vs Bell Bottom vs steel)', 'Warranty: minimum 25-year transferable to next owner', 'Engineer certification included in quote', 'Interior access floor restoration included', 'Re-leveling guaranteed — not "best effort"'],
  },
  {
    symptoms: 'Sloping floors + cracks at corners',
    severity: 'Significant',
    notes: 'Differential settlement. Engineer involvement required. Do not delay.',
    mustHave: ['Independent engineer evaluation — not contractor\’s in-house engineer', 'Soil report or moisture barrier assessment', 'All above items from moderate symptoms', 'Post-repair elevation certificate'],
  },
  {
    symptoms: 'Gaps at roofline + exterior brick cracking',
    severity: 'Severe',
    notes: 'Significant structural movement. Stop watering the foundation and get an independent PE first.',
    mustHave: ['Licensed structural PE report first — before any contractor quotes', 'Drainage remediation plan included or separately scoped', 'All above items from significant symptoms', 'Structural engineer oversees repair'],
  },
];

export default function DFWFoundationQuoteGuide() {
  const [homeSize, setHomeSize] = useState('');
  const [symptoms, setSymptoms] = useState('');

  const selectedSize = homeSizes.find(h => h.label === homeSize);
  const selectedSymptoms = symptomSets.find(s => s.symptoms === symptoms);

  const severityColor = (sev: string) =>
    sev === 'Severe' ? '#FF4444′ : sev === ’Significant' ? '#FF8C00′ : '#F5E642';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8ECF0', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 1 }}>
          🏗️ DFW FOUNDATION GUIDE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>
          Foundation Repair Quote Guide for DFW
        </h1>
        <p style={{ color: '#9BA8B8', fontSize: 16, marginBottom: 36 }}>
          DFW's expansive clay soil makes foundation repair the most confusing and highest-variance quote in home services — $5K to $25K for the same house is common. Here’s how to compare.
        </p>

        <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>⚠️ Why DFW Quotes Vary So Dramatically</h2>
        <ul style={{ color: '#9BA8B8', fontSize: 15, lineHeight: 1.8, marginBottom: 32, paddingLeft: 20 }}>
          <li><strong style={{ color: '#E8ECF0′ }}>Pier type varies wildly</strong> — pressed concrete piers ($300–400 each) vs steel push piers ($600–1,200 each) vs Bell Bottom piers ($800–1,500 each).</li>
          <li><strong style={{ color: '#E8ECF0′ }}>Pier count is the biggest cost lever</strong> — contractors choosing fewer piers reduce cost but not the problem.</li>
          <li><strong style={{ color: '#E8ECF0′ }}>Warranty transferability</strong> — a non-transferable warranty destroys resale value and often signals poor confidence in the repair.</li>
          <li><strong style={{ color: '#E8ECF0′ }}>Engineer involvement</strong> — some include it, most don’t. If the quote lacks engineer certification, lenders and buyers won’t accept it.</li>
          <li><strong style={{ color: '#E8ECF0′ }}>Interior access restoration</strong> — cutting open floors costs more. Some quote it separately after the fact.</li>
        </ul>

        <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🔑 Non-Negotiable Quote Elements</h2>
        <ul style={{ color: '#9BA8B8', fontSize: 15, lineHeight: 1.8, marginBottom: 32, paddingLeft: 20 }}>
          <li>Pier type + exact count on the quote — not "approximately X piers"</li>
          <li>Warranty: 25-year minimum, transferable to next owner, in writing</li>
          <li>Licensed engineer certification included — not optional</li>
          <li>Interior floor restoration included or itemized</li>
          <li>Re-leveling guarantee — they return if settling continues</li>
          <li>Drainage remediation assessment (root cause of DFW movement)</li>
        </ul>

        <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Interactive: Home Size + Symptoms</h2>
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
              <label style={{ fontSize: 12, color: '#9BA8B8', display: 'block', marginBottom: 6 }}>PRIMARY SYMPTOMS</label>
              <select value={symptoms} onChange={e => setSymptoms(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8ECF0', padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select symptoms...</option>
                {symptomSets.map(s => <option key={s.symptoms} value={s.symptoms}>{s.symptoms}</option>)}
              </select>
            </div>
          </div>
          {selectedSize && (
            <div style={{ marginBottom: 14, padding: 14, background: '#0A1628', borderRadius: 8, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>Expected pier count: <span style={{ color: '#F5E642′ }}>{selectedSize.pierRange}</span></div>
              <div style={{ fontSize: 13, color: '#4CAF50′ }}>DFW market range: {selectedSize.estRange}</div>
              <div style={{ fontSize: 13, color: '#9BA8B8', marginTop: 4 }}>{selectedSize.note}</div>
            </div>
          )}
          {selectedSymptoms && (
            <>
              <div style={{ marginBottom: 12, padding: 12, background: '#0A1628', borderRadius: 8, borderLeft: `3px solid ${severityColor(selectedSymptoms.severity)}` }}>
                <div style={{ fontWeight: 700, color: severityColor(selectedSymptoms.severity), marginBottom: 4 }}>Severity: {selectedSymptoms.severity}</div>
                <div style={{ fontSize: 13, color: '#9BA8B8′ }}>{selectedSymptoms.notes}</div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>YOUR QUOTE MUST INCLUDE</div>
                {selectedSymptoms.mustHave.map(item => (
                  <div key={item} style={{ fontSize: 13, color: '#9BA8B8', marginBottom: 4 }}>✓ {item}</div>
                ))}
              </div>
            </>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, color: '#0A1628′ }}>
          <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>💡 ProLnk Tip</div>
          <div style={{ fontSize: 14 }}>ProLnk works with DFW foundation contractors who include engineer certs and transferable warranties as standard. No pier count games.</div>
        </div>
      </div>
    </div>
  );
}
