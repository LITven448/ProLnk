import { useState } from 'react';

const roles = [
  { label: 'DFW Homeowner', key: 'homeowner', now: 'Submit your HVAC issue and get 3 matched pro quotes within hours. No cold calls, no guessing who to trust.', next: 'Your Home Health Vault tracks your HVAC system — age, service history, known issues. ProLnk uses this to send pre-season maintenance reminders and alert you when your system pattern suggests an upcoming failure.', future: 'AI matching learns from thousands of DFW HVAC jobs — routing you to the pro with the highest success rate on your specific system type and neighborhood. Average quote time drops from hours to minutes.' },
  { label: 'DFW HVAC Pro', key: 'pro', now: 'Receive qualified HVAC leads matched to your trade, license type, and service area. No chasing homeowners — leads come to you.', next: 'ProLnk feeds you homeowner HVAC history before you arrive — system age, past repairs, known issues. You show up knowing what you are walking into. Fewer diagnostic surprises, faster jobs.', future: 'Predictive maintenance alerts from Home Health Vault generate a new lead category: homeowners notified of likely failures before breakdown. These leads close at 3x the rate of reactive repair calls.' },
  { label: 'HVAC Contractor (Multiple Crews)', key: 'contractor', now: 'Manage lead volume and distribute to your crews through the ProLnk business dashboard. Track job status and outcomes across your team.', next: 'AI-powered territory optimization routes leads to your nearest available crew. Job history informs which crew types perform best on which job categories in DFW.', future: 'ProLnk fleet-level data will show your team performance benchmarks against the DFW market — identifying training gaps, top performers, and optimal crew sizing for your territory.' },
  { label: 'HVAC Dealer / Manufacturer', key: 'dealer', now: 'ProLnk routes replacement and installation leads to authorized dealers when homeowner system data indicates end-of-life equipment.', next: 'Home Health Vault data shows which HVAC brands and models are aging across DFW neighborhoods. Targeted dealer programs reach homeowners at the right replacement window — not random ads.', future: 'ProLnk predictive model will identify replacement demand 12–18 months before systems fail — giving dealers early pipeline visibility and homeowners time to plan instead of react.' },
];

export default function DFWHVACProLnkEvolution() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = roles.find(r => r.key === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, marginBottom: '0.5rem' }}>🚀 PROLNK PLATFORM</div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>How ProLnk HVAC Platform Evolves</h1>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', marginBottom: '2.5rem' }}>AI-powered matching, Home Health Vault data, and predictive maintenance alerts — here is what is coming for each role in the DFW HVAC market.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🏠', stat: '50M+', label: 'homes in ProLnk Home Health Vault' },
            { icon: '⚡', stat: '< 2 hrs', label: 'average time to first HVAC quote' },
            { icon: '🤖', stat: '47', label: 'AI agents running the ProLnk platform' },
            { icon: '🔧', stat: '3x', label: 'close rate on predictive vs reactive leads' },
          ].map(s => (
            <div key={s.label} style={{ background: '#0F2040', borderRadius: 10, padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.4rem' }}>{s.stat}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.2rem' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🎯 Your Role in the DFW HVAC Market</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {roles.map(r => (
              <button key={r.key} onClick={() => setSelected(r.key)} style={{ background: selected === r.key ? '#F5E642' : '#1a3a5c', color: selected === r.key ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>{r.label}</button>
            ))}
          </div>
          {match && (
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {[
                { phase: '🟢 Today', content: match.now },
                { phase: '🔵 Next 12 Months', content: match.next },
                { phase: '🟡 2027+', content: match.future },
              ].map(p => (
                <div key={p.phase} style={{ background: '#0A1628', borderRadius: 10, padding: '1rem', borderLeft: '3px solid #F5E642' }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.4rem', fontSize: '0.9rem' }}>{p.phase}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>{p.content}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>🏗️ Join the ProLnk DFW HVAC Network</div>
          <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.95rem' }}>Whether you are a homeowner or HVAC pro, the ProLnk platform is being built for you. Join the waitlist and shape the platform.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Join as Homeowner →</button>
            <button style={{ background: 'transparent', color: '#F5E642', border: '2px solid #F5E642', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Join as HVAC Pro →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
