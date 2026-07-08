// prolnk-analytics.jsx — Earnings → Analytics: W/M/Y ranges, revenue by stream, performance
const { useState: useAn } = React;

// stacked revenue by period: [jobs, referral overrides, scout]
const AN_DATA = {
  weeks: { unit: 'week', labels: ['May 25', 'Jun 1', 'Jun 8', 'Jun 15', 'Jun 22', 'Jun 29', 'Jul 6', 'This wk'],
    rows: [[980, 160, 60], [1240, 180, 80], [890, 170, 80], [1480, 190, 80], [1120, 180, 80], [1610, 200, 80], [1370, 190, 80], [820, 95, 40]] },
  months: { unit: 'month', labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    rows: [[2400, 310, 0], [2900, 360, 0], [3300, 420, 0], [2800, 460, 120], [3600, 510, 180], [3900, 540, 220], [3400, 580, 240], [4300, 620, 260], [4700, 660, 280], [5000, 700, 300], [5180, 740, 320], [2100, 280, 130]] },
  years: { unit: 'year', labels: ['2024', '2025', '2026 YTD'],
    rows: [[18400, 0, 0], [38200, 4100, 900], [28900, 4200, 1800]] },
};
const AN_STREAMS = [
  { key: 'jobs', label: 'Job revenue', color: '#16A34A' },
  { key: 'network', label: 'Referral overrides', color: '#0D9488' },
  { key: 'scout', label: 'Scout income', color: '#7C3AED' },
];
const AN_PERF = {
  weeks: [['Jobs completed', '4'], ['Avg job value', '$412'], ['Quote win rate', '71%'], ['Avg response', '9 min']],
  months: [['Jobs completed', '14'], ['Avg job value', '$438'], ['Quote win rate', '68%'], ['Avg response', '11 min']],
  years: [['Jobs completed', '96'], ['Avg job value', '$421'], ['Quote win rate', '66%'], ['Avg response', '12 min']],
};

function AnalyticsScreen({ onBack }) {
  const [range, setRange] = useAn('months');
  const [sel, setSel] = useAn(null); // selected bar index
  const D = AN_DATA[range];
  const totals = D.rows.map(r => r.reduce((a, b) => a + b, 0));
  const max = Math.max(...totals);
  const selIdx = sel != null ? sel : D.rows.length - 1;
  const selRow = D.rows[selIdx];
  const selTotal = totals[selIdx];
  const prevTotal = selIdx > 0 ? totals[selIdx - 1] : null;
  const delta = prevTotal ? Math.round((selTotal - prevTotal) / prevTotal * 100) : null;
  const rangeTotal = totals.reduce((a, b) => a + b, 0);

  return (
    <Screen>
      <Header onBack={onBack} title="Analytics" sub="Revenue & performance" />
      <Body>
        {/* range switcher */}
        <div style={{ display: 'flex', gap: 6, background: '#F1F5F9', borderRadius: 12, padding: 4, marginBottom: 18 }}>
          {[['weeks', 'Weeks'], ['months', 'Months'], ['years', 'Years']].map(([k, l]) => (
            <button key={k} onClick={() => { setRange(k); setSel(null); }} style={{ flex: 1, padding: '9px 0', borderRadius: 9, border: 'none', cursor: 'pointer', fontSize: 13.5, fontWeight: 800, background: range === k ? '#fff' : 'transparent', color: range === k ? PL.ink : PL.slate3, boxShadow: range === k ? '0 1px 4px rgba(15,23,42,0.1)' : 'none' }}>{l}</button>
          ))}
        </div>

        {/* selected period readout */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: PL.faint, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>{D.labels[selIdx]}</div>
            <div style={{ fontSize: 34, fontWeight: 800, color: PL.ink, letterSpacing: '-0.02em', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>${fmt(selTotal)}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            {delta != null && <Badge tone={delta >= 0 ? 'green' : 'amber'}>{delta >= 0 ? '↑' : '↓'} {Math.abs(delta)}% vs prior {D.unit}</Badge>}
            <div style={{ fontSize: 11.5, color: PL.faint, fontWeight: 600, marginTop: 5 }}>${fmt(rangeTotal)} across {D.labels.length} {D.unit}s</div>
          </div>
        </div>

        {/* stacked bar chart — tap a bar to inspect */}
        <Card style={{ marginBottom: 18, padding: '18px 14px 12px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: range === 'weeks' ? 7 : range === 'months' ? 5 : 26, height: 130, padding: range === 'years' ? '0 20px' : 0 }}>
            {D.rows.map((row, i) => {
              const h = totals[i] / max * 100;
              const on = i === selIdx;
              return (
                <button key={i} onClick={() => setSel(i)} style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', border: 'none', background: 'none', padding: 0, cursor: 'pointer', opacity: on ? 1 : 0.45, transition: 'opacity .15s' }}>
                  <div style={{ height: `${Math.max(h, 3)}%`, display: 'flex', flexDirection: 'column', borderRadius: 6, overflow: 'hidden' }}>
                    {[2, 1, 0].map(s => row[s] > 0 && (
                      <div key={s} style={{ flexGrow: row[s], background: AN_STREAMS[s].color }} />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: range === 'weeks' ? 7 : range === 'months' ? 5 : 26, marginTop: 8, padding: range === 'years' ? '0 20px' : 0 }}>
            {D.labels.map((l, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: range === 'months' ? 8.5 : 10, fontWeight: 700, color: i === selIdx ? PL.ink : PL.faint, whiteSpace: 'nowrap', overflow: 'hidden' }}>{l}</div>
            ))}
          </div>
        </Card>

        {/* revenue by stream for selected period */}
        <SectionLabel>Revenue · {D.labels[selIdx]}</SectionLabel>
        <Card style={{ marginBottom: 18, padding: '6px 16px' }}>
          {AN_STREAMS.map((s, i) => {
            const amt = selRow[i];
            const prev = selIdx > 0 ? D.rows[selIdx - 1][i] : null;
            const d = prev ? Math.round((amt - prev) / (prev || 1) * 100) : null;
            return (
              <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '12px 0', borderBottom: i === AN_STREAMS.length - 1 ? 'none' : `1px solid ${PL.border2}` }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: s.color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: PL.ink }}>{s.label}</div>
                  <div style={{ fontSize: 11.5, color: PL.faint, marginTop: 1 }}>{selTotal ? Math.round(amt / selTotal * 100) : 0}% of the {D.unit}</div>
                </div>
                {d != null && amt > 0 && <span style={{ fontSize: 11.5, fontWeight: 800, color: d >= 0 ? PL.green : PL.amber }}>{d >= 0 ? '+' : ''}{d}%</span>}
                <div style={{ fontSize: 15.5, fontWeight: 800, color: PL.ink, minWidth: 64, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>${fmt(amt)}</div>
              </div>
            );
          })}
        </Card>

        {/* performance metrics for the range */}
        <SectionLabel>Performance · this {D.unit}</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 8 }}>
          {AN_PERF[range].map(([l, v], i) => (
            <Card key={i} style={{ padding: '13px 15px' }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: PL.faint, textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 5 }}>{l}</div>
              <div style={{ fontSize: 21, fontWeight: 800, color: PL.ink, letterSpacing: '-0.02em' }}>{v}</div>
            </Card>
          ))}
        </div>
        <div style={{ fontSize: 12, color: PL.faint, textAlign: 'center', lineHeight: 1.5, marginTop: 6 }}>Tap any bar to inspect that {D.unit}. Amounts are after the platform fee.</div>
      </Body>
    </Screen>
  );
}

Object.assign(window, { AnalyticsScreen });
