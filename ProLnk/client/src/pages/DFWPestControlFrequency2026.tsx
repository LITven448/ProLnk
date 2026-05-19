import { useState } from 'react';

const pestHistories = ['No pest issues', 'Past roach or ant issues', 'Past termite activity', 'Ongoing pest concerns'];
const homeTypes = ['Slab foundation', 'Pier and beam foundation', 'Older home (pre-1980)'];

type TreatmentItem = { pest: string; frequency: string; season: string; note: string };

const getSchedule = (history: string, homeType: string): TreatmentItem[] => {
  const base: TreatmentItem[] = [
    { pest: '🐜 General pest (roaches, ants, spiders)', frequency: 'Quarterly', season: 'Year-round', note: 'DFW heat drives insects indoors — quarterly is the minimum for effective control.' },
    { pest: '🦟 Mosquito barrier spray', frequency: 'Monthly', season: 'April through October', note: 'DFW mosquito season peaks May-September. Bi-weekly during heavy rain periods.' },
    { pest: '🐜 Fire ant treatment', frequency: 'Twice yearly', season: 'Spring (March-April) + Fall (Sept-Oct)', note: 'Treat when soil temp is 60-85°F — fire ants are most active and near surface.' },
    { pest: '🏠 Rodent exclusion check', frequency: 'Annual', season: 'Fall (October)', note: 'Mice seek warmth in fall — seal all gaps over 1/4" before temps drop.' },
  ];

  const historyAdd: Record<string, TreatmentItem[]> = {
    'Past roach or ant issues': [
      { pest: '🪳 German roach follow-up', frequency: 'Monthly for 3 months, then quarterly', season: 'Year-round', note: 'German roaches require aggressive indoor treatment — gel baits + IGR monthly.' },
    ],
    'Past termite activity': [
      { pest: '🐛 Termite inspection', frequency: 'Annual', season: 'Spring (March-May)', note: 'DFW has both subterranean and Formosan termites — get species-specific treatment.' },
      { pest: '🐛 Termite bait station monitoring', frequency: 'Quarterly if installed', season: 'Year-round', note: 'Bait stations require regular monitoring to remain effective.' },
    ],
    'Ongoing pest concerns': [
      { pest: '🔍 Full pest audit', frequency: 'Bi-monthly', season: 'Year-round', note: 'Bi-monthly service for active infestations — reduce to quarterly once resolved.' },
    ],
    'No pest issues': [],
  };

  const homeAdd: Record<string, TreatmentItem[]> = {
    'Pier and beam foundation': [
      { pest: '🐀 Crawl space rodent check', frequency: 'Every 6 months', season: 'Fall + Spring', note: 'Open crawl spaces are entry points for rats, mice, and opossums in DFW.' },
      { pest: '🐛 Subterranean termite risk', frequency: 'Annual inspection', season: 'Spring', note: 'Pier and beam homes have direct wood-to-soil contact — higher termite risk.' },
    ],
    'Older home (pre-1980)': [
      { pest: '🐀 Rodent exclusion full assessment', frequency: 'Annual', season: 'Fall', note: 'Older homes have more entry points — full exclusion sealing recommended.' },
      { pest: '🦟 Mosquito + standing water audit', frequency: 'Monthly May-Sept', season: 'Summer', note: 'Older drainage systems collect standing water — prime breeding grounds.' },
    ],
    'Slab foundation': [],
  };

  return [...base, ...(historyAdd[history] || []), ...(homeAdd[homeType] || [])];
};

export default function DFWPestControlFrequency2026() {
  const [history, setHistory] = useState('');
  const [homeType, setHomeType] = useState('');
  const schedule = history && homeType ? getSchedule(history, homeType) : [];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🐛🏠</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>
            DFW Pest Control Frequency Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>
            DFW's warm climate and diverse ecosystems create year-round pest pressure. Get your personalized treatment schedule based on your home and pest history.
          </p>
        </div>

        <div style={{ backgroundColor: '#1e2d47', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>🐜 Pest History</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {pestHistories.map((h) => (
              <button key={h} onClick={() => setHistory(h)}
                style={{ padding: '11px 16px', borderRadius: 8, border: history === h ? '2px solid #F5E642' : '2px solid #2d3f5a', backgroundColor: history === h ? '#F5E642' : '#0d1f36', color: history === h ? '#0A1628' : '#cbd5e1', fontWeight: 700, fontSize: 15, cursor: 'pointer', textAlign: 'left' }}>
                {h}
              </button>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#1e2d47', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>🏠 Home Type</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {homeTypes.map((t) => (
              <button key={t} onClick={() => setHomeType(t)}
                style={{ padding: '11px 16px', borderRadius: 8, border: homeType === t ? '2px solid #F5E642' : '2px solid #2d3f5a', backgroundColor: homeType === t ? '#F5E642' : '#0d1f36', color: homeType === t ? '#0A1628' : '#cbd5e1', fontWeight: 700, fontSize: 15, cursor: 'pointer', textAlign: 'left' }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {schedule.length > 0 && (
          <div style={{ backgroundColor: '#1e2d47', borderRadius: 12, padding: 24, marginBottom: 20 }}>
            <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📅 Your DFW Pest Treatment Schedule</h2>
            {schedule.map((item, i) => (
              <div key={i} style={{ padding: '11px 0', borderBottom: '1px solid #2d3f5a' }}>
                <div style={{ color: '#e2e8f0', fontWeight: 600, fontSize: 15, marginBottom: 3 }}>{item.pest}</div>
                <div style={{ display: 'flex', gap: 16, marginBottom: 4 }}>
                  <span style={{ color: '#F5E642', fontSize: 12, fontWeight: 700 }}>🔄 {item.frequency}</span>
                  <span style={{ color: '#64748b', fontSize: 12 }}>📆 {item.season}</span>
                </div>
                <div style={{ color: '#64748b', fontSize: 13 }}>💡 {item.note}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ backgroundColor: '#1e2d47', borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 10 }}>🌡️ DFW Pest Season Overview</h3>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
            DFW pest pressure never truly stops — it shifts. <strong style={{ color: '#e2e8f0' }}>Winter</strong>: rodents and roaches seek warmth.
            <strong style={{ color: '#e2e8f0' }}> Spring</strong>: termite swarm season, fire ant peak. <strong style={{ color: '#e2e8f0' }}>Summer</strong>: mosquitoes, scorpions, wasps.
            <strong style={{ color: '#F5E642' }}> Year-round quarterly service</strong> is the DFW standard — not a luxury.
          </div>
        </div>
      </div>
    </div>
  );
}