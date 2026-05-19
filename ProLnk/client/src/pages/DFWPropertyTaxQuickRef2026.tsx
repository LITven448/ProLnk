import { useState } from 'react';

const counties = [
  {
    name: 'Dallas County',
    icon: '🏙️',
    dates: [
      { date: 'Jan 31', action: 'Property tax payment deadline (avoid 7% penalty)' },
      { date: 'Apr 30', action: 'Homestead exemption filing deadline (new homeowners)' },
      { date: 'May 15', action: 'Protest deadline — or 30 days after notice, whichever is later' },
      { date: 'Oct 1', action: 'New tax year values take effect' },
    ],
    exemptions: ['Homestead: Up to 20% of appraised value', 'Over 65: Additional ,000 exemption', 'Disabled: ,000 exemption', 'Veterans: Up to 100% exemption (service-connected disability)'],
    portal: 'dallascad.org',
  },
  {
    name: 'Tarrant County',
    icon: '🤠',
    dates: [
      { date: 'Jan 31', action: 'Tax payment due — pay online at txappraisal.org' },
      { date: 'Apr 30', action: 'Homestead exemption deadline for new buyers' },
      { date: 'May 15', action: 'Standard protest deadline' },
      { date: 'Sep 30', action: 'Delinquent penalty escalation if unpaid' },
    ],
    exemptions: ['Homestead: 20% off appraised value minimum', 'Fort Worth Homestead: Additional ,000 city exemption', 'Over 65: ,000 + tax freeze option', 'Veterans 100% disabled: Full exemption'],
    portal: 'tad.org',
  },
  {
    name: 'Collin County',
    icon: '🏘️',
    dates: [
      { date: 'Jan 31', action: 'Tax bills due — Collin CAD sends notices in April' },
      { date: 'Apr 30', action: 'File homestead exemption (same-year purchase required)' },
      { date: 'May 15', action: 'Protest deadline — very active protest market in Collin' },
      { date: 'Dec 31', action: 'Last day to apply for most exemptions for current year' },
    ],
    exemptions: ['Homestead: 20% reduction on assessed value', 'Plano/Frisco/McKinney: City-specific additional exemptions', 'Over 65: School tax freeze + K exemption', 'Ag exemption available for 5+ acres'],
    portal: 'collincad.org',
  },
  {
    name: 'Denton County',
    icon: '🌳',
    dates: [
      { date: 'Jan 31', action: 'Property tax payment — discount available if paid by Dec 31′ },
      { date: 'Apr 30', action: 'Homestead exemption filing deadline' },
      { date: 'May 15', action: 'Protest deadline — Denton CAD values rising fast' },
      { date: 'Oct 1', action: 'New appraisal year begins' },
    ],
    exemptions: ['Homestead: 20% off + ,000 school district reduction (2023 law)', 'Over 65: School tax freeze', 'New construction: Potential 5-yr partial exemption in some cities', 'Veterans: 100% exemption if total disability'],
    portal: 'dentoncad.com',
  },
];

export default function DFWPropertyTaxQuickRef2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '40px', marginBottom: '8px' }}>🏛️</div>
          <h1 style={{ color: '#F5E642', fontSize: '24px', fontWeight: '700', margin: '0 0 8px' }}>DFW Property Tax Quick Reference 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>Select your county for key dates, exemptions, and actions</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
          {counties.map((c, i) => (
            <button key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ backgroundColor: selected === i ? '#1a2f4a' : '#0f2035', border: selected === i ? '2px solid #F5E642′ : '2px solid #1e3a5f', borderRadius: '12px', padding: '20px', cursor: ’pointer', textAlign: 'left' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: '700', fontSize: '15px' }}>{c.name}</div>
              <div style={{ color: '#475569', fontSize: '11px', marginTop: '4px' }}>{c.portal}</div>
            </button>
          ))}
        </div>
        {selected !== null && (
          <div style={{ backgroundColor: '#0f2035', border: '2px solid #F5E642', borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <span style={{ fontSize: '28px' }}>{counties[selected].icon}</span>
              <h2 style={{ color: '#F5E642', fontSize: '18px', margin: 0 }}>{counties[selected].name}</h2>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ color: '#F5E642', fontSize: '12px', fontWeight: '700', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Key Dates</div>
              {counties[selected].dates.map((d, j) => (
                <div key={j} style={{ display: 'flex', gap: '12px', marginBottom: '8px', padding: '10px', backgroundColor: '#0A1628', borderRadius: '8px' }}>
                  <span style={{ color: '#F5E642', fontWeight: '700', fontSize: '13px', minWidth: '50px', flexShrink: 0 }}>{d.date}</span>
                  <span style={{ color: '#cbd5e1', fontSize: '13px' }}>{d.action}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ color: '#F5E642', fontSize: '12px', fontWeight: '700', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Available Exemptions</div>
              {counties[selected].exemptions.map((e, j) => (
                <div key={j} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ color: '#F5E642', fontSize: '14px' }}>→</span>
                  <span style={{ color: '#94a3b8', fontSize: '13px' }}>{e}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: '24px', color: '#475569', fontSize: '12px' }}>
          Improve your home value strategically — find trusted pros at prolnk.io
        </div>
      </div>
    </div>
  );
}