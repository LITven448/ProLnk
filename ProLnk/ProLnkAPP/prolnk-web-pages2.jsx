// prolnk-web-pages2.jsx — Earnings, Referral network, Scout (desktop)

// ════════════════════════════════════════════════════════════
// 5 · EARNINGS
// ════════════════════════════════════════════════════════════
function WebEarnings({ onGoNetwork, onGoScout }) {
  const E = EARNINGS;
  const streamTotal = E.streams.reduce((s, x) => s + x.amount, 0);
  return (
    <div>
      <PageHead eyebrow="Step 5 · Grow" title="Earnings"
        desc="Your money, in full — job revenue you keep, referral income from your network, and recurring Scout origination. Paid out to your bank via Stripe." />

      {/* top stat row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
        <WebCard style={{ padding: 22, background: PL.slate, borderColor: 'transparent', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -20, width: 130, height: 130, borderRadius: 99, background: 'radial-gradient(circle, rgba(13,148,136,0.4), transparent 70%)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>This month</span>
              <Badge tone="green" solid><Ic name="arrowUp" size={11} color="#fff" />{E.monthDelta}%</Badge>
            </div>
            <div style={{ fontSize: 34, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}><Money value={E.month} /></div>
            <div style={{ marginTop: 10 }}><Sparkline data={E.spark} w={180} h={40} color="#5EEAD4" /></div>
          </div>
        </WebCard>
        {[['Lifetime earnings', <Money value={E.lifetime} />, 'since ' + PRO.joined], ['Pending payout', <Money value={E.pending} />, 'in escrow'], ['Next payout', E.nextPayout, 'via Stripe Connect']].map(([l, v, s], i) => (
          <WebCard key={i} style={{ padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: PL.faint, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>{l}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: PL.ink, letterSpacing: '-0.02em', lineHeight: 1 }}>{v}</div>
            <div style={{ fontSize: 12.5, color: PL.faint, marginTop: 6 }}>{s}</div>
          </WebCard>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20, alignItems: 'start' }}>
        {/* streams */}
        <WebCard style={{ padding: 24 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: PL.ink, marginBottom: 18 }}>Where it comes from</div>
          <div style={{ display: 'flex', height: 14, borderRadius: 99, overflow: 'hidden', marginBottom: 20 }}>
            {E.streams.map(s => <div key={s.key} style={{ width: `${s.amount / streamTotal * 100}%`, background: s.color }} />)}
          </div>
          {E.streams.map((s, i) => (
            <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '14px 0', borderBottom: i === E.streams.length - 1 ? 'none' : `1px solid ${PL.border2}` }}>
              <span style={{ width: 12, height: 12, borderRadius: 4, background: s.color, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: PL.ink }}>{s.label}</div>
                <div style={{ fontSize: 13, color: PL.faint, marginTop: 2 }}>{s.note}</div>
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: PL.ink }}><Money value={s.amount} /></div>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
            <button onClick={onGoNetwork} className="pl-card" style={{ flex: 1, textAlign: 'left', cursor: 'pointer', border: `1px solid ${PL.border}`, borderRadius: 13, padding: 16, background: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}><Ic name="network" size={17} color={PL.teal} /><span style={{ fontSize: 13.5, fontWeight: 700, color: PL.ink, whiteSpace: 'nowrap' }}>Grow network</span></div>
              <div style={{ fontSize: 12.5, color: PL.faint, lineHeight: 1.4 }}>Earn 4 levels deep</div>
            </button>
            <button onClick={onGoScout} className="pl-card" style={{ flex: 1, textAlign: 'left', cursor: 'pointer', border: `1px solid ${PL.border}`, borderRadius: 13, padding: 16, background: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}><Ic name="scout" size={17} color="#7C3AED" /><span style={{ fontSize: 13.5, fontWeight: 700, color: PL.ink, whiteSpace: 'nowrap' }}>Add Scout</span></div>
              <div style={{ fontSize: 12.5, color: PL.faint, lineHeight: 1.4 }}>Recurring origination</div>
            </button>
          </div>
        </WebCard>

        {/* right rail: tier + payouts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <WebCard style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 16 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: PL.slate, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic name="bolt" size={22} fill color="#5EEAD4" /></div>
              <div><div style={{ fontSize: 16, fontWeight: 800, color: PL.ink }}>Pro tier</div><div style={{ fontSize: 12.5, color: PL.muted, fontWeight: 600 }}>{PRO.keepRate}% keep rate · 4 areas</div></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12.5, fontWeight: 700, marginBottom: 9, whiteSpace: 'nowrap' }}><span style={{ color: PL.slate3 }}>To Business tier</span><span style={{ color: PL.teal }}>{PRO.matchesThisTier} / {PRO.matchesNeeded} matches</span></div>
            <Progress value={PRO.matchesThisTier} max={PRO.matchesNeeded} />
            <div style={{ fontSize: 12.5, color: PL.faint, marginTop: 10, lineHeight: 1.5 }}>2 more matches unlocks the <b style={{ color: PL.slate3 }}>60% keep rate</b> + Scout included.</div>
          </WebCard>

          <WebCard style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: PL.ink }}>Payouts</span>
              <Badge tone="teal"><Ic name="check" size={11} color={PL.teal} />Stripe connected</Badge>
            </div>
            {E.payouts.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 0', borderBottom: i === E.payouts.length - 1 ? 'none' : `1px solid ${PL.border2}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 9, background: PL.greenBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic name="check" size={16} color={PL.green} /></div>
                  <div><div style={{ fontSize: 13.5, fontWeight: 700, color: PL.ink }}>Payout</div><div style={{ fontSize: 11.5, color: PL.faint }}>{p.date}</div></div>
                </div>
                <span style={{ fontSize: 15, fontWeight: 800, color: PL.green }}><Money value={p.amount} sign /></span>
              </div>
            ))}
          </WebCard>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// 6 · REFERRAL NETWORK
// ════════════════════════════════════════════════════════════
function WebNetwork({ onInvite }) {
  const N = NETWORK;
  const [copied, setCopied] = React.useState(false);
  return (
    <div>
      <PageHead eyebrow="Step 6 · Grow" title="Referral network"
        desc="Recruit other pros and earn a share of their work — four levels deep. This is income that compounds while you sleep, shown as your money, plainly." />

      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 20, alignItems: 'start' }}>
        {/* left: link + invite */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <WebCard style={{ padding: 24, background: PL.slate, borderColor: 'transparent', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -30, right: -20, width: 140, height: 140, borderRadius: 99, background: 'radial-gradient(circle, rgba(13,148,136,0.4), transparent 70%)' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Network income earned</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', margin: '6px 0 4px' }}><Money value={N.totalEarned} /></div>
              <div style={{ fontSize: 13, color: '#5EEAD4', fontWeight: 600 }}><Money value={N.monthEarned} sign /> this month · {N.active} active</div>
            </div>
          </WebCard>
          <WebCard style={{ padding: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: PL.faint, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>Your invite link</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: PL.bg, border: `1px solid ${PL.border}`, borderRadius: 11, padding: '11px 13px', marginBottom: 12 }}>
              <Ic name="share" size={17} color={PL.teal} />
              <span style={{ flex: 1, fontSize: 13.5, fontWeight: 700, color: PL.slate3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{N.link}</span>
              <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }} style={{ border: 'none', background: copied ? PL.green : PL.slate, color: '#fff', fontSize: 12, fontWeight: 700, padding: '7px 11px', borderRadius: 8, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5 }}><Ic name={copied ? 'check' : 'copy'} size={13} color="#fff" />{copied ? 'Copied' : 'Copy'}</button>
            </div>
            <Btn tone="teal" full onClick={onInvite}><Ic name="plus" size={17} color="#fff" />Invite a pro</Btn>
          </WebCard>
          {/* level rates */}
          <WebCard style={{ padding: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: PL.faint, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>Income by level</div>
            {N.levels.map((lv, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: i === N.levels.length - 1 ? 'none' : `1px solid ${PL.border2}` }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: i === 0 ? PL.tealBg : '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><span style={{ fontSize: 13, fontWeight: 800, color: i === 0 ? PL.teal : PL.slate3 }}>{lv.rate}%</span></div>
                <div style={{ flex: 1 }}><div style={{ fontSize: 13.5, fontWeight: 700, color: PL.ink }}>Level {lv.depth}</div><div style={{ fontSize: 11.5, color: PL.faint }}>{lv.count} pros</div></div>
                <span style={{ fontSize: 14.5, fontWeight: 800, color: PL.ink }}><Money value={lv.earned} /></span>
              </div>
            ))}
          </WebCard>
        </div>

        {/* right: recruits table */}
        <WebCard style={{ overflow: 'hidden' }}>
          <div style={{ padding: '18px 24px', borderBottom: `1px solid ${PL.border2}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: PL.ink }}>Pros you recruited</span>
            <span style={{ fontSize: 13, color: PL.faint, fontWeight: 600 }}>{N.recruits.length} direct · {N.invitesPending} pending invites</span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr style={{ textAlign: 'left' }}>{['Pro', 'Trade', 'Jobs', 'Status', 'Earned you'].map(h => <th key={h} style={{ fontSize: 11.5, fontWeight: 800, color: PL.faint, textTransform: 'uppercase', letterSpacing: '0.04em', padding: '14px 24px' }}>{h}</th>)}</tr></thead>
            <tbody>{N.recruits.map((r, i) => (
              <tr key={i} style={{ borderTop: `1px solid ${PL.border2}` }}>
                <td style={{ padding: '14px 24px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 11 }}><Avatar initials={r.initials} size={36} tone={['#0D9488', '#7C3AED', '#D97706', '#0EA5E9'][i % 4]} /><span style={{ fontSize: 14.5, fontWeight: 700, color: PL.ink }}>{r.name}</span></div></td>
                <td style={{ padding: '14px 24px', fontSize: 14, color: PL.muted }}>{r.trade}</td>
                <td style={{ padding: '14px 24px', fontSize: 14, color: PL.muted, fontWeight: 600 }}>{r.jobs}</td>
                <td style={{ padding: '14px 24px' }}>{r.active ? <Badge tone="green">Active</Badge> : <Badge tone="slate">Inactive</Badge>}</td>
                <td style={{ padding: '14px 24px', fontSize: 15, fontWeight: 800, color: PL.teal }}><Money value={r.earned} /></td>
              </tr>
            ))}</tbody>
          </table>
          <div style={{ padding: '18px 24px', background: PL.bg, borderTop: `1px solid ${PL.border2}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13.5, color: PL.muted, fontWeight: 600 }}>Total earned from your network</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: PL.teal }}><Money value={N.totalEarned} /></span>
          </div>
        </WebCard>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// 7 · SCOUT
// ════════════════════════════════════════════════════════════
function WebScout({ onAdd }) {
  const S = SCOUT;
  return (
    <div>
      <PageHead eyebrow="Step 7 · Grow" title="Scout"
        desc="Onboard a property once and claim permanent origination rights — you earn recurring income on every job that home ever generates, forever."
        right={<Btn tone="teal" onClick={onAdd}><Ic name="plus" size={17} color="#fff" />Onboard a property</Btn>} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
        <WebCard style={{ padding: 24, background: 'linear-gradient(135deg, #1E1B4B, #312E81)', borderColor: 'transparent', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -20, width: 130, height: 130, borderRadius: 99, background: 'radial-gradient(circle, rgba(167,139,250,0.4), transparent 70%)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 12 }}>This month</div>
            <div style={{ fontSize: 34, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}><Money value={S.monthIncome} /></div>
            <div style={{ fontSize: 13, color: '#C4B5FD', marginTop: 8, fontWeight: 600 }}>recurring origination income</div>
          </div>
        </WebCard>
        {[['Lifetime origination', <Money value={S.lifetimeIncome} />, 'across all properties'], ['Properties earning', S.properties, 'claimed permanently']].map(([l, v, s], i) => (
          <WebCard key={i} style={{ padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: PL.faint, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>{l}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: PL.ink, letterSpacing: '-0.02em' }}>{v}</div>
            <div style={{ fontSize: 12.5, color: PL.faint, marginTop: 6 }}>{s}</div>
          </WebCard>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {S.homes.map((h, i) => (
          <WebCard key={i} className="pl-card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic name="pin" size={22} color="#7C3AED" /></div>
              <Sparkline data={h.trend} w={72} h={34} color="#7C3AED" fill={false} />
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: PL.ink }}>{h.addr}</div>
            <div style={{ fontSize: 13, color: PL.faint, marginTop: 2, marginBottom: 16 }}>{h.city} · since {h.onboarded}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: `1px solid ${PL.border2}` }}>
              <span style={{ fontSize: 12.5, color: PL.muted, fontWeight: 600 }}>{h.jobs} jobs originated</span>
              <span style={{ fontSize: 17, fontWeight: 800, color: '#7C3AED' }}><Money value={h.lifetime} /></span>
            </div>
          </WebCard>
        ))}
        <button onClick={onAdd} className="pl-card" style={{ border: `1.5px dashed ${PL.border}`, borderRadius: 18, background: '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, minHeight: 180, color: PL.muted, padding: 16, textAlign: 'center' }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic name="plus" size={22} color={PL.slate3} /></div>
          <div><div style={{ fontSize: 14.5, fontWeight: 700, color: PL.slate3, lineHeight: 1.3 }}>Onboard property</div><div style={{ fontSize: 12.5, color: PL.faint, marginTop: 3 }}>Claim origination rights</div></div>
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { WebEarnings, WebNetwork, WebScout });
