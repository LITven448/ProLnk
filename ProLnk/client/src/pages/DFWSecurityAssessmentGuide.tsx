import { useState } from 'react';

const vulnerabilityData: Record<string, Record<string, string[]>> = {
  single: {
    Plano: ['Front door facing street with no camera coverage', 'Side gate often unlocked', 'Garage side entry window'],
    Frisco: ['Back fence line not visible from neighbors', 'Driveway blind spot at night', 'Landscaping near windows'],
    McKinney: ['Long driveway limits visibility', 'Side yard shrubs provide cover', 'Rear sliding door exposure'],
    default: ['Entry points not visible from street', 'Lighting gaps at side entry', 'Overgrown landscaping near doors'],
  },
  townhome: {
    default: ['Shared entry points with neighbors', 'Ground floor windows on alley side', 'Attached garage shared wall'],
  },
  condo: {
    default: ['Parking garage access', 'Building entry tailgating', 'Balcony door if ground or low floor'],
  },
};

const improvements = [
  { item: 'Smart video doorbell', cost: '$150–$250', priority: 1 },
  { item: 'Motion-activated floodlights', cost: '$80–$200', priority: 2 },
  { item: 'Trim landscaping near entry points', cost: '$0–$300', priority: 3 },
  { item: 'Deadbolt upgrade (Grade 1)', cost: '$60–$120', priority: 4 },
  { item: 'Security system with monitoring', cost: '$200–$500 + $30/mo', priority: 5 },
];

export default function DFWSecurityAssessmentGuide() {
  const [homeType, setHomeType] = useState('');
  const [suburb, setSuburb] = useState('');
  const [hasSecurity, setHasSecurity] = useState('');
  const [result, setResult] = useState<null | { vulns: string[]; tips: typeof improvements }>(null);

  function assess() {
    const typeData = vulnerabilityData[homeType] || vulnerabilityData.single;
    const vulns = typeData[suburb] || typeData.default;
    const tips = hasSecurity === 'yes' ? improvements.slice(2) : improvements;
    setResult({ vulns, tips });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 40 }}>🔍</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, margin: '0.5rem 0' }}>DFW Home Security Assessment Guide</h1>
        <p style={{ color: '#9BA8BB', marginBottom: '1.5rem' }}>
          DFW burglaries peak 10am–3pm on weekdays — when residents are at work. Understanding your home's specific
          vulnerabilities is the first step to meaningful protection.
        </p>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: '1rem' }}>📍 Free DFW Resource</h2>
          <p style={{ color: '#9BA8BB', margin: 0 }}>
            Many DFW cities offer <strong style={{ color: '#E8EDF5' }}>free home security walk-throughs</strong> by off-duty officers.
            Call your city's police non-emergency line and ask for a "residential security assessment." Available in:
            Plano (972-424-5678), Frisco (972-292-6010), McKinney (972-547-5350), Allen (214-509-4321).
          </p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: '1rem' }}>🏠 Assess Your Home</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ color: '#9BA8BB', fontSize: 14 }}>Home Type</label>
              <select value={homeType} onChange={e => setHomeType(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: 6, padding: '0.6rem', borderRadius: 8, background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F' }}>
                <option value="">Select type</option>
                <option value="single">Single-family</option>
                <option value="townhome">Townhome</option>
                <option value="condo">Condo</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#9BA8BB', fontSize: 14 }}>DFW Suburb</label>
              <select value={suburb} onChange={e => setSuburb(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: 6, padding: '0.6rem', borderRadius: 8, background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F' }}>
                <option value="">Select suburb</option>
                <option value="Plano">Plano</option>
                <option value="Frisco">Frisco</option>
                <option value="McKinney">McKinney</option>
                <option value="Other">Other DFW</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#9BA8BB', fontSize: 14 }}>Existing Security System?</label>
              <select value={hasSecurity} onChange={e => setHasSecurity(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: 6, padding: '0.6rem', borderRadius: 8, background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F' }}>
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <button onClick={assess} disabled={!homeType || !suburb || !hasSecurity}
              style={{ padding: '0.75rem', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
              Run Assessment
            </button>
          </div>
        </div>

        {result && (
          <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem' }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: '1rem' }}>⚠️ Vulnerabilities Found</h2>
            {result.vulns.map((v, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ color: '#F5E642' }}>▸</span>
                <span style={{ color: '#E8EDF5' }}>{v}</span>
              </div>
            ))}
            <h2 style={{ color: '#F5E642', fontSize: 18, margin: '1.5rem 0 1rem' }}>✅ Priority Improvements</h2>
            {result.tips.map((t, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#E8EDF5' }}>#{t.priority} {t.item}</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{t.cost}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
