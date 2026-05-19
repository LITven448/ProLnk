import { useState } from 'react';

const compData = [
  { platform: 'Angi', model: 'Per-lead fee', costPerLead: 35, leadsPerMonth: null, note: '$15–$75 per lead sent to you' },
  { platform: 'HomeAdvisor', model: 'Per-lead fee', costPerLead: 50, leadsPerMonth: null, note: 'Avg $40–$60/lead, unvetted' },
  { platform: 'Thumbtack', model: 'Pay-to-quote', costPerLead: 25, leadsPerMonth: null, note: 'You pay just to send a quote' },
  { platform: 'ProLnk', model: 'Flat subscription', costPerLead: 0, leadsPerMonth: null, note: '$149/mo total — unlimited matches' },
];

export default function ProLnkNoCommissionModel() {
  const [monthlyJobs, setMonthlyJobs] = useState(8);
  const [leadsPerJob, setLeadsPerJob] = useState(3);

  const totalLeads = monthlyJobs * leadsPerJob;
  const angiCost = totalLeads * 35;
  const haCost = totalLeads * 50;
  const thumbtackCost = totalLeads * 25;
  const prolnkCost = 149;

  const savings = [
    { label: 'vs Angi', amount: angiCost - prolnkCost, color: '#22c55e' },
    { label: 'vs HomeAdvisor', amount: haCost - prolnkCost, color: '#22c55e' },
    { label: 'vs Thumbtack', amount: thumbtackCost - prolnkCost, color: '#22c55e' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#F5E642', letterSpacing: 3, marginBottom: 8 }}>NO PER-LEAD FEES. EVER.</div>
          <h1 style={{ fontSize: 34, fontWeight: 800, margin: 0 }}>Why ProLnk Uses a Flat Subscription</h1>
          <p style={{ color: '#8899aa', marginTop: 8 }}>Other platforms charge per lead. ProLnk charges one flat fee — no matter how many jobs you get.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '😤', title: 'Angi / HomeAdvisor model', desc: 'Pay $15–75 for each lead — even if they ghost you, already hired someone, or are just browsing.', bad: true },
            { icon: '✅', title: 'ProLnk model', desc: 'Pay $149/mo flat. Get matched with unlimited homeowners. No surprise charges. No lead fees.', bad: false },
          ].map((item, i) => (
            <div key={i} style={{ background: item.bad ? '#2d0f0f' : '#0f2d0f', border: `1px solid ${item.bad ? '#f44336' : '#22c55e'}`, borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>{item.title}</div>
              <div style={{ fontSize: 14, color: '#aaa', lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>💡 Run Your Own Numbers</h3>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: '#aaa' }}>Jobs you want per month: <strong style={{ color: '#fff' }}>{monthlyJobs}</strong></label>
            <input type='range' min={1} max={30} value={monthlyJobs} onChange={e => setMonthlyJobs(Number(e.target.value))}
              style={{ width: '100%', marginTop: 8, accentColor: '#F5E642′ }} />
          </div>
          <div>
            <label style={{ fontSize: 13, color: '#aaa' }}>Leads needed per job won: <strong style={{ color: '#fff' }}>{leadsPerJob}</strong></label>
            <input type='range' min={1} max={10} value={leadsPerJob} onChange={e => setLeadsPerJob(Number(e.target.value))}
              style={{ width: '100%', marginTop: 8, accentColor: '#F5E642′ }} />
          </div>
          <div style={{ marginTop: 16, padding: 16, background: '#0A1628', borderRadius: 8 }}>
            <div style={{ fontSize: 13, color: '#aaa' }}>Total leads needed: <strong style={{ color: '#fff' }}>{totalLeads}/mo</strong></div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'Angi cost', amount: angiCost, sub:  },
            { label: 'HomeAdvisor cost', amount: haCost, sub:  },
            { label: 'Thumbtack cost', amount: thumbtackCost, sub:  },
            { label: 'ProLnk cost', amount: prolnkCost, sub: 'Flat. All leads included.', highlight: true },
          ].map((item, i) => (
            <div key={i} style={{ background: item.highlight ? '#0f2d0f' : '#0d1f3c', border: `1px solid ${item.highlight ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: '#aaa', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: item.highlight ? '#F5E642′ : '#f44336' }}>${item.amount.toLocaleString()}</div>
              <div style={{ fontSize: 11, color: '#666', marginTop: 4 }}>{item.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>💰 Your Monthly Savings</h3>
          {savings.map((s, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1e3a5f' }}>
              <span style={{ color: '#aaa' }}>{s.label}</span>
              <strong style={{ color: s.color }}>Save ${s.amount.toLocaleString()}/mo</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
