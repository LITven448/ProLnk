import { useState } from 'react';

const plans = {
  mainline: {
    cause: 'Main sewer line blockage — DFW clay soil causes pipe belly (sagging) and root intrusion from mature trees',
    who: 'Licensed plumber for camera inspection and hydro-jetting. City responsibility ends at property line.',
    cost: '$350–$600 hydro-jet cleaning | $3,000–$12,000 pipe lining or replacement',
    pays: 'Homeowner pays for private sewer line (from house to street). City pays for main trunk line issues.',
    actions: ['Stop all water use immediately', 'Do not flush toilets or run sinks', 'Call a plumber with sewer camera capability', 'Keep people out of affected areas — sewage is biohazard'],
  },
  floor_drain: {
    cause: 'Floor drain backup from basement or lower level — often indicates main line issue or heavy municipal flow',
    who: 'Plumber first to assess, then restoration company if sewage spilled',
    cost: '$250–$500 inspection + cleaning | $2,000–$8,000 if restoration needed',
    pays: 'Heavy rain overload may qualify for FEMA assistance. Check homeowner policy for sewer backup rider.',
    actions: ['Wear rubber gloves and boots — sewage is hazardous', 'Remove standing sewage water carefully', 'Document all damage with photos before cleanup', 'Call plumber then your insurance company'],
  },
  single_drain: {
    cause: 'Isolated blockage in branch line — likely grease, debris, or roots in that fixture\’s drain',
    who: 'Plumber or DIY with drain snake for minor clogs',
    cost: '$75–$250 professional snaking | $20–$80 DIY snake rental',
    pays: 'Typically not covered by insurance — maintenance item',
    actions: ['Try plunging the affected drain first', 'Do not use chemical drain cleaners — they damage pipes', 'Snake the drain if plunging fails', 'Call plumber if multiple snaking attempts fail'],
  },
};

export default function DFWSewageBackupGuide() {
  const [backupLocation, setBackupLocation] = useState('');
  const [result, setResult] = useState<null | typeof plans.mainline>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '2rem' }}>🚨</span>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Sewage Backup Emergency Guide</h1>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          DFW's expansive clay soil constantly shifts, causing pipe belly (sagging sections where waste collects) and root intrusion from mature neighborhood trees. Sewage backup is a biohazard — act fast and protect your family.
        </p>

        <div style={{ background: '#7f1d1d', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #ef4444′ }}>
          <h2 style={{ color: '#fca5a5', fontSize: '1rem', marginBottom: '0.5rem' }}>⚠️ Biohazard Warning</h2>
          <p style={{ color: '#fecaca', margin: 0, fontSize: '0.9rem' }}>Sewage contains bacteria, viruses, and parasites. Wear rubber gloves and boots. Keep children and pets away. Do not operate HVAC until cleaned — it spreads contamination.</p>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔍 Warning Signs of Main Line Backup</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 1.9, paddingLeft: '1.2rem', margin: 0 }}>
            <li>Multiple drains slow or gurgle at the same time</li>
            <li>Toilet bubbles when you run the sink or shower</li>
            <li>Sewage smell from floor drains</li>
            <li>Water backs up in tub when flushing toilet</li>
          </ul>
          <p style={{ color: '#F5E642', marginTop: '0.75rem', marginBottom: 0, fontWeight: 600 }}>Multiple simultaneous slow drains = call a plumber immediately.</p>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📍 Where is the backup occurring?</h2>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {[
              { key: 'mainline', label: '🏠 Multiple drains / whole house' },
              { key: 'floor_drain', label: '🌊 Floor drain / basement flooding' },
              { key: 'single_drain', label: '🚿 Single drain / one fixture' },
            ].map(opt => (
              <button key={opt.key} onClick={() => { setBackupLocation(opt.key); setResult(plans[opt.key as keyof typeof plans]); }} style={{ padding: '0.75rem 1.25rem', borderRadius: '8px', border: '2px solid', borderColor: backupLocation === opt.key ? '#F5E642′ : '#334155', background: backupLocation === opt.key ? '#F5E642' : ’transparent', color: backupLocation === opt.key ? '#0A1628′ : '#cbd5e1', fontWeight: 600, cursor: ’pointer' }}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>⚡ Action Plan</h2>
            <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>🔎 Likely Cause</div>
              <div style={{ color: '#cbd5e1′ }}>{result.cause}</div>
            </div>
            <ol style={{ color: '#cbd5e1', lineHeight: 2, paddingLeft: '1.2rem', margin: '0 0 1rem 0′ }}>
              {result.actions.map((a, i) => <li key={i}>{a}</li>)}
            </ol>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>💰 Cost Estimate</div>
                <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{result.cost}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>💳 Who Pays?</div>
                <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{result.pays}</div>
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '0.75rem' }}>🏛️ DFW City vs Private Line</h2>
          <p style={{ color: '#cbd5e1', margin: 0, lineHeight: 1.7 }}>Your city maintains the main sewer trunk line under the street. You own everything from your house to where your lateral meets the city main. Camera inspection ($150–$300) definitively shows where responsibility starts and ends.</p>
        </div>
      </div>
    </div>
  );
}
