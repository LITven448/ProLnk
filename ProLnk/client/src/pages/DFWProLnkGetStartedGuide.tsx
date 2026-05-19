import { useState } from 'react';

type UserType = 'homeowner' | 'renter' | 'investor' | 'none';

type Step = { icon: string; title: string; detail: string; action: string };

const stepsByType: Record<Exclude<UserType, 'none'>, Step[]> = {
  homeowner: [
    { icon: '📋', title: 'Join the ProLnk Waitlist', detail: 'Enter your name, DFW address, the service you need (HVAC, plumbing, roofing, etc.), and contact info. Takes 2 minutes.', action: 'Go to prolnk.io → "Get Quotes" → fill the homeowner form.' },
    { icon: '📧', title: 'Confirm Your Email', detail: 'You\’ll receive a confirmation email from ProLnk within 5 minutes. Click the link to activate your spot on the waitlist.', action: 'Check inbox (and spam) for your ProLnk welcome email.' },
    { icon: '📸', title: 'Prepare Your Home Info', detail: 'Gather: year built, square footage, foundation type (slab or pier/beam), recent repairs, and photos of the issue or area. Better info = better pro matches.', action: 'Take 3–5 photos of the service area. Note your home\’s age and any prior work.' },
    { icon: '🔔', title: 'Wait for Your First Match Notification', detail: 'When ProLnk matches you with a vetted DFW pro, you\’ll get an email and SMS with their profile, trade license, and reviews.', action: 'Make sure your phone number is correct on your profile for SMS notifications.' },
    { icon: '⭐', title: 'Rate Your Experience', detail: 'After your service is complete, ProLnk will send a rating request. Your honest review improves matches for every DFW homeowner in the network.', action: 'Respond to the post-service email with a 1–5 star rating and brief comment.' },
    { icon: '🏠', title: 'Claim Your Origination Rights', detail: 'Refer other DFW homeowners to ProLnk and earn permanent origination rights — a recurring share of platform fees every time ProLnk serves your referral\’s home.', action: 'Share your unique referral link from your ProLnk dashboard with DFW neighbors and friends.' },
  ],
  renter: [
    { icon: '📋', title: 'Join the ProLnk Waitlist as a Tenant', detail: 'If your landlord has authorized you to request services, add your address and the service needed. Note that you\’re a tenant in the form.', action: 'Go to prolnk.io → "Get Quotes" → select "I am a tenant" option.' },
    { icon: '📧', title: 'Confirm Your Email and Share With Your Landlord', detail: 'Confirm your email, then forward the ProLnk match notification to your landlord so they can approve the work and coordinate payment.', action: 'Forward your confirmation and future match emails to your property owner.' },
    { icon: '📞', title: 'Get Landlord Authorization Before Booking', detail: 'Texas law requires landlord consent for most service work. ProLnk will verify authorization before dispatching any pro to a rental property.', action: 'Have your landlord email or call ProLnk to confirm authorization.' },
    { icon: '🔔', title: 'Receive Your Match and Coordinate Access', detail: 'Once matched, coordinate access with the pro. DFW pros typically schedule within 48–72 hours of a confirmed match.', action: 'Be available for the scheduling call — most DFW pros call within 24 hours of match.' },
    { icon: '⭐', title: 'Rate the Pro After Service', detail: 'Your rating helps other DFW renters and landlords get better matches. Rate the pro\’s punctuality, quality, and professionalism.', action: 'Complete the post-service rating survey — takes 60 seconds.' },
    { icon: '🏠', title: 'Suggest ProLnk to Your Landlord', detail: 'If your landlord manages multiple properties, suggest they sign up as a property owner on ProLnk for streamlined service across all their DFW homes.', action: 'Share prolnk.io with your landlord and mention the multi-property management features.' },
  ],
  investor: [
    { icon: '📋', title: 'Add All Your DFW Properties to ProLnk', detail: 'Add each investment property separately on prolnk.io. ProLnk tracks service history, quotes, and match data per property — valuable for asset management.', action: 'Go to prolnk.io → "Property Owner" → add each address individually.' },
    { icon: '🔧', title: 'Tag Each Property\’s Trade Priorities', detail: 'For each property, specify which trades you need most (HVAC, roofing, plumbing) and your preferred service frequency. ProLnk optimizes matches by priority.', action: 'Complete the property profile for each address, including trade priorities and budget range.' },
    { icon: '🏗️', title: 'Use ARV and Repair Data for Investment Decisions', detail: 'ProLnk builds a service history log per property. Use this data to calculate true rehab costs vs. ARV for any DFW flip or buy-and-hold analysis.', action: 'Export your property service history from the ProLnk dashboard for underwriting and appraisals.' },
    { icon: '🔔', title: 'Set Up Batch Match Notifications', detail: 'For large portfolios, request batch match reports weekly instead of per-property notifications. ProLnk can summarize all active matches across your DFW portfolio.', action: 'Contact ProLnk support to configure weekly batch reporting for multi-property accounts.' },
    { icon: '💰', title: 'Earn Network Income on Referrals', detail: 'Refer other DFW investors, landlords, or homeowners to ProLnk and earn origination rights — a permanent recurring share of platform fees on every referral\’s matches.', action: 'Get your investor referral link from the ProLnk dashboard and share with your DFW real estate network.' },
    { icon: '📊', title: 'Build Your Home Health Vault Portfolio', detail: 'Every property on ProLnk contributes to the Home Health Vault — a permanent digital record of systems, service history, and condition. This increases resale value.', action: 'Complete full property profiles on ProLnk including systems, age, and known conditions for each DFW asset.' },
  ],
};

export default function DFWProLnkGetStartedGuide() {
  const [userType, setUserType] = useState<UserType>('none');
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = userType !== 'none' ? stepsByType[userType] : [];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🚀</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>Get Started with ProLnk</h1>
          <p style={{ color: '#94A3B8', margin: 0 }}>Step-by-step guide for DFW homeowners, renters, and investors</p>
        </div>

        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#CBD5E1', marginBottom: 14 }}>Which best describes you?</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {([['homeowner', '🏠', 'DFW Homeowner', 'I own my home and need services'], ['renter', '🏢', 'DFW Renter/Tenant', 'I rent and need to coordinate with my landlord'], ['investor', '💼', 'DFW Property Investor', 'I own investment properties or multiple homes']] as const).map(([type, emoji, label, sub]) => (
              <button key={type} onClick={() => { setUserType(type); setActiveStep(null); }} style={{ flex: '1 1 200px', padding: '16px 20px', borderRadius: 12, border: `2px solid ${userType === type ? '#F5E642' : '#1E3A5F'}`, background: userType === type ? 'rgba(245,230,66,0.08)' : '#0D2137', cursor: 'pointer', textAlign: 'left' }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{emoji}</div>
                <div style={{ fontWeight: 700, color: userType === type ? '#F5E642' : '#CBD5E1', fontSize: 15 }}>{label}</div>
                <div style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>{sub}</div>
              </button>
            ))}
          </div>
        </div>

        {userType !== 'none' && (
          <>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8, overflowX: 'auto', paddingBottom: 4 }}>
              {steps.map((_, i) => (
                <div key={i} style={{ flexShrink: 0, width: 32, height: 4, borderRadius: 4, background: i <= (activeStep ?? -1) ? '#F5E642' : '#1E3A5F', transition: 'background 0.3s' }} />
              ))}
            </div>
            <div style={{ color: '#64748B', fontSize: 12, marginBottom: 20 }}>Click a step to expand • {steps.length} steps total</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {steps.map((step, i) => (
                <div key={i} onClick={() => setActiveStep(activeStep === i ? null : i)} style={{ background: '#0D2137', border: `1px solid ${activeStep === i ? '#F5E642' : '#1E3A5F'}`, borderRadius: 12, padding: 20, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1E3A5F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{step.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: 11, color: '#64748B', fontWeight: 700, letterSpacing: 1 }}>STEP {i + 1}</div>
                          <div style={{ fontWeight: 700, color: '#fff', fontSize: 16 }}>{step.title}</div>
                        </div>
                        <span style={{ color: '#F5E642', fontSize: 18, flexShrink: 0 }}>{activeStep === i ? '▲' : '▼'}</span>
                      </div>
                    </div>
                  </div>
                  {activeStep === i && (
                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #1E3A5F' }}>
                      <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7, marginBottom: 14 }}>{step.detail}</div>
                      <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{ fontSize: 16 }}>⚡</span>
                        <div>
                          <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, letterSpacing: 0.5, marginBottom: 4 }}>ACTION</div>
                          <div style={{ color: '#94A3B8', fontSize: 13 }}>{step.action}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginTop: 28, background: 'rgba(245,230,66,0.08)', border: '1px solid #F5E642', borderRadius: 14, padding: 22, textAlign: 'center' }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>🏙️</div>
              <div style={{ fontWeight: 800, color: '#F5E642', fontSize: 17, marginBottom: 8 }}>Ready to get started?</div>
              <div style={{ color: '#94A3B8', fontSize: 14, marginBottom: 16 }}>ProLnk is live in DFW — join the waitlist today and be first matched when we launch full service.</div>
              <div style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '12px 28px', fontWeight: 800, fontSize: 15 }}>prolnk.io → Join Waitlist</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
