import { useState } from 'react';

const smartUpgrades = [
  { label: 'Smart Thermostat (Nest/Ecobee)', roiMin: 100, roiMax: 150, paybackMonths: 18, insuranceDiscount: false, note: 'Best ROI of any smart upgrade in DFW — fast payback via energy savings' },
  { label: 'Smart Security System', roiMin: 40, roiMax: 70, paybackMonths: 36, insuranceDiscount: true, note: 'Moderate buyer appeal + insurance premium reduction offsets cost' },
  { label: 'EV Charger (Level 2)', roiMin: 50, roiMax: 80, paybackMonths: 48, insuranceDiscount: false, note: 'Growing premium in DFW as EV adoption accelerates — strong in Plano, Frisco' },
  { label: 'Solar Panel System', roiMin: 30, roiMax: 60, paybackMonths: 120, insuranceDiscount: false, note: 'Long payback but growing buyer premium in DFW — stronger in higher price tiers' },
];

const priceTiers = [
  { label: 'Under $300K', premiumMultiplier: 0.7 },
  { label: '$300K–$500K', premiumMultiplier: 1.0 },
  { label: '$500K–$800K', premiumMultiplier: 1.3 },
  { label: '$800K+', premiumMultiplier: 1.6 },
];

export default function DFWSmartHomeROIGuide() {
  const [selectedUpgrade, setSelectedUpgrade] = useState('');
  const [cost, setCost] = useState('');
  const [priceTier, setPriceTier] = useState('');
  const [result, setResult] = useState<{ valueAdded: number; roiPct: number; buyerPremium: number; paybackMonths: number; insuranceNote: string; note: string } | null>(null);

  function calculate() {
    const upg = smartUpgrades.find(u => u.label === selectedUpgrade);
    const tier = priceTiers.find(t => t.label === priceTier);
    const investCost = parseFloat(cost);
    if (!upg || isNaN(investCost) || investCost <= 0) return;

    const roiMid = (upg.roiMin + upg.roiMax) / 2 / 100;
    const multiplier = tier?.premiumMultiplier ?? 1.0;
    const valueAdded = Math.round(investCost * roiMid);
    const buyerPremium = Math.round(valueAdded * multiplier);
    const roiPct = Math.round((buyerPremium / investCost) * 100);
    const insuranceNote = upg.insuranceDiscount ? '+ potential 5–15% homeowner insurance discount' : '';

    setResult({ valueAdded, roiPct, buyerPremium, paybackMonths: upg.paybackMonths, insuranceNote, note: upg.note });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>
          📱 DFW Market Guide
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          Smart Home ROI Guide
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 40, lineHeight: 1.6 }}>
          DFW's tech-savvy buyer base increasingly values smart home features. See which upgrades deliver real returns vs. hype.
        </p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 40 }}>
          {smartUpgrades.map(u => (
            <div key={u.label} style={{ background: '#111d33', border: '1px solid #1e3a5f', borderRadius: 12, padding: '20px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{u.label}</div>
                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 16 }}>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{u.roiMin}–{u.roiMax}%</div>
                  <div style={{ color: '#64748b', fontSize: 11 }}>~{u.paybackMonths}mo payback</div>
                </div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{u.note}</div>
              {u.insuranceDiscount && (
                <div style={{ marginTop: 8, fontSize: 12, color: '#86efac', background: '#052e16', borderRadius: 6, padding: '4px 10px', display: 'inline-block' }}>
                  🛡️ Insurance discount eligible
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#111d33', border: '1px solid #1e3a5f', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#F5E642′ }}>
            📊 Calculate Smart Upgrade ROI
          </h2>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#cbd5e1′ }}>Smart Upgrade</label>
            <select
              value={selectedUpgrade}
              onChange={e => setSelectedUpgrade(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 15 }}
            >
              <option value="">Select an upgrade...</option>
              {smartUpgrades.map(u => <option key={u.label}>{u.label}</option>)}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#cbd5e1′ }}>Install Cost ($)</label>
              <input
                type="number"
                value={cost}
                onChange={e => setCost(e.target.value)}
                placeholder="e.g. 8000″
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 15, boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#cbd5e1′ }}>Home Price Tier</label>
              <select
                value={priceTier}
                onChange={e => setPriceTier(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 15 }}
              >
                <option value="">Select tier...</option>
                {priceTiers.map(t => <option key={t.label}>{t.label}</option>)}
              </select>
            </div>
          </div>

          <button
            onClick={calculate}
            style={{ width: '100%', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 0', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}
          >
            Calculate Smart ROI →
          </button>

          {result && (
            <div style={{ marginTop: 28, background: '#0A1628', borderRadius: 12, padding: 24, border: '1px solid #F5E642′ }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 22 }}>${result.buyerPremium.toLocaleString()}</div>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>Buyer Premium Est.</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 22 }}>{result.roiPct}%</div>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>Adjusted ROI</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 22 }}>{result.paybackMonths}mo</div>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>Payback Period</div>
                </div>
              </div>
              {result.insuranceNote && (
                <div style={{ color: '#86efac', fontSize: 13, marginBottom: 12 }}>🛡️ {result.insuranceNote}</div>
              )}
              <div style={{ color: '#94a3b8', fontSize: 13, borderTop: '1px solid #1e3a5f', paddingTop: 12 }}>💡 {result.note}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
