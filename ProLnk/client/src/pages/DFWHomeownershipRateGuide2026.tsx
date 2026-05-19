import { useState } from 'react';

const counties = [
  { id: 'collin', label: 'Collin County', icon: '🏙️', rate: '72%', cities: 'Frisco, Plano, McKinney, Allen', verdict: 'Buy', data: ['Ownership rate: 72% (well above DFW avg)', 'Frisco: 78% ownership — highest in metro', 'Median household income: $112K → strong buy conversion', 'Tech migration (Toyota, FedEx HQ) → income-to-equity conversion', 'ProLnk demand: high-end HVAC, foundation, pool service'] },
  { id: 'dallas', label: 'Dallas County', icon: '🌆', rate: '47%', cities: 'Dallas, Garland, Irving, Mesquite', verdict: 'Mixed', data: ['Dallas city proper: 44% ownership — near national low', 'Urban core renters dominate Oak Cliff, East Dallas', 'Garland and Mesquite: 58–62% ownership', 'Income gap drives rent vs. own split in south Dallas', 'ProLnk demand: plumbing, electrical, foundation repair'] },
  { id: 'tarrant', label: 'Tarrant County', icon: '🤠', rate: '61%', cities: 'Fort Worth, Arlington, Mansfield', verdict: 'Buy', data: ['Ownership rate: 61% — matches DFW average', 'Fort Worth: affordable ownership at $285K median', 'Arlington: 59% — stadium district mixed-use growth', 'Mansfield / Burleson: 70–74% ownership, family-driven', 'ProLnk demand: HVAC, roofing, general contractors'] },
  { id: 'denton', label: 'Denton County', icon: '🌾', rate: '68%', cities: 'Denton, Flower Mound, Lewisville', verdict: 'Buy', data: ['Ownership rate: 68% — above DFW average', 'Flower Mound: 76% ownership, affluent families', 'Lewisville: 54% — more rentals near college', 'New construction driving first-time buyer ownership', 'ProLnk demand: new construction punch-list, landscaping'] },
  { id: 'rockwall', label: 'Rockwall County', icon: '🏘️', rate: '76%', cities: 'Rockwall, Rowlett, Wylie', verdict: 'Buy', data: ['Highest ownership rate in DFW metro: 76%', 'Fastest appreciation in DFW 2023–2025: +9.2%/yr', 'Lake Rockwall lifestyle = premium ownership demand', 'Median household income: $98K', 'ProLnk demand: dock/boat services, HVAC, foundation'] },
];

export default function DFWHomeownershipRateGuide2026() {
  const [active, setActive] = useState('collin');
  const selected = counties.find(c => c.id === active)!;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui,sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.8rem', marginBottom: '0.4rem' }}>🏡</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', margin: 0 }}>DFW Homeownership Rate Guide 2026</h1>
          <p style={{ color: '#8899AA', marginTop: '0.5rem' }}>61% DFW avg vs. 65% national — varies widely by county and suburb</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem', marginBottom: '1rem' }}>
          {[['🇺🇸','65%','National avg ownership'],['🏙️','61%','DFW metro avg ownership'],['🏆','78%','Frisco — highest in DFW']].map(([icon,val,label],i)=>(
            <div key={i} style={{ background: '#0F2340', borderRadius: 10, padding: '0.9rem', textAlign: 'center', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: '1.4rem' }}>{icon}</div>
              <div style={{ fontWeight: 800, fontSize: '1.5rem', color: '#F5E642′ }}>{val}</div>
              <div style={{ fontSize: '0.75rem', color: '#8899AA' }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '0.6rem', marginBottom: '1.5rem', marginTop: '1.25rem' }}>
          {counties.map(c => (
            <button key={c.id} onClick={() => setActive(c.id)} style={{ background: active === c.id ? '#F5E642′ : '#0F2340', color: active === c.id ? '#0A1628' : '#E8EDF5', border: '2px solid', borderColor: active === c.id ? '#F5E642' : '#1E3A5F', borderRadius: 10, padding: '0.8rem 0.3rem', cursor: ’pointer', fontWeight: 700, fontSize: '0.8rem' }}>
              <div style={{ fontSize: '1.4rem' }}>{c.icon}</div>
              <div>{c.label.replace(' County','')}</div>
              <div style={{ fontSize: '1.1rem', color: active === c.id ? '#0A1628′ : '#F5E642', marginTop: '0.2rem' }}>{c.rate}</div>
            </button>
          ))}
        </div>

        <div style={{ background: '#0F2340', borderRadius: 14, padding: '1.75rem', border: '1px solid #1E3A5F' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ margin: 0, color: '#F5E642', fontSize: '1.4rem' }}>{selected.icon} {selected.label} — {selected.rate} ownership</h2>
              <p style={{ margin: 0, color: '#8899AA', fontSize: '0.9rem' }}>{selected.cities}</p>
            </div>
            <div style={{ background: selected.verdict === 'Buy' ? '#00C853′ : '#FF9800', color: '#0A1628', borderRadius: 8, padding: '0.3rem 0.8rem', fontWeight: 700, fontSize: '0.85rem' }}>{selected.verdict}</div>
          </div>
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            {selected.data.map((item, i) => (
              <div key={i} style={{ background: '#152A4A', borderRadius: 8, padding: '0.7rem 1rem', borderLeft: '3px solid #F5E642', fontSize: '0.9rem' }}>{item}</div>
            ))}
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#445566', fontSize: '0.75rem', marginTop: '1.5rem' }}>Sources: U.S. Census Bureau ACS, Texas A&M Real Estate Center, NCTCOG — 2026</p>
      </div>
    </div>
  );
}
