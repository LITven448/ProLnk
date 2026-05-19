import { useState } from 'react';

const FAN_TYPES = [
  { name: 'Basic Fan', costMin: 25, costMax: 80, sones: 3.0, features: [], energyStar: false, dfwNote: 'Adequate for small baths — noisy at higher CFM, common in older DFW homes', smartControl: false },
  { name: 'Quiet Fan', costMin: 60, costMax: 150, sones: 0.5, features: ['Ultra-quiet operation'], energyStar: true, dfwNote: 'Popular DFW upgrade — noticeably quieter, ENERGY STAR eligible for rebates', smartControl: false },
  { name: 'Timer Fan', costMin: 50, costMax: 120, sones: 1.5, features: ['Adjustable auto-shutoff timer'], energyStar: false, dfwNote: 'Good for DFW — runs 15-30 min after shower to clear humidity without manual shutoff', smartControl: false },
  { name: 'Humidity-Sensing Fan', costMin: 80, costMax: 200, sones: 1.0, features: ['Auto on/off by humidity', 'No manual control needed'], energyStar: true, dfwNote: 'Best for DFW — automatically activates when DFW shower steam hits threshold, runs until humidity clears', smartControl: false },
  { name: 'Fan + Light Combo', costMin: 40, costMax: 180, sones: 2.0, features: ['Integrated LED light', 'Single unit, one install'], energyStar: true, dfwNote: 'Practical for DFW secondary baths — one rough-in, reduces ceiling clutter', smartControl: false },
  { name: 'Smart Fan', costMin: 120, costMax: 350, sones: 0.5, features: ['App control', 'Scheduling', 'Humidity sensor'], energyStar: true, dfwNote: 'Premium choice for DFW master baths — schedule with morning routines, monitor via phone', smartControl: true },
];

const BATHROOM_SIZES = [
  { label: 'Powder Room (under 20 sq ft)', sqft: 16, ceilingHt: 8 },
  { label: 'Small Bath (20-50 sq ft)', sqft: 35, ceilingHt: 8 },
  { label: 'Medium Bath (50-100 sq ft)', sqft: 75, ceilingHt: 9 },
  { label: 'Master Bath (100+ sq ft)', sqft: 120, ceilingHt: 9 },
];

const AIR_CHANGES_PER_HOUR = 8;

function SoneBar({ sones }: { sones: number }) {
  const pct = (sones / 4) * 100;
  const color = sones < 1 ? '#22C55E' : sones < 2 ? '#EAB308′ : '#EF4444';
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748B', marginBottom: 3 }}>
        <span>Quiet</span>
        <span>{sones} sones</span>
        <span>Loud</span>
      </div>
      <div style={{ height: 6, background: '#1E3A5F', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 3 }} />
      </div>
    </div>
  );
}

export default function DFWBathroomVentilationGuide() {
  const [selectedSize, setSelectedSize] = useState(BATHROOM_SIZES[2]);
  const [selectedFan, setSelectedFan] = useState(FAN_TYPES[3]);

  const volume = selectedSize.sqft * selectedSize.ceilingHt;
  const requiredCFM = Math.ceil((volume * AIR_CHANGES_PER_HOUR) / 60);
  const installCostMin = 75;
  const installCostMax = 250;
  const totalMin = selectedFan.costMin + installCostMin;
  const totalMax = selectedFan.costMax + installCostMax;

  const ducting = selectedSize.sqft > 50 ? 'Duct to exterior (not attic) — 4″ flex duct minimum' : '3-4″ duct to exterior or roof cap';
  const fanFits = true;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🌬️</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>
            DFW Bathroom Ventilation Guide
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 600, margin: '0 auto' }}>
            DFW humidity makes bathroom exhaust fans critical — the right fan prevents mold, peeling paint, and structural damage.
          </p>
        </div>

        <div style={{ background: '#0F1F35', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 20 }}>CFM Sizing Calculator</h2>
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
                    color: selectedSize.label === s.label ? '#F5E642′ : '#94A3B8',
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
          <div style={{ padding: 20, background: '#0A1628', borderRadius: 12, border: '1px solid #F5E642′ }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>Required CFM</div>
                <div style={{ color: '#F5E642', fontSize: 36, fontWeight: 800 }}>{requiredCFM}</div>
                <div style={{ color: '#64748B', fontSize: 11 }}>8 air changes/hour</div>
              </div>
              <div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>Air Volume</div>
                <div style={{ color: '#CBD5E1', fontSize: 22, fontWeight: 700 }}>{volume} cu ft</div>
                <div style={{ color: '#64748B', fontSize: 11 }}>{selectedSize.sqft} sq ft x {selectedSize.ceilingHt} ft ceiling</div>
              </div>
              <div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>DFW Rec: Add 20%</div>
                <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 700 }}>{Math.ceil(requiredCFM * 1.2)} CFM</div>
                <div style={{ color: '#64748B', fontSize: 11 }}>For DFW shower steam load</div>
              </div>
            </div>
            <div style={{ marginTop: 16, padding: 12, background: '#1A2E4A', borderRadius: 8 }}>
              <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 13, marginBottom: 4 }}>Duct Recommendation</div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>{ducting}</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#0F1F35', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 20 }}>Fan Type Selector</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAN_TYPES.map((f) => (
              <button
                key={f.name}
                onClick={() => setSelectedFan(f)}
                style={{
                  padding: 16,
                  borderRadius: 12,
                  border: `2px solid ${selectedFan.name === f.name ? '#F5E642' : '#1E3A5F'}`,
                  background: selectedFan.name === f.name ? '#1A2E4A' : '#0D1A2E',
                  color: '#E8EDF5',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div>
                    <span style={{ fontWeight: 700, color: selectedFan.name === f.name ? '#F5E642′ : '#E8EDF5', fontSize: 15 }}>{f.name}</span>
                    {f.energyStar && <span style={{ marginLeft: 8, background: '#22C55E', color: '#0A1628', fontSize: 10, padding: '2px 6px', borderRadius: 8, fontWeight: 700 }}>ENERGY STAR</span>}
                    {f.smartControl && <span style={{ marginLeft: 6, background: '#3B82F6', color: '#fff', fontSize: 10, padding: '2px 6px', borderRadius: 8, fontWeight: 700 }}>SMART</span>}
                  </div>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>${f.costMin}-${f.costMax}</div>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <SoneBar sones={f.sones} />
                </div>
                {f.features.length > 0 && (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                    {f.features.map((feat) => (
                      <span key={feat} style={{ background: '#1E3A5F', color: '#94A3B8', fontSize: 11, padding: '3px 8px', borderRadius: 6 }}>{feat}</span>
                    ))}
                  </div>
                )}
                <div style={{ fontSize: 12, color: '#94A3B8', padding: '6px 10px', background: '#0A1628', borderRadius: 6 }}>
                  DFW: {f.dfwNote}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F1F35', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 16 }}>Installation Cost Estimate</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div style={{ padding: 20, background: '#0A1628', borderRadius: 12, border: '1px solid #F5E642′ }}>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>Total Installed</div>
              <div style={{ color: '#F5E642', fontSize: 28, fontWeight: 800 }}>${totalMin} - ${totalMax}</div>
              <div style={{ color: '#64748B', fontSize: 12 }}>Fan + electrical + duct</div>
            </div>
            <div style={{ padding: 20, background: '#0A1628', borderRadius: 12, border: '1px solid #1E3A5F' }}>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>DIY vs Pro</div>
              <div style={{ color: '#E8EDF5', fontSize: 16, fontWeight: 700 }}>Pro Recommended</div>
              <div style={{ color: '#94A3B8', fontSize: 12, marginTop: 4 }}>Proper duct routing to exterior is critical — improper install vents moisture into attic, causing mold in DFW heat</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: '🌡️', text: 'Vent to exterior — NEVER to attic. DFW summer attic temps (140°F+) combined with bathroom moisture causes rapid mold growth.' },
              { icon: '📏', text: 'Keep duct run under 25 ft total length. Each 90° elbow equals ~10 ft of equivalent length — reduces CFM delivered.' },
              { icon: '💡', text: 'ENERGY STAR fans qualify for Oncor and other DFW utility rebates — check current programs for $10-75 rebates.' },
              { icon: '🔇', text: 'Sones matter more than CFM in DFW master baths. Under 1 sone is whisper-quiet, 3+ sones is noticeably loud.' },
            ].map((tip) => (
              <div key={tip.icon} style={{ display: 'flex', gap: 12, padding: 14, background: '#0A1628', borderRadius: 10, border: '1px solid #1E3A5F', alignItems: 'flex-start' }}>
                <div style={{ fontSize: 20, flexShrink: 0 }}>{tip.icon}</div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>{tip.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: 24, background: '#0F1F35', borderRadius: 16, border: '1px solid #F5E642′ }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🌬️</div>
          <h3 style={{ color: '#F5E642', fontSize: 20, marginBottom: 8 }}>Get DFW Ventilation Fan Quotes</h3>
          <p style={{ color: '#94A3B8', marginBottom: 20 }}>Connect with vetted DFW electricians and bathroom contractors through ProLnk — free quotes, no commitment.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', padding: '14px 32px', borderRadius: 10, border: 'none', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
            Get Free Quotes
          </button>
        </div>
      </div>
    </div>
  );
}
