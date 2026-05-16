import { useState } from 'react';

const CAPACITY: Record<string, Record<string, { status: string; issues: string; permits: string }>> = {
  pre2000: {
    ev: { status: 'Panel Upgrade Required', issues: 'Pre-2000 Sachse homes typically have 100A or 150A panels — Level 2 EV chargers need a 240V/50A dedicated circuit, often exceeding available capacity.', permits: 'Permit required: EV circuit + likely panel upgrade. City of Sachse typical turnaround: 5–10 business days.' },
    solar: { status: 'Assessment Needed', issues: 'Older panels may not support bidirectional solar feed. Main panel inspection and possible 200A upgrade before solar tie-in.', permits: 'Permit + utility interconnection agreement. Process: 3–6 weeks with Oncor.' },
    addition: { status: 'Capacity Concern', issues: 'Room addition on older panel risks overload. Load calculation needed before any sub-panel or circuit extension work.', permits: 'Building permit includes electrical sub-permit. Inspection required before drywall.' },
  },
  '2000to2015': {
    ev: { status: 'Often Feasible', issues: 'Many 2000–2015 Sachse homes have 200A panels with capacity for a 50A EV circuit. Panel space inspection confirms.', permits: 'Permit required for dedicated EV circuit. Sachse fast-track permit available in 3–5 days.' },
    solar: { status: 'Solar Ready', issues: 'Mid-era homes typically have adequate panel capacity. Main concern: roof age and inverter placement for optimal production.', permits: 'Permit + Oncor interconnection. 3–4 week typical timeline.' },
    addition: { status: 'Good Capacity', issues: 'Sub-panel for addition is straightforward in this era. Confirm available breaker slots before planning.', permits: 'Standard electrical permit with addition permit. Inspection at rough-in and final.' },
  },
  post2015: {
    ev: { status: 'EV Ready', issues: 'New Sachse construction is often EV-ready with dedicated conduit stub-outs. Verify panel capacity and add circuit if not pre-wired.', permits: 'Permit required even for pre-wired systems. Quick approval in 1–3 days.' },
    solar: { status: 'Optimal', issues: 'Modern homes are designed for solar. Check HOA rules — many Sachse developments allow rooftop systems with design approval.', permits: 'Permit + Oncor. HOA design review if applicable. 4–6 weeks total.' },
    addition: { status: 'Straightforward', issues: '200A+ panels standard in post-2015 builds. Sub-panel addition is typically a one-day job.', permits: 'Standard permit. Inspector typically 48-hour scheduling.' },
  },
};

export default function DFWElectricianSachse() {
  const [homeAge, setHomeAge] = useState('');
  const [upgrade, setUpgrade] = useState('');
  const [result, setResult] = useState<{ status: string; issues: string; permits: string } | null>(null);

  function check() {
    if (homeAge && upgrade) setResult(CAPACITY[homeAge][upgrade]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0F2040 100%)', padding: '48px 24px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: '36px', marginBottom: '8px' }}>⚡🚗</div>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#F5E642', margin: '0 0 8px' }}>Sachse TX Electricians</h1>
        <p style={{ fontSize: '16px', color: '#A8B8D0', margin: '0', maxWidth: '560px', marginInline: 'auto' }}>
          Growing Northeast Suburb Specialists — EV chargers, solar, and panel upgrades in Collin County
        </p>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid #1A3060' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', margin: '0 0 16px' }}>⚡ Sachse's Fast-Growth Electrical Profile</h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            {[
              { icon: '🏘️', label: 'Rapid Development Since 2000', desc: 'Sachse grew from 9,000 to 30,000+ residents since 2000 — a mix of older 1990s homes and modern subdivisions creates highly varied electrical capacity' },
              { icon: '🚗', label: 'EV Charger Surge', desc: 'Collin County leads DFW in EV adoption — demand for Level 2 home chargers is outpacing electrician availability in fast-growth suburbs like Sachse' },
              { icon: '📋', label: 'Collin County Permit Process', desc: 'Sachse uses Collin County for some permits — understanding dual-authority requirements saves weeks on project timelines' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '24px', flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: '700', color: '#E8EDF5', fontSize: '14px' }}>{item.label}</div>
                  <div style={{ color: '#8898AA', fontSize: '13px', marginTop: '2px' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid #1A3060' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', margin: '0 0 16px' }}>🔌 Electrical Capacity + Permit Requirements Check</h2>
          <div style={{ display: 'grid', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', color: '#A8B8D0', fontSize: '13px', marginBottom: '6px' }}>Home Age</label>
              <select
                value={homeAge}
                onChange={(e) => { setHomeAge(e.target.value); setResult(null); }}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #2A4080', borderRadius: '8px', padding: '10px 12px', color: '#E8EDF5', fontSize: '14px' }}
              >
                <option value="">Select era...</option>
                <option value="pre2000">Before 2000 — older Sachse neighborhood</option>
                <option value="2000to2015">2000–2015 — mid-growth era</option>
                <option value="post2015">2015 or newer — modern subdivision</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#A8B8D0', fontSize: '13px', marginBottom: '6px' }}>Planned Upgrade</label>
              <select
                value={upgrade}
                onChange={(e) => { setUpgrade(e.target.value); setResult(null); }}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #2A4080', borderRadius: '8px', padding: '10px 12px', color: '#E8EDF5', fontSize: '14px' }}
              >
                <option value="">Select upgrade...</option>
                <option value="ev">EV charger installation (Level 2)</option>
                <option value="solar">Solar panel electrical tie-in</option>
                <option value="addition">Room addition or sub-panel</option>
              </select>
            </div>
          </div>
          <button
            onClick={check}
            disabled={!homeAge || !upgrade}
            style={{ width: '100%', background: homeAge && upgrade ? '#F5E642' : '#2A4080', color: homeAge && upgrade ? '#0A1628' : '#4A6080', border: 'none', borderRadius: '8px', padding: '12px', fontSize: '15px', fontWeight: '700', cursor: homeAge && upgrade ? 'pointer' : 'not-allowed' }}
          >
            Check Capacity + Permit Requirements
          </button>
          {result && (
            <div style={{ marginTop: '16px', background: '#0A1628', borderRadius: '8px', padding: '16px', border: '1px solid #F5E642' }}>
              <div style={{ fontWeight: '800', fontSize: '16px', color: '#F5E642', marginBottom: '6px' }}>{result.status}</div>
              <div style={{ color: '#E8EDF5', fontSize: '13px', marginBottom: '10px' }}>{result.issues}</div>
              <div style={{ background: '#0F2040', borderRadius: '6px', padding: '10px', color: '#A8B8D0', fontSize: '12px', borderLeft: '3px solid #F5E642' }}>
                📋 Permit Info: {result.permits}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚡</div>
          <h3 style={{ color: '#0A1628', fontSize: '18px', fontWeight: '800', margin: '0 0 6px' }}>Book a Sachse Electrical Assessment</h3>
          <p style={{ color: '#1A3060', fontSize: '13px', margin: '0 0 16px' }}>Licensed master electricians. Permit-pull included. EV charger specialists.</p>
          <a href="/pro-signup" style={{ display: 'inline-block', background: '#0A1628', color: '#F5E642', padding: '12px 32px', borderRadius: '8px', fontWeight: '700', fontSize: '14px', textDecoration: 'none' }}>
            Connect with a Sachse Electrician →
          </a>
        </div>
      </div>
    </div>
  );
}
