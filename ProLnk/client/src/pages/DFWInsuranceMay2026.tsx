import { useState } from 'react';

const claimTypes = [
  { type: 'Hail Damage', icon: '🌧️', docs: ['Date-stamped photos of every dent/crack', 'NOAA storm report for your zip code', 'Contractor written estimate on letterhead', 'Pre-storm inspection report if available', 'Policy declarations page with coverage limits'] },
  { type: 'Wind Damage', icon: '💨', docs: ['Photos from multiple angles showing damage', 'National Weather Service event confirmation', 'Structural engineer report for major damage', 'Temporary repair receipts (tarps, boards)', 'Neighbor statements if trees involved'] },
  { type: 'Water/Flood', icon: '💧', docs: ['Photo/video before any cleanup begins', 'Moisture meter readings from contractor', 'Plumber report if pipe failure caused it', 'Itemized list of damaged belongings', 'Mold remediation assessment if 48h+ wet'] },
  { type: 'Fire Damage', icon: '🔥', docs: ['Fire department incident report number', 'Photos of all affected areas before cleanup', 'Smoke/soot assessment by certified firm', 'Inventory of all personal property lost', 'Board-up and emergency repair receipts'] },
];

export default function DFWInsuranceMay2026() {
  const [selected, setSelected] = useState(claimTypes[0]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>PROLNK — DFW MARKET REPORT</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>DFW Home Insurance — May 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>
          Texas homeowner premiums are up <span style={{ color: '#f87171', fontWeight: 700 }}>28% since 2023</span>. Hail and wind dominate DFW claims. Be claim-ready before the next storm.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 24 }}>
          {[{label:'Avg Premium',val:'$4,200/yr',color:'#f87171'},{label:'Hail Claims',val:'38% of all',color:'#F5E642'},{label:'Avg Payout',val:'$12,500',color:'#4ade80'}].map(s => (
            <div key={s.label} style={{ background: '#111c35', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ color: s.color, fontWeight: 800, fontSize: 20 }}>{s.val}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111c35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>📋 Documentation Checklist by Claim Type</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            {claimTypes.map(c => (
              <button key={c.type} onClick={() => setSelected(c)}
                style={{ background: selected.type === c.type ? '#F5E642′ : '#1a2f52', color: selected.type === c.type ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                {c.icon} {c.type}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 18, marginBottom: 10 }}>{selected.icon} {selected.type} — Required Documentation</div>
          {selected.docs.map((doc, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
              <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
              <span style={{ color: '#cbd5e1', fontSize: 14 }}>{doc}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2444', border: '1px solid #F5E642', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>🔨 ProLnk Insurance Repair Network</div>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 8 }}>All ProLnk contractors are pre-verified for insurance repair work — licensed, insured, and familiar with adjuster documentation requirements.</p>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>Find a licensed DFW contractor → prolnk.io</div>
        </div>
      </div>
    </div>
  );
}