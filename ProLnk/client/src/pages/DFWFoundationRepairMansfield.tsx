import { useState } from 'react';

const homeAges = ['Built 2010+', '2000s', '1990s', '1980s', 'Pre-1980'];
const symptoms = ['Doors sticking', 'Cracks in drywall', 'Sloping floors', 'Gaps at ceiling/floor', 'Exterior brick cracks', 'Multiple symptoms'];

type Severity = { level: string; action: string; range: string; color: string };

function getSeverity(age: string, symptom: string): Severity {
  const ageScore = homeAges.indexOf(age);
  const symptomScore = symptoms.indexOf(symptom);
  const total = ageScore + symptomScore;
  if (total >= 7) return { level: 'CRITICAL', action: 'Structural engineer assessment required before any repair. Multiple failure points likely. Do not delay.', range: '$15,000–$40,000+', color: '#FF4444' };
  if (total >= 5) return { level: 'HIGH', action: 'Foundation contractor inspection within 2 weeks. Pier installation likely. Get 3 quotes.', range: '$8,000–$18,000', color: '#FF8C00' };
  if (total >= 3) return { level: 'MODERATE', action: 'Schedule a professional evaluation. May be minor settling or early-stage movement. Document with photos.', range: '$3,500–$9,000', color: '#F5E642' };
  return { level: 'MONITOR', action: 'Minor cracking or sticking can be normal seasonal movement in DFW clay soil. Monitor for 90 days and measure crack width monthly.', range: '$0–$2,500', color: '#44FF88' };
}

export default function DFWFoundationRepairMansfield() {
  const [homeAge, setHomeAge] = useState('');
  const [symptom, setSymptom] = useState('');
  const result = homeAge && symptom ? getSeverity(homeAge, symptom) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>

        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 14, fontWeight: 600 }}>
          🏠 ProLnk — Mansfield TX
        </div>
        <h1 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, lineHeight: 1.2, marginBottom: 12 }}>
          Mansfield TX Foundation Repair<br />
          <span style={{ color: '#F5E642' }}>South Tarrant Specialists</span>
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 680, lineHeight: 1.7, marginBottom: 40 }}>
          Mansfield sits on some of the most expansive clay soil in the DFW metroplex. The shrink-swell cycle from wet winters to scorching summers creates movement that stresses even well-built foundations. Homes along Highway 287 and in older Mansfield neighborhoods built in the 1980s–2000s are particularly vulnerable. Our vetted foundation contractors provide honest assessments — no fear-based selling.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 20, marginBottom: 40 }}>
          {[
            { emoji: '🌍', label: 'Clay Soil Experts', desc: 'Deep knowledge of Tarrant County expansive clay and drainage patterns.' },
            { emoji: '📐', label: 'Engineer Partnerships', desc: 'Structural engineers on call for assessments and stamped repair plans.' },
            { emoji: '💧', label: 'Drainage Solutions', desc: 'Proper drainage fixes are often the highest-ROI foundation investment.' },
            { emoji: '📋', label: 'Transferable Warranty', desc: 'All ProLnk foundation contractors offer transferable lifetime warranties.' },
          ].map(card => (
            <div key={card.label} style={{ background: '#132040', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.emoji}</div>
              <div style={{ fontWeight: 700, marginBottom: 6, color: '#F5E642' }}>{card.label}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{card.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 16, padding: 32, border: '1px solid #F5E642', marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: '#F5E642' }}>
            🔎 Foundation Severity Calculator
          </h2>
          <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 24 }}>
            Select your home age and primary symptom to get a severity rating, recommended action, and cost range.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#CBD5E1', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Home Age</label>
              <select value={homeAge} onChange={e => setHomeAge(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 15 }}>
                <option value="">Select home age...</option>
                {homeAges.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#CBD5E1', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Primary Symptom</label>
              <select value={symptom} onChange={e => setSymptom(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 15 }}>
                <option value="">Select symptom...</option>
                {symptoms.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, border: `2px solid ${result.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
                <span style={{ background: result.color, color: '#000', fontWeight: 800, fontSize: 13, padding: '4px 14px', borderRadius: 20 }}>
                  {result.level}
                </span>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>{result.range}</span>
              </div>
              <p style={{ color: '#E2E8F0', fontSize: 15, lineHeight: 1.7, marginBottom: 0 }}>{result.action}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#132040', borderRadius: 16, padding: 28, marginBottom: 40, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Mansfield Foundation Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {[{ num: '60%', label: 'DFW Homes Affected by Soil Movement' }, { num: '4"', label: 'Max Clay Swell in Tarrant County' }, { num: '3', label: 'Competing Quotes Guaranteed' }, { num: '$0', label: 'Cost to Get Matched' }].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 30, fontWeight: 800, color: '#F5E642' }}>{s.num}</div>
                <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 18, padding: '16px 48px', borderRadius: 50, border: 'none', cursor: 'pointer' }}
            onClick={() => alert('Redirecting to ProLnk homeowner signup...')}
          >
            Get Free Foundation Quotes — Mansfield TX
          </button>
          <p style={{ color: '#64748B', fontSize: 13, marginTop: 12 }}>No obligation · Foundation specialists compete for your business</p>
        </div>
      </div>
    </div>
  );
}
