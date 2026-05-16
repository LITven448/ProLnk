import { useState } from 'react';

const brands = [
  { id: 'trane', name: 'Trane', logo: '🔵', base: '5 years parts', extended: '10 years parts', labor: '1 year', deadline: '60 days', url: 'warranty.trane.com', info: ['Model number (on outdoor unit)', 'Serial number', 'Install date', 'Contractor name & license#'] },
  { id: 'lennox', name: 'Lennox', logo: '🔴', base: '5 years parts', extended: '10 years parts', labor: '1 year', deadline: '60 days', url: 'lennox.com/register', info: ['Product model & serial', 'Install address', 'Install date', 'Dealer info'] },
  { id: 'carrier', name: 'Carrier', logo: '🟠', base: '5 years parts', extended: '10 years parts + compressor', labor: '1 year', deadline: '90 days', url: 'carrier.com/residential/register', info: ['Model & serial number', 'Install date', 'Installing dealer', 'Purchase proof'] },
  { id: 'york', name: 'York', logo: '🟢', base: '5 years parts', extended: '10 years parts', labor: '1 year', deadline: '60 days', url: 'york.com/register', info: ['Model number', 'Serial number', 'Installation date', 'Contractor info'] },
  { id: 'goodman', name: 'Goodman', logo: '⚪', base: '10 years parts', extended: 'Lifetime compressor (registered)', labor: '1 year', deadline: '60 days', url: 'goodmanmfg.com/register', info: ['Model & serial number', 'Install date & address', 'Contractor details'] },
];

export default function DFWHVACManufacturerRegistration2026() {
  const [selected, setSelected] = useState('trane');
  const brand = brands.find(b => b.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK · DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>📋 HVAC Registration Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Registering your DFW HVAC doubles your warranty coverage — from 5 years to 10 years parts — for free. Most homeowners skip this and lose thousands.</p>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, marginBottom: 24, color: '#0A1628' }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>⚡ The Free Upgrade You Probably Skipped</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: 'rgba(10,22,40,0.12)', borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Without Registration</div>
              <div style={{ fontWeight: 700, fontSize: 18 }}>5 Years</div>
              <div style={{ fontSize: 12 }}>Parts warranty</div>
            </div>
            <div style={{ background: 'rgba(10,22,40,0.12)', borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 12, opacity: 0.7 }}>With Registration</div>
              <div style={{ fontWeight: 700, fontSize: 18 }}>10 Years</div>
              <div style={{ fontSize: 12 }}>Parts warranty (FREE)</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16, color: '#F5E642' }}>🏷️ Select Your HVAC Brand</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
            {brands.map(b => (
              <button key={b.id} onClick={() => setSelected(b.id)} style={{ padding: '10px 18px', borderRadius: 10, border: `2px solid ${selected === b.id ? '#F5E642' : 'transparent'}`, background: selected === b.id ? '#1e3a5f' : '#0A1628', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>{b.logo} {b.name}</button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            {[{ label: 'Without Registration', val: brand.base }, { label: 'With Registration', val: brand.extended }, { label: 'Labor Coverage', val: brand.labor }, { label: 'Registration Deadline', val: brand.deadline + ' from install' }].map(i => (
              <div key={i.label} style={{ background: '#0A1628', borderRadius: 10, padding: 14 }}>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{i.label}</div>
                <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 15, marginTop: 4 }}>{i.val}</div>
              </div>
            ))}
          </div>

          <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, color: '#F5E642' }}>📝 What You Need to Register</div>
            {brand.info.map(i => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                <span style={{ color: '#F5E642' }}>›</span><span style={{ color: '#cbd5e1', fontSize: 14 }}>{i}</span>
              </div>
            ))}
            <div style={{ marginTop: 16, padding: '12px 16px', background: '#132035', borderRadius: 8, fontSize: 14, color: '#94a3b8' }}>
              Register at: <span style={{ color: '#F5E642', fontWeight: 700 }}>{brand.url}</span>
            </div>
          </div>
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12, color: '#F5E642' }}>⏰ DFW Homeowner Checklist</div>
          {['Day 1: Take photo of model/serial plate on outdoor unit', 'Day 3: Ask contractor for install invoice with their license #', 'Day 7: Register at manufacturer website (takes 5 min)', 'Day 7: Save confirmation email to Home Health Vault', 'Year 1: Schedule annual maintenance to maintain warranty'].map(t => (
            <div key={t} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642' }}>✓</span><span style={{ color: '#cbd5e1', fontSize: 14 }}>{t}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center', color: '#0A1628' }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🏠 Store Your Registration in Home Health Vault</div>
          <div style={{ fontSize: 13 }}>ProLnk tracks your HVAC registration, warranty dates, and service history automatically.</div>
        </div>
      </div>
    </div>
  );
}
