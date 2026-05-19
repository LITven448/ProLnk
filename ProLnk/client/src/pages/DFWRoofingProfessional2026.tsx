import { useState } from 'react';

export default function DFWRoofingProfessional2026() {
  const [concern, setConcern] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);

  const concernOptions = [
    { label: 'Leak or suspected damage', value: 'leak' },
    { label: 'Getting a replacement quote', value: 'replacement' },
    { label: 'Storm damage insurance claim', value: 'insurance' },
    { label: 'Annual inspection', value: 'inspection' },
    { label: 'Warranty work', value: 'warranty' },
  ];

  const results: Record<string, string> = {
    leak: 'PROFESSIONAL STANDARD: A leak diagnosis requires a full roof inspection — not just a patch over the visible wet spot. A professional should inspect the full roof surface, flashing at all penetrations (vents, skylights, chimney), ridge condition, and attic from below. A written inspection report should accompany any repair quote. Never pay for repairs without a written description of what was found and what is being fixed.',
    replacement: 'PROFESSIONAL REPLACEMENT STANDARDS: A legitimate replacement quote includes a full inspection report, written material specification (shingle brand, weight, color, manufacturer warranty), permit pulled before work begins (required for full replacements in DFW), manufacturer certification if claiming full warranty (requires certified installer), post-install magnetic nail sweep, and haul-away of all old material. Get at least two quotes — and verify permits were actually pulled.',
    insurance: 'STORM DAMAGE CLAIM STANDARDS: A professional should provide a written damage assessment with photos before signing any insurance assignment. Be cautious of companies that ask you to sign over your claim rights (Assignment of Benefits) before you understand the scope — this practice has been associated with fraud in Texas. Your written estimate should itemize every damaged component. Your adjuster and the roofing company estimates should be close — if they are very different, get a third opinion.',
    inspection: 'ANNUAL INSPECTION INCLUDES: Full walking inspection of all roof planes, flashing inspection at all penetrations and valleys, ridge and hip inspection, gutter condition assessment, attic ventilation check (ridge vent, soffit vent, or power vent functioning), and written report with photos. A drive-by inspection without someone on the roof is not a legitimate roof inspection in DFW — hail and wind damage requires close inspection.',
    warranty: 'MANUFACTURER WARRANTY WORK STANDARDS: Warranty work requires a manufacturer-certified installer — not just any licensed contractor. Certifications vary (GAF Master Elite, CertainTeed ShingleMaster, Owens Corning Preferred). Ask for proof of certification before any warranty work. Improper installation by a non-certified installer can void the full manufacturer warranty — even on a brand-new roof.',
  };

  const standards = [
    { emoji: '🔍', label: 'Full inspection before quote', detail: 'Walking inspection — not a drive-by assessment' },
    { emoji: '📋', label: 'Written estimate with material specs', detail: 'Shingle brand, weight, color, and warranty in writing' },
    { emoji: '🏛️', label: 'Permit pulled for full replacement', detail: 'Required in DFW — ask for permit number before work begins' },
    { emoji: '🏆', label: 'Manufacturer certification for warranty work', detail: 'GAF Master Elite, CertainTeed ShingleMaster, or equivalent' },
    { emoji: '🧲', label: 'Magnetic nail sweep after job', detail: 'Standard practice — protects your family, pets, and tires' },
    { emoji: '🚛', label: 'Full cleanup and haul-away', detail: 'All old material removed from property before final payment' },
  ];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF4', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 }}>DFW Roofing Guide 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>What to Expect from a DFW Roofing Professional</h1>
        <p style={{ color: '#94A3B8', fontSize: 15, marginBottom: 32 }}>Professional roofing service standards in DFW — what every homeowner should require before any contractor gets on your roof.</p>

        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {standards.map((s) => (
            <div key={s.label} style={{ backgroundColor: '#112240', borderRadius: 10, padding: 14, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 22, flexShrink: 0 }}>{s.emoji}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 3 }}>{s.label}</div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>{s.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>🔍 What should I expect for my situation?</div>
          <select
            value={concern}
            onChange={(e) => { setConcern(e.target.value); setResult(results[e.target.value] ?? null); }}
            style={{ width: '100%', padding: '12px 14px', backgroundColor: '#0A1628', color: '#E8EDF4', border: '1px solid #1E3A5F', borderRadius: 8, fontSize: 14, marginBottom: 16 }}
          >
            <option value="">Select your service concern...</option>
            {concernOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '3px solid #F5E642', color: '#CBD5E1', fontSize: 14, lineHeight: 1.6 }}>
              {result}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 8, padding: 16, marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, color: '#F5E642′ }}>⚠️ Storm chasers in DFW</div>
          <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.6 }}>After every major hail event, out-of-state storm chaser crews flood DFW. They often deliver substandard work and leave the state before warranty issues appear. Always verify a contractor has a permanent Texas business address and an active Texas contractor license before signing anything.</div>
        </div>

        <div style={{ backgroundColor: '#1a1a2e', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>🔧 ProLnk Charter Roofers</div>
          <div style={{ color: '#94A3B8', fontSize: 13 }}>Every Charter roofer is a permanent DFW-based contractor with manufacturer certifications, permit compliance, and full written documentation for your Home Health Vault.</div>
        </div>
      </div>
    </div>
  );
}
