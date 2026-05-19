import React from 'react';
import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

const TRADES = [
  "Roofing","HVAC","Plumbing","Electrical","Landscaping","Painting",
  "Flooring","Windows","Gutters","Concrete","Pest Control","Cleaning",
  "Foundation","Handyman","Pool Service","Smart Home","Solar","Other"
];

export default function PartnerSignup() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState<"form" | "success">("form");
  const [form, setForm] = useState({
    businessName: "", businessType: "Landscaping",
    contactName: "", contactEmail: "", contactPhone: "",
    password: "", confirmPassword: "", serviceArea: "DFW"
  });
  const [error, setError] = useState("");

  const registerMutation = trpc.partnerAuth.register.useMutation({
    onSuccess: () => setStep("success"),
    onError: (e) => setError(e.message),
  });

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match"); return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters"); return;
    }
    registerMutation.mutate({
      businessName: form.businessName,
      businessType: form.businessType,
      contactName: form.contactName,
      contactEmail: form.contactEmail,
      contactPhone: form.contactPhone || undefined,
      password: form.password,
      serviceArea: form.serviceArea,
    });
  };

  if (step === "success") return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#0f1117″,fontFamily:"Inter,sans-serif"}}>
      <div style={{textAlign:"center",color:"#fff",padding:"40px"}}>
        <div style={{fontSize:"64px",marginBottom:"16px"}}>✅</div>
        <h1 style={{fontSize:"32px",fontWeight:700,marginBottom:"12px"}}>You're in!</h1>
        <p style={{color:"#888″,marginBottom:"32px"}}>Your ProLnk partner account is ready. Start uploading job photos to generate your first leads.</p>
        <button onClick={() => navigate("/login")}
          style={{background:"#22c55e",color:"#fff",border:"none",padding:"14px 32px",borderRadius:"10px",fontWeight:600,fontSize:"16px",cursor:"pointer"}}>
          Sign In →
        </button>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:"#0f1117″,fontFamily:"Inter,sans-serif",padding:"40px 20px"}}>
      <div style={{maxWidth:"520px",margin:"0 auto"}}>
        <a href="/" style={{color:"#17C1E8″,textDecoration:"none",fontSize:"14px"}}>← Back to ProLnk</a>
        <h1 style={{color:"#fff",fontSize:"32px",fontWeight:700,margin:"24px 0 8px"}}>Create Your Partner Account</h1>
        <p style={{color:"#888″,marginBottom:"32px",fontSize:"15px"}}>Join the DFW network. Start earning passive commissions from your job photos.</p>
        
        <form onSubmit={submit} style={{display:"flex",flexDirection:"column",gap:"16px"}}>
          {[
            {key:"businessName",label:"Business Name",type:"text",placeholder:"Ace Plumbing LLC"},
            {key:"contactName",label:"Your Name",type:"text",placeholder:"John Smith"},
            {key:"contactEmail",label:"Email",type:"email",placeholder:"john@aceplumbing.com"},
            {key:"contactPhone",label:"Phone (optional)",type:"tel",placeholder:"(214) 555-0100″},
          ].map(f => (
            <div key={f.key}>
              <label style={{display:"block",color:"#aaa",fontSize:"13px",marginBottom:"6px"}}>{f.label}</label>
              <input type={f.type} value={(form as any)[f.key]} placeholder={f.placeholder}
                onChange={e => setForm(p => ({...p, [f.key]: e.target.value}))}
                required={f.key !== "contactPhone"}
                style={{width:"100%",padding:"11px 14px",background:"#1a1d27″,border:"1px solid #333",borderRadius:"8px",color:"#fff",fontSize:"14px",boxSizing:"border-box"}} />
            </div>
          ))}
          
          <div>
            <label style={{display:"block",color:"#aaa",fontSize:"13px",marginBottom:"6px"}}>Primary Trade</label>
            <select value={form.businessType} onChange={e => setForm(p => ({...p, businessType: e.target.value}))}
              style={{width:"100%",padding:"11px 14px",background:"#1a1d27″,border:"1px solid #333",borderRadius:"8px",color:"#fff",fontSize:"14px",boxSizing:"border-box"}}>
              {TRADES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label style={{display:"block",color:"#aaa",fontSize:"13px",marginBottom:"6px"}}>Password</label>
            <input type="password" value={form.password} placeholder="At least 8 characters"
              onChange={e => setForm(p => ({...p, password: e.target.value}))} required
              style={{width:"100%",padding:"11px 14px",background:"#1a1d27″,border:"1px solid #333",borderRadius:"8px",color:"#fff",fontSize:"14px",boxSizing:"border-box"}} />
          </div>

          <div>
            <label style={{display:"block",color:"#aaa",fontSize:"13px",marginBottom:"6px"}}>Confirm Password</label>
            <input type="password" value={form.confirmPassword} placeholder="Repeat password"
              onChange={e => setForm(p => ({...p, confirmPassword: e.target.value}))} required
              style={{width:"100%",padding:"11px 14px",background:"#1a1d27″,border:"1px solid #333",borderRadius:"8px",color:"#fff",fontSize:"14px",boxSizing:"border-box"}} />
          </div>

          {error && <div style={{color:"#f87171″,background:"rgba(239,68,68,0.1)",padding:"10px 14px",borderRadius:"8px",fontSize:"13px"}}>{error}</div>}

          <button type="submit" disabled={registerMutation.isPending}
            style={{background:"#17C1E8″,color:"#fff",border:"none",padding:"14px",borderRadius:"10px",fontWeight:600,fontSize:"15px",cursor:"pointer",opacity:registerMutation.isPending?0.7:1,marginTop:"8px"}}>
            {registerMutation.isPending ? "Creating account..." : "Create Partner Account →"}
          </button>

          <p style={{textAlign:"center",color:"#555″,fontSize:"13px"}}>
            Already have an account? <a href="/login" style={{color:"#17C1E8″}}>Sign in</a>
          </p>
        </form>

        <div style={{marginTop:"32px",padding:"16px",background:"rgba(23,193,232,0.06)",borderRadius:"10px",border:"1px solid rgba(23,193,232,0.15)"}}>
          <p style={{color:"#17C1E8″,fontSize:"13px",fontWeight:600,marginBottom:"4px"}}>🔒 Free during DFW Beta</p>
          <p style={{color:"#666″,fontSize:"12px",margin:0}}>No credit card required. Your first 30 days are on us. Start uploading job photos immediately.</p>
        </div>
      </div>
    </div>
  );
}
