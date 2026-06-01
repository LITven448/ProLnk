import { useState, useEffect } from "react";
import AdminLayout, { T } from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";

type Brand = "prolnk" | "trustypro" | "advertiser";

const BRANDS: { value: Brand; label: string }[] = [
  { value: "prolnk", label: "ProLnk (Pros)" },
  { value: "trustypro", label: "TrustyPro (Homeowners)" },
  { value: "advertiser", label: "Advertiser" },
];

export default function ChatbotKnowledge() {
  const [brand, setBrand] = useState<Brand>("prolnk");
  const [text, setText] = useState("");
  const [dirty, setDirty] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const utils = trpc.useUtils();
  const knowledgeQuery = trpc.supportChat.getKnowledge.useQuery({ brand });

  useEffect(() => {
    if (knowledgeQuery.data) {
      setText(knowledgeQuery.data.active ?? "");
      setDirty(false);
      setSavedMsg(null);
      setErrorMsg(null);
    }
  }, [knowledgeQuery.data, brand]);

  const updateMutation = trpc.supportChat.updateKnowledge.useMutation({
    onSuccess: async (res) => {
      if (res && (res as any).ok === false) {
        setErrorMsg((res as any).error ?? "Failed to save");
        setSavedMsg(null);
        return;
      }
      setErrorMsg(null);
      setSavedMsg((res as any)?.cleared ? "Reset to file default." : "Saved.");
      setDirty(false);
      await utils.supportChat.getKnowledge.invalidate({ brand });
    },
    onError: (err) => {
      setErrorMsg(err.message ?? "Failed to save");
      setSavedMsg(null);
    },
  });

  const handleSave = () => {
    setSavedMsg(null);
    setErrorMsg(null);
    updateMutation.mutate({ brand, knowledge: text });
  };

  const handleReset = () => {
    setSavedMsg(null);
    setErrorMsg(null);
    updateMutation.mutate({ brand, knowledge: "" });
  };

  const usingOverride = knowledgeQuery.data?.usingOverride ?? false;
  const saving = updateMutation.isPending;
  const loading = knowledgeQuery.isLoading;

  const label: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    color: T.muted,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  };

  return (
    <AdminLayout
      title="Chatbot Knowledge"
      subtitle="Edit what the AI chat assistant is allowed to tell clients"
    >
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "8px 4px 40px" }}>
        {/* Helper note */}
        <div
          style={{
            backgroundColor: T.accentBg,
            border: `1px solid ${T.border}`,
            borderRadius: 12,
            padding: "14px 18px",
            marginBottom: 24,
            color: T.text,
            fontSize: 13.5,
            lineHeight: 1.55,
          }}
        >
          This is what the AI chat assistant is allowed to tell clients. It will{" "}
          <strong>NEVER</strong> share financials, projections, or internal info
          regardless of what you put here — those are blocked by hard guardrails in
          code.
        </div>

        {/* Brand selector */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ ...label, marginBottom: 8 }}>Brand / Assistant</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {BRANDS.map((b) => {
              const active = b.value === brand;
              return (
                <button
                  key={b.value}
                  onClick={() => setBrand(b.value)}
                  disabled={saving}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: saving ? "default" : "pointer",
                    border: `1px solid ${active ? T.accent : T.border}`,
                    backgroundColor: active ? T.accent : T.surface,
                    color: active ? "#fff" : T.text,
                  }}
                >
                  {b.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Status row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <div style={label}>Client-Safe Knowledge</div>
          <div style={{ fontSize: 12, fontWeight: 600 }}>
            {loading ? (
              <span style={{ color: T.muted }}>Loading…</span>
            ) : usingOverride ? (
              <span style={{ color: T.blue }}>Using custom override</span>
            ) : (
              <span style={{ color: T.muted }}>Using file default</span>
            )}
          </div>
        </div>

        {/* Textarea */}
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setDirty(true);
            setSavedMsg(null);
          }}
          disabled={loading || saving}
          spellCheck
          rows={22}
          maxLength={20000}
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: 12,
            border: `1px solid ${T.border}`,
            backgroundColor: T.surface,
            color: T.text,
            fontSize: 13.5,
            lineHeight: 1.6,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            resize: "vertical",
            outline: "none",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 6,
            fontSize: 11.5,
            color: T.dim,
          }}
        >
          <span>{text.length.toLocaleString()} / 20,000 characters</span>
          {dirty && <span style={{ color: T.amber }}>Unsaved changes</span>}
        </div>

        {/* Messages */}
        {savedMsg && (
          <div style={{ marginTop: 14, color: T.green, fontSize: 13, fontWeight: 600 }}>
            {savedMsg}
          </div>
        )}
        {errorMsg && (
          <div style={{ marginTop: 14, color: T.red, fontSize: 13, fontWeight: 600 }}>
            {errorMsg}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          <button
            onClick={handleSave}
            disabled={saving || loading || !dirty}
            style={{
              padding: "10px 22px",
              borderRadius: 10,
              fontSize: 13.5,
              fontWeight: 700,
              border: "none",
              cursor: saving || loading || !dirty ? "default" : "pointer",
              backgroundColor: saving || loading || !dirty ? T.dim : T.accent,
              color: "#fff",
            }}
          >
            {saving ? "Saving…" : "Save"}
          </button>
          <button
            onClick={handleReset}
            disabled={saving || loading || !usingOverride}
            title="Clears your override and reverts to the built-in default"
            style={{
              padding: "10px 22px",
              borderRadius: 10,
              fontSize: 13.5,
              fontWeight: 600,
              cursor: saving || loading || !usingOverride ? "default" : "pointer",
              backgroundColor: T.surface,
              color: saving || loading || !usingOverride ? T.dim : T.text,
              border: `1px solid ${T.border}`,
            }}
          >
            Reset to default
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
