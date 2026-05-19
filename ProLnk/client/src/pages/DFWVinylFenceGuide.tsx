import { useState } from 'react';

const STYLES = [
  { id: 'privacy', label: 'Privacy (6ft)', costPer: 22, woodEquiv: 18 },
  { id: 'postrail', label: 'Post & Rail (3-rail)', costPer: 14, woodEquiv: 10 },
  { id: 'picket', label: 'Picket (4ft)', costPer: 18, woodEquiv: 14 },
];

const COLORS = ['White', 'Tan/Almond', 'Gray', 'Woodgrain'];

export default function DFWVinylFenceGuide() {
  const [linearFeet, setLinearFeet] = useState(150);
  const [style, setStyle] = useState('privacy');
  const [color, setColor] = useState('White');

  const st = STYLES.find(s => s.id === style)!;
  const laborCost = Math.round(linearFeet * 9);
  const vinylMaterials = Math.round(linearFeet * st.costPer);
  const vinylTotal = vinylMaterials + laborCost;
  const woodTotal = Math.round(linearFeet * st.woodEquiv) + laborCost;

  const yr10VinylMaint = Math.round(linearFeet * 0.15 * 10);
  const yr10WoodMaint = Math.round(linearFeet * 0.65 * 10);
  const yr10VinylLifetime = vinylTotal + yr10VinylMaint;
  const yr10WoodLifetime = woodTotal + yr10WoodMaint;
  const savings10yr = yr10WoodLifetime - yr10VinylLifetime;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: '#0D1F3C', padding: '48px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 40 }}>🏠</div>
        <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 800, margin: '12px 0 8px' }}>
          DFW Vinyl Fence Guide
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 580, margin: '0 auto' }}>
          Zero-maintenance vinyl is gaining fast on wood in DFW — find out if it's right for your property.
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginTop: 36 }}>
          {[
            { icon: '☀️', title: 'DFW Heat Performance', body: 'Modern vinyl is UV-stabilized and handles DFW\’s intense heat well. Quality PVC fences don\’t yellow or warp even in 110°F summers when properly installed with expansion gaps.' },
            { icon: '🏘️', title: 'HOA Acceptance', body: 'Most DFW HOAs explicitly allow white vinyl privacy and picket fences. Always verify your CC&Rs — some require specific heights or prohibit wood-look vinyl. Get written approval before ordering.' },
            { icon: '🔧', title: 'True Zero Maintenance', body: 'Unlike wood, vinyl never needs staining, sealing, or painting. Occasional rinse with garden hose removes DFW clay dust. Budget $0 annually vs $500–$900/yr for equivalent wood fence.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#0D1F3C', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28 }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', fontSize: 15, fontWeight: 700, margin: '10px 0 6px' }}>{card.title}</h3>
              <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 16, padding: 28, marginTop: 28, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, margin: '0 0 20px' }}>📊 10-Year Cost Comparison</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Linear Feet</label>
              <input type="range" min={50} max={500} value={linearFeet} onChange={e => setLinearFeet(+e.target.value)}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
              <span style={{ color: '#F5E642', fontSize: 15, fontWeight: 700 }}>{linearFeet} ft</span>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Style</label>
              <select value={style} onChange={e => setStyle(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '8px 10px', fontSize: 14 }}>
                {STYLES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Color</label>
              <select value={color} onChange={e => setColor(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '8px 10px', fontSize: 14 }}>
                {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, border: '2px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>VINYL — 10 Year Total</div>
              <div style={{ color: '#fff', fontSize: 24, fontWeight: 800 }}>${yr10VinylLifetime.toLocaleString()}</div>
              <div style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>Install: ${vinylTotal.toLocaleString()} + $0 maint</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#94A3B8', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>WOOD — 10 Year Total</div>
              <div style={{ color: '#fff', fontSize: 24, fontWeight: 800 }}>${yr10WoodLifetime.toLocaleString()}</div>
              <div style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>Install: ${woodTotal.toLocaleString()} + ${yr10WoodMaint.toLocaleString()} maint</div>
            </div>
          </div>
          {savings10yr > 0 && (
            <div style={{ background: '#1a2f1a', border: '1px solid #22c55e', borderRadius: 10, padding: 14, textAlign: 'center' }}>
              <span style={{ color: '#22c55e', fontWeight: 700 }}>✅ Vinyl saves you ${savings10yr.toLocaleString()} over 10 years vs comparable wood</span>
            </div>
          )}
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginTop: 20, border: '1px solid #1E3A5F' }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 12px' }}>⚠️ DFW Vinyl Watch-Outs</h3>
          {[
            'Expansion gaps (1/8″) are mandatory in DFW — vinyl expands significantly in summer heat. Installers who skip this cause buckling.',
            'Avoid thin-wall vinyl (under 0.12″ wall thickness) — it cracks in DFW hail storms. Ask for Grade 5 or commercial-grade panels.',
            'Vinyl can\’t be cut easily after install — measure and plan gate locations carefully before ordering.',
          ].map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
              <span style={{ color: '#F5E642', fontWeight: 700, marginTop: 1 }}>→</span>
              <span style={{ color: '#94A3B8', fontSize: 14 }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
