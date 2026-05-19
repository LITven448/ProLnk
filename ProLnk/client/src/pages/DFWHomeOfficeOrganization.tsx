import { useState } from 'react';

const DFW_DOC_CATEGORIES = [
  { cat: 'Property & Tax', docs: ['DCAD appraisal notices', 'Homestead exemption filings', 'Property tax protests & results', 'Deed and title documents'], icon: '🏡' },
  { cat: 'HOA Documents', docs: ['CC&Rs and bylaws', 'Annual meeting minutes', 'Violation notices', 'Architectural approval requests'], icon: '📋' },
  { cat: 'Contractor Records', docs: ['Permits pulled (keep forever)', 'Contractor warranties (12 pages avg)', 'Insurance certificates', 'Project photos with dates'], icon: '🔧' },
  { cat: 'Home Insurance', docs: ['Policy declarations', 'Claims history', 'Annual renewal comparisons', 'Flood zone documentation'], icon: '🛡️' },
  { cat: 'Utilities & Services', docs: ['Oncor rate plan history', 'Atmos Energy account', 'Water district contacts', 'Internet service contracts'], icon: '⚡' },
];

const SYSTEMS: Record<string, { name: string; items: string[]; cost: string; tip: string }> = {
  small: {
    name: 'Compact Corner Setup',
    items: ['Standing desk (48″) + monitor arm', 'Under-desk file cabinet (2 drawer)', 'Cable management tray', 'Desktop organizer tray x2', 'Wireless charging pad'],
    cost: '$600–$1,200',
    tip: 'Use vertical space — floating shelves add 40% more storage in small rooms.',
  },
  medium: {
    name: 'Dedicated Room System',
    items: ['L-desk (60″x60″) with drawers', 'Lateral 4-drawer file cabinet', 'Bookcase with doors for documents', 'Cable raceway along walls', 'Dual monitor setup'],
    cost: '$1,200–$2,800',
    tip: 'Dedicate one drawer per DFW document category. Label externally.',
  },
  large: {
    name: 'Executive Home Office',
    items: ['Executive desk + credenza combo', 'Built-in bookcase system', 'Hidden cable management in walls', 'Standing mat + ergonomic chair', 'Dedicated printer station'],
    cost: '$3,000–$8,000',
    tip: 'DFW executive home offices avg 200 sqft. Consider built-ins for resale value.',
  },
  remote: {
    name: 'Full Remote Work Setup',
    items: ['Sit-stand desk + memory presets', '4K webcam + ring light', 'Soundproofing panels (DFW storm noise)', 'UPS battery backup (DFW outages)', 'Dedicated work phone line'],
    cost: '$2,000–$5,000',
    tip: 'DFW averages 50+ storm days/year. UPS protects work during power blips.',
  },
};

const SIZES = ['Small (under 100 sqft)', 'Medium (100–200 sqft)', 'Large (200+ sqft)'];
const DOC_VOLUMES = ['Light (1–2 file boxes)', 'Medium (3–5 file boxes)', 'Heavy (5+ boxes or filing cabinet)'];
const WORK_STYLES = ['small', 'medium', 'large', 'remote'];
const STYLE_LABELS: Record<string, string> = { small: 'Occasional/side work', medium: 'Part-time remote', large: 'Full-time in-office job', remote: 'Full remote/freelance' };

export default function DFWHomeOfficeOrganization() {
  const [officeSize, setOfficeSize] = useState('');
  const [docVolume, setDocVolume] = useState('');
  const [workStyle, setWorkStyle] = useState('');
  const [result, setResult] = useState<null | typeof SYSTEMS[string]>(null);

  function calculate() {
    if (!officeSize || !docVolume || !workStyle) return;
    setResult(SYSTEMS[workStyle]);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', color: '#0A1628', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0A1628', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>💼</div>
        <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 700, margin: '16px 0 8px' }}>DFW Home Office Organization</h1>
        <p style={{ color: '#94a3b8', fontSize: 16 }}>Manage HOA docs, property taxes, contractor warranties & your workflow</p>
      </div>

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ background: '#fff3cd', border: '2px solid #F5E642', borderRadius: 12, padding: 20, marginBottom: 32 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>📍 DFW Homeowner Paper Load</div>
          <p style={{ color: '#475569', margin: 0, fontSize: 14 }}>Average DFW homeowner accumulates 12–18 pages of HOA docs per year, 8–10 contractor documents per project, and 4–6 DCAD/tax notices annually. A system pays dividends at tax time and during disputes.</p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Essential DFW Document Categories</h2>
        <div style={{ display: 'grid', gap: 14, marginBottom: 40 }}>
          {DFW_DOC_CATEGORIES.map(c => (
            <div key={c.cat} style={{ background: '#fff', borderRadius: 12, padding: 18, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 24 }}>{c.icon}</span>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{c.cat}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {c.docs.map(d => <span key={d} style={{ background: '#F1F5F9', borderRadius: 20, padding: '3px 12px', fontSize: 12, color: '#475569′ }}>{d}</span>)}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>🎯 Design My Home Office</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
            {[['Office Room Size', SIZES, officeSize, setOfficeSize], ['Document Volume', DOC_VOLUMES, docVolume, setDocVolume]].map(([label, opts, val, set]) => (
              <div key={label as string}>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>{label as string}</label>
                <select value={val as string} onChange={e => (set as Function)(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 15, background: '#F9FAFB' }}>
                  <option value="">Select...</option>
                  {(opts as string[]).map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <div>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>Work Style</label>
              <select value={workStyle} onChange={e => setWorkStyle(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 15, background: '#F9FAFB' }}>
                <option value="">Select...</option>
                {WORK_STYLES.map(s => <option key={s} value={s}>{STYLE_LABELS[s]}</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, cursor: 'pointer', width: '100%' }}>Get My Office System</button>

          {result && (
            <div style={{ marginTop: 24, padding: 20, background: '#F9FAFB', borderRadius: 10 }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{result.name}</div>
              <div style={{ color: '#16a34a', fontWeight: 600, marginBottom: 14 }}>{result.cost}</div>
              {result.items.map(i => <div key={i} style={{ padding: '5px 0', color: '#475569′ }}>✓ {i}</div>)}
              <div style={{ marginTop: 16, padding: 14, background: '#F5E642', borderRadius: 8, fontSize: 14, color: '#0A1628', fontWeight: 600 }}>💡 {result.tip}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
