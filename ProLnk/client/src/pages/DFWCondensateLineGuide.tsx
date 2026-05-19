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
  warn: { backgroundColor: '#2d1b00', border: '1px solid #f59e0b', borderRadius: '8px', padding: '12px 16px', color: '#fbbf24', fontSize: '0.9rem', marginBottom: '12px' },
  checklist: { listStyle: 'none', padding: 0, margin: 0 },
  checkItem: { color: '#cbd5e1', padding: '6px 0', borderBottom: '1px solid #1e3a5f', fontSize: '0.9rem' },
};

export default function DFWCondensateLineGuide() {
  const [systems, setSystems] = useState('');
  const [age, setAge] = useState('');
  const [result, setResult] = useState<null | { checklist: string[]; cost: string; warnings: string[]; urgency: string }>(null);

  function calculate() {
    if (!systems || !age) return;
    const sysCount = parseInt(systems);
    const ageYrs = parseInt(age);
    const checklist = [
      '✅ Inspect drain pan for standing water monthly (May–Sep)',
      '✅ Flush condensate line with 1 cup bleach + water quarterly',
      '✅ Verify float switch engages — pour water in pan to test',
      '✅ Check secondary drain line is unobstructed',
      '✅ Inspect attic air handler for rust stains or water marks',
    ];
    if (ageYrs > 10) checklist.push('✅ Have tech inspect drain pan for rust/cracks — replace if corroded');
    if (sysCount > 1) checklist.push('✅ Inspect each system independently — backup pan under each unit');
    const warnings = ['Water dripping from ceiling near vents', 'AC shutting off unexpectedly (float switch trip)', 'Musty smell from vents', 'Standing water in drain pan'];
    const urgency = ageYrs > 12 ? 'HIGH — schedule pro inspection this week' : 'NORMAL — annual tune-up includes condensate check';
    const cost = sysCount > 1 ? '$120–$250 per system for annual clean + check' : '$80–$150 for annual condensate clean + inspection';
    setResult({ checklist, cost, warnings, urgency });
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.heading}>💧 DFW Condensate Line Guide</div>
        <div style={styles.sub}>The #1 AC problem in DFW — and how to prevent ceiling damage</div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>🌧️ Why This Is DFW's Biggest AC Issue</div>
          <p style={styles.text}>DFW summers combine 100°F heat with 60–70% humidity. Your AC pulls massive amounts of moisture from the air — a single 4-ton unit can produce 10–20 gallons of condensate per day during peak summer. That water must drain out through the condensate line.</p>
          <p style={styles.text}>When algae, sludge, or debris clogs the drain line, water backs up into the drain pan and overflows — often into your ceiling drywall. A single backup event can cause $3,000–$15,000 in water damage. A $80 annual cleaning prevents it entirely.</p>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>⚠️ Warning Signs to Watch For</div>
          <div style={styles.warn}>🚨 If you see water dripping from your ceiling near an AC vent — shut off your AC immediately and call an HVAC tech. Every minute of delay is more water damage.</div>
          <div style={styles.row}><span>AC shuts off suddenly</span><span>Float switch tripped — line is backed up</span></div>
          <div style={styles.row}><span>Musty smell from vents</span><span>Mold growing in drain pan or line</span></div>
          <div style={styles.row}><span>Standing water in pan</span><span>Drain line partially blocked</span></div>
          <div style={styles.row}><span>Ceiling stains near vents</span><span>Past overflow — get pan inspected now</span></div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>🛡️ Float Switch — Your Last Line of Defense</div>
          <p style={styles.text}>A float switch sits in the secondary drain pan. When water rises (meaning the primary line is clogged), it shuts off the AC before overflow occurs. If your system is 10+ years old and lacks a float switch, installing one ($75–$120) is the best $100 you'll spend this summer.</p>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>🧮 Get Your Maintenance Checklist</div>
          <label style={styles.label}>Number of AC systems in your home</label>
          <select style={styles.select} value={systems} onChange={e => setSystems(e.target.value)}>
            <option value="">Select count</option>
            <option value="1">1 system</option>
            <option value="2">2 systems</option>
            <option value="3">3+ systems</option>
          </select>
          <label style={styles.label}>System age (years)</label>
          <select style={styles.select} value={age} onChange={e => setAge(e.target.value)}>
            <option value="">Select age</option>
            <option value="5">Under 5 years</option>
            <option value="8">5–10 years</option>
            <option value="12">10–15 years</option>
            <option value="18">15+ years</option>
          </select>
          <button style={styles.btn} onClick={calculate}>Generate My Checklist →</button>
          {result && (
            <div style={styles.result}>
              <div style={styles.resultTitle}>✅ Your Condensate Maintenance Plan</div>
              <div style={styles.row}><span>Urgency</span><span>{result.urgency}</span></div>
              <div style={styles.row}><span>Inspection Cost</span><span>{result.cost}</span></div>
              <ul style={{ ...styles.checklist, marginTop: '16px' }}>
                {result.checklist.map((item, i) => <li key={i} style={styles.checkItem}>{item}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
