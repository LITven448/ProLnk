import { useState } from 'react';

export default function DFWSeasonalHVACOdorGuide2026() {
  const [smell, setSmell] = useState('');
  const [situation, setSituation] = useState('');

  type SmellKey = 'burning-dust' | 'musty' | 'sweet' | 'rotten-egg' | 'burning-plastic';
  type SituationKey = 'first-heat' | 'ac-start' | 'new-coil';

  const assessments: Partial<Record<SmellKey, Partial<Record<SituationKey, { status: string; color: string; steps: string[] }>>>> = {
    'burning-dust': {
      'first-heat': {
        status: '✅ NORMAL', color: '#22c55e',
        steps: [
          '🔥 Burning dust smell on first heat use = completely normal',
          '⏱️ Should clear within 15–30 minutes as dust burns off heating elements',
          '🪟 Open a window slightly during first run to vent the smell faster',
          '🔄 If smell persists beyond 45 minutes, change your air filter',
        ],
      },
    },
    'musty': {
      'ac-start': {
        status: '⚠️ LIKELY NORMAL — ACT NOW', color: '#f59e0b',
        steps: [
          '💨 Musty smell at AC startup = old filter or minor mold on coil',
          '🔄 Change air filter immediately — this alone often eliminates the smell',
          '🧪 Drop drain pan tablet to kill any algae in the drain pan',
          '📞 If smell returns after filter change, call ProLnk for coil inspection',
        ],
      },
    },
    'sweet': {
      'new-coil': {
        status: '✅ NORMAL — NEW COIL COATING', color: '#22c55e',
        steps: [
          '🍬 Sweet smell after coil replacement = factory coating burning off',
          '⏱️ Fades within 2–5 operating hours — completely harmless',
          '🪟 Ventilate during first few run cycles to speed dissipation',
          '✅ No action needed — enjoy your new coil!',
        ],
      },
    },
    'rotten-egg': {
      'first-heat': {
        status: '🚨 NOT NORMAL — GAS LEAK', color: '#ef4444',
        steps: [
          '🚨 Rotten egg smell = potential gas leak — DO NOT IGNORE',
          '🚪 Leave the house immediately, do not flip any switches',
          '📞 Call Atmos Energy: 1-888-286-6700 from outside',
          '🔧 Do not re-enter until cleared by a professional',
        ],
      },
      'ac-start': {
        status: '🚨 NOT NORMAL — CALL NOW', color: '#ef4444',
        steps: [
          '🚨 Rotten egg from AC could indicate a critter in ductwork',
          '🔍 Check all vents for debris or blockage before calling',
          '📞 Call ProLnk immediately for duct inspection',
          '🚪 If smell is strong and pervasive, evacuate and call gas company',
        ],
      },
    },
    'burning-plastic': {
      'first-heat': {
        status: '🚨 NOT NORMAL — SHUT OFF', color: '#ef4444',
        steps: [
          '🚨 Burning plastic smell = wiring issue or foreign object on heat strip',
          '⚡ Turn off HVAC at thermostat AND at breaker immediately',
          '🔍 Check vents for any plastic debris a child or pet may have dropped',
          '📞 Call ProLnk for emergency HVAC inspection before restarting',
        ],
      },
    },
  };

  const getResult = () => {
    if (!smell || !situation) return null;
    return (assessments[smell as SmellKey] as any)?.[situation] ?? null;
  };

  const result = getResult();

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', padding: '32px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>👃</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>
            DFW HVAC First-Use Odor Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Normal smells vs. warning signs when your DFW HVAC starts up</p>
        </div>

        <div style={{ display: 'grid', gap: 20, marginBottom: 32 }}>
          <div>
            <label style={{ color: '#F5E642', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>WHAT DO YOU SMELL?</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { v: 'burning-dust', l: '🔥 Burning Dust' },
                { v: 'musty', l: '💨 Musty/Stale' },
                { v: 'sweet', l: '🍬 Sweet/Chemical' },
                { v: 'rotten-egg', l: '🥚 Rotten Egg' },
                { v: 'burning-plastic', l: '🔌 Burning Plastic' },
              ].map(o => (
                <button key={o.v} onClick={() => setSmell(o.v)}
                  style={{ padding: '12px', borderRadius: 8, border: '2px solid', cursor: 'pointer',
                    borderColor: smell === o.v ? '#F5E642′ : '#1e3a5f',
                    backgroundColor: smell === o.v ? '#F5E64220′ : '#0d1f3c',
                    color: '#fff', fontSize: 14 }}>
                  {o.l}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ color: '#F5E642', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>WHEN IS IT HAPPENING?</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[
                { v: 'first-heat', l: '🌡️ First Heat Use' },
                { v: 'ac-start', l: '❄️ AC Startup' },
                { v: 'new-coil', l: '🔧 New Coil Install' },
              ].map(o => (
                <button key={o.v} onClick={() => setSituation(o.v)}
                  style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', cursor: 'pointer',
                    borderColor: situation === o.v ? '#F5E642′ : '#1e3a5f',
                    backgroundColor: situation === o.v ? '#F5E64220′ : '#0d1f3c',
                    color: '#fff', fontSize: 14 }}>
                  {o.l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {result && (
          <div style={{ backgroundColor: '#0d1f3c', borderRadius: 12, padding: 24, border: `2px solid ${result.color}` }}>
            <div style={{ color: result.color, fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{result.status}</div>
            {result.steps.map((step: string, i: number) => (
              <div key={i} style={{ padding: '10px 0', borderBottom: i < result.steps.length - 1 ? '1px solid #1e3a5f' : 'none', fontSize: 15 }}>{step}</div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 32, backgroundColor: '#F5E64215', borderRadius: 12, padding: 20, textAlign: 'center', border: '1px solid #F5E64240′ }}>
          <p style={{ color: '#F5E642', fontWeight: 600, margin: '0 0 4px' }}>🔗 ProLnk DFW HVAC Pros Standing By</p>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>Get connected with certified DFW HVAC techs for any smell that concerns you.</p>
        </div>
      </div>
    </div>
  );
}
