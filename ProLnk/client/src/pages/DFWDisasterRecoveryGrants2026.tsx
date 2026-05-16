import { useState } from 'react';

export default function DFWDisasterRecoveryGrants2026() {
  const [disasterType, setDisasterType] = useState('');
  const [result, setResult] = useState('');

  const programs: Record<string, string[]> = {
    hail: [
      '🌩️ FEMA Individual Assistance: After a federal disaster declaration, FEMA may provide grants (typically up to $43,900) for home repairs not covered by insurance. Register at DisasterAssistance.gov or call 1-800-621-FEMA.',
      '🏦 SBA Disaster Home Loan: Low-interest loans (1.5–4%) up to $500,000 for homeowners to repair/replace disaster-damaged property. Apply at SBA.gov/disaster — available even if you don't have a business.',
      '🏛️ Texas GLO CDBG-DR: After major Texas hail events, the Texas General Land Office may open CDBG Disaster Recovery applications. Monitor glo.texas.gov/recovery for open rounds.',
    ],
    tornado: [
      '🌪️ FEMA Individual Assistance: Register immediately at DisasterAssistance.gov after a tornado. FEMA grants cover temporary housing, repairs, and personal property — up to $43,900 for residential losses.',
      '🏦 SBA Low-Interest Disaster Loan: Homeowners can borrow up to $500,000 at 1.5–4% interest for structural repairs. Apply within 60 days of the disaster declaration at SBA.gov/disaster.',
      '🤝 Rebuilding Together Dallas/Fort Worth: Provides free emergency repairs after disasters for low-income households. Dallas: (214) 823-6800 | Fort Worth: (817) 923-8080.',
    ],
    flood: [
      '🌊 FEMA Individual Assistance: Register at DisasterAssistance.gov. Flood-damaged homes may receive grants for structural repairs, essential utilities, and displaced living costs.',
      '🏦 SBA Disaster Home Loan: Up to $500,000 at 1.5–4% for flood repairs. The SBA also offers up to $100,000 for personal property losses. Apply at SBA.gov/disaster.',
      '🏛️ Texas GLO CDBG-DR Flood Programs: Texas GLO has distributed billions in CDBG-DR funds after major floods (Harvey, Imelda). Monitor glo.texas.gov/recovery for new programs following federal disaster declarations.',
      '💧 NFIP / Flood Insurance: If you have National Flood Insurance Program coverage, file a claim immediately. Your adjuster will assess structural damage separately from contents.',
    ],
    fire: [
      '🔥 FEMA Individual Assistance: Wildfire or structure fire after a federal declaration — register at DisasterAssistance.gov for grants toward temporary housing and home repair.',
      '🏦 SBA Disaster Loan: 1.5–4% interest loans up to $500,000 for post-fire structural repairs. Available to uninsured or underinsured homeowners.',
      '🤝 Red Cross Emergency Assistance: American Red Cross provides immediate emergency funds for displaced families. Call 1-800-RED-CROSS or visit a local disaster relief center.',
    ],
  };

  const checkPrograms = () => {
    if (!disasterType) { setResult('⚠️ Please select your disaster type.'); return; }
    const list = programs[disasterType] || ['📍 Contact FEMA at 1-800-621-FEMA and your local emergency management office for disaster-specific assistance programs.'];
    setResult(list.join('

'));
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🚨</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Disaster Recovery Grants 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>FEMA, SBA, and Texas GLO programs after hail, tornado, flood, or fire</p>
        </div>

        {[{icon:'📋',title:'Step 1: Document Everything',body:'Before applying for any assistance, photograph all damage thoroughly. Keep all receipts for emergency repairs. Do not make permanent repairs until an inspector or adjuster has assessed the damage. This documentation is critical for all programs.'},{icon:'🏛️',title:'FEMA Individual Assistance',body:'After a presidential disaster declaration, FEMA Individual Assistance opens. Grants (not loans) up to $43,900 for qualifying homeowners. Register within 60 days of the declaration at DisasterAssistance.gov or call 1-800-621-FEMA (3362).'},{icon:'🏦',title:'SBA Disaster Loans (Not Just for Businesses)',body:'The SBA offers low-interest disaster loans to homeowners — 1.5% for those without credit elsewhere, up to 4% otherwise. Up to $500,000 for structural damage, $100,000 for personal property. Apply at SBA.gov/disaster within 60 days.'}].map((card, i) => (
          <div key={i} style={{ background: '#1e2d45', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <div style={{ fontSize: 24 }}>{card.icon}</div>
            <h2 style={{ color: '#F5E642', fontSize: 18, margin: '8px 0 6px' }}>{card.title}</h2>
            <p style={{ color: '#cbd5e1', margin: 0, lineHeight: 1.6 }}>{card.body}</p>
          </div>
        ))}

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, margin: '0 0 16px' }}>🔍 Find Programs by Disaster Type</h2>
          <select value={disasterType} onChange={e => setDisasterType(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #334155', background: '#0A1628', color: disasterType ? '#fff' : '#64748b', fontSize: 14, marginBottom: 12 }}>
            <option value="">Select Disaster Type</option>
            <option value="hail">Hail / Wind Damage</option>
            <option value="tornado">Tornado</option>
            <option value="flood">Flood / Flash Flood</option>
            <option value="fire">Fire (Wildfire or Structure)</option>
          </select>
          <button onClick={checkPrograms}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Show Assistance Programs
          </button>
          {result && <div style={{ marginTop: 16 }}>{result.split('

').map((r, i) => (
            <p key={i} style={{ padding: 14, background: '#0A1628', borderRadius: 8, color: '#cbd5e1', lineHeight: 1.6, marginBottom: 8 }}>{r}</p>
          ))}</div>}
        </div>
      </div>
    </div>
  );
}
