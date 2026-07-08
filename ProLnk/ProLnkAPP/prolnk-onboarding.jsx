// prolnk-onboarding.jsx — Apply / Join + Background Check (Checkr)
const { useState: useStateO, useEffect: useEffectO } = React;

// Full service-pro directory, grouped. "Something else" lets a pro name their own.
const TRADE_GROUPS = [
  { group: 'Core trades', items: ['Plumbing', 'Electrical', 'HVAC', 'Drain & Sewer', 'Appliance Repair', 'Handyman'] },
  { group: 'Exterior & structure', items: ['Roofing', 'Gutters', 'Siding', 'Windows & Doors', 'Garage Doors', 'Fencing', 'Decks & Patios', 'Concrete & Masonry', 'Foundation Repair', 'Excavation'] },
  { group: 'Interior & finish', items: ['Remodeling', 'Carpentry', 'Drywall', 'Painting', 'Flooring', 'Tile', 'Cabinets & Countertops', 'Insulation'] },
  { group: 'Systems & energy', items: ['Solar', 'Generators', 'Smart Home', 'Water Treatment', 'Septic', 'Well Service', 'Waterproofing'] },
  { group: 'Outdoor & grounds', items: ['Landscaping', 'Lawn Care', 'Tree Service', 'Irrigation', 'Pool & Spa', 'Pressure Washing', 'Pest Control'] },
  { group: 'Cleaning & specialty', items: ['House Cleaning', 'Carpet Cleaning', 'Junk Removal', 'Chimney Sweep', 'Moving', 'Locksmith', 'Glass & Mirror', 'Welding'] },
];
const TRADES = TRADE_GROUPS.flatMap(g => g.items);
const TRADE_SET = new Set(TRADES);

function Onboarding({ onFinish, charter }) {
  const [step, setStep] = useStateO(0);          // 0 trade,1 biz,2 tier,3 plan,4 pay,5 success,6 bgcheck,7 done
  const [trades, setTrades] = useStateO(['Plumbing']);
  const trade = trades[0] || 'Plumbing';
  const toggleTrade = (t) => setTrades(p => p.includes(t) ? (p.length > 1 ? p.filter(x => x !== t) : p) : [...p, t]);
  const [tradeQuery, setTradeQuery] = useStateO('');
  const [customOpen, setCustomOpen] = useStateO(false);
  const [customDraft, setCustomDraft] = useStateO('');
  const customTrades = trades.filter(t => !TRADE_SET.has(t));
  const addCustom = () => {
    const v = customDraft.trim().replace(/\s+/g, ' ');
    if (!v) return;
    setTrades(p => p.some(x => x.toLowerCase() === v.toLowerCase()) ? p : [...p, v]);
    setCustomDraft(''); setCustomOpen(false);
  };
  const [biz, setBiz] = useStateO('');
  const [zip, setZip] = useStateO('');
  const [tier, setTier] = useStateO(charter ? 'Business' : null);
  const [zips, setZips] = useStateO(['78704']);
  const [addonQty, setAddonQty] = useStateO(charter ? { scout: 1 } : {});
  const [agree, setAgree] = useStateO(false);
  const [addr, setAddr] = useStateO('');
  const [addr2, setAddr2] = useStateO(null);   // second location (null = hidden)
  const [onCall, setOnCall] = useStateO(false); // emergency on-call opt-in
  const [code, setCode] = useStateO(charter || '');
  const locked = !!charter;
  const founding = !!(code || '').trim();
  const steps = ['Trade', 'Business', 'Subscription', 'Plan', 'Payment'];

  const tierObj = TIERS.find(t => t.name === tier) || {};
  const tierPrice = (founding && tier === 'Business') ? TIERS.find(t => t.name === 'Pro').price : (tierObj.price || 0);
  const hasAddon = (k) => (addonQty[k] || 0) > 0;
  const addons = Object.keys(addonQty).filter(hasAddon);
  const FREE_ZIPS = new Set(ZIP_SUGGEST.filter(z => z.free).map(z => z.zip));
  const paidZips = zips.filter(z => !FREE_ZIPS.has(z));
  const areaCap = (typeof tierObj.areas === 'number' ? tierObj.areas : 99) + 3 * (addonQty.leads || 0);
  const addonTotal = Object.entries(addonQty).reduce((s, [k, q]) => s + (ADDONS.find(a => a.key === k)?.price || 0) * q, 0);
  const servicePacks = Math.max(0, Math.ceil((trades.length - SERVICES_ADDON.included) / SERVICES_ADDON.per));
  const servicesTotal = servicePacks * SERVICES_ADDON.price;
  const monthly = tierPrice + addonTotal + servicesTotal;
  const toggleZip = (z) => setZips(p => p.includes(z) ? p.filter(x => x !== z) : (FREE_ZIPS.has(z) || paidZips.length < areaCap ? [...p, z] : p));
  const toggleAddon = (k) => setAddonQty(p => hasAddon(k) ? { ...p, [k]: 0 } : { ...p, [k]: 1 });
  const bumpAddon = (k, d) => setAddonQty(p => ({ ...p, [k]: Math.max(0, Math.min(6, (p[k] || 0) + d)) }));

  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => Math.max(0, s - 1));

  // ── BACKGROUND CHECK sub-state ──
  if (step === 6) return <BackgroundCheck onDone={() => setStep(7)} />;
  if (step === 7) return <AllSet onFinish={onFinish} />;
  if (step === 5) return <Success onNext={() => setStep(6)} tier={tier} />;

  return (
    <Screen bg="#fff">
      {/* progress header */}
      <div style={{ paddingTop: 52, flexShrink: 0, borderBottom: `1px solid ${PL.border}` }}>
        <div style={{ padding: '4px 18px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={step === 0 ? onFinish : back} style={{ border: 'none', background: '#F1F5F9', width: 34, height: 34, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Ic name="chevL" size={20} color={PL.ink} /></button>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: 5 }}>
              {steps.map((_, i) => <div key={i} style={{ flex: 1, height: 5, borderRadius: 99, background: i <= step ? PL.teal : '#E2E8F0', transition: 'background .3s' }} />)}
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: PL.faint, marginTop: 7, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Step {step + 1} of 5 · {steps[step]}</div>
          </div>
        </div>
      </div>

      <Body style={{ padding: '24px 20px 120px' }}>
        {step === 0 && (
          <>
            <div style={{ position: 'relative', marginBottom: 20, borderRadius: 16, overflow: 'hidden', border: `1px solid ${PL.border}` }}>
              <img src="assets/join-hero-v3.png" alt="The ProLnk network of home service trades" style={{ width: '100%', height: 170, objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-start', padding: 18, pointerEvents: 'none' }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: PL.teal, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Join ProLnk</div>
                  <div style={{ fontSize: 21, fontWeight: 800, color: PL.ink, lineHeight: 1.12, marginTop: 5, letterSpacing: '-0.02em' }}>The network for<br />home service pros</div>
                </div>
              </div>
            </div>
            <H1>Whats your trade?</H1>
            <Sub>Pick every trade you work — we match referrals to all of them. Cant find yours? Add it under <b>Something else</b>.</Sub>

            {/* search */}
            <div style={{ position: 'relative', marginBottom: 14 }}>
              <Ic name="search" size={18} color={PL.faint} style={{ position: 'absolute', left: 14, top: 13 }} />
              <input value={tradeQuery} onChange={e => setTradeQuery(e.target.value)} placeholder="Search 40+ trades…" style={{
                width: '100%', boxSizing: 'border-box', padding: '12px 14px 12px 42px', fontSize: 15, fontWeight: 600,
                color: PL.ink, border: `1.5px solid ${PL.border}`, borderRadius: 12, outline: 'none', fontFamily: 'inherit',
              }} onFocus={e => e.target.style.borderColor = PL.teal} onBlur={e => e.target.style.borderColor = PL.border} />
            </div>

            {/* selected summary */}
            {trades.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 16 }}>
                {trades.map(t => (
                  <button key={t} onClick={() => toggleTrade(t)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 11px', borderRadius: 99, border: 'none', background: PL.teal, color: '#fff', fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}>
                    {t}<Ic name="x" size={13} color="rgba(255,255,255,0.85)" sw={2.6} />
                  </button>
                ))}
              </div>
            )}

            {/* grouped directory */}
            {(() => {
              const q = tradeQuery.trim().toLowerCase();
              return TRADE_GROUPS.map(g => {
                const items = g.items.filter(t => t.toLowerCase().includes(q));
                if (!items.length) return null;
                return (
                  <div key={g.group} style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: PL.faint, marginBottom: 9 }}>{g.group}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
                      {items.map(t => {
                        const on = trades.includes(t);
                        return (
                          <button key={t} onClick={() => toggleTrade(t)} style={{
                            padding: '13px 13px', borderRadius: 13, cursor: 'pointer', textAlign: 'left',
                            border: `1.5px solid ${on ? PL.teal : PL.border}`, background: on ? PL.tealBg : '#fff',
                            fontSize: 14, fontWeight: 700, color: on ? PL.tealDark : PL.slate3,
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, lineHeight: 1.2,
                          }}>{t}{on && <Ic name="check" size={16} color={PL.teal} />}</button>
                        );
                      })}
                    </div>
                  </div>
                );
              });
            })()}

            {/* Something else */}
            <div style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: PL.faint, marginBottom: 9 }}>Not listed?</div>
            {customTrades.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9, marginBottom: 9 }}>
                {customTrades.map(t => (
                  <button key={t} onClick={() => toggleTrade(t)} style={{ padding: '13px', borderRadius: 13, cursor: 'pointer', textAlign: 'left', border: `1.5px solid ${PL.teal}`, background: PL.tealBg, fontSize: 14, fontWeight: 700, color: PL.tealDark, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>{t}<Ic name="check" size={16} color={PL.teal} /></button>
                ))}
              </div>
            )}
            {!customOpen ? (
              <button onClick={() => setCustomOpen(true)} style={{ width: '100%', padding: '14px', borderRadius: 13, cursor: 'pointer', border: `1.5px dashed ${PL.border}`, background: '#fff', fontSize: 14, fontWeight: 700, color: PL.slate3, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <Ic name="plus" size={17} color={PL.teal} sw={2.4} />Something else
              </button>
            ) : (
              <div style={{ display: 'flex', gap: 8 }}>
                <input autoFocus value={customDraft} onChange={e => setCustomDraft(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') addCustom(); }} placeholder="Name your trade or service" style={{
                  flex: 1, boxSizing: 'border-box', padding: '13px 14px', fontSize: 15, fontWeight: 600, color: PL.ink,
                  border: `1.5px solid ${PL.teal}`, borderRadius: 12, outline: 'none', fontFamily: 'inherit',
                }} />
                <Btn tone="teal" onClick={addCustom} disabled={!customDraft.trim()}>Add</Btn>
              </div>
            )}

            <div style={{ fontSize: 12.5, color: PL.faint, marginTop: 16, textAlign: 'center' }}>{trades.length} selected · 2 included free{servicePacks > 0 ? ` · +$${servicesTotal}/mo Extra Services` : ' · more via the Extra Services add-on'}</div>
          </>
        )}

        {step === 1 && (
          <>
            <H1>Tell us about your business</H1>
            <Sub>This is what homeowners and our matching engine see. You’ll pick your service ZIPs next.</Sub>
            <Field label="Business name"><Input value={biz} onChange={setBiz} placeholder="Reyes Plumbing & Drain" /></Field>
            <Field label="Business address"><Input value={addr} onChange={setAddr} placeholder="1408 Kinney Ave, Austin TX 78704" /></Field>
            {addr2 === null ? (
              <button onClick={() => setAddr2('')} style={{ marginTop: -6, marginBottom: 14, border: 'none', background: 'none', color: PL.teal, fontWeight: 700, fontSize: 13, cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center', gap: 5 }}><Ic name="plus" size={14} color={PL.teal} sw={2.6} />Add another location</button>
            ) : (
              <Field label="Second location"><Input value={addr2} onChange={setAddr2} placeholder="Optional — second shop or yard" /></Field>
            )}
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', background: PL.tealBg, border: `1px solid ${PL.tealSoft}`, borderRadius: 12, padding: '11px 13px', margin: '0 0 14px' }}>
              <Ic name="pin" size={16} color={PL.teal} style={{ flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontSize: 12.5, color: PL.tealDark, fontWeight: 600, lineHeight: 1.5 }}>Your address anchors your service map — next you pick ZIPs across the whole metroplex, as far out as you can service.</span>
            </div>
            <Field label="License number"><Input placeholder="TX-MPL 41882" /></Field>
            <Field label="Mobile"><Input placeholder="(512) 555-0188" /></Field>
          </>
        )}

        {step === 2 && (
          <>
            <H1>Choose your subscription</H1>
            <Sub>Your tier sets your matching priority, included service areas, and Scout access. {locked && 'A referral locked your tier.'}</Sub>
            {locked && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, background: PL.amberBg, border: `1px solid ${PL.amberSoft}`, borderRadius: 12, padding: '11px 13px', marginBottom: 14 }}>
                <Ic name="bolt" size={18} fill color={PL.amber} />
                <span style={{ fontSize: 13, color: '#92400E', fontWeight: 600, lineHeight: 1.4 }}>You joined via <b>{charter}</b> — a founding invite. Your <b>Business</b> tier is unlocked at the Pro price: <b>$149/mo</b>.</span>
              </div>
            )}
            {TIERS.filter(t => t.name !== 'Enterprise').map(t => {
              const sel = tier === t.name;
              const disabled = locked && t.name !== 'Business';
              return (
                <button key={t.name} onClick={() => !disabled && setTier(t.name)} style={{
                  width: '100%', textAlign: 'left', marginBottom: 11, padding: 16, borderRadius: 16, cursor: disabled ? 'default' : 'pointer',
                  border: `1.5px solid ${sel ? PL.teal : PL.border}`, background: sel ? PL.tealBg : '#fff', opacity: disabled ? 0.45 : 1, position: 'relative',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                      <span style={{ fontSize: 17, fontWeight: 800, color: PL.ink }}>{t.name}</span>
                      {t.name === 'Pro' && !founding && <Badge tone="teal">Popular</Badge>}
                      {founding && t.name === 'Business' && <Badge tone="amber">Founding price</Badge>}
                      {sel && <Ic name="check" size={18} color={PL.teal} />}
                    </div>
                    <span style={{ fontSize: 17, fontWeight: 800, color: PL.ink }}>{founding && t.name === 'Business' ? <><span style={{ textDecoration: 'line-through', color: PL.faint, fontWeight: 700, fontSize: 14, marginRight: 6 }}>$249</span>$149</> : `$${t.price}`}<span style={{ fontSize: 12.5, color: PL.faint, fontWeight: 600 }}>/mo</span></span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px' }}>
                    {t.perks.map((p, i) => <span key={i} style={{ fontSize: 12.5, color: PL.slate3, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 5 }}><Ic name="check" size={13} color={PL.teal} sw={2.4} />{p}</span>)}
                  </div>
                </button>
              );
            })}
            <button style={{ width: '100%', textAlign: 'center', padding: 14, borderRadius: 14, border: `1.5px dashed ${PL.border}`, background: '#fff', fontSize: 14, fontWeight: 700, color: PL.muted, cursor: 'pointer' }}>Enterprise · custom pricing →</button>
            {!locked && (
              <div style={{ marginTop: 16 }}>
                <Field label="Have a founding invite code?"><Input value={code} onChange={(v) => { setCode(v); if (v.trim() && tier !== 'Business') setTier('Business'); }} placeholder="e.g. REYES-7K2 — unlocks Business at $149" /></Field>
                {founding && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9, background: PL.amberBg, border: `1px solid ${PL.amberSoft}`, borderRadius: 12, padding: '11px 13px', marginTop: -4 }}>
                    <Ic name="award" size={17} color={PL.amber} />
                    <span style={{ fontSize: 12.5, color: '#92400E', fontWeight: 600, lineHeight: 1.45 }}>Founding invite applied — <b>Business tier for $149/mo</b> (reg. $249), and you join the founding network.</span>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {step === 3 && (
          <>
            <H1>Build your plan</H1>
            <Sub>Pick the ZIP codes you want to focus on, then add any boosts. You can change all of this later.</Sub>

            {/* service areas */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ fontSize: 13.5, fontWeight: 800, color: PL.ink }}>Service areas</div>
              <Badge tone={paidZips.length >= areaCap ? 'amber' : 'teal'}>{paidZips.length} / {areaCap} used</Badge>
            </div>
            <div style={{ fontSize: 12.5, color: PL.muted, marginBottom: 12, lineHeight: 1.5 }}>{tier} includes <b style={{ color: PL.slate3 }}>{typeof tierObj.areas === 'number' ? tierObj.areas : 'unlimited'}</b> areas{(addonQty.leads || 0) > 0 && ` · +${3 * addonQty.leads} from ${addonQty.leads} Area Pack${addonQty.leads === 1 ? '' : 's'}`}. Sorted by distance from your business address.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 8 }}>
              {ZIP_SUGGEST.filter(z => !z.free).map(z => {
                const on = zips.includes(z.zip);
                const full = !on && paidZips.length >= areaCap;
                return (
                  <button key={z.zip} onClick={() => toggleZip(z.zip)} disabled={full} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 13, cursor: full ? 'default' : 'pointer', textAlign: 'left',
                    border: `1.5px solid ${on ? PL.teal : PL.border}`, background: on ? PL.tealBg : '#fff', opacity: full ? 0.4 : 1,
                  }}>
                    <div style={{ width: 22, height: 22, borderRadius: 7, flexShrink: 0, background: on ? PL.teal : '#fff', border: on ? 'none' : `2px solid ${PL.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{on && <Ic name="check" size={14} color="#fff" sw={3} />}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14.5, fontWeight: 700, color: PL.ink }}>{z.zip}</div>
                      <div style={{ fontSize: 12, color: PL.faint }}>{z.area} · {z.mi} mi</div>
                    </div>
                    <Badge tone={z.demand === 'High' ? 'green' : z.demand === 'Med' ? 'amber' : 'slate'}>{z.demand} demand</Badge>
                  </button>
                );
              })}
            </div>

            {/* free bonus areas — low adoption ZIPs, on us */}
            <div style={{ fontSize: 13.5, fontWeight: 800, color: PL.ink, margin: '18px 0 4px' }}>Free bonus areas</div>
            <div style={{ fontSize: 12.5, color: PL.muted, marginBottom: 10, lineHeight: 1.5 }}>Nearby ZIPs with low coverage right now — service them free. They never count against your plan.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 24 }}>
              {ZIP_SUGGEST.filter(z => z.free).map(z => {
                const on = zips.includes(z.zip);
                return (
                  <button key={z.zip} onClick={() => toggleZip(z.zip)} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 13, cursor: 'pointer', textAlign: 'left',
                    border: `1.5px ${on ? 'solid ' + PL.teal : 'dashed ' + PL.border}`, background: on ? PL.tealBg : '#fff',
                  }}>
                    <div style={{ width: 22, height: 22, borderRadius: 7, flexShrink: 0, background: on ? PL.teal : '#fff', border: on ? 'none' : `2px solid ${PL.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{on && <Ic name="check" size={14} color="#fff" sw={3} />}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14.5, fontWeight: 700, color: PL.ink }}>{z.zip}</div>
                      <div style={{ fontSize: 12, color: PL.faint }}>{z.area} · {z.mi} mi</div>
                    </div>
                    <Badge tone="green">Free · on us</Badge>
                  </button>
                );
              })}
            </div>

            {/* emergency on-call opt-in */}
            <div style={{ fontSize: 13.5, fontWeight: 800, color: PL.ink, marginBottom: 4 }}>Emergency services</div>
            <div style={{ fontSize: 12.5, color: PL.muted, marginBottom: 10 }}>Optional — no monthly cost, big rank upside.</div>
            <EmergencyOptIn on={onCall} onToggle={() => setOnCall(v => !v)} />

            {/* add-ons */}
            <div style={{ fontSize: 13.5, fontWeight: 800, color: PL.ink, marginBottom: 4 }}>Add-ons</div>
            <div style={{ fontSize: 12.5, color: PL.muted, marginBottom: 12 }}>Optional boosts billed monthly with your subscription.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {ADDONS.map(a => {
                const on = hasAddon(a.key);
                const q = addonQty[a.key] || 0;
                const forced = locked && a.key === 'scout';
                return (
                  <button key={a.key} onClick={() => !forced && toggleAddon(a.key)} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 12, padding: 14, borderRadius: 14, cursor: forced ? 'default' : 'pointer', textAlign: 'left',
                    border: `1.5px solid ${on ? PL.teal : PL.border}`, background: on ? PL.tealBg : '#fff',
                  }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: on ? '#fff' : '#F8FAFC', border: `1px solid ${on ? PL.tealSoft : PL.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name={a.icon} size={20} color={a.tone} fill={a.icon === 'bolt' || a.icon === 'star'} /></div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                        <span style={{ fontSize: 14.5, fontWeight: 800, color: PL.ink }}>{a.name}</span>
                        <span style={{ fontSize: 14, fontWeight: 800, color: PL.ink, whiteSpace: 'nowrap' }}>+${a.qty && on ? a.price * q : a.price}<span style={{ fontSize: 11, color: PL.faint, fontWeight: 600 }}>/mo</span></span>
                      </div>
                      <div style={{ fontSize: 12.5, color: PL.muted, lineHeight: 1.45, marginTop: 3 }}>{a.desc}</div>
                      {a.qty && on && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginTop: 9 }}>
                          <span onClick={(e) => { e.stopPropagation(); bumpAddon(a.key, -1); }} style={{ width: 27, height: 27, borderRadius: 9, border: `1.5px solid ${PL.tealSoft}`, background: '#fff', color: PL.tealDark, fontSize: 16, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>−</span>
                          <span style={{ fontSize: 13, fontWeight: 800, color: PL.tealDark, fontVariantNumeric: 'tabular-nums' }}>{q} pack{q === 1 ? '' : 's'} · +{3 * q} ZIPs</span>
                          <span onClick={(e) => { e.stopPropagation(); bumpAddon(a.key, 1); }} style={{ width: 27, height: 27, borderRadius: 9, border: `1.5px solid ${PL.tealSoft}`, background: '#fff', color: PL.tealDark, fontSize: 16, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>+</span>
                        </div>
                      )}
                      {forced && <div style={{ fontSize: 11.5, color: PL.teal, fontWeight: 700, marginTop: 5 }}>Included with your charter</div>}
                    </div>
                    <div style={{ width: 22, height: 22, borderRadius: 7, flexShrink: 0, marginTop: 2, background: on ? PL.teal : '#fff', border: on ? 'none' : `2px solid ${PL.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{on && <Ic name="check" size={14} color="#fff" sw={3} />}</div>
                  </button>
                );
              })}
            </div>

            {/* auto add-on: extra services (2 free, tracked for upsell) */}
            {servicePacks > 0 && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 14, borderRadius: 14, border: `1.5px solid ${PL.tealSoft}`, background: PL.tealBg, marginTop: 10 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: '#fff', border: `1px solid ${PL.tealSoft}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name="wrench" size={19} color={PL.teal} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontSize: 14.5, fontWeight: 800, color: PL.ink }}>Extra Services ×{servicePacks}</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: PL.ink, whiteSpace: 'nowrap' }}>+${servicesTotal}<span style={{ fontSize: 11, color: PL.faint, fontWeight: 600 }}>/mo</span></span>
                  </div>
                  <div style={{ fontSize: 12.5, color: PL.muted, lineHeight: 1.45, marginTop: 3 }}>You picked {trades.length} service types — 2 are included free; each pack covers 2 more. Drop trades to remove this.</div>
                </div>
              </div>
            )}

            {/* running total */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, padding: '14px 16px', borderRadius: 14, background: PL.slate }}>
              <div><div style={{ fontSize: 11.5, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Your monthly</div><div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>{tier}{founding ? ' (founding)' : ''} · {addons.length + (servicePacks ? 1 : 0)} add-on{(addons.length + (servicePacks ? 1 : 0)) === 1 ? '' : 's'}</div></div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>${monthly}<span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>/mo</span></div>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <H1>Activate your membership</H1>
            <Sub>Review your plan, then add a card. Billed monthly — cancel anytime.</Sub>
            <Card style={{ marginBottom: 16, padding: '6px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: `1px solid ${PL.border2}` }}>
                <span style={{ fontSize: 14.5, fontWeight: 700, color: PL.ink }}>{tier} membership{founding ? ' · founding' : ''}</span>
                <span style={{ fontSize: 14.5, fontWeight: 700, color: PL.ink }}>${tierPrice}/mo</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: (addons.length + servicePacks) ? `1px solid ${PL.border2}` : 'none' }}>
                <span style={{ fontSize: 13.5, color: PL.muted }}>{zips.length} service area{zips.length === 1 ? '' : 's'}{zips.filter(z => FREE_ZIPS.has(z)).length > 0 ? ` (${zips.filter(z => FREE_ZIPS.has(z)).length} free)` : ''}</span>
                <span style={{ fontSize: 13.5, color: PL.muted, fontWeight: 600 }}>{zips.join(', ')}</span>
              </div>
              {addons.map((k, i) => {
                const a = ADDONS.find(x => x.key === k);
                const q = addonQty[k] || 1;
                return (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: (i === addons.length - 1 && !servicePacks) ? 'none' : `1px solid ${PL.border2}` }}>
                    <span style={{ fontSize: 13.5, color: PL.slate3, display: 'inline-flex', alignItems: 'center', gap: 7 }}><Ic name={a.icon} size={15} color={a.tone} />{a.name}{a.qty && q > 1 ? ` ×${q}` : ''}</span>
                    <span style={{ fontSize: 13.5, color: PL.slate3, fontWeight: 600 }}>+${a.price * q}/mo</span>
                  </div>
                );
              })}
              {servicePacks > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0' }}>
                  <span style={{ fontSize: 13.5, color: PL.slate3, display: 'inline-flex', alignItems: 'center', gap: 7 }}><Ic name="wrench" size={15} color={PL.teal} />Extra Services ×{servicePacks}</span>
                  <span style={{ fontSize: 13.5, color: PL.slate3, fontWeight: 600 }}>+${servicesTotal}/mo</span>
                </div>
              )}
            </Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px', marginBottom: 18 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: PL.ink }}>Due today</span>
              <span style={{ fontSize: 22, fontWeight: 800, color: PL.green, letterSpacing: '-0.02em' }}>${monthly}.00</span>
            </div>
            <Field label="Card number"><Input placeholder="4242 4242 4242 4242" /></Field>
            <div style={{ display: 'flex', gap: 10 }}>
              <Field label="Expiry" style={{ flex: 1 }}><Input placeholder="09/28" /></Field>
              <Field label="CVC" style={{ flex: 1 }}><Input placeholder="123" /></Field>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12.5, color: PL.faint, marginTop: 6 }}><Ic name="shield" size={15} color={PL.faint} />Secured by Stripe. Background check is a separate step.</div>

            {/* fair-play acknowledgment */}
            <button onClick={() => setAgree(a => !a)} style={{ width: '100%', textAlign: 'left', marginTop: 16, padding: 14, borderRadius: 13, cursor: 'pointer', border: `1.5px solid ${agree ? PL.teal : PL.border}`, background: agree ? PL.tealBg : '#fff', display: 'flex', gap: 11, alignItems: 'flex-start' }}>
              <div style={{ width: 22, height: 22, borderRadius: 7, flexShrink: 0, marginTop: 1, background: agree ? PL.teal : '#fff', border: agree ? 'none' : `2px solid ${PL.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{agree && <Ic name="check" size={14} color="#fff" sw={3} />}</div>
              <div style={{ fontSize: 12.5, color: PL.body, lineHeight: 1.55 }}>
                I agree to the <b style={{ color: PL.teal }}>Trust & Ranking policy</b>: my ranking rises with quality work, fair pricing, and current credentials — and drops for lapsed annual background checks, lawsuits, violent criminal history, price gouging, or poor work. Crimes against children, breaking the law, or bypassing the platform mean suspension or removal. Abandoning a job means ProLnk pursues me legally on the homeowner’s behalf and replaces me on the job.
              </div>
            </button>
          </>
        )}
      </Body>

      {/* sticky CTA */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '12px 20px 30px', background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(12px)', borderTop: `1px solid ${PL.border}` }}>
        <Btn tone="teal" full size="lg" disabled={(step === 2 && !tier) || (step === 3 && zips.length === 0) || (step === 4 && !agree)} onClick={next}>
          {step === 0 ? 'Continue' : step === 1 ? 'Continue' : step === 2 ? `Continue with ${tier || 'a tier'}` : step === 3 ? `Review plan · $${monthly}/mo` : `Pay $${monthly} & join`}
          <Ic name="chevR" size={18} color="#fff" />
        </Btn>
      </div>
    </Screen>
  );
}

// ── SUCCESS ──
function Success({ onNext, tier }) {
  return (
    <Screen bg={PL.slate}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 260, height: 260, borderRadius: 99, background: 'radial-gradient(circle, rgba(13,148,136,0.4), transparent 70%)' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ width: 80, height: 80, borderRadius: 26, background: PL.teal, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 26px', boxShadow: '0 12px 40px rgba(13,148,136,0.5)' }}><Ic name="check" size={42} color="#fff" sw={2.6} /></div>
          <div style={{ fontSize: 30, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 12 }}>You’re in.</div>
          <div style={{ fontSize: 15.5, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, maxWidth: 300 }}>Welcome to ProLnk, {PRO.first}. Your <b style={{ color: '#5EEAD4' }}>{tier}</b> membership is active. One last step builds homeowner trust: your background check.</div>
        </div>
      </div>
      <div style={{ padding: '12px 20px 36px' }}>
        <Btn tone="teal" full size="lg" onClick={onNext}>Start background check <Ic name="chevR" size={18} color="#fff" /></Btn>
      </div>
    </Screen>
  );
}

// ── BACKGROUND CHECK (Checkr) ──
function BackgroundCheck({ onDone }) {
  // states: intro → paying → submitted → pending → clear
  const [state, setState] = useStateO('intro');
  useEffectO(() => {
    if (state === 'submitted') { const t = setTimeout(() => setState('pending'), 1400); return () => clearTimeout(t); }
    if (state === 'pending') { const t = setTimeout(() => setState('clear'), 2600); return () => clearTimeout(t); }
  }, [state]);

  const stages = [
    { k: 'submitted', label: 'Identity submitted' },
    { k: 'pending', label: 'Screening in progress' },
    { k: 'clear', label: 'Report clear' },
  ];
  const order = ['intro', 'paying', 'submitted', 'pending', 'clear'];
  const idx = order.indexOf(state);

  return (
    <Screen bg="#fff">
      <Header title="Background check" sub="Powered by Checkr" />
      <Body style={{ padding: '20px 20px 120px' }}>
        {state === 'intro' && (
          <>
            <div style={{ width: 56, height: 56, borderRadius: 17, background: PL.tealBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}><Ic name="shield" size={30} color={PL.teal} /></div>
            <H1>This is what earns homeowner trust</H1>
            <Sub>Every ProLnk pro is background-checked. It’s a one-time screening through Checkr — most clear within minutes.</Sub>
            <Card style={{ marginBottom: 16, padding: '4px 16px' }}>
              <KV k="Provider" v="Checkr" />
              <KV k="What’s checked" v="Identity · criminal · sex offender" />
              <KV k="One-time fee" v="$34.00" />
              <KV k="Typical result" v="Minutes – 24h" last />
            </Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12.5, color: PL.faint }}><Ic name="shield" size={15} color={PL.faint} />Your data is encrypted and never shown to homeowners.</div>
          </>
        )}

        {(state === 'paying') && (
          <>
            <H1>Pay for your screening</H1>
            <Sub>One-time $34.00 — charged to your card on file.</Sub>
            <Card style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}><div style={{ width: 38, height: 38, borderRadius: 9, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic name="card" size={19} color="#2563EB" /></div><div><div style={{ fontSize: 14, fontWeight: 700, color: PL.ink }}>Visa ···· 4242</div><div style={{ fontSize: 12, color: PL.faint }}>Default card</div></div></div>
              <span style={{ fontSize: 17, fontWeight: 800, color: PL.ink }}>$34.00</span>
            </Card>
          </>
        )}

        {(state === 'submitted' || state === 'pending' || state === 'clear') && (
          <>
            <div style={{ textAlign: 'center', padding: '8px 0 24px' }}>
              {state === 'clear' ? (
                <div style={{ width: 80, height: 80, borderRadius: 26, background: PL.green, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px', boxShadow: '0 10px 30px rgba(22,163,74,0.35)' }}><Ic name="check" size={42} color="#fff" sw={2.6} /></div>
              ) : (
                <div style={{ width: 80, height: 80, borderRadius: 26, background: PL.amberBg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, borderRadius: 26, border: `3px solid ${PL.amberSoft}`, borderTopColor: PL.amber, animation: 'plspin 0.9s linear infinite' }} />
                  <Ic name="clock" size={34} color={PL.amber} />
                </div>
              )}
              <div style={{ fontSize: 22, fontWeight: 800, color: PL.ink, marginBottom: 6 }}>{state === 'clear' ? 'You’re cleared' : state === 'pending' ? 'Screening in progress' : 'Submitted to Checkr'}</div>
              <div style={{ fontSize: 14, color: PL.muted, maxWidth: 280, margin: '0 auto', lineHeight: 1.5 }}>{state === 'clear' ? 'Your report came back clear. You’re fully verified and ready for offers.' : 'This usually takes a few minutes. You can leave — we’ll notify you the moment it’s done.'}</div>
            </div>
            <Card style={{ padding: '6px 16px' }}>
              {stages.map((s, i) => {
                const si = order.indexOf(s.k);
                const active = idx >= si;
                const current = state === s.k && state !== 'clear';
                return (
                  <div key={s.k} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 0', borderBottom: i === stages.length - 1 ? 'none' : `1px solid ${PL.border2}` }}>
                    <div style={{ width: 24, height: 24, borderRadius: 99, flexShrink: 0, background: active ? (s.k === 'clear' ? PL.green : PL.teal) : '#fff', border: active ? 'none' : `2px solid ${PL.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{active && <Ic name="check" size={14} color="#fff" sw={3} />}</div>
                    <span style={{ flex: 1, fontSize: 14.5, fontWeight: active ? 700 : 500, color: active ? PL.ink : PL.faint }}>{s.label}</span>
                    {current && <Badge tone="amber">Working…</Badge>}
                    {idx > si && <Badge tone="green">Done</Badge>}
                  </div>
                );
              })}
            </Card>
          </>
        )}
      </Body>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '12px 20px 30px', background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(12px)', borderTop: `1px solid ${PL.border}` }}>
        {state === 'intro' && <Btn tone="teal" full size="lg" onClick={() => setState('paying')}>Continue · $34 <Ic name="chevR" size={18} color="#fff" /></Btn>}
        {state === 'paying' && <Btn tone="teal" full size="lg" onClick={() => setState('submitted')}>Pay & submit</Btn>}
        {(state === 'submitted' || state === 'pending') && <Btn tone="ghost" full size="lg" onClick={onDone}>Continue to app — notify me when done</Btn>}
        {state === 'clear' && <Btn tone="teal" full size="lg" onClick={onDone}>Enter ProLnk <Ic name="chevR" size={18} color="#fff" /></Btn>}
      </div>
    </Screen>
  );
}

// ── ALL SET (bridge) ──
function AllSet({ onFinish }) { useEffectO(() => { const t = setTimeout(onFinish, 100); return () => clearTimeout(t); }, []); return null; }

// ── small form atoms ──
function H1({ children }) { return <div style={{ fontSize: 24, fontWeight: 800, color: PL.ink, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 8 }}>{children}</div>; }
function Sub({ children }) { return <div style={{ fontSize: 14.5, color: PL.muted, lineHeight: 1.55, marginBottom: 22 }}>{children}</div>; }
function Field({ label, children, style }) { return <div style={{ marginBottom: 14, ...style }}><div style={{ fontSize: 12.5, fontWeight: 700, color: PL.slate3, marginBottom: 7 }}>{label}</div>{children}</div>; }
function Input({ value, onChange, placeholder }) {
  return <input value={value || ''} onChange={e => onChange && onChange(e.target.value)} placeholder={placeholder} style={{
    width: '100%', boxSizing: 'border-box', padding: '13px 14px', fontSize: 15, fontWeight: 600, color: PL.ink,
    border: `1.5px solid ${PL.border}`, borderRadius: 12, outline: 'none', background: '#fff', fontFamily: 'inherit',
  }} onFocus={e => e.target.style.borderColor = PL.teal} onBlur={e => e.target.style.borderColor = PL.border} />;
}

Object.assign(window, { Onboarding, BackgroundCheck, Success });
