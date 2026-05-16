import { useState } from 'react';

const panelAmps = ['60 amp (very old)', '100 amp (standard old)', '150 amp (mid-range)', '200 amp (modern standard)', '400 amp (large home)'];

interface EVResult {
  canAdd: boolean;
  color: string;
  verdict: string;
  detail: string;
  upgradeCost: string;
  chargerCost: string;
}

function getEVAssessment(amps: string): EVResult {
  if (amps === '60 amp (very old)') return {
    canAdd: false, color: '#ef4444',
    verdict: 'Panel upgrade required before EV charger',
    detail: 'A 60-amp panel is dangerously undersized for a modern home, let alone an EV charger. Carrollton homes from the 1960s often still have these. Upgrade to 200-amp is mandatory.',
    upgradeCost: '$3,500–$6,500 panel upgrade',
    chargerCost: '+$800–$1,500 Level 2 charger install'
  };
  if (amps === '100 amp (standard old)') return {
    canAdd: false, color: '#f97316',
    verdict: 'Likely needs upgrade — load calculation required',
    detail: 'Most 100-amp Carrollton homes built 1970s-1990s are near capacity. An EV charger drawing 30-50 amps would require a full load calculation. Upgrade to 200-amp is strongly recommended.',
    upgradeCost: '$2,500–$5,000 panel upgrade',
    chargerCost: '+$800–$1,500 Level 2 charger install'
  };
  if (amps === '150 amp (mid-range)') return {
    canAdd: true, color: '#F5E642',
    verdict: 'Possible with load calculation — borderline',
    detail: 'A 150-amp panel may support a Level 2 EV charger depending on your current load. Get a licensed electrician to run a load calculation first. A sub-panel or smart charger may help.',
    upgradeCost: 'May not need upgrade — $0 or $1,500–$2,500 sub-panel',
    chargerCost: '$800–$1,500 Level 2 charger install'
  };
  if (amps === '200 amp (modern standard)') return {
    canAdd: true, color: '#22c55e',
    verdict: 'Yes — EV charger ready with proper circuit',
    detail: 'A 200-amp panel in a Carrollton home can typically support a Level 2 EV charger (30-50 amp dedicated circuit). Standard installation with a new circuit and outlet or hardwired EVSE.',
    upgradeCost: 'No panel upgrade needed',
    chargerCost: '$800–$1,500 Level 2 charger installed'
  };
  return {
    canAdd: true, color: '#22c55e',
    verdict: 'Absolutely — multiple EVs or even a Level 3 possible',
    detail: 'A 400-amp panel is well-suited for EV charging, even multiple vehicles or a commercial-grade charger. Consider a dedicated sub-panel for future-proofing.',
    upgradeCost: 'No upgrade needed',
    chargerCost: '$800–$2,500 charger of your choice'
  };
}

export default function DFWElectricianCarrollton() {
  const [panelAmp, setPanelAmp] = useState('');
  const result = panelAmp ? getEVAssessment(panelAmp) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: 'white', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 12 }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}>
            ⚡ Carrollton, TX
          </span>
        </div>

        <h1 style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>
          Carrollton TX Electricians —{' '}
          <span style={{ color: '#F5E642' }}>Diverse City Home Experts</span>
        </h1>

        <p style={{ fontSize: 18, color: '#94a3b8', lineHeight: 1.7, marginBottom: 40, maxWidth: 700 }}>
          Carrollton spans six decades of residential construction — from 1960s starter homes near downtown
          to 2000s subdivisions near Highway 121. Older panels, rising EV adoption, and aging wiring make
          Carrollton one of DFW's most active electrical service markets.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 48 }}>
          {[
            { icon: '🔌', title: 'Panel Upgrade Specialists', desc: 'Thousands of Carrollton homes still have 60-100 amp panels. We upgrade to 200-amp same-day and pull all required permits.' },
            { icon: '🚗', title: 'EV Charger Installation', desc: 'Level 2 EVSE installation in Carrollton has tripled in 3 years. We size your circuit correctly and handle city inspection.' },
            { icon: '🏠', title: 'Aluminum Wiring Experts', desc: 'Homes built 1965-1973 may have aluminum wiring — a fire risk. We perform COPALUM remediation and full rewires.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#111f3a', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{card.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: '#F5E642' }}>{card.title}</h3>
              <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 16, padding: 36, border: '1px solid #1e3a5f', marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>🚗 EV Charger Readiness Checker</h2>
          <p style={{ color: '#94a3b8', marginBottom: 28 }}>
            Select your panel amperage to find out if your Carrollton home can support a Level 2 EV charger — and what it will cost.
          </p>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#F5E642' }}>
              Current Panel Amperage (check your breaker box label)
            </label>
            <select
              value={panelAmp}
              onChange={e => setPanelAmp(e.target.value)}
              style={{ width: '100%', maxWidth: 400, padding: '12px 16px', background: '#0A1628', border: '1px solid #2d4a7a', borderRadius: 8, color: 'white', fontSize: 15 }}
            >
              <option value="">Select panel size...</option>
              {panelAmps.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, borderLeft: `4px solid ${result.color}` }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', marginBottom: 4 }}>EV CHARGER VERDICT</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: result.color, marginBottom: 12 }}>
                {result.canAdd ? '✅ ' : '❌ '}{result.verdict}
              </div>
              <p style={{ color: '#cbd5e1', lineHeight: 1.6, marginBottom: 16 }}>{result.detail}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ background: '#111f3a', borderRadius: 8, padding: 14 }}>
                  <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>PANEL WORK</div>
                  <div style={{ fontSize: 14, color: '#F5E642', fontWeight: 700 }}>{result.upgradeCost}</div>
                </div>
                <div style={{ background: '#111f3a', borderRadius: 8, padding: 14 }}>
                  <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>CHARGER INSTALL</div>
                  <div style={{ fontSize: 14, color: '#F5E642', fontWeight: 700 }}>{result.chargerCost}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 16, padding: 36, border: '1px solid #1e3a5f', marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>📊 Carrollton Electrical Service Costs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { service: 'Panel Upgrade (200A)', range: '$2,500–$5,000', note: 'Permitted, inspected' },
              { service: 'EV Charger Install', range: '$800–$1,500', note: 'Level 2, 240V circuit' },
              { service: 'Outlet Add/Repair', range: '$150–$400', note: 'GFCI, standard, USB' },
              { service: 'Full Rewire', range: '$8,000–$20,000', note: 'Older Carrollton homes' },
            ].map(item => (
              <div key={item.service} style={{ background: '#0A1628', borderRadius: 10, padding: 18 }}>
                <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>{item.service}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642' }}>{item.range}</div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', background: '#111f3a', borderRadius: 16, padding: 40, border: '2px solid #F5E642' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>⚡</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 12 }}>Get Carrollton Electrician Quotes Today</h2>
          <p style={{ color: '#94a3b8', marginBottom: 24 }}>ProLnk matches you with licensed Carrollton electricians. Compare quotes — all work permitted and inspected.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', padding: '16px 40px', borderRadius: 10, fontWeight: 800, fontSize: 17, border: 'none', cursor: 'pointer' }}>
            Get Free Quotes
          </button>
        </div>

      </div>
    </div>
  );
}
