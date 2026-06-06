import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import PartnerLayout from "@/components/PartnerLayout";
import {
  ShieldCheck, ShieldAlert, Users, CheckCircle2, Lock,
  Printer, FileText, Search, Building2, AlertTriangle, Loader2,
} from "lucide-react";

const T = {
  surface: "#FFFFFF",
  bg: "#F8FAFC",
  text: "#0F172A",
  muted: "#4B5563",
  dim: "#6B7280",
  accent: "#0D9488",
  accentBg: "#F0FDFA",
  navy: "#0A1628",
  green: "#16A34A",
  greenBg: "#F0FDF4",
  amber: "#D97706",
  red: "#DC2626",
  redBg: "#FEF2F2",
  border: "#E5E7EB",
};

const SITE_TYPE_LABELS: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial",
  property_mgmt: "Property Management",
  school_k12: "School (K-12)",
  government: "Government",
  childcare: "Childcare",
  healthcare: "Healthcare",
};

function siteLabel(s?: string | null) {
  if (!s) return "—";
  return SITE_TYPE_LABELS[s] ?? s.replace(/_/g, " ");
}

function fmtDate(value?: string | null) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

const container: React.CSSProperties = { maxWidth: 1040, margin: "0 auto", padding: "4px 2px 48px", color: T.text };

export default function PartnerDispatch() {
  const [, navigate] = useLocation();
  const [jobIdInput, setJobIdInput] = useState("");
  const [activeJobId, setActiveJobId] = useState<number | null>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [assignMsg, setAssignMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const requirement = trpc.dispatch.jobClearanceRequirement.useQuery(
    { jobId: activeJobId ?? 0 },
    { enabled: activeJobId != null, retry: false },
  );
  const workers = trpc.dispatch.eligibleWorkers.useQuery(
    { jobId: activeJobId ?? 0 },
    { enabled: activeJobId != null, retry: false },
  );
  const proof = trpc.dispatch.clearanceProof.useQuery(
    { jobId: activeJobId ?? 0 },
    { enabled: activeJobId != null, retry: false },
  );

  const utils = trpc.useUtils();
  const assign = trpc.dispatch.assignWorkers.useMutation({
    onSuccess: (res) => {
      setAssignMsg({ kind: "ok", text: res.message });
      setSelected(new Set());
      if (activeJobId != null) {
        utils.dispatch.eligibleWorkers.invalidate({ jobId: activeJobId });
        utils.dispatch.clearanceProof.invalidate({ jobId: activeJobId });
      }
    },
    onError: (err) => {
      setAssignMsg({ kind: "err", text: err.message });
    },
  });

  // Redirect to sign-in on auth failure (mirrors FoundingNetworkDashboard).
  useEffect(() => {
    const err = (requirement.error || workers.error || proof.error) as any;
    const code = err?.data?.code;
    const status = err?.data?.httpStatus;
    if (code === "UNAUTHORIZED" || status === 401) {
      navigate("/partner-login?next=/partner/dispatch");
    }
  }, [requirement.error, workers.error, proof.error, navigate]);

  function loadJob() {
    const n = Number(jobIdInput.trim());
    setAssignMsg(null);
    setSelected(new Set());
    if (!Number.isInteger(n) || n <= 0) {
      setActiveJobId(null);
      return;
    }
    setActiveJobId(n);
  }

  function toggle(personId: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(personId)) next.delete(personId);
      else next.add(personId);
      return next;
    });
  }

  function doAssign() {
    if (activeJobId == null || selected.size === 0) return;
    setAssignMsg(null);
    assign.mutate({ jobId: activeJobId, personIds: Array.from(selected) });
  }

  function exportProof() {
    const p = proof.data;
    if (!p) return;
    const lines: string[] = [];
    lines.push("CLEARANCE PROOF");
    lines.push("=".repeat(48));
    lines.push(`Company:       ${p.company ?? "—"}`);
    lines.push(`Job ID:        ${p.jobId}`);
    lines.push(`Site type:     ${siteLabel(p.siteType)}`);
    lines.push(`Required tier: ${p.requiredTierLabel} (Tier ${p.requiredTier})`);
    lines.push(`Generated:     ${fmtDate(p.generatedAt)}`);
    lines.push("");
    lines.push(p.statement);
    lines.push("");
    lines.push(`Cleared workers (${p.clearedCount}):`);
    lines.push("-".repeat(48));
    for (const w of p.clearedRoster) {
      lines.push(
        `• ${w.name || "Unnamed"} — ${w.tierLabel}` +
          (w.role ? ` · ${w.role}` : "") +
          (w.passCode ? ` · Pass ${w.passCode}` : "") +
          ` · cleared ${fmtDate(w.clearedAt)}`,
      );
    }
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `clearance-proof-job-${p.jobId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const req = requirement.data;
  const w = workers.data;
  const p = proof.data;

  const eligible = useMemo(() => (w?.eligible ?? []) as any[], [w]);
  const ineligible = useMemo(() => (w?.ineligible ?? []) as any[], [w]);

  return (
    <PartnerLayout>
      <div style={container}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 4px", letterSpacing: -0.3 }}>Dispatch</h1>
          <p style={{ color: T.dim, fontSize: 14, margin: 0 }}>
            Staff a job to clearance-cleared workers. Only roster members whose current tier meets the
            job's site requirement can be assigned — and every assignment is logged as exportable proof.
          </p>
        </div>

        {/* Job picker */}
        <Section title="Select a job" icon={<Building2 size={16} color={T.accent} />}>
          <p style={{ color: T.muted, fontSize: 14, margin: "0 0 12px" }}>
            Enter the job (opportunity) ID you've been awarded to view its clearance requirement and staff it.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input
              value={jobIdInput}
              onChange={(e) => setJobIdInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") loadJob(); }}
              placeholder="Job ID, e.g. 1024"
              inputMode="numeric"
              style={{ flex: 1, minWidth: 200, border: `1px solid ${T.border}`, borderRadius: 10, padding: "11px 14px", fontSize: 14, color: T.text, background: T.bg }}
            />
            <button
              onClick={loadJob}
              style={{ display: "inline-flex", alignItems: "center", gap: 7, background: T.accent, color: "#fff", border: "none", borderRadius: 10, padding: "11px 18px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}
            >
              <Search size={16} /> Load job
            </button>
          </div>
        </Section>

        {activeJobId == null ? (
          <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, padding: "40px 32px", textAlign: "center", color: T.dim }}>
            Enter a job ID above to begin.
          </div>
        ) : (
          <>
            {/* Requirement banner */}
            <Section title="Clearance requirement" icon={<ShieldCheck size={16} color={T.accent} />}>
              {requirement.isLoading ? (
                <Loading label="Reading job requirement…" />
              ) : requirement.error ? (
                <ErrorNote text={(requirement.error as any).message || "Couldn't load this job."} />
              ) : req ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                  <Pill label="Site type" value={siteLabel(req.siteType)} />
                  <Pill label="Required tier" value={`${req.requiredTierLabel} (Tier ${req.requiredTier})`} accent />
                  <Pill label="Job ID" value={String(req.jobId)} />
                </div>
              ) : (
                <p style={{ color: T.dim, fontSize: 14, margin: 0 }}>No requirement data.</p>
              )}
            </Section>

            {/* Worker selection */}
            <Section title="Roster" icon={<Users size={16} color={T.accent} />}>
              {workers.isLoading ? (
                <Loading label="Computing live tiers for your roster…" />
              ) : workers.error ? (
                <ErrorNote text={(workers.error as any).message || "Couldn't load your roster."} />
              ) : (
                <>
                  {/* Eligible */}
                  <div style={{ marginBottom: 18 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
                      <CheckCircle2 size={15} color={T.green} />
                      <span style={{ fontSize: 13, fontWeight: 700, color: T.text }}>
                        Eligible ({eligible.length})
                      </span>
                    </div>
                    {eligible.length === 0 ? (
                      <p style={{ color: T.dim, fontSize: 14, margin: 0 }}>
                        No roster members currently meet {w?.requiredTierLabel ?? "the required tier"} for this site.
                      </p>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {eligible.map((e: any) => {
                          const checked = selected.has(e.personId);
                          return (
                            <label
                              key={e.personId}
                              style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 12px", borderRadius: 10, cursor: "pointer", background: checked ? T.greenBg : "transparent", border: `1px solid ${checked ? "#BBF7D0" : T.border}` }}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggle(e.personId)}
                                style={{ width: 16, height: 16, accentColor: T.green, cursor: "pointer" }}
                              />
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 15, fontWeight: 600 }}>{e.name || "Unnamed worker"}</div>
                                <div style={{ fontSize: 13, color: T.dim }}>
                                  {(e.role || "Worker")}{e.email ? ` · ${e.email}` : ""}
                                </div>
                              </div>
                              <span style={{ fontSize: 12, fontWeight: 700, color: T.green, background: T.greenBg, border: "1px solid #BBF7D0", borderRadius: 999, padding: "3px 10px" }}>
                                {e.tierLabel}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Ineligible */}
                  {ineligible.length > 0 && (
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
                        <ShieldAlert size={15} color={T.amber} />
                        <span style={{ fontSize: 13, fontWeight: 700, color: T.text }}>
                          Not eligible ({ineligible.length})
                        </span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {ineligible.map((e: any) => (
                          <div
                            key={e.personId}
                            style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 12px", borderRadius: 10, border: `1px solid ${T.border}`, opacity: 0.7 }}
                          >
                            <Lock size={16} color={T.dim} style={{ flexShrink: 0 }} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 15, fontWeight: 600, color: T.muted }}>{e.name || "Unnamed worker"}</div>
                              <div style={{ fontSize: 13, color: T.amber }}>{e.reason}</div>
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 700, color: T.dim, background: T.bg, border: `1px solid ${T.border}`, borderRadius: 999, padding: "3px 10px" }}>
                              {e.tierLabel}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Assign action */}
                  {assignMsg && (
                    <div
                      style={{
                        marginTop: 16, padding: "11px 14px", borderRadius: 10, fontSize: 14,
                        background: assignMsg.kind === "ok" ? T.greenBg : T.redBg,
                        color: assignMsg.kind === "ok" ? T.green : T.red,
                        border: `1px solid ${assignMsg.kind === "ok" ? "#BBF7D0" : "#FECACA"}`,
                        display: "flex", alignItems: "flex-start", gap: 8,
                      }}
                    >
                      {assignMsg.kind === "ok" ? <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: 1 }} /> : <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 1 }} />}
                      <span>{assignMsg.text}</span>
                    </div>
                  )}

                  <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <button
                      onClick={doAssign}
                      disabled={selected.size === 0 || assign.isPending}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 8, border: "none", borderRadius: 10,
                        padding: "11px 20px", fontWeight: 700, fontSize: 14,
                        cursor: selected.size === 0 || assign.isPending ? "not-allowed" : "pointer",
                        background: selected.size === 0 || assign.isPending ? "#CBD5E1" : T.navy, color: "#fff",
                      }}
                    >
                      {assign.isPending ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
                      {assign.isPending ? "Assigning…" : `Assign ${selected.size || ""} worker${selected.size === 1 ? "" : "s"}`.trim()}
                    </button>
                    <span style={{ fontSize: 13, color: T.dim }}>
                      Only workers meeting {w?.requiredTierLabel ?? "the required tier"} can be assigned.
                    </span>
                  </div>
                </>
              )}
            </Section>

            {/* Clearance proof */}
            <Section title="Clearance proof" icon={<FileText size={16} color={T.accent} />}>
              {proof.isLoading ? (
                <Loading label="Loading clearance log…" />
              ) : proof.error ? (
                <ErrorNote text={(proof.error as any).message || "Couldn't load the clearance proof."} />
              ) : p ? (
                <div id="clearance-proof-printable">
                  <div style={{ background: T.accentBg, border: "1px solid #99F6E4", borderRadius: 12, padding: "16px 18px", marginBottom: 16 }}>
                    <p style={{ fontSize: 15, fontWeight: 600, color: T.text, margin: "0 0 6px", lineHeight: 1.5 }}>
                      {p.statement}
                    </p>
                    <p style={{ fontSize: 13, color: T.dim, margin: 0 }}>
                      {p.company ? `${p.company} · ` : ""}{siteLabel(p.siteType)} · {p.requiredTierLabel} · as of {fmtDate(p.generatedAt)}
                    </p>
                  </div>

                  {p.clearedCount === 0 ? (
                    <p style={{ color: T.dim, fontSize: 14, margin: 0 }}>
                      No cleared workers logged for this job yet. Assign workers above to generate the proof.
                    </p>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      {p.clearedRoster.map((c: any, i: number) => (
                        <div
                          key={`${c.personId}-${i}`}
                          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: i < p.clearedRoster.length - 1 ? `1px solid ${T.border}` : "none" }}
                        >
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 600 }}>{c.name || "Unnamed"}</div>
                            <div style={{ fontSize: 12, color: T.dim }}>
                              {(c.role || "Worker")}{c.passCode ? ` · Pass ${c.passCode}` : ""} · cleared {fmtDate(c.clearedAt)}
                            </div>
                          </div>
                          <span style={{ fontSize: 12, fontWeight: 700, color: T.green, background: T.greenBg, border: "1px solid #BBF7D0", borderRadius: 999, padding: "3px 10px" }}>
                            {c.tierLabel}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {p.clearedCount > 0 && (
                    <div className="no-print" style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <button
                        onClick={() => window.print()}
                        style={{ display: "inline-flex", alignItems: "center", gap: 7, background: T.accent, color: "#fff", border: "none", borderRadius: 10, padding: "10px 16px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}
                      >
                        <Printer size={16} /> Print
                      </button>
                      <button
                        onClick={exportProof}
                        style={{ display: "inline-flex", alignItems: "center", gap: 7, background: T.surface, color: T.text, border: `1px solid ${T.border}`, borderRadius: 10, padding: "10px 16px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}
                      >
                        <FileText size={16} /> Export (.txt)
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <p style={{ color: T.dim, fontSize: 14, margin: 0 }}>No clearance proof available.</p>
              )}
            </Section>
          </>
        )}
      </div>
    </PartnerLayout>
  );
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, padding: "20px 22px", marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        {icon}
        <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Pill({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div style={{ background: accent ? T.accentBg : T.bg, border: `1px solid ${accent ? "#99F6E4" : T.border}`, borderRadius: 12, padding: "12px 16px", minWidth: 140 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: T.dim, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 800, color: accent ? T.accent : T.text }}>{value}</div>
    </div>
  );
}

function Loading({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9, color: T.dim, fontSize: 14, padding: "8px 0" }}>
      <Loader2 size={16} className="animate-spin" /> {label}
    </div>
  );
}

function ErrorNote({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 8, color: T.red, fontSize: 14, background: T.redBg, border: "1px solid #FECACA", borderRadius: 10, padding: "11px 14px" }}>
      <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 1 }} /> <span>{text}</span>
    </div>
  );
}
