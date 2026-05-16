import { useState } from 'react';

const concerns = [
  { id: 'mold', label: '🍄 Mold on HVAC Coils', rec: 'Coil-mount UV-C lamp (24/7 exposure on evaporator coil) — kills mold spores that grow in DFW humidity', cost: '$200–$350 installed' },
  { id: 'allergy', label: '🤧 Allergies / Bacteria', rec: 'Air handler UV lamp (strikes moving air) — reduces airborne bacteria 50–99%, great for cedar season', cost: '$250–$400 installed' },
  { id: 'both', label: '🛡️ Maximum Protection', rec: 'Dual-lamp system: coil UV + air handler UV — comprehensive germicidal coverage for whole system', cost: '$400–$600 installed' },
  { id: 'odor', label: '👃 HVAC Odors / VOCs', rec: 'PCO (Photocatalytic Oxidation) UV — oxidizes VOCs, odors, and chemical contaminants beyond just biological', cost: '$300–$500 installed' },
];

export default function DFWHVACUVLightGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = concerns.find(c => c.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>☀️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW HVAC UV Light Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>DFW humidity breeds mold on HVAC coils. UV-C germicidal lights eliminate it — and kill airborne bacteria too.</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, margin: '0 0 12px' }}>📊 Why DFW Needs UV Lights</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Coil Mold Reduction', value: '99.9%' },
              { label: 'Airborne Bacteria', value: '50–99%' },
              { label: 'Typical Bulb Life', value: '9,000 hrs / 1yr' },
              { label: 'Cedar Season Threat', value: 'Dec–Mar DFW' },
            ].map(item => (
              <div key={item.label} style={{ background: '#1a2f4a', borderRadius: 8, padding: '10px 14px' }}>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{item.label}</div>
                <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 700 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, margin: '0 0 12px' }}>🔍 What Is Your Main Concern?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {concerns.map(c => (
              <button key={c.id} onClick={() => setSelected(c.id === selected ? null : c.id)}
                style={{ background: selected === c.id ? '#F5E642' : '#1a2f4a', color: selected === c.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {c.label}
              </button>
            ))}
          </div>
          {match && (
            <div style={{ marginTop: 16, background: '#1a2f4a', borderRadius: 10, padding: 16, borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Recommendation</div>
              <div style={{ color: '#e2e8f0', fontSize: 14, marginBottom: 8 }}>{match.rec}</div>
              <div style={{ color: '#F5E642', fontSize: 13 }}>💰 Installed Cost: {match.cost}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, margin: '0 0 12px' }}>⚡ UV Light Types Compared</h2>
          {[
            { type: 'Coil-Mount UV', icon: '🧲', desc: 'Installed pointing at evaporator coil — 24/7 exposure prevents mold growth. Most popular DFW install.' },
            { type: 'Air Handler UV', icon: '💨', desc: 'Installed in air stream — only active when fan runs. Kills airborne pathogens passing through.' },
            { type: 'PCO UV', icon: '⚗️', desc: 'Photocatalytic oxidation — goes beyond biological to destroy VOCs and chemical odors.' },
          ].map(u => (
            <div key={u.type} style={{ background: '#1a2f4a', borderRadius: 8, padding: '12px 14px', marginBottom: 10, display: 'flex', gap: 12 }}>
              <div style={{ fontSize: 24 }}>{u.icon}</div>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{u.type}</div>
                <div style={{ color: '#e2e8f0', fontSize: 13, marginTop: 4 }}>{u.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
