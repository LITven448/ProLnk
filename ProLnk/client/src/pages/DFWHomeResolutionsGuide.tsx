import { useState } from 'react';

const resolutions = [
  { id: 'hvac', label: '🌡️ Schedule HVAC Tune-Up Early', detail: 'Book by March — June appointments are gone by April in DFW. A $129 tune-up prevents a $4,800 emergency replacement in August.', trigger: 'any', ageMin: 0 },
  { id: 'foundation', label: '💧 Automate Foundation Watering', detail: 'DFW clay soil shrinks without consistent moisture. A $40 soaker hose timer runs automatically — preventing $8,000–$30,000 in foundation repairs.', trigger: 'any', ageMin: 0 },
  { id: 'sinkfund', label: '💰 Set Up Maintenance Sinking Fund', detail: 'Budget 1–2% of home value per year. A $400K home needs $333–$667/month saved. Auto-transfer day after payday — set it and forget it.', trigger: 'any', ageMin: 0 },
  { id: 'leak', label: '🚨 Install Smart Water Leak Detector', detail: 'Flo by Moen or Phyn Plus detects micro-leaks, burst pipes, and abnormal usage. DFW freeze events cost homeowners $12K average in water damage. $500 device, $50K in protection.', trigger: 'any', ageMin: 0 },
  { id: 'pest', label: '🐜 Schedule Annual Pest Control', detail: 'DFW is Formosan termite zone. Annual barrier treatment ($400–$600) vs. $10,000–$80,000 in structural damage. Schedule January when colonies are smallest.', trigger: 'any', ageMin: 0 },
  { id: 'roof', label: '🏠 Roof Inspection (15+ year homes)', detail: 'Most DFW roofs from 2005–2010 are at end of life. Get a free inspection and document condition before hail season (March–June).', trigger: 'old', ageMin: 15 },
  { id: 'electrical', label: '⚡ Electrical Panel Check (30+ year homes)', detail: 'Older panels may have Federal Pacific or Zinsco breakers — fire hazards. A $150 inspection can identify a $200K liability.', trigger: 'very_old', ageMin: 30 },
];

const features = ['Pool', 'Detached Garage', 'Irrigation System', 'Gas Appliances', 'Wood Deck'];

export default function DFWHomeResolutionsGuide() {
  const [homeAge, setHomeAge] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const age = parseInt(homeAge) || 0;

  const filtered = resolutions.filter(r => {
    if (r.trigger === 'old' && age < 15) return false;
    if (r.trigger === 'very_old' && age < 30) return false;
    return true;
  });

  const toggle = (f: string) => setSelected(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>📋</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Home Resolutions Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>The 5 most impactful home resolutions DFW homeowners can make — plus personalized picks based on your home.</p>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏡 Personalize Your Resolutions</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>HOME AGE (years)</label>
            <input type="number" value={homeAge} onChange={e => setHomeAge(e.target.value)} placeholder="e.g. 12″ style={{ backgroundColor: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '8px 12px', width: '100%', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 8 }}>HOME FEATURES</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {features.map(f => (
                <button key={f} onClick={() => toggle(f)} style={{ backgroundColor: selected.includes(f) ? '#F5E642′ : '#0A1628', color: selected.includes(f) ? '#0A1628' : '#94a3b8', border: '1px solid #1e3a5f', borderRadius: 20, padding: '6px 14px', cursor: ’pointer', fontSize: 13 }}>{f}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>✅ Your 2026 Home Resolutions</h2>
          {filtered.map((r, i) => (
            <div key={r.id} style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 12, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{i + 1}. {r.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{r.detail}</div>
            </div>
          ))}
          {selected.includes('Pool') && (
            <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 12, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>🏊 Pool: Schedule Pre-Season Service</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>Book March pool opening service now. DFW pool techs are booked 6–8 weeks out by April. Equipment inspections prevent costly mid-summer failures.</div>
            </div>
          )}
          {selected.includes('Irrigation System') && (
            <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 12, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>💦 Irrigation: Smart Controller Upgrade</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>Rain Bird or Rachio smart controllers save 30–50% on DFW water bills. Qualify for Oncor rebates up to $200.</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', backgroundColor: '#F5E642', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16 }}>Book your 2026 maintenance pros now</div>
          <div style={{ color: '#0A1628', fontSize: 13, marginTop: 4 }}>ProLnk matches you with vetted DFW contractors before they're booked out</div>
        </div>
      </div>
    </div>
  );
}
