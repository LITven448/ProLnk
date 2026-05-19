import { useState } from 'react';

const homeAges = ['Pre-1980', '1980–2000', '2000–2015', '2015+'];
const pressureIssues = ['Low pressure everywhere', 'Low pressure in one area', 'No hot water pressure', 'Slow drains', 'Water hammer / banging', 'Normal — just checking'];

function getDiagnosis(age: string, issue: string) {
  const ageIdx = homeAges.indexOf(age);
  if (issue === 'Low pressure everywhere') {
    if (ageIdx <= 1) return { cause: 'Galvanized pipes corroding/narrowing', cost: '$3,500–$12,000', urgency: '🔴 High' };
    return { cause: 'Pressure regulator failure or meter issue', cost: '$300–$800', urgency: '🟡 Moderate' };
  }
  if (issue === 'Low pressure in one area') return { cause: 'Partial blockage or failing fixture shutoff valve', cost: '$150–$600', urgency: '🟡 Moderate' };
  if (issue === 'No hot water pressure') return { cause: 'Water heater sediment or anode rod failure', cost: '$200–$1,200', urgency: '🟡 Moderate' };
  if (issue === 'Slow drains') {
    if (ageIdx <= 1) return { cause: 'Cast iron drain deterioration or root intrusion', cost: '$800–$5,000', urgency: '🔴 High' };
    return { cause: 'Grease/soap buildup — likely hydro-jet candidate', cost: '$300–$700', urgency: '🟢 Low' };
  }
  if (issue === 'Water hammer / banging') return { cause: 'Water hammer arrestors needed, high water pressure', cost: '$200–$500', urgency: '🟢 Low' };
  return { cause: 'No immediate concern detected', cost: 'Free inspection recommended', urgency: '🟢 Low' };
}

export default function DFWPlumberMansfield() {
  const [homeAge, setHomeAge] = useState('');
  const [issue, setIssue] = useState('');
  const result = homeAge && issue ? getDiagnosis(homeAge, issue) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔧💧</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>
            Mansfield TX Plumbers — South Tarrant Specialists
          </h1>
          <p style={{ color: '#aaa', fontSize: 18 }}>
            Serving Mansfield, Kennedale, Midlothian — Between Fort Worth & Arlington
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 40 }}>
          {[
            { label: 'City Pop.', value: '75,000+', icon: '👥' },
            { label: 'Home Mix', value: '1970s–2020s', icon: '🏠' },
            { label: 'Water Source', value: 'City of Mansfield', icon: '💧' },
            { label: 'Avg Home Age', value: '18 yrs', icon: '📅' },
          ].map(s => (
            <div key={s.label} style={{ background: '#112240', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#F5E642′ }}>{s.value}</div>
              <div style={{ color: '#aaa', fontSize: 12, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 8 }}>🏘️ Mansfield's Plumbing Landscape</h2>
          <p style={{ color: '#ccc', lineHeight: 1.7, marginBottom: 16 }}>
            Mansfield occupies a unique position in South Tarrant County — a bedroom community that grew steadily
            from the 1970s through today, creating a wide spectrum of home vintages. Older neighborhoods near
            downtown have galvanized and cast iron pipes reaching end-of-life. Newer subdivisions off US-287
            are built with modern PEX and PVC but can face clay soil movement and shifting foundations that
            stress supply and drain lines. The city's hard water also accelerates water heater sediment buildup.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['🪨 Hard water — avg 18 gpg hardness', '🏗️ Foundation shift affects drain lines',
              '⚙️ Aging galvanized in pre-1990 homes', '💧 City water — pressure avg 60–80 psi'].map(item => (
              <div key={item} style={{ background: '#0A1628', borderRadius: 8, padding: 12, color: '#ccc', fontSize: 14 }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 20 }}>🔍 Plumbing Issue Diagnoser</h2>
          <p style={{ color: '#aaa', marginBottom: 20 }}>Select your home's age and the pressure issue you’re experiencing to get a likely cause and cost range.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#F5E642', display: 'block', marginBottom: 8, fontSize: 14 }}>Home Built</label>
              <select
                value={homeAge}
                onChange={e => setHomeAge(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}
              >
                <option value="">Select era...</option>
                {homeAges.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#F5E642', display: 'block', marginBottom: 8, fontSize: 14 }}>Issue You're Seeing</label>
              <select
                value={issue}
                onChange={e => setIssue(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}
              >
                <option value="">Select issue...</option>
                {pressureIssues.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
                <div style={{ background: '#112240', borderRadius: 8, padding: 16 }}>
                  <div style={{ color: '#F5E642', fontSize: 12, marginBottom: 6 }}>LIKELY CAUSE</div>
                  <div style={{ color: '#fff', fontSize: 14 }}>{result.cause}</div>
                </div>
                <div style={{ background: '#112240', borderRadius: 8, padding: 16 }}>
                  <div style={{ color: '#F5E642', fontSize: 12, marginBottom: 6 }}>COST RANGE</div>
                  <div style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>{result.cost}</div>
                </div>
                <div style={{ background: '#112240', borderRadius: 8, padding: 16 }}>
                  <div style={{ color: '#F5E642', fontSize: 12, marginBottom: 6 }}>URGENCY</div>
                  <div style={{ color: '#fff', fontSize: 14 }}>{result.urgency}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🛠️ Our Mansfield Plumbing Services</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
            {['✅ Whole-home repiping (PEX/copper)', '✅ Water heater replacement & tankless install',
              '✅ Slab leak detection & repair', '✅ Drain cleaning & hydro-jetting',
              '✅ Tarrant County permit-ready', '✅ 24/7 emergency plumbing'].map(s => (
              <div key={s} style={{ color: '#ccc', fontSize: 14, padding: '8px 0′ }}>{s}</div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', background: '#F5E642', borderRadius: 12, padding: 32 }}>
          <div style={{ fontSize: 28 }}>📞</div>
          <h2 style={{ color: '#0A1628', fontSize: 22, fontWeight: 700, margin: '8px 0′ }}>Get a Free Plumbing Quote in Mansfield</h2>
          <p style={{ color: '#333', marginBottom: 16 }}>Licensed local plumbers, upfront pricing, same-day service available</p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            Request Free Quote →
          </button>
        </div>

      </div>
    </div>
  );
}
