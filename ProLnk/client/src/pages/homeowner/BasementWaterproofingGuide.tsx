import { useState } from 'react';

type Situation = {
  keywords: string[];
  cause: string;
  solution: string;
  cost: string;
};

const situations: Situation[] = [
  {
    keywords: ['crawl', 'musty', 'humid', 'smell'],
    cause: 'Crawl Space Moisture — Ground vapor rising into unconditioned space, causing humidity and mold growth.',
    solution: 'Install a 20-mil vapor barrier across the entire crawl space floor. For severe cases, full encapsulation (sealed walls + dehumidifier) is the permanent fix.',
    cost: 'Vapor barrier: $500–$2,500. Full encapsulation: $5,000–$15,000.',
  },
  {
    keywords: ['storm', 'shelter', 'safe room', 'condensation', 'sweating'],
    cause: 'Storm Shelter Condensation — DFW humidity causes moisture to condense on cooled concrete walls and floors during summer.',
    solution: 'Install a dehumidifier rated for the space. Seal walls with waterproof masonry paint. Add ventilation if possible. Keep the door slightly ajar when not in use.',
    cost: 'Dehumidifier: $200–$600. Wall sealing: $300–$800. Total: $500–$1,400.',
  },
  {
    keywords: ['slab', 'edge', 'corner', 'crack', 'floor'],
    cause: 'Slab Edge Water Intrusion — Common in homes 20+ years old. Water infiltrates where the slab meets foundation walls or through hairline slab cracks.',
    solution: 'Address exterior grading first (slope away from home). Then seal interior slab edges with hydraulic cement or epoxy injection. French drain may be needed for chronic cases.',
    cost: 'Grading fix: $200–$800. Epoxy injection: $500–$2,000. French drain: $1,500–$5,000.',
  },
  {
    keywords: ['brick', 'wall', 'white', 'powder', 'salt', 'efflorescence'],
    cause: 'Efflorescence / Rising Damp — Salt deposits left behind as water moves through brick or block walls. Indicates active water migration through the masonry.',
    solution: 'Clean efflorescence with muriatic acid solution. Apply masonry waterproof sealer. Repoint deteriorated mortar joints. Address exterior drainage to reduce water pressure on walls.',
    cost: 'Cleaning + sealing: $400–$1,200. Tuckpointing: $500–$2,500 depending on area.',
  },
  {
    keywords: ['yard', 'puddle', 'standing water', 'drainage', 'flood'],
    cause: 'Poor Exterior Drainage — Water pooling near foundation is the #1 cause of moisture problems. DFW clay soil absorbs slowly, directing water toward your home.',
    solution: 'French drain system to redirect water. Regrade yard to slope away from foundation (6 inches over 10 feet minimum). Extend downspouts at least 6 feet from home.',
    cost: 'Regrading: $500–$2,000. French drain: $1,500–$5,000. Downspout extensions: $50–$200.',
  },
  {
    keywords: ['sump', 'pump', 'backup', 'battery'],
    cause: 'Sump Pump Question — If you have or are considering a sump pump for water management.',
    solution: 'Install a 1/2 HP sump pump with battery backup. Test quarterly by pouring water into the pit. DFW storms knock out power — battery backup is non-negotiable. Replace battery every 3-5 years.',
    cost: 'Sump pump installed: $300–$800. Battery backup system: $200–$500. Annual maintenance: $100.',
  },
];

export default function BasementWaterproofingGuide() {
  const [description, setDescription] = useState('');
  const [result, setResult] = useState<Situation | null>(null);
  const [searched, setSearched] = useState(false);

  const analyze = () => {
    const lower = description.toLowerCase();
    const found = situations.find(s => s.keywords.some(k => lower.includes(k)));
    setResult(found || null);
    setSearched(true);
  };

  return (
    <div style={{ background: '#0a0f0a', minHeight: '100vh', color: '#f1f5f9', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#4ade80', textTransform: 'uppercase', letterSpacing: 1 }}>DFW Home Guide</div>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#f1f5f9', marginBottom: 16, lineHeight: 1.2 }}>
          DFW Basement & Crawl Space Waterproofing Guide
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 48, lineHeight: 1.7 }}>
          DFW has very few true basements — expansive clay soil makes them rare and expensive. However, crawl spaces, slab foundations, and storm rooms create unique moisture challenges that every DFW homeowner needs to understand.
        </p>

        {/* Common Problems */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', marginBottom: 24 }}>🌊 Common DFW Moisture Problems</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              {
                type: 'Crawl Space Moisture',
                problem: 'Ground moisture, humidity, and mold growth.',
                solution: 'Vapor barrier ($500–$2,500) or full encapsulation ($5,000–$15,000).',
                icon: '🕳️',
              },
              {
                type: 'Storm Shelter / Safe Room',
                problem: 'Condensation during humid DFW months.',
                solution: 'Dehumidifier + sealed walls. Non-negotiable for comfort and air quality.',
                icon: '⛈️',
              },
              {
                type: 'Slab Foundation',
                problem: 'Water intrusion at slab edges common in older homes. The slab itself isn’t the issue — the perimeter joint is.',
                solution: 'Exterior grading correction + interior slab edge sealing with hydraulic cement.',
                icon: '🏗️',
              },
              {
                type: 'Interior Brick Walls',
                problem: 'Rising damp in brick homes where mortar fails. White powder (efflorescence) = salt deposits from water movement.',
                solution: 'Clean efflorescence, seal masonry, repoint deteriorated mortar, improve exterior drainage.',
                icon: '🧱',
              },
            ].map(item => (
              <div key={item.type} style={{ background: '#111a11', border: '1px solid #1a2a1a', borderRadius: 12, padding: 20, display: 'flex', gap: 16 }}>
                <div style={{ fontSize: 28, flexShrink: 0, marginTop: 2 }}>{item.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#f8fafc', marginBottom: 6 }}>{item.type}</div>
                  <div style={{ color: '#ef4444', fontSize: 13, marginBottom: 8 }}>Problem: {item.problem}</div>
                  <div style={{ color: '#4ade80', fontSize: 13 }}>Solution: {item.solution}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* French Drain Systems */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', marginBottom: 24 }}>🌿 French Drain Systems for DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#111a11', border: '1px solid #1a2a1a', borderRadius: 12, padding: 24 }}>
              <div style={{ fontWeight: 700, color: '#f8fafc', marginBottom: 8 }}>Interior Drainage System</div>
              <div style={{ color: '#4ade80', fontSize: 15, fontWeight: 700, marginBottom: 10 }}>$3,000–$8,000</div>
              <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>Channels water that enters through the perimeter to a sump pump that removes it from the home. Installed inside the home along the foundation walls. Most effective for active water intrusion.</p>
            </div>
            <div style={{ background: '#111a11', border: '1px solid #1a2a1a', borderRadius: 12, padding: 24 }}>
              <div style={{ fontWeight: 700, color: '#f8fafc', marginBottom: 8 }}>Exterior French Drain</div>
              <div style={{ color: '#4ade80', fontSize: 15, fontWeight: 700, marginBottom: 10 }}>$1,500–$5,000</div>
              <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>Redirects surface and subsurface water away from the home before it reaches the foundation. Best for yards with pooling water or grading that slopes toward the house. Preventive, not reactive.</p>
            </div>
          </div>
        </section>

        {/* Sump Pump */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', marginBottom: 24 }}>💧 Sump Pump Guide</h2>
          <div style={{ background: '#111a11', border: '1px solid #1a2a1a', borderRadius: 12, padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
              <div style={{ textAlign: 'center', padding: 16, background: '#0a0f0a', borderRadius: 8 }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#4ade80′ }}>$300–$800</div>
                <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>Installed Cost</div>
              </div>
              <div style={{ textAlign: 'center', padding: 16, background: '#0a0f0a', borderRadius: 8 }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#4ade80′ }}>Quarterly</div>
                <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>Test Frequency</div>
              </div>
              <div style={{ textAlign: 'center', padding: 16, background: '#0a0f0a', borderRadius: 8 }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#f97316′ }}>Battery Backup</div>
                <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>Essential for DFW</div>
              </div>
            </div>
            <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              Battery backup is non-negotiable in DFW — storms that bring the most water also knock out power. A sump pump without battery backup is a sump pump that fails exactly when you need it most. Replace the battery every 3–5 years regardless of how often it's used.
            </p>
          </div>
        </section>

        {/* Waterproof vs Drainage */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', marginBottom: 24 }}>🔑 Waterproofing vs. Drainage — Know the Difference</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#111a11', border: '1px solid #4ade8033', borderRadius: 12, padding: 24 }}>
              <div style={{ color: '#4ade80', fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Use WATERPROOFING when...</div>
              <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>Water is actually penetrating through walls or floors. Coatings, membranes, and sealers create a physical barrier. Examples: masonry waterproof paint, hydraulic cement, epoxy injection into cracks.</p>
            </div>
            <div style={{ background: '#111a11', border: '1px solid #60a5fa33', borderRadius: 12, padding: 24 }}>
              <div style={{ color: '#60a5fa', fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Use DRAINAGE when...</div>
              <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>Water is approaching the home from the outside. French drains, regrading, and downspout extensions redirect water before it ever reaches your foundation. Always fix drainage first — it's cheaper and more effective.</p>
            </div>
          </div>
        </section>

        {/* Interactive Assessment */}
        <section style={{ background: '#111a11', border: '1px solid #1a2a1a', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', marginBottom: 8 }}>🔍 Moisture Problem Assessment</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 24 }}>Describe your moisture situation in your own words — we'll identify the likely cause, recommended solution, and cost estimate.</p>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="e.g., I have white powder on my brick walls in the corner of my living room... or my crawl space smells musty after rain..."
            rows={4}
            style={{ width: '100%', background: '#0a0f0a', border: '1px solid #2a2a2a', borderRadius: 10, color: '#f1f5f9', padding: '14px 16px', fontSize: 14, lineHeight: 1.6, resize: 'vertical', boxSizing: 'border-box' }}
          />
          <button
            onClick={analyze}
            style={{ marginTop: 16, background: '#16a34a', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
          >
            Analyze My Situation
          </button>

          {searched && (
            <div style={{ marginTop: 24, background: '#0a0f0a', borderRadius: 12, padding: 24, border: '1px solid #2a2a2a' }}>
              {result ? (
                <>
                  <div style={{ color: '#4ade80', fontWeight: 700, fontSize: 14, marginBottom: 12 }}>DIAGNOSIS</div>
                  <div style={{ color: '#f8fafc', fontWeight: 600, marginBottom: 8 }}>{result.cause}</div>
                  <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>
                    <strong style={{ color: '#60a5fa' }}>Recommended Solution:</strong> {result.solution}
                  </div>
                  <div style={{ color: '#4ade80', fontWeight: 700, fontSize: 14 }}>💰 Typical Cost: {result.cost}</div>
                </>
              ) : (
                <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>
                  Your situation is unique enough that we recommend an in-person assessment. Try describing symptoms like: white powder on walls, musty smell, standing water in yard, condensation on walls, or water near the foundation edge.
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
