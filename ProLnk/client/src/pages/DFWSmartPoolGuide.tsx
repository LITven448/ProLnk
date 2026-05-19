import { useState } from 'react';

type EquipmentAge = 'new' | 'mid' | 'old';

const UPGRADES: Record<EquipmentAge, Record<string, { path: string; cost: string; timeSaved: string; chemSaved: string }>> = {
  new: {
    basic: { path: 'Add Jandy iAqualink app control module to existing equipment', cost: '$350–$600', timeSaved: '2 hrs/wk', chemSaved: '15%' },
    full: { path: 'Pentair IntelliTouch system with automated chemical dosing + app control', cost: '$1,200–$2,000', timeSaved: '4 hrs/wk', chemSaved: '30%' },
    premium: { path: 'Hayward OmniLogic full automation + ProLogic chemical controller', cost: '$2,500–$4,000', timeSaved: '5 hrs/wk', chemSaved: '40%' },
  },
  mid: {
    basic: { path: 'Retrofit Pentair EasyTouch automation controller', cost: '$800–$1,400', timeSaved: '3 hrs/wk', chemSaved: '20%' },
    full: { path: 'Replace pump with variable speed + Jandy automation system', cost: '$2,000–$3,200', timeSaved: '5 hrs/wk', chemSaved: '35%' },
    premium: { path: 'Full Hayward OmniLogic + VS pump + salt chlorinator', cost: '$3,500–$6,000', timeSaved: '6 hrs/wk', chemSaved: '45%' },
  },
  old: {
    basic: { path: 'New variable speed pump (Pentair IntelliFlo) + basic app timer', cost: '$1,200–$1,800', timeSaved: '3 hrs/wk', chemSaved: '20%' },
    full: { path: 'Full equipment replacement: VS pump + heater + Jandy iAqualink automation', cost: '$4,000–$7,000', timeSaved: '6 hrs/wk', chemSaved: '40%' },
    premium: { path: 'Total smart pool system: OmniLogic + VS pump + salt + chemical automation', cost: '$7,000–$12,000', timeSaved: '7 hrs/wk', chemSaved: '50%' },
  },
};

export default function DFWSmartPoolGuide() {
  const [age, setAge] = useState<EquipmentAge | ''>('');
  const [tier, setTier] = useState('');
  const [result, setResult] = useState<null | { path: string; cost: string; timeSaved: string; chemSaved: string }>(null);

  function handleCheck() {
    if (age && tier) setResult(UPGRADES[age as EquipmentAge][tier]);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>🏊 DFW Smart Pool Guide</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF', marginBottom: 16, lineHeight: 1.2 }}>
          Smart Pool Management in DFW — Automation, Apps & Savings
        </h1>
        <p style={{ color: '#9BA3B8', fontSize: 16, marginBottom: 40, lineHeight: 1.7 }}>
          DFW homeowners run their pools hard — long hot summers, frequent use, and freeze events in winter demand reliable automation. Smart pool controllers from Jandy, Pentair, and Hayward pay for themselves in chemical savings and time saved.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 20, marginBottom: 48 }}>
          {[
            { icon: '📱', title: 'App-Controlled Pumps', desc: 'Variable speed pumps with app scheduling cut DFW electricity costs by 50–70% vs single-speed pumps.' },
            { icon: '🧪', title: 'Automated Chemical Dosing', desc: 'Automated chlorine and pH controllers maintain perfect chemistry without weekly manual testing.' },
            { icon: '🌡️', title: 'Temperature Monitoring', desc: 'Smart heater controls and remote temperature monitoring let you pre-heat your pool from your phone.' },
            { icon: '❄️', title: 'DFW Freeze Protection', desc: 'Automation systems run pumps automatically during DFW freezes — critical for protecting expensive equipment.' },
          ].map((card) => (
            <div key={card.title} style={{ backgroundColor: '#111D35', border: '1px solid #1E2D4A', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: 15, marginBottom: 8 }}>{card.title}</div>
              <div style={{ color: '#9BA3B8', fontSize: 14, lineHeight: 1.6 }}>{card.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ backgroundColor: '#111D35', border: '1px solid #1E2D4A', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>⚙️ Smart Pool Upgrade Path Finder</h2>
          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#9BA3B8', fontSize: 13, marginBottom: 10 }}>Current Pool Equipment Age</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[{ v: 'new', l: 'New (0–4 years)' }, { v: 'mid', l: 'Mid-Age (5–10 years)' }, { v: 'old', l: 'Older (10+ years)' }].map((o) => (
                <button key={o.v} onClick={() => setAge(o.v as EquipmentAge)}
                  style={{ padding: '10px 16px', borderRadius: 8, border: `2px solid ${age === o.v ? '#F5E642' : '#1E2D4A'}`,
                    backgroundColor: age === o.v ? '#F5E642' : 'transparent', color: age === o.v ? '#0A1628' : '#9BA3B8',
                    cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                  {o.l}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <div style={{ color: '#9BA3B8', fontSize: 13, marginBottom: 10 }}>Smart Features Wanted</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[{ v: 'basic', l: 'Basic App Control' }, { v: 'full', l: 'Full Automation + Chemical' }, { v: 'premium', l: 'Premium Smart Pool System' }].map((o) => (
                <button key={o.v} onClick={() => setTier(o.v)}
                  style={{ padding: '10px 16px', borderRadius: 8, border: `2px solid ${tier === o.v ? '#F5E642' : '#1E2D4A'}`,
                    backgroundColor: tier === o.v ? '#F5E642' : 'transparent', color: tier === o.v ? '#0A1628' : '#9BA3B8',
                    cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                  {o.l}
                </button>
              ))}
            </div>
          </div>
          <button onClick={handleCheck}
            style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Get My Upgrade Path
          </button>
          {result && (
            <div style={{ marginTop: 24, backgroundColor: '#0A1628', borderRadius: 12, padding: 24 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🔧 Recommended Upgrade Path</div>
              <div style={{ color: '#E8EAF0', fontSize: 15, marginBottom: 16, lineHeight: 1.6 }}>{result.path}</div>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                <div><span style={{ color: '#9BA3B8', fontSize: 13 }}>Estimated Cost</span><div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 15 }}>{result.cost}</div></div>
                <div><span style={{ color: '#9BA3B8', fontSize: 13 }}>Time Saved / Week</span><div style={{ color: '#4ADE80', fontWeight: 700, fontSize: 15 }}>{result.timeSaved}</div></div>
                <div><span style={{ color: '#9BA3B8', fontSize: 13 }}>Chemical Cost Savings</span><div style={{ color: '#4ADE80', fontWeight: 700, fontSize: 15 }}>{result.chemSaved}</div></div>
              </div>
            </div>
          )}
        </div>
        <div style={{ padding: 24, backgroundColor: '#0D1E3A', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ color: '#9BA3B8', fontSize: 14 }}>Find a licensed DFW pool automation specialist to handle your upgrade.</div>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginTop: 8 }}>Get matched with a DFW pool pro on ProLnk →</div>
        </div>
      </div>
    </div>
  );
}
