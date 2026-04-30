/**
 * Field OS -- Home Tab (v3)
 * Design system: Teal #0D9488 (actions) | Lime #E8FF47 (money) | Navy #070D1A (bg)
 * Earnings ring, dark map with AI pins, quick actions, today's activity.
 */
import { useCallback, useRef, useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { MapView } from "@/components/Map";
import { FOS } from "./fosTokens";
import {
  Camera, Zap, MapPin, TrendingUp, CheckCircle2,
  Flame, ChevronRight, ArrowUpRight, Trophy, Sparkles,
  DollarSign, Navigation, Loader2
} from "lucide-react";

type Tab = "home" | "job" | "feed" | "profiles" | "earnings";
interface FieldHomeProps { onNavigate: (tab: Tab) => void; }

/* -- Earnings Ring ---------------------------------------------------------- */
function EarningsRing({ earned, goal = 500 }: { earned: number; goal?: number }) {
  const pct = Math.min(earned / goal, 1);
  const r = 44;
  const circ = 2 * Math.PI * r;
  const dash = circ * pct;
  return (
    <div className="relative w-28 h-28 flex-shrink-0">
      <svg width="112" height="112" viewBox="0 0 112 112" className="-rotate-90">
        <circle cx="56" cy="56" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
        <circle
          cx="56" cy="56" r={r} fill="none"
          stroke={FOS.lime} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          style={{ transition: "stroke-dasharray 1s ease", filter: `drop-shadow(0 0 6px ${FOS.limeGlow})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[9px] uppercase tracking-wider" style={{ color: FOS.faint }}>Month</span>
        <span className="text-xl font-black text-white leading-tight">${Math.round(earned)}</span>
        <span className="text-[9px]" style={{ color: FOS.faint }}>of ${goal}</span>
      </div>
    </div>
  );
}

/* -- Mini Stat -------------------------------------------------------------- */
function MiniStat({ icon: Icon, value, label, color, bg }: { icon: any; value: string | number; label: string; color: string; bg: string }) {
  return (
    <div className="flex-1 rounded-2xl px-3 py-3 flex flex-col gap-1.5" style={{ background: bg, border: `1px solid ${color}20` }}>
      <Icon className="w-4 h-4" style={{ color }} />
      <span className="text-white text-lg font-black leading-none">{value}</span>
      <span className="text-[10px] leading-tight" style={{ color: FOS.muted }}>{label}</span>
    </div>
  );
}

/* -- Dark map styles -------------------------------------------------------- */
const DARK_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: "geometry",           stylers: [{ color: "#0D1525" }] },
  { elementType: "labels.text.fill",   stylers: [{ color: "#4B5563" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#070D1A" }] },
  { featureType: "road",               elementType: "geometry", stylers: [{ color: "#1A2840" }] },
  { featureType: "road.arterial",      elementType: "geometry", stylers: [{ color: "#1E3A5F" }] },
  { featureType: "water",              elementType: "geometry", stylers: [{ color: "#040A14" }] },
  { featureType: "poi",                stylers: [{ visibility: "off" }] },
  { featureType: "transit",            stylers: [{ visibility: "off" }] },
];

export default function FieldHome({ onNavigate }: FieldHomeProps) {
  const { user } = useAuth();
  const { data: myProfile } = trpc.partners.getMyProfile.useQuery();
  const { data: myJobs }    = trpc.partners.getMyJobs.useQuery();
  const { data: earned }    = trpc.partners.getEarnedCommissions.useQuery();
  const { data: paid }      = trpc.partners.getPaidCommissions.useQuery();
  const { data: opps }      = trpc.partners.getInboundOpportunities.useQuery();

  const mapRef = useRef<google.maps.Map | null>(null);
  const [checkInState, setCheckInState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [checkInAddress, setCheckInAddress] = useState<string | null>(null);

  const handleGpsCheckIn = () => {
    if (!navigator.geolocation) { setCheckInState("error"); return; }
    setCheckInState("loading");
    const timeout = setTimeout(() => setCheckInState("error"), 8000);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        clearTimeout(timeout);
        const { latitude: lat, longitude: lng } = pos.coords;
        try {
          const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=`);
          const data = await res.json();
          const addr = data.results?.[0]?.formatted_address ?? `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
          setCheckInAddress(addr);
        } catch {
          setCheckInAddress(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
        }
        setCheckInState("done");
        setTimeout(() => setCheckInState("idle"), 8000);
      },
      () => { clearTimeout(timeout); setCheckInState("error"); setTimeout(() => setCheckInState("idle"), 4000); },
      { timeout: 7000, enableHighAccuracy: true }
    );
  };

  const now        = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const jobsToday   = (myJobs ?? []).filter((j: any) => new Date(j.loggedAt) >= todayStart).length;
  const photosToday = (myJobs ?? []).filter((j: any) => new Date(j.loggedAt) >= todayStart)
    .reduce((s: number, j: any) => s + (j.photoCount ?? 1), 0);

  const monthEarned = [...(earned ?? []), ...(paid ?? [])]
    .filter((c: any) => new Date(c.createdAt ?? 0) >= monthStart)
    .reduce((s: number, c: any) => s + Number(c.amount ?? 0), 0);

  const pendingOpps = (opps ?? []).filter((o: any) => o.status === "pending" || o.status === "active");

  // Streak
  const jobDates = new Set((myJobs ?? []).map((j: any) => new Date(j.loggedAt).toDateString()));
  let streak = 0;
  for (let i = 0; i < 30; i++) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    if (jobDates.has(d.toDateString())) streak++;
    else break;
  }

  const profile     = myProfile as any;
  const partnerName = profile?.businessName?.split(" ")[0] ?? user?.name?.split(" ")[0] ?? "Partner";
  const tier        = profile?.tier ?? "scout";
  const greeting    = now.getHours() < 12 ? "Good morning" : now.getHours() < 17 ? "Good afternoon" : "Good evening";

  const handleMapReady = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    const lat = Number(profile?.serviceAreaLat) || 32.7767;
    const lng = Number(profile?.serviceAreaLng) || -96.797;
    map.setCenter({ lat, lng });
    map.setZoom(12);
    map.setOptions({ disableDefaultUI: true, gestureHandling: "cooperative", styles: DARK_MAP_STYLES });

    // Coverage ring
    new google.maps.Circle({
      map, center: { lat, lng },
      radius: (Number(profile?.serviceRadiusMiles) || 15) * 1609.34,
      fillColor: FOS.teal, fillOpacity: 0.05,
      strokeColor: FOS.teal, strokeOpacity: 0.4, strokeWeight: 1.5,
    });

    // Partner pin
    new google.maps.Marker({
      position: { lat, lng }, map, title: "Your Location",
      icon: {
        path: google.maps.SymbolPath.CIRCLE, scale: 10,
        fillColor: FOS.teal, fillOpacity: 1,
        strokeColor: FOS.bg, strokeWeight: 3,
      },
    });

    // AI opportunity pins
    pendingOpps.slice(0, 8).forEach((opp: any, i: number) => {
      const angle = (i / 8) * 2 * Math.PI;
      const dist  = 0.018 + Math.random() * 0.038;
      const oLat  = lat + Math.cos(angle) * dist;
      const oLng  = lng + Math.sin(angle) * dist;
      const marker = new google.maps.Marker({
        position: { lat: oLat, lng: oLng }, map,
        title: opp.opportunityType ?? "AI Opportunity",
        icon: {
          path: google.maps.SymbolPath.CIRCLE, scale: 8,
          fillColor: FOS.lime, fillOpacity: 0.9,
          strokeColor: FOS.bg, strokeWeight: 2,
        },
      });
      const iw = new google.maps.InfoWindow({
        content: `<div style="padding:8px;min-width:140px;font-family:Inter,sans-serif">
          <p style="font-weight:700;margin:0 0 3px;font-size:13px">${opp.opportunityType ?? "Opportunity"}</p>
          <p style="font-size:11px;color:#666;margin:0">${opp.opportunityCategory ?? ""}</p>
          <p style="font-size:12px;color:${FOS.teal};font-weight:700;margin:4px 0 0">
            $${Number(opp.referralCommissionAmount ?? 0).toFixed(0)} commission
          </p></div>`,
      });
      marker.addListener("click", () => iw.open(map, marker));
    });
  }, [profile, pendingOpps]);

  return (
    <div className="flex flex-col pb-4 min-h-full" style={{ background: FOS.bg }}>

      {/* -- Header -- */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs tracking-wide" style={{ color: FOS.muted }}>{greeting}</p>
            <h1 className="text-white text-2xl font-black leading-tight mt-0.5">{partnerName}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{ background: FOS.tealDim, color: FOS.teal }}
              >
                {tier}
              </span>
            </div>
          </div>
          {streak >= 3 && (
            <div
              className="flex items-center gap-1.5 rounded-xl px-3 py-2"
              style={{ background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.20)" }}
            >
              <Flame className="w-4 h-4" style={{ color: "#F59E0B" }} />
              <div>
                <p className="text-xs font-black leading-none" style={{ color: "#F59E0B" }}>{streak}</p>
                <p className="text-[9px] leading-none mt-0.5" style={{ color: "rgba(245,158,11,0.5)" }}>day streak</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* -- Earnings + Stats -- */}
      <div className="px-5 mb-5">
        <div
          className="rounded-3xl p-4 flex items-center gap-4"
          style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}
        >
          <EarningsRing earned={monthEarned} goal={500} />
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex gap-2">
              <MiniStat icon={Camera}       value={photosToday}        label="Photos today" color={FOS.teal} bg={FOS.tealDim} />
              <MiniStat icon={CheckCircle2} value={jobsToday}          label="Jobs logged"  color={FOS.green} bg="rgba(16,185,129,0.10)" />
            </div>
            <div className="flex gap-2">
              <MiniStat icon={Zap}          value={pendingOpps.length} label="AI leads"     color={FOS.lime} bg={FOS.limeDim} />
              <MiniStat icon={TrendingUp}   value={tier}               label="Tier"         color="#A78BFA" bg="rgba(167,139,250,0.10)" />
            </div>
          </div>
        </div>
      </div>

      {/* -- Opportunity Map -- */}
      <div className="px-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4" style={{ color: FOS.teal }} />
            <span className="text-white text-sm font-bold">Opportunity Map</span>
          </div>
          <div className="flex items-center gap-3 text-[10px]">
            <span className="flex items-center gap-1" style={{ color: FOS.faint }}>
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: FOS.teal }} />You
            </span>
            <span className="flex items-center gap-1" style={{ color: FOS.faint }}>
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: FOS.lime }} />Lead
            </span>
          </div>
        </div>
        <div
          className="rounded-2xl overflow-hidden"
          style={{ height: 200, border: `1px solid ${FOS.border}` }}
        >
          <MapView
            onMapReady={handleMapReady}
            className="w-full h-full"
            initialCenter={{ lat: Number((myProfile as any)?.serviceAreaLat) || 32.7767, lng: Number((myProfile as any)?.serviceAreaLng) || -96.797 }}
            initialZoom={12}
          />
        </div>
        {pendingOpps.length > 0 && (
          <button
            onClick={() => onNavigate("feed")}
            className="mt-2.5 w-full flex items-center justify-between rounded-xl px-4 py-2.5 active:scale-95 transition-transform"
            style={{ background: FOS.tealDim, border: `1px solid ${FOS.teal}30` }}
          >
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" style={{ color: FOS.teal }} />
              <span className="text-sm font-semibold" style={{ color: FOS.teal }}>{pendingOpps.length} AI leads in your area</span>
            </div>
            <ArrowUpRight className="w-4 h-4" style={{ color: FOS.teal }} />
          </button>
        )}
      </div>

      {/* -- Quick Actions -- */}
      <div className="px-5 mb-5">
        <p className="text-[10px] uppercase tracking-widest font-semibold mb-3" style={{ color: FOS.muted }}>Quick Actions</p>
        <div className="grid grid-cols-2 gap-3">
          {/* Log Job -- primary CTA */}
          <button
            onClick={() => onNavigate("job")}
            className="rounded-2xl p-4 flex flex-col gap-2 active:scale-95 transition-transform"
            style={{
              background: `linear-gradient(135deg, ${FOS.teal} 0%, #0F766E 100%)`,
              boxShadow: `0 8px 24px ${FOS.tealGlow}`,
            }}
          >
            <Camera className="w-6 h-6 text-white" />
            <div>
              <p className="text-white font-black text-sm leading-tight">Log a Job</p>
              <p className="text-white/60 text-[10px] mt-0.5">GPS + Photos + AI</p>
            </div>
          </button>

          {/* AI Leads */}
          <button
            onClick={() => onNavigate("feed")}
            className="rounded-2xl p-4 flex flex-col gap-2 active:scale-95 transition-transform relative"
            style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}
          >
            {pendingOpps.length > 0 && (
              <span
                className="absolute top-3 right-3 w-5 h-5 text-[10px] font-black rounded-full flex items-center justify-center"
                style={{ background: FOS.lime, color: FOS.bg }}
              >
                {pendingOpps.length > 9 ? "9+" : pendingOpps.length}
              </span>
            )}
            <Sparkles className="w-6 h-6" style={{ color: FOS.lime }} />
            <div>
              <p className="text-white font-black text-sm leading-tight">AI Leads</p>
              <p className="text-[10px] mt-0.5" style={{ color: FOS.muted }}>{pendingOpps.length} waiting</p>
            </div>
          </button>

          {/* Profiles */}
          <button
            onClick={() => onNavigate("profiles")}
            className="rounded-2xl p-4 flex flex-col gap-2 active:scale-95 transition-transform"
            style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}
          >
            <MapPin className="w-6 h-6" style={{ color: "#A78BFA" }} />
            <div>
              <p className="text-white font-black text-sm leading-tight">Homes</p>
              <p className="text-[10px] mt-0.5" style={{ color: FOS.muted }}>Homes you've visited</p>
            </div>
          </button>

          {/* Earnings */}
          <button
            onClick={() => onNavigate("earnings")}
            className="rounded-2xl p-4 flex flex-col gap-2 active:scale-95 transition-transform"
            style={{ background: FOS.limeDim, border: `1px solid ${FOS.lime}25` }}
          >
            <DollarSign className="w-6 h-6" style={{ color: FOS.lime }} />
            <div>
              <p className="text-white font-black text-sm leading-tight">Earnings</p>
              <p className="text-[10px] mt-0.5" style={{ color: FOS.lime }}>${monthEarned.toFixed(0)} this month</p>
            </div>
          </button>
        </div>
        {/* GPS Check-In strip */}
        <button
          onClick={handleGpsCheckIn}
          disabled={checkInState === "loading"}
          className="mt-3 w-full rounded-2xl px-4 py-3 flex items-center gap-3 active:scale-[0.98] transition-transform disabled:opacity-60"
          style={{
            background: checkInState === "done"    ? "rgba(16,185,129,0.12)" :
                        checkInState === "error"   ? "rgba(239,68,68,0.10)" :
                        FOS.surface,
            border: `1px solid ${
              checkInState === "done"  ? "rgba(16,185,129,0.35)" :
              checkInState === "error" ? "rgba(239,68,68,0.30)" :
              FOS.border
            }`,
          }}
        >
          {checkInState === "loading" ? (
            <Loader2 className="w-5 h-5 animate-spin" style={{ color: FOS.teal }} />
          ) : checkInState === "done" ? (
            <CheckCircle2 className="w-5 h-5" style={{ color: FOS.green }} />
          ) : checkInState === "error" ? (
            <MapPin className="w-5 h-5" style={{ color: "#EF4444" }} />
          ) : (
            <MapPin className="w-5 h-5" style={{ color: FOS.teal }} />
          )}
          <div className="flex-1 text-left">
            <p className="text-sm font-bold" style={{
              color: checkInState === "done" ? FOS.green : checkInState === "error" ? "#EF4444" : "white"
            }}>
              {checkInState === "loading" ? "Locating..." :
               checkInState === "done"    ? "Checked In" :
               checkInState === "error"   ? "GPS Unavailable" :
               "GPS Check-In"}
            </p>
            <p className="text-[10px]" style={{ color: FOS.faint }}>
              {checkInState === "done" && checkInAddress
                ? checkInAddress.split(",").slice(0, 2).join(",")
                : checkInState === "error"
                ? "Enable location access and try again"
                : "Verify you're on-site before logging"}
            </p>
          </div>
          {checkInState === "idle" && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: FOS.tealDim, color: FOS.teal }}>Tap</span>
          )}
        </button>
      </div>

      {/* -- Today's Activity -- */}
      <div className="px-5 mb-5">
        <p className="text-[10px] uppercase tracking-widest font-semibold mb-3" style={{ color: FOS.muted }}>Today</p>
        <div className="rounded-2xl overflow-hidden" style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}>
          {[
            { icon: CheckCircle2, color: FOS.green, label: "Jobs Logged",      value: jobsToday },
            { icon: Camera,       color: FOS.teal,  label: "Photos Submitted", value: photosToday },
            { icon: Zap,          color: FOS.lime,  label: "AI Opportunities", value: pendingOpps.length },
          ].map(({ icon: Icon, color, label, value }, idx) => (
            <div
              key={label}
              className="flex items-center justify-between px-4 py-3"
              style={{ borderTop: idx > 0 ? `1px solid ${FOS.border}` : "none" }}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4" style={{ color }} />
                <span className="text-sm" style={{ color: FOS.muted }}>{label}</span>
              </div>
              <span className="text-white font-bold text-sm">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* -- Top Referral Opportunities -- */}
      {pendingOpps.length > 0 && (
        <div className="px-5 mb-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: FOS.muted }}>Top Opportunities</p>
            <button onClick={() => onNavigate("feed")} className="text-[10px] font-bold" style={{ color: FOS.teal }}>See All →</button>
          </div>
          <div className="space-y-2">
            {pendingOpps.slice(0, 3).map((opp: any, i: number) => (
              <div
                key={opp.id ?? i}
                className="rounded-2xl px-4 py-3 flex items-center gap-3"
                style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: FOS.limeDim }}>
                  <Sparkles className="w-4 h-4" style={{ color: FOS.lime }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-bold truncate">{opp.opportunityType ?? "AI Opportunity"}</p>
                  <p className="text-[10px] truncate" style={{ color: FOS.muted }}>{opp.opportunityCategory ?? ""}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-black" style={{ color: FOS.lime }}>
                    ${Number(opp.referralCommissionAmount ?? 0).toFixed(0)}
                  </p>
                  <p className="text-[9px]" style={{ color: FOS.faint }}>commission</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* -- Leaderboard Teaser -- */}
      <div className="px-5">
        <button
          className="w-full rounded-2xl px-4 py-3.5 flex items-center justify-between active:scale-95 transition-transform"
          style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: FOS.limeDim }}>
              <Trophy className="w-4 h-4" style={{ color: FOS.lime }} />
            </div>
            <div className="text-left">
              <p className="text-white text-sm font-bold">DFW Leaderboard</p>
              <p className="text-xs" style={{ color: FOS.muted }}>Log more jobs to climb the ranks</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4" style={{ color: FOS.faint }} />
        </button>
      </div>
    </div>
  );
}
