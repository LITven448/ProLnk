import { useState } from 'react';

const SMART_SYSTEMS = [
  {
    name: 'myQ by Chamberlain',
    price: 29,
    type: 'Add-on controller',
    compatibility: 'Most Chamberlain, LiftMaster, Craftsman openers (2011+)',
    app: '⭐⭐⭐⭐',
    alexa: true,
    google: true,
    homekit: false,
    vehicleDelivery: 'Amazon Key compatible',
    pros: ['Cheapest smart upgrade ($29)', 'Huge opener compatibility', 'Amazon Key delivery access', 'Guest access codes'],
    cons: ['No Apple HomeKit (partner deal with Amazon)', 'App requires login for every action', 'Subscription for some features'],
  },
  {
    name: 'Tailwind iQ3',
    price: 99,
    type: 'Add-on controller',
    compatibility: 'Universal — works with most brands',
    app: '⭐⭐⭐⭐⭐',
    alexa: true,
    google: true,
    homekit: true,
    vehicleDelivery: 'Geo-fencing auto-open',
    pros: ['Works with HomeKit', 'Auto-open/close on geo-fence', 'Local processing (no cloud required)', 'Best privacy option'],
    cons: ['Less brand recognition', 'No Amazon Key integration', 'Slightly bulkier hardware'],
  },
  {
    name: 'Chamberlain myQ + New Opener',
    price: 349,
    type: 'New smart opener',
    compatibility: 'Any garage door',
    app: '⭐⭐⭐⭐',
    alexa: true,
    google: true,
    homekit: false,
    vehicleDelivery: 'Amazon Key built-in',
    pros: ['Best long-term option', 'DFW heat-rated motor', 'Quieter belt drive', 'Built-in battery backup'],
    cons: ['Higher cost', 'Professional install recommended', 'No HomeKit'],
  },
  {
    name: 'Meross Smart Garage Opener',
    price: 39,
    type: 'Add-on controller',
    compatibility: 'Most single-button opener brands',
    app: '⭐⭐⭐',
    alexa: true,
    google: true,
    homekit: true,
    vehicleDelivery: 'No',
    pros: ['HomeKit support at $39', 'Simple setup', 'No subscription'],
    cons: ['Basic app', 'No vehicle delivery', 'Limited advanced features'],
  },
];

const DFW_FACTS = [
  { icon: '🌡️', stat: '110°F+', label: 'Max garage surface temp in DFW summer — kills unconditioned spaces' },
  { icon: '💨', stat: '$40–80/mo', label: 'AC cost increase when garage door left open 4+ hours in summer' },
  { icon: '🔧', stat: '5–7 years', label: 'Average DFW garage opener lifespan due to heat stress on motors' },
  { icon: '📦', stat: '62%', label: 'DFW homeowners who say package delivery is top smart garage reason' },
];

type OpenerBrand = 'chamberlain' | 'liftmaster' | 'craftsman' | 'genie' | 'overhead' | 'other' | '';
type FeatureSet = 'delivery' | 'privacy' | 'homekit' | 'budget' | '';

export default function DFWSmartGarageGuide() {
  const [brand, setBrand] = useState<OpenerBrand>('');
  const [features, setFeatures] = useState<FeatureSet>('');
  const [showResult, setShowResult] = useState(false);

  function getRecommendation() {
    if (features === 'homekit') return SMART_SYSTEMS[1];
    if (features === 'budget') return SMART_SYSTEMS[0];
    if (features === 'privacy') return SMART_SYSTEMS[1];
    if (features === 'delivery') return SMART_SYSTEMS[0];
    if (brand === 'chamberlain' || brand === 'liftmaster' || brand === 'craftsman') return SMART_SYSTEMS[0];
    return SMART_SYSTEMS[1];
  }

  const rec = getRecommendation();
  const canGenerate = brand && features;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 20px' }}>

        <div style={{ marginBottom: 32 }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>🚗 DFW SMART GARAGE</span>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '16px 0 8px', lineHeight: 1.2 }}>
            DFW Smart Garage Guide: myQ vs Chamberlain vs Tailwind
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.6 }}>
            In DFW, a forgotten open garage door isn't just a security risk — it’s a $40–80 spike in your monthly AC bill. Smart garage controllers pay for themselves in the first summer.
          </p>
        </div>

        <div style={{ background: '#F59E0B', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #D97706′ }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#0A1628', marginBottom: 8 }}>⚠️ The DFW Garage AC Leak Problem</div>
          <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0, color: '#1C1917′ }}>
            An attached garage with a closed insulated door still lets in heat — but an open garage door creates a direct hot-air pathway into your home. In July and August, leaving the garage open for 4+ hours can add $40–80 to your monthly Oncor bill. Smart garage controllers with auto-close on departure solve this automatically.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {DFW_FACTS.map(f => (
            <div key={f.label} style={{ background: '#0F2140', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{f.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 24, marginBottom: 4 }}>{f.stat}</div>
              <div style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.4 }}>{f.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginBottom: 24 }}>
          {SMART_SYSTEMS.map(sys => (
            <div key={sys.name} style={{ background: '#0F2140', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{sys.name}</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ background: '#1E3A5F', color: '#94A3B8', padding: '2px 8px', borderRadius: 4, fontSize: 11 }}>{sys.type}</span>
                    {sys.alexa && <span style={{ background: '#F59E0B20', color: '#F59E0B', padding: '2px 8px', borderRadius: 4, fontSize: 11 }}>Alexa</span>}
                    {sys.google && <span style={{ background: '#34D39920', color: '#34D399', padding: '2px 8px', borderRadius: 4, fontSize: 11 }}>Google</span>}
                    {sys.homekit && <span style={{ background: '#A78BFA20', color: '#A78BFA', padding: '2px 8px', borderRadius: 4, fontSize: 11 }}>HomeKit</span>}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 22 }}>${sys.price}</div>
                  <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>App: {sys.app}</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 12 }}>Compatible: {sys.compatibility}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div><div style={{ fontSize: 12, color: '#34D399', marginBottom: 6 }}>✅ Pros</div>{sys.pros.map(p => <div key={p} style={{ fontSize: 12, color: '#94A3B8', marginBottom: 3 }}>• {p}</div>)}</div>
                <div><div style={{ fontSize: 12, color: '#F87171', marginBottom: 6 }}>⚠️ Cons</div>{sys.cons.map(c => <div key={c} style={{ fontSize: 12, color: '#94A3B8', marginBottom: 3 }}>• {c}</div>)}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 6, padding: '8px 12px', fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Vehicle Delivery:</span>
                <span style={{ color: sys.vehicleDelivery !== 'No' ? '#34D399′ : '#64748B', fontWeight: 600 }}>{sys.vehicleDelivery}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🌡️ DFW Heat & Garage Door Opener Longevity</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
            DFW summer heat is brutal on garage door opener motors. The average national opener lifespan is 10–15 years, but DFW homeowners report replacing openers every 5–7 years due to motor and circuit board damage from 110°F+ garage temperatures.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { tip: '🌡️ Insulate your garage door', desc: 'R-16 insulated door keeps garage 20–30°F cooler — extends opener life significantly' },
              { tip: '🔧 Lubricate springs/rollers', desc: 'Do this every 6 months — DFW heat dries lubricants 2x faster than northern climates' },
              { tip: '🔌 Use a smart controller', desc: 'Reduces unnecessary open/close cycles — every cycle shortens opener life' },
              { tip: '💡 Install a mini-split', desc: 'Conditioned garage extends opener lifespan to 12+ years and creates usable workspace' },
            ].map(t => (
              <div key={t.tip} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{t.tip}</div>
                <div style={{ fontSize: 13, color: '#94A3B8′ }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, border: '2px solid #F5E642′ }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🔍 Find Your Smart Garage Solution</h2>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Your existing opener brand:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {[
                { v: 'chamberlain', l: 'Chamberlain' },
                { v: 'liftmaster', l: 'LiftMaster' },
                { v: 'craftsman', l: 'Craftsman' },
                { v: 'genie', l: 'Genie' },
                { v: 'overhead', l: 'Overhead Door' },
                { v: 'other', l: 'Other / Unknown' },
              ].map(opt => (
                <button key={opt.v} onClick={() => { setBrand(opt.v as OpenerBrand); setShowResult(false); }}
                  style={{ padding: '8px 14px', borderRadius: 20, border: `2px solid ${brand === opt.v ? '#F5E642' : '#1E3A5F'}`, background: brand === opt.v ? '#F5E642′ : ’transparent', color: brand === opt.v ? '#0A1628′ : '#E8EDF5', cursor: ’pointer', fontSize: 13, fontWeight: 600 }}>
                  {opt.l}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Most important feature:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {[
                { v: 'delivery', l: '📦 Amazon Key vehicle delivery' },
                { v: 'homekit', l: '🍎 Apple HomeKit support' },
                { v: 'privacy', l: '🔒 Local control / privacy' },
                { v: 'budget', l: '💰 Lowest cost option' },
              ].map(opt => (
                <button key={opt.v} onClick={() => { setFeatures(opt.v as FeatureSet); setShowResult(false); }}
                  style={{ padding: '8px 14px', borderRadius: 20, border: `2px solid ${features === opt.v ? '#F5E642' : '#1E3A5F'}`, background: features === opt.v ? '#F5E642′ : ’transparent', color: features === opt.v ? '#0A1628′ : '#E8EDF5', cursor: ’pointer', fontSize: 13, fontWeight: 600 }}>
                  {opt.l}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => setShowResult(true)} disabled={!canGenerate}
            style={{ background: canGenerate ? '#F5E642′ : '#1E3A5F', color: canGenerate ? '#0A1628' : '#64748B', border: ’none', padding: '12px 32px', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: canGenerate ? 'pointer' : 'not-allowed', width: '100%' }}>
            Get My Garage Recommendation →
          </button>
          {showResult && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 8, padding: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, color: '#F5E642′ }}>✅ Recommended: {rec.name}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div><div style={{ fontSize: 12, color: '#64748B' }}>COST</div><div style={{ fontWeight: 700, fontSize: 18, color: '#F5E642′ }}>${rec.price}</div></div>
                <div><div style={{ fontSize: 12, color: '#64748B' }}>TYPE</div><div style={{ fontWeight: 600, fontSize: 14 }}>{rec.type}</div></div>
                <div><div style={{ fontSize: 12, color: '#64748B' }}>VEHICLE DELIVERY</div><div style={{ fontWeight: 600, fontSize: 14, color: rec.vehicleDelivery !== 'No' ? '#34D399′ : '#64748B' }}>{rec.vehicleDelivery}</div></div>
              </div>
              <div style={{ marginTop: 12, fontSize: 13, color: '#94A3B8′ }}>Compatible with: {rec.compatibility}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 32, textAlign: 'center', padding: '24px', background: '#0F2140', borderRadius: 12 }}>
          <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 8 }}>Need a DFW pro to install your smart garage controller or replace your opener?</div>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>ProLnk matches you with certified DFW garage door specialists 🚗</div>
        </div>

      </div>
    </div>
  );
}
