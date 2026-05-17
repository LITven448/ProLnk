import { useState } from 'react';

export default function DFWHVACProLnkCTA2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const urgencies = [
    {
      id: 'emergency',
      label: '🚨 Emergency — No Cool Air',
      title: 'Same-Day Response in DFW',
      body: 'Submit your HVAC emergency request before 2 PM and ProLnk dispatches a Charter-tier tech same day. After 2 PM = next morning priority. Charter HVAC techs carry common parts: capacitors, contactors, TXVs, refrigerant. No diagnostic fee on emergency calls booked through ProLnk — only pay if they fix it.',
    },
    {
      id: 'tuneup',
      label: '🔧 Pre-Summer Tune-Up',
      title: 'Schedule Before May 15 — DFW Rush Begins',
      body: 'DFW HVAC companies book solid from May 15–June 15. ProLnk Charter techs hold capacity for platform customers. Tune-up includes: refrigerant check, coil cleaning, capacitor test, filter change, thermostat calibration, and full Vault documentation. Average tune-up: $89–$149 through ProLnk vs $189–$249 retail.',
    },
    {
      id: 'replacement',
      label: '🏗️ Full System Replacement',
      title: '3 Charter HVAC Bids in 48 Hours',
      body: 'ProLnk sends your replacement request to 3 Charter-tier HVAC contractors simultaneously. Each bid includes: equipment brand, SEER2 rating, warranty terms, and install timeline. All bidders are licensed (TDLR), EPA 608 certified, and carry $1M+ liability. Vault stores all 3 bids + final install record permanently.',
    },
    {
      id: 'inspection',
      label: '🔍 Pre-Purchase Inspection',
      title: 'HVAC Inspection Before You Buy in DFW',
      body: 'ProLnk dispatches a Charter HVAC inspector with 24-hour notice. Report includes: system age, refrigerant type (R-22 vs R-410A vs R-32), efficiency rating, remaining life estimate, and repair needs. DFW HVAC replacement averages $7,500–$14,000 — this $129 inspection protects that investment.',
    },
    {
      id: 'vault',
      label: '🏠 What Goes in Your Vault',
      title: 'Complete HVAC History, Permanently Documented',
      body: 'Every ProLnk HVAC service creates a Vault record: tech name, license number, service date, findings, parts replaced, refrigerant amount, warranty info, and photos. DFW buyers request Vault HVAC history increasingly — documented system adds $2,000–$5,000 in buyer confidence. No storm chasers, no unlicensed handymen enter the Vault.',
    },
  ];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>HVAC SERVICE · DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>❄️ Get DFW HVAC Service Through ProLnk 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          ProLnk matches DFW homeowners with Charter-tier HVAC technicians — licensed, EPA 608 certified, TDLR verified. No storm chasers. No unlicensed handymen. Every service call documented in your Home Health Vault.
        </p>

        <div style={{ backgroundColor: '#0f2240', borderRadius: 8, padding: 20, marginBottom: 28 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>✅ ProLnk Charter HVAC Standards</div>
          {['TDLR licensed · EPA 608 certified · $1M+ liability', 'Same-day emergency response before 2 PM', '3 competitive bids for replacement projects', 'All work documented in Home Health Vault'].map((f, i) => (
            <div key={i} style={{ color: '#cbd5e1', fontSize: 14, padding: '6px 0', borderBottom: '1px solid #1e3a5f' }}>{f}</div>
          ))}
        </div>

        <div style={{ color: '#94a3b8', marginBottom: 16 }}>Select your HVAC urgency:</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
          {urgencies.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
              style={{ backgroundColor: selected === s.id ? '#F5E642' : '#1e3a5f', color: selected === s.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 6, padding: '10px 16px', cursor: 'pointer', fontSize: 14 }}>
              {s.label}
            </button>
          ))}
        </div>

        {selected && (() => {
          const s = urgencies.find(x => x.id === selected)!;
          return (
            <div style={{ backgroundColor: '#0f2240', border: '1px solid #F5E642', borderRadius: 8, padding: 24, marginBottom: 24 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>{s.title}</div>
              <div style={{ color: '#cbd5e1', lineHeight: 1.7 }}>{s.body}</div>
            </div>
          );
        })()}

        <div style={{ backgroundColor: '#F5E642', borderRadius: 8, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 18, marginBottom: 6 }}>🚀 Request HVAC Service Now</div>
          <div style={{ color: '#0A1628', fontSize: 14 }}>Submit your DFW HVAC request at ProLnk.io — describe the issue, get matched to a Charter tech, all documented in your Vault.</div>
        </div>
      </div>
    </div>
  );
}
