import { useState } from 'react';

export default function PartnerLegacyIncomePlan() {
  const [networkSize, setNetworkSize] = useState(25);
  const [originationHomes, setOriginationHomes] = useState(50);
  const [yearsBuilt, setYearsBuilt] = useState(5);

  const networkAnnualIncome = networkSize * 149 * (0.07 + 0.12) * 12;
  const originationAnnualIncome = originationHomes * 2.5 * 18;
  const totalAnnualIncome = Math.round(networkAnnualIncome + originationAnnualIncome);
  const monthlyPassive = Math.round(totalAnnualIncome / 12);

  const assetValue = Math.round(totalAnnualIncome * 8);
  const transferableValue = Math.round(assetValue * 0.7);

  const legacyStreams = [
    {
      label: 'Network Override Income',
      icon: '🌐',
      description: 'Your downline continues earning — and you earn overrides on their matches indefinitely',
      annual: Math.round(networkAnnualIncome),
      transferable: true,
      color: '#3B82F6',
    },
    {
      label: 'Origination Rights',
      icon: '🏠',
      description: 'Homes in the vault generate fees forever — rights can be assigned to heirs per platform guidelines',
      annual: Math.round(originationAnnualIncome),
      transferable: true,
      color: '#F59E0B',
    },
    {
      label: 'Direct Match Income',
      icon: '🔨',
      description: 'Active income — requires your participation, does not transfer automatically',
      annual: Math.round(networkSize * 10 * 85),
      transferable: false,
      color: '#9CA3AF',
    },
  ];

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 16, padding: '32px', marginBottom: 24, color: 'white' }}>
          <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🏛️ Legacy Income Planning Guide</div>
          <div style={{ color: '#94A3B8', fontSize: 15 }}>Build a ProLnk network that outlasts your active participation — and becomes a transferable family asset</div>
        </div>

        <div style={{ background: 'white', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#0A1628', marginBottom: 16 }}>⚙️ Your Current Network & Rights</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, color: '#6B7280', display: 'block', marginBottom: 6 }}>Network Partners: {networkSize}</label>
              <input type="range" min={1} max={200} value={networkSize} onChange={e => setNetworkSize(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#6B7280', display: 'block', marginBottom: 6 }}>Homes in Vault: {originationHomes}</label>
              <input type="range" min={0} max={300} value={originationHomes} onChange={e => setOriginationHomes(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#6B7280', display: 'block', marginBottom: 6 }}>Years Active: {yearsBuilt}</label>
              <input type="range" min={1} max={20} value={yearsBuilt} onChange={e => setYearsBuilt(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642' }} />
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, color: 'white' }}>
            <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Current Annual Passive Income</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#F5E642' }}>${totalAnnualIncome.toLocaleString()}</div>
            <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 4 }}>${monthlyPassive.toLocaleString()}/mo passive</div>
          </div>
          <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid #E5E7EB' }}>
            <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 6 }}>Estimated Transferable Asset Value</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#059669' }}>${transferableValue.toLocaleString()}</div>
            <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>Based on 8x income multiple, 70% transferable</div>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#0A1628', marginBottom: 16 }}>💰 Income Stream Legacy Analysis</div>
          {legacyStreams.map((s, i) => (
            <div key={i} style={{ marginBottom: 20, padding: 16, background: '#F9FAFB', borderRadius: 10, border: '1px solid #E5E7EB' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 20 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0A1628', fontSize: 14 }}>{s.label}</div>
                    <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{s.description}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right', minWidth: 100 }}>
                  <div style={{ fontWeight: 800, fontSize: 18, color: s.color }}>${s.annual.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: '#9CA3AF' }}>per year</div>
                </div>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 20, background: s.transferable ? '#D1FAE5' : '#F3F4F6' }}>
                <span style={{ fontSize: 12 }}>{s.transferable ? '✅' : '❌'}</span>
                <span style={{ fontSize: 12, color: s.transferable ? '#065F46' : '#6B7280', fontWeight: 600 }}>
                  {s.transferable ? 'Transferable to heirs' : 'Requires active participation'}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: 12, padding: 24, marginBottom: 16, border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 700, color: '#0A1628', marginBottom: 14 }}>📜 Legacy Transfer Guidelines</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '👨‍👩‍👧', text: 'Partner status may transfer to an immediate family member under platform succession guidelines' },
              { icon: '📋', text: 'Origination rights can be formally assigned via a notarized rights transfer form' },
              { icon: '⏱️', text: 'A 12-month transition period is allowed for heirs to meet partner requirements' },
              { icon: '💼', text: 'Network override income continues during transition as long as downline remains active' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: 12, background: '#F8FAFC', borderRadius: 8, border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <span style={{ fontSize: 13, color: '#374151', lineHeight: 1.5 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#FFFBEB', border: '1px solid #F5E642', borderRadius: 12, padding: 16, fontSize: 13, color: '#78350F' }}>
          💡 Legacy transfer policies are subject to ProLnk platform terms. Consult legal counsel before estate planning around partner income assets. Asset values are estimates only.
        </div>
      </div>
    </div>
  );
}
