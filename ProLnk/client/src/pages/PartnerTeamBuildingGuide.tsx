import { useState } from 'react';

export default function PartnerTeamBuildingGuide() {
  const [teamSize, setTeamSize] = useState(2);
  const [jobsPerPerson, setJobsPerPerson] = useState(5);

  const soloJobs = 5;
  const totalJobs = teamSize * jobsPerPerson;
  const multiplier = (totalJobs / soloJobs).toFixed(1);
  const leadsPerWeek = Math.round(totalJobs * 0.6);
  const monthlyCommission = Math.round(leadsPerWeek * 4 * 45 * 0.35);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#0f172a', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#64748b', letterSpacing: 1 }}>PROLNK PARTNER STRATEGY</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12, lineHeight: 1.15 }}>
          Build a ProLnk Team<br />
          <span style={{ color: '#2563eb' }}>Scale Beyond Solo</span>
        </h1>
        <p style={{ color: '#475569', fontSize: 16, marginBottom: 48, maxWidth: 600 }}>
          Some of the highest-earning ProLnk partners have built small teams: a crew that uploads photos, an office manager who tracks leads, and the owner who closes jobs. This is how you scale to <strong>$15,000+/mo</strong>.
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#0f172a' }}>👥 Team Roles and What They Do</h2>
        <div style={{ display: 'grid', gap: 16, marginBottom: 48 }}>
          {[
            { emoji: '📸', role: 'Field Crew', focus: 'Upload job photos. Train each person on what photos drive AI detection. Every job should be documented from 4+ angles.', pay: '$5–10 per job' },
            { emoji: '📋', role: 'Lead Coordinator', focus: 'Monitor ProLnk dashboard, accept/decline leads, schedule jobs, follow up. This role directly impacts your conversion rate.', pay: '$15–20/hr' },
            { emoji: '🤝', role: 'Recruiter (Optional)', focus: 'Dedicated to growing your downline network. Commission overrides on every recruit they bring in flows back to you.', pay: 'Commission-based' },
            { emoji: '⭐', role: 'Owner / Pro', focus: 'Close jobs, maintain customer relationships, ensure quality. The relationship layer that AI cannot replace.', pay: 'You keep the margin' },
          ].map(r => (
            <div key={r.role} style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: '56px 1fr auto', gap: 16, alignItems: 'start' }}>
              <div style={{ fontSize: 32, lineHeight: 1 }}>{r.emoji}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 17, color: '#0f172a', marginBottom: 4 }}>{r.role}</div>
                <div style={{ color: '#64748b', fontSize: 14 }}>{r.focus}</div>
              </div>
              <div style={{ background: '#eff6ff', padding: '6px 14px', borderRadius: 20, fontSize: 13, color: '#2563eb', fontWeight: 600, whiteSpace: 'nowrap' }}>{r.pay}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, border: '1px solid #e2e8f0', marginBottom: 48 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>🔑 Sub-Account Access</h3>
          <p style={{ color: '#475569', margin: 0, fontSize: 15 }}>
            ProLnk sub-accounts allow multiple users on one partner account. Your field crew and coordinator get their own logins with role-based permissions — without sharing your master credentials.
          </p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#0f172a' }}>📈 Team ROI Calculator</h2>
        <div style={{ background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #e2e8f0', marginBottom: 48 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#475569', marginBottom: 10 }}>
                Team size (including you): <strong style={{ color: '#2563eb' }}>{teamSize} people</strong>
              </label>
              <input
                type="range" min={1} max={10} value={teamSize}
                onChange={e => setTeamSize(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#2563eb' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#94a3b8', marginTop: 4 }}>
                <span>1 (Solo)</span><span>10 people</span>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#475569', marginBottom: 10 }}>
                Jobs per person per week: <strong style={{ color: '#2563eb' }}>{jobsPerPerson}</strong>
              </label>
              <input
                type="range" min={1} max={20} value={jobsPerPerson}
                onChange={e => setJobsPerPerson(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#2563eb' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#94a3b8', marginTop: 4 }}>
                <span>1</span><span>20</span>
              </div>
            </div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #1d4ed8, #2563eb)', borderRadius: 12, padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: 13, color: '#bfdbfe', marginBottom: 6 }}>WEEKLY JOBS UPLOADED</div>
                <div style={{ fontSize: 40, fontWeight: 800, color: '#fff' }}>{totalJobs}</div>
                <div style={{ fontSize: 13, color: '#93c5fd' }}>{multiplier}× vs solo</div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: '#bfdbfe', marginBottom: 6 }}>LEADS GENERATED / WK</div>
                <div style={{ fontSize: 40, fontWeight: 800, color: '#fff' }}>{leadsPerWeek}</div>
                <div style={{ fontSize: 13, color: '#93c5fd' }}>est. 60% conversion</div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: '#bfdbfe', marginBottom: 6 }}>EST. MONTHLY COMMISSION</div>
                <div style={{ fontSize: 40, fontWeight: 800, color: '#4ade80' }}>${monthlyCommission.toLocaleString()}</div>
                <div style={{ fontSize: 13, color: '#93c5fd' }}>at 35% avg tier</div>
              </div>
            </div>
          </div>

          <p style={{ color: '#64748b', fontSize: 13, marginTop: 16, marginBottom: 0 }}>
            * Estimates based on average DFW match value of $45 and Tier 3 commission rate. Individual results vary.
          </p>
        </div>

        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: 24, marginBottom: 48 }}>
          <div style={{ fontWeight: 700, color: '#15803d', marginBottom: 8 }}>💡 The Math</div>
          <p style={{ color: '#166534', margin: 0, fontSize: 15 }}>
            "If your crew uploads 20 jobs/week instead of 5, your lead generation increases 4×. 4× leads = 4× commission potential. A two-person team with a coordinator can realistically hit $8,000–$15,000/mo within 6 months."
          </p>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #1d4ed8)', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🚀</div>
          <h3 style={{ fontSize: 22, fontWeight: 700, margin: '12px 0 8px', color: '#f1f5f9' }}>Ready to Build Your Team?</h3>
          <p style={{ color: '#93c5fd', marginBottom: 24 }}>Apply now before Charter membership closes at 25 partners. Lock in your position before the waitlist fills.</p>
          <a href="/apply" style={{ display: 'inline-block', background: '#fff', color: '#1d4ed8', padding: '14px 32px', borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
            Apply for Charter Membership →
          </a>
        </div>

      </div>
    </div>
  );
}
