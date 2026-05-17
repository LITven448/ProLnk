import { useState } from 'react';

const stages = [
  { stage: 'Getting Quotes', emoji: '📋', title: 'Buried Value: Installer Certification', desc: 'Not all roofers are equal. A GAF Master Elite installer can offer 50-year warranties and better manufacturer backing. Only 2% of roofers earn this designation.', value: 'Ask every bidder: What is your manufacturer certification status? It directly affects your warranty coverage.' },
  { stage: 'Choosing Materials', emoji: '🏷️', title: 'Buried Value: Warranty Transferability', desc: 'A transferable warranty can add $3,000–$8,000 to a DFW home\'s sale value. Non-transferable warranties are worthless at sale.', value: 'Always select materials with transferable warranty. Document and store your warranty paperwork digitally.' },
  { stage: 'During Installation', emoji: '🔨', title: 'Buried Value: Proper Nailing & Underlayment', desc: 'DFW hail and wind events expose poor installation fast. Correct nail depth, 6-nail application in high-wind zones, and quality synthetic underlayment add 15–20 years of life.', value: 'Ask your pro: Are you following DFW wind zone nailing specs? This is the single biggest lifespan driver.' },
  { stage: 'Post-Install', emoji: '📸', title: 'Buried Value: Photo Documentation', desc: 'Insurance claims go smoother when you have pre- and post-installation photos. Timestamped drone photos are now standard for DFW insurance adjusters.', value: 'Request a photo report from your contractor. Upload to your Home Health Vault for future claims.' },
  { stage: 'Long-Term', emoji: '📈', title: 'Buried Value: ROI at Sale', desc: 'A properly installed roof with transferred warranty returns 60–80% of cost in DFW resale. An unknown-installer roof can trigger buyer inspection demands or price reductions.', value: 'Track your roof\'s age, materials, and warranty. ProLnk pros document everything for your Vault.' },
];

export default function DFWRoofingBuriedValues2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>PROLNK · DFW ROOFING GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🏠 Buried Value in Proper DFW Roofing</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>What most DFW homeowners miss — and how proper roofing decisions protect your investment for decades.</p>

        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>Select Your Decision Stage</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 36 }}>
          {stages.map((s, i) => (
            <div key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ background: selected === i ? '#1e3a5f' : '#0f2235', border: `1px solid ${selected === i ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: '16px 20px', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{s.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700 }}>{s.stage}</div>
                  <div style={{ color: '#94a3b8', fontSize: 13 }}>{s.title}</div>
                </div>
              </div>
              {selected === i && (
                <div style={{ marginTop: 12, background: '#0A1628', borderRadius: 8, padding: '12px 14px' }}>
                  <div style={{ color: '#cbd5e1', fontSize: 13 }}>{s.desc}</div>
                  <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 13, marginTop: 8 }}>💡 {s.value}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2235', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>🔍 How ProLnk Vets DFW Roofers</h2>
          <ul style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.8, paddingLeft: 18 }}>
            <li>Manufacturer certification verified (GAF, Owens Corning, CertainTeed)</li>
            <li>DFW wind zone installation experience confirmed</li>
            <li>Hail damage documentation and insurance claim experience required</li>
            <li>License and liability insurance checked before matching</li>
            <li>Homeowner reviews filtered specifically for DFW projects</li>
          </ul>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, color: '#0A1628', textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 17 }}>🏠 Get Matched with a Certified DFW Roofer</div>
          <div style={{ marginTop: 6, fontSize: 13 }}>ProLnk matches DFW homeowners with verified roofing professionals only.</div>
        </div>
      </div>
    </div>
  );
}