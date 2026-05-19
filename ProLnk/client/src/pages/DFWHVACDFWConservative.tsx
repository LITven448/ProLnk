import { useState } from 'react';

const preferences = [
  {
    id: 'brand',
    label: '🏆 Proven Brand Reliability',
    safeChoice: 'In DFW, Carrier and Trane lead in service network density — over 400 authorized service dealers in the Metroplex. Lennox and Rheem follow closely. These brands have 30+ year DFW track records. For a conservative owner, brand longevity and local service network density matter more than efficiency ratings.',
    matching: 'ProLnk filters for pros who specialize in your preferred brand and carry manufacturer-authorized service credentials — not just general HVAC licenses.',
  },
  {
    id: 'single-stage',
    label: '🔧 Single-Stage Simplicity',
    safeChoice: 'Single-stage compressors have fewer electronic components and have been DFW-proven for 40+ years. In high-dust DFW environments, simpler systems mean fewer failure points. A well-sized, properly installed single-stage unit from a top brand will reliably serve 15-20 years in DFW conditions.',
    matching: 'ProLnk can match you with pros who excel at proper sizing and installation of reliable single-stage systems — the foundation of DFW HVAC performance.',
  },
  {
    id: 'maintenance',
    label: '🛠️ Reliable Maintenance Contracts',
    safeChoice: 'In DFW’s extreme duty cycle, the most reliable HVAC outcome comes from a consistent maintenance relationship. Annual bi-annual tune-ups (before April and before October), filter replacements, and condensate drain clearing prevent 90% of summer emergency failures. Consistency beats technology.',
    matching: 'ProLnk matches conservative owners with pros who offer structured maintenance agreements with price guarantees — not just reactive repair services.',
  },
  {
    id: 'proven-tech',
    label: '📋 When Reliability Beats Innovation',
    safeChoice: 'For DFW homeowners with children, elderly family, or health conditions — reliability is non-negotiable. If your 2-year-old system fails at 105°F, an innovative but less field-proven system’s superior EER rating is irrelevant. Choose proven equipment, established contractors, and structured service agreements over cutting-edge innovation.',
    matching: 'ProLnk understands reliability priorities. Your match profile lets you flag reliability-first criteria, and ProLnk filters for contractors with the lowest emergency callback rates in DFW.',
  },
  {
    id: 'warranty',
    label: '📄 Warranty and Parts Availability',
    safeChoice: 'Conservative DFW owners should prioritize 10-year parts and labor warranties from manufacturers with DFW parts distribution centers. Carrier and Trane both maintain DFW regional warehouses — most parts ship same-day. Newer brands may have 2-3 day part lead times during peak summer demand.',
    matching: 'ProLnk requires matched pros to document parts sourcing capabilities and warranty registration processes — protecting conservative owners from parts availability gaps.',
  },
];

export default function DFWHVACDFWConservative() {
  const [selected, setSelected] = useState(null);
  const pref = preferences.find(p => p.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🛡️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>DFW HVAC Conservative Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.6 }}>
            Proven choices for DFW homeowners who prioritize reliability over innovation.
          </p>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 10, padding: '16px 20px', marginBottom: 32, borderLeft: '4px solid #4ADE80′ }}>
          <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            <strong style={{ color: '#4ADE80′ }}>Conservative is smart.</strong> In DFW, a properly installed proven system outperforms a poorly installed innovative one every time. Reliability is the first performance metric.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {preferences.map(p => (
            <button
              key={p.id}
              onClick={() => setSelected(selected === p.id ? null : p.id)}
              style={{
                background: selected === p.id ? '#F5E642′ : '#1E2D45',
                color: selected === p.id ? '#0A1628′ : '#E8EDF5',
                border: 'none',
                borderRadius: 10,
                padding: '16px 20px',
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {pref && (
          <div style={{ background: '#1E2D45', borderRadius: 12, padding: 28, marginBottom: 32, borderLeft: '4px solid #F5E642′ }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>🛡️ SAFE DFW HVAC CHOICE</div>
              <p style={{ color: '#CBD5E1', lineHeight: 1.7 }}>{pref.safeChoice}</p>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#4ADE80', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>🔗 HOW PROLNK MATCHES FOR RELIABILITY</div>
              <p style={{ color: '#E2E8F0', lineHeight: 1.7 }}>{pref.matching}</p>
            </div>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>🤝</div>
          <h3 style={{ color: '#0A1628', fontWeight: 800, fontSize: 20, marginBottom: 8 }}>ProLnk Matches Reliability-First</h3>
          <p style={{ color: '#1E2D45', fontSize: 14, lineHeight: 1.6 }}>
            Tell ProLnk your reliability priorities — we match you with DFW's most trusted, consistent pros, not just the most innovative ones.
          </p>
        </div>
      </div>
    </div>
  );
}
