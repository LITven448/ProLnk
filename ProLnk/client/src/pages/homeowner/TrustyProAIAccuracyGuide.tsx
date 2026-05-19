import { useState } from 'react';

type FindingType = 'hvac' | 'roof' | 'electrical' | 'foundation' | 'water' | 'plumbing' | '';
type ConfidenceLevel = 'high' | 'medium' | 'low' | '';

const accuracyData = [
  { system: 'Electrical panel identification', pct: 97, bar: '#4ade80′ },
  { system: 'HVAC age identification', pct: 94, bar: '#4ade80′ },
  { system: 'Water damage indicators', pct: 91, bar: '#86efac' },
  { system: 'Roof shingle condition', pct: 89, bar: '#86efac' },
  { system: 'Foundation crack detection', pct: 86, bar: '#fbbf24′ },
  { system: 'Plumbing age indicators', pct: 83, bar: '#fbbf24′ },
];

const interpretations: Record<FindingType extends '' ? never : FindingType, Record<ConfidenceLevel extends '' ? never : ConfidenceLevel, { label: string; action: string; detail: string }>> = {
  hvac: {
    high: { label: 'High confidence — HVAC age finding', action: 'Plan for replacement within the AI-estimated timeline.', detail: 'At 94% accuracy for HVAC age, a high-confidence finding is very reliable. If the AI says your unit is 14 years old, budget for replacement within 1–3 years.' },
    medium: { label: 'Medium confidence — HVAC age finding', action: 'Get a licensed HVAC tech to confirm the unit’s manufacture date.', detail: 'The manufacture date is printed on the nameplate inside the unit. Confirmation takes 5 minutes and costs nothing if done during a tune-up.' },
    low: { label: 'Low confidence — HVAC age finding', action: 'Do not act on this finding without professional confirmation.', detail: 'Low confidence usually means the photo was taken at an angle, in poor light, or the nameplate was partially obscured. Retake the photo or have a tech confirm.' },
  },
  roof: {
    high: { label: 'High confidence — roof condition finding', action: 'If flagged as poor condition, get 2 contractor quotes before your next insurance renewal.', detail: 'At 89% accuracy, a high-confidence roof finding is actionable. DFW insurance underwriters are increasingly asking about roof condition at renewal.' },
    medium: { label: 'Medium confidence — roof condition finding', action: 'Request a drone inspection or have a roofer do a free inspection.', detail: 'Most reputable DFW roofing companies offer free inspections. This turns a medium-confidence AI finding into a confirmed fact.' },
    low: { label: 'Low confidence — roof condition finding', action: 'Retake photos from different angles or hire a roofer to inspect.', detail: 'Roof photos taken from ground level at steep angles produce lower confidence scores. Drone photos or close-up shots of shingle condition improve accuracy significantly.' },
  },
  electrical: {
    high: { label: 'High confidence — electrical panel finding', action: 'Take this seriously. At 97% accuracy, this is highly reliable.', detail: 'Panel identification is the AI’s strongest capability. If flagged, verify the panel brand (Federal Pacific and Zinsco panels have known safety concerns) and consult an electrician.' },
    medium: { label: 'Medium confidence — electrical panel finding', action: 'Have a licensed electrician inspect the panel label directly.', detail: 'The electrician can read the panel label, check breaker condition, and verify the amperage capacity — all things the AI cannot assess through photos.' },
    low: { label: 'Low confidence — electrical panel finding', action: 'Retake the photo with the panel door fully open, lights on, direct angle.', detail: 'Good electrical panel photos require the door open, direct head-on angle, and adequate lighting. Shadows over the label significantly reduce confidence.' },
  },
  foundation: {
    high: { label: 'High confidence — foundation crack detection', action: 'Hire a licensed structural engineer for a full foundation assessment.', detail: 'At 86% accuracy, a high-confidence foundation finding warrants a professional evaluation. In DFW, a full foundation assessment typically costs $300–$600 and provides documentation for buyers.' },
    medium: { label: 'Medium confidence — foundation crack detection', action: 'Monitor the crack for 60 days and photograph any changes. Then get a professional evaluation.', detail: 'Active cracks (those changing size or direction) are more serious than stable historic cracks. Document and get a professional opinion before spending on repairs.' },
    low: { label: 'Low confidence — foundation crack detection', action: 'Retake photos with better lighting and a ruler for scale reference.', detail: 'Foundation crack photos benefit from a ruler or coin for scale reference, good lighting, and direct angle. This helps the AI distinguish hairline cracks from structural concerns.' },
  },
  water: {
    high: { label: 'High confidence — water damage indicator', action: 'Investigate the moisture source before repairing cosmetic damage.', detail: 'Repairing the visible damage without addressing the source guarantees recurrence. Check the roof, plumbing, and HVAC condensate lines above the affected area.' },
    medium: { label: 'Medium confidence — water damage indicator', action: 'Use a moisture meter to confirm active moisture vs. historic staining.', detail: 'A moisture meter (available at Home Depot, ~$30) distinguishes between old staining and active moisture intrusion. This determines urgency.' },
    low: { label: 'Low confidence — water damage indicator', action: 'Retake photos and check the area during or after rain.', detail: 'Low confidence on water damage often means the discoloration pattern was ambiguous. Photographing the area during active rain events can confirm the source.' },
  },
  plumbing: {
    high: { label: 'High confidence — plumbing age indicator', action: 'If flagged as galvanized or polybutylene, get a plumber’s assessment.', detail: 'At 83% accuracy, high-confidence findings on older pipe materials (galvanized steel, polybutylene) are actionable. Both have known failure modes and are flagged by insurers in DFW.' },
    medium: { label: 'Medium confidence — plumbing age indicator', action: 'Have a plumber inspect accessible pipes under sinks and in the attic.', detail: 'Accessible plumbing is easy to inspect. A plumber can identify the pipe material definitively and assess overall system condition in 30–60 minutes.' },
    low: { label: 'Low confidence — plumbing age indicator', action: 'Do not act on this finding. Plumbing age is difficult to confirm from photos alone.', detail: 'Plumbing identification from photos is the AI’s most difficult task. Low confidence means the AI didn’t have enough visual information. A professional inspection is the right path.' },
  },
};

export default function TrustyProAIAccuracyGuide() {
  const [findingType, setFindingType] = useState<FindingType>('');
  const [confidence, setConfidence] = useState<ConfidenceLevel>('');
  const [showGuide, setShowGuide] = useState(false);

  const canShow = findingType && confidence;
  const guide = canShow ? interpretations[findingType][confidence] : null;

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#64748b', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 }}>TrustyPro AI</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#f8fafc', lineHeight: 1.2, marginBottom: 16 }}>
            How Accurate Is TrustyPro AI?
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', lineHeight: 1.6 }}>
            Understanding what the AI can and can't do — and how to get the most out of every finding.
          </p>
        </div>

        {/* Accuracy Bars */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 40, border: '1px solid #334155′ }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f1f5f9', marginBottom: 8 }}>📊 Published Accuracy Rates (2026)</h2>
          <p style={{ color: '#64748b', marginBottom: 28, fontSize: 14 }}>Based on validation testing against licensed inspector reports across 12,000+ homes.</p>
          <div style={{ display: 'grid', gap: 18 }}>
            {accuracyData.map(a => (
              <div key={a.system}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ color: '#cbd5e1', fontSize: 15 }}>{a.system}</span>
                  <span style={{ fontWeight: 800, color: a.bar, fontSize: 16 }}>{a.pct}%</span>
                </div>
                <div style={{ background: '#0f172a', borderRadius: 6, height: 10, overflow: 'hidden' }}>
                  <div style={{ width: `${a.pct}%`, height: '100%', background: a.bar, borderRadius: 6, transition: 'width 0.5s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What Affects Accuracy */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', marginBottom: 24 }}>📷 What Affects Accuracy</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[
              { icon: '🔆', factor: 'Photo Quality', good: 'Clear, well-lit = high confidence', bad: 'Blurry or dark = lower confidence scores' },
              { icon: '📐', factor: 'Photo Angle', good: 'Direct head-on = best results', bad: 'Oblique angles = lower confidence' },
              { icon: '👁️', factor: 'System Visibility', good: 'Visible components = scoreable', bad: 'Inside walls or buried = not scored' },
              { icon: '📅', factor: 'System Age Range', good: '5–30 year old systems = highest accuracy', bad: 'Very new (<5 yr) or very old (>40 yr) = lower edge accuracy' },
            ].map(f => (
              <div key={f.factor} style={{ background: '#1e293b', borderRadius: 12, padding: 22, border: '1px solid #334155′ }}>
                <div style={{ fontSize: 26, marginBottom: 8 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: 10 }}>{f.factor}</div>
                <div style={{ color: '#4ade80', fontSize: 13, marginBottom: 4 }}>✓ {f.good}</div>
                <div style={{ color: '#f87171', fontSize: 13 }}>✗ {f.bad}</div>
              </div>
            ))}
          </div>
        </div>

        {/* What AI Can't Do */}
        <div style={{ background: '#1a1a2e', borderRadius: 14, padding: 28, marginBottom: 40, border: '1px solid #4c1d95′ }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#c4b5fd', marginBottom: 20 }}>🚫 What TrustyPro AI Can't Do (Yet)</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              'Physical access inspection — inside walls, under slabs, inside ductwork',
              'Structural load calculations or engineering assessments',
              'Replace a licensed inspector for legal or mortgage purposes',
              'Detect issues that have zero visible symptoms from photos',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', color: '#a78bfa', fontSize: 15 }}>
                <span style={{ flexShrink: 0, marginTop: 2 }}>◾</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Confidence explanation */}
        <div style={{ background: '#172033', borderRadius: 14, padding: 24, marginBottom: 52, borderLeft: '4px solid #3b82f6′ }}>
          <h3 style={{ fontWeight: 700, color: '#93c5fd', marginBottom: 10 }}>Why Confidence % Matters</h3>
          <p style={{ color: '#94a3b8', margin: '0 0 12px', lineHeight: 1.7 }}>
            "A finding at 60% confidence isn't wrong — it means the AI thinks there's a 60% chance the issue exists. Always have a licensed professional confirm before spending money."
          </p>
          <p style={{ color: '#60a5fa', margin: 0, fontSize: 14 }}>
            If AI flags something that a professional says is fine — report it through the app. This data directly improves future model accuracy.
          </p>
        </div>

        {/* Interactive Guide */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, border: '1px solid #334155′ }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', marginBottom: 8 }}>🔬 Accuracy Scenario Guide</h2>
          <p style={{ color: '#64748b', marginBottom: 28, fontSize: 15 }}>Enter your finding type and confidence level to get an interpretation and recommended action.</p>

          <div style={{ display: 'grid', gap: 24, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontWeight: 600, marginBottom: 12 }}>Finding Type</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8 }}>
                {([['hvac', '❄️ HVAC'], ['roof', '🏠 Roof'], ['electrical', '⚡ Electrical'], ['foundation', '🏗️ Foundation'], ['water', '💧 Water Damage'], ['plumbing', '🔧 Plumbing']] as [FindingType, string][]).map(([val, label]) => (
                  <button key={val} onClick={() => { setFindingType(val); setShowGuide(false); }}
                    style={{ padding: '11px 8px', borderRadius: 8, border: `1px solid ${findingType === val ? '#3b82f6' : '#334155'}`, background: findingType === val ? '#1d4ed8′ : '#0f172a', color: findingType === val ? '#fff' : '#94a3b8', cursor: ’pointer', fontSize: 14, fontWeight: findingType === val ? 700 : 400 }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontWeight: 600, marginBottom: 12 }}>Confidence Level</label>
              <div style={{ display: 'flex', gap: 10 }}>
                {([['high', '🟢 High (75–100%)', '#166534'], ['medium', '🟡 Medium (50–74%)', '#854d0e'], ['low', '🔴 Low (<50%)', '#7f1d1d']] as [ConfidenceLevel, string, string][]).map(([val, label, bg]) => (
                  <button key={val} onClick={() => { setConfidence(val); setShowGuide(false); }}
                    style={{ flex: 1, padding: '12px 8px', borderRadius: 8, border: `1px solid ${confidence === val ? '#fff' : '#334155'}`, background: confidence === val ? bg : '#0f172a', color: confidence === val ? '#fff' : '#94a3b8', cursor: 'pointer', fontSize: 13, fontWeight: confidence === val ? 700 : 400 }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {canShow && (
            <button onClick={() => setShowGuide(true)}
              style={{ width: '100%', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 10, padding: '16px', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginBottom: 20 }}>
              Get My Interpretation Guide
            </button>
          )}

          {showGuide && guide && (
            <div style={{ background: '#0f172a', borderRadius: 12, padding: 28, border: '1px solid #334155′ }}>
              <div style={{ fontWeight: 700, color: '#60a5fa', fontSize: 16, marginBottom: 16 }}>{guide.label}</div>
              <div style={{ background: '#172033', borderRadius: 10, padding: '14px 18px', marginBottom: 16, borderLeft: '4px solid #22c55e' }}>
                <div style={{ fontWeight: 700, color: '#4ade80', marginBottom: 4, fontSize: 13 }}>RECOMMENDED ACTION</div>
                <div style={{ color: '#e2e8f0', fontWeight: 600 }}>{guide.action}</div>
              </div>
              <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.7 }}>{guide.detail}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
