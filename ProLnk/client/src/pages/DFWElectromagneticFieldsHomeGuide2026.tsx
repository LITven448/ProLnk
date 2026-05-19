import { useState } from 'react';

export default function DFWElectromagneticFieldsHomeGuide2026() {
  const [concern, setConcern] = useState('power-lines');

  const assessments: Record<string, { title: string; science: string; risk: string; riskColor: string; mitigation: string; note: string }> = {
    'power-lines': {
      title: 'ONCOR High-Voltage Transmission Lines',
      science: 'DFW has extensive ONCOR transmission corridors running through suburban neighborhoods. These lines operate at 138kV–345kV and generate both electric and magnetic fields. Magnetic field strength drops rapidly with distance — at 100ft from a 345kV line, fields are typically below 2 milligauss (mG).\',
      risk: 'Moderate Concern',
      riskColor: '#f59e0b',
      mitigation: 'Distance is your primary mitigation. Most health agencies consider fields below 2–4 mG low concern. Measure with a gaussmeter at property boundaries. Check ONCOR easement maps before purchasing.\',
      note: 'Power line easements can reduce property values 5–10% for lots within 200ft of transmission towers.'
    },
    'smart-meter': {
      title: 'Oncor Smart Meters (AMI)',
      science: 'Smart meters transmit data via radio frequency (RF) pulses typically lasting 1–30 milliseconds, a few times per hour. Peak RF exposure at 1 meter from the meter is typically 0.005–0.08 mW/cm² — well below the FCC limit of 0.6 mW/cm².\',
      risk: 'Low Concern',
      riskColor: '#22c55e',
      mitigation: 'Field levels drop to near-background at 3–4 feet. Concern is often based on continuous exposure assumptions that do not match actual duty cycles. No peer-reviewed consensus supports harm at these levels.\',
      note: 'Opt-out available through Oncor but may involve monthly fees for manual reads.'
    },
    'wifi-router': {
      title: 'WiFi Routers & Smart Home Devices',
      science: 'WiFi operates at 2.4 GHz and 5 GHz frequencies. At 1 meter, typical home routers measure 0.001–0.01 mW/cm² — 60x below FCC limits. Exposure falls off rapidly with distance following the inverse square law.\',
      risk: 'Minimal Concern',
      riskColor: '#22c55e',
      mitigation: 'Place router in a central location away from sleeping areas if concerned. Wired ethernet eliminates WiFi exposure entirely at connected devices. Switch to 5 GHz for shorter range with same throughput.\',
      note: 'Current scientific consensus (WHO, IARC) does not classify WiFi as a proven health risk at typical home exposure levels.'
    },
    'electrical-panel': {
      title: 'Home Electrical Panel & Wiring',
      science: '60Hz magnetic fields from home wiring typically measure 0.5–2 mG near walls with active circuits. Major appliances (HVAC, refrigerator motors) can produce 5–20 mG at 6 inches but drop below 1 mG at 3 feet.\',
      risk: 'Low Concern',
      riskColor: '#22c55e',
      mitigation: 'Keep sleeping areas away from large electrical panels. Ground all metal water pipes to reduce stray current on plumbing. Have an electrician verify proper grounding — improper grounding increases fields significantly.\',
      note: 'Older DFW homes may have aluminum wiring (pre-1972) — a separate fire safety concern, not an EMF issue.'
    },
  };

  const current = assessments[concern];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1rem', color: '#94a3b8', fontSize: '0.9rem' }}>🏠 ProLnk DFW Home Science Series</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>
          ⚡ DFW EMF Home Guide 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Electromagnetic fields in DFW homes — science-based risk assessment for ONCOR lines, smart meters, and more.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🏗️', label: 'ONCOR Transmission', value: '138–345kV', note: 'DFW corridors' },
            { icon: '📡', label: 'Smart Meter RF Duty', value: '<1%', note: 'of time transmitting' },
            { icon: '📏', label: 'Key Mitigation', value: 'Distance', note: 'inverse square law' },
          ].map(card => (
            <div key={card.label} style={{ background: '#1e3a5f', borderRadius: '10px', padding: '1.2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem' }}>{card.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.5rem' }}>{card.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem' }}>{card.value}</div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{card.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>⚗️ EMF Science Fundamentals</h2>
          {[
            'EMF strength follows the inverse square law — doubling distance reduces field strength to 25% of its original value.\',
            'Electric fields are blocked by walls and trees. Magnetic fields pass through most materials — only distance reduces them.\',
            '60Hz power frequency fields (from wiring and appliances) differ from RF fields (WiFi, smart meters) — both follow inverse square law.\',
            'ONCOR publishes easement maps — critical due diligence before purchasing any DFW property near transmission corridors.\',
          ].map((fact, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ color: '#F5E642′ }}>▸</span>
              <span style={{ color: '#cbd5e1′ }}>{fact}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2744', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 EMF Source → Risk Assessment</h2>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {Object.entries({ 'power-lines': '🏗️ Power Lines', 'smart-meter': '📡 Smart Meter', 'wifi-router': '📶 WiFi Router', 'electrical-panel': '⚡ Electrical Panel' }).map(([k, v]) => (
              <button key={k} onClick={() => setConcern(k)}
                style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: 'none', cursor: 'pointer', background: concern === k ? '#F5E642′ : '#1e3a5f', color: concern === k ? '#0A1628' : '#94a3b8', fontWeight: 600 }}>
                {v}
              </button>
            ))}
          </div>
          <div style={{ background: '#1e3a5f', borderRadius: '10px', padding: '1.25rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{current.title}</div>
            <div style={{ display: 'inline-block', background: '#0f2744', padding: '0.3rem 0.75rem', borderRadius: '20px', color: current.riskColor, fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>⚠️ {current.risk}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.75rem' }}>🔬 {current.science}</div>
            <div style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '0.75rem' }}>✅ {current.mitigation}</div>
            <div style={{ color: '#64748b', fontSize: '0.8rem', fontStyle: 'italic' }}>📌 {current.note}</div>
          </div>
        </div>
      </div>
    </div>
  );
}