import { useState } from 'react';

export default function DFWSeniorHomeRepairAssistance2026() {
  const [county, setCounty] = useState('');
  const [age, setAge] = useState('');
  const [result, setResult] = useState('');

  const programs: Record<string, string[]> = {
    dallas: [
      '🏛️ City of Dallas Senior Services Home Repair: (214) 670-5878 — Free emergency repairs for Dallas seniors 62+, owner-occupied, income below 80% AMI.',
      '🔨 Rebuilding Together Dallas: (214) 823-6800 — Annual Safe & Healthy Homes program: free critical repairs for low-income seniors. Applications open each January.',
      '🤝 Area Agency on Aging of Dallas: (214) 871-5065 — Minor home modification program for seniors 60+. Ramps, grab bars, safety modifications.',
    ],
    tarrant: [
      '🏛️ City of Fort Worth Senior Services: (817) 392-8762 — Home repair assistance for Fort Worth seniors 62+, income-qualified.',
      '🔨 Rebuilding Together Fort Worth: (817) 923-8080 — Critical home repairs and safety mods for seniors at no cost.',
      '🤝 Area Agency on Aging of Tarrant County: (817) 258-8000 — Home modification and emergency repair for seniors 60+.',
    ],
    collin: [
      '🏛️ Collin County AAA Senior Services: (972) 548-4820 — Minor home repair and safety modifications for seniors.',
      '🔨 Habitat for Humanity Collin County: (972) 422-0009 — Home preservation program for low-income seniors.',
    ],
    denton: [
      '🏛️ Denton County AAA: (940) 387-5556 — In-home services including minor repair assistance for seniors 60+.',
      '🔨 Rebuilding Together Denton County: Volunteer repair days — contact local United Way (940) 566-5851 for referrals.',
    ],
  };

  const checkPrograms = () => {
    const a = parseInt(age);
    if (!county || !age || isNaN(a)) { setResult('⚠️ Please select your county and enter your age.'); return; }
    if (a < 60) { setResult('⚠️ Most senior home repair programs require age 60-62+. Check CDBG or HOME programs for general income-based assistance.'); return; }
    const list = programs[county.toLowerCase()] || ['📍 Contact your local Area Agency on Aging for referrals to home repair programs in your area. Texas AAA statewide: 1-800-252-9240'];
    setResult(list.join('

'));
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>👴</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Senior Home Repair Assistance 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Programs for DFW homeowners 62+ — city services, AAA, and nonprofits</p>
        </div>

        {[{icon:'🏠',title:'Area Agency on Aging (AAA) Programs',body:'Each DFW county has an Area Agency on Aging that provides or coordinates home modification services for seniors 60+. Programs include grab bars, ramps, safety handrails, and minor repairs — often at no cost for qualifying seniors.'},{icon:'🔨',title:'Rebuilding Together DFW',body:'Rebuilding Together chapters in Dallas and Fort Worth conduct annual repair days focusing on seniors and people with disabilities. Services are 100% free. Priority given to veterans, seniors, and single-parent households.'},{icon:'📞',title:'How to Start',body:'Call 211 Texas (free, 24/7) to be connected with local senior home repair resources in your county. You can also contact your county Area Agency on Aging directly for a needs assessment.'}].map((card, i) => (
          <div key={i} style={{ background: '#1e2d45', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <div style={{ fontSize: 24 }}>{card.icon}</div>
            <h2 style={{ color: '#F5E642', fontSize: 18, margin: '8px 0 6px' }}>{card.title}</h2>
            <p style={{ color: '#cbd5e1', margin: 0, lineHeight: 1.6 }}>{card.body}</p>
          </div>
        ))}

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, margin: '0 0 16px' }}>🔍 Find Senior Programs in Your County</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
            <select value={county} onChange={e => setCounty(e.target.value)}
              style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: '1px solid #334155', background: '#0A1628', color: county ? '#fff' : '#64748b', fontSize: 14 }}>
              <option value="">Select County</option>
              <option value="dallas">Dallas County</option>
              <option value="tarrant">Tarrant County</option>
              <option value="collin">Collin County</option>
              <option value="denton">Denton County</option>
            </select>
            <input type="number" placeholder="Your Age" value={age} onChange={e => setAge(e.target.value)}
              style={{ width: 120, padding: '10px 14px', borderRadius: 8, border: '1px solid #334155', background: '#0A1628', color: '#fff', fontSize: 14 }} />
          </div>
          <button onClick={checkPrograms}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Find Programs
          </button>
          {result && <div style={{ marginTop: 16 }}>{result.split('

').map((r, i) => (
            <p key={i} style={{ padding: 14, background: '#0A1628', borderRadius: 8, color: '#cbd5e1', lineHeight: 1.6, marginBottom: 8 }}>{r}</p>
          ))}</div>}
        </div>
      </div>
    </div>
  );
}
