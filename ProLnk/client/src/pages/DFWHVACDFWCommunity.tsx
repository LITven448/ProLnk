import { useState } from 'react';

const situations = [
  { id: 'neighbor', label: 'I want to recommend a contractor', message: 'Post the contractor\'s license number (TACLB or TACLA), what they did, and what you paid. DFW Nextdoor groups respond best to specific data. ProLnk makes this easier: share your matched pro\'s profile link — it includes their license, ratings, and verified job history.' },
  { id: 'search', label: 'I\'m looking for a recommendation', message: 'Search your zip code + "HVAC" on Nextdoor and Facebook Neighborhood groups. Filter posts from the last 6 months — the DFW market changes fast. Then cross-reference any name you find on ProLnk before you call. We verify what the community cannot.' },
  { id: 'question', label: 'I have an HVAC question for my neighborhood', message: 'Post in Nextdoor with your specific model number and symptom. DFW has thousands of HVAC-literate homeowners who have seen every failure mode. Tag ProLnk in your post — our community team monitors DFW groups and often responds with verified guidance.' },
  { id: 'build', label: 'I want to help build the community', message: 'The most valuable community members share verified data: contractor names + prices + outcomes. If you want to go further, join ProLnk as a field scout — you earn Stream 4 income for every homeowner you refer, and you become a trusted resource in your area.' },
];

export default function DFWHVACDFWCommunity() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = situations.find(s => s.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏘️</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>DFW HVAC Community</h1>
          <p style={{ fontSize: 18, color: '#94a3b8', lineHeight: 1.6 }}>How 2.8 million DFW homeowners help each other stay cool and keep costs down.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>How DFW Communities Share HVAC Knowledge</h2>
          {[
            { icon: '📱', title: 'Nextdoor HVAC Threads', desc: 'Over 40,000 DFW Nextdoor posts mention HVAC every summer. The best threads include license numbers, job descriptions, and final prices — not just "great service".' },
            { icon: '👥', title: 'Facebook Neighborhood Groups', desc: 'Groups like "Frisco Homeowners" and "Plano Neighborhood Watch" have active HVAC channels. Seasonal threads ("summer emergency contacts") are pinned by mods.' },
            { icon: '🔗', title: 'ProLnk Community Layer', desc: 'ProLnk adds verified data on top of community recommendations — license status, insurance confirmation, and actual customer ratings from completed jobs.' },
            { icon: '📊', title: 'Neighborhood Price Benchmarks', desc: 'ProLnk aggregates anonymized job pricing by zip code. Before you accept any quote, you can see what your neighbors actually paid for the same work.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 20, paddingBottom: 20, borderBottom: i < 3 ? '1px solid #1e3a5f' : 'none' }}>
              <span style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: 6 }}>{item.title}</div>
                <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>Your Community Situation</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)} style={{ background: selected === s.id ? '#F5E642' : '#1e3a5f', color: selected === s.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 10, padding: '14px 20px', cursor: 'pointer', textAlign: 'left', fontSize: 15, fontWeight: 600, transition: 'all 0.2s' }}>
                {s.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: 15, color: '#e2e8f0', lineHeight: 1.8 }}>{result.message}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '24px 32px', textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#0A1628', marginBottom: 8 }}>Better Together</div>
          <div style={{ fontSize: 14, color: '#0A1628' }}>Every verified review and shared price makes the DFW HVAC market fairer for everyone. ProLnk provides the infrastructure — the community provides the trust.</div>
        </div>
      </div>
    </div>
  );
}
