import { useState } from 'react';

const timelines = [
  { key: 'moving_30', label: 'Moving in 30+ days' },
  { key: 'moving_14', label: 'Moving in 2 weeks' },
  { key: 'moving_7', label: 'Moving in 1 week' },
  { key: 'moving_now', label: 'Moving within days' },
];

const cityInternetOptions: Record<string, string[]> = {
  Dallas: ['AT&T Fiber (most areas)', 'Spectrum Cable', 'Google Fiber (select areas)', 'T-Mobile Home Internet'],
  Frisco: ['AT&T Fiber', 'Spectrum', 'Optimum (Celito)', 'T-Mobile Home Internet'],
  Plano: ['AT&T Fiber', 'Spectrum', 'Google Fiber (select areas)'],
  McKinney: ['AT&T Fiber', 'Spectrum', 'Frontier Fiber (expanding)'],
  'Fort Worth': ['AT&T Fiber', 'Spectrum', 'Nextlink (rural areas)'],
  Arlington: ['AT&T Fiber', 'Spectrum', 'T-Mobile Home Internet'],
  Garland: ['AT&T Fiber', 'Spectrum'],
  Prosper: ['AT&T Fiber', 'Spectrum', 'Community fiber (check HOA)'],
};

const checklistByTimeline: Record<string, { week: string; tasks: { done: boolean; text: string; urgent: boolean }[] }[]> = {
  moving_30: [
    { week: '4+ Weeks Out', tasks: [
      { done: false, text: 'Shop electricity rates at PowerToChoose.org (takes 10 min, can save $300+/yr)', urgent: false },
      { done: false, text: 'Check internet availability at new address BEFORE signing lease/closing', urgent: true },
      { done: false, text: 'Schedule internet installation (AT&T/Spectrum book out 2–3 weeks)', urgent: true },
      { done: false, text: 'Note current provider contract end dates to avoid early termination fees', urgent: false },
    ]},
    { week: '2 Weeks Out', tasks: [
      { done: false, text: 'Select electricity REP and set start date for move-in day', urgent: false },
      { done: false, text: 'Call city water dept to set up account in your name (varies by city)', urgent: false },
      { done: false, text: 'Atmos Energy gas transfer — call 888-286-6700 or online (quick, no delay)', urgent: false },
    ]},
    { week: 'Move-In Week', tasks: [
      { done: false, text: 'Confirm electricity is on before movers arrive', urgent: true },
      { done: false, text: 'Check water meter reading at close (keep photo)', urgent: false },
      { done: false, text: 'Internet install appointment confirmed for within first week', urgent: false },
    ]},
  ],
  moving_14: [
    { week: 'Do Today', tasks: [
      { done: false, text: 'Pick electricity REP NOW — use PowerToChoose.org. Same day setup possible.', urgent: true },
      { done: false, text: 'Book internet install ASAP — 1–2 week wait common', urgent: true },
      { done: false, text: 'Check internet availability at new address', urgent: true },
    ]},
    { week: 'This Week', tasks: [
      { done: false, text: 'Set up Atmos Energy gas account online or by phone', urgent: false },
      { done: false, text: 'Contact city to set up water/sewer account', urgent: false },
      { done: false, text: 'Get mobile hotspot as backup if internet install is delayed', urgent: false },
    ]},
  ],
  moving_7: [
    { week: 'Urgent — Do Now', tasks: [
      { done: false, text: '⚡ Electricity: Call REP directly, not online portal — faster activation', urgent: true },
      { done: false, text: '🌐 Internet: Request earliest available install. Consider 5G home internet as bridge.', urgent: true },
      { done: false, text: '🔥 Gas: Atmos Energy 888-286-6700 — can activate in 1–2 days', urgent: true },
      { done: false, text: '💧 Water: Usually transfers automatically from seller — confirm with title company', urgent: false },
    ]},
  ],
  moving_now: [
    { week: 'Emergency Setup', tasks: [
      { done: false, text: '⚡ ELECTRICITY FIRST: Call TXU, Reliant, or Gexa directly — emergency same-day activation possible', urgent: true },
      { done: false, text: '📱 Mobile hotspot: Buy prepaid if needed for internet bridge', urgent: true },
      { done: false, text: '🔥 Atmos Gas: Can often activate next business day — call 888-286-6700', urgent: true },
      { done: false, text: '💧 Water should be on already — if not, call city immediately', urgent: true },
    ]},
  ],
};

const depositInfo = [
  { utility: '⚡ Electricity', owner: 'Usually no deposit required', renter: '$150–$300 deposit or credit check, varies by REP' },
  { utility: '🔥 Natural Gas (Atmos)', owner: 'No deposit for good credit', renter: '$75–$150 deposit possible' },
  { utility: '💧 Water/Sewer', owner: 'No deposit — account in your name at closing', renter: '$50–$150 deposit depending on city' },
  { utility: '🌐 Internet', owner: 'No deposit typically', renter: 'Equipment deposit $100–$200 (refundable)' },
];

export default function DFWUtilitySetupGuide() {
  const [selectedCity, setSelectedCity] = useState('Dallas');
  const [timeline, setTimeline] = useState('moving_30');
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleCheck = (id: string) => {
    const next = new Set(checkedItems);
    if (next.has(id)) next.delete(id); else next.add(id);
    setCheckedItems(next);
  };

  const checklist = checklistByTimeline[timeline] || [];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOMEOWNER GUIDE</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: 0, color: '#FFFFFF' }}>🔌 DFW New Home Utility Setup</h1>
          <p style={{ color: '#8A9BB5', marginTop: 10 }}>Step-by-step utility setup for DFW new homeowners. Electricity is deregulated — you choose your provider.</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={{ display: 'block', fontSize: 12, color: '#8A9BB5', marginBottom: 8, fontWeight: 600 }}>YOUR CITY</label>
            <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}
              style={{ width: '100%', background: '#111F35', color: '#E8EDF5', border: '1px solid #2A3F5F', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}>
              {Object.keys(cityInternetOptions).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={{ display: 'block', fontSize: 12, color: '#8A9BB5', marginBottom: 8, fontWeight: 600 }}>WHEN ARE YOU MOVING?</label>
            <select value={timeline} onChange={e => setTimeline(e.target.value)}
              style={{ width: '100%', background: '#111F35', color: '#E8EDF5', border: '1px solid #2A3F5F', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}>
              {timelines.map(t => <option key={t.key} value={t.key}>{t.label}</option>)}
            </select>
          </div>
        </div>

        <div style={{ background: '#111F35', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 20 }}>✅ Your Utility Setup Checklist</h3>
          {checklist.map(section => (
            <div key={section.week} style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, color: '#8A9BB5', fontWeight: 700, marginBottom: 12, letterSpacing: 1 }}>{section.week.toUpperCase()}</div>
              {section.tasks.map((task, i) => {
                const id = `${section.week}-${i}`;
                const done = checkedItems.has(id);
                return (
                  <div key={id} onClick={() => toggleCheck(id)}
                    style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '12px 14px', borderRadius: 10, marginBottom: 8, cursor: 'pointer',
                      background: done ? '#052e16′ : task.urgent ? '#2a1c0a' : '#0A1628',
                      border: `1px solid ${done ? '#4ade8040' : task.urgent ? '#F5E64230' : '#1A2E4A'}` }}>
                    <div style={{ fontSize: 20, marginTop: 1 }}>{done ? '✅' : task.urgent ? '🔴' : '⬜'}</div>
                    <div style={{ color: done ? '#4ade80′ : '#CBD5E1', fontSize: 14, lineHeight: 1.6, textDecoration: done ? ’line-through' : 'none', opacity: done ? 0.7 : 1 }}>{task.text}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div style={{ background: '#111F35', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h3 style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🌐 Internet in {selectedCity}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {(cityInternetOptions[selectedCity] || []).map(provider => (
              <span key={provider} style={{ background: '#1A2E4A', border: '1px solid #2A3F5F', borderRadius: 8, padding: '8px 16px', fontSize: 14, color: '#CBD5E1′ }}>{provider}</span>
            ))}
          </div>
          <p style={{ color: '#8A9BB5', fontSize: 13, marginTop: 16 }}>⚠️ Always check availability at your specific address — fiber coverage varies block by block in DFW.</p>
        </div>

        <div style={{ background: '#111F35', borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>💰 Deposit Guide: Owner vs. Renter</h3>
          {depositInfo.map(row => (
            <div key={row.utility} style={{ display: 'grid', gridTemplateColumns: '130px 1fr 1fr', gap: 12, marginBottom: 14, alignItems: 'start' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{row.utility}</div>
              <div style={{ color: '#4ade80', fontSize: 13 }}>🏠 {row.owner}</div>
              <div style={{ color: '#facc15', fontSize: 13 }}>🔑 {row.renter}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
