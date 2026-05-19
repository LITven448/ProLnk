import { useState } from 'react';

const brands: Record<string, { steps: string[]; deadline: string; site: string; upgrade: string }> = {
  Carrier: {
    deadline: '60 days from install',
    site: 'carrier.com/residential/en/us/support/product-registration/',
    upgrade: '5-year parts → 10-year parts + limited compressor',
    steps: [
      '📋 Locate outdoor unit data plate (model + serial number)',
      '🌐 Go to carrier.com and click "Product Registration"',
      '📝 Enter serial number, install date, contractor info',
      '📧 Save confirmation email with registration number',
      '🏠 Add confirmation number to ProLnk Vault under Documents',
      '📅 Set annual reminder to verify warranty is on file',
    ],
  },
  Trane: {
    deadline: '60 days from install',
    site: 'trane.com/residential/en/owners/product-registration/',
    upgrade: '5-year base → 10-year registered limited warranty',
    steps: [
      '📋 Find model/serial on outdoor condenser data plate',
      '🌐 Visit trane.com → Owners → Product Registration',
      '📝 Enter all unit info including installing dealer name',
      '📧 Print or save PDF confirmation from Trane',
      '🏠 Upload to ProLnk Vault — tagged as "HVAC Warranty"',
      '✅ Call dealer to confirm they also registered on their end',
    ],
  },
  Lennox: {
    deadline: '60 days from install',
    site: 'lennox.com/owners/product-registration',
    upgrade: '5-year parts → 10-year parts + 20-year heat exchanger',
    steps: [
      '📋 Serial number format: first 4 digits = manufacture week/year',
      '🌐 Go to lennox.com → Owners → Register Product',
      '📝 Create account or register as guest with install info',
      '📧 Save Lennox confirmation number for warranty claims',
      '🏠 Note: Lennox requires dealer to also register — verify this',
      '🔑 Store both dealer receipt and warranty card in ProLnk Vault',
    ],
  },
  Goodman: {
    deadline: '30 days from install',
    site: 'goodmanmfg.com/resources/product-registration',
    upgrade: '5-year parts → 10-year parts (base warranty already strong)',
    steps: [
      '📋 Locate serial number on outdoor unit nameplate',
      '🌐 Visit goodmanmfg.com → Resources → Product Registration',
      '📝 Enter model, serial, and installer info (license number needed)',
      '📧 Goodman emails confirmation — save to file',
      '🏠 Goodman is 30-day deadline — act immediately after install',
      '⚡ Upload confirmation to ProLnk Vault ASAP',
    ],
  },
};

export default function DFWHVACWarrantyRegistration2026() {
  const [brand, setBrand] = useState('Carrier');
  const info = brands[brand];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>📜</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>
            DFW HVAC Warranty Registration 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Select your brand for a step-by-step registration walkthrough</p>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
          {Object.keys(brands).map(b => (
            <button key={b} onClick={() => setBrand(b)}
              style={{ padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14,
                background: brand === b ? '#F5E642′ : '#1e2d45', color: brand === b ? '#0A1628' : '#94a3b8' }}>
              {b}
            </button>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: '18px 20px', marginBottom: 20, borderLeft: '4px solid #F5E642′ }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>⏰ Deadline: {info.deadline}</div>
          <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>🎁 Coverage upgrade: {info.upgrade}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {info.steps.map((step, i) => (
            <div key={i} style={{ background: '#1e2d45', borderRadius: 10, padding: '14px 18px', display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 28, height: 28,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
              <div style={{ color: '#e2e8f0', fontSize: 14 }}>{step}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28, background: '#1e2d45', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 24 }}>🏠</div>
          <div style={{ color: '#F5E642', fontWeight: 700, marginTop: 8 }}>Store Everything in ProLnk Vault</div>
          <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 6 }}>
            Warranty registration confirmation is required to make warranty claims. Don't lose it.
          </div>
        </div>
      </div>
    </div>
  );
}
