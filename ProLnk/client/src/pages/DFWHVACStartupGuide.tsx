import { useState } from 'react';

type Situation = 'first-time' | 'smells' | 'not-cooling' | 'noisy' | 'wont-start';

const situations: { id: Situation; label: string; question: string }[] = [
  { id: 'first-time', label: '❄️ First Startup Ever', question: 'Turning AC on for the first time this spring in DFW' },
  { id: 'smells', label: '👃 Strange Smells', question: 'AC is running but I notice unusual odors' },
  { id: 'not-cooling', label: '🌡️ Not Cooling', question: 'System runs but house stays warm' },
  { id: 'noisy', label: '🔊 Making Noise', question: 'Hearing sounds I haven\’t heard before' },
  { id: 'wont-start', label: '❌ Won\’t Start', question: 'System won\’t turn on at all' },
];

const guidance: Record<Situation, { normal: string[]; notNormal: string[]; steps: string[]; callNow: boolean; callTip: string }> = {
  'first-time': {
    normal: ['Brief burning smell first 15-30 min (dust burning off coils)', 'Clicking sounds at startup', 'System runs longer first cycle to pull down house temp', 'Slight refrigerant gurgling sound'],
    notNormal: ['No cold air after 20 minutes running', 'Loud grinding or screaming from outdoor unit', 'Tripping circuit breaker', 'Ice forming on any component'],
    steps: ['Set thermostat to COOL, 3° below current temp', 'Replace filter before starting (mandatory in DFW spring)', 'Clear debris from around outdoor condenser', 'Check that condenser disconnect is on (gray box near unit)', 'Run 20 minutes, check supply registers for cold air', 'Let system run full cycle — don\’t short-cycle by adjusting thermostat repeatedly'],
    callNow: false,
    callTip: 'If you\’re not getting cold air after 20-30 min of normal startup, call — refrigerant may have leaked over winter.',
  },
  'smells': {
    normal: ['Musty smell first 10-15 min (condensate pan drying out)', 'Faint dusty smell on first cool day (dust on coils)', 'Slight electrical smell first run of season'],
    notNormal: ['Rotten egg / sulfur smell — possible gas leak, evacuate and call 911', 'Burning plastic smell continuing after 20 min', 'Mildew that doesn\’t clear — dirty evaporator coil', 'Sweet chemical smell — refrigerant leak'],
    steps: ['Open windows briefly to air out on first startup', 'Check that drain pan is empty and clean', 'Replace filter if musty smell persists', 'Schedule coil cleaning if mildew persists after filter change'],
    callNow: true,
    callTip: 'Burning plastic or sweet refrigerant smell = shut system off and call. Never ignore refrigerant odor.',
  },
  'not-cooling': {
    normal: ['First 30 min may not cool well — system pulling down from setback temp', 'Humid DFW days make it feel warmer even when system is working'],
    notNormal: ['Supply air isn\’t cold (hold hand at vent)', 'Outdoor unit not running but air handler is', 'Ice on indoor or outdoor unit', 'Circuit breaker tripped for condenser'],
    steps: ['Check thermostat is in COOL mode, fan AUTO', 'Replace filter — clogged filter is #1 cause of poor cooling in DFW', 'Check outdoor unit is running (should hear compressor humming)', 'Check outdoor disconnect box is switched on', 'Inspect visible ductwork for disconnected sections', 'Give system 1 hour before calling — initial pull-down takes time'],
    callNow: false,
    callTip: 'If outdoor unit isn\’t running, check the breaker at the electrical panel first. Then call if breaker is fine.',
  },
  'noisy': {
    normal: ['Clicking at startup/shutdown (normal relay sound)', 'Whooshing air sound from vents', 'Occasional gurgling in refrigerant lines', 'Expansion/contraction ticking in ducts'],
    notNormal: ['Grinding or screeching from outdoor unit — bearing failure', 'Banging or clanking — loose component or debris in unit', 'High-pitched squealing from air handler — blower belt or bearing', 'Rattling ductwork — disconnected section or debris'],
    steps: ['Listen to identify source: indoor unit, outdoor unit, or ductwork', 'Turn system off if grinding or screeching', 'Check outdoor unit for visible debris (leaves, sticks) in cabinet', 'Check filter — restricted filter causes air handler to sound strained'],
    callNow: true,
    callTip: 'Grinding from outdoor unit = compressor or fan motor bearing failure. Turn off and call — running it causes more damage.',
  },
  'wont-start': {
    normal: [],
    notNormal: ['Nothing happens when thermostat is set to cool', 'Air handler runs but outdoor unit doesn\’t', 'System trips breaker immediately on startup'],
    steps: ['Check thermostat batteries (replace if 1+ year old)', 'Check circuit breaker for both air handler and condenser', 'Check outdoor disconnect box (gray box near condenser)', 'Verify thermostat is in COOL mode, set below current temp', 'Wait 30 min — high-pressure lockout resets automatically', 'Check for error code flashing on air handler board'],
    callNow: false,
    callTip: 'Breaker trips immediately on startup = compressor may be seized. Don\’t reset repeatedly — call for diagnosis.',
  },
};

export default function DFWHVACStartupGuide() {
  const [situation, setSituation] = useState<Situation | null>(null);
  const active = situation ? guidance[situation] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 40 }}>🌅</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW HVAC First Startup Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>What to do when turning on your AC for DFW's first hot day — what's normal, what's not</p>
        </div>

        <div style={{ marginBottom: 28 }}>
          <div style={{ color: '#64748B', fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>WHAT'S YOUR SITUATION?</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSituation(situation === s.id ? null : s.id)}
                style={{ background: situation === s.id ? '#1E3A5F' : '#0F2237', border: `2px solid ${situation === s.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '14px 10px', cursor: 'pointer', color: situation === s.id ? '#F5E642' : '#CBD5E1', fontSize: 13, fontWeight: 600, textAlign: 'center' }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {active && situation ? (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              {active.normal.length > 0 && (
                <div style={{ background: '#0F2237', border: '1px solid #14532D', borderRadius: 12, padding: 20 }}>
                  <div style={{ color: '#86EFAC', fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>✅ NORMAL — DON'T WORRY</div>
                  {active.normal.map((n, i) => <p key={i} style={{ color: '#CBD5E1', fontSize: 13, lineHeight: 1.6, margin: '0 0 8px' }}>• {n}</p>)}
                </div>
              )}
              <div style={{ background: '#0F2237', border: '1px solid #7F1D1D', borderRadius: 12, padding: 20 }}>
                <div style={{ color: '#FCA5A5', fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>⚠️ NOT NORMAL — ACT</div>
                {active.notNormal.map((n, i) => <p key={i} style={{ color: '#CBD5E1', fontSize: 13, lineHeight: 1.6, margin: '0 0 8px' }}>• {n}</p>)}
              </div>
            </div>

            <div style={{ background: '#0F2237', border: '1px solid #1E3A5F', borderRadius: 12, padding: 20, marginBottom: 16 }}>
              <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>📋 WHAT TO CHECK FIRST</div>
              {active.steps.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, minWidth: 20 }}>{i + 1}.</span>
                  <p style={{ color: '#CBD5E1', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{s}</p>
                </div>
              ))}
            </div>

            <div style={{ background: active.callNow ? '#7F1D1D' : '#0F2237', border: `1px solid ${active.callNow ? '#FCA5A5' : '#1E3A5F'}`, borderRadius: 10, padding: 16 }}>
              <div style={{ color: active.callNow ? '#FCA5A5' : '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{active.callNow ? '📞 CALL A TECH' : '💡 TECH TIP'}</div>
              <p style={{ color: '#CBD5E1', fontSize: 13, lineHeight: 1.7, margin: 0 }}>{active.callTip}</p>
            </div>
          </div>
        ) : (
          <div style={{ background: '#0F2237', border: '2px dashed #1E3A5F', borderRadius: 14, padding: 32, textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>☀️</div>
            <p style={{ color: '#64748B', margin: 0 }}>Pick your situation above to get DFW-specific startup guidance</p>
          </div>
        )}
      </div>
    </div>
  );
}
