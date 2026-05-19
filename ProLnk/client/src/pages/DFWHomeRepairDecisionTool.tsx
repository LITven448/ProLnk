import { useState } from 'react';

type Problem = 'HVAC not cooling' | 'Drain slow' | 'Flickering lights' | 'Foundation crack' | 'Roof leak';

const problems: Problem[] = ['HVAC not cooling', 'Drain slow', 'Flickering lights', 'Foundation crack', 'Roof leak'];

type TreeNode = { q: string; yes: TreeNode | string; no: TreeNode | string };

const trees: Record<Problem, TreeNode> = {
  'HVAC not cooling': {
    q: 'Is the thermostat set to COOL and fan set to AUTO?',
    yes: { q: 'Is the air filter clogged (hasn\’t been changed in 3+ months)?', yes: 'DIY: Replace filter — DFW dust clogs filters fast. Run system 30 min after.', no: { q: 'Is the outdoor unit running (can you hear/see it)?', yes: { q: 'Is there ice on the refrigerant lines outside?', yes: 'Call HVAC Pro: Frozen coil — turn system off, run fan only 2hrs, then call. Do not ignore.', no: 'Call HVAC Pro: System running but not cooling — likely low refrigerant or failing compressor.' }, no: 'Call HVAC Pro: Outdoor unit not starting — capacitor, contactor, or electrical failure. Do not DIY.' } },
    no: 'DIY: Fix thermostat settings first. Check batteries if it\’s wireless. DFW tip: Set to 78°F, not lower.',
  },
  'Drain slow': {
    q: 'Is it only one drain slow (not multiple throughout the house)?',
    yes: { q: 'Is it the bathroom sink or shower?', yes: 'DIY: Remove drain cover, clear hair/soap blockage with drain snake or Zip-It tool. Most DFW slow drains are hair buildup.', no: { q: 'Is it the kitchen sink?', yes: 'DIY: Pour boiling water + baking soda + vinegar first. If no improvement, use a plunger. Grease buildup common in DFW.', no: 'Call Plumber: Toilet or floor drain — could be main line issue.' } },
    no: 'Emergency Plumber: Multiple slow drains = main sewer line blockage. DFW clay soil can cause pipe shifts — call now.',
  },
  'Flickering lights': {
    q: 'Does it flicker in just one room / one circuit?',
    yes: { q: 'Is it only one specific bulb or fixture?', yes: 'DIY: Tighten the bulb. Replace it. If LED, try a different brand — DFW power fluctuations affect cheap LEDs.', no: 'Call Electrician: One circuit flickering = loose connection or breaker issue. Do not ignore — fire hazard.' },
    no: { q: 'Does it happen when large appliances (AC, dryer) turn on?', yes: 'Call Electrician: Voltage drop from high-load appliances — DFW summer AC draw is extreme. Panel capacity check needed.', no: 'Emergency Electrician: Whole-home flickering = utility issue or failing main panel. Call immediately.' },
  },
  'Foundation crack': {
    q: 'Is the crack horizontal (running side to side)?',
    yes: 'Emergency Structural Engineer: Horizontal cracks indicate serious lateral pressure — DFW clay soil is notorious for this. Do not wait.',
    no: { q: 'Is the crack wider than 1/4 inch (width of a pencil)?', yes: 'Call Foundation Specialist: Large vertical or diagonal crack needs professional evaluation. DFW homes move constantly.', no: { q: 'Are doors or windows sticking that weren\’t before?', yes: 'Call Foundation Specialist: Hairline crack + sticking doors = active movement. Get pier evaluation.', no: 'Monitor: Small hairline cracks in DFW clay-soil areas are common. Photograph it with a ruler and check in 30 days. No immediate action needed.' } },
  },
  'Roof leak': {
    q: 'Is water actively dripping inside right now?',
    yes: 'Emergency Roofer: Place buckets, move valuables. Call emergency roofer — DFW storms can turn small leaks catastrophic. Document with photos for insurance.',
    no: { q: 'Did you notice it after a recent hailstorm?', yes: 'Call Roofer + Insurance: DFW hail claims are common. Get 2–3 estimates before accepting insurance adjuster\’s number. Don\’t sign with storm chasers.', no: { q: 'Is the stain near a chimney, vent, or skylight?', yes: 'Call Roofer: Flashing failure around penetrations — most common non-storm leak in DFW. Usually a targeted repair.', no: 'Call Roofer for Inspection: Unidentified leaks need eyes on the roof. Don\’t DIY roof walking in DFW summer heat.' } },
  },
};

function renderResult(result: string) {
  const isEmergency = result.includes('Emergency');
  const isDIY = result.startsWith('DIY');
  const color = isEmergency ? '#F87171′ : isDIY ? '#4ADE80' : '#F5E642';
  const label = isEmergency ? '🚨 Emergency Service Needed' : isDIY ? '🔧 DIY Fix' : '📞 Call a Pro';
  return (
    <div style={{ background: '#0F2240', borderRadius: 12, padding: '20px', borderLeft: `4px solid ${color}` }}>
      <div style={{ color, fontWeight: 700, marginBottom: 8 }}>{label}</div>
      <div style={{ color: '#E2E8F0', lineHeight: 1.6 }}>{result}</div>
    </div>
  );
}

export default function DFWHomeRepairDecisionTool() {
  const [problem, setProblem] = useState<Problem | ''>('');
  const [path, setPath] = useState<Array<'yes' | 'no'>>([]);

  const getNode = (): TreeNode | string | null => {
    if (!problem) return null;
    let node: TreeNode | string = trees[problem];
    for (const step of path) {
      if (typeof node === 'string') return node;
      node = node[step];
    }
    return node;
  };

  const current = getNode();
  const reset = () => { setProblem(''); setPath([]); };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', padding: '32px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME REPAIR</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Repair Decision Tree</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>Describe your problem — get: DIY fix / call a pro / call emergency service.</p>

        {!problem && (
          <div>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 14 }}>What\'s the problem?</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {problems.map(p => (
                <button key={p} onClick={() => { setProblem(p); setPath([]); }}
                  style={{ padding: '14px 18px', borderRadius: 10, background: '#0F2240', border: '1.5px solid #1E3A5F', color: '#fff', fontWeight: 600, fontSize: 15, cursor: 'pointer', textAlign: 'left' }}>
                  {p === 'HVAC not cooling' ? '❄️' : p === 'Drain slow' ? '🚿' : p === 'Flickering lights' ? '💡' : p === 'Foundation crack' ? '🏚️' : '🌧️'} {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {problem && current !== null && typeof current !== 'string' && (
          <div>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>Problem: <span style={{ color: '#F5E642′ }}>{problem}</span></div>
            <div style={{ background: '#0F2240', borderRadius: 12, padding: '20px', marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 20 }}>❓ {current.q}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <button onClick={() => setPath([...path, 'yes'])}
                  style={{ padding: '12px', borderRadius: 8, background: '#0A3020', border: '1.5px solid #4ADE80', color: '#4ADE80', fontWeight: 700, cursor: 'pointer' }}>
                  ✅ Yes
                </button>
                <button onClick={() => setPath([...path, 'no'])}
                  style={{ padding: '12px', borderRadius: 8, background: '#3A0A0A', border: '1.5px solid #F87171', color: '#F87171', fontWeight: 700, cursor: 'pointer' }}>
                  ❌ No
                </button>
              </div>
            </div>
            <button onClick={reset} style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: 13 }}>← Start over</button>
          </div>
        )}

        {problem && typeof current === 'string' && (
          <div>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 16 }}>Problem: <span style={{ color: '#F5E642′ }}>{problem}</span></div>
            {renderResult(current)}
            <button onClick={reset} style={{ marginTop: 20, background: 'transparent', border: '1.5px solid #1E3A5F', color: '#94A3B8', borderRadius: 8, padding: '10px 18px', cursor: 'pointer', fontSize: 13 }}>← Diagnose another problem</button>
          </div>
        )}
      </div>
    </div>
  );
}
