import { useState } from 'react';

type Vuln = { issue: string; risk: 'high' | 'medium' | 'low' };
type Fix = { label: string; cost: string; urgent: boolean };

const garageVulns: Record<string, Vuln[]> = {
  single: [
    { issue: 'Single-car garage door easier to force with pry bar', risk: 'high' },
    { issue: 'Older spring mechanism easier to defeat', risk: 'medium' },
    { issue: 'Side door often weakest entry point in home', risk: 'high' },
  ],
  double: [
    { issue: 'Double doors have larger flex gap — emergency cord accessible with wire hanger', risk: 'high' },
    { issue: 'Larger footprint increases visible entry points', risk: 'medium' },
    { issue: 'Remote cloning risk if opener is 10+ years old', risk: 'high' },
  ],
  carport: [
    { issue: 'No door barrier — vehicle and storage directly accessible', risk: 'high' },
    { issue: 'Tools accessible that can be used to break into home', risk: 'medium' },
  ],
};

const fixes: Record<string, Fix[]> = {
  old: [
    { label: 'Replace opener with rolling-code technology (prevents cloning)', cost: '$150–$350', urgent: true },
    { label: 'Add garage door defender (floor lock bar)', cost: '$35–$80', urgent: true },
    { label: 'Shield emergency cord release with plastic guard', cost: '$5–$15', urgent: true },
    { label: 'Reinforce side entry door with deadbolt + frame kit', cost: '$140–$250', urgent: false },
  ],
  new: [
    { label: 'Add real-time open/close monitoring via smart opener', cost: '$50–$150 addon', urgent: false },
    { label: 'Garage door defender (floor lock)', cost: '$35–$80', urgent: true },
    { label: 'Shield emergency cord from wire-hanger exploit', cost: '$5–$15', urgent: true },
    { label: 'Camera inside garage pointed at entry door', cost: '$40–$100', urgent: false },
  ],
  smart: [
    { label: 'Verify rolling-code is enabled in app settings', cost: '$0', urgent: true },
    { label: 'Enable auto-close if left open (15-min timer)', cost: '$0', urgent: true },
    { label: 'Add motion alert for inside garage', cost: '$40–$100', urgent: false },
    { label: 'Reinforce garage-to-home interior door', cost: '$80–$200', urgent: false },
  ],
};

export default function DFWGarageSecurityGuide() {
  const [garageType, setGarageType] = useState('');
  const [openerAge, setOpenerAge] = useState('');
  const [hasSecurity, setHasSecurity] = useState('');
  const [result, setResult] = useState<{ vulns: Vuln[]; fixes: Fix[] } | null>(null);

  function assess() {
    const vulns = garageVulns[garageType] || garageVulns.single;
    const fixList = fixes[openerAge] || fixes.old;
    const filtered = hasSecurity === 'yes' ? fixList.filter(f => !f.urgent) : fixList;
    setResult({ vulns, fixes: filtered.length ? filtered : fixList });
  }

  const riskColor = (r: string) => r === 'high' ? '#FF6B6B' : r === 'medium' ? '#F5A623' : '#4CAF82';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 40 }}>🏠</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, margin: '0.5rem 0' }}>DFW Garage Security Guide</h1>
        <p style={{ color: '#9BA8BB', marginBottom: '1.5rem' }}>
          Garages are the #1 entry point for DFW burglars. Two common exploits: remote cloning (older openers) and
          the wire-hanger trick (fishing the emergency cord through the top gap in 6 seconds). Both are fixable for under $20.
        </p>

        <div style={{ background: '#1A0A0A', border: '1px solid #FF6B6B', borderRadius: 12, padding: '1rem 1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span>⚠️</span>
            <strong style={{ color: '#FF6B6B' }}>DFW Burglar Tactic — The Wire Hanger Trick</strong>
          </div>
          <p style={{ color: '#9BA8BB', margin: 0, fontSize: 14 }}>
            A bent wire hanger inserted in the top corner of your garage door can snag the emergency release cord
            in under 6 seconds. A $5 plastic cord shield from Amazon blocks this entirely. Do this today.
          </p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: '1rem' }}>🔍 Assess Your Garage</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              { label: 'Garage Type', val: garageType, set: setGarageType, opts: [['single', 'Single-car attached'], ['double', 'Double-car attached'], ['carport', 'Carport (no door)']] },
              { label: 'Opener Age', val: openerAge, set: setOpenerAge, opts: [['old', 'Older than 10 years (or unknown)'], ['new', '2–10 years old'], ['smart', 'Smart opener with app']] },
              { label: 'Current Garage Security', val: hasSecurity, set: setHasSecurity, opts: [['yes', 'Yes — camera or alarm inside'], ['no', 'No dedicated security']] },
            ].map((f, i) => (
              <div key={i}>
                <label style={{ color: '#9BA8BB', fontSize: 14 }}>{f.label}</label>
                <select value={f.val} onChange={e => f.set(e.target.value)}
                  style={{ display: 'block', width: '100%', marginTop: 6, padding: '0.6rem', borderRadius: 8, background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F' }}>
                  <option value="">Select</option>
                  {f.opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
            ))}
            <button onClick={assess} disabled={!garageType || !openerAge || !hasSecurity}
              style={{ padding: '0.75rem', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
              Analyze My Garage
            </button>
          </div>
        </div>

        {result && (
          <div>
            <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1rem' }}>
              <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: '1rem' }}>⚠️ Your Vulnerabilities</h2>
              {result.vulns.map((v, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ color: riskColor(v.risk), fontSize: 12, fontWeight: 700, marginTop: 2, whiteSpace: 'nowrap' }}>
                    {v.risk.toUpperCase()}
                  </span>
                  <span style={{ color: '#E8EDF5' }}>{v.issue}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem' }}>
              <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: '1rem' }}>🛡️ Recommended Upgrades</h2>
              {result.fixes.map((f, i) => (
                <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ color: '#E8EDF5', marginBottom: 2 }}>{f.label}</div>
                    {f.urgent && <div style={{ fontSize: 12, color: '#FF6B6B' }}>🔴 Do this first</div>}
                  </div>
                  <span style={{ color: '#F5E642', fontWeight: 700, whiteSpace: 'nowrap', marginLeft: '1rem' }}>{f.cost}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
