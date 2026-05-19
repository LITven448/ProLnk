import { useState } from 'react';

const needs = [
  { label: 'I need a new HVAC system installed', value: 'install' },
  { label: 'I need HVAC repair or diagnostics', value: 'repair' },
  { label: 'I want regular maintenance covered', value: 'maintenance' },
  { label: 'I want to understand my home HVAC health', value: 'health' },
  { label: 'I want to earn by helping others with HVAC', value: 'earn' },
];

const solutions: Record<string, { title: string; how: string[]; vault: string; cta: string }> = {
  install: {
    title: 'ProLnk HVAC Installation Match',
    how: [
      'Submit your home details: square footage, current system age, stories, number of zones',
      'ProLnk matches you with 3 verified DFW HVAC installation contractors',
      'Each contractor reviews your home profile before bidding — no drive-bys needed',
      'Compare bids side by side: equipment brand, SEER rating, warranty terms, install timeline',
      'Select your pro and confirm via ProLnk — full accountability guaranteed',
      'Installation records automatically stored in your Home Health Vault for life',
    ],
    vault: 'Your new system warranty, serial numbers, and install docs live in Home Health Vault permanently — accessible for any future service call, insurance claim, or home sale.',
    cta: 'Get 3 DFW HVAC Installation Quotes',
  },
  repair: {
    title: 'ProLnk HVAC Repair Match',
    how: [
      'Describe your HVAC issue: symptom, system age, last service date',
      'ProLnk routes your request to verified DFW HVAC repair techs in your area',
      'Techs with your system brand experience are prioritized in the match',
      'Get diagnostic appointment options — same-day and next-day availability tracked',
      'All repair records logged to your Home Health Vault — full service history maintained',
      'If repair exceeds 50% of replacement cost, ProLnk flags replacement quote option automatically',
    ],
    vault: 'Every service call, part replaced, and repair diagnosis is logged in your Home Health Vault — giving future techs full context before they arrive.',
    cta: 'Request a DFW HVAC Repair Match',
  },
  maintenance: {
    title: 'ProLnk HVAC Maintenance Program Match',
    how: [
      'ProLnk connects you with DFW HVAC contractors offering maintenance agreements',
      'Choose spring tune-up only, fall check only, or bi-annual full maintenance',
      'Maintenance providers matched on your system brand and DFW service area',
      'Maintenance visits auto-logged to your Home Health Vault after each appointment',
      'Set ProLnk reminders: filter change alerts, tune-up scheduling, warranty renewal notices',
      'Build a maintenance history that increases your home resale value documentation',
    ],
    vault: 'A maintained HVAC history in Home Health Vault is the single best proof of system care for home buyers and insurance adjusters. Every visit builds that record automatically.',
    cta: 'Find a DFW HVAC Maintenance Partner',
  },
  health: {
    title: 'Home Health Vault — HVAC Intelligence Layer',
    how: [
      'Add your HVAC system to Home Health Vault: brand, model, install date, SEER rating',
      'ProLnk tracks your system age against DFW average lifespan benchmarks',
      'Get proactive alerts: 10-year diagnostic reminder, 15-year replacement planning prompt',
      'All service calls, repairs, and warranties organized in one permanent record',
      'Vault generates a Home HVAC Health Score: system age, maintenance history, efficiency rating',
      'Share Vault access with your real estate agent at listing time — documented HVAC care adds value',
    ],
    vault: 'Home Health Vault is the permanent HVAC intelligence layer for your home. It does not follow the system — it follows the home. Future owners inherit the full record.',
    cta: 'Add Your HVAC to Home Health Vault',
  },
  earn: {
    title: 'ProLnk HVAC Referral Network — Earn From What You Know',
    how: [
      'Join ProLnk as a Home Originator — no license or trade skills required',
      'Refer DFW homeowners who need HVAC quotes, repairs, or maintenance',
      'Earn a referral fee every time your referred homeowner completes a match',
      'Earn an override on any pro you recruit to the ProLnk network',
      'Help neighbors add homes to Health Vault — earn ongoing origination rights',
      'Your 4-level network income compounds as you build — full 5-stream commission model',
    ],
    vault: 'Homes you help add to Health Vault create permanent origination rights — you earn a share of every ProLnk transaction on that home, forever.',
    cta: 'Join the ProLnk HVAC Referral Network',
  },
};

export default function DFWProLnkHVACMasterPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const sol = selected ? solutions[selected] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>ProLnk — DFW HVAC Master Reference</div>
        <h1 style={{ fontSize: '34px', fontWeight: 800, marginBottom: '12px', lineHeight: 1.2 }}>
          Everything ProLnk Does for DFW HVAC
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '12px', lineHeight: 1.6 }}>
          ProLnk is the DFW home services marketplace built around verified professionals, competitive matching, and a permanent home data layer called Home Health Vault. Here is how every HVAC need maps to ProLnk.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '32px' }}>
          {[
            { icon: '🏗️', label: 'Vetted DFW HVAC Pros', sub: 'Background-checked, licensed, rated' },
            { icon: '⚖️', label: 'Competitive Match System', sub: '3 bids, transparent comparison' },
            { icon: '🗄️', label: 'Home Health Vault', sub: 'Permanent HVAC records, every home' },
          ].map((f, i) => (
            <div key={i} style={{ backgroundColor: '#0f2040', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{f.icon}</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#F5E642', marginBottom: '4px' }}>{f.label}</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>{f.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <div style={{ fontSize: '13px', color: '#F5E642', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase' }}>🏠 What is your HVAC need?</div>
          <div style={{ display: 'grid', gap: '10px' }}>
            {needs.map(n => (
              <button key={n.value} onClick={() => setSelected(n.value)}
                style={{ padding: '14px 18px', borderRadius: '8px', border: selected === n.value ? '2px solid #F5E642' : '2px solid #1e3a5f', backgroundColor: selected === n.value ? '#1a2f50' : 'transparent', color: selected === n.value ? '#F5E642' : '#cbd5e1', cursor: 'pointer', textAlign: 'left', fontSize: '15px', fontWeight: selected === n.value ? 700 : 400 }}>
                {n.label}
              </button>
            ))}
          </div>
        </div>

        {sol && (
          <div style={{ backgroundColor: '#0f2040', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#F5E642', marginBottom: '20px' }}>⚡ {sol.title}</div>
            <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>How It Works</div>
            <div style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
              {sol.how.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 800, width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ color: '#cbd5e1', lineHeight: 1.5, paddingTop: '2px' }}>{step}</span>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#1a2f50', borderRadius: '8px', padding: '16px', marginBottom: '16px', borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: '13px', color: '#F5E642', fontWeight: 600, marginBottom: '6px' }}>🗄️ HOME HEALTH VAULT</div>
              <div style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.5 }}>{sol.vault}</div>
            </div>
            <button style={{ width: '100%', padding: '16px', backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: '16px', borderRadius: '10px', border: 'none', cursor: 'pointer' }}>
              {sol.cta} →
            </button>
          </div>
        )}

        <div style={{ backgroundColor: '#0f2040', borderRadius: '12px', padding: '24px' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#F5E642', marginBottom: '16px' }}>📋 ProLnk DFW HVAC Partner Network</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { label: 'Installation', detail: 'Full system replacements, new construction, add-ons' },
              { label: 'Repair & Diagnostics', detail: 'Emergency service, component replacement, leak detection' },
              { label: 'Preventive Maintenance', detail: 'Bi-annual tune-ups, filter programs, efficiency checks' },
              { label: 'Duct & Air Quality', detail: 'Duct sealing, cleaning, air purification, ERV systems' },
            ].map((item, i) => (
              <div key={i} style={{ backgroundColor: '#1a2f50', borderRadius: '8px', padding: '14px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#F5E642', marginBottom: '4px' }}>{item.label}</div>
                <div style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.4 }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
