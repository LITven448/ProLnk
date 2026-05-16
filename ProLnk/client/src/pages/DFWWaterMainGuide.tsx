import { useState } from 'react';

const homeTypes = ['Single Family (Slab)', 'Single Family (Pier & Beam)', 'Townhome', 'Condo/Apartment'];
const dfwCities = ['Dallas', 'Fort Worth', 'Plano', 'Frisco', 'McKinney', 'Arlington', 'Irving', 'Garland', 'Richardson', 'Denton', 'Allen', 'Other DFW'];

function getGuide(homeType: string, city: string) {
  const slabNote = homeType.includes('Slab') ? 'Slab homes: shut-off is typically at the meter box near the street curb or in a ground box in front yard.' : 'Pier & beam homes: you may also have a secondary shut-off under the house near the foundation.';
  const cityContact: Record<string, string> = {
    'Dallas': 'Dallas Water Utilities: 214-651-1441',
    'Fort Worth': 'Fort Worth Water: 817-392-4477',
    'Plano': 'Plano Public Works: 972-769-4150',
    'Frisco': 'Frisco Water: 972-292-5900',
    'McKinney': 'McKinney Water: 972-547-7321',
    'Arlington': 'Arlington Water: 817-275-5931',
    'Irving': 'Irving Water: 972-721-3600',
    'Garland': 'Garland Water: 972-205-2671',
    'Richardson': 'Richardson Water: 972-744-4150',
    'Denton': 'Denton Utilities: 940-349-8700',
    'Allen': 'Allen Water: 214-509-4150',
  };
  return {
    shutoff: slabNote,
    boundary: 'City responsibility: from main line to meter. Your responsibility: from meter to house and all interior lines.',
    emergency: cityContact[city] || 'Contact your city water department — check your utility bill for the 24-hr emergency line.',
  };
}

export default function DFWWaterMainGuide() {
  const [homeType, setHomeType] = useState('');
  const [city, setCity] = useState('');
  const result = homeType && city ? getGuide(homeType, city) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>💧 DFW Home Health Vault</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>Water Main & Shut-Off Guide — DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, fontSize: 15 }}>Knowing your shut-off valve location before an emergency can save thousands in water damage. DFW homes vary — meter box placement, valve style, and city vs. private line boundaries differ by municipality.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🚰', title: 'Water Main Break Signs', body: 'Sudden low pressure, wet spots in yard, muddy water, unexplained water bill spikes — act immediately.' },
            { icon: '🔑', title: 'How to Shut Off', body: 'Use a meter key (flat-head or T-bar). Turn clockwise to close. Test annually — valves can seize if unused.' },
            { icon: '🏙️', title: 'City vs. Private Line', body: 'The city owns from the main to the meter. You own everything from the meter to and inside your home.' },
            { icon: '⏱️', title: 'Emergency Response', body: 'If you cannot find or close your shut-off, call your city water emergency line — available 24/7.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0F2040', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{c.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🗺️ Your Shut-Off Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Home Type</label>
              <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ width: '100%', background: '#1A2F50', border: '1px solid #2A4A70', borderRadius: 8, color: '#E8EDF5', padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select home type</option>
                {homeTypes.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>DFW City</label>
              <select value={city} onChange={e => setCity(e.target.value)} style={{ width: '100%', background: '#1A2F50', border: '1px solid #2A4A70', borderRadius: 8, color: '#E8EDF5', padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select city</option>
                {dfwCities.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div><div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4, fontSize: 13 }}>📍 SHUT-OFF LOCATION</div><div style={{ color: '#E8EDF5', fontSize: 14 }}>{result.shutoff}</div></div>
              <div><div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4, fontSize: 13 }}>🏛️ CITY vs. PRIVATE BOUNDARY</div><div style={{ color: '#E8EDF5', fontSize: 14 }}>{result.boundary}</div></div>
              <div><div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4, fontSize: 13 }}>📞 EMERGENCY CONTACT</div><div style={{ color: '#E8EDF5', fontSize: 14 }}>{result.emergency}</div></div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>🛠️ Annual Shut-Off Maintenance</div>
          <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.8 }}>
            • Exercise your main shut-off valve once per year to prevent seizure<br/>
            • Document valve location with a photo — share with family members<br/>
            • If valve is corroded or stiff, call a plumber before an emergency forces the issue<br/>
            • Consider installing a ball valve inside the home for quicker emergency shutoff
          </div>
        </div>
      </div>
    </div>
  );
}
