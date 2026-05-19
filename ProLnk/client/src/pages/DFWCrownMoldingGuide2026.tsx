import { useState } from 'react';

const styles = [
  { label: 'Traditional / Colonial', value: 'trad' },
  { label: 'Transitional', value: 'trans' },
  { label: 'Modern / Contemporary', value: 'modern' },
  { label: 'Luxury / Estate', value: 'luxury' },
];

const budgets = [
  { label: 'DIY / Budget', value: 'diy' },
  { label: 'Mid-Range Pro', value: 'mid' },
  { label: 'Full Luxury', value: 'high' },
];

const recs = {
  trad: { diy: '3.5" MDF Colonial Crown — paintable, DFW humidity-stable, easiest DIY profile', mid: '4.5" MDF Cove Crown + rosette corners — professional look without coffers', high: '5.5" Wood Crown with coped inside corners + coffered ceilings in great room' },
  trans: { diy: '3.5" MDF Flat Crown — clean lines, easy to paint white or match wall trim', mid: '4.5" MDF with beaded edge — adds detail without full traditional ornamentation', high: '6" MDF Stepped Crown with shadow box wainscot — complete molding package' },
  modern: { diy: 'Skip crown — use reveals or shadow gap at ceiling instead. Clean and intentional.', mid: '1.5" square MDF reveal only — minimalist, modern, DFW interior designer approved', high: 'Integrated LED cove lighting slot — modern DFW alternative to traditional crown' },
  luxury: { diy: 'Not applicable — luxury crown requires professional miter and cope work', mid: '5.5" Wood Crown + coffered ceiling in entry and dining. Hire DFW finish carpenter.', high: 'Custom coffered great room, beam ceilings, multi-piece crown 7"+ total profile' },
};

const facts = [
  { icon: '💰', label: 'Resale Value', text: 'Crown molding adds 8–15% perceived value in DFW resale comparables. Most impactful in the $350K–$700K price band.' },
  { icon: '💧', label: 'MDF vs Wood in DFW', text: 'MDF expands and contracts less than solid wood in DFW humidity swings. For painted applications, MDF is strongly preferred by DFW pros.' },
  { icon: '🎨', label: 'Paint vs Stain', text: '90%+ of DFW crown is painted — typically Sherwin-Williams Extra White or Alabaster to match trim. Stained wood crown only in traditional estate homes.' },
  { icon: '🏠', label: 'Coffered Ceilings', text: 'High-demand luxury feature in DFW. Most common in Southlake, Trophy Club, Westlake, and Frisco custom builds. Adds $4,000–$15,000 installed depending on room size.' },
  { icon: '🔨', label: 'DIY Feasibility', text: 'Simple flat or cove profiles are DIY-friendly. Coped inside corners are the skill barrier — YouTube + practice = achievable for patient DFW homeowners.' },
];

export default function DFWCrownMoldingGuide2026() {
  const [style, setStyle] = useState(null);
  const [budget, setBudget] = useState(null);

  const rec = style && budget ? recs[style][budget] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>👑</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Crown Molding Guide 2026</h1>
          <p style={{ color: '#aaa', fontSize: 14 }}>MDF vs wood, profiles, coffered ceilings, and ROI — tailored for DFW homes</p>
        </div>

        <div style={{ marginBottom: 24 }}>
          <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: 10 }}>Home Style</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {styles.map((s) => (
              <button key={s.value} onClick={() => setStyle(s.value)}
                style={{ background: style === s.value ? '#F5E642' : '#162035', color: style === s.value ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: 600 }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: 10 }}>Budget / Approach</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {budgets.map((b) => (
              <button key={b.value} onClick={() => setBudget(b.value)}
                style={{ background: budget === b.value ? '#F5E642' : '#162035', color: budget === b.value ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '10px 18px', cursor: 'pointer', fontWeight: 600 }}>
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {rec ? (
          <div style={{ background: '#162035', border: '2px solid #F5E642', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>Recommended Approach</h2>
            <p style={{ color: '#ddd', lineHeight: 1.7, marginTop: 0 }}>{rec}</p>
          </div>
        ) : (
          <div style={{ background: '#162035', borderRadius: 12, padding: 24, textAlign: 'center', color: '#888', marginBottom: 24 }}>
            Select home style and budget to get your DFW crown molding recommendation.
          </div>
        )}

        <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: 12 }}>DFW Crown Molding Facts</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {facts.map((f) => (
            <div key={f.label} style={{ background: '#162035', borderRadius: 10, padding: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{f.icon} {f.label}</div>
              <div style={{ color: '#ccc', fontSize: 13, lineHeight: 1.6 }}>{f.text}</div>
            </div>
          ))}
        </div>

        <p style={{ color: '#555', fontSize: 12, textAlign: 'center', marginTop: 32 }}>ProLnk DFW Home Intelligence • prolnk.io</p>
      </div>
    </div>
  );
}
