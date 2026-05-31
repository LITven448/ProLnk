import { useState } from 'react';

const homeownerTypes = [
  { label: 'New Homeowner (recent purchase)', key: 'new' },
  { label: 'Long-term Owner (5+ years)', key: 'longterm' },
  { label: 'Landlord / Investor', key: 'landlord' },
  { label: 'HOA Community Member', key: 'hoa' },
];

const strategies: Record<string, { approach: string; talkingPoints: string[]; originationValue: string }> = {
  new: {
    approach: 'Lead with peace of mind. New homeowners are overwhelmed — position ProLnk as their home control center.',
    talkingPoints: [
      'Free to join, no spam — you only hear from us when you need work done',
      'Vetted contractors only — background checked and rated',
      'Your home data stays private and helps you track maintenance history',
      'First project match is free, no commitment',
    ],
    originationValue: '$25-$60/year in origination rights — new homeowners tend to have high first-year project volume.',
  },
  longterm: {
    approach: 'Lead with savings and quality. Long-term owners have been burned by bad contractors and overpriced bids.',
    talkingPoints: [
      'Get 3 competitive bids without making a single phone call',
      'Contractor ratings are verified, not just Yelp reviews',
      'Your Home Health Vault tracks every project done on your home',
      'Completely free for homeowners, always',
    ],
    originationValue: '$15-$40/year in origination rights — steady maintenance projects year-round.',
  },
  landlord: {
    approach: 'Lead with efficiency and volume. Landlords hate coordinating repairs across multiple properties.',
    talkingPoints: [
      'Manage all your properties in one dashboard',
      'Contractors who specialize in rental-ready turnarounds',
      'Automated maintenance requests from tenants',
      'Bulk project history for tax documentation',
    ],
    originationValue: '$80-$200/year per property in origination rights — landlords generate 3-5x average project volume.',
  },
  hoa: {
    approach: 'Lead with community value. HOA members influence neighbors — one signup can cascade to dozens.',
    talkingPoints: [
      'Contractors who know HOA compliance requirements',
      'Community project coordination for common areas',
      'Neighborhood pricing leverage — more homes = better rates',
      'Share your Home Health Vault data with HOA for neighborhood health reports',
    ],
    originationValue: '$40-$120/year in origination rights — HOA members often refer 3-8 neighbors.',
  },
};

export default function PartnerHomeownerAcquisition() {
  const [selected, setSelected] = useState(\'');
  const result = selected ? strategies[selected] : null;

  return (
    <div style={{ backgroundColor: \'#F9FAFB', minHeight: \'100vh', fontFamily: \'system-ui, sans-serif', color: \'#0A1628' }}>
      <div style={{ maxWidth: 800, margin: \'0 auto', padding: \'40px 20px' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🏠</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: \'#0A1628', marginBottom: 8 }}>Homeowner Acquisition Playbook</h1>
          <p style={{ color: \'#4B5563', fontSize: 16, lineHeight: 1.6 }}>
            Homeowners are the fuel of your ProLnk network. Every home you originate earns you permanent origination rights - a slice of every project that home generates, forever.
          </p>
        </div>

        <div style={{ backgroundColor: \'#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: \'1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📍 Best Places to Meet DFW Homeowners</h2>
          <div style={{ display: \'grid', gridTemplateColumns: \'1fr 1fr', gap: 12 }}>
            {[\'Home Depot / Lowes on weekends', \'HOA board meetings', \'Neighborhood Facebook groups', \'Church community events', \'Real estate open houses', \'Local farmers markets', \'School fundraisers', \'Nextdoor neighborhood posts'].map(place => (
              <div key={place} style={{ display: \'flex', alignItems: \'center', gap: 8, padding: \'10px 14px', backgroundColor: \'#F3F4F6', borderRadius: 8, fontSize: 14 }}>
                <span>📌</span> {place}
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: \'#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: \'1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>💬 Conversations That Work</h2>
          <div style={{ backgroundColor: \'#F0FDF4', borderRadius: 8, padding: 16, marginBottom: 12, borderLeft: \'4px solid #22C55E' }}>
            <p style={{ fontSize: 14, fontStyle: \'italic', color: \'#15803D', margin: 0 }}>
              Hey, do you ever struggle finding a good contractor who actually shows up? I help homeowners get matched with vetted pros - totally free for them. Takes 2 minutes to sign up.
            </p>
          </div>
          <div style={{ backgroundColor: \'#FEF9C3', borderRadius: 8, padding: 16, borderLeft: \'4px solid #EAB308' }}>
            <p style={{ fontSize: 14, fontStyle: \'italic', color: \'#854D0E', margin: 0 }}>
              I am building a network of homeowners in [neighborhood] who want access to trusted contractors without the runaround. There is no cost and no obligation - I just get a small credit when your home gets matched with a pro.
            </p>
          </div>
        </div>

        <div style={{ backgroundColor: \'#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: \'1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🎯 Strategy by Homeowner Type</h2>
          <div style={{ display: \'flex', flexDirection: \'column', gap: 8, marginBottom: 20 }}>
            {homeownerTypes.map(t => (
              <button
                key={t.key}
                onClick={() => setSelected(t.key)}
                style={{
                  padding: \'12px 16px', borderRadius: 8, border: \'2px solid',
                  borderColor: selected === t.key ? \'#F5E642' : \'#E5E7EB',
                  backgroundColor: selected === t.key ? \'#FEFCE8' : \'#F9FAFB',
                  fontWeight: selected === t.key ? 700 : 400,
                  cursor: \'pointer', textAlign: \'left', fontSize: 14, color: \'#0A1628',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ backgroundColor: \'#F0F9FF', borderRadius: 10, padding: 20, borderLeft: \'4px solid #0EA5E9' }}>
              <p style={{ fontWeight: 700, marginBottom: 8, color: \'#0369A1' }}>Best Approach</p>
              <p style={{ fontSize: 14, marginBottom: 16, color: \'#0A1628' }}>{result.approach}</p>
              <p style={{ fontWeight: 700, marginBottom: 8, color: \'#0369A1' }}>Talking Points</p>
              <ul style={{ paddingLeft: 20, margin: \'0 0 16px 0' }}>
                {result.talkingPoints.map(pt => <li key={pt} style={{ fontSize: 14, marginBottom: 6 }}>{pt}</li>)}
              </ul>
              <div style={{ backgroundColor: \'#FEFCE8', borderRadius: 8, padding: 12, borderLeft: \'3px solid #F5E642' }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: \'#0A1628', margin: \'0 0 4px 0' }}>💰 Origination Rights Value</p>
                <p style={{ fontSize: 13, color: \'#374151', margin: 0 }}>{result.originationValue}</p>
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: \'#0A1628', borderRadius: 12, padding: 24, color: \'#fff' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🔑 The Origination Rights Incentive</h2>
          <p style={{ fontSize: 14, color: \'#D1D5DB', lineHeight: 1.7, margin: 0 }}>
            When you bring a homeowner onto ProLnk and register their home, you earn <span style={{ color: \'#F5E642', fontWeight: 700 }}>permanent origination rights</span> to that address. Every time that home generates a matched project - now or 10 years from now - you earn a share.
          </p>
        </div>
      </div>
    </div>
  );
}
