import { useState } from 'react';

export default function DFWNeighborhoodGuide() {
  const [sortBy, setSortBy] = useState<string>('homeValue');

  const suburbs = [
    { name: 'Frisco', homeValue: 620000, schoolRating: 9.2, commute: 38, taxRate: 2.18, maintenance: 'Low', maintenanceScore: 1 },
    { name: 'Plano', homeValue: 490000, schoolRating: 8.9, commute: 28, taxRate: 2.07, maintenance: 'Low', maintenanceScore: 2 },
    { name: 'McKinney', homeValue: 520000, schoolRating: 8.6, commute: 42, taxRate: 2.14, maintenance: 'Low-Mod', maintenanceScore: 3 },
    { name: 'Allen', homeValue: 505000, schoolRating: 9.0, commute: 33, taxRate: 2.20, maintenance: 'Low', maintenanceScore: 2 },
    { name: 'Flower Mound', homeValue: 560000, schoolRating: 9.1, commute: 40, taxRate: 2.11, maintenance: 'Moderate', maintenanceScore: 4 },
    { name: 'Southlake', homeValue: 1050000, schoolRating: 9.6, commute: 35, taxRate: 2.28, maintenance: 'High', maintenanceScore: 7 },
    { name: 'Arlington', homeValue: 295000, schoolRating: 6.4, commute: 25, taxRate: 2.48, maintenance: 'Moderate', maintenanceScore: 5 },
    { name: 'Garland', homeValue: 285000, schoolRating: 6.1, commute: 22, taxRate: 2.38, maintenance: 'Mod-High', maintenanceScore: 6 },
    { name: 'Mesquite', homeValue: 255000, schoolRating: 5.8, commute: 20, taxRate: 2.52, maintenance: 'High', maintenanceScore: 8 },
    { name: 'Grand Prairie', homeValue: 278000, schoolRating: 6.2, commute: 22, taxRate: 2.44, maintenance: 'Mod-High', maintenanceScore: 6 },
  ];

  const sorted = [...suburbs].sort((a, b) => {
    if (sortBy === 'homeValue') return a.homeValue - b.homeValue;
    if (sortBy === 'school') return b.schoolRating - a.schoolRating;
    if (sortBy === 'commute') return a.commute - b.commute;
    if (sortBy === 'tax') return a.taxRate - b.taxRate;
    if (sortBy === 'maintenance') return a.maintenanceScore - b.maintenanceScore;
    return 0;
  });

  const maintenanceColor = (m: string) => {
    if (m === 'Low') return '#22C55E';
    if (m === 'Low-Mod') return '#84CC16';
    if (m === 'Moderate') return '#F59E0B';
    if (m === 'Mod-High') return '#F97316';
    return '#EF4444';
  };

  const sortOptions = [
    { key: 'homeValue', label: '💰 Home Value' },
    { key: 'school', label: '🎓 Schools' },
    { key: 'commute', label: '🚗 Commute' },
    { key: 'tax', label: '📋 Tax Rate' },
    { key: 'maintenance', label: '🔧 Maintenance' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>DFW Relocation Guide</div>
        <h1 style={{ fontSize: 42, fontWeight: 800, color: '#F8FAFC', marginBottom: 16, lineHeight: 1.1 }}>
          DFW Neighborhood Comparison
        </h1>
        <p style={{ fontSize: 20, color: '#94A3B8', marginBottom: 48, lineHeight: 1.6 }}>
          Which DFW Suburb Is Right for You? 10 suburbs ranked across 5 factors.
        </p>

        <div style={{ background: '#132038', border: '1px solid #1E3A5F', borderRadius: 12, padding: 20, marginBottom: 32 }}>
          <div style={{ fontSize: 14, color: '#64748B', marginBottom: 12 }}>Sort by:</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {sortOptions.map(opt => (
              <button
                key={opt.key}
                onClick={() => setSortBy(opt.key)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: `2px solid ${sortBy === opt.key ? '#3B82F6' : '#1E3A5F'}`,
                  background: sortBy === opt.key ? '#1E3A5F' : '#0F2033',
                  color: sortBy === opt.key ? '#93C5FD' : '#64748B',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr style={{ background: '#0F2033′ }}>
                <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: 13, color: '#64748B', fontWeight: 600, borderBottom: '1px solid #1E3A5F' }}>Suburb</th>
                <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: 13, color: sortBy === 'homeValue' ? '#3B82F6′ : '#64748B', fontWeight: 600, borderBottom: '1px solid #1E3A5F' }}>Avg Home Value</th>
                <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: 13, color: sortBy === 'school' ? '#3B82F6′ : '#64748B', fontWeight: 600, borderBottom: '1px solid #1E3A5F' }}>School Rating</th>
                <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: 13, color: sortBy === 'commute' ? '#3B82F6′ : '#64748B', fontWeight: 600, borderBottom: '1px solid #1E3A5F' }}>Commute (min)</th>
                <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: 13, color: sortBy === 'tax' ? '#3B82F6′ : '#64748B', fontWeight: 600, borderBottom: '1px solid #1E3A5F' }}>Tax Rate</th>
                <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: 13, color: sortBy === 'maintenance' ? '#3B82F6′ : '#64748B', fontWeight: 600, borderBottom: '1px solid #1E3A5F' }}>Maintenance</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((suburb, i) => (
                <tr
                  key={suburb.name}
                  style={{ borderBottom: '1px solid #1E3A5F', background: i % 2 === 0 ? '#0F2033′ : '#0A1628' }}
                >
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#F8FAFC', fontSize: 15 }}>{suburb.name}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', color: '#94A3B8', fontWeight: 600 }}>
                    ${suburb.homeValue >= 1000000 ? `${(suburb.homeValue / 1000000).toFixed(1)}M` : `${Math.round(suburb.homeValue / 1000)}K`}
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <span style={{ color: suburb.schoolRating >= 9 ? '#22C55E' : suburb.schoolRating >= 7.5 ? '#F59E0B' : '#EF4444', fontWeight: 700 }}>
                      {suburb.schoolRating}/10
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', color: suburb.commute <= 25 ? '#22C55E' : suburb.commute <= 35 ? '#F59E0B' : '#EF4444', fontWeight: 600 }}>
                    {suburb.commute} min
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', color: suburb.taxRate <= 2.15 ? '#22C55E' : suburb.taxRate <= 2.35 ? '#F59E0B' : '#EF4444', fontWeight: 600 }}>
                    {suburb.taxRate}%
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <span style={{ color: maintenanceColor(suburb.maintenance), fontWeight: 600, fontSize: 13 }}>
                      {suburb.maintenance}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 48 }}>
          {[
            { label: 'Best Schools', winner: 'Southlake', detail: '9.6/10 rating — consistently top-ranked in Texas', icon: '🎓' },
            { label: 'Best Value', winner: 'Plano', detail: 'High schools (8.9), reasonable prices, short commute', icon: '💰' },
            { label: 'Fastest Commute', winner: 'Mesquite', detail: '20 min to downtown Dallas — older suburb, easy I-30 access', icon: '🚗' },
            { label: 'Lowest Taxes', winner: 'Plano', detail: '2.07% — among the lowest in DFW for a major suburb', icon: '📋' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#0F2033', border: '1px solid #1E3A5F', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontSize: 12, color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#F59E0B', marginBottom: 6 }}>{item.winner}</div>
              <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.5 }}>{item.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #132038 100%)', border: '1px solid #3B82F6', borderRadius: 16, padding: 36, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>🏘️</div>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: '#F8FAFC', marginBottom: 12 }}>TrustyPro Works in Every DFW Suburb</h3>
          <p style={{ color: '#94A3B8', marginBottom: 24 }}>Wherever you choose to plant roots in DFW, TrustyPro's Home Health Vault and verified contractor network is there. Add your new home to the vault and start building your maintenance history from day one.</p>
          <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#3B82F6', color: '#fff', padding: '14px 32px', borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
            Add Your Home to TrustyPro
          </a>
        </div>

      </div>
    </div>
  );
}
