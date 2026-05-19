import { useState } from 'react';

const SOURCES = [
  { name: 'ProLnk', icon: '🔗', desc: 'Vetted DFW pros with verified licenses, reviews, and insurance.', url: 'prolnk.io', tag: 'Best' },
  { name: 'Nextdoor Recommendations', icon: '🏘️', desc: 'Neighbor referrals — useful but verify license independently.', url: 'nextdoor.com', tag: 'Community' },
  { name: 'NARI Member Directory', icon: '📋', desc: 'National Assoc. of the Remodeling Industry — credentialed contractors.', url: 'nari.org', tag: 'Trade Org' },
  { name: 'Manufacturer-Certified Lists', icon: '✅', desc: 'HVAC brands (Trane, Lennox), roofing brands (GAF, CertainTeed) maintain certified installer lists.', url: 'via brand websites', tag: 'Certified' },
];

const PROJECT_DATA: Record<string, { contractor: string; waitlist: string; questions: string[] }> = {
  'HVAC': {
    contractor: 'Licensed HVAC Technician (TDLR license required in TX)',
    waitlist: 'April–June: 4–8 weeks. Off-season (Oct–Feb): 1–2 weeks.',
    questions: ['Are you NATE-certified?', 'Do you pull permits?', 'What is your service warranty?', 'Is your company licensed with TDLR?'],
  },
  'Roofing': {
    contractor: 'Licensed Roofing Contractor (TX requires license for commercial; verify local municipality for residential)',
    waitlist: 'Post-hail storm: 6–12 weeks. Normal season: 2–4 weeks.',
    questions: ['Are you a GAF or CertainTeed certified installer?', 'Do you handle insurance claims?', 'What is your workmanship warranty?', 'Are you pulling a permit?'],
  },
  'Foundation': {
    contractor: 'Foundation Repair Specialist (PE-stamped design required for major repairs)',
    waitlist: 'Spring (after rains): 3–5 weeks. Summer: 2–3 weeks.',
    questions: ['Will a structural engineer evaluate my foundation?', 'What repair method do you use (piers vs slab)?', 'What is your transferable warranty?', 'Do you provide a written drainage plan?'],
  },
  'Plumbing': {
    contractor: 'Licensed Master Plumber (TSBPE license required in TX)',
    waitlist: 'Emergency: same day. Planned work: 1–3 weeks.',
    questions: ['Are you TSBPE licensed?', 'Do you provide a camera inspection before quoting re-pipes?', 'Is labor warranted separately from parts?', 'Do you pull city permits?'],
  },
  'Electrical': {
    contractor: 'Licensed Master Electrician (TDLR license required in TX)',
    waitlist: 'Emergency: same day. Panel upgrades: 2–4 weeks.',
    questions: ['Are you TDLR licensed?', 'Do you pull permits and arrange inspections?', 'Is panel work covered by workmanship warranty?', 'Do you offer whole-home electrical audit?'],
  },
  'General Remodel': {
    contractor: 'General Contractor (TX does not require GC license; verify local municipality)',
    waitlist: 'Year-round: 3–8 weeks depending on project size.',
    questions: ['How long have you been in DFW?', 'Do you use subcontractors and are they licensed?', 'What is your project management process?', 'Can you provide 3 local references?'],
  },
};

const RED_FLAGS = [
  'Asks for full payment upfront',
  'No physical address or P.O. Box only',
  'Cannot provide license number',
  'Refuses to pull permits',
  'Only accepts cash',
  'No written contract or scope of work',
  'Drastically lower bid than all others',
  'High-pressure "today only" pricing',
];

const INTERVIEW_Qs = [
  'Can I see your license and insurance certificate?',
  'Do you pull permits for this type of work?',
  'How long is your workmanship warranty?',
  'Who are your subcontractors and are they licensed?',
  'Can you provide 3 recent local references?',
  'What is your payment schedule tied to milestones?',
];

export default function DFWHomeContractorSearchGuide() {
  const [projectType, setProjectType] = useState('HVAC');
  const [timeline, setTimeline] = useState('flexible');
  const [showGuide, setShowGuide] = useState(false);

  const data = PROJECT_DATA[projectType];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 4, fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>DFW HOMEOWNER GUIDE</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.75rem 0 0.25rem' }}>🔍 How to Find & Hire a Contractor in DFW</h1>
          <p style={{ color: '#8FA3BF', marginTop: 4 }}>Where to look, when to book, what to ask, and red flags to avoid in the Dallas-Fort Worth market.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {SOURCES.map(s => (
            <div key={s.name} style={{ background: '#0D1F3A', border: '1px solid #1E3A5F', borderRadius: 10, padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <span style={{ fontSize: 22 }}>{s.icon}</span>
                <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 4, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>{s.tag}</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{s.name}</div>
              <div style={{ fontSize: 12, color: '#8FA3BF', marginBottom: 4 }}>{s.desc}</div>
              <div style={{ fontSize: 11, color: '#F5E642′ }}>{s.url}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D1F3A', border: '1px solid #EF4444', borderRadius: 10, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#EF4444', fontSize: '1rem', fontWeight: 700, marginBottom: 10 }}>🚩 Red Flags — Walk Away Immediately</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 8 }}>
            {RED_FLAGS.map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                <span style={{ color: '#EF4444', fontWeight: 700 }}>✗</span> {f}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0D1F3A', border: '1px solid #1E3A5F', borderRadius: 10, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, marginBottom: 10 }}>❓ Always Ask Every Contractor</h2>
          <div style={{ display: 'grid', gap: 6 }}>
            {INTERVIEW_Qs.map((q, i) => (
              <div key={q} style={{ display: 'flex', gap: 10, fontSize: 13 }}>
                <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 18 }}>{i + 1}.</span> {q}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0D2238', border: '1px solid #F5E642', borderRadius: 10, padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>🎯 Find the Right Contractor for My Project</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#8FA3BF' }}>
              Project Type
              <select value={projectType} onChange={e => setProjectType(e.target.value)}
                style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 6, padding: '8px 12px', color: '#E8EDF5', fontSize: 14 }}>
                {Object.keys(PROJECT_DATA).map(k => <option key={k}>{k}</option>)}
              </select>
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#8FA3BF' }}>
              Timeline
              <select value={timeline} onChange={e => setTimeline(e.target.value)}
                style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 6, padding: '8px 12px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="urgent">Urgent (ASAP)</option>
                <option value="soon">Soon (1–4 weeks)</option>
                <option value="flexible">Flexible (1–3 months)</option>
                <option value="planning">Planning ahead (3+ months)</option>
              </select>
            </label>
          </div>

          <button onClick={() => setShowGuide(true)}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
            Show My Contractor Guide →
          </button>

          {showGuide && data && (
            <div style={{ marginTop: '1.25rem', display: 'grid', gap: '1rem' }}>
              <div style={{ background: 'rgba(245,230,66,0.06)', border: '1px solid #F5E642', borderRadius: 8, padding: '1rem' }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>Contractor Type Needed</div>
                <div style={{ fontSize: 14 }}>{data.contractor}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #1E3A5F', borderRadius: 8, padding: '1rem' }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>🕐 DFW Waitlist Reality ({timeline})</div>
                <div style={{ fontSize: 14 }}>{data.waitlist}</div>
                {timeline === 'urgent' && <div style={{ fontSize: 13, color: '#EF4444', marginTop: 6 }}>⚠️ Urgent requests often cost 20–40% more in DFW. If possible, book 4+ weeks ahead.</div>}
              </div>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #1E3A5F', borderRadius: 8, padding: '1rem' }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>Questions to Ask This Contractor</div>
                {data.questions.map((q, i) => (
                  <div key={q} style={{ display: 'flex', gap: 10, fontSize: 13, marginBottom: 6 }}>
                    <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 18 }}>{i + 1}.</span> {q}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
