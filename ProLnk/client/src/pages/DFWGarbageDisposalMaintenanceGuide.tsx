import { useState } from 'react';

const ageOptions = ['Less than 2 years', '2–4 years', '4–6 years', '6–9 years', '10+ years'];
const usageOptions = ['Light (1–2 people, minimal use)', 'Moderate (3–4 people, regular use)', 'Heavy (5+ people or large gatherings)'];
const hardnessOptions = ['High (Dallas, Fort Worth, Denton)', 'Very High (Plano, Frisco, McKinney, Allen)', 'Moderate (other DFW suburb)'];

function getResult(age: string, usage: string, hardness: string) {
  const highHard = hardness.includes('Very High');
  const heavy = usage.includes('Heavy');
  const old = age.includes('10+') || age.includes('6–9');
  const schedule = heavy ? 'Monthly deep clean + weekly baking soda/vinegar flush' : 'Monthly clean, bi-monthly vinegar flush';
  let lifespan = '8–12 years (standard)';
  let action = '✅ Continue regular maintenance. Clean monthly. Avoid fibrous foods and hard water scale buildup.';
  if (old && heavy) { lifespan = 'Near end of life'; action = '🚨 Consider replacement soon. Signs: frequent jams, humming without spinning, persistent odors after cleaning. Budget $150–$450 installed.'; }
  else if (old) { lifespan = '1–3 years remaining'; action = '⚠️ Begin budgeting for replacement. DFW hard water has likely shortened lifespan. Annual inspection recommended.'; }
  else if (highHard && age.includes('4–6')) { lifespan = '4–6 years remaining'; action = '⚠️ Hard water scale is building up. Descale with citric acid quarterly. Consider a pre-filter to extend lifespan.'; }
  return { schedule, lifespan, action };
}

export default function DFWGarbageDisposalMaintenanceGuide() {
  const [age, setAge] = useState('');
  const [usage, setUsage] = useState('');
  const [hardness, setHardness] = useState('');
  const result = age && usage && hardness ? getResult(age, usage, hardness) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>🔧 DFW Home Health Vault</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>Garbage Disposal Maintenance — DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, fontSize: 15 }}>DFW's hard water (15–22 GPG) leaves mineral scale inside your disposal and drain line over time. Combined with holiday cooking waste and daily use, this accelerates wear and odor buildup faster than in softer-water cities.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🚫', title: 'Never Put In Disposal', body: 'Bones, celery, onion skins, potato peels, grease, pasta, rice, coffee grounds, eggshells — all cause jams or drain clogs in DFW pipes.' },
            { icon: '🔄', title: 'Reset Button Location', body: 'Under the unit — small red button. Press if disposal hums but won\’t spin. Also try the hex key slot on the bottom to manually free the grind plate.' },
            { icon: '🧊', title: 'DFW Tip: Ice Cubes', body: 'Run ice cubes through monthly — cleans the grind plate and knocks loose mineral deposits from DFW hard water.' },
            { icon: '🔁', title: 'Repair vs. Replace', body: 'If the unit is 8+ years old and requires a second repair, replacement is almost always more cost-effective ($150–$450 installed).' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0F2040', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{c.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>📊 Maintenance Schedule & Lifespan Estimate</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 20 }}>
            {[
              { label: 'Disposal Age', val: age, setter: setAge, options: ageOptions },
              { label: 'Usage Intensity', val: usage, setter: setUsage, options: usageOptions },
              { label: 'DFW Water Hardness Zone', val: hardness, setter: setHardness, options: hardnessOptions },
            ].map(f => (
              <div key={f.label}>
                <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>{f.label}</label>
                <select value={f.val} onChange={e => f.setter(e.target.value)} style={{ width: '100%', background: '#1A2F50', border: '1px solid #2A4A70', borderRadius: 8, color: '#E8EDF5', padding: '10px 12px', fontSize: 13 }}>
                  <option value=''>Select</option>
                  {f.options.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div><div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>📅 RECOMMENDED SCHEDULE</div><div style={{ color: '#E8EDF5', fontSize: 14 }}>{result.schedule}</div></div>
              <div><div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>⏳ ESTIMATED LIFESPAN</div><div style={{ color: '#E8EDF5', fontSize: 14 }}>{result.lifespan}</div></div>
              <div><div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>💡 ACTION</div><div style={{ color: '#E8EDF5', fontSize: 14 }}>{result.action}</div></div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>🧼 Monthly Cleaning Routine</div>
          <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.8 }}>
            • Pour 1/2 cup baking soda + 1 cup white vinegar — let foam 10 min, flush with hot water<br/>
            • Run ice cubes with a handful of coarse salt to clean grind plate<br/>
            • Cut lemon into wedges and grind to neutralize DFW hard water odor buildup<br/>
            • Always run cold water 30 seconds before and after use to flush residue through the drain
          </div>
        </div>
      </div>
    </div>
  );
}
