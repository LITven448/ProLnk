import { useState } from 'react';

const COST_DATA: Record<string, { min: number; max: number; permit: string; roi: string }> = {
  'above-existing': { min: 15000, max: 25000, permit: 'Building + Plumbing', roi: '+$18,000–28,000 value', },
  'new-location': { min: 22000, max: 35000, permit: 'Building + Plumbing + Structural', roi: '+$20,000–35,000 value' },
  'garage-conversion': { min: 18000, max: 28000, permit: 'Building + Plumbing + Change-of-Use', roi: '+$15,000–25,000 value' },
};

const FEASIBILITY: Record<string, string> = {
  '3bed-1bath': '✅ High feasibility — adds significant resale value in DFW market',
  '3bed-2bath': '⚠️ Moderate feasibility — less urgent but adds convenience',
  '4bed-1bath': '✅ High feasibility — 4-bed/1-bath is rare, strong ROI',
  '4bed-2bath': '⚠️ Lower urgency — market expects 2 baths for this size',
};

export default function DFWFullBathAdditionGuide() {
  const [location, setLocation] = useState('');
  const [homeCfg, setHomeCfg] = useState('');
  const [result, setResult] = useState<null | { cost: string; permit: string; roi: string; feasibility: string }>(null);

  function calculate() {
    if (!location || !homeCfg) return;
    const data = COST_DATA[location];
    const feasibility = FEASIBILITY[homeCfg] ?? '⚠️ Assess with a licensed contractor';
    setResult({
      cost: `$${data.min.toLocaleString()} – $${data.max.toLocaleString()}`,
      permit: data.permit,
      roi: data.roi,
      feasibility,
    });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Adding a Full Bathroom in DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>
          A full bath addition is one of the highest-ROI projects in DFW — especially for 3-bed/1-bath homes. Here's what you need to know before you break ground.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📋 DFW Cost Overview</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[['Above existing plumbing', '$15,000 – $25,000', 'Easiest path — stack over kitchen or laundry'],
              ['New location / rough-in', '$22,000 – $35,000', 'Requires new supply & drain runs'],
              ['Garage conversion bath', '$18,000 – $28,000', 'Change-of-use permit required in most DFW cities'],
            ].map(([label, cost, note]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontWeight: 600 }}>{label}</div>
                <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 700 }}>{cost}</div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>{note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔧 DFW Permit Requirements</h2>
          <ul style={{ color: '#CBD5E1', lineHeight: 2, paddingLeft: 20 }}>
            <li>Building permit required in all DFW municipalities</li>
            <li>Plumbing permit for all new supply/drain work</li>
            <li>Inspections: rough-in, insulation, final</li>
            <li>Most cities require licensed plumber (not DIY)</li>
            <li>Processing time: 1–3 weeks depending on city</li>
          </ul>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🧮 Feasibility & Cost Estimator</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#94A3B8' }}>Current home configuration</label>
              <select value={homeCfg} onChange={e => setHomeCfg(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 15 }}>
                <option value="">Select beds/baths</option>
                <option value="3bed-1bath">3 bed / 1 bath</option>
                <option value="3bed-2bath">3 bed / 2 bath</option>
                <option value="4bed-1bath">4 bed / 1 bath</option>
                <option value="4bed-2bath">4 bed / 2 bath</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#94A3B8' }}>Proposed addition location</label>
              <select value={location} onChange={e => setLocation(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 15 }}>
                <option value="">Select location type</option>
                <option value="above-existing">Above existing plumbing</option>
                <option value="new-location">New location / rough-in</option>
                <option value="garage-conversion">Garage conversion</option>
              </select>
            </div>
            <button onClick={calculate}
              style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, padding: '14px 0', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
              Get Estimate →
            </button>
          </div>
          {result && (
            <div style={{ marginTop: 20, display: 'grid', gap: 12 }}>
              {[['💰 Estimated Cost', result.cost], ['📋 Permits Required', result.permit], ['📈 Expected Value Add', result.roi], ['✅ Feasibility', result.feasibility]].map(([label, val]) => (
                <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                  <div style={{ color: '#94A3B8', fontSize: 13 }}>{label}</div>
                  <div style={{ fontWeight: 600, marginTop: 4 }}>{val}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 18 }}>Get 3 quotes from DFW licensed plumbers</div>
          <div style={{ color: '#0A1628', fontSize: 14, marginTop: 6 }}>ProLnk matches you with vetted DFW contractors — free, no obligation</div>
        </div>
      </div>
    </div>
  );
}
