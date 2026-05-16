import { useState } from 'react';

const stages = [
  { id: 'buying', label: '🔍 Buying', icon: '🔍' },
  { id: 'movingin', label: '📦 Moving In', icon: '📦' },
  { id: 'maintaining', label: '🔧 Maintaining', icon: '🔧' },
  { id: 'improving', label: '🏗️ Improving', icon: '🏗️' },
  { id: 'selling', label: '🏷️ Selling', icon: '🏷️' },
];

const guides: Record<string, { title: string; desc: string; tag: string }[]> = {
  buying: [
    { title: 'DFW Home Buyer\'s Complete Guide 2026', desc: 'From pre-approval to closing in North Texas — every step explained.', tag: 'Master Guide' },
    { title: 'DFW Neighborhood Comparison Guide 2026', desc: 'Plano vs Frisco vs McKinney vs Allen — detailed comparison.', tag: 'Location' },
    { title: 'Pre-Purchase Home Inspection Guide for DFW', desc: 'What to look for in North Texas homes — foundation, HVAC, roof.', tag: 'Inspection' },
    { title: 'DFW Property Tax Guide for Buyers 2026', desc: 'How CAD appraisals work and what to expect at closing.', tag: 'Taxes' },
  ],
  movingin: [
    { title: 'DFW Move-In Day Master Checklist', desc: 'Everything to do in the first 72 hours in your North Texas home.', tag: 'Checklist' },
    { title: 'Setting Up Utilities in DFW — Complete Guide', desc: 'Electricity, gas, water, internet — every provider and step.', tag: 'Utilities' },
    { title: 'DFW Homestead Exemption — File Immediately', desc: 'Deadline April 30, saves thousands annually — don\'t miss it.', tag: 'Save Money' },
    { title: 'Register Your DFW Home on ProLnk', desc: 'Connect your home to the Home Health Vault and get matched pros.', tag: '⭐ ProLnk' },
  ],
  maintaining: [
    { title: 'DFW Annual Home Maintenance Calendar 2026', desc: 'Every month\'s critical tasks for North Texas climate and soil.', tag: 'Schedule' },
    { title: 'DFW Foundation Watering — The $10K Habit', desc: 'Why consistent watering prevents the most expensive repair in Texas.', tag: 'Foundation' },
    { title: 'HVAC Maintenance Schedule for DFW Homeowners', desc: 'Filter changes, tune-ups, and when to call for your North Texas system.', tag: 'HVAC' },
    { title: 'DFW Roof Inspection Checklist — After Every Storm', desc: 'What to check yourself and when to call a pro after hail.', tag: 'Roof' },
  ],
  improving: [
    { title: 'DFW Home Improvement ROI Guide 2026', desc: 'Which projects return most in North Texas real estate market.', tag: 'ROI' },
    { title: 'Permitted vs Unpermitted Work in DFW', desc: 'When you need a permit in Dallas, Fort Worth, and suburbs.', tag: 'Legal' },
    { title: 'Financing Home Improvements in Texas 2026', desc: 'HELOC, cash-out refi, PACE loans, and contractor financing.', tag: 'Financing' },
    { title: 'Find Vetted DFW Contractors on ProLnk', desc: 'Get matched with licensed, insured pros for any improvement project.', tag: '⭐ ProLnk' },
  ],
  selling: [
    { title: 'Sell or Stay? DFW Market Analysis 2026', desc: 'How to evaluate your equity position and timing in North Texas.', tag: 'Strategy' },
    { title: 'Pre-Sale Home Improvements — DFW ROI Rankings', desc: 'What to fix, what to skip, and what moves the needle in DFW.', tag: 'Prep' },
    { title: 'Foundation and HVAC Disclosure in Texas Sales', desc: 'Texas seller disclosure requirements and what buyers look for.', tag: 'Legal' },
    { title: 'DFW Home Staging Guide 2026', desc: 'Proven staging strategies for North Texas buyer preferences.', tag: 'Staging' },
  ],
};

const stats = [
  { label: 'DFW Median Home Price', value: '$390K', icon: '🏠' },
  { label: 'Annual Appreciation', value: '4.2%', icon: '📈' },
  { label: 'Avg Property Tax Rate', value: '2.1%', icon: '💰' },
  { label: 'Hailstorms Per Year', value: '6-8', icon: '⛈️' },
];

export default function DFWUltimateHomeownerGuide2026() {
  const [active, setActive] = useState('buying');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🏆🏠</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>
            DFW Ultimate Homeowner Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>
            The complete lifecycle guide to DFW homeownership — from buying your first home to selling at peak value.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: '#1e3a5f', borderRadius: 12, padding: 16, textAlign: 'center', border: '1px solid #2d4a7a' }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 }}>
          {stages.map(s => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              style={{
                padding: '10px 20px', borderRadius: 24, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14,
                background: active === s.id ? '#F5E642' : '#1e3a5f', color: active === s.id ? '#0A1628' : '#94a3b8',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 16, marginBottom: 40 }}>
          {guides[active].map((g, i) => (
            <div key={i} style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, border: '1px solid #2d4a7a' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', margin: 0, flex: 1, marginRight: 8 }}>{g.title}</h3>
                <span style={{ background: '#0A1628', color: '#F5E642', fontSize: 11, padding: '3px 8px', borderRadius: 12, whiteSpace: 'nowrap' }}>{g.tag}</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 14px' }}>{g.desc}</p>
              <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                Read Guide →
              </button>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 16, padding: 28, textAlign: 'center', border: '2px solid #F5E642' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏆</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>ProLnk — Your DFW Homeownership Partner</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>From your first home inspection to your final sale, ProLnk connects you with the best pros in North Texas at every stage.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>
              I'm a Homeowner →
            </button>
            <button style={{ background: 'transparent', color: '#F5E642', border: '2px solid #F5E642', borderRadius: 10, padding: '14px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>
              I'm a Pro →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}