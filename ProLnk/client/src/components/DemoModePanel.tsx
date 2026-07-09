import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { isPreviewActive } from "@/App";

const JOURNEYS: Array<{ label: string; path: string }> = [
  { label: "Request Service", path: "/request-service" },
  { label: "Partner Offers", path: "/partner/offers" },
  { label: "Scout", path: "/scout" },
  { label: "Exchange", path: "/dashboard/exchange" },
  { label: "Admin Matching", path: "/admin/matching" },
];

export default function DemoModePanel() {
  const [, navigate] = useLocation();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<string>("");

  if (!isPreviewActive()) return null;

  const seed = trpc.demo.seedAll.useMutation({
    onSuccess: (d: any) => {
      setStatus(d?.message || "Seeded.");
      if (d?.homeownerTrackingPath) {
        (window as any).__demoTrackingPath = d.homeownerTrackingPath;
      }
    },
    onError: (e: any) => setStatus(`Error: ${e.message}`),
  });
  const reset = trpc.demo.reset.useMutation({
    onSuccess: (d: any) => setStatus(d?.message || "Reset."),
    onError: (e: any) => setStatus(`Error: ${e.message}`),
  });

  const busy = seed.isPending || reset.isPending;
  const trackingPath = (window as any).__demoTrackingPath as string | undefined;

  const go = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  const turnOff = () => {
    window.location.href = "/?preview=off";
  };

  return (
    <div style={{ position: "fixed", right: 16, bottom: 16, zIndex: 99999, fontFamily: "system-ui, sans-serif" }}>
      {open && (
        <div
          style={{
            width: 280,
            background: "#0f1117",
            border: "1px solid #2a2f3a",
            borderRadius: 14,
            padding: 16,
            marginBottom: 10,
            boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
            color: "#e5e7eb",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Demo Mode</div>
          <div style={{ fontSize: 11, color: "#8b93a5", marginBottom: 12 }}>
            Preview cockpit — public still sees the waitlist.
          </div>

          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <button
              onClick={() => seed.mutate()}
              disabled={busy}
              style={{
                flex: 1, background: "#22c55e", color: "#0a0f08", border: "none",
                padding: "9px 0", borderRadius: 8, fontWeight: 600, fontSize: 12.5,
                cursor: busy ? "default" : "pointer", opacity: busy ? 0.6 : 1,
              }}
            >
              {seed.isPending ? "Seeding…" : "Seed demo data"}
            </button>
            <button
              onClick={() => reset.mutate()}
              disabled={busy}
              style={{
                flex: 1, background: "#1c2030", color: "#cbd5e1", border: "1px solid #2a2f3a",
                padding: "9px 0", borderRadius: 8, fontWeight: 600, fontSize: 12.5,
                cursor: busy ? "default" : "pointer", opacity: busy ? 0.6 : 1,
              }}
            >
              {reset.isPending ? "Resetting…" : "Reset"}
            </button>
          </div>

          {status && (
            <div style={{ fontSize: 11, color: "#9ca3af", background: "#161922", padding: "8px 10px", borderRadius: 8, marginBottom: 12, lineHeight: 1.4 }}>
              {status}
            </div>
          )}

          <div style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: 0.5, color: "#6b7280", marginBottom: 6 }}>
            Jump to journey
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {JOURNEYS.map((j) => (
              <button
                key={j.path}
                onClick={() => go(j.path)}
                style={{
                  textAlign: "left", background: "#161922", color: "#d1d5db",
                  border: "1px solid #232838", padding: "8px 10px", borderRadius: 8,
                  fontSize: 12.5, cursor: "pointer",
                }}
              >
                {j.label}
              </button>
            ))}
            {trackingPath && (
              <button
                onClick={() => go(trackingPath)}
                style={{
                  textAlign: "left", background: "#10261b", color: "#86efac",
                  border: "1px solid #1c4732", padding: "8px 10px", borderRadius: 8,
                  fontSize: 12.5, cursor: "pointer",
                }}
              >
                My Request (homeowner tracking)
              </button>
            )}
          </div>

          <button
            onClick={turnOff}
            style={{
              width: "100%", marginTop: 12, background: "transparent", color: "#6b7280",
              border: "none", fontSize: 11, cursor: "pointer", textDecoration: "underline",
            }}
          >
            Exit preview mode
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          background: "#7c3aed", color: "#fff", border: "none", borderRadius: 999,
          padding: "10px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer",
          boxShadow: "0 8px 24px rgba(124,58,237,0.45)", display: "flex", alignItems: "center", gap: 8,
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "#22c55e", display: "inline-block" }} />
        Demo Mode
      </button>
    </div>
  );
}
