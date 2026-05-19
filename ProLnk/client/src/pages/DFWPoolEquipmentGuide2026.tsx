import { useState } from 'react';

export default function DFWPoolEquipmentGuide2026() {
  const [poolSize, setPoolSize] = useState('');
  const [hasVSP, setHasVSP] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [hasHeater, setHasHeater] = useState(false);
  const [showRecs, setShowRecs] = useState(false);

  const getUpgrades = () => {
    const upgrades: { priority: string; item: string; cost: string; note: string }[] = [];

    if (!hasVSP) upgrades.push({ priority: '🔴 HIGH', item: 'Variable Speed Pump', cost: '–,400 installed', note: 'Cuts electricity 60–70% in DFW. Avg payback 18 months.' });
    if (filterType === 'sand') upgrades.push({ priority: '🟡 MEDIUM', item: 'Upgrade to Cartridge Filter', cost: '– installed', note: 'Better filtration, no backwash waste — saves water in DFW drought conditions.' });
    if (!hasHeater) upgrades.push({ priority: '🟡 MEDIUM', item: 'Heat Pump Heater', cost: ',000–,500 installed', note: 'DFW climate ideal for heat pumps. Extends swim season Oct–Apr.' });
    upgrades.push({ priority: '🟢 NICE', item: 'Pool Automation System', cost: ',200–,500 installed', note: 'Control pump, lights, heater from phone. Hayward OmniLogic popular in DFW.' });
    upgrades.push({ priority: '🟢 NICE', item: 'Robotic Cleaner', cost: '–,200', note: 'Reduces pump run time. Dolphin and Polaris popular for DFW plaster pools.' });
    if (poolSize === 'large') upgrades.push({ priority: '🟡 MEDIUM', item: 'Second Skimmer Addition', cost: '–,500', note: 'Large pools in DFW benefit from extra skimming during spring/fall leaf season.' });

    return upgrades;
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>⚙️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Pool Equipment Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Variable speed pumps save DFW pool owners –,000/year on electricity</p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 18 }}>💡 Equipment Overview</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              ['🔄 Variable Speed Pump','#1e3a5f','Biggest ROI upgrade available. DFW homes running old single-speed pumps waste ~/yr.'],
              ['🏺 Sand Filter','#1e3a5f','Lowest cost, requires backwashing. Wastes 200+ gal/backwash — costly in DFW droughts.'],
              ['🧻 Cartridge Filter','#1e3a5f','No backwash, better filtration. Best choice for most DFW residential pools.'],
              ['🌀 DE Filter','#1e3a5f','Finest filtration, highest clarity. Best for show pools, higher maintenance.'],
              ['🔥 Gas Heater','#1e3a5f','Fast heat (1–2 hrs). Best for occasional use or cold snaps. Higher operating cost.'],
              ['♨️ Heat Pump','#1e3a5f','Slow but cheap (3–5x efficient vs gas). DFW climate ideal — works well above 45°F.'],
            ].map(([label, bg, note]) => (
              <div key={label as string} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{label as string}</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{note as string}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 18 }}>🔍 Get Your Upgrade Priorities</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Pool Size</label>
              <select value={poolSize} onChange={e => setPoolSize(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #F5E642', borderRadius: 6, padding: '8px 12px' }}>
                <option value=''>Select size</option>
                <option value='small'>Small (~10k gal)</option>
                <option value='medium'>Medium (~20k gal)</option>
                <option value='large'>Large (~35k+ gal)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Current Filter Type</label>
              <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #F5E642', borderRadius: 6, padding: '8px 12px' }}>
                <option value=''>Select filter</option>
                <option value='sand'>Sand Filter</option>
                <option value='cartridge'>Cartridge Filter</option>
                <option value='de'>DE Filter</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 24, marginBottom: 16 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type='checkbox' checked={hasVSP} onChange={e => setHasVSP(e.target.checked)} />
              <span style={{ color: '#e2e8f0', fontSize: 14 }}>Already have variable speed pump</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type='checkbox' checked={hasHeater} onChange={e => setHasHeater(e.target.checked)} />
              <span style={{ color: '#e2e8f0', fontSize: 14 }}>Already have heater</span>
            </label>
          </div>
          <button onClick={() => setShowRecs(true)} disabled={!poolSize || !filterType} style={{ background: poolSize && filterType ? '#F5E642' : '#334155', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: poolSize && filterType ? 'pointer' : 'not-allowed' }}>
            Show My Upgrade Plan →
          </button>
        </div>

        {showRecs && (
          <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 18 }}>📋 Prioritized Upgrades</h2>
            {getUpgrades().map((u, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 12, marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontWeight: 700 }}>{u.priority} — {u.item}</span>
                  <span style={{ color: '#F5E642', fontWeight: 700 }}>{u.cost}</span>
                </div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{u.note}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', color: '#475569', fontSize: 13, marginTop: 24 }}>
          ProLnk connects DFW homeowners with licensed pool pros • prolnk.io
        </div>
      </div>
    </div>
  );
}
