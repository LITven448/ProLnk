import { useState } from 'react';

const whyDFW = [
  { emoji: '🌆', reason: 'Size & Growth', detail: 'DFW adds more households per year than almost any metro in America. That growth creates constant demand for home services — and constant opportunity for abuse.' },
  { emoji: '🤝', reason: 'Community Trust', detail: 'DFW has a culture of neighbor-to-neighbor referrals and community pride. ProLnk\’s trust-based model fits naturally into how DFW residents already think about home decisions.' },
  { emoji: '🔨', reason: 'Contractor Density', detail: 'DFW has one of the largest concentrations of home service contractors in the US — giving ProLnk the supply-side depth to match demand from day one.' },
  { emoji: '📊', reason: 'Market Signal', detail: 'If ProLnk works in DFW — with its mix of new builds, older homes, extreme weather, and economic diversity — it works everywhere.' },
];

const timeMessages: Record<string, string> = {
  early: 'You\’ve just started exploring ProLnk. Thank you for your curiosity — that\’s where every great decision begins. You\’ve already learned more than most DFW homeowners know.',
  invested: 'You\’ve spent real time with us. That investment tells us you care about your home and your decisions. Thank you for taking this seriously — it means the world to the ProLnk team.',
  committed: 'You\’ve gone deep. You\’re exactly the kind of informed, engaged DFW homeowner ProLnk was built for. Thank you for trusting us with your time. We won\’t waste it.',
  founding: 'You\’ve read everything. You are a founding-level believer in what ProLnk is building. Thank you. Sincerely. You represent what early DFW trust means to us — and we carry that responsibility seriously.',
};

export default function DFWProLnkThankyouPage() {
  const [timeRange, setTimeRange] = useState('early');

  const getTimeRange = (val: number) => {
    if (val < 5) return 'early';
    if (val < 15) return 'invested';
    if (val < 30) return 'committed';
    return 'founding';
  };

  const [sliderVal, setSliderVal] = useState(0);

  const handleSlider = (val: number) => {
    setSliderVal(val);
    setTimeRange(getTimeRange(val));
  };

  const timeLabels: Record<string, string> = {
    early: 'Just getting started',
    invested: 'Spent real time here',
    committed: 'Read deeply',
    founding: 'Read everything',
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>💛</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            Thank You, DFW
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', lineHeight: 1.6 }}>
            A sincere thank you to DFW homeowners and partners who trust ProLnk — and what that trust means to us.
          </p>
        </div>

        <div style={{ background: '#132040', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>⏱️ How long have you been reading with us?</h2>
          <input
            type="range" min={0} max={40} value={sliderVal}
            onChange={e => handleSlider(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#F5E642', marginBottom: 16 }}
          />
          <div style={{ textAlign: 'center', color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 20 }}>
            {timeLabels[timeRange]}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642' }}>
            <p style={{ color: '#CBD5E1', lineHeight: 1.8, fontSize: 16, margin: 0 }}>{timeMessages[timeRange]}</p>
          </div>
        </div>

        <div style={{ background: '#132040', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🏘️ Why DFW Is Our Launch Market</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {whyDFW.map((w, i) => (
              <div key={i} style={{ display: 'flex', gap: 16 }}>
                <div style={{ fontSize: 28 }}>{w.emoji}</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{w.reason}</div>
                  <p style={{ color: '#CBD5E1', lineHeight: 1.6, margin: 0, fontSize: 14 }}>{w.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#132040', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>🚀 What Comes Next</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7 }}>
            Early believers get founding member status — priority access when matching goes live, recognition in the ProLnk community, and a permanent place in the story of how DFW home services changed. The waitlist closes at 500 applications and 5,000 homes.
          </p>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 16, padding: 28, textAlign: 'center' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0A1628', marginBottom: 10 }}>Thank You — Now Join Us</h2>
          <p style={{ color: '#132040', fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
            The best way to honor the trust you've invested in reading this far is to take the next step.
          </p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            Join the Waitlist →
          </button>
        </div>

      </div>
    </div>
  );
}
