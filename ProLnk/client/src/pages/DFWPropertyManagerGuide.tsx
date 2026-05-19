import { useState } from 'react';

const feeTypes = [
  { type: 'Monthly Management', flat: '$150–300/unit', percentage: '8–12% of rent', notes: 'Core fee — what they charge to manage day-to-day' },
  { type: 'Leasing Fee', flat: '$200–500', percentage: '50–100% of 1st month', notes: 'Charged when they find a new tenant' },
  { type: 'Lease Renewal Fee', flat: '$100–200', percentage: '25–50% of 1st month', notes: 'Sometimes waived by better managers' },
  { type: 'Maintenance Markup', flat: '10–15%', percentage: '10–20% of repair cost', notes: 'Margin on contractor work — negotiate cap' },
  { type: 'Vacancy Fee', flat: 'Some charge $50–100/mo', percentage: 'N/A', notes: 'Red flag if charged during vacancy' },
  { type: 'Eviction Fee', flat: '$200–500', percentage: 'Varies', notes: 'Flat fee to manage eviction process' },
];

const redFlags = [
  'No NARPM certification or verifiable license',
  'Charges fees during vacancy',
  'Vague or verbal-only contracts',
  'Cannot provide owner statements on demand',
  'Slow to respond to your initial inquiry',
  'No online owner portal for real-time visibility',
  'References unavailable or all from one property',
  'Pushes in-house contractors exclusively',
];

const interviewQuestions = [
  'How many units do you currently manage?',
  'What is your average days-to-lease in DFW right now?',
  'How do you handle maintenance requests after hours?',
  'Do you use in-house or vetted third-party contractors?',
  'What owner reporting do I receive and how often?',
  'How do you handle evictions and what do you charge?',
  'Can I speak with 3 current owners you manage for?',
  'What is your lease termination policy if I sell?',
];

const unitTypeBase: Record<string, number> = {
  singleFamily: 220,
  multiFamily: 160,
  condo: 200,
  commercial: 350,
};

export default function DFWPropertyManagerGuide() {
  const [unitCount, setUnitCount] = useState(1);
  const [unitType, setUnitType] = useState('singleFamily');
  const [monthlyRent, setMonthlyRent] = useState(2000);

  const base = unitTypeBase[unitType] || 200;
  const flatLow = base * unitCount;
  const flatHigh = Math.round(base * unitCount * 1.4);
  const pctLow = Math.round(monthlyRent * 0.08 * unitCount);
  const pctHigh = Math.round(monthlyRent * 0.12 * unitCount);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🏢</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>DFW Property Manager Guide</h1>
        <p style={{ fontSize: 18, color: '#8899AA', maxWidth: 640, margin: '0 auto' }}>How to find, vet, and hire the right property manager in the Dallas-Fort Worth market</p>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ background: '#112240', borderRadius: 16, padding: 32, margin: '32px 0', border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginBottom: 16 }}>🎓 NARPM Certification — Why It Matters</h2>
          <p style={{ color: '#B0C0D0', lineHeight: 1.7 }}>The National Association of Residential Property Managers (NARPM) offers three credentials: <strong style={{ color: '#F5E642′ }}>RMP</strong> (Residential Management Professional), <strong style={{ color: '#F5E642' }}>MPM</strong> (Master Property Manager), and <strong style={{ color: '#F5E642' }}>CRMC</strong> (company certification). NARPM-certified managers in DFW have demonstrated ethical standards and ongoing education. Texas also requires a real estate license to manage properties — verify at TREC.texas.gov.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, margin: '32px 0', border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>💰 Fee Structure Breakdown</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #F5E642′ }}>
                  {['Fee Type', 'Flat Rate', 'Percentage', 'Notes'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 12px', color: '#F5E642', fontSize: 13 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {feeTypes.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #1E3A5F', background: i % 2 === 0 ? 'transparent' : '#0D1F38′ }}>
                    <td style={{ padding: '10px 12px', color: '#E8EDF5', fontWeight: 600, fontSize: 14 }}>{row.type}</td>
                    <td style={{ padding: '10px 12px', color: '#F5E642', fontSize: 14 }}>{row.flat}</td>
                    <td style={{ padding: '10px 12px', color: '#4ADE80', fontSize: 14 }}>{row.percentage}</td>
                    <td style={{ padding: '10px 12px', color: '#8899AA', fontSize: 13 }}>{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, margin: '32px 0', border: '2px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🧮 Monthly Cost Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#8899AA', fontSize: 13, marginBottom: 6 }}>Property Type</label>
              <select value={unitType} onChange={e => setUnitType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', fontSize: 14 }}>
                <option value="singleFamily">Single Family</option>
                <option value="multiFamily">Multi-Family</option>
                <option value="condo">Condo</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#8899AA', fontSize: 13, marginBottom: 6 }}>Number of Units</label>
              <input type="number" min={1} max={100} value={unitCount} onChange={e => setUnitCount(Math.max(1, parseInt(e.target.value) || 1))} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#8899AA', fontSize: 13, marginBottom: 6 }}>Monthly Rent/Unit ($)</label>
              <input type="number" min={500} max={10000} step={50} value={monthlyRent} onChange={e => setMonthlyRent(parseFloat(e.target.value) || 0)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#8899AA', fontSize: 13 }}>Flat Rate (estimated)</div>
              <div style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0′ }}>${flatLow}–${flatHigh}/mo</div>
              <div style={{ color: '#8899AA', fontSize: 12 }}>Fixed monthly regardless of rent</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#8899AA', fontSize: 13 }}>Percentage Rate (8–12%)</div>
              <div style={{ color: '#4ADE80', fontSize: 28, fontWeight: 800, margin: '8px 0′ }}>${pctLow}–${pctHigh}/mo</div>
              <div style={{ color: '#8899AA', fontSize: 12 }}>Based on monthly rent collected</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div style={{ background: '#112240', borderRadius: 16, padding: 28, border: '1px solid #F87171′ }}>
            <h2 style={{ color: '#F87171', fontSize: 18, fontWeight: 700, marginBottom: 14 }}>🚩 Red Flags to Avoid</h2>
            {redFlags.map((flag, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                <span style={{ color: '#F87171', fontSize: 16 }}>✗</span>
                <span style={{ color: '#B0C0D0', fontSize: 14 }}>{flag}</span>
              </div>
            ))}
          </div>
          <div style={{ background: '#112240', borderRadius: 16, padding: 28, border: '1px solid #4ADE80′ }}>
            <h2 style={{ color: '#4ADE80', fontSize: 18, fontWeight: 700, marginBottom: 14 }}>💬 Interview Questions</h2>
            {interviewQuestions.map((q, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                <span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>{i + 1}.</span>
                <span style={{ color: '#B0C0D0', fontSize: 14 }}>{q}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
