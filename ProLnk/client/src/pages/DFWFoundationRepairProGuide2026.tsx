import { useState } from 'react';

export default function DFWFoundationRepairProGuide2026() {
  const [area, setArea] = useState('north_dallas');

  const areas: Record<string, { label: string; homes: number; marketSize: number; soilRisk: string; note: string }> = {
    north_dallas: { label: 'North Dallas / Plano', homes: 280000, marketSize: 560, soilRisk: 'High', note: 'Expansive clay soil — top DFW foundation market' },
    fort_worth: { label: 'Fort Worth / Tarrant', homes: 320000, marketSize: 640, soilRisk: 'Very High', note: 'Highest clay soil concentration in metro' },
    east_dfw: { label: 'East DFW / Garland', homes: 210000, marketSize: 420, soilRisk: 'High', note: 'Aging housing stock drives high demand' },
    south_dfw: { label: 'South DFW / Mansfield', homes: 180000, marketSize: 360, soilRisk: 'Medium', note: 'Growing market with new construction expansion' },
    frisco_mckinney: { label: 'Frisco / McKinney', homes: 240000, marketSize: 480, soilRisk: 'High', note: 'Fast growth — new and established home mix' },
  };

  const a = areas[area];
  const estimatedJobsPerYear = Math.round(a.homes * 0.015);
  const estimatedRevenue = estimatedJobsPerYear * 12000;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🏗️</span>
          <div>
            <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk Pro Guide — DFW 2026</div>
            <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>Foundation Repair Pro Guide</h1>
          </div>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW is one of the highest-volume foundation repair markets in the US — ProLnk connects high-ticket jobs.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '⚖️', label: 'TX License Required', value: 'None (unlicensed)' },
            { icon: '👷', label: 'Engineer Oversight', value: 'Required for permits' },
            { icon: '💵', label: 'Avg Job Value', value: '$8K–$25K' },
            { icon: '📍', label: 'DFW Market Rank', value: '#1 in US' },
          ].map((s) => (
            <div key={s.label} style={{ backgroundColor: '#0f1f3d', borderRadius: 12, padding: '18px 20px' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontSize: 18, fontWeight: 700 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f1f3d', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 16px' }}>🗺️ Service Area Market Opportunity</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {Object.entries(areas).map(([key, val]) => (
              <button key={key} onClick={() => setArea(key)} style={{ padding: '7px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 12, backgroundColor: area === key ? '#F5E642' : '#1e3a5f', color: area === key ? '#0A1628' : '#94a3b8' }}>
                {val.label}
              </button>
            ))}
          </div>
          <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 20, marginBottom: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{a.label}</div>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 16 }}>{a.note}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: 11 }}>Homes in Area</div>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{a.homes.toLocaleString()}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: 11 }}>Est. Jobs/Year</div>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{estimatedJobsPerYear.toLocaleString()}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: 11 }}>Market Revenue</div>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>${(estimatedRevenue / 1000000).toFixed(1)}M/yr</div>
              </div>
            </div>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: '#94a3b8', fontSize: 12 }}>Soil Expansion Risk:</span>
              <span style={{ color: a.soilRisk === 'Very High' ? '#ef4444' : '#f59e0b', fontWeight: 700, fontSize: 13 }}>{a.soilRisk}</span>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#0f1f3d', borderRadius: 16, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 12px' }}>📋 TX Foundation Repair Facts</h2>
          {['TX foundation repair is an unlicensed trade — no state contractor license required to operate', 'Structural engineer oversight required when permits are pulled for major repairs', 'DFW expansive clay soil is the root cause of 80%+ of foundation issues in the metro', 'Pier and beam systems average $8K–15K; slab repairs average $12K–25K', 'ProLnk surfaces high-ticket foundation leads — avg match value 5–10x a standard trade job'].map((n) => (
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