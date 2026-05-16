import { useState } from 'react';

const zoneData = {
  two_story: {
    feasibility: 'High',
    zones: 2,
    reason: 'Two-story homes are the most common and cost-effective zoning application in DFW. Separate upper and lower floors dramatically improve comfort.',
    cost: '$3,800 - $6,500',
    systems: ['Dual-zone damper system', 'Separate upstairs mini-split', 'Two-stage variable speed system'],
  },
  open_floor: {
    feasibility: 'Medium',
    zones: 2,
    reason: 'Open floor plans benefit from zoning when there are distinct temperature problem areas like sunrooms, home offices, or master suites.',
    cost: '$3,200 - $5,500',
    systems: ['Two-zone damper system with bypass', 'Variable air volume dampers', 'Mini-split for problem room'],
  },
  addition: {
    feasibility: 'High',
    zones: 3,
    reason: 'Home additions almost always need their own zone because the existing system is undersized to handle the new square footage.',
    cost: '$4,500 - $8,000',
    systems: ['Dedicated mini-split for addition', 'Three-zone whole-home system', 'Ductless cassette unit'],
  },
  single_story: {
    feasibility: 'Low',
    zones: 1,
    reason: 'Single-story homes with consistent temperature complaints usually benefit more from duct sealing, insulation, and proper sizing before zoning.',
    cost: '$1,200 - $3,500',
    systems: ['Duct sealing and balancing', 'Variable speed blower upgrade', 'Smart thermostat with room sensors'],
  },
};

const complaints = {
  hot_rooms: 'Specific rooms running hot is a classic zoning indicator. Dampers can redirect airflow to problem areas.',
  whole_floor: 'Entire floor temperature differences confirm you need separate zones for each level.',
  night_day: 'Day/night temperature swings suggest occupancy-based zoning would help significantly.',
  no_problem: 'No major temperature complaints means zoning may not be worth the investment for your home.',
};

type HomeKey = keyof typeof zoneData;
type ComplaintKey = keyof typeof complaints;

export default function DFWHVACZoningGuide() {
  const [homeType, setHomeType] = useState<HomeKey | ''>('');
  const [complaint, setComplaint] = useState<ComplaintKey | ''>('');
  const [result, setResult] = useState<(typeof zoneData)[HomeKey] | null>(null);
  const [complaintText, setComplaintText] = useState('');

  function calculate() {
    if (!homeType) return;
    setResult(zoneData[homeType]);
    if (complaint) setComplaintText(complaints[complaint]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>HVAC Zoning for DFW Homes</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
          Zoning uses motorized dampers to direct conditioned air to specific areas of your home. Instead of one thermostat, you get independent control by zone.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>How Zoning Works</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              ['Motorized Dampers', 'Metal dampers inside your ductwork open and close to route air to the right zone at the right time.'],
              ['Zone Control Board', 'A central controller reads each zone thermostat and opens/closes the correct dampers.'],
              ['Bypass Damper', 'Required in most systems to handle pressure when some zones are closed - prevents blower damage.'],
              ['Compatible Systems', 'Works best with two-stage or variable speed systems. Single-stage systems require a bypass.'],
            ].map(([title, desc]) => (
              <div key={title as string} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{title as string}</div>
                <div style={{ color: '#94A3B8', fontSize: 14 }}>{desc as string}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>Check Your Zoning Feasibility</h2>
          <div style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Home layout type</label>
              <select value={homeType} onChange={e => setHomeType(e.target.value as HomeKey)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 15 }}>
                <option value="">Select home type</option>
                <option value="two_story">Two-story home</option>
                <option value="open_floor">Single story open floor plan</option>
                <option value="addition">Home with addition</option>
                <option value="single_story">Standard single story</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Primary temperature complaint</label>
              <select value={complaint} onChange={e => setComplaint(e.target.value as ComplaintKey)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 15 }}>
                <option value="">Select complaint</option>
                <option value="hot_rooms">Specific rooms always too hot or cold</option>
                <option value="whole_floor">Entire floor is different temperature</option>
                <option value="night_day">Big swings between day and night</option>
                <option value="no_problem">No major complaints, just exploring</option>
              </select>
            </div>
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 15, padding: '12px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', width: '100%' }}>
            Check Zoning Feasibility
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
            <div style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'flex-start' }}>
              <div style={{ background: result.feasibility === 'High' ? '#065F46' : result.feasibility === 'Medium' ? '#78350F' : '#3B1F1F', borderRadius: 8, padding: '6px 14px', fontSize: 13, fontWeight: 700, color: result.feasibility === 'High' ? '#6EE7B7' : result.feasibility === 'Medium' ? '#FCD34D' : '#FCA5A5', whiteSpace: 'nowrap' }}>
                {result.feasibility} Feasibility
              </div>
              <div style={{ background: '#1E3A5F', borderRadius: 8, padding: '6px 14px', fontSize: 13, fontWeight: 700 }}>
                {result.zones} Zone{result.zones > 1 ? 's' : ''} Recommended
              </div>
            </div>
            <p style={{ fontSize: 14, color: '#94A3B8', marginBottom: 16, lineHeight: 1.6 }}>{result.reason}</p>
            {complaintText && (
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 16, borderLeft: '3px solid #F5E642' }}>
                <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 4 }}>ABOUT YOUR COMPLAINT</div>
                <div style={{ fontSize: 14 }}>{complaintText}</div>
              </div>
            )}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 8 }}>COMPATIBLE SYSTEM OPTIONS</div>
              {result.systems.map(s => <div key={s} style={{ marginBottom: 6, fontSize: 14 }}>{s}</div>)}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94A3B8', fontSize: 13 }}>Estimated installation cost</span>
              <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{result.cost}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
