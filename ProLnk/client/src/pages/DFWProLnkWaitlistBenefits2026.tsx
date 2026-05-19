import { useState } from 'react';

export default function DFWProLnkWaitlistBenefits2026() {
  const [userType, setUserType] = useState<'pro' | 'homeowner' | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🎯</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>
            ProLnk Waitlist Benefits 2026
          </h1>
          <p style={{ color: '#9BAECF', fontSize: 16, margin: 0 }}>
            DFW — Why joining now beats joining later
          </p>
        </div>

        <p style={{ color: '#CBD5E1', marginBottom: 24, fontSize: 15 }}>
          What kind of member are you?
        </p>
        <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
          {(['pro', 'homeowner'] as const).map(t => (
            <button key={t} onClick={() => setUserType(t)} style={{
              flex: 1, padding: '16px', borderRadius: 10, border: '2px solid',
              borderColor: userType === t ? '#F5E642' : '#1E3A5F',
              background: userType === t ? '#F5E642' : '#0D1F3C',
              color: userType === t ? '#0A1628' : '#fff',
              cursor: 'pointer', fontWeight: 700, fontSize: 16
            }}>
              {t === 'pro' ? '🔧 Service Pro' : '🏠 Homeowner'}
            </button>
          ))}
        </div>

        {userType === 'pro' && (
          <div>
            <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 20 }}>
              <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🔧 Charter Pro Benefits</h2>
              {[
                ['💰', '$149/mo Locked Forever', 'Post-Charter price rises to $199+/mo. Your rate never increases as a Charter member.'],
                ['⚡', 'First Access to Leads', 'Charter pros see and accept jobs before Founding or general tier pros.'],
                ['🏆', 'Priority Ranking', 'Algorithm weights Charter status — you rank higher in match results.'],
                ['🏠', 'Home Health Vault Beta', 'Charter pros get early access to Vault data, giving you full job history on every home.'],
                ['💼', 'Network Income Rights', 'Recruit other pros and earn on their activity — 4-level cascade.'],
              ].map(([icon, title, desc]) => (
                <div key={title} style={{ display: 'flex', gap: 14, marginBottom: 18 }}>
                  <div style={{ fontSize: 26, flexShrink: 0 }}>{icon}</div>
                  <div><div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{title}</div><div style={{ color: '#9BAECF', fontSize: 14 }}>{desc}</div></div>
                </div>
              ))}
            </div>
            <div style={{ background: '#F5E642', borderRadius: 10, padding: '14px 20px', textAlign: 'center' }}>
              <span style={{ color: '#0A1628', fontWeight: 700 }}>Charter closes at 500 pros. DFW is filling fast — apply at prolnk.io/pro-signup</span>
            </div>
          </div>
        )}

        {userType === 'homeowner' && (
          <div>
            <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 20 }}>
              <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🏠 Homeowner Waitlist Benefits</h2>
              {[
                ['🥇', 'Early Match Priority', 'Waitlist homeowners get matched before post-launch signups when pros activate.'],
                ['🏠', 'Home Health Vault Beta', 'Your home gets a digital health record — every job tracked, sharable for insurance or resale.'],
                ['✅', 'Charter-Verified Pros Only', 'Waitlist homeowners are matched exclusively to Charter pros — the most vetted tier.'],
                ['🆓', 'Always Free', 'Homeowner signup and matching is free. No subscription, no hidden fees.'],
                ['📊', 'Job History Forever', 'Every completed job goes into your Vault record automatically.'],
              ].map(([icon, title, desc]) => (
                <div key={title} style={{ display: 'flex', gap: 14, marginBottom: 18 }}>
                  <div style={{ fontSize: 26, flexShrink: 0 }}>{icon}</div>
                  <div><div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{title}</div><div style={{ color: '#9BAECF', fontSize: 14 }}>{desc}</div></div>
                </div>
              ))}
            </div>
            <div style={{ background: '#F5E642', borderRadius: 10, padding: '14px 20px', textAlign: 'center' }}>
              <span style={{ color: '#0A1628', fontWeight: 700 }}>Free forever — join at prolnk.io/homeowner-signup</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
