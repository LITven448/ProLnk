import { useState } from 'react';

const legacyItems = [
  { id: 'installed', label: 'Installation date & contractor info' },
  { id: 'model', label: 'Model, serial numbers & SEER rating' },
  { id: 'repairs', label: 'Full repair history with dates & costs' },
  { id: 'warranties', label: 'Equipment warranties & service contracts' },
  { id: 'filters', label: 'Filter specifications & change schedule' },
  { id: 'refrigerant', label: 'Refrigerant type (R-22 vs R-410A)' },
  { id: 'ductwork', label: 'Ductwork layout & last inspection' },
  { id: 'permits', label: 'Permits pulled for installations' },
];

const docStatus = [
  { value: 'none', label: '📦 Nothing documented yet' },
  { value: 'partial', label: '📝 Some records exist' },
  { value: 'good', label: '🗂️ Well organized records' },
];

export default function DFWHVACDFWLegacy() {
  const [status, setStatus] = useState('');
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState('');

  function toggle(id: string) {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  }

  function generate() {
    const count = Object.values(checked).filter(Boolean).length;
    if (!status) { setResult('⚠️ Select your documentation status first.'); return; }
    if (status === 'none') {
      setResult('📋 Start with the basics: locate your equipment tags and photograph model/serial numbers today. Then contact your HVAC contractor for a history pull — most DFW contractors keep records 5–10 years. ProLnk\'s Home Health Vault auto-organizes everything you collect.');
    } else if (status === 'partial') {
      setResult(`🗂️ You have a foundation. You\'ve checked ${count} of ${legacyItems.length} legacy items. Fill gaps by calling your contractor and checking your email for old invoices. Once complete, your HVAC legacy adds measurable value at resale — DFW buyers increasingly request it.`);
    } else {
      setResult(`✅ Outstanding. With ${count} items documented, your HVAC legacy is a genuine selling point. DFW homes with documented HVAC history sell faster and with fewer inspection surprises. Upload to ProLnk\'s Home Health Vault to make it transferable at closing.`);
    }
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: 'white', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8, letterSpacing: 1 }}>PROLNK · DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Your DFW HVAC Legacy 🏡</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
          What DFW homeowners leave behind matters. A properly documented HVAC history adds real dollar value to your home at resale — and protects the next family from costly surprises. In north Texas, where HVAC systems work harder than almost anywhere in the country, that history is essential.
        </p>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📌 What a DFW HVAC Legacy Document Contains</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {legacyItems.map(item => (
              <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                <input type="checkbox" checked={!!checked[item.id]} onChange={() => toggle(item.id)}
                  style={{ accentColor: '#F5E642', width: 18, height: 18 }} />
                <span style={{ color: '#cbd5e1', fontSize: 15 }}>{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 What's Your Current Documentation Status?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {docStatus.map(opt => (
              <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                <input type="radio" name="status" value={opt.value} onChange={() => setStatus(opt.value)}
                  style={{ accentColor: '#F5E642', width: 18, height: 18 }} />
                <span style={{ color: '#cbd5e1', fontSize: 15 }}>{opt.label}</span>
              </label>
            ))}
          </div>
          <button onClick={generate}
            style={{ marginTop: 20, background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Create My Legacy Plan →
          </button>
          {result && (
            <div style={{ marginTop: 20, background: '#1e3a5f', borderRadius: 8, padding: 18, color: '#e2e8f0', lineHeight: 1.7, fontSize: 15 }}>
              {result}
            </div>
          )}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🏦 Store It in ProLnk's Home Health Vault</h2>
          <p style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.6 }}>
            The Home Health Vault is the permanent home for your HVAC legacy. It's transferable at closing, accessible to buyers' agents, and builds in value over time as your record grows. Join the waitlist to secure your home's place in the vault.
          </p>
          <div style={{ marginTop: 16, color: '#F5E642', fontWeight: 700, fontSize: 14 }}>prolnk.io · Join the Waitlist</div>
        </div>
      </div>
    </div>
  );
}
