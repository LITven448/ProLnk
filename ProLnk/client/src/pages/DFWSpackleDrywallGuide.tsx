import { useState } from 'react';

export default function DFWSpackleDrywallGuide() {
  const [repairSize, setRepairSize] = useState('');
  const [season, setSeason] = useState('');
  const [result, setResult] = useState(null);

  const recommendations = {
    tiny: {
      summer: { product: 'Lightweight Spackle', coats: 1, dryTime: '2–4 hrs (humidity slows this)', cureTime: '24 hrs before painting', tip: 'DFW summer humidity: run AC while drying' },
      mild: { product: 'Lightweight Spackle', coats: 1, dryTime: '1–2 hrs', cureTime: '12–24 hrs before painting', tip: 'Ideal drying conditions in DFW spring/fall' },
    },
    small: {
      summer: { product: 'Lightweight Spackle or DAP DryDex', coats: 2, dryTime: '3–6 hrs per coat', cureTime: '24–48 hrs', tip: 'DryDex turns white when dry — great for humid summers' },
      mild: { product: 'Lightweight Spackle', coats: 1, dryTime: '1–3 hrs', cureTime: '24 hrs', tip: 'Sand lightly between coats if doing 2' },
    },
    medium: {
      summer: { product: 'All-Purpose Joint Compound', coats: '2–3', dryTime: '8–24 hrs per coat (DFW humidity)', cureTime: '48–72 hrs', tip: 'Use a fan to aid drying — do NOT use heat gun outdoors in DFW summer' },
      mild: { product: 'All-Purpose Joint Compound', coats: '2–3', dryTime: '4–8 hrs per coat', cureTime: '48 hrs', tip: 'Apply thin coats — feather edges 6+ inches for smooth blend' },
    },
    large: {
      summer: { product: 'Setting-Type Joint Compound (hot mud)', coats: '3+', dryTime: '45–90 mins per coat (chemical set, not evaporation)', cureTime: '72 hrs + texture matching', tip: 'Hot mud is humidity-resistant — best choice for DFW summer repairs' },
      mild: { product: 'All-Purpose + Setting Compound', coats: '2–3', dryTime: '4–24 hrs per coat', cureTime: '48–72 hrs', tip: 'Base coat with setting compound, finish coats with all-purpose' },
    },
  };

  function calculate() {
    if (!repairSize || !season) return;
    setResult(recommendations[repairSize][season]);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Home Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Spackle vs Drywall Compound</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32 }}>DFW humidity changes everything about drying times. Use this guide to pick the right product and plan your timeline.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[
            { name: 'Spackle', icon: '🔩', color: '#3b82f6', uses: ['Nail holes', 'Small dents under 3"', 'Single-coat repairs', 'Quick touch-ups'], avoid: 'Large repairs, texturing, structural damage' },
            { name: 'Joint Compound', icon: '🧱', color: '#F5E642', uses: ['Patches over 3"', 'Texture matching', 'Taping seams', 'Multi-coat builds'], avoid: 'Tiny nail holes where spackle is overkill' },
          ].map(item => (
            <div key={item.name} style={{ backgroundColor: '#0f1f3d', borderRadius: 12, padding: 20, borderTop: `4px solid ${item.color}` }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{item.name}</h2>
              <div style={{ marginBottom: 12 }}>
                {item.uses.map(use => <div key={use} style={{ fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>✅ {use}</div>)}
              </div>
              <div style={{ fontSize: 13, color: '#ef4444' }}>⛔ Avoid for: {item.avoid}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>💧 DFW Humidity & Drying</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>DFW summers routinely hit 70–85% relative humidity. Both spackle and joint compound dry by water evaporation — high humidity dramatically slows this process.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { season: 'May – September', humidity: '60–85% RH', impact: 'Add 50–100% to all dry times', tip: 'Run indoor AC, use fans, never close off the room' },
              { season: 'October – April', humidity: '35–55% RH', impact: 'Normal dry times apply', tip: 'Ideal repair window for DFW homeowners' },
            ].map(s => (
              <div key={s.season} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{s.season}</div>
                <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 4 }}>{s.humidity}</div>
                <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>{s.impact}</div>
                <div style={{ color: '#22c55e', fontSize: 12 }}>💡 {s.tip}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 Get Your Product Recommendation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 8 }}>REPAIR SIZE</label>
              {[{ val: 'tiny', label: 'Nail hole / under 1"' }, { val: 'small', label: '1"–3" hole or dent' }, { val: 'medium', label: '3"–6" patch' }, { val: 'large', label: 'Over 6" or full panel' }].map(opt => (
                <button key={opt.val} onClick={() => setRepairSize(opt.val)} style={{ display: 'block', width: '100%', padding: '10px 14px', marginBottom: 8, borderRadius: 8, border: `2px solid ${repairSize === opt.val ? '#F5E642' : '#1e3a5f'}`, backgroundColor: repairSize === opt.val ? '#F5E642' : 'transparent', color: repairSize === opt.val ? '#0A1628' : '#fff', cursor: 'pointer', textAlign: 'left', fontSize: 14 }}>{opt.label}</button>
              ))}
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 8 }}>DFW SEASON</label>
              {[{ val: 'summer', label: 'May – September (humid)' }, { val: 'mild', label: 'October – April (drier)' }].map(opt => (
                <button key={opt.val} onClick={() => setSeason(opt.val)} style={{ display: 'block', width: '100%', padding: '10px 14px', marginBottom: 8, borderRadius: 8, border: `2px solid ${season === opt.val ? '#F5E642' : '#1e3a5f'}`, backgroundColor: season === opt.val ? '#F5E642' : 'transparent', color: season === opt.val ? '#0A1628' : '#fff', cursor: 'pointer', textAlign: 'left', fontSize: 14 }}>{opt.label}</button>
              ))}
            </div>
          </div>
          <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Get Recommendation →</button>

          {result && (
            <div style={{ marginTop: 24, backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>🛒 {result.product}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div><div style={{ color: '#94a3b8', fontSize: 12 }}>NUMBER OF COATS</div><div style={{ fontWeight: 700, fontSize: 16 }}>{result.coats}</div></div>
                <div><div style={{ color: '#94a3b8', fontSize: 12 }}>DRY TIME PER COAT</div><div style={{ fontWeight: 700, fontSize: 16 }}>{result.dryTime}</div></div>
              </div>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#94a3b8', fontSize: 12 }}>CURE TIME: </span>{result.cureTime}</div>
              <div style={{ backgroundColor: '#0f1f3d', borderRadius: 8, padding: 12, marginTop: 12 }}><span style={{ color: '#F5E642' }}>💡 DFW Tip: </span><span style={{ color: '#94a3b8', fontSize: 14 }}>{result.tip}</span></div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>Dry times are estimates · DFW conditions vary · Always test a small area before full application</div>
      </div>
    </div>
  );
}
