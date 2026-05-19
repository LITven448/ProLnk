import { useState } from 'react';

export default function DFWProLnkWaitlistJoin2026() {
  const [userType, setUserType] = useState<'pro' | 'homeowner' | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>📋</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>
            ProLnk Waitlist Join Guide 2026
          </h1>
          <p style={{ color: '#9BAECF', fontSize: 16, margin: 0 }}>
            DFW — How to secure your spot before Charter closes
          </p>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: '14px 20px', marginBottom: 32, textAlign: 'center' }}>
          <span style={{ color: '#0A1628', fontWeight: 700, fontSize: 15 }}>
            ⚡ Charter Tier closing at 500 pros — spots almost gone
          </span>
        </div>

        <p style={{ color: '#CBD5E1', marginBottom: 24, fontSize: 15 }}>
          Who are you joining as?
        </p>
        <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
          {(['pro', 'homeowner'] as const).map(t => (
            <button key={t} onClick={() => setUserType(t)} style={{
              flex: 1, padding: '16px', borderRadius: 10, border: '2px solid',
              borderColor: userType === t ? '#F5E642′ : '#1E3A5F',
              background: userType === t ? '#F5E642′ : '#0D1F3C',
              color: userType === t ? '#0A1628′ : '#fff',
              cursor: 'pointer', fontWeight: 700, fontSize: 16
            }}>
              {t === 'pro' ? '🔧 Service Pro' : '🏠 Homeowner'}
            </button>
          ))}
        </div>

        {userType === 'pro' && (
          <div>
            <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 20 }}>
              <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🔧 Pro Waitlist Steps</h2>
              {[
                ['1', 'Visit prolnk.io/pro-signup', 'Takes 3 minutes — name, trade, service area, contact'],
                ['2', 'Select Charter Tier', 'Lock $149/mo for life — Charter closes at 500 applicants'],
                ['3', 'Get confirmation email', 'Sent via Resend — check spam if needed'],
                ['4', 'Wait for launch activation', 'Charter pros go live first when matching opens'],
              ].map(([n, title, desc]) => (
                <div key={n} style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                  <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>{n}</div>
                  <div><div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div><div style={{ color: '#9BAECF', fontSize: 14 }}>{desc}</div></div>
                </div>
              ))}
            </div>
            <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📅 Timeline</div>
              <p style={{ color: '#CBD5E1', margin: 0, fontSize: 14 }}>Charter waitlist is live now. Matching algorithm launches after 500 pros confirmed. Charter pros activate before general population.</p>
            </div>
          </div>
        )}

        {userType === 'homeowner' && (
          <div>
            <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 20 }}>
              <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🏠 Homeowner Waitlist Steps</h2>
              {[
                ['1', 'Visit prolnk.io/homeowner-signup', 'Always free — no payment info needed'],
                ['2', 'Describe your service need', 'HVAC, plumbing, electrical, roofing, and more'],
                ['3', 'Add your DFW address', 'Needed to match you with local Charter pros'],
                ['4', 'Receive match when pros activate', 'You’ll be prioritized over post-launch signups'],
              ].map(([n, title, desc]) => (
                <div key={n} style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                  <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>{n}</div>
                  <div><div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div><div style={{ color: '#9BAECF', fontSize: 14 }}>{desc}</div></div>
                </div>
              ))}
            </div>
            <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ Always Free</div>
              <p style={{ color: '#CBD5E1', margin: 0, fontSize: 14 }}>Homeowner signup is always free and always open. No Charter limit applies to homeowners.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
