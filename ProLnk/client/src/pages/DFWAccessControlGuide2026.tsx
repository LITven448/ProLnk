import { useState } from 'react';

export default function DFWAccessControlGuide2026() {
  const [accessNeed, setAccessNeed] = useState('');
  const [result, setResult] = useState('');

  const recs: Record<string, string> = {
    contractor: '🔑 Contractor Access Management: Install a Schlage Encode Plus or Yale Assure 2 on your main entry (-280). Create temporary PIN codes for each ProLnk contractor — unique per person, expires after job completion. Access log shows exact entry/exit times. DFW homes with pools or detached garages: add a secondary keypad at gate (-200). ProLnk contractors receive PIN via secure SMS — no physical key handoff required.',
    gate: '🚗 Gate Access System: For DFW properties with driveway gates, LiftMaster 841LM Smart Control Panel () adds WiFi to existing gate openers. Generate temporary virtual keys via myQ app. For new gate installs, Linear ACP00877 with keypad + remote () handles DFW HOA pass-through requirements. Add a video intercom (Doorbird D101S, ) to verify visitors before remote gate release.',
    multientry: '🏠 Multi-Door Access: For DFW homes with garage man-door, side entrance, and back gate — August Wi-Fi Smart Lock (4th Gen) on each door (/door) + August Access app creates a unified access dashboard. Assign different PINs per contractor per door. Elimu or Yale network hub () links all locks. Access audit log exports to CSV for property management records.',
    intercom: '📹 Video Intercom System: Doorbird D2101V () replaces your DFW doorbell with HD video intercom — visitors ring, you answer from anywhere via app, unlock remotely. For gated DFW estates, 2N Helios IP Verso () handles outdoor intercom at gate + secondary indoor panel. Integrates with Alexa and Google Home for hands-free answer.',
    fullsystem: '🔐 Full Access Control System (DFW Estate): Commercial-grade Brivo or Salto KS access control. Each door gets a card/fob/mobile credential reader (/door). Web dashboard manages all users, doors, schedules. DFW property managers use this for rental properties — generate/revoke credentials remotely, run occupancy reports. Monthly SaaS fee: -120 depending on door count.',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔐</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Home Access Control Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>Beyond smart locks — complete access management for DFW properties</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '📹', title: 'Video Intercom', desc: '–2,000 installed. See and speak with visitors, unlock remotely. Doorbird and 2N lead the DFW market.' },
            { icon: '🚪', title: 'Smart Locks', desc: 'PIN codes per contractor. Yale Assure 2 and Schlage Encode are DFW installer favorites for reliability.' },
            { icon: '🚗', title: 'Gate Systems', desc: 'LiftMaster myQ for existing gates. Linear for new installs. DFW HOA-approved options available.' },
            { icon: '📋', title: 'Access Logs', desc: 'Every entry timestamped. Export to CSV for landlords and property managers. Critical for DFW contractor coordination.' },
          ].map((item) => (
            <div key={item.title} style={{ background: '#1e2d45', borderRadius: 12, padding: 20, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{item.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 8 }}>🔍 Find Your Access Solution</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 20 }}>ProLnk coordinates secure contractor access — know who entered and when</p>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94a3b8', display: 'block', marginBottom: 8 }}>Primary Access Need</label>
            <select value={accessNeed} onChange={(e) => setAccessNeed(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #334155′ }}>
              <option value=''>Select your situation...</option>
              <option value='contractor'>Temporary contractor / service pro access</option>
              <option value='gate'>Driveway gate or community gate access</option>
              <option value='multientry'>Multiple entry points (garage, side, back)</option>
              <option value='intercom'>Video intercom at front door or gate</option>
              <option value='fullsystem'>Full estate or rental property access system</option>
            </select>
          </div>
          <button onClick={() => setResult(recs[accessNeed] || '')} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Get My Access Recommendation 🔐</button>
          {result && <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, color: '#e2e8f0', lineHeight: 1.8, borderLeft: '3px solid #F5E642′ }}>{result}</div>}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🏠</div>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>ProLnk Secure Contractor Coordination</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>Every ProLnk service visit is logged — contractor identity verified, arrival and departure tracked for your DFW home</div>
        </div>
      </div>
    </div>
  );
}