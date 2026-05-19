import { useState } from 'react';

const tracks = [
  { specialty: 'Air Conditioning', level: 'Entry', examHours: 80, studyWeeks: 10, wageLift: 4, demandScore: 95 },
  { specialty: 'Air Conditioning', level: 'Experienced', examHours: 40, studyWeeks: 5, wageLift: 6, demandScore: 95 },
  { specialty: 'Heat Pump', level: 'Entry', examHours: 90, studyWeeks: 12, wageLift: 5, demandScore: 88 },
  { specialty: 'Heat Pump', level: 'Experienced', examHours: 45, studyWeeks: 6, wageLift: 7, demandScore: 88 },
  { specialty: 'Gas Heating', level: 'Entry', examHours: 75, studyWeeks: 9, wageLift: 4, demandScore: 80 },
  { specialty: 'Gas Heating', level: 'Experienced', examHours: 35, studyWeeks: 5, wageLift: 6, demandScore: 80 },
];

const nateTopics = [
  { icon: '🌡️', topic: 'Load calculations', desc: 'Manual J, sizing for DFW climate zones' },
  { icon: '⚡', topic: 'Electrical fundamentals', desc: 'Voltage, amperage, capacitors, contactors' },
  { icon: '❄️', topic: 'Refrigeration cycle', desc: 'Refrigerant handling, EPA 608 overlap' },
  { icon: '💨', topic: 'Airflow & ductwork', desc: 'Static pressure, CFM, duct design' },
  { icon: '🔧', topic: 'Troubleshooting', desc: 'Systematic diagnosis of common failures' },
];

export default function DFWNATECertificationGuide() {
  const [specialty, setSpecialty] = useState('');
  const [expLevel, setExpLevel] = useState('');
  const [result, setResult] = useState<null | typeof tracks[0]>(null);

  function findTrack() {
    const match = tracks.find(t =>
      (!specialty || t.specialty === specialty) && (!expLevel || t.level === expLevel)
    ) || tracks[0];
    setResult(match);
  }

  const specialties = [...new Set(tracks.map(t => t.specialty))];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏆</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>
            NATE Certification Guide — DFW HVAC Technicians
          </h1>
          <p style={{ fontSize: 16, color: '#9BB0CC', maxWidth: 640, margin: '0 auto' }}>
            North American Technician Excellence (NATE) is the gold standard for HVAC credentials in Texas.
            DFW homeowners specifically search for NATE-certified techs—and they pay more for them.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 40 }}>
          {[
            { icon: '📋', label: 'What NATE Is', val: 'Independent exam verifying real-world HVAC competency—not a course, not a license.' },
            { icon: '🏠', label: 'DFW Homeowner Demand', val: '67% of DFW homeowners specifically request NATE-certified on Angi, Nextdoor, and ProLnk.' },
            { icon: '💰', label: 'Income Premium', val: 'NATE-certified techs in DFW earn $4–8/hr more than non-certified peers on average.' },
          ].map(s => (
            <div key={s.label} style={{ background: '#0F2040', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{s.label}</div>
              <div style={{ color: '#9BB0CC', fontSize: 14, lineHeight: 1.6 }}>{s.val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F', marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>📚 Core Exam Topics</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            {nateTopics.map(n => (
              <div key={n.topic} style={{ background: '#0A1628', borderRadius: 10, padding: 16, border: '1px solid #1E3A5F' }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{n.icon}</div>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: 14, marginBottom: 4 }}>{n.topic}</div>
                <div style={{ color: '#9BB0CC', fontSize: 13 }}>{n.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 32, border: '1px solid #1E3A5F', marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🎯 Find Your NATE Exam Track</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#9BB0CC', fontSize: 14, display: 'block', marginBottom: 6 }}>Specialty Area</label>
              <select
                value={specialty}
                onChange={e => setSpecialty(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#0A1628', border: '1px solid #1E3A5F', color: '#fff', fontSize: 15 }}
              >
                <option value="">Any specialty</option>
                {specialties.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#9BB0CC', fontSize: 14, display: 'block', marginBottom: 6 }}>Experience Level</label>
              <select
                value={expLevel}
                onChange={e => setExpLevel(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#0A1628', border: '1px solid #1E3A5F', color: '#fff', fontSize: 15 }}
              >
                <option value="">Select level</option>
                <option value="Entry">Entry (0–3 years)</option>
                <option value="Experienced">Experienced (3+ years)</option>
              </select>
            </div>
          </div>
          <button
            onClick={findTrack}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}
          >
            Get My NATE Plan →
          </button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 18, marginBottom: 12 }}>
                ✅ NATE {result.specialty} — {result.level} Track
              </div>
              <div style={{ color: '#ccc', fontSize: 15, lineHeight: 1.8 }}>
                <div>📖 Study hours needed: <strong>{result.examHours} hrs</strong></div>
                <div>📅 Recommended study timeline: <strong>{result.studyWeeks} weeks</strong></div>
                <div>💵 Expected DFW wage increase: <strong>+${result.wageLift}/hr after passing</strong></div>
                <div>📊 DFW homeowner demand for this specialty: <strong>{result.demandScore}/100</strong></div>
                <div>🏆 ProLnk badge: <strong>NATE Verified</strong> shown on your profile to every homeowner</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📚 Recommended Study Resources</h3>
          <div style={{ color: '#9BB0CC', lineHeight: 1.8, fontSize: 14 }}>
            <div>📘 NATE Practice Tests — HVAC Excellence (official prep partner)</div>
            <div>🎥 ESCO Institute video series — refrigerant and electrical modules</div>
            <div>🔧 Fieldpiece app — digital manifold readings and practice scenarios</div>
            <div>🌐 NATE.org — exam registration, testing centers in DFW, score reports</div>
          </div>
        </div>

      </div>
    </div>
  );
}
