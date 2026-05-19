import { useState } from 'react';

const sportSetups: Record<string, { setup: string[]; cost: string; vibe: string }> = {
  Cowboys: {
    setup: ['85"+ 4K TV minimum — anything smaller is disrespectful', 'AT&T Stadium blue and silver accent wall', 'Surround sound 7.1 — you need to hear the crowd', 'Bar fridge with draft tap — game day requires real beer', 'Recliner sectional with cup holders for everyone'],
    cost: '$8,000–18,000 full build-out',
    vibe: 'America\’s Team requires America\’s Man Cave'
  },
  Rangers: {
    setup: ['65"+ TV positioned for full light control — day games matter', 'Baseball card display case — Rangers memorabilia wall', 'Outdoor TV setup for warm weather games on the patio', 'Ice maker — baseball is a summer sport', 'Scoreboard clock display for pitch count tracking'],
    cost: '$5,000–12,000 full build-out',
    vibe: 'World Series 2023 energy never dies in DFW'
  },
  Stars: {
    setup: ['Home theater setup — hockey needs dark room for puck tracking', 'NHL Center Ice subscription display second screen', 'Stanley Cup replica display shelf', 'Cooler built into bar — hockey culture runs cold', 'NHL Network always-on secondary monitor'],
    cost: '$6,000–14,000 full build-out',
    vibe: 'Stars fans are the most passionate in DFW — prove it'
  },
  Mavs: {
    setup: ['Hardwood floor detail in media room — basketball aesthetic', '75"+ TV for half-court visibility', 'Signed jersey display wall', 'NBA League Pass second screen setup', 'Standing room space — Mavs fans don\’t sit'],
    cost: '$5,500–11,000 full build-out',
    vibe: 'Post-Luka era building — room needs championship energy'
  },
  'All DFW': {
    setup: ['Dedicated 20x20 media room minimum square footage', 'TV wall: 85" primary + 65" secondary for multiple games', 'Full wet bar with draft system', 'Outdoor covered patio TV for overflow game day crowds', 'Season ticket holder wall of fame — frame those seats'],
    cost: '$15,000–45,000 full build-out',
    vibe: 'DFW Sports All-In: Cowboys, Rangers, Stars, Mavs'
  }
};

export default function DFWTexasSportsHomeGuide() {
  const [sport, setSport] = useState('');
  const [result, setResult] = useState<typeof sportSetups[string] | null>(null);

  function generate() {
    if (sport) setResult(sportSetups[sport]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🏈 DFW Sports Home Guide</div>
        <p style={{ color: '#94a3b8', marginBottom: 8, fontSize: 16 }}>
          Texas sports culture isn't just about watching games — it's about having the right home setup to do it properly.
        </p>
        <p style={{ color: '#F5E642', marginBottom: 32, fontSize: 14 }}>Cowboys. Rangers. Stars. Mavs. Your home needs to represent. 🤠</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
          {[{ s: 'Cowboys', e: '🏈' }, { s: 'Rangers', e: '⚾' }, { s: 'Stars', e: '🏒' }, { s: 'Mavs', e: '🏀' }, { s: 'All DFW', e: '🌟' }].map(({ s, e }) => (
            <button key={s} onClick={() => setSport(s)} style={{ background: sport === s ? '#F5E642' : '#112240', color: sport === s ? '#0A1628' : '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '14px 8px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
              {e} {s}
            </button>
          ))}
        </div>

        <button onClick={generate} disabled={!sport} style={{ background: sport ? '#F5E642' : '#1e3a5f', color: sport ? '#0A1628' : '#4a5568', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: sport ? 'pointer' : 'default', marginBottom: 24 }}>
          Build My Sports Room 🏟️
        </button>

        {result && (
          <div>
            <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 4 }}>🎯 Your Setup</div>
              <div style={{ color: '#64748b', fontSize: 13, marginBottom: 16, fontStyle: 'italic' }}>{result.vibe}</div>
              {result.setup.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                  <span style={{ color: '#F5E642' }}>→</span>
                  <span style={{ color: '#e2e8f0', fontSize: 15 }}>{item}</span>
                </div>
              ))}
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginTop: 16 }}>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>💰 Investment Range: </span>
                <span style={{ color: '#e2e8f0' }}>{result.cost}</span>
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginTop: 8 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 12 }}>📺 DFW Man Cave Rules</div>
          {['TV size is a status symbol — upgrade to what makes you proud', 'Outdoor TV is non-negotiable in DFW climate', 'Game day is community — room must fit at least 12 people', 'Bar fridge + ice maker: water breaks don\’t interrupt the game'].map((rule, i) => (
            <div key={i} style={{ color: '#94a3b8', fontSize: 14, marginBottom: 8, paddingLeft: 16, borderLeft: '2px solid #F5E642' }}>{rule}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
