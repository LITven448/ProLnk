import { useState } from 'react';

export default function DFWHomeMaintenancePartners2026() {
  const [trade, setTrade] = useState('');
  const [strategy, setStrategy] = useState<{ title: string; steps: string[]; icon: string } | null>(null);

  const strategies: Record<string, { title: string; steps: string[]; icon: string }> = {
    plumber: {
      title: 'Your Go-To DFW Plumber',
      icon: '🔧',
      steps: ['Find a licensed plumber on ProLnk before your first emergency', 'Schedule annual plumbing inspection ($150-250) to catch issues early', 'Ask about annual service agreement — priority scheduling + discounted rates', 'Store their number in your phone as "Plumber - [Name]" for instant access'],
    },
    hvac: {
      title: 'Your DFW HVAC Partner',
      icon: '❄️',
      steps: ['Sign an annual HVAC maintenance agreement — bi-annual tune-ups (spring + fall)', 'DFW HVAC runs 8-10 months/year — maintenance is not optional', 'Agreement pros prioritize your call during summer heat emergencies', 'Ask ProLnk Charter HVAC pros about multi-year maintenance packages'],
    },
    electrician: {
      title: 'Your DFW Electrician',
      icon: '⚡',
      steps: ['Establish relationship before adding EV charger, solar, or panel upgrade', 'Ask for home electrical audit — identifies hazards before they become emergencies', 'DFW older homes (pre-1990) often need panel upgrades — plan for $3-8K', 'License verification critical — only use TECL-licensed electricians in Texas'],
    },
    handyman: {
      title: 'Your DFW Handyman',
      icon: '🛠️',
      steps: ['Handyman = your first call for jobs under $500 and under 2 hours', 'Build relationship for seasonal prep: weatherstripping, caulking, gutter cleaning', 'Good handymen are booked months out in DFW — find yours early', 'Charter pros on ProLnk offer recurring homeowner relationships'],
    },
    foundation: {
      title: 'Your DFW Foundation Specialist',
      icon: '🏠',
      steps: ['DFW expansive clay means every homeowner needs a trusted foundation contact', 'Schedule baseline foundation inspection to document current state', 'Annual monitoring photos + crack mapping = early warning system', 'Establish relationship before cracks appear — emergency calls cost 40% more'],
    },
    roofing: {
      title: 'Your DFW Roofing Partner',
      icon: '🏗️',
      steps: ['After every hail event, call your roofer for free inspection before insurance claim', 'DFW averages 7-9 hail events per year — roofing relationship is essential', 'Avoid door-to-door roofers post-storm (high scam rate in DFW)', 'ProLnk Charter roofers offer storm response priority to existing clients'],
    },
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Home Maintenance Partnership Guide 2026</h1>
        <p style={{ color: '#8899aa', marginBottom: 32 }}>Build your go-to contractor team before you need them — the DFW homeowner advantage.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 32 }}>
          {['🔧 Plumber', '❄️ HVAC', '⚡ Electrician', '🛠️ Handyman', '🏠 Foundation', '🏗️ Roofer'].map((t) => (
            <div key={t} style={{ background: '#132240', borderRadius: 10, padding: '16px', textAlign: 'center', fontWeight: 600, fontSize: 14 }}>{t}</div>
          ))}
        </div>

        <div style={{ background: '#132240', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Trade Partnership Strategy Builder</div>
          <select value={trade} onChange={(e) => { setTrade(e.target.value); setStrategy(strategies[e.target.value] || null); }}
            style={{ width: '100%', padding: '12px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #F5E642', marginBottom: 12, fontSize: 15 }}>
            <option value="">Select trade need...</option>
            <option value="plumber">Plumber</option>
            <option value="hvac">HVAC Technician</option>
            <option value="electrician">Electrician</option>
            <option value="handyman">Handyman</option>
            <option value="foundation">Foundation Specialist</option>
            <option value="roofing">Roofing Contractor</option>
          </select>
          {strategy && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '16px' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{strategy.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>{strategy.title}</div>
              {strategy.steps.map((s) => (
                <div key={s} style={{ display: 'flex', gap: 10, marginBottom: 8, color: '#cdd9e5', fontSize: 14 }}>
                  <span style={{ color: '#F5E642' }}>▸</span>{s}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#132240', borderRadius: 12, padding: '20px', marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Why Charter Pros on ProLnk?</div>
          {['Charter pros commit to ongoing homeowner relationships, not one-off jobs', 'Annual service agreements available across all trades', 'Priority scheduling for Charter clients during DFW storm season', 'Single platform to manage all your trade relationships and history'].map((tip) => (
            <div key={tip} style={{ display: 'flex', gap: 10, marginBottom: 8, color: '#cdd9e5', fontSize: 14 }}>
              <span style={{ color: '#F5E642' }}>▸</span>{tip}
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: '20px', textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 6 }}>Build Your DFW Pro Team on ProLnk</div>
          <div style={{ fontSize: 14 }}>Match with Charter-tier pros in every trade who prioritize long-term homeowner relationships.</div>
        </div>
      </div>
    </div>
  );
}