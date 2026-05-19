import { useState } from 'react';

const homeOptions = [
  { label: 'Under 1,500 sq ft', tons: 2, normal: '0.10–0.20' },
  { label: '1,500–2,500 sq ft', tons: 3, normal: '0.10–0.20' },
  { label: '2,500–3,500 sq ft', tons: 4, normal: '0.10–0.20' },
  { label: 'Over 3,500 sq ft', tons: 5, normal: '0.10–0.20' },
];

const complaintOptions = [
  { label: 'Some rooms won\’t cool', issue: 'High static — undersized ducts restricting airflow to far zones', pressure: '0.35–0.55 in. w.g.', action: 'Duct resizing or supplemental return needed' },
  { label: 'System runs constantly', issue: 'Low static — leaky ducts losing conditioned air before delivery', pressure: '0.05–0.09 in. w.g.', action: 'Duct sealing (Aeroseal recommended for DFW attics)' },
  { label: 'High energy bills only', issue: 'Borderline high static — common in DFW homes built before 2000', pressure: '0.22–0.35 in. w.g.', action: 'Return air improvement + coil cleaning' },
  { label: 'No complaints — routine check', issue: 'Baseline test — verify system is within spec', pressure: '0.10–0.20 in. w.g.', action: 'Document results; re-test after filter change' },
];

export default function DFWHVACPressureTestGuide() {
  const [homeIdx, setHomeIdx] = useState(0);
  const [complaintIdx, setComplaintIdx] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const home = homeOptions[homeIdx];
  const complaint = complaintOptions[complaintIdx];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '0' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>🌡️ DFW HVAC Guide</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 12, lineHeight: 1.2 }}>Static Pressure Testing in DFW Homes</h1>
        <p style={{ color: '#9BA4B4', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          Static pressure is the most diagnostic test in HVAC — yet most homeowners have never heard of it. In DFW, where summers push systems to their absolute limits, undersized duct systems are the #1 hidden cause of comfort complaints and high bills.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📐 What Is Static Pressure?</h2>
          <p style={{ color: '#CBD2E0', lineHeight: 1.7, marginBottom: 12 }}>
            Think of your duct system like a garden hose. Static pressure measures how hard the air handler has to work to push air through the ducts. Normal total external static pressure (TESP) is <strong style={{ color: '#F5E642' }}>0.10–0.20 in. w.g.</strong> Anything above 0.50 is a crisis.
          </p>
          <p style={{ color: '#CBD2E0', lineHeight: 1.7 }}>
            DFW homes — especially those built 1990–2010 in master-planned suburbs — routinely test at 0.40–0.70+ because builders undersized ductwork to cut costs. In 100°F+ summers this means the system struggles, cycles more, and fails sooner.
          </p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🔧 How Technicians Test</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              ['Manometer placement', 'Magnehelic gauge or digital manometer placed at supply plenum (after coil) and return plenum (before coil)'],
              ['Two-point reading', 'Supply static + return static = TESP. Each side should be roughly equal — imbalance pinpoints where restriction lives'],
              ['Filter effect', 'Test with clean filter installed; a dirty filter can add 0.10–0.15 in. w.g. — always note filter condition'],
              ['Fan speed check', 'Verify blower is set correctly — many DFW systems run at low speed for humidity but too low causes high static readings'],
            ].map(([title, desc]) => (
              <div key={title} style={{ background: '#162035', borderRadius: 8, padding: 14 }}>
                <div style={{ fontWeight: 700, marginBottom: 4, color: '#E8EAF0' }}>{title}</div>
                <div style={{ color: '#9BA4B4', fontSize: 14, lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🏠 Your DFW Home Assessment</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#9BA4B4', marginBottom: 8, fontSize: 14 }}>Home size:</label>
            <select value={homeIdx} onChange={e => { setHomeIdx(+e.target.value); setShowResult(false); }}
              style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
              {homeOptions.map((h, i) => <option key={i} value={i}>{h.label}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#9BA4B4', marginBottom: 8, fontSize: 14 }}>Primary performance complaint:</label>
            <select value={complaintIdx} onChange={e => { setComplaintIdx(+e.target.value); setShowResult(false); }}
              style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
              {complaintOptions.map((c, i) => <option key={i} value={i}>{c.label}</option>)}
            </select>
          </div>
          <button onClick={() => setShowResult(true)}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Analyze My DFW System →
          </button>
          {showResult && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12, fontSize: 16 }}>📊 Results for {home.label} DFW Home</div>
              <div style={{ color: '#CBD2E0', marginBottom: 8 }}><strong>Expected tonnage:</strong> {home.tons} tons</div>
              <div style={{ color: '#CBD2E0', marginBottom: 8 }}><strong>Normal TESP range:</strong> {home.normal} in. w.g.</div>
              <div style={{ color: '#CBD2E0', marginBottom: 8 }}><strong>Likely reading given complaint:</strong> {complaint.pressure}</div>
              <div style={{ color: '#CBD2E0', marginBottom: 8 }}><strong>Diagnosis:</strong> {complaint.issue}</div>
              <div style={{ color: '#F5E642', marginTop: 12, fontWeight: 600 }}>Recommended action: {complaint.action}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
