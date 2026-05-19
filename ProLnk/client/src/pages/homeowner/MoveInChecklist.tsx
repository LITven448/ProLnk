import { useState } from 'react';

interface ChecklistItem {
  id: string;
  label: string;
  note: string;
}

const priority1Items: ChecklistItem[] = [
  { id: 'locks', label: 'Change ALL locks and garage codes', note: 'Security — previous owners may have copies' },
  { id: 'homestead', label: 'File homestead exemption', note: 'Before April 30 deadline — saves $700-1,200/yr on taxes' },
  { id: 'address', label: 'Change address everywhere', note: 'USPS, bank, DMV, IRS, insurance, employer' },
  { id: 'utilities', label: 'Get utility accounts in your name', note: 'Oncor, Atmos, Dallas Water — do not assume transfer' },
  { id: 'smoke', label: 'Test all smoke/CO detectors + replace batteries', note: 'Texas law requires working detectors in every bedroom' },
  { id: 'shutoffs', label: 'Locate water main, gas shutoff, electrical panel', note: 'Know before an emergency — take photos of each location' },
];

const priority2Items: ChecklistItem[] = [
  { id: 'hvac', label: 'Schedule HVAC inspection', note: '$89-150 — DFW summers will expose any weakness immediately' },
  { id: 'neighbors', label: 'Meet your neighbors', note: 'They know flood zones, HOA quirks, best local contractors' },
  { id: 'medical', label: 'Find nearest urgent care, hospital, vet', note: 'Save in your phone before you need it' },
  { id: 'dmv', label: 'Register vehicles in new county if changed', note: '30-day deadline from move date in Texas' },
  { id: 'internet', label: 'Set up internet and security system', note: 'AT&T Fiber or Spectrum in most DFW areas — 2-week lead time' },
];

const priority3Items: ChecklistItem[] = [
  { id: 'clean', label: 'Deep clean before furniture arrives', note: 'Far easier before everything is moved in' },
  { id: 'vault', label: 'Add your home to TrustyPro Home Health Vault', note: 'Captures system info, warranty docs, and maintenance history permanently' },
  { id: 'pest', label: 'Schedule pest control treatment', note: 'DFW: scorpions, termites, and fire ants are all active year-round' },
  { id: 'document', label: 'Document all home systems', note: 'Photo + serial numbers for HVAC, water heater, appliances' },
  { id: 'savings', label: 'Open home maintenance savings account', note: '$200/mo — 1% of home value per year is the industry standard' },
];

function ProgressRing({ completed, total }: { completed: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
  const radius = 36;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (pct / 100) * circ;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <svg width="88″ height="88" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="44″ cy="44" r={radius} fill="none" stroke="#1E3A5F" strokeWidth="8" />
        <circle
          cx="44″ cy="44" r={radius} fill="none"
          stroke={pct === 100 ? '#22C55E' : '#3B82F6'}
          strokeWidth="8″
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.4s ease' }}
        />
      </svg>
      <div>
        <div style={{ fontSize: '32px', fontWeight: '700', color: pct === 100 ? '#22C55E' : '#F1F5F9′ }}>{pct}%</div>
        <div style={{ fontSize: '13px', color: '#94A3B8′ }}>{completed} of {total} done</div>
      </div>
    </div>
  );
}

export default function MoveInChecklist() {
  const allIds = [...priority1Items, ...priority2Items, ...priority3Items].map(i => i.id);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  const completed = Object.values(checked).filter(Boolean).length;

  function Section({ title, emoji, items, color }: { title: string; emoji: string; items: ChecklistItem[]; color: string }) {
    const sectionDone = items.filter(i => checked[i.id]).length;
    return (
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <span style={{ fontSize: '22px' }}>{emoji}</span>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color }}>{title}</h2>
          <span style={{
            marginLeft: 'auto',
            fontSize: '12px',
            background: sectionDone === items.length ? '#166534′ : '#1E3A5F',
            color: sectionDone === items.length ? '#86EFAC' : '#93C5FD',
            padding: '2px 10px',
            borderRadius: '12px',
          }}>{sectionDone}/{items.length}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {items.map(item => (
            <div
              key={item.id}
              onClick={() => toggle(item.id)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                padding: '14px 16px',
                background: checked[item.id] ? '#0F2918′ : '#0F1E38',
                borderRadius: '10px',
                border: `1px solid ${checked[item.id] ? '#166534' : '#1E3A5F'}`,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div style={{
                width: '22px',
                height: '22px',
                borderRadius: '6px',
                border: `2px solid ${checked[item.id] ? '#22C55E' : '#3B82F6'}`,
                background: checked[item.id] ? '#22C55E' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '1px',
                fontSize: '13px',
              }}>
                {checked[item.id] ? '✓' : ''}
              </div>
              <div>
                <div style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: checked[item.id] ? '#6EE7B7′ : '#F1F5F9',
                  textDecoration: checked[item.id] ? 'line-through' : 'none',
                  marginBottom: '3px',
                }}>{item.label}</div>
                <div style={{ fontSize: '13px', color: '#64748B' }}>{item.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#F1F5F9', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '13px', color: '#3B82F6', fontWeight: '600', letterSpacing: '0.08em', marginBottom: '8px' }}>
            DFW HOMEOWNER RESOURCE
          </div>
          <h1 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: '800', lineHeight: 1.2 }}>
            New Home Move-In Checklist
          </h1>
          <p style={{ margin: '0 0 24px', color: '#94A3B8', fontSize: '15px' }}>
            Everything in the First 30 Days — prioritized for DFW buyers
          </p>
          <ProgressRing completed={completed} total={allIds.length} />
        </div>

        <Section title="Priority 1 — Do Immediately" emoji="🚨" items={priority1Items} color="#F87171″ />
        <Section title="Priority 2 — First Week" emoji="📅" items={priority2Items} color="#FBBF24″ />
        <Section title="Priority 3 — First Month" emoji="🏡" items={priority3Items} color="#34D399″ />

        <div style={{
          background: '#0F2035',
          border: '1px solid #1E4080',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '32px',
        }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#FBBF24', marginBottom: '10px' }}>
            🌵 DFW-Specific: Foundation Watering
          </div>
          <div style={{ fontSize: '14px', color: '#CBD5E1', lineHeight: 1.7 }}>
            If you moved to DFW, start a foundation watering schedule <strong style={{ color: '#F1F5F9′ }}>immediately</strong>.
            North Texas clay soil shrinks and swells dramatically with moisture changes.
            A soaker hose on a timer ($80) keeps the perimeter consistently moist and can prevent
            foundation repairs that average <strong style={{ color: '#F87171′ }}>$8,000-22,000</strong>.
          </div>
        </div>

        {completed === allIds.length && (
          <div style={{
            background: '#0F2918',
            border: '1px solid #166534',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎉</div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#22C55E', marginBottom: '4px' }}>
              Move-In Complete!
            </div>
            <div style={{ fontSize: '14px', color: '#86EFAC' }}>
              You're set up for success. Welcome to DFW.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
