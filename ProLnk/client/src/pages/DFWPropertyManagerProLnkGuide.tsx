import { useState } from 'react';

const painPoints = [
  { icon: '⏱️', pain: 'Hours spent sourcing contractors for each property', fix: 'ProLnk dispatches vetted pros in minutes' },
  { icon: '📞', pain: 'Chasing down quotes and scheduling conflicts', fix: 'Single dashboard for all service requests' },
  { icon: '😤', pain: 'Tenant complaints about slow maintenance response', fix: 'ProLnk SLA tracking keeps everyone accountable' },
  { icon: '💸', pain: 'No revenue from the service coordination you provide', fix: 'ProLnk revenue share on every job at your units' },
];

const metrics = [
  { label: 'Avg hours saved per unit/year', value: '14', unit: 'hours' },
  { label: 'Avg service cost reduction', value: '18%', unit: 'per job' },
  { label: 'Tenant satisfaction lift', value: '+31%', unit: 'industry avg' },
  { label: 'Origination rights (permanent)', value: '∞', unit: 'per home' },
];

export default function DFWPropertyManagerProLnkGuide() {
  const [units, setUnits] = useState(75);
  const [avgJobsPerUnit, setAvgJobsPerUnit] = useState(6);

  const hoursPerUnit = 14;
  const hourlyRate = 65;
  const totalHoursSaved = units * hoursPerUnit;
  const timeSavingsValue = Math.round(totalHoursSaved * hourlyRate);
  const costReduction = Math.round(units * avgJobsPerUnit * 320 * 0.18);
  const revenueShare = Math.round(units * avgJobsPerUnit * 320 * 0.015);
  const originationValue = Math.round(units * 18 * 12);
  const total = timeSavingsValue + costReduction + revenueShare + originationValue;

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#1a2233', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0A1628', color: '#fff', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🏢</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>ProLnk for DFW Property Managers</h1>
        <p style={{ fontSize: 18, color: '#F5E642', margin: 0 }}>Manage maintenance faster, earn from every job, keep owners happy</p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Property Management's Biggest Hidden Cost</h2>
          <p style={{ color: '#4a5568', lineHeight: 1.7, marginBottom: 12 }}>
            Maintenance coordination is the most time-consuming, lowest-margin part of property management. The average DFW property
            manager spends 14+ hours per unit per year just sourcing, scheduling, and following up with contractors. That's time that
            doesn't show up on the management fee — but it absolutely should.
          </p>
          <p style={{ color: '#4a5568', lineHeight: 1.7 }}>
            ProLnk transforms your service coordination into a revenue center. By enrolling your portfolio in the ProLnk system,
            you get a preferred contractor network, automated dispatching, and a <strong>revenue share on every job</strong> at every
            unit you manage — plus origination rights that pay even if ownership transfers.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {painPoints.map((p) => (
            <div key={p.pain} style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{p.icon}</div>
              <div style={{ color: '#dc2626', fontSize: 13, marginBottom: 8, fontWeight: 600 }}>❌ {p.pain}</div>
              <div style={{ color: '#16a34a', fontSize: 13, fontWeight: 600 }}>✅ {p.fix}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16, marginBottom: 32 }}>
          {metrics.map((m) => (
            <div key={m.label} style={{ background: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center', color: '#fff' }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#F5E642', marginBottom: 4 }}>{m.value}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>{m.unit}</div>
              <div style={{ fontSize: 12, color: '#cbd5e1', lineHeight: 1.4 }}>{m.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>📊 Property Manager ROI Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>Units Under Management</label>
              <input type="range" min={10} max={500} step={5} value={units} onChange={(e) => setUnits(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
              <div style={{ textAlign: 'center', fontWeight: 700, color: '#0A1628', fontSize: 20 }}>{units} units</div>
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>Avg Service Calls/Unit/Year</label>
              <input type="range" min={2} max={15} value={avgJobsPerUnit} onChange={(e) => setAvgJobsPerUnit(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
              <div style={{ textAlign: 'center', fontWeight: 700, color: '#0A1628', fontSize: 20 }}>{avgJobsPerUnit} calls</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14 }}>
            {[
              { label: 'Time Saved Value', value: `$${timeSavingsValue.toLocaleString()}`, sub: `${totalHoursSaved} hrs @ $${hourlyRate}/hr` },
              { label: 'Service Cost Reduction', value: `$${costReduction.toLocaleString()}`, sub: '~18% avg savings' },
              { label: 'ProLnk Revenue Share', value: `$${revenueShare.toLocaleString()}`, sub: 'per year' },
              { label: 'Origination Residual', value: `$${originationValue.toLocaleString()}`, sub: 'annual recurring' },
            ].map((item) => (
              <div key={item.label} style={{ background: '#f8f9fb', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#0A1628′ }}>{item.value}</div>
                <div style={{ fontSize: 11, color: '#94a3b8′ }}>{item.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center', color: '#fff' }}>
            <div style={{ fontSize: 14, color: '#F5E642', marginBottom: 4 }}>Total Annual Value Unlocked with ProLnk</div>
            <div style={{ fontSize: 36, fontWeight: 900 }}>${total.toLocaleString()}</div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>Includes time savings, cost reduction, and revenue share.</div>
          </div>
        </div>

        <div style={{ background: '#0A1628', borderRadius: 16, padding: 32, textAlign: 'center', color: '#fff' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🏆</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Turn Your Portfolio into a Revenue Center</h2>
          <p style={{ color: '#94a3b8', marginBottom: 24 }}>Property managers get bulk enrollment pricing and dedicated account support. Apply before Charter tier fills.</p>
          <a href="/pro-signup" style={{ background: '#F5E642', color: '#0A1628', padding: '14px 36px', borderRadius: 50, fontWeight: 800, fontSize: 16, textDecoration: 'none', display: 'inline-block' }}>
            Apply as a Portfolio Partner →
          </a>
        </div>
      </div>
    </div>
  );
}
