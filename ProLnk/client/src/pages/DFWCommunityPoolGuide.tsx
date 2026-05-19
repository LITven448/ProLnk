import { useState } from 'react';

const poolCostData: Record<string, Record<string, { annualCost: string; perHome: string; whatsCovered: string[]; watchFor: string[] }>> = {
  Small: {
    Basic: {
      annualCost: '$25,000–$45,000',
      perHome: '$80–$180/year per home',
      whatsCovered: ['Seasonal opening/closing', 'Chemical treatment', 'Lifeguard (if applicable)', 'Minor equipment repairs'],
      watchFor: ['Deferred resurfacing costs', 'Aging equipment not in reserve fund', 'No lifeguard = liability exposure'],
    },
    Premium: {
      annualCost: '$45,000–$80,000',
      perHome: '$150–$300/year per home',
      whatsCovered: ['Year-round heated pool', 'Lifeguard staff', 'Full chemical program', 'Splash pad or amenities'],
      watchFor: ['High staffing costs eating reserves', 'Splash pad repairs not funded', 'Check reserve study age'],
    },
  },
  Large: {
    Basic: {
      annualCost: '$80,000–$150,000',
      perHome: '$100–$250/year per home',
      whatsCovered: ['Main pool + lap pool operation', 'Chemical program', 'Seasonal staffing', 'Equipment maintenance'],
      watchFor: ['Multiple pools = multiple resurfacing cycles', 'Pump and heater replacement schedule', 'Storm damage history'],
    },
    Premium: {
      annualCost: '$150,000–$300,000',
      perHome: '$200–$500/year per home',
      whatsCovered: ['Resort amenities', 'Full-time staff', 'Heated and cooled water', 'Events and programming'],
      watchFor: ['Large HOAs can hide cost overruns in special assessments', 'Check reserve fund adequacy %', 'Ask for 3-year budget history'],
    },
  },
};

export default function DFWCommunityPoolGuide() {
  const [hoaSize, setHoaSize] = useState('');
  const [poolType, setPoolType] = useState('');
  const [result, setResult] = useState<null | { annualCost: string; perHome: string; whatsCovered: string[]; watchFor: string[] }>(null);

  function calculate() {
    const sizeKey = hoaSize as 'Small' | 'Large';
    const typeKey = poolType as 'Basic' | 'Premium';
    if (poolCostData[sizeKey] && poolCostData[sizeKey][typeKey]) {
      setResult(poolCostData[sizeKey][typeKey]);
    }
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>🏊 DFW Community Pool Guide</div>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>What DFW HOA homeowners need to know about community pool season, costs, and what your dues are actually paying for.</p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>📅 DFW Pool Season Reality</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', color: '#94a3b8', fontSize: '0.9rem' }}>
            <div>🌡️ Typical open: Mid-April or Memorial Day</div>
            <div>❄️ Typical close: Labor Day–October 15</div>
            <div>☀️ Peak use: June–August, 90°F+ days</div>
            <div>🔒 Heated pools extend season Nov–March</div>
            <div>⚠️ Most DFW HOAs close pool Oct–April</div>
            <div>📋 Lifeguard required if pool depth &gt;5 ft in TX</div>
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>📊 HOA Financial Health Checklist</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.8 }}>
            Ask for these before buying in a pool community:
            <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem' }}>
              <li>Reserve study (should be &lt;3 years old)</li>
              <li>Reserve fund adequacy % (target 70%+ funded)</li>
              <li>Last 3 years of annual budgets</li>
              <li>Any special assessments in past 5 years</li>
              <li>Pool equipment replacement schedule</li>
              <li>Resurfacing date and next planned date</li>
            </ul>
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>💰 Estimate My Pool Cost Share</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>HOA Size</label>
              <select value={hoaSize} onChange={e => setHoaSize(e.target.value)} style={{ width: '100%', marginTop: 4, padding: '0.6rem', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 8 }}>
                <option value=''>Select...</option>
                <option value='Small'>Small (under 300 homes)</option>
                <option value='Large'>Large (300+ homes)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Pool Type</label>
              <select value={poolType} onChange={e => setPoolType(e.target.value)} style={{ width: '100%', marginTop: 4, padding: '0.6rem', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 8 }}>
                <option value=''>Select...</option>
                <option value='Basic'>Basic (seasonal, standard)</option>
                <option value='Premium'>Premium (resort-style, heated)</option>
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.7rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>Calculate My Cost Share</button>
        </div>

        {result && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>📊 Pool Cost Breakdown</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem', color: '#94a3b8', fontSize: '0.9rem' }}>
              <div><span style={{ color: '#F5E642' }}>Annual HOA Pool Cost:</span><br />{result.annualCost}</div>
              <div><span style={{ color: '#F5E642' }}>Your Estimated Share:</span><br />{result.perHome}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <div style={{ color: '#22c55e', fontSize: '0.85rem', marginBottom: '0.4rem' }}>✅ What's Covered</div>
                {result.whatsCovered.map((item, i) => <div key={i} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.7 }}>• {item}</div>)}
              </div>
              <div>
                <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '0.4rem' }}>⚠️ Watch For</div>
                {result.watchFor.map((item, i) => <div key={i} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.7 }}>• {item}</div>)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
