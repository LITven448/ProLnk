import { useState } from 'react';

const ozoneGuide = [
  { activity: 'Morning Run / Walk', icon: '🏃', guidance: 'Avoid outdoor exercise before noon on ozone alert days. Ozone peaks 10am–6pm in DFW. Move exercise indoors or to early morning before 7am if air quality index is above 100.' },
  { activity: 'Yard Work / Mowing', icon: '🌿', guidance: 'Mowing contributes to ozone — gas-powered mowers emit VOCs. On ozone alert days, skip yard work or use an electric mower. Dallas County ozone alerts often restrict burning and encourage mowing postponement.' },
  { activity: 'Pool / Outdoor Play', icon: '🏊', guidance: 'Limit outdoor time for children and elderly on red/purple ozone days. Even moderate activity outdoors during peak ozone hours (10am-6pm) can cause respiratory irritation in sensitive groups.' },
  { activity: 'HVAC Management', icon: '🌬️', guidance: 'Switch HVAC to recirculate (not fresh air intake) during ozone alerts. Keep windows closed 10am–6pm. Run HVAC with a MERV-13 filter to trap fine particles that often accompany high ozone days.' },
  { activity: 'Grilling / Burning', icon: '🔥', guidance: 'Open burning is prohibited in Dallas/Tarrant County on ozone alert days. Gas grills are fine, but charcoal or wood burning adds to VOC emissions. Never burn yard waste on ozone alert days — it\'s typically illegal.' },
  { activity: 'Commuting / Driving', icon: '🚗', guidance: 'DFW ozone spikes partly from vehicle emissions. On alert days, consider carpooling, working from home, or avoiding rush hour driving. Fill up gas tanks after 6pm (reduces evaporative emissions in heat).' },
  { activity: 'Home Painting / Renovation', icon: '🎨', guidance: 'VOC-emitting activities like painting, varnishing, or solvent cleaning add to ozone formation. Schedule exterior painting and solvent use for non-alert days or for evening hours. Use low-VOC products always.' },
];

export default function DFWOzoneAlertGuide2026() {
  const [activity, setActivity] = useState('Morning Run / Walk');
  const result = ozoneGuide.find(g => g.activity === activity);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🌫️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '12px 0 8px' }}>DFW Ozone Alert Day Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>DFW has among the worst ozone in the US — here's how homeowners should respond</p>
        </div>

        <div style={{ background: '#0F2137', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 16 }}>📊 DFW Ozone Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '📅', label: 'Peak Ozone Season', value: 'June – September' },
              { icon: '⏰', label: 'Daily Peak Hours', value: '10am – 6pm' },
              { icon: '🏙️', label: 'DFW Ozone Ranking', value: 'Top 10 worst US metros' },
              { icon: '📱', label: 'Alert Source', value: 'airnow.gov + NCTCOG alerts' },
            ].map(({ icon, label, value }) => (
              <div key={label} style={{ background: '#162842', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
                <div style={{ color: '#F5E642', fontSize: 15, fontWeight: 700 }}>{value}</div>
                <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2137', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 8 }}>🚦 AQI Color Guide</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {[
              { color: '#22c55e', label: 'Good (0–50)', action: 'No restrictions' },
              { color: '#eab308', label: 'Moderate (51–100)', action: 'Sensitive groups limit prolonged outdoor exertion' },
              { color: '#f97316', label: 'Unhealthy for Sensitive (101–150)', action: 'Ozone alert — sensitive groups stay inside during peak hours' },
              { color: '#ef4444', label: 'Unhealthy (151–200)', action: 'Ozone action day — all residents limit outdoor activity 10am–6pm' },
              { color: '#7c3aed', label: 'Very Unhealthy (201+)', action: 'Stay inside. Run HVAC recirculate. No outdoor exercise.' },
            ].map(({ color, label, action }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#162842', borderRadius: 8, padding: '10px 14px' }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, background: color, flexShrink: 0 }} />
                <div>
                  <div style={{ color, fontSize: 13, fontWeight: 700 }}>{label}</div>
                  <div style={{ color: '#94a3b8', fontSize: 12 }}>{action}</div>
                </div>
              </div>
            ))}
          </div>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 12 }}>🔍 What To Do On Ozone Alert Days</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {ozoneGuide.map(g => (
              <button key={g.activity} onClick={() => setActivity(g.activity)} style={{ padding: '7px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', background: activity === g.activity ? '#F5E642' : '#162842', color: activity === g.activity ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 12 }}>{g.icon} {g.activity}</button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#162842', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{result.icon}</div>
              <div style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.7 }}>{result.guidance}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2137', borderRadius: 12, padding: 20 }}>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>Sign up for NCTCOG DFW Ozone alerts at <span style={{ color: '#F5E642' }}>airnow.gov</span>. ProLnk's Home Health Vault tracks your HVAC filter replacement dates — clean filters are critical on high-ozone days.</p>
        </div>
      </div>
    </div>
  );
}