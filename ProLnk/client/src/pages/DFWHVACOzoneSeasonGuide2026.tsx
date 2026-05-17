import { useState } from 'react';

export default function DFWHVACOzoneSeasonGuide2026() {
  const [concern, setConcern] = useState('');
  const [situation, setSituation] = useState('');

  const getGuide = () => {
    if (!concern || !situation) return null;
    if (concern === 'high' && situation === 'no-filter') return { title: 'Urgent: Add Carbon Filtration', steps: ['Switch HVAC to recirculation mode June–September', 'Install activated carbon filter (not HEPA) to capture ozone', 'Seal return air leaks to prevent outdoor air infiltration', 'Schedule pre-season service before June 1'], note: 'HEPA filters capture particles, not ozone. Carbon is essential.' };
    if (concern === 'high' && situation === 'hepa-only') return { title: 'Upgrade Your Filtration', steps: ['HEPA alone does NOT capture ozone molecules', 'Add activated carbon pre-filter to existing HEPA setup', 'Enable recirculation mode on high-ozone days (AQI alerts)', 'Check weatherstripping on doors/windows'], note: 'DFW ozone season peaks July–August. Act before summer.' };
    if (concern === 'medium' && situation === 'carbon-filter') return { title: 'Maintain and Monitor', steps: ['Replace carbon filter every 3 months during ozone season', 'Download AirNow app for real-time DFW ozone AQI', 'Use recirculation mode on Code Orange and Red days', 'Keep vents closed during afternoon peak hours (1–7pm)'], note: 'You are ahead of most DFW homeowners. Maintain your system.' };
    return { title: 'Assess Your Current Setup', steps: ['Check your HVAC filter type (carbon vs HEPA vs fiberglass)', 'Locate your fresh-air intake damper and learn to close it', 'Sign up for DFW ozone alert notifications at airnow.gov', 'Budget $150–300 for activated carbon filtration upgrade'], note: 'DFW ranks among worst US metros for ground-level ozone. Protect your family.' };
  };

  const guide = getGuide();

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>DFW Air Quality Guide 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.2 }}>🌫️ DFW Ozone Season & HVAC Protection Guide</h1>
        <p style={{ color: '#9BA3B2', marginBottom: '2rem', fontSize: '1rem' }}>DFW ranks among the worst US metros for ground-level ozone (June–September). Learn how to protect your home with the right HVAC strategy.</p>

        <div style={{ background: '#111E35', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', color: '#F5E642', marginBottom: '1rem' }}>⚠️ Key Facts About DFW Ozone</h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {['DFW routinely exceeds EPA ozone standards June through September', 'Recirculation mode is your #1 defense — keeps outdoor ozone out', 'HEPA filters capture particles, NOT ozone molecules', 'Activated carbon (charcoal) filters DO capture ozone', 'Peak ozone hours: 1pm–7pm on hot, sunny, stagnant days'].map((fact, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ color: '#F5E642', fontSize: '1.1rem', flexShrink: 0 }}>📌</span>
                <span style={{ color: '#CBD2DC', fontSize: '0.95rem' }}>{fact}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', color: '#F5E642', marginBottom: '1rem' }}>🔍 Get Your Protection Guide</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', color: '#9BA3B2', fontSize: '0.9rem' }}>Your ozone concern level</label>
              <select value={concern} onChange={e => setConcern(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', color: '#E8EAF0', fontSize: '0.95rem' }}>
                <option value="">Select concern level...</option>
                <option value="high">High — I have asthma/allergy or young kids</option>
                <option value="medium">Medium — I want to be proactive</option>
                <option value="low">Low — Just curious</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', color: '#9BA3B2', fontSize: '0.9rem' }}>Your current HVAC filtration</label>
              <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', color: '#E8EAF0', fontSize: '0.95rem' }}>
                <option value="">Select your setup...</option>
                <option value="no-filter">Basic fiberglass filter only</option>
                <option value="hepa-only">HEPA filter, no carbon</option>
                <option value="carbon-filter">Activated carbon filter installed</option>
                <option value="unknown">Not sure what I have</option>
              </select>
            </div>
          </div>
        </div>

        {guide && (
          <div style={{ background: '#0F2744', border: '2px solid #F5E642', borderRadius: '12px', padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.2rem', color: '#F5E642', marginBottom: '1rem' }}>✅ {guide.title}</h2>
            <div style={{ display: 'grid', gap: '0.6rem', marginBottom: '1rem' }}>
              {guide.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span style={{ color: '#CBD2DC', fontSize: '0.95rem' }}>{step}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#1A2F4A', borderRadius: '8px', padding: '0.75rem 1rem', color: '#9BA3B2', fontSize: '0.88rem', fontStyle: 'italic' }}>💡 {guide.note}</div>
          </div>
        )}
      </div>
    </div>
  );
}