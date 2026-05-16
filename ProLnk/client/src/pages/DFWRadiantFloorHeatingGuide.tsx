import { useState } from 'react';

const roomData = {
  master_bath: {
    label: 'Master Bathroom',
    recommended: 'electric',
    feasibility: 'High',
    note: 'Best ROI for radiant in DFW. Small area = low operating cost. Heated floors in master bath add resale value.',
    sqft: 80,
    installCost: { electric: '$800–$1,600', hydronic: '$4,000–$7,000' },
    opCost: { electric: '$8–$18/mo', hydronic: '$12–$25/mo' },
  },
  sunroom: {
    label: 'Sunroom / Florida Room',
    recommended: 'electric',
    feasibility: 'Medium',
    note: 'DFW sunrooms get cold in winter. Electric radiant provides comfort without full HVAC ducts. ROI is moderate.',
    sqft: 200,
    installCost: { electric: '$2,000–$4,000', hydronic: '$8,000–$15,000' },
    opCost: { electric: '$20–$45/mo', hydronic: '$30–$60/mo' },
  },
  garage: {
    label: 'Heated Garage / Workshop',
    recommended: 'hydronic',
    feasibility: 'Medium',
    note: 'Hydronic makes sense for large workshops in DFW. Electric costs get high in 3-car garages. Short DFW season limits full ROI.',
    sqft: 600,
    installCost: { electric: '$6,000–$12,000', hydronic: '$15,000–$28,000' },
    opCost: { electric: '$60–$120/mo', hydronic: '$45–$90/mo' },
  },
  whole_home: {
    label: 'Whole Home',
    recommended: 'hydronic',
    feasibility: 'Low',
    note: 'Not recommended for DFW. Only ~60 heating days/year means ROI payback is 40+ years. Consider if building new construction and future-proofing.',
    sqft: 2500,
    installCost: { electric: '$25,000–$50,000', hydronic: '$30,000–$65,000' },
    opCost: { electric: '$250–$500/mo', hydronic: '$150–$300/mo' },
  },
};

const feasibilityColor: Record<string, string> = {
  High: '#22C55E',
  Medium: '#F59E0B',
  Low: '#EF4444',
};

export default function DFWRadiantFloorHeatingGuide() {
  const [room, setRoom] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<null | typeof roomData.master_bath>(null);
  const [system, setSystem] = useState<'electric' | 'hydronic'>('electric');

  function calculate() {
    if (!room) return;
    const data = roomData[room as keyof typeof roomData];
    setResult(data);
    setSystem(budget === 'low' ? 'electric' : (data.recommended as 'electric' | 'hydronic'));
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600 }}>DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.2 }}>
          🌡️ DFW Radiant Floor Heating Guide
        </h1>
        <p style={{ color: '#94A3B8', margin: '0 0 28px', lineHeight: 1.6 }}>
          Radiant heating is a luxury in DFW — not a necessity. With only ~60 heating days per year, whole-home ROI rarely pencils out. Here's where it actually makes sense.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          <div style={{ background: '#1E2D45', borderRadius: 12, padding: '18px 20px' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>💧</div>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Hydronic Radiant</div>
            <p style={{ color: '#94A3B8', fontSize: 13, margin: 0, lineHeight: 1.5 }}>Hot water circulates through tubing under floor. Cheapest to operate but expensive to install. Best for new construction or major remodels in DFW.</p>
          </div>
          <div style={{ background: '#1E2D45', borderRadius: 12, padding: '18px 20px' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>⚡</div>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Electric Radiant</div>
            <p style={{ color: '#94A3B8', fontSize: 13, margin: 0, lineHeight: 1.5 }}>Heating cables or mats under tile/floor. Higher operating cost but 5–10x cheaper to install. Perfect for DFW bathrooms and small spaces.</p>
          </div>
        </div>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '14px 18px', marginBottom: 28, fontWeight: 700, fontSize: 14 }}>
          🌡️ DFW Climate Reality: Average winter temps stay 35–55°F. Radiant for whole home = 40+ year payback. Master bath = 8–12 year payback.
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 DFW Radiant Feasibility Check</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 6 }}>ROOM / AREA</label>
            <select value={room} onChange={e => setRoom(e.target.value)} style={{ width: '100%', padding: '10px', background: '#1E2D45', border: '1px solid #2D4060', borderRadius: 8, color: '#E8EDF5', fontSize: 14 }}>
              <option value="">Select room...</option>
              <option value="master_bath">Master Bathroom</option>
              <option value="sunroom">Sunroom / Florida Room</option>
              <option value="garage">Heated Garage / Workshop</option>
              <option value="whole_home">Whole Home</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 6 }}>BUDGET RANGE</label>
            <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', padding: '10px', background: '#1E2D45', border: '1px solid #2D4060', borderRadius: 8, color: '#E8EDF5', fontSize: 14 }}>
              <option value="">Select budget...</option>
              <option value="low">Lower Cost (Electric preferred)</option>
              <option value="high">Best System (No budget limit)</option>
            </select>
          </div>
        </div>
        <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', marginBottom: 28 }}>
          Check Feasibility →
        </button>

        {result && (
          <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 28, border: `2px solid ${feasibilityColor[result.feasibility]}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>ASSESSMENT FOR</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>{result.label}</h3>
              </div>
              <div style={{ background: feasibilityColor[result.feasibility], color: '#0A1628', borderRadius: 20, padding: '4px 14px', fontWeight: 700, fontSize: 13 }}>
                {result.feasibility} ROI
              </div>
            </div>
            <p style={{ color: '#94A3B8', margin: '0 0 20px', fontSize: 14, lineHeight: 1.6 }}>{result.note}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {(['electric', 'hydronic'] as const).map(s => (
                <div key={s} style={{ background: '#0A1628', borderRadius: 10, padding: 16, border: s === system ? '2px solid #F5E642' : '2px solid transparent' }}>
                  <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 6 }}>{s === 'electric' ? '⚡ ELECTRIC' : '💧 HYDRONIC'}{s === result.recommended ? ' ⭐ RECOMMENDED' : ''}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Install: {result.installCost[s]}</div>
                  <div style={{ color: '#F5E642', fontSize: 13 }}>Operating: {result.opCost[s]}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📍 DFW Radiant: Where It Makes Sense</h2>
        <div style={{ display: 'grid', gap: 10 }}>
          {Object.values(roomData).map(r => (
            <div key={r.label} style={{ background: '#1E2D45', borderRadius: 10, padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700 }}>{r.label}</div>
                <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>Recommended: {r.recommended === 'electric' ? 'Electric' : 'Hydronic'}</div>
              </div>
              <div style={{ background: feasibilityColor[r.feasibility], color: '#0A1628', borderRadius: 16, padding: '3px 12px', fontWeight: 700, fontSize: 12 }}>
                {r.feasibility} ROI
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
