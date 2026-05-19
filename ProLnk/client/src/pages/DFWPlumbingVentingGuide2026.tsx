import { useState } from 'react';

export default function DFWPlumbingVentingGuide2026() {
  const [issue, setIssue] = useState('');
  const [result, setResult] = useState('');

  const diagnose = () => {
    if (!issue) return;
    const map: Record<string, string> = {
      gurgling: '🔧 Classic vent blockage — leaves, debris, or bird nest in vent stack. Clear from roof.',
      smell: '💨 Dry P-trap or cracked vent pipe. Run water in unused drains; inspect vent for cracks.',
      slow: '🌊 Partial vent blockage reducing siphon break. Snake vent stack from roof first before drain.',
      toilet: '🚽 Running toilet + gurgle = vent stack near toilet partially blocked. Check roof vent cap.',
      island: '🏝️ Island sink with no wall vent — AAV (air admittance valve) under sink likely failed. Replace AAV.',
    };
    const match = Object.entries(map).find(([k]) => issue.toLowerCase().includes(k));
    setResult(match ? match[1] : '🔍 Symptoms unclear — schedule a camera inspection of your vent stack.');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>ProLnk DFW Plumbing Guide 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🚿 DFW Plumbing Venting Guide 2026</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>How the drain-waste-vent system works in North Texas homes — and why it matters.</p>

        {[
          { icon: '🔄', title: 'Drain-Waste-Vent System', body: 'Every drain in your home connects to the DWV system: drains carry waste out, vents carry sewer gas up and out, and P-traps hold water to block gas entry.' },
          { icon: '🪤', title: 'P-Traps Block Sewer Gas', body: 'The curved pipe under every sink holds a small water seal. That seal blocks toxic sewer gas (hydrogen sulfide, methane) from entering your home. Unused drains dry out — run water monthly in guest baths.' },
          { icon: '🏠', title: 'Vent Stack Goes to Roof', body: 'A vertical pipe runs from your drain system through the roof. It lets air in so drains flow freely (no vacuum) and lets sewer gas escape safely outside. DFW homes built before 1990 often have a single central stack.' },
          { icon: '💨', title: 'AAV for Island Sinks', body: "Island sinks can't reach a wall vent. An Air Admittance Valve (AAV) installs under the sink cabinet, opens to let air in during drainage, seals shut to block gas. DFW code allows AAVs in most jurisdictions — check with your city." },
          { icon: '🔍', title: 'Common DFW Vent Problems', body: 'Roof vent caps clog with leaves and debris in DFW storms. Squirrels and birds nest in unscreened stacks. Tree roots near the house can crack buried vent pipes. Symptoms: gurgling drains, slow drains, sewer smell indoors.' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#132035', borderRadius: 12, padding: '20px', marginBottom: 16 }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>{c.icon} <strong>{c.title}</strong></div>
            <div style={{ color: '#CBD5E1', lineHeight: 1.6 }}>{c.body}</div>
          </div>
        ))}

        <div style={{ background: '#132035', borderRadius: 12, padding: '24px', marginTop: 8 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16 }}>🛠️ Venting Diagnosis Tool</h2>
          <p style={{ color: '#94A3B8', marginBottom: 12 }}>Describe your issue (gurgling, smell, slow drain, toilet, island sink):</p>
          <input
            value={issue}
            onChange={e => setIssue(e.target.value)}
            placeholder="e.g. gurgling sound after flushing"
            style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid #1E3A5F', background: '#0A1628', color: '#fff', marginBottom: 12, boxSizing: 'border-box' }}
          />
          <button onClick={diagnose} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, cursor: 'pointer' }}>
            Diagnose
          </button>
          {result && <div style={{ marginTop: 16, padding: '16px', background: '#0A1628', borderRadius: 8, color: '#F5E642', lineHeight: 1.6 }}>{result}</div>}
        </div>

        <div style={{ marginTop: 32, padding: '20px', background: '#132035', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Need a DFW plumber to inspect your venting?</div>
          <div style={{ color: '#94A3B8′ }}>ProLnk connects you with licensed DFW plumbers — free quotes, no obligation.</div>
        </div>
      </div>
    </div>
  );
}
