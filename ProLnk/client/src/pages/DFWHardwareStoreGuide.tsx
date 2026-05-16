import { useState } from 'react';

const storeMatrix = [
  { project: "Quick fix / emergency", location: "Anywhere in DFW", store: "Ace Hardware", tip: "Ask for the neighborhood location", note: "Ace staff know your neighborhood's homes. Best for quick help, keys cut, small parts. 8+ DFW locations." },
  { project: "Large framing project", location: "North DFW (Plano, Frisco)", store: "Home Depot Pro Desk", tip: "Call the Pro Desk ahead", note: "DFW's construction boom means lumber stock varies wildly. Call before driving. Home Depot Frisco/Allen stocks deep." },
  { project: "Large framing project", location: "South/West DFW (Fort Worth, Arlington)", store: "Lowe's Fort Worth area", tip: "Check online stock before going", note: "Fort Worth Lowe's typically better stocked than HD in west DFW corridors. Builder's FirstSource nearby for bulk." },
  { project: "Finish carpentry / molding", location: "Anywhere in DFW", store: "McCoy's Building Supply or specialty lumber yard", tip: "Call ahead for hardwood or specialty profiles", note: "Home Depot and Lowe's carry limited molding profiles. McCoy's and specialty yards carry 3x the selection for trim work." },
  { project: "Plumbing rough-in parts", location: "Anywhere in DFW", store: "Ferguson Plumbing Supply", tip: "Walk in — they serve homeowners", note: "Ferguson is contractor-first but open to homeowners. Carry parts HD/Lowe's don't stock. Multiple DFW locations." },
  { project: "Electrical supplies", location: "Anywhere in DFW", store: "Dealers Electrical Supply or Home Depot", tip: "Dealers for commercial/hard-to-find, HD for standard", note: "DFW's construction growth sometimes clears HD of wire. Dealers Electrical in Carrollton/Irving stocks full commercial range." },
  { project: "Paint and coatings", location: "Anywhere in DFW", store: "Sherwin-Williams (pro account) or HD", tip: "SW contractor pricing available to homeowners", note: "Sherwin-Williams' DFW stores do custom formulations. For exterior DFW paint, ask specifically for heat-resistant formulas." },
  { project: "Landscaping / outdoor", location: "Anywhere in DFW", store: "Lowe's Garden Center or SiteOne Landscape Supply", tip: "SiteOne for bulk quantities", note: "SiteOne serves landscapers but sells to homeowners. Better quality river rock and mulch than big box for DFW landscaping." },
];

export default function DFWHardwareStoreGuide() {
  const [project, setProject] = useState("");
  const [location, setLocation] = useState("");

  const result = storeMatrix.find(r => r.project === project && r.location === location);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#E8EAF0", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🏪</div>
        <h1 style={{ color: "#F5E642", fontSize: "1.8rem", marginBottom: "0.5rem" }}>DFW Hardware Store Guide</h1>
        <p style={{ color: "#9BA3B5", marginBottom: "2rem" }}>When to use Home Depot vs Lowe's vs Ace vs specialty stores — and how DFW's construction boom affects what's in stock.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { store: "🟠 Home Depot", best: "Volume, tool rental, contractor pricing. Pro Desk for large orders. Stock varies by DFW location." },
            { store: "🔵 Lowe's", best: "Appliances, finish materials, often cleaner stores. Better west DFW presence than HD in some areas." },
            { store: "🔴 Ace Hardware", best: "Neighborhood knowledge, small parts, quick service. Worth the slight premium for expert help and convenience." },
          ].map(item => (
            <div key={item.store} style={{ background: "#1A2840", borderRadius: 8, padding: "1.25rem" }}>
              <div style={{ fontWeight: 700, color: "#F5E642", marginBottom: "0.5rem" }}>{item.store}</div>
              <p style={{ color: "#9BA3B5", fontSize: "0.85rem", margin: 0, lineHeight: 1.6 }}>{item.best}</p>
            </div>
          ))}
        </div>

        <div style={{ background: "#1A2840", borderRadius: 8, padding: "1.5rem", marginBottom: "2rem" }}>
          <h3 style={{ color: "#F5E642", marginTop: 0 }}>🏗️ How DFW's Construction Boom Affects You</h3>
          <p style={{ color: "#9BA3B5", lineHeight: 1.7 }}>DFW is one of the fastest-growing metros in the US. That means contractor crews buy out lumber, drywall, and fixtures weekly. Check online inventory before driving to any big box. North DFW (Frisco, McKinney, Prosper) stores restock fastest — southern and western stores often run low. Tuesday–Thursday mornings have the best stock.</p>
        </div>

        <div style={{ background: "#1A2840", borderRadius: 12, padding: "2rem", marginBottom: "2rem" }}>
          <h2 style={{ color: "#F5E642", marginTop: 0 }}>Where to Shop</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
            <div>
              <label style={{ color: "#9BA3B5", display: "block", marginBottom: "0.5rem" }}>Project Type</label>
              <select value={project} onChange={e => setProject(e.target.value)} style={{ width: "100%", padding: "0.75rem", background: "#0A1628", color: "#E8EAF0", border: "1px solid #2A3A50", borderRadius: 6 }}>
                <option value="">Select project...</option>
                {[...new Set(storeMatrix.map(r => r.project))].map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: "#9BA3B5", display: "block", marginBottom: "0.5rem" }}>DFW Location</label>
              <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: "100%", padding: "0.75rem", background: "#0A1628", color: "#E8EAF0", border: "1px solid #2A3A50", borderRadius: 6 }}>
                <option value="">Select location...</option>
                {[...new Set(storeMatrix.map(r => r.location))].map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: "#0D2A1A", borderRadius: 8, padding: "1.5rem", border: "2px solid #F5E642" }}>
              <div style={{ color: "#F5E642", fontWeight: 700, fontSize: "1.2rem", marginBottom: "0.75rem" }}>Go to: {result.store}</div>
              <div style={{ color: "#9BA3B5", fontSize: "0.9rem", marginBottom: "0.75rem" }}>💡 Pro tip: {result.tip}</div>
              <div style={{ color: "#9BA3B5", borderTop: "1px solid #2A3A50", paddingTop: "0.75rem", lineHeight: 1.6 }}>{result.note}</div>
            </div>
          )}
        </div>

        <div style={{ background: "#1A2840", borderRadius: 8, padding: "1.5rem", textAlign: "center" }}>
          <p style={{ color: "#9BA3B5", margin: "0 0 1rem" }}>Rather have a pro handle materials and sourcing for you?</p>
          <button style={{ background: "#F5E642", color: "#0A1628", padding: "0.75rem 2rem", borderRadius: 6, border: "none", fontWeight: 700, cursor: "pointer", fontSize: "1rem" }}>Find a DFW Pro on ProLnk</button>
        </div>
      </div>
    </div>
  );
}
