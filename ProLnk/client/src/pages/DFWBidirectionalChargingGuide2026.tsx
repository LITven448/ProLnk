import { useState } from 'react';

export default function DFWBidirectionalChargingGuide2026() {
  const [evModel, setEvModel] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const evGuides: Record<string, string> = {
    'Ford F-150 Lightning': '✅ FULLY SUPPORTED: The Lightning is the gold standard for V2H in Texas. Ford + Sunrun launched the first V2H product in TX in 2023. The Intelligent Backup Power system exports up to 9.6 kW continuous to your home. Requires Ford Charge Station Pro ($1,310), Sunrun home integration ($3,500-6,000), and a 240V 60A circuit. Can power average DFW home for 3 days on full charge.',
    'Ford F-150 Lightning Pro (Fleet)': '✅ SUPPORTED: Same V2H capability as consumer Lightning. Fleet versions require same hardware. Contact Sunrun Texas for commercial V2H integration pricing.',
    'Nissan Leaf (2022+)': '⚡ V2H CAPABLE (Hardware Only): The Leaf uses CHAdeMO port which supports V2H. V2H equipment (Fermata Energy, Wallbox Quasar 2) costs $8,000+. CHAdeMO infrastructure in DFW is sparse. Practical but niche solution in Texas.',
    'Nissan Leaf (Pre-2022)': '⚠️ LIMITED: Older Leaf CHAdeMO can support V2H with Wallbox Quasar 1, but battery degradation in DFW heat is significant. Verify remaining battery capacity before investing in V2H hardware.',
    'Tesla Model 3/Y/S/X': '❌ NOT YET: Tesla vehicles currently do not support V2H or V2G. Tesla has announced Powerwall integration but vehicle-to-home export is not enabled in software as of 2026. Monitor Tesla announcements — this capability may arrive via OTA update.',
    'Chevy Silverado EV': '✅ V2H CAPABLE: GM Energy PowerShift system supports up to 10.2 kW V2H output. Available through Chevy dealers in DFW with GM Energy home integration. Requires 200A panel and $2,500-4,000 installation.',
    'Hyundai Ioniq 5/6': '✅ V2L CAPABLE (Limited V2H): Ioniq 5/6 supports Vehicle-to-Load (V2L) via adapter — powers appliances at 1.9 kW directly from the car. Full V2H (powering house wiring) requires third-party equipment not yet certified in Texas.',
    'Other EV': '📋 CHECK SPECS: Look for CHAdeMO port (V2H capable with aftermarket hardware) or manufacturer V2H announcements. CCS/J1772 vehicles generally do not support V2H as of 2026. V2G (selling back to ERCOT) requires additional utility agreements beyond vehicle capability.',
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🚗</span>
          <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 6, padding: '4px 12px', fontWeight: 700, fontSize: 12 }}>DFW EV GUIDE 2026</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Bidirectional EV Charging Guide 2026</h1>
        <p style={{ color: '#94A3B8', fontSize: 15, marginBottom: 28 }}>V2H and V2G for DFW ERCOT grid — which EVs can power your home and how to set it up</p>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 20, borderLeft: '4px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⚡ V2H vs V2G — What is the Difference</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: '#1E2F4F', borderRadius: 8, padding: 14 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>🏠 V2H (Vehicle-to-Home)</div>
              <p style={{ color: '#CBD5E1', fontSize: 13, lineHeight: 1.7, margin: 0 }}>EV powers your home circuits during outages. Works as a giant backup battery. No grid connection required. Ford Lightning + Sunrun is the only productized V2H system currently available in Texas.</p>
            </div>
            <div style={{ background: '#1E2F4F', borderRadius: 8, padding: 14 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>🌐 V2G (Vehicle-to-Grid)</div>
              <p style={{ color: '#CBD5E1', fontSize: 13, lineHeight: 1.7, margin: 0 }}>EV sells electricity back to ERCOT during peak demand. Earns revenue ($0.30-1.50/kWh during emergencies). Requires utility agreement, bidirectional meter, and ERCOT-qualified equipment. Still pilot-stage in DFW.</p>
            </div>
          </div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏗️ Panel Upgrade Requirements for V2H</h2>
          {[
            ['200A Main Panel', 'Required for whole-home V2H backup. Many 1980s-2000s DFW homes have 150A or 100A panels. Upgrade costs $2,500-4,500.'],
            ['Dedicated 60A Circuit', 'Ford Charge Station Pro requires 60A/240V circuit. Budget $400-800 for circuit run from panel to garage.'],
            ['Transfer Switch or Gateway', 'Isolates home from grid during outage (required by code). Sunrun includes gateway in their V2H package. Standalone units $800-1,500.'],
            ['Smart Meter Upgrade', 'Oncor must install a bidirectional meter for V2G programs. Currently offered to select pilot participants in DFW — contact Oncor EV programs.'],
          ].map(([req, detail]) => (
            <div key={req} style={{ display: 'flex', gap: 14, marginBottom: 14, alignItems: 'flex-start' }}>
              <span style={{ color: '#F5E642', fontSize: 20, minWidth: 28 }}>✓</span>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{req}</div>
                <div style={{ color: '#CBD5E1', fontSize: 13, lineHeight: 1.6 }}>{detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>💰 ERCOT V2G Revenue Potential</h2>
          <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>During Winter Storm Uri in 2021, ERCOT spot prices hit $9,000/MWh ($9/kWh). A 131 kWh F-150 Lightning battery exporting at 9.6 kW for 10 hours could have earned $864 in a single event. Standard V2G agreements with ERCOT pilot partners pay $50-150/month for availability plus real-time discharge compensation.</p>
          <div style={{ background: '#1E2F4F', borderRadius: 8, padding: 14 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>⚠️ DFW V2G Status as of 2026</div>
            <p style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.7, margin: 0 }}>ERCOT V2G programs are in pilot phase with Oncor and a small number of Ford Lightning owners. Full commercial V2G is expected 2027-2028. Register interest at oncor.com/EV or through your Ford dealer.</p>
          </div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔍 EV Model → V2H Feasibility Check</h2>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            <select value={evModel} onChange={e => setEvModel(e.target.value)} style={{ background: '#1E2F4F', color: '#E8EAF0', border: '1px solid #2D4A7A', borderRadius: 8, padding: '10px 14px', fontSize: 14, flex: 1, minWidth: 200 }}>
              <option value="">Select your EV model...</option>
              {Object.keys(evGuides).map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <button onClick={() => evModel && setResult(evGuides[evModel])} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Check</button>
          </div>
          {result && <div style={{ background: '#1E2F4F', borderRadius: 8, padding: 14, color: '#E8EAF0', fontSize: 14, lineHeight: 1.7 }}>{result}</div>}
        </div>
      </div>
    </div>
  );
}
