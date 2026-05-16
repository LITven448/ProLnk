import { useState } from 'react';

const programs = [
  { id: 'tsahc_dpa', label: 'TSAHC Down Payment Assistance', education: true, method: 'Online (eHome America or Framework)', cost: 99, hours: 6, validity: '2 years', providers: ['eHome America','Framework Homeownership'] },
  { id: 'tsahc_mortgage', label: 'TSAHC Mortgage Credit Certificate', education: false, method: 'Online', cost: 0, hours: 0, validity: 'N/A — not required', providers: [] },
  { id: 'tdhca_mybond', label: 'TDHCA My First Texas Home', education: true, method: 'Online or In-Person (HUD-approved)', cost: 75, hours: 8, validity: 'Lifetime', providers: ['NFCC member agencies','eHome America'] },
  { id: 'tdhca_mcc', label: 'TDHCA Texas Mortgage Credit Certificate', education: true, method: 'Online or In-Person', cost: 75, hours: 8, validity: 'Lifetime', providers: ['HUD-approved counselors'] },
  { id: 'dallas_city', label: 'City of Dallas Homebuyer Assistance', education: true, method: 'In-Person (HUD-approved agency)', cost: 50, hours: 8, validity: '1 year', providers: ['CitySquare','Consumer Credit Counseling Service'] },
  { id: 'frisco', label: 'Frisco / Collin Co. Programs', education: true, method: 'Online acceptable', cost: 99, hours: 6, validity: '2 years', providers: ['Framework','eHome America'] },
];

export default function DFWHomebuyerCertificationGuide() {
  const [sel, setSel] = useState<string>('');
  const chosen = programs.find(p => p.id === sel);

  return (
    <div style={{ background: '#F8F9FB', minHeight: '100vh', color: '#1A2332', fontFamily: 'system-ui,sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#2563EB', fontWeight: 600 }}>🏠 DFW Homebuyer Programs</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, lineHeight: 1.2 }}>Homebuyer Education Certification Guide</h1>
        <p style={{ color: '#64748B', marginBottom: 32, fontSize: 15 }}>Many DFW assistance programs require a HUD-approved homebuyer education certificate. Find out what your program requires and how to complete it.</p>

        <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 12, padding: '16px 20px', marginBottom: 28, fontSize: 14 }}>
          <div style={{ fontWeight: 600, marginBottom: 8, color: '#1E40AF' }}>📋 What Is Homebuyer Education?</div>
          <div style={{ color: '#374151', lineHeight: 1.7 }}>A HUD-approved course covering budgeting, credit, loan types, closing costs, and home maintenance. Courses run 6–8 hours and cost $15–$100. Some are free through HUD-approved nonprofit agencies.</div>
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14, color: '#1A2332' }}>📌 Select Your Assistance Program</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          {programs.map(p => (
            <div key={p.id} onClick={() => setSel(p.id)} style={{ background: sel === p.id ? '#EFF6FF' : '#FFFFFF', border: `1px solid ${sel === p.id ? '#2563EB' : '#E2E8F0'}`, borderRadius: 10, padding: '14px 16px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{p.label}</div>
                <div style={{ fontSize: 12, color: '#64748B', marginTop: 3 }}>Education required: <span style={{ color: p.education ? '#16A34A' : '#64748B', fontWeight: 600 }}>{p.education ? 'Yes' : 'No'}</span></div>
              </div>
              <span style={{ fontSize: 18 }}>{sel === p.id ? '✅' : '⬜'}</span>
            </div>
          ))}
        </div>

        {chosen && chosen.education && (
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#1A2332' }}>📚 Education Requirements for {chosen.label}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              {[{label:'Completion Method',val:chosen.method},{label:'Course Duration',val:`${chosen.hours} hours`},{label:'Typical Cost',val:`$${chosen.cost}`},{label:'Certificate Validity',val:chosen.validity}].map(row => (
                <div key={row.label} style={{ background: '#F8FAFC', borderRadius: 8, padding: '12px 14px' }}>
                  <div style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>{row.label}</div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{row.val}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Recommended Providers:</div>
            {chosen.providers.map(prov => (
              <div key={prov} style={{ display: 'flex', gap: 8, marginBottom: 6, fontSize: 14, color: '#374151' }}>
                <span style={{ color: '#2563EB' }}>→</span>{prov}
              </div>
            ))}
          </div>
        )}
        {chosen && !chosen.education && (
          <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <div style={{ color: '#16A34A', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>✅ No Education Certificate Required</div>
            <div style={{ color: '#374151', fontSize: 14 }}>This program does not require homebuyer education. However, taking a course voluntarily is recommended — it can improve your loan terms and lender confidence.</div>
          </div>
        )}

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 600, marginBottom: 12 }}>🔗 Free / Low-Cost DFW Education Options</div>
          {['Consumer Credit Counseling Service of Greater Dallas — free HUD-approved counseling','eHome America — $99 online, widely accepted','Framework Homeownership — $75 online, mobile-friendly','HUD.gov housing counselor locator — find local nonprofits by zip'].map((s, i) => (
            <div key={i} style={{ fontSize: 14, color: '#374151', marginBottom: 8, display: 'flex', gap: 8 }}><span style={{ color: '#2563EB' }}>·</span>{s}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
