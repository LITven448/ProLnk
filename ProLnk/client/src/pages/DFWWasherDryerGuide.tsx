import { useState } from 'react';

const SYMPTOMS: Record<string, { washer: string; dryer: string }> = {
  'Not draining / wet clothes': { washer: '$120–$280', dryer: 'N/A' },
  'Loud banging or vibrating': { washer: '$80–$200', dryer: '$90–$220' },
  'Not spinning': { washer: '$150–$350', dryer: 'N/A' },
  'Not heating': { washer: 'N/A', dryer: '$100–$250' },
  'Not starting': { washer: '$100–$300', dryer: '$100–$300' },
  'Leaking water': { washer: '$80–$250', dryer: 'N/A' },
  'Long dry time': { washer: 'N/A', dryer: '$80–$180 (often vent cleaning)' },
};

const APPLIANCE_TYPES = ['Top-Load Washer', 'Front-Load Washer', 'Gas Dryer', 'Electric Dryer', 'Washer/Dryer Combo'];

const NEW_COSTS: Record<string, { basic: number; mid: number }> = {
  'Top-Load Washer': { basic: 500, mid: 900 },
  'Front-Load Washer': { basic: 700, mid: 1400 },
  'Gas Dryer': { basic: 500, mid: 900 },
  'Electric Dryer': { basic: 450, mid: 850 },
  'Washer/Dryer Combo': { basic: 1000, mid: 1900 },
};

export default function DFWWasherDryerGuide() {
  const [applianceType, setApplianceType] = useState(APPLIANCE_TYPES[0]);
  const [symptom, setSymptom] = useState(Object.keys(SYMPTOMS)[0]);
  const [age, setAge] = useState('');
  const [result, setResult] = useState<null | { verdict: string; repairRange: string; replaceRange: string; note: string }>(null);

  const availableSymptoms = Object.keys(SYMPTOMS).filter(s => {
    const data = SYMPTOMS[s];
    if (applianceType.includes('Washer')) return data.washer !== 'N/A';
    return data.dryer !== 'N/A';
  });

  function evaluate() {
    const ageNum = parseInt(age);
    if (isNaN(ageNum)) return;
    const costs = NEW_COSTS[applianceType];
    const sympData = SYMPTOMS[symptom];
    const isWasher = applianceType.includes('Washer');
    const repairRange = isWasher ? sympData.washer : sympData.dryer;
    const maxRepair = parseInt(repairRange.split('–')[1].replace(/\D/g, ''));
    const threshold = costs.mid * 0.5;
    const old = ageNum >= 10;
    const expensive = maxRepair > threshold;
    let verdict = '';
    let note = '';
    if (old && expensive) {
      verdict = '🔴 Replace';
      note = `${applianceType}s older than 10 years with high repair costs rarely justify the investment, especially in DFW where hard water accelerates wear. Consider a top-loader if water efficiency is less critical — they handle DFW hard water scale better.`;
    } else if (!old && !expensive) {
      verdict = '🟢 Repair';
      note = `Repair makes sense here. ${applianceType.includes('Front') ? 'Front-loaders have more complex bearings that wear faster with DFW hard water — consider adding a water softener to extend life.' : 'Regular cleaning with affresh tablets removes hard water deposits.'}`;
    } else {
      verdict = '🟡 Repair with caution';
      note = `Borderline call. If other components are in good shape, repair. Ask the tech if other parts look worn during the service call.`;
    }
    setResult({ verdict, repairRange, replaceRange: `$${costs.basic.toLocaleString()}–$${costs.mid.toLocaleString()}`, note });
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ backgroundColor: '#0D1E3A', borderBottom: '3px solid #F5E642', padding: '32px 24px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>DFW APPLIANCE GUIDE</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>👕 Washer & Dryer Guide for DFW</h1>
          <p style={{ color: '#94A3B8', margin: 0, fontSize: 15 }}>DFW's hard water quietly destroys washing machines. Learn what it costs to repair vs. replace — and which machines last longest in North Texas conditions.</p>
        </div>
      </div>

      <div style={{ maxWidth: 820, margin: '32px auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '💧', title: 'Hard Water Damage', desc: 'DFW water hardness averages 15–25 grains per gallon — among the highest in TX. Without a softener, mineral deposits clog water inlet valves, damage pump seals, and coat heating elements within 5–7 years.' },
            { icon: '🔄', title: 'Front vs. Top Load', desc: 'Top-loaders are more forgiving with DFW hard water. Front-loaders are 20–30% more water-efficient (critical with DFW water restrictions) but require more maintenance and bellow cleaning to prevent mold in humid summers.' },
            { icon: '⚡', title: 'Gas vs. Electric Dryer', desc: 'Gas dryers cost $30–$60/year less to operate in Texas. If you have a gas hookup, it\’s almost always worth the $50–$100 premium. Electric heat-pump dryers are emerging as the most efficient option.' },
          ].map(card => (
            <div key={card.title} style={{ backgroundColor: '#0D1E3A', border: '1px solid #1E3A5F', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', fontSize: 15, margin: '0 0 8px' }}>{card.title}</h3>
              <p style={{ color: '#94A3B8', margin: 0, fontSize: 13, lineHeight: 1.6 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0D1E3A', border: '1px solid #1E3A5F', borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 20px' }}>🔧 Repair vs. Replace Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>Appliance Type</label>
              <select value={applianceType} onChange={e => { setApplianceType(e.target.value); setSymptom(availableSymptoms[0] || Object.keys(SYMPTOMS)[0]); }} style={{ width: '100%', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#F1F5F9', fontSize: 14, boxSizing: 'border-box' }}>
                {APPLIANCE_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>Primary Symptom</label>
              <select value={symptom} onChange={e => setSymptom(e.target.value)} style={{ width: '100%', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#F1F5F9', fontSize: 14, boxSizing: 'border-box' }}>
                {availableSymptoms.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>Appliance Age (years)</label>
              <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 8" style={{ width: '100%', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#F1F5F9', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={evaluate} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Analyze →</button>
          {result && (
            <div style={{ marginTop: 20, backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{result.verdict}</div>
              <div style={{ display: 'flex', gap: 24, marginBottom: 10, flexWrap: 'wrap' }}>
                <span style={{ color: '#94A3B8', fontSize: 13 }}>Repair estimate: <span style={{ color: '#F5E642', fontWeight: 700 }}>{result.repairRange}</span></span>
                <span style={{ color: '#94A3B8', fontSize: 13 }}>New appliance: <span style={{ color: '#F5E642', fontWeight: 700 }}>{result.replaceRange}</span></span>
              </div>
              <p style={{ color: '#CBD5E1', margin: 0, lineHeight: 1.7, fontSize: 14 }}>{result.note}</p>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: '#F5E642', margin: '0 0 8px' }}>🏠 Stackable Units for DFW's Smaller Homes</h3>
          <p style={{ color: '#CBD5E1', margin: 0, fontSize: 14, lineHeight: 1.7 }}>Many DFW homes built in the 1980s–2000s have tight utility closets. Stackable front-load pairs (27" wide) free up significant space but cost $200–$400 more installed. LG and Samsung offer the best stackable warranty coverage in Texas repair networks. Always confirm ventilation clearance — many DFW utility closets lack it, requiring a periscope vent kit (~$30).</p>
        </div>
      </div>
    </div>
  );
}
