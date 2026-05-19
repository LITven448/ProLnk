import { useState } from 'react';

const INCOME_STREAMS = [
  { name: 'Direct Commission', rate: '12–70% by tier', detail: 'Earn a cut of every job you close through ProLnk, scaling as you build your match history' },
  { name: 'Network Override', rate: '1–4% passive', detail: 'Earn overrides from pros you recruit into the network, 4 levels deep' },
  { name: 'Subscription Override', rate: '10% recurring/mo', detail: 'When your referred pro pays their $149/mo subscription, you earn 10% every month — forever' },
  { name: 'Homeowner Origination', rate: '$25–100/lead', detail: 'Bring homeowners into the network and earn a per-lead fee you negotiate with ProLnk' },
  { name: 'Home Origination Rights', rate: 'Lifetime %', detail: 'Help homeowners add homes to the Vault and earn a permanent share of all platform fees that home generates' },
];

const TRADE_PATHS: Record<string, { fit: string; income: string; start: string }> = {
  hvac: { fit: 'Perfect — HVAC is DFW’s highest-demand trade year-round', income: '$4,200–$9,800/mo at Tier 3+', start: 'Apply as a Field Pro and start with residential HVAC leads in your DFW zip codes' },
  plumber: { fit: 'Excellent — hard water and aging pipes keep demand constant', income: '$3,500–$8,200/mo at Tier 3+', start: 'Join as a Field Pro; ProLnk routes urgent leak and installation jobs first' },
  electrician: { fit: 'Strong — panel upgrades and EV chargers are surging in DFW suburbs', income: '$3,800–$9,000/mo at Tier 3+', start: 'Apply as a Field Pro; specialize in EV and panel work for premium job routing' },
  roofer: { fit: 'Great — DFW hail season creates surge demand every spring', income: '$5,000–$12,000/mo seasonal', start: 'Join before hail season; ProLnk routes storm assessments during surge periods' },
  realestate: { fit: 'Ideal Scout candidate — you already know homeowners and properties', income: '$2,500–$6,000/mo in origination + overrides', start: 'Join as a Scout; bring homeowners and pros into the network for passive income' },
  inspector: { fit: 'Strong Scout candidate — your inspection clients need contractors immediately', income: '$2,000–$5,000/mo in origination fees', start: 'Partner with ProLnk; your inspection clients join your homeowner network automatically' },
};

export default function DFWProLnkPartnerOpportunity() {
  const [trade, setTrade] = useState('');
  const [result, setResult] = useState<{fit:string;income:string;start:string} | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>DFW PARTNER OPPORTUNITY</div>
        <h1 style={{ fontSize: 34, fontWeight: 800, margin: '0 0 14px' }}>The ProLnk Partner Opportunity <span style={{ color: '#F5E642' }}>for DFW Tradespeople</span></h1>
        <p style={{ color: '#8FA3BF', fontSize: 15, lineHeight: 1.7, marginBottom: 36 }}>ProLnk isn't just another lead platform. It's a five-stream income system built specifically for DFW tradespeople and professionals who want to grow beyond the job-to-job grind.</p>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 0, marginBottom: 20, color: '#F5E642' }}>💸 The 5 Income Streams</h2>
          {INCOME_STREAMS.map((s, i) => (
            <div key={s.name} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: i < INCOME_STREAMS.length - 1 ? '1px solid #1E2F4A' : 'none' }}>
              <div style={{ minWidth: 32, height: 32, background: '#F5E642', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0A1628', fontWeight: 800, fontSize: 14 }}>{i+1}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 2 }}>{s.name} <span style={{ color: '#F5E642', fontSize: 13, fontWeight: 600 }}>({s.rate})</span></div>
                <div style={{ color: '#8FA3BF', fontSize: 13, lineHeight: 1.5 }}>{s.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
          {[['⏱️', 'Time Commitment', 'Set your own schedule — ProLnk works around your existing jobs'], ['🎓', 'Skills Needed', 'Your trade license + willingness to document jobs in the app'], ['🤝', 'Support Provided', 'Onboarding coach, DFW market pricing guide, and job documentation tools']].map(([e, t, d]) => (
            <div key={t} style={{ background: '#111E35', borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{e}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6, color: '#F5E642' }}>{t}</div>
              <div style={{ fontSize: 12, color: '#8FA3BF', lineHeight: 1.5 }}>{d}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 0, marginBottom: 20 }}>🎯 How Does ProLnk Fit Your DFW Business?</h2>
          <select value={trade} onChange={e => setTrade(e.target.value)} style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', padding: '11px 16px', fontSize: 15, width: '100%', marginBottom: 16 }}>
            <option value="">Select your trade or background...</option>
            <option value="hvac">HVAC Technician</option>
            <option value="plumber">Licensed Plumber</option>
            <option value="electrician">Master Electrician</option>
            <option value="roofer">Roofing Contractor</option>
            <option value="realestate">Real Estate Agent</option>
            <option value="inspector">Home Inspector</option>
          </select>
          <button onClick={() => trade && setResult(TRADE_PATHS[trade])} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '13px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer', width: '100%', marginBottom: 16 }}>See My ProLnk Opportunity</button>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 22, borderLeft: '4px solid #F5E642' }}>
              <div style={{ marginBottom: 12 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Fit: </span>{result.fit}</div>
              <div style={{ marginBottom: 12 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Income Potential: </span>{result.income}</div>
              <div><span style={{ color: '#F5E642', fontWeight: 700 }}>Getting Started: </span>{result.start}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
