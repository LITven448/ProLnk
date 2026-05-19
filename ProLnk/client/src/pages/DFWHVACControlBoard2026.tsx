import { useState } from 'react';

const behaviors = [
  { symptom: 'HVAC turns on then off immediately', emoji: '⚡', likely: 'Control board short-cycle protection triggered — often from bad sensor input or failed inducer relay.', cost: '$400–$800 board replacement or $100–$200 sensor fix', rec: 'Have a tech pull LED error codes before assuming board failure. Sensors are cheaper.' },
  { symptom: 'HVAC won\’t turn on at all', emoji: '🚫', likely: 'Board may have failed entirely, or a safety switch (drain, pressure) has tripped and the board is in lockout.', cost: '$400–$800 if board; $75–$150 if safety switch reset', rec: 'Check for standing water at drain pan and tripped float switch before calling. Simple fixes get missed.' },
  { symptom: 'Erratic behavior — works sometimes, not others', emoji: '🎲', likely: 'Classic control board failure signature. Intermittent operation usually means a cracked solder joint or failing relay on the board.', cost: '$400–$800 board replacement', rec: 'Document when failures occur (time of day, outdoor temp). This helps techs isolate board vs capacitor.' },
  { symptom: 'LED error code flashing on furnace', emoji: '💡', likely: 'Board is communicating a specific fault. Common DFW codes: 3 flashes = pressure switch, 4 flashes = high limit, 7 flashes = gas valve.', cost: 'Varies by root cause — $100–$600', rec: 'Count flashes carefully. Share exact count with your tech. Different brands use different code tables.' },
  { symptom: 'AC runs but no heat in winter', emoji: '🌡️', likely: 'Heating circuit on control board failed while cooling circuit still works. Common in DFW where AC dominates and heat side goes unused.', cost: '$400–$800 board; sometimes just a blown fuse on board ($15)', rec: 'Check the small fuse on the control board first. Many "board failures" are just a $15 fuse.' },
];

export default function DFWHVACControlBoard2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>PROLNK · DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🧠 DFW HVAC Control Board Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 16 }}>The control board is the brain of your HVAC system. When it fails in DFW summer, you need answers fast.</p>

        <div style={{ background: '#0f2235', border: '1px solid #1e3a5f', borderRadius: 10, padding: 16, marginBottom: 28 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>💡 How to Read LED Error Codes</div>
          <div style={{ color: '#94a3b8', fontSize: 13 }}>Most furnaces have a small sight glass or removable panel near the control board. Count the number of LED flashes in sequence. Example: 3 flashes, pause, 3 flashes = Code 3. Look for a sticker inside the furnace door that maps codes to issues.</div>
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>Select Your HVAC Behavior</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 36 }}>
          {behaviors.map((b, i) => (
            <div key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ background: selected === i ? '#1e3a5f' : '#0f2235', border: `1px solid ${selected === i ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: '16px 20px', cursor: 'pointer' }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{b.emoji} {b.symptom}</div>
              {selected === i && (
                <div style={{ marginTop: 10, background: '#0A1628', borderRadius: 8, padding: '12px 14px' }}>
                  <div style={{ color: '#cbd5e1', fontSize: 13 }}><strong>Likely cause:</strong> {b.likely}</div>
                  <div style={{ color: '#facc15', fontSize: 13, marginTop: 6 }}>💰 <strong>Typical cost:</strong> {b.cost}</div>
                  <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 13, marginTop: 8 }}>👉 {b.rec}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2235', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>⚖️ Board Replacement vs New System?</div>
          <div style={{ color: '#94a3b8', fontSize: 13 }}>If your system is under 10 years old: replace the board. If 12+ years old: factor board cost into replacement math. A $700 board repair on a 14-year-old system in DFW heat may only extend life 2–3 years.</div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, color: '#0A1628', textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 17 }}>🏠 Get a DFW HVAC Diagnostic Today</div>
          <div style={{ marginTop: 6, fontSize: 13 }}>ProLnk matches you with DFW HVAC technicians who can diagnose control board issues fast.</div>
        </div>
      </div>
    </div>
  );
}