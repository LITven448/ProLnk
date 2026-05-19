import { useState } from 'react';

export default function ProJobProfitCalculator() {
  const [jobValue, setJobValue] = useState(3000);
  const [materials, setMaterials] = useState(400);
  const [laborHours, setLaborHours] = useState(6);
  const [laborRate, setLaborRate] = useState(45);
  const [fuelCost, setFuelCost] = useState(25);
  const [toolWear, setToolWear] = useState(75);
  const [insurance, setInsurance] = useState(80);
  const [targetMonthlyNet, setTargetMonthlyNet] = useState(3000);

  const prolnkShare = Math.round(jobValue * 0.28);
  const proKeeps = Math.round(jobValue * 0.72);
  const laborCost = laborHours * laborRate;
  const totalCosts = materials + laborCost + fuelCost + toolWear + insurance;
  const netWithProLnk = proKeeps - totalCosts;
  const netWithoutProLnk = jobValue - totalCosts;
  const photoBoost = Math.round(netWithProLnk * 0.34);

  const avgNet = netWithProLnk;
  const jobsNeeded = avgNet > 0 ? Math.ceil(targetMonthlyNet / avgNet) : 99;

  const inputStyle = {
    background: '#F0F0ED',
    border: '1px solid #D4D4CC',
    borderRadius: '6px',
    padding: '8px 12px',
    fontSize: '15px',
    width: '100%',
    color: '#1A2035',
  };

  const labelStyle = {
    fontSize: '12px',
    fontWeight: '600',
    color: '#64748B',
    letterSpacing: '0.06em',
    marginBottom: '4px',
    display: 'block',
  };

  const cardStyle = (highlight: boolean) => ({
    background: highlight ? '#1A2035' : '#FFFFFF',
    border: `1px solid ${highlight ? '#1A2035' : '#E2E2DC'}`,
    borderRadius: '12px',
    padding: '20px',
    flex: 1,
    minWidth: '220px',
  });

  const netColor = (n: number) => n >= 0 ? (n > 500 ? '#16A34A' : '#CA8A04') : '#DC2626';

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF9', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '12px', color: '#1A2035', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '8px' }}>
            PROLNK PRO TOOL
          </div>
          <h1 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: '800', color: '#1A2035', lineHeight: 1.2 }}>
            Job Profit Calculator
          </h1>
          <p style={{ margin: 0, color: '#64748B', fontSize: '15px' }}>
            See your real take-home after every cost. Stop guessing.
          </p>
        </div>

        <div style={{
          background: '#FEF9C3',
          border: '1px solid #FDE047',
          borderRadius: '10px',
          padding: '14px 18px',
          marginBottom: '28px',
          fontSize: '14px',
          color: '#713F12',
        }}>
          💡 <strong>What does a job ACTUALLY cost you?</strong> Most pros underestimate true job cost by 40%. This calculator shows your real margin.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
          <div>
            <label style={labelStyle}>GROSS JOB VALUE — ${jobValue.toLocaleString()}</label>
            <input
              type="range" min={500} max={20000} step={100}
              value={jobValue}
              onChange={e => setJobValue(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#1A2035' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94A3B8' }}>
              <span>$500</span><span>$20,000</span>
            </div>
          </div>
          <div>
            <label style={labelStyle}>PROLNK COMMISSION (28%)</label>
            <div style={{
              background: '#F0F0ED', border: '1px solid #D4D4CC', borderRadius: '6px',
              padding: '8px 12px', fontSize: '15px', color: '#DC2626', fontWeight: '600',
            }}>
              -${prolnkShare.toLocaleString()}
            </div>
            <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>You keep 72% = ${proKeeps.toLocaleString()}</div>
          </div>
          <div>
            <label style={labelStyle}>MATERIALS COST</label>
            <input
              type="number" value={materials}
              onChange={e => setMaterials(Number(e.target.value))}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>LABOR HOURS</label>
            <input
              type="number" value={laborHours}
              onChange={e => setLaborHours(Number(e.target.value))}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>YOUR LABOR RATE ($/hr)</label>
            <input
              type="number" value={laborRate}
              onChange={e => setLaborRate(Number(e.target.value))}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>DRIVE / FUEL COST</label>
            <input
              type="number" value={fuelCost}
              onChange={e => setFuelCost(Number(e.target.value))}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>TOOL WEAR ($50-200 typical)</label>
            <input
              type="number" value={toolWear}
              onChange={e => setToolWear(Number(e.target.value))}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>INSURANCE ALLOCATION</label>
            <input
              type="number" value={insurance}
              onChange={e => setInsurance(Number(e.target.value))}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '28px' }}>
          <div style={cardStyle(false)}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#64748B', letterSpacing: '0.06em', marginBottom: '12px' }}>
              SOLO (NO PROLNK)
            </div>
            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '13px', color: '#94A3B8' }}>Gross</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#1A2035' }}>${jobValue.toLocaleString()}</div>
            </div>
            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '13px', color: '#94A3B8' }}>All costs</div>
              <div style={{ fontSize: '16px', color: '#DC2626' }}>-${totalCosts.toLocaleString()}</div>
            </div>
            <div style={{ borderTop: '1px solid #E2E2DC', paddingTop: '10px' }}>
              <div style={{ fontSize: '13px', color: '#94A3B8' }}>Net profit</div>
              <div style={{ fontSize: '26px', fontWeight: '800', color: netColor(netWithoutProLnk) }}>
                ${netWithoutProLnk.toLocaleString()}
              </div>
            </div>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '8px' }}>
              No AI lead flow. Manual marketing costs not included.
            </div>
          </div>

          <div style={cardStyle(true)}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#FBBF24', letterSpacing: '0.06em', marginBottom: '12px' }}>
              WITH PROLNK ⚡
            </div>
            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '13px', color: '#94A3B8' }}>You keep (72%)</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#F1F5F9' }}>${proKeeps.toLocaleString()}</div>
            </div>
            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '13px', color: '#94A3B8' }}>All costs</div>
              <div style={{ fontSize: '16px', color: '#F87171' }}>-${totalCosts.toLocaleString()}</div>
            </div>
            <div style={{ borderTop: '1px solid #2D4A6A', paddingTop: '10px' }}>
              <div style={{ fontSize: '13px', color: '#94A3B8' }}>Net profit</div>
              <div style={{ fontSize: '26px', fontWeight: '800', color: netWithProLnk >= 0 ? '#34D399' : '#F87171' }}>
                ${netWithProLnk.toLocaleString()}
              </div>
            </div>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '8px' }}>
              + AI leads, commission overrides, referral income
            </div>
          </div>
        </div>

        <div style={{
          background: '#F0FDF4',
          border: '1px solid #86EFAC',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '28px',
        }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#166534', marginBottom: '8px' }}>
            📸 The Photo Multiplier Effect
          </div>
          <div style={{ fontSize: '14px', color: '#15803D', lineHeight: 1.7 }}>
            If your job photos generate just <strong>2 more leads per job</strong>, your effective hourly rate increases by{' '}
            <strong style={{ fontSize: '18px' }}>34%</strong> — adding an estimated{' '}
            <strong>${photoBoost.toLocaleString()}/job</strong> in equivalent value over time.
            ProLnk AI auto-routes photo leads to your profile.
          </div>
        </div>

        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E2DC',
          borderRadius: '12px',
          padding: '24px',
        }}>
          <h2 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: '700', color: '#1A2035' }}>
            Break-Even Calculator
          </h2>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>TARGET MONTHLY NET INCOME</label>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontWeight: '700', color: '#1A2035' }}>$</span>
              <input
                type="number" value={targetMonthlyNet}
                onChange={e => setTargetMonthlyNet(Number(e.target.value))}
                style={{ ...inputStyle, width: '160px' }}
              />
            </div>
          </div>
          <div style={{
            background: '#1A2035',
            borderRadius: '10px',
            padding: '20px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '6px' }}>
              Jobs needed per month (at current margins)
            </div>
            <div style={{ fontSize: '48px', fontWeight: '800', color: '#FBBF24', lineHeight: 1 }}>
              {jobsNeeded}
            </div>
            <div style={{ fontSize: '13px', color: '#64748B', marginTop: '8px' }}>
              ~{Math.ceil(jobsNeeded / 4)} jobs/week · ${netWithProLnk > 0 ? netWithProLnk.toLocaleString() : 0} net per job
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
