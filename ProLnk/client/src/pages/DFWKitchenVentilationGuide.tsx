import { useState } from 'react';

const COOKTOP_TYPES = [
  { name: 'Gas Range (standard)', btu: 40000, cfmRequired: 400, icon: '🔥' },
  { name: 'Gas Range (professional)', btu: 60000, cfmRequired: 600, icon: '👨‍🍳' },
  { name: 'Electric Coil', btu: 20000, cfmRequired: 250, icon: '🔌' },
  { name: 'Electric Smooth Top', btu: 20000, cfmRequired: 250, icon: '⚡' },
  { name: 'Induction', btu: 15000, cfmRequired: 200, icon: '🧲' },
];

const HOOD_TYPES = [
  { name: 'Ducted Wall Mount', cfm: [300, 1200], costMin: 400, costMax: 2500, dfwNote: 'Best for DFW barbecue and frying — exhausts grease outside, avoids recirculating odors', installation: 'Moderate' },
  { name: 'Ducted Island Mount', cfm: [400, 1500], costMin: 600, costMax: 4000, dfwNote: 'Required for open-concept DFW kitchens with islands — longer duct run often needed', installation: 'Complex' },
  { name: 'Under-Cabinet Ducted', cfm: [200, 600], costMin: 150, costMax: 800, dfwNote: 'Good budget option for standard DFW kitchens — easy retrofit', installation: 'Easy' },
  { name: 'Recirculating (Ductless)', cfm: [200, 600], costMin: 100, costMax: 600, dfwNote: 'Not ideal for DFW barbecue cooks — only filters, does not remove heat or humidity', installation: 'Easy' },
];

const MAKEUP_AIR_THRESHOLD = 400;

function CfmBar({ value, max }: { value: number; max: number }) {
  const pct = Math.min(100, (value / max) * 100);
  const color = pct > 80 ? '#EF4444′ : pct > 60 ? '#EAB308' : '#22C55E';
  return (
    <div style={{ height: 8, background: '#1E3A5F', borderRadius: 4, overflow: 'hidden', marginTop: 4 }}>
      <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 4, transition: 'width 0.3s' }} />
    </div>
  );
}

export default function DFWKitchenVentilationGuide() {
  const [selectedCooktop, setSelectedCooktop] = useState(COOKTOP_TYPES[0]);
  const [selectedHood, setSelectedHood] = useState(HOOD_TYPES[0]);
  const [isOpen, setIsOpen] = useState(false);

  const requiredCFM = selectedCooktop.cfmRequired + (isOpen ? 100 : 0);
  const needsMakeupAir = requiredCFM > MAKEUP_AIR_THRESHOLD;
  const hoodFits = selectedHood.cfm[1] >= requiredCFM;
  const makeupAirCost = needsMakeupAir ? 800 : 0;
  const totalMin = selectedHood.costMin + makeupAirCost;
  const totalMax = selectedHood.costMax + makeupAirCost + 500;

  const complexity = selectedHood.installation === 'Easy' ? 1 : selectedHood.installation === 'Moderate' ? 2 : 3;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>💨</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>
            DFW Kitchen Ventilation Guide
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 600, margin: '0 auto' }}>
            DFW cooking habits — barbecue, frying, heavy grease — demand more CFM than national averages suggest.
          </p>
        </div>

        <div style={{ background: '#0F1F35', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 20 }}>CFM Calculator</h2>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', color: '#94A3B8', marginBottom: 12, fontSize: 14 }}>Cooktop Type</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {COOKTOP_TYPES.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedCooktop(c)}
                  style={{
                    padding: '14px 12px',
                    borderRadius: 12,
                    border: `2px solid ${selectedCooktop.name === c.name ? '#F5E642' : '#1E3A5F'}`,
                    background: selectedCooktop.name === c.name ? '#1A2E4A' : '#0D1A2E',
                    color: '#E8EDF5',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ fontSize: 24, marginBottom: 4 }}>{c.icon}</div>
                  <div style={{ fontWeight: 600, color: selectedCooktop.name === c.name ? '#F5E642′ : '#E8EDF5', fontSize: 12 }}>{c.name}</div>
                  <div style={{ color: '#94A3B8', fontSize: 11 }}>{c.btu.toLocaleString()} BTU</div>
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', color: '#CBD5E1′ }}>
              <input
                type="checkbox"
                checked={isOpen}
                onChange={(e) => setIsOpen(e.target.checked)}
                style={{ accentColor: '#F5E642', width: 18, height: 18 }}
              />
              Open-concept kitchen (add 100 CFM for greater air volume)
            </label>
          </div>
          <div style={{ padding: 20, background: '#0A1628', borderRadius: 12, border: '1px solid #F5E642′ }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>Required CFM</div>
                <div style={{ color: '#F5E642', fontSize: 36, fontWeight: 800 }}>{requiredCFM}</div>
                <CfmBar value={requiredCFM} max={800} />
                <div style={{ color: '#64748B', fontSize: 11, marginTop: 4 }}>Recommended for DFW cooking style</div>
              </div>
              <div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>Make-Up Air Required?</div>
                <div style={{ color: needsMakeupAir ? '#EF4444′ : '#22C55E', fontSize: 20, fontWeight: 800, marginTop: 4 }}>
                  {needsMakeupAir ? 'Yes — Required' : 'Not Required'}
                </div>
                <div style={{ color: '#94A3B8', fontSize: 12, marginTop: 4 }}>
                  {needsMakeupAir
                    ? `Hoods over ${MAKEUP_AIR_THRESHOLD} CFM require make-up air in Texas building codes. Add $600-1,200.`
                    : `Under ${MAKEUP_AIR_THRESHOLD} CFM — no make-up air system needed.`}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: '#0F1F35', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 20 }}>Hood Recommendation</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {HOOD_TYPES.map((h) => {
              const fits = h.cfm[1] >= requiredCFM;
              return (
                <button
                  key={h.name}
                  onClick={() => setSelectedHood(h)}
                  style={{
                    padding: 16,
                    borderRadius: 12,
                    border: `2px solid ${selectedHood.name === h.name ? '#F5E642' : fits ? '#1E3A5F' : '#3A1A1A'}`,
                    background: selectedHood.name === h.name ? '#1A2E4A' : fits ? '#0D1A2E' : '#1A0D0D',
                    color: '#E8EDF5',
                    cursor: 'pointer',
                    textAlign: 'left',
                    opacity: fits ? 1 : 0.7,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: 700, color: selectedHood.name === h.name ? '#F5E642′ : '#E8EDF5', marginBottom: 4 }}>
                        {h.name}
                        {!fits && <span style={{ marginLeft: 8, color: '#EF4444', fontSize: 12 }}>Underpowered for your setup</span>}
                        {fits && selectedHood.name === h.name && <span style={{ marginLeft: 8, color: '#22C55E', fontSize: 12 }}>Fits your needs</span>}
                      </div>
                      <div style={{ fontSize: 12, color: '#94A3B8′ }}>{h.cfm[0]}-{h.cfm[1]} CFM · {h.installation} install</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: '#F5E642', fontWeight: 700 }}>${h.costMin.toLocaleString()}-${h.costMax.toLocaleString()}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 8, fontSize: 12, color: '#94A3B8', padding: '6px 10px', background: '#0A1628', borderRadius: 6 }}>
                    DFW: {h.dfwNote}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ background: '#0F1F35', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 16 }}>Installation Cost Estimate</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div style={{ padding: 16, background: '#0A1628', borderRadius: 12, border: '1px solid #1E3A5F', textAlign: 'center' }}>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>Total Installed</div>
              <div style={{ color: '#F5E642', fontSize: 24, fontWeight: 800 }}>${totalMin.toLocaleString()}-${totalMax.toLocaleString()}</div>
            </div>
            <div style={{ padding: 16, background: '#0A1628', borderRadius: 12, border: '1px solid #1E3A5F', textAlign: 'center' }}>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>Install Complexity</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                {[1, 2, 3].map((i) => (
                  <div key={i} style={{ width: 20, height: 20, borderRadius: 4, background: i <= complexity ? '#F5E642′ : '#1E2D45' }} />
                ))}
              </div>
              <div style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>{selectedHood.installation}</div>
            </div>
            <div style={{ padding: 16, background: '#0A1628', borderRadius: 12, border: '1px solid #1E3A5F', textAlign: 'center' }}>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>Make-Up Air</div>
              <div style={{ color: needsMakeupAir ? '#EF4444′ : '#22C55E', fontSize: 24, fontWeight: 800 }}>
                {needsMakeupAir ? `+$${makeupAirCost}` : 'N/A'}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 16, padding: 14, background: '#1A2A0A', borderRadius: 10, border: '1px solid #EAB308′ }}>
            <div style={{ color: '#EAB308', fontWeight: 700, fontSize: 13 }}>DFW Slab Home Duct Routing Note</div>
            <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 4 }}>Most DFW homes are on slab foundations. Routing ductwork to exterior requires going through cabinets or attic — add $300-600 for complex duct runs. Island hoods are most challenging.</div>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: 24, background: '#0F1F35', borderRadius: 16, border: '1px solid #F5E642′ }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>💨</div>
          <h3 style={{ color: '#F5E642', fontSize: 20, marginBottom: 8 }}>Get DFW Ventilation Quotes</h3>
          <p style={{ color: '#94A3B8', marginBottom: 20 }}>Connect with DFW kitchen contractors through ProLnk — free quotes from vetted pros.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', padding: '14px 32px', borderRadius: 10, border: 'none', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
            Get Free Quotes
          </button>
        </div>
      </div>
    </div>
  );
}
