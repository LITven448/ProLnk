import { useState } from 'react';

const jobs = ['Plumbing', 'Electrical', 'HVAC', 'Roofing', 'Foundation', 'Remodel'];
const risks = ['Low Risk ($500)', 'Medium Risk ($2,500)', 'High Risk ($10,000+)'];

const recommendations: Record<string, Record<string, string>> = {
  'Plumbing': { 'Low Risk ($500)': 'Craigslist might be okay for a drain cleaning, but verify any license. ProLnk preferred.', 'Medium Risk ($2,500)': 'Water heater? Use ProLnk — license and insurance required.', 'High Risk ($10,000+)': 'Whole-house repipe. ProLnk only. No exceptions.' },
  'Electrical': { 'Low Risk ($500)': 'Even basic electrical needs a licensed pro. Use ProLnk.', 'Medium Risk ($2,500)': 'Panel upgrade — must be permitted. ProLnk verified pros handle this.', 'High Risk ($10,000+)': 'Full rewire or service upgrade. Craigslist = fire hazard. ProLnk only.' },
  'HVAC': { 'Low Risk ($500)': 'Tune-up or filter change. ProLnk recommended; skip Craigslist.', 'Medium Risk ($2,500)': 'New unit installation. Requires EPA cert. ProLnk only.', 'High Risk ($10,000+)': 'Full system replacement. Thousands at stake. ProLnk with guarantee.' },
  'Roofing': { 'Low Risk ($500)': 'Small patch. ProLnk preferred — warranty matters.', 'Medium Risk ($2,500)': 'Section repair. Craigslist roofers are top scam in DFW.', 'High Risk ($10,000+)': 'Full roof replacement. Never use Craigslist. ProLnk only.' },
  'Foundation': { 'Low Risk ($500)': 'Crack seal. Need licensed structural engineer. ProLnk only.', 'Medium Risk ($2,500)': 'Pier installation. Licensed only. ProLnk verified.', 'High Risk ($10,000+)': 'Full foundation lift. One of highest-scam categories in Texas. ProLnk only.' },
  'Remodel': { 'Low Risk ($500)': 'Minor work. ProLnk pros available for small jobs.', 'Medium Risk ($2,500)': 'Bathroom or kitchen work. Permits likely needed. Use ProLnk.', 'High Risk ($10,000+)': 'Major renovation. Contractor bond required. ProLnk only.' },
};

export default function DFWCraigslistVsProLnkGuide2026() {
  const [job, setJob] = useState('Plumbing');
  const [risk, setRisk] = useState('Low Risk ($500)');
  const rec = recommendations[job]?.[risk] ?? '';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '2.5rem' }}>⚠️</span>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0′ }}>ProLnk vs Craigslist — DFW Contractor Safety 2026</h1>
          <p style={{ color: '#94a3b8', maxWidth: 580, margin: '0 auto' }}>
            Craigslist contractors: no verification, no recourse, high scam rate. See the risk for your job.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          {[['🚨 Craigslist Reality', '#ef4444', ['No license verification', 'No insurance check', 'No background screen', 'Deposit scams common in DFW', 'No rating system or accountability', 'BBB complaints unresolvable']], ['✅ ProLnk Standard', '#4ade80', ['State license verified', 'Insurance certificate on file', 'Criminal background check', 'Deposit terms regulated', 'Performance scoring active', 'ProLnk guarantee on matches']]].map(([title, color, items]) => (
            <div key={String(title)} style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem', border: `1px solid ${color}` }}>
              <h3 style={{ color: String(color), marginTop: 0 }}>{String(title)}</h3>
              {(items as string[]).map((item) => (
                <div key={item} style={{ padding: '0.4rem 0', borderBottom: '1px solid #1e293b', color: '#f1f5f9', fontSize: '0.9rem' }}>• {item}</div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem', border: '2px solid #F5E642′ }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>🎯 Job-Specific Risk Assessment</h3>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 0.5rem' }}>Job Type:</p>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {jobs.map((j) => (
                <button key={j} onClick={() => setJob(j)}
                  style={{ background: job === j ? '#F5E642′ : '#0f172a', color: job === j ? '#0A1628' : '#f1f5f9', border: '1px solid #334155', borderRadius: 8, padding: '0.4rem 0.8rem', cursor: ’pointer', fontWeight: 600, fontSize: '0.85rem' }}>{j}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 0.5rem' }}>Risk Level:</p>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {risks.map((r) => (
                <button key={r} onClick={() => setRisk(r)}
                  style={{ background: risk === r ? '#F5E642′ : '#0f172a', color: risk === r ? '#0A1628' : '#f1f5f9', border: '1px solid #334155', borderRadius: 8, padding: '0.4rem 0.8rem', cursor: ’pointer', fontWeight: 600, fontSize: '0.85rem' }}>{r}</button>
              ))}
            </div>
          </div>
          {rec && (
            <div style={{ background: '#0f172a', borderRadius: 8, padding: '1rem', color: '#4ade80', lineHeight: 1.7, fontSize: '0.95rem' }}>
              🔎 <strong>{job} @ {risk}:</strong> {rec}
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', color: '#F5E642', marginTop: '2rem', fontSize: '0.9rem' }}>
          🛡️ Don&apos;t risk it — verified DFW pros at prolnk.io
        </p>
      </div>
    </div>
  );
}