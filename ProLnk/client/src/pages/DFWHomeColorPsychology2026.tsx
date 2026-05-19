import { useState } from 'react';

const rooms = ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Home Office', 'Dining Room'];
const orientations = ['North-facing', 'South-facing', 'East-facing', 'West-facing'];
const moods = ['Calm & Serene', 'Energizing', 'Cozy & Warm', 'Clean & Fresh', 'Bold & Dramatic'];

const colorMap: Record<string, Record<string, { color: string; hex: string; note: string }>> = {
  'Calm & Serene': {
    'North-facing': { color: 'Warm Greige', hex: '#C4B49A', note: 'North rooms get cool blue light — warm greige fights the chill without fighting TX sun.' },
    'South-facing': { color: 'Soft Sage', hex: '#9CAF88', note: 'DFW south rooms get intense sun all day — sage absorbs glare beautifully.' },
    'East-facing': { color: 'Blush Linen', hex: '#E8D5C4', note: 'Morning TX sun is golden — blush linen glows warmly at peak morning light.' },
    'West-facing': { color: 'Dusty Periwinkle', hex: '#9BA4C0', note: 'West rooms get brutal DFW afternoon sun — cool periwinkle tames the heat visually.' },
  },
  'Energizing': {
    'North-facing': { color: 'Citron Yellow', hex: '#D4C84A', note: 'Bring DFW sunshine indoors — citron compensates for the lack of direct light.' },
    'South-facing': { color: 'Terracotta', hex: '#C1654A', note: 'South light amplifies warm tones — terracotta thrives in DFW’s intense south exposure.' },
    'East-facing': { color: 'Coral Spice', hex: '#E07850', note: 'Morning east sun makes coral sing — perfect DFW wake-up energy.' },
    'West-facing': { color: 'Burnt Amber', hex: '#C47830', note: 'West afternoon sun turns amber into liquid gold in DFW light.' },
  },
  'Cozy & Warm': {
    'North-facing': { color: 'Caramel Toast', hex: '#B8905A', note: 'North rooms need warmth — caramel toast compensates beautifully in DFW interiors.' },
    'South-facing': { color: 'Warm Clay', hex: '#B87060', note: 'South DFW rooms amplify clay — creates a rich hacienda warmth.' },
    'East-facing': { color: 'Toasted Almond', hex: '#C8A478', note: 'Morning DFW light warms almond tones perfectly through the first half of the day.' },
    'West-facing': { color: 'Mahogany Mist', hex: '#8B5A4A', note: 'West DFW sun deepens mahogany into a stunning evening glow.' },
  },
  'Clean & Fresh': {
    'North-facing': { color: 'Warm White (OC-17)', hex: '#F5EFE0', note: 'Pure whites look blue in north rooms — this warm white stays crisp under DFW cool light.' },
    'South-facing': { color: 'Swiss Coffee', hex: '#EDE0D0', note: 'South DFW light would bleach cool whites — Swiss coffee stays elegant and fresh.' },
    'East-facing': { color: 'Morning Mist', hex: '#E8EAE0', note: 'Slight green-white looks perfect in morning DFW sun without yellowing.' },
    'West-facing': { color: 'Pale Linen', hex: '#EDE8D8', note: 'West DFW sun can yellow pure whites — pale linen reads clean through evening light.' },
  },
  'Bold & Dramatic': {
    'North-facing': { color: 'Deep Forest', hex: '#2D4A3E', note: 'North rooms can handle deep green drama — DFW artificial lighting makes it pop.' },
    'South-facing': { color: 'Midnight Navy', hex: '#1A2A4A', note: 'South DFW rooms balance navy perfectly — never looks muddy with strong south light.' },
    'East-facing': { color: 'Plum Noir', hex: '#3D2040', note: 'Morning DFW light creates striking plum theater in east-facing rooms.' },
    'West-facing': { color: 'Charcoal Slate', hex: '#3A3A4A', note: 'West DFW afternoon sun gives charcoal a dramatic moody shift into evening.' },
  },
};

export default function DFWHomeColorPsychology2026() {
  const [room, setRoom] = useState('');
  const [orientation, setOrientation] = useState('');
  const [mood, setMood] = useState('');

  const result = orientation && mood ? colorMap[mood]?.[orientation] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8E8E8', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1A2A40 100%)', padding: '48px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 40 }}>🎨</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>DFW Home Color Psychology 2026</h1>
        <p style={{ color: '#A0B0C8', fontSize: 15, maxWidth: 580, margin: '0 auto' }}>Texas sunlight changes everything. Colors that look perfect in a Chicago showroom can look washed out or garish under DFW's intense sun. Find your perfect match.</p>
      </div>

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ background: '#112240', borderRadius: 12, padding: 24, margin: '32px 0 20px', border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 16px' }}>☀️ Why DFW Light Is Different</h2>
          {[
            { icon: '🌞', text: 'DFW averages 234 sunny days/year — more intense UV than northern cities saturates and bleaches colors differently' },
            { icon: '🌡️', text: 'High UV index (8–10 from April–October) causes cool colors to look washed, warm colors to glow' },
            { icon: '🧭', text: 'South-facing rooms in DFW get direct sun most of the day — the most challenging orientation for color' },
            { icon: '🏠', text: '2026 DFW trend: warm greiges, earthy terracottas, and dusty blues replacing the cool gray wave' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <p style={{ color: '#C0D0E0', fontSize: 14, margin: 0, lineHeight: 1.5 }}>{item.text}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 20px' }}>🔍 Get Your DFW Color Recommendation</h2>
          {[
            { label: 'Room Type', value: room, setter: setRoom, options: rooms },
            { label: 'Room Orientation', value: orientation, setter: setOrientation, options: orientations },
            { label: 'Desired Mood', value: mood, setter: setMood, options: moods },
          ].map(({ label, value, setter, options }) => (
            <div key={label} style={{ marginBottom: 16 }}>
              <label style={{ color: '#A0B0C8', fontSize: 13, display: 'block', marginBottom: 6 }}>{label}</label>
              <select value={value} onChange={e => setter(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#E8E8E8', border: '1px solid #2A4A6F', borderRadius: 8, fontSize: 14 }}>
                <option value="">Select {label}</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}

          {result && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, marginTop: 8, border: `2px solid ${result.hex}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                <div style={{ width: 56, height: 56, borderRadius: 8, background: result.hex, border: '2px solid #2A4A6F', flexShrink: 0 }} />
                <div>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{result.color}</div>
                  <div style={{ color: '#A0B0C8', fontSize: 13 }}>{result.hex} · {room} · {orientation}</div>
                </div>
              </div>
              <p style={{ color: '#C0D0E0', fontSize: 14, margin: 0, lineHeight: 1.6 }}>{result.note}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
