import { useState } from 'react';

const issueTypes = [
  { key: 'burst', label: 'Sudden pipe burst or rupture' },
  { key: 'slowleak', label: 'Slow leak discovered over time' },
  { key: 'freeze', label: 'Freeze damage (winter storm)' },
  { key: 'poly', label: 'Polybutylene pipe failure' },
  { key: 'sewer', label: 'Sewer line backup or failure' },
  { key: 'supply', label: 'Supply line failure (washing machine, toilet)' },
];

const coverage: Record<string, { verdict: string; docs: string[]; strategy: string }> = {
  burst: { verdict: 'Likely Covered — sudden and accidental', docs: ['Date/time of discovery', 'Photos before any repairs', 'Plumber invoice and written cause statement', 'Water meter readings if available'], strategy: 'File immediately. Mitigate damage to avoid claim denial for neglect. Get repair estimate before adjuster visits.' },
  slowleak: { verdict: 'Often Denied — considered maintenance failure', docs: ['Documentation of when you first noticed', 'Any prior repair attempts', 'Plumber assessment of leak duration'], strategy: 'Difficult claim. Some policies cover resulting damage even if pipe is excluded. Argue sudden discovery. Consult public adjuster.' },
  freeze: { verdict: 'Usually Covered — if home was properly heated', docs: ['Proof home was heated (thermostat records)', 'Utility bills showing winter usage', 'Photos of burst location', 'Winterization records if vacant'], strategy: 'Texas freeze events (2021, etc.) created special claim processes. Document heat was maintained — key defense against denial.' },
  poly: { verdict: 'Often Excluded — known defective material', docs: ['Home inspection report noting poly pipes', 'Disclosure documents from purchase', 'Plumber ID of pipe material'], strategy: 'Poly failure is typically excluded as a known defect. Focus claim on resulting water damage, not the pipe itself. Consider disclosure liability if seller knew.' },
  sewer: { verdict: 'Excluded from standard policy — requires add-on', docs: ['Camera inspection report', 'Plumber diagnosis', 'City sewer vs. private lateral determination'], strategy: 'Sewer backup riders cost -150/yr — buy now if you lack one. Check if city owns the line from street to property line.' },
  supply: { verdict: 'Likely Covered — sudden and accidental', docs: ['Photos of failed supply line', 'Appliance age documentation', 'Water damage extent documentation', 'Mitigation steps taken'], strategy: 'Supply line failures are common DFW claims. Document mitigation immediately — shut off water, dry out space — to show you acted responsibly.' },
};

export default function DFWPipeInsuranceGuide() {
  const [issue, setIssue] = useState('');
  const [result, setResult] = useState<null | typeof coverage[string]>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>💧</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Pipe & Water Damage Insurance Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 24 }}>DFW homeowners file more water damage claims than almost any metro in the US. Knowing what is and is not covered — before you call your adjuster — can save thousands.</p>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>🧊 DFW-Specific Risks</h2>
          {[['Polybutylene pipes', 'Gray plastic pipes installed 1978-1995. Common in DFW suburbs. Prone to failure — must disclose at sale.'],['Freeze events', 'February 2021 showed DFW homes are not built for hard freezes. Many policies have freeze exclusions for unheated spaces.'],['Soil movement', 'Expansive clay soil puts constant stress on pipes — accelerates joint failures over time.'],['Slab foundations', 'Most DFW homes are slab — pipe breaks under slab require cutting concrete and are expensive to repair.']].map(([t, d]) => (
            <div key={t} style={{ borderBottom: '1px solid #1E2D4A', padding: '10px 0′ }}>
              <div style={{ fontWeight: 600, color: '#F5E642′ }}>{t}</div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>{d}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📋 Coverage Checker</h2>
          <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>What type of pipe issue do you have?</label>
          <div style={{ display: 'grid', gap: 10, marginBottom: 16 }}>
            {issueTypes.map(it => (
              <button key={it.key} onClick={() => { setIssue(it.key); setResult(coverage[it.key]); }} style={{ background: issue === it.key ? '#F5E642′ : '#0A1628', color: issue === it.key ? '#0A1628' : '#E8EDF5', border: '1px solid #1E2D4A', borderRadius: 8, padding: '12px 16px', cursor: ’pointer', fontSize: 14, textAlign: 'left', fontWeight: issue === it.key ? 700 : 400 }}>{it.label}</button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ background: '#111D35', borderRadius: 12, padding: 24 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, marginBottom: 16, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>Coverage Verdict</div>
              <div style={{ fontSize: 16 }}>{result.verdict}</div>
            </div>
            <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>📁 Documentation to Gather Now</h3>
            <ul style={{ paddingLeft: 20, marginBottom: 16 }}>{result.docs.map((d, i) => <li key={i} style={{ marginBottom: 6, color: '#E8EDF5′ }}>{d}</li>)}</ul>
            <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>🎯 Claim Strategy</h3>
            <p style={{ color: '#E8EDF5', lineHeight: 1.6 }}>{result.strategy}</p>
          </div>
        )}
      </div>
    </div>
  );
}
