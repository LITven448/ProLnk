import { useState } from 'react';

const BUILDER_INCENTIVES = [
  { incentive: 'Closing Cost Contribution', negotiable: false, typical: '$5,000-20,000', notes: 'Builders routinely offer 3-6% of purchase price toward closing costs; must use builder preferred lender' },
  { incentive: 'Interest Rate Buydown', negotiable: false, typical: '1-2 points lower rate', notes: 'Temporary (2-1 buydown) or permanent rate reduction via builder lender; compare total cost vs outside lender' },
  { incentive: 'Free Upgrades Package', negotiable: true, typical: '$15,000-50,000 value', notes: 'Floor, cabinet, countertop upgrades are high-margin for builders; negotiate cash off list price instead' },
  { incentive: 'Lot Premium Waiver', negotiable: true, typical: '$10,000-80,000', notes: 'Corner and cul-de-sac lots carry premiums; waiver possible in slower phases or slow-moving inventory' },
  { incentive: 'Extended Rate Lock', negotiable: false, typical: 'Free 60-90 day lock', notes: 'Builder lenders offer longer locks to protect against construction delays; standard feature, not a special deal' },
  { incentive: 'Appliance Package', negotiable: true, typical: '$3,000-8,000', notes: 'Negotiate upgraded appliances or ask for a check at closing instead of the builder package' },
];

const WARRANTY_BREAKDOWN = [
  { year: '1-Year', covers: 'Workmanship and materials', examples: 'Drywall cracks, paint, caulking, fixtures', action: 'Submit punch list at 60-day and 11-month walkthroughs' },
  { year: '2-Year', covers: 'Systems: HVAC, plumbing, electrical', examples: 'Ductwork leaks, pipe connections, wiring', action: 'Test all systems thoroughly at 18-month mark before warranty expires' },
  { year: '10-Year', covers: 'Structural defects only', examples: 'Foundation issues, load-bearing wall failure, roof structure', action: 'Document any structural cracks immediately; builder must respond' },
];

const PHASE_RISKS = [
  { phase: 'Phase 1 - First lots in development', risk: 'High', pros: ['Lowest prices in the development', 'Best lot selection', 'Early equity if project succeeds'], cons: ['Living through construction for 3-5 years', 'MUD tax rate may change as district matures', 'Builder could slow builds or change plans', 'Amenities not yet built'] },
  { phase: 'Phase 2-3 - Mid development', risk: 'Medium', pros: ['Amenities opening or open', 'Price has appreciated from Phase 1', 'Construction activity decreasing', 'Community feel established'], cons: ['Less lot selection than Phase 1', 'Builder still adjusting spec and pricing', 'Some resale competition from Phase 1 owners'] },
  { phase: 'Phase 4+ - Near buildout', risk: 'Low', pros: ['Full amenities operational', 'Established community character', 'Minimal construction noise', 'Resale market established for comps'], cons: ['Highest prices in development', 'Fewer lot and elevation choices', 'May be buying at peak for that community'] },
];

function calculateTrueCost(basePrice: number, mudRate: number, phase: number): { monthly: number; mudMonthly: number; comparison: string } {
  const mortgage = (basePrice * 0.8 * 0.065) / 12;
  const baseTax = (basePrice * 0.022) / 12;
  const mudMonthly = (basePrice * mudRate / 100) / 12;
  const hoa = 150;
  const insurance = 250;
  const total = Math.round(mortgage + baseTax + mudMonthly + hoa + insurance);
  const resaleEquiv = basePrice * (phase === 1 ? 0.85 : phase === 2 ? 0.92 : 1.0);
  const resaleMortgage = (resaleEquiv * 0.8 * 0.065) / 12;
  const resaleTax = (resaleEquiv * 0.022) / 12;
  const resaleTotal = Math.round(resaleMortgage + resaleTax + 150 + 220);
  return {
    monthly: total,
    mudMonthly: Math.round(mudMonthly),
    comparison: `Comparable resale home: ~$${resaleTotal.toLocaleString()}/mo (saves MUD tax; established comps)`
  };
}

export default function DFWNewDevelopmentGuide() {
  const [basePrice, setBasePrice] = useState(450000);
  const [mudRate, setMudRate] = useState(0.8);
  const [phase, setPhase] = useState(2);
  const [result, setResult] = useState<{ monthly: number; mudMonthly: number; comparison: string } | null>(null);

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', color: '#1E293B', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #0A1628 100%)', padding: '48px 24px 32px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: '13px', color: '#F5E642', letterSpacing: '2px', marginBottom: '12px' }}>🏗️ DFW BUYER GUIDE</div>
          <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#FFFFFF', margin: '0 0 12px' }}>Buying in a New DFW Development</h1>
          <p style={{ fontSize: '16px', color: '#94A3B8', margin: '0', maxWidth: '640px' }}>
            Builder incentives, what you can actually negotiate, MUD district taxes, warranty coverage, and phase-by-phase risk analysis.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1E3A5F', marginBottom: '20px' }}>💡 Builder Incentives: Negotiable vs Fixed</h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            {BUILDER_INCENTIVES.map((item, i) => (
              <div key={i} style={{ background: '#FFFFFF', borderRadius: '10px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '20px', flexShrink: 0 }}>{item.negotiable ? '🤝' : '🔒'}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#1E293B' }}>{item.incentive}</div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: item.negotiable ? '#16A34A' : '#DC2626', background: item.negotiable ? '#DCFCE7' : '#FEE2E2', padding: '2px 8px', borderRadius: '10px' }}>
                        {item.negotiable ? 'Negotiable' : 'Builder Fixed'}
                      </span>
                      <span style={{ fontSize: '13px', color: '#64748B', fontWeight: '600' }}>{item.typical}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748B' }}>{item.notes}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1E3A5F', marginBottom: '12px' }}>🛠️ Builder Warranty Breakdown (1-2-10 Year)</h2>
          <div style={{ background: '#FEF3C7', borderRadius: '10px', padding: '14px 20px', marginBottom: '16px', border: '1px solid #F59E0B' }}>
            <div style={{ fontSize: '13px', color: '#92400E' }}>💡 <strong>Pro tip:</strong> Schedule your 11-month walkthrough at month 10.5 - builders slow down warranty work near expiration. Document everything in writing.</div>
          </div>
          <div style={{ display: 'grid', gap: '12px' }}>
            {WARRANTY_BREAKDOWN.map((w, i) => (
              <div key={i} style={{ background: '#FFFFFF', borderRadius: '10px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'grid', gridTemplateColumns: '80px 1fr 1fr 1fr', gap: '12px', alignItems: 'start' }}>
                <div style={{ background: '#1E3A5F', color: '#F5E642', padding: '6px 10px', borderRadius: '8px', fontSize: '13px', fontWeight: '800', textAlign: 'center' }}>{w.year}</div>
                <div>
                  <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '4px' }}>COVERS</div>
                  <div style={{ fontSize: '13px', color: '#374151', fontWeight: '600' }}>{w.covers}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '4px' }}>EXAMPLES</div>
                  <div style={{ fontSize: '13px', color: '#64748B' }}>{w.examples}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '4px' }}>ACTION</div>
                  <div style={{ fontSize: '13px', color: '#16A34A' }}>{w.action}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1E3A5F', marginBottom: '20px' }}>📊 Phase Risk Analysis</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            {PHASE_RISKS.map((p, i) => (
              <div key={i} style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: `4px solid ${p.risk === 'High' ? '#EF4444' : p.risk === 'Medium' ? '#F59E0B' : '#22C55E'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#1E293B' }}>{p.phase}</div>
                  <span style={{ fontSize: '12px', fontWeight: '700', padding: '3px 12px', borderRadius: '12px', background: p.risk === 'High' ? '#FEE2E2' : p.risk === 'Medium' ? '#FEF3C7' : '#DCFCE7', color: p.risk === 'High' ? '#DC2626' : p.risk === 'Medium' ? '#D97706' : '#16A34A' }}>
                    {p.risk} Risk
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#16A34A', marginBottom: '8px' }}>PROS</div>
                    {p.pros.map((pr, j) => <div key={j} style={{ fontSize: '13px', color: '#64748B', marginBottom: '4px' }}>+ {pr}</div>)}
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#DC2626', marginBottom: '8px' }}>CONS</div>
                    {p.cons.map((c, j) => <div key={j} style={{ fontSize: '13px', color: '#64748B', marginBottom: '4px' }}>- {c}</div>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: '#FFFFFF', borderRadius: '16px', padding: '32px', marginBottom: '40px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1E3A5F', marginBottom: '8px' }}>🧮 True Monthly Cost Calculator</h2>
          <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>MUD district taxes in outer DFW suburbs can add $200-500/month. Calculate your real cost.</p>

          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#374151' }}>
            Home Price: <strong style={{ color: '#1E3A5F' }}>${basePrice.toLocaleString()}</strong>
          </label>
          <input type="range" min={300000} max={1200000} step={10000} value={basePrice} onChange={e => setBasePrice(Number(e.target.value))}
            style={{ width: '100%', marginBottom: '20px', accentColor: '#1E3A5F' }} />

          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#374151' }}>
            MUD District Tax Rate: <strong style={{ color: '#1E3A5F' }}>{mudRate}%</strong> of assessed value
          </label>
          <input type="range" min={0} max={2} step={0.1} value={mudRate} onChange={e => setMudRate(Number(e.target.value))}
            style={{ width: '100%', marginBottom: '20px', accentColor: '#1E3A5F' }} />

          <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', color: '#374151' }}>Development Phase:</label>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {[{ v: 1, l: 'Phase 1 (First lots)' }, { v: 2, l: 'Phase 2-3 (Mid)' }, { v: 3, l: 'Phase 4+ (Late)' }].map(opt => (
              <button key={opt.v} onClick={() => setPhase(opt.v)}
                style={{ padding: '8px 16px', borderRadius: '8px', border: '2px solid', fontSize: '13px', cursor: 'pointer',
                  background: phase === opt.v ? '#1E3A5F' : 'transparent',
                  color: phase === opt.v ? '#F5E642' : '#94A3B8',
                  borderColor: phase === opt.v ? '#1E3A5F' : '#E2E8F0' }}>
                {opt.l}
              </button>
            ))}
          </div>

          <button onClick={() => setResult(calculateTrueCost(basePrice, mudRate, phase))}
            style={{ background: '#1E3A5F', color: '#F5E642', border: 'none', borderRadius: '8px', padding: '12px 28px', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}>
            Calculate True Monthly Cost
          </button>

          {result && (
            <div style={{ marginTop: '24px', padding: '20px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#1E3A5F', marginBottom: '8px' }}>~${result.monthly.toLocaleString()}/month</div>
              <div style={{ fontSize: '14px', color: '#DC2626', marginBottom: '8px', fontWeight: '600' }}>
                MUD tax contributing: ${result.mudMonthly.toLocaleString()}/mo
              </div>
              <div style={{ fontSize: '13px', color: '#64748B', borderTop: '1px solid #E2E8F0', paddingTop: '12px' }}>
                🏠 {result.comparison}
              </div>
            </div>
          )}
        </section>

        <div style={{ background: '#FFFFFF', borderRadius: '10px', padding: '20px', fontSize: '13px', color: '#94A3B8', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          📋 MUD districts are governed by the Texas Water Code Chapter 49. Buyers must receive a MUD disclosure at least 3 days before closing. Always verify the MUD tax rate with the district directly - rates change as the district retires bond debt.
        </div>
      </div>
    </div>
  );
}
