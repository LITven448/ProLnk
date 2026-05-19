import { useState } from 'react';

const dfwCities = ['Dallas','Fort Worth','Plano','Frisco','McKinney','Allen','Richardson','Garland','Mesquite','Irving','Arlington','Carrollton','Lewisville','Denton','Flower Mound','Grapevine','Southlake','Colleyville','Keller','Addison','Coppell','Rockwall','Rowlett','Wylie','Prosper','Celina','Little Elm','The Colony','Grand Prairie','Mansfield'];

type UtilityTask = {
  id: string;
  name: string;
  icon: string;
  timing: string;
  timingDetail: string;
  provider: string;
  phone: string;
  note: string;
  order: number;
};

function getChecklist(city: string, moveInDate: string): UtilityTask[] {
  const isOuterSuburb = ['Prosper','Celina','Little Elm','Wylie'].includes(city);
  const movIn = moveInDate ? new Date(moveInDate) : new Date();
  const closingDate = new Date(movIn);
  closingDate.setDate(movIn.getDate() - 1);
  const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return [
    { id: 'electric', name: 'Electricity', icon: '⚡', timing: `Before closing (${fmt(closingDate)} or earlier)`, timingDetail: 'Texas electricity must be in YOUR name before closing — the previous owner\’s service ends at closing. Visit PowerToChoose.org to pick a plan and schedule start date 2–3 days before closing.', provider: 'PowerToChoose.org (you pick REP)', phone: '800-332-7143 (PUCT helpline)', note: 'Choose a 12-month fixed rate plan. Bring your new address and closing date.', order: 1 },
    { id: 'water', name: 'Water & Sewer', icon: '💧', timing: `Day of closing (${fmt(movIn)})`, timingDetail: 'Water is typically included in closing — the title company handles the transfer. Confirm with your title company that water service will be in your name at closing. If not, call city utilities the day before.', provider: `${city} City Utility Billing`, phone: 'Search "[city] water utility"', note: 'Have your address and closing date. Ask about deposit requirements for new accounts.', order: 2 },
    { id: 'gas', name: 'Natural Gas', icon: '🔥', timing: isOuterSuburb ? 'N/A — check if home has gas' : `1–2 days before move-in (${fmt(new Date(movIn.getTime() - 86400000))})`, timingDetail: isOuterSuburb ? `${city} may be all-electric. Check your home\'s utility specifications before closing. If no gas appliances or hookups, you\'re all-electric.` : 'Call Atmos Energy to transfer service. A tech must visit for first-time activation — schedule it to align with your move-in so you have heat/hot water from day one.', provider: isOuterSuburb ? 'Check with builder/seller' : 'Atmos Energy', phone: isOuterSuburb ? 'N/A' : '888-286-6700', note: isOuterSuburb ? 'Confirm gas availability before purchase.' : 'Someone must be home for tech visit. Schedule AM appointment to get it done before movers arrive.', order: 3 },
    { id: 'internet', name: 'Internet', icon: '📡', timing: `Day of or day after move-in`, timingDetail: 'Schedule internet installation 1–2 weeks before move-in for a preferred window. AT&T Fiber is best where available. Spectrum requires no appointment for self-install in most cases.', provider: 'AT&T Fiber → Spectrum → Frontier', phone: 'AT&T: 800-288-2020 | Spectrum: 833-267-6094', note: 'Book early — weekend install windows fill up. Self-install kits ship in 2–3 days if available.', order: 4 },
    { id: 'trash', name: 'Garbage & Recycling', icon: '🗑️', timing: 'Day 1 (typically automatic)', timingDetail: 'In most DFW cities, trash service starts automatically when water service transfers. Bins may already be at the property. Call city solid waste to confirm your collection day and bin status.', provider: `${city} Solid Waste / City Utilities`, phone: 'Search "[city] solid waste"', note: 'Check if previous owner left bins. If not, call to request delivery (1–3 business days).', order: 5 },
    { id: 'postal', name: 'Mail Forwarding', icon: '📬', timing: '1–2 weeks before move-in', timingDetail: 'File a USPS Change of Address at usps.com ($1.10 ID verification fee). Forwarding starts within 7–10 business days.', provider: 'USPS', phone: '800-275-8777', note: 'Forward mail from your old address. Also update: bank, employer, IRS (Form 8822), subscriptions.', order: 6 },
  ].sort((a, b) => a.order - b.order);
}

export default function DFWServiceSetupChecklist() {
  const [city, setCity] = useState('');
  const [moveInDate, setMoveInDate] = useState('');
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const checklist = city && moveInDate ? getChecklist(city, moveInDate) : [];
  const toggle = (id: string) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  const completedCount = checklist.filter(t => checked[t.id]).length;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏠</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0A1628', margin: 0 }}>DFW New Homeowner Utility Setup</h1>
          <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Complete checklist with the right order, providers, and contacts for DFW utilities</p>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0A1628', fontSize: '1.1rem', marginTop: 0 }}>📋 Enter Your Details</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ color: '#64748b', fontSize: '0.8rem', display: 'block', marginBottom: '0.25rem' }}>Your DFW City</label>
              <select value={city} onChange={e => setCity(e.target.value)} style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: 6, padding: '0.5rem', color: '#1e293b', fontSize: '0.95rem' }}>
                <option value=''>Select city</option>
                {dfwCities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#64748b', fontSize: '0.8rem', display: 'block', marginBottom: '0.25rem' }}>Move-In Date</label>
              <input type='date' value={moveInDate} onChange={e => setMoveInDate(e.target.value)} style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: 6, padding: '0.5rem', color: '#1e293b', fontSize: '0.95rem', boxSizing: 'border-box' }} />
            </div>
          </div>
        </div>
        {checklist.length > 0 && (
          <>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>Progress: {completedCount} of {checklist.length} complete</span>
              <div style={{ background: '#F5E642', borderRadius: 100, height: 8, width: 200, overflow: 'hidden' }}>
                <div style={{ background: '#0A1628', height: '100%', width: `${((checklist.length - completedCount) / checklist.length) * 100}%`, float: 'right' }} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {checklist.map((task, i) => (
                <div key={task.id} onClick={() => toggle(task.id)} style={{ background: checked[task.id] ? '#f0fdf4' : '#fff', borderRadius: 10, padding: '1rem 1.25rem', border: `1px solid ${checked[task.id] ? '#86efac' : '#e2e8f0'}`, cursor: 'pointer', transition: 'all 0.15s' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ fontSize: '1.5rem', minWidth: 32, textAlign: 'center' }}>{checked[task.id] ? '✅' : task.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <span style={{ background: '#0A1628', color: '#F5E642', fontSize: '0.7rem', fontWeight: 700, width: 20, height: 20, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
                        <strong style={{ color: checked[task.id] ? '#16a34a' : '#0A1628' }}>{task.name}</strong>
                        <span style={{ background: checked[task.id] ? '#dcfce7' : '#f1f5f9', color: checked[task.id] ? '#16a34a' : '#64748b', fontSize: '0.75rem', padding: '0.1rem 0.5rem', borderRadius: 4 }}>{task.timing}</span>
                      </div>
                      <p style={{ color: '#475569', fontSize: '0.85rem', margin: '0 0 0.5rem', lineHeight: 1.6 }}>{task.timingDetail}</p>
                      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                        <div><span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Provider: </span><span style={{ color: '#0A1628', fontSize: '0.8rem', fontWeight: 600 }}>{task.provider}</span></div>
                        <div><span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Phone: </span><span style={{ color: '#0A1628', fontSize: '0.8rem', fontWeight: 600 }}>{task.phone}</span></div>
                      </div>
                      {task.note && <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.35rem', fontStyle: 'italic' }}>💡 {task.note}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {!checklist.length && (
          <div style={{ background: '#fff', borderRadius: 12, padding: '3rem', textAlign: 'center', border: '1px solid #e2e8f0', color: '#94a3b8' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
            <p>Select your city and move-in date above to generate your personalized utility setup timeline.</p>
          </div>
        )}
      </div>
    </div>
  );
}
