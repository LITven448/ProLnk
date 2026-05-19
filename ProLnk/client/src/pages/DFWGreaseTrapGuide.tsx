import { useState } from 'react';

const cityRules: Record<string, Record<string, { requirement: string; exemption: string; alternative: string }>> = {
  Dallas: {
    restaurant: { requirement: 'Grease trap required. Dallas City Code Sec. 49-27. Minimum 1,000-gallon capacity for commercial food service. Pumped every 90 days minimum.', exemption: 'None for commercial food prep over 25 meals/day.', alternative: 'Grease interceptor under sink if approved by Dallas Water Utilities.' },
    homebakery: { requirement: 'Home-based bakeries with commercial equipment may require a grease trap depending on volume. Check with Dallas Development Services.', exemption: 'Cottage food operations (under $50K/yr, no meat) typically exempt.', alternative: 'Install under-sink grease trap or use grease collection bin for disposal.' },
    homecooking: { requirement: 'No grease trap required for standard residential use. Avoid pouring grease down drains regardless.', exemption: 'All residential use exempt.', alternative: 'Grease disposal: cool and trash. Use strainer in sink drain.' },
  },
  FortWorth: {
    restaurant: { requirement: 'Grease interceptor required per Fort Worth Code of Ordinances Ch. 12.5. Licensed pumping required quarterly.', exemption: 'No exemptions for commercial operations over 10 seats.', alternative: 'Pre-treatment interceptor approved by Fort Worth Water Dept.' },
    homebakery: { requirement: 'Home commercial food operations: check Fort Worth Environmental Quality Dept. Trigger is if you have a commercial oven or dishwasher.', exemption: 'Cottage food law exempts small operators from grease trap if under residential threshold.', alternative: 'Grease collection via licensed hauler instead of trap if low volume.' },
    homecooking: { requirement: 'No grease trap required for private residences.', exemption: 'Fully exempt.', alternative: 'Use mesh strainer and dispose of grease in sealed container in trash.' },
  },
  Plano: {
    restaurant: { requirement: 'Grease trap required for all food service establishments. Plano Environmental Health enforces. Minimum 1,000-gallon buried interceptor.', exemption: 'Only exempt if preparing no hot food and no frying.', alternative: 'Indoor hydro-mechanical grease interceptor with Plano approval.' },
    homebakery: { requirement: 'Plano requires home business permit. Grease trap may be triggered if frying or high-fat baking at commercial scale.', exemption: 'Cottage food operators exempt if under state law thresholds.', alternative: 'Grease mat in sink + monthly drain cleaning as alternative if low volume.' },
    homecooking: { requirement: 'Not required for normal residential use.', exemption: 'Fully exempt — residential properties not subject to FOG ordinance.', alternative: 'Best practice: never pour oil down drain, use compostable grease bags.' },
  },
  Arlington: {
    restaurant: { requirement: 'Grease interceptor required. Arlington Utilities approves sizing. Pumping logs must be kept on site.', exemption: 'Snow cone stands and non-cooking vendors may qualify for exemption.', alternative: 'Small flow interceptor for low-volume operators with Arlington Utilities pre-approval.' },
    homebakery: { requirement: 'Home-based food operations must check with Arlington Development Services. Grease trap unlikely required unless operating commercial-scale equipment.', exemption: 'Cottage food license holders typically exempt.', alternative: 'Maintain grease disposal log to show compliance intent if inspected.' },
    homecooking: { requirement: 'No requirement for residential home cooking.', exemption: 'Fully exempt.', alternative: 'Proper disposal: collect grease in container and trash when cooled.' },
  },
};

const businessLabels: Record<string, string> = {
  restaurant: '🍽️ Restaurant / Commercial Kitchen',
  homebakery: '🥐 Home Bakery / Food Business',
  homecooking: '🏠 Private Home Cooking',
};

export default function DFWGreaseTrapGuide() {
  const [city, setCity] = useState('');
  const [bizType, setBizType] = useState('');
  const result = city && bizType ? cityRules[city]?.[bizType] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>🏡 DFW HOME SYSTEMS GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>Grease Trap Guide — DFW</h1>
        <p style={{ color: '#A0AABB', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          Grease traps (also called grease interceptors) are required for restaurants and commercial food service in all DFW cities — but they're rarely required for homeowners. However, if you run a food-related business from home, the rules can apply to you.
        </p>

        <div style={{ backgroundColor: '#111F3A', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🛢️ What Is a Grease Trap?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { emoji: '🏭', label: 'How It Works', desc: 'Intercepts fats, oils, and grease (FOG) before they enter the sewer system, where they cause blockages.' },
              { emoji: '📏', label: 'Typical Sizes', desc: 'Commercial: 500–2,000 gallon buried tanks. Under-sink: 35–100 gallon hydro-mechanical units.' },
              { emoji: '🧹', label: 'Maintenance', desc: 'Commercial units pumped every 60–90 days. Pumping logs required. Licensed haulers only.' },
              { emoji: '⚠️', label: 'Violations', desc: 'Sewer FOG violations result in fines up to $5,000/day and restaurant shutdowns in DFW cities.' },
            ].map(item => (
              <div key={item.label} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{item.emoji}</div>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: '#A0AABB', fontSize: 13, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#111F3A', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 City + Business Type Lookup</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#A0AABB', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW City</label>
              <select value={city} onChange={e => setCity(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 14 }}>
                <option value="">Select city...</option>
                {Object.keys(cityRules).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#A0AABB', fontSize: 13, display: 'block', marginBottom: 6 }}>Business / Use Type</label>
              <select value={bizType} onChange={e => setBizType(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 14 }}>
                <option value="">Select type...</option>
                {Object.entries(businessLabels).map(([val, label]) => <option key={val} value={val}>{label}</option>)}
              </select>
            </div>
          </div>

          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              {[
                { label: 'GREASE TRAP REQUIREMENT', val: result.requirement },
                { label: 'EXEMPTIONS', val: result.exemption },
                { label: 'ALTERNATIVE APPROACHES', val: result.alternative },
              ].map(row => (
                <div key={row.label} style={{ marginBottom: 14 }}>
                  <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{row.label}</div>
                  <div style={{ color: '#A0AABB', fontSize: 14, lineHeight: 1.5 }}>{row.val}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#111F3A', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>💡 PRO TIP</div>
          <div style={{ color: '#A0AABB', fontSize: 14, lineHeight: 1.6 }}>DFW cities enforce FOG (fats, oils, grease) ordinances through their water utilities. If you're starting a home food business, call your city’s Environmental Health or Development Services department before installing any equipment.</div>
        </div>
      </div>
    </div>
  );
}
