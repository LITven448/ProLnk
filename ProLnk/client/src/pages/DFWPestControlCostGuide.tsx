import { useState } from 'react';

const PEST_DATA: Record<string, { label: string; oneTime: [number, number]; quarterly: [number, number]; monthly: [number, number]; diy: string; dfwNote: string; urgency: string }> = {
  termites: { label: 'Termites', oneTime: [800, 2500], quarterly: [300, 500], monthly: [0, 0], diy: 'Not recommended', dfwNote: 'DFW has high subterranean termite pressure — Formosan and Eastern species are both active. Annual monitoring is essential.', urgency: 'High' },
  mosquitoes: { label: 'Mosquitoes', oneTime: [75, 200], quarterly: [180, 400], monthly: [50, 150], diy: 'Moderate', dfwNote: 'West Nile risk is real in DFW. Professional barrier spray is far more effective than consumer products in humid summers.', urgency: 'Medium' },
  rats_mice: { label: 'Rats / Mice', oneTime: [300, 600], quarterly: [200, 400], monthly: [80, 150], diy: 'Difficult', dfwNote: 'DFW construction boom pushes rodents into established neighborhoods. Entry sealing (exclusion) is as important as trapping.', urgency: 'High' },
  roaches: { label: 'Cockroaches', oneTime: [150, 350], quarterly: [180, 360], monthly: [60, 120], diy: 'Moderate', dfwNote: 'American cockroaches thrive in DFW\’s warm, humid conditions. German cockroaches require professional-grade gel bait.', urgency: 'Medium' },
  ants: { label: 'Fire Ants / Carpenter Ants', oneTime: [100, 250], quarterly: [150, 300], monthly: [50, 100], diy: 'Easy (fire ants)', dfwNote: 'DFW fire ant mounds reappear annually. Fire Ant Xpress programs $29–$49 one-time are effective for yards.', urgency: 'Low-Medium' },
  wasps_bees: { label: 'Wasps / Bees', oneTime: [75, 250], quarterly: [0, 0], monthly: [0, 0], diy: 'Risky', dfwNote: 'Africanized honey bees are present in South DFW — do not attempt DIY removal. Call a licensed pest control or beekeeper.', urgency: 'Medium-High' },
  scorpions: { label: 'Scorpions', oneTime: [150, 350], quarterly: [200, 400], monthly: [70, 140], diy: 'Limited', dfwNote: 'Striped bark scorpions are common in West Fort Worth and Weatherford areas. Exclusion + residual spray is the only reliable method.', urgency: 'High' },
  fleas_ticks: { label: 'Fleas / Ticks', oneTime: [150, 400], quarterly: [200, 450], monthly: [65, 130], diy: 'Moderate', dfwNote: 'Lone Star ticks are common in DFW green spaces. Inside-outside treatment required — yard treatment without interior treatment fails.', urgency: 'Medium' },
};

export default function DFWPestControlCostGuide() {
  const [selectedPests, setSelectedPests] = useState<string[]>([]);
  const [propertySize, setPropertySize] = useState('');
  const [frequency, setFrequency] = useState('');
  const [result, setResult] = useState<null | { diyTotal: number; quarterlyTotal: number; monthlyTotal: number; bestValue: string; pestDetails: Array<typeof PEST_DATA.termites & { key: string }> }>(null);

  function togglePest(key: string) {
    setSelectedPests(prev => prev.includes(key) ? prev.filter(p => p !== key) : [...prev, key]);
  }

  function estimate() {
    if (selectedPests.length === 0 || !propertySize) return;
    const mult = propertySize === 'small' ? 0.85 : propertySize === 'large' ? 1.25 : 1;
    let diyTotal = 0, quarterlyTotal = 0, monthlyTotal = 0;
    const pestDetails = selectedPests.map(key => ({ ...PEST_DATA[key], key }));
    pestDetails.forEach(p => {
      diyTotal += (p.oneTime[0] + p.oneTime[1]) / 2 * mult * 0.3;
      quarterlyTotal += p.quarterly[1] > 0 ? (p.quarterly[0] + p.quarterly[1]) / 2 * mult : (p.oneTime[0] + p.oneTime[1]) / 2 * mult;
      monthlyTotal += p.monthly[1] > 0 ? (p.monthly[0] + p.monthly[1]) / 2 * mult : (p.oneTime[0] + p.oneTime[1]) / 2 * mult;
    });
    const bestValue = quarterlyTotal < monthlyTotal * 0.9 ? 'Quarterly Plan' : 'Monthly Plan';
    setResult({ diyTotal: Math.round(diyTotal), quarterlyTotal: Math.round(quarterlyTotal), monthlyTotal: Math.round(monthlyTotal), bestValue, pestDetails });
  }

  const pill = (label: string, val: string, current: string, set: (v: string) => void) => (
    <button key={val} onClick={() => set(val)} style={{
      padding: '8px 16px', borderRadius: 20, border: '2px solid',
      borderColor: current === val ? '#F5E642′ : '#2A3A5C',
      background: current === val ? '#F5E642′ : ’transparent',
      color: current === val ? '#0A1628′ : '#CBD5E1',
      cursor: 'pointer', fontWeight: 600, fontSize: 13, margin: '4px 6px 4px 0'
    }}>{label}</button>
  );

  const urgencyColor = (u: string) => u === 'High' ? '#F97316′ : u.startsWith(’Medium-High') ? '#F59E0B' : u.startsWith('Medium') ? '#F5E642′ : '#22C55E';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#CBD5E1', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME SERVICES GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F1F5F9', margin: '0 0 8px' }}>DFW Pest Control Cost Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, lineHeight: 1.7 }}>
          DFW's hot, humid climate and rapid growth create <strong style={{ color: '#F5E642' }}>year-round pest pressure</strong>. Select your pests, property size, and see whether DIY, quarterly, or monthly service delivers the best value.
        </p>

        <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 700, color: '#F1F5F9', marginBottom: 12 }}>Select All Pests You're Dealing With</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {Object.entries(PEST_DATA).map(([key, d]) => (
                <button key={key} onClick={() => togglePest(key)} style={{
                  padding: '10px 14px', borderRadius: 8, border: '2px solid',
                  borderColor: selectedPests.includes(key) ? '#F5E642′ : '#2A3A5C',
                  background: selectedPests.includes(key) ? '#1a1500′ : '#0A1628',
                  color: selectedPests.includes(key) ? '#F5E642′ : '#CBD5E1',
                  cursor: 'pointer', textAlign: 'left', fontSize: 13, fontWeight: selectedPests.includes(key) ? 700 : 400
                }}>
                  <div>{d.label}</div>
                  <div style={{ fontSize: 11, color: urgencyColor(d.urgency), marginTop: 2 }}>Urgency: {d.urgency}</div>
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 700, color: '#F1F5F9', marginBottom: 8 }}>Property Size</label>
            <div>{[['Under 1,500 sq ft', 'small'], ['1,500–3,000 sq ft', 'medium'], ['3,000+ sq ft', 'large']].map(([l, v]) => pill(l, v, propertySize, setPropertySize))}</div>
          </div>
          <button onClick={estimate} disabled={selectedPests.length === 0} style={{ width: '100%', padding: '14px', borderRadius: 8, background: selectedPests.length > 0 ? '#F5E642′ : '#2A3A5C', color: '#0A1628', fontWeight: 800, fontSize: 16, border: ’none', cursor: selectedPests.length > 0 ? 'pointer' : 'default' }}>
            Compare My Options →
          </button>
        </div>

        {result && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
              {[
                { label: 'DIY Annual Cost', value: `$${result.diyTotal.toLocaleString()}`, note: 'Materials only, your labor', color: '#94A3B8′ },
                { label: 'Quarterly Plan (est.)', value: `$${result.quarterlyTotal.toLocaleString()}/yr`, note: '4 treatments per year', color: '#F5E642′ },
                { label: 'Monthly Plan (est.)', value: `$${result.monthlyTotal.toLocaleString()}/yr`, note: '12 treatments per year', color: '#22C55E' },
              ].map(item => (
                <div key={item.label} style={{ background: '#0F1F3D', borderRadius: 10, padding: 16, textAlign: 'center', border: item.value.includes(result.bestValue.includes('Quarterly') ? '/yr' : 'Monthly') ? '2px solid #F5E642′ : '2px solid transparent' }}>
                  <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: item.color }}>{item.value}</div>
                  <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>{item.note}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#0F1F3D', border: '2px solid #22C55E', borderRadius: 12, padding: 16, marginBottom: 20 }}>
              <strong style={{ color: '#22C55E' }}>✅ Best Value for DFW: {result.bestValue}</strong>
              <p style={{ color: '#94A3B8', fontSize: 13, margin: '8px 0 0′ }}>Professional plans in DFW include re-treatment guarantees — if pests return between scheduled visits, they come back free. DIY lacks this protection.</p>
            </div>
            <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24, marginBottom: 20 }}>
              <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16, marginTop: 0 }}>DFW Notes for Your Selected Pests</h3>
              {result.pestDetails.map(p => (
                <div key={p.key} style={{ padding: '12px 0', borderBottom: '1px solid #2A3A5C' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <strong style={{ color: '#F1F5F9′ }}>{p.label}</strong>
                    <span style={{ fontSize: 12, color: urgencyColor(p.urgency) }}>Urgency: {p.urgency}</span>
                  </div>
                  <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.6 }}>{p.dfwNote}</div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>DIY: {p.diy}</div>
                </div>
              ))}
            </div>
          </>
        )}

        <div style={{ textAlign: 'center', padding: '20px', background: '#0F1F3D', borderRadius: 12 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#F1F5F9', marginBottom: 8 }}>Get 3 Free Pest Control Quotes in DFW</div>
          <p style={{ color: '#94A3B8', marginBottom: 16, fontSize: 14 }}>Compare licensed exterminators — vetted for DFW-specific pest expertise.</p>
          <button style={{ padding: '12px 32px', background: '#F5E642', color: '#0A1628', fontWeight: 800, borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 16 }}>
            Compare Pest Control Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
