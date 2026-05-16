import { useState } from 'react';

const mechanisms = [
  { concern: 'Unlicensed contractor', emoji: '📜', title: 'License Verification', detail: 'Every partner submits their state trade license before activation. ProLnk cross-checks with Texas TDLR and county databases. Expired = instant deactivation.' },
  { concern: 'Uninsured worker', emoji: '🛡️', title: 'Insurance Confirmation', detail: 'Minimum $1M general liability + workers comp required. Certificates uploaded and reviewed quarterly. No certificate, no leads.' },
  { concern: 'Criminal history', emoji: '🔍', title: 'Background Check', detail: '7-year criminal background check run by third-party provider on every partner before first lead. Repeat checks annually.' },
  { concern: 'Poor workmanship', emoji: '⭐', title: 'Post-Job Rating System', detail: 'Homeowners rate partners 1-5 after every job. Partners below 4.2 average enter coaching. Below 3.8 = suspension review.' },
  { concern: 'No-show / ghosting', emoji: '📵', title: 'Reliability Tracking', detail: 'Confirmed matches that result in no-contact are logged. Two no-shows = 30-day suspension. Three = permanent removal.' },
  { concern: 'Price gouging', emoji: '💰', title: 'Estimate Transparency', detail: 'Partners submit upfront estimates before match confirmation. Homeowners see estimated range. Price spikes flagged by AI.' },
  { concern: 'Fake reviews', emoji: '🚫', title: 'Review Integrity', detail: 'Reviews only accepted from verified matches. No account can leave more than one review per job. AI detects anomalous rating patterns.' },
];

export default function DFWProLnkQualityControl() {
  const [selected, setSelected] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const filtered = mechanisms.filter(m =>
    search === '' || m.concern.toLowerCase().includes(search.toLowerCase()) || m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🏆</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: '12px 0 8px' }}>ProLnk Quality Control</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>How we protect every DFW homeowner on every job</p>
        </div>

        <div style={{ marginBottom: 24 }}>
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setSelected(null); }}
            placeholder="Search a quality concern..."
            style={{
              width: '100%', padding: '12px 16px', borderRadius: 8, fontSize: 15,
              background: '#0d1f36', border: '1px solid #1e3a5f', color: '#fff',
              outline: 'none', boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map((m, i) => (
            <div key={m.concern} onClick={() => setSelected(selected === i ? null : i)} style={{
              background: selected === i ? '#0f2a4a' : '#0d1f36',
              border: '1px solid', borderColor: selected === i ? '#F5E642' : '#1e3a5f',
              borderRadius: 10, padding: '16px 20px', cursor: 'pointer', transition: 'all 0.2s'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 24 }}>{m.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, color: selected === i ? '#F5E642' : '#e2e8f0', fontSize: 15 }}>{m.title}</div>
                  <div style={{ color: '#64748b', fontSize: 13 }}>Concern: {m.concern}</div>
                </div>
              </div>
              {selected === i && (
                <p style={{ margin: '12px 0 0', color: '#94a3b8', fontSize: 14, lineHeight: 1.6, borderTop: '1px solid #1e3a5f', paddingTop: 12 }}>
                  {m.detail}
                </p>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, textAlign: 'center' }}>
          {[['4.6 avg', 'Partner rating'], ['98%', 'License verified'], ['under 2%', 'No-show rate']].map(([val, label]) => (
            <div key={label} style={{ background: '#0d1f36', borderRadius: 10, padding: '20px 12px', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#F5E642' }}>{val}</div>
              <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
