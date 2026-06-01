import { useState } from 'react';

export default function DFWRoofingBidCompare2026() {
  const [discrepancy, setDiscrepancy] = useState('');
  const [checklist, setChecklist] = useState('');

  const getChecklist = () => {
    if (!discrepancy) { setChecklist('Select a bid discrepancy type to get your comparison checklist.'); return; }
    const checklists: Record<string, string> = {
      price: '💰 Price Difference Checklist: 1) Confirm same shingle brand AND product line (Owens Corning Duration vs TruDefinition are different price tiers). 2) Verify same underlayment — synthetic vs felt is a -800 difference. 3) Check tear-off vs overlay — overlay saves -1000 but is not allowed on DFW homes already with 2 layers. 4) Confirm same pipe boot replacement count. 5) Ask about decking replacement allowance — DFW roofers often include 2-3 sheets; some bid zero. 6) Manufacturer certification level — OC Platinum requires more labor than Silver but gives 50-year warranty.',
      warranty: '📋 Warranty Checklist: 1) Manufacturer warranty — most DFW shingles carry 25-50 year material warranty. Confirm same warranty tier. 2) Workmanship warranty — varies wildly: some DFW contractors offer 1 year, others 10 years. Get it in writing. 3) Certification requirement — Owens Corning Platinum certification requires specific installation practices for 50-year warranty to be valid. 4) Transferability — can warranty transfer to new owner? Important for DFW resale. 5) Wind rating — DFW needs Class 4 impact resistance and 130 mph wind rating minimum.',
      shingle: '🏗️ Shingle Spec Checklist: 1) Brand: Owens Corning, GAF, CertainTeed — all reputable but verify same brand across bids. 2) Product line within brand — base vs premium is a -2/sq ft difference. 3) Color — same color code, not just color name ("Aged Oak" varies by brand). 4) Impact resistance class — Class 4 is DFW standard and qualifies for insurance discount. 5) Wind resistance — 130 mph minimum for DFW; some products rated 150 mph. 6) Algae resistance — important for DFW humidity; look for AR designation.',
      labor: '👷 Labor Comparison Checklist: 1) Is the crew in-house or subcontracted? DFW storm season brings fly-by-night subs. 2) Crew size affects timeline — 3-man crew vs 8-man crew on same roof. 3) Ask for specific crew lead name — not just company. 4) Cleanup method — dumpster on-site or haul-away? Magnetic nail sweep included? 5) Start date and completion guarantee in contract. 6) Payment schedule — never pay more than 10% upfront; DFW norm is 50% start, 50% completion. 7) Verify contractor has current Texas license and carries workers comp.',
      tearoff: '🔨 Tear-Off vs Overlay Checklist: 1) Texas code allows maximum 2 layers of roofing — if your DFW home already has 2, overlay is illegal. 2) Tear-off reveals deck damage — bid should include per-sheet price for deck replacement. 3) Overlay hides existing damage and adds 1.5-2 lbs/sq ft load. 4) Most DFW insurance claims require full tear-off. 5) Warranty — most manufacturer warranties require tear-off for full coverage. 6) Overlay saves -1500 upfront but reduces lifespan 20-30%. 7) Ask each bidder: what will you do if you find deck rot? Get the answer and pricing in writing.'
    };
    setChecklist(checklists[discrepancy] || '');
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#F5E642', fontSize: '13px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>🏠 DFW Roofing Guide 2026</div>
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px', lineHeight: 1.2 }}>Roofing Bid Comparison Tool</h1>
        <p style={{ color: '#8899AA', fontSize: '16px', marginBottom: '32px' }}>DFW roofing bids that look the same often are not. Shingle line, underlayment, certification level, and tear-off vs overlay can account for thousands in legitimate price difference — or hide inferior work.</p>

        <div style={{ backgroundColor: '#0D1F38', border: '2px solid #F5E642', borderRadius: '12px', padding: '24px', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', color: '#F5E642' }}>⚡ 5 Non-Negotiables for Any DFW Roof Bid</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {['Same shingle brand AND product line (not just brand)', 'Same underlayment spec (synthetic vs felt changes cost and performance)', 'Tear-off included — not overlay on existing layers', 'All pipe boots and boots replaced (DFW heat degrades rubber fast)', 'Manufacturer certification tier specified (affects warranty length)'].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ color: '#F5E642', fontWeight: 800, fontSize: '16px', flexShrink: 0 }}>{i + 1}.</span>
                <span style={{ color: '#CBD5E0', fontSize: '14px' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0D1F38', border: '1px solid #1a3050', borderRadius: '12px', padding: '28px', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', color: '#F5E642' }}>🔍 Get My Comparison Checklist</h2>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', color: '#8899AA', marginBottom: '8px' }}>Bid Discrepancy Type</label>
            <select value={discrepancy} onChange={e => setDiscrepancy(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: '#0A1628', border: '1px solid #1a3050', borderRadius: '8px', color: '#fff', fontSize: '15px' }}>
              <option value=''>Select discrepancy...</option>
              <option value='price'>Large price difference between bids</option>
              <option value='warranty'>Warranty terms differ significantly</option>
              <option value='shingle'>Shingle specs seem different</option>
              <option value='labor'>Labor terms or crew concerns</option>
              <option value='tearoff'>Tear-off vs overlay question</option>
            </select>
          </div>
          <button onClick={getChecklist} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '14px 28px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', width: '100%' }}>Get Comparison Checklist</button>
          {checklist && <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#0A1628', borderRadius: '8px', border: '1px solid #F5E642', fontSize: '15px', lineHeight: 1.7 }}>{checklist}</div>}
        </div>

        <div style={{ backgroundColor: '#0D1F38', border: '1px solid #1a3050', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '16px', color: '#F5E642' }}>📊 DFW Typical Roofing Cost Ranges 2026</h3>
          {[{ type: 'Repair (minor, <10 sq ft)', range: '$300 – $800', note: 'Single missing shingles, small leak source' },
            { type: 'Partial replacement (10-30 sq ft)', range: '$1,500 – $4,500', note: 'Storm damage section, one slope' },
            { type: 'Full replacement (2,000 sq ft home)', range: '$9,000 – $18,000', note: '30-year shingle, synthetic underlayment, full tear-off' },
            { type: 'Premium replacement (Class 4 impact)', range: '$14,000 – $25,000', note: 'Insurance premium discount often justifies cost' }
          ].map(row => (
            <div key={row.type} style={{ padding: '12px 0', borderBottom: '1px solid #1a3050' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>{row.type}</span>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: '15px' }}>{row.range}</span>
              </div>
              <div style={{ color: '#8899AA', fontSize: '12px' }}>{row.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}