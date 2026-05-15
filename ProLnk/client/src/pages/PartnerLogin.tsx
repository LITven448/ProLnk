import React from 'react';
import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

export default function PartnerLogin() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginMutation = trpc.partnerAuth.login.useMutation({
    onSuccess: () => navigate("/dashboard"),
    onError: (e) => setError(e.message || "Invalid email or password."),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    loginMutation.mutate({ email, password });
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#0A1628",
      fontFamily: "'Inter', system-ui, sans-serif",
      padding: "24px",
    }}>
      <div style={{
        background: "#111d35",
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
              background: "#F5E642",
              borderRadius: "8px",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: "16px",
              color: "#0A1628",
            }}>P</div>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "20px", letterSpacing: "-0.3px" }}>ProLnk</span>
          </div>
          <h1 style={{ color: "#fff", fontSize: "26px", fontWeight: 700, margin: "0 0 6px", letterSpacing: "-0.5px" }}>
            Partner Sign In
          </h1>
          <p style={{ color: "#7a8ba8", fontSize: "14px", margin: 0 }}>
            Access your partner dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#a0b0c8", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
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
              onFocus={(e) => (e.target.style.borderColor = "#F5E642")}
              onBlur={(e) => (e.target.style.borderColor = "#1e2f4a")}
            />
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#a0b0c8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Password
              </label>
              <a
                href="/partner-forgot-password"
                style={{ fontSize: "12px", color: "#F5E642", textDecoration: "none", fontWeight: 500 }}
              >
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
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
              onFocus={(e) => (e.target.style.borderColor = "#F5E642")}
              onBlur={(e) => (e.target.style.borderColor = "#1e2f4a")}
            />
          </div>

          {error && (
            <div style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: "10px",
              padding: "12px 14px",
              color: "#f87171",
              fontSize: "13px",
              lineHeight: "1.4",
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loginMutation.isPending}
            style={{
              background: loginMutation.isPending ? "#c9bc2a" : "#F5E642",
              color: "#0A1628",
              border: "none",
              padding: "14px",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "15px",
              cursor: loginMutation.isPending ? "not-allowed" : "pointer",
              marginTop: "4px",
              transition: "background 0.2s, transform 0.1s",
              letterSpacing: "-0.2px",
            }}
            onMouseDown={(e) => { if (!loginMutation.isPending) (e.currentTarget.style.transform = "scale(0.98)"); }}
            onMouseUp={(e) => { (e.currentTarget.style.transform = "scale(1)"); }}
          >
            {loginMutation.isPending ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <div style={{
          marginTop: "28px",
          paddingTop: "24px",
          borderTop: "1px solid #1e2f4a",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          textAlign: "center",
        }}>
          <p style={{ margin: 0, color: "#7a8ba8", fontSize: "13px" }}>
            Not a partner yet?{" "}
            <a href="/apply" style={{ color: "#F5E642", textDecoration: "none", fontWeight: 600 }}>
              Apply to Join
            </a>
          </p>
          <a href="/" style={{ color: "#4a5a72", fontSize: "12px", textDecoration: "none" }}>
            ← Back to homepage
          </a>
        </div>
      </div>
    </div>
  );
}
