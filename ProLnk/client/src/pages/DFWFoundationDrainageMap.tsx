import { useState } from 'react';

const ISSUES = ['Standing water after rain', 'Downspouts drain near foundation', 'Negative grading toward house', 'Gutters overflow', 'Basement/crawl space moisture'];
const FEATURES = ['Flat lot', 'Sloped lot', 'Corner lot', 'Downhill from street', 'Uphill from street'];

type Priority = { priority: string; solution: string; cost: string; urgency: string };

const recommendations: Record<string, Priority> = {
  'Standing water after rain': { priority: '🔴 HIGH', solution: 'French drain or dry creek bed installation', cost: '$1,500–$4,000', urgency: 'Address within 30 days' },
  'Downspouts drain near foundation': { priority: '🔴 HIGH', solution: 'Extend downspouts 6+ ft with buried PVC or flex drain', cost: '$200–$600', urgency: 'DIY this weekend' },
  'Negative grading toward house': { priority: '🟡 MEDIUM', solution: 'Regrading with topsoil — 6" drop per 10 ft away from foundation', cost: '$500–$2,000', urgency: 'Before next rainy season' },
  'Gutters overflow': { priority: '🟡 MEDIUM', solution: 'Clean gutters + add gutter guards + check downspout flow', cost: '$150–$500', urgency: 'This season' },
  'Basement/crawl space moisture': { priority: '🔴 HIGH', solution: 'Interior waterproofing + sump pump or encapsulation', cost: '$3,000–$12,000', urgency: 'Professional evaluation ASAP' },
};

export default function DFWFoundationDrainageMap() {
  const [lot, setLot] = useState('');
  const [issue, setIssue] = useState('');
  const result = issue ? recommendations[issue] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '2.5rem' }}>🗺️</span>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0' }}>DFW Foundation Drainage Map Guide</h1>
          <p style={{ color: '#9CA3AF', lineHeight: 1.6 }}>
            In DFW, how water moves around your home is as important as what's under it. Poor drainage is the #1 cause of 
            preventable foundation movement. Understanding your site's drainage pattern is step one in any foundation health plan.
          </p>
        </div>

        <div style={{ backgroundColor: '#111D35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>📐 How to Map Your Drainage</h2>
          <ol style={{ color: '#CBD5E1', lineHeight: 2, paddingLeft: '1.2rem' }}>
            <li>Walk your property during or just after a heavy rain (&gt;0.5")</li>
            <li>Mark every point where water pools for 30+ minutes</li>
            <li>Trace each downspout discharge — where does it go?</li>
            <li>Check grade: place a level on a 10-ft board. You want 6" drop away from house</li>
            <li>Look for soil erosion channels — water is telling you its path</li>
          </ol>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: '✅', label: 'Good Drainage', items: ['Water flows away from house', 'No pooling within 10 ft of foundation', 'Downspouts discharge 6+ ft away', 'Gravel or mulch at drip lines'] },
            { icon: '❌', label: 'Problem Drainage', items: ['Water pools near foundation', 'Downspouts end at foundation', 'Soil slopes toward house', 'Saturated soil after 24 hrs of dry weather'] },
          ].map((col, i) => (
            <div key={i} style={{ backgroundColor: '#111D35', borderRadius: 12, padding: '1.5rem' }}>
              <h3 style={{ color: '#F5E642', marginTop: 0 }}>{col.icon} {col.label}</h3>
              <ul style={{ color: '#CBD5E1', lineHeight: 1.8, paddingLeft: '1rem' }}>
                {col.items.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111D35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🔧 Drainage Issue Evaluator</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ color: '#9CA3AF', display: 'block', marginBottom: 6 }}>Lot Type</label>
              <select value={lot} onChange={e => setLot(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, backgroundColor: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F' }}>
                <option value="">Select lot type</option>
                {FEATURES.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ color: '#9CA3AF', display: 'block', marginBottom: 6 }}>Primary Drainage Issue</label>
              <select value={issue} onChange={e => setIssue(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, backgroundColor: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F' }}>
                <option value="">Select issue</option>
                {ISSUES.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: '1.2rem', border: '1px solid #F5E642' }}>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#9CA3AF' }}>Priority: </span><strong style={{ color: '#E8EAF0' }}>{result.priority}</strong></div>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#9CA3AF' }}>Recommended Solution: </span><span style={{ color: '#F5E642' }}>{result.solution}</span></div>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#9CA3AF' }}>Estimated Cost: </span><span style={{ color: '#E8EAF0' }}>{result.cost}</span></div>
              <div><span style={{ color: '#9CA3AF' }}>Timeline: </span><span style={{ color: '#E8EAF0' }}>{result.urgency}</span></div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#111D35', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>💡 DFW-Specific Tips</h2>
          {[
            { icon: '🌧️', tip: 'DFW gets 37" rain/year — mostly in spring/fall intense storms. Your drainage must handle 2"+ in one hour.' },
            { icon: '🏗️', tip: 'Builder grading often erodes over 5–10 years. Regrade every 10 years or after large landscaping changes.' },
            { icon: '🌳', tip: 'Oak and elm trees in DFW drink enormous water — they also shade soil, slowing evaporation. Map tree locations relative to drainage.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem', padding: '0.8rem', backgroundColor: '#0A1628', borderRadius: 8 }}>
              <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
              <span style={{ color: '#CBD5E1', lineHeight: 1.6 }}>{item.tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
