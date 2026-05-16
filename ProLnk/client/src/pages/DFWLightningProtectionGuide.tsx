import { useState } from 'react';

const homeSizes = ['Under 1,500 sq ft', '1,500–2,500 sq ft', '2,500–4,000 sq ft', 'Over 4,000 sq ft'];
const electronicsValues = ['Under $5,000', '$5,000–$15,000', '$15,000–$40,000', 'Over $40,000'];
const dfwZones = ['Dallas County (urban core)', 'Tarrant County (Fort Worth)', 'Collin County (Plano/Allen/McKinney)', 'Denton County', 'Ellis / Johnson County (southern DFW)', 'Rockwall / Kaufman County (eastern DFW)'];

const zoneStrikeRisk: Record<string, string> = {
  'Dallas County (urban core)': 'High — urban heat island increases convective activity',
  'Tarrant County (Fort Worth)': 'High — flat terrain with few natural obstacles',
  'Collin County (Plano/Allen/McKinney)': 'Very High — open terrain and rapid growth means more exposed structures',
  'Denton County': 'High — rural-to-suburban mix with tall isolated structures',
  'Ellis / Johnson County (southern DFW)': 'Moderate-High — more rural, open pasture increases direct strike risk',
  'Rockwall / Kaufman County (eastern DFW)': 'High — lake proximity creates convective instability',
};

function getRecommendation(size: string, electronics: string, zone: string) {
  const isLarge = size === 'Over 4,000 sq ft' || size === '2,500–4,000 sq ft';
  const highElectronics = electronics === 'Over $40,000' || electronics === '$15,000–$40,000';

  const baseItems = [
    'Point-of-use surge protectors (MOV type) on all electronics: $15–$50 each',
    'Whole-home surge protector at electrical panel — install during next electrician visit: $200–$400 installed',
    'UPS (uninterruptible power supply) for critical electronics: $100–$300 each',
    'Unplug ethernet, coax, and phone lines during storms — surge travels these paths',
    'HVAC system is most expensive strike target — whole-home surge protection is highest ROI',
  ];

  const premiumItems = highElectronics ? [
    'Transient voltage surge suppressor (TVSS) rated 40kA+ at panel: $300–$600 installed',
    'Separate surge protection for HVAC, pool equipment, and irrigation controllers',
    'Smart home hub and server: dedicated line conditioning UPS required',
    'Consider lightning rod system if structure is tallest within 200ft: $2,000–$6,000',
    'Annual inspection of surge protection devices — MOVs degrade after each event',
  ] : [];

  const largeHomeItems = isLarge ? [
    'Lightning rod system becomes cost-effective above 4,000 sq ft due to insurance premium savings',
    'DFW insurers may offer 5–15% discount with certified lightning protection system (LPS)',
    'Multiple panel subpanels need individual surge protection — do not rely on single main panel protector',
  ] : [];

  return {
    strikeRisk: zoneStrikeRisk[zone] || 'High',
    items: [...baseItems, ...premiumItems, ...largeHomeItems],
    pointOfUseCost: '$200–$600',
    wholehomeCost: size === 'Over 4,000 sq ft' ? '$800–$2,000' : '$300–$700',
    lightningRodCost: isLarge ? '$2,000–$6,000' : 'Not cost-effective for this home size',
    insuranceNote: highElectronics ? 'Document electronics with serial numbers and receipts. Full replacement value rider often adds only $15–$40/mo.' : 'Standard homeowner policy covers direct lightning strike — surge damage exclusions are common.',
  };
}

export default function DFWLightningProtectionGuide() {
  const [size, setSize] = useState('');
  const [electronics, setElectronics] = useState('');
  const [zone, setZone] = useState('');
  const [result, setResult] = useState<ReturnType<typeof getRecommendation> | null>(null);

  function handleSubmit() {
    if (!size || !electronics || !zone) return;
    setResult(getRecommendation(size, electronics, zone));
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>⚡ DFW Lightning Protection Guide</div>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
          Texas ranks #2 in the US for lightning deaths and DFW sees 50–70 thunderstorm days per year. Modern homes are packed with vulnerable electronics. Here's what actually protects them.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '1rem' }}>🎯 Protection Tiers — What They Do</div>
          {[['⚡ Direct Strike', 'Lightning rod (LPS)', 'Intercepts lightning before it hits structure — rare but catastrophic without it on tall/isolated homes'],
            ['🔌 Surge at Panel', 'Whole-home surge suppressor', 'Stops large transient voltage before it reaches internal wiring — $300 install, protects everything'],
            ['💻 Surge at Outlet', 'Point-of-use surge protectors', 'Last line of defense — power strips with MOV protection ($25–$80) on all sensitive electronics'],
            ['📡 Coax / Ethernet', 'Line surge protectors', 'Often forgotten — lightning enters homes via cable TV, internet, and phone lines just as easily as power'],
            ['🌡️ HVAC Units', 'Dedicated surge devices', 'Outdoor units are the tallest metallic objects near your home — highest strike probability'],
          ].map(([risk, solution, desc]) => (
            <div key={risk} style={{ marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid #1e3a5f' }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ color: '#F5E642' }}>{risk}</span>
                <span style={{ color: '#e2e8f0', fontWeight: 600 }}>→ {solution}</span>
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.88rem', paddingLeft: '1rem' }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '1rem' }}>🔍 Get Your Protection Recommendation</div>
          {[
            { label: 'Home Size', value: size, setter: setSize, options: homeSizes },
            { label: 'Total Electronics Value', value: electronics, setter: setElectronics, options: electronicsValues },
            { label: 'DFW Zone', value: zone, setter: setZone, options: dfwZones },
          ].map(({ label, value, setter, options }) => (
            <div key={label} style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.9rem' }}>{label}</label>
              <select value={value} onChange={e => setter(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 6, background: '#1e3a5f', border: '1px solid #334155', color: '#fff' }}>
                <option value=''>Select {label.toLowerCase()}...</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
          <button onClick={handleSubmit}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 6, padding: '0.75rem 1.5rem', cursor: 'pointer', width: '100%' }}>
            Get My Protection Plan →
          </button>
        </div>

        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', border: '1px solid #F5E642' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>📍 Your Zone Strike Risk</div>
              <div style={{ color: '#e2e8f0', marginBottom: '1rem' }}>{result.strikeRisk}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>⚡ Recommended Protection Steps</div>
              {result.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#F5E642', flexShrink: 0 }}>▸</span>
                  <span style={{ color: '#e2e8f0', fontSize: '0.92rem' }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {[
                { label: 'Point-of-Use Surge Cost', value: result.pointOfUseCost, color: '#F5E642' },
                { label: 'Whole-Home Surge Cost', value: result.wholehomeCost, color: '#F5E642' },
                { label: 'Lightning Rod System', value: result.lightningRodCost, color: '#94a3b8' },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ background: '#0f2040', borderRadius: 8, padding: '1rem', flex: 1, minWidth: 160 }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.25rem' }}>{label}</div>
                  <div style={{ color, fontWeight: 700 }}>{value}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#0f2040', borderRadius: 8, padding: '1rem', border: '1px solid #334155' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>📋 Insurance Note</div>
              <div style={{ color: '#e2e8f0', marginTop: '0.25rem', fontSize: '0.92rem' }}>{result.insuranceNote}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
