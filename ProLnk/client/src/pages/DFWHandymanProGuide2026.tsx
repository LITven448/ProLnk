import { useState } from 'react';

export default function DFWHandymanProGuide2026() {
  const [service, setService] = useState('drywall');

  const services: Record<string, { label: string; legal: string; status: 'ok' | 'warn' | 'block'; avg: number; note: string }> = {
    drywall: { label: 'Drywall Repair', legal: 'No license required', status: 'ok', avg: 350, note: 'Fully legal for TX handymen' },
    tile: { label: 'Tile & Flooring', legal: 'No license required', status: 'ok', avg: 400, note: 'Fully legal for TX handymen' },
    electrical: { label: 'Electrical Work', legal: 'Electrician license required', status: 'block', avg: 0, note: 'ProLnk routes to licensed electrician' },
    plumbing: { label: 'Plumbing Repairs', legal: 'Plumber license required', status: 'block', avg: 0, note: 'ProLnk routes to licensed plumber' },
    painting: { label: 'Interior Painting', legal: 'No license required', status: 'ok', avg: 450, note: 'Fully legal for TX handymen' },
    hvac: { label: 'HVAC Work', legal: 'HVAC license required (EPA 608)', status: 'warn', avg: 0, note: 'Minor filter changes ok; repairs require license' },
  };

  const s = services[service];
  const statusColor = s.status === 'ok' ? '#22c55e' : s.status === 'warn' ? '#f59e0b' : '#ef4444';
  const statusIcon = s.status === 'ok' ? '✅' : s.status === 'warn' ? '⚠️' : '🚫';

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🔧</span>
          <div>
            <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk Pro Guide — DFW 2026</div>
            <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>Handyman Pro Guide</h1>
          </div>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Know your legal scope in TX — ProLnk handles trade routing when a license is required.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '💵', label: 'Avg DFW Job', value: '$350' },
            { icon: '⚖️', label: 'TX License Law', value: 'Scoped by trade' },
            { icon: '🔄', label: 'Trade Routing', value: 'ProLnk handles' },
            { icon: '📍', label: 'DFW Market', value: 'High demand' },
          ].map((s) => (
            <div key={s.label} style={{ backgroundColor: '#0f1f3d', borderRadius: 12, padding: '18px 20px' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 700 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f1f3d', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 16px' }}>⚖️ TX Licensing Requirement Check</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {Object.entries(services).map(([key, val]) => (
              <button key={key} onClick={() => setService(key)} style={{ padding: '7px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 12, backgroundColor: service === key ? '#F5E642' : '#1e3a5f', color: service === key ? '#0A1628' : '#94a3b8' }}>
                {val.label}
              </button>
            ))}
          </div>
          <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 20, border: `2px solid ${statusColor}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 24 }}>{statusIcon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{s.label}</div>
                <div style={{ color: statusColor, fontSize: 13, fontWeight: 600 }}>{s.legal}</div>
              </div>
            </div>
            <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>{s.note}</p>
            {s.avg > 0 && <div style={{ marginTop: 12, color: '#F5E642', fontWeight: 700 }}>Avg job value: ${s.avg}</div>}
          </div>
        </div>

        <div style={{ backgroundColor: '#0f1f3d', borderRadius: 16, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 12px' }}>🔄 How ProLnk Trade Routing Works</h2>
          {['Homeowner submits request — ProLnk detects if license is required', 'Licensed trade jobs route automatically to correct pro category', 'Handymen receive only legal-scope jobs for their classification', 'No missed revenue — ProLnk credits referral overrides for routing assists', 'Handymen building referral networks earn on licensed trade jobs they source'].map((n) => (
            <div key={n} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642', flexShrink: 0 }}>→</span>
              <span style={{ color: '#94a3b8', fontSize: 13 }}>{n}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}