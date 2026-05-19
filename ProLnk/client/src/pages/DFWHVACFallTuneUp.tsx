import { useState } from 'react';

const homeTypes = ['Single-story slab foundation', 'Two-story with upstairs unit', 'Home with gas furnace', 'Home with heat pump (no gas)', 'Older home (15+ years old)'];
const heatingTypes = ['Gas furnace (most common DFW)', 'Heat pump only (electric)', 'Dual-fuel (heat pump + gas backup)', 'Electric strip heat', 'Not sure'];

const fallItems = [
  { task: 'Heat exchanger inspection for cracks', urgency: 'LIFE SAFETY', note: 'CO leaks from cracked exchangers — February ice storms mean furnace runs hard; find cracks now', season: 'heating' },
  { task: 'Gas pressure and burner inspection', urgency: 'HIGH', note: 'DFW natural gas demand spikes in February — proper combustion prevents carbon monoxide', season: 'heating' },
  { task: 'Ignitor and flame sensor test', urgency: 'HIGH', note: 'February 2021 proved DFW winters are real — ignitor failure in ice storm = frozen pipes', season: 'heating' },
  { task: 'Heat pump reversing valve test', urgency: 'HIGH', note: 'Reversing valve stuck in cooling mode means no heat — test before first cold snap', season: 'heat pump' },
  { task: 'Thermostat heat mode changeover test', urgency: 'MEDIUM', note: 'Many DFW thermostats haven\’t been in heat mode since March — test the full cycle', season: 'all' },
  { task: 'Condensate drain winterization check', urgency: 'MEDIUM', note: 'DFW freeze events can crack condensate lines — ensure drain slope is adequate', season: 'all' },
  { task: 'Refrigerant check (heat pump systems)', urgency: 'MEDIUM', note: 'Heat pumps move refrigerant both ways — low charge reduces heating efficiency 30%+', season: 'heat pump' },
  { task: 'Outdoor unit clearance for winter debris', urgency: 'LOW', note: 'DFW November brings cedar and oak leaf drop — ensure 18" clearance around condenser', season: 'all' },
  { task: 'Filter replacement before heating season', urgency: 'MEDIUM', note: 'Heating moves more dust than cooling in DFW homes — clean filter = efficient heat distribution', season: 'all' },
  { task: 'Carbon monoxide detector test & battery', urgency: 'HIGH', note: 'Required with any gas system — CO is odorless; February is highest-risk period in DFW', season: 'heating' },
];

const februaryFact = 'Winter Storm Uri (February 2021) showed DFW HVAC systems were not prepared for sustained below-freezing temps. The lesson: DFW\’s \’mild\’ winter is a once-per-decade myth. Treat fall tune-ups like spring ones.';

export default function DFWHVACFallTuneUp() {
  const [homeType, setHomeType] = useState('');
  const [heatingType, setHeatingType] = useState('');
  const [showPlan, setShowPlan] = useState(false);

  const urgencyColor = (u: string) => u === 'LIFE SAFETY' ? '#EF4444' : u === 'HIGH' ? '#F5E642' : u === 'MEDIUM' ? '#60A5FA' : '#64748B';

  const filteredItems = showPlan ? fallItems.filter(item => {
    if (item.season === 'all') return true;
    if (item.season === 'heating' && (heatingType.includes('gas') || heatingType.includes('Gas') || heatingType.includes('Dual'))) return true;
    if (item.season === 'heat pump' && (heatingType.includes('heat pump') || heatingType.includes('Heat pump') || heatingType.includes('Dual'))) return true;
    return false;
  }) : [];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>Fall Tune-Up Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 24 }}>October-November is your last chance to prepare DFW's HVAC systems before the heating season that might be mild — or might be Winter Storm Uri 2.0.</p>

        <div style={{ background: '#1A1010', borderRadius: 12, padding: 20, marginBottom: 32, borderLeft: '4px solid #EF4444' }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#FCA5A5', marginBottom: 8 }}>❄️ The February Factor</div>
          <div style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>{februaryFact}</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🌡️', stat: '67°F', label: 'DFW avg October high' },
            { icon: '❄️', stat: '1 in 7', label: 'Chance of DFW freeze event per winter' },
            { icon: '⚠️', stat: '3-5 days', label: 'Emergency HVAC wait time in freeze events' },
            { icon: '💰', stat: '$1,200+', label: 'Average frozen pipe repair cost' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#111D35', borderRadius: 10, padding: '16px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ fontWeight: 800, fontSize: 22, color: '#F5E642', marginTop: 4 }}>{s.stat}</div>
              <div style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🎯 Get Your Fall Tune-Up Priorities</h2>
        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 14, color: '#94A3B8', display: 'block', marginBottom: 8 }}>Your home type:</label>
            <div style={{ display: 'grid', gap: 8 }}>
              {homeTypes.map(ht => (
                <button key={ht} onClick={() => setHomeType(ht)} style={{ textAlign: 'left', padding: '10px 16px', borderRadius: 8, border: '1px solid', borderColor: homeType === ht ? '#F5E642' : '#1E3A5F', background: homeType === ht ? '#1A2A10' : '#0A1628', color: homeType === ht ? '#F5E642' : '#CBD5E1', fontSize: 14, cursor: 'pointer' }}>
                  {homeType === ht ? '● ' : '○ '}{ht}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 14, color: '#94A3B8', display: 'block', marginBottom: 8 }}>Heating system type:</label>
            <div style={{ display: 'grid', gap: 8 }}>
              {heatingTypes.map(ht => (
                <button key={ht} onClick={() => setHeatingType(ht)} style={{ textAlign: 'left', padding: '10px 16px', borderRadius: 8, border: '1px solid', borderColor: heatingType === ht ? '#F5E642' : '#1E3A5F', background: heatingType === ht ? '#1A2A10' : '#0A1628', color: heatingType === ht ? '#F5E642' : '#CBD5E1', fontSize: 14, cursor: 'pointer' }}>
                  {heatingType === ht ? '● ' : '○ '}{ht}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => setShowPlan(true)} disabled={!homeType || !heatingType} style={{ background: homeType && heatingType ? '#F5E642' : '#1E3A5F', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: homeType && heatingType ? 'pointer' : 'not-allowed' }}>
            Show My Fall Priorities →
          </button>
        </div>

        {showPlan && (
          <div style={{ background: '#111D35', borderRadius: 12, padding: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: '#F5E642', marginBottom: 16 }}>🍂 Your Fall Tune-Up Checklist</div>
            <div style={{ fontSize: 13, color: '#64748B', marginBottom: 20 }}>Based on: {heatingType}</div>
            {filteredItems.map((item, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 10, padding: '14px 18px', marginBottom: 10, borderLeft: `4px solid ${urgencyColor(item.urgency)}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{item.task}</span>
                  <span style={{ fontSize: 11, color: '#0A1628', background: urgencyColor(item.urgency), padding: '3px 8px', borderRadius: 20, flexShrink: 0, marginLeft: 10, fontWeight: 700 }}>{item.urgency}</span>
                </div>
                <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 8 }}>{item.note}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
