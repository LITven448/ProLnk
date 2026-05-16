import { useState } from 'react';

const styles = {
  page: { backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' },
  container: { maxWidth: '800px', margin: '0 auto' },
  heading: { fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '8px' },
  sub: { color: '#94a3b8', fontSize: '1rem', marginBottom: '32px' },
  section: { backgroundColor: '#0f2040', borderRadius: '12px', padding: '24px', marginBottom: '20px', border: '1px solid #1e3a5f' },
  sectionTitle: { fontSize: '1.2rem', fontWeight: 700, color: '#F5E642', marginBottom: '12px' },
  text: { color: '#cbd5e1', lineHeight: 1.7, marginBottom: '10px' },
  label: { display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px', marginTop: '16px' },
  select: { width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1e3a5f', borderRadius: '8px', color: '#fff', fontSize: '0.95rem' },
  btn: { marginTop: '20px', width: '100%', padding: '14px', backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: '1rem', border: 'none', borderRadius: '10px', cursor: 'pointer' },
  result: { backgroundColor: '#0A1628', borderRadius: '10px', padding: '20px', marginTop: '16px', border: '1px solid #F5E642' },
  resultTitle: { color: '#F5E642', fontWeight: 700, fontSize: '1.1rem', marginBottom: '12px' },
  row: { display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e3a5f', padding: '8px 0', color: '#cbd5e1', fontSize: '0.9rem' },
  badge: { display: 'inline-block', backgroundColor: '#1e3a5f', borderRadius: '6px', padding: '4px 10px', color: '#F5E642', fontSize: '0.8rem', marginRight: '8px', marginBottom: '8px' },
  info: { backgroundColor: '#0d2235', border: '1px solid #1e3a5f', borderRadius: '8px', padding: '12px 16px', color: '#93c5fd', fontSize: '0.9rem', marginBottom: '10px' },
};

export default function DFWHVACDuctworkGuide() {
  const [homeAge, setHomeAge] = useState('');
  const [ductType, setDuctType] = useState('');
  const [complaints, setComplaints] = useState('');
  const [result, setResult] = useState<null | { action: string; cost: string; savings: string; note: string; test: string }>(null);

  function calculate() {
    if (!homeAge || !ductType || !complaints) return;
    const age = parseInt(homeAge);
    let action = 'Duct sealing — mastic or aeroseal treatment';
    let cost = '$400–$1,200 for professional duct sealing';
    let savings = '15–25% on cooling bills';
    let test = 'Duct blaster leakage test recommended first — $150–$250';
    let note = 'Most DFW homes lose 20–30% of conditioned air through duct leaks. Sealing recovers that loss at a fraction of replacement cost.';

    if (ductType === 'flex' && age > 20) {
      action = 'Duct replacement — flex ducts degrade significantly after 20 years';
      cost = '$3,000–$8,000 for full attic duct replacement';
      savings = '25–40% on cooling bills + better air quality';
      note = 'Flex duct has a 15–20 year lifespan. Older flex in DFW attics degrades from heat cycling, develops holes, and loses insulation value. Replacement is worth it.';
      test = 'Inspect for collapsed sections and torn outer jacket before deciding';
    } else if (complaints === 'hot_rooms' && ductType === 'sheet') {
      action = 'Duct sealing + reinsulate with R-8';
      cost = '$800–$2,500 to seal and re-wrap with R-8 insulation';
      savings = '20–30% on cooling bills';
      note = 'Sheet metal ducts are durable but lose efficiency when insulation degrades. R-8 (vs R-6) insulation makes a meaningful difference in DFW attics hitting 150°F.';
    } else if (complaints === 'none') {
      action = 'Schedule duct leakage test — baseline your system';
      cost = '$150–$250 for duct blaster test';
      savings = 'Identify if leaks exist before spending on sealing';
      note = 'If no obvious symptoms, a duct leakage test tells you exactly how much conditioned air you are losing. Most DFW homes fail at 20%+ leakage.';
      test = 'Get the test first — data drives the decision';
    }

    setResult({ action, cost, savings, note, test });
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.heading}>🔧 DFW HVAC Ductwork Guide</div>
        <div style={styles.sub}>Attic-run ducts in DFW heat — why yours might be costing you 30%</div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>🏠 The DFW Slab Home Ductwork Problem</div>
          <p style={styles.text}>Unlike homes in cooler climates that run ducts through conditioned basements, DFW slab homes route ductwork through the attic — where temperatures hit 140–160°F in summer. Even well-insulated ducts lose significant cooling capacity when surrounded by air that hot.</p>
          <p style={styles.text}>The Department of Energy estimates most homes lose 20–30% of conditioned air through duct leaks. In DFW, where your AC runs 6+ months a year, that inefficiency costs real money — often $400–$900/year for a typical home.</p>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>📐 R-6 vs R-8 Duct Insulation</div>
          <div><span style={styles.badge}>R-6 Standard</span><span style={styles.badge}>R-8 Recommended for DFW</span></div>
          <div style={styles.info}>In DFW attics, the difference between R-6 and R-8 duct wrap is meaningful. R-8 insulation reduces heat gain into ducts by ~25% compared to R-6, directly translating to colder air at the register.</div>
          <div style={styles.row}><span>R-6 insulation</span><span>Code minimum — acceptable in mild climates</span></div>
          <div style={styles.row}><span>R-8 insulation</span><span>Recommended for DFW attic ductwork</span></div>
          <div style={styles.row}><span>Upgrade cost</span><span>$800–$2,000 to re-wrap existing ducts with R-8</span></div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>🔬 Duct Sealing Methods</div>
          <div style={styles.row}><span>Mastic sealing</span><span>Paint-on sealant — durable, professional</span></div>
          <div style={styles.row}><span>Aeroseal</span><span>Pressurized sealing from inside — best for inaccessible ducts</span></div>
          <div style={styles.row}><span>Metal tape</span><span>DIY accessible sections — not duct tape (it fails)</span></div>
          <div style={styles.row}><span>Duct replacement</span><span>Best for 20+ year flex duct or severe damage</span></div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>🧮 Get Your Ductwork Recommendation</div>
          <label style={styles.label}>Home age</label>
          <select style={styles.select} value={homeAge} onChange={e => setHomeAge(e.target.value)}>
            <option value="">Select age</option>
            <option value="8">Under 10 years</option>
            <option value="15">10–20 years</option>
            <option value="25">20–30 years</option>
            <option value="35">30+ years</option>
          </select>
          <label style={styles.label}>Duct type</label>
          <select style={styles.select} value={ductType} onChange={e => setDuctType(e.target.value)}>
            <option value="">Select type</option>
            <option value="flex">Flexible duct (silver accordion-style)</option>
            <option value="sheet">Sheet metal with insulation wrap</option>
            <option value="unknown">Unknown / not sure</option>
          </select>
          <label style={styles.label}>Efficiency complaints</label>
          <select style={styles.select} value={complaints} onChange={e => setComplaints(e.target.value)}>
            <option value="">Select option</option>
            <option value="none">No complaints — system seems fine</option>
            <option value="high_bills">High electric bills vs neighbors</option>
            <option value="hot_rooms">Certain rooms never cool properly</option>
            <option value="both">Both high bills and hot rooms</option>
          </select>
          <button style={styles.btn} onClick={calculate}>Get My Ductwork Plan →</button>
          {result && (
            <div style={styles.result}>
              <div style={styles.resultTitle}>✅ Ductwork Recommendation</div>
              <div style={styles.row}><span>Action</span><span style={{ textAlign: 'right', maxWidth: '60%' }}>{result.action}</span></div>
              <div style={styles.row}><span>Estimated Cost</span><span style={{ textAlign: 'right', maxWidth: '55%' }}>{result.cost}</span></div>
              <div style={styles.row}><span>Expected Savings</span><span>{result.savings}</span></div>
              <div style={styles.row}><span>First Step</span><span style={{ textAlign: 'right', maxWidth: '60%' }}>{result.test}</span></div>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '12px' }}>{result.note}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
