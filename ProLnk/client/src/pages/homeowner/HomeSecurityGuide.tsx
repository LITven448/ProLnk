import { useState } from 'react';

const systems = [
  {
    name: 'ADT', type: 'Professional Monitored', monthly: '$28–$60/mo', equipment: '$199–$600+',
    contract: '3-year', pros: 'Longest track record, fastest response, nationwide', cons: 'Long contract, higher cost, professional install required',
    rating: 4, bestFor: 'Homeowners wanting maximum protection with pro install'
  },
  {
    name: 'Ring Alarm', type: 'Self-Monitored / Pro Option', monthly: '$10–$20/mo', equipment: '$200–$400',
    contract: 'Month-to-month', pros: 'Amazon ecosystem integration, easy DIY, affordable', cons: 'Limited pro monitoring features, ring doorbell sells your data',
    rating: 4, bestFor: 'Tech-comfortable renters and homeowners on a budget'
  },
  {
    name: 'SimpliSafe', type: 'Professional Monitored', monthly: '$18–$28/mo', equipment: '$150–$500',
    contract: 'Month-to-month', pros: 'No contract, fast setup, excellent monitoring rates', cons: 'Limited smart home integration vs. Ring/ADT',
    rating: 5, bestFor: 'Best overall value — no contract, solid monitoring'
  },
  {
    name: 'Vivint', type: 'Professional Monitored', monthly: '$30–$60/mo', equipment: '$0 (financed)',
    contract: '3–5 years', pros: 'Best smart home integration, pro install, own hardware', cons: 'Long contract, high total cost, door-to-door sales tactics',
    rating: 3, bestFor: 'New construction, smart home enthusiasts'
  },
];

const quizQuestions = [
  {
    id: 'budget',
    question: '💰 What\’s your monthly security budget?',
    options: [{ label: 'Under $15/mo', value: 'low' }, { label: '$15–$35/mo', value: 'mid' }, { label: '$35+/mo (full protection)', value: 'high' }]
  },
  {
    id: 'own',
    question: '🏠 Do you own or rent your home?',
    options: [{ label: 'Own', value: 'own' }, { label: 'Rent', value: 'rent' }]
  },
  {
    id: 'tech',
    question: '📱 How tech-comfortable are you?',
    options: [{ label: 'I want someone to handle it', value: 'low' }, { label: 'I can set up a device', value: 'mid' }, { label: 'I love smart home tech', value: 'high' }]
  },
];

export default function HomeSecurityGuide() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendation, setRecommendation] = useState('');

  const setAnswer = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const recommend = () => {
    const { budget, own, tech } = answers;
    if (!budget || !own || !tech) { setRecommendation('Please answer all questions above.'); return; }
    if (budget === 'low' || own === 'rent') {
      setRecommendation('🏆 Best fit: Ring Alarm — Affordable, no contract, easy DIY, and perfect for renters. Add professional monitoring for $10/mo if you want it.');
    } else if (budget === 'mid' && tech !== 'high') {
      setRecommendation('🏆 Best fit: SimpliSafe — Best value for homeowners. No contract, professional monitoring, fast setup. Top rated for DFW homeowners.');
    } else if (budget === 'high' && tech === 'high') {
      setRecommendation('🏆 Best fit: Vivint — Best smart home integration with professional install. High cost but unmatched automation capabilities.');
    } else if (budget === 'high' && tech !== 'high') {
      setRecommendation('🏆 Best fit: ADT — Industry leader with professional install, fastest response times, and best track record. Worth the premium for full hands-off protection.');
    } else {
      setRecommendation('🏆 Best fit: SimpliSafe — Flexible, no contract, solid monitoring. A safe middle-ground for most DFW homeowners.');
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🔒</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
            DFW Home Security Guide
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>
            Monitored vs. DIY, top systems compared, DFW crime context & which system is right for you
          </p>
        </div>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '1rem' }}>📊 DFW Crime Context</h2>
          <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              {[
                ['Property crime rate', 'Dallas: 40/1,000 residents (above national avg)', '#fca5a5'],
                ['Home burglary', '~60% occur during daylight hours (9am–3pm)', '#f59e0b'],
                ['Deterrence', 'Visible security signage reduces risk ~60%', '#86efac'],
                ['Response time', 'DFW police average 8–15 min for priority calls', '#60a5fa'],
              ].map(([label, value, color]) => (
                <div key={label} style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem', borderLeft: `3px solid ${color}` }}>
                  <div style={{ color: color as string, fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.3rem' }}>{label}</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>{value}</div>
                </div>
              ))}
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', marginTop: '1rem' }}>Sources: DFW PD crime statistics, FBI UCR 2024</p>
          </div>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '1rem' }}>⚖️ Monitored vs. Self-Monitored vs. DIY</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            {[
              {
                type: 'Professionally Monitored', icon: '🛡️', color: '#22c55e',
                pros: ['24/7 dispatch if alarm triggers', 'Works even if you\’re unreachable', 'Faster police response tier'],
                cons: ['Monthly fee required', 'Long contracts possible'],
              },
              {
                type: 'Self-Monitored', icon: '📱', color: '#F5E642',
                pros: ['No monthly fee', 'App alerts only you', 'Total control'],
                cons: ['You must respond to alerts', 'No professional backup', 'Useless if phone dead'],
              },
              {
                type: 'DIY Only', icon: '🔧', color: '#60a5fa',
                pros: ['Lowest cost', 'No subscriptions', 'Cameras + locks only'],
                cons: ['No alarm response', 'Cameras deter, don\’t respond', 'Most risk'],
              },
            ].map(m => (
              <div key={m.type} style={{ background: '#1e2d45', borderRadius: '10px', padding: '1.2rem', border: `1px solid ${m.color}` }}>
                <div style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>{m.icon}</div>
                <div style={{ fontWeight: 700, color: m.color, marginBottom: '0.75rem' }}>{m.type}</div>
                <div style={{ marginBottom: '0.5rem' }}>
                  {m.pros.map(p => <div key={p} style={{ color: '#86efac', fontSize: '0.82rem', marginBottom: '0.2rem' }}>✓ {p}</div>)}
                </div>
                {m.cons.map(c => <div key={c} style={{ color: '#fca5a5', fontSize: '0.82rem', marginBottom: '0.2rem' }}>✗ {c}</div>)}
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '1rem' }}>🔍 Top Systems Compared</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {systems.map(s => (
              <div key={s.name} style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div>
                    <span style={{ fontWeight: 700, color: '#F5E642', fontSize: '1.1rem' }}>{s.name}</span>
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem', marginLeft: '0.75rem' }}>{s.type}</span>
                  </div>
                  <div style={{ fontSize: '1rem' }}>{'⭐'.repeat(s.rating)}{'☆'.repeat(5 - s.rating)}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  {[
                    ['Monthly', s.monthly, '#60a5fa'],
                    ['Equipment', s.equipment, '#F5E642'],
                    ['Contract', s.contract, '#94a3b8'],
                  ].map(([label, val, color]) => (
                    <div key={label} style={{ background: '#0A1628', borderRadius: '6px', padding: '0.6rem' }}>
                      <div style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 600, marginBottom: '0.15rem' }}>{label}</div>
                      <div style={{ color: color as string, fontWeight: 600, fontSize: '0.85rem' }}>{val}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div style={{ color: '#86efac', fontSize: '0.82rem' }}>✓ {s.pros}</div>
                  <div style={{ color: '#fca5a5', fontSize: '0.82rem' }}>✗ {s.cons}</div>
                </div>
                <div style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>🎯 {s.bestFor}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '1rem' }}>🔌 Smart Home Integration</h2>
          <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                ['Ring', 'Amazon Alexa native — best for Echo/Alexa households'],
                ['SimpliSafe', 'Works with Alexa, Google Home, Apple Watch alerts'],
                ['Vivint', 'Best overall smart home (Z-Wave locks, lights, thermostat automation)'],
                ['ADT', 'Google integration, ADT+ app, some Alexa support'],
              ].map(([brand, note]) => (
                <div key={brand} style={{ display: 'flex', gap: '0.75rem' }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, minWidth: '90px' }}>{brand}:</span>
                  <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '1rem' }}>🤔 Which System Is Right for Me?</h2>
          <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.5rem' }}>
            {quizQuestions.map(q => (
              <div key={q.id} style={{ marginBottom: '1.2rem' }}>
                <div style={{ color: '#cbd5e1', fontWeight: 600, marginBottom: '0.6rem' }}>{q.question}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {q.options.map(opt => (
                    <button key={opt.value} onClick={() => setAnswer(q.id, opt.value)}
                      style={{
                        padding: '0.4rem 1rem', borderRadius: '20px', border: '1px solid',
                        borderColor: answers[q.id] === opt.value ? '#F5E642′ : '#2d3f58',
                        background: answers[q.id] === opt.value ? '#F5E642′ : ’transparent',
                        color: answers[q.id] === opt.value ? '#0A1628′ : '#cbd5e1',
                        cursor: 'pointer', fontSize: '0.85rem',
                        fontWeight: answers[q.id] === opt.value ? 700 : 400,
                      }}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={recommend}
              style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '0.6rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>
              Get My Recommendation
            </button>
            {recommendation && (
              <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: '8px', padding: '1rem', color: '#F5E642', fontWeight: 600, fontSize: '0.95rem', lineHeight: 1.6 }}>
                {recommendation}
              </div>
            )}
          </div>
        </section>

        <div style={{ textAlign: 'center', padding: '1.5rem', background: '#1e2d45', borderRadius: '12px' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔒</div>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.25rem' }}>Find vetted DFW security installers through ProLnk</p>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Licensed, background-checked pros who know DFW security needs</p>
        </div>
      </div>
    </div>
  );
}
