import { useState } from 'react';

const situations = [
  { id: 'old-furnace', label: 'Gas furnace over 12 years old', strategy: 'Replace with cold-climate heat pump — in DFW mild winters, heat pumps deliver 250-350% efficiency vs gas furnace 80-95% AFUE.', savings: '$180-$310/yr' },
  { id: 'no-setback', label: 'Keep heat at 72F all day', strategy: 'Use setback schedule: 68F when home, 60F overnight, 60F while away. DFW winters rarely drop below 35F — recovery is fast.', savings: '$95-$160/yr' },
  { id: 'no-weatherstrip', label: 'Drafty doors and windows', strategy: 'DFW homes often lack northern-grade weatherstripping. Add door sweeps and V-seal strips — stops cold infiltration that forces constant heat cycling.', savings: '$70-$130/yr' },
  { id: 'attic-leaks', label: 'Uninsulated attic access or pull-down stairs', strategy: 'Attic stairs are massive heat leaks in DFW. Add an insulated cover — $40 DIY fix that stops convective loss to the cold attic.', savings: '$50-$90/yr' },
  { id: 'hp-strip-heat', label: 'Heat pump running strip heat often', strategy: 'In DFW, auxiliary strip heat should rarely trigger above 35F. If it runs constantly, your heat pump refrigerant or reversing valve needs service.', savings: '$120-$220/yr after repair' },
];

export default function DFWHVACWinterSavings2026() {
  const [selected, setSelected] = useState('');
  const match = situations.find(s => s.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide 2026</div>
        <h1 style={{ fontSize: 34, fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px' }}>
          ❄️ Winter Heating Savings for DFW Homeowners
        </h1>
        <p style={{ color: '#8FA3BF', fontSize: 16, margin: '0 0 32px', lineHeight: 1.6 }}>
          DFW winters are mild — December through February average highs of 54-58F — but the occasional polar vortex reveals how unprepared most North Texas homes are. The 2026 opportunity: leverage heat pump efficiency during the 95% of winter days when temperatures stay above 35F.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🔄', title: 'Heat Pump Advantage', body: 'DFW mild winters are ideal for heat pumps. At 40F outdoor temps, a heat pump delivers 3x more heat per watt than electric strip heat. Gas furnaces run 80-95% efficiency; heat pumps run 250-350%.' },
            { icon: '📅', title: 'Setback Schedules', body: 'DFW homes recover quickly from setback because winters are mild. Drop to 60F overnight — your system recovers to 68F in under 45 minutes. Savings stack nightly across December-February.' },
            { icon: '⚠️', title: 'Emergency Heat Trap', body: 'Many DFW homeowners accidentally leave Emergency Heat on after a cold snap. This bypasses the heat pump and runs only expensive strip heat. Check your thermostat mode every November.' },
            { icon: '🏠', title: 'Insulation Reality Check', body: 'DFW homes built before 1990 often have R-11 attic insulation. Upgrading to R-38 reduces heating bills 15-25% year-round — a project that pays back in 4-6 DFW winters.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#0F2140', border: '1px solid #1E3A5F', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{card.title}</div>
              <div style={{ color: '#8FA3BF', fontSize: 14, lineHeight: 1.6 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2140', border: '1px solid #F5E642', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: '#F5E642', marginBottom: 16 }}>🎯 Your DFW Situation → Your Heating Strategy</div>
          <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)} style={{ background: selected === s.id ? '#F5E642′ : '#162840', color: selected === s.id ? '#0A1628' : '#E8EDF5', border: '1px solid #2A4A6B', borderRadius: 8, padding: '12px 16px', textAlign: ’left', cursor: 'pointer', fontWeight: selected === s.id ? 700 : 400, fontSize: 15 }}>
                {s.label}
              </button>
            ))}
          </div>
          {match && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: 6 }}>Recommended Strategy</div>
              <div style={{ color: '#C8D8E8', fontSize: 15, lineHeight: 1.7, marginBottom: 10 }}>{match.strategy}</div>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 16 }}>Expected Savings: {match.savings}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, borderTop: '3px solid #F5E642′ }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🔗 ProLnk: Vetted DFW HVAC pros, zero pressure</div>
          <div style={{ color: '#8FA3BF', fontSize: 14 }}>Get quotes for heat pump installation, furnace tune-ups, and insulation upgrades from background-checked North Texas contractors ready to serve in 2026.</div>
        </div>
      </div>
    </div>
  );
}
