import { useState } from 'react';

type Item = { id: string; label: string; category: string; triggers: string[] };

const allItems: Item[] = [
  { id: 's1', label: 'Test all smoke detectors and replace batteries', category: 'Safety', triggers: ['all'] },
  { id: 's2', label: 'Test all carbon monoxide detectors', category: 'Safety', triggers: ['all'] },
  { id: 's3', label: 'Verify fire extinguisher is charged and accessible', category: 'Safety', triggers: ['all'] },
  { id: 's4', label: 'Check GFCI outlets in kitchen, baths, garage, and outdoor', category: 'Safety', triggers: ['all'] },
  { id: 's5', label: 'Confirm all AFCI breakers are functioning in bedroom circuits', category: 'Safety', triggers: ['all'] },
  { id: 's6', label: 'Inspect staircase handrails for stability', category: 'Safety', triggers: ['all'] },
  { id: 's7', label: 'Verify pool fence gate self-closes and self-latches', category: 'Safety', triggers: ['pool'] },
  { id: 's8', label: 'Test garage door auto-reverse sensor', category: 'Safety', triggers: ['garage'] },
  { id: 'sys1', label: 'Replace HVAC air filter (MERV 11–13 recommended for DFW)', category: 'Systems', triggers: ['all'] },
  { id: 'sys2', label: 'Schedule annual HVAC tune-up before DFW summer', category: 'Systems', triggers: ['all'] },
  { id: 'sys3', label: 'Verify refrigerant charge has been checked in last 2 years', category: 'Systems', triggers: ['all'] },
  { id: 'sys4', label: 'Test water heater pressure relief valve', category: 'Systems', triggers: ['all'] },
  { id: 'sys5', label: 'Flush water heater to remove sediment (DFW hard water)', category: 'Systems', triggers: ['all'] },
  { id: 'sys6', label: 'Inspect P-traps in infrequently used sinks/tubs', category: 'Systems', triggers: ['all'] },
  { id: 'sys7', label: 'Check water pressure (should be 40–80 PSI for DFW)', category: 'Systems', triggers: ['all'] },
  { id: 'sys8', label: 'Inspect sump pump and test with water pour', category: 'Systems', triggers: ['basement'] },
  { id: 'sys9', label: 'Clean dryer vent duct (DFW fire risk, do annually)', category: 'Systems', triggers: ['all'] },
  { id: 'sys10', label: 'Inspect irrigation system for DFW clay soil movement damage', category: 'Systems', triggers: ['irrigation'] },
  { id: 'l1', label: 'Confirm homestead exemption is filed with county appraisal district', category: 'Legal', triggers: ['all'] },
  { id: 'l2', label: 'Review HOA CC&Rs before any exterior project', category: 'Legal', triggers: ['hoa'] },
  { id: 'l3', label: 'Verify current property survey is on file', category: 'Legal', triggers: ['all'] },
  { id: 'l4', label: 'Check deed for any restrictions before planned additions', category: 'Legal', triggers: ['all'] },
  { id: 'l5', label: 'Confirm title insurance policy is filed and accessible', category: 'Legal', triggers: ['all'] },
  { id: 'l6', label: 'Review easements on property before any fence or structure install', category: 'Legal', triggers: ['all'] },
  { id: 'f1', label: 'Compare city appraisal district value to market; protest if over by 10%+', category: 'Financial', triggers: ['all'] },
  { id: 'f2', label: 'Verify homestead exemption reflects on current tax bill', category: 'Financial', triggers: ['all'] },
  { id: 'f3', label: 'Review home insurance policy for replacement cost vs ACV coverage', category: 'Financial', triggers: ['all'] },
  { id: 'f4', label: 'Verify insurance covers DFW hail (most do; confirm deductible)', category: 'Financial', triggers: ['all'] },
  { id: 'f5', label: 'Document all home improvements for appraisal and insurance purposes', category: 'Financial', triggers: ['all'] },
  { id: 'f6', label: 'Review HOA budget and reserve fund health', category: 'Financial', triggers: ['hoa'] },
  { id: 'm1', label: 'Inspect roof for hail damage after each DFW storm season', category: 'Maintenance', triggers: ['all'] },
  { id: 'm2', label: 'Clean gutters twice per year (spring and fall in DFW)', category: 'Maintenance', triggers: ['all'] },
  { id: 'm3', label: 'Water foundation perimeter during extended DFW droughts', category: 'Maintenance', triggers: ['slab'] },
  { id: 'm4', label: 'Inspect brick mortar for tuckpointing needs every 5–7 years', category: 'Maintenance', triggers: ['brick'] },
  { id: 'm5', label: 'Check attic insulation level (R-38 required by Texas code)', category: 'Maintenance', triggers: ['all'] },
  { id: 'm6', label: 'Inspect for efflorescence on foundation walls or brick', category: 'Maintenance', triggers: ['all'] },
  { id: 'm7', label: 'Check fascia and soffit for rot or wasp nests', category: 'Maintenance', triggers: ['all'] },
  { id: 'm8', label: 'Inspect caulking around tubs, showers, and windows', category: 'Maintenance', triggers: ['all'] },
  { id: 'm9', label: 'Trim trees to maintain 6-foot clearance from roof and structure', category: 'Maintenance', triggers: ['all'] },
  { id: 'm10', label: 'Test all GFCIs and AFCIs monthly (press test button)', category: 'Maintenance', triggers: ['all'] },
  { id: 'sr1', label: 'Order a pre-listing home inspection', category: 'Sale Readiness', triggers: ['selling'] },
  { id: 'sr2', label: 'Obtain a hydrostatic plumbing test report', category: 'Sale Readiness', triggers: ['selling', 'slab'] },
  { id: 'sr3', label: 'Complete foundation inspection and document results', category: 'Sale Readiness', triggers: ['selling'] },
  { id: 'sr4', label: 'Gather all permits pulled for improvements', category: 'Sale Readiness', triggers: ['selling'] },
  { id: 'sr5', label: 'Prepare HOA transfer documents and account statement', category: 'Sale Readiness', triggers: ['selling', 'hoa'] },
  { id: 'sr6', label: 'Get roof certification or replacement documentation', category: 'Sale Readiness', triggers: ['selling'] },
];

const categories = ['Safety', 'Systems', 'Legal', 'Financial', 'Maintenance', 'Sale Readiness'];
const categoryEmojis: Record<string, string> = { Safety: '🛡️', Systems: '⚙️', Legal: '📜', Financial: '💰', Maintenance: '🔨', 'Sale Readiness': '🏷️' };

type Feature = 'pool' | 'garage' | 'hoa' | 'irrigation' | 'slab' | 'brick' | 'selling' | 'basement';
const featureOptions: { id: Feature; label: string }[] = [
  { id: 'pool', label: 'Pool' }, { id: 'garage', label: 'Garage' }, { id: 'hoa', label: 'HOA Community' },
  { id: 'irrigation', label: 'Irrigation System' }, { id: 'slab', label: 'Slab Foundation' },
  { id: 'brick', label: 'Brick Exterior' }, { id: 'selling', label: 'Planning to Sell' }, { id: 'basement', label: 'Basement' },
];

export default function DFWFinalChecklist2026() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState('Safety');

  const toggleFeature = (f: Feature) => setFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);

  const relevantItems = allItems.filter(item =>
    item.triggers.includes('all') || item.triggers.some(t => features.includes(t as Feature))
  );

  const toggleComplete = (id: string) => {
    const s = new Set(completed);
    s.has(id) ? s.delete(id) : s.add(id);
    setCompleted(s);
  };

  const pct = relevantItems.length > 0 ? Math.round((completed.size / relevantItems.length) * 100) : 0;
  const catItems = relevantItems.filter(i => i.category === activeCategory);
  const catCompleted = catItems.filter(i => completed.has(i.id)).length;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>✅</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>2026 DFW Master Checklist</h1>
          <p style={{ color: '#94A3B8', margin: 0 }}>The ultimate DFW homeowner checklist — personalized for your home</p>
        </div>

        {!started ? (
          <div style={{ background: '#0D2137', borderRadius: 16, padding: 28 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#CBD5E1', marginBottom: 16 }}>Select features that apply to your home:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
              {featureOptions.map(f => (
                <button key={f.id} onClick={() => toggleFeature(f.id)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14, background: features.includes(f.id) ? '#F5E642' : '#1E3A5F', color: features.includes(f.id) ? '#0A1628' : '#fff' }}>{f.label}</button>
              ))}
            </div>
            <button onClick={() => setStarted(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 28px', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
              Build My Checklist ({allItems.filter(item => item.triggers.includes('all') || item.triggers.some(t => features.includes(t as Feature))).length} items) →
            </button>
          </div>
        ) : (
          <>
            <div style={{ background: '#0D2137', borderRadius: 12, padding: 20, marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontWeight: 700, color: '#CBD5E1' }}>Overall Completion</span>
                <span style={{ fontWeight: 900, fontSize: 20, color: '#F5E642' }}>{pct}%</span>
              </div>
              <div style={{ background: '#1E3A5F', borderRadius: 8, height: 12 }}>
                <div style={{ background: '#F5E642', borderRadius: 8, height: 12, width: `${pct}%`, transition: 'width 0.4s' }} />
              </div>
              <div style={{ color: '#64748B', fontSize: 13, marginTop: 8 }}>{completed.size} of {relevantItems.length} items complete</div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              {categories.map(cat => {
                const ci = relevantItems.filter(i => i.category === cat);
                if (ci.length === 0) return null;
                const cc = ci.filter(i => completed.has(i.id)).length;
                return (
                  <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: '7px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, background: activeCategory === cat ? '#F5E642' : '#1E3A5F', color: activeCategory === cat ? '#0A1628' : '#fff' }}>
                    {categoryEmojis[cat]} {cat} ({cc}/{ci.length})
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {catItems.map(item => (
                <div key={item.id} onClick={() => toggleComplete(item.id)} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: '#0D2137', borderRadius: 10, padding: '14px 16px', cursor: 'pointer', border: `1px solid ${completed.has(item.id) ? '#10B981' : '#1E3A5F'}`, opacity: completed.has(item.id) ? 0.75 : 1 }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{completed.has(item.id) ? '✅' : '⬜'}</span>
                  <span style={{ fontSize: 14, color: '#CBD5E1', lineHeight: 1.5, textDecoration: completed.has(item.id) ? 'line-through' : 'none' }}>{item.label}</span>
                </div>
              ))}
              {catItems.length === 0 && <div style={{ color: '#64748B', textAlign: 'center', padding: 32 }}>No items in this category for your home features.</div>}
            </div>

            <div style={{ marginTop: 20, textAlign: 'center' }}>
              <button onClick={() => { setStarted(false); setCompleted(new Set()); }} style={{ background: 'transparent', border: '1px solid #1E3A5F', color: '#94A3B8', borderRadius: 8, padding: '8px 18px', cursor: 'pointer', fontSize: 13 }}>← Reconfigure</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
