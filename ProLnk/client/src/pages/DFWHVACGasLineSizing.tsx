import { useState } from 'react';

type Appliance = { name: string; btu: number; selected: boolean };

const furnaceSizes = [
  { label: '60,000 BTU furnace', btu: 60000 },
  { label: '80,000 BTU furnace', btu: 80000 },
  { label: '100,000 BTU furnace', btu: 100000 },
  { label: '120,000 BTU furnace', btu: 120000 },
];

const defaultAppliances: Appliance[] = [
  { name: 'Gas range / cooktop', btu: 65000, selected: false },
  { name: 'Gas water heater (40 gal)', btu: 36000, selected: false },
  { name: 'Gas water heater (50 gal)', btu: 40000, selected: false },
  { name: 'Outdoor gas grill', btu: 60000, selected: false },
  { name: 'Gas fireplace', btu: 30000, selected: false },
  { name: 'Gas dryer', btu: 20000, selected: false },
];

function getLineSize(totalBtu: number): { size: string; adequate: boolean; note: string; upgradeCost: string } {
  if (totalBtu <= 80000) return { size: '1/2" pipe', adequate: true, note: 'Standard for most DFW homes', upgradeCost: 'N/A' };
  if (totalBtu <= 150000) return { size: '3/4" pipe', adequate: true, note: 'Common in DFW new construction', upgradeCost: 'N/A' };
  if (totalBtu <= 300000) return { size: '1" pipe', adequate: true, note: 'Required for high-demand DFW homes', upgradeCost: '$800–$2,000' };
  return { size: '1-1/4" or larger', adequate: false, note: 'Upgrade likely needed — exceeds most DFW residential lines', upgradeCost: '$1,500–$4,000' };
}

export default function DFWHVACGasLineSizing() {
  const [furnaceIdx, setFurnaceIdx] = useState<number | null>(null);
  const [appliances, setAppliances] = useState<Appliance[]>(defaultAppliances);

  const toggleAppliance = (i: number) => {
    setAppliances(prev => prev.map((a, idx) => idx === i ? { ...a, selected: !a.selected } : a));
  };

  const furnaceBtu = furnaceIdx !== null ? furnaceSizes[furnaceIdx].btu : 0;
  const applianceBtu = appliances.filter(a => a.selected).reduce((sum, a) => sum + a.btu, 0);
  const totalBtu = furnaceBtu + applianceBtu;
  const result = totalBtu > 0 ? getLineSize(totalBtu) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 12 }}>
          <span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide</span>
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF', marginBottom: 12, lineHeight: 1.2 }}>
          🔥 Natural Gas Line Sizing for DFW HVAC
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 40, lineHeight: 1.7 }}>
          Atmos Energy serves most of DFW. Upgrading to a larger furnace? Your existing gas line may not keep up — especially if you're running a range, water heater, and outdoor grill at the same time.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🧮 Gas Demand Calculator</h2>

          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#FFFFFF', fontWeight: 700, marginBottom: 10 }}>Step 1: Select your new DFW furnace size</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              {furnaceSizes.map((f, i) => (
                <button
                  key={i}
                  onClick={() => setFurnaceIdx(furnaceIdx === i ? null : i)}
                  style={{
                    background: furnaceIdx === i ? '#F5E642' : '#0A1628',
                    border: '2px solid ' + (furnaceIdx === i ? '#F5E642' : '#1E3A5F'),
                    borderRadius: 8,
                    padding: '12px 16px',
                    color: furnaceIdx === i ? '#0A1628' : '#E8EDF5',
                    fontWeight: furnaceIdx === i ? 800 : 400,
                    cursor: 'pointer',
                    fontSize: 14,
                    textAlign: 'left',
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#FFFFFF', fontWeight: 700, marginBottom: 10 }}>Step 2: Select other DFW gas appliances in your home</div>
            <div style={{ display: 'grid', gap: 8 }}>
              {appliances.map((a, i) => (
                <button
                  key={i}
                  onClick={() => toggleAppliance(i)}
                  style={{
                    background: a.selected ? '#1A3A6B' : '#0A1628',
                    border: '2px solid ' + (a.selected ? '#F5E642' : '#1E3A5F'),
                    borderRadius: 8,
                    padding: '10px 16px',
                    color: '#E8EDF5',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: 14,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{a.name}</span>
                  <span style={{ color: '#94A3B8' }}>{(a.btu / 1000).toFixed(0)}k BTU</span>
                </button>
              ))}
            </div>
          </div>

          {result && (
            <div style={{ background: result.adequate ? '#0A2E1A' : '#7F1D1D', borderRadius: 12, padding: '20px 24px' }}>
              <div style={{ color: result.adequate ? '#86EFAC' : '#FCA5A5', fontWeight: 800, fontSize: 16, marginBottom: 8 }}>
                Total Demand: {(totalBtu / 1000).toFixed(0)}k BTU/hr → Required: {result.size}
              </div>
              <div style={{ color: result.adequate ? '#86EFAC' : '#FCA5A5', fontSize: 14, marginBottom: 8 }}>{result.note}</div>
              {result.upgradeCost !== 'N/A' && (
                <div style={{ color: '#F5E642', fontSize: 14 }}>Upgrade cost estimate: {result.upgradeCost}</div>
              )}
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 16, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🔥</div>
          <h3 style={{ color: '#0A1628', fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Get a Gas Line Assessment</h3>
          <p style={{ color: '#0A1628', fontSize: 15, marginBottom: 0 }}>ProLnk connects you with licensed DFW plumbers and HVAC contractors who can assess and upgrade your gas line alongside your furnace install.</p>
        </div>
      </div>
    </div>
  );
}
