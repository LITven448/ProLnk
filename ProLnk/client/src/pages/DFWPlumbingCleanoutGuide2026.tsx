import { useState } from 'react';

const homeTypes = ['Slab Foundation', 'Pier & Beam', 'Older (Pre-1980)', 'New Construction (Post-2010)'];
const concerns = [
  { id: 'slow', label: 'Slow drains' },
  { id: 'backup', label: 'Sewer backup' },
  { id: 'smell', label: 'Sewer odor' },
  { id: 'camera', label: 'Camera inspection' },
  { id: 'roots', label: 'Tree root concern' },
];

const cleanoutInfo: Record<string, { locations: string[]; tip: string; urgency: string }> = {
  'slow': { locations: ['Secondary cleanout (inside near laundry or bath)', 'Main cleanout (yard near foundation)'], tip: 'Slow drains often indicate partial blockage — cleanout access lets plumber snake or camera the line', urgency: 'Schedule within 1 week' },
  'backup': { locations: ['Main sewer cleanout (yard) — PRIMARY for backup events', 'Roof stack cap (secondary access)'], tip: 'Backup means blockage past secondary lines — main cleanout is the access point for clearing', urgency: 'Emergency — call immediately' },
  'smell': { locations: ['Roof stack cleanout cap', 'Floor drain cleanout if present'], tip: 'Odor without backup often means dry trap or venting issue — cleanout used for camera to diagnose', urgency: 'Schedule within 3 days' },
  'camera': { locations: ['Main sewer cleanout (preferred camera entry point)', 'Secondary cleanout if main is inaccessible'], tip: 'Camera inspection through main cleanout gives full line view from house to city tie-in', urgency: 'Schedule at your convenience' },
  'roots': { locations: ['Main sewer cleanout (cleanout → camera → root cutting)', 'May require multiple access points for full line'], tip: 'DFW trees (especially live oak, pecan) have aggressive roots — main cleanout is first access for root assessment', urgency: 'Schedule within 2 weeks' },
};

const foundationNotes: Record<string, string> = {
  'Slab Foundation': 'Main cleanout typically 4-6 inches above grade in yard, within 10 ft of exterior wall. No basement access.',
  'Pier & Beam': 'May have cleanout access under house — check crawl space near bath/kitchen stacks. Easier access than slab.',
  'Older (Pre-1980)': 'May have cast iron pipes with limited cleanout access. Plumber may need to add cleanout during service.',
  'New Construction (Post-2010)': 'Cleanouts required by code at all direction changes. Multiple access points built in — locate near laundry, baths, and main line exit.',
};

export default function DFWPlumbingCleanoutGuide2026() {
  const [homeType, setHomeType] = useState('Slab Foundation');
  const [concern, setConcern] = useState(concerns[0]);

  const info = cleanoutInfo[concern.id] || cleanoutInfo['slow'];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW PLUMBING CLEANOUT GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>Locating and Using Cleanouts in DFW Homes</h1>
        <p style={{ color: '#9BA3AF', fontSize: 15, marginBottom: 32 }}>Cleanouts are the access points that let plumbers diagnose and clear your sewer system without digging. Knowing where yours are saves time and money.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>🏠 Your Home Type</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {homeTypes.map(t => (
              <button key={t} onClick={() => setHomeType(t)} style={{ background: homeType === t ? '#F5E642′ : '#1A2F50', color: homeType === t ? '#0A1628' : '#E8EAF0', border: ’none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{t}</button>
            ))}
          </div>
          <div style={{ background: '#1A2F50', borderRadius: 8, padding: 14 }}>
            <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 6 }}>📋 Foundation Note</div>
            <div style={{ color: '#CBD5E1', fontSize: 14 }}>{foundationNotes[homeType]}</div>
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🔧 Your Plumbing Concern</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {concerns.map(c => (
              <button key={c.id} onClick={() => setConcern(c)} style={{ background: concern.id === c.id ? '#F5E642′ : '#1A2F50', color: concern.id === c.id ? '#0A1628' : '#E8EAF0', border: ’none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{c.label}</button>
            ))}
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ color: '#9BA3AF', fontSize: 13, marginBottom: 8 }}>Recommended Access Points</div>
            {info.locations.map((loc, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 6 }}>
                <span style={{ color: '#F5E642′ }}>📍</span>
                <span style={{ color: '#CBD5E1', fontSize: 14 }}>{loc}</span>
              </div>
            ))}
          </div>
          <div style={{ background: '#1A2F50', borderRadius: 8, padding: 12, marginBottom: 12 }}>
            <div style={{ color: '#CBD5E1', fontSize: 14 }}>{info.tip}</div>
          </div>
          <div style={{ color: info.urgency.includes('Emergency') ? '#EF4444′ : '#F5E642', fontWeight: 700, fontSize: 14 }}>⏱️ {info.urgency}</div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🗺️ Cleanout Types in DFW Homes</div>
          {['Main sewer cleanout: round cap in yard, usually PVC or cast iron, near foundation perimeter', 'Secondary cleanout: often near laundry room, hall bath, or utility area inside home', 'Roof stack cap: at top of vent pipe — used for camera and clearing when main is buried', 'Floor cleanout: in garage or utility room — common in pre-1980 DFW homes', 'Charter ProLnk plumbers locate, mark, and document all cleanouts during first service visit'].map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <span style={{ color: '#F5E642′ }}>✓</span>
              <span style={{ color: '#CBD5E1', fontSize: 14 }}>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}