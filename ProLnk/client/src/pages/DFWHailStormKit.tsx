import { useState } from 'react';

type HomeFeatures = {
  hasCar: string;
  hasPool: string;
  roofAge: string;
};

const preStormChecklist = [
  '🚗 Move vehicles into garage or covered area — even partial coverage helps',
  '📋 Take photos of roof, all vehicles, skylights, and HVAC units RIGHT NOW',
  '🌿 Trim tree branches within 10 feet of home — they become projectiles',
  '🪟 Close all storm shutters or board vulnerable windows',
  '📱 Screenshot your insurance policy number and claims hotline',
  '🔌 Unplug electronics near windows — hail impact can shatter glass suddenly',
  '🏠 Know where your roof warranty documents are',
  '📞 Have 2 roofing contractor numbers saved — licensed DFW roofers book out fast post-storm',
];

const duringStormActions = [
  '🏠 Stay inside — hail can reach 100+ mph and cause serious injury',
  '🚗 Never go out to cover your car during active hail — it is not worth it',
  '🪟 Stay away from windows — impact can shatter tempered glass',
  '📱 Track storm cell on radar — note time of peak hail, direction',
  '📝 Record storm start/stop time for insurance claim timeline',
];

const postStormDocs = [
  '📸 Photograph every area of your roof from the ground (zoom lens helps)',
  '📸 Photograph all vehicles — every panel, hood, roof',
  '📸 Document any broken windows, damaged gutters, dented HVAC units',
  '📸 Capture date/time stamps in photos — use phone camera, not clipboard',
  '🗓️ File insurance claim within 24-48 hours — most DFW policies require prompt notice',
  '🔍 Get 2-3 licensed roofing contractor estimates before signing anything',
  '⚠️ Beware storm chasers — unlicensed contractors flood DFW after hail events',
  '📋 Request a copy of adjuster report before repairs begin',
];

export default function DFWHailStormKit() {
  const [features, setFeatures] = useState<HomeFeatures>({ hasCar: '', hasPool: '', roofAge: '' });
  const [activeTab, setActiveTab] = useState<'pre' | 'during' | 'post'>('pre');
  const [showKit, setShowKit] = useState(false);

  const extraItems: string[] = [];
  if (features.hasCar === 'yes') extraItems.push('🚗 Car cover (hail-rated) — store in garage or trunk for rapid deploy');
  if (features.hasPool === 'yes') extraItems.push('🏊 Pool safety net or cover — hail contaminates pool water and damages equipment');
  if (features.roofAge === 'old') {
    extraItems.push('🏠 Schedule pre-season roof inspection — older roofs have less impact resistance');
    extraItems.push('📄 Review your roof coverage — check for Actual Cash Value vs Replacement Cost');
  }

  const tabStyle = (tab: 'pre' | 'during' | 'post') => ({
    padding: '10px 18px',
    borderRadius: '8px 8px 0 0',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 700 as const,
    fontSize: 13,
    background: activeTab === tab ? '#F5E642′ : '#1e3a5f',
    color: activeTab === tab ? '#0A1628′ : '#94a3b8',
  });

  const activeList = activeTab === 'pre' ? preStormChecklist : activeTab === 'during' ? duringStormActions : postStormDocs;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2 }}>
          DFW HOMEOWNER GUIDE
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
          ⛈️ Hail Storm Preparedness Kit
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          DFW sits in the heart of Hail Alley. The region averages 15–20 significant hail events 
          per year. Proper preparation before season saves thousands in damage and speeds up claims.
        </p>

        <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '16px 20px', marginBottom: 28, borderLeft: '4px solid #F5E642′ }}>
          <strong>📌 DFW Fact:</strong> A single 2024 hailstorm caused $3.5B in insured losses across North Texas — most of it avoidable or easier to claim with good documentation.
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🏠 Tell Us About Your Home</h2>
          {[
            { label: 'DO YOU HAVE CARS OUTSIDE?', key: 'hasCar', options: [['yes', 'Yes — cars parked outside'], ['no', 'No — all in garage']] },
            { label: 'DO YOU HAVE A POOL?', key: 'hasPool', options: [['yes', 'Yes'], ['no', 'No']] },
            { label: 'ROOF AGE', key: 'roofAge', options: [['new', 'Under 10 years old'], ['mid', '10–20 years old'], ['old', 'Over 20 years old']] },
          ].map(field => (
            <div key={field.key} style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 13 }}>{field.label}</label>
              <select
                value={features[field.key as keyof HomeFeatures]}
                onChange={e => setFeatures(prev => ({ ...prev, [field.key]: e.target.value }))}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#1e3a5f', color: '#fff', border: '1px solid #2a4a7f', fontSize: 15 }}
              >
                <option value=''>Select one</option>
                {field.options.map(([val, label]) => <option key={val} value={val}>{label}</option>)}
              </select>
            </div>
          ))}
          <button
            onClick={() => setShowKit(true)}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 24px', fontSize: 15, cursor: 'pointer' }}
          >
            Build My Hail Storm Kit →
          </button>
        </div>

        {showKit && extraItems.length > 0 && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>⭐ Your Home-Specific Additions</h2>
            {extraItems.map((item, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #1e3a5f', fontSize: 14 }}>{item}</div>
            ))}
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
            <button onClick={() => setActiveTab('pre')} style={tabStyle('pre')}>🔵 Pre-Storm</button>
            <button onClick={() => setActiveTab('during')} style={tabStyle('during')}>🔴 During</button>
            <button onClick={() => setActiveTab('post')} style={tabStyle('post')}>📋 Post-Storm</button>
          </div>
          {activeList.map((item, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #1e3a5f', fontSize: 14 }}>{item}</div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: '16px 20px', color: '#0A1628', textAlign: 'center' }}>
          <strong>🔧 Hail damage? ProLnk connects you to vetted DFW roofing pros — no storm chasers.</strong>
        </div>
      </div>
    </div>
  );
}
