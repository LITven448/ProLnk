import { useState } from 'react';

const features = ['Has HVAC system', 'Has irrigation system', 'Has wood deck or fence', 'Has trees/large landscaping', 'Has foundation slab', 'Receives property tax bill', 'Has allergy sufferers'];

const priorities: Record<string, { q1Task: string; timing: string; why: string; urgency: string }[]> = {
  'Has HVAC system': [
    { q1Task: 'Schedule spring HVAC tune-up', timing: 'March (before April rush)', urgency: 'HIGH', why: 'Techs book up fast in April. March tune-ups get priority scheduling and off-season pricing.' },
  ],
  'Has irrigation system': [
    { q1Task: 'Inspect and adjust irrigation heads', timing: 'February–March', urgency: 'MEDIUM', why: 'Winter inactivity causes heads to shift. Calibrate before spring watering season begins.' },
  ],
  'Has wood deck or fence': [
    { q1Task: 'Pressure wash + seal deck/fence', timing: 'January–February', urgency: 'HIGH', why: 'DFW Q1 is mild (50–70°F ideal for sealant curing). Summer heat ruins fresh sealant application.' },
  ],
  'Has trees/large landscaping': [
    { q1Task: 'Tree trimming and dead branch removal', timing: 'January–February', urgency: 'HIGH', why: 'Before oak wilt pruning ban (Feb 1 – June 30 for oaks). Storm season runs April+.' },
  ],
  'Has foundation slab': [
    { q1Task: 'Foundation inspection after winter', timing: 'January–February', urgency: 'HIGH', why: 'DFW clay soils shift after freeze-thaw cycles. Q1 is best window before summer drought stress.' },
  ],
  'Receives property tax bill': [
    { q1Task: 'Review appraisal notice + file protest', timing: 'Notices arrive Feb–April; deadline May 15', urgency: 'CRITICAL', why: 'DFW property values rose 8–12% in many areas. Protests routinely save $800–2,400/year.' },
  ],
  'Has allergy sufferers': [
    { q1Task: 'Replace HVAC filters (MERV 11+) + install air purifiers', timing: 'Late January before cedar/elm season', urgency: 'HIGH', why: 'Mountain cedar peaks Jan–Feb; elm follows March. DFW is one of the worst allergy markets in the US.' },
  ],
};

const urgencyColor: Record<string, string> = { CRITICAL: '#ef4444', HIGH: '#f97316', MEDIUM: '#F5E642', LOW: '#4ade80' };

export default function DFWFirstQuarterHomeGuide() {
  const [selected, setSelected] = useState<string[]>([]);
  const [shown, setShown] = useState(false);

  function toggle(f: string) {
    setSelected(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
    setShown(false);
  }

  const results = selected.flatMap(f => (priorities[f] || []).map(p => ({ ...p, feature: f })));

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌤️ Q1 DFW Homeowner Guide — Jan–Mar 2026</div>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          January through March is DFW's golden window — mild temps (45–72°F), low humidity, and long days make it ideal for exterior work, inspections,
          and project planning before the brutal summer season begins.
        </p>

        <div style={{ background: '#132140', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>🏡 Tell us about your home</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
            {features.map(f => (
              <label key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.5rem', borderRadius: 6, background: selected.includes(f) ? '#1e3a5f' : '#0A1628', border: `1px solid ${selected.includes(f) ? '#F5E642' : '#1e3a5f'}` }}>
                <input type="checkbox" checked={selected.includes(f)} onChange={() => toggle(f)} style={{ accentColor: '#F5E642' }} />
                <span style={{ fontSize: '0.9rem' }}>{f}</span>
              </label>
            ))}
          </div>
          <button onClick={() => setShown(true)} disabled={selected.length === 0}
            style={{ background: selected.length > 0 ? '#F5E642' : '#1e3a5f', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: selected.length > 0 ? 'pointer' : 'default' }}>
            Build My Q1 Priority List
          </button>
        </div>

        {shown && results.length > 0 && (
          <div style={{ background: '#132140', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>📋 Your Q1 Priority List</div>
            {results.sort((a, b) => ['CRITICAL','HIGH','MEDIUM','LOW'].indexOf(a.urgency) - ['CRITICAL','HIGH','MEDIUM','LOW'].indexOf(b.urgency))
              .map((r, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                  <div style={{ fontWeight: 700 }}>{r.q1Task}</div>
                  <span style={{ color: urgencyColor[r.urgency], fontSize: '0.8rem', fontWeight: 700, border: `1px solid ${urgencyColor[r.urgency]}`, borderRadius: 4, padding: '0.1rem 0.4rem' }}>{r.urgency}</span>
                </div>
                <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.3rem' }}>⏰ {r.timing}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{r.why}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#132140', borderRadius: 12, padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>📅 DFW Q1 Key Dates</div>
          {[
            ['Jan 1–31', 'Mountain cedar season peaks — worst allergy month in DFW'],
            ['Feb 1', 'Oak wilt pruning ban begins — do NOT prune oaks after this date'],
            ['Feb–Mar', 'Property appraisal notices begin arriving from DCAD/TAD'],
            ['Mar 1', 'Begin scheduling HVAC tune-ups before April demand surge'],
            ['Mar 15', 'Last good window for exterior painting before spring humidity rises'],
            ['May 15', 'Property tax protest DEADLINE — do not miss this'],
          ].map(([date, desc]) => (
            <div key={date} style={{ display: 'flex', gap: '1rem', padding: '0.6rem 0', borderBottom: '1px solid #1e3a5f' }}>
              <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 90, fontSize: '0.9rem' }}>{date}</span>
              <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
