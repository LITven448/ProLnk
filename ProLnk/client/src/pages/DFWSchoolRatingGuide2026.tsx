import { useState } from 'react';

const priorities: Record<string, { steps: string[]; note: string; areas: string[] }> = {
  "Test Scores": {
    steps: ["Visit GreatSchools.org — enter DFW address for ratings 1–10″,"Check TEA (Texas Education Agency) accountability ratings","Look at STAAR test pass rates — aim for 80%+ passing","Compare math AND reading scores separately","Check 3-year trend — improving schools matter more than snapshot"],
    note: "Frisco ISD and Carroll ISD (Southlake) consistently score in top 5% statewide.",
    areas: ["Frisco ISD","Carroll ISD — Southlake","Highland Park ISD","Coppell ISD","Allen ISD"],
  },
  "School Culture": {
    steps: ["Tour the school — schedule a visit before buying","Check TEA compliance history for disciplinary incidents","Read Niche.com reviews from current parents","Look at teacher turnover rate (request from campus)","Check student-to-counselor ratio — under 250:1 is good"],
    note: "Test scores alone miss culture. A high-scoring school with poor culture can harm outcomes.",
    areas: ["Grapevine-Colleyville ISD","Keller ISD","Prosper ISD","McKinney ISD","Lewisville ISD"],
  },
  "Boundary Changes": {
    steps: ["Call the district and ask about upcoming boundary reviews","Check district website for capital planning documents","New developments often trigger rezoning within 2–3 years","Ask your real estate agent about recent boundary history","Verify the specific campus — not just district — for your address"],
    note: "DFW is the fastest-growing metro in the US. Boundary shifts happen frequently as new schools open.",
    areas: ["Frisco ISD (rapid growth)","Prosper ISD (new schools opening)","Little Elm ISD","Celina ISD","Wylie ISD"],
  },
  "Open Enrollment": {
    steps: ["Ask district if open enrollment is available","Many DFW districts allow intra-district transfers","Magnet programs (Dallas ISD, FWISD) accept applicants outside boundary","Charter school applications are independent of address","Private schools in DFW average $8,000–25,000/yr tuition"],
    note: "Dallas ISD Townview magnet (ranked top public school in Texas) accepts citywide applicants.",
    areas: ["Dallas ISD Magnet Schools","Fort Worth ISD Choice Programs","KIPP DFW (Charter)","Uplift Education (Charter)","BASIS Texas (Charter)"],
  },
};

export default function DFWSchoolRatingGuide2026() {
  const [selected, setSelected] = useState<string>('');

  const result = selected ? priorities[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎓</div>
          <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 700, marginBottom: 8 }}>DFW School Rating Research Guide 2026</h1>
          <p style={{ color: '#9BA3B2', fontSize: 16 }}>Top-rated schools add 5–15% to home values — here is how to research them in DFW</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '⭐', label: 'GreatSchools.org', desc: 'Ratings 1–10 with test and equity scores' },
            { icon: '📊', label: 'TEA Accountability', desc: 'State ratings: A–F per campus' },
            { icon: '📈', label: 'Value Impact', desc: 'Top ISD can add 5–15% to home value' },
            { icon: '🗓️', label: 'Watch Boundaries', desc: 'DFW growth causes frequent rezoning' },
          ].map(card => (
            <div key={card.label} style={{ background: '#0F1E35', borderRadius: 12, padding: 18, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 4, fontSize: 14 }}>{card.label}</div>
              <div style={{ color: '#9BA3B2', fontSize: 13 }}>{card.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F1E35', borderRadius: 12, padding: 24, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🎯 What Is Your School Priority?</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {Object.keys(priorities).map(p => (
              <button key={p} onClick={() => setSelected(p)} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', background: selected === p ? '#F5E642′ : '#1A2E48', color: selected === p ? '#0A1628' : '#E8EAF0', fontWeight: 600, fontSize: 14 }}>{p}</button>
            ))}
          </div>
          {result && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, border: '1px solid #1E3A5F' }}>
                <h3 style={{ color: '#F5E642', marginBottom: 12, fontSize: 15 }}>📋 Research Steps</h3>
                {result.steps.map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 13, color: '#CBD5E1′ }}>
                    <span style={{ color: '#F5E642', flexShrink: 0 }}>{i + 1}.</span>
                    <span>{s}</span>
                  </div>
                ))}
                <div style={{ marginTop: 14, padding: '10px 14px', background: '#0F1E35', borderRadius: 8, fontSize: 13, color: '#9BA3B2', borderLeft: '3px solid #F5E642′ }}>{result.note}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, border: '1px solid #1E3A5F' }}>
                <h3 style={{ color: '#F5E642', marginBottom: 12, fontSize: 15 }}>📍 Top DFW Options</h3>
                {result.areas.map(a => (
                  <div key={a} style={{ padding: '8px 0', borderBottom: '1px solid #1A2E48', fontSize: 14 }}>{a}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F1E35', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>💡 School Ratings and Home Values</h2>
          <p style={{ color: '#9BA3B2', lineHeight: 1.7 }}>Research consistently shows that homes in top-rated school districts sell for 5–15% more than comparable homes nearby. In DFW, the Carroll ISD (Southlake) and Highland Park ISD premiums are among the highest in Texas. Even if you do not have children, school ratings affect your resale value and buyer pool significantly.</p>
        </div>
      </div>
    </div>
  );
}
