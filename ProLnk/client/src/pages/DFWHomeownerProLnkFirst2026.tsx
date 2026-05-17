import { useState } from 'react';

const challenges = [
  { id: 'chasers', label: 'Storm Chasers', icon: '🌪️', problem: 'After every DFW hail storm, out-of-state crews flood in — unlicensed, uninsured, and gone in 6 weeks', solution: 'ProLnk verifies every pro's Texas license, insurance, and local history before they join' , why: 'Your claim, your home, your investment — protected by verified local pros only.' },
  { id: 'five-calls', label: 'Calling 5 Contractors', icon: '📞', problem: 'The average DFW homeowner calls 4–6 contractors to get 2–3 quotes — wasting 3–5 hours per project', solution: 'Tell ProLnk what you need once — get matched with 3 verified, available pros within minutes' , why: 'Your time is worth $200+/hour. ProLnk saves you a full afternoon on every project.' },
  { id: 'unlicensed', label: 'Unlicensed Handymen', icon: '🚫', problem: 'Texas law requires licenses for HVAC, electrical, plumbing — but homeowners can't easily verify', solution: 'ProLnk's verification layer checks license status with TDLR before every match' , why: 'Unlicensed work voids homeowner's insurance in Texas. Never risk it.' },
  { id: 'records', label: 'Lost Service Records', icon: '📁', problem: 'No record of who serviced your HVAC, when your roof was last inspected, or what's been repaired', solution: 'ProLnk's Home Health Vault logs every job — searchable by trade, date, and contractor' , why: 'Vault records increase resale value and document warranty compliance.' },
  { id: 'pricing', label: 'Surprise Pricing', icon: '💸', problem: 'DFW contractors often quote low and add costs mid-job — especially after major storms', solution: 'ProLnk pros submit complete quotes upfront — locked before work begins' , why: 'Transparent quotes = no surprises = real trust.' },
];

export default function DFWHomeownerProLnkFirst2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = challenges.find(c => c.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>📲🏡</div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#F5E642', marginBottom: '8px' }}>
            ProLnk: Your First Call for DFW Home Services 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>
            DFW homeowners deserve better than the old way. Here's why ProLnk is the first call — every time.
          </p>
        </div>

        <p style={{ textAlign: 'center', color: '#F5E642', marginBottom: '24px', fontWeight: '600' }}>
          What challenge are you dealing with?
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '32px' }}>
          {challenges.map(c => (
            <button
              key={c.id}
              onClick={() => setSelected(selected === c.id ? null : c.id)}
              style={{
                background: selected === c.id ? '#F5E642' : '#1e2d4a',
                color: selected === c.id ? '#0A1628' : '#fff',
                border: '2px solid' + (selected === c.id ? ' #F5E642' : ' #334155'),
                borderRadius: '12px', padding: '16px 8px', cursor: 'pointer',
                fontSize: '12px', fontWeight: '700', textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '6px' }}>{c.icon}</div>
              {c.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#1e2d4a', borderRadius: '16px', padding: '28px', border: '2px solid #F5E642' }}>
            <h2 style={{ color: '#F5E642', fontSize: '20px', marginBottom: '16px' }}>{active.icon} {active.label}</h2>
            <div style={{ display: 'grid', gap: '14px' }}>
              <div style={{ background: '#0A1628', borderRadius: '8px', padding: '12px', borderLeft: '3px solid #ef4444' }}>
                <div style={{ color: '#ef4444', fontWeight: '700', marginBottom: '4px' }}>❌ The Problem:</div>
                {active.problem}
              </div>
              <div style={{ background: '#0A1628', borderRadius: '8px', padding: '12px', borderLeft: '3px solid #22c55e' }}>
                <div style={{ color: '#22c55e', fontWeight: '700', marginBottom: '4px' }}>✅ ProLnk Solution:</div>
                {active.solution}
              </div>
              <div style={{ background: '#0A1628', borderRadius: '8px', padding: '12px', borderLeft: '3px solid #F5E642' }}>
                <span style={{ color: '#F5E642', fontWeight: '700' }}>💡 Why It Matters: </span>{active.why}
              </div>
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <a href="/homeowner-signup" style={{ background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: '8px', fontWeight: '700', textDecoration: 'none', display: 'inline-block' }}>
                Make ProLnk My First Call →
              </a>
            </div>
          </div>
        )}

        <div style={{ marginTop: '40px', textAlign: 'center', color: '#475569', fontSize: '13px' }}>
          ProLnk — DFW's trusted home services network. Verified pros. Transparent quotes. Permanent records.
        </div>
      </div>
    </div>
  );
}
