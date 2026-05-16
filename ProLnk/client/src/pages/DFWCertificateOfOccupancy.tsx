import { useState } from 'react';

const cityCOData: Record<string, { coRequired: string; process: string; timeline: string; commonRejections: string }> = {
  Dallas: { coRequired: 'Required for all new construction and major renovations (structural, use change, additions over 500 sqft)', process: 'Apply through Dallas DSD after final inspection passes. CO issued same day or next business day upon final approval.', timeline: '1-3 business days after final inspection passes. Rush processing available for closing deadlines.', commonRejections: 'Smoke detector not operational, HVAC not functional, grading not complete, missing address number visible from street' },
  Plano: { coRequired: 'Required for new residential, commercial, and any change of occupancy. Major renovations (structural or systems) require CO amendment.', process: 'Final inspection must pass all trades. CO application submitted through Plano permits portal after all inspections green.', timeline: '2-5 business days after final inspection. Certificate mailed and available online.', commonRejections: 'Landscaping not complete per approved plan, accessibility requirements not met, fire suppression final not cleared' },
  Frisco: { coRequired: 'Required for all new construction. Frisco also requires CO for pool additions and accessory structures over 200 sqft.', process: 'All inspections must pass including health (if applicable). Frisco issues Temporary CO (TCO) for 90 days if minor items outstanding.', timeline: 'CO issued within 24 hours of final approval. TCO available for closings when minor punch items remain.', commonRejections: 'Driveway approach not complete, mailbox not installed, gas test not complete, exterior finish not complete' },
  McKinney: { coRequired: 'Required for new construction and additions. McKinney issues certificate of completion for remodels that do not change occupancy.', process: 'McKinney Development Services coordinates final inspection. CO issued after all department sign-offs (fire, building, planning).', timeline: '3-5 business days; expedited review available for $150 fee.', commonRejections: 'Fence permit not finaled, irrigation system not inspected, erosion control not removed, lot corners not marked' },
  Arlington: { coRequired: 'Required for all new buildings and any change of occupancy classification. Remodels may require CO amendment depending on scope.', process: 'All inspections must be approved. Arlington DSD issues CO electronically; physical copy available on request.', timeline: '2-4 business days after all inspections pass.', commonRejections: 'Accessible parking not striped, ramp slope out of spec, HVAC test and balance report not submitted for commercial' },
  'Fort Worth': { coRequired: 'Required for new construction, change of occupancy, and additions over 30% of existing floor area.', process: 'Fort Worth DSD coordinates multi-department review. CO issued after fire marshal and building department sign off.', timeline: '3-7 business days; Fort Worth has high volume — schedule final inspections early.', commonRejections: 'Fire lane striping not complete, address not posted at building, mechanical room clearances not per code' },
};

const projectTypes = [
  { id: 'newconstruction', label: 'New Residential Construction', notes: 'CO required before occupancy in all DFW cities. Lenders require CO at closing for new construction loans. Homeowners insurance typically requires CO or TCO to bind coverage on new builds.' },
  { id: 'addition', label: 'Home Addition', notes: 'Addition over ~200-500 sqft (varies by city) typically requires CO or CO amendment. Financing for additions secured by home equity often requires CO to finalize draw. Verify with AHJ whether CO amendment or new CO is required.' },
  { id: 'commercial', label: 'Commercial / Mixed Use', notes: 'CO required before any occupancy. Change of use (e.g., retail to restaurant) requires new CO even in existing building. Business license application in most DFW cities requires CO on file.' },
  { id: 'pool', label: 'Pool / Spa Addition', notes: 'Some DFW cities (Frisco, McKinney) require CO or certificate of completion for pools. Inspection includes barrier fencing, GFCI at equipment, bonding test, and anti-entrapment drain covers.' },
  { id: 'closing', label: 'Closing Without CO', notes: 'Buyers may close without CO using a Temporary Certificate of Occupancy (TCO) when minor punch items remain. TCO typically valid 90 days. Seller must complete items and get final CO within TCO window or face escrow holdback.' },
];

export default function DFWCertificateOfOccupancy() {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const project = projectTypes.find(p => p.id === selectedProject);
  const city = selectedCity ? cityCOData[selectedCity] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk · DFW Code Guides</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>📄 DFW Certificate of Occupancy Guide</h1>
        <p style={{ color: '#8899AA', marginBottom: 40, fontSize: 15 }}>When a CO is required in DFW, how to get one, what triggers rejection, how it affects insurance and closing, and what to do if you need to close without a CO.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: '#8899AA', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Project Type</label>
            <select value={selectedProject} onChange={e => setSelectedProject(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: '#0D1E35', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
              <option value="">Select project...</option>
              {projectTypes.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: '#8899AA', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>DFW City</label>
            <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: '#0D1E35', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
              <option value="">Select city...</option>
              {Object.keys(cityCOData).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {project && (
          <div style={{ background: '#0D1E35', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24, marginBottom: 20 }}>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{project.label}</div>
            <div style={{ color: '#C5D0DC', lineHeight: 1.7 }}>{project.notes}</div>
          </div>
        )}

        {city && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
            {[
              { label: 'CO Required For', value: city.coRequired },
              { label: 'How to Get a CO', value: city.process },
              { label: 'Typical Timeline', value: city.timeline },
              { label: 'Common Rejection Reasons', value: city.commonRejections },
            ].map(item => (
              <div key={item.label} style={{ background: '#0D1E35', border: '1px solid #F5E642', borderRadius: 10, padding: 18 }}>
                <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>{item.label}</div>
                <div style={{ color: '#C5D0DC', lineHeight: 1.6 }}>{item.value}</div>
              </div>
            ))}
          </div>
        )}

        {!project && !city && (
          <div style={{ background: '#0D1E35', borderRadius: 12, padding: 32, textAlign: 'center', color: '#8899AA' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🏛️</div>
            <div style={{ fontSize: 16 }}>Select a project type and DFW city to see CO requirements, the process to obtain one, typical timelines, and common rejection reasons.</div>
          </div>
        )}
      </div>
    </div>
  );
}
