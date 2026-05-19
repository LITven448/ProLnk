import { useState } from 'react';

const situations = [
  {
    id: 'new-homeowner', icon: '🏠', label: 'New DFW Homeowner',
    help: [
      { title: '4,500+ Pages of DFW Knowledge', desc: 'We have guides on every home system, neighborhood, and season specific to DFW — not generic advice from a national site.' },
      { title: 'Verified Local Pros Only', desc: 'Every contractor on ProLnk is licensed, insured, and background-checked. No out-of-state fly-by-nights after storm season.' },
      { title: 'Home Health Vault', desc: 'Store your HVAC manuals, permits, warranties, and service history in one place. Access it forever, even if you sell.' },
    ]
  },
  {
    id: 'need-repair', icon: '🔧', label: 'Need a Home Repair',
    help: [
      { title: 'Fast DFW Pro Matching', desc: 'Describe your issue, get matched with available local pros — not a national call center. Real DFW contractors who know local codes.' },
      { title: 'Transparent Pricing', desc: 'Compare quotes from multiple pros. No surprise fees. DFW-calibrated pricing so you know what’s fair.' },
      { title: 'Service History Tracking', desc: 'Every repair logged in your Home Health Vault. Know exactly what was done, who did it, and what it cost — forever.' },
    ]
  },
  {
    id: 'contractor', icon: '👷', label: 'I’m a DFW Contractor',
    help: [
      { title: 'Vetted Lead Flow', desc: 'Stop chasing Yelp and Angi leads. ProLnk sends you homeowners who are ready to book — matched by trade, service area, and availability.' },
      { title: '5-Stream Income', desc: 'Earn from direct jobs, referrals from your network of pros, homeowner referrals, and origination rights on homes you bring in.' },
      { title: 'Network Income System', desc: 'Build a team of referred pros and earn overrides on their earnings — 4 levels deep. The only platform where pros build real residual income.' },
    ]
  },
  {
    id: 'investor', icon: '📈', label: 'Real Estate Investor',
    help: [
      { title: 'Property Portfolio Management', desc: 'Manage maintenance and service history across multiple DFW properties in one Home Health Vault dashboard.' },
      { title: 'Preferred Contractor Network', desc: 'Build relationships with reliable DFW pros and route work directly through ProLnk — no middleman markup.' },
      { title: 'Home Health Data', desc: 'Documented home health history increases property value and speeds up closing — buyers trust properties with verified maintenance records.' },
    ]
  },
];

export default function DFWProLnkHomeOwnerFinalNote2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const situation = situations.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK · A NOTE TO DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>💛 A Final Note to DFW Homeowners</h1>
        <p style={{ color: '#94a3b8', marginBottom: 16 }}>DFW homeownership is hard. The heat is extreme, the contractors are stretched thin after every storm, and the advice you find online was written for someone in Ohio.</p>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>We built ProLnk for DFW specifically. Every page, every pro, every data point is calibrated for the Dallas-Fort Worth market — because generic platforms aren't enough for the most demanding climate in the US.</p>

        <div style={{ background: '#132035', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16, color: '#F5E642' }}>Who are you?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)} style={{ padding: '18px', borderRadius: 12, border: `2px solid ${selected === s.id ? '#F5E642' : 'transparent'}`, background: selected === s.id ? '#1e3a5f' : '#0A1628', cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>{s.label}</div>
              </button>
            ))}
          </div>
        </div>

        {situation && (
          <div style={{ background: '#132035', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 20, color: '#F5E642' }}>{situation.icon} How ProLnk Helps {situation.label}s</div>
            <div style={{ display: 'grid', gap: 16 }}>
              {situation.help.map(h => (
                <div key={h.title} style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{h.title}</div>
                  <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{h.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#132035', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16, color: '#F5E642' }}>📊 The ProLnk Platform by the Numbers</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {[{ num: '4,500+', label: 'DFW-specific pages' }, { num: '47', label: 'AI agents working 24/7' }, { num: '130+', label: 'Database tables' }, { num: '5', label: 'Income streams for pros' }, { num: '50M+', label: 'Homes in the Vault' }, { num: '2026', label: 'Launch year' }].map(s => (
              <div key={s.label} style={{ background: '#0A1628', borderRadius: 10, padding: 14, textAlign: 'center' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 22 }}>{s.num}</div>
                <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center', color: '#0A1628' }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>💛</div>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>DFW Deserves Better. That's Why We Built ProLnk.</div>
          <div style={{ fontSize: 14, maxWidth: 480, margin: '0 auto' }}>Join the waitlist. Be part of the platform that finally understands your home, your climate, and your community.</div>
        </div>
      </div>
    </div>
  );
}
