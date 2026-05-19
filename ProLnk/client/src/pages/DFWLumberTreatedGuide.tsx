import { useState } from 'react';

const treatedMatrix = [
  { application: "Deck posts in concrete", contact: "Ground contact", rating: "UC4B", treatment: "CA-C (copper azole)", lifespan: "25–40 years", cost: "$4–8/LF", note: "DFW termite pressure is extreme — never skip UC4B for in-ground posts" },
  { application: "Deck posts in concrete", contact: "Above ground", rating: "UC3B", treatment: "CA-C or ACQ", lifespan: "15–25 years", cost: "$3–6/LF", note: "Post must be 6\" above grade minimum in DFW code" },
  { application: "Deck framing (joists, beams)", contact: "Above ground", rating: "UC3B", treatment: "CA-C", lifespan: "15–25 years", cost: "$3–5/LF", note: "All DFW deck framing must be treated — no exceptions in IRC adopted code" },
  { application: "Fence posts", contact: "Ground contact", rating: "UC4A", treatment: "CA-C or ACQ", lifespan: "15–20 years", cost: "$2.50–5/LF", note: "DFW clay soil holds moisture longer — UC4A minimum, UC4B preferred" },
  { application: "Retaining wall (timber)", contact: "Ground contact", rating: "UC4B or UC4C", treatment: "CA-C high retention", lifespan: "20–30 years", cost: "$6–12/LF", note: "DFW's expansive clay creates constant pressure — use UC4C for walls >4 feet" },
  { application: "Pergola or gazebo rafters", contact: "Above ground exposed", rating: "UC3B", treatment: "CA-C", lifespan: "15–20 years", cost: "$3–5/LF", note: "Seal cut ends in DFW — the treatment stops at the cut edge" },
  { application: "Sill plate on concrete", contact: "Concrete contact", rating: "UC3B or UC4A", treatment: "CA-C", lifespan: "Life of structure", cost: "$3–5/LF", note: "DFW slab-on-grade — sill plate must be PT and separated by sill gasket" },
];

export default function DFWLumberTreatedGuide() {
  const [application, setApplication] = useState("");
  const [contact, setContact] = useState("");

  const result = treatedMatrix.find(r => r.application === application && r.contact === contact);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#E8EAF0", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🌲</div>
        <h1 style={{ color: "#F5E642″, fontSize: "1.8rem", marginBottom: "0.5rem" }}>DFW Treated Lumber Guide</h1>
        <p style={{ color: "#9BA3B5″, marginBottom: "2rem" }}>Pressure treated lumber for DFW outdoor projects — ground contact ratings, termite protection, and the switch from old CCA to new CA-C.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          <div style={{ background: "#1A2840″, borderRadius: 8, padding: "1.5rem" }}>
            <h3 style={{ color: "#F5E642″, marginTop: 0 }}>🐜 DFW Termite Threat</h3>
            <p style={{ color: "#9BA3B5″ }}>DFW is in termite zone 1 — the highest risk classification in the US. Subterranean termites are active year-round. Any wood in contact with soil or concrete must be treated to at minimum UC4A. Never use untreated lumber outdoors.</p>
          </div>
          <div style={{ background: "#1A2840″, borderRadius: 8, padding: "1.5rem" }}>
            <h3 style={{ color: "#F5E642″, marginTop: 0 }}>🧪 CCA vs CA-C</h3>
            <p style={{ color: "#9BA3B5″ }}>Old CCA (chromated copper arsenate) was phased out for residential use in 2004. New standard is CA-C (copper azole) or ACQ. Same performance, no arsenic. Identify by the green-gray color and retention stamp on the tag.</p>
          </div>
        </div>

        <div style={{ background: "#2A1A0A", borderRadius: 8, padding: "1rem 1.5rem", marginBottom: "2rem", border: "1px solid #F5A642″ }}>
          <div style={{ color: "#F5A642″, fontWeight: 700, marginBottom: "0.5rem" }}>📋 UC Rating Quick Reference</div>
          <div style={{ color: "#9BA3B5″, fontSize: "0.9rem", lineHeight: 1.8 }}>
            <div><strong style={{ color: "#E8EAF0″ }}>UC3B</strong> — Above ground, exterior, fully exposed (decks, fences above grade)</div>
            <div><strong style={{ color: "#E8EAF0″ }}>UC4A</strong> — Ground contact, general use (fence posts, landscape timbers)</div>
            <div><strong style={{ color: "#E8EAF0″ }}>UC4B</strong> — Ground contact, high hazard (deck posts, critical structural)</div>
            <div><strong style={{ color: "#E8EAF0″ }}>UC4C</strong> — Ground contact, severe (retaining walls, marine-adjacent)</div>
          </div>
        </div>

        <div style={{ background: "#1A2840″, borderRadius: 12, padding: "2rem", marginBottom: "2rem" }}>
          <h2 style={{ color: "#F5E642″, marginTop: 0 }}>Find Your Treatment Level</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
            <div>
              <label style={{ color: "#9BA3B5″, display: "block", marginBottom: "0.5rem" }}>DFW Application</label>
              <select value={application} onChange={e => setApplication(e.target.value)} style={{ width: "100%", padding: "0.75rem", background: "#0A1628″, color: "#E8EAF0", border: "1px solid #2A3A50", borderRadius: 6 }}>
                <option value="">Select application...</option>
                {[...new Set(treatedMatrix.map(r => r.application))].map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: "#9BA3B5″, display: "block", marginBottom: "0.5rem" }}>Ground Contact</label>
              <select value={contact} onChange={e => setContact(e.target.value)} style={{ width: "100%", padding: "0.75rem", background: "#0A1628″, color: "#E8EAF0", border: "1px solid #2A3A50", borderRadius: 6 }}>
                <option value="">Select contact type...</option>
                {[...new Set(treatedMatrix.map(r => r.contact))].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: "#0D2A1A", borderRadius: 8, padding: "1.5rem", border: "2px solid #F5E642″ }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "1rem" }}>
                <div><div style={{ color: "#9BA3B5″, fontSize: "0.8rem" }}>UC RATING</div><div style={{ color: "#F5E642", fontWeight: 700 }}>{result.rating}</div></div>
                <div><div style={{ color: "#9BA3B5″, fontSize: "0.8rem" }}>TREATMENT</div><div style={{ color: "#F5E642", fontWeight: 700 }}>{result.treatment}</div></div>
                <div><div style={{ color: "#9BA3B5″, fontSize: "0.8rem" }}>LIFESPAN</div><div style={{ color: "#F5E642", fontWeight: 700 }}>{result.lifespan}</div></div>
                <div><div style={{ color: "#9BA3B5″, fontSize: "0.8rem" }}>DFW COST</div><div style={{ color: "#F5E642", fontWeight: 700 }}>{result.cost}</div></div>
              </div>
              <div style={{ color: "#9BA3B5″, borderTop: "1px solid #2A3A50", paddingTop: "1rem" }}>💡 {result.note}</div>
            </div>
          )}
        </div>

        <div style={{ background: "#1A2840″, borderRadius: 8, padding: "1.5rem", textAlign: "center" }}>
          <p style={{ color: "#9BA3B5″, margin: "0 0 1rem" }}>Need a DFW deck or fence builder who specs treated lumber correctly?</p>
          <button style={{ background: "#F5E642″, color: "#0A1628", padding: "0.75rem 2rem", borderRadius: 6, border: "none", fontWeight: 700, cursor: "pointer", fontSize: "1rem" }}>Find a DFW Builder on ProLnk</button>
        </div>
      </div>
    </div>
  );
}
