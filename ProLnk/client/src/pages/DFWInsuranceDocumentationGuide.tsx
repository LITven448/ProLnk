import { useState } from 'react';

const roomTypes = [
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'living_room', label: 'Living / Family Room' },
  { value: 'master_bedroom', label: 'Master Bedroom' },
  { value: 'secondary_bedroom', label: 'Secondary Bedroom' },
  { value: 'garage', label: 'Garage / Workshop' },
  { value: 'outdoor', label: 'Outdoor / Pool Area' },
  { value: 'office', label: 'Home Office' },
  { value: 'basement', label: 'Basement / Utility Room' },
];

const checklists: Record<string, { items: string[]; timeEst: string; storageMethod: string }> = {
  kitchen: { items: ['Video walkthrough of all appliances (model/serial numbers)', 'Photos of refrigerator, dishwasher, oven, microwave open/closed', 'Receipt documentation or purchase records for appliances', 'Cabinets + countertop overview photos', 'Jewelry/valuables stored in kitchen area'], timeEst: '20–30 min', storageMethod: 'Google Photos (auto-backup) + iCloud + email to yourself' },
  living_room: { items: ['Video of electronics: TV, sound system, gaming systems with serial numbers', 'Photos of furniture from multiple angles with brand labels', 'Art, collectibles, and decor items individually photographed', 'Document high-value items separately on insurance schedule', 'Area rug condition and brand photo'], timeEst: '25–40 min', storageMethod: 'Google Drive folder shared with spouse + insurance agent' },
  master_bedroom: { items: ['Jewelry inventory with photos and appraisals', 'Clothing: video of closet + high-value items individually', 'Electronics (laptops, tablets, watches) serial numbers', 'Furniture photos including any antiques', 'Safe contents documented (separately stored list)'], timeEst: '30–45 min', storageMethod: 'Encrypted cloud + physical copy in safe deposit box' },
  secondary_bedroom: { items: ['Children\’s electronics and gaming equipment', 'Musical instruments with serial numbers', 'Sports equipment (bikes, skis, etc.) with brand/value', 'Furniture condition photos', 'Collectibles or hobby items'], timeEst: '15–25 min', storageMethod: 'Google Photos shared album with date stamps' },
  garage: { items: ['Tools: power tools photographed with serial numbers', 'Vehicle documentation (if garaged) — separate auto policy', 'Lawn/outdoor power equipment serial numbers', 'Bikes and recreational equipment', 'Workshop/hobby equipment inventory'], timeEst: '30–60 min', storageMethod: 'Spreadsheet with serial numbers + photos in Drive' },
  outdoor: { items: ['Pool equipment: pump, heater, filter serial numbers', 'Outdoor furniture brand/purchase info', 'Grill and outdoor cooking equipment', 'Landscaping features: built-in structures, lighting', 'Irrigation system brand and configuration'], timeEst: '20–35 min', storageMethod: 'Photos with geo-tags enabled in cloud storage' },
  office: { items: ['All computers: serial numbers, purchase dates, specs', 'Monitors, printers, networking equipment', 'External drives, cameras, professional equipment', 'Office furniture if significant value', 'Software licenses (document for business policy if applicable)'], timeEst: '20–30 min', storageMethod: 'IT asset spreadsheet + cloud backup + offsite copy' },
  basement: { items: ['HVAC system photos and serial numbers', 'Water heater brand, age, model', 'Sump pump documentation', 'Storage area contents inventory', 'Any finished area furniture and electronics'], timeEst: '25–40 min', storageMethod: 'Appliance folder in cloud with warranty scans' },
};

export default function DFWInsuranceDocumentationGuide() {
  const [room, setRoom] = useState('');
  const [valueEst, setValueEst] = useState('');
  const [result, setResult] = useState<{ items: string[]; timeEst: string; storageMethod: string } | null>(null);

  function generate() {
    if (room && checklists[room]) setResult(checklists[room]);
  }

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', color: '#1E293B', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#1D4ED8', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700 }}>📋 DFW Homeowner Series</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, color: '#0F172A' }}>DFW Home Insurance Documentation Guide</h1>
        <p style={{ color: '#64748B', marginBottom: 32 }}>DFW spring and summer storms can wipe out years of belongings in minutes. Homeowners with complete documentation typically recover 30–40% more from claims than those without.</p>

        <div style={{ background: '#1D4ED8', color: '#fff', borderRadius: 10, padding: '16px 20px', marginBottom: 32, fontWeight: 700 }}>
          ⚡ DFW Claim Season: April–September. Best time to document: January–March, before storm season begins.
        </div>

        <h2 style={{ color: '#1D4ED8', fontSize: 20, marginBottom: 16 }}>Why Documentation Changes Everything</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          {[['📸', 'Proof of ownership prevents "we don\’t have a record of that" denials'],['⚡', 'Documented claims process 3–5x faster than undocumented ones'],['💰', 'Serial numbers prove replacement cost vs. depreciated value'],['☁️', 'Cloud storage survives the same disaster your home doesn\’t']].map(([icon, text]) => (
            <div key={text} style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
              <div style={{ fontSize: 13, color: '#1E40AF' }}>{text}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#1D4ED8', fontSize: 20, marginBottom: 16 }}>Recommended Storage System</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          {[['1st Copy', 'Google Photos / iCloud — auto-backup from your phone immediately', '#DCFCE7', '#166534'],['2nd Copy', 'Google Drive or Dropbox organized folder — shared with spouse/family', '#DBEAFE', '#1E40AF'],['3rd Copy', 'Email the documentation to yourself and your insurance agent annually', '#FEF9C3', '#854D0E']].map(([tier, desc, bg, color]) => (
            <div key={tier} style={{ background: bg, borderRadius: 8, padding: '14px 18px' }}>
              <div style={{ fontWeight: 700, color, fontSize: 14 }}>{tier}</div>
              <div style={{ color: '#374151', fontSize: 13, marginTop: 4 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24, marginBottom: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#1D4ED8', fontSize: 20, marginBottom: 20 }}>📝 Room Documentation Checklist Generator</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, color: '#64748B', display: 'block', marginBottom: 6 }}>Select Room to Document</label>
              <select value={room} onChange={e => setRoom(e.target.value)} style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: 6, padding: '10px 12px', color: '#1E293B', fontSize: 15 }}>
                <option value="">Choose a room...</option>
                {roomTypes.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#64748B', display: 'block', marginBottom: 6 }}>Estimated Room Value ($) — optional</label>
              <input value={valueEst} onChange={e => setValueEst(e.target.value)} placeholder="e.g. 15000″ style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: 6, padding: '10px 12px', color: '#1E293B', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <button onClick={generate} style={{ background: '#1D4ED8', color: '#fff', fontWeight: 700, fontSize: 15, padding: '12px 0', borderRadius: 8, border: 'none', cursor: 'pointer' }}>Generate Checklist</button>
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#F8FAFC', borderRadius: 8, padding: 18, border: '1px solid #E2E8F0′ }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#1D4ED8', marginBottom: 12 }}>Documentation Checklist</div>
              {result.items.map(item => (
                <div key={item} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}>
                  <span style={{ color: '#1D4ED8', marginTop: 1 }}>☐</span>
                  <span style={{ fontSize: 13, color: '#374151′ }}>{item}</span>
                </div>
              ))}
              <div style={{ marginTop: 14, padding: '10px 14px', background: '#EFF6FF', borderRadius: 6 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1E40AF' }}>⏱ Estimated Time: {result.timeEst}</div>
                <div style={{ fontSize: 13, color: '#1E40AF', marginTop: 4 }}>📦 Storage: {result.storageMethod}</div>
                {valueEst && <div style={{ fontSize: 13, color: '#1E40AF', marginTop: 4 }}>💰 Documenting ~${parseInt(valueEst).toLocaleString()} in coverage protection</div>}
              </div>
            </div>
          )}
        </div>
        <div style={{ color: '#94A3B8', fontSize: 12, textAlign: 'center' }}>General guidance only — consult your insurance agent for policy-specific advice.</div>
      </div>
    </div>
  );
}
