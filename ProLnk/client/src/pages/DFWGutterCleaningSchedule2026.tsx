import { useState } from 'react';

const seasons = [
  { name: 'Spring Clean', emoji: '🌸', months: 'March – May', trigger: 'After cedar + oak pollen season ends', desc: 'DFW oak trees shed massive pollen loads Feb–April. Wait until late May for post-pollen clear-out. This is the most debris-heavy clean of the year.', urgency: 'high' },
  { name: 'Fall Clean', emoji: '🍂', months: 'November – December', trigger: 'After oak leaf drop completes', desc: 'Live oaks drop leaves Nov–Dec. Wait until the bulk has fallen (usually mid-November) before cleaning — or you clean twice. Prevents winter clogs and ice dams in rare freezes.', urgency: 'high' },
  { name: 'Post-Storm Check', emoji: '⛈️', months: 'Any time', trigger: 'After DFW hail or severe storms', desc: 'DFW supercells dump shingle granules and debris. Check gutters within 2 weeks of any hail event — granule buildup accelerates decay and clogs downspouts fast.', urgency: 'critical' },
];

const warningSignsData = [
  { sign: '🌊 Overflow during rain', meaning: 'Full clog — needs immediate cleaning' },
  { sign: '🪨 Granules in gutters', meaning: 'Shingle wear — may need roof evaluation' },
  { sign: '🐦 Birds nesting', meaning: 'Debris deep enough to support a nest' },
  { sign: '🌱 Plants growing in gutters', meaning: 'Organic matter + soil buildup, clean ASAP' },
  { sign: '🦟 Mosquito presence near roofline', meaning: 'Standing water from partial clog' },
];

const treeOptions = ['Minimal trees (0–2)', 'Some trees (3–5)', 'Heavy coverage (6+ or large oaks)', 'Pine trees nearby'];

const freqMap: Record<string, string> = {
  'Minimal trees (0–2)': '1x/year — fall only is usually sufficient',
  'Some trees (3–5)': '2x/year — spring + fall, plus post-storm checks',
  'Heavy coverage (6+ or large oaks)': '3x/year — spring, summer spot-check, and fall. Consider gutter guards.',
  'Pine trees nearby': '3–4x/year — pine needles are the worst clogger. Monthly checks April–October.',
};

export default function DFWGutterCleaningSchedule2026() {
  const [coverage, setCoverage] = useState('Some trees (3–5)');
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🏠🍃</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0′ }}>DFW Gutter Cleaning Schedule 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Oak pollen, post-storm granules, and pine needles make DFW gutters a year-round job.</p>
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <label style={{ color: '#F5E642', fontSize: '0.95rem', fontWeight: 700, display: 'block', marginBottom: '0.75rem' }}>🌳 Tree Coverage Around Your Home</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {treeOptions.map(t => (
              <button key={t} onClick={() => setCoverage(t)} style={{ background: coverage === t ? '#F5E642′ : '#0A1628', color: coverage === t ? '#0A1628' : '#cbd5e1', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.5rem 1rem', fontSize: '0.88rem', cursor: ’pointer', textAlign: 'left', fontWeight: coverage === t ? 700 : 400 }}>{t}</button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.85rem', marginTop: '1rem' }}>
            <span style={{ color: '#F5E642', fontWeight: 700 }}>Your Schedule: </span>
            <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{freqMap[coverage]}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {seasons.map(s => (
            <div key={s.name} onClick={() => setExpanded(expanded === s.name ? null : s.name)} style={{ background: '#132040', borderRadius: 10, padding: '1rem 1.25rem', cursor: 'pointer', borderLeft: `4px solid ${s.urgency === 'critical' ? '#ef4444' : '#F5E642'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{s.emoji} <strong>{s.name}</strong> — <span style={{ color: '#94a3b8', fontSize: '0.88rem' }}>{s.months}</span></span>
                <span style={{ color: '#F5E642', fontSize: '0.8rem' }}>{s.trigger}</span>
              </div>
              {expanded === s.name && <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '0.65rem', lineHeight: 1.6 }}>{s.desc}</p>}
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '0.75rem', fontSize: '0.95rem' }}>⚠️ Signs Your Gutters Need Cleaning Now</h3>
          {warningSignsData.map(w => (
            <div key={w.sign} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid #1e3a5f', fontSize: '0.88rem' }}>
              <span style={{ color: '#cbd5e1′ }}>{w.sign}</span>
              <span style={{ color: '#94a3b8', fontSize: '0.82rem', maxWidth: '55%', textAlign: 'right' }}>{w.meaning}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>🏠 <strong style={{ color: '#F5E642′ }}>ProLnk</strong> connects you with licensed DFW gutter pros — fast quotes, logged service history in your Vault.</p>
        </div>
      </div>
    </div>
  );
}