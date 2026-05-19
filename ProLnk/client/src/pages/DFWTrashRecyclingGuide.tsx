import { useState } from 'react';

const cityData: Record<string, {
  trashDays: string;
  recyclingDays: string;
  recyclingAccepted: string[];
  recyclingRejected: string[];
  bulkPickup: string;
  hazardousWaste: string;
  composting: string;
  premiumService: boolean;
  notes: string;
}> = {
  Dallas: {
    trashDays: 'Once weekly — varies by zone. Check sanitation.dallascityhall.com.',
    recyclingDays: 'Every other week on your trash day.',
    recyclingAccepted: ['Cardboard (flattened)', 'Paper/mail', 'Plastic #1 and #2 only', 'Glass bottles and jars', 'Aluminum and steel cans', 'Cartons (milk, juice)'],
    recyclingRejected: ['Plastic bags', 'Styrofoam', 'Plastic #3–#7', 'Greasy pizza boxes', 'Food-soiled containers', 'Electronics', 'Shredded paper'],
    bulkPickup: 'Monthly — schedule via 311 or online. Up to 3 cubic yards. No construction debris, no tires.',
    hazardousWaste: 'McCommas Bluff Landfill — HHW drop-off by appointment. Accepts paint, chemicals, batteries, fluorescent bulbs.',
    composting: 'No city composting program. Private services available (Bootstrap Compost, etc.).',
    premiumService: false,
    notes: 'Dallas basic service — no curbside collection of yard waste beyond weekly bundle pickup.',
  },
  Frisco: {
    trashDays: 'Twice weekly — Monday and Thursday (most areas).',
    recyclingDays: 'Weekly — same as first trash day.',
    recyclingAccepted: ['Cardboard (flattened)', 'Plastic #1–#5 and #7', 'Glass', 'Aluminum and steel cans', 'Paper', 'Cartons', 'Plastic bags (clean and dry)'],
    recyclingRejected: ['Styrofoam', 'Plastic #6', 'Food-soiled items', 'Electronics', 'Shredded paper', 'Hazardous materials'],
    bulkPickup: 'On-call bulk pickup — schedule 24 hrs in advance via city portal. No limit on quantity.',
    hazardousWaste: 'Frisco Public Works facility accepts HHW by appointment. Also uses Collin County HHW facility.',
    composting: 'City-run organic waste program available. Yard waste collected weekly in separate brown cart.',
    premiumService: true,
    notes: 'Frisco has one of the best residential waste programs in DFW. Twice-weekly trash is rare metro-wide.',
  },
  Plano: {
    trashDays: 'Once weekly — Friday for most of Plano.',
    recyclingDays: 'Every other week on Friday.',
    recyclingAccepted: ['Cardboard (flattened)', 'Paper', 'Plastic #1–#2', 'Glass', 'Aluminum and steel cans'],
    recyclingRejected: ['Plastic bags', 'Styrofoam', 'Plastics #3–#7', 'Electronics', 'Shredded paper', 'Batteries'],
    bulkPickup: 'Schedule via 972-769-4150 or Plano web portal. Up to 5 large items per pickup.',
    hazardousWaste: 'Plano Environmental Waste Services center at Spring Creek Pkwy. Open Saturdays.',
    composting: 'Limited. Yard waste taken weekly in paper bags or bundled. No food scrap program.',
    premiumService: false,
    notes: 'Plano residents often frustrated by bi-weekly recycling — check schedule carefully to avoid misses.',
  },
  McKinney: {
    trashDays: 'Twice weekly — Tuesday and Friday.',
    recyclingDays: 'Weekly — Tuesday.',
    recyclingAccepted: ['Cardboard', 'Paper', 'Plastic #1–#2', 'Glass', 'Metal cans', 'Cartons'],
    recyclingRejected: ['Plastic bags', 'Styrofoam', 'Plastic #3–#7', 'Shredded paper', 'Electronics', 'Hazardous materials'],
    bulkPickup: 'Schedule bulk pickup minimum 48 hrs in advance. Limit of 6 items per pickup.',
    hazardousWaste: 'Collin County HHW Facility in McKinney. Accepts paint, oil, antifreeze, batteries, fluorescent lights.',
    composting: 'Yard waste collected weekly in separate container. No food scrap composting program.',
    premiumService: true,
    notes: 'McKinney recently upgraded to twice-weekly trash. Service area is growing rapidly.',
  },
  Arlington: {
    trashDays: 'Twice weekly — varies by zone.',
    recyclingDays: 'Weekly.',
    recyclingAccepted: ['Cardboard', 'Paper', 'Plastic #1–#2', 'Aluminum and steel cans', 'Glass bottles and jars'],
    recyclingRejected: ['Plastic bags', 'Styrofoam', 'Electronics', 'Food-soiled items', 'Shredded paper'],
    bulkPickup: 'Monthly scheduled pickup. Call 817-459-6777 to arrange. Up to 4 cubic yards.',
    hazardousWaste: 'Tarrant County HHW events held quarterly. Dates posted on city website.',
    composting: 'No city food scrap program. Yard waste accepted weekly.',
    premiumService: true,
    notes: 'Arlington service considered above average in Tarrant County. DFW airport zone has different contractor.',
  },
  Garland: {
    trashDays: 'Once weekly — varies by neighborhood.',
    recyclingDays: 'Every other week.',
    recyclingAccepted: ['Cardboard', 'Paper', 'Plastic #1–#2', 'Glass', 'Metal cans'],
    recyclingRejected: ['Plastic bags', 'Styrofoam', 'Plastic #3–#7', 'Batteries', 'Electronics'],
    bulkPickup: 'On-call — schedule via 972-205-2671. Limit 4 items per pickup.',
    hazardousWaste: 'Dallas County HHW facility serves Garland residents. McCommas Bluff by appointment.',
    composting: 'No composting program. Yard waste weekly in paper bags only.',
    premiumService: false,
    notes: 'Garland recycling is bi-weekly — missed weeks are common. Set reminders.',
  },
};

export default function DFWTrashRecyclingGuide() {
  const [selectedCity, setSelectedCity] = useState('Dallas');
  const [tab, setTab] = useState<'accepted' | 'rejected'>('accepted');

  const city = cityData[selectedCity];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOMEOWNER GUIDE</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: 0, color: '#FFFFFF' }}>🗑️ DFW Trash & Recycling Guide</h1>
          <p style={{ color: '#8A9BB5', marginTop: 10 }}>Schedules, accepted materials, bulk pickup, and hazardous waste — by DFW city.</p>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 12, color: '#8A9BB5', marginBottom: 8, fontWeight: 600 }}>SELECT YOUR CITY</label>
          <select
            value={selectedCity}
            onChange={e => setSelectedCity(e.target.value)}
            style={{ background: '#111F35', color: '#E8EDF5', border: '1px solid #2A3F5F', borderRadius: 8, padding: '10px 14px', fontSize: 15, minWidth: 220 }}
          >
            {Object.keys(cityData).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {city.premiumService && (
            <span style={{ marginLeft: 14, background: '#F5E64220', color: '#F5E642', borderRadius: 6, padding: '4px 12px', fontSize: 12, fontWeight: 700 }}>⭐ PREMIUM SERVICE</span>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
          {[
            { icon: '🚛', label: 'TRASH PICKUP', value: city.trashDays },
            { icon: '♻️', label: 'RECYCLING', value: city.recyclingDays },
            { icon: '📦', label: 'BULK PICKUP', value: city.bulkPickup },
            { icon: '☠️', label: 'HAZARDOUS WASTE', value: city.hazardousWaste },
            { icon: '🌱', label: 'COMPOSTING', value: city.composting },
          ].map(item => (
            <div key={item.label} style={{ background: '#111F35', borderRadius: 12, padding: 20, borderTop: '3px solid #F5E642' }}>
              <div style={{ fontSize: 11, color: '#8A9BB5', marginBottom: 8, fontWeight: 700 }}>{item.icon} {item.label}</div>
              <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6 }}>{item.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111F35', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h3 style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>♻️ What Goes in the Recycling Bin?</h3>
          <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
            <button onClick={() => setTab('accepted')}
              style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer',
                background: tab === 'accepted' ? '#4ade80' : '#1A2E4A', color: tab === 'accepted' ? '#0A1628' : '#8A9BB5' }}>
              ✅ Accepted
            </button>
            <button onClick={() => setTab('rejected')}
              style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer',
                background: tab === 'rejected' ? '#f87171' : '#1A2E4A', color: tab === 'rejected' ? '#0A1628' : '#8A9BB5' }}>
              ❌ NOT Accepted
            </button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {(tab === 'accepted' ? city.recyclingAccepted : city.recyclingRejected).map(item => (
              <span key={item} style={{
                background: tab === 'accepted' ? '#052e1680' : '#3b0a0a80',
                color: tab === 'accepted' ? '#4ade80' : '#f87171',
                border: `1px solid ${tab === 'accepted' ? '#4ade8040' : '#f8717140'}`,
                borderRadius: 6, padding: '6px 14px', fontSize: 13, fontWeight: 600
              }}>{item}</span>
            ))}
          </div>
        </div>

        <div style={{ background: '#111F35', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>📋 LOCAL NOTES</div>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: 0 }}>{city.notes}</p>
        </div>
      </div>
    </div>
  );
}
