import { useState } from 'react';

const roomTypes = ['Bedroom', 'Living Room', 'Kitchen', 'Bathroom', 'Garage', 'Office', 'Dining Room', 'Hallway'];
const bulbTypes = ['Incandescent', 'CFL (Compact Fluorescent)', 'Halogen', 'Already LED'];

const smartSystems = [
  { name: 'Lutron Caseta', price: '$60–$80/switch', app: true, hub: 'Required ($80)', dimmer: true, note: 'Most reliable, works with any bulb, no neutral wire needed' },
  { name: 'Philips Hue', price: '$50–$200/kit', app: true, hub: 'Required ($60)', dimmer: true, note: 'Best color options, enormous ecosystem, higher upfront cost' },
  { name: 'Kasa Smart (TP-Link)', price: '$18–$30/switch', app: true, hub: 'None needed', dimmer: true, note: 'Best budget option, no hub, works great, requires neutral wire' },
  { name: 'Leviton Decora', price: '$35–$55/switch', app: true, hub: 'Optional', dimmer: true, note: 'Contractor favorite, reliable, good for whole-home builds' },
];

function calcSavings(rooms: string[], bulbType: string) {
  const count = rooms.length;
  if (count === 0 || !bulbType) return null;

  const avgBulbsPerRoom: Record<string, number> = {
    Bedroom: 4, 'Living Room': 6, Kitchen: 8, Bathroom: 4, Garage: 4, Office: 4, 'Dining Room': 4, Hallway: 2,
  };

  const totalBulbs = rooms.reduce((sum, r) => sum + (avgBulbsPerRoom[r] || 4), 0);
  const wattsPerBulb: Record<string, number> = {
    Incandescent: 60, 'CFL (Compact Fluorescent)': 15, Halogen: 53, 'Already LED': 9,
  };

  const currentWatts = wattsPerBulb[bulbType] || 60;
  const ledWatts = 9;
  const hoursPerDay = 5;
  const daysPerYear = 365;
  const ratePerKwh = 0.12;

  const currentAnnual = (totalBulbs * currentWatts * hoursPerDay * daysPerYear) / 1000 * ratePerKwh;
  const ledAnnual = (totalBulbs * ledWatts * hoursPerDay * daysPerYear) / 1000 * ratePerKwh;
  const savings = currentAnnual - ledAnnual;

  const bulbCost = totalBulbs * 4;
  const recessedCost = rooms.includes('Kitchen') || rooms.includes('Living Room') ? rooms.length * 350 : rooms.length * 200;
  const payback = savings > 0 ? (bulbCost / savings).toFixed(1) : 'N/A';

  return {
    totalBulbs,
    annualSavings: savings.toFixed(0),
    bulbCost: bulbCost.toFixed(0),
    recessedCost: recessedCost.toFixed(0),
    payback,
    alreadyLed: bulbType === 'Already LED',
  };
}

export default function DFWLightingUpgradeGuide() {
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [bulbType, setBulbType] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calcSavings> | null>(null);

  function toggleRoom(room: string) {
    setSelectedRooms(prev => prev.includes(room) ? prev.filter(r => r !== room) : [...prev, room]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>💡</span>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: 0 }}>
            DFW Lighting Upgrade Guide
          </h1>
        </div>
        <p style={{ color: '#8A9AB5', fontSize: 16, marginBottom: 40 }}>
          DFW's long summers mean lights run longer indoors. LED upgrades pay back faster here than almost anywhere in Texas.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 40 }}>
          {[
            { icon: '💡', label: 'LED vs Incandescent', value: '85% less energy', sub: 'per bulb' },
            { icon: '⏱️', label: 'LED Lifespan', value: '15,000–25,000 hrs', sub: 'vs 1,000 incandescent' },
            { icon: '💰', label: 'Avg DFW Savings', value: '$150–$280/yr', sub: 'whole-home conversion' },
            { icon: '🌡️', label: 'Heat Reduction', value: 'Less heat generated', sub: 'reduces AC load in summer' },
          ].map(s => (
            <div key={s.label} style={{ background: '#111E35', borderRadius: 10, padding: 18, border: '1px solid #1E2D4A', textAlign: 'center' }}>
              <div style={{ fontSize: 26, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 15, marginBottom: 4 }}>{s.value}</div>
              <div style={{ color: '#8A9AB5', fontSize: 11 }}>{s.label} — {s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 40 }}>
          <div style={{ background: '#111E35', borderRadius: 12, padding: 24, border: '1px solid #1E2D4A' }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 12px' }}>🔩 Recessed Lighting Install</h2>
            <p style={{ color: '#8A9AB5', fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>
              The most popular DFW lighting upgrade — replacing dated fixtures with clean recessed cans. 
              New construction cuts add ~2 hours per light. Attic access makes it cheaper.
            </p>
            <div style={{ display: 'grid', gap: 8 }}>
              {[
                { label: 'Per recessed can (with attic access)', cost: '$75–$150' },
                { label: 'Per can (no attic, drywall patch)', cost: '$150–$250' },
                { label: 'Dimmer switch add-on', cost: '$30–$80 each' },
                { label: 'Full kitchen recessed (8 lights)', cost: '$800–$1,800' },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1E2D4A' }}>
                  <span style={{ color: '#8A9AB5', fontSize: 13 }}>{r.label}</span>
                  <span style={{ color: '#4ECDC4', fontWeight: 600, fontSize: 13 }}>{r.cost}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#111E35', borderRadius: 12, padding: 24, border: '1px solid #1E2D4A' }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 12px' }}>🏡 Outdoor Lighting (DFW)</h2>
            <p style={{ color: '#8A9AB5', fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>
              Security lighting reduces break-in risk by 39%. In DFW, outdoor lighting also extends 
              patio use after sunset during the long summer evenings.
            </p>
            <div style={{ display: 'grid', gap: 8 }}>
              {[
                { label: 'Motion sensor floodlight', cost: '$120–$300 installed' },
                { label: 'Landscape path lighting (6-pack)', cost: '$300–$600 installed' },
                { label: 'Soffit/eave lighting', cost: '$80–$150 per fixture' },
                { label: 'Smart outdoor plug (patio)', cost: '$25–$50 DIY' },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1E2D4A' }}>
                  <span style={{ color: '#8A9AB5', fontSize: 13 }}>{r.label}</span>
                  <span style={{ color: '#4ECDC4', fontWeight: 600, fontSize: 13 }}>{r.cost}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 40, border: '1px solid #1E2D4A' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>🤖 Smart Lighting Systems</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {smartSystems.map(s => (
              <div key={s.name} style={{ background: '#0A1628', borderRadius: 8, padding: 16, border: '1px solid #1E2D4A' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, color: '#E8EDF5', fontSize: 15 }}>{s.name}</span>
                  <span style={{ color: '#F5E642', fontWeight: 600, fontSize: 13 }}>{s.price}</span>
                </div>
                <div style={{ color: '#8A9AB5', fontSize: 12, marginBottom: 6 }}>Hub: {s.hub}</div>
                <div style={{ color: '#4ECDC4', fontSize: 12 }}>{s.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 28, border: '1px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, margin: '0 0 20px' }}>🧮 Calculate Your Savings</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#8A9AB5', fontSize: 13, display: 'block', marginBottom: 8 }}>Rooms to Upgrade (select all that apply)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {roomTypes.map(r => (
                <button key={r} onClick={() => toggleRoom(r)}
                  style={{ padding: '8px 16px', borderRadius: 20, border: '1px solid', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                    background: selectedRooms.includes(r) ? '#F5E642' : '#0A1628',
                    color: selectedRooms.includes(r) ? '#0A1628' : '#8A9AB5',
                    borderColor: selectedRooms.includes(r) ? '#F5E642' : '#1E2D4A' }}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#8A9AB5', fontSize: 13, display: 'block', marginBottom: 6 }}>Current Bulb Type</label>
            <select value={bulbType} onChange={e => setBulbType(e.target.value)}
              style={{ background: '#0A1628', border: '1px solid #1E2D4A', borderRadius: 8, color: '#E8EDF5', padding: '10px 14px', fontSize: 14, width: 280 }}>
              <option value="">Select bulb type</option>
              {bulbTypes.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <button onClick={() => setResult(calcSavings(selectedRooms, bulbType))}
            disabled={selectedRooms.length === 0 || !bulbType}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '12px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', opacity: selectedRooms.length === 0 || !bulbType ? 0.5 : 1 }}>
            Calculate Savings + Payback →
          </button>

          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 10, padding: 20, border: '1px solid #1E2D4A' }}>
              {result.alreadyLed ? (
                <div style={{ color: '#4ECDC4', fontSize: 16, fontWeight: 600 }}>✓ You're already on LED — great! Focus budget on smart controls for scheduling savings.</div>
              ) : (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: '#8A9AB5', fontSize: 12, marginBottom: 4 }}>Annual Energy Savings</div>
                      <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 24 }}>${result.annualSavings}</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: '#8A9AB5', fontSize: 12, marginBottom: 4 }}>Bulb Replacement Cost</div>
                      <div style={{ color: '#4ECDC4', fontWeight: 800, fontSize: 24 }}>${result.bulbCost}</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: '#8A9AB5', fontSize: 12, marginBottom: 4 }}>Payback Period</div>
                      <div style={{ color: '#E8EDF5', fontWeight: 800, fontSize: 24 }}>{result.payback} yrs</div>
                    </div>
                  </div>
                  <div style={{ color: '#8A9AB5', fontSize: 13 }}>
                    {result.totalBulbs} total bulbs across {selectedRooms.length} room(s). 
                    If adding recessed fixtures: estimated ${result.recessedCost} installed.
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <p style={{ color: '#8A9AB5', fontSize: 13 }}>Find licensed DFW electricians for lighting upgrades on ProLnk</p>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '14px 36px', borderRadius: 8, border: 'none', cursor: 'pointer', marginTop: 12 }}>
            Get Free Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
