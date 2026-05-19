import { useState } from 'react';

const sellerProfiles = [
  { id: 'new-good', label: '🏗️ New + Good Condition' },
  { id: 'mid-average', label: '🏠 Mid + Average' },
  { id: 'older-worn', label: '🏚️ Older + Worn' },
  { id: 'estate', label: '🏛️ Estate Sale' },
];

const priorities: Record<string, string[]> = {
  'new-good': [
    'Professional photos — most critical single investment ($300-600)',
    'Deep clean including windows and pressure washing',
    'Declutter aggressively — buyers cannot see space through your stuff',
    'Stage main living areas even if home is occupied',
    'Home Health Vault report adds credibility with buyers',
  ],
  'mid-average': [
    'HVAC service ($150) — buyers love it, inspectors note its absence',
    'Fresh neutral paint on main floor ($1,500-2,500 = $5-8K+ return)',
    'Foundation documentation if any history of repair',
    'Landscaping refresh: mulch, trim, flowers at entry ($200-400)',
    'Professional photos after prep is complete',
  ],
  'older-worn': [
    'Foundation engineer letter if any visible cracks',
    'HVAC replacement if 15+ years — credit vs replace is negotiable',
    'Kitchen and bath updates have best ROI: hardware, faucets, lighting',
    'Paint entire interior neutral — covers years of wear',
    'Pre-listing inspection to find issues before buyers do',
  ],
  estate: [
    'Estate sale company for contents before listing photos',
    'Deep clean and deodorize — occupied smell is a deal killer',
    'Disclose all known issues in writing upfront',
    'Price aggressively — estate buyers expect value',
    'Home Health Vault report documents property history for buyers',
  ],
};

export default function DFWHomeSellingChecklist2026() {
  const [selected, setSelected] = useState<string>('');

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK DFW GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>📋 DFW Home Selling Checklist 2026</h1>
        <p style={{ color: '#aaa', marginBottom: 32 }}>Complete pre-listing preparation for DFW sellers — prioritized by impact and return on investment.</p>

        <div style={{ background: '#0d1e36', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>💰 Highest-ROI Pre-Listing Investments</h2>
          {[
            ['HVAC Service ($150)', 'Buyers and inspectors note its absence — cheap peace of mind'],
            ['Fresh Paint ($2,500)', '$8,000+ return on average in DFW market'],
            ['Deep Clean ($300-600)', 'First impression is everything — smell matters too'],
            ['Landscaping ($200-400)', 'Curb appeal drives whether buyers even get out of the car'],
            ['Professional Photos ($300-600)', 'Most critical single listing investment — period'],
          ].map(([item, desc]) => (
            <div key={item} style={{ padding: '10px 0', borderBottom: '1px solid #1a2d4a' }}>
              <div style={{ color: '#F5E642', fontSize: 13 }}>✓ {item}</div>
              <div style={{ color: '#aaa', fontSize: 13, marginTop: 2 }}>→ {desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0d1e36', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📄 Documentation Buyers Want</h2>
          {[
            'Foundation repair history — if done, this is good news, not bad',
            'HVAC service records — dated receipts from ProLnk pros',
            'Roof repair or replacement documentation',
            'Home Health Vault report — comprehensive property health history',
            'HOA financials and meeting minutes if applicable',
          ].map(t => (
            <div key={t} style={{ padding: '8px 0', borderBottom: '1px solid #1a2d4a', color: '#ccc', fontSize: 14 }}>📄 {t}</div>
          ))}
        </div>

        <div style={{ background: '#1a0a0a', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #5a1a1a' }}>
          <h2 style={{ color: '#ff6b6b', fontSize: 16, marginBottom: 16 }}>🚨 DFW Seller Red Flags to Fix First</h2>
          {[
            'Deferred HVAC maintenance — $150 service vs $500 buyer credit demand',
            'Foundation visible issues — disclose and document, do not hide',
            'Water stains on ceilings — fix the source, repaint, disclose',
            'Outdated electrical panel — $2,000 fix vs deals falling apart',
            'Plumbing slow drains — $200 fix vs inspection report horror',
          ].map(t => (
            <div key={t} style={{ padding: '8px 0', borderBottom: '1px solid #3a1a1a', color: '#ffaaaa', fontSize: 14 }}>⚠️ {t}</div>
          ))}
        </div>

        <div style={{ background: '#0d1e36', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏠 Home Age + Condition → Seller Prep Priority List</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {sellerProfiles.map(p => (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                style={{ padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, background: selected === p.id ? '#F5E642' : '#1a2d4a', color: selected === p.id ? '#0A1628' : '#ccc', fontWeight: selected === p.id ? 700 : 400 }}
              >
                {p.label}
              </button>
            ))}
          </div>
          {selected && priorities[selected].map(item => (
            <div key={item} style={{ color: '#ccc', fontSize: 13, padding: '6px 0', borderBottom: '1px solid #1a2d4a' }}>→ {item}</div>
          ))}
        </div>

        <div style={{ textAlign: 'center', color: '#F5E642', fontSize: 13 }}>🔗 ProLnk — DFW Home Services Network | prolnk.io</div>
      </div>
    </div>
  );
}
