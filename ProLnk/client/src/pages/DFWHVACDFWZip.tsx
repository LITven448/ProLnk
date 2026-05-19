import { useState } from 'react';

type ZipProfile = {
  area: string;
  utility: string;
  permitNotes: string;
  hoaHvacRules: string;
  contractorAvailability: string;
  avgSystemCost: string;
  avgUtilityRate: string;
  topTip: string;
  color: string;
};

const zipProfiles: Record<string, ZipProfile> = {
  '75034': {
    area: 'Frisco — Central',
    utility: 'Oncor (transmission) + retail choice (TXU, Reliant, Green Mountain, etc.)',
    permitNotes: 'Frisco Building Inspections requires permit for all HVAC replacements. Plan 3-5 business days for permit issuance. Inspection required after completion.',
    hoaHvacRules: 'Many Frisco master-planned communities require HOA approval for condenser replacement or relocation. Screen placement rules often apply — condensers cannot be visible from street.',
    contractorAvailability: 'High — Frisco is a top DFW HVAC market. 40+ licensed contractors serve this zip. Summer emergency service available within 4-8 hours from most major contractors.',
    avgSystemCost: '$8,500-14,000 for 3-4 ton system replacement including labor and materials.',
    avgUtilityRate: 'Varies by retail provider — range $0.09-0.16/kWh. Shop rates annually at PowerToChoose.org.',
    topTip: 'Frisco HOA approval timelines can delay HVAC work 1-3 weeks in summer. Submit HOA request before the system fails if possible.',
    color: '#4ADE80',
  },
  '75024': {
    area: 'Plano — West (Legacy/Granite Park area)',
    utility: 'Oncor + retail choice',
    permitNotes: 'Plano Building Inspections — HVAC replacement permit required. Plano processes quickly (2-3 days typical). Licensed contractor must pull permit.',
    hoaHvacRules: 'Legacy area HOAs have specific condenser screening requirements. Some communities require metal or masonry screens. Check HOA before selecting condenser model.',
    contractorAvailability: 'Very high — Legacy corridor has strong contractor density. Premium contractors serve this zip. Prices tend 5-10% above DFW average.',
    avgSystemCost: '$9,000-15,000 for 3-4 ton system in West Plano.',
    avgUtilityRate: '$0.09-0.15/kWh depending on retail plan.',
    topTip: 'Legacy area homes tend toward larger cooling loads — verify Manual J before replacement. Original builder systems are often undersized for actual summer loads.',
    color: '#4ADE80',
  },
  '75040': {
    area: 'Garland — Northwest',
    utility: 'Oncor + retail choice',
    permitNotes: 'Garland Development Services — permit required. Garland has longer permit queues (4-7 days). Plan ahead for summer replacements.',
    hoaHvacRules: 'Most Garland residential areas have limited or no HOA coverage — fewer restrictions than Frisco or Plano suburbs.',
    contractorAvailability: 'Good — older home complexity reduces contractor willingness for low-margin projects. Get 3 bids; some contractors decline complex older home work.',
    avgSystemCost: '$7,000-12,000 for 3-ton replacement. Add $2,000-5,000 for needed insulation upgrade.',
    avgUtilityRate: '$0.09-0.15/kWh. High-SEER has strong ROI given poor insulation driving longer runtimes.',
    topTip: 'Garland insulation investment before HVAC replacement is critical. System efficiency gains multiply when the building envelope is tightened first.',
    color: '#F87171',
  },
  '75252': {
    area: 'Far North Dallas — Addison corridor',
    utility: 'Oncor + retail choice',
    permitNotes: 'City of Dallas Building Inspection (city jurisdiction). Dallas permit process runs 5-10 business days. Licensed contractor must apply.',
    hoaHvacRules: 'Far north Dallas has a mix of HOA and non-HOA properties. Many 1980s-90s neighborhoods have inactive or minimal HOAs. Verify before assuming rules apply.',
    contractorAvailability: 'Very high — proximity to major commercial corridor ensures strong contractor competition and availability.',
    avgSystemCost: '$8,000-13,000 for 3-4 ton replacement.',
    avgUtilityRate: '$0.09-0.16/kWh.',
    topTip: 'Far north Dallas gets high contractor traffic in summer — scheduling can be 1-2 weeks out for non-emergency work. Get on contractor maintenance lists for priority service.',
    color: '#FBBF24',
  },
  '76051': {
    area: 'Grapevine',
    utility: 'Oncor + retail choice.',
    permitNotes: 'Grapevine Building Services — responsive permit office. Typical 2-4 day turnaround. Both replacement and new installation require permits.',
    hoaHvacRules: 'Grapevine is mixed — some communities near DFW airport have HOA restrictions. Historic Main Street area has preservation requirements for exterior equipment.',
    contractorAvailability: 'Good — Grapevine is between Dallas and Fort Worth markets, drawing from both. Typically 2-5 days for non-emergency service.',
    avgSystemCost: '$7,500-12,500 for standard 3-ton replacement.',
    avgUtilityRate: '$0.09-0.15/kWh.',
    topTip: 'DFW Airport noise easements in some Grapevine zones affect roof modifications — verify any HVAC work requiring roof or attic penetrations complies with easement terms.',
    color: '#FBBF24',
  },
  '75006': {
    area: 'Carrollton — Belt Line area',
    utility: 'Oncor + retail choice',
    permitNotes: 'Carrollton Development Services — efficient permit office, typically 2-4 days. Carrollton requires permit for all HVAC replacements including same-for-same swaps.',
    hoaHvacRules: 'Most Carrollton residential areas have minimal HOA presence. 1970s-80s neighborhoods are typically unrestricted. Newer Tollway-area developments may have requirements.',
    contractorAvailability: 'Very good — central DFW location draws contractors from all directions. Competitive pricing.',
    avgSystemCost: '$7,000-11,500 for 3-ton system. Carrollton is generally below DFW premium areas.',
    avgUtilityRate: '$0.09-0.15/kWh.',
    topTip: 'Carrollton has many 1970s-80s homes with aging ductwork. Before replacing the system, get a duct blaster test — if leakage exceeds 20%, duct replacement ROI often exceeds equipment upgrade ROI.',
    color: '#4ADE80',
  },
  '75063': {
    area: 'Irving — Valley Ranch / Las Colinas',
    utility: 'Oncor + retail choice',
    permitNotes: 'Irving Building Inspections — permit required. 3-5 day typical turnaround. Las Colinas mixed-use areas may require additional review.',
    hoaHvacRules: 'Las Colinas has active HOAs. Valley Ranch community HOA has specific HVAC rules including condenser placement, noise limits, and screening requirements.',
    contractorAvailability: 'Good — Las Colinas condo projects require contractors with condo HVAC experience. Not all residential contractors are qualified for high-rise or condo work.',
    avgSystemCost: 'Single-family: $7,500-12,000. Las Colinas condo: $8,000-16,000 depending on unit access complexity.',
    avgUtilityRate: '$0.09-0.15/kWh.',
    topTip: 'Las Colinas condo HVAC replacement must coordinate with HOA on access hours, freight elevator scheduling, and equipment path through common areas. Budget 1-2 extra project days.',
    color: '#FBBF24',
  },
  '76010': {
    area: 'Arlington — Central',
    utility: 'Oncor or TXU Energy — verify your specific address. Utility territory boundary runs through Arlington.',
    permitNotes: 'Arlington Development Services — permit required. 3-6 day typical turnaround. Verify jurisdiction at permit application time.',
    hoaHvacRules: 'Central Arlington has low HOA density. Most residential properties here are unrestricted.',
    contractorAvailability: 'Good — Arlington draws from both Dallas and Fort Worth contractor pools. Mid-range pricing.',
    avgSystemCost: '$7,000-11,500 for 3-ton system.',
    avgUtilityRate: 'Oncor customers: $0.09-0.15/kWh. Verify your utility provider — the territory split in Arlington creates confusion on rebate eligibility.',
    topTip: 'Verify your utility provider at your specific Arlington address before selecting equipment — the Oncor/TXU boundary splits this zip code and different rebate programs apply.',
    color: '#FBBF24',
  },
  '75230': {
    area: 'Preston Hollow / North Dallas',
    utility: 'Oncor + retail choice',
    permitNotes: 'City of Dallas Building Inspection — longer permit timelines than suburbs (5-10 business days). Custom home renovations often require additional reviews.',
    hoaHvacRules: 'Preston Hollow has no mandatory HOA. Some deed-restricted neighborhoods have aesthetic requirements for exterior equipment. Verify deed restrictions before condenser replacement.',
    contractorAvailability: 'High — premium Dallas market. Contractors here tend toward higher-end work. Expect 10-15% premium over DFW average.',
    avgSystemCost: '$10,000-18,000 for large homes with 4-5 ton systems common here.',
    avgUtilityRate: '$0.09-0.16/kWh. High-efficiency equipment (SEER 20+) is worth evaluating given larger system sizes.',
    topTip: 'Preston Hollow large homes often have multiple systems — replace all units the same season if possible. Mixed-age system reliability drives repeated service calls, and same-trip replacements save on contractor mobilization costs.',
    color: '#4ADE80',
  },
  '76092': {
    area: 'Southlake',
    utility: 'Oncor + retail choice',
    permitNotes: 'Southlake Building Inspections — professional, efficient permit office. 2-4 day typical turnaround. Thorough inspection process.',
    hoaHvacRules: 'Southlake master-planned communities (Timarron, Stratford Park, others) have detailed HVAC rules — condenser screening required, equipment placement approval, noise ordinance compliance.',
    contractorAvailability: 'Good but selective — Southlake high-value homes require contractors willing to do premium work and follow HOA documentation requirements.',
    avgSystemCost: '$10,000-18,000 for larger Southlake homes.',
    avgUtilityRate: '$0.09-0.15/kWh. Southlake homes trend toward larger square footage — SEER 20+ equipment ROI is positive with larger systems.',
    topTip: 'Southlake HOA HVAC approval processes can take 2-4 weeks. Proactively replace aging systems before failure rather than waiting for emergency replacement under HOA time pressure.',
    color: '#4ADE80',
  },
};

const zipList = Object.keys(zipProfiles);

export default function DFWHVACDFWZip() {
  const [selectedZip, setSelectedZip] = useState('');
  const [customZip, setCustomZip] = useState('');
  const profile = selectedZip ? zipProfiles[selectedZip] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F4FD', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>📮 DFW HVAC Guide</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#FFFFFF', marginBottom: 8 }}>DFW Zip Code HVAC Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 24, lineHeight: 1.6 }}>
          Your DFW zip code determines utility rates, permit timelines, HOA HVAC rules, and contractor availability — all of which affect your project cost and timeline. Select your zip to see your local HVAC profile.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 24 }}>
          {[{ label: 'Utility Rates', desc: '$0.09-$0.16/kWh across DFW — varies by retail provider' }, { label: 'Permit Time', desc: '2-10 business days depending on city' }, { label: 'HOA Rules', desc: 'Condenser screening required in many master-planned communities' }].map(item => (
            <div key={item.label} style={{ background: '#0D2137', borderRadius: 10, padding: 14 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{item.label}</div>
              <div style={{ color: '#64748B', fontSize: 12, lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Select Your DFW Zip Code</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
            {zipList.map(zip => (
              <button key={zip} onClick={() => { setSelectedZip(zip); setCustomZip(''); }} style={{ padding: '8px 14px', borderRadius: 8, border: '2px solid', borderColor: selectedZip === zip ? '#F5E642' : '#1E3A5F', background: selectedZip === zip ? '#F5E642' : '#0D2137', color: selectedZip === zip ? '#0A1628' : '#E8F4FD', fontWeight: selectedZip === zip ? 700 : 400, cursor: 'pointer', fontSize: 14 }}>{zip}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input value={customZip} onChange={e => { setCustomZip(e.target.value); setSelectedZip(''); }} placeholder="Enter your zip code" style={{ background: '#0D2137', border: '2px solid #1E3A5F', borderRadius: 8, padding: '8px 14px', color: '#E8F4FD', fontSize: 14, flex: 1, outline: 'none' }} />
            <div style={{ color: '#64748B', fontSize: 12 }}>General DFW rules apply if zip not listed</div>
          </div>
        </div>
        {profile && (
          <div style={{ display: 'grid', gap: 14 }}>
            <div style={{ background: '#0D2137', border: `2px solid ${profile.color}`, borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF' }}>{selectedZip}</div>
              <div style={{ color: profile.color, fontWeight: 600, fontSize: 15, marginTop: 2, marginBottom: 12 }}>{profile.area}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[{ label: 'Utility', value: profile.utility }, { label: 'Avg Rate', value: profile.avgUtilityRate }, { label: 'System Cost Range', value: profile.avgSystemCost }, { label: 'Contractor Access', value: profile.contractorAvailability.split(' — ')[0] }].map(item => (
                  <div key={item.label} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                    <div style={{ color: '#64748B', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>{item.label}</div>
                    <div style={{ color: '#CBD5E1', fontSize: 13 }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#1E2A3A', border: '1px solid #2563EB', borderRadius: 12, padding: 18 }}>
              <div style={{ fontWeight: 700, color: '#93C5FD', marginBottom: 6 }}>Permit Requirements</div>
              <div style={{ color: '#BFDBFE', fontSize: 14, lineHeight: 1.6 }}>{profile.permitNotes}</div>
            </div>
            <div style={{ background: '#2A1E2A', border: '1px solid #7C3AED', borderRadius: 12, padding: 18 }}>
              <div style={{ fontWeight: 700, color: '#C4B5FD', marginBottom: 6 }}>HOA HVAC Rules</div>
              <div style={{ color: '#DDD6FE', fontSize: 14, lineHeight: 1.6 }}>{profile.hoaHvacRules}</div>
            </div>
            <div style={{ background: '#1A2A1A', border: '1px solid #22543D', borderRadius: 12, padding: 18 }}>
              <div style={{ fontWeight: 700, color: '#4ADE80', marginBottom: 6 }}>Pro Tip for {selectedZip}</div>
              <div style={{ color: '#BBF7D0', fontSize: 14, lineHeight: 1.6 }}>{profile.topTip}</div>
            </div>
          </div>
        )}
        {!profile && !customZip && (
          <div style={{ background: '#0D2137', borderRadius: 12, padding: 24, textAlign: 'center', color: '#64748B' }}>Select your DFW zip code above to see utility rates, permit timelines, HOA rules, and contractor availability</div>
        )}
        {!profile && customZip && customZip.length === 5 && (
          <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 20 }}>
            <div style={{ fontWeight: 700, color: '#93C5FD', marginBottom: 10 }}>General DFW HVAC Profile for {customZip}</div>
            <div style={{ display: 'grid', gap: 10 }}>
              {[
                { label: 'Utility', value: 'Oncor electricity transmission with retail provider choice. Shop rates at PowerToChoose.org — can vary $50-200/month for same usage.' },
                { label: 'Permit', value: 'HVAC permit required in all DFW cities. Turnaround: 2-7 business days. Your contractor must pull the permit.' },
                { label: 'HOA', value: 'Check your HOA declaration before scheduling HVAC work. Common rules: condenser screening required, written approval for replacements.' },
                { label: 'System Cost', value: '$7,000-14,000 for 3-4 ton system replacement. Get 3 bids — DFW HVAC market is competitive.' },
              ].map(item => (
                <div key={item.label} style={{ background: '#0D2137', borderRadius: 8, padding: 14 }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{item.label}</div>
                  <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.5 }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
