import { useState } from 'react';

const stakeholders = [
  { id: 'charter-pro', label: '🔧 Charter Pro', expectations: ['First match queue access — Charter pros get leads before any other tier', 'Match requests arrive via SMS + app notification simultaneously', 'First 30 days: platform covers match fee as Charter onboarding credit', 'Vault records created for every job — builds your home data footprint', 'Your $149/mo locked for life — no rate increases as platform scales', 'DFW Charter pros become Houston expansion advisors (equity consideration)'] },
  { id: 'homeowner', label: '🏠 Homeowner', expectations: ['Submit job request — matched within 4 hours to a Charter pro', 'Vault record created automatically for your home after first job', 'All Charter pros are background-checked and licensed-verified', 'No fee to homeowners — ever. Pros pay to access leads.', 'Job history stored in Vault permanently — yours to keep, portable', 'DFW homeowners get priority support during Houston rollout'] },
  { id: 'investor', label: '💼 Investor', expectations: ['Launch day = Vault activation — data moat begins accumulating', 'First 500 Charter pros locked at $149/mo = $74,500 MRR floor', 'Match fee revenue starts day 1 — estimated $25-75 per match', 'DFW serves as template for Houston, Austin, San Antonio expansion', '47 AI agents handle operations — human team stays lean', 'All launch metrics captured via PostHog for seed deck'] },
  { id: 'scout', label: '📍 ProLnk Scout', expectations: ['Scouts who referred Charter pros get first override payments on launch day', 'Override tracker goes live with first match — real-time earnings visible', 'Scouts who recruited 5+ Charter pros in DFW = Priority Scout status', 'Origination rights attach to every home you brought to Vault', 'Launch day leaderboard shows Scout rankings by DFW zone', 'Houston expansion Scout invitations go to top 25 DFW Scouts first'] },
];

export default function DFWProLnkDFWLaunch2026B() {
  const [selected, setSelected] = useState<string | null>(null);
  const match = stakeholders.find(s => s.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '6px 14px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
          🚀 PROLNK DFW LAUNCH 2026 — PART 2
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>What Launch Day Looks Like in DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          Part 2 of the DFW launch guide. Launch day isn't a moment — it's a sequence. DFW is the template market. Every system, workflow, and metric we set here gets replicated for Houston.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 28 }}>
          {[
            { icon: '⚡', label: '4-hour match SLA' },
            { icon: '🔒', label: 'Charter rate locked' },
            { icon: '🏠', label: 'Vault goes live Day 1' },
          ].map(m => (
            <div key={m.label} style={{ background: '#112240', borderRadius: 10, padding: '16px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{m.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>{m.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Select your role to see launch day expectations:</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
          {stakeholders.map(s => (
            <button
              key={s.id}
              onClick={() => setSelected(selected === s.id ? null : s.id)}
              style={{
                background: selected === s.id ? '#F5E642' : '#112240',
                color: selected === s.id ? '#0A1628' : '#fff',
                border: 'none', borderRadius: 8, padding: '14px 18px',
                textAlign: 'left', cursor: 'pointer', fontSize: 15, fontWeight: 600,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {match && (
          <div style={{ background: '#112240', borderRadius: 10, padding: 20, marginBottom: 24, borderLeft: '4px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginBottom: 12 }}>Your Launch Day Experience</h3>
            <ul style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 2.2, paddingLeft: 20 }}>
              {match.expectations.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 16, textAlign: 'center' }}>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 15 }}>🏙️ DFW launches first. Houston launches next. You can be in both.</p>
          <p style={{ color: '#0A1628', fontSize: 13, marginTop: 4 }}>prolnk.io — Charter waitlist open, closing at 500 applications</p>
        </div>
      </div>
    </div>
  );
}