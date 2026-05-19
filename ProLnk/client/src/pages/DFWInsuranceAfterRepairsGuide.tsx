import { useState } from 'react';

const repairTypes = [
  {
    id: 'pool',
    label: 'Added a Pool or Hot Tub',
    icon: '🏊',
    notify: true,
    urgency: 'Immediately',
    premiumImpact: '+$50–200/year',
    notes: 'Pools are a major liability addition. Not disclosing can void your liability coverage. Also consider umbrella insurance.',
  },
  {
    id: 'attic',
    label: 'Finished Attic or Added Living Space',
    icon: '🏠',
    notify: true,
    urgency: 'Within 30 days',
    premiumImpact: '+$100–300/year',
    notes: 'Added square footage increases your dwelling replacement cost. Update your coverage limit to match.',
  },
  {
    id: 'hvac',
    label: 'New HVAC System',
    icon: '❄️',
    notify: false,
    urgency: 'Not required, but beneficial',
    premiumImpact: 'Discount possible',
    notes: 'New systems can earn discounts with some carriers. Ask your agent — it’s not required to report but may save money.',
  },
  {
    id: 'roof',
    label: 'New Roof',
    icon: '🏗️',
    notify: true,
    urgency: 'Within 30 days',
    premiumImpact: 'Significant discount',
    notes: 'A new roof is one of the biggest premium factors in DFW. Report immediately to get your discount — it can be $300–600/year.',
  },
  {
    id: 'electrical',
    label: 'Electrical Panel Upgrade',
    icon: '⚡',
    notify: true,
    urgency: 'Within 30 days',
    premiumImpact: 'Possible discount',
    notes: 'Upgraded panels reduce fire risk. Some carriers offer discounts or will now insure homes they previously declined.',
  },
  {
    id: 'addition',
    label: 'Room Addition or Major Renovation',
    icon: '🔨',
    notify: true,
    urgency: 'Before work starts',
    premiumImpact: '+$150–400/year',
    notes: 'During construction, standard policies may not cover materials or the addition. Ask about a builder\’s risk endorsement.',
  },
  {
    id: 'solar',
    label: 'Solar Panels Installed',
    icon: '☀️',
    notify: true,
    urgency: 'Before installation',
    premiumImpact: '+$20–80/year',
    notes: 'Solar adds to your dwelling value. Confirm your policy covers panels — not all standard policies do automatically.',
  },
  {
    id: 'fence',
    label: 'New Fence or Outbuilding',
    icon: '🌳',
    notify: false,
    urgency: 'Only if value is significant',
    premiumImpact: 'Minor',
    notes: 'Usually covered under "other structures" at 10% of dwelling. Only update if the structure exceeds that limit.',
  },
];

export default function DFWInsuranceAfterRepairsGuide() {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [showChecklist, setShowChecklist] = useState(false);

  const toggle = (id: string) => setSelected(prev => ({ ...prev, [id]: !prev[id] }));

  const relevant = repairTypes.filter(r => selected[r.id]);
  const mustNotify = relevant.filter(r => r.notify);
  const optional = relevant.filter(r => !r.notify);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', color: '#1a1a2e', fontFamily: 'system-ui, sans-serif', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 740, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#666′ }}>ProLnk Guide · DFW Homeowners</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#0A1628′ }}>
          🔧 Insurance Updates After DFW Home Repairs
        </h1>
        <p style={{ color: '#555', marginBottom: '2rem', lineHeight: 1.6 }}>
          Major home improvements can affect your coverage, your premium, and in some cases your ability to file a future claim. Know when to call your insurer — and what to expect.
        </p>

        <div style={{ background: '#fff3cd', border: '1px solid #ffc107', borderRadius: 8, padding: '1rem 1.25rem', marginBottom: '2rem' }}>
          <strong>⚠️ What Happens If You Don't Disclose:</strong> Failing to update your policy after a major addition can result in claims being denied or coverage being voided. Insurers can argue the risk changed materially and they were never notified. This is most common with pools, additions, and structural changes.
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem', color: '#0A1628′ }}>📋 What Did You Complete?</h2>
          <p style={{ color: '#666', fontSize: '0.875rem', marginBottom: '1rem' }}>Select all repairs or renovations completed in the last 12 months:</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
            {repairTypes.map(r => (
              <button key={r.id} onClick={() => toggle(r.id)} style={{ background: selected[r.id] ? '#0A1628′ : '#f5f5f5', color: selected[r.id] ? '#F5E642' : '#333', border: '1px solid ' + (selected[r.id] ? '#0A1628' : '#ddd'), borderRadius: 8, padding: '0.5rem 0.75rem', cursor: ’pointer', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600 }}>
                {r.icon} {r.label}
              </button>
            ))}
          </div>
          <button onClick={() => setShowChecklist(true)} style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '0.6rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>Generate My Notification Checklist</button>

          {showChecklist && relevant.length > 0 && (
            <div style={{ marginTop: '1.25rem' }}>
              {mustNotify.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontWeight: 700, color: '#dc3545', marginBottom: '0.5rem', fontSize: '1rem' }}>🚨 Notify Your Insurer — Action Required:</div>
                  {mustNotify.map(r => (
                    <div key={r.id} style={{ background: '#fff5f5', border: '1px solid #f5c6cb', borderRadius: 8, padding: '0.875rem', marginBottom: '0.6rem' }}>
                      <div style={{ fontWeight: 700 }}>{r.icon} {r.label}</div>
                      <div style={{ fontSize: '0.85rem', color: '#666', margin: '0.25rem 0′ }}>Notify: <strong>{r.urgency}</strong> · Premium impact: <strong>{r.premiumImpact}</strong></div>
                      <div style={{ fontSize: '0.85rem', color: '#444′ }}>{r.notes}</div>
                    </div>
                  ))}
                </div>
              )}
              {optional.length > 0 && (
                <div>
                  <div style={{ fontWeight: 700, color: '#28a745', marginBottom: '0.5rem', fontSize: '1rem' }}>✅ Optional But Beneficial:</div>
                  {optional.map(r => (
                    <div key={r.id} style={{ background: '#f0fff4', border: '1px solid #c3e6cb', borderRadius: 8, padding: '0.875rem', marginBottom: '0.6rem' }}>
                      <div style={{ fontWeight: 700 }}>{r.icon} {r.label}</div>
                      <div style={{ fontSize: '0.85rem', color: '#666', margin: '0.25rem 0′ }}>Timing: <strong>{r.urgency}</strong> · Impact: <strong>{r.premiumImpact}</strong></div>
                      <div style={{ fontSize: '0.85rem', color: '#444′ }}>{r.notes}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {showChecklist && relevant.length === 0 && (
            <div style={{ marginTop: '1rem', color: '#666', fontSize: '0.9rem' }}>Select at least one completed repair above to generate your checklist.</div>
          )}
        </div>

        <div style={{ background: '#0A1628', color: '#fff', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.9rem', marginBottom: '0.25rem', opacity: 0.8 }}>Planning your next DFW home project?</div>
          <strong style={{ color: '#F5E642′ }}>ProLnk connects you with vetted contractors for every trade — from roofing to electrical to pools.</strong>
        </div>
      </div>
    </div>
  );
}
