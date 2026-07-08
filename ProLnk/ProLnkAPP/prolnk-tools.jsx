// prolnk-tools.jsx — Messages, Schedule, Supplier savings (GPO)
const { useState: useT } = React;

// ════════════════════════════════════════════════════════════
// MESSAGES — in-app chat with homeowners
// ════════════════════════════════════════════════════════════
function MessagesScreen({ onBack, onThreadState }) {
  const [openId, setOpenIdRaw] = useT(null);
  const setOpenId = (id) => { setOpenIdRaw(id); onThreadState && onThreadState(!!id); };
  const [drafts, setDrafts] = useT({});
  const [sent, setSent] = useT({});
  const th = THREADS.find(t => t.id === openId);

  if (th) {
    const extra = sent[th.id] || [];
    const draft = drafts[th.id] || '';
    return (
      <Screen bg="#fff">
        <Header onBack={() => setOpenId(null)} sub={th.job} title={th.name} />
        <div style={{ flex: 1, overflow: 'auto', padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[...th.msgs, ...extra].map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.me ? 'flex-end' : 'flex-start' }}>
              <div style={{ maxWidth: '78%' }}>
                <div style={{
                  padding: '11px 14px', fontSize: 14.5, lineHeight: 1.45, fontWeight: 500,
                  background: m.me ? PL.teal : '#F1F5F9', color: m.me ? '#fff' : PL.ink,
                  borderRadius: m.me ? '18px 18px 5px 18px' : '18px 18px 18px 5px',
                }}>{m.text}</div>
                <div style={{ fontSize: 10.5, color: PL.faint, marginTop: 4, textAlign: m.me ? 'right' : 'left', fontWeight: 600 }}>{m.at}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ flexShrink: 0, padding: '10px 14px 30px', borderTop: `1px solid ${PL.border}`, background: '#fff', display: 'flex', gap: 9, alignItems: 'center' }}>
          <input value={draft} onChange={e => setDrafts(p => ({ ...p, [th.id]: e.target.value }))}
            onKeyDown={e => { if (e.key === 'Enter' && draft.trim()) { setSent(p => ({ ...p, [th.id]: [...(p[th.id] || []), { me: true, text: draft.trim(), at: 'Now' }] })); setDrafts(p => ({ ...p, [th.id]: '' })); } }}
            placeholder={`Message ${th.name}…`} style={{ flex: 1, boxSizing: 'border-box', padding: '12px 15px', fontSize: 14.5, fontWeight: 500, border: `1.5px solid ${PL.border}`, borderRadius: 99, outline: 'none', fontFamily: 'inherit' }} />
          <button onClick={() => { if (draft.trim()) { setSent(p => ({ ...p, [th.id]: [...(p[th.id] || []), { me: true, text: draft.trim(), at: 'Now' }] })); setDrafts(p => ({ ...p, [th.id]: '' })); } }}
            style={{ width: 44, height: 44, borderRadius: 99, border: 'none', background: PL.teal, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
            <Ic name="bolt" size={20} fill color="#fff" />
          </button>
        </div>
      </Screen>
    );
  }

  return (
    <Screen>
      <Header onBack={onBack} title="Messages" sub="Homeowner chat" />
      <Body>
        {THREADS.map(t => (
          <Card key={t.id} onClick={() => setOpenId(t.id)} style={{ marginBottom: 10, display: 'flex', gap: 13, alignItems: 'center' }}>
            <Avatar initials={t.name.split(' ').map(w => w[0]).join('').slice(0, 2)} size={46} tone={t.id === 'TH-1' ? PL.teal : '#7C3AED'} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ fontSize: 15.5, fontWeight: 800, color: PL.ink }}>{t.name}</span>
                <span style={{ fontSize: 11.5, color: PL.faint, fontWeight: 600, flexShrink: 0 }}>{t.at}</span>
              </div>
              <div style={{ fontSize: 12, color: PL.teal, fontWeight: 700, margin: '2px 0' }}>{t.job}</div>
              <div style={{ fontSize: 13, color: t.unread ? PL.ink : PL.muted, fontWeight: t.unread ? 700 : 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.last}</div>
            </div>
            {t.unread > 0 && <span style={{ width: 21, height: 21, borderRadius: 99, background: PL.teal, color: '#fff', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{t.unread}</span>}
          </Card>
        ))}
        <div style={{ fontSize: 12.5, color: PL.faint, textAlign: 'center', marginTop: 14, lineHeight: 1.5 }}>Chat, photos, and scheduling stay in-thread — your number stays private.</div>
      </Body>
    </Screen>
  );
}

// ════════════════════════════════════════════════════════════
// SCHEDULE — availability + bookings
// ════════════════════════════════════════════════════════════
function ScheduleScreen({ onBack }) {
  const [week, setWeek] = useT(() => WEEK.map(d => ({ ...d })));
  const toggle = (i, slot) => setWeek(p => p.map((d, j) => j === i ? { ...d, [slot]: !d[slot] } : d));
  const openSlots = week.reduce((s, d) => s + (d.am ? 1 : 0) + (d.pm ? 1 : 0), 0);

  return (
    <Screen>
      <Header onBack={onBack} title="Schedule" sub="July 6 – 12">
        <div style={{ padding: '0 18px 14px', display: 'flex', gap: 8 }}>
          <Badge tone="teal">{openSlots} open windows</Badge>
          <Badge tone="slate">{BOOKINGS.length} booked</Badge>
        </div>
      </Header>
      <Body>
        {/* availability grid */}
        <SectionLabel>Your availability — tap to toggle</SectionLabel>
        <Card style={{ marginBottom: 18, padding: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
            {week.map((d, i) => (
              <div key={d.d} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 10.5, fontWeight: 800, color: PL.faint, textTransform: 'uppercase' }}>{d.d}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: PL.ink }}>{d.n}</span>
                {['am', 'pm'].map(slot => (
                  <button key={slot} onClick={() => toggle(i, slot)} style={{
                    width: '100%', padding: '7px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
                    fontSize: 9.5, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase',
                    background: d[slot] ? PL.tealSoft : '#F1F5F9', color: d[slot] ? PL.tealDark : PL.faint,
                  }}>{slot}</button>
                ))}
              </div>
            ))}
          </div>
        </Card>

        {/* bookings */}
        <SectionLabel>Booked this week</SectionLabel>
        {BOOKINGS.map((b, i) => (
          <Card key={i} style={{ marginBottom: 10, display: 'flex', gap: 13, alignItems: 'center' }}>
            <div style={{ width: 48, borderRadius: 12, background: PL.tealBg, border: `1px solid ${PL.tealSoft}`, padding: '8px 0', textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: PL.teal, textTransform: 'uppercase' }}>{b.day.split(' ')[0]}</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: PL.tealDark, lineHeight: 1.1 }}>{b.day.split(' ')[1]}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14.5, fontWeight: 700, color: PL.ink, lineHeight: 1.25 }}>{b.title}</div>
              <div style={{ fontSize: 12.5, color: PL.muted, marginTop: 3 }}>{b.win} · {b.who} · {b.zip}</div>
            </div>
            <Ic name="chevR" size={18} color={PL.faint} />
          </Card>
        ))}
        <div style={{ fontSize: 12.5, color: PL.faint, marginTop: 12, display: 'flex', gap: 7, lineHeight: 1.5 }}><Ic name="check" size={15} color={PL.teal} style={{ flexShrink: 0, marginTop: 1 }} />Referral matching respects your open windows — no double-booking.</div>
      </Body>
    </Screen>
  );
}

// ════════════════════════════════════════════════════════════
// SUPPLIER SAVINGS — GPO group discounts
// ════════════════════════════════════════════════════════════
function SupplyScreen({ onBack, onLink }) {
  const ALL = SUPPLIERS.flatMap(g => g.items);
  const [linked, setLinked] = useT(() => Object.fromEntries(ALL.map(s => [s.key, s.linked])));
  const nLinked = Object.values(linked).filter(Boolean).length;
  return (
    <Screen>
      <Header onBack={onBack} title="Supplier savings" sub="Group purchasing" />
      <Body>
        {/* savings hero */}
        <Card style={{ marginBottom: 18, background: PL.slate, borderColor: 'transparent', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -20, width: 140, height: 140, borderRadius: 99, background: 'radial-gradient(circle, rgba(22,163,74,0.35), transparent 70%)' }} />
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Saved on materials · 2026</div>
              <div style={{ fontSize: 34, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', margin: '4px 0 2px' }}><Money value={SUPPLY_STATS.saved} /></div>
              <div style={{ fontSize: 13, color: '#86EFAC', fontWeight: 600 }}>+<Money value={SUPPLY_STATS.rebate} /> rebate pending</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#86EFAC' }}>{nLinked}</div>
              <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>accounts linked</div>
            </div>
          </div>
        </Card>

        <div style={{ background: '#fff', border: `1px solid ${PL.border}`, borderRadius: 14, padding: '14px 16px', marginBottom: 18, display: 'flex', gap: 11 }}>
          <Ic name="bolt" size={20} fill color={PL.green} style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ fontSize: 13, color: PL.body, lineHeight: 1.5 }}>Link your <b style={{ color: PL.ink }}>existing supplier account</b> — you keep your history and rep, but buy at the ProLnk group tier.</div>
        </div>

        <SectionLabel>Enrolled supply houses · {ALL.length}</SectionLabel>
        {SUPPLIERS.map(g => (
          <div key={g.cat} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', color: PL.faint, margin: '0 0 8px 2px' }}>{g.cat}</div>
            <Card style={{ padding: '4px 16px' }}>
              {g.items.map((s, i) => {
                const on = linked[s.key];
                return (
                  <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '13px 0', borderBottom: i === g.items.length - 1 ? 'none' : `1px solid ${PL.border2}` }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: s.tone, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ color: '#fff', fontWeight: 800, fontSize: s.mono.length > 2 ? 11 : s.mono.length > 1 ? 13 : 17 }}>{s.mono}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14.5, fontWeight: 700, color: PL.ink, lineHeight: 1.2 }}>{s.name}</div>
                      <div style={{ fontSize: 12.5, color: PL.green, fontWeight: 700, marginTop: 2 }}>{s.disc} group discount</div>
                    </div>
                    {on ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, border: `1.5px solid ${PL.greenSoft}`, background: PL.greenBg, color: '#15803D', fontSize: 12, fontWeight: 800, padding: '6px 11px', borderRadius: 10, flexShrink: 0 }}><Ic name="check" size={13} color={PL.green} sw={3} />Linked</span>
                    ) : (
                      <Btn tone="slate" size="sm" onClick={() => { setLinked(p => ({ ...p, [s.key]: true })); onLink && onLink(s.name); }}>Link</Btn>
                    )}
                  </div>
                );
              })}
            </Card>
          </div>
        ))}
        <div style={{ fontSize: 12.5, color: PL.faint, marginTop: 6, textAlign: 'center', lineHeight: 1.5 }}>Discount ranges vary by volume tier and region.<br />Group pricing is live at the counter within 24h of linking.</div>
      </Body>
    </Screen>
  );
}

Object.assign(window, { MessagesScreen, ScheduleScreen, SupplyScreen });
