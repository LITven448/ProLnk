import { useState } from 'react';

const DIAGNOSIS: Record<string, Record<string, { issue: string; approach: string; estimate: string }>> = {
  pre1970: {
    lowpressure: { issue: 'Corroded Galvanized Pipes', approach: 'Full repipe with PEX or copper. Galvanized pipes from this era are typically 50+ years old and corroding internally.', estimate: '$3,500–$8,000 full repipe (most cost-effective long-term)' },
    discolored: { issue: 'Advanced Galvanized Corrosion', approach: 'Water color confirms internal pipe rust. Staged repipe starting from main line saves budget vs emergency replacement.', estimate: '$800–$2,500 for main line + staged room repipe' },
    slow: { issue: 'Mineral Buildup + Root Intrusion', approach: 'Camera inspection first — roots common in older DFW lots. Hydro-jetting before committing to replacement saves money.', estimate: '$150–$400 camera + jetting vs $1,500–$4,000 line replacement' },
    leak: { issue: 'Joint Failure at Fittings', approach: 'Galvanized threaded joints fail at age. Targeted fitting replacement buys time before full repipe budget is ready.', estimate: '$200–$600 per fitting repair' },
  },
  '1970to1990': {
    lowpressure: { issue: 'Partial Galvanized + Copper Mix', approach: 'Mixed-era homes have inconsistent pipe materials. Pressure test isolates the corroded section for targeted repair.', estimate: '$300–$900 section replacement' },
    discolored: { issue: 'Early Galvanized Sections Still in Use', approach: 'Sellers often updated copper in visible areas but left galvanized in walls. Inspection traces the source.', estimate: '$500–$1,800 targeted section repipe' },
    slow: { issue: 'Grease Buildup + Aging ABS Drain Lines', approach: 'Drain snake + enzyme treatment first. If recurring, ABS plastic from this era gets brittle and may need section replacement.', estimate: '$95–$250 clearing; $400–$1,200 section replacement' },
    leak: { issue: 'Copper Pinhole Leaks', approach: 'Common in 1970s–80s copper due to water chemistry. PEX sleeve repair is affordable alternative to full repipe.', estimate: '$150–$500 per pinhole repair' },
  },
  post1990: {
    lowpressure: { issue: 'Pressure Regulator or Fixture Issue', approach: 'Newer homes rarely have pipe issues — check PRV (pressure reducing valve) and aerators before any major work.', estimate: '$150–$350 PRV replacement' },
    discolored: { issue: 'Water Heater Anode or Municipal Issue', approach: 'Modern pipes don\’t cause discoloration — check water heater anode rod and call city to rule out main line issue.', estimate: '$80–$200 anode rod replacement' },
    slow: { issue: 'Grease or Hair Clog', approach: 'Simple drain clearing — no pipe concern at this age. Enzyme treatment monthly prevents recurrence.', estimate: '$75–$150 clearing service' },
    leak: { issue: 'Fitting or Connection Failure', approach: 'Isolated repair at the connection point. Warranty may still cover if home is under 10 years old.', estimate: '$100–$400 fitting repair' },
  },
};

export default function DFWPlumberBalchSprings() {
  const [homeAge, setHomeAge] = useState('');
  const [symptom, setSymptom] = useState('');
  const [result, setResult] = useState<{ issue: string; approach: string; estimate: string } | null>(null);

  function diagnose() {
    if (homeAge && symptom) setResult(DIAGNOSIS[homeAge][symptom]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0F2040 100%)', padding: '48px 24px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: '36px', marginBottom: '8px' }}>🔧💧</div>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#F5E642', margin: '0 0 8px' }}>Balch Springs TX Plumbers</h1>
        <p style={{ fontSize: '16px', color: '#A8B8D0', margin: '0', maxWidth: '560px', marginInline: 'auto' }}>
          Working-Class Dallas Suburb Specialists — honest diagnosis, cost-effective solutions
        </p>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid #1A3060' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', margin: '0 0 16px' }}>🏘️ Balch Springs Plumbing Reality</h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            {[
              { icon: '🪣', label: 'Galvanized Pipe Era', desc: 'Homes built before 1985 in Balch Springs frequently have original galvanized steel pipes — corrosion is the #1 plumbing issue in this zip code' },
              { icon: '💵', label: 'Value-First Community', desc: 'Balch Springs homeowners deserve honest options — not upsells. Staged repairs and targeted fixes often make more sense than full replacements' },
              { icon: '🌱', label: 'Clay Soil Movement', desc: 'Dallas-area clay soil shifts seasonally, stressing pipe joints and causing slow leaks that go undetected for months' },
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
          <h2 style={{ color: '#F5E642', fontSize: '18px', margin: '0 0 16px' }}>🔍 Symptom + Home Age Diagnosis Tool</h2>
          <div style={{ display: 'grid', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', color: '#A8B8D0', fontSize: '13px', marginBottom: '6px' }}>Home Age</label>
              <select
                value={homeAge}
                onChange={(e) => { setHomeAge(e.target.value); setResult(null); }}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #2A4080', borderRadius: '8px', padding: '10px 12px', color: '#E8EDF5', fontSize: '14px' }}
              >
                <option value="">Select era...</option>
                <option value="pre1970">Before 1970 — likely galvanized throughout</option>
                <option value="1970to1990">1970–1990 — mixed pipe era</option>
                <option value="post1990">After 1990 — modern materials</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#A8B8D0', fontSize: '13px', marginBottom: '6px' }}>Main Symptom</label>
              <select
                value={symptom}
                onChange={(e) => { setSymptom(e.target.value); setResult(null); }}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #2A4080', borderRadius: '8px', padding: '10px 12px', color: '#E8EDF5', fontSize: '14px' }}
              >
                <option value="">Select symptom...</option>
                <option value="lowpressure">Low water pressure throughout home</option>
                <option value="discolored">Discolored or rust-colored water</option>
                <option value="slow">Slow drains in multiple fixtures</option>
                <option value="leak">Visible leak or water damage</option>
              </select>
            </div>
          </div>
          <button
            onClick={diagnose}
            disabled={!homeAge || !symptom}
            style={{ width: '100%', background: homeAge && symptom ? '#F5E642' : '#2A4080', color: homeAge && symptom ? '#0A1628' : '#4A6080', border: 'none', borderRadius: '8px', padding: '12px', fontSize: '15px', fontWeight: '700', cursor: homeAge && symptom ? 'pointer' : 'not-allowed' }}
          >
            Diagnose My Plumbing Issue
          </button>
          {result && (
            <div style={{ marginTop: '16px', background: '#0A1628', borderRadius: '8px', padding: '16px', border: '1px solid #F5E642' }}>
              <div style={{ fontWeight: '800', fontSize: '16px', color: '#F5E642', marginBottom: '6px' }}>Likely Issue: {result.issue}</div>
              <div style={{ color: '#E8EDF5', fontSize: '13px', marginBottom: '10px' }}>{result.approach}</div>
              <div style={{ background: '#0F2040', borderRadius: '6px', padding: '10px', color: '#A8B8D0', fontSize: '12px', borderLeft: '3px solid #F5E642' }}>
                💵 Typical Cost: {result.estimate}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔧</div>
          <h3 style={{ color: '#0A1628', fontSize: '18px', fontWeight: '800', margin: '0 0 6px' }}>Get an Honest Balch Springs Plumbing Quote</h3>
          <p style={{ color: '#1A3060', fontSize: '13px', margin: '0 0 16px' }}>No upsells. Fair pricing. Same-day service available for urgent issues.</p>
          <a href="/pro-signup" style={{ display: 'inline-block', background: '#0A1628', color: '#F5E642', padding: '12px 32px', borderRadius: '8px', fontWeight: '700', fontSize: '14px', textDecoration: 'none' }}>
            Connect with a Balch Springs Plumber →
          </a>
        </div>
      </div>
    </div>
  );
}
