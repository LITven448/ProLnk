import { useState } from 'react';

export default function DFWProLnkSummerCampaign2026B() {
  const [urgency, setUrgency] = useState<string | null>(null);

  const urgencyGuides: Record<string, { icon: string; headline: string; points: string[] }> = {
    'AC not cooling': {
      icon: '🥵',
      headline: 'AC Out in DFW Summer — Every Hour Counts',
      points: [
        'Charter pros have 110°F track record — they handle DFW peak summer load',
        'First-to-accept system means Charter pros respond faster than storm chasers',
        'License verified before first job — not after something goes wrong',
        'Every visit auto-logged in your Home Health Vault for warranty tracking',
      ],
    },
    'AC running but hot': {
      icon: '🌡️',
      headline: 'Partially Working AC is a Silent Cost Multiplier',
      points: [
        'Charter pros diagnose refrigerant, coil, and airflow issues with documented history',
        'Vault record shows prior service — no guessing what the last tech did',
        'ProLnk match routes you to the pro who has done this model before',
        'Storm chasers have no record of your system — Charter pros do',
      ],
    },
    'Planning ahead': {
      icon: '📅',
      headline: 'Pre-Summer Tune-Up: The Smart DFW Move',
      points: [
        'Book a Charter pro now before July emergency surge pricing hits',
        'Annual tune-up logged in Vault — increases home resale value',
        'Charter pros prioritize waitlist homeowners over walk-in requests',
        'One ProLnk match now prevents three emergency calls in August',
      ],
    },
    'New to DFW': {
      icon: '🏡',
      headline: 'New to DFW? Start Your Home Health Vault Now',
      points: [
        'First ProLnk job starts your Home Health Vault from day one',
        'Charter pros familiar with DFW construction — slab foundations, attic HVAC placement',
        'Vault records follow your home forever — even if you sell',
        'Free homeowner signup at prolnk.io/homeowner-signup',
      ],
    },
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>☀️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>
            ProLnk Summer 2026 — DFW HVAC Season
          </h1>
          <p style={{ color: '#9BAECF', fontSize: 16, margin: 0 }}>
            Charter pros are the only safe bet when DFW hits 110°F
          </p>
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <p style={{ color: '#CBD5E1', margin: 0 }}>
            DFW summers break HVAC systems. Homeowners who wait get un-vetted storm chasers. ProLnk Charter pros are licensed, local, and ready — with your home's full service history in the Vault.
          </p>
        </div>

        <p style={{ color: '#CBD5E1', marginBottom: 16, fontSize: 15 }}>What's your HVAC situation?</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
          {Object.keys(urgencyGuides).map(u => (
            <button key={u} onClick={() => setUrgency(u)} style={{
              padding: '11px 16px', borderRadius: 10, border: '2px solid',
              borderColor: urgency === u ? '#F5E642′ : '#1E3A5F',
              background: urgency === u ? '#F5E642′ : '#0D1F3C',
              color: urgency === u ? '#0A1628′ : '#fff',
              cursor: 'pointer', fontWeight: 700, fontSize: 13
            }}>{u}</button>
          ))}
        </div>

        {urgency && urgencyGuides[urgency] && (
          <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>{urgencyGuides[urgency].icon}</div>
            <h3 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>{urgencyGuides[urgency].headline}</h3>
            {urgencyGuides[urgency].points.map(pt => (
              <div key={pt} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <span style={{ color: '#F5E642', flexShrink: 0 }}>✓</span>
                <span style={{ color: '#CBD5E1', fontSize: 14 }}>{pt}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 10, padding: '16px 20px', textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 6 }}>Don't wait for the July 110°F day.</div>
          <div style={{ color: '#0A1628', fontSize: 14 }}>Homeowners: prolnk.io/homeowner-signup (free) | Pros: prolnk.io/pro-signup (Charter closes at 500)</div>
        </div>
      </div>
    </div>
  );
}
