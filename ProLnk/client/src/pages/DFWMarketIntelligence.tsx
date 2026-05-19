import { useState } from 'react';

const marketSegments = [
  { label: 'HVAC', value: 680, pct: 28, color: '#1E3A5F' },
  { label: 'Roofing', value: 520, pct: 22, color: '#2D5016' },
  { label: 'Plumbing', value: 340, pct: 14, color: '#7B4F2E' },
  { label: 'Electrical', value: 280, pct: 12, color: '#8B4513' },
  { label: 'Foundation', value: 240, pct: 10, color: '#4A0E4E' },
  { label: 'Other', value: 340, pct: 14, color: '#555' }
];

const trends = [
  {
    icon: '⚡',
    headline: 'EV Charger Installations Up 340%',
    body: 'Every new EV sold in DFW needs a Level 2 charger. Electricians with EV certifications are turning away work. Average ticket: $1,200–$2,400.',
    tag: 'ELECTRICIANS'
  },
  {
    icon: '☀️',
    headline: 'Solar + Battery Storage 2x’d in 12 Months',
    body: 'Post-ERCOT anxiety is driving adoption. Homeowners want independence from the grid. Installers with NABCEP certification command 40% premium.',
    tag: 'ELECTRICIANS + HVAC'
  },
  {
    icon: '🌪️',
    headline: 'Post-Freeze Insurance Claims Still Clearing',
    body: 'Uri aftermath: $195B in total Texas damage. Claims are still being processed. Roofers and plumbers with adjuster relationships are winning disproportionate share.',
    tag: 'ROOFING + PLUMBING'
  },
  {
    icon: '❄️',
    headline: 'HVAC Replacement Surge — The 2009-2011 Cohort',
    body: 'Systems installed during the last housing boom are hitting the 15-year mark. Replacement demand will peak 2025–2027. If you sell maintenance agreements, now is the time.',
    tag: 'HVAC'
  },
  {
    icon: '🏠',
    headline: 'Smart Home Integration Up 67% Annually',
    body: 'Homeowners want smart thermostats, automated lighting, and whole-home audio. Pros who learn integration work command $150–$200/hr vs. $85 for standard service calls.',
    tag: 'ELECTRICAL + HVAC'
  }
];

const seasonalData = [
  {
    trade: 'HVAC',
    color: '#1E3A5F',
    months: [30, 30, 45, 55, 70, 90, 100, 95, 75, 50, 35, 30]
  },
  {
    trade: 'Roofing',
    color: '#2D5016',
    months: [30, 35, 60, 85, 100, 70, 60, 55, 55, 80, 65, 30]
  },
  {
    trade: 'Foundation',
    color: '#7B4F2E',
    months: [80, 70, 60, 55, 45, 35, 30, 30, 40, 85, 100, 90]
  },
  {
    trade: 'Plumbing',
    color: '#8B4513',
    months: [60, 100, 70, 80, 55, 45, 40, 40, 45, 50, 55, 65]
  }
];

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function DFWMarketIntelligence() {
  const [activeTrade, setActiveTrade] = useState<string>('HVAC');

  const tradeData = seasonalData.find(d => d.trade === activeTrade)!;

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh', fontFamily: 'Georgia, serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ display: 'inline-block', background: '#FFC107', color: '#1E3A5F', fontFamily: 'sans-serif', fontWeight: 700, fontSize: 13, padding: '4px 14px', borderRadius: 20, marginBottom: 20, letterSpacing: 1 }}>
            2026 MARKET REPORT
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, color: '#1E3A5F', lineHeight: 1.2, marginBottom: 20, fontFamily: 'Georgia, serif' }}>
            DFW Home Services Market Intelligence<br />— 2026 Trends
          </h1>
          <p style={{ fontSize: 18, color: '#444', maxWidth: 600, margin: '0 auto', lineHeight: 1.7, fontFamily: 'sans-serif' }}>
            Data-driven insights for licensed home service professionals operating in the Dallas-Fort Worth metro.
          </p>
        </div>

        <div style={{ background: '#1E3A5F', borderRadius: 16, padding: 36, marginBottom: 48, color: '#fff' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: 48, fontWeight: 900, color: '#FFC107', fontFamily: 'sans-serif' }}>$2.4B</div>
            <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', fontFamily: 'sans-serif' }}>DFW Home Services Market — Annual</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {marketSegments.map((seg, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 90, fontFamily: 'sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: 600, flexShrink: 0 }}>
                  {seg.label}
                </div>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 6, overflow: 'hidden', height: 28 }}>
                  <div style={{
                    width: `${seg.pct * 3.5}%`,
                    background: '#FFC107',
                    height: '100%',
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 10
                  }}>
                    <span style={{ fontFamily: 'sans-serif', fontSize: 12, fontWeight: 700, color: '#1E3A5F', whiteSpace: 'nowrap' }}>
                      ${seg.value}M ({seg.pct}%)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1E3A5F', marginBottom: 8, fontFamily: 'Georgia, serif' }}>
            2026 Market Trends
          </h2>
          <p style={{ color: '#666', fontFamily: 'sans-serif', marginBottom: 28, fontSize: 15 }}>Five forces shaping demand for DFW home service pros this year.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {trends.map((t, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E5E0', padding: '24px 28px', display: 'flex', gap: 20, alignItems: 'flex-start', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: 36, flexShrink: 0 }}>{t.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                    <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#1E3A5F', fontFamily: 'Georgia, serif' }}>{t.headline}</h3>
                    <span style={{ background: '#FFC107', color: '#1E3A5F', fontFamily: 'sans-serif', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4, letterSpacing: 0.5 }}>{t.tag}</span>
                  </div>
                  <p style={{ margin: 0, color: '#444', fontFamily: 'sans-serif', fontSize: 15, lineHeight: 1.7 }}>{t.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E5E5E0', padding: 36, marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1E3A5F', marginBottom: 8, fontFamily: 'Georgia, serif' }}>
            Demand by Season
          </h2>
          <p style={{ color: '#666', fontFamily: 'sans-serif', marginBottom: 24, fontSize: 14 }}>Relative demand index — plan your capacity and marketing spend accordingly.</p>

          <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
            {seasonalData.map(d => (
              <button
                key={d.trade}
                onClick={() => setActiveTrade(d.trade)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 8,
                  border: `2px solid ${activeTrade === d.trade ? d.color : '#E5E5E0'}`,
                  background: activeTrade === d.trade ? d.color : '#fff',
                  color: activeTrade === d.trade ? '#fff' : '#666',
                  fontFamily: 'sans-serif',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer'
                }}
              >
                {d.trade}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 160, paddingBottom: 0 }}>
            {tradeData.months.map((val, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div
                  style={{
                    width: '100%',
                    height: `${val * 1.4}px`,
                    background: tradeData.color,
                    borderRadius: '4px 4px 0 0',
                    opacity: val >= 80 ? 1 : val >= 55 ? 0.7 : 0.4,
                    transition: 'height 0.3s ease'
                  }}
                />
                <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#888', fontWeight: 600 }}>{monthLabels[i]}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, display: 'flex', gap: 16, fontFamily: 'sans-serif', fontSize: 12, color: '#888', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 16, height: 16, background: tradeData.color, borderRadius: 3, display: 'inline-block', opacity: 1 }} /> Peak
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 16, height: 16, background: tradeData.color, borderRadius: 3, display: 'inline-block', opacity: 0.7 }} /> Moderate
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 16, height: 16, background: tradeData.color, borderRadius: 3, display: 'inline-block', opacity: 0.4 }} /> Slow
            </span>
          </div>
        </div>

        <div style={{ background: '#FFC107', borderRadius: 16, padding: '36px 40px', marginBottom: 48, textAlign: 'center' }}>
          <div style={{ fontSize: 52, fontWeight: 900, color: '#1E3A5F', fontFamily: 'sans-serif', marginBottom: 8 }}>23%</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1E3A5F', marginBottom: 12, fontFamily: 'Georgia, serif' }}>
            Pro Shortage Across DFW
          </h2>
          <p style={{ color: '#1E3A5F', fontFamily: 'sans-serif', fontSize: 16, lineHeight: 1.7, maxWidth: 580, margin: '0 auto' }}>
            Demand for licensed home service pros exceeds supply by 23% — this is the best time in a decade to be a home service professional in DFW. The market needs you. The question is whether homeowners can find you.
          </p>
        </div>

        <div style={{ background: '#1E3A5F', borderRadius: 16, padding: '48px 40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#FFC107', marginBottom: 16, fontFamily: 'Georgia, serif' }}>
            Put This Market Data to Work
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, marginBottom: 28, lineHeight: 1.7, fontFamily: 'sans-serif', maxWidth: 520, margin: '0 auto 28px' }}>
            ProLnk connects DFW's licensed home service pros with the homeowners who need them — in real time, by trade and territory. The market is growing. The leads are there.
          </p>
          <a
            href="/apply"
            style={{ display: 'inline-block', background: '#FFC107', color: '#1E3A5F', fontWeight: 800, fontSize: 17, padding: '16px 40px', borderRadius: 10, textDecoration: 'none', fontFamily: 'sans-serif' }}
          >
            Apply for Pro Access →
          </a>
        </div>

      </div>
    </div>
  );
}
