import { useState } from 'react';

type Skill = 'General Labor' | 'Carpentry / Framing' | 'Plumbing' | 'Electrical' | 'HVAC' | 'Painting' | 'Landscaping' | 'Project Management';
type TimeAvailable = '1–4 hrs/month' | '4–8 hrs/month' | '1–2 days/month' | '3+ days/month';

const opportunities: Record<string, { org: string; mission: string; commitment: string; impact: string; contact: string; proLnkMatch: boolean }[]> = {
  'General Labor': [
    { org: 'Habitat for Humanity DFW', mission: 'Build affordable homes for families in need', commitment: '1–2 Saturdays/month', impact: 'Help complete 50+ homes/year across DFW', contact: 'habitatdfw.org/volunteer', proLnkMatch: true },
    { org: 'Rebuilding Together DFW', mission: 'Repair homes for elderly and disabled homeowners', commitment: 'National Rebuild Day (April) + year-round', impact: 'Preserve safe housing for 200+ households/year', contact: 'rebuildingtogetherdfw.org', proLnkMatch: true },
  ],
  Plumbing: [
    { org: 'Rebuilding Together DFW', mission: 'Critical plumbing repairs for low-income homeowners', commitment: '1 day/project, 1–2 projects/quarter', impact: 'Prevent displacement from unsafe plumbing — high demand', contact: 'rebuildingtogetherdfw.org/skilled', proLnkMatch: true },
    { org: 'United Way DFW Home Repair', mission: 'Emergency plumbing repairs for crisis situations', commitment: 'On-call 1–2 days/month', impact: 'Stop crisis evictions and unsafe conditions', contact: 'unitedwaydfw.org/homerepair', proLnkMatch: false },
  ],
  Electrical: [
    { org: 'Rebuilding Together DFW', mission: 'Electrical safety updates for aging homes', commitment: 'Weekend projects, 1x/month', impact: 'Eliminate fire hazards in homes with knob-and-tube wiring', contact: 'rebuildingtogetherdfw.org/electrical', proLnkMatch: true },
    { org: 'North Texas Food Bank — Facilities', mission: 'Maintain electrical systems at distribution centers', commitment: '4–8 hrs/month', impact: 'Keep food distribution running for 200K+ families', contact: 'ntfb.org/volunteer', proLnkMatch: false },
  ],
  HVAC: [
    { org: 'Beat the Heat DFW', mission: 'Install/repair AC units for elderly during heat emergencies', commitment: 'June–September (heat season)', impact: 'Prevent heat-related deaths among at-risk seniors', contact: 'Contact Dallas DCHA for program access', proLnkMatch: true },
    { org: 'Rebuilding Together DFW', mission: 'HVAC repairs and weatherization for low-income homeowners', commitment: '1 day/project, flexible scheduling', impact: 'Reduce utility burden + improve health for vulnerable residents', contact: 'rebuildingtogetherdfw.org/hvac', proLnkMatch: true },
  ],
  Carpentry: [
    { org: 'Habitat for Humanity DFW', mission: 'Framing, finishing, and structural work on new Habitat homes', commitment: '1–2 Saturdays/month', impact: 'Your framing work becomes a family\’s home within 6 months', contact: 'habitatdfw.org/skilled-volunteer', proLnkMatch: true },
    { org: 'Rebuilding Together DFW', mission: 'Accessibility modifications (ramps, grab bars, door widening)', commitment: '1 day per project', impact: 'Enable elderly/disabled homeowners to age in place', contact: 'rebuildingtogetherdfw.org/accessibility', proLnkMatch: true },
  ],
  Painting: [
    { org: 'Rebuilding Together DFW', mission: 'Interior/exterior painting for home rehabilitation projects', commitment: 'Saturday workdays, 1–2x/month', impact: 'Improve dignity and property value for homeowners in need', contact: 'rebuildingtogetherdfw.org', proLnkMatch: false },
    { org: 'TexasWorks', mission: 'Transitional housing painting and renovation', commitment: 'Flexible — project-based', impact: 'Help families in transitional housing feel at home', contact: 'texasworks.org', proLnkMatch: false },
  ],
  Landscaping: [
    { org: 'Bonton Farms Community Garden', mission: 'Maintain urban farm serving South Dallas food desert', commitment: '4 hrs/week or 1 big volunteer day/month', impact: 'Provide fresh produce to 500+ South Dallas families', contact: 'bontonfarms.org/volunteer', proLnkMatch: false },
    { org: 'Rebuilding Together DFW', mission: 'Yard cleanup and safety landscaping for elderly homeowners', commitment: '1 day/project, flexible', impact: 'Eliminate fall/safety hazards and improve curb appeal', contact: 'rebuildingtogetherdfw.org', proLnkMatch: true },
  ],
  'Project Management': [
    { org: 'Habitat for Humanity DFW — Site Lead', mission: 'Coordinate volunteer crews on active build sites', commitment: '1 full Saturday/month + 2 hrs planning', impact: 'Multiply the impact of 10–20 general volunteers per day', contact: 'habitatdfw.org/site-leaders', proLnkMatch: false },
    { org: 'United Way DFW — Program Volunteer', mission: 'Manage home repair project logistics and client intake', commitment: '8 hrs/month', impact: 'Enable more families to receive repairs through better coordination', contact: 'unitedwaydfw.org/volunteer', proLnkMatch: false },
  ],
};

export default function DFWHomeownerVolunteerGuide() {
  const [skill, setSkill] = useState<Skill>('General Labor');
  const [time, setTime] = useState<TimeAvailable>('4–8 hrs/month');
  const [showResults, setShowResults] = useState(false);

  const matches = opportunities[skill] || [];

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', color: '#0A1628', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#1E6FD9', fontSize: 13, fontWeight: 600, letterSpacing: 2 }}>🤝 DFW HOMEOWNER GUIDE</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2, color: '#0A1628' }}>Volunteer & Give Back — DFW Homeowners</h1>
        <p style={{ color: '#4B6278', fontSize: 16, marginBottom: 32 }}>
          DFW homeowners and licensed pros can transform their community. From Habitat builds to emergency HVAC repairs for seniors, your skills have direct impact on housing stability in North Texas.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🏠', org: 'Habitat for Humanity DFW', stat: '50+ homes/year', desc: 'Builds affordable homes from ground up with volunteer labor' },
            { icon: '🔧', org: 'Rebuilding Together DFW', stat: '200+ families/year', desc: 'Critical repairs for elderly, disabled, and low-income homeowners' },
            { icon: '💙', org: 'United Way Home Repair', stat: 'Emergency response', desc: 'Crisis home repair to prevent unsafe conditions and evictions' },
            { icon: '☀️', org: 'Beat the Heat DFW', stat: 'June–Sept', desc: 'AC installation and repair for at-risk seniors during heat emergencies' },
          ].map(c => (
            <div key={c.org} style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', border: '1px solid #E2EBF3' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 15 }}>{c.org}</div>
              <div style={{ color: '#1E6FD9', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{c.stat}</div>
              <div style={{ color: '#4B6278', fontSize: 13 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', border: '1px solid #E2EBF3' }}>
          <h2 style={{ color: '#0A1628', fontSize: 18, marginBottom: 16 }}>🎯 Find Your Best Match</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', color: '#4B6278', fontSize: 13, marginBottom: 6 }}>YOUR SKILL / TRADE</label>
              <select value={skill} onChange={e => setSkill(e.target.value as Skill)}
                style={{ width: '100%', background: '#F8FAFC', border: '1px solid #C8DAE8', borderRadius: 8, padding: '10px 14px', color: '#0A1628', fontSize: 14 }}>
                {(Object.keys(opportunities) as Skill[]).map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#4B6278', fontSize: 13, marginBottom: 6 }}>TIME AVAILABLE</label>
              <select value={time} onChange={e => setTime(e.target.value as TimeAvailable)}
                style={{ width: '100%', background: '#F8FAFC', border: '1px solid #C8DAE8', borderRadius: 8, padding: '10px 14px', color: '#0A1628', fontSize: 14 }}>
                <option>1–4 hrs/month</option><option>4–8 hrs/month</option><option>1–2 days/month</option><option>3+ days/month</option>
              </select>
            </div>
          </div>
          <button onClick={() => setShowResults(true)}
            style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Find Volunteer Opportunities
          </button>
        </div>

        {showResults && matches.map(m => (
          <div key={m.org} style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', border: '1px solid #E2EBF3' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 2 }}>{m.org}</div>
                <div style={{ color: '#4B6278', fontSize: 14 }}>{m.mission}</div>
              </div>
              {m.proLnkMatch && (
                <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 20, padding: '4px 12px', fontWeight: 700, fontSize: 12, whiteSpace: 'nowrap' }}>⚡ ProLnk Partner</span>
              )}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
              <div style={{ color: '#4B6278', fontSize: 13 }}>⏱️ <strong>Commitment:</strong> {m.commitment}</div>
              <div style={{ color: '#4B6278', fontSize: 13 }}>🌟 <strong>Contact:</strong> {m.contact}</div>
              <div style={{ color: '#1E6FD9', fontSize: 13, gridColumn: '1 / -1' }}>💥 <strong>Your impact:</strong> {m.impact}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
