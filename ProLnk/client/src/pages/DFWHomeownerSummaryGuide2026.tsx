import { useState } from 'react';

const homeownerTypes = [
  { id: 'new', label: '🏠 New Homeowner', tips: ['Start a Home Health Vault profile before your first repair', 'Water your foundation within 18" of slab daily in summer', 'Schedule HVAC tune-up every March before heat hits', 'Use ProLnk to get 3 bids before hiring any contractor', 'Document every repair with photos — protects resale value'] },
  { id: 'established', label: '🏡 Established Owner', tips: ['Audit your foundation watering system this month', 'Check HVAC filter — replace if it’s been over 30 days', 'Review your Home Health Vault — add recent repairs', 'Vet your next contractor on ProLnk before calling anyone', 'Pre-season HVAC service saves $800+ in emergency calls'] },
  { id: 'investor', label: '💼 Property Investor', tips: ['Add all properties to Home Health Vault for portfolio health view', 'ProLnk Charter pros handle multi-property portfolios', 'Foundation checks on all DFW properties every 2 years', 'HVAC age over 12 years = plan a replacement budget now', 'Hail season: check roofs every April before insurance windows close'] },
];

const mustKnow = [
  { icon: '💧', title: 'Foundation Watering Is Not Optional', body: 'DFW clay soil shrinks in drought and swells in rain. Consistent moisture = stable foundation. Ignore this and pay $15,000+.' },
  { icon: '❄️', title: 'HVAC Tune-Up Every March', body: 'Before 100°F days hit, service your system. A $150 tune-up prevents a $4,000 emergency compressor replacement in July.' },
  { icon: '⛈️', title: 'Hail Season Prep (April–June)', body: 'DFW averages 10+ hail events per year. Check your roof in early April. Delays cost you your insurance window.' },
  { icon: '🔍', title: 'Vet Every Contractor on ProLnk', body: '70% of DFW homeowner regret stories start with hiring off a flyer. ProLnk Charter pros are vetted, reviewed, and accountable.' },
  { icon: '🏦', title: 'Home Health Vault Protects Resale', body: 'Homes with documented repair histories sell 8–12% faster and command higher offers. Start your Vault today — it’s free.' },
];

export default function DFWHomeownerSummaryGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = homeownerTypes.find(h => h.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>DFW Homeowner Complete Summary Guide 2026</h1>
          <p style={{ color: '#8A9BB5', fontSize: 15 }}>The definitive reference for DFW homeowners — everything you need in one page</p>
        </div>

        <div style={{ marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>5 Things Every DFW Homeowner Must Know</h2>
          {mustKnow.map((item, i) => (
            <div key={i} style={{ background: '#111D35', border: '1px solid #1E3A5F', borderRadius: 12, padding: 20, marginBottom: 12, display: 'flex', gap: 16 }}>
              <span style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ color: '#E8F0FF', fontWeight: 600, marginBottom: 6 }}>{item.title}</div>
                <div style={{ color: '#8A9BB5', fontSize: 14, lineHeight: 1.6 }}>{item.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Your Personalized Top 5 Guide</h2>
          <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
            {homeownerTypes.map(h => (
              <button key={h.id} onClick={() => setSelected(h.id === selected ? null : h.id)}
                style={{ background: selected === h.id ? '#F5E642' : '#111D35', color: selected === h.id ? '#0A1628' : '#E8F0FF', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 18px', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {h.label}
              </button>
            ))}
          </div>
          {active && (
            <div style={{ background: '#111D35', border: '1px solid #F5E642', borderRadius: 12, padding: 24 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>Your Top 5 — {active.label}</div>
              {active.tips.map((tip, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span style={{ color: '#E8F0FF', fontSize: 14 }}>{tip}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40, padding: 24, background: '#111D35', borderRadius: 12, border: '1px solid #1E3A5F' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Ready to protect your home?</div>
          <div style={{ color: '#8A9BB5', fontSize: 14 }}>Join ProLnk and start your Home Health Vault — free for DFW homeowners</div>
        </div>
      </div>
    </div>
  );
}