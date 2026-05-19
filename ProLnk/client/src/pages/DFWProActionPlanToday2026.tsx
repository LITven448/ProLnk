import { useState } from 'react';

export default function DFWProActionPlanToday2026() {
  const [trade, setTrade] = useState('');
  const [experience, setExperience] = useState('');

  const plans: Record<string, Record<string, string[]>> = {
    hvac: {
      new: [
        '🔗 Apply for ProLnk Charter NOW — only 500 pro slots, HVAC goes fast',
        '📋 Complete your ProLnk profile: license number, service area zip codes, specialties',
        '⭐ Request a Google review from your last 3 satisfied customers today',
        '📍 Set your DFW service area — target 20-mile radius for best lead density',
        '👥 Share ProLnk with 2 HVAC contacts — their Charter = your network income',
        '📸 Upload 3 job photos to your ProLnk profile before your first lead',
      ],
      experienced: [
        '🔗 Charter tier = $149/mo forever, locked before waitlist closes',
        '💼 Assign your Charter slot to your business entity for tax advantages',
        '👥 Recruit 2–3 trade contacts — Stream 2 income starts immediately',
        '📊 Set your HomeHealth Vault territory — permanent origination rights',
        '⭐ Import existing reviews to boost ProLnk profile ranking',
        '📞 Set lead response target: DFW homeowners expect <2 hour callback',
      ],
    },
    plumbing: {
      new: [
        '🔗 Plumbing is DFW’s #1 lead category — apply for Charter immediately',
        '🪛 List all services: leak repair, water heater, drain clearing, repipe',
        '📍 DFW service area tip: North Dallas and Frisco have highest density',
        '⭐ One strong review beats ten weak ones — ask your best customer first',
        '👥 Share with an HVAC contact — cross-trade referrals are gold in ProLnk',
        '📞 Set up your ProLnk callback number — leads go cold in DFW heat',
      ],
      experienced: [
        '🔗 Charter locks your rate before the next price increase — apply today',
        '💧 Emergency plumbing leads = highest match value in ProLnk system',
        '👥 Build your 4-level network: 10 pros = $400+/mo in network income',
        '🏦 Add DFW properties to HomeHealth Vault = permanent origination override',
        '📊 Target commercial and rental properties for recurring lead pipeline',
        '⭐ Request reviews post-job via text link — 3x higher completion rate',
      ],
    },
    electrical: {
      new: [
        '🔗 Apply for ProLnk Charter — electrical license required for verification',
        '⚡ List panel upgrades, EV charger installs, and smart home — high demand in DFW',
        '📍 Allen, McKinney, Prosper = highest new construction electrical demand',
        '⭐ Get one verified review from a recent panel or EV charger job',
        '👥 Partner with a plumber in ProLnk — trade referrals earn Stream 4 income',
        '📋 Upload your TECL license number for faster ProLnk verification',
      ],
      experienced: [
        '🔗 Charter tier + network income = highest ROI for established electricians',
        '⚡ EV charger installs trending hard in DFW — list as primary specialty',
        '👥 Recruit 3 apprentices or new electricians — Stream 2 earns on their jobs',
        '📊 Set your service radius to 25 miles — DFW traffic makes 30+ miles costly',
        '🏦 HomeHealth Vault origination rights = passive income on every DFW home you serve',
        '💼 Business entity enrollment protects Charter rights during ownership changes',
      ],
    },
    general: {
      new: [
        '🔗 Apply for Charter today — general contractors have widest lead range in ProLnk',
        '🔨 List all sub-trades you manage: roofing, painting, flooring, demo',
        '⭐ One detailed review with before/after photos drives 5x more leads',
        '📍 DFW leads heaviest in Frisco, Allen, McKinney, Celina — set area accordingly',
        '👥 Recruit subs into ProLnk — their subscriptions earn you Stream 3 income',
        '📸 Job photos are the #1 conversion factor for GC leads in ProLnk',
      ],
      experienced: [
        '🔗 Charter + 4-level network = recurring income on top of project revenue',
        '💼 Enroll your GC entity — protects Charter rights across all job sites',
        '👥 Your sub network is worth building: 10 subs = $1,200+/mo in overrides',
        '📊 ProLnk analytics show which zip codes generate repeat business',
        '🏦 Origination rights on DFW properties = long-term passive income stream',
        '⭐ Video testimonials from homeowners = highest lead conversion in DFW market',
      ],
    },
  };

  const getSteps = () => {
    if (!trade || !experience) return null;
    return plans[trade]?.[experience] ?? null;
  };

  const steps = getSteps();

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', padding: '32px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🔧</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>
            DFW Service Pro Action Plan 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>What DFW pros should do RIGHT NOW to lock in Charter and start earning</p>
        </div>

        <div style={{ display: 'grid', gap: 20, marginBottom: 32 }}>
          <div>
            <label style={{ color: '#F5E642', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 10 }}>YOUR TRADE</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { v: 'hvac', l: '🌡️ HVAC' },
                { v: 'plumbing', l: '🪛 Plumbing' },
                { v: 'electrical', l: '⚡ Electrical' },
                { v: 'general', l: '🔨 General Contractor' },
              ].map(o => (
                <button key={o.v} onClick={() => setTrade(o.v)}
                  style={{ padding: '14px', borderRadius: 8, border: '2px solid', cursor: 'pointer',
                    borderColor: trade === o.v ? '#F5E642' : '#1e3a5f',
                    backgroundColor: trade === o.v ? '#F5E64220' : '#0d1f3c',
                    color: '#fff', fontSize: 14 }}>
                  {o.l}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ color: '#F5E642', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 10 }}>YOUR EXPERIENCE LEVEL</label>
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { v: 'new', l: '🌱 Starting Out (< 3 years)' },
                { v: 'experienced', l: '💼 Experienced (3+ years)' },
              ].map(o => (
                <button key={o.v} onClick={() => setExperience(o.v)}
                  style={{ flex: 1, padding: '14px', borderRadius: 8, border: '2px solid', cursor: 'pointer',
                    borderColor: experience === o.v ? '#F5E642' : '#1e3a5f',
                    backgroundColor: experience === o.v ? '#F5E64220' : '#0d1f3c',
                    color: '#fff', fontSize: 14 }}>
                  {o.l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {steps && (
          <div style={{ backgroundColor: '#0d1f3c', borderRadius: 12, padding: 24, border: '1px solid #F5E64240' }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>⚡ Your Priority Action List</h2>
            {steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: i < steps.length - 1 ? '1px solid #1e3a5f' : 'none' }}>
                <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 24 }}>{i + 1}.</span>
                <span style={{ fontSize: 15, lineHeight: 1.6 }}>{step}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 32, backgroundColor: '#F5E64215', borderRadius: 12, padding: 24, textAlign: 'center', border: '1px solid #F5E64240' }}>
          <div style={{ fontSize: 32 }}>🚀</div>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, margin: '8px 0 4px' }}>500 Charter Slots — Filling Fast</p>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>$149/mo locked for life. Highest lead priority. Maximum network income potential.</p>
        </div>
      </div>
    </div>
  );
}
