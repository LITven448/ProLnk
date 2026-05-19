import { useState } from 'react';

const features = [
  { value: 'pool', label: '🏊 Swimming Pool' },
  { value: 'trampoline', label: '🤸 Trampoline' },
  { value: 'dog', label: '🐕 Dog(s) on Property' },
  { value: 'rental', label: '🏠 Short-term Rental (Airbnb, VRBO)' },
  { value: 'contractor', label: '🔨 Frequent Contractor Work' },
  { value: 'teen_drivers', label: '🚗 Teen Drivers in Household' },
];

const householdTypes = [
  { value: 'single', label: 'Single / No Children' },
  { value: 'family_young', label: 'Family with Young Children' },
  { value: 'family_teen', label: 'Family with Teenagers' },
  { value: 'retired', label: 'Retired / Empty Nester' },
  { value: 'frequent_guests', label: 'Frequent Gatherings / Entertaining' },
];

const riskWeights: Record<string, number> = {
  pool: 3, trampoline: 2, dog: 2, rental: 3, contractor: 1, teen_drivers: 2,
  single: 0, family_young: 1, family_teen: 2, retired: 0, frequent_guests: 2,
};

export default function DFWLiabilityInsuranceGuide() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [household, setHousehold] = useState('');
  const [result, setResult] = useState<{ level: string; recommended: string; umbrella: boolean; costEst: string; notes: string[] } | null>(null);

  function toggleFeature(val: string) {
    setSelectedFeatures(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);
  }

  function analyze() {
    let score = selectedFeatures.reduce((acc, f) => acc + (riskWeights[f] || 0), 0);
    if (household) score += riskWeights[household] || 0;
    const notes: string[] = [];
    if (selectedFeatures.includes('dog')) notes.push('Texas follows the "one-bite rule" — but documentation of prior aggression creates strict liability. Keep bite history records.');
    if (selectedFeatures.includes('pool')) notes.push('Pool + guests = your highest single liability exposure. Umbrella policy is non-negotiable.');
    if (selectedFeatures.includes('rental')) notes.push('Standard homeowner\’s rarely covers short-term rental liability. You likely need a business policy or host endorsement.');
    if (selectedFeatures.includes('contractor')) notes.push('Verify contractors carry their own liability insurance. An uninsured contractor injury on your property can be your claim.');
    if (selectedFeatures.includes('trampoline')) notes.push('Many DFW insurers surcharge or exclude trampolines. Disclose immediately to avoid claim denial.');
    let level = 'LOW', recommended = '$100K–$300K standard liability', umbrella = false, costEst = '$0–50/yr adjustment';
    if (score >= 7) { level = 'CRITICAL'; recommended = '$1M+ umbrella + review underlying limits'; umbrella = true; costEst = '$350–600/yr (umbrella + adjustments)'; }
    else if (score >= 4) { level = 'HIGH'; recommended = '$1M umbrella policy'; umbrella = true; costEst = '$200–400/yr umbrella'; }
    else if (score >= 2) { level = 'MEDIUM'; recommended = '$300K liability + umbrella consideration'; umbrella = false; costEst = '$100–200/yr for extended liability'; }
    setResult({ level, recommended, umbrella, costEst, notes });
  }

  const riskColor = (l: string) => l === 'CRITICAL' ? '#EF4444' : l === 'HIGH' ? '#F97316' : l === 'MEDIUM' ? '#F59E0B' : '#10B981';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>⚖️ DFW Homeowner Series</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Personal Liability Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>Most DFW homeowners are carrying $100K–$300K in liability coverage while living with $500K–$2M+ in exposure. Here is how to close the gap.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          {[['$100K', 'Standard liability limit — covers ~5 weeks of a serious injury lawsuit'],['$300K', 'Extended — covers most single-incident claims'],['$1M+', 'Umbrella — the minimum for pool, dog, or rental owners'],['$200–400', 'Annual cost of $1M umbrella in DFW — less than a car payment']].map(([num, desc]) => (
            <div key={num} style={{ background: '#132035', borderRadius: 10, padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#F5E642' }}>{num}</div>
              <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>{desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>Common DFW Liability Triggers</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          {[['🐕', 'Dog bites — Texas one-bite rule means the first bite may not trigger strict liability, but medical costs still hit your policy'],['🏊', 'Pool accidents — drowning, slip/fall, diving injuries — the highest-value claims in residential liability'],['🔨', 'Contractor injuries — if your contractor lacks insurance, their injury is your problem'],['🚗', 'Teen driver incidents that originate from your property'],['🏠', 'Guest injuries at social gatherings — holiday parties, BBQs, neighborhood events']].map(([icon, text]) => (
            <div key={text} style={{ background: '#132035', borderRadius: 8, padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 18 }}>{icon}</span><span style={{ fontSize: 14 }}>{text}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🏠 Liability Risk Assessment</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 8 }}>Property features (select all that apply)</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {features.map(f => (
                <button key={f.value} onClick={() => toggleFeature(f.value)} style={{ background: selectedFeatures.includes(f.value) ? '#F5E642' : '#0A1628', color: selectedFeatures.includes(f.value) ? '#0A1628' : '#E8EDF5', border: '1px solid #2A3F5F', borderRadius: 6, padding: '10px 12px', cursor: 'pointer', fontSize: 13, textAlign: 'left', fontWeight: selectedFeatures.includes(f.value) ? 700 : 400 }}>{f.label}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>Household type</label>
            <select value={household} onChange={e => setHousehold(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #2A3F5F', borderRadius: 6, padding: '10px 12px', color: '#E8EDF5', fontSize: 15 }}>
              <option value="">Select household type...</option>
              {householdTypes.map(h => <option key={h.value} value={h.value}>{h.label}</option>)}
            </select>
          </div>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '12px 0', borderRadius: 8, border: 'none', cursor: 'pointer', width: '100%' }}>Assess My Risk</button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 8, padding: 18 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: riskColor(result.level), marginBottom: 10 }}>Risk Level: {result.level}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#F5E642', marginBottom: 4 }}>Recommended Coverage:</div>
              <div style={{ fontSize: 14, color: '#E8EDF5', marginBottom: 10 }}>{result.recommended}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#F5E642', marginBottom: 4 }}>Estimated Additional Cost:</div>
              <div style={{ fontSize: 14, color: '#10B981', fontWeight: 600, marginBottom: 12 }}>{result.costEst}</div>
              {result.notes.length > 0 && <>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#F5E642', marginBottom: 6 }}>Specific Alerts:</div>
                {result.notes.map(n => <div key={n} style={{ fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>⚠️ {n}</div>)}
              </>}
            </div>
          )}
        </div>
        <div style={{ color: '#64748B', fontSize: 12, textAlign: 'center' }}>General guidance only — consult your insurance agent for policy-specific advice.</div>
      </div>
    </div>
  );
}
