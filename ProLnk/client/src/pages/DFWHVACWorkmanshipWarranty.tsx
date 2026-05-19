import { useState } from 'react';

const warrantyTerms = [
  {
    id: '1_year',
    label: '1-Year Labor Warranty (Standard)',
    evaluation: 'Meets minimum acceptable standard for DFW. Industry baseline — most reputable contractors offer this.',
    covers: 'All labor costs to repair defects caused by improper installation. Includes refrigerant line issues, electrical connections, duct sealing failures, and thermostat wiring errors from the original install.',
    lookFor: 'Make sure "labor" is explicitly defined. It should cover return trips, diagnostic time, and parts labor — not just the service call fee.',
    redFlags: 'Any warranty shorter than 1 year. A 90-day labor warranty means the contractor doesn\’t stand behind their work.',
  },
  {
    id: '2_year',
    label: '2-Year Labor Warranty',
    evaluation: 'Above average — a signal this contractor is confident in their installation quality.',
    covers: 'Everything in a 1-year warranty, plus coverage through the second cooling and heating season. DFW\’s extreme heat stress-tests systems hardest in Year 1 and 2.',
    lookFor: 'Confirm the warranty is transferable if you sell the home. This adds resale value and signals contractor confidence.',
    redFlags: 'Vague language like "defects covered at our discretion." The warranty should list what\’s covered, not leave it up to the contractor.',
  },
  {
    id: '3_year',
    label: '3-Year Labor Warranty',
    evaluation: 'Premium tier — typically offered by top DFW contractors with strong quality control processes.',
    covers: 'Full labor coverage through three complete DFW seasons. By Year 3, any systemic installation defect will have manifested — this warranty covers you through that window.',
    lookFor: 'Confirm the warranty is backed by the company, not an individual tech. If the contractor goes out of business, what happens? Ask for a bonded warranty.',
    redFlags: 'Three-year warranties that exclude refrigerant issues or duct work. These are the most common installation failures — if excluded, the warranty is mostly worthless.',
  },
  {
    id: 'no_warranty',
    label: 'No Written Labor Warranty',
    evaluation: 'Unacceptable. Walk away from any DFW HVAC installer who won\’t provide a written labor warranty.',
    covers: 'Nothing — you have no protection if the system fails due to installation error.',
    lookFor: 'You shouldn\’t be looking for anything. This contractor is not a professional.',
    redFlags: 'Verbal promises of "we\’ll take care of you" are not warranties. In Texas, without a written warranty, you have limited legal recourse on installation defects.',
  },
];

const howToClaim = [
  'Document the issue with photos and timestamps the moment it occurs.',
  'Call the contractor first — give them the opportunity to honor the warranty.',
  'Send a written notice via email with your warranty documentation attached.',
  'If no response within 48 hours, contact the Texas Department of Licensing and Regulation (TDLR).',
  'For disputes over $1,000, consider filing in Texas Justice Court (small claims, up to $20,000).',
  'Check if your contractor is bonded — a bonded contractor has insurance backing their warranty obligations.',
];

export default function DFWHVACWorkmanshipWarranty() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF4′ }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔨</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            DFW HVAC Workmanship Warranty Guide
          </h1>
          <p style={{ fontSize: 16, color: '#9BAAC0', maxWidth: 580, margin: '0 auto' }}>
            Labor warranties for DFW HVAC installs — what's standard, what’s exceptional, and what’s a red flag.
          </p>
        </div>

        <div style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>
            🏗️ What Is a Workmanship Warranty?
          </h2>
          <p style={{ color: '#9BAAC0', fontSize: 15, lineHeight: 1.7 }}>
            A workmanship warranty (also called a labor warranty) covers the cost of fixing installation defects —
            mistakes made by the installer, not equipment failures. In DFW, where systems endure some of the highest
            stress loads in the country, installation quality is everything. The standard is 1 year. Top DFW contractors
            offer 2–3 years. Anything less than 1 year is a dealbreaker.
          </p>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#E8EDF4', marginBottom: 16 }}>
          📄 Evaluate Your Warranty Terms
        </h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {warrantyTerms.map(w => (
            <button
              key={w.id}
              onClick={() => setSelected(selected === w.id ? null : w.id)}
              style={{
                background: selected === w.id ? '#1A3A6E' : '#0F2040',
                border: selected === w.id ? '2px solid #F5E642′ : '1px solid #1E3A5F',
                borderRadius: 10, padding: '16px 20px', cursor: 'pointer',
                textAlign: 'left', color: '#E8EDF4', fontSize: 15, fontWeight: 600,
                transition: 'all 0.2s', width: '100%',
              }}
            >
              {selected === w.id ? '▼' : '▶'} {w.label}
              {selected === w.id && (
                <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
                  <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                    <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>⚖️ Evaluation</div>
                    <div style={{ color: '#C5D3E8', fontSize: 14, lineHeight: 1.6 }}>{w.evaluation}</div>
                  </div>
                  <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                    <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>✅ What It Covers</div>
                    <div style={{ color: '#C5D3E8', fontSize: 14, lineHeight: 1.6 }}>{w.covers}</div>
                  </div>
                  <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                    <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>🔍 What to Look For</div>
                    <div style={{ color: '#C5D3E8', fontSize: 14, lineHeight: 1.6 }}>{w.lookFor}</div>
                  </div>
                  <div style={{ background: '#1A0A0A', border: '1px solid #5F1E1E', borderRadius: 8, padding: 14 }}>
                    <div style={{ color: '#FF6B6B', fontWeight: 700, marginBottom: 6 }}>🚩 Red Flags</div>
                    <div style={{ color: '#C5D3E8', fontSize: 14, lineHeight: 1.6 }}>{w.redFlags}</div>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        <div style={{ background: '#0F2040', border: '1px solid #F5E642', borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🗂️ How to Claim Your Workmanship Warranty in DFW</h3>
          <div style={{ display: 'grid', gap: 8 }}>
            {howToClaim.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ color: '#9BAAC0', fontSize: 14, lineHeight: 1.6 }}>{step}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
