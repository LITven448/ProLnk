import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import AdminLayout from "@/components/AdminLayout";
import {
  UserCheck, Mail, CheckSquare, Square, Search,
  CheckCircle, Clock, AlertCircle, Zap,
} from "lucide-react";

interface PendingPartner {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  trade: string;
  serviceArea: string;
  paymentStatus: "checkout_complete" | "pending" | "failed";
  activationStatus: "inactive" | "active" | "pending_review";
  tier?: string;
  joinedAt: string;
}

const PAYMENT_BADGE: Record<PendingPartner["paymentStatus"], { label: string; color: string; bg: string; icon: typeof CheckCircle }> = {
  checkout_complete: { label: "Paid",    color: "#059669", bg: "#D1FAE5", icon: CheckCircle },
  pending:          { label: "Pending",  color: "#D97706", bg: "#FEF3C7", icon: Clock },
  failed:           { label: "Failed",   color: "#DC2626", bg: "#FEE2E2", icon: AlertCircle },
};

const ACTIVATION_BADGE: Record<PendingPartner["activationStatus"], { label: string; color: string; bg: string }> = {
  active:         { label: "Active",         color: "#059669", bg: "#D1FAE5" },
  inactive:       { label: "Inactive",       color: "#6B7280", bg: "#F3F4F6" },
  pending_review: { label: "Pending Review", color: "#D97706", bg: "#FEF3C7" },
};

function usePartnerList() {
  const { data: raw = [] } = trpc.waitlistAdmin.getProWaitlist.useQuery(
    { status: "checkout_complete", limit: 500 },
    { enabled: true }
  );

  return useMemo<PendingPartner[]>(() => {
    const list = raw as any[];
    return list.map((p) => ({
      id: p.id,
      firstName: p.firstName ?? "",
      lastName: p.lastName ?? "",
      email: p.email ?? "",
      trade: p.businessType ?? p.trades ?? "—",
      serviceArea: p.serviceAreaZip ?? p.serviceArea ?? "—",
      paymentStatus: (p.paymentStatus as PendingPartner["paymentStatus"]) ?? "checkout_complete",
      activationStatus: (p.activationStatus as PendingPartner["activationStatus"]) ?? "inactive",
      tier: p.tier,
      joinedAt: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "—",
    }));
  }, [raw]);
}

export default function PartnerActivation() {
  const { user } = useAuth();
  const partners = usePartnerList();

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [activating, setActivating] = useState<Set<number>>(new Set());
  const [emailing, setEmailing] = useState<Set<number>>(new Set());
  const [toast, setToast] = useState<string | null>(null);
  const [localStatus, setLocalStatus] = useState<Record<number, PendingPartner["activationStatus"]>>({});

  const activateMutation = trpc.admin.activatePartner
    ? trpc.admin.activatePartner.useMutation({
        onSuccess: (_: any, variables: any) => {
          setLocalStatus((prev) => ({ ...prev, [variables.partnerId]: "active" }));
          showToast(`Partner activated`);
        },
        onError: () => showToast("Activation failed — please try again"),
      })
    : null;

  const sendEmailMutation = trpc.admin.sendWelcomeEmail
    ? trpc.admin.sendWelcomeEmail.useMutation({
        onSuccess: () => showToast("Welcome email sent"),
        onError: () => showToast("Email send failed — please try again"),
      })
    : null;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return partners.filter((p) =>
      !q ||
      p.firstName.toLowerCase().includes(q) ||
      p.lastName.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      p.trade.toLowerCase().includes(q) ||
      p.serviceArea.toLowerCase().includes(q)
    );
  }, [partners, search]);

  const paidPartners = filtered.filter((p) => p.paymentStatus === "checkout_complete");
  const allSelected = paidPartners.length > 0 && paidPartners.every((p) => selected.has(p.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelected((prev) => {
        const next = new Set(prev);
        paidPartners.forEach((p) => next.delete(p.id));
        return next;
      });
    } else {
      setSelected((prev) => new Set([...prev, ...paidPartners.map((p) => p.id)]));
    }
  };

  const toggleOne = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleActivate = async (partnerId: number) => {
    setActivating((prev) => new Set([...prev, partnerId]));
    try {
      if (activateMutation) {
        await activateMutation.mutateAsync({ partnerId });
      } else {
        await new Promise((r) => setTimeout(r, 800));
        setLocalStatus((prev) => ({ ...prev, [partnerId]: "active" }));
        showToast("Partner activated (mock)");
      }
    } finally {
      setActivating((prev) => {
        const next = new Set(prev);
        next.delete(partnerId);
        return next;
      });
    }
  };

  const handleSendEmail = async (email: string, partnerId: number) => {
    setEmailing((prev) => new Set([...prev, partnerId]));
    try {
      if (sendEmailMutation) {
        await sendEmailMutation.mutateAsync({ email });
      } else {
        await new Promise((r) => setTimeout(r, 600));
        showToast(`Welcome email sent to ${email} (mock)`);
      }
    } finally {
      setEmailing((prev) => {
        const next = new Set(prev);
        next.delete(partnerId);
        return next;
      });
    }
  };

  const handleBulkActivate = async () => {
    const ids = Array.from(selected);
    for (const id of ids) {
      await handleActivate(id);
    }
    setSelected(new Set());
    showToast(`${ids.length} partner${ids.length === 1 ? "" : "s"} activated`);
  };

  const activationStatus = (p: PendingPartner) =>
    (localStatus[p.id] as PendingPartner["activationStatus"]) ?? p.activationStatus;

  if (!user || user.role !== "admin") {
    return (
      <AdminLayout title="Partner Activation">
        <div className="flex items-center justify-center h-64">
          <p className="text-red-600">Access denied. Admin access required.</p>
        </div>
      </AdminLayout>
    );
  }

  const activeCount   = filtered.filter((p) => activationStatus(p) === "active").length;
  const inactiveCount = filtered.filter((p) => activationStatus(p) === "inactive").length;
  const paidCount     = filtered.filter((p) => p.paymentStatus === "checkout_complete").length;

  return (
    <AdminLayout title="Partner Activation">
      <div style={{ padding: "32px 24px", maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0F172A", marginBottom: 6 }}>
            Partner Activation
          </h1>
          <p style={{ fontSize: 14, color: "#64748B" }}>
            Review and activate partners who have completed checkout. Activating sends their account live.
          </p>
        </div>

        {/* Summary Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
          {[
            { label: "Paid / Ready",    value: paidCount,    color: "#059669", bg: "#D1FAE5" },
            { label: "Activated",       value: activeCount,  color: "#2563EB", bg: "#DBEAFE" },
            { label: "Awaiting Action", value: inactiveCount, color: "#D97706", bg: "#FEF3C7" },
          ].map((c) => (
            <div key={c.label} style={{ background: "#FFFFFF", borderRadius: 12, padding: "20px 24px", boxShadow: "0 1px 6px rgba(0,0,0,0.07)", borderTop: `3px solid ${c.color}` }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: c.color, fontFamily: "ui-monospace, monospace" }}>{c.value}</div>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.07em", color: "#94A3B8", marginTop: 4 }}>
                {c.label}
              </div>
            </div>
          ))}
        </div>

        {/* Search + Bulk */}
        <div style={{ background: "#FFFFFF", borderRadius: 12, padding: "16px 20px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", marginBottom: 16, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" as const }}>
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
            <Search style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#94A3B8" }} />
            <input
              type="text"
              placeholder="Search name, email, trade, area…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%", paddingLeft: 34, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
                border: "1px solid #E2E8F0", borderRadius: 8, fontSize: 13, outline: "none",
                boxSizing: "border-box" as const,
              }}
            />
          </div>
          {selected.size > 0 && (
            <>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#2563EB" }}>{selected.size} selected</span>
              <button
                onClick={handleBulkActivate}
                style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "8px 16px",
                  background: "#059669", color: "#FFFFFF", border: "none", borderRadius: 8,
                  fontSize: 13, fontWeight: 600, cursor: "pointer",
                }}
              >
                <Zap style={{ width: 14, height: 14 }} />
                Bulk Activate ({selected.size})
              </button>
              <button
                onClick={() => setSelected(new Set())}
                style={{ fontSize: 13, color: "#64748B", background: "none", border: "none", cursor: "pointer" }}
              >
                Clear
              </button>
            </>
          )}
        </div>

        {/* Table */}
        <div style={{ background: "#FFFFFF", borderRadius: 12, boxShadow: "0 1px 6px rgba(0,0,0,0.06)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" as const }}>
            <thead>
              <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                <th style={{ padding: "10px 16px", textAlign: "left" as const }}>
                  <button onClick={toggleAll} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
                    {allSelected
                      ? <CheckSquare style={{ width: 16, height: 16, color: "#2563EB" }} />
                      : <Square style={{ width: 16, height: 16, color: "#94A3B8" }} />}
                  </button>
                </th>
                {["Name", "Email", "Trade", "Service Area", "Payment", "Activation", "Joined", "Actions"].map((h) => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left" as const, fontSize: 12, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.06em", color: "#64748B" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ padding: "48px", textAlign: "center" as const, color: "#94A3B8", fontSize: 14 }}>
                    No partners found. Paid signups with <code>checkout_complete</code> status will appear here.
                  </td>
                </tr>
              ) : (
                filtered.map((partner) => {
                  const payBadge = PAYMENT_BADGE[partner.paymentStatus];
                  const actBadge = ACTIVATION_BADGE[activationStatus(partner)];
                  const PayIcon = payBadge.icon;
                  const isPaid = partner.paymentStatus === "checkout_complete";
                  const isActive = activationStatus(partner) === "active";
                  const isActivating = activating.has(partner.id);
                  const isEmailing = emailing.has(partner.id);
                  const isChecked = selected.has(partner.id);

                  return (
                    <tr
                      key={partner.id}
                      style={{
                        borderBottom: "1px solid #F1F5F9",
                        background: isChecked ? "#EFF6FF" : undefined,
                        transition: "background 0.1s",
                      }}
                    >
                      <td style={{ padding: "12px 16px" }}>
                        {isPaid && (
                          <button onClick={() => toggleOne(partner.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
                            {isChecked
                              ? <CheckSquare style={{ width: 16, height: 16, color: "#2563EB" }} />
                              : <Square style={{ width: 16, height: 16, color: "#94A3B8" }} />}
                          </button>
                        )}
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "#0F172A" }}>
                        {partner.firstName} {partner.lastName}
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: "#475569" }}>
                        {partner.email}
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: "#475569" }}>
                        {partner.trade}
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: "#475569" }}>
                        {partner.serviceArea}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{
                          display: "inline-flex", alignItems: "center", gap: 4,
                          fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 20,
                          color: payBadge.color, background: payBadge.bg,
                        }}>
                          <PayIcon style={{ width: 11, height: 11 }} />
                          {payBadge.label}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{
                          fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 20,
                          color: actBadge.color, background: actBadge.bg,
                        }}>
                          {actBadge.label}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: "#94A3B8" }}>
                        {partner.joinedAt}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          {isPaid && !isActive && (
                            <button
                              disabled={isActivating}
                              onClick={() => handleActivate(partner.id)}
                              style={{
                                display: "flex", alignItems: "center", gap: 5,
                                padding: "6px 12px", borderRadius: 7,
                                background: isActivating ? "#E2E8F0" : "#059669",
                                color: isActivating ? "#94A3B8" : "#FFFFFF",
                                border: "none", fontSize: 12, fontWeight: 600,
                                cursor: isActivating ? "not-allowed" : "pointer",
                                transition: "background 0.15s",
                              }}
                            >
                              <UserCheck style={{ width: 13, height: 13 }} />
                              {isActivating ? "Activating…" : "Activate Partner"}
                            </button>
                          )}
                          {isActive && (
                            <span style={{ fontSize: 12, color: "#059669", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                              <CheckCircle style={{ width: 13, height: 13 }} /> Active
                            </span>
                          )}
                          <button
                            disabled={isEmailing}
                            onClick={() => handleSendEmail(partner.email, partner.id)}
                            style={{
                              display: "flex", alignItems: "center", gap: 5,
                              padding: "6px 12px", borderRadius: 7,
                              background: "transparent", border: "1px solid #CBD5E1",
                              fontSize: 12, fontWeight: 600, color: "#475569",
                              cursor: isEmailing ? "not-allowed" : "pointer",
                              opacity: isEmailing ? 0.6 : 1,
                              transition: "background 0.15s",
                            }}
                          >
                            <Mail style={{ width: 13, height: 13 }} />
                            {isEmailing ? "Sending…" : "Send Welcome"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 9999,
          background: "#0F172A", color: "#FFFFFF", fontSize: 13, fontWeight: 500,
          padding: "12px 20px", borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <CheckCircle style={{ width: 15, height: 15, color: "#34D399" }} />
          {toast}
        </div>
      )}
    </AdminLayout>
  );
}
