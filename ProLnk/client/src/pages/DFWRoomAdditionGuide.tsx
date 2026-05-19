import { useState } from 'react';

const ADDITION_TYPES = [
  { id: 'bedroom', label: 'Bedroom', baseCost: 200, permits: ['Building Permit', 'Electrical Permit', 'Foundation Inspection'] },
  { id: 'bathroom', label: 'Bathroom', baseCost: 250, permits: ['Building Permit', 'Plumbing Permit', 'Electrical Permit'] },
  { id: 'sunroom', label: 'Sunroom', baseCost: 180, permits: ['Building Permit', 'Energy Code Inspection'] },
  { id: 'flex', label: 'Flex Space', baseCost: 175, permits: ['Building Permit', 'Electrical Permit'] },
];

const FINISH_LEVELS = [
  { id: 'basic', label: 'Basic', multiplier: 1.0 },
  { id: 'mid', label: 'Mid-Range', multiplier: 1.35 },
  { id: 'premium', label: 'Premium', multiplier: 1.75 },
];

export default function DFWRoomAdditionGuide() {
  const [additionType, setAdditionType] = useState('bedroom');
  const [sqFt, setSqFt] = useState(400);
  const [finishLevel, setFinishLevel] = useState('mid');

  const selectedType = ADDITION_TYPES.find(t => t.id === additionType)!;
  const selectedFinish = FINISH_LEVELS.find(f => f.id === finishLevel)!;
  const costLow = Math.round(selectedType.baseCost * selectedFinish.multiplier * sqFt * 0.85);
  const costHigh = Math.round(selectedType.baseCost * selectedFinish.multiplier * sqFt * 1.15);
  const timelineMonths = sqFt < 300 ? '2–4′ : sqFt < 600 ? '3–5' : '4–6';

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '0 0 80px' }}>
      <div style={{ backgroundColor: '#0D1E38', borderBottom: '3px solid #F5E642', padding: '40px 24px 32px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>DFW HOME IMPROVEMENT GUIDE</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>Room Addition Guide for DFW 2026</h1>
          <p style={{ color: '#A0AABE', fontSize: 16, margin: 0, maxWidth: 600 }}>Everything you need to know about adding square footage in the Dallas–Fort Worth market — costs, permits, timelines, and DFW-specific considerations.</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🏗️ Addition Types</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {[
              { icon: '🛏️', title: 'Bedroom', range: '$150–$250/sqft', note: 'Most common addition in DFW' },
              { icon: '🚿', title: 'Bathroom', range: '$200–$300/sqft', note: 'Plumbing adds significant cost' },
              { icon: '🌿', title: 'Sunroom', range: '$130–$220/sqft', note: 'Low-E glass essential in DFW heat' },
              { icon: '📦', title: 'Flex Space', range: '$120–$200/sqft', note: 'Office, gym, playroom, or studio' },
            ].map(item => (
              <div key={item.title} style={{ backgroundColor: '#0D1E38', border: '1px solid #1E3A5F', borderRadius: 12, padding: '20px 16px' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{item.title}</div>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{item.range}</div>
                <div style={{ color: '#8090A8', fontSize: 12 }}>{item.note}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🏔️ DFW-Specific: Clay Soil & Foundation</h2>
          <div style={{ backgroundColor: '#0D1E38', border: '1px solid #F5E642', borderRadius: 12, padding: 24 }}>
            <p style={{ color: '#CBD5E0', lineHeight: 1.7, margin: '0 0 12px' }}>DFW sits on expansive clay soil that contracts in drought and swells after rain — sometimes shifting inches per season. Any room addition requires a foundation engineer (not optional) to design an extension that matches your existing slab type.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {['Post-tension slabs are common in DFW — extensions must match the tension system', 'Pier-and-beam additions need matching beam depth and spacing', 'Soil tests recommended before any dig (typical cost: $400–$800)', 'Foundation engineer fee: $1,500–$4,000 for addition design'].map(point => (
                <div key={point} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: '#F5E642', marginTop: 2 }}>⚠️</span>
                  <span style={{ color: '#A0AABE', fontSize: 14 }}>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>📋 Permit Requirements</h2>
          <div style={{ backgroundColor: '#0D1E38', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24 }}>
            <p style={{ color: '#A0AABE', marginBottom: 16, fontSize: 14 }}>Permits are required in all DFW municipalities. Typical timeline: 2–6 weeks for approval in cities like Plano, Frisco, McKinney. Dallas and Fort Worth city proper can take 6–10 weeks.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {['Building Permit', 'Foundation Inspection', 'Electrical Permit', 'Plumbing Permit (if applicable)', 'Mechanical/HVAC Permit', 'Energy Code Inspection', 'Final Certificate of Occupancy'].map(p => (
                <span key={p} style={{ backgroundColor: '#162840', border: '1px solid #2A4870', borderRadius: 20, padding: '6px 14px', fontSize: 13, color: '#CBD5E0′ }}>📄 {p}</span>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🔧 Architect vs. Design-Build</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ backgroundColor: '#0D1E38', border: '1px solid #1E3A5F', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>📐 Architect Route</div>
              <ul style={{ color: '#A0AABE', fontSize: 14, lineHeight: 1.8, paddingLeft: 18, margin: 0 }}>
                <li>Full design control</li><li>Fee: 8–15% of project cost</li><li>Best for complex additions</li><li>Bid-out to multiple GCs</li>
              </ul>
            </div>
            <div style={{ backgroundColor: '#0D1E38', border: '1px solid #1E3A5F', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🏢 Design-Build</div>
              <ul style={{ color: '#A0AABE', fontSize: 14, lineHeight: 1.8, paddingLeft: 18, margin: 0 }}>
                <li>Single point of contact</li><li>Faster from concept to permit</li><li>Less design flexibility</li><li>Often 10–15% faster completion</li>
              </ul>
            </div>
          </div>
        </section>

        <section style={{ marginTop: 40, backgroundColor: '#0D1E38', border: '2px solid #F5E642', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 24 }}>🧮 Cost Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#A0AABE', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Addition Type</label>
              <select value={additionType} onChange={e => setAdditionType(e.target.value)} style={{ width: '100%', backgroundColor: '#162840', border: '1px solid #2A4870', borderRadius: 8, padding: '10px 12px', color: '#E8EAF0', fontSize: 14 }}>
                {ADDITION_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#A0AABE', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Square Footage: {sqFt} sq ft</label>
              <input type="range" min={150} max={1200} step={50} value={sqFt} onChange={e => setSqFt(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#A0AABE', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Finish Level</label>
              <select value={finishLevel} onChange={e => setFinishLevel(e.target.value)} style={{ width: '100%', backgroundColor: '#162840', border: '1px solid #2A4870', borderRadius: 8, padding: '10px 12px', color: '#E8EAF0', fontSize: 14 }}>
                {FINISH_LEVELS.map(f => <option key={f.id} value={f.id}>{f.label}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <div style={{ backgroundColor: '#162840', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#A0AABE', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>ESTIMATED COST</div>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>${costLow.toLocaleString()}–${costHigh.toLocaleString()}</div>
            </div>
            <div style={{ backgroundColor: '#162840', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#A0AABE', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>TIMELINE</div>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{timelineMonths} months</div>
            </div>
            <div style={{ backgroundColor: '#162840', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#A0AABE', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>PERMITS NEEDED</div>
              <div style={{ color: '#F5E642', fontSize: 16, fontWeight: 700 }}>{selectedType.permits.length} permits</div>
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <div style={{ color: '#A0AABE', fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Required Permits for {selectedType.label}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {selectedType.permits.map(p => <span key={p} style={{ backgroundColor: '#1A3050', border: '1px solid #F5E642', borderRadius: 20, padding: '5px 12px', fontSize: 12, color: '#F5E642′ }}>✓ {p}</span>)}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
