import { useState } from 'react';

type HomeFeature = 'pets' | 'renovation' | 'allergies' | 'standard';
type DFWSeason = 'may_oct' | 'nov_apr';

const baseSchedule: Record<DFWSeason, { interval: string; reason: string }> = {
  may_oct: { interval: 'Every 30 days', reason: 'Heavy AC use + high cedar and oak pollen load in DFW' },
  nov_apr: { interval: 'Every 60–90 days', reason: 'Reduced runtime; minimal pollen except cedar fever Jan–Feb' },
};

const featureOverrides: Record<HomeFeature, { label: string; emoji: string; adjustment: string }> = {
  pets: { label: 'Pets in home', emoji: '🐾', adjustment: 'Shorten by 2 weeks — pet dander clogs MERV 8+ filters fast' },
  renovation: { label: 'Active renovation', emoji: '🔨', adjustment: 'Change WEEKLY — drywall dust and sawdust destroy filters in days' },
  allergies: { label: 'Allergy sufferers', emoji: '🤧', adjustment: 'Use MERV 11–13, check every 3 weeks May–Oct; MERV 8 clogs 30% faster' },
  standard: { label: 'Standard home', emoji: '🏠', adjustment: 'Follow base schedule — no modifications needed' },
};

const reminderTips = [
  'Set a recurring phone reminder on the 1st of each month May–Oct',
  'Buy a 6-pack of filters at season start — cheaper and no "forgot to order" delays',
  'Write the install date on the filter frame with a marker',
  'Pair filter changes with another habit: HVAC filter when you pay electric bill',
  'Smart thermostat? Most have filter reminder built in — enable it',
];

export default function DFWHVACFilterScheduleDFW() {
  const [season, setSeason] = useState<DFWSeason>('may_oct');
  const [feature, setFeature] = useState<HomeFeature>('standard');

  const base = baseSchedule[season];
  const override = featureOverrides[feature];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642', letterSpacing: '0.08em', textTransform: 'uppercase' }}>🔧 DFW HVAC Guide</div>
        <h1 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '8px' }}>HVAC Filter Change Schedule</h1>
        <p style={{ color: '#94A3B8', marginBottom: '28px', fontSize: '15px' }}>DFW-specific intervals accounting for pollen, AC heavy use, and home conditions.</p>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '6px' }}>DFW SEASON</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setSeason('may_oct')} style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '12px', backgroundColor: season === 'may_oct' ? '#F5E642' : '#1E2D45', color: season === 'may_oct' ? '#0A1628' : '#E8EDF5' }}>☀️ May–Oct</button>
              <button onClick={() => setSeason('nov_apr')} style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '12px', backgroundColor: season === 'nov_apr' ? '#F5E642' : '#1E2D45', color: season === 'nov_apr' ? '#0A1628' : '#E8EDF5' }}>❄️ Nov–Apr</button>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '20px' }}>
          {(Object.keys(featureOverrides) as HomeFeature[]).map(f => (
            <button key={f} onClick={() => setFeature(f)} style={{ padding: '12px', borderRadius: '10px', border: feature === f ? '2px solid #F5E642' : '2px solid transparent', cursor: 'pointer', backgroundColor: '#1E2D45', textAlign: 'left' }}>
              <div style={{ fontSize: '18px', marginBottom: '4px' }}>{featureOverrides[f].emoji}</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: feature === f ? '#F5E642' : '#E8EDF5' }}>{featureOverrides[f].label}</div>
            </button>
          ))}
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
          <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px' }}>BASE INTERVAL FOR THIS SEASON</div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#F5E642', marginBottom: '6px' }}>{base.interval}</div>
          <div style={{ fontSize: '13px', color: '#94A3B8' }}>{base.reason}</div>
        </div>

        {feature !== 'standard' && (
          <div style={{ backgroundColor: '#0D2137', border: '1px solid #F59E0B', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', color: '#F59E0B', fontWeight: 700, marginBottom: '6px' }}>⚠️ ADJUSTMENT FOR YOUR HOME</div>
            <div style={{ fontSize: '14px', color: '#E8EDF5' }}>{override.adjustment}</div>
          </div>
        )}

        <div style={{ backgroundColor: '#1E2D45', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#F5E642', marginBottom: '12px' }}>📱 Reminder Setup Tips</div>
          {reminderTips.map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px', fontSize: '13px', color: '#CBD5E1' }}>
              <span style={{ color: '#F5E642', flexShrink: 0 }}>{i + 1}.</span><span>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
