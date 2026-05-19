import { useState } from 'react';

const MOUNT_TYPES = [
  { name: 'Floor-Mounted', icon: '🏗️', pros: ['Sturdy for heavy countertops', 'Hides plumbing easily', 'Better for families with kids'], cons: ['Less modern look', 'Harder to clean floor underneath'], costMod: 0, dfwNote: 'Most practical for DFW families — withstands humidity shifts better than floating' },
  { name: 'Floating', icon: '✨', pros: ['Modern aesthetic', 'Easy floor cleaning', 'Visual spaciousness'], cons: ['Wall must be reinforced', 'Weight limits apply', 'MDF risks in DFW humidity'], costMod: 400, dfwNote: 'Popular in DFW remodels but requires solid wood or plywood — avoid MDF in DFW bathrooms due to humidity' },
];

const SINK_CONFIGS = [
  { name: 'Single Sink', icon: '1️⃣', minWidth: 24, recommended: '24-36 inches', costMin: 800, costMax: 2500 },
  { name: 'Double Sink', icon: '2️⃣', minWidth: 48, recommended: '48-72 inches', costMin: 1400, costMax: 4500 },
];

const BATHROOM_SIZES = [
  { label: 'Powder Room (under 20 sq ft)', sqft: 16, maxVanity: '18-24 inch single', sinkConfig: 'Single Sink' },
  { label: 'Small Bath (20-35 sq ft)', sqft: 28, maxVanity: '24-36 inch single', sinkConfig: 'Single Sink' },
  { label: 'Medium Bath (35-60 sq ft)', sqft: 48, maxVanity: '36-48 inch single or double', sinkConfig: 'Single or Double' },
  { label: 'Master Bath (60+ sq ft)', sqft: 80, maxVanity: '60-72 inch double', sinkConfig: 'Double Sink' },
];

const MATERIALS = [
  { name: 'Solid Wood', humidity: 'High Risk', dfwNote: 'Seal regularly — DFW shower steam and humidity can cause warping over 3-5 years', cost: 'High' },
  { name: 'Plywood Core', humidity: 'Medium Risk', dfwNote: 'Better than particleboard for DFW humidity — standard in quality vanities', cost: 'Medium' },
  { name: 'MDF', humidity: 'High Risk', dfwNote: 'Avoid in DFW bathrooms — absorbs moisture, swells at edges, fails within 5-7 years', cost: 'Low' },
  { name: 'PVC/Thermofoil', humidity: 'Low Risk', dfwNote: 'Excellent for DFW humidity — waterproof, easy clean, modern look', cost: 'Medium' },
];

const STYLES = ['Modern/Floating', 'Traditional/Shaker', 'Transitional', 'Farmhouse'];

export default function DFWBathroomVanityGuide() {
  const [selectedSize, setSelectedSize] = useState(BATHROOM_SIZES[3]);
  const [selectedMount, setSelectedMount] = useState(MOUNT_TYPES[0]);
  const [selectedSinks, setSelectedSinks] = useState(SINK_CONFIGS[1]);
  const [selectedStyle, setSelectedStyle] = useState(STYLES[0]);

  const baseCost = selectedSinks.costMin + selectedMount.costMod;
  const maxCost = selectedSinks.costMax + selectedMount.costMod;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🚿</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>
            DFW Bathroom Vanity Guide
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 600, margin: '0 auto' }}>
            Choose the right vanity for DFW homes — humidity, family use, and resale value all factor in.
          </p>
        </div>

        <div style={{ background: '#0F1F35', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 20 }}>Vanity Sizing Tool</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#94A3B8', marginBottom: 10, fontSize: 14 }}>Bathroom Size</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {BATHROOM_SIZES.map((s) => (
                <button
                  key={s.label}
                  onClick={() => setSelectedSize(s)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 10,
                    border: `2px solid ${selectedSize.label === s.label ? '#F5E642' : '#1E3A5F'}`,
                    background: selectedSize.label === s.label ? '#1A2E4A' : '#0D1A2E',
                    color: selectedSize.label === s.label ? '#F5E642' : '#94A3B8',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#94A3B8', marginBottom: 10, fontSize: 14 }}>Sink Configuration</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {SINK_CONFIGS.map((sc) => (
                <button
                  key={sc.name}
                  onClick={() => setSelectedSinks(sc)}
                  style={{
                    padding: 16,
                    borderRadius: 12,
                    border: `2px solid ${selectedSinks.name === sc.name ? '#F5E642' : '#1E3A5F'}`,
                    background: selectedSinks.name === sc.name ? '#1A2E4A' : '#0D1A2E',
                    color: '#E8EDF5',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{sc.icon}</div>
                  <div style={{ fontWeight: 700, color: selectedSinks.name === sc.name ? '#F5E642' : '#E8EDF5' }}>{sc.name}</div>
                  <div style={{ fontSize: 12, color: '#94A3B8' }}>Min width: {sc.minWidth}"</div>
                </button>
              ))}
            </div>
          </div>
          <div style={{ padding: 20, background: '#0A1628', borderRadius: 12, border: '1px solid #F5E642' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>Recommended Vanity Size</div>
                <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{selectedSize.maxVanity}</div>
                <div style={{ color: '#64748B', fontSize: 12 }}>Based on {selectedSize.sqft} sq ft bathroom</div>
              </div>
              <div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>Estimated Cost Range</div>
                <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>${baseCost.toLocaleString()} - ${maxCost.toLocaleString()}</div>
                <div style={{ color: '#64748B', fontSize: 12 }}>Vanity + sink + installation</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: '#0F1F35', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 20 }}>Mount Style</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {MOUNT_TYPES.map((m) => (
              <button
                key={m.name}
                onClick={() => setSelectedMount(m)}
                style={{
                  padding: 20,
                  borderRadius: 14,
                  border: `2px solid ${selectedMount.name === m.name ? '#F5E642' : '#1E3A5F'}`,
                  background: selectedMount.name === m.name ? '#1A2E4A' : '#0D1A2E',
                  color: '#E8EDF5',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 10 }}>{m.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: selectedMount.name === m.name ? '#F5E642' : '#E8EDF5', marginBottom: 8 }}>{m.name}</div>
                <div style={{ marginBottom: 8 }}>
                  {m.pros.map((p) => <div key={p} style={{ fontSize: 12, color: '#22C55E', marginBottom: 2 }}>+ {p}</div>)}
                  {m.cons.map((c) => <div key={c} style={{ fontSize: 12, color: '#EF4444', marginBottom: 2 }}>- {c}</div>)}
                </div>
                <div style={{ fontSize: 12, color: '#94A3B8', padding: '8px 10px', background: '#0A1628', borderRadius: 8 }}>
                  DFW: {m.dfwNote}
                </div>
                {m.costMod > 0 && <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginTop: 8 }}>+${m.costMod} for wall reinforcement</div>}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F1F35', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 16 }}>DFW Humidity & Material Warning</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MATERIALS.map((mat) => (
              <div key={mat.name} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 14, background: '#0A1628', borderRadius: 10, border: '1px solid #1E3A5F' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: mat.humidity === 'Low Risk' ? '#22C55E' : mat.humidity === 'Medium Risk' ? '#EAB308' : '#EF4444', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: '#E8EDF5', fontSize: 15 }}>{mat.name}</div>
                  <div style={{ color: '#94A3B8', fontSize: 13 }}>{mat.dfwNote}</div>
                </div>
                <div style={{ color: '#64748B', fontSize: 12, fontWeight: 600 }}>{mat.cost}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F1F35', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 16 }}>Features Worth Paying For in DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '🔇', title: 'Soft-Close Hinges', text: 'Essential for family homes — standard in DFW master bath remodels 2024+, adds $50-150' },
              { icon: '💧', title: 'Undermount Sink', text: 'Easier to clean countertop, popular with quartz and granite tops in DFW master baths' },
              { icon: '🪞', title: 'Integrated LED Mirror', text: 'DFW buyers expect lighted mirrors in master baths — adds $200-600, strong ROI' },
              { icon: '🧹', title: 'Dovetail Drawers', text: 'Indicates quality construction — look for this in DFW mid-range to luxury vanities' },
            ].map((f) => (
              <div key={f.title} style={{ padding: 16, background: '#0A1628', borderRadius: 10, border: '1px solid #1E3A5F' }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 14, marginBottom: 4 }}>{f.title}</div>
                <div style={{ color: '#94A3B8', fontSize: 12 }}>{f.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: 24, background: '#0F1F35', borderRadius: 16, border: '1px solid #F5E642' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🚿</div>
          <h3 style={{ color: '#F5E642', fontSize: 20, marginBottom: 8 }}>Get DFW Vanity Installation Quotes</h3>
          <p style={{ color: '#94A3B8', marginBottom: 20 }}>Connect with vetted DFW bathroom remodelers through ProLnk — free quotes, no commitment.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', padding: '14px 32px', borderRadius: 10, border: 'none', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
            Get Free Quotes
          </button>
        </div>
      </div>
    </div>
  );
}
