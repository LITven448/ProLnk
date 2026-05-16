import { useState } from 'react';

type ProjectType = 'kitchen' | 'bath' | 'addition' | 'exterior';

const projects: Record<ProjectType, { label: string; icon: string; bestTime: string; leadTime: string; advice: string }> = {
  kitchen: {
    label: 'Kitchen Remodel', icon: '🍳',
    bestTime: 'January – February',
    leadTime: 'Book 8 weeks out in spring, 2-3 weeks in Q1',
    advice: 'Spring is peak for kitchen remodels — GCs book out 8+ weeks. Start in Q1 for best price and fastest start. Summer is 4-6 week waits minimum.',
  },
  bath: {
    label: 'Bathroom Remodel', icon: '🚿',
    bestTime: 'January – February or September – October',
    leadTime: '2-4 weeks in off-season, 6-8 in spring',
    advice: 'Like kitchens, bathrooms spike in spring. Fall shoulder months are your best bet for quick starts and negotiated pricing.',
  },
  addition: {
    label: 'Room Addition', icon: '🏗️',
    bestTime: 'November – February',
    leadTime: '4-6 weeks year-round, 2-3 weeks in winter',
    advice: 'Additions are weather-dependent. Start planning in winter, begin construction in spring. GCs slowest Q1 = best deals and scheduling priority.',
  },
  exterior: {
    label: 'Exterior / Deck / Fence', icon: '🌿',
    bestTime: 'March – May or September – October',
    leadTime: '2-4 weeks, book 6 weeks ahead in spring',
    advice: 'Exterior work is weather-gated. DFW summers halt many exterior projects. Target spring or fall. Avoid booking during storm season without allowances.',
  },
};

export default function DFWBestTimeToHireContractor2026() {
  const [project, setProject] = useState<ProjectType | null>(null);
  const data = project ? projects[project] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🧱📐</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          Best Time to Hire a General Contractor in DFW 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>
          Q1 is the slowest time for GCs in DFW — best deals and fastest starts. Summer peaks with 4-6 week waits. Kitchen and bath remodels book out 8 weeks in spring.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          <div style={{ background: '#1e2d45', borderRadius: 10, padding: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 28 }}>📉</div>
            <div style={{ color: '#22c55e', fontWeight: 700 }}>Q1 (Jan – Feb)</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>Slowest — best deals + fastest start</div>
          </div>
          <div style={{ background: '#1e2d45', borderRadius: 10, padding: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 28 }}>📈</div>
            <div style={{ color: '#ef4444', fontWeight: 700 }}>Summer (Jun – Aug)</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>Peak — 4-6 week waits minimum</div>
          </div>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🔨 Select Your Project Type</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 28 }}>
          {(Object.keys(projects) as ProjectType[]).map((key) => (
            <button key={key} onClick={() => setProject(key)} style={{
              background: project === key ? '#F5E642' : '#1e2d45',
              color: project === key ? '#0A1628' : '#fff',
              border: 'none', borderRadius: 8, padding: '14px 12px', cursor: 'pointer', fontWeight: 700, fontSize: 15,
            }}>{projects[key].icon} {projects[key].label}</button>
          ))}
        </div>

        {data && (
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>{data.icon} {data.label}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
              <div><div style={{ color: '#64748b', fontSize: 12 }}>Best Time to Start</div><div style={{ fontWeight: 700, color: '#22c55e' }}>{data.bestTime}</div></div>
              <div><div style={{ color: '#64748b', fontSize: 12 }}>Lead Time</div><div style={{ fontWeight: 700 }}>{data.leadTime}</div></div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, color: '#cbd5e1', fontSize: 14 }}>{data.advice}</div>
          </div>
        )}

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>🏆 ProLnk Charter Advantage</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>Charter GCs reserve slots for ProLnk homeowners — skip the waitlist and get priority scheduling even in peak season.</div>
        </div>
      </div>
    </div>
  );
}
