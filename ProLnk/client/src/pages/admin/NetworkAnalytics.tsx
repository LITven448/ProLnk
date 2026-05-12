import React, { useMemo } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Users, TrendingUp, MapPin, Network, Star, BarChart3, DollarSign, GitBranch } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const TIER_CONFIG = [
  { key: "charter",  label: "Charter",  cap: 25,   color: "#F59E0B", bg: "rgba(245,158,11,0.15)" },
  { key: "founding", label: "Founding", cap: 100,  color: "#8B5CF6", bg: "rgba(139,92,246,0.15)" },
  { key: "level3",   label: "Level 3",  cap: 400,  color: "#17C1E8", bg: "rgba(23,193,232,0.15)" },
  { key: "level4",   label: "Level 4",  cap: 1600, color: "#22C55E", bg: "rgba(34,197,94,0.15)"  },
];

function StatCard({
  label, value, sub, icon, color = "#17C1E8",
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ReactNode;
  color?: string;
}) {
  return (
    <div style={{ background: "#FFFFFF", borderRadius: 14, padding: "20px 22px", border: "1px solid #E9ECEF", display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#7B809A" }}>{label}</span>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: `${color}22`, display: "flex", alignItems: "center", justifyContent: "center", color }}>{icon}</div>
      </div>
      <p style={{ fontSize: 28, fontWeight: 800, color: "#344767", margin: 0 }}>{value}</p>
      {sub && <p style={{ fontSize: 12, color: "#AEAEAE", margin: 0 }}>{sub}</p>}
    </div>
  );
}

function ProgressBar({ label, fill, cap, color, bg }: { label: string; fill: number; cap: number; color: string; bg: string }) {
  const pct = Math.min(Math.round((fill / cap) * 100), 100);
  return (
    <div style={{ background: bg, borderRadius: 12, padding: "14px 18px", border: `1px solid ${color}44` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontWeight: 700, fontSize: 13, color: "#344767" }}>{label}</span>
        <span style={{ fontSize: 12, color: "#7B809A" }}>{fill} / {cap} ({pct}%)</span>
      </div>
      <div style={{ height: 8, background: "rgba(0,0,0,0.08)", borderRadius: 6, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 6, transition: "width 0.7s ease" }} />
      </div>
    </div>
  );
}

export default function NetworkAnalytics() {
  const { data: raw = [], isLoading } = trpc.waitlistAdmin.getProWaitlist.useQuery({ limit: 2000 });

  const stats = useMemo(() => {
    if (!raw.length) return null;

    const total = raw.length;

    const referralMap: Record<string, number> = {};
    raw.forEach((p: any) => {
      if (p.referredBy) {
        referralMap[p.referredBy] = (referralMap[p.referredBy] ?? 0) + 1;
      }
    });
    const totalReferrals = Object.values(referralMap).reduce((s, v) => s + v, 0);
    const avgReferrals = total ? (totalReferrals / total).toFixed(2) : "0";
    const topReferrers = Object.entries(referralMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, count]) => ({ name, count }));

    const tierCounts: Record<string, number> = { charter: 0, founding: 0, level3: 0, level4: 0 };
    raw.forEach((p: any) => {
      const t = (p.tier || "").toLowerCase();
      if (t === "charter") tierCounts.charter++;
      else if (t === "founding") tierCounts.founding++;
      else if (t === "level3" || t === "l3") tierCounts.level3++;
      else if (t === "level4" || t === "l4") tierCounts.level4++;
    });

    // Referral depth distribution
    const refCodeSet = new Set(raw.map((p: any) => p.referralCode).filter(Boolean));
    const directRecruiters = raw.filter((p: any) => p.referralCount > 0).length;
    const hasL2 = raw.filter((p: any) => {
      if (!p.referralCode) return false;
      return raw.some((r: any) => r.referredBy === p.referralCode && (r.referralCount ?? 0) > 0);
    }).length;
    const hasL3depth = raw.filter((p: any) => {
      if (!p.referralCode) return false;
      const l2recruits = raw.filter((r: any) => r.referredBy === p.referralCode);
      return l2recruits.some((r2: any) => r2.referralCode && raw.some((r3: any) => r3.referredBy === r2.referralCode && (r3.referralCount ?? 0) > 0));
    }).length;
    const referralDepth = { direct: directRecruiters, l2: hasL2, l3: hasL3depth };

    void refCodeSet;

    const velocityMap: Record<string, number> = {};
    raw.forEach((p: any) => {
      if (!p.createdAt) return;
      const d = new Date(p.createdAt);
      const key = d.toISOString().slice(0, 10);
      velocityMap[key] = (velocityMap[key] ?? 0) + 1;
    });
    const velocityDays = Object.entries(velocityMap)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-14);

    const cityMap: Record<string, number> = {};
    const stateMap: Record<string, number> = {};
    raw.forEach((p: any) => {
      if (p.primaryCity) {
        const key = p.primaryState ? `${p.primaryCity}, ${p.primaryState}` : p.primaryCity;
        cityMap[key] = (cityMap[key] ?? 0) + 1;
      }
      if (p.primaryState) stateMap[p.primaryState] = (stateMap[p.primaryState] ?? 0) + 1;
    });
    const topCities = Object.entries(cityMap).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const topStates = Object.entries(stateMap).sort((a, b) => b[1] - a[1]).slice(0, 8);

    const maxVelocity = Math.max(...velocityDays.map(d => d[1]), 1);
    const maxCity = Math.max(...topCities.map(c => c[1]), 1);

    const dailyTierMap: Record<string, { date: string; charter: number; founding: number; level3: number; level4: number; other: number }> = {};
    for (let i = 13; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
      dailyTierMap[d] = { date: d.slice(5), charter: 0, founding: 0, level3: 0, level4: 0, other: 0 };
    }
    raw.forEach((p: any) => {
      if (!p.createdAt) return;
      const d = new Date(p.createdAt).toISOString().slice(0, 10);
      if (!(d in dailyTierMap)) return;
      const t = (p.tier || "").toLowerCase();
      const bucket = dailyTierMap[d];
      if (t === "charter") bucket.charter++;
      else if (t === "founding") bucket.founding++;
      else if (t === "level3" || t === "l3") bucket.level3++;
      else if (t === "level4" || t === "l4") bucket.level4++;
      else bucket.other++;
    });
    const dailySignups = Object.values(dailyTierMap);

    return { total, totalReferrals, avgReferrals, topReferrers, tierCounts, velocityDays, topCities, topStates, maxVelocity, maxCity, dailySignups, referralDepth };
  }, [raw]);

  return (
    <AdminLayout title="Network Analytics" subtitle="Tier distribution, referral velocity, and geographic reach">
      <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 24, fontFamily: "'Inter', system-ui, sans-serif" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(23,193,232,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Network style={{ width: 20, height: 20, color: "#17C1E8" }} />
          </div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#344767", margin: 0 }}>Network Analytics</h1>
            <p style={{ fontSize: 13, color: "#7B809A", margin: 0 }}>Pro waitlist intelligence — tiers, referrals, velocity, geography</p>
          </div>
        </div>

        {isLoading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[...Array(4)].map((_, i) => <div key={i} style={{ height: 100, background: "#F0F2F5", borderRadius: 14, animation: "pulse 1.5s infinite" }} />)}
          </div>
        ) : stats ? (
          <>
            {/* KPI row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
              <StatCard label="Total Waitlist" value={stats.total} sub="Pro signups all-time" icon={<Users size={16} />} color="#17C1E8" />
              <StatCard label="Total Referrals" value={stats.totalReferrals} sub="Referred member connections" icon={<Network size={16} />} color="#8B5CF6" />
              <StatCard label="Avg Referrals / Member" value={stats.avgReferrals} sub="Network density" icon={<TrendingUp size={16} />} color="#22C55E" />
              <StatCard label="Top Referrer" value={stats.topReferrers[0]?.name ?? "—"} sub={stats.topReferrers[0] ? `${stats.topReferrers[0].count} referrals` : "No referrals yet"} icon={<Star size={16} />} color="#F59E0B" />
            </div>

            {/* Tier fill progress */}
            <div style={{ background: "#FFFFFF", borderRadius: 14, padding: "20px 22px", border: "1px solid #E9ECEF" }}>
              <p style={{ fontWeight: 700, fontSize: 14, color: "#344767", marginBottom: 16 }}>Tier Fill Progress</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
                {TIER_CONFIG.map(t => (
                  <ProgressBar
                    key={t.key}
                    label={t.label}
                    fill={stats.tierCounts[t.key] ?? 0}
                    cap={t.cap}
                    color={t.color}
                    bg={t.bg}
                  />
                ))}
              </div>
            </div>

            {/* Waitlist velocity + Top referrers */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

              {/* Velocity chart — last 14 days */}
              <div style={{ background: "#FFFFFF", borderRadius: 14, padding: "20px 22px", border: "1px solid #E9ECEF" }}>
                <p style={{ fontWeight: 700, fontSize: 14, color: "#344767", marginBottom: 16 }}>Waitlist Velocity (Last 14 Days)</p>
                {stats.velocityDays.length === 0 ? (
                  <div style={{ height: 120, display: "flex", alignItems: "center", justifyContent: "center", color: "#AEAEAE", fontSize: 13 }}>No data yet</div>
                ) : (
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 120 }}>
                    {stats.velocityDays.map(([date, count]) => (
                      <div key={date} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                        <div
                          style={{
                            width: "100%",
                            background: "#17C1E8",
                            borderRadius: "4px 4px 0 0",
                            height: `${Math.round((count / stats.maxVelocity) * 100)}%`,
                            minHeight: 3,
                            transition: "height 0.6s ease",
                          }}
                        />
                        <span style={{ fontSize: 9, color: "#AEAEAE", writingMode: "vertical-rl", transform: "rotate(180deg)", whiteSpace: "nowrap" }}>
                          {date.slice(5)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Top referrers */}
              <div style={{ background: "#FFFFFF", borderRadius: 14, padding: "20px 22px", border: "1px solid #E9ECEF" }}>
                <p style={{ fontWeight: 700, fontSize: 14, color: "#344767", marginBottom: 16 }}>Top Referrers</p>
                {stats.topReferrers.length === 0 ? (
                  <div style={{ height: 120, display: "flex", alignItems: "center", justifyContent: "center", color: "#AEAEAE", fontSize: 13 }}>No referral data yet</div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {stats.topReferrers.map((r, i) => (
                      <div key={r.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#AEAEAE", minWidth: 18 }}>#{i + 1}</span>
                        <span style={{ fontSize: 13, color: "#344767", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#17C1E8", background: "rgba(23,193,232,0.1)", borderRadius: 6, padding: "2px 8px" }}>{r.count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Daily Signups (Last 14 Days) — recharts BarChart with tier coloring */}
            <div style={{ background: "#FFFFFF", borderRadius: 14, padding: "20px 22px", border: "1px solid #E9ECEF" }}>
              <p style={{ fontWeight: 700, fontSize: 14, color: "#344767", marginBottom: 4 }}>Daily Signups (Last 14 Days)</p>
              <p style={{ fontSize: 12, color: "#AEAEAE", marginBottom: 16 }}>Stacked by tier — Charter, Founding, L3, L4, and unclassified</p>
              {stats.dailySignups.every(d => d.charter + d.founding + d.l3 + d.l4 + d.other === 0) ? (
                <div style={{ height: 160, display: "flex", alignItems: "center", justifyContent: "center", color: "#AEAEAE", fontSize: 13 }}>No signups in last 14 days</div>
              ) : (
                <div style={{ height: 200 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.dailySignups} margin={{ top: 0, right: 4, bottom: 0, left: -20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F0F2F5" vertical={false} />
                      <XAxis dataKey="date" tick={{ fill: "#AEAEAE", fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "#AEAEAE", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
                      <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #E9ECEF", borderRadius: 8, fontSize: 12 }} />
                      <Legend iconType="square" iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                      <Bar dataKey="charter"  stackId="a" fill="#F59E0B" name="Charter"  radius={[0,0,0,0]} />
                      <Bar dataKey="founding" stackId="a" fill="#8B5CF6" name="Founding" radius={[0,0,0,0]} />
                      <Bar dataKey="level3"   stackId="a" fill="#17C1E8" name="Level 3"  radius={[0,0,0,0]} />
                      <Bar dataKey="level4"   stackId="a" fill="#22C55E" name="Level 4"  radius={[0,0,0,0]} />
                      <Bar dataKey="other"    stackId="a" fill="#CBD5E1" name="Other"    radius={[4,4,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Geographic distribution */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

              {/* Top cities */}
              <div style={{ background: "#FFFFFF", borderRadius: 14, padding: "20px 22px", border: "1px solid #E9ECEF" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <MapPin size={16} style={{ color: "#17C1E8" }} />
                  <p style={{ fontWeight: 700, fontSize: 14, color: "#344767", margin: 0 }}>Top Cities</p>
                </div>
                {stats.topCities.length === 0 ? (
                  <div style={{ color: "#AEAEAE", fontSize: 13, textAlign: "center", padding: "30px 0" }}>No geographic data yet</div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {stats.topCities.map(([city, count]) => (
                      <div key={city}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                          <span style={{ color: "#344767", fontWeight: 500 }}>{city}</span>
                          <span style={{ color: "#7B809A" }}>{count}</span>
                        </div>
                        <div style={{ height: 5, background: "#F0F2F5", borderRadius: 4, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${Math.round((count / stats.maxCity) * 100)}%`, background: "#17C1E8", borderRadius: 4 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Top states */}
              <div style={{ background: "#FFFFFF", borderRadius: 14, padding: "20px 22px", border: "1px solid #E9ECEF" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <BarChart3 size={16} style={{ color: "#8B5CF6" }} />
                  <p style={{ fontWeight: 700, fontSize: 14, color: "#344767", margin: 0 }}>Top States</p>
                </div>
                {stats.topStates.length === 0 ? (
                  <div style={{ color: "#AEAEAE", fontSize: 13, textAlign: "center", padding: "30px 0" }}>No geographic data yet</div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
                    {stats.topStates.map(([state, count]) => (
                      <div key={state} style={{ background: "rgba(139,92,246,0.08)", borderRadius: 10, padding: "10px 14px" }}>
                        <p style={{ fontWeight: 800, fontSize: 18, color: "#8B5CF6", margin: 0 }}>{count}</p>
                        <p style={{ fontSize: 12, color: "#7B809A", margin: 0 }}>{state}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#AEAEAE" }}>No waitlist data available.</div>
        )}
      </div>
    </AdminLayout>
  );
}
