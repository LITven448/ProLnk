import { useState } from 'react';

const challenges = [
  { emoji: '📈', challenge: 'Explosive Growth', stat: '1.3M new residents since 2010', how: 'Demand for home services is outpacing supply. ProLnk routes that overflow to vetted local pros instead of craigslist.' },
  { emoji: '🔧', challenge: 'Contractor Shortage', stat: 'DFW has 40% fewer licensed pros per capita vs national avg', how: 'ProLnk concentrates demand onto a verified network — every job goes to someone who can actually do it.' },
  { emoji: '🏗️', challenge: 'New + Old Mix', stat: '250K+ homes built pre-1980 alongside 80K new builds/yr', how: 'Both need different expertise. The algorithm matches job type to pro specialization — not just proximity.' },
  { emoji: '☀️', challenge: 'Weather Extremes', stat: '100°F+ summers, flash ice storms, tornado risk', how: 'Emergency surge matching built for DFW seasonal patterns — HVAC, roofing, water damage pros on standby.' },
];

const homeownerTypes = [
  { label: 'New homebuyer', result: 'Get a Home Health Vault started from day one. Every repair documented. Future sale value protected from the first month.' },
  { label: 'Long-time owner', result: 'Consolidate 10+ years of service history into a single verified record. Finally see what your home has cost — and what it\’s worth.' },
  { label: 'Landlord / investor', result: 'Manage multiple properties from one dashboard. Vendors vetted, invoices tracked, maintenance history per address.' },
  { label: 'Selling soon', result: 'Vault-backed home history increases buyer confidence and supports a faster, higher close. Agents love it.' },
];

export default function ProLnkForDFW() {
  const [ownerType, setOwnerType] = useState(0);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#0A1628', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ background: '#0A1628', color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, display: 'inline-block', padding: '6px 18px', borderRadius: 20, marginBottom: 16 }}>DALLAS-FORT WORTH</div>
          <h1 style={{ fontSize: 44, fontWeight: 900, margin: '0 0 16px', color: '#0A1628' }}>Why ProLnk Was Built for DFW</h1>
          <p style={{ color: '#475569', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>
            The fastest-growing metro in America has a home services crisis. ProLnk was designed to solve it here first — then everywhere.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 16, marginBottom: 48 }}>
          {challenges.map((c, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', display: 'flex', gap: 20, alignItems: 'flex-start', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 32, minWidth: 44 }}>{c.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4, flexWrap: 'wrap', gap: 8 }}>
                  <span style={{ color: '#0A1628', fontWeight: 700, fontSize: 17 }}>{c.challenge}</span>
                  <span style={{ background: '#fef9c3', color: '#854d0e', fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>{c.stat}</span>
                </div>
                <div style={{ color: '#475569' }}>{c.how}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 48 }}>
          {[['🏘️', '4.2M', 'DFW households'], ['⚡', '< 15 min', 'Emergency match SLA'], ['🤝', '500', 'Charter pros launching']].map(([emoji, stat, label], i) => (
            <div key={i} style={{ background: '#0A1628', borderRadius: 14, padding: '28px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{emoji}</div>
              <div style={{ color: '#F5E642', fontSize: 32, fontWeight: 900, marginBottom: 4 }}>{stat}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: 32 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 40 }}>🌎</div>
            <div>
              <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 18, marginBottom: 6 }}>Why Starting in DFW Makes ProLnk Better Nationally</div>
              <div style={{ color: '#475569' }}>DFW has every market condition at once — aging stock, new builds, climate extremes, rapid migration, contractor shortage, and a diverse homeowner base. If the algorithm works here, it works anywhere. Every match in DFW trains the system for Houston, Phoenix, Charlotte, and beyond.</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#0A1628', borderRadius: 16, padding: 32 }}>
          <h2 style={{ color: '#F5E642', fontWeight: 800, marginBottom: 20 }}>🏡 What ProLnk Does For You</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
            {homeownerTypes.map((t, i) => (
              <button key={i} onClick={() => setOwnerType(i)}
                style={{ padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                  background: ownerType === i ? '#F5E642' : '#1e3a5f', color: ownerType === i ? '#0A1628' : '#fff' }}>
                {t.label}
              </button>
            ))}
          </div>
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 24 }}>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>You are: {homeownerTypes[ownerType].label}</div>
            <div style={{ color: '#fff', fontSize: 16, lineHeight: 1.6 }}>{homeownerTypes[ownerType].result}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
