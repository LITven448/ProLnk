import { useState } from 'react';

export default function DFWFoundationCrackWidth2026() {
  const [width, setWidth] = useState('');
  const [pattern, setPattern] = useState('');
  const [result, setResult] = useState<{ urgency: string; color: string; action: string; detail: string } | null>(null);

  const widths = [
    { value: 'hairline', label: 'Hairline — under 1/16 inch (thickness of a credit card)' },
    { value: 'minor', label: 'Minor — 1/16 to 1/8 inch' },
    { value: 'moderate', label: 'Moderate — 1/8 to 1/4 inch' },
    { value: 'significant', label: 'Significant — over 1/4 inch' },
  ];

  const patterns = [
    { value: 'horizontal', label: 'Horizontal crack' },
    { value: 'vertical', label: 'Vertical crack' },
    { value: 'diagonal', label: 'Diagonal / stair-step crack' },
    { value: 'spider', label: 'Spider web / map cracking' },
  ];

  const assess = () => {
    if (!width || !pattern) return;
    const matrix: Record<string, Record<string, { urgency: string; color: string; action: string; detail: string }>> = {
      hairline: {
        horizontal: { urgency: 'Monitor', color: '#F5E642', action: 'Photograph and measure. Check again in 6 months.', detail: 'Hairline horizontal cracks are common in DFW clay soil. Not urgent unless they widen.' },
        vertical: { urgency: 'Monitor', color: '#F5E642', action: 'Typical shrinkage crack — monitor seasonally.', detail: 'Vertical hairline cracks often appear from normal concrete curing in DFW heat.' },
        diagonal: { urgency: 'Watch Closely', color: '#f97316', action: 'Have a foundation specialist assess within 90 days.', detail: 'Diagonal hairline cracks can indicate early differential settlement common in DFW expansive soil.' },
        spider: { urgency: 'Monitor', color: '#F5E642', action: 'Likely surface shrinkage — recheck in 6 months.', detail: 'Map cracking is typical in DFW slab surfaces exposed to heat cycles.' },
      },
      minor: {
        horizontal: { urgency: 'Professional Assessment', color: '#f97316', action: 'Schedule a foundation inspection within 60 days.', detail: 'Minor horizontal cracks need professional eyes — they can indicate soil pressure building.' },
        vertical: { urgency: 'Watch Closely', color: '#f97316', action: 'Monitor monthly. Get assessed if widening.', detail: 'Vertical cracks at this width are common in DFW but warrant tracking.' },
        diagonal: { urgency: 'Repair Likely Needed', color: '#ef4444', action: 'Get 2-3 foundation quotes within 30 days.', detail: 'Diagonal cracks 1/16”-1/8” indicate active movement from DFW clay shifting.' },
        spider: { urgency: 'Watch Closely', color: '#f97316', action: 'Check for moisture intrusion first, then assess.', detail: 'Spider cracking at this width may indicate subsurface moisture issues in DFW.' },
      },
      moderate: {
        horizontal: { urgency: 'Urgent Repair', color: '#ef4444', action: 'Get foundation quotes this week. Do not delay.', detail: 'Moderate horizontal cracks indicate significant lateral pressure — DFW soil movement is likely active.' },
        vertical: { urgency: 'Repair Needed', color: '#ef4444', action: 'Schedule foundation inspection within 2 weeks.', detail: 'Vertical cracks at 1/8”-1/4” indicate settlement that needs addressing.' },
        diagonal: { urgency: 'URGENT', color: '#dc2626', action: 'Call a foundation specialist today. Multiple piers likely needed.', detail: 'Moderate diagonal cracks are a serious signal of differential settlement in DFW clay.' },
        spider: { urgency: 'Repair Needed', color: '#ef4444', action: 'Inspect for subsurface water then get foundation assessment.', detail: 'Wide map cracking indicates concrete distress — professional assessment required.' },
      },
      significant: {
        horizontal: { urgency: 'EMERGENCY', color: '#dc2626', action: 'Stop using affected area. Call engineer immediately.', detail: 'Significant horizontal cracks can indicate structural compromise — do not delay.' },
        vertical: { urgency: 'URGENT', color: '#dc2626', action: 'Get a licensed structural engineer assessment this week.', detail: 'Cracks over 1/4” indicate major settlement that requires immediate professional evaluation.' },
        diagonal: { urgency: 'EMERGENCY', color: '#dc2626', action: 'Evacuate affected rooms if doors/windows are sticking. Call engineer today.', detail: 'Significant diagonal cracks with door/window problems signal active structural movement.' },
        spider: { urgency: 'URGENT', color: '#dc2626', action: 'Inspect for slab heave or major moisture intrusion immediately.', detail: 'Widespread significant cracking indicates systemic slab distress requiring urgent attention.' },
      },
    };
    setResult(matrix[width]?.[pattern] ?? null);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏚️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Foundation Crack Width Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>Interpret crack width + pattern to assess urgency in DFW expansive clay soil</p>
        </div>

        <div style={{ background: '#0F1F3D', borderRadius: 16, padding: 28, border: '1px solid #1e3a5f', marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 18 }}>📏 Crack Width</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
            {widths.map(w => (
              <button key={w.value} onClick={() => setWidth(w.value)} style={{ padding: '11px 14px', borderRadius: 8, border: `2px solid ${width === w.value ? '#F5E642' : '#1e3a5f'}`, background: width === w.value ? '#F5E642′ : '#0A1628', color: width === w.value ? '#0A1628' : '#fff', cursor: ’pointer', textAlign: 'left', fontWeight: 600, fontSize: 14 }}>{w.label}</button>
            ))}
          </div>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 18 }}>↗️ Crack Pattern</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {patterns.map(p => (
              <button key={p.value} onClick={() => setPattern(p.value)} style={{ padding: '11px 14px', borderRadius: 8, border: `2px solid ${pattern === p.value ? '#F5E642' : '#1e3a5f'}`, background: pattern === p.value ? '#F5E642′ : '#0A1628', color: pattern === p.value ? '#0A1628' : '#fff', cursor: ’pointer', textAlign: 'left', fontWeight: 600, fontSize: 14 }}>{p.label}</button>
            ))}
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 28px', fontWeight: 800, fontSize: 16, cursor: 'pointer', width: '100%' }}>Assess My Crack</button>
        </div>

        {result && (
          <div style={{ background: '#0F1F3D', borderRadius: 16, padding: 28, border: `2px solid ${result.color}` }}>
            <h3 style={{ color: result.color, marginTop: 0, fontSize: 22 }}>Urgency: {result.urgency}</h3>
            <p style={{ color: '#e2e8f0', fontWeight: 600, marginBottom: 8 }}>📋 Action: {result.action}</p>
            <p style={{ color: '#94a3b8′ }}>{result.detail}</p>
            <p style={{ color: '#64748b', fontSize: 13, marginTop: 16 }}>ProLnk connects you with licensed DFW foundation specialists who understand expansive clay soil behavior.</p>
          </div>
        )}
      </div>
    </div>
  );
}