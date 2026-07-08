// prolnk-membership.jsx — Membership & billing management + web-checkout redirect
const { useState: useM } = React;

const BILLING_URL = 'prolnk.xyz/account/billing';

// ── reusable "manage on the web" sheet (no in-app transactions → no app-store fees) ──
function BillingSheet({ open, action, onClose, onOpen }) {
  if (!open) return null;
  const a = action || {};
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 200 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.45)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: '#fff', borderRadius: '24px 24px 0 0', maxHeight: '88%', overflow: 'auto', paddingBottom: 34, boxShadow: '0 -8px 40px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10 }}><div style={{ width: 38, height: 5, borderRadius: 99, background: '#CBD5E1' }} /></div>
        <div style={{ padding: '14px 20px 4px', fontSize: 19, fontWeight: 800, color: PL.ink }}>{a.title || 'Manage on the web'}</div>
        <div style={{ padding: '6px 20px 20px' }}>
          <div style={{ fontSize: 14, color: PL.muted, lineHeight: 1.55, marginBottom: 16 }}>{a.note || 'To keep more money in your pocket, ProLnk handles all billing on the web — no app-store fees. We’ll open your secure billing portal.'}</div>

          {a.summary && (
            <Card style={{ marginBottom: 16, padding: '4px 16px' }}>
              {a.summary.map((row, i) => <KV key={i} k={row[0]} v={row[1]} last={i === a.summary.length - 1} />)}
            </Card>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: PL.bg, border: `1px solid ${PL.border}`, borderRadius: 12, padding: '11px 13px', marginBottom: 8 }}>
            <Ic name="lock" size={15} color={PL.green} />
            <span style={{ flex: 1, fontSize: 13.5, fontWeight: 700, color: PL.slate3 }}>{BILLING_URL}</span>
            <Ic name="globe" size={16} color={PL.faint} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: PL.faint, marginBottom: 18 }}>
            <Ic name="shield" size={14} color={PL.faint} />Secured by Stripe · opens outside the app
          </div>

          <Btn tone="teal" full size="lg" onClick={() => onOpen(a)}><Ic name="external" size={18} color="#fff" />Open prolnk.xyz</Btn>
          <button onClick={onClose} style={{ width: '100%', marginTop: 10, border: 'none', background: 'none', color: PL.muted, fontSize: 14, fontWeight: 700, padding: 8, cursor: 'pointer' }}>Not now</button>
        </div>
      </div>
    </div>
  );
}

// ── faux in-app browser chrome (mount-on-open) ──
function WebPortal({ open, onClose, onConfirm }) {
  if (!open) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 220 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.4)' }} />
      <div style={{ position: 'absolute', inset: '40px 0 0', background: '#fff', borderRadius: '20px 20px 0 0', overflow: 'hidden', boxShadow: '0 -10px 40px rgba(0,0,0,0.25)' }}>
        {/* browser top chrome */}
        <div style={{ background: '#F1F5F9', borderBottom: `1px solid ${PL.border}`, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 700, color: PL.teal, padding: 0 }}>Done</button>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 7, background: '#fff', border: `1px solid ${PL.border}`, borderRadius: 9, padding: '7px 11px' }}>
            <Ic name="lock" size={13} color={PL.green} /><span style={{ fontSize: 12.5, fontWeight: 600, color: PL.slate3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{BILLING_URL}</span>
          </div>
          <Ic name="external" size={17} color={PL.faint} />
        </div>
        {/* web page body */}
        <div style={{ padding: '26px 22px', height: '100%', overflow: 'auto', background: '#FBFCFD' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 22 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: PL.teal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic name="bolt" size={17} fill color="#fff" /></div>
            <span style={{ fontSize: 17, fontWeight: 800, color: PL.ink, letterSpacing: '-0.01em' }}>ProLnk <span style={{ color: PL.faint, fontWeight: 600 }}>· Billing</span></span>
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: PL.teal, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Secure web checkout</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: PL.ink, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 12 }}>Manage your membership</div>
          <div style={{ fontSize: 14, color: PL.muted, lineHeight: 1.6, marginBottom: 22 }}>You left the app to complete billing on the web — that’s how ProLnk avoids 15–30% app-store fees and keeps your rate low. Changes sync back instantly.</div>
          <Card style={{ marginBottom: 16, padding: '4px 16px' }}>
            <KV k="Account" v={PRO.business} />
            <KV k="Current plan" v="Pro · $149/mo" />
            <KV k="Payment" v="Visa ···· 4242" last />
          </Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Btn tone="teal" full size="lg" onClick={() => onConfirm ? onConfirm() : onClose()}>Confirm change</Btn>
            <Btn tone="outline" full onClick={onClose}>Back to app</Btn>
          </div>
          <div style={{ textAlign: 'center', fontSize: 11.5, color: PL.faint, marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><Ic name="shield" size={13} color={PL.faint} />256-bit encrypted · Stripe</div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// MEMBERSHIP & BILLING
// ════════════════════════════════════════════════════════════
function MembershipScreen({ onBack, onManage, addons }) {
  const tier = PRO.tier;            // 'Pro'
  const tierObj = TIERS.find(t => t.name === tier) || {};
  const activeAddons = addons || [];   // managed on web; shown as current state
  const addonTotal = activeAddons.reduce((s, k) => s + (ADDONS.find(a => a.key === k)?.price || 0), 0);
  const monthly = (tierObj.price || 0) + addonTotal;

  return (
    <Screen>
      {/* slate plan hero */}
      <div style={{ background: PL.slate, paddingTop: 52, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -30, width: 180, height: 180, borderRadius: 99, background: 'radial-gradient(circle, rgba(13,148,136,0.35), transparent 70%)' }} />
        <div style={{ padding: '6px 18px 18px', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <button onClick={onBack} style={{ border: 'none', background: 'rgba(255,255,255,0.14)', width: 34, height: 34, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Ic name="chevL" size={20} color="#fff" /></button>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Membership & billing</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 6 }}>
                <div style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(94,234,212,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic name="bolt" size={20} fill color="#5EEAD4" /></div>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>{tier}</div>
                <Badge tone="green" solid>Active</Badge>
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{tierObj.priority} matching · {tierObj.areas} ZIPs · {tierObj.seats} seat{tierObj.seats === 1 ? '' : 's'} · renews Jun 28</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>${monthly}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>/mo total</div>
            </div>
          </div>
        </div>
      </div>

      <Body>
        {/* web-billing notice */}
        <div style={{ display: 'flex', gap: 11, background: PL.tealBg, border: `1px solid ${PL.tealSoft}`, borderRadius: 14, padding: 14, marginBottom: 20 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name="globe" size={18} color={PL.teal} /></div>
          <div style={{ fontSize: 12.5, color: PL.tealDark, lineHeight: 1.5 }}><b>Billing happens on the web.</b> Plan and add-on changes open <b>{BILLING_URL}</b> in your browser — that keeps app-store fees out of your subscription.</div>
        </div>

        {/* change plan */}
        <SectionLabel>Change plan</SectionLabel>
        <Card style={{ padding: '4px 16px', marginBottom: 20 }}>
          {TIERS.map((t, i) => {
            const cur = t.name === tier;
            const up = TIERS.findIndex(x => x.name === t.name) > TIERS.findIndex(x => x.name === tier);
            return (
              <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 0', borderBottom: i === TIERS.length - 1 ? 'none' : `1px solid ${PL.border2}` }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: cur ? PL.tealBg : t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name={t.icon} size={19} color={cur ? PL.teal : t.tone} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}><span style={{ fontSize: 15, fontWeight: 800, color: PL.ink }}>{t.name}</span>{cur && <Badge tone="teal">Current</Badge>}</div>
                  <div style={{ fontSize: 12.5, color: PL.faint, marginTop: 1 }}>{t.priority} matching · {t.areas} ZIPs · {t.seats} seat{t.seats === 1 ? '' : 's'}{t.scout === true ? ' · Scout incl.' : ''}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 14.5, fontWeight: 800, color: PL.ink }}>{t.price ? `$${t.price}` : t.priceNote || 'Custom'}</div>
                  {!cur && <button onClick={() => onManage({ title: `${up ? 'Upgrade' : 'Switch'} to ${t.name}`, note: `Moving to ${t.name} gives you ${t.priority.toLowerCase()} matching priority and ${t.areas} service areas. You’ll confirm and pay securely on the web.`, summary: [['New plan', `${t.name}${t.price ? ' · $' + t.price + '/mo' : ''}`], ['Matching', `${t.priority} priority`], ['Service areas', `${t.areas}`]] })} style={{ marginTop: 3, border: 'none', background: 'none', color: PL.teal, fontWeight: 700, fontSize: 12.5, cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center', gap: 3 }}>{up ? 'Upgrade' : 'Downgrade'}<Ic name="external" size={12} color={PL.teal} /></button>}
                </div>
              </div>
            );
          })}
        </Card>

        {/* add-ons */}
        <SectionLabel>Add-ons</SectionLabel>
        <Card style={{ padding: '4px 16px', marginBottom: 20 }}>
          {ADDONS.map((a, i) => {
            const on = activeAddons.includes(a.key);
            return (
              <div key={a.key} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 0', borderBottom: i === ADDONS.length - 1 ? 'none' : `1px solid ${PL.border2}` }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: '#F8FAFC', border: `1px solid ${PL.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name={a.icon} size={19} color={a.tone} fill={a.icon === 'bolt' || a.icon === 'star'} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}><span style={{ fontSize: 14.5, fontWeight: 800, color: PL.ink }}>{a.name}</span>{on && <Badge tone="green">On</Badge>}</div>
                  <div style={{ fontSize: 12, color: PL.faint, marginTop: 1 }}>+${a.price}/mo</div>
                </div>
                <button onClick={() => onManage({ key: 'addon-' + a.key, title: on ? `Remove ${a.name}` : `Add ${a.name}`, note: on ? `Removing ${a.name} takes effect at your next renewal. Manage it securely on the web.` : `${a.desc} Add it for $${a.price}/mo — confirm and pay on the web.`, summary: [[a.name, on ? 'Remove' : `Add · $${a.price}/mo`]] })} style={{ border: `1.5px solid ${on ? PL.border : PL.teal}`, background: on ? '#fff' : PL.tealBg, color: on ? PL.slate3 : PL.tealDark, fontWeight: 700, fontSize: 12.5, padding: '7px 13px', borderRadius: 9, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap' }}>{on ? 'Remove' : 'Add'}<Ic name="external" size={12} color={on ? PL.slate3 : PL.tealDark} /></button>
              </div>
            );
          })}
        </Card>

        {/* billing & payment */}
        <SectionLabel>Billing</SectionLabel>
        <Card style={{ padding: '4px 16px', marginBottom: 20 }}>
          <BillRow icon="card" iconBg="#EFF6FF" iconColor="#2563EB" title="Payment method" detail="Visa ···· 4242" onClick={() => onManage({ title: 'Update payment method', note: 'Update your card on file securely on the web.' })} />
          <BillRow icon="doc" iconBg="#F1F5F9" iconColor={PL.slate3} title="Billing history" detail="4 invoices" onClick={() => onManage({ title: 'Billing history', note: 'View and download every invoice on the web.' })} />
          <BillRow icon="sliders" iconBg="#F1F5F9" iconColor={PL.slate3} title="Manage subscription" detail="Pause · cancel" onClick={() => onManage({ title: 'Manage subscription', note: 'Pause, cancel, or change your renewal date on the web — anytime, no fees.' })} last />
        </Card>

        <button onClick={() => onManage({ title: 'Cancel membership', note: 'We’d hate to see you go. You can cancel anytime on the web — your referrals pause at the end of the current cycle.' })} style={{ width: '100%', textAlign: 'center', padding: 13, border: 'none', background: 'none', color: PL.red, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Cancel membership</button>
        <div style={{ textAlign: 'center', fontSize: 11.5, color: PL.faint, marginTop: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><Ic name="lock" size={13} color={PL.faint} />All payments handled on prolnk.xyz · never in-app</div>
      </Body>
    </Screen>
  );
}

function BillRow({ icon, iconBg, iconColor, title, detail, onClick, last }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 0', borderBottom: last ? 'none' : `1px solid ${PL.border2}`, cursor: 'pointer' }}>
      <div style={{ width: 34, height: 34, borderRadius: 9, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name={icon} size={18} color={iconColor} /></div>
      <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: PL.ink }}>{title}</span>
      <span style={{ fontSize: 13.5, color: PL.muted, fontWeight: 600 }}>{detail}</span>
      <Ic name="external" size={16} color={PL.faint} />
    </div>
  );
}

Object.assign(window, { MembershipScreen, BillingSheet, WebPortal });
