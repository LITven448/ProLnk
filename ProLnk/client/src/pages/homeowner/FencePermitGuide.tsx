import { useState } from 'react';

type CityPermitInfo = {
  required: boolean;
  processingTime: string;
  cost: string;
  notes: string;
  onlineApp: boolean;
};

const cityPermitData: Record<string, Record<string, CityPermitInfo>> = {
  Dallas: {
    'Under 4 feet': { required: false, processingTime: 'N/A', cost: 'Free', notes: 'No permit required for fences under 4 feet. Some historic districts have additional restrictions.', onlineApp: false },
    '4–6 feet': { required: true, processingTime: '5–10 business days', cost: '$50–$150', notes: 'Permit required. Some design review districts require additional approval. Call 311 to verify your area.', onlineApp: true },
    'Over 6 feet': { required: true, processingTime: '10–15 business days', cost: '$100–$300', notes: 'Permit required. Engineer review may be needed for masonry over 6 feet. Historic districts almost always require design review.', onlineApp: true },
  },
  Frisco: {
    'Under 4 feet': { required: true, processingTime: '3–5 business days', cost: '$50', notes: 'Frisco requires permits for ALL fences regardless of height. Must submit site plan showing property lines.', onlineApp: true },
    '4–6 feet': { required: true, processingTime: '3–5 business days', cost: '$75–$150', notes: 'Online application available. Site plan required showing fence location relative to property lines.', onlineApp: true },
    'Over 6 feet': { required: true, processingTime: '5–7 business days', cost: '$150–$300', notes: 'Engineer review required for masonry over 6 feet. HOA approval must be submitted with city application.', onlineApp: true },
  },
  Plano: {
    'Under 4 feet': { required: false, processingTime: 'N/A', cost: 'Free', notes: 'No permit required for fences under 4 feet in rear/side yard. Front yard fences have additional restrictions in Plano.', onlineApp: false },
    '4–6 feet': { required: true, processingTime: '5–7 business days', cost: '$60–$120', notes: 'Permit required. Front yard fences require additional approval and are generally limited to 4 feet max.', onlineApp: true },
    'Over 6 feet': { required: true, processingTime: '7–14 business days', cost: '$120–$250', notes: 'Engineer review required. Masonry over 6 feet needs structural review. Rear yard setback of 2 feet from property line.', onlineApp: true },
  },
  McKinney: {
    'Under 4 feet': { required: false, processingTime: 'N/A', cost: 'Free', notes: 'Generally no permit required. Verify with McKinney Development Services if you are in a special overlay district.', onlineApp: false },
    '4–6 feet': { required: true, processingTime: '3–5 business days', cost: '$50–$100', notes: 'Online filing available at McKinney development portal. Fast processing, typically 3 days for standard residential fence.', onlineApp: true },
    'Over 6 feet': { required: true, processingTime: '5–10 business days', cost: '$100–$200', notes: 'Engineer review for masonry. Corner lot setback requirements apply — sight triangle rules strictly enforced.', onlineApp: true },
  },
  'Fort Worth': {
    'Under 4 feet': { required: false, processingTime: 'N/A', cost: 'Free', notes: 'Temporary and low fences typically exempt. Verify with Fort Worth Development Services for your specific zone.', onlineApp: false },
    '4–6 feet': { required: true, processingTime: '5–10 business days', cost: '$50–$150', notes: 'Most residential fences over 4 feet require permit. Some older platted subdivisions have different rules.', onlineApp: true },
    'Over 6 feet': { required: true, processingTime: '10–14 business days', cost: '$100–$250', notes: 'Engineer review for masonry over 6 feet. Strict corner lot sight triangle rules apply throughout Fort Worth.', onlineApp: true },
  },
  Allen: {
    'Under 4 feet': { required: false, processingTime: 'N/A', cost: 'Free', notes: 'No permit for short fences. HOA approval still required in most Allen neighborhoods.', onlineApp: false },
    '4–6 feet': { required: true, processingTime: '3–7 business days', cost: '$50–$120', notes: 'Allen has a straightforward permit process. Online application available. Submit HOA approval letter.', onlineApp: true },
    'Over 6 feet': { required: true, processingTime: '7–10 business days', cost: '$100–$250', notes: 'Engineer letter required for masonry over 6 feet. Pool safety fencing has separate requirements.', onlineApp: true },
  },
};

const cities = Object.keys(cityPermitData);
const heights = ['Under 4 feet', '4–6 feet', 'Over 6 feet'];
const materials = [
  { name: 'Wood Privacy (6ft)', permitNote: 'Almost always requires permit in DFW cities', hoa: 'Generally HOA-approved but stain/color may be restricted', emoji: '🪵' },
  { name: 'Chain Link', permitNote: 'Often exempt if under 6ft in rear yard', hoa: 'Many HOAs prohibit chain link in front yard', emoji: '⛓️' },
  { name: 'Wrought Iron / Aluminum', permitNote: 'Usually requires permit if over 4ft', hoa: 'Generally HOA-approved, required in some upscale HOAs', emoji: '🔩' },
  { name: 'Masonry (Brick/Stone/Block)', permitNote: 'Always requires permit + engineer review', hoa: 'High approval rate but requires detailed drawings', emoji: '🧱' },
  { name: 'Vinyl / PVC', permitNote: 'Follows same height rules as wood', hoa: 'Increasingly accepted, verify color requirements', emoji: '🟡' },
  { name: 'Composite', permitNote: 'Same permit rules as wood privacy fences', hoa: 'Growing acceptance, check material specifications', emoji: '🟤' },
];

export default function FencePermitGuide() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedHeight, setSelectedHeight] = useState('');
  const [permitInfo, setPermitInfo] = useState<CityPermitInfo | null>(null);

  const checkPermit = () => {
    if (!selectedCity || !selectedHeight) return;
    const info = cityPermitData[selectedCity]?.[selectedHeight];
    setPermitInfo(info || null);
  };

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#e5e7eb', fontFamily: 'system-ui, sans-serif' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1c1917 0%, #0c1a0c 100%)', padding: '80px 24px 60px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏡</div>
        <h1 style={{ fontSize: 'clamp(26px, 5vw, 46px)', fontWeight: 800, color: '#ffffff', marginBottom: '16px', lineHeight: 1.2 }}>
          DFW Fence Permit Guide
        </h1>
        <p style={{ fontSize: '20px', color: '#4ade80', fontWeight: 600, marginBottom: '12px' }}>
          Do You Need a Permit for Your Fence?
        </p>
        <p style={{ fontSize: '16px', color: '#9ca3af', maxWidth: '620px', margin: '0 auto' }}>
          The short answer: it depends on your city, your HOA, and the height of your fence. Here is everything you need to know before you break ground.
        </p>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px' }}>

        {/* Interactive Checker */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>🔍 Fence Permit Checker</h2>
          <p style={{ color: '#9ca3af', marginBottom: '24px' }}>Select your DFW city and fence height to see permit requirements and estimated timeline.</p>
          <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#9ca3af', marginBottom: '8px' }}>Your City</label>
                <select
                  value={selectedCity}
                  onChange={e => setSelectedCity(e.target.value)}
                  style={{ width: '100%', padding: '12px', border: '1px solid #374151', borderRadius: '8px', fontSize: '15px', color: '#ffffff', background: '#1f2937′ }}
                >
                  <option value="">Select a city...</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#9ca3af', marginBottom: '8px' }}>Fence Height</label>
                <select
                  value={selectedHeight}
                  onChange={e => setSelectedHeight(e.target.value)}
                  style={{ width: '100%', padding: '12px', border: '1px solid #374151', borderRadius: '8px', fontSize: '15px', color: '#ffffff', background: '#1f2937′ }}
                >
                  <option value="">Select height...</option>
                  {heights.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
            </div>
            <button
              onClick={checkPermit}
              style={{ background: '#4ade80', color: '#000000', padding: '14px 32px', borderRadius: '8px', border: 'none', fontSize: '16px', fontWeight: 700, cursor: 'pointer' }}
            >
              Check Permit Requirements →
            </button>

            {permitInfo && (
              <div style={{ marginTop: '28px', background: permitInfo.required ? '#052e16′ : '#0c1a0c', border: `1px solid ${permitInfo.required ? '#166534' : '#14532d'}`, borderRadius: '10px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '28px' }}>{permitInfo.required ? '📋' : '✅'}</span>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: permitInfo.required ? '#fbbf24′ : '#4ade80', marginBottom: '2px' }}>
                      {permitInfo.required ? 'Permit REQUIRED' : 'No Permit Needed'}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#6b7280′ }}>{selectedCity} — {selectedHeight}</p>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ background: '#0a3d1f', borderRadius: '8px', padding: '12px' }}>
                    <div style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', marginBottom: '4px' }}>Processing Time</div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>{permitInfo.processingTime}</div>
                  </div>
                  <div style={{ background: '#0a3d1f', borderRadius: '8px', padding: '12px' }}>
                    <div style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', marginBottom: '4px' }}>Permit Cost</div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#4ade80′ }}>{permitInfo.cost}</div>
                  </div>
                  <div style={{ background: '#0a3d1f', borderRadius: '8px', padding: '12px' }}>
                    <div style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', marginBottom: '4px' }}>Online Application</div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: permitInfo.onlineApp ? '#4ade80′ : '#f87171' }}>{permitInfo.onlineApp ? ’Available' : 'In-person only'}</div>
                  </div>
                </div>
                <p style={{ fontSize: '14px', color: '#86efac', lineHeight: 1.6 }}>{permitInfo.notes}</p>
              </div>
            )}
          </div>
        </section>

        {/* HOA Requirements */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>🏘️ HOA Requirements — Separate from City Permits</h2>
          <p style={{ color: '#9ca3af', marginBottom: '24px' }}>Your HOA approval is typically required BEFORE you apply for a city permit. Don't skip this step.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              { emoji: '📐', title: 'What HOAs Typically Control', items: ['Fence material (wood, metal, vinyl)', 'Maximum height in front and rear yard', 'Color and stain requirements', 'Post cap style and gate requirements'] },
              { emoji: '📅', title: 'HOA Approval Process', items: ['Submit site plan with fence dimensions', 'Include material specifications + photos', 'Wait period: typically 14–30 days', 'Get written approval before pulling city permit'] },
              { emoji: '⚠️', title: 'What Happens Without HOA Approval', items: ['Fine: typically $100–$500 per month', 'Forced removal at your expense', 'Lien on property if fines unpaid', 'Can impact home sale'] },
              { emoji: '✅', title: 'HOA-Safe Moves', items: ['Submit before starting any work', 'Get approval in writing (email is fine)', 'Photograph pre-existing conditions', 'Keep approval with your records'] },
            ].map((section, i) => (
              <div key={i} style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{section.emoji}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}>{section.title}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {section.items.map((item, j) => (
                    <li key={j} style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '6px', paddingLeft: '16px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#4ade80′ }}>›</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Common DFW Rules */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff', marginBottom: '24px' }}>📏 Common DFW Fence Rules</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { rule: 'Front yard height limit', detail: 'Most DFW cities limit front yard fences to 4 feet. Some prohibit them entirely. Always check before planning a front fence.' },
              { rule: 'Corner lot sight triangle', detail: 'At intersections, fences must be below 3 feet for 15–25 feet on each side of the corner. Safety rule — strictly enforced.' },
              { rule: 'Property line setback', detail: 'Most DFW cities require 12–18 inches of setback from the property line. Some allow zero setback with neighbor agreement.' },
              { rule: 'Pool safety fence', detail: 'Pool areas require a separate 4-foot minimum fence with self-closing, self-latching gate. Independent of HOA/city fence rules.' },
              { rule: 'Shared fence agreements', detail: 'Texas follows the "Good Neighbor Fence" act — costs can be shared. Get any shared agreement in writing before construction.' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '10px', padding: '20px', display: 'flex', gap: '16px' }}>
                <div style={{ fontSize: '20px' }}>📌</div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>{item.rule}</h3>
                  <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: 1.5 }}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Materials */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff', marginBottom: '24px' }}>🪵 Fence Materials & Permit Notes</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {materials.map((mat, i) => (
              <div key={i} style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '10px', padding: '20px' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{mat.emoji}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', marginBottom: '10px' }}>{mat.name}</h3>
                <div style={{ marginBottom: '8px' }}>
                  <div style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', marginBottom: '2px' }}>Permit</div>
                  <p style={{ fontSize: '13px', color: '#fbbf24′ }}>{mat.permitNote}</p>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', marginBottom: '2px' }}>HOA</div>
                  <p style={{ fontSize: '13px', color: '#9ca3af' }}>{mat.hoa}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: '#0c1a0c', border: '1px solid #166534', borderRadius: '12px', padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🏗️</div>
          <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}>Need a Licensed Fence Contractor in DFW?</h3>
          <p style={{ fontSize: '15px', color: '#9ca3af', maxWidth: '500px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            ProLnk connects you with licensed, insured fence contractors who know DFW permit requirements and HOA processes. Get competitive quotes from pros who handle the paperwork.
          </p>
          <a
            href="/waitlist/homeowner"
            style={{ display: 'inline-block', background: '#4ade80', color: '#000000', padding: '14px 32px', borderRadius: '8px', fontWeight: 700, fontSize: '16px', textDecoration: 'none' }}
          >
            Get Fence Quotes from ProLnk Pros →
          </a>
        </section>

      </div>
    </div>
  );
}
