import { useState } from 'react';

const userTypes = [
  { label: 'Homeowner needing work', icon: '🏠', steps: ['Join waitlist at prolnk.io — takes 90 seconds, completely free', 'Preview Charter pros available in your DFW zip code before any commitment', 'Browse the Home Health Vault demo — see what condition data looks like for your home type', 'Submit a job request when ready — no fee until a match is made and accepted', 'Walk away any time before match acceptance — zero obligation'] },
  { label: 'Home service pro', icon: '🔧', steps: ['Join the Charter Tier waitlist (limited to 500 applications)', 'See the 5-stream income calculator — plug in your current revenue and see ProLnk uplift', 'Preview the types of leads that will flow through your trade category in DFW', 'Read the Network Income System explainer — understand the 4-level cascade before committing', 'Waitlist closes at 500 Pros — Charter pricing ($149/mo) locks in permanently once approved'] },
  { label: 'Potential field scout', icon: '🗺️', steps: ['Read about the Field Scout role — help homeowners add homes to the Vault', 'Understand Stream 5 origination rights — permanent share of platform fees per home', 'See the territory map — check if your DFW area has open scout coverage', 'Calculate your potential: 50 homes added × $15/year origination = $750/year passive income', 'No upfront cost to become a scout — apply via the waitlist and select "Scout" role'] },
  { label: 'Investor/curious observer', icon: '💼', steps: ['Read the ProLnk unit economics — 85% net margin at scale', 'Review the Home Health Vault data asset — 50M+ home database with structural and health data', 'Understand the AI agent infrastructure — 47 agents, 130+ database tables, fully autonomous ops', 'See the competitive moat summary — Network Income lock-in + data flywheel + AI feedback loop', 'Contact andrew@prolnk.io for seed round discussion — Series A prep underway'] },
];

export default function DFWProLnkTestDriveGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🚀</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>ProLnk Test Drive Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Experience ProLnk with zero risk — no payment, no commitment, no pressure</p>
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, marginBottom: 28, borderLeft: '4px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 12 }}>🛡️ The Zero-Risk Guarantee</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7 }}>
            Joining the ProLnk waitlist costs <strong style={{ color: '#F5E642′ }}>nothing and obligates nothing</strong>. You can browse available Charter Pros in your DFW area, preview the Home Health Vault demo, and run the income calculator — all before deciding if ProLnk is right for you. No credit card. No contract. No follow-up calls unless you request them.
          </p>
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 12 }}>⏰ Why the Waitlist Closes at 500</h2>
          <ul style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Charter Tier ($149/mo locked forever) closes at 500 approved pros</li>
            <li>After 500: pricing moves to $199/mo Founding Tier</li>
            <li>After 1,600: open market pricing begins</li>
            <li>First 500 homeowners also get priority matching when platform goes live</li>
            <li>DFW is the launch market — first access goes to DFW waitlist</li>
          </ul>
        </div>

        <div style={{ marginBottom: 12 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 16 }}>🎯 Your Role → Low-Risk ProLnk Experience</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {userTypes.map((u, i) => (
              <button key={i} onClick={() => setSelected(i === selected ? null : i)}
                style={{ background: selected === i ? '#F5E642′ : '#1e3a5f', color: selected === i ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '10px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                {u.icon} {u.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ background: '#0F2140', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <h3 style={{ color: '#F5E642', marginBottom: 12 }}>{userTypes[selected].icon} {userTypes[selected].label} — Your ProLnk Path</h3>
              <ol style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
                {userTypes[selected].steps.map((s, i) => <li key={i}>{s}</li>)}
              </ol>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 32 }}>
          <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
            <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>🏠 Homeowners</p>
            <p style={{ color: '#0A1628', fontSize: 13 }}>Join free at prolnk.io — no payment ever required to browse or request quotes</p>
          </div>
          <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, textAlign: 'center', border: '2px solid #F5E642′ }}>
            <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>🔧 Pros</p>
            <p style={{ color: '#cbd5e1', fontSize: 13 }}>Charter waitlist is live — 500 spots, $149/mo locked forever</p>
          </div>
        </div>
      </div>
    </div>
  );
}