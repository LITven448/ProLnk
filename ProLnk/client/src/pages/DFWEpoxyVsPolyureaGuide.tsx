import { useState } from 'react';

const garageUses = ['Daily Driver Storage', 'Car Enthusiast / Show Car', 'Home Gym', 'Workshop / Heavy Tools', 'Mixed Use', 'Rarely Used'];
const budgets = ['Budget ($1–$2/sq ft DIY)', 'Mid-Range ($3–$5/sq ft)', 'Premium ($5–$9/sq ft)', 'No Limit — Best Performance'];
const priorities = ['Lowest Upfront Cost', 'DFW Heat Resistance', 'UV / Color Stability', 'Fastest Cure Time', 'Longest Lifespan'];

type Result = { coating: string; cost: string; cureTime: string; lifespan: string; dfwWarning: string; verdict: string };

function getResult(use: string, budget: string, priority: string): Result | null {
  if (!use || !budget || !priority) return null;
  const isEpoxyBudget = budget.includes('Budget') || budget.includes('Mid-Range');
  const wantsUV = priority.includes('UV') || priority.includes('Color');
  const wantsHeat = priority.includes('DFW Heat');
  const wantsFast = priority.includes('Fastest');
  const wantsLife = priority.includes('Longest');
  const wantsCheap = priority.includes('Lowest');

  if (wantsCheap && isEpoxyBudget) {
    return { coating: 'DIY Epoxy Kit (Water-Based)', cost: '$1.50–$3/sq ft DIY', cureTime: '72 hours before light use, 7 days full cure', lifespan: '3–5 years in DFW (hot tire pickup is the primary failure)', dfwWarning: 'DFW summers reach 110°F+ on asphalt — hot tires peel water-based epoxy in one pull', verdict: 'Cheapest option. Accept that hot tire pickup WILL happen in DFW summers. Repaint every 3–5 years or upgrade later to polyurea' };
  }
  if (wantsHeat || wantsUV || wantsLife) {
    return { coating: 'Polyurea / Polyaspartic (Professional)', cost: '$5–$9/sq ft professionally installed', cureTime: '24 hours before light use, 48–72 hours full cure', lifespan: '10–15+ years in DFW (handles DFW UV and heat)', dfwWarning: 'UV-stable, no hot tire pickup, flexible enough for DFW clay soil micro-movements', verdict: 'Best long-term value for DFW. Handles everything DFW throws at it — UV, heat, humidity, and daily driving' };
  }
  if (wantsFast) {
    return { coating: 'Polyaspartic (Fast-Cure Polyurea)', cost: '$4–$8/sq ft professionally installed', cureTime: '4–6 hours before light use — fastest in the industry', lifespan: '10–15 years in DFW', dfwWarning: 'Polyaspartic cures too fast in DFW summer heat — must apply before 10am or after 6pm', verdict: 'Fastest cure available. Professional-only — too fast for DIY in DFW heat. UV-stable and hot-tire-resistant' };
  }
  if (use === 'Car Enthusiast / Show Car') {
    return { coating: 'Full Chip Polyurea System (Broadcast Flakes)', cost: '$6–$10/sq ft professionally installed', cureTime: '48 hours before vehicle entry', lifespan: '10–20 years with proper maintenance', dfwWarning: 'Show car garages need UV-stable topcoat — DFW sun through garage windows fades epoxy fast', verdict: 'Full broadcast chip system with UV-stable polyurea topcoat is the standard for DFW show car garages — looks great and handles tire heat' };
  }
  if (use === 'Home Gym') {
    return { coating: 'Polyurea Base + Rubber Mat Zones', cost: '$4–$7/sq ft polyurea + $1–$3/sq ft rubber mats in weight areas', cureTime: '48 hours before equipment installation', lifespan: '10–15 years coating, mats as needed', dfwWarning: 'Rubber mats on epoxy in DFW heat can trap moisture and stain — polyurea resists this better', verdict: 'Polyurea base with rubber mat overlays in weight zones is the ideal DFW home gym floor — durable, comfortable, and handles DFW climate stress' };
  }
  if (use === 'Workshop / Heavy Tools') {
    return { coating: '100% Solids Epoxy (High-Build) or Polyurea', cost: '$3–$6/sq ft installed', cureTime: '72 hours before heavy equipment rolling', lifespan: '7–12 years depending on traffic intensity', dfwWarning: 'Heavy tool impact can chip both epoxy and polyurea — polyurea is more flexible and less likely to chip', verdict: 'Workshop use means abrasion over UV exposure — 100% solids epoxy works, but polyurea\’s flexibility handles dropped tools and heavy equipment better' };
  }
  if (use === 'Rarely Used') {
    return { coating: 'DIY 100% Solids Epoxy or Water-Based Epoxy', cost: '$1–$4/sq ft DIY', cureTime: '72 hours', lifespan: '5–8 years for 100% solids, 3–5 years water-based', dfwWarning: 'Even rarely-used garages get DFW summer heat — UV yellowing still occurs with epoxy', verdict: 'Low-traffic garage can use epoxy. Hot tire pickup less likely if car rarely moves. Still avoid water-based if any chance of DFW summer parking on it' };
  }
  return { coating: 'Polyurea (Recommended for DFW)', cost: '$5–$9/sq ft professionally installed', cureTime: '24–48 hours', lifespan: '10–15 years', dfwWarning: 'Epoxy is cheaper but hot tire pickup and UV yellowing are consistent DFW failures', verdict: 'Polyurea is the DFW standard for good reason — outperforms epoxy in every condition DFW produces' };
}

export default function DFWEpoxyVsPolyureaGuide() {
  const [use, setUse] = useState('');
  const [budget, setBudget] = useState('');
  const [priority, setPriority] = useState('');
  const result = getResult(use, budget, priority);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>🏎️</div>
        <h1 style={{ color: '#F5E642', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          DFW Epoxy vs. Polyurea Guide
        </h1>
        <p style={{ color: '#aac', marginBottom: '2rem', lineHeight: 1.6 }}>
          Epoxy is cheaper. Polyurea wins in DFW. Hot tire pickup, UV yellowing, and 110°F+ garage temps are why DFW contractors default to polyurea — here's how to decide for your specific situation.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#0f1f3d', borderRadius: 10, padding: '1.25rem', border: '1px solid #334' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🧪 Epoxy</div>
            {[
              ['Cost', '$1.50–$5/sq ft'],
              ['Cure Time', '72 hrs light / 7 days full'],
              ['DFW Heat', '❌ Hot tire pickup at 130°F+'],
              ['UV Stability', '❌ Yellows in 2–3 years'],
              ['Lifespan DFW', '3–7 years'],
              ['DIY Friendly', '✅ Yes'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', borderBottom: '1px solid #1a2a4a', fontSize: '0.88rem' }}>
                <span style={{ color: '#aac' }}>{k}</span><span>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ background: '#0f1f3d', borderRadius: 10, padding: '1.25rem', border: '1px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🛡️ Polyurea</div>
            {[
              ['Cost', '$5–$9/sq ft installed'],
              ['Cure Time', '24–48 hrs (polyaspartic: 4–6 hrs)'],
              ['DFW Heat', '✅ Stable to 200°F+'],
              ['UV Stability', '✅ No yellowing'],
              ['Lifespan DFW', '10–15+ years'],
              ['DIY Friendly', '⚠️ Professional recommended'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', borderBottom: '1px solid #1a2a4a', fontSize: '0.88rem' }}>
                <span style={{ color: '#aac' }}>{k}</span><span>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1.25rem', fontSize: '1.1rem' }}>🔧 Get Your DFW Recommendation</h2>
          {[
            { label: 'Garage Use', value: use, setter: setUse, options: garageUses, placeholder: 'Select primary use...' },
            { label: 'Budget', value: budget, setter: setBudget, options: budgets, placeholder: 'Select budget...' },
            { label: 'Top Priority', value: priority, setter: setPriority, options: priorities, placeholder: 'Select top priority...' },
          ].map(({ label, value, setter, options, placeholder }) => (
            <div key={label} style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#aac', marginBottom: '0.4rem', fontSize: '0.9rem' }}>{label}</label>
              <select value={value} onChange={e => setter(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, background: '#1a2a4a', color: '#fff', border: '1px solid #334' }}>
                <option value=''>{placeholder}</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>

        {result && (
          <div style={{ background: '#122040', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>✅ DFW Coating Recommendation</h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div><span style={{ color: '#aac' }}>Recommended Coating: </span><strong>{result.coating}</strong></div>
              <div><span style={{ color: '#aac' }}>Cost Estimate: </span><strong style={{ color: '#F5E642' }}>{result.cost}</strong></div>
              <div><span style={{ color: '#aac' }}>Cure Time: </span><strong>{result.cureTime}</strong></div>
              <div><span style={{ color: '#aac' }}>DFW Lifespan: </span><strong>{result.lifespan}</strong></div>
              <div style={{ background: '#1a2a4a', borderRadius: 8, padding: '0.75rem', fontSize: '0.88rem' }}>
                <span style={{ color: '#F5E642' }}>⚠️ DFW Note: </span>{result.dfwWarning}
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', color: '#cce', fontSize: '0.9rem' }}>
                🏆 {result.verdict}
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '0.75rem', fontSize: '1.1rem' }}>📋 DFW Application Tips</h2>
          <ul style={{ color: '#ccd', lineHeight: 2.1, paddingLeft: '1.25rem', margin: 0 }}>
            <li>Apply in DFW spring or fall — summer humidity and heat extend cure times and cause bubbling</li>
            <li>Concrete must be 50–90°F during application — DFW concrete exceeds 100°F by 10am in summer</li>
            <li>Acid etch or diamond grind before any coating — DFW concrete is often sealed or contaminated</li>
            <li>Moisture test mandatory — DFW clay soil drives moisture vapor through garage slabs</li>
            <li>Broadcast flake chip system hides future DFW clay soil micro-cracks as they appear</li>
            <li>For polyaspartic in DFW summers: apply before 9am — it cures too fast in afternoon heat</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
