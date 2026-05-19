import { useState } from 'react';

const recoveryData: Record<string, Record<string, { timeline: string; priorities: string[]; cost: string; insurance: string[]; fema: boolean }>> = {
  tornado: {
    minor: { timeline: '2–4 weeks', priorities: ['Document ALL damage with photos/video before cleanup', 'Temporary roof tarp or board-up within 24 hours to prevent water damage', 'File insurance claim within 24–48 hours — get claim number', 'Get 3 contractor bids — beware storm chasers offering immediate discounts', 'Check with city for required permits before structural repairs begin'], cost: '$5,000–$25,000 typical minor tornado damage', insurance: ['Call insurer immediately — don\’t wait', 'Document damage before any cleanup', 'Keep receipts for ALL temporary repairs — they\’re reimbursable', 'Request ALE (Additional Living Expense) if displaced', 'Do not sign AOB (Assignment of Benefits) to contractors — you lose claim control'], fema: false },
    moderate: { timeline: '1–4 months', priorities: ['Contact insurance company emergency line same day — request adjuster visit', 'Arrange alternative housing immediately if home is uninhabitable', 'Structural engineer assessment before re-entry if walls/roof compromised', 'Document temporary living expenses from day one', 'Hire public adjuster for claims over $25K — their 10–15% fee often pays for itself'], cost: '$25,000–$150,000 moderate structural damage', insurance: ['Request immediate emergency advance for temp housing and food', 'Get written scope of damage from adjuster — dispute if incomplete', 'Supplement claim if contractor bids exceed adjuster estimate', 'Photograph adjuster\’s work — document what was and wasn\’t inspected', 'Keep a daily log of damage-related expenses'], fema: true },
    severe: { timeline: '6–18 months', priorities: ['Safety is paramount — do not enter without structural clearance', 'File insurance claim AND FEMA application simultaneously', 'Contact SBA Disaster Loan program — low-interest loans for uninsured losses', 'Secure multiple contractor bids — minimum 3 from licensed Texas contractors', 'Consider hiring a licensed public adjuster — critical for large complex claims'], cost: '$150,000–$400,000+ total loss / severe structural', insurance: ['Total loss: insurer owes ACV or RCV depending on policy — know your policy type', 'Extended replacement cost coverage pays above policy limit if costs increase post-disaster', 'Inventory all lost personal property — use credit card statements and purchase history', 'Personal property claim separate from structural — file both', 'Dispute any claim denial in writing within 15 days'], fema: true },
  },
  ice_storm: {
    minor: { timeline: '1–3 weeks', priorities: ['Inspect attic for pipe burst damage before ceiling damage becomes visible', 'Turn off water main if any pipe burst suspected', 'Document ice dam damage on roof — most policies cover this', 'HVAC inspection after freeze — coils can crack in sustained freeze', 'Check water heater — outdoor units and garage water heaters vulnerable'], cost: '$2,000–$15,000 typical ice storm / pipe burst damage', insurance: ['Sudden pipe burst is covered by most homeowners policies', 'Gradual freeze (left heat off) may not be covered — check policy language', 'Mold remediation is time-sensitive — act within 24–48 hours of water intrusion', 'Keep receipts for hotel, meals if displaced by water damage', 'Plumber invoice is reimbursable — keep all receipts'], fema: false },
    moderate: { timeline: '3–8 weeks', priorities: ['Water extraction within 24 hours to prevent mold — every hour matters', 'Professional drying company with moisture meters — not just fans', 'Document ALL wet materials before disposal — insurance requires proof', 'Electrical inspection before restoring power to any wet circuits', 'Roof ice dam professional removal to stop ongoing water intrusion'], cost: '$15,000–$60,000 moderate ice storm with water damage', insurance: ['Demand written authorization from insurer before major demo', 'Mold remediation: insurer must approve before work begins', 'Betterment clause: insurer may pay only depreciated value — know policy', 'Loss of use/ALE coverage: track all additional living expenses daily', 'Supplement estimate if initial offer is low — construction costs surged post-2021'], fema: true },
    severe: { timeline: '2–6 months', priorities: ['Major structural damage from ice load or collapse requires engineer assessment', 'Roof collapse: do not enter until cleared by structural engineer', 'File FEMA application if county declared disaster area', 'Coordinate insurance + FEMA + SBA loan simultaneously for maximum recovery', 'Licensed contractor with ice storm experience — verify their bond and insurance'], cost: '$60,000–$200,000 severe ice storm structural damage', insurance: ['Roof collapse may trigger extended timeframe for claim resolution — push for interim payments', 'Insurer must respond to claim within 15 days under Texas law', 'Appraisal clause: if you disagree with settlement, invoke appraisal process', 'Public adjuster fees are often negotiable — shop and interview multiple'], fema: true },
  },
  hail: {
    minor: { timeline: '2–6 weeks', priorities: ['File claim before storm chasers talk you out of it — you have every right to claim hail damage', 'Inspect roof, gutters, AC condenser, skylights, window screens, siding, and exterior paint', 'Date-stamp all photos with your phone — use weather records to prove storm date', 'Beware free roof offers — get independent inspection first', 'Texas has a 2-year window to file hail claims — don\’t rush into bad contractor deals'], cost: '$8,000–$30,000 typical hail damage to roof + exterior', insurance: ['Texas law: insurer cannot non-renew policy solely for hail claim', 'Actual Cash Value (ACV) policy: you pay depreciation. RCV policy: full replacement paid', 'Supplement for hidden damage found during repair — common with hail', 'Matching issue: insurer must replace entire roof plane if partial match is impossible (TX law)', 'Get adjuster\’s damage estimate in writing before signing anything'], fema: false },
    moderate: { timeline: '4–10 weeks', priorities: ['Multiple items damaged: file one comprehensive claim — not separate claims', 'Schedule adjuster for full property inspection including fence, outbuildings, HVAC', 'Replace AC condenser if hail-damaged — unit will fail prematurely if ignored', 'Interior water damage from compromised roof: document the chain of damage', 'Consider roofing contractor with dedicated supplement team — they know how to advocate for full replacement'], cost: '$30,000–$80,000 moderate hail + interior water damage', insurance: ['Demand line-by-line estimate from adjuster — dispute specific line items not general total', 'Request re-inspection if adjuster missed areas', 'Texas Department of Insurance complaint: tdi.texas.gov if insurer is unreasonable', 'Public adjuster for claims over $40K often results in 20–30% higher settlement'], fema: false },
    severe: { timeline: '2–5 months', priorities: ['Total roof replacement: get 3 bids from licensed roofing contractors (Texas License required)', 'Structural hail damage: engineer letter required for insurance supplement', 'Replace like-for-like materials — insurer must match existing materials in TX', 'Manage contractor timeline carefully — DFW contractor surge after major hail events causes 3–6 month backlogs'], cost: '$80,000–$200,000 catastrophic hail loss', insurance: ['Extended replacement cost rider pays above your dwelling limit if costs surge', 'Document contractor backlogs as reason for extended timeline — insurer cannot cancel ALE prematurely', 'Multiple coverage claims: structure, personal property, and ALE are separate sublimits'], fema: false },
  },
  flood: {
    minor: { timeline: '3–8 weeks', priorities: ['Water extraction within 2–4 hours of flooding — mold begins in 24–48 hours in DFW heat', 'Do not use household fans alone — professional dehumidifiers required', 'Flood insurance claim SEPARATE from homeowners insurance — different adjuster, different policy', 'Remove drywall 12 inches above waterline — mold hides inside wall cavities', 'Document contents damage with video walkthrough room by room'], cost: '$15,000–$50,000 minor flood with contents damage', insurance: ['NFIP flood policy: structure pays up to $250K, contents up to $100K', 'Contents claim: must be done on actual cash value — flood policy does not cover full replacement', 'Mold remediation: flood policy limits mold coverage — act fast to prevent spread', 'FEMA Individual Assistance: register even if you have flood insurance — may cover gaps', 'Keep all receipts: water extraction, hotel, food, equipment rental'], fema: true },
    moderate: { timeline: '2–5 months', priorities: ['Professional IICRC-certified water damage restoration company only', 'Mold testing after drying complete — before rebuilding', 'Rebuilding to current code in flood zone may require elevation — check with city', 'FEMA Flood Map Service Center: verify if repair triggers substantial improvement rule (50% rule)', 'ICC coverage (Increased Cost of Compliance): flood policy add-on that pays for elevation up to $30K'], cost: '$50,000–$150,000 moderate flood with structural damage', insurance: ['Substantial improvement rule: if damage exceeds 50% of home value, may require elevation to BFE', 'ICC coverage: claim separately from structure — request directly from NFIP adjuster', 'Flood zone re-mapping: damage may change your official flood zone — consult licensed flood consultant'], fema: true },
    severe: { timeline: '6–24 months', priorities: ['Total loss in flood zone: consider FEMA voluntary buyout program', 'FEMA buyout: removes property from flood-prone land — 75% federal funds, 25% local', 'Rebuilding: must comply with current NFIP regulations — elevation certificate required', 'Contractor: must have flood zone construction experience — standard contractors unfamiliar with requirements', 'Consider relocating: repeated flood losses qualify for mitigation grants'], cost: '$150,000–$400,000+ severe flood / total loss', insurance: ['NFIP max: $250K structure + $100K contents — gap is uninsured loss unless private flood rider exists', 'FEMA Individual Assistance: register for grants up to $43,900 per household', 'SBA Disaster Loan: up to $200K for primary residence structural repair', 'Buyout program: FEMA pays pre-flood market value — tax-free'], fema: true },
  },
};

export default function DFWDisasterRecoveryGuide() {
  const [disasterType, setDisasterType] = useState('');
  const [damageLevel, setDamageLevel] = useState('');
  const [result, setResult] = useState<null | { timeline: string; priorities: string[]; cost: string; insurance: string[]; fema: boolean }>(null);

  function calculate() {
    if (disasterType && damageLevel) setResult(recoveryData[disasterType]?.[damageLevel] ?? null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🏗️</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Disaster Recovery Guide</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>Know exactly what to do after the storm passes</p>
        </div>

        <div style={{ background: '#dc2626', borderRadius: 10, padding: 16, marginBottom: 24, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 24 }}>🚨</span>
          <div><div style={{ fontWeight: 700, fontSize: 15 }}>Storm Chaser Warning</div><div style={{ fontSize: 13, marginTop: 4, opacity: 0.9 }}>After every DFW disaster, unlicensed contractors flood neighborhoods with cash offers and free roof deals. Never sign an Assignment of Benefits (AOB) or allow work before your insurer approves it. Verify all contractors at tdlr.texas.gov/verify.</div></div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>📋 First 24 Hours: Always Do This</h2>
          {[['📸 Document everything', 'Video walkthrough before ANY cleanup — courts and insurers need visual proof'], ['📞 Call insurer immediately', 'Do not wait — claim delays can complicate coverage'], ['🔒 Secure your property', 'Tarp, board-up, water extraction to prevent additional damage (fully reimbursable)'], ['🏨 Arrange housing', 'ALE (Additional Living Expense) coverage pays hotel + meals if home is uninhabitable'], ['📝 Start a log', 'Date, time, every call, every expense, every contractor contact — paper trail is your friend']].map(([t, d]) => (
            <div key={t as string} style={{ display: 'flex', gap: 12, padding: '9px 0', borderBottom: '1px solid #0A1628′ }}>
              <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 180, fontSize: 13 }}>{t}</span>
              <span style={{ color: '#94a3b8', fontSize: 13 }}>{d}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🔍 Recovery Plan Generator</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8′ }}>Disaster Type</label>
            <select value={disasterType} onChange={e => setDisasterType(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', fontSize: 15 }}>
              <option value="">Select disaster type...</option>
              <option value="tornado">Tornado / Wind</option>
              <option value="ice_storm">Ice Storm / Pipe Burst</option>
              <option value="hail">Hail Storm</option>
              <option value="flood">Flooding / Flash Flood</option>
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8′ }}>Damage Level</label>
            <select value={damageLevel} onChange={e => setDamageLevel(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', fontSize: 15 }}>
              <option value="">Select damage level...</option>
              <option value="minor">Minor — Home livable, cosmetic or component damage</option>
              <option value="moderate">Moderate — Major repairs needed, may need to vacate temporarily</option>
              <option value="severe">Severe — Structural damage, possible total loss, extended displacement</option>
            </select>
          </div>
          <button onClick={calculate} style={{ width: '100%', padding: 14, background: '#F5E642', color: '#0A1628', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Generate Recovery Plan →</button>

          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
                <div style={{ background: '#1e3a5f', borderRadius: 8, padding: '8px 16px' }}><div style={{ fontSize: 11, color: '#94a3b8′ }}>TIMELINE</div><div style={{ fontWeight: 700, color: '#F5E642' }}>{result.timeline}</div></div>
                <div style={{ background: '#1e3a5f', borderRadius: 8, padding: '8px 16px' }}><div style={{ fontSize: 11, color: '#94a3b8′ }}>EST. COST</div><div style={{ fontWeight: 700, color: '#e2e8f0', fontSize: 13 }}>{result.cost}</div></div>
                {result.fema && <div style={{ background: '#1e3775', borderRadius: 8, padding: '8px 16px' }}><div style={{ fontSize: 11, color: '#94a3b8′ }}>FEMA ELIGIBLE</div><div style={{ fontWeight: 700, color: '#60a5fa' }}>✓ Apply Now</div></div>}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>📋 Priority Repair Order</div>
                {result.priorities.map((p, i) => <div key={i} style={{ padding: '5px 0', color: '#cbd5e1', fontSize: 13, borderBottom: '1px solid #1e3a5f' }}>{i + 1}. {p}</div>)}
              </div>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>🏠 Insurance Claim Checklist</div>
                {result.insurance.map((ins, i) => <div key={i} style={{ padding: '5px 0', color: '#94a3b8', fontSize: 13, borderBottom: '1px solid #1e3a5f' }}>✓ {ins}</div>)}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>📞 DFW Recovery Resources</h2>
          {[['🏛️ FEMA Disaster Assistance', 'disasterassistance.gov or 1-800-621-3362'], ['💼 SBA Disaster Loans', 'sba.gov/disaster or 1-800-659-2955'], ['🏠 TX Insurance Help', 'tdi.texas.gov or 1-800-252-3439'], ['🔨 Licensed Contractor Verify', 'tdlr.texas.gov/verify'], ['⚖️ Public Adjuster (TX)', 'taipa.org — find licensed public adjusters']].map(([l, v]) => (
            <div key={l as string} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #0A1628', color: '#cbd5e1', fontSize: 13, flexWrap: 'wrap', gap: 4 }}>
              <span>{l}</span><span style={{ color: '#F5E642', fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
