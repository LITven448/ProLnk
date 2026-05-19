import { useState } from 'react';

const homeValues = ['Under $300K', '$300K–$500K', '$500K–$750K', '$750K–$1M', 'Over $1M'];
const timelines = ['1–2 Years', '3–5 Years', '5+ Years'];
const submarkets = ['North DFW (Frisco/McKinney)', 'East DFW (Mesquite/Garland)', 'South DFW (Mansfield/Midlothian)', 'West DFW (Fort Worth/Arlington)', 'Core DFW (Dallas/Irving/Plano)'];

type Project = { label: string; roi: string; cost: string; valueGain: string; priority: number };

const projects: Record<string, Record<string, Project[]>> = {
  '1–2 Years': {
    'North DFW (Frisco/McKinney)': [
      { label: 'Kitchen Refresh (paint + hardware)', roi: '120%', cost: '$3K–$6K', valueGain: '$5K–$9K', priority: 1 },
      { label: 'Curb Appeal (landscaping + paint)', roi: '115%', cost: '$5K–$10K', valueGain: '$7K–$13K', priority: 2 },
      { label: 'Primary Bath Update', roi: '105%', cost: '$8K–$15K', valueGain: '$10K–$18K', priority: 3 },
    ],
    'Core DFW (Dallas/Irving/Plano)': [
      { label: 'Kitchen Refresh', roi: '125%', cost: '$4K–$8K', valueGain: '$6K–$12K', priority: 1 },
      { label: 'Exterior Paint', roi: '110%', cost: '$3K–$6K', valueGain: '$4K–$8K', priority: 2 },
    ],
  },
  '3–5 Years': {
    'North DFW (Frisco/McKinney)': [
      { label: 'Full Kitchen Remodel', roi: '75%', cost: '$25K–$50K', valueGain: '$20K–$40K', priority: 1 },
      { label: 'Primary Suite Addition', roi: '70%', cost: '$40K–$80K', valueGain: '$30K–$60K', priority: 2 },
      { label: 'Outdoor Living Space', roi: '65%', cost: '$20K–$45K', valueGain: '$15K–$35K', priority: 3 },
    ],
    'Core DFW (Dallas/Irving/Plano)': [
      { label: 'Full Kitchen Remodel', roi: '80%', cost: '$20K–$45K', valueGain: '$18K–$38K', priority: 1 },
      { label: 'Bathroom Addition', roi: '70%', cost: '$15K–$30K', valueGain: '$12K–$24K', priority: 2 },
    ],
  },
  '5+ Years': {
    'North DFW (Frisco/McKinney)': [
      { label: 'Room Addition (bonus room/office)', roi: '60%', cost: '$50K–$100K', valueGain: '$35K–$70K', priority: 1 },
      { label: 'Full Primary Suite Remodel', roi: '65%', cost: '$35K–$70K', valueGain: '$25K–$52K', priority: 2 },
      { label: 'Solar Panel Installation', roi: '55%', cost: '$20K–$35K', valueGain: '$12K–$22K', priority: 3 },
    ],
    'Core DFW (Dallas/Irving/Plano)': [
      { label: 'Garage Conversion/ADU', roi: '70%', cost: '$30K–$60K', valueGain: '$22K–$48K', priority: 1 },
      { label: 'Full Exterior Renovation', roi: '60%', cost: '$15K–$30K', valueGain: '$10K–$20K', priority: 2 },
    ],
  },
};

const getFallback = (timeline: string): Project[] => [
  { label: 'Kitchen Update', roi: '85%', cost: '$8K–$20K', valueGain: '$7K–$18K', priority: 1 },
  { label: 'Curb Appeal & Landscaping', roi: '100%', cost: '$5K–$12K', valueGain: '$6K–$14K', priority: 2 },
  { label: 'Bathroom Refresh', roi: '80%', cost: '$6K–$15K', valueGain: '$5K–$13K', priority: 3 },
];

export default function DFWHomeValueBudget() {
  const [homeValue, setHomeValue] = useState('');
  const [timeline, setTimeline] = useState('');
  const [submarket, setSubmarket] = useState('');

  const key1 = timeline;
  const key2 = submarket;
  const items = (key1 && key2 && projects[key1]?.[key2]) ? projects[key1][key2] : (timeline ? getFallback(timeline) : []);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK DFW</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Home Value Budget Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Invest in your DFW home strategically. See ROI-ranked improvement projects matched to your submarket and timeline.</p>

        <div style={{ marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Home value</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {homeValues.map(v => <button key={v} onClick={() => setHomeValue(v)} style={{ background: homeValue === v ? '#F5E642′ : '#111d30', color: homeValue === v ? '#0A1628' : '#fff', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.5rem 1rem', cursor: ’pointer', fontWeight: 600, fontSize: 13 }}>{v}</button>)}
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Years until you sell</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {timelines.map(t => <button key={t} onClick={() => setTimeline(t)} style={{ background: timeline === t ? '#F5E642′ : '#111d30', color: timeline === t ? '#0A1628' : '#fff', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.5rem 1rem', cursor: ’pointer', fontWeight: 600 }}>{t}</button>)}
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>DFW submarket</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {submarkets.map(s => <button key={s} onClick={() => setSubmarket(s)} style={{ background: submarket === s ? '#F5E642′ : '#111d30', color: submarket === s ? '#0A1628' : '#fff', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.5rem 1rem', cursor: ’pointer', fontWeight: 600, fontSize: 12 }}>{s}</button>)}
          </div>
        </div>

        {items.length > 0 && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {items.map((item, i) => (
                <div key={i} style={{ background: '#111d30', borderRadius: 10, padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: 14, borderLeft: `4px solid ${i === 0 ? '#22c55e' : i === 1 ? '#F5E642' : '#94a3b8'}` }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700 }}>{item.label}</div>
                    <div style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>Cost: {item.cost} · Expected gain: {item.valueGain}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#22c55e', fontWeight: 800 }}>{item.roi} ROI</div>
                    <div style={{ color: '#475569', fontSize: 11 }}>avg DFW</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, background: '#111d30', borderRadius: 10, padding: '1rem', color: '#64748b', fontSize: 13 }}>
              💡 <strong style={{ color: '#F5E642′ }}>ProLnk tip:</strong> Get 3 competitive quotes on any value project. ProLnk matches you with verified DFW contractors who know your submarket.
            </div>
          </>
        )}
        {!timeline && <div style={{ color: '#334155', textAlign: 'center', marginTop: 40 }}>Select your home value, timeline, and submarket to see ranked projects</div>}
      </div>
    </div>
  );
}
