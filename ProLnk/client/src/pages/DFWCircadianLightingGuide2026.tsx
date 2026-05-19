import { useState } from 'react';

const guides = [
  { concern: 'fallasleep', label: 'Trouble Falling Asleep', steps: ['Switch to 2700K bulbs after 7pm 🟡','Disable overhead lights — use table lamps only 💡','Enable Night Shift on all screens by 8pm 📱','Lutron Caseta dimmer set to 20% by 9pm 🎚️','DFW summer tip: late sunsets (8:30pm) delay melatonin — blackout shades are critical 🌙'] },
  { concern: 'stayasleep', label: 'Waking During Night', steps: ['Eliminate all standby LED glow (cover router, TV etc.) ⚫','Use red-tinted nightlights in hallways — red preserves melatonin 🔴','Blackout curtains rated 99%+ block — DFW streetlights are bright 🌃','Set Hue lights to 0% brightness schedule midnight–6am 🌑'] },
  { concern: 'wakeup', label: 'Groggy Morning Wakeup', steps: ['Philips Hue sunrise simulation — starts 30min before alarm 🌅','Begin at 1% 2700K, ramp to 100% 5000K over 20 minutes ☀️','Open east-facing blinds immediately upon waking 🪟','DFW tip: summer sun rises early — let it supplement your light therapy 🌄'] },
  { concern: 'focus', label: 'Low Daytime Focus', steps: ['5000–6500K task lighting at desk during work hours 🔵','Skylight or south-facing window = best natural cognitive light ☁️','Avoid dim amber overhead in home office — it signals brain to slow down 🧠','Take 10min outdoor break in DFW morning before 10am sun gets intense 🚶'] },
];

export default function DFWCircadianLightingGuide2026() {
  const [concern, setConcern] = useState('');
  const guide = guides.find(g => g.concern === concern);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK GUIDE · DFW 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>💡 DFW Circadian Lighting Guide 2026</h1>
        <p style={{ color: '#9BA3B2', fontSize: 15, marginBottom: 32 }}>
          DFW summer sunset at 8:30pm delays melatonin production by 90 minutes versus winter. Tunable lighting systems compensate — warm light in the evening signals your body to wind down regardless of the sky outside.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[{ k: '8:30pm', l: 'DFW summer sunset — melatonin delay risk' },{ k: '2700K', l: 'Ideal evening light color temp' },{ k: '5000K', l: 'Ideal daytime focus light temp' },{ k: '90 min', l: 'Avg melatonin delay from late DFW sunsets' }].map(s => (
            <div key={s.k} style={{ background: '#111E33', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontSize: 26, fontWeight: 800 }}>{s.k}</div>
              <div style={{ color: '#9BA3B2', fontSize: 12, marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#111E33', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🔍 Select Your Sleep Concern</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {guides.map(g => (
              <button key={g.concern} onClick={() => setConcern(concern === g.concern ? '' : g.concern)}
                style={{ padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
                  background: concern === g.concern ? '#F5E642′ : '#1C2D4A', color: concern === g.concern ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 13 }}>
                {g.label}
              </button>
            ))}
          </div>
        </div>
        {guide && (
          <div style={{ background: '#111E33', borderRadius: 12, padding: 24, marginBottom: 28, border: '1px solid #F5E642′ }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 17, marginBottom: 14 }}>💡 {guide.label} — Action Plan</div>
            {guide.steps.map(s => (
              <div key={s} style={{ color: '#CBD1DC', fontSize: 14, marginBottom: 10, display: 'flex', gap: 8 }}>
                <span>→</span><span>{s}</span>
              </div>
            ))}
          </div>
        )}
        <div style={{ background: '#111E33', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 10 }}>🏠 Philips Hue vs Lutron Caseta for DFW</h2>
          <p style={{ color: '#9BA3B2', fontSize: 14, lineHeight: 1.7 }}>
            Philips Hue offers full color temperature tuning (2200K–6500K) via app — ideal for circadian control. Lutron Caseta provides whole-home dimming reliability with better WAF (works with existing bulbs). Best setup: Caseta for dimming control + Hue color bulbs in bedrooms.
          </p>
        </div>
        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 4 }}>Find a Smart Lighting Installer in DFW</div>
          <div style={{ color: '#0A1628', fontSize: 13 }}>ProLnk connects DFW homeowners with certified smart home and electrical contractors.</div>
        </div>
      </div>
    </div>
  );
}