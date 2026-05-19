import { useState } from 'react';

const PROPERTY_SIZES = ['Under 1,500 sq ft', '1,500–2,500 sq ft', '2,500–4,000 sq ft', 'Over 4,000 sq ft / Acreage'];
const CONCERNS = ['Package theft', 'Home intrusion', 'Monitoring kids/pets', 'Vehicle/driveway security', 'All-around coverage'];

interface CameraRecommendation {
  totalCameras: number;
  indoor: number;
  outdoor: number;
  doorbell: boolean;
  systemType: string;
  storage: string;
  resolution: string;
  cost: string;
  placements: string[];
  privacyNote: string;
}

function getRecommendation(size: string, concerns: string[]): CameraRecommendation {
  const large = size.includes('4,000') || size.includes('2,500');
  const medium = size.includes('1,500');
  const allAround = concerns.includes('All-around coverage');
  const intrusion = concerns.includes('Home intrusion');
  const packages = concerns.includes('Package theft');
  const kids = concerns.includes('Monitoring kids/pets');
  const vehicle = concerns.includes('Vehicle/driveway security');

  let outdoor = large ? 6 : medium ? 4 : 3;
  if (allAround) outdoor += 2;
  if (intrusion) outdoor += 1;
  const indoor = kids ? 2 : 1;
  const doorbell = packages || intrusion;
  const total = outdoor + indoor + (doorbell ? 1 : 0);

  const systemType = total > 8 || large ? '4K NVR (Reolink, Hikvision) — local storage + remote access' : 'Wireless cloud system (Arlo Pro, Ring) — easy setup, monthly fee';
  const storage = total > 6 ? '2TB NVR local storage + 30-day cloud backup' : '30-day cloud storage (Ring Protect or Arlo Secure plan)';
  const resolution = large || intrusion ? '4K (3840x2160) — license plate and face ID capable' : '1080p — sufficient for general security';
  const costLow = total * 120;
  const costHigh = total * 250;

  const placements: string[] = [];
  if (packages || doorbell) placements.push('Video doorbell at front door (package theft + visitor ID)');
  if (vehicle || outdoor > 2) placements.push('Driveway camera covering vehicle entry and street');
  if (intrusion || outdoor > 2) placements.push('Rear yard covering back door and fence line');
  if (outdoor > 3) placements.push('Each side of home covering gate access and side yard');
  if (allAround || large) placements.push('Detached garage or outbuilding exterior');
  if (kids) placements.push('Interior living area and playroom (indoor camera)');
  if (indoor > 1) placements.push('Secondary interior zone — hallway or home office');

  const privacyNote = 'Texas law: you may record on your property and adjacent public areas (street, sidewalk). Recording inside a neighbor\’s home visible from your camera is legal only if accidental — intentional targeting is a Class A misdemeanor. Inform guests of cameras via posted notice to avoid civil liability.';

  return { totalCameras: total, indoor, outdoor, doorbell, systemType, storage, resolution, cost: `$${costLow.toLocaleString()}–$${costHigh.toLocaleString()} installed`, placements, privacyNote };
}

export default function DFWCameraSystemGuide() {
  const [size, setSize] = useState('');
  const [concerns, setConcerns] = useState<string[]>([]);
  const [result, setResult] = useState<CameraRecommendation | null>(null);

  function toggleConcern(c: string) {
    setConcerns(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
    setResult(null);
  }

  function calculate() {
    if (!size || concerns.length === 0) return;
    setResult(getRecommendation(size, concerns));
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '0.85rem', color: '#F5E642', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>🏠 DFW HOME SECURITY</div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem', lineHeight: 1.2 }}>DFW Home Camera System Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>
            DFW porch piracy and vehicle break-ins are above the national average. The right camera system provides evidence for police, deters opportunists, and lets you monitor your property from anywhere.
            This guide cuts through the marketing noise to match your situation with the right system.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {[
            { icon: '🔌', title: 'Wired vs Wireless in DFW Storms', body: 'Wireless cameras lose connectivity during DFW thunderstorms — WiFi drops as routers overheat or lose power. Wired PoE (Power over Ethernet) cameras run on their own network and keep recording through outages when paired with a battery backup UPS. For perimeter security, wired is significantly more reliable.' },
            { icon: '💾', title: 'Local Storage vs Cloud', body: 'Cloud storage (Ring, Arlo, Nest) is convenient but costs $5–$30/month per system and requires internet — which DFW storms interrupt. Local NVR (Network Video Recorder) stores 2–8TB locally with no subscription. Best practice: NVR local + cloud backup for critical cameras.' },
            { icon: '🌙', title: 'Night Vision for DFW Dark Yards', body: 'Standard IR night vision washes out at 30–40 ft. For DFW\’s large yards and long driveways, look for cameras with 4K + IR range of 100+ ft, or color night vision (Reolink, Lorex) that uses low ambient light rather than IR. Starlight sensors outperform basic IR in DFW\’s light-polluted suburban nights.' },
            { icon: '📹', title: '4K vs 1080p', body: '1080p is adequate for general monitoring within 20 ft. For license plate capture at 30+ ft or face identification at entry points, 4K is essential. 4K cameras require more storage — expect 2–4x the NVR capacity. Hybrid systems: 4K at driveway/doors, 1080p for yard coverage.' },
            { icon: '🔔', title: 'Ring Doorbell vs Full NVR System', body: 'Ring and similar WiFi doorbells are easy to install but limited: single camera, WiFi-dependent, subscription required for full features. A full NVR system with a video doorbell module gives you unified recording, no subscriptions, and local storage. For homes with 4+ cameras, NVR cost-per-camera drops significantly.' },
            { icon: '⚖️', title: 'Texas Privacy Laws', body: 'You can legally record public-facing areas from your property. Audio recording in Texas requires one-party consent — you recording your own property is legal. You cannot intentionally aim cameras into neighbors\’ private spaces (bedrooms, backyards with reasonable expectation of privacy). Post a notice for interior cameras visible to guests.' },
          ].map(card => (
            <div key={card.title} style={{ backgroundColor: '#0f2340', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.4rem', fontSize: '0.95rem' }}>{card.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.55 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2340', border: '2px solid #F5E642', borderRadius: '16px', padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.3rem', fontWeight: 800, margin: '0 0 1.5rem' }}>📷 Camera System Recommender</h2>

          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>PROPERTY SIZE</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {PROPERTY_SIZES.map(s => (
                <button key={s} onClick={() => { setSize(s); setResult(null); }} style={{ padding: '0.45rem 1rem', borderRadius: '20px', border: '1.5px solid', borderColor: size === s ? '#F5E642′ : '#1e3a5f', backgroundColor: size === s ? '#F5E642' : ’transparent', color: size === s ? '#0A1628′ : '#94a3b8', fontWeight: 600, fontSize: '0.82rem', cursor: ’pointer' }}>{s}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>PRIMARY CONCERNS (select all that apply)</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {CONCERNS.map(c => (
                <button key={c} onClick={() => toggleConcern(c)} style={{ padding: '0.45rem 1rem', borderRadius: '20px', border: '1.5px solid', borderColor: concerns.includes(c) ? '#F5E642′ : '#1e3a5f', backgroundColor: concerns.includes(c) ? '#F5E642' : ’transparent', color: concerns.includes(c) ? '#0A1628′ : '#94a3b8', fontWeight: 600, fontSize: '0.85rem', cursor: ’pointer' }}>{c}</button>
              ))}
            </div>
          </div>

          <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: '1rem', padding: '0.75rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Build My Camera System →</button>

          {result && (
            <div style={{ marginTop: '1.5rem', backgroundColor: '#0A1628', borderRadius: '10px', padding: '1.25rem', border: '1px solid #1e3a5f' }}>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.05rem', marginBottom: '0.75rem' }}>✅ Your Camera System</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                {[['Total Cameras', result.totalCameras], ['Outdoor', result.outdoor], ['Indoor', result.indoor], ['Doorbell', result.doorbell ? 'Yes' : 'No']].map(([label, val]) => (
                  <div key={label as string} style={{ backgroundColor: '#0f2340', borderRadius: '8px', padding: '0.6rem', textAlign: 'center' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.72rem', marginBottom: '0.2rem' }}>{label}</div>
                    <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.1rem' }}>{val}</div>
                  </div>
                ))}
              </div>
              {[['System Type', result.systemType], ['Storage', result.storage], ['Resolution', result.resolution], ['Est. Installed Cost', result.cost]].map(([label, val]) => (
                <div key={label as string} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem', fontSize: '0.88rem' }}>
                  <span style={{ color: '#94a3b8', minWidth: '160px' }}>{label}</span>
                  <span style={{ color: '#e2e8f0′ }}>{val}</span>
                </div>
              ))}
              <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, margin: '0.75rem 0 0.4rem' }}>CAMERA PLACEMENTS:</div>
              {result.placements.map((p, i) => <div key={i} style={{ color: '#e2e8f0', fontSize: '0.85rem', marginBottom: '0.3rem' }}>• {p}</div>)}
              <div style={{ marginTop: '1rem', backgroundColor: '#0f2340', borderRadius: '8px', padding: '0.75rem', border: '1px solid #1e3a5f' }}>
                <div style={{ color: '#F5E642', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>⚖️ TX PRIVACY LAW</div>
                <div style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5 }}>{result.privacyNote}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0f2340', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1e3a5f' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>🔗 Get a DFW Camera System Quote</div>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.55, margin: 0 }}>ProLnk connects DFW homeowners with licensed security system installers. Wired PoE and wireless systems, properly permitted, with ongoing monitoring options. Free on-site assessment.</p>
        </div>

      </div>
    </div>
  );
}
