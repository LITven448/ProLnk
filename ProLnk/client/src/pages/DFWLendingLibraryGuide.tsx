import { useState } from 'react';

const projects: Record<string, { borrow: { tool: string; from: string; tip: string }[]; buy: string[]; template: string; offer: string }> = {
  fence: {
    borrow: [
      { tool: '🔩 Post hole digger', from: 'Nextdoor / Home Depot rental', tip: 'DFW clay soil — hydraulic auger worth the rental fee' },
      { tool: '🪚 Miter saw', from: 'Nextdoor neighbor', tip: 'Post a Nextdoor request 2 weeks ahead of your weekend project' }
    ],
    buy: ['Drill/driver', 'Level', 'Safety glasses', 'Work gloves'],
    template: 'Hey neighbors! Working on replacing my back fence this weekend. Does anyone have a post hole digger or miter saw I could borrow Saturday? Happy to return it same day and contribute a six-pack! 🍺',
    offer: '🔧 Offer your drill/driver, circular saw, or wheelbarrow in return'
  },
  landscaping: {
    borrow: [
      { tool: '🌿 Tiller / cultivator', from: 'Nextdoor or ACE Hardware rental', tip: 'Spring soil prep: rent on Friday, return Sunday — usually $55/weekend' },
      { tool: '💨 Leaf blower (backpack)', from: 'Nextdoor neighbor', tip: 'Most neighbors happy to share for a few hours — just return with full tank' }
    ],
    buy: ['Hand trowel', 'Garden hose + nozzle', 'Pruning shears'],
    template: 'Hi neighbors! I’m tackling some spring landscaping this weekend and wondering if anyone has a tiller or backpack blower I could borrow for a few hours on Saturday? Happy to return it cleaned up and full of gas!',
    offer: '🌱 Offer your garden hose, wheelbarrow, or some of your seedlings/plants in return'
  },
  painting: {
    borrow: [
      { tool: '🎨 Paint sprayer', from: 'Home Depot / Nextdoor', tip: 'For fence/exterior only — practice on cardboard first. $40/day rental' },
      { tool: '🪜 Extension ladder (24–32 ft)', from: 'Nextdoor neighbor', tip: 'Almost every DFW homeowner has one — post on Nextdoor, usually free' }
    ],
    buy: ['Roller set', 'Brush set', 'Drop cloth', 'Painter’s tape'],
    template: 'Hey everyone! Painting my house exterior this weekend. Does anyone have a 24–32 ft extension ladder I could borrow? I’ll return it same day, washed off. Thanks! 🏠',
    offer: '🎨 Offer your pressure washer for prep or leftover paint for touch-ups'
  },
  cleaning: {
    borrow: [
      { tool: '💦 Pressure washer', from: 'Nextdoor — most popular DFW borrow', tip: 'DFW driveways, fences, and patios need annual pressure washing. Very commonly shared on Nextdoor' },
      { tool: '🧹 Wet/dry vac (large)', from: 'Nextdoor neighbor', tip: 'Great for garage cleanouts and flooded areas after DFW storms' }
    ],
    buy: ['Microfiber mops', 'Cleaning caddy', 'Garden hose'],
    template: 'Hey neighbors! Does anyone have a pressure washer I could borrow this Saturday to clean my driveway and back patio? Would return it same day all cleaned up. Will bring it back with a full tank! 💦',
    offer: '🏠 Offer to power wash their driveway too while you have it — makes borrowing frictionless'
  }
};

const projectList = [
  { key: 'fence', label: '🪵 Fence / Deck' },
  { key: 'landscaping', label: '🌿 Landscaping' },
  { key: 'painting', label: '🎨 Painting' },
  { key: 'cleaning', label: '💦 Cleaning / Wash' }
];

export default function DFWLendingLibraryGuide() {
  const [project, setProject] = useState('');
  const data = project ? projects[project] : null;

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', color: '#1E293B', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#7C3AED', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOMEOWNER RESOURCE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>🏘️ DFW Tool Lending Library Guide</h1>
        <p style={{ color: '#64748B', marginBottom: 32 }}>Borrow before you buy. DFW neighborhoods share more than you think — here's how to tap in.</p>

        <div style={{ background: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>🏘️ Nextdoor Is Your Best Hardware Store</div>
          <div style={{ color: '#374151', fontSize: 14 }}>DFW suburbs have active Nextdoor communities. Most requests for tools get answered within hours. The unwritten rule: return it clean, return it full (of gas/charge), and offer something in return.</div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>What's your project?</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {projectList.map(p => (
              <button key={p.key} onClick={() => setProject(p.key)} style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontSize: 14, fontWeight: 600, borderColor: project === p.key ? '#7C3AED' : '#E2E8F0', background: project === p.key ? '#F5F3FF' : '#FFFFFF', color: project === p.key ? '#7C3AED' : '#64748B' }}>{p.label}</button>
            ))}
          </div>
        </div>

        {data && (
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 16 }}>📦 Tools to Borrow</h3>
              {data.borrow.map(b => (
                <div key={b.tool} style={{ background: '#F8FAFC', borderRadius: 8, padding: 14, marginBottom: 10 }}>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{b.tool}</div>
                  <div style={{ fontSize: 12, color: '#7C3AED', marginBottom: 4 }}>📍 From: {b.from}</div>
                  <div style={{ fontSize: 13, color: '#64748B' }}>💡 {b.tip}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 12 }}>🛒 Worth Buying</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {data.buy.map(b => <span key={b} style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 20, padding: '6px 14px', fontSize: 13 }}>{b}</span>)}
              </div>
            </div>
            <div style={{ background: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: 12, padding: 24 }}>
              <h3 style={{ fontWeight: 700, color: '#7C3AED', marginBottom: 12 }}>📝 Nextdoor Post Template</h3>
              <div style={{ background: '#FFFFFF', borderRadius: 8, padding: 16, fontSize: 14, color: '#374151', lineHeight: 1.6, fontStyle: 'italic' }}>"{data.template}"</div>
            </div>
            <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>🎁 What to Offer in Return</div>
              <div style={{ fontSize: 14, color: '#374151' }}>{data.offer}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
