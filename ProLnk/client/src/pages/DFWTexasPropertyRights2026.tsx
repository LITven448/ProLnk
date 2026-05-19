import { useState } from 'react';

const issues = [
  { label: '🌳 Neighbor’s tree branch over my property', guide: 'In Texas, you have the right to trim branches that cross your property line at your own expense. You may NOT enter the neighbor’s property to do so. If the tree is dead or diseased and poses hazard, send written notice — neighbor may be liable for damages.' },
  { label: '🚧 Property line / fence dispute', guide: 'Texas follows the "Good Neighbor Fence" rule — costs are typically shared equally for boundary fences. Get a licensed surveyor to establish the line legally. Disputes go to Justice of the Peace court for amounts under $20K.' },
  { label: '🏠 Adverse possession / squatter concern', guide: 'Texas adverse possession requires open, continuous, hostile use for 10 years (25 years with color of title). Post "No Trespassing" signs and document unauthorized use immediately. Consult a property attorney if someone makes a claim.' },
  { label: '🔫 Castle Doctrine / self-defense question', guide: 'Texas Castle Doctrine (Penal Code §9.31-9.32) allows use of force to protect your home, vehicle, or workplace. No duty to retreat on your own property. Deadly force is justified against arson, burglary, robbery, or sexual assault.' },
  { label: '💧 Drainage / water runoff from neighbor', guide: 'Texas follows the "civil law rule" for surface water — upper landowners cannot increase natural flow onto lower land. Artificial drainage changes that damage neighbors are actionable. Document with photos and timestamps.' },
];

export default function DFWTexasPropertyRights2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF6', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: 2 }}>DFW Homeowner Legal Guide · 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>⚖️ Texas Property Rights for DFW Homeowners</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem' }}>Texas property law is uniquely homeowner-friendly. Know your rights before a dispute escalates — most issues can be resolved without a lawyer if you act on the right information early.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[['🔫','Castle Doctrine','Nation\’s strongest self-defense law'],['⏳','10 Years','Adverse possession timeline in TX'],['🤝','50/50','Shared fence cost default under TX law']].map(([icon,label,val]) => (
            <div key={label} style={{ background: '#111C30', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem' }}>{icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.9rem', marginTop: 4 }}>{label}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.8rem', marginTop: 4 }}>{val}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>❓ What's Your Property Issue?</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {issues.map((item, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{ background: selected === i ? '#1E3A5F' : '#111C30', border: `2px solid ${selected === i ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '0.9rem', color: '#E8EAF6', cursor: 'pointer', textAlign: 'left', fontWeight: 600 }}>{item.label}</button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: '#111C30', borderRadius: 12, padding: '1.5rem', borderLeft: '4px solid #F5E642′ }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📋 Texas Property Rights Guide</div>
            <p style={{ color: '#CBD5E1', margin: 0, lineHeight: 1.7, fontSize: '0.95rem' }}>{issues[selected].guide}</p>
            <p style={{ color: '#64748B', fontSize: '0.85rem', marginTop: 12, margin: '1rem 0 0′ }}>⚠️ This is general information, not legal advice. Consult a Texas property attorney for disputes involving significant property value.</p>
          </div>
        )}

        <div style={{ background: '#111C30', borderRadius: 12, padding: '1.25rem', marginTop: '1.5rem', borderTop: '2px solid #F5E642′ }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>🔗 ProLnk Tip</div>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', margin: 0 }}>Many property disputes involve structural work — fences, drainage, tree removal. ProLnk connects DFW homeowners with licensed contractors who can provide documentation-quality work for dispute resolution.</p>
        </div>
      </div>
    </div>
  );
}