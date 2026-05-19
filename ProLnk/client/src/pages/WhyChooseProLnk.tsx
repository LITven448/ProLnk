import { useState } from 'react';

const CONCERNS = [
  { label: 'Finding trustworthy contractors', benefit: 'Every ProLnk partner passes background checks, license verification, and insurance confirmation before they can receive a single match.' },
  { label: 'Getting ripped off on pricing', benefit: 'We send you 3 competing quotes so you can compare — no pressure, no single-vendor lock-in.' },
  { label: 'Waiting days for a callback', benefit: 'Our match engine contacts 3 vetted pros within minutes. Most homeowners have quotes within 24 hours.' },
  { label: 'Paying referral or lead fees', benefit: 'ProLnk is 100% free for homeowners. Contractors pay for the platform — you never pay a cent.' },
  { label: 'Contractor accountability', benefit: 'Every partner has a performance score. Repeated complaints trigger automatic suspension from the network.' },
  { label: 'Emergency or weekend service', benefit: 'Our on-demand queue routes urgent jobs to the first available vetted partner, including evenings and weekends.' },
  { label: 'Getting value beyond the job', benefit: "Refer a neighbor and earn from ProLnk's income system — homeowners can build a real referral income stream." },
];

const REASONS = [
  { emoji: '🔍', title: 'Pre-Screened Contractors Only', desc: 'No random listings. Every professional in our network has passed background checks, license verification, and insurance review before they ever see your job.' },
  { emoji: '💰', title: 'Zero Cost for Homeowners', desc: 'ProLnk is completely free for homeowners. Contractors pay to participate — your only job is to pick the best quote.' },
  { emoji: '⚡', title: '3 Quotes in 24 Hours', desc: 'Submit your job and our match engine routes it to 3 pre-screened pros. Most homeowners have competing quotes the same day.' },
  { emoji: '📋', title: 'Partner Accountability System', desc: 'Every partner has a live performance score. Low ratings, missed appointments, and complaints trigger automatic review and suspension.' },
  { emoji: '🛡️', title: 'Background Checks Standard', desc: 'Criminal background, sex offender registry, and identity verification run on every applicant — not optional, not skippable.' },
  { emoji: '🕐', title: 'On-Demand for Urgent Jobs', desc: 'Burst pipe? AC failure? Our urgent queue connects you to the first available vetted pro, including nights and weekends.' },
  { emoji: '🤝', title: 'Earn by Referring Neighbors', desc: 'ProLnk pays homeowners who refer other homeowners or contractors. Turn your network into a real recurring income stream.' },
];

export default function WhyChooseProLnk() {
  const [selectedConcern, setSelectedConcern] = useState(0);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', color: '#0A1628', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏠</div>
          <h1 style={{ fontSize: 34, fontWeight: 800, color: '#0A1628', marginBottom: 12 }}>Why ProLnk?</h1>
          <p style={{ fontSize: 18, color: '#4B5563' }}>7 Reasons DFW Homeowners Choose Us Over Everyone Else</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 56 }}>
          {REASONS.map((r, i) => (
            <div key={i} style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{r.emoji}</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0A1628', marginBottom: 8 }}>{r.title}</h3>
              <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>{r.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: 36, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0A1628', marginBottom: 8 }}>What's Your Biggest Concern?</h2>
          <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 24 }}>Select your concern and see exactly how ProLnk addresses it.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
            {CONCERNS.map((c, i) => (
              <button key={i} onClick={() => setSelectedConcern(i)}
                style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: selectedConcern === i ? '#F5E642' : '#E5E7EB',
                  backgroundColor: selectedConcern === i ? '#F5E642' : '#fff', color: '#0A1628', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                {c.label}
              </button>
            ))}
          </div>
          <div style={{ backgroundColor: '#F9FAFB', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
            <p style={{ fontSize: 15, color: '#0A1628', lineHeight: 1.7, margin: 0 }}>{CONCERNS[selectedConcern].benefit}</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 48, backgroundColor: '#0A1628', borderRadius: 16, padding: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Ready to Get 3 Free Quotes?</h2>
          <p style={{ color: '#CBD5E1', fontSize: 15, marginBottom: 24 }}>Join the ProLnk homeowner waitlist — no commitment, no cost.</p>
          <button style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, padding: '14px 36px', borderRadius: 10, border: 'none', cursor: 'pointer' }}>
            Join Free Waitlist ✓
          </button>
        </div>
      </div>
    </div>
  );
}
