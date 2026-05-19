import { useState } from 'react';

const cities: Record<string, { required: boolean; cost: string; who: string; inspection: string; note: string }> = {
  Dallas: { required: true, cost: '$150-250', who: 'Contractor pulls permit', inspection: 'Required after install', note: 'Dallas requires permit for full tear-off and replacement' },
  'Fort Worth': { required: true, cost: '$200-300', who: 'Contractor responsibility', inspection: 'Required — schedule with FW inspections', note: 'Fort Worth Code Compliance enforces roofing permits strictly' },
  Plano: { required: true, cost: '$150-200', who: 'Licensed contractor required', inspection: 'Final inspection mandatory', note: 'Plano also requires photo documentation of decking condition' },
  Frisco: { required: true, cost: '$175-275', who: 'Contractor pulls permit online', inspection: 'Required within 5 days of completion', note: 'Frisco has online permit portal — verify your contractor uses it' },
  McKinney: { required: true, cost: '$125-200', who: 'Contractor or homeowner', inspection: 'Inspection required before closing', note: 'McKinney allows homeowner-pulled permits but most contractors handle it' },
  Arlington: { required: true, cost: '$200-350', who: 'Licensed contractor only', inspection: 'Required — passed inspection on file forever', note: 'Arlington requires permit for any replacement over 50% of roof area' },
  Garland: { required: true, cost: '$150-225', who: 'Contractor pulls permit', inspection: 'Final inspection required', note: 'Garland has quick turnaround — permits often same-day' },
  Irving: { required: true, cost: '$175-250', who: 'Contractor licensed in Irving', inspection: 'Required after completion', note: 'Irving requires contractor to be city-registered, not just state-licensed' },
};

export default function DFWRoofPermitInspection2026() {
  const [city, setCity] = useState('Dallas');
  const info = cities[city];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>
            DFW Roof Permit & Inspection Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Select your DFW city to see permit requirements for roof replacement</p>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
          {Object.keys(cities).map(c => (
            <button key={c} onClick={() => setCity(c)}
              style={{ padding: '9px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13,
                background: city === c ? '#F5E642′ : '#1e2d45', color: city === c ? '#0A1628' : '#94a3b8' }}>
              {c}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: '18px 20px', borderLeft: `4px solid ${info.required ? '#F5E642' : '#22c55e'}` }}>
            <div style={{ color: info.required ? '#F5E642′ : '#22c55e', fontWeight: 800, fontSize: 18 }}>
              {info.required ? '✅ Permit Required' : '⚪ No Permit Required'}
            </div>
            <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 6 }}>{info.note}</div>
          </div>
          {[
            { label: '💰 Typical Cost', value: info.cost },
            { label: '👷 Who Pulls Permit', value: info.who },
            { label: '🔍 Inspection', value: info.inspection },
          ].map((row, i) => (
            <div key={i} style={{ background: '#1e2d45', borderRadius: 12, padding: '16px 20px' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{row.label}</div>
              <div style={{ color: '#e2e8f0', fontSize: 15 }}>{row.value}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28, background: '#1e2d45', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginBottom: 10 }}>⚠️ 3 Rules for Every DFW Roof Job</div>
          {['Ask your contractor for permit number before work starts — if they refuse, red flag.',
            'Take photos of decking condition before shingles go on — required in some cities.',
            'Save passed inspection certificate in ProLnk Vault — it permanently raises home value.']
            .map((r, i) => (
              <div key={i} style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8, paddingLeft: 16, borderLeft: '2px solid #F5E642′ }}>{r}</div>
            ))}
        </div>
      </div>
    </div>
  );
}
