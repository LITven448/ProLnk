import { useState } from 'react';

const tradeVehicles = {
  hvac: {
    label: 'HVAC Tech',
    best: 'Cargo Van (Transit/ProMaster)',
    why: 'HVAC techs carry refrigerant tanks, sheet metal, coils, and bulky equipment. A cargo van keeps tools secure and organized. Shorter wheel base for DFW suburban neighborhoods.',
    mpg: 18,
    avgMiles: 280,
    brandingImpact: 'Very High — customers see your van in the driveway for 2-4 hours per job.',
    gpsNote: 'Required for refrigerant tracking compliance and route optimization in DFW traffic.'
  },
  plumber: {
    label: 'Plumber',
    best: 'Full-Size Van or 3/4-Ton Pickup + Rack',
    why: 'Pipe lengths require either a van with shelving or a pickup with a ladder rack. Pickup wins for residential DFW — easier parking in older North Dallas neighborhoods with tight driveways.',
    mpg: 17,
    avgMiles: 240,
    brandingImpact: 'High — trucks are highly visible in DFW HOA neighborhoods. Branded vehicles get referral calls directly.',
    gpsNote: 'Use GPS to document arrival/departure — protects you in DFW billing disputes.'
  },
  electrician: {
    label: 'Electrician',
    best: 'Mid-Size Van (Transit Connect) or Pickup',
    why: 'Electricians carry wire, conduit, panels, and hand tools — less bulky than HVAC. A Transit Connect gets better MPG in DFW stop-and-go while still holding everything.',
    mpg: 22,
    avgMiles: 200,
    brandingImpact: 'High — DFW homeowners remember the clean, branded van in their neighborhood.',
    gpsNote: 'Live GPS helps with DFW I-35/I-635 traffic routing — shave 30+ min per day.'
  },
  roofer: {
    label: 'Roofer',
    best: '1-Ton Pickup (F-350/Ram 3500)',
    why: 'Roofing requires hauling heavy shingles, decking, and equipment. A 1-ton pickup is the DFW roofing standard — you need the payload capacity. Dual rear wheels for material hauls.',
    mpg: 14,
    avgMiles: 190,
    brandingImpact: 'Medium-High — branded trucks at job sites get neighbor calls, especially after hail storms.',
    gpsNote: 'Track all DFW service areas with GPS — hail storm response zones need fast dispatch.'
  }
};

const areas = {
  close: { label: 'Close-in (< 15 mi radius)', fuelMult: 1 },
  mid: { label: 'Mid-DFW (15-30 mi)', fuelMult: 1.5 },
  wide: { label: 'Full Metroplex (30+ mi)', fuelMult: 2.2 }
};

export default function DFWTradeVehicleGuide() {
  const [trade, setTrade] = useState('');
  const [area, setArea] = useState('');
  const v = trade ? tradeVehicles[trade as keyof typeof tradeVehicles] : null;
  const a = area ? areas[area as keyof typeof areas] : null;
  const dailyFuel = v && a ? Math.round((v.avgMiles * a.fuelMult / v.mpg) * 3.8) : null;
  const monthlyFuel = dailyFuel ? dailyFuel * 22 : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2 }}>🚐 PROLNK DFW PRO RESOURCE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>DFW Trade Vehicle Guide</h1>
        <p style={{ color: '#94a3b8', margin: '0 0 32px', lineHeight: 1.6 }}>Your vehicle is your rolling office, your billboard, and your tool security system. DFW has unique challenges — catalytic converter theft, stop-and-go traffic, and sprawling service areas. Choose right.</p>

        <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 18 }}>🎯 Get Your Vehicle Recommendation</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
            {Object.entries(tradeVehicles).map(([k, val]) => (
              <button key={k} onClick={() => setTrade(k)} style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', borderColor: trade === k ? '#F5E642′ : '#1e3a5f', background: trade === k ? '#F5E642' : ’transparent', color: trade === k ? '#0A1628′ : '#fff', fontWeight: 700, cursor: ’pointer' }}>{val.label}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {Object.entries(areas).map(([k, val]) => (
              <button key={k} onClick={() => setArea(k)} style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', borderColor: area === k ? '#F5E642′ : '#1e3a5f', background: area === k ? '#F5E642' : ’transparent', color: area === k ? '#0A1628′ : '#fff', fontWeight: 700, cursor: ’pointer' }}>{val.label}</button>
            ))}
          </div>
        </div>

        {v && (
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>RECOMMENDED VEHICLE</div>
              <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 12 }}>🚐 {v.best}</div>
              <p style={{ color: '#cbd5e1', margin: 0, fontSize: 14, lineHeight: 1.6 }}>{v.why}</p>
            </div>

            {monthlyFuel !== null && (
              <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24 }}>
                <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>ESTIMATED FUEL COST</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#F5E642′ }}>${monthlyFuel.toLocaleString()}<span style={{ fontSize: 16, color: '#64748b' }}>/mo</span></div>
                <p style={{ color: '#94a3b8', margin: '8px 0 0', fontSize: 13 }}>Based on ~{Math.round(v.avgMiles * (a?.fuelMult || 1))} miles/day avg in DFW at $3.80/gal</p>
              </div>
            )}

            <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>VEHICLE BRANDING IMPACT</div>
              <div style={{ marginBottom: 8, fontWeight: 700, fontSize: 18 }}>📣 {v.brandingImpact}</div>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: 13 }}>DFW HOA neighborhoods spread word-of-mouth fast. A clean, professional wrap earns more than most Google Ads budgets.</p>
            </div>

            <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>📍 GPS TRACKING</div>
              <p style={{ color: '#cbd5e1', margin: 0, fontSize: 14 }}>{v.gpsNote}</p>
            </div>

            <div style={{ background: '#3d1a1a', border: '1px solid #ef4444', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 13, color: '#ef4444', fontWeight: 700, marginBottom: 8 }}>🚨 DFW CATALYTIC CONVERTER THEFT — CRITICAL</div>
              <p style={{ color: '#fca5a5', margin: 0, fontSize: 14, lineHeight: 1.6 }}>DFW leads Texas in catalytic converter theft. Vans and trucks are primary targets. Install a catalytic converter shield ($150-400), park in lit/secure areas overnight, and add comprehensive coverage to commercial auto. Don't skip this — a stolen cat = $1,500-4,000 repair and missed jobs.</p>
            </div>
          </div>
        )}

        <div style={{ marginTop: 32, padding: 24, background: 'linear-gradient(135deg, #1a2f5a, #0F1F3D)', borderRadius: 12, border: '1px solid #F5E642′ }}>
          <h3 style={{ color: '#F5E642', margin: '0 0 8px' }}>🏆 ProLnk Vehicle Standard</h3>
          <p style={{ color: '#cbd5e1', margin: 0, fontSize: 14, lineHeight: 1.6 }}>ProLnk DFW homeowners rate professionalism heavily. A clean, clearly labeled vehicle is a signal of legitimacy and quality. Top-rated pros in our network almost all have professional vehicle branding — it's not optional if you want to win.</p>
        </div>
      </div>
    </div>
  );
}
