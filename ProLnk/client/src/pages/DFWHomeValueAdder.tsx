import { useState } from 'react';

const tiers = [
  { label: 'Starter ($200K–$325K)', min: 200000, max: 325000 },
  { label: 'Mid-Market ($325K–$500K)', min: 325000, max: 500000 },
  { label: 'Upper-Mid ($500K–$750K)', min: 500000, max: 750000 },
  { label: 'Luxury ($750K+)', min: 750000, max: 2000000 },
];

type TierKey = 'starter' | 'mid' | 'upper' | 'luxury';

const improvements: Record<TierKey, Array<{ name: string; cost: string; valueAdd: string; roi: string; note: string }>> = {
  starter: [
    { name: 'Fresh exterior paint', cost: '$3,500–$6,000', valueAdd: '$8,000–$15,000', roi: '150–200%', note: 'Biggest bang at this price point — DFW buyers judge curb appeal hard' },
    { name: 'Kitchen cabinet refacing', cost: '$4,000–$8,000', valueAdd: '$10,000–$18,000', roi: '130–175%', note: 'Full remodel overkill here; refacing moves the needle without overcapitalizing' },
    { name: 'HVAC replacement', cost: '$7,000–$12,000', valueAdd: '$10,000–$16,000', roi: '100–130%', note: 'Buyers discount offers heavily for old HVAC in DFW — eliminates a major objection' },
    { name: 'Landscaping refresh', cost: '$2,500–$5,000', valueAdd: '$5,000–$10,000', roi: '100–150%', note: 'DFW summer kills yards — a clean yard stands out dramatically' },
    { name: 'Bathroom refresh (not remodel)', cost: '$2,000–$4,500', valueAdd: '$4,000–$9,000', roi: '90–130%', note: 'New fixtures, mirror, lighting — no demo needed' },
    { name: 'Garage door replacement', cost: '$1,200–$2,500', valueAdd: '$3,000–$5,000', roi: '120–160%', note: 'Highest ROI home exterior upgrade in most studies' },
  ],
  mid: [
    { name: 'Kitchen remodel (mid-grade)', cost: '$18,000–$35,000', valueAdd: '$22,000–$40,000', roi: '95–115%', note: 'Buyers in this range expect updated kitchens — quartz counters + new appliances is the sweet spot' },
    { name: 'Primary bathroom remodel', cost: '$12,000–$22,000', valueAdd: '$14,000–$24,000', roi: '95–110%', note: 'Walk-in shower conversion adds real perceived value for DFW buyers' },
    { name: 'Hardwood floor refinish/add', cost: '$5,000–$12,000', valueAdd: '$8,000–$18,000', roi: '100–140%', note: 'Carpet removal + hardwood is top request from DFW buyers in this tier' },
    { name: 'Smart home package', cost: '$3,000–$6,000', valueAdd: '$5,000–$10,000', roi: '100–130%', note: 'Nest, Ring, smart locks — expected by mid-market DFW buyers' },
    { name: 'Outdoor living/deck', cost: '$12,000–$25,000', valueAdd: '$12,000–$22,000', roi: '90–100%', note: 'DFW lifestyle demand — pool alternative for mid-market' },
    { name: 'Energy package (windows + insulation)', cost: '$8,000–$16,000', valueAdd: '$9,000–$16,000', roi: '90–100%', note: 'DFW utility bills are a buyer concern — energy efficiency is a selling point' },
  ],
  upper: [
    { name: 'High-end kitchen remodel', cost: '$40,000–$80,000', valueAdd: '$35,000–$70,000', roi: '85–95%', note: 'At this tier, kitchen must match the home — sub-zero, wolf, custom cabinets expected' },
    { name: 'Pool addition', cost: '$50,000–$90,000', valueAdd: '$30,000–$60,000', roi: '60–75%', note: 'DFW pools add lifestyle value but rarely full dollar ROI — better if neighborhood already has them' },
    { name: 'Primary suite expansion', cost: '$30,000–$60,000', valueAdd: '$25,000–$50,000', roi: '80–90%', note: 'Spa bath + large closet expected at this price point in DFW market' },
    { name: 'Whole-home generator', cost: '$15,000–$28,000', valueAdd: '$15,000–$25,000', roi: '90–100%', note: 'Post-2021 winter storm, DFW buyers in this tier increasingly expect backup power' },
    { name: 'Smart home full integration', cost: '$10,000–$25,000', valueAdd: '$12,000–$22,000', roi: '90–100%', note: 'Lutron, Crestron, whole-home audio — buyers at this tier expect integration' },
    { name: 'Outdoor kitchen/living room', cost: '$25,000–$60,000', valueAdd: '$20,000–$45,000', roi: '75–90%', note: 'DFW climate makes this a true third season room — strong lifestyle appeal' },
  ],
  luxury: [
    { name: 'Wine cellar / entertainment room', cost: '$30,000–$80,000', valueAdd: '$25,000–$65,000', roi: '80–90%', note: 'Buyers at this level want unique features — wine storage adds prestige perception' },
    { name: 'Full guest house / casita', cost: '$100,000–$250,000', valueAdd: '$80,000–$180,000', roi: '75–85%', note: 'DFW luxury buyers with multi-gen households value separate guest quarters highly' },
    { name: 'Full landscape architecture', cost: '$50,000–$150,000', valueAdd: '$40,000–$120,000', roi: '75–85%', note: 'Magazine-quality landscaping is table stakes at this DFW tier' },
    { name: 'Home theater (dedicated room)', cost: '$40,000–$120,000', valueAdd: '$30,000–$80,000', roi: '70–80%', note: 'Custom built-out theater adds genuine wow factor for luxury buyers' },
    { name: 'Resort-style pool complex', cost: '$100,000–$300,000', valueAdd: '$60,000–$180,000', roi: '60–75%', note: 'At luxury tier, it\’s expected — but differentiating with grotto/lazy river adds more' },
    { name: 'Whole-home automation (Crestron)', cost: '$50,000–$150,000', valueAdd: '$40,000–$100,000', roi: '70–80%', note: 'Full integration including climate, security, AV — expected by luxury DFW buyers' },
  ],
};

export default function DFWHomeValueAdder() {
  const [homeValue, setHomeValue] = useState('');
  const [selectedTier, setSelectedTier] = useState<TierKey | ''>('');
  const [showResults, setShowResults] = useState(false);

  const getTierKey = (): TierKey => {
    const val = parseInt(homeValue.replace(/[^0-9]/g, ''));
    if (val < 325000) return 'starter';
    if (val < 500000) return 'mid';
    if (val < 750000) return 'upper';
    return 'luxury';
  };

  const activeTier: TierKey = selectedTier || (homeValue ? getTierKey() : 'mid');
  const list = improvements[activeTier];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', padding: '32px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW REAL ESTATE VALUE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Home Value Adder</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>See which improvements add the most value at your specific DFW price point — because the right move at $350K is different from $700K.</p>

        <div style={{ marginBottom: 20 }}>
          <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>💰 Approximate Home Value</div>
          <input type='text' placeholder='e.g. $425,000' value={homeValue}
            onChange={e => { setHomeValue(e.target.value); setSelectedTier(''); setShowResults(false); }}
            style={{ width: '100%', padding: '12px 14px', borderRadius: 8, background: '#0F2240', border: '1.5px solid #1E3A5F', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>📍 Or select your neighborhood tier</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {tiers.map((t, i) => {
              const key = (['starter', 'mid', 'upper', 'luxury'] as TierKey[])[i];
              return (
                <button key={key} onClick={() => { setSelectedTier(key); setHomeValue(''); setShowResults(false); }}
                  style={{ padding: '10px 14px', borderRadius: 8, border: `1.5px solid ${selectedTier === key ? '#F5E642' : '#1E3A5F'}`, background: selectedTier === key ? '#F5E642' : 'transparent', color: selectedTier === key ? '#0A1628' : '#fff', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}>
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <button onClick={() => setShowResults(true)}
          style={{ width: '100%', padding: '14px', borderRadius: 10, background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer', marginBottom: 28 }}>
          Show Best Value-Adding Improvements →
        </button>

        {showResults && (
          <div>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>🏆 Top Improvements for Your DFW Price Tier</div>
            {list.map((item, idx) => (
              <div key={idx} style={{ background: '#0F2240', borderRadius: 10, padding: '16px', marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>#{idx + 1} {item.name}</span>
                  <span style={{ background: '#0A3020', color: '#4ADE80', fontWeight: 700, borderRadius: 6, padding: '2px 10px', fontSize: 13 }}>ROI {item.roi}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                  <div style={{ color: '#94A3B8', fontSize: 13 }}>💸 Cost: <span style={{ color: '#E2E8F0' }}>{item.cost}</span></div>
                  <div style={{ color: '#94A3B8', fontSize: 13 }}>📈 Value add: <span style={{ color: '#F5E642' }}>{item.valueAdd}</span></div>
                </div>
                <div style={{ color: '#64748B', fontSize: 13 }}>{item.note}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
