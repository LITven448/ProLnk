import { useState } from 'react';

const dealers = [
  { name: 'Johnstone Supply', icon: '🏭', type: 'Contractor Distributor', note: 'Largest HVAC parts distributor in DFW — pros buy equipment and parts here' },
  { name: 'Waxman Supply', icon: '🔧', type: 'DFW Distributor', note: 'Strong DFW presence, Trane and Carrier dealer, fast delivery for contractors' },
  { name: 'Lennox', icon: '❄️', type: 'DFW Manufacturer', note: 'Headquartered in Richardson TX — DFW pros have direct factory access' },
  { name: 'Trane', icon: '💨', type: 'Premium Brand', note: 'It’s Hard to Stop a Trane — high end, dealer-only installation in DFW' },
  { name: 'Carrier', icon: '🌡️', type: 'Premium Brand', note: 'SEER2 leader, strong DFW dealer network, best for new construction' },
];

const prefGuide: Record<string, { guide: string; reason: string }> = {
  'Brand Doesn’t Matter': { guide: 'Lennox or Carrier', reason: 'Installer quality drives 80% of HVAC performance — ProLnk vets the tech, not the logo' },
  'Lennox Fan': { guide: 'Waxman Supply dealers', reason: 'DFW Lennox dealers — factory HQ in Richardson means fast parts + warranty support' },
  'Trane Preferred': { guide: 'Trane ComfortSite dealers', reason: 'Trane dealer locator → DFW certified installers with factory training' },
  'Carrier Preferred': { guide: 'Carrier Factory Authorized dealers', reason: 'FAD program = vetted DFW contractors with Carrier-backed warranty' },
  'Best Value': { guide: 'Goodman via Johnstone', reason: 'Goodman (owned by Daikin) — solid mid-tier, wide parts availability across DFW' },
};

export default function DFWHVACLocalBrandsGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [pref, setPref] = useState<string>('Brand Doesn’t Matter');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>DFW HVAC Local Brands Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>DFW HVAC dealers, distributors, and how equipment actually gets to your home</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🔑 The DFW HVAC Truth</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6 }}>
            HVAC brands are largely dealer-locked — you cannot buy Trane or Carrier at a box store. Equipment flows: Manufacturer → Distributor (Johnstone, Waxman) → Certified Dealer → Your Home. The installer quality and system sizing matter far more than the brand logo. A Lennox installed by a top DFW tech outperforms a Trane installed by an uncertified crew.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 12, marginBottom: 28 }}>
          {dealers.map(d => (
            <div key={d.name} onClick={() => setSelected(selected === d.name ? null : d.name)}
              style={{ background: selected === d.name ? '#1e3a5f' : '#112240', border: `1px solid ${selected === d.name ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: 16, cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 28 }}>{d.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: '#f1f5f9', fontSize: 16 }}>{d.name}</div>
                    <div style={{ color: '#64748b', fontSize: 12 }}>{d.type}</div>
                  </div>
                </div>
              </div>
              {selected === d.name && <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 10, borderTop: '1px solid #1e3a5f', paddingTop: 10 }}>{d.note}</p>}
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 14 }}>🔍 Brand Preference → DFW Dealer Guide</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {Object.keys(prefGuide).map(p => (
              <button key={p} onClick={() => setPref(p)}
                style={{ background: pref === p ? '#F5E642' : '#0A1628', color: pref === p ? '#0A1628' : '#94a3b8', border: '1px solid #1e3a5f', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
                {p}
              </button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
            <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>✅ {prefGuide[pref].guide}</div>
            <div style={{ color: '#cbd5e1', fontSize: 14, marginTop: 6 }}>{prefGuide[pref].reason}</div>
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 12, marginTop: 28 }}>ProLnk Charter HVAC pros are quality-vetted — we match on skill, not brand preference.</p>
      </div>
    </div>
  );
}
