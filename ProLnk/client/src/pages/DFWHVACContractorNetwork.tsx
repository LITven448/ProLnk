import { useState } from 'react';

const SITUATIONS = [
  'New homeowner, no contractor yet',
  'My contractor retired or moved',
  'Had a bad experience, need a fresh start',
  'Primary tech is booked out weeks',
  'Just want a backup option',
];

const PLANS: Record<string, string[]> = {
  'New homeowner, no contractor yet': [
    '📋 Get a home inspection HVAC report as your baseline',
    '🔍 Ask neighbors in your DFW HOA for referrals',
    '📅 Schedule a tune-up now — before summer peak demand',
    '📒 Document the tech name, company, and what they find',
    '📲 Save ProLnk as your backup when your primary is unavailable',
  ],
  'My contractor retired or moved': [
    '📁 Pull all past service records before losing access',
    '🗓️ Book a full system assessment with a new tech this spring',
    '🔄 Treat this as a fresh start — get a second opinion on system health',
    '📲 Use ProLnk to find vetted DFW techs without cold-calling',
    '📒 Build a new service history log from this point forward',
  ],
  'Had a bad experience, need a fresh start': [
    '📝 Document what went wrong for your records',
    '🔍 Ask specifically about certifications: NATE, EPA 608',
    '💬 Request references from other DFW homeowners',
    '📲 ProLnk vets techs before they appear on the platform',
    '📅 Start with a tune-up, not a repair — lower stakes intro',
  ],
  'Primary tech is booked out weeks': [
    '🌡️ DFW summer demand spikes in May — book April or earlier next year',
    '📲 ProLnk matches you to available vetted techs in your area',
    '📋 Keep a short list of 2-3 backup contractors at all times',
    '📒 Share your service history with any new tech you bring in',
    '🔧 For emergencies: describe the issue clearly to get faster help',
  ],
  'Just want a backup option': [
    '📲 ProLnk is built for exactly this — on-demand vetted techs',
    '📋 Keep your equipment model/serial numbers handy for any tech',
    '📅 Annual tune-ups build relationships before emergencies happen',
    '💬 Tell your backup tech about your system history upfront',
    '🗂️ Home Health Vault stores your records so any tech can see them',
  ],
};

export default function DFWHVACContractorNetwork() {
  const [selected, setSelected] = useState('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>
          PROLNK · DFW HVAC GUIDE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
          Build Your DFW HVAC Contractor Network
        </h1>
        <p style={{ color: '#8899AA', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          Find a trusted HVAC tech before you need one. In DFW, summer demand spikes fast — waiting until your system fails means waiting days for service. Build your network now.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>
            🏗️ The Three-Layer Contractor Network
          </h2>
          {[
            ['Primary Tech', 'Your go-to. Knows your system, your history, your home. Built through annual tune-ups.'],
            ['Backup Tech', 'Available when your primary is booked. ProLnk helps here — vetted, on-demand.'],
            ['Emergency Contact', 'For nights and weekends. Many DFW companies offer 24/7 but charge premium rates.'],
          ].map(([title, desc]) => (
            <div key={title} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 8, background: '#F5E642', borderRadius: 4, flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
                <div style={{ color: '#8899AA', fontSize: 14 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🛠️ How Annual Tune-Ups Build the Relationship</h2>
          <p style={{ color: '#8899AA', fontSize: 14, lineHeight: 1.7 }}>
            A tech who has seen your system every year knows its quirks. They recognize the capacitor that always runs warm, the coil that accumulates pet hair fast, and the refrigerant charge that drifts. This institutional knowledge is worth more than any single repair.
          </p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>📍 Your Situation → Network Building Plan</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {SITUATIONS.map(s => (
              <button key={s} onClick={() => setSelected(s)} style={{ background: selected === s ? '#F5E642' : '#162030', color: selected === s ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: selected === s ? 700 : 400, fontSize: 14 }}>
                {s}
              </button>
            ))}
          </div>
          {selected && (
            <div style={{ background: '#162030', borderRadius: 10, padding: 20 }}>
              <div style={{ fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>Your Plan:</div>
              {PLANS[selected].map(step => (
                <div key={step} style={{ marginBottom: 10, fontSize: 14, lineHeight: 1.6, color: '#ddd' }}>{step}</div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>ProLnk Is Your Backup Network</div>
          <div style={{ color: '#0A1628', fontSize: 14 }}>When your primary tech is not available, ProLnk matches you with vetted DFW HVAC contractors — no cold calls, no guessing.</div>
        </div>
      </div>
    </div>
  );
}
