import { useState } from 'react';

export default function DFWFoundationPressureRelief2026() {
  const [symptom, setSymptom] = useState('');
  const [result, setResult] = useState('');

  const symptoms = [
    { value: 'wet-perimeter', label: 'Water Against Foundation After Rain' },
    { value: 'weeping-wall', label: 'Water Seeping Through Foundation Wall' },
    { value: 'standing-water', label: 'Standing Water Under Pier & Beam' },
    { value: 'damp-crawl', label: 'Chronic Moisture in Crawl Space' },
  ];

  const guides: Record<string, string> = {
    'wet-perimeter': 'GRADE + FRENCH DRAIN: Soil should slope away from foundation at 6 inches over 10 feet. If it doesn’t, hydrostatic pressure builds during DFW spring rains. A perimeter French drain ($3,000–$8,000) diverts water before it reaches the foundation wall.',
    'weeping-wall': 'URGENT — STRUCTURAL RISK: Water forcing through foundation wall means hydrostatic pressure exceeds wall resistance. Interior drainage channel ($4,000–$9,000) as last resort. First assess exterior grade, downspout extensions, and perimeter drain options.',
    'standing-water': 'SUMP PUMP CANDIDATE: Pier & beam crawl spaces that collect standing water need a sump pump ($800–$2,500 installed). Address root cause first (grade, gutters, downspouts). Vapor barrier also required — DFW clay holds moisture against wood sills.',
    'damp-crawl': 'VAPOR BARRIER + VENTILATION: DFW spring humidity saturates unprotected crawl spaces. 6-mil poly vapor barrier across soil floor is minimum. Add crawl space vents if absent. Encapsulation ($5,000–$15,000) is the gold standard for DFW pier & beam homes.',
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#F5E642', fontWeight: 700, fontSize: '13px', letterSpacing: '1px' }}>DFW FOUNDATION GUIDE 2026</div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '12px', lineHeight: 1.2 }}>
          💧 Foundation Hydrostatic Pressure Guide
        </h1>
        <p style={{ color: '#9BAEC8', marginBottom: '28px', lineHeight: 1.6 }}>
          DFW spring rains dump <strong style={{ color: '#F5E642' }}>5–8 inches in 48 hours</strong> — and DFW's expansive clay soil doesn't drain, it holds. Water pressure against foundation walls is a primary cause of pier & beam damage and slab heave in North Texas.
        </p>

        {[
          { icon: '🌧️', title: 'DFW Spring Hydrostatic Events', desc: 'March–May in DFW brings repeated heavy rain on clay soil that is already saturated from winter. Water has nowhere to go but sideways — directly against foundation perimeters.' },
          { icon: '🏔️', title: 'French Drain Solutions', desc: 'A perimeter French drain intercepts groundwater before it reaches the foundation. Proper installation includes gravel bed, perforated pipe, and daylight outlet or dry well — not just a trench.' },
          { icon: '💧', title: 'Weeping Walls — Warning Sign', desc: 'Water seeping through foundation walls (common in older DFW pier & beam homes with brick perimeter) indicates hydrostatic pressure exceeding the wall’s resistance capacity.' },
          { icon: '🔄', title: 'Interior Drainage — Last Resort', desc: 'Interior drainage channels manage water after it enters — they don’t stop hydrostatic pressure. Always exhaust exterior grading and drain options first.' },
        ].map((item) => (
          <div key={item.title} style={{ backgroundColor: '#111D35', borderRadius: '10px', padding: '16px', marginBottom: '12px', borderLeft: '3px solid #F5E642' }}>
            <div style={{ fontWeight: 700, marginBottom: '4px' }}>{item.icon} {item.title}</div>
            <div style={{ color: '#9BAEC8', fontSize: '14px' }}>{item.desc}</div>
          </div>
        ))}

        <div style={{ backgroundColor: '#111D35', borderRadius: '12px', padding: '24px', marginTop: '28px' }}>
          <div style={{ fontWeight: 700, marginBottom: '16px', color: '#F5E642' }}>💧 Water Pressure Symptom → Solution Guide</div>
          <select
            value={symptom}
            onChange={(e) => { setSymptom(e.target.value); setResult(''); }}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: '#0A1628', color: '#E8EDF5', border: '1px solid #2A3F6F', marginBottom: '12px', fontSize: '15px' }}
          >
            <option value="">Select your water pressure symptom...</option>
            {symptoms.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          <button
            onClick={() => symptom && setResult(guides[symptom])}
            style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '10px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '15px' }}
          >
            Get Solution Guide
          </button>
          {result && (
            <div style={{ marginTop: '16px', backgroundColor: '#0A1628', borderRadius: '8px', padding: '16px', color: '#E8EDF5', lineHeight: 1.6, fontSize: '14px' }}>
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

