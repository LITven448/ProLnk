import { useState } from 'react';

const GUARD_TYPES = [
  {
    name: 'Micro-Mesh',
    cost: '$15–25/linear ft',
    rating: 5,
    notes: 'Best for DFW. Blocks seeds, leaves, cottonwood. Long-term winner.',
  },
  {
    name: 'Screen / Vinyl',
    cost: '$1–3/linear ft',
    rating: 2,
    notes: 'Better than nothing. Pine needle and seed penetration common in DFW.',
  },
  {
    name: 'Reverse Curve',
    cost: '$8–15/linear ft',
    rating: 2,
    notes: 'Poor in DFW — water overshoots during heavy rain events.',
  },
  {
    name: 'Foam Inserts',
    cost: '$3–5/linear ft',
    rating: 1,
    notes: 'Easy DIY but shingle granules and seeds clog foam over time.',
  },
  {
    name: 'Brushes',
    cost: '$3–7/linear ft',
    rating: 1,
    notes: 'Debris catches in bristles. Similar failure mode to foam.',
  },
];

function Stars({ count }: { count: number }) {
  return (
    <span>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < count ? '#f59e0b' : '#374151', fontSize: 16 }}>★</span>
      ))}
    </span>
  );
}

export default function GutterGuardGuide() {
  const [linearFeet, setLinearFeet] = useState(150);

  const annualCleaning = 450;
  const microMeshLow = linearFeet * 15;
  const microMeshHigh = linearFeet * 25;
  const paybackLow = Math.ceil(microMeshLow / annualCleaning);
  const paybackHigh = Math.ceil(microMeshHigh / annualCleaning);

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', color: '#f1f5f9', fontFamily: 'system-ui, sans-serif', padding: '0 0 80px' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)', padding: '64px 24px 48px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🍂</div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, color: '#f1f5f9', margin: '0 0 16px', lineHeight: 1.2 }}>
          DFW Gutter Guard Guide
        </h1>
        <p style={{ fontSize: 18, color: '#94a3b8', margin: '0 auto', maxWidth: 600 }}>
          Are They Worth It in Texas?
        </p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>

        {/* DFW Context */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: '32px', marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#38bdf8', margin: '0 0 16px' }}>🏙️ Why DFW Gutters Are a Real Problem</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: '0 0 12px' }}>
            DFW has significant tree coverage — oak, pecan, and cottonwood are everywhere — combined with 3–5 major storm events per year.
            That's a brutal combination for gutters.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginTop: 20 }}>
            {[
              { icon: '🍂', label: 'Fall', detail: 'Oak and pecan leaves pack gutters solid' },
              { icon: '🌸', label: 'Spring', detail: 'Cottonwood seeds clog every opening' },
              { icon: '⛈️', label: 'Storm Season', detail: 'Debris washes in faster than it drains' },
            ].map(item => (
              <div key={item.label} style={{ background: '#0f172a', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: 6 }}>{item.label}</div>
                <div style={{ color: '#94a3b8', fontSize: 14 }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Guard Types */}
        <div style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', margin: '0 0 24px' }}>🛡️ Guard Types — DFW Performance Ratings</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {GUARD_TYPES.map(g => (
              <div key={g.name} style={{ background: '#1e293b', borderRadius: 14, padding: 24, display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ flex: '1 1 200px' }}>
                  <div style={{ fontWeight: 700, fontSize: 18, color: '#f1f5f9', marginBottom: 6 }}>{g.name}</div>
                  <div style={{ color: '#38bdf8', fontWeight: 600, marginBottom: 8 }}>{g.cost}</div>
                  <Stars count={g.rating} />
                </div>
                <div style={{ flex: '2 1 280px', color: '#94a3b8', fontSize: 15, lineHeight: 1.6, paddingTop: 4 }}>{g.notes}</div>
              </div>
            ))}
          </div>
        </div>

        {/* DFW Recommendation */}
        <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #1e293b)', border: '1px solid #38bdf8', borderRadius: 16, padding: 28, marginTop: 40 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#38bdf8', margin: '0 0 12px' }}>💡 Bottom Line for DFW</h3>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
            Skip the cheap options. DFW's combination of cottonwood seeds (spring), oak leaves (fall), and heavy rain events defeats most guards.
            Micro-mesh is worth the premium — it's the only type that handles all three failure modes.
          </p>
        </div>

        {/* What Guards Don't Eliminate */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 28, marginTop: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f1f5f9', margin: '0 0 14px' }}>⚠️ What Gutter Guards Don't Eliminate</h3>
          <ul style={{ color: '#94a3b8', lineHeight: 1.8, margin: 0, paddingLeft: 20 }}>
            <li>You still need <strong style={{ color: '#f1f5f9' }}>occasional cleaning</strong> even with guards — micro-mesh surfaces accumulate pollen and debris.</li>
            <li>"Occasional" vs. "twice a year" is still a major win in time and cost.</li>
            <li>Guards don't address existing damage — inspect gutters before installation.</li>
          </ul>
        </div>

        {/* Calculator */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', margin: '0 0 8px' }}>🧮 Cost-Benefit Calculator</h2>
          <p style={{ color: '#64748b', margin: '0 0 28px', fontSize: 14 }}>Based on DFW average: 2× annual cleaning at $225/visit = $450/year</p>

          <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8, fontWeight: 600 }}>
            Linear feet of gutters: <span style={{ color: '#38bdf8', fontWeight: 700 }}>{linearFeet} ft</span>
          </label>
          <input
            type="range"
            min={80}
            max={400}
            value={linearFeet}
            onChange={e => setLinearFeet(Number(e.target.value))}
            style={{ width: '100%', marginBottom: 28, accentColor: '#38bdf8' }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            <div style={{ background: '#0f172a', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#64748b', fontSize: 13, marginBottom: 8 }}>Annual Cleaning Cost</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#ef4444' }}>${annualCleaning}/yr</div>
              <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>2× per year forever</div>
            </div>
            <div style={{ background: '#0f172a', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#64748b', fontSize: 13, marginBottom: 8 }}>Micro-Mesh Install</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#38bdf8' }}>
                ${microMeshLow.toLocaleString()}–${microMeshHigh.toLocaleString()}
              </div>
              <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>one-time cost</div>
            </div>
            <div style={{ background: '#0f172a', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#64748b', fontSize: 13, marginBottom: 8 }}>Payback Period</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#22c55e' }}>
                {paybackLow}–{paybackHigh} yrs
              </div>
              <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>then you're ahead</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <p style={{ color: '#94a3b8', marginBottom: 20, fontSize: 16 }}>Ready to get quotes from vetted DFW gutter pros?</p>
          <a
            href="/waitlist/homeowner"
            style={{ display: 'inline-block', background: '#38bdf8', color: '#0f172a', fontWeight: 800, padding: '16px 40px', borderRadius: 12, textDecoration: 'none', fontSize: 18 }}
          >
            Get Free Quotes →
          </a>
        </div>
      </div>
    </div>
  );
}
