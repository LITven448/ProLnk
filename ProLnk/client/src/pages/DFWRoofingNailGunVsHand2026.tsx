import { useState } from 'react';

const concerns = [
  { concern: 'I\'m worried about shingle damage from nailing', emoji: '🔩', issue: 'Overdriven nails are the #1 installation defect in DFW roofing. Pneumatic guns set to high PSI punch through shingles, breaking the seal strip and voiding warranty.', guidance: 'Ask your contractor: What PSI is your nail gun set to? Correct answer: 70–120 PSI with depth gauge set. Most use 120 PSI without adjustment.' },
  { concern: 'Roofer says hand nailing costs more — is it worth it?', emoji: '🔨', issue: 'Hand nailing is slower but more consistent. In DFW high-wind zones (90+ mph design), consistent nail placement matters for uplift resistance. Many manufacturers now allow pneumatic with depth gauge.', guidance: 'Hand nailing is not required if pneumatic is done correctly. The key is nail depth, not the tool. Demand a depth gauge demonstration before work starts.' },
  { concern: 'How do I know if nails are driven correctly after install?', emoji: '🔍', issue: 'Post-install inspection is nearly impossible without a drone or attic inspection. Underdriven nails leave shingles loose; overdriven nails tear through seals. Both fail in DFW hail and wind.', guidance: 'Ask for a progress inspection at 1–2 squares into the job. Look for nails flush with shingle surface — not raised (underdriven) and not punched through (overdriven).' },
  { concern: 'Does nailing affect my manufacturer warranty?', emoji: '📄', issue: 'Yes. GAF, Owens Corning, and others require specific nailing patterns and depths for warranty to be valid. Violations — even from a licensed contractor — can void the warranty.', guidance: 'Request the manufacturer installation spec sheet before work starts. Confirm your contractor has read it. Certified installers are trained on this.' },
  { concern: 'DFW wind zone — does nailing pattern change?', emoji: '💨', issue: 'Yes. DFW is in a high-wind zone requiring 6-nail application (vs standard 4) for most shingle types. This adds material cost but dramatically improves performance in 80–100 mph gusts.', guidance: 'Confirm with your contractor: Are you using 6-nail pattern for this DFW install? Any contractor unfamiliar with this question is a red flag.' },
];

export default function DFWRoofingNailGunVsHand2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>PROLNK · DFW ROOFING GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🔧 Nail Gun vs Hand Nailing in DFW Roofing</h1>
        <p style={{ color: '#94a3b8', marginBottom: 20 }}>Does it matter how shingles are nailed in DFW? Yes — and the difference shows up in your first major hail event.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          <div style={{ background: '#0f2235', border: '1px solid #1e3a5f', borderRadius: 10, padding: 14 }}>
            <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>🔩 Pneumatic (Nail Gun)</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>Fast, standard in DFW. Risk: overdriven nails if PSI not calibrated. Requires depth gauge. Manufacturer-approved when done correctly.</div>
          </div>
          <div style={{ background: '#0f2235', border: '1px solid #1e3a5f', borderRadius: 10, padding: 14 }}>
            <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>🔨 Hand Nailing</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>Slower, more consistent depth control. Preferred by some DFW insurance carriers. Costs 10–15% more in labor. Not required if pneumatic is done right.</div>
          </div>
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>Select Your Roofing Concern</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 36 }}>
          {concerns.map((c, i) => (
            <div key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ background: selected === i ? '#1e3a5f' : '#0f2235', border: `1px solid ${selected === i ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: '16px 20px', cursor: 'pointer' }}>
              <div style={{ fontWeight: 700 }}>{c.emoji} {c.concern}</div>
              {selected === i && (
                <div style={{ marginTop: 12, background: '#0A1628', borderRadius: 8, padding: '12px 14px' }}>
                  <div style={{ color: '#cbd5e1', fontSize: 13 }}>{c.issue}</div>
                  <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 13, marginTop: 8 }}>✅ {c.guidance}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, color: '#0A1628', textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 17 }}>🏠 Get Matched with a Certified DFW Roofer</div>
          <div style={{ marginTop: 6, fontSize: 13 }}>ProLnk vets DFW roofing contractors on nailing specs, wind zone compliance, and manufacturer certification.</div>
        </div>
      </div>
    </div>
  );
}