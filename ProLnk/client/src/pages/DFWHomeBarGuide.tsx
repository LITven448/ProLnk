import { useState } from 'react';

const BAR_CONFIGS: Record<string, { label: string; plumbing: boolean; cost: string; fridge: string; counter: string }> = {
  dry: { label: 'Dry Bar', plumbing: false, cost: '$2,000–$6,000', fridge: 'Mini fridge or under-counter cooler', counter: 'Butcher block or granite' },
  wet: { label: 'Wet Bar', plumbing: true, cost: '$6,000–$18,000', fridge: 'Dual-zone beverage center', counter: 'Quartz or granite with drip edge' },
  full: { label: 'Full Bar with Keg', plumbing: true, cost: '$18,000–$40,000', fridge: 'Dual-zone + kegerator combo', counter: 'Commercial-grade stainless or quartz' },
};

export default function DFWHomeBarGuide() {
  const [sqft, setSqft] = useState('');
  const [style, setStyle] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<{ config: string; plumbing: string; fridge: string; counter: string; cost: string; permit: string } | null>(null);

  function calculate() {
    const bud = parseInt(budget);
    const space = parseInt(sqft);
    let config = 'dry';
    if (bud >= 18000 && space >= 80) config = 'full';
    else if (bud >= 6000 && space >= 40) config = 'wet';
    const c = BAR_CONFIGS[config];
    setResult({
      config: c.label,
      plumbing: c.plumbing ? 'Yes — requires licensed plumber, DFW permit typically $200–$400′ : ’No plumbing needed — plug-and-play setup',
      fridge: c.fridge,
      counter: c.counter,
      cost: c.cost,
      permit: c.plumbing
        ? 'Plumbing permit required in all DFW cities. Electrical permit needed if adding dedicated 20A circuit. Pull both before work starts.'
        : 'No permit required for dry bar in most DFW cities unless electrical panel upgrade is needed.',
    });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.25rem' }}>🍹 DFW Home Bar Guide</div>
        <div style={{ color: '#94A3B8', marginBottom: '2rem' }}>DFW entertaining culture — install a bar that delivers</div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🍷 Bar Types at a Glance</div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {Object.entries(BAR_CONFIGS).map(([k, v]) => (
              <div key={k} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', borderLeft: '3px solid #F5E642′ }}>
                <div style={{ color: '#fff', fontWeight: 700 }}>{v.label}</div>
                <div style={{ color: '#94A3B8', fontSize: '0.9rem', marginTop: '0.25rem' }}>{v.cost} · {v.plumbing ? '💧 Plumbing required' : '🔌 No plumbing'}</div>
                <div style={{ color: '#CBD5E1', fontSize: '0.875rem', marginTop: '0.25rem' }}>Fridge: {v.fridge} · Counter: {v.counter}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🪵 Countertop Choices for DFW Bars</div>
          <div style={{ color: '#CBD5E1', lineHeight: 1.7 }}>
            <strong style={{ color: '#fff' }}>Butcher block</strong> — popular in DFW for casual entertaining bars, warm aesthetic, easy to refinish. Avoid under direct AC vents (DFW humidity swings cause cracking). Seal annually.<br />
            <strong style={{ color: '#fff' }}>Quartz</strong> — most durable for wet bars, non-porous, resists wine and spirits stains. Premium choice at $80–$120/sq ft installed.<br />
            <strong style={{ color: '#fff' }}>Granite</strong> — classic DFW choice, must be sealed yearly, unique character per slab.
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🍾 Wine Storage Options</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', color: '#CBD5E1', fontSize: '0.9rem' }}>
            <div>Built-in wine rack: <strong style={{ color: '#fff' }}>$300–$1,200</strong></div>
            <div>Under-counter wine cooler: <strong style={{ color: '#fff' }}>$400–$2,000</strong></div>
            <div>Dual-zone beverage center: <strong style={{ color: '#fff' }}>$800–$3,500</strong></div>
            <div>Climate room (serious collector): <strong style={{ color: '#fff' }}>$5,000–$20,000</strong></div>
          </div>
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E3A5F' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1.25rem' }}>🧮 Bar Configuration Recommender</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Bar Space (sq ft)</div>
              <input value={sqft} onChange={e => setSqft(e.target.value)} placeholder="e.g. 60″ style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #2D4A6E', background: '#0A1628', color: '#fff', boxSizing: 'border-box' }} />
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Entertainment Style</div>
              <select value={style} onChange={e => setStyle(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #2D4A6E', background: '#0A1628', color: '#fff', boxSizing: 'border-box' }}>
                <option value="">Select style</option>
                <option value="casual">Casual / Game Day</option>
                <option value="upscale">Upscale / Wine Focused</option>
                <option value="full">Full Cocktail Bar</option>
              </select>
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Budget ($)</div>
              <input value={budget} onChange={e => setBudget(e.target.value)} placeholder="e.g. 12000″ style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #2D4A6E', background: '#0A1628', color: '#fff', boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '0.75rem 2rem', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: '1rem' }}>Get Recommendation</button>
          {result && (
            <div style={{ marginTop: '1.25rem', background: '#0A1628', borderRadius: 10, padding: '1.25rem', border: '1px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>{result.config}</div>
              <div style={{ color: '#CBD5E1′ }}>Plumbing: {result.plumbing}</div>
              <div style={{ color: '#CBD5E1', marginTop: '0.25rem' }}>Refrigeration: {result.fridge}</div>
              <div style={{ color: '#CBD5E1', marginTop: '0.25rem' }}>Counter: {result.counter}</div>
              <div style={{ color: '#CBD5E1', marginTop: '0.25rem' }}>Estimated Cost: <strong style={{ color: '#F5E642′ }}>{result.cost}</strong></div>
              <div style={{ color: '#94A3B8', marginTop: '0.5rem', fontSize: '0.85rem' }}>📋 Permits: {result.permit}</div>
            </div>
          )}
        </div>

        <div style={{ color: '#475569', textAlign: 'center', fontSize: '0.8rem' }}>ProLnk connects you with DFW home bar installation pros · prolnk.io</div>
      </div>
    </div>
  );
}
