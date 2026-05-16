import { useState } from 'react';

const situationData: Record<string, { hasDemand: boolean; peakKw: number; demandCharge: number; strategy: string; savings: number }> = {
  'Residential flat rate (most DFW)': { hasDemand: false, peakKw: 0, demandCharge: 0, strategy: 'You likely have no demand charges — focus on TOU shifting instead.', savings: 0 },
  'Small business / TDU-billed commercial': { hasDemand: true, peakKw: 12, demandCharge: 84, strategy: 'Stagger AC startup, use smart thermostat to flatten peaks during 15-min intervals.', savings: 35 },
  'Larger home on commercial meter': { hasDemand: true, peakKw: 18, demandCharge: 126, strategy: 'Battery storage + soft-start capacitors reduce startup spikes significantly.', savings: 62 },
  'HOA / multi-unit residential': { hasDemand: true, peakKw: 45, demandCharge: 315, strategy: 'Staggered unit startup schedules + demand response enrollment can cut charges 40–60%.', savings: 145 },
};

const homeSizeAdj: Record<string, number> = {
  '< 1,500 sq ft': -0.8,
  '1,500–2,500 sq ft': 0,
  '2,500–3,500 sq ft': 0.9,
  '3,500+ sq ft': 1.8,
};

export default function DFWHVACDemandChargeGuide() {
  const [situation, setSituation] = useState('Small business / TDU-billed commercial');
  const [homeSize, setHomeSize] = useState('1,500–2,500 sq ft');

  const data = situationData[situation] ?? situationData['Small business / TDU-billed commercial'];
  const adj = homeSizeAdj[homeSize] ?? 0;
  const adjustedCharge = data.hasDemand ? Math.max(0, Math.round(data.demandCharge + adj * 7)) : 0;
  const adjustedSavings = data.hasDemand ? Math.max(0, Math.round(data.savings + adj * 4)) : 0;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 }}>
          ⚡ ProLnk · DFW HVAC Guide
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          DFW Demand Charges & HVAC
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          Most DFW homeowners pay flat or TOU rates — but some commercial meters and TDU-billed
          accounts include demand charges based on your peak 15-minute power draw. HVAC startup
          is the #1 cause of demand spikes.
        </p>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>
            🔢 DFW Demand Reduction Calculator
          </h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 14, color: '#94A3B8', marginBottom: 8 }}>Utility Situation</label>
            <select
              value={situation}
              onChange={e => setSituation(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}
            >
              {Object.keys(situationData).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 14, color: '#94A3B8', marginBottom: 8 }}>Home/Facility Size</label>
            <select
              value={homeSize}
              onChange={e => setHomeSize(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}
            >
              {Object.keys(homeSizeAdj).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 8 }}>Recommended Strategy</div>
            <div style={{ fontSize: 15, color: '#CBD5E1', lineHeight: 1.6 }}>{data.strategy}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 38, fontWeight: 900, color: data.hasDemand ? '#f87171' : '#4ade80' }}>
                {data.hasDemand ? `$${adjustedCharge}` : 'None'}
              </div>
              <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 4 }}>Est. Monthly Demand Charge</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 38, fontWeight: 900, color: '#4ade80' }}>
                {data.hasDemand ? `$${adjustedSavings}` : '—'}
              </div>
              <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 4 }}>Est. Monthly Reduction</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🛠️ Demand Reduction Tools</h2>
          {[
            ['Soft-Start Capacitors ($150–300)', 'Reduces AC startup current draw by 40–70%. Pays back in 6–12 months on demand-billed meters.'],
            ['Smart Thermostat Sequencing', 'Prevents simultaneous startup of multiple HVAC units — critical for multi-unit or large homes.'],
            ['Battery Storage (Powerwall etc.)', 'Discharges during 15-min peak intervals, clipping demand spikes at the source.'],
            ['Demand Response Enrollment', 'ERCOT and some DFW retailers offer credits for agreeing to brief curtailments during grid stress.'],
          ].map(([title, body]) => (
            <div key={title} style={{ borderLeft: '3px solid #F5E642', paddingLeft: 16, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 17, marginBottom: 6 }}>
            🔧 Get a DFW demand audit
          </div>
          <div style={{ color: '#1E3A5F', fontSize: 14 }}>
            ProLnk connects you with licensed electricians and HVAC pros who specialize in demand reduction.
          </div>
        </div>
      </div>
    </div>
  );
}
