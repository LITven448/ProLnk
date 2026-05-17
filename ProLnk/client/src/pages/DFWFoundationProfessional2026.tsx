import { useState } from 'react';

export default function DFWFoundationProfessional2026() {
  const [concern, setConcern] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);

  const concernOptions = [
    { label: 'Cracks in walls or floors', value: 'cracks' },
    { label: 'Doors or windows sticking', value: 'doors' },
    { label: 'Getting a repair quote', value: 'quote' },
    { label: 'Post-repair monitoring', value: 'monitoring' },
    { label: 'Should I get an engineer involved?', value: 'engineer' },
  ];

  const results: Record<string, string> = {
    cracks: 'PROFESSIONAL STANDARD: Cracks require a full elevation survey before any diagnosis — not a visual-only walk-through. A tech should measure elevations across the slab (typically 15-20 measurement points for a standard DFW home) and compare against a baseline. Cracks alone do not determine repair scope — movement measurements do. Any company quoting repairs based only on a visual inspection is guessing.',
    doors: 'PROFESSIONAL STANDARD: Sticking doors and windows are a symptom, not a diagnosis. A professional must complete an elevation survey to determine whether movement is active, seasonal (moisture-related), or historic. In DFW, many sticking doors are seasonal clay expansion/contraction and do not require pier installation. Ask for elevation data before agreeing to any repair.',
    quote: 'PROFESSIONAL QUOTE STANDARDS: A legitimate foundation quote includes a written elevation survey report, soil assessment noting clay type and moisture conditions, a specific pier plan (number of piers, locations, depth), permit requirement disclosure (permits required for major repairs in most DFW cities), and a post-repair elevation target. Walk away from any company that cannot provide a written elevation survey with their quote.',
    monitoring: 'POST-REPAIR MONITORING: After pier installation, professional standard includes a 90-day follow-up elevation check, a 1-year elevation verification, and a written report for your Home Health Vault records. Foundation movement is not always fully stabilized at the time of repair — post-repair data is critical for warranty claims and future documentation.',
    engineer: 'WHEN AN ENGINEER IS REQUIRED: Structural engineer review is recommended when movement exceeds 2 inches across the slab, when pier count is 15 or more, when the home has a room addition or structural modification, or when a permit is required (engineer-stamped plans may be needed). A reputable foundation company will tell you when engineer involvement is warranted — not just bill you for more piers.',
  };

  const standards = [
    { emoji: '📐', label: 'Elevation survey before quoting', detail: '15-20 measurement points — movement data, not just visual inspection' },
    { emoji: '🌍', label: 'Soil assessment included', detail: 'Clay type, moisture content, and seasonal factors documented' },
    { emoji: '📋', label: 'Written pier plan', detail: 'Specific pier count, locations, and target depth in writing' },
    { emoji: '🏛️', label: 'Permit required for major work', detail: 'Most DFW cities require permits for pier installation' },
    { emoji: '👷', label: 'Engineer review for large repairs', detail: 'Required when movement is significant or pier count is high' },
    { emoji: '📅', label: 'Post-repair monitoring schedule', detail: '90-day and 1-year elevation verification after repair' },
  ];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF4', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 }}>DFW Foundation Guide 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>What to Expect from a DFW Foundation Professional</h1>
        <p style={{ color: '#94A3B8', fontSize: 15, marginBottom: 32 }}>Professional foundation service standards in DFW — what every homeowner should know before any company touches their slab.</p>

        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {standards.map((s) => (
            <div key={s.label} style={{ backgroundColor: '#112240', borderRadius: 10, padding: 14, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 22, flexShrink: 0 }}>{s.emoji}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 3 }}>{s.label}</div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>{s.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>🔍 What should I expect for my situation?</div>
          <select
            value={concern}
            onChange={(e) => { setConcern(e.target.value); setResult(results[e.target.value] ?? null); }}
            style={{ width: '100%', padding: '12px 14px', backgroundColor: '#0A1628', color: '#E8EDF4', border: '1px solid #1E3A5F', borderRadius: 8, fontSize: 14, marginBottom: 16 }}
          >
            <option value="">Select your service concern...</option>
            {concernOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '3px solid #F5E642', color: '#CBD5E1', fontSize: 14, lineHeight: 1.6 }}>
              {result}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#1a1a2e', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>🏠 Home Health Vault</div>
          <div style={{ color: '#94A3B8', fontSize: 13 }}>ProLnk Charter foundation pros document every elevation survey and repair in the Home Health Vault — permanent records for resale, warranty, and insurance claims.</div>
        </div>
      </div>
    </div>
  );
}
