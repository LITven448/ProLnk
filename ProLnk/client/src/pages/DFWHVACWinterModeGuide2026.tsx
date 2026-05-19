import { useState } from 'react';

export default function DFWHVACWinterModeGuide2026() {
  const [systemType, setSystemType] = useState('');
  const [winterSituation, setWinterSituation] = useState('');

  const guides: Record<string, Record<string, string[]>> = {
    heatpump: {
      defrost: [
        '🌡️ Heat pump defrost cycle is completely normal in DFW winters',
        '💨 Steam rising from outdoor unit = refrigerant warming up the coil',
        '🔊 Clicking sounds during defrost = reversing valve switching — normal',
        '⏱️ Defrost cycle lasts 5–15 minutes then returns to heating mode',
        '✅ If indoor temps stay stable during defrost, system is working perfectly',
      ],
      emergency: [
        '⚡ Emergency Heat mode bypasses the heat pump, runs electric strips only',
        '💰 Emergency Heat costs 2–3x more to operate — use only when necessary',
        '🌡️ Use Emergency Heat ONLY if heat pump is physically damaged or frozen solid',
        '📞 Call ProLnk if you need Emergency Heat regularly — your heat pump needs service',
        '🔧 DFW winters rarely need Emergency Heat — below 20°F would warrant it',
      ],
      backup: [
        '🔥 Backup heat strips activate when outdoor temp drops below ~35°F in DFW',
        '💰 Heat strips use much more electricity — normal to see higher bills in freezes',
        '📊 A winter freeze in DFW may run strips 3–5 days max',
        '✅ Strips are a supplement, not primary heat — system alternates automatically',
      ],
    },
    furnace: {
      defrost: [
        '🔥 Gas furnaces don’t have defrost cycles — that’s heat pump territory',
        '💨 First ignition each season may produce slight burning smell (normal, 15 min)',
        '🔊 Clicking on startup = igniter sparking — completely normal',
        '✅ DFW furnaces should run smoothly all winter with annual tune-up',
      ],
      emergency: [
        '⚠️ Gas furnaces have no Emergency Heat mode — they either work or they don’t',
        '🔥 If furnace fails, use space heaters in DFW’s mild winters temporarily',
        '📞 Call ProLnk immediately for emergency furnace repair',
        '🛡️ Keep carbon monoxide detector active — cracked heat exchanger is dangerous',
      ],
      backup: [
        '🔥 Gas furnaces are highly efficient in DFW’s mild climate',
        '💰 No backup electric strips — gas is your primary and sole heat source',
        '🌡️ DFW furnaces sized for local climate — rarely need to run at full capacity',
        '🛠️ Annual tune-up in October ensures peak efficiency for winter',
      ],
    },
    minisplit: {
      defrost: [
        '❄️ Mini-split heat pump defrost is same as central heat pump — normal',
        '💨 Unit may briefly blow cool air during defrost cycle (5–10 min)',
        '🔊 Gurgling sound during defrost = refrigerant reversing — normal',
        '✅ Modern mini-splits are highly efficient down to 5°F — plenty for DFW',
      ],
      emergency: [
        '⚡ Mini-splits have no Emergency Heat switch — if unit fails, no heat',
        '📞 DFW winter failure = call ProLnk for same-day emergency service',
        '🔥 Portable heater as backup during repair wait in DFW’s mild climate',
      ],
      backup: [
        '💡 Mini-splits run on electricity — no backup heat strips unlike central heat pumps',
        '🌡️ DFW winters rarely challenge mini-split limits (designed for -15°F)',
        '💰 Mini-splits are most efficient heating option in DFW’s climate',
        '✅ No backup needed — system handles DFW winters with ease',
      ],
    },
  };

  const getGuide = () => {
    if (!systemType || !winterSituation) return null;
    return guides[systemType]?.[winterSituation] ?? null;
  };

  const guide = getGuide();

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', padding: '32px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>
            DFW HVAC Winter Mode Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Understanding your heating system during DFW winters</p>
        </div>

        <div style={{ display: 'grid', gap: 20, marginBottom: 32 }}>
          <div>
            <label style={{ color: '#F5E642', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>YOUR HEATING SYSTEM</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              {[
                { v: 'heatpump', l: '🔄 Heat Pump' },
                { v: 'furnace', l: '🔥 Gas Furnace' },
                { v: 'minisplit', l: '❄️ Mini-Split' },
              ].map(o => (
                <button key={o.v} onClick={() => setSystemType(o.v)}
                  style={{ padding: '12px 8px', borderRadius: 8, border: '2px solid', cursor: 'pointer',
                    borderColor: systemType === o.v ? '#F5E642' : '#1e3a5f',
                    backgroundColor: systemType === o.v ? '#F5E64220' : '#0d1f3c',
                    color: '#fff', fontSize: 13 }}>
                  {o.l}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ color: '#F5E642', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>WINTER SITUATION</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[
                { v: 'defrost', l: '💨 Defrost Cycle Confusion' },
                { v: 'emergency', l: '⚡ Emergency Heat Mode' },
                { v: 'backup', l: '🔋 Backup/Strip Heat' },
              ].map(o => (
                <button key={o.v} onClick={() => setWinterSituation(o.v)}
                  style={{ padding: '10px 16px', borderRadius: 8, border: '2px solid', cursor: 'pointer',
                    borderColor: winterSituation === o.v ? '#F5E642' : '#1e3a5f',
                    backgroundColor: winterSituation === o.v ? '#F5E64220' : '#0d1f3c',
                    color: '#fff', fontSize: 14 }}>
                  {o.l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {guide && (
          <div style={{ backgroundColor: '#0d1f3c', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🌡️ Your DFW Winter Heating Guide</h2>
            {guide.map((step, i) => (
              <div key={i} style={{ padding: '10px 0', borderBottom: i < guide.length - 1 ? '1px solid #1e3a5f' : 'none', fontSize: 15, lineHeight: 1.6 }}>{step}</div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 32, backgroundColor: '#F5E64215', borderRadius: 12, padding: 20, textAlign: 'center', border: '1px solid #F5E64240' }}>
          <p style={{ color: '#F5E642', fontWeight: 600, margin: '0 0 4px' }}>🔗 ProLnk Winter HVAC Specialists — DFW</p>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>Fast connections to certified DFW heating pros when winter hits.</p>
        </div>
      </div>
    </div>
  );
}
