import { useState } from 'react';

const sqftRanges = ['Under 1,000 sq ft', '1,000–1,500 sq ft', '1,500–2,000 sq ft', '2,000–3,000 sq ft', '3,000+ sq ft'];
const currentVents = ['No vents / unknown', 'Gable vents only', 'Ridge vent only (no soffit)', 'Ridge + soffit vents', 'Power ventilator (attic fan)'];

const nfa: { [sqft: string]: number } = {
  'Under 1,000 sq ft': 667,
  '1,000–1,500 sq ft': 1000,
  '1,500–2,000 sq ft': 1333,
  '2,000–3,000 sq ft': 2000,
  '3,000+ sq ft': 2667,
};

type Assessment = { status: string; statusColor: string; recommendation: string; cost: string; warning?: string };
const assessments: { [key: string]: Assessment } = {
  'No vents / unknown': { status: 'Critically Under-Ventilated', statusColor: '#DC2626', recommendation: 'Install full ridge vent + continuous soffit vent system. This is the most effective passive system for DFW. Provides balanced airflow — hot air exits at ridge, cooler air enters at soffit continuously.', cost: '$1,500–$4,000 installed', warning: 'DFW attics without ventilation reach 160°F+. This destroys HVAC efficiency, warps decking, voids shingle warranties, and condenses moisture in shoulder seasons.' },
  'Gable vents only': { status: 'Under-Ventilated', statusColor: '#EF4444', recommendation: 'Add soffit vents along entire eave + install ridge vent. Gable vents alone create dead zones at ridge peak where DFW heat accumulates most intensely. Ridge + soffit is the gold standard.', cost: '$1,200–$3,000', warning: 'Gable-only systems work in mild climates but fail in DFW. Hot air pools at the ridge and conducts heat into living space through the ceiling.' },
  'Ridge vent only (no soffit)': { status: 'Partially Ventilated', statusColor: '#EAB308', recommendation: 'Install continuous soffit vents — without intake, ridge vent draws conditioned air from living space into attic (depressurizes house). This is worse than no ridge vent at all in DFW summers.', cost: '$600–$1,800', warning: 'A ridge vent with no soffit intake is a common DFW mistake. It actively pulls your air-conditioned air into the attic, spiking cooling bills 10–20%.' },
  'Ridge + soffit vents': { status: 'Likely Adequate', statusColor: '#22C55E', recommendation: 'Verify net free area (NFA) calculation and confirm soffit vents are not blocked by insulation. In DFW, even properly installed systems benefit from ensuring 50/50 intake-to-exhaust balance.', cost: '$0–$600 (insulation baffle install if blocked)', warning: undefined },
  'Power ventilator (attic fan)': { status: 'Potentially Problematic', statusColor: '#EAB308', recommendation: 'Power attic ventilators are controversial in DFW. If house is not air-sealed, they depressurize the attic and pull conditioned air from living space. Consider switching to passive ridge + soffit system unless house is very well sealed.', cost: '$800–$2,500 to convert to passive', warning: 'Texas A&M energy studies show power attic ventilators often increase cooling costs in DFW homes. Passive ridge+soffit consistently outperforms when properly sized.' },
};

export default function DFWAtticVentilationGuide() {
  const [sqft, setSqft] = useState('');
  const [vents, setVents] = useState('');
  const assessment = vents ? assessments[vents] : null;
  const requiredNFA = sqft ? nfa[sqft] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0D1E35', borderBottom: '3px solid #F5E642', padding: '32px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>DFW HOME SERVICES GUIDE · 2026</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', margin: '0 0 12px', lineHeight: 1.2 }}>🌬️ Attic Ventilation Guide for DFW Homeowners</h1>
          <p style={{ color: '#94A3B8', fontSize: 16, margin: 0, lineHeight: 1.6 }}>DFW attics can hit 150–160°F in July. That heat destroys HVAC efficiency, warps roof decking, voids shingle warranties, and creates moisture conditions in spring and fall. Proper ventilation is one of the highest-ROI improvements a DFW homeowner can make.</p>
        </div>
      </div>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[{ label: '📐 Attic Square Footage', val: sqft, set: setSqft, opts: sqftRanges }, { label: '💨 Current Vent Types', val: vents, set: setVents, opts: currentVents }].map(({ label, val, set, opts }) => (
            <div key={label}>
              <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>{label}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {opts.map(o => (
                  <button key={o} onClick={() => set(o)} style={{ background: val === o ? '#F5E642' : '#1A2D4A', color: val === o ? '#0A1628' : '#E8EDF5', border: 'none', borderRadius: 8, padding: '10px 14px', cursor: 'pointer', fontWeight: val === o ? 700 : 400, fontSize: 13, textAlign: 'left', transition: 'all 0.15s' }}>{o}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {requiredNFA && (
          <div style={{ background: '#1A2D4A', borderRadius: 10, padding: '16px 20px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 28 }}>📊</div>
            <div>
              <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 700, letterSpacing: 1 }}>MINIMUM NET FREE AREA (NFA) REQUIRED</div>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 22 }}>{requiredNFA.toLocaleString()} sq inches <span style={{ fontSize: 14, color: '#94A3B8', fontWeight: 400 }}>({Math.ceil(requiredNFA / 2).toLocaleString()} intake + {Math.ceil(requiredNFA / 2).toLocaleString()} exhaust)</span></div>
            </div>
          </div>
        )}
        {assessment ? (
          <div style={{ background: '#1A2D4A', borderRadius: 12, padding: 28, borderLeft: `4px solid ${assessment.statusColor}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ background: assessment.statusColor, color: '#FFFFFF', fontWeight: 800, fontSize: 12, padding: '4px 12px', borderRadius: 20 }}>{assessment.status.toUpperCase()}</span>
            </div>
            <div style={{ fontSize: 15, color: '#E8EDF5', lineHeight: 1.7, marginBottom: 16 }}>{assessment.recommendation}</div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', marginBottom: assessment.warning ? 16 : 0 }}>
              <span style={{ color: '#94A3B8', fontSize: 13 }}>Estimated Cost: </span>
              <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 17 }}>{assessment.cost}</span>
            </div>
            {assessment.warning && <div style={{ color: '#FCD34D', fontSize: 13, lineHeight: 1.6, borderTop: '1px solid #2D4A6A', paddingTop: 16 }}>⚠️ {assessment.warning}</div>}
          </div>
        ) : (
          <div style={{ background: '#1A2D4A', borderRadius: 12, padding: 28, textAlign: 'center', color: '#94A3B8' }}>Select your attic size and current vent types to get your ventilation assessment.</div>
        )}
        <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[{ icon: '🌡️', title: '150°F Attic Reality', text: 'DFW attics without ventilation reach extreme temperatures. Every degree above 130°F dramatically accelerates shingle granule loss and reduces HVAC life. Ventilation is maintenance, not upgrade.' }, { icon: '💧', title: 'Moisture in Shoulder Seasons', text: 'Spring and fall in DFW create temperature inversions where warm humid air meets cooler attic decking, condensing moisture. Good ventilation prevents mold and deck rot.' }, { icon: '🏠', title: 'Insulation Baffles', text: 'Soffit vents must have baffles (rafter channels) installed to keep blown insulation from blocking airflow. The #1 reason properly installed vent systems underperform in DFW.' }, { icon: '💰', title: 'Energy Savings', text: 'Properly ventilated DFW attics reduce cooling loads 10–15%. On a $300/month summer electric bill, that is $30–$45 per month. Full payback on ventilation upgrade in 3–5 years.' }].map(({ icon, title, text }) => (
            <div key={title} style={{ background: '#1A2D4A', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: 6, fontSize: 15 }}>{title}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.6 }}>{text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
