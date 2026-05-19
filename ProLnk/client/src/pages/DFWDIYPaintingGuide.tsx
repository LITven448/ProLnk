import { useState } from 'react';

const ROOMS = ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Hallway', 'Dining Room'];
const CONDITIONS = ['Good (minor scuffs)', 'Fair (some stains/damage)', 'Poor (holes, peeling, heavy damage)'];

function getSupplyList(rooms: string[], condition: string) {
  const base = ['Painter tape (2 rolls/room)', 'Drop cloths', '2″ angled brush', '9″ roller cover (eggshell)', 'Roller frame + extension pole', 'Paint tray', 'Sandpaper (120 grit)', 'Tack cloth'];
  if (condition.startsWith('Fair')) base.push('Spackling compound', 'Putty knife');
  if (condition.startsWith('Poor')) base.push('Drywall patch kit', 'Joint compound', 'Mesh tape', 'Primer (1 gal/room)');
  else base.push('Primer (1 gal per 2 rooms)');
  return base;
}

function getEstimates(roomCount: number, condition: string) {
  const baseHours = condition.startsWith('Poor') ? 6 : condition.startsWith('Fair') ? 4.5 : 3;
  const hours = roomCount * baseHours;
  const paintGal = roomCount * 2;
  const primerGal = condition.startsWith('Poor') ? roomCount : Math.ceil(roomCount / 2);
  const cost = paintGal * 45 + primerGal * 30 + roomCount * 15;
  const skill = condition.startsWith('Poor') ? 'Intermediate' : 'Beginner';
  return { hours, cost, skill, paintGal, primerGal };
}

export default function DFWDIYPaintingGuide() {
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [condition, setCondition] = useState('');
  const [showResults, setShowResults] = useState(false);

  const toggleRoom = (room: string) => {
    setSelectedRooms(prev => prev.includes(room) ? prev.filter(r => r !== room) : [...prev, room]);
  };

  const est = condition && selectedRooms.length > 0 ? getEstimates(selectedRooms.length, condition) : null;
  const supplies = condition && selectedRooms.length > 0 ? getSupplyList(selectedRooms, condition) : [];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px 0′ }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '48px 24px 36px', borderBottom: '2px solid #F5E642′ }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🖌️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 10px' }}>DFW DIY Interior Painting Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>DFW-specific tips for prep, humidity timing, primer selection, and knowing when to call a pro.</p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 14px' }}>⚠️ DFW Humidity Rule</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>Never paint when outdoor humidity exceeds 70% — paint blisters and won't adhere properly. DFW spring and early fall can spike humidity unexpectedly. Check weather before starting.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 14px' }}>📋 Prep Is 70% of the Job</h2>
          {[
            ['1', 'Clean walls with TSP substitute — DFW dust and grease accumulate fast in HVAC-heavy homes'],
            ['2', 'Fill all holes and cracks with spackling; sand smooth when dry'],
            ['3', 'Sand glossy surfaces with 120 grit so primer adheres'],
            ['4', 'Tape trim, outlets, and ceiling edges — DFW older homes have uneven trim gaps'],
            ['5', 'Lay drop cloths; tape seams together for full coverage'],
          ].map(([n, tip]) => (
            <div key={n} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
              <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{n}</div>
              <p style={{ color: '#cbd5e1', margin: 0, lineHeight: 1.6 }}>{tip}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 14px' }}>🏠 Primer Is Non-Negotiable in DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              ['Older DFW Homes (pre-1990)', 'Use high-hide primer — off-gassing and stains bleed through without it'],
              ['Dark to Light Color', 'Tinted primer saves 1-2 coats of finish paint'],
              ['New Drywall', 'PVA primer seals the paper facing — mandatory step'],
              ['Bathroom / Laundry', 'Mold-resistant primer due to DFW humidity cycles'],
            ].map(([label, tip]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{label}</div>
                <div style={{ color: '#94a3b8', fontSize: 14 }}>{tip}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 14px' }}>🛑 DIY vs. Call a Pro</h2>
          {[
            ['DIY ✅', 'Single-story walls, standard bedroom/living room, simple color change'],
            ['Call a Pro 📞', 'Ceilings (spray equipment, fatigue risk), 2-story foyer or stairwell, textured walls requiring matching, exterior (DFW UV degrades paint fast — spray technique matters)'],
          ].map(([label, desc]) => (
            <div key={label} style={{ display: 'flex', gap: 12, marginBottom: 12, padding: 14, background: '#0A1628', borderRadius: 8 }}>
              <span style={{ fontWeight: 700, color: '#F5E642', minWidth: 100 }}>{label}</span>
              <span style={{ color: '#cbd5e1', fontSize: 14 }}>{desc}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, margin: '0 0 20px' }}>🧮 Supply List + Cost Estimator</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>Select your rooms and wall condition:</p>

          <div style={{ marginBottom: 18 }}>
            <div style={{ color: '#cbd5e1', fontWeight: 600, marginBottom: 10 }}>Rooms to Paint</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {ROOMS.map(room => (
                <button key={room} onClick={() => toggleRoom(room)} style={{ padding: '8px 16px', borderRadius: 20, border: '2px solid', borderColor: selectedRooms.includes(room) ? '#F5E642′ : '#334155', background: selectedRooms.includes(room) ? '#F5E642' : ’transparent', color: selectedRooms.includes(room) ? '#0A1628′ : '#94a3b8', fontWeight: 600, cursor: ’pointer', fontSize: 14 }}>
                  {room}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#cbd5e1', fontWeight: 600, marginBottom: 10 }}>Wall Condition</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {CONDITIONS.map(c => (
                <button key={c} onClick={() => setCondition(c)} style={{ padding: '10px 16px', borderRadius: 8, border: '2px solid', borderColor: condition === c ? '#F5E642′ : '#334155', background: condition === c ? '#F5E64220' : ’transparent', color: condition === c ? '#F5E642′ : '#94a3b8', textAlign: ’left', cursor: 'pointer', fontSize: 14 }}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => setShowResults(true)} disabled={!condition || selectedRooms.length === 0} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 16, cursor: 'pointer', opacity: (!condition || selectedRooms.length === 0) ? 0.4 : 1 }}>
            Get My Estimate →
          </button>

          {showResults && est && (
            <div style={{ marginTop: 24, padding: 20, background: '#0A1628', borderRadius: 12, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                {[['🕐 Time', `${est.hours} hrs`], ['💰 Cost', `~$${est.cost}`], ['🎨 Paint', `${est.paintGal} gal`], ['🧱 Skill', est.skill]].map(([label, val]) => (
                  <div key={label} style={{ background: '#112240', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                    <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642′ }}>{val}</div>
                  </div>
                ))}
              </div>
              <div style={{ color: '#cbd5e1', fontWeight: 600, marginBottom: 8 }}>Supply List:</div>
              <ul style={{ margin: 0, padding: '0 0 0 18px', color: '#94a3b8', fontSize: 14 }}>
                {supplies.map((s, i) => <li key={i} style={{ marginBottom: 4 }}>{s}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
