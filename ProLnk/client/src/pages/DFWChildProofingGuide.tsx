import { useState } from 'react';

const homeTypes = ['Single story', 'Two story / stairs', 'Townhouse', 'Home with pool'];
const ageRanges = ['0–12 months (crawler/puller)', '1–2 years (walker/climber)', '2–4 years (explorer)', '4–7 years (school age)'];

interface RoomChecklist {
  room: string;
  items: { task: string; cost: string; priority: string }[];
}

const getChecklist = (homeType: string, ageRange: string): RoomChecklist[] => {
  const hasStairs = homeType === 'Two story / stairs' || homeType === 'Townhouse';
  const hasPool = homeType === 'Home with pool';
  const isInfant = ageRange.includes('0–12') || ageRange.includes('1–2');

  const rooms: RoomChecklist[] = [
    {
      room: 'Kitchen',
      items: [
        { task: 'Cabinet locks on all lower cabinets', cost: '$30–$80', priority: 'High' },
        { task: 'Stove knob covers', cost: '$15–$30', priority: 'High' },
        { task: 'Oven door lock', cost: '$20–$40', priority: 'High' },
        { task: 'Drawer locks on knife/utensil drawers', cost: '$25–$60', priority: 'High' },
        { task: 'Refrigerator lock (toddler stage)', cost: '$15–$25', priority: 'Medium' },
      ],
    },
    {
      room: 'Bathrooms',
      items: [
        { task: 'Toilet locks', cost: '$15–$25 each', priority: isInfant ? 'Critical' : 'High' },
        { task: 'Non-slip bath mat and tub stickers', cost: '$20–$50', priority: 'High' },
        { task: 'Cabinet locks under sink (cleaning products)', cost: '$15–$40', priority: 'High' },
        { task: 'Set water heater to 120°F max', cost: '$0 (DIY)', priority: 'High' },
        { task: 'Door handle covers or door alarms', cost: '$20–$50', priority: 'Medium' },
      ],
    },
    {
      room: 'Living / Family Room',
      items: [
        { task: 'Anti-tip straps on all TVs and furniture', cost: '$10–$30 per item', priority: 'Critical' },
        { task: 'Corner and edge guards on coffee tables', cost: '$20–$50', priority: 'High' },
        { task: 'Outlet covers or tamper-resistant plates', cost: '$15–$40', priority: 'High' },
        { task: 'Cord management / conceal blind cords', cost: '$20–$60', priority: 'High' },
        { task: 'Furniture anchor straps on bookcases/shelves', cost: '$15–$40 per item', priority: 'Critical' },
      ],
    },
    {
      room: 'Bedrooms',
      items: [
        { task: 'Window stop locks (limit opening to 4 inches)', cost: '$10–$20 per window', priority: 'High' },
        { task: 'Dresser/bookcase anti-tip anchors', cost: '$15–$30 each', priority: 'Critical' },
        { task: 'Outlet covers', cost: '$10–$20', priority: 'High' },
        { task: 'Door pinch guards', cost: '$10–$25', priority: 'Medium' },
        { task: 'Baby monitor installation', cost: '$50–$200', priority: isInfant ? 'Critical' : 'Medium' },
      ],
    },
  ];

  if (hasStairs) {
    rooms.splice(1, 0, {
      room: 'Stairs & Hallways',
      items: [
        { task: 'Top-of-stairs gate (hardware mounted only — NO pressure mount)', cost: '$60–$150', priority: 'Critical' },
        { task: 'Bottom-of-stairs gate', cost: '$40–$100', priority: 'High' },
        { task: 'Banister rail gap filler (gaps over 4 inches are hazardous)', cost: '$30–$150', priority: 'High' },
        { task: 'Non-slip stair treads', cost: '$30–$80', priority: 'High' },
      ],
    });
  }

  if (hasPool) {
    rooms.unshift({
      room: '🚨 POOL — TEXAS LAW REQUIRED',
      items: [
        { task: 'TX law: 4-foot minimum pool barrier fence with self-closing, self-latching gate', cost: '$1,500–$4,000', priority: 'Legal Requirement' },
        { task: 'Pool alarm (surface or subsurface)', cost: '$150–$400', priority: 'Critical' },
        { task: 'Door alarms on any house door with pool access', cost: '$30–$80 each', priority: 'Critical' },
        { task: 'Pool safety net (additional layer)', cost: '$500–$1,200', priority: 'High' },
        { task: 'CPR certification for all adults in home', cost: '$50–$100 per adult', priority: 'Critical' },
      ],
    });
  }

  return rooms;
};

export default function DFWChildProofingGuide() {
  const [homeType, setHomeType] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [showResults, setShowResults] = useState(false);

  const checklist = homeType && ageRange ? getChecklist(homeType, ageRange) : [];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#F5E642', fontWeight: 600 }}>
          👶 DFW CHILD-PROOFING GUIDE
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px', lineHeight: 1.2 }}>
          Child-Proofing DFW Homes
        </h1>
        <p style={{ color: '#94A3B8', marginBottom: '32px', lineHeight: 1.6 }}>
          Texas law requires specific pool safety barriers. Beyond legal requirements, DFW homes have unique risks from two-story layouts, pools, and heavy furniture. Use this guide to prioritize your safety investments by room and child age.
        </p>

        <div style={{ backgroundColor: '#FF4444', borderRadius: '12px', padding: '20px', marginBottom: '32px' }}>
          <div style={{ fontWeight: 700, marginBottom: '8px' }}>⚠️ TEXAS POOL LAW — MANDATORY</div>
          <p style={{ margin: 0, lineHeight: 1.6, fontSize: '14px' }}>
            Texas law (HB 1 Pool Safety) requires a 4-foot minimum barrier fence with a self-latching gate around any residential pool. Non-compliance can result in fines and liability. This is not optional — enforce before children are in the home.
          </p>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '16px', padding: '28px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '20px', color: '#F5E642′ }}>
            🛡️ Build Your Child-Proofing Checklist
          </h2>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontWeight: 600, marginBottom: '10px' }}>Home type:</div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {homeTypes.map(t => (
                <button key={t} onClick={() => { setHomeType(t); setShowResults(false); }}
                  style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '14px',
                    backgroundColor: homeType === t ? '#F5E642′ : '#1E3A5F',
                    color: homeType === t ? '#0A1628′ : '#E8EAF0', fontWeight: 600 }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontWeight: 600, marginBottom: '10px' }}>Child age range:</div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {ageRanges.map(a => (
                <button key={a} onClick={() => { setAgeRange(a); setShowResults(false); }}
                  style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px',
                    backgroundColor: ageRange === a ? '#F5E642′ : '#1E3A5F',
                    color: ageRange === a ? '#0A1628′ : '#E8EAF0', fontWeight: 600 }}>
                  {a}
                </button>
              ))}
            </div>
          </div>

          {homeType && ageRange && (
            <button onClick={() => setShowResults(true)}
              style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '16px' }}>
              Generate Room-by-Room Checklist →
            </button>
          )}
        </div>

        {showResults && checklist.map((section, si) => (
          <div key={si} style={{ backgroundColor: '#112240', borderRadius: '16px', padding: '24px', marginBottom: '16px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '18px', color: '#F5E642', marginBottom: '16px' }}>{section.room}</h3>
            {section.items.map((item, ii) => (
              <div key={ii} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: ii < section.items.length - 1 ? '1px solid #1E3A5F' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px',
                    backgroundColor: item.priority === 'Critical' || item.priority === 'Legal Requirement' ? '#FF444430′ : item.priority === ’High' ? '#F5E64220′ : '#1E3A5F',
                    color: item.priority === 'Critical' || item.priority === 'Legal Requirement' ? '#FF7777′ : item.priority === ’High' ? '#F5E642′ : '#94A3B8' }}>
                    {item.priority.toUpperCase()}
                  </span>
                  <span style={{ fontSize: '14px' }}>{item.task}</span>
                </div>
                <span style={{ color: '#F5E642', fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap', marginLeft: '12px' }}>{item.cost}</span>
              </div>
            ))}
          </div>
        ))}

      </div>
    </div>
  );
}
