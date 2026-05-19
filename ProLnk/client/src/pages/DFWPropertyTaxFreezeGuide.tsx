import { useState } from 'react';

const counties = [
  { id: 'dallas', label: 'Dallas County', district: 'Dallas CAD', phone: '(214) 631-0910', website: 'dallascad.org', process: ['Complete Form 50-116 (Over-65 Exemption)','Attach proof of age (driver’s license or birth certificate)','File with Dallas CAD by April 30 of qualifying year','Freeze is retroactive to Jan 1 of filing year'] },
  { id: 'tarrant', label: 'Tarrant County', district: 'Tarrant CAD', phone: '(817) 284-0024', website: 'tad.org', process: ['File Form 50-114 or 50-116 with Tarrant CAD','Provide Texas DL or ID showing DOB 65+','Homestead must be your primary residence','Freeze applies to school portion of tax bill'] },
  { id: 'collin', label: 'Collin County', district: 'Collin CAD', phone: '(469) 742-9200', website: 'collincad.org', process: ['Apply online at collincad.org or mail Form 50-116','Copy of government-issued ID with birthdate required','Surviving spouses 55+ can maintain freeze if spouse was 65+','Freeze transfers to new home of same or lesser value'] },
  { id: 'denton', label: 'Denton County', district: 'Denton CAD', phone: '(940) 349-3800', website: 'dentoncad.com', process: ['File application with Denton CAD by April 30','Attach photo ID showing age 65 or older','Qualifying year — freeze starts Jan 1 of that year','Once frozen, school taxes cannot increase'] },
  { id: 'rockwall', label: 'Rockwall County', district: 'Rockwall CAD', phone: '(972) 771-2034', website: 'rockwallcad.com', process: ['Submit Form 50-114 to Rockwall CAD','Must occupy property as primary residence','Freeze survives appeals — locked at lower of appraised or frozen value','Contact CAD for in-person assistance'] },
];

export default function DFWPropertyTaxFreezeGuide() {
  const [county, setCounty] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const chosen = counties.find(c => c.id === county);
  const eligible = parseInt(age) >= 65;

  return (
    <div style={{ background: '#F8F9FB', minHeight: '100vh', color: '#1A2332', fontFamily: 'system-ui,sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#2563EB', fontWeight: 600 }}>🏛️ DFW Property Tax</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Property Tax Freeze Guide — Seniors 65+</h1>
        <p style={{ color: '#64748B', marginBottom: 24, fontSize: 15 }}>Texas law allows homeowners age 65+ to freeze their school district property taxes. Understand what's frozen, what isn’t, and how to apply at your county appraisal district.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 10, padding: 16 }}>
            <div style={{ fontWeight: 700, color: '#16A34A', marginBottom: 6 }}>✅ What Gets Frozen</div>
            <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.7 }}>School district taxes only. Even if your home's appraisal rises, your school tax bill stays at the frozen amount from your qualifying year.</div>
          </div>
          <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 10, padding: 16 }}>
            <div style={{ fontWeight: 700, color: '#EA580C', marginBottom: 6 }}>⚠️ What Is NOT Frozen</div>
            <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.7 }}>City taxes, county taxes, hospital district, and MUD taxes continue to change based on appraisal and rates set by those entities.</div>
          </div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24, marginBottom: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>🔍 Check Your Eligibility</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Your Age</label>
              <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 67″ style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: 8, fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>DFW County</label>
              <select value={county} onChange={e => setCounty(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: 8, fontSize: 15, background: '#FFF', boxSizing: 'border-box' }}>
                <option value="">Select county...</option>
                {counties.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
          </div>
          {age && county && (
            <div style={{ background: eligible ? '#F0FDF4′ : '#FFF7ED', border: `1px solid ${eligible ? '#BBF7D0' : '#FED7AA'}`, borderRadius: 10, padding: 14, fontSize: 15, fontWeight: 600, color: eligible ? '#16A34A' : '#EA580C' }}>
              {eligible ? '✅ You qualify for the Over-65 school tax freeze!' : '⚠️ Must be age 65+ to qualify for the freeze.'}
            </div>
          )}
        </div>

        {chosen && eligible && (
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>📋 How to Apply — {chosen.label}</h3>
            <div style={{ fontSize: 13, color: '#64748B', marginBottom: 16 }}>{chosen.district} · {chosen.phone} · {chosen.website}</div>
            {chosen.process.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, fontSize: 14 }}>
                <span style={{ background: '#2563EB', color: '#FFF', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 12, fontWeight: 700 }}>{i+1}</span>
                <span style={{ color: '#374151', lineHeight: 1.6 }}>{s}</span>
              </div>
            ))}
            <div style={{ marginTop: 16, background: '#EFF6FF', borderRadius: 8, padding: 12, fontSize: 13, color: '#1E40AF' }}>
              💡 Estimated annual school tax savings for DFW seniors: $800–$2,400 depending on appraised value and school district rate.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
