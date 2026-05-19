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
};

export default function DFWHVACFilterGuide() {
  const [sqft, setSqft] = useState('');
  const [allergy, setAllergy] = useState('');
  const [pets, setPets] = useState('');
  const [result, setResult] = useState<null | { merv: number; freq: string; annual: string; note: string }>(null);

  function calculate() {
    if (!sqft || !allergy || !pets) return;
    let merv = 8;
    let freqMonths = 3;
    let note = 'Standard MERV 8 works fine for most DFW homes without allergy concerns.';

    if (allergy === 'severe') { merv = 13; freqMonths = 1; note = 'MERV 13 captures pollen, mold spores, and fine DFW dust. Check monthly May–Sep.'; }
    else if (allergy === 'moderate') { merv = 11; freqMonths = 2; note = 'MERV 11 balances air quality and airflow. Change every 6 weeks during peak season.'; }
    if (pets === 'yes' && merv < 11) { merv = 11; freqMonths = Math.min(freqMonths, 2); note += ' Pet dander warrants upgrade to MERV 11 minimum.'; }
    const sqftNum = parseInt(sqft);
    if (sqftNum > 3000 && freqMonths > 1) freqMonths = Math.max(1, freqMonths - 1);

    const filtersPerYear = Math.round(12 / freqMonths);
    const costPerFilter = merv >= 13 ? 22 : merv >= 11 ? 14 : 8;
    const annual = `$${filtersPerYear * costPerFilter * 2}–$${filtersPerYear * costPerFilter * 4}/yr`;
    const freq = freqMonths === 1 ? 'Every month (May–Sep), every 2 months (Oct–Apr)' : `Every ${freqMonths} months`;
    setResult({ merv, freq, annual, note });
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.heading}>🌬️ DFW HVAC Filter Guide</div>
        <div style={styles.sub}>Monthly filter changes May–September — DFW demands it</div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>🌿 Why DFW Filters Clog Fast</div>
          <p style={styles.text}>DFW has one of the highest airborne allergen loads in the US — cedar, oak, ragweed, and spring cottonwood combine with construction dust and highway particulates. Your AC runs nearly non-stop from May through September, pulling all of that through your filter 24/7.</p>
          <p style={styles.text}>A clogged filter forces your blower motor to work harder, raises energy bills, and causes your evaporator coil to ice up. Many DFW homeowners who change filters quarterly should actually change them monthly during peak season.</p>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>📊 MERV Ratings Explained</div>
          <div style={styles.row}><span>MERV 6–8</span><span>Basic dust — lowest cost, least restriction</span></div>
          <div style={styles.row}><span>MERV 11</span><span>Captures pet dander, mold spores, pollen</span></div>
          <div style={styles.row}><span>MERV 13</span><span>Captures fine PM2.5, smoke, bacteria</span></div>
          <div style={styles.row}><span>MERV 16+</span><span>Hospital grade — may restrict residential airflow</span></div>
          <p style={styles.text} style={{ marginTop: '12px' }}>⚠️ MERV 13 can restrict airflow on older systems. If your blower is under-powered, step down to MERV 11 and change more frequently.</p>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>🧮 Get Your Filter Plan</div>
          <label style={styles.label}>Home square footage</label>
          <select style={styles.select} value={sqft} onChange={e => setSqft(e.target.value)}>
            <option value="">Select size</option>
            <option value="1500">Under 2,000 sq ft</option>
            <option value="2500">2,000–3,000 sq ft</option>
            <option value="3500">3,000–4,000 sq ft</option>
            <option value="4500">4,000+ sq ft</option>
          </select>
          <label style={styles.label}>Allergy sensitivity</label>
          <select style={styles.select} value={allergy} onChange={e => setAllergy(e.target.value)}>
            <option value="">Select level</option>
            <option value="none">None — no allergies in household</option>
            <option value="moderate">Moderate — some seasonal symptoms</option>
            <option value="severe">Severe — allergy/asthma sufferers</option>
          </select>
          <label style={styles.label}>Pets in the home?</label>
          <select style={styles.select} value={pets} onChange={e => setPets(e.target.value)}>
            <option value="">Select option</option>
            <option value="no">No pets</option>
            <option value="yes">Yes — 1 or more pets</option>
          </select>
          <button style={styles.btn} onClick={calculate}>Get My Filter Plan →</button>
          {result && (
            <div style={styles.result}>
              <div style={styles.resultTitle}>✅ Your Filter Plan</div>
              <div style={styles.row}><span>Recommended MERV</span><span>MERV {result.merv}</span></div>
              <div style={styles.row}><span>Change Frequency</span><span>{result.freq}</span></div>
              <div style={styles.row}><span>Annual Cost Estimate</span><span>{result.annual}</span></div>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '12px' }}>{result.note}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
