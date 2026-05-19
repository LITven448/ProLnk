import { useState } from 'react';

const sections = [
  {
    title: 'Critical Documents — Must Have Immediately',
    icon: '🔴',
    items: [
      { id: 'deed', label: 'Deed', note: 'Proof of ownership — stored physically in fireproof safe + digital backup' },
      { id: 'title', label: 'Title Insurance Policy', note: 'Protects against ownership challenges — keep indefinitely' },
      { id: 'survey', label: 'Survey Plat', note: 'Defines property boundaries — essential for fence disputes and additions' },
      { id: 'insurance_dec', label: 'Homeowners Insurance Declarations', note: 'Current + last 3 years' },
      { id: 'mortgage_docs', label: 'Mortgage Documents', note: 'Note, deed of trust — if lost, get copy from county records' },
    ],
  },
  {
    title: 'Tax Documents — Keep 7 Years',
    icon: '🟡',
    items: [
      { id: 'tax_stmt', label: 'Annual Property Tax Statements', note: 'Keep at least 7 years' },
      { id: 'homestead', label: 'Homestead Exemption Filing Confirmation', note: 'DFW — save thousands annually, keep indefinitely' },
      { id: 'closing_docs', label: 'All Closing Documents', note: 'HUD-1 or closing disclosure — keep as long as you own the home' },
      { id: 'cap_improvements', label: 'Capital Improvement Receipts', note: 'Reduces capital gains when you sell — keep for life of ownership' },
    ],
  },
  {
    title: 'HOA Documents — If Applicable',
    icon: '🟠',
    items: [
      { id: 'ccr', label: "CC&Rs (Deed Restrictions)", note: 'The primary legal document governing your property' },
      { id: 'bylaws', label: 'HOA Bylaws', note: 'Governs the HOA organization itself' },
      { id: 'hoa_budget', label: 'Annual Budget', note: 'Reveals financial health — look for adequate reserves' },
      { id: 'meeting_mins', label: 'Meeting Minutes (Last 2 Years)', note: 'Reveals ongoing disputes, planned assessments, litigation' },
    ],
  },
  {
    title: 'Contractor Records — Keep for Life of Home',
    icon: '🔵',
    items: [
      { id: 'permits', label: 'All Permitted Work', note: 'Include permit numbers + final inspection sign-off from city/county' },
      { id: 'warranties', label: 'Warranties', note: 'Both manufacturer and contractor — often 1–10 year coverage' },
      { id: 'invoices', label: 'Invoices for All Major Work', note: 'Establishes capital improvement basis for tax purposes' },
    ],
  },
];

const allItems = sections.flatMap(s => s.items);

export default function HomeownerLegalChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const total = allItems.length;
  const done = checked.size;
  const pct = Math.round((done / total) * 100);

  const missing = allItems.filter(i => !checked.has(i.id));
  const critical = sections[0].items.filter(i => !checked.has(i.id));

  let scoreColor = '#ef4444';
  if (pct >= 80) scoreColor = '#22c55e';
  else if (pct >= 50) scoreColor = '#f59e0b';

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '0 0 80px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '60px 24px 0′ }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ fontSize: 36, marginBottom: 16 }}>📁</div>
          <h1 style={{ fontSize: 'clamp(24px,4vw,38px)', fontWeight: 800, color: '#f1f5f9', margin: '0 0 16px', lineHeight: 1.15 }}>
            DFW Homeowner Legal Checklist
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 17, maxWidth: 580, margin: '0 auto' }}>
            Documents every DFW homeowner should have — and where to get them if you don't.
          </p>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 14, padding: '20px 24px', marginBottom: 36, display: 'flex', alignItems: 'center', gap: 24, border: '1px solid #334155′ }}>
          <div style={{ textAlign: 'center', minWidth: 80 }}>
            <div style={{ color: scoreColor, fontWeight: 800, fontSize: 36 }}>{pct}%</div>
            <div style={{ color: '#64748b', fontSize: 12, fontWeight: 700 }}>Complete</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ height: 8, background: '#0f172a', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: scoreColor, width: `${pct}%`, transition: 'width 0.3s', borderRadius: 4 }} />
            </div>
            <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 8 }}>
              {done} of {total} documents accounted for
              {critical.length > 0 && <span style={{ color: '#ef4444', fontWeight: 700 }}> — {critical.length} critical missing</span>}
            </div>
          </div>
        </div>

        {sections.map(s => (
          <div key={s.title} style={{ background: '#1e293b', borderRadius: 16, padding: 28, marginBottom: 24, border: '1px solid #334155′ }}>
            <h2 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 800, margin: '0 0 18px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>{s.icon}</span> {s.title}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {s.items.map(item => {
                const isChecked = checked.has(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: 14,
                      padding: '14px 16px', borderRadius: 10,
                      background: isChecked ? '#0f172a' : '#0f172a',
                      border: `1px solid ${isChecked ? '#22c55e' : '#1e293b'}`,
                      cursor: 'pointer', transition: 'border-color 0.2s',
                    }}
                  >
                    <div style={{
                      width: 22, height: 22, borderRadius: 6,
                      background: isChecked ? '#22c55e' : 'transparent',
                      border: `2px solid ${isChecked ? '#22c55e' : '#475569'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, marginTop: 1, fontSize: 13, color: '#fff',
                    }}>
                      {isChecked ? '✓' : ''}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: '#f1f5f9', marginBottom: 3 }}>{item.label}</div>
                      <div style={{ color: '#64748b', fontSize: 13 }}>{item.note}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {missing.length > 0 && (
          <div style={{ background: '#1e293b', borderRadius: 16, padding: 28, marginBottom: 40, border: '1px solid #334155′ }}>
            <h2 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 800, margin: '0 0 16px' }}>📋 Priority List — Documents to Obtain</h2>
            {[...sections].map(s => {
              const missingInSection = s.items.filter(i => !checked.has(i.id));
              if (missingInSection.length === 0) return null;
              return (
                <div key={s.title} style={{ marginBottom: 16 }}>
                  <div style={{ color: '#64748b', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>{s.icon} {s.title}</div>
                  {missingInSection.map(i => (
                    <div key={i.id} style={{ color: '#94a3b8', fontSize: 13, padding: '4px 0 4px 16px', borderLeft: '2px solid #334155', marginBottom: 4 }}>
                      {i.label}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        <div style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #0891b2 100%)', borderRadius: 20, padding: '40px 32px', textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>🔒</div>
          <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 800, margin: '0 0 10px' }}>Your TrustyPro Vault Stores It All</h2>
          <p style={{ color: '#bfdbfe', fontSize: 15, margin: '0 0 24px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            Digital copies of every document — linked to your property record, accessible anywhere, protected and organized for as long as you own your home.
          </p>
          <a
            href="/waitlist/homeowner"
            style={{
              display: 'inline-block', background: '#fff', color: '#1d4ed8',
              fontWeight: 800, fontSize: 16, padding: '13px 32px',
              borderRadius: 10, textDecoration: 'none',
            }}
          >
            Join TrustyPro Waitlist →
          </a>
        </div>
      </div>
    </div>
  );
}
