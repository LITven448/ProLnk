import { useState } from 'react';

const rows = [
  { label: 'Monthly Fee', charter: '$149/mo', founding: '$149/mo', highlight: false },
  { label: 'Fee Lock', charter: 'Locked for life', founding: 'Locked for life', highlight: false },
  { label: 'Direct Job Commission', charter: '12% of matching fee', founding: '12% of matching fee', highlight: false },
  { label: 'L1 Network Override (jobs)', charter: '7%', founding: '7%', highlight: false },
  { label: 'L2 Network Override (jobs)', charter: '4%', founding: '4%', highlight: false },
  { label: 'L3 Network Override (jobs)', charter: '2%', founding: '2%', highlight: false },
  { label: 'L4 Network Override (jobs)', charter: '1%', founding: '1%', highlight: false },
  { label: 'Subscription Override (L1)', charter: '12%', founding: '12%', highlight: false },
  { label: 'Subscription Override (L2)', charter: '6%', founding: '6%', highlight: false },
  { label: 'Origination Rights', charter: '1.5% (permanent)', founding: '1.0% (permanent)', highlight: true },
  { label: 'Tier Capacity', charter: '25 spots', founding: '100 spots', highlight: true },
  { label: 'Waitlist Priority', charter: '🥇 First access', founding: '🥈 Second access', highlight: true },
  { label: 'Partner Success Manager', charter: '✅ Dedicated, first 90 days', founding: '✅ Dedicated, first 90 days', highlight: false },
  { label: 'Community Slack Access', charter: '✅ Yes', founding: '✅ Yes', highlight: false },
  { label: 'Monthly 1-on-1 Check-In', charter: '✅ Yes (lifetime)', founding: '✅ Yes (lifetime)', highlight: false },
  { label: 'Co-branding Opportunities', charter: '✅ Priority access', founding: '✅ Available', highlight: false },
  { label: 'Early Feature Access', charter: '✅ Beta priority', founding: '✅ Beta access', highlight: false },
];

const CUTOFF_DATES = {
  charter: new Date('2026-03-01'),
  founding: new Date('2026-04-15'),
};

export default function CharterVsFoundingComparison() {
  const [inputDate, setInputDate] = useState('');
  const [tierResult, setTierResult] = useState<string | null>(null);

  const checkTier = () => {
    if (!inputDate) return;
    const d = new Date(inputDate);
    if (d <= CUTOFF_DATES.charter) {
      setTierResult('charter');
    } else if (d <= CUTOFF_DATES.founding) {
      setTierResult('founding');
    } else {
      setTierResult('standard');
    }
  };

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 32 }}>⚖️</span>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0A1628', margin: 0 }}>Charter vs. Founding Partner</h1>
          </div>
          <p style={{ color: '#64748B', fontSize: 15, margin: 0 }}>
            Both tiers unlock the full ProLnk commission engine. Here is exactly how they differ.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[
            { tier: 'Charter', spots: 25, color: '#F5E642', textColor: '#0A1628', badge: '🌟 Most Exclusive', note: 'First 25 applicants only. Closed.' },
            { tier: 'Founding', spots: 100, color: '#0A1628', textColor: '#F5E642', badge: '🔥 Currently Open', note: 'Spots 26–125. Closes at 500 total apps.' },
          ].map(({ tier, spots, color, textColor, badge, note }) => (
            <div key={tier} style={{ backgroundColor: color, borderRadius: 14, padding: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: textColor, opacity: 0.7, marginBottom: 4 }}>{badge}</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: textColor }}>{tier} Partner</div>
              <div style={{ fontSize: 14, color: textColor, marginTop: 6, opacity: 0.8 }}>{spots} total spots · {note}</div>
              <div style={{ marginTop: 14, fontSize: 28, fontWeight: 900, color: textColor }}>$149<span style={{ fontSize: 14, fontWeight: 400 }}>/mo</span></div>
              <div style={{ fontSize: 12, color: textColor, opacity: 0.7, marginTop: 2 }}>Rate locked forever</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, border: '1px solid #E2E8F0', marginBottom: 28, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: '#0A1628' }}>
                <th style={{ textAlign: 'left', padding: '14px 20px', color: '#94A3B8', fontWeight: 600, width: '40%' }}>Feature</th>
                <th style={{ textAlign: 'center', padding: '14px 20px', color: '#F5E642', fontWeight: 700 }}>🌟 Charter</th>
                <th style={{ textAlign: 'center', padding: '14px 20px', color: '#fff', fontWeight: 700 }}>🔥 Founding</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} style={{ backgroundColor: row.highlight ? '#FFFBEA' : i % 2 === 0 ? '#fff' : '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  <td style={{ padding: '12px 20px', color: '#374151', fontWeight: row.highlight ? 700 : 400 }}>{row.label}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'center', color: '#0A1628', fontWeight: row.highlight ? 800 : 600 }}>{row.charter}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'center', color: '#0A1628', fontWeight: row.highlight ? 800 : 600 }}>{row.founding}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 28, border: '1px solid #E2E8F0' }}>
          <h2 style={{ fontWeight: 700, color: '#0A1628', fontSize: 16, marginTop: 0, marginBottom: 6 }}>🗓️ Which tier am I in?</h2>
          <p style={{ color: '#64748B', fontSize: 13, marginTop: 0, marginBottom: 16 }}>Enter your application date to find out your tier assignment.</p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="date"
              value={inputDate}
              onChange={e => { setInputDate(e.target.value); setTierResult(null); }}
              style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 14, color: '#0A1628', flex: 1, minWidth: 160 }}
            />
            <button
              onClick={checkTier}
              style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '10px 22px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14 }}
            >
              Check My Tier
            </button>
          </div>
          {tierResult && (
            <div style={{ marginTop: 16, padding: '14px 18px', borderRadius: 10, backgroundColor: tierResult === 'charter' ? '#FFFBEA' : tierResult === 'founding' ? '#EFF6FF' : '#FEF2F2', border: `1.5px solid ${tierResult === 'charter' ? '#F5E642' : tierResult === 'founding' ? '#93C5FD' : '#FCA5A5'}` }}>
              {tierResult === 'charter' && <><strong>🌟 Charter Partner</strong> — You applied before March 1, 2026 and qualify for Charter status with 1.5% origination rights.</>}
              {tierResult === 'founding' && <><strong>🔥 Founding Partner</strong> — You applied between March 1 and April 15, 2026. You are a Founding Partner with 1.0% origination rights.</>}
              {tierResult === 'standard' && <><strong>Standard Partner</strong> — Your application date falls after the Founding window. You will be enrolled at standard tier rates when available. Contact us to learn about upgrade paths.</>}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <p style={{ color: '#94A3B8', margin: '0 0 6px', fontSize: 14 }}>The waitlist closes at 500 applications + 5,000 homes registered</p>
          <p style={{ color: '#F5E642', fontWeight: 800, fontSize: 18, margin: 0 }}>
            Both tiers earn for life. The difference is origination rights — and Charter earns 50% more.
          </p>
        </div>
      </div>
    </div>
  );
}
