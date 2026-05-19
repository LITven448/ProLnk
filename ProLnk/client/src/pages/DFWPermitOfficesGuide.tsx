import { useState } from 'react';

const projectTypes = ['Roof Replacement', 'HVAC Replacement', 'Fence', 'Deck/Patio', 'Room Addition', 'Electrical Panel Upgrade', 'Pool', 'Garage Conversion', 'Window Replacement'];

const cityPermitData: Record<string, {
  onlinePortal: boolean;
  portalName: string;
  waitTime: string;
  processingNote: string;
  contactPhone: string;
  address: string;
  hours: string;
}> = {
  Dallas: {
    onlinePortal: true,
    portalName: 'Dallas Development Services Portal',
    waitTime: '2–4 weeks',
    processingNote: 'Dallas is high volume. Simple permits may take 3 weeks even online. Major remodels can take 6+ weeks.',
    contactPhone: '214-948-4480',
    address: '320 E. Jefferson Blvd, Dallas TX 75203',
    hours: 'Mon–Fri 7:30am–4:30pm',
  },
  Frisco: {
    onlinePortal: true,
    portalName: 'City of Frisco eTRAKiT',
    waitTime: '3–5 business days',
    processingNote: 'Frisco is one of the fastest in DFW. Online portal is well-maintained. Complex additions reviewed in 2 weeks.',
    contactPhone: '972-292-5300',
    address: '6101 Frisco Square Blvd, Frisco TX 75034',
    hours: 'Mon–Fri 8am–5pm',
  },
  Plano: {
    onlinePortal: true,
    portalName: 'Plano Online Permit Portal',
    waitTime: '5–10 business days',
    processingNote: 'Plano online portal is reliable. In-person appointments for complex projects recommended.',
    contactPhone: '972-941-7151',
    address: '1520 K Ave, Plano TX 75074',
    hours: 'Mon–Fri 8am–5pm',
  },
  McKinney: {
    onlinePortal: true,
    portalName: 'McKinney MyGovernmentOnline',
    waitTime: '5–7 business days',
    processingNote: 'McKinney growing rapidly — staffing sometimes lags demand. Check portal status before calling.',
    contactPhone: '972-547-7425',
    address: '221 N. Tennessee St, McKinney TX 75069',
    hours: 'Mon–Fri 8am–5pm',
  },
  'Fort Worth': {
    onlinePortal: true,
    portalName: 'Fort Worth Development Portal',
    waitTime: '1–3 weeks',
    processingNote: 'Fort Worth split between fast online approvals and slow in-person reviews. Use portal for simple permits.',
    contactPhone: '817-392-2222',
    address: '401 W. 13th St, Fort Worth TX 76102',
    hours: 'Mon–Fri 8am–5pm',
  },
  Arlington: {
    onlinePortal: true,
    portalName: 'Arlington ePermitting',
    waitTime: '7–14 business days',
    processingNote: 'Arlington permit office is mid-tier speed. Residential permits often faster than commercial backlog.',
    contactPhone: '817-459-6155',
    address: '101 W. Abram St, Arlington TX 76010',
    hours: 'Mon–Fri 7:30am–4:30pm',
  },
  Garland: {
    onlinePortal: true,
    portalName: 'Garland Development Center Portal',
    waitTime: '1–2 weeks',
    processingNote: 'Garland generally responsive. In-person walk-through permits available for simple projects same day.',
    contactPhone: '972-205-2170',
    address: '800 Main St, Garland TX 75040',
    hours: 'Mon–Fri 8am–5pm',
  },
};

const projectPermitData: Record<string, { required: boolean; typicalCost: string; requiresInspection: boolean; tip: string }> = {
  'Roof Replacement': { required: true, typicalCost: '$75–$175', requiresInspection: true, tip: 'Many contractors pull this permit — confirm they will. Final inspection required before job close.' },
  'HVAC Replacement': { required: true, typicalCost: '$65–$150', requiresInspection: true, tip: 'Mechanical permit required. Refrigerant work by licensed tech. Equipment efficiency must meet current code.' },
  'Fence': { required: true, typicalCost: '$50–$100', requiresInspection: false, tip: 'Height and placement rules vary by city. Pool fencing has separate requirements. Check HOA rules too.' },
  'Deck/Patio': { required: true, typicalCost: '$100–$250', requiresInspection: true, tip: 'Structural review required if attached to house. Footings must meet local frost depth (rare in DFW) and soil codes.' },
  'Room Addition': { required: true, typicalCost: '$400–$1,200', requiresInspection: true, tip: 'Most complex permit category — architectural plans often required. Allow extra weeks for plan review.' },
  'Electrical Panel Upgrade': { required: true, typicalCost: '$75–$175', requiresInspection: true, tip: 'Must be done by licensed electrician. Final inspection by city inspector required before energizing.' },
  'Pool': { required: true, typicalCost: '$250–$600', requiresInspection: true, tip: 'Requires barrier/fencing permit separate from construction. Multiple inspections during and after build.' },
  'Garage Conversion': { required: true, typicalCost: '$150–$400', requiresInspection: true, tip: 'Zoning rules matter here — some cities restrict ADUs or living space conversions. Check zoning first.' },
  'Window Replacement': { required: false, typicalCost: 'No permit', requiresInspection: false, tip: 'Like-for-like replacement usually no permit. Size changes or new openings require structural permit.' },
};

export default function DFWPermitOfficesGuide() {
  const [selectedCity, setSelectedCity] = useState('Dallas');
  const [selectedProject, setSelectedProject] = useState('Roof Replacement');

  const city = cityPermitData[selectedCity];
  const project = projectPermitData[selectedProject];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOMEOWNER GUIDE</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: 0, color: '#FFFFFF' }}>🏗️ DFW Permit Office Guide</h1>
          <p style={{ color: '#8A9BB5', marginTop: 10 }}>Wait times, costs, and processes vary enormously by DFW city. Know what to expect before you start.</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={{ display: 'block', fontSize: 12, color: '#8A9BB5', marginBottom: 8, fontWeight: 600 }}>YOUR CITY</label>
            <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}
              style={{ width: '100%', background: '#111F35', color: '#E8EDF5', border: '1px solid #2A3F5F', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}>
              {Object.keys(cityPermitData).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <label style={{ display: 'block', fontSize: 12, color: '#8A9BB5', marginBottom: 8, fontWeight: 600 }}>PROJECT TYPE</label>
            <select value={selectedProject} onChange={e => setSelectedProject(e.target.value)}
              style={{ width: '100%', background: '#111F35', color: '#E8EDF5', border: '1px solid #2A3F5F', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}>
              {projectTypes.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div style={{ background: '#111F35', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 20 }}>📋 {selectedProject} in {selectedCity}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 11, color: '#8A9BB5', marginBottom: 6, fontWeight: 700 }}>🪪 PERMIT REQUIRED</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: project.required ? '#f87171′ : '#4ade80' }}>
                {project.required ? 'YES' : 'NO'}
              </div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 11, color: '#8A9BB5', marginBottom: 6, fontWeight: 700 }}>💵 TYPICAL COST</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#F5E642′ }}>{project.typicalCost}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 11, color: '#8A9BB5', marginBottom: 6, fontWeight: 700 }}>⏱️ CITY WAIT TIME</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#60a5fa' }}>{city.waitTime}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 11, color: '#8A9BB5', marginBottom: 6, fontWeight: 700 }}>🔍 INSPECTION NEEDED</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: project.requiresInspection ? '#facc15′ : '#4ade80' }}>
                {project.requiresInspection ? 'YES' : 'NO'}
              </div>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>💡 PRO TIP</div>
            <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: 0 }}>{project.tip}</p>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🏛️ {selectedCity.toUpperCase()} PERMIT OFFICE</div>
            <p style={{ color: '#CBD5E1', margin: 0, lineHeight: 1.7 }}>{city.processingNote}</p>
          </div>
        </div>

        <div style={{ background: '#111F35', borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>📞 {selectedCity} Permit Office Info</h3>
          {[
            { icon: '💻', label: 'Online Portal', value: city.onlinePortal ? `✅ Yes — ${city.portalName}` : '❌ In-person only' },
            { icon: '📍', label: 'Address', value: city.address },
            { icon: '📞', label: 'Phone', value: city.contactPhone },
            { icon: '🕐', label: 'Hours', value: city.hours },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', gap: 14, marginBottom: 16, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 22, minWidth: 36 }}>{row.icon}</div>
              <div>
                <div style={{ fontSize: 12, color: '#8A9BB5', fontWeight: 700, marginBottom: 2 }}>{row.label}</div>
                <div style={{ color: '#CBD5E1', fontSize: 14 }}>{row.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
