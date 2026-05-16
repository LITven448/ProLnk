import { useState } from 'react';

const movingOptions = [
  { id: 'local-small', label: '📦 Local + Small' },
  { id: 'local-large', label: '🏠 Local + Large' },
  { id: 'longdist', label: '🚛 Long Distance' },
  { id: 'corporate', label: '💼 Corporate Relo' },
];

const guides: Record<string, string[]> = {
  'local-small': [
    'Rent a cargo van or 10-ft truck — $40-80/day',
    '2-3 friends plus pizza beats hiring movers at this scale',
    '2 trips max or you need a bigger truck',
    'Start at 6am in summer — DFW heat hits fast',
  ],
  'local-large': [
    'Local mover 2-person crew: $120-180/hr, book 4-6 weeks out',
    'PODS: $250-400/mo, flexible timing, but you load and unload',
    '16 or 26-ft truck if DIY: reserve on weekdays for discounts',
    'Schedule movers for October-April if possible to avoid summer heat',
  ],
  longdist: [
    'Full-service national mover: $4,000-12,000 depending on distance',
    'POD shipped: $2,000-5,000, slower but cheaper',
    'Binding vs non-binding estimate — always get binding',
    'Get 3 quotes minimum, verify USDOT licensing',
  ],
  corporate: [
    'Use relocation management company if employer provides one',
    'Lump sum vs managed: take managed if offered — saves significant hassle',
    'Document all moving expenses for potential tax deduction',
    'Schedule pre-move survey 4+ weeks before move date',
  ],
};

export default function DFWMovingDayGuide2026() {
  const [selected, setSelected] = useState<string>('');

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK DFW GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>📦 DFW Moving Day Guide 2026</h1>
        <p style={{ color: '#aaa', marginBottom: 32 }}>Everything you need to execute a smooth DFW move — from scheduling utilities to surviving July heat.</p>

        <div style={{ background: '#0d1e36', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>⚡ Schedule Utilities Before Close</h2>
          {[
            ['Oncor Electric', 'oncor.com — transfer at least 3 days before close'],
            ['Atmos Energy', 'atmosenergy.com — gas service, same-day requires in-person visit'],
            ['Water', 'Call city hall or utility district — varies by city across DFW'],
            ['Internet', 'AT&T Fiber, Frontier, or Spectrum — book 2 weeks early'],
            ['Trash', 'Usually auto-assigned by city, but verify start date'],
          ].map(([u, d]) => (
            <div key={u} style={{ padding: '10px 0', borderBottom: '1px solid #1a2d4a' }}>
              <div style={{ color: '#F5E642', fontSize: 13 }}>⚡ {u}</div>
              <div style={{ color: '#aaa', fontSize: 13, marginTop: 2 }}>→ {d}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a1200', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #5a4400' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🌡️ DFW Summer Heat Warning</h2>
          <p style={{ color: '#ffddaa', fontSize: 14, lineHeight: 1.6 }}>June through September in DFW means 100°F+ heat index is routine. Start before 7am. Keep movers hydrated with electrolytes, not just water. Schedule breaks every 90 minutes. If anyone shows signs of heat exhaustion, stop immediately. Floors and metal railings heat to dangerous temperatures. Budget extra time — pace drops 30-40% in extreme heat.</p>
        </div>

        <div style={{ background: '#0d1e36', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔒 Change Locks Same Day</h2>
          {[
            'You do not know how many keys the previous owner distributed',
            'ProLnk connects you to licensed locksmiths in under 2 hours',
            'Rekeying is $25-50 per lock vs full replacement at $150+',
            'Add a smart lock to front door while you are at it',
            'Also: change garage code and reprogram all remotes',
          ].map(t => (
            <div key={t} style={{ padding: '8px 0', borderBottom: '1px solid #1a2d4a', color: '#ccc', fontSize: 14 }}>🔑 {t}</div>
          ))}
        </div>

        <div style={{ background: '#0d1e36', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🚛 Move Distance + Size → Moving Approach</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {movingOptions.map(o => (
              <button
                key={o.id}
                onClick={() => setSelected(o.id)}
                style={{ padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, background: selected === o.id ? '#F5E642' : '#1a2d4a', color: selected === o.id ? '#0A1628' : '#ccc', fontWeight: selected === o.id ? 700 : 400 }}
              >
                {o.label}
              </button>
            ))}
          </div>
          {selected && guides[selected].map(item => (
            <div key={item} style={{ color: '#ccc', fontSize: 13, padding: '6px 0', borderBottom: '1px solid #1a2d4a' }}>→ {item}</div>
          ))}
        </div>

        <div style={{ textAlign: 'center', color: '#F5E642', fontSize: 13 }}>🔗 ProLnk — DFW Home Services Network | prolnk.io</div>
      </div>
    </div>
  );
}
