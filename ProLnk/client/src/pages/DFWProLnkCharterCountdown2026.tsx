import { useState } from 'react';

export default function DFWProLnkCharterCountdown2026() {
  const [stage, setStage] = useState<'none' | 'charter' | 'founding' | 'general'>('none');

  const spotsRemaining = 47;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>⏳</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>
            ProLnk Charter Countdown 2026
          </h1>
          <p style={{ color: '#9BAECF', fontSize: 16, margin: 0 }}>
            DFW — Charter tier closing at 500 pros
          </p>
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 64, fontWeight: 900, color: '#F5E642′ }}>{spotsRemaining}</div>
          <div style={{ color: '#CBD5E1', fontSize: 18, marginTop: 8 }}>Charter spots remaining</div>
          <div style={{ background: '#1E3A5F', borderRadius: 8, height: 12, margin: '20px 0 8px' }}>
            <div style={{ background: '#F5E642', height: 12, borderRadius: 8, width: `${((500 - spotsRemaining) / 500) * 100}%` }} />
          </div>
          <div style={{ color: '#9BAECF', fontSize: 13 }}>{500 - spotsRemaining} of 500 Charter spots filled</div>
        </div>

        <p style={{ color: '#CBD5E1', marginBottom: 16, fontSize: 15 }}>Where are you in your decision?</p>
        <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
          {([
            ['charter', '🏅 Ready to join Charter'],
            ['founding', '🥈 Considering Founding'],
            ['general', '❓ Not sure yet'],
          ] as const).map(([val, label]) => (
            <button key={val} onClick={() => setStage(val)} style={{
              flex: 1, padding: '14px', borderRadius: 10, border: '2px solid',
              borderColor: stage === val ? '#F5E642′ : '#1E3A5F',
              background: stage === val ? '#F5E642′ : '#0D1F3C',
              color: stage === val ? '#0A1628′ : '#fff',
              cursor: 'pointer', fontWeight: 700, fontSize: 14
            }}>{label}</button>
          ))}
        </div>

        {stage === 'charter' && (
          <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16 }}>✅ Smart move. Here's what to do right now.</h3>
            <p style={{ color: '#CBD5E1', marginBottom: 16 }}>Go to <strong>prolnk.io/pro-signup</strong> — takes 3 minutes. Charter locks $149/mo forever. Once 500 spots fill, this page redirects to Founding at $199/mo — no exceptions.</p>
            <div style={{ background: '#F5E642', borderRadius: 8, padding: '12px 16px', color: '#0A1628', fontWeight: 700 }}>With {spotsRemaining} spots left, act today — not tomorrow.</div>
          </div>
        )}

        {stage === 'founding' && (
          <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16 }}>📊 Charter vs Founding</h3>
            {[
              ['Monthly Rate', '$149/mo locked', '$199/mo locked'],
              ['Lead Priority', 'First access', 'Second access'],
              ['Spots Available', `${spotsRemaining} left`, 'Opens at 501'],
              ['Vault Beta Access', '✅', '✅'],
            ].map(([label, ch, fo]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1E3A5F' }}>
                <span style={{ color: '#9BAECF' }}>{label}</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{ch}</span>
                <span style={{ color: '#CBD5E1′ }}>{fo}</span>
              </div>
            ))}
            <p style={{ color: '#9BAECF', marginTop: 16, fontSize: 13 }}>Charter saves $600/yr and gives better lead access. Founding opens automatically when Charter fills.</p>
          </div>
        )}

        {stage === 'general' && (
          <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 12 }}>❓ Still deciding? Consider this.</h3>
            <p style={{ color: '#CBD5E1', marginBottom: 12 }}>General tier has no charter benefits, no locked pricing, and no priority access. DFW pros who wait for general tier will compete against Charter pros who got there first.</p>
            <p style={{ color: '#CBD5E1′ }}>With only {spotsRemaining} Charter spots left — the cost of waiting is real.</p>
          </div>
        )}
      </div>
    </div>
  );
}
