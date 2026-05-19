import { useState } from 'react';

const features = [
  { id: 'lawn', label: '🌿 Irrigation / Lawn', desc: 'Weather-based controllers save 30–50% water vs. timers in DFW drought summers' },
  { id: 'pool', label: '🏊 Pool', desc: 'Automated chemical dosers + smart pumps cut DFW pool maintenance cost by $800–$1,500/yr' },
  { id: 'garden', label: '🌱 Garden / Beds', desc: 'Soil moisture sensors stop overwatering in DFW clay soil that holds water poorly' },
  { id: 'lighting', label: '💡 Outdoor Lighting', desc: 'Automated dusk-to-dawn + motion lighting; solar fixtures work well in 300+ sunny DFW days' },
  { id: 'security', label: '📷 Outdoor Security', desc: 'Smart cameras + floodlights; DFW package theft peaks October–December' },
];

const suburbs = ['Frisco', 'McKinney', 'Allen', 'Plano', 'Southlake', 'Keller', 'Flower Mound', 'Prosper', 'Celina', 'Trophy Club', 'Colleyville', 'Coppell', 'Irving', 'Arlington', 'Grand Prairie'];

const packageEstimates: Record<string, { cost: string; savings: string; priority: string }> = {
  pool: { cost: '$800–$2,000', savings: '$800–$1,500/yr maintenance', priority: 'Pentair IntelliConnect or Hayward OmniLogic' },
  lawn: { cost: '$300–$700', savings: '30–50% water bill (avg $240–$480/yr DFW)', priority: 'Rachio 3 or RainBird ESP-TM2 with WiFi module' },
  garden: { cost: '$200–$500', savings: 'Prevent overwatering clay soil', priority: 'Govee or Ecowitt soil moisture + Orbit B-hyve zones' },
  lighting: { cost: '$400–$1,200', savings: '40–60% outdoor lighting energy', priority: 'Lutron Caseta or Kasa smart switches + solar path lights' },
  security: { cost: '$500–$1,500', savings: 'Insurance discount 5–10%', priority: 'Ring Floodlight Cam Wired Pro or Google Nest Cam' },
};

export default function DFWSmartGardenGuide() {
  const [selected, setSelected] = useState<string[]>([]);
  const [suburb, setSuburb] = useState('');
  const [result, setResult] = useState<string | null>(null);

  function toggle(id: string) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  function getPackage() {
    if (selected.length === 0) { setResult('Select at least one outdoor feature.'); return; }
    const items = selected.map(id => packageEstimates[id]);
    const totalLow = selected.reduce((acc, id) => acc + parseInt(packageEstimates[id].cost.replace(/[^0-9]/g, '')), 0);
    const suburbNote = suburb ? ` In ${suburb}: HOA approval may be required for visible outdoor tech — check before installing smart lighting or cameras on front elevation.` : '';
    const parts = selected.map(id => `${features.find(f => f.id === id)?.label}: ${packageEstimates[id].priority}`).join(' · ');
    setResult(`Smart outdoor package for ${selected.length} feature${selected.length !== 1 ? 's' : ''}: estimated $${Math.round(totalLow * 0.9).toLocaleString()}–$${Math.round(totalLow * 2.2).toLocaleString()} installed. Recommendations: ${parts}.${suburbNote} DFW water restriction tip: configure Rachio to honor Stage 1–3 water restrictions automatically.`);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui', padding: '32px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13 }}>🏠 DFW Smart Home Guide</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Smart Garden & Outdoor Tech Guide for DFW Homes</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>
          DFW summers are brutal — 100°F+ for weeks, Stage 2 water restrictions, and $400+ water bills. Smart outdoor tech pays for itself in 1–3 years through water and energy savings.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          <div style={{ background: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 10, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#F5E642', marginBottom: 4 }}>💧 DFW Water Crisis</div>
            <p style={{ color: '#CBD5E1', fontSize: 13, margin: 0 }}>DFW enters Stage 1 water restrictions nearly every summer. Smart irrigation controllers automatically honor city restrictions and skip watering after rainfall — manual timers don't.</p>
          </div>
          <div style={{ background: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 10, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#F5E642', marginBottom: 4 }}>🏊 Pool ROI</div>
            <p style={{ color: '#CBD5E1', fontSize: 13, margin: 0 }}>DFW pool owners spend $150–$200/month on maintenance. Smart chemical dosers (Salt Chlorinator + pH auto-dosing) cut that to $40–$60/month and extend equipment life.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 10, marginBottom: 40 }}>
          {features.map(f => (
            <div key={f.id} onClick={() => toggle(f.id)} style={{ background: selected.includes(f.id) ? '#F5E64210′ : '#0D1F35', borderRadius: 8, padding: '16px 20px', border: `2px solid ${selected.includes(f.id) ? '#F5E642' : '#1E3A5F'}`, cursor: ’pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, color: selected.includes(f.id) ? '#F5E642′ : '#E8EDF5' }}>{f.label}</div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>{f.desc}</div>
              </div>
              <div style={{ fontSize: 20, marginLeft: 12 }}>{selected.includes(f.id) ? '✅' : '⬜'}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D1F35', borderRadius: 12, padding: '28px', border: '1px solid #1E3A5F', marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🔧 Get Your Smart Outdoor Package</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#CBD5E1', fontSize: 13, marginBottom: 6 }}>Your DFW Suburb (optional — for HOA notes)</label>
            <select value={suburb} onChange={e => setSuburb(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 14 }}>
              <option value="">Select suburb...</option>
              {suburbs.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <button onClick={getPackage} style={{ background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Get My Outdoor Automation Package →
          </button>
          {result && (
            <div style={{ marginTop: 20, background: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 8, padding: '16px 20px', color: '#E8EDF5', fontSize: 14, lineHeight: 1.6 }}>
              {result}
            </div>
          )}
        </div>

        <div style={{ color: '#475569', fontSize: 12, textAlign: 'center' }}>ProLnk · DFW Smart Home Guides · Outdoor automation for DFW summers, water restrictions, and pools</div>
      </div>
    </div>
  );
}
