import { useState } from 'react';

const trades = ['HVAC', 'Roofing', 'Plumbing', 'Electrical', 'Landscaping', 'Painting', 'General Contractor'];

type MonthData = { month: string; level: 'Peak' | 'High' | 'Moderate' | 'Slow'; index: number };
type SeasonalRec = { months: MonthData[]; slowPrep: string[]; prolnkRole: string };

const seasonalData: Record<string, SeasonalRec> = {
  'HVAC': {
    months: [
      { month: 'Jan', level: 'Moderate', index: 55 }, { month: 'Feb', level: 'Moderate', index: 50 },
      { month: 'Mar', level: 'High', index: 70 }, { month: 'Apr', level: 'High', index: 80 },
      { month: 'May', level: 'Peak', index: 95 }, { month: 'Jun', level: 'Peak', index: 100 },
      { month: 'Jul', level: 'Peak', index: 100 }, { month: 'Aug', level: 'Peak', index: 98 },
      { month: 'Sep', level: 'High', index: 75 }, { month: 'Oct', level: 'Moderate', index: 60 },
      { month: 'Nov', level: 'Slow', index: 40 }, { month: 'Dec', level: 'Slow', index: 35 },
    ],
    slowPrep: ['Nov-Feb: Schedule system checkups and maintenance agreements', 'Build your maintenance contract book during slow months — recurring revenue smooths income', 'Pursue commercial accounts (office buildings, restaurants) — they need year-round HVAC', 'Use slow months for technician training and certifications', 'Stockpile equipment before April price increases'],
    prolnkRole: 'ProLnk routes HVAC leads based on urgency and weather data. During peak months (May-August), you receive same-day emergency leads. During slow months, ProLnk surfaces homeowners planning system upgrades and maintenance — keeping your pipeline warm year-round.',
  },
  'Roofing': {
    months: [
      { month: 'Jan', level: 'Slow', index: 30 }, { month: 'Feb', level: 'Slow', index: 35 },
      { month: 'Mar', level: 'Moderate', index: 60 }, { month: 'Apr', level: 'Peak', index: 100 },
      { month: 'May', level: 'Peak', index: 95 }, { month: 'Jun', level: 'High', index: 80 },
      { month: 'Jul', level: 'High', index: 75 }, { month: 'Aug', level: 'Moderate', index: 65 },
      { month: 'Sep', level: 'Moderate', index: 60 }, { month: 'Oct', level: 'Peak', index: 90 },
      { month: 'Nov', level: 'High', index: 70 }, { month: 'Dec', level: 'Slow', index: 30 },
    ],
    slowPrep: ['DFW roofing has TWO peak seasons: hail season (Apr-May) and pre-winter (Oct-Nov)', 'January-February: equipment maintenance, crew training, material supplier negotiations', 'Build commercial roofing relationships — commercial work is less seasonal', 'Insurance restoration work fills gaps — build adjuster relationships now', 'Use slow months to pursue HOA contracts for neighborhood re-roofing projects'],
    prolnkRole: 'ProLnk tracks weather events and routes hail damage leads immediately after storms. Roofing pros with complete ProLnk profiles receive storm surge leads before the competition. Slow-season leads target homeowners planning proactive replacement.',
  },
  'Plumbing': {
    months: [
      { month: 'Jan', level: 'Moderate', index: 65 }, { month: 'Feb', level: 'Peak', index: 100 },
      { month: 'Mar', level: 'High', index: 75 }, { month: 'Apr', level: 'High', index: 70 },
      { month: 'May', level: 'Moderate', index: 60 }, { month: 'Jun', level: 'Moderate', index: 55 },
      { month: 'Jul', level: 'Moderate', index: 55 }, { month: 'Aug', level: 'Moderate', index: 55 },
      { month: 'Sep', level: 'Moderate', index: 60 }, { month: 'Oct', level: 'High', index: 70 },
      { month: 'Nov', level: 'High', index: 75 }, { month: 'Dec', level: 'High', index: 80 },
    ],
    slowPrep: ['DFW had a catastrophic pipe freeze in Feb 2021 (Uri) — February is unpredictable peak', 'Summer is actually moderate — use for remodel/renovation plumbing (planned work)', 'Build relationships with remodeling contractors for consistent summer work', 'Water heater replacements are year-round — market proactively in Oct-Nov before winter', 'Commercial plumbing maintenance agreements provide stable base income'],
    prolnkRole: 'ProLnk routes emergency plumbing leads 24/7/365. Freeze events create immediate surge — ProLnk pros who are available and responsive during freeze events earn their highest income of the year in a 72-hour window. Keep your availability updated.',
  },
  'Landscaping': {
    months: [
      { month: 'Jan', level: 'Slow', index: 25 }, { month: 'Feb', level: 'Slow', index: 30 },
      { month: 'Mar', level: 'High', index: 80 }, { month: 'Apr', level: 'Peak', index: 100 },
      { month: 'May', level: 'Peak', index: 95 }, { month: 'Jun', level: 'High', index: 85 },
      { month: 'Jul', level: 'Moderate', index: 65 }, { month: 'Aug', level: 'Moderate', index: 60 },
      { month: 'Sep', level: 'High', index: 80 }, { month: 'Oct', level: 'High', index: 85 },
      { month: 'Nov', level: 'Moderate', index: 55 }, { month: 'Dec', level: 'Slow', index: 25 },
    ],
    slowPrep: ['December-February: equipment servicing, crew training, annual contracts renewal push', 'Sell annual maintenance contracts in fall — lock in clients before spring', 'Christmas light installation (Nov-Dec) fills the gap for many DFW landscapers', 'Irrigation winterization in November is a short but high-volume service window', 'Use January for planning commercial landscape bids — they go out in Q1'],
    prolnkRole: 'ProLnk surfaces landscaping leads year-round. Spring surge (March-May) generates the highest volume. Annual maintenance contract leads from ProLnk convert to recurring revenue. ProLnk tracks service history so you can upsell existing homeowners automatically.',
  },
};

const defaultRec: SeasonalRec = {
  months: [
    { month: 'Jan', level: 'Slow', index: 40 }, { month: 'Feb', level: 'Slow', index: 40 },
    { month: 'Mar', level: 'Moderate', index: 65 }, { month: 'Apr', level: 'High', index: 80 },
    { month: 'May', level: 'Peak', index: 95 }, { month: 'Jun', level: 'Peak', index: 100 },
    { month: 'Jul', level: 'High', index: 85 }, { month: 'Aug', level: 'High', index: 80 },
    { month: 'Sep', level: 'Moderate', index: 70 }, { month: 'Oct', level: 'High', index: 80 },
    { month: 'Nov', level: 'Moderate', index: 60 }, { month: 'Dec', level: 'Slow', index: 35 },
  ],
  slowPrep: ['Build an emergency fund covering 3 months of operating costs during peak months', 'Pursue maintenance agreements and recurring service contracts', 'Market proactively to existing customers — retention is cheaper than acquisition', 'Use slow months for training, certifications, and equipment upgrades', 'Diversify your service offerings to cover multiple seasons'],
  prolnkRole: 'ProLnk provides consistent lead flow throughout the year by matching you with homeowners in your service area who are actively seeking your trade. During slow months, ProLnk surfaces planned project leads — homeowners who are budgeting for future work. Your consistent availability on ProLnk keeps income flowing year-round.',
};

const levelColors: Record<string, string> = { Peak: '#22c55e', High: '#84cc16', Moderate: '#eab308', Slow: '#ef4444' };

export default function DFWContractorSeasonalIncome() {
  const [trade, setTrade] = useState('');
  const [result, setResult] = useState<SeasonalRec | null>(null);

  const handleGenerate = () => {
    setResult(seasonalData[trade] ?? defaultRec);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '4px 12px', borderRadius: '4px', fontSize: '0.75rem', letterSpacing: '0.1em' }}>PROLNK PRO GUIDE</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '1rem', color: '#fff' }}>📅 DFW Contractor Seasonal Income Guide</h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem', lineHeight: 1.7 }}>DFW contractor income is not steady — it swings dramatically by season and trade. The pros who build wealth understand their seasonal curve and plan ahead. Here's your trade-specific income forecast.</p>
        </div>

        <div style={{ background: '#111f3a', borderRadius: '12px', padding: '1.75rem', border: '1px solid #1e3a5f', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1.25rem', fontSize: '1.1rem' }}>📊 Get Your Seasonal Income Forecast</h2>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Your Trade</label>
              <select value={trade} onChange={(e) => setTrade(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: '6px', padding: '0.6rem', fontSize: '0.95rem' }}>
                <option value=''>Select trade...</option>
                {trades.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <button onClick={handleGenerate} disabled={!trade} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: '6px', padding: '0.7rem 1.5rem', cursor: trade ? 'pointer' : 'not-allowed', opacity: trade ? 1 : 0.5, whiteSpace: 'nowrap' }}>Show Forecast →</button>
          </div>
          {result && (
            <div style={{ marginTop: '1.5rem', borderTop: '1px solid #1e3a5f', paddingTop: '1.25rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.75rem' }}>MONTHLY INCOME INDEX (100 = Peak Month)</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4px' }}>
                  {result.months.map((m) => (
                    <div key={m.month} style={{ textAlign: 'center' }}>
                      <div style={{ background: '#0A1628', borderRadius: '4px', height: '80px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginBottom: '4px', border: '1px solid #1e3a5f', overflow: 'hidden' }}>
                        <div style={{ width: '100%', height: `${m.index}%`, background: levelColors[m.level], transition: 'height 0.3s' }} />
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{m.month}</div>
                      <div style={{ fontSize: '0.65rem', color: levelColors[m.level], fontWeight: 700 }}>{m.level}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                  {Object.entries(levelColors).map(([level, color]) => <div key={level} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#94a3b8' }}><div style={{ width: '12px', height: '12px', background: color, borderRadius: '2px' }} />{level}</div>)}
                </div>
              </div>
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>HOW TO PREPARE FOR SLOW MONTHS</div>
                {result.slowPrep.map((tip) => <div key={tip} style={{ color: '#e2e8f0', fontSize: '0.9rem', padding: '0.4rem 0', borderBottom: '1px solid #1e3a5f' }}>💡 {tip}</div>)}
              </div>
              <div style={{ background: '#0d1f3c', borderRadius: '6px', padding: '1rem', border: '1px solid #F5E642' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>🔗 PROLNK'S ROLE IN YOUR INCOME</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>{result.prolnkRole}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#111f3a', borderRadius: '8px', padding: '1.25rem', border: '1px solid #1e3a5f', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🏦 The 3-3-3 Income Smoothing Rule</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            {[{ num: '33%', label: 'Save during peak months', desc: 'Build 3-month operating reserve before December' }, { num: '33%', label: 'Invest in growth', desc: 'Equipment, marketing, staff during high-volume periods' }, { num: '33%', label: 'Operating + owner pay', desc: 'Live on this. The rest is insurance against slow months' }].map((item) => (
              <div key={item.num} style={{ textAlign: 'center', padding: '0.75rem', background: '#0d1f3c', borderRadius: '6px' }}>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.5rem' }}>{item.num}</div>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.3rem' }}>{item.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0d1f3c', borderRadius: '8px', padding: '1.25rem', border: '1px solid #F5E642' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>💡 ProLnk Pro Tip</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>ProLnk pros who maintain an active profile year-round — even during slow months — receive 67% more leads than pros who go inactive. Homeowners plan ahead. The pro they find in December for a March project is already booked when the season starts. Stay visible, stay booked.</div>
        </div>
      </div>
    </div>
  );
}
