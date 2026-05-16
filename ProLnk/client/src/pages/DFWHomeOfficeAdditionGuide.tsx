import { useState } from 'react';

const STRUCTURE_TYPES = [
  { id: 'separate', label: '🏠 Separate Structure (Detached)', costLow: 40000, costHigh: 100000, pros: ['Complete separation from home', 'Best soundproofing', 'Dedicated HVAC zone', 'Strongest home office deduction'], cons: ['Highest cost', 'Requires lot space', 'Longer build time'] },
  { id: 'addition', label: '🔧 Room Addition (Attached)', costLow: 25000, costHigh: 75000, pros: ['Part of main home', 'Easier HVAC integration', 'No commute across yard'], cons: ['Adjacent noise from home', 'Harder to fully deduct', 'Requires foundation extension'] },
  { id: 'garage', label: '🚗 Converted Garage', costLow: 15000, costHigh: 45000, pros: ['Lowest cost option', 'Fastest build (4–8 weeks)', 'Separation from main living'], cons: ['Limited square footage', 'HVAC critical in DFW heat', 'HOA may restrict'] },
];

const BUDGETS = [
  { id: 'low', label: 'Under $30K', best: 'garage' },
  { id: 'mid', label: '$30K–$60K', best: 'addition' },
  { id: 'high', label: '$60K+', best: 'separate' },
];

const LOT_OPTIONS = [
  { id: 'small', label: 'Small yard (no space for detached)', available: ['garage', 'addition'] },
  { id: 'medium', label: 'Medium yard (200–500 sq ft available)', available: ['garage', 'addition', 'separate'] },
  { id: 'large', label: 'Large yard (500+ sq ft available)', available: ['garage', 'addition', 'separate'] },
];

export default function DFWHomeOfficeAdditionGuide() {
  const [budget, setBudget] = useState('mid');
  const [lotSpace, setLotSpace] = useState('medium');

  const selectedBudget = BUDGETS.find(b => b.id === budget)!;
  const selectedLot = LOT_OPTIONS.find(l => l.id === lotSpace)!;
  const recommended = STRUCTURE_TYPES.find(s => s.id === selectedBudget.best && selectedLot.available.includes(s.id)) || STRUCTURE_TYPES.find(s => selectedLot.available.includes(s.id))!;

  const monthlyPayment = (recommended.costLow + recommended.costHigh) / 2 / 180;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '0 0 80px' }}>
      <div style={{ backgroundColor: '#0D1E38', borderBottom: '3px solid #F5E642', padding: '40px 24px 32px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>DFW HOME IMPROVEMENT GUIDE 2026</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>Dedicated Home Office Addition — DFW Guide</h1>
          <p style={{ color: '#A0AABE', fontSize: 16, margin: 0, maxWidth: 620 }}>Separate structure, room addition, or garage conversion — find the right home office setup for your DFW property and budget.</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🔌 Electrical Requirements</h2>
          <div style={{ backgroundColor: '#0D1E38', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24 }}>
            <p style={{ color: '#A0AABE', marginBottom: 16, fontSize: 14 }}>A professional home office requires dedicated circuits that most rooms lack. Plan this during construction — retrofitting is expensive.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
              {[
                { icon: '⚡', label: 'Dedicated 20-amp circuits', note: 'Minimum 2 circuits for computer equipment' },
                { icon: '🌐', label: 'CAT6 Ethernet runs', note: 'Hardwired > WiFi for video calls; run to all desk positions' },
                { icon: '💡', label: 'Separate lighting circuit', note: 'Avoid flicker from shared circuits during video calls' },
                { icon: '🔌', label: 'UPS outlet placement', note: 'Position outlets for clean UPS/surge protector cable management' },
              ].map(item => (
                <div key={item.label} style={{ backgroundColor: '#162840', borderRadius: 10, padding: 16 }}>
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{item.label}</div>
                  <div style={{ color: '#8090A8', fontSize: 12 }}>{item.note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🔇 Soundproofing for DFW Homes</h2>
          <div style={{ backgroundColor: '#0D1E38', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '🧱', tip: 'Double drywall + Green Glue compound — adds STC 10–15 (standard: STC 33, treated: STC 50+)' },
                { icon: '🚪', tip: 'Solid-core doors (STC 30) vs hollow-core (STC 20) — upgrade every door in the office' },
                { icon: '🪟', tip: 'Double-pane windows with laminated glass — reduces exterior DFW lawn equipment noise' },
                { icon: '🏗️', tip: 'Decoupled walls (resilient clips + hat channel) — eliminates structural sound transmission' },
                { icon: '🌬️', tip: 'Duct silencers on HVAC runs — HVAC noise is major issue in quiet home offices' },
              ].map(item => (
                <div key={item.tip} style={{ display: 'flex', gap: 12, backgroundColor: '#162840', borderRadius: 8, padding: '12px 16px' }}>
                  <span style={{ fontSize: 18 }}>{item.icon}</span>
                  <span style={{ color: '#CBD5E0', fontSize: 13, lineHeight: 1.6 }}>{item.tip}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>💼 2026 Home Office Tax Deduction</h2>
          <div style={{ backgroundColor: '#0D1E38', border: '1px solid #F5E642', borderRadius: 12, padding: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 15 }}>✅ What Qualifies</div>
                <ul style={{ color: '#A0AABE', fontSize: 13, lineHeight: 2, paddingLeft: 18, margin: 0 }}>
                  <li>Used exclusively for business</li>
                  <li>Principal place of business</li>
                  <li>Self-employed / 1099 income</li>
                  <li>Regular and consistent use</li>
                </ul>
              </div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 15 }}>📊 Deduction Methods</div>
                <ul style={{ color: '#A0AABE', fontSize: 13, lineHeight: 2, paddingLeft: 18, margin: 0 }}>
                  <li>Simplified: $5/sq ft (max 300 sq ft)</li>
                  <li>Regular: % of home expenses</li>
                  <li>Depreciation on addition cost</li>
                  <li>Consult CPA for 2026 limits</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginTop: 40, backgroundColor: '#0D1E38', border: '2px solid #F5E642', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 24 }}>🧮 Home Office Recommender</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#A0AABE', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Budget Range</label>
              <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', backgroundColor: '#162840', border: '1px solid #2A4870', borderRadius: 8, padding: '10px 12px', color: '#E8EAF0', fontSize: 14 }}>
                {BUDGETS.map(b => <option key={b.id} value={b.id}>{b.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#A0AABE', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Available Lot Space</label>
              <select value={lotSpace} onChange={e => setLotSpace(e.target.value)} style={{ width: '100%', backgroundColor: '#162840', border: '1px solid #2A4870', borderRadius: 8, padding: '10px 12px', color: '#E8EAF0', fontSize: 14 }}>
                {LOT_OPTIONS.map(l => <option key={l.id} value={l.id}>{l.label}</option>)}
              </select>
            </div>
          </div>
          <div style={{ backgroundColor: '#162840', borderRadius: 12, padding: 24, marginBottom: 16 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Recommended: {recommended.label}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#8090A8', fontSize: 11, fontWeight: 600, marginBottom: 4 }}>COST RANGE</div>
                <div style={{ color: '#F5E642', fontWeight: 800 }}>${(recommended.costLow / 1000).toFixed(0)}K–${(recommended.costHigh / 1000).toFixed(0)}K</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#8090A8', fontSize: 11, fontWeight: 600, marginBottom: 4 }}>IF FINANCED (15YR)</div>
                <div style={{ color: '#F5E642', fontWeight: 800 }}>${Math.round(monthlyPayment).toLocaleString()}/mo</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#8090A8', fontSize: 11, fontWeight: 600, marginBottom: 4 }}>TIMELINE</div>
                <div style={{ color: '#F5E642', fontWeight: 800 }}>{recommended.id === 'garage' ? '4–8 wks' : recommended.id === 'addition' ? '3–5 mo' : '4–6 mo'}</div>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div style={{ color: '#4CAF50', fontWeight: 600, marginBottom: 8, fontSize: 13 }}>Pros</div>
              {recommended.pros.map(p => <div key={p} style={{ color: '#A0AABE', fontSize: 13, marginBottom: 4 }}>✅ {p}</div>)}
            </div>
            <div>
              <div style={{ color: '#E53E3E', fontWeight: 600, marginBottom: 8, fontSize: 13 }}>Cons</div>
              {recommended.cons.map(c => <div key={c} style={{ color: '#A0AABE', fontSize: 13, marginBottom: 4 }}>⚠️ {c}</div>)}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
