import { useState } from 'react';

const frustrations = [
  { label: 'Got ripped off by a contractor', solution: 'Every ProLnk pro is background-checked, license-verified, and rated by real DFW homeowners. No anonymous strangers. No fly-by-night operations.' },
  { label: 'Paid for a job done wrong', solution: 'ProLnk pros are held to completion standards. Job details and outcomes are logged in your Home Health Vault — accountability built in.' },
  { label: 'Couldn\’t find a pro who showed up', solution: 'ProLnk matches you with pros who have confirmed availability. No ghosting — our system tracks commitment rates and removes no-shows.' },
  { label: 'Bid too high, no transparency', solution: 'Transparent upfront pricing before any work starts. Compare 3 quotes from vetted pros — no pressure, no hidden fees.' },
  { label: 'Lost paperwork from old repairs', solution: 'Home Health Vault permanently stores every job, every contractor, every warranty — searchable and shareable forever.' },
];

const milestones = [
  { icon: '📍', label: 'Founded in DFW', desc: '2024 — Andrew Frakes launched ProLnk after watching friends get burned by unknown contractors' },
  { icon: '🏗️', label: 'Platform Built', desc: '2025 — Full two-sided marketplace built with AI-powered matching and Home Health Vault' },
  { icon: '🎯', label: 'Waitlist Open', desc: 'May 2026 — 500 homeowner spots, 25 Charter pro spots available at launch' },
  { icon: '🚀', label: 'DFW Launch', desc: 'Q3 2026 — Full go-live with live matching, payments, and pro activation' },
];

export default function ProLnkMissionPage() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎯</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>Our Mission</h1>
          <div style={{ background: '#132040', border: '1px solid #F5E642', borderRadius: 16, padding: 28, maxWidth: 680, margin: '0 auto' }}>
            <p style={{ fontSize: 20, lineHeight: 1.7, color: '#fff', fontStyle: 'italic' }}>"Every homeowner deserves access to trusted, local service professionals without fear of getting ripped off."</p>
            <p style={{ color: '#F5E642', fontSize: 14, marginTop: 12 }}>— Andrew Frakes, Founder &amp; CEO</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14, marginBottom: 48 }}>
          {milestones.map((m, i) => (
            <div key={i} style={{ background: '#132040', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{m.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#F5E642', marginBottom: 6 }}>{m.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{m.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', border: '1px solid #1e3a5f', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>ProLnk vs. Angi &amp; Thumbtack</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 0 }}>
            {[['Feature','Angi / Thumbtack','ProLnk'],['Lead Quality','Sold to 10+ pros','Pre-qualified, 1:1 match'],['Pro Vetting','Self-reported','License + background verified'],['Pricing','Opaque','Transparent upfront'],['Job Records','None','Home Health Vault forever'],['Income Streams','One','Five']].map((row, i) => (
              <div key={i} style={{ display: 'contents' }}>
                {row.map((cell, j) => (
                  <div key={j} style={{ background: i === 0 ? '#0A1628' : (j === 2 ? '#1a2d4a' : 'transparent'), border: '1px solid #1e3a5f', padding: '10px 14px', fontSize: 13, color: i === 0 ? '#F5E642' : (j === 2 ? '#F5E642' : '#cbd5e1'), fontWeight: i === 0 ? 700 : 400 }}>{cell}</div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>What frustrates you most?</h2>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
          {frustrations.map((f, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{ background: selected === i ? '#F5E642' : '#132040', color: selected === i ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{f.label}</button>
          ))}
        </div>
        {selected !== null && (
          <div style={{ background: '#132040', border: '1px solid #F5E642', borderRadius: 14, padding: 24, marginBottom: 40 }}>
            <p style={{ color: '#cbd5e1', fontSize: 15, lineHeight: 1.7 }}>{frustrations[selected].solution}</p>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <h3 style={{ color: '#0A1628', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Join the Mission</h3>
          <p style={{ color: '#0A1628', marginBottom: 4 }}>Be part of fixing home services in DFW — and beyond.</p>
          <p style={{ color: '#0A1628', fontWeight: 600 }}>📧 hello@prolnk.io</p>
        </div>
      </div>
    </div>
  );
}