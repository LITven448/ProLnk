import { useState } from 'react';

const interests = [
  { id: 'heat', label: '🌡️ Extreme Heat Monitoring' },
  { id: 'storms', label: '⛈️ Severe Storm Tracking' },
  { id: 'foundation', label: '🏗️ Foundation & Soil Moisture' },
  { id: 'irrigation', label: '💧 Smart Irrigation' },
  { id: 'hobbyist', label: '📡 Weather Enthusiast / WU' },
];

const stations: Record<string, { brand: string; model: string; cost: string; placement: string; dfwNote: string; wuNote: string }> = {
  heat: {
    brand: 'Ambient Weather',
    model: 'WS-2902C',
    cost: '$180-220',
    placement: 'Radiation shield required in DFW — full sun invalidates temperature readings. Mount 5 ft off ground, north-facing, 10+ ft from any heat-absorbing surface (asphalt, AC condenser).',
    dfwNote: 'DFW urban heat islands vary 8-12°F between neighborhoods. Your official NWS station may read 10°F cooler than your actual backyard. Critical for timing outdoor work and HVAC optimization.',
    wuNote: 'Connects to Weather Underground via Ambientweather.net. Data uploads automatically. Your neighbors can see your readings and you can see theirs for hyper-local storm timing.',
  },
  storms: {
    brand: 'Davis Instruments',
    model: 'Vantage Vue',
    cost: '$380-430',
    placement: 'Wind sensor must be above roof line — 10+ ft above any obstruction within 30 ft. Install on roof peak or dedicated mast. Davis uses ultrasonic wind sensor — no cups to break in hail.',
    dfwNote: 'DFW sits in Tornado Alley. Davis stations handle extreme conditions: wind to 150 mph, hail, lightning surge protection. Most durable option for DFW severe weather season (April-June, Oct-Nov).',
    wuNote: 'Davis WeatherLink Live module ($170) enables Weather Underground integration. Real-time storm tracking shared with WU community. Excellent data quality — WU uses Davis for reference stations.',
  },
  foundation: {
    brand: 'Ecowitt',
    model: 'GW2000 + Soil Moisture Sensors',
    cost: '$120-180 + $25/sensor',
    placement: 'Add WH51 soil moisture sensors ($25 each) at 6" depth around foundation perimeter — at least 4 corners. Base station indoors. Soil sensor probes placed in clay soil at each corner.',
    dfwNote: 'DFW clay shrinks dramatically below 20% volumetric moisture. Set alerts at 25% to trigger soaker hose before critical foundation movement occurs. One sensor per corner = early warning system.',
    wuNote: 'Ecowitt supports Weather Underground via API. Soil data private but weather data shares to WU. Excellent value for DFW foundation-focused homeowners.',
  },
  irrigation: {
    brand: 'Ambient Weather',
    model: 'WS-1965 or Ecowitt HP10',
    cost: '$90-140',
    placement: 'Mount near irrigation controller for short cable run. Prioritize accurate rainfall sensor placement — open sky, away from sprinklers and tree drip lines. 6+ ft height.',
    dfwNote: 'DFW clay holds water 3-4 days after 1" rain. Configure irrigation pause: skip 3 days after 0.5" rain, skip 5 days after 1"+ rain. In summer, supplement only — never irrigate when soil reads moist.',
    wuNote: 'Compatible with Rachio and Orbit B-hyve via IFTTT or direct API. When your WU station reports rain, irrigation skips automatically — a true set-and-forget DFW setup.',
  },
  hobbyist: {
    brand: 'Davis Instruments',
    model: 'Vantage Pro 2',
    cost: '$650-800',
    placement: 'Professional installation recommended. Wireless sensor suite: ISS on roof mast (non-penetrating mount available), console indoors. Add solar radiation sensor for full DFW data logging.',
    dfwNote: 'DFW has one of the most active WU Personal Weather Station networks in the nation. Sharing high-quality data makes you part of the community and improves local forecasting for everyone.',
    wuNote: 'Davis WeatherLink Live uploads all parameters: temp, humidity, dew point, barometer, wind speed/dir, rainfall, UV index, solar radiation. View at weatherunderground.com/personal-weather-station. Earn WU Pro perks for consistent uploads.',
  },
};

export default function DFWWeatherStationGuide() {
  const [selected, setSelected] = useState<string | null>(null);
  const rec = selected ? stations[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>📡 DFW HOME TECH</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Personal Weather Station Guide for DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          DFW's microclimates can vary by 10°F across a few miles due to urban heat islands, proximity to lakes, and elevation. A personal weather station gives you hyperlocal data that drives better foundation care, irrigation scheduling, and storm preparedness decisions.
        </p>

        <div style={{ background: '#0f2240', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>🗺️ Why Hyperlocal DFW Weather Matters</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              ['Urban Heat Islands', 'Downtown Dallas/Fort Worth can be 12°F hotter than outer suburbs on calm nights'],
              ['Storm Cell Variability', 'DFW storm cells are narrow — 3" of rain in Southlake, 0" in Keller same hour'],
              ['Foundation Decisions', 'Soil moisture, not NWS forecast, determines when to run foundation soaker hose'],
              ['Irrigation ROI', 'WU-integrated systems save 30-40% on water bills by using your actual rainfall data'],
            ].map(([title, desc]) => (
              <div key={title} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{title}</div>
                <div style={{ fontSize: 13, color: '#94a3b8' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14 }}>What's your main DFW interest?</h2>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
          {interests.map(i => (
            <button key={i.id} onClick={() => setSelected(i.id)}
              style={{ background: selected === i.id ? '#F5E642' : '#0f2240', color: selected === i.id ? '#0A1628' : '#fff', border: '2px solid #F5E642', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: 700, fontSize: 14 }}>
              {i.label}
            </button>
          ))}
        </div>

        {rec && (
          <div style={{ background: '#0f2240', borderRadius: 12, padding: 24, border: '2px solid #F5E642' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642', marginBottom: 4 }}>{rec.brand} — {rec.model}</div>
            <div style={{ fontSize: 16, color: '#94a3b8', marginBottom: 16 }}>Estimated cost: {rec.cost}</div>
            {[
              ['📍 DFW Placement Notes', rec.placement],
              ['🏠 DFW-Specific Value', rec.dfwNote],
              ['🌐 Weather Underground Integration', rec.wuNote],
            ].map(([label, text]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 10 }}>
                <div style={{ fontSize: 12, color: '#F5E642', marginBottom: 6 }}>{label}</div>
                <div style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.6 }}>{text}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
