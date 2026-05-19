import { useState } from 'react';

const OWNER_VS_HOA = [
  { item: 'Interior walls and flooring', owner: true, hoa: false },
  { item: 'HVAC unit (inside your unit)', owner: true, hoa: false },
  { item: 'Plumbing inside unit walls', owner: true, hoa: false },
  { item: 'Electrical panel and wiring inside unit', owner: true, hoa: false },
  { item: 'Windows and exterior doors', owner: false, hoa: true },
  { item: 'Roof and exterior envelope', owner: false, hoa: true },
  { item: 'Common area hallways and lobbies', owner: false, hoa: true },
  { item: 'Elevators and stairwells', owner: false, hoa: true },
  { item: 'Pool and fitness center', owner: false, hoa: true },
  { item: 'Balcony structure', owner: false, hoa: true },
  { item: 'Balcony surface and railing maintenance', owner: true, hoa: false },
  { item: 'Plumbing in shared walls (origin point)', owner: false, hoa: true },
];

const INSURANCE_COMPARISON = [
  { category: 'Structure', ho6: 'Interior walls, floors, ceilings from studs in', master: 'Building structure and exterior' },
  { category: 'Personal Property', ho6: 'Furniture, electronics, clothing, appliances', master: 'Not covered' },
  { category: 'Liability', ho6: 'Injuries inside your unit', master: 'Common area injuries' },
  { category: 'Loss of Use', ho6: 'Hotel costs if unit is uninhabitable', master: 'Not covered' },
  { category: 'Special Assessments', ho6: 'Add rider for up to $50K coverage', master: 'Not covered' },
];

const NEIGHBOR_RISKS = [
  { risk: 'Water leak from unit above', action: 'Report to management immediately; document with photos; HOA master policy may cover structural damage' },
  { risk: 'HVAC condensate line overflow', action: 'Your unit, your problem - install float switch ($30) to prevent; most common condo water damage source in DFW' },
  { risk: 'Noisy HVAC vibration', action: 'Submit maintenance request; if affects structure, HOA must address within building code standards' },
  { risk: 'Pest intrusion through shared walls', action: 'Shared responsibility - document and report; HOA handles common area, you handle unit interior' },
];

function estimateCosts(age: number, hoaFee: number): { annualOwner: number; hoaCovers: string[]; ownerCovers: string[]; note: string } {
  const baseOwner = age < 5 ? 800 : age < 15 ? 1800 : age < 25 ? 3200 : 5000;
  const hoaCovers = ['Roof replacement reserve', 'Exterior painting', 'Common area repairs', 'Elevator maintenance'];
  const ownerCovers = ['HVAC filters and service ($150-300/yr)', 'Interior paint and flooring', 'Appliance replacement', 'HO-6 insurance premium ($400-900/yr)'];
  const assessmentRisk = hoaFee < 300 ? 'HIGH - low fees often indicate underfunded reserves' : hoaFee < 500 ? 'MODERATE' : 'LOW - well-funded reserve likely';
  return { annualOwner: baseOwner, hoaCovers, ownerCovers, note: `Special assessment risk: ${assessmentRisk}` };
}

export default function DFWCondoMaintenanceGuide() {
  const [condoAge, setCondoAge] = useState(10);
  const [hoaFee, setHoaFee] = useState(350);
  const [result, setResult] = useState<{ annualOwner: number; hoaCovers: string[]; ownerCovers: string[]; note: string } | null>(null);

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', color: '#1E293B', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #0A1628 100%)', padding: '48px 24px 32px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: '13px', color: '#F5E642', letterSpacing: '2px', marginBottom: '12px' }}>🏢 DFW CONDO SERIES</div>
          <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#FFFFFF', margin: '0 0 12px' }}>DFW Condo Maintenance Guide</h1>
          <p style={{ fontSize: '16px', color: '#94A3B8', margin: '0', maxWidth: '620px' }}>
            What you own vs what the HOA covers, insurance gaps, special assessments, and real costs of DFW condo ownership.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1E3A5F', marginBottom: '20px' }}>🏠 Owner vs HOA Responsibility</h2>
          <div style={{ background: '#FFFFFF', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px', background: '#1E3A5F', padding: '12px 20px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#F5E642′ }}>Item</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#F5E642', textAlign: 'center' }}>Owner</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#F5E642', textAlign: 'center' }}>HOA</span>
            </div>
            {OWNER_VS_HOA.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px', padding: '12px 20px', borderBottom: '1px solid #F1F5F9', background: i % 2 === 0 ? '#FFFFFF' : '#F8FAFC' }}>
                <span style={{ fontSize: '14px', color: '#374151′ }}>{row.item}</span>
                <span style={{ textAlign: 'center', fontSize: '16px' }}>{row.owner ? '✅' : ''}</span>
                <span style={{ textAlign: 'center', fontSize: '16px' }}>{row.hoa ? '✅' : ''}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1E3A5F', marginBottom: '20px' }}>🛡️ HO-6 vs HOA Master Policy</h2>
          <div style={{ display: 'grid', gap: '10px' }}>
            {INSURANCE_COMPARISON.map((row, i) => (
              <div key={i} style={{ background: '#FFFFFF', borderRadius: '10px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'grid', gridTemplateColumns: '140px 1fr 1fr', gap: '12px', alignItems: 'start' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#1E3A5F' }}>{row.category}</div>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '4px' }}>Your HO-6</div>
                  <div style={{ fontSize: '13px', color: '#374151′ }}>{row.ho6}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '4px' }}>HOA Master Policy</div>
                  <div style={{ fontSize: '13px', color: '#374151′ }}>{row.master}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1E3A5F', marginBottom: '20px' }}>⚠️ Neighbor-Related Maintenance Risks</h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            {NEIGHBOR_RISKS.map((r, i) => (
              <div key={i} style={{ background: '#FFFFFF', borderRadius: '10px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#DC2626', marginBottom: '8px' }}>⚠️ {r.risk}</div>
                <div style={{ fontSize: '13px', color: '#64748B' }}>{r.action}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: '#FFFFFF', borderRadius: '16px', padding: '32px', marginBottom: '40px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1E3A5F', marginBottom: '8px' }}>🧮 Annual Maintenance Cost Estimator</h2>
          <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>Enter your condo age and HOA fee to estimate your annual owner-responsibility costs.</p>

          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#374151′ }}>
            Condo Age: <strong style={{ color: '#1E3A5F' }}>{condoAge} years old</strong>
          </label>
          <input type="range" min={1} max={40} step={1} value={condoAge} onChange={e => setCondoAge(Number(e.target.value))}
            style={{ width: '100%', marginBottom: '20px', accentColor: '#F5E642′ }} />

          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#374151′ }}>
            Monthly HOA Fee: <strong style={{ color: '#1E3A5F' }}>${hoaFee}/mo</strong>
          </label>
          <input type="range" min={150} max={800} step={25} value={hoaFee} onChange={e => setHoaFee(Number(e.target.value))}
            style={{ width: '100%', marginBottom: '24px', accentColor: '#F5E642′ }} />

          <button onClick={() => setResult(estimateCosts(condoAge, hoaFee))}
            style={{ background: '#1E3A5F', color: '#F5E642', border: 'none', borderRadius: '8px', padding: '12px 28px', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}>
            Estimate My Costs
          </button>

          {result && (
            <div style={{ marginTop: '24px', padding: '20px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0′ }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#1E3A5F', marginBottom: '16px' }}>
                ~${result.annualOwner.toLocaleString()}/year your responsibility
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#22C55E', marginBottom: '8px' }}>✅ HOA Covers</div>
                  {result.hoaCovers.map((c, i) => <div key={i} style={{ fontSize: '13px', color: '#64748B', marginBottom: '4px' }}>• {c}</div>)}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#DC2626', marginBottom: '8px' }}>📦 You Cover</div>
                  {result.ownerCovers.map((c, i) => <div key={i} style={{ fontSize: '13px', color: '#64748B', marginBottom: '4px' }}>• {c}</div>)}
                </div>
              </div>
              <div style={{ background: '#FEF3C7', borderRadius: '8px', padding: '12px 16px', fontSize: '13px', color: '#92400E' }}>
                ⚠️ {result.note}
              </div>
            </div>
          )}
        </section>

        <div style={{ background: '#FFFFFF', borderRadius: '10px', padding: '20px', fontSize: '13px', color: '#94A3B8', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          📋 Special assessments in Texas are governed by the Texas Uniform Condominium Act (TUCA), Chapter 82, Property Code. Always request the HOA reserve study before purchasing.
        </div>
      </div>
    </div>
  );
}
