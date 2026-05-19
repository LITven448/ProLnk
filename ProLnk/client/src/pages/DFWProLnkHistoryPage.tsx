import { useState } from 'react';

const milestones = [
  { year: '2023', emoji: '💡', title: 'The Problem Identified', detail: 'Andrew Frakes, a DFW homeowner, watched a neighbor get charged $4,200 for a repair that should have cost $800. No way to verify the contractor, no price transparency, no recourse. The problem was clear.' },
  { year: '2024', emoji: '🔨', title: 'Building Begins', detail: 'A small team of builders, real estate veterans, and technology architects began designing the ProLnk platform — focused first on DFW because they knew it deeply.' },
  { year: '2025', emoji: '🏗️', title: 'Platform Architecture', detail: 'ProLnk\’s two-sided marketplace took shape: verified pros on one side, informed homeowners on the other, with the Home Health Vault as the data backbone.' },
  { year: '2026', emoji: '🚀', title: 'DFW Launch', detail: 'ProLnk opens its waitlist to DFW homeowners and service professionals — the beginning of a transparent, trustworthy home services network.' },
];

const aspects = [
  { label: 'The DFW Problem', emoji: '🏘️' },
  { label: 'The Team Story', emoji: '👥' },
  { label: 'The Technology', emoji: '⚙️' },
  { label: 'The Mission', emoji: '🎯' },
];

const aspectDetails: Record<string, string> = {
  'The DFW Problem': 'DFW is one of the fastest-growing metros in America — but home services infrastructure hasn\’t kept pace. Fly-by-night contractors, opaque pricing, and zero accountability have cost DFW homeowners billions. ProLnk was built to fix that, starting block by block.',
  'The Team Story': 'The ProLnk founding team has roots in DFW real estate, home renovation, and software. They\’ve been on both sides: hiring contractors and being hired. That lived experience shapes every product decision.',
  'The Technology': 'ProLnk\’s platform runs on a verified contractor network, a Home Health Vault with data on millions of homes, and AI-powered matching that connects the right pro to the right job — not just whoever bids first.',
  'The Mission': 'ProLnk\’s mission is simple: make home services trustworthy. Every vetted contractor, every transparent quote, every protected homeowner decision moves that mission forward.',
};

export default function DFWProLnkHistoryPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>📖</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            The ProLnk Story
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', lineHeight: 1.6 }}>
            How a DFW homeowner's frustration became a platform built to fix home services — for good.
          </p>
        </div>

        <div style={{ marginBottom: 40 }}>
          {milestones.map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
              <div style={{ minWidth: 56, textAlign: 'center' }}>
                <div style={{ fontSize: 28 }}>{m.emoji}</div>
                <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginTop: 4 }}>{m.year}</div>
              </div>
              <div style={{ background: '#132040', borderRadius: 12, padding: 20, flex: 1 }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>{m.title}</h3>
                <p style={{ color: '#CBD5E1', lineHeight: 1.6, fontSize: 15 }}>{m.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🔎 What aspect of our story interests you?</h2>
          <p style={{ color: '#94A3B8', marginBottom: 20, fontSize: 14 }}>Select a topic to go deeper:</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            {aspects.map((a, i) => (
              <button key={i} onClick={() => setSelected(selected === a.label ? null : a.label)}
                style={{ background: selected === a.label ? '#F5E642' : '#0A1628', color: selected === a.label ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 10, padding: '14px 12px', cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left' }}>
                {a.emoji} {a.label}
              </button>
            ))}
          </div>
          {selected && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, color: '#CBD5E1', lineHeight: 1.7 }}>
              {aspectDetails[selected]}
            </div>
          )}
        </div>

        <div style={{ background: '#132040', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>🗺️ Where It's Going</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7 }}>
            ProLnk's DFW launch is the beginning of a national platform — one that will put 1 million homes into the Health Vault, connect 50,000 verified contractors, and move $2 billion in home services through a trusted network. The story is just starting.
          </p>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 16, padding: 28, textAlign: 'center' }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0A1628', marginBottom: 10 }}>Be Part of the Story</h2>
          <p style={{ color: '#132040', fontSize: 15, marginBottom: 20 }}>Join the waitlist and become one of ProLnk's founding DFW members.</p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            Join the Waitlist →
          </button>
        </div>

      </div>
    </div>
  );
}
