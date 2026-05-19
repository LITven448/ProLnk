import { useState } from 'react';

const myths = [
  {
    id: 1,
    myth: "Flushable wipes are safe to flush",
    verdict: "FALSE",
    verdictColor: "#FF4444″,
    icon: "🚽",
    truth: "\"Flushable\" wipes do not break down like toilet paper. They accumulate in DFW sewer lines and combine with grease to form massive clogs called fatbergs. Dallas Water Utilities explicitly warns against flushing any wipes.",
    tip: "Keep a small trash bin next to every toilet. No exceptions — even branded flushable wipes.",
  },
  {
    id: 2,
    myth: "Running water while using the disposal prevents clogs",
    verdict: "PARTIALLY TRUE",
    verdictColor: "#F59E0B",
    icon: "🌀",
    truth: "Cold water while running and 15 seconds after helps flush particles through. But it does NOT prevent clogs from fibrous foods (celery, artichokes), starchy foods (pasta, potato peels), or grease — which are the real culprits.",
    tip: "Never put fibrous, starchy, or greasy waste in your disposal regardless of water flow.",
  },
  {
    id: 3,
    myth: "Bleach tablets in the toilet tank are fine",
    verdict: "FALSE",
    verdictColor: "#FF4444″,
    icon: "🧪",
    truth: "Continuous bleach exposure degrades rubber flappers, fill valves, and seals inside your tank. Within 6 months you will likely need to replace internal components. DFW plumbers regularly diagnose running toilets caused solely by tank tablets.",
    tip: "Use in-bowl drop-in tablets instead, which do not contact tank components.",
  },
  {
    id: 4,
    myth: "A slow drain just needs chemical cleaner",
    verdict: "FALSE",
    verdictColor: "#FF4444″,
    icon: "🔧",
    truth: "Chemical drain cleaners rarely reach clogs deep in DFW drain lines and can damage older galvanized or PVC pipes with repeated use. A slow drain often signals buildup 10–20 feet down the line requiring a snake or hydro-jet.",
    tip: "Try a drain snake first. If the problem recurs within weeks, call a licensed plumber for a camera inspection.",
  },
];

export default function DFWPlumbingMythsGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A1628″, color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔧</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″, marginBottom: 8 }}>DFW Plumbing Myths Guide 2026</h1>
          <p style={{ color: "#94A3B8″, fontSize: 15 }}>Plumbing misconceptions that damage pipes and cost DFW homeowners thousands.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {myths.map((m) => (
            <div key={m.id} onClick={() => setSelected(selected === m.id ? null : m.id)}
              style={{ backgroundColor: "#122040″, border: `2px solid ${selected === m.id ? "#F5E642" : "#1E3A5F"}`, borderRadius: 12, padding: 20, cursor: "pointer", transition: "border-color 0.2s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 28 }}>{m.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>"{m.myth}"</p>
                  <span style={{ backgroundColor: m.verdictColor, color: "#fff", borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>{m.verdict}</span>
                </div>
                <span style={{ color: "#F5E642″, fontSize: 20 }}>{selected === m.id ? "▲" : "▼"}</span>
              </div>
              {selected === m.id && (
                <div style={{ marginTop: 16, borderTop: "1px solid #1E3A5F", paddingTop: 16 }}>
                  <p style={{ color: "#CBD5E1″, lineHeight: 1.6, marginBottom: 12 }}>{m.truth}</p>
                  <div style={{ backgroundColor: "#0A1628″, borderLeft: "3px solid #F5E642", padding: "10px 14px", borderRadius: 6 }}>
                    <p style={{ color: "#F5E642″, fontSize: 13, fontWeight: 600 }}>💡 Pro Tip: {m.tip}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, backgroundColor: "#122040″, borderRadius: 12, padding: 24, textAlign: "center" }}>
          <p style={{ color: "#F5E642″, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🔧 Get a Vetted DFW Plumber</p>
          <p style={{ color: "#94A3B8″, fontSize: 14 }}>ProLnk matches you with licensed, insured plumbers across the Dallas-Fort Worth metroplex.</p>
        </div>
      </div>
    </div>
  );
}
