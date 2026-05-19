import { useState } from 'react';

const READINESS: Record<string, Record<string, { status: string; recommendation: string; discount: string }>> = {
  pre1980: {
    yes: { status: 'Replacement Priority', recommendation: 'System likely 20+ years old — immediate efficiency gains available. Tech employee benefit may cover 15–25% of replacement cost.', discount: 'Telecom Corridor employee discount: up to $400 off installation' },
    no: { status: 'Replacement Recommended', recommendation: 'Older home with aging system — high energy bills and frequent repairs signal replacement time.', discount: 'Standard financing available — 0% for 18 months' },
  },
  '1980to2000': {
    yes: { status: 'Assessment Recommended', recommendation: 'Mid-era system in mid-era home. If over 12 years old, replacement math often favors new. Tech discount helps.', discount: 'Telecom Corridor employee discount: up to $250 off service or installation' },
    no: { status: 'Tune-Up Stage', recommendation: 'Seasonal maintenance and filter upgrades extend life. Plan for replacement within 5 years.', discount: 'Maintenance plan: $129/year — includes 2 annual visits' },
  },
  post2000: {
    yes: { status: 'Efficiency Upgrade Eligible', recommendation: 'Newer home but employer benefits may cover smart thermostat, duct sealing, or mini-split additions.', discount: 'Telecom Corridor employee discount: smart thermostat installation included' },
    no: { status: 'Well Positioned', recommendation: 'Newer system in newer home — focus on air quality and smart controls for comfort optimization.', discount: 'Air quality add-ons: UV purifiers starting at $299 installed' },
  },
};

export default function DFWHVACRichardson() {
  const [homeEra, setHomeEra] = useState('');
  const [isTechEmployee, setIsTechEmployee] = useState('');
  const [result, setResult] = useState<{ status: string; recommendation: string; discount: string } | null>(null);

  function assess() {
    if (homeEra && isTechEmployee) setResult(READINESS[homeEra][isTechEmployee]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0F2040 100%)', padding: '48px 24px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: '36px', marginBottom: '8px' }}>❄️💼</div>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#F5E642', margin: '0 0 8px' }}>Richardson TX HVAC</h1>
        <p style={{ fontSize: '16px', color: '#A8B8D0', margin: '0', maxWidth: '560px', marginInline: 'auto' }}>
          Tech Corridor Specialists — serving Telecom Corridor employers and Richardson homeowners
        </p>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid #1A3060' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', margin: '0 0 16px' }}>🏙️ Richardson's HVAC Landscape</h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            {[
              { icon: '📡', label: 'Telecom Corridor Hub', desc: 'AT&T, Cisco, Samsung, Ericsson — major employers offer home improvement benefits and contractor partnerships' },
              { icon: '🏘️', label: '1960s–1990s Housing Mix', desc: '40–60 year old homes dominate older Richardson neighborhoods, often with original or outdated ductwork' },
              { icon: '🌡️', label: 'DFW Heat Extremes', desc: '100°F+ summers push aging systems to failure — Richardson\’s commercial density also raises ambient temps' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '24px', flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: '700', color: '#E8EDF5', fontSize: '14px' }}>{item.label}</div>
                  <div style={{ color: '#8898AA', fontSize: '13px', marginTop: '2px' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid #1A3060' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', margin: '0 0 16px' }}>🔧 System Age + Replacement Readiness Check</h2>
          <div style={{ display: 'grid', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', color: '#A8B8D0', fontSize: '13px', marginBottom: '6px' }}>When was your home built?</label>
              <select
                value={homeEra}
                onChange={(e) => { setHomeEra(e.target.value); setResult(null); }}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #2A4080', borderRadius: '8px', padding: '10px 12px', color: '#E8EDF5', fontSize: '14px' }}
              >
                <option value="">Select era...</option>
                <option value="pre1980">Before 1980 (likely original ductwork)</option>
                <option value="1980to2000">1980–2000 (2nd or 3rd system)</option>
                <option value="post2000">After 2000 (modern construction)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#A8B8D0', fontSize: '13px', marginBottom: '6px' }}>Are you employed by a Telecom Corridor company?</label>
              <select
                value={isTechEmployee}
                onChange={(e) => { setIsTechEmployee(e.target.value); setResult(null); }}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #2A4080', borderRadius: '8px', padding: '10px 12px', color: '#E8EDF5', fontSize: '14px' }}
              >
                <option value="">Select...</option>
                <option value="yes">Yes — AT&T, Cisco, Samsung, Ericsson, or similar</option>
                <option value="no">No — independent or other employer</option>
              </select>
            </div>
          </div>
          <button
            onClick={assess}
            disabled={!homeEra || !isTechEmployee}
            style={{ width: '100%', background: homeEra && isTechEmployee ? '#F5E642' : '#2A4080', color: homeEra && isTechEmployee ? '#0A1628' : '#4A6080', border: 'none', borderRadius: '8px', padding: '12px', fontSize: '15px', fontWeight: '700', cursor: homeEra && isTechEmployee ? 'pointer' : 'not-allowed' }}
          >
            Check My System Readiness
          </button>
          {result && (
            <div style={{ marginTop: '16px', background: '#0A1628', borderRadius: '8px', padding: '16px', border: '1px solid #F5E642' }}>
              <div style={{ fontWeight: '800', fontSize: '16px', color: '#F5E642', marginBottom: '6px' }}>{result.status}</div>
              <div style={{ color: '#E8EDF5', fontSize: '13px', marginBottom: '10px' }}>{result.recommendation}</div>
              <div style={{ background: '#0F2040', borderRadius: '6px', padding: '10px', color: '#A8B8D0', fontSize: '12px', borderLeft: '3px solid #F5E642' }}>
                💰 {result.discount}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>❄️</div>
          <h3 style={{ color: '#0A1628', fontSize: '18px', fontWeight: '800', margin: '0 0 6px' }}>Book a Richardson HVAC Assessment</h3>
          <p style={{ color: '#1A3060', fontSize: '13px', margin: '0 0 16px' }}>NATE-certified techs. Employer discount verification. Next-day availability.</p>
          <a href="/pro-signup" style={{ display: 'inline-block', background: '#0A1628', color: '#F5E642', padding: '12px 32px', borderRadius: '8px', fontWeight: '700', fontSize: '14px', textDecoration: 'none' }}>
            Connect with a Richardson HVAC Pro →
          </a>
        </div>
      </div>
    </div>
  );
}
