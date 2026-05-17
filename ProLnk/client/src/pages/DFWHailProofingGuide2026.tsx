import { useState } from 'react';

const budgets = ['Under $1,000', '$1,000–$5,000', '$5,000–$15,000', '$15,000+'];
const protections = ['None', 'Basic', 'Moderate', 'Fully Protected'];

const checklist: Record<string, string[]> = {
  'Under $1,000-None': ['📸 Document exterior now — photos for insurance baseline', '🪟 Install solar screens (survive hail better than bare glass)', '❄️ Add hail guard mesh over AC condenser ($200-400)', '🔍 Inspect roof for existing damage before storm season', '📋 File insurance claim process — know your deductible'],
  'Under $1,000-Basic': ['📸 Update exterior documentation annually', '❄️ Verify AC hail guard is secured', '🪟 Inspect solar screens for tears or loose frames', '📋 Review insurance deductible — DFW avg $2,500 hail deductible'],
  '$1,000–$5,000-None': ['🏠 Upgrade to Class 4 impact-resistant roof — 20-30% insurance discount', '🪟 Install solar screens on all exposed windows', '❄️ Hail guard for AC condenser ($200-400)', '📸 Full exterior photo documentation', '🔍 Professional roof inspection before storm season'],
  '$1,000–$5,000-Basic': ['🏠 Class 4 roof upgrade still qualifies for insurance discount', '🪟 Add solar screens to remaining unprotected windows', '❄️ Upgrade AC hail guard if older than 5 years'],
  '$5,000–$15,000-None': ['🏠 PRIORITY: Class 4 impact-resistant roof replacement', '🪟 Impact-resistant windows for hail alley homes', '❄️ Full AC condenser hail cage enclosure', '📸 360° drone documentation for insurance', '🔍 Structural engineer inspection if previous hail damage'],
  '$5,000–$15,000-Basic': ['🏠 Complete Class 4 roof upgrade — pays back in 3-5 years', '🪟 Prioritize impact windows on south and west faces', '❄️ Upgrade to full condenser enclosure'],
  '$5,000–$15,000-Moderate': ['🪟 Finish impact window coverage on remaining faces', '📸 Annual exterior documentation update', '🔍 Post-storm professional inspection protocol'],
  '$15,000+-None': ['🏠 Full Class 4 roof replacement — do this first', '🪟 Complete impact-resistant window package', '❄️ Full AC condenser enclosure system', '🔍 Annual structural inspection', '📋 Umbrella insurance policy review'],
  '$15,000+-Fully Protected': ['✅ Annual post-season inspection to verify coverage', '📸 Drone documentation every spring', '📋 Review insurance annually — ensure Class 4 discount applied'],
};

const defaultItems = ['📸 Document home exterior before storm season', '❄️ Hail guard for AC condenser ($200-400)', '🪟 Solar screens survive hail better than bare glass', '🏠 Class 4 roof = 20-30% insurance discount', '🔍 Professional roof inspection before May'];

export default function DFWHailProofingGuide2026() {
  const [budget, setBudget] = useState('');
  const [protection, setProtection] = useState('');

  const key = `${budget}-${protection}`;
  const items = checklist[key] || (budget && protection ? defaultItems : []);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>⛈️ PROLNK DFW GUIDES 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Hail-Proofing Complete Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW sits in Hail Alley — make your home resilient before spring storm season.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[{label:'💰 Protection Budget', val: budget, set: setBudget, opts: budgets},{label:'🛡️ Current Protection', val: protection, set: setProtection, opts: protections}].map(({label, val, set, opts}) => (
            <div key={label}>
              <div style={{ color: '#F5E642', fontSize: 12, marginBottom: 6 }}>{label}</div>
              <select value={val} onChange={e => set(e.target.value)} style={{ width: '100%', background: '#1e3a5f', border: '1px solid #2d4a6e', color: '#fff', padding: '10px', borderRadius: 6, fontSize: 14 }}>
                <option value="">Select...</option>
                {opts.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div style={{ background: '#132035', borderRadius: 10, padding: 24, marginBottom: 32 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>Your Hail-Proofing Guide</div>
            {items.map((item, i) => (
              <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid #1e3a5f', fontSize: 15 }}>{item}</div>
            ))}
          </div>
        )}

        <div style={{ background: '#132035', borderRadius: 10, padding: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>⛈️ DFW Hail Key Facts</div>
          {['DFW averages 5-7 significant hail events per year — storm season peaks April-June','Class 4 impact-resistant roof earns 20-30% insurance premium discount','AC condenser hail guards cost $200-400 and prevent $3,000-8,000 replacements','Solar screens are 3x more hail-tolerant than bare window glass','Document your exterior in February — before storm season opens'].map((f,i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}><span style={{ color: '#F5E642' }}>▸</span><span style={{ color: '#cbd5e1', fontSize: 14 }}>{f}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}
