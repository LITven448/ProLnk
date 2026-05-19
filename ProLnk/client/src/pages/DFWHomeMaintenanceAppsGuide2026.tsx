import { useState } from 'react';

const needs = [
  { id: 'track', label: '📋 Track Everything', desc: 'Full home maintenance log' },
  { id: 'adhoc', label: '🔨 Find a Pro Fast', desc: 'Ad hoc job, need help now' },
  { id: 'income', label: '💰 Earn From My Home', desc: 'Want income streams from services' },
  { id: 'vault', label: '🏦 Protect Home Value', desc: 'Documentation for resale' },
];

const recs: Record<string, { app: string; score: string; pros: string[]; cons: string[]; verdict: string }> = {
  track: {
    app: 'HomeZada',
    score: '3/5',
    pros: ['Detailed manual tracking', 'Budget tools included', 'Document storage'],
    cons: ['100% manual — no automation', 'No contractor network', 'No DFW-specific data'],
    verdict: 'Good for spreadsheet lovers. ProLnk Vault does this automatically with every booked job.',
  },
  adhoc: {
    app: 'Thumbtack / Angi',
    score: '2/5',
    pros: ['Large national pool', 'Quick quotes'],
    cons: ['Contractors pay to play — quality varies', 'No DFW-specific vetting', 'No relationship building', 'No income opportunity'],
    verdict: 'Works for one-off jobs but lacks quality guarantees. ProLnk Charter Pros are DFW-verified.',
  },
  income: {
    app: 'ProLnk',
    score: '5/5',
    pros: ['5 income streams — earn from referrals and origination', 'Verified Charter Pros only', 'Vault auto-documentation', 'DFW-native network'],
    cons: ['DFW-only for now (Houston/Austin coming 2027)'],
    verdict: 'Only platform that pays homeowners for participating. No other app offers this.',
  },
  vault: {
    app: 'ProLnk Vault',
    score: '5/5',
    pros: ['Auto-logs every ProLnk service visit', 'Date, contractor, scope captured', 'Adds 3–5% to resale value', 'Insurance claim support coming 2027'],
    cons: ['Only logs ProLnk-booked jobs (manual entry for others)'],
    verdict: 'Best documentation tool for DFW homeowners — automated and tied to your verified contractor history.',
  },
};

export default function DFWHomeMaintenanceAppsGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const rec = selected ? recs[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui,sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>📱</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: 0 }}>DFW Home Maintenance App Comparison 2026</h1>
          <p style={{ color: '#94a3b8', marginTop: '.5rem' }}>Which app actually serves DFW homeowners? We break it down.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[{name:'HomeZada',tag:'Manual tracking',score:'3/5'},{name:'Thumbtack',tag:'Ad hoc jobs',score:'2/5'},{name:'Angi',tag:'National, generic',score:'2/5'},{name:'ProLnk',tag:'DFW-native, income',score:'5/5'}].map(a => (
            <div key={a.name} style={{ background: '#1e3a5f', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, color: a.name==='ProLnk'?'#F5E642':'#fff' }}>{a.name}</div>
              <div style={{ fontSize: '.8rem', color: '#94a3b8', margin: '.25rem 0' }}>{a.tag}</div>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{a.score}</div>
            </div>
          ))}
        </div>

        <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>What do you need from a home app?</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {needs.map(n => (
            <button key={n.id} onClick={() => setSelected(n.id)} style={{ background: selected === n.id ? '#F5E642' : '#1e3a5f', color: selected === n.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 10, padding: '1rem', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ fontWeight: 700 }}>{n.label}</div>
              <div style={{ fontSize: '.85rem', opacity: .8, marginTop: '.25rem' }}>{n.desc}</div>
            </button>
          ))}
        </div>

        {rec && (
          <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ color: '#F5E642', margin: 0 }}>Best for this need: {rec.app}</h2>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>{rec.score}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div><div style={{ color: '#4ade80', fontWeight: 700, marginBottom: '.5rem' }}>✅ Pros</div>{rec.pros.map((p,i)=><div key={i} style={{color:'#cbd5e1',fontSize:'.9rem',marginBottom:'.25rem'}}>• {p}</div>)}</div>
              <div><div style={{ color: '#f87171', fontWeight: 700, marginBottom: '.5rem' }}>❌ Cons</div>{rec.cons.map((c,i)=><div key={i} style={{color:'#cbd5e1',fontSize:'.9rem',marginBottom:'.25rem'}}>• {c}</div>)}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', color: '#cbd5e1', fontSize: '.9rem' }}>💡 {rec.verdict}</div>
          </div>
        )}
      </div>
    </div>
  );
}
