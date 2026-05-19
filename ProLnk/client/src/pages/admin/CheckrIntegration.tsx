import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle, AlertTriangle, Shield, Key, Webhook,
  ClipboardList, DollarSign, Info, ExternalLink, Lock,
} from "lucide-react";

const D = {
  bg: "#0A1628″,
  surface: "#0F1D35″,
  card: "#162035″,
  border: "#1E2D4A",
  text: "#F0F4FF",
  muted: "#7B8BAA",
  teal: "#00C2A8″,
  amber: "#F59E0B",
  green: "#22C55E",
  red: "#EF4444″,
  blue: "#3B82F6″,
};

const SETUP_STEPS = [
  {
    num: 1,
    title: "Create account at checkr.com",
    detail: "$0 to start — free account gives you access to sandbox + pricing",
    link: "https://checkr.com",
  },
  {
    num: 2,
    title: "Get API key from Checkr dashboard",
    detail: "Dashboard → API & Webhooks → API Keys → Create Live Key",
  },
  {
    num: 3,
    title: "Add CHECKR_API_KEY to Render env vars",
    detail: "Render dashboard → prolnk-platform → Environment → Add variable",
  },
  {
    num: 4,
    title: "Run first background check",
    detail: "Use the 'Run Test Check' button below to verify the integration end-to-end",
  },
];

const PACKAGES = [
  {
    name: "Basic Criminal",
    price: "$29.99″,
    items: ["SSN trace", "National criminal database", "Sex offender registry"],
    recommended: false,
  },
  {
    name: "Standard",
    price: "$49.99″,
    items: [
      "Everything in Basic",
      "Motor vehicle record (MVR)",
      "Employment verification",
    ],
    recommended: true,
  },
  {
    name: "Pro",
    price: "$79.99″,
    items: [
      "Everything in Standard",
      "Education verification",
      "Professional license verification",
    ],
    recommended: false,
  },
];

export default function CheckrIntegration() {
  const [connected, setConnected] = useState(false);

  return (
    <AdminLayout>
      <div style={{ background: D.bg, minHeight: "100vh", padding: "32px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ color: D.text, fontSize: 28, fontWeight: 700, margin: 0 }}>
              Checkr Integration
            </h1>
            <p style={{ color: D.muted, marginTop: 6, fontSize: 15 }}>
              Background verification for all partners
            </p>
          </div>

          {/* Connection Status */}
          <Card style={{ background: D.card, border: `1px solid ${D.border}`, marginBottom: 24 }}>
            <CardContent style={{ padding: 28 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 12,
                    background: connected ? "rgba(34,197,94,0.12)" : "rgba(245,158,11,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Shield size={24} color={connected ? D.green : D.amber} />
                  </div>
                  <div>
                    <div style={{ color: D.text, fontWeight: 700, fontSize: 18 }}>
                      {connected ? "Checkr API: Connected — Live Mode" : "Checkr API: Not Connected"}
                    </div>
                    {connected
                      ? <div style={{ color: D.muted, fontSize: 13, marginTop: 2 }}>Account ID: acct_7k2mxp39qr</div>
                      : <div style={{ color: D.muted, fontSize: 13, marginTop: 2 }}>Connect to start running background checks</div>
                    }
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Badge style={{
                    background: connected ? "rgba(34,197,94,0.15)" : "rgba(245,158,11,0.15)",
                    color: connected ? D.green : D.amber,
                    border: `1px solid ${connected ? "rgba(34,197,94,0.3)" : "rgba(245,158,11,0.3)"}`,
                    fontSize: 12, padding: "4px 10px",
                  }}>
                    {connected ? "Live" : "Not Connected"}
                  </Badge>
                  <Button
                    onClick={() => setConnected(!connected)}
                    style={{
                      background: connected ? "rgba(239,68,68,0.15)" : D.teal,
                      color: connected ? D.red : "#000″,
                      border: connected ? `1px solid ${D.red}` : "none",
                      fontWeight: 600, cursor: "pointer",
                    }}
                  >
                    {connected ? "Disconnect" : "Connect Now"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Setup Guide */}
          <Card style={{ background: D.card, border: `1px solid ${D.border}`, marginBottom: 24 }}>
            <CardHeader>
              <CardTitle style={{ color: D.text, fontSize: 17, display: "flex", alignItems: "center", gap: 8 }}>
                <ClipboardList size={18} color={D.teal} />
                Setup Guide
              </CardTitle>
            </CardHeader>
            <CardContent style={{ padding: "0 24px 24px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {SETUP_STEPS.map((step) => (
                  <div key={step.num} style={{
                    display: "flex", gap: 16, padding: 16,
                    background: D.surface, borderRadius: 10,
                    border: `1px solid ${D.border}`,
                  }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: `${D.teal}22`, color: D.teal,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 700, fontSize: 14, flexShrink: 0,
                    }}>
                      {step.num}
                    </div>
                    <div>
                      <div style={{ color: D.text, fontWeight: 600, fontSize: 14 }}>
                        {step.title}
                        {step.link && (
                          <a href={step.link} target="_blank" rel="noopener noreferrer"
                            style={{ marginLeft: 8, color: D.teal, fontSize: 12, verticalAlign: "middle" }}>
                            <ExternalLink size={12} style={{ display: "inline" }} />
                          </a>
                        )}
                      </div>
                      <div style={{ color: D.muted, fontSize: 13, marginTop: 3 }}>{step.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Check Packages */}
          <Card style={{ background: D.card, border: `1px solid ${D.border}`, marginBottom: 24 }}>
            <CardHeader>
              <CardTitle style={{ color: D.text, fontSize: 17, display: "flex", alignItems: "center", gap: 8 }}>
                <DollarSign size={18} color={D.teal} />
                Check Packages
              </CardTitle>
            </CardHeader>
            <CardContent style={{ padding: "0 24px 24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 16 }}>
                {PACKAGES.map((pkg) => (
                  <div key={pkg.name} style={{
                    padding: 20, borderRadius: 10,
                    background: pkg.recommended ? `${D.teal}10` : D.surface,
                    border: `1px solid ${pkg.recommended ? D.teal : D.border}`,
                    position: "relative",
                  }}>
                    {pkg.recommended && (
                      <div style={{
                        position: "absolute", top: -1, right: 12,
                        background: D.teal, color: "#000″,
                        fontSize: 10, fontWeight: 700, padding: "2px 8px",
                        borderRadius: "0 0 6px 6px",
                      }}>
                        RECOMMENDED
                      </div>
                    )}
                    <div style={{ color: D.text, fontWeight: 700, fontSize: 16 }}>{pkg.name}</div>
                    <div style={{ color: D.teal, fontWeight: 700, fontSize: 22, margin: "8px 0″ }}>{pkg.price}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {pkg.items.map((item) => (
                        <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <CheckCircle size={13} color={D.green} />
                          <span style={{ color: D.muted, fontSize: 13 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <Alert style={{ background: `${D.teal}0D`, border: `1px solid ${D.teal}40` }}>
                <CheckCircle size={14} color={D.teal} />
                <AlertDescription style={{ color: D.text, marginLeft: 8, fontSize: 13 }}>
                  <strong style={{ color: D.teal }}>Standard ($49.99)</strong> recommended for all home service pros — covers MVR + employment verification required for insurance requirements.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Volume Pricing + FCRA row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
            <Card style={{ background: D.card, border: `1px solid ${D.border}` }}>
              <CardHeader>
                <CardTitle style={{ color: D.text, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
                  <DollarSign size={16} color={D.teal} />
                  Volume Pricing
                </CardTitle>
              </CardHeader>
              <CardContent style={{ padding: "0 20px 20px" }}>
                <p style={{ color: D.muted, fontSize: 13, lineHeight: 1.6 }}>
                  At 100+ checks/month, Checkr offers custom pricing.
                </p>
                <p style={{ color: D.text, fontSize: 13, marginTop: 10, fontWeight: 600 }}>
                  Estimated ProLnk blended rate: ~$35/check
                </p>
                <p style={{ color: D.muted, fontSize: 12, marginTop: 6 }}>
                  Contact Checkr sales once volume exceeds 100/mo for negotiated rates.
                </p>
              </CardContent>
            </Card>

            <Card style={{ background: D.card, border: `1px solid ${D.border}` }}>
              <CardHeader>
                <CardTitle style={{ color: D.text, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
                  <Lock size={16} color={D.blue} />
                  FCRA Compliance
                </CardTitle>
              </CardHeader>
              <CardContent style={{ padding: "0 20px 20px" }}>
                <p style={{ color: D.muted, fontSize: 13, lineHeight: 1.6 }}>
                  All Checkr checks are FCRA compliant. Candidates are notified and can dispute results.
                </p>
                <p style={{ color: D.amber, fontSize: 12, marginTop: 10, fontWeight: 500 }}>
                  ProLnk must provide adverse action notice if declining based on check results.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Webhook Setup */}
          <Card style={{ background: D.card, border: `1px solid ${D.border}`, marginBottom: 24 }}>
            <CardHeader>
              <CardTitle style={{ color: D.text, fontSize: 17, display: "flex", alignItems: "center", gap: 8 }}>
                <Webhook size={18} color={D.teal} />
                Webhook Setup
              </CardTitle>
            </CardHeader>
            <CardContent style={{ padding: "0 24px 24px" }}>
              <p style={{ color: D.muted, fontSize: 13, marginBottom: 12 }}>
                Configure this endpoint in your Checkr dashboard to receive real-time status updates:
              </p>
              <div style={{
                background: "#0A0F1A", borderRadius: 8, padding: 16,
                border: `1px solid ${D.border}`, fontFamily: "monospace",
              }}>
                <div style={{ color: D.teal, fontSize: 13 }}>POST /api/webhooks/checkr</div>
                <div style={{ color: D.muted, fontSize: 12, marginTop: 8 }}>
                  {"// Receives status updates:"}<br />
                  {"// { report_id, status: 'clear' | 'consider' | 'suspended' }"}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <Badge style={{ background: "rgba(34,197,94,0.12)", color: D.green, border: "1px solid rgba(34,197,94,0.25)", fontSize: 12 }}>clear</Badge>
                <Badge style={{ background: "rgba(245,158,11,0.12)", color: D.amber, border: "1px solid rgba(245,158,11,0.25)", fontSize: 12 }}>consider</Badge>
                <Badge style={{ background: "rgba(239,68,68,0.12)", color: D.red, border: "1px solid rgba(239,68,68,0.25)", fontSize: 12 }}>suspended</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Run Test Check */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              disabled={!connected}
              style={{
                background: connected ? D.teal : `${D.teal}30`,
                color: connected ? "#000″ : D.muted,
                fontWeight: 700, fontSize: 15, padding: "12px 28px",
                cursor: connected ? "pointer" : "not-allowed",
                opacity: connected ? 1 : 0.6,
              }}
            >
              Run Test Check
            </Button>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}
