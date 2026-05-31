import { useState } from 'react';

export default function DFWHomeownerActionPlan2026() {
  const [stage, setStage] = useState('');

  const actions: Record<string, { title: string; steps: string[] }> = {
    new: {
      title: '🏠 New DFW Homeowner — Today’s Priority List',
      steps: [
        '🔗 Join ProLnk waitlist NOW — Charter tier closes at 500 homeowners (you get locked-in pricing)',
        '🏦 Sign up for Home Health Vault — free digital record of your home’s health and history',
        '📍 Find and label all shutoffs: main water, gas shutoff, electrical panel breakers',
        '📞 Save ProLnk in your phone as "Home Emergency" — instant access to DFW pros',
        '🌡️ Schedule HVAC tune-up if not done this spring — DFW summer starts early',
        '📷 Photo-document your attic, crawl space, and water heater for the Vault',
      ],
    },
    established: {
      title: '🏡 Established DFW Homeowner — Upgrade Your Setup',
      steps: [
        '🔗 Check if you’re on ProLnk waitlist — Charter pricing still available briefly',
        '🏦 Add your home to Home Health Vault — protects your equity and simplifies selling',
        '🌡️ HVAC tune-up before June — DFW summers stress systems hard',
        '🔍 Walk your roof after any hail event — DFW hail season peaks May–June',
        '💧 Check all hose bibs and irrigation heads before summer watering season',
        '📞 Get 3 ProLnk quotes for any deferred maintenance — locked-in Charter rates',
      ],
    },
    selling: {
      title: '🏷️ Preparing to Sell — Maximize Your DFW Home Value',
      steps: [
        '🏦 Home Health Vault report = powerful disclosure document for buyers',
        '🔗 Use ProLnk to get fast quotes on pre-sale repairs — saves weeks on market',
        '🌡️ HVAC inspection report = major buyer confidence builder in DFW',
        '🔍 ProLnk can source foundation inspection, roof cert, and plumbing camera',
        '📊 Vault data shows maintenance history — commands premium pricing',
        `⚡ Electrical panel inspection — buyers' lenders often require it`,
      ],
    },
    renting: {
      title: '🏘️ DFW Landlord — Protect Your Investment Today',
      steps: [
        '🔗 ProLnk Charter = priority access to DFW pros for tenant emergencies',
        '🏦 Home Health Vault tracks maintenance per property — essential for multi-property',
        '🌡️ HVAC must be tenant-habitable — schedule inspection for each unit',
        '💧 Water heater age check — Texas law requires functional hot water',
        '🔍 Smoke and CO detector audit — required by Texas property code',
        '📞 ProLnk priority queue = faster response for rental emergencies',
      ],
    },
  };

  const result = stage ? actions[stage] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', padding: '32px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>📋</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>
            DFW Homeowner Action Plan 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>What DFW homeowners should do RIGHT NOW - based on your situation</p>
        </div>

        <div>
          <label style={{ color: '#F5E642', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 12 }}>YOUR HOMEOWNER STAGE</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
            {[
              { v: 'new', l: '🏠 New Homeowner' },
              { v: 'established', l: '🏡 Established Owner' },
              { v: 'selling', l: '🏷️ Preparing to Sell' },
              { v: 'renting', l: '🏘️ Landlord/Investor' },
            ].map(o => (
              <button key={o.v} onClick={() => setStage(o.v)}
                style={{ padding: '16px', borderRadius: 10, border: '2px solid', cursor: 'pointer',
                  borderColor: stage === o.v ? '#F5E642' : '#1e3a5f',
                  backgroundColor: stage === o.v ? '#F5E64220' : '#0d1f3c',
                  color: '#fff', fontSize: 15, textAlign: 'left' }}>
                {o.l}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ backgroundColor: '#0d1f3c', borderRadius: 12, padding: 24, border: '1px solid #F5E64240' }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>{result.title}</h2>
            {result.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: i < result.steps.length - 1 ? '1px solid #1e3a5f' : 'none' }}>
                <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 24 }}>{i + 1}.</span>
                <span style={{ fontSize: 15, lineHeight: 1.6 }}>{step}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 32, backgroundColor: '#F5E64215', borderRadius: 12, padding: 24, textAlign: 'center', border: '1px solid #F5E64240' }}>
          <div style={{ fontSize: 32 }}>⏰</div>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, margin: '8px 0 4px' }}>Charter Waitlist Closing Soon</p>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>ProLnk Charter tier locks in your rate forever. Only 500 DFW homeowner spots available.</p>
        </div>
      </div>
    </div>
  );
}
