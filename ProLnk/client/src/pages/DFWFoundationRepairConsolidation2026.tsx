import { useState } from 'react';

export default function DFWFoundationRepairConsolidation2026() {
  const [weeksSince, setWeeksSince] = useState('');
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState('');

  const getGuidance = () => {
    if (!weeksSince || !situation) { setResult('Please answer both questions.'); return; }
    const weeks = parseInt(weeksSince);
    if (situation === 'doors-sticking' && weeks <= 6) { setResult('🟡 MONITOR: Minor door sticking within 6 weeks of pier installation is common and usually resolves as soil consolidates around new piers. Log the affected doors. If sticking worsens or spreads to new areas after week 8, contact your foundation company — this is covered under warranty.'); return; }
    if (situation === 'new-cracks' && weeks <= 4) { setResult('🟡 EXPECTED: Hairline cracks in drywall within 30 days of repair are normal — the structure is adjusting. Mark crack endpoints with pencil and date. If cracks exceed 1/4 inch width or continue growing after week 8, call the company.'); return; }
    if (situation === 'new-cracks' && weeks > 8) { setResult('🔴 CALL YOUR COMPANY: New or expanding cracks appearing 8+ weeks post-repair warrant a warranty inspection. Document with photos. Most DFW foundation companies offer a 25-year transferable warranty — this is exactly what it covers.'); return; }
    if (situation === 'sloping-floor') { setResult('🔴 SCHEDULE INSPECTION: Noticeable floor slope after the consolidation period (8+ weeks) may indicate pier movement or incomplete lift. Contact your foundation company for a post-repair elevation survey. Bring your original repair report showing pre-lift readings.'); return; }
    if (situation === 'all-normal' && weeks >= 8) { setResult('🟢 LOOKING GOOD: Stable conditions at 8+ weeks is a great sign. Schedule your 90-day post-repair elevation check (many companies include this). Begin annual monitoring every spring and fall — DFW clay moves most in April-May and October-November.'); return; }
    setResult('🟡 CONTINUE MONITORING: Your situation is within normal consolidation parameters. Log any changes, water drainage areas near the foundation, and weather conditions. Keep records in ProLnk Vault for future reference.');
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#F5E642', fontSize: '14px', fontWeight: '600′ }}>🏗️ DFW FOUNDATION GUIDE 2026</div>
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px', lineHeight: '1.2′ }}>Post-Repair Foundation Consolidation in DFW</h1>
        <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '32px' }}>After piers are installed, DFW clay soil goes through a consolidation period. Here's what’s normal — and what isn’t.</p>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>📅 The Consolidation Timeline</h2>
          {[['Days 1–7','Immediate settling is normal. Doors that were stuck may swing freely. Some may temporarily become harder to close.','🔵'],['Weeks 1–4','Soil around piers compresses. Minor hairline cracks in drywall are expected as the home adjusts. Mark and monitor.','🔵'],['Weeks 4–8','Consolidation continues. Most cosmetic cracking stabilizes. Monitor doors, windows, and visible gaps weekly.','🟡'],['Weeks 8–12','Full consolidation should occur. If issues persist or worsen past week 8, contact your foundation company.','🟢'],['Post 90 Days','Annual monitoring begins. DFW homes should be elevation-checked every spring and fall due to clay movement.','🟢']].map(([period, desc, icon]) => (
            <div key={period} style={{ display: 'flex', gap: '14px', marginBottom: '14px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '18px', minWidth: '24px' }}>{icon}</span>
              <div>
                <div style={{ fontWeight: '700', color: '#F5E642', fontSize: '14px', marginBottom: '4px' }}>{period}</div>
                <div style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.5′ }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>📋 What to Track Post-Repair</h2>
          {[['Elevation readings','Your foundation company should provide pre-lift readings — request a post-repair elevation survey at 90 days'],['Door and window operation','Check all doors and windows weekly — note which are sticking and measure any gap changes'],['Interior cracks','Mark crack endpoints with pencil + date, measure width, photograph monthly'],['Exterior grade and drainage','Ensure water drains away from foundation — improper drainage is #1 cause of DFW re-settlement'],['Watering schedule','Consistent foundation watering prevents clay from drying and contracting around new piers']].map(([title, desc], i) => (
            <div key={i} style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '14px', marginBottom: '10px' }}>
              <div style={{ fontWeight: '700', marginBottom: '6px', fontSize: '14px' }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: '13px' }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>🧭 Is My Situation Normal?</h2>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '14px', marginBottom: '6px' }}>How many weeks since pier installation?</label>
            <input type="number" value={weeksSince} onChange={e => setWeeksSince(e.target.value)} placeholder="Enter number of weeks"
              style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '14px', marginBottom: '6px' }}>What are you observing?</label>
            <select value={situation} onChange={e => setSituation(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '14px' }}>
              <option value="">Select your situation</option>
              <option value="all-normal">Everything looks stable, no issues</option>
              <option value="doors-sticking">Doors or windows sticking</option>
              <option value="new-cracks">New or expanding drywall cracks</option>
              <option value="sloping-floor">Noticeable floor slope or movement</option>
            </select>
          </div>
          <button onClick={getGuidance}
            style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '12px 24px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', width: '100%' }}>
            Get My Monitoring Guidance →
          </button>
          {result && <div style={{ marginTop: '16px', backgroundColor: '#0A1628', borderRadius: '8px', padding: '16px', color: '#cbd5e1', fontSize: '15px', lineHeight: '1.7′ }}>{result}</div>}
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#F5E642', fontWeight: '700', marginBottom: '8px' }}>🔒 ProLnk Home Health Vault</div>
          <div style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6′ }}>Store your foundation repair report, pre/post elevation readings, warranty documents, and monitoring photos in ProLnk’s Home Health Vault. This data follows the home forever and is transferable to future buyers — often increasing home value at resale.</div>
        </div>
      </div>
    </div>
  );
}