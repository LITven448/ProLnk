import { useState } from 'react';

export default function DFWLandInvestingGuide() {
  const [acreage, setAcreage] = useState(10);
  const [locationTier, setLocationTier] = useState(2);
  const [servicesAvailable, setServicesAvailable] = useState(1);

  const basePricePerAcre = locationTier === 1 ? 80000 : locationTier === 2 ? 35000 : 12000;
  const serviceMultiplier = servicesAvailable === 2 ? 1.4 : servicesAvailable === 1 ? 1.15 : 1.0;
  const estimatedValue = acreage * basePricePerAcre * serviceMultiplier;
  const holdingCostPerYear = estimatedValue * 0.015;
  const agExemptTax = acreage * 8;
  const standardTax = estimatedValue * 0.025;
  const devPotential = locationTier === 1 ? acreage * 4 : locationTier === 2 ? acreage * 2 : acreage * 0.8;

  const tiers = ['Inside Growth Corridor (Celina, Prosper, Melissa)', 'Near Growth Corridor (Anna, Weston, Gunter)', 'Rural Fringe (Farmersville, Lavon, Blue Ridge)'];
  const services = ['No utilities/water (raw)', 'Road access + electric', 'Full utilities (water, sewer, gas)'];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 12, fontSize: 13, color: '#F5E642' }}>🌾 DFW REAL ESTATE INVESTOR SERIES</div>
        <h1 style={{ fontSize: 38, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          DFW Land Investing Guide
        </h1>
        <p style={{ color: '#8A9BB5', fontSize: 17, marginBottom: 40 }}>
          DFW's explosive growth is pushing the urban fringe outward at unprecedented speed — smart land investors are buying ahead of the wave in Celina, Prosper, Melissa, and beyond.
        </p>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>📍 Where the Growth Is Going</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { city: 'Celina', note: 'One of the fastest-growing cities in the US. Land prices tripled in 5 years.' },
              { city: 'Prosper', note: 'Luxury corridor. Master-planned communities expanding rapidly.' },
              { city: 'Melissa', note: 'More affordable entry point, direct path of Frisco growth.' },
              { city: 'Anna', note: 'Further out, lower prices, higher risk — but high upside.' },
              { city: 'Gunter', note: 'North of Celina, attracting early land speculators now.' },
              { city: 'Blue Ridge / Lavon', note: 'Eastward growth from McKinney. Still affordable raw land.' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 12, padding: 16, borderLeft: '3px solid #F5E642' }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.city}</div>
                <div style={{ fontSize: 13, color: '#8A9BB5' }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>💡 Key Land Investing Concepts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { title: 'Entitlement Risk', desc: 'Raw land must be rezoned, platted, and permitted for development. This takes time and can fail.' },
              { title: 'Water Access', desc: 'The most critical factor in North Texas. Is it on city water, well, or neither? Dramatically affects value.' },
              { title: 'Agricultural Exemption', desc: 'Texas Ag exemption reduces taxes to near zero. You must have agricultural use (cattle, hay, etc.).' },
              { title: 'Holding Costs', desc: 'You earn nothing while holding land. Property taxes, interest on loans, and maintenance must be modeled.' },
              { title: 'Utilities at the Boundary', desc: '\"Utilities nearby\" vs \"utilities available\" — a critical distinction for valuation and buyer demand.' },
              { title: 'Valuing Raw Land', desc: 'Compare recent sales of similar acreage nearby. $/acre varies wildly by location, utilities, and zoning.' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 12, padding: 16 }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: '#8A9BB5', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#F5E642' }}>🧮 Land Value Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 32 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#8A9BB5' }}>Acreage</label>
              <input type="range" min={1} max={100} step={1} value={acreage}
                onChange={e => setAcreage(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642' }} />
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{acreage} acres</div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#8A9BB5' }}>Location Tier</label>
              <select value={locationTier} onChange={e => setLocationTier(Number(e.target.value))}
                style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #2A4070', borderRadius: 8, padding: '8px 12px', fontSize: 14 }}>
                {tiers.map((t, i) => <option key={i} value={i + 1}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#8A9BB5' }}>Services Available</label>
              <select value={servicesAvailable} onChange={e => setServicesAvailable(Number(e.target.value))}
                style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #2A4070', borderRadius: 8, padding: '8px 12px', fontSize: 14 }}>
                {services.map((s, i) => <option key={i} value={i + 1}>{s}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {[
              { label: 'Estimated Land Value', value: `$${Math.round(estimatedValue).toLocaleString()}`, highlight: true },
              { label: 'Price Per Acre', value: `$${Math.round(estimatedValue / acreage).toLocaleString()}` },
              { label: 'Annual Holding Cost (~1.5%)', value: `$${Math.round(holdingCostPerYear).toLocaleString()}/yr` },
              { label: 'Standard Property Tax (2.5%)', value: `$${Math.round(standardTax).toLocaleString()}/yr` },
              { label: 'Ag Exemption Tax (~$8/ac)', value: `$${Math.round(agExemptTax).toLocaleString()}/yr` },
              { label: 'Est. Residential Lots (Dev)', value: `~${Math.round(devPotential)} lots`, highlight: true },
            ].map((item, i) => (
              <div key={i} style={{ background: item.highlight ? '#1A2E4A' : '#0A1628', borderRadius: 12, padding: 16, border: item.highlight ? '2px solid #F5E642' : 'none' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: item.highlight ? '#F5E642' : '#E8EDF5', marginBottom: 4 }}>{item.value}</div>
                <div style={{ fontSize: 12, color: '#8A9BB5' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

