import { useState } from 'react';

export default function DFWFirstYearHomeownerMonth1() {
  const [homeType, setHomeType] = useState('');

  const priorities: Record<string, string[]> = {
    single: [
      'Change all exterior locks — rekey or replace deadbolts on every door',
      'Locate and label main water shutoff and all individual shutoffs',
      'Label every circuit breaker in your panel',
      'Test every smoke detector and CO detector',
      'Replace HVAC filter — DFW homes need checks monthly in summer',
      'Walk roof and exterior — inspect for hail damage and missing shingles',
      'Check foundation perimeter for cracks or soil pulling away',
      'Create ProLnk profile and add home to Home Health Vault',
    ],
    condo: [
      'Change unit door locks and mailbox lock',
      'Get HOA rules document — violations start day one',
      'Locate and test your HVAC unit',
      'Test smoke and CO detectors inside your unit',
      'Locate your unit individual water shutoff',
      'Create ProLnk profile and add home to Home Health Vault',
    ],
    townhome: [
      'Change all exterior locks including garage',
      'Get HOA docs — exterior rules are strict in DFW townhomes',
      'Replace HVAC filter — shared wall homes trap more dust',
      'Test smoke and CO detectors on each level',
      'Locate main shutoff — often under sink or in garage',
      'Inspect shared fence line and any private exterior features',
      'Create ProLnk profile and add home to Home Health Vault',
    ],
  };

  const icons: Record<string, string> = { single: '🏠', condo: '🏢', townhome: '🏘️' };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK HOMEOWNER GUIDES — DFW</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🏠 Month 1 DFW Homeowner Checklist</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>The first 30 days set the tone. DFW homes have specific quirks — here is what to do before anything else.</p>

        <label style={{ color: '#F5E642', fontWeight: 600, display: 'block', marginBottom: 8 }}>What type of home did you buy?</label>
        <select
          value={homeType}
          onChange={e => setHomeType(e.target.value)}
          style={{ background: '#1e2d45', color: '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '10px 16px', fontSize: 15, width: '100%', marginBottom: 28 }}
        >
          <option value="">Select home type</option>
          <option value="single">Single Family Home</option>
          <option value="condo">Condo or Apartment</option>
          <option value="townhome">Townhome</option>
        </select>

        {homeType && (
          <div>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>{icons[homeType]} Your Month 1 Priority List</h2>
            {priorities[homeType].map((item, i) => (
              <div key={i} style={{ background: '#1e2d45', borderRadius: 10, padding: '14px 18px', marginBottom: 10, fontSize: 15, borderLeft: '3px solid #F5E642′ }}>
                {item}
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 36, background: '#1e2d45', borderRadius: 12, padding: '20px' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>💡 DFW-Specific Month 1 Tips</div>
          <div style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: 14 }}>
            Dallas-Fort Worth sits on expansive clay soil. Foundation movement in month 1 is common and expected. Get a baseline inspection early. Summer heat means your HVAC filter needs checking more often than national guides suggest — monthly in June through September.
          </div>
        </div>

        <div style={{ marginTop: 16, background: '#162236', borderRadius: 12, padding: '20px' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📋 Document Everything in Home Health Vault</div>
          <div style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: 14 }}>
            Add appliance model numbers, HVAC unit details, plumbing shutoff locations, and any seller disclosures to your ProLnk Home Health Vault. This creates a permanent record that saves time, money, and stress in every future repair.
          </div>
        </div>
      </div>
    </div>
  );
}

