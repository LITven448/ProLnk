import { useState } from 'react';

const YEAR_DATA: Record<number, { warranty: string; foundation: string; hvac: string; hoa: string; prolnk: string }> = {
  1: { warranty: '✅ Builder warranty active (1-yr comprehensive)', foundation: '🟡 Active settling — normal for DFW clay', hvac: '✅ New system — change filters every 30 days', hoa: '🔴 HOA at peak enforcement — know your CC&Rs', prolnk: '📋 Document everything from day one in ProLnk Vault' },
  2: { warranty: '✅ 2-yr systems warranty still active (HVAC, plumbing, electrical)', foundation: '🟡 Most active settling window — photograph corners', hvac: '✅ Optimal — register warranty if not done', hoa: '🔴 HOA landscaping compliance deadlines active', prolnk: '📋 Add all appliance serial numbers to Vault now' },
  3: { warranty: '🟡 1-yr general warranty expired; check 10-yr structural', foundation: '🟠 Second settling cycle — measure door frames', hvac: '✅ 3 yrs — schedule first professional tune-up', hoa: '🟡 HOA enforcement stabilizing — review any fines', prolnk: '📋 Upload builder warranty documents before expiry' },
  4: { warranty: '🟡 Structural warranty active (check for 10-yr coverage)', foundation: '🟠 Clay soil expansion/contraction pattern established', hvac: '✅ 4 yrs — check refrigerant charge', hoa: '🟢 HOA routine — confirm dues auto-pay setup', prolnk: '📋 Log any builder punch-list items resolved' },
  5: { warranty: '🟠 Confirm 10-yr structural warranty terms', foundation: '🔴 5-yr inspection recommended — most DFW builders required', hvac: '✅ 5 yrs — mid-life tune-up, clean coils', hoa: '🟢 HOA stable — review reserve fund health', prolnk: '📋 5-yr baseline photos: foundation, roof, HVAC' },
  6: { warranty: '🟠 Most builder warranties ending — get independent inspection', foundation: '🟡 Monitor: sticking doors or drywall cracks are signals', hvac: '✅ 6 yrs — peak efficiency period', hoa: '🟢 HOA projects: watch for special assessments', prolnk: '📋 Scan all warranty cards and add to Vault' },
};

export default function DFWHomes2020sGuide2026() {
  const [years, setYears] = useState<number>(0);
  const result = years >= 1 && years <= 6 ? YEAR_DATA[years] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>PROLNK HOME GUIDE · DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>🏡 DFW 2020s Homes<br />New Owner Guide 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 32 }}>Newest DFW builds — active warranties, foundation actively settling, HOA at peak enforcement. ProLnk is your ideal partner for documenting everything from day one.</p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6, color: '#F5E642' }}>📅 How Many Years Since Purchase?</h2>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 20 }}>Select years owned (1–6) to see your 2020s new home guide.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {[1, 2, 3, 4, 5, 6].map(n => (
              <button key={n} onClick={() => setYears(n)}
                style={{ padding: '12px 20px', borderRadius: 8, border: `2px solid ${years === n ? '#F5E642' : '#1e3a5f'}`, background: years === n ? '#F5E642' : '#0A1628', color: years === n ? '#0A1628' : '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
                {n} yr{n > 1 ? 's' : ''}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
            {[
              ['📜 Warranty Status', result.warranty],
              ['🏗️ Foundation Watch', result.foundation],
              ['❄️ HVAC Status', result.hvac],
              ['🏘️ HOA Watch', result.hoa],
              ['🔐 ProLnk Action', result.prolnk],
            ].map(([label, val]) => (
              <div key={label as string} style={{ background: '#0f2040', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>{label}</div>
                <div style={{ fontSize: 15, color: '#e2e8f0', lineHeight: 1.6 }}>{val}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>⚡ 2020s DFW Build Standards</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['Insulation', 'R-49 attic (2021 IECC)'], ['Plumbing', 'PEX-A manifold system'], ['Electrical', '200A+ arc-fault protected'], ['HVAC', '15 SEER2 minimum (2023)'], ['Foundation', 'Post-tension on engineered fill'], ['Smart Home', 'Z-Wave + WiFi pre-wired']].map(([label, val]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}