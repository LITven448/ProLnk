import { useState } from 'react';

const DFW_CITIES = ['Dallas', 'Fort Worth', 'Plano', 'Frisco', 'McKinney', 'Arlington', 'Irving', 'Denton', 'Garland', 'Allen', 'Flower Mound', 'Mansfield'];
const COOKING_METHODS = ['Charcoal Grill', 'Gas Grill (propane)', 'Natural Gas Grill', 'Wood Smoker', 'Open Fire Pit', 'Pellet Grill'];

const cityRules: Record<string, { clearance: string; burnBan: string; hoaNote: string; openFire: string }> = {
  Dallas: { clearance: '10 ft from structures, 3 ft from combustibles', burnBan: 'Burn bans common Jun-Oct; check dallasoem.org', hoaNote: 'Many Dallas HOAs ban charcoal on balconies/patios above ground', openFire: 'Open burning prohibited within city limits without permit' },
  'Fort Worth': { clearance: '10 ft from structures, 3 ft from combustibles', burnBan: 'County burn bans via Tarrant County OEM', hoaNote: 'HOA rules vary widely — check your CC&Rs', openFire: 'Open burning prohibited; contained fire pits allowed per code' },
  Plano: { clearance: '15 ft from structures — stricter than state minimum', burnBan: 'Plano follows Collin County burn bans closely', hoaNote: 'Most Plano HOAs restrict open fire pits to gas only', openFire: 'Open burning prohibited; gas fire pits allowed with setbacks' },
  Frisco: { clearance: '10 ft from structures', burnBan: 'Frisco fire dept issues city-specific burn ban updates', hoaNote: 'Frisco HOAs often restrict fire pits to specific models/sizes', openFire: 'Open burning banned; contained gas fire features allowed' },
  McKinney: { clearance: '10 ft from structures', burnBan: 'Collin County burn bans apply', hoaNote: 'HOA restrictions common in master-planned communities', openFire: 'Contained fire pits allowed; open burning banned within city limits' },
  Arlington: { clearance: '10 ft from structures, 3 ft from combustibles', burnBan: 'Tarrant County burn bans apply', hoaNote: 'HOA rules vary — older Arlington neighborhoods more permissive', openFire: 'Open burning prohibited; fire pits allowed per city code' },
  Irving: { clearance: '10 ft from structures', burnBan: 'Dallas County burn bans apply', hoaNote: 'Many Irving HOAs allow charcoal with setbacks', openFire: 'Open burning prohibited within city limits' },
  Denton: { clearance: '10 ft from structures', burnBan: 'Denton County issues separate burn bans — check dentoncounty.gov', hoaNote: 'Denton has fewer HOAs — rules less restrictive on average', openFire: 'Contained fire pits allowed; open burning banned within city' },
  Garland: { clearance: '10 ft from structures', burnBan: 'Dallas County burn bans apply', hoaNote: 'HOA coverage is mixed — verify your specific community', openFire: 'Open burning prohibited; fire pits allowed per setback rules' },
  Allen: { clearance: '10 ft from structures', burnBan: 'Collin County burn bans apply', hoaNote: 'Allen HOAs often specify gas-only fire features in newer communities', openFire: 'Open burning banned; gas fire pits allowed per code' },
  'Flower Mound': { clearance: '10 ft from structures', burnBan: 'Denton County burn bans apply', hoaNote: 'Flower Mound HOAs among strictest — check before any outdoor fire feature', openFire: 'Open burning banned; contained fire pits allowed with permits' },
  Mansfield: { clearance: '10 ft from structures', burnBan: 'Tarrant County burn bans apply', hoaNote: 'HOA rules vary — check deed restrictions in your neighborhood', openFire: 'Contained fire pits allowed; open burning prohibited within city' },
};

const methodRequirements: Record<string, { safe: boolean; notes: string }> = {
  'Charcoal Grill': { safe: true, notes: 'Legal everywhere with setbacks. Never use indoors or in garage. Fully extinguish before disposal.' },
  'Gas Grill (propane)': { safe: true, notes: 'Most HOA-friendly option. Store propane tanks upright, away from heat sources. Check valve before each use.' },
  'Natural Gas Grill': { safe: true, notes: 'Permanent installation requires permit. Most preferred by HOAs. No tank storage needed.' },
  'Wood Smoker': { safe: true, notes: 'Legal but smoke drift can trigger neighbor complaints. Check local nuisance ordinances.' },
  'Open Fire Pit': { safe: false, notes: 'CAUTION: Often restricted or banned in DFW cities and HOAs. Burn bans apply more strictly to open fires.' },
  'Pellet Grill': { safe: true, notes: 'Generally treated like charcoal by codes. Less smoke than wood smoker. HOA-friendly in most DFW areas.' },
};

export default function DFWOutdoorCookingCode() {
  const [city, setCity] = useState('Dallas');
  const [method, setMethod] = useState('Charcoal Grill');
  const cityInfo = cityRules[city];
  const methodInfo = methodRequirements[method];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          🔥 DFW Outdoor Cooking Code Guide
        </div>
        <p style={{ color: '#94A3B8', marginBottom: '1.5rem' }}>
          DFW has some of the best backyard BBQ culture in Texas — but city codes, county burn bans, and HOA rules all affect what you can legally fire up and when. Know before you grill.
        </p>
        <div style={{ background: '#1E2D45', borderRadius: 10, padding: '1.2rem', marginBottom: '1.2rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.8rem' }}>🌵 DFW-Specific Cooking Hazards</div>
          <ul style={{ color: '#94A3B8', paddingLeft: '1.5rem', lineHeight: 1.8 }}>
            <li>Burn bans activate quickly during drought — sometimes with 24 hours notice</li>
            <li>DFW wind gusts 20-40 mph are common — embers travel far in open yards</li>
            <li>Clay soil cracks deeply in summer — fire pit heat can stress soil near foundations</li>
            <li>HOA fines for cooking violations in DFW range from $50-500 per incident</li>
            <li>Texas dry season (Sep-Nov) is highest fire risk — extra caution required</li>
          </ul>
        </div>
        <div style={{ background: '#1E2D45', borderRadius: 10, padding: '1.2rem', marginBottom: '1.2rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '1rem' }}>📋 Code Lookup Tool</div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>DFW City</div>
              <select value={city} onChange={e => setCity(e.target.value)} style={{ background: '#0A1628', color: '#E8EDF5', border: '1px solid #2D4060', borderRadius: 6, padding: '0.5rem' }}>
                {DFW_CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Cooking Method</div>
              <select value={method} onChange={e => setMethod(e.target.value)} style={{ background: '#0A1628', color: '#E8EDF5', border: '1px solid #2D4060', borderRadius: 6, padding: '0.5rem' }}>
                {COOKING_METHODS.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
          </div>
          {cityInfo && methodInfo && (
            <div style={{ display: 'grid', gap: '0.8rem' }}>
              <div style={{ background: methodInfo.safe ? '#1E3A2B' : '#3A1E1E', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: methodInfo.safe ? '#22C55E' : '#EF4444', fontWeight: 700 }}>
                  {methodInfo.safe ? '✅ Generally Allowed' : '⚠️ Caution — Often Restricted'}
                </div>
                <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginTop: '0.4rem' }}>{methodInfo.notes}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>📏 {city} Clearance Requirement</div>
                <div style={{ color: '#E8EDF5′ }}>{cityInfo.clearance}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>🔥 Burn Ban Info</div>
                <div style={{ color: '#E8EDF5′ }}>{cityInfo.burnBan}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>🏘️ HOA Considerations</div>
                <div style={{ color: '#E8EDF5′ }}>{cityInfo.hoaNote}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>🏕️ Open Fire Status</div>
                <div style={{ color: '#E8EDF5′ }}>{cityInfo.openFire}</div>
              </div>
            </div>
          )}
        </div>
        <div style={{ color: '#64748B', fontSize: '0.8rem', textAlign: 'center' }}>
          ProLnk connects DFW homeowners with vetted outdoor living and patio professionals.
        </div>
      </div>
    </div>
  );
}
