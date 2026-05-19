import { useState } from 'react';

const situations = [
  { id: 'emergency', label: '🚨 Emergency / No AC', title: 'Emergency HVAC Resources', items: ['Check breaker panel — HVAC breakers often trip during storms', 'Thermostat to COOL, fan to AUTO — wait 5 min before calling', 'Replace air filter if not done in 3+ months (common cause)', 'Ice on coil = refrigerant leak or airflow blockage — turn off', 'DFW average emergency service call: $150-$350 after hours', 'ProLnk connects you with licensed HVAC pros in your zip code'] },
  { id: 'seasonal', label: '🌡️ Seasonal Maintenance', title: 'Seasonal HVAC Maintenance', items: ['Spring: Clean condenser coils, check refrigerant, replace filter', 'Fall: Inspect heat exchanger, test igniter, check gas pressure', 'DFW heat season: April-October — service in March to beat rush', 'Recommended: 2 tune-ups per year (~$80-$150 each)', 'Change 1″ filters monthly, 4″ filters every 6-9 months in DFW', 'Annual maintenance agreement: $150-$250/yr, saves on repairs'] },
  { id: 'brand', label: '🏷️ Brand Selection', title: 'HVAC Brand Guide for DFW', items: ['Top DFW brands: Trane, Lennox, Carrier, Goodman, Rheem', 'Trane/Lennox: Premium, higher upfront, excellent longevity (18-22yr)', 'Goodman: Budget-friendly, solid warranty, common in DFW installs', 'Carrier: Mid-tier, widely serviced, good for DFW climate', 'Brand matters less than installation quality — pick a great contractor', 'Always verify NATE certification and Texas TDLR license'] },
  { id: 'sizing', label: '📐 System Sizing', title: 'HVAC Sizing for DFW Homes', items: ['DFW rule of thumb: 400-600 sq ft per ton of cooling capacity', 'Oversized systems short-cycle, create humidity problems in DFW summers', 'Manual J load calculation required for accurate sizing — insist on it', '1,500 sq ft home: typically 2.5-3 tons; 2,500 sq ft: 4-5 tons', 'Insulation, windows, and attic condition all affect sizing', 'Get 3 quotes with Manual J — reject any bid without it'] },
  { id: 'efficiency', label: '⚡ Efficiency & SEER', title: 'HVAC Efficiency in DFW', items: ['Texas minimum SEER2: 14.3 for split systems (2023 federal rule)', 'High-efficiency: 18+ SEER2 — pays back in 5-8 yrs in DFW heat', 'Variable-speed compressors dramatically improve comfort and efficiency', 'Attic insulation R-38 to R-60 is critical for DFW efficiency gains', 'Smart thermostats (Ecobee, Nest) save 10-15% on DFW cooling bills', 'ENERGY STAR rebates available through Oncor and Atmos Energy'] },
  { id: 'finance', label: '💰 Financing & Cost', title: 'HVAC Financing for DFW', items: ['Full system replacement DFW: $5,500-$14,000 depending on size/brand', 'HVAC companies often offer 12-18 months same-as-cash financing', 'Carrier, Lennox dealers have manufacturer financing programs', 'Texas Property Assessed Clean Energy (PACE) for energy upgrades', 'Federal tax credit: 30% on qualifying high-efficiency systems (2026)', 'ProLnk pros can connect you to financing-ready installers'] },
];

export default function DFWHVACFinalGuide2026B() {
  const [selected, setSelected] = useState(situations[0].id);
  const active = situations.find(s => s.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 800, margin: '0.5rem 0′ }}>DFW HVAC Complete Guide 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Final Summary — All Resources by Situation</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
          {situations.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)}
              style={{ background: selected === s.id ? '#F5E642′ : '#1e2d4a', color: selected === s.id ? '#0A1628' : '#cbd5e1', border: ’none', borderRadius: '8px', padding: '0.5rem 0.9rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
              {s.label}
            </button>
          ))}
        </div>
        <div style={{ background: '#1e2d4a', borderRadius: '12px', padding: '1.5rem', border: '2px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🔧 {active.title}</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {active.items.map((item, i) => (
              <li key={i} style={{ color: '#e2e8f0', padding: '0.6rem 0', borderBottom: i < active.items.length - 1 ? '1px solid #2d3f5e' : 'none', fontSize: '0.95rem' }}>
                ✅ {item}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ textAlign: 'center', marginTop: '1.5rem', padding: '1rem', background: '#1e2d4a', borderRadius: '10px' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 0.3rem' }}>🏠 ProLnk — Built for DFW Homeowners</p>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>Connect with vetted HVAC pros in your DFW zip code at prolnk.io</p>
        </div>
      </div>
    </div>
  );
}
