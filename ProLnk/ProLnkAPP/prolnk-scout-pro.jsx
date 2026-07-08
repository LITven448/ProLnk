// prolnk-scout-pro.jsx — Scout hub (two roles), multi-trade project management, job board
const { useState: useSp } = React;

const PIECE_TONES = { open: ['teal', 'Open on board'], claimed: ['amber', 'Claimed'], scheduled: ['green', 'Scheduled'] };

// ════════════════════════════════════════════════════════════
// SCOUT HUB — what a scout is + requests + project + check-up
// ════════════════════════════════════════════════════════════
function ScoutHub({ onProject, onBoard, onAdd }) {
  const S = SCOUT;
  const P = SCOUT_PROJECT;
  const cut = Math.round(P.quote * P.cutPct / 100);
  const HC = HOME_CHECKUP;
  return (
    <Screen>
      <Header title="Scout" sub="Project manager · home documenter" />
      <Body>
        {/* income hero */}
        <Card style={{ background: 'linear-gradient(135deg, #1E1B4B, #312E81)', borderColor: 'transparent', marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -30, width: 160, height: 160, borderRadius: 99, background: 'radial-gradient(circle, rgba(167,139,250,0.4), transparent 70%)' }} />
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 10 }}>Scout income · this month</div>
              <div style={{ fontSize: 34, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}><Money value={S.monthIncome + cut} /></div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>origination + project cuts</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#C4B5FD' }}>{S.properties}</div>
              <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>homes documented</div>
            </div>
          </div>
        </Card>

        {/* the two jobs of a scout */}
        <SectionLabel>A scout does two jobs</SectionLabel>
        <Card onClick={onProject} style={{ marginBottom: 10, display: 'flex', gap: 13, alignItems: 'flex-start', cursor: 'pointer' }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name="network" size={21} color="#7C3AED" /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14.5, fontWeight: 800, color: PL.ink }}>Run multi-trade projects</div>
            <div style={{ fontSize: 12.5, color: PL.muted, lineHeight: 1.5, marginTop: 2 }}>Quote the whole remodel, break it into trade pieces, post them to the job board, and build the team like a project manager. Your cut comes off the top.</div>
          </div>
          <Ic name="chevR" size={18} color={PL.faint} style={{ marginTop: 10 }} />
        </Card>
        <Card style={{ marginBottom: 18, display: 'flex', gap: 13, alignItems: 'flex-start' }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: PL.tealBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name="doc" size={21} color={PL.teal} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14.5, fontWeight: 800, color: PL.ink }}>Document homes — raise the Home Score</div>
            <div style={{ fontSize: 12.5, color: PL.muted, lineHeight: 1.5, marginTop: 2 }}>Full house check-up: photograph the water heater, roof, HVAC, appliances — everything. The profile you upload boosts the home’s score and feeds your quote at the same time.</div>
          </div>
        </Card>

        {/* incoming requests */}
        <SectionLabel>Incoming requests</SectionLabel>
        <Card style={{ marginBottom: 18, padding: '4px 16px' }}>
          {SCOUT_REQUESTS.map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 0', borderBottom: i === SCOUT_REQUESTS.length - 1 ? 'none' : `1px solid ${PL.border2}` }}>
              <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#fff', background: r.tone, padding: '4px 8px', borderRadius: 7, flexShrink: 0, marginTop: 2 }}>{r.from}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: PL.ink, lineHeight: 1.25 }}>{r.name}</div>
                <div style={{ fontSize: 12.5, color: PL.muted, marginTop: 2, lineHeight: 1.4 }}>{r.what}</div>
                {r.share && r.from === 'Inspector' && <div style={{ fontSize: 11, color: PL.faint, marginTop: 3 }}>Referral share to sender — where legally permitted</div>}
              </div>
              <span style={{ fontSize: 11.5, color: PL.faint, fontWeight: 600, flexShrink: 0 }}>{r.when}</span>
            </div>
          ))}
        </Card>

        {/* active project */}
        <SectionLabel action="Open board" onAction={onBoard}>Your active project</SectionLabel>
        <Card onClick={onProject} style={{ marginBottom: 18, cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 15.5, fontWeight: 800, color: PL.ink }}>{P.title}</div>
              <div style={{ fontSize: 12.5, color: PL.muted, marginTop: 2 }}>{P.homeowner} · {P.addr}</div>
            </div>
            <Ic name="chevR" size={18} color={PL.faint} />
          </div>
          <div style={{ display: 'flex', gap: 1, background: PL.border, borderRadius: 11, overflow: 'hidden', border: `1px solid ${PL.border}` }}>
            {[['Quote', `$${fmt(P.quote)}`], ['Your cut', `$${fmt(cut)}`], ['Pieces', `${P.pieces.filter(x => x.status !== 'open').length}/${P.pieces.length} filled`]].map(([l, v], i) => (
              <div key={i} style={{ flex: 1, background: '#fff', padding: '10px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: i === 1 ? '#7C3AED' : PL.ink }}>{v}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: PL.faint, textTransform: 'uppercase', letterSpacing: '0.03em', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* home check-up */}
        <SectionLabel>Latest home check-up</SectionLabel>
        <Card style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 800, color: PL.ink }}>{HC.addr}</div>
              <div style={{ fontSize: 12, color: PL.faint, marginTop: 2 }}>{HC.assets.length} assets documented · photos uploaded</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: PL.faint, textTransform: 'uppercase' }}>Home Score</div>
              <div style={{ fontSize: 16, fontWeight: 800 }}><span style={{ color: PL.faint, textDecoration: 'line-through', fontSize: 13 }}>{HC.scoreBefore}</span> <span style={{ color: PL.green }}>→ {HC.scoreAfter}</span></div>
            </div>
          </div>
          {HC.assets.map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '9px 0', borderBottom: i === HC.assets.length - 1 ? 'none' : `1px solid ${PL.border2}` }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: PL.ink }}>{a.k}</span>
              <span style={{ fontSize: 12.5, color: PL.muted, textAlign: 'right' }}>{a.v}{a.flag && <span style={{ color: PL.amber, fontWeight: 700 }}> · {a.flag}</span>}</span>
            </div>
          ))}
        </Card>
        <Btn tone="outline" full size="lg" onClick={onAdd} style={{ borderStyle: 'dashed' }}><Ic name="plus" size={18} color={PL.slate3} />Start a new check-up</Btn>
      </Body>
    </Screen>
  );
}

// ════════════════════════════════════════════════════════════
// SCOUT PROJECT — pieces, team build, post to board
// ════════════════════════════════════════════════════════════
function ScoutProject({ onBack, onBoard, onPost }) {
  const P = SCOUT_PROJECT;
  const cut = Math.round(P.quote * P.cutPct / 100);
  const open = P.pieces.filter(x => x.status === 'open').length;
  return (
    <Screen>
      <Header onBack={onBack} sub={`${P.id} · ${P.homeowner}`} title={P.title} />
      <Body>
        <Card style={{ background: 'linear-gradient(135deg, #1E1B4B, #312E81)', borderColor: 'transparent', marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -20, width: 130, height: 130, borderRadius: 99, background: 'radial-gradient(circle, rgba(167,139,250,0.4), transparent 70%)' }} />
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Whole-project quote</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginTop: 4 }}><Money value={P.quote} /></div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Your cut · {P.cutPct}%</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#C4B5FD', marginTop: 4 }}><Money value={cut} /></div>
            </div>
          </div>
        </Card>

        <div style={{ background: '#fff', border: `1px solid ${PL.border}`, borderRadius: 14, padding: '13px 16px', marginBottom: 18, display: 'flex', gap: 11 }}>
          <Ic name="network" size={19} color="#7C3AED" style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ fontSize: 12.5, color: PL.body, lineHeight: 1.5 }}>You scoped and quoted the whole job. Now post each trade piece to the <b style={{ color: PL.ink }}>job board</b> — pros claim them, you build the team, and hand off each piece once it’s scheduled.</div>
        </div>

        <SectionLabel action={`${open} open`}>Project pieces</SectionLabel>
        {P.pieces.map((p, i) => {
          const [tone, label] = PIECE_TONES[p.status];
          return (
            <Card key={i} style={{ marginBottom: 9, display: 'flex', alignItems: 'center', gap: 12, padding: '13px 15px' }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic name="wrench" size={18} color={PL.slate3} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: PL.ink }}>{p.trade}</div>
                <div style={{ fontSize: 12, color: PL.faint, marginTop: 1 }}>{p.by ? `${p.by}` : 'Waiting for a pro to claim'}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: 14.5, fontWeight: 800, color: PL.ink }}><Money value={p.pay} /></div>
                <Badge tone={tone} style={{ marginTop: 4 }}>{label}</Badge>
              </div>
            </Card>
          );
        })}

        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          <Btn tone="outline" size="lg" style={{ flex: 1 }} onClick={onBoard}>View board</Btn>
          <Btn tone="teal" size="lg" style={{ flex: 1.6 }} onClick={onPost}><Ic name="bolt" size={17} fill color="#fff" />Post {open} open piece{open === 1 ? '' : 's'}</Btn>
        </div>
      </Body>
    </Screen>
  );
}

// ════════════════════════════════════════════════════════════
// JOB BOARD — all scout-posted pieces, gated to your trades
// ════════════════════════════════════════════════════════════
function JobBoard({ onBack, onClaim }) {
  const [claimed, setClaimed] = useSp({});
  const [filter, setFilter] = useSp('mine');
  const [openId, setOpenId] = useSp(null);
  const eligible = (j) => PRO.trades.includes(j.trade);
  const jobs = BOARD_JOBS.filter(j => filter === 'mine' ? eligible(j) : true);
  const mineCount = BOARD_JOBS.filter(eligible).length;
  const job = BOARD_JOBS.find(j => j.id === openId);

  // ── detail view ──
  if (job) {
    const ok = eligible(job);
    const got = claimed[job.id];
    return (
      <Screen bg="#fff">
        <Header onBack={() => setOpenId(null)} sub={`${job.project} · ${job.id}`} title={job.title} />
        <Body style={{ padding: '16px 16px 130px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 16 }}>
            <TradeChip trade={job.trade} />
            {!ok && <Badge tone="slate"><Ic name="lock" size={11} color={PL.muted} />Not your trade</Badge>}
            {ok && !got && <Badge tone="teal">You qualify</Badge>}
            {got && <Badge tone="green">Claimed by you</Badge>}
          </div>

          {/* quote for this portion */}
          <Card style={{ marginBottom: 16, background: ok ? PL.greenBg : PL.bg, borderColor: ok ? PL.greenSoft : PL.border, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: ok ? '#15803D' : PL.faint, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Quote for your portion</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: ok ? PL.green : PL.faint, letterSpacing: '-0.02em', lineHeight: 1.1 }}><Money value={job.pay} /></div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: PL.faint, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Starts</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: PL.ink }}>{job.start}</div>
            </div>
          </Card>

          <SectionLabel>Job details</SectionLabel>
          <Card style={{ padding: '4px 16px', marginBottom: 16 }}>
            <KV k="Address" v={job.addr} />
            <KV k="Distance" v={`${job.mi} mi from you`} />
            <KV k="Start date" v={job.start} />
            <KV k="Project" v={job.project} />
            <KV k="Scout / PM" v={job.scout} last />
          </Card>

          <SectionLabel>Scope — set by the scout</SectionLabel>
          <div style={{ fontSize: 14.5, color: PL.body, lineHeight: 1.6, marginBottom: 16 }}>{job.scope}</div>

          <div style={{ display: 'flex', gap: 7, fontSize: 12.5, color: PL.faint, lineHeight: 1.5 }}><Ic name="shield" size={15} color={PL.faint} style={{ flexShrink: 0, marginTop: 1 }} />The scout scoped and priced this portion. Claim locks the price; the scout schedules your hand-off.</div>
        </Body>

        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '12px 16px 30px', background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(12px)', borderTop: `1px solid ${PL.border}`, zIndex: 20 }}>
          {got ? (
            <Btn tone="slate" full size="lg" onClick={() => setOpenId(null)}>Claimed — back to board</Btn>
          ) : ok ? (
            <Btn tone="teal" full size="lg" onClick={() => { setClaimed(c => ({ ...c, [job.id]: true })); onClaim && onClaim(job); }}><Ic name="check" size={19} color="#fff" />Claim · ${''}{fmt(job.pay)}</Btn>
          ) : (
            <Btn tone="ghost" full size="lg" disabled><Ic name="lock" size={17} color={PL.faint} />Only {job.trade} pros can claim this</Btn>
          )}
        </div>
      </Screen>
    );
  }

  // ── board list ──
  return (
    <Screen>
      <Header onBack={onBack} title="Job board" sub="Scout-posted work">
        <div style={{ display: 'flex', gap: 8, padding: '0 18px 14px' }}>
          {[['mine', `My trades · ${mineCount}`], ['all', `All · ${BOARD_JOBS.length}`]].map(([k, l]) => (
            <button key={k} onClick={() => setFilter(k)} style={{ padding: '7px 14px', borderRadius: 99, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: 'none', background: filter === k ? PL.slate : '#F1F5F9', color: filter === k ? '#fff' : PL.slate3 }}>{l}</button>
          ))}
        </div>
      </Header>
      <Body>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, background: '#EDE9FE', border: '1px solid #DDD6FE', borderRadius: 14, padding: '12px 15px', marginBottom: 16 }}>
          <Ic name="bolt" size={18} fill color="#7C3AED" />
          <div style={{ fontSize: 12.5, color: '#5B21B6', fontWeight: 600, lineHeight: 1.45 }}>Every piece is scoped and priced by a scout. You can only claim work in your trades — a painter can never take a plumbing quote.</div>
        </div>

        {jobs.map(j => {
          const ok = eligible(j);
          const got = claimed[j.id];
          return (
            <Card key={j.id} onClick={() => setOpenId(j.id)} style={{ marginBottom: 10, padding: '14px 16px', cursor: 'pointer', opacity: ok ? 1 : 0.62 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <TradeChip trade={j.trade} />
                  {!ok && <Ic name="lock" size={13} color={PL.faint} />}
                  {got && <Badge tone="green">Claimed</Badge>}
                </div>
                <span style={{ fontSize: 16, fontWeight: 800, color: ok ? PL.green : PL.faint }}><Money value={j.pay} /></span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: PL.ink, lineHeight: 1.25, marginBottom: 5 }}>{j.title}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12.5, color: PL.muted, fontWeight: 600, flexWrap: 'wrap' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Ic name="pin" size={13} color={PL.faint} />{j.addr.split(',')[0]} · {j.mi} mi</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Ic name="clock" size={13} color={PL.faint} />Starts {j.start}</span>
              </div>
            </Card>
          );
        })}
        {jobs.length === 0 && <div style={{ textAlign: 'center', padding: '40px 24px', fontSize: 14, color: PL.muted }}>No open pieces in your trades right now.</div>}
      </Body>
    </Screen>
  );
}

Object.assign(window, { ScoutHub, ScoutProject, JobBoard });
