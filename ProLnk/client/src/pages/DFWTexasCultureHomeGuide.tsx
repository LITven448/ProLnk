import { useState } from 'react';

const cultureData: Record<string, { elements: string[]; differences: string[] }> = {
  'Northeast-Ranch': {
    elements: ['3-car garage standard — space for truck + toys + storage', 'Mudroom entry required — Texas dust and boot culture', 'Open floor plan for Texas-size gatherings', 'Covered back patio 400+ sq ft — outdoor living room'],
    differences: ['Homes face street, not neighbor — Texas hospitality', 'No basement — clay soil and water table prevent it', 'Bigger lots than Northeast — land is cheap here', 'Front porch is decorative, back patio is life']
  },
  'Northeast-Modern': {
    elements: ['Seamless indoor-outdoor flow — glass doors to patio', 'High ceilings 10ft+ — keeps heat from feeling oppressive', 'Mudroom with boot storage — Texas clay everywhere', 'Covered outdoor space even in modern builds'],
    differences: ['Modern builds still have 2+ car garages — DFW requires it', 'Less dense than Northeast — lots are larger', 'HOAs common — neighborhood aesthetics regulated', 'No brownstones — single family dominates DFW']
  },
  'Midwest-Ranch': {
    elements: ['Similar ranch style but bigger everything', 'Stone and brick exterior — Texas weather durability', 'Large outdoor kitchen not just a grill', 'Storm shelter or safe room — tornado country'],
    differences: ['No basement — completely different from Midwest', 'Property taxes 2.5x higher — no state income tax trade-off', 'Outdoor living is year-round — 7+ months viable', 'Neighborhood kids gather at pool homes, not yards']
  },
  'Midwest-Modern': {
    elements: ['Open concept even more extreme in DFW modern', 'Smart home tech standard in new builds', 'Covered outdoor entertainment space', 'Energy efficiency critical — summer heat costs'],
    differences: ['Summer electricity bills $300-500/mo — budget for it', 'ERCOT grid — separate from national grid', 'Hail damage common — impact resistant roof worth it', 'Clay soil movement — foundation checks every few years']
  },
  'West-Ranch': {
    elements: ['Spanish tile and stone elements blend naturally', 'Xeriscape principles work here too — drought aware', 'Large covered patio with ceiling fans', 'Outdoor kitchen with smoker space'],
    differences: ['More rain than CA/AZ — lawn maintenance is real', 'Tornado risk — no earthquake prep but storm prep', 'Lower home prices per sq ft than West Coast', 'HOA restrictions more common than West']
  },
  'West-Modern': {
    elements: ['Clean lines translate perfectly to DFW modern', 'Indoor-outdoor flow even more critical in Texas heat', 'Smart HVAC — zoned cooling is standard', 'Roof deck or covered patio replaces CA rooftop'],
    differences: ['Humidity adds to heat — different than dry West', 'Less wildfire risk — different insurance profile', 'Traffic comparable to LA — plan accordingly', 'Cost of living lower — same modern for less money']
  }
};

export default function DFWTexasCultureHomeGuide() {
  const [origin, setOrigin] = useState('');
  const [style, setStyle] = useState('');
  const [result, setResult] = useState<{ elements: string[]; differences: string[] } | null>(null);

  function generate() {
    const key = `${origin}-${style}`;
    setResult(cultureData[key] || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🏠 DFW Texas Home Culture Guide</div>
        <p style={{ color: '#94a3b8', marginBottom: 32, fontSize: 16 }}>
          New to DFW? Here's why Texas homes look and live the way they do — and what to expect when you move here.
        </p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 14, display: 'block', marginBottom: 8 }}>Where are you coming from?</label>
              <select value={origin} onChange={e => setOrigin(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select region</option>
                <option value="Northeast">Northeast (NY, NJ, MA, CT)</option>
                <option value="Midwest">Midwest (IL, OH, MI, MN)</option>
                <option value="West">West Coast (CA, WA, OR)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 14, display: 'block', marginBottom: 8 }}>Home style preference?</label>
              <select value={style} onChange={e => setStyle(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select style</option>
                <option value="Ranch">Ranch / Traditional</option>
                <option value="Modern">Modern / Contemporary</option>
              </select>
            </div>
          </div>
          <button onClick={generate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Show My DFW Culture Guide 🤠
          </button>
        </div>

        {result && (
          <div>
            <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>🏡 What You'll Find in DFW</div>
              {result.elements.map((el, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                  <span style={{ color: '#F5E642', fontSize: 18 }}>⭐</span>
                  <span style={{ color: '#e2e8f0', fontSize: 15 }}>{el}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>🔄 What's Different From Where You're From</div>
              {result.differences.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 18 }}>⚡</span>
                  <span style={{ color: '#e2e8f0', fontSize: 15 }}>{d}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginTop: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 12 }}>🤠 Texas Home Truths</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['Garage is sacred — 3-car is normal', 'Mudroom is not optional in DFW', 'Back patio is your living room 7 months/year', 'Open floor plan — Texas loves to entertain'].map((t, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 12, color: '#94a3b8', fontSize: 14 }}>{t}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
