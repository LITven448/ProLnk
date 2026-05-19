import { useState } from 'react';

const cityData: Record<string, { propertyTax: string; soil: string; tornado: string; ice: string; grid: string; extra: string }> = {
  Plano: { propertyTax: '~2.1% — budget ~$9,000/yr on $430K home', soil: 'Heavy expansive clay — foundation checks every 3 years', tornado: 'Moderate risk — tornado alley edge. Know your shelter.', ice: 'Ice storm every 2-3 years — Plano roads freeze and city has limited salt', grid: 'ERCOT — rolling blackouts possible in extreme cold or heat', extra: 'Plano has excellent city services despite high taxes. Worth it.' },
  Frisco: { propertyTax: '~2.3% — fastest growing city in TX, taxes follow', soil: 'Clay heavy — expansive soil causes slab movement', tornado: 'Moderate — Collin County has real tornado history', ice: 'Ice storms common — new roads but same ERCOT grid problems', grid: 'ERCOT with all Frisco growth-related grid stress in summer', extra: 'Frisco is new — everything is shiny but taxes are the trade-off.' },
  McKinney: { propertyTax: '~2.0% — slightly lower than Frisco/Plano', soil: 'Moderate clay — less extreme than Dallas proper', tornado: 'Real risk — Collin County had F3 tornado in 2012', ice: 'Ice events every 2-3 years — beautiful historic area, fragile infrastructure', grid: 'ERCOT — McKinney has older grid infrastructure in historic areas', extra: 'McKinney historic district charm = older home maintenance realities.' },
  'Fort Worth': { propertyTax: '~2.4% — Tarrant County is high', soil: 'Limestone base in west, clay in east — varies by neighborhood', tornado: 'High risk — DFW Tornado Alley. Serious storms here.', ice: 'Ice events more severe west of Dallas — plan for 1-2 week events', grid: 'ERCOT — Fort Worth had severe outages in Winter Storm Uri 2021', extra: 'Fort Worth is authentically Texas. Property taxes hurt but culture is real.' },
  Arlington: { propertyTax: '~2.5% — entertainment district costs passed to residents', soil: 'Clay dominant — take foundation care seriously', tornado: 'Moderate-high — central DFW tornado corridor', ice: 'Ice events regular — no state income tax but ice storm prep costs', grid: 'ERCOT — Arlington had significant Uri 2021 outages', extra: 'Rangers and Cowboys are here — sports culture is built into daily life.' },
  Dallas: { propertyTax: '~2.2% — varies significantly by neighborhood', soil: 'Heavy black clay — most extreme expansive soil in DFW', tornado: 'High risk — October 2019 F3 hit Dallas proper', ice: 'Ice storms regular — 2021 Uri was catastrophic citywide', grid: 'ERCOT — Dallas has most grid stress due to density', extra: 'Dallas clay soil is the most aggressive foundation challenge in DFW.' }
};

const originAdvice: Record<string, string[]> = {
  California: ['No state income tax here — but property tax makes up for it', 'Humidity is real — buy a dehumidifier for summers', 'Grass is different — St. Augustine and Bermuda need different care than CA', 'Traffic is bad but distance psychology is different — 30 miles feels normal in DFW'],
  'New York': ['Space is abundant and cheap — your DFW home is 3x the NYC size for half the price', 'Winter is mild but ice storms are dangerous — NY snow gear doesn\’t help here', 'No subway — car is mandatory in DFW, plan your home location around commute', 'Friendliness is real — neighbors will bring food when you move in. Reciprocate.'],
  Illinois: ['Property taxes comparable to IL — you\’re not escaping taxes, just shifting type', 'Tornadoes are more frequent than Chicago area — take shelter seriously', 'Summer heat is more extreme — HVAC system is your most important appliance', 'No city sticker — but emissions inspection and registration apply'],
  Florida: ['Clay soil is new — Florida sand doesn\’t move like DFW clay', 'Less hurricane risk but tornado risk is real — different storm prep', 'Winter exists in DFW — ice storms happen and homes aren\’t built for it', 'Outdoor living is similar — covered patio culture translates perfectly'],
  Colorado: ['Altitude gone — DFW is 500ft. Your lungs will thank you.', 'No dry heat — DFW humidity plus heat is a different beast', 'Traffic is worse — no mountain town vibes in DFW metro', 'Foundation movement is real — different from CO rocky soil'],
  Other: ['Clay soil movement is the #1 surprise for DFW transplants — get foundation checked yearly', 'ERCOT grid independence means state-specific outage risks — generator worth considering', 'Property tax 2-2.5% is the trade for no income tax — budget accordingly', 'Tornado shelter or safe room: evaluate your home and add one if missing']
};

export default function DFWNewToTexasGuide() {
  const [origin, setOrigin] = useState('');
  const [city, setCity] = useState('');
  const cityInfo = city ? cityData[city] : null;
  const advice = origin ? originAdvice[origin] || originAdvice['Other'] : null;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🤠 New to Texas? DFW Home Guide</div>
        <p style={{ color: '#475569', marginBottom: 8, fontSize: 16 }}>
          What nobody tells you when you move to DFW. The good, the real, and the things that will surprise you about Texas homeownership.
        </p>
        <div style={{ background: '#FEF9C3', border: '1px solid #F5E642', borderRadius: 8, padding: 12, marginBottom: 32, fontSize: 14, color: '#713F12′ }}>
          ⭐ No state income tax is real — but property taxes, clay soil, ERCOT, and tornado prep are equally real. Welcome home.
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ color: '#475569', fontSize: 14, display: 'block', marginBottom: 8 }}>Where are you coming from?</label>
              <select value={origin} onChange={e => setOrigin(e.target.value)} style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 12px', fontSize: 14, background: '#fff' }}>
                <option value="">Select your state</option>
                <option value="California">California</option>
                <option value="New York">New York / Northeast</option>
                <option value="Illinois">Illinois / Midwest</option>
                <option value="Florida">Florida</option>
                <option value="Colorado">Colorado / Mountain States</option>
                <option value="Other">Other State</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#475569', fontSize: 14, display: 'block', marginBottom: 8 }}>Where in DFW?</label>
              <select value={city} onChange={e => setCity(e.target.value)} style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 12px', fontSize: 14, background: '#fff' }}>
                <option value="">Select DFW city</option>
                {Object.keys(cityData).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        {cityInfo && (
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24, marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>📍 {city} Specifics</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[['💰 Property Tax', cityInfo.propertyTax], ['🏗️ Soil Type', cityInfo.soil], ['🌪️ Tornado Risk', cityInfo.tornado], ['🧊 Ice Storms', cityInfo.ice], ['⚡ ERCOT Grid', cityInfo.grid]].map(([label, value]) => (
                <div key={label} style={{ background: '#f8fafc', borderRadius: 8, padding: 12 }}>
                  <div style={{ color: '#0A1628', fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{label}</div>
                  <div style={{ color: '#475569', fontSize: 13 }}>{value}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#FEF9C3', borderRadius: 8, padding: 12, marginTop: 12, color: '#713F12', fontSize: 14 }}>💡 {cityInfo.extra}</div>
          </div>
        )}

        {advice && (
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>🗺️ From {origin} to DFW — What's Different</div>
            {advice.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, paddingBottom: 12, borderBottom: i < advice.length - 1 ? '1px solid #f1f5f9′ : ’none' }}>
                <span style={{ color: '#F5E642', background: '#0A1628', borderRadius: 4, width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                <span style={{ color: '#475569', fontSize: 15 }}>{a}</span>
              </div>
            ))}
          </div>
        )}

        {!advice && !cityInfo && (
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, marginBottom: 12 }}>🏠 Immediate Actions When You Move to DFW</div>
            {['Get a foundation inspection within 30 days — clay soil may have already moved', 'Find your nearest tornado shelter — Nextdoor shows community shelters', 'Sign up for DFW emergency alerts — weather.gov and your city system', 'Shop ERCOT electricity providers — rates vary 40% by provider', 'Check your HVAC age — Texas heat on an old system is expensive urgency'].map((a, i) => (
              <div key={i} style={{ color: '#475569', fontSize: 14, marginBottom: 10, paddingLeft: 16, borderLeft: '3px solid #0A1628′ }}>{a}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
