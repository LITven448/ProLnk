import { useState } from 'react';

const RATE = 0.015;
const AVG_ANNUAL_FEES = 420;

export default function ProLnkStream5OriginationRights() {
  const [homes, setHomes] = useState(50);
  const [yearsOut, setYearsOut] = useState(5);

  const annualIncome = homes * AVG_ANNUAL_FEES * RATE;
  const projectedTotal = annualIncome * yearsOut;

  const yearRows = Array.from({ length: Math.min(yearsOut, 10) }, (_, i) => ({
    year: i + 1,
    income: annualIncome * (i + 1),
    cumulative: annualIncome * (i + 1),
  }));

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>STREAM 5 OF 5</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🏛️ Origination Rights</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>Add homes to the Health Vault and earn 1.5% of all platform fees those homes generate — permanently.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 32 }}>
          {[
            { label: 'Your Rate', value: '1.5%', color: '#F5E642', sub: 'of all platform fees' },
            { label: 'Duration', value: 'Forever', color: '#10B981', sub: 'permanent right' },
            { label: 'Avg Fees/Home/Yr', value: '$420', color: '#3B82F6', sub: 'DFW market' },
          ].map(item => (
            <div key={item.label} style={{ background: '#111B2E', border: '2px solid #1E3A5F', borderRadius: 10, padding: 18, textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: item.color }}>{item.value}</div>
              <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>{item.label}</div>
              <div style={{ fontSize: 10, color: '#64748B' }}>{item.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111B2E', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>🏠 What Are Origination Rights?</div>
          <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            When you add a home to the ProLnk Health Vault, you become the permanent originator. Every time that home generates revenue — from match fees, inspections, or data licensing — you receive 1.5% automatically. This is a long-term asset: 100 homes today could generate passive income for decades.
          </p>
        </div>

        <div style={{ background: '#111B2E', borderRadius: 12, padding: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>📊 Origination Income Projector</div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>Homes Added to Vault: {homes}</label>
            <input type="range" min={0} max={500} value={homes} onChange={e => setHomes(+e.target.value)}
              style={{ width: '100%', accentColor: '#F5E642' }} />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>Projection Horizon: {yearsOut} years</label>
            <input type="range" min={1} max={10} value={yearsOut} onChange={e => setYearsOut(+e.target.value)}
              style={{ width: '100%', accentColor: '#F5E642' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 18, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#64748B', marginBottom: 4 }}>Annual Origination Income</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#F5E642' }}>${annualIncome.toFixed(0)}/yr</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 18, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#64748B', marginBottom: 4 }}>{yearsOut}-Year Total</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#10B981' }}>${projectedTotal.toFixed(0)}</div>
            </div>
          </div>

          <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 14px' }}>
            {yearRows.map(row => (
              <div key={row.year} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                <span style={{ color: '#94A3B8' }}>Year {row.year}</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>+${annualIncome.toFixed(0)} → ${row.cumulative.toFixed(0)} total</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}