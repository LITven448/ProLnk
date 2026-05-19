import { useState } from 'react';

const riskFactors = [
  { id: 'pool', label: 'Swimming Pool or Hot Tub', weight: 3, icon: '🏊' },
  { id: 'rental', label: 'Rental Property Owner', weight: 3, icon: '🏘️' },
  { id: 'teen', label: 'Teen Driver in Household', weight: 3, icon: '🚗' },
  { id: 'highnet', label: 'Net Worth Over $500K', weight: 3, icon: '💼' },
  { id: 'dog', label: 'Dog (especially large breed)', weight: 2, icon: '🐕' },
  { id: 'longdrive', label: 'Long Driveway or Private Road', weight: 1, icon: '🛣️' },
  { id: 'gatherings', label: 'Frequent Large Gatherings', weight: 2, icon: '🎉' },
  { id: 'trampoline', label: 'Trampoline', weight: 2, icon: '🤸' },
  { id: 'airbnb', label: 'Short-Term Rental (Airbnb)', weight: 3, icon: '🏠' },
  { id: 'boat', label: 'Boat or Watercraft', weight: 2, icon: '⛵' },
];

export default function DFWUmbrellaInsuranceGuide() {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [showResult, setShowResult] = useState(false);

  const toggle = (id: string) => setSelected(prev => ({ ...prev, [id]: !prev[id] }));

  const totalWeight = riskFactors.reduce((sum, f) => sum + (selected[f.id] ? f.weight : 0), 0);

  const getRecommendation = () => {
    if (totalWeight === 0) return null;
    if (totalWeight <= 2) return { level: 'Low', coverage: '$1M', cost: '$200–250/year', urgency: 'Consider', color: '#28a745', note: 'Even low-risk homeowners benefit from umbrella coverage for its low cost.' };
    if (totalWeight <= 5) return { level: 'Moderate', coverage: '$1–2M', cost: '$250–350/year', urgency: 'Recommended', color: '#ffc107', note: 'Your risk profile warrants umbrella coverage. The annual cost is minimal relative to the protection.' };
    return { level: 'High', coverage: '$2–3M', cost: '$350–500/year', urgency: 'Strongly Recommended', color: '#dc3545', note: 'Multiple significant liability exposures. Umbrella coverage is essential — do not delay.' };
  };

  const rec = getRecommendation();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', color: '#1a1a2e', fontFamily: 'system-ui, sans-serif', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 740, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#666′ }}>ProLnk Guide · DFW Homeowners</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#0A1628′ }}>
          ☂️ DFW Umbrella Insurance Guide
        </h1>
        <p style={{ color: '#555', marginBottom: '2rem', lineHeight: 1.6 }}>
          A $1M umbrella policy costs $200–400/year. It covers liability judgments that exceed your homeowners or auto policy limits — protecting your savings, investments, and future income from lawsuits.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: '#fff', borderRadius: 10, padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
            <h3 style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#0A1628′ }}>✅ What Umbrella Covers</h3>
            <ul style={{ paddingLeft: '1.2rem', fontSize: '0.875rem', color: '#444′ }}>
              <li style={{ marginBottom: '0.4rem' }}>Bodily injury above your homeowners limit</li>
              <li style={{ marginBottom: '0.4rem' }}>Property damage you cause to others</li>
              <li style={{ marginBottom: '0.4rem' }}>Legal defense costs</li>
              <li style={{ marginBottom: '0.4rem' }}>Dog bite liability</li>
              <li style={{ marginBottom: '0.4rem' }}>Pool or trampoline accidents</li>
              <li style={{ marginBottom: 0 }}>Incidents on your rental property</li>
            </ul>
          </div>
          <div style={{ background: '#fff', borderRadius: 10, padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
            <h3 style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#0A1628′ }}>❌ What It Doesn’t Cover</h3>
            <ul style={{ paddingLeft: '1.2rem', fontSize: '0.875rem', color: '#444′ }}>
              <li style={{ marginBottom: '0.4rem' }}>Your own injuries or property damage</li>
              <li style={{ marginBottom: '0.4rem' }}>Business-related liability (need commercial policy)</li>
              <li style={{ marginBottom: '0.4rem' }}>Intentional acts</li>
              <li style={{ marginBottom: '0.4rem' }}>Workers' comp for household employees</li>
              <li style={{ marginBottom: '0.4rem' }}>Airbnb/short-term rental (usually excluded)</li>
              <li style={{ marginBottom: 0 }}>Professional liability (E&O)</li>
            </ul>
          </div>
        </div>

        <div style={{ background: '#fff3cd', border: '1px solid #ffc107', borderRadius: 8, padding: '1rem 1.25rem', marginBottom: '2rem' }}>
          <strong>🏡 DFW-Specific Liability Risks:</strong>
          <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', fontSize: '0.875rem' }}>
            <li>Pools are extremely common in DFW — "attractive nuisance" liability is significant</li>
            <li>Long private driveways and shared access roads create slip-and-fall exposure</li>
            <li>Texas is a high-litigation state — jury awards can exceed homeowners policy limits</li>
            <li>Large social gatherings (cookouts, parties) at homes with pools are a top claim scenario</li>
          </ul>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#0A1628′ }}>🎯 Do I Need Umbrella Coverage?</h2>
          <p style={{ color: '#666', fontSize: '0.875rem', marginBottom: '1rem' }}>Select all that apply to your household:</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
            {riskFactors.map(f => (
              <button key={f.id} onClick={() => toggle(f.id)} style={{ background: selected[f.id] ? '#0A1628′ : '#f5f5f5', color: selected[f.id] ? '#F5E642' : '#333', border: '1px solid ' + (selected[f.id] ? '#0A1628' : '#ddd'), borderRadius: 8, padding: '0.5rem 0.75rem', cursor: ’pointer', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600 }}>
                {f.icon} {f.label}
              </button>
            ))}
          </div>
          <button onClick={() => setShowResult(true)} style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '0.6rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>Get My Recommendation</button>

          {showResult && rec && (
            <div style={{ marginTop: '1.25rem', background: rec.color + '15', border: `1px solid ${rec.color}`, borderRadius: 10, padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#666', fontWeight: 600 }}>RISK LEVEL</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: rec.color }}>{rec.level}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#666', fontWeight: 600 }}>RECOMMENDATION</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0A1628′ }}>{rec.urgency}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#666', fontWeight: 600 }}>COVERAGE AMOUNT</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0A1628′ }}>{rec.coverage}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#666', fontWeight: 600 }}>EST. ANNUAL COST</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0A1628′ }}>{rec.cost}</div>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#444', margin: 0 }}>{rec.note}</p>
            </div>
          )}
          {showResult && !rec && (
            <div style={{ marginTop: '1rem', color: '#666', fontSize: '0.9rem' }}>Select at least one risk factor above for your personalized recommendation.</div>
          )}
        </div>

        <div style={{ background: '#0A1628', color: '#fff', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.9rem', marginBottom: '0.25rem', opacity: 0.8 }}>Pool, fence, or driveway work needed?</div>
          <strong style={{ color: '#F5E642′ }}>ProLnk connects you with vetted DFW contractors to reduce liability before it becomes a claim.</strong>
        </div>
      </div>
    </div>
  );
}
