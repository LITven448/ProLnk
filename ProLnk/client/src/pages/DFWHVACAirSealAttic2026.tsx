import { useState } from 'react';

export default function DFWHVACAirSealAttic2026() {
  const [atticType, setAtticType] = useState('');
  const [result, setResult] = useState('');

  const atticTypes = [
    { value: 'blown-insulation', label: 'Blown-in Insulation Only' },
    { value: 'batts', label: 'Fiberglass Batts' },
    { value: 'spray-foam', label: 'Spray Foam (Encapsulated)' },
    { value: 'no-insulation', label: 'Little or No Insulation' },
  ];

  const priorities: Record<string, string> = {
    'blown-insulation': 'HIGH PRIORITY: Blown-in insulation hides air gaps. Pull back insulation at top plates, seal wiring penetrations with foam, caulk recessed light housings, then re-cover. Attic hatch needs weatherstripping + rigid foam lid.',
    'batts': 'MODERATE: Batts don’t conform to gaps. Seal top plates and wiring holes first with canned foam, then re-lay batts. Check whole-house fan opening — often completely unsealed.',
    'spray-foam': 'LOW (Encapsulated): If fully encapsulated, air sealing is built-in. Inspect penetrations at HVAC boots and electrical boxes. Verify foam meets roofline completely with no gaps.',
    'no-insulation': 'CRITICAL: No insulation = no protection. Full air seal required before adding insulation. Every top plate, joist bay, wiring hole, recessed light, and attic hatch must be sealed first — skipping this wastes insulation investment.',
  };

  const handleCheck = () => {
    if (!atticType) return;
    setResult(priorities[atticType]);
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#F5E642', fontWeight: 700, fontSize: '13px', letterSpacing: '1px' }}>DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '12px', lineHeight: 1.2 }}>
          🌡️ Attic Air Sealing for HVAC Efficiency
        </h1>
        <p style={{ color: '#9BAEC8', marginBottom: '28px', lineHeight: 1.6 }}>
          In a typical DFW home, top plates and penetrations leak <strong style={{ color: '#F5E642' }}>40%+ of conditioned air</strong> into the attic before insulation even matters. Sealing first is non-negotiable.
        </p>

        {[
          { icon: '🔲', title: 'Top Plate Gaps', desc: 'Gaps between wall framing and ceiling drywall run the entire perimeter — major air highway into attic.' },
          { icon: '💡', title: 'Recessed Lights', desc: 'Old recessed cans leak hot attic air directly into living space. Replace with IC-rated airtight or cap from above.' },
          { icon: '🔌', title: 'Wiring Penetrations', desc: 'Every wire through top plates is a hole. Spray foam each one — takes 20 minutes but stops significant leakage.' },
          { icon: '🚪', title: 'Attic Hatch & Fan Openings', desc: 'Attic hatches are rarely weatherstripped. Whole-house fan openings are often completely open to attic 24/7.' },
        ].map((item) => (
          <div key={item.title} style={{ backgroundColor: '#111D35', borderRadius: '10px', padding: '16px', marginBottom: '12px', borderLeft: '3px solid #F5E642' }}>
            <div style={{ fontWeight: 700, marginBottom: '4px' }}>{item.icon} {item.title}</div>
            <div style={{ color: '#9BAEC8', fontSize: '14px' }}>{item.desc}</div>
          </div>
        ))}

        <div style={{ backgroundColor: '#111D35', borderRadius: '12px', padding: '24px', marginTop: '28px' }}>
          <div style={{ fontWeight: 700, marginBottom: '16px', color: '#F5E642' }}>🔍 Attic Type → Air Sealing Priority</div>
          <select
            value={atticType}
            onChange={(e) => { setAtticType(e.target.value); setResult(''); }}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: '#0A1628', color: '#E8EDF5', border: '1px solid #2A3F6F', marginBottom: '12px', fontSize: '15px' }}
          >
            <option value="">Select your attic insulation type...</option>
            {atticTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
          <button
            onClick={handleCheck}
            style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '10px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '15px' }}
          >
            Get Priority Guide
          </button>
          {result && (
            <div style={{ marginTop: '16px', backgroundColor: '#0A1628', borderRadius: '8px', padding: '16px', color: '#E8EDF5', lineHeight: 1.6, fontSize: '14px' }}>
              {result}
            </div>
          )}
        </div>

        <div style={{ marginTop: '28px', backgroundColor: '#111D35', borderRadius: '10px', padding: '16px', borderTop: '2px solid #F5E642' }}>
          <div style={{ fontWeight: 700, marginBottom: '6px' }}>💰 DFW Payback Reality</div>
          <div style={{ color: '#9BAEC8', fontSize: '14px' }}>Air sealing a DFW attic costs $800–$2,200 professionally. With summer electric bills averaging $320+/mo, proper sealing typically pays back in 2–3 DFW summers.</div>
        </div>
      </div>
    </div>
  );
}

