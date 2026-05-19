import { useState } from 'react';

const cities = [
  { id: 'dallas', label: '🏙️ Dallas', provider: 'Republic Services (contract)', pickup: 'Weekly trash, weekly recycling', bulk: 'Schedule at 214-670-3151 — 2 bulk items/week free', haz: 'McCommas Bluff Landfill: paint, batteries, chemicals — Saturdays 8am-3pm' },
  { id: 'fortworth', label: '🤠 Fort Worth', provider: 'City of Fort Worth (city-run)', pickup: 'Weekly trash, bi-weekly recycling', bulk: 'Free large item pickup — schedule at fortworthtexas.gov', haz: 'Monthly hazardous waste events — check calendar at fortworthtexas.gov/solidwaste' },
  { id: 'plano', label: '📐 Plano', provider: 'Republic Services', pickup: 'Weekly trash, weekly recycling', bulk: '$25 fee for large items, schedule at plano.gov', haz: 'Hazardous waste: Collin County HHW facility, open Saturdays' },
  { id: 'arlington', label: '🎢 Arlington', provider: 'City of Arlington (city-run)', pickup: 'Weekly trash, weekly recycling', bulk: 'Free large item pickup — limit 4 items, schedule online', haz: 'Texas Pure Products facility accepts many items — arlingtontx.gov/solidwaste' },
  { id: 'frisco', label: '🏘️ Frisco', provider: 'Republic Services', pickup: 'Weekly trash, weekly recycling', bulk: 'Free 2 bulk items/week with regular pickup', haz: 'Use Collin County HHW facility in McKinney on Saturdays' },
  { id: 'hoa', label: '🏡 HOA Community', provider: 'Varies by HOA contract', pickup: 'Check HOA docs for schedule', bulk: 'HOA typically arranges bulk pickup — contact property manager', haz: 'Use nearest city HHW facility — free for all Texans' },
];

export default function DFWTrashRecyclingGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = cities.find(n => n.id === selected);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', padding: '32px 16px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>♻️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Trash & Recycling — 2026 Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Waste services vary by city across DFW. Select your city to see your provider, pickup schedule, bulk item, and hazardous waste options.</p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>♻️ What Can Be Recycled? (DFW Standard)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 12 }}>
              <div style={{ color: '#4ade80', fontWeight: 700, fontSize: 12, marginBottom: 6 }}>✅ YES — Recycle</div>
              {['Paper, cardboard (flattened)','Glass bottles & jars','Plastic #1 and #2 only','Aluminum & tin cans'].map((i,k) => <div key={k} style={{ color: '#cbd5e1', fontSize: 12, padding: '2px 0′ }}>{i}</div>)}
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 12 }}>
              <div style={{ color: '#f87171', fontWeight: 700, fontSize: 12, marginBottom: 6 }}>❌ NO — Trash Only</div>
              {['Plastic bags (return to store)','Styrofoam','Food-contaminated containers','Shredded paper (bag separately)'].map((i,k) => <div key={k} style={{ color: '#cbd5e1', fontSize: 12, padding: '2px 0′ }}>{i}</div>)}
            </div>
          </div>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📍 Select Your City</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
          {cities.map(n => (
            <button key={n.id} onClick={() => setSelected(selected === n.id ? null : n.id)}
              style={{ padding: '10px 16px', borderRadius: 8, border: `2px solid ${selected === n.id ? '#F5E642' : '#1e3a5f'}`, backgroundColor: selected === n.id ? '#F5E64220′ : '#0f2040', color: selected === n.id ? '#F5E642' : '#cbd5e1', cursor: ’pointer', fontSize: 13, fontWeight: 600 }}>
              {n.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 20, border: '2px solid #F5E642', marginBottom: 24 }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 16px', fontSize: 17 }}>{active.label} Waste Services</h3>
            {[
              { label: '🏢 Provider', val: active.provider },
              { label: '📅 Pickup Schedule', val: active.pickup },
              { label: '🛋️ Bulk / Large Items', val: active.bulk },
              { label: '☣️ Hazardous Waste', val: active.haz },
            ].map((row,i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < 3 ? '1px solid #1e3a5f' : 'none' }}>
                <div style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>{row.label}</div>
                <div style={{ color: '#cbd5e1', fontSize: 13 }}>{row.val}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 16, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 15, marginBottom: 10 }}>🌱 Composting in DFW</h2>
          <p style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.6, margin: 0 }}>Dallas and Fort Worth both operate free compost giveaways in spring. Residents can pick up finished compost at city facilities. Some neighborhoods have community compost bins — check with your city's sustainability office. Home composting is legal and encouraged across all DFW cities.</p>
        </div>
      </div>
    </div>
  );
}
