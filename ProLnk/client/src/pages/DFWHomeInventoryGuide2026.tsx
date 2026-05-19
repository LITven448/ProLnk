import { useState } from 'react';

const rooms = [
  { label: '🛋️ Living Room', items: ['65" Samsung QLED TV — SN: QN65Q80CAFXZA','Sony soundbar — model HT-S400','Sectional sofa — Restoration Hardware receipt','Area rug — HomeGoods $800','PS5 console — SN: CFI-1215A01X','Apple TV 4K — SN: C39LXXXXXXXXX'] },
  { label: '🍳 Kitchen', items: ['KitchenAid refrigerator — model KRFC300ESS','GE range — model JB735SPSS + serial','Bosch dishwasher — model SHPM88Z75N','Vitamix blender — SN: 21837XX','KitchenAid stand mixer — serial tag on bottom','Small appliances: toaster, coffee maker, Instant Pot'] },
  { label: '🛏️ Master Bedroom', items: ['King mattress + frame — Purple Hybrid Premier 3','Dresser + nightstands — Ashley Furniture receipt','55" LG TV — SN: 305MXBK9X387','Jewelry — itemized list in separate document with appraisals','Laptop / MacBook — SN from About This Mac','Watches — serial numbers + box photos'] },
  { label: '🏠 Garage', items: ['Riding mower — John Deere E150 SN: 1GXE150XXXXX','Toolboxes — Milwaukee, DeWalt tool list','Bicycles — serial under bottom bracket','Generator — Generac 22kW SN from nameplate','Power tools list with model + serial numbers','Storage shelving + contents value estimate'] },
  { label: '💻 Home Office', items: ['Desktop PC — build specs + component list','Dual monitors — serial numbers','Desk + chair — Herman Miller Aeron SN','Printer/scanner — Epson model + serial','External hard drives — serial + data value estimate','Network equipment — router, switch, NAS'] },
];

export default function DFWHomeInventoryGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (selected === null) return;
    navigator.clipboard.writeText(rooms[selected].items.join('
'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF6', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: 2 }}>DFW Homeowner Toolkit · 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>📦 DFW Home Inventory Guide 2026</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem' }}>After a hail storm, fire, or break-in, your insurance claim is only as good as your documentation. A complete home inventory is the single most important thing you can do before a loss — most DFW homeowners don't have one.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[['75%','DFW homeowners have NO home inventory'],['$50K+','Average underclaimed personal property loss'],['📱','USAA + State Farm both offer free inventory apps']].map(([val,label]) => (
            <div key={label} style={{ background: '#111C30', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.3rem' }}>{val}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.8rem', marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111C30', borderRadius: 12, padding: '1.25rem', marginBottom: '2rem', borderLeft: '3px solid #F5E642' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>☁️ Where to Store Your Inventory</div>
          {['Google Drive or iCloud — video walkthrough + photo folder','USAA Home Inventory App (free, insurance-linked)','State Farm Pocket Agent — built-in inventory tool','🔐 ProLnk Home Health Vault — contractor work + permit history stored automatically','USB drive kept off-site at a relative\’s home or safety deposit box'].map((t,i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, color: '#CBD5E1', fontSize: '0.9rem' }}><span style={{ color: '#F5E642' }}>✓</span>{t}</div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🏠 Select a Room — Get Your Inventory Checklist</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {rooms.map((r, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{ background: selected === i ? '#1E3A5F' : '#111C30', border: `2px solid ${selected === i ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '0.9rem', color: '#E8EAF6', cursor: 'pointer', textAlign: 'left', fontWeight: 600 }}>{r.label}</button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: '#111C30', borderRadius: 12, padding: '1.5rem', borderLeft: '4px solid #F5E642' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>📋 {rooms[selected].label} Checklist</div>
              <button onClick={handleCopy} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem' }}>{copied ? '✓ Copied' : 'Copy'}</button>
            </div>
            {rooms[selected].items.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, color: '#CBD5E1', fontSize: '0.9rem' }}><span style={{ color: '#F5E642' }}>□</span>{item}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}