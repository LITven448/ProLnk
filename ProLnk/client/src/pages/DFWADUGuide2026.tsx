import { useState } from 'react';

const ADU_TYPES = [
  { id: 'detached', label: '🏠 Detached Backyard Cottage', costLow: 100000, costHigh: 200000, rent: 1400 },
  { id: 'garage_apt', label: '🚗 Garage Apartment (above garage)', costLow: 80000, costHigh: 150000, rent: 1200 },
  { id: 'basement', label: '🪜 Basement Apartment (very rare in DFW)', costLow: 60000, costHigh: 120000, rent: 1000 },
  { id: 'attached', label: '🏘️ Attached Addition w/ Separate Entry', costLow: 90000, costHigh: 160000, rent: 1300 },
];

const LOT_SIZES = [
  { id: 'small', label: 'Small (< 6,000 sq ft)', eligible: ['attached'] },
  { id: 'medium', label: 'Medium (6,000–10,000 sq ft)', eligible: ['attached', 'garage_apt'] },
  { id: 'large', label: 'Large (10,000+ sq ft)', eligible: ['attached', 'garage_apt', 'detached'] },
];

const DFW_CITIES = [
  { city: 'Dallas', status: '✅ Allowed', note: 'SB 2 compliant — ADUs permitted on all SF lots' },
  { city: 'Fort Worth', status: '✅ Allowed', note: 'ADU ordinance updated 2024 — streamlined permitting' },
  { city: 'Plano', status: '✅ Allowed', note: 'Permits in 4–6 weeks, setback rules apply' },
  { city: 'Frisco', status: '⚠️ Restricted', note: 'HOA-dominant — verify CC&Rs; city allows but HOAs often prohibit' },
  { city: 'McKinney', status: '✅ Allowed', note: 'ADU-friendly ordinance, good permitting timeline' },
  { city: 'Irving', status: '✅ Allowed', note: 'Recently updated to comply with SB 2' },
  { city: 'Garland', status: '✅ Allowed', note: 'Compliant — typical suburban setbacks apply' },
  { city: 'Arlington', status: '⚠️ In Progress', note: 'Updating ordinances for SB 2 compliance' },
];

export default function DFWADUGuide2026() {
  const [aduType, setAduType] = useState('detached');
  const [lotSize, setLotSize] = useState('large');

  const selected = ADU_TYPES.find(a => a.id === aduType)!;
  const selectedLot = LOT_SIZES.find(l => l.id === lotSize)!;
  const isEligible = selectedLot.eligible.includes(aduType);
  const midCost = Math.round((selected.costLow + selected.costHigh) / 2);
  const monthlyRent = selected.rent;
  const annualRent = monthlyRent * 12;
  const paybackYears = Math.round(midCost / annualRent * 10) / 10;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '0 0 80px' }}>
      <div style={{ backgroundColor: '#0D1E38', borderBottom: '3px solid #F5E642', padding: '40px 24px 32px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>DFW HOME IMPROVEMENT GUIDE 2026</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>ADU Guide for DFW 2026</h1>
          <p style={{ color: '#A0AABE', fontSize: 16, margin: 0, maxWidth: 620 }}>Accessory Dwelling Units are now legal across Texas thanks to SB 2 (2023). Here's how to build one in DFW and what it will earn you.</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>⚖️ Texas SB 2 (2023) — What It Means for You</h2>
          <div style={{ backgroundColor: '#0D1E38', border: '1px solid #F5E642', borderRadius: 12, padding: 24 }}>
            <p style={{ color: '#CBD5E0', lineHeight: 1.7, marginBottom: 16 }}>Texas Senate Bill 2, signed in 2023, prohibits cities from banning ADUs on single-family lots. This is a massive change — previously, most DFW suburbs outright prohibited detached ADUs.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                '✅ Cities can no longer prohibit ADUs on SF residential lots',
                '✅ Cities can still set reasonable setback, height, and size limits',
                '⚠️ HOAs are NOT affected — they can still prohibit ADUs',
                '⚠️ Short-term rental (Airbnb) rules vary by city — verify separately',
              ].map(item => (
                <div key={item} style={{ backgroundColor: '#162840', borderRadius: 8, padding: '12px 14px', fontSize: 13, color: '#CBD5E0' }}>{item}</div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🏙️ DFW City-by-City Status</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
            {DFW_CITIES.map(c => (
              <div key={c.city} style={{ backgroundColor: '#0D1E38', border: '1px solid #1E3A5F', borderRadius: 10, padding: '16px 18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>{c.city}</span>
                  <span style={{ fontSize: 13 }}>{c.status}</span>
                </div>
                <div style={{ color: '#8090A8', fontSize: 12 }}>{c.note}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>📦 ADU Types & Costs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {ADU_TYPES.map(a => (
              <div key={a.id} style={{ backgroundColor: '#0D1E38', border: `1px solid ${aduType === a.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 12, padding: 20, cursor: 'pointer' }} onClick={() => setAduType(a.id)}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{a.label}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>${(a.costLow / 1000).toFixed(0)}K–${(a.costHigh / 1000).toFixed(0)}K</div>
                <div style={{ color: '#8090A8', fontSize: 12, marginTop: 4 }}>~${a.rent.toLocaleString()}/mo rental income</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 40, backgroundColor: '#0D1E38', border: '2px solid #F5E642', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 24 }}>🧮 ADU Feasibility Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#A0AABE', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Lot Size</label>
              <select value={lotSize} onChange={e => setLotSize(e.target.value)} style={{ width: '100%', backgroundColor: '#162840', border: '1px solid #2A4870', borderRadius: 8, padding: '10px 12px', color: '#E8EAF0', fontSize: 14 }}>
                {LOT_SIZES.map(l => <option key={l.id} value={l.id}>{l.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#A0AABE', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>ADU Type</label>
              <select value={aduType} onChange={e => setAduType(e.target.value)} style={{ width: '100%', backgroundColor: '#162840', border: '1px solid #2A4870', borderRadius: 8, padding: '10px 12px', color: '#E8EAF0', fontSize: 14 }}>
                {ADU_TYPES.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
              </select>
            </div>
          </div>
          {!isEligible && (
            <div style={{ backgroundColor: '#2A1010', border: '1px solid #E53E3E', borderRadius: 10, padding: '14px 18px', marginBottom: 20, color: '#FC8181', fontSize: 14 }}>
              ⚠️ This ADU type may not fit your lot size. Consider an attached addition or garage apartment for smaller lots.
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <div style={{ backgroundColor: '#162840', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#A0AABE', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>BUILD COST</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 800 }}>${(selected.costLow / 1000).toFixed(0)}K–${(selected.costHigh / 1000).toFixed(0)}K</div>
            </div>
            <div style={{ backgroundColor: '#162840', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#A0AABE', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>EST. RENTAL INCOME</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 800 }}>${monthlyRent.toLocaleString()}/mo</div>
            </div>
            <div style={{ backgroundColor: '#162840', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#A0AABE', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>PAYBACK PERIOD</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 800 }}>{paybackYears} yrs</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
