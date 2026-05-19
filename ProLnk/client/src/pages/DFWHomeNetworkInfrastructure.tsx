import { useState } from 'react';

const homeSizes = ['Under 1,500 sqft', '1,500-2,500 sqft', '2,500-3,500 sqft', '3,500-5,000 sqft', '5,000+ sqft'];
const connectionCounts = ['5-10 devices', '10-20 devices', '20-30 devices', '30-50 devices', '50+ devices'];

type NetworkPlan = { backbone: string; panel: string; apCount: number; apPlacement: string[]; equipment: string[]; estimatedCost: string; installTime: string };
const plans: Record<string, Record<string, NetworkPlan>> = {
  'Under 1,500 sqft': {
    '5-10 devices': { backbone: 'Cat6 to 2-3 key locations', panel: '12-port patch panel in utility closet', apCount: 1, apPlacement: ['Central ceiling mount covers entire home'], equipment: ['Ubiquiti UniFi U6 Lite AP', '8-port UniFi switch', '12-port patch panel', '250ft Cat6 cable'], estimatedCost: '$800-$1,400', installTime: '4-6 hours' },
    '10-20 devices': { backbone: 'Cat6 to 4-6 locations', panel: '24-port patch panel', apCount: 2, apPlacement: ['Central main floor mount', 'Bedroom hallway ceiling mount'], equipment: ['2x Ubiquiti UniFi U6 AP', '16-port UniFi switch', '24-port patch panel', '500ft Cat6 cable'], estimatedCost: '$1,200-$2,000', installTime: '6-8 hours' },
  },
  '1,500-2,500 sqft': {
    '10-20 devices': { backbone: 'Cat6 to 6-8 locations throughout home', panel: '24-port structured panel in closet or garage', apCount: 2, apPlacement: ['Main floor central ceiling', 'Second floor hallway ceiling'], equipment: ['2x Ubiquiti UniFi U6 Pro AP', '24-port UniFi switch', '24-port patch panel', '750ft Cat6 cable'], estimatedCost: '$1,800-$2,800', installTime: '8-10 hours' },
    '20-30 devices': { backbone: 'Cat6 to 8-10 locations, all rooms wired', panel: '48-port structured wiring panel', apCount: 3, apPlacement: ['Front of home ceiling', 'Rear of home ceiling', 'Upstairs hallway ceiling'], equipment: ['3x UniFi U6 Pro AP', 'UniFi 24-port PoE switch', '48-port patch panel', '1000ft Cat6 cable'], estimatedCost: '$2,500-$4,000', installTime: '10-14 hours' },
  },
  '2,500-3,500 sqft': {
    '20-30 devices': { backbone: 'Full Cat6 backbone — every room wired', panel: '48-port structured panel + cable management', apCount: 3, apPlacement: ['Front great room ceiling', 'Kitchen or dining ceiling', 'Upstairs master wing ceiling'], equipment: ['3x UniFi U6 Pro AP', 'UniFi 24-port PoE switch', '48-port patch panel', '1500ft Cat6 cable', 'UPS battery backup'], estimatedCost: '$3,500-$5,500', installTime: '12-16 hours' },
    '30-50 devices': { backbone: 'Cat6A to all rooms + outdoor access points', panel: '48-port structured panel + separate AV panel', apCount: 4, apPlacement: ['Front living area ceiling', 'Rear open plan ceiling', 'Upstairs hall ceiling', 'Outdoor patio AP'], equipment: ['4x UniFi U6 Pro + 1x outdoor AP', 'UniFi 48-port PoE switch', '48-port patch panel', '2000ft Cat6A cable', 'UPS + surge protection'], estimatedCost: '$5,000-$8,000', installTime: '16-20 hours' },
  },
  '3,500-5,000 sqft': {
    '30-50 devices': { backbone: 'Cat6A throughout + fiber backbone between floors', panel: 'Full structured wiring closet with 48-port panels', apCount: 5, apPlacement: ['Entry and living room', 'Kitchen and dining', 'Master wing', 'Kids wing upstairs', 'Outdoor covered patio'], equipment: ['5x UniFi U6 Enterprise AP', 'UniFi 48-port PoE+ switch', 'UniFi Dream Machine Pro router', '48-port patch panels x2', '2500ft Cat6A cable'], estimatedCost: '$7,000-$12,000', installTime: '20-28 hours' },
    '50+ devices': { backbone: 'Fiber between floors + Cat6A horizontal runs', panel: 'Dedicated network room with rack-mounted equipment', apCount: 6, apPlacement: ['Every major zone gets dedicated AP', 'Coverage overlap for seamless roaming', 'Outdoor access points at all covered areas'], equipment: ['6x UniFi U6 Enterprise AP', 'UniFi aggregation switch', 'Dream Machine Pro router + NVR', 'Full 19-inch rack', '3000ft Cat6A + fiber patch cables'], estimatedCost: '$10,000-$18,000', installTime: '30-40 hours' },
  },
  '5,000+ sqft': {
    '50+ devices': { backbone: 'Fiber backbone + Cat6A to every room, outdoor APs', panel: 'Dedicated network/AV room with full rack', apCount: 8, apPlacement: ['Zone-based coverage with seamless roaming', 'Outdoor access points at pool and detached structures', 'Guest wing isolated on separate VLAN'], equipment: ['8+ UniFi U6 Enterprise APs', 'UniFi Pro Max switch stack', 'Dream Machine Pro SE', 'Fiber patch panel + Cat6A panels', '4000ft+ Cat6A cable run'], estimatedCost: '$15,000-$30,000', installTime: '40-60 hours' },
  },
};

const DEFAULT_PLAN: NetworkPlan = { backbone: 'Cat6 to all major rooms', panel: '24-port structured panel', apCount: 2, apPlacement: ['Central main floor', 'Upstairs hallway'], equipment: ['2x Ubiquiti UniFi U6 Pro AP', '16-port PoE switch', '24-port patch panel', '750ft Cat6 cable'], estimatedCost: '$2,000-$4,000', installTime: '8-12 hours' };

export default function DFWHomeNetworkInfrastructure() {
  const [homeSize, setHomeSize] = useState('');
  const [connections, setConnections] = useState('');
  const [showResults, setShowResults] = useState(false);

  const plan: NetworkPlan = showResults && homeSize && connections ? (plans[homeSize]?.[connections] ?? DEFAULT_PLAN) : DEFAULT_PLAN;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>📡 DFW Smart Home</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>Home Network Infrastructure Guide</h1>
        <p style={{ color: '#9BA3B4', fontSize: 16, marginBottom: 32 }}>DFW open floor plans and larger lot sizes demand a planned network — not a mesh of consumer routers. Here is how to build it right the first time.</p>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🏗️ Why Structured Wiring Matters in DFW</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, marginBottom: 12 }}>DFW homes average 2,400 sqft — larger than the national median — with open floor plans that WiFi struggles to penetrate uniformly. New construction in DFW increasingly includes structured wiring panels, but most existing homes rely on a single router. The solution is a wired backbone with enterprise-grade wireless access points ceiling-mounted at key zones.</p>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7 }}>Cat6 supports 10 Gbps speeds and is the minimum for new installs in 2026. Cat6A is recommended for runs over 100 feet or in-wall permanent installations.</p>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 20 }}>📐 Build Your Network Plan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#9BA3B4', fontSize: 13, marginBottom: 8 }}>Home Size</label>
              <select value={homeSize} onChange={e => { setHomeSize(e.target.value); setShowResults(false); }} style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 14 }}>
                <option value="">Select home size...</option>
                {homeSizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#9BA3B4', fontSize: 13, marginBottom: 8 }}>Connected Devices / Connection Points</label>
              <select value={connections} onChange={e => setConnections(e.target.value)} style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 14 }}>
                <option value="">Select device count...</option>
                {connectionCounts.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShowResults(true)} disabled={!homeSize || !connections} style={{ backgroundColor: homeSize && connections ? '#F5E642′ : '#1E3A5F', color: homeSize && connections ? '#0A1628' : '#4A5568', padding: '12px 28px', borderRadius: 8, border: ’none', fontWeight: 700, fontSize: 15, cursor: homeSize && connections ? 'pointer' : 'default' }}>
            Generate Network Plan →
          </button>
        </div>

        {showResults && (
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              {[
                { label: 'Access Points Needed', value: `${plan.apCount} APs`, color: '#F5E642′ },
                { label: 'Estimated Cost', value: plan.estimatedCost, color: '#10B981′ },
                { label: 'Install Time', value: plan.installTime, color: '#8B5CF6′ },
              ].map(stat => (
                <div key={stat.label} style={{ backgroundColor: '#112240', borderRadius: 10, padding: 20, textAlign: 'center' }}>
                  <div style={{ color: stat.color, fontSize: 20, fontWeight: 800 }}>{stat.value}</div>
                  <div style={{ color: '#9BA3B4', fontSize: 13, marginTop: 4 }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🔌 Backbone: {plan.backbone}</div>
              <div style={{ color: '#CBD5E1', fontSize: 14 }}>Panel: {plan.panel}</div>
            </div>
            <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>📍 Access Point Placement</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {plan.apPlacement.map((loc, i) => <li key={i} style={{ color: '#CBD5E1', fontSize: 14, padding: '5px 0', borderBottom: '1px solid #1E3A5F' }}>📡 {loc}</li>)}
              </ul>
            </div>
            <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🛒 Equipment List</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {plan.equipment.map((item, i) => <li key={i} style={{ color: '#CBD5E1', fontSize: 14, padding: '5px 0', borderBottom: '1px solid #1E3A5F' }}>• {item}</li>)}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
