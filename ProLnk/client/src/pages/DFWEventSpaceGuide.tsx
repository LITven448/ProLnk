import { useState } from 'react';

const HOME_SIZES = ['Small (under 1,800 sqft)','Medium (1,800-3,000 sqft)','Large (3,000-5,000 sqft)','Estate (5,000+ sqft)'];
const EVENT_SIZES = ['Intimate (20-40 guests)','Mid (40-75 guests)','Large (75-150 guests)','Very Large (150+ guests)'];
const SUBURBS = ['Southlake','Frisco','Plano','McKinney','Allen','Prosper','Colleyville','Trophy Club','Westlake','Flower Mound'];

interface EventResult { capacity: string; parking: string; lighting: string; sound: string; permit: string; improvements: string[]; }

function getResult(homeSize: string, eventSize: string, suburb: string): EventResult {
  const large = eventSize.includes('Large') || eventSize.includes('Very');
  const estate = homeSize.includes('Estate') || homeSize.includes('3,000');
  return {
    capacity: large ? 'Requires coordination of both indoor and outdoor spaces. DFW summer events should start after 7pm or use shade structures.' : 'Standard residential outdoor space can handle this with minor preparation.',
    parking: large ? 'Plan for overflow parking and consider valet or a shuttle — large gatherings can strain neighborhood street parking and may prompt HOA or city concerns.' : 'Guest parking typically manageable with neighborhood cooperation and driveway use.',
    lighting: 'DFW outdoor entertaining requires lighting for evening events. String lights: $500-$2,000 installed. Landscape uplighting: $1,500-$5,000. Temporary event lighting rental: $300-$800/event.',
    sound: 'DFW HOAs often restrict outdoor amplified sound after 10pm. Use directional speakers aimed at seating areas. Recommended: 2-4 outdoor rated speakers at 50W each for up to 100 guests.',
    permit: large ? 'Larger events may require a permit, noise variance, or temporary use authorization — check with your city before the event.' : 'No permit required for residential gatherings under 50 guests in most DFW cities.',
    improvements: estate ? ['Covered patio or pergola for year-round use','Outdoor kitchen with refrigeration','Dedicated 20A outdoor circuit for event equipment','Permanent landscape lighting system','Level turf or patio expansion for dancing/mingling'] : ['String light system on permanent posts','Portable outdoor fans for summer events','Outdoor speaker rough-in during any renovation','Extra outlet circuits on patio','Gravel or decomposed granite for overflow guest areas'],
  };
}

export default function DFWEventSpaceGuide() {
  const [homeSize, setHomeSize] = useState('');
  const [eventSize, setEventSize] = useState('');
  const [suburb, setSuburb] = useState('');
  const [result, setResult] = useState<EventResult|null>(null);

  function calculate() {
    if (!homeSize || !eventSize || !suburb) return;
    setResult(getResult(homeSize, eventSize, suburb));
  }

  const tips = [
    { icon: '🌡️', title: 'Beat the DFW Heat', desc: 'Evening events starting at 7-8pm are standard in DFW summer. Misting systems reduce apparent temperature by 10-15F for outdoor guests.' },
    { icon: '🌪️', title: 'Wind & Weather', desc: 'DFW spring events face storm risk. Always have an indoor contingency plan for April-May events.' },
    { icon: '🦟', title: 'Mosquito Control', desc: 'DFW mosquito pressure peaks August-October. Professional yard spray 48 hours before events — $100-$250 per service.' },
    { icon: '🅿️', title: 'Parking First', desc: 'Parking is the #1 DFW event complaint. Plan 1 parking space per 2 guests minimum.' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>🏠 DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 34, fontWeight: 800, marginBottom: 8 }}>Event Space Guide</h1>
        <p style={{ color: '#8899AA', marginBottom: 32, fontSize: 16 }}>DFW homeowners are known for entertaining. Here's how to assess and upgrade your home for hosting larger gatherings.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {tips.map(tip => (
            <div key={tip.title} style={{ background: '#111F35', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{tip.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 15 }}>{tip.title}</div>
              <div style={{ color: '#8899AA', fontSize: 13, lineHeight: 1.5 }}>{tip.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 Assess Your Event Capability</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            {[
              { label: 'Home Size', value: homeSize, setter: setHomeSize, options: HOME_SIZES },
              { label: 'Typical Event Size', value: eventSize, setter: setEventSize, options: EVENT_SIZES },
              { label: 'DFW Suburb', value: suburb, setter: setSuburb, options: SUBURBS },
            ].map(field => (
              <div key={field.label}>
                <label style={{ display: 'block', color: '#8899AA', fontSize: 13, marginBottom: 6 }}>{field.label}</label>
                <select value={field.value} onChange={e => field.setter(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3050', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 15 }}>
                  <option value=''>Select...</option>
                  {field.options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer', width: '100%' }}>Get Event Assessment</button>
        </div>

        {result && (
          <div style={{ background: '#0D2137', border: '1px solid #F5E642', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🎉 Your Event Hosting Assessment</h3>
            {[
              { label: '👥 Capacity Assessment', value: result.capacity },
              { label: '🅿️ Parking Plan', value: result.parking },
              { label: '💡 Lighting', value: result.lighting },
              { label: '🔊 Sound System', value: result.sound },
              { label: '📋 Permit Requirements', value: result.permit },
            ].map(item => (
              <div key={item.label} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #1E3050' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: '#CCD6E0', lineHeight: 1.6 }}>{item.value}</div>
              </div>
            ))}
            <div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🔧 Recommended Improvements</div>
              {result.improvements.map((imp, i) => <div key={i} style={{ color: '#CCD6E0', padding: '4px 0', paddingLeft: 12 }}>• {imp}</div>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
