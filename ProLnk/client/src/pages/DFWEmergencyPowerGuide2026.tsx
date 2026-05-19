import { useState } from 'react';

const options = [
  { id: 'portable', icon: '⛽', label: 'Portable Generator', cost: '$500–$2,000', install: 'Transfer switch required ($500–$1,500 installed)', runtime: '8–12 hrs per tank (5–7 gal)', pros: 'Low upfront cost, stores in garage', cons: 'Manual setup, run outside only, refueling during storm, CO risk if misused', dfwNote: 'Uri 2021: Portable generators caused dozens of CO deaths in DFW when used indoors.' },
  { id: 'standby', icon: '🏠', label: 'Whole-Home Standby Generator', cost: '$8,000–$15,000', install: 'Includes auto-transfer switch, natural gas line connection', runtime: 'Unlimited on natural gas; runs automatically within 30 sec of outage', pros: 'Fully automatic, powers entire home, no refueling on gas line', cons: 'High cost, needs annual maintenance, permit required in DFW cities', dfwNote: 'Best for DFW families with medical equipment or home offices. Gas line availability varies by neighborhood.' },
  { id: 'battery', icon: '🔋', label: 'Battery Backup (Powerwall)', cost: '$10,000–$15,000 installed', install: 'Certified electrician required; pairs with solar for recharge', runtime: '1–2 days for essential loads; recharges via solar or grid', pros: 'Silent, no emissions, indoors, pairs with solar for ERCOT independence', cons: 'High cost, limited duration without solar, DFW solar less consistent in winter', dfwNote: 'Ideal for DFW solar adopters. ERCOT outages often happen at night when solar can’t recharge.' },
  { id: 'ups', icon: '🖥️', label: 'UPS for Critical Devices', cost: '$100–$500', install: 'Plug-in, no electrician needed', runtime: '30 min–4 hrs depending on load', pros: 'Immediate protection, protects from surges and brownouts, works for routers/modem', cons: 'Limited capacity, not for HVAC or refrigerator', dfwNote: 'Essential for DFW work-from-home setups. Keeps internet and laptop running through brief ERCOT events.' },
];

const budgets = [
  { range: 'Under $1,000', rec: 'Portable generator + transfer switch + UPS for critical devices. Handles most DFW outages under 48 hours.' },
  { range: '$1,000–$5,000', rec: 'Mid-size portable generator (7,500W+) + interlock kit + UPS. Powers refrigerator, fans, phone charging, and medical devices.' },
  { range: '$5,000–$12,000', rec: 'Battery backup system (Powerwall or EcoFlow DELTA Pro with extra batteries). Silent, safe, pairs with solar.' },
  { range: '$12,000+', rec: 'Whole-home standby generator on natural gas. Auto-starts, powers everything. Best DFW solution for full protection.' },
];

export default function DFWEmergencyPowerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);

  const opt = options.find(o => o.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F4FD', fontFamily: 'system-ui,sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>⚡</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>DFW Emergency Power Complete Guide 2026</h1>
          <p style={{ color: '#8BA5C4', margin: 0 }}>All backup power options — from Uri 2021 lessons to 2026 solutions</p>
        </div>

        <div style={{ background: '#200A0A', border: '1px solid #FF4444', borderRadius: 10, padding: '14px 18px', marginBottom: 24, fontSize: 14, lineHeight: 1.6 }}>
          <strong style={{ color: '#FF4444' }}>⚠️ ERCOT Lesson from Uri 2021:</strong> 4.5M DFW homes lost power for up to 10 days. 
          Carbon monoxide from indoor generator use killed 11 Texans. Prepare before the next event, not during.
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>Select Power Option → Full Details</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 12, marginBottom: 24 }}>
          {options.map(o => (
            <button key={o.id} onClick={() => setSelected(o.id)}
              style={{ background: selected === o.id ? '#1E3A5F' : '#0F2040', border: `2px solid ${selected === o.id ? '#F5E642' : '#1E3A5F'}`,
                borderRadius: 10, padding: 16, cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ fontSize: 30 }}>{o.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#E8F4FD', margin: '6px 0 4px' }}>{o.label}</div>
              <div style={{ fontSize: 12, color: '#F5E642' }}>{o.cost}</div>
            </button>
          ))}
        </div>

        {opt && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 22, border: '2px solid #F5E642', marginBottom: 24 }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 14px' }}>{opt.icon} {opt.label}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
              {[{ label: 'Cost', val: opt.cost }, { label: 'Runtime', val: opt.runtime }, { label: 'Installation', val: opt.install }].map(item => (
                <div key={item.label} style={{ background: '#1A2840', borderRadius: 8, padding: 10 }}>
                  <div style={{ color: '#8BA5C4', fontSize: 11, fontWeight: 700 }}>{item.label.toUpperCase()}</div>
                  <div style={{ fontSize: 13, color: '#E8F4FD', marginTop: 4 }}>{item.val}</div>
                </div>
              ))}
              <div style={{ background: '#1A2840', borderRadius: 8, padding: 10 }}>
                <div style={{ color: '#8BA5C4', fontSize: 11, fontWeight: 700 }}>DFW NOTE</div>
                <div style={{ fontSize: 13, color: '#F5E642', marginTop: 4 }}>{opt.dfwNote}</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ background: '#0A2010', borderRadius: 8, padding: 10 }}>
                <div style={{ color: '#44BB44', fontWeight: 700, marginBottom: 4 }}>✅ Pros</div>
                <div style={{ fontSize: 13, color: '#B8D4EA' }}>{opt.pros}</div>
              </div>
              <div style={{ background: '#200A0A', borderRadius: 8, padding: 10 }}>
                <div style={{ color: '#FF6666', fontWeight: 700, marginBottom: 4 }}>⚠️ Cons</div>
                <div style={{ fontSize: 13, color: '#B8D4EA' }}>{opt.cons}</div>
              </div>
            </div>
          </div>
        )}

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>Budget → Recommendation</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {budgets.map(b => (
            <button key={b.range} onClick={() => setBudget(b.range)}
              style={{ background: budget === b.range ? '#1E3A5F' : '#0F2040', border: `2px solid ${budget === b.range ? '#F5E642' : '#1E3A5F'}`,
                borderRadius: 10, padding: '14px 18px', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: budget === b.range ? 8 : 0 }}>{b.range}</div>
              {budget === b.range && <div style={{ fontSize: 14, color: '#B8D4EA', lineHeight: 1.6 }}>{b.rec}</div>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

