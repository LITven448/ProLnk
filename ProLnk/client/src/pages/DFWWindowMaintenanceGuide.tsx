import { useState } from 'react';

const windowTypes = ['Single-Pane (Older home)', 'Double-Pane Vinyl', 'Double-Pane Aluminum', 'Double-Pane Wood Frame', 'Triple-Pane'];
const issueOptions = ['No issues', 'Drafts or air leaks', 'Condensation between panes', 'Sticking or hard to open', 'Visible frame damage or rot', 'Faded interior from UV'];

export default function DFWWindowMaintenanceGuide() {
  const [windowType, setWindowType] = useState('');
  const [winAge, setWinAge] = useState('');
  const [issue, setIssue] = useState('');
  const [result, setResult] = useState<null | { checklist: string[]; decision: string; cost: string }>(null);

  function calculate() {
    const age = parseInt(winAge) || 15;
    const hasDraft = issue.includes('Drafts');
    const hasCondensation = issue.includes('Condensation');
    const isSticking = issue.includes('Sticking');
    const hasFrameDamage = issue.includes('frame damage');
    const isOldSinglePane = windowType.includes('Single-Pane') && age > 20;

    const checklist: string[] = [
      'Clean tracks with vacuum + damp cloth — DFW dust accumulates in window tracks and jams operation',
      'Inspect exterior caulk at frame perimeter — DFW heat degrades caulk faster; replace cracked/missing caulk annually',
      'Check weatherstripping seal — squeeze it; if it doesn\’t spring back, replace (DFW heat hardens seals in 3–5 years)',
      'Test operation: open and close each window fully — DFW summer heat can warp vinyl and aluminum frames',
    ];

    if (hasDraft) checklist.push('🔴 Draft detected: apply weatherstripping first; if persists, frame may be warped — get professional assessment');
    if (hasCondensation) checklist.push('🔴 Condensation between panes = failed seal; only fix is full IGU (insulated glass unit) replacement — $150–$400 per window');
    if (isSticking) checklist.push('Lubricate vinyl tracks with silicone spray (not WD-40). If aluminum, check for frame warping from DFW heat');
    if (hasFrameDamage) checklist.push('🔴 Frame damage requires immediate repair — water intrusion from damaged frames causes wall rot within 1–2 DFW storm seasons');

    const shouldReplace = isOldSinglePane || hasCondensation || hasFrameDamage;
    const decision = shouldReplace
      ? '🔴 Replace Recommended — single-pane windows lose 30–50% of your HVAC energy in DFW summers. Replacement ROI is 5–8 years on energy savings alone. Low-E glass with argon fill is essential for DFW UV and heat gain.'
      : hasDraft || isSticking
        ? '🟡 Repair First — weatherstripping and caulk replacement ($200–$600 total) should resolve issues before committing to replacement'
        : '🟢 Maintain — current windows are serviceable; focus on annual caulk inspection and UV protection (interior window film optional)';

    const baseRepair = 300;
    const replaceCostPerWindow = windowType.includes('Triple') ? 900 : windowType.includes('Wood') ? 700 : 450;
    const windowCount = 18;
    const cost = shouldReplace
      ? `Repair: $${baseRepair}–$${baseRepair * 2} caulk/seal. Replacement: $${replaceCostPerWindow * 8}–$${replaceCostPerWindow * windowCount} for typical DFW home (8–18 windows at $${replaceCostPerWindow} avg installed).`
      : `Annual maintenance: $150–$400 (caulk + weatherstripping + cleaning). Low-E window film: $400–$1,200 to reduce DFW UV fade.`;

    setResult({ checklist, decision, cost });
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>
          🏡 DFW HOME HEALTH VAULT
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Window Maintenance Guide</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 32 }}>
          DFW's UV intensity, extreme heat, and dust cycles punish windows faster than most US markets. Here’s what to check and when.
        </p>

        <div style={{ display: 'grid', gap: 20, marginBottom: 36 }}>
          {[
            { icon: '🌅', title: 'DFW UV Fades Interior Surfaces', body: 'DFW UV index peaks at 11 from May–September — comparable to South Florida. Unprotected windows allow UV to fade hardwood floors, furniture, and art within 2–3 years. Low-E glass blocks 95% of UV. Retrofit window film ($2–$8/sq ft) is a cost-effective upgrade for existing double-pane windows.' },
            { icon: '🌡️', title: 'Weatherseal Fails Faster in DFW Heat', body: 'Vinyl weatherstripping rated for -40°F to 180°F hardens and loses seal in DFW\’s 150°F+ surface temps. Replace weatherstripping every 3–5 years vs 7–10 in northern climates. Test by running your hand along the closed window — airflow = seal failure = 15–25% HVAC energy loss.' },
            { icon: '🔧', title: 'Exterior Caulk Requires Annual Inspection', body: 'DFW\’s thermal cycling (20°F winters, 110°F summers) puts extreme stress on caulk joints. Inspect every exterior window frame perimeter each spring. Replace any cracked, missing, or non-adhering caulk with paintable silicone caulk. This is a $200 annual job that prevents $5,000+ water damage repairs.' },
            { icon: '💨', title: 'Track Cleaning for DFW Dust', body: 'DFW red clay dust and pollen clog window tracks, degrade weatherstripping, and cause windows to stick. Clean tracks with a vacuum attachment monthly, followed by damp cloth. Use silicone lubricant spray (not petroleum-based) on vinyl tracks. Sticking windows often mean tracks, not mechanical failure.' },
            { icon: '🌀', title: 'DFW Heat Warps Frames', body: 'Aluminum frames conduct heat rapidly — interior surface temps can reach 140°F. This warps frames over time, compromising the seal. Vinyl frames expand and contract 3x more than wood — inspect for bowing on south and west-facing windows annually. Sticking + drafts on south-facing windows = warped frame.' },
          ].map(card => (
            <div key={card.title} style={{ backgroundColor: '#111F3A', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{card.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111F3A', borderRadius: 16, padding: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🧮 Window Assessment Calculator</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            {[
              { label: 'Window Type', state: windowType, set: setWindowType, opts: windowTypes, isSelect: true },
              { label: 'Approximate Window Age (Years)', state: winAge, set: setWinAge, ph: 'e.g. 22', isSelect: false },
              { label: 'Primary Issue Observed', state: issue, set: setIssue, opts: issueOptions, isSelect: true },
            ].map(f => (
              <div key={f.label}>
                <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>{f.label}</label>
                {f.isSelect ? (
                  <select value={f.state} onChange={e => f.set(e.target.value)} style={{ width: '100%', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15 }}>
                    <option value="">Select...</option>
                    {f.opts!.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input value={f.state} onChange={e => f.set(e.target.value)} placeholder={f.ph} style={{ width: '100%', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15 }} />
                )}
              </div>
            ))}
          </div>
          <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '12px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', width: '100%' }}>
            Get Maintenance Checklist + Decision
          </button>
          {result && (
            <div style={{ marginTop: 24, display: 'grid', gap: 12 }}>
              <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 16 }}>
                <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>✅ Annual Maintenance Checklist</div>
                {result.checklist.map((item, i) => (
                  <div key={i} style={{ fontSize: 13, color: '#E2E8F0', marginBottom: 6, paddingLeft: 12, borderLeft: '2px solid #1E3A5F' }}>{item}</div>
                ))}
              </div>
              {[
                { label: '🔧 Repair vs Replace', value: result.decision },
                { label: '💰 Cost Estimate', value: result.cost },
              ].map(r => (
                <div key={r.label} style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 16 }}>
                  <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{r.label}</div>
                  <div style={{ fontSize: 14, color: '#E2E8F0′ }}>{r.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
