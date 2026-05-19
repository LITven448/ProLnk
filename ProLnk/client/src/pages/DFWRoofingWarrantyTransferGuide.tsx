import { useState } from 'react';

const manufacturers = ['GAF', 'Owens Corning', 'CertainTeed', 'Atlas', 'Other/Unknown'];
const certLevels = ['Master Elite / Platinum (top tier)', 'Preferred / Silver Pledge (mid tier)', 'Standard / Uncertified'];

const transferData: Record<string, Record<string, { transferable: boolean; fee: string; coverage: string; note: string }>> = {
  GAF: {
    'Master Elite / Platinum (top tier)': { transferable: true, fee: '$99 within 60 days of sale', coverage: 'Material + workmanship up to 25 years', note: 'Golden Triangle warranty fully transfers. Best in industry.' },
    'Preferred / Silver Pledge (mid tier)': { transferable: true, fee: '$199 within 30 days', coverage: 'Material warranty only transfers', note: 'Workmanship coverage does not follow new owner.' },
    'Standard / Uncertified': { transferable: false, fee: 'N/A', coverage: 'Material warranty only (non-transferable)', note: 'Standard GAF material warranty does not transfer to new owners.' },
  },
  'Owens Corning': {
    'Master Elite / Platinum (top tier)': { transferable: true, fee: '$99 within 60 days', coverage: 'Preferred Protection up to 50 years', note: 'Platinum warranty transfers once. Excellent coverage.' },
    'Preferred / Silver Pledge (mid tier)': { transferable: true, fee: '$150 within 30 days', coverage: 'System Protection warranty transfers', note: 'Good coverage but workmanship duration may be reduced.' },
    'Standard / Uncertified': { transferable: false, fee: 'N/A', coverage: 'Limited material only', note: 'Standard Owens Corning warranty is non-transferable.' },
  },
  CertainTeed: {
    'Master Elite / Platinum (top tier)': { transferable: true, fee: '$75 within 60 days', coverage: 'SureStart Protection fully transfers', note: 'CertainTeed SELECT ShingleMaster warranty transfers cleanly.' },
    'Preferred / Silver Pledge (mid tier)': { transferable: true, fee: '$125 within 30 days', coverage: 'Reduced workmanship coverage', note: 'Material warranty transfers, workmanship coverage halved.' },
    'Standard / Uncertified': { transferable: false, fee: 'N/A', coverage: 'Non-transferable', note: 'No transfer available. Seller should disclose at closing.' },
  },
  Atlas: {
    'Master Elite / Platinum (top tier)': { transferable: true, fee: '$99 within 30 days', coverage: 'Pinnacle Pristine warranty transfers', note: 'Atlas Signature Select program allows one-time transfer.' },
    'Preferred / Silver Pledge (mid tier)': { transferable: true, fee: '$150 within 30 days', coverage: 'Material only on transfer', note: 'Pro-rated after transfer, workmanship not included.' },
    'Standard / Uncertified': { transferable: false, fee: 'N/A', coverage: 'Non-transferable', note: 'No transfer rights available.' },
  },
  'Other/Unknown': {
    'Master Elite / Platinum (top tier)': { transferable: false, fee: 'Unknown', coverage: 'Verify with manufacturer directly', note: 'Request warranty documents from seller before closing.' },
    'Preferred / Silver Pledge (mid tier)': { transferable: false, fee: 'Unknown', coverage: 'Verify with manufacturer directly', note: 'Get written confirmation of transferability before closing.' },
    'Standard / Uncertified': { transferable: false, fee: 'N/A', coverage: 'Unlikely to transfer', note: 'Assume non-transferable until proven otherwise.' },
  },
};

export default function DFWRoofingWarrantyTransferGuide() {
  const [mfr, setMfr] = useState('GAF');
  const [cert, setCert] = useState('Master Elite / Platinum (top tier)');
  const [roofAge, setRoofAge] = useState(4);

  const info = transferData[mfr][cert];
  const icon = info.transferable ? '✅' : '❌';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, fontWeight: 600 }}>🏠 DFW Home Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          Roofing Warranty Transfer Guide for DFW Buyers
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
          When buying a DFW home with a recent roof replacement, you may inherit a valuable manufacturer warranty — but only if you transfer it correctly within the required window.
        </p>

        <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🔍 Warranty Transfer Checker</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#cbd5e1′ }}>Manufacturer</label>
              <select value={mfr} onChange={e => setMfr(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #334155', fontSize: 15, background: '#0f2040', color: '#fff' }}>
                {manufacturers.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#cbd5e1′ }}>Original Installer Certification Level</label>
              <select value={cert} onChange={e => setCert(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #334155', fontSize: 15, background: '#0f2040', color: '#fff' }}>
                {certLevels.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#cbd5e1′ }}>Roof Age: {roofAge} year{roofAge !== 1 ? ’s' : ''}</label>
              <input type="range" min={1} max={20} value={roofAge} onChange={e => setRoofAge(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
          </div>
        </div>

        <div style={{ background: info.transferable ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)', borderRadius: 16, padding: 28, marginBottom: 24, border: `1.5px solid ${info.transferable ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}` }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>{icon} {info.transferable ? 'Warranty Transferable' : 'Not Transferable'}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
            <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>Transfer Fee</div>
              <div style={{ fontWeight: 700, color: '#F5E642′ }}>{info.fee}</div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>What's Covered</div>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{info.coverage}</div>
            </div>
          </div>
          <p style={{ color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>{info.note}</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, color: '#F5E642′ }}>⚡ Key Rules for DFW Buyers</h2>
          {[
            '📋 Request warranty documents and installation receipt from seller before closing',
            '⏱️ Transfer window typically starts at closing date — act within 30–60 days',
            '🔨 Workmanship warranty stays with the installer, not the shingle manufacturer',
            '📞 Call manufacturer directly to verify warranty status before closing',
            '⚠️ DFW hail seasons mean roof warranties are especially valuable — verify every time',
          ].map((tip, i) => (
            <div key={i} style={{ padding: '10px 0', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.07)' : 'none', fontSize: 14, color: '#cbd5e1', lineHeight: 1.5 }}>{tip}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
