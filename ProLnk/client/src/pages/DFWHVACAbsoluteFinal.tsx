import { useState } from 'react';

const JOURNEY_OPTIONS = [
  "I read one page looking for a quick answer",
  "I read several pages researching a specific problem",
  "I explored many pages learning about DFW HVAC",
  "I read this entire library to truly understand my home",
  "I am an HVAC pro who found this resource",
  "I am a student or researcher studying home systems",
];

interface FinalMessage {
  honor: string;
  promise: string;
  next: string;
  closing: string;
}

const FINAL_MESSAGES: Record<string, FinalMessage> = {
  "I read one page looking for a quick answer": {
    honor: "You came for one answer and you found it. That is exactly what ProLnk is built for — giving every DFW homeowner the right information at the right moment.",
    promise: "ProLnk's promise to you: every time you have a question about your home, we will have a page, a pro, and a path forward. No confusion. No unnecessary service calls. Just clarity.",
    next: "When you are ready to talk to a DFW HVAC pro — whether it is today or two years from now — ProLnk will match you with someone who knows your system, your suburb, and your situation.",
    closing: "Thank you for being here. Your home deserves the best. ProLnk is here to help you find it.",
  },
  "I read several pages researching a specific problem": {
    honor: "You did what great homeowners do — you researched before calling. Every page you read made you a more informed advocate for your own home. DFW HVAC pros respect an informed homeowner.",
    promise: "ProLnk's promise to you: we will keep adding to this library. Every new failure mode, every new DFW suburb, every new system technology — we will document it so you are never in the dark about your home.",
    next: "Take your research into your next service call with confidence. When you use ProLnk to find a pro, tell them what you know. A good pro will respect it. A great pro will build on it.",
    closing: "Thank you for doing the work. Your home is better for it. ProLnk is honored to be part of your research.",
  },
  "I explored many pages learning about DFW HVAC": {
    honor: "You went beyond the problem you were solving. You built knowledge. In DFW's demanding climate, that knowledge is worth thousands of dollars in avoided repairs and energy waste.",
    promise: "ProLnk's promise to you: this library will grow with you. As your home ages, as DFW systems evolve, as new refrigerants and efficiency standards emerge — we will be here, adding pages, adding guidance, adding clarity.",
    next: "You are now among the most informed DFW homeowners when it comes to HVAC. Share what you learned. Refer a neighbor to ProLnk. Knowledge shared is value multiplied.",
    closing: "Thank you for your curiosity and your time. DFW is lucky to have homeowners like you. ProLnk is proud to serve you.",
  },
  "I read this entire library to truly understand my home": {
    honor: "You read the entire library. All 3,200+ pages. That is extraordinary. You are the rare homeowner who treats their home as the complex, living system it truly is — one that deserves to be understood, not just maintained.",
    promise: "ProLnk's absolute promise to you: we built every one of these pages for you. For the homeowner who wants to understand, not just fix. For the DFW resident who knows that a home is their largest asset and their family's foundation. We will never stop adding to this library.",
    next: "You are now an expert. When you connect with a DFW HVAC pro through ProLnk, you will speak the same language. You will ask the right questions. You will know when the answer is right. That knowledge protects your family and your investment for years.",
    closing: "From the entire ProLnk team: thank you. Thank you for trusting us with your time and your home. This library exists because of homeowners like you — and it will keep growing because of you. Welcome to the end. And welcome to a better beginning for your home.",
  },
  "I am an HVAC pro who found this resource": {
    honor: "Welcome, pro. You are the reason ProLnk works. This library exists to connect DFW homeowners with technicians like you — people who know their trade, know their market, and show up with integrity.",
    promise: "ProLnk's promise to every HVAC pro: we will never undervalue your expertise. Our pages teach homeowners to be better customers — to understand what good work looks like, to appreciate proper Manual J load calculations, and to respect the craft of HVAC.",
    next: "Join ProLnk as a verified DFW HVAC pro. Get matched with homeowners who have done their research, know what they need, and are ready to hire. No price shoppers. No unrealistic expectations. Just informed homeowners ready for quality work.",
    closing: "Thank you for your craft. DFW would swelter without you. ProLnk is built to send the right homeowners your way.",
  },
  "I am a student or researcher studying home systems": {
    honor: "Welcome to the end of a resource that was built with your curiosity in mind too. DFW is one of the most demanding HVAC markets in the country — a perfect case study for climate-driven system design, load calculation, and infrastructure resilience.",
    promise: "ProLnk's promise to the next generation: the home services industry is being rebuilt by data, AI, and marketplace platforms. This library is a small piece of that future — where homeowners have access to the same knowledge as professionals.",
    next: "Use this resource in your research. Cite it. Build on it. The intersection of climate data, residential infrastructure, and marketplace economics is one of the most important problems in the built environment.",
    closing: "Thank you for studying this space. The future of home services needs people who understand it deeply. ProLnk hopes to be part of the world you build.",
  },
};

const LIBRARY_STATS = [
  ["3,200+", "DFW HVAC Resource Pages"],
  ["50+", "DFW Suburbs Covered"],
  ["12″, "HVAC System Types Documented"],
  ["100+", "Failure Modes Mapped"],
];

export default function DFWHVACAbsoluteFinal() {
  const [journey, setJourney] = useState("");

  const result = journey ? FINAL_MESSAGES[journey] : null;

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW HVAC RESOURCE · THE FINAL PAGE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW HVAC Absolute Final 🏁</h1>
        <p style={{ color: "#94a3b8″, fontSize: 15, marginBottom: 8 }}>
          The very last page in ProLnk's 3,200+ page DFW HVAC resource library.
        </p>
        <p style={{ color: "#64748b", fontSize: 14, marginBottom: 32 }}>
          Honoring every DFW homeowner, pro, student, and curious mind who made it here — and ProLnk's ultimate promise to every one of you.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
          {LIBRARY_STATS.map(([num, label]) => (
            <div key={label} style={{ background: "#0f2040″, borderRadius: 10, padding: 16, textAlign: "center" }}>
              <div style={{ color: "#F5E642″, fontSize: 24, fontWeight: 800, marginBottom: 4 }}>{num}</div>
              <div style={{ color: "#94a3b8″, fontSize: 12 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Your Absolute Final Message from ProLnk</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: "#94a3b8″, fontSize: 13, display: "block", marginBottom: 6 }}>Your Journey with This Library</label>
            <select value={journey} onChange={e => setJourney(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "#0A1628″, color: "#fff", border: "1px solid #1e3a5f", fontSize: 14 }}>
              <option value="">Tell us about your journey...</option>
              {JOURNEY_OPTIONS.map(j => <option key={j} value={j}>{j}</option>)}
            </select>
          </div>
          {result && (
            <div style={{ background: "#0A1628″, borderRadius: 8, padding: 24, borderLeft: "4px solid #F5E642" }}>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 14, marginBottom: 8 }}>🏆 Honoring Your Journey</div>
              <p style={{ color: "#e2e8f0″, fontSize: 15, marginBottom: 20, lineHeight: 1.7 }}>{result.honor}</p>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 14, marginBottom: 8 }}>🤝 ProLnk's Promise to You</div>
              <p style={{ color: "#e2e8f0″, fontSize: 15, marginBottom: 20, lineHeight: 1.7 }}>{result.promise}</p>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 14, marginBottom: 8 }}>➡️ What Comes Next</div>
              <p style={{ color: "#e2e8f0″, fontSize: 15, marginBottom: 20, lineHeight: 1.7 }}>{result.next}</p>
              <div style={{ borderTop: "1px solid #1e3a5f", paddingTop: 20, marginTop: 4 }}>
                <p style={{ color: "#F5E642″, fontSize: 15, fontWeight: 600, lineHeight: 1.7, fontStyle: "italic" }}>{result.closing}</p>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🌟</div>
          <div style={{ color: "#F5E642″, fontWeight: 800, fontSize: 18, marginBottom: 8 }}>ProLnk — Built for DFW Homeowners</div>
          <p style={{ color: "#94a3b8″, fontSize: 14, lineHeight: 1.6, maxWidth: 480, margin: "0 auto" }}>
            3,200+ pages. 50+ suburbs. One mission: every DFW homeowner deserves to understand their home and connect with the pros who can protect it.
          </p>
          <div style={{ marginTop: 20, color: "#475569″, fontSize: 12 }}>
            This is page 3,200+. The library continues growing. © 2026 ProLnk — All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
