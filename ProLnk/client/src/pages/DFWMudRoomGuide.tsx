import { useState } from 'react';

const entrySizes = ['Tiny (under 30 sqft)', 'Small (30–60 sqft)', 'Medium (60–100 sqft)', 'Large (100+ sqft)'];
const householdSizes = ['1–2 people', '3–4 people (family)', '5–6 people (large family)', '6+ people'];
const sportsActivities = ['None', 'Youth sports (soccer, baseball, lacrosse)', 'Football/pads/helmets', 'Multiple sports + gear', 'Outdoor activities (hiking, biking, camping)'];

interface MudRoomConfig {
  layout: string;
  storage: string[];
  flooring: string;
  petFeature: string;
  cost: string;
}

const getConfig = (size: string, household: string, sports: string): MudRoomConfig => {
  const isLarge = size.includes('Large') || size.includes('Medium');
  const isBigFamily = household.includes('5–6') || household.includes('6+');
  const hasBigGear = sports.includes('Football') || sports.includes('Multiple');
  const hasPets = true;

  return {
    layout: isLarge
      ? 'Full locker wall with bench zone + pet station zone + laundry prep area'
      : 'Compact bench + overhead hooks + small cubbies along single wall',
    storage: [
      isBigFamily ? `${household.split(' ')[0]} individual locker bays (one per person)` : '2–3 cubby bays with hooks above each',
      hasBigGear ? 'Extra-deep cubbies (18″+ depth) for helmets and pads' : 'Standard 12″ cubbies for shoes and bags',
      'Bench with shoe storage underneath (pull-out or open cubbies)',
      'Upper hooks rated 50 lbs+ for heavy gear bags and coats',
      isLarge ? 'Overhead cabinet row for seasonal storage' : 'Wall-mounted shelf for rarely-used items',
      hasPets ? 'Pet station: built-in pet wash tub or lower hose bib connection' : 'Optional pet hook area',
    ],
    flooring: '12″×24″ or 18″×18″ porcelain tile — DFW clay soil tracked in year-round. Tile wipes clean instantly. Grout lines collect dirt; use epoxy grout or large-format tile with minimal grout. NO carpet, NO LVP in mudroom — water and mud will destroy them.',
    petFeature: hasPets
      ? isLarge
        ? 'Dedicated pet wash station: stainless or composite tub at knee height, handheld sprayer, built-in storage for pet towels and grooming supplies. Cost: $800–$2,500 added to build.'
        : 'Lower hose bib near entry for quick paw rinse. Wall hook for leashes and collars at dog height. Tile flooring handles muddy paws easily.'
      : 'Standard entry configuration.',
    cost: size.includes('Tiny') ? '$3,000–$8,000'
      : size.includes('Small') ? '$6,000–$14,000'
      : size.includes('Medium') ? '$10,000–$22,000'
      : '$18,000–$45,000',
  };
};

export default function DFWMudRoomGuide() {
  const [entrySize, setEntrySize] = useState('');
  const [householdSize, setHouseholdSize] = useState('');
  const [sports, setSports] = useState('');
  const [showResults, setShowResults] = useState(false);

  const config = entrySize && householdSize && sports ? getConfig(entrySize, householdSize, sports) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#F5E642', fontWeight: 600 }}>
          🥾 DFW MUD ROOM GUIDE
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px', lineHeight: 1.2 }}>
          Mud Rooms for DFW Homes
        </h1>
        <p style={{ color: '#94A3B8', marginBottom: '32px', lineHeight: 1.6 }}>
          DFW clay soil is among the most stubborn tracked-in dirt in the country. Texas youth athletics culture means kids constantly arrive home with cleats, pads, and gear bags. A properly designed mud room can eliminate the chaos that happens at every DFW family entry.
        </p>

        <div style={{ backgroundColor: '#F5E64210', border: '1px solid #F5E642', borderRadius: '12px', padding: '20px', marginBottom: '32px' }}>
          <div style={{ fontWeight: 700, marginBottom: '8px' }}>🏈 Why DFW Mud Rooms Are Different</div>
          <p style={{ margin: 0, lineHeight: 1.6, fontSize: '14px' }}>
            DFW kids participate in youth athletics at one of the highest rates in the country — soccer, baseball, football, lacrosse, and basketball all have massive youth programs. Combine that with clay soil that turns to mud in rain and sticks to everything, and mud room design becomes a serious household management problem.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {[
            { icon: '🏗️', title: 'Built-in Lockers', desc: 'Custom or semi-custom locker bays with hooks, cubbies, and bench — one per family member. Eliminates the pile-of-stuff-by-the-door problem permanently.' },
            { icon: '🪨', title: 'Tile Flooring Only', desc: 'DFW clay soil + Texas weather = constant tracked-in mess. Only porcelain tile makes sense in a mud room. Use large-format tile with epoxy grout.' },
            { icon: '🐕', title: 'Pet Wash Station', desc: 'A knee-height tub with handheld sprayer at the entry handles muddy dogs without dragging them through the house. Growing rapidly in DFW remodels.' },
            { icon: '⚽', title: 'Gear Storage Depth', desc: 'Standard 12″ cubbies do not fit football helmets or catcher gear. Youth sports families need 18″+ deep cubbies for full equipment storage.' },
            { icon: '🔑', title: 'Bench + Hooks System', desc: 'The single most-used feature. Seated area to remove shoes, hooks within reach for bags and coats at adult and child height.' },
            { icon: '🧺', title: 'Laundry Prep Connection', desc: 'Where possible, connect mud room to laundry room — uniform washing goes directly from entry to machine without touching the rest of the house.' },
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '26px', marginBottom: '10px' }}>{item.icon}</div>
              <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '8px', fontSize: '14px' }}>{item.title}</div>
              <p style={{ color: '#94A3B8', margin: 0, fontSize: '13px', lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '16px', padding: '28px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '20px', color: '#F5E642′ }}>
            📐 Mud Room Configuration Planner
          </h2>

          {[
            { label: 'Entry/transition space size:', options: entrySizes, selected: entrySize, setter: setEntrySize },
            { label: 'Household size:', options: householdSizes, selected: householdSize, setter: setHouseholdSize },
            { label: 'Sports and activities:', options: sportsActivities, selected: sports, setter: setSports },
          ].map((group, gi) => (
            <div key={gi} style={{ marginBottom: '20px' }}>
              <div style={{ fontWeight: 600, marginBottom: '10px' }}>{group.label}</div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {group.options.map(o => (
                  <button key={o} onClick={() => { group.setter(o); setShowResults(false); }}
                    style={{ padding: '10px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px',
                      backgroundColor: group.selected === o ? '#F5E642′ : '#1E3A5F',
                      color: group.selected === o ? '#0A1628′ : '#E8EAF0', fontWeight: 600 }}>
                    {o}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {entrySize && householdSize && sports && (
            <button onClick={() => setShowResults(true)}
              style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '16px' }}>
              Get Storage Configuration →
            </button>
          )}
        </div>

        {showResults && config && (
          <div style={{ backgroundColor: '#0D2137', borderRadius: '16px', padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <h3 style={{ fontWeight: 700, fontSize: '20px', margin: 0 }}>Your Mud Room Configuration</h3>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '18px' }}>{config.cost}</div>
            </div>

            <div style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#112240', borderRadius: '8px' }}>
              <div style={{ color: '#94A3B8', fontSize: '12px', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Recommended Layout</div>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.5 }}>{config.layout}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ color: '#94A3B8', fontSize: '12px', fontWeight: 700, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Storage Configuration</div>
              {config.storage.map((s, i) => (
                <div key={i} style={{ padding: '10px 14px', backgroundColor: '#112240', borderRadius: '8px', marginBottom: '6px', fontSize: '14px', display: 'flex', gap: '10px' }}>
                  <span style={{ color: '#F5E642′ }}>✓</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '16px', padding: '16px', backgroundColor: '#F5E64210', borderRadius: '8px', border: '1px solid #F5E64240′ }}>
              <div style={{ fontWeight: 700, marginBottom: '6px', fontSize: '13px', color: '#F5E642′ }}>🪨 Flooring Specification</div>
              <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.5 }}>{config.flooring}</p>
            </div>

            <div style={{ padding: '16px', backgroundColor: '#112240', borderRadius: '8px', border: '1px solid #1E3A5F' }}>
              <div style={{ fontWeight: 700, marginBottom: '6px', fontSize: '13px', color: '#94A3B8′ }}>🐕 Pet Integration</div>
              <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.5 }}>{config.petFeature}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
