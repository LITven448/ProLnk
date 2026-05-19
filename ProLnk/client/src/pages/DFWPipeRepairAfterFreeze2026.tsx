import { useState } from 'react';

const immediateSteps = [
  { emoji: '🚨', step: '1. Shut Water Off', detail: 'Find your main shutoff valve and turn it off immediately. Every second of running water increases damage. Know this location BEFORE any freeze.' },
  { emoji: '📸', step: '2. Document Everything', detail: 'Before any cleanup or repair, photograph and video all damage. Burst pipes, water damage, affected areas. Your insurance claim depends on this.' },
  { emoji: '📞', step: '3. Call Your Insurance', detail: 'File a claim before repairs start. Most homeowners policies cover sudden pipe bursts. Get a claim number before hiring contractors.' },
  { emoji: '🔧', step: '4. Call a Licensed Plumber', detail: 'Not a handyman. Not a general contractor. A licensed master plumber for pipe repairs. They carry insurance, pull permits, and warranty their work.' },
  { emoji: '💨', step: '5. Ventilate and Dry', detail: 'Open windows if temp allows. Run fans and dehumidifiers. Mold starts in 24-48 hours. Document drying efforts for your claim.' },
  { emoji: '📋', step: '6. Get Multiple Quotes', detail: 'For larger repairs, get 2-3 quotes. After a widespread freeze event, prices spike 20-50%. Licensed pros through ProLnk give upfront pricing.' },
];

const damageGuides: Record<string, { cost: string; urgent: string[]; avoid: string }> = {
  'One burst pipe, small area': {
    cost: '$500 – $1,200',
    urgent: ['Shut off water at main', 'Take photos before touching anything', 'Call insurance — this is typically covered', 'Get a licensed plumber same day', 'Ask plumber to inspect adjacent pipes too'],
    avoid: 'Do NOT attempt DIY pipe repair on burst pipes — improper repair can fail again or void insurance coverage.',
  },
  'Multiple burst pipes': {
    cost: '$2,000 – $8,000+',
    urgent: ['Main shutoff is your first move', 'Document every affected area with photos and video', 'Call insurance before any contractor', 'Request emergency service — ProLnk has on-call plumbers', 'Ask adjuster about water mitigation coverage'],
    avoid: 'Do NOT start demolition before adjuster or licensed plumber evaluates. You may remove evidence needed for claim.',
  },
  'Water damage to walls / ceilings': {
    cost: '$3,000 – $20,000+',
    urgent: ['Shut water off first', 'Call insurance immediately', 'Hire a licensed water mitigation company (separate from plumber)', 'Keep all damaged materials until adjuster visits', 'Document moisture levels with photos'],
    avoid: 'Do NOT use a shop vac and call it done. Water inside walls causes mold. Mitigation requires industrial drying equipment.',
  },
  'Burst pipe + flooring damage': {
    cost: '$5,000 – $30,000+',
    urgent: ['Shut off water + document everything before cleanup', 'File insurance claim — flooring replacement is typically covered', 'Get licensed plumber + water mitigation company', 'Do NOT let anyone install new flooring until subfloor is dry (measured)', 'Keep contractor receipts for all work'],
    avoid: 'Do NOT install new flooring over wet subfloor. Mold will grow underneath and you\’ll spend far more later.',
  },
};

export default function DFWPipeRepairAfterFreeze2026() {
  const [selected, setSelected] = useState('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>💥</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Pipe Repair After Freeze 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>What to do in the first 24 hours when pipes burst in your DFW home</p>
          <div style={{ display: 'inline-block', background: '#7f1d1d', color: '#fca5a5', borderRadius: 8, padding: '6px 16px', marginTop: 10, fontSize: 13, fontWeight: 600 }}>
            🚨 Shut off your water main FIRST — before anything else
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, marginBottom: 40 }}>
          {immediateSteps.map((s) => (
            <div key={s.step} style={{ background: '#0f2040', borderRadius: 12, padding: 18, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.emoji}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>{s.step}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.5 }}>{s.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, marginBottom: 12 }}>🔨 Your Damage Type → Immediate Action Plan</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>Select your damage situation:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {Object.keys(damageGuides).map((k) => (
              <button key={k} onClick={() => setSelected(k)}
                style={{ background: selected === k ? '#F5E642' : '#1e3a5f', color: selected === k ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                {k}
              </button>
            ))}
          </div>
          {selected && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, background: '#1a2f4a', borderRadius: 8, padding: '10px 14px' }}>
                <span style={{ color: '#94a3b8', fontSize: 13 }}>Typical repair cost:</span>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>{damageGuides[selected].cost}</span>
              </div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 10 }}>Immediate steps:</div>
              <ul style={{ color: '#e2e8f0', lineHeight: 2.1, paddingLeft: 20, marginBottom: 16 }}>
                {damageGuides[selected].urgent.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <div style={{ background: '#7f1d1d', borderRadius: 8, padding: '10px 14px', color: '#fca5a5', fontSize: 13 }}>
                ⛔ {damageGuides[selected].avoid}
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, background: '#F5E642', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#0A1628' }}>ProLnk gets you a licensed DFW plumber — fast.</div>
          <div style={{ color: '#0A1628', marginTop: 6 }}>When pipes burst, you need a licensed pro. Not a handyman. Not tomorrow.</div>
        </div>
      </div>
    </div>
  );
}
