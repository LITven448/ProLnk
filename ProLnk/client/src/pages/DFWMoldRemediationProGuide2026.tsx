import { useState } from 'react';

export default function DFWMoldRemediationProGuide2026() {
  const [jobType, setJobType] = useState('crawlspace');

  const jobs: Record<string, { label: string; low: number; high: number; days: number; insured: boolean; note: string }> = {
    crawlspace: { label: 'Crawlspace Mold', low: 3500, high: 6000, days: 2, insured: false, note: 'Common after foundation moisture intrusion' },
    attic: { label: 'Attic Mold', low: 4000, high: 7000, days: 3, insured: false, note: 'HVAC condensation is top cause in DFW' },
    bathroom: { label: 'Bathroom Mold', low: 1200, high: 3500, days: 1, insured: false, note: 'High repeat frequency in older DFW homes' },
    water_damage: { label: 'Post-Water Damage', low: 5000, high: 12000, days: 5, insured: true, note: 'Insurance-involved — add 2–3 weeks for adjuster' },
    full_home: { label: 'Full Home Remediation', low: 8000, high: 25000, days: 10, insured: true, note: 'Major insurance claim — highest margin job' },
  };

  const j = jobs[jobType];
  const avgJob = Math.round((j.low + j.high) / 2);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🌫️</span>
          <div>
            <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk Pro Guide — DFW 2026</div>
            <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>Mold Remediation Pro Guide</h1>
          </div>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>TX TDLR-licensed mold contractors — ProLnk connects you immediately after water damage events.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🪪', label: 'TX License (TDLR)', value: 'Required' },
            { icon: '💵', label: 'Avg Job Range', value: '$3.5K–$8K' },
            { icon: '🌧️', label: 'DFW Spring Humidity', value: 'Demand surge' },
            { icon: '📄', label: 'Insurance Jobs', value: 'High paperwork' },
          ].map((s) => (
            <div key={s.label} style={{ backgroundColor: '#0f1f3d', borderRadius: 12, padding: '18px 20px' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 700 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f1f3d', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 16px' }}>💰 Job Type Revenue Projector</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {Object.entries(jobs).map(([key, val]) => (
              <button key={key} onClick={() => setJobType(key)} style={{ padding: '7px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 12, backgroundColor: jobType === key ? '#F5E642′ : '#1e3a5f', color: jobType === key ? '#0A1628' : '#94a3b8' }}>
                {val.label}
              </button>
            ))}
          </div>
          <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 20, marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{j.label}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{j.note}</div>
              </div>
              {j.insured && <span style={{ backgroundColor: '#1e3a5f', color: '#F5E642', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 6 }}>INSURANCE</span>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 12 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: 11 }}>Job Range</div>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>${j.low.toLocaleString()}–${j.high.toLocaleString()}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: 11 }}>Avg Revenue</div>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>${avgJob.toLocaleString()}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: 11 }}>Timeline</div>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{j.days} day{j.days > 1 ? 's' : ''}</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#0f1f3d', borderRadius: 16, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 12px' }}>⚡ ProLnk Instant Routing</h2>
          {['ProLnk monitors DFW weather events and flood reports — routes mold pros within hours', 'Water damage → mold risk window is 24–72 hours — speed wins the job', 'ProLnk connects you to homeowners before competitors even know there was a loss', 'Insurance-involved jobs: ProLnk provides documentation templates to streamline claims', 'TDLR license verification required before profile activation'].map((n) => (
            <div key={n} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642', flexShrink: 0 }}>→</span>
              <span style={{ color: '#94a3b8', fontSize: 13 }}>{n}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}