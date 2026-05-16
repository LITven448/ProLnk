import { useState } from 'react';

export default function DFWLaundryRoomGuide2026() {
  const [setup, setSetup] = useState('garage');

  const guides: Record<string, { title: string; steps: string[]; cost: string; note: string }> = {
    garage: {
      title: 'Moving Laundry from Garage to Interior',
      steps: ['Plumbing rough-in to new location ($1,500–$3,000)', 'Electrical circuit for washer/dryer ($500–$1,200)', 'Permit required: City of Dallas/Fort Worth', 'Drywall, flooring, paint', 'Cabinet + counter + utility sink add ($1,200–$2,500)'],
      cost: '$5,000–$12,000 total',
      note: 'DFW garages can reach 130°F in summer — interior laundry adds comfort and home value.',
    },
    none: {
      title: 'Adding a Laundry Room to a Home Without One',
      steps: ['Select location (near plumbing stack preferred)', 'Plumbing rough-in + drain ($2,000–$4,000)', 'Dedicated 240V circuit for electric dryer', 'Gas line if gas dryer preferred ($400–$900)', 'Cabinet + shelving + countertop'],
      cost: '$7,000–$18,000 total',
      note: 'Homes without laundry rooms see 5–8% lower resale values in DFW market.',
    },
    upgrade: {
      title: 'Upgrading Existing Laundry Room',
      steps: ['Cabinet addition for storage', 'Countertop above W/D for folding', 'Utility sink installation ($400–$800)', 'Stackable vs side-by-side decision', 'Gas vs electric dryer conversion'],
      cost: '$1,500–$5,000 total',
      note: 'Stackable saves space; side-by-side allows countertop use. Gas dryers cost less to operate in Texas.',
    },
  };

  const guide = guides[setup];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600 }}>🏠 PROLNK DFW GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Laundry Room Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Laundry room upgrades, additions, and relocations in the DFW market.</p>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📍 What's Your Current Setup?</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[{ id: 'garage', label: '🚗 Laundry in Garage' }, { id: 'none', label: '❌ No Laundry Room' }, { id: 'upgrade', label: '🔧 Upgrade Existing' }].map((opt) => (
              <button key={opt.id} onClick={() => setSetup(opt.id)}
                style={{ padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                  background: setup === opt.id ? '#F5E642' : '#0f172a', color: setup === opt.id ? '#0A1628' : '#fff' }}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 4 }}>{guide.title}</h2>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>{guide.cost}</div>
          {guide.steps.map((step) => (
            <div key={step} style={{ fontSize: 13, marginBottom: 8, paddingLeft: 12, borderLeft: '2px solid #F5E642', color: '#cbd5e1' }}>✅ {step}</div>
          ))}
          <div style={{ marginTop: 16, background: '#0f172a', borderRadius: 8, padding: 12, fontSize: 13, color: '#94a3b8' }}>💡 {guide.note}</div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⚡ Gas vs Electric Dryer — DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[{ label: 'Gas Dryer', icon: '🔥', pros: 'Lower operating cost, faster drying', cons: 'Gas line needed ($400–$900 to add)' },
              { label: 'Electric Dryer', icon: '⚡', pros: 'No gas line required, simpler install', cons: 'Higher monthly utility cost in TX' }].map((d) => (
              <div key={d.label} style={{ background: '#0f172a', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 20 }}>{d.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{d.label}</div>
                <div style={{ fontSize: 12, color: '#4ade80', marginBottom: 4 }}>✅ {d.pros}</div>
                <div style={{ fontSize: 12, color: '#f87171' }}>⚠️ {d.cons}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
