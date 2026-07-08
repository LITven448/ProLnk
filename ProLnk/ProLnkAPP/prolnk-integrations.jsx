// prolnk-integrations.jsx — Settings → Integrations (Stripe payments + field service management)
const { useState: useInt } = React;

const INTEGRATIONS = [
  { group: 'Payments & payouts', items: [
    { key: 'stripe', name: 'Stripe', mono: 'S', tone: '#635BFF', desc: 'Payouts & job payments', defaultOn: true, badge: 'Required' },
    { key: 'quickbooks', name: 'QuickBooks', mono: 'qb', tone: '#2CA01C', desc: 'Sync invoices & income for taxes' },
  ]},
  { group: 'Field service management', items: [
    { key: 'housecall', name: 'Housecall Pro', mono: 'H', tone: '#1466FF', desc: 'Push referrals into your job calendar', defaultOn: true },
    { key: 'servicetitan', name: 'ServiceTitan', mono: 'ST', tone: '#1B1B3A', desc: 'Sync customers, jobs & dispatch' },
    { key: 'jobber', name: 'Jobber', mono: 'J', tone: '#1F9B6E', desc: 'Quotes, scheduling & client hub' },
    { key: 'workiz', name: 'Workiz', mono: 'W', tone: '#FF5A3C', desc: 'Dispatch & field team management' },
    { key: 'servicefusion', name: 'Service Fusion', mono: 'SF', tone: '#0E7C61', desc: 'Estimates, jobs & invoicing' },
  ]},
  { group: 'Job documentation', items: [
    { key: 'companycam', name: 'CompanyCam', mono: 'CC', tone: '#0B65C2', desc: 'Job photos auto-organized per property' },
    { key: 'gbp', name: 'Google Business Profile', mono: 'G', tone: '#4285F4', desc: 'Sync your reviews & business info' },
  ]},
  { group: 'Calendar & automation', items: [
    { key: 'gcal', name: 'Google Calendar', mono: 'G', tone: '#34A853', desc: 'Block arrival windows automatically' },
    { key: 'zapier', name: 'Zapier', mono: 'Z', tone: '#FF4F00', desc: 'Automate ProLnk events into 6,000+ apps' },
  ]},
];

function IntegrationsScreen({ onBack, connected, onToggle }) {
  const conn = connected || { stripe: true, housecall: true };
  const total = INTEGRATIONS.reduce((s, g) => s + g.items.length, 0);
  const live = Object.values(conn).filter(Boolean).length;

  const Logo = ({ it }) => (
    <div style={{ width: 44, height: 44, borderRadius: 12, background: it.tone, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 4px 10px ${it.tone}33` }}>
      <span style={{ color: '#fff', fontWeight: 800, fontSize: it.mono.length > 1 ? 13 : 18, letterSpacing: '-0.02em', textTransform: it.mono.length > 1 ? 'uppercase' : 'none' }}>{it.mono}</span>
    </div>
  );

  return (
    <Screen>
      <Header onBack={onBack} title="Integrations" sub="Settings" />
      <Body>
        {/* summary */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 13, background: PL.tealBg, border: `1px solid ${PL.tealSoft}`, borderRadius: 16, padding: 16, marginBottom: 20 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: PL.teal, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name="link" size={22} color="#fff" /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: PL.tealDark, lineHeight: 1.2 }}>{live} of {total} connected</div>
            <div style={{ fontSize: 12.5, color: PL.teal, marginTop: 2, fontWeight: 600 }}>Sync ProLnk with the tools you already run on</div>
          </div>
        </div>

        {INTEGRATIONS.map(g => (
          <div key={g.group} style={{ marginBottom: 8 }}>
            <SectionLabel>{g.group}</SectionLabel>
            <Card style={{ marginBottom: 14, padding: '4px 16px' }}>
              {g.items.map((it, i) => {
                const on = conn[it.key] != null ? conn[it.key] : it.defaultOn;
                const locked = it.key === 'stripe';
                return (
                  <div key={it.key} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '14px 0', borderBottom: i === g.items.length - 1 ? 'none' : `1px solid ${PL.border2}` }}>
                    <Logo it={it} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: PL.ink }}>{it.name}</span>
                        {it.badge && <Badge tone="slate">{it.badge}</Badge>}
                      </div>
                      <div style={{ fontSize: 12.5, color: PL.muted, marginTop: 2, lineHeight: 1.35 }}>{it.desc}</div>
                    </div>
                    {on ? (
                      <button onClick={() => !locked && onToggle(it.key, false)} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, border: `1.5px solid ${PL.greenSoft}`, background: PL.greenBg, color: '#15803D', fontSize: 12.5, fontWeight: 800, padding: '7px 12px', borderRadius: 10, cursor: locked ? 'default' : 'pointer', flexShrink: 0 }}>
                        <Ic name="check" size={14} color={PL.green} sw={3} />Connected
                      </button>
                    ) : (
                      <Btn tone="slate" size="sm" onClick={() => onToggle(it.key, true)}>Connect</Btn>
                    )}
                  </div>
                );
              })}
            </Card>
          </div>
        ))}

        <div style={{ fontSize: 12.5, color: PL.faint, marginTop: 6, display: 'flex', gap: 7, lineHeight: 1.5 }}><Ic name="shield" size={15} color={PL.faint} style={{ flexShrink: 0, marginTop: 1 }} />ProLnk only reads and writes the jobs you approve. Homeowner contact stays inside ProLnk — no integration ever receives their information. Disconnect anytime — your data stays yours.</div>
        <div style={{ height: 10 }} />
      </Body>
    </Screen>
  );
}

Object.assign(window, { IntegrationsScreen });
