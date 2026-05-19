import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  Search, MapPin, Star, Shield, Clock, DollarSign,
  Zap, Droplets, Wind, Home, Bug, Leaf, Wrench,
  CheckCircle, MessageSquare, ChevronRight, Sparkles,
} from "lucide-react";

// ─── Design tokens ────────────────────────────────────────────────────────────

const D = {
  bg: "#0D0F14", surface: "#13161E", card: "#1A1E2A", border: "#252A3A",
  text: "#F0F2FF", muted: "#8B91A8", dim: "#555B72",
  cyan: "#00D4FF", green: "#00E676", amber: "#FFB300",
  teal: "#14B8A6", purple: "#A855F7", blue: "#3B82F6",
};

// ─── Static data ──────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "hvac",        label: "HVAC",          icon: Wind,        color: D.cyan   },
  { id: "plumbing",    label: "Plumbing",       icon: Droplets,    color: D.blue   },
  { id: "roofing",     label: "Roofing",        icon: Home,        color: D.amber  },
  { id: "electrical",  label: "Electrical",     icon: Zap,         color: D.amber  },
  { id: "foundation",  label: "Foundation",     icon: Shield,      color: D.purple },
  { id: "pest",        label: "Pest Control",   icon: Bug,         color: D.green  },
  { id: "landscaping", label: "Landscaping",    icon: Leaf,        color: "#84CC16" },
  { id: "handyman",    label: "Handyman",       icon: Wrench,      color: D.teal   },
];

const PROS = [
  {
    id: 1, name: "Marcus Rivera",       initials: "MR", color: D.cyan,
    trade: "HVAC", rating: 4.9, reviews: 214, match: 97,
    price: "$$", responseTime: "< 1 hr", distance: "2.4 mi",
    verified: true, backgroundChecked: true, licensed: true,
  },
  {
    id: 2, name: "Tasha Williams",      initials: "TW", color: D.green,
    trade: "HVAC", rating: 4.8, reviews: 187, match: 94,
    price: "$$", responseTime: "< 2 hrs", distance: "3.1 mi",
    verified: true, backgroundChecked: true, licensed: true,
  },
  {
    id: 3, name: "Arctic Air HVAC",     initials: "AA", color: D.blue,
    trade: "HVAC", rating: 4.8, reviews: 302, match: 92,
    price: "$$$", responseTime: "Same day", distance: "4.8 mi",
    verified: true, backgroundChecked: true, licensed: true,
  },
  {
    id: 4, name: "Jordan Kimura",       initials: "JK", color: D.amber,
    trade: "HVAC", rating: 4.7, reviews: 145, match: 89,
    price: "$", responseTime: "< 4 hrs", distance: "5.2 mi",
    verified: true, backgroundChecked: false, licensed: true,
  },
  {
    id: 5, name: "Cool Breeze Systems", initials: "CB", color: D.teal,
    trade: "HVAC", rating: 4.7, reviews: 98,  match: 87,
    price: "$$", responseTime: "Next day", distance: "6.0 mi",
    verified: false, backgroundChecked: true, licensed: true,
  },
  {
    id: 6, name: "Devon Price",         initials: "DP", color: D.purple,
    trade: "HVAC", rating: 4.6, reviews: 122, match: 85,
    price: "$", responseTime: "< 3 hrs", distance: "7.3 mi",
    verified: true, backgroundChecked: true, licensed: false,
  },
  {
    id: 7, name: "Alicia Moreno",       initials: "AM", color: "#EC4899",
    trade: "HVAC", rating: 4.6, reviews: 76,  match: 83,
    price: "$$", responseTime: "< 2 hrs", distance: "8.1 mi",
    verified: true, backgroundChecked: false, licensed: true,
  },
  {
    id: 8, name: "ProTemp Solutions",   initials: "PT", color: "#F97316",
    trade: "HVAC", rating: 4.5, reviews: 63,  match: 81,
    price: "$$$", responseTime: "< 1 hr", distance: "9.4 mi",
    verified: false, backgroundChecked: true, licensed: true,
  },
];

const WHY_TRUSTYPRO = [
  { icon: Shield,       color: D.green,  label: "Background Checked",  desc: "Every pro passes a full background screen" },
  { icon: CheckCircle,  color: D.cyan,   label: "License Verified",    desc: "State licensing confirmed before activation" },
  { icon: Star,         color: D.amber,  label: "4.8★ Average",        desc: "Only top-rated pros make the platform"       },
  { icon: Zap,          color: D.teal,   label: "Same-Day Available",  desc: "Most pros can respond within hours"          },
];

type Availability = "today" | "week" | "any";
type RatingFilter  = "4.5" | "4.0" | "any";
type PriceFilter   = "$" | "$$" | "$$$" | "any";

// ─── Sub-components ───────────────────────────────────────────────────────────

function MatchBadge({ pct }: { pct: number }) {
  const color = pct >= 90 ? D.green : pct >= 80 ? D.cyan : D.amber;
  return (
    <span style={{
      display: "inline-block", fontSize: 11, fontWeight: 700,
      padding: "2px 8px", borderRadius: 99,
      background: `${color}22`, color, border: `1px solid ${color}44`,
    }}>
      {pct}% match
    </span>
  );
}

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 99,
      background: `${color}18`, color, border: `1px solid ${color}30`,
    }}>
      <CheckCircle size={9} />
      {label}
    </span>
  );
}

function FilterChip({
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "6px 14px", borderRadius: 99, cursor: "pointer",
        fontSize: 12, fontWeight: active ? 700 : 500,
        background: active ? D.cyan + "22" : D.card,
        border: `1px solid ${active ? D.cyan + "55" : D.border}`,
        color: active ? D.cyan : D.muted,
        transition: "all 0.15s",
      }}
    >
      {label}
    </button>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ProSearch() {
  const [query, setQuery]            = useState("");
  const [category, setCategory]      = useState<string | null>(null);
  const [availability, setAvail]     = useState<Availability>("any");
  const [ratingFilter, setRating]    = useState<RatingFilter>("any");
  const [priceFilter, setPrice]      = useState<PriceFilter>("any");
  const [verifiedOnly, setVerified]  = useState(false);
  const [booked, setBooked]          = useState<number[]>([]);

  const categorySelected = !!category;

  const filtered = PROS.filter((p) => {
    if (ratingFilter !== "any" && p.rating < parseFloat(ratingFilter)) return false;
    if (priceFilter !== "any" && p.price !== priceFilter) return false;
    if (verifiedOnly && !p.verified) return false;
    return true;
  });

  return (
    <HomeownerLayout>
      <div style={{
        minHeight: "100vh", background: D.bg, padding: "32px 28px",
        fontFamily: "'Inter', system-ui, sans-serif", color: D.text,
        maxWidth: 900, margin: "0 auto",
      }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: "-0.5px" }}>
            Find a Pro
          </h1>
          <p style={{ color: D.muted, marginTop: 6, fontSize: 14 }}>
            Vetted professionals in your area
          </p>
        </div>

        {/* ── Search bar ── */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          background: D.surface, border: `1px solid ${D.border}`,
          borderRadius: 14, padding: "10px 16px", marginBottom: 24,
        }}>
          <Search size={18} color={D.muted} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you need?"
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              color: D.text, fontSize: 15,
            }}
          />
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            background: D.card, borderRadius: 99, padding: "4px 12px",
          }}>
            <MapPin size={12} color={D.cyan} />
            <span style={{ fontSize: 12, color: D.cyan, fontWeight: 600 }}>Frisco, TX 75034</span>
          </div>
        </div>

        {/* ── Category selector ── */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, color: D.muted, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Select a category
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const active = category === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(active ? null : cat.id)}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    gap: 8, padding: "18px 12px", borderRadius: 14, cursor: "pointer",
                    background: active ? `${cat.color}22` : D.card,
                    border: `1px solid ${active ? cat.color + "55" : D.border}`,
                    transition: "all 0.15s",
                  }}
                >
                  <Icon size={22} color={cat.color} />
                  <span style={{ fontSize: 12, fontWeight: active ? 700 : 500, color: active ? cat.color : D.text }}>
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── No category selected: Why TrustyPro ── */}
        {!categorySelected && (
          <>
            {/* AI recommendation teaser */}
            <div style={{
              background: `${D.purple}12`, border: `1px solid ${D.purple}30`,
              borderRadius: 12, padding: "14px 18px", marginBottom: 24,
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <Sparkles size={16} color={D.purple} />
              <span style={{ fontSize: 13, color: D.text }}>
                Based on your history,{" "}
                <strong style={{ color: D.cyan }}>Marcus Rivera</strong> is a great fit for HVAC work.
              </span>
              <button style={{
                marginLeft: "auto", display: "flex", alignItems: "center", gap: 4,
                fontSize: 12, fontWeight: 600, color: D.purple,
                background: "transparent", border: "none", cursor: "pointer",
              }}>
                View <ChevronRight size={12} />
              </button>
            </div>

            <p style={{ fontSize: 13, color: D.muted, marginBottom: 16 }}>Why TrustyPro?</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, marginBottom: 32 }}>
              {WHY_TRUSTYPRO.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} style={{
                    background: D.surface, border: `1px solid ${item.color}30`,
                    borderRadius: 14, padding: "18px 20px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <Icon size={18} color={item.color} />
                      <span style={{ fontSize: 14, fontWeight: 700, color: item.color }}>{item.label}</span>
                    </div>
                    <p style={{ fontSize: 12, color: D.muted, margin: 0 }}>{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ── Filters + Results (category selected) ── */}
        {categorySelected && (
          <>
            {/* Filter bar */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap",
              background: D.surface, border: `1px solid ${D.border}`,
              borderRadius: 12, padding: "12px 16px", marginBottom: 20,
            }}>
              <span style={{ fontSize: 11, color: D.muted, marginRight: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Availability:
              </span>
              {(["today", "week", "any"] as Availability[]).map((v) => (
                <FilterChip key={v} label={v === "today" ? "Today" : v === "week" ? "This Week" : "Any"} active={availability === v} onClick={() => setAvail(v)} />
              ))}
              <span style={{ color: D.border, margin: "0 4px" }}>|</span>
              <span style={{ fontSize: 11, color: D.muted, marginRight: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Rating:
              </span>
              {(["4.5", "4.0", "any"] as RatingFilter[]).map((v) => (
                <FilterChip key={v} label={v === "any" ? "Any" : `${v}★+`} active={ratingFilter === v} onClick={() => setRating(v)} />
              ))}
              <span style={{ color: D.border, margin: "0 4px" }}>|</span>
              <span style={{ fontSize: 11, color: D.muted, marginRight: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Price:
              </span>
              {(["$", "$$", "$$$", "any"] as PriceFilter[]).map((v) => (
                <FilterChip key={v} label={v === "any" ? "Any" : v} active={priceFilter === v} onClick={() => setPrice(v)} />
              ))}
              <span style={{ color: D.border, margin: "0 4px" }}>|</span>
              <button
                onClick={() => setVerified(!verifiedOnly)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "6px 14px", borderRadius: 99, cursor: "pointer",
                  fontSize: 12, fontWeight: verifiedOnly ? 700 : 500,
                  background: verifiedOnly ? D.green + "22" : D.card,
                  border: `1px solid ${verifiedOnly ? D.green + "55" : D.border}`,
                  color: verifiedOnly ? D.green : D.muted,
                }}
              >
                <Shield size={11} />
                Verified Only
              </button>
            </div>

            {/* AI recommendation */}
            <div style={{
              background: `${D.purple}12`, border: `1px solid ${D.purple}30`,
              borderRadius: 12, padding: "12px 18px", marginBottom: 20,
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <Sparkles size={15} color={D.purple} />
              <span style={{ fontSize: 13, color: D.text }}>
                Based on your history,{" "}
                <strong style={{ color: D.cyan }}>Marcus Rivera</strong> is a great fit for HVAC work.
              </span>
            </div>

            {/* Pro cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {filtered.map((pro) => {
                const isBooked = booked.includes(pro.id);
                return (
                  <div key={pro.id} style={{
                    background: D.surface, border: `1px solid ${D.border}`,
                    borderRadius: 16, padding: "18px 20px",
                    display: "flex", alignItems: "center", gap: 16,
                    flexWrap: "wrap",
                  }}>
                    {/* Avatar */}
                    <div style={{
                      width: 48, height: 48, borderRadius: 999,
                      background: `${pro.color}30`, border: `2px solid ${pro.color}55`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 15, fontWeight: 700, color: pro.color,
                      flexShrink: 0,
                    }}>
                      {pro.initials}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 160 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 14, fontWeight: 700 }}>{pro.name}</span>
                        <MatchBadge pct={pro.match} />
                      </div>
                      <div style={{ fontSize: 12, color: D.muted, marginBottom: 6 }}>{pro.trade}</div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {pro.verified && <Badge label="Verified" color={D.green} />}
                        {pro.backgroundChecked && <Badge label="BG Checked" color={D.cyan} />}
                        {pro.licensed && <Badge label="Licensed" color={D.blue} />}
                      </div>
                    </div>

                    {/* Stats */}
                    <div style={{ display: "flex", gap: 20, flexShrink: 0 }}>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "center" }}>
                          <Star size={12} color={D.amber} fill={D.amber} />
                          <span style={{ fontSize: 13, fontWeight: 700 }}>{pro.rating}</span>
                        </div>
                        <div style={{ fontSize: 10, color: D.dim }}>{pro.reviews} reviews</div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "center" }}>
                          <Clock size={12} color={D.muted} />
                          <span style={{ fontSize: 12, color: D.text }}>{pro.responseTime}</span>
                        </div>
                        <div style={{ fontSize: 10, color: D.dim }}>response</div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "center" }}>
                          <MapPin size={12} color={D.muted} />
                          <span style={{ fontSize: 12, color: D.text }}>{pro.distance}</span>
                        </div>
                        <div style={{ fontSize: 10, color: D.dim }}>away</div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "center" }}>
                          <DollarSign size={12} color={D.muted} />
                          <span style={{ fontSize: 12, fontWeight: 700, color: D.green }}>{pro.price}</span>
                        </div>
                        <div style={{ fontSize: 10, color: D.dim }}>price range</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                      <button
                        onClick={() => setBooked((prev) => [...prev, pro.id])}
                        disabled={isBooked}
                        style={{
                          padding: "9px 18px", borderRadius: 10, cursor: isBooked ? "default" : "pointer",
                          background: isBooked ? D.green + "22" : D.teal,
                          border: `1px solid ${isBooked ? D.green + "55" : D.teal}`,
                          color: isBooked ? D.green : "#fff",
                          fontSize: 13, fontWeight: 700,
                        }}
                      >
                        {isBooked ? "Booked!" : "Book Now"}
                      </button>
                      <button style={{
                        display: "flex", alignItems: "center", gap: 6,
                        padding: "9px 14px", borderRadius: 10, cursor: "pointer",
                        background: "transparent", border: `1px solid ${D.border}`,
                        color: D.muted, fontSize: 13, fontWeight: 500,
                      }}>
                        <MessageSquare size={13} />
                        Message
                      </button>
                      <button style={{
                        display: "flex", alignItems: "center", gap: 4,
                        padding: "9px 14px", borderRadius: 10, cursor: "pointer",
                        background: "transparent", border: "none",
                        color: D.cyan, fontSize: 12, fontWeight: 600,
                      }}>
                        View Profile <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </HomeownerLayout>
  );
}
