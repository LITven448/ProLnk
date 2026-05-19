import { useState } from 'react';

export default function DFWFoundationMistake2026() {
  const [mistake, setMistake] = useState('');
  const [result, setResult] = useState('');

  const mistakes = [
    { id: 'waiting-too-long', label: '⏰ Waiting too long to address foundation issues' },
    { id: 'unlicensed', label: '🚫 Hiring an unlicensed foundation company' },
    { id: 'too-few-piers', label: '📍 Installing too few piers (under-repairing)' },
    { id: 'ignoring-drainage', label: '💧 Ignoring drainage after repair' },
    { id: 'no-documentation', label: '📋 Not documenting foundation condition' },
  ];

  const guide: Record<string, string> = {
    'waiting-too-long': 'DFW foundation issues compound exponentially. A $8,000 repair today becomes $25,000 in 18 months as movement cascades to doors, windows, pipes, and interior walls. First warning signs: doors sticking, cracks above windows, gaps at floor/wall junction. Act within 90 days of noticing symptoms.',
    'unlicensed': 'Texas requires foundation contractors to hold an engineering license or work under a licensed engineer. Always ask for their TBPE (Texas Board of Professional Engineers) engineer license number. Unlicensed work cannot be disclosed to home buyers and creates significant liability. Verify at license.tbpe.texas.gov before signing anything.',
    'too-few-piers': 'The most common DFW foundation failure after repair. Companies lowball pier count to win bids, then the unsupported sections continue to move. Get 2-3 bids and compare pier count, not just price. A proper DFW repair for a 2,000 sq ft home typically requires 15-25 piers depending on soil and severity. If bids vary by more than 5 piers, ask why.',
    'ignoring-drainage': 'Foundation repair without drainage correction is guaranteed repeat business for the contractor. DFW clay expands and contracts based on moisture. If drainage routes water toward the foundation, soil moisture swings will continue and piers will lose effectiveness within 3-5 years. Add French drains or regrade before or concurrent with pier installation.',
    'no-documentation': 'Document before repair: photograph all cracks with date stamps, measure crack widths, get elevation readings from contractor. Document after repair: same measurements. Monitor quarterly with a $20 floor level app. Documentation protects you if repair fails (warranty claim) and protects buyers (disclosure). Undocumented repairs are red flags in home sales.',
  };

  function handleSelect(id: string) {
    setMistake(id);
    setResult(guide[id]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 FOUNDATION GUIDE · DFW · 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Foundation Repair: Biggest Mistakes Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>
          DFW has more foundation repair companies per capita than almost anywhere in the US. Quality varies dramatically. Avoid these five mistakes that cost DFW homeowners tens of thousands of dollars every year.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 24 }}>
          {[
            { icon: '⏰', label: 'Delaying' },
            { icon: '🚫', label: 'Unlicensed' },
            { icon: '📍', label: 'Under-Piering' },
            { icon: '💧', label: 'No Drainage' },
            { icon: '📋', label: 'No Docs' },
            { icon: '✅', label: 'Avoid All 5′ },
          ].map(m => (
            <div key={m.label} style={{ background: '#1e2d45', borderRadius: 8, padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: 20 }}>{m.icon}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{m.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: '#F5E642′ }}>🔍 Mistake Type → How to Avoid It</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
          {mistakes.map(m => (
            <button key={m.id} onClick={() => handleSelect(m.id)}
              style={{ background: mistake === m.id ? '#F5E642′ : '#1e2d45', color: mistake === m.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
              {m.label}
            </button>
          ))}
        </div>
        {result && (
          <div style={{ background: '#1e2d45', borderLeft: '4px solid #F5E642', borderRadius: 8, padding: 18, color: '#e2e8f0', lineHeight: 1.6 }}>
            {result}
          </div>
        )}
        <div style={{ marginTop: 32, padding: 16, background: '#1e2d45', borderRadius: 10, fontSize: 13, color: '#94a3b8′ }}>
          💡 ProLnk connects DFW homeowners with licensed, verified foundation repair companies with documented track records.
        </div>
      </div>
    </div>
  );
}
