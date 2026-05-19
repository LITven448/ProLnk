import { useState } from 'react';

const destinations: Record<string, { options: { mode: string; time: string; rating: string; notes: string }[]; verdict: string }> = {
  "Downtown Dallas": {
    options: [
      { mode: '🚗 Car', time: '15–40 min', rating: 'Best', notes: 'I-30, I-35, or Dallas North Tollway' },
      { mode: '🚊 DART Rail', time: '20–50 min', rating: 'Good', notes: 'Red/Blue/Green lines serve downtown from many areas' },
      { mode: '🚌 Bus', time: '45–75 min', rating: 'Fair', notes: 'Limited coverage; infrequent service outside core' },
      { mode: '🛴 Scooter/Bike', time: 'N/A', rating: 'Poor', notes: 'Only viable from Uptown/Deep Ellum (1–3 miles)' },
    ],
    verdict: 'DART rail is genuinely viable if you live near a station — check dallasdart.org for your address.',
  },
  "Fort Worth Downtown": {
    options: [
      { mode: '🚗 Car', time: '20–50 min from East DFW', rating: 'Best', notes: 'I-30 or I-20 from Dallas side; 30 min from mid-cities' },
      { mode: '🚊 TRE Commuter Rail', time: '60–90 min from Dallas', rating: 'Fair', notes: 'Runs Dallas to Fort Worth but limited frequency (hourly)' },
      { mode: '🚌 Trinity Metro Bus', time: 'Varies', rating: 'Fair', notes: 'Covers Fort Worth metro but not cross-metro' },
      { mode: '✈️ From DFW Airport', time: '20 min', rating: 'N/A', notes: 'TEXRail connects DFW Airport to Fort Worth downtown' },
    ],
    verdict: 'Car is strongly preferred. TRE is viable for occasional commuters — not daily use.',
  },
  "DFW Airport": {
    options: [
      { mode: '🚗 Car/Rideshare', time: '20–45 min from most DFW', rating: 'Best', notes: 'DART Orange Line stops at Terminal A only' },
      { mode: '🚊 DART Orange Line', time: '45–75 min from Dallas', rating: 'Fair', notes: 'Runs from Cityline/Bush Station; covers one terminal' },
      { mode: '🚊 TEXRail', time: '30 min from Fort Worth', rating: 'Good', notes: 'Connects FW downtown to Terminal B' },
      { mode: '🚌 Shuttle', time: '30–60 min', rating: 'Fair', notes: 'Various airport shuttles from suburbs' },
    ],
    verdict: 'DART Orange Line is the only transit option from Dallas; covers Terminal A only.',
  },
  "Suburban Office Parks": {
    options: [
      { mode: '🚗 Car', time: '20–45 min', rating: 'Best', notes: 'George Bush Tollway or Highway 114 for Las Colinas' },
      { mode: '🚊 DART Rail', time: '30–60 min', rating: 'Fair', notes: 'Las Colinas Urban Center and Irving stations exist' },
      { mode: '🛴 Bikeshare (LIME)', time: 'Limited', rating: 'Poor', notes: 'Available in some Legacy West, Uptown zones only' },
      { mode: '🚌 GoLink', time: '20–40 min', rating: 'Fair', notes: 'On-demand microtransit fills DART gaps in suburbs' },
    ],
    verdict: 'Car is essential for suburban office parks. GoLink fills the last-mile gap near some DART stations.',
  },
};

export default function DFWTransportationGuide2026() {
  const [selected, setSelected] = useState<string>('');

  const result = selected ? destinations[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🚊</div>
          <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 700, marginBottom: 8 }}>DFW Transportation Guide 2026</h1>
          <p style={{ color: '#9BA3B2', fontSize: 16 }}>Reality check: a car is essential in DFW — but transit options are growing</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🚊', label: 'DART Light Rail', desc: '93 miles; covers Dallas core suburbs' },
            { icon: '🚌', label: 'GoLink On-Demand', desc: 'Microtransit fills suburban gaps' },
            { icon: '🚂', label: 'TRE Commuter Rail', desc: 'Dallas to Fort Worth hourly' },
            { icon: '🛴', label: 'LIME Bikeshare', desc: 'Uptown, Deep Ellum, select zones' },
          ].map(card => (
            <div key={card.label} style={{ background: '#0F1E35', borderRadius: 12, padding: 18, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 4, fontSize: 14 }}>{card.label}</div>
              <div style={{ color: '#9BA3B2', fontSize: 13 }}>{card.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F1E35', borderRadius: 12, padding: 24, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📍 Where Are You Commuting To?</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {Object.keys(destinations).map(d => (
              <button key={d} onClick={() => setSelected(d)} style={{ padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: selected === d ? '#F5E642' : '#1A2E48', color: selected === d ? '#0A1628' : '#E8EAF0', fontWeight: 600, fontSize: 13 }}>{d}</button>
            ))}
          </div>
          {result && (
            <div>
              {result.options.map(opt => (
                <div key={opt.mode} style={{ background: '#0A1628', borderRadius: 10, padding: 16, marginBottom: 10, border: '1px solid #1A2E48', display: 'grid', gridTemplateColumns: 'auto 90px 70px 1fr', gap: 12, alignItems: 'center' }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{opt.mode}</div>
                  <div style={{ color: '#F5E642', fontSize: 13 }}>{opt.time}</div>
                  <div style={{ color: opt.rating === 'Best' ? '#4ADE80' : opt.rating === 'Good' ? '#60A5FA' : opt.rating === 'Fair' ? '#F5E642' : '#F87171', fontSize: 13, fontWeight: 600 }}>{opt.rating}</div>
                  <div style={{ color: '#9BA3B2', fontSize: 13 }}>{opt.notes}</div>
                </div>
              ))}
              <div style={{ padding: '14px 16px', background: '#1A2E48', borderRadius: 8, marginTop: 8, borderLeft: '3px solid #F5E642', fontSize: 14, color: '#E8EAF0' }}>{result.verdict}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F1E35', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🚗 The DFW Reality</h2>
          <p style={{ color: '#9BA3B2', lineHeight: 1.7 }}>DFW is one of the most car-dependent metros in the US. Budget $8,000–15,000/year per vehicle for ownership costs. DART covers 93 miles and 64 stations but only works well if you live and work near stations. The GoLink on-demand service is genuinely useful for last-mile connections. For most DFW residents, a car is not optional — it is infrastructure.</p>
        </div>
      </div>
    </div>
  );
}
