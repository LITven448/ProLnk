import { useState } from 'react';

export default function DFWPoolSafetyGuide2026() {
  const [hasFence, setHasFence] = useState(false);
  const [fenceHeight, setFenceHeight] = useState('');
  const [hasDoorAlarm, setHasDoorAlarm] = useState(false);
  const [hasCover, setHasCover] = useState(false);
  const [hasVGB, setHasVGB] = useState(false);
  const [hasAlarm, setHasAlarm] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const getCompliance = () => {
    const issues: { pass: boolean; item: string; note: string }[] = [];

    issues.push({
      pass: hasFence && fenceHeight === '4plus',
      item: '🚧 Pool Barrier / Fence',
      note: hasFence && fenceHeight === '4plus'
        ? 'Compliant — TX requires 4ft minimum around pool'
        : 'REQUIRED: TX Pool Safety Act — 4ft min fence enclosing pool on all sides',
    });

    issues.push({
      pass: hasDoorAlarm,
      item: '🔔 Door/Gate Alarm',
      note: hasDoorAlarm
        ? 'Compliant — self-latching gate with alarm present'
        : 'REQUIRED: All gates must be self-closing, self-latching, and outward-opening',
    });

    issues.push({
      pass: hasVGB,
      item: '🌀 VGB-Compliant Drain Covers',
      note: hasVGB
        ? 'Compliant — anti-entrapment drain covers installed'
        : 'REQUIRED: Virginia Graeme Baker Act — all pool/spa drains must be VGB-compliant to prevent entrapment',
    });

    issues.push({
      pass: hasCover,
      item: '🛡️ Safety Cover (Power or Lockable)',
      note: hasCover
        ? 'Great — additional barrier beyond fence requirement'
        : 'RECOMMENDED: Power safety cover provides redundant barrier, required by some TX cities',
    });

    issues.push({
      pass: hasAlarm,
      item: '🚨 Pool Water Alarm',
      note: hasAlarm
        ? 'Compliant — subsurface alarm for motion detection'
        : 'RECOMMENDED: Subsurface alarm detects entry — required in some TX municipalities',
    });

    return issues;
  };

  const passCount = showReport ? getCompliance().filter(i => i.pass).length : 0;
  const totalCount = 5;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🛡️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Pool Safety Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Texas Pool Safety Act requirements every DFW pool owner must know</p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 18 }}>📋 TX Pool Safety Act Requirements</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              ['🚧 Fence/Barrier', 'REQUIRED', '4ft minimum height, enclosing pool on all sides'],
              ['🔔 Self-Closing Gate', 'REQUIRED', 'Opens outward, self-latches, includes alarm'],
              ['🌀 VGB Drain Covers', 'FEDERAL LAW', 'Anti-entrapment drains — fines up to K for violation'],
              ['🛡️ Safety Cover', 'VARIES BY CITY', 'Some DFW cities (Frisco, Allen) require power covers'],
              ['🚨 Pool Alarm', 'VARIES BY CITY', 'Subsurface alarms required in some municipalities'],
              ['📜 CPO Required', 'FOR SERVICE PROS', 'Pool service companies must employ certified pool operators'],
            ].map(([label, req, note]) => (
              <div key={label as string} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontWeight: 700 }}>{label as string}</span>
                  <span style={{ fontSize: 11, color: (req as string).includes('REQUIRED') || (req as string) === 'FEDERAL LAW' ? '#ef4444' : '#F5E642', fontWeight: 700 }}>{req as string}</span>
                </div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{note as string}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 18 }}>🔍 Check Your Pool Compliance</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <input type='checkbox' checked={hasFence} onChange={e => setHasFence(e.target.checked)} />
              <span style={{ color: '#e2e8f0', fontSize: 14 }}>Pool has a fence or barrier</span>
            </label>
            {hasFence && (
              <div style={{ marginLeft: 24 }}>
                <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Fence height?</label>
                <select value={fenceHeight} onChange={e => setFenceHeight(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #F5E642', borderRadius: 6, padding: '6px 12px' }}>
                  <option value=''>Select</option>
                  <option value='under4'>Under 4 feet</option>
                  <option value='4plus'>4 feet or taller</option>
                </select>
              </div>
            )}
            {[
              ['hasDoorAlarm', hasDoorAlarm, setHasDoorAlarm, 'Self-closing, self-latching gate with alarm'],
              ['hasVGB', hasVGB, setHasVGB, 'VGB-compliant (anti-entrapment) drain covers installed'],
              ['hasCover', hasCover, setHasCover, 'Safety cover installed (power or lockable)'],
              ['hasAlarm', hasAlarm, setHasAlarm, 'Pool water alarm (subsurface or wearable)'],
            ].map(([key, val, setter, label]) => (
              <label key={key as string} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <input type='checkbox' checked={val as boolean} onChange={e => (setter as (v: boolean) => void)(e.target.checked)} />
                <span style={{ color: '#e2e8f0', fontSize: 14 }}>{label as string}</span>
              </label>
            ))}
          </div>
          <button onClick={() => setShowReport(true)} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer' }}>
            Run Safety Check →
          </button>
        </div>

        {showReport && (
          <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ color: '#F5E642', margin: 0, fontSize: 18 }}>📊 Safety Compliance Report</h2>
              <div style={{ background: passCount === totalCount ? '#16a34a' : passCount >= 3 ? '#d97706' : '#dc2626', borderRadius: 20, padding: '4px 14px', fontWeight: 700, fontSize: 14 }}>
                {passCount}/{totalCount} Passed
              </div>
            </div>
            {getCompliance().map((item, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 12, marginBottom: 10, borderLeft:  }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{item.item}</span>
                  <span style={{ color: item.pass ? '#4ade80' : '#f87171', fontWeight: 700, fontSize: 13 }}>{item.pass ? '✅ PASS' : '❌ FAIL'}</span>
                </div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{item.note}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', color: '#475569', fontSize: 13, marginTop: 24 }}>
          ProLnk connects DFW homeowners with licensed pool pros • prolnk.io
        </div>
      </div>
    </div>
  );
}
