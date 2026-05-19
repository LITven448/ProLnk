import { useState } from 'react';

const DOC_ITEMS = [
  { id: 'model', label: '📋 Equipment model number', why: 'Required for ordering parts, warranty claims, and any tech who services your system.', how: 'Find on the nameplate sticker on the side of your outdoor unit and air handler.' },
  { id: 'serial', label: '🔢 Serial number', why: 'Encodes manufacture date and is required to register warranty and verify age.', how: 'Same nameplate as model number. Often starts with a letter followed by digits.' },
  { id: 'installdate', label: '📅 Install date', why: 'Tells you remaining lifespan and whether you are in warranty coverage.', how: 'Ask your builder, check your home inspection report, or decode from the serial number.' },
  { id: 'photo', label: '📸 Equipment photos', why: 'Helps remote techs or ProLnk agents assess condition before arriving.', how: 'Photograph the nameplate, outdoor unit, air handler, and thermostat.' },
  { id: 'servicerecords', label: '🗂️ Service records (all visits)', why: 'Shows what has been done, prevents duplicate work, and proves maintenance for warranty.', how: 'Request copies from any company that has serviced your system. ProLnk stores these automatically.' },
  { id: 'warranty', label: '📜 Warranty registration confirmation', why: 'Most manufacturers require registration within 60-90 days or coverage defaults to 5 years.', how: 'Check your email from installation date. Register at manufacturer website if not done.' },
  { id: 'filterlog', label: '🔄 Filter change log', why: 'Dirty filters are the #1 cause of DFW HVAC failures. A log proves maintenance.', how: 'Note date and filter size each time. A sticky note inside the unit door works fine.' },
];

const STATUS_OPTIONS = ['Just getting started — I have none of this', 'I have the equipment info but no service records', 'I have some records but they are scattered', 'I have most of this documented', 'Fully documented'];

const GUIDANCE: Record<string, string> = {
  'Just getting started — I have none of this': 'Start with the equipment nameplate today — photograph it with your phone. That single step unlocks model, serial, and approximate age. Then call the company that installed or last serviced your system and request any records they have on file.',
  'I have the equipment info but no service records': 'Contact every HVAC company that has serviced your home and request copies of all invoices and service reports. Most companies keep 5-7 years of records. Store everything in a single folder — physical or digital.',
  'I have some records but they are scattered': 'Consolidate everything into one location. ProLnk\’s Home Health Vault is purpose-built for this — every service visit is logged automatically when a ProLnk tech does the work.',
  'I have most of this documented': 'Check warranty registration — this is the most commonly missed item. Also confirm your filter change log is current. Schedule a tune-up to get a professional assessment added to your records.',
  'Fully documented': 'You are in the top 5% of DFW homeowners for documentation. Ensure your Home Health Vault is current and share access with your primary HVAC tech so they arrive informed.',
};

export default function DFWHVACDocumentationGuide() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState('');

  const toggle = (id: string) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  const doneCount = Object.values(checked).filter(Boolean).length;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>PROLNK · DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>HVAC Documentation Every DFW Homeowner Needs</h1>
        <p style={{ color: '#8899AA', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          Most homeowners cannot answer basic questions about their HVAC system when a tech shows up. Good documentation saves money, speeds up repairs, and protects your warranty.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642′ }}>📁 Documentation Checklist</h2>
            <div style={{ background: doneCount === DOC_ITEMS.length ? '#F5E642′ : '#162030', color: doneCount === DOC_ITEMS.length ? '#0A1628' : '#fff', borderRadius: 20, padding: '4px 12px', fontSize: 13, fontWeight: 700 }}>{doneCount}/{DOC_ITEMS.length} Complete</div>
          </div>
          {DOC_ITEMS.map(item => (
            <div key={item.id} onClick={() => toggle(item.id)} style={{ display: 'flex', gap: 14, marginBottom: 16, cursor: 'pointer', opacity: checked[item.id] ? 0.6 : 1 }}>
              <div style={{ width: 22, height: 22, borderRadius: 6, background: checked[item.id] ? '#F5E642′ : '#162030', border: '2px solid #F5E642', flexShrink: 0, display: ’flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#0A1628', fontWeight: 700, marginTop: 2 }}>{checked[item.id] ? '✓' : ''}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, textDecoration: checked[item.id] ? 'line-through' : 'none' }}>{item.label}</div>
                <div style={{ fontSize: 12, color: '#8899AA', marginBottom: 2 }}><strong>Why:</strong> {item.why}</div>
                <div style={{ fontSize: 12, color: '#6688AA' }}><strong>How to get it:</strong> {item.how}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>📍 Where Are You Now?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {STATUS_OPTIONS.map(s => (
              <button key={s} onClick={() => setStatus(s)} style={{ background: status === s ? '#F5E642′ : '#162030', color: status === s ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: status === s ? 700 : 400, fontSize: 13 }}>{s}</button>
            ))}
          </div>
          {status && <div style={{ background: '#162030', borderRadius: 10, padding: 16, fontSize: 14, color: '#ddd', lineHeight: 1.7 }}>{GUIDANCE[status]}</div>}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Home Health Vault Stores It All</div>
          <div style={{ color: '#0A1628', fontSize: 14 }}>ProLnk automatically logs every service visit to your Home Health Vault. Your documentation builds itself every time a ProLnk tech visits your home.</div>
        </div>
      </div>
    </div>
  );
}
