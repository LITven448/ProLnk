import { useState } from 'react';

const condoTypes = ['Low-rise (2-4 floors)', 'Mid-rise (5-12 floors)', 'High-rise (13+ floors)', 'Loft conversion'];
const concerns = ['No control over temp', 'High electric bill', 'Poor air quality', 'Upgrade options'];

const advice: Record<string, Record<string, string>> = {
  'Low-rise (2-4 floors)': {
    'No control over temp': 'Most DFW low-rise condos use split systems (individual air handlers per unit). You control your own thermostat. If unresponsive, check air handler filter and check refrigerant charge.',
    'High electric bill': 'Low-rise condos typically use individual heat pumps. Upgrade to 18+ SEER2 unit — you own it. DFW low-rise units often have 10-12 SEER equipment from the 2000s build era.',
    'Poor air quality': 'Individual units mean you can add air purifiers, UV lights, and HEPA filtration to your own air handler. Full control is an advantage.',
    'Upgrade options': 'In low-rise, you typically own your HVAC equipment. Variable-speed heat pump upgrade adds humidity control and quieter operation — valuable in DFW.',
  },
  'Mid-rise (5-12 floors)': {
    'No control over temp': 'Mid-rise DFW buildings use fan coil units (FCUs) fed by a central chilled water plant. You control fan speed and a mixing valve — the chilled water comes from building infrastructure.',
    'High electric bill': 'Fan coil units use minimal electricity — the chiller plant cost is split across all units in HOA fees. If your electric bill is high, look at other loads — HVAC may not be the issue.',
    'Poor air quality': 'Fan coil systems recirculate unit air only. Add a standalone HEPA air purifier. Fresh air comes from building ventilation system — contact building management if stale.',
    'Upgrade options': 'You cannot replace a fan coil system independently. Work with HOA to upgrade chiller efficiency or request better filtration in your FCU. Individual unit options are limited.',
  },
  'High-rise (13+ floors)': {
    'No control over temp': 'DFW high-rises typically use central chilled water with fan coil units. Building engineering sets chilled water temperature — you adjust a 3-speed fan and mixing valve only.',
    'High electric bill': 'HVAC cost is largely in HOA fees for central plant. Personal electricity covers only fan motor (very low). High bills indicate other equipment, not HVAC.',
    'Poor air quality': 'High-rise fresh air is pressurized from central AHUs. If air quality is poor, request a building MERV rating report. Individual HEPA units are your best personal option.',
    'Upgrade options': 'Some DFW high-rises allow PTAC (packaged terminal air conditioners) in specific units — check with building. Otherwise limited to supplemental portable or window units where allowed.',
  },
  'Loft conversion': {
    'No control over temp': 'DFW loft conversions (older buildings) often have repurposed commercial HVAC — VAV boxes with limited tenant control. Check your lease for what you control.',
    'High electric bill': 'Loft conversions frequently have poor envelope insulation — high ceilings, large windows, industrial materials. HVAC runs constantly. Address envelope first.',
    'Poor air quality': 'Industrial HVAC in conversions may lack proper filtration. Add standalone HEPA purifiers. Request MERV-13 filters in your VAV unit from building management.',
    'Upgrade options': 'If you own the unit, a ductless mini-split in primary rooms alongside existing HVAC provides personal comfort control in DFW lofts with unreliable building HVAC.',
  },
};

export default function DFWHVACCondoGuide() {
  const [condoType, setCondoType] = useState('');
  const [concern, setConcern] = useState('');

  const result = condoType && concern ? advice[condoType]?.[concern] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Condos & High-Rise HVAC</h1>
        <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 32, lineHeight: 1.7 }}>
          DFW's urban condo market is booming — Uptown, Victory Park, Deep Ellum, Frisco, Plano. What you can control depends entirely on your building type. Low-rise condos often give you full HVAC ownership. High-rises may limit you to fan speed only.
        </p>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '14px 18px', marginBottom: 28, fontSize: 14, fontWeight: 600 }}>
          🏙️ Know Before You Buy: In DFW high-rises, your HVAC upgrade options may be zero. Always ask "what HVAC system does this building use?" before purchasing.
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🏢 Get Your Situation</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>CONDO TYPE</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {condoTypes.map(c => (
                <button key={c} onClick={() => setCondoType(c)} style={{ padding: '8px 16px', borderRadius: 6, border: '2px solid', borderColor: condoType === c ? '#F5E642' : '#1e3a5f', background: condoType === c ? '#F5E642' : 'transparent', color: condoType === c ? '#0A1628' : '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{c}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>YOUR CONCERN</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {concerns.map(c => (
                <button key={c} onClick={() => setConcern(c)} style={{ padding: '8px 16px', borderRadius: 6, border: '2px solid', borderColor: concern === c ? '#F5E642' : '#1e3a5f', background: concern === c ? '#F5E642' : 'transparent', color: concern === c ? '#0A1628' : '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{c}</button>
              ))}
            </div>
          </div>
          {result && (
            <div style={{ background: '#1e3a5f', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>Your Situation</div>
              <div style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.7 }}>{result}</div>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[['❄️', 'Fan Coil Units (FCU)', 'Common in DFW mid and high-rise. Building chills water centrally; your FCU is just a fan + coil.'],['🌡️', 'Split Systems', 'Low-rise condos often have individual heat pump systems you own, maintain, and can upgrade.'],['🏗️', 'HOA HVAC Costs', 'Central plant buildings fold HVAC energy into HOA fees. Factor this into total cost of ownership.'],['💨', 'Supplemental Cooling', 'Portable AC or small window units may be your only option in fully centralized DFW high-rises.']].map(([icon, title, desc]) => (
            <div key={title} style={{ background: '#0f1f3d', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 14 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 10, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>📞 Get a ProLnk Quote</div>
          <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>Connect with DFW HVAC pros who understand condo and high-rise systems and HOA compliance requirements.</div>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}
