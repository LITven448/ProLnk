import { useState } from 'react';

const budgets = [
  { label: 'Starter ($2K–5K)', room: 'Small (10x10)', acoustic: 'Foam panels + rug', circuit: 'Shared 15A', hvac: 'Quiet window unit', soundproof: 'Door sweep + mass loaded vinyl on 1 wall' },
  { label: 'Mid-Range ($5K–15K)', room: 'Medium (12x14)', acoustic: 'Bass traps + broadband panels', circuit: 'Dedicated 20A', hvac: 'Mini-split (no ductwork noise)', soundproof: 'Double drywall + Green Glue on 2 walls' },
  { label: 'Pro Studio ($15K+)', room: 'Large (15x20+)', acoustic: 'Full treatment + diffusers', circuit: 'Dedicated 20A + UPS', hvac: 'Variable speed mini-split, separate zone', soundproof: 'Room within a room floating floor + ceiling' },
];

export default function DFWHomeStudioGuide2026() {
  const [selected, setSelected] = useState(0);
  const rec = budgets[selected];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🎙️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Home Recording Studio Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>DFW's booming music scene meets the work-from-home era</p>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🔑 Soundproofing vs Acoustic Treatment</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🛡️ Soundproofing</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>Stops sound from leaving or entering the room. Mass, decoupling, and sealing. Most expensive part of any studio build.</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🎵 Acoustic Treatment</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>Controls sound within the room. Reduces echo, flutter, and bass buildup. Foam panels, bass traps, diffusers. Most impactful for recording quality.</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🎚️ Build by Budget</h2>
          <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
            {budgets.map((b, i) => (
              <button key={b.label} onClick={() => setSelected(i)}
                style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13,
                  background: selected === i ? '#F5E642′ : '#1e3a5f', color: selected === i ? '#0A1628' : '#fff', fontWeight: selected === i ? 700 : 400 }}>
                {b.label}
              </button>
            ))}
          </div>
          {[['🏠 Room Size', rec.room],['🎛️ Acoustic Treatment', rec.acoustic],['⚡ Electrical Circuit', rec.circuit],['❄️ HVAC Solution', rec.hvac],['🧱 Soundproofing', rec.soundproof]].map(([label,val]) => (
            <div key={String(label)} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
              <div style={{ color: '#F5E642', fontSize: 14, minWidth: 180, fontWeight: 600 }}>{String(label)}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{String(val)}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>❄️ HVAC is the Silent Killer</h3>
          {['DFW summers require AC nearly year-round — duct noise ruins recordings','Mini-split systems are ideal: quiet, zoned, no ductwork through studio walls','Variable-speed compressors run quieter than single-stage units','Schedule HVAC off during tracking sessions if budget system is too loud'].map(tip => (
            <div key={tip} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642′ }}>→</span>
              <span style={{ color: '#94a3b8', fontSize: 13 }}>{tip}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⚡ Electrical Must-Haves</h3>
          {['Dedicated circuit prevents ground hum from shared lines','20A circuit for pro gear: interface, monitors, computer, lighting','UPS (uninterruptible power supply) protects against ERCOT grid blips','Consult licensed electrician — unpermitted work voids insurance'].map(tip => (
            <div key={tip} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642′ }}>→</span>
              <span style={{ color: '#94a3b8', fontSize: 13 }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
