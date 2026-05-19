import { useState } from 'react';

const budgets = ['Under $300K', '$300K-$450K', '$450K-$600K', '$600K-$800K', '$800K+'];
const areas = ['Frisco/McKinney', 'Plano/Allen', 'Irving/Las Colinas', 'Fort Worth/Keller', 'Arlington/Mansfield', 'Denton/Lewisville', 'Rockwall/Rowlett', 'Garland/Mesquite'];
const mustHaves = ['Top-rated schools', 'Short commute to Dallas', 'Large yard', 'New construction', 'Walkability', 'No HOA'];

function getSearchStrategy(budget: string, area: string, musts: string[]) {
  const isCompetitive = ['Frisco/McKinney','Plano/Allen'].includes(area);
  const searchRange = budget.includes('Under') ? '10% above budget — many sellers list low expecting negotiation' : 'Set alerts 8-10% above true budget max to catch deals before price drops';
  const alertSetup = isCompetitive ? 'Set alerts for NEW listings only — anything sitting 5+ days in this area has a problem. Check Zillow, Realtor.com, AND your agent MLS feed daily.' : 'Set price-reduced alerts too — motivated sellers often drop 5-8% after 21 days. Check every 2-3 days.';
  const evalSpeed = isCompetitive ? 'In this submarket: if it looks right, offer same day or next morning. Good homes are gone in 48-72 hours.' : 'Take 3-5 days to compare. This area allows deliberate search — do not let urgency be manufactured.';
  const neighborhoodCheck = 'Drive it at 7am (school traffic), 6pm (commute), and Saturday noon (neighborhood feel). Google the HOA name + complaints. Check flood zone map on FEMA.gov.';
  return { searchRange, alertSetup, evalSpeed, neighborhoodCheck };
}

export default function DFWHomeSearchStrategy() {
  const [budget, setBudget] = useState('');
  const [area, setArea] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (item: string) => setSelected(prev => prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]);
  const result = budget && area ? getSearchStrategy(budget, area, selected) : null;

  return (
    <div style={{ background: '#F8F6F1', minHeight: '100vh', color: '#1A2B3C', fontFamily: 'Georgia, serif', padding: 0 }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ borderBottom: '3px solid #1A2B3C', paddingBottom: 24, marginBottom: 40 }}>
          <p style={{ color: '#5C7A9F', letterSpacing: 3, fontSize: 11, textTransform: 'uppercase', margin: '0 0 12px' }}>DFW Buyer Guide • 2026</p>
          <h1 style={{ fontSize: 38, fontWeight: 700, margin: '0 0 16px', lineHeight: 1.15 }}>Home Search Strategy for DFW Buyers</h1>
          <p style={{ color: '#4A5568', fontSize: 17, margin: 0, lineHeight: 1.6 }}>How to search efficiently, set the right alerts, and know when to move fast versus wait.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 28 }}>
          {[['💰 Your Budget', budgets, budget, setBudget], ['📍 Target DFW Area', areas, area, setArea]].map(([label, opts, val, setter]: any) => (
            <div key={label as string}>
              <label style={{ display: 'block', color: '#1A2B3C', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>{label}</label>
              <select value={val} onChange={e => setter(e.target.value)} style={{ width: '100%', background: '#fff', border: '1.5px solid #CBD5E0', color: '#1A2B3C', padding: '12px 16px', fontSize: 15, borderRadius: 4 }}>
                <option value=''>Select...</option>
                {(opts as string[]).map((o: string) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 40 }}>
          <label style={{ display: 'block', color: '#1A2B3C', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12, fontWeight: 600 }}>✅ Must-Haves (select all that apply)</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {mustHaves.map(item => (
              <button key={item} onClick={() => toggle(item)} style={{ padding: '8px 16px', border: '1.5px solid', borderColor: selected.includes(item) ? '#1A2B3C' : '#CBD5E0', background: selected.includes(item) ? '#1A2B3C' : '#fff', color: selected.includes(item) ? '#fff' : '#4A5568', borderRadius: 20, fontSize: 13, cursor: 'pointer' }}>
                {item}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 6, padding: 32, marginBottom: 40, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#1A2B3C', fontSize: 20, margin: '0 0 24px', borderBottom: '2px solid #1A2B3C', paddingBottom: 12 }}>Your Search Strategy →</h2>
            {[['🎯 Search Price Range', result.searchRange], ['🔔 Alert Setup', result.alertSetup], ['⚡ When to Act Fast', result.evalSpeed], ['🏘️ Neighborhood Check', result.neighborhoodCheck]].map(([label, text]) => (
              <div key={label as string} style={{ borderLeft: '3px solid #1A2B3C', paddingLeft: 16, marginBottom: 20 }}>
                <div style={{ color: '#1A2B3C', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4, fontWeight: 600 }}>{label}</div>
                <div style={{ color: '#4A5568', lineHeight: 1.6 }}>{text}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#1A2B3C', color: '#F8F6F1', borderRadius: 6, padding: 24 }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 16 }}>🔑 Universal DFW Search Rules</h3>
          {['Search 10% above your true budget max — leaves negotiation room','New listing alerts beat price-reduction alerts in hot submarkets','Always verify the school district directly — boundaries shift annually','A house sitting 21+ days almost always has a reason — ask before offering'].map(rule => (
            <div key={rule} style={{ display: 'flex', gap: 12, marginBottom: 10, fontSize: 14, color: '#CBD5E0′ }}>
              <span style={{ color: '#F5E642′ }}>→</span><span>{rule}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
