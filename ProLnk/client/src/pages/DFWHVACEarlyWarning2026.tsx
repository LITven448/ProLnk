import { useState } from 'react';

export default function DFWHVACEarlyWarning2026() {
  const [sign, setSign] = useState('');
  const [diagnosis, setDiagnosis] = useState('');

  const diagnoses: Record<string, string> = {
    warm_spots: 'Warm spots in specific rooms = duct issues. Check for disconnected flex duct in attic (common after pest activity or settling). Also check for closed/blocked supply registers. A DFW HVAC tech can do a duct blaster test to find leaks — fix before summer peak.',
    high_bill: 'Unusually high summer bill without behavioral change = efficiency drop. Most likely cause: dirty evaporator coil or low refrigerant charge. Schedule a tune-up now — coil cleaning recovers 15-20% efficiency. Also check air filter; a clogged filter starves the system.',
    clicking: 'Clicking on startup = capacitor likely failing. Capacitors are cheap ($50-150 parts) but when they fail completely, the compressor won’t start. A DFW HVAC tech can test capacitor health in 10 minutes during a tune-up. Replace now — do not wait for full failure in July heat.',
    short_cycle: 'Short cycling (unit turns on/off every few minutes) = either oversized unit or low refrigerant charge. Oversized units are a design flaw — discuss zoning solutions with ProLnk. Low charge = refrigerant leak, which requires licensed tech to diagnose and repair.',
    musty: 'Musty smell from vents = mold or mildew on evaporator coil. DFW humidity creates perfect conditions. Schedule coil cleaning and check drain pan for standing water. Install UV light in air handler to prevent recurrence. Do not ignore — mold spreads through ductwork.',
    ice_buildup: 'Ice forming on refrigerant lines = severely restricted airflow or very low refrigerant. Turn system to fan-only immediately to melt ice. Check/replace air filter. If ice returns within an hour of restart, call ProLnk — low charge or failing blower motor.',
  };

  function diagnose() {
    if (!sign) return;
    setDiagnosis(diagnoses[sign] || 'Select a warning sign for diagnosis.');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🔧</div>
        <h1 style={{ color: '#F5E642', fontSize: 26, marginBottom: 4 }}>DFW HVAC Early Warning Signs 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>Catch problems before they become $4,000+ emergency replacements in July heat</p>

        {[
          { emoji: '🌡️', sign: 'Warm spots in home', cost: '$200-800 fix vs $3K+ emergency' },
          { emoji: '💸', sign: 'Unusually high summer bill', cost: 'Tune-up recovers 15-20% efficiency' },
          { emoji: '🖱️', sign: 'Clicking sound on startup', cost: '$150 capacitor vs $2K compressor' },
          { emoji: '🔄', sign: 'Short cycling on/off', cost: 'Early diagnosis saves compressor' },
          { emoji: '👃', sign: 'Musty smell from vents', cost: 'Coil clean vs ductwork replacement' },
          { emoji: '🧊', sign: 'Ice on refrigerant lines', cost: '$300 fix vs $5K system failure' },
        ].map((item) => (
          <div key={item.sign} style={{ background: '#0f2040', borderRadius: 10, padding: '12px 18px', marginBottom: 8, display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ fontSize: 20 }}>{item.emoji}</span>
              <div style={{ color: '#e2e8f0', fontSize: 15 }}>{item.sign}</div>
            </div>
            <div style={{ color: '#F5E642', fontSize: 12, textAlign: 'right', maxWidth: 160 }}>{item.cost}</div>
          </div>
        ))}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 22, marginTop: 28 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>🔍 Warning Sign → Diagnosis Guide</div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13 }}>What are you experiencing?</label>
            <select value={sign} onChange={(e) => setSign(e.target.value)}
              style={{ display: 'block', marginTop: 6, width: '100%', background: '#1e3a5f', color: '#fff', border: '1px solid #2d5a8e', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select warning sign</option>
              <option value="warm_spots">Warm spots in certain rooms</option>
              <option value="high_bill">Unusually high electric bill</option>
              <option value="clicking">Clicking sound on startup</option>
              <option value="short_cycle">System cycles on/off rapidly</option>
              <option value="musty">Musty smell from vents</option>
              <option value="ice_buildup">Ice on refrigerant lines</option>
            </select>
          </div>
          <button onClick={diagnose}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 24px', fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Diagnose This Sign
          </button>
          {diagnosis && <div style={{ marginTop: 16, background: '#162d4a', borderRadius: 8, padding: 16, color: '#e2e8f0', fontSize: 14, lineHeight: 1.6 }}>{diagnosis}</div>}
        </div>
      </div>
    </div>
  );
}