import { useState } from 'react';

const protectionPillars = [
  {
    icon: '🔧',
    title: 'Vetted Contractors',
    description: 'Knowing exactly who to call before a crisis eliminates panic decisions. ProLnk pre-screens DFW pros so you have trusted names ready.',
    status: 'prolnk',
  },
  {
    icon: '🛠️',
    title: 'Preventive Maintenance',
    description: 'Annual HVAC tune-ups, roof inspections, and plumbing checks catch 80% of problems before they become emergencies.',
    status: 'maintenance',
  },
  {
    icon: '📋',
    title: 'Proper Insurance',
    description: 'Replacement cost coverage, flood riders, and umbrella policies close gaps that leave most DFW homeowners exposed.',
    status: 'insurance',
  },
  {
    icon: '📁',
    title: 'Good Documentation',
    description: 'Emergency binders, photo inventories, and digital backups mean faster claims and better outcomes in any disaster.',
    status: 'documentation',
  },
];

type Situation = {
  hasVettedContractors: string;
  hasMaintenance: string;
  hasInsurance: string;
  hasDocumentation: string;
};

const actionMap: Record<string, string[]> = {
  hasVettedContractors: [
    '🔧 Join ProLnk to get access to vetted DFW plumbers, HVAC, roofers',
    '📞 Save 2 pro contacts per trade to your phone before next storm season',
    '🔍 Ask neighbors for referrals and verify license at TDLR.texas.gov',
  ],
  hasMaintenance: [
    '📅 Schedule HVAC annual tune-up — spring and fall for DFW climate',
    '🏠 Book a pre-hail-season roof inspection (March–April in DFW)',
    '🚰 Have plumber check water pressure and PRV annually',
    '🌿 Trim trees near home each fall before ice season',
  ],
  hasInsurance: [
    '📋 Review your policy for ACV vs RCV — upgrade to replacement cost',
    '🌊 Check if you need a flood rider — ask your agent about Trinity River proximity',
    '☂️ Consider umbrella policy — adds $1–2M for $200–$300/year',
    '💰 Review deductibles — 1% or 2% roof deductible has big impact in hail country',
  ],
  hasDocumentation: [
    '📸 Photograph every room and major appliance this weekend',
    '📁 Build your home emergency binder (use our guide)',
    '☁️ Upload all home docs to a dedicated Google Drive folder',
    '💾 Store a USB backup at family member or workplace',
  ],
};

const costEstimates = [
  { item: 'HVAC annual tune-up (spring + fall)', cost: '$150–$300/year', impact: 'Prevents $3,000–$12,000 emergency replacements' },
  { item: 'Roof inspection (pre-season)', cost: '$100–$200', impact: 'Catches issues before hail season compounds them' },
  { item: 'Flood rider addition to homeowners policy', cost: '$400–$800/year', impact: 'DFW flood claims average $25,000+' },
  { item: 'RCV upgrade (replacement cost value)', cost: '$100–$300/year more', impact: 'Avoids depreciation gaps on $15,000+ roof claims' },
  { item: 'Umbrella policy ($1M coverage)', cost: '$200–$300/year', impact: 'Protects against liability exceeding home policy limits' },
  { item: 'ProLnk membership', cost: 'Free to homeowners', impact: 'Access to vetted pros before and after every DFW storm' },
];

export default function DFWHomeOwnerPeaceOfMind() {
  const [situation, setSituation] = useState<Situation>({
    hasVettedContractors: '',
    hasMaintenance: '',
    hasInsurance: '',
    hasDocumentation: '',
  });
  const [showPlan, setShowPlan] = useState(false);

  const gapKeys = Object.entries(situation)
    .filter(([, val]) => val === 'no')
    .map(([key]) => key);

  const allAnswered = Object.values(situation).every(v => v !== '');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2 }}>
          DFW HOMEOWNER GUIDE
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
          🏡 DFW Homeowner Peace of Mind
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          Peace of mind as a DFW homeowner isn't luck — it’s a system. Four pillars protect 
          your home, your finances, and your family when North Texas weather gets serious.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {protectionPillars.map((p, i) => (
            <div key={i} style={{ background: '#0f2040', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{p.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 15 }}>{p.title}</div>
              <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>{p.description}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📊 Where Do You Stand Today?</h2>
          {[
            { label: 'DO YOU HAVE VETTED CONTRACTORS SAVED FOR EACH TRADE?', key: 'hasVettedContractors' },
            { label: 'ARE YOU ON A PREVENTIVE MAINTENANCE SCHEDULE?', key: 'hasMaintenance' },
            { label: 'IS YOUR INSURANCE REVIEWED AND PROPERLY COVERED?', key: 'hasInsurance' },
            { label: 'DO YOU HAVE HOME DOCUMENTATION AND A PHOTO INVENTORY?', key: 'hasDocumentation' },
          ].map(field => (
            <div key={field.key} style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 12 }}>{field.label}</label>
              <div style={{ display: 'flex', gap: 10 }}>
                {['yes', 'no', 'partial'].map(val => (
                  <button
                    key={val}
                    onClick={() => setSituation(prev => ({ ...prev, [field.key]: val }))}
                    style={{
                      flex: 1,
                      padding: '8px 0',
                      borderRadius: 8,
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: 13,
                      background: situation[field.key as keyof Situation] === val ? '#F5E642′ : '#1e3a5f',
                      color: situation[field.key as keyof Situation] === val ? '#0A1628′ : '#94a3b8',
                    }}
                  >
                    {val === 'yes' ? '✅ Yes' : val === 'no' ? '❌ No' : '🟡 Partial'}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {allAnswered && (
            <button
              onClick={() => setShowPlan(true)}
              style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 24px', fontSize: 15, cursor: 'pointer', marginTop: 8, width: '100%' }}
            >
              Show My Peace of Mind Action Plan →
            </button>
          )}
        </div>

        {showPlan && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>
              {gapKeys.length === 0 ? '🏆 You Are Fully Protected!' : `🎯 Your Action Plan (${gapKeys.length} Gap${gapKeys.length > 1 ? 's' : ''})`}
            </h2>
            {gapKeys.length === 0 ? (
              <p style={{ color: '#94a3b8′ }}>You have all four protection pillars in place. You are one of the most prepared DFW homeowners. Share ProLnk with a neighbor who isn’t there yet.</p>
            ) : (
              gapKeys.map(key => (
                <div key={key} style={{ marginBottom: 20 }}>
                  <div style={{ fontWeight: 700, marginBottom: 8, color: '#F5E642′ }}>
                    {key === 'hasVettedContractors' ? '🔧 Get Vetted Contractors' :
                     key === 'hasMaintenance' ? '🛠️ Start Preventive Maintenance' :
                     key === 'hasInsurance' ? '📋 Fix Your Insurance Gaps' :
                     '📁 Build Your Documentation'}
                  </div>
                  {actionMap[key].map((action, i) => (
                    <div key={i} style={{ fontSize: 14, padding: '4px 0', color: '#cbd5e1′ }}>{action}</div>
                  ))}
                </div>
              ))
            )}
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>💰 Cost of Getting Fully Protected</h2>
          {costEstimates.map((item, i) => (
            <div key={i} style={{ padding: '12px 0', borderBottom: i < costEstimates.length - 1 ? '1px solid #1e3a5f' : 'none' }}>
              <div style={{ fontWeight: 600, marginBottom: 4, fontSize: 14 }}>{item.item}</div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 6, padding: '2px 8px', fontSize: 12, fontWeight: 700 }}>{item.cost}</span>
                <span style={{ fontSize: 13, color: '#94a3b8′ }}>→ {item.impact}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: '20px 24px', color: '#0A1628', textAlign: 'center' }}>
          <div style={{ fontSize: 20, marginBottom: 8 }}>🏡</div>
          <strong style={{ fontSize: 16 }}>ProLnk is the foundation of DFW homeowner peace of mind.</strong>
          <p style={{ margin: '8px 0 0', fontSize: 14 }}>Join the waitlist — free for homeowners. Get access to vetted pros before your next emergency.</p>
        </div>
      </div>
    </div>
  );
}
