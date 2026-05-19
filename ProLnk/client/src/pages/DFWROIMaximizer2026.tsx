import { useState } from 'react';

export default function DFWROIMaximizer2026() {
  const [budget, setBudget] = useState(25000);

  const projects = [
    { name: 'Curb Appeal Package', icon: '🌿', roi: 105, cost: 3500, desc: 'Fresh mulch, paint front door, new house numbers, landscape trim', dfwNote: 'DFW buyers judge within 8 seconds of arrival' },
    { name: 'HVAC Replacement', icon: '❄️', roi: 85, cost: 9500, desc: 'New 16-SEER system with smart thermostat', dfwNote: 'DFW summers — buyers heavily discount old HVAC units' },
    { name: 'Kitchen Refresh', icon: '🍳', roi: 72, cost: 14000, desc: 'Cabinet paint, new hardware, countertops, backsplash', dfwNote: 'Open-concept kitchens command $15–25K premium in DFW' },
    { name: 'Exterior Paint', icon: '🖌️', roi: 55, cost: 5500, desc: 'Full exterior repaint with modern neutral palette', dfwNote: 'DFW sun fades paint fast — fresh paint signals maintained home' },
    { name: 'Foundation Documentation', icon: '📄', roi: 40, cost: 600, desc: 'Engineer report + warranty documentation for existing foundation', dfwNote: 'DFW clay soil — documented foundation prevents $15–40K buyer discounts' },
    { name: 'Master Bath Update', icon: '🚿', roi: 65, cost: 8500, desc: 'New vanity, fixtures, tile surround, lighting', dfwNote: 'Primary bath is #2 buying factor in DFW market after kitchen' },
    { name: 'Attic Insulation', icon: '🏠', roi: 95, cost: 2800, desc: 'Blow in R-38 insulation, radiant barrier', dfwNote: 'DFW attics hit 140°F — radiant barriers cut cooling bills 15–25%' },
    { name: 'Smart Home Package', icon: '📱', roi: 35, cost: 2200, desc: 'Smart thermostat, doorbell, locks, lighting', dfwNote: 'DFW millennials pay 3–5% premium for smart-ready homes' },
  ];

  const affordable = projects.filter(p => p.cost <= budget).sort((a, b) => b.roi - a.roi);
  const fmt = (n: number) => n.toLocaleString();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 48 }}>📈</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW Home Improvement ROI Maximizer 2026</h1>
          <p style={{ color: '#8899BB', fontSize: 14 }}>Ranked by DFW return on investment — spend smarter, earn more at sale</p>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Your Available Budget: ${fmt(budget)}</div>
          <input type="range" min={1000} max={100000} step={500} value={budget} onChange={e => setBudget(+e.target.value)}
            style={{ width: '100%', accentColor: '#F5E642' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8899BB', fontSize: 12, marginTop: 4 }}>
            <span>$1K</span><span>$100K</span>
          </div>
        </div>

        {affordable.length === 0 && (
          <div style={{ background: '#111D35', borderRadius: 12, padding: 24, textAlign: 'center', color: '#8899BB' }}>
            Increase budget to unlock project recommendations
          </div>
        )}

        {affordable.map((p, i) => {
          const roiColor = p.roi >= 90 ? '#22CC55' : p.roi >= 65 ? '#F5E642' : '#88AACC';
          return (
            <div key={p.name} style={{ background: '#111D35', borderRadius: 12, padding: 20, marginBottom: 14, borderLeft: i === 0 ? '4px solid #F5E642' : '4px solid #2A3A5A' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <span style={{ fontSize: 20, marginRight: 8 }}>{p.icon}</span>
                  <span style={{ fontWeight: 700, fontSize: 16 }}>{p.name}</span>
                  {i === 0 && <span style={{ marginLeft: 8, background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '2px 8px', fontSize: 11, fontWeight: 900 }}>TOP PICK</span>}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: roiColor, fontWeight: 900, fontSize: 22 }}>{p.roi}%</div>
                  <div style={{ color: '#8899BB', fontSize: 11 }}>ROI</div>
                </div>
              </div>
              <div style={{ color: '#ccc', fontSize: 13, marginBottom: 6 }}>{p.desc}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ color: '#F5E642', fontSize: 13 }}>💰 ~${fmt(p.cost)}</div>
                <div style={{ color: '#8899BB', fontSize: 12, maxWidth: '60%', textAlign: 'right' }}>💡 {p.dfwNote}</div>
              </div>
            </div>
          );
        })}

        <div style={{ background: '#0D1F3C', border: '2px solid #F5E642', borderRadius: 12, padding: 20, textAlign: 'center', marginTop: 8 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Get ProLnk DFW Contractor Quotes</div>
          <div style={{ color: '#8899BB', fontSize: 13 }}>Compare 3 verified DFW contractors for any project above — free, no obligation</div>
        </div>
      </div>
    </div>
  );
}

