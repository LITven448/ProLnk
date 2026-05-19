import { useState } from 'react';

const renovationTypes = ['Kitchen remodel', 'Room addition', 'Open floor plan conversion', 'Garage conversion'];
const hvacAges = ['Under 5 years', '5-10 years', '10-15 years', 'Over 15 years'];

const advice: Record<string, Record<string, string>> = {
  'Kitchen remodel': {
    'Under 5 years': 'Modern system should handle added kitchen heat load if properly sized. Ensure kitchen has dedicated supply and return — kitchens are often under-served. Check duct sizing.',
    '5-10 years': 'Good opportunity to add kitchen exhaust makeup air if doing full gut renovation. DFW kitchens without makeup air pull conditioned air from entire house through gaps.',
    '10-15 years': 'Consider HVAC tune-up during renovation. Walls open anyway — seal any accessible duct connections you encounter. Kitchen renovations often expose deteriorated flex duct.',
    'Over 15 years': 'Strong case for full replacement during kitchen reno. Labor overlap saves $800-1500. DFW 15-year-old units are on borrowed time entering peak demand season.',
  },
  'Room addition': {
    'Under 5 years': 'Load calculation required for the new space. Adding square footage to an already-maxed system forces it to fail in DFW summer heat. May need second unit or mini-split for addition.',
    '5-10 years': 'Assess current unit capacity. If existing system has headroom, a properly sized duct extension may work. If at capacity, dedicated mini-split for the addition is cleanest solution.',
    '10-15 years': 'Replace main system now and size up for the addition simultaneously. Spreading this into two projects over 3-5 years costs significantly more in DFW climate conditions.',
    'Over 15 years': 'Mandatory replacement. Do not extend a 15-year DFW system to serve new square footage. New system sized for total square footage including addition.',
  },
  'Open floor plan conversion': {
    'Under 5 years': 'Removing walls changes airflow significantly. Get an HVAC airflow assessment after structural work. Supply and return positions that worked with walls may create dead zones after opening.',
    '5-10 years': 'Check that existing duct layout serves the new open space. Ducts designed for divided rooms often leave open spaces with poor air distribution and hot spots.',
    '10-15 years': 'Walls open = opportunity to relocate duct takeoffs for better distribution in open plan. Do this during demo, not after drywall.',
    'Over 15 years': 'Replace during open floor plan project. New duct layout can be designed for open plan from scratch rather than patching a room-by-room system.',
  },
  'Garage conversion': {
    'Under 5 years': 'Garage to living space adds conditioned square footage and eliminates a major thermal buffer. Assess if existing system has capacity. Dedicated mini-split for garage conversion is most reliable.',
    '5-10 years': 'Garage conversions in DFW add significant load — concrete slab, large door penetrations, and direct sun exposure. Mini-split sized for garage sq footage is standard practice.',
    '10-15 years': 'Extend ducts or add mini-split. Extending aging ductwork to a garage conversion risks pulling the whole system below performance threshold in DFW peak heat.',
    'Over 15 years': 'Replace main system + add mini-split for garage conversion. A 15-year system already near end of life cannot absorb a garage addition in DFW summers.',
  },
};

export default function DFWHVACRenovationGuide() {
  const [reno, setReno] = useState('');
  const [age, setAge] = useState('');

  const result = reno && age ? advice[reno]?.[age] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>HVAC During DFW Renovations</h1>
        <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 32, lineHeight: 1.7 }}>
          Renovations are the best opportunity to address DFW HVAC problems — walls are open, contractors are on-site, and costs overlap. Miss this window and you'll pay double later. Know what to check, what to address, and when to replace vs. extend.
        </p>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '14px 18px', marginBottom: 28, fontSize: 14, fontWeight: 600 }}>
          💡 Pro Tip: Every major DFW renovation should include an HVAC contractor walkthrough while walls are open. Duct connections, insulation gaps, and load changes are exposed at no extra cost during demo.
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🔨 Get Your Recommendation</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>RENOVATION TYPE</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {renovationTypes.map(r => (
                <button key={r} onClick={() => setReno(r)} style={{ padding: '8px 16px', borderRadius: 6, border: '2px solid', borderColor: reno === r ? '#F5E642′ : '#1e3a5f', background: reno === r ? '#F5E642' : ’transparent', color: reno === r ? '#0A1628′ : '#fff', cursor: ’pointer', fontWeight: 600, fontSize: 13 }}>{r}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>CURRENT HVAC AGE</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {hvacAges.map(a => (
                <button key={a} onClick={() => setAge(a)} style={{ padding: '8px 16px', borderRadius: 6, border: '2px solid', borderColor: age === a ? '#F5E642′ : '#1e3a5f', background: age === a ? '#F5E642' : ’transparent', color: age === a ? '#0A1628′ : '#fff', cursor: ’pointer', fontWeight: 600, fontSize: 13 }}>{a}</button>
              ))}
            </div>
          </div>
          {result && (
            <div style={{ background: '#1e3a5f', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>Recommendation</div>
              <div style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.7 }}>{result}</div>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[['🏗️', 'Walls Open = Opportunity', 'Duct sealing, insulation access, and wiring for new thermostats costs 60% less during demo.'],['📐', 'Load Recalculation', 'Any addition or major layout change needs a new Manual J. DFW loads are dominated by envelope.'],['💰', 'Labor Overlap Savings', 'Replacing HVAC during reno saves $600-1200 in labor and patch costs vs doing it separately.'],['🌡️', 'DFW Urgency', "Don't exit a major renovation with a 15-year system. DFW summers are not forgiving of aging equipment."]].map(([icon, title, desc]) => (
            <div key={title} style={{ background: '#0f1f3d', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 14 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 10, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>📞 Get a ProLnk Quote</div>
          <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>Find DFW HVAC contractors who coordinate with GCs during renovation — timing and access matter.</div>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}
