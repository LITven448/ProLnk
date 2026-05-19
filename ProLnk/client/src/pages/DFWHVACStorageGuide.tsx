import { useState } from 'react';

type HomeType = 'small' | 'medium' | 'large';
type Budget = 'basic' | 'standard' | 'complete';

const kits: Record<HomeType, Record<Budget, { items: string[]; note: string }>> = {
  small: {
    basic: { items: ['4 replacement filters (1" MERV 8)', 'Condensate pan tablets (3-month supply)', 'Flashlight for inspections', 'Soft-bristle brush for coil dusting'], note: 'Under $60 — covers the essentials for a 1,000–1,500 sq ft DFW home.' },
    standard: { items: ['4 replacement filters (1" MERV 11)', 'Condensate tablets + drain line brush', 'Wet/dry mini vacuum for drain clearing', 'Basic multimeter for capacitor checks', 'Extra thermostat batteries'], note: 'Under $120 — handles most minor issues yourself before calling a pro.' },
    complete: { items: ['8 replacement filters (full year supply)', 'Condensate treatment kit with float switch', 'Wet/dry vac + coil cleaner spray', 'Multimeter + non-contact voltage tester', 'Duct tape (foil-backed HVAC grade)', 'Insulation wrap for exposed line sets'], note: 'Under $220 — full DIY kit for a capable DFW homeowner.' },
  },
  medium: {
    basic: { items: ['6 replacement filters (matching your size)', 'Condensate tablets (6-month supply)', 'Drain line flush kit', 'Spare thermostat batteries'], note: 'Under $80 — handles a 1,500–2,500 sq ft home with 1–2 systems.' },
    standard: { items: ['12 filters (two sizes if dual-zone)', 'Condensate treatment + wet/dry vac', 'Coil cleaner (no-rinse type)', 'Multimeter for voltage/capacitor checks', 'Spare float switch (plug-in type)', 'HVAC tape and mastic sealant'], note: 'Under $180 — ready for two-system homes common in DFW.' },
    complete: { items: ['Full-year filter supply (all systems)', 'Condensate kit + safety float switches', 'Wet/dry vac with drain attachment', 'Multimeter + clamp meter', 'Coil cleaner + fin comb', 'Mastic sealant + foil tape', 'Spare contactor (know your model)', 'Capacitor matched to your unit specs'], note: 'Under $350 — serious kit for hands-on DFW homeowners.' },
  },
  large: {
    basic: { items: ['8+ filters for all return vents', 'Condensate tablets for all units', 'Drain flush kit', 'Thermostat batteries for all zones'], note: 'Under $120 — minimum for a large DFW home with multiple systems.' },
    standard: { items: ['Year supply of filters all sizes', 'Float switches for each air handler', 'Coil cleaner (no-rinse)', 'Wet/dry vac with HVAC attachments', 'Multimeter', 'Mastic sealant + foil tape rolls', 'Fin comb set'], note: 'Under $280 — covers 3,000+ sq ft with 2–3 HVAC systems.' },
    complete: { items: ['2-year filter supply stored properly', 'Full float switch kit all units', 'Professional coil cleaner + sprayer', 'Clamp meter + multimeter', 'Spare capacitors (matched per unit)', 'Spare contactors (matched per unit)', 'Mastic + foil tape + insulation wrap', 'Drain line camera (optional — worth it at scale)', 'Smart thermostat batteries + backup units'], note: 'Under $600 — investment that pays off on a large DFW estate.' },
  },
};

export default function DFWHVACStorageGuide() {
  const [homeType, setHomeType] = useState<HomeType | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);

  const result = homeType && budget ? kits[homeType][budget] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase' }}>DFW HVAC Guide</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🗃️ HVAC Storage & Spare Parts Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW's extreme heat means HVAC failures hit hardest when parts are unavailable. Keep the right spares on hand and avoid weekend emergency rates.
        </p>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 10 }}>Your DFW home size:</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {([['small', 'Small (under 1,500 sq ft)'], ['medium', 'Medium (1,500–3,000 sq ft)'], ['large', 'Large (3,000+ sq ft)']] as [HomeType, string][]).map(([v, l]) => (
              <button key={v} onClick={() => setHomeType(v)} style={{ padding: '8px 16px', borderRadius: 8, border: `2px solid ${homeType === v ? '#F5E642' : '#1e3a5f'}`, background: homeType === v ? '#F5E642' : 'transparent', color: homeType === v ? '#0A1628' : '#fff', cursor: 'pointer', fontWeight: 600 }}>{l}</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 10 }}>Spare parts budget:</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {([['basic', '💰 Basic'], ['standard', '💰💰 Standard'], ['complete', '💰💰💰 Complete']] as [Budget, string][]).map(([v, l]) => (
              <button key={v} onClick={() => setBudget(v)} style={{ padding: '8px 16px', borderRadius: 8, border: `2px solid ${budget === v ? '#F5E642' : '#1e3a5f'}`, background: budget === v ? '#F5E642' : 'transparent', color: budget === v ? '#0A1628' : '#fff', cursor: 'pointer', fontWeight: 600 }}>{l}</button>
            ))}
          </div>
        </div>

        {result ? (
          <div style={{ background: '#0f2236', borderRadius: 12, padding: 24 }}>
            <h2 style={{ color: '#F5E642', marginBottom: 16, fontSize: 18 }}>📦 Your Recommended Kit</h2>
            {result.items.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, color: '#cbd5e1' }}>
                <span style={{ color: '#F5E642', flexShrink: 0 }}>✓</span>
                <span>{item}</span>
              </div>
            ))}
            <div style={{ marginTop: 16, padding: 12, background: '#0A1628', borderRadius: 8, color: '#94a3b8', fontSize: 14 }}>{result.note}</div>
          </div>
        ) : (
          <div style={{ background: '#0f2236', borderRadius: 12, padding: 32, textAlign: 'center', color: '#94a3b8' }}>Select your home size and budget to see your kit</div>
        )}

        <div style={{ marginTop: 32, background: '#F5E642', borderRadius: 12, padding: 20, color: '#0A1628', fontWeight: 600, textAlign: 'center' }}>
          🔧 Need a DFW HVAC pro to help you prep? ProLnk connects you fast.
        </div>
      </div>
    </div>
  );
}
