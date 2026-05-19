import { useState } from 'react';

const fastenerMatrix = [
  { weight: 'Light (under 50 lbs)', substrate: 'Concrete Block', fastener: 'Tapcon Concrete Screw (3/16″)', install: '3/16″ carbide bit, min 1″ embedment', tool: 'Hammer drill' },
  { weight: 'Light (under 50 lbs)', substrate: 'Poured Concrete Slab', fastener: 'Tapcon Concrete Screw (3/16″)', install: '3/16″ carbide bit, min 1″ embedment', tool: 'Hammer drill' },
  { weight: 'Light (under 50 lbs)', substrate: 'Brick Mortar Joint', fastener: 'Tapcon Concrete Screw (1/4″)', install: 'Drill into mortar joint, not brick face', tool: 'Hammer drill' },
  { weight: 'Medium (50–200 lbs)', substrate: 'Concrete Block', fastener: 'Wedge Anchor Expansion Bolt (3/8″)', install: '3/8″ hole, min 2.5″ embedment, torque to spec', tool: 'Hammer drill + wrench' },
  { weight: 'Medium (50–200 lbs)', substrate: 'Poured Concrete Slab', fastener: 'Wedge Anchor Expansion Bolt (3/8″)', install: '3/8″ hole, min 2.5″ embedment, torque to spec', tool: 'Hammer drill + wrench' },
  { weight: 'Medium (50–200 lbs)', substrate: 'Brick Mortar Joint', fastener: 'Sleeve Anchor (3/8″)', install: 'Into mortar, not brick — sleeve distributes load', tool: 'Hammer drill + wrench' },
  { weight: 'Heavy (200+ lbs)', substrate: 'Poured Concrete Slab', fastener: 'Powder-Actuated Fastener (Hilti/Ramset)', install: 'Requires powder tool, use .27 cal load for standard concrete', tool: 'Powder-actuated tool (rent or hire)' },
  { weight: 'Heavy (200+ lbs)', substrate: 'Concrete Block', fastener: 'Through-Bolt with Washer', install: 'Drill completely through, use large washer on back side', tool: 'Hammer drill + wrench' },
];

export default function DFWConcreteMasonryNailGuide() {
  const [weight, setWeight] = useState('');
  const [substrate, setSubstrate] = useState('');
  const [result, setResult] = useState<typeof fastenerMatrix[0] | null>(null);

  function calculate() {
    const match = fastenerMatrix.find(f => f.weight === weight && f.substrate === substrate);
    setResult(match || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>🔩 DFW HOMEOWNER GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Concrete & Masonry Fastener Guide for DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
          DFW homes sit on concrete slabs, concrete block walls, and clay brick — each requires a different fastener. Using a standard nail in concrete will fail immediately. Use this guide to choose correctly.
        </p>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔩 DFW Fastener Selector</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 6, fontSize: 13 }}>Attachment Weight</label>
            <select value={weight} onChange={e => setWeight(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15 }}>
              <option value=''>Select weight...</option>
              <option>Light (under 50 lbs)</option>
              <option>Medium (50–200 lbs)</option>
              <option>Heavy (200+ lbs)</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 6, fontSize: 13 }}>DFW Substrate</label>
            <select value={substrate} onChange={e => setSubstrate(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15 }}>
              <option value=''>Select substrate...</option>
              <option>Poured Concrete Slab</option>
              <option>Concrete Block</option>
              <option>Brick Mortar Joint</option>
            </select>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>Get Fastener Spec</button>
        </div>

        {result && (
          <div style={{ background: '#1e2d45', border: '1px solid #F5E642', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 12, color: '#F5E642′ }}>🔩 Fastener Recommendation</div>
            <div style={{ display: 'grid', gap: 12 }}>
              {[
                ['Fastener Type', result.fastener],
                ['Installation', result.install],
                ['Tool Required', result.tool],
              ].map(([label, value], i) => (
                <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontWeight: 600 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📦 DFW Common Fastener Projects</h2>
          {[
            { icon: '🏗️', project: 'Anchor deck ledger to house', rec: 'Lag screws + concrete anchors into foundation stem wall, min 3″ embedment' },
            { icon: '🏠', project: 'Mount fence post base to patio', rec: 'Wedge anchor 1/2″ into slab, min 3.5″ embedment — DFW wind loads require overspec' },
            { icon: '🧱', project: 'Attach shelf bracket to brick', rec: 'Tapcon into mortar joint, NEVER into brick face — brick face spalls under DFW freeze-thaw' },
            { icon: '⚡', project: 'Mount electrical conduit to block wall', rec: 'Tapcon 3/16″ — conduit clips every 24″ max per code' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.icon} {item.project}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{item.rec}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🏠 Need a DFW Concrete Pro?</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>Structural attachments, deck footings, and powder-actuated fastening should be done by a licensed contractor. ProLnk connects you with vetted DFW pros.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}
