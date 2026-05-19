import { useState } from 'react';

const ratings = [
  { id: '100', label: '100% Disabled', taxExemption: 'Full exemption — entire property tax bill eliminated', vlb: true, vaLoan: true, est: '$4,000–$12,000+/yr' },
  { id: '70_99', label: '70–99% Disabled', taxExemption: '$12,000 exemption on appraised value', vlb: true, vaLoan: true, est: '$300–$600/yr' },
  { id: '50_69', label: '50–69% Disabled', taxExemption: '$10,000 exemption on appraised value', vlb: true, vaLoan: true, est: '$250–$450/yr' },
  { id: '10_49', label: '10–49% Disabled', taxExemption: '$5,000 exemption on appraised value', vlb: false, vaLoan: true, est: '$125–$225/yr' },
  { id: '0', label: 'Honorable Discharge (no rating)', taxExemption: '$2,500 veteran homestead exemption', vlb: true, vaLoan: true, est: '$60–$100/yr' },
];

const counties = [
  { id: 'dallas', label: 'Dallas County', cad: 'Dallas CAD', phone: '(214) 631-0910′ },
  { id: 'tarrant', label: 'Tarrant County', cad: 'Tarrant CAD', phone: '(817) 284-0024′ },
  { id: 'collin', label: 'Collin County', cad: 'Collin CAD', phone: '(469) 742-9200′ },
  { id: 'denton', label: 'Denton County', cad: 'Denton CAD', phone: '(940) 349-3800′ },
];

export default function DFWVeteranHomeBenefits() {
  const [rating, setRating] = useState<string>('');
  const [county, setCounty] = useState<string>('');
  const chosenRating = ratings.find(r => r.id === rating);
  const chosenCounty = counties.find(c => c.id === county);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8ECF0', fontFamily: 'system-ui,sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642′ }}>🎖️ DFW Veterans Benefits</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Veteran Home Benefits Guide — DFW</h1>
        <p style={{ color: '#9BA8B8', marginBottom: 24, fontSize: 15 }}>DFW is home to NAS Fort Worth JRB (formerly Carswell), NAS Dallas history, and thousands of veterans. Texas offers some of the strongest veteran home benefits in the nation.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 32 }}>
          {[{icon:'🏠',title:'TX Property Tax Exemption',desc:'Up to 100% exemption based on VA disability rating'},{icon:'🏦',title:'VLB Home Loan',desc:'Texas Veterans Land Board — below-market rate mortgage'},{icon:'⭐',title:'VA Home Loan',desc:'Zero down, no PMI, competitive rates for DFW purchases'}].map(b => (
            <div key={b.title} style={{ background: '#111D2E', border: '1px solid #1E2D42', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{b.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, color: '#F5E642′ }}>{b.title}</div>
              <div style={{ fontSize: 12, color: '#9BA8B8', lineHeight: 1.6 }}>{b.desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14, color: '#F5E642′ }}>🎯 Select Your VA Disability Rating</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {ratings.map(r => (
            <div key={r.id} onClick={() => setRating(r.id)} style={{ background: rating === r.id ? 'rgba(245,230,66,0.08)' : '#111D2E', border: `1px solid ${rating === r.id ? '#F5E642' : '#1E2D42'}`, borderRadius: 10, padding: '14px 16px', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{r.label}</div>
                  <div style={{ fontSize: 13, color: '#9BA8B8', marginTop: 4 }}>{r.taxExemption}</div>
                </div>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{r.est}/yr savings</span>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14, color: '#F5E642′ }}>📍 Your DFW County</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 28 }}>
          {counties.map(c => (
            <div key={c.id} onClick={() => setCounty(c.id)} style={{ background: county === c.id ? 'rgba(245,230,66,0.08)' : '#111D2E', border: `1px solid ${county === c.id ? '#F5E642' : '#1E2D42'}`, borderRadius: 10, padding: '14px 16px', cursor: 'pointer' }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{c.label}</div>
              <div style={{ fontSize: 12, color: '#9BA8B8', marginTop: 4 }}>{c.cad} · {c.phone}</div>
            </div>
          ))}
        </div>

        {chosenRating && chosenCounty && (
          <div style={{ background: '#111D2E', border: '1px solid #1E2D42', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#F5E642′ }}>📋 Your Benefits Summary — {chosenCounty.label}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: 'rgba(245,230,66,0.07)', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#F5E642', marginBottom: 4 }}>🏠 Property Tax Exemption</div>
                <div style={{ fontSize: 14, color: '#9BA8B8′ }}>{chosenRating.taxExemption}</div>
                <div style={{ fontSize: 13, color: '#4ADE80', marginTop: 6 }}>Estimated savings: {chosenRating.est} · Apply at {chosenCounty.cad} with VA award letter + DD-214</div>
              </div>
              {chosenRating.vlb && (
                <div style={{ background: 'rgba(96,165,250,0.07)', borderRadius: 8, padding: '12px 14px' }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#60A5FA', marginBottom: 4 }}>🏦 VLB Home Loan (Texas Specific)</div>
                  <div style={{ fontSize: 14, color: '#9BA8B8′ }}>Texas Veterans Land Board offers below-market fixed rates. Eligible veterans can combine with VA loan benefits. Apply at vlb.texas.gov</div>
                </div>
              )}
              <div style={{ background: 'rgba(74,222,128,0.07)', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#4ADE80', marginBottom: 4 }}>⭐ VA Home Loan — DFW</div>
                <div style={{ fontSize: 14, color: '#9BA8B8′ }}>DFW is a VA loan-friendly market. Zero down payment, no PMI, competitive interest rates. Conforming limit for DFW counties in 2025 is $806,500. Contact a VA-approved lender.</div>
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#111D2E', border: '1px solid #1E2D42', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: 12 }}>📌 DFW Military Context</div>
          {['NAS Fort Worth JRB (formerly Carswell AFB) — active installation in west Fort Worth','Naval Air Station Dallas (closed 1998) — large veteran community in Irving/Grand Prairie area','DFW counties consistently rank top 10 nationally for veteran homeownership','Texas comptroller veterans property tax hotline: (512) 463-4600'].map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 14, color: '#9BA8B8′ }}><span style={{ color: '#F5E642' }}>·</span>{s}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
