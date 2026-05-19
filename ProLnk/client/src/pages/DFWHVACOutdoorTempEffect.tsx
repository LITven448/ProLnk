import { useState } from 'react';

const outdoorTemps = [95, 100, 105, 108, 110, 113, 115];
const homeSizes = ['1,000–1,500 sq ft', '1,500–2,000 sq ft', '2,000–2,500 sq ft', '2,500–3,500 sq ft', '3,500+ sq ft'];

const baseCoolingLoads: Record<string, number> = {
  '1,000–1,500 sq ft': 24000,
  '1,500–2,000 sq ft': 30000,
  '2,000–2,500 sq ft': 36000,
  '2,500–3,500 sq ft': 42000,
  '3,500+ sq ft': 54000,
};

function getCapacityRetention(outdoorTemp: number): number {
  if (outdoorTemp <= 95) return 1.0;
  if (outdoorTemp <= 100) return 0.97;
  if (outdoorTemp <= 105) return 0.92;
  if (outdoorTemp <= 108) return 0.87;
  if (outdoorTemp <= 110) return 0.83;
  if (outdoorTemp <= 113) return 0.78;
  return 0.73;
}

function getComfortRating(retention: number, load: number, capacity: number): { label: string; color: string; detail: string } {
  const ratio = (capacity * retention) / load;
  if (ratio >= 1.05) return { label: 'Comfortable', color: '#22c55e', detail: 'System has adequate capacity to maintain setpoint at this outdoor temperature.' };
  if (ratio >= 0.95) return { label: 'Marginal', color: '#F5E642', detail: 'System is near its limit. You may see setpoint drift of 1-2°F during peak afternoon hours.' };
  if (ratio >= 0.85) return { label: 'Struggling', color: '#f97316', detail: 'System will run continuously and likely cannot maintain your setpoint. Expect 73-76°F indoors even with 70°F setpoint.' };
  return { label: 'Overwhelmed', color: '#ef4444', detail: 'System cannot keep up. Indoor temperatures will rise. This is when equipment failures occur and freon pressure spikes.' };
}

function getHelpfulTips(outdoorTemp: number): string[] {
  const tips = ['Close blinds on south and west windows before 2pm'];
  if (outdoorTemp >= 105) tips.push('Raise thermostat setpoint to 74-76°F to reduce runtime stress on compressor');
  if (outdoorTemp >= 108) tips.push('Run ceiling fans to improve perceived comfort at higher setpoints');
  if (outdoorTemp >= 110) tips.push('Avoid heat-generating appliances (oven, dryer) during 2pm-7pm peak');
  if (outdoorTemp >= 113) tips.push('Check refrigerant charge — low charge causes severe capacity loss at extreme temps');
  tips.push('Ensure condenser coils are clean — dirty coils lose 10-15% capacity');
  if (outdoorTemp >= 108) tips.push('If system has not been maintained this season, call HVAC tech before heat wave peaks');
  return tips;
}

export default function DFWHVACOutdoorTempEffect() {
  const [selectedTemp, setSelectedTemp] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState('');

  const result = selectedTemp !== null && selectedSize ? (() => {
    const retention = getCapacityRetention(selectedTemp);
    const load = baseCoolingLoads[selectedSize];
    const installedCapacity = load * 1.1;
    const comfort = getComfortRating(retention, load, installedCapacity);
    const tips = getHelpfulTips(selectedTemp);
    return { retention, load, installedCapacity, comfort, tips, actualCapacity: installedCapacity * retention };
  })() : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌞 DFW HVAC Outdoor Temperature Effect</div>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
            Every AC unit loses cooling capacity as outdoor temperature rises. In DFW, where temperatures regularly exceed the design rating of installed equipment, understanding this effect is critical for managing expectations and preventing failures.
          </p>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontWeight: 'bold', color: '#F5E642', marginBottom: '0.75rem' }}>📉 How Heat Affects AC Capacity</div>
          <ul style={{ color: '#94a3b8', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.4rem' }}>AC units are rated at <strong style={{ color: '#e2e8f0′ }}>95°F outdoor temp</strong> (ARI/AHRI standard)</li>
            <li style={{ marginBottom: '0.4rem' }}>Every 5°F above 95°F costs approximately <strong style={{ color: '#e2e8f0′ }}>3-5% of rated capacity</strong></li>
            <li style={{ marginBottom: '0.4rem' }}>At 115°F (common DFW heat wave), most units operate at <strong style={{ color: '#ef4444′ }}>70-75% of rated capacity</strong></li>
            <li style={{ marginBottom: '0.4rem' }}>Meanwhile, your home's cooling load is at <strong style={{ color: '#ef4444' }}>maximum</strong> — the worst possible combination</li>
            <li>This is why DFW homes need properly sized systems — at design conditions, there's no margin for error</li>
          </ul>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 'bold', color: '#F5E642', marginBottom: '1rem' }}>🔢 Check Your System at Any Temperature</div>

          <div style={{ marginBottom: '1rem' }}>
            <div style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>Current outdoor temperature (°F):</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {outdoorTemps.map(temp => (
                <button key={temp} onClick={() => setSelectedTemp(temp)}
                  style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', minWidth: '60px',
                    background: selectedTemp === temp ? '#F5E642′ : temp >= 110 ? '#3a1515' : temp >= 105 ? '#2a1a0a' : '#1e3a5f',
                    color: selectedTemp === temp ? '#0A1628′ : temp >= 110 ? '#fca5a5' : temp >= 105 ? '#fdba74' : '#e2e8f0',
                    fontWeight: selectedTemp === temp ? 'bold' : 'normal' }}>
                  {temp}°F
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>Home size:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {homeSizes.map(size => (
                <button key={size} onClick={() => setSelectedSize(size)}
                  style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', background: selectedSize === size ? '#F5E642′ : '#1e3a5f', color: selectedSize === size ? '#0A1628' : '#e2e8f0', fontWeight: selectedSize === size ? ’bold' : 'normal' }}>
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {result && (
          <div style={{ background: '#0f1f3d', borderRadius: '12px', padding: '1.5rem', borderLeft: `4px solid ${result.comfort.color}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontWeight: 'bold', color: '#e2e8f0′ }}>Comfort Outlook:</span>
              <span style={{ background: result.comfort.color, color: '#0A1628', padding: '0.25rem 0.75rem', borderRadius: '999px', fontWeight: 'bold' }}>{result.comfort.label}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ background: '#0A1628', borderRadius: '8px', padding: '0.75rem', textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Capacity at {selectedTemp}°F</div>
                <div style={{ color: result.comfort.color, fontSize: '1.5rem', fontWeight: 'bold' }}>{Math.round(result.retention * 100)}%</div>
                <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{Math.round(result.actualCapacity / 1000).toFixed(0)}k BTU/hr actual</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: '8px', padding: '0.75rem', textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Home Cooling Load</div>
                <div style={{ color: '#e2e8f0', fontSize: '1.5rem', fontWeight: 'bold' }}>{Math.round(result.load / 1000)}k BTU/hr</div>
                <div style={{ color: '#64748b', fontSize: '0.75rem' }}>at {selectedTemp}°F outdoor</div>
              </div>
            </div>
            <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.9rem' }}>{result.comfort.detail}</p>
            <div style={{ color: '#F5E642', fontWeight: 'bold', marginBottom: '0.5rem' }}>💡 What Helps Right Now:</div>
            <ul style={{ color: '#94a3b8', paddingLeft: '1.5rem' }}>
              {result.tips.map((tip, i) => <li key={i} style={{ marginBottom: '0.25rem' }}>{tip}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
