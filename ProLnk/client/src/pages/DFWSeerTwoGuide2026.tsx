import { useState } from 'react';

const seerToSeer2: Record<number, { seer2: number; category: string; label: string }> = {
  10: { seer2: 9.6, category: 'Below Minimum', label: '❌ Replace Now' },
  12: { seer2: 11.5, category: 'Below Minimum', label: '❌ Replace Soon' },
  13: { seer2: 12.5, category: 'Below Minimum', label: '⚠️ Non-Compliant New' },
  14: { seer2: 13.4, category: 'Near Minimum', label: '⚠️ At Floor for Texas' },
  15: { seer2: 14.3, category: 'Meets Minimum', label: '✅ Texas Minimum Met' },
  16: { seer2: 15.2, category: 'Good Efficiency', label: '✅ Above Minimum' },
  17: { seer2: 16.2, category: 'High Efficiency', label: '🌟 High Efficiency' },
  18: { seer2: 17.2, category: 'High Efficiency', label: '🌟 High Efficiency' },
  20: { seer2: 19.0, category: 'Ultra Efficiency', label: '⭐ Ultra Efficiency' },
  22: { seer2: 21.0, category: 'Ultra Efficiency', label: '⭐ Best Available' },
};

const savingsData = [
  { from: 10, to: 15, annual: 420, tenYear: 4200 },
  { from: 13, to: 15, annual: 180, tenYear: 1800 },
  { from: 14, to: 16, annual: 140, tenYear: 1400 },
  { from: 15, to: 18, annual: 220, tenYear: 2200 },
];

export default function DFWSeerTwoGuide2026() {
  const [selectedSeer, setSelectedSeer] = useState<number | null>(null);

  const seerOptions = [10, 12, 13, 14, 15, 16, 17, 18, 20, 22];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>📊</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>
            DFW SEER2 Compliance Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>
            SEER2 replaced SEER in January 2023 — here's what it means for your DFW home
          </p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📋 SEER vs SEER2 Explained</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div style={{ background: '#0d1f35', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>🏭</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>Old SEER</div>
              <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>
                Lab-tested under ideal static pressure conditions. Measured in controlled environment — not reflective of real DFW ductwork performance.
              </p>
            </div>
            <div style={{ background: '#0d1f35', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>🏠</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>SEER2 (2023+)</div>
              <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>
                Tested at higher external static pressure (0.5 in. w.g.) — more accurately reflects real-world performance in DFW homes with typical ductwork resistance.
              </p>
            </div>
          </div>
          <div style={{ background: '#0d1f35', borderRadius: 10, padding: 16, borderLeft: '4px solid #F5E642′ }}>
            <p style={{ color: '#e2e8f0', lineHeight: 1.7 }}>
              <strong style={{ color: '#F5E642′ }}>Texas Rule:</strong> Minimum 15 SEER2 for split AC systems in Climate Zone 3 (all of DFW). This equates to approximately 14.3 SEER2 if converting an old 15 SEER unit — which is why comparing old SEER to new SEER2 ratings requires the conversion factor.
            </p>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 8 }}>🔄 Your Current SEER → SEER2 Converter</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16, fontSize: 14 }}>Select your system's SEER rating (from the nameplate or documentation):</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {seerOptions.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSeer(s)}
                style={{ padding: '8px 18px', background: selectedSeer === s ? '#F5E642′ : '#0d1f35', color: selectedSeer === s ? '#0A1628' : '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 8, cursor: ’pointer', fontWeight: 700, fontSize: 16 }}
              >
                {s}
              </button>
            ))}
          </div>
          {selectedSeer && seerToSeer2[selectedSeer] && (
            <div style={{ background: '#0d1f35', borderRadius: 10, padding: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, textAlign: 'center' }}>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>YOUR SEER</div>
                  <div style={{ fontSize: 36, fontWeight: 700, color: '#e2e8f0′ }}>{selectedSeer}</div>
                </div>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>SEER2 EQUIV.</div>
                  <div style={{ fontSize: 36, fontWeight: 700, color: '#F5E642′ }}>{seerToSeer2[selectedSeer].seer2}</div>
                </div>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>CATEGORY</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#22c55e' }}>{seerToSeer2[selectedSeer].label}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>💰 DFW Upgrade Savings Estimates</h2>
          {savingsData.map((row) => (
            <div key={`${row.from}-${row.to}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #1e3a5f' }}>
              <div style={{ color: '#e2e8f0′ }}>SEER {row.from} → SEER {row.to}</div>
              <div style={{ color: '#22c55e', fontWeight: 700 }}>~${row.annual}/yr · ${row.tenYear.toLocaleString()} over 10 yrs</div>
            </div>
          ))}
          <p style={{ color: '#64748b', fontSize: 12, marginTop: 12 }}>*Estimates based on average 2,400 sq ft DFW home running AC 9 months/year at $0.14/kWh.</p>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔗</div>
          <h3 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
            Get SEER2-Compliant Quotes via ProLnk
          </h3>
          <p style={{ color: '#1e3a5f' }}>Charter HVAC pros quote only SEER2-compliant systems for DFW homes.</p>
          <p style={{ color: '#0A1628', fontWeight: 700, marginTop: 8 }}>prolnk.io → HVAC Replacement</p>
        </div>
      </div>
    </div>
  );
}