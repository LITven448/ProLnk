import { useState } from 'react';

type GapItem = { location: string; type: string; cost: string; priority: string; color: string };

function buildGapList(age: string, areas: string[]): GapItem[] {
  const gaps: GapItem[] = [];
  if (areas.includes('bathrooms')) gaps.push({ location: 'Bathrooms', type: 'GFCI outlets required within 6ft of water', cost: '$150 – $300 per bathroom', priority: 'High — NEC 210.8 requirement', color: '#FF5500' });
  if (areas.includes('kitchen')) gaps.push({ location: 'Kitchen', type: 'GFCI on all countertop outlets', cost: '$200 – $500', priority: 'High — NEC requirement', color: '#FF5500' });
  if (areas.includes('garage')) gaps.push({ location: 'Garage', type: 'GFCI on all outlets', cost: '$100 – $250', priority: 'High', color: '#FF8800' });
  if (areas.includes('outdoor')) gaps.push({ location: 'Outdoors', type: 'GFCI on all exterior outlets', cost: '$150 – $400', priority: 'High — weatherproof required', color: '#FF8800' });
  if (areas.includes('bedrooms') && (age === '1980s' || age === '1990s' || age === '2000s')) gaps.push({ location: 'Bedrooms', type: 'AFCI breakers required (lacking in pre-2009 DFW homes)', cost: '$400 – $1,200 for bedroom circuits', priority: 'Moderate — fire risk reduction', color: '#F5E642' });
  if (areas.includes('crawl')) gaps.push({ location: 'Crawl Space / Basement', type: 'GFCI required if unfinished', cost: '$100 – $200', priority: 'Moderate', color: '#F5E642' });
  if (gaps.length === 0) gaps.push({ location: 'No Major Gaps Found', type: 'Current areas appear compliant', cost: 'Verify with a licensed inspection', priority: 'Low', color: '#44BB44' });
  return gaps;
}

export default function DFWGroundFaultGuide() {
  const [homeAge, setHomeAge] = useState('');
  const [areas, setAreas] = useState<string[]>([]);
  const [result, setResult] = useState<GapItem[] | null>(null);

  const areaOptions = [
    { id: 'bathrooms', label: '🚿 Bathrooms' },
    { id: 'kitchen', label: '🍳 Kitchen' },
    { id: 'garage', label: '🚗 Garage' },
    { id: 'outdoor', label: '🌿 Outdoor / Patio' },
    { id: 'bedrooms', label: '🛏️ Bedrooms' },
    { id: 'crawl', label: '🏠 Crawl Space / Unfinished Area' },
  ];

  function toggleArea(id: string) {
    setAreas(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  }

  function assess() {
    if (!homeAge || areas.length === 0) return;
    setResult(buildGapList(homeAge, areas));
  }

  const totalCost = result ? '$' + (result.length * 200) + ' – $' + (result.length * 800) + ' estimated range' : '';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🛡️⚡</div>
          <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 700, margin: 0 }}>DFW Ground Fault & Arc Fault Guide</h1>
          <p style={{ color: '#8899BB', marginTop: 12, fontSize: 16 }}>GFCI and AFCI compliance for DFW homes — where gaps exist and what retrofit costs</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #1A3060' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>⚡ GFCI vs AFCI — The Key Difference</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, border: '1px solid #2A4070' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🌊 GFCI (Ground Fault)</div>
              <p style={{ color: '#C8D8EE', margin: 0, fontSize: 14, lineHeight: 1.7 }}>Protects against shock when electricity contacts water. Required near all water sources: bathrooms, kitchens, garages, outdoors, pools. Trips in milliseconds when current leaks to ground.</p>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, border: '1px solid #2A4070' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🔥 AFCI (Arc Fault)</div>
              <p style={{ color: '#C8D8EE', margin: 0, fontSize: 14, lineHeight: 1.7 }}>Protects against electrical fires from arc faults in walls and wiring. Required in bedrooms and living areas in new construction since 1999 (NEC 210.12). Mostly absent in DFW homes built before 2009.</p>
            </div>
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #1A3060' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>📊 DFW Electrical Fire Statistics</h2>
          <p style={{ color: '#C8D8EE', lineHeight: 1.7 }}>The Texas State Fire Marshal reports electrical failures as a top-5 cause of residential fires statewide. In DFW, the combination of aging wiring (1960s–1990s), high AC load, and lack of AFCI protection in pre-2009 homes creates elevated fire risk — particularly in North Dallas, Garland, and East Plano neighborhoods.</p>
          <p style={{ color: '#C8D8EE', lineHeight: 1.7 }}>AFCI breakers reduce bedroom electrical fires by an estimated 50% (NFPA data). Retrofitting is cost-effective insurance against a far larger loss.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #1A3060' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🧮 Compliance Gap Checker</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#8899BB', display: 'block', marginBottom: 6 }}>Home construction decade</label>
            <select value={homeAge} onChange={e => setHomeAge(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#0A1628', border: '1px solid #2A4070', color: '#E8EDF5', fontSize: 15 }}>
              <option value="">Select...</option>
              <option value="pre-1970">Before 1970</option>
              <option value="1970s">1970s</option>
              <option value="1980s">1980s</option>
              <option value="1990s">1990s</option>
              <option value="2000s">2000s</option>
              <option value="2010s+">2010 or newer</option>
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#8899BB', display: 'block', marginBottom: 8 }}>Areas lacking GFCI / AFCI protection (select all that apply)</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {areaOptions.map(opt => (
                <button key={opt.id} onClick={() => toggleArea(opt.id)} style={{ padding: '10px 14px', borderRadius: 8, border: `2px solid ${areas.includes(opt.id) ? '#F5E642' : '#2A4070'}`, background: areas.includes(opt.id) ? '#1A3060' : '#0A1628', color: '#E8EDF5', fontSize: 14, cursor: 'pointer', textAlign: 'left' }}>{opt.label}</button>
              ))}
            </div>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '12px 28px', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Show Compliance Gaps →</button>
          {result && (
            <div style={{ marginTop: 20 }}>
              {result.map((gap, i) => (
                <div key={i} style={{ background: '#0A1628', border: `1px solid ${gap.color}`, borderRadius: 10, padding: 16, marginBottom: 10 }}>
                  <div style={{ color: gap.color, fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{gap.location}</div>
                  <div style={{ color: '#C8D8EE', marginBottom: 4, fontSize: 14 }}>🔧 Fix: {gap.type}</div>
                  <div style={{ color: '#C8D8EE', marginBottom: 4, fontSize: 14 }}>💰 {gap.cost}</div>
                  <div style={{ color: '#8899BB', fontSize: 13 }}>⚠️ {gap.priority}</div>
                </div>
              ))}
              {result.length > 1 && <div style={{ color: '#F5E642', fontWeight: 700, textAlign: 'center', marginTop: 8 }}>Total estimated retrofit: {totalCost}</div>}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', background: '#F5E642', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🛡️</div>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, margin: 0 }}>Get GFCI/AFCI Retrofit Quotes from Vetted DFW Electricians via ProLnk</p>
        </div>
      </div>
    </div>
  );
}
