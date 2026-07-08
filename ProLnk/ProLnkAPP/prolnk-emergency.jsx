// prolnk-emergency.jsx — Emergency on-call: signup opt-in card + full-screen live alert
const { useState: useEm, useEffect: useEmFx } = React;

// ── opt-in card (used in onboarding Plan step + could sit in settings) ──
function EmergencyOptIn({ on, onToggle }) {
  return (
    <button onClick={onToggle} style={{
      display: 'flex', alignItems: 'flex-start', gap: 12, padding: 14, borderRadius: 14, cursor: 'pointer', textAlign: 'left', width: '100%',
      border: `1.5px solid ${on ? '#DC2626' : PL.border}`, background: on ? '#FEF2F2' : '#fff', marginBottom: 24,
    }}>
      <div style={{ width: 38, height: 38, borderRadius: 10, background: on ? '#DC2626' : '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Ic name="siren" size={20} color={on ? '#fff' : '#DC2626'} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <span style={{ fontSize: 14.5, fontWeight: 800, color: PL.ink }}>Emergency on-call</span>
          <span style={{ fontSize: 12, fontWeight: 800, color: on ? '#DC2626' : PL.faint, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{on ? 'Opted in' : 'Free'}</span>
        </div>
        <div style={{ fontSize: 12.5, color: PL.muted, lineHeight: 1.45, marginTop: 3 }}>Burst pipes, no-heat nights, sparking panels. A loud alert hits every on-call pro — first to accept gets the job. Emergency rates run higher, and being on call boosts your rank on regular referrals too.</div>
        {on && <div style={{ fontSize: 11.5, color: '#DC2626', fontWeight: 700, marginTop: 5, display: 'flex', alignItems: 'center', gap: 5 }}><Ic name="arrowUp" size={13} color="#DC2626" />Priority boost active · accepting alerts adds an extra rank bonus</div>}
      </div>
    </button>
  );
}

// ── full-screen live emergency alert ──
function EmergencyAlert({ alert, onAccept, onDismiss }) {
  const [left, setLeft] = useEm(90);
  useEmFx(() => {
    const t = setInterval(() => setLeft(x => Math.max(0, x - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  useEmFx(() => { if (left === 0) onDismiss(); }, [left]);
  const mm = String(Math.floor(left / 60));
  const ss = String(left % 60).padStart(2, '0');
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 60, background: 'linear-gradient(170deg, #7F1D1D 0%, #991B1B 45%, #B91C1C 100%)', display: 'flex', flexDirection: 'column', animation: 'emPulse 1.6s ease-in-out infinite' }}>
      <style>{`
        @keyframes emPulse { 0%,100% { filter: brightness(1); } 50% { filter: brightness(1.12); } }
        @keyframes emRing { 0% { transform: scale(1); opacity: .55; } 100% { transform: scale(2.1); opacity: 0; } }
        @keyframes emShake { 0%,100% { transform: rotate(0); } 20% { transform: rotate(-14deg); } 40% { transform: rotate(11deg); } 60% { transform: rotate(-8deg); } 80% { transform: rotate(5deg); } }
      `}</style>
      <div style={{ flexShrink: 0, paddingTop: 64, textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.14)', borderRadius: 99, padding: '7px 15px' }}>
          <span style={{ width: 8, height: 8, borderRadius: 99, background: '#FCA5A5', animation: 'emPulse 0.9s ease-in-out infinite' }} />
          <span style={{ fontSize: 12, fontWeight: 800, color: '#FECACA', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Emergency · on-call alert</span>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 30px', textAlign: 'center' }}>
        <div style={{ position: 'relative', width: 108, height: 108, marginBottom: 26 }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 99, border: '2px solid rgba(255,255,255,0.6)', animation: 'emRing 1.4s ease-out infinite' }} />
          <div style={{ position: 'absolute', inset: 0, borderRadius: 99, border: '2px solid rgba(255,255,255,0.6)', animation: 'emRing 1.4s ease-out 0.5s infinite' }} />
          <div style={{ position: 'absolute', inset: 10, borderRadius: 99, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'emShake 1.1s ease-in-out infinite' }}>
            <Ic name="siren" size={42} color="#DC2626" />
          </div>
        </div>
        <div style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: 10 }}>{alert.title}</div>
        <div style={{ fontSize: 15, color: '#FECACA', lineHeight: 1.55, marginBottom: 20 }}>{alert.detail}</div>
        <div style={{ display: 'flex', gap: 1, borderRadius: 13, overflow: 'hidden', width: '100%', maxWidth: 320 }}>
          {[['Distance', alert.mi + ' mi'], ['Emergency rate', alert.rate], ['Est. value', alert.value]].map(([l, v], i) => (
            <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,0.12)', padding: '11px 6px', textAlign: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>{v}</div>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: '#FECACA', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flexShrink: 0, padding: '0 20px 40px' }}>
        <div style={{ textAlign: 'center', fontSize: 13, color: '#FECACA', fontWeight: 700, marginBottom: 14 }}>Every on-call pro just got this alert · <span style={{ fontVariantNumeric: 'tabular-nums', color: '#fff' }}>{mm}:{ss}</span> to claim</div>
        <button onClick={onAccept} style={{ width: '100%', padding: '17px 0', borderRadius: 15, border: 'none', background: '#fff', color: '#B91C1C', fontSize: 17, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, boxShadow: '0 8px 28px rgba(0,0,0,0.35)' }}>
          <Ic name="bolt" size={19} fill color="#B91C1C" />Accept now · +rank bonus
        </button>
        <button onClick={onDismiss} style={{ width: '100%', padding: '13px 0', marginTop: 8, borderRadius: 13, border: 'none', background: 'transparent', color: 'rgba(255,255,255,0.75)', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Pass — stay on call</button>
      </div>
    </div>
  );
}

const EM_ALERT = {
  title: 'Burst pipe · flooding now',
  detail: 'Water main fitting failed under the kitchen sink — homeowner shut off supply, standing water spreading. 78745 · Garrison Park.',
  mi: 3.1, rate: '1.5×', value: '$720–$1,100',
};

Object.assign(window, { EmergencyOptIn, EmergencyAlert, EM_ALERT });
