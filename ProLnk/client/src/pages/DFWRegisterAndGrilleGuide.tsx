import { useState } from 'react';

const problems = ['One room is much hotter than others in summer', 'Room is too cold even on mild days', 'Rattling or vibrating from register', 'Weak airflow from ceiling register', 'Return grille is clogged or hasn\’t been cleaned'];
const registerTypes = ['Supply register (adjustable louvers — air comes out)', 'Return grille (no louvers — air goes in)', 'Not sure which type'];

const guidance: Record<string, Record<string, { diagnosis: string; action: string; warning: string }>> = {
  'One room is much hotter than others in summer': {
    'Supply register (adjustable louvers — air comes out)': { diagnosis: '⚠️ Supply register may be partially closed or misdirected. DFW homes commonly have partially closed registers from previous owners "balancing" airflow incorrectly.', action: 'Open the register fully. Tilt louvers to direct airflow toward the room interior (not directly at walls). Closing registers in other rooms does NOT fix this room — it increases system static pressure.', warning: '🚫 Never close more than 20% of your supply registers. Closing too many causes DFW systems to freeze the coil or short-cycle the compressor.' },
    'Return grille (no louvers — air goes in)': { diagnosis: '🔴 Inadequate return air. If the hot room has no return grille or an undersized return, pressure builds up and hot room air cannot be drawn back to the system.', action: 'Add a return air transfer grille between the hot room and hallway (door undercut + transfer grille). Or ask HVAC tech about adding a dedicated return duct to that room.', warning: '⚠️ Hot rooms without adequate return are extremely common in DFW two-story homes. This is often misdiagnosed as equipment undersizing.' },
    'Not sure which type': { diagnosis: '🔍 Identify your register type first. Supply = air blows out, louvers are adjustable. Return = air is sucked in, no adjustable louvers.', action: 'Hold a tissue or piece of paper near the register. If it blows away = supply. If it gets sucked in = return. Each requires different solutions.', warning: '⚠️ Treating a return as a supply (or vice versa) leads to wrong diagnosis and ineffective fixes.' },
  },
  'Room is too cold even on mild days': {
    'Supply register (adjustable louvers — air comes out)': { diagnosis: '⚠️ Register may be over-delivering to this room. Common in rooms near air handler with short duct runs — they get first and most conditioned air.', action: 'Partially close the supply register louvers for that room (no more than 50% closed). This redirects pressure to rooms further from the air handler.', warning: '🔧 Do this incrementally. Close 25%, wait 24 hours, check all rooms. Never close fully.' },
    'Return grille (no louvers — air goes in)': { diagnosis: '⚠️ Oversized return in a cool room can over-draw from that space. Check if there is a nearby supply register that is delivering too much air first.', action: 'Verify the supply register for this room is not at full open. Address supply side before modifying return air flow.', warning: '🚫 Never block or cover a return grille. This causes system pressure problems and reduces airflow across the entire system.' },
    'Not sure which type': { diagnosis: '🔍 Identify register type before acting. Supply and return require opposite approaches for the same symptom.', action: 'Hold paper near register to determine direction of airflow. Then use the appropriate guidance for supply or return.', warning: '⚠️ Closing a return thinking it is a supply will make the entire system worse.' },
  },
  'Rattling or vibrating from register': {
    'Supply register (adjustable louvers — air comes out)': { diagnosis: '⚠️ Register frame is loose or louver adjustment tab is vibrating. Common in DFW homes with higher static pressure from partially closed registers elsewhere.', action: 'Remove the register and re-seat it. Tighten mounting screws. If louver tab vibrates, replace the register (typical cost $8–$25). Check if system static pressure is high from closed registers.', warning: '🔊 Rattling registers can also indicate high static pressure from undersized returns or clogged filters. Replace filter first.' },
    'Return grille (no louvers — air goes in)': { diagnosis: '⚠️ Return grille frame is loose or filter behind it is oversized and restricting airflow, causing turbulence.', action: 'Remove and re-seat the grille. If filter-behind-grille type, check filter MERV rating — high MERV filters increase static pressure. Tighten screws or use foam tape behind frame.', warning: '🔊 Filter vibration in return grilles is common with MERV-13+ filters. Consider media cabinet filter instead of return grille filters.' },
    'Not sure which type': { diagnosis: '🔍 Check airflow direction first. Then apply appropriate fix for supply or return.', action: 'Paper test to determine type. Tighten frame as first step regardless of type.', warning: '⚠️ Airflow noise increases with higher static pressure — address system-wide balance if multiple registers rattle.' },
  },
  'Weak airflow from ceiling register': {
    'Supply register (adjustable louvers — air comes out)': { diagnosis: '🔴 Check louver position first — partially closed louvers are often the simplest fix. If fully open and still weak: kinked flex duct, disconnected duct, or undersized branch duct.', action: 'Open louvers fully. If still weak: access attic and inspect flex duct run to that register for kinks, sags, or disconnections. Check that duct is properly sized (6″ duct for 100–150 CFM, 8″ for 200–250 CFM).', warning: '⚠️ In DFW, kinked flex duct from HVAC tech foot traffic is the #1 cause of suddenly weak registers. Inspect after any attic work.' },
    'Return grille (no louvers — air goes in)': { diagnosis: '⚠️ Weak return pull is usually a clogged filter, undersized return grille, or disconnected return duct in attic.', action: 'Replace filter first. Measure return grille — rule of thumb is 1 sq ft of return grille per 400 CFM of system airflow. A 3-ton system (1,200 CFM) needs 3 sq ft minimum of return grille area.', warning: '⚠️ Undersized returns are the most common design flaw in DFW tract homes. Adding a return is often more impactful than adding supply.' },
    'Not sure which type': { diagnosis: '🔍 Determine direction first. Weak supply vs weak return have completely different solutions.', action: 'Paper test. If supply is weak: check duct. If return is weak: check filter and return sizing.', warning: '⚠️ Do not confuse weak supply with strong return pull — they can feel similar but require opposite approaches.' },
  },
  'Return grille is clogged or hasn\’t been cleaned': {
    'Supply register (adjustable louvers — air comes out)': { diagnosis: '🔍 Supply registers rarely clog but dust buildup on louvers reduces airflow efficiency and looks bad.', action: 'Remove register, vacuum louvers, wash with soapy water, dry fully before reinstalling. Consider upgrading to registers with wider blade spacing for easier cleaning.', warning: '✅ Low urgency but worth doing during annual HVAC maintenance.' },
    'Return grille (no louvers — air goes in)': { diagnosis: '🔴 Critical maintenance item. Clogged return grille = restricted airflow to entire system. In DFW, this is second only to dirty filters as a system killer.', action: 'Remove grille, vacuum thoroughly, wash with warm soapy water. Replace filter behind grille if present. This should be done every 30–90 days in DFW due to construction dust and allergens.', warning: '🔴 A clogged return grille can cause: frozen evaporator coil, compressor overheating, and early system failure. Priority maintenance task in DFW.' },
    'Not sure which type': { diagnosis: '🔍 Determine type. Return grilles need cleaning much more urgently than supply registers.', action: 'Paper test to determine type. Clean whichever it is, but prioritize return grilles.', warning: '⚠️ In DFW with construction dust and seasonal allergens, return grilles should be inspected monthly during heavy HVAC use (June–September).' },
  },
};

export default function DFWRegisterAndGrilleGuide() {
  const [problem, setProblem] = useState('');
  const [registerType, setRegisterType] = useState('');
  const result = problem && registerType ? guidance[problem]?.[registerType] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🌬️ Register & Grille Guide for DFW Homes</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24, lineHeight: 1.6 }}>
          Supply registers and return grilles do different jobs and require different approaches. Misidentifying them leads to the wrong fix. Use this guide to solve common DFW airflow problems correctly.
        </p>

        <div style={{ background: '#132035', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📚 Supply vs Return — Know the Difference</h2>
          <div style={{ color: '#cbd5e1', lineHeight: 2 }}>
            <div>💨 <strong>Supply register:</strong> Air blows OUT. Has adjustable louvers. Controls direction and volume of conditioned air delivery.</div>
            <div>🔄 <strong>Return grille:</strong> Air is drawn IN. No adjustable louvers. Brings room air back to the system for reconditioning.</div>
            <div style={{ marginTop: 8, color: '#F5E642′ }}>Quick test: Hold a tissue near the register. Blows away = supply. Gets sucked in = return.</div>
          </div>
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔍 Solve Your Airflow Problem</h2>
          <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>What is the problem?</label>
          <select value={problem} onChange={e => setProblem(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', marginBottom: 16, fontSize: 14 }}>
            <option value=''>Select problem...</option>
            {problems.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Register or grille type</label>
          <select value={registerType} onChange={e => setRegisterType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
            <option value=''>Select type...</option>
            {registerTypes.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        {result && (
          <div style={{ background: '#132035', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642′ }}>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: 12 }}>{result.diagnosis}</p>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: 12 }}><strong>Action:</strong> {result.action}</p>
            <div style={{ color: '#F5E642', fontWeight: 600 }}>{result.warning}</div>
          </div>
        )}

        <div style={{ marginTop: 32, padding: '16px 20px', background: '#132035', borderRadius: 12 }}>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>⚡ Need a DFW HVAC tech to balance your system? Connect with ProLnk-verified contractors for a free quote comparison.</p>
        </div>
      </div>
    </div>
  );
}
