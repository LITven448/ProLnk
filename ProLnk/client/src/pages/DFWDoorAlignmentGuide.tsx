import { useState } from 'react';

const symptoms = ['Door sticks at top (drags on frame)', 'Door sticks at latch side', 'Door won\’t latch — strike plate misaligned', 'Door swings open or closed on its own', 'Large gap at top or bottom of door', 'Door squeaks when opening'];
const dfwSeasons = ['Summer (Jun–Sep)', 'Winter (Dec–Feb)', 'Spring/Fall transition', 'Year-round / all seasons'];

type DoorResult = { causeLikelihood: string; fixApproach: string; foundationFlag: boolean; urgency: string; note: string };

function diagnose(symptom: string, season: string): DoorResult {
  const isYearRound = season.includes('Year-round');
  const isSummer = season.includes('Summer');

  if (symptom.includes('top') && !isYearRound) return { causeLikelihood: isSummer ? 'Wood swelling from DFW humidity and heat' : 'Minor seasonal expansion — very common in DFW spring/fall', urgency: '🟡 Monitor — likely self-resolves', fixApproach: 'Wait until fall to assess. If door clears in October, it\’s humidity. If still sticking, sand the top rail lightly (1/16" at most) and repaint.', foundationFlag: false, note: 'DFW summer doors swell at the top — hot air rises, top rails expand most. Do NOT plane the door in summer; you\’ll have a gap all winter.' };
  if (symptom.includes('top') && isYearRound) return { causeLikelihood: 'Foundation movement — DFW #1 cause of year-round sticking', urgency: '🔴 Foundation evaluation recommended', fixApproach: '1. Check for diagonal cracks from door corners — strong foundation signal. 2. Mark the stuck spot with chalk. 3. Call Olshan or HD Foundations for a free DFW evaluation. 4. Do NOT plane door until foundation is assessed — you may over-remove.', foundationFlag: true, note: 'In DFW, year-round door sticking is a foundation problem until proven otherwise. Clay movement rakes the frame out of square.' };
  if (symptom.includes('latch side')) return { causeLikelihood: isYearRound ? 'Foundation movement (frame out of square)' : 'Hinge sag or wood expansion at hinge side', urgency: isYearRound ? '🔴 Assess foundation' : '🟡 Adjust hinges first', fixApproach: isYearRound ? 'Check for stair-step cracks in brick or drywall. Get foundation eval. If stable, tighten or shim hinges before planing.' : '1. Tighten all hinge screws. 2. If stripped, inject wood glue + toothpicks, let cure 24hr, re-tighten. 3. Add third hinge if door is heavy.', foundationFlag: isYearRound, note: 'DFW homes with hinge-side sticking that\’s seasonal are usually fixable with hinge tightening. Year-round = foundation consult.' };
  if (symptom.includes('latch')) return { causeLikelihood: 'Strike plate shift — can be foundation OR settling', urgency: '🟡 Quick fix available; investigate cause', fixApproach: '1. Mark strike plate with lipstick, close door to see contact point. 2. File strike plate opening in direction needed. 3. If shift exceeds 3/8", investigate cause before filing further.', foundationFlag: false, note: 'Strike plate filing is a fast fix but masks the cause. Track which direction it shifts over time — it tells you which way the frame is moving.' };
  if (symptom.includes('swings')) return { causeLikelihood: 'Hinge pin issue or frame out of plumb', urgency: '🟢 Likely simple fix', fixApproach: '1. Check if frame is plumb with level. 2. If out of plumb, bend middle hinge pin slightly with hammer (old trick). 3. Or add a hinge pin stop to hold position.', foundationFlag: false, note: 'Self-swinging doors in DFW are usually hinge-related, not foundation. Check plumb first — 1/8" out of plumb causes noticeable swing.' };
  if (symptom.includes('gap')) return { causeLikelihood: isYearRound ? 'Foundation movement — frame racked' : 'Seasonal wood movement', urgency: isYearRound ? '🔴 Foundation check' : '🟡 Monitor seasonally', fixApproach: isYearRound ? 'Measure gap size and location. Document with photos. Get foundation evaluation. Large gaps (>1/4") year-round = structural concern.' : 'Add weatherstripping to manage draft. Recheck in opposite season — if gap closes, it\’s seasonal movement only.', foundationFlag: isYearRound, note: 'A gap that changes with seasons is wood movement. A gap that doesn\’t change is frame shift — important distinction in DFW.' };
  return { causeLikelihood: 'Dry hinge or loose hinge screws', urgency: '🟢 Easy fix', fixApproach: '1. Tighten all hinge screws. 2. Spray WD-40 or 3-in-1 oil on hinge pins. 3. If squeaking continues, remove pin, apply petroleum jelly, reinstall.', foundationFlag: false, note: 'DFW heat dries out hinge lubrication fast. Annual hinge oiling is standard maintenance here.' };
}

export default function DFWDoorAlignmentGuide() {
  const [symptom, setSymptom] = useState('');
  const [season, setSeason] = useState('');
  const result = symptom && season ? diagnose(symptom, season) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ color: '#F5E642', fontSize: '2rem' }}>🚪📐</span>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW Door Alignment Guide</h1>
          <p style={{ color: '#94a3b8' }}>In DFW, sticking doors are often a foundation story — not just humidity like humid southern climates.</p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>⚠️ DFW Door Sticking — Key Distinctions</h2>
          {[['Seasonal sticking = likely wood', 'If your door only sticks in summer or spring — that\’s DFW humidity and heat expanding wood. Usually self-resolves.'],
            ['Year-round sticking = likely foundation', 'If the door sticks in all seasons, DFW expansive clay has shifted the frame. Get a foundation eval.'],
            ['Diagonal cracks = red flag', 'Cracks running diagonally from door corners in drywall or brick = foundation movement, not shrinkage.'],
            ['Don\’t plane in summer', 'Planing a door in DFW summer removes too much — you\’ll have a gap all winter. Adjust in fall or spring instead.'],
          ].map(([title, desc]) => (
            <div key={title} style={{ marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '3px solid #F5E642' }}>
              <div style={{ fontWeight: 'bold', color: '#e2e8f0' }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Diagnose Your Door</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>What is the door doing?</label>
            <select value={symptom} onChange={e => setSymptom(e.target.value)} style={{ width: '100%', padding: '0.6rem', backgroundColor: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6 }}>
              <option value="">Select symptom...</option>
              {symptoms.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>When does it occur?</label>
            <select value={season} onChange={e => setSeason(e.target.value)} style={{ width: '100%', padding: '0.6rem', backgroundColor: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6 }}>
              <option value="">Select timing...</option>
              {dfwSeasons.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {result && (
            <div style={{ backgroundColor: '#162d4a', borderRadius: 8, padding: '1.2rem', border: `1px solid ${result.foundationFlag ? '#f87171' : '#F5E642'}` }}>
              {result.foundationFlag && <div style={{ backgroundColor: '#7f1d1d', padding: '0.6rem', borderRadius: 6, marginBottom: '0.8rem', color: '#fca5a5', fontSize: '0.9rem' }}>🚨 Foundation flag — evaluate before DIY repair</div>}
              <div style={{ marginBottom: '0.8rem' }}><span style={{ color: '#94a3b8' }}>Cause: </span><span style={{ fontWeight: 'bold' }}>{result.causeLikelihood}</span></div>
              <div style={{ marginBottom: '0.8rem' }}><span style={{ color: '#94a3b8' }}>Urgency: </span><span>{result.urgency}</span></div>
              <div style={{ marginBottom: '0.8rem' }}><span style={{ color: '#94a3b8' }}>Fix approach: </span><span>{result.fixApproach}</span></div>
              <div style={{ padding: '0.8rem', backgroundColor: '#0A1628', borderRadius: 6, color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.5rem' }}>💡 {result.note}</div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>💰 DFW Cost Reference</h2>
          {[['DIY hinge tightening/oil', '$0–$10'], ['Strike plate filing or adjustment', '$0 DIY / $75–$150 handyman'], ['Door planing (seasonal fix)', '$100–$250 handyman'], ['Foundation evaluation (free in DFW)', '$0 — most companies offer free inspections'], ['Foundation repair (per pier)', '$1,500–$3,000']].map(([item, cost]) => (
            <div key={item} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #1e3a5f' }}>
              <span style={{ color: '#94a3b8' }}>{item}</span>
              <span style={{ color: '#F5E642' }}>{cost}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
