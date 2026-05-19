import { useState } from 'react';

const trades = [
  {
    trade: 'HVAC', icon: '❄️',
    checklist: [
      { item: 'TDLR HVAC License', how: 'Search name/company at tdlr.texas.gov — must show "Active"' },
      { item: 'EPA 608 Refrigerant Cert', how: 'Ask for cert card — required for any refrigerant handling' },
      { item: 'General Liability ($1M+)', how: 'Request certificate of insurance — verify expiry date' },
      { item: 'Pull Permit for Replacement', how: 'Any new HVAC install requires city permit — no exceptions' },
      { item: 'Written Itemized Quote', how: 'Must include equipment model, labor, warranty details' },
    ]
  },
  {
    trade: 'Plumbing', icon: '🔧',
    checklist: [
      { item: 'TSBPE Plumber License', how: 'Verify at licensing.tsbpe.texas.gov — Master or Journeyman' },
      { item: 'Backflow Prevention Cert', how: 'Required if touching main water line or irrigation' },
      { item: 'General Liability ($1M+)', how: 'Request COI — confirm your address is named if needed' },
      { item: 'Permit for Reroutes/Repipes', how: 'Any major plumbing work needs city permit and inspection' },
      { item: 'No Cash-Only Policy', how: 'Licensed pros accept check or card — cash-only is a red flag' },
    ]
  },
  {
    trade: 'Electrical', icon: '⚡',
    checklist: [
      { item: 'TDLR Electrical License', how: 'Verify at tdlr.texas.gov — Master Electrician required for panel work' },
      { item: 'Permit for Panel/New Circuits', how: 'All panel upgrades and new circuits require AHJ permit' },
      { item: 'General Liability + Workers Comp', how: 'Both required — electrical has highest injury liability' },
      { item: 'Written Scope of Work', how: 'Must specify wire gauge, breaker amperage, permit inclusion' },
      { item: 'Post-Work Inspection', how: 'City inspector must sign off — get inspection receipt' },
    ]
  },
  {
    trade: 'Roofing', icon: '🏗️',
    checklist: [
      { item: 'Texas Roofing Reg (HB 2102)', how: 'Since 2019: must register with TDLR — verify online' },
      { item: 'No Storm-Chaser Contracts', how: 'Never sign anything at the door day after a storm' },
      { item: 'General Liability ($1M+)', how: 'Roofing has highest claim rate — verify COI carefully' },
      { item: 'Permit for Full Replacement', how: 'Full tear-off requires permit in most DFW cities' },
      { item: 'Manufacturer Warranty Transfer', how: 'Get cert number — ensures shingle warranty is valid' },
    ]
  },
];

const redFlags = [
  'Asks for >50% upfront payment',
  'Cannot provide license number on the spot',
  'Says no permit is needed for major work',
  'Cash only — no checks or cards',
  'No written contract or scope of work',
  'Appears day after storm, pressures same-day signature',
];

export default function DFWContractorVetting2026() {
  const [active, setActive] = useState(trades[0]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>PROLNK — DFW MARKET REPORT</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>DFW Contractor Vetting — 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>
          Texas contractor fraud costs homeowners <span style={{ color: '#f87171', fontWeight: 700 }}>$1.4B/year</span>. Know exactly what to verify before any work begins.
        </p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {trades.map(t => (
            <button key={t.trade} onClick={() => setActive(t)}
              style={{ background: active.trade === t.trade ? '#F5E642' : '#111c35', color: active.trade === t.trade ? '#0A1628' : '#fff', border: `1px solid ${active.trade === t.trade ? '#F5E642' : '#1e3a5f'}`, borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>
              {t.icon} {t.trade}
            </button>
          ))}
        </div>

        <div style={{ background: '#111c35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 14 }}>{active.icon} {active.trade} Vetting Checklist</div>
          {active.checklist.map((c, i) => (
            <div key={i} style={{ background: '#0d1f3a', borderRadius: 8, padding: 14, marginBottom: 10 }}>
              <div style={{ fontWeight: 700, marginBottom: 4, color: '#F5E642' }}>✓ {c.item}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{c.how}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#2d0a0a', border: '1px solid #f87171', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 10, color: '#f87171' }}>🚨 Universal Red Flags — Walk Away</div>
          {redFlags.map((f, i) => (
            <div key={i} style={{ color: '#fca5a5', fontSize: 14, marginBottom: 6, paddingLeft: 12, borderLeft: '3px solid #f87171' }}>{f}</div>
          ))}
        </div>

        <div style={{ background: '#0f2444', border: '1px solid #F5E642', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>✅ ProLnk Pre-Vets Every Contractor</div>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>ProLnk verifies TDLR license, insurance, BBB standing, and permit history before any contractor appears on the platform — skip the checklist and hire with confidence.</p>
        </div>
      </div>
    </div>
  );
}