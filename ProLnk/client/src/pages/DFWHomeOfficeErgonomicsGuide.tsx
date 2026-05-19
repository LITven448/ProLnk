import { useState } from 'react';

type WorkType = 'Video Calls / Client Facing' | 'Deep Focus / Writing' | 'Creative / Design' | 'Hybrid / Mixed';
type Budget = 'Under $1,000′ | '$1,000–$3,000' | '$3,000–$7,000' | '$7,000+';

function getRecommendations(workType: WorkType, budget: Budget) {
  const priorities: string[] = [];
  let savings = '';

  if (budget === 'Under $1,000') {
    priorities.push('🪑 Ergonomic chair (Herman Miller Aeron used ~$400) — biggest ROI item');
    priorities.push('💡 Ring light + diffuser for video calls ($60–$120)');
    priorities.push('📺 Monitor arm to raise screen to eye level ($40–$80)');
    if (workType.includes('Video')) priorities.push('🎤 USB cardioid microphone — eliminates background noise ($80–$150)');
    savings = '$2,400/yr in reduced chiropractic visits for back-pain sufferers';
  } else if (budget === '$1,000–$3,000') {
    priorities.push('🦾 Standing desk converter or motorized base ($350–$1,200)');
    priorities.push('🎙️ Acoustic panels for 2 walls — eliminates DFW open-floor-plan echo ($200–$600)');
    priorities.push('❄️ Portable AC or mini split zone for afternoon heat control ($600–$1,800)');
    priorities.push('⌨️ Split ergonomic keyboard + trackball to prevent RSI ($120–$250)');
    savings = '$4,800/yr in productivity (fewer headaches, better focus, less fatigue)';
  } else if (budget === '$3,000–$7,000') {
    priorities.push('🖥️ Full motorized standing desk (Uplift or equivalent) $700–$1,400');
    priorities.push('🔊 Full acoustic treatment: wall panels + bass traps + ceiling cloud');
    priorities.push('🌡️ Dedicated HVAC zone or mini-split (DFW afternoons hit 90°F+ indoors)');
    priorities.push('💡 Circadian lighting system — boosts alertness 30% in afternoon slumps');
    priorities.push('🪟 Motorized blackout blind for afternoon sun glare control');
    savings = '$8,000/yr combined: healthcare costs, productivity gains, reduced turnover';
  } else {
    priorities.push('🏗️ Full room acoustic build-out with dedicated HVAC zone');
    priorities.push('🖥️ Dual or ultrawide curved monitor setup on articulating arms');
    priorities.push('🔇 Soundproof door seal + acoustic window insert');
    priorities.push('📹 4K webcam + professional lighting grid');
    priorities.push('🌐 Dedicated fiber line or mesh node for office-only bandwidth');
    savings = '$12,000+/yr for remote professionals billing hourly or by project';
  }
  return { priorities, savings };
}

export default function DFWHomeOfficeErgonomicsGuide() {
  const [workType, setWorkType] = useState<WorkType | ''>('');
  const [budget, setBudget] = useState<Budget | ''>('');
  const [showResults, setShowResults] = useState(false);

  const ready = workType && budget;
  const result = ready ? getRecommendations(workType as WorkType, budget as Budget) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '60px 24px 40px', borderBottom: '3px solid #F5E642′ }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>💼</div>
          <h1 style={{ fontSize: 38, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Home Office Ergonomics Guide</h1>
          <p style={{ fontSize: 18, color: '#A8B8D0', maxWidth: 640 }}>
            DFW remote workers face unique challenges: brutal afternoon heat, open floor plans with poor acoustics, and long video call days. Here's how to fix all three.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, margin: '40px 0′ }}>
          {[
            { icon: '🌡️', title: 'DFW Afternoon Heat', body: 'South- and west-facing offices can hit 85°F by 3 PM even with central AC. A mini-split or dedicated zone is the single biggest productivity upgrade for DFW remote workers. Cost: $1,500–$3,500 installed.' },
            { icon: '🔊', title: 'Open Floor Plan Acoustics', body: 'DFW\’s modern open-plan homes create echo chambers that sound terrible on calls. Two panels of 2″ rockwool acoustic panels ($200–$600) can transform call quality and eliminate background reverb.' },
            { icon: '🦴', title: 'Standing Desk ROI', body: 'Studies show alternating sitting/standing reduces lower back pain by 54% after 4 weeks. In DFW where most remote workers sit 8–10 hours, a motorized desk pays for itself in reduced healthcare costs within 18 months.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#112240', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>{card.title}</h3>
              <p style={{ color: '#A8B8D0', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 14, padding: 28, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>📐 Ergonomic Setup Standards</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            {[
              { label: 'Monitor Height', value: 'Top of screen at or slightly below eye level' },
              { label: 'Monitor Distance', value: 'Arm\’s length (20–28 inches from face)' },
              { label: 'Chair Height', value: 'Thighs parallel, feet flat, 90° at hips/knees' },
              { label: 'Keyboard Position', value: 'Elbows at 90°, wrists neutral (not bent up)' },
              { label: 'Lighting Direction', value: 'Light source 90° to monitor — never behind screen' },
              { label: 'Standing Interval', value: '20–30 min standing per hour of desk work' },
            ].map(item => (
              <div key={item.label} style={{ background: '#0D1B33', borderRadius: 10, padding: 16 }}>
                <p style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.label}</p>
                <p style={{ color: '#C8D8E8', fontSize: 14, margin: 0, lineHeight: 1.5 }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, border: '2px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, margin: '0 0 6px' }}>🎯 Priority Upgrade Finder</h2>
          <p style={{ color: '#A8B8D0', fontSize: 14, margin: '0 0 24px' }}>Get a prioritized list based on your work type and budget</p>

          <div style={{ marginBottom: 20 }}>
            <p style={{ color: '#E8EDF5', fontWeight: 600, marginBottom: 10 }}>Primary Work Type</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {(['Video Calls / Client Facing', 'Deep Focus / Writing', 'Creative / Design', 'Hybrid / Mixed'] as WorkType[]).map(opt => (
                <button key={opt} onClick={() => { setWorkType(opt); setShowResults(false); }}
                  style={{ padding: '8px 16px', borderRadius: 8, border: `2px solid ${workType === opt ? '#F5E642' : '#1E3A5F'}`, background: workType === opt ? '#F5E642′ : '#0D1B33', color: workType === opt ? '#0A1628' : '#E8EDF5', fontWeight: 600, cursor: ’pointer', fontSize: 13 }}>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <p style={{ color: '#E8EDF5', fontWeight: 600, marginBottom: 10 }}>Total Upgrade Budget</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {(['Under $1,000', '$1,000–$3,000', '$3,000–$7,000', '$7,000+'] as Budget[]).map(opt => (
                <button key={opt} onClick={() => { setBudget(opt); setShowResults(false); }}
                  style={{ padding: '8px 18px', borderRadius: 8, border: `2px solid ${budget === opt ? '#F5E642' : '#1E3A5F'}`, background: budget === opt ? '#F5E642′ : '#0D1B33', color: budget === opt ? '#0A1628' : '#E8EDF5', fontWeight: 600, cursor: ’pointer', fontSize: 14 }}>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => setShowResults(true)} disabled={!ready}
            style={{ padding: '12px 32px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 16, cursor: ready ? 'pointer' : 'not-allowed', opacity: ready ? 1 : 0.5 }}>
            Show My Priority List →
          </button>

          {showResults && result && (
            <div style={{ marginTop: 28, background: '#0A1628', borderRadius: 12, padding: 24, border: '2px solid #F5E642′ }}>
              <h3 style={{ color: '#F5E642', margin: '0 0 14px', fontSize: 19 }}>Your Ergonomic Upgrade Priority List</h3>
              <ol style={{ margin: '0 0 20px', paddingLeft: 22 }}>
                {result.priorities.map(p => <li key={p} style={{ color: '#C8D8E8', fontSize: 14, marginBottom: 10, lineHeight: 1.5 }}>{p}</li>)}
              </ol>
              <div style={{ background: '#112240', borderRadius: 10, padding: 16, border: '1px solid #F5E642′ }}>
                <p style={{ margin: 0, color: '#F5E642', fontWeight: 700, fontSize: 14 }}>💰 Estimated Annual Health Cost Savings</p>
                <p style={{ margin: '6px 0 0', color: '#E8EDF5', fontSize: 16, fontWeight: 600 }}>{result.savings}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
