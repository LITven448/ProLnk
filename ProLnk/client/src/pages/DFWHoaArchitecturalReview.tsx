import { useState } from 'react';

type ProjectType = 'Fence' | 'Addition' | 'Exterior Paint' | 'Landscaping' | 'Driveway' | 'Pool' | 'Solar Panels' | 'Deck/Patio';
type CommunityType = 'Master Plan' | 'Traditional' | 'Custom Homes' | 'Condo/Townhome';

const matrix: Record<ProjectType, Record<CommunityType, { required: boolean; timeline: string; tips: string }>> = {
  'Fence': {
    'Master Plan': { required: true, timeline: '4–8 weeks', tips: 'Height, material, color all specified. Cedar or wrought iron typical.' },
    'Traditional': { required: true, timeline: '2–6 weeks', tips: 'Survey required. Cannot extend beyond property lines.' },
    'Custom Homes': { required: false, timeline: 'None typically', tips: 'Check deed restrictions if no formal HOA.' },
    'Condo/Townhome': { required: true, timeline: '2–4 weeks', tips: 'Usually only applies to patios. No yard fencing in most condos.' },
  },
  'Addition': {
    'Master Plan': { required: true, timeline: '8–16 weeks', tips: 'Requires permit AND HOA. City permit usually triggers HOA review.' },
    'Traditional': { required: true, timeline: '6–12 weeks', tips: 'Setbacks, height limits, and impervious cover rules apply.' },
    'Custom Homes': { required: true, timeline: '4–8 weeks', tips: 'Deed restrictions often have setback/height requirements even without formal HOA.' },
    'Condo/Townhome': { required: true, timeline: '8–12 weeks', tips: 'Structural work almost always denied. Interior-only usually allowed.' },
  },
  'Exterior Paint': {
    'Master Plan': { required: true, timeline: '2–4 weeks', tips: 'Most master plan communities have approved color palettes. Sherwin-Williams is common supplier.' },
    'Traditional': { required: true, timeline: '1–3 weeks', tips: 'Send color chip + product name to ARC.' },
    'Custom Homes': { required: false, timeline: 'N/A', tips: 'No formal process but check deed restrictions.' },
    'Condo/Townhome': { required: false, timeline: 'N/A', tips: 'HOA controls exterior — you cannot paint exterior.' },
  },
  'Landscaping': {
    'Master Plan': { required: true, timeline: '2–4 weeks', tips: 'Tree removal, hardscape over 200 sq ft, and irrigation changes often require approval.' },
    'Traditional': { required: false, timeline: 'Varies', tips: 'Some HOAs require approval only for structures (retaining walls, pergolas).' },
    'Custom Homes': { required: false, timeline: 'N/A', tips: 'Generally unrestricted unless deed restriction covers it.' },
    'Condo/Townhome': { required: false, timeline: 'N/A', tips: 'HOA handles all common exterior landscaping.' },
  },
  'Driveway': {
    'Master Plan': { required: true, timeline: '3–6 weeks', tips: 'Material (concrete vs pavers), width, and expansion all regulated.' },
    'Traditional': { required: true, timeline: '2–4 weeks', tips: 'Width limits common. Circular drives may require variance.' },
    'Custom Homes': { required: false, timeline: 'N/A', tips: 'City permit still required for curb cut modification.' },
    'Condo/Townhome': { required: false, timeline: 'N/A', tips: 'HOA controls shared drive areas.' },
  },
  'Pool': {
    'Master Plan': { required: true, timeline: '6–10 weeks', tips: 'Equipment placement, decking material, fencing all reviewed.' },
    'Traditional': { required: true, timeline: '4–8 weeks', tips: 'Setback from property line typically 5 ft min in DFW.' },
    'Custom Homes': { required: false, timeline: 'N/A', tips: 'City permit required. No HOA review typically.' },
    'Condo/Townhome': { required: false, timeline: 'N/A', tips: 'Private pools almost never allowed in condos.' },
  },
  'Solar Panels': {
    'Master Plan': { required: true, timeline: '3–6 weeks', tips: 'TX law limits HOA restrictions on solar but placement/angle rules allowed.' },
    'Traditional': { required: true, timeline: '2–4 weeks', tips: 'HOA cannot prohibit but can regulate placement. Push back if denied.' },
    'Custom Homes': { required: false, timeline: 'N/A', tips: 'Unrestricted. City permit required.' },
    'Condo/Townhome': { required: false, timeline: 'N/A', tips: 'Roof access controlled by HOA. Rare exception for end units.' },
  },
  'Deck/Patio': {
    'Master Plan': { required: true, timeline: '4–8 weeks', tips: 'Footprint, material, and roof/cover structures all reviewed.' },
    'Traditional': { required: true, timeline: '3–6 weeks', tips: 'Covered structures usually trigger separate review from uncovered.' },
    'Custom Homes': { required: false, timeline: 'N/A', tips: 'Check deed restrictions for impervious cover limits.' },
    'Condo/Townhome': { required: true, timeline: '2–4 weeks', tips: 'Patio enclosures heavily regulated. Pergolas often denied.' },
  },
};

export default function DFWHoaArchitecturalReview() {
  const [project, setProject] = useState<ProjectType | ''>('');
  const [community, setCommunity] = useState<CommunityType | ''>('');
  const [result, setResult] = useState<null | { required: boolean; timeline: string; tips: string }>(null);

  function calculate() {
    if (project && community) setResult(matrix[project][community]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>🏛️ DFW HOA Architectural Review Guide</div>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Find out if your project needs HOA approval, how long it takes, and tips for getting it approved in DFW.</p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>📋 Standard ARC Application Process</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>
            <div>1️⃣ Submit written application to ARC</div>
            <div>2️⃣ Include site plan + materials list</div>
            <div>3️⃣ ARC meets (often monthly in smaller HOAs)</div>
            <div>4️⃣ Receive written approval or denial</div>
            <div>5️⃣ Appeal to board within 30 days if denied</div>
            <div>6️⃣ Begin work only after written approval</div>
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>🔍 Check My Project</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Project Type</label>
              <select value={project} onChange={e => setProject(e.target.value as ProjectType)} style={{ width: '100%', marginTop: 4, padding: '0.6rem', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 8 }}>
                <option value=''>Select project...</option>
                {(Object.keys(matrix) as ProjectType[]).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Community Type</label>
              <select value={community} onChange={e => setCommunity(e.target.value as CommunityType)} style={{ width: '100%', marginTop: 4, padding: '0.6rem', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 8 }}>
                <option value=''>Select community...</option>
                <option>Master Plan</option>
                <option>Traditional</option>
                <option>Custom Homes</option>
                <option>Condo/Townhome</option>
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.7rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>Check Requirements</button>
        </div>

        {result && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', borderLeft: `4px solid ${result.required ? '#ef4444' : '#22c55e'}` }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>📊 Approval Requirements</div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 2 }}>
              <div>{result.required ? '🔴 HOA Approval Required' : '🟢 Approval Not Required'}</div>
              <div>⏰ Typical Timeline: {result.timeline}</div>
              <div style={{ marginTop: '0.5rem', color: '#e2e8f0′ }}>💡 {result.tips}</div>
            </div>
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.75rem' }}>⚠️ Appeal Rights in Texas</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.8 }}>TX Property Code §202 limits HOA power — solar panels cannot be outright banned • Reasonable rules on placement allowed • Always get denial in writing before appealing to the board • Large HOAs have ombudsman process through TX AG office
          </div>
        </div>
      </div>
    </div>
  );
}
