import React from 'react';
import { useState } from "react";
import { trpc } from "@/lib/trpc";

export default function PartnerForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const resetMutation = trpc.partnerAuth.requestPasswordReset.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: (e) => setError(e.message || "Something went wrong. Please try again."),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    resetMutation.mutate({ email });
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#0A1628″,
      fontFamily: "'Inter', system-ui, sans-serif",
      padding: "24px",
    }}>
      <div style={{
        background: "#111d35″,
        border: "1px solid #1e2f4a",
        borderRadius: "20px",
        padding: "48px 40px",
        width: "100%",
        maxWidth: "440px",
        boxSizing: "border-box",
      }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "8px",
          }}>
            <div style={{
              background: "#F5E642″,
              borderRadius: "8px",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: "16px",
              color: "#0A1628″,
            }}>P</div>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "20px", letterSpacing: "-0.3px" }}>ProLnk</span>
          </div>
          <h1 style={{ color: "#fff", fontSize: "26px", fontWeight: 700, margin: "0 0 6px", letterSpacing: "-0.5px" }}>
            Reset Password
          </h1>
          <p style={{ color: "#7a8ba8″, fontSize: "14px", margin: 0 }}>
            Enter your email and we'll send reset instructions
          </p>
        </div>

        {submitted ? (
          <div>
            <div style={{
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.3)",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center",
              marginBottom: "28px",
            }}>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>✉️</div>
              <p style={{ color: "#4ade80″, fontWeight: 600, fontSize: "15px", margin: "0 0 6px" }}>
                Check your email
              </p>
              <p style={{ color: "#7a8ba8″, fontSize: "13px", margin: 0, lineHeight: "1.5" }}>
                If an account exists for <strong style={{ color: "#a0b0c8″ }}>{email}</strong>, we've sent password reset instructions.
              </p>
            </div>
            <a
              href="/partner-login"
              style={{
                display: "block",
                textAlign: "center",
                color: "#F5E642″,
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              ← Back to Sign In
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#a0b0c8″, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@company.com"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  background: "#0d1a2e",
                  border: "1px solid #1e2f4a",
                  borderRadius: "10px",
                  color: "#fff",
                  fontSize: "15px",
                  boxSizing: "border-box",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#F5E642″)}
                onBlur={(e) => (e.target.style.borderColor = "#1e2f4a")}
              />
            </div>

            {error && (
              <div style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: "10px",
                padding: "12px 14px",
                color: "#f87171″,
                fontSize: "13px",
                lineHeight: "1.4″,
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={resetMutation.isPending}
              style={{
                background: resetMutation.isPending ? "#c9bc2a" : "#F5E642″,
                color: "#0A1628″,
                border: "none",
                padding: "14px",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "15px",
                cursor: resetMutation.isPending ? "not-allowed" : "pointer",
                marginTop: "4px",
                transition: "background 0.2s, transform 0.1s",
                letterSpacing: "-0.2px",
              }}
              onMouseDown={(e) => { if (!resetMutation.isPending) (e.currentTarget.style.transform = "scale(0.98)"); }}
              onMouseUp={(e) => { (e.currentTarget.style.transform = "scale(1)"); }}
            >
              {resetMutation.isPending ? "Sending…" : "Send Reset Instructions"}
            </button>

            <div style={{ textAlign: "center", marginTop: "8px" }}>
              <a href="/partner-login" style={{ color: "#7a8ba8″, fontSize: "13px", textDecoration: "none" }}>
                ← Back to Sign In
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
