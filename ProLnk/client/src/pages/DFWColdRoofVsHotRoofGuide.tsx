import { useState } from 'react';

export default function DFWColdRoofVsHotRoofGuide() {
  const [hvacLocation, setHvacLocation] = useState('');
  const [atticType, setAtticType] = useState('');
  const [result, setResult] = useState<null | { recommendation: string; why: string; cost: string; codeNote: string }>(null);

  function assess() {
    const hvac = hvacLocation.toLowerCase();
    const attic = atticType.toLowerCase();
    let recommendation = '';
    let why = '';
    let cost = '';
    let codeNote = '';

    const hvacInAttic = hvac.includes('attic') || hvac.includes('up');
    const currentlyVented = attic.includes('vent') || attic.includes('cold');

    if (hvacInAttic && currentlyVented) {
      recommendation = '🔥 Switch to Unvented (Hot) Attic';
      why = 'Your HVAC ducts are in a vented attic that reaches 150°F in DFW summers. That temperature differential destroys duct efficiency — you are cooling the attic with your AC. Converting to an unvented (hot) attic with spray foam at the roof deck brings duct temperatures down to near-conditioned space, dramatically reducing cooling loads.';
      cost = '$4,000 – $9,000 for spray foam at roof deck on a 1,500 sq ft attic';
      codeNote = 'Texas Energy Code (IECC 2021) allows unvented attic assemblies when spray foam meets minimum R-values: R-30 closed-cell or R-38 open-cell at roof deck.';
    } else if (!hvacInAttic && currentlyVented) {
      recommendation = '❄️ Keep Vented (Cold) Attic — Optimize It';
      why = 'Your HVAC is in conditioned space, so duct efficiency is not a primary concern. A well-ventilated attic is appropriate. Focus on maximizing attic floor insulation (R-49 recommended for DFW) and sealing all ceiling penetrations.';
      cost = '$1,500 – $4,000 to add blown-in insulation to R-49 and seal penetrations';
      codeNote = 'Vented attics require proper intake (soffit) and exhaust (ridge) venting at 1:150 ratio minimum. Ensure your DFW home meets this or condensation and wood rot can result.';
    } else if (hvacInAttic && !currentlyVented) {
      recommendation = '✅ Your Unvented Attic Is Correct for DFW';
      why = 'With HVAC in an unvented attic, your ducts operate near conditioned space temperature. Verify your spray foam meets current DFW code minimums and that no vents were inadvertently added during roofing work.';
      cost = 'Inspection only: $200 – $400 for energy audit to verify performance';
      codeNote = 'Confirm spray foam was installed by a licensed DFW contractor and meets IECC minimum R-values. Improper installations can trap moisture.';
    } else {
      recommendation = '❄️ Vented Attic With Conditioned HVAC — Good Setup';
      why = 'This is the most common and code-compliant DFW configuration. Your priority should be maximizing attic floor insulation and sealing all ceiling bypass penetrations.';
      cost = '$1,500 – $3,500 to optimize insulation and air sealing';
      codeNote = 'Ensure soffit-to-ridge venting ratio of 1:150. Add baffles to keep soffit vents open where blown insulation is added.';
    }
    setResult({ recommendation, why, cost, codeNote });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Energy Series</div>
        <h1 style={{ fontSize: 34, fontWeight: 800, color: '#fff', marginBottom: 8, lineHeight: 1.2 }}>Cold Roof vs. Hot Roof for DFW Homes</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32 }}>Vented (cold) vs. unvented (hot) attics — this is one of the most consequential decisions for DFW energy efficiency, and the right answer depends almost entirely on where your HVAC lives.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>❄️ Vented (Cold) Attic — How It Works in DFW</h2>
          <p style={{ color: '#94a3b8', marginBottom: 12 }}>A vented attic uses soffit intake vents and ridge/gable exhaust vents to flush hot air out of the attic space. The insulation layer sits on the attic floor (your ceiling), keeping the attic itself unconditioned. This works well in DFW — <em>if your HVAC equipment and ducts are in conditioned space (basement, closets, crawl)</em>.</p>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>DFW Problem:</div>
            <div style={{ color: '#94a3b8', fontSize: 14 }}>A properly vented DFW attic still reaches 140–160°F on summer afternoons. Any duct runs or air handlers in this space lose 30–40% of their cooling capacity before air reaches your living space.</div>
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🔥 Unvented (Hot) Attic — The DFW Game Changer</h2>
          <p style={{ color: '#94a3b8', marginBottom: 12 }}>An unvented attic applies spray foam insulation directly to the roof deck and removes all vents. The attic becomes a semi-conditioned space. In DFW, this brings attic temperatures from 150°F down to 90–100°F — dramatically improving HVAC duct efficiency when equipment is attic-mounted.</p>
          {[
            { label: 'Closed-cell spray foam at roof deck', value: 'R-30 minimum (DFW code)' },
            { label: 'Open-cell spray foam at roof deck', value: 'R-38 minimum (DFW code)' },
            { label: 'Attic temp reduction', value: '140–160°F → 90–100°F' },
            { label: 'Duct efficiency improvement', value: '15–30% HVAC load reduction' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1a3a5c' }}>
              <span style={{ color: '#94a3b8', fontSize: 14 }}>{item.label}</span>
              <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, textAlign: 'right', maxWidth: '45%' }}>{item.value}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🧮 Which System Is Right for My DFW Home?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>HVAC/Duct Location</label>
              <input value={hvacLocation} onChange={e => setHvacLocation(e.target.value)} placeholder="e.g. attic, closet, basement" style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Current Attic Type</label>
              <input value={atticType} onChange={e => setAtticType(e.target.value)} placeholder="e.g. vented, unvented, spray foam" style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer' }}>Get My DFW Recommendation →</button>
          {result && (
            <div style={{ marginTop: 20, padding: 16, background: '#1a2a3a', borderRadius: 8, borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 17, marginBottom: 10 }}>{result.recommendation}</div>
              <div style={{ color: '#cbd5e1', marginBottom: 12, fontSize: 14 }}>{result.why}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>Estimated cost: <strong style={{ color: '#F5E642' }}>{result.cost}</strong></div>
              <div style={{ color: '#64748b', fontSize: 12, borderTop: '1px solid #1a3a5c', paddingTop: 10, marginTop: 10 }}>Code note: {result.codeNote}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🏠 Get DFW Attic System Quotes</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>ProLnk connects you with DFW spray foam and insulation pros who can evaluate your attic configuration and quote the right system for your home.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer' }}>Get Free DFW Quotes →</button>
        </div>
      </div>
    </div>
  );
}
