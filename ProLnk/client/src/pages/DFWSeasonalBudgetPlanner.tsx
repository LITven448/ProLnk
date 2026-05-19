import { useState } from 'react';

const homeTypes = ['Single family (slab)', 'Single family (pier & beam)', 'Townhome', 'Condo'];
const features = ['Pool', 'Large yard (1/4 acre+)', 'Old plumbing (pre-1990)', 'Flat/low-slope roof', 'Sprinkler system', 'Fireplace'];

const baseBudget: Record<string, number[]> = {
  'Jan': [0, 0, 80, 0, 0, 0, 0, 0, 0, 0, 0, 200],
  'Feb': [0, 0, 80, 0, 0, 0, 0, 0, 0, 0, 0, 200],
  'Mar': [200, 0, 80, 0, 120, 0, 0, 0, 0, 0, 0, 200],
  'Apr': [0, 150, 80, 0, 120, 0, 0, 0, 0, 0, 0, 0],
  'May': [0, 150, 80, 0, 0, 80, 0, 0, 0, 0, 0, 0],
  'Jun': [0, 0, 80, 0, 0, 80, 0, 0, 0, 0, 0, 0],
  'Jul': [0, 0, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  'Aug': [180, 0, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  'Sep': [0, 0, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  'Oct': [0, 0, 80, 150, 0, 0, 0, 0, 0, 0, 0, 0],
  'Nov': [0, 0, 80, 0, 0, 0, 0, 0, 0, 0, 250, 0],
  'Dec': [0, 0, 80, 0, 0, 0, 0, 0, 0, 0, 0, 200],
};

const labels = ['HVAC tune-up', 'Pest control', 'Filter/monthly', 'Gutter cleaning', 'Sprinkler startup', 'Landscaping', '', '', '', '', 'Pre-winter check', 'Holiday/misc'];

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const featureAdders: Record<string, Partial<Record<string, number>>> = {
  'Pool': { 'Mar': 200, 'Apr': 150, 'May': 150, 'Jun': 100, 'Jul': 100, 'Aug': 100, 'Sep': 100, 'Oct': 150 },
  'Large yard (1/4 acre+)': { 'Apr': 100, 'May': 100, 'Jun': 100, 'Jul': 100, 'Aug': 100, 'Sep': 80, 'Oct': 80 },
  'Old plumbing (pre-1990)': { 'Jan': 50, 'Apr': 50, 'Jul': 50, 'Oct': 50 },
  'Flat/low-slope roof': { 'Mar': 100, 'Sep': 100 },
  'Sprinkler system': { 'Mar': 80, 'Sep': 60, 'Nov': 60 },
  'Fireplace': { 'Oct': 120, 'Nov': 80 },
};

export default function DFWSeasonalBudgetPlanner() {
  const [homeType, setHomeType] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleFeature = (f: string) => {
    setSelectedFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  };

  const getMonthTotal = (month: string) => {
    const base = baseBudget[month].reduce((a, b) => a + b, 0);
    const extras = selectedFeatures.reduce((sum, f) => sum + (featureAdders[f]?.[month] || 0), 0);
    return base + extras;
  };

  const getMonthItems = (month: string) => {
    const items: string[] = [];
    baseBudget[month].forEach((amt, i) => { if (amt > 0 && labels[i]) items.push(`${labels[i]} (~$${amt})`); });
    selectedFeatures.forEach(f => { const add = featureAdders[f]?.[month]; if (add) items.push(`${f} (~$${add})`); });
    return items;
  };

  const annualTotal = monthNames.reduce((sum, m) => sum + getMonthTotal(m), 0);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', padding: '32px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW SEASONAL PLANNING</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Seasonal Budget Planner</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>DFW-specific maintenance calendar. Select your home type and features for a monthly budget breakdown.</p>

        <div style={{ marginBottom: 20 }}>
          <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>🏡 Home Type</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {homeTypes.map(h => (
              <button key={h} onClick={() => { setHomeType(h); setShowCalendar(false); }}
                style={{ padding: '8px 14px', borderRadius: 8, border: `1.5px solid ${homeType === h ? '#F5E642' : '#1E3A5F'}`, background: homeType === h ? '#F5E642' : 'transparent', color: homeType === h ? '#0A1628' : '#fff', fontWeight: 600, cursor: 'pointer' }}>
                {h}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>✨ Special Features</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {features.map(f => (
              <button key={f} onClick={() => { toggleFeature(f); setShowCalendar(false); }}
                style={{ padding: '8px 14px', borderRadius: 8, border: `1.5px solid ${selectedFeatures.includes(f) ? '#F5E642' : '#1E3A5F'}`, background: selectedFeatures.includes(f) ? '#F5E642' : 'transparent', color: selectedFeatures.includes(f) ? '#0A1628' : '#fff', fontWeight: 600, cursor: 'pointer' }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <button onClick={() => setShowCalendar(!!homeType)}
          style={{ width: '100%', padding: '14px', borderRadius: 10, background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer', marginBottom: 28 }}>
          Build My DFW Maintenance Calendar →
        </button>

        {showCalendar && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>📅 Monthly Budget — {homeType}</div>
              <div style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, borderRadius: 8, padding: '6px 14px' }}>Annual: ~${annualTotal.toLocaleString()}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {monthNames.map(month => {
                const total = getMonthTotal(month);
                const items = getMonthItems(month);
                return (
                  <div key={month} style={{ background: '#0F2240', borderRadius: 10, padding: '14px', borderTop: `3px solid ${total > 200 ? '#F5E642' : total > 0 ? '#3B82F6' : '#1E3A5F'}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontWeight: 700 }}>{month}</span>
                      <span style={{ color: total > 0 ? '#F5E642' : '#475569', fontWeight: 700 }}>{total > 0 ? `~$${total}` : '$0'}</span>
                    </div>
                    {items.length > 0 ? items.map((item, i) => (
                      <div key={i} style={{ color: '#94A3B8', fontSize: 12, marginBottom: 2 }}>• {item}</div>
                    )) : <div style={{ color: '#475569', fontSize: 12 }}>Low-cost month</div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
