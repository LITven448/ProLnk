import { useState } from 'react';

const SUB = 149;
const AVG_MATCH = 3000;
const AVG_FEES_HOME = 420;

export default function ProLnkAllFiveStreams() {
  const [matches, setMatches] = useState(8);
  const [matchRate, setMatchRate] = useState(20);
  const [l1Pros, setL1Pros] = useState(10);
  const [l2Pros, setL2Pros] = useState(30);
  const [l3Pros, setL3Pros] = useState(80);
  const [l4Pros, setL4Pros] = useState(200);
  const [hoMonth, setHoMonth] = useState(20);
  const [hoFee, setHoFee] = useState(50);
  const [homes, setHomes] = useState(100);
  const [avgJobEarning, setAvgJobEarning] = useState(2000);

  const s1 = matches * AVG_MATCH * (matchRate / 100);
  const s2 = (l1Pros * avgJobEarning * 0.01) + (l2Pros * avgJobEarning * 0.005) + (l3Pros * avgJobEarning * 0.0025) + (l4Pros * avgJobEarning * 0.001);
  const s3 = (l1Pros * SUB * 0.12) + (l2Pros * SUB * 0.06) + (l3Pros * SUB * 0.03) + (l4Pros * SUB * 0.015);
  const s4 = hoMonth * hoFee;
  const s5 = (homes * AVG_FEES_HOME * 0.015) / 12;
  const total = s1 + s2 + s3 + s4 + s5;

  const streams = [
    { label: 'Stream 1: Direct Commission', emoji: '💰', value: s1, color: '#F5E642′ },
    { label: 'Stream 2: Network Override', emoji: '🌐', value: s2, color: '#3B82F6′ },
    { label: 'Stream 3: Subscription Override', emoji: '🔄', value: s3, color: '#8B5CF6′ },
    { label: 'Stream 4: Homeowner Override', emoji: '🏠', value: s4, color: '#10B981′ },
    { label: 'Stream 5: Origination Rights', emoji: '🏛️', value: s5, color: '#F59E0B' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>ALL 5 STREAMS</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>📊 Combined Income Calculator</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>Dial in your numbers across all 5 streams. See your total ProLnk monthly income in real time.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          <div style={{ background: '#111B2E', borderRadius: 12, padding: 20 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 14 }}>💰 Stream 1 Inputs</div>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>Matches/Month: {matches}</label>
            <input type="range" min={0} max={40} value={matches} onChange={e => setMatches(+e.target.value)} style={{ width: '100%', accentColor: '#F5E642', marginBottom: 12 }} />
            <label style={{ display: 'block', color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>Commission Rate: {matchRate}%</label>
            <input type="range" min={12} max={70} value={matchRate} onChange={e => setMatchRate(+e.target.value)} style={{ width: '100%', accentColor: '#F5E642′ }} />
          </div>

          <div style={{ background: '#111B2E', borderRadius: 12, padding: 20 }}>
            <div style={{ color: '#3B82F6', fontWeight: 700, marginBottom: 14 }}>🌐 Stream 2 Inputs</div>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>Avg Pro Earnings: ${avgJobEarning}/mo</label>
            <input type="range" min={500} max={6000} step={100} value={avgJobEarning} onChange={e => setAvgJobEarning(+e.target.value)} style={{ width: '100%', accentColor: '#3B82F6', marginBottom: 12 }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[['L1',l1Pros,setL1Pros],['L2',l2Pros,setL2Pros],['L3',l3Pros,setL3Pros],['L4',l4Pros,setL4Pros]].map(([lbl,val,set]:any) => (
                <div key={lbl}>
                  <label style={{ display: 'block', color: '#94A3B8', fontSize: 11, marginBottom: 2 }}>{lbl}: {val}</label>
                  <input type="range" min={0} max={300} value={val} onChange={e => set(+e.target.value)} style={{ width: '100%', accentColor: '#3B82F6′ }} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#111B2E', borderRadius: 12, padding: 20 }}>
            <div style={{ color: '#10B981', fontWeight: 700, marginBottom: 14 }}>🏠 Stream 4 Inputs</div>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>HOs Sourced/Month: {hoMonth}</label>
            <input type="range" min={0} max={100} value={hoMonth} onChange={e => setHoMonth(+e.target.value)} style={{ width: '100%', accentColor: '#10B981', marginBottom: 12 }} />
            <label style={{ display: 'block', color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>Fee Per HO: ${hoFee}</label>
            <input type="range" min={25} max={100} step={5} value={hoFee} onChange={e => setHoFee(+e.target.value)} style={{ width: '100%', accentColor: '#10B981′ }} />
          </div>

          <div style={{ background: '#111B2E', borderRadius: 12, padding: 20 }}>
            <div style={{ color: '#F59E0B', fontWeight: 700, marginBottom: 14 }}>🏛️ Stream 5 Inputs</div>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>Homes in Vault: {homes}</label>
            <input type="range" min={0} max={500} value={homes} onChange={e => setHomes(+e.target.value)} style={{ width: '100%', accentColor: '#F59E0B' }} />
            <div style={{ marginTop: 12, color: '#64748B', fontSize: 12 }}>1.5% of $420/yr avg fees per home</div>
          </div>
        </div>

        <div style={{ background: '#111B2E', borderRadius: 12, padding: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 16, color: '#F5E642', fontSize: 18 }}>Your Monthly Income Breakdown</div>
          {streams.map(s => (
            <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, padding: '10px 14px', background: '#0A1628', borderRadius: 8 }}>
              <span style={{ color: '#CBD5E1', fontSize: 14 }}>{s.emoji} {s.label}</span>
              <span style={{ color: s.color, fontWeight: 700, fontSize: 16 }}>${s.value.toFixed(0)}/mo</span>
            </div>
          ))}
          <div style={{ borderTop: '2px solid #F5E642', marginTop: 8, paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 800, fontSize: 20 }}>Total Monthly Income</span>
            <span style={{ fontWeight: 900, fontSize: 32, color: '#F5E642′ }}>${total.toFixed(0)}</span>
          </div>
          <div style={{ textAlign: 'center', marginTop: 12, color: '#64748B', fontSize: 13 }}>
            Annual: ${(total * 12).toFixed(0)} · 5-Year: ${(total * 60).toFixed(0)}
          </div>
        </div>
      </div>
    </div>
  );
}