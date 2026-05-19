import { useState } from 'react';

const featureApps: Record<string, { app: string; use: string; tip: string }[]> = {
  hvac: [
    { app: '🌡️ Nest / Ecobee', use: 'Remote temperature control + filter alerts', tip: 'Set DFW summer schedules: pre-cool to 74°F by 3 PM before peak rates' },
    { app: '📊 Atmos Energy App', use: 'Gas usage monitoring and emergency line', tip: 'Save 1-800-ATM0S-EN (emergency) in contacts labeled GAS LEAK 🚨' }
  ],
  water: [
    { app: '💧 Flo by Moen', use: 'Smart leak detection and water usage', tip: 'DFW pipes freeze in January — enable freeze alerts in settings' },
    { app: '🏙️ Dallas Water Utilities', use: 'Bill pay + conservation alerts', tip: 'Enroll in drought restriction alerts — Stage 3 bans irrigation' }
  ],
  contractor: [
    { app: '📸 Google Photos', use: 'Document repairs with dated, location-stamped photos', tip: 'Create album per trade: "HVAC", "Plumbing", "Roof" — share album link to contractor' },
    { app: '📝 HomeZada', use: 'Home inventory, maintenance log, warranties', tip: 'Photograph serial numbers of every appliance during move-in' }
  ],
  security: [
    { app: '🔔 Ring / SimpliSafe', use: 'Motion alerts, package detection, video archive', tip: 'DFW package theft spikes Nov–Jan — set immediate delivery alerts' },
    { app: '🏘️ Nextdoor', use: 'Neighborhood alerts, contractor referrals, tool sharing', tip: 'Search "recommend" + trade type for vetted local pros' }
  ],
  utility: [
    { app: '⚡ Power To Choose', use: 'Compare DFW electricity rates (deregulated market)', tip: 'Lock in 12-month fixed rates in spring before summer peak pricing' },
    { app: '📅 Filter Easy', use: 'Auto-ship HVAC filters on schedule', tip: 'DFW: replace every 45 days June–September due to dust and pollen' }
  ]
};

const features = [
  { key: 'hvac', label: '❄️ HVAC / Heating' },
  { key: 'water', label: '💧 Water / Plumbing' },
  { key: 'contractor', label: '🔧 Contractor Docs' },
  { key: 'security', label: '🔐 Security' },
  { key: 'utility', label: '⚡ Utilities' }
];

export default function DFWSmartphoneHomeGuide() {
  const [selected, setSelected] = useState('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOMEOWNER RESOURCE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>📱 Smartphone Home Management — DFW Edition</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>The apps DFW homeowners actually use — with North Texas-specific setup tips.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🚨 Save These Now (DFW Emergencies)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['📞 Atmos Gas Emergency','1-888-286-6700'],['💧 Dallas Water Leak','214-651-1441'],['⚡ Oncor Outage Report','888-313-4747'],['🚒 Non-Emergency Fire','214-670-4220']].map(([label, num]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{label}</div>
                <div style={{ fontSize: 14, color: '#F5E642', fontFamily: 'monospace', marginTop: 4 }}>{num}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 What features does your home have?</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {features.map(f => (
              <button key={f.key} onClick={() => setSelected(f.key)} style={{ padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, background: selected === f.key ? '#F5E642′ : '#1E3A5F', color: selected === f.key ? '#0A1628' : '#E8EDF5', fontWeight: selected === f.key ? 700 : 400 }}>{f.label}</button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ display: 'grid', gap: 16 }}>
            {featureApps[selected].map(a => (
              <div key={a.app} style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{a.app}</div>
                <div style={{ color: '#94A3B8', fontSize: 14, marginBottom: 12 }}>{a.use}</div>
                <div style={{ background: '#1E3A5F', borderRadius: 8, padding: 12, fontSize: 13 }}>💡 DFW Tip: {a.tip}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
