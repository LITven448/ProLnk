import { useState } from 'react';

const doorTypes = [
  { name: 'Steel', pros: 'Durable, low maintenance, insulates well', cons: 'Can dent, may rust without coating', cost: '$800–$1,800′ },
  { name: 'Wood', pros: 'Classic look, customizable', cons: 'High maintenance, warps in DFW humidity', cost: '$1,200–$4,000′ },
  { name: 'Aluminum', pros: 'Rust-proof, lightweight', cons: 'Dents easily, poor insulation', cost: '$700–$2,000′ },
  { name: 'Glass', pros: 'Modern aesthetic, natural light', cons: 'No privacy, expensive', cost: '$1,500–$4,500′ },
];

const motorTypes = [
  { type: 'Chain Drive', noise: 'Loud', cost: '$150–$250', best: 'Detached garages' },
  { type: 'Belt Drive', noise: 'Quiet', cost: '$200–$350', best: 'Attached garages' },
  { type: 'Screw Drive', noise: 'Moderate', cost: '$170–$300', best: 'Low-maintenance climates' },
  { type: 'Direct Drive', noise: 'Very Quiet', cost: '$250–$400', best: 'Premium installs' },
];

const symptoms = ['Noisy operation', 'Slow movement', 'Won\’t open fully', 'Visible rust/rot', 'Broken springs', 'Panels dented'];

export default function GarageDoorGuide() {
  const [age, setAge] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [recommendation, setRecommendation] = useState('');

  const toggleSymptom = (s: string) => {
    setSelectedSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const analyze = () => {
    const ageNum = parseInt(age) || 0;
    const severe = selectedSymptoms.some(s => ['Visible rust/rot', 'Broken springs', 'Panels dented'].includes(s));
    if (ageNum >= 20 || (ageNum >= 15 && severe)) {
      setRecommendation('🔁 REPLACE — Your door is aging and showing significant issues. A new door pays off in energy savings and safety.');
    } else if (severe) {
      setRecommendation('⚠️ PROFESSIONAL REPAIR NEEDED — Serious symptoms detected. Get a pro assessment before costs escalate.');
    } else if (ageNum < 10 && selectedSymptoms.length <= 1) {
      setRecommendation('✅ REPAIR — Door is relatively young with minor issues. A tune-up or part replacement should do it.');
    } else {
      setRecommendation('🔍 GET A QUOTE — Mixed signals. Have a DFW pro inspect it — repair vs. replace cost comparison will guide you.');
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏠</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
            DFW Garage Door Guide
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>
            Everything DFW homeowners need to know — types, insulation, motors, smart openers & costs
          </p>
        </div>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '1rem' }}>🌡️ R-Value & DFW Heat</h2>
          <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.5rem' }}>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>
              DFW summers routinely hit <strong style={{ color: '#F5E642′ }}>105°F+</strong>. An uninsulated garage door lets brutal heat into your attached garage, raising AC costs by up to 20%. The industry measures insulation with <strong style={{ color: '#F5E642' }}>R-value</strong> — the higher, the better.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              {[['R-0 to R-6', 'Basic / No insulation', '#ef4444'], ['R-7 to R-12', 'Good for DFW', '#f59e0b'], ['R-13 to R-18', 'Excellent for DFW heat', '#22c55e'], ['R-19+', 'Premium, max savings', '#3b82f6']].map(([r, label, color]) => (
                <div key={r} style={{ flex: '1', minWidth: '140px', background: '#0A1628', borderRadius: '8px', padding: '1rem', borderLeft: `4px solid ${color}` }}>
                  <div style={{ color: color as string, fontWeight: 700 }}>{r}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '1rem' }}>🚪 Door Types Compared</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#1e2d45′ }}>
                  {['Material', 'Pros', 'Cons', 'Typical Cost'].map(h => (
                    <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', color: '#F5E642', borderBottom: '1px solid #2d3f58′ }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {doorTypes.map((d, i) => (
                  <tr key={d.name} style={{ background: i % 2 === 0 ? '#111f36′ : '#0A1628' }}>
                    <td style={{ padding: '0.75rem 1rem', color: '#fff', fontWeight: 600 }}>{d.name}</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#86efac', fontSize: '0.9rem' }}>{d.pros}</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#fca5a5', fontSize: '0.9rem' }}>{d.cons}</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#F5E642', fontWeight: 600 }}>{d.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '1rem' }}>⚙️ Motor Types</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {motorTypes.map(m => (
              <div key={m.type} style={{ background: '#1e2d45', borderRadius: '10px', padding: '1.2rem' }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.4rem' }}>{m.type}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Noise: {m.noise}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Cost: {m.cost}</div>
                <div style={{ color: '#60a5fa', fontSize: '0.85rem' }}>Best for: {m.best}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '1rem' }}>📱 Smart Openers</h2>
          <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.5rem' }}>
            <p style={{ color: '#cbd5e1', marginBottom: '1rem' }}>Smart openers add Wi-Fi + app control. Top picks for DFW homeowners:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[['Chamberlain myQ', '$30 add-on', 'Works with most existing openers, free app monitoring'],
                ['LiftMaster 87504', '$300+', 'Built-in camera, battery backup (great for DFW power outages)'],
                ['Genie ChainMax', '$200', 'Budget smart opener, Alexa/Google compatible'],
              ].map(([name, price, desc]) => (
                <div key={name} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ color: '#F5E642', fontSize: '1.2rem' }}>✓</div>
                  <div>
                    <span style={{ color: '#fff', fontWeight: 600 }}>{name}</span>
                    <span style={{ color: '#F5E642', marginLeft: '0.5rem', fontSize: '0.85rem' }}>{price}</span>
                    <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '1rem' }}>🔧 Repair vs Replace Quiz</h2>
          <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ color: '#cbd5e1', display: 'block', marginBottom: '0.5rem' }}>Door age (years):</label>
              <input
                type="number"
                value={age}
                onChange={e => setAge(e.target.value)}
                placeholder="e.g. 12″
                style={{ background: '#0A1628', border: '1px solid #2d3f58', borderRadius: '6px', padding: '0.5rem 0.75rem', color: '#fff', width: '120px' }}
              />
            </div>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ color: '#cbd5e1', display: 'block', marginBottom: '0.5rem' }}>Select symptoms:</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {symptoms.map(s => (
                  <button
                    key={s}
                    onClick={() => toggleSymptom(s)}
                    style={{
                      padding: '0.4rem 0.9rem',
                      borderRadius: '20px',
                      border: '1px solid',
                      borderColor: selectedSymptoms.includes(s) ? '#F5E642′ : '#2d3f58',
                      background: selectedSymptoms.includes(s) ? '#F5E642′ : ’transparent',
                      color: selectedSymptoms.includes(s) ? '#0A1628′ : '#cbd5e1',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: selectedSymptoms.includes(s) ? 700 : 400,
                    }}
                  >{s}</button>
                ))}
              </div>
            </div>
            <button
              onClick={analyze}
              style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '0.6rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}
            >
              Get Recommendation
            </button>
            {recommendation && (
              <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: '8px', padding: '1rem', color: '#F5E642', fontWeight: 600, fontSize: '1rem' }}>
                {recommendation}
              </div>
            )}
          </div>
        </section>

        <div style={{ textAlign: 'center', padding: '1.5rem', background: '#1e2d45', borderRadius: '12px' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🏗️</div>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.25rem' }}>Get quotes from vetted DFW garage door pros</p>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>ProLnk matches you with licensed, background-checked local contractors</p>
        </div>
      </div>
    </div>
  );
}
