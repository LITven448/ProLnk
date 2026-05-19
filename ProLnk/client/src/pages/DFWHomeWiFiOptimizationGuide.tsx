import { useState } from 'react';

const SQFT = ['Under 1,500', '1,500–2,500', '2,500–3,500', '3,500–5,000', '5,000+'];
const STORIES = ['1 Story', '2 Stories', '3+ Stories'];
const DEVICES = ['1–10', '11–25', '26–50', '50+'];
const WFH = ['None', 'Occasional', 'Full-time WFH', 'Multiple WFH'];

const WALL_NOTE = 'DFW homes built 1980–2010 often use Texas limestone or thick brick — both absorb WiFi signals and create dead zones even in mid-size homes.';

type Config = { arch: string; nodes: string; eth: boolean; speed: string; cost: string; notes: string };

function getConfig(sqft: string, stories: string, devices: string, wfh: string): Config {
  const bigHome = ['2,500–3,500', '3,500–5,000', '5,000+'].includes(sqft);
  const multiStory = stories !== '1 Story';
  const highDevices = ['26–50', '50+'].includes(devices);
  const wfhIntense = ['Full-time WFH', 'Multiple WFH'].includes(wfh);

  if (sqft === '5,000+' || (bigHome && multiStory && highDevices)) {
    return {
      arch: 'Enterprise Mesh + Ethernet Backbone',
      nodes: '4–6 mesh nodes + wired backhaul',
      eth: true,
      speed: 'Multi-gig router + 2.5GbE switches',
      cost: '$800–$1,800',
      notes: 'Wire at least 2 nodes via Ethernet for rock-solid backhaul. DFW home offices need dedicated VLAN.',
    };
  }
  if (bigHome && (multiStory || wfhIntense)) {
    return {
      arch: 'Tri-band Mesh System',
      nodes: '3–4 mesh nodes',
      eth: wfhIntense,
      speed: 'WiFi 6E router',
      cost: '$400–$900',
      notes: wfhIntense
        ? 'Add Ethernet drop to home office — limestone walls kill backhaul performance.'
        : 'Place nodes in stairwells to cross DFW home floors effectively.',
    };
  }
  if (multiStory || highDevices) {
    return {
      arch: 'Dual-band Mesh or WiFi 6 Router + Extender',
      nodes: '2–3 nodes',
      eth: false,
      speed: 'WiFi 6 (802.11ax)',
      cost: '$200–$500',
      notes: 'Position extender centrally — avoid placing in thick exterior walls common in DFW builds.',
    };
  }
  return {
    arch: 'Single WiFi 6 Router',
    nodes: '1 router, centrally placed',
    eth: false,
    speed: 'WiFi 6 (802.11ax)',
    cost: '$100–$250',
    notes: 'Center placement is key. Elevate off the floor and away from exterior limestone walls.',
  };
}

export default function DFWHomeWiFiOptimizationGuide() {
  const [sqft, setSqft] = useState('');
  const [stories, setStories] = useState('');
  const [devices, setDevices] = useState('');
  const [wfh, setWfh] = useState('');
  const [showConfig, setShowConfig] = useState(false);

  const ready = sqft && stories && devices && wfh;
  const cfg = ready ? getConfig(sqft, stories, devices, wfh) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>📶</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0′ }}>DFW Home WiFi Optimization Guide</h1>
          <p style={{ color: '#94A3B8', margin: 0 }}>Engineered for larger Texas homes with thick walls and high device loads</p>
        </div>

        <div style={{ background: '#0F2240', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642′ }}>
          <p style={{ color: '#94A3B8', margin: 0, fontSize: '0.88rem' }}>
            <strong style={{ color: '#F5E642′ }}>DFW Wall Warning:</strong> {WALL_NOTE}
          </p>
        </div>

        {[
          { label: 'Home square footage', opts: SQFT, val: sqft, set: setSqft },
          { label: 'Number of stories', opts: STORIES, val: stories, set: setStories },
          { label: 'Connected devices', opts: DEVICES, val: devices, set: setDevices },
          { label: 'Work from home intensity', opts: WFH, val: wfh, set: setWfh },
        ].map(({ label, opts, val, set }) => (
          <div key={label} style={{ background: '#0F2240', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem' }}>
            <p style={{ color: '#94A3B8', margin: '0 0 0.75rem', fontSize: '0.9rem', fontWeight: 600 }}>{label}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {opts.map(o => (
                <button
                  key={o}
                  onClick={() => set(o)}
                  style={{
                    padding: '0.4rem 0.9rem', borderRadius: 20, border: '2px solid',
                    borderColor: val === o ? '#F5E642′ : '#1E3A5F',
                    background: val === o ? '#F5E642′ : ’transparent',
                    color: val === o ? '#0A1628′ : '#94A3B8',
                    cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
                  }}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={() => setShowConfig(true)}
          disabled={!ready}
          style={{
            display: 'block', width: '100%',
            background: ready ? '#F5E642′ : '#1E3A5F',
            color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.85rem',
            fontWeight: 700, fontSize: '1rem',
            cursor: ready ? 'pointer' : 'not-allowed', marginBottom: '1.5rem',
          }}
        >
          Get My WiFi Architecture
        </button>

        {showConfig && cfg && (
          <div style={{ background: '#0F2240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}>Your DFW WiFi Plan</h3>
            {[
              ['🏗️ Architecture', cfg.arch],
              ['📡 Hardware', cfg.nodes],
              ['⚡ Speed Tier', cfg.speed],
              ['💰 Estimated Cost', cfg.cost],
              ['🔌 Ethernet Backbone', cfg.eth ? 'Recommended for your setup' : 'Optional for your setup'],
            ].map(([k, v]) => (
              <div key={String(k)} style={{ display: 'flex', gap: '1rem', marginBottom: '0.6rem' }}>
                <span style={{ minWidth: 180, color: '#94A3B8', fontSize: '0.9rem' }}>{k}</span>
                <span style={{ color: '#E2E8F0', fontWeight: 600, fontSize: '0.9rem' }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#0A1628', borderRadius: 8 }}>
              <p style={{ color: '#94A3B8', margin: 0, fontSize: '0.85rem' }}>
                <strong style={{ color: '#F5E642′ }}>DFW Tip:</strong> {cfg.notes}
              </p>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', padding: '1rem', background: '#0F2240', borderRadius: 12 }}>
          <p style={{ color: '#94A3B8', margin: '0 0 0.75rem' }}>Need a network installer who knows DFW homes?</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer' }}>
            🔧 Find a DFW Network Pro
          </button>
        </div>
      </div>
    </div>
  );
}
