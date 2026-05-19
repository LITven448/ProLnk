import { useState } from 'react';

const monthlyBills: Record<string, { avg: number; note: string; tip: string }> = {
  January: { avg: 95, note: 'Heating dominates. Gas furnaces keep bills moderate.', tip: 'Check heat pump efficiency — many DFW homes overpay with resistance backup.' },
  February: { avg: 110, note: 'Cold snaps can spike bills. Ice storm risk.', tip: 'Emergency heat mode is expensive — avoid unless pipes are at risk.' },
  March: { avg: 85, note: 'Shoulder season — lowest HVAC bills of the year.', tip: 'Great time for annual HVAC tune-up before summer.' },
  April: { avg: 90, note: 'AC begins. Humidity control starts costing money.', tip: 'Check air filter — dirty filter at season start wastes 5–15%.' },
  May: { avg: 140, note: 'AC ramps up fast. First real summer bills.', tip: 'Seal attic bypasses now — heat gain from attic is DFW\’s #1 loss source.' },
  June: { avg: 210, note: 'Full summer mode. Bills jump significantly.', tip: 'Pre-cooling strategy saves $30–60/month on TOU plans.' },
  July: { avg: 290, note: 'Peak month. Average DFW bill: $250–350+.', tip: 'Programmable setbacks, shade trees, and attic fans are high-ROI this month.' },
  August: { avg: 275, note: 'Nearly as hot as July. Bills stay high.', tip: 'Check refrigerant charge — low charge at peak heat costs 20–30% more energy.' },
  September: { avg: 195, note: 'Still warm but cooling off. Relief by end of month.', tip: 'Schedule pre-winter HVAC inspection now before pros get booked.' },
  October: { avg: 115, note: 'Shoulder season returns. Bills drop sharply.', tip: 'Test heat mode now — don\’t discover a broken furnace in December.' },
  November: { avg: 100, note: 'Heating begins. Moderate bills.', tip: 'Seal weatherstripping and door gaps before winter heating season.' },
  December: { avg: 130, note: 'Holiday heating. Cold fronts spike usage.', tip: 'Lower setback to 65–68°F when away — heating setbacks save more than AC setbacks.' },
};

const sizeMultiplier: Record<string, number> = {
  '< 1,500 sq ft': 0.72,
  '1,500–2,500 sq ft': 1.0,
  '2,500–3,500 sq ft': 1.35,
  '3,500+ sq ft': 1.75,
};

export default function DFWHVACMonthlyBillGuide() {
  const [month, setMonth] = useState('July');
  const [homeSize, setHomeSize] = useState('1,500–2,500 sq ft');
  const [yourBill, setYourBill] = useState('');

  const data = monthlyBills[month] ?? monthlyBills['July'];
  const mult = sizeMultiplier[homeSize] ?? 1.0;
  const dfwAvg = Math.round(data.avg * mult);
  const bill = parseFloat(yourBill);
  const diff = !isNaN(bill) ? bill - dfwAvg : null;
  const diffLabel = diff === null ? '' : diff > 20 ? `$${Math.round(diff)} above DFW average` : diff < -20 ? `$${Math.abs(Math.round(diff))} below DFW average` : 'Right at DFW average';
  const diffColor = diff === null ? '#94A3B8' : diff > 20 ? '#f87171' : diff < -20 ? '#4ade80' : '#F5E642';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 }}>
          💡 ProLnk · DFW HVAC Guide
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          DFW HVAC Monthly Bill Guide
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          What should your DFW electric bill look like each month? Compare your bill to real
          DFW averages by home size and season — and find out the top savings opportunity for
          your situation.
        </p>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>
            🔢 DFW Bill Comparison Tool
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 14, color: '#94A3B8', marginBottom: 8 }}>Month</label>
              <select value={month} onChange={e => setMonth(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
                {Object.keys(monthlyBills).map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 14, color: '#94A3B8', marginBottom: 8 }}>Home Size</label>
              <select value={homeSize} onChange={e => setHomeSize(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
                {Object.keys(sizeMultiplier).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 14, color: '#94A3B8', marginBottom: 8 }}>Your Actual Bill (optional, $)</label>
            <input type="number" value={yourBill} onChange={e => setYourBill(e.target.value)} placeholder="e.g. 285"
              style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15, boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: yourBill ? '1fr 1fr' : '1fr', gap: 16 }}>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 42, fontWeight: 900, color: '#F5E642' }}>${dfwAvg}</div>
              <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 4 }}>DFW Average — {month}</div>
            </div>
            {diff !== null && (
              <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: diffColor }}>{diffLabel}</div>
                <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 4 }}>Your ${bill} vs DFW avg</div>
              </div>
            )}
          </div>
          <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>💡 Top savings tip for {month}</div>
            <div style={{ fontSize: 15, color: '#CBD5E1', lineHeight: 1.6 }}>{data.tip}</div>
          </div>
          <div style={{ marginTop: 12, fontSize: 14, color: '#64748B', lineHeight: 1.6 }}>{data.note}</div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 17, marginBottom: 6 }}>
            🔧 Reduce your DFW bill year-round
          </div>
          <div style={{ color: '#1E3A5F', fontSize: 14 }}>
            ProLnk connects DFW homeowners with vetted HVAC pros who know how to cut local energy costs.
          </div>
        </div>
      </div>
    </div>
  );
}
