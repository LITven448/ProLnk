import { useState } from 'react';

type ToolResult = { primaryTool: string; backupTool: string; technique: string; hardWaterNote: string; dontUse: string };

const toolMap: Record<string, ToolResult> = {
  'shutoff-gate': {
    primaryTool: '14″ Pipe Wrench (Ridgid or Irwin)',
    backupTool: '10″ Adjustable Crescent Wrench',
    technique: 'Wrap pipe with rubber to protect finish. Turn pipe wrench clockwise for grip — teeth bite harder under pressure. Counter-clockwise to loosen. Keep jaw opening slightly smaller than pipe diameter.',
    hardWaterNote: 'DFW hard water (350+ ppm) calcifies gate valve stems. Spray PB Blaster, wait 20min before forcing. Forcing dry cracks old gate valves — very common in pre-1990 DFW homes.',
    dontUse: 'Slip-joint pliers — they round off valve handles. Channel locks without rubber — scratch copper supply lines.',
  },
  'shutoff-ball': {
    primaryTool: '10″ Groove-Joint (Channel-Lock) Pliers',
    backupTool: 'Adjustable Wrench',
    technique: 'Ball valves turn 90 degrees only. Parallel to pipe = open, perpendicular = closed. One firm turn is all you need — don\’t over-crank.',
    hardWaterNote: 'DFW ball valves seize in the open position if not operated for years. Turn periodically to prevent mineral lock. If seized: WD-40 at the stem, wait 30min, use two wrenches (one to hold pipe, one to turn).',
    dontUse: 'Pipe wrenches on ball valve handles — the square handle deforms. Pliers alone without holding the body — you\’ll spin the whole valve off.',
  },
  'supply-line': {
    primaryTool: 'Basin Wrench (long-handled specialty tool)',
    backupTool: '8″ Channel-Lock Pliers (angled)',
    technique: 'Basin wrench reaches into tight spaces under sinks. Extend handle, hook jaw on nut, rotate. For supply line nuts at the valve: finger-tighten then 1/4 turn with pliers — no more or you crack the ferrule.',
    hardWaterNote: 'DFW supply lines calcify at both ends. If braided stainless line is stiff or shows white crust: replace it — $8 at any hardware store. Old corrugated metal lines are failure risks in DFW hard water and should be replaced.',
    dontUse: 'Full pipe wrench on supply line connection nuts — too much torque cracks brass fittings. Don\’t reuse old compression ferrules.',
  },
  'trap-p': {
    primaryTool: '10″ Channel-Lock Pliers (groove joint)',
    backupTool: 'Hand-tight only (most PVC P-traps)',
    technique: 'Hand-tighten slip-joint nuts first, then 1/4 turn with pliers. Overtightening cracks PVC traps — very common mistake. White Teflon tape on metal threads only (not needed for slip joints).',
    hardWaterNote: 'DFW P-traps get heavy calcium buildup in hard water. White deposits inside trap = normal. Black sludge = bacteria from slow drains. Clean with half-cup baking soda + half-cup vinegar monthly.',
    dontUse: 'Pipe wrenches on PVC fittings — they crack and deform. Metal P-traps are still sold but DFW water chemistry corrodes chrome traps in 3-5 years — use PVC.',
  },
  'hose-outdoor': {
    primaryTool: '12″ Pipe Wrench',
    backupTool: '10″ Locking Pliers (Vise-Grips)',
    technique: 'Outdoor hose bibs corrode in DFW heat-cold cycles. Isolate supply inside before working. Use pipe wrench on the hex fitting behind the bib, not on the stem. Hold the bib body with a second wrench to avoid spinning the whole assembly in the wall.',
    hardWaterNote: 'DFW freeze-thaw cycles (rare but real — Feb 2021 event) crack hose bibs. After any hard freeze: inspect before spring use. Frost-free sillcocks (12″ long) are standard in DFW — if yours is shorter, upgrade.',
    dontUse: 'Adjustable wrench directly on the bib body — you\’ll round off the hex. Don\’t use thread sealant on the outlet where the hose attaches.',
  },
  'leak-compression': {
    primaryTool: '8″ + 10″ Open-End Wrenches (matched pair)',
    backupTool: '8″ Adjustable Wrench + Channel-Lock',
    technique: 'Always use two wrenches: one to hold the body, one to turn the nut. Turn compression nut clockwise to tighten. If still leaking after snug: disassemble, replace compression ring (ferrule) — they cannot be reused in DFW hard water conditions.',
    hardWaterNote: 'DFW hard water deposits form on ferrule sealing surface causing slow drips that worsen over time. WD-40 on a corroded nut; penetrating oil for 30min if really stuck. Old compression fittings in DFW homes (pre-1980) may have lead solder upstream — don\’t disturb beyond the compression joint.',
    dontUse: 'Pipe tape on compression joints — the ferrule does the sealing, not tape. Pliers directly on tubing — you\’ll crush soft copper.',
  },
};

export default function DFWPipeWrenchGuide() {
  const [task, setTask] = useState('');
  const [result, setResult] = useState<ToolResult | null>(null);

  function calculate() {
    if (!task) return;
    setResult(toolMap[task] || null);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🔧</span>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Plumbing Tool Guide</h1>
        </div>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>
          DFW's hard water (350+ ppm) corrodes and calcifies plumbing faster than most cities. Know your tools and DFW-specific gotchas.
        </p>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>💧 DFW Hard Water Tool Impact</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              'DFW water is 350+ ppm hardness — joints calcify in 5-10 years',
              'Calcium deposits on valve stems are white/grey crust — use penetrating oil, never force',
              'Steel and chrome corrode fast in DFW — use brass or PVC fittings when replacing',
              'Pipe wrenches collect mineral buildup in the jaw — clean and oil after each use',
            ].map(f => (
              <div key={f} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 12, fontSize: 13, color: '#CBD5E1', borderLeft: '3px solid #4FC3F7′ }}>
                💧 {f}
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🎯 Find Your Tool</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>Plumbing Task</label>
            <select value={task} onChange={e => setTask(e.target.value)}
              style={{ width: '100%', backgroundColor: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '12px 14px', fontSize: 14 }}>
              <option value="">Select your task...</option>
              <option value="shutoff-gate">Turning off a gate valve (older DFW home)</option>
              <option value="shutoff-ball">Turning off a ball valve (modern DFW home)</option>
              <option value="supply-line">Disconnecting sink / toilet supply line</option>
              <option value="trap-p">Removing / replacing P-trap under sink</option>
              <option value="hose-outdoor">Replacing outdoor hose bib / spigot</option>
              <option value="leak-compression">Tightening leaking compression fitting</option>
            </select>
          </div>
          <button onClick={calculate}
            style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Get DFW Tool Recommendation →
          </button>
        </div>

        {result && (
          <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642′ }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#F5E642', fontSize: 11, fontWeight: 700, marginBottom: 6 }}>🔧 PRIMARY TOOL</div>
                <div style={{ color: '#E8EDF5', fontSize: 14, fontWeight: 600 }}>{result.primaryTool}</div>
              </div>
              <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#94A3B8', fontSize: 11, fontWeight: 700, marginBottom: 6 }}>🔩 BACKUP TOOL</div>
                <div style={{ color: '#CBD5E1', fontSize: 14 }}>{result.backupTool}</div>
              </div>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 12 }}>
              <div style={{ color: '#F5A623', fontSize: 11, fontWeight: 700, marginBottom: 6 }}>📋 TECHNIQUE</div>
              <div style={{ color: '#CBD5E1', fontSize: 14 }}>{result.technique}</div>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 12, borderLeft: '3px solid #4FC3F7′ }}>
              <div style={{ color: '#4FC3F7', fontSize: 11, fontWeight: 700, marginBottom: 6 }}>💧 DFW HARD WATER NOTE</div>
              <div style={{ color: '#CBD5E1', fontSize: 13 }}>{result.hardWaterNote}</div>
            </div>
            <div style={{ backgroundColor: '#1a0a0a', borderRadius: 8, padding: 14, borderLeft: '3px solid #FF6B6B' }}>
              <div style={{ color: '#FF6B6B', fontSize: 11, fontWeight: 700, marginBottom: 6 }}>🚫 DON'T USE</div>
              <div style={{ color: '#CBD5E1', fontSize: 13 }}>{result.dontUse}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
