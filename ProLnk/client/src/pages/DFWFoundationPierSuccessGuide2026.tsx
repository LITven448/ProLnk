import { useState } from 'react';

export default function DFWFoundationPierSuccessGuide2026() {
  const [stage, setStage] = useState('');

  const guides: Record<string, string> = {
    evaluating: 'Evaluating foundation companies in DFW: Require that a licensed structural engineer (PE stamp) supervises the pier design — not just a salesperson doing a "foundation inspection." Get a soil report (geotechnical report) before any company prices your job. Companies that price without a soil report are guessing. DFW has highly expansive clay (Blackland Prairie) that requires pier depth of 10-15 ft or more to reach stable soil. Get 3 bids — prices for the same job can vary $5,000-15,000.',
    getting_bids: 'Getting bids right in DFW: The bid must specify: number of piers, pier type (pressed concrete, helical, drilled), pier diameter, install depth, spacing, and warranty terms (lifetime vs 10-year). Too few piers = partial repair = doors and floors stay misaligned. Ask each bidder: "What soil depth will your piers reach?" If they cannot answer, walk away. Typical DFW home needs 12-25 piers. Budget $250-400 per pier installed.',
    during: 'During DFW pier installation: Installation takes 1-3 days depending on pier count. You will hear hydraulic equipment — normal. Each pier is pressed or drilled to refusal (solid bearing). After piers are set, the crew lifts the foundation incrementally — typically 1/4 to 1/2 inch lifts over several passes. Do not let them lift more than 1-2 inches total per session. Over-lifting causes new cracks.',
    after: 'After DFW pier installation — what to expect: Doors and windows may still stick for weeks as the structure adjusts. Cosmetic cracks in drywall are normal and expected — budget $500-2,000 for drywall repair. Hardwood floors may creak or have small gaps that close over time. Foundation companies guarantee the structural repair, not cosmetic damage. Re-leveling visits (check-ups) should be included — ask for 1-year and 3-year check-ins in writing.',
    warranty: 'DFW foundation warranty reality: Lifetime warranty sounds great but read the fine print. Exclusions for: acts of God (flooding, drought), tree roots, plumbing leaks. Transferability to new buyer often requires a paid inspection ($300-500). The best warranty is only as good as the company — check if they have been in business 15+ years. Ask for references from jobs done 5+ years ago and call them.',
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 36, marginBottom: 4 }}>🏗️</div>
        <h1 style={{ color: '#F5E642', fontSize: 26, marginBottom: 4 }}>DFW Foundation Pier Success Guide 2026</h1>
        <p style={{ color: '#a0aec0', marginBottom: 28 }}>Getting the best outcome from DFW foundation pier installation — from bid to warranty.</p>

        {[
          { label: 'Engineer-Supervised Design', emoji: '📐', desc: 'PE-stamped pier plan required. Not all companies use licensed engineers — those that do produce better outcomes.' },
          { label: 'Soil Report First', emoji: '🧱', desc: 'DFW Blackland Prairie clay requires soil testing to determine proper pier depth. Skipping this step risks underpiercing.' },
          { label: 'Pier Count Matters', emoji: '📊', desc: 'Too few piers = partial repair. The cheap bid often means fewer piers. Compare pier count, not just total price.' },
          { label: 'Cosmetic vs Structural', emoji: '🎨', desc: 'Foundation repair fixes structure. Expect drywall cracks, sticking doors after repair. Budget for cosmetic follow-up.' },
        ].map(item => (
          <div key={item.label} style={{ background: '#112240', borderRadius: 10, padding: '14px 18px', marginBottom: 12 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.emoji} {item.label}</div>
            <div style={{ color: '#a0aec0', fontSize: 14 }}>{item.desc}</div>
          </div>
        ))}

        <div style={{ background: '#112240', borderRadius: 12, padding: '24px', marginTop: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📍 Your Project Stage</h2>
          <select value={stage} onChange={e => setStage(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 15, marginBottom: 16 }}>
            <option value="">Select your stage...</option>
            <option value="evaluating">Evaluating foundation companies</option>
            <option value="getting_bids">Getting and comparing bids</option>
            <option value="during">During installation</option>
            <option value="after">After installation — managing expectations</option>
            <option value="warranty">Understanding my warranty</option>
          </select>
          {stage && guides[stage] && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '16px', color: '#e2e8f0', fontSize: 15, lineHeight: 1.6 }}>{guides[stage]}</div>
          )}
        </div>

        <div style={{ marginTop: 28, background: '#112240', borderRadius: 10, padding: '16px 20px' }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>🏠 ProLnk</span>
          <span style={{ color: '#a0aec0', marginLeft: 8 }}>connects DFW homeowners with engineer-supervised foundation companies with verified track records.</span>
        </div>
      </div>
    </div>
  );
}
