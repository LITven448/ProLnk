import { useState } from 'react';

const ranges = [
  { age: 'pre1980', label: 'Pre-1980', bill: 'low', billLabel: '< $150/mo', rec: '🔴 Priority: Full Audit', desc: 'Homes built before 1980 often have inadequate insulation, single-pane windows, and uninsulated ductwork. A full RESNET/BPI certified audit is strongly recommended. Expect to find: 30–50% energy waste from air leaks and poor insulation.' },
  { age: 'pre1980', label: 'Pre-1980', bill: 'high', billLabel: '> $150/mo', rec: '🔴 Urgent: Certified Energy Audit + Oncor Free Audit', desc: 'High bills in an older home signal major efficiency gaps. Apply for Oncor’s free energy audit (limited slots) AND book a RESNET auditor for a full blower door test. Insulation, air sealing, and duct improvements will likely pay back in 2–4 years.' },
  { age: '1980-2000', label: '1980–2000', bill: 'low', billLabel: '< $150/mo', rec: '🟡 Consider: Oncor Free Audit', desc: 'Homes from this era have some insulation but may have settled or degraded. An Oncor free energy audit can identify quick wins like attic top-offs and HVAC filter upgrades at no cost.' },
  { age: '1980-2000', label: '1980–2000', bill: 'high', billLabel: '> $150/mo', rec: '🟠 Recommended: Full Certified Audit', desc: 'Higher-than-expected bills in a mid-era home usually point to duct leakage or degraded insulation. A RESNET Home Energy Score audit ($150–$300) will pinpoint issues and qualify you for Atmos and Oncor rebates.' },
  { age: 'post2000', label: 'Post-2000', bill: 'low', billLabel: '< $150/mo', rec: '🟢 Optional: SECO Online Tools', desc: 'Newer homes with reasonable bills are likely performing well. Use SECO’s free online energy assessment tools to benchmark your home and identify any minor improvements.' },
  { age: 'post2000', label: 'Post-2000', bill: 'high', billLabel: '> $150/mo', rec: '🟡 Consider: Targeted Audit', desc: 'Unexpectedly high bills in a newer home often trace to HVAC sizing issues, equipment problems, or user behavior. A targeted HVAC audit ($75–$150) by a certified technician is the right first step before a full blower door test.' },
];

export default function DFWEnergyAuditGuide2026() {
  const [age, setAge] = useState('pre1980');
  const [bill, setBill] = useState('high');
  const result = ranges.find(r => r.age === age && r.bill === bill);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#e2e8f0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642′ }}>🔍 Energy Audits · DFW 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>DFW Home Energy Audit Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Find out which energy audit is right for your home. Answer two questions to get a personalized recommendation.</p>

        <div style={{ backgroundColor: '#0f2340', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontWeight: 600, marginBottom: '0.6rem', color: '#F5E642′ }}>🏠 When was your home built?</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[{v:'pre1980',l:'Before 1980'},{v:'1980-2000',l:'1980–2000'},{v:'post2000',l:'After 2000'}].map(o => (
                <button key={o.v} onClick={() => setAge(o.v)} style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: age === o.v ? '#F5E642′ : '#1e3a5f', color: age === o.v ? '#0A1628' : '#e2e8f0', fontWeight: 600 }}>{o.l}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: '0.6rem', color: '#F5E642′ }}>💡 What is your average monthly electric bill?</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[{v:'low',l:'Under $150'},{v:'high',l:'Over $150'}].map(o => (
                <button key={o.v} onClick={() => setBill(o.v)} style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: bill === o.v ? '#F5E642′ : '#1e3a5f', color: bill === o.v ? '#0A1628' : '#e2e8f0', fontWeight: 600 }}>{o.l}</button>
              ))}
            </div>
          </div>
        </div>

        {result && (
          <div style={{ backgroundColor: '#0f2340', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ fontWeight: 700, fontSize: '1.15rem', color: '#F5E642', marginBottom: '0.75rem' }}>{result.rec}</div>
            <div style={{ color: '#94a3b8', lineHeight: 1.6 }}>{result.desc}</div>
          </div>
        )}

        <div style={{ backgroundColor: '#0f2340', borderRadius: '12px', padding: '1.25rem' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.75rem' }}>📋 DFW Audit Resources</div>
          {[
            { label: 'Oncor Free Energy Audit', detail: 'Limited slots. Request at oncor.com/save-energy — must be Oncor customer.' },
            { label: 'RESNET Certified Auditors', detail: 'Find at resnet.us/find-a-rater — typical cost $150–$400 for full blower door + duct test.' },
            { label: 'SECO Online Assessment', detail: 'Free self-assessment at seco.cpa.state.tx.us — good starting point for newer homes.' },
          ].map((r, i) => (
            <div key={i} style={{ borderBottom: '1px solid #1e3a5f', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{r.label}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.88rem' }}>{r.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
