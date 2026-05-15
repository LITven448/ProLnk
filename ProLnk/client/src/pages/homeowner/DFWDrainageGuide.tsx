import { useState } from 'react';

interface CheckItem {
  id: string;
  label: string;
  description: string;
}

interface DrainageSolution {
  problem: string;
  solution: string;
  cost: string;
  diy: boolean;
  priority: string;
}

const checkItems: CheckItem[] = [
  { id: 'slope', label: 'Yard slopes away from house', description: 'Should drop 6 inches in the first 10 feet from your foundation — measured with a level and tape.' },
  { id: 'standing', label: 'No standing water 24h after rain', description: 'Water pooling longer than 24 hours indicates inadequate drainage or grade issues.' },
  { id: 'gutters', label: 'Gutters extend 3ft+ from foundation', description: 'Downspout extensions or splash blocks should direct water at least 3 feet away.' },
  { id: 'wells', label: 'Window wells properly drained', description: 'Window wells need gravel backfill or a drain pipe to prevent flooding into the home.' },
  { id: 'mulch', label: 'No mulch touching foundation', description: 'Mulch holds moisture against the foundation. Keep a 6-inch gap between mulch and siding.' },
  { id: 'french', label: 'French drain installed if low spot exists', description: 'Any persistent low area in your yard needs an underground perforated pipe system to redirect water.' },
];

const solutions: DrainageSolution[] = [
  { problem: 'Poor yard grading (water flows toward house)', solution: 'Regrading — add topsoil and regrade slope away from foundation', cost: '$200–$600', diy: true, priority: 'Critical' },
  { problem: 'Persistent standing water / soggy yard', solution: 'French drain system — perforated pipe + gravel bed + outlet', cost: '$1,500–$5,000', diy: false, priority: 'High' },
  { problem: 'Erosion or water channel in yard', solution: 'Dry creek bed — decorative rock channel guides water naturally', cost: '$500–$2,000', diy: true, priority: 'Medium' },
  { problem: 'Downspout dumps at foundation', solution: 'Downspout extension or underground pipe to sidewalk/lawn', cost: '$50–$150 DIY', diy: true, priority: 'High' },
  { problem: 'Window well fills with water', solution: 'Window well drain + gravel — connected to weeping tile or daylight', cost: '$200–$800', diy: false, priority: 'High' },
  { problem: 'Basement / slab moisture after rain', solution: 'Interior drainage system + sump pump', cost: '$3,000–$8,000', diy: false, priority: 'Critical' },
];

const priorityColor: Record<string, string> = {
  Critical: '#EF4444',
  High: '#F59E0B',
  Medium: '#3B82F6',
};

export default function DFWDrainageGuide() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  function toggle(id: string) {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  }

  const score = checkItems.filter(c => checked[c.id]).length;
  const total = checkItems.length;
  const pct = Math.round((score / total) * 100);

  function getGrade(): { grade: string; color: string; message: string } {
    if (pct >= 83) return { grade: 'A', color: '#22C55E', message: 'Excellent drainage setup — your foundation is well-protected.' };
    if (pct >= 66) return { grade: 'B', color: '#84CC16', message: 'Good but 1–2 items need attention before the next storm season.' };
    if (pct >= 50) return { grade: 'C', color: '#F59E0B', message: 'Moderate risk — address the unchecked items within 90 days.' };
    return { grade: 'D', color: '#EF4444', message: 'High risk — your foundation may already be stressed. Get a drainage assessment now.' };
  }

  const grade = getGrade();

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#F1F5F9', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ color: '#3B82F6', fontSize: 14, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>DFW Foundation Protection</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>DFW Drainage Guide</h1>
          <p style={{ fontSize: 18, color: '#94A3B8', margin: 0 }}>Protect Your Foundation From Water Damage</p>
        </div>

        {/* Clay Soil Context */}
        <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28, marginBottom: 40, border: '1px solid #2D4A7A' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px', color: '#60A5FA' }}>🏔️ Why DFW Clay Soil Is Different</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            <div>
              <p style={{ color: '#CBD5E1', margin: 0, lineHeight: 1.7, fontSize: 15 }}>
                DFW sits on expansive clay soil — the kind that swells when wet and shrinks when dry. 
                This creates a seasonal "breathing" effect under your foundation: 
                <strong style={{ color: '#F1F5F9' }}> up to 4 inches of vertical movement per year</strong> in poorly drained areas.
              </p>
            </div>
            <div>
              <p style={{ color: '#CBD5E1', margin: 0, lineHeight: 1.7, fontSize: 15 }}>
                Water that pools near your foundation doesn't just cause flooding — it causes the soil to swell, 
                then dry, then crack. Each cycle chips away at your slab's structural integrity. 
                Foundation repairs in DFW average <strong style={{ color: '#EF4444' }}>$10,000–$50,000</strong> for damage caused by preventable drainage issues.
              </p>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 8px' }}>📋 Drainage Assessment Checklist</h2>
          <p style={{ color: '#94A3B8', margin: '0 0 24px' }}>Check each item that currently applies to your property:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {checkItems.map(item => (
              <div
                key={item.id}
                onClick={() => toggle(item.id)}
                style={{ background: checked[item.id] ? 'rgba(34,197,94,0.1)' : '#1E2D45', border: `1px solid ${checked[item.id] ? '#22C55E' : '#2D3F5A'}`, borderRadius: 10, padding: '16px 20px', cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: 16, transition: 'all 0.2s' }}
              >
                <div style={{ width: 24, height: 24, borderRadius: 6, border: `2px solid ${checked[item.id] ? '#22C55E' : '#4B5563'}`, background: checked[item.id] ? '#22C55E' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2, color: '#fff', fontWeight: 800, fontSize: 14 }}>
                  {checked[item.id] ? '✓' : ''}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: checked[item.id] ? '#86EFAC' : '#F1F5F9' }}>{item.label}</div>
                  <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.6 }}>{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score */}
        <div style={{ background: '#1E3A5F', borderRadius: 16, padding: 32, marginBottom: 48, border: `2px solid ${grade.color}`, textAlign: 'center' }}>
          <div style={{ fontSize: 72, fontWeight: 900, color: grade.color, lineHeight: 1 }}>{grade.grade}</div>
          <div style={{ fontSize: 18, fontWeight: 600, margin: '8px 0 4px' }}>{score}/{total} checks passed ({pct}%)</div>
          <div style={{ color: '#94A3B8', fontSize: 15 }}>{grade.message}</div>
        </div>

        {/* Solutions */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 8px' }}>🛠️ Solutions by Problem</h2>
          <p style={{ color: '#94A3B8', margin: '0 0 24px' }}>DFW-specific drainage solutions with realistic cost ranges:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {solutions.map(s => (
              <div key={s.problem} style={{ background: '#1E2D45', borderRadius: 10, padding: 20, border: '1px solid #2D3F5A', display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700, background: `${priorityColor[s.priority]}22`, color: priorityColor[s.priority] }}>{s.priority}</span>
                    {s.diy && <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700, background: 'rgba(99,102,241,0.15)', color: '#A5B4FC' }}>DIY Possible</span>}
                  </div>
                  <div style={{ fontWeight: 600, color: '#FCA5A5', marginBottom: 6, fontSize: 14 }}>Problem: {s.problem}</div>
                  <div style={{ color: '#CBD5E1', fontSize: 14 }}>Solution: {s.solution}</div>
                </div>
                <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <div style={{ color: '#22C55E', fontWeight: 700, fontSize: 16 }}>{s.cost}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DFW Warning */}
        <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 12, padding: 24, marginBottom: 48 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#FCA5A5', margin: '0 0 12px' }}>⚠️ DFW-Specific Warning: Don't Over-Water Your Foundation</h3>
          <p style={{ color: '#CBD5E1', margin: 0, lineHeight: 1.7, fontSize: 15 }}>
            Many DFW homeowners add foundation watering systems to prevent drought shrinkage — this is valid in dry summers. 
            However, if you also have a drainage problem, adding water near your foundation creates the worst of both worlds: 
            soil that swells unevenly because moisture levels vary around the perimeter. 
            <strong style={{ color: '#F1F5F9' }}> Fix drainage first, then add foundation watering only in dry zones.</strong>
          </p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '32px', background: 'linear-gradient(135deg, #1E3A5F, #1a2a4a)', borderRadius: 16, border: '1px solid #2D4A7A' }}>
          <h3 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 12px' }}>Get a Professional Drainage Assessment</h3>
          <p style={{ color: '#94A3B8', margin: '0 0 24px' }}>ProLnk connects you with DFW drainage specialists who understand local clay soil and foundation dynamics.</p>
          <a href="/get-quotes" style={{ display: 'inline-block', padding: '14px 32px', background: '#3B82F6', color: '#fff', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}>
            Find Drainage Pros Near Me →
          </a>
        </div>
      </div>
    </div>
  );
}
