import { useState } from 'react';

const systemTypes = ['Central AC (replacing existing)', 'New AC installation', 'Heat pump replacement', 'New heat pump', 'Mini-split system'];
const situations = ['System still working, planning ahead', 'System broke down, need replacement now', 'Refrigerant leak found', 'R-22 system (older)', 'Planning to sell home'];

const getRefrigerantInfo = (system: string, situation: string) => {
  if (!system || !situation) return null;
  if (situation.includes('R-22')) return { refrigerant: 'R-410A or R-454B', urgency: '🔴 Critical', advice: 'R-22 is discontinued. Any replacement must be a full system swap — you cannot recharge R-22 economically. Move to R-454B (A2L) for best efficiency and future-proofing.', cost: '$4,500–$9,000 full system', question: 'Ask: "Is this system R-454B ready? What safety certifications do your techs have for A2L?"' };
  if (situation.includes('broke down')) return { refrigerant: 'R-454B (Puron Advance)', urgency: '🟡 Time-sensitive', advice: 'Since 2025, new systems ship with R-454B or R-32. Ask specifically for R-454B — it\’s A2L (mildly flammable) but lowest GWP. DFW techs are now certified for it.', cost: '$4,000–$8,500 installed', question: 'Ask: "Is your shop A2L certified? Do you have the required leak detection for R-454B install?"' };
  if (situation.includes('leak')) return { refrigerant: 'Depends on existing system', urgency: '🟡 Assess first', advice: 'If system is R-410A and under 15 years old, repair and recharge may make sense. If over 15 years or R-22, replacement is more cost-effective. R-410A is still available but phasing out.', cost: 'Repair: $300–$900 | Replace: $4,500–$9,000', question: 'Ask: "Given my system age, does repair pencil out vs. replacing with a new R-454B system?"' };
  if (situation.includes('sell')) return { refrigerant: 'R-454B for resale value', urgency: '🟢 Strategic', advice: 'New buyers and home inspectors increasingly flag older refrigerant systems. A modern R-454B system is a selling point in DFW\’s competitive market — especially for buyers seeking efficiency.', cost: '$4,000–$8,500 installed', question: 'Ask: "What SEER2 rating will this system have? Can you provide documentation for the listing?"' };
  return { refrigerant: 'R-454B (recommended) or R-32', urgency: '🟢 Plan ahead', advice: 'The 2026 DFW standard for new installations is R-454B (A2L class, GWP 466 vs R-410A\’s 2,088). All new equipment must use A2L or lower. Plan your next system with this in mind.', cost: '$4,000–$8,500 installed', question: 'Ask: "What refrigerant does this unit use, and what does A2L installation require for my home?"' };
};

export default function DFWHVACRefrigerantTypeFinal() {
  const [system, setSystem] = useState('');
  const [situation, setSituation] = useState('');
  const info = getRefrigerantInfo(system, situation);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>HVAC Refrigerant Types: The 2026 DFW Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>The refrigerant landscape changed in 2025. Here's what DFW homeowners need to know before their next HVAC decision.</p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📋 The 2026 DFW Refrigerant Landscape</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              ['R-22 (Freon)', '🔴 Discontinued', 'No longer made. Stockpile only. Costs $100-150+/lb. Any R-22 system needs full replacement.'],
              ['R-410A (Puron)', '🟡 Phase-out underway', 'Still in older systems. Being phased out due to high GWP (2,088). New systems can\’t use it.'],
              ['R-32', '🟢 Available', 'Lower GWP (675). Used in some mini-splits. A2L safety class — mildly flammable.'],
              ['R-454B (Puron Advance)', '✅ 2026 Standard', 'GWP 466, A2L class. Required for new central AC/heat pumps. What DFW pros are installing now.'],
            ].map(([ref, status, desc]) => (
              <div key={ref} style={{ background: '#0A1628', borderRadius: 8, padding: 16, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ minWidth: 160 }}>
                  <div style={{ fontWeight: 600 }}>{ref}</div>
                  <div style={{ fontSize: 13, color: '#94a3b8′ }}>{status}</div>
                </div>
                <div style={{ color: '#94a3b8', fontSize: 14 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 What Should I Ask About?</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8, fontSize: 14 }}>System type</label>
            <select value={system} onChange={e => setSystem(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select system type...</option>
              {systemTypes.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8, fontSize: 14 }}>Your situation</label>
            <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select situation...</option>
              {situations.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          {info && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>{info.refrigerant}</div>
                <div style={{ fontSize: 14 }}>{info.urgency}</div>
              </div>
              <div style={{ color: '#94a3b8', marginBottom: 12, lineHeight: 1.6 }}>{info.advice}</div>
              <div style={{ marginBottom: 10 }}><span style={{ color: '#F5E642′ }}>💰 Cost range:</span> <span style={{ color: '#e2e8f0', fontSize: 14 }}>{info.cost}</span></div>
              <div style={{ background: '#0f2040', borderRadius: 8, padding: 12, fontSize: 14, color: '#94a3b8′ }}>💬 <span style={{ color: '#F5E642' }}>What to ask your contractor: </span>{info.question}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Get Quotes from A2L-Certified DFW HVAC Pros</div>
          <div style={{ color: '#1a2f4a', fontSize: 14 }}>ProLnk vets contractors for the latest refrigerant certifications — don't risk hiring someone not ready for A2L systems</div>
        </div>
      </div>
    </div>
  );
}
