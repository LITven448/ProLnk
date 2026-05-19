import { useState } from 'react';

const situations = [
  { id: 'new', label: 'New homeowner in DFW', summary: 'Welcome to DFW. Your HVAC will run 6–8 months of the year. Budget $150–$220/mo in utilities and schedule a tune-up within your first 30 days. ProLnk connects you to vetted pros instantly.' },
  { id: 'replace', label: 'My system needs replacement', summary: 'Average DFW replacement runs $6,500–$12,000. A 16–18 SEER2 system pays back in 5–7 years. Get 3 quotes through ProLnk — our pros compete for your business, driving your price down.' },
  { id: 'repair', label: 'I have a breakdown right now', summary: 'In DFW summer heat, a broken AC is an emergency. ProLnk same-day dispatch connects you to a licensed tech in under 2 hours. Average repair cost: $180–$650. Do not wait.' },
  { id: 'maintenance', label: 'I want to stay ahead of problems', summary: 'Two tune-ups per year (spring + fall) cost $120–$200 total and extend system life by 3–5 years. ProLnk maintenance plans lock in priority scheduling before the summer rush.' },
];

export default function DFWHVACFinalSummaryComplete() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = situations.find(s => s.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>DFW HVAC Final Summary</h1>
          <p style={{ fontSize: 18, color: '#94a3b8', lineHeight: 1.6 }}>
            3,200+ pages of DFW HVAC knowledge distilled into your complete action guide.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 40 }}>
          {[
            { icon: '🌡️', label: 'Key Fact', value: 'DFW averages 65 days above 100°F — the most HVAC-stressful metro in the US' },
            { icon: '💰', label: 'Key Cost', value: 'Annual HVAC ownership cost in DFW: $1,800–$3,200 including utilities, maintenance, and reserves' },
            { icon: '⚡', label: 'Key Action', value: 'Schedule your spring tune-up before May 1. After that, wait times exceed 2 weeks' },
            { icon: '🤝', label: 'ProLnk Role', value: 'Match you to licensed, background-checked DFW HVAC pros in under 60 seconds — free for homeowners' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#F5E642', textTransform: 'uppercase', marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.5 }}>{item.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>Your Complete HVAC Summary</h2>
          <p style={{ color: '#94a3b8', marginBottom: 24 }}>Select your situation for a personalized summary:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)} style={{ background: selected === s.id ? '#F5E642' : '#1e3a5f', color: selected === s.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 10, padding: '14px 20px', cursor: 'pointer', textAlign: 'left', fontSize: 15, fontWeight: 600, transition: 'all 0.2s' }}>
                {s.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: 14, color: '#e2e8f0', lineHeight: 1.7 }}>{result.summary}</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', background: '#F5E642', borderRadius: 12, padding: '24px 32px' }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#0A1628', marginBottom: 8 }}>Ready to Act?</div>
          <div style={{ fontSize: 15, color: '#0A1628' }}>Join ProLnk's waitlist — DFW homeowners get priority access</div>
        </div>
      </div>
    </div>
  );
}
